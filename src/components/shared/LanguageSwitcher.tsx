// src/components/shared/LanguageSwitcher.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  useLanguageSwitch,
  type SupportedLocale,
} from '@/hooks/useTranslation';

interface LanguageOption {
  code: SupportedLocale;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: LanguageOption[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  },
  {
    code: 'ml',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    // add cocunut tree flag
    flag: '🌴',
  },
];

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'dropdown' | 'toggle';
}

export default function LanguageSwitcher({
  className = '',
  variant = 'dropdown',
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguageSwitch();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [currentLocale, setCurrentLocale] = useState<SupportedLocale>('en');

  // Prevent hydration mismatch by only rendering locale-dependent content after mount
  useEffect(() => {
    setIsMounted(true);
    // Load current locale from localStorage to ensure correct highlighting
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('wallet7-locale');
      const storedLocale = (stored as SupportedLocale) || 'en';
      setCurrentLocale(storedLocale);
    }
  }, []);

  // Update current locale when it changes
  useEffect(() => {
    setCurrentLocale(locale);
  }, [locale]);

  const currentLanguage =
    languages.find((lang) => lang.code === currentLocale) || languages[0];

  const handleLanguageChange = (newLocale: SupportedLocale) => {
    setCurrentLocale(newLocale);
    setLocale(newLocale);
    setIsOpen(false);
  };

  if (variant === 'toggle') {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
              isMounted && currentLocale === language.code
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white/10 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
            }`}>
            <span className='mr-1'>{language.flag}</span>
            {language.code.toUpperCase()}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200'
        aria-label='Switch language'>
        <span className='text-lg'>{currentLanguage.flag}</span>
        <span className='text-sm font-medium hidden sm:block'>
          {currentLanguage.code.toUpperCase()}
        </span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className='w-4 h-4'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 9l-7 7-7-7'
          />
        </motion.svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className='fixed inset-0 z-40'
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className='absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50'>
              {languages.map((language, index) => (
                <motion.button
                  key={language.code}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full px-4 py-3 text-left flex items-center space-x-3 hover:bg-blue-50 transition-colors ${
                    isMounted && currentLocale === language.code
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-700'
                  }`}>
                  <span className='text-xl'>{language.flag}</span>
                  <div className='flex-1'>
                    <div className='font-medium'>{language.name}</div>
                    <div className='text-xs text-gray-500'>
                      {language.nativeName}
                    </div>
                  </div>
                  {isMounted && currentLocale === language.code && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className='w-5 h-5 text-blue-600'>
                      <svg
                        fill='currentColor'
                        viewBox='0 0 20 20'>
                        <path
                          fillRule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
