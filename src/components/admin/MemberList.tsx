import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  paymentStatus: 'current' | 'overdue' | 'pending';
  totalPaid: number;
}

export function MemberList() {
  // Mock data
  const members: Member[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      joinDate: '2024-01-01',
      paymentStatus: 'current',
      totalPaid: 2500
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 (555) 234-5678',
      joinDate: '2024-01-01',
      paymentStatus: 'overdue',
      totalPaid: 2000
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+1 (555) 345-6789',
      joinDate: '2024-01-15',
      paymentStatus: 'current',
      totalPaid: 2500
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      phone: '+1 (555) 456-7890',
      joinDate: '2024-02-01',
      paymentStatus: 'pending',
      totalPaid: 1500
    }
  ];

  const statusColors = {
    current: 'success',
    overdue: 'danger',
    pending: 'warning'
  } as const;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Group Members</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {members.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.email}</p>
                  <p className="text-sm text-gray-500">{member.phone}</p>
                </div>
              </div>
              
              <div className="text-right">
                <Badge variant={statusColors[member.paymentStatus]} className="mb-2">
                  {member.paymentStatus}
                </Badge>
                <p className="text-sm text-gray-500">Total Paid: ${member.totalPaid}</p>
                <p className="text-xs text-gray-400">
                  Joined: {new Date(member.joinDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
