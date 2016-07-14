var canvas = document.getElementById("myCanvas");
var ctx    = canvas.getContext("2d");

const KeyController      = require('./keyController.js');
const GameBoard          = require('./gameBoard.js');
const CollisionDetection = require('./collisionDetection.js');
const MainGameLoop       = require('./mainGameLoop.js');

var gameBoard          = new GameBoard(canvas, ctx);
var keyController      = new KeyController(ctx, canvas, gameBoard);
var collisionDetection = new CollisionDetection(gameBoard);
var mainGameLoop       = new MainGameLoop(gameBoard, canvas, ctx, keyController, collisionDetection);

document.addEventListener("keydown", keyController.keyDownHandler.bind(keyController), false);
document.addEventListener("keyup", keyController.keyUpHandler.bind(keyController), false);

function draw(){
  mainGameLoop.loop();
  requestAnimationFrame(draw);
}

draw();
