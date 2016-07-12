function PowerUp(x, y, ctx){
  // this.type   = type;
  this.x        = x;
  this.y        = y;
  this.width    = 10;
  this.height   = 10;
  this.ctx      = ctx;
  this.redeemed = false;
}

PowerUp.prototype.draw = function(){
  this.ctx.beginPath();
  this.ctx.rect(this.x, this.y, this.width, this.height);
  this.ctx.fillStyle = "white";
  this.ctx.fill();
  this.ctx.closePath();
  return this;
};

PowerUp.prototype.moveDown = function(){
  this.y += 10;
};

module.exports = PowerUp;
