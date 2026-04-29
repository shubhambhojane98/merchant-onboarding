import { useState } from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import type { FormData, FormErrors } from "@/types/onboarding";

export function useOnboardingForm() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    business_name: "",
    business_type: "",
    mcc_code: "",
    full_name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));

    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[key];
      return newErrors;
    });
  };

  const validateStep1 = () => {
    const newErrors: FormErrors = {};

    if (!formData.business_name.trim()) {
      newErrors.business_name = "This field is required";
    } else if (formData.business_name.trim().length < 2) {
      newErrors.business_name = "Must be at least 2 characters";
    }

    if (!formData.business_type) {
      newErrors.business_type = "This field is required";
    }

    if (!formData.mcc_code) {
      newErrors.mcc_code = "This field is required";
    } else if (!/^\d{4}$/.test(formData.mcc_code)) {
      newErrors.mcc_code = "Must be 4 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: FormErrors = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = "This field is required";
    } else if (formData.full_name.trim().length < 2) {
      newErrors.full_name = "Must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "This field is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }

    if (!formData.phone || !isValidPhoneNumber(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => {
    if (step === 0 && !validateStep1()) return;
    if (step === 1 && !validateStep2()) return;
    setStep((s) => s + 1);
  };

  const back = () => setStep((s) => s - 1);

  return {
    step,
    setStep,
    next,
    back,
    formData,
    update,
    errors,
    setErrors,
    loading,
    setLoading,
  };
}
