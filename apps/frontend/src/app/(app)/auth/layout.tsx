import { getT } from '@gitroom/react/translation/get.translation.service.backend';

export const dynamic = 'force-dynamic';
import { ReactNode } from 'react';
import loadDynamic from 'next/dynamic';
import { TestimonialComponent } from '@gitroom/frontend/components/auth/testimonial.component';
import { LogoTextComponent } from '@gitroom/frontend/components/ui/logo-text.component';
import { MantineWrapper } from '@gitroom/react/helpers/mantine.wrapper';
import { Toaster } from '@gitroom/react/toaster/toaster';
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
      <div className="bg-[#0E0E0E] flex flex-1 p-[12px] gap-[12px] min-h-screen w-screen text-white">
        {/*<style>{`html, body {overflow-x: hidden;}`}</style>*/}
        <ReturnUrlComponent />
        <div className="flex flex-col py-[40px] px-[20px] flex-1 lg:w-[600px] lg:flex-none rounded-[16px] text-white p-[16px] bg-[#131722] border border-[#1e293b] shadow-2xl justify-between">
          <div className="w-full max-w-[440px] mx-auto justify-center gap-[24px] h-full flex flex-col text-white">
            <LogoTextComponent />
            <div className="flex">{children}</div>
          </div>
          <div className="pt-6 border-t border-[#1e293b] text-center text-xs text-[#64748b]">
            Developed by <span className="text-[#94a3b8] font-medium">Suraj Vishwakarma</span> &bull; Pulse Media Global
          </div>
        </div>
        <div className="text-[34px] flex-1 pt-[72px] hidden lg:flex flex-col items-center">
          <div className="text-center font-semibold text-slate-100 max-w-[560px]">
            Over <span className="text-[40px] font-bold text-[#10b981]">20,000+</span>{' '}
            Creators &amp; Brands use
            <br />
            <span className="text-[#10b981]">PulseSocial</span> To Amplify Their Social Reach
          </div>
          <p className="text-sm text-slate-400 mt-3 text-center max-w-[460px]">
            The unified social publishing, analytics, and inbox command center inspired by Buffer and Hootsuite.
          </p>
          <TestimonialComponent />
        </div>
      </div>
    </MantineWrapper>
  );
}
