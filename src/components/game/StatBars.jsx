import React from "react";
import { Heart, Brain } from "lucide-react";

function StatBar({ icon: Icon, label, value, maxValue, colorClass, bgClass, glowClass }) {
  const pct = Math.max(0, Math.min(100, (value / maxValue) * 100));
  const isLow = pct <= 25;
  
  return (
    <div className="flex items-center gap-3">
      <div className={`flex items-center gap-1.5 min-w-[80px] ${isLow ? "animate-pulse" : ""}`}>
        <Icon className={`w-4 h-4 ${isLow ? "text-red-400" : colorClass}`} />
        <span className={`text-xs font-mono uppercase tracking-wider ${isLow ? "text-red-400" : "text-gray-400"}`}>
          {label}
        </span>
      </div>
      <div className="flex-1 h-2.5 rounded-full bg-gray-900 border border-gray-800 overflow-hidden relative">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${bgClass} ${isLow ? "animate-pulse" : ""}`}
          style={{ width: `${pct}%` }}
        />
        {isLow && (
          <div className={`absolute inset-0 rounded-full ${glowClass} opacity-20`} />
        )}
      </div>
      <span className={`text-xs font-mono w-8 text-right ${isLow ? "text-red-400" : "text-gray-500"}`}>
        {value}
      </span>
    </div>
  );
}

export default function StatBars({ health, sanity }) {
  return (
    <div className="space-y-2 p-3 rounded-lg bg-black/50 border border-gray-800/50 backdrop-blur-sm">
      <StatBar
        icon={Heart}
        label="Health"
        value={health}
        maxValue={100}
        colorClass="text-red-500"
        bgClass="bg-gradient-to-r from-red-900 to-red-600"
        glowClass="bg-red-500"
      />
      <StatBar
        icon={Brain}
        label="Sanity"
        value={sanity}
        maxValue={100}
        colorClass="text-purple-400"
        bgClass="bg-gradient-to-r from-purple-900 to-purple-500"
        glowClass="bg-purple-500"
      />
    </div>
  );
}