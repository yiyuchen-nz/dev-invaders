export default class Victory extends Phaser.Scene {
  constructor() {
    super({
      key: 'Victory',
    })
  }

  preload() {
    this.load.image('victory', '../assets/minipixel/VICTORY.png')
    this.load.image('unlockText', '../assets/minipixel/UNLOCKTEXT.png')
    this.load.image('buyNow', '../assets/minipixel/BUYNOW.png')
    this.load.image('sky', 'assets/parallax/sky.png')
    this.load.image('dude', 'assets/minipixel/smiling-spaceship.png')
    this.load.image('con', 'assets/minipixel/CONFETTI.png')

    this.load.spritesheet('Alan', '../assets/minipixel/Enemies/Alan.png', {
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
      frameWidth: 16,
      frameHeight: 16,
    })
  }

  create() {
    const width = this.scale.width
    const height = this.scale.height

    this.sky = this.add.image(width * 0.5, height * 0.5, 'sky')
    this.con = this.add.image(width * 0.5, height * 0.5, 'con')
    this.con = this.add.image(width * 0.8, height * 0.1, 'con')

    // this.add.image(width * 0.5, height * 0.5, 'background')
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('Alan'),
      frameRate: 10,
      repeat: -1,
    })

    this.enemyAlan = this.physics.add
      .sprite(300, 700, 'Alan')
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
      .sprite(200, 350, 'Bonbon')
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
      .sprite(1700, 600, 'Lips')
      .setScale(5)
      .setGravity(0, -330)

    this.enemyLips.play('idle2', true)

    // this.add.sprite(880, 520, 'continue').setScale(0.3).setInteractive()
    // this.add.sprite(950, 700, 'skux').setScale(0.15).setInteractive()
    this.add.sprite(950, 200, 'victory').setScale(1.5).setInteractive()

    // this.add.sprite(950, 350, 'victoryText').setScale(0.15).setInteractive()
    this.add.sprite(950, 400, 'unlockText').setScale(0.15).setInteractive()

    this.player = this.physics.add.sprite(0, 500, 'dude')
    this.player.setScale(0.2).setVelocityX(300).setGravity(0, -330)

    const buyNow = this.add
      .sprite(950, 600, 'buyNow')
      .setScale(0.3)
      .setInteractive()

    buyNow.on('pointerdown', () => this.scene.start('Title'))
    // restart.on('pointerover', () => restart.setTint(0xff0000a160))
  }
}

// controls

// createControls()
// {
//   let w = 0.45 * this.CONFIG.width
//   let h = this.CONFIG.height

//   this.zone_left = this.add.zone(0, 0, w, h)
//   this.zone_left.setOrigin(0, 0)
//   this.zone_left.setDepth(this.DEPTH.ui)
//   this.zone_left.setScrollFactor(0)
// }
