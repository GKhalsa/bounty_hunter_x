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
  this.aiBuddy         = [];
}

GameBoard.prototype.launchAiBuddy = function(){
  if (this.aiBuddy.length > 0){this.aiBuddy[0].drawPlane().movement();}
};

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
      x: -(this.randomNum(1, 200)),
      y: -(this.randomNum(15, 30)),
      movement: {x:7, y:20},
      size:{width:30, height:50},
      health: 10,
      image: {sprite: './alienspaceship-diagonal-right.png'}


    },
    {
      x: (this.randomNum(this.canvasWidth, this.canvasWidth + 50)),
      y: (this.randomNum(1, 100)),
      movement: {x:-20, y:2},
      size:{width:30, height:50},
      health: 10,
      image: {sprite: './alienspaceship-left.png'}


    },
    {
      x: (this.randomNum(0, this.canvasWidth)),
      y: -(this.randomNum(7, 20)),
      movement: {x:0, y:30},
      size:{width:30, height:50},
      health: 10,
      image: {sprite: './alienspaceship.png'}


    }];

    let enemies = patterns[this.randomNum(0,3)];
    this.enemyPlanes.push(this.newEnemyPlane(enemies.x, enemies.y, enemies.movement, enemies.size, enemies.health, enemies.image ));
  }
};

// GameBoard.prototype.generateEnemyPlanes = function(){
//   for(let i = 0; i< (this.level * 5) ;i++){
//     let patterns = [{
//       x: -(this.randomNum(1, 200)),
//       y: -(this.randomNum(15, 30)),
//       movement: {x:7, y:20},
//       size:{width:30, height:50},
//       health: 10,
//       image:{sprite: './alienspaceship-diagonal-right.png'}
//
//     },
//     {
//       x:  (this.randomNum(100,500)),
//       y: -(this.randomNum(200, 201)),
//       movement: {x:0, y:4 },
//       size:{width: 200, height: 200},
//       health: 30,
//       image: {width: 200, height: 200, sprite: './level_2_big_enemy.png'}
//
//     },
//     {
//       x: (this.randomNum(0, this.canvasWidth)),
//       y: -(this.randomNum(7, 20)),
//       movement: {x:0, y:30},
//       size:{width:30, height:50},
//       health:10,
//       image: {sprite: './alienspaceship.png'}
//
//
//     }];
//
//     // let enemies = patterns[this.randomNum(0,3)];
//     let enemies = patterns[1];
//     this.enemyPlanes.push(this.newEnemyPlane(enemies.x, enemies.y, enemies.movement, enemies.size, enemies.health, enemies.image));
//   }
// };

// GameBoard.prototype.generateEnemyPlanes = function(){
//   let patterns = [{
//     x: (this.randomNum(300, 300)),
//     y: (this.randomNum(100, 100)),
//     movement: {x:0, y:0},
//     size:{width:200, height:200},
//     health: 300,
//     image:{width: 300, height: 300, sprite:'./finalSpinningBoss.png'}
//
//   },
//   ];
//
//   let enemies = patterns[0];
//   this.enemyPlanes.push(this.newEnemyPlane(enemies.x, enemies.y, enemies.movement, enemies.size, enemies.health, enemies.image));
//
// };



GameBoard.prototype.randomNum = function(firstNum, secondNum) {
  return Math.floor(Math.random() * secondNum) + firstNum;
};

GameBoard.prototype.newEnemyPlane = function(x,y,movement, size, health, image){
  return new EnemyPlane(x, y, size.width, size.height, this.ctx, this.canvas, movement, health, image);
};

GameBoard.prototype.checkEnemyPlaneLocations = function(){
    this.enemyPlanes =  this.enemyPlanes.filter(function(plane){
     return (plane.y < this.canvasHeight && plane.x > -300);
   }.bind(this));
};

GameBoard.prototype.clearDestroyedPlanes = function(){
  this.enemyPlanes = this.enemyPlanes.filter(function(plane){
    return plane.health !== 0;
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
  this.textHelpers.drawScore(this.score);
  this.powerUpDrop();
  this.missileHelpers.renderEnemyMissiles(this.enemyMissiles);
  this.renderEnemyPlanes();
  this.checkUserMissileLocations();
  this.checkEnemyMissileLocations();
  this.missileHelpers.renderUserMissiles(this.userMissiles);
  this.checkEnemyPlaneLocations();
  this.launchAiBuddy();
};

module.exports = GameBoard;
