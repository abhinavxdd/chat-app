import Link from "next/link";

export default function LearnMore() {
  return (
    <div className="min-h-screen bg-black text-gray-300">
      {/* Navigation */}
      <nav className="p-6 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-red-600">
            ChatApp
          </Link>
          <Link
            href="/chat"
            className="px-6 py-2 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition-colors"
          >
            Start Chatting
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
          About <span className="text-red-600">ChatApp</span>
        </h1>
        <p className="text-xl text-gray-400 leading-relaxed">
          A modern, real-time chat application built with cutting-edge web
          technologies to deliver seamless communication experiences.
        </p>
      </div>

      {/* What Is It Section */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-br from-red-950/20 to-transparent p-8 rounded-xl border border-red-900/50">
          <h2 className="text-3xl font-bold text-white mb-4">
            What is ChatApp?
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            ChatApp is a scalable, real-time messaging platform that enables
            instant communication through WebSocket technology. Built with
            modern web frameworks, it provides a fast, reliable, and
            feature-rich chat experience for individuals and teams.
          </p>
          <p className="text-gray-400 leading-relaxed">
            Whether you're coordinating with a small team or managing
            large-scale communications, ChatApp's architecture is designed to
            scale horizontally and handle thousands of concurrent users without
            compromising performance.
          </p>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-white mb-8">Technology Stack</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h3 className="text-xl font-bold text-red-500 mb-3">Frontend</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                <strong className="text-white">Next.js 14:</strong> React
                framework with App Router
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                <strong className="text-white">TypeScript:</strong> Type-safe
                development
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                <strong className="text-white">Tailwind CSS:</strong>{" "}
                Utility-first styling
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                <strong className="text-white">Zustand:</strong> State
                management
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                <strong className="text-white">Socket.IO Client:</strong>{" "}
                Real-time communication
              </li>
            </ul>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h3 className="text-xl font-bold text-red-500 mb-3">Backend</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                <strong className="text-white">Node.js:</strong> Runtime
                environment
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                <strong className="text-white">Express:</strong> Web server
                framework
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                <strong className="text-white">Socket.IO:</strong> WebSocket
                server
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                <strong className="text-white">Redis:</strong> Pub/Sub & caching
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                <strong className="text-white">TypeScript:</strong> Type-safe
                backend
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-white mb-8">Key Features</h2>
        <div className="space-y-4">
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-red-600 transition-colors">
            <h3 className="text-xl font-bold text-white mb-2">
              ⚡ Real-time Messaging
            </h3>
            <p className="text-gray-400">
              Messages are delivered instantly using WebSocket technology. No
              polling, no delays—just pure real-time communication.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-red-600 transition-colors">
            <h3 className="text-xl font-bold text-white mb-2">
              🏠 Multiple Chat Rooms
            </h3>
            <p className="text-gray-400">
              Create and join unlimited chat rooms. Organize conversations by
              topic, team, or project for better communication management.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-red-600 transition-colors">
            <h3 className="text-xl font-bold text-white mb-2">
              👥 User Presence
            </h3>
            <p className="text-gray-400">
              See who's online in real-time. Know when users join or leave
              rooms, and track typing indicators for active conversations.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-red-600 transition-colors">
            <h3 className="text-xl font-bold text-white mb-2">
              📈 Horizontal Scaling
            </h3>
            <p className="text-gray-400">
              Built with Redis Pub/Sub to support multiple server instances.
              Scale to handle thousands of concurrent users without performance
              degradation.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-red-600 transition-colors">
            <h3 className="text-xl font-bold text-white mb-2">
              🔒 Secure & Reliable
            </h3>
            <p className="text-gray-400">
              Authentication, CORS protection, and secure WebSocket connections
              ensure your conversations stay private and protected.
            </p>
          </div>
        </div>
      </div>

      {/* Architecture */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-white mb-8">
          Architecture Overview
        </h2>
        <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-red-500 mb-3">
                Client Layer
              </h3>
              <p className="text-gray-400">
                Next.js application handles the UI, routing, and client-side
                state management. Socket.IO client maintains persistent
                WebSocket connection to the server.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-red-500 mb-3">
                Server Layer
              </h3>
              <p className="text-gray-400">
                Multiple Node.js instances running Express and Socket.IO handle
                WebSocket connections, message routing, and business logic. Load
                balancer distributes client connections.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-red-500 mb-3">
                Data Layer
              </h3>
              <p className="text-gray-400">
                Redis acts as a message broker using Pub/Sub for cross-server
                communication. It also provides caching for user sessions and
                recent messages for optimal performance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-white mb-8">How It Works</h2>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              1
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Connection</h3>
              <p className="text-gray-400">
                User opens the chat app, and the Socket.IO client establishes a
                WebSocket connection to the server. The connection is
                authenticated and assigned a unique socket ID.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              2
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Join Room</h3>
              <p className="text-gray-400">
                User selects or creates a chat room. The server adds the socket
                to the room and notifies other members that a new user has
                joined.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              3
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Send Message
              </h3>
              <p className="text-gray-400">
                When a user sends a message, it's emitted to the server. The
                server publishes it to Redis Pub/Sub, which distributes it to
                all server instances.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              4
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Broadcast</h3>
              <p className="text-gray-400">
                Each server instance receives the message from Redis and
                broadcasts it to all connected clients in that room. Messages
                appear instantly for all users.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-br from-red-950/30 to-transparent p-12 rounded-xl border border-red-900/50 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Start Chatting?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Experience real-time communication built with modern technology.
          </p>
          <Link
            href="/chat"
            className="inline-block px-8 py-4 bg-red-600 text-white rounded-full font-semibold text-lg hover:bg-red-700 hover:scale-105 transition-all"
          >
            Launch Chat App
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 text-center text-gray-500">
        <p>Built with Next.js, WebSockets, and Redis</p>
      </footer>
    </div>
  );
}
