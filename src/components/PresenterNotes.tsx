import React, { useState, useEffect } from "react";
import { BookOpen, Lightbulb, AlertTriangle, MessageSquare, ChevronRight, ChevronLeft, Volume2, VolumeX } from "lucide-react";
import { techAudio } from "../utils/audio";

interface PresenterNotesProps {
  currentSlide: number;
  isOpen: boolean;
  onToggle: () => void;
  audioEnabled: boolean;
  onToggleAudio: () => void;
}

const slideNotesDatabase: Record<
  number,
  {
    duration: string;
    talkingPoints: string[];
    jargon: string[];
    interaction: string;
    warning: string;
  }
> = {
  1: {
    duration: "1:00 min",
    talkingPoints: [
      "Introduce yourself and state your topic clearly: 'Digital Forensics - Uncovering Evidence in the Modern World.'",
      "Mention that this is a BCA Semester 2 Seminar presentation.",
      "Set the hook: Explain that in 2026, crime is no longer just physical. Almost every modern crime involves a digital element.",
      "Briefly preview that by the end of this 10-minute session, the audience will realize how many digital traces they leave behind daily."
    ],
    jargon: ["Digital Footprint", "Cyber Security", "Digital Footprints", "Metadata"],
    interaction: "Ask the audience: 'How many of you think you can walk out of this room today without leaving a single digital trace?'",
    warning: "Keep the introduction energetic and crisp. Do not linger on this title slide for more than a minute."
  },
  2: {
    duration: "1:15 min",
    talkingPoints: [
      "Give the formal definition: Science of identifying, preserving, recovering, analyzing, and presenting digital evidence.",
      "Explain the keyword: 'Legally Acceptable'. If we inspect a system without proper precautions, the evidence is thrown out of court.",
      "Explain the 5 core stages on the timeline in sequence:",
      "1. Identify (finding where the evidence is), 2. Collect (gathering the device), 3. Preserve (making an exact forensic clone), 4. Analyze (digging for artifacts), 5. Present (writing the court report)."
    ],
    jargon: ["Chain of Custody", "Admissibility", "Forensic Clone", "Write Blocker"],
    interaction: "Ask: 'Why can't investigators just boot up a suspect's laptop and look at the files?' (Answer: It modifies system metadata, ruining admissibility).",
    warning: "Emphasize that 'Preservation' is the most critical step. Altering even 1 bit of data invalidates the entire investigation."
  },
  3: {
    duration: "1:00 min",
    talkingPoints: [
      "Point out that evidence isn't just on laptops anymore.",
      "Go through the nodes connected to the central digital evidence element:",
      "Smartphones have location history; Cloud storage logs uploads; Smartwatches log heartrates (useful for establishing time of death!); Wi-Fi routers log connected MAC addresses.",
      "Browser databases store history even if 'cleared', and CCTV footage provides absolute physical timelines."
    ],
    jargon: ["Artifacts", "Volatile Data", "Non-Volatile Storage", "MAC Address Logs"],
    interaction: "Give a quick example: 'Did you know a smartwatch's heart-rate log has been used to solve murder cases by pinpointing the exact moment a victim's heart stopped?'",
    warning: "Don't read all 9 sources word-for-word. Group them into categories: Personal devices, network signals, and remote backups."
  },
  4: {
    duration: "1:15 min",
    talkingPoints: [
      "Walk through the 5 specialized sub-fields of digital forensics:",
      "Computer Forensics: Focuses on hard drives, deleted file recovery (carving), and registry files.",
      "Mobile Forensics: Highly challenging due to hardware encryption, custom OS layers, and cloud syncs.",
      "Network Forensics: Analyzes packets in transit. Investigates DDoS attacks, packet sniffing, and server firewalls.",
      "Cloud Forensics: Complex because servers are located globally. Involves AWS/GCP log analysis.",
      "Database Forensics: Tracking unauthorized transactions or SQL injection modifications in relational systems."
    ],
    jargon: ["Packet Sniffing", "File Carving", "Memory Dump", "SQL Injection Artifacts"],
    interaction: "Ask: 'Which of these fields do you think is hardest?' (Answer: Cloud, due to jurisdictional boundaries and shared servers).",
    warning: "Clarify that network forensics deal with 'data in motion', while computer forensics deal with 'data at rest'."
  },
  5: {
    duration: "1:00 min",
    talkingPoints: [
      "Explain that this is the formal investigator's workflow from start to finish.",
      "Start with the Crime Report: No investigation begins without formal authorization.",
      "Explain the flow down to Examination and Analysis, culminating in Reporting.",
      "Note that every step of this workflow must be rigorously documented in a logbook."
    ],
    jargon: ["Hash Values (MD5/SHA-256)", "Forensic Image", "Standard Operating Procedure (SOP)"],
    interaction: "Explain: 'If an investigator fails to record the exact serial number of a hard drive in step 3, a defense lawyer can claim the evidence was tampered with.'",
    warning: "Explain the difference between 'Examination' (extracting raw data) and 'Analysis' (making sense of the data to build a narrative)."
  },
  6: {
    duration: "1:15 min",
    talkingPoints: [
      "Introduce the tools of the trade:",
      "Autopsy: The standard free, open-source software. Excellent for analyzing filesystem structures, recovering deleted photos, and parsing browser history.",
      "FTK (Forensic Toolkit) Imager: Crucial for making a read-only bit-by-bit copy of a storage device without modifying a single bit.",
      "Wireshark: The ultimate network protocol analyzer. Captures active packets on a network segment in real-time.",
      "Cellebrite: The industry leader in bypassing phone locks and extracting physical databases from secure iOS and Android units."
    ],
    jargon: ["Bit-stream Copy", "Deep Packet Inspection (DPI)", "EnCase", "Open-Source vs Commercial Tools"],
    interaction: "Ask: 'If a suspect deletes a file, is it gone?' (Answer: No, FTK and Autopsy can carve the unallocated space to recover it!).",
    warning: "Highlight that FTK is used to *image* (copy) the drive, while Autopsy is used to *analyze* the copy. Never analyze the original drive directly!"
  },
  7: {
    duration: "1:30 min",
    talkingPoints: [
      "Present this real-world cyber investigation strategy known as 'The Remote Robbery'.",
      "Explain how investigators solved a crime in a remote forest with zero witnesses.",
      "Step 1: They requested a cell tower dump from the nearest cellular towers.",
      "Step 2: They gathered thousands of IMSI/device records active around that hour.",
      "Step 3: They filtered devices belonging to locals or frequent commuters.",
      "Step 4: They cross-referenced movement patterns and found two devices traveling together from the city and back.",
      "Step 5: Suspects identified purely via RF metadata!"
    ],
    jargon: ["Tower Dump", "IMSI Catcher", "Triangulation", "Radio Frequency (RF) Footprint"],
    interaction: "Point to the screen and say: 'This proves you don't even need to send a text. Just having your phone turned on and connected to towers makes you trackable.'",
    warning: "Animate this slide step-by-step. Keep the narrative engaging, like a short detective story!"
  },
  8: {
    duration: "1:00 min",
    talkingPoints: [
      "Time to bust some common myths students and general users believe.",
      "Myth 1: 'Deleted files are gone.' Reality: The filesystem only deletes the pointer. The actual data blocks remain in 'unallocated space' until overwritten.",
      "Myth 2: 'Incognito mode leaves no trace.' Reality: Incognito only prevents local browser storage. Network logs, DNS cache, and ISP records still track everything.",
      "Myth 3: 'Formatting destroys everything.' Reality: Quick formats only rebuild the file allocation table. Forensic tools can recover 99% of data from formatted drives."
    ],
    jargon: ["Unallocated Space", "DNS Cache", "File Allocation Table (FAT)", "Low-Level Zero Fill"],
    interaction: "Ask: 'How many of you use Incognito mode and think you're fully invisible?' Show them the reality!",
    warning: "Use a confident, expert tone here. Explain that real destruction requires physical degaussing or a full multi-pass cryptographic wipe."
  },
  9: {
    duration: "1:00 min",
    talkingPoints: [
      "This is a high-engagement slide. Bring the audience back to their own lives.",
      "Ask them to close their eyes and think about everything they did since waking up today.",
      "Did they unlock their phone? Use college Wi-Fi? Buy tea via UPI/GPay? Google a question?",
      "Every single action generated a timestamp, an IP address, and a log entry somewhere."
    ],
    jargon: ["Telemetry", "Digital Footprint", "Passive Logs", "Geo-Timestamp"],
    interaction: "Point to the countdown on the slide and say: 'Let's see what happens when we sum up these simple daily routines...'",
    warning: "Let the glowing question mark on the screen build suspense. Don't reveal the next slide too quickly."
  },
  10: {
    duration: "1:15 min",
    talkingPoints: [
      "Reveal the answer: 9 massive digital trails created in just a few hours!",
      "Explain each briefly: Phone unlocks log hardware telemetry; WhatsApp logs metadata (who you message and when); Google Search logs user interests; College Wi-Fi logs your physical device MAC address.",
      "UPI Payments contain precise bank-certified timestamps and location coordinates. Cloud backups sync photos in the background, uploading metadata."
    ],
    jargon: ["Exif Metadata", "UPI Transaction Logs", "MAC Address Authentication", "Push Notification Logs"],
    interaction: "Ask: 'Did you know that taking a photo logs the exact GPS, camera model, and time inside the image file? This is called EXIF metadata!'",
    warning: "Keep the card reveals sequential. This builds momentum and keeps the class focused on each item."
  },
  11: {
    duration: "1:00 min",
    talkingPoints: [
      "Deliver the cinematic conclusion with gravity:",
      "'Every click, every search, every login, every photo... leaves a trace.'",
      "Conclude: 'Digital Forensics is the lens that brings these invisible traces into focus. It is how we uncover truth in a virtual world.'",
      "Thank the audience, state your name, and invite questions from the panel of professors and peers."
    ],
    jargon: ["Digital Integrity", "Locard's Exchange Principle in Cyberspace", "Forensic Soundness"],
    interaction: "Say: 'Thank you. I am now open to any questions regarding digital evidence, forensics, or tools!'",
    warning: "Keep the final slide active. Let the rotating digital globe spin in the background while taking questions. It looks incredibly professional."
  }
};

