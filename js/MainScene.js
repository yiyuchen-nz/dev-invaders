import LaserGroup from '../js/Laser.js'
import EnemyGroup from './Enemy.js'
import BossFireGroup from './BossFire.js'
// import ParallaxScene from '../js/ParallaxScene.js'

export default class MainScene extends Phaser.Scene {
  constructor() {
    // super is used to access and call functions on the parent's object. When super is called, it calls the parent class's constructor. In the config.
    super('MainScene')

    this.bossTime = 38000
    this.enemyTime = 13000
    this.enemyDelay = 800
    this.phaseTime = 15000
    this.timeGameStart = 0
    this.switch = true
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
    // this.load.spritesheet('Bonbon', 'assets/minipixel/Enemies/Bon_Bon.png', {
    //   frameWidth: 16,
    //   frameHeight: 16,
    // })
    // this.load.spritesheet('Lips', 'assets/minipixel/Enemies/Lips.png', {
    //   frameWidth: 16,
    //   frameHeight: 16,
    // })

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

    //background music
    this.music = this.sound.add('bg-music', { volume: 0.8, loop: true })
    this.music.play()

    //our fantastic moving background
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

    this.cursors = this.input.keyboard.createCursorKeys()

    //our main character---the 'dude' and its weapon
    this.player = this.physics.add.sprite(100, 0, 'dude')
    this.player.setScale(0.2)

    this.laserGroup = new LaserGroup(this)
    this.enemyGroup = new EnemyGroup(this)

    //annoying but amazing moving obstacles
    this.belowPlatforms = this.physics.add.group()
    this.abovePlatforms = this.physics.add.group()

    const startingObstacleDistance = 2000
    const minXGap = 500
    const maxXGap = 1000

    this.numberOfPlatforms = 10
    let screenHeight = 300 // 700 is screen height
    let yGap = 700

    let x = startingObstacleDistance
    let y = Phaser.Math.Between(0, screenHeight)

    for (let i = 0; i < this.numberOfPlatforms; ++i) {
      const belowPlatforms = this.belowPlatforms
        .create(x, y + yGap, 'platform2')
        .setGravity(0, -330)
        .setVelocityX(-600)
      belowPlatforms.scale = 2

      const abovePlatforms = this.abovePlatforms
        .create(x, y, 'platform')
        .setGravity(0, -330)
        .setVelocityX(-600)

      abovePlatforms.scale = 2

      const body = belowPlatforms.body
      body.updateFromGameObject()

      const body2 = abovePlatforms.body
      body2.updateFromGameObject()

      x = x + Phaser.Math.Between(minXGap, maxXGap)
      y = Phaser.Math.Between(0, screenHeight)
    }

    this.cursors = this.input.keyboard.createCursorKeys()

    // this.anims.create({
    //   key: 'idle1',
    //   frames: this.anims.generateFrameNumbers('Bonbon'),
    //   frameRate: 10,
    //   repeat: -1,
    // })

    // this.enemyBonBon = this.physics.add
    //   .sprite(3000, 500, 'Bonbon')
    //   .setScale(5)
    //   .setGravity(0, -330)

    // this.enemyBonBon.play('idle1', true)

    // this.anims.create({
    //   key: 'idle2',
    //   frames: this.anims.generateFrameNumbers('Lips'),
    //   frameRate: 10,
    //   repeat: -1,
    // })

    // this.enemyLips = this.physics.add
    //   .sprite(5000, 600, 'Lips')
    //   .setScale(5)
    //   .setGravity(0, -330)

    // this.enemyLips.play('idle2', true)

    // this.tweens.add({
    //   targets: [this.enemyBonBon, this.enemyLips],
    //   x: 0,
    //   duration: 8800,
    //   ease: 'Linear',
    //   yoyo: true,
    // })

    // the boss and its weapon
    this.bossFireGroup = new BossFireGroup(this)

    this.boss = this.physics.add
      .sprite(1200, 1000, 'Boss')
      .setScale(8)
      .setGravity(0, -330)
      .setFlipX(true)

    // .setVisible(false)
    // .setActive(false)

    this.boss.body.enable = false

    this.anims.create({
      key: 'bossAttack',
      frames: this.anims.generateFrameNumbers('Boss'),
      frameRate: 10,
      repeat: -1,
    })
    this.boss.play('bossAttack', true)
    this.boss.body.setCollideWorldBounds(true)
    this.boss.body.setVelocity(0, 0)
    this.boss.body.setBounce(0, 0.6)

    this.anims.create({
      key: 'explosion',
      frames: this.anims.generateFrameNumbers('kaboom'),
      frameRate: 30,
    })

    // player v enemy - with explosion, gameover
    this.physics.add.collider(
      this.player,
      [this.enemyGroup, this.bossFireGroup],
      this.hitEnemy,
      null,
      this
    )

    // player v platform - with explosion, gameover
    this.physics.add.collider(
      this.player,
      [this.abovePlatforms, this.belowPlatforms],
      this.hitPlatform,
      null,
      this
    )

    // laser v enemy - with explosion
    this.physics.add.collider(
      this.laserGroup,
      this.enemyGroup,
      this.fireEnemy,
      null,
      this
    )

    // laser v boss
    this.physics.add.collider(
      this.laserGroup,
      this.boss,
      this.fireBoss,
      null,
      this
    )

    // laser v platform
    this.physics.add.overlap(
      this.laserGroup,
      [this.abovePlatforms, this.belowPlatforms],
      this.firePlatform
    )

    //sound effect
    this.playerExplosion = this.sound.add('player-explosion')
    this.laserSound = this.sound.add('laserSound')
    this.enemyExplosion = this.sound.add('enemy-explosion')
  }

