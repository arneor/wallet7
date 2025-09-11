// src/hooks/useTranslation.ts
import { useState, useEffect, useCallback } from 'react';

type SupportedLocale = 'en' | 'ml';

interface TranslationData {
  [key: string]: any;
}

interface UseTranslationReturn {
  t: (key: string) => string;
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  isLoading: boolean;
  translations: TranslationData;
}

// Cache for loaded translations
const translationCache: Record<string, TranslationData> = {};

// Get nested value from object using dot notation
function getNestedValue(obj: any, path: string): string {
  return (
    path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : null;
    }, obj) || path
  );
}

// Load translation file
async function loadTranslation(
  locale: SupportedLocale,
  namespace: string
): Promise<TranslationData> {
  const cacheKey = `${locale}-${namespace}`;

  if (translationCache[cacheKey]) {
    return translationCache[cacheKey];
  }

  try {
    console.log(`Loading translation: /locales/${locale}/${namespace}.json`);
    const response = await fetch(`/locales/${locale}/${namespace}.json`);
    if (!response.ok) {
      throw new Error(
        `Failed to load translation: ${locale}/${namespace} - Status: ${response.status}`
      );
    }
    const data = await response.json();
    console.log(`Translation loaded for ${locale}/${namespace}:`, data);
    translationCache[cacheKey] = data;
    return data;
  } catch (error) {
    console.error('Translation loading error:', error);
    // Fallback to English if available
    if (locale !== 'en') {
      console.log(`Falling back to English for ${namespace}`);
      return loadTranslation('en', namespace);
    }
    return {};
  }
}

export function useTranslation(
  namespace: string = 'landing'
): UseTranslationReturn {
  const [locale, setLocaleState] = useState<SupportedLocale>('en'); // Always start with 'en' for SSR
  const [translations, setTranslations] = useState<TranslationData>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted flag and load initial locale from localStorage
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('wallet7-locale');
      console.log('Initial locale from localStorage:', stored);
      const initialLocale = (stored as SupportedLocale) || 'en';
      setLocaleState(initialLocale);
    }
  }, []);

  // Listen for locale changes from other components
  useEffect(() => {
    const handleLocaleChange = (event: CustomEvent) => {
      console.log('Locale change event received:', event.detail);
      setLocaleState(event.detail);
      // Clear translations to force reload
      setTranslations({});
      setIsLoading(true);
    };

    window.addEventListener(
      'locale-change',
      handleLocaleChange as EventListener
    );
    return () => {
      window.removeEventListener(
        'locale-change',
        handleLocaleChange as EventListener
      );
    };
  }, []);

  // Load translations when locale or namespace changes
  useEffect(() => {
    let isCancelled = false;

    const loadTranslations = async () => {
      setIsLoading(true);
      try {
        const data = await loadTranslation(locale, namespace);
        if (!isCancelled) {
          setTranslations(data);
        }
      } catch (error) {
        console.error('Failed to load translations:', error);
        if (!isCancelled) {
          setTranslations({});
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    loadTranslations();

    return () => {
      isCancelled = true;
    };
  }, [locale, namespace]);

  const setLocale = useCallback(
    (newLocale: SupportedLocale) => {
      console.log(`Setting locale from ${locale} to ${newLocale}`);
      setLocaleState(newLocale);
      if (typeof window !== 'undefined') {
        localStorage.setItem('wallet7-locale', newLocale);
        // Clear translation cache for the new locale to force fresh load
        Object.keys(translationCache).forEach((key) => {
          if (key.startsWith(`${newLocale}-`)) {
            delete translationCache[key];
          }
        });
      }
    },
    [locale]
  );

  // Translation function
  const t = useCallback(
    (key: string): string => {
      if (!translations || Object.keys(translations).length === 0) {
        console.warn(`Translations not loaded yet for key: ${key}`);
        return key;
      }

      const value = getNestedValue(translations, key);
      if (value === null || value === key) {
        console.warn(
          `Translation missing for key: ${key} in locale: ${locale}`
        );
      }
      return typeof value === 'string' ? value : key;
    },
    [translations, locale]
  );

  return {
    t,
    locale,
    setLocale,
    isLoading,
    translations,
  };
}

// Hook for language switching
export function useLanguageSwitch() {
  const [locale, setLocaleState] = useState<SupportedLocale>('en'); // Always start with 'en' for SSR

  // Load initial locale from localStorage after mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('wallet7-locale');
      const initialLocale = (stored as SupportedLocale) || 'en';
      setLocaleState(initialLocale);
    }
  }, []);

  const setLocale = useCallback((newLocale: SupportedLocale) => {
    console.log(`useLanguageSwitch: Setting locale to ${newLocale}`);
    setLocaleState(newLocale);
    if (typeof window !== 'undefined') {
      localStorage.setItem('wallet7-locale', newLocale);
      console.log('Locale saved to localStorage:', newLocale);

      // Trigger a custom event for instant updates across components
      console.log('Dispatching locale-change event:', newLocale);
      window.dispatchEvent(
        new CustomEvent('locale-change', { detail: newLocale })
      );

      // Force page refresh with cache busting - this bypasses browser cache
      console.log('Initiating cache-busted reload immediately...');
      const url = new URL(window.location.href);
      // Remove any existing cache buster
      url.searchParams.delete('_refresh');
      url.searchParams.delete('_t');
      // Add new cache buster
      url.searchParams.set('_lang', `${newLocale}-${Date.now()}`);

      // Immediate redirect with cache buster
      window.location.href = url.toString();
    }
  }, []);

  // Listen for locale changes from other components
  useEffect(() => {
    const handleLocaleChange = (event: CustomEvent) => {
      setLocaleState(event.detail);
    };

    window.addEventListener(
      'locale-change',
      handleLocaleChange as EventListener
    );
    return () => {
      window.removeEventListener(
        'locale-change',
        handleLocaleChange as EventListener
      );
    };
  }, []);

  return {
    locale,
    setLocale,
  };
}

export type { SupportedLocale };
