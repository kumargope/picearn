import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    //--------------------------------------
    // Images
    //--------------------------------------

    const { data: images } = await supabase
      .from("images")
      .select("*");

    //--------------------------------------
    // Top Downloaded Images
    //--------------------------------------

    const topImages = [...(images ?? [])]
      .sort((a, b) => (b.downloads ?? 0) - (a.downloads ?? 0))
      .slice(0, 10)
      .map((img) => ({
        title: img.title,
        downloads: img.downloads,
      }));

    //--------------------------------------
    // Daily Downloads / Earnings
    //--------------------------------------

    const dailyMap: Record<
      string,
      {
        downloads: number;
        earnings: number;
      }
    > = {};

    images?.forEach((img) => {
      const date = new Date(img.created_at)
        .toISOString()
        .split("T")[0];

      if (!dailyMap[date]) {
        dailyMap[date] = {
          downloads: 0,
          earnings: 0,
        };
      }

      dailyMap[date].downloads += img.downloads ?? 0;
      dailyMap[date].earnings += img.earnings ?? 0;
    });

    const chartData = Object.keys(dailyMap)
      .sort()
      .map((date) => ({
        date,
        downloads: dailyMap[date].downloads,
        earnings: dailyMap[date].earnings,
      }));

    //--------------------------------------
    // Top Earners
    //--------------------------------------

    const { data: users } = await supabase
  .from("profiles")
  .select("name,email,wallet");

const topEarners = [...(users ?? [])]
  .sort((a, b) => (b.wallet ?? 0) - (a.wallet ?? 0))
  .slice(0, 10)
  .map((user) => ({
    name:
      user.name ||
      user.email?.split("@")[0] ||
      "Unknown",
    wallet: user.wallet,
  }));

    //--------------------------------------

    return NextResponse.json({
      success: true,

      chartData,

      topImages,

      topEarners,
    });
  } catch (err) {
    console.error(err);

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