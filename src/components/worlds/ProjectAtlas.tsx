'use client';

import React, { useRef, useState, useCallback, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Float } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/portfolio';
import { useWorld } from '@/lib/WorldProvider';
import type { Project } from '@/types/portfolio';

/* ═══ CENTRAL CORE ═══ */
function CentralCore() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.3;
      ref.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <group>
      <mesh ref={ref}>
        <icosahedronGeometry args={[0.35, 4]} />
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#7c3aed"
          emissiveIntensity={3}
          roughness={0}
          metalness={1}
          wireframe
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.3} />
      </mesh>
      {/* Core glow */}
      <pointLight color="#7c3aed" intensity={4} distance={8} />
    </group>
  );
}

/* ═══ PROJECT PLANET ═══ */
function ProjectPlanet({
  project,
  index,
  isHovered,
  isSelected,
  onHover,
  onUnhover,
  onClick,
}: {
  project: Project;
  index: number;
  isHovered: boolean;
  isSelected: boolean;
  onHover: (id: string, pos: { x: number; y: number }) => void;
  onUnhover: () => void;
  onClick: (id: string) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { camera, size } = useThree();

  const sizeMap: Record<string, number> = { xs: 0.08, s: 0.12, m: 0.18, l: 0.25, xl: 0.35 };
  const radius = sizeMap[project.size] || 0.15;
  const baseColor = new THREE.Color(project.color);

  const orbitAngleOffset = (index / projects.length) * Math.PI * 2;

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const speed = isHovered ? 0 : 0.15 / (project.orbitRadius * 0.5);
    const angle = orbitAngleOffset + clock.getElapsedTime() * speed;
    const tilt = Math.sin(angle * 0.3) * 0.3;

    groupRef.current.position.x = Math.cos(angle) * project.orbitRadius;
    groupRef.current.position.z = Math.sin(angle) * project.orbitRadius;
    groupRef.current.position.y = tilt;

    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      const targetScale = isHovered ? 1.6 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
    }
  });

  const handlePointerOver = useCallback((e: THREE.Event) => {
    (e as unknown as { stopPropagation: () => void }).stopPropagation();
    document.body.style.cursor = 'pointer';
    if (groupRef.current) {
      const pos = new THREE.Vector3();
      groupRef.current.getWorldPosition(pos);
      pos.project(camera);
      const x = (pos.x * 0.5 + 0.5) * size.width;
      const y = (-pos.y * 0.5 + 0.5) * size.height;
      onHover(project.id, { x, y });
    }
  }, [camera, size, project.id, onHover]);

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.08}>
        {/* Planet sphere */}
        <mesh
          ref={meshRef}
          onPointerOver={handlePointerOver}
          onPointerOut={() => { document.body.style.cursor = 'default'; onUnhover(); }}
          onClick={() => onClick(project.id)}
        >
          <icosahedronGeometry args={[radius, project.isFlagship ? 4 : 3]} />
          <meshStandardMaterial
            color={baseColor}
            emissive={baseColor}
            emissiveIntensity={isHovered ? 3 : project.glowIntensity * 1.5}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>

        {/* Glow sphere */}
        <mesh>
          <sphereGeometry args={[radius * 2, 16, 16]} />
          <meshBasicMaterial
            color={baseColor}
            transparent
            opacity={isHovered ? 0.12 : 0.04}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Flagship ring */}
        {project.isFlagship && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius * 1.8, radius * 2.1, 64]} />
            <meshBasicMaterial
              color={baseColor}
              transparent
              opacity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
      </Float>

      {/* Orbit ring (visible trace) */}
    </group>
  );
}

