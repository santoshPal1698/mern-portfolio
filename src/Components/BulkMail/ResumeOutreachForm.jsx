/**
 * ResumeOutreachForm — a landing-page hero + multi-step form that walks
 * through every endpoint of the Bulk Resume Sender API in sequence:
 *
 *   1. POST /auth/register   -> api_key
 *   2. POST /template        -> subject/body (uses api_key)
 *   3. POST /resume          -> resume PDF   (uses api_key)
 *   4. POST /contacts        -> contacts CSV (uses api_key)
 *   5. POST /campaigns       -> launch send  (uses api_key)
 *   6. GET  /campaigns/:id   -> poll status  (uses api_key)
 *
 * INSTALL (in your portfolio project):
 *   npm install styled-components lucide-react
 *
 * USAGE:
 *   import ResumeOutreachForm from "./ResumeOutreachForm";
 *   <ResumeOutreachForm />
 *
 * Set API_BASE_URL below to wherever you deploy the FastAPI backend.
 */

import React, { useState, useEffect, useRef } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import {
  Mail, FileText, Users, Rocket, CheckCircle2, Loader2,
  ArrowRight, ArrowLeft, KeyRound, Send,
} from "lucide-react";

const API_BASE_URL = "https://agentic-ai-fastapi.onrender.com"; // <- point this at your deployed backend

// ---------------------------------------------------------------------------
// Global type setup
// ---------------------------------------------------------------------------
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
`;

// ---------------------------------------------------------------------------
// Tokens
// ---------------------------------------------------------------------------
const ink = "#12181F";
const parchment = "#F5EFE1";
const stamp = "#C1502E";
const franked = "#3F8F76";
const gold = "#B8935A";
const graphite = "#4A4A46";
const faint = "#9A9182";

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------
const Page = styled.div`
  min-height: 100vh;
  background: ${ink};
  background-image:
    radial-gradient(circle at 15% 20%, rgba(193, 80, 46, 0.08), transparent 40%),
    radial-gradient(circle at 85% 80%, rgba(63, 143, 118, 0.07), transparent 45%);
  color: ${parchment};
  font-family: 'Inter', system-ui, sans-serif;
  display: grid;
  grid-template-columns: 1fr;
  padding: 4rem 1.5rem;

  @media (min-width: 960px) {
    grid-template-columns: 1fr 1fr;
    align-items: center;
    padding: 4rem 6vw;
    gap: 4rem;
  }
`;

const Pitch = styled.div`
  max-width: 480px;
  margin-bottom: 3rem;

  @media (min-width: 960px) {
    margin-bottom: 0;
  }
`;

const Eyebrow = styled.div`
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${stamp};
  margin-bottom: 1.25rem;
`;

const Headline = styled.h1`
  font-family: 'Fraunces', serif;
  font-weight: 600;
  font-size: clamp(2.1rem, 4.2vw, 3.2rem);
  line-height: 1.08;
  letter-spacing: -0.01em;
  margin: 0 0 1.25rem 0;
`;

const Sub = styled.p`
  color: ${faint};
  font-size: 1.02rem;
  line-height: 1.65;
  margin: 0 0 2.25rem 0;
`;

const Sequence = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  border-left: 1px solid rgba(245, 239, 225, 0.14);
`;

const SeqItem = styled.li`
  position: relative;
  padding: 0 0 1.5rem 1.5rem;
  font-size: 0.92rem;
  color: ${(p) => (p.$active ? parchment : faint)};
  transition: color 0.25s ease;

  &::before {
    content: '${(p) => p.$n}';
    position: absolute;
    left: -0.68rem;
    top: 0;
    width: 1.35rem;
    height: 1.35rem;
    border-radius: 50%;
    background: ${(p) => (p.$done ? franked : p.$active ? stamp : ink)};
    border: 1px solid ${(p) => (p.$done || p.$active ? "transparent" : "rgba(245,239,225,0.25)")};
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.68rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${parchment};
    transition: background 0.25s ease;
  }
`;

