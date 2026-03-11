import { useState,useRef } from "react";
import type { ReactNode, ChangeEvent, CSSProperties, FormEvent } from "react";
import "../styles/AuthPage.css";
import logo from "../assets/bookandgologo.jpeg";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FInputProps {
  icon: ReactNode;
  type: string;
  ph: string;
  val: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  right?: ReactNode;
  err?: string;
  autocomplete?: string;
}
interface LF { email: string; password: string; }
interface SF {
  name: string; email: string; password: string;
  confirm: string; role: "CLIENT" | "BUSINESS_OWNER";
}
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
function FInput({ icon, type, ph, val, onChange, right, err, autocomplete }: FInputProps) {
  return (
    <div className="input-group">
      <div className="input-wrapper">
        <span className="input-icon">{icon}</span>
        <input
          type={type} placeholder={ph} value={val} onChange={onChange}
          autoComplete={autocomplete ?? "off"}
          className={`input ${err ? "error" : ""}`}
        />
        {right && <span className="input-right">{right}</span>}
      </div>
      {err && <p className="error-text">{err}</p>}
    </div>
  );
}

// ─── Hero content per mode ────────────────────────────────────────────────────
const heroContent = {
  login:  { heading: "Book smarter.\nGo further.",     sub: "Discover salons and aesthetic clinics in Tirana. Book online in seconds." },
  signup: { heading: "Your beauty\nplatform\nawaits.", sub: "Register your business and start attracting new clients today." },
};

