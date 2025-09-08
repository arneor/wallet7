import { GroupChat } from '@/components/member/GroupChat';

export default function MemberChatPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Group Chat</h1>
        <p className="text-gray-600">Communicate with your group members</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Active Groups</h2>
          <div className="space-y-3">
            <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                FS
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Family Savings Circle</h3>
                <p className="text-sm text-gray-500">Last message 2 hours ago</p>
              </div>
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">3</span>
            </div>
            
            <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                BI
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Business Investment Club</h3>
                <p className="text-sm text-gray-500">Last message yesterday</p>
              </div>
            </div>
          </div>
        </div>
        
        <GroupChat />
      </div>
    </div>
  );
}
