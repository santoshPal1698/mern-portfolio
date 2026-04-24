import { useState, useEffect, useRef } from "react";
import styled, { createGlobalStyle, keyframes, ThemeProvider } from "styled-components";
import { theme } from "../../utils/Themes";

// ─── KEYFRAMES ────────────────────────────────────────────────────────────────
const waveAnim   = keyframes`0%{transform:translateX(0)}100%{transform:translateX(-50%)}`;
const float      = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}`;
const glow       = keyframes`0%,100%{box-shadow:0 0 20px rgba(0,200,255,.3)}50%{box-shadow:0 0 50px rgba(0,200,255,.7)}`;
const fadeUp     = keyframes`from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}`;
const pulse      = keyframes`0%,100%{opacity:1}50%{opacity:.5}`;
const rotate     = keyframes`from{transform:rotate(0deg)}to{transform:rotate(360deg)}`;
const shimmer    = keyframes`0%{background-position:-200% center}100%{background-position:200% center}`;
const scanline   = keyframes`0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}`;

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background: ${p=>p.theme.bg};
    color: ${p=>p.theme.white};
    font-family: 'Syne', sans-serif;
    overflow-x: hidden;
  }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${p=>p.theme.bg}; }
  ::-webkit-scrollbar-thumb { background: ${p=>p.theme.cyan}; border-radius: 3px; }
  ::selection { background: rgba(0,200,255,.3); }
`;

// ─── NAV ─────────────────────────────────────────────────────────────────────
const NavBar = styled.nav`
  position: fixed; top: 0; left: 0; right: 0; z-index: 999;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 5%;
  height: 72px;
  background: ${p => p.scrolled ? "rgba(6,11,20,.95)" : "transparent"};
  backdrop-filter: ${p => p.scrolled ? "blur(20px)" : "none"};
  border-bottom: ${p => p.scrolled ? "1px solid rgba(0,200,255,.12)" : "none"};
  transition: all .4s ease;
`;

const Logo = styled.div`
  display: flex; align-items: center; gap: 12px; cursor: pointer;
  text-decoration: none;
`;
const LogoBadge = styled.div`
  width: 44px; height: 44px; border-radius: 10px;
  background: ${p=>p.theme.gradient};
  display: flex; align-items: center; justify-content: center;
  font-family: 'Orbitron', sans-serif;
  font-weight: 900; font-size: 15px; color: #fff;
  letter-spacing: 1px;
  animation: ${glow} 3s ease infinite;
`;
const LogoText = styled.div`
  display: flex; flex-direction: column; line-height: 1.1;
  span:first-child {
    font-family: 'Orbitron', sans-serif;
    font-weight: 700; font-size: 14px; color: ${p=>p.theme.cyan};
    letter-spacing: 2px;
  }
  span:last-child {
    font-size: 10px; color: ${p=>p.theme.muted}; letter-spacing: 1px;
    text-transform: uppercase;
  }
`;

const NavLinks = styled.div`
  display: flex; gap: 36px; align-items: center;
  @media(max-width:768px){ display:none; }
`;
const NavLink = styled.a`
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px; letter-spacing: 1px;
  color: ${p=>p.theme.muted}; text-decoration: none;
  position: relative; padding-bottom: 4px;
  transition: color .3s;
  &::after {
    content:''; position:absolute; bottom:0; left:0; width:0; height:1px;
    background: ${p=>p.theme.cyan}; transition: width .3s;
  }
  &:hover { color: ${p=>p.theme.cyan}; &::after{width:100%;} }
`;
const NavCTA = styled.a`
  padding: 9px 24px; border-radius: 6px;
  background: transparent;
  border: 1px solid ${p=>p.theme.cyan};
  color: ${p=>p.theme.cyan};
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px; letter-spacing: 1px;
  cursor: pointer; text-decoration: none;
  transition: all .3s;
  &:hover { background: ${p=>p.theme.cyan}; color: ${p=>p.theme.bg}; }
`;
const Hamburger = styled.div`
  display: none; flex-direction: column; gap: 5px; cursor: pointer;
  @media(max-width:768px){ display:flex; }
  span {
    display: block; width: 26px; height: 2px;
    background: ${p=>p.theme.cyan}; border-radius: 2px;
    transition: all .3s;
  }
`;
const MobileMenu = styled.div`
  position: fixed; top: 72px; left: 0; right: 0;
  background: rgba(6,11,20,.97);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0,200,255,.12);
  padding: 20px 5%;
  display: ${p=>p.open ? "flex" : "none"};
  flex-direction: column; gap: 16px; z-index: 998;
`;
const MobileLink = styled.a`
  font-family: 'JetBrains Mono', monospace; font-size: 14px;
  color: ${p=>p.theme.muted}; text-decoration: none; padding: 8px 0;
  border-bottom: 1px solid rgba(255,255,255,.05);
  &:hover { color: ${p=>p.theme.cyan}; }
`;

