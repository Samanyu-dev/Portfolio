"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useCallback, useEffect } from "react";
import * as THREE from "three";

/* ─────────────────────────────────────────────
   Wireframe globe with glowing arcs & dots
   ───────────────────────────────────────────── */

const GLOBE_RADIUS = 2.4;
const DOT_COUNT = 280;
const ARC_COUNT = 6;

// Connection points — major tech hubs
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
function GlobeDots() {
  const pointsRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(DOT_COUNT * 3);
    const sizes = new Float32Array(DOT_COUNT);
    const colors = new Float32Array(DOT_COUNT * 3);

    const purple = new THREE.Color("#9b5cff");
    const blue = new THREE.Color("#00d4ff");
    const white = new THREE.Color("#e0dcff");

    for (let i = 0; i < DOT_COUNT; i++) {
      // Fibonacci sphere distribution
      const y = 1 - (i / (DOT_COUNT - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = ((Math.sqrt(5) - 1) / 2) * i * Math.PI * 2;

      positions[i * 3] = Math.cos(theta) * radiusAtY * GLOBE_RADIUS;
      positions[i * 3 + 1] = y * GLOBE_RADIUS;
      positions[i * 3 + 2] = Math.sin(theta) * radiusAtY * GLOBE_RADIUS;

      sizes[i] = Math.random() * 2.5 + 0.8;

      const color = Math.random() > 0.7 ? blue : Math.random() > 0.4 ? purple : white;
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
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uTime;
        void main() {
          vColor = color;
          vAlpha = 0.35 + 0.25 * sin(uTime * 0.5 + position.x * 2.0);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (200.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float glow = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(vColor, glow * vAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

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
    const colors = ["#9b5cff", "#00d4ff", "#ff3cac", "#9b5cff", "#00d4ff", "#ff3cac"];

    for (let i = 0; i < ARC_COUNT; i++) {
      const from = CONNECTION_POINTS[0]; // Delhi — home
      const to = CONNECTION_POINTS[(i % (CONNECTION_POINTS.length - 1)) + 1];

      const start = latLonToVec3(from[0], from[1], GLOBE_RADIUS);
      const end = latLonToVec3(to[0], to[1], GLOBE_RADIUS);

      const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
      const dist = start.distanceTo(end);
      mid.normalize().multiplyScalar(GLOBE_RADIUS + dist * 0.35);

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      result.push({ points: curve.getPoints(48), color: colors[i % colors.length] });
    }
    return result;
  }, []);

  // Build lines imperatively to avoid JSX <line> / SVG conflict
  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    const lines: THREE.Line[] = [];
    arcData.forEach(({ points, color }) => {
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineDashedMaterial({
        color,
        transparent: true,
        opacity: 0.5,
        dashSize: 0.15,
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
          // dashOffset exists at runtime on LineDashedMaterial
          (child.material as any).dashOffset = -clock.getElapsedTime() * 0.4 - i * 0.5; // eslint-disable-line
        }
      });
    }
  });

  return <group ref={groupRef} />;
}

/* ── Wireframe sphere ── */
function WireframeGlobe() {
  return (
    <mesh>
      <sphereGeometry args={[GLOBE_RADIUS, 36, 18]} />
      <meshBasicMaterial
        color="#9b5cff"
        transparent
        opacity={0.04}
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
      const s = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.3;
      markerRef.current.scale.set(s, s, s);
    }
  });

  return (
    <mesh ref={markerRef} position={pos}>
      <sphereGeometry args={[0.06, 12, 12]} />
      <meshBasicMaterial color="#ff3cac" transparent opacity={0.9} />
    </mesh>
  );
}

/* ── Rotating group ── */
function GlobeGroup() {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  const handlePointer = useCallback((e: { clientX: number; clientY: number }) => {
    mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 0.3;
    mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 0.3;
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      // Slow auto-rotation + mouse influence
      groupRef.current.rotation.y = t * 0.08 + mouse.current.x;
      groupRef.current.rotation.x = 0.2 + mouse.current.y * 0.5;
    }
  });

  // Scale based on viewport
  const scale = Math.min(viewport.width, viewport.height) / 6.5;

  return (
    <group
      ref={groupRef}
      scale={scale}
      position={[viewport.width * 0.22, -0.2, 0]}
      onPointerMove={(e) => handlePointer(e)}
    >
      <WireframeGlobe />
      <GlobeDots />
      <ConnectionArcs />
      <HomeMarker />
    </group>
  );
}

/* ── Gradient mesh background (ambient) ── */
function GradientMesh() {
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
        varying vec2 vUv;

        vec3 purple = vec3(0.608, 0.361, 1.0);
        vec3 blue   = vec3(0.0, 0.831, 1.0);
        vec3 magenta = vec3(1.0, 0.235, 0.675);
        vec3 dark   = vec3(0.027, 0.024, 0.055);

        void main() {
          float t = uTime * 0.15;
          vec2 uv = vUv;

          // Animated gradient blobs
          float d1 = length(uv - vec2(0.3 + sin(t) * 0.15, 0.7 + cos(t * 0.7) * 0.15));
          float d2 = length(uv - vec2(0.8 + cos(t * 0.5) * 0.1, 0.3 + sin(t * 0.8) * 0.1));
          float d3 = length(uv - vec2(0.5 + sin(t * 0.3) * 0.2, 0.5 + cos(t * 0.6) * 0.15));

          vec3 color = dark;
          color = mix(color, purple, smoothstep(0.6, 0.0, d1) * 0.15);
          color = mix(color, blue, smoothstep(0.5, 0.0, d2) * 0.1);
          color = mix(color, magenta, smoothstep(0.55, 0.0, d3) * 0.08);

          gl_FragColor = vec4(color, 1.0);
        }
      `,
      depthWrite: false,
    });
  }, []);

  return (
    <mesh ref={meshRef} position={[0, 0, -5]} material={material}>
      <planeGeometry args={[20, 20]} />
    </mesh>
  );
}

/* ── Exported component ── */
export function GlobeBackground() {
  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
        style={{ pointerEvents: "none" }}
      >
        <GradientMesh />
        <GlobeGroup />
      </Canvas>
    </div>
  );
}
