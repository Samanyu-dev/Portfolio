"use client";

import { useCallback, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import * as THREE from "three";
import { useUniverse } from "../UniverseProvider";
import type { UniverseEntity } from "../types";

function CelestialEntity({
  entity,
  isHovered,
  isSelected,
  onHover,
  onClick
}: {
  entity: UniverseEntity;
  isHovered: boolean;
  isSelected: boolean;
  onHover: (id: string | null) => void;
  onClick: (id: string) => void;
}) {
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const color = useMemo(() => new THREE.Color(entity.color), [entity.color]);
  const radius = 0.18 + entity.mass * 0.22;

  useFrame((_, delta) => {
    if (!coreRef.current) return;
    const target = isSelected ? 1.55 : isHovered ? 1.35 : 1;
    coreRef.current.scale.lerp(new THREE.Vector3(target, target, target), delta * 4);
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * (0.3 + entity.influence * 0.4);
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.2}>
      <group position={entity.position}>
        <mesh
          ref={coreRef}
          onPointerOver={(e) => {
            e.stopPropagation();
            document.body.style.cursor = "pointer";
            onHover(entity.id);
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            document.body.style.cursor = "default";
            onHover(null);
          }}
          onClick={(e) => {
            e.stopPropagation();
            onClick(entity.id);
          }}
        >
          <icosahedronGeometry args={[radius, 2]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isHovered || isSelected ? 2.8 : 1.4}
            roughness={0.15}
            metalness={0.85}
          />
        </mesh>

        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius * 2.2, 0.012, 8, 48]} />
          <meshBasicMaterial color={color} transparent opacity={isHovered ? 0.7 : 0.25} />
        </mesh>

        <mesh>
          <sphereGeometry args={[radius * 2.8, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.04} side={THREE.BackSide} />
        </mesh>
      </group>
    </Float>
  );
}

function ConnectionWeb({ hoveredId }: { hoveredId: string | null }) {
  const { entities } = useUniverse();

  const lines = useMemo(() => {
    const result: Array<{ key: string; from: THREE.Vector3; to: THREE.Vector3; active: boolean }> = [];
    const map = new Map(entities.map((e) => [e.id, e]));

    entities.forEach((entity) => {
      entity.connections.forEach((targetId) => {
        const target = map.get(targetId);
        if (!target) return;
        const key = [entity.id, targetId].sort().join("-");
        const active = hoveredId === entity.id || hoveredId === targetId;
        result.push({
          key,
          from: new THREE.Vector3(...entity.position),
          to: new THREE.Vector3(...target.position),
          active
        });
      });
    });
    return result;
  }, [entities, hoveredId]);

  return (
    <group>
      {lines.map((line) => (
        <Line
          key={line.key}
          points={[line.from, line.to]}
          color={line.active ? "#a78bfa" : "#1e293b"}
          lineWidth={line.active ? 1.5 : 0.5}
          transparent
          opacity={line.active ? 0.85 : 0.2}
        />
      ))}
    </group>
  );
}

export function CelestialBodies() {
  const { state, entities, dispatch, enterProject } = useUniverse();
  const groupRef = useRef<THREE.Group>(null);

  const onHover = useCallback(
    (id: string | null) => dispatch({ type: "HOVER", payload: id }),
    [dispatch]
  );

  const onClick = useCallback(
    (id: string) => enterProject(id),
    [enterProject]
  );

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const autoSpeed =
      state.act === "autonomous" ? 0.08 : state.act === "knowledge" ? 0.04 : 0.015;
    groupRef.current.rotation.y += delta * autoSpeed;
  });

  const visible =
    state.introPhase === "ready" ||
    state.introPhase === "awakening" ||
    state.formation > 0.1;

  if (!visible || entities.length === 0) return null;

  return (
    <group ref={groupRef}>
      <ConnectionWeb hoveredId={state.hoveredEntity} />
      {entities.map((entity) => (
        <CelestialEntity
          key={entity.id}
          entity={entity}
          isHovered={state.hoveredEntity === entity.id}
          isSelected={state.selectedEntity === entity.id}
          onHover={onHover}
          onClick={onClick}
        />
      ))}
    </group>
  );
}
