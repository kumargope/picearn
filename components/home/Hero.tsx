"use client";

export default function Hero() {
  const openSmartLink = () => {
    window.open(
      "https://www.effectivecpmnetwork.com/xv7de41m?key=c32f73d8291cab2151dc0758cdeda2d7",
      "_blank"
    );
  };

  return (
    <section className="mx-auto flex min-h-[80vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-6 text-5xl font-extrabold leading-tight md:text-7xl">
        Upload Images
        <br />
        <span className="text-blue-600">Earn Rewards</span>
      </h1>

      <p className="mb-10 max-w-2xl text-lg text-gray-600">
        Upload your images, share your unique link, earn reward points from
        genuine views, and download securely.
      </p>

      <div className="flex gap-4">
        <button
          onClick={openSmartLink}
          className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
        >
          Upload Image
        </button>

        <button
          className="rounded-xl border px-8 py-4 font-semibold transition hover:bg-gray-100"
        >
          Learn More
        </button>
      </div>
    </section>
  );
}