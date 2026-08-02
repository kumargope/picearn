"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    atOptions: {
      key: string;
      format: string;
      height: number;
      width: number;
      params: Record<string, unknown>;
    };
  }
}

interface Props {
  onFinish: () => void;
  adNumber: number;
}

export default function AdScreen({
  onFinish,
  adNumber,
}: Props) {
  const [timeLeft, setTimeLeft] = useState(30);

  //-------------------------------------
  // Load Banner
  //-------------------------------------

  useEffect(() => {
    const banner = document.getElementById("reward-banner");

    if (!banner) return;

    banner.innerHTML = "";

    const isMobile = window.innerWidth < 768;

    window.atOptions = {
      key: isMobile
        ? "a0b8016b968a15870aa78e3d8087434d"
        : "99c774cecd33feb36722f3ed5689eefe",
      format: "iframe",
      height: isMobile ? 50 : 90,
      width: isMobile ? 320 : 728,
      params: {},
    };

    const script = document.createElement("script");

    script.src = isMobile
      ? "https://www.highperformanceformat.com/a0b8016b968a15870aa78e3d8087434d/invoke.js"
      : "https://www.highperformanceformat.com/99c774cecd33feb36722f3ed5689eefe/invoke.js";

    script.async = true;

    banner.appendChild(script);
  }, [adNumber]);

  //-------------------------------------
  // Social Bar
  //-------------------------------------

  useEffect(() => {
    const oldScript = document.getElementById("social-bar-script");

    if (oldScript) {
      oldScript.remove();
    }

    const script = document.createElement("script");

    script.id = "social-bar-script";

    script.src =
      "https://pl30643106.effectivecpmnetwork.com/b0/f5/52/b0f552f55eda60afe4bf1319bf7859e5.js";

    script.async = true;

    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, [adNumber]);

  //-------------------------------------
  // Reset Timer
  //-------------------------------------

  useEffect(() => {
    setTimeLeft(30);
  }, [adNumber]);

  //-------------------------------------
  // Countdown
  //-------------------------------------

  useEffect(() => {
    if (timeLeft <= 0) {
      onFinish();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, onFinish]);

  //-------------------------------------

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">

      <div className="w-full max-w-3xl rounded-2xl bg-zinc-900 p-8 text-center">

        <h2 className="text-3xl font-bold text-white">
          Sponsored Ad {adNumber}/2
        </h2>

        <p className="mt-3 text-gray-400">
          Please watch this advertisement to unlock your reward.
        </p>

        <div className="mt-8 flex justify-center">

          <div
            id="reward-banner"
            className="flex justify-center overflow-hidden"
          />

        </div>

        <div className="mt-10 text-6xl font-bold text-blue-500">
          {timeLeft}s
        </div>

        <p className="mt-3 text-gray-400">
          Please wait...
        </p>

      </div>

    </div>
  );
}