// ─── HERO ─────────────────────────────────────────────────────────────────────
const HeroSection = styled.section`
  min-height: 100vh; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  position: relative; overflow: hidden;
  padding: 100px 5% 60px;
  text-align: center;
`;
const HeroBg = styled.div`
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,117,255,.25) 0%, transparent 70%),
    radial-gradient(ellipse 50% 40% at 80% 100%, rgba(124,58,237,.2) 0%, transparent 70%),
    radial-gradient(ellipse 40% 40% at 20% 80%, rgba(0,200,255,.1) 0%, transparent 70%);
`;
const GridLines = styled.div`
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(0,200,255,.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,200,255,.04) 1px, transparent 1px);
  background-size: 60px 60px;
`;
const Scanline = styled.div`
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, rgba(0,200,255,.4), transparent);
  animation: ${scanline} 8s linear infinite;
  pointer-events: none;
`;
const HeroTag = styled.div`
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 16px; border-radius: 20px;
  border: 1px solid rgba(0,200,255,.3);
  background: rgba(0,200,255,.06);
  font-family: 'JetBrains Mono', monospace; font-size: 12px;
  color: ${p=>p.theme.cyan}; letter-spacing: 2px;
  margin-bottom: 24px;
  animation: ${fadeUp} .8s ease both;
`;
const Dot = styled.span`
  width: 6px; height: 6px; border-radius: 50%;
  background: ${p=>p.theme.cyan};
  animation: ${pulse} 1.5s ease infinite;
`;
const HeroName = styled.h1`
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(2.8rem, 8vw, 6.5rem);
  font-weight: 900; line-height: 1.0;
  margin-bottom: 16px;
  animation: ${fadeUp} .8s .15s ease both;
  background: linear-gradient(135deg, #fff 30%, ${p=>p.theme.cyan} 60%, ${p=>p.theme.violet} 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-size: 200% auto;
  animation: ${fadeUp} .8s .15s ease both, ${shimmer} 4s linear 1s infinite;
`;
const HeroTitle = styled.p`
  font-size: clamp(1rem, 2.5vw, 1.4rem);
  color: ${p=>p.theme.muted}; font-weight: 600; letter-spacing: 2px;
  text-transform: uppercase; margin-bottom: 20px;
  animation: ${fadeUp} .8s .3s ease both;
  span { color: ${p=>p.theme.cyan}; }
`;
const HeroDesc = styled.p`
  max-width: 600px; margin: 0 auto 40px;
  font-size: 1.05rem; line-height: 1.75;
  color: ${p=>p.theme.muted};
  animation: ${fadeUp} .8s .45s ease both;
`;
const HeroBtns = styled.div`
  display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;
  animation: ${fadeUp} .8s .6s ease both;
`;
const BtnPrimary = styled.a`
  padding: 14px 36px; border-radius: 8px;
  background: ${p=>p.theme.gradient};
  color: #fff; font-family: 'Orbitron', sans-serif;
  font-size: 13px; font-weight: 700; letter-spacing: 2px;
  text-decoration: none; cursor: pointer;
  transition: all .3s; position: relative; overflow: hidden;
  animation: ${glow} 3s ease infinite;
  &:hover { transform: translateY(-3px); filter: brightness(1.15); }
`;
const BtnOutline = styled.a`
  padding: 14px 36px; border-radius: 8px;
  border: 1px solid rgba(0,200,255,.4);
  background: rgba(0,200,255,.06);
  color: ${p=>p.theme.cyan}; font-family: 'Orbitron', sans-serif;
  font-size: 13px; font-weight: 700; letter-spacing: 2px;
  text-decoration: none; cursor: pointer;
  transition: all .3s;
  &:hover { border-color: ${p=>p.theme.cyan}; background: rgba(0,200,255,.12); transform: translateY(-3px); }
`;
const FloatingCards = styled.div`
  display: flex; gap: 20px; margin-top: 60px; flex-wrap: wrap; justify-content: center;
  animation: ${fadeUp} .8s .75s ease both;
`;
const StatCard = styled.div`
  padding: 20px 28px; border-radius: 12px;
  background: ${p=>p.theme.card};
  border: 1px solid ${p=>p.theme.border};
  backdrop-filter: blur(12px);
  text-align: center;
  animation: ${float} ${p=>p.delay||"3s"} ease-in-out infinite;
  transition: border-color .3s;
  &:hover { border-color: rgba(0,200,255,.4); }
`;
const StatNum = styled.div`
  font-family: 'Orbitron', sans-serif; font-size: 2rem; font-weight: 900;
  background: ${p=>p.theme.gradient};
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
`;
const StatLabel = styled.div`
  font-size: .8rem; color: ${p=>p.theme.muted}; letter-spacing: 1px; margin-top: 4px;
`;

