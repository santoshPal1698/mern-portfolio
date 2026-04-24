import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
 @import url('https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Hindi:ital@0;1&family=Hind:wght@300;400;500;600;700&family=Playfair+Display:wght@700;900&family=Rajdhani:wght@500;600;700&display=swap');

  :root {
    --saffron:#FF6B00; --deep-saffron:#E55A00; --gold:#D4A017;
    --bright-gold:#FFD700; --maroon:#6B0F1A; --deep-maroon:#3D0408;
    --cream:#FFF8EE; --light-cream:#FFFDF8; --dark:#1A0A00; --text-muted:#8B6914;
  }
  *{margin:0;padding:0;box-sizing:border-box;}
  html{scroll-behavior:smooth;}
  body{font-family:'Hind',sans-serif;background:var(--light-cream);color:var(--dark);overflow-x:hidden;}

  /* LANGUAGE TOGGLE */
  .lang-toggle-wrap{
    position:fixed;top:5px;right:160px;z-index:2000;
  }
  .lang-toggle{
    display:flex;align-items:center;gap:0;
    background:rgba(61,4,8,0.92);
    border:1.5px solid var(--gold);border-radius:30px;
    overflow:hidden;cursor:pointer;
    box-shadow:0 4px 18px rgba(0,0,0,0.3);
  }
  .lang-opt{
    padding:7px 16px;font-family:'Hind',sans-serif;
    font-size:0.82rem;font-weight:700;letter-spacing:1px;
    color:rgba(255,248,238,0.55);border:none;background:transparent;
    cursor:pointer;transition:all 0.3s ease;white-space:nowrap;
  }
  .lang-opt.active{
    background:linear-gradient(135deg,var(--saffron),var(--gold));
    color:white;border-radius:26px;
  }
  .lang-divider{width:1px;height:22px;background:rgba(212,160,23,0.4);}

  /* CALL STRIP */
  .call-strip{
    background:linear-gradient(135deg,var(--saffron),var(--gold));
    padding:9px 40px;text-align:center;
    font-family:'Hind',sans-serif;font-size:0.95rem;font-weight:600;color:white;letter-spacing:0.5px;
    position:relative;z-index:900;
  }
  .call-strip a{color:white;text-decoration:none;font-weight:800;font-size:1.05rem;}

  /* NAVBAR */
  .navbar{
    position:sticky;top:0;left:0;right:0;z-index:1000;
    background:rgba(61,4,8,0.97);backdrop-filter:blur(12px);
    border-bottom:2px solid var(--gold);padding:10px 40px;
    display:flex;align-items:center;justify-content:space-between;
  }
  .nav-logo{font-family:'Tiro Devanagari Hindi',serif;color:var(--bright-gold);font-size:1.4rem;line-height:1.25;}
  .nav-logo span{color:var(--saffron);}
  .nav-sub{font-family:'Rajdhani',sans-serif;font-size:0.6rem;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,215,0,0.52);display:block;}
  .nav-links{display:flex;gap:22px;list-style:none;}
  .nav-links a{color:var(--cream);font-family:'Hind',sans-serif;font-size:0.93rem;font-weight:500;text-decoration:none;transition:color 0.3s;position:relative;}
  .nav-links a::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:2px;background:var(--gold);transition:width 0.3s;}
  .nav-links a:hover{color:var(--bright-gold);}
  .nav-links a:hover::after{width:100%;}
  .nav-cta{background:linear-gradient(135deg,var(--saffron),var(--gold));color:white;border:none;padding:9px 18px;font-family:'Hind',sans-serif;font-weight:700;font-size:0.88rem;border-radius:4px;cursor:pointer;transition:all 0.25s;}
  .nav-cta:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(255,107,0,0.4);}

  /* HERO */
  .hero{
    min-height:100vh;
    background:linear-gradient(135deg,var(--deep-maroon) 0%,var(--maroon) 40%,#8B2500 70%,var(--saffron) 100%);
    position:relative;overflow:hidden;
    display:flex;align-items:center;justify-content:center;
    flex-direction:column;text-align:center;padding:90px 20px 60px;
  }

  /* ANIMATIONS */
  @keyframes spin{from{transform:translate(-50%,-50%) rotate(0deg);}to{transform:translate(-50%,-50%) rotate(360deg);}}
  @keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-14px);}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(34px);}to{opacity:1;transform:translateY(0);}}
  @keyframes fadeDown{from{opacity:0;transform:translateY(-28px);}to{opacity:1;transform:translateY(0);}}
  @keyframes shimmer{0%,100%{opacity:1;}50%{opacity:0.52;}}
  @keyframes pulse{0%,100%{transform:scale(1);}50%{transform:scale(1.06);}}
  @keyframes glow{0%,100%{text-shadow:0 0 16px rgba(255,215,0,0.22);}50%{text-shadow:0 0 38px rgba(255,215,0,0.85),0 0 58px rgba(255,107,0,0.38);}}
  @keyframes borderGlow{0%,100%{box-shadow:0 0 12px rgba(212,160,23,0.22);}50%{box-shadow:0 0 28px rgba(212,160,23,0.7),0 0 48px rgba(255,107,0,0.22);}}
  @keyframes particleFloat{0%{transform:translateY(100vh) rotate(0deg);opacity:0;}10%{opacity:1;}90%{opacity:1;}100%{transform:translateY(-80px) rotate(720deg);opacity:0;}}
  @keyframes langSwitch{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}
  .lang-anim{animation:langSwitch 0.4s ease both;}

  .hero-mandala{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:680px;height:680px;opacity:0.08;animation:spin 60s linear infinite;}
  .hero-mandala2{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:430px;height:430px;opacity:0.06;animation:spin 38s linear infinite reverse;}
  .particle{position:absolute;border-radius:50%;background:radial-gradient(circle,var(--bright-gold),transparent);animation:particleFloat linear infinite;pointer-events:none;}

  .hero-badge{display:inline-block;background:rgba(255,215,0,0.13);border:1px solid rgba(255,215,0,0.4);color:var(--bright-gold);padding:8px 24px;border-radius:30px;font-family:'Hind',sans-serif;font-size:0.88rem;font-weight:600;letter-spacing:1.5px;margin-bottom:20px;animation:fadeDown 1s ease both,shimmer 3s ease infinite 2s;}
  .hero-title{font-family:'Tiro Devanagari Hindi',serif;font-size:clamp(2.4rem,6vw,5.2rem);color:var(--cream);line-height:1.2;margin-bottom:10px;animation:fadeUp 1s ease 0.3s both;}
  .hero-title .accent{color:var(--bright-gold);animation:glow 3s ease infinite;}
  .hero-subtitle{font-family:'Hind',sans-serif;font-size:clamp(1rem,2.2vw,1.55rem);color:rgba(255,248,238,0.78);font-weight:300;font-style:italic;margin-bottom:26px;animation:fadeUp 1s ease 0.6s both;}
  .hero-desc{max-width:570px;margin:0 auto 42px;font-size:1.05rem;color:rgba(255,248,238,0.7);line-height:1.9;font-family:'Hind',sans-serif;animation:fadeUp 1s ease 0.9s both;}
  .hero-buttons{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;animation:fadeUp 1s ease 1.2s both;}
  .btn-primary{background:linear-gradient(135deg,var(--saffron),var(--gold));color:white;padding:14px 36px;border:none;font-family:'Hind',sans-serif;font-weight:700;font-size:0.97rem;letter-spacing:1px;cursor:pointer;border-radius:4px;transition:all 0.3s;box-shadow:0 8px 22px rgba(255,107,0,0.38);}
  .btn-primary:hover{transform:translateY(-3px);box-shadow:0 14px 32px rgba(255,107,0,0.5);}
  .btn-outline{background:transparent;border:2px solid var(--gold);color:var(--bright-gold);padding:12px 36px;font-family:'Hind',sans-serif;font-weight:700;font-size:0.97rem;letter-spacing:1px;cursor:pointer;border-radius:4px;transition:all 0.3s;}
  .btn-outline:hover{background:rgba(212,160,23,0.14);transform:translateY(-3px);}

  .hero-stats{display:flex;gap:40px;justify-content:center;flex-wrap:wrap;margin-top:52px;animation:fadeUp 1s ease 1.5s both;}
  .stat{text-align:center;}
  .stat-num{font-family:'Playfair Display',serif;font-size:2.3rem;font-weight:900;color:var(--bright-gold);display:block;}
  .stat-label{font-family:'Hind',sans-serif;font-size:0.8rem;color:rgba(255,248,238,0.58);}

  /* SECTIONS */
  .section{padding:90px 40px;}
  .section-alt{background:linear-gradient(180deg,var(--cream),#FFF4E0);}
  .section-dark{background:linear-gradient(135deg,var(--deep-maroon),var(--maroon));color:var(--cream);}
  .section-header{text-align:center;margin-bottom:56px;}
  .section-tag{display:inline-block;font-family:'Hind',sans-serif;font-size:0.78rem;letter-spacing:3px;color:var(--saffron);margin-bottom:9px;font-weight:700;}
  .section-title{font-family:'Tiro Devanagari Hindi',serif;font-size:clamp(1.7rem,3.6vw,2.7rem);line-height:1.3;margin-bottom:13px;}
  .section-title .gold{color:var(--gold);}
  .section-desc{font-size:1.05rem;color:var(--text-muted);max-width:520px;margin:0 auto;line-height:1.9;font-family:'Hind',sans-serif;}
  .section-dark .section-desc{color:rgba(255,248,238,0.65);}
  .divider{display:flex;align-items:center;gap:13px;justify-content:center;margin:13px 0;}
  .divider-line{flex:1;max-width:76px;height:1px;background:var(--gold);}
  .divider-icon{color:var(--gold);font-size:1.1rem;}

  /* DESTINATIONS */
  .destinations-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:28px;max-width:1180px;margin:0 auto;}
  .dest-card{border-radius:13px;overflow:hidden;cursor:pointer;transition:transform 0.4s,box-shadow 0.4s;box-shadow:0 10px 36px rgba(0,0,0,0.1);}
  .dest-card:hover{transform:translateY(-8px);box-shadow:0 24px 56px rgba(0,0,0,0.18);}
  .dest-card-img{height:265px;position:relative;overflow:hidden;}
  .dest-card-bg{width:100%;height:100%;transition:transform 0.6s;display:flex;align-items:center;justify-content:center;}
  .dest-card:hover .dest-card-bg{transform:scale(1.06);}
  .dest-emoji{font-size:4.8rem;filter:drop-shadow(0 4px 13px rgba(0,0,0,0.28));animation:float 4s ease infinite;}
  .dest-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.7),transparent 60%);}
  .dest-label{position:absolute;bottom:13px;left:15px;font-family:'Tiro Devanagari Hindi',serif;color:white;font-size:1.45rem;}
  .dest-tag{position:absolute;top:13px;right:13px;background:var(--saffron);color:white;font-family:'Hind',sans-serif;font-size:0.73rem;font-weight:700;letter-spacing:1.3px;padding:5px 13px;border-radius:20px;}
  .dest-body{padding:21px;background:white;}
  .dest-body h3{font-family:'Tiro Devanagari Hindi',serif;font-size:1.15rem;margin-bottom:7px;color:var(--deep-maroon);}
  .dest-body p{color:#666;line-height:1.8;font-size:0.95rem;margin-bottom:13px;font-family:'Hind',sans-serif;}
  .dest-highlights{display:flex;gap:6px;flex-wrap:wrap;}
  .highlight-chip{background:#FFF4E0;color:var(--saffron);font-family:'Hind',sans-serif;font-size:0.76rem;font-weight:600;padding:4px 11px;border-radius:20px;border:1px solid rgba(255,107,0,0.2);}

  /* KHAJRANA */
  .places-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(265px,1fr));gap:20px;max-width:1180px;margin:0 auto;}
  .place-card{background:rgba(255,255,255,0.04);border:1px solid rgba(212,160,23,0.22);border-radius:12px;padding:24px 20px;transition:all 0.4s;position:relative;overflow:hidden;}
  .place-card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(212,160,23,0.08),transparent);opacity:0;transition:opacity 0.3s;}
  .place-card:hover{transform:translateY(-5px);border-color:var(--gold);animation:borderGlow 2s ease infinite;}
  .place-card:hover::before{opacity:1;}
  .place-num{font-family:'Playfair Display',serif;font-size:3rem;font-weight:900;color:rgba(212,160,23,0.17);line-height:1;margin-bottom:5px;}
  .place-icon{font-size:1.8rem;margin-bottom:9px;display:block;}
  .place-name{font-family:'Tiro Devanagari Hindi',serif;font-size:1.1rem;color:var(--bright-gold);margin-bottom:6px;}
  .place-desc{color:rgba(255,248,238,0.6);font-size:0.9rem;line-height:1.75;font-family:'Hind',sans-serif;}

  /* PACKAGES */
  .packages-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:28px;max-width:1080px;margin:0 auto;}
  .pkg-card{background:white;border-radius:15px;padding:36px 28px;text-align:center;position:relative;transition:all 0.4s;box-shadow:0 10px 36px rgba(0,0,0,0.08);border:2px solid transparent;}
  .pkg-card.featured{border-color:var(--gold);background:linear-gradient(135deg,var(--deep-maroon),var(--maroon));color:var(--cream);animation:borderGlow 3s ease infinite;transform:scale(1.02);}
  .pkg-card:hover{transform:translateY(-6px) scale(1.01);box-shadow:0 20px 55px rgba(0,0,0,0.14);}
  .pkg-card.featured:hover{transform:translateY(-6px) scale(1.03);}
  .pkg-badge{position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,var(--saffron),var(--gold));color:white;padding:5px 17px;border-radius:20px;font-family:'Hind',sans-serif;font-size:0.74rem;font-weight:700;letter-spacing:1.5px;}
  .pkg-icon{font-size:2.7rem;margin-bottom:13px;animation:float 3s ease infinite;}
  .pkg-title{font-family:'Tiro Devanagari Hindi',serif;font-size:1.4rem;margin-bottom:6px;color:var(--deep-maroon);}
  .pkg-card.featured .pkg-title{color:var(--bright-gold);}
  .pkg-price{font-family:'Hind',sans-serif;font-size:0.97rem;font-weight:600;color:var(--saffron);margin-bottom:20px;}
  .pkg-card.featured .pkg-price{color:rgba(255,248,238,0.68);}
  .pkg-features{list-style:none;margin-bottom:26px;text-align:left;}
  .pkg-features li{padding:6px 0;border-bottom:1px solid rgba(0,0,0,0.06);font-size:0.91rem;display:flex;align-items:center;gap:8px;font-family:'Hind',sans-serif;}
  .pkg-card.featured .pkg-features li{border-color:rgba(255,248,238,0.1);color:rgba(255,248,238,0.82);}
  .pkg-features li::before{content:'✦';color:var(--gold);font-size:0.62rem;flex-shrink:0;}

  /* GALLERY */
  .gallery-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:13px;max-width:1080px;margin:0 auto;}
  .gallery-item{border-radius:11px;overflow:hidden;transition:transform 0.4s;position:relative;}
  .gallery-item:hover{transform:scale(1.03);z-index:2;}
  .gallery-item:nth-child(1),.gallery-item:nth-child(4){grid-column:span 2;}
  .gallery-inner{height:205px;display:flex;align-items:center;justify-content:center;font-size:3.6rem;transition:transform 0.5s;}
  .gallery-item:hover .gallery-inner{transform:scale(1.08);}
  .gallery-caption{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(to top,rgba(0,0,0,0.8),transparent);color:white;padding:16px 13px 10px;font-family:'Hind',sans-serif;font-size:0.86rem;font-weight:600;opacity:0;transition:opacity 0.3s;}
  .gallery-item:hover .gallery-caption{opacity:1;}

  /* WHY */
  .why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(205px,1fr));gap:26px;max-width:1080px;margin:0 auto;}
  .why-card{text-align:center;padding:28px 16px;}
  .why-icon{font-size:2.7rem;margin-bottom:13px;display:block;animation:float 4s ease infinite;}
  .why-title{font-family:'Tiro Devanagari Hindi',serif;font-size:1.08rem;margin-bottom:8px;color:var(--deep-maroon);}
  .why-desc{color:var(--text-muted);font-size:0.91rem;line-height:1.78;font-family:'Hind',sans-serif;}

  /* TESTIMONIALS */
  .testimonials-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;max-width:1080px;margin:0 auto;}
  .testimonial-card{background:white;border-radius:11px;padding:28px;border-left:4px solid var(--gold);box-shadow:0 8px 26px rgba(0,0,0,0.07);transition:transform 0.3s;}
  .testimonial-card:hover{transform:translateY(-4px);}
  .stars{color:var(--gold);font-size:0.97rem;letter-spacing:2px;margin-bottom:13px;}
  .testimonial-text{font-size:1rem;line-height:1.85;color:#444;margin-bottom:17px;font-style:italic;font-family:'Hind',sans-serif;}
  .testimonial-author{display:flex;align-items:center;gap:11px;}
  .author-avatar{width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,var(--saffron),var(--maroon));display:flex;align-items:center;justify-content:center;font-size:1.2rem;}
  .author-name{font-family:'Hind',sans-serif;font-weight:700;font-size:0.95rem;color:var(--deep-maroon);}
  .author-city{font-size:0.8rem;color:var(--text-muted);font-family:'Hind',sans-serif;}

  /* CONTACT */
  .contact-section{background:linear-gradient(135deg,var(--deep-maroon) 0%,#5C0A0A 50%,var(--maroon) 100%);padding:90px 40px;color:var(--cream);position:relative;overflow:hidden;}
  .contact-inner{max-width:1080px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:68px;align-items:center;}
  .contact-info h2{font-family:'Tiro Devanagari Hindi',serif;font-size:clamp(1.7rem,3vw,2.5rem);margin-bottom:13px;}
  .contact-info h2 span{color:var(--bright-gold);}
  .contact-info p{color:rgba(255,248,238,0.7);font-size:1.02rem;line-height:1.88;margin-bottom:34px;font-family:'Hind',sans-serif;}
  .contact-item{display:flex;align-items:center;gap:13px;margin-bottom:20px;}
  .contact-icon{width:46px;height:46px;background:rgba(212,160,23,0.13);border:1px solid rgba(212,160,23,0.3);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0;transition:all 0.3s;}
  .contact-item:hover .contact-icon{background:rgba(212,160,23,0.27);animation:pulse 1s ease infinite;}
  .contact-label{font-family:'Hind',sans-serif;font-size:0.74rem;letter-spacing:1.5px;text-transform:uppercase;color:var(--gold);margin-bottom:2px;}
  .contact-value{font-size:1.02rem;font-weight:600;color:var(--cream);font-family:'Hind',sans-serif;}
  .contact-form{background:rgba(255,255,255,0.05);border:1px solid rgba(212,160,23,0.2);border-radius:15px;padding:36px;}
  .contact-form h3{font-family:'Tiro Devanagari Hindi',serif;font-size:1.45rem;color:var(--bright-gold);margin-bottom:24px;}
  .form-group{margin-bottom:16px;}
  .form-label{display:block;font-family:'Hind',sans-serif;font-size:0.78rem;letter-spacing:1.2px;color:rgba(255,248,238,0.55);margin-bottom:6px;}
  .form-input,.form-select,.form-textarea{width:100%;background:rgba(255,255,255,0.07);border:1px solid rgba(212,160,23,0.23);border-radius:7px;padding:12px 14px;color:var(--cream);font-family:'Hind',sans-serif;font-size:0.95rem;transition:border-color 0.3s,box-shadow 0.3s;outline:none;}
  .form-input:focus,.form-select:focus,.form-textarea:focus{border-color:var(--gold);box-shadow:0 0 13px rgba(212,160,23,0.18);}
  .form-select option{background:var(--deep-maroon);}
  .form-textarea{resize:vertical;min-height:90px;}
  .form-row{display:grid;grid-template-columns:1fr 1fr;gap:13px;}
  .submit-btn{width:100%;background:linear-gradient(135deg,var(--saffron),var(--gold));color:white;border:none;padding:14px;font-family:'Hind',sans-serif;font-weight:700;font-size:0.97rem;letter-spacing:1.5px;cursor:pointer;border-radius:7px;transition:all 0.3s;margin-top:5px;}
  .submit-btn:hover{transform:translateY(-3px);box-shadow:0 11px 30px rgba(255,107,0,0.38);}

  /* FOOTER */
  .footer{background:var(--deep-maroon);color:rgba(255,248,238,0.55);padding:36px 40px 20px;border-top:1px solid rgba(212,160,23,0.2);}
  .footer-inner{max-width:1080px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:20px;}
  .footer-logo{font-family:'Tiro Devanagari Hindi',serif;font-size:1.25rem;color:var(--bright-gold);}
  .footer-logo span{color:var(--saffron);}
  .footer-links{display:flex;gap:20px;flex-wrap:wrap;}
  .footer-links a{color:rgba(255,248,238,0.45);text-decoration:none;font-family:'Hind',sans-serif;font-size:0.86rem;transition:color 0.3s;}
  .footer-links a:hover{color:var(--gold);}
  .footer-copy{width:100%;text-align:center;margin-top:20px;padding-top:20px;border-top:1px solid rgba(212,160,23,0.1);font-size:0.82rem;font-family:'Hind',sans-serif;}

  /* FABs */
  .whatsapp-fab{position:fixed;bottom:70px;right:0px;z-index:999;width:52px;height:52px;background:#25D366;border:none;border-radius:50%;color:white;font-size:1.65rem;cursor:pointer;box-shadow:0 6px 18px rgba(37,211,102,0.38);transition:all 0.3s;display:flex;align-items:center;justify-content:center;animation:pulse 2.2s ease infinite;}
  .whatsapp-fab:hover{transform:scale(1.12);}
  .scroll-top{position:fixed;bottom:28px;right:28px;z-index:999;width:46px;height:46px;background:linear-gradient(135deg,var(--saffron),var(--gold));border:none;border-radius:50%;color:white;font-size:1.25rem;cursor:pointer;box-shadow:0 6px 18px rgba(255,107,0,0.38);transition:all 0.3s;display:flex;align-items:center;justify-content:center;}
  .scroll-top:hover{transform:translateY(-4px);}

  @media(max-width:768px){
    .nav-links{display:none;}
    .lang-toggle-wrap{top:43px;right:10px;}
    .lang-opt{padding:6px 11px;font-size:0.74rem;}
    .section{padding:60px 16px;}
    .contact-inner{grid-template-columns:1fr;gap:34px;}
    .gallery-grid{grid-template-columns:1fr 1fr;}
    .gallery-item:nth-child(1),.gallery-item:nth-child(4){grid-column:span 1;}
    .footer-inner{flex-direction:column;text-align:center;}
    .form-row{grid-template-columns:1fr;}
    .hero-stats{gap:22px;}
    .call-strip{padding:8px 14px;font-size:0.83rem; display:none!important}
  }
 
`;
export default GlobalStyles;