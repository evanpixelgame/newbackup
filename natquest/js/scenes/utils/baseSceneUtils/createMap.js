export function createMap(scene, mapKey) { //mapkey argument is where you input which map is loaded based on key in preloader scene
    const map = scene.make.tilemap({ key: mapKey });
    // Load tileset
    const tilesetsData = [
      { name: 'tilesheetTerrain', key: 'tilesheetTerrain' },
      { name: 'tilesheetInterior', key: 'tilesheetInterior' },
      { name: 'tilesheetBuildings', key: 'tilesheetBuildings' },
      { name: 'tilesheetWalls', key: 'tilesheetWalls' },
      { name: 'tilesheetObjects', key: 'tilesheetObjects' },
      { name: 'tilesheetFlourishes', key: 'tilesheetFlourishes' }
    ];

    const tilesets = [];
    tilesetsData.forEach(tilesetData => {
      tilesets.push(map.addTilesetImage(tilesetData.name, tilesetData.key));
    });

    // Create layers using all tilesets
    const layers = [];
    for (let i = 0; i < map.layers.length; i++) {
      layers.push(map.createLayer(i, tilesets, 0, 0));
    }
   
    return map;
}

export function createMapBoundary(scene, map, world) {
    const boundaryOffset = 2; // increase value to decrease how close player can get to map edge
const worldBounds = new Phaser.Geom.Rectangle(
  boundaryOffset, // Offset from left edge
  boundaryOffset, // Offset from top edge
  scene.map.widthInPixels - 2 * boundaryOffset, // Width based on map size
  scene.map.heightInPixels - 2 * boundaryOffset // Height based on map size
);
     scene.matter.world.setBounds(0, 0, worldBounds.width, worldBounds.height);
    return worldBounds;
}
