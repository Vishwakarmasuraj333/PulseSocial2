'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ProviderStatus {
  name: string;
  icon: string;
  status: 'Operational' | 'Degraded' | 'Maintenance';
  latency: string;
  successRate: string;
  activeChannels: number;
}

const PROVIDERS: ProviderStatus[] = [
  { name: 'X / Twitter (v2 API)', icon: '/icons/platforms/x.png', status: 'Operational', latency: '142ms', successRate: '99.8%', activeChannels: 6420 },
  { name: 'Instagram (Graph API)', icon: '/icons/platforms/instagram.png', status: 'Operational', latency: '185ms', successRate: '99.5%', activeChannels: 8120 },
  { name: 'LinkedIn (Community API)', icon: '/icons/platforms/linkedin.png', status: 'Operational', latency: '160ms', successRate: '99.7%', activeChannels: 5240 },
  { name: 'YouTube (Data API v3)', icon: '/icons/platforms/youtube.png', status: 'Operational', latency: '210ms', successRate: '99.2%', activeChannels: 3890 },
  { name: 'TikTok (Publishing API)', icon: '/icons/platforms/tiktok.png', status: 'Operational', latency: '240ms', successRate: '98.9%', activeChannels: 4150 },
  { name: 'Threads & Bluesky (AT Protocol)', icon: '/icons/platforms/bluesky.png', status: 'Operational', latency: '110ms', successRate: '99.9%', activeChannels: 2980 },
  { name: 'Pinterest & Reddit', icon: '/icons/platforms/pinterest.png', status: 'Operational', latency: '175ms', successRate: '99.4%', activeChannels: 2130 },
  { name: 'Telegram & Discord', icon: '/icons/platforms/telegram.png', status: 'Operational', latency: '85ms', successRate: '100%', activeChannels: 3410 },
];

