---
layout: content
title: Shri
permalink: /
nav_order: 1
---

I'm Shri — I build hardware, chase math, and ship things.

<div class="neon-panel" style="margin:2rem 0;">
  <canvas id="hero_wire" style="display:block;width:100%;height:360px;"></canvas>
  <pre id="bootlog" class="bootlog" aria-label="system log"></pre>
</div>

<script>
(function(){
  // Neon wireframe icosahedron
  const cvs = document.getElementById('hero_wire');
  const ctx = cvs.getContext('2d');
  let W=0,H=0, DPR=Math.min(2, window.devicePixelRatio||1);
  const fit = () => {
    const rect = cvs.getBoundingClientRect();
    W = Math.floor(rect.width * DPR);
    H = Math.floor(rect.height * DPR);
    cvs.width = W; cvs.height = H; ctx.setTransform(DPR,0,0,DPR,0,0);
  };
  fit();
  window.addEventListener('resize', fit);

  const phi = (1+Math.sqrt(5))/2; const s=1;
  const V = [];
  const add=(x,y,z)=>V.push([x*s,y*s,z*s]);
  // vertices
  [[0,1,phi],[0,-1,phi],[0,1,-phi],[0,-1,-phi],
   [1,phi,0],[-1,phi,0],[1,-phi,0],[-1,-phi,0],
   [phi,0,1],[-phi,0,1],[phi,0,-1],[-phi,0,-1]].forEach(v=>{add(v[0],v[1],v[2]);});
  // build edges by proximity
  const E = [];
  const dist=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1],a[2]-b[2]);
  let minD=Infinity; for(let i=0;i<V.length;i++)for(let j=i+1;j<V.length;j++){minD=Math.min(minD,dist(V[i],V[j]));}
  const TH = minD*1.05;
  for(let i=0;i<V.length;i++)for(let j=i+1;j<V.length;j++){ if(dist(V[i],V[j])<=TH) E.push([i,j]); }

  let t=0;
  function proj([x,y,z]){
    const f=2.8; const zc = z+3.2; // perspective
    return [ x/(zc)*H*0.28 + (cvs.clientWidth/2), y/(zc)*H*0.28 + (cvs.clientHeight/2) ];
  }
  function rotY([x,y,z],a){ const c=Math.cos(a), s=Math.sin(a); return [ c*x+ s*z, y, -s*x + c*z ]; }
  function rotX([x,y,z],a){ const c=Math.cos(a), s=Math.sin(a); return [ x, c*y - s*z, s*y + c*z ]; }

  function tick(){
    t+=0.012;
    ctx.fillStyle='rgba(0,0,0,0.25)';
    ctx.fillRect(0,0,cvs.clientWidth,cvs.clientHeight);
    ctx.save();
    ctx.lineWidth=2; ctx.strokeStyle='#00ffe0';
    ctx.shadowColor='rgba(0,255,240,0.6)'; ctx.shadowBlur=12;
    for(const [i,j] of E){
      let a=V[i], b=V[j];
      a=rotX(rotY(a, t*0.9), Math.sin(t)*0.3);
      b=rotX(rotY(b, t*0.9), Math.sin(t)*0.3);
      const [ax,ay]=proj(a), [bx,by]=proj(b);
      ctx.beginPath(); ctx.moveTo(ax,ay); ctx.lineTo(bx,by); ctx.stroke();
    }
    // accent edges
    ctx.strokeStyle='#8a5cf6'; ctx.shadowColor='rgba(138,92,246,0.6)';
    for(let k=0;k<5;k++){
      const [i,j]=E[(Math.floor((t*60+k)) % E.length)];
      let a=V[i], b=V[j]; a=rotX(rotY(a,t*0.9), Math.sin(t)*0.3); b=rotX(rotY(b,t*0.9), Math.sin(t)*0.3);
      const [ax,ay]=proj(a), [bx,by]=proj(b);
      ctx.beginPath(); ctx.moveTo(ax,ay); ctx.lineTo(bx,by); ctx.stroke();
    }
    ctx.restore();
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  // Boot log typewriter
  const log = document.getElementById('bootlog');
  const lines = [
    '$ boot: 5iri kernel v0.1',
    'cpu: rv64gc   clocks: 3.20GHz (sim)',
    'mem:  64KB L1 | 8MB L3 | 16GB dram',
    'accel: neon-wire vshader online',
    'status: all systems nominal',
  ];
  let li=0, ci=0;
  function type(){
    if(li>=lines.length) return; 
    log.textContent += (ci===0? (li? '\n':'') : '') + lines[li].charAt(ci);
    ci++;
    if(ci>lines[li].length){ li++; ci=0; setTimeout(type, 300); }
    else setTimeout(type, 18 + Math.random()*40);
  }
  type();
})();
</script>
