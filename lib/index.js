var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var shipWidth = 20;
var shipHeight = 20;
var shipX = (canvas.width - shipWidth)/2;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

function drawShip(){
  ctx.beginPath();
  ctx.rect(canvasWidth/2, canvasHeight - 40, shipWidth, shipHeight );
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if(e.keyCode === 39) {
      rightPressed = true;
  } else if(e.keyCode === 37)  {
      leftPressed = true;
  } else if (e.keyCode === 38) {
    upPressed = true;
    console.log("up!");
  } else if (e.keyCode === 40){
    downPressed = true;
    console.log("down!");
  }
}

function keyUpHandler(e) {
  if(e.keyCode === 39) {
    rightPressed = false;
  } else if(e.keyCode === 37)  {
    leftPressed = false;
  } else if (e.keyCode === 38) {
    upPressed = false;
  } else if (e.keyCode === 40){
    downPressed = false;
  }
}


function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawShip();

  requestAnimationFrame(draw);
}

draw();
