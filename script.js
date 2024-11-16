import * as THREE from 'https://unpkg.com/three@latest/build/three.module.js';

// Global Variables
let scene, camera, renderer, controls, clock;
let planets = [];
let speed = 1;
let paused = false;

// Initialize Scene, Camera, and Renderer
function init() {
    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 100;

    // Renderer
    renderer = new THREE.WebGLRenderer({
        canvas: document.createElement('canvas'),
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('solarSystem').appendChild(renderer.domElement);

    // Add Ambient Light
    scene.add(new THREE.AmbientLight(0x333333));

    // Create Sun
    const sunGeometry = new THREE.SphereGeometry(5, 60, 60);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xFF9900 });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // Create Planets
    const planetsData = [
        { name: 'Mercury', distance: 10, size: 0.5, color: 0x666666, orbitSpeed: 0.02, rotationSpeed: 0.001 },
        { name: 'Venus', distance: 20, size: 1.2, color: 0xFFFFFF, orbitSpeed: 0.018, rotationSpeed: 0.0008 },
        { name: 'Earth', distance: 30, size: 1.5, color: 0x0000FF, orbitSpeed: 0.015, rotationSpeed: 0.0005 },
        { name: 'Mars', distance: 40, size: 1, color: 0xFF0000, orbitSpeed: 0.012, rotationSpeed: 0.0003 },
        // Add more planets here...
        { name: 'Jupiter', distance: 50, size: 3, color: 0xFF9900, orbitSpeed: 0.009, rotationSpeed: 0.0002 },
        { name: 'Saturn', distance: 60, size: 2.5, color: 0xFFFF00, orbitSpeed: 0.007, rotationSpeed: 0.00015 },
        { name: 'Uranus', distance: 70, size: 2, color: 0x00FFFF, orbitSpeed: 0.005, rotationSpeed: 0.0001 },
        { name: 'Neptune', distance: 80, size: 1.8, color: 0x0000FF, orbitSpeed: 0.003, rotationSpeed: 0.00005 },
    ];

    planetsData.forEach((planet, index) => {
        const geometry = new THREE.SphereGeometry(planet.size, 60, 60);
        const material = new THREE.MeshBasicMaterial({ color: planet.color });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = planet.distance;
        scene.add(mesh);
        planets.push({ mesh, orbitSpeed: planet.orbitSpeed, rotationSpeed: planet.rotationSpeed, angle: 0 });
    });

    // Controls
    document.getElementById('speedInput').addEventListener('input', (e) => {
        speed = parseFloat(e.target.value);
    });

    document.getElementById('pauseButton').addEventListener('click', () => {
        paused = !paused;
    });

    document.getElementById('resetButton').addEventListener('click', () => {
        planets.forEach((planet) => {
            planet.mesh.position.x = planet.distance;
            planet.angle = 0;
        });
        paused = false;
        speed = 1;
        document.getElementById('speedInput').value = speed;
    });

    // Clock
    clock = new THREE.Clock();
}

// Animate Scene
function animate() {
    requestAnimationFrame(animate);
    if (!paused) {
        const elapsedTime = clock.getElapsedTime() * speed;
        planets.forEach((planet) => {
            planet.angle += planet.orbitSpeed;
            planet.mesh.position.x = planet.distance * Math.cos(planet.angle);
            planet.mesh.position.z = planet.distance * Math.sin(planet.angle);
            planet.mesh.rotation.y += planet.rotationSpeed;
        });
    }
    renderer.render(scene, camera);
}

// Initialize and Animate
init();
animate();
// Window Resize Handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Optional: Adjust camera position to maintain optimal view
    camera.position.z = window.innerHeight / 2;
});

