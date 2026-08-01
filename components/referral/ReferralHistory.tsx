"use client";

import { useEffect, useState } from "react";

interface Props {
  userId: string;
}

interface HistoryItem {
  id: string;
  referral_code: string;
  amount: number;
  status: string;
  created_at: string;
  claimed_at: string | null;
}

export default function ReferralHistory({
  userId,
}: Props) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  //-----------------------------------------

  async function loadHistory() {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/referral/history?userId=${userId}`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error(`API Error ${res.status}`);
      }

      const text = await res.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        console.error("History API Response:", text);
        throw new Error("API returned HTML instead of JSON");
      }

      if (data.success) {
        setHistory(data.history ?? []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  //-----------------------------------------

  useEffect(() => {
    loadHistory();
  }, [userId]);

  //-----------------------------------------

  return (
    <div className="mt-10 rounded-2xl bg-zinc-900 p-8">
      <h2 className="mb-8 text-3xl font-bold">
        📜 Referral History
      </h2>

      {loading ? (
        <p className="text-zinc-400">
          Loading...
        </p>
      ) : history.length === 0 ? (
        <p className="text-zinc-500">
          No Referral History
        </p>
      ) : (
        <div className="space-y-5">
          {history.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-zinc-700 bg-zinc-800 p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">
                    {item.referral_code}
                  </h3>

                  <p className="mt-1 text-sm text-zinc-400">
                    Joined{" "}
                    {new Date(
                      item.created_at
                    ).toLocaleString()}
                  </p>

                  {item.claimed_at && (
                    <p className="text-sm text-zinc-400">
                      Claimed{" "}
                      {new Date(
                        item.claimed_at
                      ).toLocaleString()}
                    </p>
                  )}
                </div>

                <div className="text-right">
                  <h3 className="text-2xl font-bold text-green-400">
                    ₹{Number(item.amount).toFixed(2)}
                  </h3>

                  <span
                    className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-bold ${
                      item.status === "claimed"
                        ? "bg-green-600"
                        : "bg-yellow-600"
                    }`}
                  >
                    {item.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}