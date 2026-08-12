"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { usePersonaQuiz } from "../../hooks/use-persona-quiz";
import { PersonaQuiz } from "../ui/persona-quiz";
import { PersonaResultCard } from "../ui/persona-result-card";
import { QUIZ_QUESTIONS } from "../../data/personas";
import { LiveStreamCard } from "../ui/live-stream-card";

interface LiveStreamItem {
  id: number;
  creator: string;
  avatarLetter: string;
  avatarColor: string;
  streamTitle: string;
  imageUrl: string;
  viewerCount: string;
  likes: string;
  productName: string;
  productPrice: string;
  productDiscount?: string;
  productImageUrl: string;
  category: "Beauty" | "Fashion" | "Tech";
}

interface LivePersonaSectionProps {
  liveStreams: LiveStreamItem[];
}

export function LivePersonaSection({ liveStreams }: LivePersonaSectionProps) {
  const {
    phase,
    currentQuestion,
    result,
    startQuiz,
    resetQuiz,
    selectOption
  } = usePersonaQuiz();

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver to fade in section on scroll entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Filter streams matching the winning persona category recommendations
  const matchedStreams = result
    ? liveStreams.filter(
        (stream) =>
          stream.category.toLowerCase() === result.recommendedCategory.toLowerCase()
      )
    : [];

  return (
    <section
      ref={sectionRef}
      className={`relative z-20 w-full bg-[#050508] py-24 border-t border-white/[0.04] overflow-hidden transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Self-contained CSS Animation Keyframes */}
      <style>{`
        @keyframes floatOrb {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-20px) rotate(6deg); }
        }
        @keyframes orbitRing {
          0%   { transform: translate(-50%,-50%) scale(0.85); opacity: 0.6; }
          100% { transform: translate(-50%,-50%) scale(1.45); opacity: 0; }
        }
        .animate-float-1 { animation: floatOrb 8s ease-in-out infinite; }
        .animate-float-2 { animation: floatOrb 6s ease-in-out infinite 1s; }
        .animate-float-3 { animation: floatOrb 9s ease-in-out infinite 2s; }
        .animate-float-4 { animation: floatOrb 7s ease-in-out infinite 0.5s; }
        .animate-float-5 { animation: floatOrb 10s ease-in-out infinite 1.5s; }
        .animate-float-6 { animation: floatOrb 8.5s ease-in-out infinite 2.5s; }
        .animate-orbit { animation: orbitRing 3s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
      `}</style>

      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none -z-10" />

      {/* Floating Emoji Orbs (very subtle background decoration) */}
      <div className="absolute inset-0 pointer-events-none -z-10 select-none overflow-hidden">
        <span className="absolute text-[80px] opacity-[0.04] blur-[1px] animate-float-1 top-[10%] left-[12%]">🌙</span>
        <span className="absolute text-[80px] opacity-[0.04] blur-[1px] animate-float-2 top-[22%] right-[10%]">⚡</span>
        <span className="absolute text-[80px] opacity-[0.04] blur-[1px] animate-float-3 bottom-[15%] left-[8%]">✨</span>
        <span className="absolute text-[80px] opacity-[0.04] blur-[1px] animate-float-4 bottom-[30%] right-[15%]">👗</span>
        <span className="absolute text-[80px] opacity-[0.04] blur-[1px] animate-float-5 top-[50%] left-[45%]">🎯</span>
        <span className="absolute text-[80px] opacity-[0.04] blur-[1px] animate-float-6 bottom-[10%] left-[55%]">🔥</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center">
        
        <AnimatePresence mode="wait">
          
          {/* PHASE 1: Intro Screen */}
          {phase === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center max-w-xl py-6"
            >
              <span className="text-[11px] font-bold font-jetbrains tracking-[0.25em] text-violet-400 uppercase">
                ✦ 15 Seconds &bull; 3 Questions
              </span>

              <h2 className="font-spray text-3xl sm:text-5xl md:text-6xl text-zinc-100 leading-tight mt-6 flex flex-col items-center select-none">
                <span>What kind of</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-300 to-pink-400 mt-1">
                  Live Shopper
                </span>
                <span className="text-zinc-400 mt-1">Are You?</span>
              </h2>

              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-space font-semibold max-w-[360px] mt-6 mx-auto">
                Answer 3 brutal questions. Get your Live Persona. Share it. Own it.
              </p>

              {/* Magnetic CTA button wrapper with staggered orbit rings */}
              <div className="relative mt-12 w-fit h-fit flex items-center justify-center">
                
                {/* Orbit Rings */}
                <div className="absolute w-[200px] h-[200px] rounded-full border border-violet-500/10 pointer-events-none animate-orbit" style={{ animationDelay: "0s" }} />
                <div className="absolute w-[280px] h-[280px] rounded-full border border-violet-500/10 pointer-events-none animate-orbit" style={{ animationDelay: "1s" }} />
                <div className="absolute w-[360px] h-[360px] rounded-full border border-violet-500/10 pointer-events-none animate-orbit" style={{ animationDelay: "2s" }} />

                <button
                  onClick={startQuiz}
                  className="relative z-10 h-14 px-12 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-black text-xl font-bebas tracking-wider hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] transition-all active:scale-95 duration-200 cursor-pointer flex items-center justify-center"
                >
                  Find My Persona &rarr;
                </button>
              </div>

              <span className="text-[12px] text-white/20 font-medium tracking-wide mt-6 font-space">
                Already taken by 12,400+ shoppers this week
              </span>
            </motion.div>
          )}

          {/* PHASE 2: Quiz Screen */}
          {phase === "quiz" && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="w-full flex justify-center py-6"
            >
              <PersonaQuiz
                currentQuestionIndex={currentQuestion}
                question={QUIZ_QUESTIONS[currentQuestion]}
                onOptionSelect={selectOption}
              />
            </motion.div>
          )}

          {/* PHASE 3: Calculating Screen */}
          {phase === "calculating" && (
            <motion.div
              key="calculating"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="flex flex-col items-center justify-center py-14 max-w-sm mx-auto"
            >
              <div className="flex flex-col gap-3.5 text-center font-jetbrains">
                <motion.span
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="text-xs text-white/40 font-bold"
                >
                  Analysing your chaos...
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="text-xs text-white/40 font-bold"
                >
                  Cross-referencing 847 shopper profiles...
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="text-sm font-semibold text-white/80 font-space mt-1"
                >
                  Your persona is ready.
                </motion.span>
              </div>

              {/* Progress bar */}
              <div className="w-[200px] h-[2px] bg-zinc-900 rounded-full overflow-hidden mt-8 border border-white/5">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.9, ease: "easeInOut" }}
                  className="h-full bg-violet-600 rounded-full"
                />
              </div>
            </motion.div>
          )}

          {/* PHASE 4: Result Screen */}
          {phase === "result" && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col items-center py-4"
            >
              <PersonaResultCard
                persona={result}
                onRetake={resetQuiz}
                onShopVibe={() => {
                  // Scroll down to matching category in streams
                  const element = document.getElementById("matched-persona-streams");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
              />

              {/* Filtered streams footer decoration inside section */}
              <div id="matched-persona-streams" className="w-full max-w-4xl mt-16 flex flex-col items-center">
                <hr className="w-[180px] border-white/5 mb-8" />
                
                <span className="text-[11px] font-bold font-jetbrains tracking-wider text-white/30 uppercase mb-2">
                  Shop Filtered For Your Persona
                </span>
                
                <span className="text-xs font-semibold font-space text-white/70 mb-8">
                  {result.emoji} Showing streams that match {result.recommendedCategory.toUpperCase()}
                </span>

                {/* Horizontal Scroll Grid of Matched Cards */}
                <div className="flex flex-wrap items-center justify-center gap-8 mt-2 w-full px-4">
                  {matchedStreams.map((stream, idx) => (
                    <motion.div
                      key={stream.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.15, duration: 0.5 }}
                    >
                      <LiveStreamCard
                        creator={stream.creator}
                        avatarLetter={stream.avatarLetter}
                        avatarColor={stream.avatarColor}
                        streamTitle={stream.streamTitle}
                        imageUrl={stream.imageUrl}
                        viewerCount={stream.viewerCount}
                        likes={stream.likes}
                        productName={stream.productName}
                        productPrice={stream.productPrice}
                        productDiscount={stream.productDiscount}
                        productImageUrl={stream.productImageUrl}
                        category={stream.category}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </section>
  );
}
