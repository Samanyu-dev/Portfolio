'use client'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import { Suspense, useEffect, useState } from 'react'
import * as THREE from 'three'
import { Blob } from './Blob'
import { Lights } from './Lights'
import { PostFX } from './PostFX'
import { useMouse } from '@/hooks/useMouse'

export function Scene({ dark = false }: { dark?: boolean }) {
  const mouse = useMouse()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Canvas
      camera={{ position: isMobile ? [0, 0, 6.5] : [0.5, 0, 5], fov: 45 }}
      dpr={isMobile ? [0.75, 1.0] : [1, 1.5]} // cap at 1.5 for performance
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.15,
      }}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        background: dark ? "#050508" : "#f5f0ea"
      }}
    >
      <Suspense fallback={null}>
        <Lights dark={dark} />
        <Blob mouse={mouse} dark={dark} />
        {/* <PostFX /> */}
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Suspense>
    </Canvas>
  )
}
