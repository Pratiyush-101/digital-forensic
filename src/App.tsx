import React, { useState, useEffect, useRef } from "react";
import {
  ShieldAlert,
  Maximize2,
  Volume2,
  VolumeX,
  FileText,
  User,
  Power,
  Tv
} from "lucide-react";
import BinaryRainBackground from "./components/BinaryRainBackground";
import SlideRenderer from "./components/SlideRenderer";
import SlideNavigation from "./components/SlideNavigation";
import PresenterNotes from "./components/PresenterNotes";
import { techAudio } from "./utils/audio";

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 11;

  // Presentation State
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNotes, setShowNotes] = useState(true); // Default open to guide the student!
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Autoplay sequence tracking variables
  const [autoplayProgress, setAutoplayProgress] = useState(0);
  const slideDurationMs = 12000; // 12 seconds per slide in autoplay mode
  const progressIntervalMs = 100; // 10 ticks per second
  const progressIncrement = (progressIntervalMs / slideDurationMs) * 100;

  // Sync state variables with audio instance
  useEffect(() => {
    techAudio.enabled = audioEnabled;
  }, [audioEnabled]);

  // Autoplay Timer loop
  useEffect(() => {
    let progressTimer: any;
    
    if (isPlaying) {
      progressTimer = setInterval(() => {
        setAutoplayProgress((prev) => {
          if (prev >= 100) {
            // Move to next slide
            setCurrentSlide((current) => {
              if (current < totalSlides) {
                techAudio.playTransition();
                return current + 1;
              } else {
                // Wrap around to start slide
                techAudio.playTransition();
                return 1;
              }
            });
            return 0;
          }
          return prev + progressIncrement;
        });
      }, progressIntervalMs);
    } else {
      setAutoplayProgress(0);
    }

    return () => {
      if (progressTimer) clearInterval(progressTimer);
    };
  }, [isPlaying, currentSlide]);

  // Handle slide transitions explicitly
  const handleChangeSlide = (slideNum: number) => {
    setCurrentSlide(slideNum);
    setAutoplayProgress(0);
  };

  // Keyboard Navigation Controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid triggering when user typing inside input tags if any
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      switch (e.code) {
        case "ArrowRight":
        case "Space":
          e.preventDefault();
          if (currentSlide < totalSlides) {
            setCurrentSlide((prev) => prev + 1);
            setAutoplayProgress(0);
            techAudio.playTick();
          }
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (currentSlide > 1) {
            setCurrentSlide((prev) => prev - 1);
            setAutoplayProgress(0);
            techAudio.playTick();
          }
          break;
        case "KeyP":
        case "KeyS":
          e.preventDefault();
          setIsPlaying((prev) => !prev);
          techAudio.playTick();
          break;
        case "KeyN":
          e.preventDefault();
          setShowNotes((prev) => !prev);
          techAudio.playTick();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide]);

  // Fullscreen toggle handler
  const handleToggleFullscreen = () => {
    techAudio.playTick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.warn("Fullscreen request failed", err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Sound effects on mouse hover actions
  const handleHover = () => {
    techAudio.playHover();
  };

  return (
    <div
      id="applet-viewport-root"
      className="min-h-screen relative flex flex-col justify-between overflow-hidden text-white font-sans selection:bg-cyber-cyan selection:text-black"
    >
      {/* Dynamic Animated Canvas Binary / Grid Background */}
      <BinaryRainBackground speedMultiplier={1} particleDensity={50} />

      {/* --------------------------------------------------------
          PRESENTATION HEADER DECK
          -------------------------------------------------------- */}
      <header
        id="applet-presentation-header"
        className="w-full px-6 h-14 border-b border-white/10 bg-[#111827]/80 backdrop-blur-xl flex items-center justify-between z-30"
      >
        {/* Left Side: Glowing Badge & Title details */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00BFFF] to-[#7C3AED] flex items-center justify-center shadow-[0_0_15px_rgba(0,191,255,0.3)]">
            <ShieldAlert className="w-4 h-4 text-white animate-pulse" />
          </div>
          <div className="text-left">
            <h1 className="font-display font-bold text-sm tracking-widest text-[#00E5FF] uppercase flex items-center gap-1.5 leading-none">
              <span>Digital Forensics Seminar</span>
              <span className="text-[10px] font-mono bg-cyber-blue/10 text-cyber-blue px-2 py-0.5 rounded border border-cyber-blue/20">
                BCA SEM 2
              </span>
            </h1>
            <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest leading-none mt-1">
              Topic: Uncovering digital evidence in 2026
            </p>
          </div>
        </div>

        {/* Right Side: Quick Action buttons + Live presentation timer */}
        <div className="flex items-center gap-4">
          
          {/* Audio toggle button */}
          <button
            onClick={() => {
              techAudio.playTick();
              setAudioEnabled(!audioEnabled);
            }}
            onMouseEnter={handleHover}
            className={`p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all ${
              audioEnabled ? "text-cyber-cyan" : "text-gray-500"
            }`}
            title={audioEnabled ? "Mute UI Audio Synth" : "Unmute UI Audio Synth"}
          >
            {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Fullscreen mock button */}
          <button
            onClick={handleToggleFullscreen}
            onMouseEnter={handleHover}
            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-gray-400 hover:text-white transition-all hidden sm:flex"
            title="Toggle fullscreen view"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* --------------------------------------------------------
          MAIN STAGE & PRESENTATION WRAPPER
          -------------------------------------------------------- */}
      <main
        id="applet-presentation-body-viewport"
        className={`flex-1 flex transition-all duration-500 ease-out z-20 ${
          showNotes ? "mr-[360px] md:mr-[420px]" : "mr-0"
        }`}
      >
        <div className="flex-1 flex flex-col justify-between p-6 overflow-y-auto bg-[#050505] radial-dots-bg relative">
          
          {/* Core slide render canvas stage */}
          <div className="flex-1 flex items-center justify-center relative min-h-[460px]">
            {/* Holographic glowing borders representing high-end keynote stage */}
            <div className="absolute inset-0 border border-white/10 rounded-3xl pointer-events-none -z-10" />
            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-cyber-cyan to-transparent opacity-40" />
            <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-cyber-purple to-transparent opacity-40" />

            {/* Slide Stage Renderer */}
            <SlideRenderer currentSlide={currentSlide} />
          </div>

          {/* Controller and Navigation Overlay at bottom of viewport */}
          <div className="mt-6">
            <SlideNavigation
              currentSlide={currentSlide}
              totalSlides={totalSlides}
              onChangeSlide={handleChangeSlide}
              isPlaying={isPlaying}
              onTogglePlay={() => setIsPlaying(!isPlaying)}
              showNotes={showNotes}
              onToggleNotes={() => setShowNotes(!showNotes)}
              autoplayProgress={autoplayProgress}
            />
          </div>
        </div>
      </main>

      {/* --------------------------------------------------------
          PRESENTER NOTES DRAWER PANEL
          -------------------------------------------------------- */}
      <PresenterNotes
        currentSlide={currentSlide}
        isOpen={showNotes}
        onToggle={() => setShowNotes(!showNotes)}
        audioEnabled={audioEnabled}
        onToggleAudio={() => setAudioEnabled(!audioEnabled)}
      />

      {/* --------------------------------------------------------
          BROADCASTING STATUS FOOTER
          -------------------------------------------------------- */}
      <footer
        id="applet-presentation-system-footer"
        className="w-full px-6 h-12 border-t border-white/10 bg-[#111827] backdrop-blur-md text-[10px] text-gray-400 font-mono flex items-center justify-between z-30"
      >
        <div className="flex items-center gap-4">
          <span className="text-gray-500 font-bold">SYS_DEC::</span>
          <span className="text-[#00E5FF] font-bold tracking-wider">DIGITAL EVIDENCE INDEX SECURED</span>
          <span className="text-white/20 hidden sm:inline">|</span>
          <span className="hidden sm:inline">BCA SEMESTER 2</span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/80">Recording Enabled</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="text-[10px] text-white/40 uppercase tracking-widest">Seminar: 12:00m Est</div>
        </div>
      </footer>
    </div>
  );
}
