"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface Transaction {
  id: string;
  type: string;
  amount: number;
  description: string;
  created_at: string;
}

export default function TransactionHistory() {
  const { user } = useAuth();

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    loadTransactions();
  }, [user]);

  async function loadTransactions() {
    try {
      const res = await fetch(
        `/api/transactions?userId=${user?.id}`
      );

      const data = await res.json();

      if (data.success) {
        setTransactions(data.transactions);
      }

      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl bg-zinc-900 p-8">
        Loading Transactions...
      </div>
    );
  }

  return (
    <div className="mt-10 rounded-2xl bg-zinc-900 p-8">

      <h2 className="mb-6 text-2xl font-bold">
        💳 Wallet Passbook
      </h2>

      {transactions.length === 0 && (
        <div className="text-zinc-400">
          No Transactions Yet
        </div>
      )}

      <div className="space-y-4">

        {transactions.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-xl border border-zinc-700 p-5"
          >
            <div>

              <h3 className="text-lg font-bold">
                {item.type}
              </h3>

              <p className="text-zinc-400">
                {item.description}
              </p>

              <p className="mt-1 text-sm text-zinc-500">
                {new Date(
                  item.created_at
                ).toLocaleString()}
              </p>

            </div>

            <div
              className={`text-2xl font-bold ${
                item.amount >= 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              ₹{item.amount}
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}