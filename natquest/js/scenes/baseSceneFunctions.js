export function createKeyboardAssignments(scene) {
    scene.cursors = scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
}

export function updatePlayerMovement(player, velocityChange) {

  if (!this.player) return; // Guard clause
    //   console.log(this.player);
    // Ensure we're accessing the Matter.js body directly
    const playerBody = this.player.body;

    // Define a constant velocity value
   // const velocity = this.player.velocityChange; // This might need adjustment based on your scale
const velocity = this.velocityChange;


    // Initialize velocity changes to 0
    let velocityX = 0;
    let velocityY = 0;

    if (this.cursors.left.isDown) {
      velocityX = -velocity; // Move left
      //     this.player.anims.play('walking-left', true);
    } else if (this.cursors.right.isDown) {
      velocityX = velocity; // Move right
      //       this.player.anims.play('walking-right', true);

    }

    if (this.cursors.up.isDown) {
      velocityY = -velocity; // Move up
      //   this.player.anims.play('walking-down', true);
    } else if (this.cursors.down.isDown) {
      velocityY = velocity; // Move down
      //  this.player.anims.play('walking-up', true);
    }

    // Set the player's velocity directly
    // Ensure we're working with the Matter body, which might require adjusting how you access the player's body
    //  Matter.Body.setVelocity(playerBody, { x: velocityX, y: velocityY });
    if (this.player && this.player.body) {
      Matter.Body.setVelocity(this.player.body, { x: velocityX, y: velocityY });
    }

    // Optional: Reset to zero velocity if no key is pressed
    if (this.player && this.player.body) {
      if (!this.cursors.left.isDown && !this.cursors.right.isDown && !this.cursors.up.isDown && !this.cursors.down.isDown) {
        Matter.Body.setVelocity(playerBody, { x: 0, y: 0 });
        //    this.player.anims.stop();
      }
    }

    if (velocityX !== 0 || velocityY !== 0) {
      if (velocityX > 0) {
        this.player.anims.play('walking-right', true);
      } else if (velocityX < 0) {
        this.player.anims.play('walking-left', true);
      } else if (velocityY < 0) {
        this.player.anims.play('walking-down', true);
      } else if (velocityY > 0) {
        this.player.anims.play('walking-up', true);
      }
    } else {
      // Stop animation when no movement
      this.player.anims.stop();
    }
    this.player.setRotation(0);
  
}

export function createPlayerAnimations() { //maybe scene and/or player needed for arguments?

  this.anims.create({
      key: 'walking-up',
      frames: this.anims.generateFrameNames('player', {
        frames: [
          130, 131, 132, 133, 134, 135, 136, 137, 138
        ]
      }),
      yoyo: false,
      frameRate: 12,
      repeat: -1
    });

    this.anims.create({
      key: 'walking-left',
      frames: this.anims.generateFrameNames('player', {
        frames: [
          117, 118, 119, 120, 121, 122, 123, 124, 125
        ]
      }),
      yoyo: false,
      frameRate: 12,
      repeat: -1
    });

    this.anims.create({
      key: 'walking-down',
      frames: this.anims.generateFrameNames('player', {
        frames: [
          104, 105, 106, 107, 108, 109, 110, 111, 112
        ]
      }),
      yoyo: false,
      frameRate: 12,
      repeat: -1
    });

    this.anims.create({
      key: 'walking-right',
      frames: this.anims.generateFrameNames('player', {
        frames: [
          143, 144, 145, 146, 147, 148, 149, 150, 151
        ]
      }),
      yoyo: false,
      frameRate: 12,
      repeat: -1
    });
}
