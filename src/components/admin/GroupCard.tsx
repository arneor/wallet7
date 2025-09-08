import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface GroupCardProps {
  group?: {
    id: string;
    name: string;
    description: string;
    contributionAmount: number;
    frequency: string;
    maxMembers: number;
    currentMembers: number;
    status: 'active' | 'inactive' | 'completed';
    nextPayoutDate: string;
  };
}

export function GroupCard({ group }: GroupCardProps) {
  // Mock data if no group is provided
  const defaultGroup = {
    id: '1',
    name: 'Family Savings Circle',
    description: 'Monthly family savings group for emergency fund',
    contributionAmount: 500,
    frequency: 'monthly',
    maxMembers: 10,
    currentMembers: 8,
    status: 'active' as const,
    nextPayoutDate: '2024-02-15'
  };

  const groupData = group || defaultGroup;
  const memberProgress = (groupData.currentMembers / groupData.maxMembers) * 100;

  const statusColors = {
    active: 'success',
    inactive: 'warning',
    completed: 'default'
  } as const;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{groupData.name}</CardTitle>
          <Badge variant={statusColors[groupData.status]}>
            {groupData.status}
          </Badge>
        </div>
        <p className="text-sm text-gray-600 mt-2">{groupData.description}</p>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Contribution:</span>
              <p className="font-semibold">${groupData.contributionAmount}/{groupData.frequency}</p>
            </div>
            <div>
              <span className="text-gray-500">Next Payout:</span>
              <p className="font-semibold">{new Date(groupData.nextPayoutDate).toLocaleDateString()}</p>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">Members</span>
              <span className="text-sm font-medium">
                {groupData.currentMembers}/{groupData.maxMembers}
              </span>
            </div>
            <ProgressBar 
              value={groupData.currentMembers} 
              max={groupData.maxMembers}
              variant="success"
            />
          </div>

          <div className="flex space-x-2 pt-4">
            <Link
              href={`/admin/groups/${groupData.id}`}
              className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              View Details
            </Link>
            <Link
              href={`/admin/groups/${groupData.id}/members`}
              className="flex-1 border border-gray-300 text-gray-700 text-center py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Manage
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
