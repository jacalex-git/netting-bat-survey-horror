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

export default function StoryPanel({ currentText }) {
  return (
    <div className="flex-1 overflow-y-auto pr-2 flex items-center justify-center">
      {currentText && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <p className="text-gray-200 text-lg leading-relaxed font-serif">
            <FlickerText text={currentText} />
          </p>
        </motion.div>
      )}
    </div>
  );
}