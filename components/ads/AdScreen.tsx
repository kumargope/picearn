"use client";

import { useEffect, useState } from "react";

interface Props {
  onFinish: () => void;
  adNumber: number;
}

export default function AdScreen({
  onFinish,
  adNumber,
}: Props) {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    setTimeLeft(30);
  }, [adNumber]);

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <div className="w-full max-w-xl rounded-2xl bg-zinc-900 p-8 text-center">

        <h2 className="text-3xl font-bold text-white">
          Sponsored Ad {adNumber}/2
        </h2>

        <p className="mt-3 text-gray-400">
          Please watch this advertisement to unlock your reward.
        </p>

        <div className="mt-8 flex h-64 items-center justify-center rounded-xl bg-zinc-800 text-3xl font-bold text-white">
          Advertisement #{adNumber}
        </div>

        <div className="mt-8 text-5xl font-bold text-blue-500">
          {timeLeft}s
        </div>

        <p className="mt-3 text-gray-400">
          Please wait...
        </p>

      </div>
    </div>
  );
}