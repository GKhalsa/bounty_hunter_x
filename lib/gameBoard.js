const EnemyPlane       = require('./enemyPlane.js');


function GameBoard(canvas, ctx){
  this.enemyPlanes     = [new EnemyPlane(200, 100, 50, 50, ctx, canvas)];
  this.enemyMissiles   = [];
  this.userMissiles    = [];
  this.level           = 1;
  this.canvas          = canvas;
  this.canvasWidth     = canvas.width;
  this.canvasHeight    = canvas.height;
  this.userPlaneWidth  = 20;
  this.userPlaneHeight = 20;
  this.money           = 10;
  this.shipX           = (this.canvasWidth - this.userPlaneWidth)/2;
  this.shipY           = this.canvasHeight - 40;

}

GameBoard.prototype.checkMissileLocation = function(){
  this.userMissiles.filter(function (missile){
    return (missile.x > 0 && missile.x < this.canvasWidth && missile.y > 0 && missile.y < this.canvasHeight);
  }.bind(this));
};

GameBoard.prototype.renderEnemyMissiles = function(){
  this.enemyMissiles.forEach(function(missile){
    missile.drawMissile().launch();
  });
};

GameBoard.prototype.renderUserMissiles = function(){
  this.userMissiles.forEach(function(missile){
    missile.drawMissile().launch();
  });
};

GameBoard.prototype.renderEnemyPlanes = function(){
  this.enemyPlanes.forEach(function(plane){
    plane.drawPlane().movement();
    let missile = plane.launchMissile();
    if(Math.random() > 0.9) {
      this.enemyMissiles.push(missile);
    }
  }.bind(this));
};

GameBoard.prototype.setup = function() {
  this.renderEnemyMissiles();
  this.renderEnemyPlanes();
  this.checkMissileLocation();
  this.renderUserMissiles();
};



module.exports = GameBoard;
