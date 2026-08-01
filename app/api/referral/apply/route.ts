import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    console.log("========== REFERRAL APPLY ==========");

    const { referralCode, newUserId } = await req.json();

    console.log("Referral Code:", referralCode);
    console.log("New User:", newUserId);

    if (!referralCode || !newUserId) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing Data",
        },
        { status: 400 }
      );
    }

    //--------------------------------------------------
    // Find Referral Code
    //--------------------------------------------------

    const { data: codeData, error: codeError } = await supabase
      .from("referral_codes")
      .select("*")
      .eq("code", referralCode)
      .maybeSingle();

    console.log("Referral Data:", codeData);
    console.log("Referral Error:", codeError);

    if (codeError) {
      return NextResponse.json(
        {
          success: false,
          error: codeError.message,
        },
        { status: 500 }
      );
    }

    if (!codeData) {
      return NextResponse.json({
        success: false,
        error: "Invalid Referral Code",
      });
    }

    //--------------------------------------------------
    // Already Used
    //--------------------------------------------------

    if (codeData.status !== "unused") {
      return NextResponse.json({
        success: false,
        error: "Referral Code Already Used",
      });
    }

    //--------------------------------------------------
    // Self Referral
    //--------------------------------------------------

    if (codeData.user_id === newUserId) {
      return NextResponse.json({
        success: false,
        error: "Self Referral Not Allowed",
      });
    }

    //--------------------------------------------------
    // Update Referral Code
    //--------------------------------------------------

    const { data: updateData, error: updateError } = await supabase
      .from("referral_codes")
      .update({
        status: "used",
        used_by: newUserId,
        used_at: new Date().toISOString(),
      })
      .eq("id", codeData.id)
      .select();

    console.log("Update Data:", updateData);
    console.log("Update Error:", updateError);

    if (updateError) {
      return NextResponse.json(
        {
          success: false,
          error: updateError.message,
        },
        { status: 500 }
      );
    }

    //--------------------------------------------------
    // Insert Reward
    //--------------------------------------------------

    const rewardPayload = {
      referrer_id: codeData.user_id,
      referred_user_id: newUserId,
      referral_code: referralCode,
      amount: 0.5,
      status: "pending",
    };

    console.log("Reward Payload:");
    console.log(rewardPayload);

    const { data: rewardData, error: rewardError } = await supabase
      .from("referral_rewards")
      .insert(rewardPayload)
      .select();

    console.log("Reward Data:");
    console.log(rewardData);

    console.log("Reward Error:");
    console.log(rewardError);

    if (rewardError) {
      return NextResponse.json(
        {
          success: false,
          error: rewardError.message,
          details: rewardError.details,
          hint: rewardError.hint,
          code: rewardError.code,
        },
        { status: 500 }
      );
    }

    //--------------------------------------------------

    return NextResponse.json({
      success: true,
      message: "Referral Applied Successfully",
      reward: rewardData,
    });
  } catch (err: any) {
    console.log("========== APPLY ERROR ==========");
    console.log(err);

    return NextResponse.json(
      {
        success: false,
        error: err?.message || "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}