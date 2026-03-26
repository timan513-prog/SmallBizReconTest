import React, { useState, useMemo, useCallback } from "react";

// ─── ACCESS KEY ───
const WEB3FORMS_KEY = "f1ce1de8-d7c3-40c1-9d84-ca2bd9e97c92";

const BUSINESS_TYPES = [
  "Sole Proprietor",
  "Independent Contractor",
  "Limited Liability Company (LLC)",
  "Limited Liability Partnership (LLP)",
  "S Corporation (S Corp)",
  "Corporation (C Corp)",
  "Nonprofit",
  "Cooperative (Co-Op)",
  "Franchise",
  "Benefit Corporation (B Corp)",
];

const SERVICE_TYPES = [
  { value: "recall", label: "SBA Recall / Reinstatement Letter" },
  { value: "treasury_dispute", label: "Treasury Formal Dispute / Cross-Servicing Dispute" },
  { value: "collection_dispute", label: "Collection Agency Official Dispute" },
];

const COMPLIANCE_ACTIONS = [
  { value: "release_collateral", label: "Release of Collateral", icon: "🔓" },
  { value: "subordination", label: "Subordination", icon: "📊" },
  { value: "relocation", label: "Relocation", icon: "📍" },
  { value: "change_ownership", label: "Change in Ownership", icon: "🔄" },
  { value: "change_guarantor", label: "Change of Guarantor", icon: "👤" },
  { value: "release_guarantor", label: "Release of Guarantor", icon: "🔑" },
  { value: "closure_liquidation", label: "Business Closure / Liquidation", icon: "📋" },
  { value: "payment_assistance", label: "Payment Assistance", icon: "💳" },
  { value: "offer_compromise", label: "Offer in Compromise", icon: "🤝" },
  { value: "identity_theft", label: "Identity Theft", icon: "🛡️" },
  { value: "other", label: "Other", icon: "✏️" },
];

/* ─── COLOR PALETTE ─── */
const C = {
  bgPrimary: "#111610",
  bgSecondary: "#1a1f16",
  bgCard: "#1e2419",
  bgInput: "#161b12",
  bgElevated: "#242b1e",
  border: "#2d3526",
  borderHover: "#3d4a2f",
  borderFocus: "#c9a84c",
  gold: "#c9a84c",
  goldMuted: "#a08735",
  goldLight: "#d4b65e",
  goldDim: "#7a6529",
  cream: "#f5f0e1",
  creamMuted: "#d4cdb8",
  textMuted: "#9ca38b",
  textDim: "#6b7360",
  success: "#5a8a3c",
  error: "#c45c4a",
  errorBg: "#2a1a18",
};

/* ─── STEP CONFIG ─── */
const STEPS = [
  { id: 1, label: "Borrower Info", short: "01" },
  { id: 2, label: "Loan & Service", short: "02" },
  { id: 3, label: "Account Status", short: "03" },
  { id: 4, label: "Business Changes", short: "04" },
  { id: 5, label: "Statement & Submit", short: "05" },
];

