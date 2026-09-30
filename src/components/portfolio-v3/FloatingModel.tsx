"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useInView } from "react-intersection-observer";
import type { Group } from "three";

const Model = ({ src, scale }: { src: string; scale: number }) => {
  const ref = useRef<Group>(null);
  const { scene } = useGLTF(src);
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * 0.6; });
  return (
    <Float speed={2} rotationIntensity={0.15} floatIntensity={0.8}>
      <group ref={ref} scale={scale} position={[0, -0.6, 0]}><primitive object={scene} /></group>
    </Float>
  );
};

// Decorative only: pointer-events off so it never blocks the carousel.
const FloatingModel = ({ src, scale = 1, className = "" }: { src: string; scale?: number; className?: string }) => {
  const { ref, inView } = useInView();
  return (
  <div ref={ref} className={`fm ${className}`} aria-hidden>
    {inView && <Canvas camera={{ position: [0, 0.6, 4.2], fov: 35 }} dpr={[1, 1.5]} gl={{ alpha: true }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 2]} intensity={2} />
      <Environment preset="city" />
      <Model src={src} scale={scale} />
    </Canvas>}
  </div>
  );
};
export default FloatingModel;
