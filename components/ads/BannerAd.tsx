"use client";

import { useEffect } from "react";
import Script from "next/script";

interface BannerAdProps {
  position?: "top" | "middle" | "bottom";
}

export default function BannerAd({
  position = "middle",
}: BannerAdProps) {
  useEffect(() => {
    const id = "container-964020e3e53f4a149e6ddb965f13fa19";

    const old = document.getElementById(id);
    if (old) {
      old.innerHTML = "";
    }
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 my-6">
      {/* ========================= */}
      {/* Existing Monetag Banner */}
      {/* ========================= */}

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

      {/* ========================= */}
      {/* Adsterra Native Banner */}
      {/* ========================= */}

      <div className="w-full flex justify-center">
        <div id="container-964020e3e53f4a149e6ddb965f13fa19"></div>

        <Script
          src="https://pl30679284.effectivecpmnetwork.com/964020e3e53f4a149e6ddb965f13fa19/invoke.js"
          strategy="afterInteractive"
          async
          data-cfasync="false"
        />
      </div>
    </div>
  );
}