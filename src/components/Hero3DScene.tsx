'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Play, Pause, RefreshCw, Eye, Sparkles, Sliders } from 'lucide-react';

export default function Hero3DScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [wireframeMode, setWireframeMode] = useState(true);
  const [isRotating, setIsRotating] = useState(true);
  const [particleSpeed, setParticleSpeed] = useState<'normal' | 'fast' | 'slow'>('normal');
  const [activePreset, setActivePreset] = useState<'cyan' | 'neon' | 'matrix'>('cyan');

  // References to mutable Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const coreMeshRef = useRef<THREE.Mesh | null>(null);
  const coreMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const outerRingsRef = useRef<THREE.Group | null>(null);
  const satellitesRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const mousePosRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x030712, 0.015);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 18;
    camera.position.y = 1.5;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    rendererRef.current = renderer;
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLightCyan = new THREE.PointLight(0x06b6d4, 60, 40);
    pointLightCyan.position.set(10, 8, 10);
    scene.add(pointLightCyan);

    const pointLightViolet = new THREE.PointLight(0x8b5cf6, 70, 40);
    pointLightViolet.position.set(-10, -6, -5);
    scene.add(pointLightViolet);

    const centerGlow = new THREE.PointLight(0x38bdf8, 30, 20);
    centerGlow.position.set(0, 0, 0);
    scene.add(centerGlow);

    // 5. Central 3D Geometric Core (Icosahedron + Wireframe shell)
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Inner Core
    const innerGeo = new THREE.IcosahedronGeometry(3.6, 2);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.2,
      metalness: 0.85,
      wireframe: wireframeMode,
      emissive: 0x083344,
      emissiveIntensity: 0.6,
    });
    coreMaterialRef.current = innerMat;
    const coreMesh = new THREE.Mesh(innerGeo, innerMat);
    coreMeshRef.current = coreMesh;
    coreGroup.add(coreMesh);

    // Outer lattice cage
    const outerCageGeo = new THREE.DodecahedronGeometry(4.8, 1);
    const outerCageMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const outerCage = new THREE.Mesh(outerCageGeo, outerCageMat);
    coreGroup.add(outerCage);

    // 6. Holographic Orbit Rings
    const ringsGroup = new THREE.Group();
    outerRingsRef.current = ringsGroup;
    scene.add(ringsGroup);

    const ringGeometry = new THREE.TorusGeometry(6.2, 0.04, 16, 120);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.65,
    });
    const ring1 = new THREE.Mesh(ringGeometry, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    ringsGroup.add(ring1);

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.5,
    });
    const ring2 = new THREE.Mesh(ringGeometry, ringMat2);
    ring2.scale.set(1.2, 1.2, 1.2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 3;
    ringsGroup.add(ring2);

    // 7. Floating Orbiting Satellites (Data Nodes)
    const satellites = new THREE.Group();
    satellitesRef.current = satellites;
    scene.add(satellites);

    const satGeo = new THREE.BoxGeometry(0.65, 0.65, 0.65);
    const satMaterials = [
      new THREE.MeshStandardMaterial({ color: 0x06b6d4, roughness: 0.1, metalness: 0.9, emissive: 0x0891b2, emissiveIntensity: 0.4 }),
      new THREE.MeshStandardMaterial({ color: 0x8b5cf6, roughness: 0.1, metalness: 0.9, emissive: 0x7c3aed, emissiveIntensity: 0.4 }),
      new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.1, metalness: 0.9, emissive: 0x059669, emissiveIntensity: 0.4 }),
      new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.1, metalness: 0.9, emissive: 0xe11d48, emissiveIntensity: 0.4 }),
    ];

    const satCount = 8;
    const satNodes: THREE.Mesh[] = [];
    for (let i = 0; i < satCount; i++) {
      const satMesh = new THREE.Mesh(satGeo, satMaterials[i % satMaterials.length]);
      const angle = (i / satCount) * Math.PI * 2;
      const radius = 7.5 + (i % 2) * 1.5;
      satMesh.position.set(
        Math.cos(angle) * radius,
        (Math.sin(angle * 2) * 2.5),
        Math.sin(angle) * radius
      );
      satellites.add(satMesh);
      satNodes.push(satMesh);
    }

    // 8. 3D Interactive Particle Field (Star / Cyber Field)
    const particleCount = 1600;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x06b6d4); // Cyan
    const color2 = new THREE.Color(0x8b5cf6); // Purple
    const color3 = new THREE.Color(0x38bdf8); // Sky blue

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      // Spread across a 3D sphere volume
      const r = 12 + Math.random() * 28;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[idx] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[idx + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[idx + 2] = r * Math.cos(phi);

      const chosenColor = Math.random() > 0.6 ? color2 : Math.random() > 0.3 ? color1 : color3;
      particleColors[idx] = chosenColor.r;
      particleColors[idx + 1] = chosenColor.g;
      particleColors[idx + 2] = chosenColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    particlesRef.current = particles;
    scene.add(particles);

    // 9. Mouse movement listener for 3D parallax
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mousePosRef.current.targetX = x;
      mousePosRef.current.targetY = y;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 10. Resize listener
    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // 11. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mousePosRef.current.x += (mousePosRef.current.targetX - mousePosRef.current.x) * 0.05;
      mousePosRef.current.y += (mousePosRef.current.targetY - mousePosRef.current.y) * 0.05;

      // Parallax camera tilt
      camera.position.x = mousePosRef.current.x * 2.5;
      camera.position.y = 1.5 + mousePosRef.current.y * 1.8;
      camera.lookAt(0, 0, 0);

      // Core rotation
      const speedMultiplier = particleSpeed === 'fast' ? 2.2 : particleSpeed === 'slow' ? 0.4 : 1.0;
      if (isRotating) {
        coreGroup.rotation.y = elapsedTime * 0.25 * speedMultiplier;
        coreGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.2;
        outerCage.rotation.y = -elapsedTime * 0.3 * speedMultiplier;

        // Rings rotation
        ringsGroup.rotation.z = elapsedTime * 0.15 * speedMultiplier;
        ringsGroup.rotation.x = Math.cos(elapsedTime * 0.1) * 0.25;

        // Orbiting satellites
        satellites.rotation.y = elapsedTime * 0.35 * speedMultiplier;
        satNodes.forEach((node, i) => {
          node.rotation.x += 0.02;
          node.rotation.y += 0.03;
          node.position.y += Math.sin(elapsedTime * 2 + i) * 0.005;
        });

        // Background particles slow drift
        particles.rotation.y = elapsedTime * 0.04 * speedMultiplier;
        particles.rotation.x = Math.sin(elapsedTime * 0.03) * 0.08;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current && container.contains(rendererRef.current.domElement)) {
        container.removeChild(rendererRef.current.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, [isRotating, particleSpeed]);

  // Update wireframe mode without re-creating scene
  useEffect(() => {
    if (coreMaterialRef.current) {
      coreMaterialRef.current.wireframe = wireframeMode;
      coreMaterialRef.current.needsUpdate = true;
    }
  }, [wireframeMode]);

  const cycleColorPreset = () => {
    if (!coreMaterialRef.current) return;
    if (activePreset === 'cyan') {
      setActivePreset('neon');
      coreMaterialRef.current.emissive.setHex(0x7c3aed);
      coreMaterialRef.current.color.setHex(0x1e1b4b);
    } else if (activePreset === 'neon') {
      setActivePreset('matrix');
      coreMaterialRef.current.emissive.setHex(0x059669);
      coreMaterialRef.current.color.setHex(0x022c22);
    } else {
      setActivePreset('cyan');
      coreMaterialRef.current.emissive.setHex(0x083344);
      coreMaterialRef.current.color.setHex(0x0f172a);
    }
    coreMaterialRef.current.needsUpdate = true;
  };

  return (
    <div className="relative w-full h-[580px] lg:h-[680px] overflow-hidden rounded-3xl glass-panel border border-cyan-500/20 bg-gradient-to-b from-slate-950/80 via-slate-900/60 to-slate-950/95 shadow-2xl">
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating 3D HUD & Controls */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="glass-panel px-3 py-1.5 rounded-xl border border-cyan-500/30 bg-slate-950/70 backdrop-blur-md pointer-events-auto flex items-center space-x-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          <span className="font-mono text-cyan-300 font-semibold tracking-wide">3D WEBGL CORE</span>
          <span className="text-slate-500">|</span>
          <span className="text-[11px] font-mono text-slate-400">1.6k Vertices • ACES Tone</span>
        </div>

        {/* Speed / Pause Toggle */}
        <div className="glass-panel p-1 rounded-xl border border-slate-800 bg-slate-950/70 backdrop-blur-md pointer-events-auto flex items-center space-x-1">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={isRotating ? 'Pause 3D rotation' : 'Resume 3D rotation'}
          >
            {isRotating ? <Pause className="w-4 h-4 text-cyan-400" /> : <Play className="w-4 h-4 text-emerald-400" />}
          </button>
          <button
            onClick={() => {
              const speeds: ('slow' | 'normal' | 'fast')[] = ['slow', 'normal', 'fast'];
              const nextIndex = (speeds.indexOf(particleSpeed) + 1) % speeds.length;
              setParticleSpeed(speeds[nextIndex]);
            }}
            className="px-2 py-1 rounded-lg text-[11px] font-mono text-slate-300 hover:bg-slate-800 transition-colors"
            title="Cycle rotation speed"
          >
            {particleSpeed.toUpperCase()}
          </button>
        </div>
      </div>

      {/* Bottom HUD Controls */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-center justify-between gap-3 pointer-events-none">
        <div className="pointer-events-auto flex items-center space-x-2">
          <button
            onClick={() => setWireframeMode(!wireframeMode)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center space-x-1.5 glass-panel border ${
              wireframeMode
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-md shadow-cyan-950'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{wireframeMode ? 'Wireframe: ON' : 'Wireframe: Solid'}</span>
          </button>

          <button
            onClick={cycleColorPreset}
            className="px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center space-x-1.5 glass-panel border border-slate-800 bg-slate-900/80 text-slate-300 hover:text-white hover:border-slate-700"
          >
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span className="capitalize">Theme: {activePreset}</span>
          </button>
        </div>

        <div className="pointer-events-auto text-[11px] font-mono text-slate-400 glass-panel px-3 py-1.5 rounded-xl border border-slate-800/80 bg-slate-950/70">
          <span>Move mouse to pan camera • Drag to interact</span>
        </div>
      </div>
    </div>
  );
}

