import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold mb-10">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <Link
          href="/admin/users"
          className="bg-zinc-900 rounded-xl p-8 hover:bg-zinc-800 transition"
        >
          <h2 className="text-2xl font-bold">
            👥 Users
          </h2>

          <p className="text-zinc-400 mt-3">
            Manage Users
          </p>
        </Link>

        <Link
          href="/admin/images"
          className="bg-zinc-900 rounded-xl p-8 hover:bg-zinc-800 transition"
        >
          <h2 className="text-2xl font-bold">
            🖼 Images
          </h2>

          <p className="text-zinc-400 mt-3">
            Manage Images
          </p>
        </Link>

        <Link
          href="/admin/withdraws"
          className="bg-zinc-900 rounded-xl p-8 hover:bg-zinc-800 transition"
        >
          <h2 className="text-2xl font-bold">
            💸 Withdraw Requests
          </h2>

          <p className="text-zinc-400 mt-3">
            Pending Withdraws
          </p>
        </Link>

        <Link
          href="/admin/analytics"
          className="bg-zinc-900 rounded-xl p-8 hover:bg-zinc-800 transition"
        >
          <h2 className="text-2xl font-bold">
            📊 Analytics
          </h2>

          <p className="text-zinc-400 mt-3">
            Website Statistics
          </p>
        </Link>

      </div>

    </main>
  );
}