export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { PlatformAnalytics } from '@gitroom/frontend/components/platform-analytics/platform.analytics';
import { isGeneralServerSide } from '@gitroom/helpers/utils/is.general.server.side';
export const metadata: Metadata = {
  title: 'PulseSocial — Analytics & Performance Reports',
  description: 'Track genuine reach, impressions, engagement, and audience growth across channels.',
};
export default async function Index() {
  return <PlatformAnalytics />;
}
