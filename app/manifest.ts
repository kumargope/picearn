import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PicEarn",
    short_name: "PicEarn",
    description: "Upload Images & Earn Rewards",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#2563eb",

    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}