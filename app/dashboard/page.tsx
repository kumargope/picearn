"use client";

import ReferralCard from "@/components/dashboard/ReferralCard";
import WithdrawalHistory from "@/components/withdraw/WithdrawalHistory";
import TransactionHistory from "@/components/transactions/TransactionHistory";
import WithdrawModal from "@/components/withdraw/WithdrawModal";
import { useCallback, useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import BannerAd from "@/components/ads/BannerAd";
import ImageList from "@/components/dashboard/ImageList";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import PendingRewardCard from "@/components/referral/PendingRewardCard";
import ReferralHistory from "@/components/referral/ReferralHistory";

interface ImageData {
  id: string;
  title: string | null;
  image_url: string | null;
  slug: string;

  views: number;
  downloads: number;

  earnings: number;
  reward_points: number;

  created_at: string;
  last_download_at: string | null;
}
  

export default function DashboardPage() {
  const { user, profile, loading } = useAuth();

  const [images, setImages] = useState<ImageData[]>([]);
  const [totalViews, setTotalViews] = useState(0);
  const [openWithdraw, setOpenWithdraw] = useState(false);

 

  const loadImages = useCallback(async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("images")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    const imageData = (data ?? []) as ImageData[];

    setImages(imageData);

    const total = imageData.reduce(
      (sum, img) => sum + (img.views ?? 0),
      0
    );

    setTotalViews(total);
  }, [user]);

  useEffect(() => {
    if (user) {
      void loadImages();
    }
  }, [loadImages, user]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="flex h-[80vh] items-center justify-center text-xl">
          Loading...
        </main>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Navbar />
        <main className="flex h-[80vh] items-center justify-center text-xl">
          Please Login First
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-12">
          <BannerAd position="top" />
        <h1 className="mb-8 text-4xl font-bold">Dashboard</h1>

        <div className="grid gap-6 md:grid-cols-4">
          
            <div className="rounded-2xl bg-zinc-900 p-6">
  <p className="text-gray-400">Wallet</p>

  <h2 className="mt-3 text-3xl font-bold">
    ₹{profile?.wallet ?? 0}
  </h2>

  <button
    onClick={() => setOpenWithdraw(true)}
    className="mt-5 w-full rounded-lg bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
  >
    💸 Withdraw
  </button>
</div>

          <div className="rounded-2xl bg-zinc-900 p-6">
            <p className="text-gray-400">Points</p>
            <h2 className="mt-3 text-3xl font-bold">
              {profile?.points ?? 0}
            </h2>
          </div>

          <div className="rounded-2xl bg-zinc-900 p-6">
            <p className="text-gray-400">Images</p>
            <h2 className="mt-3 text-3xl font-bold">{images.length}</h2>
          </div>

          <div className="rounded-2xl bg-zinc-900 p-6">
            <p className="text-gray-400">Views</p>
            <h2 className="mt-3 text-3xl font-bold">{totalViews}</h2>
          </div>
        </div>

        <div className="mt-10 rounded-2xl bg-zinc-900 p-8">
          <h2 className="mb-5 text-2xl font-bold">Account Information</h2>

          <div className="space-y-3 text-lg">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Name:</strong> {profile?.name || "Not Set"}</p>
            <p><strong>Country:</strong> {profile?.country || "Not Set"}</p>
          </div>
        </div>

        <ReferralCard userId={user.id} />

        <PendingRewardCard userId={user.id} />

        <ReferralHistory userId={user.id} />

        <BannerAd position="middle" />

        <div className="mt-10">
          <h2 className="mb-6 text-2xl font-bold">Uploaded Images</h2>

          <ImageList
            images={images}
            onRefresh={loadImages}
          />
        </div>
        <TransactionHistory />
        <div className="mt-10">
  <WithdrawalHistory />
</div>
<BannerAd position="bottom" />
      </main>
      <WithdrawModal
  open={openWithdraw}
  onClose={() => setOpenWithdraw(false)}
/>
    </>
  );
}
