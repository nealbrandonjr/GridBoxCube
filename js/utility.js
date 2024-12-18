/**
 * Append message to on-screen console.
 * @param {string} message - Message to display.
 */
export function logToConsole(message) {
    const consoleDiv = document.getElementById('console');
    if (consoleDiv) {
        consoleDiv.innerHTML += `${message}<br/>`;
        consoleDiv.scrollTop = consoleDiv.scrollHeight; // Auto-scroll to bottom
    }
}

/**
 * Toggle visibility of on-screen console.
 */
export function toggleConsole() {
    const consoleDiv = document.getElementById('console');
    const consoleFrame = document.getElementById('consoleFrame');

    if (consoleDiv && consoleFrame) {
        if (consoleDiv.style.display === 'block') {
            // Collapse console
            consoleDiv.style.display = 'none';
            consoleFrame.style.height = '40px';
        } else {
            // Expand console
            consoleDiv.style.display = 'block';
            consoleFrame.style.height = '240px';
        }
    }
}

// Make it globally accessible
window.toggleConsole = toggleConsole;