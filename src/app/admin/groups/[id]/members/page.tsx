import { MemberList } from '@/components/admin/MemberList';

export default async function GroupMembersPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Group Members</h1>
          <p className="text-gray-600">Manage members for Group {id}</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Add Member
        </button>
      </div>
      
      <MemberList />
    </div>
  );
}
