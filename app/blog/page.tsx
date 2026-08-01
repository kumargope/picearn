"use client";

import Navbar from "@/components/layout/Navbar";
import BannerAd from "@/components/ads/BannerAd";

const posts = [
  {
    title: "How to Earn Money by Sharing Images Online",
    desc: "Learn how creators can earn passive income by uploading and sharing images.",
  },
  {
    title: "Best Image Formats for Faster Loading",
    desc: "PNG, JPG or WEBP? Learn which format gives the best balance of quality and speed.",
  },
  {
    title: "Top 10 Photography Tips for Beginners",
    desc: "Improve your photography with these simple but effective techniques.",
  },
  {
    title: "How AI is Changing Image Creation",
    desc: "Discover how artificial intelligence is transforming digital art and image generation.",
  },
  {
    title: "How to Increase Views on Your Uploaded Images",
    desc: "Simple strategies to get more visitors and increase your earnings.",
  },
];

export default function BlogPage() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-10">

        <BannerAd position="top" />

        <h1 className="mt-8 text-4xl font-bold text-white">
          PicEarn Blog
        </h1>

        <p className="mt-3 text-gray-400">
          Tips, tutorials and updates for creators.
        </p>

        <div className="mt-10 grid gap-8">

          {posts.map((post, index) => (
            <div
              key={index}
              className="rounded-2xl bg-zinc-900 p-8 transition hover:bg-zinc-800"
            >
              <h2 className="text-2xl font-bold text-white">
                {post.title}
              </h2>

              <p className="mt-4 leading-8 text-gray-300">
                {post.desc}
              </p>

              <button className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">
                Read More
              </button>
            </div>
          ))}

        </div>

        <div className="mt-10">
          <BannerAd position="middle" />
        </div>

        <div className="mt-10 rounded-2xl bg-zinc-900 p-8">
          <h2 className="text-3xl font-bold text-white">
            Stay Updated
          </h2>

          <p className="mt-4 text-gray-300">
            Follow PicEarn for the latest earning tips, image optimization
            guides and platform updates.
          </p>
        </div>

        <div className="mt-10">
          <BannerAd position="bottom" />
        </div>

      </main>
    </>
  );
}