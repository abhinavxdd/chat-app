"use client";

import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import { MessageCircle } from "lucide-react";
import { useRenderCount } from "@/hooks/useRenderCount";

interface Message {
  id: string;
  userId: string;
  username: string;
  content: string;
  timestamp: number;
  roomId: string;
}

interface ChatWindowProps {
  messages: Message[];
  currentUserId: string;
  currentRoom: string | null;
}

export default function ChatWindow({
  messages,
  currentUserId,
  currentRoom,
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Track component re-renders (log every 5 renders)
  useRenderCount("ChatWindow", 5);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!currentRoom) {
    return (
      <div className="flex-1 flex items-center justify-center bg-black">
        <div className="text-center">
          <MessageCircle className="w-16 h-16 text-gray-800 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">
            No Room Selected
          </h3>
          <p className="text-gray-600">Enter a room ID to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-black p-4">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <MessageCircle className="w-16 h-16 text-gray-800 mx-auto mb-4" />
            <p className="text-gray-500">
              No messages yet. Start the conversation!
            </p>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              currentUserId={currentUserId}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
}
