var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var shipWidth = 20;
var shipHeight = 20;
var shipX = (canvas.width - shipWidth)/2;
var shipY = canvasHeight - 40;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var missileArray = [];
var enemyPlane = [];

function drawShip(){
  ctx.beginPath();
  ctx.rect(shipX, shipY, shipWidth, shipHeight );
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
  } else if (e.keyCode === 40){
    downPressed = true;
  } else if (e.keyCode === 32){
    missileArray.push(new Missile(shipX, shipY, 10, 10));
  }
}

function EnemyPlane(x,y,width,height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

EnemyPlane.prototype.drawPlane = function(){
  ctx.beginPath();
  ctx.rect(200, 100, 50, 50);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
  return this;
};

function Missile(x, y, width, height){
  this.x = x + 4;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = "red";
}

Missile.prototype.drawMissile = function(){
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.width, this.height);
  return this;
};

Missile.prototype.launch = function(){
  this.y -= 20;
  return this;
};

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

function collisionDetection(){
  missileArray.forEach(function(missile){
    // enemyPlane.forEach(function(){

      if (missile.x > 200 && missile.x < 250 && missile.y > 100 && missile.y < 150){console.log('hit!');}
    });
  // });
}

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  enemyPlane.push(new EnemyPlane(200, 100, 10, 10).drawPlane());
  drawShip();
  missileArray.forEach(function(missile){
    missile.drawMissile().launch();
  });
  collisionDetection();

  if(leftPressed && shipX > 0) {shipX -= 10;}
  if(rightPressed && shipX < canvasWidth - shipWidth) {shipX += 10;}
  if(upPressed && shipY > 0) {shipY -= 10;}
  if(downPressed && shipY < canvasHeight - shipHeight) { shipY += 10;}


  requestAnimationFrame(draw);
}

draw();
