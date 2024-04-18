import BaseScene from '../BaseScene.js';

 export default class OpenWorld extends BaseScene {
  constructor() {
   super('OpenWorld');
  }

  init(data) {
    // Initialize scene properties from the data passed from the previous scene
    super.init();
    this.mapKey = 'map';
  //  this.player = data.player || null;
    this.velocityChange = 2;
    this.startPosX = 495;
    this.startPosY = 325;
    this.playerPosX = 495;
    this.playerPosY = 325;
    this.cameraZoomLevel = 2;
    console.log('Player received in OpenWorld:', this.player);
  }

  preload() {
  }

  create() {
   super.create();
  }

  update(time, delta) {
   super.update(time, delta);
    // Update logic for the scene, if necessary
  }
}
