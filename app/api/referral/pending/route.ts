import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    //---------------------------------------
    // User ID
    //---------------------------------------

    const userId =
      req.nextUrl.searchParams.get("userId");

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

    //---------------------------------------
    // Pending Rewards
    //---------------------------------------

    const { data, error } = await supabase
      .from("referral_rewards")
      .select(
        `
        id,
        amount,
        referral_code,
        created_at
      `
      )
      .eq("referrer_id", userId)
      .eq("status", "pending")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    //---------------------------------------

    return NextResponse.json({
      success: true,
      rewards: data ?? [],
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