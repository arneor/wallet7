import { NextRequest, NextResponse } from 'next/server';

// GET /api/payments - Get payments
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const groupId = searchParams.get('groupId');
    const memberId = searchParams.get('memberId');

    // Mock data - replace with actual database queries
    const payments = [
      {
        id: '1',
        groupId: '1',
        memberId: '1',
        amount: 500,
        dueDate: '2024-01-15',
        paidDate: '2024-01-14',
        status: 'paid',
        paymentMethod: 'bank_transfer',
        createdAt: '2024-01-14T10:00:00Z'
      },
      {
        id: '2',
        groupId: '1',
        memberId: '1',
        amount: 500,
        dueDate: '2024-02-15',
        paidDate: null,
        status: 'pending',
        paymentMethod: null,
        createdAt: '2024-02-01T00:00:00Z'
      },
      {
        id: '3',
        groupId: '2',
        memberId: '1',
        amount: 1000,
        dueDate: '2024-02-15',
        paidDate: '2024-02-13',
        status: 'paid',
        paymentMethod: 'cash',
        createdAt: '2024-02-13T14:30:00Z'
      }
    ];

    let filteredPayments = payments;

    if (groupId) {
      filteredPayments = filteredPayments.filter(p => p.groupId === groupId);
    }

    if (memberId) {
      filteredPayments = filteredPayments.filter(p => p.memberId === memberId);
    }

    return NextResponse.json({ payments: filteredPayments });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch payments' },
      { status: 500 }
    );
  }
}

// POST /api/payments - Record a new payment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { groupId, memberId, amount, paymentMethod, dueDate } = body;

    // Validate required fields
    if (!groupId || !memberId || !amount || !paymentMethod) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Mock creation - replace with actual database insertion
    const newPayment = {
      id: Date.now().toString(),
      groupId,
      memberId,
      amount: Number(amount),
      dueDate: dueDate || new Date().toISOString().split('T')[0],
      paidDate: new Date().toISOString(),
      status: 'paid',
      paymentMethod,
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({ payment: newPayment }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to record payment' },
      { status: 500 }
    );
  }
}

// PUT /api/payments/[id] - Update payment status
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { status, paidDate, paymentMethod } = body;

    // Mock update - replace with actual database update
    const updatedPayment = {
      id: '1', // This would come from the URL params in a real implementation
      status: status || 'paid',
      paidDate: paidDate || new Date().toISOString(),
      paymentMethod: paymentMethod || 'bank_transfer',
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({ payment: updatedPayment });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update payment' },
      { status: 500 }
    );
  }
}
