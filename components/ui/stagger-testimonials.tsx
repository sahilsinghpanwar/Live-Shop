"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonial: "My favorite solution in the market. We work 5x faster with NOVA.",
    by: "Alex",
    role: "CEO at TechCorp",
    imgSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
  },
  {
    tempId: 1,
    testimonial: "I'm confident my data is safe with NOVA. I can't say that about other providers.",
    by: "Dan",
    role: "CTO at SecureNet",
    imgSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
  },
  {
    tempId: 2,
    testimonial: "I know it's cliche, but we were lost before we found NOVA. Can't thank you guys enough!",
    by: "Stephanie",
    role: "COO at InnovateCo",
    imgSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
  },
  {
    tempId: 3,
    testimonial: "NOVA's products make planning for the future seamless. Can't recommend them enough!",
    by: "Marie",
    role: "CFO at FuturePlanning",
    imgSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop"
  },
  {
    tempId: 4,
    testimonial: "If I could give 11 stars, I'd give 12.",
    by: "Andre",
    role: "Head of Design at CreativeSolutions",
    imgSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
  },
  {
    tempId: 5,
    testimonial: "SO SO SO HAPPY WE FOUND YOU GUYS!!!! I'd bet you've saved me 100 hours so far.",
    by: "Jeremy",
    role: "Product Manager at TimeWise",
    imgSrc: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&auto=format&fit=crop"
  },
  {
    tempId: 6,
    testimonial: "Took some convincing, but now that we're on NOVA, we're never going back.",
    by: "Pam",
    role: "Marketing Director at BrandBuilders",
    imgSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop"
  },
  {
    tempId: 7,
    testimonial: "I would be lost without NOVA's in-depth analytics. The ROI is EASILY 100X for us.",
    by: "Daniel",
    role: "Data Scientist at AnalyticsPro",
    imgSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop"
  },
  {
    tempId: 8,
    testimonial: "It's just the best. Period.",
    by: "Fernando",
    role: "UX Designer at UserFirst",
    imgSrc: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150&auto=format&fit=crop"
  },
  {
    tempId: 9,
    testimonial: "I switched 5 years ago and never looked back.",
    by: "Andy",
    role: "DevOps Engineer at CloudMasters",
    imgSrc: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=150&auto=format&fit=crop"
  },
  {
    tempId: 10,
    testimonial: "I've been searching for a solution like NOVA for YEARS. So glad I finally found one!",
    by: "Pete",
    role: "Sales Director at RevenueRockets",
    imgSrc: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop"
  },
  {
    tempId: 11,
    testimonial: "It's so simple and intuitive, we got the team up to speed in 10 minutes.",
    by: "Andy",
    role: "HR Manager at TalentForge",
    imgSrc: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop"
  },
  {
    tempId: 12,
    testimonial: "NOVA's customer support is unparalleled. They're always there when we need them.",
    by: "Olivia",
    role: "Customer Success Manager at ClientCare",
    imgSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop"
  },
  {
    tempId: 13,
    testimonial: "The efficiency gains we've seen since implementing NOVA are off the charts!",
    by: "Raj",
    role: "Operations Manager at StreamlineSolutions",
    imgSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop"
  },
  {
    tempId: 14,
    testimonial: "NOVA has revolutionized how we handle our workflow. It's a game-changer!",
    by: "Lila",
    role: "Workflow Specialist at ProcessPro",
    imgSrc: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=150&auto=format&fit=crop"
  },
  {
    tempId: 15,
    testimonial: "The scalability of NOVA's solution is impressive. It grows with our business seamlessly.",
    by: "Trevor",
    role: "Scaling Officer at GrowthGurus",
    imgSrc: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=150&auto=format&fit=crop"
  },
  {
    tempId: 16,
    testimonial: "I appreciate how NOVA continually innovates. They're always one step ahead.",
    by: "Naomi",
    role: "Innovation Lead at FutureTech",
    imgSrc: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=150&auto=format&fit=crop"
  },
  {
    tempId: 17,
    testimonial: "The ROI we've seen with NOVA is incredible. It's paid for itself many times over.",
    by: "Victor",
    role: "Finance Analyst at ProfitPeak",
    imgSrc: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=150&auto=format&fit=crop"
  },
  {
    tempId: 18,
    testimonial: "NOVA's platform is so robust, yet easy to use. It's the perfect balance.",
    by: "Yuki",
    role: "Tech Lead at BalancedTech",
    imgSrc: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop"
  },
  {
    tempId: 19,
    testimonial: "We've tried many solutions, but NOVA stands out in terms of reliability and performance.",
    by: "Zoe",
    role: "Performance Manager at ReliableSystems",
    imgSrc: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=150&auto=format&fit=crop"
  }
];

