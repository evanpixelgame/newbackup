import BaseScene from './BaseScene.js'; // Import your base scene

export default class NextSceneTest extends BaseScene {
  constructor() {
    super({ key: 'CustomSceneTest' });
        this.mapKey = 'insideroom';
    // Add any additional properties specific to CustomScene
  }

  // Override any methods from BaseScene as needed

  // Add any additional methods specific to CustomScene

  create() {
    // Call the create method of the base scene
    super.create();

    // Add any additional creation logic specific to CustomScene
  }

  // Add any other lifecycle methods as needed
}
