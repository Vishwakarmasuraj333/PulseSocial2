'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const PLATFORMS = [
  { name: 'X / Twitter', icon: '/icons/platforms/x.png', color: '#000000', tag: 'Direct API' },
  { name: 'Instagram', icon: '/icons/platforms/instagram.png', color: '#E1306C', tag: 'Reels & Carousel' },
  { name: 'LinkedIn', icon: '/icons/platforms/linkedin.png', color: '#0A66C2', tag: 'B2B & PDF' },
  { name: 'YouTube', icon: '/icons/platforms/youtube.png', color: '#FF0000', tag: 'Shorts & Long' },
  { name: 'TikTok', icon: '/icons/platforms/tiktok.png', color: '#000000', tag: 'Trending Sound' },
  { name: 'Threads', icon: '/icons/platforms/threads.png', color: '#101010', tag: 'Auto-Sync' },
  { name: 'Bluesky', icon: '/icons/platforms/bluesky.png', color: '#0085FF', tag: 'AT Protocol' },
  { name: 'Pinterest', icon: '/icons/platforms/pinterest.png', color: '#BD081C', tag: 'Rich Pins' },
  { name: 'Reddit', icon: '/icons/platforms/reddit.png', color: '#FF4500', tag: 'Subreddits' },
  { name: 'Facebook', icon: '/icons/platforms/facebook.png', color: '#1877F2', tag: 'Pages & Groups' },
  { name: 'Telegram', icon: '/icons/platforms/telegram.png', color: '#229ED9', tag: 'Channels & Bots' },
  { name: 'Discord', icon: '/icons/platforms/discord.png', color: '#5865F2', tag: 'Webhooks' },
  { name: 'Mastodon', icon: '/icons/platforms/mastodon.png', color: '#6364FF', tag: 'Fediverse' },
  { name: 'Dribbble', icon: '/icons/platforms/dribbble.png', color: '#EA4C89', tag: 'Creative Shots' },
  { name: 'Medium', icon: '/icons/platforms/medium.png', color: '#12100E', tag: 'Long Reads' },
  { name: 'Dev.to', icon: '/icons/platforms/devto.png', color: '#0A0A0A', tag: 'Developer Posts' },
  { name: 'Hashnode', icon: '/icons/platforms/hashnode.png', color: '#2962FF', tag: 'Tech Blogs' },
  { name: 'WordPress', icon: '/icons/platforms/wordpress.png', color: '#21759B', tag: 'CMS Sync' },
  { name: 'Ghost', icon: '/icons/platforms/wordpress.png', color: '#15171A', tag: 'Newsletters' },
  { name: 'Twitch', icon: '/icons/platforms/twitch.png', color: '#9146FF', tag: 'Stream Feed' },
  { name: 'Google Business', icon: '/icons/platforms/gmb.png', color: '#4285F4', tag: 'Local SEO' },
  { name: 'Whop', icon: '/icons/platforms/whop.png', color: '#FF6243', tag: 'Commerce' },
  { name: 'Warpcast', icon: '/icons/platforms/wrapcast.png', color: '#8A63D2', tag: 'Farcaster Web3' },
  { name: 'Nostr', icon: '/icons/platforms/nostr.png', color: '#800080', tag: 'Decentralized' },
  { name: 'Lemmy', icon: '/icons/platforms/lemmy.png', color: '#00BC8C', tag: 'Open Forum' },
  { name: 'Slack', icon: '/icons/platforms/slack.png', color: '#4A154B', tag: 'Workspaces' },
  { name: 'Kick', icon: '/icons/platforms/kick.png', color: '#53FC18', tag: 'Creator Feed' },
  { name: 'VK', icon: '/icons/platforms/vk.png', color: '#4680C2', tag: 'Global' },
];

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<'calendar' | 'composer' | 'analytics' | 'copilot'>('calendar');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 font-sans selection:bg-[#10b981] selection:text-black">
      {/* Background radial ambient lights */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-[#10b981]/15 via-[#06b6d4]/10 to-transparent blur-[140px] rounded-full" />
        <div className="absolute top-[800px] -left-40 w-[600px] h-[600px] bg-[#10b981]/10 blur-[160px] rounded-full" />
        <div className="absolute top-[1600px] -right-40 w-[700px] h-[700px] bg-[#06b6d4]/10 blur-[160px] rounded-full" />
        <div className="absolute bottom-40 left-1/3 w-[800px] h-[500px] bg-[#10b981]/12 blur-[150px] rounded-full" />
      </div>

      {/* TOP NAVIGATION */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#07090e]/80 border-b border-slate-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-[#0b0f17] border border-emerald-500/40 p-1 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:border-emerald-400 transition-all">
              <Image src="/logo.svg" alt="PulseSocial" width={32} height={32} priority />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  Pulse<span className="text-emerald-400">Social</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 rounded">
                  v2.0
                </span>
              </div>
              <span className="text-[10px] text-slate-400 tracking-wider font-medium uppercase">
                by Pulse Media Global
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-emerald-400 transition-colors">Features</a>
            <a href="#platforms" className="hover:text-emerald-400 transition-colors">Platforms (30+)</a>
            <a href="#how-it-works" className="hover:text-emerald-400 transition-colors">How It Works</a>
            <a href="#showcase" className="hover:text-emerald-400 transition-colors">Showcase</a>
            <a href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing</a>
            <Link
              href="/admin"
              className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-all flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Admin Hub</span>
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/admin"
              className="lg:hidden text-xs font-semibold text-emerald-400 border border-emerald-500/30 px-2.5 py-1.5 rounded-lg bg-emerald-500/10"
            >
              Admin
            </Link>
            <Link
              href="/auth/login"
              className="text-xs sm:text-sm font-semibold text-slate-200 hover:text-white px-2.5 sm:px-3 py-2 rounded-lg hover:bg-slate-800/60 transition-all"
            >
              Log In
            </Link>
            <Link
              href="/auth"
              className="relative group inline-flex items-center justify-center px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-black bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400 rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Get Started</span>
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1 sm:ml-1.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 pt-16 pb-20 md:pt-24 md:pb-28 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Sparkle Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide mb-8 shadow-inner shadow-emerald-500/10 animate-pulse">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>⚡ Next-Generation Social Media Command Center</span>
        </div>

        {/* Master Headline matching user's image */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
          Run your social media on{' '}
          <span className="relative whitespace-nowrap">
            <span className="relative bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              autopilot
            </span>
          </span>{' '}
          with{' '}
          <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            PulseSocial
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
          The enterprise-grade open-source social media command center. Schedule, publish, analyze, and automate across 30+ networks from a single, unified high-performance dashboard.
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link
            href="/auth"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold text-black bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400 rounded-xl shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.03] transition-all"
          >
            <span>Start for free</span>
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>

          <a
            href="#showcase"
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 text-base font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 rounded-xl shadow-lg hover:text-white transition-all backdrop-blur-md"
          >
            <svg className="w-5 h-5 mr-2 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span>Explore Live Demo</span>
          </a>
        </div>

        {/* PLATFORMS ICONS HORIZONTAL RIBBON */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-5">
            Seamlessly integrated with 30+ major platforms
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
            {PLATFORMS.slice(0, 16).map((platform) => (
              <div
                key={platform.name}
                className="w-11 h-11 rounded-xl bg-slate-900/90 border border-slate-800 p-2 flex items-center justify-center hover:border-emerald-500/60 hover:scale-110 transition-all shadow-md group relative cursor-pointer"
                title={platform.name}
              >
                <img
                  src={platform.icon}
                  alt={platform.name}
                  className="w-6 h-6 object-contain filter group-hover:brightness-125 transition-all"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to text if missing
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* SOCIAL PROOF */}
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-900/70 border border-slate-800 backdrop-blur-md text-xs text-slate-300">
          <div className="flex text-amber-400 text-sm">
            {'★★★★★'}
          </div>
          <span className="font-semibold text-white">4.9/5</span>
          <span className="text-slate-400">from 20,000+ creators, agencies & modern teams worldwide</span>
        </div>
      </section>

      {/* LIVE CHANNEL CARDS ROW (Exact match from screenshot) */}
      <section className="relative z-10 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Schedule effortlessly across every major platform
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Tailor formats, media sizes, threads, and hashtags for each channel automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: X (Twitter) */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#111827] to-[#0b0f17] border border-slate-800 hover:border-emerald-500/50 transition-all shadow-xl group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-black border border-slate-700 flex items-center justify-center p-2">
                  <img src="/icons/platforms/x.png" alt="X" className="w-5 h-5 object-contain" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">X / Twitter</h3>
                  <span className="text-xs text-emerald-400 font-medium">● Connected & Active</span>
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                +14.2k reach
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Auto-split long thoughts into high-converting threads, auto-retweet top posts, and deploy smart queue time-slots.
            </p>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Next queued thread: Today, 5:30 PM</span>
              <span className="text-emerald-400 font-semibold">Scheduled</span>
            </div>
          </div>

          {/* Card 2: Instagram */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#111827] to-[#0b0f17] border border-slate-800 hover:border-pink-500/50 transition-all shadow-xl group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center p-2">
                  <img src="/icons/platforms/instagram.png" alt="Instagram" className="w-5 h-5 object-contain filter invert" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Instagram</h3>
                  <span className="text-xs text-pink-400 font-medium">● Reels & Carousel</span>
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-pink-500/10 text-pink-400 font-semibold border border-pink-500/20">
                128k views
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Visual 9-grid preview, automated first-comment hashtags, high-resolution carousel publishing, and story scheduling.
            </p>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Reel auto-publish: Tomorrow, 11:00 AM</span>
              <span className="text-pink-400 font-semibold">Ready</span>
            </div>
          </div>

          {/* Card 3: LinkedIn */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#111827] to-[#0b0f17] border border-slate-800 hover:border-blue-500/50 transition-all shadow-xl group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0A66C2] flex items-center justify-center p-2">
                  <img src="/icons/platforms/linkedin.png" alt="LinkedIn" className="w-5 h-5 object-contain filter invert" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">LinkedIn</h3>
                  <span className="text-xs text-blue-400 font-medium">● B2B Pages & Profiles</span>
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 font-semibold border border-blue-500/20">
                +38.5% CTR
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Native PDF document carousel generator, rich author formatting, company page publishing, and engagement tracking.
            </p>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Document carousel: Wednesday, 9:15 AM</span>
              <span className="text-blue-400 font-semibold">Queued</span>
            </div>
          </div>

          {/* Card 4: YouTube */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#111827] to-[#0b0f17] border border-slate-800 hover:border-red-500/50 transition-all shadow-xl group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF0000] flex items-center justify-center p-2">
                  <img src="/icons/platforms/youtube.png" alt="YouTube" className="w-5 h-5 object-contain filter invert" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">YouTube</h3>
                  <span className="text-xs text-red-400 font-medium">● Shorts & Long Form</span>
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 font-semibold border border-red-500/20">
                450k views
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Automated Shorts ingestion, custom thumbnail scheduling, privacy state control (public/unlisted), and category tagging.
            </p>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Shorts premiere: Friday, 6:00 PM</span>
              <span className="text-red-400 font-semibold">Syncing</span>
            </div>
          </div>

          {/* Card 5: TikTok */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#111827] to-[#0b0f17] border border-slate-800 hover:border-cyan-500/50 transition-all shadow-xl group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-black border border-slate-700 flex items-center justify-center p-2">
                  <img src="/icons/platforms/tiktok.png" alt="TikTok" className="w-5 h-5 object-contain" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">TikTok</h3>
                  <span className="text-xs text-cyan-400 font-medium">● Direct Publishing API</span>
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 font-semibold border border-cyan-500/20">
                Viral Feed
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Direct-to-feed video dispatch, automated compliance checks, caption hashtag optimization, and creator sound preservation.
            </p>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Video clip: Thursday, 8:30 PM</span>
              <span className="text-cyan-400 font-semibold">Queued</span>
            </div>
          </div>

          {/* Card 6: Threads & Bluesky */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#111827] to-[#0b0f17] border border-slate-800 hover:border-purple-500/50 transition-all shadow-xl group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0085FF] flex items-center justify-center p-2">
                  <img src="/icons/platforms/bluesky.png" alt="Bluesky" className="w-5 h-5 object-contain filter invert" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Bluesky & Threads</h3>
                  <span className="text-xs text-purple-400 font-medium">● Open Social Protocols</span>
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 font-semibold border border-purple-500/20">
                Cross-Sync
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Post simultaneously to decentralized fediverse protocols (AT Protocol, ActivityPub, Nostr) alongside traditional channels.
            </p>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Fediverse broadcast: Every 4 hours</span>
              <span className="text-purple-400 font-semibold">Autopilot</span>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (3 Simple Steps) */}
      <section id="how-it-works" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Simple 3-Step Flow
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            How it works in 3 simple steps
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto mt-3">
            From initial brainstorm to multi-channel viral distribution in under 60 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <div className="relative p-8 rounded-2xl bg-[#0e1420] border border-slate-800 hover:border-emerald-500/40 transition-all shadow-xl group">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold text-xl mb-6 group-hover:scale-110 transition-transform">
              1
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Connect Your Accounts</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Connect your X, LinkedIn, Instagram, TikTok, YouTube, and 25+ other channels with one-click secure OAuth 2.0. No password sharing.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative p-8 rounded-2xl bg-[#0e1420] border border-slate-800 hover:border-emerald-500/40 transition-all shadow-xl group">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold text-xl mb-6 group-hover:scale-110 transition-transform">
              2
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Compose & AI Auto-Format</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Write your thought once. The autonomous AI adapts character limits, converts threads, generates viral hashtags, and formats media ratios per channel.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative p-8 rounded-2xl bg-[#0e1420] border border-slate-800 hover:border-emerald-500/40 transition-all shadow-xl group">
            <div className="w-14 h-14 rounded-2xl bg-teal-500/15 border border-teal-500/30 text-teal-400 flex items-center justify-center font-bold text-xl mb-6 group-hover:scale-110 transition-transform">
              3
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Autopilot & Deep Analytics</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Set your recurring schedule queue. Let PulseSocial publish at peak follower activity windows while you track impressions, clicks, and ROI in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* INTERACTIVE LIVE SHOWCASE TABS */}
      <section id="showcase" className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Interactive Product Tour
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            The command center built for speed & scale
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto mt-3">
            Explore the actual modules powering high-growth creator and agency workflows.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'calendar'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/25'
                : 'bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            📅 Visual Content Calendar
          </button>
          <button
            onClick={() => setActiveTab('composer')}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'composer'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/25'
                : 'bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            ✍️ Omni-Channel Composer
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'analytics'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/25'
                : 'bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            📊 Real-Time Analytics
          </button>
          <button
            onClick={() => setActiveTab('copilot')}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'copilot'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/25'
                : 'bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            🤖 AI Studio Copilot
          </button>
        </div>

        {/* Interactive Showcase Frame */}
        <div className="rounded-2xl bg-[#0b0f17] border border-slate-800 shadow-2xl overflow-hidden">
          {/* macOS Title Bar */}
          <div className="h-11 bg-[#0e1420] border-b border-slate-800/80 px-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              app.pulsesocial.com / {activeTab}
            </div>
            <div className="text-xs text-slate-500 font-medium">PulseSocial v2.0</div>
          </div>

          {/* Dynamic Tab Content Display */}
          <div className="p-6 sm:p-10 min-h-[460px] flex items-center justify-center bg-gradient-to-b from-[#0b0f17] to-[#07090e]">
            {activeTab === 'calendar' && (
              <div className="w-full max-w-4xl space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-white">October 2026 — Weekly Schedule</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
                      18 Posts Queued
                    </span>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300">Week View</span>
                    <span className="px-3 py-1.5 rounded-lg bg-emerald-500 text-black font-semibold">+ New Post</span>
                  </div>
                </div>

                {/* Calendar Days Simulation */}
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 pt-2">
                  {[
                    { day: 'Mon 20', title: 'SaaS Launch Announcement', channel: 'X & LinkedIn', time: '09:00 AM', status: 'Published' },
                    { day: 'Tue 21', title: 'Product Demo Reel 60s', channel: 'Instagram & TikTok', time: '02:30 PM', status: 'Queued' },
                    { day: 'Wed 22', title: 'Developer Architecture Thread', channel: 'X & Bluesky', time: '11:15 AM', status: 'Queued' },
                    { day: 'Thu 23', title: 'Case Study: 10x ROI', channel: 'LinkedIn & Medium', time: '10:00 AM', status: 'Draft' },
                    { day: 'Fri 24', title: 'Weekly Recap & Tips', channel: 'YouTube Shorts', time: '05:00 PM', status: 'Queued' },
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/80 hover:border-emerald-500/40 transition-all flex flex-col justify-between h-40">
                      <div>
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                          <span className="font-bold text-white">{item.day}</span>
                          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                            item.status === 'Published' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-slate-200 line-clamp-2">{item.title}</p>
                      </div>
                      <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-800/60 flex items-center justify-between">
                        <span>{item.channel}</span>
                        <span className="font-mono text-slate-400">{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'composer' && (
              <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">Target Channels</span>
                    <div className="flex gap-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-semibold">X</span>
                      <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-xs font-semibold">LinkedIn</span>
                      <span className="px-2 py-0.5 rounded bg-pink-500/20 text-pink-400 text-xs font-semibold">Instagram</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-black/60 border border-slate-800 font-mono text-xs text-slate-300 min-h-[140px]">
                    Excited to announce PulseSocial v2.0! Built on modern open-source foundations with multi-channel autopilot, AI copilot, and zero lock-in. 🚀
                    <br /><br />
                    #SocialMedia #Automation #OpenSource #DevTools
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Characters: 184 / 280</span>
                    <span className="text-emerald-400 font-semibold">AI Polish Active ✨</span>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
                  <div className="text-sm font-bold text-white flex items-center justify-between">
                    <span>Live Channel Preview</span>
                    <span className="text-xs text-slate-400">X (Twitter) Feed</span>
                  </div>
                  <div className="p-4 rounded-xl bg-[#0b0f17] border border-slate-800 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center font-bold text-emerald-400 text-xs">
                        PS
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">PulseSocial <span className="text-slate-500 font-normal">@PulseSocialHQ</span></div>
                        <div className="text-[10px] text-slate-500">Just now</div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Excited to announce PulseSocial v2.0! Built on modern open-source foundations with multi-channel autopilot, AI copilot, and zero lock-in. 🚀
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800/80">
                      <span>💬 24</span>
                      <span>🔄 68</span>
                      <span>❤️ 312</span>
                      <span>📊 4.2k</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="w-full max-w-4xl space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Impressions', val: '2,481,200', change: '+24.8%', color: 'text-emerald-400' },
                    { label: 'Engagements', val: '148,650', change: '+18.2%', color: 'text-cyan-400' },
                    { label: 'Link Clicks', val: '38,910', change: '+31.4%', color: 'text-teal-400' },
                    { label: 'Audience Growth', val: '+12,480', change: '+42.1%', color: 'text-emerald-300' },
                  ].map((stat, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                      <div className="text-xs text-slate-400 mb-1">{stat.label}</div>
                      <div className="text-2xl font-black text-white">{stat.val}</div>
                      <div className={`text-xs font-semibold ${stat.color} mt-1`}>{stat.change} vs last month</div>
                    </div>
                  ))}
                </div>

                {/* Simulated Chart */}
                <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">Daily Reach Across All Channels (Last 30 Days)</span>
                    <span className="text-emerald-400 font-semibold">Peak: 124,500 / day</span>
                  </div>
                  <div className="h-36 flex items-end gap-2 pt-4 px-2">
                    {[40, 55, 35, 60, 75, 45, 80, 95, 65, 85, 70, 90, 100, 80, 95, 60, 85, 75, 90, 110, 85, 95, 120, 105, 115, 130, 125, 140, 135, 150].map((h, i) => (
                      <div key={i} className="flex-1 bg-gradient-to-t from-emerald-500/20 to-emerald-400 rounded-t hover:bg-emerald-300 transition-all cursor-pointer" style={{ height: `${(h / 150) * 100}%` }} title={`Day ${i + 1}: ${h * 800} reach`} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'copilot' && (
              <div className="w-full max-w-3xl p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🤖</span>
                    <span className="font-bold text-white text-sm">PulseSocial Autonomous AI Assistant</span>
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold">
                    GPT-4o & Claude 3.5 Engine
                  </span>
                </div>
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-slate-300">
                    <span className="font-bold text-emerald-400">User Prompt:</span> Turn my 500-word engineering blog post about distributed queues into a 7-part viral X thread and a professional LinkedIn carousel summary.
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-slate-200 space-y-2">
                    <span className="font-bold text-emerald-400">AI Response:</span>
                    <p className="leading-relaxed">
                      Generated 7-part thread with hooks, code snippets, and call-to-action, plus 5 slide bullet points formatted for LinkedIn PDF export.
                    </p>
                    <div className="flex gap-2 pt-2">
                      <button className="px-3 py-1.5 rounded-lg bg-emerald-500 text-black font-semibold">Import to Composer</button>
                      <button className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300">Regenerate Hook</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FEATURE BENTO GRID */}
      <section id="features" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Enterprise Architecture
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Everything you need to dominate social media
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto mt-3">
            Engineered for high-output creators, marketing agencies, and fast-moving growth teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: '🗓️',
              title: 'Smart Visual Calendar & Queue',
              desc: 'Drag-and-drop posts into optimal time slots. Visual color-coding per network, weekly, and monthly views.',
            },
            {
              icon: '🤖',
              title: 'Autonomous AI Content Copilot',
              desc: 'Generate viral hooks, transform long-form content into threads, auto-suggest hashtags, and adapt voice per network.',
            },
            {
              icon: '📊',
              title: 'Cross-Platform Analytics & ROI',
              desc: 'Consolidated performance dashboards. Track impressions, follower velocity, engagement, and export clean PDF reports.',
            },
            {
              icon: '📥',
              title: 'Unified Social Inbox',
              desc: 'Manage comments, DMs, mentions, and customer inquiries across X, Instagram, LinkedIn, and YouTube from one zero-inbox hub.',
            },
            {
              icon: '🎨',
              title: 'Built-In Media Studio & Editor',
              desc: 'Native Canva / Polotno integration, Cloudflare R2 media storage, video clipping, and aspect ratio crop tools.',
            },
            {
              icon: '👥',
              title: 'Multi-Workspace & Client Management',
              desc: 'Organize brands into isolated client organizations. Role-based access, draft approvals, and team permissions.',
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-gradient-to-br from-[#0e1420] to-[#07090e] border border-slate-800 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 transition-all group"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform inline-block">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PLATFORMS DIRECTORY (All 30+ Supported Networks) */}
      <section id="platforms" className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Unrivaled Coverage
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Publish to 30+ networks from one command hub
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mt-2">
            Full official API integrations with strict token security and automated compliance.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {PLATFORMS.map((platform) => (
            <div
              key={platform.name}
              className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/50 transition-all flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-black/60 border border-slate-800 flex items-center justify-center p-1.5 mb-2 group-hover:scale-110 transition-transform">
                <img
                  src={platform.icon}
                  alt={platform.name}
                  className="w-5 h-5 object-contain"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                {platform.name}
              </span>
              <span className="text-[10px] text-slate-500 font-medium mt-0.5">
                {platform.tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Start free, scale as you grow
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto mt-3">
            Open-source and self-hostable anytime, with enterprise cloud options for fast-moving teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free / Community */}
          <div className="p-8 rounded-2xl bg-[#0e1420] border border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Community Edition</h3>
              <p className="text-xs text-slate-400 mb-6">For individual creators and hobbyists.</p>
              <div className="text-4xl font-extrabold text-white mb-6">
                $0 <span className="text-sm font-normal text-slate-400">/ forever</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> 3 Connected Channels</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> 30 Scheduled Posts / month</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Standard Content Calendar</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Community Discord Support</li>
              </ul>
            </div>
            <Link
              href="/auth"
              className="mt-8 block text-center py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-all"
            >
              Get Started Free
            </Link>
          </div>

          {/* Pro / Autopilot (Highlighted) */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900 via-[#0e1420] to-[#0b0f17] border-2 border-emerald-500 relative flex flex-col justify-between shadow-2xl shadow-emerald-500/20">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-emerald-400 to-teal-400 text-black font-extrabold text-[11px] rounded-full uppercase tracking-wider shadow">
              Most Popular
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Autopilot Pro</h3>
              <p className="text-xs text-slate-400 mb-6">For serious creators, agencies & startups.</p>
              <div className="text-4xl font-extrabold text-white mb-6">
                $29 <span className="text-sm font-normal text-slate-400">/ month</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2"><span className="text-emerald-400 font-bold">✓</span> Unlimited Connected Channels</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400 font-bold">✓</span> Unlimited Scheduled Posts</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400 font-bold">✓</span> Full AI Studio Copilot</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400 font-bold">✓</span> Unified Social Inbox</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400 font-bold">✓</span> Real-Time Analytics & CSV Export</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400 font-bold">✓</span> Priority Support</li>
              </ul>
            </div>
            <Link
              href="/auth"
              className="mt-8 block text-center py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-black font-bold text-sm shadow-lg shadow-emerald-500/30 transition-all"
            >
              Start 14-Day Free Trial
            </Link>
          </div>

          {/* Agency / Enterprise */}
          <div className="p-8 rounded-2xl bg-[#0e1420] border border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Agency & Team</h3>
              <p className="text-xs text-slate-400 mb-6">For multi-client marketing agencies.</p>
              <div className="text-4xl font-extrabold text-white mb-6">
                $79 <span className="text-sm font-normal text-slate-400">/ month</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Everything in Pro</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Multi-Client Organization Workspaces</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Unlimited Team Members & Approvals</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> White-label Reports</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Dedicated Account Manager</li>
              </ul>
            </div>
            <Link
              href="/auth"
              className="mt-8 block text-center py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-all"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
          <p className="text-slate-400 text-sm mt-2">Everything you need to know about PulseSocial.</p>
        </div>

        <div className="space-y-3">
          {[
            {
              q: 'Can I self-host PulseSocial on my own server or cloud?',
              a: 'Yes! PulseSocial is fully open-source under the AGPL-3.0 license. You can deploy it using Docker Compose, Coolify, Railway, or any Linux server with full control over your data.',
            },
            {
              q: 'Are my social media passwords stored anywhere?',
              a: 'Never. PulseSocial connects directly to official OAuth 2.0 endpoints for all 30+ networks. We only store encrypted bearer tokens that you can revoke at any second.',
            },
            {
              q: 'How does the AI Content Copilot work?',
              a: 'Our AI engine analyzes your top-performing posts and adapts your drafts to match each platform’s unique tone, optimal hashtag count, character limitations, and audience behavior.',
            },
            {
              q: 'Can I manage multiple client brands in one account?',
              a: 'Yes. The Agency workspace feature lets you create completely isolated client organizations with custom team permissions and approval pipelines.',
            },
          ].map((faq, index) => (
            <div
              key={index}
              className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer"
              onClick={() => setActiveFaq(activeFaq === index ? null : index)}
            >
              <div className="flex items-center justify-between text-sm font-bold text-white">
                <span>{faq.q}</span>
                <span className="text-emerald-400 text-base">{activeFaq === index ? '−' : '+'}</span>
              </div>
              {activeFaq === index && (
                <p className="text-xs text-slate-300 mt-3 leading-relaxed border-t border-slate-800/60 pt-3">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL HIGH-CONVERTING CTA BANNER (matching screenshot) */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="relative rounded-3xl p-10 sm:p-16 text-center bg-gradient-to-r from-emerald-950/60 via-slate-900/90 to-teal-950/60 border border-emerald-500/40 shadow-2xl shadow-emerald-500/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-cyan-500/10 pointer-events-none" />
          
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 relative z-10">
            Ready to put your social media on autopilot?
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 relative z-10">
            Join 20,000+ creators, agencies, and businesses who save 20+ hours every week with PulseSocial.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 mb-6">
            <Link
              href="/auth"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold text-black bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400 rounded-xl shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105 transition-all"
            >
              <span>Get Started Free — Fast Setup</span>
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          <p className="text-xs text-slate-400 relative z-10">
            ✓ No credit card required &nbsp;•&nbsp; ✓ Free tier available &nbsp;•&nbsp; ✓ Instant 30-second setup
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-slate-800 bg-[#05070a] text-slate-400 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#0b0f17] border border-emerald-500/40 p-1 flex items-center justify-center">
                <Image src="/logo.svg" alt="PulseSocial" width={24} height={24} />
              </div>
              <span className="text-lg font-extrabold text-white tracking-tight">
                Pulse<span className="text-emerald-400">Social</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed mb-4">
              The Enterprise Open-Source Social Media Command Center. Schedule, publish, analyze, and manage 30+ social media networks from a single, unified interface.
            </p>
            <div className="text-xs text-slate-500">
              A flagship product of <span className="text-slate-300 font-semibold">Pulse Media Global</span>.
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Product</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">Features</a></li>
              <li><a href="#platforms" className="hover:text-emerald-400 transition-colors">Integrations (30+)</a></li>
              <li><a href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing Plans</a></li>
              <li><a href="#showcase" className="hover:text-emerald-400 transition-colors">Live Demo</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/auth/login" className="hover:text-emerald-400 transition-colors">Web App Login</Link></li>
              <li><Link href="/auth" className="hover:text-emerald-400 transition-colors">Create Account</Link></li>
              <li><Link href="/admin" className="hover:text-emerald-400 transition-colors text-emerald-400 font-semibold flex items-center gap-1.5"><span>🛡️</span> Admin Command Center</Link></li>
              <li><a href="https://github.com/Vishwakarmasuraj333/PulseSocial2" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">GitHub Repository</a></li>
              <li><a href="https://discord.gg" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">Discord Community</a></li>
            </ul>
          </div>

          {/* Legal & Attribution */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Company & Legal</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="text-slate-300 font-medium">Pulse Media Global</span></li>
              <li><span className="text-slate-400">Developed by Suraj Vishwakarma</span></li>
              <li><span className="text-slate-500">License: AGPL-3.0</span></li>
              <li><span className="text-slate-500">Privacy & Terms</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} PulseSocial. All rights reserved. A product of Pulse Media Global.
          </div>
          <div className="mt-4 sm:mt-0 font-medium text-slate-400">
            Architected & Developed with pride by <span className="text-emerald-400 font-semibold">Suraj Vishwakarma</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
