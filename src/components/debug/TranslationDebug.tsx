// src/components/debug/TranslationDebug.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation, useLanguageSwitch } from '@/hooks/useTranslation';

export default function TranslationDebug() {
  const { t, locale, isLoading, translations } = useTranslation('landing');
  const { setLocale } = useLanguageSwitch();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Don't render on server
  }

  return (
    <div className='fixed bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 max-w-sm z-50'>
      <h3 className='font-bold text-sm mb-2'>Translation Debug</h3>

      <div className='text-xs space-y-1'>
        <p>
          <strong>Locale:</strong> {locale}
        </p>
        <p>
          <strong>Loading:</strong> {isLoading ? 'Yes' : 'No'}
        </p>
        <p>
          <strong>Translation Keys:</strong>{' '}
          {Object.keys(translations || {}).length || 0}
        </p>

        <div className='mt-2'>
          <p>
            <strong>Test Translations:</strong>
          </p>
          <p className='truncate'>features: "{t('navigation.features')}"</p>
          <p className='truncate'>
            title: "{t('hero.title').substring(0, 20)}..."
          </p>
        </div>

        <div className='mt-2 flex space-x-2'>
          <button
            onClick={() => {
              console.log('Debug: Switching to EN');
              setLocale('en');
            }}
            className={`px-2 py-1 text-xs rounded ${
              locale === 'en'
                ? 'bg-blue-600 text-white'
                : 'bg-blue-100 text-blue-600'
            }`}>
            EN
          </button>
          <button
            onClick={() => {
              console.log('Debug: Switching to ML');
              setLocale('ml');
            }}
            className={`px-2 py-1 text-xs rounded ${
              locale === 'ml'
                ? 'bg-green-600 text-white'
                : 'bg-green-100 text-green-600'
            }`}>
            ML
          </button>
        </div>

        <div className='mt-2 text-xs text-gray-500'>
          <p>
            Translations Object:{' '}
            {JSON.stringify(Object.keys(translations || {})).substring(0, 30)}
            ...
          </p>
        </div>
      </div>
    </div>
  );
}
