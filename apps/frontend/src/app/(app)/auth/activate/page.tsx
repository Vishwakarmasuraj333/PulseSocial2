export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { Activate } from '@gitroom/frontend/components/auth/activate';
import { isGeneralServerSide } from '@gitroom/helpers/utils/is.general.server.side';
export const metadata: Metadata = {
  title: 'PulseSocial — Activate your account',
  description: 'Activate your new PulseSocial workspace and account.',
};
export default async function Auth() {
  return <Activate />;
}
