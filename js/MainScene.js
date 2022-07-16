export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene')
  }
  preload() {
    this.load.image('background', 'assets/minipixel/SpaceBG.png')
  }

  create() {
    this.add.tileSprite(800, 200, 2400, 1400, 'background')
  }
}
