const chai          = require('chai').assert;
const GameBoard     = require('../lib/gameBoard.js');
const KeyController = require('../lib/keyController.js');
var canvas = document.getElementById("myCanvas");
var ctx    = canvas.getContext("2d");


var expect = require('chai').expect;

describe('GameBoard', function() {
  context('player can move', function(){
    var gameBoard     = new GameBoard(canvas, ctx);
    var keyController = new KeyController(ctx, canvas, gameBoard);

    it('shows new player location', function(){
      expect(gameBoard.shipX).to.equal(290);
      expect(gameBoard.shipY).to.equal(760);
    });

    it('can move player to the left', function(){
      keyController.leftPressed = true;
      keyController.leftRightMovement();
      expect(gameBoard.shipX).to.equal(280);
    });

    it('can move player to the right', function(){
      keyController.leftPressed  = false;
      keyController.rightPressed = true;
      keyController.leftRightMovement();
      expect(gameBoard.shipX).to.equal(290);
    });

    it('can move player up', function(){
      keyController.upPressed = true;
      keyController.leftRightMovement();
      expect(gameBoard.shipY).to.equal(750);
    });
    //
    it('can move player down', function(){
      keyController.upPressed = false;
      keyController.downPressed = true;
      keyController.leftRightMovement();
      expect(gameBoard.shipY).to.equal(760);
    });
  });
});
