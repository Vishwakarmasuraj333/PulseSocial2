export const dynamic = 'force-dynamic';
import { ForgotReturn } from '@gitroom/frontend/components/auth/forgot-return';
import { Metadata } from 'next';
import { isGeneralServerSide } from '@gitroom/helpers/utils/is.general.server.side';
export const metadata: Metadata = {
  title: 'PulseSocial — Reset Password',
  description: 'Reset your PulseSocial account password.',
};
export default async function Auth(params: {
  params: Promise<{
    token: string;
  }>;
}) {
  return <ForgotReturn token={(await params.params).token} />;
}
