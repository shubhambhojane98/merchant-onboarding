import type { Merchant } from "@/types/merchant";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

const handleResponse = async (res: Response) => {
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    let message = "Something went wrong";

    if (Array.isArray(data?.detail)) {
      message = data.detail.map((err: any) => err.msg).join(", ");
    } else if (typeof data?.detail === "string") {
      message = data.detail;
    }
    message = message.replace(/^Value error,\s*/i, "");
    throw new Error(message);
  }

  return data;
};

export const createMerchant = async (data: Omit<Merchant, "id">) => {
  const res = await fetch(`${BASE_URL}/merchants`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleResponse(res);
};

export const getMerchants = async (): Promise<Merchant[]> => {
  const res = await fetch(`${BASE_URL}/merchants`);
  return handleResponse(res);
};
