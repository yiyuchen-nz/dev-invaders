const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 800,
  backgroundColor: '#333333',
  parent: 'dev-invaders',
  // physics: {
  //   default: 'arcade',
  //   arcade: {
  //     gravity: { y: 200 },
  //   },
  // },
  scene: [MainScene],
}

new Phaser.Game(config)
