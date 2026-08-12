"use client";

import React, { useState, useEffect } from "react";
import { HeaderNavbar } from "@/components/ui/header-navbar";
import { 
  ContainerScroll, 
  ContainerSticky, 
  GalleryContainer, 
  GalleryCol, 
  ContainerStagger, 
  ContainerAnimated 
} from "@/components/ui/animated-gallery";
import { CardStack } from "@/components/ui/card-stack";
import { LiveStreamCard } from "@/components/ui/live-stream-card";
import { AIStyleMatch } from "@/components/ui/ai-style-match";
import { LivePersonaSection } from "@/components/sections/live-persona";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import { SiteFooter } from "@/components/sections/site-footer";
import { useMotionValue, useSpring, motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Radio, Play, Sparkles, ShoppingBag, ArrowRight, Camera } from "lucide-react";

// Thematic high-quality Unsplash images representing live shopping, streetwear, modeling, and commerce
const COMMERCE_COL_1 = [
  {
    url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600&auto=format&fit=crop",
    category: "Couture Drop",
    title: "PARISIAN FIT"
  },
  {
    url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop",
    category: "Sneaker Drop",
    title: "AIR RETRO NOVA"
  },
  {
    url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop",
    category: "Exclusive",
    title: "URBAN STREETSTYLE"
  },
  {
    url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop",
    category: "Live Stream",
    title: "TOKYO FLAGSHIP"
  }
];

const COMMERCE_COL_2 = [
  {
    url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop",
    category: "Curator Live",
    title: "SAHIL'S CHOICE"
  },
  {
    url: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=600&auto=format&fit=crop",
    category: "Footwear",
    title: "RUNNER SHADOW"
  },
  {
    url: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=600&auto=format&fit=crop",
    category: "Summer Sale",
    title: "ACCESSORIES KIT"
  },
  {
    url: "https://images.unsplash.com/photo-1520004434532-6684162097ae?q=80&w=600&auto=format&fit=crop",
    category: "Restock",
    title: "MINIMALIST HOODIES"
  }
];

const COMMERCE_COL_3 = [
  {
    url: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600&auto=format&fit=crop",
    category: "New Arrivals",
    title: "PREMIUM COTTON"
  },
  {
    url: "https://images.unsplash.com/photo-1534452208741-775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    category: "Streetwear",
    title: "OVERSIZED HOODIE"
  },
  {
    url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600&auto=format&fit=crop",
    category: "Collection",
    title: "VINTAGE TEES"
  },
  {
    url: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=600&auto=format&fit=crop",
    category: "Showroom",
    title: "DESIGNER APPAREL"
  }
];

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

