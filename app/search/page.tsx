import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  let images: any[] = [];

  if (q) {
    const { data } = await supabase
      .from("images")
      .select("*")
      .or(
        `title.ilike.%${q}%,description.ilike.%${q}%,tags.ilike.%${q}%`
      )
      .order("created_at", { ascending: false });

    images = data || [];
  }

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12">

        <h1 className="mb-8 text-5xl font-bold">
          Search Images
        </h1>

        <form
          action="/search"
          className="mb-12 flex gap-4"
        >
          <input
            type="text"
            name="q"
            defaultValue={q || ""}
            placeholder="Search images..."
            className="flex-1 rounded-xl bg-zinc-900 p-4 text-white outline-none"
          />

          <button
            className="rounded-xl bg-blue-600 px-8 font-bold"
          >
            Search
          </button>
        </form>

        {q && (
          <p className="mb-8 text-zinc-400">
            Results for <b>{q}</b>
          </p>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {images.map((image) => (
            <Link
              key={image.id}
              href={`/v/${image.slug}`}
              className="overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-900"
            >
              <img
                src={image.image_url}
                alt={image.title}
                className="h-56 w-full object-cover"
              />

              <div className="p-4">

                <h2 className="font-bold">
                  {image.title}
                </h2>

                <p className="mt-2 text-sm text-zinc-400">
                  👁 {image.views}
                </p>

              </div>

            </Link>
          ))}

        </div>

      </main>

      <Footer />
    </>
  );
}