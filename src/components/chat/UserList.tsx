"use client";

import { Users, Loader2 } from "lucide-react";

interface User {
  userId: string;
  username: string;
}

interface TypingUser {
  username: string;
  isTyping: boolean;
}

interface UserListProps {
  users: User[];
  typingUsers: TypingUser[];
  currentUserId: string;
}

export default function UserList({
  users,
  typingUsers,
  currentUserId,
}: UserListProps) {
  const activeTypingUsers = typingUsers.filter((u) => u.isTyping);

  return (
    <div className="w-64 bg-gray-950 border-l border-gray-800 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-2 text-white">
          <Users className="w-5 h-5 text-red-600" />
          <h2 className="font-semibold">
            Online <span className="text-red-600">({users.length})</span>
          </h2>
        </div>
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto p-4">
        {users.length === 0 ? (
          <p className="text-gray-500 text-sm text-center">No users online</p>
        ) : (
          <div className="space-y-2">
            {users.map((user) => (
              <div
                key={user.userId}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-900 transition-colors"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span
                  className={`text-sm ${
                    user.userId === currentUserId
                      ? "text-red-500 font-semibold"
                      : "text-gray-300"
                  }`}
                >
                  {user.username} {user.userId === currentUserId && "(You)"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Typing Indicator */}
      {activeTypingUsers.length > 0 && (
        <div className="p-4 border-t border-gray-800 bg-gray-900">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Loader2 className="w-4 h-4 animate-spin text-red-600" />
            <span>
              {activeTypingUsers.length === 1
                ? `${activeTypingUsers[0].username} is typing...`
                : `${activeTypingUsers.length} people are typing...`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
