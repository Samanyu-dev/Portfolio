"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { MemoryParticleField } from "./MemoryParticleField";
import { CelestialBodies } from "./CelestialBodies";
import { useUniverse } from "../UniverseProvider";

function CognitiveCamera() {
  const { state } = useUniverse();
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 14));

  useFrame((_, delta) => {
    const progress = state.scrollProgress;
    const z = 11 - progress * 3 + (state.act === "architect" ? -1 : 0) + (state.act === "contact" ? -1.5 : 0);
    const y = Math.sin(progress * Math.PI) * 1.2;
    target.current.set(0, y, z);
    camera.position.lerp(target.current, 1 - Math.pow(0.001, delta));
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function VoidPulse() {
  const ref = useRef<THREE.Mesh>(null);
  const { state } = useUniverse();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const show = state.introPhase === "void" || state.introPhase === "signal";
    ref.current.visible = show;
    if (!show) return;
    const t = clock.elapsedTime;
    const scale = 0.02 + Math.sin(t * 3) * 0.008;
    ref.current.scale.setScalar(scale * (state.introPhase === "signal" ? 1.8 : 1));
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.6 + Math.sin(t * 4) * 0.3;
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color="#e0f2fe" transparent opacity={0.8} />
    </mesh>
  );
}

function SceneInner() {
  const { state } = useUniverse();
  const particleCount =
    typeof window !== "undefined" && window.innerWidth < 768 ? 5000 : 12000;

  return (
    <>
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000005", 14, 55]} />
      <ambientLight intensity={0.35} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#6366f1" distance={30} />
      <pointLight position={[8, 4, 6]} intensity={0.5} color="#06b6d4" />
      <pointLight position={[-6, -3, 4]} intensity={0.35} color="#8b5cf6" />

      <VoidPulse />
      <MemoryParticleField count={particleCount} />
      <CelestialBodies />
      {state.introPhase !== "ready" ? <CognitiveCamera /> : null}

      {state.introPhase === "ready" && !state.selectedEntity ? (
        <OrbitControls
          enableDamping
          dampingFactor={0.06}
          enablePan={false}
          minDistance={6}
          maxDistance={22}
          rotateSpeed={0.4}
          zoomSpeed={0.8}
        />
      ) : null}

      {state.introPhase === "ready" && (
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={1.1}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <Vignette eskil offset={0.2} darkness={1.1} />
        </EffectComposer>
      )}
    </>
  );
}

export function UniverseScene() {
  return (
    <div className="cu-canvas fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 14], fov: 55 }}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance"
        }}
      >
        <Suspense fallback={null}>
          <SceneInner />
        </Suspense>
      </Canvas>
    </div>
  );
}
