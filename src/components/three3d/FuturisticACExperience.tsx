import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  Layers,
  Eye,
  ThermometerSnowflake,
  RotateCcw,
  Zap,
  Cpu,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  Sparkles,
  Phone,
  Wrench,
  CheckCircle2,
  Camera
} from 'lucide-react';
import { Language } from '../../data/translations';
import { createTelUrl } from '../../lib/utils';

interface FuturisticACExperienceProps {
  language: Language;
  onOpenBooking: (serviceId?: string) => void;
  className?: string;
  isHeroCompact?: boolean;
}

type ViewMode = 'standard' | 'exploded' | 'thermal';
type CameraPreset = 'default' | 'angle' | 'pcb' | 'blower';

export const FuturisticACExperience: React.FC<FuturisticACExperienceProps> = ({
  language,
  onOpenBooking,
  className = '',
  isHeroCompact = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  // UI Interactive States
  const [viewMode, setViewMode] = useState<ViewMode>('standard');
  const [explodedRatio, setExplodedRatio] = useState<number>(0); // 0 to 1
  const [fanSpeed, setFanSpeed] = useState<'turbo' | 'eco' | 'pause'>('turbo');
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('default');
  const [dockCollapsed, setDockCollapsed] = useState<boolean>(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // References for render loop state updates
  const sceneStateRef = useRef({
    viewMode: 'standard' as ViewMode,
    targetExploded: 0,
    currentExploded: 0,
    fanSpeed: 'turbo' as 'turbo' | 'eco' | 'pause',
    targetCamPos: new THREE.Vector3(0, 1.2, 7.5),
    targetLookAt: new THREE.Vector3(0, 0, 0),
  });

  // Keep ref in sync with state
  useEffect(() => {
    sceneStateRef.current.viewMode = viewMode;
    sceneStateRef.current.fanSpeed = fanSpeed;
    if (viewMode === 'exploded') {
      sceneStateRef.current.targetExploded = Math.max(explodedRatio, 0.7);
    } else {
      sceneStateRef.current.targetExploded = explodedRatio;
    }
  }, [viewMode, explodedRatio, fanSpeed]);

  // Handle camera presets
  const handleSelectPreset = (preset: CameraPreset) => {
    setCameraPreset(preset);
    const s = sceneStateRef.current;
    if (preset === 'default') {
      s.targetCamPos.set(0, 0.8, 7.2);
      s.targetLookAt.set(0, 0, 0);
    } else if (preset === 'angle') {
      s.targetCamPos.set(5.5, 2.2, 5.5);
      s.targetLookAt.set(0, 0, 0);
    } else if (preset === 'pcb') {
      s.targetCamPos.set(2.8, 0.6, 2.4);
      s.targetLookAt.set(2.2, 0.2, 0);
      setActiveHotspot('pcb');
    } else if (preset === 'blower') {
      s.targetCamPos.set(-2.0, -0.6, 3.2);
      s.targetLookAt.set(-1.0, -0.5, 0);
      setActiveHotspot('blower');
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 800;
    let height = container.clientHeight || 500;

    // Detect headless environment
    const isHeadless =
      typeof navigator !== 'undefined' &&
      (navigator.webdriver || /HeadlessChrome/i.test(navigator.userAgent));

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = null; // Transparent to blend seamlessly into dark background

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.8, 7.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isHeadless,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isHeadless ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isHeadless;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 2. Studio Environment Reflection (RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 3. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    // Keep touch gestures inside the 3D viewer. Without this, mobile browsers
    // may treat a finger drag as page scrolling and interrupt model inspection.
    controls.enablePan = false;
    controls.touches.ONE = THREE.TOUCH.ROTATE;
    controls.touches.TWO = THREE.TOUCH.DOLLY_ROTATE;
    renderer.domElement.style.touchAction = 'none';
    renderer.domElement.style.webkitTapHighlightColor = 'transparent';
    controls.minDistance = 3.2;
    controls.maxDistance = 14;
    controls.maxPolarAngle = Math.PI / 2 + 0.15; // Don't flip under ground
    controls.target.set(0, 0, 0);

    // 4. Lighting Rig (Key, Fill, Rim)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(4, 6, 5);
    keyLight.castShadow = !isHeadless;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.4); // Cool cyan fill
    fillLight.position.set(-5, 2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x06b6d4, 2.2); // Electric cyan rim
    rimLight.position.set(0, 4, -5);
    scene.add(rimLight);

    const hemiLight = new THREE.HemisphereLight(0xe0f2fe, 0x0f172a, 0.8);
    scene.add(hemiLight);

    // 5. Build Procedural 3D Model of Inverter AC Unit (Composite 3-12 parts)
    const acRootGroup = new THREE.Group();
    scene.add(acRootGroup);

    // Reusable Materials
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.35,
      roughness: 0.3,
    });

    const frontCoverMat = new THREE.MeshPhysicalMaterial({
      color: 0xf8fafc,
      metalness: 0.1,
      roughness: 0.18,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
    });

    const louverMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.5,
      roughness: 0.25,
    });

    const copperCoilMat = new THREE.MeshStandardMaterial({
      color: 0xc86432, // Pure refined copper
      metalness: 0.95,
      roughness: 0.18,
    });

    const aluminumFinMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.85,
      roughness: 0.3,
    });

    const blowerMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.6,
      roughness: 0.4,
    });

    const pcbSubstrateMat = new THREE.MeshStandardMaterial({
      color: 0x042f2e, // Deep emerald FR4 PCB
      metalness: 0.3,
      roughness: 0.5,
    });

    const goldPinMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      metalness: 0.95,
      roughness: 0.15,
    });

    const chipMat = new THREE.MeshStandardMaterial({
      color: 0x09090b,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.4,
    });

    // 5.1 Main Chassis / Backplate
    const chassisGeo = new THREE.BoxGeometry(4.4, 1.4, 0.8);
    const chassisMesh = new THREE.Mesh(chassisGeo, chassisMat);
    chassisMesh.position.set(0, 0, -0.3);
    chassisMesh.castShadow = !isHeadless;
    chassisMesh.receiveShadow = !isHeadless;
    acRootGroup.add(chassisMesh);

    // Wall mounting bracket detail
    const bracketGeo = new THREE.BoxGeometry(4.2, 0.15, 0.05);
    const bracketMesh = new THREE.Mesh(bracketGeo, aluminumFinMat);
    bracketMesh.position.set(0, 0.4, -0.72);
    acRootGroup.add(bracketMesh);

    // 5.2 Front Aerodynamic Cover (Moves on Exploded Z+)
    const frontCoverGroup = new THREE.Group();
    const coverGeo = new THREE.BoxGeometry(4.45, 1.35, 0.4);
    const coverMesh = new THREE.Mesh(coverGeo, frontCoverMat);
    coverMesh.position.set(0, 0, 0.25);
    coverMesh.castShadow = !isHeadless;
    frontCoverGroup.add(coverMesh);

    // Modern trim accent line
    const trimGeo = new THREE.BoxGeometry(4.46, 0.04, 0.42);
    const trimMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.5,
    });
    const trimMesh = new THREE.Mesh(trimGeo, trimMat);
    trimMesh.position.set(0, -0.4, 0.26);
    frontCoverGroup.add(trimMesh);

    // Dynamic LED HUD Display on Front Fascia
    const hudCanvas = document.createElement('canvas');
    hudCanvas.width = 512;
    hudCanvas.height = 128;
    const hudCtx = hudCanvas.getContext('2d');
    const hudTexture = new THREE.CanvasTexture(hudCanvas);
    hudTexture.colorSpace = THREE.SRGBColorSpace;
    hudTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const drawHUD = (temp: number, hz: number, modeText: string) => {
      if (!hudCtx) return;
      hudCtx.fillStyle = '#090d16';
      hudCtx.fillRect(0, 0, 512, 128);

      // Cyber grid border
      hudCtx.strokeStyle = '#06b6d4';
      hudCtx.lineWidth = 4;
      hudCtx.strokeRect(4, 4, 504, 120);

      // Brand
      hudCtx.fillStyle = '#38bdf8';
      hudCtx.font = 'bold 22px monospace';
      hudCtx.fillText('ABC AIR CARE', 24, 38);

      // Big Temp
      hudCtx.fillStyle = '#ffffff';
      hudCtx.font = '900 64px monospace';
      hudCtx.fillText(`${temp}°C`, 24, 104);

      // Inverter Telemetry
      hudCtx.fillStyle = '#06b6d4';
      hudCtx.font = 'bold 22px monospace';
      hudCtx.fillText(`INV: ${hz}Hz`, 240, 48);

      hudCtx.fillStyle = '#10b981';
      hudCtx.font = 'bold 22px monospace';
      hudCtx.fillText('R32: 125 PSI', 240, 80);

      hudCtx.fillStyle = '#f59e0b';
      hudCtx.font = 'bold 18px monospace';
      hudCtx.fillText(modeText, 240, 108);

      hudTexture.needsUpdate = true;
    };
    drawHUD(16, 65, 'AI SMART ECO');

    const hudPlaneGeo = new THREE.PlaneGeometry(1.4, 0.35);
    const hudPlaneMat = new THREE.MeshBasicMaterial({
      map: hudTexture,
      transparent: true,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
    const hudPlaneMesh = new THREE.Mesh(hudPlaneGeo, hudPlaneMat);
    hudPlaneMesh.position.set(1.2, 0.15, 0.46);
    frontCoverGroup.add(hudPlaneMesh);

    acRootGroup.add(frontCoverGroup);

    // 5.3 Motorized Airflow Louvers (Front bottom)
    const louverGroup = new THREE.Group();
    louverGroup.position.set(0, -0.55, 0.35);
    const louverFinGeo = new THREE.BoxGeometry(4.1, 0.04, 0.3);
    const louverFin = new THREE.Mesh(louverFinGeo, louverMat);
    louverGroup.add(louverFin);
    acRootGroup.add(louverGroup);

    // 5.4 Evaporator Core with Aluminum Micro-Fins & Copper Manifold Tubes
    const evaporatorGroup = new THREE.Group();
    evaporatorGroup.position.set(0, 0.1, 0.05);

    const finBlockGeo = new THREE.BoxGeometry(3.6, 0.75, 0.3);
    const finBlock = new THREE.Mesh(finBlockGeo, aluminumFinMat);
    evaporatorGroup.add(finBlock);

    // Copper manifold loops (U-bend headers on left & right)
    for (let i = 0; i < 4; i++) {
      const yOffset = -0.24 + i * 0.16;
      // Right U-bend
      const loopGeoR = new THREE.TorusGeometry(0.08, 0.03, 8, 16, Math.PI);
      const loopMeshR = new THREE.Mesh(loopGeoR, copperCoilMat);
      loopMeshR.position.set(1.82, yOffset, 0);
      loopMeshR.rotation.z = -Math.PI / 2;
      evaporatorGroup.add(loopMeshR);

      // Left U-bend
      const loopMeshL = new THREE.Mesh(loopGeoR, copperCoilMat);
      loopMeshL.position.set(-1.82, yOffset, 0);
      loopMeshL.rotation.z = Math.PI / 2;
      evaporatorGroup.add(loopMeshL);

      // Long copper lines traversing the core
      const pipeGeo = new THREE.CylinderGeometry(0.03, 0.03, 3.65, 12);
      const pipeMesh = new THREE.Mesh(pipeGeo, copperCoilMat);
      pipeMesh.rotation.z = Math.PI / 2;
      pipeMesh.position.set(0, yOffset + 0.04, 0.12);
      evaporatorGroup.add(pipeMesh);
    }
    acRootGroup.add(evaporatorGroup);

    // 5.5 High-Velocity Cross-Flow Turbine Blower Impeller
    const blowerGroup = new THREE.Group();
    blowerGroup.position.set(0, -0.35, -0.05);

    // Central core rod
    const shaftGeo = new THREE.CylinderGeometry(0.04, 0.04, 3.6, 12);
    const shaftMesh = new THREE.Mesh(shaftGeo, blowerMat);
    shaftMesh.rotation.z = Math.PI / 2;
    blowerGroup.add(shaftMesh);

    // Radial Impeller Blades
    const bladeGroup = new THREE.Group();
    for (let b = 0; b < 16; b++) {
      const angle = (b / 16) * Math.PI * 2;
      const bladeGeo = new THREE.BoxGeometry(3.5, 0.015, 0.12);
      const bladeMesh = new THREE.Mesh(bladeGeo, blowerMat);
      bladeMesh.position.set(0, Math.cos(angle) * 0.18, Math.sin(angle) * 0.18);
      bladeMesh.rotation.x = angle + 0.35; // Aerodynamic curved pitch
      bladeGroup.add(bladeMesh);
    }
    blowerGroup.add(bladeGroup);
    acRootGroup.add(blowerGroup);

    // 5.6 Inverter PCB Motherboard Electronics Module (Right Bay)
    const pcbGroup = new THREE.Group();
    pcbGroup.position.set(2.0, 0, 0.1);

    // Substrate
    const pcbGeo = new THREE.BoxGeometry(0.04, 0.9, 0.6);
    const pcbMesh = new THREE.Mesh(pcbGeo, pcbSubstrateMat);
    pcbGroup.add(pcbMesh);

    // Microprocessor Chip (IPM / MCU)
    const mcuGeo = new THREE.BoxGeometry(0.08, 0.28, 0.28);
    const mcuMesh = new THREE.Mesh(mcuGeo, chipMat);
    mcuMesh.position.set(0.03, 0.08, 0.05);
    pcbGroup.add(mcuMesh);

    // High-voltage capacitors
    for (let c = 0; c < 3; c++) {
      const capGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.2, 16);
      const capMat = new THREE.MeshStandardMaterial({
        color: 0x1e3a8a,
        metalness: 0.8,
        roughness: 0.25,
      });
      const capMesh = new THREE.Mesh(capGeo, capMat);
      capMesh.position.set(0.06, -0.22, -0.15 + c * 0.14);
      pcbGroup.add(capMesh);
    }

    // Heat sink aluminum block
    const heatsinkGeo = new THREE.BoxGeometry(0.08, 0.35, 0.15);
    const heatsinkMesh = new THREE.Mesh(heatsinkGeo, aluminumFinMat);
    heatsinkMesh.position.set(0.05, 0.2, -0.15);
    pcbGroup.add(heatsinkMesh);

    // Gold contact pins
    const pinsGeo = new THREE.BoxGeometry(0.06, 0.03, 0.4);
    const pinsMesh = new THREE.Mesh(pinsGeo, goldPinMat);
    pinsMesh.position.set(0.04, -0.38, 0);
    pcbGroup.add(pinsMesh);

    acRootGroup.add(pcbGroup);

    // 5.7 Cryogenic Airflow Stream Particles (Flowing outward in 3D)
    const streamParticleCount = 120;
    const streamGeo = new THREE.BufferGeometry();
    const streamPositions = new Float32Array(streamParticleCount * 3);
    const streamOpacities = new Float32Array(streamParticleCount);

    for (let i = 0; i < streamParticleCount; i++) {
      streamPositions[i * 3] = (Math.random() - 0.5) * 3.6; // Width along louver
      streamPositions[i * 3 + 1] = -0.6 - Math.random() * 1.5; // Downward curve
      streamPositions[i * 3 + 2] = 0.5 + Math.random() * 3.5; // Outward into room
      streamOpacities[i] = Math.random();
    }
    streamGeo.setAttribute('position', new THREE.BufferAttribute(streamPositions, 3));

    // Particle texture
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d');
    if (pCtx) {
      const grad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(6, 182, 212, 0.9)');
      grad.addColorStop(0.8, 'rgba(14, 165, 233, 0.3)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 32, 32);
    }
    const streamTexture = new THREE.CanvasTexture(pCanvas);

    const streamMaterial = new THREE.PointsMaterial({
      size: 0.16,
      map: streamTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0x38bdf8,
    });
    const airflowParticles = new THREE.Points(streamGeo, streamMaterial);
    acRootGroup.add(airflowParticles);

    // 5.8 Soft Contact Shadow Grounding
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const g = sCtx.createRadialGradient(128, 128, 20, 128, 128, 120);
      g.addColorStop(0, 'rgba(0, 0, 0, 0.65)');
      g.addColorStop(0.5, 'rgba(0, 0, 0, 0.25)');
      g.addColorStop(1, 'rgba(0, 0, 0, 0)');
      sCtx.fillStyle = g;
      sCtx.fillRect(0, 0, 256, 256);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(6, 2.5);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.6,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.set(0, -1.35, 0.1);
    acRootGroup.add(shadowPlane);

    // Allow users to drag individual AC components in exploded/X-Ray mode.
    // User offsets are kept separately so the animation loop never overwrites a drag.
    const draggableParts = new Set<THREE.Group>([
      frontCoverGroup, louverGroup, evaporatorGroup, blowerGroup, pcbGroup,
    ]);
    const partOffsets = new Map<THREE.Group, THREE.Vector3>();
    draggableParts.forEach((part) => partOffsets.set(part, new THREE.Vector3()));
    const raycaster = new THREE.Raycaster();
    const pointerNdc = new THREE.Vector2();
    const dragPlane = new THREE.Plane();
    const dragPlaneNormal = new THREE.Vector3();
    const dragStartPoint = new THREE.Vector3();
    const dragStartOffset = new THREE.Vector3();
    let draggedPart: THREE.Group | null = null;

    const updatePointerRay = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointerNdc.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1,
      );
      raycaster.setFromCamera(pointerNdc, camera);
    };

    const handlePartPointerDown = (event: PointerEvent) => {
      if (sceneStateRef.current.viewMode !== 'exploded') return;
      updatePointerRay(event);
      const hits = raycaster.intersectObject(acRootGroup, true);
      for (const hit of hits) {
        let node: THREE.Object3D | null = hit.object;
        while (node && node.parent !== acRootGroup) node = node.parent;
        if (node && draggableParts.has(node as THREE.Group)) {
          draggedPart = node as THREE.Group;
          controls.enabled = false;
          renderer.domElement.setPointerCapture(event.pointerId);
          draggedPart.getWorldPosition(dragStartPoint);
          camera.getWorldDirection(dragPlaneNormal);
          dragPlane.setFromNormalAndCoplanarPoint(dragPlaneNormal, dragStartPoint);
          raycaster.ray.intersectPlane(dragPlane, dragStartPoint);
          dragStartOffset.copy(partOffsets.get(draggedPart)!);
          event.preventDefault();
          return;
        }
      }
    };

    const handlePartPointerMove = (event: PointerEvent) => {
      if (!draggedPart) return;
      updatePointerRay(event);
      const point = new THREE.Vector3();
      if (!raycaster.ray.intersectPlane(dragPlane, point)) return;
      const offset = partOffsets.get(draggedPart)!;
      offset.copy(dragStartOffset).add(point.sub(dragStartPoint));
    };

    const handlePartPointerUp = () => {
      if (!draggedPart) return;
      draggedPart = null;
      controls.enabled = true;
    };

    renderer.domElement.addEventListener('pointerdown', handlePartPointerDown);
    renderer.domElement.addEventListener('pointermove', handlePartPointerMove);
    renderer.domElement.addEventListener('pointerup', handlePartPointerUp);
    renderer.domElement.addEventListener('pointercancel', handlePartPointerUp);

    const applyPartPosition = (part: THREE.Group, x: number, y: number, z: number) => {
      const offset = partOffsets.get(part)!;
      part.position.set(x + offset.x, y + offset.y, z + offset.z);
    };

    // 6. Pre-allocate math helpers to avoid per-frame GC allocations
    const _vec3 = new THREE.Vector3();

    // 7. Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 800;
      height = container.clientHeight || 500;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 8. Animation & Kinematics Loop
    let animId: number;
    const clock = new THREE.Clock();

    let blowerRotationSpeed = 8;
    let louverOscillation = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();
      const state = sceneStateRef.current;

      // 8.1 Smooth Damping for Exploded Ratio
      state.currentExploded = THREE.MathUtils.damp(
        state.currentExploded,
        state.targetExploded,
        6,
        delta
      );
      const exp = state.currentExploded;

      // Front cover moves forward on Z
      applyPartPosition(frontCoverGroup, 0, THREE.MathUtils.lerp(0, 0.2, exp), THREE.MathUtils.lerp(0, 1.4, exp));

      // Louver shifts downward
      applyPartPosition(louverGroup, 0, THREE.MathUtils.lerp(-0.55, -1.0, exp), THREE.MathUtils.lerp(0.35, 0.9, exp));

      // Evaporator core moves forward & up
      applyPartPosition(evaporatorGroup, 0, 0.1, THREE.MathUtils.lerp(0.05, 0.5, exp));

      // Blower turbine drops forward and down
      applyPartPosition(blowerGroup, 0, THREE.MathUtils.lerp(-0.35, -0.7, exp), THREE.MathUtils.lerp(-0.05, 0.4, exp));

      // Inverter PCB glides right & pivots outward
      applyPartPosition(pcbGroup, THREE.MathUtils.lerp(2.0, 3.1, exp), 0, THREE.MathUtils.lerp(0.1, 0.7, exp));
      pcbGroup.rotation.y = THREE.MathUtils.lerp(0, -Math.PI / 5, exp);

      // 8.2 Blower Turbine Rotation
      let targetRotSpeed = 12;
      if (state.fanSpeed === 'eco') targetRotSpeed = 6;
      if (state.fanSpeed === 'pause') targetRotSpeed = 0;
      blowerRotationSpeed = THREE.MathUtils.damp(blowerRotationSpeed, targetRotSpeed, 4, delta);
      bladeGroup.rotation.x += blowerRotationSpeed * delta;

      // Louver oscillation in normal mode
      if (state.fanSpeed !== 'pause' && state.viewMode === 'standard') {
        louverOscillation = Math.sin(elapsed * 1.5) * 0.25;
        louverGroup.rotation.x = 0.2 + louverOscillation;
      } else {
        louverGroup.rotation.x = THREE.MathUtils.damp(louverGroup.rotation.x, 0.35, 4, delta);
      }

      // 8.3 Airflow Particles Flowing Out
      if (state.fanSpeed !== 'pause') {
        const streamPos = streamGeo.attributes.position as THREE.BufferAttribute;
        const arr = streamPos.array as Float32Array;
        for (let i = 0; i < streamParticleCount; i++) {
          const i3 = i * 3;
          arr[i3 + 2] += (blowerRotationSpeed * 0.35 + 1.2) * delta; // Forward
          arr[i3 + 1] -= (0.4 + Math.sin(elapsed * 2 + i) * 0.2) * delta; // Downward spread
          arr[i3] += Math.sin(elapsed * 3 + i) * 0.02; // Subtle vortex drift

          // Reset when particle reaches room distance
          if (arr[i3 + 2] > 4.2) {
            arr[i3 + 2] = 0.4 + Math.random() * 0.3;
            arr[i3 + 1] = -0.55 + (Math.random() - 0.5) * 0.15;
            arr[i3] = (Math.random() - 0.5) * 3.4;
          }
        }
        streamPos.needsUpdate = true;
        airflowParticles.visible = true;
      } else {
        airflowParticles.visible = false;
      }

      // 8.4 Thermal Diagnostic Color Modulation
      if (state.viewMode === 'thermal') {
        // Refrigerant coils pulse with cryogenic blue
        copperCoilMat.color.setHex(0x00ffff);
        copperCoilMat.emissive.setHex(0x0284c7);
        copperCoilMat.emissiveIntensity = 0.6 + Math.sin(elapsed * 4) * 0.2;

        aluminumFinMat.color.setHex(0x38bdf8);
        aluminumFinMat.emissive.setHex(0x0369a1);
        aluminumFinMat.emissiveIntensity = 0.4;

        chipMat.emissive.setHex(0x10b981);
        chipMat.emissiveIntensity = 0.8 + Math.sin(elapsed * 6) * 0.3;
      } else {
        copperCoilMat.color.setHex(0xc86432);
        copperCoilMat.emissive.setHex(0x000000);
        copperCoilMat.emissiveIntensity = 0;

        aluminumFinMat.color.setHex(0x94a3b8);
        aluminumFinMat.emissive.setHex(0x000000);
        aluminumFinMat.emissiveIntensity = 0;

        chipMat.emissive.setHex(0x06b6d4);
        chipMat.emissiveIntensity = 0.4;
      }

      // 8.5 Camera Target Interpolation
      camera.position.lerp(state.targetCamPos, 0.04);
      controls.target.lerp(state.targetLookAt, 0.04);
      controls.update();

      // Render frame
      renderer.render(scene, camera);
    };

    // Pre-warm shaders
    renderer.compile(scene, camera);
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', handlePartPointerDown);
      renderer.domElement.removeEventListener('pointermove', handlePartPointerMove);
      renderer.domElement.removeEventListener('pointerup', handlePartPointerUp);
      renderer.domElement.removeEventListener('pointercancel', handlePartPointerUp);
      controls.dispose();

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Complete resource disposal
      chassisGeo.dispose();
      bracketGeo.dispose();
      coverGeo.dispose();
      trimGeo.dispose();
      hudPlaneGeo.dispose();
      louverFinGeo.dispose();
      finBlockGeo.dispose();
      shaftGeo.dispose();
      pcbGeo.dispose();
      mcuGeo.dispose();
      heatsinkGeo.dispose();
      pinsGeo.dispose();
      streamGeo.dispose();
      shadowGeo.dispose();

      chassisMat.dispose();
      frontCoverMat.dispose();
      louverMat.dispose();
      copperCoilMat.dispose();
      aluminumFinMat.dispose();
      blowerMat.dispose();
      pcbSubstrateMat.dispose();
      goldPinMat.dispose();
      chipMat.dispose();
      trimMat.dispose();
      hudPlaneMat.dispose();
      streamMaterial.dispose();
      shadowMat.dispose();

      hudTexture.dispose();
      streamTexture.dispose();
      shadowTex.dispose();

      renderer.dispose();
    };
  }, []);

  return (
    <div
      className={`relative w-full rounded-3xl overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-slate-800 shadow-2xl ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : className
      }`}
      style={{ minHeight: isHeroCompact ? '420px' : '580px' }}
    >
      {/* 3D WebGL Canvas Mount Container */}
      <div ref={mountRef} className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* Top Left Title & Live Telemetry Badge (Unobtrusive) */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 pointer-events-none space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs font-bold shadow-lg pointer-events-auto">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>{language === 'roman' ? 'Futuristic 3D AC X-Ray & Hologram' : 'Futuristic 3D Inverter AC Hologram'}</span>
        </div>

        <div className="hidden sm:block">
          <h3 className="text-white font-extrabold text-lg sm:text-xl font-display tracking-tight drop-shadow-md">
            {language === 'roman' ? 'Inverter AC Ka 3D Internal Architecture' : 'Precision Inverter Engineering in 3D'}
          </h3>
          <p className="text-slate-400 text-xs max-w-sm mt-0.5 leading-relaxed drop-shadow">
            {language === 'roman'
              ? 'Mouse ya touch se 360° ghumayein. Exploded view me Blower, Copper Coils aur Inverter PCB check karein.'
              : 'Drag to inspect 360°. Toggle Exploded X-Ray to inspect the cross-flow turbine, copper coils, and inverter motherboard.'}
          </p>
        </div>
      </div>

      {/* Top Right Quick Fullscreen & Reset Controls */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center gap-2">
        <button
          type="button"
          onClick={() => handleSelectPreset('default')}
          className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs transition-colors shadow-md flex items-center gap-1.5 cursor-pointer"
          title="Reset Camera"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{language === 'roman' ? 'Reset' : 'Reset View'}</span>
        </button>

        <button
          type="button"
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs transition-colors shadow-md cursor-pointer"
          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen 3D'}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Active Component Telemetry Card (Shown when clicking PCB / Blower presets) */}
      {activeHotspot && (
        <div className="absolute top-24 right-4 sm:right-6 z-20 max-w-xs bg-slate-900/95 border border-cyan-500/50 rounded-2xl p-4 shadow-2xl text-xs space-y-2 animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold text-cyan-400 flex items-center gap-1.5">
              {activeHotspot === 'pcb' ? <Cpu className="w-4 h-4" /> : <Wrench className="w-4 h-4" />}
              <span>{activeHotspot === 'pcb' ? 'Inverter Motherboard PCB' : 'Turbine Cross-Flow Blower'}</span>
            </span>
            <button
              onClick={() => setActiveHotspot(null)}
              className="text-slate-400 hover:text-white cursor-pointer"
            >
              ✕
            </button>
          </div>
          <p className="text-slate-300 leading-relaxed text-[11px]">
            {activeHotspot === 'pcb'
              ? language === 'roman'
                ? 'High-speed IPM gate driver aur capacitors jo inverter frequency ko 15Hz se 85Hz control karte hain. Kharab hone par E6/F1 error ata hai.'
                : 'Intelligent IPM power inverter module modulating 15Hz to 85Hz compressor speeds. Repaired in our electronics ESD lab.'
              : language === 'roman'
                ? 'Curved aerodynamic blades jo 35% ziada thandi hawa phainkte hain. Master Jet Wash se iski mitti aur fungus saaf hoti hai.'
                : '16-vane high-velocity cylindrical impeller restoring laminar airflow once cleaned via Master Chemical Jet Wash.'}
          </p>
          <button
            onClick={() => {
              if (activeHotspot === 'pcb') onOpenBooking('inverter-pcb-repair');
              else onOpenBooking('ac-general-service');
            }}
            className="w-full py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg text-center cursor-pointer transition-colors text-[11px]"
          >
            {language === 'roman' ? 'Is Component Ka Kaam Book Karein' : 'Book Service For This Part'}
          </button>
        </div>
      )}

      {/* Collapsible Unified Bottom Control Dock (Strictly Zero Viewport Occlusion) */}
      <div
        className={`absolute bottom-3 left-1/2 -translate-x-1/2 z-30 w-full px-3 max-w-4xl transition-all duration-300 ${
          dockCollapsed ? 'translate-y-[calc(100%-36px)]' : 'translate-y-0'
        }`}
      >
        <div className="bg-slate-900/95 border border-slate-700/80 rounded-2xl sm:rounded-3xl shadow-2xl p-3 sm:p-4 text-white">
          
          {/* Collapse / Expand Tab Button */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span>{language === 'roman' ? '3D Inspection Controls' : '3D Inspection Deck'}</span>
            </div>

            <button
              type="button"
              onClick={() => setDockCollapsed(!dockCollapsed)}
              className="text-xs text-slate-400 hover:text-cyan-400 flex items-center gap-1 font-semibold transition-colors cursor-pointer px-2 py-0.5 rounded-md hover:bg-slate-800"
            >
              {dockCollapsed ? (
                <>
                  <span>{language === 'roman' ? 'Controls Kholein' : 'Show Controls'}</span>
                  <ChevronUp className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  <span>{language === 'roman' ? 'Controls Chhupayein' : 'Hide Controls'}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>

          {/* Controls Body */}
          <div className="pt-3 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center">
            
            {/* View Mode Switcher Pills */}
            <div className="sm:col-span-5 flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setViewMode('standard');
                  setExplodedRatio(0);
                }}
                className={`btn-animated flex-1 py-1.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  viewMode === 'standard'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm btn-glow-cyan'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Eye className="w-3 h-3" />
                <span>{language === 'roman' ? 'Normal 3D' : 'Standard'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setViewMode('exploded');
                  if (explodedRatio === 0) setExplodedRatio(0.85);
                }}
                className={`btn-animated flex-1 py-1.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  viewMode === 'exploded'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm btn-glow-cyan'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3 h-3" />
                <span>{language === 'roman' ? 'X-Ray' : 'Exploded'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setViewMode('thermal');
                }}
                className={`btn-animated flex-1 py-1.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  viewMode === 'thermal'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm btn-glow-cyan'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ThermometerSnowflake className="w-3 h-3" />
                <span>{language === 'roman' ? 'Thermal' : 'Thermal'}</span>
              </button>
            </div>

            {/* Exploded Separation Slider */}
            <div className="sm:col-span-4 flex items-center gap-2">
              <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap">
                {language === 'roman' ? 'X-Ray Separation:' : 'Disassembly:'}
              </span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={explodedRatio}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setExplodedRatio(val);
                  if (val > 0.05 && viewMode === 'standard') {
                    setViewMode('exploded');
                  }
                }}
                className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
              <span className="text-cyan-400 text-xs font-mono font-bold w-9 text-right">
                {Math.round(explodedRatio * 100)}%
              </span>
            </div>

            {/* Quick Camera Presets & Speed */}
            <div className="sm:col-span-3 flex items-center justify-end gap-1.5">
              <button
                type="button"
                onClick={() => handleSelectPreset('pcb')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer flex items-center gap-1 ${
                  cameraPreset === 'pcb'
                    ? 'bg-cyan-950 border-cyan-500 text-cyan-300'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                }`}
                title="Focus on Inverter PCB"
              >
                <Cpu className="w-3 h-3 text-cyan-400" />
                <span>PCB</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectPreset('blower')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer flex items-center gap-1 ${
                  cameraPreset === 'blower'
                    ? 'bg-cyan-950 border-cyan-500 text-cyan-300'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                }`}
                title="Focus on Turbine Blower"
              >
                <Wrench className="w-3 h-3 text-cyan-400" />
                <span>Blower</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setFanSpeed(fanSpeed === 'turbo' ? 'eco' : fanSpeed === 'eco' ? 'pause' : 'turbo');
                }}
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-colors cursor-pointer flex items-center gap-1"
                title="Toggle Speed"
              >
                <Zap className="w-3 h-3 text-yellow-400" />
                <span className="uppercase text-[10px]">{fanSpeed}</span>
              </button>
            </div>

          </div>

          {/* Quick Hotline & Booking Strip inside Dock */}
          <div className="mt-3 pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
            <a
              href={createTelUrl('+923463902834')}
              className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Helpline: 0346 3902834</span>
            </a>

            <button
              onClick={() => onOpenBooking()}
              className="px-3.5 py-1.5 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 text-slate-950 font-extrabold rounded-lg text-xs shadow-md cursor-pointer transition-all flex items-center gap-1"
            >
              <span>{language === 'roman' ? 'Technician Book Karein' : 'Book Technician'}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
