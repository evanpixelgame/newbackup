export function createPlayerAnimations(scene) { //maybe scene and/or player needed for arguments?

  scene.anims.create({
      key: 'walking-up',
      frames: scene.anims.generateFrameNames('player', {
        frames: [
          130, 131, 132, 133, 134, 135, 136, 137, 138
        ]
      }),
      yoyo: false,
      frameRate: 12,
      repeat: -1
    });

    scene.anims.create({
      key: 'walking-left',
      frames: scene.anims.generateFrameNames('player', {
        frames: [
          117, 118, 119, 120, 121, 122, 123, 124, 125
        ]
      }),
      yoyo: false,
      frameRate: 12,
      repeat: -1
    });

    scene.anims.create({
      key: 'walking-down',
      frames: scene.anims.generateFrameNames('player', {
        frames: [
          104, 105, 106, 107, 108, 109, 110, 111, 112
        ]
      }),
      yoyo: false,
      frameRate: 12,
      repeat: -1
    });

    scene.anims.create({
      key: 'walking-right',
      frames: scene.anims.generateFrameNames('player', {
        frames: [
          143, 144, 145, 146, 147, 148, 149, 150, 151
        ]
      }),
      yoyo: false,
      frameRate: 12,
      repeat: -1
    });
}
