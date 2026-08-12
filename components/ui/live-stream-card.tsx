"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, Eye, Heart } from "lucide-react";

export interface LiveStreamCardProps {
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
  className?: string;
}

export function LiveStreamCard({
  creator,
  avatarLetter,
  avatarColor,
  streamTitle,
  imageUrl,
  viewerCount,
  likes,
  productName,
  productPrice,
  productDiscount,
  productImageUrl,
  className = "",
}: LiveStreamCardProps) {
  const [hearts, setHearts] = useState<{ id: number; left: number; scale: number; speed: number }[]>([]);

  // Periodically spawn floating hearts inside the live stream area
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev.slice(-6), // limit concurrent hearts in memory
        {
          id: Math.random() + Date.now(),
          left: 45 + Math.random() * 40, // offset position
          scale: 0.6 + Math.random() * 0.7,
          speed: 2.5 + Math.random() * 1.5,
        },
      ]);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`group h-[420px] w-[310px] [perspective:1000px] select-none ${className}`}
    >
      {/* 3D Tilt Container */}
      <div 
        className="relative h-full rounded-[45px] bg-gradient-to-br from-zinc-900 via-zinc-950 to-black shadow-2xl transition-all duration-500 ease-in-out [transform-style:preserve-3d] group-hover:[box-shadow:rgba(168,85,247,0.15)_0px_20px_50px_0px,rgba(0,0,0,0.5)_20px_40px_25px_-30px] group-hover:[transform:rotate3d(1,1,0,18deg)] border border-white/5"
      >
        {/* Underlay Image Cover (background of stream) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={streamTitle}
          className="absolute inset-0 w-full h-full object-cover rounded-[45px] pointer-events-none opacity-85 group-hover:scale-[1.02] transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/45 rounded-[45px] pointer-events-none" />

        {/* Parallax Layer 1: Frosted Glass Inner Overlay */}
        <div className="absolute inset-2.5 rounded-[40px] border-b border-l border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-[1px] [transform-style:preserve-3d] [transform:translate3d(0,0,25px)] pointer-events-none" />

        {/* Parallax Layer 2: Status Badges (LIVE + Viewers) */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between [transform-style:preserve-3d] [transform:translate3d(0,0,40px)] pointer-events-none">
          {/* LIVE indicator */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 border border-red-500/25 text-white font-extrabold text-[9px] tracking-wider uppercase shadow-md">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
            </span>
            <span>Live</span>
          </div>

          {/* Viewer count */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/5 text-zinc-300 font-extrabold text-[9px] tracking-wide">
            <Eye className="w-3 h-3 text-zinc-400" />
            <span>{viewerCount}</span>
          </div>
        </div>

        {/* Parallax Layer 3: Floating Hearts */}
        <div className="absolute inset-0 overflow-hidden rounded-[45px] pointer-events-none [transform:translate3d(0,0,35px)]">
          <AnimatePresence>
            {hearts.map((heart) => (
              <motion.span
                key={heart.id}
                initial={{ y: 260, opacity: 0, scale: 0.2 }}
                animate={{
                  y: 40,
                  opacity: [0, 0.9, 0.9, 0],
                  scale: [0.2, heart.scale, heart.scale * 1.2, 0.5],
                  x: [0, (Math.random() - 0.5) * 35, (Math.random() - 0.5) * 55],
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: heart.speed, ease: "easeOut" }}
                className="absolute text-pink-500 drop-shadow-[0_2px_8px_rgba(244,63,94,0.4)]"
                style={{ left: `${heart.left}%` }}
              >
                ❤️
              </motion.span>
            ))}
          </AnimatePresence>
        </div>

        {/* Parallax Layer 4: Likes Count & Creator overlay */}
        <div className="absolute inset-x-6 bottom-24 flex flex-col gap-2 [transform-style:preserve-3d] [transform:translate3d(0,0,38px)] text-left pointer-events-none">
          {/* Creator detail */}
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-full ${avatarColor} text-white flex items-center justify-center font-black text-xs shadow-md border border-white/10`}>
              {avatarLetter}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-violet-400 uppercase tracking-widest tracking-wide drop-shadow-sm font-space">
                {creator}
              </span>
              <span className="text-zinc-400 font-extrabold text-[9px] flex items-center gap-1 drop-shadow-sm">
                <Heart className="w-2.5 h-2.5 fill-pink-500 text-pink-500" /> {likes} likes
              </span>
            </div>
          </div>

          {/* Stream headline */}
          <h4 className="text-sm font-black text-white leading-tight tracking-wide drop-shadow font-space line-clamp-2">
            {streamTitle}
          </h4>
        </div>

        {/* Parallax Layer 5: Floating Product Box */}
        <div 
          className="absolute bottom-5 left-5 right-5 p-3 rounded-2xl bg-zinc-950/70 border border-white/10 backdrop-blur-md flex items-center justify-between gap-3 [transform-style:preserve-3d] [transform:translate3d(0,0,45px)] group-hover:[transform:translate3d(0,0,70px)] transition-all duration-500 ease-out shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
        >
          <div className="flex items-center gap-3">
            {/* Product Thumbnail */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={productImageUrl}
              alt={productName}
              className="w-10 h-10 object-cover rounded-xl border border-white/10"
            />
            {/* Product Info */}
            <div className="flex flex-col text-left font-space">
              <span className="text-[10px] font-extrabold text-white tracking-wide uppercase line-clamp-1">
                {productName}
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                {productDiscount && (
                  <span className="text-[8px] font-black text-emerald-400 uppercase tracking-wider">
                    {productDiscount}
                  </span>
                )}
                <span className="text-[9px] font-bold text-zinc-300">
                  {productPrice}
                </span>
              </div>
            </div>
          </div>

          {/* Shop button */}
          <button className="px-3 py-1.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-extrabold text-[9px] tracking-wide uppercase flex items-center gap-1 shadow transition-all active:scale-95 duration-200 pointer-events-auto cursor-pointer font-space">
            <ShoppingBag className="w-3.5 h-3.5 text-violet-600" />
            <span>Shop</span>
          </button>
        </div>

      </div>
    </div>
  );
}
