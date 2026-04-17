const NEXT_PUBLIC_API_URL = "http://localhost:8000";

export const createMerchant = async (data: any) => {
  const res = await fetch(`${NEXT_PUBLIC_API_URL}/merchants`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create merchant");

  return res.json();
};

export const getMerchants = async () => {
  const res = await fetch(`${NEXT_PUBLIC_API_URL}/merchants`);

  if (!res.ok) throw new Error("Failed to fetch merchants");

  return res.json();
};
