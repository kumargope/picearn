"use client";

import Navbar from "@/components/layout/Navbar";
import BannerAd from "@/components/ads/BannerAd";

export default function DMCAPage() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-10">

        {/* Top Banner */}
        <BannerAd position="top" />

        <div className="mt-8 rounded-2xl bg-zinc-900 p-8">

          <h1 className="mb-8 text-4xl font-bold text-white">
            DMCA Policy
          </h1>

          <p className="mb-6 leading-8 text-gray-300">
            PicEarn respects the intellectual property rights of others.
            If you believe that your copyrighted material has been uploaded
            or shared on our platform without authorization, you may submit
            a DMCA takedown request.
          </p>

          <div className="space-y-8">

            <section className="rounded-xl bg-zinc-800 p-6">
              <h2 className="mb-3 text-2xl font-bold text-white">
                Copyright Infringement
              </h2>

              <p className="leading-8 text-gray-300">
                We take copyright infringement seriously and will investigate
                every valid complaint. Content found to violate copyright laws
                may be removed immediately.
              </p>
            </section>

            <section className="rounded-xl bg-zinc-800 p-6">
              <h2 className="mb-3 text-2xl font-bold text-white">
                Filing a DMCA Notice
              </h2>

              <p className="leading-8 text-gray-300">
                Please include the following information:
              </p>

              <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-300">
                <li>Your full name</li>
                <li>Your email address</li>
                <li>Description of the copyrighted work</li>
                <li>URL of the infringing content</li>
                <li>Statement of good faith belief</li>
                <li>Your electronic signature</li>
              </ul>
            </section>

            {/* Middle Banner */}
            <BannerAd position="middle" />

            <section className="rounded-xl bg-zinc-800 p-6">
              <h2 className="mb-3 text-2xl font-bold text-white">
                Counter Notification
              </h2>

              <p className="leading-8 text-gray-300">
                Users who believe their content was removed by mistake may
                submit a valid counter-notification in accordance with the
                Digital Millennium Copyright Act.
              </p>
            </section>

            <section className="rounded-xl bg-zinc-800 p-6">
              <h2 className="mb-3 text-2xl font-bold text-white">
                Contact
              </h2>

              <p className="leading-8 text-gray-300">
                DMCA complaints should be sent to:
              </p>

              <div className="mt-4 rounded-lg bg-zinc-700 p-4">
                <p className="text-white">
                  📧 picearn737@gmail.com
                </p>
              </div>
            </section>

          </div>

        </div>

        {/* Bottom Banner */}
        <div className="mt-10">
          <BannerAd position="bottom" />
        </div>

      </main>
    </>
  );
}