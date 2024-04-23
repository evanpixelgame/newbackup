import { createFullscreenIcon } from './overlaySceneFunctions/fullscreen.js';
import { createZoomIcons } from './overlaySceneFunctions/zoom.js';
import { resizeGame, setupResizeListener } from './overlaySceneFunctions/resizer.js';
import { createHealthBar } from './overlaySceneFunctions/healthBar.js';

export default class OverlayScene extends Phaser.Scene {
  constructor() {
    super({ key: 'OverlayScene' })
    this.eventEmitter = new Phaser.Events.EventEmitter();
  }

  init(data) {
   // this.player = data.player;
    this.activeScene = null;
  }

  preload() {

  }

  create() {

  //  this.eventEmitter = new Phaser.Events.EventEmitter();
    this.updateActiveScene();
    
  // Create an instance of EventEmitter
//   this.sceneChangeEmitter = new Phaser.Events.EventEmitter();

    this.eventEmitter.on('activeSceneChanged', this.updateActiveScene, this); //subscribe to event emitter
    
    this.fullscreenIcon = createFullscreenIcon(this); //fullscreen icon, positioned in top right corner of viewport
    
    this.zoomIcons = createZoomIcons(this); // positioned directly to left of fullscreen icon, at about 3/4 viewport 
    
    this.healthBar = createHealthBar(this);

    this.resizer = setupResizeListener(this);
       
  }

  updateActiveScene() {
    
    console.log('handling scene change okee');
    this.scene.manager.scenes.forEach(scene => {
    if (scene.scene.key !== 'OverlayScene') {
    this.activeScene = scene;
}
});

    console.log('titi is the prettiest in universe and here is only active under scene: ' + this.activeScene.scene.key + this.activeScene);

    console.log(this.activeScene.cameraZoomLevel);
  //  this.activeScene.velocityChange = 5;  // <= example of changing active scene from the overlay scene
    
    this.events.emit('newActiveScene', this.activeScene);
 
}

//customEmit(eventName, eventData) {
customEmit(eventName) {
  this.eventEmitter.emit(eventName);
  // this.eventEmitter.emit(eventName, eventData);
}

  
  update() {

  }
}


