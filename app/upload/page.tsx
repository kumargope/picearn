"use client";

import BannerAd from "@/components/ads/BannerAd";
import Navbar from "@/components/layout/Navbar";
import UploadCard from "@/components/upload/UploadCard";

export default function UploadPage() {
  return (
    <>
      <Navbar />

      {/* Top Banner */}
      <BannerAd position="top" />

      <main className="mx-auto max-w-6xl px-6 py-10">

        {/* Upload Box */}
        <UploadCard />

        {/* Middle Banner */}
        <BannerAd position="middle" />

      </main>

      {/* Bottom Banner */}
      <BannerAd position="bottom" />
    </>
  );
}