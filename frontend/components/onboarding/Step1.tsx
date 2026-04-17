export default function Step1({ formData, update, errors, next }: any) {
  return (
    <div className="space-y-4">
      <input
        className="input"
        placeholder="Business Name"
        value={formData.business_name}
        onChange={(e) => update({ business_name: e.target.value })}
      />
      {errors.business_name && <p className="error">{errors.business_name}</p>}

      <select
        className="input"
        value={formData.business_type}
        onChange={(e) => update({ business_type: e.target.value })}
      >
        <option value="">Select Business Type</option>
        <option value="sole_trader">Sole Trader</option>
        <option value="llc">LLC</option>
        <option value="corporation">Corporation</option>
      </select>
      {errors.business_type && <p className="error">{errors.business_type}</p>}

      <input
        className="input"
        placeholder="MCC Code"
        maxLength={4}
        inputMode="numeric"
        value={formData.mcc_code}
        onChange={(e) => update({ mcc_code: e.target.value })}
      />
      {errors.mcc_code && <p className="error">{errors.mcc_code}</p>}

      <button onClick={next} className="btn-primary w-full">
        Continue
      </button>
    </div>
  );
}
