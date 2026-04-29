export const BUSINESS_TYPES = ["sole_trader", "llc", "corporation"] as const;

export type BusinessType = (typeof BUSINESS_TYPES)[number];

export type Merchant = {
  id: string;
  business_name: string;
  business_type: BusinessType;
  mcc_code: string;
  full_name: string;
  email: string;
  phone: string;
};

export type MerchantInput = Omit<Merchant, "id">;
