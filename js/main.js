import MainScene from './MainScene.js'
import ParallaxScene from './ParallaxScene.js'

var GameOver = {
  key: 'GameOver',

  create: function create() {
      var text = this.add.text(
        640, 
        360, 
        "Game Over", 
        {
            fontSize: 50,
            color: "#000000",
            fontStyle: "bold"
        }
    ).setOrigin(0.5);
  }
};

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
  scene: [MainScene, GameOver],
  // scene: [ParallaxScene],
}

const game = new Phaser.Game(config)
