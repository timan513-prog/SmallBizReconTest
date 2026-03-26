import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const QUESTIONS = [
  { q: "Has your EIDL been sent to the Treasury?", opts: ["Yes", "No", "I'm not sure"] },
  { q: "Were you notified by the SBA?", opts: ["Yes", "No", "I found out another way"] },
  { q: "Were you sent to a collection agency?", opts: ["Yes", "No", "I'm not sure"] },
  { q: "Were you making payments?", opts: ["Yes, I was current", "I had fallen behind", "No, I stopped paying"] },
  { q: "If returned to the SBA, can you resume your normal monthly payment?", opts: ["Yes", "No", "I would need a modified plan"] },
];

type Step = "email" | "choose" | "quiz" | "download";

export default function GateScreen() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<{ q: string; a: string }[]>([]);
  const [downloadTitle, setDownloadTitle] = useState("You're All Set!");
  const [downloadSubtext, setDownloadSubtext] = useState("Your free Contact the SBA Package is ready.");
  const [countdown, setCountdown] = useState(5);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleEmailSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!email || !email.includes("@")) {
      emailRef.current?.focus();
      return;
    }
    setStep("choose");
  };

  const goToQuiz = () => { setCurrentQ(0); setAnswers([]); setStep("quiz"); };

  const skipToDownload = () => {
    setDownloadTitle("We'll Be in Touch!");
    setDownloadSubtext("Your free consultation is scheduled. Download your SBA Package below.");
    setStep("download");
  };

  const selectAnswer = (answer: string) => {
    const newAnswers = [...answers, { q: QUESTIONS[currentQ].q, a: answer }];
    setAnswers(newAnswers);
    if (currentQ + 1 < QUESTIONS.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setDownloadTitle("Assessment Complete!");
      setDownloadSubtext("Based on your answers, we may be able to help. Download your free SBA Package.");
      setStep("download");
    }
  };

  // Countdown redirect
  useEffect(() => {
    if (step !== "download") return;
    setCountdown(5);
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) { clearInterval(timer); navigate("/home"); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [step, navigate]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700;800;900&display=swap');
        .gate-page { font-family: 'Inter', system-ui, sans-serif; background: #f4f1eb; color: #3a4a38; }
        .gate-page * { box-sizing: border-box; }
        .font-heading { font-family: 'Playfair Display', Georgia, serif; }
        .spring-t { transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease; }
        @keyframes floatSlow { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-10px) rotate(1deg)} }
        .float-slow { animation: floatSlow 6s ease-in-out infinite; }
        .shadow-elevated { box-shadow: 0 1px 2px rgba(58,74,56,0.06), 0 4px 12px rgba(58,74,56,0.08), 0 12px 32px rgba(58,74,56,0.06); }
        .grain::after { content:''; position:absolute; inset:0; opacity:0.03; pointer-events:none; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); background-size:128px; }
        .step-enter { animation: stepIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        @keyframes stepIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      <div className="gate-page" style={{ minHeight: "100vh", overflowX: "hidden" }}>
        {/* NAV */}
        <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:50, background:"rgba(244,241,235,0.9)", backdropFilter:"blur(12px)", borderBottom:"1px solid rgba(58,74,56,0.05)" }}>
          <div style={{ maxWidth:1280, margin:"0 auto", padding:"12px 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <img src="/smallbizrecon_logo_transparent.png" alt="SmallBiz Recon" style={{ height:48, width:48, objectFit:"contain" }} />
              <span className="font-heading" style={{ fontWeight:700, fontSize:20, letterSpacing:"-0.02em", color:"#3a4a38" }}>SmallBiz Recon</span>
            </div>
            <button onClick={() => navigate("/home")} className="spring-t" style={{ padding:"10px 20px", background:"#3a4a38", color:"#f4f1eb", fontSize:14, fontWeight:600, borderRadius:8, border:"none", cursor:"pointer" }}>
              Enter Site
            </button>
          </div>
        </nav>

        {/* HERO */}
        <section className="grain" style={{ position:"relative", paddingTop:140, paddingBottom:80, overflow:"hidden" }}>
          <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
            <div style={{ position:"absolute", top:0, right:0, width:"50%", height:"100%", background:"linear-gradient(to left, rgba(234,229,219,0.6), transparent)" }} />
          </div>

          <div style={{ position:"relative", maxWidth:1280, margin:"0 auto", padding:"0 24px", display:"grid", gridTemplateColumns:"1.2fr 0.8fr", gap:32, alignItems:"center" }}>
            {/* LEFT */}
            <div style={{ maxWidth:560 }}>
              <h1 className="font-heading" style={{ fontSize:"clamp(28px, 4vw, 52px)", lineHeight:1.08, letterSpacing:"-0.03em", color:"#3a4a38", marginBottom:24, fontWeight:900 }}>
                HAS THE SBA SENT YOUR COVID EIDL TO THE TREASURY WITHOUT NOTICE?
              </h1>
              <p style={{ fontSize:18, color:"#566a52", lineHeight:1.6, marginBottom:32 }}>
                SmallBiz Recon may be able to help get your issue resolved!!
              </p>
              <h2 className="font-heading" style={{ fontSize:22, fontWeight:700, color:"#3a4a38", marginBottom:20 }}>
                Sign up for a FREE consultation, today!!
              </h2>

              {/* STEP 1: EMAIL */}
              {step === "email" && (
                <div className="step-enter">
                  <form onSubmit={handleEmailSubmit} style={{ marginBottom:16 }}>
                    <input
                      ref={emailRef}
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Email"
                      required
                      style={{ width:"100%", maxWidth:420, padding:"14px 20px", background:"#fff", border:"1px solid rgba(58,74,56,0.15)", borderRadius:8, fontSize:15, color:"#3a4a38", marginBottom:12, outline:"none", fontFamily:"Inter, system-ui, sans-serif" }}
                    />
                    <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:12 }}>
                      <p style={{ fontSize:12, color:"rgba(58,74,56,0.5)", lineHeight:1.5 }}>
                        By entering my email, I acknowledge the <a href="/privacy-policy" style={{ textDecoration:"underline", color:"inherit" }}>Privacy Policy</a>.
                      </p>
                      <button type="submit" className="spring-t" style={{ padding:"12px 24px", background:"#3a4a38", color:"#f4f1eb", fontWeight:600, fontSize:14, borderRadius:8, border:"2px solid #3a4a38", cursor:"pointer", whiteSpace:"nowrap" }}>
                        Schedule free consultation
                      </button>
                    </div>
                  </form>
                  <button onClick={handleEmailSubmit} className="spring-t" style={{ display:"flex", alignItems:"center", gap:16, padding:16, marginTop:24, background:"rgba(232,213,168,0.6)", border:"1px solid rgba(212,185,110,0.4)", borderRadius:12, cursor:"pointer", width:"100%", textAlign:"left" }}>
                    <div style={{ width:48, height:48, background:"rgba(212,185,110,0.3)", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#b08d3a" strokeWidth="2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/><path d="M9 14l2 2 4-4"/></svg>
                    </div>
                    <div>
                      <p style={{ fontWeight:700, color:"#3a4a38", fontSize:15 }}>Get our FREE Contact the SBA Toolkit</p>
                      <p style={{ fontSize:13, color:"rgba(58,74,56,0.7)" }}>Packed with freebies and important information</p>
                    </div>
                  </button>
                </div>
              )}

              {/* STEP 2: CHOOSE PATH */}
              {step === "choose" && (
                <div className="step-enter" style={{ background:"rgba(255,255,255,0.8)", backdropFilter:"blur(8px)", borderRadius:16, padding:24, border:"1px solid rgba(58,74,56,0.05)" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#566a52" strokeWidth="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    <p style={{ fontSize:14, fontWeight:600, color:"#3a4a38" }}>Email saved! What would you like to do?</p>
                  </div>
                  <div style={{ display:"grid", gap:12 }}>
                    <button onClick={goToQuiz} className="spring-t" style={{ display:"flex", alignItems:"center", gap:12, padding:16, background:"#3a4a38", color:"#f4f1eb", borderRadius:12, border:"none", cursor:"pointer", textAlign:"left" }}>
                      <div style={{ width:40, height:40, background:"rgba(244,241,235,0.15)", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 14l2 2 4-4"/></svg>
                      </div>
                      <div>
                        <p style={{ fontWeight:700, fontSize:14 }}>Take the 5-Question Assessment</p>
                        <p style={{ fontSize:12, opacity:0.7 }}>Find out if we can help your situation</p>
                      </div>
                    </button>
                    <button onClick={skipToDownload} className="spring-t" style={{ display:"flex", alignItems:"center", gap:12, padding:16, background:"#f4f1eb", border:"1px solid rgba(58,74,56,0.1)", color:"#3a4a38", borderRadius:12, cursor:"pointer", textAlign:"left" }}>
                      <div style={{ width:40, height:40, background:"rgba(58,74,56,0.05)", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                      </div>
                      <div>
                        <p style={{ fontWeight:700, fontSize:14 }}>Just Schedule My Free Consultation</p>
                        <p style={{ fontSize:12, color:"#647a60" }}>Skip the quiz — we'll call you directly</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: QUIZ */}
              {step === "quiz" && (
                <div className="step-enter" style={{ background:"rgba(255,255,255,0.8)", backdropFilter:"blur(8px)", borderRadius:16, padding:24, border:"1px solid rgba(58,74,56,0.05)" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                    <span style={{ fontSize:12, fontWeight:600, color:"#566a52" }}>Question {currentQ + 1} of 5</span>
                    <span style={{ fontSize:12, color:"#647a60" }}>{Math.round(((currentQ + 1) / 5) * 100)}%</span>
                  </div>
                  <div style={{ width:"100%", height:8, background:"rgba(58,74,56,0.1)", borderRadius:999, marginBottom:20, overflow:"hidden" }}>
                    <div style={{ height:"100%", background:"#3a4a38", borderRadius:999, width:`${((currentQ + 1) / 5) * 100}%`, transition:"width 0.4s cubic-bezier(0.34,1.56,0.64,1)" }} />
                  </div>
                  <p className="font-heading" style={{ fontWeight:700, fontSize:18, color:"#3a4a38", marginBottom:16 }}>{QUESTIONS[currentQ].q}</p>
                  <div style={{ display:"grid", gap:8 }}>
                    {QUESTIONS[currentQ].opts.map((opt, i) => (
                      <button key={i} onClick={() => selectAnswer(opt)} className="spring-t" style={{ width:"100%", textAlign:"left", padding:"12px 16px", background:"#f4f1eb", border:"1px solid rgba(58,74,56,0.1)", borderRadius:12, fontSize:14, fontWeight:500, color:"#3a4a38", cursor:"pointer" }}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4: DOWNLOAD + REDIRECT */}
              {step === "download" && (
                <div className="step-enter" style={{ background:"rgba(255,255,255,0.8)", backdropFilter:"blur(8px)", borderRadius:16, padding:24, border:"1px solid rgba(58,74,56,0.05)", textAlign:"center" }}>
                  <div style={{ width:64, height:64, background:"rgba(58,74,56,0.05)", borderRadius:999, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4a5c47" strokeWidth="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  </div>
                  <h3 className="font-heading" style={{ fontWeight:700, fontSize:20, color:"#3a4a38", marginBottom:8 }}>{downloadTitle}</h3>
                  <p style={{ fontSize:14, color:"#566a52", marginBottom:20 }}>{downloadSubtext}</p>
                  <a href="/SBA-Contact-Package.zip" download className="spring-t" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"14px 24px", background:"#d4b96e", color:"#3a4a38", fontWeight:700, fontSize:14, borderRadius:8, textDecoration:"none", marginBottom:12 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                    Download Free SBA Package
                  </a>
                  <p style={{ fontSize:12, color:"rgba(58,74,56,0.4)", marginTop:12 }}>Redirecting to full resource center in {countdown}s...</p>
                  <div style={{ width:"100%", height:4, background:"rgba(58,74,56,0.1)", borderRadius:999, marginTop:8, overflow:"hidden" }}>
                    <div style={{ height:"100%", background:"#566a52", borderRadius:999, width:`${((5 - countdown) / 5) * 100}%`, transition:"width 1s linear" }} />
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT: Phone mockup */}
            <div style={{ display:"flex", justifyContent:"flex-end", alignItems:"flex-start", marginRight:-32 }}>
              <div className="float-slow" style={{ marginTop:-20 }}>
                <img
                  src="/PHONE-MOCKUP-UPDATE.png"
                  alt="Phone showing SBA EIDL sent to Treasury notification"
                  style={{ width:"100%", maxWidth:480, height:"auto", objectFit:"contain", filter:"drop-shadow(0 20px 50px rgba(0,0,0,0.18))" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* URGENCY BAR */}
        <section style={{ background:"#3a4a38", padding:"16px 0", position:"relative" }}>
          <div style={{ maxWidth:960, margin:"0 auto", padding:"0 24px", display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"center", gap:24, color:"#f4f1eb" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#d4b96e"><path d="M12 2L1 21h22L12 2zm0 4l7.53 13H4.47L12 6z"/><rect x="11" y="10" width="2" height="4"/><rect x="11" y="16" width="2" height="2"/></svg>
              <span style={{ fontSize:14, fontWeight:600 }}>Deadlines are approaching</span>
            </div>
            <div style={{ width:1, height:24, background:"rgba(244,241,235,0.2)", display:"none" }} className="md-show" />
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4b96e" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span style={{ fontSize:14 }}>Don't wait until it's too late</span>
            </div>
          </div>
        </section>

        {/* TRUST BADGES */}
        <section style={{ padding:"64px 0", background:"#f4f1eb", position:"relative" }}>
          <div style={{ maxWidth:960, margin:"0 auto", padding:"0 24px", display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:32, textAlign:"center" }}>
            {[
              { val: "25+", label: "Years Experience" },
              { val: "5,000+", label: "Cases Reviewed" },
              { val: "100%", label: "Independent" },
              { val: "24/7", label: "Resource Access" },
            ].map((s, i) => (
              <div key={i}>
                <p className="font-heading" style={{ fontWeight:700, fontSize:36, color:"#3a4a38", letterSpacing:"-0.02em" }}>{s.val}</p>
                <p style={{ fontSize:14, color:"#566a52", marginTop:4 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
