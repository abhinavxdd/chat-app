import Link from "next/link";

export default function Hero() {
  return (
    <div className="text-center space-y-8">
      {/* Main Heading */}
      <h1 className="text-6xl md:text-8xl font-black text-red-600 leading-tight tracking-tight">
        Connect, Chat,
        <br />
        <span className="text-red-500">Collaborate</span>
      </h1>

      {/* Subtitle */}
      <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
        Real-time messaging built with Next.js, WebSockets, and Redis.
        Experience lightning-fast communication.
      </p>

      {/* CTA Buttons */}
      <div className="flex gap-4 justify-center pt-8">
        <Link
          href="/chat"
          className="px-8 py-4 bg-red-600 text-white rounded-full font-semibold text-lg hover:bg-red-700 hover:scale-105 transition-all"
        >
          Start Chatting
        </Link>
        <Link
          href="/learn-more"
          className="px-8 py-4 bg-transparent border-2 border-red-600 text-red-600 rounded-full font-semibold text-lg hover:bg-red-600 hover:text-white transition-colors"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}
