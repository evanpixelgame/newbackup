export function createHealthBar(scene) {
  

    scene.healthBarBackground = scene.add.rectangle(
    ((window.innerWidth / 4) / 2 / 2) - 5,  // X coordinate relative to the viewport
        ((window.innerHeight / 4) / 2 / 2),  // Y coordinate relative to the viewport
        60,  // Width of the object
        320,  // Height of the object
        0x000000  // Color of the object
    );
        scene.healthBarBackground.setScrollFactor(0, 0);
        scene.healthBarBackground.setDepth(100000);

    

    scene.healthBar = scene.add.rectangle(
    (window.innerWidth / 4) / 2 / 2,  // X coordinate relative to the viewport
    (window.innerHeight / 4) / 2 / 2,  // Y coordinate relative to the viewport
    50,  // Width of the object
    10,  // Height of the object
    0xff0000  // Color of the object (red)
);
    scene.healthBar.setScrollFactor(0, 0);
    scene.healthBar.setDepth(100001);

    scene.healthBarDepletion = scene.add.rectangle(
        (window.innerWidth / 4) / 2 / 2,  // X coordinate relative to the viewport
        (window.innerHeight / 4) / 2 / 2,  // Y coordinate relative to the viewport
        50,  // Width of the object
        300,  // Height of the object
        0xffffff  // Color of the object (red)
    );
        scene.healthBarDepletion.setScrollFactor(0, 0);
        scene.healthBarDepletion.setDepth(100002);

}
