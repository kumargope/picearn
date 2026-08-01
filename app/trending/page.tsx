import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function TrendingPage() {
  const { data: images } = await supabase
    .from("images")
    .select("*")
    .order("views", { ascending: false })
    .limit(50);

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12">

        <h1 className="mb-2 text-5xl font-bold">
          🔥 Trending Images
        </h1>

        <p className="mb-10 text-zinc-400">
          Most viewed images uploaded by creators.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {images?.map((image) => (
            <Link
              key={image.id}
              href={`/v/${image.slug}`}
              className="overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-900 transition hover:border-orange-500"
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

                <div className="mt-3 flex justify-between text-sm text-zinc-400">
                  <span>👁 {image.views}</span>
                  <span>⬇ {image.downloads}</span>
                </div>

              </div>

            </Link>
          ))}

        </div>

      </main>

      <Footer />
    </>
  );
}