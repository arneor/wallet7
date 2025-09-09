// src/app/login/page.tsx
import { Metadata } from 'next';
import { generateMetadata, seoConfigs } from '@/lib/seo';
import LoginClient from './LoginClient';

export const metadata: Metadata = generateMetadata(seoConfigs.login);

export default function LoginPage() {
  return <LoginClient />;
}
