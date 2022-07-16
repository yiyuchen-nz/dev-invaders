import { SpaceScene } from './scene.js'

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 330 },
          debug: false
      }
  },
  scene: SpaceScene
};

const game = new Phaser.Game(config);