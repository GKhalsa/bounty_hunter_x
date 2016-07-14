const GameBoard     = require('../lib/gameBoard.js');
const KeyController = require('../lib/keyController.js');
var canvas = document.getElementById("myCanvas");
var ctx    = canvas.getContext("2d");


var expect = require('chai').expect;

describe('Player Movement', function() {
  context('player can move', function(){
    var gameBoard     = new GameBoard(canvas, ctx);
    var keyController = new KeyController(ctx, canvas, gameBoard);

    it('shows new player location', function(){
      expect(gameBoard.shipX).to.equal(285);
      expect(gameBoard.shipY).to.equal(760);
    });

    it('can move player to the left', function(){
      keyController.leftPressed = true;
      keyController.userMovement();
      expect(gameBoard.shipX).to.equal(275);
    });

    it('can move player to the right', function(){
      keyController.leftPressed  = false;
      keyController.rightPressed = true;
      keyController.userMovement();
      expect(gameBoard.shipX).to.equal(285);
    });

    it('can move player up', function(){
      keyController.upPressed = true;
      keyController.userMovement();
      expect(gameBoard.shipY).to.equal(750);
    });

    it('can move player down', function(){
      keyController.upPressed = false;
      keyController.downPressed = true;
      keyController.userMovement();
      expect(gameBoard.shipY).to.equal(760);
    });

    it('goes beyond canvas walls and returns on opposite side', function() {
      gameBoard.shipX = canvas.width - 31;
      keyController.rightPressed = true;
      keyController.userMovement();
      keyController.userMovement();
      keyController.userMovement();
      keyController.userMovement();
      expect(gameBoard.shipX).to.equal(10);

      keyController.rightPressed = false;
      keyController.leftPressed = true;
      keyController.userMovement();
      keyController.userMovement();
      expect(gameBoard.shipX).to.equal(580);
    });
  });
});
