import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function FlickerText({ text, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const [chars, setChars] = useState([]);
  
  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);
  
  useEffect(() => {
    if (!visible) return;
    let idx = 0;
    const interval = setInterval(() => {
      if (idx <= text.length) {
        setChars(text.slice(0, idx).split(""));
        idx++;
      } else {
        clearInterval(interval);
      }
    }, 18);
    return () => clearInterval(interval);
  }, [visible, text]);
  
  if (!visible) return null;
  
  return (
    <span>
      {chars.map((c, i) => (
        <span key={i} className={i === chars.length - 1 ? "text-amber-400/80" : ""}>
          {c}
        </span>
      ))}
      {chars.length < text.length && (
        <span className="inline-block w-1.5 h-4 bg-amber-600/60 ml-0.5 animate-pulse" />
      )}
    </span>
  );
}

export default function StoryPanel({ storyLog, currentText }) {
  const scrollRef = useRef(null);
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [storyLog, currentText]);
  
  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-thin"
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "#1a1a2a #0a0a0f"
      }}
    >
      {/* Previous entries */}
      {storyLog.map((entry, i) => (
        <div key={i} className="space-y-2">
          <p className="text-gray-300/70 text-sm leading-relaxed font-serif italic">
            {entry.text}
          </p>
          {entry.choice && (
            <p className="text-amber-700/50 text-xs font-mono pl-4 border-l border-amber-900/30">
              ▸ {entry.choice}
            </p>
          )}
          <div className="border-b border-gray-800/30 my-2" />
        </div>
      ))}
      
      {/* Current text */}
      {currentText && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-gray-200 text-sm leading-relaxed font-serif">
            <FlickerText text={currentText} />
          </p>
        </motion.div>
      )}
    </div>
  );
}