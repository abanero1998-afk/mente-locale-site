(() => {
  const canvas = document.getElementById("webgl");
  if (!canvas || !window.THREE) return;
  const THREE = window.THREE;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 200);
  camera.position.set(0, 0, 28);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);
  renderer.setClearColor(0x000000, 0);
  const COUNT = 180;
  const RANGE = 26;
  const positions = new Float32Array(COUNT * 3);
  const velocities = [];
  for (let i = 0; i < COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * RANGE * 1.6;
    positions[i * 3 + 1] = (Math.random() - 0.5) * RANGE;
    positions[i * 3 + 2] = (Math.random() - 0.5) * RANGE * 0.9;
    velocities.push({ x: (Math.random() - 0.5) * 0.012, y: (Math.random() - 0.5) * 0.01, z: (Math.random() - 0.5) * 0.01 });
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const points = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.18, color: 0x67e8f9, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false }));
  scene.add(points);
  const ico = new THREE.Mesh(new THREE.IcosahedronGeometry(4.2, 1), new THREE.MeshBasicMaterial({ color: 0x22d3ee, wireframe: true, transparent: true, opacity: 0.18 }));
  scene.add(ico);
  function animate() {
    requestAnimationFrame(animate);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] += velocities[i].x;
      positions[i * 3 + 1] += velocities[i].y;
      positions[i * 3 + 2] += velocities[i].z;
      if (Math.abs(positions[i * 3]) > RANGE) velocities[i].x *= -1;
      if (Math.abs(positions[i * 3 + 1]) > RANGE * 0.7) velocities[i].y *= -1;
    }
    pGeo.attributes.position.needsUpdate = true;
    ico.rotation.y += 0.004;
    renderer.render(scene, camera);
  }
  animate();
  window.addEventListener("resize", () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); });
})();
