import BaseScene from '../BaseScene.js';
import { sensorHandler } from '../utils/collisionHandlers/openWorldCollisionHandler.js';
import OverlayScene from '../OverlayScene.js';

export default class OpenWorld extends BaseScene {
    constructor() {
        super('OpenWorld');
    }

    init(data) {
        super.init();
        this.mapKey = 'map';
        this.velocityChange = 2;
        this.startPosX = 495;
        this.startPosY = 325;
        this.playerPosX = 495;
        this.playerPosY = 325;
        this.cameraZoomLevel = 2;
    }

    preload() {
    }

    create() {
        super.create();
        this.sensorHandling = sensorHandler(this, this.map, this.player);
        this.scene.add('OverlayScene', OverlayScene);
        this.scene.launch('OverlayScene');
    }

    update(time, delta) {
        super.update(time, delta);
    }
}
