const EnemyPlane                 = require('./enemyPlane.js');
const UserMissile                = require('./userMissile.js');
const GameBoardMissileHelpers    = require('./gameBoardMissileHelper.js');
const GameBoardScreenTextHelper  = require('./gameBoardScreenTextHelper.js');

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
  this.missileHelpers  = new GameBoardMissileHelpers(this.userMissiles,this.enemyMissiles, this.shipX, this.shipY, this.canvasWidth, this.canvasHeight);
  this.textHelpers     = new GameBoardScreenTextHelper(this.ctx, this.score, this.canvasWidth);
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

GameBoard.prototype.checkForRound = function(startRound, endRound, levelNum){
  if (this.frameCount === startRound){
    this.level = levelNum;
    if(this.level === 3){this.levelStart = false;}
   }
   if(this.level === levelNum && this.levelStart === false) {
     this.textHelpers.levelScreen(levelNum.toString());
     this.enemyPlanes = [];
   }

   if (this.frameCount === endRound ){
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

GameBoard.prototype.setup = function() {
  this.checkForRound(300, 600, 2);
  this.checkForRound(800, 1000, 3);
  this.textHelpers.drawScore();
  this.powerUpDrop();
  this.missileHelpers.renderEnemyMissiles();
  this.renderEnemyPlanes();
  this.checkMissileLocation();
  this.missileHelpers.renderUserMissiles();
  this.checkEnemyPlaneLocations();
};

module.exports = GameBoard;
