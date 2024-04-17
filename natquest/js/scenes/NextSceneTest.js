import BaseScene from './BaseScene.js'; // Import your base scene

export default class NextSceneTest extends BaseScene {
  constructor() {
    super({ key: 'NextSceneTest' });

        //this.NextSceneTestLaunched = true;
        //this.mapKey = 'insidemap';
        //this.startPosX = null;
        //this.startPosY = null;
    // Add any additional properties specific to CustomScene
  }

  // Override any methods from BaseScene as needed
  init(data) {
    // Call the init method of the base scene to inherit its behavior

    // Customize starting position and map for CustomScene
 //   this.startPosX = data.startPosX || 970; // Example different starting X position
  //  this.startPosY = data.startPosY || 664; // Example different starting Y position
   // this.mapKey = data.mapKey || 'customMap'; // Example different map key
  }
  
  // Add any additional methods specific to CustomScene

  create() {
    console.log('made it to next room fucking pierre');
    // Call the create method of the base scene

    // Add any additional creation logic specific to CustomScene
  }

  // Add any other lifecycle methods as needed
}
