import { PaymentHistory } from '@/components/member/PaymentHistory';
import { PaymentDueCard } from '@/components/member/PaymentDueCard';

export default function MemberPaymentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
        <p className="text-gray-600">Track your payment history and due dates</p>
      </div>
      
      <PaymentDueCard />
      
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">$2,500</p>
            <p className="text-sm text-gray-500">Total Paid</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">$500</p>
            <p className="text-sm text-gray-500">Next Payment</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">5</p>
            <p className="text-sm text-gray-500">Payments Made</p>
          </div>
        </div>
      </div>
      
      <PaymentHistory />
    </div>
  );
}
