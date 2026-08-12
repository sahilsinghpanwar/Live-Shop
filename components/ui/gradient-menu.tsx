"use client";

import React from 'react';
import { Home, Radio, ShoppingBag, ShoppingCart } from 'lucide-react';

const menuItems = [
  { title: 'Home', icon: <Home className="w-[22px] h-[22px]" />, gradientFrom: '#a955ff', gradientTo: '#ea51ff' },
  { title: 'Live', icon: <Radio className="w-[22px] h-[22px]" />, gradientFrom: '#FF5E62', gradientTo: '#FF9966' },
  { title: 'Products', icon: <ShoppingBag className="w-[22px] h-[22px]" />, gradientFrom: '#56CCF2', gradientTo: '#2F80ED' },
  { title: 'Cart', icon: <ShoppingCart className="w-[22px] h-[22px]" />, gradientFrom: '#80FF72', gradientTo: '#7EE8FA' }
];

export default function GradientMenu() {
  const handleNavigation = (title: string) => {
    if (title === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (title === 'Live') {
      const liveSec = document.getElementById('live-section');
      if (liveSec) {
        liveSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (title === 'Products') {
      const prodSec = document.getElementById('products-section');
      if (prodSec) {
        prodSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (title === 'Cart') {
      alert("🛒 Your ShopBag Cart is currently empty! Tap on the checkout buttons in live streams or product cards to add drops.");
    }
  };

  return (
    <ul className="flex gap-4 items-center">
      {menuItems.map(({ title, icon, gradientFrom, gradientTo }, idx) => (
        <li
          key={idx}
          onClick={() => handleNavigation(title)}
          style={{
            '--gradient-from': gradientFrom,
            '--gradient-to': gradientTo
          } as React.CSSProperties}
          className="relative w-[50px] h-[50px] bg-white dark:bg-zinc-900 shadow-md rounded-full flex items-center justify-center transition-all duration-500 hover:w-[150px] hover:shadow-none group cursor-pointer border border-zinc-200/50 dark:border-zinc-800/50"
        >
          {/* Gradient background on hover */}
          <span className="absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] opacity-0 transition-all duration-500 group-hover:opacity-100"></span>
          
          {/* Blur glow behind */}
          <span className="absolute top-[8px] inset-x-0 h-full rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] blur-[12px] opacity-0 -z-10 transition-all duration-500 group-hover:opacity-60"></span>

          {/* Icon wrapper */}
          <span className="relative z-10 transition-all duration-500 group-hover:scale-0 delay-0 flex items-center justify-center text-zinc-500 dark:text-zinc-400">
            {icon}
          </span>

          {/* Title */}
          <span className="absolute text-white uppercase tracking-wider text-xs font-black transition-all duration-500 scale-0 group-hover:scale-100 delay-150">
            {title}
          </span>
        </li>
      ))}
    </ul>
  );
}
