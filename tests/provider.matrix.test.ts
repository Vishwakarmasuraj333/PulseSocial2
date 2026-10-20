import { describe, it, expect } from 'vitest';
import { PROVIDER_CAPABILITY_MATRIX } from '../libraries/nestjs-libraries/src/integrations/social/provider.capability.matrix';

describe('PulseSocial Social Provider Capability Matrix', () => {
  it('should contain all major and secondary social providers', () => {
    const keys = Object.keys(PROVIDER_CAPABILITY_MATRIX);
    expect(keys.length).toBeGreaterThanOrEqual(35);
    expect(keys).toContain('x');
    expect(keys).toContain('linkedin');
    expect(keys).toContain('linkedin-page');
    expect(keys).toContain('facebook');
    expect(keys).toContain('instagram');
    expect(keys).toContain('youtube');
    expect(keys).toContain('tiktok');
    expect(keys).toContain('threads');
    expect(keys).toContain('pinterest');
    expect(keys).toContain('reddit');
    expect(keys).toContain('bluesky');
    expect(keys).toContain('mastodon');
    expect(keys).toContain('telegram');
    expect(keys).toContain('discord');
    expect(keys).toContain('slack');
    expect(keys).toContain('hashnode');
    expect(keys).toContain('nostr');
  });

  it('should validate exact character limits per platform specification', () => {
    expect(PROVIDER_CAPABILITY_MATRIX.x.maxLength).toBe(280);
    expect(PROVIDER_CAPABILITY_MATRIX.threads.maxLength).toBe(500);
    expect(PROVIDER_CAPABILITY_MATRIX.bluesky.maxLength).toBe(300);
    expect(PROVIDER_CAPABILITY_MATRIX.mastodon.maxLength).toBe(500);
    expect(PROVIDER_CAPABILITY_MATRIX.linkedin.maxLength).toBe(3000);
    expect(PROVIDER_CAPABILITY_MATRIX['linkedin-page'].maxLength).toBe(3000);
    expect(PROVIDER_CAPABILITY_MATRIX.facebook.maxLength).toBe(63206);
    expect(PROVIDER_CAPABILITY_MATRIX.instagram.maxLength).toBe(2200);
    expect(PROVIDER_CAPABILITY_MATRIX.pinterest.maxLength).toBe(500);
    expect(PROVIDER_CAPABILITY_MATRIX.slack.maxLength).toBe(40000);
    expect(PROVIDER_CAPABILITY_MATRIX.kick.maxLength).toBe(500);
  });

  it('should enforce valid OAuth flows and required scopes for all providers', () => {
    for (const [id, provider] of Object.entries(PROVIDER_CAPABILITY_MATRIX)) {
      expect(provider.identifier).toBe(id);
      expect(provider.displayName).toBeTruthy();
      expect(provider.category).toBeTruthy();
      expect(provider.oauthFlow).toBeTruthy();
      expect(Array.isArray(provider.requiredScopes)).toBe(true);
      expect(Array.isArray(provider.supportedAccountTypes)).toBe(true);
      expect(provider.supportedAccountTypes.length).toBeGreaterThan(0);
      expect(Array.isArray(provider.supportedPublishingFormats)).toBe(true);
      expect(provider.mediaConstraints).toBeDefined();
      expect(provider.mediaConstraints.maxImages).toBeGreaterThanOrEqual(0);
      if (provider.mediaConstraints.maxImages > 0) {
        expect(provider.mediaConstraints.supportedFormats.length).toBeGreaterThan(0);
      }
    }
  });

  it('should specify genuine analytics capabilities without fabrication', () => {
    expect(PROVIDER_CAPABILITY_MATRIX.x.analytics.supported).toBe(true);
    expect(PROVIDER_CAPABILITY_MATRIX.linkedin.analytics.supported).toBe(true);
    expect(PROVIDER_CAPABILITY_MATRIX.facebook.analytics.supported).toBe(true);
    expect(PROVIDER_CAPABILITY_MATRIX.instagram.analytics.supported).toBe(true);
    expect(PROVIDER_CAPABILITY_MATRIX.youtube.analytics.supported).toBe(true);
    expect(PROVIDER_CAPABILITY_MATRIX.telegram.analytics.supported).toBe(true);
    // Providers without official analytics APIs should honestly state supported: false
    expect(PROVIDER_CAPABILITY_MATRIX.medium.analytics.supported).toBe(false);
    expect(PROVIDER_CAPABILITY_MATRIX.discord.analytics.supported).toBe(false);
  });

  it('should specify genuine inbox capabilities without fake replies', () => {
    expect(PROVIDER_CAPABILITY_MATRIX.facebook.inboxComments.supported).toBe(true);
    expect(PROVIDER_CAPABILITY_MATRIX.instagram.inboxComments.supported).toBe(true);
    expect(PROVIDER_CAPABILITY_MATRIX.youtube.inboxComments.supported).toBe(true);
    // Platforms without public comment inbox APIs must be marked supported: false
    expect(PROVIDER_CAPABILITY_MATRIX.pinterest.inboxComments.supported).toBe(false);
  });
});
