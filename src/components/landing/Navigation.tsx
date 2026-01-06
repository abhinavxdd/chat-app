import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
      <div className="text-2xl font-bold text-red-600">ChatApp</div>
      <Link
        href="/chat"
        className="px-6 py-2 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition-colors"
      >
        Sign In
      </Link>
    </nav>
  );
}
