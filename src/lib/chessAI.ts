import { Chess, Move } from "chess.js";

const VAL: Record<string, number> = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 0 };
// small centre-control bonus; cheap stand-in for full piece-square tables
const centre = (sq: string) => {
  const f = sq.charCodeAt(0) - 97, r = Number(sq[1]) - 1;
  return 10 - (Math.abs(3.5 - f) + Math.abs(3.5 - r)) * 2.5;
};

function evaluate(g: Chess): number {
  // positive = good for white
  let s = 0;
  for (const row of g.board()) for (const c of row) {
    if (!c) continue;
    const v = VAL[c.type] + (c.type === "p" || c.type === "n" || c.type === "b" ? centre(c.square) : 0);
    s += c.color === "w" ? v : -v;
  }
  return s;
}

const order = (m: Move) => (m.captured ? 10 * VAL[m.captured] - VAL[m.piece] : 0) + (m.promotion ? 800 : 0) + (m.san.includes("+") ? 50 : 0);

function search(g: Chess, depth: number, alpha: number, beta: number): number {
  if (g.isCheckmate()) return g.turn() === "w" ? -99999 - depth : 99999 + depth;
  if (g.isDraw()) return 0;
  if (depth === 0) return evaluate(g);
  const moves = g.moves({ verbose: true }).sort((a, b) => order(b) - order(a));
  if (g.turn() === "w") {
    let best = -Infinity;
    for (const m of moves) { g.move(m); best = Math.max(best, search(g, depth - 1, alpha, beta)); g.undo(); alpha = Math.max(alpha, best); if (beta <= alpha) break; }
    return best;
  }
  let best = Infinity;
  for (const m of moves) { g.move(m); best = Math.min(best, search(g, depth - 1, alpha, beta)); g.undo(); beta = Math.min(beta, best); if (beta <= alpha) break; }
  return best;
}

/** Picks a move for the side to move. chaos = chance of a wild non-best move. */
export function pickMove(fen: string, depth: number, chaos: number): { move: Move; wild: boolean } | null {
  const g = new Chess(fen);
  const moves = g.moves({ verbose: true });
  if (!moves.length) return null;
  if (Math.random() < chaos) return { move: moves[Math.floor(Math.random() * moves.length)], wild: true };
  const white = g.turn() === "w";
  let bestScore = white ? -Infinity : Infinity, best = moves[0];
  for (const m of moves.sort((a, b) => order(b) - order(a))) {
    g.move(m);
    const sc = search(g, depth - 1, -Infinity, Infinity) + Math.random() * 6; // tiny jitter so games differ
    g.undo();
    if (white ? sc > bestScore : sc < bestScore) { bestScore = sc; best = m; }
  }
  return { move: best, wild: false };
}
