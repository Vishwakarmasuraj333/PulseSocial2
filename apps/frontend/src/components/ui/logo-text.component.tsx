'use client';

import React from 'react';
import Link from 'next/link';

export const LogoTextComponent = () => {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981] rounded-xl p-1"
      aria-label="PulseSocial Home"
    >
      <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#0b0f17] border border-[#10b981]/40 group-hover:border-[#10b981] shadow-md shadow-[#059669]/15 transition-all duration-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 36 36"
          className="w-7 h-7"
          fill="none"
        >
          <defs>
            <linearGradient id="ltcPulse" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <line x1="4" y1="18" x2="32" y2="18" stroke="#334155" strokeWidth="1" strokeDasharray="2 2" opacity="0.6"/>
          <path
            d="M5 18h5l3-5 3 10 3-13 4 15 3-7h5"
            stroke="url(#ltcPulse)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="19" cy="5" r="2" fill="#10b981" stroke="#ffffff" strokeWidth="0.8" />
          <circle cx="28" cy="18" r="2" fill="#10b981" />
        </svg>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center text-[22px] font-bold tracking-tight leading-none text-white">
          <span className="text-[#10b981]">Pulse</span>
          <span className="text-white">Social</span>
        </div>
        <span className="text-[10px] uppercase font-semibold tracking-wider text-[#94a3b8] mt-1 leading-none">
          Pulse Media Global
        </span>
      </div>
    </Link>
  );
};
