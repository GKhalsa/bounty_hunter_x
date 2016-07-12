function UserMissile(x, y, width, height, ctx, type){
  this.x      = x + 4;
  this.y      = y;
  this.width  = width;
  this.height = height;
  this.color  = "red";
  this.ctx    = ctx;
  this.type   = type;
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
