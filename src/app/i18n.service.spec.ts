import { describe, it, expect } from 'vitest';
import { I18nService } from './i18n.service';

describe('I18nService', () => {
  it('should provide default translations for en', () => {
    const service = new I18nService();
    const t = service.t;
    expect(t()('nav.overview')).toBeDefined();
    expect(t()('nav.blog')).toBeDefined();
    expect(t()('nav.readme')).toBeDefined();
  });

  it('should switch language', () => {
    const service = new I18nService();
    service.setLanguage('de');
    expect(service.currentLanguage()).toBe('de');
  });

  it('should have available languages', () => {
    const service = new I18nService();
    expect(service.availableLanguages.length).toBeGreaterThan(0);
  });
});
