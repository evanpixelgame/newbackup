export function createKeyboardAssignments(scene) {
    scene.cursors = scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
}

export function createMobileControls(scene) {
  const posX = 80; //window.innerWidth; //scene.game.config.width / 5;
    const posY = window.innerHeight - 80;

    const base = scene.add.image(0, 0, scene.textures.get('base'));
    const thumb = scene.add.image(0, 0, scene.textures.get('thumb'));

    // Set the scale for base and thumb images
    base.setScale(0.5); // Adjust the scale as needed
    thumb.setScale(0.5);

    scene.joyStick = scene.plugins.get('rexvirtualjoystickplugin').add(scene, {
      x: posX,
      y: posY,
      radius: 50,
      base: base,
      thumb: thumb,
      // dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
      // forceMin: 16,
      // enable: true
    })
      .on('update', scene.dumpJoyStickState, scene);

    scene.text = scene.add.text(0, 0);
    dumpJoyStickState();

      if (window.orientation === 0 || window.orientation === 180) {
        // Portrait mode alert
        alert("Please switch to landscape mode for the best experience.");
      }
    
      function dumpJoyStickState() {
    const cursorKeys = scene.joyStick.createCursorKeys();
    let s = 'Key down: ';
    for (let name in cursorKeys) {
      if (cursorKeys[name].isDown) {
        s += `${name} `;
      }
    }

    s += `
Force: ${Math.floor(scene.joyStick.force * 100) / 100}
Angle: ${Math.floor(scene.joyStick.angle * 100) / 100}
`;

    s += '\nTimestamp:\n';
    for (let name in cursorKeys) {
      let key = cursorKeys[name];
      s += `${name}: duration=${key.duration / 1000}\n`;
    }
    // scene.text.setText(s); // <================diagnostic test data
  }
  }
