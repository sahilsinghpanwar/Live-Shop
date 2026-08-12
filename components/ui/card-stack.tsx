"use client";

import React, { useState, useEffect } from "react";
import { motion, PanInfo } from "motion/react";
import { ChevronLeft, ChevronRight, ShoppingBag, Flame } from "lucide-react";

export interface CardStackItem {
  id: string | number;
  title: string;
  description: string;
  imageUrl: string;
  price: string;
  originalPrice?: string;
  tag?: string;
}

const defaultItems: CardStackItem[] = [
  {
    id: 1,
    title: "NEON MESH PARKA",
    description: "Cyberpunk waterproof windbreaker with glowing reflective patterns and custom straps.",
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop",
    price: "$149",
    originalPrice: "$299",
    tag: "50% OFF"
  },
  {
    id: 2,
    title: "RUNNER SHADOW X",
    description: "High-octane performance sneakers built with responsive cushion tech and sleek lines.",
    imageUrl: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=600&auto=format&fit=crop",
    price: "$189",
    originalPrice: "$250",
    tag: "HOT SELLER"
  },
  {
    id: 3,
    title: "AIR RETRO NOVA",
    description: "Classic design matches next-gen comfort. A limited streetwear drop for collectors.",
    imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600&auto=format&fit=crop",
    price: "$165",
    originalPrice: "$220",
    tag: "LIMITED DROP"
  },
  {
    id: 4,
    title: "ACCESSORIES KIT",
    description: "Modular chest bag and utility tactical harness constructed with military fabrics.",
    imageUrl: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=600&auto=format&fit=crop",
    price: "$95",
    originalPrice: "$150",
    tag: "9 LEFT"
  },
  {
    id: 5,
    title: "TOKYO STREET FIT",
    description: "Oversized hoodie coupled with custom utility cargos, optimized for urban settings.",
    imageUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop",
    price: "$210",
    originalPrice: "$340",
    tag: "BEST CHOICE"
  }
];

export interface CardStackProps {
  items?: CardStackItem[];
  autoPlayInterval?: number;
}

