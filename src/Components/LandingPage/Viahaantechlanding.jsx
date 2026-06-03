import { useState, useEffect, useRef } from "react";
import styled, { createGlobalStyle, keyframes, ThemeProvider, css } from "styled-components";
import { theme } from "../../utils/Themes";


/* ═══════════════════════════════════════════════════════════════════
   KEYFRAMES
═══════════════════════════════════════════════════════════════════ */
const fadeUp    = keyframes`from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}`;
const fadeIn    = keyframes`from{opacity:0}to{opacity:1}`;
const float     = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}`;
const glowPulse = keyframes`0%,100%{box-shadow:0 0 18px rgba(99,102,241,.35)}50%{box-shadow:0 0 44px rgba(99,102,241,.7)}`;
const shimmer   = keyframes`0%{background-position:200% center}100%{background-position:-200% center}`;
const waveMove  = keyframes`0%{transform:translateX(0)}100%{transform:translateX(-50%)}`;
const spin      = keyframes`from{transform:rotate(0)}to{transform:rotate(360deg)}`;
const blink     = keyframes`0%,100%{opacity:1}50%{opacity:0}`;
const tickerRun = keyframes`0%{transform:translateX(0)}100%{transform:translateX(-50%)}`;
const borderAnim= keyframes`0%,100%{border-color:rgba(99,102,241,.2)}50%{border-color:rgba(34,211,238,.5)}`;
const slideIn   = keyframes`from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}`;
const countUp   = keyframes`from{opacity:0;transform:scale(.7)}to{opacity:1;transform:scale(1)}`;

/* ═══════════════════════════════════════════════════════════════════
   GLOBAL
═══════════════════════════════════════════════════════════════════ */
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;600;700;800;900&family=DM+Sans:wght@300;400;500;600&family=Fira+Code:wght@300;400;500&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{
    background:${p=>p.theme.bg};
    color:${p=>p.theme.white};
    font-family:'DM Sans',sans-serif;
    overflow-x:hidden;
    line-height:1.6;
  }
  ::-webkit-scrollbar{width:5px}
  ::-webkit-scrollbar-track{background:${p=>p.theme.bg}}
  ::-webkit-scrollbar-thumb{background:${p=>p.theme.indigo};border-radius:4px}
  ::selection{background:rgba(99,102,241,.3);color:#fff}
  a{text-decoration:none;color:inherit}
`;

/* ═══════════════════════════════════════════════════════════════════
   SHARED / LAYOUT
═══════════════════════════════════════════════════════════════════ */
const Wrap = styled.div`max-width:1220px;margin:0 auto;padding:0 5%`;

const Section = styled.section`
  padding:100px 0;
  background:${p=>p.alt?p.theme.bg2:p.theme.bg};
  position:relative;overflow:hidden;
`;

const SLabel = styled.p`
  font-family:'Fira Code',monospace;font-size:.72rem;
  color:${p=>p.theme.cyan};letter-spacing:3px;text-transform:uppercase;
  margin-bottom:12px;display:flex;align-items:center;gap:10px;
  ${p=>p.center&&css`justify-content:center;`}
  &::before{content:'//';opacity:.45}
`;
const STitle = styled.h2`
  font-family:'Exo 2',sans-serif;
  font-size:clamp(1.9rem,4vw,3.2rem);font-weight:900;line-height:1.08;
  margin-bottom:14px;
  ${p=>p.center&&css`text-align:center;`}
  span{
    background:${p=>p.theme.grad1};
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;
  }
`;
const SSub = styled.p`
  font-size:1rem;color:${p=>p.theme.muted};line-height:1.8;
  max-width:580px;
  ${p=>p.center&&css`margin:0 auto;text-align:center;`}
`;
const Bar = styled.div`
  width:52px;height:4px;border-radius:2px;
  background:${p=>p.theme.grad1};
  margin:${p=>p.center?"16px auto 0":"16px 0 0"};
`;

/* ═══════════════════════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════════════════════ */
const Nav = styled.nav`
  position:fixed;top:0;left:0;right:0;z-index:1000;
  height:70px;display:flex;align-items:center;justify-content:space-between;
  padding:0 5%;
  background:${p=>p.$s?"rgba(6,8,15,.92)":"transparent"};
  backdrop-filter:${p=>p.$s?"blur(24px)":""};
  border-bottom:${p=>p.$s?"1px solid rgba(99,102,241,.12)":""};
  transition:all .45s ease;
`;
const NavLogo = styled.div`
  display:flex;align-items:center;gap:11px;cursor:pointer;
`;
const LogoMark = styled.div`
  width:42px;height:42px;border-radius:10px;
  background:${p=>p.theme.grad1};
  display:flex;align-items:center;justify-content:center;
  font-family:'Exo 2',sans-serif;font-weight:900;font-size:14px;color:#fff;
  letter-spacing:.5px;animation:${glowPulse} 3s ease infinite;
`;
const LogoInfo = styled.div`
  line-height:1.15;
  strong{font-family:'Exo 2',sans-serif;font-weight:800;font-size:15px;
    background:${p=>p.theme.grad1};-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
  small{display:block;font-family:'Fira Code',monospace;font-size:9px;
    color:${p=>p.theme.muted};letter-spacing:2px;text-transform:uppercase;}
`;
const NavMenu = styled.div`
  display:flex;gap:32px;align-items:center;
  @media(max-width:900px){display:none}
`;
const NLink = styled.a`
  font-family:'Fira Code',monospace;font-size:12px;letter-spacing:1px;
  color:${p=>p.theme.muted};position:relative;padding-bottom:3px;
  transition:color .3s;cursor:pointer;
  &::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1.5px;
    background:${p=>p.theme.grad1};transition:width .3s;}
  &:hover{color:${p=>p.theme.white};&::after{width:100%}}
`;
const HireBtn = styled.a`
  padding:9px 22px;border-radius:8px;cursor:pointer;
  background:${p=>p.theme.grad1};
  color:#fff;font-family:'Exo 2',sans-serif;font-weight:700;font-size:12px;
  letter-spacing:1.5px;text-transform:uppercase;border:none;
  transition:all .3s;
  &:hover{transform:translateY(-2px);filter:brightness(1.12);}
`;
const Burger = styled.div`
  display:none;flex-direction:column;gap:5px;cursor:pointer;
  @media(max-width:900px){display:flex}
  span{display:block;width:24px;height:2px;background:${p=>p.theme.indigo};border-radius:2px;transition:all .3s}
`;
const Drawer = styled.div`
  display:${p=>p.$o?"flex":"none"};flex-direction:column;gap:4px;
  position:fixed;top:70px;left:0;right:0;z-index:999;
  background:rgba(6,8,15,.97);backdrop-filter:blur(24px);
  padding:20px 5% 28px;border-bottom:1px solid rgba(99,102,241,.12);
`;
const DLink = styled.a`
  padding:11px 0;border-bottom:1px solid rgba(255,255,255,.05);
  font-family:'Fira Code',monospace;font-size:13px;color:${p=>p.theme.muted};
  cursor:pointer;transition:color .2s;
  &:hover{color:${p=>p.theme.cyan}}
`;

