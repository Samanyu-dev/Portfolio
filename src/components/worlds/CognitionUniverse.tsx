'use client';

import React, { useRef, useMemo, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { cognitionNodes } from '@/data/portfolio';
import { useWorld } from '@/lib/WorldProvider';
import NodeTooltip from './NodeTooltip';

/* ═══ NEURAL NODE ═══ */
function NeuralNode({
  node,
  onHover,
  onUnhover,
  onClick,
  isHovered,
}: {
  node: typeof cognitionNodes[0];
  onHover: (id: string, screenPos: { x: number; y: number }) => void;
  onUnhover: () => void;
  onClick: (id: string) => void;
  isHovered: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const { camera, size } = useThree();

  const sizeMap = { xs: 0.12, s: 0.16, m: 0.22, l: 0.3, xl: 0.4 };
  const radius = sizeMap[node.size];
  const baseColor = new THREE.Color(node.color);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    /* Breathing animation */
    const breath = Math.sin(Date.now() * 0.002 + node.position[0]) * 0.03;
    const targetScale = isHovered ? 1.4 : 1 + breath;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      delta * 5
    );

    /* Glow pulse */
    if (glowRef.current) {
      const glowScale = isHovered ? 2.5 : 1.8 + Math.sin(Date.now() * 0.003) * 0.3;
      glowRef.current.scale.lerp(
        new THREE.Vector3(glowScale, glowScale, glowScale),
        delta * 4
      );
    }
  });

  const handlePointerOver = useCallback((e: THREE.Event) => {
    (e as unknown as { stopPropagation: () => void }).stopPropagation();
    document.body.style.cursor = 'pointer';
    
    /* Project 3D position to screen */
    const pos = new THREE.Vector3(...node.position);
    pos.project(camera);
    const x = (pos.x * 0.5 + 0.5) * size.width;
    const y = (-pos.y * 0.5 + 0.5) * size.height;
    onHover(node.id, { x, y });
  }, [camera, size, node, onHover]);

  const handlePointerOut = useCallback(() => {
    document.body.style.cursor = 'default';
    onUnhover();
  }, [onUnhover]);

  return (
    <group position={node.position as [number, number, number]}>
      {/* Core sphere */}
      <mesh
        ref={meshRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => onClick(node.id)}
      >
        <icosahedronGeometry args={[radius, 3]} />
        <meshStandardMaterial
          color={baseColor}
          emissive={baseColor}
          emissiveIntensity={isHovered ? 2.5 : 1.2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Outer glow sphere */}
      <mesh ref={glowRef}>
        <icosahedronGeometry args={[radius, 2]} />
        <meshBasicMaterial
          color={baseColor}
          transparent
          opacity={isHovered ? 0.15 : 0.06}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

/* ═══ CONNECTION LINES ═══ */
function ConnectionLines({ hoveredNode }: { hoveredNode: string | null }) {
  const linesRef = useRef<THREE.Group>(null);

  const connections = useMemo(() => {
    const pairs: Array<{ from: [number, number, number]; to: [number, number, number]; key: string }> = [];
    const seen = new Set<string>();

    cognitionNodes.forEach(node => {
      node.connections.forEach(targetId => {
        const key = [node.id, targetId].sort().join('-');
        if (seen.has(key)) return;
        seen.add(key);

        const target = cognitionNodes.find(n => n.id === targetId);
        if (!target) return;

        pairs.push({
          from: node.position as [number, number, number],
          to: target.position as [number, number, number],
          key,
        });
      });
    });
    return pairs;
  }, []);

  const LineComponent = 'line' as any;

  return (
    <group ref={linesRef}>
      {connections.map(({ from, to, key }) => {
        const isHighlighted = hoveredNode &&
          key.includes(hoveredNode);

        const points = [new THREE.Vector3(...from), new THREE.Vector3(...to)];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        return (
          <LineComponent key={key} geometry={geometry}>
            <lineBasicMaterial
              color={isHighlighted ? '#7c3aed' : '#1a1a2e'}
              transparent
              opacity={isHighlighted ? 0.8 : 0.15}
              linewidth={1}
            />
          </LineComponent>
        );
      })}
    </group>
  );
}

/* ═══ PARTICLE FIELD ═══ */
function ParticleField({ count = 800 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#7c3aed'),
      new THREE.Color('#06b6d4'),
      new THREE.Color('#10b981'),
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.02;
    pointsRef.current.rotation.x += delta * 0.005;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ═══ DATA PULSE PARTICLES ═══ */
function DataPulses() {
  const ref = useRef<THREE.Points>(null);
  const count = 150;

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      /* Start from random nodes */
      const node = cognitionNodes[Math.floor(Math.random() * cognitionNodes.length)];
      pos[i * 3] = node.position[0] + (Math.random() - 0.5) * 0.5;
      pos[i * 3 + 1] = node.position[1] + (Math.random() - 0.5) * 0.5;
      pos[i * 3 + 2] = node.position[2] + (Math.random() - 0.5) * 0.5;

      vel[i * 3] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    return [pos, vel];
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const posAttr = ref.current.geometry.attributes.position;
    const posArray = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      posArray[i * 3] += velocities[i * 3];
      posArray[i * 3 + 1] += velocities[i * 3 + 1];
      posArray[i * 3 + 2] += velocities[i * 3 + 2];

      /* Reset when too far */
      const dist = Math.sqrt(
        posArray[i * 3] ** 2 + posArray[i * 3 + 1] ** 2 + posArray[i * 3 + 2] ** 2
      );
      if (dist > 8) {
        const node = cognitionNodes[Math.floor(Math.random() * cognitionNodes.length)];
        posArray[i * 3] = node.position[0];
        posArray[i * 3 + 1] = node.position[1];
        posArray[i * 3 + 2] = node.position[2];
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#7c3aed"
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ═══ SCENE CONTENT ═══ */
function SceneContent({
  onNodeHover,
  onNodeUnhover,
  onNodeClick,
  hoveredNode,
}: {
  onNodeHover: (id: string, pos: { x: number; y: number }) => void;
  onNodeUnhover: () => void;
  onNodeClick: (id: string) => void;
  hoveredNode: string | null;
}) {
  const { state } = useWorld();
  const particleCount = state.performanceTier === 'ultra' ? 1200 :
                         state.performanceTier === 'high' ? 800 :
                         state.performanceTier === 'medium' ? 400 : 200;

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#7c3aed" distance={12} />
      <pointLight position={[5, 3, -3]} intensity={0.5} color="#06b6d4" distance={10} />
      <pointLight position={[-4, -2, 4]} intensity={0.4} color="#10b981" distance={10} />

      {/* Neural nodes */}
      {cognitionNodes.map(node => (
        <Float
          key={node.id}
          speed={0.8}
          rotationIntensity={0.1}
          floatIntensity={0.15}
          floatingRange={[-0.05, 0.05]}
        >
          <NeuralNode
            node={node}
            onHover={onNodeHover}
            onUnhover={onNodeUnhover}
            onClick={onNodeClick}
            isHovered={hoveredNode === node.id}
          />
        </Float>
      ))}

      {/* Connection lines */}
      <ConnectionLines hoveredNode={hoveredNode} />

      {/* Ambient particles */}
      <ParticleField count={particleCount} />

      {/* Data pulses between nodes */}
      {state.performanceTier !== 'low' && <DataPulses />}

      {/* Camera controls */}
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        enablePan={false}
        minDistance={3}
        maxDistance={12}
        autoRotate
        autoRotateSpeed={0.3}
        enableZoom
      />

      {/* Post-processing */}
      {state.performanceTier !== 'low' && (
        <EffectComposer>
          <Bloom
            intensity={state.performanceTier === 'ultra' ? 1.2 : 0.8}
            luminanceThreshold={0.3}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>
      )}
    </>
  );
}

/* ═══ COGNITION UNIVERSE (EXPORTED) ═══ */
export default function CognitionUniverse() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const { navigateToWorld } = useWorld();

  const handleNodeHover = useCallback((id: string, pos: { x: number; y: number }) => {
    setHoveredNode(id);
    setTooltipPos(pos);
  }, []);

  const handleNodeUnhover = useCallback(() => {
    setHoveredNode(null);
    setTooltipPos(null);
  }, []);

  const handleNodeClick = useCallback((id: string) => {
    const node = cognitionNodes.find(n => n.id === id);
    if (node?.navigatesTo) {
      if (['cognition', 'atlas', 'evolution', 'terminal', 'aether-core'].includes(node.navigatesTo)) {
        navigateToWorld(node.navigatesTo as import('@/types/portfolio').WorldId);
      }
    }
  }, [navigateToWorld]);

  const hoveredData = hoveredNode ? cognitionNodes.find(n => n.id === hoveredNode) : null;

  return (
    <>
      {/* World label */}
      <div className="world-label" aria-hidden="true">
        <div>SYS.001</div>
        <div className="world-label-title">COGNITION UNIVERSE</div>
      </div>

      {/* Three.js Canvas */}
      <div className="canvas-container" role="img" aria-label="Interactive 3D neural network representing Samanyu's projects, experience, and skills. Hover nodes to explore, click to navigate.">
        <Canvas
          camera={{ position: [0, 0, 7], fov: 50 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
          }}
          style={{ background: '#0a0a12' }}
        >
          <SceneContent
            onNodeHover={handleNodeHover}
            onNodeUnhover={handleNodeUnhover}
            onNodeClick={handleNodeClick}
            hoveredNode={hoveredNode}
          />
        </Canvas>
      </div>

      {/* Node tooltip overlay */}
      {hoveredData && tooltipPos && (
        <NodeTooltip
          label={hoveredData.label}
          description={hoveredData.description}
          x={tooltipPos.x}
          y={tooltipPos.y}
        />
      )}
    </>
  );
}
