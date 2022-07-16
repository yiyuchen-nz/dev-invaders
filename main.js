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

var cloudsWhite, cloudsWhiteSmall, sky

function initScene() {}

function preload() {
  this.load.image('sky', 'assets/minipixel/SpaceBG.png')

  this.load.image('clouds-white', 'assets/minipixel/clouds-white.png')
  this.load.image(
    'clouds-white-small',
    'assets/minipixel/clouds-white-small.png'
  )
}

function create() {
  // this.add.image(800, 200, 'sky')

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
}

function updateScene() {
  cloudsWhite.tilePositionX += 0.5
  cloudsWhiteSmall.tilePositionX += 0.25
  sky.tilePositionX += 0.25
}
