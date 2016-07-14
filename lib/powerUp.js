function PowerUp(x, y, ctx){
  this.x        = x;
  this.y        = y;
  this.width    = 10;
  this.height   = 10;
  this.ctx      = ctx;
  this.redeemed = false;
}

PowerUp.prototype.draw = function(){
  var orb = new Image();
  orb.src = "../assets/background-images/powerUp.png";
  this.ctx.drawImage(orb, this.x, this.y, 20, 20);
  return this;
};

PowerUp.prototype.moveDown = function(){
  this.y += 10;
};

module.exports = PowerUp;
