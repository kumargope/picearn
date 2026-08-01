"use client";

import Navbar from "@/components/layout/Navbar";
import BannerAd from "@/components/ads/BannerAd";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-10">

        {/* Top Ad */}
        <BannerAd position="top" />

        <div className="mt-8 rounded-2xl bg-zinc-900 p-8">

          <h1 className="mb-6 text-4xl font-bold text-white">
            About PicEarn
          </h1>

          <p className="mb-5 text-lg leading-8 text-gray-300">
            PicEarn is an image hosting and sharing platform that allows users
            to upload, manage, and share images through secure links while
            earning rewards based on genuine engagement.
          </p>

          <p className="mb-5 text-lg leading-8 text-gray-300">
            Our mission is to provide creators with a simple, secure, and
            reliable platform for storing and sharing images across the web.
            Every uploaded image receives a unique shareable link that can be
            accessed from anywhere.
          </p>

          {/* Middle Ad */}
          <BannerAd position="middle" />

          <h2 className="mt-10 mb-4 text-2xl font-bold text-white">
            What We Offer
          </h2>

          <ul className="list-disc space-y-3 pl-6 text-gray-300">
            <li>Fast Image Upload</li>
            <li>Secure Image Hosting</li>
            <li>Unique Shareable Links</li>
            <li>Image Analytics</li>
            <li>Referral Rewards</li>
            <li>Secure Withdrawals</li>
            <li>Responsive Design</li>
          </ul>

          <h2 className="mt-10 mb-4 text-2xl font-bold text-white">
            Our Vision
          </h2>

          <p className="text-lg leading-8 text-gray-300">
            We aim to build one of the most trusted image sharing communities
            where creators can securely host images and grow their audience
            while maintaining transparency and user privacy.
          </p>

        </div>

        {/* Bottom Ad */}
        <div className="mt-10">
          <BannerAd position="bottom" />
        </div>

      </main>
    </>
  );
}