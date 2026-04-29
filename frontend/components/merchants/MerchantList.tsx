import type { Merchant } from "@/types/merchant";

export default function MerchantList({ data }: { data: Merchant[] }) {
  return (
    <div className="grid gap-4">
      {data.map((m) => (
        <div
          key={m.id}
          className="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-lg">{m.business_name}</h2>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              {m.business_type}
            </span>
          </div>

          <p className="text-sm text-gray-700">👤 {m.full_name}</p>
          <p className="text-sm text-gray-600">📧 {m.email}</p>
          <p className="text-sm text-gray-600">📞 {m.phone}</p>
        </div>
      ))}
    </div>
  );
}
