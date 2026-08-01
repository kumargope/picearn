"use client";

import Image from "next/image";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

interface ImageData {
  id: string;
  title: string | null;
  image_url: string | null;
  slug: string;

  views: number;
  downloads: number;

  earnings: number;
  reward_points: number;

  created_at: string;
  last_download_at: string | null;
}

interface Props {
  images: ImageData[];
  onRefresh: () => void;
}

export default function ImageList({
  images,
  onRefresh,
}: Props) {
  async function deleteImage(id: string) {
    const ok = confirm("Delete this image?");

    if (!ok) return;

    const { error } = await supabase
      .from("images")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Image Deleted");
    onRefresh();
  }

  async function copyLink(slug: string) {
    const viewerLink = `${window.location.origin}/v/${slug}`;

    await navigator.clipboard.writeText(viewerLink);

    toast.success("Viewer Link Copied");
  }

  if (images.length === 0) {
    return (
      <div className="rounded-2xl bg-zinc-900 p-10 text-center text-zinc-400">
        No Images Uploaded Yet.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {images.map((image) => (
        <div
          key={image.id}
          className="rounded-2xl bg-zinc-900 p-6 shadow-lg"
        >
          <div className="flex flex-col gap-6 md:flex-row md:justify-between">

            {/* Left */}
            <div className="flex gap-5">

              {image.image_url ? (
                <Image
                  src={image.image_url}
                  alt={image.title || "Image"}
                  width={120}
                  height={120}
                  unoptimized
                  className="h-28 w-28 rounded-xl object-cover"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-xl bg-zinc-800">
                  No Image
                </div>
              )}

              <div>

                <h2 className="text-2xl font-bold">
                  {image.title || "Untitled"}
                </h2>

                <div className="mt-4 space-y-2 text-zinc-300">

                  <p>
                    👀 <strong>Views:</strong> {image.views}
                  </p>

                  <p>
                    ⬇ <strong>Downloads:</strong> {image.downloads}
                  </p>

                  <p>
                    💰 <strong>Earnings:</strong> ₹{image.earnings ?? 0}
                  </p>

                  <p>
                    🎁 <strong>Reward:</strong> {image.reward_points} Points
                  </p>

                </div>

              </div>
            </div>

            {/* Right */}
            <div className="flex flex-col items-start gap-3 md:items-end">

              <div className="rounded-xl bg-zinc-800 px-4 py-2 text-sm text-zinc-300">
                📅 Uploaded
                <br />
                <strong>
                  {new Date(image.created_at).toLocaleString()}
                </strong>
              </div>

              <div className="rounded-xl bg-zinc-800 px-4 py-2 text-sm text-zinc-300">
                ⬇ Last Download
                <br />

                <strong>
                  {image.last_download_at
                    ? new Date(
                        image.last_download_at
                      ).toLocaleString()
                    : "No Downloads Yet"}
                </strong>
              </div>

              <button
                onClick={() => copyLink(image.slug)}
                className="mt-2 w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                📎 Copy Viewer Link
              </button>

              <button
                onClick={() => deleteImage(image.id)}
                className="w-full rounded-lg bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
              >
                🗑 Delete Image
              </button>

            </div>

          </div>
        </div>
      ))}
    </div>
  );
}