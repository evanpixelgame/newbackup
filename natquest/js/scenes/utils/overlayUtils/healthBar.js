export function createHealthBar(scene) {


    scene.healthBarBackground = scene.add.rectangle(
        10,  // X coordinate relative to the viewport
        5,  // Y coordinate relative to the viewport
        70,  // Width of the object
        310,  // Height of the object
        0x000000  // Color of the object
    );
    scene.healthBarBackground.setScrollFactor(0, 0);
    //scene.healthBarBackground.setDepth(100000);
    scene.healthBarBackground.setOrigin(0, 0);



    scene.healthBar = scene.add.rectangle(
        20,  // X coordinate relative to the viewport
        5,  // Y coordinate relative to the viewport
        50,  // Width of the object
        300,  // Height of the object
        0xff0000  // Color of the object (red)
    );
    scene.healthBar.setScrollFactor(0, 0);
   // scene.healthBar.setDepth(100001);
    scene.healthBar.setOrigin(0, 0);

    scene.healthBarDepletion = scene.add.rectangle(
        20,  // X coordinate relative to the viewport
        5,  // Y coordinate relative to the viewport
        50,  // Width of the object
        10,  // Height of the object
        0xffffff  // Color of the object (red)
    );
    scene.healthBarDepletion.setScrollFactor(0, 0);
   // scene.healthBarDepletion.setDepth(100002);
    scene.healthBarDepletion.setOrigin(0, 0);

    scene.healthBarDepletion.tweenHeight = function(healthChange) {
        scene.tweens.add({
            targets: scene.healthBarDepletion,
            height: scene.healthBarDepletion.height + healthChange,
            duration: 500,
            ease: 'Linear'
        });
    };
}
    

/*

export function updateHealthBar(scene, healthChange) {

    //adding the health change, ie. make sure negative health change written as negative integer
    const updatedHealth = scene.playerHealth + healthChange; 

    // Tween the height of the health bar
    scene.tweens.add({
        targets: scene.healthBarDepletion,
        props: {
            height: updatedHealth, // Target height for the tween
          },
        duration: 500, // Duration of the tween in milliseconds
        ease: 'Linear', // Easing function
    });
}

*/