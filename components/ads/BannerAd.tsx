"use client";

interface BannerAdProps {
  position?: "top" | "middle" | "bottom";
}

export default function BannerAd({
  position = "middle",
}: BannerAdProps) {
  return (
    <div
      className={`
        w-full
        rounded-xl
        border
        border-zinc-700
        bg-zinc-900
        flex
        items-center
        justify-center
        text-white
        font-semibold
        shadow-lg
        ${
          position === "top"
            ? "h-24 my-6"
            : position === "middle"
            ? "h-32 my-8"
            : "h-24 my-6"
        }
      `}
    >
      <div className="text-center">
        <p className="text-xl">📢 Banner Advertisement</p>

        <p className="text-sm text-gray-400 mt-2">
          {position.toUpperCase()} AD SLOT
        </p>
      </div>
    </div>
  );
}