interface TestimonialCardProps {
  position: number;
  testimonial: typeof testimonials[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  position, 
  testimonial, 
  handleMove, 
  cardSize 
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out select-none text-left flex flex-col justify-between",
        isCenter 
          ? "z-10 bg-gradient-to-br from-[#120f30]/90 to-[#080718]/95 border-violet-500/80 shadow-[0_15px_40px_rgba(139,92,246,0.25)] opacity-100" 
          : "z-0 bg-zinc-950/60 text-zinc-400 border-white/5 opacity-10 sm:opacity-30 hover:opacity-60 hover:border-white/10"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / (cardSize < 300 ? 2.8 : 1.5)) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 30px rgba(139,92,246,0.3)" : "0px 0px 0px 0px transparent"
      }}
    >
      {/* Decorative Diagonal Line in Clipped Corner */}
      <span
        className="absolute block origin-top-right rotate-45 bg-white/10"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 1.5
        }}
      />

      <div className="flex flex-col gap-4">
        {/* Glowing Profile Avatar */}
        <div className="relative w-fit h-fit">
          <img
            src={testimonial.imgSrc}
            alt={testimonial.by}
            className={cn(
              "h-14 w-12 object-cover object-top border",
              isCenter ? "border-violet-500/50 shadow-[0_0_12px_rgba(139,92,246,0.3)]" : "border-white/5"
            )}
            style={{
              clipPath: `polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)`
            }}
          />
        </div>

        {/* Testimonial Quote text */}
        <h3 className={cn(
          "text-base sm:text-[18px] font-semibold leading-relaxed tracking-wide font-space transition-colors duration-300",
          isCenter ? "text-white" : "text-zinc-400"
        )}>
          &ldquo;{testimonial.testimonial}&rdquo;
        </h3>
      </div>

      {/* Author & Signature details */}
      <div className="flex flex-col gap-0.5 mt-4">
        <span className={cn(
          "text-[10px] font-bold font-jetbrains tracking-widest uppercase transition-colors duration-300",
          isCenter ? "text-violet-400" : "text-zinc-500"
        )}>
          {testimonial.by}
        </span>
        <span className={cn(
          "text-[12px] font-semibold font-space transition-colors duration-300",
          isCenter ? "text-zinc-400" : "text-zinc-600"
        )}>
          {testimonial.role}
        </span>
      </div>

    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-transparent border-y border-white/[0.04] py-8 flex flex-col items-center justify-center"
      style={{ height: 620 }}
    >
      {/* Background Radial Light Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none -z-10" />

      {/* Cards stack track container */}
      <div className="relative w-full h-[450px] flex items-center justify-center mt-[-30px]">
        {testimonialsList.map((testimonial, index) => {
          const position = testimonialsList.length % 2
            ? index - (testimonialsList.length + 1) / 2
            : index - testimonialsList.length / 2;
          return (
            <TestimonialCard
              key={testimonial.tempId}
              testimonial={testimonial}
              handleMove={handleMove}
              position={position}
              cardSize={cardSize}
            />
          );
        })}
      </div>

      {/* Sliding Control Arrows underneath */}
      <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-3.5 z-20">
        <button
          onClick={() => handleMove(-1)}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-zinc-950/60 hover:bg-zinc-900 text-zinc-400 hover:text-white cursor-pointer hover:border-violet-500/50 active:scale-90 transition-all shadow-[0_4px_15px_rgba(0,0,0,0.4)]"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleMove(1)}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-zinc-950/60 hover:bg-zinc-900 text-zinc-400 hover:text-white cursor-pointer hover:border-violet-500/50 active:scale-90 transition-all shadow-[0_4px_15px_rgba(0,0,0,0.4)]"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
