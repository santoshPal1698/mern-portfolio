// import { createGlobalStyle } from "styled-components";
import styled, { createGlobalStyle, keyframes, ThemeProvider, css } from "styled-components";
import { theme } from "../../utils/Themes";

/* ═══════════════════════════════════════════════════════════════════
   KEYFRAMES
═══════════════════════════════════════════════════════════════════ */
export const fadeUp    = keyframes`from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}`;
export const fadeIn    = keyframes`from{opacity:0}to{opacity:1}`;
export const float     = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}`;
export const glowPulse = keyframes`0%,100%{box-shadow:0 0 18px rgba(99,102,241,.35)}50%{box-shadow:0 0 44px rgba(99,102,241,.7)}`;
export const shimmer   = keyframes`0%{background-position:200% center}100%{background-position:-200% center}`;
export const waveMove  = keyframes`0%{transform:translateX(0)}100%{transform:translateX(-50%)}`;
export const spin      = keyframes`from{transform:rotate(0)}to{transform:rotate(360deg)}`;
export const blink     = keyframes`0%,100%{opacity:1}50%{opacity:0}`;
export const tickerRun = keyframes`0%{transform:translateX(0)}100%{transform:translateX(-50%)}`;
export const borderAnim= keyframes`0%,100%{border-color:rgba(99,102,241,.2)}50%{border-color:rgba(34,211,238,.5)}`;
export const slideIn   = keyframes`from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}`;
export const countUp   = keyframes`from{opacity:0;transform:scale(.7)}to{opacity:1;transform:scale(1)}`;


const GlobalStyles = createGlobalStyle`
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
export const Nav = styled.nav`
  position:fixed;top:0;left:0;right:0;z-index:1000;
  height:70px;display:flex;align-items:center;justify-content:space-between;
  padding:0 5%;
  background:${p=>p.$s?"rgba(6,8,15,.92)":"transparent"};
  backdrop-filter:${p=>p.$s?"blur(24px)":""};
  border-bottom:${p=>p.$s?"1px solid rgba(99,102,241,.12)":""};
  transition:all .45s ease;
`;
export const NavLogo = styled.div`
  display:flex;align-items:center;gap:11px;cursor:pointer;
`;
export const LogoMark = styled.div`
  width:42px;height:42px;border-radius:10px;
  background:${p=>p.theme.grad1};
  display:flex;align-items:center;justify-content:center;
  font-family:'Exo 2',sans-serif;font-weight:900;font-size:14px;color:#fff;
  letter-spacing:.5px;animation:${glowPulse} 3s ease infinite;
`;
export const LogoInfo = styled.div`
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

export default GlobalStyles;