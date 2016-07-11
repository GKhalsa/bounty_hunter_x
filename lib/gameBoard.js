const EnemyPlane       = require('./enemyPlane.js');


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

}

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

GameBoard.prototype.renderEnemyPlanes = function(){
  var enemyPlaneSet = this.enemyPlaneSets()[0];
  this.enemyPlanes.push(enemyPlaneSet);
  if (this.checkEnemyPlaneLocations()){console.log('');} // or check that all planes are killed
  this.enemyPlanes[0].forEach(function(plane){
    plane.drawPlane().movement();
    let missile = plane.launchMissile();
    if(Math.random() > 0.98) {
      this.enemyMissiles.push(missile);
    }
  }.bind(this));
};


GameBoard.prototype.enemyPlaneSets = function(){
  return [[new EnemyPlane(-50, -50, 30, 50, this.ctx, this.canvas), new EnemyPlane(-110, 20, 30, 50, this.ctx, this.canvas), new EnemyPlane(-140, 90, 30, 50, this.ctx, this.canvas)]];
};

GameBoard.prototype.checkEnemyPlaneLocations = function(){
 return this.enemyPlanes[0].every(plane => plane.x > this.canvasWidth);
};

GameBoard.prototype.drawShip = function(){
  this.ctx.beginPath();
  this.ctx.rect(this.shipX, this.shipY, this.userPlaneWidth, this.userPlaneHeight );
  this.ctx.fillStyle = "white";
  this.ctx.fill();
  this.ctx.closePath();
};

GameBoard.prototype.drawScore = function(){
  this.ctx.font = "16px 'Press Start 2P'";
  this.ctx.fillStyle = "#0095DD";
  this.ctx.fillText("Score: " + this.score, this.canvasWidth - 150, 20);
};

GameBoard.prototype.startScreen = function(){
  this.ctx.font = "20px 'Press Start 2P'";
  this.ctx.fillStyle = "#0095DD";
  let textString = "Press Enter to Play";
  let textWidth = this.ctx.measureText(textString).width;
  this.ctx.fillText(textString, (this.canvasWidth/2) - (textWidth/2), 400);
};

GameBoard.prototype.gameOverScreen = function(){
  this.ctx.font = "20px 'Press Start 2P'";
  this.ctx.fillStyle = "#0095DD";
  let textString = "Sucks to Suck";
  let textString2 = "End Score: " + this.score;
  let textString3 = "Press P to Play Again";
  let textWidth = this.ctx.measureText(textString).width;
  let textWidth2 = this.ctx.measureText(textString2).width;
  let textWidth3 = this.ctx.measureText(textString3).width;
  this.ctx.fillText(textString, (this.canvasWidth/2) - (textWidth/2),300);
  this.ctx.fillText(textString2, (this.canvasWidth/2) - (textWidth2/2),400);
  this.ctx.fillText(textString3, (this.canvasWidth/2) - (textWidth3/2),500);
};

GameBoard.prototype.setup = function() {
  // this.drawShip();
  if (this.startGame){
    this.drawScore();
    this.renderEnemyMissiles();
    this.renderEnemyPlanes();
    this.checkMissileLocation();
    this.renderUserMissiles();
  }
};

module.exports = GameBoard;