const SeqLabel = styled.div`
  font-weight: 600;
  margin-bottom: 0.15rem;
`;

const SeqDesc = styled.div`
  font-size: 0.82rem;
  color: ${faint};
`;

// ---------------------------------------------------------------------------
// The "boarding pass" form card
// ---------------------------------------------------------------------------
const CardWrap = styled.div`
  position: relative;
  max-width: 440px;
  width: 100%;
  justify-self: center;
`;

const Card = styled.div`
  background: ${parchment};
  color: ${graphite};
  border-radius: 14px;
  padding: 2.25rem 2rem 1.75rem;
  box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.55);
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.06);
`;

const StampBadge = styled.div`
  position: absolute;
  top: -14px;
  right: 24px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: ${(p) => (p.$franked ? franked : stamp)};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${parchment};
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.35);
  transition: background 0.3s ease;
`;

const StepTag = styled.div`
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${gold};
  margin-bottom: 0.4rem;
`;

const StepTitle = styled.h2`
  font-family: 'Fraunces', serif;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1.25rem 0;
`;

const Field = styled.div`
  margin-bottom: 1.1rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.35rem;
  color: ${graphite};
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 0.65rem 0.75rem;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  background: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 0.92rem;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &:focus {
    border-color: ${stamp};
    box-shadow: 0 0 0 3px rgba(193, 80, 46, 0.15);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  padding: 0.65rem 0.75rem;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  background: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  min-height: 96px;
  resize: vertical;
  outline: none;

  &:focus {
    border-color: ${stamp};
    box-shadow: 0 0 0 3px rgba(193, 80, 46, 0.15);
  }
`;

const FileDrop = styled.label`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem;
  border: 1px dashed rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.85rem;
  color: ${graphite};
  background: rgba(255, 255, 255, 0.5);

  input {
    display: none;
  }

  &:hover {
    border-color: ${stamp};
    
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: ${(p) => p.$cols || "1fr 1fr"};
  gap: 0.75rem;
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Spinner = styled(Loader2)`
  animation: ${spin} 0.9s linear infinite;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
`;

const GhostBtn = styled.button`
  background: none;
  border: none;
  color: ${graphite};
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  cursor: pointer;
  opacity: ${(p) => (p.disabled ? 0.3 : 0.75)};

  &:hover {
    opacity: ${(p) => (p.disabled ? 0.3 : 1)};
  }
`;

const PrimaryBtn = styled.button`
  background: ${stamp};
  color: ${parchment};
  border: none;
  border-radius: 999px;
  padding: 0.72rem 1.4rem;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: transform 0.12s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    background: #a8431f;
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorText = styled.div`
  color: ${stamp};
  font-size: 0.8rem;
  margin-top: 0.5rem;
  font-family: 'IBM Plex Mono', monospace;
`;

const Perforation = styled.div`
  height: 0;
  border-top: 1.5px dashed rgba(0, 0, 0, 0.18);
  margin: 1.5rem -2rem 1.25rem;
  position: relative;

  &::before, &::after {
    content: '';
    position: absolute;
    top: -9px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: ${ink};
  }
  &::before { left: -9px; }
  &::after { right: -9px; }
`;

const Stub = styled.div`
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.78rem;
`;

const StubRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.3rem 0;
  color: ${(p) => p.$highlight || graphite};
`;

const KeyBox = styled.div`
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  padding: 0.6rem 0.75rem;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.78rem;
  word-break: break-all;
  color: ${graphite};
