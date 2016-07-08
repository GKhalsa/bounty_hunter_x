/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");

	var EnemyPlane = __webpack_require__(1);

	var canvasWidth = canvas.width;
	var canvasHeight = canvas.height;
	var shipWidth = 20;
	var shipHeight = 20;
	var shipX = (canvas.width - shipWidth) / 2;
	var shipY = canvasHeight - 40;
	var rightPressed = false;
	var leftPressed = false;
	var upPressed = false;
	var downPressed = false;
	var missileArray = [];
	var enemyPlane = [new EnemyPlane(200, 100, 50, 50, ctx, canvas)];
	var enemyMissileArray = [];

	function drawShip() {
	  ctx.beginPath();
	  ctx.rect(shipX, shipY, shipWidth, shipHeight);
	  ctx.fillStyle = "white";
	  ctx.fill();
	  ctx.closePath();
	}

	document.addEventListener("keydown", keyDownHandler, false);
	document.addEventListener("keyup", keyUpHandler, false);

	function keyDownHandler(e) {
	  if (e.keyCode === 39) {
	    rightPressed = true;
	  } else if (e.keyCode === 37) {
	    leftPressed = true;
	  } else if (e.keyCode === 38) {
	    upPressed = true;
	  } else if (e.keyCode === 40) {
	    downPressed = true;
	  }
	  if (e.keyCode === 32) {
	    missileArray.push(new Missile(shipX, shipY, 5, 5));
	  }
	}

	function Missile(x, y, width, height) {
	  this.x = x + 4;
	  this.y = y;
	  this.width = width;
	  this.height = height;
	  this.color = "red";
	}

	function checkMissileLocation() {
	  missileArray = missileArray.filter(function (missile) {
	    return missile.x > 0 && missile.x < canvasWidth && missile.y > 0 && missile.y < canvasHeight;
	  });
	}

	Missile.prototype.drawMissile = function () {
	  ctx.fillStyle = this.color;
	  ctx.fillRect(this.x, this.y, this.width, this.height);
	  return this;
	};

	Missile.prototype.launch = function () {
	  this.y -= 20;
	  return this;
	};

	// function EnemyMissile(x, y, width, height){
	//   this.x = x + 4;
	//   this.y = y + 10;
	//   this.width = width;
	//   this.height = height;
	//   this.color = "red";
	// }
	//
	//
	//
	// EnemyMissile.prototype.drawMissile = function(){
	//   ctx.fillStyle = this.color;
	//   ctx.fillRect(this.x, this.y, this.width, this.height);
	//   return this;
	// };
	//
	// EnemyMissile.prototype.launch = function(){
	//   this.y += 5;
	//   return this;
	// };

	function keyUpHandler(e) {
	  if (e.keyCode === 39) {
	    rightPressed = false;
	  } else if (e.keyCode === 37) {
	    leftPressed = false;
	  } else if (e.keyCode === 38) {
	    upPressed = false;
	  } else if (e.keyCode === 40) {
	    downPressed = false;
	  }
	}

	function enemyCollisionDetection() {
	  enemyPlane.forEach(function (plane) {
	    missileArray.forEach(function (missile) {
	      if (missile.x > plane.x && missile.x < plane.x + plane.width && missile.y > plane.y && missile.y < plane.y + plane.height) {
	        enemyPlane.pop(plane);
	      }
	    });
	  });
	}

	function userCollisionDetection() {
	  enemyMissileArray.forEach(function (missile) {
	    if (missile.x > shipX && missile.x < shipX + shipWidth && missile.y > shipY && missile.y < shipY + shipHeight) {
	      console.log('TL');
	    }
	    if (missile.x + 5 > shipX && missile.x + 5 < shipX + shipWidth && missile.y > shipY && missile.y < shipY + shipHeight) {
	      console.log('TR');
	    }
	    if (missile.x > shipX && missile.x < shipX + shipWidth && missile.y + 5 > shipY && missile.y + 5 < shipY + shipHeight) {
	      console.log('BL');
	    }
	    if (missile.x + 5 > shipX && missile.x + 5 < shipX + shipWidth && missile.y + 5 > shipY && missile.y + 5 < shipY + shipHeight) {
	      console.log('BR');
	    }

	    //x > shipX && x < shipX + shipWidth && y > shipY && y < shipY + shipHeight

	    // [missile.x, missile.y]
	    // [missile.x + missileWidth, missile.y]
	    // [missile.x, missile.y missileHeight]
	    // [missile.x + missileWidth, missile.y + missileHeight]

	    // [missile.x, missile.x, missile.y, missile.y]
	    // [missile.x + missileWidth, missile.x + missileWidth, missile.y, missile.y]
	    // [missle.x, missle.x, missle.y + missileHeight, missle.y + missileHeight]
	    // [missle.x + missileWidth, missle.x + missileWidth, missle.y + missileHeight, missle.y + missileHeight]
	  });
	}

	function leftRightMovement() {
	  if (leftPressed && shipX > 0) {
	    shipX -= 10;
	  }
	  if (rightPressed && shipX < canvasWidth - shipWidth) {
	    shipX += 10;
	  }
	  if (upPressed && shipY > 0) {
	    shipY -= 10;
	  }
	  if (downPressed && shipY < canvasHeight - shipHeight) {
	    shipY += 10;
	  }
	}

	function draw() {
	  ctx.clearRect(0, 0, canvas.width, canvas.height);

	  drawShip();

	  enemyMissileArray.forEach(function (missile) {
	    missile.drawMissile().launch();
	  });

	  enemyPlane.forEach(function (plane) {
	    plane.drawPlane().movement();
	    var missile = plane.launchMissile();
	    // if ( missile !== undefined){
	    if (Math.random() > 0.895) {
	      enemyMissileArray.push(missile);
	    }
	  });

	  checkMissileLocation();
	  missileArray.forEach(function (missile) {
	    missile.drawMissile().launch();
	  });

	  userCollisionDetection();
	  enemyCollisionDetection();
	  leftRightMovement();
	  requestAnimationFrame(draw);
	}

	draw();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var EnemyMissile = __webpack_require__(2);

	var move = 5;

	function EnemyPlane(x, y, width, height, ctx, canvas) {
	  this.x = x;
	  this.y = y;
	  this.width = width;
	  this.height = height;
	  this.ctx = ctx;
	  this.canvasWidth = canvas.width;
	}

	EnemyPlane.prototype.drawPlane = function () {
	  this.ctx.beginPath();
	  this.ctx.rect(this.x, this.y, this.width, this.height);
	  this.ctx.fillStyle = "white";
	  this.ctx.fill();
	  this.ctx.closePath();

	  return this;
	};

	EnemyPlane.prototype.movement = function () {
	  if (this.x > this.canvasWidth - this.width || this.x < 0) {
	    move = -move;
	  }
	  this.x += move;
	  return this;
	};

	EnemyPlane.prototype.launchMissile = function () {
	  return new EnemyMissile(this.x, this.y, 5, 5, this.ctx);
	};

	module.exports = EnemyPlane;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	function EnemyMissile(x, y, width, height, ctx) {
	  this.x = x + 4;
	  this.y = y + 10;
	  this.width = width;
	  this.height = height;
	  this.color = "red";
	  this.ctx = ctx;
	}

	EnemyMissile.prototype.drawMissile = function () {
	  this.ctx.fillStyle = this.color;
	  this.ctx.fillRect(this.x, this.y, this.width, this.height);
	  return this;
	};

	EnemyMissile.prototype.launch = function () {
	  this.y += 5;
	  return this;
	};

	module.exports = EnemyMissile;

/***/ }
/******/ ]);