import BaseScene from '../BaseScene.js';

 export default class NewScene extends BaseScene {
  constructor() {
   super('NewScene');
   // super({ key: 'NewScene' });
  // this.scene.key = 'NewScene';
  }

  init(data) {
    // Initialize scene properties from the data passed from the previous scene
    super.init();
    this.mapKey = 'insidemap'; 
    console.log('Player received in NewScene:', this.player);
  }

  preload() {
  }

  create() {
   super.create();
  }

  update(time, delta) {
   super.create(time, delta);
    // Update logic for the scene, if necessary
  }
}
