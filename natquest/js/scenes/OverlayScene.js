import { createFullscreenIcon } from './overlaySceneFunctions/fullscreen.js';
import { createZoomIcons } from './overlaySceneFunctions/zoom.js';
import { resizer } from './resizer.js';

export default class OverlayScene extends Phaser.Scene {
  constructor() {
    super({ key: 'OverlayScene' })
    
  }

  init(data) {
   // this.player = data.player;
  }

  preload() {

  }

  create() {
    this.fullscreenIcon = createFullscreenIcon(this); //fullscreen icon, positioned in top right corner of viewport

    this.zoomIcons = createZoomIcons(this); // positioned directly to left of fullscreen icon, at about 3/4 viewport 

    console.log('this.scene.manager from Overlay Scene: ' + this.scene.manager);
    console.log('this.scene.manager.scenes from Overlay Scene: ' + this.scene.manager.scenes);

    
    this.healthBar = this.add.rectangle(
    (window.innerWidth / 4) / 2 / 2,  // X coordinate relative to the viewport
    (window.innerHeight / 4) / 2 / 2,  // Y coordinate relative to the viewport
    50,  // Width of the object
    300,  // Height of the object
    0xff0000  // Color of the object (red)
);
    this.healthBar.setScrollFactor(0, 0);
    this.healthBar.setDepth(100000);


    this.scale.on('resize', resizer(this));
    
  }
  
  update() {

  }
}


