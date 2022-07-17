export default class Earth extends Phaser.GameObjects.Container {
  constructor(data) {
    let { scene, image } = data
    let earthImage = new Phaser.GameObjects.TileSprite(
      800,
      200,
      2400,
      1400,
      image
    )
    super(scene, earthImage)
    this.earthImage = earthImage
    // this.depth = depth
    this.scene = scene
    this.scene.add.existing(this)
    // this.earthImage.tilePositionX += 0.5
  }
}
