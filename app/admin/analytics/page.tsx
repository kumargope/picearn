"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

interface Analytics {
  totalUsers: number;
  totalImages: number;
  totalViews: number;
  totalDownloads: number;
  totalEarnings: number;
  totalWallet: number;

  pendingCount: number;
  paidCount: number;
  rejectedCount: number;

  pendingAmount: number;
  paidAmount: number;
  rejectedAmount: number;
}
interface ChartData {
  date: string;
  downloads: number;
  earnings: number;
}

interface TopImage {
  title: string;
  downloads: number;
}

interface TopEarner {
  name: string;
  wallet: number;
}

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState<Analytics>({
    totalUsers: 0,
    totalImages: 0,
    totalViews: 0,
    totalDownloads: 0,
    totalEarnings: 0,
    totalWallet: 0,

    pendingCount: 0,
    paidCount: 0,
    rejectedCount: 0,

    pendingAmount: 0,
    paidAmount: 0,
    rejectedAmount: 0,
  });

  const [chartData, setChartData] = useState<ChartData[]>([]);

const [topImages, setTopImages] = useState<TopImage[]>([]);

const [topEarners, setTopEarners] = useState<TopEarner[]>([]);

  async function loadAnalytics() {
    setLoading(true);

    try {
      const res = await fetch("/api/admin/analytics");

      const data = await res.json();

      if (!data.success) {
        toast.error(data.error);
        return;
      }

      setStats(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to Load Analytics");
    }

    setLoading(false);
  }

  async function loadCharts() {
  try {
    const res = await fetch("/api/admin/charts");

    const json = await res.json();

    if (!json.success) {
      toast.error(json.error);
      return;
    }

    setChartData(json.chartData ?? []);

    setTopImages(json.topImages ?? []);

    setTopEarners(json.topEarners ?? []);
  } catch (err) {
    console.error(err);

    toast.error("Failed to Load Charts");
  }
}

 useEffect(() => {
  loadAnalytics();

  loadCharts();
}, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center text-2xl">
        Loading Analytics...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="mb-10 text-5xl font-bold">
        📊 Admin Analytics
      </h1>

      {/* TOP CARDS */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <Card
          title="👥 Total Users"
          value={stats.totalUsers}
        />

        <Card
          title="🖼 Total Images"
          value={stats.totalImages}
        />

        <Card
          title="👀 Total Views"
          value={stats.totalViews}
        />

        <Card
          title="⬇ Total Downloads"
          value={stats.totalDownloads}
        />

        <Card
          title="💰 Total Earnings"
          value={`₹${stats.totalEarnings}`}
        />

        <Card
          title="💳 Wallet Balance"
          value={`₹${stats.totalWallet}`}
        />

        <Card
          title="🟡 Pending Withdraw"
          value={stats.pendingCount}
        />

        <Card
          title="🟢 Paid Withdraw"
          value={stats.paidCount}
        />

      </div>

      {/* Withdraw Summary */}

      <div className="mt-12 rounded-2xl bg-zinc-900 p-8">

        <h2 className="mb-6 text-3xl font-bold">
          💸 Withdrawal Summary
        </h2>

        <div className="grid gap-6 md:grid-cols-3">

          <div className="rounded-xl bg-yellow-600 p-6">

            <h3 className="text-xl font-bold">
              Pending
            </h3>

            <p className="mt-3 text-4xl font-bold">
              ₹{stats.pendingAmount}
            </p>

            <p className="mt-2">
              {stats.pendingCount} Requests
            </p>

          </div>

          <div className="rounded-xl bg-green-700 p-6">

            <h3 className="text-xl font-bold">
              Paid
            </h3>

            <p className="mt-3 text-4xl font-bold">
              ₹{stats.paidAmount}
            </p>

            <p className="mt-2">
              {stats.paidCount} Requests
            </p>

          </div>

          <div className="rounded-xl bg-red-700 p-6">

            <h3 className="text-xl font-bold">
              Rejected
            </h3>

            <p className="mt-3 text-4xl font-bold">
              ₹{stats.rejectedAmount}
            </p>

            <p className="mt-2">
              {stats.rejectedCount} Requests
            </p>

          </div>

        </div>

      </div>
      <div className="mt-12 grid gap-8 lg:grid-cols-2">

  <div className="rounded-2xl bg-zinc-900 p-6">

    <h2 className="mb-6 text-2xl font-bold">
      📈 Downloads Chart
    </h2>

    <ResponsiveContainer
      width="100%"
      height={320}
    >
      <LineChart data={chartData}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="date" />

        <YAxis />

        <Tooltip />

        <Legend />

        <Line
          type="monotone"
          dataKey="downloads"
          stroke="#22c55e"
          strokeWidth={3}
        />

      </LineChart>
    </ResponsiveContainer>

  </div>

  <div className="rounded-2xl bg-zinc-900 p-6">

    <h2 className="mb-6 text-2xl font-bold">
      💰 Earnings Chart
    </h2>

    <ResponsiveContainer
      width="100%"
      height={320}
    >
      <BarChart data={chartData}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="date" />

        <YAxis />

        <Tooltip />

        <Legend />

        <Bar
          dataKey="earnings"
          fill="#3b82f6"
        />

      </BarChart>
    </ResponsiveContainer>

  </div>

</div>
 
 <div className="mt-12 grid gap-8 lg:grid-cols-2">

  {/* Top Images */}

  <div className="rounded-2xl bg-zinc-900 p-6">

    <h2 className="mb-6 text-2xl font-bold">
      🏆 Top Downloaded Images
    </h2>

    <table className="w-full">

      <thead>

        <tr className="border-b border-zinc-700">

          <th className="p-3 text-left">
            Image
          </th>

          <th className="p-3 text-right">
            Downloads
          </th>

        </tr>

      </thead>

      <tbody>

        {topImages.map((img, index) => (

          <tr
            key={index}
            className="border-b border-zinc-800"
          >

            <td className="p-3">

              {img.title || "Untitled"}

            </td>

            <td className="p-3 text-right font-bold text-green-400">

              {img.downloads}

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

  {/* Top Earners */}

  <div className="rounded-2xl bg-zinc-900 p-6">

    <h2 className="mb-6 text-2xl font-bold">
      👑 Top Earners
    </h2>

    <table className="w-full">

      <thead>

        <tr className="border-b border-zinc-700">

          <th className="p-3 text-left">

            User

          </th>

          <th className="p-3 text-right">

            Wallet

          </th>

        </tr>

      </thead>

      <tbody>

        {topEarners.map((user, index) => (

          <tr
            key={index}
            className="border-b border-zinc-800"
          >

            <td className="p-3">

              {user.name}

            </td>

            <td className="p-3 text-right font-bold text-blue-400">

              ₹{user.wallet}

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</div>

    </main>
  );
}

function Card({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl bg-zinc-900 p-6">

      <p className="text-zinc-400">
        {title}
      </p>

      <h2 className="mt-4 text-4xl font-bold">
        {value}
      </h2>

    </div>
  );
}