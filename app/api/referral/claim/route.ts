import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "User ID Missing",
        },
        {
          status: 400,
        }
      );
    }

    //-------------------------------------------------
    // Get Pending Rewards
    //-------------------------------------------------

    const { data: rewards, error: rewardError } = await supabase
      .from("referral_rewards")
      .select("*")
      .eq("referrer_id", userId)
      .eq("status", "pending");

    if (rewardError) {
      return NextResponse.json(
        {
          success: false,
          error: rewardError.message,
        },
        {
          status: 500,
        }
      );
    }

    if (!rewards || rewards.length === 0) {
      return NextResponse.json({
        success: false,
        error: "No Pending Rewards",
      });
    }

    //-------------------------------------------------
    // Calculate Total Amount
    //-------------------------------------------------

    const totalAmount = rewards.reduce(
      (sum, reward) => sum + Number(reward.amount),
      0
    );

    //-------------------------------------------------
    // Get Current Wallet
    //-------------------------------------------------

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("wallet")
      .eq("id", userId)
      .single();

    if (profileError) {
      return NextResponse.json(
        {
          success: false,
          error: profileError.message,
        },
        {
          status: 500,
        }
      );
    }

    //-------------------------------------------------
    // Update Wallet
    //-------------------------------------------------

    const newWallet =
      Number(profile.wallet ?? 0) + totalAmount;

    const { error: walletError } = await supabase
      .from("profiles")
      .update({
        wallet: newWallet,
      })
      .eq("id", userId);

    if (walletError) {
      return NextResponse.json(
        {
          success: false,
          error: walletError.message,
        },
        {
          status: 500,
        }
      );
    }

    //-------------------------------------------------
    // Mark Rewards Claimed
    //-------------------------------------------------

    const rewardIds = rewards.map((r) => r.id);

    const { error: claimError } = await supabase
      .from("referral_rewards")
      .update({
        status: "claimed",
        claimed_at: new Date().toISOString(),
      })
      .in("id", rewardIds);

    if (claimError) {
      return NextResponse.json(
        {
          success: false,
          error: claimError.message,
        },
        {
          status: 500,
        }
      );
    }

    //-------------------------------------------------
    // Optional Transaction History
    //-------------------------------------------------

    await supabase
      .from("transactions")
      .insert({
        user_id: userId,
        type: "Referral Reward",
        amount: totalAmount,
        status: "completed",
      });

    //-------------------------------------------------

    return NextResponse.json({
      success: true,
      amount: totalAmount,
      wallet: newWallet,
    });

  } catch (err) {
    console.error(err);

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