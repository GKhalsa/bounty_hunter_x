function MainGameLoop(gameBoard, canvas, ctx, keyController, collisionDetection){
  this.gameBoard = gameBoard;
  this.canvas = canvas;
  this.ctx = ctx;
  this.keyController = keyController;
  this.collisionDetection = collisionDetection;
  this.y = -200;
  this.y2 = - (1000 + 200);
}
var myImage = new Image();
myImage.src = './nebula-space.jpg';
var mySecondImg = new Image();
mySecondImg.src = './nebula-space.jpg';

MainGameLoop.prototype.move = function() {
  this.y  += 5;
  this.y2 += 5;
};

MainGameLoop.prototype.renderBackground = function(){
  // function renderBackground(){
  if ( this.y === this.gameBoard.canvasHeight ) { this.y = -1200 ;}
  if (this.y2 === this.gameBoard.canvasHeight ) { this.y2 = -1200;}
  this.ctx.drawImage(myImage, 0, this.y);
  this.ctx.drawImage(mySecondImg, 0, this.y2);
  this.move();
};

MainGameLoop.prototype.loop = function(){
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.renderBackground();
  // renderBackground();

  if(this.gameBoard.startGame !== true){this.gameBoard.startScreen();}
  if(this.gameBoard.endGame === true){this.gameBoard.gameOverScreen();}
  if(this.gameBoard.startGame && !this.gameBoard.endGame){
    this.gameBoard.setup();
    this.keyController.userMovement();
    this.keyController.userShipPosition();
    this.collisionDetection.user();
    this.collisionDetection.enemy();
    this.collisionDetection.userGetsPowerUp();
    this.gameBoard.clearDestroyedPlanes();
  }



  // MainGameLoop.prototype.move = function() {

};

module.exports = MainGameLoop;
