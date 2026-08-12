"use client";

import React, { useRef } from "react";
import { motion } from "motion/react";
import { Persona } from "../../types/persona";
import { PersonaShareBtn } from "./persona-share-btn";

interface PersonaResultCardProps {
  persona: Persona;
  onRetake: () => void;
  onShopVibe: () => void;
}

const getEmojiSvgUrl = (emoji: string) => {
  const codePoints = Array.from(emoji)
    .map((char) => char.codePointAt(0)?.toString(16))
    .filter(Boolean);
  return `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${codePoints.join("-")}.svg`;
};

export function PersonaResultCard({ persona, onRetake, onShopVibe }: PersonaResultCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Split title letters for letter-by-letter reveal animation
  const titleChars = persona.title.split("");

  return (
    <div className="flex flex-col items-center w-full max-w-[340px] mx-auto select-none">
      
      {/* 3D-feeling Result Card Container */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full rounded-[24px] border border-white/10 p-8 relative overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.04)]"
        style={{
          background: `linear-gradient(135deg, ${persona.gradientFrom} 0%, ${persona.gradientTo} 100%)`
        }}
      >
        {/* Subtle background glow circle */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 80% 20%, ${persona.accentColor}25 0%, transparent 60%)`
          }}
        />

        {/* Top Header */}
        <div className="flex justify-between items-start relative z-10 text-left">
          <div>
            {/* Bounce-in Emoji (using Twemoji SVG for perfect HTML2Canvas exports) */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                delay: 0.2, 
                type: "spring",
                stiffness: 260,
                damping: 18
              }}
              className="w-12 h-12 block select-none origin-bottom-left mb-1.5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getEmojiSvgUrl(persona.emoji)}
                alt="Shopper Vibe Emoji"
                className="w-full h-full object-contain"
                crossOrigin="anonymous"
              />
            </motion.div>

            {/* Letter-by-letter Title Reveal */}
            <h3 className="font-bebas text-[28px] text-white tracking-wide mt-3.5 leading-[0.95] flex flex-wrap gap-x-[0.05em]">
              {titleChars.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.4 + index * 0.03,
                    duration: 0.25,
                    ease: "easeOut"
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h3>
          </div>

          <span 
            className="px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.06] text-[9px] font-bold font-jetbrains tracking-wider uppercase"
            style={{ color: persona.accentColor }}
          >
            YOUR PERSONA
          </span>
        </div>

        <hr className="border-white/[0.06] my-5 relative z-10" />

        {/* Info Grid Section */}
        <div className="flex flex-col gap-3 relative z-10 font-jetbrains">
          {[
            { label: "Shops At", value: persona.shopsAt },
            { label: "Weakness", value: persona.weakness },
            { label: "Vibe", value: persona.vibe }
          ].map((row, idx) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + idx * 0.1, duration: 0.3 }}
              className="flex justify-between items-center py-0.5 text-left"
            >
              <span className="text-[9px] tracking-wider text-white/30 uppercase">
                {row.label}
              </span>
              <span className="text-[12px] font-semibold text-white/80 font-space">
                {row.value}
              </span>
            </motion.div>
          ))}
        </div>

        <hr className="border-white/[0.06] my-5 relative z-10" />

        {/* Shopping DNA Section */}
        <div className="flex flex-col gap-3.5 relative z-10">
          <span className="text-[9px] tracking-wider text-white/25 font-bold font-jetbrains uppercase">
            Shopping DNA
          </span>

          <div className="flex flex-col gap-2.5">
            {persona.categories.map((cat, i) => (
              <div key={cat.label} className="flex items-center justify-between">
                <span className="text-[12px] text-white/60 font-semibold font-space w-14 flex-shrink-0 text-left">
                  {cat.label}
                </span>

                {/* Progress DNA Line */}
                <div className="flex-1 mx-2.5 h-[4px] bg-white/[0.06] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.percent}%` }}
                    transition={{
                      delay: 0.9 + i * 0.12,
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: persona.accentColor,
                      opacity: 0.7
                    }}
                  />
                </div>

                <span 
                  className="text-[10px] font-bold font-jetbrains w-8 text-right"
                  style={{ color: persona.accentColor }}
                >
                  {cat.percent}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-white/[0.06] my-5 relative z-10" />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="text-[13px] font-medium italic text-white/80 font-space text-center leading-relaxed"
        >
          &ldquo;{persona.tagline}&rdquo;
        </motion.p>

      </motion.div>

      {/* CTA Buttons Row (placed outside card container to avoid screen capturing capture) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.4 }}
        className="flex gap-3 mt-6 items-center justify-center w-full"
      >
        {/* Shop My Vibe */}
        <button
          onClick={onShopVibe}
          className="h-11 px-6 flex-1 rounded-full text-white text-[13px] font-black tracking-widest font-space uppercase transition-all hover:brightness-110 active:scale-95 duration-200 cursor-pointer text-center"
          style={{
            backgroundColor: persona.accentColor,
            boxShadow: `0 4px 15px ${persona.accentColor}40`
          }}
        >
          Shop My Vibe &rarr;
        </button>

        {/* Retake */}
        <button
          onClick={onRetake}
          className="h-11 px-5 rounded-full border border-white/15 bg-transparent hover:border-white/30 text-white/50 hover:text-white/80 text-[12px] font-bold tracking-wide font-space transition-all active:scale-95 duration-200 cursor-pointer"
        >
          Retake
        </button>

        {/* Share Button containing export trigger */}
        <PersonaShareBtn persona={persona} cardRef={cardRef} />
      </motion.div>

    </div>
  );
}
