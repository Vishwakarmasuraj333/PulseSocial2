/**
 * PulseSocial Social Provider Capability Matrix
 * Comprehensive capabilities, OAuth flows, constraints, rate limits,
 * analytics, inbox support, and verification statuses for all 38 supported providers.
 */

export interface ProviderCapability {
  identifier: string;
  displayName: string;
  category:
    | 'Social Network'
    | 'Professional'
    | 'Video & Streaming'
    | 'Messaging'
    | 'Blogging & Community'
    | 'Decentralized / Web3';
  oauthFlow:
    | 'OAuth 2.0 PKCE'
    | 'OAuth 2.0 Auth Code'
    | 'OAuth 1.0a'
    | 'API Key / Personal Token'
    | 'Cookie Session / Extension'
    | 'Cryptographic Keypair';
  requiredScopes: string[];
  supportedAccountTypes: string[];
  supportedPublishingFormats: string[];
  mediaConstraints: {
    maxImages: number;
    maxVideoSizeMB: number;
    maxDurationSec?: number;
    supportedFormats: string[];
  };
  maxLength: number;
  analytics: {
    supported: boolean;
    metrics?: string[];
    notes?: string;
  };
  inboxComments: {
    supported: boolean;
    replySupported: boolean;
    notes?: string;
  };
  tokenExpiration: string;
  rateLimits: string;
  appReviewRequired: boolean;
  verificationNotes: string;
}

