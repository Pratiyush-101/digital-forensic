import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Smartphone,
  Laptop,
  Cloud,
  Mail,
  Globe,
  Wifi,
  Tv,
  HardDrive,
  Watch,
  Shield,
  Search,
  FolderDown,
  ShieldAlert,
  Cpu,
  Award,
  Activity,
  Database,
  Network,
  CheckCircle,
  XCircle,
  AlertCircle,
  MapPin,
  Radio,
  HelpCircle,
  Unlock,
  Lock,
  Camera,
  Layers,
  ChevronRight,
  RefreshCw,
  Fingerprint
} from "lucide-react";
import { techAudio } from "../utils/audio";

interface SlideRendererProps {
  currentSlide: number;
}

export default function SlideRenderer({ currentSlide }: SlideRendererProps) {
  // Slide 7 (Remote Robbery) sub-step state for custom animation replay
  const [robberyStep, setRobberyStep] = useState(0);

  // Slide 8 (Myths vs Reality) reveal trigger state
  const [showReality, setShowReality] = useState(false);

  // Slide 9 (Countdown effect) state
  const [countdown, setCountdown] = useState(10);
  const [isCounting, setIsCounting] = useState(false);

  // Re-trigger states when slide changes
  useEffect(() => {
    techAudio.playTransition();

    if (currentSlide === 7) {
      setRobberyStep(0);
      const timer = setInterval(() => {
        setRobberyStep((prev) => {
          if (prev < 5) {
            techAudio.playPulse();
            return prev + 1;
          }
          clearInterval(timer);
          return prev;
        });
      }, 2500);
      return () => clearInterval(timer);
    }

    if (currentSlide === 8) {
      setShowReality(false);
      // Auto-reveal reality after 3 seconds
      const timer = setTimeout(() => {
        setShowReality(true);
        techAudio.playPulse();
      }, 3500);
      return () => clearTimeout(timer);
    }

    if (currentSlide === 9) {
      setCountdown(10);
      setIsCounting(true);
    } else {
      setIsCounting(false);
    }
  }, [currentSlide]);

  // Countdown timer for Slide 9
  useEffect(() => {
    if (isCounting && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
        if (countdown === 1) {
          techAudio.playLaser();
        } else {
          techAudio.playHover();
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, isCounting]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
    hover: {
      y: -8,
      scale: 1.02,
      borderColor: "rgba(0, 229, 255, 0.4)",
      boxShadow: "0 10px 25px -5px rgba(0, 229, 255, 0.15)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  // --------------------------------------------------------
  // SLIDE 1: Cover Slide
  // --------------------------------------------------------
  const renderSlide1 = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col lg:flex-row items-center justify-between gap-12 w-full max-w-6xl mx-auto h-full px-4"
    >
      {/* Text column */}
      <div className="flex-1 space-y-6 text-left">
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-cyber-blue/10 border border-cyber-blue/25 px-3.5 py-1.5 rounded-full">
          <Shield className="w-4 h-4 text-cyber-blue animate-pulse" />
          <span className="font-mono text-xs text-cyber-blue tracking-wider font-semibold">BCA SEMESTER 2 • SEMINAR</span>
        </motion.div>
        
        <div className="space-y-3">
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-display font-black tracking-tight text-white uppercase leading-none"
          >
            Digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-blue to-cyber-purple text-glow-cyan">
              Forensics
            </span>
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className="text-gray-400 font-sans text-lg md:text-xl leading-relaxed max-w-lg"
          >
            Uncovering Digital Evidence in the Modern World: The science behind solving virtual crime files.
          </motion.p>
        </div>

        <motion.div
          variants={itemVariants}
          className="h-1 w-24 bg-gradient-to-r from-cyber-cyan to-cyber-purple rounded-full"
        />

        <motion.p
          variants={itemVariants}
          className="font-mono text-sm text-gray-500 tracking-widest pt-2 uppercase"
        >
          A Seminar Presentation by BCA Students
        </motion.p>
      </div>

      {/* Cyber Fingerprint Column */}
      <motion.div
        variants={itemVariants}
        className="flex-1 flex justify-center items-center relative"
      >
        {/* Glow behind fingerprint */}
        <div className="absolute w-72 h-72 bg-cyber-cyan/10 rounded-full blur-3xl -z-10 animate-pulse" />
        
        {/* Outer orbital rings */}
        <svg className="absolute w-[360px] h-[360px] pointer-events-none animate-[spin_60s_linear_infinite]" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(0, 229, 255, 0.15)" strokeWidth="0.5" strokeDasharray="3 3" />
          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(124, 58, 237, 0.1)" strokeWidth="1" />
          <path d="M 50 4 A 46 46 0 0 1 96 50" fill="none" stroke="#00E5FF" strokeWidth="1" />
          <path d="M 50 96 A 46 46 0 0 1 4 50" fill="none" stroke="#7C3AED" strokeWidth="1" strokeDasharray="10 5" />
        </svg>

        <div className="relative glass-panel p-8 rounded-3xl border border-white/10 neon-glow-cyan bg-black/60">
          {/* Custom SVG Fingerprint embedded with Binary Codes */}
          <svg
            className="w-56 h-56 md:w-64 md:h-64 text-cyber-cyan drop-shadow-[0_0_15px_rgba(0,229,255,0.4)]"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          >
            {/* Fingerprint Loops */}
            <path d="M50,15 C40,15 32,23 32,35 C32,45 38,48 38,55 C38,62 34,66 34,75" />
            <path d="M50,22 C43,22 37,28 37,35 C37,42 41,45 42,50 C43,55 42,60 41,65 C40,70 39,75 41,82" stroke="url(#cyan-grad)" strokeWidth="1.5" />
            <path d="M50,29 C46,29 42,32 42,35 C42,40 46,41 47,45 C48,49 46,54 46,59 C46,65 48,72 50,88" />
            <path d="M50,36 C48,36 47,37 47,39 C47,41 49,43 50,45 C51,47 52,50 51,55 C50,60 51,68 53,78" stroke="url(#purple-grad)" />
            <path d="M50,9 C37,9 27,19 27,35 C27,48 31,51 31,58 C31,65 26,71 25,80" />
            <path d="M50,3 C32,3 18,17 18,35 C18,52 23,55 23,65 C23,75 16,81 14,90" stroke="url(#cyan-grad)" />
            <path d="M50,42 C51,42 53,44 53,47 C53,50 52,53 54,60 C56,67 58,72 59,85" />
            <path d="M50,48 C52,48 56,52 56,60 C56,68 62,73 64,88" />
            <path d="M50,29 C55,29 59,32 59,35 C59,41 54,44 54,51 C54,58 58,63 59,71" stroke="url(#cyan-grad)" />
            <path d="M50,22 C57,22 63,28 63,35 C63,44 58,47 58,54 C58,61 62,66 63,75" />
            <path d="M50,15 C60,15 68,23 68,35 C68,47 62,51 62,58 C62,65 67,71 69,80" stroke="url(#purple-grad)" />
            <path d="M50,9 C63,9 73,19 73,35 C73,50 67,54 67,62 C67,70 72,76 75,85" />
            <path d="M50,3 C68,3 82,17 82,35 C82,53 72,58 72,68 C72,78 79,83 82,92" stroke="url(#cyan-grad)" />

            {/* Definitions for beautiful gradients */}
            <defs>
              <linearGradient id="cyan-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00E5FF" />
                <stop offset="100%" stopColor="#00BFFF" />
              </linearGradient>
              <linearGradient id="purple-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#00E5FF" />
              </linearGradient>
            </defs>
          </svg>

          {/* Glowing Fingerprint Label */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 px-3 py-1 rounded border border-cyber-cyan/30 text-[10px] font-mono text-cyber-cyan tracking-widest uppercase animate-pulse">
            HASH SECURE
          </div>
        </div>

        {/* Binary Floating labels */}
        <motion.div
          animate={{ y: [0, -10, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-12 left-8 font-mono text-xs text-cyber-cyan/40"
        >
          SHA256::7C3AED...
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-12 right-6 font-mono text-xs text-cyber-purple/50"
        >
          01100110 01101111...
        </motion.div>
      </motion.div>
    </motion.div>
  );

  // --------------------------------------------------------
  // SLIDE 2: What is Digital Forensics? (Timeline)
  // --------------------------------------------------------
  const renderSlide2 = () => {
    const stages = [
      { label: "Identify", icon: Search, desc: "Locating potential devices, cloud links, and data storage scopes." },
      { label: "Collect", icon: FolderDown, desc: "Securing physical items or capturing volatile RAM records safely." },
      { label: "Preserve", icon: ShieldAlert, desc: "Creating a bit-stream forensic duplicate to keep source files intact." },
      { label: "Analyze", icon: Cpu, desc: "Reconstructing file history, carving unallocated space, parsing logs." },
      { label: "Present", icon: Award, desc: "Compiling documented legal-admissible reports with hash integrity." },
    ];

    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-10 w-full max-w-5xl mx-auto px-4"
      >
        <div className="text-center space-y-3">
          <motion.div variants={itemVariants} className="text-xs font-mono text-cyber-cyan tracking-widest uppercase">
            01 / SCIENTIFIC PROTOCOL
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-display font-bold text-white uppercase tracking-tight">
            What is Digital Forensics?
          </motion.h2>
        </div>

        {/* Definition Hero Banner */}
        <motion.div
          variants={itemVariants}
          className="glass-panel p-6 rounded-2xl border-l-4 border-cyber-cyan text-left max-w-4xl mx-auto bg-cyber-dark/40"
        >
          <p className="text-base md:text-lg text-gray-200 leading-relaxed font-sans">
            <strong className="text-cyber-cyan font-semibold">Digital Forensics</strong> is the structured, scientific process of identifying, collecting, preserving, analyzing, and presenting digital evidence in a <strong className="text-cyber-blue font-semibold">legally acceptable manner</strong> inside a court of law.
          </p>
        </motion.div>

        {/* Timeline Horizontal Layout */}
        <div className="relative pt-6">
          {/* Connecting line */}
          <div className="absolute top-[52px] left-12 right-12 h-0.5 bg-gradient-to-r from-cyber-cyan via-cyber-blue to-cyber-purple opacity-30 -z-10" />

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-6">
            {stages.map((stage, idx) => {
              const IconComp = stage.icon;
              return (
                <motion.div
                  key={stage.label}
                  variants={cardVariants}
                  whileHover="hover"
                  className="glass-panel p-4 rounded-xl border border-white/5 flex flex-col items-center text-center bg-black/40 relative"
                >
                  {/* Step bubble */}
                  <div className="w-12 h-12 rounded-full bg-cyber-dark border-2 border-cyber-cyan flex items-center justify-center neon-glow-cyan mb-3 z-10">
                    <IconComp className="w-5 h-5 text-cyber-cyan animate-pulse" />
                  </div>

                  {/* Order indicator */}
                  <span className="absolute top-3 right-3 font-mono text-[10px] text-gray-500">
                    STAGE 0{idx + 1}
                  </span>

                  <h3 className="font-display font-bold text-white tracking-wide text-sm mb-1 uppercase">
                    {stage.label}
                  </h3>
                  <p className="text-xs text-gray-400 font-sans leading-relaxed">
                    {stage.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    );
  };

  // --------------------------------------------------------
  // SLIDE 3: Where Can Digital Evidence Be Found?
  // --------------------------------------------------------
  const renderSlide3 = () => {
    const nodes = [
      { name: "Smartphone", type: "GPS, Chat, Telemetry", icon: Smartphone, x: 20, y: 18, color: "#00E5FF" },
      { name: "Laptop", type: "Browser, Registry, Hard Drive", icon: Laptop, x: 50, y: 15, color: "#00BFFF" },
      { name: "Cloud Storage", type: "IP Logs, Auto Sync, Backups", icon: Cloud, x: 80, y: 18, color: "#7C3AED" },
      { name: "Email Server", type: "Headers, SMTP Records, Attachments", icon: Mail, x: 12, y: 50, color: "#7C3AED" },
      { name: "Web Browser", type: "SQLite History, IndexedDB, Cookies", icon: Globe, x: 88, y: 50, color: "#00E5FF" },
      { name: "Wi-Fi Router", type: "MAC Logs, DHCP Leases", icon: Wifi, x: 18, y: 82, color: "#00BFFF" },
      { name: "CCTV", type: "Timestamp Metadata, Frame Streams", icon: Tv, x: 50, y: 85, color: "#00E5FF" },
      { name: "USB Drive", type: "Deleted Partition sectors", icon: HardDrive, x: 82, y: 82, color: "#7C3AED" },
    ];

    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-5xl mx-auto h-[500px] flex flex-col justify-between px-4 relative"
      >
        <div className="text-center space-y-2">
          <motion.div variants={itemVariants} className="text-xs font-mono text-cyber-blue tracking-widest uppercase">
            02 / CRIME SCENE SCOPE
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-display font-bold text-white uppercase tracking-tight">
            Where Can Digital Evidence Be Found?
          </motion.h2>
        </div>

        {/* Central Web Node Interface */}
        <div className="flex-1 relative w-full h-full max-h-[380px] my-4">
          
          {/* Animated SVG connecting lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {nodes.map((node, idx) => (
              <g key={idx}>
                {/* Connection line from central node (50%, 50%) to this item */}
                <line
                  x1="50%"
                  y1="50%"
                  x2={`${node.x}%`}
                  y2={`${node.y}%`}
                  stroke={node.color}
                  strokeWidth="1.2"
                  strokeOpacity="0.25"
                />
                {/* Laser pulses traveling down the wires */}
                <circle r="2" fill={node.color}>
                  <animateMotion
                    path={`M 250, 190 L ${node.x * 5}, ${node.y * 3.8}`}
                    dur={`${2 + Math.random() * 2}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            ))}
          </svg>

          {/* Central Hub Node */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <motion.div
              animate={{ scale: [1, 1.05, 1], rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 rounded-full bg-black border-2 border-dashed border-cyber-cyan/40 flex items-center justify-center p-1.5"
            >
              <div className="w-full h-full rounded-full bg-cyber-cyan/10 border border-cyber-cyan flex flex-col items-center justify-center text-center p-2 backdrop-blur-md neon-glow-cyan">
                <Shield className="w-5 h-5 text-cyber-cyan animate-pulse mb-0.5" />
                <span className="font-mono text-[8px] font-bold text-white tracking-widest uppercase leading-none">
                  Evidence HUB
                </span>
              </div>
            </motion.div>
          </div>

          {/* Peripheral nodes */}
          {nodes.map((node) => {
            const IconComp = node.icon;
            return (
              <motion.div
                key={node.name}
                variants={itemVariants}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10 group"
              >
                <div
                  className="glass-panel p-2.5 rounded-lg border flex items-center gap-3 bg-black/60 transition-all duration-300 group-hover:scale-105 group-hover:border-cyber-cyan/50"
                  style={{ borderColor: `${node.color}25` }}
                >
                  <div
                    className="p-1.5 rounded bg-black flex items-center justify-center border"
                    style={{ borderColor: `${node.color}40` }}
                  >
                    <IconComp className="w-4 h-4" style={{ color: node.color }} />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xs font-display font-semibold text-white leading-none">
                      {node.name}
                    </h3>
                    <p className="text-[10px] text-gray-500 font-mono mt-0.5 leading-none">
                      {node.type}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footnote text */}
        <motion.p variants={itemVariants} className="text-xs font-mono text-gray-500 text-center uppercase tracking-wider">
          * Modern investigators assume Locard's Exchange Principle: "Every cyber contact leaves a trace."
        </motion.p>
      </motion.div>
    );
  };

  // --------------------------------------------------------
  // SLIDE 4: Types of Digital Forensics
  // --------------------------------------------------------
  const renderSlide4 = () => {
    const types = [
      {
        title: "Computer Forensics",
        desc: "Analyzing computers and storage devices.",
        bullets: ["Recovers deleted system records", "Parses Registry files & OS logs", "Uses hardware Write Blockers"],
        icon: Laptop,
        border: "border-cyber-cyan/30",
        glow: "neon-glow-cyan",
        textCol: "text-cyber-cyan",
      },
      {
        title: "Mobile Forensics",
        desc: "Recovering evidence from smartphones and tablets.",
        bullets: ["Parses databases like SQLite & chats", "Recovers GPS & Cell Tower logs", "Bypasses system lock sandboxes"],
        icon: Smartphone,
        border: "border-cyber-blue/30",
        glow: "neon-glow-blue",
        textCol: "text-cyber-blue",
      },
      {
        title: "Network Forensics",
        desc: "Monitoring network traffic and cyber attacks.",
        bullets: ["Sniffs live packages in real time", "Analyzes firewall intrusion logs", "Traces source IP nodes across hops"],
        icon: Network,
        border: "border-cyber-purple/30",
        glow: "neon-glow-purple",
        textCol: "text-cyber-purple",
      },
      {
        title: "Cloud Forensics",
        desc: "Investigating cloud platforms and services.",
        bullets: ["Traces virtual storage log tracks", "Audits IAM user identity claims", "Handles multi-jurisdictional audits"],
        icon: Cloud,
        border: "border-cyber-cyan/30",
        glow: "neon-glow-cyan",
        textCol: "text-cyber-cyan",
      },
      {
        title: "Database Forensics",
        desc: "Examining databases for unauthorized activities.",
        bullets: ["Traces system SQL injection logs", "Validates transaction state timelines", "Parses transaction transaction logs"],
        icon: Database,
        border: "border-cyber-blue/30",
        glow: "neon-glow-blue",
        textCol: "text-cyber-blue",
      },
    ];

    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6 w-full max-w-5xl mx-auto px-4"
      >
        <div className="text-center space-y-2">
          <motion.div variants={itemVariants} className="text-xs font-mono text-cyber-cyan tracking-widest uppercase">
            03 / SPECIALIZED DOMAINS
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-display font-bold text-white uppercase tracking-tight">
            Types of Digital Forensics
          </motion.h2>
        </div>

        {/* Horizontal scroll/grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-4">
          {types.map((type, index) => {
            const IconComp = type.icon;
            return (
              <motion.div
                key={type.title}
                variants={cardVariants}
                whileHover="hover"
                className={`glass-panel p-4 rounded-xl border ${type.border} bg-black/60 flex flex-col justify-between h-[300px] text-left`}
              >
                <div className="space-y-3">
                  <div className={`w-10 h-10 rounded bg-black border border-white/10 flex items-center justify-center ${type.textCol}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-white text-sm uppercase tracking-wide">
                    {type.title}
                  </h3>
                  <p className="text-[11px] text-gray-400 font-sans leading-relaxed">
                    {type.desc}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-3 space-y-1.5">
                  {type.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-1 text-[10px] text-gray-500 font-mono">
                      <span className={`${type.textCol}`}>•</span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    );
  };

  // --------------------------------------------------------
  // SLIDE 5: Digital Investigation Process
  // --------------------------------------------------------
  const renderSlide5 = () => {
    const steps = [
      { id: "1", title: "Crime Report", desc: "First formal incident claim reported and recorded.", color: "text-red-400" },
      { id: "2", title: "Identification", desc: "Pinpointing target storage nodes, devices, and clouds.", color: "text-cyber-cyan" },
      { id: "3", title: "Collection", desc: "Acquiring hardware while preserving state logs.", color: "text-cyber-blue" },
      { id: "4", title: "Preservation", desc: "Making verified cryptographic read-only clones.", color: "text-cyber-purple" },
      { id: "5", title: "Examination", desc: "Extracting hidden files, structures, and registry trees.", color: "text-cyber-cyan" },
      { id: "6", title: "Analysis", desc: "Reconstructing event timelines to prove intent.", color: "text-cyber-blue" },
      { id: "7", title: "Reporting", desc: "Drafting bulletproof expert testimony for the court.", color: "text-green-400" },
    ];

    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8 w-full max-w-5xl mx-auto px-4"
      >
        <div className="text-center space-y-2">
          <motion.div variants={itemVariants} className="text-xs font-mono text-cyber-blue tracking-widest uppercase">
            04 / STANDARD OPERATING PROCEDURE
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-display font-bold text-white uppercase tracking-tight">
            Digital Investigation Process
          </motion.h2>
        </div>

        {/* Visual Workflow Flowchart */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 pt-6 relative">
          {/* Background Connector Bar for MD+ sizes */}
          <div className="absolute top-[40px] left-10 right-10 h-0.5 bg-gradient-to-r from-red-500 via-cyber-cyan to-green-500 opacity-20 hidden md:block -z-10" />

          {steps.map((step, idx) => (
            <React.Fragment key={step.id}>
              <motion.div
                variants={itemVariants}
                className="w-full md:w-[130px] flex flex-col items-center"
              >
                {/* Node Container */}
                <div className="glass-panel p-3 rounded-xl border border-white/5 w-full bg-black/60 text-center flex flex-col items-center relative hover:border-cyber-cyan/30 transition-all">
                  
                  {/* Glowing bubble ID */}
                  <div className="w-8 h-8 rounded-full bg-black border border-white/10 flex items-center justify-center font-mono text-xs font-bold text-white mb-2 shadow-inner">
                    0{step.id}
                  </div>

                  <h3 className={`font-display font-bold text-xs tracking-wide uppercase ${step.color} mb-1`}>
                    {step.title}
                  </h3>
                  
                  <p className="text-[10px] text-gray-500 font-sans leading-tight hidden md:block h-[45px] overflow-hidden">
                    {step.desc}
                  </p>
                </div>
              </motion.div>

              {/* Arrow Connector between steps */}
              {idx < steps.length - 1 && (
                <motion.div
                  variants={itemVariants}
                  className="text-cyber-cyan flex items-center justify-center py-1 md:py-0"
                >
                  <ChevronRight className="w-5 h-5 rotate-90 md:rotate-0 opacity-50" />
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.div>
    );
  };

  // --------------------------------------------------------
  // SLIDE 6: Popular Digital Forensic Tools
  // --------------------------------------------------------
  const renderSlide6 = () => {
    const tools = [
      {
        name: "Autopsy",
        category: "OPEN SOURCE FILE CARVER",
        description: "Hard drive investigation browser. Extracts web history, registry logs, and deleted images.",
        stats: { recovery: "92%", learning: "Beginner", license: "GPLv3" },
        icon: Search,
        accent: "text-cyber-cyan",
        border: "border-cyber-cyan/30",
        color: "rgba(0,229,255,0.05)",
      },
      {
        name: "FTK Imager",
        category: "FORENSIC DISK ACQUISITION",
        description: "Pre-eminent bit-by-bit imaging tool. Secures drive images without changing initial system hashes.",
        stats: { speed: "Ultra-Fast", learning: "Medium", license: "Free/Commercial" },
        icon: HardDrive,
        accent: "text-cyber-blue",
        border: "border-cyber-blue/30",
        color: "rgba(0,191,255,0.05)",
      },
      {
        name: "Wireshark",
        category: "NETWORK PACKET ANALYZER",
        description: "Intercepts and sniffs TCP/IP streams in real time. Crucial for tracing server attacks or unauthorized hops.",
        stats: { intercept: "100%", learning: "Advanced", license: "Open-Source" },
        icon: Activity,
        accent: "text-cyber-purple",
        border: "border-cyber-purple/30",
        color: "rgba(124,58,237,0.05)",
      },
      {
        name: "Cellebrite",
        category: "MOBILE FORENSICS EXPERT",
        description: "Bypasses physical passcode structures. Extracts raw databases from locked Android and iOS storage systems.",
        stats: { bypass: "98%", learning: "High", license: "Enterprise" },
        icon: Smartphone,
        accent: "text-cyber-cyan",
        border: "border-cyber-cyan/30",
        color: "rgba(0,229,255,0.05)",
      },
    ];

    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6 w-full max-w-5xl mx-auto px-4"
      >
        <div className="text-center space-y-2">
          <motion.div variants={itemVariants} className="text-xs font-mono text-cyber-cyan tracking-widest uppercase">
            05 / INDUSTRY-STANDARD SUITE
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-display font-bold text-white uppercase tracking-tight">
            Popular Digital Forensic Tools
          </motion.h2>
        </div>

        {/* Comparison grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 pt-4">
          {tools.map((tool) => {
            const IconComp = tool.icon;
            return (
              <motion.div
                key={tool.name}
                variants={cardVariants}
                whileHover="hover"
                className={`glass-panel p-5 rounded-2xl border ${tool.border} bg-black/60 flex flex-col justify-between text-left h-[320px] relative overflow-hidden`}
              >
                {/* Tech grid overlay background */}
                <div className="absolute inset-0 bg-cyber-grid opacity-[0.03] pointer-events-none" />

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] text-gray-500 tracking-wider">
                      {tool.category}
                    </span>
                    <IconComp className={`w-4 h-4 ${tool.accent}`} />
                  </div>

                  <h3 className="font-display font-black text-xl text-white tracking-wide uppercase">
                    {tool.name}
                  </h3>

                  <p className="text-xs text-gray-400 font-sans leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                {/* Tech specs/stats box */}
                <div className="p-3 rounded-lg bg-white/5 border border-white/5 relative z-10 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-gray-500">LEVEL</span>
                    <span className="text-white font-semibold">{Object.values(tool.stats)[1]}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-gray-500">LICENSE</span>
                    <span className="text-white font-semibold">{Object.values(tool.stats)[2]}</span>
                  </div>
                  {/* Simple colored power meter */}
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-1">
                    <div className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-blue w-3/4" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    );
  };

  // --------------------------------------------------------
  // SLIDE 7: Real Investigation Example (Remote Robbery)
  // --------------------------------------------------------
  const renderSlide7 = () => {
    const caseTimeline = [
      { id: 1, label: "Crime Occurs", desc: "Robbery occurs in a remote forest with zero witnesses." },
      { id: 2, label: "Tower Dump Request", desc: "Investigators request records from nearest mobile towers." },
      { id: 3, label: "Thousands Logged", desc: "Initial list contains 10,000+ active IMSI cell connections." },
      { id: 4, label: "Commuters Filtered", desc: "Filter out local commuters and daily routine signals." },
      { id: 5, label: "Suspect RF Correlated", desc: "Two unknown signals found moving in tandem to the spot." },
      { id: 6, label: "Suspects Arrested", desc: "Physical GPS correlates with digital RF timeline." },
    ];

    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-6xl mx-auto px-4"
      >
        {/* Left Column: Timeline Steps */}
        <div className="lg:col-span-5 space-y-4 text-left">
          <div className="space-y-1">
            <span className="font-mono text-xs text-cyber-blue uppercase tracking-widest">
              06 / CASE STUDY ANALYSIS
            </span>
            <h2 className="text-3xl font-display font-black text-white uppercase tracking-tight">
              The Remote Robbery
            </h2>
          </div>

          <div className="space-y-2 relative pt-2">
            {/* Visual dashed connector line */}
            <div className="absolute top-4 bottom-4 left-4 w-0.5 border-l border-dashed border-cyber-cyan/30 z-0" />

            {caseTimeline.map((step, index) => {
              const isActive = robberyStep >= index;
              return (
                <motion.div
                  key={step.id}
                  className={`flex gap-3 p-2.5 rounded-lg border transition-all duration-300 relative z-10 ${
                    isActive
                      ? "bg-cyber-blue/10 border-cyber-blue/40 text-white"
                      : "bg-black/20 border-white/5 text-gray-500"
                  }`}
                  animate={{ scale: isActive ? 1.01 : 1 }}
                >
                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center font-mono text-xs font-bold ${
                      isActive
                        ? "bg-cyber-blue text-black border-cyber-blue shadow-[0_0_10px_rgba(0,191,255,0.4)]"
                        : "bg-black border-white/10"
                    }`}
                  >
                    0{step.id}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xs uppercase tracking-wider">
                      {step.label}
                    </h4>
                    <p className={`text-[10px] font-sans leading-tight mt-0.5 ${isActive ? "text-gray-300" : "text-gray-600"}`}>
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Interactive map / Signal Tower visualization */}
        <div className="lg:col-span-7 flex items-center justify-center">
          <div className="w-full max-w-lg aspect-square lg:aspect-video rounded-3xl glass-panel border border-white/10 relative p-4 flex flex-col justify-between overflow-hidden bg-black/80">
            <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none" />

            {/* Map Header details */}
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="font-mono text-[10px] text-cyber-cyan flex items-center gap-1.5 uppercase">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                Active RF Sector Map :: Zone 09
              </span>
              <span className="font-mono text-[9px] text-gray-500">
                LAT/LON: 34.0522° N, 118.2437° W
              </span>
            </div>

            {/* Interactive SVG Radar & Signal Grid */}
            <div className="flex-1 relative flex items-center justify-center my-2 bg-black/40 rounded-xl border border-white/5">
              
              {/* Radar circular lines */}
              <div className="absolute w-52 h-52 rounded-full border border-cyber-cyan/15 animate-[pulse_4s_infinite]" />
              <div className="absolute w-36 h-36 rounded-full border border-cyber-blue/15" />
              <div className="absolute w-16 h-16 rounded-full border border-cyber-purple/10" />

              {/* Central Signal Tower */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="p-1 rounded bg-black border border-cyber-cyan"
                >
                  <Radio className="w-6 h-6 text-cyber-cyan" />
                </motion.div>
                <span className="font-mono text-[8px] text-cyber-cyan tracking-wider uppercase mt-1">
                  Tower 03-A
                </span>
              </div>

              {/* Simulated Crime Spot */}
              <div className="absolute top-12 left-1/4 flex flex-col items-center">
                <MapPin className="w-5 h-5 text-red-500 animate-bounce" />
                <span className="font-mono text-[8px] bg-red-500/20 text-red-400 border border-red-500/40 px-1 rounded uppercase">
                  Robbery Spot
                </span>
              </div>

              {/* Dynamic Suspect Devices depending on timeline playback */}
              {robberyStep >= 2 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-16 right-16 flex flex-col items-center"
                >
                  <Smartphone className="w-4 h-4 text-cyber-blue animate-pulse" />
                  <span className="font-mono text-[8px] text-cyber-blue">Suspect 01</span>
                </motion.div>
              )}

              {robberyStep >= 4 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-24 right-24 flex flex-col items-center"
                >
                  <Smartphone className="w-4 h-4 text-cyber-purple animate-pulse" />
                  <span className="font-mono text-[8px] text-cyber-purple">Suspect 02</span>
                </motion.div>
              )}

              {/* Moving network laser connection */}
              {robberyStep >= 4 && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <path
                    d="M 125, 60 Q 200, 100 320, 80"
                    fill="none"
                    stroke="#00E5FF"
                    strokeWidth="1"
                    strokeDasharray="4 2"
                    className="animate-[dash_2s_linear_infinite]"
                  />
                </svg>
              )}
            </div>

            {/* Simulated Console footer */}
            <div className="bg-black/80 p-2.5 rounded border border-white/5 font-mono text-[9px] text-gray-500 text-left">
              {robberyStep === 0 && <p className="text-yellow-500">&gt; Waiting for RF signal analysis sequence...</p>}
              {robberyStep === 1 && <p className="text-cyber-cyan">&gt; Cell Tower dump: Sector logs extracted. Total records: 14,892</p>}
              {robberyStep === 2 && <p className="text-cyber-blue">&gt; Filtering system... Daily commuters discarded: -14,210 nodes.</p>}
              {robberyStep === 3 && <p className="text-cyber-purple">&gt; Suspect correlator online: Analyzing concurrent movement patterns...</p>}
              {robberyStep >= 4 && (
                <p className="text-green-400">
                  &gt; ALERT! Matching Suspect Pair found. IMEI #358201... & #358249... travel history synchronized.
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  // --------------------------------------------------------
  // SLIDE 8: Myths vs Reality
  // --------------------------------------------------------
  const renderSlide8 = () => {
    const myths = [
      { id: "M1", text: "Deleted files are gone forever." },
      { id: "M2", text: "Incognito mode leaves no traces." },
      { id: "M3", text: "Formatting destroys all evidence." },
    ];

    const realities = [
      { id: "R1", text: "Deleted files can often be recovered.", desc: "The filesystem only deletes the index pointer, leaving the block intact until overwritten." },
      { id: "R2", text: "Network logs still record activity.", desc: "Your ISP, DNS cache, and remote server hosts still log IP and cookie transactions." },
      { id: "R3", text: "Standard formatting usually does not erase everything.", desc: "Standard format only resets the file structures. File Carving recovers the sectors." },
    ];

    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8 w-full max-w-5xl mx-auto px-4"
      >
        <div className="text-center space-y-2">
          <motion.div variants={itemVariants} className="text-xs font-mono text-red-400 tracking-widest uppercase">
            07 / CYBERSEC CONCEPTS
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-display font-bold text-white uppercase tracking-tight">
            Myths vs Reality
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          
          {/* Myths Panel (Left - Red Theme) */}
          <motion.div
            variants={itemVariants}
            className="glass-panel p-6 rounded-2xl border border-red-500/20 bg-red-500/[0.02] space-y-4 text-left"
          >
            <div className="flex items-center gap-2 pb-2 border-b border-red-500/10">
              <XCircle className="w-5 h-5 text-red-500 animate-pulse" />
              <h3 className="font-display font-bold text-red-400 uppercase tracking-wider text-base">
                Common Myths
              </h3>
            </div>

            <div className="space-y-4">
              {myths.map((myth) => (
                <div key={myth.id} className="p-3 bg-black/40 rounded border border-red-500/10 flex items-start gap-2.5">
                  <span className="text-red-500 font-mono text-xs mt-0.5">[!]</span>
                  <span className="text-sm text-gray-200 leading-normal">{myth.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Realities Panel (Right - Cyan/Blue Theme) */}
          <motion.div
            variants={itemVariants}
            className="glass-panel p-6 rounded-2xl border border-cyber-cyan/20 bg-cyber-cyan/[0.02] space-y-4 text-left"
          >
            <div className="flex items-center gap-2 pb-2 border-b border-cyber-cyan/10">
              <CheckCircle className="w-5 h-5 text-cyber-cyan animate-pulse" />
              <h3 className="font-display font-bold text-cyber-cyan uppercase tracking-wider text-base">
                The Forensic Reality
              </h3>
              {!showReality && (
                <span className="ml-auto font-mono text-[9px] text-gray-500 animate-pulse">
                  DECODING...
                </span>
              )}
            </div>

            <div className="space-y-4 min-h-[196px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                {showReality ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    {realities.map((real) => (
                      <div key={real.id} className="p-3 bg-black/40 rounded border border-cyber-cyan/10 space-y-1">
                        <div className="flex items-start gap-2.5">
                          <span className="text-cyber-cyan font-mono text-xs mt-0.5">[✓]</span>
                          <span className="text-sm font-semibold text-white leading-normal">{real.text}</span>
                        </div>
                        <p className="text-[10px] text-gray-500 font-sans pl-6">
                          {real.desc}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <RefreshCw className="w-8 h-8 text-cyber-cyan/40 animate-spin mb-2" />
                    <span className="font-mono text-xs text-gray-500 uppercase">
                      Running forensic analysis...
                    </span>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  // --------------------------------------------------------
  // SLIDE 9: Audience Interaction (Countdown)
  // --------------------------------------------------------
  const renderSlide9 = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 w-full max-w-4xl mx-auto px-4"
    >
      <div className="text-center space-y-2">
        <motion.div variants={itemVariants} className="text-xs font-mono text-cyber-cyan tracking-widest uppercase">
          08 / INTERACTIVE AUDIENCE TRACE TEST
        </motion.div>
        <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-display font-bold text-white uppercase tracking-tight">
          How Many Digital Traces Do You Leave?
        </motion.h2>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-10 pt-4">
        {/* Interaction Prompts */}
        <div className="flex-1 text-left space-y-5">
          <motion.div variants={itemVariants} className="p-4 bg-cyber-dark/40 rounded-xl border-l-4 border-cyber-purple">
            <h3 className="font-display font-bold text-white text-lg mb-1 uppercase">
              Think about everything you did today...
            </h3>
            <p className="text-sm text-gray-400 font-sans">
              From the instant your alarm woke you up to walking into this seminar hall.
            </p>
          </motion.div>

          <div className="space-y-3">
            {[
              "Unlocked your smartphone first thing.",
              "Sent messages on WhatsApp, Discord, or Instagram.",
              "Connected automatically to college Wi-Fi routing paths.",
              "Searched Google for quick topics or notes.",
              "Made online payments via UPI or scanning a QR code.",
            ].map((activity, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="flex items-center gap-3 text-sm text-gray-300 font-sans"
              >
                <div className="w-2 h-2 rounded-full bg-cyber-cyan" />
                <span>{activity}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Large Countdown/Question mark */}
        <motion.div
          variants={itemVariants}
          className="w-full md:w-[320px] flex flex-col items-center justify-center"
        >
          <div className="relative w-56 h-56 rounded-full bg-black/60 border border-white/10 flex flex-col items-center justify-center neon-glow-cyan text-center overflow-hidden">
            <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none" />

            {/* Rotating border glow */}
            <svg className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" fill="none" stroke="url(#cyan-pulse)" strokeWidth="1.5" strokeDasharray="30 10" />
              <defs>
                <linearGradient id="cyan-pulse" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00E5FF" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
              </defs>
            </svg>

            {countdown > 0 ? (
              <div className="space-y-1 z-10">
                <span className="font-mono text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-blue">
                  {countdown}
                </span>
                <p className="font-mono text-[9px] text-gray-500 tracking-wider uppercase">
                  SECONDS REMAINING
                </p>
              </div>
            ) : (
              <div className="space-y-1 z-10 animate-bounce">
                <HelpCircle className="w-14 h-14 text-cyber-cyan mx-auto filter drop-shadow-[0_0_10px_rgba(0,229,255,0.6)]" />
                <p className="font-mono text-[10px] text-white tracking-widest uppercase">
                  READY TO REVEAL?
                </p>
              </div>
            )}
          </div>

          <p className="text-xs font-mono text-gray-500 mt-4 uppercase text-center max-w-xs">
            How many distinct trace points did you register on databases this morning?
          </p>
        </motion.div>
      </div>
    </motion.div>
  );

  // --------------------------------------------------------
  // SLIDE 10: The Answer (9 Cards)
  // --------------------------------------------------------
  const renderSlide10 = () => {
    const traces = [
      { title: "Phone Unlock", desc: "Biometric timestamp saved", icon: Unlock, border: "border-cyber-cyan/20" },
      { title: "WhatsApp", desc: "Encrypted packet metadata", icon: Mail, border: "border-cyber-blue/20" },
      { title: "Google Search", desc: "Cookie interests registered", icon: Search, border: "border-cyber-purple/20" },
      { title: "GPS History", desc: "Google Timeline tracking", icon: MapPin, border: "border-cyber-cyan/20" },
      { title: "College Wi-Fi", desc: "Device MAC registered", icon: Wifi, border: "border-cyber-blue/20" },
      { title: "Browser History", desc: "SQLite database cache", icon: Globe, border: "border-cyber-purple/20" },
      { title: "UPI Payments", desc: "Bank server ledger tags", icon: Database, border: "border-cyber-cyan/20" },
      { title: "Cloud Backup", desc: "Sync log logs uploaded", icon: Cloud, border: "border-cyber-blue/20" },
      { title: "Laptop Login", desc: "Windows security logs file", icon: Laptop, border: "border-cyber-purple/20" },
    ];

    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6 w-full max-w-5xl mx-auto px-4"
      >
        <div className="text-center space-y-2">
          <motion.div variants={itemVariants} className="text-xs font-mono text-cyber-cyan tracking-widest uppercase">
            09 / TRACE SUMMARY DATA
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-display font-bold text-white uppercase tracking-tight">
            The Reality: 9 Invisible Daily Traces
          </motion.h2>
        </div>

        {/* 3x3 Grid of glowing cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
          {traces.map((trace, idx) => {
            const IconComp = trace.icon;
            return (
              <motion.div
                key={trace.title}
                variants={cardVariants}
                whileHover="hover"
                className={`glass-panel p-4 rounded-xl border ${trace.border} bg-black/60 flex items-center gap-4 text-left`}
              >
                {/* Glowing icon wrapper */}
                <div className="w-10 h-10 rounded-lg bg-black border border-white/10 flex items-center justify-center text-cyber-cyan">
                  <IconComp className="w-5 h-5 animate-pulse" />
                </div>

                <div>
                  <h3 className="font-display font-bold text-white text-sm uppercase tracking-wide">
                    {trace.title}
                  </h3>
                  <p className="text-[11px] text-gray-400 font-mono mt-0.5 leading-tight">
                    {trace.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    );
  };

  // --------------------------------------------------------
  // SLIDE 11: Cinematic Ending
  // --------------------------------------------------------
  const renderSlide11 = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col lg:flex-row items-center justify-between gap-12 w-full max-w-6xl mx-auto h-full px-4 relative"
    >
      {/* Left side: Dramatic Cinematic Typography */}
      <div className="flex-1 space-y-6 text-left relative z-10">
        <div className="space-y-2 font-display font-black uppercase tracking-tight">
          {[
            { word: "Every Click", col: "text-white" },
            { word: "Every Search", col: "text-cyber-cyan" },
            { word: "Every Login", col: "text-cyber-blue" },
            { word: "Every Photo", col: "text-cyber-purple" },
          ].map((item, idx) => (
            <motion.h2
              key={item.word}
              variants={itemVariants}
              className={`text-4xl md:text-6xl leading-none ${item.col}`}
            >
              {item.word}
            </motion.h2>
          ))}
          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-7xl leading-none text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-cyber-cyan text-glow-cyan animate-pulse mt-2"
          >
            Leaves a Trace.
          </motion.h2>
        </div>

        <motion.p
          variants={itemVariants}
          className="text-sm text-gray-400 max-w-md font-sans leading-relaxed"
        >
          Digital Forensics acts as the ultimate lens that brings these hidden trails into focus, allowing investigators to reconstruct crime networks and deliver undisputed truth.
        </motion.p>
      </div>

      {/* Right side: Thank you / Questions with rotating SVG Globe */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        
        {/* Custom SVG Rotating Network Globe */}
        <div className="relative w-72 h-72 flex items-center justify-center">
          <div className="absolute w-64 h-64 bg-cyber-blue/5 rounded-full blur-2xl -z-10" />

          <svg className="absolute w-full h-full pointer-events-none animate-[spin_40s_linear_infinite]" viewBox="0 0 100 100">
            {/* Globe circles */}
            <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(0, 229, 255, 0.2)" strokeWidth="0.5" />
            <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="rgba(0, 191, 255, 0.15)" strokeWidth="0.5" />
            <ellipse cx="50" cy="50" rx="15" ry="40" fill="none" stroke="rgba(124, 58, 237, 0.15)" strokeWidth="0.5" />
            
            {/* Grid dots */}
            <circle cx="20" cy="50" r="1.5" fill="#00E5FF" />
            <circle cx="80" cy="50" r="1.5" fill="#7C3AED" />
            <circle cx="50" cy="20" r="1.5" fill="#00BFFF" />
            <circle cx="50" cy="80" r="1.5" fill="#00E5FF" />

            {/* Orbiting particles */}
            <circle r="2" fill="#00E5FF">
              <animateMotion
                path="M 50,10 A 40,40 0 1,1 50,90 A 40,40 0 1,1 50,10"
                dur="12s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>

          {/* Core Panel Content */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-black/80 flex flex-col items-center justify-center text-center max-w-[240px] shadow-2xl">
            <motion.h3
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="font-display font-black text-2xl text-white tracking-widest uppercase mb-1"
            >
              THANK YOU
            </motion.h3>
            <div className="h-0.5 w-12 bg-cyber-cyan my-2" />
            <p className="text-xs text-gray-400 font-sans leading-normal mb-4">
              Questions or discussion points?
            </p>
            <div className="flex gap-2">
              <div className="bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan px-2.5 py-1 rounded font-mono text-[10px] uppercase">
                BCA SEM 2
              </div>
              <div className="bg-cyber-blue/10 border border-cyber-blue/20 text-cyber-blue px-2.5 py-1 rounded font-mono text-[10px] uppercase">
                2026
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Router matching
  return (
    <div id="slide-presentation-stage" className="w-full h-full flex items-center justify-center py-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="w-full max-w-5xl bg-[#111827] rounded-3xl border border-white/10 shadow-[0_0_100px_rgba(0,191,255,0.08)] sophisticated-card-glow p-6 md:p-10 relative overflow-hidden min-h-[580px] flex items-center justify-center"
        >
          {/* Background Decorative Gradient Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#7C3AED] blur-[150px] opacity-[0.12] pointer-events-none -mr-48 -mt-48 z-0 rounded-full" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00BFFF] blur-[150px] opacity-[0.12] pointer-events-none -ml-48 -mb-48 z-0 rounded-full" />
          
          <div className="w-full h-full relative z-10 flex items-center justify-center">
            {currentSlide === 1 && renderSlide1()}
            {currentSlide === 2 && renderSlide2()}
            {currentSlide === 3 && renderSlide3()}
            {currentSlide === 4 && renderSlide4()}
            {currentSlide === 5 && renderSlide5()}
            {currentSlide === 6 && renderSlide6()}
            {currentSlide === 7 && renderSlide7()}
            {currentSlide === 8 && renderSlide8()}
            {currentSlide === 9 && renderSlide9()}
            {currentSlide === 10 && renderSlide10()}
            {currentSlide === 11 && renderSlide11()}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
