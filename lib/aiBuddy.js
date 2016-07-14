function AiBuddy(ctx){
  this.ctx    = ctx;
  this.x      = -8 ;
  this.y      = 700;
  this.time   = 200;
  this.width  = 30;
  this.height = 30;
  this.ycounter = 200;
}

AiBuddy.prototype.drawPlane = function(){
  var plane = new Image();
  plane.src = './redfighter-straight.png';
  this.ctx.drawImage(plane, this.x -5, this.y -5, 40, 40);
  return this;
};

AiBuddy.prototype.movement = function(){
  if((this.x + 20) < 800 && this.ycounter > 10){
    this.x += 20;
  } else if(this.ycounter > 0 ){
    this.y -= 20;
  } else if(this.x - 20 > 0){
    this.x -= 20;
  } else if(this.x < 10){
    this.ycounter = 200;
  }
  return this;
};

AiBuddy.prototype.launchMisile = function(){
  // return new EnemyMissile(this.x, this.y, 5, 5, this.ctx);

};

module.exports = AiBuddy;
