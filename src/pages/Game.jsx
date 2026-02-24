import React, { useState, useCallback, useEffect } from "react";
import { Backpack } from "lucide-react";
import PixelArtCanvas from "../components/game/PixelArtCanvas";
import StatBars from "../components/game/StatBars";
import InventorySidebar from "../components/game/InventorySidebar";
import StoryPanel from "../components/game/StoryPanel";
import ChoiceButtons from "../components/game/ChoiceButtons";
import TitleScreen from "../components/game/TitleScreen";
import {
  getInitialState,
  getSceneText,
  getSceneChoices,
  getSceneArt,
  applyChoice
} from "../components/game/GameEngine";

export default function Game() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameState, setGameState] = useState(null);
  const [currentText, setCurrentText] = useState("");
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const startGame = useCallback(() => {
    const initial = getInitialState();
    setGameState(initial);
    setCurrentText(getSceneText("arrival", {}));
    setGameStarted(true);
  }, []);

  const handleChoice = useCallback((choice) => {
    if (transitioning || !gameState) return;
    setTransitioning(true);

    // Apply choice to state
    const newState = applyChoice(gameState, choice);
    
    // Check if restarting
    if (choice.next === "__restart__") {
      setTimeout(() => {
        setGameStarted(false);
        setGameState(null);
        setCurrentText("");
        setTransitioning(false);
      }, 500);
      return;
    }
    
    setTimeout(() => {
      setGameState(newState);
      const newText = getSceneText(newState.currentScene, newState.flags);
      setCurrentText(newText);
      setTransitioning(false);
    }, 500);
  }, [gameState, transitioning]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!gameState || transitioning) return;
    
    const choices = getSceneChoices(
      gameState.currentScene,
      gameState.health,
      gameState.sanity,
      gameState.inventory
    );

    const handler = (e) => {
      const idx = e.key.charCodeAt(0) - 97; // a=0, b=1, etc
      if (idx >= 0 && idx < choices.length) {
        handleChoice(choices[idx]);
      }
    };
    
    window.addEventListener("keypress", handler);
    return () => window.removeEventListener("keypress", handler);
  }, [gameState, transitioning, handleChoice]);

  if (!gameStarted) {
    return <TitleScreen onStart={startGame} />;
  }

  if (!gameState) return null;

  const artScene = getSceneArt(gameState.currentScene);
  const choices = getSceneChoices(
    gameState.currentScene,
    gameState.health,
    gameState.sanity,
    gameState.inventory
  );

  return (
    <div className="min-h-screen bg-black text-gray-200 relative overflow-hidden">
      {/* Background texture */}
      <div className="fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        {/* Main game area */}
        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full p-4 lg:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-xs font-mono text-gray-600 uppercase tracking-[0.2em]">
                The Netting
              </h2>
              <span className="text-[10px] font-mono text-gray-700">
                Turn {gameState.turnCount}
              </span>
            </div>
            <button
              onClick={() => setInventoryOpen(!inventoryOpen)}
              className="lg:hidden p-2 text-gray-500 hover:text-amber-600 transition-colors"
            >
              <Backpack className="w-5 h-5" />
            </button>
          </div>

          {/* Pixel art */}
          <div className="mb-4">
            <PixelArtCanvas scene={artScene} />
          </div>

          {/* Stat bars and headlamp */}
          <div className="mb-4 space-y-2">
            <StatBars health={gameState.health} sanity={gameState.sanity} />
            <div className="flex items-center justify-between bg-black/40 border border-gray-800/40 rounded px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-gray-500">Headlamp Battery:</span>
                <div className="w-32 h-2 bg-gray-900/80 border border-gray-800 rounded-sm overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      gameState.battery_level === 0 
                        ? 'bg-red-900/60' 
                        : 'bg-gradient-to-r from-amber-700 to-amber-500'
                    }`}
                    style={{ width: `${gameState.battery_level}%` }}
                  />
                </div>
                <span className={`text-xs font-mono ${
                  gameState.battery_level === 0 
                    ? 'text-red-600/80 animate-pulse' 
                    : 'text-amber-600/70'
                }`}>
                  {gameState.battery_level}%
                  {gameState.battery_level === 0 && " - DARKNESS"}
                </span>
              </div>
              <button
                onClick={() => {
                  if (gameState.battery_level >= 10 && gameState.sanity < 100) {
                    const newState = {
                      ...gameState,
                      sanity: Math.min(100, gameState.sanity + 15),
                      battery_level: Math.max(0, gameState.battery_level - 10)
                    };
                    setGameState(newState);
                  }
                }}
                disabled={gameState.battery_level < 10 || gameState.sanity >= 100}
                className="px-3 py-1 text-xs font-mono bg-amber-900/20 border border-amber-800/40 rounded
                  hover:bg-amber-800/30 disabled:opacity-30 disabled:cursor-not-allowed
                  transition-colors text-amber-600/80 hover:text-amber-500"
              >
                Use Headlamp (+15 sanity)
              </button>
            </div>
          </div>

          {/* Story + Choices area */}
          <div className="flex-1 flex flex-col min-h-[300px] max-h-[400px] lg:max-h-[450px] 
            bg-black/30 border border-gray-800/30 rounded-lg p-4">
            <StoryPanel currentText={currentText} />
            <ChoiceButtons
              choices={choices}
              onChoice={handleChoice}
              disabled={transitioning}
            />
          </div>

          {/* Bottom note */}
          <p className="text-center text-[10px] font-mono text-gray-800 mt-4">
            Press [A] [B] [C] to choose · Inventory on the right
          </p>
        </div>

        {/* Inventory sidebar - desktop always visible, mobile toggle */}
        <div className="hidden lg:block lg:w-56 lg:border-l lg:border-gray-900 lg:p-4">
          <InventorySidebar
            inventory={gameState.inventory}
            isOpen={true}
            onClose={() => {}}
          />
        </div>

        {/* Mobile inventory */}
        <div className="lg:hidden">
          <InventorySidebar
            inventory={gameState.inventory}
            isOpen={inventoryOpen}
            onClose={() => setInventoryOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}