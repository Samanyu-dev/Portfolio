import { Scene } from './Scene'
import { Overlay } from '../Overlay'

export function Hero() {
  return (
    <section className="relative w-screen h-screen overflow-hidden">
      <Scene />
      <Overlay />
    </section>
  )
}
