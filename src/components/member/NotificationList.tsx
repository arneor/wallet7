import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface Notification {
  id: string;
  type: 'payment_due' | 'payout_turn' | 'payment_received' | 'group_update';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  groupName?: string;
}

export function NotificationList() {
  // Mock data
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'payment_due',
      title: 'Payment Due Tomorrow',
      message: 'Your monthly contribution of $500 is due tomorrow for Family Savings Circle',
      timestamp: '2024-01-14T09:00:00Z',
      read: false,
      groupName: 'Family Savings Circle'
    },
    {
      id: '2',
      type: 'payout_turn',
      title: 'Your Payout Turn',
      message: 'Congratulations! You are next in line for the payout in Business Investment Club',
      timestamp: '2024-01-13T15:30:00Z',
      read: false,
      groupName: 'Business Investment Club'
    },
    {
      id: '3',
      type: 'payment_received',
      title: 'Payment Confirmed',
      message: 'Your payment of $500 has been confirmed for Family Savings Circle',
      timestamp: '2024-01-12T10:15:00Z',
      read: true,
      groupName: 'Family Savings Circle'
    },
    {
      id: '4',
      type: 'group_update',
      title: 'Group Update',
      message: 'New member John Smith has joined Business Investment Club',
      timestamp: '2024-01-11T14:20:00Z',
      read: true,
      groupName: 'Business Investment Club'
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'payment_due':
        return (
          <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'payout_turn':
        return (
          <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'payment_received':
        return (
          <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'group_update':
        return (
          <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border rounded-lg ${
                notification.read ? 'border-gray-200 bg-white' : 'border-blue-200 bg-blue-50'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-sm font-medium ${
                      notification.read ? 'text-gray-900' : 'text-blue-900'
                    }`}>
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <Badge variant="info" size="sm">New</Badge>
                    )}
                  </div>
                  <p className={`text-sm mt-1 ${
                    notification.read ? 'text-gray-600' : 'text-blue-800'
                  }`}>
                    {notification.message}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    {notification.groupName && (
                      <span className="text-xs text-gray-500">{notification.groupName}</span>
                    )}
                    <time className="text-xs text-gray-400">
                      {new Date(notification.timestamp).toLocaleDateString()}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
