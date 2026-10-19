import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { detectWebGL } from '../utils/webgl';

export const BuildingLayersBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reqAnimRef = useRef<number | null>(null);

  useEffect(() => {
    const webglStatus = detectWebGL();
    if (!webglStatus.supported) return;

    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera with isometric perspective
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(12, 14, 16);
    camera.lookAt(0, 2, 0);

    // 3. Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.replaceChildren(renderer.domElement);

    // 4. Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0x2dd4bf, 2.0);
    dirLight.position.set(15, 25, 10);
    scene.add(dirLight);

    const blueLight = new THREE.DirectionalLight(0x38bdf8, 1.5);
    blueLight.position.set(-15, 15, -10);
    scene.add(blueLight);

    // 5. Root Group for all Architectural Building Layers
    const layersRootGroup = new THREE.Group();
    scene.add(layersRootGroup);

    // Materials
    const slabMat = new THREE.MeshStandardMaterial({
      color: 0x091428,
      transparent: true,
      opacity: 0.65,
      roughness: 0.2,
      metalness: 0.7,
    });

    const tealLineMat = new THREE.LineBasicMaterial({
      color: 0x14b8a6,
      transparent: true,
      opacity: 0.85,
    });

    const cyanLineMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.6,
    });

    const faintLineMat = new THREE.LineBasicMaterial({
      color: 0x0f766e,
      transparent: true,
      opacity: 0.35,
    });

    // Helper to create an architectural slab layer with wireframe edges
    const createBuildingLayer = (
      w: number,
      h: number,
      d: number,
      yPos: number,
      hasColumns: boolean = false,
      hasPergola: boolean = false
    ) => {
      const layerGroup = new THREE.Group();
      layerGroup.position.y = yPos;

      // Solid translucent slab
      const slabGeo = new THREE.BoxGeometry(w, h, d);
      const slabMesh = new THREE.Mesh(slabGeo, slabMat);
      layerGroup.add(slabMesh);

      // Glowing outer wireframe edges
      const edgeGeo = new THREE.EdgesGeometry(slabGeo);
      const edgeLines = new THREE.LineSegments(edgeGeo, tealLineMat);
      layerGroup.add(edgeLines);

      // Sub-grid lines on the slab surface
      const grid = new THREE.GridHelper(w, Math.floor(w), 0x0d9488, 0x112240);
      grid.position.y = h / 2 + 0.01;
      layerGroup.add(grid);

      // Structural Columns below this slab
      if (hasColumns) {
        const colGeo = new THREE.BoxGeometry(0.25, 2.2, 0.25);
        const colPositions = [
          [-w / 2 + 0.3, -1.1, -d / 2 + 0.3],
          [w / 2 - 0.3, -1.1, -d / 2 + 0.3],
          [-w / 2 + 0.3, -1.1, d / 2 - 0.3],
          [w / 2 - 0.3, -1.1, d / 2 - 0.3],
          [0, -1.1, -d / 2 + 0.3],
          [0, -1.1, d / 2 - 0.3],
        ];

        colPositions.forEach(([cx, cy, cz]) => {
          const colMesh = new THREE.Mesh(colGeo, slabMat);
          colMesh.position.set(cx, cy, cz);
          const colEdge = new THREE.LineSegments(new THREE.EdgesGeometry(colGeo), cyanLineMat);
          colMesh.add(colEdge);
          layerGroup.add(colMesh);
        });
      }

      // Pergola Sunshade Slatting
      if (hasPergola) {
        const pergolaGroup = new THREE.Group();
        for (let i = -w / 2 + 0.8; i <= w / 2 - 0.8; i += 0.8) {
          const beamGeo = new THREE.BoxGeometry(0.12, 0.2, d - 1.2);
          const beamMesh = new THREE.Mesh(beamGeo, slabMat);
          beamMesh.position.set(i, 0.3, 0);
          const beamEdge = new THREE.LineSegments(new THREE.EdgesGeometry(beamGeo), tealLineMat);
          beamMesh.add(beamEdge);
          pergolaGroup.add(beamMesh);
        }
        layerGroup.add(pergolaGroup);
      }

      return layerGroup;
    };

    // --- Create 4 Distinct Exploded Architectural Building Layers ---
    // Layer 0: Ground Foundation Plinth (wide)
    const layer0 = createBuildingLayer(10, 0.3, 9, 0, false);
    layersRootGroup.add(layer0);

    // Layer 1: Ground Floor Slab + Columns
    const layer1 = createBuildingLayer(9.2, 0.25, 8.2, 2.6, true);
    layersRootGroup.add(layer1);

    // Layer 2: First Floor Cantilever Slab + Living Core
    const layer2 = createBuildingLayer(8.4, 0.25, 7.4, 5.4, true);
    layersRootGroup.add(layer2);

    // Layer 3: Terrace & Modern Pergola
    const layer3 = createBuildingLayer(7.6, 0.2, 6.6, 8.2, true, true);
    layersRootGroup.add(layer3);

    // Background Architectural Coordinate Points (Particle Dust)
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 28;
      particlePos[i + 1] = Math.random() * 16 - 2;
      particlePos[i + 2] = (Math.random() - 0.5) * 28;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x2dd4bf,
      size: 0.08,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    layersRootGroup.add(particles);

    // Initial positioning: shift slightly to the right side of the screen on desktop
    layersRootGroup.position.set(2.5, -2.5, 0);
    layersRootGroup.rotation.y = 0.6;
    layersRootGroup.rotation.x = 0.15;

    // --- Scroll-Linked Animation: Elevate layers upwards as user scrolls ---
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Animate root group upwards with parallax velocity
      gsap.to(layersRootGroup.position, {
        y: -2.5 + scrollY * 0.007, // Animates UPWARDS smoothly on scroll
        x: 2.5 - scrollY * 0.002,
        duration: 0.6,
        ease: 'power1.out',
      });

      // Subtle separation / exploded expansion on scroll
      gsap.to(layer1.position, { y: 2.6 + scrollY * 0.0015, duration: 0.5, ease: 'power1.out' });
      gsap.to(layer2.position, { y: 5.4 + scrollY * 0.003, duration: 0.5, ease: 'power1.out' });
      gsap.to(layer3.position, { y: 8.2 + scrollY * 0.0045, duration: 0.5, ease: 'power1.out' });

      // Slight rotation as user scrolls
      gsap.to(layersRootGroup.rotation, {
        y: 0.6 + scrollY * 0.0008,
        duration: 0.8,
        ease: 'power1.out',
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // --- Resize Handler ---
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);

      // On mobile screens, center the 3D building layers
      if (newWidth < 768) {
        layersRootGroup.position.x = 0;
        layersRootGroup.scale.set(0.75, 0.75, 0.75);
      } else {
        layersRootGroup.position.x = 2.5;
        layersRootGroup.scale.set(1.0, 1.0, 1.0);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // trigger once for initial screen width

    // --- Animation Loop ---
    let clock = new THREE.Clock();
    const animate = () => {
      reqAnimRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Subtle idle breathing wave
      layer0.position.y = Math.sin(elapsed * 0.8) * 0.05;
      layer3.position.y = 8.2 + Math.sin(elapsed * 0.9 + 1) * 0.08;

      // Slow elegant background drift
      layersRootGroup.rotation.y += 0.0012;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (reqAnimRef.current) cancelAnimationFrame(reqAnimRef.current);
      renderer.dispose();
      layersRootGroup.traverse((child) => {
        if (child instanceof THREE.Mesh || child instanceof THREE.LineSegments || child instanceof THREE.Points) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      style={{ opacity: 0.85 }}
      aria-hidden="true"
    />
  );
};
