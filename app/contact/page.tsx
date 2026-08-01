import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-2xl bg-zinc-900 p-8">

          <h1 className="mb-6 text-4xl font-bold text-white">
            Contact Us
          </h1>

          <p className="mb-8 text-zinc-400">
            If you have any questions, business inquiries, copyright issues,
            bug reports, or suggestions, feel free to contact us.
            We&apos;ll respond as soon as possible.
          </p>

          <div className="space-y-6">

            <div className="rounded-xl bg-zinc-800 p-5">
              <h2 className="text-xl font-semibold text-white">
                📧 Email
              </h2>

              <a
                href="mailto: picearn737@gmail.com"
                className="mt-2 block text-blue-400 hover:underline"
              >
                 picearn737@gmail.com
              </a>
            </div>

            <div className="rounded-xl bg-zinc-800 p-5">
              <h2 className="text-xl font-semibold text-white">
                📷 Instagram
              </h2>

              <a
                href="https://instagram.com/9496.mk_yadav"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-pink-400 hover:underline"
              >
                @9496.mk_yadav
              </a>
            </div>

            <div className="rounded-xl bg-zinc-800 p-5">
              <h2 className="text-xl font-semibold text-white">
                💼 Business Inquiry
              </h2>

              <p className="mt-2 text-zinc-300">
                For advertisements, sponsorships, partnerships, or any
                business-related discussions, please contact us via email.
              </p>
            </div>

            <div className="rounded-xl bg-zinc-800 p-5">
              <h2 className="text-xl font-semibold text-white">
                🛠 Technical Support
              </h2>

              <p className="mt-2 text-zinc-300">
                If you&apos;re facing any issues while uploading images,
                downloading files, rewards, referrals, or withdrawals,
                please send us a detailed email and we&apos;ll assist you.
              </p>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}