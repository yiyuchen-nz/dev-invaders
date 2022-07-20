export class Laser extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'laser')
  }

  fire(x, y) {
    this.body.reset(x, y)
    this.setVelocityX(900)
    // refactor this with only gravity for player
    this.setGravity(0, -330)
    this.setActive(true)
    this.setVisible(true)
  }
}

export default class LaserGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene)

    this.createMultiple({
      frameQuantity: 10,
      key: 'laser',
      active: false,
      visible: false,
      setScale: { x: 3, y: 3 },
      classType: Laser,
      setXY: { y: 700, x:-1000 },
    })

    this.shotDelay = 600
    this.nextShotTime = 0
  }

  fireBullet(x, y) {
    const laser = this.getFirstDead(false)
    if (this.nextShotTime < this.scene.time.now) {
      if (laser) {
        laser.fire(x, y)
      }
      this.nextShotTime = this.scene.time.now + this.shotDelay
    }
  }
}
