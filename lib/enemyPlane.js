const EnemyMissile = require("./enemyMissile.js");

function EnemyPlane(x, y, width, height, ctx, canvas, movement, health, image){
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
}

EnemyPlane.prototype.drawPlane = function(){
  this.ctx.beginPath();
  this.ctx.rect(this.x, this.y, this.width, this.height);
  this.ctx.fillStyle = "white";
  this.ctx.fill();
  this.ctx.closePath();
  var plane = new Image();
  plane.src = this.sprite;
  this.ctx.drawImage(plane, this.x -10, this.y, this.imageWidth, this.imageHeight);

  return this;
};

EnemyPlane.prototype.movement = function(){
  this.y += this.movementY/3; // why divide?
  this.x += this.movementX;
  return this;
};

EnemyPlane.prototype.launchMissile = function(){
  return new EnemyMissile(this.x, this.y, 5, 5, this.ctx);
};


module.exports = EnemyPlane;
