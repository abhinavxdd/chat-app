export default function Features() {
  return (
    <div className="grid md:grid-cols-3 gap-6 pt-20">
      {/* Feature 1 */}
      <div className="group relative bg-gradient-to-br from-red-950/20 to-transparent p-8 rounded-xl border border-red-900/50 hover:border-red-600 hover:shadow-xl hover:shadow-red-600/20 transition-all duration-300">
        <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">
          Real-time Messaging
        </h3>
        <p className="text-gray-400 leading-relaxed">
          Instant message delivery with WebSocket technology. No delays, just
          pure speed.
        </p>
      </div>

      {/* Feature 2 */}
      <div className="group relative bg-gradient-to-br from-red-950/20 to-transparent p-8 rounded-xl border border-red-900/50 hover:border-red-600 hover:shadow-xl hover:shadow-red-600/20 transition-all duration-300">
        <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Multiple Rooms</h3>
        <p className="text-gray-400 leading-relaxed">
          Create and join unlimited chat rooms. Organize conversations by topic.
        </p>
      </div>

      {/* Feature 3 */}
      <div className="group relative bg-gradient-to-br from-red-950/20 to-transparent p-8 rounded-xl border border-red-900/50 hover:border-red-600 hover:shadow-xl hover:shadow-red-600/20 transition-all duration-300">
        <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">
          Scalable Architecture
        </h3>
        <p className="text-gray-400 leading-relaxed">
          Built with Redis for horizontal scaling. Handle thousands of
          concurrent users.
        </p>
      </div>
    </div>
  );
}
