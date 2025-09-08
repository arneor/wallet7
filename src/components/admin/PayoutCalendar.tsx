import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface PayoutEvent {
  id: string;
  memberName: string;
  amount: number;
  date: string;
  status: 'upcoming' | 'completed' | 'in_progress';
}

export function PayoutCalendar() {
  // Mock data
  const payoutEvents: PayoutEvent[] = [
    {
      id: '1',
      memberName: 'John Doe',
      amount: 5000,
      date: '2024-01-15',
      status: 'completed'
    },
    {
      id: '2',
      memberName: 'Jane Smith',
      amount: 5000,
      date: '2024-02-15',
      status: 'in_progress'
    },
    {
      id: '3',
      memberName: 'Mike Johnson',
      amount: 5000,
      date: '2024-03-15',
      status: 'upcoming'
    },
    {
      id: '4',
      memberName: 'Sarah Wilson',
      amount: 5000,
      date: '2024-04-15',
      status: 'upcoming'
    }
  ];

  const statusColors = {
    completed: 'success',
    in_progress: 'info',
    upcoming: 'default'
  } as const;

  const currentDate = new Date();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payout Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {payoutEvents.map((event) => {
            const eventDate = new Date(event.date);
            const isCurrentMonth = eventDate.getMonth() === currentDate.getMonth() && 
                                  eventDate.getFullYear() === currentDate.getFullYear();
            
            return (
              <div 
                key={event.id} 
                className={`p-4 border rounded-lg ${isCurrentMonth ? 'border-blue-300 bg-blue-50' : 'border-gray-200'}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{event.memberName}</h3>
                    <p className="text-sm text-gray-500">
                      {eventDate.toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </p>
                    <p className="text-lg font-semibold text-green-600">${event.amount.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={statusColors[event.status]}>
                      {event.status.replace('_', ' ')}
                    </Badge>
                    {isCurrentMonth && (
                      <p className="text-xs text-blue-600 mt-1">This month</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
