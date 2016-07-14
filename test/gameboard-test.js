const GameBoard          = require('../lib/gameBoard.js');
const CollisionDetection = require('../lib/collisionDetection.js');
const KeyController = require('../lib/keyController.js');

var canvas          = document.getElementById("myCanvas");
var ctx             = canvas.getContext("2d");
var expect          = require('chai').expect;

describe('Gameboard', function() {
  var gameBoard          = new GameBoard(canvas, ctx);
  var keyController      = new KeyController(ctx, canvas, gameBoard);
  var collisionDetection = new CollisionDetection(gameBoard);

  context('Gameboard Functionality', function() {
    it('Increases Score', function() {
      expect(gameBoard.score).to.equal(0);
      gameBoard.generateEnemyPlanes();
      let enemyPlane = gameBoard.enemyPlanes[0];
      keyController.keyDownHandler({keyCode: 32});
      gameBoard.userMissiles[0].x = enemyPlane.x;
      gameBoard.userMissiles[0].y = enemyPlane.y;
      collisionDetection.enemy();
      expect(gameBoard.score).to.equal(10);
    });

    it('Increases level', function(){
      expect(gameBoard.level).to.equal(1);
      gameBoard.frameCount = 1;
      gameBoard.checkForRound(1, 4, 2);
      expect(gameBoard.level).to.equal(2);
    });

    it('Starts a level', function(){
      expect(gameBoard.levelStart).to.equal(false);
      gameBoard.frameCount = 4;
      gameBoard.checkForRound(1, 4, 2);
      expect(gameBoard.levelStart).to.equal(true);
    });
  });
});
