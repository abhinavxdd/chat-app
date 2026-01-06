"use client";

interface MessageBubbleProps {
  message: {
    id: string;
    userId: string;
    username: string;
    content: string;
    timestamp: number;
  };
  currentUserId: string;
}

export default function MessageBubble({
  message,
  currentUserId,
}: MessageBubbleProps) {
  const isOwnMessage = message.userId === currentUserId;
  const time = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`flex ${isOwnMessage ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`max-w-[70%] ${isOwnMessage ? "items-end" : "items-start"}`}
      >
        {!isOwnMessage && (
          <p className="text-xs text-gray-400 mb-1 px-1">{message.username}</p>
        )}
        <div
          className={`rounded-2xl px-4 py-2 ${
            isOwnMessage
              ? "bg-gradient-to-r from-red-600 to-red-700 text-white"
              : "bg-gray-800 text-gray-100"
          }`}
        >
          <p className="break-words">{message.content}</p>
          <p
            className={`text-xs mt-1 ${
              isOwnMessage ? "text-red-200" : "text-gray-500"
            }`}
          >
            {time}
          </p>
        </div>
      </div>
    </div>
  );
}
