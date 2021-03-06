function EnemyMissile(x, y, width, height, ctx){
  this.x      = x + 4;
  this.y      = y + 10;
  this.width  = width;
  this.height = height;
  this.color  = "red";
  this.ctx    = ctx;
  this.type   = 0;
}

EnemyMissile.prototype.checkForMissileType = function(){
  this.drawMissile();
};

EnemyMissile.prototype.drawMissile = function(){
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect(this.x + 10, this.y + 20, this.width, this.height);
  return this;
};

EnemyMissile.prototype.launch = function(){
  this.y += 10;
  return this;
};

module.exports = EnemyMissile;