const RECENT_ORGS = [
  { id: 'org_pulse_01', name: 'Pulse Media Global HQ', owner: 'suraj@pulsemediaglobal.com', plan: 'Enterprise Agency', channels: 28, postsToday: 42, status: 'Active' },
  { id: 'org_acme_tech', name: 'Acme SaaS Labs', owner: 'sarah@acmelabs.io', plan: 'Autopilot Pro', channels: 8, postsToday: 14, status: 'Active' },
  { id: 'org_creator_hub', name: 'HyperGrowth Agency', owner: 'alex@hypergrowth.co', plan: 'Agency & Team', channels: 22, postsToday: 65, status: 'Active' },
  { id: 'org_global_retail', name: 'Nexus Digital Commerce', owner: 'marcus@nexusretail.com', plan: 'Autopilot Pro', channels: 12, postsToday: 18, status: 'Active' },
  { id: 'org_dev_rel', name: 'OpenTech Creators Network', owner: 'devon@opentech.org', plan: 'Community Edition', channels: 3, postsToday: 6, status: 'Active' },
];

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'infrastructure' | 'providers' | 'tenants' | 'security'>('infrastructure');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 600);
  };

  return (
    <div className="flex-1 flex flex-col p-6 max-w-7xl mx-auto w-full gap-6 text-slate-100">
      {/* Top Admin Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#0e1420] via-[#111827] to-[#0b0f17] border border-slate-800 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#0b0f17] border border-emerald-500/50 p-2 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Image src="/logo.svg" alt="PulseSocial Logo" width={36} height={36} priority />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white tracking-tight">
                PulseSocial Admin Command Center
              </h1>
              <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                SuperAdmin
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Global Platform Governance &bull; Developed by <span className="text-slate-200 font-semibold">Suraj Vishwakarma</span> &bull; Pulse Media Global
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
          >
            <span>🏠</span>
            <span>Home</span>
          </Link>

          <button
            onClick={handleRefresh}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-emerald-500/50 text-xs font-semibold text-slate-200 hover:text-white transition-all flex items-center gap-2"
          >
            <span className={refreshing ? 'animate-spin' : ''}>🔄</span>
            <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>

          <Link
            href="/admin/stats"
            className="px-3.5 py-2 rounded-xl bg-purple-600/20 border border-purple-500/40 hover:bg-purple-600/30 text-purple-300 text-xs font-semibold transition-all flex items-center gap-1.5"
          >
            <span>📊</span>
            <span>Stats</span>
          </Link>

          <Link
            href="/admin/errors"
            className="px-3.5 py-2 rounded-xl bg-rose-600/20 border border-rose-500/40 hover:bg-rose-600/30 text-rose-300 text-xs font-semibold transition-all flex items-center gap-1.5"
          >
            <span>⚠️</span>
            <span>Errors</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Active Organizations', val: '1,420', change: '+18.4%', trend: 'up', color: 'text-emerald-400' },
          { label: 'Registered Creators', val: '24,850', change: '+24.1%', trend: 'up', color: 'text-cyan-400' },
          { label: 'Published Posts', val: '184,200', change: '99.4% Delivery', trend: 'up', color: 'text-emerald-400' },
          { label: 'Pending Retries', val: '12', change: '0.6% Failure Rate', trend: 'neutral', color: 'text-amber-400' },
          { label: 'Media Storage', val: '48.6 GB', change: 'Cloudflare R2 Edge', trend: 'neutral', color: 'text-teal-400' },
          { label: 'AI Copilot Prompts', val: '38,400', change: '+42% this month', trend: 'up', color: 'text-purple-400' },
        ].map((kpi, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
            <span className="text-[11px] text-slate-400 font-medium">{kpi.label}</span>
            <span className="text-2xl font-black text-white mt-1">{kpi.val}</span>
            <span className={`text-[11px] font-semibold mt-1 ${kpi.color}`}>
              {kpi.change}
            </span>
          </div>
        ))}
      </div>

      {/* Admin Subview Tabs */}
      <div className="flex border-b border-slate-800 gap-2 overflow-x-auto pb-1">
        {[
          { key: 'infrastructure', label: '🖥️ Infrastructure & Health', badge: 'Operational' },
          { key: 'providers', label: '🔌 Social Providers Matrix', badge: '38+ Active' },
          { key: 'tenants', label: '👥 Organizations & Tenants', badge: '1,420 Orgs' },
          { key: 'security', label: '🛡️ Security & Licensing', badge: 'AGPL-3.0' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab.key
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                : 'bg-slate-900/60 text-slate-300 hover:text-white border border-slate-800/80'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-1.5 py-0.5 rounded text-[10px] ${
                activeTab === tab.key ? 'bg-black/20 text-black font-extrabold' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {tab.badge}
            </span>
          </button>
        ))}
      </div>

      {/* TAB 1: Infrastructure Telemetry */}
      {activeTab === 'infrastructure' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              title: 'PostgreSQL Database',
              type: 'Relational Data Store',
              status: 'Healthy',
              latency: '8ms',
              details: 'Pool: 20 active connections • Multi-Tenant Isolated schema with Prisma ORM',
              icon: '🐘',
            },
            {
              title: 'Redis Queue & Cache',
              type: 'Memory Broker',
              status: 'Healthy',
              latency: '1ms',
              details: 'Memory: 142MB / 2GB • BullMQ workers processing scheduled launches',
              icon: '⚡',
            },
            {
              title: 'Temporal Workflow Engine',
              type: 'Durable Execution',
              status: 'Running',
              latency: '14ms',
              details: '4 Worker threads active • Automatic post retry and distributed timers',
              icon: '⏱️',
            },
            {
              title: 'Cloudflare R2 Storage',
              type: 'S3-Compatible CDN',
              status: 'Connected',
              latency: '34ms',
              details: 'Global asset edge cache • Zero egress fees for high-res images & video',
              icon: '☁️',
            },
            {
              title: 'Autonomous AI Copilot Engine',
              type: 'LangChain & OpenAI',
              status: 'Operational',
              latency: '820ms',
              details: 'GPT-4o & Claude 3.5 integrations for hooks, threads, and captions',
              icon: '🤖',
            },
            {
              title: 'Companion Chrome Extension',
              type: 'Native Browser Bridge',
              status: 'Ready',
              latency: 'Local',
              details: 'Enables direct Skool community posts & decentralized web sharing',
              icon: '🧩',
            },
          ].map((item, i) => (
            <div key={i} className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h3 className="text-sm font-bold text-white">{item.title}</h3>
                    <span className="text-[10px] text-slate-400">{item.type}</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                  ● {item.status}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 pt-2.5">
                {item.details}
              </p>
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>Response Time:</span>
                <span className="font-mono text-emerald-400 font-semibold">{item.latency}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: Social Providers Matrix */}
      {activeTab === 'providers' && (
        <div className="rounded-xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Social Network API Integration Matrix</h3>
            <span className="text-xs text-slate-400">All 38+ Social Connectors Verified</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0b0f17] text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Provider / Network</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Active Channels</th>
                  <th className="py-3 px-4">Average Latency</th>
                  <th className="py-3 px-4">Delivery Success</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-200">
                {PROVIDERS.map((p, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-white flex items-center gap-2.5">
                      <img src={p.icon} alt={p.name} className="w-5 h-5 object-contain" />
                      <span>{p.name}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-semibold">
                        ● {p.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono">{p.activeChannels.toLocaleString()}</td>
                    <td className="py-3 px-4 font-mono text-slate-400">{p.latency}</td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-400">{p.successRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Organizations & Tenants */}
      {activeTab === 'tenants' && (
        <div className="rounded-xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Managed Organizations & Client Tenants</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Role-based tenancy isolation with live post monitoring</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300">
              Showing Top 5 Active
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0b0f17] text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Organization Name</th>
                  <th className="py-3 px-4">Owner Email</th>
                  <th className="py-3 px-4">Subscription Plan</th>
                  <th className="py-3 px-4">Connected Channels</th>
                  <th className="py-3 px-4">Posts Today</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-200">
                {RECENT_ORGS.map((org) => (
                  <tr key={org.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-white">{org.name}</td>
                    <td className="py-3 px-4 text-slate-300 font-mono text-[11px]">{org.owner}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-blue-500/15 text-blue-400 font-semibold border border-blue-500/30 text-[10px]">
                        {org.plan}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono">{org.channels}</td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-400">{org.postsToday}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-semibold text-[10px]">
                        {org.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: Security & Licensing */}
      {activeTab === 'security' && (
        <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white">Platform Governance & Licensing Compliance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-black/50 border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-400 text-sm">Brand & Ownership Notice</span>
              <p className="text-slate-300 leading-relaxed">
                <strong>Product:</strong> PulseSocial v2.0<br />
                <strong>Company:</strong> Pulse Media Global<br />
                <strong>Software Architect:</strong> Suraj Vishwakarma<br />
                <strong>License:</strong> GNU Affero General Public License v3.0 (AGPL-3.0)
              </p>
            </div>
            <div className="p-4 rounded-xl bg-black/50 border border-slate-800 space-y-2">
              <span className="font-bold text-cyan-400 text-sm">Security & Data Isolation</span>
              <p className="text-slate-300 leading-relaxed">
                &bull; AES-256 encrypted OAuth token storage<br />
                &bull; Zero password storage for connected social networks<br />
                &bull; Multi-tenant organization isolation at database level<br />
                &bull; Role-Based Access Control (RBAC): SuperAdmin, Admin, Editor, Viewer
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
