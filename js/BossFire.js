export class BossFire extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'bossfire')
  }

  bossAttack(x, y) {
    this.body.reset(x, y)
    this.setVelocityX(-500)
    // refactor this with only gravity for player
    this.setGravity(0, -330)
    this.setActive(true)
    this.setVisible(true)
  }
}

export default class BossFireGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene)

    this.createMultiple({
      frameQuantity: 8,
      key: 'bossfire',
      active: false,
      visible: false,
      setScale: { x: 3, y: 3 },
      classType: BossFire,
    })

    this.shotDelay = 1000
    this.nextShotTime = 300
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
