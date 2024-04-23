import { createFullscreenIcon } from './overlaySceneFunctions/fullscreen.js';
//import { createZoomIcons } from './overlaySceneFunctions/zoom.js';
import { resizeGame, setupResizeListener } from './overlaySceneFunctions/resizer.js';
import { createHealthBar } from './overlaySceneFunctions/healthBar.js';

export default class OverlayScene extends Phaser.Scene {
  constructor() {
    super({ key: 'OverlayScene' })
    
  }

  init(data) {
   // this.player = data.player;
    this.activeScene = null;
  }

  preload() {

  }

  create() {
 
    
    this.fullscreenIcon = createFullscreenIcon(this); //fullscreen icon, positioned in top right corner of viewport

   // this.zoomIcons = createZoomIcons(this, this.activeScene); // positioned directly to left of fullscreen icon, at about 3/4 viewport 
    
    this.healthBar = createHealthBar(this);

    this.resizer = setupResizeListener(this);
       
    this.scene.manager.scenes.forEach(scene => {
   // console.log(scene.scene.key); // Access the key of each scene
   // console.log(scene); // Log each scene object
    if (scene.scene.key !== 'OverlayScene') {
    this.activeScene = scene;
}
});

    console.log('titi is the prettiest in universe and here is only active under scene: ' + this.activeScene.scene.key + this.activeScene);

    this.activeScene.cameraZoomLevel = 3;
    
  }

  
  update() {

  }
}


