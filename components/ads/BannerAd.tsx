"use client";

import Script from "next/script";

interface BannerAdProps {
  position?: "top" | "middle" | "bottom";
}

export default function BannerAd({
  position = "middle",
}: BannerAdProps) {
  return (
    <div className="flex justify-center my-6">

      {/* Desktop */}
      <div className="hidden md:block">

        <Script id={`banner728-${position}`} strategy="afterInteractive">
          {`
            atOptions = {
              'key' : '99c774cecd33feb36722f3ed5689eefe',
              'format' : 'iframe',
              'height' : 90,
              'width' : 728,
              'params' : {}
            };
          `}
        </Script>

        <Script
          src="https://www.highperformanceformat.com/99c774cecd33feb36722f3ed5689eefe/invoke.js"
          strategy="afterInteractive"
        />

      </div>

      {/* Mobile */}

      <div className="block md:hidden">

        <Script id={`banner320-${position}`} strategy="afterInteractive">
          {`
            atOptions = {
              'key' : 'a0b8016b968a15870aa78e3d8087434d',
              'format' : 'iframe',
              'height' : 50,
              'width' : 320,
              'params' : {}
            };
          `}
        </Script>

        <Script
          src="https://www.highperformanceformat.com/a0b8016b968a15870aa78e3d8087434d/invoke.js"
          strategy="afterInteractive"
        />

      </div>

    </div>
  );
}