"use client";
import "./styles/ChessArena.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { Chess, Move } from "chess.js";
import { pickMove } from "@/lib/chessAI";
import { track } from "@/lib/track";
import type { PieceState } from "./ChessScene";

const ChessScene = dynamic(() => import("./ChessScene"), { ssr: false });

const TAUNTS = {
  capture: ["NOM NOM NOM!", "Thanks for the snack!", "Was that piece important?", "KAPOW! Mine now."],
  check: ["CHECK! Sweat yet?", "Your king looks lonely.", "Run, little king, run!"],
  wild: ["I meant to do that. Probably.", "CHAOS MODE: ENGAGED!", "Why not? Because fun!"],
  quiet: ["Hmm… interesting.", "Your move, champ.", "Thinking hard (not really).", "Bold strategy, Cotton."],
  lose: ["Okay okay, you got me!", "Rematch? I demand a rematch."],
  win: ["GG! Better luck next time.", "Checkmate. Sorry not sorry."],
};
const pick = (a: string[]) => a[Math.floor(Math.random() * a.length)];

let uid = 0;
const initPieces = (): PieceState[] => {
  const out: PieceState[] = [];
  new Chess().board().forEach((row) => row.forEach((c) => { if (c) out.push({ id: uid++, type: c.type, color: c.color, square: c.square }); }));
  return out;
};

// keep stable ids so pieces glide from square to square instead of teleporting
const applyMove = (ps: PieceState[], m: Move): PieceState[] => {
  const capSq = m.flags.includes("e") ? m.to[0] + m.from[1] : m.to;
  let next = ps.filter((p) => !(m.captured && p.square === capSq));
  next = next.map((p) => (p.square === m.from ? { ...p, square: m.to, type: m.promotion ?? p.type } : p));
  if (m.flags.includes("k") || m.flags.includes("q")) {
    const r = m.from[1], kingside = m.flags.includes("k");
    const from = (kingside ? "h" : "a") + r, to = (kingside ? "f" : "d") + r;
    next = next.map((p) => (p.square === from ? { ...p, square: to } : p));
  }
  return next;
};

const LEVELS = { Chill: 2, Normal: 3, Sweaty: 4 } as const;

