const Explosion = require('./explosion.js');

function CollisionDetection(gameBoard){
  this.gameBoard = gameBoard;
  this.explosion = new Explosion(gameBoard);
  this.enemyHit  = false;
}

CollisionDetection.prototype.enemy = function(){
  this.gameBoard.enemyPlanes[0].forEach(function(plane){
     this.gameBoard.userMissiles.forEach(function(missile){
      if (missile.x > plane.x && missile.x < plane.x + plane.width && missile.y > plane.y && missile.y < plane.y + plane.height){
        this.gameBoard.enemyPlanes[0].pop(plane);
        this.gameBoard.userMissiles.pop(missile);
        this.gameBoard.score += 10;
        // this.explosion.explosionSequence(num);
        this.enemyHit = true;
      }
    }.bind(this));
  }.bind(this));
};


CollisionDetection.prototype.user = function(){
  this.gameBoard.enemyMissiles.forEach(function(missile){
    for(let i = 0; i < 4; i++){
      let missileCoordinates = [[missile.x, missile.y],[missile.x + 5, missile.y],[missile.x, missile.y + 5],[missile.x + 5, missile.y + 5]];
      if (missileCoordinates[i][0] > this.gameBoard.shipX && missileCoordinates[i][0] < this.gameBoard.shipX + this.gameBoard.userPlaneWidth && missileCoordinates[i][1] > this.gameBoard.shipY && missileCoordinates[i][1] < this.gameBoard.shipY + this.gameBoard.userPlaneHeight){
        this.gameBoard.shipX = 800;
        this.gameBoard.shipY = 800;
      }
    }
  }.bind(this));
};

module.exports = CollisionDetection;
