function GameBoardMissileHelpers(userMissiles,enemyMissiles, shipX, shipY, canvasWidth, canvasHeight){
  this.userMissiles = userMissiles;
  this.enemyMissiles = enemyMissiles;
  this.shipX = shipX;
  this.shipY = shipY;
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
}

GameBoardMissileHelpers.prototype.renderEnemyMissiles = function(enemyMissiles){
  enemyMissiles.forEach(function(missile){
    missile.drawMissile().launch();
  });
};

GameBoardMissileHelpers.prototype.renderUserMissiles = function(userMissiles){
  userMissiles.forEach(function(missile){
    missile.drawMissile().launch();
  });
};

module.exports = GameBoardMissileHelpers;
