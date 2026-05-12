"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { motion as motion3d } from "framer-motion-3d";

/* ─────────────────────────────────────────────
   Globe constants
   ───────────────────────────────────────────── */

const GLOBE_RADIUS = 2.6;
const DOT_COUNT = 350;
const ARC_COUNT = 8;

/* ── Connection points — major tech hubs ── */
const CONNECTION_POINTS: [number, number][] = [
  [28.6, 77.2],   // Delhi (home)
  [37.7, -122.4], // San Francisco
  [51.5, -0.1],   // London
  [35.6, 139.7],  // Tokyo
  [1.35, 103.8],  // Singapore
  [-33.8, 151.2], // Sydney
  [40.7, -74.0],  // New York
  [48.8, 2.3],    // Paris
];

function latLonToVec3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

/* ── Globe dots ── */
function GlobeDots({ mode }: { mode: string }) {
  const pointsRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(DOT_COUNT * 3);
    const sizes = new Float32Array(DOT_COUNT);
    const colors = new Float32Array(DOT_COUNT * 3);

    const purple = new THREE.Color("#9b5cff");
    const blue = new THREE.Color("#00d4ff");
    const white = new THREE.Color("#ffffff");

    for (let i = 0; i < DOT_COUNT; i++) {
      const y = 1 - (i / (DOT_COUNT - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = ((Math.sqrt(5) - 1) / 2) * i * Math.PI * 2;

      positions[i * 3] = Math.cos(theta) * radiusAtY * GLOBE_RADIUS;
      positions[i * 3 + 1] = y * GLOBE_RADIUS;
      positions[i * 3 + 2] = Math.sin(theta) * radiusAtY * GLOBE_RADIUS;

      sizes[i] = Math.random() * 3.0 + 1.2;

      const color = Math.random() > 0.8 ? blue : Math.random() > 0.5 ? purple : white;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: { 
        uTime: { value: 0 },
        uMode: { value: mode === "neural" ? 1.0 : mode === "system" ? 2.0 : 0.0 }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uTime;
        uniform float uMode;
        void main() {
          vColor = color;
          float speed = uMode > 1.5 ? 1.2 : uMode > 0.5 ? 0.8 : 0.2;
          vAlpha = 0.4 + 0.3 * sin(uTime * speed + position.x * 0.5 + position.y * 0.5);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float strength = 1.0 - (d * 2.0);
          gl_FragColor = vec4(vColor, strength * vAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, [mode]);

  useFrame(({ clock }) => {
    if (material.uniforms) {
      material.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

/* ── Connection arcs ── */
function ConnectionArcs() {
  const groupRef = useRef<THREE.Group>(null);

  const arcData = useMemo(() => {
    const result: { points: THREE.Vector3[]; color: string }[] = [];
    const colors = ["#9b5cff", "#00d4ff", "#ff3cac", "#ffffff"];

    for (let i = 0; i < ARC_COUNT; i++) {
      const from = CONNECTION_POINTS[0];
      const to = CONNECTION_POINTS[(i % (CONNECTION_POINTS.length - 1)) + 1];

      const start = latLonToVec3(from[0], from[1], GLOBE_RADIUS);
      const end = latLonToVec3(to[0], to[1], GLOBE_RADIUS);

      const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
      const dist = start.distanceTo(end);
      mid.normalize().multiplyScalar(GLOBE_RADIUS + dist * 0.4);

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      result.push({ points: curve.getPoints(64), color: colors[i % colors.length] });
    }
    return result;
  }, []);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    const lines: THREE.Line[] = [];
    arcData.forEach(({ points, color }) => {
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineDashedMaterial({
        color,
        transparent: true,
        opacity: 0.6,
        dashSize: 0.2,
        gapSize: 0.1,
      });
      const line = new THREE.Line(geo, mat);
      line.computeLineDistances();
      group.add(line);
      lines.push(line);
    });

    return () => {
      lines.forEach((l) => {
        group.remove(l);
        l.geometry.dispose();
        (l.material as THREE.Material).dispose();
      });
    };
  }, [arcData]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Line && child.material) {
          (child.material as any).dashOffset = -clock.getElapsedTime() * 0.5 - i * 0.3;
        }
      });
    }
  });

  return <group ref={groupRef} />;
}

/* ── Wireframe sphere ── */
function WireframeGlobe({ mode }: { mode: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const s = 1.0 + Math.sin(clock.getElapsedTime() * (mode === "neural" ? 1.5 : 0.5)) * 0.02;
      meshRef.current.scale.set(s, s, s);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[GLOBE_RADIUS, 48, 24]} />
      <meshBasicMaterial
        color={mode === "system" ? "#ffffff" : "#9b5cff"}
        transparent
        opacity={mode === "focus" ? 0.03 : mode === "system" ? 0.15 : 0.08}
        wireframe
      />
    </mesh>
  );
}

/* ── Location marker (Delhi) ── */
function HomeMarker() {
  const markerRef = useRef<THREE.Mesh>(null);
  const pos = latLonToVec3(28.6, 77.2, GLOBE_RADIUS);

  useFrame(({ clock }) => {
    if (markerRef.current) {
      const s = 1 + Math.sin(clock.getElapsedTime() * 3) * 0.4;
      markerRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group position={pos}>
      <mesh ref={markerRef}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#ff3cac" transparent opacity={0.8} />
      </mesh>
      <pointLight color="#ff3cac" intensity={2} distance={2} />
    </group>
  );
}

/* ── Rotating group ── */
function GlobeGroup({ screen, mode, focusNode }: { screen: string; mode: string; focusNode: string | null }) {
  const groupRef = useRef<any>(null);
  const { viewport } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 0.4;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      const baseSpeed = mode === "neural" ? 0.08 : mode === "system" ? 0.12 : 0.02;
      const speed = focusNode ? baseSpeed * 2.5 : baseSpeed;
      groupRef.current.rotation.y = t * speed + mouse.current.x;
      groupRef.current.rotation.x = 0.2 + mouse.current.y * 0.3;
    }
  });

  const targetPos: [number, number, number] = useMemo(() => {
    if (screen === "home") return [viewport.width * 0.2, -0.2, 0];
    if (screen === "skills") return [-viewport.width * 0.25, 0.5, -2];
    if (screen === "projects") return [viewport.width * 0.3, -1, -3];
    return [0, 0, -5];
  }, [screen, viewport.width]);

  const scale = Math.min(viewport.width, viewport.height) / (screen === "home" ? 5.5 : 7.0);

  const MotionGroup = motion3d.group as any;

  return (
    <MotionGroup
      ref={groupRef}
      scale={scale}
      animate={{
        x: targetPos[0],
        y: targetPos[1],
        z: targetPos[2],
        rotateY: mode === "system" ? Math.PI : 0
      }}
      transition={{ type: "spring", stiffness: 30, damping: 20 }}
    >
      <WireframeGlobe mode={mode} />
      <GlobeDots mode={mode} />
      {mode !== "focus" && <ConnectionArcs />}
      <HomeMarker />
    </MotionGroup>
  );
}

