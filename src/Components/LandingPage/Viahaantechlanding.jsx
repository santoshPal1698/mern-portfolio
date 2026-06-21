import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../utils/Themes";
import { PORTFOLIO, PROCESS, roles, SERVICES, TECH_GROUPS, tickerItems, WHY } from "./Vihaan_content";

// ── ONE import for ALL styles ──────────────────────────────────────────────
import {
  GlobalStyle,
  Wrap, Section, SLabel, STitle, SSub, Bar,
  Nav, NavLogo, LogoMark, LogoInfo, NavMenu, NLink, HireBtn, Burger, Drawer, DLink,
  HeroWrap, HeroBg, GridBg, HBadge, Pip, HName, HRole, HDesc, HBtns,
  BtnGrad, BtnGhost, StatsRow, StatPill, StatN, StatL, WaveDivider, WaveTrack,
  TickerWrap, TickerTrack, TickerItem,
  AboutGrid, AvatarBox, AvatarRing, AvatarCore, InfoGrid,
  ICard, IEmoji, IText, SkillBlock, SBar, SBarLabel, SBarTrack, SBarFill,
  TechSection, TechGroupWrap, TechGroup, TGroupHead, TGroupLine, TGroupIcon,
  TechPills, TechPill, PillIcon, PillText, PillBadge,
  SvcGrid, SvcCard, SvcIco, SvcTitle, SvcDesc, SvcTags, STg, PriceLbl,
  ProcWrap, ProcCard, PNum, PEmoji, PTitle, PDesc,
  PortGrid, PortCard, PortThumb, PortBadge, PortBody, PortTitle, PortDesc, PortFoot, PortBtn,
  PlatformGrid, PlatCard, PlatLogo, PlatName, PlatSub, PlatStats, PStat, PlatLink, PlatBadges, PBadge,
  WhyGrid, WhyCard, WhyIco, WhyText,
  CGrid, CInfoCard, CIco, CText, FormCard, FormRow2, FGroup, FLabel, FInput, FTextarea, SendBtn, OkMsg, TipsBox,
  Foot, FootL, FootLinks,
} from "./styles/all_styles";
import { whatsappMsgFreeLance } from "../../services/master.service";
import WhatsAppWidget from "../WhatsAppWidget";
// ──────────────────────────────────────────────────────────────────────────

/* ── Custom hook: typewriter ── */
function useTypewriter(items, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [typing, setTyping] = useState(true);
  useEffect(() => {
    const full = items[idx];
    if (typing) {
      if (display.length < full.length) {
        const t = setTimeout(() => setDisplay(full.slice(0, display.length + 1)), speed);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), pause);
        return () => clearTimeout(t);
      }
    } else {
      if (display.length > 0) {
        const t = setTimeout(() => setDisplay(display.slice(0, -1)), speed / 2);
        return () => clearTimeout(t);
      } else {
        setIdx(i => (i + 1) % items.length);
        setTyping(true);
      }
    }
  }, [display, typing, idx]);
  return display;
}

