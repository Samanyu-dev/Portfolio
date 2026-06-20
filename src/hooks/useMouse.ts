import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function useMouse() {
  const mouse = useRef(new THREE.Vector2(0, 0))

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      // Normalise to -1 to +1
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return mouse
}
