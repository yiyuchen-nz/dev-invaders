import Preloader from './scripts/preloader';

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

function update ()
{
  if (cursors.left.isDown)
  {
      player.setVelocityX(-160);
  }
  else if (cursors.right.isDown)
  {
      player.setVelocityX(160);
  }
  else
  {
      player.setVelocityX(0);
  }

  if (cursors.up.isDown)
  {
      player.setVelocityY(-330);
  }
}