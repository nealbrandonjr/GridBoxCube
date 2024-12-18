# 3D GridBoxCube with Star Simulation v1.8.1

## Author
**Version:** 1.8.1  
**Author:** Neal Brandon Jr  
**Website:** [www.nealsdevsite.com](https://www.nealsdevsite.com)

## Purpose
**GridBoxCube** is an interactive 3D rendering for educational and entertainment purposes. It includes:
- A 3D cube environment with dynamic grid lines on all faces.
- A space simulation with thousands of stars, rendered in real-time.
- An interactive platform for demonstrating 3D graphics and simulation capabilities.

## Features
- **Dynamic Scenes**:
  - **GridBoxCube Scene**: A 3D cube with grid lines on all six faces.
  - **Star Simulation Scene**: A universe filled with randomly positioned, dynamic stars.
- **Seamless Scene Switching**:
  - Double-click or double-tap to toggle between scenes.
- **Interactive Camera Controls**:
  - Rotate the camera using the mouse or touch gestures.
  - Zoom in and out in the Star Simulation scene.
- **On-Screen Console**:
  - Provides real-time feedback on user interactions.
- **Responsive Design**:
  - Automatically adjusts to the browser's window size.

## Technologies Used
- **HTML5**: Base structure of the application.
- **CSS3**: Styling for layout and interface.
- **JavaScript**: Handles scene logic and interactions.
- **Three.js**: For rendering and managing 3D graphics.

## How to Use
### Requirements
- A modern web browser that supports WebGL (e.g., Chrome, Firefox, Edge).

### Steps
1. Download or clone this repository.

2. Due to CORS restrictions and the use of JavaScript modules, these files cannot be run directly as local files.
- To run this application, you need to use one of the following methods: 

Option 1: Run with a Local Server

- Use a lightweight local server such as:

-- Python: Run python -m http.server in the project directory and access the app via http://localhost:8000.

-- Node.js: Use tools like http-server or live-server.

-- XAMPP/WAMP: Place the project files in the server's root directory and access the app via your browser.

Option 2: Deploy to a Web Server

- Upload the project files to a web hosting service.

Option 3: Use a CORS Proxy

- If you cannot use a server or hosting service, consider using a CORS proxy to bypass CORS restrictions.
-- However, this is not recommended for production due to potential security and performance concerns.

3. Open the `index.html` file in a browser.
4. Use the following controls:
   - **Mouse or Touch**:
     - Drag to rotate the camera.
     - Use the mouse wheel or pinch to zoom (Star Simulation scene only).
   - **Double-Click/Double-Tap**:
     - Switch between GridBoxCube and Star Simulation scenes.
5. Toggle the on-screen console to view real-time logs.

## License
This project is licensed under the MIT License.  
For details, visit the [LICENSE](LICENSE) file or the [MIT License page](https://opensource.org/licenses/MIT).

### Attribution
If you use this project, please credit:  
[www.nealsdevsite.com](https://www.nealsdevsite.com)

## Contribution
Contributions are welcome! Fork this repository and submit a pull request or suggest fixes.

## Contact
For inquiries or support, visit [www.nealsdevsite.com](https://www.nealsdevsite.com).

## Version
**v1.8.1**
