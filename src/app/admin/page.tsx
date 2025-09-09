// src/app/admin/page.tsx
import { Metadata } from 'next';
import { generateMetadata, seoConfigs } from '@/lib/seo';
import AdminDashboardClient from './AdminDashboardClient';

export const metadata: Metadata = generateMetadata(seoConfigs.adminDashboard);

export default function AdminDashboard() {
  return <AdminDashboardClient />;
}