// ─── AuthPage ─────────────────────────────────────────────────────────────────
export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [displayMode, setDisplayMode] = useState<"login" | "signup">("login");
  const [sp, setSp] = useState(false);
  const [sp2, setSp2] = useState(false);
  const [lf, setLf] = useState<LF>({ email: "", password: "" });
  const [sf, setSf] = useState<SF>({ name: "", email: "", password: "", confirm: "", role: "CLIENT" });
  const [le, setLe] = useState<Errs>({});
  const [se, setSe] = useState<Errs>({});
  const [lok, setLok] = useState(false);
  const [sok, setSok] = useState(false);

  // Refs per animacion
  const lineRef    = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const busyRef    = useRef(false);

  const runTextAnim = (newMode: "login" | "signup") => {
    if (busyRef.current) return;
    busyRef.current = true;

    const line    = lineRef.current;
    const heading = headingRef.current;
    const sub     = subtextRef.current;
    if (!line || !heading || !sub) return;

    // 1. Viza zgjerohet + teksti del
    line.classList.add("expanding");
    heading.classList.add("text-exit");
    sub.classList.add("text-exit");

    setTimeout(() => {
      // 2. Ndrysho content (i fshehur)
      setDisplayMode(newMode);

      // 3. Pozicion enter (pa transition)
      heading.classList.remove("text-exit"); heading.classList.add("text-enter");
      sub.classList.remove("text-exit");     sub.classList.add("text-enter");

      // 4. Force reflow
      void heading.offsetHeight;

      // 5. Viza kthehet + teksti hyn
      line.classList.remove("expanding");
      heading.classList.remove("text-enter"); heading.classList.add("text-visible");
      sub.classList.remove("text-enter");     sub.classList.add("text-visible");

      setTimeout(() => {
        heading.classList.remove("text-visible");
        sub.classList.remove("text-visible");
        busyRef.current = false;
      }, 500);

    }, 500);
  };

  const toLogin = () => {
    if (mode === "login") return;
    setMode("login");
    setSp(false); setSp2(false);
    runTextAnim("login");
  };

  const toSignup = () => {
    if (mode === "signup") return;
    setMode("signup");
    setSp(false); setSp2(false);
    runTextAnim("signup");
  };

  const doLogin = (e: FormEvent) => {
    e.preventDefault();
    const err: Errs = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lf.email)) err.email = "Invalid email address";
    if (lf.password.length < 6) err.password = "Minimum 6 characters";
    if (Object.keys(err).length) { setLe(err); return; }
    setLe({}); setLok(true);
    setTimeout(() => setLok(false), 3000);
  };

  const doSignup = (e: FormEvent) => {
    e.preventDefault();
    const err: Errs = {};
    if (sf.name.trim().length < 2) err.name = "Name must be ≥ 2 characters";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sf.email)) err.email = "Invalid email address";
    if (sf.password.length < 8) err.password = "Minimum 8 characters";
    if (sf.password !== sf.confirm) err.confirm = "Passwords do not match";
    if (Object.keys(err).length) { setSe(err); return; }
    setSe({}); setSok(true);
    setTimeout(() => setSok(false), 3000);
  };

  const imgX = mode === "login" ? "translateX(0%)" : "translateX(100%)";

  const halfStyle = (side: "L" | "R"): CSSProperties => ({
    position: "absolute", top: 0,
    left: side === "L" ? 0 : "50%",
    width: "50%", height: "100%",
    display: "flex", alignItems: "center",
    justifyContent: "center", padding: "0 52px",
  });

  return (
    <div className="auth-root">

      {/* ── SIGNUP — LEFT ───────────────────────────────────────────── */}
      <div style={halfStyle("L")}>
        <div className="auth-box">
          <h2 className="title">Create account</h2>
          <p className="subtitle">Join the booking platform</p>

          <div className="role-toggle">
            {(["CLIENT", "BUSINESS_OWNER"] as const).map((r) => (
              <button key={r} className={`rbt ${sf.role === r ? "on" : ""}`}
                onClick={() => setSf((p) => ({ ...p, role: r }))}>
                {r === "CLIENT" ? "👤 Client" : "🏢 Business"}
              </button>
            ))}
          </div>

          {sok && <div className="success-box">✓ Account created! Check your email.</div>}

          <form onSubmit={doSignup} noValidate>
            <FInput icon={<UserIco />} type="text" ph="Full name"
              val={sf.name} err={se.name} autocomplete="name"
              onChange={(e) => { setSf((p) => ({ ...p, name: e.target.value })); setSe((p) => ({ ...p, name: "" })); }} />
            <FInput icon={<MailIco />} type="email" ph="Email"
              val={sf.email} err={se.email} autocomplete="email"
              onChange={(e) => { setSf((p) => ({ ...p, email: e.target.value })); setSe((p) => ({ ...p, email: "" })); }} />
            <FInput icon={<LockIco />} type={sp ? "text" : "password"} ph="Password (min. 8)"
              val={sf.password} err={se.password} autocomplete="new-password"
              right={<span onClick={() => setSp((v) => !v)}>{sp ? <EyeOffIco /> : <EyeIco />}</span>}
              onChange={(e) => { setSf((p) => ({ ...p, password: e.target.value })); setSe((p) => ({ ...p, password: "" })); }} />
            <FInput icon={<LockIco />} type={sp2 ? "text" : "password"} ph="Confirm password"
              val={sf.confirm} err={se.confirm} autocomplete="new-password"
              right={<span onClick={() => setSp2((v) => !v)}>{sp2 ? <EyeOffIco /> : <EyeIco />}</span>}
              onChange={(e) => { setSf((p) => ({ ...p, confirm: e.target.value })); setSe((p) => ({ ...p, confirm: "" })); }} />
            <button type="submit" className="abt">Sign up</button>
          </form>

          <p className="switch">
            Already have an account? <span onClick={toLogin}>Sign in</span>
          </p>
        </div>
      </div>

      {/* ── LOGIN — RIGHT ───────────────────────────────────────────── */}
      <div style={halfStyle("R")}>
        <div className="auth-box">
          <div className="brand">
            <div className="brand-icon"><img src={logo} alt="Book&Go logo" /></div>
            <span className="brand-name">Book<span className="brand-amp">&</span>Go</span>
          </div>

          <h2 className="title">Welcome back</h2>
          <p className="subtitle">Sign in to your account</p>

          {lok && <div className="success-box">✓ Signed in successfully!</div>}

          <form onSubmit={doLogin} noValidate>
            <FInput icon={<MailIco />} type="email" ph="Email"
              val={lf.email} err={le.email} autocomplete="email"
              onChange={(e) => { setLf((p) => ({ ...p, email: e.target.value })); setLe((p) => ({ ...p, email: "" })); }} />
            <FInput icon={<LockIco />} type={sp ? "text" : "password"} ph="Password"
              val={lf.password} err={le.password} autocomplete="new-password"
              right={<span onClick={() => setSp((v) => !v)}>{sp ? <EyeOffIco /> : <EyeIco />}</span>}
              onChange={(e) => { setLf((p) => ({ ...p, password: e.target.value })); setLe((p) => ({ ...p, password: "" })); }} />
            <div className="forgot"><span>Forgot your password?</span></div>
            <button type="submit" className="abt">Sign in</button>
          </form>

          <p className="switch">
            Don't have an account? <span onClick={toSignup}>Sign up</span>
          </p>
        </div>
      </div>

      {/* ── IMAGE PANEL ─────────────────────────────────────────────── */}
      <div className="image-panel" style={{ transform: imgX }}>
        <div className="image-panel__bg" />
        <div className="image-panel__overlay" />
        <div className="image-panel__topbar" />

        <div className="image-panel__content">
          {/* Logo */}
          <div className="image-panel__logo">
            <div className="image-panel__logo-icon">
              <img src={logo} alt="Book&Go logo" />
            </div>
            <span className="image-panel__logo-name">
              Book<span className="gold">&</span>Go
            </span>
          </div>

          {/* Hero text — animohet */}
          <div className="image-panel__hero">
            <div className="image-panel__accent-line" ref={lineRef} />
            <h3 className="image-panel__heading" ref={headingRef}>
              {heroContent[displayMode].heading}
            </h3>
            <p className="image-panel__subtext" ref={subtextRef}>
              {heroContent[displayMode].sub}
            </p>
          </div>

          {/* Stats */}
          <div className="image-panel__stats">
            {([["10+", "Businesses"], ["500+", "Bookings"], ["4.9★", "Rating"]] as const).map(([n, l]) => (
              <div key={l} className="image-panel__stat">
                <div className="image-panel__stat-num">{n}</div>
                <div className="image-panel__stat-label">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}