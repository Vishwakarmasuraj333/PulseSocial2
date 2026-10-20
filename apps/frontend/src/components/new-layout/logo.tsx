'use client';

import React from 'react';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Link
      href="/launches"
      className="group relative flex items-center justify-center w-[54px] h-[54px] rounded-[16px] bg-gradient-to-br from-[#0f172a] to-[#020617] border border-[#10b981]/30 hover:border-[#10b981] shadow-lg shadow-[#059669]/10 transition-all duration-300 hover:scale-105"
      aria-label="PulseSocial Dashboard"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        className="w-[36px] h-[36px]"
        fill="none"
      >
        <defs>
          <linearGradient id="sidebarPulse" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <radialGradient id="pulseCenterGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="24" cy="24" r="18" fill="url(#pulseCenterGlow)" />
        {/* Subtle grid axis */}
        <line x1="8" y1="24" x2="40" y2="24" stroke="#334155" strokeWidth="1" strokeDasharray="2 2" opacity="0.6"/>
        {/* Rhythm Waveform */}
        <path
          d="M8 24h6l3-6 4 12 4-15 4 18 3-9h8"
          stroke="url(#sidebarPulse)"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Signal Broadcast Nodes */}
        <circle cx="25" cy="9" r="2.2" fill="#34d399" />
        <circle cx="37" cy="24" r="2.4" fill="#10b981" stroke="#34d399" strokeWidth="1" />
        <circle cx="37" cy="24" r="5" stroke="#10b981" strokeWidth="0.8" opacity="0.6" className="animate-ping" style={{ transformOrigin: '37px 24px' }} />
      </svg>
    </Link>
  );
};
