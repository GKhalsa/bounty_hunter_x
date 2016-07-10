var canvas = document.getElementById("myCanvas");
var ctx    = canvas.getContext("2d");

var myImage = new Image();
myImage.src = './nebula-space.jpg';
var mySecondImg = new Image();
mySecondImg.src = './nebula-space.jpg';
// var plane = new Image();
// plane.src = './redfighter-straight.png';


const KeyController      = require('./keyController.js');
const GameBoard          = require('./gameBoard.js');
const CollisionDetection = require('./collisionDetection.js');
// const UserShipImages     = require('./UserShipImages.js');

var gameBoard          = new GameBoard(canvas, ctx);
var keyController      = new KeyController(ctx, canvas, gameBoard);
var collisionDetection = new CollisionDetection(gameBoard);
// var userShipImages     = new UserShipImages(ctx,gameBoard);

var y = -200;
var y2 = - (1000 + 200);


document.addEventListener("keydown", keyController.keyDownHandler.bind(keyController), false);
document.addEventListener("keyup", keyController.keyUpHandler.bind(keyController), false);

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (y === gameBoard.canvasHeight){
    y = -1200;
  }
  if (y2 === gameBoard.canvasHeight){
    y2 = -1200;
  }
    ctx.drawImage(myImage, 0, y);
    ctx.drawImage(mySecondImg, 0, y2);
  move();
  // userShipImages.centerPlaneImage();
  // ctx.drawImage(plane, gameBoard.shipX -10, gameBoard.shipY, 40, 40);

  gameBoard.setup();
  collisionDetection.user();
  collisionDetection.enemy();
  keyController.leftRightMovement();
  keyController.userShipPosition();
  requestAnimationFrame(draw);
}

function move() {
  y  += 50;
  y2 += 50;
}

draw();
