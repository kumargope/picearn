import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    //------------------------------------
    // USERS
    //------------------------------------

    const { count: totalUsers } = await supabase
      .from("profiles")
      .select("*", {
        count: "exact",
        head: true,
      });

    //------------------------------------
    // IMAGES
    //------------------------------------

    const { data: images } = await supabase
      .from("images")
      .select(`
        views,
        downloads,
        earnings
      `);

    let totalViews = 0;
    let totalDownloads = 0;
    let totalEarnings = 0;

    images?.forEach((img) => {
      totalViews += img.views ?? 0;
      totalDownloads += img.downloads ?? 0;
      totalEarnings += img.earnings ?? 0;
    });

    //------------------------------------
    // WALLET
    //------------------------------------

    const { data: wallets } = await supabase
      .from("profiles")
      .select("wallet");

    let totalWallet = 0;

    wallets?.forEach((item) => {
      totalWallet += item.wallet ?? 0;
    });

    //------------------------------------
    // WITHDRAW REQUESTS
    //------------------------------------

    const { data: withdraws } = await supabase
      .from("withdraw_requests")
      .select("amount,status");

    let pendingAmount = 0;
    let paidAmount = 0;
    let rejectedAmount = 0;

    let pendingCount = 0;
    let paidCount = 0;
    let rejectedCount = 0;

    withdraws?.forEach((item) => {
      if (item.status === "Pending") {
        pendingCount++;
        pendingAmount += item.amount ?? 0;
      }

      if (item.status === "Paid") {
        paidCount++;
        paidAmount += item.amount ?? 0;
      }

      if (item.status === "Rejected") {
        rejectedCount++;
        rejectedAmount += item.amount ?? 0;
      }
    });

    //------------------------------------

    return NextResponse.json({
      success: true,

      totalUsers: totalUsers ?? 0,

      totalImages: images?.length ?? 0,

      totalViews,

      totalDownloads,

      totalEarnings,

      totalWallet,

      pendingCount,

      paidCount,

      rejectedCount,

      pendingAmount,

      paidAmount,

      rejectedAmount,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}