import { SentryComponent } from '@gitroom/frontend/components/layout/sentry.component';

export const dynamic = 'force-dynamic';
import '../global.scss';
import 'react-tooltip/dist/react-tooltip.css';
import '@copilotkit/react-ui/styles.css';
import LayoutContext from '@gitroom/frontend/components/layout/layout.context';
import { ReactNode } from 'react';
import { jakartaSans } from '@gitroom/frontend/fonts/plus-jakarta-sans/plus.jakarta.sans.font';
import PlausibleProvider from 'next-plausible';
import clsx from 'clsx';
import { VariableContextComponent } from '@gitroom/react/helpers/variable.context';
import { Fragment } from 'react';
import UtmSaver from '@gitroom/helpers/utils/utm.saver';
import { DubAnalytics } from '@gitroom/frontend/components/layout/dubAnalytics';
import { FacebookComponent } from '@gitroom/frontend/components/layout/facebook.component';
import { GoogleTagManagerComponent } from '@gitroom/frontend/components/layout/gtm.component';
import { cookies } from 'next/headers';
import {
  cookieName,
  fallbackLng,
} from '@gitroom/react/translation/i18n.config';
import { HtmlComponent } from '@gitroom/frontend/components/layout/html.component';
import Script from 'next/script';
import { ChangeDirClient } from '@gitroom/frontend/components/new-layout/change.dir.client';

export default async function AppLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const language = cookieStore.get(cookieName)?.value || fallbackLng;
  const Plausible = !!process.env.STRIPE_PUBLISHABLE_KEY
    ? PlausibleProvider
    : Fragment;
  return (
    <html>
      <head>
        <title>PulseSocial &mdash; Enterprise Social Media Command Center</title>
        <meta
          name="description"
          content="PulseSocial is a premier social media management platform by Pulse Media Global, developed by Suraj Vishwakarma. Schedule, publish, analyze, and manage 28+ social channels."
        />
        <meta property="og:title" content="PulseSocial — Enterprise Social Media Management" />
        <meta
          property="og:description"
          content="Unified social publishing, scheduling, analytics, and inbox across all major networks."
        />
        <meta property="og:site_name" content="PulseSocial" />
        <meta name="author" content="Suraj Vishwakarma" />
        <meta name="creator" content="Pulse Media Global" />
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <link rel="alternate icon" href="/favicon.ico" />
        {!!process.env.DATAFAST_WEBSITE_ID && (
          <Script
            data-website-id={process.env.DATAFAST_WEBSITE_ID}
            data-domain={process.env.NEXT_PUBLIC_APP_DOMAIN || "pulsesocial.com"}
            src="https://datafa.st/js/script.js"
            strategy="afterInteractive"
          />
        )}
      </head>
      <ChangeDirClient />
      <body
        className={clsx(jakartaSans.className, 'dark text-primary !bg-primary')}
      >
        <VariableContextComponent
          storageProvider={
            process.env.STORAGE_PROVIDER! as 'local' | 'cloudflare'
          }
          environment={process.env.NODE_ENV!}
          backendUrl={process.env.NEXT_PUBLIC_BACKEND_URL!}
          plontoKey={process.env.NEXT_PUBLIC_POLOTNO!}
          stripeClient={process.env.STRIPE_PUBLISHABLE_KEY!}
          isChatBase={!!process.env.CHATBASE_TOKEN}
          billingEnabled={!!process.env.STRIPE_PUBLISHABLE_KEY}
          discordUrl={process.env.NEXT_PUBLIC_DISCORD_SUPPORT!}
          frontEndUrl={process.env.FRONTEND_URL!}
          isGeneral={!!process.env.IS_GENERAL}
          genericOauth={
            !!process.env.PULSESOCIAL_GENERIC_OAUTH ||
            !!process.env.POSTIZ_GENERIC_OAUTH
          }
          oauthLogoUrl={
            process.env.NEXT_PUBLIC_PULSESOCIAL_OAUTH_LOGO_URL ||
            process.env.NEXT_PUBLIC_POSTIZ_OAUTH_LOGO_URL ||
            '/logo.svg'
          }
          oauthDisplayName={
            process.env.NEXT_PUBLIC_PULSESOCIAL_OAUTH_DISPLAY_NAME ||
            process.env.NEXT_PUBLIC_POSTIZ_OAUTH_DISPLAY_NAME ||
            'PulseSocial'
          }
          uploadDirectory={process.env.NEXT_PUBLIC_UPLOAD_STATIC_DIRECTORY!}
          cloudflareUrl={process.env.CLOUDFLARE_BUCKET_URL || ''}
          mainUrl={process.env.MAIN_URL || ''}
          mcpUrl={process.env.MCP_URL}
          dub={!!process.env.STRIPE_PUBLISHABLE_KEY}
          facebookPixel={process.env.NEXT_PUBLIC_FACEBOOK_PIXEL!}
          telegramBotName={process.env.TELEGRAM_BOT_NAME!}
          neynarClientId={process.env.NEYNAR_CLIENT_ID!}
          appleClientId={process.env.APPLE_CLIENT_ID!}
          isSecured={!process.env.NOT_SECURED}
          disableImageCompression={!!process.env.DISABLE_IMAGE_COMPRESSION}
          disableXAnalytics={!!process.env.DISABLE_X_ANALYTICS}
          sentryDsn={process.env.NEXT_PUBLIC_SENTRY_DSN!}
          extensionId={process.env.EXTENSION_ID || ''}
          googleAdsId={process.env.NEXT_PUBLIC_GTM_ID}
          googleAdsTrialTracking={process.env.NEXT_PUBLIC_TRACKING_TRIAL}
          language={language}
          recaptchaSiteKey={process.env.RECAPTCHA_SITE_KEY || ''}
          mediaProcessing={
            process.env.STORAGE_PROVIDER === 'cloudflare' &&
            !!process.env.RUNPOD_API_KEY &&
            !!process.env.RUNPOD_ENDPOINT_ID
          }
          transloadit={
            process.env.TRANSLOADIT_AUTH && process.env.TRANSLOADIT_TEMPLATE
              ? [
                  process.env.TRANSLOADIT_AUTH!,
                  process.env.TRANSLOADIT_TEMPLATE!,
                ]
              : []
          }
        >
          <SentryComponent>
            <HtmlComponent />
            <DubAnalytics />
            <FacebookComponent />
            <GoogleTagManagerComponent gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
            <Plausible
              domain={process.env.NEXT_PUBLIC_APP_DOMAIN || 'pulsesocial.com'}
            >
              <LayoutContext>
                <UtmSaver />
                {children}
              </LayoutContext>
            </Plausible>
          </SentryComponent>
        </VariableContextComponent>
      </body>
    </html>
  );
}
