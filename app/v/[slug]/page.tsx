"use client";

import BannerAd from "@/components/ads/BannerAd";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DownloadButton from "@/components/viewer/DownloadButton";

interface ImageData {
  id: string;
  title: string;
  image_url: string;
  slug: string;
  views: number;
  downloads: number;
  reward_points: number;
}

export default function ViewerPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [image, setImage] = useState<ImageData | null>(null);
  const [loading, setLoading] = useState(true);

  const [countdown, setCountdown] = useState(5);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    if (!slug) return;

    async function loadImage() {
      try {
        const res = await fetch(`/api/image/${slug}`);
        const data = await res.json();

        if (!res.ok) {
          setLoading(false);
          return;
        }

        setImage(data.image);

        // Count View
        const viewedKey = `viewed_${slug}`;

if (!localStorage.getItem(viewedKey)) {
  await fetch(`/api/views/${slug}`, {
    method: "POST",
  });

  localStorage.setItem(viewedKey, "true");
}
          

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }

    loadImage();
  }, [slug]);

  useEffect(() => {
    if (loading || !image) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowImage(true);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, image]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading...
      </main>
    );
  }

  if (!image) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        Image Not Found
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">

        <h1 className="mb-8 text-center text-3xl font-bold">
          {image.title}
        </h1>

        <BannerAd position="top" />

        {!showImage ? (
          <>
            <div className="rounded-2xl bg-zinc-900 p-10 text-center">

              <h2 className="text-3xl font-bold">
                Please Wait...
              </h2>

              <p className="mt-5 text-7xl font-bold text-blue-500">
                {countdown}
              </p>

              <p className="mt-6 text-gray-400">
                Ads are loading...
              </p>

            </div>
          </>
        ) : (
          <>
           <BannerAd position="middle" />

            <div className="flex justify-center">
              <img
                src={image.image_url}
                alt={image.title}
                className="max-h-[80vh] rounded-2xl"
              />
            </div>

            <DownloadButton slug={slug} />

            <div className="mt-8 grid gap-4 md:grid-cols-3">

              <div className="rounded-xl bg-zinc-900 p-5">
                <p className="text-zinc-400">
                  Views
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {image.views + 1}
                </h2>
              </div>

              <div className="rounded-xl bg-zinc-900 p-5">
                <p className="text-zinc-400">
                  Downloads
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {image.downloads}
                </h2>
              </div>

              <div className="rounded-xl bg-zinc-900 p-5">
                <p className="text-zinc-400">
                  Reward Points
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {image.reward_points}
                </h2>
              </div>

            </div>

            <BannerAd position="bottom" />
          </>
        )}
      </div>
    </main>
  );
}