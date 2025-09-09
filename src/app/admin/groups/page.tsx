// src/app/admin/groups/page.tsx
import { Metadata } from 'next';
import { generateMetadata, seoConfigs } from '@/lib/seo';
import AdminGroupsClient from './AdminGroupsClient';

export const metadata: Metadata = generateMetadata(seoConfigs.adminGroups);

export default function AdminGroupsPage() {
  return <AdminGroupsClient />;
}