export function CardStack({ items = defaultItems, autoPlayInterval = 4500 }: CardStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Monitor viewport resize for responsive left/right offset adjustments
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay functionality
  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = setInterval(() => {
      handleNext();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [currentIndex, isAutoPlay, items.length, autoPlayInterval]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  // Drag/Swipe Gesture Handler
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 55;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  // Helper to determine circular positioning states: Center (0), Right (1), Left (-1), or Hidden (2)
  const getRelativePosition = (idx: number, current: number, length: number) => {
    const diff = (idx - current + length) % length;
    if (diff === 0) return 0;
    if (diff === 1) return 1;
    if (diff === length - 1) return -1;
    return 2; // Hidden out of bounds
  };

  // Map position states to 3D coordinate styling (Expanded Hero Card size coords)
  const getCardStyles = (relativePos: number) => {
    switch (relativePos) {
      case 0: // Active Center
        return {
          x: 0,
          scale: 1,
          rotateY: 0,
          opacity: 1,
          zIndex: 20,
        };
      case -1: // Side Left
        return {
          x: isMobile ? -70 : -240,
          scale: 0.8,
          rotateY: 24,
          opacity: 0.5,
          zIndex: 10,
        };
      case 1: // Side Right
        return {
          x: isMobile ? 70 : 240,
          scale: 0.8,
          rotateY: -24,
          opacity: 0.5,
          zIndex: 10,
        };
      default: // Hidden
        return {
          x: 0,
          scale: 0.65,
          rotateY: 0,
          opacity: 0,
          zIndex: 0,
        };
    }
  };

  if (items.length === 0) return null;

  return (
    <div 
      className="relative w-full max-w-[850px] mx-auto px-10 sm:px-14 select-none"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {/* 3D Card Stack Container (Expanded Height for Large Cards) */}
      <div 
        className="relative flex items-center justify-center h-[380px] sm:h-[460px] w-full max-w-[480px] mx-auto"
        style={{ transformStyle: "preserve-3d", perspective: "1200px" }}
      >
        {items.map((item, idx) => {
          const relativePos = getRelativePosition(idx, currentIndex, items.length);
          const isCenter = relativePos === 0;

          return (
            <motion.div
              key={item.id}
              drag={isCenter ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.4}
              onDragEnd={isCenter ? handleDragEnd : undefined}
              animate={getCardStyles(relativePos)}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 26,
                mass: 0.85
              }}
              className={`absolute w-[85vw] sm:w-[460px] h-[340px] sm:h-[420px] rounded-[32px] overflow-hidden border border-white/10 bg-zinc-900 shadow-[0_25px_60px_rgba(0,0,0,0.8)] hover:shadow-violet-500/10 hover:border-violet-500/25 transition-shadow duration-500 flex flex-col justify-end group ${
                isCenter ? "cursor-grab active:cursor-grabbing pointer-events-auto" : "pointer-events-none"
              }`}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Promo Corner Tag */}
              {item.tag && isCenter && (
                <div className="absolute top-5 left-5 z-20 flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-500/90 backdrop-blur-sm text-white font-extrabold text-[9px] tracking-wider uppercase border border-red-400/20 shadow-[0_4px_12px_rgba(239,68,68,0.4)] font-space">
                  <Flame className="w-3.5 h-3.5 fill-white animate-pulse" />
                  <span>{item.tag}</span>
                </div>
              )}

              {/* Card Background Cover */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.imageUrl}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-700 group-hover:scale-105"
              />

              {/* Dark Ambient Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent pointer-events-none" />

              {/* Info Overlay */}
              <div className="relative z-10 p-6 sm:p-8 flex flex-col gap-2 text-left">
                <div className="flex items-end justify-between">
                  <h3 className="font-extrabold text-xl sm:text-3xl text-white tracking-wide uppercase leading-tight drop-shadow font-spray">
                    {item.title}
                  </h3>
                  
                  {/* Pricing Layout */}
                  <div className="flex flex-col items-end gap-0.5 mr-1 font-space">
                    {item.originalPrice && (
                      <span className="text-zinc-400 text-[10px] sm:text-xs font-bold line-through opacity-75">
                        {item.originalPrice}
                      </span>
                    )}
                    <span className="px-3 py-1 rounded-xl bg-violet-600 text-white font-black text-xs sm:text-sm tracking-wide border border-violet-400/20 shadow-md">
                      {item.price}
                    </span>
                  </div>
                </div>
                
                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-[85%] font-semibold drop-shadow-sm font-space">
                  {item.description}
                </p>

                {/* Buy Button inside active card */}
                {isCenter && (
                  <div className="mt-2 w-fit transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black font-extrabold uppercase text-[10px] tracking-wider flex items-center gap-1.5 shadow-md active:scale-95 transition-all font-space">
                      <ShoppingBag className="w-3.5 h-3.5 text-violet-600" /> Buy Now
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 sm:left-2 z-30">
        <button 
          onClick={handlePrev}
          className="h-10 w-10 rounded-full border border-white/10 bg-zinc-950/60 backdrop-blur-md flex items-center justify-center text-zinc-400 hover:text-white hover:border-violet-500/50 hover:bg-zinc-900/80 transition-all duration-200 active:scale-90 focus:outline-none shadow-lg cursor-pointer"
          aria-label="Previous card"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-0 sm:right-2 z-30">
        <button 
          onClick={handleNext}
          className="h-10 w-10 rounded-full border border-white/10 bg-zinc-950/60 backdrop-blur-md flex items-center justify-center text-zinc-400 hover:text-white hover:border-violet-500/50 hover:bg-zinc-900/80 transition-all duration-200 active:scale-90 focus:outline-none shadow-lg cursor-pointer"
          aria-label="Next card"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrentIndex(idx);
              setIsAutoPlay(false);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
              currentIndex === idx 
                ? "w-6 bg-gradient-to-r from-violet-500 to-fuchsia-500" 
                : "w-1.5 bg-zinc-700 hover:bg-zinc-600"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
