import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { generateReferralCode } from "@/lib/referral";

console.log(
  "SERVICE ROLE FOUND:",
  !!process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log(
  "SERVICE ROLE PREFIX:",
  process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 20)
);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    console.log("========== REFERRAL API ==========");

    const { userId } = await req.json();

    console.log("User ID:", userId);

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "User ID Missing",
        },
        { status: 400 }
      );
    }

    //-----------------------------------------
    // Expire old unused codes
    //-----------------------------------------

    const { error: expireError } = await supabase
      .from("referral_codes")
      .update({
        status: "expired",
      })
      .eq("user_id", userId)
      .eq("status", "unused");

    if (expireError) {
      console.error("Expire Error:", expireError);

      return NextResponse.json(
        {
          success: false,
          error: expireError.message,
        },
        { status: 500 }
      );
    }

    //-----------------------------------------
    // Generate unique code
    //-----------------------------------------

    let code = "";
    let exists = true;

    while (exists) {
      code = generateReferralCode();

      const { data, error } = await supabase
        .from("referral_codes")
        .select("id")
        .eq("code", code)
        .maybeSingle();

      if (error) {
        console.error("Check Code Error:", error);

        return NextResponse.json(
          {
            success: false,
            error: error.message,
          },
          { status: 500 }
        );
      }

      if (!data) {
        exists = false;
      }
    }

    console.log("Generated Code:", code);

    //-----------------------------------------
    // Save
    //-----------------------------------------

    const { data: insertedData, error: insertError } = await supabase
      .from("referral_codes")
      .insert({
        user_id: userId,
        code,
        status: "unused",
        generate_ad_completed: true,
      })
      .select();

    if (insertError) {
      console.error("Insert Error:", insertError);

      return NextResponse.json(
        {
          success: false,
          error: insertError.message,
        },
        { status: 500 }
      );
    }

    console.log("Inserted:", insertedData);

    //-----------------------------------------

    return NextResponse.json({
      success: true,
      code,
      referralLink: `${process.env.NEXT_PUBLIC_SITE_URL}/signup?ref=${code}`,
    });

  } catch (err) {
    console.error("Server Error:", err);

    return NextResponse.json(
      {
        success: false,
        error: "Server Error",
      },
      { status: 500 }
    );
  }
}