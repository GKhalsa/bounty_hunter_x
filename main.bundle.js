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

	var KeyController = __webpack_require__(1);
	var GameBoard = __webpack_require__(4);
	var CollisionDetection = __webpack_require__(11);
	var MainGameLoop = __webpack_require__(15);

	var gameBoard = new GameBoard(canvas, ctx);
	var keyController = new KeyController(ctx, canvas, gameBoard);
	var collisionDetection = new CollisionDetection(gameBoard);
	var mainGameLoop = new MainGameLoop(gameBoard, canvas, ctx, keyController, collisionDetection);

	document.addEventListener("keydown", keyController.keyDownHandler.bind(keyController), false);
	document.addEventListener("keyup", keyController.keyUpHandler.bind(keyController), false);

	function draw() {
	  mainGameLoop.loop();
	  requestAnimationFrame(draw);
	}

	draw();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var UserShipImages = __webpack_require__(2);
	var Sound = __webpack_require__(3);

	function KeyController(ctx, canvas, gameBoard) {
	  this.gameBoard = gameBoard;
	  this.rightPressed = false;
	  this.leftPressed = false;
	  this.upPressed = false;
	  this.downPressed = false;
	  this.ctx = ctx;
	  this.canvasWidth = canvas.width;
	  this.canvasHeight = canvas.height;
	  this.shipWidth = 20;
	  this.shipHeight = 20;
	}

	KeyController.prototype.keyDownHandler = function (e) {
	  this.shipControls(e);
	  this.menuOptions(e);
	};

	KeyController.prototype.shipControls = function (e) {
	  switch (e.keyCode) {
	    case 32:
	      this.gameBoard.launchNewMissile();
	      var mySound = new Sound("../assets/sounds/shoot.wav", 0.1);
	      mySound.play();
	      break;

	    case 37:
	      this.leftPressed = true;
	      break;

	    case 38:
	      this.upPressed = true;
	      break;

	    case 39:
	      this.rightPressed = true;
	      break;

	    case 40:
	      this.downPressed = true;
	      break;
	  }
	};

	KeyController.prototype.menuOptions = function (e) {
	  switch (e.keyCode) {
	    case 13:
	      this.gameBoard.startGame = true;
	      var mySound = new Sound("../assets/sounds/bebop-theme.mp3", 0.4);
	      mySound.play();

	      break;

	    case 80:
	      if (this.gameBoard.endGame) {
	        location.reload();
	      }
	      break;
	  }
	};

	KeyController.prototype.keyUpHandler = function (e) {
	  switch (e.keyCode) {
	    case 37:
	      this.leftPressed = false;
	      break;

	    case 38:
	      this.upPressed = false;
	      break;

	    case 39:
	      this.rightPressed = false;
	      break;

	    case 40:
	      this.downPressed = false;
	      break;
	  }
	};

	KeyController.prototype.leftMovement = function () {
	  if (this.leftPressed && this.gameBoard.shipX <= 10) {
	    this.gameBoard.shipX = this.canvasWidth;
	  }
	  if (this.leftPressed && this.gameBoard.shipX > 0) {
	    this.gameBoard.shipX -= 10;
	  }
	};

	KeyController.prototype.rightMovement = function () {
	  if (this.rightPressed && this.gameBoard.shipX >= this.canvasWidth - this.shipWidth) {
	    this.gameBoard.shipX = -10;
	  }
	  if (this.rightPressed && this.gameBoard.shipX < this.canvasWidth - this.shipWidth) {
	    this.gameBoard.shipX += 10;
	  }
	};

	KeyController.prototype.upDownMovement = function () {
	  if (this.upPressed && this.gameBoard.shipY > 0) {
	    this.gameBoard.shipY -= 10;
	  }
	  if (this.downPressed && this.gameBoard.shipY < this.canvasHeight - (this.shipHeight + 10)) {
	    this.gameBoard.shipY += 10;
	  }
	};

	KeyController.prototype.userMovement = function () {
	  this.leftMovement();
	  this.rightMovement();
	  this.upDownMovement();
	};

	KeyController.prototype.userShipPosition = function () {
	  var userShipImages = new UserShipImages(this.ctx);
	  if (this.leftPressed) {
	    userShipImages.leftPlaneImage(this.gameBoard.shipX, this.gameBoard.shipY);
	  } else if (this.rightPressed) {
	    userShipImages.rightPlaneImage(this.gameBoard.shipX, this.gameBoard.shipY);
	  } else {
	    userShipImages.centerPlaneImage(this.gameBoard.shipX, this.gameBoard.shipY);
	  }
	};

	module.exports = KeyController;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	function UserShipImages(ctx) {
	  this.ctx = ctx;
	}

	UserShipImages.prototype.centerPlaneImage = function (shipX, shipY) {
	  var plane = new Image();
	  plane.src = '../assets/user-images/redfighter-straight.png';
	  this.ctx.drawImage(plane, shipX - 5, shipY - 5, 40, 40);
	};

	UserShipImages.prototype.leftPlaneImage = function (shipX, shipY) {
	  var plane = new Image();
	  plane.src = '../assets/user-images/redfighter-left.png';
	  this.ctx.drawImage(plane, shipX - 10, shipY, 40, 40);
	};

	UserShipImages.prototype.rightPlaneImage = function (shipX, shipY) {
	  var plane = new Image();
	  plane.src = '../assets/user-images/redfighter-right.png';
	  this.ctx.drawImage(plane, shipX - 10, shipY, 40, 40);
	};

	module.exports = UserShipImages;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	function Sound(src, volume) {
	    this.sound = document.createElement("audio");
	    this.sound.src = src;
	    this.sound.setAttribute("preload", "auto");
	    this.sound.setAttribute("controls", "none");
	    this.sound.style.display = "none";
	    this.sound.volume = volume;
	    document.body.appendChild(this.sound);
	    this.play = function () {
	        this.sound.play();
	    };
	    this.stop = function () {
	        this.sound.pause();
	    };
	}

	module.exports = Sound;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// const EnemyPlane                 = require('./enemyPlane.js');
	'use strict';

	var UserMissile = __webpack_require__(5);
	var GameBoardMissileHelpers = __webpack_require__(6);
	var GameBoardScreenTextHelper = __webpack_require__(7);
	var EnemyLevels = __webpack_require__(8);

	function GameBoard(canvas, ctx) {
	  this.startGame = false;
	  this.endGame = false;
	  this.ctx = ctx;
	  this.enemyPlanes = [];
	  this.enemyMissiles = [];
	  this.userMissiles = [];
	  this.level = 1;
	  this.canvas = canvas;
	  this.canvasWidth = canvas.width;
	  this.canvasHeight = canvas.height;
	  this.userPlaneWidth = 30;
	  this.userPlaneHeight = 30;
	  this.money = 10;
	  this.score = 0;
	  this.shipX = (this.canvasWidth - this.userPlaneWidth) / 2;
	  this.shipY = this.canvasHeight - 40;
	  this.frameCount = 0;
	  this.levelStart = false;
	  this.powerUps = [];
	  this.playerPower = 1;
	  this.missileHelpers = new GameBoardMissileHelpers(this.userMissiles, this.enemyMissiles, this.shipX, this.shipY, this.canvasWidth, this.canvasHeight);
	  this.textHelpers = new GameBoardScreenTextHelper(this.ctx, this.canvasWidth);
	  this.enemyLevels = new EnemyLevels(this.level, this.ctx, this.canvas, this);
	  this.aiBuddy = [];
	}

	GameBoard.prototype.launchNewMissile = function () {
	  this.userMissiles.push(new UserMissile(this.shipX, this.shipY, 5, 5, this.ctx));
	  if (this.playerPower > 1) {
	    this.userMissiles.push(new UserMissile(this.shipX + 16, this.shipY, 5, 5, this.ctx));
	  }
	};

	GameBoard.prototype.powerUpDrop = function () {
	  this.powerUps.forEach(function (powerUp) {
	    powerUp.draw().moveDown();
	  });
	};

	GameBoard.prototype.clearRedeemedPowerUp = function () {
	  this.powerUps = this.powerUps.filter((function (powerUp) {
	    return powerUp.redeemed === false && powerUp.y < this.canvasHeight;
	  }).bind(this));
	};

	GameBoard.prototype.checkUserMissileLocations = function () {
	  this.userMissiles = this.userMissiles.filter((function (missile) {
	    return missile.y > 0;
	  }).bind(this));
	};

	GameBoard.prototype.checkEnemyMissileLocations = function () {
	  this.enemyMissiles = this.enemyMissiles.filter((function (missile) {
	    return missile.y < this.canvasHeight;
	  }).bind(this));
	};

	GameBoard.prototype.checkForRound = function (startRound, endRound, levelNum) {
	  if (this.frameCount === startRound) {
	    this.level = levelNum;
	    if (this.level === 3) {
	      this.levelStart = false;
	    }
	  }
	  if (this.level === levelNum && this.levelStart === false) {
	    this.textHelpers.levelScreen(levelNum.toString());
	    this.enemyPlanes = [];
	  }

	  if (this.frameCount === endRound) {
	    this.levelStart = true;
	  }
	};

	GameBoard.prototype.renderEnemyPlanes = function () {
	  this.frameCount++;

	  if (this.frameCount % 100 === 0 && (this.levelStart === true || this.level === 1)) {
	    this.generateEnemyPlanes();
	  }
	  this.enemyPlanes.forEach((function (plane) {
	    plane.drawPlane().movement();
	    var missile = plane.launchMissile();
	    if (Math.random() > 0.98) {
	      this.enemyMissiles.push(missile);
	    }
	  }).bind(this));
	};

	GameBoard.prototype.generateEnemyPlanes = function () {
	  this.enemyPlanes = this.enemyPlanes.concat(this.enemyLevels.generator(this.level));
	};

	GameBoard.prototype.checkEnemyPlaneLocations = function () {
	  this.enemyPlanes = this.enemyPlanes.filter((function (plane) {
	    return plane.y < this.canvasHeight && plane.x > -300;
	  }).bind(this));
	};

	GameBoard.prototype.clearDestroyedPlanes = function () {
	  this.enemyPlanes = this.enemyPlanes.filter(function (plane) {
	    return plane.health > 0;
	  });
	};

	GameBoard.prototype.drawShip = function () {
	  this.ctx.beginPath();
	  this.ctx.rect(this.shipX, this.shipY, this.userPlaneWidth, this.userPlaneHeight);
	  this.ctx.fillStyle = "white";
	  this.ctx.fill();
	  this.ctx.closePath();
	};

	GameBoard.prototype.renderAiBuddy = function () {
	  if (this.aiBuddy.length > 0) {
	    this.aiBuddy[0].drawPlane().movement();
	    this.userMissiles.push(this.aiBuddy[0].launchMissile());

	    if (this.aiBuddy[0].x > this.canvasWidth) {
	      this.aiBuddy = [];
	    }
	  }
	};

	GameBoard.prototype.setup = function () {
	  this.checkForRound(1600, 1800, 2);
	  this.checkForRound(3000, 3200, 3);
	  this.textHelpers.drawScore(this.score);
	  this.powerUpDrop();
	  this.missileHelpers.renderEnemyMissiles(this.enemyMissiles);
	  this.renderEnemyPlanes();
	  this.checkUserMissileLocations();
	  this.checkEnemyMissileLocations();
	  this.missileHelpers.renderUserMissiles(this.userMissiles);
	  this.checkEnemyPlaneLocations();
	  this.renderAiBuddy();
	};

	module.exports = GameBoard;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	function UserMissile(x, y, width, height, ctx, type) {
	  this.x = x + 4;
	  this.y = y;
	  this.width = width;
	  this.height = height;
	  this.color = "red";
	  this.ctx = ctx;
	  this.type = type;
	}

	UserMissile.prototype.drawMissile = function () {
	  this.ctx.fillStyle = this.color;
	  this.ctx.fillRect(this.x, this.y, this.width, this.height);

	  return this;
	};

	UserMissile.prototype.launch = function () {
	  this.y -= 20;
	  return this;
	};

	module.exports = UserMissile;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	function GameBoardMissileHelpers(userMissiles, enemyMissiles, shipX, shipY, canvasWidth, canvasHeight) {
	  this.userMissiles = userMissiles;
	  this.enemyMissiles = enemyMissiles;
	  this.shipX = shipX;
	  this.shipY = shipY;
	  this.canvasWidth = canvasWidth;
	  this.canvasHeight = canvasHeight;
	}

	GameBoardMissileHelpers.prototype.renderEnemyMissiles = function (enemyMissiles) {
	  enemyMissiles.forEach(function (missile) {
	    missile.drawMissile().launch();
	  });
	};

	GameBoardMissileHelpers.prototype.renderUserMissiles = function (userMissiles) {
	  userMissiles.forEach(function (missile) {
	    missile.drawMissile().launch();
	  });
	};

	module.exports = GameBoardMissileHelpers;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	function GameBoardScreenTextHelper(ctx, canvasWidth) {
	  this.ctx = ctx;
	  this.canvasWidth = canvasWidth;
	}

	GameBoardScreenTextHelper.prototype.levelScreen = function (levelNumber) {
	  this.ctx.font = "20px 'Press Start 2P'";
	  this.ctx.fillStyle = "#0095DD";
	  var textString = "Starting Level " + levelNumber;
	  this.addTextToScreen(textString, 400);
	};

	GameBoardScreenTextHelper.prototype.drawScore = function (score) {
	  this.ctx.font = "16px 'Press Start 2P'";
	  this.ctx.fillStyle = "#0095DD";
	  this.ctx.fillText("Score: " + score, this.canvasWidth - 200, 20);
	};

	GameBoardScreenTextHelper.prototype.startScreen = function () {
	  this.ctx.font = "60px 'MyWebFont'";
	  this.ctx.fillStyle = "teal";
	  var textString1 = "Bounty Hunter X";
	  var textString2 = "Press Enter to Play";
	  this.addTextToScreen(textString1, 400);
	  this.addTextToScreen(textString2, 500);
	};

	GameBoardScreenTextHelper.prototype.gameOverScreen = function (score) {
	  this.ctx.font = "20px 'Press Start 2P'";
	  this.ctx.fillStyle = "#0095DD";
	  var textString = "See You Space Cowboy...";
	  var textString2 = "End Score: " + score;
	  var textString3 = "Press P to Play Again";
	  var textString4 = "TOP THREE SCORES";
	  var textString5 = this.gatherScores().sort(function (a, b) {
	    return a - b;
	  }).reverse().slice(0, 3).join('  || \n');

	  this.addTextToScreen(textString, 100);
	  this.addTextToScreen(textString2, 300);
	  this.addTextToScreen(textString3, 400);
	  this.addTextToScreen(textString4, 500);
	  this.addTextToScreen(textString5, 600);
	};

	GameBoardScreenTextHelper.prototype.addTextToScreen = function (textString, y) {
	  var textWidth = this.ctx.measureText(textString).width;
	  this.ctx.fillText(textString, this.canvasWidth / 2 - textWidth / 2, y);
	};

	GameBoardScreenTextHelper.prototype.gatherScores = function () {
	  var scores = [];
	  Object.keys(localStorage).forEach(function (key) {
	    var num = parseInt(localStorage[key]);
	    scores.push(num);
	  });
	  return scores;
	};

	module.exports = GameBoardScreenTextHelper;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var EnemyPlane = __webpack_require__(9);

	function EnemyLevels(level, ctx, canvas, gameBoard) {
	  this.level = level;
	  this.ctx = ctx;
	  this.canvas = canvas;
	  this.canvasWidth = canvas.width;
	  this.canvasHeight = canvas.height;
	  this.enemyPlanes = [];
	  this.gameBoard = gameBoard;
	}

	EnemyLevels.prototype.generator = function (level) {
	  var setupEnemies;
	  switch (level) {
	    case 1:
	      this.enemyPlanes = [];
	      setupEnemies = this.generateEnemyPlanesLevel1();
	      break;

	    case 2:
	      this.enemyPlanes = [];
	      setupEnemies = this.generateEnemyPlanesLevel2();
	      break;

	    case 3:
	      this.enemyPlanes = [];
	      setupEnemies = this.generateEnemyPlanesLevel3();
	      break;
	  }

	  return setupEnemies || [];
	};

	EnemyLevels.prototype.generateEnemyPlanesLevel1 = function () {
	  for (var i = 0; i < this.level * 5; i++) {
	    var patterns = [{
	      x: -this.randomNum(1, 200),
	      y: -this.randomNum(15, 30),
	      movement: { x: 7, y: 20 },
	      size: { width: 30, height: 50 },
	      health: 10,
	      image: { sprite: '../assets/enemy-images/alien-diagonal-right.png' },
	      missileOffset: { x: 0, y: 0 }
	    }, {
	      x: this.randomNum(this.canvasWidth, this.canvasWidth + 50),
	      y: this.randomNum(1, 100),
	      movement: { x: -20, y: 2 },
	      size: { width: 30, height: 50 },
	      health: 10,
	      image: { sprite: '../assets/enemy-images/alien-left.png' },
	      missileOffset: { x: 0, y: 0 }
	    }, {
	      x: this.randomNum(0, this.canvasWidth),
	      y: -this.randomNum(7, 20),
	      movement: { x: 0, y: 30 },
	      size: { width: 30, height: 50 },
	      health: 10,
	      image: { sprite: '../assets/enemy-images/alien-spaceship.png' },
	      missileOffset: { x: 0, y: 0 }
	    }];

	    var enemies = patterns[this.randomNum(0, 3)];
	    this.enemyPlanes.push(this.newEnemyPlane(enemies.x, enemies.y, enemies.movement, enemies.size, enemies.health, enemies.image, enemies.missileOffset));
	  }
	  return this.enemyPlanes;
	};

	EnemyLevels.prototype.generateEnemyPlanesLevel2 = function () {
	  if (this.gameBoard.enemyPlanes.length < 12) {
	    var patterns = [{
	      x: this.randomNum(0, 600),
	      y: -this.randomNum(200, 201),
	      movement: { x: 0, y: 15 },
	      size: { width: 200, height: 200, offset: 5 },
	      health: 80,
	      image: { width: 200, height: 200, sprite: '../assets/enemy-images/level_2_big_enemy.png' },
	      missileOffset: { x: 85, y: 30 }
	    }];

	    var enemies = patterns[0];
	    this.enemyPlanes.push(this.newEnemyPlane(enemies.x, enemies.y, enemies.movement, enemies.size, enemies.health, enemies.image, enemies.missileOffset));
	    return this.enemyPlanes;
	  }
	};

	EnemyLevels.prototype.generateEnemyPlanesLevel3 = function () {
	  if (this.gameBoard.enemyPlanes.length < 3) {
	    var patterns = [{
	      x: this.randomNum(300, 300),
	      y: this.randomNum(100, 100),
	      movement: { x: 10, y: 0 },
	      size: { width: 200, height: 200, offset: -40 },
	      health: 200,
	      image: { width: 300, height: 300, sprite: '../assets/enemy-images/finalSpinningBoss.png' },
	      missileOffset: { x: 85, y: 120 }
	    }];

	    var enemies = patterns[0];
	    this.enemyPlanes.push(this.newEnemyPlane(enemies.x, enemies.y, enemies.movement, enemies.size, enemies.health, enemies.image, enemies.missileOffset));
	    return this.enemyPlanes;
	  }
	};

	EnemyLevels.prototype.randomNum = function (firstNum, secondNum) {
	  return Math.floor(Math.random() * secondNum) + firstNum;
	};

	EnemyLevels.prototype.newEnemyPlane = function (x, y, movement, size, health, image, missileOffset) {
	  return new EnemyPlane(x, y, size.width, size.height, this.ctx, this.canvas, size, movement, health, image, missileOffset);
	};

	module.exports = EnemyLevels;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var EnemyMissile = __webpack_require__(10);

	function EnemyPlane(x, y, width, height, ctx, canvas, size, movement, health, image, missileOffset) {
	  this.x = x;
	  this.y = y;
	  this.width = width;
	  this.height = height;
	  this.ctx = ctx;
	  this.canvasWidth = canvas.width;
	  this.health = health;
	  this.movementX = movement.x;
	  this.movementY = movement.y;
	  this.sprite = image.sprite;
	  this.imageWidth = image.width || 50;
	  this.imageHeight = image.height || 50;
	  this.offset = size.offset || -10;
	  this.missileOffset = missileOffset;
	}

	EnemyPlane.prototype.drawPlane = function () {
	  var plane = new Image();
	  plane.src = this.sprite;
	  this.ctx.drawImage(plane, this.x + this.offset, this.y, this.imageWidth, this.imageHeight);

	  return this;
	};

	EnemyPlane.prototype.movement = function () {
	  if (this.imageWidth === 300 && (this.x + this.movementX > this.canvasWidth || this.x + this.movementX < 0)) {
	    this.movementX = -this.movementX;
	  }
	  this.x += this.movementX;
	  this.y += this.movementY / 3;
	  return this;
	};

	EnemyPlane.prototype.launchMissile = function () {
	  return new EnemyMissile(this.x + this.missileOffset.x, this.y + this.missileOffset.y, 5, 5, this.ctx);
	};

	module.exports = EnemyPlane;

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	function EnemyMissile(x, y, width, height, ctx) {
	  this.x = x + 4;
	  this.y = y + 10;
	  this.width = width;
	  this.height = height;
	  this.color = "red";
	  this.ctx = ctx;
	  this.type = 0;
	}

	EnemyMissile.prototype.checkForMissileType = function () {
	  this.drawMissile();
	};

	EnemyMissile.prototype.drawMissile = function () {
	  this.ctx.fillStyle = this.color;
	  this.ctx.fillRect(this.x + 10, this.y + 20, this.width, this.height);
	  return this;
	};

	EnemyMissile.prototype.launch = function () {
	  this.y += 10;
	  return this;
	};

	module.exports = EnemyMissile;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Explosion = __webpack_require__(12);
	var PowerUp = __webpack_require__(13);
	var AiBuddy = __webpack_require__(14);

	function CollisionDetection(gameBoard) {
	  this.gameBoard = gameBoard;
	  this.explosion = new Explosion(gameBoard);
	  this.enemyHit = false;
	  this.ctx = this.gameBoard.ctx;
	}

	CollisionDetection.prototype.enemy = function () {
	  this.gameBoard.enemyPlanes.forEach((function (plane) {
	    this.gameBoard.userMissiles.forEach((function (missile) {
	      if (missile.x >= plane.x && missile.x <= plane.x + plane.width && missile.y >= plane.y && missile.y <= plane.y + plane.height) {
	        plane.health -= 10;
	        this.gameBoard.userMissiles.pop(missile);
	        this.gameBoard.score += 10;
	        this.powerUpDrop(plane.x, plane.y);
	      }
	    }).bind(this));
	  }).bind(this));
	};

	CollisionDetection.prototype.user = function () {
	  this.gameBoard.enemyMissiles.forEach((function (missile) {
	    for (var i = 0; i < 4; i++) {
	      if (this.coordinateCheck(missile, 5, i)) {
	        this.endGame();
	      }
	    }
	  }).bind(this));
	};

	CollisionDetection.prototype.powerUpDrop = function (x, y) {
	  if (Math.random() > 0.9) {
	    this.gameBoard.powerUps.push(new PowerUp(x, y, this.gameBoard.ctx));
	  }
	};

	CollisionDetection.prototype.userGetsPowerUp = function () {
	  this.gameBoard.powerUps.forEach((function (powerUp) {
	    for (var i = 0; i < 4; i++) {
	      if (this.coordinateCheck(powerUp, 10, i)) {
	        powerUp.redeemed = true;
	        this.gameBoard.clearRedeemedPowerUp();
	        this.gameBoard.playerPower++;
	        if (this.gameBoard.playerPower > 2) {
	          this.gameBoard.aiBuddy.push(new AiBuddy(this.ctx));
	        }
	      }
	    }
	  }).bind(this));
	};

	CollisionDetection.prototype.planeCollision = function () {
	  this.gameBoard.enemyPlanes.forEach((function (plane) {
	    for (var i = 0; i < 4; i++) {
	      if (this.coordinateCheck(plane, 20, i)) {
	        this.endGame();
	      }
	    }
	  }).bind(this));
	};

	CollisionDetection.prototype.endGame = function () {
	  var score = this.gameBoard.score;
	  localStorage.setItem(score, score);
	  this.gameBoard.endGame = true;
	};

	CollisionDetection.prototype.coordinateCheck = function (object, size, i) {
	  var powerUpCoordinates = [[object.x, object.y], [object.x + size, object.y], [object.x, object.y + size], [object.x + size, object.y + size]];
	  return powerUpCoordinates[i][0] >= this.gameBoard.shipX && powerUpCoordinates[i][0] <= this.gameBoard.shipX + this.gameBoard.userPlaneWidth && powerUpCoordinates[i][1] >= this.gameBoard.shipY && powerUpCoordinates[i][1] <= this.gameBoard.shipY + this.gameBoard.userPlaneHeight;
	};

	module.exports = CollisionDetection;

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	function Explosion(gameBoard) {
	    this.gameBoard = gameBoard;
	}

	Explosion.prototype.explosionSequence = function (num) {
	    var explosion = new Image();
	    explosion.src = './assets/explosions/explosion_' + num + '.png';
	    this.gameBoard.ctx.drawImage(explosion, this.gameBoard.shipX - 5, this.gameBoard.shipY - 5, 40, 40);
	};

	module.exports = Explosion;

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";

	function PowerUp(x, y, ctx) {
	  this.x = x;
	  this.y = y;
	  this.width = 10;
	  this.height = 10;
	  this.ctx = ctx;
	  this.redeemed = false;
	}

	PowerUp.prototype.draw = function () {
	  var orb = new Image();
	  orb.src = "../assets/background-images/powerUp.png";
	  this.ctx.drawImage(orb, this.x, this.y, 20, 20);
	  return this;
	};

	PowerUp.prototype.moveDown = function () {
	  this.y += 10;
	};

	module.exports = PowerUp;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var UserMissile = __webpack_require__(5);

	function AiBuddy(ctx) {
	  this.ctx = ctx;
	  this.x = -8;
	  this.y = 700;
	  this.time = 200;
	  this.width = 30;
	  this.height = 30;
	  this.ycounter = 200;
	}

	AiBuddy.prototype.drawPlane = function () {
	  var plane = new Image();
	  plane.src = '../assets/user-images/redfighter-straight.png';
	  this.ctx.drawImage(plane, this.x - 5, this.y - 5, 40, 40);
	  return this;
	};

	AiBuddy.prototype.movement = function () {
	  this.x += 20;
	  return this;
	};

	AiBuddy.prototype.launchMissile = function () {
	  return new UserMissile(this.x, this.y, this.width, this.height, this.ctx);
	};

	module.exports = AiBuddy;

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	function MainGameLoop(gameBoard, canvas, ctx, keyController, collisionDetection) {
	  this.gameBoard = gameBoard;
	  this.canvas = canvas;
	  this.ctx = ctx;
	  this.keyController = keyController;
	  this.collisionDetection = collisionDetection;
	  this.y = -200;
	  this.y2 = -(1000 + 200);
	}

	function renderImage(string) {
	  var myImage = new Image();
	  myImage.src = string;
	  return myImage;
	}

	MainGameLoop.prototype.move = function () {
	  this.y += 5;
	  this.y2 += 5;
	};

	MainGameLoop.prototype.renderBackground = function () {
	  if (this.y === this.gameBoard.canvasHeight) {
	    this.y = -1200;
	  }
	  if (this.y2 === this.gameBoard.canvasHeight) {
	    this.y2 = -1200;
	  }
	  this.ctx.drawImage(renderImage('../assets/background-images/nebula-space.jpg'), 0, this.y);
	  this.ctx.drawImage(renderImage('../assets/background-images/nebula-space.jpg'), 0, this.y2);
	  this.move();
	};

	MainGameLoop.prototype.loop = function () {
	  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	  this.renderBackground();

	  if (this.gameBoard.startGame !== true) {
	    this.gameBoard.textHelpers.startScreen();
	  }
	  if (this.gameBoard.endGame === true) {
	    this.gameBoard.textHelpers.gameOverScreen(this.gameBoard.score);
	  }
	  if (this.gameBoard.startGame && !this.gameBoard.endGame) {
	    this.gameBoard.setup();
	    this.keyController.userMovement();
	    this.keyController.userShipPosition();
	    this.collisionDetection.user();
	    this.collisionDetection.enemy();
	    this.collisionDetection.userGetsPowerUp();
	    this.collisionDetection.planeCollision();
	    this.gameBoard.clearDestroyedPlanes();
	  }
	};

	module.exports = MainGameLoop;

/***/ }
/******/ ]);