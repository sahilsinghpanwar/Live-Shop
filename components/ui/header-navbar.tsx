"use client";

import React, { useState } from "react";
import GradientMenu from "@/components/ui/gradient-menu";
import { Sparkles, User, Settings, LogOut } from "lucide-react";
import Image from "next/image";

export function HeaderNavbar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl">
      {/* Soft Ambient Background Glow behind the navbar */}
      <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-violet-600/10 via-fuchsia-600/15 to-pink-600/10 blur-xl opacity-80 pointer-events-none" />

      <header className="relative w-full rounded-full border border-white/[0.08] bg-black/45 backdrop-blur-2xl px-3 py-1.5 sm:px-6 sm:py-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-between transition-all duration-300 hover:border-white/[0.15] hover:shadow-[0_20px_60px_rgba(139,92,246,0.15)]">
        
        {/* Left: Custom ShopBag Logo */}
        <div className="flex items-center gap-3 group cursor-pointer">
          {/* Animated SVG Icon */}
          <div className="relative h-10 w-10 flex items-center justify-center">
            {/* Glowing circle under icon on hover */}
            <div className="absolute inset-0 rounded-full bg-violet-500/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <svg
              viewBox="0 0 40 40"
              className="w-9 h-9 text-white transition-all duration-500 group-hover:scale-105 group-hover:text-violet-400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Semicircle Handle with spring-like hover bounce */}
              <path
                d="M 13 16 A 5 5 0 0 1 23 16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                className="transition-transform duration-500 origin-bottom group-hover:-translate-y-[1px] group-hover:scale-y-[1.08]"
              />
              
              {/* Small connection dots at handle base */}
              <circle cx="13" cy="16" r="1.2" fill="currentColor" />
              <circle cx="23" cy="16" r="1.2" fill="currentColor" />

              {/* Horizontal Top Bar */}
              <path
                d="M 9 16 H 25"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />

              {/* Crescent Swoop drawing the right side of the bag */}
              <path
                d="M 22 16 C 24.5 16, 29 17.5, 30.5 22 C 32 26.5, 30.5 33, 24 37 C 28.5 33, 30.5 26.5, 29.5 21.5 C 28.5 19, 25.5 16.5, 22 16"
                fill="currentColor"
                className="transition-all duration-500 origin-top group-hover:rotate-[2deg]"
              />
            </svg>
          </div>

          {/* Logo Typography (ShopBag + ONLINE SHOP) - Hidden on mobile, flex on desktop */}
          <div className="hidden sm:flex flex-col text-left leading-none">
            <span className="font-bold text-[18px] sm:text-[20px] text-white tracking-wide font-space transition-colors group-hover:text-violet-300 duration-300">
              Shop<span className="font-light text-zinc-300 group-hover:text-white transition-colors duration-300">Bag</span>
            </span>
            <span className="text-[7.5px] sm:text-[8px] font-bold text-violet-400 tracking-[0.25em] font-jetbrains uppercase mt-0.5">
              Online Shop
            </span>
          </div>
        </div>

        {/* Center: Dynamic GradientMenu with Home, Live, Products, Cart */}
        <div className="flex-1 flex justify-center max-w-lg mx-auto">
          <GradientMenu />
        </div>

        {/* Right: Profile item with the EXACT same hover-expanding gradient animation */}
        <div className="flex items-center gap-4 relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            style={{
              '--gradient-from': '#ffa9c6',
              '--gradient-to': '#f434e2'
            } as React.CSSProperties}
            className="relative w-10 h-10 sm:w-[50px] sm:h-[50px] bg-white dark:bg-zinc-900 shadow-md rounded-full flex items-center justify-center transition-all duration-500 hover:w-24 sm:hover:w-[130px] hover:shadow-none group cursor-pointer border border-zinc-200/50 dark:border-zinc-800/50 focus:outline-none"
            aria-label="Profile menu"
          >
            {/* Gradient background on hover */}
            <span className="absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] opacity-0 transition-all duration-500 group-hover:opacity-100"></span>
            
            {/* Blur glow behind */}
            <span className="absolute top-[8px] inset-x-0 h-full rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] blur-[12px] opacity-0 -z-10 transition-all duration-500 group-hover:opacity-60"></span>

            {/* Profile Avatar (scales down to 0 on hover) */}
            <span className="relative z-10 transition-all duration-500 group-hover:scale-0 delay-0 flex items-center justify-center h-5 w-5 sm:h-6 sm:w-6 rounded-full overflow-hidden border border-white/20">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                alt="User profile avatar"
                width={24}
                height={24}
                className="object-cover"
              />
            </span>

            {/* Title (scales up to 1 on hover) */}
            <span className="absolute text-white uppercase tracking-wider text-[10px] sm:text-xs font-black transition-all duration-500 scale-0 group-hover:scale-100 delay-150">
              Profile
            </span>
          </button>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowProfileMenu(false)}
              />
              <div className="absolute right-0 top-14 z-20 w-48 rounded-2xl border border-white/[0.08] bg-zinc-950/90 backdrop-blur-xl p-2.5 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="px-3 py-2 border-b border-white/[0.05]">
                  <p className="text-[10px] uppercase tracking-wider text-zinc-500">Signed in as</p>
                  <p className="text-xs font-bold text-zinc-300 truncate">sahil@ghost.design</p>
                </div>
                <div className="flex flex-col gap-0.5 mt-1.5">
                  <button 
                    onClick={() => { setShowProfileMenu(false); alert("Opening Profile..."); }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-zinc-300 hover:bg-white/[0.06] transition-colors text-left"
                  >
                    <User className="w-4 h-4 text-violet-400" /> Profile
                  </button>
                  <button 
                    onClick={() => { setShowProfileMenu(false); alert("Opening Settings..."); }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-zinc-300 hover:bg-white/[0.06] transition-colors text-left"
                  >
                    <Settings className="w-4 h-4 text-fuchsia-400" /> Settings
                  </button>
                  <button 
                    onClick={() => { setShowProfileMenu(false); alert("Logging out..."); }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-red-400 hover:bg-red-500/10 transition-colors text-left mt-1"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </header>
    </div>
  );
}
