import LaserGroup from '../js/Laser.js'
import BossFireGroup from './BossFire.js'
// import ParallaxScene from '../js/ParallaxScene.js'

export default class MainScene extends Phaser.Scene {
  constructor() {
    // super is used to access and call functions on the parent's object. When super is called, it calls the parent class's constructor. In the config.
    super('MainScene')
    // this.cursors
    // this.player
    //this.setPlayerVelocity = -50
    // this.enemyAlan
    // this.enemyBonBon
    // this.enemyLips
    // this.laserGroup
    // this.kaboom
    // this.belowPlatforms
    // this.abovePlatforms
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

    this.load.spritesheet('kaboom', 'assets/minipixel/Effects/Explosion.png', {
      frameWidth: 32,
      frameHeight: 32,
    })

    this.load.spritesheet('Alan', 'assets/minipixel/Enemies/Alan.png', {
      frameWidth: 16,
      frameHeight: 16,
    })
    this.load.spritesheet('Bonbon', 'assets/minipixel/Enemies/Bon_Bon.png', {
      frameWidth: 16,
      frameHeight: 16,
    })
    this.load.spritesheet('Lips', 'assets/minipixel/Enemies/Lips.png', {
      frameWidth: 16,
      frameHeight: 16,
    })

    this.load.spritesheet('Boss', 'assets/minipixel/Enemies/Boss.png', {
      frameWidth: 90,
      frameHeight: 90,
    })
    this.load.image('bossfire', 'assets/minipixel/BossFireMove.png')

    this.load.image('platform', 'assets/obstacles/towerAlt.png')
    this.load.image('platform2', 'assets/obstacles/cactus1.png')

    this.load.audio('bg-music', 'assets/sound/bg-music.mp3')
    this.load.audio('player-explosion', 'assets/sound/player-explosion.wav')
    this.load.audio('laserSound', 'assets/sound/laser.wav')
    this.load.audio('enemy-explosion', 'assets/sound/short-explosion.wav')
  }