export const PROVIDER_CAPABILITY_MATRIX: Record<string, ProviderCapability> = {
  x: {
    identifier: 'x',
    displayName: 'X (formerly Twitter)',
    category: 'Social Network',
    oauthFlow: 'OAuth 2.0 PKCE',
    requiredScopes: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'],
    supportedAccountTypes: ['Standard User', 'Premium / Verified User', 'Enterprise Organization'],
    supportedPublishingFormats: ['Single Post', 'Thread / Sequential Tweets', 'Image Attachments', 'Video Tweet', 'Polls'],
    mediaConstraints: {
      maxImages: 4,
      maxVideoSizeMB: 512,
      maxDurationSec: 140,
      supportedFormats: ['jpg', 'png', 'webp', 'gif', 'mp4'],
    },
    maxLength: 280, // Extended up to 25,000 characters for verified Premium users with settings
    analytics: {
      supported: true,
      metrics: ['Impressions', 'Engagements', 'Likes', 'Retweets', 'Replies', 'Profile Clicks', 'URL Link Clicks'],
      notes: 'Requires Twitter Developer Basic or Pro tier for public metrics.',
    },
    inboxComments: {
      supported: true,
      replySupported: true,
      notes: 'Mentions and tweet replies accessible via official v2 Recent Search and Mentions API.',
    },
    tokenExpiration: 'Access token expires in 2 hours; auto-refreshed via offline.access refresh token.',
    rateLimits: '200 tweets / 15 minutes per user token; 50 media uploads per 15 minutes.',
    appReviewRequired: true,
    verificationNotes: 'Requires Twitter Developer App registration with OAuth 2.0 user-authentication settings.',
  },

  linkedin: {
    identifier: 'linkedin',
    displayName: 'LinkedIn Personal Profiles',
    category: 'Professional',
    oauthFlow: 'OAuth 2.0 Auth Code',
    requiredScopes: ['openid', 'profile', 'email', 'w_member_social'],
    supportedAccountTypes: ['Personal Member Profile'],
    supportedPublishingFormats: ['Article Share', 'Image Post', 'Video Post', 'First Comment Automated Addition'],
    mediaConstraints: {
      maxImages: 9,
      maxVideoSizeMB: 200,
      maxDurationSec: 600,
      supportedFormats: ['jpg', 'png', 'gif', 'mp4'],
    },
    maxLength: 3000,
    analytics: {
      supported: true,
      metrics: ['Impressions', 'Reactions', 'Comments', 'Shares', 'Engagement Rate'],
      notes: 'Personal profile member analytics per LinkedIn Community Management API policy.',
    },
    inboxComments: {
      supported: false,
      replySupported: false,
      notes: 'Member personal profile DM API is restricted by LinkedIn Partner Program.',
    },
    tokenExpiration: 'Access token valid for 60 days; refresh tokens valid for 365 days where issued.',
    rateLimits: '100 shares per member per day.',
    appReviewRequired: true,
    verificationNotes: 'Requires LinkedIn Developer Portal app with "Share on LinkedIn" product enabled.',
  },

  'linkedin-page': {
    identifier: 'linkedin-page',
    displayName: 'LinkedIn Company Pages',
    category: 'Professional',
    oauthFlow: 'OAuth 2.0 Auth Code',
    requiredScopes: ['openid', 'profile', 'email', 'w_organization_social', 'r_organization_social'],
    supportedAccountTypes: ['Company Page', 'Showcase Page'],
    supportedPublishingFormats: ['Organization Share', 'Multi-Image Post', 'Video Post', 'Poll', 'First Comment'],
    mediaConstraints: {
      maxImages: 9,
      maxVideoSizeMB: 500,
      maxDurationSec: 1800,
      supportedFormats: ['jpg', 'png', 'mp4'],
    },
    maxLength: 3000,
    analytics: {
      supported: true,
      metrics: ['Unique Impressions', 'Clicks', 'Reactions', 'Comments', 'Shares', 'Follower Growth'],
      notes: 'Available via LinkedIn Organizational Page Statistics API.',
    },
    inboxComments: {
      supported: true,
      replySupported: true,
      notes: 'Organization page comments and replies supported via Community Management API.',
    },
    tokenExpiration: 'Access token valid for 60 days; refresh token available for automated renewal.',
    rateLimits: 'Organization API throttles based on company follower tier.',
    appReviewRequired: true,
    verificationNotes: 'Requires Community Management API approval and organization page administrator rights.',
  },

  facebook: {
    identifier: 'facebook',
    displayName: 'Facebook Pages & Groups',
    category: 'Social Network',
    oauthFlow: 'OAuth 2.0 Auth Code',
    requiredScopes: [
      'pages_show_list',
      'pages_read_engagement',
      'pages_manage_posts',
      'pages_manage_engagement',
      'read_insights',
    ],
    supportedAccountTypes: ['Facebook Business Page', 'Creator Page'],
    supportedPublishingFormats: ['Status Update', 'Single/Multiple Photo Post', 'Video Post', 'Reels', 'First Comment'],
    mediaConstraints: {
      maxImages: 10,
      maxVideoSizeMB: 1000,
      maxDurationSec: 14400,
      supportedFormats: ['jpg', 'png', 'gif', 'mp4', 'mov'],
    },
    maxLength: 63206,
    analytics: {
      supported: true,
      metrics: ['Page Impressions', 'Post Engagements', 'Reactions', 'Link Clicks', 'Video Views', 'Followers'],
      notes: 'Aggregated page and post insights via Meta Graph API v21.0+.',
    },
    inboxComments: {
      supported: true,
      replySupported: true,
      notes: 'Page comments read and reply enabled via pages_manage_engagement.',
    },
    tokenExpiration: 'Long-lived Page Access Token does not expire unless revoked or password changes.',
    rateLimits: '200 calls per page per hour; batch requests supported.',
    appReviewRequired: true,
    verificationNotes: 'Meta Business Verification and App Review required for production usage.',
  },

  instagram: {
    identifier: 'instagram',
    displayName: 'Instagram Professional Accounts',
    category: 'Social Network',
    oauthFlow: 'OAuth 2.0 Auth Code (via Meta Graph API)',
    requiredScopes: [
      'instagram_basic',
      'instagram_content_publish',
      'instagram_manage_comments',
      'instagram_manage_insights',
      'pages_show_list',
    ],
    supportedAccountTypes: ['Instagram Creator Account', 'Instagram Business Account'],
    supportedPublishingFormats: ['Feed Image (1:1, 4:5)', 'Carousel (up to 10 items)', 'Reels Video (9:16)', 'First Comment'],
    mediaConstraints: {
      maxImages: 10,
      maxVideoSizeMB: 100,
      maxDurationSec: 900,
      supportedFormats: ['jpg', 'png', 'mp4', 'mov'],
    },
    maxLength: 2200,
    analytics: {
      supported: true,
      metrics: ['Impressions', 'Reach', 'Engagements', 'Saves', 'Video Views', 'Profile Visits'],
      notes: 'Retrieved via Instagram Graph API Insights endpoint.',
    },
    inboxComments: {
      supported: true,
      replySupported: true,
      notes: 'Comment moderation and reply supported via instagram_manage_comments.',
    },
    tokenExpiration: 'Long-lived 60-day token; automatically refreshed during active operation.',
    rateLimits: '50 published posts per 24 hours per professional account.',
    appReviewRequired: true,
    verificationNotes: 'Instagram account must be linked to a Facebook Page within Meta Business Suite.',
  },

  threads: {
    identifier: 'threads',
    displayName: 'Threads by Meta',
    category: 'Social Network',
    oauthFlow: 'OAuth 2.0 Auth Code',
    requiredScopes: ['threads_basic', 'threads_content_publish', 'threads_read_replies', 'threads_manage_replies', 'threads_manage_insights'],
    supportedAccountTypes: ['Threads Professional / Creator', 'Standard Threads Account'],
    supportedPublishingFormats: ['Text Post', 'Thread / Sequential Replies', 'Single/Multiple Image', 'Video Post'],
    mediaConstraints: {
      maxImages: 10,
      maxVideoSizeMB: 200,
      maxDurationSec: 300,
      supportedFormats: ['jpg', 'png', 'mp4'],
    },
    maxLength: 500,
    analytics: {
      supported: true,
      metrics: ['Views', 'Likes', 'Replies', 'Reposts', 'Quotes', 'Follower Count'],
      notes: 'Available via official Threads Publishing API.',
    },
    inboxComments: {
      supported: true,
      replySupported: true,
      notes: 'Threads replies accessible via threads_read_replies and threads_manage_replies.',
    },
    tokenExpiration: 'Long-lived token valid for 60 days with programmatic refresh.',
    rateLimits: '250 published posts per 24 hours.',
    appReviewRequired: true,
    verificationNotes: 'Requires Meta Developer App with Threads use case configured.',
  },

  youtube: {
    identifier: 'youtube',
    displayName: 'YouTube',
    category: 'Video & Streaming',
    oauthFlow: 'OAuth 2.0 Auth Code (Google Identity)',
    requiredScopes: [
      'https://www.googleapis.com/auth/youtube.upload',
      'https://www.googleapis.com/auth/youtube.readonly',
      'https://www.googleapis.com/auth/youtube.force-ssl',
    ],
    supportedAccountTypes: ['YouTube Brand Account', 'Personal Channel'],
    supportedPublishingFormats: ['Standard Video (16:9)', 'YouTube Shorts (9:16 vertical, <=60s)', 'Custom Thumbnails', 'Tags/Category'],
    mediaConstraints: {
      maxImages: 1, // Custom thumbnail
      maxVideoSizeMB: 128000,
      supportedFormats: ['mp4', 'mov', 'avi', 'mkv', 'webm'],
    },
    maxLength: 5000, // Description length
    analytics: {
      supported: true,
      metrics: ['Views', 'Watch Time (minutes)', 'Subscribers Gained', 'Likes', 'Comments', 'Shares'],
      notes: 'Real-time and historic analytics via YouTube Analytics API v2.',
    },
    inboxComments: {
      supported: true,
      replySupported: true,
      notes: 'Comment threads read and reply via youtube.force-ssl scope.',
    },
    tokenExpiration: 'Access token expires in 1 hour; automatically refreshed via Google Refresh Token.',
    rateLimits: '10,000 quota units per day by default (video upload costs 1600 units).',
    appReviewRequired: true,
    verificationNotes: 'Google Cloud OAuth consent screen verification required to remove 100-user limit.',
  },

  tiktok: {
    identifier: 'tiktok',
    displayName: 'TikTok Creator & Personal',
    category: 'Video & Streaming',
    oauthFlow: 'OAuth 2.0 PKCE',
    requiredScopes: ['user.info.basic', 'video.upload', 'video.publish'],
    supportedAccountTypes: ['TikTok Personal Account', 'Creator Account'],
    supportedPublishingFormats: ['Vertical Video (9:16)', 'Title / Caption', 'Cover Image', 'Privacy Controls (Public, Friends, Private)'],
    mediaConstraints: {
      maxImages: 1,
      maxVideoSizeMB: 287,
      maxDurationSec: 600,
      supportedFormats: ['mp4', 'mov', 'webm'],
    },
    maxLength: 2200,
    analytics: {
      supported: true,
      metrics: ['Views', 'Likes', 'Comments', 'Shares', 'Profile Visits'],
      notes: 'Metrics synchronized when granted video.list scope.',
    },
    inboxComments: {
      supported: false,
      replySupported: false,
      notes: 'Direct video comment replies require TikTok Business Suite Account.',
    },
    tokenExpiration: 'Access token valid for 24 hours; refresh token valid for 365 days.',
    rateLimits: 'TikTok Content Posting API rate limit: 10 video uploads per user per day.',
    appReviewRequired: true,
    verificationNotes: 'Requires TikTok Developer Portal app approval for Content Posting API.',
  },

  'tiktok-business': {
    identifier: 'tiktok-business',
    displayName: 'TikTok Business Accounts',
    category: 'Video & Streaming',
    oauthFlow: 'OAuth 2.0 Auth Code',
    requiredScopes: ['business.account.info', 'business.video.publish', 'business.comment.manage', 'business.analytics'],
    supportedAccountTypes: ['TikTok Business Account'],
    supportedPublishingFormats: ['Commercial Video', 'Direct Publish', 'Inbox Comments Management', 'Business Analytics'],
    mediaConstraints: {
      maxImages: 1,
      maxVideoSizeMB: 500,
      maxDurationSec: 600,
      supportedFormats: ['mp4', 'mov'],
    },
    maxLength: 2200,
    analytics: {
      supported: true,
      metrics: ['Video Views', 'Audience Demographics', 'Engagement Rate', 'Profile Views', 'Followers'],
      notes: 'Comprehensive Business Insights via TikTok Commercial API.',
    },
    inboxComments: {
      supported: true,
      replySupported: true,
      notes: 'Business comment moderation, reply, and deletion supported.',
    },
    tokenExpiration: 'Automated token refresh via TikTok Business OAuth flow.',
    rateLimits: 'Tiered according to TikTok Commercial App approval.',
    appReviewRequired: true,
    verificationNotes: 'Requires Business Verification and TikTok Commercial Developer Approval.',
  },

  pinterest: {
    identifier: 'pinterest',
    displayName: 'Pinterest',
    category: 'Social Network',
    oauthFlow: 'OAuth 2.0 Auth Code',
    requiredScopes: ['boards:read', 'pins:read', 'pins:write', 'user_accounts:read'],
    supportedAccountTypes: ['Business Account', 'Creator Account'],
    supportedPublishingFormats: ['Standard Pin (Image)', 'Video Pin', 'Destination URL Link', 'Board Selection'],
    mediaConstraints: {
      maxImages: 1,
      maxVideoSizeMB: 500,
      maxDurationSec: 900,
      supportedFormats: ['jpg', 'png', 'mp4'],
    },
    maxLength: 500, // Description length (Title up to 100)
    analytics: {
      supported: true,
      metrics: ['Impressions', 'Saves (Repins)', 'Pin Clicks', 'Outbound Destination Clicks'],
      notes: 'Available via Pinterest Analytics v5 API.',
    },
    inboxComments: {
      supported: false,
      replySupported: false,
      notes: 'Pinterest v5 API does not offer programmatic comment inbox.',
    },
    tokenExpiration: 'Access token valid for 30 days; refresh token valid for 365 days.',
    rateLimits: '1000 requests per minute overall.',
    appReviewRequired: true,
    verificationNotes: 'Pinterest Developer App must pass trial-to-standard tier review.',
  },

  reddit: {
    identifier: 'reddit',
    displayName: 'Reddit',
    category: 'Blogging & Community',
    oauthFlow: 'OAuth 2.0 Auth Code',
    requiredScopes: ['identity', 'submit', 'read', 'history', 'flair'],
    supportedAccountTypes: ['Reddit User Account', 'Community Moderator Profile'],
    supportedPublishingFormats: ['Self/Text Post (Markdown)', 'Link Post', 'Image Post', 'Video Post', 'Subreddit Flair'],
    mediaConstraints: {
      maxImages: 1,
      maxVideoSizeMB: 100,
      maxDurationSec: 900,
      supportedFormats: ['jpg', 'png', 'gif', 'mp4'],
    },
    maxLength: 40000,
    analytics: {
      supported: true,
      metrics: ['Upvotes (Score)', 'Upvote Ratio', 'Total Comments', 'Post Karma'],
      notes: 'Read directly from public Reddit post metadata.',
    },
    inboxComments: {
      supported: true,
      replySupported: true,
      notes: 'Post comments and direct reply support via Reddit comment API.',
    },
    tokenExpiration: 'Access token valid for 1 hour; permanent refresh token via duration=permanent.',
    rateLimits: '100 queries per minute per authenticated OAuth client.',
    appReviewRequired: false,
    verificationNotes: 'OAuth app registration in Reddit Preferences > Developer Apps.',
  },

  bluesky: {
    identifier: 'bluesky',
    displayName: 'Bluesky (AT Protocol)',
    category: 'Decentralized / Web3',
    oauthFlow: 'API Key / Personal Token', // AT Protocol App Password
    requiredScopes: ['atproto'],
    supportedAccountTypes: ['Bluesky Personal Handle', 'Custom Domain DID Handle'],
    supportedPublishingFormats: ['Skeet Post (Rich Text)', 'Thread / Skeet Chain', 'Image Attachments', 'External Link Cards', 'Alt Text'],
    mediaConstraints: {
      maxImages: 4,
      maxVideoSizeMB: 50,
      maxDurationSec: 60,
      supportedFormats: ['jpg', 'png', 'webp', 'mp4'],
    },
    maxLength: 300,
    analytics: {
      supported: true,
      metrics: ['Likes', 'Reposts', 'Replies', 'Quotes'],
      notes: 'Fetched via AT Protocol com.atproto.repo / app.bsky.feed records.',
    },
    inboxComments: {
      supported: true,
      replySupported: true,
      notes: 'Replies in the thread hierarchy supported via record post references.',
    },
    tokenExpiration: 'JWT session tokens refreshed using AT Protocol com.atproto.server.refreshSession.',
    rateLimits: '5,000 points per hour per IP (very generous decentralized limits).',
    appReviewRequired: false,
    verificationNotes: 'No approval required. User creates an App Password in Bluesky Settings.',
  },

  mastodon: {
    identifier: 'mastodon',
    displayName: 'Mastodon (ActivityPub)',
    category: 'Decentralized / Web3',
    oauthFlow: 'OAuth 2.0 Auth Code',
    requiredScopes: ['read', 'write', 'follow'],
    supportedAccountTypes: ['Federated Instance User (mastodon.social or custom instance)'],
    supportedPublishingFormats: ['Toot / Status Post', 'Thread', 'Image / Video Attachment', 'Content Warning / Spoiler', 'Sensitive Media Flag'],
    mediaConstraints: {
      maxImages: 4,
      maxVideoSizeMB: 40,
      maxDurationSec: 180,
      supportedFormats: ['jpg', 'png', 'gif', 'mp4'],
    },
    maxLength: 500, // Standard default, expandable per instance
    analytics: {
      supported: true,
      metrics: ['Favourites', 'Reblogs (Boosts)', 'Replies'],
      notes: 'Instant status counts via ActivityPub / Mastodon REST API.',
    },
    inboxComments: {
      supported: true,
      replySupported: true,
      notes: 'Status reply threads fully supported.',
    },
    tokenExpiration: 'Bearer token issued per instance; does not expire until explicitly revoked.',
    rateLimits: '300 requests per 5 minutes per user on standard instances.',
    appReviewRequired: false,
    verificationNotes: 'Dynamic App Registration per instance via /api/v1/apps.',
  },

  telegram: {
    identifier: 'telegram',
    displayName: 'Telegram Channels & Groups',
    category: 'Messaging',
    oauthFlow: 'API Key / Personal Token', // Bot Token
    requiredScopes: ['post_messages', 'edit_messages', 'delete_messages'],
    supportedAccountTypes: ['Public Channel', 'Private Channel', 'Supergroup'],
    supportedPublishingFormats: ['Message (HTML / MarkdownV2)', 'Single Photo', 'Photo Album', 'Video', 'Silent Broadcast'],
    mediaConstraints: {
      maxImages: 10,
      maxVideoSizeMB: 50,
      supportedFormats: ['jpg', 'png', 'gif', 'mp4'],
    },
    maxLength: 4096,
    analytics: {
      supported: true,
      metrics: ['Views (Channel Post)', 'Forwards', 'Reaction Counts'],
      notes: 'Available on public channel posts with view count badges.',
    },
    inboxComments: {
      supported: false,
      replySupported: false,
      notes: 'Channel discussion group comments require separate linked chat webhook.',
    },
    tokenExpiration: 'Bot token does not expire unless regenerated in BotFather.',
    rateLimits: '30 messages per second across all chats; 20 messages per minute per single group.',
    appReviewRequired: false,
    verificationNotes: 'Created via @BotFather; Bot must be added as Channel Administrator.',
  },

  discord: {
    identifier: 'discord',
    displayName: 'Discord Webhook & Bot',
    category: 'Messaging',
    oauthFlow: 'OAuth 2.0 Auth Code',
    requiredScopes: ['identify', 'guilds', 'bot', 'webhook.incoming'],
    supportedAccountTypes: ['Guild Text Channel', 'Announcement Channel', 'Forum Channel'],
    supportedPublishingFormats: ['Rich Embed', 'Message Content', 'Media Attachments', 'Thread Creation'],
    mediaConstraints: {
      maxImages: 10,
      maxVideoSizeMB: 25, // Up to 500MB with Nitro Server Boost
      supportedFormats: ['jpg', 'png', 'gif', 'mp4'],
    },
    maxLength: 2000, // 4000 for embed description
    analytics: {
      supported: false,
      notes: 'Discord does not expose post impression analytics for standard messages.',
    },
    inboxComments: {
      supported: true,
      replySupported: true,
      notes: 'Message replies and thread messages via Discord Gateway / REST API.',
    },
    tokenExpiration: 'OAuth token with refresh capability; Webhook token is permanent.',
    rateLimits: '5 requests per second per webhook / channel route.',
    appReviewRequired: false,
    verificationNotes: 'Discord Developer Portal bot or incoming webhook integration.',
  },

  wordpress: {
    identifier: 'wordpress',
    displayName: 'WordPress (Self-Hosted & WP.com)',
    category: 'Blogging & Community',
    oauthFlow: 'API Key / Personal Token', // Application Password
    requiredScopes: ['publish_posts', 'upload_files', 'edit_posts'],
    supportedAccountTypes: ['WordPress Administrator', 'Editor', 'Author'],
    supportedPublishingFormats: ['Blog Post (Gutenberg HTML)', 'Featured Image', 'Categories', 'Tags', 'Excerpt', 'Status (Draft / Published)'],
    mediaConstraints: {
      maxImages: 20,
      maxVideoSizeMB: 200,
      supportedFormats: ['jpg', 'png', 'webp', 'mp4'],
    },
    maxLength: 100000,
    analytics: {
      supported: false,
      notes: 'Site analytics require Jetpack or third-party plugins (e.g. Google Analytics).',
    },
    inboxComments: {
      supported: true,
      replySupported: true,
      notes: 'Post comments managed via standard /wp/v2/comments API.',
    },
    tokenExpiration: 'Application passwords stay valid until revoked in WP User Profile.',
    rateLimits: 'Configured on host web server (Nginx / Apache / Cloudflare).',
    appReviewRequired: false,
    verificationNotes: 'Requires WP REST API enabled and Application Passwords generated in user profile.',
  },

  gmb: {
    identifier: 'gmb',
    displayName: 'Google Business Profile',
    category: 'Professional',
    oauthFlow: 'OAuth 2.0 Auth Code',
    requiredScopes: ['https://www.googleapis.com/auth/business.manage'],
    supportedAccountTypes: ['Verified Business Location', 'Multi-Location Agency'],
    supportedPublishingFormats: ['Local Post (Updates)', 'Offer / Promotion', 'Event Post', 'Call To Action Button (Call, Visit, Book)'],
    mediaConstraints: {
      maxImages: 1,
      maxVideoSizeMB: 75,
      supportedFormats: ['jpg', 'png'],
    },
    maxLength: 1500,
    analytics: {
      supported: true,
      metrics: ['Searches (Direct/Discovery)', 'Views (Maps/Search)', 'Website Clicks', 'Phone Call Clicks', 'Direction Requests'],
      notes: 'Performance metrics via Google Business Profile Performance API.',
    },
    inboxComments: {
      supported: true,
      replySupported: true,
      notes: 'Customer reviews read and reply supported via Review API.',
    },
    tokenExpiration: 'Refreshed automatically via Google OAuth refresh token.',
    rateLimits: 'Google Business Profile quota is allocated per cloud project.',
    appReviewRequired: true,
    verificationNotes: 'Requires Google Business Profile API access request and verification.',
  },

  farcaster: {
    identifier: 'farcaster',
    displayName: 'Farcaster',
    category: 'Decentralized / Web3',
    oauthFlow: 'Cryptographic Keypair', // Neynar Managed Signer or Warpcast QR
    requiredScopes: ['cast.write', 'cast.read'],
    supportedAccountTypes: ['Farcaster Account (FID)', 'Warpcast Verified Profile'],
    supportedPublishingFormats: ['Cast', 'Thread / Sequential Casts', 'Media Embeds', 'Channel Selection (e.g. /founders)'],
    mediaConstraints: {
      maxImages: 2,
      maxVideoSizeMB: 50,
      supportedFormats: ['jpg', 'png', 'gif', 'mp4'],
    },
    maxLength: 320,
    analytics: {
      supported: true,
      metrics: ['Likes', 'Recasts', 'Replies'],
      notes: 'Synchronized via Neynar / Hubble Hub indexers.',
    },
    inboxComments: {
      supported: true,
      replySupported: true,
      notes: 'Thread reply casts supported on-chain / on-hub.',
    },
    tokenExpiration: 'Signer key valid permanently unless removed from account on-chain.',
    rateLimits: 'Subject to hub gossip protocol and Neynar API subscription tier.',
    appReviewRequired: false,
    verificationNotes: 'Neynar API Key and App FID required for sponsored managed signer.',
  },

  medium: {
    identifier: 'medium',
    displayName: 'Medium',
    category: 'Blogging & Community',
    oauthFlow: 'API Key / Personal Token', // Integration Token
    requiredScopes: ['basicProfile', 'publishPost'],
    supportedAccountTypes: ['Medium Author Account', 'Publication Contributor'],
    supportedPublishingFormats: ['Story (HTML / Markdown)', 'Canonical URL', 'Tags (up to 5)', 'License Mode'],
    mediaConstraints: {
      maxImages: 10,
      maxVideoSizeMB: 0, // Video must be embedded via URL
      supportedFormats: ['jpg', 'png', 'gif'],
    },
    maxLength: 50000,
    analytics: {
      supported: false,
      notes: 'Medium does not offer a public API endpoint for story claps/views.',
    },
    inboxComments: {
      supported: false,
      replySupported: false,
      notes: 'Responses to stories are not exposed via Medium Public API.',
    },
    tokenExpiration: 'Integration tokens are permanent until regenerated in Settings.',
    rateLimits: 'Medium enforces a daily publishing limit (typically 30 posts per day).',
    appReviewRequired: false,
    verificationNotes: 'User generates an Integration Token in Medium Settings > Security.',
  },

  devto: {
    identifier: 'devto',
    displayName: 'Dev.to (Forem)',
    category: 'Blogging & Community',
    oauthFlow: 'API Key / Personal Token',
    requiredScopes: ['api:write'],
    supportedAccountTypes: ['Dev.to Member Account', 'Organization Contributor'],
    supportedPublishingFormats: ['Technical Article (Markdown + Frontmatter)', 'Cover Image', 'Tags (up to 4)', 'Canonical URL', 'Series Name'],
    mediaConstraints: {
      maxImages: 5,
      maxVideoSizeMB: 0,
      supportedFormats: ['jpg', 'png'],
    },
    maxLength: 50000,
    analytics: {
      supported: true,
      metrics: ['Reactions (Unicorns, Hearts)', 'Comments Count', 'Views (if API key has analytics scope)'],
      notes: 'Fetched via /api/articles/me.',
    },
    inboxComments: {
      supported: false,
      replySupported: false,
      notes: 'Dev.to comments read-only via API.',
    },
    tokenExpiration: 'Dev.to API key remains valid until explicitly revoked.',
    rateLimits: '30 requests per 30 seconds.',
    appReviewRequired: false,
    verificationNotes: 'User obtains API Key in Dev.to Settings > Extensions > DEV Community API Keys.',
  },

  tumblr: {
    identifier: 'tumblr',
    displayName: 'Tumblr',
    category: 'Blogging & Community',
    oauthFlow: 'OAuth 1.0a',
    requiredScopes: ['basic', 'write'],
    supportedAccountTypes: ['Tumblr Primary Blog', 'Secondary Blog'],
    supportedPublishingFormats: ['Text Post (HTML / Markdown)', 'Photo Post', 'Video Post', 'Tags', 'Custom URL Slug'],
    mediaConstraints: {
      maxImages: 10,
      maxVideoSizeMB: 100,
      supportedFormats: ['jpg', 'png', 'gif', 'mp4'],
    },
    maxLength: 10000,
    analytics: {
      supported: true,
      metrics: ['Notes Count (Likes + Reblogs)'],
      notes: 'Retrieved from Tumblr API v2 post response.',
    },
    inboxComments: {
      supported: false,
      replySupported: false,
      notes: 'Tumblr replies and asks are not open in standard API.',
    },
    tokenExpiration: 'OAuth 1.0a token does not expire unless revoked.',
    rateLimits: '250 posts per day, 5,000 requests per day.',
    appReviewRequired: false,
    verificationNotes: 'Requires Tumblr Application registration at tumblr.com/oauth/apps.',
  },

  dribbble: {
    identifier: 'dribbble',
    displayName: 'Dribbble',
    category: 'Professional',
    oauthFlow: 'OAuth 2.0 Auth Code',
    requiredScopes: ['public', 'upload'],
    supportedAccountTypes: ['Dribbble Pro', 'Designer Account'],
    supportedPublishingFormats: ['Shot (Static Image / Animated GIF)', 'Title', 'Description', 'Tags'],
    mediaConstraints: {
      maxImages: 1,
      maxVideoSizeMB: 20,
      supportedFormats: ['jpg', 'png', 'gif'],
    },
    maxLength: 2000,
    analytics: {
      supported: true,
      metrics: ['Views', 'Likes', 'Comments', 'Buckets'],
      notes: 'Retrieved via Dribbble API v2 shots endpoint.',
    },
    inboxComments: {
      supported: false,
      replySupported: false,
      notes: 'Comments on shots are read-only.',
    },
    tokenExpiration: 'Access token valid until revoked.',
    rateLimits: '60 requests per minute.',
    appReviewRequired: true,
    verificationNotes: 'Requires Dribbble Pro / Team account and developer application approval.',
  },

  hashnode: {
    identifier: 'hashnode',
    displayName: 'Hashnode',
    category: 'Blogging & Community',
    oauthFlow: 'API Key / Personal Token',
    requiredScopes: [],
    supportedAccountTypes: ['Hashnode Publication / Blog'],
    supportedPublishingFormats: ['Article / Publication Post', 'Markdown Body', 'Cover Image', 'Tags'],
    mediaConstraints: {
      maxImages: 20,
      maxVideoSizeMB: 100,
      supportedFormats: ['jpg', 'png', 'webp', 'gif'],
    },
    maxLength: 10000,
    analytics: {
      supported: true,
      metrics: ['Views', 'Reactions'],
      notes: 'Publication analytics API',
    },
    inboxComments: {
      supported: false,
      replySupported: false,
      notes: 'Comments handled on Hashnode blog',
    },
    tokenExpiration: 'Personal Access Token does not expire unless revoked.',
    rateLimits: 'Lenient GraphQL publishing rate limits.',
    appReviewRequired: false,
    verificationNotes: 'Requires Personal Access Token from Hashnode Developer Settings.',
  },

  slack: {
    identifier: 'slack',
    displayName: 'Slack',
    category: 'Messaging',
    oauthFlow: 'OAuth 2.0 Auth Code',
    requiredScopes: ['channels:read', 'chat:write', 'users:read', 'groups:read', 'channels:join', 'chat:write.customize'],
    supportedAccountTypes: ['Slack Workspace', 'Public / Private Channel'],
    supportedPublishingFormats: ['Channel Message', 'Block Kit Elements', 'Image Attachment'],
    mediaConstraints: {
      maxImages: 5,
      maxVideoSizeMB: 0,
      supportedFormats: ['jpg', 'png', 'gif'],
    },
    maxLength: 40000,
    analytics: {
      supported: false,
      notes: 'Slack does not provide message view counts via bot API.',
    },
    inboxComments: {
      supported: false,
      replySupported: false,
      notes: 'Direct thread reply bot.',
    },
    tokenExpiration: 'OAuth token remains valid until bot is removed or uninstalled.',
    rateLimits: 'Slack Tier 3/4 rate limits (approx 50-100 requests per minute).',
    appReviewRequired: false,
    verificationNotes: 'Requires Slack App with incoming webhook / bot scopes in Slack API console.',
  },

  kick: {
    identifier: 'kick',
    displayName: 'Kick',
    category: 'Video & Streaming',
    oauthFlow: 'OAuth 2.0 PKCE',
    requiredScopes: ['chat:write', 'user:read', 'channel:read'],
    supportedAccountTypes: ['Streamer Channel'],
    supportedPublishingFormats: ['Chat Message', 'Stream Announcement'],
    mediaConstraints: {
      maxImages: 0,
      maxVideoSizeMB: 0,
      supportedFormats: [],
    },
    maxLength: 500,
    analytics: {
      supported: false,
      notes: 'Chat messages do not have individual view metrics.',
    },
    inboxComments: {
      supported: false,
      replySupported: false,
    },
    tokenExpiration: 'Access token valid for 2 hours, auto-refreshed via refresh token.',
    rateLimits: 'Strict streamer chat rate limits.',
    appReviewRequired: false,
    verificationNotes: 'Requires Kick Developer Portal client registration.',
  },

  twitch: {
    identifier: 'twitch',
    displayName: 'Twitch',
    category: 'Video & Streaming',
    oauthFlow: 'OAuth 2.0 Auth Code',
    requiredScopes: ['user:write:chat', 'user:read:chat', 'moderator:manage:announcements'],
    supportedAccountTypes: ['Twitch Channel / Creator'],
    supportedPublishingFormats: ['Channel Chat Message', 'Stream Announcement'],
    mediaConstraints: {
      maxImages: 0,
      maxVideoSizeMB: 0,
      supportedFormats: [],
    },
    maxLength: 500,
    analytics: {
      supported: false,
      notes: 'Chat announcement messages do not have individual analytics.',
    },
    inboxComments: {
      supported: false,
      replySupported: false,
    },
    tokenExpiration: 'Access token valid for 4 hours, auto-refreshed via refresh token.',
    rateLimits: 'Twitch Helix API limits (800 points / minute).',
    appReviewRequired: false,
    verificationNotes: 'Requires Twitch Developer Console application with redirect URI.',
  },

  nostr: {
    identifier: 'nostr',
    displayName: 'Nostr',
    category: 'Decentralized / Web3',
    oauthFlow: 'Cryptographic Keypair',
    requiredScopes: [],
    supportedAccountTypes: ['Nostr Public Key / npub'],
    supportedPublishingFormats: ['Kind 1 Short Text Note', 'Image URL Embed'],
    mediaConstraints: {
      maxImages: 4,
      maxVideoSizeMB: 50,
      supportedFormats: ['jpg', 'png', 'gif', 'mp4'],
    },
    maxLength: 100000,
    analytics: {
      supported: true,
      metrics: ['Zaps', 'Reposts', 'Replies', 'Reactions'],
      notes: 'Calculated across configured relay pool.',
    },
    inboxComments: {
      supported: false,
      replySupported: false,
    },
    tokenExpiration: 'Cryptographic private key (nsec / HEX) does not expire.',
    rateLimits: 'Relay-dependent rate limits.',
    appReviewRequired: false,
    verificationNotes: 'Direct cryptographic signing to relay pool (wss://nos.lol, wss://relay.damus.io, etc.).',
  },

  vk: {
    identifier: 'vk',
    displayName: 'VKontakte (VK)',
    category: 'Social Network',
    oauthFlow: 'OAuth 2.0 Auth Code',
    requiredScopes: ['vkid.personal_info', 'email', 'wall', 'status', 'docs', 'photos', 'video'],
    supportedAccountTypes: ['User Profile', 'Community Wall'],
    supportedPublishingFormats: ['Wall Post', 'Photo Attachments', 'Video Attachments'],
    mediaConstraints: {
      maxImages: 10,
      maxVideoSizeMB: 200,
      supportedFormats: ['jpg', 'png', 'gif', 'mp4'],
    },
    maxLength: 2048,
    analytics: {
      supported: true,
      metrics: ['Views', 'Likes', 'Reposts', 'Comments'],
      notes: 'VK Wall API post metrics.',
    },
    inboxComments: {
      supported: true,
      replySupported: true,
      notes: 'Wall comments supported.',
    },
    tokenExpiration: 'Access token refreshed using VK ID token endpoint.',
    rateLimits: 'VK API 3 requests per second per token.',
    appReviewRequired: false,
    verificationNotes: 'Requires VK ID developer application registration.',
  },

  whop: {
    identifier: 'whop',
    displayName: 'Whop',
    category: 'Blogging & Community',
    oauthFlow: 'OAuth 2.0 PKCE',
    requiredScopes: ['openid', 'profile', 'email', 'forum:post:create', 'forum:read', 'company:basic:read'],
    supportedAccountTypes: ['Whop Creator Store', 'Whop Company Community'],
    supportedPublishingFormats: ['Forum Topic / Post', 'Markdown Body', 'Image Attachments'],
    mediaConstraints: {
      maxImages: 10,
      maxVideoSizeMB: 100,
      supportedFormats: ['jpg', 'png', 'webp', 'gif'],
    },
    maxLength: 50000,
    analytics: {
      supported: false,
      notes: 'Whop forum view analytics not provided by public API.',
    },
    inboxComments: {
      supported: false,
      replySupported: false,
    },
    tokenExpiration: 'Access token refreshed automatically via OAuth 2.0 refresh token.',
    rateLimits: 'Whop API rate limits per creator token.',
    appReviewRequired: false,
    verificationNotes: 'Requires Whop Developer Portal app registration.',
  },

  skool: {
    identifier: 'skool',
    displayName: 'Skool',
    category: 'Blogging & Community',
    oauthFlow: 'Cookie Session / Extension',
    requiredScopes: [],
    supportedAccountTypes: ['Skool Group Member / Admin'],
    supportedPublishingFormats: ['Community Post', 'Group Discussion', 'Image Attachments'],
    mediaConstraints: {
      maxImages: 10,
      maxVideoSizeMB: 50,
      supportedFormats: ['jpg', 'png', 'gif'],
    },
    maxLength: 10000,
    analytics: {
      supported: false,
      notes: 'Skool does not offer external analytics endpoints.',
    },
    inboxComments: {
      supported: false,
      replySupported: false,
    },
    tokenExpiration: 'Cookie session valid until browser logout or session expiry on Skool.',
    rateLimits: 'Browser session pacing to avoid bot detection.',
    appReviewRequired: false,
    verificationNotes: 'Connected securely via PulseSocial Chrome Companion Extension with AES at-rest encryption.',
  },

  lemmy: {
    identifier: 'lemmy',
    displayName: 'Lemmy',
    category: 'Decentralized / Web3',
    oauthFlow: 'API Key / Personal Token',
    requiredScopes: [],
    supportedAccountTypes: ['Lemmy Fediverse Account'],
    supportedPublishingFormats: ['Community Post', 'Link Post', 'Markdown Text'],
    mediaConstraints: {
      maxImages: 1,
      maxVideoSizeMB: 20,
      supportedFormats: ['jpg', 'png', 'webp'],
    },
    maxLength: 10000,
    analytics: {
      supported: true,
      metrics: ['Score', 'Upvotes', 'Downvotes', 'Comments'],
      notes: 'Lemmy API post score.',
    },
    inboxComments: {
      supported: false,
      replySupported: false,
    },
    tokenExpiration: 'JWT token valid according to instance policy.',
    rateLimits: 'Instance-specific rate limits.',
    appReviewRequired: false,
    verificationNotes: 'Requires Lemmy instance URL, username, and password/JWT.',
  },

  listmonk: {
    identifier: 'listmonk',
    displayName: 'ListMonk',
    category: 'Messaging',
    oauthFlow: 'API Key / Personal Token',
    requiredScopes: [],
    supportedAccountTypes: ['ListMonk Admin / Campaign Manager'],
    supportedPublishingFormats: ['Email Campaign', 'HTML Newsletter', 'Inline Media'],
    mediaConstraints: {
      maxImages: 20,
      maxVideoSizeMB: 25,
      supportedFormats: ['jpg', 'png', 'gif'],
    },
    maxLength: 100000000,
    analytics: {
      supported: true,
      metrics: ['Sent', 'Opens', 'Clicks', 'Bounces'],
      notes: 'ListMonk campaign analytics.',
    },
    inboxComments: {
      supported: false,
      replySupported: false,
    },
    tokenExpiration: 'API credentials valid until revoked.',
    rateLimits: 'Self-hosted instance dependent.',
    appReviewRequired: false,
    verificationNotes: 'Requires ListMonk instance URL, username, and API token.',
  },

  mewe: {
    identifier: 'mewe',
    displayName: 'MeWe',
    category: 'Social Network',
    oauthFlow: 'API Key / Personal Token',
    requiredScopes: [],
    supportedAccountTypes: ['User Profile', 'Group / Page'],
    supportedPublishingFormats: ['Feed Post', 'Image Attachments', 'Link Embed'],
    mediaConstraints: {
      maxImages: 10,
      maxVideoSizeMB: 50,
      supportedFormats: ['jpg', 'png', 'gif'],
    },
    maxLength: 63206,
    analytics: {
      supported: false,
      notes: 'MeWe does not expose public post impression analytics.',
    },
    inboxComments: {
      supported: false,
      replySupported: false,
    },
    tokenExpiration: 'Bearer token refreshed via MeWe auth endpoint.',
    rateLimits: 'MeWe platform rate limits.',
    appReviewRequired: false,
    verificationNotes: 'Requires MeWe App ID and API Key.',
  },

  moltbook: {
    identifier: 'moltbook',
    displayName: 'Moltbook',
    category: 'Decentralized / Web3',
    oauthFlow: 'API Key / Personal Token',
    requiredScopes: [],
    supportedAccountTypes: ['Autonomous Agent Account'],
    supportedPublishingFormats: ['Short Text', 'Agent Broadcast'],
    mediaConstraints: {
      maxImages: 0,
      maxVideoSizeMB: 0,
      supportedFormats: [],
    },
    maxLength: 300,
    analytics: {
      supported: false,
      notes: 'Moltbook agent claims.',
    },
    inboxComments: {
      supported: false,
      replySupported: false,
    },
    tokenExpiration: 'Agent API Key valid until regenerated.',
    rateLimits: '100 requests per minute.',
    appReviewRequired: false,
    verificationNotes: 'Created via automated agent registration and claim URL workflow.',
  },

  'instagram-standalone': {
    identifier: 'instagram-standalone',
    displayName: 'Instagram (Standalone OAuth)',
    category: 'Social Network',
    oauthFlow: 'OAuth 2.0 Auth Code',
    requiredScopes: [
      'instagram_business_basic',
      'instagram_business_content_publish',
      'instagram_business_manage_comments',
      'instagram_business_manage_insights',
    ],
    supportedAccountTypes: ['Instagram Creator', 'Instagram Business Account'],
    supportedPublishingFormats: ['Photo Post', 'Carousel (10)', 'Reels Video', 'Story'],
    mediaConstraints: {
      maxImages: 10,
      maxVideoSizeMB: 100,
      maxDurationSec: 900,
      supportedFormats: ['jpg', 'png', 'mp4'],
    },
    maxLength: 2200,
    analytics: {
      supported: true,
      metrics: ['Impressions', 'Reach', 'Saves', 'Profile Visits', 'Video Views'],
      notes: 'Instagram Insights API.',
    },
    inboxComments: {
      supported: true,
      replySupported: true,
      notes: 'Instagram Comments & Direct APIs.',
    },
    tokenExpiration: '60-day long-lived user access token, auto-refreshed via cron.',
    rateLimits: '50 publish calls per 24 hours per Instagram account.',
    appReviewRequired: true,
    verificationNotes: 'Requires Meta for Developers App review for Instagram Graph API.',
  },

  'mastodon-custom': {
    identifier: 'mastodon-custom',
    displayName: 'Custom Mastodon Instance',
    category: 'Decentralized / Web3',
    oauthFlow: 'OAuth 2.0 Auth Code',
    requiredScopes: ['read', 'write', 'push'],
    supportedAccountTypes: ['Custom Instance Account'],
    supportedPublishingFormats: ['Status (Toot)', 'Media Attachments', 'Content Warning / CW'],
    mediaConstraints: {
      maxImages: 4,
      maxVideoSizeMB: 40,
      supportedFormats: ['jpg', 'png', 'gif', 'mp4'],
    },
    maxLength: 500,
    analytics: {
      supported: true,
      metrics: ['Favourites', 'Reblogs', 'Replies'],
      notes: 'Mastodon status context API.',
    },
    inboxComments: {
      supported: true,
      replySupported: true,
      notes: 'Status replies.',
    },
    tokenExpiration: 'Bearer token remains valid indefinitely.',
    rateLimits: '300 requests per 5 minutes per user.',
    appReviewRequired: false,
    verificationNotes: 'Dynamic Client Registration (DCR) via instance /api/v1/apps.',
  },
};

/**
 * Returns capability specification for a given provider identifier.
 */
export function getProviderCapabilities(identifier: string): ProviderCapability | undefined {
  return PROVIDER_CAPABILITY_MATRIX[identifier.toLowerCase()];
}

/**
 * Validates whether a feature is supported by a provider.
 */
export function isProviderFeatureSupported(
  identifier: string,
  feature: 'analytics' | 'comments' | 'threads' | 'video'
): boolean {
  const cap = getProviderCapabilities(identifier);
  if (!cap) return false;
  switch (feature) {
    case 'analytics':
      return cap.analytics.supported;
    case 'comments':
      return cap.inboxComments.supported;
    case 'threads':
      return cap.supportedPublishingFormats.some((f) => f.toLowerCase().includes('thread'));
    case 'video':
      return cap.mediaConstraints.maxVideoSizeMB > 0;
    default:
      return false;
  }
}
