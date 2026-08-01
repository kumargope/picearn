"use client";

import toast from "react-hot-toast";

interface Props {
  slug: string;
}

export default function DownloadButton({ slug }: Props) {
  async function handleDownload() {
    try {
      console.log("Downloading slug:", slug);

      const res = await fetch(`/api/download/${slug}`, {
        method: "POST",
      });

      console.log("Status:", res.status);

      const data = await res.json();

      console.log("Response:", data);

      if (!res.ok) {
        toast.error(data.error || "Download Failed");
        return;
      }

      if (!data.image_url) {
        toast.error("Image URL missing");
        return;
      }

      window.open(data.image_url, "_blank");

      toast.success("Image Downloaded");
    } catch (err) {
      console.error(err);
      toast.error("Download Failed");
    }
  }

  return (
    <div className="mt-8 flex justify-center">
      <button
        onClick={handleDownload}
        className="rounded-xl bg-blue-600 px-8 py-4 text-lg font-bold text-white hover:bg-blue-700"
      >
        ⬇ Download Image
      </button>
    </div>
  );
}