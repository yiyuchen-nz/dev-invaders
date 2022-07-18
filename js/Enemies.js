export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, 0, 0, 'Alan')
    this.enemyAlan = this.add.sprite(900, 100, 'Alan')
    this.enemyAlan.setScale(5)
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('Alan', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1,
    })
    this.enemyAlan.anims.play('idle', true)
    this.add.existing(this)
  }

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
}
