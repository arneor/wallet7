import { NextRequest, NextResponse } from 'next/server';

// GET /api/groups - Get all groups
export async function GET(request: NextRequest) {
  try {
    // Mock data - replace with actual database queries
    const groups = [
      {
        id: '1',
        name: 'Family Savings Circle',
        description: 'Monthly family savings group',
        contributionAmount: 500,
        frequency: 'monthly',
        maxMembers: 10,
        currentMembers: 8,
        status: 'active',
        startDate: '2024-01-01',
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        id: '2',
        name: 'Business Investment Club',
        description: 'Investment focused ROSCA',
        contributionAmount: 1000,
        frequency: 'monthly',
        maxMembers: 12,
        currentMembers: 10,
        status: 'active',
        startDate: '2024-02-01',
        createdAt: '2024-02-01T00:00:00Z'
      }
    ];

    return NextResponse.json({ groups });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch groups' },
      { status: 500 }
    );
  }
}

// POST /api/groups - Create a new group
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, contributionAmount, frequency, maxMembers, startDate } = body;

    // Validate required fields
    if (!name || !contributionAmount || !maxMembers || !startDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Mock creation - replace with actual database insertion
    const newGroup = {
      id: Date.now().toString(),
      name,
      description: description || '',
      contributionAmount: Number(contributionAmount),
      frequency: frequency || 'monthly',
      maxMembers: Number(maxMembers),
      currentMembers: 0,
      status: 'active',
      startDate,
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({ group: newGroup }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create group' },
      { status: 500 }
    );
  }
}
