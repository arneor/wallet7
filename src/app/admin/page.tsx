import { DashboardStats } from '@/components/admin/DashboardStats';
import { GroupCard } from '@/components/admin/GroupCard';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Manage your ROSCA groups and members</p>
      </div>
      
      <DashboardStats />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <GroupCard />
        <GroupCard />
        <GroupCard />
      </div>
    </div>
  );
}
