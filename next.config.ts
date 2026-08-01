import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ahjdbwntjfteycjoezxi.supabase.co",
      },
    ],
  },
};

export default nextConfig;