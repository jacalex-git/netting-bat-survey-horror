import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function TitleScreen({ onStart }) {
  const [showStart, setShowStart] = useState(false);
  const [flicker, setFlicker] = useState(false);
  
  useEffect(() => {
    const t = setTimeout(() => setShowStart(true), 2000);
    return () => clearTimeout(t);
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        setFlicker(true);
        setTimeout(() => setFlicker(false), 100);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background noise */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: flicker ? 0.3 : 1 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-serif text-gray-100 tracking-tight mb-2"
          style={{ textShadow: "0 0 30px rgba(138, 96, 8, 0.3)" }}>
          THE NETTING
        </h1>
        <p className="text-amber-800/60 text-sm font-mono tracking-[0.3em] uppercase mb-1">
          A field survey gone wrong
        </p>
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-900/40 to-transparent mx-auto mt-4 mb-8" />
        
        <p className="text-gray-500 text-xs font-mono max-w-md mx-auto leading-relaxed mb-12 px-4">
          Wetland Survey Site 7 · 23:47 · New moon · Chiroptera monitoring protocol
          <br />
          <span className="text-gray-600">Personnel: 1 · Duration: Overnight · Status: </span>
          <span className="text-red-800">INCOMPLETE</span>
        </p>
      </motion.div>
      
      {showStart && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          onClick={onStart}
          className="px-8 py-3 border border-gray-700 rounded-sm
            text-gray-300 font-mono text-sm tracking-wider uppercase
            hover:border-amber-800 hover:text-amber-200 hover:bg-amber-950/20
            transition-all duration-500
            relative group"
        >
          <span className="relative z-10">Begin Survey</span>
          <div className="absolute inset-0 bg-amber-900/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-sm" />
        </motion.button>
      )}
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 3, duration: 2 }}
        className="absolute bottom-12 text-gray-700 text-[10px] font-mono"
      >
        "Every net catches something. Some things should not be caught."
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2, duration: 2 }}
        className="absolute bottom-6 text-center text-xs text-amber-600/60"
      >
        a game by Jacob Alexander
      </motion.p>
    </div>
  );
}