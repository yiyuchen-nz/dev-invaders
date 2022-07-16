export default class Preloader extends Phaser.Scene
{
    constructor ()
    {
        super('Preloader');
    }

     preload ()
    {
      this.load.image('sky', 'assets/sky.png');
      this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }
}