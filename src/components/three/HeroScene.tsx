"use client";

import { Preload } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import type { Group, Mesh, Points } from "three";
import { BufferAttribute, Color, MathUtils } from "three";

export default function HeroScene() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5.6], fov: 52 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.55} />
          <pointLight position={[3, 3, 4]} intensity={18} color="#67E8F9" />
          <pointLight position={[-3, -2, 3]} intensity={12} color="#34D399" />
          <pointLight position={[0, -3, 2]} intensity={10} color="#FB923C" />
          <SceneRig />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}

function SceneRig() {
  const groupRef = useRef<Group>(null);

  useFrame(({ camera, mouse }) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.x = MathUtils.lerp(groupRef.current.rotation.x, mouse.y * 0.14, 0.04);
    groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.18, 0.04);
    camera.rotation.x = MathUtils.lerp(camera.rotation.x, -mouse.y * 0.08, 0.04);
    camera.rotation.y = MathUtils.lerp(camera.rotation.y, mouse.x * 0.08, 0.04);
  });

  return (
    <group ref={groupRef}>
      <CoreMesh />
      <OrbitingSpheres />
      <RibbonRing />
      <ParticleField />
      <CodeParticles />
    </group>
  );
}

function CoreMesh() {
  const meshRef = useRef<Mesh>(null);
  const wireRef = useRef<Mesh>(null);

  useFrame(({ mouse }) => {
    if (!meshRef.current || !wireRef.current) return;

    meshRef.current.rotation.x += 0.003;
    meshRef.current.rotation.y += 0.004;
    wireRef.current.rotation.x = meshRef.current.rotation.x + mouse.y * 0.18;
    wireRef.current.rotation.y = meshRef.current.rotation.y + mouse.x * 0.18;
  });

  return (
    <group position={[1.1, 0.1, 0]}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.35, 0]} />
        <meshStandardMaterial color="#67E8F9" roughness={0.28} metalness={0.45} transparent opacity={0.24} />
      </mesh>
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.48, 0]} />
        <meshStandardMaterial wireframe color="#F8FAFC" emissive="#67E8F9" emissiveIntensity={0.28} />
      </mesh>
    </group>
  );
}

function OrbitingSpheres() {
  const groupRef = useRef<Group>(null);
  const spheres = useMemo(
    () =>
      Array.from({ length: 6 }, (_, index) => ({
        radius: 1.9 + index * 0.18,
        speed: 0.35 + index * 0.08,
        size: 0.06 + (index % 3) * 0.025,
        phase: index * 1.1,
        color: index % 2 === 0 ? "#34D399" : "#FB923C"
      })),
    []
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    groupRef.current.children.forEach((child, index) => {
      const sphere = spheres[index];
      const time = clock.elapsedTime * sphere.speed + sphere.phase;
      child.position.set(Math.cos(time) * sphere.radius, Math.sin(time * 0.9) * 0.85, Math.sin(time) * sphere.radius * 0.45);
    });
  });

  return (
    <group ref={groupRef} position={[1.1, 0.1, 0]}>
      {spheres.map((sphere) => (
        <mesh key={sphere.phase}>
          <sphereGeometry args={[sphere.size, 18, 18]} />
          <meshStandardMaterial color={sphere.color} emissive={sphere.color} emissiveIntensity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function RibbonRing() {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.0024;
    meshRef.current.rotation.y -= 0.0036;
  });

  return (
    <mesh ref={meshRef} rotation={[0.5, 0, 0]} position={[-1.4, -0.2, -0.2]}>
      <torusKnotGeometry args={[0.78, 0.16, 180, 28]} />
      <meshStandardMaterial color="#FB923C" transparent opacity={0.18} metalness={0.7} roughness={0.24} />
    </mesh>
  );
}

function ParticleField() {
  const pointsRef = useRef<Points>(null);
  const { positions, basePositions, speeds } = useMemo(() => {
    const count = 260;
    const positionsArray = new Float32Array(count * 3);
    const baseArray = new Float32Array(count * 3);
    const speedArray = new Float32Array(count);

    for (let index = 0; index < count; index += 1) {
      const offset = index * 3;
      positionsArray[offset] = (Math.random() - 0.5) * 8;
      positionsArray[offset + 1] = (Math.random() - 0.5) * 5;
      positionsArray[offset + 2] = (Math.random() - 0.5) * 4;
      baseArray.set(positionsArray.slice(offset, offset + 3), offset);
      speedArray[index] = 0.0015 + Math.random() * 0.003;
    }

    return { positions: positionsArray, basePositions: baseArray, speeds: speedArray };
  }, []);

  useFrame(({ mouse }) => {
    if (!pointsRef.current) return;

    const attribute = pointsRef.current.geometry.getAttribute("position") as BufferAttribute;
    const mouseX = mouse.x * 3.6;
    const mouseY = mouse.y * 2.2;

    for (let index = 0; index < speeds.length; index += 1) {
      const offset = index * 3;
      let x = attribute.array[offset] as number;
      let y = (attribute.array[offset + 1] as number) + speeds[index];
      const z = attribute.array[offset + 2] as number;

      if (y > 2.6) y = -2.6;

      const distanceX = x - mouseX;
      const distanceY = y - mouseY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      if (distance < 0.5) {
        const force = (0.5 - distance) * 0.018;
        x += (distanceX / Math.max(distance, 0.001)) * force;
        y += (distanceY / Math.max(distance, 0.001)) * force;
      } else {
        x = MathUtils.lerp(x, basePositions[offset], 0.006);
      }

      attribute.array[offset] = x;
      attribute.array[offset + 1] = y;
      attribute.array[offset + 2] = z;
    }

    attribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#E2E8F0" transparent opacity={0.62} depthWrite={false} />
    </points>
  );
}

function CodeParticles() {
  const groupRef = useRef<Group>(null);
  const particles = useMemo(
    () =>
      ["{ }", "</>", "AI", "RL", "API", "JWT", "TS", "ML"].map((label, index) => ({
        label,
        position: [Math.random() * -3.8 - 0.5, Math.random() * 3.6 - 1.8, Math.random() * -1.8] as [number, number, number],
        color: new Color(index % 2 === 0 ? "#67E8F9" : "#34D399")
      })),
    []
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, index) => {
      child.position.y += Math.sin(clock.elapsedTime + index) * 0.0008;
      child.rotation.z = Math.sin(clock.elapsedTime * 0.3 + index) * 0.08;
    });
  });

  return (
    <group ref={groupRef}>
      {particles.map((particle) => (
        <mesh key={particle.label} position={particle.position}>
          <planeGeometry args={[0.35, 0.16]} />
          <meshBasicMaterial color={particle.color} transparent opacity={0.16} />
        </mesh>
      ))}
    </group>
  );
}