  //functions that need to be called
  kaboom(player) {
    this.Kaboom = this.add
      .sprite(player.x, player.y, 'kaboom')
      .setScale(10)
      .play('explosion')
      .once('animationcomplete', () => {
        this.Kaboom.destroy()
      })
  }

  fireBullet() {
    this.laserGroup.fireBullet(this.player.x + 20, this.player.y)
  }

  activateEnemy(x, y) {
    this.enemyGroup.activateEnemy(x, y)
  }

  bossBullet() {
    this.bossFireGroup.bossBullet(750, this.boss.y - 90)
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

  resetFire() {
    this.bossFireGroup.children.entries.forEach((laser) => {
      if (!this.cameras.main.worldView.contains(laser.x, laser.y)) {
        laser.body.reset(laser.x, laser.y)
        laser.setActive(false)
        laser.setVisible(false)
      }
    })
  }

  hitEnemy(player, enemy) {
    this.physics.pause()

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

  fireEnemy(laser, enemy) {
    enemy.setTint(0xff0000)
    this.kaboom(enemy)
    // enemy.setVisible(false)
    this.enemyExplosion.play()

    laser.body.reset(-500, 0)
    enemy.destroy()

    // this.resetBullet()
    // this.time.addEvent({
    //   delay: 1000,
    //   callback: () => {
    //     this.gameOver()
    //   },
    // })
  }

  firePlatform(laser, platform) {
    laser.setVisible(false)
  }

  fireBoss(boss, laser) {
    this.kaboom(boss)
    this.playerExplosion.play()
    // boss.setVisible(false)
    this.time.addEvent()
    boss.destroy()
    this.time.addEvent({
      delay: 500,
      callback: () => {
        this.scene.start('Victory')
      },
    })
  }

  gameOver() {
    this.scene.start('GameOver')
    // this.music.pause()
  }

  resetBullet() {
    this.laserGroup.children.entries.forEach((laser) => {
      laser.body.reset(laser.x, laser.y)
      laser.setActive(false)
      laser.setVisible(false)
    })
  }

  resetBulletOutOfBounds() {
    this.laserGroup.children.entries.forEach((laser) => {
      if (!this.cameras.main.worldView.contains(laser.x, laser.y)) {
        laser.body.reset(laser.x, laser.y)
        laser.setActive(false)
        laser.setVisible(false)
      }
    })
  }

  update() {
    if (!this.timeGameStart) {
      this.timeGameStart = this.time.now
      this.enemyTime = this.enemyTime + this.timeGameStart
      this.bossTime = this.bossTime + this.timeGameStart
    }

    this.clouds1.tilePositionX += 2
    this.rocks1.tilePositionX += 2
    this.clouds2.tilePositionX += 2
    this.rocks2.tilePositionX += 4
    this.clouds3.tilePositionX += 5
    this.clouds4.tilePositionX += 6

    // this.parallax.start()

    this.resetBulletOutOfBounds()
    this.bossBullet()
    this.resetFire()

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

    // aactivate enemies
    if (
      this.time.now > this.enemyTime &&
      this.time.now < this.enemyTime + this.phaseTime
    ) {
      this.activateEnemy(1920, Phaser.Math.Between(0, 800))
      this.enemyTime = this.time.now + this.enemyDelay
    } else {
      if (this.switch && this.time.now > this.bossTime) {
        this.switch = false
        this.boss.body.enable = true
      }
    }
  }
}