/* ═══════════════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════════════ */
const HeroWrap = styled.section`
  min-height:100vh;display:flex;flex-direction:column;
  align-items:center;justify-content:center;
  padding:110px 5% 60px;text-align:center;
  position:relative;overflow:hidden;
`;
const HeroBg = styled.div`
  position:absolute;inset:0;pointer-events:none;
  background:
    radial-gradient(ellipse 90% 70% at 50% -5%,rgba(99,102,241,.18) 0%,transparent 65%),
    radial-gradient(ellipse 55% 45% at 90% 90%,rgba(34,211,238,.12) 0%,transparent 60%),
    radial-gradient(ellipse 45% 40% at 5%  80%,rgba(245,158,11,.08) 0%,transparent 60%);
`;
const GridBg = styled.div`
  position:absolute;inset:0;pointer-events:none;
  background-image:
    linear-gradient(rgba(99,102,241,.04) 1px,transparent 1px),
    linear-gradient(90deg,rgba(99,102,241,.04) 1px,transparent 1px);
  background-size:64px 64px;
`;
const HBadge = styled.div`
  display:inline-flex;align-items:center;gap:8px;
  padding:6px 18px;border-radius:100px;margin-bottom:24px;
  background:rgba(99,102,241,.08);border:1px solid rgba(99,102,241,.3);
  font-family:'Fira Code',monospace;font-size:11px;color:${p=>p.theme.indigo};letter-spacing:2px;
  animation:${fadeUp} .7s ease both;
`;
const Pip = styled.span`
  width:7px;height:7px;border-radius:50%;background:${p=>p.theme.emerald};
  animation:${blink} 2s ease infinite;
`;
const HName = styled.h1`
  font-family:'Exo 2',sans-serif;
  font-size:clamp(3rem,9vw,7.5rem);
  font-weight:900;line-height:.95;letter-spacing:-2px;
  margin-bottom:18px;
  background:linear-gradient(135deg,#fff 20%,${p=>p.theme.indigo} 55%,${p=>p.theme.cyan} 100%);
  background-size:200% auto;
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;
  animation:${fadeUp} .7s .1s ease both,${shimmer} 5s 1s linear infinite;
`;
const HRole = styled.div`
  font-family:'Exo 2',sans-serif;font-size:clamp(1rem,2.5vw,1.5rem);
  font-weight:700;color:${p=>p.theme.muted};letter-spacing:3px;text-transform:uppercase;
  margin-bottom:18px;
  animation:${fadeUp} .7s .2s ease both;
  span{color:${p=>p.theme.cyan}}
`;
const TypeWrap = styled.div`
  font-family:'Fira Code',monospace;font-size:clamp(.85rem,1.5vw,1.05rem);
  color:${p=>p.theme.muted};margin-bottom:14px;
  animation:${fadeUp} .7s .3s ease both;
  em{color:${p=>p.theme.amber};font-style:normal;font-weight:600}
  span.cur{animation:${blink} .9s step-end infinite;color:${p=>p.theme.cyan}}
`;
const HDesc = styled.p`
  max-width:620px;margin:0 auto 38px;
  font-size:1.05rem;color:${p=>p.theme.muted};line-height:1.8;
  animation:${fadeUp} .7s .35s ease both;
  strong{color:${p=>p.theme.white}}
`;
const HBtns = styled.div`
  display:flex;gap:14px;justify-content:center;flex-wrap:wrap;
  animation:${fadeUp} .7s .45s ease both;
`;
const BtnGrad = styled.a`
  padding:14px 34px;border-radius:10px;cursor:pointer;
  background:${p=>p.theme.grad1};color:#fff;
  font-family:'Exo 2',sans-serif;font-weight:700;font-size:13px;letter-spacing:1.5px;
  transition:all .3s;animation:${glowPulse} 4s ease infinite;
  &:hover{transform:translateY(-3px);filter:brightness(1.12)}
`;
const BtnGhost = styled.a`
  padding:13px 34px;border-radius:10px;cursor:pointer;
  border:1.5px solid rgba(99,102,241,.4);background:rgba(99,102,241,.06);
  color:${p=>p.theme.indigo};
  font-family:'Exo 2',sans-serif;font-weight:700;font-size:13px;letter-spacing:1.5px;
  transition:all .3s;
  &:hover{border-color:${p=>p.theme.indigo};background:rgba(99,102,241,.14);transform:translateY(-3px)}
`;
const StatsRow = styled.div`
  display:flex;gap:18px;flex-wrap:wrap;justify-content:center;margin-top:60px;
  animation:${fadeUp} .7s .55s ease both;
`;
const StatPill = styled.div`
  padding:18px 28px;border-radius:14px;text-align:center;
  background:rgba(255,255,255,.03);border:1px solid rgba(99,102,241,.18);
  backdrop-filter:blur(12px);
  animation:${float} ${p=>p.$d||"3.5s"} ease-in-out infinite;
  transition:border-color .3s;
  &:hover{border-color:rgba(99,102,241,.4)}
`;
const StatN = styled.div`
  font-family:'Exo 2',sans-serif;font-size:2.1rem;font-weight:900;
  background:${p=>p.theme.grad1};-webkit-background-clip:text;-webkit-text-fill-color:transparent;
`;
const StatL = styled.div`font-size:.75rem;color:${p=>p.theme.muted};letter-spacing:1px;margin-top:3px`;

/* WAVE DIVIDER */
const WaveDivider = styled.div`
  position:absolute;bottom:-1px;left:0;right:0;line-height:0;
  svg{width:100%;height:70px;display:block}
`;
const WaveTrack = styled.div`
  display:flex;width:200%;
  animation:${waveMove} 12s linear infinite;
  svg{flex-shrink:0;width:50%}
`;

/* ═══════════════════════════════════════════════════════════════════
   TICKER — scrolling tech names
═══════════════════════════════════════════════════════════════════ */
const TickerWrap = styled.div`
  overflow:hidden;padding:18px 0;
  background:${p=>p.theme.bg2};
  border-top:1px solid rgba(99,102,241,.1);
  border-bottom:1px solid rgba(99,102,241,.1);
`;
const TickerTrack = styled.div`
  display:flex;width:max-content;
  animation:${tickerRun} 28s linear infinite;
  &:hover{animation-play-state:paused}
`;
const TickerItem = styled.span`
  padding:0 24px;font-family:'Fira Code',monospace;font-size:.78rem;
  color:${p=>p.theme.muted};letter-spacing:2px;text-transform:uppercase;white-space:nowrap;
  display:flex;align-items:center;gap:10px;
  &::after{content:'◆';color:${p=>p.theme.indigo};opacity:.5;font-size:.55rem}
`;

/* ═══════════════════════════════════════════════════════════════════
   ABOUT
═══════════════════════════════════════════════════════════════════ */
const AboutGrid = styled.div`
  display:grid;gap:64px;align-items:center;
  grid-template-columns:1fr 1.15fr;
  @media(max-width:840px){grid-template-columns:1fr}
`;
const AvatarBox = styled.div`
  display:flex;flex-direction:column;align-items:center;gap:28px;
`;
const AvatarRing = styled.div`
  width:260px;height:260px;border-radius:50%;
  padding:3px;background:${p=>p.theme.grad1};
  animation:${spin} 10s linear infinite;
  @media(max-width:500px){width:200px;height:200px}
`;
const AvatarCore = styled.div`
  width:100%;height:100%;border-radius:50%;
  background:${p=>p.theme.bg3};
  display:flex;align-items:center;justify-content:center;
  font-family:'Exo 2',sans-serif;font-weight:900;
  font-size:clamp(2.5rem,5vw,3.8rem);
  color:${p=>p.theme.indigo};
  animation:${spin} 10s linear infinite reverse;
`;
const InfoGrid = styled.div`
  display:grid;gap:10px;grid-template-columns:1fr 1fr;
  @media(max-width:400px){grid-template-columns:1fr}
`;
const ICard = styled.div`
  padding:14px 16px;border-radius:10px;
  background:${p=>p.theme.surface};border:1px solid rgba(99,102,241,.15);
  display:flex;gap:10px;align-items:flex-start;
  transition:border-color .3s;animation:${borderAnim} 4s ease infinite;
  &:hover{border-color:rgba(34,211,238,.4)}
`;
const IEmoji = styled.span`font-size:18px;margin-top:1px;flex-shrink:0`;
const IText = styled.div`
  small{font-family:'Fira Code',monospace;font-size:.65rem;color:${p=>p.theme.muted};letter-spacing:1px;display:block}
  strong{font-size:.88rem;color:${p=>p.theme.white};font-weight:600;line-height:1.3;display:block;margin-top:2px}
`;
const SkillBlock = styled.div`width:100%;max-width:340px`;
const SBar = styled.div`margin-bottom:12px`;
const SBarLabel = styled.div`
  display:flex;justify-content:space-between;
  font-size:.78rem;margin-bottom:6px;
  span:first-child{color:${p=>p.theme.muted}}
  span:last-child{color:${p=>p.theme.cyan};font-family:'Fira Code',monospace;font-size:.72rem}
`;
const SBarTrack = styled.div`height:5px;background:rgba(255,255,255,.06);border-radius:3px;overflow:hidden`;
const SBarFill = styled.div`
  height:100%;width:${p=>p.$p}%;border-radius:3px;
  background:${p=>p.theme.grad1};
`;

