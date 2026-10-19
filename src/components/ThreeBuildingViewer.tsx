import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { RotateCw, Layers, Sun, Moon, Sparkles, AlertCircle, Camera, Check } from 'lucide-react';
import { detectWebGL } from '../utils/webgl';

interface ThreeBuildingViewerProps {
  className?: string;
  onExplorePlans?: () => void;
}

export const ThreeBuildingViewer: React.FC<ThreeBuildingViewerProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [webGLSupported, setWebGLSupported] = useState<boolean>(true);
  const [isBlueprintMode, setIsBlueprintMode] = useState<boolean>(false);
  const [lightingMode, setLightingMode] = useState<'day' | 'dusk'>('dusk');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [currentPreset, setCurrentPreset] = useState<'iso' | 'front' | 'top'>('iso');

  // Three.js object references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const buildingGroupRef = useRef<THREE.Group | null>(null);
  const lightsRef = useRef<{
    dirLight: THREE.DirectionalLight;
    hemiLight: THREE.HemisphereLight;
    interiorLight1: THREE.PointLight;
    interiorLight2: THREE.PointLight;
    spotLight: THREE.SpotLight;
  } | null>(null);

  const materialsRef = useRef<{ [key: string]: THREE.Material }>({});
  const isPointerDownRef = useRef(false);
  const previousPointerPosRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0.35, y: 0.85 });
  const currentRotationRef = useRef({ x: 0.35, y: 0.85 });
  const reqAnimIdRef = useRef<number | null>(null);

  // 1. Initial WebGL Support Check
  useEffect(() => {
    const status = detectWebGL();
    if (!status.supported) {
      setWebGLSupported(false);
    }
  }, []);

  // 2. Initialize Three.js Scene, Lighting, PBR Materials & Geometry
  useEffect(() => {
    if (!webGLSupported) return;

    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 420;

    // --- Scene ---
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // --- Camera ---
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(11, 7.5, 12);
    camera.lookAt(0, 1.8, 0);
    cameraRef.current = camera;

    // --- WebGL Renderer with Shadows & Color Management ---
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebGLSupported(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    rendererRef.current = renderer;
    container.replaceChildren(renderer.domElement);

    // Listen for WebGL context loss
    renderer.domElement.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      setWebGLSupported(false);
    });

    // --- Realistic Architectural Lighting Setup ---
    // Ambient / Sky Hemisphere
    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x070d1e, 0.8);
    scene.add(hemiLight);

    // Main Golden Sun / Key Directional Light
    const dirLight = new THREE.DirectionalLight(0xffedd5, 2.2);
    dirLight.position.set(14, 20, 12);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 45;
    dirLight.shadow.camera.left = -9;
    dirLight.shadow.camera.right = 9;
    dirLight.shadow.camera.top = 9;
    dirLight.shadow.camera.bottom = -9;
    dirLight.shadow.bias = -0.0005;
    scene.add(dirLight);

    // Interior Warm Living Room Point Light
    const interiorLight1 = new THREE.PointLight(0xf59e0b, 3.5, 9);
    interiorLight1.position.set(-1.0, 1.6, 0.5);
    scene.add(interiorLight1);

    // First Floor Master Bedroom Warm Point Light
    const interiorLight2 = new THREE.PointLight(0xfbbf24, 3.0, 8);
    interiorLight2.position.set(-0.8, 3.8, 0);
    scene.add(interiorLight2);

    // Architectural Facade Uplight
    const spotLight = new THREE.SpotLight(0x2dd4bf, 4.0, 14, Math.PI / 4, 0.4);
    spotLight.position.set(2.2, 0.1, 3.2);
    spotLight.target.position.set(1.5, 3.0, 0);
    scene.add(spotLight);
    scene.add(spotLight.target);

    lightsRef.current = {
      dirLight,
      hemiLight,
      interiorLight1,
      interiorLight2,
      spotLight,
    };

    // --- PBR Architectural Materials ---
    const baseConcreteMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.6,
      metalness: 0.15,
    });
    const wallWhiteMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.4,
      metalness: 0.05,
    });
    const columnTealMat = new THREE.MeshStandardMaterial({
      color: 0x0f766e,
      roughness: 0.35,
      metalness: 0.3,
    });
    const teakWoodMat = new THREE.MeshStandardMaterial({
      color: 0xb45309,
      roughness: 0.55,
      metalness: 0.1,
    });
    const darkSteelSlabMat = new THREE.MeshStandardMaterial({
      color: 0x0b132b,
      roughness: 0.3,
      metalness: 0.5,
    });
    const tintedGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.4,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.7,
      ior: 1.5,
    });

    materialsRef.current = {
      baseConcreteMat,
      wallWhiteMat,
      columnTealMat,
      teakWoodMat,
      darkSteelSlabMat,
      tintedGlassMat,
    };

    // --- Architectural Building Group ---
    const buildingGroup = new THREE.Group();
    buildingGroupRef.current = buildingGroup;
    scene.add(buildingGroup);

    // 1. Foundation Blueprint Grid
    const grid = new THREE.GridHelper(16, 16, 0x0d9488, 0x1e293b);
    grid.position.y = -0.02;
    buildingGroup.add(grid);

    // 2. Concrete Foundation Plinth (Plinth Level 450mm equivalent)
    const plinthGeo = new THREE.BoxGeometry(7.2, 0.4, 6.2);
    const plinthMesh = new THREE.Mesh(plinthGeo, baseConcreteMat);
    plinthMesh.position.y = 0.2;
    plinthMesh.receiveShadow = true;
    const plinthEdge = new THREE.LineSegments(
      new THREE.EdgesGeometry(plinthGeo),
      new THREE.LineBasicMaterial({ color: 0x0d9488, linewidth: 1.5 })
    );
    plinthMesh.add(plinthEdge);
    buildingGroup.add(plinthMesh);

    // 3. Structural RCC Columns (8 Grid Pillars)
    const colGeo = new THREE.BoxGeometry(0.32, 5.6, 0.32);
    const colCoords = [
      [-3.3, -2.8], [0, -2.8], [3.3, -2.8],
      [-3.3, 0], [3.3, 0],
      [-3.3, 2.8], [0, 2.8], [3.3, 2.8],
    ];

    colCoords.forEach(([cx, cz]) => {
      const colMesh = new THREE.Mesh(colGeo, columnTealMat);
      colMesh.position.set(cx, 2.8, cz);
      colMesh.castShadow = true;
      colMesh.name = 'structure_column';

      const colEdge = new THREE.LineSegments(
        new THREE.EdgesGeometry(colGeo),
        new THREE.LineBasicMaterial({ color: 0x2dd4bf })
      );
      colMesh.add(colEdge);
      buildingGroup.add(colMesh);
    });

    // 4. Ground Floor Main Volume
    const gLivingGeo = new THREE.BoxGeometry(4.0, 2.3, 5.0);
    const gLivingMesh = new THREE.Mesh(gLivingGeo, wallWhiteMat);
    gLivingMesh.position.set(-1.2, 1.55, 0);
    gLivingMesh.castShadow = true;
    gLivingMesh.receiveShadow = true;
    const gLivingEdge = new THREE.LineSegments(
      new THREE.EdgesGeometry(gLivingGeo),
      new THREE.LineBasicMaterial({ color: 0x0284c7 })
    );
    gLivingMesh.add(gLivingEdge);
    buildingGroup.add(gLivingMesh);

    // Ground Floor Teak Wood Foyer Slatting
    const gFoyerGeo = new THREE.BoxGeometry(2.4, 2.3, 2.8);
    const gFoyerMesh = new THREE.Mesh(gFoyerGeo, teakWoodMat);
    gFoyerMesh.position.set(1.9, 1.55, -1.0);
    gFoyerMesh.castShadow = true;
    const gFoyerEdge = new THREE.LineSegments(
      new THREE.EdgesGeometry(gFoyerGeo),
      new THREE.LineBasicMaterial({ color: 0xd97706 })
    );
    gFoyerMesh.add(gFoyerEdge);
    buildingGroup.add(gFoyerMesh);

    // Ground Floor Glass Picture Window
    const gGlassGeo = new THREE.BoxGeometry(2.6, 1.4, 0.08);
    const gGlassMesh = new THREE.Mesh(gGlassGeo, tintedGlassMat);
    gGlassMesh.position.set(-1.2, 1.6, 2.52);
    buildingGroup.add(gGlassMesh);

    // 5. First Floor Slab (Intermediate RCC Slab)
    const midSlabGeo = new THREE.BoxGeometry(7.6, 0.28, 6.6);
    const midSlabMesh = new THREE.Mesh(midSlabGeo, darkSteelSlabMat);
    midSlabMesh.position.set(0, 2.82, 0);
    midSlabMesh.castShadow = true;
    midSlabMesh.receiveShadow = true;
    const midSlabEdge = new THREE.LineSegments(
      new THREE.EdgesGeometry(midSlabGeo),
      new THREE.LineBasicMaterial({ color: 0x0d9488 })
    );
    midSlabMesh.add(midSlabEdge);
    buildingGroup.add(midSlabMesh);

    // 6. First Floor Master Residence Suite
    const fRoomGeo = new THREE.BoxGeometry(4.4, 2.2, 4.0);
    const fRoomMesh = new THREE.Mesh(fRoomGeo, wallWhiteMat);
    fRoomMesh.position.set(-0.9, 4.08, -0.6);
    fRoomMesh.castShadow = true;
    fRoomMesh.receiveShadow = true;
    const fRoomEdge = new THREE.LineSegments(
      new THREE.EdgesGeometry(fRoomGeo),
      new THREE.LineBasicMaterial({ color: 0x0284c7 })
    );
    fRoomMesh.add(fRoomEdge);
    buildingGroup.add(fRoomMesh);

    // Cantilever Balcony
    const balconyGeo = new THREE.BoxGeometry(2.8, 0.15, 2.2);
    const balconyMesh = new THREE.Mesh(balconyGeo, baseConcreteMat);
    balconyMesh.position.set(2.0, 2.98, 1.6);
    balconyMesh.castShadow = true;
    buildingGroup.add(balconyMesh);

    // Balcony Glass Railing
    const railingGeo = new THREE.BoxGeometry(2.8, 0.85, 0.05);
    const railingMesh = new THREE.Mesh(railingGeo, tintedGlassMat);
    railingMesh.position.set(2.0, 3.48, 2.68);
    buildingGroup.add(railingMesh);

    // First Floor Architectural Window Band
    const fGlassGeo = new THREE.BoxGeometry(3.2, 1.3, 0.08);
    const fGlassMesh = new THREE.Mesh(fGlassGeo, tintedGlassMat);
    fGlassMesh.position.set(-0.9, 4.1, 1.42);
    buildingGroup.add(fGlassMesh);

    // 7. Rooftop Terrace Slab & Modern Pergola
    const roofGeo = new THREE.BoxGeometry(7.2, 0.22, 6.0);
    const roofMesh = new THREE.Mesh(roofGeo, darkSteelSlabMat);
    roofMesh.position.set(0, 5.28, 0);
    roofMesh.castShadow = true;
    const roofEdge = new THREE.LineSegments(
      new THREE.EdgesGeometry(roofGeo),
      new THREE.LineBasicMaterial({ color: 0x0d9488 })
    );
    roofMesh.add(roofEdge);
    buildingGroup.add(roofMesh);

    // Pergola Sunshade Beams (5 Wooden Slats)
    for (let i = -1.6; i <= 1.6; i += 0.8) {
      const beamGeo = new THREE.BoxGeometry(0.14, 0.22, 3.2);
      const beamMesh = new THREE.Mesh(beamGeo, teakWoodMat);
      beamMesh.position.set(i + 1.2, 5.75, 0.5);
      beamMesh.castShadow = true;
      buildingGroup.add(beamMesh);
    }

    buildingGroup.position.y = -1.3;

    // --- Subtle Scroll-Linked Animation with GSAP ---
    let scrollTriggerInstance: ScrollTrigger | null = null;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY < 1200 && buildingGroupRef.current) {
        gsap.to(buildingGroupRef.current.position, {
          y: -1.3 - scrollY * 0.0015,
          duration: 0.4,
          ease: 'power1.out',
        });
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // --- Resize Handler ---
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 420;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // --- Render Loop ---
    const animate = () => {
      reqAnimIdRef.current = requestAnimationFrame(animate);

      // Smooth lerp rotation toward target
      currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.06;
      currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.06;

      if (autoRotate && !isPointerDownRef.current) {
        targetRotationRef.current.y += 0.0035;
      }

      if (buildingGroupRef.current) {
        buildingGroupRef.current.rotation.y = currentRotationRef.current.y;
        buildingGroupRef.current.rotation.x = currentRotationRef.current.x;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (reqAnimIdRef.current) cancelAnimationFrame(reqAnimIdRef.current);
      renderer.dispose();
      buildingGroup.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
    };
  }, [webGLSupported, autoRotate]);

  // 3. Dynamic Lighting Mode Transitions (Day vs Dusk)
  useEffect(() => {
    if (!lightsRef.current) return;
    const { dirLight, hemiLight, interiorLight1, interiorLight2, spotLight } = lightsRef.current;

    if (lightingMode === 'dusk') {
      gsap.to(dirLight, { intensity: 1.6, duration: 0.8 });
      gsap.to(hemiLight, { intensity: 0.6, duration: 0.8 });
      gsap.to(interiorLight1, { intensity: 4.0, duration: 0.8 });
      gsap.to(interiorLight2, { intensity: 3.5, duration: 0.8 });
      gsap.to(spotLight, { intensity: 4.5, duration: 0.8 });
    } else {
      // Day mode: Bright sunlight, softer interior lights
      gsap.to(dirLight, { intensity: 2.8, duration: 0.8 });
      gsap.to(hemiLight, { intensity: 1.2, duration: 0.8 });
      gsap.to(interiorLight1, { intensity: 1.0, duration: 0.8 });
      gsap.to(interiorLight2, { intensity: 0.8, duration: 0.8 });
      gsap.to(spotLight, { intensity: 1.0, duration: 0.8 });
    }
  }, [lightingMode]);

  // 4. Shading Mode Transitions (Solid vs Blueprint)
  useEffect(() => {
    if (!buildingGroupRef.current) return;

    buildingGroupRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (isBlueprintMode) {
          child.material = new THREE.MeshStandardMaterial({
            color: 0x0a1c36,
            wireframe: false,
            transparent: true,
            opacity: 0.35,
            metalness: 0.8,
            roughness: 0.2,
          });
        } else {
          // Restore PBR materials
          if (child.name === 'structure_column') {
            child.material = materialsRef.current.columnTealMat;
          } else if (child.geometry.type === 'BoxGeometry') {
            child.material = materialsRef.current.wallWhiteMat;
          }
        }
      }
    });
  }, [isBlueprintMode]);

  // 5. Camera View Presets
  const setPreset = (preset: 'iso' | 'front' | 'top') => {
    setCurrentPreset(preset);
    if (preset === 'iso') {
      targetRotationRef.current = { x: 0.35, y: 0.85 };
    } else if (preset === 'front') {
      targetRotationRef.current = { x: 0.05, y: 0 };
    } else if (preset === 'top') {
      targetRotationRef.current = { x: 0.75, y: 0.45 };
    }
  };

  // 6. Pointer & Touch Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isPointerDownRef.current = true;
    previousPointerPosRef.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;

    const deltaX = e.clientX - previousPointerPosRef.current.x;
    const deltaY = e.clientY - previousPointerPosRef.current.y;

    targetRotationRef.current.y += deltaX * 0.007;
    targetRotationRef.current.x = THREE.MathUtils.clamp(
      targetRotationRef.current.x + deltaY * 0.005,
      -0.1,
      0.75
    );

    previousPointerPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isPointerDownRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture was already released
    }
  };

  // Graceful Static Fallback If WebGL is Disabled or Fails
  if (!webGLSupported) {
    return (
      <div className={`relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-700/80 shadow-2xl ${className}`}>
        <div className="relative h-80 sm:h-96 md:h-[420px] w-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
            alt="Contemporary residential architecture design concept"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070D1E] via-[#070D1E]/40 to-transparent" />
          
          <div className="absolute top-3 left-3 bg-[#070D1E]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-teal-500/40 text-[11px] font-mono text-teal-300 flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>High-Res Architectural Visualization</span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300">
            * 3D WebGL preview running in standard high-performance static rendering mode.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#09132B] via-[#070D1E] to-[#040812] border border-teal-500/40 shadow-2xl ${className}`}>
      
      {/* 3D WebGL Canvas */}
      <div
        ref={mountRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="w-full h-80 sm:h-96 md:h-[430px] cursor-grab active:cursor-grabbing touch-none select-none relative"
        title="Touch or drag with mouse to orbit the 3D model"
      />

      {/* Top HUD Overlay */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 bg-[#070D1E]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-teal-500/30 pointer-events-auto shadow-md">
          <div className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
          <span className="text-[11px] font-mono text-teal-300 font-bold uppercase tracking-wider">
            3D Structural Model
          </span>
          <span className="text-[10px] text-slate-400 border-l border-slate-700 pl-2">
            G+1 Boisar Design
          </span>
        </div>

        {/* Lighting Mode Pill */}
        <div className="flex items-center gap-1 bg-[#070D1E]/90 backdrop-blur-md p-1 rounded-xl border border-slate-700 pointer-events-auto shadow-md">
          <button
            type="button"
            onClick={() => setLightingMode('day')}
            className={`p-1.5 rounded-lg text-xs transition-colors ${
              lightingMode === 'day' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400 hover:text-white'
            }`}
            title="Daylight Mode"
          >
            <Sun className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setLightingMode('dusk')}
            className={`p-1.5 rounded-lg text-xs transition-colors ${
              lightingMode === 'dusk' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40' : 'text-slate-400 hover:text-white'
            }`}
            title="Dusk / Illuminated Villa Mode"
          >
            <Moon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Camera View Angle Presets (Top Right) */}
      <div className="absolute top-14 right-3 flex flex-col gap-1 pointer-events-auto">
        <div className="bg-[#070D1E]/90 backdrop-blur-md p-1 rounded-xl border border-slate-800 flex flex-col gap-1 text-[10px] font-mono shadow-lg">
          <button
            type="button"
            onClick={() => setPreset('iso')}
            className={`px-2 py-1 rounded transition-colors text-left flex items-center justify-between gap-1.5 ${
              currentPreset === 'iso' ? 'bg-teal-400 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>Perspective</span>
            {currentPreset === 'iso' && <Check className="w-2.5 h-2.5" />}
          </button>
          <button
            type="button"
            onClick={() => setPreset('front')}
            className={`px-2 py-1 rounded transition-colors text-left flex items-center justify-between gap-1.5 ${
              currentPreset === 'front' ? 'bg-teal-400 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>Elevation</span>
            {currentPreset === 'front' && <Check className="w-2.5 h-2.5" />}
          </button>
          <button
            type="button"
            onClick={() => setPreset('top')}
            className={`px-2 py-1 rounded transition-colors text-left flex items-center justify-between gap-1.5 ${
              currentPreset === 'top' ? 'bg-teal-400 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>Site Layout</span>
            {currentPreset === 'top' && <Check className="w-2.5 h-2.5" />}
          </button>
        </div>
      </div>

      {/* Bottom Floating Control Bar */}
      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
        
        {/* Shading & Rotation Controls */}
        <div className="flex items-center gap-1.5 bg-[#070D1E]/95 backdrop-blur-md p-1.5 rounded-xl border border-slate-700/80 shadow-lg">
          <button
            type="button"
            onClick={() => setIsBlueprintMode(!isBlueprintMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              isBlueprintMode
                ? 'bg-teal-400 text-slate-950 shadow-md shadow-teal-950/40'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
            title="Toggle Structural Blueprint X-Ray view"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="text-[11px]">{isBlueprintMode ? 'Blueprint Mode' : 'Solid Mode'}</span>
          </button>

          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-1.5 rounded-lg text-xs transition-colors ${
              autoRotate ? 'text-teal-400 bg-slate-800' : 'text-slate-400 hover:text-white'
            }`}
            title="Toggle Auto-Rotation"
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin-slow' : ''}`} />
          </button>
        </div>

        {/* Engineering Specs Watermark */}
        <div className="hidden sm:flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-slate-800 text-[10px] font-mono text-teal-400">
          <Sparkles className="w-3 h-3 text-teal-400" />
          <span>Touch & Drag to Inspect</span>
        </div>

      </div>

    </div>
  );
};
