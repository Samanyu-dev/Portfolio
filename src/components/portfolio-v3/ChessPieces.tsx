"use client";
import { useMemo } from "react";
import * as THREE from "three";

// Procedural comic-style pieces: lathe bodies + a black back-face outline mesh.
const lathe = (pts: [number, number][]) => new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(r, y)), 20);

const PROFILES: Record<string, [number, number][]> = {
  p: [[0, 0], [.32, 0], [.32, .08], [.2, .16], [.12, .4], [.22, .46], [.0, .5]],
  r: [[0, 0], [.34, 0], [.34, .1], [.24, .2], [.22, .6], [.32, .66], [.32, .86], [0, .86]],
  b: [[0, 0], [.32, 0], [.3, .1], [.16, .22], [.12, .62], [.24, .7], [.2, .84], [0, .92]],
  q: [[0, 0], [.34, 0], [.32, .1], [.17, .24], [.12, .8], [.3, .92], [.27, 1.08], [.12, 1.12], [0, 1.1]],
  k: [[0, 0], [.34, 0], [.32, .1], [.18, .24], [.13, .85], [.3, .95], [.26, 1.1], [0, 1.1]],
  n: [[0, 0], [.32, 0], [.3, .1], [.22, .22], [0, .3]],
};

type P = { geo: THREE.BufferGeometry; pos?: [number, number, number]; rot?: [number, number, number] };

function parts(type: string): P[] {
  const L = (t: string): P => ({ geo: lathe(PROFILES[t]) });
  switch (type) {
    case "p": return [L("p"), { geo: new THREE.SphereGeometry(.2, 16, 12), pos: [0, .62, 0] }];
    case "r": return [L("r"), ...[[.22, .22], [-.22, .22], [.22, -.22], [-.22, -.22]].map(([x, z]): P => ({ geo: new THREE.BoxGeometry(.16, .16, .16), pos: [x, .92, z] }))];
    case "b": return [L("b"), { geo: new THREE.SphereGeometry(.12, 14, 12), pos: [0, 1.0, 0] }, { geo: new THREE.ConeGeometry(.1, .2, 12), pos: [0, .84, 0] }];
    case "q": return [L("q"), { geo: new THREE.SphereGeometry(.13, 14, 12), pos: [0, 1.25, 0] },
      ...[0, 1, 2, 3, 4].map((i): P => ({ geo: new THREE.SphereGeometry(.07, 10, 8), pos: [Math.cos(i * 1.2566) * .22, 1.12, Math.sin(i * 1.2566) * .22] }))];
    case "k": return [L("k"), { geo: new THREE.BoxGeometry(.12, .4, .12), pos: [0, 1.3, 0] }, { geo: new THREE.BoxGeometry(.32, .11, .12), pos: [0, 1.32, 0] }];
    default: return [L("n"), // knight: body, head, snout, ears
      { geo: new THREE.BoxGeometry(.36, .55, .3), pos: [0, .5, 0], rot: [0, 0, .2] },
      { geo: new THREE.BoxGeometry(.3, .3, .28), pos: [.12, .86, 0], rot: [0, 0, -.2] },
      { geo: new THREE.BoxGeometry(.3, .16, .22), pos: [.3, .8, 0], rot: [0, 0, -.5] },
      { geo: new THREE.ConeGeometry(.06, .16, 8), pos: [0, 1.04, .09] }, { geo: new THREE.ConeGeometry(.06, .16, 8), pos: [0, 1.04, -.09] }];
  }
}

export const ChessPiece = ({ type, color, selected }: { type: string; color: "w" | "b"; selected?: boolean }) => {
  const list = useMemo(() => parts(type), [type]);
  const c = color === "w" ? "#ffe600" : "#7b2ff7";
  return (
    <group rotation={[0, color === "w" ? 0 : Math.PI, 0]} scale={selected ? 1.12 : 1}>
      {list.map((p, i) => (
        <group key={i} position={p.pos} rotation={p.rot}>
          <mesh geometry={p.geo}><meshToonMaterial color={c} emissive={selected ? "#ff1f8e" : "#000"} emissiveIntensity={selected ? .6 : 0} /></mesh>
          <mesh geometry={p.geo} scale={1.09}><meshBasicMaterial color="#000" side={THREE.BackSide} /></mesh>
        </group>
      ))}
    </group>
  );
};
