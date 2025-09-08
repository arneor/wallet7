import { NextRequest, NextResponse } from 'next/server';

// GET /api/notifications - Get notifications for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    // Mock data - replace with actual database queries
    const notifications = [
      {
        id: '1',
        userId: '1',
        type: 'payment_due',
        title: 'Payment Due Tomorrow',
        message: 'Your monthly contribution of $500 is due tomorrow for Family Savings Circle',
        groupId: '1',
        read: false,
        createdAt: '2024-01-14T09:00:00Z'
      },
      {
        id: '2',
        userId: '1',
        type: 'payout_turn',
        title: 'Your Payout Turn',
        message: 'Congratulations! You are next in line for the payout in Business Investment Club',
        groupId: '2',
        read: false,
        createdAt: '2024-01-13T15:30:00Z'
      },
      {
        id: '3',
        userId: '1',
        type: 'payment_received',
        title: 'Payment Confirmed',
        message: 'Your payment of $500 has been confirmed for Family Savings Circle',
        groupId: '1',
        read: true,
        createdAt: '2024-01-12T10:15:00Z'
      },
      {
        id: '4',
        userId: '1',
        type: 'group_update',
        title: 'Group Update',
        message: 'New member John Smith has joined Business Investment Club',
        groupId: '2',
        read: true,
        createdAt: '2024-01-11T14:20:00Z'
      }
    ];

    let filteredNotifications = notifications;

    if (userId) {
      filteredNotifications = filteredNotifications.filter(n => n.userId === userId);
    }

    // Sort by creation date (newest first)
    filteredNotifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({ notifications: filteredNotifications });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}

// POST /api/notifications - Create a new notification
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, type, title, message, groupId } = body;

    // Validate required fields
    if (!userId || !type || !title || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Mock creation - replace with actual database insertion
    const newNotification = {
      id: Date.now().toString(),
      userId,
      type,
      title,
      message,
      groupId: groupId || null,
      read: false,
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({ notification: newNotification }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create notification' },
      { status: 500 }
    );
  }
}

// PUT /api/notifications/[id] - Mark notification as read
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { read } = body;

    // Mock update - replace with actual database update
    const updatedNotification = {
      id: '1', // This would come from the URL params in a real implementation
      read: read !== undefined ? read : true,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({ notification: updatedNotification });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update notification' },
      { status: 500 }
    );
  }
}
