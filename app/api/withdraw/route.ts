import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { user_id, amount, upi_id } = body;

    console.log("Withdraw Request:", body);

    if (!user_id || !amount || !upi_id) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing Fields",
        },
        {
          status: 400,
        }
      );
    }

    //-----------------------------------
// Minimum Withdraw ₹30
//-----------------------------------

if (Number(amount) < 30) {
  return NextResponse.json(
    {
      success: false,
      error: "Minimum withdrawal amount is ₹30",
    },
    {
      status: 400,
    }
  );
}

    //-----------------------------------
    // Get Wallet
    //-----------------------------------

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("wallet")
      .eq("id", user_id)
      .single();

    console.log("Profile:", profile);

    if (profileError || !profile) {
      return NextResponse.json(
        {
          success: false,
          error: "Profile not found",
        },
        {
          status: 404,
        }
      );
    }

    if (profile.wallet < amount) {
      return NextResponse.json(
        {
          success: false,
          error: "Insufficient Balance",
        },
        {
          status: 400,
        }
      );
    }

    //-----------------------------------
    // Create Withdraw Request ONLY
    //-----------------------------------

    const { error: insertError } = await supabase
      .from("withdraw_requests")
      .insert({
        user_id,
        amount,
        upi_id,
        status: "Pending",
      });

    if (insertError) {
      return NextResponse.json(
        {
          success: false,
          error: insertError.message,
        },
        {
          status: 500,
        }
      );
    }

    console.log("Withdraw Request Created");

    //-----------------------------------
    // IMPORTANT
    // Wallet will be deducted ONLY after
    // Admin clicks Approve
    //-----------------------------------

    return NextResponse.json({
      success: true,
      message: "Withdraw Request Submitted",
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