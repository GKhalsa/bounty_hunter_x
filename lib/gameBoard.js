const EnemyPlane       = require('./enemyPlane.js');
const UserMissile        = require('./userMissile.js');


function GameBoard(canvas, ctx){
  this.startGame       = false;
  this.endGame         = false;
  this.ctx             = ctx;
  this.enemyPlanes     = [];
  this.enemyMissiles   = [];
  this.userMissiles    = [];
  this.level           = 1;
  this.canvas          = canvas;
  this.canvasWidth     = canvas.width;
  this.canvasHeight    = canvas.height;
  this.userPlaneWidth  = 30;
  this.userPlaneHeight = 30;
  this.money           = 10;
  this.score           = 0;
  this.shipX           = (this.canvasWidth - this.userPlaneWidth)/2;
  this.shipY           = this.canvasHeight - 40;
  this.frameCount      = 0;
  this.levelStart      = false;
  this.powerUps        = [];
  this.playerPower     = 1;
}

GameBoard.prototype.launchNewMissile = function(){
  this.userMissiles.push(new UserMissile(this.shipX, this.shipY, 5, 5, this.ctx));
  if(this.playerPower > 1){this.userMissiles.push(new UserMissile(this.shipX + 16, this.shipY, 5, 5, this.ctx));}
};

GameBoard.prototype.powerUpDrop = function(){
  this.powerUps.forEach(function(powerUp){
    powerUp.draw().moveDown();
  });
};

GameBoard.prototype.clearRedeemedPowerUp = function(){
  this.powerUps = this.powerUps.filter(function(powerUp){
    return (powerUp.redeemed === false && powerUp.y < this.canvasHeight);
  }.bind(this));
};

GameBoard.prototype.checkMissileLocation = function(){
  this.userMissiles.filter(function (missile){
    return (missile.x > 0 && missile.x < this.canvasWidth && missile.y > 0 && missile.y < this.canvasHeight);
  }.bind(this));
};

GameBoard.prototype.renderEnemyMissiles = function(){
  this.enemyMissiles.forEach(function(missile){
    missile.drawMissile().launch();
  });
};

GameBoard.prototype.renderUserMissiles = function(){
  this.userMissiles.forEach(function(missile){
    missile.drawMissile().launch();
  });
};

GameBoard.prototype.checkForSecondRound = function(){
  if (this.frameCount === 300){
    this.level = 2;
   }
   if(this.level === 2 && this.levelStart === false) {
     this.levelScreen('2');
     this.enemyPlanes = [];
   }

   if (this.frameCount === 600 ){
     this.levelStart = true;
   }
};

GameBoard.prototype.checkForThirdRound = function() {
  if (this.frameCount === 800){
    this.level = 3;
    this.levelStart = false;
   }
   if(this.level === 3 && this.levelStart === false) {
     this.levelScreen('3');
     this.enemyPlanes = [];
   }

   if (this.frameCount === 1000 ){
     this.levelStart = true;
   }
};

GameBoard.prototype.renderEnemyPlanes = function(){
  this.frameCount++;

  if (this.frameCount % 100 === 0){
    this.generateEnemyPlanes();

  } // or render new planes with time
  this.enemyPlanes.forEach(function(plane){
    plane.drawPlane().movement();
    let missile = plane.launchMissile();
    if(Math.random() > 0.98) {
      this.enemyMissiles.push(missile);
    }
  }.bind(this));
};

GameBoard.prototype.generateEnemyPlanes = function(){
  for(let i = 0; i< (this.level * 5) ;i++){
    let patterns = [{
      x: -(this.randomNum(1, 100)),
      y: -(this.randomNum(1, 100)),
      movement: {x:2, y:20}
    },
    {
      x: (this.randomNum(this.canvasWidth, this.canvasWidth + 50)),
      y: (this.randomNum(1, 50)),
      movement: {x:-20, y:2}
    },
    {
      x: (this.randomNum(0, this.canvasWidth)),
      y: -(this.randomNum(7, 20)),
      movement: {x:0, y:30}
    }];

    let enemies = patterns[this.randomNum(0,3)];
    this.enemyPlanes.push(this.newEnemyPlane(enemies.x, enemies.y, enemies.movement ));
  }
};

GameBoard.prototype.randomNum = function(firstNum, secondNum) {
  return Math.floor(Math.random() * secondNum) + firstNum;
};

GameBoard.prototype.newEnemyPlane = function(x,y,movement){
  return new EnemyPlane(x, y, 30, 50, this.ctx, this.canvas, movement);
};

GameBoard.prototype.checkEnemyPlaneLocations = function(){
  // debugger;
  // if (this.enemyPlanes.length > 0){
    this.enemyPlanes =  this.enemyPlanes.filter(function(plane){
     return (plane.y < this.canvasHeight && plane.x > -300);
   }.bind(this));
  // }
};

GameBoard.prototype.clearDestroyedPlanes = function(){
  this.enemyPlanes = this.enemyPlanes.filter(function(plane){
    return plane.health > 0;
  });
};

GameBoard.prototype.drawShip = function(){
  this.ctx.beginPath();
  this.ctx.rect(this.shipX, this.shipY, this.userPlaneWidth, this.userPlaneHeight );
  this.ctx.fillStyle = "white";
  this.ctx.fill();
  this.ctx.closePath();
};

GameBoard.prototype.levelScreen = function(levelNumber){
  this.ctx.font = "20px 'Press Start 2P'";
  this.ctx.fillStyle = "#0095DD";
  let textString = "Starting Level " + levelNumber;
  this.addTextToScreen(textString, 400);
};

GameBoard.prototype.drawScore = function(){
  this.ctx.font = "16px 'Press Start 2P'";
  this.ctx.fillStyle = "#0095DD";
  this.ctx.fillText("Score: " + this.score, this.canvasWidth - 200, 20);
};

GameBoard.prototype.startScreen = function(){
  this.ctx.font = "20px 'Press Start 2P'";
  this.ctx.fillStyle = "#0095DD";
  let textString = "Press Enter to Play";
  this.addTextToScreen(textString, 400);
};

GameBoard.prototype.gameOverScreen = function(){
  this.ctx.font = "20px 'Press Start 2P'";
  this.ctx.fillStyle = "#0095DD";
  let textString = "See You Space Cowboy...";
  let textString2 = "End Score: " + this.score;
  let textString3 = "Press P to Play Again";

  this.addTextToScreen(textString, 300);
  this.addTextToScreen(textString2, 400);
  this.addTextToScreen(textString3, 500);
};

GameBoard.prototype.addTextToScreen = function(textString, y){
  let textWidth = this.ctx.measureText(textString).width;
  this.ctx.fillText(textString, (this.canvasWidth/2) - (textWidth/2),y);
};

GameBoard.prototype.setup = function() {
  this.checkForSecondRound();
  this.checkForThirdRound();
  this.drawScore();
  this.powerUpDrop();
  this.renderEnemyMissiles();
  this.renderEnemyPlanes();
  this.checkMissileLocation();
  this.renderUserMissiles();
  this.checkEnemyPlaneLocations();
};

module.exports = GameBoard;
