const EnemyPlane                 = require('./enemyPlane.js');

function EnemyLevels(level, ctx, canvas ){
  this.level        = level;
  this.ctx          = ctx;
  this.canvas       = canvas;
  this.canvasWidth  = canvas.width;
  this.canvasHeight = canvas.height;
  this.enemyPlanes  = [];
}

EnemyLevels.prototype.generateEnemyPlanesLevel1 = function(){
  // debugger;
  for(let i = 0; i< (this.level * 5) ;i++){
    let patterns = [{
      x: -(this.randomNum(1, 200)),
      y: -(this.randomNum(15, 30)),
      movement: {x:7, y:20},
      size:{width:30, height:50},
      health: 10,
      image: {sprite: '../assets/enemy-images/alien-diagonal-right.png'}


    },
    {
      x: (this.randomNum(this.canvasWidth, this.canvasWidth + 50)),
      y: (this.randomNum(1, 100)),
      movement: {x:-20, y:2},
      size:{width:30, height:50},
      health: 10,
      image: {sprite: '../assets/enemy-images/alien-left.png'}


    },
    {
      x: (this.randomNum(0, this.canvasWidth)),
      y: -(this.randomNum(7, 20)),
      movement: {x:0, y:30},
      size:{width:30, height:50},
      health: 10,
      image: {sprite: '../assets/enemy-images/alien-spaceship.png'}


    }];

    let enemies = patterns[this.randomNum(0,3)];
    this.enemyPlanes.push(this.newEnemyPlane(enemies.x, enemies.y, enemies.movement, enemies.size, enemies.health, enemies.image ));
  }
  return this.enemyPlanes;
};

EnemyLevels.prototype.generateEnemyPlanesLevel2 = function(){
  for(let i = 0; i< (this.level * 5) ;i++){
    let patterns = [{
      x: -(this.randomNum(1, 200)),
      y: -(this.randomNum(15, 30)),
      movement: {x:7, y:20},
      size:{width:30, height:50},
      health: 10,
      image:{sprite: './alienspaceship-diagonal-right.png'}

    },
    {
      x:  (this.randomNum(100,500)),
      y: -(this.randomNum(200, 201)),
      movement: {x:0, y:4 },
      size:{width: 200, height: 200},
      health: 30,
      image: {width: 200, height: 200, sprite: './level_2_big_enemy.png'}

    },
    {
      x: (this.randomNum(0, this.canvasWidth)),
      y: -(this.randomNum(7, 20)),
      movement: {x:0, y:30},
      size:{width:30, height:50},
      health:10,
      image: {sprite: './alienspaceship.png'}


    }];

    // let enemies = patterns[this.randomNum(0,3)];
    let enemies = patterns[1];
    this.enemyPlanes.push(this.newEnemyPlane(enemies.x, enemies.y, enemies.movement, enemies.size, enemies.health, enemies.image));
  }
};

EnemyLevels.prototype.generateEnemyPlanesLevel3 = function(){
  let patterns = [{
    x: (this.randomNum(300, 300)),
    y: (this.randomNum(100, 100)),
    movement: {x:0, y:0},
    size:{width:200, height:200},
    health: 300,
    image:{width: 300, height: 300, sprite:'./finalSpinningBoss.png'}

  },
  ];

  let enemies = patterns[0];
  this.enemyPlanes.push(this.newEnemyPlane(enemies.x, enemies.y, enemies.movement, enemies.size, enemies.health, enemies.image));

};

EnemyLevels.prototype.randomNum = function(firstNum, secondNum) {
  return Math.floor(Math.random() * secondNum) + firstNum;
};

EnemyLevels.prototype.newEnemyPlane = function(x,y,movement, size, health, image){
  return new EnemyPlane(x, y, size.width, size.height, this.ctx, this.canvas, movement, health, image);
};

module.exports = EnemyLevels;