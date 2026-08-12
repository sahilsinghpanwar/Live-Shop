"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Eye, 
  Zap, 
  CheckCircle2
} from "lucide-react";

// Inline brand SVGs to bypass lucide-react export limitations
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
    <polygon points="10 15 15 12 10 9" fill="currentColor" />
  </svg>
);

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);
import { cn } from "@/lib/utils";

// Register ScrollTrigger safely for Next.js SSR
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// 1. INLINE STYLES FOR CINEMATIC BACKDROP
// -------------------------------------------------------------------------
const STYLES = `
.site-footer-wrapper {
  font-family: "Space Grotesk", sans-serif;
  -webkit-font-smoothing: antialiased;
  
  --pill-bg-1: rgba(255, 255, 255, 0.02);
  --pill-bg-2: rgba(255, 255, 255, 0.01);
  --pill-border: rgba(255, 255, 255, 0.05);
  --pill-shadow: rgba(0, 0, 0, 0.4);
  
  --pill-bg-1-hover: rgba(255, 255, 255, 0.06);
  --pill-bg-2-hover: rgba(255, 255, 255, 0.02);
  --pill-border-hover: rgba(139, 92, 246, 0.25);
  --pill-shadow-hover: rgba(139, 92, 246, 0.1);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  100% { transform: translate(-50%, -50%) scale(1.08); opacity: 0.8; }
}

@keyframes marqueeScroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes statusPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
  50% { box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  20%, 60% { transform: scale(1.15); }
  40% { transform: scale(1); }
}

.animate-footer-breathe {
  animation: footer-breathe 6s ease-in-out infinite alternate;
}

.animate-footer-marquee {
  animation: marqueeScroll 35s linear infinite;
}

.animate-footer-pulse {
  animation: statusPulse 2.5s ease-in-out infinite;
}

.animate-footer-heart {
  animation: heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

.footer-bg-grid {
  background-size: 60px 60px;
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
}

.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%, 
    rgba(79, 63, 240, 0.16) 0%, 
    rgba(139, 92, 246, 0.08) 40%, 
    rgba(244, 63, 94, 0.02) 60%,
    transparent 75%
  );
}

.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 
      0 6px 20px -5px var(--pill-shadow), 
      inset 0 1px 1px rgba(255, 255, 255, 0.05);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 
      0 12px 30px -10px var(--pill-shadow-hover), 
      inset 0 1px 1px rgba(255, 255, 255, 0.1);
}

.footer-giant-bg-text {
  font-size: 26vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.06);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, transparent 80%);
  -webkit-background-clip: text;
  background-clip: text;
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & 
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.35,
            y: y * 0.35,
            rotationX: -y * 0.12,
            rotationY: x * 0.12,
            scale: 1.04,
            ease: "power2.out",
            duration: 0.4,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2,
          });
        };

        element.addEventListener("mousemove", handleMouseMove as any);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove as any);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as any).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as any).current = node;
        }}
        className={cn("cursor-pointer focus:outline-none", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// 3. MAIN CINEMATIC SITE FOOTER
// -------------------------------------------------------------------------
export function SiteFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver refs for entrance animations
  const brandColRef = useRef<HTMLDivElement>(null);
  const colShopRef = useRef<HTMLDivElement>(null);
  const colCreatorsRef = useRef<HTMLDivElement>(null);
  const colCompanyRef = useRef<HTMLDivElement>(null);
  const colConnectRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  // States
  const [emailValue, setEmailValue] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [viewerCount, setViewerCount] = useState(48200);
  const [timeLeft, setTimeLeft] = useState({ m: 14, s: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Monitor resize for responsive fixed-reveal layout
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Number Formatter Helper
  const fmtNum = (n: number) => {
    return n >= 1000 ? (n / 1000).toFixed(1) + "K" : String(n);
  };

  // Viewers dynamic updates
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount((prev) => {
        const offset = Math.floor((Math.random() - 0.5) * 300);
        const nextVal = prev + offset;
        return nextVal < 1000 ? 1000 : nextVal;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Drop Timer countdown loop
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.m === 0 && prev.s === 0) {
          return { m: 14, s: 0 }; // resets
        }
        if (prev.s === 0) {
          return { m: prev.m - 1, s: 59 };
        }
        return { m: prev.m, s: prev.s - 1 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // GSAP Parallax animations on scroll
  useEffect(() => {
    if (typeof window === "undefined" || !wrapperRef.current || isMobile) return;

    const ctx = gsap.context(() => {
      // Background Parallax scale and scroll scrub
      gsap.fromTo(
        giantTextRef.current,
        { y: "15vh", scale: 0.8, opacity: 0 },
        {
          y: "0vh",
          scale: 1.05,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 95%",
            end: "bottom bottom",
            scrub: 1.2,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  // IntersectionObserver for entrance staggered reveals
  useEffect(() => {
    if (typeof window === "undefined") return;

    const items = [
      { ref: brandColRef, delay: "0ms", y: "20px" },
      { ref: colShopRef, delay: "100ms", y: "14px" },
      { ref: colCreatorsRef, delay: "180ms", y: "14px" },
      { ref: colCompanyRef, delay: "260ms", y: "14px" },
      { ref: colConnectRef, delay: "340ms", y: "14px" },
      { ref: bottomBarRef, delay: "500ms", y: "0px", isBottom: true }
    ];

    const observerOptions = {
      threshold: 0.08,
      rootMargin: "0px 0px 50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.style.opacity = "1";
          target.style.transform = "translateY(0px)";
          observer.unobserve(target);
        }
      });
    }, observerOptions);

    items.forEach((item) => {
      const el = item.ref.current;
      if (el) {
        el.style.opacity = "0";
        el.style.transform = `translateY(${item.y})`;
        el.style.transition = item.isBottom 
          ? `opacity 400ms cubic-bezier(0.16, 1, 0.3, 1) ${item.delay}`
          : `opacity 500ms cubic-bezier(0.16, 1, 0.3, 1) ${item.delay}, transform 500ms cubic-bezier(0.16, 1, 0.3, 1) ${item.delay}`;
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailValue.trim()) return;
    setEmailSubmitted(true);
    setEmailValue("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatTimer = () => {
    const mins = String(timeLeft.m).padStart(2, "0");
    const secs = String(timeLeft.s).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* Curtain Reveal Bounding Wrapper */}
      <div
        ref={wrapperRef}
        className="relative h-auto md:h-screen w-full select-none"
        style={!isMobile ? { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" } : undefined}
      >
        {/* Fixed cinematic container behind elements */}
        <footer className="relative md:fixed md:bottom-0 md:left-0 flex h-auto md:h-screen w-full flex-col justify-between overflow-visible md:overflow-hidden bg-[#050508] text-foreground site-footer-wrapper z-0 py-10 md:py-0">
          
          {/* Ambient Lighting & Grid System */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[70vh] w-[90vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[100px] pointer-events-none -z-10" />
          <div className="footer-bg-grid absolute inset-0 -z-10 pointer-events-none" />

          {/* Giant background brand subtitle parallax */}
          <div
            ref={giantTextRef}
            className="footer-giant-bg-text absolute -bottom-[4vh] left-1/2 -translate-x-1/2 whitespace-nowrap -z-10 pointer-events-none select-none font-spray tracking-wide"
          >
            SHOPBAG
          </div>

          <div className="flex flex-col w-full z-10">
            {/* 1. SCROLLING GHOST MARQUEE (Top of footer) */}
            <div className="w-full overflow-hidden border-t border-white/[0.04] bg-[#050508]/60 backdrop-blur-md py-3.5 shadow-2xl">
              <div className="flex w-max animate-footer-marquee text-xs md:text-sm font-bold tracking-[0.25em] text-muted-foreground uppercase">
                <div className="flex items-center space-x-12 px-6 font-bebas text-5xl md:text-[64px] leading-none whitespace-nowrap text-transparent" style={{ WebkitTextStroke: "1px rgba(255, 255, 255, 0.05)" }}>
                  {Array.from({ length: 16 }).map((_, i) => (
                    <span key={i} className="mr-8">
                      LIVE <span className="text-white/10 font-sans text-xl relative -top-3">·</span> DROP <span className="text-white/10 font-sans text-xl relative -top-3">·</span> SHOP <span className="text-white/10 font-sans text-xl relative -top-3">·</span> REPEAT <span className="text-white/10 font-sans text-xl relative -top-3">·</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. LIVE STATUS STRIP */}
            <div className="w-full bg-violet-500/[0.03] border-y border-violet-500/10 py-2.5 flex items-center justify-center">
              <div className="flex items-center justify-center gap-5 px-6 select-none font-jetbrains text-[10px] tracking-[0.2em] font-semibold">
                
                {/* Item 1 - Streams */}
                <div className="flex items-center text-white/50">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse mr-2" />
                  7 STREAMS LIVE
                </div>

                <span className="h-3 w-[1px] bg-white/10 hidden sm:block" />

                {/* Item 2 - Viewers (hidden on mobile) */}
                <div className="items-center text-white/35 hidden sm:flex">
                  <Eye className="w-3 h-3 text-white/25 mr-2" />
                  <span>{fmtNum(viewerCount)} VIEWERS</span>
                </div>

                <span className="h-3 w-[1px] bg-white/10" />

                {/* Item 3 - Next Drop timer */}
                <div className="flex items-center text-white/45">
                  <Zap className="w-3 h-3 text-yellow-500/50 mr-2" />
                  <span>NEXT DROP <span className="text-white/70 ml-1">{formatTimer()}</span></span>
                </div>

              </div>
            </div>
          </div>

          {/* 3. MAIN BODY (5-Column Grid) */}
          <div className="relative flex-1 flex items-center justify-center px-6 md:px-12 w-full z-10 max-w-6xl mx-auto py-10 md:py-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-14 w-full">
              
              {/* COL 1 - BRAND DETAILS */}
              <div ref={brandColRef} className="lg:col-span-2 flex flex-col items-start text-left">
                {/* Logo: Custom ShopBag SVG Logo with Glow */}
                <div className="flex items-center gap-3 group cursor-pointer mb-2">
                  {/* Animated SVG Icon */}
                  <div className="relative h-10 w-10 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-violet-500/20 blur-md opacity-75 animate-pulse" />
                    <svg
                      viewBox="0 0 40 40"
                      className="w-9 h-9 text-violet-400 scale-105"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Semicircle Handle */}
                      <path
                        d="M 13 16 A 5 5 0 0 1 23 16"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        fill="none"
                      />
                      
                      {/* Small connection dots */}
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
                      />
                    </svg>
                  </div>

                  {/* Logo Typography (ShopBag + ONLINE SHOP) */}
                  <div className="flex flex-col text-left leading-none">
                    <span className="font-bold text-[20px] text-white tracking-wide font-space">
                      Shop<span className="font-light text-zinc-300">Bag</span>
                    </span>
                    <span className="text-[8px] font-bold text-violet-400 tracking-[0.25em] font-jetbrains uppercase mt-0.5">
                      Online Shop
                    </span>
                  </div>
                </div>

                {/* Tagline */}
                <p className="mt-3.5 text-zinc-400/55 text-sm font-medium font-space leading-relaxed max-w-[240px]">
                  The future of shopping is already here.
                </p>

                {/* Live Platform Badge */}
                <div className="mt-4 flex items-center gap-2.5 rounded-full border border-violet-500/20 bg-violet-500/[0.04] px-3.5 py-1 select-none">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[9px] font-bold font-jetbrains tracking-wider text-violet-400/90 uppercase">
                    PLATFORM LIVE · 24/7
                  </span>
                </div>

                {/* Email alerts signup */}
                <div className="mt-7 w-full max-w-[290px]">
                  <span className="block text-[9px] font-bold font-jetbrains tracking-[0.18em] text-white/30 uppercase mb-2">
                    GET DROP ALERTS
                  </span>

                  {emailSubmitted ? (
                    <div className="flex items-center gap-2 h-[42px] px-3.5 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.03] text-emerald-400 text-xs font-semibold font-space animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>You're in. 🔥</span>
                    </div>
                  ) : (
                    <form onSubmit={handleSubscribe} className="flex w-full select-none shadow-[0_4px_20px_rgba(0,0,0,0.4)] rounded-lg overflow-hidden border border-white/[0.06] focus-within:border-violet-500/50 transition-colors">
                      <input
                        type="email"
                        required
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                        placeholder="your@email.com"
                        className="h-[42px] flex-1 px-4 bg-white/[0.01] border-0 text-xs font-medium font-space placeholder-white/20 text-white focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="h-[42px] px-6 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 hover:brightness-110 text-white font-space font-extrabold uppercase tracking-widest text-[11px] select-none cursor-pointer transition-all active:scale-95 shadow-[0_0_12px_rgba(139,92,246,0.2)]"
                      >
                        JOIN &rarr;
                      </button>
                    </form>
                  )}
                  <span className="block text-[9px] text-white/15 font-space mt-2.5">
                    No spam. Drop alerts only.
                  </span>
                </div>
              </div>

              {/* COL 2 - SHOP */}
              <div ref={colShopRef} className="flex flex-col items-start text-left">
                <span className="block text-[9px] font-bold font-jetbrains tracking-[0.22em] text-white/25 uppercase mb-5">
                  SHOP
                </span>
                <div className="flex flex-col gap-3 font-space text-[13px] text-zinc-400/55">
                  <a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-1">Live Drops</a>
                  <a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-1">Flash Sales</a>
                  <a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-1">New Arrivals</a>
                  <a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-1">Trending Now</a>
                  <span className="text-white/15 line-through decoration-white/20 cursor-default select-none">Sold Out</span>
                </div>
              </div>

              {/* COL 3 - CREATORS */}
              <div ref={colCreatorsRef} className="flex flex-col items-start text-left">
                <span className="block text-[9px] font-bold font-jetbrains tracking-[0.22em] text-white/25 uppercase mb-5">
                  CREATORS
                </span>
                <div className="flex flex-col gap-3 font-space text-[13px] text-zinc-400/55">
                  <a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-1">Become a Creator</a>
                  <a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-1">Creator Dashboard</a>
                  <a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-1">Top Streamers</a>
                  <a href="#" className="text-violet-400 font-semibold hover:text-violet-300 transition-all duration-300 hover:translate-x-1">Apply Now &rarr;</a>
                </div>
              </div>

              {/* COL 4 - COMPANY */}
              <div ref={colCompanyRef} className="flex flex-col items-start text-left">
                <span className="block text-[9px] font-bold font-jetbrains tracking-[0.22em] text-white/25 uppercase mb-5">
                  COMPANY
                </span>
                <div className="flex flex-col gap-3 font-space text-[13px] text-zinc-400/55">
                  <a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-1">About Us</a>
                  <a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-1">Careers</a>
                  <a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-1">Press Kit</a>
                  <a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-1">Contact Us</a>
                </div>
              </div>

              {/* COL 5 - CONNECT */}
              <div ref={colConnectRef} className="flex flex-col items-start text-left">
                <span className="block text-[9px] font-bold font-jetbrains tracking-[0.22em] text-white/25 uppercase mb-5">
                  CONNECT
                </span>
                <div className="flex flex-col gap-3.5 font-space text-[13px] text-zinc-400/55 w-full">
                  <a href="#" className="flex items-center gap-2.5 group/link hover:text-white transition-colors duration-300 hover:translate-x-1">
                    <InstagramIcon className="w-4 h-4 text-white/25 group-hover/link:text-white group-hover/link:-rotate-6 transition-all duration-300" />
                    <span>Instagram</span>
                  </a>
                  <a href="#" className="flex items-center gap-2.5 group/link hover:text-white transition-colors duration-300 hover:translate-x-1">
                    <YoutubeIcon className="w-4 h-4 text-white/25 group-hover/link:text-white group-hover/link:-rotate-6 transition-all duration-300" />
                    <span>YouTube</span>
                  </a>
                  <a href="#" className="flex items-center gap-2.5 group/link hover:text-white transition-colors duration-300 hover:translate-x-1">
                    <WhatsAppIcon className="w-4 h-4 text-white/25 group-hover/link:text-white group-hover/link:-rotate-6 transition-all duration-300" />
                    <span>WhatsApp</span>
                  </a>
                  <a href="#" className="flex items-center gap-2.5 group/link hover:text-white transition-colors duration-300 hover:translate-x-1">
                    <TwitterIcon className="w-4 h-4 text-white/25 group-hover/link:text-white group-hover/link:-rotate-6 transition-all duration-300" />
                    <span>Twitter</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* 4. BOTTOM BAR / CREDITS */}
          <div 
            ref={bottomBarRef} 
            className="relative z-20 w-full border-t border-white/[0.04] py-6 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            {/* Left - System Status */}
            <div className="flex items-center gap-2 font-jetbrains text-[9px] tracking-wider text-white/25 uppercase order-2 md:order-1">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-footer-pulse" />
              <span>ALL SYSTEMS LIVE</span>
            </div>

            {/* Center - Copyright */}
            <div className="text-zinc-600 font-medium text-[11px] font-space order-3 md:order-2">
              © 2026 ShopBag · All rights reserved.
            </div>

            {/* Right - Origin Badge & Scroll-to-Top Toggle Group */}
            <div className="flex items-center gap-5 order-1 md:order-3">
              {/* Made in India badge */}
              <div className="flex items-center gap-1.5 select-none font-jetbrains text-[9px] tracking-wider text-white/20 hover:text-white/45 transition-colors duration-300">
                <span>🇮🇳</span>
                <span>MADE IN INDIA</span>
              </div>

              {/* Back to top magnetic toggle */}
              <MagneticButton
                as="button"
                onClick={scrollToTop}
                className="w-10 h-10 rounded-full border border-white/5 bg-zinc-950/60 flex items-center justify-center text-zinc-500 hover:text-white hover:border-violet-500/40 group transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.5)]"
                aria-label="Scroll back to top"
              >
                <svg className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                </svg>
              </MagneticButton>
            </div>

          </div>
        </footer>
      </div>
    </>
  );
}
