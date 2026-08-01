import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const { data, error } = await supabase
    .from("images")
    .select(
      `
      id,
      title,
      image_url,
      slug,
      views,
      downloads,
      reward_points
      `
    )
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return NextResponse.json(
      {
        success: false,
        message: "Image not found",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json({
    success: true,
    image: data,
  });
}