/* ═══════════════════════════════════════════════════════════════════════════
   APP COMPONENT
═══════════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const typed = useTypewriter(roles);

  const submit = () => {
    if (!form.name || !form.email || !form.message) return;
    const msg = whatsappMsgFreeLance(form);
    const phoneNumber = "918839102688";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`;
    window.open(whatsappURL, "_blank");
    // Reset form
    setForm({ name: "", email: "", phone: "", service: "", message: "" });
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 36);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = id => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const upd = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
 
  const navItems = ["about", "tech", "services", "portfolio", "platforms", "contact"];

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <WhatsAppWidget />
      {/* ── NAV ── */}
      <Nav $s={scrolled}>
        <NavLogo onClick={() => go("hero")}>
          <LogoMark>SP</LogoMark>
          <LogoInfo>
            <strong>Santosh Pal</strong>
            <small>Freelance Developer</small>
          </LogoInfo>
        </NavLogo>
        <NavMenu>
          {navItems.map(s => <NLink key={s} onClick={() => go(s)}>{s.toUpperCase()}</NLink>)}
          <HireBtn onClick={() => go("contact")}>💼 Hire Me</HireBtn>
        </NavMenu>
        <Burger onClick={() => setMenuOpen(p => !p)}>
          <span /><span /><span />
        </Burger>
      </Nav>

      <Drawer $o={menuOpen}>
        {navItems.map(s => (
          <DLink key={s} onClick={() => go(s)}>{s.charAt(0).toUpperCase() + s.slice(1)}</DLink>
        ))}
        <HireBtn style={{ marginTop: 8 }} onClick={() => go("contact")}>💼 Hire Me Now</HireBtn>
      </Drawer>

      {/* ── HERO ── */}
      <HeroWrap id="hero">
        <HeroBg /><GridBg />
        <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <HBadge><Pip /> Open for Freelance Projects — India & Worldwide</HBadge>
          <HName>SANTOSH PAL</HName>
          <HRole>Freelance <span>{typed}<span className="cur">|</span></span></HRole>
          <HDesc>
            I help <strong>startups, agencies & businesses</strong> build high-performance
            web apps, AI-powered platforms and scalable cloud architectures.
            <br />React · Angular · Node.js · Python · AWS · Generative AI
          </HDesc>
          <HBtns>
            <BtnGrad onClick={() => go("contact")}>💼 Hire Me Now</BtnGrad>
            <BtnGhost href="/user/santosh" target="_blank" >View My Portfolio →</BtnGhost>
          </HBtns>
          <StatsRow>
            {[
              { n: "50+", l: "Projects Delivered" },
              { n: "30+", l: "Happy Clients" },
              { n: "5+", l: "Years Freelancing" },
              { n: "10+", l: "Tech Stacks" },
            ].map((s, i) => (
              <StatPill key={i} $d={`${3.2 + i * .3}s`}>
                <StatN>{s.n}</StatN>
                <StatL>{s.l}</StatL>
              </StatPill>
            ))}
          </StatsRow>
        </div>
        <WaveDivider>
          <WaveTrack>
            {[0, 1].map(k => (
              <svg key={k} viewBox="0 0 1440 70" preserveAspectRatio="none" fill="none">
                <path d="M0,35 C360,70 1080,0 1440,35 L1440,70 L0,70 Z" fill="#0b0f1a" />
              </svg>
            ))}
          </WaveTrack>
        </WaveDivider>
      </HeroWrap>

      {/* ── TICKER ── */}
      <TickerWrap>
        <TickerTrack>
          {[...tickerItems, ...tickerItems].map((t, i) => <TickerItem key={i}>{t}</TickerItem>)}
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
                  { l: "React JS / Next.js", p: 95 },
                  { l: "Angular (v6–v20)", p: 90 },
                  { l: "Node.js / Express", p: 87 },
                  { l: "Python / Django", p: 80 },
                  { l: "AWS & DevOps", p: 78 },
                  { l: "Generative & Agentic AI", p: 75 },
                ].map(s => (
                  <SBar key={s.l}>
                    <SBarLabel><span>{s.l}</span><span>{s.p}%</span></SBarLabel>
                    <SBarTrack><SBarFill $p={s.p} /></SBarTrack>
                  </SBar>
                ))}
              </SkillBlock>
            </AvatarBox>
            <div>
              <SLabel>Who I Am</SLabel>
              <STitle>About <span>Me</span></STitle>
              <Bar />
              <SSub style={{ marginTop: 16, marginBottom: 24 }}>
                I'm <strong style={{ color: "#f1f5f9" }}>Santosh Pal</strong>, a freelance Full Stack Developer
                with 5+ years of experience delivering React, Angular, Node.js, Python, AWS and AI-powered
                solutions for clients across India and globally.
              </SSub>
              <InfoGrid>
                {[
                  { e: "👤", l: "Name", v: "Santosh Pal" },
                  { e: "💼", l: "Role", v: "Freelance Developer" },
                  { e: "🏢", l: "Brand", v: "Vihaan Tech" },
                  { e: "📞", l: "Phone/WhatsApp", v: "+91 8839102688" },
                  { e: "📧", l: "Email", v: "santoshpal9816@gmail.com" },
                  { e: "🌐", l: "Portfolio", v: "Santosh Pal" },
                  { e: "🤖", l: "Speciality", v: "React · Angular · AI" },
                  { e: "✅", l: "Availability", v: "Open for Projects" },
                ].map(i => (
                  <ICard key={i.l}>
                    <IEmoji>{i.e}</IEmoji>
                    <IText><small>{i.l}</small><strong>{i.v}</strong></IText>
                  </ICard>
                ))}
              </InfoGrid>
              <div style={{ marginTop: 26, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <BtnGrad  onClick={() => go("portfolio")}>View Portfolio ↗</BtnGrad>
                <BtnGhost onClick={() => go("contact")}>Hire Me →</BtnGhost>
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
          <Bar center />
          <SSub center style={{ marginTop: 14 }}>
            Angular v6–v20 · React JS · Node.js · Python · Django · AWS · Generative AI · Agentic AI
          </SSub>
          <TechGroupWrap>
            {TECH_GROUPS.map(g => (
              <TechGroup key={g.label}>
                <TGroupHead>
                  <TGroupIcon $rgb={g.rgb}>{g.icon}</TGroupIcon>
                  <h3>{g.label}</h3>
                  <TGroupLine />
                </TGroupHead>
                <TechPills>
                  {g.techs.map(t => (
                    <TechPill key={t.name} $rgb={t.rgb} $hov={`rgba(${t.rgb},.45)`}>
                      <PillIcon>{t.icon}</PillIcon>
                      <PillText><strong>{t.name}</strong><small>{t.sub}</small></PillText>
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
          <Bar center />
          <SSub center style={{ marginTop: 14 }}>Hire me directly — no agency markup.</SSub>
          <SvcGrid>
            {SERVICES.map(s => (
              <SvcCard key={s.title}>
                <SvcIco $rgb={s.rgb}>{s.icon}</SvcIco>
                <SvcTitle>{s.title}</SvcTitle>
                <SvcDesc>{s.desc}</SvcDesc>
                <SvcTags>{s.tags.map(t => <STg key={t}>{t}</STg>)}</SvcTags>
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
          <Bar center />
          <PortGrid>
            {PORTFOLIO.map(p => (
              <PortCard key={p.title}>
                <div style={{ position: "relative" }}>
                  <PortThumb $bg={p.bg}>{p.emoji}</PortThumb>
                  <PortBadge>{p.label}</PortBadge>
                </div>
                <PortBody>
                  <PortTitle>{p.title}</PortTitle>
                  <PortDesc>{p.desc}</PortDesc>
                  <SvcTags style={{ marginTop: 12, marginBottom: 0 }}>
                    {p.tech.map(t => <STg key={t}>{t}</STg>)}
                  </SvcTags>
                </PortBody>
                <PortFoot>
                  {p.link && <PortBtn href={p.link} target="_blank">🔗 Live Demo</PortBtn>}
                  <PortBtn>📁 Case Study</PortBtn>
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
          <Bar center />
          <ProcWrap>
            {PROCESS.map(p => (
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
          <Bar center />
          <PlatformGrid>
            <PlatCard $border="rgba(29,191,115,.2)" $hov="rgba(29,191,115,.5)" $glow="rgba(29,191,115,.06)">
              <PlatLogo $bg="linear-gradient(135deg,#1dbf73,#18a660)" $shadow="rgba(29,191,115,.35)">🟢</PlatLogo>
              <PlatName>Fiverr</PlatName>
              <PlatSub>5★ rated gigs — React, Angular, AI, Full Stack. Starts from ₹2,000.</PlatSub>
              <PlatStats>
                <PStat $c="#1dbf73"><strong>50+</strong><small>ORDERS</small></PStat>
                <PStat $c="#f59e0b"><strong>5.0 ★</strong><small>RATING</small></PStat>
                <PStat $c="#22d3ee"><strong>Level 2</strong><small>SELLER</small></PStat>
              </PlatStats>
              <PlatLink $bg="linear-gradient(135deg,#1dbf73,#18a660)" href="https://www.fiverr.com/" target="_blank" rel="noopener">
                🟢 View Fiverr Profile ↗
              </PlatLink>
              <PlatBadges>
                {["React JS", "Angular", "Node.js", "AI Apps", "Bug Fixes"].map(b => (
                  <PBadge key={b} $rgb="29,191,115" $col="#1dbf73">{b}</PBadge>
                ))}
              </PlatBadges>
            </PlatCard>

            <PlatCard $border="rgba(20,176,82,.2)" $hov="rgba(20,176,82,.5)" $glow="rgba(20,176,82,.06)">
              <PlatLogo $bg="linear-gradient(135deg,#14b052,#0e8a40)" $shadow="rgba(20,176,82,.35)">🔵</PlatLogo>
              <PlatName>Upwork</PlatName>
              <PlatSub>Top Rated · milestone or hourly · enterprise-grade projects.</PlatSub>
              <PlatStats>
                <PStat $c="#14b052"><strong>30+</strong><small>JOBS DONE</small></PStat>
                <PStat $c="#f59e0b"><strong>Top Rated</strong><small>BADGE</small></PStat>
                <PStat $c="#22d3ee"><strong>JSS 95%</strong><small>SUCCESS</small></PStat>
              </PlatStats>
              <PlatLink $bg="linear-gradient(135deg,#14b052,#0e8a40)" href="https://www.upwork.com/" target="_blank" rel="noopener">
                🔵 View Upwork Profile ↗
              </PlatLink>
              <PlatBadges>
                {["Full Stack", "Microservices", "AWS", "Python", "AI/ML"].map(b => (
                  <PBadge key={b} $rgb="20,176,82" $col="#14b052">{b}</PBadge>
                ))}
              </PlatBadges>
            </PlatCard>
          </PlatformGrid>
        </Wrap>
      </Section>

      {/* ── WHY HIRE ME ── */}
      <Section alt>
        <Wrap>
          <SLabel center>Why Me</SLabel>
          <STitle center>Why Choose a <span>Freelancer?</span></STitle>
          <Bar center />
          <WhyGrid>
            {WHY.map(w => (
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
          <Bar center />
          <CGrid>
            <div>
              <STitle style={{ fontSize: "1.4rem", marginBottom: 20 }}>Get In <span>Touch</span></STitle>
              {[
                { i: "📞", l: "Phone / WhatsApp", v: "+91 8839102688", h: "tel:+918839102688" },
                { i: "📧", l: "Email", v: "santoshpal9816@gmail.com", h: "mailto:santoshpal9816@gmail.com" },
                { i: "🌐", l: "Portfolio", v: "Santosh Pal", h: "/user/santosh" },
                { i: "🟢", l: "Fiverr", v: "Available for gigs", h: "https://www.fiverr.com/" },
                { i: "🔵", l: "Upwork", v: "Top Rated • JSS 95%", h: "https://www.upwork.com/" },
              ].map(c => (
                <CInfoCard key={c.l}>
                  <CIco>{c.i}</CIco>
                  <CText><small>{c.l}</small><a href={c.h} target="_blank" rel="noopener">{c.v}</a></CText>
                </CInfoCard>
              ))}
              <TipsBox>
                ⏱ Response: <span>within 2 hours</span><br />
                💳 Payment: <span>50% advance · 50% on delivery</span><br />
                📦 Large projects: <span>milestone-based</span><br />
                🌍 Clients: <span>India · USA · UK · UAE · Canada</span>
              </TipsBox>
            </div>
            <FormCard>
              <SLabel>Send A Message</SLabel>
              <STitle style={{ fontSize: "1.3rem", marginBottom: 22 }}>Tell Me About Your <span>Project</span></STitle>
              <FormRow2 $c="1fr 1fr">
                <FGroup>
                  <FLabel>Your Name *</FLabel>
                  <FInput name="name" value={form.name} onChange={upd} placeholder="Full name" />
                </FGroup>
                <FGroup>
                  <FLabel>Email Address *</FLabel>
                  <FInput name="email" type="email" value={form.email} onChange={upd} placeholder="you@email.com" />
                </FGroup>
              </FormRow2>
              <FormRow2 $c="1fr 1fr">
                <FGroup>
                  <FLabel>WhatsApp Number</FLabel>
                  <FInput name="phone" value={form.phone} onChange={upd} placeholder="+91 XXXXX XXXXX" />
                </FGroup>
                <FGroup>
                  <FLabel>Service Required</FLabel>
                  <FInput name="service" value={form.service} onChange={upd} placeholder="e.g. React + AI App" />
                </FGroup>
              </FormRow2>
              <FGroup>
                <FLabel>Project Details *</FLabel>
                <FTextarea name="message" value={form.message} onChange={upd}
                  placeholder="Describe your project — stack, deadline, budget..." />
              </FGroup>
              <SendBtn onClick={submit}>🚀 SEND PROJECT BRIEF</SendBtn>
              {sent && <OkMsg>✅ Received! I'll reply within 2 hours.</OkMsg>}
            </FormCard>
          </CGrid>
        </Wrap>
      </Section>

      {/* ── FOOTER ── */}
      <Foot>
        <FootL>© 2026 <strong>Santosh Pal</strong> — Freelance Developer · <span>Vihaan Tech</span></FootL>
        <FootLinks>
          {navItems.map(s => (
            <a key={s} onClick={() => go(s)}>{s.charAt(0).toUpperCase() + s.slice(1)}</a>
          ))}
        </FootLinks>
      </Foot>
    </ThemeProvider>
  );
}