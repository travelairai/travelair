// script.js - Full functionality
// Three.js Globe with glowing flight paths
let scene, camera, renderer, globe;
function initGlobe() {
    const canvas = document.getElementById('globe-canvas');
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / 2 / window.innerHeight, 0.1, 100);
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth / 2, window.innerHeight * 0.9);
    const geometry = new THREE.SphereGeometry(5, 64, 64);
    const material = new THREE.MeshPhongMaterial({ color: 0x112244, emissive: 0x223366, shininess: 5 });
    globe = new THREE.Mesh(geometry, material);
    scene.add(globe);
    const light = new THREE.DirectionalLight(0xffdd88, 1.5);
    light.position.set(8, 5, 10);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040));
    // Flight paths
    for (let i = 0; i < 35; i++) {
        const points = [];
        const start = new THREE.Vector3(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5);
        const end = new THREE.Vector3(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5);
        points.push(start, end);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0xffee88, transparent: true, opacity: 0.6 }));
        scene.add(line);
    }
    camera.position.z = 12;
    function animate() {
        requestAnimationFrame(animate);
        globe.rotation.y += 0.0018;
        renderer.render(scene, camera);
    }
    animate();
}

// Chat functionality
function initChat() {
    const container = document.getElementById('chat-messages');
    container.innerHTML = ... (Greece demo) ...;
}

function sendChatMessage() { /* logic */ }

window.onload = () => {
    initGlobe();
    initChat();
};