const LIVE_STREAMS_DATA: LiveStreamItem[] = [
  {
    id: 1,
    creator: "@PriyaSkin",
    avatarLetter: "P",
    avatarColor: "bg-amber-600",
    streamTitle: "Night Repair Kit Unboxing",
    imageUrl: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=400&auto=format&fit=crop",
    viewerCount: "9.9K",
    likes: "14.1K",
    productName: "Repair Kit",
    productDiscount: "20% off",
    productPrice: "₹2,199",
    productImageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=150&auto=format&fit=crop",
    category: "Beauty"
  },
  {
    id: 2,
    creator: "@ArjunTech",
    avatarLetter: "A",
    avatarColor: "bg-blue-600",
    streamTitle: "Earbuds Showdown — Top 3 Under ₹3K",
    imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=400&auto=format&fit=crop",
    viewerCount: "4.7K",
    likes: "6.6K",
    productName: "ProBuds X3",
    productDiscount: "15% off",
    productPrice: "₹2,799",
    productImageUrl: "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?q=80&w=150&auto=format&fit=crop",
    category: "Tech"
  },
  {
    id: 3,
    creator: "@NishaSarees",
    avatarLetter: "N",
    avatarColor: "bg-rose-600",
    streamTitle: "Designer Saree Haul — Festive Season",
    imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=400&auto=format&fit=crop",
    viewerCount: "3.0K",
    likes: "5.9K",
    productName: "Kanjivaram Silk",
    productDiscount: "15% off",
    productPrice: "₹4,499",
    productImageUrl: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=150&auto=format&fit=crop",
    category: "Fashion"
  },
  {
    id: 4,
    creator: "@KabirStyles",
    avatarLetter: "K",
    avatarColor: "bg-violet-600",
    streamTitle: "Oversized Streetwear Fitting Guide",
    imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400&auto=format&fit=crop",
    viewerCount: "5.1K",
    likes: "8.9K",
    productName: "Urban Hoodie",
    productDiscount: "10% off",
    productPrice: "₹1,899",
    productImageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=150&auto=format&fit=crop",
    category: "Fashion"
  },
  {
    id: 5,
    creator: "@ZaraGadgets",
    avatarLetter: "Z",
    avatarColor: "bg-emerald-600",
    streamTitle: "Next-Gen RGB Keyboard Build & Review",
    imageUrl: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=400&auto=format&fit=crop",
    viewerCount: "8.2K",
    likes: "12.5K",
    productName: "Nova Type 1",
    productDiscount: "25% off",
    productPrice: "₹3,499",
    productImageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=150&auto=format&fit=crop",
    category: "Tech"
  },
  {
    id: 6,
    creator: "@RohanGlow",
    avatarLetter: "R",
    avatarColor: "bg-teal-600",
    streamTitle: "Hydrating Skincare Serums Tested Live",
    imageUrl: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=400&auto=format&fit=crop",
    viewerCount: "2.4K",
    likes: "4.2K",
    productName: "Glow Serum",
    productDiscount: "30% off",
    productPrice: "₹1,499",
    productImageUrl: "https://images.unsplash.com/photo-1601049676099-e7ed07d825b0?q=80&w=150&auto=format&fit=crop",
    category: "Beauty"
  }
];

