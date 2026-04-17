"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import Step1 from "@/components/onboarding/Step1";
import Step2 from "@/components/onboarding/Step2";
import Step3 from "@/components/onboarding/Step3";
import { useOnboardingForm } from "@/hooks/useOnboardingForm";

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
    setLoading(true);
    setErrors({});

    try {
      const res = await fetch("http://localhost:8000/merchants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.detail);

      toast.success("Merchant Created 🎉");
      router.push("/merchants");
    } catch (err: any) {
      toast.error(err.message);
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
