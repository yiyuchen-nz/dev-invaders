// import Preloader from './scripts/preloader';
// import test from './scripts/preloader'

// test()

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 300 },
          debug: false
      }
  },
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};

var player;
var cursors;

var game = new Phaser.Game(config);

function preload ()
{
  this.load.image('sky', 'assets/sky.png');
  this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create ()
{
  this.add.image(400, 300, 'sky');

  player = this.physics.add.sprite(0, 450, 'dude');
  player.setCollideWorldBounds(true);

  cursors = this.input.keyboard.createCursorKeys();
}

let velocity = -50

function update ()
{
  if (cursors.up.isDown)
  {
      velocity -= 10
      player.setVelocityY(velocity);
  }
  else {
    velocity < 0 ? velocity += 10 : null
  }
}