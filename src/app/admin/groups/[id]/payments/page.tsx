import { PaymentTracker } from '@/components/admin/PaymentTracker';

export default async function GroupPaymentsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payment Tracking</h1>
        <p className="text-gray-600">Payment tracking for Group {id}</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">$4,000</p>
            <p className="text-sm text-gray-500">Total Collected</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">$500</p>
            <p className="text-sm text-gray-500">This Month</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">2</p>
            <p className="text-sm text-gray-500">Pending</p>
          </div>
        </div>
      </div>
      
      <PaymentTracker />
    </div>
  );
}
