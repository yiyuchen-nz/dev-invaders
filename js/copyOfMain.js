var config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 800,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: {
    init: initScene,
    preload: preload,
    create: create,
    update: updateScene,
  },
}
var game = new Phaser.Game(config)

var cloudsWhite,
  cloudsWhiteSmall,
  sky,
  platforms,
  movingPlatform,
  movingPlatform1,
  enemyAlan,
  enemyBonBon,
  enemyLips

function initScene() {}

function preload() {
  this.load.image('sky', 'assets/minipixel/SpaceBG.png')

  this.load.image('clouds-white', 'assets/minipixel/clouds-white.png')
  this.load.image(
    'clouds-white-small',
    'assets/minipixel/clouds-white-small.png'
  )
  this.load.image('ground', 'assets/minipixel/platform.png')
  this.load.spritesheet('Alan', 'assets/minipixel/Enemies/Alan.png', {
    frameWidth: 16,
    frameHeight: 16,
  })
  this.load.spritesheet('Bonbon', 'assets/minipixel/Enemies/Bon_Bon.png', {
    frameWidth: 16,
    frameHeight: 16,
  })
}

function create() {
  sky = this.add.tileSprite(
    800, // scene x + y
    200,
    2400, //
    1400,
    'sky'
  )

  cloudsWhite = this.add.tileSprite(800, 200, 2400, 400, 'clouds-white')
  cloudsWhiteSmall = this.add.tileSprite(
    640, // scene x + y
    200,
    2400, //
    400,
    'clouds-white-small'
  )

  // movingPlatform = this.add.tileSprite(800, 800, 100, 400, 'ground')
  movingPlatform = this.physics.add.image(400, 650, 'ground')

  // movingPlatform = this.physics.add.image(600, 750, 'ground')
  movingPlatform.setImmovable(true)
  movingPlatform.body.allowGravity = false
  movingPlatform.setVelocityX(-50)

  movingPlatform1 = this.physics.add.image(500, 750, 'ground')
  movingPlatform1.setImmovable(true)
  movingPlatform1.body.allowGravity = false
  movingPlatform1.setVelocityX(-50)

  enemyAlan = this.add.sprite(900, 100, 'Alan')
  enemyAlan.setScale(5)
  this.anims.create({
    key: 'idle',
    frames: this.anims.generateFrameNumbers('Alan', { start: 0, end: 5 }),
    frameRate: 10,
    repeat: -1,
  })
  enemyAlan.anims.play('idle', true)

  enemyBonBon = this.add.sprite(600, 500, 'Bonbon')
  enemyBonBon.setScale(5)
  this.anims.create({
    key: 'idle1',
    frames: this.anims.generateFrameNumbers('Bonbon', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  })
  enemyBonBon.anims.play('idle1', true)
}

function updateScene() {
  cloudsWhite.tilePositionX += 0.5
  cloudsWhiteSmall.tilePositionX += 0.25
  sky.tilePositionX += 0.25
}
