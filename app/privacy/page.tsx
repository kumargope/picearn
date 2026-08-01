"use client";

import Navbar from "@/components/layout/Navbar";
import BannerAd from "@/components/ads/BannerAd";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-10">

        {/* Top Ad */}
        <BannerAd position="top" />

        <div className="mt-8 rounded-2xl bg-zinc-900 p-8">

          <h1 className="mb-6 text-4xl font-bold text-white">
            Privacy Policy
          </h1>

          <p className="mb-6 text-lg leading-8 text-gray-300">
            At PicEarn, protecting your privacy is one of our highest
            priorities. This Privacy Policy explains how we collect, use,
            protect, and manage your information when you use our website.
          </p>

          <h2 className="mt-8 mb-3 text-2xl font-bold text-white">
            Information We Collect
          </h2>

          <ul className="list-disc space-y-3 pl-6 text-gray-300">
            <li>Email Address</li>
            <li>Account Information</li>
            <li>Uploaded Images</li>
            <li>IP Address</li>
            <li>Browser Information</li>
            <li>Device Information</li>
            <li>Cookies</li>
          </ul>

          {/* Middle Ad */}
          <div className="my-10">
            <BannerAd position="middle" />
          </div>

          <h2 className="mb-3 text-2xl font-bold text-white">
            How We Use Your Information
          </h2>

          <ul className="list-disc space-y-3 pl-6 text-gray-300">
            <li>Provide image hosting services.</li>
            <li>Improve website performance.</li>
            <li>Prevent fraud and abuse.</li>
            <li>Process rewards and withdrawals.</li>
            <li>Respond to user support requests.</li>
          </ul>

          <h2 className="mt-8 mb-3 text-2xl font-bold text-white">
            Cookies
          </h2>

          <p className="text-lg leading-8 text-gray-300">
            We use cookies to improve your browsing experience, remember your
            preferences, analyze traffic, and provide relevant advertisements.
          </p>

          <h2 className="mt-8 mb-3 text-2xl font-bold text-white">
            Third-Party Services
          </h2>

          <p className="text-lg leading-8 text-gray-300">
            Our website may use third-party services such as Google Analytics,
            advertising partners, payment providers, and Supabase for secure
            authentication and data storage.
          </p>

          <h2 className="mt-8 mb-3 text-2xl font-bold text-white">
            Data Security
          </h2>

          <p className="text-lg leading-8 text-gray-300">
            We take appropriate security measures to protect user information
            from unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2 className="mt-8 mb-3 text-2xl font-bold text-white">
            Contact Us
          </h2>

          <p className="text-lg leading-8 text-gray-300">
            If you have any questions regarding this Privacy Policy, please
            contact us through our Contact page.
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