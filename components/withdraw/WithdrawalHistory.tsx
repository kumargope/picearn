"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface WithdrawHistory {
  id: string;
  amount: number;
  upi_id: string;
  status: string;
  created_at: string;
}

export default function WithdrawalHistory() {
  const { user } = useAuth();

  const [history, setHistory] = useState<WithdrawHistory[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadHistory() {
    if (!user) return;

    setLoading(true);

    try {
      const res = await fetch(
        `/api/withdraw-history?userId=${user.id}`
      );

      const data = await res.json();

      if (!data.success) {
        toast.error(data.error);
        return;
      }

      setHistory(data.requests ?? []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load withdrawal history");
    }

    setLoading(false);
  }

  useEffect(() => {
    loadHistory();
  }, [user]);

  return (
    <div className="rounded-2xl bg-zinc-900 p-8">

      <h2 className="mb-6 text-3xl font-bold">
        💸 Withdrawal History
      </h2>

      {loading && (
        <p className="text-zinc-400">
          Loading...
        </p>
      )}

      {!loading && history.length === 0 && (
        <p className="text-zinc-400">
          No Withdrawal Requests Yet
        </p>
      )}

      <div className="space-y-4">

        {history.map((item) => (

          <div
            key={item.id}
            className="rounded-xl border border-zinc-700 p-5"
          >

            <div className="flex items-center justify-between">

              <div>

                <h3 className="text-xl font-bold">
                  ₹{item.amount}
                </h3>

                <p className="mt-1 text-zinc-400">
                  {item.upi_id}
                </p>

                <p className="mt-2 text-sm text-zinc-500">
                  {new Date(item.created_at).toLocaleString()}
                </p>

              </div>

              <div>

                {item.status === "Pending" && (
                  <span className="rounded bg-yellow-600 px-4 py-2">
                    🟡 Pending
                  </span>
                )}

                {item.status === "Paid" && (
                  <span className="rounded bg-green-600 px-4 py-2">
                    🟢 Paid
                  </span>
                )}

                {item.status === "Rejected" && (
                  <span className="rounded bg-red-600 px-4 py-2">
                    🔴 Rejected
                  </span>
                )}

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}