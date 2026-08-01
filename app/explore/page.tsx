import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

const categories = [
  "Nature",
  "Wallpaper",
  "AI",
  "Technology",
  "Cars",
  "Animals",
  "Travel",
  "Food",
  "Fashion",
  "Gaming",
  "Education",
  "Business",
];

export default function ExplorePage() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12">

        <h1 className="mb-3 text-5xl font-bold">
          Explore Images
        </h1>

        <p className="mb-10 text-gray-400">
          Browse millions of free images uploaded by creators.
        </p>

        {/* Search */}

        <div className="mb-12">
          <Link
            href="/search"
            className="block rounded-2xl border border-zinc-700 bg-zinc-900 p-6 transition hover:border-blue-500"
          >
            🔍 Search Images
          </Link>
        </div>

        {/* Trending */}

        <div className="mb-12">
          <Link
            href="/trending"
            className="block rounded-2xl border border-zinc-700 bg-zinc-900 p-6 transition hover:border-orange-500"
          >
            🔥 Trending Images
          </Link>
        </div>

        {/* Categories */}

        <h2 className="mb-6 text-3xl font-bold">
          Categories
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/category/${cat}`}
              className="rounded-2xl border border-zinc-700 bg-zinc-900 p-8 text-center text-xl font-semibold transition hover:border-blue-500 hover:bg-zinc-800"
            >
              {cat}
            </Link>
          ))}

        </div>

      </main>

      <Footer />
    </>
  );
}