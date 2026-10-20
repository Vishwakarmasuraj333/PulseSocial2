import { MediaLayoutComponent } from '@gitroom/frontend/components/new-layout/layout.media.component';
import { Metadata } from 'next';
import { isGeneralServerSide } from '@gitroom/helpers/utils/is.general.server.side';

export const metadata: Metadata = {
  title: 'PulseSocial — Media Library & Asset Manager',
  description: 'Upload, manage, and transform images and videos for multi-channel social publishing.',
};

export default async function Page() {
  return <MediaLayoutComponent />
}
