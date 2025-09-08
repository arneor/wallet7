import { GroupOverview } from '@/components/member/GroupOverview';
import { PaymentHistory } from '@/components/member/PaymentHistory';
import { GroupChat } from '@/components/member/GroupChat';

export default async function MemberGroupDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Group Details</h1>
        <p className="text-gray-600">Group details for Group {id}</p>
      </div>
      
      <GroupOverview />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PaymentHistory />
        <GroupChat />
      </div>
    </div>
  );
}