  create() {
    // new TileSprite(scene, x, y, width, height, textureKey [, frameKey])

    this.music = this.sound.add('bg-music', { volume: 0.8, loop: true })
    this.music.play()

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

    this.belowPlatforms = this.physics.add.group()

    this.abovePlatforms = this.physics.add.group()

    const startingObstacleDistance = 2000
    const minXGap = 500
    const maxXGap = 1000

    let screenHeight = 700
    let yGap = 800

    let x = startingObstacleDistance
    let y = Phaser.Math.Between(0, screenHeight - yGap)

    for (let i = 0; i < 20; ++i) {
      const belowPlatforms = this.belowPlatforms
        .create(x, y + yGap, 'platform2')
        .setGravity(0, -330)
        .setVelocityX(-200)
      belowPlatforms.scale = 2

      const abovePlatforms = this.abovePlatforms
        .create(x, y, 'platform')
        .setGravity(0, -330)
        .setVelocityX(-200)

      abovePlatforms.scale = 2

      const body = belowPlatforms.body
      body.updateFromGameObject()

      const body2 = abovePlatforms.body
      body2.updateFromGameObject()

      x = x + Phaser.Math.Between(minXGap, maxXGap)
      y = Phaser.Math.Between(0, screenHeight - yGap)
    }

    this.player = this.physics.add.sprite(100, 0, 'dude')
    this.player.setScale(0.2)
    // this.player.setCollideWorldBounds(true)

    this.laserGroup = new LaserGroup(this)

    this.cursors = this.input.keyboard.createCursorKeys()

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('Alan'),
      frameRate: 10,
      repeat: -1,
    })

    this.enemyAlan = this.physics.add
      .sprite(3000, 300, 'Alan')
      .setScale(5)
      .setGravity(0, -330)
    this.enemyAlan.play('idle', true)

    this.anims.create({
      key: 'idle1',
      frames: this.anims.generateFrameNumbers('Bonbon'),
      frameRate: 10,
      repeat: -1,
    })

    this.enemyBonBon = this.physics.add
      .sprite(3000, 500, 'Bonbon')
      .setScale(5)
      .setGravity(0, -330)

    this.enemyBonBon.play('idle1', true)

    this.anims.create({
      key: 'idle2',
      frames: this.anims.generateFrameNumbers('Lips'),
      frameRate: 10,
      repeat: -1,
    })

    this.enemyLips = this.physics.add
      .sprite(5000, 600, 'Lips')
      .setScale(5)
      .setGravity(0, -330)

    this.enemyLips.play('idle2', true)

    this.tweens.add({
      targets: [this.enemyAlan, this.enemyBonBon, this.enemyLips],
      x: 0,
      duration: 8800,
      ease: 'Linear',
      yoyo: true,
    })

    this.boss = this.physics.add
      .sprite(1200, 600, 'Boss')
      .setScale(8)
      .setGravity(0, -330)
      .setFlipX(true)

    this.anims.create({
      key: 'bossAttack',
      frames: this.anims.generateFrameNumbers('Boss'),
      frameRate: 10,
      repeat: -1,
    })
    this.boss.play('bossAttack', true)

    this.bossFireGroup = new BossFireGroup(this)
    this.anims.create({
      key: 'explosion',
      frames: this.anims.generateFrameNumbers('kaboom'),
      frameRate: 5,
    })

    // this.parallax = new ParallaxScene(this)

    // player v enemy - with explosion, gameover
    // player v platform - with explosion, gameover
    // laser v enemy - with explosion
    // laser v platform

    this.physics.add.collider(
      this.player,
      [this.enemyAlan, this.enemyBonBon, this.enemyLips],
      this.hitEnemy,
      null,
      this
    )

    this.physics.add.collider(
      this.player,
      [this.abovePlatforms, this.belowPlatforms],
      this.hitPlatform,
      null,
      this
    )

    this.physics.add.collider(
      this.laserGroup,
      [this.enemyAlan, this.enemyBonBon, this.enemyLips],
      this.fireEnemy,
      null,
      this
    )

    this.physics.add.overlap(
      this.laserGroup,
      [this.abovePlatforms, this.belowPlatforms],
      this.firePlatform
    )

    this.playerExplosion = this.sound.add('player-explosion')
    this.laserSound = this.sound.add('laserSound')
    this.enemyExplosion = this.sound.add('enemy-explosion')
  }

  kaboom(player) {
    this.Kaboom = this.add
      .sprite(player.x, player.y, 'kaboom')
      .setScale(10)
      .play('explosion')
    this.time.addEvent({
      delay: 500,
      callback: () => {
        this.Kaboom.destroy()
      },
    })
  }

  fireBullet() {
    this.laserGroup.fireBullet(this.player.x + 20, this.player.y)
  }

  bossBullet() {
    this.bossFireGroup.bossBullet(750, this.boss.y - 90)
  }
  hitEnemy(player, enemy) {
    this.physics.pause()
    player.setTint(0xff0000)
    enemy.destroy()
    this.kaboom(player)
    this.playerExplosion.play()
    this.player.setVisible(false)
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.gameOver()
      },
    })
  }

  hitPlatform(player, platform) {
    player.setTint(0xff0000)
    this.kaboom(player)
    this.playerExplosion.play()
    this.player.setVisible(false)
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.gameOver()
      },
    })
  }

  fireEnemy(enemy, laser) {
    enemy.setTint(0xff0000)
    this.kaboom(enemy)
    enemy.destroy()
    this.enemyExplosion.play()
    laser.setVisible(false)
  }

  firePlatform(laser, platform) {
    laser.destroy()
  }

  gameOver() {
    this.scene.start('GameOver')
    this.music.pause()
  }

  resetBullet() {
    this.laserGroup.children.entries.forEach((laser) => {
      if (!this.cameras.main.worldView.contains(laser.x, laser.y)) {
        laser.body.reset(laser.x, laser.y)
        laser.setActive(false)
        laser.setVisible(false)
      }
    })
  }

  update() {
    this.clouds1.tilePositionX += 2
    this.rocks1.tilePositionX += 2
    this.clouds2.tilePositionX += 2
    this.rocks2.tilePositionX += 4
    this.clouds3.tilePositionX += 5
    this.clouds4.tilePositionX += 6

    // this.parallax.start()

    this.resetBullet()
    this.bossBullet()

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(this.player.body.velocity.y - 20)
    }
    if (this.cursors.space.isDown) {
      this.fireBullet()
      this.laserSound.play()
    }

    // if the player leaves the screen game over
    if (!this.cameras.main.worldView.contains(this.player.x, this.player.y)) {
      // this.scene.launch overlays scenes
      this.playerExplosion.play()
      this.gameOver()
    }
  }
}
