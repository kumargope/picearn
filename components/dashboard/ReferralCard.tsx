"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import AdGate from "@/components/referral/AdGate";

interface Props {
  userId: string;
}

export default function ReferralCard({
  userId,
}: Props) {
  const [showAds, setShowAds] = useState(false);

  const [loading, setLoading] = useState(false);

  const [referralLink, setReferralLink] = useState("");

  //----------------------------------------
  // Generate Referral AFTER ADS
  //----------------------------------------

  async function generateReferral() {
    try {
      setLoading(true);

      const res = await fetch("/api/referral/generate", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          userId,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.error);
        return;
      }

      setReferralLink(data.referralLink);

      toast.success("Referral Link Generated 🎉");
    } catch (err) {
      console.error(err);

      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  //----------------------------------------

  async function copyLink() {
    if (!referralLink) return;

    await navigator.clipboard.writeText(referralLink);

    toast.success("Copied");
  }

  //----------------------------------------

  return (
    <>
      <div className="mt-10 rounded-2xl bg-zinc-900 p-8">

        <h2 className="text-3xl font-bold">
          🎁 Referral Program
        </h2>

        <p className="mt-3 text-gray-400">
          Invite your friends and earn ₹0.50
          for every successful signup.
        </p>

        <div className="mt-6">

          <button
            disabled={loading}
            onClick={() => setShowAds(true)}
            className="rounded-xl bg-blue-600 px-8 py-4 font-bold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading
              ? "Generating..."
              : "Generate Referral Link"}
          </button>

        </div>

        {referralLink && (

          <div className="mt-8">

            <input
              readOnly
              value={referralLink}
              className="w-full rounded-xl bg-zinc-800 p-4 text-white"
            />

           <div className="mt-4 flex flex-wrap gap-3">

  <button
    onClick={copyLink}
    className="rounded-xl bg-green-600 px-8 py-3 font-bold hover:bg-green-700"
  >
    📋 Copy Link
  </button>

  <button
    disabled={loading}
    onClick={() => setShowAds(true)}
    className="rounded-xl bg-blue-600 px-8 py-3 font-bold hover:bg-blue-700 disabled:opacity-50"
  >
    🔄 Generate New Link
  </button>

</div>

          </div>

        )}

      </div>

      <AdGate
        open={showAds}
        onClose={() => setShowAds(false)}
        onComplete={() => {
          setShowAds(false);

          generateReferral();
        }}
      />
    </>
  );
}