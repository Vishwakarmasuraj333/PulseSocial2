export const dynamic = 'force-dynamic';
import { BillingComponent } from '@gitroom/frontend/components/billing/billing.component';
import { Metadata } from 'next';
import { isGeneralServerSide } from '@gitroom/helpers/utils/is.general.server.side';
export const metadata: Metadata = {
  title: 'PulseSocial — Billing & Subscriptions',
  description: 'Manage your PulseSocial subscription plan, invoices, and billing details.',
};
export default async function Page() {
  return (
    <div className="bg-newBgColorInner flex-1 flex-col flex p-[20px] gap-[12px]">
      <BillingComponent />
    </div>
  );
}
