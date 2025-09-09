import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import {
  generateMetadata,
  seoConfigs,
  generateOrganizationSchema,
  generateWebAppSchema,
} from '@/lib/seo';
import PWAInstallPrompt from '@/components/shared/PWAInstallPrompt';
import ServiceWorkerRegistration from '@/components/shared/ServiceWorkerRegistration';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = generateMetadata(seoConfigs.home);

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3b82f6' },
    { media: '(prefers-color-scheme: dark)', color: '#1e40af' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = generateOrganizationSchema();
  const webAppSchema = generateWebAppSchema();

  return (
    <html
      lang='en'
      className={inter.variable}>
      <head>
        {/* PWA Manifest */}
        <link
          rel='manifest'
          href='/manifest.json'
        />

        {/* Apple PWA Meta Tags */}
        <meta
          name='apple-mobile-web-app-capable'
          content='yes'
        />
        <meta
          name='apple-mobile-web-app-status-bar-style'
          content='default'
        />
        <meta
          name='apple-mobile-web-app-title'
          content='Wallet7'
        />
        <link
          rel='apple-touch-icon'
          href='/icons/app-icons/apple-icon-180x180.png'
        />

        {/* Microsoft PWA Meta Tags */}
        <meta
          name='msapplication-TileColor'
          content='#3b82f6'
        />
        <meta
          name='msapplication-TileImage'
          content='/icons/app-icons/ms-icon-144x144.png'
        />
        <meta
          name='msapplication-config'
          content='/icons/app-icons/browserconfig.xml'
        />

        {/* Standard Favicons */}
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/icons/app-icons/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='96x96'
          href='/icons/app-icons/favicon-96x96.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/icons/app-icons/favicon-16x16.png'
        />

        {/* Preconnect to external domains */}
        <link
          rel='preconnect'
          href='https://fonts.googleapis.com'
        />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />

        {/* DNS Prefetch */}
        <link
          rel='dns-prefetch'
          href='https://fonts.googleapis.com'
        />
        <link
          rel='dns-prefetch'
          href='https://fonts.gstatic.com'
        />

        {/* Structured Data */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webAppSchema),
          }}
        />

        {/* Security Headers */}
        <meta
          httpEquiv='X-Content-Type-Options'
          content='nosniff'
        />
        <meta
          httpEquiv='X-Frame-Options'
          content='DENY'
        />
        <meta
          httpEquiv='X-XSS-Protection'
          content='1; mode=block'
        />

        {/* Performance Hints */}
        <link
          rel='preload'
          href='/icons/app-icons/favicon-32x32.png'
          as='image'
          type='image/png'
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <PWAInstallPrompt />
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
