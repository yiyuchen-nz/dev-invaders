// import Earth from '../js/Earth.js'
import LaserGroup from '../js/Laser.js'

export default class MainScene extends Phaser.Scene {
  constructor() {
    // super is used to access and call functions on the parent's object. When super is called, it calls the parent class's constructor. In the config.
    super('MainScene')
    // super()

    this.cursors
    this.player
    this.setPlayerVelocity = -50
  }
  preload() {
    this.load.image('background', 'assets/minipixel/SpaceBG.png')
    this.load.image('clouds-white', 'assets/minipixel/clouds-white.png')
    this.load.image(
      'clouds-white-small',
      'assets/minipixel/clouds-white-small.png'
    )

    // this.load.image('sky', 'assets/sky.png')
    this.load.spritesheet('dude', 'assets/dude.png', {
      frameWidth: 32,
      frameHeight: 48,
    })
    this.load.image('laser', 'assets/blast.png')
  }

  // , cloudsWhite,cloudsWhiteSmall
  create() {
    // this.earth = new Earth({
    //   scene: this,
    //   image: 'background',
    //   // x: this.game.config.width,
    //   // y: this.game.config.height,
    //   // depth: 1,
    // })
    this.add.tileSprite(800, 200, 2400, 1400, 'background')
    // cloudsWhite = this.add.tileSprite(800, 200, 2400, 400, 'clouds-white')
    // cloudsWhiteSmall = this.add.tileSprite(
    //   640, // scene x + y
    //   200,
    //   2400, //
    //   400,
    //   'clouds-white-small'
    // )

    // this.add.image(400, 300, 'sky')

    this.player = this.physics.add.sprite(20, 0, 'dude')
    this.player.setCollideWorldBounds(true)
    this.laserGroup = new LaserGroup(this)
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  fireBullet() {
    this.laserGroup.fireBullet(this.player.x + 20, this.player.y)
  }

  update() {
    // cloudsWhite.tilePositionX += 0.5
    // cloudsWhiteSmall.tilePositionX += 0.25
    // background.tilePositionX += 0.25

    if (this.cursors.up.isDown) {
      this.setPlayerVelocity -= 10
      this.player.setVelocityY(this.setPlayerVelocity)
    } else {
      this.setPlayerVelocity < 0 ? (this.setPlayerVelocity += 10) : null
    }
    if (this.cursors.space.isDown) {
      this.fireBullet()
    }
  }
}
