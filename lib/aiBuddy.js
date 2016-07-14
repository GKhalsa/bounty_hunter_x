const UserMissile = require('./userMissile.js');

function AiBuddy(ctx){
  this.ctx      = ctx;
  this.x        = -8 ;
  this.y        = 700;
  this.time     = 200;
  this.width    = 30;
  this.height   = 30;
  this.ycounter = 200;
}

AiBuddy.prototype.drawPlane = function(){
  var plane = new Image();
  plane.src = 'assets/user-images/redfighter-straight.png';
  this.ctx.drawImage(plane, this.x -5, this.y -5, 40, 40);
  return this;
};

AiBuddy.prototype.movement = function(){
  this.x += 20;
  return this;
};

AiBuddy.prototype.launchMissile = function(){
  return new UserMissile(this.x, this.y, this.width, this.height, this.ctx);
};

module.exports = AiBuddy;
