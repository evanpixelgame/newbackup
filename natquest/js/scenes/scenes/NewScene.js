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
   
  }

  update(time, delta) {
    // Update logic for the scene, if necessary
  }
}
