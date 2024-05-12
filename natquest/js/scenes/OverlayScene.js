import { createFullscreenIcon } from './utils/overlayUtils/fullscreen.js';
import { createZoomIcons } from './utils/overlayUtils/zoom.js';
import { resizeGame, setupResizeListener } from './utils/overlayUtils/resizer.js';
import { createHealthBar } from './utils/overlayUtils/healthBar.js';
import Inventory from './utils/overlayUtils/inventory/inventory.js';
import createInventoryIcon from './utils/overlayUtils/inventory/inventoryUtils/createInventoryIcon.js';
import itemsListFull from './utils/overlayUtils/inventory/items/items.js';
import customEmitter from '../main.js';

export default class OverlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'OverlayScene' })
    }

    init(data) {
        this.activeScene = null;
        this.playerMaxHealth = 150;
        this.playerHealth = this.playerMaxHealth;
    }

    preload() {
    }

    create() {

        this.updateActiveScene('OpenWorld'); //Put the key of whatever the initial scene is as the argument here to initialize it

        //in collision handlers, custom emitter passes new scene key when transitioning scenes, this subscribes to that emitter
        customEmitter.on('activeSceneChanged', (newSceneKey) => {
            this.updateActiveScene(newSceneKey);
        });

        this.fullscreenIcon = createFullscreenIcon(this); //fullscreen icon, positioned in top right corner of viewport

        this.zoomIcons = createZoomIcons(this); // positioned directly to left of fullscreen icon, at about 3/4 viewport 

        this.healthBar = createHealthBar(this);

        this.resizer = setupResizeListener(this);

        const healthChangeHandler = (healthChange) => {
            this.healthBarDepletion.tweenHeight(healthChange * -1); //now should make it so that neg input = neg health
        };

        customEmitter.on('healthChange', healthChangeHandler);

        // *********************************************************************************
        //*********************************************************************************
        //*********************************************************************************


        this.inventory = new Inventory(this);

        this.inventory.createInventoryContainer(this);

        this.inventoryIcon = createInventoryIcon(this);

      //   this.inventory.createItemIconContainers(this);


        this.inventory.addItem(itemsListFull.healthPotionWeak);
        this.inventory.addItem(itemsListFull.poisonPotionWeak);
        this.inventory.addItem(itemsListFull.manaPotionWeak);
        this.inventory.addItem(itemsListFull.emeraldRing);
        this.inventory.addItem(itemsListFull.wealthPotion);

        console.log('consoling emerald ring and titi is beautiful :' + this.inventory.items[0].parent);
        console.log(this.inventory.items);
        console.log(this.inventoryContainer.itemSlotContainers);
        console.log(this.inventoryContainer.itemIconContainers);

        this.inventory.addItemToContainer(this, itemsListFull.emeraldRing);
        this.inventory.addItemToContainer(this, itemsListFull.manaPotionWeak);
        this.inventory.addItemToContainer(this, itemsListFull.healthPotionWeak);
        this.inventory.addItemToContainer(this, itemsListFull.poisonPotionWeak);
        this.inventory.addItemToContainer(this, itemsListFull.wealthPotion);

     //   this.inventory.initializeInventoryItems(this);
       // this.inventory.initializeDragAndDrop(this);
    console.log(this.inventoryContainer);
    console.log(this.inventoryContainer.items);
    }




    updateActiveScene = (newSceneKey) => {
        this.scene.bringToTop('OverlayScene');
        console.log('updateActiveScene method activating');
        console.log(this);
        let newScene = newSceneKey;
        this.scene.manager.scenes.forEach(scene => {
            if (scene.scene.key === newScene) {
                this.activeScene = scene;
                console.log('got new active scene ' + this.activeScene.scene.key + this.activeScene);
            }
        });
    }


    update() {

    }
}
