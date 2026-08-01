"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface WithdrawRequest {
  id: string;
  user_id: string;
  amount: number;
  upi_id: string;
  status: string;
  created_at: string;
}

export default function WithdrawsPage() {
  const [requests, setRequests] = useState<WithdrawRequest[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadRequests() {
    setLoading(true);

    try {
      const res = await fetch("/api/admin/withdraw/list");

      const json = await res.json();

      if (!json.success) {
        toast.error(json.error);
      } else {
        setRequests(json.requests ?? []);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load requests");
    }

    setLoading(false);
  }

  useEffect(() => {
    loadRequests();
  }, []);

  async function approve(id: string) {
    try {
      const res = await fetch("/api/admin/withdraw/approve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          withdrawId: id,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.error);
        return;
      }

      toast.success("Withdrawal Approved");

      loadRequests();
    } catch (err) {
      console.error(err);
      toast.error("Server Error");
    }
  }

  async function reject(id: string) {
    try {
      const res = await fetch("/api/admin/withdraw/reject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          withdrawId: id,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.error);
        return;
      }

      toast.success("Withdrawal Rejected");

      loadRequests();
    } catch (err) {
      console.error(err);
      toast.error("Server Error");
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="mb-8 text-4xl font-bold">
        💸 Withdraw Requests
      </h1>

      <div className="overflow-x-auto rounded-xl border border-zinc-800">
        <table className="w-full">
          <thead className="bg-zinc-900">
            <tr>
              <th className="p-4 text-left">User ID</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">UPI</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="p-8 text-center text-zinc-400"
                >
                  No withdrawal requests found.
                </td>
              </tr>
            ) : (
              requests.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-zinc-800"
                >
                  <td className="p-4">{item.user_id}</td>

                  <td className="p-4 font-bold text-green-400">
                    ₹{item.amount}
                  </td>

                  <td className="p-4">{item.upi_id}</td>

                  <td className="p-4">
                    <span
                      className={`rounded px-3 py-1 ${
                        item.status === "Pending"
                          ? "bg-yellow-600"
                          : item.status === "Paid"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="p-4">
                    {new Date(item.created_at).toLocaleString()}
                  </td>

                  <td className="p-4">
                    {item.status === "Pending" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => approve(item.id)}
                          className="rounded bg-green-600 px-3 py-2 hover:bg-green-700"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => reject(item.id)}
                          className="rounded bg-red-600 px-3 py-2 hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-zinc-400">
                        Completed
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}