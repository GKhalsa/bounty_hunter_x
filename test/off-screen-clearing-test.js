const GameBoard     = require('../lib/gameBoard.js');
const KeyController = require('../lib/keyController.js');
var canvas = document.getElementById("myCanvas");
var ctx    = canvas.getContext("2d");
var expect = require('chai').expect;


describe('Off Screen Clearing', function() {
  var gameBoard     = new GameBoard(canvas, ctx);
  var keyController = new KeyController(ctx, canvas, gameBoard);
  context('Game removes stray missiles', function(){
    it('removes users offscreen missiles', function(){
      keyController.keyDownHandler({keyCode: 32});
      expect(gameBoard.userMissiles.length).to.equal(1);
      gameBoard.userMissiles[0].y = -5;
      gameBoard.userMissiles[0].x = -5;
      gameBoard.checkUserMissileLocations();
      expect(gameBoard.userMissiles.length).to.equal(0);
    });

    it('removes enemy offscreen missiles', function(){
      gameBoard.generateEnemyPlanes();
      let enemyPlane = gameBoard.enemyPlanes[0];
      gameBoard.enemyMissiles.push(enemyPlane.launchMissile());
      expect(gameBoard.enemyMissiles.length).to.equal(1);
      gameBoard.enemyMissiles[0].y = 900;
      gameBoard.checkEnemyMissileLocations();
      expect(gameBoard.enemyMissiles.length).to.equal(0);
    });
  });
});
