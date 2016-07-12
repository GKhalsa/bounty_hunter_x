function GameBoardMissileHelpers(userMissiles,enemyMissiles, shipX, shipY, canvasWidth, canvasHeight){
  this.userMissiles = userMissiles;
  this.enemyMissiles = enemyMissiles;
  this.shipX = shipX;
  this.shipY = shipY;
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
}

GameBoardMissileHelpers.prototype.renderEnemyMissiles = function(){
  this.enemyMissiles.forEach(function(missile){
    missile.drawMissile().launch();
  });
};

GameBoardMissileHelpers.prototype.renderUserMissiles = function(){
  this.userMissiles.forEach(function(missile){
    missile.drawMissile().launch();
  });
};

module.exports = GameBoardMissileHelpers;
