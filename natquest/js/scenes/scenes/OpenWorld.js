import BaseScene from '../BaseScene.js';
//import NewScene from './NewScene.js';
import { sensorHandler } from '../collisionHandlers/openWorldCollisionHandler.js';

 export default class OpenWorld extends BaseScene {
  constructor() {
   super('OpenWorld');
  }

  init(data) {
    // Initialize scene properties from the data passed from the previous scene
    super.init();
    this.mapKey = 'map';
    //this.player = data.player;
    this.velocityChange = 2;
    this.startPosX = 495;
    this.startPosY = 325;
    this.playerPosX = 495;
     this.playerPosY = 325;
    this.cameraZoomLevel = 3;
    console.log('Player received in NextRoom:', this.player);
  }

  preload() {
  }

  create() {
   super.create();
   this.sensorHandling = sensorHandler(this, this.map, this.player);
 //  console.log(this.cameras.main.id);
   // console.log(this.overlayCamera.id);
  }

  update(time, delta) {
   super.update(time, delta);
    // Update logic for the scene, if necessary
  }
}
