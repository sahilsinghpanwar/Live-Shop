"use client";

import React, { useState } from "react";
import { Copy, Link, Check, Share2, X, Download } from "lucide-react";
import html2canvas from "html2canvas";
import { Persona } from "../../types/persona";

interface PersonaShareBtnProps {
  persona: Persona;
  cardRef: React.RefObject<HTMLDivElement | null>;
}

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.37 5.013L2 22l5.13-1.346a9.923 9.923 0 0 0 4.881 1.28h.005c5.505 0 9.989-4.478 9.99-9.985a9.972 9.972 0 0 0-2.926-7.064A9.929 9.929 0 0 0 12.012 2zm5.72 13.918c-.246.696-1.427 1.272-1.968 1.344-.492.066-1.127.115-3.284-.775-2.756-1.137-4.526-3.924-4.664-4.108-.137-.184-1.12-1.488-1.12-2.836 0-1.348.706-2.012.956-2.274.25-.262.543-.328.722-.328.179 0 .359.002.516.01.164.008.385-.062.602.46.223.534.762 1.854.828 1.986.066.13.11.284.022.46-.088.175-.132.304-.263.46-.131.153-.275.34-.393.456-.131.12-.269.252-.116.514.153.263.682 1.123 1.46 1.815.998.89 1.836 1.165 2.098 1.296.262.13.415.109.57-.07.153-.18.656-.762.831-1.023.175-.262.35-.219.59-.13.24.088 1.53.722 1.793.853.262.13.438.196.504.306.066.11.066.634-.18 1.33z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export function PersonaShareBtn({ persona, cardRef }: PersonaShareBtnProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://novalive.net";
  const shareUrl = `${siteUrl}/persona?result=${persona.id}`;
  const shareText = `I got ${persona.emoji} ${persona.title} on Nova! What's your Live Shopper Persona? Find out here:`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link", err);
    }
  };

  const handleWhatsAppShare = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + shareUrl)}`;
    window.open(waUrl, "_blank");
  };

  const handleDownloadPNG = async () => {
    if (!cardRef.current) return;
    setExporting(true);
    setToastMessage("Generating card PNG...");

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 3, // Premium ultra-high quality export
        useCORS: true,
        logging: false
      });

      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `${persona.id}-persona.png`;
      link.href = dataUrl;
      link.click();

      setToastMessage("Saved! Share to your story 📱");
      setTimeout(() => setToastMessage(null), 3000);
    } catch (err) {
      console.error("Canvas export failed", err);
      setToastMessage("Export failed. Try again!");
      setTimeout(() => setToastMessage(null), 3000);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="relative">
      {/* Share Button (renders outside result card) */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-11 h-11 rounded-full border border-white/15 bg-zinc-900/60 hover:bg-zinc-900 flex items-center justify-center text-white/50 hover:text-white cursor-pointer transition-all hover:border-white/30 active:scale-95 duration-200"
      >
        <Share2 className="w-4 h-4" />
      </button>

      {/* Modal / Bottom Sheet */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-[280px] bg-[#0d0d14] border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col items-center text-center">
            
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-zinc-500 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h4 className="text-xs font-semibold text-white/60 tracking-wider uppercase font-space mb-4">
              Share your persona
            </h4>

            {/* Icons Row */}
            <div className="flex gap-4 mb-4">
              {/* WhatsApp */}
              <button
                onClick={handleWhatsAppShare}
                className="w-12 h-12 rounded-full bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-500 border border-emerald-600/20 flex items-center justify-center cursor-pointer transition-all active:scale-90"
                title="WhatsApp Share"
              >
                <WhatsAppIcon className="w-6 h-6" />
              </button>

              {/* Instagram Story (PNG Download) */}
              <button
                onClick={handleDownloadPNG}
                disabled={exporting}
                className="w-12 h-12 rounded-full bg-pink-600/10 hover:bg-pink-600/20 text-pink-500 border border-pink-600/20 flex items-center justify-center cursor-pointer transition-all active:scale-90 disabled:opacity-40 disabled:pointer-events-none"
                title="Save as PNG"
              >
                {exporting ? (
                  <div className="w-5 h-5 rounded-full border-2 border-pink-500 border-t-transparent animate-spin" />
                ) : (
                  <InstagramIcon className="w-5 h-5" />
                )}
              </button>

              {/* Copy Link */}
              <button
                onClick={handleCopyLink}
                className="w-12 h-12 rounded-full bg-violet-600/10 hover:bg-violet-600/20 text-violet-500 border border-violet-600/20 flex items-center justify-center cursor-pointer transition-all active:scale-90 relative"
                title="Copy Link"
              >
                {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>

            {/* Notification Text */}
            <div className="h-6">
              {toastMessage && (
                <span className="text-[10px] text-zinc-300 font-bold uppercase tracking-wider font-jetbrains animate-pulse">
                  {toastMessage}
                </span>
              )}
              {copied && !toastMessage && (
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider font-jetbrains">
                  Link copied!
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
