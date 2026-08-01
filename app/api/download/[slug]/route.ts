import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  //-----------------------------------
  // Get Image
  //-----------------------------------

  const { data: image, error } = await supabase
    .from("images")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !image) {
    console.log("IMAGE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Image not found",
      },
      {
        status: 404,
      }
    );
  }

  //-----------------------------------
  // Update Image
  //-----------------------------------

  const downloads = (image.downloads ?? 0) + 1;
  const earnings = (image.earnings ?? 0) + 0.5;

  const { error: imageError } = await supabase
    .from("images")
    .update({
      downloads,
      earnings,
      last_download_at: new Date().toISOString(),
    })
    .eq("id", image.id);

  if (imageError) {
    console.log("IMAGE UPDATE ERROR:", imageError);

    return NextResponse.json(
      {
        success: false,
        error: imageError.message,
      },
      {
        status: 500,
      }
    );
  }

  //-----------------------------------
  // Update Wallet
  //-----------------------------------

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("wallet")
    .eq("id", image.user_id)
    .single();

  console.log("USER ID =>", image.user_id);

  if (profileError) {
    console.log("PROFILE ERROR =>", profileError);
  }

  if (profile) {
    const newWallet = (profile.wallet ?? 0) + 0.5;

    const { error: walletError } = await supabase
      .from("profiles")
      .update({
        wallet: newWallet,
      })
      .eq("id", image.user_id);

    console.log("WALLET UPDATE ERROR =>", walletError);

    //-----------------------------------
    // Wallet Transaction
    //-----------------------------------

    const { error: txError } = await supabase
      .from("wallet_transactions")
      .insert({
        user_id: image.user_id,
        type: "Download Income",
        amount: 0.5,
        description: `Image Download (${image.title || image.file_name || "Image"})`,
      });

    console.log("TX ERROR =>", txError);
  }

  //-----------------------------------

  return NextResponse.json({
    success: true,
    image_url: image.image_url,
    downloads,
    earnings,
  });
}