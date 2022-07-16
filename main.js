class Laser extends Phaser.Physics.Arcade.Sprite
{
	constructor(scene, x, y) {
		super(scene, x, y, 'laser');
	}

	fire(x, y) {
		this.body.reset(x, y);

		this.setActive(true);
		this.setVisible(true);

		this.setVelocityX(900);
	}

}

class LaserGroup extends Phaser.Physics.Arcade.Group
{
	constructor(scene) {
		super(scene.physics.world, scene);

		this.createMultiple({
			frameQuantity: 1000,
			key: 'laser',
			active: false,
			visible: false,
      setScale: { x: 0.03, y: 0.03 },
			classType: Laser
		});
	}

	fireBullet(x, y) {
		const laser = this.getFirstDead(false);
		if(laser) {
			laser.fire(x, y);
		}
	}
}


class SpaceScene extends Phaser.Scene{
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