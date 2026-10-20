export const dynamic = 'force-dynamic';
import { Login } from '@gitroom/frontend/components/auth/login';
import { Metadata } from 'next';
import { isGeneralServerSide } from '@gitroom/helpers/utils/is.general.server.side';
export const metadata: Metadata = {
  title: 'PulseSocial — Sign In',
  description: 'Sign in to your PulseSocial command center.',
};
export default async function Auth() {
  return <Login />;
}
