export function createCameraConstraints(scene, map, player) {
    scene.cameras.main.setBounds(0, 0, scene.map.widthInPixels, scene.map.heightInPixels);
    scene.cameras.main.startFollow(scene.player, true, 0.05, 0.05);
    scene.cameras.main.setZoom(2);
}
