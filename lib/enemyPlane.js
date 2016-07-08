const EnemyMissile = require("./enemyMissile.js");

var move = 5;

function EnemyPlane(x, y, width, height, ctx, canvas){
  this.x           = x;
  this.y           = y;
  this.width       = width;
  this.height      = height;
  this.ctx         = ctx;
  this.canvasWidth = canvas.width;
}

EnemyPlane.prototype.drawPlane = function(){
  this.ctx.beginPath();
  this.ctx.rect(this.x, this.y, this.width, this.height);
  this.ctx.fillStyle = "white";
  this.ctx.fill();
  this.ctx.closePath();

  return this;
};

EnemyPlane.prototype.movement = function(){
  if (this.x  > this.canvasWidth - this.width || this.x < 0){
    move = -move;
  }
  this.x += move;
  return this;
};

EnemyPlane.prototype.launchMissile = function(){
  return new EnemyMissile(this.x, this.y, 5, 5, this.ctx);
};

module.exports = EnemyPlane;
