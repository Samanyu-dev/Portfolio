'use client'

import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

export function PostFX() {
  return (
    <EffectComposer>
      {/* Very subtle bloom — NOT the glowing orb cliché */}
      <Bloom 
        intensity={0.25}
        luminanceThreshold={0.85}
        luminanceSmoothing={0.85}
        blendFunction={BlendFunction.ADD}
      />
      {/* Barely perceptible chromatic aberration on edges */}
      <ChromaticAberration
        offset={[0.0006, 0.0006]}
        blendFunction={BlendFunction.NORMAL}
        radialModulation={true}
        modulationOffset={0.5}
      />
    </EffectComposer>
  )
}
