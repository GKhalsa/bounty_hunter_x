// const EnemyPlane                 = require('./enemyPlane.js');
const UserMissile                = require('./userMissile.js');
const GameBoardMissileHelpers    = require('./gameBoardMissileHelper.js');
const GameBoardScreenTextHelper  = require('./gameBoardScreenTextHelper.js');
const EnemyLevels                = require('./enemyLevels.js');

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
  this.textHelpers     = new GameBoardScreenTextHelper(this.ctx, this.canvasWidth);
  this.enemyLevels     = new EnemyLevels(this.level, this.ctx, this.canvas, this);
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

GameBoard.prototype.checkUserMissileLocations = function(){
  this.userMissiles = this.userMissiles.filter(function (missile){
    return (missile.y > 0);
  }.bind(this));
};

GameBoard.prototype.checkEnemyMissileLocations = function(){
  this.enemyMissiles = this.enemyMissiles.filter(function(missile){
    return (missile.y < this.canvasHeight);
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

  if (this.frameCount % 100 === 0 && (this.levelStart === true || this.level === 1)){
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
  this.enemyPlanes = this.enemyPlanes.concat(this.enemyLevels.generator(this.level));
  // this.enemyPlanes = this.enemyPlanes.concat(this.enemyLevels.generateEnemyPlanesLevel1());
  // debugger;
};

GameBoard.prototype.checkEnemyPlaneLocations = function(){
    this.enemyPlanes =  this.enemyPlanes.filter(function(plane){
     return (plane.y < this.canvasHeight && plane.x > -300);
   }.bind(this));
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
  this.checkForRound(1600, 1800, 2);
  this.checkForRound(3000, 3200, 3);
  this.textHelpers.drawScore(this.score);
  this.powerUpDrop();
  this.missileHelpers.renderEnemyMissiles(this.enemyMissiles);
  this.renderEnemyPlanes();
  this.checkUserMissileLocations();
  this.checkEnemyMissileLocations();
  this.missileHelpers.renderUserMissiles(this.userMissiles);
  this.checkEnemyPlaneLocations();
};

module.exports = GameBoard;
