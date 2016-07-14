const UserShipImages     = require('./UserShipImages.js');
const Sound              = require('./gameSounds.js');

function KeyController(ctx, canvas, gameBoard){
  this.gameBoard    = gameBoard;
  this.rightPressed = false;
  this.leftPressed  = false;
  this.upPressed    = false;
  this.downPressed  = false;
  this.ctx          = ctx;
  this.canvasWidth  = canvas.width;
  this.canvasHeight = canvas.height;
  this.shipWidth    = 20;
  this.shipHeight   = 20;
}

KeyController.prototype.keyDownHandler = function(e) {
  this.shipControls(e);
  this.menuOptions(e);
};

KeyController.prototype.shipControls = function(e){
  switch(e.keyCode) {
    case 32:
    this.gameBoard.launchNewMissile();
    var mySound = new Sound("assets/sounds/shoot.wav", 0.1);
    mySound.play();
    break;

    case 37:
    this.leftPressed = true;
    break;

    case 38:
    this.upPressed = true;
    break;

    case 39:
    this.rightPressed = true;
    break;

    case 40:
    this.downPressed = true;
    break;
  }
};

KeyController.prototype.menuOptions = function(e){
  switch(e.keyCode) {
    case 13:
    this.gameBoard.startGame = true;
    var mySound = new Sound("assets/sounds/bebop-theme.mp3", 0.4);
    mySound.play();

    break;

    case 80:
    if (this.gameBoard.endGame) {location.reload();}
    break;
  }
};

KeyController.prototype.keyUpHandler = function(e) {
  switch(e.keyCode) {
    case 37:
    this.leftPressed = false;
    break;

    case 38:
    this.upPressed = false;
    break;

    case 39:
    this.rightPressed = false;
    break;

    case 40:
    this.downPressed = false;
    break;
  }
};

KeyController.prototype.leftMovement = function(){
  if(this.leftPressed && this.gameBoard.shipX <= 10) {this.gameBoard.shipX = this.canvasWidth;}
  if(this.leftPressed && this.gameBoard.shipX > 0) {this.gameBoard.shipX -= 10;}
};

KeyController.prototype.rightMovement = function(){
  if(this.rightPressed && this.gameBoard.shipX >= this.canvasWidth - this.shipWidth) {this.gameBoard.shipX = -10;}
  if(this.rightPressed && this.gameBoard.shipX < this.canvasWidth - this.shipWidth) {this.gameBoard.shipX += 10;}
};

KeyController.prototype.upDownMovement = function(){
  if(this.upPressed && this.gameBoard.shipY > 0) {this.gameBoard.shipY -= 10;}
  if(this.downPressed && this.gameBoard.shipY < this.canvasHeight - (this.shipHeight + 10)) { this.gameBoard.shipY += 10;}
};

KeyController.prototype.userMovement = function(){
  this.leftMovement();
  this.rightMovement();
  this.upDownMovement();
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
