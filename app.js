import * as THREE from "three";

// mouse
const mouse = {
  x: undefined,
  y: undefined,
};
window.addEventListener("mousemove", (e) => {
  mouse.x = (e.clientX / innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / innerHeight) * 2 + 1;
});

// scene
const scene = new THREE.Scene();

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// camera
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
camera.position.set(0, 0, 2);

// geometry
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("https://as2.ftcdn.net/v2/jpg/01/99/14/99/1000_F_199149981_RG8gciij11WKAQ5nKi35Xx0ovesLCRaU.jpg"),
  })
);
// scene.add(cube); // move to group

// group
const group = new THREE.Group();
group.add(cube);
scene.add(group);

// animate
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.y += 0.01;
  group.rotation.x = mouse.y * 2;
  group.rotation.y = mouse.x * 2;
  renderer.render(scene, camera);
}
animate();

// resize
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onWindowResize);

