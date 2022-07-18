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

      // Destroy bullet once off screen
      this.scene.time.addEvent({
        delay: 10000,
        callback: () => {
          this.destroy()
        }
      })
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
      setScale: { x: 3, y: 3 },
      classType: Laser,
    })

    this.shotDelay = 300
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
