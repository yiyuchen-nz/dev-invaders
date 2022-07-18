import LaserGroup from '../js/Laser.js'
// import Enemy from '../js/Enemies.js'
// import ParallaxScene from '../js/ParallaxScene.js'

export default class MainScene extends Phaser.Scene {
  constructor() {
    // super is used to access and call functions on the parent's object. When super is called, it calls the parent class's constructor. In the config.
    super('MainScene')

    this.cursors
    this.player
    this.setPlayerVelocity = -50
  }
  preload() {
    this.load.image('sky', 'assets/parallax/sky.png')
    this.load.image('clouds1', 'assets/parallax/clouds_1.png')
    this.load.image('clouds2', 'assets/parallax/clouds_2.png')
    this.load.image('clouds3', 'assets/parallax/clouds_3.png')
    this.load.image('clouds4', 'assets/parallax/clouds_4.png')
    this.load.image('rocks1', 'assets/parallax/rocks_1.png')
    this.load.image('rocks2', 'assets/parallax/rocks_2.png')

    this.load.image('dude', 'assets/minipixel/smiling-spaceship.png')
    this.load.image('laser', 'assets/minipixel/flaming_meteor.png')

    this.load.spritesheet('Alan', 'assets/minipixel/Enemies/Alan.png', {
      frameWidth: 16,
      frameHeight: 16,
    })
    this.load.spritesheet('Bonbon', 'assets/minipixel/Enemies/Bon_Bon.png', {
      frameWidth: 16,
      frameHeight: 16,
    })
  }

  create() {
    // new TileSprite(scene, x, y, width, height, textureKey [, frameKey])

    const width = this.scale.width
    const height = this.scale.height

    this.sky = this.add.image(width * 0.5, height * 0.5, 'sky')
    this.clouds1 = this.add
      .tileSprite(0, 0, width, height, 'clouds1')
      .setOrigin(0, 0)
    this.rocks1 = this.add
      .tileSprite(0, height, width, height, 'rocks1')
      .setOrigin(0, 1) // positions rocks to bottom left corner
    this.clouds2 = this.add
      .tileSprite(0, 0, width, height, 'clouds2')
      .setOrigin(0, 0)
    this.rocks2 = this.add
      .tileSprite(0, height, width, height, 'rocks2')
      .setOrigin(0, 1)
    this.clouds3 = this.add
      .tileSprite(0, 0, width, height, 'clouds3')
      .setOrigin(0, 0)
    this.clouds4 = this.add
      .tileSprite(0, 0, width, height, 'clouds4')
      .setOrigin(0, 0)

    this.player = this.physics.add.sprite(50, 0, 'dude')
    this.player.setScale(0.3)
    this.player.setCollideWorldBounds(true)

    this.laserGroup = new LaserGroup(this)

    this.cursors = this.input.keyboard.createCursorKeys()

    // this.enemyAlan = new Enemy(this)

    // console.log('enemyAlan', enemyAlan)
    this.enemyAlan = this.add.sprite(900, 100, 'Alan')
    this.enemyAlan.setScale(5)
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('Alan', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1,
    })
    this.enemyAlan.anims.play('idle', true)

    this.enemyBonBon = this.add.sprite(600, 500, 'Bonbon')
    this.enemyBonBon.setScale(5)
    this.anims.create({
      key: 'idle1',
      frames: this.anims.generateFrameNumbers('Bonbon', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    })
    this.enemyBonBon.anims.play('idle1', true)

    // this.parallax = new ParallaxScene(this)
  }

  fireBullet() {
    this.laserGroup.fireBullet(this.player.x + 20, this.player.y)
  }

  update() {
    this.clouds1.tilePositionX += 0.5
    this.rocks1.tilePositionX += 0.5
    this.clouds2.tilePositionX += 0.5
    this.rocks2.tilePositionX += 1
    this.clouds3.tilePositionX += 3
    this.clouds4.tilePositionX += 4

    // this.parallax.start()

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