// ─── WAVES ────────────────────────────────────────────────────────────────────
const WaveContainer = styled.div`
  position: absolute; bottom: 0; left: 0; right: 0;
  overflow: hidden; line-height: 0;
`;
const WaveTrack = styled.div`
  display: flex; width: 200%;
  animation: ${waveAnim} 10s linear infinite;
  svg { flex-shrink: 0; width: 50%; height: 80px; }
`;

// ─── SECTION COMMONS ──────────────────────────────────────────────────────────
const Section = styled.section`
  padding: 100px 5%;
  position: relative;
  background: ${p => p.alt ? p.theme.bg2 : p.theme.bg};
`;
const SectionTag = styled.div`
  font-family: 'JetBrains Mono', monospace; font-size: 12px;
  color: ${p=>p.theme.cyan}; letter-spacing: 3px; text-transform: uppercase;
  margin-bottom: 12px; display: flex; align-items: center; gap: 10px;
  &::before { content:'//'; opacity:.5; }
`;
const SectionTitle = styled.h2`
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 900; line-height: 1.1;
  margin-bottom: 16px;
  span { 
    background: ${p=>p.theme.gradient};
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
`;
const SectionSub = styled.p`
  font-size: 1.05rem; color: ${p=>p.theme.muted}; line-height: 1.75;
  max-width: 560px;
`;
const Divider = styled.div`
  width: 60px; height: 3px; border-radius: 2px;
  background: ${p=>p.theme.gradient};
  margin: 20px 0;
`;
const Container = styled.div`
  max-width: 1200px; margin: 0 auto;
`;
const Grid2 = styled.div`
  display: grid; gap: 60px;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  @media(max-width:768px){ grid-template-columns:1fr; }
`;

// ─── ABOUT ────────────────────────────────────────────────────────────────────
const AvatarRing = styled.div`
  width: 280px; height: 280px; border-radius: 50%;
  background: ${p=>p.theme.gradient};
  padding: 3px;
  margin: 0 auto;
  animation: ${rotate} 8s linear infinite;
  @media(max-width:768px){ width:200px; height:200px; }
`;
const AvatarInner = styled.div`
  width: 100%; height: 100%; border-radius: 50%;
  background: ${p=>p.theme.bg3};
  display: flex; align-items: center; justify-content: center;
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(3rem, 6vw, 4.5rem);
  font-weight: 900;
  background: linear-gradient(135deg, ${p=>p.theme.bg3} 60%, rgba(0,200,255,.1));
  color: ${p=>p.theme.cyan};
  animation: ${rotate} 8s linear infinite reverse;
`;
const InfoList = styled.div`
  display: flex; flex-direction: column; gap: 14px; margin-top: 30px;
`;
const InfoRow = styled.div`
  display: flex; gap: 14px; align-items: flex-start;
`;
const InfoIcon = styled.div`
  width: 36px; height: 36px; border-radius: 8px; flex-shrink: 0;
  background: rgba(0,200,255,.1); border: 1px solid rgba(0,200,255,.2);
  display: flex; align-items: center; justify-content: center; font-size: 16px;
`;
const InfoContent = styled.div`
  label { font-size: .75rem; color: ${p=>p.theme.muted}; letter-spacing: 1px; display: block; }
  span { font-weight: 600; color: ${p=>p.theme.white}; font-size: .95rem; }
`;
const SkillBars = styled.div`
  margin-top: 30px; display: flex; flex-direction: column; gap: 14px;
`;
const SkillRow = styled.div``;
const SkillLabel = styled.div`
  display: flex; justify-content: space-between;
  font-size: .85rem; margin-bottom: 6px;
  color: ${p=>p.theme.muted};
  span:last-child { color: ${p=>p.theme.cyan}; }
`;
const SkillTrack = styled.div`
  height: 5px; background: rgba(255,255,255,.07); border-radius: 3px; overflow: hidden;
`;
const SkillFill = styled.div`
  height: 100%; width: ${p=>p.pct}%;
  background: ${p=>p.theme.gradient}; border-radius: 3px;
  animation: ${fadeUp} 1s ease;
`;

