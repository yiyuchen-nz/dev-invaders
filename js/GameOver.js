export default class GameOver extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameOver',
    })
  }

  preload() {
    this.load.image('restart-game', '../assets/minipixel/restart.png')
    this.load.image('game-over', '../assets/minipixel/UI-objects/GAME_OVER.png')
  }

  create() {
    this.add.sprite(640, 260, 'game-over').setScale(5)
    this.add
      .text(640, 360, 'Start Again', {
        fontSize: 25,
        color: '#000000',
        fontStyle: 'bold',
      })
      .setOrigin(0.5)

    const restart = this.add
      .sprite(760, 360, 'restart-game')
      .setScale(0.1)
      .setInteractive()

    //var mainScene = this.scene.get('MainScene')
    restart.on('pointerdown', () => this.scene.start('Title'))
    // mainScene.scene.restart())
    //  this.scene.restart('MainScene'))

    restart.on('pointerover', () => restart.setTint(0xff0000a160))
  }
}
