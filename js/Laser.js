export class Laser extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'laser')
  }

  fire(x, y) {
    this.body.reset(x, y)

    this.setActive(true)
    this.setVisible(true)

    this.setVelocityX(900)
    this.setGravity(0, -330)
  }
}

export default class LaserGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene)

    this.createMultiple({
      frameQuantity: 1000,
      key: 'laser',
      active: false,
      visible: false,
      setScale: { x: 0.03, y: 0.03 },
      classType: Laser,
    })
  }

  fireBullet(x, y) {
    const laser = this.getFirstDead(false)
    if (laser) {
      laser.fire(x, y)
    }
  }
}
