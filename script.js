// Import necessary modules
import * as THREE from 'three';

// Global Variables
let scene, camera, renderer, controls, clock;
let planets = [];
let speed = 1;
let paused = false;

// Initialize Scene, Camera, and Renderer
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
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
    ];

    planetsData.forEach((planet, index) => {
        const geometry = new THREE.SphereGeometry(planet.size, 60, 60);
        const material = new THREE.MeshBasicMaterial({ color: planet.color });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = planet.distance;
        scene.add(mesh);
        planets.push({ mesh, orbitSpeed: planet.orbitSpeed, rotation
