export default function RemindersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payment Reminders</h1>
        <p className="text-gray-600">Manage automated payment reminders</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Upcoming Reminders</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Schedule Reminder
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h3 className="font-medium">Monthly Payment Due</h3>
              <p className="text-sm text-gray-500">Group: Family Savings Circle</p>
              <p className="text-sm text-gray-500">Due: Tomorrow</p>
            </div>
            <div className="flex space-x-2">
              <button className="text-blue-600 hover:underline">Edit</button>
              <button className="text-red-600 hover:underline">Cancel</button>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h3 className="font-medium">Payout Notification</h3>
              <p className="text-sm text-gray-500">Group: Business Investment Club</p>
              <p className="text-sm text-gray-500">Due: In 3 days</p>
            </div>
            <div className="flex space-x-2">
              <button className="text-blue-600 hover:underline">Edit</button>
              <button className="text-red-600 hover:underline">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
