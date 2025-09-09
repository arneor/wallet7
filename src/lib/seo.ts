import { Metadata } from 'next';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  author?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  twitterCard?: 'summary' | 'summary_large_image';
  robots?: string;
  noIndex?: boolean;
  structuredData?: object;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://wallet7.com';
const DEFAULT_OG_IMAGE = '/images/og-image.png';

export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    author = 'Wallet7 Team',
    canonicalUrl,
    ogImage = DEFAULT_OG_IMAGE,
    ogType = 'website',
    twitterCard = 'summary_large_image',
    robots = 'index, follow',
    noIndex = false,
    structuredData,
  } = config;

  const fullTitle = title.includes('Wallet7')
    ? title
    : `${title} | Wallet7 - ROSCA Management`;
  const finalRobots = noIndex ? 'noindex, nofollow' : robots;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: author }],
    creator: author,
    publisher: 'Wallet7',
    robots: finalRobots,

    // Open Graph
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl || BASE_URL,
      siteName: 'Wallet7',
      images: [
        {
          url: ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: ogType,
    },

    // Twitter
    twitter: {
      card: twitterCard,
      title: fullTitle,
      description,
      images: [ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`],
      creator: '@wallet7app',
      site: '@wallet7app',
    },

    // Additional meta tags
    alternates: {
      canonical: canonicalUrl || BASE_URL,
    },

    // App-specific
    applicationName: 'Wallet7',
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: 'Wallet7',
    },
    formatDetection: {
      telephone: false,
    },

    // PWA
    manifest: '/manifest.json',

    // Icons
    icons: {
      icon: [
        {
          url: '/icons/app-icons/favicon-16x16.png',
          sizes: '16x16',
          type: 'image/png',
        },
        {
          url: '/icons/app-icons/favicon-32x32.png',
          sizes: '32x32',
          type: 'image/png',
        },
        {
          url: '/icons/app-icons/favicon-96x96.png',
          sizes: '96x96',
          type: 'image/png',
        },
      ],
      apple: [
        {
          url: '/icons/app-icons/apple-icon-57x57.png',
          sizes: '57x57',
          type: 'image/png',
        },
        {
          url: '/icons/app-icons/apple-icon-60x60.png',
          sizes: '60x60',
          type: 'image/png',
        },
        {
          url: '/icons/app-icons/apple-icon-72x72.png',
          sizes: '72x72',
          type: 'image/png',
        },
        {
          url: '/icons/app-icons/apple-icon-76x76.png',
          sizes: '76x76',
          type: 'image/png',
        },
        {
          url: '/icons/app-icons/apple-icon-114x114.png',
          sizes: '114x114',
          type: 'image/png',
        },
        {
          url: '/icons/app-icons/apple-icon-120x120.png',
          sizes: '120x120',
          type: 'image/png',
        },
        {
          url: '/icons/app-icons/apple-icon-144x144.png',
          sizes: '144x144',
          type: 'image/png',
        },
        {
          url: '/icons/app-icons/apple-icon-152x152.png',
          sizes: '152x152',
          type: 'image/png',
        },
        {
          url: '/icons/app-icons/apple-icon-180x180.png',
          sizes: '180x180',
          type: 'image/png',
        },
      ],
      other: [
        {
          rel: 'apple-touch-icon-precomposed',
          url: '/icons/app-icons/apple-icon-precomposed.png',
        },
      ],
    },

    // Verification
    verification: {
      google: process.env.GOOGLE_VERIFICATION_CODE,
      yandex: process.env.YANDEX_VERIFICATION_CODE,
      yahoo: process.env.YAHOO_VERIFICATION_CODE,
      other: {
        'msvalidate.01': process.env.BING_VERIFICATION_CODE || '',
      },
    },

    // Additional metadata
    other: {
      'theme-color': '#3b82f6',
      'color-scheme': 'light dark',
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
      'msapplication-TileColor': '#3b82f6',
      'msapplication-config': '/icons/app-icons/browserconfig.xml',
      HandheldFriendly: 'true',
      MobileOptimized: '320',
      'viewport-fit': 'cover',
    },
  };

  return metadata;
}

// Common SEO configurations
export const seoConfigs = {
  home: {
    title: 'Wallet7 - ROSCA Management Made Easy',
    description:
      'Comprehensive platform for managing Rotating Savings and Credit Associations (ROSCA). Track contributions, manage payouts, and ensure transparency in your chit fund operations.',
    keywords: [
      'ROSCA',
      'chit fund',
      'savings group',
      'credit association',
      'financial management',
      'group savings',
    ],
    canonicalUrl: BASE_URL,
  },

  login: {
    title: 'Login to Wallet7',
    description:
      'Secure login to your Wallet7 account. Access your ROSCA groups, track payments, and manage your financial community.',
    keywords: ['login', 'signin', 'wallet7', 'ROSCA login'],
    canonicalUrl: `${BASE_URL}/login`,
    noIndex: true,
  },

  register: {
    title: 'Join Wallet7 - Create Your Account',
    description:
      'Create your Wallet7 account to start managing ROSCA groups. Join thousands of users who trust Wallet7 for their savings group management.',
    keywords: [
      'register',
      'signup',
      'create account',
      'join wallet7',
      'ROSCA signup',
    ],
    canonicalUrl: `${BASE_URL}/register`,
  },

  adminDashboard: {
    title: 'Admin Dashboard',
    description:
      'Comprehensive admin dashboard for managing your ROSCA groups, tracking payments, and monitoring group performance.',
    keywords: [
      'admin dashboard',
      'ROSCA management',
      'group admin',
      'payment tracking',
    ],
    canonicalUrl: `${BASE_URL}/admin`,
    noIndex: true,
  },

  adminGroups: {
    title: 'Manage ROSCA Groups',
    description:
      'Create and manage your ROSCA groups. Add members, set contribution amounts, and schedule payouts for transparent group savings.',
    keywords: [
      'ROSCA groups',
      'manage groups',
      'create group',
      'group management',
    ],
    canonicalUrl: `${BASE_URL}/admin/groups`,
    noIndex: true,
  },

  adminPayments: {
    title: 'Payment Management',
    description:
      'Track and manage all payments across your ROSCA groups. Monitor contributions, process payouts, and maintain payment records.',
    keywords: [
      'payment management',
      'ROSCA payments',
      'contribution tracking',
      'payout management',
    ],
    canonicalUrl: `${BASE_URL}/admin/payments`,
    noIndex: true,
  },

  memberDashboard: {
    title: 'Member Dashboard',
    description:
      'Your personal ROSCA member dashboard. View your groups, track contributions, check payout schedules, and communicate with group members.',
    keywords: [
      'member dashboard',
      'ROSCA member',
      'my groups',
      'contribution status',
    ],
    canonicalUrl: `${BASE_URL}/member`,
    noIndex: true,
  },

  memberGroups: {
    title: 'My ROSCA Groups',
    description:
      'View and manage your ROSCA group memberships. Check contribution status, payout schedules, and group activity.',
    keywords: [
      'my groups',
      'ROSCA membership',
      'group participation',
      'member groups',
    ],
    canonicalUrl: `${BASE_URL}/member/groups`,
    noIndex: true,
  },
};

// Structured data generators
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Wallet7',
    description:
      'Comprehensive platform for managing Rotating Savings and Credit Associations (ROSCA)',
    url: BASE_URL,
    logo: `${BASE_URL}/icons/app-icons/android-icon-192x192.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-XXX-XXX-XXXX',
      contactType: 'customer service',
      availableLanguage: 'English',
    },
    sameAs: [
      'https://twitter.com/wallet7app',
      'https://linkedin.com/company/wallet7',
      'https://facebook.com/wallet7app',
    ],
  };
}

export function generateWebAppSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Wallet7',
    description: 'ROSCA Management Application',
    url: BASE_URL,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: 'Wallet7',
    },
  };
}
