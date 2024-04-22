export class OverlayScene extends Phaser.Scene {
  constructor() {
    super({ key: 'OverlayScene' })
    
  }

  init(data) {
   // this.player = data.player;
  }

  preload() {

  }

  create() {
    
    this.healthBar = this.add.rectangle(
    (window.innerWidth / 4) / 2 / 2,  // X coordinate relative to the viewport
    (window.innerHeight / 4) / 2 / 2,  // Y coordinate relative to the viewport
    50,  // Width of the object
    300,  // Height of the object
    0xff0000  // Color of the object (red)
);
    this.healthBar.setScrollFactor(0, 0);
    this.healthBar.setDepth(1000);
    
  }
  
  update() {

  }
}