/* ═══════════════════════════════════════════════════════════════════
   TECH STACK  ← NEW
═══════════════════════════════════════════════════════════════════ */
const TechSection = styled(Section)``;
const TechGroupWrap = styled.div`
  display:flex;flex-direction:column;gap:48px;margin-top:60px;
`;
const TechGroup = styled.div``;
const TGroupHead = styled.div`
  display:flex;align-items:center;gap:14px;margin-bottom:20px;
  h3{font-family:'Exo 2',sans-serif;font-weight:800;font-size:1rem;color:${p=>p.theme.white};letter-spacing:1px}
`;
const TGroupLine = styled.div`flex:1;height:1px;background:linear-gradient(90deg,rgba(99,102,241,.3),transparent)`;
const TGroupIcon = styled.div`
  width:34px;height:34px;border-radius:8px;flex-shrink:0;
  background:${p=>`rgba(${p.$rgb},.15)`};border:1px solid ${p=>`rgba(${p.$rgb},.3)`};
  display:flex;align-items:center;justify-content:center;font-size:16px;
`;
const TechPills = styled.div`display:flex;flex-wrap:wrap;gap:10px`;
const TechPill = styled.div`
  display:flex;align-items:center;gap:9px;
  padding:10px 18px;border-radius:10px;
  background:${p=>p.theme.surface};
  border:1px solid rgba(99,102,241,.15);
  transition:all .3s;cursor:default;
  &:hover{
    border-color:${p=>p.$hov||"rgba(99,102,241,.5)"};
    background:${p=>`rgba(${p.$rgb||"99,102,241"},.1)`};
    transform:translateY(-3px);
  }
`;
const PillIcon = styled.span`font-size:18px;line-height:1`;
const PillText = styled.div`
  line-height:1.2;
  strong{display:block;font-size:.85rem;font-weight:700;color:${p=>p.theme.white};font-family:'Exo 2',sans-serif}
  small{font-family:'Fira Code',monospace;font-size:.65rem;color:${p=>p.theme.muted};letter-spacing:.5px}
`;
const PillBadge = styled.span`
  padding:2px 8px;border-radius:20px;font-size:.6rem;font-family:'Fira Code',monospace;
  background:${p=>`rgba(${p.$rgb},.2)`};color:${p=>`rgba(${p.$rgb},1)`};
  border:1px solid ${p=>`rgba(${p.$rgb},.3)`};letter-spacing:.5px;white-space:nowrap;
`;

/* ═══════════════════════════════════════════════════════════════════
   SERVICES
═══════════════════════════════════════════════════════════════════ */
const SvcGrid = styled.div`
  display:grid;gap:20px;
  grid-template-columns:repeat(auto-fit,minmax(300px,1fr));
  margin-top:56px;
`;
const SvcCard = styled.div`
  padding:32px 28px;border-radius:16px;
  background:${p=>p.theme.surface};border:1px solid rgba(99,102,241,.15);
  position:relative;overflow:hidden;transition:all .4s;cursor:default;
  &::before{
    content:'';position:absolute;top:0;left:0;right:0;height:3px;
    background:${p=>p.theme.gradFull};transform:scaleX(0);transform-origin:left;transition:transform .4s;
  }
  &:hover{transform:translateY(-7px);border-color:rgba(99,102,241,.4);
    &::before{transform:scaleX(1)}}
`;
const SvcIco = styled.div`
  width:54px;height:54px;border-radius:13px;margin-bottom:18px;
  background:${p=>`rgba(${p.$rgb},.12)`};border:1px solid ${p=>`rgba(${p.$rgb},.25)`};
  display:flex;align-items:center;justify-content:center;font-size:24px;
`;
const SvcTitle = styled.h3`
  font-family:'Exo 2',sans-serif;font-size:.97rem;font-weight:800;
  margin-bottom:10px;color:${p=>p.theme.white};
`;
const SvcDesc = styled.p`font-size:.87rem;color:${p=>p.theme.muted};line-height:1.7`;
const SvcTags = styled.div`display:flex;flex-wrap:wrap;gap:7px;margin-top:16px`;
const STg = styled.span`
  padding:3px 11px;border-radius:20px;font-size:.68rem;
  font-family:'Fira Code',monospace;letter-spacing:.5px;
  background:rgba(34,211,238,.07);border:1px solid rgba(34,211,238,.2);
  color:${p=>p.theme.cyan};
`;
const PriceLbl = styled.div`
  margin-top:16px;font-family:'Fira Code',monospace;font-size:.72rem;
  color:${p=>p.theme.amber};letter-spacing:.5px;
  span{background:rgba(245,158,11,.12);border:1px solid rgba(245,158,11,.25);
    padding:3px 10px;border-radius:6px;}
`;

/* ═══════════════════════════════════════════════════════════════════
   PROCESS
═══════════════════════════════════════════════════════════════════ */
const ProcWrap = styled.div`
  display:grid;gap:2px;
  grid-template-columns:repeat(auto-fit,minmax(210px,1fr));
  margin-top:56px;
`;
const ProcCard = styled.div`
  padding:32px 24px;text-align:center;position:relative;
  border-right:1px solid rgba(99,102,241,.1);
  &:last-child{border-right:none}
  @media(max-width:700px){border-right:none;border-bottom:1px solid rgba(99,102,241,.1)}
  transition:background .3s;
  &:hover{background:rgba(99,102,241,.04)}
`;
const PNum = styled.div`
  font-family:'Exo 2',sans-serif;font-size:2.6rem;font-weight:900;
  background:${p=>p.theme.grad1};-webkit-background-clip:text;-webkit-text-fill-color:transparent;
  line-height:1;margin-bottom:12px;
`;
const PEmoji = styled.div`font-size:28px;margin-bottom:10px`;
const PTitle = styled.h3`
  font-family:'Exo 2',sans-serif;font-size:.92rem;font-weight:800;
  color:${p=>p.theme.white};margin-bottom:8px;
`;
const PDesc = styled.p`font-size:.83rem;color:${p=>p.theme.muted};line-height:1.65`;

/* ═══════════════════════════════════════════════════════════════════
   PORTFOLIO
═══════════════════════════════════════════════════════════════════ */
const PortGrid = styled.div`
  display:grid;gap:22px;
  grid-template-columns:repeat(auto-fit,minmax(340px,1fr));
  margin-top:56px;
  @media(max-width:400px){grid-template-columns:1fr}
`;
const PortCard = styled.div`
  border-radius:16px;overflow:hidden;
  background:${p=>p.theme.surface};
  border:1px solid rgba(99,102,241,.15);
  transition:all .4s;
  &:hover{transform:translateY(-7px);border-color:rgba(34,211,238,.35)}
`;
const PortThumb = styled.div`
  height:190px;background:${p=>p.$bg};
  display:flex;align-items:center;justify-content:center;
  font-size:3.8rem;position:relative;
  &::after{content:'';position:absolute;inset:0;
    background:linear-gradient(to bottom,transparent 40%,rgba(6,8,15,.9))}
`;
const PortBadge = styled.span`
  position:absolute;bottom:12px;left:14px;z-index:2;
  font-family:'Fira Code',monospace;font-size:.65rem;letter-spacing:1.5px;
  padding:4px 11px;border-radius:20px;
  background:rgba(99,102,241,.18);border:1px solid rgba(99,102,241,.35);
  color:${p=>p.theme.indigo};
`;
const PortBody = styled.div`padding:22px 22px 0`;
const PortTitle= styled.h3`
  font-family:'Exo 2',sans-serif;font-size:.95rem;font-weight:800;margin-bottom:7px;
`;
const PortDesc = styled.p`font-size:.84rem;color:${p=>p.theme.muted};line-height:1.65`;
const PortFoot = styled.div`
  display:flex;gap:10px;padding:16px 22px 22px;flex-wrap:wrap;
`;
const PortBtn = styled.a`
  padding:7px 16px;border-radius:7px;font-size:.75rem;
  font-family:'Fira Code',monospace;cursor:pointer;transition:all .3s;
  background:rgba(99,102,241,.1);border:1px solid rgba(99,102,241,.25);
  color:${p=>p.theme.indigo};
  &:hover{background:rgba(99,102,241,.22)}
`;

