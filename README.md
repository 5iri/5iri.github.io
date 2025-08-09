---
layout: content
title: Shri
permalink: /
nav_order: 1
---

# Welcome

I'm Shri — I build hardware, chase math, and ship things.

<div id="hero3d" style="width:100%;height:360px;border:1px solid #333;border-radius:8px;background:#0a0a0a;margin:2rem 0;"></div>

<script src="https://unpkg.com/three@0.160.0/build/three.min.js"></script>
<script>
(function(){
  const el = document.getElementById('hero3d');
  const w = el.clientWidth, h = el.clientHeight;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, w/h, 0.1, 100);
  camera.position.set(0, 0.5, 3.0);

  const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
  renderer.setSize(w, h); 
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio||1));
  el.appendChild(renderer.domElement);

  // FPGA Board with components
  const fpgaGroup = new THREE.Group();
  scene.add(fpgaGroup);

  // Main PCB substrate (green)
  const pcbGeo = new THREE.BoxGeometry(3.0, 0.08, 2.2);
  const pcbMat = new THREE.MeshStandardMaterial({ 
    color: 0x1a4a1a, 
    metalness: 0.3, 
    roughness: 0.7,
    emissive: 0x0a1a0a,
    emissiveIntensity: 0.2
  });
  const pcb = new THREE.Mesh(pcbGeo, pcbMat);
  fpgaGroup.add(pcb);

  // Main FPGA chip (center, large)
  const fpgaGeo = new THREE.BoxGeometry(1.2, 0.12, 1.2);
  const fpgaMat = new THREE.MeshStandardMaterial({ 
    color: 0x2a2a2f, 
    metalness: 0.8, 
    roughness: 0.2,
    emissive: 0x1a1a2f,
    emissiveIntensity: 0.4
  });
  const fpgaChip = new THREE.Mesh(fpgaGeo, fpgaMat);
  fpgaChip.position.set(0, 0.1, 0);
  fpgaGroup.add(fpgaChip);

  // FPGA pin grid (BGA style)
  const pinGeo = new THREE.SphereGeometry(0.008, 6, 6);
  const pinMat = new THREE.MeshStandardMaterial({ 
    color: 0xcccccc, 
    metalness: 0.9, 
    roughness: 0.1,
    emissive: 0x333333,
    emissiveIntensity: 0.3
  });
  
  // Dense pin grid under FPGA
  for (let x = -0.5; x <= 0.5; x += 0.05) {
    for (let z = -0.5; z <= 0.5; z += 0.05) {
      const pin = new THREE.Mesh(pinGeo, pinMat);
      pin.position.set(x, 0.035, z);
      fpgaGroup.add(pin);
    }
  }

  // Memory chips (DDR4)
  const memGeo = new THREE.BoxGeometry(0.4, 0.06, 0.8);
  const memMat = new THREE.MeshStandardMaterial({ 
    color: 0x1a1a1a, 
    metalness: 0.6, 
    roughness: 0.4,
    emissive: 0x2a1a4a,
    emissiveIntensity: 0.5
  });
  
  // Memory chips on sides
  for (let x = -1.2; x <= 1.2; x += 2.4) {
    const mem = new THREE.Mesh(memGeo, memMat);
    mem.position.set(x, 0.07, 0);
    fpgaGroup.add(mem);
  }

  // Clock oscillators
  const clockGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.05, 8);
  const clockMat = new THREE.MeshStandardMaterial({ 
    color: 0x4a4a2a, 
    metalness: 0.5, 
    roughness: 0.3,
    emissive: 0x6a6a1a,
    emissiveIntensity: 0.6
  });
  
  // Multiple oscillators
  const clockPositions = [[-0.8, 0.8], [0.8, 0.8], [-0.8, -0.8]];
  clockPositions.forEach(([x, z]) => {
    const clock = new THREE.Mesh(clockGeo, clockMat);
    clock.position.set(x, 0.07, z);
    fpgaGroup.add(clock);
  });

  // Power regulators
  const vrGeo = new THREE.BoxGeometry(0.3, 0.08, 0.2);
  const vrMat = new THREE.MeshStandardMaterial({ 
    color: 0x3a2a2a, 
    metalness: 0.7, 
    roughness: 0.3,
    emissive: 0x4a1a1a,
    emissiveIntensity: 0.4
  });
  
  // VRs along the edge
  for (let y = -0.7; y <= 0.7; y += 0.7) {
    const vr = new THREE.Mesh(vrGeo, vrMat);
    vr.position.set(-1.3, 0.08, y);
    fpgaGroup.add(vr);
  }

  // IO connectors (headers)
  const headerGeo = new THREE.BoxGeometry(0.6, 0.15, 0.1);
  const headerMat = new THREE.MeshStandardMaterial({ 
    color: 0x1a1a1a, 
    metalness: 0.8, 
    roughness: 0.2
  });
  
  // Headers on top and bottom edges
  for (let x = -0.8; x <= 0.8; x += 0.8) {
    const header1 = new THREE.Mesh(headerGeo, headerMat);
    header1.position.set(x, 0.115, 1.05);
    fpgaGroup.add(header1);
    
    const header2 = new THREE.Mesh(headerGeo, headerMat);
    header2.position.set(x, 0.115, -1.05);
    fpgaGroup.add(header2);
  }

  // LED indicators (glowing)
  const ledGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.03, 8);
  const ledMat = new THREE.MeshStandardMaterial({ 
    color: 0x00ff88, 
    emissive: 0x00aa44, 
    emissiveIntensity: 1.0,
    metalness: 0.1,
    roughness: 0.8,
    transparent: true,
    opacity: 0.9
  });
  
  // LEDs in a row
  for (let i = 0; i < 6; i++) {
    const led = new THREE.Mesh(ledGeo, ledMat);
    led.position.set(-0.7 + i * 0.15, 0.08, -0.9);
    fpgaGroup.add(led);
  }

  // Trace lines (copper traces)
  const traceGeo = new THREE.PlaneGeometry(2.8, 0.01);
  const traceMat = new THREE.MeshStandardMaterial({ 
    color: 0x8a6a2a, 
    metalness: 0.8, 
    roughness: 0.2,
    emissive: 0x4a3a1a,
    emissiveIntensity: 0.3
  });
  
  // Multiple trace layers
  for (let i = 0; i < 8; i++) {
    const trace = new THREE.Mesh(traceGeo, traceMat);
    trace.position.set(0, 0.041, -0.8 + i * 0.2);
    trace.rotation.x = -Math.PI/2;
    fpgaGroup.add(trace);
    
    const traceV = trace.clone();
    traceV.rotation.z = Math.PI/2;
    traceV.position.set(-1.0 + i * 0.25, 0.041, 0);
    fpgaGroup.add(traceV);
  }

  // Text label on FPGA
  const makeTextTexture = (txt) => {
    const c = document.createElement('canvas');
    c.width = 512; c.height = 256;
    const g = c.getContext('2d');
    g.fillStyle = '#1a1a2f';
    g.fillRect(0, 0, c.width, c.height);
    g.font = 'bold 36px Roboto Mono, monospace';
    g.fillStyle = '#7fffd4';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillText(txt, c.width/2, c.height/2 - 20);
    g.font = 'bold 28px Roboto Mono, monospace';
    g.fillText('FPGA', c.width/2, c.height/2 + 20);
    const t = new THREE.CanvasTexture(c);
    t.anisotropy = 4;
    return t;
  };

  const labelGeo = new THREE.PlaneGeometry(1.1, 0.55);
  const labelMat = new THREE.MeshStandardMaterial({ 
    map: makeTextTexture('5iri'),
    transparent: true,
    metalness: 0.1,
    roughness: 0.8
  });
  const label = new THREE.Mesh(labelGeo, labelMat);
  label.position.set(0, 0.121, 0);
  label.rotation.x = -Math.PI/2;
  fpgaGroup.add(label);

  // Lighting
  const key = new THREE.DirectionalLight(0xffffff, 1.0);
  key.position.set(3, 4, 3);
  const rim = new THREE.DirectionalLight(0x66aaff, 0.7);
  rim.position.set(-3, 2, -2);
  const fill = new THREE.AmbientLight(0x334433, 0.6);
  scene.add(key, rim, fill);

  // Resize handler
  const onResize = () => {
    const W = el.clientWidth, H = el.clientHeight;
    camera.aspect = W/H;
    camera.updateProjectionMatrix();
    renderer.setSize(W, H);
  };
  window.addEventListener('resize', onResize);

  // Animation loop
  let t = 0;
  function tick() {
    t += 0.01;
    fpgaGroup.rotation.y = t * 0.4;
    fpgaGroup.rotation.x = Math.sin(t * 0.4) * 0.05;
    
    // Pulse various components
    const pulse1 = (Math.sin(t * 3) + 1) * 0.5;
    const pulse2 = (Math.sin(t * 2.5 + Math.PI/3) + 1) * 0.5;
    const pulse3 = (Math.sin(t * 2 + Math.PI) + 1) * 0.5;
    
    fpgaMat.emissiveIntensity = 0.2 + pulse1 * 0.4;
    memMat.emissiveIntensity = 0.3 + pulse2 * 0.3;
    clockMat.emissiveIntensity = 0.4 + pulse3 * 0.5;
    ledMat.emissiveIntensity = 0.8 + pulse1 * 0.4;
    
    // Animate LEDs individually
    fpgaGroup.children.forEach((child, i) => {
      if (child.material === ledMat) {
        const ledPulse = (Math.sin(t * 4 + i * 0.5) + 1) * 0.5;
        child.material.emissiveIntensity = 0.6 + ledPulse * 0.6;
      }
    });
    
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  tick();
})();
</script>

this is supposed to be an fpga btw.

