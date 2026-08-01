"use client";

import Navbar from "@/components/layout/Navbar";
import BannerAd from "@/components/ads/BannerAd";

export default function TermsPage() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-10">

        {/* Top Banner Ad */}
        <BannerAd position="top" />

        <div className="mt-8 rounded-2xl bg-zinc-900 p-8">

          <h1 className="mb-6 text-4xl font-bold text-white">
            Terms & Conditions
          </h1>

          <p className="mb-6 text-lg leading-8 text-gray-300">
            Welcome to PicEarn. By accessing or using our website, you agree to
            comply with these Terms and Conditions. If you do not agree with
            these terms, please do not use our services.
          </p>

          <h2 className="mt-8 mb-3 text-2xl font-bold text-white">
            User Accounts
          </h2>

          <p className="text-lg leading-8 text-gray-300">
            Users are responsible for maintaining the confidentiality of their
            account credentials. You agree to provide accurate and complete
            information during registration.
          </p>

          <h2 className="mt-8 mb-3 text-2xl font-bold text-white">
            Image Uploads
          </h2>

          <ul className="list-disc space-y-3 pl-6 text-gray-300">
            <li>You must own the rights to every uploaded image.</li>
            <li>No copyrighted content without permission.</li>
            <li>No illegal or harmful material.</li>
            <li>No adult or prohibited content.</li>
            <li>We reserve the right to remove any violating content.</li>
          </ul>

          {/* Middle Banner */}
          <div className="my-10">
            <BannerAd position="middle" />
          </div>

          <h2 className="mb-3 text-2xl font-bold text-white">
            Rewards & Earnings
          </h2>

          <p className="text-lg leading-8 text-gray-300">
            Rewards are calculated based on genuine activity. Fraudulent views,
            automated traffic, bots, fake referrals, or abuse may result in
            reward cancellation or account suspension.
          </p>

          <h2 className="mt-8 mb-3 text-2xl font-bold text-white">
            Withdrawals
          </h2>

          <p className="text-lg leading-8 text-gray-300">
            Withdrawal requests are reviewed before approval. PicEarn reserves
            the right to reject or delay withdrawals if suspicious activity is
            detected or verification is required.
          </p>

          <h2 className="mt-8 mb-3 text-2xl font-bold text-white">
            Limitation of Liability
          </h2>

          <p className="text-lg leading-8 text-gray-300">
            PicEarn shall not be held responsible for any loss, damages, or
            interruption resulting from the use of our services.
          </p>

          <h2 className="mt-8 mb-3 text-2xl font-bold text-white">
            Changes to Terms
          </h2>

          <p className="text-lg leading-8 text-gray-300">
            We may update these Terms & Conditions at any time. Continued use
            of the website after updates indicates acceptance of the revised
            terms.
          </p>

          <h2 className="mt-8 mb-3 text-2xl font-bold text-white">
            Contact
          </h2>

          <p className="text-lg leading-8 text-gray-300">
            If you have questions regarding these Terms & Conditions, please
            contact us through our Contact page.
          </p>

        </div>

        {/* Bottom Banner */}
        <div className="mt-10">
          <BannerAd position="bottom" />
        </div>

      </main>
    </>
  );
}