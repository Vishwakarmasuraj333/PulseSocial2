import { getT } from '@gitroom/react/translation/get.translation.service.backend';

export const dynamic = 'force-dynamic';
import { ReactNode } from 'react';
import loadDynamic from 'next/dynamic';
import { TestimonialComponent } from '@gitroom/frontend/components/auth/testimonial.component';
import { LogoTextComponent } from '@gitroom/frontend/components/ui/logo-text.component';
import { MantineWrapper } from '@gitroom/react/helpers/mantine.wrapper';
import { Toaster } from '@gitroom/react/toaster/toaster';
import Link from 'next/link';

const ReturnUrlComponent = loadDynamic(() => import('./return.url.component'));

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const t = await getT();

  return (
    <MantineWrapper>
      <Toaster />
      <div className="bg-[#0b0e14] flex flex-1 p-3 md:p-5 gap-6 min-h-screen w-screen text-white relative overflow-x-hidden selection:bg-emerald-500 selection:text-black">
        {/* Subtle Ambient Background Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        <ReturnUrlComponent />

        {/* Left Form Card */}
        <div className="flex flex-col py-8 px-6 sm:px-8 flex-1 lg:w-[580px] lg:flex-none rounded-2xl text-white bg-[#111622]/95 backdrop-blur-xl border border-slate-800 shadow-2xl justify-between relative z-10">
          <div className="w-full max-w-[460px] mx-auto justify-center gap-6 h-full flex flex-col text-white">
            <div className="flex items-center justify-between">
              <LogoTextComponent />
              <Link
                href="/admin"
                className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-[11px] font-semibold transition-all flex items-center gap-1.5"
              >
                <span>🛡️</span>
                <span>Admin Hub</span>
              </Link>
            </div>
            <div className="flex w-full">{children}</div>
          </div>

          <div className="pt-6 border-t border-slate-800/80 text-center text-xs text-slate-500">
            Developed by <span className="text-slate-300 font-semibold">Suraj Vishwakarma</span> &bull; Pulse Media Global
          </div>
        </div>

        {/* Right Hero / Social Proof Column */}
        <div className="text-[34px] flex-1 pt-12 hidden lg:flex flex-col items-center justify-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>28+ Social Channels &bull; Autonomous AI Content Copilot</span>
          </div>

          <div className="text-center font-bold text-slate-100 max-w-[620px] text-3xl leading-tight">
            Over <span className="font-extrabold text-emerald-400">20,000+</span>{' '}
            Creators &amp; Brands use
            <br />
            <span className="text-emerald-400">PulseSocial</span> To Amplify Their Reach
          </div>

          <p className="text-sm text-slate-400 mt-3 text-center max-w-[500px] leading-relaxed">
            The next-generation social publishing, scheduling, analytics, and inbox command center designed for modern agencies &amp; creators.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-6 max-w-[520px] w-full text-center">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-xl font-bold text-white block">99.8%</span>
              <span className="text-[11px] text-slate-400">Delivery Success</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-xl font-bold text-emerald-400 block">38+</span>
              <span className="text-[11px] text-slate-400">Social Connectors</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-xl font-bold text-cyan-400 block">&lt; 150ms</span>
              <span className="text-[11px] text-slate-400">API Response</span>
            </div>
          </div>

          <TestimonialComponent />
        </div>
      </div>
    </MantineWrapper>
  );
}
