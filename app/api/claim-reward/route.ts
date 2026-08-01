import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { imageId } = await req.json();

    if (!imageId) {
      return NextResponse.json(
        { error: "Image ID Missing" },
        { status: 400 }
      );
    }

    // Find Image
    const { data: image, error } = await supabase
      .from("images")
      .select("*")
      .eq("id", imageId)
      .single();

    if (error || !image) {
      return NextResponse.json(
        { error: "Image Not Found" },
        { status: 404 }
      );
    }

    // Already Claimed?
    if (image.reward_claimed) {
      return NextResponse.json(
        { error: "Reward Already Claimed" },
        { status: 400 }
      );
    }

    // Find Profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", image.user_id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: "Profile Not Found" },
        { status: 404 }
      );
    }

    // Update Wallet & Points
    const { error: updateProfileError } = await supabase
      .from("profiles")
      .update({
        wallet: Number(profile.wallet ?? 0) + Number(image.reward_points),
        points: Number(profile.points ?? 0) + Number(image.reward_points),
      })
      .eq("id", profile.id);

    if (updateProfileError) {
      return NextResponse.json(
        { error: updateProfileError.message },
        { status: 500 }
      );
    }

    // Mark Reward Claimed
    const { data: claimedImage, error: imageError } = await supabase
      .from("images")
      .update({
        reward_claimed: true,
      })
      .eq("id", image.id)
      .eq("reward_claimed", false)
      .select()
      .single();

    if (imageError || !claimedImage) {
      return NextResponse.json(
        { error: "Reward Already Claimed" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      reward: image.reward_points,
    });

 } catch (err) {
  console.error("CLAIM ERROR =>", err);

  return NextResponse.json(
    {
      error: err instanceof Error ? err.message : String(err),
    },
    {
      status: 500,
    }
  );
}
}