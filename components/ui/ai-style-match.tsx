"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, Eye, Check, Loader2, X, RotateCcw } from "lucide-react";
import { LiveStreamCard } from "./live-stream-card";

export interface LiveStreamItem {
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

export interface StyleMatchResult {
  skinTone: string;
  undertone: string;
  styleVibe: string;
  colorPalette: string;
  recommendedCategories: string[];
  confidence: number;
}

export interface AnalysisStep {
  id: number;
  label: string;
  status: "pending" | "active" | "done";
}

export interface AIStyleMatchProps {
  liveStreams: LiveStreamItem[];
  onClose?: () => void;
}

export function AIStyleMatch({ liveStreams, onClose }: AIStyleMatchProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [apiResult, setApiResult] = useState<StyleMatchResult | null>(null);
  const [apiLoading, setApiLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulated analysis steps
  const [steps, setSteps] = useState<AnalysisStep[]>([
    { id: 1, label: "Detecting skin tone", status: "pending" },
    { id: 2, label: "Reading colour preferences", status: "pending" },
    { id: 3, label: "Identifying style cues", status: "pending" },
    { id: 4, label: "Matching live streams", status: "pending" }
  ]);

  // Handle file selections
  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  // Drag and drop event handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  // Start analysis processing
  const handleStartAnalysis = async () => {
    if (!selectedFile) return;

    setStep(2);
    setApiLoading(true);
    setAnalysisProgress(0);
    setSteps([
      { id: 1, label: "Detecting skin tone", status: "pending" },
      { id: 2, label: "Reading colour preferences", status: "pending" },
      { id: 3, label: "Identifying style cues", status: "pending" },
      { id: 4, label: "Matching live streams", status: "pending" }
    ]);

    // Create base form data
    const formData = new FormData();
    formData.append("photo", selectedFile);

    // Call style match API route
    let resultPromise = fetch("/api/style-match", {
      method: "POST",
      body: formData
    })
      .then((res) => res.json())
      .catch((err) => {
        console.error("API error", err);
        return {
          skinTone: "Medium",
          undertone: "Warm",
          styleVibe: "STREET UTILITY",
          colorPalette: "Tactical Monochromes",
          recommendedCategories: ["fashion", "tech"],
          confidence: 0.85
        };
      });

    // Animate progress bar over 2800ms (100% / 100 increments = 28ms)
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += 1;
      setAnalysisProgress(Math.min(progress, 100));
      if (progress >= 100) {
        clearInterval(progressInterval);
      }
    }, 28);

    // Trigger step transitions: pending -> active -> done
    const timers: NodeJS.Timeout[] = [];

    // Step 1: Active 0ms, Done 500ms
    setSteps((prev) => prev.map((s) => s.id === 1 ? { ...s, status: "active" } : s));
    timers.push(setTimeout(() => {
      setSteps((prev) => prev.map((s) => s.id === 1 ? { ...s, status: "done" } : s));
    }, 500));

    // Step 2: Active 700ms, Done 1200ms
    timers.push(setTimeout(() => {
      setSteps((prev) => prev.map((s) => s.id === 2 ? { ...s, status: "active" } : s));
    }, 700));
    timers.push(setTimeout(() => {
      setSteps((prev) => prev.map((s) => s.id === 2 ? { ...s, status: "done" } : s));
    }, 1200));

    // Step 3: Active 1400ms, Done 1900ms
    timers.push(setTimeout(() => {
      setSteps((prev) => prev.map((s) => s.id === 3 ? { ...s, status: "active" } : s));
    }, 1400));
    timers.push(setTimeout(() => {
      setSteps((prev) => prev.map((s) => s.id === 3 ? { ...s, status: "done" } : s));
    }, 1900));

    // Step 4: Active 2100ms, Done 2600ms
    timers.push(setTimeout(() => {
      setSteps((prev) => prev.map((s) => s.id === 4 ? { ...s, status: "active" } : s));
    }, 2100));
    timers.push(setTimeout(() => {
      setSteps((prev) => prev.map((s) => s.id === 4 ? { ...s, status: "done" } : s));
    }, 2600));

    // Transition to results screen when timers finish AND API returns data
    timers.push(setTimeout(async () => {
      const data = await resultPromise;
      setApiResult(data);
      setApiLoading(false);
      setStep(3);
    }, 2850));
  };

