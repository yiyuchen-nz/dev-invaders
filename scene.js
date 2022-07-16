import { LaserGroup } from './laser.js'

export class SpaceScene extends Phaser.Scene{
	constructor() {
		super();
    this.cursors
    this.player
    this.setPlayerVelocity = -50
	}
  
  preload ()
  {
    this.load.image('sky', 'assets/sky.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('laser', 'assets/blast.png');
    
  }

  create ()
  {
    this.add.image(400, 300, 'sky');

    this.player = this.physics.add.sprite(20, 0, 'dude');
    this.player.setCollideWorldBounds(true);

    this.laserGroup = new LaserGroup(this)

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  fireBullet() {
		this.laserGroup.fireBullet(this.player.x + 20, this.player.y);
	}

  update ()
  {
    if (this.cursors.up.isDown)
    {
        this.setPlayerVelocity -= 10
        this.player.setVelocityY(this.setPlayerVelocity);
    }
    else {
     this.setPlayerVelocity < 0 ? this.setPlayerVelocity += 10 : null
    }
    if(this.cursors.space.isDown) {
      this.fireBullet()
    }
  }

}