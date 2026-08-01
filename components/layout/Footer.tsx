"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid gap-10 md:grid-cols-3">

          {/* Logo */}
          <div>
            <h2 className="text-3xl font-bold text-blue-500">
              PicEarn
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-400">
              Upload your images, share links, earn rewards and grow your
              audience with PicEarn.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-xl font-semibold text-white">
              Quick Links
            </h3>

            <div className="grid grid-cols-2 gap-3 text-gray-400">

              <Link href="/" className="hover:text-blue-500">
                Home
              </Link>

              <Link href="/upload" className="hover:text-blue-500">
                Upload
              </Link>

              <Link href="/dashboard" className="hover:text-blue-500">
                Dashboard
              </Link>

              <Link href="/blog" className="hover:text-blue-500">
                Blog
              </Link>

              <Link href="/about" className="hover:text-blue-500">
                About
              </Link>

              <Link href="/contact" className="hover:text-blue-500">
                Contact
              </Link>

              <Link href="/privacy" className="hover:text-blue-500">
                Privacy Policy
              </Link>

              <Link href="/terms" className="hover:text-blue-500">
                Terms
              </Link>

              <Link href="/dmca" className="hover:text-blue-500">
                DMCA
              </Link>

            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-xl font-semibold text-white">
              Contact
            </h3>

            <p className="mb-3 text-gray-400">
              📧 Email:
            </p>

            <a
              href="mailto:kmk93048@gmail.com"
              className="text-blue-500 hover:underline"
            >
              kmk93048@gmail.com
            </a>

            <p className="mt-6 mb-3 text-gray-400">
              📷 Instagram
            </p>

            <a
              href="https://instagram.com/9496.mk_yadav"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:underline"
            >
              @9496.mk_yadav
            </a>
          </div>

        </div>

        <div className="mt-10 border-t border-zinc-800 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} PicEarn. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}