// ─── SERVICES ────────────────────────────────────────────────────────────────
const ServicesGrid = styled.div`
  display: grid; gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  margin-top: 60px;
`;
const ServiceCard = styled.div`
  padding: 36px 28px; border-radius: 16px;
  background: ${p=>p.theme.card};
  border: 1px solid ${p=>p.theme.border};
  backdrop-filter: blur(16px);
  position: relative; overflow: hidden;
  transition: all .4s ease;
  cursor: default;
  &::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: ${p=>p.theme.gradient}; transform: scaleX(0);
    transition: transform .4s ease; transform-origin: left;
  }
  &:hover {
    transform: translateY(-8px);
    border-color: rgba(0,200,255,.3);
    &::before { transform: scaleX(1); }
  }
`;
const ServiceIcon = styled.div`
  width: 56px; height: 56px; border-radius: 14px;
  background: ${p => `rgba(${p.color || "0,200,255"},.12)`};
  border: 1px solid ${p => `rgba(${p.color || "0,200,255"},.25)`};
  display: flex; align-items: center; justify-content: center;
  font-size: 26px; margin-bottom: 20px;
`;
const ServiceTitle = styled.h3`
  font-family: 'Orbitron', sans-serif; font-size: 1rem;
  font-weight: 700; margin-bottom: 12px; color: ${p=>p.theme.white};
`;
const ServiceDesc = styled.p`
  font-size: .9rem; color: ${p=>p.theme.muted}; line-height: 1.7;
`;
const ServiceTags = styled.div`
  display: flex; flex-wrap: wrap; gap: 8px; margin-top: 18px;
`;
const Tag = styled.span`
  padding: 4px 12px; border-radius: 20px; font-size: .72rem;
  font-family: 'JetBrains Mono', monospace; letter-spacing: 1px;
  background: rgba(0,200,255,.08); border: 1px solid rgba(0,200,255,.2);
  color: ${p=>p.theme.cyan};
`;

// ─── PORTFOLIO ────────────────────────────────────────────────────────────────
const PortfolioGrid = styled.div`
  display: grid; gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  margin-top: 60px;
`;
const PortCard = styled.div`
  border-radius: 16px; overflow: hidden;
  background: ${p=>p.theme.card};
  border: 1px solid ${p=>p.theme.border};
  transition: all .4s; cursor: pointer;
  &:hover { transform: translateY(-8px); border-color: rgba(0,200,255,.35); }
`;
const PortThumb = styled.div`
  height: 200px;
  background: ${p => p.bg || `linear-gradient(135deg, rgba(0,117,255,.3), rgba(124,58,237,.3))`};
  display: flex; align-items: center; justify-content: center;
  font-size: 4rem; position: relative; overflow: hidden;
  &::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(to bottom, transparent 40%, rgba(6,11,20,.9));
  }
`;
const PortLabel = styled.div`
  position: absolute; bottom: 14px; left: 14px; z-index: 2;
  font-family: 'JetBrains Mono', monospace; font-size: .72rem;
  color: ${p=>p.theme.cyan}; letter-spacing: 2px;
  background: rgba(0,200,255,.12);
  padding: 4px 12px; border-radius: 20px;
  border: 1px solid rgba(0,200,255,.25);
`;
const PortInfo = styled.div`
  padding: 24px;
  h3 { font-family: 'Orbitron', sans-serif; font-size: .95rem; margin-bottom: 8px; }
  p { font-size: .88rem; color: ${p=>p.theme.muted}; line-height: 1.6; }
`;
const PortLinks = styled.div`
  display: flex; gap: 12px; padding: 0 24px 24px; flex-wrap: wrap;
`;
const PortBtn = styled.a`
  padding: 8px 18px; border-radius: 6px; font-size: .8rem;
  font-family: 'JetBrains Mono', monospace; text-decoration: none;
  background: rgba(0,200,255,.1); border: 1px solid rgba(0,200,255,.25);
  color: ${p=>p.theme.cyan}; transition: all .3s;
  &:hover { background: rgba(0,200,255,.2); }
`;

// ─── CONTACT ─────────────────────────────────────────────────────────────────
const ContactGrid = styled.div`
  display: grid; gap: 60px;
  grid-template-columns: 1fr 1.2fr;
  margin-top: 60px;
  @media(max-width:768px){ grid-template-columns:1fr; }
`;
const ContactInfo = styled.div``;
const ContactCard = styled.div`
  display: flex; gap: 16px; align-items: flex-start;
  padding: 20px; border-radius: 12px;
  background: ${p=>p.theme.card};
  border: 1px solid ${p=>p.theme.border};
  margin-bottom: 16px; transition: border-color .3s;
  &:hover { border-color: rgba(0,200,255,.3); }
`;
const CIcon = styled.div`
  width: 44px; height: 44px; border-radius: 10px; flex-shrink: 0;
  background: ${p=>p.theme.gradient};
  display: flex; align-items: center; justify-content: center; font-size: 20px;
`;
const CText = styled.div`
  label { font-size: .72rem; color: ${p=>p.theme.muted}; letter-spacing: 2px; text-transform: uppercase; display: block; margin-bottom: 4px; }
  a, span { font-weight: 600; color: ${p=>p.theme.white}; font-size: .95rem; text-decoration: none; }
  a:hover { color: ${p=>p.theme.cyan}; }
`;

