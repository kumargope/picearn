import { supabase } from "./supabase";

export async function claimReward(imageSlug: string) {
  // Logged-in user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Please login first");
  }

  // Reward history save
  const { error } = await supabase
    .from("rewards")
    .insert([
      {
        user_id: user.id,
        points: 10,
      },
    ]);

  if (error) {
    throw new Error(error.message);
  }

  // Current points
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("points")
    .eq("id", user.id)
    .single();

  if (profileError) {
    throw new Error(profileError.message);
  }

  // Update total points
  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      points: (profile?.points ?? 0) + 10,
    })
    .eq("id", user.id);

  if (updateError) {
    throw new Error(updateError.message);
  }

  return true;
}