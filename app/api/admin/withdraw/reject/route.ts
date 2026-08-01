import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { withdrawId } = await req.json();

    if (!withdrawId) {
      return NextResponse.json(
        {
          success: false,
          error: "Withdraw ID Missing",
        },
        {
          status: 400,
        }
      );
    }

    const { data: withdraw, error } = await supabase
      .from("withdraw_requests")
      .select("*")
      .eq("id", withdrawId)
      .single();

    if (error || !withdraw) {
      return NextResponse.json(
        {
          success: false,
          error: "Withdraw Request Not Found",
        },
        {
          status: 404,
        }
      );
    }

    if (withdraw.status !== "Pending") {
      return NextResponse.json(
        {
          success: false,
          error: "Already Processed",
        },
        {
          status: 400,
        }
      );
    }

    const { error: updateError } = await supabase
      .from("withdraw_requests")
      .update({
        status: "Rejected",
        processed_at: new Date().toISOString(),
      })
      .eq("id", withdrawId);

    if (updateError) {
      return NextResponse.json(
        {
          success: false,
          error: updateError.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Withdrawal Rejected Successfully",
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