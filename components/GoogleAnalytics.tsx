"use client";

import Script from "next/script";

export default function GoogleAnalytics() {
  const GA_ID = "G-XXXXXXXXXX"; // बाद में अपना GA4 ID डालना

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];

          function gtag(){
            dataLayer.push(arguments);
          }

          gtag('js', new Date());

          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}