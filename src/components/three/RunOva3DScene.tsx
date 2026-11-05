import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { 
  RotateCw, 
  Maximize2, 
  Eye, 
  Layers, 
  Info, 
  ChevronUp, 
  ChevronDown, 
  Compass,
  Sparkles
} from 'lucide-react';
import { createContactShadowTexture, createRingDialTexture } from './proceduralAssets';
import { AGENTS_DATA } from '../../data/agents';

interface RunOva3DSceneProps {
  onSelectAgent?: (agentId: string) => void;
  className?: string;
}

export const RunOva3DScene: React.FC<RunOva3DSceneProps> = ({ onSelectAgent, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>('kernel');
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(true);
  const [explodedAmount, setExplodedAmount] = useState<number>(0);
  const [isDockCollapsed, setIsDockCollapsed] = useState<boolean>(false);
  const [cameraMode, setCameraMode] = useState<'overview' | 'kernel' | 'agents' | 'iso'>('overview');

  // Mutable refs for Three.js animation loop without React re-renders
  const sceneStateRef = useRef({
    controls: null as OrbitControls | null,
    camera: null as THREE.PerspectiveCamera | null,
    explodedAmount: 0,
    isAutoRotate: true,
    agentMeshes: [] as { id: string; mesh: THREE.Group; basePos: THREE.Vector3; angle: number; speed: number }[],
    kernelGroup: null as THREE.Group | null,
    ring1: null as THREE.Mesh | null,
    ring2: null as THREE.Mesh | null,
    ring3: null as THREE.Mesh | null,
    coreInner: null as THREE.Mesh | null,
    targetCameraPos: new THREE.Vector3(0, 3.5, 9),
    targetLookAt: new THREE.Vector3(0, 0, 0),
    isInteracting: false,
  });

  // Sync state to mutable ref
  useEffect(() => {
    sceneStateRef.current.explodedAmount = explodedAmount;
    sceneStateRef.current.isAutoRotate = isAutoRotate;
  }, [explodedAmount, isAutoRotate]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect software WebGL as per Three.js directives
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFFFFFF);
    scene.fog = new THREE.Fog(0xFFFFFF, 12, 32);

    // 2. Camera Setup
    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3.8, 9.2);
    sceneStateRef.current.camera = camera;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 4. Studio Environment & Lighting
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Studio 3-Point Lighting Rig
    const keyLight = new THREE.DirectionalLight(0xFFFFFF, 2.2);
    keyLight.position.set(6, 10, 6);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.castShadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 25;
      keyLight.shadow.camera.left = -6;
      keyLight.shadow.camera.right = 6;
      keyLight.shadow.camera.top = 6;
      keyLight.shadow.camera.bottom = -6;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xEAEAEA, 1.2);
    fillLight.position.set(-6, 4, -4);
    scene.add(fillLight);

    const hemiLight = new THREE.HemisphereLight(0xFFFFFF, 0xEAEAEA, 0.9);
    scene.add(hemiLight);

    // 5. Ground Contact Shadow & Technical Floor Grid
    const contactTexture = createContactShadowTexture();
    const shadowGeo = new THREE.PlaneGeometry(7.5, 7.5);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: contactTexture,
      transparent: true,
      depthWrite: false,
      opacity: 0.75,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.65;
    scene.add(shadowMesh);

    // Subtle Architectural Floor Concentric Rings
    const floorRingsGroup = new THREE.Group();
    floorRingsGroup.position.y = -1.64;
    [2, 3.8, 5.5, 7.2].forEach((radius) => {
      const ringGeo = new THREE.RingGeometry(radius, radius + 0.012, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xEAEAEA,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = -Math.PI / 2;
      floorRingsGroup.add(ringMesh);
    });
    scene.add(floorRingsGroup);

    // 6. PROCEDURAL THREE.JS MODELS: The RunOva Central Business Kernel
    const kernelGroup = new THREE.Group();
    kernelGroup.position.y = 0.2;
    scene.add(kernelGroup);
    sceneStateRef.current.kernelGroup = kernelGroup;

    // A. Multi-Part Central Octahedral Monolith
    const coreInnerGeo = new THREE.OctahedronGeometry(0.85, 0);
    const coreInnerMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.92,
      roughness: 0.18,
    });
    const coreInner = new THREE.Mesh(coreInnerGeo, coreInnerMat);
    coreInner.castShadow = !isSoftwareGl;
    kernelGroup.add(coreInner);
    sceneStateRef.current.coreInner = coreInner;

    // Core Wireframe Cage
    const cageGeo = new THREE.BoxGeometry(1.35, 1.35, 1.35);
    const cageMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.8,
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    kernelGroup.add(cageMesh);

    // B. Concentric Gimbal Rings (Gimbal Policy Rules)
    const ringDialTex = createRingDialTexture();
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x222222,
      metalness: 0.85,
      roughness: 0.25,
      map: ringDialTex,
    });
    const ringGeo1 = new THREE.TorusGeometry(1.75, 0.035, 16, 100);
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2;
    kernelGroup.add(ring1);
    sceneStateRef.current.ring1 = ring1;

    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x444444,
      metalness: 0.8,
      roughness: 0.3,
    });
    const ringGeo2 = new THREE.TorusGeometry(2.15, 0.025, 16, 100);
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = Math.PI / 3;
    kernelGroup.add(ring2);
    sceneStateRef.current.ring2 = ring2;

    const ringGeo3 = new THREE.TorusGeometry(2.55, 0.02, 16, 100);
    const ringMat3 = new THREE.MeshStandardMaterial({
      color: 0x666666,
      metalness: 0.7,
      roughness: 0.35,
    });
    const ring3 = new THREE.Mesh(ringGeo3, ringMat3);
    ring3.rotation.y = Math.PI / 4;
    kernelGroup.add(ring3);
    sceneStateRef.current.ring3 = ring3;

    // 7. THE 6 SPECIALISED AI AGENTS (Satellites in 3D Orbits)
    const agentMeshes: { id: string; mesh: THREE.Group; basePos: THREE.Vector3; angle: number; speed: number }[] = [];
    const agentRadius = 3.65;

    AGENTS_DATA.forEach((agent, i) => {
      const angle = (i / AGENTS_DATA.length) * Math.PI * 2;
      const agentGroup = new THREE.Group();
      agentGroup.userData = { id: agent.id, name: agent.name };

      // Satellite Primary Silhouette: Geometric Hub
      const bodyGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.32, 6);
      const bodyMat = new THREE.MeshStandardMaterial({
        color: 0x111111,
        metalness: 0.9,
        roughness: 0.2,
      });
      const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
      bodyMesh.castShadow = !isSoftwareGl;
      agentGroup.add(bodyMesh);

      // Satellite Secondary Silhouette: Autonomous Sensor Ring
      const haloGeo = new THREE.TorusGeometry(0.38, 0.022, 12, 32);
      const haloMat = new THREE.MeshStandardMaterial({
        color: 0x333333,
        metalness: 0.95,
        roughness: 0.15,
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      haloMesh.rotation.x = Math.PI / 2;
      agentGroup.add(haloMesh);

      // Satellite Accent Detail: High-contrast Focal Optic / Indicator
      const opticGeo = new THREE.SphereGeometry(0.1, 16, 16);
      const opticMat = new THREE.MeshStandardMaterial({
        color: 0x000000,
        roughness: 0.05,
        metalness: 1.0,
      });
      const opticMesh = new THREE.Mesh(opticGeo, opticMat);
      opticMesh.position.y = 0.2;
      agentGroup.add(opticMesh);

      // Solar Data Fins / Antenna brackets
      const finGeo = new THREE.BoxGeometry(0.55, 0.03, 0.12);
      const finMat = new THREE.MeshStandardMaterial({
        color: 0x222222,
        metalness: 0.8,
        roughness: 0.3,
      });
      const finMesh = new THREE.Mesh(finGeo, finMat);
      agentGroup.add(finMesh);

      // Initial position
      const x = Math.cos(angle) * agentRadius;
      const z = Math.sin(angle) * agentRadius;
      const y = Math.sin(i * 1.5) * 0.35;
      agentGroup.position.set(x, y, z);

      scene.add(agentGroup);
      agentMeshes.push({
        id: agent.id,
        mesh: agentGroup,
        basePos: new THREE.Vector3(x, y, z),
        angle,
        speed: 0.0035 + (i % 2) * 0.0015,
      });
    });
    sceneStateRef.current.agentMeshes = agentMeshes;

    // 8. Kinetic Data Stream Lines between Kernel and Agents
    const dataStreamsGroup = new THREE.Group();
    scene.add(dataStreamsGroup);

    // 9. Interactive OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 4;
    controls.maxDistance = 16;
    controls.maxPolarAngle = Math.PI / 2 + 0.05; // Don't clip under floor
    controls.target.set(0, 0, 0);
    sceneStateRef.current.controls = controls;

    controls.addEventListener('start', () => {
      sceneStateRef.current.isInteracting = true;
    });
    controls.addEventListener('end', () => {
      sceneStateRef.current.isInteracting = false;
    });

    // 10. Raycasting on click/pointer
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const agentParents = agentMeshes.map((a) => a.mesh);
      const intersects = raycaster.intersectObjects(agentParents, true);

      if (intersects.length > 0) {
        let current: THREE.Object3D | null = intersects[0].object;
        while (current && current.parent && !current.userData.id) {
          current = current.parent;
        }
        if (current && current.userData.id) {
          const agentId = current.userData.id;
          setSelectedNode(agentId);
          if (onSelectAgent) {
            onSelectAgent(agentId);
          }
        }
      } else {
        const kernelIntersects = raycaster.intersectObject(coreInner, false);
        if (kernelIntersects.length > 0) {
          setSelectedNode('kernel');
        }
      }
    };

    renderer.domElement.addEventListener('click', handlePointerDown);

    // 11. Responsive Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 12. Main 60FPS / Software-safe Render Loop
    let animationFrameId = 0;
    const clock = new THREE.Clock();

    const renderTick = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth camera interpolation towards selected preset target
      camera.position.lerp(sceneStateRef.current.targetCameraPos, 0.04);
      controls.target.lerp(sceneStateRef.current.targetLookAt, 0.05);

      // Central Kernel Rotation
      if (kernelGroup) {
        coreInner.rotation.x += 0.008;
        coreInner.rotation.y += 0.012;
        cageMesh.rotation.x -= 0.004;
        cageMesh.rotation.y -= 0.006;

        if (ring1) ring1.rotation.z += 0.009;
        if (ring2) ring2.rotation.z -= 0.007;
        if (ring3) ring3.rotation.x += 0.005;

        // Apply Exploded View separation
        const explode = sceneStateRef.current.explodedAmount;
        if (ring1) ring1.scale.setScalar(1 + explode * 0.4);
        if (ring2) ring2.scale.setScalar(1 + explode * 0.8);
        if (ring3) ring3.scale.setScalar(1 + explode * 1.2);
        cageMesh.scale.setScalar(1 + explode * 0.3);
      }

      // Agent Satellites Orbital Motion
      agentMeshes.forEach((item, index) => {
        if (sceneStateRef.current.isAutoRotate && !sceneStateRef.current.isInteracting) {
          item.angle += item.speed * 0.8;
        }

        const explodeFactor = 1 + sceneStateRef.current.explodedAmount * 0.45;
        const currentR = agentRadius * explodeFactor;
        const x = Math.cos(item.angle) * currentR;
        const z = Math.sin(item.angle) * currentR;
        const y = Math.sin(elapsed * 1.5 + index) * 0.18 + (index % 2 === 0 ? 0.3 : -0.2);

        item.mesh.position.set(x, y, z);
        item.mesh.rotation.y += 0.01;
        item.mesh.rotation.x = Math.sin(elapsed + index) * 0.1;
      });

      controls.update();
      renderer.render(scene, camera);

      animationFrameId = requestAnimationFrame(renderTick);
    };

    renderTick();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('click', handlePointerDown);
      controls.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Camera preset handlers
  const handleCameraPreset = (mode: 'overview' | 'kernel' | 'agents' | 'iso') => {
    setCameraMode(mode);
    const state = sceneStateRef.current;
    if (mode === 'overview') {
      state.targetCameraPos.set(0, 3.8, 9.2);
      state.targetLookAt.set(0, 0, 0);
    } else if (mode === 'kernel') {
      state.targetCameraPos.set(0, 1.2, 3.8);
      state.targetLookAt.set(0, 0.2, 0);
    } else if (mode === 'agents') {
      state.targetCameraPos.set(3.5, 2.2, 5.5);
      state.targetLookAt.set(2, 0, 0);
    } else if (mode === 'iso') {
      state.targetCameraPos.set(6, 6, 6);
      state.targetLookAt.set(0, 0, 0);
    }
  };

  const getSelectedNodeInfo = () => {
    if (selectedNode === 'kernel') {
      return {
        title: 'RunOva Business Kernel',
        role: 'Central Autonomous Core',
        detail: 'Executes verified business rules, deterministic budgets and NEAR smart contract governance.',
        metric: '482 Tasks Coordinated Today'
      };
    }
    const found = AGENTS_DATA.find((a) => a.id === selectedNode);
    if (found) {
      return {
        title: found.name,
        role: found.tagline,
        detail: found.description,
        metric: `Ceiling: ${found.maxAutonomyBudget}`
      };
    }
    return {
      title: 'RunOva 3D Fleet',
      role: 'Coordinated Workforce',
      detail: 'Click any satellite node to inspect live autonomous permissions.',
      metric: '6 Agents Active'
    };
  };

  const nodeInfo = getSelectedNodeInfo();

  return (
    <div className={`relative w-full h-[620px] sm:h-[720px] bg-white border border-[#EAEAEA] select-none overflow-hidden ${className}`}>
      {/* 3D WebGL Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 cursor-grab active:cursor-grabbing w-full h-full" />

      {/* Top Left: 3D Scene HUD Tag */}
      <div className="absolute top-5 left-5 z-20 pointer-events-none flex flex-col gap-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/95 border border-[#EAEAEA] text-xs font-mono font-bold text-[#111111] shadow-xs">
          <Compass className="w-3.5 h-3.5 text-[#111111]" />
          <span>RUNOVA 3D ORBITAL KERNEL</span>
        </div>
        <div className="text-[11px] font-mono text-[#666666] bg-white/80 px-2 py-0.5 border border-[#EAEAEA] inline-block w-fit">
          DRAG TO ORBIT · SCROLL TO ZOOM · CLICK NODES
        </div>
      </div>

      {/* Top Right: Node Quick Selector */}
      <div className="absolute top-5 right-5 z-20 flex items-center gap-1.5">
        <button
          onClick={() => setIsAutoRotate(!isAutoRotate)}
          className={`px-3 py-1.5 text-xs font-mono border transition-colors flex items-center gap-1.5 cursor-pointer ${
            isAutoRotate
              ? 'bg-[#111111] text-white border-[#111111]'
              : 'bg-white text-[#111111] border-[#EAEAEA] hover:border-[#111111]'
          }`}
          title="Toggle 3D auto rotation"
        >
          <RotateCw className={`w-3.5 h-3.5 ${isAutoRotate ? 'animate-spin-slow' : ''}`} />
          <span className="hidden sm:inline">Auto-Rotate</span>
        </button>
      </div>

      {/* Bottom Center: Consolidated Ergonomic 3D Control Dock */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-2xl">
        {/* Collapse / Expand Tab */}
        <div className="flex justify-center -mb-[1px]">
          <button
            onClick={() => setIsDockCollapsed(!isDockCollapsed)}
            className="px-3 py-1 bg-white border border-[#EAEAEA] text-[11px] font-mono text-[#666666] hover:text-[#111111] flex items-center gap-1 shadow-xs cursor-pointer"
          >
            {isDockCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            <span>{isDockCollapsed ? 'Show 3D Viewport Controls' : 'Hide Controls'}</span>
          </button>
        </div>

        {/* Main Dock Container */}
        {!isDockCollapsed && (
          <div className="bg-white border border-[#111111] p-4 shadow-lg animate-in fade-in duration-150 space-y-3.5">
            {/* Top row: Active Node Inspector */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-[#EAEAEA]">
              <div>
                <div className="text-[10px] font-mono text-[#666666] uppercase tracking-wider">
                  ACTIVE 3D SELECTION · {nodeInfo.role}
                </div>
                <h4 className="text-sm font-bold text-[#111111] font-display">
                  {nodeInfo.title}
                </h4>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-semibold text-[#111111] bg-[#F7F7F7] px-2.5 py-1 border border-[#EAEAEA]">
                  {nodeInfo.metric}
                </span>
              </div>
            </div>

            {/* Bottom Row: Controls & Camera Presets */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
              {/* Camera Presets */}
              <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                <span className="text-[10px] font-mono text-[#666666] mr-1 hidden md:inline">VIEW:</span>
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'kernel', label: 'Kernel' },
                  { id: 'agents', label: 'Agents' },
                  { id: 'iso', label: 'Isometric' }
                ].map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleCameraPreset(preset.id as any)}
                    className={`px-2.5 py-1 text-xs font-mono transition-colors cursor-pointer ${
                      cameraMode === preset.id
                        ? 'bg-[#111111] text-white'
                        : 'bg-[#F7F7F7] text-[#666666] hover:text-[#111111] border border-[#EAEAEA]'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              {/* Exploded Architecture Slider */}
              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                <span className="text-[10px] font-mono text-[#666666] whitespace-nowrap">
                  EXPLODED VIEW:
                </span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={explodedAmount}
                  onChange={(e) => setExplodedAmount(parseFloat(e.target.value))}
                  className="w-24 sm:w-28 accent-[#111111] cursor-pointer"
                  title="Separate 3D layers and orbits"
                />
                <span className="text-[11px] font-mono font-bold text-[#111111] w-8 text-right">
                  {Math.round(explodedAmount * 100)}%
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
