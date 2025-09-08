import { GroupOverview } from '@/components/member/GroupOverview';

export default function MemberGroupsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Groups</h1>
        <p className="text-gray-600">Your ROSCA group memberships</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <GroupOverview />
        <GroupOverview />
      </div>
    </div>
  );
}