/* ─── REFERENCE ID GENERATOR ─── */
const generateRefId = () => {
  const d = new Date();
  const date = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SBR-${date}-${rand}`;
};

/* ─── FORMAT HELPERS ─── */
const formatEIN = (val) => {
  const digits = val.replace(/\D/g, "").slice(0, 9);
  if (digits.length > 2) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
  return digits;
};

const formatPhone = (val) => {
  const digits = val.replace(/\D/g, "").slice(0, 10);
  if (digits.length > 6) return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  if (digits.length > 3) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  if (digits.length > 0) return `(${digits}`;
  return "";
};

const formatCurrency = (val) => {
  const digits = val.replace(/[^\d.]/g, "");
  if (!digits) return "";
  const parts = digits.split(".");
  const whole = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (parts.length > 1) return `$${whole}.${parts[1].slice(0, 2)}`;
  return `$${whole}`;
};

/* ─── ICONS ─── */
const ArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
);
const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2.5 6L5 8.5L9.5 3.5" stroke={C.bgPrimary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ShieldIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);
const CheckCircleLg = () => (
  <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
const AlertIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.error} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

/* ─── REUSABLE COMPONENTS ─── */
const Checkbox = ({ checked }) => (
  <div style={{
    width: 20, height: 20, minWidth: 20, borderRadius: 5,
    border: `2px solid ${checked ? C.gold : C.border}`,
    background: checked ? C.gold : "transparent",
    display: "flex", alignItems: "center", justifyContent: "center",
    transition: "all 0.2s", marginTop: 2,
  }}>
    {checked && <CheckIcon />}
  </div>
);

const Radio = ({ checked }) => (
  <div style={{
    width: 20, height: 20, minWidth: 20, borderRadius: "50%",
    border: `2px solid ${checked ? C.gold : C.border}`,
    display: "flex", alignItems: "center", justifyContent: "center",
    transition: "all 0.2s", marginTop: 2,
  }}>
    {checked && <div style={{ width: 9, height: 9, borderRadius: "50%", background: C.gold }} />}
  </div>
);

const YesNoToggle = ({ value, onChange }) => (
  <div style={{ display: "flex", gap: 8 }}>
    {["yes", "no"].map((opt) => (
      <button key={opt} type="button" onClick={() => onChange(opt)} style={{
        padding: "8px 22px", borderRadius: 8,
        border: `1px solid ${value === opt ? C.gold : C.border}`,
        background: value === opt ? `${C.gold}15` : C.bgInput,
        color: value === opt ? C.gold : C.textMuted,
        fontSize: 13, fontWeight: 600, cursor: "pointer",
        transition: "all 0.2s", fontFamily: "'DM Sans', sans-serif",
      }}>
        {opt === "yes" ? "Yes" : "No"}
      </button>
    ))}
  </div>
);

const Field = ({ label, required, children, hint }) => (
  <div style={{ marginBottom: 20 }}>
    <label style={{
      display: "block", fontSize: 13, fontWeight: 600,
      color: C.creamMuted, marginBottom: 8, letterSpacing: "0.01em",
    }}>
      {label}{required && <span style={{ color: C.gold, marginLeft: 3 }}>*</span>}
    </label>
    {children}
    {hint && <p style={{ fontSize: 12, color: C.textDim, marginTop: 6, lineHeight: 1.4 }}>{hint}</p>}
  </div>
);

const Input = ({ name, value, onChange, placeholder, type = "text", style: extraStyle, ...props }) => {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type} name={name} value={value} onChange={onChange}
      placeholder={placeholder}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      style={{
        width: "100%", padding: "13px 16px", borderRadius: 10,
        border: `1px solid ${focused ? C.gold : C.border}`,
        background: C.bgInput, color: C.cream, fontSize: 15,
        fontFamily: "'DM Sans', sans-serif", outline: "none",
        transition: "border-color 0.2s, box-shadow 0.2s",
        boxSizing: "border-box",
        boxShadow: focused ? `0 0 0 3px ${C.gold}15` : "none",
        ...extraStyle,
      }}
      {...props}
    />
  );
};

const TextArea = ({ name, value, onChange, placeholder, rows = 5, ...props }) => {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      name={name} value={value} onChange={onChange}
      placeholder={placeholder} rows={rows}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      style={{
        width: "100%", padding: "13px 16px", borderRadius: 10,
        border: `1px solid ${focused ? C.gold : C.border}`,
        background: C.bgInput, color: C.cream, fontSize: 15,
        fontFamily: "'DM Sans', sans-serif", outline: "none",
        transition: "border-color 0.2s, box-shadow 0.2s",
        boxSizing: "border-box", resize: "vertical", minHeight: 120,
        boxShadow: focused ? `0 0 0 3px ${C.gold}15` : "none",
      }}
      {...props}
    />
  );
};

const Select = ({ name, value, onChange, children, ...props }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <select
        name={name} value={value} onChange={onChange}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          width: "100%", padding: "13px 16px", borderRadius: 10,
          border: `1px solid ${focused ? C.gold : C.border}`,
          background: C.bgInput, color: C.cream, fontSize: 15,
          fontFamily: "'DM Sans', sans-serif", outline: "none",
          transition: "border-color 0.2s, box-shadow 0.2s",
          boxSizing: "border-box", appearance: "none", cursor: "pointer",
          boxShadow: focused ? `0 0 0 3px ${C.gold}15` : "none",
        }}
        {...props}
      >
        {children}
      </select>
      <div style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: C.textDim }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg>
      </div>
    </div>
  );
};

const Divider = () => (
  <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.border}, transparent)`, margin: "36px 0" }} />
);

const SectionHeader = ({ step, title }) => (
  <div style={{ marginBottom: 28 }}>
    <p style={{
      fontFamily: "'Orbitron', 'DM Sans', sans-serif", fontSize: 11, fontWeight: 700,
      textTransform: "uppercase", letterSpacing: "0.12em", color: C.gold, marginBottom: 6,
    }}>Section {step}</p>
    <h2 style={{
      fontFamily: "'Orbitron', 'DM Sans', sans-serif", fontSize: 18, fontWeight: 700,
      color: C.cream, margin: 0,
    }}>{title}</h2>
  </div>
);

const Panel = ({ title, children }) => (
  <div style={{
    background: C.bgInput, border: `1px solid ${C.border}`,
    borderRadius: 12, padding: 24, marginBottom: 24,
  }}>
    {title && <p style={{ fontSize: 14, fontWeight: 700, color: C.cream, marginBottom: 16, marginTop: 0 }}>{title}</p>}
    {children}
  </div>
);