export default function PresenterNotes({
  currentSlide,
  isOpen,
  onToggle,
  audioEnabled,
  onToggleAudio,
}: PresenterNotesProps) {
  const notes = slideNotesDatabase[currentSlide] || {
    duration: "1:00 min",
    talkingPoints: ["Deliver slide content clearly."],
    jargon: ["Cyber forensics"],
    interaction: "Interact with audience.",
    warning: "Be precise.",
  };

  const handleHover = () => {
    techAudio.playHover();
  };

  const handleClick = () => {
    techAudio.playTick();
  };

  return (
    <div
      id="presenter-notes-container"
      className={`fixed top-0 right-0 h-full z-40 flex flex-col transition-all duration-500 ease-out border-l border-white/10 bg-[#0B0B0B] ${
        isOpen ? "w-[360px] md:w-[420px]" : "w-0 overflow-hidden border-l-0"
      }`}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#111827]/90 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-cyber-cyan" />
          <span className="font-display font-bold text-[#00E5FF] tracking-widest uppercase text-xs">
            Presenter Deck Notes
          </span>
        </div>
        <div className="flex items-center gap-2">
          {/* Sound toggle */}
          <button
            onClick={() => {
              handleClick();
              onToggleAudio();
            }}
            onMouseEnter={handleHover}
            className={`p-1.5 rounded-md hover:bg-white/10 transition-colors ${
              audioEnabled ? "text-cyber-cyan" : "text-gray-500"
            }`}
            title={audioEnabled ? "Disable UI Audio Synth" : "Enable UI Audio Synth"}
          >
            {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          
          <button
            onClick={() => {
              handleClick();
              onToggle();
            }}
            onMouseEnter={handleHover}
            className="p-1 text-gray-400 hover:text-white hover:bg-white/10 rounded"
            title="Hide Presenter Notes"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Sidebar Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Talking Points */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-cyber-cyan tracking-wider uppercase font-display flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-cyber-cyan rounded-full animate-ping"></span>
            Talking Points (Speak these)
          </h4>
          <ul className="space-y-3">
            {notes.talkingPoints.map((point, index) => (
              <li key={index} className="text-sm text-gray-300 leading-relaxed flex gap-2">
                <span className="text-cyber-cyan font-mono text-xs select-none">0{index + 1}.</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technical Jargon to Drop */}
        <div className="p-3.5 rounded bg-cyber-blue/5 border border-cyber-blue/10 space-y-2">
          <h4 className="text-xs font-semibold text-cyber-blue tracking-wider uppercase font-display flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5" />
            Impress the Professors (Jargon)
          </h4>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {notes.jargon.map((word, i) => (
              <span
                key={i}
                className="text-[11px] font-mono bg-cyber-blue/10 text-cyber-blue px-2 py-1 rounded border border-cyber-blue/20"
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Seminar Interaction */}
        <div className="p-3.5 rounded bg-purple-500/5 border border-purple-500/10 space-y-2">
          <h4 className="text-xs font-semibold text-cyber-purple tracking-wider uppercase font-display flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-cyber-purple" />
            Audience Engagement
          </h4>
          <p className="text-sm text-gray-300 italic leading-relaxed">
            "{notes.interaction}"
          </p>
        </div>

        {/* Caution Warning */}
        <div className="p-3.5 rounded bg-red-500/5 border border-red-500/10 space-y-2">
          <h4 className="text-xs font-semibold text-red-400 tracking-wider uppercase font-display flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            Presenter Warning
          </h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            {notes.warning}
          </p>
        </div>
      </div>

      {/* Quick Guideline Footer */}
      <div className="p-3 bg-black/60 border-t border-white/5 text-[11px] text-gray-500 text-center font-mono">
        BCA Semester 2 Seminar Guide • 2026
      </div>
    </div>
  );
}
