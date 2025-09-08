import { MemberList } from '@/components/admin/MemberList';
import { PaymentTracker } from '@/components/admin/PaymentTracker';
import { PayoutCalendar } from '@/components/admin/PayoutCalendar';

export default async function GroupDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Group Details</h1>
        <p className="text-gray-600">Detailed view for Group {id}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Group Information</h2>
          <div className="space-y-3">
            <div>
              <span className="text-sm text-gray-500">Name:</span>
              <p className="font-medium">Sample ROSCA Group</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Contribution:</span>
              <p className="font-medium">$500/month</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Members:</span>
              <p className="font-medium">8/10</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Status:</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">Active</span>
            </div>
          </div>
        </div>
        
        <PayoutCalendar />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MemberList />
        <PaymentTracker />
      </div>
    </div>
  );
}
