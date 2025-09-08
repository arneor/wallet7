import { ReportsExport } from '@/components/admin/ReportsExport';

export default async function GroupReportsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Group Reports</h1>
        <p className="text-gray-600">Financial reports for Group {id}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-3xl font-bold text-blue-600">10</p>
          <p className="text-sm text-gray-500">Total Members</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-3xl font-bold text-green-600">$5,000</p>
          <p className="text-sm text-gray-500">Total Pool</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-3xl font-bold text-purple-600">6</p>
          <p className="text-sm text-gray-500">Completed Rounds</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-3xl font-bold text-orange-600">95%</p>
          <p className="text-sm text-gray-500">Payment Rate</p>
        </div>
      </div>
      
      <ReportsExport />
    </div>
  );
}
