
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
  this.ctx.font = "60px 'MyWebFont'";
  this.ctx.fillStyle = "teal";
  let textString1 = "Bounty Hunter X";
  let textString2 = "Press Enter to Play";
  this.addTextToScreen(textString1, 400);
  this.addTextToScreen(textString2, 500);
};

GameBoardScreenTextHelper.prototype.gameOverScreen = function(score){
  this.ctx.font = "20px 'Press Start 2P'";
  this.ctx.fillStyle = "#0095DD";
  let textString = "See You Space Cowboy...";
  let textString2 = "End Score: " + score;
  let textString3 = "Press P to Play Again";
  let textString4 = "TOP THREE SCORES";
  let textString5 = this.gatherScores().sort(function(a,b){return a - b;}).reverse().slice(0,3).join('  || \n');

  this.addTextToScreen(textString, 100);
  this.addTextToScreen(textString2, 300);
  this.addTextToScreen(textString3, 400);
  this.addTextToScreen(textString4, 500);
  this.addTextToScreen(textString5, 600);
};

GameBoardScreenTextHelper.prototype.addTextToScreen = function(textString, y){
  let textWidth = this.ctx.measureText(textString).width;
  this.ctx.fillText(textString, (this.canvasWidth/2) - (textWidth/2),y);
};

GameBoardScreenTextHelper.prototype.gatherScores = function(){
  let scores = [];
  Object.keys(localStorage).forEach(function(key){
    let num = parseInt(localStorage[key]);
    scores.push(num);
  });
  return scores;
};

module.exports = GameBoardScreenTextHelper;
