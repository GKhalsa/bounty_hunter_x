const EnemyMissile = require("./enemyMissile.js");

// var move = 2;

//  var movementHash = { 'downleft' = 8,32, 32, 32 }
// movement = {x: ,y: }

function EnemyPlane(x, y, width, height, ctx, canvas, movement){
  this.x            = x;
  this.y            = y;
  this.width        = width;
  this.height       = height;
  this.ctx          = ctx;
  this.canvasWidth  = canvas.width;
  this.health       = 10;
  this.movementX    = movement.x;
  this.movementY    = movement.y;
}

EnemyPlane.prototype.drawPlane = function(){
  // this.ctx.beginPath();
  // this.ctx.rect(this.x, this.y, this.width, this.height);
  // this.ctx.fillStyle = "white";
  // this.ctx.fill();
  // this.ctx.closePath();
  var plane = new Image();
  plane.src = './alienspaceship.png';
  this.ctx.drawImage(plane, this.x -10, this.y, 50, 50);

  return this;
};

EnemyPlane.prototype.movement = function(){
  this.y += this.movementY/3;
  this.x += this.movementX;
  return this;
};

// EnemyPlane.prototype.diagonalRightMovement = function(){
//   this.y += move/3;
//   this.x += move;
//   return this;
// };

EnemyPlane.prototype.launchMissile = function(){
  return new EnemyMissile(this.x, this.y, 5, 5, this.ctx);
};


module.exports = EnemyPlane;
