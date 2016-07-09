var canvas = document.getElementById("myCanvas");
var ctx    = canvas.getContext("2d");

const KeyController      = require('./keyController.js');
const GameBoard          = require('./gameBoard.js');
const CollisionDetection = require('./collisionDetection.js');

var gameBoard          = new GameBoard(canvas, ctx);
var keyController      = new KeyController(ctx, canvas, gameBoard);
var collisionDetection = new CollisionDetection(gameBoard);

function drawShip(){
  ctx.beginPath();
  ctx.rect(gameBoard.shipX, gameBoard.shipY, gameBoard.userPlaneWidth, gameBoard.userPlaneHeight );
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}

document.addEventListener("keydown", keyController.keyDownHandler.bind(keyController), false);
document.addEventListener("keyup", keyController.keyUpHandler.bind(keyController), false);

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawShip();
  gameBoard.setup();
  collisionDetection.user();
  collisionDetection.enemy();
  keyController.leftRightMovement();
  requestAnimationFrame(draw);
}

draw();