/* ═══ ORBIT RINGS ═══ */
function OrbitRings() {
  const uniqueRadii = useMemo(() => {
    const radii = new Set(projects.map(p => p.orbitRadius));
    return Array.from(radii);
  }, []);

  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      {uniqueRadii.map(r => (
        <mesh key={r}>
          <ringGeometry args={[r - 0.003, r + 0.003, 128]} />
          <meshBasicMaterial color="#1a1a2e" transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

/* ═══ STAR FIELD ═══ */
function StarField() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(600 * 3);
    for (let i = 0; i < 600; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 15 + Math.random() * 10;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#ffffff" transparent opacity={0.5} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/* ═══ ATLAS SCENE ═══ */
function AtlasScene({
  onPlanetHover,
  onPlanetUnhover,
  onPlanetClick,
  hoveredPlanet,
  selectedPlanet,
}: {
  onPlanetHover: (id: string, pos: { x: number; y: number }) => void;
  onPlanetUnhover: () => void;
  onPlanetClick: (id: string) => void;
  hoveredPlanet: string | null;
  selectedPlanet: string | null;
}) {
  const { state } = useWorld();

  return (
    <>
      <ambientLight intensity={0.08} />
      <pointLight position={[8, 4, -6]} intensity={0.3} color="#06b6d4" distance={20} />
      <pointLight position={[-6, -3, 8]} intensity={0.2} color="#10b981" distance={20} />

      <CentralCore />
      <OrbitRings />
      <StarField />

      {projects.map((p, i) => (
        <ProjectPlanet
          key={p.id}
          project={p}
          index={i}
          isHovered={hoveredPlanet === p.id}
          isSelected={selectedPlanet === p.id}
          onHover={onPlanetHover}
          onUnhover={onPlanetUnhover}
          onClick={onPlanetClick}
        />
      ))}

      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        enablePan={false}
        minDistance={2}
        maxDistance={15}
        autoRotate
        autoRotateSpeed={0.15}
      />

      {state.performanceTier !== 'low' ? (
        <EffectComposer>
          <Bloom intensity={1} luminanceThreshold={0.2} luminanceSmoothing={0.9} mipmapBlur />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={
              state.performanceTier === 'ultra'
                ? new THREE.Vector2(0.0005, 0.0005)
                : new THREE.Vector2(0, 0)
            }
          />
        </EffectComposer>
      ) : null}
    </>
  );
}

/* ═══ PROJECT DETAIL PANEL ═══ */
function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-xl)',
        pointerEvents: 'none',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        style={{
          background: 'var(--void-surface)',
          border: '1px solid var(--void-border)',
          borderRadius: '12px',
          padding: 'var(--space-2xl)',
          maxWidth: '640px',
          width: '90vw',
          maxHeight: '80vh',
          overflowY: 'auto',
          pointerEvents: 'auto',
          position: 'relative',
        }}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 'var(--space-md)',
            right: 'var(--space-md)',
            background: 'none',
            border: '1px solid var(--void-border)',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            padding: '4px 10px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          ESC
        </button>

        {/* Category & Title */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          color: project.color,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: 'var(--space-xs)',
        }}>
          {project.category}
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.8rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          letterSpacing: '-0.02em',
          marginBottom: 'var(--space-xs)',
        }}>
          {project.title}
        </h2>

        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          fontStyle: 'italic',
          marginBottom: 'var(--space-xl)',
        }}>
          {project.tagline}
        </p>

        {/* Problem → Build → Outcome */}
        {[
          { label: 'PROBLEM', text: project.problem, color: 'var(--amber)' },
          { label: 'BUILD', text: project.build, color: 'var(--cyan)' },
          { label: 'OUTCOME', text: project.outcome, color: 'var(--green)' },
        ].map(section => (
          <div key={section.label} style={{ marginBottom: 'var(--space-lg)' }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              color: section.color,
              letterSpacing: '0.12em',
              marginBottom: 'var(--space-xs)',
            }}>
              {section.label}
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {section.text}
            </p>
          </div>
        ))}

        {/* Tech Stack */}
        <div style={{ marginBottom: 'var(--space-lg)' }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            color: 'var(--violet)',
            letterSpacing: '0.12em',
            marginBottom: 'var(--space-sm)',
          }}>
            TECH STACK
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {project.techStack.map(tech => (
              <span key={tech} style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                padding: '3px 10px',
                background: 'var(--void)',
                border: '1px solid var(--void-border)',
                borderRadius: '4px',
                color: 'var(--text-secondary)',
              }}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Architecture */}
        <div style={{ marginBottom: 'var(--space-lg)' }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            color: 'var(--cyan)',
            letterSpacing: '0.12em',
            marginBottom: 'var(--space-sm)',
          }}>
            ARCHITECTURE
          </div>
          <div style={{
            display: 'flex',
            gap: 'var(--space-sm)',
            flexWrap: 'wrap',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
          }}>
            {project.architecture.map((a, i) => (
              <React.Fragment key={a}>
                <span>{a}</span>
                {i < project.architecture.length - 1 && <span style={{ color: 'var(--void-border)' }}>→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: 'var(--space-sm)', marginTop: 'var(--space-xl)' }}>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="action-btn"
            style={{ fontSize: '0.7rem', padding: '8px 16px' }}
          >
            <span className="action-btn-icon">⬡</span>
            <span className="action-btn-label">SOURCE</span>
          </a>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="action-btn"
              style={{ fontSize: '0.7rem', padding: '8px 16px' }}
            >
              <span className="action-btn-icon">◎</span>
              <span className="action-btn-label">LIVE DEMO</span>
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══ PROJECT ATLAS (EXPORTED) ═══ */
export default function ProjectAtlas() {
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  const handleHover = useCallback((id: string, pos: { x: number; y: number }) => {
    setHoveredPlanet(id);
    setTooltipPos(pos);
  }, []);

  const handleUnhover = useCallback(() => {
    setHoveredPlanet(null);
    setTooltipPos(null);
  }, []);

  const handleClick = useCallback((id: string) => {
    setSelectedPlanet(id);
  }, []);

  const selectedProject = selectedPlanet ? projects.find(p => p.id === selectedPlanet) : null;
  const hoveredProject = hoveredPlanet ? projects.find(p => p.id === hoveredPlanet) : null;

  /* Close on Escape */
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPlanet(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <div className="world-label" aria-hidden="true">
        <div>SYS.002</div>
        <div className="world-label-title">PROJECT ATLAS</div>
      </div>

      <div className="canvas-container" role="img" aria-label="3D orbital system showing Samanyu's projects as planets orbiting a central core. Hover to preview, click to explore.">
        <Canvas
          camera={{ position: [0, 3, 6], fov: 50 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
          style={{ background: '#060610' }}
        >
          <AtlasScene
            onPlanetHover={handleHover}
            onPlanetUnhover={handleUnhover}
            onPlanetClick={handleClick}
            hoveredPlanet={hoveredPlanet}
            selectedPlanet={selectedPlanet}
          />
        </Canvas>
      </div>

      {/* Hover tooltip */}
      {hoveredProject && tooltipPos && !selectedPlanet && (
        <motion.div
          className="node-tooltip"
          style={{ left: tooltipPos.x, top: tooltipPos.y - 20 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div className="node-tooltip-label">{hoveredProject.title}</div>
          <div className="node-tooltip-desc">{hoveredProject.tagline}</div>
          <div style={{
            marginTop: '4px',
            fontSize: '0.55rem',
            color: hoveredProject.color,
            letterSpacing: '0.1em',
          }}>
            {hoveredProject.category}
          </div>
        </motion.div>
      )}

      {/* Project detail panel */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail project={selectedProject} onClose={() => setSelectedPlanet(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
