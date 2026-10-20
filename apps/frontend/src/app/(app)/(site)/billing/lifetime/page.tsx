import { LifetimeDeal } from '@gitroom/frontend/components/billing/lifetime.deal';
export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { isGeneralServerSide } from '@gitroom/helpers/utils/is.general.server.side';
export const metadata: Metadata = {
  title: 'PulseSocial — Lifetime Deal',
  description: 'Unlock lifetime access to PulseSocial with all features included.',
};
export default async function Page() {
  return <LifetimeDeal />;
}