/* ═══════════════════════════════════════════════════════════════════
   PLATFORMS  ← NEW
═══════════════════════════════════════════════════════════════════ */
const PlatformGrid = styled.div`
  display:grid;gap:24px;
  grid-template-columns:repeat(auto-fit,minmax(380px,1fr));
  margin-top:56px;
  @media(max-width:500px){grid-template-columns:1fr}
`;
const PlatCard = styled.div`
  padding:36px 32px;border-radius:18px;
  background:${p=>p.theme.surface};
  border:1px solid ${p=>p.$border||"rgba(99,102,241,.2)"};
  position:relative;overflow:hidden;transition:all .4s;
  &:hover{transform:translateY(-6px);border-color:${p=>p.$hov||"rgba(99,102,241,.5)"};}
  &::before{
    content:'';position:absolute;top:-40px;right:-40px;
    width:160px;height:160px;border-radius:50%;
    background:${p=>p.$glow||"rgba(99,102,241,.06)"};
    pointer-events:none;
  }
`;
const PlatLogo = styled.div`
  width:60px;height:60px;border-radius:14px;
  background:${p=>p.$bg};
  display:flex;align-items:center;justify-content:center;
  font-size:26px;margin-bottom:20px;
  box-shadow:0 8px 24px ${p=>p.$shadow||"rgba(0,0,0,.3)"};
`;
const PlatName = styled.h3`
  font-family:'Exo 2',sans-serif;font-size:1.4rem;font-weight:900;
  margin-bottom:6px;color:${p=>p.theme.white};
`;
const PlatSub = styled.p`font-size:.85rem;color:${p=>p.theme.muted};line-height:1.7;margin-bottom:20px`;
const PlatStats = styled.div`
  display:flex;gap:20px;flex-wrap:wrap;margin-bottom:22px;
`;
const PStat = styled.div`
  strong{display:block;font-family:'Exo 2',sans-serif;font-weight:800;font-size:1.3rem;color:${p=>p.$c}}
  small{font-family:'Fira Code',monospace;font-size:.65rem;color:${p=>p.theme.muted};letter-spacing:1px}
`;
const PlatLink = styled.a`
  display:inline-flex;align-items:center;gap:8px;
  padding:11px 24px;border-radius:9px;font-size:.8rem;
  font-family:'Exo 2',sans-serif;font-weight:700;letter-spacing:1px;cursor:pointer;
  background:${p=>p.$bg};color:#fff;border:none;transition:all .3s;
  &:hover{transform:translateY(-2px);filter:brightness(1.1)}
`;
const PlatBadges = styled.div`display:flex;gap:8px;flex-wrap:wrap;margin-top:14px`;
const PBadge = styled.span`
  padding:4px 12px;border-radius:20px;font-size:.67rem;font-family:'Fira Code',monospace;
  background:${p=>`rgba(${p.$rgb},.12)`};border:1px solid ${p=>`rgba(${p.$rgb},.28)`};
  color:${p=>p.$col};letter-spacing:.5px;
`;

/* ═══════════════════════════════════════════════════════════════════
   WHY HIRE ME
═══════════════════════════════════════════════════════════════════ */
const WhyGrid = styled.div`
  display:grid;gap:18px;
  grid-template-columns:repeat(auto-fit,minmax(240px,1fr));
  margin-top:52px;
`;
const WhyCard = styled.div`
  padding:26px 22px;border-radius:14px;
  background:${p=>p.theme.surface};border:1px solid rgba(99,102,241,.15);
  display:flex;gap:14px;align-items:flex-start;transition:all .3s;
  &:hover{border-color:rgba(34,211,238,.35);transform:translateY(-4px)}
`;
const WhyIco = styled.div`
  width:46px;height:46px;border-radius:11px;flex-shrink:0;
  background:${p=>p.theme.grad1};
  display:flex;align-items:center;justify-content:center;font-size:20px;
`;
const WhyText = styled.div`
  h4{font-family:'Exo 2',sans-serif;font-size:.88rem;font-weight:800;margin-bottom:5px}
  p{font-size:.81rem;color:${p=>p.theme.muted};line-height:1.6}
`;

/* ═══════════════════════════════════════════════════════════════════
   CONTACT
═══════════════════════════════════════════════════════════════════ */
const CGrid = styled.div`
  display:grid;gap:54px;grid-template-columns:1fr 1.3fr;margin-top:56px;
  @media(max-width:860px){grid-template-columns:1fr}
`;
const CInfoCard = styled.div`
  padding:20px;border-radius:12px;
  background:${p=>p.theme.surface};border:1px solid rgba(99,102,241,.15);
  display:flex;gap:14px;align-items:center;margin-bottom:14px;
  transition:border-color .3s;
  &:hover{border-color:rgba(34,211,238,.35)}
`;
const CIco = styled.div`
  width:46px;height:46px;border-radius:11px;flex-shrink:0;
  background:${p=>p.theme.grad1};
  display:flex;align-items:center;justify-content:center;font-size:20px;
`;
const CText = styled.div`
  small{font-family:'Fira Code',monospace;font-size:.65rem;color:${p=>p.theme.muted};letter-spacing:1.5px;text-transform:uppercase;display:block;margin-bottom:3px}
  a,span{font-weight:600;color:${p=>p.theme.white};font-size:.92rem}
  a:hover{color:${p=>p.theme.cyan}}
`;
const FormCard = styled.div`
  padding:38px 36px;border-radius:18px;
  background:${p=>p.theme.surface};border:1px solid rgba(99,102,241,.15);
  backdrop-filter:blur(12px);
  @media(max-width:500px){padding:26px 20px}
`;
const FormRow2 = styled.div`
  display:grid;gap:14px;
  grid-template-columns:${p=>p.$c||"1fr"};
  @media(max-width:560px){grid-template-columns:1fr}
`;
const FGroup = styled.div`margin-bottom:14px`;
const FLabel = styled.label`
  display:block;font-family:'Fira Code',monospace;font-size:.68rem;
  color:${p=>p.theme.muted};letter-spacing:1.5px;margin-bottom:7px;text-transform:uppercase;
`;
const FInput = styled.input`
  width:100%;padding:12px 15px;border-radius:9px;outline:none;
  background:rgba(255,255,255,.04);border:1px solid rgba(99,102,241,.18);
  color:${p=>p.theme.white};font-family:'DM Sans',sans-serif;font-size:.93rem;
  transition:border-color .3s;
  &:focus{border-color:rgba(99,102,241,.55);background:rgba(99,102,241,.06)}
  &::placeholder{color:rgba(100,116,139,.45)}
`;
const FTextarea = styled.textarea`
  width:100%;padding:12px 15px;border-radius:9px;outline:none;resize:vertical;
  min-height:120px;background:rgba(255,255,255,.04);border:1px solid rgba(99,102,241,.18);
  color:${p=>p.theme.white};font-family:'DM Sans',sans-serif;font-size:.93rem;
  transition:border-color .3s;
  &:focus{border-color:rgba(99,102,241,.55);background:rgba(99,102,241,.06)}
  &::placeholder{color:rgba(100,116,139,.45)}
`;
const SendBtn = styled.button`
  width:100%;padding:15px;border-radius:11px;border:none;cursor:pointer;
  background:${p=>p.theme.grad1};color:#fff;
  font-family:'Exo 2',sans-serif;font-weight:800;font-size:.9rem;letter-spacing:2px;
  transition:all .3s;margin-top:6px;
  &:hover{transform:translateY(-2px);filter:brightness(1.1);animation:${glowPulse} 1s ease infinite}
`;
const OkMsg = styled.div`
  margin-top:14px;padding:13px 18px;border-radius:9px;text-align:center;
  background:rgba(16,185,129,.1);border:1px solid rgba(16,185,129,.28);
  color:${p=>p.theme.emerald};font-family:'Fira Code',monospace;font-size:.85rem;
`;
const TipsBox = styled.div`
  margin-top:20px;padding:18px 20px;border-radius:11px;
  background:rgba(99,102,241,.06);border:1px solid rgba(99,102,241,.15);
  font-family:'Fira Code',monospace;font-size:.72rem;color:${p=>p.theme.muted};line-height:1.9;
  span{color:${p=>p.theme.cyan}}
`;

