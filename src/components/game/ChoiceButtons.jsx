import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChoiceButtons({ choices, onChoice, disabled }) {
  const [showChoices, setShowChoices] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => setShowChoices(true), 1200);
    return () => clearTimeout(timeout);
  }, [choices]);
  
  useEffect(() => {
    setShowChoices(false);
  }, [choices]);
  
  if (!showChoices || !choices.length) return <div className="h-32" />;
  
  return (
    <div className="space-y-2 pt-2">
      <AnimatePresence>
        {choices.map((choice, i) => (
          <motion.button
            key={`${choice.text}-${i}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15, duration: 0.3 }}
            onClick={() => !disabled && onChoice(choice)}
            disabled={disabled}
            className="w-full text-left px-4 py-3 rounded-sm
              bg-gray-950/80 border border-gray-800/60
              hover:border-amber-800/50 hover:bg-gray-900/60
              active:bg-amber-950/30
              transition-all duration-200 group
              disabled:opacity-40 disabled:cursor-not-allowed
              relative overflow-hidden"
            style={{
              fontFamily: "'Courier New', monospace",
              transform: `rotate(${(Math.random() - 0.5) * 0.3}deg)`
            }}
          >
            {/* Torn paper edge effect */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-amber-900/20 group-hover:bg-amber-700/40 transition-colors" />
            
            <div className="flex items-start gap-3">
              <span className="text-amber-700/50 text-sm mt-0.5 font-mono group-hover:text-amber-600/80 transition-colors">
                [{String.fromCharCode(65 + i)}]
              </span>
              <span className="text-gray-300 text-base group-hover:text-gray-100 transition-colors leading-relaxed">
                {choice.text}
              </span>
            </div>
            
            {/* Stat change hints */}
            <div className="flex gap-2 ml-7 mt-1">
              {choice.healthChange < 0 && (
                <span className="text-red-800/60 text-[10px] font-mono">
                  ♥{choice.healthChange}
                </span>
              )}
              {choice.sanityChange < -10 && (
                <span className="text-purple-700/60 text-[10px] font-mono">
                  ◈{choice.sanityChange}
                </span>
              )}
              {choice.requiresItem && (
                <span className="text-amber-800/50 text-[10px] font-mono">
                  [{choice.requiresItem}]
                </span>
              )}
            </div>
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}