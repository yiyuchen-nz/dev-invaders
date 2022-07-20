import ParallaxScene from './ParallaxScene.js'
import Title from './Title.js'
import GameOver from './GameOver.js'
import MainScene from './MainScene.js'
import Victory from './Victory.js'

const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 800,
  backgroundColor: '',
  parent: 'dev-invaders',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 330 },
      debug: false,
    },
  },
  pixelArt: true,
  scene: [Title, MainScene, GameOver,Victory],
  // scene: [ParallaxScene],
}

const game = new Phaser.Game(config)
