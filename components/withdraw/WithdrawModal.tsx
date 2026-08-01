"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function WithdrawModal({
  open,
  onClose,
}: Props) {
  const { user, profile, refreshProfile } = useAuth();

  const [amount, setAmount] = useState("");
  const [upiId, setUpiId] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function submitRequest() {
    if (!user) {
      toast.error("Login Required");
      return;
    }

    const value = Number(amount);

    if (value <= 0) {
      toast.error("Enter valid amount");
      return;
    }

    if (value > (profile?.wallet ?? 0)) {
      toast.error("Insufficient Balance");
      return;
    }

    if (!upiId.trim()) {
      toast.error("Enter UPI ID");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          amount: value,
          upi_id: upiId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error);
        return;
      }

      toast.success("Withdrawal Request Submitted");

      setAmount("");
      setUpiId("");

      await refreshProfile();

      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-md rounded-2xl bg-zinc-900 p-6">

        <h2 className="text-2xl font-bold">
          Withdraw Balance
        </h2>

        <p className="mt-3 text-zinc-400">
          Available Balance
        </p>

        <h3 className="mb-6 text-3xl font-bold">
          ₹{profile?.wallet ?? 0}
        </h3>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mb-4 w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
        />

        <input
          type="text"
          placeholder="UPI ID"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          className="mb-6 w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
        />

        <div className="flex gap-3">

          <button
            onClick={onClose}
            className="flex-1 rounded-lg bg-zinc-700 py-3 font-bold"
          >
            Cancel
          </button>

          <button
            onClick={submitRequest}
            disabled={loading}
            className="flex-1 rounded-lg bg-green-600 py-3 font-bold"
          >
            {loading ? "Submitting..." : "Withdraw"}
          </button>

        </div>

      </div>
    </div>
  );
}