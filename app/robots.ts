import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"],
    },
    sitemap: "https://picearn-9xoo.vercel.app/sitemap.xml",
    host: "https://picearn-9xoo.vercel.app",
  };
}