import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md text-center space-y-6">
        <h1 className="text-2xl font-bold">Merchant Onboarding App</h1>

        <p className="text-gray-600">
          Register new merchants and manage them easily.
        </p>

        <div className="flex flex-col gap-4">
          <Link
            href="/onboarding"
            className="px-4 py-2 bg-black text-white rounded"
          >
            ➕ Add Merchant
          </Link>

          <Link href="/merchants" className="px-4 py-2 border rounded">
            📋 View Merchants
          </Link>
        </div>
      </div>
    </main>
  );
}
