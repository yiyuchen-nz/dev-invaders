export default class Title extends Phaser.Scene {
  constructor() {
    super({
      key: 'Title',
    })
  }

  preload() {
    this.load.image(
      'start-game',
      '../assets/minipixel/UI objects/START (48 x 8).png'
    )

    this.load.image('left', 'assets/minipixel/LEFT.png')
    this.load.image('right', 'assets/minipixel/RIGHT.png')
    this.load.image('text', 'assets/minipixel/TEXT.png')
    this.load.image('start', 'assets/minipixel/START.png')

    this.load.image('back-ground', '../assets/minipixel/TITLE.png')
    this.load.image('sky', 'assets/parallax/sky.png')
    this.load.image('clouds1', 'assets/parallax/clouds_1.png')
    this.load.image('clouds2', 'assets/parallax/clouds_2.png')
    this.load.image('clouds3', 'assets/parallax/clouds_3.png')
    this.load.image('clouds4', 'assets/parallax/clouds_4.png')
    this.load.image('rocks1', 'assets/parallax/rocks_1.png')
    this.load.image('rocks2', 'assets/parallax/rocks_2.png')
  }

  create() {
    // var text = this.add
    //   .text(900, 100, 'Dev Invaders', {
    //     fontSize: 100,
    //     color: '#000000',
    //     fontStyle: 'bold',
    //     fontfamily: 'Anton',
    //   })
    //   .setOrigin(0.5)

    // var text = this.add
    //   .text(900, 300, 'Press UP to Fly', {
    //     fontSize: 100,
    //     color: 'white',
    //     fontStyle: 'bold',
    //   })
    //   .setOrigin(0.5)

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

    const TEXT = this.add
      .sprite(950, 300, 'text')
      .setScale(0.18)
      .setInteractive()

    const RIGHT = this.add
      .sprite(1680, 550, 'right')
      .setScale(0.2)
      .setInteractive()

    const LEFT = this.add
      .sprite(250, 550, 'left')
      .setScale(0.2)
      .setInteractive()

    const TITLE = this.add
      .sprite(980, 90, 'back-ground')
      .setScale(0.7)
      .setInteractive()

    const start = this.add
      .sprite(950, 550, 'start')
      .setScale(0.3)
      .setInteractive()

    start.on('pointerdown', () => this.scene.start('MainScene'))

    // start.on('pointerover', () => start.setTint(0xff0000a160))
    var text = this.add
      .text(950, 750, 'Created by Team PEWPEW, Diana David Liam Yiyu', {
        fontSize: 20,
        color: 'white',
        fontStyle: 'bold',
      })
      .setOrigin(0.5)
  }

  update() {
    this.clouds1.tilePositionX += 2
    this.rocks1.tilePositionX += 2
    this.clouds2.tilePositionX += 2
    this.rocks2.tilePositionX += 4
    this.clouds3.tilePositionX += 5
    this.clouds4.tilePositionX += 6
  }
}
