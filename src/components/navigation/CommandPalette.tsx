'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useWorld } from '@/lib/WorldProvider';
import { commands, aiResponses } from '@/data/portfolio';

export default function CommandPalette() {
  const { state, dispatch, toggleCommandPalette } = useWorld();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [inlineResponse, setInlineResponse] = useState<string | null>(null);

  /* ── Keyboard shortcut to open ── */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === '/' && !state.commandPaletteOpen) {
        e.preventDefault();
        dispatch({ type: 'SET_COMMAND_PALETTE', payload: true });
      }
      if (e.key === 'Escape' && state.commandPaletteOpen) {
        dispatch({ type: 'SET_COMMAND_PALETTE', payload: false });
        setQuery('');
        setInlineResponse(null);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [state.commandPaletteOpen, dispatch]);

  /* ── Focus input when opened ── */
  useEffect(() => {
    if (state.commandPaletteOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [state.commandPaletteOpen]);

  /* ── Fuzzy filter commands ── */
  const filteredCommands = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(cmd =>
      cmd.label.toLowerCase().includes(q) ||
      cmd.keywords.some(k => k.includes(q))
    );
  }, [query]);

  /* ── Reset active index on filter change ── */
  useEffect(() => {
    setActiveIndex(0);
  }, [filteredCommands.length]);

  /* ── AI intent matching ── */
  const tryAIResponse = useCallback((q: string): string | null => {
    const lower = q.toLowerCase();
    for (const resp of aiResponses) {
      const match = resp.keywords.some(k => lower.includes(k));
      if (match) return resp.response;
    }
    return null;
  }, []);

  /* ── Execute command ── */
  const executeCommand = useCallback((cmd: typeof commands[0]) => {
    dispatch({ type: 'SET_COMMAND_PALETTE', payload: false });
    setQuery('');
    setInlineResponse(null);

    switch (cmd.action) {
      case 'navigate':
        router.push(cmd.target);
        break;
      case 'external':
        window.open(cmd.target, '_blank', 'noopener,noreferrer');
        break;
      case 'download':
        window.open(cmd.target, '_blank');
        break;
      case 'inline':
        setInlineResponse(cmd.target);
        dispatch({ type: 'SET_COMMAND_PALETTE', payload: true });
        break;
    }
  }, [dispatch, router]);

  /* ── Keyboard navigation ── */
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => Math.min(prev + 1, filteredCommands.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[activeIndex]) {
        executeCommand(filteredCommands[activeIndex]);
      } else if (query.trim()) {
        /* Try AI response for natural language */
        const aiResp = tryAIResponse(query);
        if (aiResp) {
          setInlineResponse(aiResp);
        }
      }
    }
  }, [activeIndex, filteredCommands, executeCommand, query, tryAIResponse]);

  if (!state.commandPaletteOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="command-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            dispatch({ type: 'SET_COMMAND_PALETTE', payload: false });
            setQuery('');
            setInlineResponse(null);
          }
        }}
        role="dialog"
        aria-label="Command palette — navigate the portfolio"
        aria-modal="true"
      >
        <motion.div
          className="command-container"
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="command-header">
            SAMANYU OS v1.0
          </div>

          <div className="command-input-wrapper">
            <span className="command-prompt">&gt;</span>
            <input
              ref={inputRef}
              className="command-input"
              value={query}
              onChange={e => {
                setQuery(e.target.value);
                setInlineResponse(null);
              }}
              onKeyDown={handleKeyDown}
              placeholder="type a command or ask a question..."
              autoComplete="off"
              spellCheck={false}
              aria-label="Command input"
            />
          </div>

          {/* AI inline response */}
          {inlineResponse && (
            <motion.div
              className="command-response"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              {inlineResponse}
            </motion.div>
          )}

          {/* Command results */}
          <div className="command-results" role="listbox">
            {filteredCommands.map((cmd, i) => (
              <div
                key={cmd.id}
                className={`command-item ${i === activeIndex ? 'active' : ''}`}
                onClick={() => executeCommand(cmd)}
                onMouseEnter={() => setActiveIndex(i)}
                role="option"
                aria-selected={i === activeIndex}
              >
                <span className="command-item-indicator" />
                {cmd.label}
                {cmd.shortcut && (
                  <span className="command-item-shortcut">{cmd.shortcut}</span>
                )}
              </div>
            ))}

            {filteredCommands.length === 0 && query.trim() && (
              <div className="command-item" style={{ color: 'var(--text-muted)' }}>
                press enter to ask samanyu os...
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
