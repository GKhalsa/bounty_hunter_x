const UserMissile        = require('./userMissile.js');
const UserShipImages     = require('./UserShipImages.js');


function KeyController(ctx, canvas, gameBoard){
  this.gameBoard = gameBoard;
  this.rightPressed = false;
  this.leftPressed  = false;
  this.upPressed    = false;
  this.downPressed  = false;
  this.ctx          = ctx;
  this.canvasWidth = canvas.width;
  this.canvasHeight = canvas.height;
  this.shipWidth = 20;
  this.shipHeight = 20;
}



KeyController.prototype.keyDownHandler = function(e) {
  if(e.keyCode === 39) {
      this.rightPressed = true;
  } else if(e.keyCode === 37)  {
      this.leftPressed = true;
  } else if (e.keyCode === 38) {
    this.upPressed = true;
  } else if (e.keyCode === 40){
    this.downPressed = true;
  }
  if (e.keyCode === 32){
    this.gameBoard.userMissiles.push(new UserMissile(this.gameBoard.shipX, this.gameBoard.shipY, 5, 5, this.ctx));
  }
};

KeyController.prototype.keyUpHandler = function(e) {
  if(e.keyCode === 39) {
    this.rightPressed = false;
  } else if(e.keyCode === 37)  {
    this.leftPressed = false;
  } else if (e.keyCode === 38) {
    this.upPressed = false;
  } else if (e.keyCode === 40){
    this.downPressed = false;
  }
};

KeyController.prototype.leftRightMovement = function(){
  if(this.leftPressed && this.gameBoard.shipX <= 10) {this.gameBoard.shipX = this.canvasWidth;}
  if(this.leftPressed && this.gameBoard.shipX > 0) {this.gameBoard.shipX -= 10;}
  if(this.rightPressed && this.gameBoard.shipX >= this.canvasWidth - this.shipWidth) {this.gameBoard.shipX = -10;}
  if(this.rightPressed && this.gameBoard.shipX < this.canvasWidth - this.shipWidth) {this.gameBoard.shipX += 10;}
  if(this.upPressed && this.gameBoard.shipY > 0) {this.gameBoard.shipY -= 10;}
  if(this.downPressed && this.gameBoard.shipY < this.canvasHeight - this.shipHeight) { this.gameBoard.shipY += 10;}
};

KeyController.prototype.userShipPosition = function(){
  let userShipImages = new UserShipImages(this.ctx);
  if (this.leftPressed){
    userShipImages.leftPlaneImage(this.gameBoard.shipX, this.gameBoard.shipY);
  } else if (this.rightPressed){
    userShipImages.rightPlaneImage(this.gameBoard.shipX, this.gameBoard.shipY);
  } else{
    userShipImages.centerPlaneImage(this.gameBoard.shipX, this.gameBoard.shipY);
  }
};



module.exports = KeyController;
