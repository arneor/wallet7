import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Timeline, TimelineItem } from "@/components/ui/Timeline";

interface PaymentRecord {
  id: string;
  amount: number;
  date: string;
  status: "paid" | "pending" | "failed";
  paymentMethod: string;
  groupName: string;
}

export function PaymentHistory() {
  // Mock data
  const paymentHistory: PaymentRecord[] = [
    {
      id: "1",
      amount: 500,
      date: "2024-01-15",
      status: "paid",
      paymentMethod: "Bank Transfer",
      groupName: "Family Savings Circle",
    },
    {
      id: "2",
      amount: 1000,
      date: "2024-01-10",
      status: "paid",
      paymentMethod: "Cash",
      groupName: "Business Investment Club",
    },
    {
      id: "3",
      amount: 500,
      date: "2023-12-15",
      status: "paid",
      paymentMethod: "Bank Transfer",
      groupName: "Family Savings Circle",
    },
    {
      id: "4",
      amount: 500,
      date: "2023-12-10",
      status: "failed",
      paymentMethod: "Bank Transfer",
      groupName: "Family Savings Circle",
    },
  ];

  const statusColors = {
    paid: "success",
    pending: "warning",
    failed: "danger",
  } as const;

  const statusIcons = {
    paid: (
      <svg
        className="w-4 h-4 text-green-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    ),
    pending: (
      <svg
        className="w-4 h-4 text-yellow-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    failed: (
      <svg
        className="w-4 h-4 text-red-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    ),
  };

  const totalPaid = paymentHistory
    .filter((payment) => payment.status === "paid")
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment History</CardTitle>
        <div className="text-sm text-gray-600">
          Total Paid:{" "}
          <span className="font-semibold text-green-600">
            ${totalPaid.toLocaleString()}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <Timeline>
          {paymentHistory.map((payment) => (
            <TimelineItem
              key={payment.id}
              icon={statusIcons[payment.status]}
              title={`$${payment.amount}`}
              date={new Date(payment.date).toLocaleDateString()}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {payment.groupName}
                  </span>
                  <Badge variant={statusColors[payment.status]} size="sm">
                    {payment.status}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500">
                  via {payment.paymentMethod}
                </p>
              </div>
            </TimelineItem>
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}
