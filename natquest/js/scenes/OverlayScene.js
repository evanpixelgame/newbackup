import { createFullscreenIcon } from './overlaySceneFunctions/fullscreen.js';
import { createZoomIcons } from './overlaySceneFunctions/zoom.js';
import { resizeGame, setupResizeListener } from './overlaySceneFunctions/resizer.js';
import { createHealthBar } from './overlaySceneFunctions/healthBar.js';

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

    
    this.healthBar = createHealthBar(this);


this.resizer = setupResizeListener(this);
    
  }

  
  update() {

  }
}


