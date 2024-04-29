import BaseScene from '../BaseScene.js';
import { sensorHandler } from '../utils/collisionHandlers/newSceneCollisionHandler.js';

export default class NewScene extends BaseScene {
    constructor() {
        super('NewScene');
    }

    init(data) {
        // Initialize scene properties from the data passed from the previous scene
        super.init();
        this.mapKey = 'insidemap';
        // this.player = data.player;
        this.velocityChange = 2;
        this.startPosX = 970;
        this.startPosY = 665;
        this.playerPosX = 970;
        this.playerPosY = 665;
        this.cameraZoomLevel = 2;
        console.log('Player received in NewScene:', this.player);
    }

    preload() {
    }

    create() {
        super.create();
        this.sensorHandling = sensorHandler(this, this.map, this.player);
    }

    update(time, delta) {
        super.update(time, delta);
    }
}
