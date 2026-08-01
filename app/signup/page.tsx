"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import BannerAd from "@/components/ads/BannerAd";

export default function SignupPage() {
  const searchParams = useSearchParams();

  const referralCode = searchParams.get("ref") || "";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    try {
      console.log("========== SIGNUP START ==========");

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      console.log("Signup Result:", data);
      console.log("Signup Error:", error);

      if (error) throw error;

      if (!data.user) {
        toast.error("Signup Failed");
        return;
      }

      console.log("User ID:", data.user.id);

      //----------------------------------
      // Save Name
      //----------------------------------

      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          name,
        })
        .eq("id", data.user.id);

      console.log("Profile Update Error:", profileError);

      //----------------------------------
      // Apply Referral
      //----------------------------------

      if (referralCode) {
        console.log("Referral Code:", referralCode);

        const res = await fetch("/api/referral/apply", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            referralCode,
            newUserId: data.user.id,
          }),
        });

        console.log("API Status:", res.status);

        const response = await res.json();

        console.log("API Response:", response);
      } else {
        console.log("No Referral Code");
      }

      toast.success("Account Created Successfully");

      // window.location.href = "/dashboard";

    } catch (err: unknown) {
      console.error("Signup Error:", err);

      toast.error(
        err instanceof Error ? err.message : "Signup Failed"
      );
    }
  }

  return (
    <div className="min-h-screen bg-black px-6 py-10">

      {/* Top Banner */}
      <div className="mx-auto mb-8 max-w-6xl">
        <BannerAd position="top" />
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-md rounded-2xl bg-zinc-900 p-8 shadow-xl">

          <h1 className="mb-2 text-4xl font-bold text-white">
            Create Account
          </h1>

          <p className="mb-8 text-zinc-400">
            Join PicEarn and start earning.
          </p>

          {referralCode && (
            <div className="mb-6 rounded-xl border border-green-600 bg-green-700/20 p-4">
              <p className="font-semibold text-green-400">
                Referral Code Applied
              </p>

              <p className="mt-1 text-white">
                {referralCode}
              </p>
            </div>
          )}

          {/* Middle Banner */}
          <div className="mb-6">
            <BannerAd position="middle" />
          </div>

          <form
            onSubmit={handleSignup}
            className="space-y-5"
          >
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl bg-zinc-800 p-4 text-white outline-none"
              required
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl bg-zinc-800 p-4 text-white outline-none"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl bg-zinc-800 p-4 text-white outline-none"
              required
            />

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 py-4 font-bold text-white transition hover:bg-blue-700"
            >
              Create Account
            </button>
          </form>

          {/* Bottom Banner */}
          <div className="mt-8">
            <BannerAd position="bottom" />
          </div>

        </div>
      </div>

    </div>
  );
}