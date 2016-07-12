function UserShipImages(ctx){
  this.ctx       = ctx;
}

UserShipImages.prototype.centerPlaneImage = function(shipX, shipY){
  var plane = new Image();
  plane.src = './redfighter-straight.png';
  this.ctx.drawImage(plane, shipX -5, shipY -5, 40, 40);
};

UserShipImages.prototype.leftPlaneImage = function(shipX, shipY){
  var plane = new Image();
  plane.src = './redfighter-left.png';
  this.ctx.drawImage(plane, shipX -10, shipY, 40, 40);
};

UserShipImages.prototype.rightPlaneImage = function(shipX, shipY){
  var plane = new Image();
  plane.src = './redfighter-right.png';
  this.ctx.drawImage(plane, shipX -10, shipY, 40, 40);
};

module.exports = UserShipImages;
