const EnemyPlane       = require('./enemyPlane.js');

function GameBoard(canvas, ctx){
  this.ctx             = ctx;
  this.enemyPlanes     = [];
  this.enemyMissiles   = [];
  this.userMissiles    = [];
  this.level           = 1;
  this.canvas          = canvas;
  this.canvasWidth     = canvas.width;
  this.canvasHeight    = canvas.height;
  this.userPlaneWidth  = 20;
  this.userPlaneHeight = 20;
  this.money           = 10;
  this.score           = 0;
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
  var enemyPlaneSet = this.enemyPlaneSets()[0];
  this.enemyPlanes.push(enemyPlaneSet);
  if (this.checkEnemyPlaneLocations()){console.log('offf');}
  this.enemyPlanes[0].forEach(function(plane){
    plane.drawPlane().movement();
    let missile = plane.launchMissile();
    if(Math.random() > 0.95) {
      this.enemyMissiles.push(missile);
    }
  }.bind(this));
};

GameBoard.prototype.enemyPlaneSets = function(){
  return [[new EnemyPlane(-50, -50, 50, 50, this.ctx, this.canvas), new EnemyPlane(-110, 20, 50, 50, this.ctx, this.canvas), new EnemyPlane(-140, 90, 50, 50, this.ctx, this.canvas)]];
};

GameBoard.prototype.checkEnemyPlaneLocations = function(){
 return this.enemyPlanes[0].every(plane => plane.x > this.canvasWidth);
};

GameBoard.prototype.drawShip = function(){
  this.ctx.beginPath();
  this.ctx.rect(this.shipX, this.shipY, this.userPlaneWidth, this.userPlaneHeight );
  this.ctx.fillStyle = "white";
  this.ctx.fill();
  this.ctx.closePath();
};

GameBoard.prototype.drawScore = function(){
  this.ctx.font = "16px 'Press Start 2P'";
  this.ctx.fillStyle = "#0095DD";
  this.ctx.fillText("Score: " + this.score, this.canvasWidth - 150, 20);
};

GameBoard.prototype.setup = function() {
  this.drawShip();
  this.drawScore();
  this.renderEnemyMissiles();
  this.renderEnemyPlanes();
  this.checkMissileLocation();
  this.renderUserMissiles();
};

module.exports = GameBoard;
