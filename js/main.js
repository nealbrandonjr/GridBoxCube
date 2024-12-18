console.log("main.js has been loaded!");


/***** Import necessary modules *****/
import { createGridboxCube, createStararea, toggleScene } from './sceneHelpers.js';
import { onTouchStart, onMouseWheel, onGestureStart, onGestureChange } from './eventHandlers.js';
import { logToConsole } from './utility.js';

/***** Global Variables *****/

// Core THREE.js components
let scene, camera, renderer, controls;

// Groups and objects for different scenes
let gridboxcubeGroup, stararea;

// Flags and state variables
let isStararea = false; // Indicate current scene (gridboxcube or star simulation)
let isWhiteBackground = true; // Track current background color

// Variables for double-tap detection
let lastTapTime = 0;

// Variables for gesture zoom on mobile devices
let initialFov;

// Stars object for star simulation
let stars;

/***** Initialization Function *****/
/**
 * Initialize scene, camera, renderer, controls, and event listeners.
 */
function init() {
    logToConsole('Initializing scene...');
	
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFFFFFF); // White background
	
	console.log('Scene initialized:', scene); // Debug scene

    // Set up camera
    camera = new THREE.PerspectiveCamera(
        75, // Field of view
        window.innerWidth / window.innerHeight, // Aspect ratio
        0.1, // Near clipping plane
        20000 // Far clipping plane
    );
    camera.position.set(0, 100, 1000); // Position camera to view gridboxcube

    // Set up the renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Set up orbit controls for interactive camera manipulation
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0); // Look at center of scene
    controls.enablePan = false; // Disable panning to restrict movement
    controls.enableDamping = true; // Enable smooth transitions
    controls.dampingFactor = 0.05; // Damping factor for inertia
    controls.enableZoom = false; // Disable zoom initially
    controls.update();

    // Create gridboxcube and star area
    createGridboxCube(scene);
    createStararea(scene);

    // Add gesture and interaction event listeners
	renderer.domElement.addEventListener('touchstart', (event) => onTouchStart(event, scene, camera, controls)); // Mobile double-tap
	renderer.domElement.addEventListener('dblclick', () => toggleScene(scene, camera, controls)); // Desktop double-click
	renderer.domElement.addEventListener('wheel', onMouseWheel); // Zoom with mouse wheel
	renderer.domElement.addEventListener('gesturestart', onGestureStart); // Pinch zoom start
	renderer.domElement.addEventListener('gesturechange', onGestureChange); // Pinch zoom change
	renderer.domElement.addEventListener('gestureend', () => {
		logToConsole("Gesture End Detected");
	});

	// Start animation loop
	animate();

    logToConsole('Scene initialized.');
}

/***** Animation Loop *****/
/**
 * Main animation loop, called on each frame.
 */
function animate() {
    requestAnimationFrame(animate); // Request next frame
    controls.update(); // Update controls (e.g., for damping)
    renderer.render(scene, camera); // Render current scene
}

/***** Window Resize Handler *****/

        // Adjust camera and renderer on window resize
        window.addEventListener('resize', function () {
            // Update camera aspect ratio
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            // Update renderer size
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

// Initialize application
init();
