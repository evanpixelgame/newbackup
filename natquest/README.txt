// Creates collision objects and sensor objects, and assigns the sensor objects a property name/value of their customID
// The scene's collisionHandler will then use those IDs to make switch cases and the logic for them there
// Import as needed into scenes that have 2.5D maps that require collision/sensor object creation and handling
// Make sure that all imported maps have their Object layer that deals with colliding with barriers/walls is named "Collision Layer 1"
// MKW sure all imported maps have their Object layer that deals with collisions with custom sensors is named "Sensor Layer 1"
// Make sure all custom objects in the Tiled 'Sensor Layer 1' object layer have custom property name of customID
// MKW sure all imported maps have their Object layer that deals with clicking with custom sensors is named "Click Layer 1"
// Make sure all custom objects in the Tiled 'Click Layer 1' object layer have custom property name of customID
// Make sure the values of the custom property names are descriptive and able to be used easily for switch cases

// INSTRUCTIONS FOR HOW TO CREATED A TILED MAP OBJECT LAYER THAT WORKS WITH THIS CODE:
//******************************************************************************************
// In Tiled map editing software, make a new orthogonal map, choose to embed Tilesets, choose Tile size of 32x32, can change to 64x64 or other, but will need to adjust parameters for code parsing the json to construct map
// For collision objects, create an object layer named 'Collision Layer 1' and create your collision object shapes
// Collision objects on 'Collision Layer 1' do not need custom property names, as all objects on that layer are treated as collisions
// For sensor objects, create an object layer named 'Sensor Layer 1' and create your sensor object shapes
// Click on properties of object shapes, click add properties
// If the shape is for a sensor that works with on collision event, click on object and see expanded info
// Add custom property to shape. Give the custom propety a name of customID
// Then give customID a value of a descriptive, unique title ie. OpenWorldToInsideRoom
// Sometimes the objects can have the same ID for the same effect
// ie. multiple objects could have property name customID with a descriptive value, ex. 'TakeFiveDamage'
// Now any tile with that label will do the same thing based on the handler switch case
// If the sensor is supposed to activate based on an Overlap event make sure to give it a collisionend case in addition to collisionstart case in the handler
// By combining collision start code and then collision end code that undos the previous code makes it work like an overlap
// ie. could use start and end collision on customID 'IceTerrain' to affect friction during overlap

