import OpenWorld from './OpenWorld.js';

 export class NewScene extends OpenWorld {
  constructor() {
    super({ key: 'NewScene' });
    
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
    // Use the existing Matter.js engine and world from the OpenWorld scene
   // this.engine = this.scene.get('OpenWorld').engine;
   // this.world = this.scene.get('OpenWorld').world;
  }

  update(time, delta) {
    // Update logic for the scene, if necessary
  }
}
