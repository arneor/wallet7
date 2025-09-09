// src/app/member/page.tsx
import { Metadata } from 'next';
import { generateMetadata, seoConfigs } from '@/lib/seo';
import MemberDashboardClient from './MemberDashboardClient';

export const metadata: Metadata = generateMetadata(seoConfigs.memberDashboard);

export default function MemberDashboard() {
  return <MemberDashboardClient />;
}
