var canvas = document.getElementById("myCanvas");
var ctx    = canvas.getContext("2d");

var myImage = new Image();
myImage.src = './nebula-space.jpg';
var mySecondImg = new Image();
mySecondImg.src = './nebula-space.jpg';

const KeyController      = require('./keyController.js');
const GameBoard          = require('./gameBoard.js');
const CollisionDetection = require('./collisionDetection.js');
// const Explosion          = require('./explosion.js');

var gameBoard          = new GameBoard(canvas, ctx);
var keyController      = new KeyController(ctx, canvas, gameBoard);
var collisionDetection = new CollisionDetection(gameBoard);
// var explosion         = new Explosion(gameBoard);

var y = -200;
var y2 = - (1000 + 200);

function renderBackground(){
  if ( y === gameBoard.canvasHeight ) { y = -1200 ;}
  if (y2 === gameBoard.canvasHeight ) { y2 = -1200;}
  ctx.drawImage(myImage, 0, y);
  ctx.drawImage(mySecondImg, 0, y2);
  move();
}

// var animationFrame = 1;
// var hit = true;
// var currentFrame = 1;


document.addEventListener("keydown", keyController.keyDownHandler.bind(keyController), false);
document.addEventListener("keyup", keyController.keyUpHandler.bind(keyController), false);

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  renderBackground();

  if(gameBoard.startGame !== true){gameBoard.startScreen();}
  if(gameBoard.endGame === true){gameBoard.gameOverScreen();}
  if(gameBoard.startGame && !gameBoard.endGame){
    gameBoard.setup();
    keyController.userMovement();
    keyController.userShipPosition();
    collisionDetection.user();
    collisionDetection.enemy();
    collisionDetection.userGetsPowerUp();
    gameBoard.clearDestroyedPlanes();
  }
  //
  // if (hit === true && (currentFrame % 100 === 0)){
  //   explosion.explosionSequence(animationFrame);
  //    animationFrame++;
  //    if(animationFrame === 22){
  //      animationFrame = 1;
  //    }
  // } else {
  //    currentFrame++;
  //    explosion.explosionSequence(animationFrame);
  //    if(animationFrame === 22){
  //      animationFrame = 1;
  //    }
  // }

  requestAnimationFrame(draw);
}

function move() {
  y  += 5;
  y2 += 5;
}

draw();
