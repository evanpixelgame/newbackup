export function updatePlayerMovement(scene, player, velocityChange) {

  if (!scene.player) return; // Guard clause
    //   console.log(scene.player);
    // Ensure we're accessing the Matter.js body directly
    const playerBody = scene.player.body;

    // Define a constant velocity value
   // const velocity = scene.player.velocityChange; // scene might need adjustment based on your scale
const velocity = scene.velocityChange;


    // Initialize velocity changes to 0
    let velocityX = 0;
    let velocityY = 0;

    if (scene.cursors.left.isDown) {
      velocityX = -velocity; // Move left
      //     scene.player.anims.play('walking-left', true);
    } else if (scene.cursors.right.isDown) {
      velocityX = velocity; // Move right
      //       scene.player.anims.play('walking-right', true);

    }

    if (scene.cursors.up.isDown) {
      velocityY = -velocity; // Move up
      //   scene.player.anims.play('walking-down', true);
    } else if (scene.cursors.down.isDown) {
      velocityY = velocity; // Move down
      //  scene.player.anims.play('walking-up', true);
    }

    // Set the player's velocity directly
    // Ensure we're working with the Matter body, which might require adjusting how you access the player's body
    //  Matter.Body.setVelocity(playerBody, { x: velocityX, y: velocityY });
    if (scene.player && scene.player.body) {
      Matter.Body.setVelocity(scene.player.body, { x: velocityX, y: velocityY });
    }

    // Optional: Reset to zero velocity if no key is pressed
    if (scene.player && scene.player.body) {
      if (!scene.cursors.left.isDown && !scene.cursors.right.isDown && !scene.cursors.up.isDown && !scene.cursors.down.isDown) {
        Matter.Body.setVelocity(playerBody, { x: 0, y: 0 });
        //    scene.player.anims.stop();
      }
    }

    if (velocityX !== 0 || velocityY !== 0) {
      if (velocityX > 0) {
        scene.player.anims.play('walking-right', true);
      } else if (velocityX < 0) {
        scene.player.anims.play('walking-left', true);
      } else if (velocityY < 0) {
        scene.player.anims.play('walking-down', true);
      } else if (velocityY > 0) {
        scene.player.anims.play('walking-up', true);
      }
    } else {
      // Stop animation when no movement
      scene.player.anims.stop();
    }
    scene.player.setRotation(0);
  
}
