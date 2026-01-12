"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { useRenderCount } from "@/hooks/useRenderCount";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  onTyping: () => void;
  disabled?: boolean;
}

export default function MessageInput({
  onSendMessage,
  onTyping,
  disabled,
}: MessageInputProps) {
  const [message, setMessage] = useState("");

  // Track re-renders
  useRenderCount("MessageInput", 5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    onTyping();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-gray-800 bg-black p-4"
    >
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder={
            disabled ? "Join a room to chat..." : "Type a message..."
          }
          disabled={disabled}
          className="flex-1 bg-gray-900 border border-gray-800 rounded-full px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full p-3 hover:from-red-700 hover:to-red-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-red-600 disabled:hover:to-red-700"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}
