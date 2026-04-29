import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import type { FormData } from "@/types/onboarding";

type Props = {
  formData: FormData;
  update: (key: keyof FormData, value: string) => void;
  errors: Partial<Record<keyof FormData, string>>;
  next: () => void;
  back: () => void;
};

export default function Step2({ formData, update, errors, next, back }: Props) {
  return (
    <div className="space-y-4">
      <input
        className="input"
        placeholder="Full Name"
        value={formData.full_name}
        onChange={(e) => update("full_name", e.target.value)}
      />
      {errors.full_name && <p className="error">{errors.full_name}</p>}

      <input
        className="input"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => update("email", e.target.value)}
      />
      {errors.email && <p className="error">{errors.email}</p>}

      <PhoneInput
        international
        defaultCountry="IN"
        value={formData.phone}
        onChange={(value) => update("phone", value || "")}
        className="input flex items-center gap-2"
      />
      {errors.phone && <p className="error">{errors.phone}</p>}

      <div className="flex justify-between">
        <button onClick={back} className="btn-secondary">
          Back
        </button>
        <button onClick={next} className="btn-primary">
          Continue
        </button>
      </div>
    </div>
  );
}
