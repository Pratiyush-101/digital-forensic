import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Layers,
  BookOpen,
  Keyboard,
  Info,
  Maximize2
} from "lucide-react";
import { techAudio } from "../utils/audio";

interface SlideNavigationProps {
  currentSlide: number;
  totalSlides: number;
  onChangeSlide: (slide: number) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  showNotes: boolean;
  onToggleNotes: () => void;
  autoplayProgress: number; // Percentage for auto play timer circle
}

export default function SlideNavigation({
  currentSlide,
  totalSlides,
  onChangeSlide,
  isPlaying,
  onTogglePlay,
  showNotes,
  onToggleNotes,
  autoplayProgress,
}: SlideNavigationProps) {
  const [showKeyboardHints, setShowKeyboardHints] = useState(false);

  const handleHover = () => {
    techAudio.playHover();
  };

  const handleClick = () => {
    techAudio.playTick();
  };

  const handlePrev = () => {
    handleClick();
    if (currentSlide > 1) {
      onChangeSlide(currentSlide - 1);
    }
  };

  const handleNext = () => {
    handleClick();
    if (currentSlide < totalSlides) {
      onChangeSlide(currentSlide + 1);
    }
  };

  const handleSelectSlide = (slideNum: number) => {
    handleClick();
    onChangeSlide(slideNum);
  };

  return (
    <div
      id="slide-navigation-control-panel"
      className="w-full max-w-5xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4 border border-white/10 rounded-2xl bg-[#111827]/80 backdrop-blur-xl shadow-2xl relative"
    >
      {/* Keyboard Shortcuts Popover */}
      {showKeyboardHints && (
        <div className="absolute bottom-24 left-4 z-50 glass-panel p-4 rounded-xl border border-cyber-cyan/30 bg-black max-w-xs text-left text-xs text-gray-300 space-y-2 shadow-2xl animate-bounce">
          <div className="flex items-center gap-1.5 text-cyber-cyan font-bold uppercase tracking-wide">
            <Keyboard className="w-4 h-4" />
            <span>Keyboard Shortcuts</span>
          </div>
          <div className="h-px bg-white/10 my-1" />
          <div className="flex justify-between font-mono">
            <span>Next Slide</span>
            <span className="bg-white/10 px-1.5 py-0.5 rounded text-white font-semibold">Right / Space</span>
          </div>
          <div className="flex justify-between font-mono">
            <span>Previous Slide</span>
            <span className="bg-white/10 px-1.5 py-0.5 rounded text-white font-semibold">Left Arrow</span>
          </div>
          <div className="flex justify-between font-mono">
            <span>Auto-Play</span>
            <span className="bg-white/10 px-1.5 py-0.5 rounded text-white font-semibold">P Key</span>
          </div>
          <div className="flex justify-between font-mono">
            <span>Presenter Notes</span>
            <span className="bg-white/10 px-1.5 py-0.5 rounded text-white font-semibold">N Key</span>
          </div>
        </div>
      )}

      {/* Slide index & Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={handlePrev}
          disabled={currentSlide === 1}
          onMouseEnter={handleHover}
          className="p-2 rounded-lg bg-white/5 border border-white/5 hover:bg-cyber-cyan/10 hover:border-cyber-cyan/30 text-gray-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all"
          title="Previous Slide (Left Arrow)"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Circular progress with play/pause inside */}
        <div className="relative flex items-center justify-center">
          <svg className="w-10 h-10 transform -rotate-90">
            <circle
              cx="20"
              cy="20"
              r="18"
              className="stroke-white/10"
              strokeWidth="2.5"
              fill="none"
            />
            <circle
              cx="20"
              cy="20"
              r="18"
              className="stroke-cyber-cyan transition-all duration-100 ease-linear"
              strokeWidth="2.5"
              fill="none"
              strokeDasharray={113}
              strokeDashoffset={113 - (113 * autoplayProgress) / 100}
            />
          </svg>
          <button
            onClick={() => {
              handleClick();
              onTogglePlay();
            }}
            onMouseEnter={handleHover}
            className="absolute p-2 rounded-full hover:bg-white/10 text-white transition-colors"
            title={isPlaying ? "Pause Slideshow (P)" : "Play Slideshow (P)"}
          >
            {isPlaying ? <Pause className="w-4 h-4 text-cyber-cyan" /> : <Play className="w-4 h-4" />}
          </button>
        </div>

        <button
          onClick={handleNext}
          disabled={currentSlide === totalSlides}
          onMouseEnter={handleHover}
          className="p-2 rounded-lg bg-white/5 border border-white/5 hover:bg-cyber-cyan/10 hover:border-cyber-cyan/30 text-gray-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all"
          title="Next Slide (Right Arrow)"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="font-mono text-xs text-gray-400 tracking-wider">
          SLIDE <span className="text-white font-bold">{currentSlide}</span> / {totalSlides}
        </div>
      </div>

      {/* Center timeline dots */}
      <div className="flex items-center gap-1.5 bg-black/40 p-2 rounded-xl border border-white/5 overflow-x-auto max-w-[280px] sm:max-w-none">
        {Array.from({ length: totalSlides }).map((_, idx) => {
          const slideNum = idx + 1;
          const isActive = currentSlide === slideNum;
          return (
            <button
              key={slideNum}
              onClick={() => handleSelectSlide(slideNum)}
              onMouseEnter={handleHover}
              className={`h-2 rounded-full transition-all duration-300 ${
                isActive
                  ? "w-8 bg-cyber-cyan shadow-[0_0_10px_rgba(0,229,255,0.8)]"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              title={`Jump to Slide ${slideNum}`}
            />
          );
        })}
      </div>

      {/* Toggle panels */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={() => {
            handleClick();
            setShowKeyboardHints(!showKeyboardHints);
          }}
          onMouseEnter={handleHover}
          className={`p-2 rounded-lg border flex items-center gap-1.5 text-xs font-mono transition-all ${
            showKeyboardHints
              ? "bg-cyber-cyan/15 border-cyber-cyan text-cyber-cyan shadow-[0_0_8px_rgba(0,229,255,0.2)]"
              : "bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10"
          }`}
          title="Keyboard Shortcuts"
        >
          <Keyboard className="w-4 h-4" />
          <span className="hidden md:inline">Shortcuts</span>
        </button>

        <button
          onClick={() => {
            handleClick();
            onToggleNotes();
          }}
          onMouseEnter={handleHover}
          className={`p-2 rounded-lg border flex items-center gap-1.5 text-xs font-mono transition-all ${
            showNotes
              ? "bg-cyber-cyan/15 border-cyber-cyan text-cyber-cyan shadow-[0_0_8px_rgba(0,229,255,0.2)]"
              : "bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10"
          }`}
          title="Toggle Seminar Presenter Guide (N)"
        >
          <BookOpen className="w-4 h-4" />
          <span className="hidden md:inline">Presenter Notes</span>
        </button>
      </div>
    </div>
  );
}
