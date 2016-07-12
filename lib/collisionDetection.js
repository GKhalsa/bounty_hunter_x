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
      if (missile.x > plane.x && missile.x < plane.x + plane.width && missile.y > plane.y && missile.y < plane.y + plane.height){
        plane.health = 0;
        this.gameBoard.userMissiles.pop(missile);
        this.gameBoard.score += 10;
        // this.explosion.explosionSequence(num);
        // this.enemyHit = true;
        this.powerUpDrop(plane.x,plane.y);
      }
    }.bind(this));
  }.bind(this));
};


CollisionDetection.prototype.user = function(){
  this.gameBoard.enemyMissiles.forEach(function(missile){
    for(let i = 0; i < 4; i++){
      let missileCoordinates = [[missile.x, missile.y],[missile.x + 5, missile.y],[missile.x, missile.y + 5],[missile.x + 5, missile.y + 5]];
      if (missileCoordinates[i][0] > this.gameBoard.shipX && missileCoordinates[i][0] < this.gameBoard.shipX + this.gameBoard.userPlaneWidth && missileCoordinates[i][1] > this.gameBoard.shipY && missileCoordinates[i][1] < this.gameBoard.shipY + this.gameBoard.userPlaneHeight){
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
      let powerUpCoordinates = [[powerUp.x, powerUp.y],[powerUp.x + 10, powerUp.y],[powerUp.x, powerUp.y + 10],[powerUp.x + 10, powerUp.y + 10]];
      if (powerUpCoordinates[i][0] > this.gameBoard.shipX && powerUpCoordinates[i][0] < this.gameBoard.shipX + this.gameBoard.userPlaneWidth && powerUpCoordinates[i][1] > this.gameBoard.shipY && powerUpCoordinates[i][1] < this.gameBoard.shipY + this.gameBoard.userPlaneHeight){
        powerUp.redeemed = true;
        this.gameBoard.clearRedeemedPowerUp();
        this.gameBoard.playerPower++;
      }
    }
  }.bind(this));
};

module.exports = CollisionDetection;
