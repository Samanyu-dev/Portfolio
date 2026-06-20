'use client'

import { Environment } from '@react-three/drei'

export function Lights({ dark = false }: { dark?: boolean }) {
  return (
    <>
      <directionalLight
        position={[4, 6, 3]}
        intensity={dark ? 1.2 : 1.8}
        color={dark ? "#a5d8ff" : "#fff8ee"}
      />

      <directionalLight
        position={[-5, -2, 2]}
        intensity={dark ? 0.55 : 0.4}
        color={dark ? "#6366f1" : "#e8f0ff"}
      />

      <directionalLight
        position={[0, 2, -6]}
        intensity={dark ? 0.45 : 0.6}
        color={dark ? "#2563eb" : "#ffead0"}
      />

      <ambientLight intensity={dark ? 0.08 : 0.15} color={dark ? "#0a1628" : "#fff5e0"} />

      <Environment preset={dark ? "night" : "studio"} />
    </>
  )
}
