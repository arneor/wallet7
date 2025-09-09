// src/app/register/page.tsx
import { Metadata } from 'next';
import { generateMetadata, seoConfigs } from '@/lib/seo';
import RegisterClient from './RegisterClient';

export const metadata: Metadata = generateMetadata(seoConfigs.register);

export default function RegisterPage() {
  return <RegisterClient />;
}
