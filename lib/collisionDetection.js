const Explosion     = require('./explosion.js');
const PowerUp       = require('./powerUp.js');

function CollisionDetection(gameBoard){
  this.gameBoard = gameBoard;
  this.explosion = new Explosion(gameBoard);
  this.enemyHit  = false;
}

CollisionDetection.prototype.enemy = function(){
  this.gameBoard.enemyPlanes.forEach(function(plane){
     this.gameBoard.userMissiles.forEach(function(missile){
      if (missile.x >= plane.x && missile.x <= plane.x + plane.width && missile.y >= plane.y && missile.y <= plane.y + plane.height){
        plane.health -= 10;
        this.gameBoard.userMissiles.pop(missile);
        this.gameBoard.score += 10;
        // this.explosion.explosionSequence(num);
        this.powerUpDrop(plane.x,plane.y);
      }
    }.bind(this));
  }.bind(this));
};


CollisionDetection.prototype.user = function(){
  this.gameBoard.enemyMissiles.forEach(function(missile){
    for(let i = 0; i < 4; i++){
      if(this.coordinateCheck(missile, 5, i)){
        let score = this.gameBoard.score;
        localStorage.setItem(score,score);
        this.gameBoard.endGame = true;
      }
    }
  }.bind(this));
};

CollisionDetection.prototype.powerUpDrop = function(x,y){
  if (Math.random() > 0.9){
    this.gameBoard.powerUps.push(new PowerUp(x,y,this.gameBoard.ctx));
  }
};

CollisionDetection.prototype.userGetsPowerUp = function(){
  this.gameBoard.powerUps.forEach(function(powerUp){
    for(let i = 0; i < 4; i++){
      if(this.coordinateCheck(powerUp,10, i)){
        powerUp.redeemed = true;
        this.gameBoard.clearRedeemedPowerUp();
        this.gameBoard.playerPower++;
      }
    }
  }.bind(this));
};

CollisionDetection.prototype.coordinateCheck = function (object, size, i){
  let powerUpCoordinates = [[object.x, object.y],[object.x + size, object.y],[object.x, object.y + size],[object.x + size, object.y + size]];
  return powerUpCoordinates[i][0] >= this.gameBoard.shipX && powerUpCoordinates[i][0] <= this.gameBoard.shipX + this.gameBoard.userPlaneWidth && powerUpCoordinates[i][1] >= this.gameBoard.shipY && powerUpCoordinates[i][1] <= this.gameBoard.shipY + this.gameBoard.userPlaneHeight;
};

module.exports = CollisionDetection;