/* ═══════════════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════════════ */
const Foot = styled.footer`
  padding:32px 5%;background:${p=>p.theme.bg};
  border-top:1px solid rgba(99,102,241,.1);
  display:flex;justify-content:space-between;align-items:center;
  flex-wrap:wrap;gap:16px;
`;
const FootL = styled.p`
  font-size:.82rem;color:${p=>p.theme.muted};
  span{color:${p=>p.theme.indigo}}
  strong{color:${p=>p.theme.white}}
`;
const FootLinks = styled.div`
  display:flex;gap:22px;flex-wrap:wrap;
  a{font-family:'Fira Code',monospace;font-size:.7rem;color:${p=>p.theme.muted};letter-spacing:1px;
    &:hover{color:${p=>p.theme.cyan}}}
`;

/* ═══════════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════════ */
const TECH_GROUPS = [
  {
    label:"Frontend Frameworks", icon:"🖥️", rgb:"99,102,241",
    techs:[
      {icon:"⚛️", name:"React JS",       sub:"v18+",         badge:"Expert",     rgb:"97,218,251",  col:"#61dafb"},
      {icon:"🅰️", name:"Angular",        sub:"v6 → v20",     badge:"v6–v20",     rgb:"221,0,49",    col:"#dd0031"},
      {icon:"⚡", name:"Next.js",         sub:"App Router",   badge:"Full Stack", rgb:"255,255,255", col:"#eee"},
      {icon:"🎨", name:"Styled Components",sub:"CSS-in-JS",   badge:"Advanced",   rgb:"219,112,147", col:"#db7093"},
      {icon:"🌊", name:"Tailwind CSS",   sub:"v3+",          badge:"UI Toolkit", rgb:"56,189,248",  col:"#38bdf8"},
      {icon:"🔀", name:"Redux / Zustand",sub:"State Mgmt",   badge:"Patterns",   rgb:"118,74,188",  col:"#764abc"},
    ]
  },
  {
    label:"Backend & APIs", icon:"⚙️", rgb:"34,211,238",
    techs:[
      {icon:"🟢", name:"Node.js",        sub:"v20 LTS",      badge:"Expert",     rgb:"104,160,99",  col:"#68a063"},
      {icon:"🚀", name:"Express.js",     sub:"REST APIs",    badge:"Microservices",rgb:"255,255,255",col:"#ccc"},
      {icon:"🐍", name:"Python",         sub:"v3.10+",       badge:"AI / Data",  rgb:"55,118,171",  col:"#3776ab"},
      {icon:"🦄", name:"Django",         sub:"v4 / v5",      badge:"Full Stack", rgb:"9,150,106",   col:"#099612"},
      {icon:"📊", name:"GraphQL",        sub:"Apollo",       badge:"API",        rgb:"225,0,152",   col:"#e1008e"},
      {icon:"🔐", name:"JWT / OAuth 2",  sub:"Auth",         badge:"Security",   rgb:"245,158,11",  col:"#f59e0b"},
    ]
  },
  {
    label:"Mobile Development", icon:"📱", rgb:"16,185,129",
    techs:[
      {icon:"📱", name:"React Native",   sub:"Expo + Bare",  badge:"iOS & Android",rgb:"97,218,251",col:"#61dafb"},
      {icon:"🔥", name:"Firebase",       sub:"BaaS",         badge:"Realtime",   rgb:"255,166,0",   col:"#ffa600"},
    ]
  },
  {
    label:"Cloud & DevOps", icon:"☁️", rgb:"245,158,11",
    techs:[
      {icon:"☁️", name:"AWS",            sub:"EC2·S3·Lambda", badge:"Certified",  rgb:"255,153,0",   col:"#ff9900"},
      {icon:"🐳", name:"Docker",         sub:"Containers",   badge:"DevOps",     rgb:"41,130,201",  col:"#2982c9"},
      {icon:"🔄", name:"CI/CD",          sub:"GitHub Actions",badge:"Pipelines", rgb:"36,206,38",   col:"#24ce26"},
      {icon:"📦", name:"Vercel / Netlify",sub:"Edge Deploy",  badge:"Hosting",    rgb:"255,255,255", col:"#ccc"},
    ]
  },
  {
    label:"AI & Emerging Tech", icon:"🤖", rgb:"168,85,247",
    techs:[
      {icon:"🧠", name:"Generative AI",  sub:"GPT·Claude·Gemini",badge:"LLM Apps",rgb:"168,85,247",col:"#a855f7"},
      {icon:"🤖", name:"Agentic AI",     sub:"LangChain·CrewAI",badge:"Agents",  rgb:"168,85,247",  col:"#a855f7"},
      {icon:"🔗", name:"LangChain",      sub:"AI Orchestration",badge:"RAG·Tools",rgb:"32,214,150", col:"#20d696"},
      {icon:"📡", name:"OpenAI API",     sub:"GPT-4o·Whisper",badge:"Integrated",rgb:"16,163,127",  col:"#10a37f"},
      {icon:"🦙", name:"Ollama / HuggingFace",sub:"Local LLMs",badge:"On-Prem",rgb:"255,204,0",    col:"#ffcc00"},
    ]
  },
  {
    label:"Architecture Patterns", icon:"🏗️", rgb:"244,63,94",
    techs:[
      {icon:"🔧", name:"Microservices",  sub:"Event-Driven",  badge:"Architecture",rgb:"99,102,241",col:"#6366f1"},
      {icon:"🧩", name:"Micro Frontend", sub:"Module Federation",badge:"Scalable",rgb:"34,211,238", col:"#22d3ee"},
      {icon:"📮", name:"Message Queues", sub:"Kafka · RabbitMQ",badge:"Async",   rgb:"255,102,0",   col:"#ff6600"},
      {icon:"🗃️", name:"MongoDB",        sub:"v7+",           badge:"NoSQL",     rgb:"67,153,52",   col:"#439334"},
      {icon:"🐘", name:"PostgreSQL",     sub:"v15+",          badge:"SQL",       rgb:"51,103,145",  col:"#336791"},
    ]
  },
];

const SERVICES = [
  {icon:"⚛️", rgb:"97,218,251", title:"React JS Development",      desc:"SPAs, dashboards, component libraries with hooks, context, Redux & clean architecture. Pixel-perfect and performant.",  tags:["React 18","Next.js","Redux","Styled-Comp"], price:"₹8,000+"},
  {icon:"🅰️", rgb:"221,0,49",   title:"Angular App Development",    desc:"Enterprise-grade Angular apps from v6 to v20. Migration, upgrade, standalone components & modern signal-based patterns.",   tags:["Angular","RxJS","NgRx","TypeScript"],       price:"₹12,000+"},
  {icon:"🤖", rgb:"168,85,247", title:"Generative & Agentic AI",    desc:"Build LLM-powered apps, AI chatbots, RAG pipelines, autonomous agents and AI-integrated web platforms.",                tags:["OpenAI","LangChain","CrewAI","Python"],     price:"₹20,000+"},
  {icon:"🔧", rgb:"99,102,241", title:"Microservices & Micro-FE",   desc:"Design and implement microservice backends with Docker + Kafka, and micro-frontend architectures using Module Federation.", tags:["Docker","Kafka","Module Fed.","Node.js"],   price:"₹25,000+"},
  {icon:"🐍", rgb:"55,118,171", title:"Python / Django Backend",    desc:"REST APIs, admin portals, data pipelines and ML model serving with Django REST Framework and Celery.",                   tags:["Django","DRF","Celery","PostgreSQL"],       price:"₹10,000+"},
  {icon:"☁️", rgb:"255,153,0",  title:"AWS Cloud & DevOps",        desc:"Full AWS stack — EC2, S3, Lambda, RDS, CloudFront — with Terraform IaC, GitHub Actions CI/CD and container deployment.",  tags:["AWS","Terraform","Docker","CI/CD"],         price:"₹15,000+"},
];

