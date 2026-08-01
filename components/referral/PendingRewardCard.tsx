"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdGate from "./AdGate";

interface Reward {
  id: string;
  amount: number;
  referral_code: string;
}

interface Props {
  userId: string;
}

export default function PendingRewardCard({
  userId,
}: Props) {
  const [loading, setLoading] = useState(true);
  const [claimLoading, setClaimLoading] = useState(false);
  const [showAds, setShowAds] = useState(false);
  const [rewards, setRewards] = useState<Reward[]>([]);

  const totalPending = rewards.reduce(
    (sum, reward) => sum + Number(reward.amount),
    0
  );

  //-----------------------------------------

  async function loadRewards() {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/referral/pending?userId=${userId}`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error(`API Error ${res.status}`);
      }

      const text = await res.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        console.error("Pending API Response:", text);
        throw new Error("API returned HTML instead of JSON");
      }

      if (!data.success) {
        toast.error(data.error);
        return;
      }

      setRewards(data.rewards ?? []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to Load Rewards");
    } finally {
      setLoading(false);
    }
  }

  //-----------------------------------------

  async function claimRewards() {
    try {
      setClaimLoading(true);

      const res = await fetch("/api/referral/claim", {
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

      toast.success(`₹${data.amount} Added To Wallet`);

      loadRewards();
    } catch (err) {
      console.error(err);
      toast.error("Claim Failed");
    } finally {
      setClaimLoading(false);
    }
  }

  //-----------------------------------------

  useEffect(() => {
    loadRewards();
  }, [userId]);

  //-----------------------------------------

  return (
    <>
      <div className="mt-10 rounded-2xl bg-zinc-900 p-8">
        <h2 className="text-3xl font-bold">
          🎁 Pending Referral Rewards
        </h2>

        <p className="mt-3 text-zinc-400">
          Claim rewards after watching
          2 ads (30s + 30s).
        </p>

        <div className="mt-8">
          <h3 className="text-5xl font-bold text-green-400">
            ₹{totalPending.toFixed(2)}
          </h3>

          <p className="mt-2 text-zinc-400">
            Pending Rewards
          </p>
        </div>

        <button
          disabled={
            totalPending <= 0 ||
            claimLoading ||
            loading
          }
          onClick={() => setShowAds(true)}
          className="mt-8 rounded-xl bg-green-600 px-8 py-4 font-bold text-white hover:bg-green-700 disabled:opacity-50"
        >
          {claimLoading
            ? "Claiming..."
            : "💰 Claim Rewards"}
        </button>
      </div>

      <AdGate
        open={showAds}
        onClose={() => setShowAds(false)}
        onComplete={() => {
          setShowAds(false);
          claimRewards();
        }}
      />
    </>
  );
}