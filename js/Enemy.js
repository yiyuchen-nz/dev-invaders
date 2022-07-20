export class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'Alan')

    // this.body.play('idle', true)
  }

  move(x, y) {
    this.body.reset(x, y)
    this.setVelocityX(-300)
    // refactor this with only gravity for player
    this.setGravity(0, -330)
    this.setActive(true)
    this.setVisible(true)
  }
}

export default class EnemyGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene, x, y) {
    super(scene.physics.world, scene)

    this.createMultiple({
      frameQuantity: 20,
      key: 'Alan',
      active: false,
      visible: false,
      setScale: { x: 5, y: 5 },
      classType: Enemy,
      setXY: { y: 700, x:-500 },
    })

    this.scene.anims.create({
      key: 'idle',
      frames: this.scene.anims.generateFrameNumbers('Alan'),
      frameRate: 10,
      repeat: -1,
    })

    this.playAnimation('idle')

    // Enemy starting coordintes
    // this.x = 700
    // this.y = 100

  }

  activateEnemy(x,y) {
    const enemy = this.getFirstDead(false)
      if (enemy) {
        enemy.move(x, y)
      }
  }
}


// export default class Enemy extends Phaser.Physics.Arcade.Sprite {
//   constructor(scene, x, y) {
//     super(scene, 0, 0, 'Alan')
//     this.enemyAlan = this.add.sprite(900, 100, 'Alan')
//     this.enemyAlan.setScale(5)
//     this.anims.create({
//       key: 'idle',
//       frames: this.anims.generateFrameNumbers('Alan', { start: 0, end: 5 }),
//       frameRate: 10,
//       repeat: -1,
//     })
//     this.enemyAlan.anims.play('idle', true)
//     this.add.existing(this)
//   }

  // create() {

  // this.enemyBonBon = this.add.sprite(600, 500, 'Bonbon')
  // this.enemyBonBon.setScale(5)
  // this.anims.create({
  //   key: 'idle1',
  //   frames: this.anims.generateFrameNumbers('Bonbon', { start: 0, end: 3 }),
  //   frameRate: 10,
  //   repeat: -1,
  // })
  // this.enemyBonBon.anims.play('idle1', true)
  // }
// }