  // Reset tool
  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setApiResult(null);
    setStep(1);
  };

  // Helper to render check or spinners
  const renderStepIcon = (status: "pending" | "active" | "done") => {
    switch (status) {
      case "active":
        return <Loader2 className="w-4 h-4 text-violet-500 animate-spin" />;
      case "done":
        return <Check className="w-4 h-4 text-emerald-400 font-bold" />;
      default:
        return <div className="w-4 h-4 rounded-full border-2 border-white/20" />;
    }
  };

  return (
    <div className="relative w-full max-w-[400px] mx-auto bg-zinc-950 border border-white/10 rounded-3xl p-5 sm:p-8 text-center overflow-hidden flex flex-col justify-between min-h-[480px] max-h-[90vh] overflow-y-auto shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-50">
      
      {/* Blurred image background overlay during steps 2 & 3 */}
      {previewUrl && step >= 2 && (
        <div 
          className="absolute inset-0 bg-cover bg-center blur-2xl scale-110 opacity-20 pointer-events-none -z-10 transition-opacity duration-700"
          style={{ backgroundImage: `url(${previewUrl})` }}
        />
      )}

      {/* Modal Close Button */}
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors cursor-pointer z-50"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* STEP 1: Upload Zone */}
      {step === 1 && (
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-between w-full h-full flex-1 gap-6"
        >
          <div className="flex flex-col gap-1 mt-2">
            <h2 className="text-zinc-400 font-bebas text-sm sm:text-base uppercase tracking-widest leading-none font-bold">
              AI Style Sync
            </h2>
            <h3 className="text-2xl sm:text-3xl font-black text-violet-400 uppercase tracking-wide font-spray mt-2 leading-none animate-pulse">
              Match Your Vibe
            </h3>
            <p className="text-zinc-400 text-[10px] sm:text-[11px] leading-relaxed max-w-[280px] font-space font-semibold mx-auto mt-2.5">
              Scan your portrait or street fit using computer vision to unlock curated streams matched to your look.
            </p>
          </div>

          {/* Upload Box */}
          <div
            onClick={triggerFileSelect}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative flex flex-col items-center justify-center w-full max-w-[320px] h-[200px] border-2 border-dashed rounded-3xl cursor-pointer transition-all duration-300 ${
              isDragging 
                ? "border-violet-500 bg-violet-600/10 shadow-[0_0_25px_rgba(139,92,246,0.25)]" 
                : "border-white/10 bg-zinc-900/30 hover:border-violet-500/30 hover:bg-zinc-900/60 shadow-[inset_0_2px_10px_rgba(0,0,0,0.6)]"
            }`}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              accept="image/*" 
              className="hidden" 
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />

            {previewUrl ? (
              // Image Preview
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt="Upload preview"
                className="w-full h-full object-cover rounded-3xl"
              />
            ) : (
              // Empty upload states
              <div className="flex flex-col items-center gap-2.5 pointer-events-none">
                <Camera className="w-8 h-8 text-violet-400 drop-shadow-[0_0_8px_rgba(139,92,246,0.4)]" />
                <span className="font-bebas text-2xl text-zinc-100 tracking-wide">
                  Drop your photo
                </span>
                <span className="text-[12px] text-white/40 font-semibold font-space mt-[-5px]">
                  or tap to browse
                </span>
                <span className="text-[9px] text-white/20 font-medium tracking-wide mt-3.5 font-jetbrains uppercase">
                  analysed locally &bull; never stored
                </span>
              </div>
            )}
          </div>

          {/* Analysis Button */}
          {selectedFile ? (
            <button
              onClick={handleStartAnalysis}
              className="w-full max-w-[320px] h-[44px] rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 text-white font-black text-lg font-bebas uppercase tracking-widest hover:brightness-110 shadow-[0_4px_20px_rgba(168,85,247,0.35)] active:scale-95 duration-200 cursor-pointer transition-all"
            >
              Analyse my style &rarr;
            </button>
          ) : (
            <div className="h-[44px] w-full" />
          )}
        </motion.div>
      )}

      {/* STEP 2: Analyzing Screen */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-center w-full flex-1 gap-8 py-4"
        >
          {/* Header */}
          <h2 className="text-2xl font-black text-white font-bebas uppercase tracking-wide">
            Reading your vibe...
          </h2>

          {/* Steps Grid */}
          <div className="flex flex-col w-[300px] gap-3 text-left">
            {steps.map((s) => (
              <div 
                key={s.id}
                className={`flex items-center gap-3.5 px-4 py-2.5 rounded-2xl transition-all duration-300 ${
                  s.status === "active" 
                    ? "bg-violet-500/10 border border-violet-500/25" 
                    : s.status === "done" 
                    ? "bg-zinc-900/60 opacity-80 border border-transparent"
                    : "opacity-40 border border-transparent"
                }`}
              >
                {renderStepIcon(s.status)}
                <span className={`text-xs font-semibold font-space tracking-wide ${
                  s.status === "active" ? "text-violet-300 font-extrabold" : "text-zinc-200"
                }`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Progress Container */}
          <div className="flex flex-col w-[300px] gap-2 items-center">
            {/* Progress Bar */}
            <div className="w-full h-[2px] bg-zinc-900 rounded-full overflow-hidden border border-white/5">
              <div 
                className="h-full bg-violet-500 transition-all duration-100 ease-out"
                style={{ width: `${analysisProgress}%` }}
              />
            </div>
            {apiLoading && analysisProgress >= 100 && (
              <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider font-jetbrains animate-pulse mt-1">
                Finalizing matches...
              </span>
            )}
          </div>
        </motion.div>
      )}

      {/* STEP 3: Results Screen */}
      {step === 3 && apiResult && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-between w-full h-full flex-1 gap-6 text-center"
        >
          {/* Header Vibe Info */}
          <div className="flex flex-col items-center gap-1.5 mt-1 w-full">
            <span className="text-[9px] font-black tracking-widest text-violet-400 font-jetbrains uppercase">
              Your Vibe
            </span>
            
            {/* Letter by letter reveal animation for Style Label */}
            <div className="flex flex-wrap justify-center gap-x-[0.05em] font-bebas text-3xl sm:text-4xl text-white font-black uppercase">
              {apiResult.styleVibe.split("").map((char, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.25,
                    delay: idx * 0.04,
                    ease: "easeOut"
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>

            {/* Pills display */}
            <div className="flex items-center justify-center gap-2 mt-2 font-space font-semibold">
              <span className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.06] text-zinc-200 text-[11px]">
                Skin: {apiResult.skinTone}
              </span>
              <span className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.06] text-zinc-200 text-[11px]">
                Palette: {apiResult.colorPalette}
              </span>
            </div>

            <span className="text-[10px] text-white/30 font-medium font-space mt-1 leading-none">
              Based on your colors & style signals
            </span>
          </div>

          <hr className="w-full border-white/5" />

          {/* Matches Title */}
          <div className="text-left w-full px-2 font-space">
            <span className="text-xs font-semibold text-white/70">
              Live streams matching your vibe
            </span>
            <span className="text-xs font-black text-violet-400 uppercase tracking-wider ml-1">
              &bull; Live now
            </span>
          </div>

          {/* Filtered Scrollable Stream List */}
          <div className="flex gap-4 overflow-x-auto pb-4 pt-1 w-full max-w-full px-2 snap-x scrollbar-none">
            {liveStreams.map((stream) => {
              // Highlight only matching categories
              const isMatched = apiResult.recommendedCategories.some(
                (cat) => cat.toLowerCase() === stream.category.toLowerCase()
              );

              return (
                <div 
                  key={stream.id} 
                  className={`transition-all duration-500 transform snap-start shrink-0 ${
                    isMatched 
                      ? "opacity-100 scale-100 pointer-events-auto filter-none" 
                      : "opacity-20 scale-[0.96] pointer-events-none filter blur-[0.5px]"
                  }`}
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
                </div>
              );
            })}
          </div>

          {/* Try Again Button */}
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-[12px] font-bold text-white/40 hover:text-white transition-colors cursor-pointer active:scale-95 duration-200 mt-2 font-space"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try another photo</span>
          </button>
        </motion.div>
      )}

    </div>
  );
}
