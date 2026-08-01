import { supabase } from "./supabase";

export async function uploadImage(
  file: File,
  title: string,
  description: string,
  tags: string,
  category: string
) {
  // ===============================
  // Get Logged In User
  // ===============================
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Please login first.");
  }

  // ===============================
  // Generate File Name
  // ===============================
  const fileExt = file.name.split(".").pop();

  const fileName =
    Date.now() +
    "-" +
    Math.random().toString(36).substring(2, 10) +
    "." +
    fileExt;

  // ===============================
  // Upload Image To Storage
  // ===============================
  const { error } = await supabase.storage
    .from("images")
    .upload(fileName, file);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  // ===============================
  // Get Public URL
  // ===============================
  const {
    data: { publicUrl },
  } = supabase.storage
    .from("images")
    .getPublicUrl(fileName);

  const slug = Math.random().toString(36).substring(2, 10);

  // ===============================
  // Save Into Database
  // ===============================
 const { data, error: dbError } = await supabase
  .from("images")
  .insert([
    {
      user_id: user.id,
      title: title || file.name,
description,
tags,
category,
      image_url: publicUrl,
      slug,

      views: 0,
      downloads: 0,
      reward_points: 0.50,   

      file_size: file.size,
      mime_type: file.type,
    },
  ])
  .select()
  .single();

if (dbError) {
  console.error(dbError);
  throw new Error(dbError.message);
}

return {
  id: data.id,
  url: publicUrl,
  slug,
};
}