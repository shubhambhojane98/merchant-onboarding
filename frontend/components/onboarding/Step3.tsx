import type { FormData } from "@/types/onboarding";

type Props = {
  formData: FormData;
  back: () => void;
  submit: () => void;
  loading: boolean;
};

export default function Step3({ formData, back, submit, loading }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Review Details</h2>

      <div className="bg-gray-50 p-5 rounded-lg text-sm space-y-3">
        <p>
          <strong>Business:</strong> {formData.business_name}
        </p>
        <p>
          <strong>Type:</strong> {formData.business_type}
        </p>
        <p>
          <strong>MCC:</strong> {formData.mcc_code}
        </p>
        <p>
          <strong>Name:</strong> {formData.full_name}
        </p>
        <p>
          <strong>Email:</strong> {formData.email}
        </p>
        <p>
          <strong>Phone:</strong> {formData.phone}
        </p>
      </div>

      <div className="flex justify-between">
        <button onClick={back} className="btn-secondary">
          Back
        </button>
        <button onClick={submit} disabled={loading} className="btn-success">
          {loading ? "Submitting..." : "Confirm & Submit"}
        </button>
      </div>
    </div>
  );
}
