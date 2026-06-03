import { useState, useEffect, useRef } from "react";
import styled, { createGlobalStyle, keyframes, css } from "styled-components";

/* ═══════════════════════════════════════════
   GLOBAL STYLES & CSS RESET
═══════════════════════════════════════════ */
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=Montserrat:wght@700;800;900&display=swap');
  
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; font-size: 16px; }
  body {
    font-family: 'Poppins', sans-serif;
    color: #1e293b;
    background: #ffffff;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }
  a { text-decoration: none; color: inherit; }
  ul, ol { list-style: none; }
  button { font-family: inherit; }
  input, textarea, select { font-family: inherit; outline: none; }
  img { max-width: 100%; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #f1f5f9; }
  ::-webkit-scrollbar-thumb { background: #1a2b5e; border-radius: 3px; }
`;

/* ═══════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════ */
const T = {
  navy:     "#1a2b5e",
  navyDark: "#0f1e4a",
  navyMid:  "#1e3a8a",
  orange:   "#f97316",
  orangeDk: "#ea580c",
  green:    "#16a34a",
  sky:      "#e8f4fd",
  skyLight: "#f0f8ff",
  white:    "#ffffff",
  text:     "#1e293b",
  muted:    "#64748b",
  light:    "#94a3b8",
  border:   "#e2e8f0",
  star:     "#f59e0b",
  error:    "#ef4444",
  success:  "#16a34a",
  shadow:   "0 4px 24px rgba(0,0,0,.08)",
  shadowLg: "0 12px 48px rgba(0,0,0,.14)",
};

/* ═══════════════════════════════════════════
   KEYFRAMES
═══════════════════════════════════════════ */
const fadeUp    = keyframes`from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}`;
const fadeLeft  = keyframes`from{opacity:0;transform:translateX(-36px)}to{opacity:1;transform:translateX(0)}`;
const fadeRight = keyframes`from{opacity:0;transform:translateX(36px)}to{opacity:1;transform:translateX(0)}`;
const floatAnim = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}`;
const pulse     = keyframes`0%,100%{transform:scale(1);box-shadow:0 0 0 0 rgba(37,211,102,.4)}70%{transform:scale(1.02);box-shadow:0 0 0 10px rgba(37,211,102,0)}`;
const shimmer   = keyframes`0%{background-position:-200% center}100%{background-position:200% center}`;
const spin      = keyframes`from{transform:rotate(0deg)}to{transform:rotate(360deg)}`;
const popIn     = keyframes`0%{opacity:0;transform:scale(.85)}100%{opacity:1;transform:scale(1)}`;

const animated = (name, dur="0.7s", delay="0s", fill="both") => css`
  animation: ${name} ${dur} ease ${delay} ${fill};
`;

/* ═══════════════════════════════════════════
   SVG ICON COMPONENTS
═══════════════════════════════════════════ */
const Icons = {
  Phone:    (p) => <svg {...p} width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C9.6 21 3 14.4 3 6c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/></svg>,
  Phone2:   (p) => <svg {...p} width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C9.6 21 3 14.4 3 6c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/></svg>,
  Mail:     (p) => <svg {...p} width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z"/><polyline points="22,4 12,13 2,4"/></svg>,
  MapPin:   (p) => <svg {...p} width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3" fill="white"/></svg>,
  Car:      (p) => <svg {...p} width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor"><path d="M5 17H3v-5.7L5.9 6H18l3 5.3V17h-2m-9 1a2 2 0 01-2-2 2 2 0 012-2 2 2 0 012 2 2 2 0 01-2 2m10-4a2 2 0 01-2 2 2 2 0 01-2-2 2 2 0 012-2 2 2 0 012 2M5.9 7l-2 4h16.2L18 7H5.9z"/></svg>,
  Taxi:     (p) => <svg {...p} width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor"><path d="M17 16a2 2 0 11-4 0 2 2 0 014 0M7 16a2 2 0 11-4 0 2 2 0 014 0M3 11h18l-2-6H5L3 11zm0 0v5h18v-5"/><rect x="8" y="2" width="8" height="3" rx="1"/></svg>,
  Plane:    (p) => <svg {...p} width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor"><path d="M21 16v-2l-8-5V3.5c0-.8-.7-1.5-1.5-1.5S10 2.7 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/></svg>,
  Building: (p) => <svg {...p} width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor"><path d="M3 21h18M3 7l9-4 9 4v14H3V7zm4 7h2v7H7v-7zm4-4h2v11h-2V10zm4 4h2v7h-2v-7z"/></svg>,
  Calendar: (p) => <svg {...p} width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6" stroke="white" strokeWidth="2"/><line x1="8" y1="2" x2="8" y2="6" stroke="white" strokeWidth="2"/><line x1="3" y1="10" x2="21" y2="10" stroke="white" strokeWidth="2"/></svg>,
  Shield:   (p) => <svg {...p} width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Clock:    (p) => <svg {...p} width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Rupee:    (p) => <svg {...p} width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor"><path d="M6 3h12M6 8h12M15 21L9 8"/><path d="M6 13h5a4 4 0 000-8"/></svg>,
  Check:    (p) => <svg {...p} width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>,
  Arrow:    (p) => <svg {...p} width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
  ArrowRight:(p)=> <svg {...p} width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
  WA:       (p) => <svg {...p} width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.2-.8.9-.9 1.1-.2.2-.3.2-.6.1a7.9 7.9 0 01-2.3-1.4 7 7 0 01-1.6-2c-.2-.3 0-.5.1-.6l.5-.6.3-.5.1-.5-.9-2.1c-.2-.5-.5-.5-.6-.5h-.5c-.2 0-.5.1-.7.3C8.2 7.2 7 8.2 7 9.8c0 1.7 1.3 3.4 1.4 3.5.2.2 2.5 3.9 6 5.3 3.6 1.5 3.6 1 4.2 1 .7 0 2.1-.8 2.4-1.7.3-.8.3-1.5.2-1.7-.1-.2-.4-.3-.7-.4z"/><path d="M12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.5A10 10 0 1012 2z"/></svg>,
  Menu:     (p) => <svg {...p} width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  Close:    (p) => <svg {...p} width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  FB:       (p) => <svg {...p} width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>,
  IG:       (p) => <svg {...p} width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>,
  Star:     (p) => <svg {...p} width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  User:     (p) => <svg {...p} width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Send:     (p) => <svg {...p} width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4z"/></svg>,
  Time:     (p) => <svg {...p} width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  CheckCircle:(p)=> <svg {...p} width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01" stroke="white" strokeWidth="2" fill="none"/></svg>,
};

/* ═══════════════════════════════════════════
   LAYOUT PRIMITIVES
═══════════════════════════════════════════ */
const Container = styled.div`
  width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 5%;
`;
const Section = styled.section`
  padding: ${({py}) => py || "80px"} 5%;
  background: ${({bg}) => bg || "transparent"};
  position: relative; overflow: hidden;
`;
const SectionLabel = styled.p`
  font-size: .72rem; font-weight: 700; letter-spacing: 3px;
  text-transform: uppercase; color: ${T.orange};
  text-align: ${({align}) => align || "center"}; margin-bottom: 10px;
`;
const SectionTitle = styled.h2`
  font-family: 'Montserrat', sans-serif; font-weight: 900;
  font-size: clamp(1.5rem, 3.5vw, 2.3rem);
  color: ${T.navy}; line-height: 1.2;
  text-align: ${({align}) => align || "center"};
  margin-bottom: 12px;
`;
const TitleRule = styled.div`
  display: flex; align-items: center; justify-content: ${({align}) => align === "left" ? "flex-start" : "center"};
  gap: 12px; margin-bottom: 50px;
  &::before, &::after {
    content: ''; flex: 0 0 45px; height: 2px;
    background: ${T.border}; display: ${({align}) => align === "left" ? "none" : "block"};
  }
`;
const PlaneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill={T.orange}>
    <path d="M21 16v-2l-8-5V3.5c0-.8-.7-1.5-1.5-1.5S10 2.7 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/>
  </svg>
);

/* ═══════════════════════════════════════════
   NAVBAR STYLES
═══════════════════════════════════════════ */
const NavBar = styled.nav`
  position: sticky; top: 0; z-index: 1000;
  background: ${T.white};
  box-shadow: 0 2px 20px rgba(0,0,0,.07);
  height: 74px; display: flex; align-items: center;
  padding: 0 5%;
  gap: 16px;
`;
const LogoBlock = styled.div`
  display: flex; flex-direction: column; cursor: pointer; flex-shrink: 0;
  .dv {
    font-family: 'Montserrat', sans-serif; font-size: 2.1rem; font-weight: 900; line-height: 1;
    .d { color: ${T.navy}; } .v { color: ${T.orange}; }
  }
  .sub { display: flex; flex-direction: column; }
  .travels  { font-size: .6rem; font-weight: 700; letter-spacing: 3.5px; color: ${T.navy}; text-transform: uppercase; }
  .tagline  { font-size: .46rem; color: ${T.muted}; letter-spacing: 1.5px; text-transform: uppercase; }
`;
const NavLinks = styled.ul`
  display: flex; gap: 6px; margin-left: auto;
  @media(max-width:960px){ display: none; }
  li a {
    font-size: .82rem; font-weight: 500; color: ${T.text}; padding: 6px 10px; border-radius: 6px;
    position: relative; transition: color .25s;
    &::after { content:''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
      width: 0; height: 2px; background: ${T.orange}; border-radius: 1px; transition: width .3s; }
    &:hover, &.active { color: ${T.orange}; }
    &:hover::after, &.active::after { width: calc(100% - 20px); }
  }
`;
const BookNowBtn = styled.button`
  background: ${T.navy}; color: #fff; border: none; border-radius: 28px;
  padding: 10px 22px; font-size: .82rem; font-weight: 600; cursor: pointer;
  display: flex; align-items: center; gap: 6px; flex-shrink: 0;
  transition: background .3s, transform .2s, box-shadow .3s;
  @media(max-width:960px){ margin-left: auto; }
  &:hover { background: ${T.orange}; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(249,115,22,.35); }
`;
const HamBtn = styled.button`
  display: none; background: none; border: 2px solid ${T.border}; border-radius: 8px;
  width: 40px; height: 40px; align-items: center; justify-content: center;
  cursor: pointer; color: ${T.navy}; font-size: 1.3rem; flex-shrink: 0;
  @media(max-width:960px){ display: flex; }
`;
const MobileDrawer = styled.div`
  display: none;
  @media(max-width:960px){
    display: ${({$open}) => $open ? "flex" : "none"};
    flex-direction: column; position: fixed; top: 74px; left: 0; right: 0;
    background: ${T.white}; z-index: 999; padding: 20px 5% 28px;
    box-shadow: 0 16px 40px rgba(0,0,0,.12);
    gap: 4px; border-top: 2px solid ${T.border};
    ${animated(popIn, ".25s")}
  }
  a {
    padding: 12px 16px; border-radius: 10px; font-size: .95rem; font-weight: 500;
    color: ${T.text}; transition: .2s;
    &:hover, &.active { background: ${T.sky}; color: ${T.orange}; }
  }
  hr { border: none; border-top: 1px solid ${T.border}; margin: 8px 0; }
`;

/* ═══════════════════════════════════════════
   HERO STYLES
═══════════════════════════════════════════ */
const HeroSection = styled.section`
  min-height: 520px; background: linear-gradient(160deg, ${T.skyLight} 0%, ${T.sky} 40%, #dbeafe 100%);
  display: grid; grid-template-columns: 1fr 1.05fr; align-items: center;
  padding: 60px 5% 0; gap: 32px; position: relative; overflow: hidden;
  &::before {
    content:''; position: absolute; top: -80px; right: -80px;
    width: 400px; height: 400px; border-radius: 50%;
    background: radial-gradient(circle, rgba(249,115,22,.06) 0%, transparent 70%);
    pointer-events: none;
  }
  @media(max-width:820px){
    grid-template-columns: 1fr; padding: 40px 5% 0; min-height: auto;
    .hero-right { order: -1; }
  }
`;
const HeroLeft = styled.div`${animated(fadeLeft, ".8s")}`;
const HeroTag = styled.div`
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(249,115,22,.1); color: ${T.orange};
  font-size: .72rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
  padding: 6px 14px; border-radius: 20px; margin-bottom: 16px; border: 1px solid rgba(249,115,22,.2);
`;
const HeroTitle = styled.h1`
  font-family: 'Montserrat', sans-serif; font-weight: 900; line-height: 1.08;
  font-size: clamp(2.2rem, 5vw, 3.6rem); margin-bottom: 20px;
  .line1 { display: block; color: ${T.navy}; }
  .line2 { display: block; color: ${T.orange};
    background: linear-gradient(90deg, ${T.orange}, #fb923c);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
`;
const HeroDesc = styled.p`
  font-size: clamp(.88rem, 1.5vw, 1rem); color: ${T.muted};
  line-height: 1.75; max-width: 440px; margin-bottom: 26px;
`;
const BadgesRow = styled.div`
  display: flex; gap: 18px; flex-wrap: wrap; margin-bottom: 32px;
`;
const BadgePill = styled.div`
  display: flex; align-items: center; gap: 7px;
  font-size: .78rem; font-weight: 600; color: ${T.navy};
  background: rgba(255,255,255,.85); border: 1px solid ${T.border};
  padding: 7px 14px; border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,.05);
  svg { color: ${T.orange}; font-size: 1rem; }
`;
const HeroCTARow = styled.div`
  display: flex; gap: 14px; flex-wrap: wrap;
`;
const BtnPrimary = styled.button`
  background: ${T.navy}; color: #fff; border: none; border-radius: 30px;
  padding: 13px 28px; font-size: .88rem; font-weight: 600; cursor: pointer;
  display: inline-flex; align-items: center; gap: 8px; transition: .3s;
  &:hover { background: ${T.orange}; transform: translateY(-3px); box-shadow: 0 8px 24px rgba(249,115,22,.35); }
`;
const BtnOutline = styled.button`
  background: transparent; color: ${T.navy}; border: 2px solid ${T.navy}; border-radius: 30px;
  padding: 11px 28px; font-size: .88rem; font-weight: 600; cursor: pointer;
  display: inline-flex; align-items: center; gap: 8px; transition: .3s;
  &:hover { background: ${T.navy}; color: #fff; transform: translateY(-3px); }
`;
const HeroRight = styled.div`
  display: flex; justify-content: center; align-items: flex-end;
  ${animated(fadeRight, ".9s", ".1s")}
  @media(max-width:820px){ max-height: 240px; overflow: hidden; }
`;
const FloatingCar = styled.div`
  width: 100%; max-width: 520px; position: relative;
  animation: ${floatAnim} 4s ease-in-out infinite;
  img { width: 100%; object-fit: contain; filter: drop-shadow(0 20px 30px rgba(0,0,0,.15)); }
  &::after {
    content: ''; position: absolute; bottom: -2px; left: 10%; right: 10%; height: 10px;
    background: linear-gradient(90deg, transparent, ${T.orange} 25%, #16a34a 75%, transparent);
    border-radius: 5px; opacity: .5; filter: blur(3px);
  }
`;

/* ═══════════════════════════════════════════
   CONTACT BAR STYLES
═══════════════════════════════════════════ */
const ContactBarWrap = styled.div`
  background: #fff; box-shadow: ${T.shadowLg}; border-radius: 16px;
  padding: 22px 32px; display: flex; align-items: center;
  justify-content: space-around; flex-wrap: wrap; gap: 20px;
  max-width: 1100px; margin: -22px auto 0; position: relative; z-index: 50;
  @media(max-width:860px){ margin: 0 3%; padding: 20px; }
  @media(max-width:580px){ flex-direction: column; align-items: flex-start; padding: 20px 18px; }
`;
const ContactChip = styled.div`
  display: flex; align-items: center; gap: 14px; flex: 1; min-width: 180px;
  .ic {
    width: 48px; height: 48px; border-radius: 50%; flex-shrink: 0;
    background: ${({icbg}) => icbg}; display: flex; align-items: center; justify-content: center;
    font-size: 1.2rem; color: #fff; box-shadow: 0 4px 12px ${({icbg}) => icbg}55;
  }
  .title  { font-size: .72rem; color: ${T.muted}; font-weight: 500; margin-bottom: 2px; }
  .value  { font-size: .9rem; font-weight: 700; color: ${({accent}) => accent || T.navy}; }
`;
const BarDivider = styled.div`
  width: 1px; height: 52px; background: ${T.border};
  @media(max-width:700px){ display: none; }
`;

/* ═══════════════════════════════════════════
   SERVICES STYLES
═══════════════════════════════════════════ */
const ServicesGrid = styled.div`
  display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px;
  @media(max-width:1024px){ grid-template-columns: repeat(3, 1fr); }
  @media(max-width:620px) { grid-template-columns: repeat(2, 1fr); }
  @media(max-width:380px) { grid-template-columns: 1fr; }
`;
const ServiceCard = styled.div`
  border: 1.5px solid ${T.border}; border-radius: 16px; padding: 30px 18px 24px;
  text-align: center; transition: .3s; cursor: pointer; background: #fff;
  ${animated(fadeUp, ".6s", props => props.$delay || "0s")}
  &:hover {
    border-color: ${T.orange}; transform: translateY(-8px);
    box-shadow: 0 16px 40px rgba(249,115,22,.1);
  }
  .icon-circle {
    width: 72px; height: 72px; border-radius: 50%; margin: 0 auto 18px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.9rem; background: ${({icbg}) => icbg + "18"}; color: ${({icbg}) => icbg};
    transition: .3s;
  }
  &:hover .icon-circle { background: ${({icbg}) => icbg}; color: #fff; transform: scale(1.08); }
  h3 {
    font-size: .8rem; font-weight: 700; color: ${T.navy}; margin-bottom: 10px;
    text-transform: uppercase; letter-spacing: .8px;
  }
  p { font-size: .76rem; color: ${T.muted}; line-height: 1.65; }
`;

/* ═══════════════════════════════════════════
   DESTINATIONS STYLES
═══════════════════════════════════════════ */
const DestGrid = styled.div`
  display: grid; grid-template-columns: repeat(5, 1fr); gap: 18px;
  @media(max-width:1024px){ grid-template-columns: repeat(3, 1fr); }
  @media(max-width:640px) { grid-template-columns: repeat(2, 1fr); }
  @media(max-width:360px) { grid-template-columns: 1fr; }
`;
const DestCard = styled.div`
  border-radius: 14px; overflow: hidden; cursor: pointer; position: relative;
  box-shadow: 0 4px 18px rgba(0,0,0,.09); transition: .3s;
  &:hover { transform: translateY(-7px); box-shadow: 0 16px 36px rgba(0,0,0,.18); }
  .img-wrap { overflow: hidden; height: 165px;
    img { width: 100%; height: 100%; object-fit: cover; transition: .45s; }
  }
  &:hover .img-wrap img { transform: scale(1.07); }
  .dest-name {
    background: #fff; padding: 11px 14px;
    display: flex; align-items: center; gap: 6px;
    font-size: .82rem; font-weight: 600; color: ${T.navy};
    svg { color: ${T.orange}; font-size: 1rem; }
  }
`;
const ViewAllWrap = styled.div`
  display: flex; justify-content: center; margin-top: 38px;
`;
const ViewAllBtn = styled.button`
  background: ${T.navy}; color: #fff; border: none; border-radius: 30px;
  padding: 13px 34px; font-size: .88rem; font-weight: 600; cursor: pointer;
  display: inline-flex; align-items: center; gap: 9px; transition: .3s;
  &:hover { background: ${T.orange}; transform: translateY(-3px); box-shadow: 0 8px 24px rgba(249,115,22,.3); }
`;

/* ═══════════════════════════════════════════
   WHY CHOOSE STYLES
═══════════════════════════════════════════ */
const WhyLayout = styled.div`
  display: grid; grid-template-columns: 380px 1fr; gap: 64px; align-items: center;
  @media(max-width:900px){ grid-template-columns: 1fr; gap: 36px; }
`;
const WhyImgWrap = styled.div`
  position: relative; border-radius: 20px; overflow: visible;
  ${animated(fadeLeft, ".8s")}
  img { width: 100%; border-radius: 20px; object-fit: cover; box-shadow: ${T.shadowLg}; }
  &::before {
    content: ''; position: absolute; inset: -12px; border-radius: 24px; z-index: -1;
    background: linear-gradient(135deg, ${T.navy}20 0%, ${T.orange}20 100%);
  }
  .badge {
    position: absolute; bottom: -14px; right: -14px;
    background: ${T.orange}; color: #fff; border-radius: 12px; padding: 12px 16px;
    box-shadow: 0 8px 24px rgba(249,115,22,.4); text-align: center;
    .num { font-family:'Montserrat',sans-serif; font-size: 1.8rem; font-weight: 900; line-height: 1; }
    .lbl { font-size: .65rem; font-weight: 600; letter-spacing: 1px; opacity: .9; }
  }
`;
const FeaturesGrid = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 22px; margin-top: 30px;
  @media(max-width:520px){ grid-template-columns: 1fr; }
`;
const FeatureBox = styled.div`
  display: flex; gap: 13px; ${animated(fadeUp, ".6s", props => props.$delay || "0s")}
  .check-ic { flex-shrink: 0; width: 24px; height: 24px; border-radius: 50%;
    background: ${T.green}; color: #fff; font-size: .85rem;
    display: flex; align-items: center; justify-content: center; margin-top: 1px; }
  h4 { font-size: .88rem; font-weight: 700; color: ${T.navy}; margin-bottom: 5px; }
  p  { font-size: .77rem; color: ${T.muted}; line-height: 1.6; }
`;

/* ═══════════════════════════════════════════
   CTA BANNER STYLES
═══════════════════════════════════════════ */
const CTABanner = styled.section`
  background: linear-gradient(135deg, ${T.navyDark} 0%, ${T.navyMid} 60%, #1e40af 100%);
  padding: 60px 5%; position: relative; overflow: hidden;
  &::before {
    content: ''; position: absolute; inset: 0;
    background: url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=50') center/cover;
    opacity: .08; pointer-events: none;
  }
`;
const CTAInner = styled.div`
  max-width: 1100px; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between;
  flex-wrap: wrap; gap: 28px; position: relative; z-index: 1;
`;
const CTAText = styled.div`
  h2 { font-family:'Montserrat',sans-serif; font-weight: 900; font-size: clamp(1.5rem,3vw,2.1rem); color: #fff; margin-bottom: 7px; }
  p  { color: rgba(255,255,255,.7); font-size: .9rem; }
`;
const CTAButtons = styled.div`
  display: flex; gap: 14px; flex-wrap: wrap;
`;
const WAButton = styled.button`
  background: #25D366; color: #fff; border: none; border-radius: 30px;
  padding: 14px 28px; font-size: .88rem; font-weight: 700; cursor: pointer;
  display: inline-flex; align-items: center; gap: 9px; transition: .3s;
  animation: ${pulse} 2.5s ease-in-out infinite;
  &:hover { background: #1ebe5d; transform: scale(1.04); animation: none; }
`;
const CallButton = styled.button`
  background: ${T.orange}; color: #fff; border: none; border-radius: 30px;
  padding: 14px 28px; font-size: .88rem; font-weight: 700; cursor: pointer;
  display: inline-flex; align-items: center; gap: 9px; transition: .3s;
  &:hover { background: ${T.orangeDk}; transform: scale(1.04); }
`;
const QRCard = styled.div`
  background: #fff; border-radius: 14px; padding: 16px 14px; text-align: center; flex-shrink: 0;
  .qr-svg { width: 80px; height: 80px; margin-bottom: 6px; }
  .qr-label { font-size: .6rem; font-weight: 700; color: ${T.navy}; letter-spacing: 1.2px; text-transform: uppercase; line-height: 1.4; }
`;

/* ═══════════════════════════════════════════
   TESTIMONIALS STYLES
═══════════════════════════════════════════ */
const TestiGrid = styled.div`
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px;
  @media(max-width:900px){ grid-template-columns: repeat(2,1fr); }
  @media(max-width:560px){ grid-template-columns: 1fr; }
`;
const TestiCard = styled.div`
  border: 1.5px solid ${T.border}; border-radius: 16px; padding: 28px; background: #fff;
  transition: .3s; ${animated(fadeUp, ".6s", props => props.$delay || "0s")}
  &:hover { box-shadow: 0 12px 36px rgba(0,0,0,.09); transform: translateY(-5px); border-color: ${T.orange}40; }
  .stars { display: flex; gap: 4px; color: ${T.star}; font-size: 1.05rem; margin-bottom: 16px; }
  .quote { font-size: .84rem; color: ${T.muted}; line-height: 1.75; margin-bottom: 18px; font-style: italic; }
  .reviewer { font-size: .84rem; font-weight: 700; color: ${T.navy}; }
`;

/* ═══════════════════════════════════════════
   FOOTER STYLES
═══════════════════════════════════════════ */
const FooterWrap = styled.footer`
  background: ${T.navy}; padding: 55px 5% 0;
`;
const FooterGrid = styled.div`
  display: grid; grid-template-columns: 1.5fr 1fr 1fr 1.4fr; gap: 44px; padding-bottom: 40px;
  @media(max-width:900px){ grid-template-columns: 1fr 1fr; gap: 32px; }
  @media(max-width:500px){ grid-template-columns: 1fr; gap: 28px; }
`;
const FooterLogo = styled.div`
  .dv { font-family:'Montserrat',sans-serif; font-size: 2.2rem; font-weight: 900; line-height:1;
    .d{color:#fff;} .v{color:${T.orange};} }
  .travels { font-size:.58rem; font-weight:700; letter-spacing:3.5px; color:rgba(255,255,255,.5); text-transform:uppercase; }
  .desc { font-size:.8rem; color:rgba(255,255,255,.55); line-height:1.75; margin:14px 0 18px; max-width:220px; }
`;
const FooterSocials = styled.div`
  display: flex; gap: 10px;
  a { width:36px; height:36px; border-radius:50%; border:1px solid rgba(255,255,255,.2);
    display:flex; align-items:center; justify-content:center; font-size:.9rem; color:rgba(255,255,255,.65);
    cursor:pointer; transition:.3s; text-decoration:none;
    &:hover { background:${T.orange}; border-color:${T.orange}; color:#fff; } }
`;
const FooterCol = styled.div`
  h4 { font-size:.82rem; font-weight:700; color:#fff; text-transform:uppercase; letter-spacing:1.5px; margin-bottom:22px; }
  li, a { display:block; font-size:.8rem; color:rgba(255,255,255,.58); margin-bottom:11px; cursor:pointer; transition:.25s;
    &:hover { color:${T.orange}; padding-left:5px; } }
  .contact-row { display:flex; gap:10px; margin-bottom:13px; align-items:flex-start;
    svg { color:${T.orange}; font-size:1rem; flex-shrink:0; margin-top:2px; }
    span { font-size:.79rem; color:rgba(255,255,255,.58); } }
`;
const FooterBottom = styled.div`
  border-top:1px solid rgba(255,255,255,.08); padding:20px 0;
  display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;
  span { font-size:.75rem; color:rgba(255,255,255,.38); }
`;

/* ═══════════════════════════════════════════
   CONTACT PAGE STYLES
═══════════════════════════════════════════ */
const ContactHero = styled.section`
  background: linear-gradient(135deg, ${T.navyDark} 0%, ${T.navyMid} 100%);
  padding: 80px 5% 90px; text-align: center; position: relative; overflow: hidden;
  &::after {
    content: ''; position: absolute; bottom: -2px; left: 0; right: 0; height: 60px;
    background: #f8fafc; clip-path: ellipse(55% 100% at 50% 100%);
  }
  h1 { font-family:'Montserrat',sans-serif; font-size:clamp(2rem,4vw,2.8rem); font-weight:900; color:#fff; margin-bottom:14px; }
  p  { color:rgba(255,255,255,.7); font-size:1rem; max-width:460px; margin:0 auto; }
`;
const ContactBreadcrumb = styled.div`
  display:flex; align-items:center; justify-content:center; gap:10px; margin-bottom:20px;
  font-size:.8rem; color:rgba(255,255,255,.55);
  span.sep { color:${T.orange}; }
  span.active { color:${T.orange}; font-weight:600; }
  span.link { cursor:pointer; &:hover { color:#fff; } }
`;
const ContactCardsRow = styled.div`
  display:grid; grid-template-columns:repeat(4,1fr); gap:20px;
  max-width:1100px; margin:0 auto; padding:0 5%;
  transform:translateY(-40px);
  @media(max-width:900px){ grid-template-columns:repeat(2,1fr); }
  @media(max-width:480px){ grid-template-columns:1fr; }
`;
const InfoCard = styled.div`
  background:#fff; border-radius:16px; padding:28px 20px; text-align:center;
  box-shadow:${T.shadowLg}; transition:.3s; cursor:pointer;
  ${animated(fadeUp, ".6s", props => props.$delay || "0s")}
  &:hover { transform:translateY(-6px); box-shadow:0 20px 50px rgba(0,0,0,.12); }
  .ic { width:60px; height:60px; border-radius:50%; margin:0 auto 16px;
    display:flex; align-items:center; justify-content:center; font-size:1.5rem;
    background:${({icbg}) => icbg+"15"}; color:${({icbg}) => icbg}; }
  h3 { font-size:.88rem; font-weight:700; color:${T.navy}; margin-bottom:7px; }
  p  { font-size:.8rem; color:${T.muted}; line-height:1.6; }
  a  { color:${({icbg}) => icbg}; font-weight:600; font-size:.85rem; &:hover{text-decoration:underline;} }
`;
const ContactMain = styled.div`
  display:grid; grid-template-columns:1fr 1.1fr; gap:40px;
  max-width:1100px; margin:0 auto; padding:0 5% 80px;
  @media(max-width:820px){ grid-template-columns:1fr; }
`;
const ContactFormCard = styled.div`
  background:#fff; border-radius:20px; padding:40px 36px;
  box-shadow:${T.shadow}; border:1.5px solid ${T.border};
  ${animated(fadeLeft, ".7s")}
  h2 { font-family:'Montserrat',sans-serif; font-weight:900; font-size:1.5rem; color:${T.navy}; margin-bottom:6px; }
  p  { font-size:.82rem; color:${T.muted}; margin-bottom:28px; }
`;
const FormRow = styled.div`
  display:grid; grid-template-columns:${({cols}) => cols || "1fr"}; gap:16px; margin-bottom:16px;
  @media(max-width:500px){ grid-template-columns:1fr; }
`;
const FormGroup = styled.div`
  label { display:block; font-size:.77rem; font-weight:600; color:${T.navy}; margin-bottom:7px; letter-spacing:.3px; }
`;
const Input = styled.input`
  width:100%; padding:12px 16px; border:1.5px solid ${({error}) => error ? T.error : T.border};
  border-radius:10px; font-size:.88rem; color:${T.text}; background:#fafafa;
  transition:.25s;
  &:focus { border-color:${T.navy}; background:#fff; box-shadow:0 0 0 3px ${T.navy}15; }
  &::placeholder { color:${T.light}; }
`;
const Textarea = styled.textarea`
  width:100%; padding:12px 16px; border:1.5px solid ${({error}) => error ? T.error : T.border};
  border-radius:10px; font-size:.88rem; color:${T.text}; background:#fafafa;
  resize:vertical; min-height:120px; line-height:1.6; transition:.25s;
  &:focus { border-color:${T.navy}; background:#fff; box-shadow:0 0 0 3px ${T.navy}15; }
  &::placeholder { color:${T.light}; }
`;
const Select = styled.select`
  width:100%; padding:12px 16px; border:1.5px solid ${T.border};
  border-radius:10px; font-size:.88rem; color:${T.text}; background:#fafafa;
  transition:.25s; appearance:none; cursor:pointer;
  &:focus { border-color:${T.navy}; background:#fff; box-shadow:0 0 0 3px ${T.navy}15; }
`;
const SubmitBtn = styled.button`
  width:100%; background:${T.navy}; color:#fff; border:none; border-radius:12px;
  padding:15px; font-size:.95rem; font-weight:700; cursor:pointer; margin-top:6px;
  display:flex; align-items:center; justify-content:center; gap:9px; transition:.3s;
  &:hover { background:${T.orange}; box-shadow:0 8px 24px rgba(249,115,22,.35); transform:translateY(-2px); }
  &:disabled { opacity:.6; cursor:not-allowed; transform:none; }
`;
const SuccessBanner = styled.div`
  background:linear-gradient(135deg, #dcfce7, #bbf7d0); border:1.5px solid #86efac;
  border-radius:12px; padding:20px; text-align:center; margin-top:20px;
  ${animated(popIn, ".4s")}
  h3 { color:${T.green}; font-weight:700; margin-bottom:6px; font-size:1rem; }
  p  { color:#166534; font-size:.84rem; }
`;
const ErrorMsg = styled.span`
  color:${T.error}; font-size:.72rem; margin-top:4px; display:block;
`;
const MapCard = styled.div`
  border-radius:20px; overflow:hidden; box-shadow:${T.shadowLg};
  ${animated(fadeRight, ".7s")}
  iframe { width:100%; height:320px; border:none; display:block; }
`;
const BranchesCard = styled.div`
  background:#fff; border-radius:16px; padding:28px; margin-top:20px;
  box-shadow:${T.shadow}; border:1.5px solid ${T.border};
  h3 { font-family:'Montserrat',sans-serif; font-weight:800; font-size:1.1rem; color:${T.navy}; margin-bottom:20px; }
`;
const BranchItem = styled.div`
  display:flex; gap:14px; padding:14px 0; border-bottom:1px solid ${T.border};
  &:last-child { border-bottom:none; padding-bottom:0; }
  .ic { width:42px; height:42px; border-radius:10px; background:${T.navy}15; color:${T.navy};
    display:flex; align-items:center; justify-content:center; font-size:1.1rem; flex-shrink:0; }
  h4 { font-size:.85rem; font-weight:700; color:${T.navy}; margin-bottom:3px; }
  p  { font-size:.76rem; color:${T.muted}; }
`;
const HoursCard = styled.div`
  background:linear-gradient(135deg, ${T.navy}, ${T.navyMid}); border-radius:16px; padding:24px 28px; margin-top:20px;
  h3 { font-family:'Montserrat',sans-serif; font-weight:800; color:#fff; margin-bottom:16px; font-size:1rem; }
`;
const HourRow = styled.div`
  display:flex; justify-content:space-between; align-items:center;
  padding:8px 0; border-bottom:1px solid rgba(255,255,255,.1);
  &:last-child { border-bottom:none; }
  .day  { font-size:.8rem; color:rgba(255,255,255,.7); }
  .time { font-size:.8rem; font-weight:600; color:${({open}) => open ? "#4ade80" : "rgba(255,255,255,.4)"}; }
`;
const FAQSection = styled.div`
  max-width:820px; margin:0 auto; padding:0 5% 80px;
`;
const FAQTitle = styled.h2`
  font-family:'Montserrat',sans-serif; font-weight:900; font-size:clamp(1.4rem,2.5vw,1.9rem);
  color:${T.navy}; text-align:center; margin-bottom:8px;
`;
const FAQItem = styled.div`
  border:1.5px solid ${({$open}) => $open ? T.navy : T.border}; border-radius:12px; margin-bottom:12px;
  overflow:hidden; transition:.3s; background:#fff;
  &:hover { border-color:${T.navy}40; }
`;
const FAQQuestion = styled.button`
  width:100%; display:flex; justify-content:space-between; align-items:center;
  padding:18px 22px; background:none; border:none; cursor:pointer; text-align:left; gap:12px;
  span { font-size:.9rem; font-weight:600; color:${T.navy}; }
  .chevron { font-size:1.2rem; color:${T.orange}; flex-shrink:0; transition:transform .3s;
    transform:${({$open}) => $open ? "rotate(180deg)" : "rotate(0deg)"}; }
`;
const FAQAnswer = styled.div`
  padding:${({$open}) => $open ? "0 22px 18px" : "0 22px"};
  max-height:${({$open}) => $open ? "300px" : "0"};
  overflow:hidden; transition:all .3s ease;
  font-size:.84rem; color:${T.muted}; line-height:1.75;
`;

/* ═══════════════════════════════════════════
   DATA
═══════════════════════════════════════════ */
const NAVLINKS = ["Home","Our Services","Destinations","Gallery","Contact Us"];
const SERVICES_DATA = [
  { icon:<Icons.Car/>,      icbg:"#1e3a8a", label:"Tour Packages",    desc:"Customized tour packages for family, friends and corporate groups." },
  { icon:<Icons.Taxi/>,     icbg:"#c2410c", label:"Outstation Cabs",  desc:"Comfortable and affordable outstation cabs for all your travel needs." },
  { icon:<Icons.Plane/>,    icbg:"#15803d", label:"Airport Transfer",  desc:"Timely airport pickup and drop with professional service." },
  { icon:<Icons.Building/>, icbg:"#7c3aed", label:"Corporate Travel",  desc:"Reliable corporate travel solutions for businesses and professionals." },
  { icon:<Icons.Calendar/>, icbg:"#0e7490", label:"Events & Bookings", desc:"Car rentals for events, weddings, meetings and more." },
];
const DESTS = [
  { name:"Manali",  img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80" },
  { name:"Udaipur", img:"https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=500&q=80" },
  { name:"Goa",     img:"https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&q=80" },
  { name:"Shimla",  img:"https://images.unsplash.com/photo-1626015365107-019e04f2a8db?w=500&q=80" },
  { name:"Delhi",   img:"https://images.unsplash.com/photo-1587474260584-136574528ed5?w=500&q=80" },
];
const WHY_FEATURES = [
  { title:"Well Maintained Cars",   desc:"Clean, sanitized and well-maintained cars for a comfortable journey." },
  { title:"On-Time Service",        desc:"Punctual and reliable service for your peace of mind." },
  { title:"Experienced Drivers",    desc:"Professional and experienced drivers ensuring your safety." },
  { title:"Transparent Pricing",    desc:"No hidden charges. 100% transparent pricing policy." },
];
const TESTIMONIALS = [
  { text:'"Very punctual and professional service. Driver was polite and the car was in excellent condition."', reviewer:"Rahul Sharma" },
  { text:'"We booked an outstation trip and had a wonderful experience with DV Travels. Highly recommended!!"', reviewer:"Priya Mehta" },
  { text:'"Best taxi service in Indore. On-time pickup and drop at a very affordable price."', reviewer:"Amit Verma" },
];
const FAQS = [
  { q:"How do I book a cab with DV Travels?", a:"You can book a cab by calling us at +91 6265370030, sending a WhatsApp message, or emailing us. We'll confirm your booking immediately." },
  { q:"What areas do you serve?", a:"We primarily serve Indore and all major cities in Madhya Pradesh. We also offer outstation trips across India." },
  { q:"Do you offer airport pickup and drop?", a:"Yes, we provide timely airport pickup and drop services at all major airports. Our drivers track your flight to ensure punctuality." },
  { q:"Are your cabs available 24/7?", a:"Yes, our services are available 24 hours a day, 7 days a week. You can reach us anytime for emergency or pre-planned travel." },
  { q:"What are your pricing options?", a:"We offer transparent, competitive pricing with no hidden charges. Rates are based on distance, vehicle type, and trip duration. Contact us for a quote." },
];

/* ═══════════════════════════════════════════
   QR CODE SVG (decorative)
═══════════════════════════════════════════ */
const QRCodeSVG = () => (
  <svg className="qr-svg" viewBox="0 0 100 100" fill="none">
    {/* Corner squares */}
    <rect x="5" y="5" width="30" height="30" fill={T.navy} rx="3"/>
    <rect x="9" y="9" width="22" height="22" fill="white" rx="2"/>
    <rect x="13" y="13" width="14" height="14" fill={T.navy} rx="1"/>
    <rect x="65" y="5" width="30" height="30" fill={T.navy} rx="3"/>
    <rect x="69" y="9" width="22" height="22" fill="white" rx="2"/>
    <rect x="73" y="13" width="14" height="14" fill={T.navy} rx="1"/>
    <rect x="5" y="65" width="30" height="30" fill={T.navy} rx="3"/>
    <rect x="9" y="69" width="22" height="22" fill="white" rx="2"/>
    <rect x="13" y="73" width="14" height="14" fill={T.navy} rx="1"/>
    {/* Data dots */}
    {[40,50,60,70].map(x=>[40,45,55,65,70,80].map(y=>(
      Math.sin(x*y)>0 && <rect key={`${x}${y}`} x={x} y={y} width="6" height="6" fill={T.navy} rx="1"/>
    )))}
    <rect x="42" y="42" width="16" height="6" fill={T.orange} rx="1"/>
  </svg>
);

/* ═══════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════ */
function HomePage({ onNavigate }) {
  return (
    <>
      {/* HERO */}
      <HeroSection>
        <HeroLeft>
          <HeroTag>🚗 Your Trusted Travel Partner</HeroTag>
          <HeroTitle>
            <span className="line1">SAFE JOURNEY,</span>
            <span className="line2">HAPPY MEMORIES</span>
          </HeroTitle>
          <HeroDesc>
            DV Travels is your trusted travel partner for local &amp; outstation trips, airport
            transfers, tours and corporate travel.
          </HeroDesc>
          <BadgesRow>
            <BadgePill><Icons.Shield style={{fontSize:"1rem"}}/> Safe &amp; Reliable</BadgePill>
            <BadgePill><Icons.Clock style={{fontSize:"1rem"}}/> 24/7 Support</BadgePill>
            <BadgePill><Icons.Rupee style={{fontSize:"1rem"}}/> Best Prices</BadgePill>
          </BadgesRow>
          <HeroCTARow>
            <BtnPrimary>✉&nbsp; Our Services</BtnPrimary>
            <BtnOutline onClick={() => onNavigate("Contact Us")}>
              <Icons.Phone style={{fontSize:"1rem"}}/> Contact Us
            </BtnOutline>
          </HeroCTARow>
        </HeroLeft>
        <HeroRight className="hero-right">
          <FloatingCar>
            <img
              src="https://images.unsplash.com/photo-1617654112368-307921291f42?w=700&q=80"
              alt="DV Travels Car"
              onError={e=>{ e.target.src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80"; }}
            />
          </FloatingCar>
        </HeroRight>
      </HeroSection>

      {/* CONTACT BAR */}
      <div style={{padding:"0 5%"}}>
        <ContactBarWrap>
          <ContactChip icbg={T.navyMid} accent={T.navyMid}>
            <div className="ic"><Icons.Phone/></div>
            <div><div className="title">Call Dheeraj Pal</div><div className="value">+91 6265370030</div></div>
          </ContactChip>
          <BarDivider/>
          <ContactChip icbg={T.green} accent={T.green}>
            <div className="ic" style={{background:T.green}}><Icons.Phone2/></div>
            <div><div className="title">Call Neeraj Pal</div><div className="value">+91 7879572717</div></div>
          </ContactChip>
          <BarDivider/>
          <ContactChip icbg={T.orange} accent={T.orange}>
            <div className="ic" style={{background:T.orange}}><Icons.Mail/></div>
            <div><div className="title">Email Us</div><div className="value" style={{fontSize:".82rem"}}>paldheeraj8865@gmail.com</div></div>
          </ContactChip>
          <BarDivider/>
          <ContactChip icbg="#dc2626" accent={T.text}>
            <div className="ic" style={{background:"#dc2626"}}><Icons.MapPin/></div>
            <div><div className="title">Our Location</div><div className="value" style={{fontSize:".82rem",color:T.text}}>27 Prince Nagar, Indore M.P.</div></div>
          </ContactChip>
        </ContactBarWrap>
      </div>

      {/* SERVICES */}
      <Section py="80px">
        <SectionLabel>OUR SERVICES</SectionLabel>
        <SectionTitle>Comfortable Rides, Unforgettable Journeys</SectionTitle>
        <TitleRule><PlaneIcon/></TitleRule>
        <ServicesGrid>
          {SERVICES_DATA.map((s,i) => (
            <ServiceCard key={s.label} icbg={s.icbg} $delay={`${i*.1}s`}>
              <div className="icon-circle">{s.icon}</div>
              <h3>{s.label}</h3>
              <p>{s.desc}</p>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </Section>

      {/* DESTINATIONS */}
      <Section py="80px" bg={T.sky}>
        <SectionLabel>POPULAR DESTINATIONS</SectionLabel>
        <SectionTitle>Explore Amazing Places</SectionTitle>
        <TitleRule><PlaneIcon/></TitleRule>
        <DestGrid>
          {DESTS.map(d => (
            <DestCard key={d.name}>
              <div className="img-wrap"><img src={d.img} alt={d.name}/></div>
              <div className="dest-name"><Icons.MapPin/> {d.name}</div>
            </DestCard>
          ))}
        </DestGrid>
        <ViewAllWrap>
          <ViewAllBtn><Icons.Arrow/> View All Destinations</ViewAllBtn>
        </ViewAllWrap>
      </Section>

      {/* WHY CHOOSE */}
      <Section py="80px">
        <WhyLayout>
          <WhyImgWrap>
            <img
              src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80"
              alt="Professional Driver"
            />
            <div className="badge">
              <div className="num">500+</div>
              <div className="lbl">HAPPY<br/>CLIENTS</div>
            </div>
          </WhyImgWrap>
          <div>
            <SectionLabel align="left">WHY CHOOSE DV TRAVELS</SectionLabel>
            <SectionTitle align="left">Your Safety, Our Priority</SectionTitle>
            <TitleRule align="left"><PlaneIcon/></TitleRule>
            <FeaturesGrid>
              {WHY_FEATURES.map((f,i) => (
                <FeatureBox key={f.title} $delay={`${i*.12}s`}>
                  <div className="check-ic"><Icons.Check/></div>
                  <div><h4>{f.title}</h4><p>{f.desc}</p></div>
                </FeatureBox>
              ))}
            </FeaturesGrid>
          </div>
        </WhyLayout>
      </Section>

      {/* CTA BANNER */}
      <CTABanner>
        <CTAInner>
          <CTAText>
            <h2>Ready to Book Your Ride?</h2>
            <p>Call us now or send us a message on WhatsApp.</p>
          </CTAText>
          <CTAButtons>
            <WAButton><Icons.WA/> WhatsApp Us</WAButton>
            <CallButton><Icons.Phone2/> Call Us Now</CallButton>
          </CTAButtons>
          <QRCard>
            <QRCodeSVG/>
            <div className="qr-label">SCAN TO<br/>WHATSAPP</div>
          </QRCard>
        </CTAInner>
      </CTABanner>

      {/* TESTIMONIALS */}
      <Section py="80px">
        <SectionLabel>WHAT OUR CLIENTS SAY</SectionLabel>
        <SectionTitle>Trusted by Hundreds of Happy Customers</SectionTitle>
        <TitleRule><PlaneIcon/></TitleRule>
        <TestiGrid>
          {TESTIMONIALS.map((t,i) => (
            <TestiCard key={i} $delay={`${i*.12}s`}>
              <div className="stars">{[...Array(5)].map((_,j)=><Icons.Star key={j}/>)}</div>
              <p className="quote">{t.text}</p>
              <div className="reviewer">— {t.reviewer}</div>
            </TestiCard>
          ))}
        </TestiGrid>
      </Section>
    </>
  );
}

/* ═══════════════════════════════════════════
   CONTACT PAGE
═══════════════════════════════════════════ */
export function ContactPage({ onNavigate }) {
  const [form, setForm] = useState({ name:"", phone:"", email:"", service:"", date:"", message:"" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.phone.trim() || !/^\+?[\d\s-]{7,15}$/.test(form.phone)) e.phone = "Valid phone required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); setForm({ name:"",phone:"",email:"",service:"",date:"",message:"" }); setErrors({}); }, 2000);
  };

  const upd = (k) => (ev) => { setForm(f=>({...f,[k]:ev.target.value})); setErrors(e=>({...e,[k]:""})); };

  return (
    <>
      {/* HERO */}
      <ContactHero>
        <ContactBreadcrumb>
          <span className="link" onClick={() => onNavigate("Home")}>Home</span>
          <span className="sep">›</span>
          <span className="active">Contact Us</span>
        </ContactBreadcrumb>
        <h1>Get In Touch With Us</h1>
        <p>We're available 24/7. Reach out for bookings, inquiries or any travel assistance.</p>
      </ContactHero>

      {/* INFO CARDS */}
      <ContactCardsRow>
        {[
          { icon:<Icons.Phone/>, icbg:T.navyMid, title:"Call Us", lines:["Dheeraj: +91 6265370030","Neeraj: +91 7879572717"] },
          { icon:<Icons.Mail/>,  icbg:T.orange,  title:"Email Us", lines:["paldheeraj8865@gmail.com","Available 24/7"] },
          { icon:<Icons.MapPin/>,icbg:"#dc2626", title:"Visit Us",  lines:["27 Prince Nagar","Indore, Madhya Pradesh"] },
          { icon:<Icons.Time/>,  icbg:T.green,   title:"Working Hours", lines:["Mon-Sat: 6am – 10pm","Sun: 8am – 8pm"] },
        ].map((c,i) => (
          <InfoCard key={i} icbg={c.icbg} $delay={`${i*.1}s`}>
            <div className="ic">{c.icon}</div>
            <h3>{c.title}</h3>
            {c.lines.map(l => <p key={l}>{l}</p>)}
          </InfoCard>
        ))}
      </ContactCardsRow>

      {/* FORM + MAP */}
      <ContactMain>
        {/* FORM */}
        <ContactFormCard>
          <h2>Send Us a Message</h2>
          <p>Fill in the details below and we'll get back to you as soon as possible.</p>

          {sent ? (
            <SuccessBanner>
              <Icons.CheckCircle style={{fontSize:"2.5rem",marginBottom:"10px"}}/>
              <h3>Message Sent Successfully!</h3>
              <p>Thank you for reaching out. Our team will contact you within 24 hours.</p>
              <BtnPrimary style={{margin:"16px auto 0",display:"inline-flex"}} onClick={()=>setSent(false)}>
                Send Another Message
              </BtnPrimary>
            </SuccessBanner>
          ) : (
            <>
              <FormRow cols="1fr 1fr">
                <FormGroup>
                  <label>Full Name *</label>
                  <Input placeholder="Your full name" value={form.name} onChange={upd("name")} error={errors.name}/>
                  {errors.name && <ErrorMsg>{errors.name}</ErrorMsg>}
                </FormGroup>
                <FormGroup>
                  <label>Phone Number *</label>
                  <Input placeholder="+91 XXXXXXXXXX" value={form.phone} onChange={upd("phone")} error={errors.phone}/>
                  {errors.phone && <ErrorMsg>{errors.phone}</ErrorMsg>}
                </FormGroup>
              </FormRow>
              <FormRow>
                <FormGroup>
                  <label>Email Address *</label>
                  <Input type="email" placeholder="your@email.com" value={form.email} onChange={upd("email")} error={errors.email}/>
                  {errors.email && <ErrorMsg>{errors.email}</ErrorMsg>}
                </FormGroup>
              </FormRow>
              <FormRow cols="1fr 1fr">
                <FormGroup>
                  <label>Service Required</label>
                  <Select value={form.service} onChange={upd("service")}>
                    <option value="">Select a service</option>
                    <option>Tour Packages</option>
                    <option>Outstation Cabs</option>
                    <option>Airport Transfer</option>
                    <option>Corporate Travel</option>
                    <option>Events &amp; Bookings</option>
                  </Select>
                </FormGroup>
                <FormGroup>
                  <label>Travel Date</label>
                  <Input type="date" value={form.date} onChange={upd("date")}/>
                </FormGroup>
              </FormRow>
              <FormRow>
                <FormGroup>
                  <label>Your Message *</label>
                  <Textarea
                    placeholder="Tell us about your travel plans, pickup/drop location, number of passengers, etc."
                    value={form.message} onChange={upd("message")} error={errors.message}
                  />
                  {errors.message && <ErrorMsg>{errors.message}</ErrorMsg>}
                </FormGroup>
              </FormRow>
              <SubmitBtn onClick={handleSubmit} disabled={loading}>
                {loading ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" style={{animation:`${spin} 1s linear infinite`}} fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" strokeDasharray="60" strokeDashoffset="15"/>
                  </svg>
                ) : <><Icons.Send/> Send Message</>}
              </SubmitBtn>
            </>
          )}
        </ContactFormCard>

        {/* MAP + DETAILS */}
        <div>
          <MapCard>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.3!2d75.8577!3d22.7196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDQzJzExLjYiTiA3NcKwNTEnMjcuNyJF!5e0!3m2!1sen!2sin!4v1640000000000!5m2!1sen!2sin"
              title="DV Travels Location"
              allowFullScreen="" loading="lazy"
            />
          </MapCard>

          <BranchesCard>
            <h3>Our Office</h3>
            <BranchItem>
              <div className="ic"><Icons.MapPin/></div>
              <div><h4>Main Office – Indore</h4><p>27 Prince Nagar, Indore, Madhya Pradesh 452001</p></div>
            </BranchItem>
            <BranchItem>
              <div className="ic"><Icons.WA/></div>
              <div><h4>WhatsApp Support</h4><p>+91 7879572717 (24/7 assistance)</p></div>
            </BranchItem>
            <BranchItem>
              <div className="ic"><Icons.Mail/></div>
              <div><h4>Email Support</h4><p>paldheeraj8865@gmail.com</p></div>
            </BranchItem>
          </BranchesCard>

          <HoursCard>
            <h3>⏰ Operating Hours</h3>
            {[
              { day:"Monday – Friday", time:"6:00 AM – 10:00 PM", open:true },
              { day:"Saturday",        time:"6:00 AM – 10:00 PM", open:true },
              { day:"Sunday",          time:"8:00 AM – 8:00 PM",  open:true },
              { day:"Public Holidays", time:"Available on Call",   open:true },
            ].map(h => (
              <HourRow key={h.day} open={h.open}>
                <span className="day">{h.day}</span>
                <span className="time">{h.time}</span>
              </HourRow>
            ))}
          </HoursCard>
        </div>
      </ContactMain>

      {/* FAQ */}
      <FAQSection>
        <SectionLabel>FREQUENTLY ASKED QUESTIONS</SectionLabel>
        <FAQTitle>Got Questions? We Have Answers.</FAQTitle>
        <TitleRule style={{marginBottom:"36px"}}><PlaneIcon/></TitleRule>
        {FAQS.map((f,i) => (
          <FAQItem key={i} $open={openFaq===i} onClick={()=>setOpenFaq(openFaq===i?null:i)}>
            <FAQQuestion $open={openFaq===i}>
              <span>{f.q}</span>
              <span className="chevron">▾</span>
            </FAQQuestion>
            <FAQAnswer $open={openFaq===i}>{f.a}</FAQAnswer>
          </FAQItem>
        ))}
      </FAQSection>

      {/* CTA */}
      <CTABanner>
        <CTAInner>
          <CTAText>
            <h2>Ready to Book Your Ride?</h2>
            <p>Call us now or send us a message on WhatsApp.</p>
          </CTAText>
          <CTAButtons>
            <WAButton><Icons.WA/> WhatsApp Us</WAButton>
            <CallButton><Icons.Phone2/> Call Us Now</CallButton>
          </CTAButtons>
          <QRCard>
            <QRCodeSVG/>
            <div className="qr-label">SCAN TO<br/>WHATSAPP</div>
          </QRCard>
        </CTAInner>
      </CTABanner>
    </>
  );
}

/* ═══════════════════════════════════════════
   SHARED FOOTER
═══════════════════════════════════════════ */
export function SharedFooter({ onNavigate }) {
  const QUICK  = ["Home","About Us","Our Services","Destinations","Packages","Gallery","Contact Us"];
  const SLINKS = ["Tour Packages","Outstation Cabs","Airport Transfer","Corporate Travel","Events & Bookings"];
  return (
    <FooterWrap>
      <FooterGrid>
        <FooterLogo>
          <div className="dv"><span className="d">D</span><span className="v">V</span></div>
          <div className="travels">TRAVELS</div>
          <p className="desc">Your trusted travel partner for safe, comfortable and memorable journeys.</p>
          <FooterSocials>
            <a href="#" aria-label="Facebook"><Icons.FB/></a>
            <a href="#" aria-label="Instagram"><Icons.IG/></a>
            <a href="#" aria-label="WhatsApp"><Icons.WA/></a>
          </FooterSocials>
        </FooterLogo>
        <FooterCol>
          <h4>Quick Links</h4>
          <ul>{QUICK.map(l=><li key={l}><a onClick={()=>onNavigate(l)} href={l}>{l}</a></li>)}</ul>
        </FooterCol>
        <FooterCol>
          <h4>Services</h4>
          <ul>{SLINKS.map(l=><li key={l}><a href="#">{l}</a></li>)}</ul>
        </FooterCol>
        <FooterCol>
          <h4>Contact Us</h4>
          <div className="contact-row"><Icons.Phone/><span>+91 6265370030</span></div>
          <div className="contact-row"><Icons.Phone2/><span>+91 7879572717</span></div>
          <div className="contact-row"><Icons.Mail/><span>paldheeraj8865@gmail.com</span></div>
          <div className="contact-row"><Icons.MapPin/><span>27 Prince Nagar, Indore M.P.</span></div>
        </FooterCol>
      </FooterGrid>
      <FooterBottom>
        <span>© 2025 DV Travels. All Rights Reserved.</span>
        <span>Designed with ❤️ for Happy Journeys</span>
      </FooterBottom>
    </FooterWrap>
  );
}

/* ═══════════════════════════════════════════
   ROOT APP COMPONENT
═══════════════════════════════════════════ */
export default function DVTravelsApp() {
  const [activePage, setActivePage] = useState("Home");
  const [menuOpen, setMenuOpen]     = useState(false);
  const topRef = useRef(null);

  const navigate = (page) => {
    setActivePage(page);
    setMenuOpen(false);
    if (topRef.current) topRef.current.scrollIntoView({ behavior:"smooth" });
  };

  useEffect(() => {
    const close = () => { if (window.innerWidth > 960) setMenuOpen(false); };
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  return (
    <>
      <GlobalStyle/>
      <div ref={topRef}/>

      {/* NAVBAR */}
      <NavBar>
        <LogoBlock onClick={() => navigate("Home")}>
          <div className="dv"><span className="d">D</span><span className="v">V</span></div>
          <div className="sub">
            <span className="travels">TRAVELS</span>
            <span className="tagline">SAFE JOURNEY · HAPPY MEMORIES</span>
          </div>
        </LogoBlock>

        <NavLinks>
          {NAVLINKS.map(l => (
            <li key={l}>
              <a
                href="#"
                className={activePage === l ? "active" : ""}
                onClick={e => { e.preventDefault(); navigate(l); }}
              >{l}</a>
            </li>
          ))}
        </NavLinks>

        <BookNowBtn onClick={() => navigate("Contact Us")}>
          Book Now <Icons.Arrow style={{fontSize:".9rem"}}/>
        </BookNowBtn>

        <HamBtn onClick={() => setMenuOpen(o=>!o)} aria-label="Toggle menu">
          {menuOpen ? <Icons.Close style={{fontSize:"1.3rem"}}/> : <Icons.Menu style={{fontSize:"1.3rem"}}/>}
        </HamBtn>
      </NavBar>

      {/* MOBILE MENU */}
      <MobileDrawer $open={menuOpen}>
        {NAVLINKS.map(l => (
          <a
            key={l} href="#"
            className={activePage === l ? "active" : ""}
            onClick={e => { e.preventDefault(); navigate(l); }}
          >{l}</a>
        ))}
        <hr/>
        <BtnPrimary style={{justifyContent:"center"}} onClick={() => navigate("Contact Us")}>
          Book Now <Icons.Arrow/>
        </BtnPrimary>
      </MobileDrawer>

      {/* PAGES */}
      {activePage === "Contact Us"
        ? <ContactPage onNavigate={navigate}/>
        : <HomePage onNavigate={navigate}/>
      }

      {/* FOOTER */}
      <SharedFooter onNavigate={navigate}/>
    </>
  );
}