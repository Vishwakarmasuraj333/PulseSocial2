import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { APP_NAME, COMPANY_NAME, LEAD_DEVELOPER } from '../libraries/helpers/src/utils/is.general.server.side';

describe('PulseSocial Brand Identity & License Compliance', () => {
  it('should verify core PulseSocial brand identity constants', () => {
    expect(APP_NAME).toBe('PulseSocial');
    expect(COMPANY_NAME).toBe('Pulse Media Global');
    expect(LEAD_DEVELOPER).toBe('Suraj Vishwakarma');
  });

  it('should verify root package.json branding and attribution', () => {
    const pkgPath = path.resolve(__dirname, '../package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    expect(pkg.name).toBe('pulsesocial');
    expect(pkg.description).toContain('PulseSocial');
    expect(pkg.author).toContain('Suraj Vishwakarma');
    expect(pkg.license).toBe('AGPL-3.0');
  });

  it('should verify NOTICE.md existence and required AGPL-3.0 attribution', () => {
    const noticePath = path.resolve(__dirname, '../NOTICE.md');
    expect(fs.existsSync(noticePath)).toBe(true);
    const noticeContent = fs.readFileSync(noticePath, 'utf-8');
    expect(noticeContent).toContain('PulseSocial');
    expect(noticeContent).toContain('Pulse Media Global');
    expect(noticeContent).toContain('Suraj Vishwakarma');
    expect(noticeContent).toContain('Postiz');
    expect(noticeContent).toContain('AGPL-3.0');
    expect(noticeContent).toContain('Section 13');
  });

  it('should verify vector SVG logo branding assets exist', () => {
    const logoSvg = path.resolve(__dirname, '../apps/frontend/public/logo.svg');
    const logoTextSvg = path.resolve(__dirname, '../apps/frontend/public/logo-text.svg');
    expect(fs.existsSync(logoSvg)).toBe(true);
    expect(fs.existsSync(logoTextSvg)).toBe(true);

    const logoContent = fs.readFileSync(logoSvg, 'utf-8');
    expect(logoContent).toContain('<svg');
    expect(logoContent).toContain('pulseAccent');

    const logoTextContent = fs.readFileSync(logoTextSvg, 'utf-8');
    expect(logoTextContent).toContain('Pulse');
    expect(logoTextContent).toContain('Social');
    expect(logoTextContent).toContain('PULSE MEDIA GLOBAL');
  });
});
