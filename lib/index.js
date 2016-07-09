var canvas = document.getElementById("myCanvas");
var ctx    = canvas.getContext("2d");

var myImage = new Image();
myImage.src = './Space.jpg';
console.log(myImage);
var mySecondImg = new Image();
mySecondImg.src = './Space.jpg';
var plane = new Image();
plane.src = './user-plane.png';


const KeyController      = require('./keyController.js');
const GameBoard          = require('./gameBoard.js');
const CollisionDetection = require('./collisionDetection.js');


var gameBoard          = new GameBoard(canvas, ctx);
var keyController      = new KeyController(ctx, canvas, gameBoard);
var collisionDetection = new CollisionDetection(gameBoard);
var y = 0;
var y2 = -mySecondImg.height;


document.addEventListener("keydown", keyController.keyDownHandler.bind(keyController), false);
document.addEventListener("keyup", keyController.keyUpHandler.bind(keyController), false);

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (y === gameBoard.canvasHeight){
    y = -1080;
  }
  if (y2 === gameBoard.canvasHeight){
    y2 = -1080;
  }
    ctx.drawImage(myImage, 0, y);
    ctx.drawImage(mySecondImg, 0, y2);
  move();
  ctx.drawImage(plane, gameBoard.shipX -10, gameBoard.shipY, 40, 40);

  gameBoard.setup();
  collisionDetection.user();
  collisionDetection.enemy();
  keyController.leftRightMovement();
  requestAnimationFrame(draw);
}

function move() {
    y += 1;
    y2 += 1;
}

draw();