const PORTFOLIO = [
  {emoji:"💼", label:"Live Project",   bg:"linear-gradient(135deg,rgba(99,102,241,.45),rgba(34,211,238,.2))",   title:"Personal Portfolio v2",     desc:"React + Styled Components with wave animations, scroll reveals and fully responsive design.", link:"https://santosh-pal.netlify.app/", tech:["React","Styled Comp"]},
  {emoji:"🤖", label:"AI Project",     bg:"linear-gradient(135deg,rgba(168,85,247,.45),rgba(99,102,241,.2))",   title:"AI Resume Analyzer",        desc:"Agentic AI app — upload a CV, an LLM extracts key info, scores fit against a job description and suggests improvements.", tech:["OpenAI","LangChain","React","Django"]},
  {emoji:"🛍️", label:"Client Work",    bg:"linear-gradient(135deg,rgba(34,211,238,.35),rgba(99,102,241,.2))",   title:"Fashion E-Commerce Store",   desc:"Full-stack React + Node.js store with cart, wishlist, Razorpay payments and an Angular admin panel.", tech:["React","Node.js","Angular","MongoDB"]},
  {emoji:"🏗️", label:"Architecture",  bg:"linear-gradient(135deg,rgba(244,63,94,.35),rgba(168,85,247,.2))",    title:"Micro-Frontend Dashboard",  desc:"Module Federation shell with 4 independent micro-apps. Each team deploys independently — zero coupling.", tech:["Webpack 5","React","Angular","Node.js"]},
  {emoji:"☁️", label:"AWS Project",    bg:"linear-gradient(135deg,rgba(255,153,0,.35),rgba(34,211,238,.15))",   title:"Serverless SaaS Platform",  desc:"Multi-tenant SaaS on AWS Lambda + API Gateway + DynamoDB with Cognito auth and CloudFront CDN.", tech:["AWS Lambda","Terraform","Node.js"]},
  {emoji:"📊", label:"Freelance Work", bg:"linear-gradient(135deg,rgba(245,158,11,.3),rgba(99,102,241,.2))",    title:"Sales Analytics Dashboard", desc:"Django REST + React dashboard with Chart.js, real-time WebSocket updates, CSV export and RBAC.", tech:["Django","React","Chart.js","WebSocket"]},
];

const PROCESS = [
  {num:"01",emoji:"🤝",title:"Free Discovery Call",  desc:"30-min call to discuss goals, tech stack, timeline and budget. No cost, no commitment."},
  {num:"02",emoji:"📐",title:"Proposal & Roadmap",   desc:"I send a detailed scope, milestones and fixed price. You review and approve before I start."},
  {num:"03",emoji:"💻",title:"Agile Development",    desc:"Weekly demo links, daily Slack/WhatsApp updates. You're always in the loop."},
  {num:"04",emoji:"🚀",title:"Deploy & Handover",    desc:"I handle deployment, write documentation and provide 30 days free post-launch support."},
];

const WHY = [
  {icon:"⚡",title:"Fast Turnaround",      desc:"Most projects delivered ahead of schedule. Daily progress updates keep you informed."},
  {icon:"💬",title:"Direct Communication", desc:"No account manager. You talk straight to the developer. WhatsApp / email / call."},
  {icon:"🏗️",title:"Scalable Architecture",desc:"Code built for growth — clean, documented, tested and easy to hand off."},
  {icon:"🔒",title:"NDA & IP Protection",  desc:"Sign NDAs on request. Your idea, your IP. I never share client work without permission."},
  {icon:"💰",title:"Milestone Payments",   desc:"50% advance, 50% on delivery. Large projects split into milestones — no big upfront risk."},
  {icon:"🛠️",title:"30-Day Free Support",  desc:"Bug fixes, tweaks and minor changes included free for 30 days after go-live."},
];

const tickerItems = [
  "React JS","Angular v6–20","Node.js","Python","Django","AWS","Generative AI","Agentic AI","LangChain",
  "Microservices","Micro Frontend","React Native","Docker","GraphQL","PostgreSQL","MongoDB","TypeScript","Next.js",
];

/* ═══════════════════════════════════════════════════════════════════
   TYPEWRITER HOOK
═══════════════════════════════════════════════════════════════════ */
const roles = [
  "Full Stack Developer",
  "Angular Expert",
  "React JS Developer",
  "MEAN & MERN Stack Developer",
  "Generative AI Builder",
  "Microservices Architect",
  "AWS Cloud Developer",
];
function useTypewriter(items, speed=80, pause=1800) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx]         = useState(0);
  const [typing, setTyping]   = useState(true);
  useEffect(() => {
    const full = items[idx];
    if (typing) {
      if (display.length < full.length) {
        const t = setTimeout(() => setDisplay(full.slice(0, display.length+1)), speed);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), pause);
        return () => clearTimeout(t);
      }
    } else {
      if (display.length > 0) {
        const t = setTimeout(() => setDisplay(display.slice(0,-1)), speed/2);
        return () => clearTimeout(t);
      } else {
        setIdx(i => (i+1) % items.length);
        setTyping(true);
      }
    }
  }, [display, typing, idx]);
  return display;
}

