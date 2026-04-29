"use client";

import { useEffect, useState } from "react";
import { getMerchants } from "@/lib/api";
import type { Merchant } from "@/types/merchant";
import Link from "next/link";
import MerchantList from "@/components/merchants/MerchantList";
import { toast } from "sonner";

export default function MerchantsPage() {
  const [data, setData] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMerchants = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getMerchants();
      setData(res);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to load merchants";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMerchants();
  }, []);

  const isEmpty = !loading && !error && data.length === 0;
  const isSuccess = !loading && !error && data.length > 0;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Merchants</h1>

          <Link
            href="/"
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            ← Back to Home
          </Link>
        </div>

        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-4 bg-white rounded-xl shadow animate-pulse"
              >
                <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="text-center bg-white p-10 rounded-xl shadow">
            <p className="text-red-500 mb-4">{error}</p>

            <button
              onClick={fetchMerchants}
              disabled={loading}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
            >
              🔄 Retry
            </button>
          </div>
        )}

        {isEmpty && (
          <div className="text-center bg-white p-10 rounded-xl shadow">
            <p className="text-gray-500 mb-4">No merchants found.</p>

            <Link
              href="/onboarding"
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              ➕ Add Merchant
            </Link>
          </div>
        )}

        {isSuccess && <MerchantList data={data} />}
      </div>
    </div>
  );
}
