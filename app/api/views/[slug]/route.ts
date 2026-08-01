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

  const { data: image, error } = await supabase
    .from("images")
    .select("*")
    .eq("slug", slug)
    .single();

  console.log("IMAGE:", image);
  console.log("SELECT ERROR:", error);

  if (error || !image) {
    return NextResponse.json(
      { error: "Image not found" },
      { status: 404 }
    );
  }

  const newViews = (image.views ?? 0) + 1;

  const { data, error: updateError } = await supabase
    .from("images")
    .update({
      views: newViews,
    })
    .eq("id", image.id)
    .select();

  console.log("UPDATED DATA:", data);
  console.log("UPDATE ERROR:", updateError);

  // Check database again
  const { data: check } = await supabase
    .from("images")
    .select("views")
    .eq("id", image.id)
    .single();

  console.log("DATABASE AFTER UPDATE:", check);

  return NextResponse.json({
    success: true,
    before: image.views,
    after: newViews,
    database: check,
  });
}