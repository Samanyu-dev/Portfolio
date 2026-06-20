"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useUniverse } from "../UniverseProvider";

const vertexShader = `
uniform float uTime;
uniform float uFormation;
uniform vec2 uMouse;
uniform float uPulse;
attribute vec3 aTarget;
attribute float aSeed;
varying float vAlpha;
varying vec3 vColor;

void main() {
  vec3 pos = position;
  vec3 target = aTarget;
  float form = smoothstep(0.0, 1.0, uFormation);
  pos = mix(pos, target, form);

  vec2 toMouse = pos.xy - uMouse * 12.0;
  float dist = length(toMouse);
  float awareness = smoothstep(4.0, 0.0, dist) * 0.35;
  pos.xy += normalize(toMouse + 0.001) * awareness;

  float pulse = sin(uTime * 2.0 + aSeed * 6.28) * 0.08 * uPulse;
  pos += normalize(target + 0.001) * pulse;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = (2.0 + aSeed * 2.5) * (1.0 + awareness * 2.0) * (300.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
  vAlpha = 0.25 + form * 0.55 + awareness;
  vColor = mix(vec3(0.4, 0.5, 0.9), vec3(0.55, 0.85, 1.0), form + awareness);
}
`;

const fragmentShader = `
varying float vAlpha;
varying vec3 vColor;

void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float glow = smoothstep(0.5, 0.0, d);
  gl_FragColor = vec4(vColor, vAlpha * glow);
}
`;

export function MemoryParticleField({ count = 12000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const { state, entities } = useUniverse();
  const mouse = useRef(new THREE.Vector2(0, 0));
  const { pointer } = useThree();

  const { positions, targets, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const targets = new Float32Array(count * 3);
    const seeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const spread = 40;
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
      seeds[i] = Math.random();

      const entity = entities[i % entities.length];
      const jitter = 1.8;
      targets[i * 3] = entity.position[0] + (Math.random() - 0.5) * jitter;
      targets[i * 3 + 1] = entity.position[1] + (Math.random() - 0.5) * jitter;
      targets[i * 3 + 2] = entity.position[2] + (Math.random() - 0.5) * jitter;
    }
    return { positions, targets, seeds };
  }, [count, entities]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uFormation: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uPulse: { value: 0 }
    }),
    []
  );

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value = clock.elapsedTime;
    const targetFormation =
      state.introPhase === "ready"
        ? 1
        : state.introPhase === "awakening"
          ? 0.5
          : Math.max(state.formation, 0);
    mat.uniforms.uFormation.value = THREE.MathUtils.lerp(
      mat.uniforms.uFormation.value,
      targetFormation,
      0.04
    );
    mat.uniforms.uPulse.value =
      state.act === "autonomous" ? 1 : state.act === "knowledge" ? 0.6 : 0.25;
    mouse.current.lerp(pointer, 0.06);
    mat.uniforms.uMouse.value.copy(mouse.current);
  });

  return (
    <points ref={ref} frustumCulled>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aTarget" args={[targets, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