`;

// ---------------------------------------------------------------------------
// Sequence copy (left column)
// ---------------------------------------------------------------------------
const SEQUENCE = [
  { label: "Register", desc: "Get your personal API key" },
  { label: "Write the letter", desc: "Your subject & message template" },
  { label: "Attach resume", desc: "Upload your PDF once" },
  { label: "Add recipients", desc: "Upload your HR contact list" },
  { label: "Launch", desc: "Send through your own SMTP account" },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function ResumeOutreachForm() {
  const [step, setStep] = useState(0); // 0..4 = form steps, 5 = tracking
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [apiKey, setApiKey] = useState("");

  const [subject, setSubject] = useState("Application for {role} — {your_name}");
  const [body, setBody] = useState(
    "Hi {hr_name},\n\nI'd love to join {company} as a {role}. I've attached my resume for your review.\n\nBest,\n{your_name}\n{your_phone}"
  );

  const [resumeFile, setResumeFile] = useState(null);
  const [contactsFile, setContactsFile] = useState(null);
  const [contactsCount, setContactsCount] = useState(null);

  const [smtpHost, setSmtpHost] = useState("smtp.gmail.com");
  const [smtpPort, setSmtpPort] = useState(465);
  const [smtpUser, setSmtpUser] = useState("");
  const [smtpPass, setSmtpPass] = useState("");
  const [yourName, setYourName] = useState("");
  const [yourRole, setYourRole] = useState("Agentic AI Engineer");
  const [yourPhone, setYourPhone] = useState("");
  const [yourLinkedin, setYourLinkedin] = useState("");

  const [campaignId, setCampaignId] = useState(null);
  const [status, setStatus] = useState(null);
  const pollRef = useRef(null);

  useEffect(() => {
    if (step === 5 && campaignId) {
      const poll = async () => {
        try {
          const res = await fetch(`${API_BASE_URL}/campaigns/${campaignId}`, {
            headers: { "X-API-Key": apiKey },
          });
          const data = await res.json();
          setStatus(data);
          if (data.status === "completed" || data.status === "failed") {
            clearInterval(pollRef.current);
          }
        } catch {
          /* network hiccup — keep polling */
        }
      };
      poll();
      pollRef.current = setInterval(poll, 4000);
      return () => clearInterval(pollRef.current);
    }
  }, [step, campaignId, apiKey]);

  const api = async (path, options = {}) => {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: { ...(options.headers || {}), ...(apiKey ? { "X-API-Key": apiKey } : {}) },
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.detail || "Something went wrong.");
    return data;
  };

  const handleRegister = async () => {
    setError(""); setLoading(true);
    try {
      const data = await api("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setApiKey(data.api_key);
      setStep(1);
    } catch (e) { setError(e.message); } finally { setLoading(false); setStep(1);}
  };

  const handleTemplate = async () => {
    setError(""); setLoading(true);
    try {
      await api("/template", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, body }),
      });
      setStep(2);
    } catch (e) { setError(e.message); } finally { setLoading(false); }
  };

  const handleResume = async () => {
    if (!resumeFile) { setError("Choose a PDF first."); return; }
    setError(""); setLoading(true);
    try {
      const fd = new FormData();
      fd.append("file", resumeFile);
      await api("/resume", { method: "POST", body: fd });
      setStep(3);
    } catch (e) { setError(e.message); } finally { setLoading(false); }
  };

  const handleContacts = async () => {
    if (!contactsFile) { setError("Choose a CSV first."); return; }
    setError(""); setLoading(true);
    try {
      const fd = new FormData();
      fd.append("file", contactsFile);
      const data = await api("/contacts", { method: "POST", body: fd });
      setContactsCount(data.count);
      setStep(4);
    } catch (e) { setError(e.message); } finally { setLoading(false); }
  };

  const handleLaunch = async () => {
    setError(""); setLoading(true);
    try {
      const data = await api("/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          smtp: {
            smtp_host: smtpHost,
            smtp_port: Number(smtpPort),
            use_ssl: Number(smtpPort) === 465,
            smtp_user: smtpUser,
            smtp_password: smtpPass,
          },
          your_name: yourName,
          your_role: yourRole,
          your_phone: yourPhone,
          your_linkedin: yourLinkedin,
          delay_seconds: 20,
          daily_limit: 450,
        }),
      });
      setCampaignId(data.id);
      setStatus(data);
      setStep(5);
    } catch (e) { setError(e.message); } finally { setLoading(false); }
  };

  const goBack = () => { setError(""); setStep((s) => Math.max(0, s - 1)); };

  return (
    <>
      <GlobalStyle />
      <Page>
        <Pitch>
          <Eyebrow>Outreach, sent properly</Eyebrow>
          <Headline>Put your resume in the right inbox, on autopilot.</Headline>
          <Sub>
            One form, five steps, your own inbox doing the sending. No credentials
            stored, no mailing list sold — just your resume, your words, your pace.
          </Sub>
          <Sequence>
            {SEQUENCE.map((s, i) => (
              <SeqItem key={s.label} $n={i + 1} $active={step === i} $done={step > i || step === 5}>
                <SeqLabel>{s.label}</SeqLabel>
                <SeqDesc>{s.desc}</SeqDesc>
              </SeqItem>
            ))}
          </Sequence>
        </Pitch>

        <CardWrap>
          <StampBadge $franked={step === 5 && status?.status === "completed"}>
            {step === 5 ? <Send size={18} /> : <Mail size={18} />}
          </StampBadge>

          <Card>
            {step === 0 && (
              <>
                <StepTag>Step 1 / 5</StepTag>
                <StepTitle>Register</StepTitle>
                <Field>
                  <Label>Your email</Label>
                  <Input type="email" placeholder="you@example.com" value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                </Field>
                {error && <ErrorText>{error}</ErrorText>}
                <Buttons>
                  <span />
                  <PrimaryBtn onClick={handleRegister} disabled={loading || !email}>
                    {loading ? <Spinner size={16} /> : <KeyRound size={16} />}
                    Get API key
                  </PrimaryBtn>
                </Buttons>
              </>
            )}

            {step === 1 && (
              <>
                <StepTag>Step 2 / 5</StepTag>
                <StepTitle>Write the letter</StepTitle>
                <KeyBox style={{ marginBottom: "1rem" }}>API key: {apiKey}</KeyBox>
                <Field>
                  <Label>Subject line</Label>
                  <Input value={subject} onChange={(e) => setSubject(e.target.value)} />
                </Field>
                <Field>
                  <Label>Message ({"{hr_name} {company} {role} {your_name} {your_phone} {your_linkedin}"})</Label>
                  <TextArea value={body} onChange={(e) => setBody(e.target.value)} />
                </Field>
                {error && <ErrorText>{error}</ErrorText>}
                <Buttons>
                  <GhostBtn onClick={goBack}><ArrowLeft size={14} /> Back</GhostBtn>
                  <PrimaryBtn onClick={handleTemplate} disabled={loading}>
                    {loading ? <Spinner size={16} /> : <ArrowRight size={16} />}
                    Save template
                  </PrimaryBtn>
                </Buttons>
              </>
            )}

            {step === 2 && (
              <>
                <StepTag>Step 3 / 5</StepTag>
                <StepTitle>Attach resume</StepTitle>
                <Field>
                  <Label>Resume (PDF)</Label>
                  <FileDrop>
                    <FileText size={18} />
                    {resumeFile ? resumeFile.name : "Choose a PDF file"}
                    <input type="file" accept="application/pdf"
                      onChange={(e) => setResumeFile(e.target.files[0])} />
                  </FileDrop>
                </Field>
                {error && <ErrorText>{error}</ErrorText>}
                <Buttons>
                  <GhostBtn onClick={goBack}><ArrowLeft size={14} /> Back</GhostBtn>
                  <PrimaryBtn onClick={handleResume} disabled={loading}>
                    {loading ? <Spinner size={16} /> : <ArrowRight size={16} />}
                    Upload resume
                  </PrimaryBtn>
                </Buttons>
              </>
            )}

            {step === 3 && (
              <>
                <StepTag>Step 4 / 5</StepTag>
                <StepTitle>Add recipients</StepTitle>
                <Field>
                  <Label>Contacts (CSV: name, email, company)</Label>
                  <FileDrop>
                    <Users size={18} />
                    {contactsFile ? contactsFile.name : "Choose a CSV file"}
                    <input type="file" accept=".csv"
                      onChange={(e) => setContactsFile(e.target.files[0])} />
                  </FileDrop>
                </Field>
                {error && <ErrorText>{error}</ErrorText>}
                <Buttons>
                  <GhostBtn onClick={goBack}><ArrowLeft size={14} /> Back</GhostBtn>
                  <PrimaryBtn onClick={handleContacts} disabled={loading}>
                    {loading ? <Spinner size={16} /> : <ArrowRight size={16} />}
                    Upload contacts
                  </PrimaryBtn>
                </Buttons>
              </>
            )}

            {step === 4 && (
              <>
                <StepTag>Step 5 / 5</StepTag>
                <StepTitle>Launch</StepTitle>
                {contactsCount != null && (
                  <KeyBox style={{ marginBottom: "1rem" }}>
                    {contactsCount} recipient{contactsCount === 1 ? "" : "s"} loaded
                  </KeyBox>
                )}
                <Row>
                  <Field>
                    <Label>SMTP host</Label>
                    <Input value={smtpHost} onChange={(e) => setSmtpHost(e.target.value)} />
                  </Field>
                  <Field>
                    <Label>Port</Label>
                    <Input type="number" value={smtpPort} onChange={(e) => setSmtpPort(e.target.value)} />
                  </Field>
                </Row>
                <Field>
                  <Label>SMTP username (your email)</Label>
                  <Input value={smtpUser} onChange={(e) => setSmtpUser(e.target.value)} />
                </Field>
                <Field>
                  <Label>App password</Label>
                  <Input type="password" value={smtpPass} onChange={(e) => setSmtpPass(e.target.value)} />
                </Field>
                <Row>
                  <Field>
                    <Label>Your name</Label>
                    <Input value={yourName} onChange={(e) => setYourName(e.target.value)} />
                  </Field>
                  <Field>
                    <Label>Target role</Label>
                    <Input value={yourRole} onChange={(e) => setYourRole(e.target.value)} />
                  </Field>
                </Row>
                <Row>
                  <Field>
                    <Label>Phone</Label>
                    <Input value={yourPhone} onChange={(e) => setYourPhone(e.target.value)} />
                  </Field>
                  <Field>
                    <Label>LinkedIn</Label>
                    <Input value={yourLinkedin} onChange={(e) => setYourLinkedin(e.target.value)} />
                  </Field>
                </Row>
                {error && <ErrorText>{error}</ErrorText>}
                <Buttons>
                  <GhostBtn onClick={goBack}><ArrowLeft size={14} /> Back</GhostBtn>
                  <PrimaryBtn onClick={handleLaunch} disabled={loading || !smtpUser || !smtpPass}>
                    {loading ? <Spinner size={16} /> : <Rocket size={16} />}
                    Launch campaign
                  </PrimaryBtn>
                </Buttons>
              </>
            )}

            {step === 5 && (
              <>
                <StepTag>In transit</StepTag>
                <StepTitle>
                  {status?.status === "completed" ? "Delivered" : "Sending…"}
                </StepTitle>
                <Sub style={{ marginBottom: "0.5rem" }}>
                  Tracking ID: <code>{campaignId?.slice(0, 8)}</code>
                </Sub>
                <Perforation />
                <Stub>
                  <StubRow><span>Status</span><span>{status?.status ?? "running"}</span></StubRow>
                  <StubRow $highlight={franked}><span>Sent</span><span>{status?.sent ?? 0}</span></StubRow>
                  <StubRow $highlight={stamp}><span>Failed</span><span>{status?.failed ?? 0}</span></StubRow>
                  <StubRow><span>Total</span><span>{status?.total ?? 0}</span></StubRow>
                </Stub>
                {status?.status === "completed" && (
                  <Buttons>
                    <span />
                    <PrimaryBtn as="div" style={{ background: franked }}>
                      <CheckCircle2 size={16} /> Campaign complete
                    </PrimaryBtn>
                  </Buttons>
                )}
                {status?.last_error && <ErrorText>{status.last_error}</ErrorText>}
              </>
            )}
          </Card>
        </CardWrap>
      </Page>
    </>
  );
}