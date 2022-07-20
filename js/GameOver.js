export default class GameOver extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameOver',
    })
  }

  preload() {
    this.load.image('restart-game', '../assets/minipixel/restart.png')
    this.load.image('game-over', '../assets/minipixel/UI-objects/GAME_OVER.png')
    this.load.image('defeat', '../assets/minipixel/DEFEAT.png')
    this.load.image('lessons', '../assets/minipixel/LESSONS.png')

    this.load.image('continue', '../assets/minipixel/CONTINUE.png')
    this.load.image('yes', '../assets/minipixel/YES.png')
    this.load.image('no', '../assets/minipixel/NO.png')

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
  }

  create() {
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
      .sprite(200, 400, 'Bonbon')
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
      .sprite(500, 600, 'Lips')
      .setScale(5)
      .setGravity(0, -330)

    this.enemyLips.play('idle2', true)

    this.add.sprite(880, 520, 'continue').setScale(0.3).setInteractive()
    const yes = this.add.sprite(750, 600, 'yes').setScale(0.3).setInteractive()
    const no = this.add.sprite(1020, 600, 'no').setScale(0.3).setInteractive()

    const defeat = this.add
      .sprite(950, 200, 'defeat')
      .setScale(1.5)
      .setInteractive()

    this.add.sprite(950, 350, 'lessons').setScale(0.2).setInteractive()

    //var mainScene = this.scene.get('MainScene')
    no.on('pointerdown', () => this.scene.start('Title'))
    // mainScene.scene.restart())
    //  this.scene.restart('MainScene'))

    // restart.on('pointerover', () => restart.setTint(0xff0000a160))
  }
}
