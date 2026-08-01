import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import UploadCard from "@/components/upload/UploadCard";
import BannerAd from "@/components/ads/BannerAd";

export default function Home() {
  return (
  <>
    <Navbar />

    {/* Top Banner */}
    <BannerAd position="top" />

    <Hero />

    {/* Middle Banner */}
    <BannerAd position="middle" />

    <UploadCard />

    {/* Bottom Banner */}
    <BannerAd position="bottom" />
  </>
);
}