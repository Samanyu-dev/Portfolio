'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { BlobMaterial } from './BlobMaterial'

export function Blob({ mouse, dark = false }: { mouse: React.RefObject<THREE.Vector2>; dark?: boolean }) {
  const mesh = useRef<THREE.Mesh>(null)

  // Sphere segments: lower on mobile for maximum frame rate
  const geometry = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    const segments = isMobile ? 128 : 256
    return new THREE.SphereGeometry(1.8, segments, segments)
  }, [])

  useFrame((state) => {
    if (!mesh.current) return
    const t = state.clock.getElapsedTime()

    // Slow organic rotation
    mesh.current.rotation.y = t * 0.05
    mesh.current.rotation.z = t * 0.03

    // Mouse influence — subtle tilt and rotation toward cursor
    if (mouse.current) {
      mesh.current.rotation.x = THREE.MathUtils.lerp(
        mesh.current.rotation.x,
        mouse.current.y * 0.25,
        0.05
      )
      mesh.current.rotation.y += mouse.current.x * 0.001
    }

    // Pass uniforms to shader
    if (mesh.current.material) {
      const mat = mesh.current.material as any
      if (mat.uniforms) {
        mat.uniforms.uTime.value = t
        if (mouse.current) {
          mat.uniforms.uMouse.value.lerp(mouse.current, 0.05)
        }
      }
    }
  })

  return (
    <mesh ref={mesh} geometry={geometry} castShadow receiveShadow>
      <BlobMaterial dark={dark} />
    </mesh>
  )
}
