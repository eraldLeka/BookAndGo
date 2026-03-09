import { useState } from "react";
import type { ReactNode, ChangeEvent, CSSProperties, FormEvent } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FInputProps {
  icon: ReactNode;
  type: string;
  ph: string;
  val: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  right?: ReactNode;
  err?: string;
}
interface LF { email: string; password: string; }
interface SF { name: string; email: string; password: string; confirm: string; role: "CLIENT" | "BUSINESS_OWNER"; }
type Errs = Record<string, string>;

// ─── Icons ────────────────────────────────────────────────────────────────────
const MailIco = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const LockIco = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const UserIco = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const EyeIco = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const EyeOffIco = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

// ─── Input Field ──────────────────────────────────────────────────────────────
function FInput({ icon, type, ph, val, onChange, right, err }: FInputProps) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <span style={{ position: "absolute", left: 13, color: "#94a3b8", display: "flex", pointerEvents: "none" }}>
          {icon}
        </span>
        <input
          type={type}
          placeholder={ph}
          value={val}
          onChange={onChange}
          style={{
            width: "100%",
            padding: "11px 44px",
            background: "#f8fafc",
            border: `1.5px solid ${err ? "#f87171" : "#e2e8f0"}`,
            borderRadius: 10,
            fontSize: 14,
            color: "#0f172a",
            fontFamily: "'DM Sans',sans-serif",
            outline: "none",
            boxSizing: "border-box",
            transition: "border-color .2s, box-shadow .2s",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#1e293b";
            e.target.style.boxShadow = "0 0 0 3px rgba(30,41,59,.08)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = err ? "#f87171" : "#e2e8f0";
            e.target.style.boxShadow = "none";
          }}
        />
        {right && (
          <span style={{ position: "absolute", right: 13, color: "#94a3b8", display: "flex", cursor: "pointer" }}>
            {right}
          </span>
        )}
      </div>
      {err && (
        <p style={{ color: "#ef4444", fontSize: 12, marginTop: 4, marginLeft: 2, fontFamily: "'DM Sans',sans-serif" }}>
          {err}
        </p>
      )}
    </div>
  );
}

