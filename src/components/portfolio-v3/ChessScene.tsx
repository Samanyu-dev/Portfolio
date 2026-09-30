"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";
import { ChessPiece } from "./ChessPieces";

export type PieceState = { id: number; type: string; color: "w" | "b"; square: string };
const xy = (sq: string): [number, number] => [sq.charCodeAt(0) - 97 - 3.5, 3.5 - (Number(sq[1]) - 1)];

const Piece = ({ p, selected, onSquare }: { p: PieceState; selected: boolean; onSquare: (s: string) => void }) => {
  const ref = useRef<Group>(null);
  const [tx, tz] = xy(p.square);
  useFrame((s, dt) => {
    const g = ref.current; if (!g) return;
    g.position.x += (tx - g.position.x) * Math.min(1, dt * 9);
    g.position.z += (tz - g.position.z) * Math.min(1, dt * 9);
    const moving = Math.hypot(tx - g.position.x, tz - g.position.z);
    g.position.y = 0.12 + Math.min(moving, 1) * 0.6 + Math.sin(s.clock.elapsedTime * 2 + p.id) * 0.015; // hop while travelling
  });
  return (
    <group ref={ref} position={[tx, .12, tz]} onClick={(e) => { e.stopPropagation(); onSquare(p.square); }}>
      <ChessPiece type={p.type} color={p.color} selected={selected} />
    </group>
  );
};

const Board = ({ pieces, selected, targets, last, onSquare, shake, chaos }: {
  pieces: PieceState[]; selected: string | null; targets: string[]; last: string[]; onSquare: (s: string) => void; shake: number; chaos: boolean;
}) => {
  const root = useRef<Group>(null);
  useFrame((s) => {
    const g = root.current; if (!g) return;
    const a = shake * 0.06;
    g.position.x = Math.sin(s.clock.elapsedTime * 60) * a;
    g.rotation.z = chaos ? Math.sin(s.clock.elapsedTime * 1.5) * 0.04 : 0; // chaos mode: the board sways
  });
  const squares = [];
  for (let f = 0; f < 8; f++) for (let r = 1; r <= 8; r++) {
    const sq = String.fromCharCode(97 + f) + r, [x, z] = xy(sq);
    const light = (f + r) % 2 === 1;
    const hot = sq === selected ? "#ff1f8e" : last.includes(sq) ? "#ff8a00" : light ? "#fff3a6" : "#ff5fa8";
    squares.push(
      <group key={sq} position={[x, 0, z]}>
        <mesh onClick={(e) => { e.stopPropagation(); onSquare(sq); }} position={[0, .05, 0]}>
          <boxGeometry args={[1, .1, 1]} /><meshToonMaterial color={hot} />
        </mesh>
        {targets.includes(sq) && (
          <mesh position={[0, .13, 0]} rotation={[-Math.PI / 2, 0, 0]} onClick={(e) => { e.stopPropagation(); onSquare(sq); }}>
            <circleGeometry args={[.22, 24]} /><meshBasicMaterial color="#7b2ff7" />
          </mesh>
        )}
      </group>
    );
  }
  return (
    <group ref={root}>
      <mesh position={[0, -.1, 0]}><boxGeometry args={[8.6, .3, 8.6]} /><meshToonMaterial color="#000" /></mesh>
      {squares}
      {pieces.map((p) => <Piece key={p.id} p={p} selected={p.square === selected} onSquare={onSquare} />)}
    </group>
  );
};

const ChessScene = (props: React.ComponentProps<typeof Board>) => (
  <Canvas camera={{ position: [0, 9.5, 9.5], fov: 40 }} dpr={[1, 1.5]} shadows={false}>
    <ambientLight intensity={1.1} />
    <directionalLight position={[4, 9, 5]} intensity={2.2} />
    <Board {...props} />
    <OrbitControls enablePan={false} minDistance={7} maxDistance={15} maxPolarAngle={Math.PI / 2.2} />
  </Canvas>
);
export default ChessScene;
