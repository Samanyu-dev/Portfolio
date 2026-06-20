"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Line, OrbitControls, Sphere } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import type { Group } from "three";
import { useReducedMotion } from "framer-motion";

type SkillItem = {
  name: string;
  count: number;
};

type SkillGalaxyProps = {
  skills: SkillItem[];
};

type Node = {
  name: string;
  weight: number;
  position: [number, number, number];
};

function detectWebGL() {
  if (typeof window === "undefined") return true;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

function SkillNodes({ nodes, reducedMotion }: { nodes: Node[]; reducedMotion: boolean | null }) {
  const groupRef = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current || reducedMotion) return;
    groupRef.current.rotation.y += delta * 0.12;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.08;
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, index) => (
        <group key={node.name} position={node.position}>
          <Sphere args={[0.15 + node.weight * 0.015, 24, 24]}>
            <meshStandardMaterial
              color={index % 2 === 0 ? "#7bdff6" : "#63f2d4"}
              emissive={index % 2 === 0 ? "#2f89ff" : "#0ac8a2"}
              emissiveIntensity={0.22}
              roughness={0.2}
              metalness={0.5}
            />
          </Sphere>
          <Html center distanceFactor={8.5}>
            <span className="rounded-full border border-white/10 bg-black/35 px-2 py-1 text-[10px] text-white backdrop-blur">
              {node.name}
            </span>
          </Html>
        </group>
      ))}

      {nodes.map((node, index) => {
        const next = nodes[(index + 1) % nodes.length];
        return (
          <Line
            key={`${node.name}-${next.name}`}
            points={[node.position, next.position]}
            color="rgba(123,223,246,0.42)"
            lineWidth={0.6}
            transparent
            opacity={0.35}
          />
        );
      })}
    </group>
  );
}

export function SkillGalaxy({ skills }: SkillGalaxyProps) {
  const [webglReady] = useState(detectWebGL);
  const reducedMotion = useReducedMotion();

  const nodes = useMemo<Node[]>(() => {
    const top = skills.slice(0, 10);
    const radius = 2.6;
    return top.map((item, index) => {
      const angle = (index / Math.max(top.length, 1)) * Math.PI * 2;
      const y = ((index % 3) - 1) * 0.55;
      return {
        name: item.name,
        weight: item.count,
        position: [Math.cos(angle) * radius, y, Math.sin(angle) * radius]
      };
    });
  }, [skills]);

  if (!webglReady) {
    return (
      <div className="panel p-5">
        <p className="font-display text-lg text-text-0">Skill Network</p>
        <p className="mt-2 text-sm text-text-1">WebGL is unavailable on this device, so an accessible fallback summary is shown.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {skills.slice(0, 10).map((skill) => (
            <span key={skill.name} className="metric-chip">
              {skill.name} ({skill.count})
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="panel relative h-[360px] w-full overflow-hidden sm:h-[420px]">
      <Canvas dpr={[1, 1.8]} camera={{ position: [0, 0, 7], fov: 42 }}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 5, 4]} intensity={0.8} />
        <directionalLight position={[-4, -3, -2]} intensity={0.35} />
        <SkillNodes nodes={nodes} reducedMotion={reducedMotion} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={!reducedMotion} autoRotateSpeed={0.55} />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/35 to-transparent p-4 text-xs text-text-1">
        Interactive graph of frequently used technologies inferred from public repositories.
      </div>
    </div>
  );
}