const FormBox = styled.div`
  padding: 40px; border-radius: 20px;
  background: ${p=>p.theme.card};
  border: 1px solid ${p=>p.theme.border};
  backdrop-filter: blur(16px);
`;
const FormTitle = styled.h3`
  font-family: 'Orbitron', sans-serif; font-size: 1.1rem; margin-bottom: 28px;
  span { color: ${p=>p.theme.cyan}; }
`;
const FormRow = styled.div`
  display: grid; gap: 16px;
  grid-template-columns: ${p => p.cols || "1fr"};
  @media(max-width:480px){ grid-template-columns:1fr; }
`;
const FormGroup = styled.div`
  margin-bottom: 16px;
  label { font-size: .75rem; color: ${p=>p.theme.muted}; letter-spacing: 1px; display: block; margin-bottom: 8px; }
`;
const Input = styled.input`
  width: 100%; padding: 13px 16px; border-radius: 8px;
  background: rgba(255,255,255,.04); border: 1px solid rgba(0,200,255,.15);
  color: ${p=>p.theme.white}; font-family: 'Syne', sans-serif; font-size: .95rem;
  outline: none; transition: border-color .3s;
  &:focus { border-color: rgba(0,200,255,.5); background: rgba(0,200,255,.05); }
  &::placeholder { color: rgba(120,144,176,.5); }
`;
const Textarea = styled.textarea`
  width: 100%; padding: 13px 16px; border-radius: 8px;
  background: rgba(255,255,255,.04); border: 1px solid rgba(0,200,255,.15);
  color: ${p=>p.theme.white}; font-family: 'Syne', sans-serif; font-size: .95rem;
  outline: none; resize: vertical; min-height: 130px; transition: border-color .3s;
  &:focus { border-color: rgba(0,200,255,.5); background: rgba(0,200,255,.05); }
  &::placeholder { color: rgba(120,144,176,.5); }
`;
const SubmitBtn = styled.button`
  width: 100%; padding: 16px; border-radius: 10px; border: none;
  background: ${p=>p.theme.gradient}; color: #fff;
  font-family: 'Orbitron', sans-serif; font-size: .9rem; font-weight: 700;
  letter-spacing: 2px; cursor: pointer; margin-top: 8px;
  transition: all .3s; position: relative; overflow: hidden;
  &:hover { transform: translateY(-2px); filter: brightness(1.1); animation: ${glow} 1s ease infinite; }
`;
const SuccessMsg = styled.div`
  padding: 14px 20px; border-radius: 10px; text-align: center; margin-top: 16px;
  background: rgba(0,200,100,.12); border: 1px solid rgba(0,200,100,.3);
  color: #00c864; font-family: 'JetBrains Mono', monospace; font-size: .9rem;
`;

// ─── FOOTER ─────────────────────────────────────────────────────────────────
const Footer = styled.footer`
  padding: 40px 5%; background: ${p=>p.theme.bg};
  border-top: 1px solid rgba(0,200,255,.08);
  display: flex; justify-content: space-between; align-items: center; flex-wrap: gap;
  gap: 20px; flex-wrap: wrap;
`;
const FooterLeft = styled.div`
  font-size: .85rem; color: ${p=>p.theme.muted};
  span { color: ${p=>p.theme.cyan}; }
`;
const FooterLinks = styled.div`
  display: flex; gap: 24px;
  a { font-family: 'JetBrains Mono', monospace; font-size: .75rem;
    color: ${p=>p.theme.muted}; text-decoration: none; letter-spacing: 1px;
    &:hover { color: ${p=>p.theme.cyan}; } }
`;

// ─── DATA ─────────────────────────────────────────────────────────────────────
const services = [
  { icon: "🌐", color: "0,200,255",  title: "Web Development",        desc: "Modern, responsive websites and web applications built with the latest technologies for optimal performance and user experience.", tags: ["React", "Next.js", "Node.js"] },
  // { icon: "📱", color: "0,117,255",  title: "Mobile App Development",  desc: "Cross-platform mobile applications that deliver native-like experiences for both iOS and Android platforms.", tags: ["React Native", "Flutter"] },
  { icon: "🎨", color: "124,58,237", title: "UI/UX Design",            desc: "Visually stunning, user-centered designs that convert visitors into customers with intuitive interfaces.", tags: ["Figma", "Prototyping"] },
  { icon: "⚙️", color: "245,158,11", title: "Backend Development",     desc: "Scalable, secure server-side solutions with robust APIs and database architecture for your business needs.", tags: ["Node.js", "MongoDB", "SQL"] },
  { icon: "🔍", color: "16,185,129", title: "SEO Optimization",        desc: "Data-driven SEO strategies that boost your search rankings, drive organic traffic and grow your online presence.", tags: ["On-Page", "Technical SEO"] },
  { icon: "☁️", color: "0,200,255",  title: "Cloud Solutions",         desc: "Reliable cloud infrastructure setup, deployment, and management to keep your applications always available.", tags: ["AWS", "Vercel", "CI/CD"] },
];