// ─── AuthPage ─────────────────────────────────────────────────────────────────
export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [sp, setSp] = useState(false);   // show password (login + signup pw1)
  const [sp2, setSp2] = useState(false); // show confirm password
  const [lf, setLf] = useState<LF>({ email: "", password: "" });
  const [sf, setSf] = useState<SF>({ name: "", email: "", password: "", confirm: "", role: "CLIENT" });
  const [le, setLe] = useState<Errs>({});
  const [se, setSe] = useState<Errs>({});
  const [lok, setLok] = useState(false);
  const [sok, setSok] = useState(false);

  const toLogin = () => { setMode("login"); setSp(false); setSp2(false); };
  const toSignup = () => { setMode("signup"); setSp(false); setSp2(false); };

  const doLogin = (e: FormEvent) => {
    e.preventDefault();
    const err: Errs = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lf.email)) err.email = "Email i pavlefshëm";
    if (lf.password.length < 6) err.password = "Minimumi 6 karaktere";
    if (Object.keys(err).length) { setLe(err); return; }
    setLe({});
    setLok(true);
    setTimeout(() => setLok(false), 3000);
  };

  const doSignup = (e: FormEvent) => {
    e.preventDefault();
    const err: Errs = {};
    if (sf.name.trim().length < 2) err.name = "Emri duhet ≥ 2 karaktere";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sf.email)) err.email = "Email i pavlefshëm";
    if (sf.password.length < 8) err.password = "Minimumi 8 karaktere";
    if (sf.password !== sf.confirm) err.confirm = "Fjalëkalimet nuk përputhen";
    if (Object.keys(err).length) { setSe(err); return; }
    setSe({});
    setSok(true);
    setTimeout(() => setSok(false), 3000);
  };

  // Image slides: login → left (covers signup), signup → right (covers login)
  const imgX = mode === "login" ? "translateX(0%)" : "translateX(100%)";

  const halfStyle = (side: "L" | "R"): CSSProperties => ({
    position: "absolute",
    top: 0,
    left: side === "L" ? 0 : "50%",
    width: "50%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 52px",
    background: "#f8f7f4",
  });

  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body, #root { height: 100%; overflow: hidden; }
    .abt {
      width: 100%; padding: 13px; border: none; border-radius: 10px;
      background: #1e293b; color: #fff; font-size: 15px;
      font-family: 'DM Sans', sans-serif; font-weight: 500;
      cursor: pointer; letter-spacing: .2px;
      transition: background .2s, transform .12s; margin-top: 4px;
    }
    .abt:hover { background: #0f172a; transform: translateY(-1px); }
    .abt:active { transform: translateY(0); }
    .rbt {
      flex: 1; padding: 9px 8px; border-radius: 8px;
      border: 1.5px solid #e2e8f0; background: transparent;
      font-size: 13px; font-family: 'DM Sans', sans-serif;
      cursor: pointer; transition: all .2s; color: #64748b;
    }
    .rbt.on { background: #1e293b; border-color: #1e293b; color: #fff; }
    .sl { color: #1e293b; font-weight: 600; cursor: pointer; text-decoration: underline; text-underline-offset: 3px; }
    .sl:hover { opacity: .6; }
    input::placeholder { color: #94a3b8; }
  `;

  return (
    <>
      <style>{CSS}</style>
      <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden", background: "#f8f7f4", fontFamily: "'DM Sans',sans-serif" }}>

        {/* ── SIGNUP FORM — LEFT ─────────────────────────────────────── */}
        <div style={halfStyle("L")}>
          <div style={{ width: "100%", maxWidth: 370 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 38, fontWeight: 700, color: "#0f172a", lineHeight: 1.15, marginBottom: 6 }}>
              Krijo llogari
            </h2>
            <p style={{ color: "#64748b", fontSize: 14, marginBottom: 22 }}>
              Bashkohu me platformën e rezervimeve
            </p>

            {/* Role toggle */}
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {(["CLIENT", "BUSINESS_OWNER"] as const).map((r) => (
                <button
                  key={r}
                  className={`rbt${sf.role === r ? " on" : ""}`}
                  onClick={() => setSf((p) => ({ ...p, role: r }))}
                >
                  {r === "CLIENT" ? "👤 Klient" : "🏢 Biznes"}
                </button>
              ))}
            </div>

            {sok && (
              <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, padding: "11px 14px", marginBottom: 14, fontSize: 13, color: "#166534" }}>
                ✓ Llogaria u krijua! Kontrolloni emailin.
              </div>
            )}

            <form onSubmit={doSignup} noValidate>
              <FInput
                icon={<UserIco />} type="text" ph="Emri i plotë"
                val={sf.name} err={se.name}
                onChange={(e) => { setSf((p) => ({ ...p, name: e.target.value })); setSe((p) => ({ ...p, name: "" })); }}
              />
              <FInput
                icon={<MailIco />} type="email" ph="Email"
                val={sf.email} err={se.email}
                onChange={(e) => { setSf((p) => ({ ...p, email: e.target.value })); setSe((p) => ({ ...p, email: "" })); }}
              />
              <FInput
                icon={<LockIco />} type={sp ? "text" : "password"} ph="Fjalëkalimi (min. 8)"
                val={sf.password} err={se.password}
                right={<span onClick={() => setSp((v) => !v)}>{sp ? <EyeOffIco /> : <EyeIco />}</span>}
                onChange={(e) => { setSf((p) => ({ ...p, password: e.target.value })); setSe((p) => ({ ...p, password: "" })); }}
              />
              <FInput
                icon={<LockIco />} type={sp2 ? "text" : "password"} ph="Konfirmo fjalëkalimin"
                val={sf.confirm} err={se.confirm}
                right={<span onClick={() => setSp2((v) => !v)}>{sp2 ? <EyeOffIco /> : <EyeIco />}</span>}
                onChange={(e) => { setSf((p) => ({ ...p, confirm: e.target.value })); setSe((p) => ({ ...p, confirm: "" })); }}
              />
              <button type="submit" className="abt">Regjistrohu</button>
            </form>

            <p style={{ textAlign: "center", fontSize: 13, color: "#64748b", marginTop: 18 }}>
              Keni llogari?{" "}
              <span className="sl" onClick={toLogin}>Hyni këtu</span>
            </p>
          </div>
        </div>

        {/* ── LOGIN FORM — RIGHT ─────────────────────────────────────── */}
        <div style={halfStyle("R")}>
          <div style={{ width: "100%", maxWidth: 370 }}>
            {/* Brand */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
              <div style={{ width: 38, height: 38, borderRadius: 9, background: "#1e293b", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: 20, color: "#c9a84c" }}>B</span>
              </div>
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 700, color: "#0f172a" }}>
                Book<span style={{ color: "#c9a84c" }}>&</span>Go
              </span>
            </div>

            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 38, fontWeight: 700, color: "#0f172a", lineHeight: 1.15, marginBottom: 6 }}>
              Mirë se erdhët
            </h2>
            <p style={{ color: "#64748b", fontSize: 14, marginBottom: 28 }}>Hyni në llogarinë tuaj</p>

            {lok && (
              <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, padding: "11px 14px", marginBottom: 14, fontSize: 13, color: "#166534" }}>
                ✓ Hyrja u krye me sukses!
              </div>
            )}

            <form onSubmit={doLogin} noValidate>
              <FInput
                icon={<MailIco />} type="email" ph="Email"
                val={lf.email} err={le.email}
                onChange={(e) => { setLf((p) => ({ ...p, email: e.target.value })); setLe((p) => ({ ...p, email: "" })); }}
              />
              <FInput
                icon={<LockIco />} type={sp ? "text" : "password"} ph="Fjalëkalimi"
                val={lf.password} err={le.password}
                right={<span onClick={() => setSp((v) => !v)}>{sp ? <EyeOffIco /> : <EyeIco />}</span>}
                onChange={(e) => { setLf((p) => ({ ...p, password: e.target.value })); setLe((p) => ({ ...p, password: "" })); }}
              />
              <div style={{ textAlign: "right", marginBottom: 18, marginTop: -6 }}>
                <span style={{ fontSize: 13, color: "#94a3b8", cursor: "pointer" }}>
                  Harruat fjalëkalimin?
                </span>
              </div>
              <button type="submit" className="abt">Hyr</button>
            </form>

            <p style={{ textAlign: "center", fontSize: 13, color: "#64748b", marginTop: 18 }}>
              Nuk keni llogari?{" "}
              <span className="sl" onClick={toSignup}>Regjistrohu</span>
            </p>
          </div>
        </div>

        {/* ── IMAGE PANEL — slides over forms ───────────────────────── */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "50%",
            height: "100%",
            transform: imgX,
            transition: "transform .72s cubic-bezier(.77,0,.18,1)",
            zIndex: 20,
            overflow: "hidden",
          }}
        >
          {/* Background image */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url(https://images.unsplash.com/photo-1560066984-138dadb4c035?w=900&q=80)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          {/* Dark overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(155deg,rgba(15,23,42,.83) 0%,rgba(15,23,42,.52) 55%,rgba(201,168,76,.22) 100%)",
            }}
          />
          {/* Gold top bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: "linear-gradient(90deg,#c9a84c,#f0d898,#c9a84c)",
            }}
          />

          {/* Content */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "44px 48px",
              color: "#fff",
            }}
          >
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: "rgba(255,255,255,.12)",
                  border: "1px solid rgba(255,255,255,.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: 18, color: "#c9a84c" }}>B</span>
              </div>
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 700 }}>
                Book<span style={{ color: "#c9a84c" }}>&</span>Go
              </span>
            </div>

            {/* Hero text — changes with mode */}
            <div>
              <div style={{ width: 44, height: 2, background: "#c9a84c", marginBottom: 22 }} />
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: 50, fontWeight: 700, lineHeight: 1.1,
                  letterSpacing: "-.5px", marginBottom: 18,
                  textShadow: "0 2px 24px rgba(0,0,0,.3)",
                  whiteSpace: "pre-line",
                }}
              >
                {mode === "login" ? "Rezervo.\nRelakso.\nShkëlq." : "Platforma\njuaj e\nbukurisë."}
              </h3>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,.75)", lineHeight: 1.65, maxWidth: 300, fontWeight: 300 }}>
                {mode === "login"
                  ? "Zbulo sallone dhe klinike estetike në Tiranë. Rezervo online në sekonda."
                  : "Regjistro biznesin tënd dhe fillo të marrësh klientë të rinj sot."}
              </p>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: 36 }}>
              {([["10+", "Biznese"], ["500+", "Rezervime"], ["4.9★", "Vlerësim"]] as const).map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 700, color: "#c9a84c", lineHeight: 1 }}>
                    {n}
                  </div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.6)", textTransform: "uppercase", letterSpacing: ".8px", marginTop: 3 }}>
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}