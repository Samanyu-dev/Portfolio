"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Box3, Vector3 } from "three";
import type { Group } from "three";
import { useInView } from "react-intersection-observer";

type Props = { src: string; scale?: number; className?: string; fit?: boolean; anim?: string; spin?: boolean };

const Model = ({ src, scale = 1, fit, anim, spin = true }: Omit<Props, "className">) => {
  const ref = useRef<Group>(null);
  const { scene, animations } = useGLTF(src);
  const { actions } = useAnimations(animations, ref);
  // fit: normalise any downloaded model to ~2 units tall/wide and centre it, whatever its native scale
  const k = (() => {
    if (!fit) return 1;
    const b = new Box3().setFromObject(scene), s = b.getSize(new Vector3());
    const c = b.getCenter(new Vector3()); scene.position.sub(c); scene.position.y += s.y / 2 - 0;
    return 2 / Math.max(s.x, s.y, s.z);
  })();
  useEffect(() => {
    const a = (anim && actions[anim]) || Object.values(actions)[0];
    a?.reset().fadeIn(0.3).play();
    return () => { a?.fadeOut(0.2); };
  }, [actions, anim]);
  useFrame((_, dt) => { if (spin && ref.current) ref.current.rotation.y += dt * 0.6; });
  return (
    <Float speed={2} rotationIntensity={0.15} floatIntensity={0.8}>
      <group ref={ref} scale={scale * k} position={[0, fit ? -0.2 : -0.6, 0]}><primitive object={scene} /></group>
    </Float>
  );
};

// Decorative only: pointer-events off so it never blocks the carousel. Canvas mounts only while visible.
const FloatingModel = ({ src, scale = 1, className = "", fit, anim, spin }: Props) => {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`fm ${className}`} aria-hidden>
      {inView && (
        <Canvas camera={{ position: [0, 0.6, 4.2], fov: 35 }} dpr={[1, 1.5]} gl={{ alpha: true }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[3, 4, 2]} intensity={2} />
          <Environment preset="city" />
          <Model src={src} scale={scale} fit={fit} anim={anim} spin={spin} />
        </Canvas>
      )}
    </div>
  );
};
export default FloatingModel;
