import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const { data: images } = await supabase
    .from("images")
    .select("*")
    .eq("category", category)
    .order("created_at", { ascending: false });

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12">

        <h1 className="mb-2 text-5xl font-bold">
          {category}
        </h1>

        <p className="mb-10 text-gray-400">
          Latest {category} images uploaded by creators.
        </p>

        {images?.length === 0 && (
          <div className="rounded-2xl bg-zinc-900 p-10 text-center">
            <h2 className="text-2xl font-bold">
              No Images Found
            </h2>

            <p className="mt-4 text-zinc-400">
              Be the first one to upload images in this category.
            </p>
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {images?.map((image) => (
            <Link
              key={image.id}
              href={`/v/${image.slug}`}
              className="overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-900 transition hover:border-blue-500"
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
                  👁 {image.views} Views
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