import { createFullscreenIcon } from './overlaySceneFunctions/fullscreen.js';
import { createZoomIcons } from './overlaySceneFunctions/zoom.js';
import { resizeGame, setupResizeListener } from './overlaySceneFunctions/resizer.js';
import { createHealthBar } from './overlaySceneFunctions/healthBar.js';
import customEmitter from '../main.js';

export default class OverlayScene extends Phaser.Scene {
  constructor() {
    super({ key: 'OverlayScene' })
   //  this.eventEmitter = new Phaser.Events.EventEmitter();
  }

  init(data) {
   // this.player = data.player;
    this.activeScene = null;
  }

  preload() {

  }

  create() {

    this.getInitialActiveScene();

    customEmitter.on('activeSceneChanged', this.updateActiveScene); //subscribe to global instance of custom event emitter

    this.fullscreenIcon = createFullscreenIcon(this); //fullscreen icon, positioned in top right corner of viewport
    
    this.zoomIcons = createZoomIcons(this); // positioned directly to left of fullscreen icon, at about 3/4 viewport 
    
    this.healthBar = createHealthBar(this);

    this.resizer = setupResizeListener(this);
       
  }
/*
updateActiveScene() {
  console.log('updateActiveScene method activating');
  this.scene.manager.scenes.forEach(scene => {
    if (scene.scene.key !== 'OverlayScene') {
    this.activeScene = scene;
}
}); 
}
*/

  getInitialActiveScene = () => {
  console.log('getInitialActiveScene method activating');
  this.scene.manager.scenes.forEach(scene => {
    if (scene.scene.key !== 'OverlayScene' && scene.paused !== true) {
      this.activeScene = scene;
      console.log('got initial active scene');
    }
  });
}

  
  updateActiveScene = (newScene) => {
  console.log('updateActiveScene method activating');
      this.activeScene = newScene;
      console.log('attempting to console new active scene: ' + this.activeScene.scene.key + this.activeScene);
     // customEmitter.emit('SwitchOverlayActiveScene', scene);
  };

  
  
  update() {

  }
}


