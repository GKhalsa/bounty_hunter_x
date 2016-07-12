var canvas = document.getElementById("myCanvas");
var ctx    = canvas.getContext("2d");

const KeyController      = require('./keyController.js');
const GameBoard          = require('./gameBoard.js');
const CollisionDetection = require('./collisionDetection.js');
const MainGameLoop       = require('./mainGameLoop.js');

// const Explosion          = require('./explosion.js');

var gameBoard          = new GameBoard(canvas, ctx);
var keyController      = new KeyController(ctx, canvas, gameBoard);
var collisionDetection = new CollisionDetection(gameBoard);
var mainGameLoop       = new MainGameLoop(gameBoard, canvas, ctx, keyController, collisionDetection);
// var explosion         = new Explosion(gameBoard);

// var animationFrame = 1;
// var hit = true;
// var currentFrame = 1;

document.addEventListener("keydown", keyController.keyDownHandler.bind(keyController), false);
document.addEventListener("keyup", keyController.keyUpHandler.bind(keyController), false);

function draw(){
  mainGameLoop.loop();

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

draw();