/* ═══════════════════════════════════════════════════════════════════
   APP
═══════════════════════════════════════════════════════════════════ */
export default function App() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [form, setForm]           = useState({name:"",email:"",phone:"",service:"",msg:""});
  const [sent, setSent]           = useState(false);
  const typed                     = useTypewriter(roles);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 36);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  },[]);

  const go = id => { document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); setMenuOpen(false); };
  const upd = e => setForm(p=>({...p,[e.target.name]:e.target.value}));
  const submit = () => {
    if(!form.name||!form.email||!form.msg) return;
    setSent(true); setForm({name:"",email:"",phone:"",service:"",msg:""});
    setTimeout(()=>setSent(false),5000);
  };

  const navItems = ["about","tech","services","portfolio","platforms","contact"];

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      {/* ── NAV ── */}
      <Nav $s={scrolled}>
        <NavLogo onClick={()=>go("hero")}>
          <LogoMark>SP</LogoMark>
          <LogoInfo>
            <strong>Santosh Pal</strong>
            <small>Freelance Developer</small>
          </LogoInfo>
        </NavLogo>
        <NavMenu>
          {navItems.map(s=>(
            <NLink key={s} onClick={()=>go(s)}>{s.toUpperCase()}</NLink>
          ))}
          <HireBtn onClick={()=>go("contact")}>💼 Hire Me</HireBtn>
        </NavMenu>
        <Burger onClick={()=>setMenuOpen(p=>!p)}>
          <span/><span/><span/>
        </Burger>
      </Nav>
      <Drawer $o={menuOpen}>
        {navItems.map(s=>(
          <DLink key={s} onClick={()=>go(s)}>{s.charAt(0).toUpperCase()+s.slice(1)}</DLink>
        ))}
        <HireBtn style={{marginTop:8}} onClick={()=>go("contact")}>💼 Hire Me Now</HireBtn>
      </Drawer>

      {/* ── HERO ── */}
      <HeroWrap id="hero">
        <HeroBg/><GridBg/>
        <div style={{position:"relative",zIndex:2,display:"flex",flexDirection:"column",alignItems:"center"}}>
          <HBadge><Pip/> Open for Freelance Projects — India & Worldwide</HBadge>
          <HName>SANTOSH PAL</HName>
          <HRole>Freelance <span>{typed}<span className="cur">|</span></span></HRole>
          <HDesc>
            I help <strong>startups, agencies & businesses</strong> build high-performance
            web apps, AI-powered platforms and scalable cloud architectures.
            <br/>React · Angular · Node.js · Python · AWS · Generative AI
          </HDesc>
          <HBtns>
            <BtnGrad onClick={()=>go("contact")}>💼 Hire Me Now</BtnGrad>
            <BtnGhost onClick={()=>go("portfolio")}>View Portfolio →</BtnGhost>
          </HBtns>
          <StatsRow>
            {[
              {n:"50+",l:"Projects Delivered"},
              {n:"30+",l:"Happy Clients"},
              {n:"5+", l:"Years Freelancing"},
              {n:"10+",l:"Tech Stacks"},
            ].map((s,i)=>(
              <StatPill key={i} $d={`${3.2+i*.3}s`}>
                <StatN>{s.n}</StatN>
                <StatL>{s.l}</StatL>
              </StatPill>
            ))}
          </StatsRow>
        </div>
        <WaveDivider>
          <WaveTrack>
            <svg viewBox="0 0 1440 70" preserveAspectRatio="none" fill="none">
              <path d="M0,35 C360,70 1080,0 1440,35 L1440,70 L0,70 Z" fill="#0b0f1a"/>
            </svg>
            <svg viewBox="0 0 1440 70" preserveAspectRatio="none" fill="none">
              <path d="M0,35 C360,70 1080,0 1440,35 L1440,70 L0,70 Z" fill="#0b0f1a"/>
            </svg>
          </WaveTrack>
        </WaveDivider>
      </HeroWrap>

      {/* ── TICKER ── */}
      <TickerWrap>
        <TickerTrack>
          {[...tickerItems,...tickerItems].map((t,i)=>(
            <TickerItem key={i}>{t}</TickerItem>
          ))}
        </TickerTrack>
      </TickerWrap>

      {/* ── ABOUT ── */}
      <Section id="about" alt>
        <Wrap>
          <AboutGrid>
            <AvatarBox>
              <AvatarRing><AvatarCore>SP</AvatarCore></AvatarRing>
              <SkillBlock>
                {[
                  {l:"React JS / Next.js",   p:95},
                  {l:"Angular (v6–v20)",      p:90},
                  {l:"Node.js / Express",     p:87},
                  {l:"Python / Django",       p:80},
                  {l:"AWS & DevOps",          p:78},
                  {l:"Generative & Agentic AI",p:75},
                ].map(s=>(
                  <SBar key={s.l}>
                    <SBarLabel><span>{s.l}</span><span>{s.p}%</span></SBarLabel>
                    <SBarTrack><SBarFill $p={s.p}/></SBarTrack>
                  </SBar>
                ))}
              </SkillBlock>
            </AvatarBox>
            <div>
              <SLabel>Who I Am</SLabel>
              <STitle>About <span>Me</span></STitle>
              <Bar/>
              <SSub style={{marginTop:16,marginBottom:24}}>
                I'm <strong style={{color:"#f1f5f9"}}>Santosh Pal</strong>, a freelance Full Stack Developer with 5+ years
                of experience delivering React, Angular, Node.js, Python, AWS and AI-powered solutions for clients across India and globally.
                I work directly with you — no agency overhead, no middlemen.
              </SSub>
              <InfoGrid>
                {[
                  {e:"👤",l:"Name",         v:"Santosh Pal"},
                  {e:"💼",l:"Role",         v:"Freelance Developer"},
                  {e:"🏢",l:"Brand",        v:"Vihaan Tech"},
                  {e:"📞",l:"Phone/WhatsApp",v:"+91 8839102688"},
                  {e:"📧",l:"Email",        v:"santoshpal9816@gmail.com"},
                  {e:"🌐",l:"Portfolio",    v:"santosh-pal.netlify.app"},
                  {e:"🤖",l:"Speciality",   v:"React · Angular · AI"},
                  {e:"✅",l:"Availability", v:"Open for Projects"},
                ].map(i=>(
                  <ICard key={i.l}>
                    <IEmoji>{i.e}</IEmoji>
                    <IText><small>{i.l}</small><strong>{i.v}</strong></IText>
                  </ICard>
                ))}
              </InfoGrid>
              <div style={{marginTop:26,display:"flex",gap:12,flexWrap:"wrap"}}>
                <BtnGrad href="https://santosh-pal.netlify.app/" target="_blank">View Portfolio ↗</BtnGrad>
                <BtnGhost onClick={()=>go("contact")}>Hire Me →</BtnGhost>
              </div>
            </div>
          </AboutGrid>
        </Wrap>
      </Section>

      {/* ── TECH STACK ── */}
      <TechSection id="tech">
        <Wrap>
          <SLabel center>Technology Stack</SLabel>
          <STitle center>All <span>Technologies</span> I Work With</STitle>
          <Bar center/>
          <SSub center style={{marginTop:14}}>
            Angular v6 to v20 · React JS · Node.js · Python · Django · AWS · Generative AI · Agentic AI · Microservices · Micro Frontend
          </SSub>
          <TechGroupWrap>
            {TECH_GROUPS.map(g=>(
              <TechGroup key={g.label}>
                <TGroupHead>
                  <TGroupIcon $rgb={g.rgb}>{g.icon}</TGroupIcon>
                  <h3>{g.label}</h3>
                  <TGroupLine/>
                </TGroupHead>
                <TechPills>
                  {g.techs.map(t=>(
                    <TechPill key={t.name} $rgb={t.rgb} $hov={`rgba(${t.rgb},.45)`}>
                      <PillIcon>{t.icon}</PillIcon>
                      <PillText>
                        <strong>{t.name}</strong>
                        <small>{t.sub}</small>
                      </PillText>
                      <PillBadge $rgb={t.rgb} $col={t.col}>{t.badge}</PillBadge>
                    </TechPill>
                  ))}
                </TechPills>
              </TechGroup>
            ))}
          </TechGroupWrap>
        </Wrap>
      </TechSection>

      {/* ── SERVICES ── */}
      <Section id="services" alt>
        <Wrap>
          <SLabel center>What I Do</SLabel>
          <STitle center>Freelance <span>Services</span></STitle>
          <Bar center/>
          <SSub center style={{marginTop:14}}>
            Hire me directly — no agency markup. Competitive rates, clean code, fast delivery.
          </SSub>
          <SvcGrid>
            {SERVICES.map(s=>(
              <SvcCard key={s.title}>
                <SvcIco $rgb={s.rgb}>{s.icon}</SvcIco>
                <SvcTitle>{s.title}</SvcTitle>
                <SvcDesc>{s.desc}</SvcDesc>
                <SvcTags>{s.tags.map(t=><STg key={t}>{t}</STg>)}</SvcTags>
                <PriceLbl>💰 <span>{s.price}</span></PriceLbl>
              </SvcCard>
            ))}
          </SvcGrid>
        </Wrap>
      </Section>

      {/* ── PORTFOLIO ── */}
      <Section id="portfolio">
        <Wrap>
          <SLabel center>Client Work</SLabel>
          <STitle center>Freelance <span>Portfolio</span></STitle>
          <Bar center/>
          <SSub center style={{marginTop:14}}>
            Real projects — React, Angular, AI, Microservices, AWS and more.
          </SSub>
          <PortGrid>
            {PORTFOLIO.map(p=>(
              <PortCard key={p.title}>
                <div style={{position:"relative"}}>
                  <PortThumb $bg={p.bg}>{p.emoji}</PortThumb>
                  <PortBadge>{p.label}</PortBadge>
                </div>
                <PortBody>
                  <PortTitle>{p.title}</PortTitle>
                  <PortDesc>{p.desc}</PortDesc>
                  <SvcTags style={{marginTop:12,marginBottom:0}}>
                    {p.tech.map(t=><STg key={t}>{t}</STg>)}
                  </SvcTags>
                </PortBody>
                <PortFoot>
                  {p.link&&<PortBtn href={p.link} target="_blank">🔗 Live Demo</PortBtn>}
                  <PortBtn onClick={e=>e.preventDefault()}>📁 Case Study</PortBtn>
                </PortFoot>
              </PortCard>
            ))}
          </PortGrid>
        </Wrap>
      </Section>

      {/* ── PROCESS ── */}
      <Section alt>
        <Wrap>
          <SLabel center>How It Works</SLabel>
          <STitle center>My Freelance <span>Process</span></STitle>
          <Bar center/>
          <SSub center style={{marginTop:14}}>Simple, transparent and stress-free from day one.</SSub>
          <ProcWrap>
            {PROCESS.map(p=>(
              <ProcCard key={p.num}>
                <PNum>{p.num}</PNum>
                <PEmoji>{p.emoji}</PEmoji>
                <PTitle>{p.title}</PTitle>
                <PDesc>{p.desc}</PDesc>
              </ProcCard>
            ))}
          </ProcWrap>
        </Wrap>
      </Section>

      {/* ── PLATFORMS ── */}
      <Section id="platforms">
        <Wrap>
          <SLabel center>Find Me On</SLabel>
          <STitle center>Freelance <span>Platforms</span></STitle>
          <Bar center/>
          <SSub center style={{marginTop:14}}>
            Hire me with full trust — verified profiles on the world's top freelance platforms.
          </SSub>
          <PlatformGrid>
            {/* FIVERR */}
            <PlatCard $border="rgba(29,191,115,.2)" $hov="rgba(29,191,115,.5)" $glow="rgba(29,191,115,.06)">
              <PlatLogo $bg="linear-gradient(135deg,#1dbf73,#18a660)" $shadow="rgba(29,191,115,.35)">🟢</PlatLogo>
              <PlatName>Fiverr</PlatName>
              <PlatSub>
                Find my Fiverr gigs for React JS apps, Angular upgrades, AI integrations, full-stack builds
                and bug fixing. Fast delivery, 5★ rated, clear scope — starting from just ₹2,000.
              </PlatSub>
              <PlatStats>
                <PStat $c="#1dbf73"><strong>50+</strong><small>ORDERS</small></PStat>
                <PStat $c="#f59e0b"><strong>5.0 ★</strong><small>RATING</small></PStat>
                <PStat $c="#22d3ee"><strong>Level 2</strong><small>SELLER</small></PStat>
              </PlatStats>
              <PlatLink $bg="linear-gradient(135deg,#1dbf73,#18a660)"
                href="https://www.fiverr.com/" target="_blank" rel="noopener">
                🟢 View Fiverr Profile ↗
              </PlatLink>
              <PlatBadges>
                {["React JS","Angular","Node.js","AI Apps","Bug Fixes"].map(b=>(
                  <PBadge key={b} $rgb="29,191,115" $col="#1dbf73">{b}</PBadge>
                ))}
              </PlatBadges>
            </PlatCard>
            {/* UPWORK */}
            <PlatCard $border="rgba(20,176,82,.2)" $hov="rgba(20,176,82,.5)" $glow="rgba(20,176,82,.06)">
              <PlatLogo $bg="linear-gradient(135deg,#14b052,#0e8a40)" $shadow="rgba(20,176,82,.35)">🔵</PlatLogo>
              <PlatName>Upwork</PlatName>
              <PlatSub>
                Hire me on Upwork for long-term contracts, milestone-based projects and enterprise-grade
                development. Top Rated profile with detailed proposals and fixed-price or hourly billing.
              </PlatSub>
              <PlatStats>
                <PStat $c="#14b052"><strong>30+</strong><small>JOBS DONE</small></PStat>
                <PStat $c="#f59e0b"><strong>Top Rated</strong><small>BADGE</small></PStat>
                <PStat $c="#22d3ee"><strong>JSS 95%</strong><small>SUCCESS</small></PStat>
              </PlatStats>
              <PlatLink $bg="linear-gradient(135deg,#14b052,#0e8a40)"
                href="https://www.upwork.com/" target="_blank" rel="noopener">
                🔵 View Upwork Profile ↗
              </PlatLink>
              <PlatBadges>
                {["Full Stack","Microservices","AWS","Python","AI/ML"].map(b=>(
                  <PBadge key={b} $rgb="20,176,82" $col="#14b052">{b}</PBadge>
                ))}
              </PlatBadges>
            </PlatCard>
          </PlatformGrid>
          <div style={{marginTop:32,padding:"24px 28px",borderRadius:"14px",
            background:"rgba(99,102,241,.05)",border:"1px solid rgba(99,102,241,.15)",
            display:"flex",gap:"16px",alignItems:"center",flexWrap:"wrap"}}>
            <span style={{fontSize:"1.5rem"}}>💡</span>
            <p style={{fontSize:".88rem",color:theme.muted,lineHeight:"1.7",flex:1}}>
              <strong style={{color:theme.white}}>Prefer direct contact?</strong> You'll get a faster response and lower rates by reaching me directly on 
              <strong style={{color:theme.cyan}}> WhatsApp +91 8839102688</strong> or 
              <strong style={{color:theme.cyan}}> santoshpal9816@gmail.com</strong> — no platform commission.
            </p>
            <BtnGrad onClick={()=>go("contact")} style={{whiteSpace:"nowrap"}}>Contact Directly</BtnGrad>
          </div>
        </Wrap>
      </Section>

      {/* ── WHY HIRE ME ── */}
      <Section alt>
        <Wrap>
          <SLabel center>Why Me</SLabel>
          <STitle center>Why Choose a <span>Freelancer?</span></STitle>
          <Bar center/>
          <SSub center style={{marginTop:14}}>Skip the agency overhead. Work directly with the developer building your product.</SSub>
          <WhyGrid>
            {WHY.map(w=>(
              <WhyCard key={w.title}>
                <WhyIco>{w.icon}</WhyIco>
                <WhyText><h4>{w.title}</h4><p>{w.desc}</p></WhyText>
              </WhyCard>
            ))}
          </WhyGrid>
        </Wrap>
      </Section>

      {/* ── CONTACT ── */}
      <Section id="contact">
        <Wrap>
          <SLabel center>Hire Me</SLabel>
          <STitle center>Start Your <span>Project</span></STitle>
          <Bar center/>
          <SSub center style={{marginTop:14}}>
            Free consultation — no commitment. I respond within 2 hours (10AM–8PM IST).
          </SSub>
          <CGrid>
            <div>
              <STitle style={{fontSize:"1.4rem",marginBottom:20}}>Get In <span>Touch</span></STitle>
              {[
                {i:"📞",l:"Phone / WhatsApp", v:"+91 8839102688",          h:"tel:+918839102688"},
                {i:"📧",l:"Email",            v:"santoshpal9816@gmail.com", h:"mailto:santoshpal9816@gmail.com"},
                {i:"🌐",l:"Portfolio",        v:"santosh-pal.netlify.app",  h:"https://santosh-pal.netlify.app/"},
                {i:"🟢",l:"Fiverr",           v:"Available for gigs",       h:"https://www.fiverr.com/"},
                {i:"🔵",l:"Upwork",           v:"Top Rated • JSS 95%",      h:"https://www.upwork.com/"},
              ].map(c=>(
                <CInfoCard key={c.l}>
                  <CIco>{c.i}</CIco>
                  <CText>
                    <small>{c.l}</small>
                    <a href={c.h} target="_blank" rel="noopener">{c.v}</a>
                  </CText>
                </CInfoCard>
              ))}
              <TipsBox>
                ⏱ Response: <span>within 2 hours</span><br/>
                💳 Payment: <span>50% advance · 50% on delivery</span><br/>
                📦 Large projects: <span>milestone-based</span><br/>
                🌍 Clients: <span>India · USA · UK · UAE · Canada</span>
              </TipsBox>
            </div>
            <FormCard>
              <SLabel>Send A Message</SLabel>
              <STitle style={{fontSize:"1.3rem",marginBottom:22}}>Tell Me About Your <span>Project</span></STitle>
              <FormRow2 $c="1fr 1fr">
                <FGroup>
                  <FLabel>Your Name *</FLabel>
                  <FInput name="name" value={form.name} onChange={upd} placeholder="Full name"/>
                </FGroup>
                <FGroup>
                  <FLabel>Email Address *</FLabel>
                  <FInput name="email" type="email" value={form.email} onChange={upd} placeholder="you@email.com"/>
                </FGroup>
              </FormRow2>
              <FormRow2 $c="1fr 1fr">
                <FGroup>
                  <FLabel>WhatsApp Number</FLabel>
                  <FInput name="phone" value={form.phone} onChange={upd} placeholder="+91 XXXXX XXXXX"/>
                </FGroup>
                <FGroup>
                  <FLabel>Service Required</FLabel>
                  <FInput name="service" value={form.service} onChange={upd} placeholder="e.g. React + AI App"/>
                </FGroup>
              </FormRow2>
              <FGroup>
                <FLabel>Project Details *</FLabel>
                <FTextarea name="msg" value={form.msg} onChange={upd}
                  placeholder="Describe your project — stack, deadline, budget... (the more detail, the better my proposal)"/>
              </FGroup>
              <SendBtn onClick={submit}>🚀 SEND PROJECT BRIEF</SendBtn>
              {sent&&<OkMsg>✅ Received! I'll reply on WhatsApp / email within 2 hours.</OkMsg>}
            </FormCard>
          </CGrid>
        </Wrap>
      </Section>

      {/* ── FOOTER ── */}
      <Foot>
        <FootL>
          © 2026 <strong>Santosh Pal</strong> — Freelance Developer · <span>Vihaan Tech</span>
        </FootL>
        <FootLinks>
          {["about","tech","services","portfolio","platforms","contact"].map(s=>(
            <a key={s} onClick={()=>go(s)}>{s.charAt(0).toUpperCase()+s.slice(1)}</a>
          ))}
        </FootLinks>
      </Foot>
    </ThemeProvider>
  );
}