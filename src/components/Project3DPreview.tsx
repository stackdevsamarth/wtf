'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Project3DPreviewProps {
  projectId: string;
  themeColor: string;
  category: string;
}

export default function Project3DPreview({ projectId, themeColor, category }: Project3DPreviewProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x06b6d4, 30, 20);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x8b5cf6, 30, 20);
    pointLight2.position.set(-5, -5, -3);
    scene.add(pointLight2);

    // Dynamic geometry based on project
    let mainMesh: THREE.Mesh;
    let secondaryGroup = new THREE.Group();
    scene.add(secondaryGroup);

    if (projectId === 'neural-mesh-3d' || category === 'AI & ML') {
      // Neural mesh: Icosahedron with surrounding node points
      const geo = new THREE.IcosahedronGeometry(2, 1);
      const mat = new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        wireframe: true,
        emissive: 0x0891b2,
        emissiveIntensity: 0.5,
      });
      mainMesh = new THREE.Mesh(geo, mat);

      // Synapse points
      const dotGeo = new THREE.SphereGeometry(0.08, 8, 8);
      const dotMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      for (let i = 0; i < 20; i++) {
        const dot = new THREE.Mesh(dotGeo, dotMat);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const r = 2.4 + Math.random() * 0.8;
        dot.position.set(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi));
        secondaryGroup.add(dot);
      }
    } else if (projectId === 'cyber-vault-p2p' || category === 'Cloud & Distributed') {
      // Secure Vault: Nested Octahedron / Cube
      const geo = new THREE.OctahedronGeometry(2, 0);
      const mat = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        metalness: 0.9,
        roughness: 0.2,
        wireframe: true,
        emissive: 0x059669,
        emissiveIntensity: 0.4,
      });
      mainMesh = new THREE.Mesh(geo, mat);

      // Outer security rings
      const ringGeo = new THREE.TorusGeometry(3, 0.03, 16, 64);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.6 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      secondaryGroup.add(ring);
    } else if (projectId === 'holo-synth-audio') {
      // Torus Knot representing soundwaves
      const geo = new THREE.TorusKnotGeometry(1.6, 0.45, 80, 16);
      const mat = new THREE.MeshStandardMaterial({
        color: 0xf43f5e,
        wireframe: true,
        emissive: 0xe11d48,
        emissiveIntensity: 0.5,
      });
      mainMesh = new THREE.Mesh(geo, mat);
    } else {
      // DevTools / Quantum: Complex Dodecahedron
      const geo = new THREE.DodecahedronGeometry(2, 0);
      const mat = new THREE.MeshStandardMaterial({
        color: 0x8b5cf6,
        wireframe: true,
        emissive: 0x7c3aed,
        emissiveIntensity: 0.5,
      });
      mainMesh = new THREE.Mesh(geo, mat);

      // Orbiting particles
      const ringGeo = new THREE.RingGeometry(2.6, 2.7, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xa78bfa, side: THREE.DoubleSide });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      secondaryGroup.add(ring);
    }

    scene.add(mainMesh);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      mainMesh.rotation.x = t * 0.4;
      mainMesh.rotation.y = t * 0.5;
      secondaryGroup.rotation.y = -t * 0.3;
      secondaryGroup.rotation.z = Math.sin(t * 0.5) * 0.2;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !renderer) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, [projectId, category]);

  return (
    <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-slate-950/80 border border-slate-800/80">
      <div ref={mountRef} className="w-full h-full" />
      <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-900/80 border border-slate-800 text-[10px] font-mono text-cyan-400 pointer-events-none">
        WebGL 3D Live Simulation
      </div>
    </div>
  );
}
