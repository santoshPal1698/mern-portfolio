import { useState, useEffect } from "react";
import { content } from "./content";
import { useLocation } from "react-router-dom";
import { whatsappMsg } from "../../services/master.service";
import GlobalStyles  from "./VihanStyles";

const particles = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  size: Math.random() * 5 + 3,
  left: Math.random() * 100,
  delay: Math.random() * 15,
  duration: Math.random() * 12 + 10,
}));


export default function DhruvViihaanTours() {

 const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/dv-travels") {
      document.body.classList.add("hide-wa");
    } else {
      document.body.classList.remove("hide-wa");
    }
  }, [location.pathname]);
    
  const [lang, setLang] = useState("en");
  const [animKey, setAnimKey] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    destination: "",
    date: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const t = content[lang];

  const switchLang = (l) => {
    if (l === lang) return;
    setLang(l);
    setAnimKey((k) => k + 1);
  };

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });


  const handleSubmit = () => {
    if (!formData.name || !formData.phone) return;
    const msg = whatsappMsg(formData);
    console.log("WhatsApp2 Message:", msg);
    const phoneNumber = "918839102688";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`;
    window.open(whatsappURL, "_blank");
    // Reset form
    setFormData({
      name: "",
      phone: "",
      destination: "",
      date: "",
      message: "",
    });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div>
       <GlobalStyles />

      {/* ── LANGUAGE TOGGLE ── */}
      <div className="lang-toggle-wrap">
        <div className="lang-toggle">
          <button
            className={`lang-opt${lang === "en" ? " active" : ""}`}
            onClick={() => switchLang("en")}
          >
            🇬🇧 EN
          </button>
          <div className="lang-divider" />
          <button
            className={`lang-opt${lang === "hi" ? " active" : ""}`}
            onClick={() => switchLang("hi")}
          >
            🇮🇳 हिंदी
          </button>
        </div>
      </div>

      {/* ── CALL STRIP ── */}
      <div className="call-strip">
        {t.callStrip}&nbsp;<a href="tel:6265370030">6265370030</a>&nbsp;
        {t.callStrip2}
      </div>

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <div>
          <div className="nav-logo">
            <span>{t.brandMain}</span> {t.brandSub}
          </div>
          <span className="nav-sub">{t.brandSubScript}</span>
        </div>
        <ul className="nav-links">
          {t.navLinks.map((label, i) => (
            <li key={i}>
              <a
                href={`#${t.navIds[i]}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(t.navIds[i]);
                }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="nav-cta"
          onClick={() => window.open("tel:6265370030")}
        >
          {t.navCta}
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" id="home">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
        <svg className="hero-mandala" viewBox="0 0 400 400" fill="none">
          <circle cx="200" cy="200" r="190" stroke="#D4A017" strokeWidth="1" />
          <circle
            cx="200"
            cy="200"
            r="155"
            stroke="#D4A017"
            strokeWidth="0.5"
          />
          {Array.from({ length: 24 }).map((_, i) => (
            <line
              key={i}
              x1="200"
              y1="12"
              x2="200"
              y2="52"
              stroke="#D4A017"
              strokeWidth="1"
              transform={`rotate(${i * 15} 200 200)`}
            />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <ellipse
              key={i}
              cx="200"
              cy="78"
              rx="20"
              ry="40"
              fill="none"
              stroke="#D4A017"
              strokeWidth="0.5"
              transform={`rotate(${i * 30} 200 200)`}
            />
          ))}
        </svg>
        <svg className="hero-mandala2" viewBox="0 0 400 400" fill="none">
          {Array.from({ length: 8 }).map((_, i) => (
            <rect
              key={i}
              x="158"
              y="38"
              width="84"
              height="84"
              rx="10"
              fill="none"
              stroke="#FF6B00"
              strokeWidth="1"
              transform={`rotate(${i * 45} 200 200)`}
            />
          ))}
        </svg>

        <div key={`badge-${animKey}`} className="hero-badge lang-anim">
          {t.heroBadge}
        </div>
        <h1 key={`title-${animKey}`} className="hero-title lang-anim">
          <span className="accent">{t.heroTitle1}</span>
          <br />
          {t.heroTitle2}
        </h1>
        <p key={`sub-${animKey}`} className="hero-subtitle lang-anim">
          {t.heroSubtitle}
        </p>
        <p key={`desc-${animKey}`} className="hero-desc lang-anim">
          {t.heroDesc}
        </p>
        <div key={`btns-${animKey}`} className="hero-buttons lang-anim">
          <button className="btn-primary" onClick={() => scrollTo("contact")}>
            {t.heroBtnPrimary}
          </button>
          <button
            className="btn-outline"
            onClick={() => scrollTo("destinations")}
          >
            {t.heroBtnOutline}
          </button>
        </div>
        <div key={`stats-${animKey}`} className="hero-stats lang-anim">
          {t.stats.map(([num, label], i) => (
            <div key={i} className="stat">
              <span className="stat-num">{num}</span>
              <span className="stat-label">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── DESTINATIONS ── */}
      <section className="section section-alt" id="destinations">
        <div className="section-header">
          <div className="section-tag">{t.destTag}</div>
          <h2 className="section-title">
            {t.destTitle} <span className="gold">{t.destTitleGold}</span>
          </h2>
          <div className="divider">
            <div className="divider-line" />
            <span className="divider-icon">🕉️</span>
            <div className="divider-line" />
          </div>
          <p className="section-desc">{t.destDesc}</p>
        </div>
        <div className="destinations-grid">
          {t.destinations.map((d, i) => (
            <div key={i} className="dest-card">
              <div className="dest-card-img">
                <div className="dest-card-bg" style={{ background: d.bg }}>
                  <div className="dest-emoji">{d.emoji}</div>
                </div>
                <div className="dest-overlay" />
                <div className="dest-label">{d.label}</div>
                <div className="dest-tag">{d.tag}</div>
              </div>
              <div className="dest-body">
                <h3>{d.title}</h3>
                <p>{d.desc}</p>
                <div className="dest-highlights">
                  {d.highlights.map((h, j) => (
                    <span key={j} className="highlight-chip">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── KHAJRANA TOP 10 ── */}
      <section className="section section-dark" id="khajrana">
        <div className="section-header">
          <div className="section-tag" style={{ color: "#FFD700" }}>
            {t.khajranaTag}
          </div>
          <h2 className="section-title" style={{ color: "#FFF8EE" }}>
            {t.khajranaTitle}{" "}
            <span className="gold">{t.khajranaTitleGold}</span>
          </h2>
          <div className="divider">
            <div
              className="divider-line"
              style={{ background: "rgba(212,160,23,0.4)" }}
            />
            <span className="divider-icon">🙏</span>
            <div
              className="divider-line"
              style={{ background: "rgba(212,160,23,0.4)" }}
            />
          </div>
          <p className="section-desc">{t.khajranaDesc}</p>
        </div>
        <div className="places-grid">
          {t.places.map((p, i) => (
            <div key={i} className="place-card">
              <div className="place-num">{p.num}</div>
              <span className="place-icon">{p.icon}</span>
              <div className="place-name">{p.name}</div>
              <div className="place-desc">{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="section section-alt" id="why">
        <div className="section-header">
          <div className="section-tag">{t.whyTag}</div>
          <h2 className="section-title">
            {t.whyTitle} <span className="gold">{t.whyTitleGold}</span>
          </h2>
          <div className="divider">
            <div className="divider-line" />
            <span className="divider-icon">⭐</span>
            <div className="divider-line" />
          </div>
        </div>
        <div className="why-grid">
          {t.why.map((w, i) => (
            <div key={i} className="why-card">
              <span className="why-icon">{w.icon}</span>
              <div className="why-title">{w.title}</div>
              <div className="why-desc">{w.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section
        className="section"
        id="packages"
        style={{ background: "#FFF8EE" }}
      >
        <div className="section-header">
          <div className="section-tag">{t.pkgTag}</div>
          <h2 className="section-title">
            {t.pkgTitle} <span className="gold">{t.pkgTitleGold}</span>
          </h2>
          <div className="divider">
            <div className="divider-line" />
            <span className="divider-icon">🗺️</span>
            <div className="divider-line" />
          </div>
        </div>
        <div className="packages-grid">
          {t.packages.map((pkg, i) => (
            <div
              key={i}
              className={`pkg-card${pkg.featured ? " featured" : ""}`}
            >
              {pkg.badge && <div className="pkg-badge">{pkg.badge}</div>}
              <div className="pkg-icon">{pkg.icon}</div>
              <div className="pkg-title">{pkg.title}</div>
              <div className="pkg-price">{pkg.price}</div>
              <ul className="pkg-features">
                {pkg.features.map((f, j) => (
                  <li key={j}>{f}</li>
                ))}
              </ul>
              <button
                className="btn-primary"
                style={{ width: "100%" }}
                onClick={() => scrollTo("contact")}
              >
                {t.pkgBookBtn}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="section section-alt" id="gallery">
        <div className="section-header">
          <div className="section-tag">{t.galleryTag}</div>
          <h2 className="section-title">
            {t.galleryTitle} <span className="gold">{t.galleryTitleGold}</span>
          </h2>
          <div className="divider">
            <div className="divider-line" />
            <span className="divider-icon">📷</span>
            <div className="divider-line" />
          </div>
        </div>
        <div className="gallery-grid">
          {t.gallery.map((g, i) => (
            <div key={i} className="gallery-item">
              <div className="gallery-inner" style={{ background: g.bg }}>
                {g.emoji}
              </div>
              <div className="gallery-caption">{g.caption}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section" style={{ background: "#FFF4E0" }}>
        <div className="section-header">
          <div className="section-tag">{t.testiTag}</div>
          <h2 className="section-title">
            {t.testiTitle} <span className="gold">{t.testiTitleGold}</span>
          </h2>
          <div className="divider">
            <div className="divider-line" />
            <span className="divider-icon">💬</span>
            <div className="divider-line" />
          </div>
        </div>
        <div className="testimonials-grid">
          {t.testimonials.map((te, i) => (
            <div key={i} className="testimonial-card">
              <div className="stars">{"★".repeat(te.stars)}</div>
              <p className="testimonial-text">"{te.text}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">{te.avatar}</div>
                <div>
                  <div className="author-name">{te.name}</div>
                  <div className="author-city">{te.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="contact-section" id="contact">
        <div className="contact-inner">
          <div className="contact-info">
            <div
              className="section-tag"
              style={{ color: "#FFD700", textAlign: "left" }}
            >
              {t.contactTag}
            </div>
            <h2>
              {t.contactTitle} <span>{t.contactTitleGold}</span>
            </h2>
            <p>{t.contactDesc}</p>
            {t.contactItems.map((c, i) => (
              <div key={i} className="contact-item">
                <div className="contact-icon">{c.icon}</div>
                <div>
                  <div className="contact-label">{c.label}</div>
                  <div className="contact-value">{c.value}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="contact-form">
            <h3>{t.formTitle}</h3>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">{t.formName}</label>
                <input
                  className="form-input"
                  placeholder={t.formNamePh}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
                  <div className="form-group">
              <label className="form-label">{t.formPhone}</label>
              <input
                type="tel"
                className="form-input"
                placeholder={t.formPhonePh}
                maxLength={10}
                value={formData.phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ""); // only digits
                  setFormData({ ...formData, phone: value });
                }}
              />
            </div>
            </div>
            <div className="form-group">
              <label className="form-label">{t.formDest}</label>
              <select
                className="form-select"
                value={formData.destination}
                onChange={(e) =>
                  setFormData({ ...formData, destination: e.target.value })
                }
              >
                <option value="">{t.formDestPh}</option>
                {t.formDestOpts.map((o, i) => (
                  <option key={i}>{o}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">{t.formDate}</label>
              <input
                className="form-input"
                type="datetime-local"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label className="form-label">{t.formMsg}</label>
              <textarea
                className="form-textarea"
                placeholder={t.formMsgPh}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>
            <button className="submit-btn" onClick={handleSubmit}>
              {submitted ? t.formSubmitted : t.formSubmit}
            </button>
            <div
              style={{
                marginTop: 11,
                textAlign: "center",
                color: "rgba(255,248,238,0.45)",
                fontSize: "0.82rem",
                fontFamily: "'Hind',sans-serif",
              }}
            >
              {t.formOr}&nbsp;
              <a
                href="tel:6265370030"
                style={{
                  color: "#FFD700",
                  textDecoration: "none",
                  fontWeight: 700,
                }}
              >
                6265370030
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <div className="footer-logo">
              <span>{t.brandMain}</span> {t.brandSub}
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                color: "rgba(255,248,238,0.38)",
                fontFamily: "'Hind',sans-serif",
                marginTop: 3,
              }}
            >
              {t.brandSubScript}
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                color: "#D4A017",
                fontFamily: "'Hind',sans-serif",
                fontSize: "0.81rem",
                marginBottom: 3,
              }}
            >
              {t.footerContact}
            </div>
            <a
              href="tel:6265370030"
              style={{
                color: "#FFD700",
                fontFamily: "'Playfair Display',serif",
                fontSize: "1.15rem",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              📞 6265370030
            </a>
          </div>
          <div className="footer-links">
            {t.footerLinks.map((l, i) => (
              <a
                key={i}
                href="#destinations"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("destinations");
                }}
              >
                {l}
              </a>
            ))}
          </div>
          <div className="footer-copy">
            {t.footerCopy}
            <br />
            <span style={{ fontSize: "0.76rem", opacity: 0.42 }}>
              {t.footerCopy2}
            </span>
          </div>
        </div>
      </footer>

      {/* ── FABs ── */}
      <button
        className="whatsapp-fab"
        title="WhatsApp"
        onClick={() => window.open("https://wa.me/916265370030", "_blank")}
      >
        💬
      </button>
    </div>
  );
}
