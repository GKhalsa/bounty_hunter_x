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
var enemyPlane = [new EnemyPlane(200, 100, 50, 50)];
var enemyMissileArray = [];
var move = 5;

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
  }
  if (e.keyCode === 32){
    missileArray.push(new Missile(shipX, shipY, 5, 5));
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
  ctx.rect(this.x, this.y, this.width, this.height);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
  return this;
};

EnemyPlane.prototype.movement = function(){
  if (this.x  > canvasWidth - this.width || this.x < 0){
    move = -move;
  }
  this.x += move;
  return this;
};

EnemyPlane.prototype.launchMissile = function(){
  if(Math.random() > 0.895) { enemyMissileArray.push(new EnemyMissile(this.x, this.y, 5, 5)) ;}
};

function Missile(x, y, width, height){
  this.x = x + 4;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = "red";
}

function checkMissileLocation(){
  missileArray = missileArray.filter(function(missile){
    return (missile.x > 0 && missile.x < canvasWidth && missile.y > 0 && missile.y < canvasHeight);
  });
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

function EnemyMissile(x, y, width, height){
  this.x = x + 4;
  this.y = y + 10;
  this.width = width;
  this.height = height;
  this.color = "red";
}



EnemyMissile.prototype.drawMissile = function(){
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.width, this.height);
  return this;
};

EnemyMissile.prototype.launch = function(){
  this.y += 5;
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
  enemyPlane.forEach(function(plane){
    return missileArray.forEach(function(missile){
      if (missile.x > plane.x && missile.x < plane.x + plane.width && missile.y > plane.y && missile.y < plane.y + plane.height){enemyPlane.pop(plane);}
    });
  });
}

function leftRightMovement(){
  if(leftPressed && shipX > 0) {shipX -= 10;}
  if(rightPressed && shipX < canvasWidth - shipWidth) {shipX += 10;}
  if(upPressed && shipY > 0) {shipY -= 10;}
  if(downPressed && shipY < canvasHeight - shipHeight) { shipY += 10;}
}



function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawShip();


  enemyMissileArray.forEach(function(missile){
    missile.drawMissile().launch();
  });

  enemyPlane.forEach(function(plane){
    plane.drawPlane().movement().launchMissile();
  });

  checkMissileLocation();
  missileArray.forEach(function(missile){
    missile.drawMissile().launch();
  });

  collisionDetection();
  leftRightMovement();
  requestAnimationFrame(draw);
}

draw();