const portfolio = [
  { emoji: "💼", label: "Live Project",    bg: "linear-gradient(135deg, rgba(0,117,255,.4), rgba(0,200,255,.2))",   title: "Personal Portfolio",     desc: "A professional portfolio website showcasing skills and projects with modern animations and responsive design.", link: "https://santosh-pal.netlify.app/" },
  { emoji: "🛒", label: "E-Commerce",      bg: "linear-gradient(135deg, rgba(124,58,237,.4), rgba(0,117,255,.2))",  title: "E-Commerce Platform",    desc: "Full-stack e-commerce solution with product management, cart, and Razorpay payment gateway integration." },
  { emoji: "📊", label: "Dashboard",       bg: "linear-gradient(135deg, rgba(245,158,11,.3), rgba(0,200,255,.2))",  title: "Analytics Dashboard",    desc: "Real-time analytics dashboard with interactive charts, data visualization and role-based access control." },
  { emoji: "📱", label: "Mobile App",      bg: "linear-gradient(135deg, rgba(16,185,129,.3), rgba(0,200,255,.2))",  title: "Food Delivery App",      desc: "React Native food delivery app with live tracking, push notifications and seamless payment integration." },
  { emoji: "🏥", label: "Healthcare",      bg: "linear-gradient(135deg, rgba(239,68,68,.3), rgba(124,58,237,.2))",  title: "Healthcare Portal",      desc: "Doctor appointment booking system with video consultation, prescription management and patient records." },
  { emoji: "🎓", label: "EdTech",          bg: "linear-gradient(135deg, rgba(0,200,255,.3), rgba(124,58,237,.3))",  title: "LMS Platform",           desc: "Learning management system with course creation, video streaming, quiz engine and certification system." },
];

