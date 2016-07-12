
function MainGameLoop(gameBoard, canvas, ctx, keyController, collisionDetection){
  this.gameBoard = gameBoard;
  this.canvas = canvas;
  this.ctx = ctx;
  this.keyController = keyController;
  this.collisionDetection = collisionDetection;
  this.y = -200;
  this.y2 = - (1000 + 200);
}

function renderImage(string){
  var myImage = new Image();
  myImage.src = string;
  return myImage;
}

MainGameLoop.prototype.move = function() {
  this.y  += 5;
  this.y2 += 5;
};

MainGameLoop.prototype.renderBackground = function(){
  if ( this.y === this.gameBoard.canvasHeight ) { this.y = -1200 ;}
  if (this.y2 === this.gameBoard.canvasHeight ) { this.y2 = -1200;}
  this.ctx.drawImage(renderImage('./nebula-space.jpg'), 0, this.y);
  this.ctx.drawImage(renderImage('./nebula-space.jpg'), 0, this.y2);
  this.move();
};

MainGameLoop.prototype.loop = function(){
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.renderBackground();

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

};

module.exports = MainGameLoop;