const ChessArena = () => {
  const game = useRef(new Chess());
  const [pieces, setPieces] = useState<PieceState[]>(initPieces);
  const [sel, setSel] = useState<string | null>(null);
  const [thinking, setThinking] = useState(false);
  const [msg, setMsg] = useState("You're yellow. Click a piece, then a glowing square.");
  const [level, setLevel] = useState<keyof typeof LEVELS>("Normal");
  const [chaos, setChaos] = useState(false);
  const [pow, setPow] = useState<{ t: string; k: number } | null>(null);
  const [shake, setShake] = useState(0);
  const [over, setOver] = useState<string | null>(null);
  const [last, setLast] = useState<Move | null>(null);
  const { ref, inView } = useInView({ threshold: 0.15 });
  const started = useRef(false);

  const targets: string[] = useMemo(() => (sel ? game.current.moves({ square: sel as never, verbose: true }).map((m) => m.to) : []), [sel, pieces]);

  const finish = useCallback((g: Chess) => {
    if (!g.isGameOver()) return false;
    const res = g.isCheckmate() ? (g.turn() === "w" ? "CHECKMATE! I WIN" : "CHECKMATE! YOU WIN") : "DRAW!";
    setOver(res); setMsg(g.isCheckmate() && g.turn() === "b" ? pick(TAUNTS.lose) : pick(TAUNTS.win));
    track("chess", g.isCheckmate() ? (g.turn() === "b" ? "player_win" : "engine_win") : "draw");
    return true;
  }, []);

  const flash = (m: Move, g: Chess) => {
    if (g.isCheckmate()) { setPow({ t: "MATE!", k: Date.now() }); setShake(1); }
    else if (g.isCheck()) { setPow({ t: "CHECK!", k: Date.now() }); setShake(0.6); }
    else if (m.captured) { setPow({ t: ["POW!", "BAM!", "ZAP!", "KABOOM!"][Math.floor(Math.random() * 4)], k: Date.now() }); setShake(chaos ? 1 : 0.4); }
  };

  const enginePlay = useCallback(() => {
    setThinking(true);
    setTimeout(() => {
      const g = game.current;
      const r = pickMove(g.fen(), LEVELS[level], chaos ? 0.22 : 0);
      if (!r) { setThinking(false); return; }
      const m = g.move({ from: r.move.from, to: r.move.to, promotion: r.move.promotion });
      setPieces((p) => applyMove(p, m)); setLast(m); flash(m, g);
      setThinking(false);
      if (finish(g)) return;
      setMsg(r.wild ? pick(TAUNTS.wild) : g.isCheck() ? pick(TAUNTS.check) : m.captured ? pick(TAUNTS.capture) : pick(TAUNTS.quiet));
    }, 350);
  }, [level, chaos, finish]);

  const onSquare = (sq: string) => {
    const g = game.current;
    if (thinking || over || g.turn() !== "w") return;
    if (sel && targets.includes(sq)) {
      if (!started.current) { started.current = true; track("chess", "game_start"); }
      const m = g.move({ from: sel as never, to: sq as never, promotion: "q" });
      setPieces((p) => applyMove(p, m)); setLast(m); setSel(null); flash(m, g);
      if (!finish(g)) enginePlay();
      return;
    }
    const pc = g.get(sq as never);
    setSel(pc && pc.color === "w" ? sq : null);
  };

  const reset = () => { game.current = new Chess(); uid = 0; setPieces(initPieces()); setSel(null); setOver(null); setLast(null); setMsg("Fresh board. Yellow moves first!"); started.current = false; };
  const undo = () => { if (thinking) return; const g = game.current; g.undo(); g.undo(); uid = 0; setOver(null); setSel(null); setLast(null);
    // rebuild pieces from the board so ids stay consistent
    const ps: PieceState[] = []; g.board().forEach((row) => row.forEach((c) => { if (c) ps.push({ id: uid++, type: c.type, color: c.color, square: c.square }); })); setPieces(ps); };

  useEffect(() => { if (shake > 0) { const t = setTimeout(() => setShake(0), 450); return () => clearTimeout(t); } }, [shake]);

  return (
    <section className="chess-section" id="play" ref={ref}>
      <h2 className="chess-title">Play <span>With Me!</span></h2>
      <div className="chess-wrap">
        <div className="chess-canvas">
          {inView && <ChessScene pieces={pieces} selected={sel} targets={targets} last={last ? [last.from, last.to] : []} onSquare={onSquare} shake={shake} chaos={chaos} />}
          {pow && <div key={pow.k} className="chess-pow">{pow.t}</div>}
          {over && <div className="chess-over">{over}<button onClick={reset}>REMATCH</button></div>}
        </div>
        <aside className="chess-side">
          <div className="chess-bubble">{thinking ? "Thinking… 🤔" : msg}</div>
          <div className="chess-row">
            {(Object.keys(LEVELS) as (keyof typeof LEVELS)[]).map((l) => (
              <button key={l} className={l === level ? "on" : ""} onClick={() => setLevel(l)}>{l}</button>
            ))}
          </div>
          <button className={`chess-chaos ${chaos ? "on" : ""}`} onClick={() => { setChaos(!chaos); track("chess", "chaos_toggle"); }}>
            {chaos ? "🔥 CHAOS MODE: ON" : "😇 Chaos mode: off"}
          </button>
          <div className="chess-row">
            <button onClick={undo}>↶ Undo</button>
            <button onClick={reset}>⟳ New game</button>
          </div>
          <p className="chess-note">Drag to orbit, scroll the page to keep going. I&apos;m a small alpha-beta engine, so be kind.</p>
        </aside>
      </div>
    </section>
  );
};
export default ChessArena;
