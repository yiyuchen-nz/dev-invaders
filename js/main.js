import ParallaxScene from './ParallaxScene.js'
import Title from './Title.js'
import GameOver from './GameOver.js';
import MainScene from './MainScene.js'

const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 800,
  backgroundColor: '#433333',
  parent: 'dev-invaders',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 330 },
      debug: false,
    },
  },
  // pixelArt: true,
  scene: [Title, MainScene, GameOver],
  // scene: [ParallaxScene],
}

const game = new Phaser.Game(config)
