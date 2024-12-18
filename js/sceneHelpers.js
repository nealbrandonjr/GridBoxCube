import { logToConsole } from './utility.js';

/***** Global Variables *****/
export let gridboxcubeGroup, stararea;

/**
 * Create cube-shaped gridboxcube with grids on all six faces.
 * @param {THREE.Scene} scene - main THREE.js scene object.
 */
export function createGridboxCube(scene) {
    // Group to hold all grid helpers
    gridboxcubeGroup = new THREE.Group();

    const size = 2000; // Size of each grid
    const divisions = 20; // Number of divisions in each grid

    // Create grids for each face of the cube
    const gridXY = new THREE.GridHelper(size, divisions, 0x000000, 0x000000);
    gridXY.rotation.x = Math.PI / 2; // Rotate to align with XY plane
    gridXY.position.z = -1000; // Position at back face
    gridboxcubeGroup.add(gridXY);

    const gridXZ = new THREE.GridHelper(size, divisions, 0x000000, 0x000000);
    gridXZ.position.y = -1000; // Position at bottom face
    gridboxcubeGroup.add(gridXZ);

    const gridYZ = new THREE.GridHelper(size, divisions, 0x000000, 0x000000);
    gridYZ.rotation.z = Math.PI / 2; // Rotate to align with YZ plane
    gridYZ.position.x = -1000; // Position at left face
    gridboxcubeGroup.add(gridYZ);

    // Clone grids for opposite faces
    const gridXY2 = gridXY.clone();
    gridXY2.position.z = 1000; // Front face
    gridboxcubeGroup.add(gridXY2);

    const gridXZ2 = gridXZ.clone();
    gridXZ2.position.y = 1000; // Top face
    gridboxcubeGroup.add(gridXZ2);

    const gridYZ2 = gridYZ.clone();
    gridYZ2.position.x = 1000; // Right face
    gridboxcubeGroup.add(gridYZ2);

    // Add gridboxcube group to scene
    scene.add(gridboxcubeGroup);

    logToConsole('Gridboxcube (with black grid) added to scene.');
}

/**
 * Create star area with randomly positioned stars.
 * @param {THREE.Scene} scene - main THREE.js scene object.
 */
export function createStararea(scene) {
    // Geometry to hold star positions
    const starsGeometry = new THREE.BufferGeometry();
    const starVertices = []; // Array for star positions
    const starColorsArray = []; // Array for star colors

    // Generate stars with random positions and colors
    for (let i = 0; i < 20000; i++) {
        // Random position within cube of size 3000 units
        const x = THREE.MathUtils.randFloatSpread(3000);
        const y = THREE.MathUtils.randFloatSpread(3000);
        const z = THREE.MathUtils.randFloatSpread(3000);
        starVertices.push(x, y, z);

        // Assign bright random color to each star
        const randomColor = new THREE.Color(
            Math.random() * 0.7 + 0.3,
            Math.random() * 0.7 + 0.3,
            Math.random() * 0.7 + 0.3
        );
        starColorsArray.push(randomColor.r, randomColor.g, randomColor.b);
    }

    // Set position and color attributes for stars
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    starsGeometry.setAttribute('color', new THREE.Float32BufferAttribute(starColorsArray, 3));

    // Material for star points
    const starsMaterial = new THREE.PointsMaterial({
        size: 2.5, // Size of each star
        sizeAttenuation: true, // Attenuate size with distance
        transparent: true,
        vertexColors: true, // Use per-vertex colors
        map: new THREE.TextureLoader().load('https://threejs.org/examples/textures/sprites/circle.png'), // Circular sprite
        alphaTest: 0.5 // Discard pixels with alpha less than 0.5
    });

    // Create star points and assign to the stararea
    stararea = new THREE.Points(starsGeometry, starsMaterial);

    logToConsole('Stararea created with stars.');
	console.log('Stararea created:', stararea); // Debug stararea
}

/**
 * Toggle between gridboxcube and star simulation scenes.
 * Reset camera position when switching back to gridboxcube.
 * @param {THREE.Scene} scene - main THREE.js scene object.
 * @param {THREE.Camera} camera - main THREE.js camera.
 * @param {THREE.OrbitControls} controls - Orbit controls for camera.
 */
export function toggleScene(scene, camera, controls) {
    const isStarareaActive = scene.children.includes(stararea);

    if (isStarareaActive) {
        // Switch back to gridboxcube
        scene.remove(stararea); // Remove stararea from scene
        scene.add(gridboxcubeGroup); // Add gridboxcube to scene
        controls.enableZoom = false; // Disable zoom controls

        // Reset camera position and controls
        camera.position.set(0, 100, 1000); // Reset camera position
        controls.target.set(0, 0, 0); // Reset controls target
        camera.fov = 75; // Reset field of view
        camera.updateProjectionMatrix(); // Apply changes
        controls.update(); // Update controls

        logToConsole('Switched back to gridboxcube scene. Zoom disabled and position reset.');
    } else {
        // Switch to star simulation
        scene.remove(gridboxcubeGroup); // Remove gridboxcube from scene
        scene.add(stararea); // Add stararea to scene
        controls.enableZoom = true; // Enable zoom controls

        logToConsole('Switched to stararea scene. Zoom enabled.');
    }

    // Toggle background color between white and black
    scene.background = new THREE.Color(isStarareaActive ? 0xFFFFFF : 0x000000);
    logToConsole(`Background switched to ${isStarareaActive ? 'white' : 'black'}.`);
}
