
class Laser extends Phaser.Physics.Arcade.Sprite
{
	constructor(scene, x, y) {
		super(scene, x, y, 'laser');
	}

	fire(x, y) {
		this.body.reset(x, y);

		this.setActive(true);
		this.setVisible(false);

		this.setVelocityY(-900);
	}

}

class LaserGroup extends Phaser.Physics.Arcade.Group
{
	constructor(scene) {
		super(scene.physics.world, scene);

		this.createMultiple({
			frameQuantity: 30,
			key: 'laser',
			active: false,
			visible: false,
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

class Laser extends Phaser.Physics.Arcade.Sprite
{
	constructor(scene, x, y) {
		super(scene, x, y, 'laser');
	}

	fire(x, y) {
		this.body.reset(x, y);

		this.setActive(true);
		this.setVisible(false);

		this.setVelocityY(-900);
	}

}

class LaserGroup extends Phaser.Physics.Arcade.Group
{
	constructor(scene) {
		super(scene.physics.world, scene);

		this.createMultiple({
			frameQuantity: 30,
			key: 'laser',
			active: false,
			visible: false,
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
    this.bullet
    this.velocity = -50
	}
  
  preload ()
  {
    this.load.image('sky', 'assets/sky.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('fireBall', 'assets/blast.png');
    
  }

  create ()
  {
    this.add.image(400, 300, 'sky');

    this.player = this.physics.add.sprite(20, 0, 'dude');
    this.player.setCollideWorldBounds(true);

    this.bullet = this.physics.add.sprite(0,0,'shoot')
    this.bullet.setScale(0.05)
    this.bullet.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update ()
  {
    if (this.cursors.up.isDown)
    {
        this.velocity -= 10
        this.player.setVelocityY(-200);
    }
    else {
     this.velocity < 0 ? this.velocity += 10 : null
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