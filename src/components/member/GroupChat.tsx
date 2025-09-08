// src/components/member/GroupChat.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  isMe: boolean;
  avatar?: string;
}

export function GroupChat() {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "John Doe",
      message: "Hey everyone! Just made my payment for this month. ✅",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      isMe: false,
      avatar: "👤",
    },
    {
      id: "2",
      sender: "You",
      message: "Great! I'll make mine tomorrow.",
      timestamp: new Date(Date.now() - 3300000).toISOString(),
      isMe: true,
    },
    {
      id: "3",
      sender: "Jane Smith (Admin)",
      message:
        "📢 Reminder: Next payout is scheduled for February 15th. Member #6 will receive ₹60,000.",
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      isMe: false,
      avatar: "👑",
    },
    {
      id: "4",
      sender: "Mike Johnson",
      message:
        "Thanks for the reminder Jane! Looking forward to my turn next month 😊",
      timestamp: new Date(Date.now() - 900000).toISOString(),
      isMe: false,
      avatar: "👨‍💼",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      sender: "You",
      message: newMessage.trim(),
      timestamp: new Date().toISOString(),
      isMe: true,
    };

    setMessages([...messages, message]);
    setNewMessage("");

    // Auto-focus input after sending
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isWithinLastHour = (timestamp: string) => {
    return Date.now() - new Date(timestamp).getTime() < 3600000;
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Chat Header - Mobile Optimized */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">
              Family Savings Circle
            </h3>
            <p className="text-sm text-gray-600">10 members • 3 online</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            <span className="text-sm text-green-600">Active</span>
          </div>
        </div>
      </div>

      {/* Messages Area - Mobile Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.isMe ? "justify-end" : "justify-start"} mb-4`}
            >
              <div
                className={`max-w-[85%] sm:max-w-xs lg:max-w-sm ${message.isMe ? "order-2" : "order-1"}`}
              >
                {/* Sender name for others */}
                {!message.isMe && (
                  <div className="flex items-center space-x-2 mb-1 px-1">
                    {message.avatar && (
                      <span className="text-sm">{message.avatar}</span>
                    )}
                    <p className="text-xs text-gray-600 font-medium">
                      {message.sender}
                    </p>
                  </div>
                )}

                {/* Message Bubble */}
                <div
                  className={`px-4 py-3 rounded-2xl shadow-sm ${
                    message.isMe
                      ? "bg-blue-500 text-white rounded-br-md"
                      : "bg-white text-gray-900 border border-gray-200 rounded-bl-md"
                  }`}
                >
                  <p className="text-sm leading-relaxed break-words">
                    {message.message}
                  </p>
                  <div
                    className={`flex items-center justify-end mt-1 space-x-2 ${
                      message.isMe ? "text-blue-100" : "text-gray-500"
                    }`}
                  >
                    <span className="text-xs">
                      {formatTime(message.timestamp)}
                    </span>
                    {message.isMe && (
                      <span className="text-xs">
                        {isWithinLastHour(message.timestamp) ? "✓" : "✓✓"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input - Mobile Optimized */}
      <div className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="flex items-end space-x-3">
          <div className="flex-1">
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
              maxLength={500}
            />
          </div>

          <button
            type="submit"
            disabled={!newMessage.trim()}
            className={`p-3 rounded-full transition-all ${
              newMessage.trim()
                ? "bg-blue-500 text-white hover:bg-blue-600 shadow-md"
                : "bg-gray-200 text-gray-400"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </form>

        {/* Character count for mobile */}
        <div className="flex justify-between items-center mt-2 px-1">
          <div className="text-xs text-gray-500">
            💡 Tip: Use @mentions to notify specific members
          </div>
          <div
            className={`text-xs ${newMessage.length > 400 ? "text-orange-500" : "text-gray-400"}`}
          >
            {newMessage.length}/500
          </div>
        </div>
      </div>
    </div>
  );
}
