"use client";

import { useEffect, useRef } from "react";

interface Props {
  slug: string;
}

export default function ViewTracker({ slug }: Props) {
  const counted = useRef(false);

  useEffect(() => {
    if (counted.current) return;

    counted.current = true;

    async function addView() {
      try {
        await fetch(`/api/views/${slug}`, {
          method: "POST",
        });
      } catch (err) {
        console.error("View Count Error:", err);
      }
    }

    void addView();
  }, [slug]);

  return null;
}