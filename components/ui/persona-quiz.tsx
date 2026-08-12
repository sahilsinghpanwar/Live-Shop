"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { QuizQuestion } from "../../types/persona";

interface PersonaQuizProps {
  currentQuestionIndex: number;
  question: QuizQuestion;
  onOptionSelect: (optionId: string) => void;
}

export function PersonaQuiz({ currentQuestionIndex, question, onOptionSelect }: PersonaQuizProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  // Reset local state when the active question changes
  useEffect(() => {
    setSelectedId(null);
    setIsExiting(false);
  }, [question.id]);

  const handleOptionClick = (optionId: string) => {
    if (selectedId) return; // Prevent double clicks
    setSelectedId(optionId);

    // Show selection styling for 400ms, then slide out
    setTimeout(() => {
      setIsExiting(true);
    }, 400);

    // Fire the parent selection handler after the exit animation completes (300ms later)
    setTimeout(() => {
      onOptionSelect(optionId);
    }, 700);
  };

  return (
    <div className="w-full max-w-[520px] mx-auto px-6 flex flex-col justify-between select-none">
      
      {/* Segmented Progress Header */}
      <div className="flex flex-col gap-2.5 w-full text-left font-jetbrains">
        <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold">
          Question {currentQuestionIndex + 1} of 3
        </span>

        {/* 3 Progress segments */}
        <div className="flex gap-1.5 w-full">
          {[0, 1, 2].map((idx) => {
            const isCompleted = idx < currentQuestionIndex;
            const isActive = idx === currentQuestionIndex;

            return (
              <div 
                key={idx} 
                className="flex-1 h-[3px] rounded-full overflow-hidden bg-white/[0.08]"
              >
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ 
                    width: isCompleted ? "100%" : isActive ? (selectedId ? "100%" : "50%") : "0%" 
                  }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="h-full bg-violet-600 rounded-full"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Slide Transition Wrapper */}
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 40 }}
        animate={isExiting ? { opacity: 0, x: -40 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex flex-col text-left mt-8 flex-1"
      >
        {/* Question text */}
        <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-tight leading-[1.05]">
          {question.question}
        </h2>
        
        <span className="text-[13px] text-white/40 italic font-medium mt-2 font-space">
          {question.subtext}
        </span>

        {/* Options Stack */}
        <div className="flex flex-col gap-3.5 mt-8 w-full">
          {question.options.map((option, idx) => {
            const isSelected = selectedId === option.id;
            const isAnySelected = selectedId !== null;

            return (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: idx * 0.08,
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1]
                }}
                disabled={isAnySelected}
                onClick={() => handleOptionClick(option.id)}
                className={`w-full min-h-[64px] px-5 py-4 rounded-[16px] border flex items-center justify-between gap-4 cursor-pointer relative transition-all duration-300 ${
                  isSelected
                    ? "border-violet-600 bg-violet-600/10 translate-x-2"
                    : isAnySelected
                    ? "border-white/[0.04] bg-white/[0.01] opacity-40 cursor-default"
                    : "border-white/[0.08] bg-white/[0.02] hover:border-violet-500/40 hover:bg-violet-500/[0.04] hover:translate-x-1"
                }`}
              >
                {/* Indigo left bar on selected state */}
                {isSelected && (
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-violet-500 rounded-l-[16px]" />
                )}

                <div className="flex items-center gap-3.5 text-left">
                  <span className="text-3xl flex-shrink-0 select-none">
                    {option.emoji}
                  </span>
                  <span className={`text-[13px] sm:text-[14px] font-semibold font-space tracking-wide transition-colors ${
                    isSelected ? "text-white" : "text-white/80 group-hover:text-white"
                  }`}>
                    {option.label}
                  </span>
                </div>

                {/* Checkmark icon for selected option */}
                {isSelected && (
                  <Check className="w-4 h-4 text-violet-400 flex-shrink-0" />
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

    </div>
  );
}
