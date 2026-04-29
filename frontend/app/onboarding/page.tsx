"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import Step1 from "@/components/onboarding/Step1";
import Step2 from "@/components/onboarding/Step2";
import Step3 from "@/components/onboarding/Step3";
import { useOnboardingForm } from "@/hooks/useOnboardingForm";
import { createMerchant } from "@/lib/api";
import type { MerchantInput } from "@/types/merchant";

export default function OnboardingPage() {
  const router = useRouter();

  const {
    step,
    next,
    back,
    formData,
    update,
    errors,
    setErrors,
    loading,
    setLoading,
  } = useOnboardingForm();

  const submit = async () => {
    try {
      setLoading(true);
      setErrors({});
      console.log("B", formData.business_type);

      // ✅ runtime validation (important)
      if (!formData.business_type) {
        toast.error("Business type is required");
        return;
      }

      // ✅ type-safe payload
      const payload: MerchantInput = {
        ...formData,
        business_type: formData.business_type,
      };

      await createMerchant(payload);

      toast.success("Merchant Created 🎉");
      router.push("/merchants");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to create merchant";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow">
        <h1 className="text-2xl font-bold text-center mb-6">
          Merchant Onboarding
        </h1>

        {step === 0 && <Step1 {...{ formData, update, errors, next }} />}
        {step === 1 && <Step2 {...{ formData, update, errors, next, back }} />}
        {step === 2 && <Step3 {...{ formData, back, submit, loading }} />}
      </div>
    </div>
  );
}