/* ─── MAIN FORM COMPONENT ─── */
export default function DisputeRecallIntakeForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [refId, setRefId] = useState("");

  const [form, setForm] = useState({
    businessName: "", ein: "", loanAmount: "", businessType: "",
    loanNumbers: "", contactName: "", contactEmail: "", contactPhone: "",
    serviceType: "", complianceAction: "", complianceOther: "",
    sbaLetterReceived: false, treasuryContacted: false, referredToCollection: false,
    collectionAgencyName: "", agencyContactInfo: "",
    knowsBalance: "", currentBalance: "", lastPaymentDate: "",
    soldCollateral: "", lostCollateral: "", trashedCollateral: "",
    collateralExplanation: "",
    movedBusiness: "",
    oldLocation: "", newLocation: "",
    movedMultiple: "",
    additionalLocations: "",
    moveExplanation: "",
    partnerChanges: "",
    partnerExplanation: "",
    businessClosed: "",
    closureType: "",
    closureDate: "",
    remainingCollateral: "",
    dissolutionFiled: "",
    dissolutionDate: "",
    closureExplanation: "",
    canMakeGoodFaith: "", goodFaithAmount: "",
    canContinuePayments: "",
    borrowerStatement: "",
    acknowledgement1: false, acknowledgement2: false, acknowledgement3: false,
  });

  const [coOwners, setCoOwners] = useState([]);
  const [extraMoves, setExtraMoves] = useState([]);

  const set = useCallback((name, value) => {
    setForm((p) => ({ ...p, [name]: value }));
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    set(name, type === "checkbox" ? checked : value);
  }, [set]);

  const handleFormatted = useCallback((name, formatter) => (e) => {
    set(name, formatter(e.target.value));
  }, [set]);

  // ─── Validation per step ───
  const einValid = /^\d{2}-\d{7}$/.test(form.ein);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail);

  const stepValid = useMemo(() => {
    switch (step) {
      case 1:
        return form.businessName.trim() && form.ein.trim() && einValid &&
          form.contactName.trim() && form.contactEmail.trim() && emailValid &&
          form.contactPhone.trim();
      case 2:
        return form.loanNumbers.trim() && form.loanAmount.trim() && form.serviceType;
      case 3: return true;
      case 4: return true;
      case 5:
        return form.borrowerStatement.trim().length >= 50 &&
          form.acknowledgement1 && form.acknowledgement2 && form.acknowledgement3;
      default: return false;
    }
  }, [step, form, einValid, emailValid]);

  const nextStep = () => { if (stepValid && step < 5) setStep(step + 1); };
  const prevStep = () => { if (step > 1) setStep(step - 1); };

  // ─── Co-owners ───
  const addCoOwner = () => setCoOwners((p) => [...p, { name: "", pct: "" }]);
  const updateCoOwner = (i, f, v) => setCoOwners((p) => p.map((o, idx) => idx === i ? { ...o, [f]: v } : o));
  const removeCoOwner = (i) => setCoOwners((p) => p.filter((_, idx) => idx !== i));

  // ─── Extra moves ───
  const addMove = () => setExtraMoves((p) => [...p, { location: "", date: "" }]);
  const updateMove = (i, f, v) => setExtraMoves((p) => p.map((o, idx) => idx === i ? { ...o, [f]: v } : o));
  const removeMove = (i) => setExtraMoves((p) => p.filter((_, idx) => idx !== i));

  // ─── Submit ───
  const handleSubmit = async () => {
    if (!stepValid) return;
    setIsSubmitting(true);
    setSubmitError("");
    const id = generateRefId();

    try {
      const payload = new FormData();
      payload.append("access_key", WEB3FORMS_KEY);
      payload.append("subject", `SmallBiz Recon™ Intake — ${form.businessName} — ${id}`);
      payload.append("from_name", "SmallBiz Recon™ Intake Form");

      // Serialize all form fields
      Object.entries(form).forEach(([k, v]) => {
        if (typeof v === "boolean") payload.append(k, v ? "Yes" : "No");
        else payload.append(k, v);
      });

      payload.append("reference_id", id);
      payload.append("co_owners", JSON.stringify(coOwners));
      payload.append("additional_moves", JSON.stringify(extraMoves));

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload,
      });
      const data = await res.json();

      if (data.success) {
        setRefId(id);
        setIsSubmitted(true);
      } else {
        setSubmitError("Submission failed. Please try again or contact info@smallbizrecon.com.");
      }
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── SUCCESS SCREEN ───
  if (isSubmitted) {
    return (
      <div style={pageStyle}>
        <Fonts />
        <div style={noiseStyle} />
        <div style={{ ...containerStyle, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
          <div style={{ ...cardStyle, maxWidth: 640, textAlign: "center" }}>
            <div style={{
              width: 84, height: 84, borderRadius: "50%",
              background: `${C.gold}12`, border: `1px solid ${C.gold}30`,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 28px",
            }}>
              <CheckCircleLg />
            </div>
            <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 24, fontWeight: 700, color: C.cream, marginBottom: 12 }}>
              Submission Received
            </h1>
            <p style={{ fontSize: 15, color: C.textMuted, lineHeight: 1.7, marginBottom: 8 }}>
              Your SmallBiz Recon™ intake has been received. A specialist will review your submission and assemble your complete servicing package.
            </p>
            <div style={{
              display: "inline-block", padding: "12px 28px", borderRadius: 10,
              background: `${C.gold}12`, border: `1px solid ${C.gold}25`,
              marginBottom: 32,
            }}>
              <p style={{ fontSize: 12, color: C.textMuted, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'Orbitron', sans-serif" }}>
                Reference ID
              </p>
              <p style={{ fontSize: 20, fontWeight: 700, color: C.gold, margin: 0, fontFamily: "'Orbitron', sans-serif", letterSpacing: "0.05em" }}>
                {refId}
              </p>
            </div>

            <div style={{
              textAlign: "left", background: `${C.gold}08`, border: `1px solid ${C.gold}18`,
              borderRadius: 12, padding: "24px 28px", marginBottom: 32,
            }}>
              <h3 style={{
                fontFamily: "'Orbitron', sans-serif", fontSize: 12, fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "0.1em", color: C.gold, marginTop: 0, marginBottom: 16,
              }}>What Happens Next</h3>
              {[
                "Our specialist reviews your submission details",
                "We may request supporting documents via email — have your Reference ID ready",
                "Your complete servicing package is assembled and delivered via email within 5–7 business days",
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: i < 2 ? 12 : 0 }}>
                  <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 12, fontWeight: 700, color: C.gold, minWidth: 18 }}>{i + 1}.</span>
                  <span style={{ fontSize: 14, color: C.creamMuted, lineHeight: 1.5 }}>{s}</span>
                </div>
              ))}
            </div>

            <button onClick={() => window.location.reload()} style={{ ...btnPrimary, width: "auto", padding: "14px 40px" }}>
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── RENDER STEPS ───
  const renderStep = () => {
    switch (step) {
      /* ────── STEP 1: BORROWER INFO ────── */
      case 1:
        return (
          <>
            <SectionHeader step="A" title="Borrower Information" />
            <div style={grid2}>
              <Field label="Legal Business Name" required>
                <Input name="businessName" value={form.businessName} onChange={handleChange} placeholder="Full legal business name" />
              </Field>
              <Field label="Employer ID Number (EIN)" required hint={form.ein && !einValid ? "⚠ Format: XX-XXXXXXX" : undefined}>
                <Input name="ein" value={form.ein} onChange={handleFormatted("ein", formatEIN)} placeholder="XX-XXXXXXX" />
              </Field>
            </div>
            <Field label="Business Type">
              <Select name="businessType" value={form.businessType} onChange={handleChange}>
                <option value="">Select business type...</option>
                {BUSINESS_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </Select>
            </Field>
            <Divider />
            <p style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 14, fontWeight: 700, color: C.cream, marginBottom: 20 }}>
              Primary Contact
            </p>
            <div style={grid3}>
              <Field label="Full Name" required>
                <Input name="contactName" value={form.contactName} onChange={handleChange} placeholder="First and last name" />
              </Field>
              <Field label="Email" required>
                <Input name="contactEmail" value={form.contactEmail} onChange={handleChange} placeholder="email@example.com" type="email" />
              </Field>
              <Field label="Phone" required>
                <Input name="contactPhone" value={form.contactPhone} onChange={handleFormatted("contactPhone", formatPhone)} placeholder="(555) 555-5555" />
              </Field>
            </div>

            <Panel title="Co-Owners with 20%+ Ownership">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: coOwners.length ? 16 : 0 }}>
                <span style={{ fontSize: 13, color: C.textDim }}>
                  {coOwners.length === 0 ? "No co-owners added." : `${coOwners.length} co-owner${coOwners.length > 1 ? "s" : ""}`}
                </span>
                <button type="button" onClick={addCoOwner} style={addBtn}>
                  <PlusIcon /> Add
                </button>
              </div>
              {coOwners.map((o, i) => (
                <div key={i} style={rowCard}>
                  <div style={{ flex: 2 }}>
                    <Input value={o.name} onChange={(e) => updateCoOwner(i, "name", e.target.value)} placeholder="Full name" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Input value={o.pct} onChange={(e) => updateCoOwner(i, "pct", e.target.value)} placeholder="e.g. 30%" />
                  </div>
                  <button type="button" onClick={() => removeCoOwner(i)} style={deleteBtn}><TrashIcon /></button>
                </div>
              ))}
            </Panel>
          </>
        );

      /* ────── STEP 2: LOAN & SERVICE ────── */
      case 2:
        return (
          <>
            <SectionHeader step="B" title="Loan & Service Selection" />
            <div style={grid2}>
              <Field label="SBA Loan Number(s)" required hint="Separate multiple with commas">
                <Input name="loanNumbers" value={form.loanNumbers} onChange={handleChange} placeholder="e.g. 1234567890" />
              </Field>
              <Field label="Original Loan Amount" required>
                <Input name="loanAmount" value={form.loanAmount} onChange={handleFormatted("loanAmount", formatCurrency)} placeholder="$0.00" />
              </Field>
            </div>

            <Field label="Service Type" required>
              <Select name="serviceType" value={form.serviceType} onChange={handleChange}>
                <option value="">Select service type...</option>
                {SERVICE_TYPES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </Select>
            </Field>

            <Divider />
            <p style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 14, fontWeight: 700, color: C.cream, marginBottom: 6 }}>
              Compliance Servicing Action
            </p>
            <p style={{ fontSize: 13, color: C.textDim, marginBottom: 20, lineHeight: 1.5 }}>
              Optional. Select if an additional servicing action applies. This may not be processed until the loan is returned from Treasury or the collection agency.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {COMPLIANCE_ACTIONS.map((a) => {
                const sel = form.complianceAction === a.value;
                return (
                  <label key={a.value} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "14px 16px", borderRadius: 10, cursor: "pointer",
                    border: `1px solid ${sel ? C.gold : C.border}`,
                    background: sel ? `${C.gold}0a` : C.bgInput,
                    transition: "all 0.2s",
                  }}>
                    <input type="radio" name="complianceAction" value={a.value} checked={sel} onChange={handleChange} style={{ display: "none" }} />
                    <Radio checked={sel} />
                    <span style={{ fontSize: 14, color: sel ? C.cream : C.creamMuted }}>{a.icon} {a.label}</span>
                  </label>
                );
              })}
            </div>
            {form.complianceAction === "other" && (
              <div style={{ marginTop: 16 }}>
                <Field label="Describe your compliance action">
                  <Input name="complianceOther" value={form.complianceOther} onChange={handleChange} placeholder="Describe the action needed..." />
                </Field>
              </div>
            )}
          </>
        );

      /* ────── STEP 3: ACCOUNT STATUS ────── */
      case 3:
        return (
          <>
            <SectionHeader step="C" title="Account Status & Communication" />
            <Panel title="SBA & Treasury Communication">
              {[
                { name: "sbaLetterReceived", text: "I received a letter from the SBA informing me my loan would be sent to Treasury" },
                { name: "treasuryContacted", text: "Treasury has contacted me regarding my loan" },
                { name: "referredToCollection", text: "I have been referred to a collection agency" },
              ].map((item) => (
                <React.Fragment key={item.name}>
                  <label style={{
                    display: "flex", alignItems: "flex-start", gap: 14,
                    padding: "14px 16px", borderRadius: 10, cursor: "pointer",
                    background: form[item.name] ? `${C.gold}08` : "transparent",
                    border: `1px solid ${form[item.name] ? `${C.gold}25` : "transparent"}`,
                    marginBottom: 8, transition: "all 0.2s",
                  }}>
                    <input type="checkbox" name={item.name} checked={form[item.name]} onChange={handleChange} style={{ display: "none" }} />
                    <Checkbox checked={form[item.name]} />
                    <span style={{ fontSize: 14, color: C.creamMuted, lineHeight: 1.5 }}>{item.text}</span>
                  </label>
                  {item.name === "referredToCollection" && form.referredToCollection && (
                    <div style={{ ...grid2, paddingLeft: 34, paddingBottom: 8 }}>
                      <Field label="Collection Agency Name">
                        <Input name="collectionAgencyName" value={form.collectionAgencyName} onChange={handleChange} placeholder="Agency name" />
                      </Field>
                      <Field label="Agency Contact Info">
                        <Input name="agencyContactInfo" value={form.agencyContactInfo} onChange={handleChange} placeholder="Phone or email" />
                      </Field>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </Panel>

            <div style={grid2}>
              <Field label="Do you know your current EIDL balance?">
                <YesNoToggle value={form.knowsBalance} onChange={(v) => set("knowsBalance", v)} />
                {form.knowsBalance === "yes" && (
                  <div style={{ marginTop: 12 }}>
                    <Input name="currentBalance" value={form.currentBalance} onChange={handleFormatted("currentBalance", formatCurrency)} placeholder="$0.00" />
                  </div>
                )}
              </Field>
              <Field label="When was your last payment?">
                <Input name="lastPaymentDate" value={form.lastPaymentDate} onChange={handleChange} placeholder="e.g. March 2024 or Never" />
              </Field>
            </div>

            <Panel title="Good Faith Payment & Continued Payments">
              <div style={grid2}>
                <div>
                  <Field label="Are you able to make a good faith payment if required?">
                    <YesNoToggle value={form.canMakeGoodFaith} onChange={(v) => set("canMakeGoodFaith", v)} />
                  </Field>
                  {form.canMakeGoodFaith === "yes" && (
                    <Field label="How much can you offer?">
                      <Input name="goodFaithAmount" value={form.goodFaithAmount} onChange={handleFormatted("goodFaithAmount", formatCurrency)} placeholder="$0.00" />
                    </Field>
                  )}
                </div>
                <Field label="If loan is returned to SBA, can you continue payments?">
                  <YesNoToggle value={form.canContinuePayments} onChange={(v) => set("canContinuePayments", v)} />
                </Field>
              </div>
            </Panel>
          </>
        );

      /* ────── STEP 4: BUSINESS CHANGES ────── */
      case 4:
        return (
          <>
            <SectionHeader step="D" title="Business & Collateral Changes" />

            {/* Collateral */}
            <Panel title="Collateral Status">
              <div style={grid3}>
                <Field label="Have you sold any collateral tied to this loan?">
                  <YesNoToggle value={form.soldCollateral} onChange={(v) => set("soldCollateral", v)} />
                </Field>
                <Field label="Have you lost any collateral?">
                  <YesNoToggle value={form.lostCollateral} onChange={(v) => set("lostCollateral", v)} />
                </Field>
                <Field label="Have you trashed or donated collateral?">
                  <YesNoToggle value={form.trashedCollateral} onChange={(v) => set("trashedCollateral", v)} />
                </Field>
              </div>
              {(form.soldCollateral === "yes" || form.lostCollateral === "yes" || form.trashedCollateral === "yes") && (
                <Field label="Please explain the collateral situation">
                  <TextArea name="collateralExplanation" value={form.collateralExplanation} onChange={handleChange} placeholder="Describe what happened with the collateral..." rows={3} />
                </Field>
              )}
            </Panel>

            {/* Relocation */}
            <Panel title="Business Relocation">
              <Field label="Have you moved your business since obtaining the EIDL loan?">
                <YesNoToggle value={form.movedBusiness} onChange={(v) => set("movedBusiness", v)} />
              </Field>
              {form.movedBusiness === "yes" && (
                <>
                  <div style={grid2}>
                    <Field label="Original Business Location">
                      <Input name="oldLocation" value={form.oldLocation} onChange={handleChange} placeholder="Address at time of EIDL" />
                    </Field>
                    <Field label="Current Business Location">
                      <Input name="newLocation" value={form.newLocation} onChange={handleChange} placeholder="Current address" />
                    </Field>
                  </div>
                  <Field label="Have you moved more than once?">
                    <YesNoToggle value={form.movedMultiple} onChange={(v) => set("movedMultiple", v)} />
                  </Field>
                  {form.movedMultiple === "yes" && (
                    <>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                        <span style={{ fontSize: 13, color: C.textDim }}>Additional locations</span>
                        <button type="button" onClick={addMove} style={addBtn}><PlusIcon /> Add Location</button>
                      </div>
                      {extraMoves.map((m, i) => (
                        <div key={i} style={rowCard}>
                          <div style={{ flex: 2 }}>
                            <Input value={m.location} onChange={(e) => updateMove(i, "location", e.target.value)} placeholder="Address" />
                          </div>
                          <div style={{ flex: 1 }}>
                            <Input value={m.date} onChange={(e) => updateMove(i, "date", e.target.value)} placeholder="Approx. date" />
                          </div>
                          <button type="button" onClick={() => removeMove(i)} style={deleteBtn}><TrashIcon /></button>
                        </div>
                      ))}
                    </>
                  )}
                  <Field label="Explain the relocation(s)">
                    <TextArea name="moveExplanation" value={form.moveExplanation} onChange={handleChange} placeholder="Why did you relocate?" rows={3} />
                  </Field>
                </>
              )}
            </Panel>

            {/* Ownership Changes */}
            <Panel title="Ownership Changes">
              <Field label="Have any partners with 20%+ ownership entered or left the business?">
                <YesNoToggle value={form.partnerChanges} onChange={(v) => set("partnerChanges", v)} />
              </Field>
              {form.partnerChanges === "yes" && (
                <Field label="Explain the ownership changes">
                  <TextArea name="partnerExplanation" value={form.partnerExplanation} onChange={handleChange} placeholder="Who entered or left, ownership percentages, and when..." rows={3} />
                </Field>
              )}
            </Panel>

            {/* Business Closure */}
            <Panel title="Business Closure">
              <Field label="Is your business currently closed?">
                <YesNoToggle value={form.businessClosed} onChange={(v) => set("businessClosed", v)} />
              </Field>
              {form.businessClosed === "yes" && (
                <>
                  <div style={grid3}>
                    <Field label="Temporary or Permanent?">
                      <Select name="closureType" value={form.closureType} onChange={handleChange}>
                        <option value="">Select...</option>
                        <option value="temporary">Temporary</option>
                        <option value="permanent">Permanent</option>
                      </Select>
                    </Field>
                    <Field label="When did it close?">
                      <Input name="closureDate" value={form.closureDate} onChange={handleChange} placeholder="e.g. January 2024" />
                    </Field>
                    <Field label="Any remaining collateral?">
                      <YesNoToggle value={form.remainingCollateral} onChange={(v) => set("remainingCollateral", v)} />
                    </Field>
                  </div>
                  <div style={grid2}>
                    <Field label="Did you file dissolution documents with your state?">
                      <YesNoToggle value={form.dissolutionFiled} onChange={(v) => set("dissolutionFiled", v)} />
                    </Field>
                    {form.dissolutionFiled === "yes" && (
                      <Field label="When were dissolution documents filed?">
                        <Input name="dissolutionDate" value={form.dissolutionDate} onChange={handleChange} placeholder="e.g. March 2024" />
                      </Field>
                    )}
                  </div>
                  <Field label="Explain the closure">
                    <TextArea name="closureExplanation" value={form.closureExplanation} onChange={handleChange} placeholder="Why did the business close? Any relevant details..." rows={3} />
                  </Field>
                </>
              )}
            </Panel>
          </>
        );

      /* ────── STEP 5: STATEMENT & SUBMIT ────── */
      case 5:
        return (
          <>
            <SectionHeader step="E" title="Borrower Statement & Submission" />

            <Field label="In your own words, explain why you believe this file should be returned to SBA or formally disputed. Include relevant history, payments, communications, or errors." required>
              <TextArea name="borrowerStatement" value={form.borrowerStatement} onChange={handleChange}
                placeholder="Provide as much detail as possible — this directly shapes your servicing letters..." rows={8} />
              <p style={{
                fontSize: 12, marginTop: 8,
                color: form.borrowerStatement.length >= 50 ? C.success : C.textDim,
              }}>
                {form.borrowerStatement.length >= 50 ? "✓ " : ""}Minimum 50 characters · Current: {form.borrowerStatement.length}
              </p>
            </Field>

            {/* Documents note */}
            <div style={{
              padding: "20px 24px", borderRadius: 12, marginBottom: 28,
              background: `${C.gold}08`, border: `1px solid ${C.gold}18`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                </svg>
                <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: C.gold }}>
                  Supporting Documents
                </span>
              </div>
              <p style={{ fontSize: 14, color: C.creamMuted, lineHeight: 1.6, margin: 0 }}>
                SmallBiz Recon™ may request supporting documents at a later date (Treasury notices, SBA correspondence, payment proof, etc.). You will be contacted via email with instructions and your Reference ID.
              </p>
            </div>

            {/* Acknowledgments */}
            <p style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 14, fontWeight: 700, color: C.cream, marginBottom: 16 }}>
              Acknowledgments
            </p>
            {[
              { name: "acknowledgement1", text: "I understand this is a document packaging service — SmallBiz Recon™ is not a law firm or legal representative." },
              { name: "acknowledgement2", text: "I understand outcomes are not guaranteed and results depend on individual circumstances." },
              { name: "acknowledgement3", text: "I confirm all information provided is accurate and complete to the best of my knowledge." },
            ].map((ack) => (
              <label key={ack.name} style={{
                display: "flex", alignItems: "flex-start", gap: 14,
                padding: "14px 16px", borderRadius: 10, cursor: "pointer",
                background: form[ack.name] ? `${C.gold}08` : "transparent",
                border: `1px solid ${form[ack.name] ? `${C.gold}25` : C.border}`,
                marginBottom: 8, transition: "all 0.2s",
              }}>
                <input type="checkbox" name={ack.name} checked={form[ack.name]} onChange={handleChange} style={{ display: "none" }} />
                <Checkbox checked={form[ack.name]} />
                <span style={{ fontSize: 14, color: C.creamMuted, lineHeight: 1.5 }}>{ack.text}</span>
              </label>
            ))}

            {/* Privacy Disclaimer */}
            <div style={{
              marginTop: 28, padding: "20px 24px", borderRadius: 12,
              background: `linear-gradient(135deg, ${C.bgInput}, ${C.bgPrimary})`,
              border: `1px solid ${C.border}`, position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", top: 0, left: 0, width: 4, height: "100%",
                background: C.gold, borderRadius: "12px 0 0 12px",
              }} />
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <ShieldIcon />
                <span style={{
                  fontFamily: "'Orbitron', sans-serif", fontSize: 12, fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: "0.1em", color: C.gold,
                }}>Document Privacy Disclaimer</span>
              </div>
              <p style={{ fontSize: 13, color: C.creamMuted, lineHeight: 1.7, margin: 0 }}>
                SmallBiz Recon™ will securely dispose of all personal documents submitted upon completion of your servicing package. Clients are{" "}
                <strong style={{ color: C.cream }}>not required to include any personal information</strong>{" "}
                beyond what is necessary for the servicing request. Any personal information provided is done so at the client's own accord, and SmallBiz Recon™ assumes no liability for personal data voluntarily submitted.
              </p>
            </div>

            {submitError && (
              <div style={{
                display: "flex", alignItems: "flex-start", gap: 12,
                padding: "16px 20px", borderRadius: 10,
                background: C.errorBg, border: `1px solid ${C.error}33`, marginTop: 24,
              }}>
                <AlertIcon />
                <p style={{ fontSize: 14, color: C.error, lineHeight: 1.5, margin: 0 }}>{submitError}</p>
              </div>
            )}
          </>
        );

      default: return null;
    }
  };

  return (
    <div style={pageStyle}>
      <Fonts />
      <div style={noiseStyle} />
      <div style={containerStyle}>
        {/* Back button */}
        <button
          onClick={() => step > 1 ? prevStep() : window.history.back()}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            color: C.gold, background: "none", border: "none", cursor: "pointer",
            fontSize: 14, fontWeight: 600, letterSpacing: "0.02em",
            marginBottom: 28, padding: "8px 0", transition: "opacity 0.2s",
          }}
        >
          <ArrowLeft /> {step > 1 ? "Previous Step" : "Back"}
        </button>

        <div style={cardStyle}>
          {/* Header */}
          <div style={{ marginBottom: 32 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14,
              background: `linear-gradient(135deg, ${C.gold}22, ${C.gold}0a)`,
              border: `1px solid ${C.gold}30`,
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 18,
            }}>
              <ShieldIcon />
            </div>
            <h1 style={{
              fontFamily: "'Orbitron', 'DM Sans', sans-serif", fontSize: 24, fontWeight: 700,
              color: C.cream, marginBottom: 10, lineHeight: 1.3,
            }}>
              SmallBiz Recon™{" "}
              <span style={{ color: C.gold }}>Intake Form</span>
            </h1>
            <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.6, maxWidth: 680, margin: 0 }}>
              SBA Recall / Reinstatement · Treasury Formal Dispute / Cross-Servicing Dispute · Collection Agency Official Dispute
            </p>
          </div>

          {/* Step indicator */}
          <div style={{
            display: "flex", gap: 4, marginBottom: 36,
            padding: "16px 0",
            borderTop: `1px solid ${C.border}`,
            borderBottom: `1px solid ${C.border}`,
          }}>
            {STEPS.map((s) => {
              const active = s.id === step;
              const done = s.id < step;
              return (
                <button key={s.id} type="button"
                  onClick={() => { if (done) setStep(s.id); }}
                  style={{
                    flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                    padding: "8px 4px", borderRadius: 8, border: "none", cursor: done ? "pointer" : "default",
                    background: active ? `${C.gold}12` : "transparent",
                    transition: "all 0.2s",
                  }}
                >
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 700, fontFamily: "'Orbitron', sans-serif",
                    background: done ? C.gold : active ? `${C.gold}25` : C.bgInput,
                    color: done ? C.bgPrimary : active ? C.gold : C.textDim,
                    border: `1px solid ${done ? C.gold : active ? C.gold : C.border}`,
                    transition: "all 0.3s",
                  }}>
                    {done ? <CheckIcon /> : s.short}
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 600, color: active ? C.gold : done ? C.creamMuted : C.textDim,
                    transition: "color 0.2s", whiteSpace: "nowrap",
                  }}>
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Step content */}
          {renderStep()}

          {/* Navigation */}
          <div style={{ display: "flex", gap: 12, marginTop: 36 }}>
            {step > 1 && (
              <button type="button" onClick={prevStep} style={{
                flex: "0 0 auto", padding: "16px 28px", borderRadius: 12,
                border: `1px solid ${C.border}`, background: "transparent",
                color: C.creamMuted, fontSize: 14, fontWeight: 600,
                cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s",
              }}>
                <ArrowLeft /> Back
              </button>
            )}
            {step < 5 ? (
              <button type="button" onClick={nextStep} disabled={!stepValid} style={{
                ...btnPrimary, flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                opacity: stepValid ? 1 : 0.4, cursor: stepValid ? "pointer" : "not-allowed",
              }}>
                Continue <ArrowRight />
              </button>
            ) : (
              <button type="button" onClick={handleSubmit} disabled={!stepValid || isSubmitting} style={{
                ...btnPrimary, flex: 1,
                opacity: stepValid && !isSubmitting ? 1 : 0.4,
                cursor: stepValid && !isSubmitting ? "pointer" : "not-allowed",
              }}>
                {isSubmitting ? "Submitting..." : "Submit for Review & Package Assembly"}
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr 1fr"],
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
        ::placeholder { color: ${C.textDim}; }
        select option { background: ${C.bgPrimary}; color: ${C.cream}; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${C.bgPrimary}; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 3px; }
      `}</style>
    </div>
  );
}

/* ─── SHARED STYLES ─── */
const Fonts = () => (
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Orbitron:wght@500;600;700;800&display=swap" rel="stylesheet" />
);

const pageStyle = {
  minHeight: "100vh",
  background: `linear-gradient(165deg, ${C.bgPrimary} 0%, ${C.bgSecondary} 40%, #252e1c 100%)`,
  fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
  color: C.cream,
  position: "relative",
};

const noiseStyle = {
  position: "fixed", inset: 0, opacity: 0.025, pointerEvents: "none", zIndex: 0,
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
};

const containerStyle = {
  maxWidth: 960, margin: "0 auto", padding: "40px 20px 80px",
  position: "relative", zIndex: 1,
};

const cardStyle = {
  background: `linear-gradient(180deg, ${C.bgCard} 0%, ${C.bgSecondary} 100%)`,
  border: `1px solid ${C.border}`,
  borderRadius: 16, padding: "40px 36px",
  boxShadow: "0 24px 64px rgba(0,0,0,0.5), 0 1px 0 rgba(201,168,76,0.06) inset",
};

const grid2 = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 };
const grid3 = { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 };

const btnPrimary = {
  padding: "16px 32px", borderRadius: 12, border: "none",
  fontFamily: "'Orbitron', 'DM Sans', sans-serif",
  fontSize: 14, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase",
  background: `linear-gradient(135deg, ${C.gold}, ${C.goldMuted})`,
  color: C.bgPrimary, cursor: "pointer", transition: "all 0.25s",
  boxShadow: `0 4px 24px ${C.gold}30`,
};

const addBtn = {
  display: "inline-flex", alignItems: "center", gap: 6,
  padding: "6px 14px", borderRadius: 8,
  border: `1px solid ${C.border}`, background: "transparent",
  color: C.gold, fontSize: 12, fontWeight: 600, cursor: "pointer",
  fontFamily: "'DM Sans', sans-serif",
};

const deleteBtn = {
  display: "flex", alignItems: "center", justifyContent: "center",
  width: 36, height: 36, minWidth: 36, borderRadius: 8,
  border: `1px solid ${C.error}33`, background: `${C.error}11`,
  color: C.error, cursor: "pointer", flexShrink: 0,
};

const rowCard = {
  display: "flex", alignItems: "center", gap: 12, marginBottom: 10,
  padding: "12px 16px", borderRadius: 10,
  background: C.bgSecondary, border: `1px solid ${C.border}`,
};