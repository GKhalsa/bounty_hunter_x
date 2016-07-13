const GameBoard     = require('../lib/gameBoard.js');
const CollisionDetection = require('../lib/collisionDetection.js');
const KeyController = require('../lib/keyController.js');

var canvas = document.getElementById("myCanvas");
var ctx    = canvas.getContext("2d");


var expect = require('chai').expect;

describe('Collision Detection', function() {
  context('missiles can shoot down enemy/user', function() {
    var gameBoard          = new GameBoard(canvas, ctx);
    var collisionDetection = new CollisionDetection(gameBoard);
    var keyController      = new KeyController(ctx, canvas, gameBoard);

    it('removes shot enemy from screen', function(){
      gameBoard.generateEnemyPlanes();
      let enemyPlane = gameBoard.enemyPlanes[0];
      expect(gameBoard.enemyPlanes.length).to.equal(5);
      keyController.keyDownHandler({keyCode: 32});
      gameBoard.userMissiles[0].x = enemyPlane.x;
      gameBoard.userMissiles[0].y = enemyPlane.y;
      collisionDetection.enemy();
      gameBoard.clearDestroyedPlanes();
      expect(gameBoard.enemyPlanes.length).to.equal(4);
    });

    // it('removes shot user from screen', function(){
    //   expect(gameBoard.shipX).to.equal(290);
    //   expect(gameBoard.shipY).to.equal(760);
    //   gameBoard.enemyMissiles[0] = enemyPlane.launchMissile();
    //   expect(gameBoard.enemyMissiles.length).to.equal(1);
    //   gameBoard.enemyMissiles[0].x = 300;
    //   gameBoard.enemyMissiles[0].y = 770;
    //   collisionDetection.user();
    //   expect(gameBoard.shipX).to.equal(800);
    //   expect(gameBoard.shipY).to.equal(800);
    // });
  });
});
