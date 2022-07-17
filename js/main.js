import MainScene from './MainScene.js'
import ParallaxScene from './ParallaxScene.js'

const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 800,
  backgroundColor: '#333333',
  parent: 'dev-invaders',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 330 },
      debug: false,
    },
  },
  // pixelArt: true,
  scene: [MainScene],
  // scene: [ParallaxScene],
}

const game = new Phaser.Game(config)
