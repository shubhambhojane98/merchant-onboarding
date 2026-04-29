import { BusinessType } from "./merchant";

export type FormData = {
  business_name: string;
  business_type: BusinessType | "";
  mcc_code: string;
  full_name: string;
  email: string;
  phone: string;
};

export type FormErrors = Partial<Record<keyof FormData, string>>;
