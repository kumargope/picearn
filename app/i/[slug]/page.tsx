import DownloadButton from "@/components/viewer/DownloadButton";
import ViewTracker from "@/components/viewer/ViewTracker";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ImagePage({ params }: Props) {
  const { slug } = await params;

  const { data: image, error } = await supabase
    .from("images")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !image) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-12">

      <ViewTracker slug={slug} />

      <div className="w-full max-w-5xl rounded-2xl bg-zinc-900 p-8">

        <h1 className="mb-8 text-center text-3xl font-bold">
          {image.title}
        </h1>

        <div className="flex justify-center">

          <img

            src={image.image_url}
            alt={image.title}
            className="max-h-[80vh] w-auto rounded-xl"
            
          />

        </div>

        <DownloadButton slug={slug} />

        <div className="mt-8 grid gap-4 md:grid-cols-3">

          <div className="rounded-xl bg-zinc-800 p-5">
            <p className="text-zinc-400">
              Views
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {image.views}
            </h2>
          </div>

          <div className="rounded-xl bg-zinc-800 p-5">
            <p className="text-zinc-400">
              Downloads
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {image.downloads}
            </h2>
          </div>

          <div className="rounded-xl bg-zinc-800 p-5">
            <p className="text-zinc-400">
              Reward Points
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {image.reward_points}
            </h2>
          </div>

        </div>

      </div>
    </main>
  );
}