"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import useSocket from "@/hooks/useSocket";
import { useChatStore } from "@/store/chatStore";
import ChatWindow from "@/components/chat/ChatWindow";
import MessageInput from "@/components/chat/MessageInput";
import UserList from "@/components/chat/UserList";
import { LogOut, Hash } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function ChatPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { socket, connected } = useSocket();
  const [roomInput, setRoomInput] = useState("");
  const [userId, setUserId] = useState("");
  const [hasJoined, setHasJoined] = useState(false);

  const {
    messages,
    currentRoom,
    users,
    typingUsers,
    addMessage,
    setRoom,
    addUser,
    removeUser,
    setTyping,
    clearMessages,
  } = useChatStore();

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  // Set userId when socket connects
  useEffect(() => {
    if (socket && connected) {
      setUserId(socket.id || "");
    }
  }, [socket, connected]);

  // Socket event listeners
  useEffect(() => {
    if (!socket) return;

    // Listen for new messages
    socket.on("receive-message", (message: any) => {
      addMessage({
        id: message.id,
        userId: message.userId,
        username: message.username,
        content: message.content,
        timestamp: message.timestamp,
        roomId: message.roomId,
      });
    });

    // Listen for user joined
    socket.on("user-joined", ({ userId, username }: any) => {
      addUser({ userId, username });
      toast.success(`${username} joined the room`);
    });

    // Listen for user left
    socket.on("user-left", ({ userId, username }: any) => {
      removeUser(userId);
      toast(`${username} left the room`, { icon: "👋" });
    });

    // Listen for typing indicator
    socket.on("user-typing", ({ username, isTyping }: any) => {
      setTyping(username, isTyping);
    });

    // Listen for room users
    socket.on("room-users", ({ users }: any) => {
      users.forEach((user: any) => {
        addUser({ userId: user.userId, username: user.username });
      });
    });

    return () => {
      socket.off("receive-message");
      socket.off("user-joined");
      socket.off("user-left");
      socket.off("user-typing");
      socket.off("room-users");
    };
  }, [socket, addMessage, addUser, removeUser, setTyping]);

  // Join room function
  const handleJoinRoom = () => {
    if (!socket || !roomInput.trim() || !session?.user?.name) {
      toast.error("Please enter a room ID");
      return;
    }

    socket.emit("join-room", {
      roomId: roomInput,
      userId: socket.id,
      username: session.user.name || "Anonymous",
    });

    setRoom(roomInput);
    setHasJoined(true);
    toast.success(`Joined room: ${roomInput}`);
  };

  // Leave room function
  const handleLeaveRoom = () => {
    if (!socket || !currentRoom || !session?.user?.name) return;

    socket.emit("leave-room", {
      roomId: currentRoom,
      userId: socket.id,
      username: session.user.name || "Anonymous",
    });

    clearMessages();
    setRoom(null);
    setHasJoined(false);
    setRoomInput("");
    toast("Left the room", { icon: "👋" });
  };

  // Send message function
  const handleSendMessage = useCallback(
    (content: string) => {
      if (!socket || !currentRoom || !content.trim() || !session?.user?.name)
        return;

      const message = {
        id: `${Date.now()}-${Math.random()}`,
        userId: socket.id || "",
        username: session.user?.name || "Anonymous",
        content: content.trim(),
        timestamp: Date.now(),
        roomId: currentRoom,
      };

      socket.emit("send-message", message);
    },
    [socket, currentRoom, session?.user?.name]
  );

  // Typing indicator
  let typingTimeout: NodeJS.Timeout;
  const handleTyping = useCallback(() => {
    if (!socket || !currentRoom || !session?.user?.name) return;

    socket.emit("typing", {
      roomId: currentRoom,
      username: session.user?.name || "Anonymous",
      isTyping: true,
    });

    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      socket.emit("typing", {
        roomId: currentRoom,
        username: session.user?.name || "Anonymous",
        isTyping: false,
      });
    }, 1000);
  }, [socket, currentRoom, session?.user?.name]);

  // Show loading while checking auth
  if (status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!session) {
    return null;
  }

  return (
    <div className="h-screen flex flex-col bg-black">
      <Toaster position="top-center" />

      {/* Header */}
      <header className="bg-gray-950 border-b border-gray-800 p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-white">
              Chat<span className="text-red-600">App</span>
            </h1>
            {currentRoom && (
              <div className="flex items-center gap-2 bg-gray-900 px-4 py-2 rounded-full">
                <Hash className="w-4 h-4 text-red-600" />
                <span className="text-white font-semibold">{currentRoom}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">{session.user?.name}</span>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  connected ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <span className="text-gray-400 text-sm">
                {connected ? "Connected" : "Disconnected"}
              </span>
            </div>
            <button
              onClick={() => router.push("/")}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Room Join Section */}
      {!hasJoined && (
        <div className="flex-1 flex items-center justify-center bg-black">
          <div className="bg-gray-950 border border-gray-800 rounded-lg p-8 w-96">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Join a <span className="text-red-600">Room</span>
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                value={roomInput}
                onChange={(e) => setRoomInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleJoinRoom()}
                placeholder="Enter room ID (e.g., general)"
                className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
              <button
                onClick={handleJoinRoom}
                disabled={!connected || !roomInput.trim()}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {connected ? "Join Room" : "Connecting..."}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Interface */}
      {hasJoined && currentRoom && (
        <div className="flex-1 flex overflow-hidden">
          {/* Chat Window */}
          <div className="flex-1 flex flex-col">
            <ChatWindow
              messages={messages.filter((m) => m.roomId === currentRoom)}
              currentUserId={userId}
              currentRoom={currentRoom}
            />
            <MessageInput
              onSendMessage={handleSendMessage}
              onTyping={handleTyping}
              disabled={!connected || !currentRoom}
            />
          </div>

          {/* User List */}
          <UserList
            users={users}
            typingUsers={typingUsers}
            currentUserId={userId}
          />
        </div>
      )}

      {/* Leave Room Button (when in room) */}
      {hasJoined && currentRoom && (
        <div className="absolute bottom-20 left-4">
          <button
            onClick={handleLeaveRoom}
            className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 transition-colors"
          >
            Leave Room
          </button>
        </div>
      )}
    </div>
  );
}