const skills = [
  { label: "Angular", pct: 75 },
  { label: "React js", pct: 62 },
  { label: "Node.js / Express", pct: 85 },
  { label: "UI/UX & Figma", pct: 78 },
  { label: "MongoDB / DynamoDB", pct: 80 },
];

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function App() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [formData, setFormData]   = useState({ name:"", email:"", phone:"", service:"", message:"" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleInput = e => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setFormData({ name:"", email:"", phone:"", service:"", message:"" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const scrollTo = id => { document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); setMenuOpen(false); };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      {/* NAV */}
      <NavBar scrolled={scrolled}>
        <Logo onClick={() => scrollTo("hero")}>
          <LogoBadge>VT</LogoBadge>
          <LogoText>
            <span>VIHAAN TECH</span>
            <span>PVT LTD</span>
          </LogoText>
        </Logo>
        <NavLinks>
          {["about","services","portfolio","contact"].map(s => (
            <NavLink key={s} href="#" onClick={e=>{e.preventDefault();scrollTo(s);}}>
              {s.toUpperCase()}
            </NavLink>
          ))}
          <NavCTA href="#" onClick={e=>{e.preventDefault();scrollTo("contact");}}>Hire Me</NavCTA>
        </NavLinks>
        <Hamburger onClick={() => setMenuOpen(p=>!p)}>
          <span/><span/><span/>
        </Hamburger>
      </NavBar>
      <MobileMenu open={menuOpen}>
        {["about","services","portfolio","contact"].map(s => (
          <MobileLink key={s} href="#" onClick={e=>{e.preventDefault();scrollTo(s);}}>{s.charAt(0).toUpperCase()+s.slice(1)}</MobileLink>
        ))}
        <NavCTA style={{textAlign:"center"}} href="#" onClick={e=>{e.preventDefault();scrollTo("contact");}}>Hire Me</NavCTA>
      </MobileMenu>

      {/* HERO */}
      <HeroSection id="hero">
        <HeroBg/>
        <GridLines/>
        <Scanline/>
        <div style={{position:"relative",zIndex:2,display:"flex",flexDirection:"column",alignItems:"center"}}>
          <HeroTag><Dot/> Available for Freelance Projects</HeroTag>
          <HeroName>SANTOSH PAL</HeroName>
          <HeroTitle>Full Stack Developer & <span>Digital Innovator</span></HeroTitle>
          <HeroDesc>
            Founder of <strong style={{color:"#00c8ff"}}>Vihaan Tech Pvt Ltd</strong> — crafting pixel-perfect web experiences,
            scalable applications & modern digital solutions that drive real results.
          </HeroDesc>
          <HeroBtns>
            <BtnPrimary href="#" onClick={e=>{e.preventDefault();scrollTo("portfolio");}}>View My Work</BtnPrimary>
            <BtnOutline href="#" onClick={e=>{e.preventDefault();scrollTo("contact");}}>Let's Connect</BtnOutline>
          </HeroBtns>
          <FloatingCards>
            {[
              { num:"50+", label:"Projects Completed" },
              { num:"30+", label:"Happy Clients" },
              { num:"5+",  label:"Years Experience" },
              { num:"10+", label:"Technologies" },
            ].map((s,i) => (
              <StatCard key={i} delay={`${3+i*.4}s`}>
                <StatNum>{s.num}</StatNum>
                <StatLabel>{s.label}</StatLabel>
              </StatCard>
            ))}
          </FloatingCards>
        </div>
        <WaveContainer>
          <WaveTrack>
            <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none">
              <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="rgba(11,18,32,1)"/>
            </svg>
            <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none">
              <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="rgba(11,18,32,1)"/>
            </svg>
          </WaveTrack>
        </WaveContainer>
      </HeroSection>

      {/* ABOUT */}
      <Section id="about" alt>
        <Container>
          <Grid2>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"24px"}}>
              <AvatarRing>
                <AvatarInner>SP</AvatarInner>
              </AvatarRing>
              <SkillBars style={{width:"100%",maxWidth:"320px"}}>
                {skills.map(s => (
                  <SkillRow key={s.label}>
                    <SkillLabel><span>{s.label}</span><span>{s.pct}%</span></SkillLabel>
                    <SkillTrack><SkillFill pct={s.pct}/></SkillTrack>
                  </SkillRow>
                ))}
              </SkillBars>
            </div>
            <div>
              <SectionTag>Who I Am</SectionTag>
              <SectionTitle>About <span>Me</span></SectionTitle>
              <Divider/>
              <SectionSub>
                I'm Santosh Pal, a passionate Full Stack Developer and Founder of Vihaan Tech Pvt Ltd.
                With expertise across the entire development stack, I help businesses bring their digital visions to life —
                from sleek front-end interfaces to rock-solid back-end systems.
              </SectionSub>
              <InfoList>
                {[
                  { icon:"👤", label:"Full Name",    value:"Santosh Pal" },
                  { icon:"🏢", label:"Company",      value:"Vihaan Tech Pvt Ltd" },
                  { icon:"📞", label:"Phone",        value:"+91 8839102688" },
                  { icon:"📧", label:"Email",        value:"santoshpal9816@gmail.com" },
                  { icon:"🌐", label:"Portfolio",    value:"santosh-pal.netlify.app" },
                  { icon:"📍", label:"Availability", value:"Remote & On-Site" },
                ].map(info => (
                  <InfoRow key={info.label}>
                    <InfoIcon>{info.icon}</InfoIcon>
                    <InfoContent>
                      <label>{info.label}</label>
                      <span>{info.value}</span>
                    </InfoContent>
                  </InfoRow>
                ))}
              </InfoList>
              <div style={{marginTop:"28px"}}>
                <BtnPrimary href="https://santosh-pal.netlify.app/" target="_blank" rel="noopener">
                  View Portfolio ↗
                </BtnPrimary>
              </div>
            </div>
          </Grid2>
        </Container>
      </Section>

      {/* SERVICES */}
      <Section id="services">
        <Container>
          <div style={{textAlign:"center"}}>
            <SectionTag style={{justifyContent:"center"}}>What I Offer</SectionTag>
            <SectionTitle>My <span>Services</span></SectionTitle>
            <Divider style={{margin:"20px auto"}}/>
            <SectionSub style={{margin:"0 auto"}}>
              Comprehensive digital solutions tailored to transform your ideas into powerful, scalable products.
            </SectionSub>
          </div>
          <ServicesGrid>
            {services.map(s => (
              <ServiceCard key={s.title}>
                <ServiceIcon color={s.color}>{s.icon}</ServiceIcon>
                <ServiceTitle>{s.title}</ServiceTitle>
                <ServiceDesc>{s.desc}</ServiceDesc>
                <ServiceTags>{s.tags.map(t => <Tag key={t}>{t}</Tag>)}</ServiceTags>
              </ServiceCard>
            ))}
          </ServicesGrid>
        </Container>
      </Section>

      {/* PORTFOLIO */}
      <Section id="portfolio" alt>
        <Container>
          <div style={{textAlign:"center"}}>
            <SectionTag style={{justifyContent:"center"}}>My Work</SectionTag>
            <SectionTitle>Recent <span>Portfolio</span></SectionTitle>
            <Divider style={{margin:"20px auto"}}/>
            <SectionSub style={{margin:"0 auto"}}>
              A selection of projects that showcase my skills in design, development, and problem-solving.
            </SectionSub>
          </div>
          <PortfolioGrid>
            {portfolio.map(p => (
              <PortCard key={p.title}>
                <div style={{position:"relative"}}>
                  <PortThumb bg={p.bg}>{p.emoji}</PortThumb>
                  <PortLabel>{p.label}</PortLabel>
                </div>
                <PortInfo>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </PortInfo>
                <PortLinks>
                  {p.link && <PortBtn href={p.link} target="_blank" rel="noopener">🔗 Live Demo</PortBtn>}
                  <PortBtn href="#" onClick={e=>e.preventDefault()}>📁 Details</PortBtn>
                </PortLinks>
              </PortCard>
            ))}
          </PortfolioGrid>
        </Container>
      </Section>

      {/* CONTACT */}
      <Section id="contact">
        <Container>
          <div style={{textAlign:"center"}}>
            <SectionTag style={{justifyContent:"center"}}>Get In Touch</SectionTag>
            <SectionTitle>Let's <span>Work Together</span></SectionTitle>
            <Divider style={{margin:"20px auto"}}/>
            <SectionSub style={{margin:"0 auto"}}>
              Have a project in mind? I'd love to hear about it. Send me a message and let's build something amazing.
            </SectionSub>
          </div>
          <ContactGrid>
            <ContactInfo>
              <SectionTitle style={{fontSize:"1.5rem"}}>Contact <span>Details</span></SectionTitle>
              <p style={{color:theme.muted, marginBottom:"28px", lineHeight:"1.7"}}>
                Whether you need a full-scale web application, a mobile app, or just a stunning website —
                I'm here to bring your vision to life with precision and creativity.
              </p>
              {[
                { icon:"📞", label:"Phone", value:"+91 8839102688", href:"tel:+918839102688" },
                { icon:"📧", label:"Email", value:"santoshpal9816@gmail.com", href:"mailto:santoshpal9816@gmail.com" },
                { icon:"🌐", label:"Portfolio", value:"santosh-pal.netlify.app", href:"https://santosh-pal.netlify.app/" },
              ].map(c => (
                <ContactCard key={c.label}>
                  <CIcon>{c.icon}</CIcon>
                  <CText>
                    <label>{c.label}</label>
                    <a href={c.href} target="_blank" rel="noopener">{c.value}</a>
                  </CText>
                </ContactCard>
              ))}
            </ContactInfo>
            <FormBox>
              <FormTitle>Send Me a <span>Message</span></FormTitle>
              <FormRow cols="1fr 1fr">
                <FormGroup>
                  <label>FULL NAME *</label>
                  <Input name="name" value={formData.name} onChange={handleInput} placeholder="Your name" />
                </FormGroup>
                <FormGroup>
                  <label>EMAIL ADDRESS *</label>
                  <Input name="email" type="email" value={formData.email} onChange={handleInput} placeholder="your@email.com" />
                </FormGroup>
              </FormRow>
              <FormRow cols="1fr 1fr">
                <FormGroup>
                  <label>PHONE NUMBER</label>
                  <Input name="phone" value={formData.phone} onChange={handleInput} placeholder="+91 XXXXX XXXXX" />
                </FormGroup>
                <FormGroup>
                  <label>SERVICE NEEDED</label>
                  <Input name="service" value={formData.service} onChange={handleInput} placeholder="e.g. Web Development" />
                </FormGroup>
              </FormRow>
              <FormGroup>
                <label>YOUR MESSAGE *</label>
                <Textarea name="message" value={formData.message} onChange={handleInput} placeholder="Tell me about your project..." />
              </FormGroup>
              <SubmitBtn onClick={handleSubmit}>🚀 SEND MESSAGE</SubmitBtn>
              {submitted && <SuccessMsg>✅ Message sent! I'll get back to you within 24 hours.</SuccessMsg>}
            </FormBox>
          </ContactGrid>
        </Container>
      </Section>

      {/* FOOTER */}
      <Footer>
        <FooterLeft>
          © 2026 <span>Vihaan Tech Pvt Ltd</span> — Crafted with ❤️ by Santosh Pal
        </FooterLeft>
        <FooterLinks>
          {["about","services","portfolio","contact"].map(s => (
            <a key={s} href="#" onClick={e=>{e.preventDefault();scrollTo(s);}}>
              {s.charAt(0).toUpperCase()+s.slice(1)}
            </a>
          ))}
        </FooterLinks>
      </Footer>
    </ThemeProvider>
  );
}