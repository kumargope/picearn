"use client";

import { useEffect, useState } from "react";

interface AdGateProps {
  open: boolean;
  onComplete: () => void;
  onClose: () => void;
}

export default function AdGate({
  open,
  onComplete,
  onClose,
}: AdGateProps) {
  const [step, setStep] = useState(1);
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    if (!open) return;

    setStep(1);
    setSeconds(30);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    if (seconds <= 0) {
      if (step === 1) {
        setStep(2);
        setSeconds(30);
      } else {
        onComplete();
      }

      return;
    }

    const timer = setTimeout(() => {
      setSeconds((s) => s - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds, step, open, onComplete]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80">

      <div className="w-full max-w-2xl rounded-2xl bg-zinc-900 p-8">

        <h2 className="text-3xl font-bold text-center">
          Watch Ads
        </h2>

        <p className="mt-3 text-center text-gray-400">
          Complete both ads to continue.
        </p>

        <div className="mt-8 rounded-xl bg-zinc-800 p-6">

          <div className="mb-4 flex items-center justify-between">

            <span className="text-lg font-semibold">
              Ad {step} / 2
            </span>

            <span className="rounded bg-green-600 px-3 py-1 text-sm font-bold">
              {seconds}s
            </span>

          </div>

          <div className="flex h-72 items-center justify-center rounded-xl border-2 border-dashed border-zinc-600">

            <div className="text-center">

              <p className="text-xl font-bold">
                Advertisement Placeholder
              </p>

              <p className="mt-2 text-gray-400">
                Google Adsterra / Monetag / AdSense
              </p>

            </div>

          </div>

        </div>

        <div className="mt-8 h-3 overflow-hidden rounded-full bg-zinc-700">

          <div
            className="h-full bg-green-500 transition-all duration-1000"
            style={{
              width: `${((30 - seconds) / 30) * 100}%`,
            }}
          />

        </div>

        <div className="mt-6 text-center text-lg font-bold">

          {step === 1
            ? "Watching First Ad..."
            : "Watching Second Ad..."}

        </div>

        <button
          disabled
          className="mt-8 w-full cursor-not-allowed rounded-xl bg-zinc-700 py-4 font-bold text-gray-300"
        >
          Please Wait...
        </button>

      </div>

    </div>
  );
}