import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Timeline, TimelineItem } from '@/components/ui/Timeline';

interface Payment {
  id: string;
  memberName: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'pending' | 'overdue';
  paymentMethod?: string;
}

export function PaymentTracker() {
  // Mock data
  const payments: Payment[] = [
    {
      id: '1',
      memberName: 'John Doe',
      amount: 500,
      dueDate: '2024-02-15',
      paidDate: '2024-02-14',
      status: 'paid',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: '2',
      memberName: 'Jane Smith',
      amount: 500,
      dueDate: '2024-02-15',
      status: 'overdue'
    },
    {
      id: '3',
      memberName: 'Mike Johnson',
      amount: 500,
      dueDate: '2024-02-15',
      paidDate: '2024-02-13',
      status: 'paid',
      paymentMethod: 'Cash'
    },
    {
      id: '4',
      memberName: 'Sarah Wilson',
      amount: 500,
      dueDate: '2024-02-15',
      status: 'pending'
    }
  ];

  const statusColors = {
    paid: 'success',
    pending: 'warning',
    overdue: 'danger'
  } as const;

  const statusIcons = {
    paid: (
      <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    pending: (
      <svg className="w-4 h-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    overdue: (
      <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        <Timeline>
          {payments.map((payment) => (
            <TimelineItem
              key={payment.id}
              icon={statusIcons[payment.status]}
              title={payment.memberName}
              date={payment.paidDate ? new Date(payment.paidDate).toLocaleDateString() : 'Due: ' + new Date(payment.dueDate).toLocaleDateString()}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">${payment.amount}</p>
                  {payment.paymentMethod && (
                    <p className="text-xs text-gray-500">via {payment.paymentMethod}</p>
                  )}
                </div>
                <Badge variant={statusColors[payment.status]} size="sm">
                  {payment.status}
                </Badge>
              </div>
            </TimelineItem>
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}
