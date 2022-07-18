import LaserGroup from '../js/Laser.js'
// import ParallaxScene from '../js/ParallaxScene.js'

export default class MainScene extends Phaser.Scene {
  constructor() {
    // super is used to access and call functions on the parent's object. When super is called, it calls the parent class's constructor. In the config.
    super('MainScene')
    this.cursors
    this.player
    this.setPlayerVelocity = -50
    this.enemyAlan
    this.enemyBonBon
    this.enemyLips
    this.platforms
    // this.shootingSound
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
    this.load.spritesheet('Lips', 'assets/minipixel/Enemies/Lips.png', {
      frameWidth: 16,
      frameHeight: 16,
    })

    this.load.image('platform', 'assets/minipixel/spikes.png')

    //this.load.audioSprite('pewPew', 'assets/minipixel/player-fire.wav')
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

    // this.platforms = this.physics.add.group()
    // for (let i = 0; i < 1; ++i) {
    //   const x = Phaser.Math.Between(400, 2000)
    //   const y = 40 * i

    //   const platform = this.platforms
    //     .create(x, y, 'platform')
    //     .setGravity(0, -330)
    //     .setVelocityX(-200)
    //   console.log(platform)
    //   // this.platforms.angle(90)
    //   platform.scale = 3

    //   const body = platform.body
    //   body.updateFromGameObject()
    // }
    this.platforms = this.physics.add.group()
    for (var i = 0; i < 20; i++) {
      this.platform = this.physics.add
        .sprite(
          Phaser.Math.Between(0, this.game.config.width),
          600, //Phaser.Math.Between(0, this.game.config.height)
          'platform'
        )
        .setSize(50, 50, true) //164x160
        .setGravity(0, -330)
        .setVelocityX(-50)
    }

    this.groupPlatforms = this.platforms.getChildren()

    this.player = this.physics.add.sprite(50, 0, 'dude')
    this.player.setScale(0.3)
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
      targets: [
        this.enemyAlan,
        this.enemyBonBon,
        this.enemyLips,
        // this.platforms,
      ],
      x: 0,
      duration: 8800,
      ease: 'Linear',
      yoyo: true,
    })

    // this.parallax = new ParallaxScene(this)

    // let platformsChildren = this.platforms.getChildren()
    // console.log('this.platforms', this.platforms)
    this.physics.add.collider(
      this.player,
      [
        this.enemyAlan,
        this.enemyBonBon,
        this.enemyLips,
        this.platform,
        this.groupPlatforms.splice(','),
      ],
      this.hitEnemy,
      null,
      this
    )

    //this.shootingSound = this.add.audioSprite('pewPew')
  }

  fireBullet() {
    this.laserGroup.fireBullet(this.player.x + 20, this.player.y)
    //this.shootingSound.playAudioSprite('pewPew', space)
  }

  hitEnemy(player, enemy) {
    this.physics.pause()
    player.setTint(0xff0000)
    enemy.destroy()
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.gameOver()
      },
    })
  }

  gameOver() {
    this.scene.start('GameOver')
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
      this.player.setVelocityY(this.player.body.velocity.y - 20)
    }
    if (this.cursors.space.isDown) {
      this.fireBullet()
    }

    // if the player leaves the screen game over
    if (!this.cameras.main.worldView.contains(this.player.x, this.player.y)) {
      // this.scene.launch overlays scenes
      this.gameOver()
    }
  }
}
