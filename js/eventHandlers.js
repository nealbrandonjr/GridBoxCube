import { logToConsole } from './utility.js';
import { toggleScene } from './sceneHelpers.js';

/***** Event Handlers *****/

// Declare global variables specific to this file
let lastTapTime = 0;

/**
 * Handle touch events to detect double-tap for mobile devices.
 * @param {TouchEvent} event - touch event.
 * @param {THREE.Scene} scene - main THREE.js scene object.
 * @param {THREE.Camera} camera - main THREE.js camera.
 * @param {THREE.OrbitControls} controls - Orbit controls for camera.
 */
export function onTouchStart(event, scene, camera, controls) {
    // Prevent default behavior such as double-tap-to-zoom on mobile
    event.preventDefault();

    logToConsole(`Touch Start: ${event.touches.length} touch(es)`);

    if (event.touches.length === 2) {
        logToConsole('Pinch gesture detected, ignoring double-tap logic.');
        return;
    }

    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTapTime;

    // Adjust/tune double-tap detection threshold
    if (tapLength < 300 && tapLength > 0) {
        toggleScene(scene, camera, controls);
        logToConsole('Double tap detected, switching scene.');
    }

    lastTapTime = currentTime; // Update last tap time
}

/**
 * Handle start of a gesture (pinch zoom) on mobile devices.
 * @param {GestureEvent} event - gesture event.
 * @param {THREE.Camera} camera - main THREE.js camera.
 * @param {boolean} isStararea - Indicate if star simulation is active.
 */
export function onGestureStart(event, camera, isStararea) {
    if (isStararea) {
        camera.userData.initialFov = camera.fov; // Store initial FOV in user data
        event.preventDefault(); // Prevent default browser behavior
    }
}

/**
 * Handle change of gesture (pinch zoom) on mobile devices.
 * @param {GestureEvent} event - gesture event.
 * @param {THREE.Camera} camera - main THREE.js camera.
 * @param {boolean} isStararea - Indicate if star simulation is active.
 */
export function onGestureChange(event, camera, isStararea) {
    if (isStararea) {
        // Adjust camera's FOV based on gesture scale
        camera.fov = camera.userData.initialFov / event.scale;
        camera.fov = THREE.MathUtils.clamp(camera.fov, 30, 100); // Clamp FOV between 30 and 100
        camera.updateProjectionMatrix();
        logToConsole('Zoom level adjusted (mobile).');
    }
}

/**
 * Handle mouse wheel events for zooming in star simulation.
 * @param {WheelEvent} event - wheel event.
 * @param {THREE.Camera} camera - main THREE.js camera.
 * @param {boolean} isStararea - Indicate if star simulation is active.
 */
export function onMouseWheel(event, camera, isStararea) {
    if (isStararea) {
        // Adjust camera's field of view based on scroll delta
        camera.fov -= event.deltaY * 0.05;
        camera.fov = THREE.MathUtils.clamp(camera.fov, 30, 100); // Clamp FOV between 30 and 100
        camera.updateProjectionMatrix();
        logToConsole('Zoom level adjusted.');
    }
}
