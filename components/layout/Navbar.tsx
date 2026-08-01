"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

import LoginModal from "@/components/auth/LoginModal";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const [openLogin, setOpenLogin] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [openMore, setOpenMore] = useState(false);

  const {
    user,
    profile,
    logout,
    loading,
  } = useAuth();

  async function handleLogout() {
    await logout();
    toast.success("Logged Out");
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-extrabold text-blue-600"
          >
            PicEarn
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden items-center gap-6 lg:flex">

            <Link href="/" className="hover:text-blue-500 transition">
              Home
            </Link>

            <Link href="/explore" className="hover:text-blue-500 transition">
              Explore
            </Link>

            <Link href="/trending" className="hover:text-blue-500 transition">
              Trending
            </Link>

            <Link href="/search" className="hover:text-blue-500 transition">
              Search
            </Link>

            <Link href="/upload" className="hover:text-blue-500 transition">
              Upload
            </Link>

            <Link href="/dashboard" className="hover:text-blue-500 transition">
              Dashboard
            </Link>

            {/* Dropdown */}
            <div className="relative">

              <button
                onClick={() => setOpenMore(!openMore)}
                className="flex items-center gap-1 hover:text-blue-500 transition"
              >
                More
                <span
                  className={`transition ${
                    openMore ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {openMore && (

                <div className="absolute right-0 mt-4 w-56 rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl">

                  <Link
                    href="/blog"
                    onClick={() => setOpenMore(false)}
                    className="block px-5 py-3 hover:bg-zinc-800"
                  >
                    Blog
                  </Link>

                  <Link
                    href="/#faq"
                    onClick={() => setOpenMore(false)}
                    className="block px-5 py-3 hover:bg-zinc-800"
                  >
                    FAQ
                  </Link>

                  <Link
                    href="/about"
                    onClick={() => setOpenMore(false)}
                    className="block px-5 py-3 hover:bg-zinc-800"
                  >
                    About
                  </Link>

                  <Link
                    href="/contact"
                    onClick={() => setOpenMore(false)}
                    className="block px-5 py-3 hover:bg-zinc-800"
                  >
                    Contact
                  </Link>

                  <Link
                    href="/privacy"
                    onClick={() => setOpenMore(false)}
                    className="block px-5 py-3 hover:bg-zinc-800"
                  >
                    Privacy Policy
                  </Link>

                  <Link
                    href="/terms"
                    onClick={() => setOpenMore(false)}
                    className="block px-5 py-3 hover:bg-zinc-800"
                  >
                    Terms & Conditions
                  </Link>

                  <Link
                    href="/dmca"
                    onClick={() => setOpenMore(false)}
                    className="block px-5 py-3 hover:bg-zinc-800"
                  >
                    DMCA
                  </Link>

                </div>

              )}

            </div>

          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
             <button
    onClick={() => setMobileMenu(!mobileMenu)}
    className="lg:hidden rounded-lg border border-zinc-700 p-2"
  >
    {mobileMenu ? <X size={22} /> : <Menu size={22} />}
  </button>

            {loading ? (
              <span className="text-sm text-zinc-400">
                Loading...
              </span>
            ) : user ? (
              <>

                <div className="hidden rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2 md:block">

                  <p className="font-semibold">
                    {profile?.name || user.email}
                  </p>

                  <p className="text-xs text-zinc-400">
                    💰 Wallet ₹{profile?.wallet ?? 0}
                  </p>

                  <p className="text-xs text-zinc-400">
                    ⭐ Points {profile?.points ?? 0}
                  </p>

                </div>

                <button
                  onClick={handleLogout}
                  className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                >
                  Logout
                </button>

              </>
            ) : (
              <>

                <button
                  onClick={() => setOpenLogin(true)}
                  className="rounded-lg border border-zinc-600 px-4 py-2 hover:bg-zinc-800"
                >
                  Login
                </button>

                <button
                  onClick={() => setOpenLogin(true)}
                  className="rounded-lg bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-700"
                >
                  Sign Up
                </button>

              </>
            )}

          </div>

        </div>
      </header>

      {mobileMenu && (
  <div className="lg:hidden border-b border-zinc-800 bg-black">

    <nav className="flex flex-col">

      <Link
        href="/"
        className="border-b border-zinc-800 px-6 py-4 hover:bg-zinc-900"
        onClick={() => setMobileMenu(false)}
      >
        Home
      </Link>

      <Link
        href="/upload"
        className="border-b border-zinc-800 px-6 py-4 hover:bg-zinc-900"
        onClick={() => setMobileMenu(false)}
      >
        Upload
      </Link>

      <Link
        href="/dashboard"
        className="border-b border-zinc-800 px-6 py-4 hover:bg-zinc-900"
        onClick={() => setMobileMenu(false)}
      >
        Dashboard
      </Link>

      <Link
        href="/blog"
        className="border-b border-zinc-800 px-6 py-4 hover:bg-zinc-900"
        onClick={() => setMobileMenu(false)}
      >
        Blog
      </Link>

      <Link
        href="/about"
        className="border-b border-zinc-800 px-6 py-4 hover:bg-zinc-900"
        onClick={() => setMobileMenu(false)}
      >
        About
      </Link>

      <Link
        href="/contact"
        className="border-b border-zinc-800 px-6 py-4 hover:bg-zinc-900"
        onClick={() => setMobileMenu(false)}
      >
        Contact
      </Link>

      <Link
        href="/privacy"
        className="border-b border-zinc-800 px-6 py-4 hover:bg-zinc-900"
        onClick={() => setMobileMenu(false)}
      >
        Privacy Policy
      </Link>

      <Link
        href="/terms"
        className="border-b border-zinc-800 px-6 py-4 hover:bg-zinc-900"
        onClick={() => setMobileMenu(false)}
      >
        Terms & Conditions
      </Link>

      <Link
        href="/dmca"
        className="border-b border-zinc-800 px-6 py-4 hover:bg-zinc-900"
        onClick={() => setMobileMenu(false)}
      >
        DMCA Policy
      </Link>

      <Link
        href="/faq"
        className="border-b border-zinc-800 px-6 py-4 hover:bg-zinc-900"
        onClick={() => setMobileMenu(false)}
      >
        FAQ
      </Link>

    </nav>

  </div>
)}

      <LoginModal
        open={openLogin}
        onClose={() => setOpenLogin(false)}
      />
    </>
  );
}