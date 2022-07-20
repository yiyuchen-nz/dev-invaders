export class BossFire extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'bossfire')
  }

  bossAttack(x, y) {
    this.body.reset(x, y)
    this.setVelocityX(-500)
    // refactor this with only gravity for player
    this.setGravity(0, -200)
    this.setActive(true)
    this.setVisible(true)
    // this.setRotation(atan2(x - 5, y - 5))
  }
}

export default class BossFireGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene)

    this.createMultiple({
      frameQuantity: 5,
      key: 'bossfire',
      active: false,
      visible: false,
      setScale: { x: 0.06, y: 0.06 },
      setXY: { x: 800 },
      classType: BossFire,
    })

    this.shotDelay = 800
    this.nextShotTime = 500
  }

  bossBullet(x, y) {
    const bossfire = this.getFirstDead(false)
    if (this.nextShotTime < this.scene.time.now) {
      if (bossfire) {
        bossfire.bossAttack(x, y)
      }
      this.nextShotTime = this.scene.time.now + this.shotDelay
    }
  }
}
