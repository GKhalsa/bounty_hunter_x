const EnemyMissile = require("./enemyMissile.js");

function EnemyPlane(x, y, width, height, ctx, canvas,size, movement, health, image, missileOffset){
  this.x            = x;
  this.y            = y;
  this.width        = width;
  this.height       = height;
  this.ctx          = ctx;
  this.canvasWidth  = canvas.width;
  this.health       = health;
  this.movementX    = movement.x;
  this.movementY    = movement.y;
  this.sprite       = image.sprite;
  this.imageWidth   = image.width || 50;
  this.imageHeight  = image.height || 50;
  this.offset       = size.offset || -10;
  this.missileOffset = missileOffset;
}

EnemyPlane.prototype.drawPlane = function(){
  var plane = new Image();
  plane.src = this.sprite;
  this.ctx.drawImage(plane, (this.x + this.offset), this.y, this.imageWidth, this.imageHeight);

  return this;
};

EnemyPlane.prototype.movement = function(){
  if(this.imageWidth === 300 && (this.x + this.movementX > this.canvasWidth || this.x + this.movementX < 0)){
    this.movementX = -this.movementX;
  }
  this.x += this.movementX;
  this.y += this.movementY/3;
  return this;
};

EnemyPlane.prototype.launchMissile = function(){
  return new EnemyMissile(this.x + this.missileOffset.x, this.y + this.missileOffset.y, 5, 5, this.ctx);
};


module.exports = EnemyPlane;
