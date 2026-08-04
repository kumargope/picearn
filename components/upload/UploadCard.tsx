"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { uploadImage } from "@/lib/upload";
import AdScreen from "@/components/ads/AdScreen";

export default function UploadCard() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [tags, setTags] = useState("");
const [category, setCategory] = useState("Other");

  const [showAd, setShowAd] = useState(false);
  const [rewardUnlocked, setRewardUnlocked] = useState(false);
  const [currentAd, setCurrentAd] = useState(1);
  const [adStep, setAdStep] = useState(1);
const [claiming, setClaiming] = useState(false);
const [rewardClaimed, setRewardClaimed] = useState(false);



  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      toast.success("Image Selected");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
     disabled: !!file,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
    },
    multiple: false,
  });

  async function handleUpload() {
    if (!file) {
      toast.error("Please Select Image");
      return;
    }

    try {
      setLoading(true);

      const result = await uploadImage(
  file,
  title,
  description,
  tags,
  category
);

      localStorage.setItem("lastImageId", result.id);

      setUploadedUrl(result.url);

      setShowAd(true);

      setFile(null);
      setTitle("");
setDescription("");
setTags("");
setCategory("Other");

      console.log(result);
    } catch (err: unknown) {
      console.error(err);

      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Upload Failed");
      }
    } finally {
      setLoading(false);
    }
  }

  async function claimReward() {
    try {

        if (claiming) return;

if (rewardClaimed) {
  toast.error("Reward already claimed");
  return;
}

setClaiming(true); 


      const imageId = localStorage.getItem("lastImageId");

      if (!imageId) {
        toast.error("Image not found");
        return;
      }

      const res = await fetch("/api/claim-reward", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Reward Failed");
        return;
      }

      toast.success("₹0.10 Added");

     localStorage.removeItem("lastImageId");

setRewardUnlocked(false);

setRewardClaimed(true);

setClaiming(false);

    }
    
  catch (err) {
  console.error(err);
  toast.error("Reward Failed");
} finally {
  setClaiming(false);
}
  }

  return (
    <>
    {showAd && (
  <AdScreen
    key={currentAd}
    adNumber={currentAd}
    onFinish={() => {
      if (currentAd === 1) {
        setCurrentAd(2);
      } else {
        setShowAd(false);
        setCurrentAd(1);
        setRewardUnlocked(true);
        toast.success("🎉 Reward Unlocked");
      }
    }}
  />
)}

      <section className="flex justify-center px-6 py-16">
        <div className="w-full max-w-3xl rounded-3xl border border-gray-700 bg-zinc-900 p-8 shadow-2xl">

          <h2 className="mb-2 text-center text-3xl font-bold">
            Upload Your Image
          </h2>

          <p className="mb-8 text-center text-gray-400">
            PNG, JPG, WEBP • Max Size 10 MB
          </p>

          <div
            {...getRootProps()}
             className={`rounded-2xl border-2 border-dashed p-14 text-center transition-all duration-300 ${
    file
      ? "border-green-600 bg-green-600/10 cursor-default"
      : isDragActive
      ? "border-blue-500 bg-blue-500/10 cursor-pointer"
      : "border-gray-600 hover:border-blue-500 hover:bg-zinc-800 cursor-pointer"
  }`}
>
            <input
  type="text"
  placeholder="Image Title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  className="mb-4 w-full rounded-xl bg-zinc-800 p-3 text-white outline-none"
/>

<textarea
  placeholder="Image Description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  className="mb-4 h-28 w-full rounded-xl bg-zinc-800 p-3 text-white outline-none"
/>

<input
  type="text"
  placeholder="Tags (Example: sunset,nature,wallpaper)"
  value={tags}
  onChange={(e) => setTags(e.target.value)}
  className="mb-4 w-full rounded-xl bg-zinc-800 p-3 text-white outline-none"
/>

<select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="mb-6 w-full rounded-xl bg-zinc-800 p-3 text-white outline-none"
>
  <option>Nature</option>
  <option>Animals</option>
  <option>Cars</option>
  <option>Technology</option>
  <option>AI</option>
  <option>Wallpaper</option>
  <option>Travel</option>
  <option>Food</option>
  <option>Fashion</option>
  <option>Sports</option>
  <option>Gaming</option>
  <option>Education</option>
  <option>Business</option>
  <option>Other</option>
</select>



            {!file && <input {...getInputProps()} />}

            <div className="text-6xl">📤</div>

            <h3 className="mt-5 text-2xl font-bold">
              {isDragActive
                ? "Drop Image Here"
                : "Drag & Drop Image Here"}
            </h3>

            <p className="mt-3 text-gray-400">
              {file ? file.name : "or Click to Select Image"}
            </p>
          </div>

        
      <button
  onClick={() => {
    window.open(
      "https://www.effectivecpmnetwork.com/xv7de41m?key=c32f73d8291cab2151dc0758cdeda2d7",
      "_blank"
    );

    handleUpload();
  }}
  disabled={loading}
  className="mt-8 w-full rounded-xl bg-blue-600 py-4 text-lg font-bold text-white transition hover:bg-blue-700 disabled:opacity-50"
>
            {loading ? "Uploading..." : "Upload Image"}
          </button>

          {uploadedUrl && (
            <div className="mt-6 rounded-xl border border-zinc-700 bg-zinc-800 p-4">
              <p className="mb-3 break-all text-sm text-gray-300">
                {uploadedUrl}
              </p>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(uploadedUrl);
                    toast.success("Link Copied");
                  }}
                  className="rounded-lg bg-blue-600 py-2 font-semibold"
                >
                  📋 Copy
                </button>

                <a
                  href={`https://wa.me/?text=${encodeURIComponent(uploadedUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-green-600 py-2 text-center font-semibold"
                >
                  WhatsApp
                </a>

                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(uploadedUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-blue-800 py-2 text-center font-semibold"
                >
                  Facebook
                </a>

                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(uploadedUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-sky-500 py-2 text-center font-semibold"
                >
                  X
                </a>

                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-pink-600 py-2 text-center font-semibold"
                >
                  Instagram
                </a>

                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(uploadedUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-cyan-600 py-2 text-center font-semibold"
                >
                  Telegram
                </a>

                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(uploadedUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-blue-700 py-2 text-center font-semibold"
                >
                  LinkedIn
                </a>

                <a
                  href={`https://www.reddit.com/submit?url=${encodeURIComponent(uploadedUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-orange-600 py-2 text-center font-semibold"
                >
                  Reddit
                </a>

              </div>
            </div>
          )}

    {rewardUnlocked && (
 <button
  onClick={() => {
    window.open(
      "https://www.effectivecpmnetwork.com/xv7de41m?key=c32f73d8291cab2151dc0758cdeda2d7",
      "_blank"
    );

    claimReward();
  }}
  disabled={claiming || rewardClaimed}
  className="mt-6 w-full rounded-xl bg-green-600 py-4 text-lg font-bold text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
>
    {claiming
      ? "Claiming..."
      : rewardClaimed
      ? "✅ Reward Claimed"
      : "🎁 Claim ₹0.10"}
  </button>
)}
        </div>
      </section>
    </>
  );
}