export default function Home() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Raw mouse coordinates (for the instant inner dot)
  const rawX = useSpring(mouseX, { stiffness: 1000, damping: 50 });
  const rawY = useSpring(mouseY, { stiffness: 1000, damping: 50 });

  // Spring lagging coordinates (for the outer trailing ring)
  const springX = useSpring(mouseX, { stiffness: 220, damping: 24 });
  const springY = useSpring(mouseY, { stiffness: 220, damping: 24 });

  const [isHoveringHeroText, setIsHoveringHeroText] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<"All" | "Beauty" | "Fashion" | "Tech">("All");
  const [isStyleMatchOpen, setIsStyleMatchOpen] = useState(false);

  const filteredStreams = LIVE_STREAMS_DATA.filter((stream) => {
    if (selectedCategory === "All") return true;
    return stream.category === selectedCategory;
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      // Set raw mouse values (centering handled by translate(-50%, -50%))
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.group') ||
        target.closest('[role="button"]')
      ) {
        setIsHoveringInteractive(true);
      } else {
        setIsHoveringInteractive(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  // Adjust third-party chatbot icon and box positioning in DOM
  useEffect(() => {
    // Inject floating keyframes CSS styles
    const chatbotStyle = document.createElement("style");
    chatbotStyle.id = "chatbot-floating-styles";
    chatbotStyle.innerHTML = `
      @keyframes chatbotFloat {
        0%, 100% {
          transform: translateY(0px) scale(1);
        }
        50% {
          transform: translateY(-8px) scale(1.02);
        }
      }
      .chatbot-floating-bubble {
        animation: chatbotFloat 3.5s ease-in-out infinite !important;
        transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease !important;
      }
      .chatbot-floating-bubble:hover {
        animation-play-state: paused !important;
        transform: translateY(-4px) scale(1.06) !important;
        box-shadow: 0 16px 35px rgba(139, 92, 246, 0.65), inset 0 2px 6px rgba(255, 255, 255, 0.3) !important;
        border-color: rgba(255, 255, 255, 0.35) !important;
      }
    `;
    document.head.appendChild(chatbotStyle);

    const adjustChatbot = () => {
      let buttonAdjusted = false;
      let boxAdjusted = false;

      const divs = document.querySelectorAll("body > div");
      divs.forEach((div) => {
        const el = div as HTMLElement;
        
        // Match the floating chat button containing the message emoji
        if (el.innerHTML === "💬" && el.style.position === "fixed") {
          el.style.width = "74px";
          el.style.height = "74px";
          el.style.fontSize = "32px";
          el.style.bottom = "24px";
          el.style.right = "24px";
          el.style.background = "linear-gradient(135deg, #4F3FF0 0%, #8B5CF6 100%)";
          el.style.border = "1px solid rgba(255, 255, 255, 0.12)";
          el.style.borderRadius = "50%";
          el.style.display = "flex";
          el.style.alignItems = "center";
          el.style.justifyContent = "center";
          el.style.boxShadow = "0 10px 25px rgba(79, 63, 240, 0.45), inset 0 2px 4px rgba(255, 255, 255, 0.15)";
          el.style.cursor = "pointer";
          
          el.classList.add("chatbot-floating-bubble");
          buttonAdjusted = true;
        }
      });

      // Match the chat window to shift it above the larger button
      const messages = document.querySelector("#chat-messages");
      if (messages && messages.parentElement) {
        const box = messages.parentElement as HTMLElement;
        box.style.bottom = "112px";
        boxAdjusted = true;
      }

      return buttonAdjusted && boxAdjusted;
    };

    const interval = setInterval(() => {
      const done = adjustChatbot();
      if (done) {
        clearInterval(interval);
      }
    }, 100);

    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 6000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      const styleNode = document.getElementById("chatbot-floating-styles");
      if (styleNode) styleNode.remove();
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-zinc-950 text-white font-sans overflow-x-hidden selection:bg-violet-500/30 selection:text-violet-200">
      
      {/* Background Mesh Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-600/5 blur-[120px] animate-pulse duration-[10s]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-fuchsia-600/5 blur-[120px] animate-pulse duration-[8s]" />
        <div className="absolute top-[40%] left-[20%] w-[40%] h-[40%] rounded-full bg-blue-600/5 blur-[100px]" />
        
        {/* Subtle grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"
        />
      </div>

      {/* Global Animated Header Navbar with Custom Options */}
      <HeaderNavbar />
      
      <main className="relative z-10 w-full flex flex-col items-center bg-[#050508] rounded-b-[45px] shadow-[0_20px_50px_rgba(0,0,0,0.95)] border-b border-white/[0.04]">
        
        {/* Hero Copy (using Stagger Animations) */}
        <ContainerStagger animate="visible" whileInView={undefined} className="relative z-20 place-self-center px-6 pt-36 pb-8 text-center flex flex-col items-center max-w-4xl gap-6">
          
          {/* Pulse "LIVE NOW" Badge */}
          <ContainerAnimated className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/35 bg-red-500/10 text-[10px] tracking-wider font-extrabold text-red-400 uppercase select-none shadow-[0_0_15px_rgba(239,68,68,0.2)] animate-pulse">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span>Live Now: Summer Streetwear Drop</span>
          </ContainerAnimated>

          {/* Killer Tagline with Inverted Cursor Trigger */}
          <div
            onMouseEnter={() => setIsHoveringHeroText(true)}
            onMouseLeave={() => setIsHoveringHeroText(false)}
            className={`transition-all duration-300 ${
              isHoveringHeroText ? "cursor-none" : ""
            }`}
          >
            <ContainerAnimated>
              <h1 className="text-4xl sm:text-7xl font-black tracking-tight leading-[1.1] text-zinc-100 font-spray">
                Shopping Is{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-300 to-pink-400">
                  Alive
                </span>
              </h1>
              <h1 className="text-3xl sm:text-6xl font-light tracking-tight text-zinc-400 mt-2 font-spray">
                Watch. Chat. Buy Instantly.
              </h1>
            </ContainerAnimated>
          </div>

          {/* Core Subtitle */}
          <ContainerAnimated className="max-w-2xl mt-1">
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-semibold tracking-wide max-w-xl mx-auto drop-shadow-sm font-space">
              Welcome to the future of retail. Watch real-time product streams, interact live with curators, bid on exclusive limited drops, and check out instantly without missing a second.
            </p>
          </ContainerAnimated>

          {/* Custom CTA Buttons */}
          <ContainerAnimated className="flex flex-col sm:flex-row items-center gap-4 mt-3">
            
            {/* Tune In Live */}
            <Button className="h-12 px-7 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 hover:brightness-110 text-white font-bold uppercase tracking-wider text-xs flex items-center gap-2 shadow-[0_4px_25px_rgba(168,85,247,0.35)] border border-violet-400/20 active:scale-95 hover:scale-105 transition-all duration-300">
              <div className="relative flex items-center justify-center mr-1">
                <Radio className="w-4 h-4 text-white animate-pulse" />
                <span className="absolute -top-0.5 -right-0.5 flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                </span>
              </div>
              Tune In Live
            </Button>
            
            {/* Browse Drops */}
            <Button variant="outline" className="h-12 px-7 rounded-full border-white/10 hover:border-violet-500/50 bg-white/5 hover:bg-white/10 text-zinc-200 hover:text-white font-bold uppercase tracking-wider text-xs flex items-center gap-2 active:scale-95 hover:scale-105 transition-all duration-300">
              <Sparkles className="w-4 h-4 text-fuchsia-400 animate-pulse" />
              Browse Drops 
              <ArrowRight className="w-4 h-4" />
            </Button>

          </ContainerAnimated>

        </ContainerStagger>

        {/* Ambient background glow below text */}
        <div className="pointer-events-none absolute top-[20vh] z-10 h-[60vh] w-full"
          style={{
            background: "radial-gradient(circle at center, rgba(168,85,247,0.1), transparent 60%)",
            filter: "blur(60px)",
            mixBlendMode: "screen",
          }}
        />

        {/* Scrolling 3D perspective Gallery Grid - Expanded Full-Width look */}
        <ContainerScroll className="relative w-full max-w-7xl px-4 sm:px-8 md:px-12 h-[140vh]">
          <ContainerSticky className="h-screen flex items-center justify-center">
            <GalleryContainer className="max-h-[85vh] w-full rounded-3xl border border-white/[0.08] bg-zinc-950/40 p-4 md:p-6 gap-4 md:gap-6 backdrop-blur-xl shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
              
              {/* Left Column: slides upwards slowly */}
              <GalleryCol yRange={["-12%", "3%"]} className="-mt-3 gap-4 md:gap-6">
                {COMMERCE_COL_1.map((item, index) => (
                  <div key={index} className="relative group overflow-hidden rounded-2xl border border-white/[0.05] shadow-lg aspect-video w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="block h-full w-full object-cover transition-transform duration-750 ease-out group-hover:scale-105"
                      src={item.url}
                      alt={item.title}
                    />
                    {/* Glassmorphic Sliding Info Overlay */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 flex flex-col gap-1 text-left">
                        <span className="text-[9px] font-black uppercase tracking-widest text-violet-400">{item.category}</span>
                        <h4 className="text-xs sm:text-sm font-bold text-white tracking-wide leading-tight">{item.title}</h4>
                        <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-black uppercase tracking-wider text-[8px] w-fit shadow-md transition-all active:scale-95 duration-200 select-none">
                          <ShoppingBag className="w-3 h-3 text-violet-600" /> View Drop
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </GalleryCol>

              {/* Center Column: slides downwards slowly */}
              <GalleryCol className="mt-[-25%] gap-4 md:gap-6 animate-none" yRange={["10%", "-5%"]}>
                {COMMERCE_COL_2.map((item, index) => (
                  <div key={index} className="relative group overflow-hidden rounded-2xl border border-white/[0.05] shadow-lg aspect-video w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="block h-full w-full object-cover transition-transform duration-750 ease-out group-hover:scale-105"
                      src={item.url}
                      alt={item.title}
                    />
                    {/* Glassmorphic Sliding Info Overlay */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 flex flex-col gap-1 text-left">
                        <span className="text-[9px] font-black uppercase tracking-widest text-violet-400">{item.category}</span>
                        <h4 className="text-xs sm:text-sm font-bold text-white tracking-wide leading-tight">{item.title}</h4>
                        <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-black uppercase tracking-wider text-[8px] w-fit shadow-md transition-all active:scale-95 duration-200 select-none">
                          <ShoppingBag className="w-3 h-3 text-violet-600" /> View Drop
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </GalleryCol>

              {/* Right Column: slides upwards slowly */}
              <GalleryCol yRange={["-12%", "3%"]} className="-mt-3 gap-4 md:gap-6">
                {COMMERCE_COL_3.map((item, index) => (
                  <div key={index} className="relative group overflow-hidden rounded-2xl border border-white/[0.05] shadow-lg aspect-video w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="block h-full w-full object-cover transition-transform duration-750 ease-out group-hover:scale-105"
                      src={item.url}
                      alt={item.title}
                    />
                    {/* Glassmorphic Sliding Info Overlay */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 flex flex-col gap-1 text-left">
                        <span className="text-[9px] font-black uppercase tracking-widest text-violet-400">{item.category}</span>
                        <h4 className="text-xs sm:text-sm font-bold text-white tracking-wide leading-tight">{item.title}</h4>
                        <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-black uppercase tracking-wider text-[8px] w-fit shadow-md transition-all active:scale-95 duration-200 select-none">
                          <ShoppingBag className="w-3 h-3 text-violet-600" /> View Drop
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </GalleryCol>

            </GalleryContainer>
          </ContainerSticky>
        </ContainerScroll>

        {/* Trending Products 3D Carousel Section */}
        <section id="products-section" className="relative z-20 w-full max-w-7xl px-6 -mt-40 pb-20 mx-auto flex flex-col items-center gap-12 text-center overflow-hidden">
          {/* Subtle lighting blob */}
          <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[60%] h-[40%] rounded-full bg-violet-600/10 blur-[80px] pointer-events-none -z-10" />

          {/* Heading */}
          <div className="flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/5 text-xs font-semibold text-violet-300 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
              <span>Hot Drops</span>
            </div>
            <h2 className="text-3xl sm:text-6xl font-black tracking-tight text-zinc-100 font-spray">
              Trending Products
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-md mt-1 font-space font-semibold">
              Active limited drops selling fast across our live network streams. Swipe or navigate to explore the gear.
            </p>
          </div>

          {/* 3D Stack Component */}
          <CardStack />
        </section>

        {/* Happening Live Streams Section (GlassCard Style 3D Parallax Tilt) */}
        <section id="live-section" className="relative z-20 w-full max-w-7xl px-6 py-20 mx-auto flex flex-col items-center gap-10 text-center overflow-hidden">
          {/* Subtle fuchsia glow */}
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[70%] h-[50%] rounded-full bg-fuchsia-600/5 blur-[100px] pointer-events-none -z-10" />

          {/* Section Heading */}
          <div className="flex flex-col items-center gap-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/25 bg-red-500/10 text-xs font-semibold text-red-400 uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span>Happening Live</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-100 font-spray">
              Don't just watch. Shop the moment.
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm font-semibold tracking-wide mt-1 font-space">
              7 streams live &bull; 38.5K watching now
            </p>
          </div>

          {/* Filters Row */}
          <div className="flex items-center justify-center gap-3 font-space">
            {["All", "Beauty", "Fashion", "Tech"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat as any)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer active:scale-95 ${
                  selectedCategory === cat
                    ? "bg-white text-black border-white shadow-md font-extrabold"
                    : "bg-zinc-950 text-zinc-400 border-white/10 hover:border-white/20 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Live Streams Cards Grid */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-4">
            {filteredStreams.map((stream) => (
              <LiveStreamCard
                key={stream.id}
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
            ))}
          </div>

          {/* Slide Navigator Details */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex gap-2">
              <span className="w-6 h-1.5 rounded-full bg-violet-600"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-700"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-700"></span>
            </div>
            {/* Navigation buttons */}
            <div className="flex gap-2 font-space">
              <button className="w-10 h-10 rounded-full border border-white/10 bg-zinc-950/60 flex items-center justify-center text-zinc-400 hover:text-white hover:border-violet-500/50 cursor-pointer active:scale-90 transition-all">
                &larr;
              </button>
              <button className="w-10 h-10 rounded-full border border-white/10 bg-zinc-950/60 flex items-center justify-center text-zinc-400 hover:text-white hover:border-violet-500/50 cursor-pointer active:scale-90 transition-all">
                &rarr;
              </button>
            </div>
          </div>
        </section>

        {/* Staggered Testimonials Section */}
        <StaggerTestimonials />

        {/* Your Live Persona Interactive Quiz Section (Second-Last Section before Footer) */}
        <LivePersonaSection liveStreams={LIVE_STREAMS_DATA} />

        {/* Redesigned Centered AI Style Match Banner Section */}
        <div className="w-full max-w-4xl mx-auto px-6 py-12 flex flex-col items-center justify-center text-center relative z-30 mt-10 mb-14 overflow-hidden">
          {/* Subtle fuchsia/violet glow blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-violet-600/5 blur-[80px] pointer-events-none -z-10" />

          {/* Floating Gradient Camera Circle */}
          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            onClick={() => setIsStyleMatchOpen(true)}
            className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-violet-600 to-fuchsia-600 text-white shadow-[0_4px_25px_rgba(139,92,246,0.35)] hover:shadow-[0_4px_30px_rgba(139,92,246,0.5)] transition-shadow duration-300 mb-5 cursor-pointer active:scale-95 duration-200"
          >
            <Camera className="w-6 h-6 stroke-[2] drop-shadow-[0_2px_8px_rgba(255,255,255,0.2)]" />
          </motion.div>

          {/* Centered tagline in main hero spray font */}
          <h3 className="text-3xl sm:text-5xl font-black text-zinc-100 uppercase tracking-widest font-spray leading-none mb-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Scan Your Look
          </h3>
          
          <p className="text-zinc-400 text-xs sm:text-sm font-semibold tracking-wide max-w-md font-space leading-relaxed mb-6">
            Match live curation channels to your personal look instantly. Upload an outfit snapshot or portrait to align the streams.
          </p>

          {/* Trigger Button */}
          <button
            onClick={() => setIsStyleMatchOpen(true)}
            className="h-10 px-8 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 text-white font-black text-xs font-space uppercase tracking-widest transition-all active:scale-95 duration-200 cursor-pointer shadow-[0_4px_20px_rgba(168,85,247,0.35)] hover:brightness-110 flex items-center justify-center font-space"
          >
            TRY IT NOW &rarr;
          </button>
        </div>
      </main>

      {/* Cinematic Reveal Footer */}
      <SiteFooter />

      {/* AI Style Match Modal Overlay */}
      <AnimatePresence>
        {isStyleMatchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050508]/92 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="w-full max-w-[400px]"
            >
              <AIStyleMatch 
                liveStreams={LIVE_STREAMS_DATA} 
                onClose={() => setIsStyleMatchOpen(false)} 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Animated Cursor Follower (Hidden on Mobile) */}
      {!isMobile && (
        <>
          {/* Outer Trailing Lagging Ring */}
          <motion.div
            style={{
              x: springX,
              y: springY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={{
              scale: isHoveringInteractive ? 1.5 : 1,
              borderColor: isHoveringInteractive ? "#f434e2" : "rgba(139, 92, 246, 0.4)",
              backgroundColor: isHoveringInteractive ? "rgba(139, 92, 246, 0.05)" : "rgba(0, 0, 0, 0)",
            }}
            transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
            className="pointer-events-none fixed top-0 left-0 w-9 h-9 rounded-full border border-violet-500/40 z-[99998] shadow-sm mix-blend-screen"
          />

          {/* Inner Sharp Tracking Dot */}
          <motion.div
            style={{
              x: rawX,
              y: rawY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={{
              scale: isHoveringInteractive ? 1.4 : 1,
              backgroundColor: isHoveringInteractive ? "#f434e2" : "#8B5CF6",
            }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.15 }}
            className="pointer-events-none fixed top-0 left-0 w-2 h-2 rounded-full z-[99999] shadow-[0_0_10px_rgba(139,92,246,0.6)]"
          />
        </>
      )}
    </div>
  );
}
