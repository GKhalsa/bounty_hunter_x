
function GameBoardScreenTextHelper(ctx, canvasWidth){
  this.ctx         = ctx;
  this.canvasWidth = canvasWidth;
}

GameBoardScreenTextHelper.prototype.levelScreen = function(levelNumber){
  this.ctx.font = "20px 'Press Start 2P'";
  this.ctx.fillStyle = "#0095DD";
  let textString = "Starting Level " + levelNumber;
  this.addTextToScreen(textString, 400);
};

GameBoardScreenTextHelper.prototype.drawScore = function(score){
  this.ctx.font = "16px 'Press Start 2P'";
  this.ctx.fillStyle = "#0095DD";
  this.ctx.fillText("Score: " + score, this.canvasWidth - 200, 20);
};

GameBoardScreenTextHelper.prototype.startScreen = function(){
  this.ctx.font = "20px 'Press Start 2P'";
  this.ctx.fillStyle = "#0095DD";
  let textString = "Press Enter to Play";
  this.addTextToScreen(textString, 400);
};

GameBoardScreenTextHelper.prototype.gameOverScreen = function(score){
  this.ctx.font = "20px 'Press Start 2P'";
  this.ctx.fillStyle = "#0095DD";
  let textString = "See You Space Cowboy...";
  let textString2 = "End Score: " + score;
  let textString3 = "Press P to Play Again";

  this.addTextToScreen(textString, 300);
  this.addTextToScreen(textString2, 400);
  this.addTextToScreen(textString3, 500);
};

GameBoardScreenTextHelper.prototype.addTextToScreen = function(textString, y){
  let textWidth = this.ctx.measureText(textString).width;
  this.ctx.fillText(textString, (this.canvasWidth/2) - (textWidth/2),y);
};

module.exports = GameBoardScreenTextHelper;