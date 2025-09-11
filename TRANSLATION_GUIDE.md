# Translation System Setup Guide

This guide shows how to use the instant language switching system that has been set up for your Wallet7 application.

## Files Created:

1. **Translation JSON Files:**
   - `/locales/en/landing.json` - English translations
   - `/locales/ml/landing.json` - Malayalam translations

2. **Translation Hooks:**
   - `/src/hooks/useTranslation.ts` - Main translation hook and language switching

3. **Language Switcher Component:**
   - `/src/components/shared/LanguageSwitcher.tsx` - UI component for switching languages

## How to Use:

### In Components:

```typescript
import { useTranslation } from '@/hooks/useTranslation';

function MyComponent() {
  const { t } = useTranslation('landing'); // 'landing' is the namespace

  return (
    <div>
      <h1>{t('navigation.features')}</h1>
      <p>{t('hero.subtitle')}</p>
    </div>
  );
}
```

### Adding the Language Switcher:

```typescript
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';

// Toggle style (current implementation)
<LanguageSwitcher variant="toggle" />

// Dropdown style
<LanguageSwitcher variant="dropdown" />
```

## Key Features:

✅ **Instant Switching:** No page reloads - translations update immediately
✅ **Persistent Preference:** Language choice saved in localStorage
✅ **Fallback Support:** Falls back to English if translation missing
✅ **Global Sync:** Language changes propagate across all components
✅ **Cache System:** Translations are cached for performance

## Adding More Languages:

1. Create new folder in `/locales/` (e.g., `/locales/hi/`)
2. Add translation JSON files with same structure
3. Update the `SupportedLocale` type in `/src/hooks/useTranslation.ts`
4. Add language option to the LanguageSwitcher component

## Translation File Structure:

```json
{
  "navigation": {
    "features": "Features",
    "forOrganizers": "For Organizers"
  },
  "hero": {
    "title": "Digital WALLET7 Management Platform",
    "subtitle": "Organize and manage...",
    "buttons": {
      "startAsOrganizer": "Start as Organizer"
    }
  }
}
```

## Currently Translated Sections:

- ✅ Navigation menu
- ✅ Hero section (tagline, title, subtitle, features, buttons, notice, demo content)

## Next Steps:

To add translations to more sections:

1. Add translation keys to both `/locales/en/landing.json` and `/locales/ml/landing.json`
2. Import `useTranslation` hook in the component
3. Replace hardcoded text with `t('your.translation.key')`

## Example - Adding Features Section:

1. Add to translation files:

```json
{
  "features": {
    "title": "Everything you need for successful Wallet7s",
    "subtitle": "Comprehensive tools to organize...",
    "items": {
      "groupManagement": {
        "title": "Group Management",
        "description": "Create and manage Wallet7 groups..."
      }
    }
  }
}
```

2. Update component:

```typescript
function FeaturesSection() {
  const { t } = useTranslation('landing');

  return (
    <div>
      <h2>{t('features.title')}</h2>
      <p>{t('features.subtitle')}</p>
      <h3>{t('features.items.groupManagement.title')}</h3>
      <p>{t('features.items.groupManagement.description')}</p>
    </div>
  );
}
```
