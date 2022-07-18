export default class GameOver extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameOver'
    });
  }

  create() {
      var text = this.add.text(
        640, 
        360, 
        "Game Over", 
        {
            fontSize: 50,
            color: "#000000",
            fontStyle: "bold"
        }
    ).setOrigin(0.5);
  }
}