import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Habit Tracker!</h1>
      <p className="text-gray-600 mb-6">
        Track your daily habits and build better routines.
      </p>
      <div className="flex gap-4">
        <Link
          href="/login"
          className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded hover:bg-blue-600"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          Register
        </Link>
      </div>
    </main>
  );
}
