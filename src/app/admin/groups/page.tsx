import { GroupCard } from '@/components/admin/GroupCard';
import { CreateGroupModal } from '@/components/admin/CreateGroupModal';

export default function AdminGroupsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Groups</h1>
          <p className="text-gray-600">Manage all ROSCA groups</p>
        </div>
        <CreateGroupModal />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <GroupCard />
        <GroupCard />
        <GroupCard />
        <GroupCard />
      </div>
    </div>
  );
}
