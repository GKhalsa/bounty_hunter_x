function Explosion(gameBoard){
  this.gameBoard = gameBoard;
}


Explosion.prototype.explosionSequence = function(num){
  // for(let i = 1; i < 109;i++){
    var explosion = new Image();
    explosion.src = './assets/explosions/explosion_'+num+'.png';
    this.gameBoard.ctx.drawImage(explosion, this.gameBoard.shipX -5, this.gameBoard.shipY -5, 40, 40);

};

module.exports = Explosion;
