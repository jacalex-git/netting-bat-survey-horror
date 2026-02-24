import React, { useState } from "react";
import { Backpack, Flashlight, FileText, Wrench, Radio, Droplet, Ruler, Tag, Shield, X } from "lucide-react";

const ITEM_ICONS = {
  "Headlamp": Flashlight,
  "Field Datasheets": FileText,
  "Bat Handling Gloves": Shield,
  "Mist Net Poles (x4)": Wrench,
  "Harp Trap": Wrench,
  "Calipers": Ruler,
  "Banding Kit": Tag,
  "Water Bottle": Droplet,
  "Two-Way Radio": Radio
};

export default function InventorySidebar({ inventory, isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 z-40 lg:hidden" onClick={onClose} />
      )}
      
      <div className={`
        fixed right-0 top-0 h-full w-64 z-50
        lg:relative lg:w-56 lg:h-auto lg:z-auto
        bg-black/90 border-l border-gray-800
        lg:bg-transparent lg:border-l-0
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
      `}>
        <div className="p-4 lg:p-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Backpack className="w-4 h-4 text-amber-600" />
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-amber-600/80">
                Field Equipment
              </h3>
            </div>
            <button onClick={onClose} className="lg:hidden text-gray-500 hover:text-gray-300">
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-1">
            {inventory.map((item) => {
              const Icon = ITEM_ICONS[item] || Wrench;
              return (
                <div
                  key={item}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded
                    bg-gray-900/50 border border-gray-800/50
                    hover:border-amber-900/50 hover:bg-gray-900/80
                    transition-all duration-200 group cursor-default"
                >
                  <Icon className="w-3.5 h-3.5 text-amber-700/60 group-hover:text-amber-600 transition-colors" />
                  <span className="text-xs text-gray-400 group-hover:text-gray-300 font-mono transition-colors">
                    {item}
                  </span>
                </div>
              );
            })}
            
            {inventory.length === 0 && (
              <p className="text-xs text-gray-600 italic font-mono px-2">
                Nothing remains...
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}