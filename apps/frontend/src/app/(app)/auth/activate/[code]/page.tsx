export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { AfterActivate } from '@gitroom/frontend/components/auth/after.activate';
import { isGeneralServerSide } from '@gitroom/helpers/utils/is.general.server.side';
export const metadata: Metadata = {
  title: 'PulseSocial — Activate your account',
  description: 'Complete your PulseSocial account activation.',
};
export default async function Auth() {
  return <AfterActivate />;
}