/* ── Gradient mesh background (ambient) ── */
function GradientMesh({ mode }: { mode: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current && meshRef.current.material) {
      const mat = meshRef.current.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMode: { value: mode === "neural" ? 1.0 : mode === "system" ? 2.0 : 0.0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uMode;
        varying vec2 vUv;
        vec3 purple = vec3(0.608, 0.361, 1.0);
        vec3 blue   = vec3(0.0, 0.831, 1.0);
        vec3 magenta = vec3(1.0, 0.235, 0.675);
        vec3 dark   = vec3(0.01, 0.01, 0.02);
        void main() {
          float t = uTime * 0.1;
          vec2 uv = vUv;
          
          float d1 = length(uv - vec2(0.3 + sin(t) * 0.15, 0.7 + cos(t * 0.7) * 0.15));
          float d2 = length(uv - vec2(0.8 + cos(t * 0.5) * 0.1, 0.3 + sin(t * 0.8) * 0.1));
          
          vec3 color = dark;
          float intensity = uMode > 1.5 ? 0.05 : uMode > 0.5 ? 0.15 : 0.02;
          
          color = mix(color, purple, smoothstep(0.7, 0.0, d1) * intensity);
          color = mix(color, blue, smoothstep(0.6, 0.0, d2) * intensity);
          
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      depthWrite: false,
    });
  }, [mode]);

  return (
    <mesh ref={meshRef} position={[0, 0, -10]} material={material}>
      <planeGeometry args={[40, 40]} />
    </mesh>
  );
}

/* ── Exported component ── */
export function GlobeBackground({ 
  screen = "home", 
  mode = "neural",
  focusNode = null 
}: { 
  screen?: string; 
  mode?: string;
  focusNode?: string | null;
}) {
  return (
    <div className="absolute inset-0 z-0 h-full w-full" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
        style={{ pointerEvents: "none" }}
      >
        <ambientLight intensity={0.5} />
        <GradientMesh mode={mode} />
        <GlobeGroup screen={screen} mode={mode} focusNode={focusNode} />
      </Canvas>
    </div>
  );
}
