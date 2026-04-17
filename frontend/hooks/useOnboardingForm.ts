import { useState } from "react";
import { isValidPhoneNumber } from "react-phone-number-input";

export function useOnboardingForm() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    business_name: "",
    business_type: "",
    mcc_code: "",
    full_name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState<any>({});

  const update = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));

    const field = Object.keys(data)[0];
    setErrors((prev: any) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const validateStep1 = () => {
    const newErrors: any = {};

    if (!formData.business_name)
      newErrors.business_name = "This Field is Required";
    if (!formData.business_type)
      newErrors.business_type = "This Field is Required";

    if (!formData.mcc_code) newErrors.mcc_code = "This Field is Required";
    else if (!/^\d{4}$/.test(formData.mcc_code))
      newErrors.mcc_code = "Must be 4 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: any = {};

    if (!formData.full_name) {
      newErrors.full_name = "This Field is Required";
    } else if (formData.full_name.trim().length < 3) {
      newErrors.full_name = "Must be at least 3 characters";
    }

    if (!formData.email) newErrors.email = "This Field is Required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Invalid email";

    if (!formData.phone || !isValidPhoneNumber(formData.phone))
      newErrors.phone = "Invalid phone";

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
