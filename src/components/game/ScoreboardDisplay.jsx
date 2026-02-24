import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";

export default function ScoreboardDisplay({ currentEnding, currentTurns, onClose }) {
  const [initials, setInitials] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { data: scores = [], refetch } = useQuery({
    queryKey: ['scoreboard'],
    queryFn: async () => {
      const results = await base44.entities.Scoreboard.list('-created_date', 5);
      return results;
    },
    initialData: []
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (initials.length === 3 && currentEnding && !submitted) {
      await base44.entities.Scoreboard.create({
        initials: initials.toUpperCase(),
        ending: currentEnding,
        turns: currentTurns
      });
      setSubmitted(true);
      refetch();
    }
  };

  const endingMap = {
    ending_escape: "SURVIVOR",
    ending_absorbed: "ABSORBED",
    ending_cave: "CATALOGUED",
    ending_documented: "DOCUMENTED",
    ending_darkness: "CONSUMED"
  };

  const endingName = endingMap[currentEnding] || "UNKNOWN";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-b from-gray-900 to-black border-4 border-amber-700/50 rounded-lg p-8 max-w-md w-full
          shadow-[0_0_30px_rgba(202,138,4,0.3)]"
        style={{
          boxShadow: "0 0 30px rgba(202,138,4,0.3), inset 0 0 20px rgba(0,0,0,0.8)"
        }}
      >
        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2 text-amber-500 tracking-widest"
            style={{
              fontFamily: "'Press Start 2P', 'Courier New', monospace",
              textShadow: "0 0 10px rgba(202,138,4,0.8), 0 2px 0 #000"
            }}
          >
            HIGH SCORES
          </h2>
          <div className="h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent" />
        </div>

        {/* Current Game Result */}
        {!submitted && currentEnding && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-amber-900/20 border-2 border-amber-700/40 rounded"
          >
            <p className="text-center text-amber-400 text-sm font-mono mb-2">
              ENDING: {endingName}
            </p>
            <p className="text-center text-amber-500/70 text-xs font-mono">
              TURNS: {currentTurns}
            </p>
            <form onSubmit={handleSubmit} className="mt-4 flex gap-2 justify-center">
              <input
                type="text"
                maxLength={3}
                value={initials}
                onChange={(e) => setInitials(e.target.value.toUpperCase())}
                placeholder="AAA"
                className="w-20 text-center text-2xl font-bold bg-black/60 border-2 border-amber-700/50 
                  text-amber-400 rounded px-2 py-1 focus:outline-none focus:border-amber-500
                  focus:shadow-[0_0_10px_rgba(202,138,4,0.5)]"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
                autoFocus
              />
              <button
                type="submit"
                disabled={initials.length !== 3}
                className="px-4 py-1 bg-amber-700 hover:bg-amber-600 disabled:bg-gray-700 
                  disabled:opacity-50 text-black font-bold rounded border-2 border-amber-500
                  disabled:border-gray-600 transition-all text-sm"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                SAVE
              </button>
            </form>
          </motion.div>
        )}

        {/* Scoreboard */}
        <div className="space-y-2 mb-6">
          {scores.map((score, index) => (
            <motion.div
              key={score.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex justify-between items-center px-4 py-2 rounded
                ${submitted && index === 0 && score.initials === initials.toUpperCase()
                  ? 'bg-amber-700/30 border-2 border-amber-500 animate-pulse'
                  : 'bg-black/40 border border-amber-900/30'}`}
            >
              <span className="text-amber-400 font-mono text-sm font-bold">
                {index + 1}. {score.initials}
              </span>
              <span className="text-amber-500/70 font-mono text-xs">
                {endingMap[score.ending] || score.ending}
              </span>
              <span className="text-amber-600/50 font-mono text-xs">
                {score.turns}T
              </span>
            </motion.div>
          ))}
          {scores.length === 0 && (
            <div className="text-center text-amber-700/50 font-mono text-sm py-8">
              NO SCORES YET
            </div>
          )}
        </div>

        {/* Close button */}
        {currentEnding ? (
          <button
            onClick={onClose}
            className="w-full py-2 bg-gray-800 hover:bg-gray-700 text-amber-500 font-bold 
              rounded border-2 border-gray-700 hover:border-amber-800 transition-all text-sm"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            PLAY AGAIN
          </button>
        ) : (
          <button
            onClick={onClose}
            className="w-full py-2 bg-gray-800 hover:bg-gray-700 text-amber-500 font-bold 
              rounded border-2 border-gray-700 hover:border-amber-800 transition-all text-sm"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            CONTINUE
          </button>
        )}

        {/* Decorative scanlines */}
        <div 
          className="absolute inset-0 pointer-events-none rounded-lg opacity-10"
          style={{
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(202,138,4,0.1) 2px, rgba(202,138,4,0.1) 4px)"
          }}
        />
      </motion.div>
    </motion.div>
  );
}