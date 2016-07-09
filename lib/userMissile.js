function UserMissile(x, y, width, height, ctx){
  this.x      = x + 4;
  this.y      = y;
  this.width  = width;
  this.height = height;
  this.color  = "red";
  this.ctx    = ctx;
}

UserMissile.prototype.drawMissile = function(){
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
  return this;
};

UserMissile.prototype.launch = function(){
  this.y -= 20;
  return this;
};

module.exports = UserMissile;
