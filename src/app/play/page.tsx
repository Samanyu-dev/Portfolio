"use client";

import { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

export default function PlayChess() {
  const [game, setGame] = useState(new Chess());
  const [gameStatus, setGameStatus] = useState("Your Turn");

  useEffect(() => {
    checkStatus();
  }, [game]);

  const makeAMove = (move: string | { from: string; to: string; promotion?: string }) => {
    try {
      const gameCopy = new Chess(game.fen());
      const result = gameCopy.move(move);
      setGame(gameCopy);
      return result;
    } catch (e) {
      return null;
    }
  };

  const makeRandomMove = () => {
    const possibleMoves = game.moves();
    if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    setTimeout(() => {
      makeAMove(possibleMoves[randomIndex]);
    }, 300);
  };

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (move === null) return false;
    
    // Check if the game is over after user's move
    if (!game.isGameOver() && !game.isDraw()) {
      makeRandomMove();
    }
    
    return true;
  };

  const checkStatus = () => {
    if (game.isCheckmate()) {
      setGameStatus(game.turn() === "w" ? "Checkmate - Black wins!" : "Checkmate - White wins!");
    } else if (game.isDraw()) {
      setGameStatus("Game Over - Draw");
    } else if (game.isCheck()) {
      setGameStatus("Check!");
    } else {
      setGameStatus("Your Turn");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b080c] flex flex-col items-center py-12 px-4 selection:bg-[var(--primary)] selection:text-white relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary)]/10 blur-[150px] animate-pulse-glow" />
      <div className="absolute left-0 top-0 h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="absolute right-0 bottom-0 h-[300px] w-[300px] rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="w-full max-w-4xl relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-[var(--primary)] transition-colors mb-8">
          <MdArrowBack /> Back to Terminal
        </Link>

        <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
          <div className="w-full max-w-[500px] glass p-6 rounded-3xl border border-white/5 shadow-2xl relative bg-[#1a1a1a]/40 backdrop-blur-xl">
            <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-black tracking-tight text-white/90 font-['Geist']">Beat the Algorithm</h1>
                <p className="text-sm font-mono tracking-widest text-[var(--primary)] uppercase mt-1">Difficulty: Random Agent</p>
              </div>
              <div className="text-right">
                <span className="inline-flex px-3 py-1 bg-[var(--primary)]/10 border border-[var(--primary)]/30 text-[var(--primary)] rounded-full text-xs font-bold uppercase tracking-wider">
                  {gameStatus}
                </span>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-white/10 shadow-inner">
              <Chessboard 
                position={game.fen()} 
                onPieceDrop={onDrop}
                customDarkSquareStyle={{ backgroundColor: '#2a2a2a' }}
                customLightSquareStyle={{ backgroundColor: '#e0e0e0' }}
                boardOrientation="white"
              />
            </div>
            
            <div className="mt-6 flex justify-between items-center">
              <button 
                onClick={() => {
                  setGame(new Chess());
                  setGameStatus("Your Turn");
                }}
                className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-medium transition-colors text-white"
              >
                Reset Game
              </button>
            </div>
          </div>
          
          <div className="w-full md:w-[300px] flex flex-col gap-6">
            <div className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-[var(--primary)]/30 transition-colors bg-[#1a1a1a]/40 backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-lg font-bold text-white mb-2">Why a Chess Easter Egg?</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                As an AI Engineer, I specialize in state-space search algorithms (MCTS) and reinforcement learning. While this bot just makes random moves for now, it's a nod to classical AI problem solving.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
