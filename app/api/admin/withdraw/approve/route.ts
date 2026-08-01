import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { withdrawId } = await req.json();

    console.log("====================================");
    console.log("APPROVE API CALLED");
    console.log("Withdraw ID:", withdrawId);
    console.log("====================================");

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

    //------------------------------------
    // Get Withdraw Request
    //------------------------------------

    const { data: withdraw, error: withdrawError } = await supabase
      .from("withdraw_requests")
      .select("*")
      .eq("id", withdrawId)
      .single();

    if (withdrawError || !withdraw) {
      console.log("Withdraw Not Found:", withdrawError);

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

    console.log("Withdraw Status:", withdraw.status);

    if (withdraw.status !== "Pending") {
      console.log("Already Processed");

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

    //------------------------------------
    // Get Wallet
    //------------------------------------

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("wallet")
      .eq("id", withdraw.user_id)
      .single();

    if (profileError || !profile) {
      console.log("Profile Error:", profileError);

      return NextResponse.json(
        {
          success: false,
          error: "Profile Not Found",
        },
        {
          status: 404,
        }
      );
    }

    console.log("Current Wallet:", profile.wallet);
    console.log("Withdraw Amount:", withdraw.amount);

    if (profile.wallet < withdraw.amount) {
      console.log("Insufficient Wallet");

      return NextResponse.json(
        {
          success: false,
          error: "Insufficient Wallet Balance",
        },
        {
          status: 400,
        }
      );
    }

    //------------------------------------
    // Deduct Wallet
    //------------------------------------

    const newWallet = profile.wallet - withdraw.amount;

    console.log("New Wallet:", newWallet);

    const { error: walletError } = await supabase
      .from("profiles")
      .update({
        wallet: newWallet,
      })
      .eq("id", withdraw.user_id);

    if (walletError) {
      console.log("Wallet Error:", walletError);

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

    console.log("Wallet Updated");

    //------------------------------------
    // Wallet Transaction
    //------------------------------------

    const { error: transactionError } = await supabase
      .from("wallet_transactions")
      .insert([
        {
          user_id: withdraw.user_id,
          type: "Withdraw",
          amount: withdraw.amount,
          description: `Withdraw Approved (${withdraw.upi_id})`,
        },
      ]);

    if (transactionError) {
      console.log("Transaction Error:", transactionError);

      return NextResponse.json(
        {
          success: false,
          error: transactionError.message,
        },
        {
          status: 500,
        }
      );
    }

    console.log("Transaction Saved");

    //------------------------------------
    // Update Withdraw Status
    //------------------------------------

    const { error: updateError } = await supabase
      .from("withdraw_requests")
      .update({
        status: "Paid",
        processed_at: new Date().toISOString(),
      })
      .eq("id", withdrawId);

    if (updateError) {
      console.log("Status Update Error:", updateError);

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

    console.log("Withdraw Marked Paid");
    console.log("========== DONE ==========");

    return NextResponse.json({
      success: true,
      message: "Withdrawal Approved Successfully",
    });
  } catch (error) {
    console.error("SERVER ERROR:", error);

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