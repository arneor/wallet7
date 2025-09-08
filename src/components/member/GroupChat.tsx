'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  isMe: boolean;
}

export function GroupChat() {
  const [newMessage, setNewMessage] = useState('');
  
  // Mock data
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'John Doe',
      message: 'Hey everyone! Just made my payment for this month.',
      timestamp: '2024-01-15T10:30:00Z',
      isMe: false
    },
    {
      id: '2',
      sender: 'You',
      message: 'Great! I\'ll make mine tomorrow.',
      timestamp: '2024-01-15T10:32:00Z',
      isMe: true
    },
    {
      id: '3',
      sender: 'Jane Smith',
      message: 'Quick reminder that the next payout is scheduled for February 15th.',
      timestamp: '2024-01-15T14:15:00Z',
      isMe: false
    },
    {
      id: '4',
      sender: 'Mike Johnson',
      message: 'Thanks for the reminder Jane! Looking forward to it.',
      timestamp: '2024-01-15T14:20:00Z',
      isMe: false
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      sender: 'You',
      message: newMessage,
      timestamp: new Date().toISOString(),
      isMe: true
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <Card className="h-96 flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">Group Chat</CardTitle>
        <p className="text-sm text-gray-600">Family Savings Circle</p>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chat-message ${message.isMe ? 'chat-message-sent' : 'chat-message-received'}`}
            >
              {!message.isMe && (
                <p className="text-xs text-gray-500 mb-1">{message.sender}</p>
              )}
              <p className="text-sm">{message.message}</p>
              <p className="text-xs opacity-75 mt-1">
                {new Date(message.timestamp).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          ))}
        </div>
        
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <Button type="submit" size="sm">
            Send
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
