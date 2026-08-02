import GoogleAnalytics from "@/components/GoogleAnalytics";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "PicEarn - Upload Images & Earn Money",
    template: "%s | PicEarn",
  },

  description:
    "PicEarn is a free image hosting platform where creators can upload images, share links, earn rewards, and download high-quality images.",

  keywords: [
    "PicEarn",
    "Image Hosting",
    "Upload Images",
    "Earn Money",
    "Photo Sharing",
    "Image Downloader",
    "Image Viewer",
    "Free Image Hosting",
    "Rewards",
    "Online Earnings",
  ],

  authors: [
    {
      name: "Mukesh Kumar",
    },
  ],

  creator: "Mukesh Kumar",

  publisher: "PicEarn",

  applicationName: "PicEarn",

  category: "Technology",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "PicEarn - Upload Images & Earn Money",
    description:
      "Upload images, share links and earn rewards with PicEarn.",
    siteName: "PicEarn",

    images: [
      {
        url: "/favicon.ico",
        width: 512,
        height: 512,
        alt: "PicEarn",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "PicEarn - Upload Images & Earn Money",
    description:
      "Upload images, share links and earn rewards.",
    images: ["/favicon.ico"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // ✅ Monetag Verification
  other: {
    monetag: "1386d3fe6e17abbf91b3984e7b808cb0",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-black text-white">
        <AuthProvider>

          <GoogleAnalytics />

          {children}

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#18181b",
                color: "#ffffff",
                border: "1px solid #3f3f46",
              },
            }}
          />

        </AuthProvider>
      </body>
    </html>
  );
}