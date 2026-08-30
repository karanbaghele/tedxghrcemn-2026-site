"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ExternalLink, Menu, X, MapPin, CalendarDays, Clock3, ChevronDown, Search, MousePointer2 } from "lucide-react";
import { activities, faqs, galleryItems, navItems, schedule, secondaryNav, siteConfig, speakers, teamGroups } from "../data/site";

const reveal = { hidden: { opacity: 0, y: 42, filter: "blur(10px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } };

function Brand() {
  return <a className="brand" href="/" aria-label="GHRCEMN home"><img src="/brand/ghrcemn-logo-white.png" alt="GHRCEMN" /></a>;
}

function RegisterButton({ label = "Register Now", compact = false, href = siteConfig.registrationUrl }: { label?: string; compact?: boolean; href?: string }) {
  return <motion.a whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: .97 }} transition={{ type: "spring", stiffness: 420, damping: 24 }} className={`button primary ${compact ? "compact" : ""}`} href={href} target="_blank" rel="noreferrer" aria-label={`${label}, opens external registration platform`}>{label}<ExternalLink size={16} aria-hidden="true" /></motion.a>;
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? window.scrollY / total : 0);
    };
    update(); window.addEventListener("scroll", update, { passive: true }); window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  return <div className="scroll-progress" aria-hidden="true"><motion.i animate={{ scaleX: progress }} transition={{ duration: .08, ease: "linear" }} /></div>;
}

function Header({ path }: { path: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); } };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; document.removeEventListener("keydown", onKey); };
  }, [open]);
  return <>
    <header className={`site-header ${scrolled || open ? "scrolled" : ""}`}>
      <Brand />
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map(([label, href]) => <a key={href} className={path === href ? "active" : ""} href={href}>{label}</a>)}
      </nav>
      <div className="header-actions"><RegisterButton label="Register" compact /><button ref={menuButton} className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"}>{open ? <X /> : <Menu />}</button></div>
    </header>
    <AnimatePresence>{open && <motion.nav id="mobile-menu" className="mobile-menu" aria-label="Mobile navigation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="mobile-links">{[...navItems, ...secondaryNav].map(([label, href], index) => <motion.a initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * .025 }} key={href} href={href}>{String(index + 1).padStart(2, "0")}<span>{label}</span></motion.a>)}</div>
      <RegisterButton label="Register on external platform" />
    </motion.nav>}</AnimatePresence>
  </>;
}

function Footer() {
  return <footer className="footer"><div className="footer-top"><div><Brand /><p>Ideas, curiosity and human connection—gathered in Nagpur for Beyond the Dots.</p><div className="official-links"><a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">Instagram <ExternalLink size={13}/></a><a href={siteConfig.tedEventUrl} target="_blank" rel="noreferrer">Official TED listing <ExternalLink size={13}/></a><a href={siteConfig.institutionUrl} target="_blank" rel="noreferrer">GHRCEMN <ExternalLink size={13}/></a></div></div><div className="footer-links">{[...navItems, ...secondaryNav].map(([l,h]) => <a key={h} href={h}>{l}</a>)}</div><div><p className="eyebrow">EVENT</p><p>{siteConfig.date} • {siteConfig.dateStatus}</p><p>{siteConfig.venue}</p><p>{siteConfig.venueAddress}</p><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></div></div><div className="footer-bottom"><p>{siteConfig.disclaimer}</p><p>Registration, payment, cancellation and refund matters are handled by KonfHub.</p><p>© 2026 TEDxGHRCEMN</p></div></footer>;
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} variants={reveal} initial={reduced ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true, amount: .12 }} transition={{ duration: .9, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>;
}

function SectionIntro({ label, title, copy }: { label: string; title: React.ReactNode; copy?: string }) {
  return <Reveal className="section-intro"><p className="eyebrow">{label}</p><h2>{title}</h2>{copy && <p className="lede">{copy}</p>}</Reveal>;
}

function PhotoVisual({ src, alt, className = "", eager = false }: { src: string; alt: string; className?: string; eager?: boolean }) {
  return <div className={`photo-visual ${className}`}><img src={src} alt={alt} loading={eager ? "eager" : "lazy"} /></div>;
}

type HeroDot = { x: number; y: number; baseX: number; baseY: number; vx: number; vy: number; size: number; phase: number; depth: number };

function InteractiveDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    let width = 0, height = 0, frame = 0, animation = 0;
    let dots: HeroDot[] = [];
    const pointer = { x: -999, y: -999, active: false };
    const pulses: { x: number; y: number; life: number }[] = [];

    const makeDots = () => {
      const count = width < 700 ? 82 : Math.min(175, Math.round(width / 9));
      dots = Array.from({ length: count }, (_, index) => {
        const ring = index < count * .74;
        const angle = Math.random() * Math.PI * 2;
        const layer = .48 + Math.random() * .58;
        const centreX = width < 700 ? width * .58 : width * .74;
        const centreY = height * .47;
        const radiusX = Math.min(width * .31, 430) * layer;
        const radiusY = Math.min(height * .42, 410) * layer;
        const baseX = ring ? centreX + Math.cos(angle) * radiusX : Math.random() * width;
        const baseY = ring ? centreY + Math.sin(angle) * radiusY : Math.random() * height;
        return { x: baseX, y: baseY, baseX, baseY, vx: 0, vy: 0, size: .55 + Math.random() * 1.65, phase: Math.random() * Math.PI * 2, depth: .35 + Math.random() * .9 };
      });
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.6);
      width = rect.width; height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * ratio)); canvas.height = Math.max(1, Math.floor(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      makeDots();
    };

    const draw = () => {
      frame += 1;
      context.clearRect(0, 0, width, height);
      const glow = context.createRadialGradient(width * .72, height * .47, 20, width * .72, height * .47, Math.min(width, height) * .55);
      glow.addColorStop(0, "rgba(230,43,30,.10)"); glow.addColorStop(.34, "rgba(255,255,255,.025)"); glow.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = glow; context.fillRect(0, 0, width, height);

      dots.forEach((dot) => {
        const driftX = reduced ? 0 : Math.sin(frame * .006 * dot.depth + dot.phase) * 7 * dot.depth;
        const driftY = reduced ? 0 : Math.cos(frame * .004 * dot.depth + dot.phase) * 5 * dot.depth;
        let targetX = dot.baseX + driftX, targetY = dot.baseY + driftY;
        const dx = pointer.x - dot.x, dy = pointer.y - dot.y, distance = Math.hypot(dx, dy);
        if (pointer.active && distance < 190) {
          const force = (1 - distance / 190) * dot.depth;
          targetX += dx * force * .18; targetY += dy * force * .18;
        }
        dot.vx += (targetX - dot.x) * .018; dot.vy += (targetY - dot.y) * .018;
        dot.vx *= .88; dot.vy *= .88; dot.x += dot.vx; dot.y += dot.vy;
      });

      for (let i = 0; i < dots.length; i += 1) {
        for (let j = i + 1; j < dots.length; j += 1) {
          const a = dots[i], b = dots[j], distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance < 82) {
            const pointerDistance = Math.min(Math.hypot(a.x - pointer.x, a.y - pointer.y), Math.hypot(b.x - pointer.x, b.y - pointer.y));
            const alive = pointer.active && pointerDistance < 150;
            context.strokeStyle = alive ? `rgba(230,43,30,${(1 - distance / 82) * .48})` : `rgba(245,245,242,${(1 - distance / 82) * .13})`;
            context.lineWidth = alive ? .8 : .45; context.beginPath(); context.moveTo(a.x, a.y); context.lineTo(b.x, b.y); context.stroke();
          }
        }
      }

      dots.forEach((dot) => {
        const distance = Math.hypot(dot.x - pointer.x, dot.y - pointer.y);
        const active = pointer.active && distance < 145;
        context.fillStyle = active ? "rgba(240,58,45,.96)" : `rgba(245,245,242,${.36 + dot.depth * .48})`;
        context.shadowBlur = active ? 15 : 0; context.shadowColor = "#e62b1e";
        context.beginPath(); context.arc(dot.x, dot.y, dot.size * (active ? 1.7 : 1), 0, Math.PI * 2); context.fill();
      });
      context.shadowBlur = 0;

      pulses.forEach((pulse) => {
        pulse.life -= .018; const radius = (1 - pulse.life) * 130;
        context.strokeStyle = `rgba(230,43,30,${pulse.life * .5})`; context.lineWidth = 1;
        context.beginPath(); context.arc(pulse.x, pulse.y, radius, 0, Math.PI * 2); context.stroke();
      });
      for (let i = pulses.length - 1; i >= 0; i -= 1) if (pulses[i].life <= 0) pulses.splice(i, 1);
      if (!reduced) animation = requestAnimationFrame(draw);
    };

    const point = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect(); pointer.x = event.clientX - rect.left; pointer.y = event.clientY - rect.top; pointer.active = true;
      if (reduced) draw();
    };
    const leave = () => { pointer.active = false; };
    const pulse = (event: PointerEvent) => { point(event); pulses.push({ x: pointer.x, y: pointer.y, life: 1 }); };
    resize(); draw(); window.addEventListener("resize", resize); canvas.addEventListener("pointermove", point); canvas.addEventListener("pointerleave", leave); canvas.addEventListener("pointerdown", pulse);
    return () => { cancelAnimationFrame(animation); window.removeEventListener("resize", resize); canvas.removeEventListener("pointermove", point); canvas.removeEventListener("pointerleave", leave); canvas.removeEventListener("pointerdown", pulse); };
  }, [reduced]);
  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />;
}

function Hero() {
  const reduced = useReducedMotion();
  return <section className="hero"><InteractiveDots /><div className="hero-grid" aria-hidden="true" /><div className="hero-content"><motion.p className="eyebrow" initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .12, duration: .75 }}>TEDxGHRCEMN • 9 SEPTEMBER 2026</motion.p><motion.p className="status-pill" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .3 }}>{siteConfig.themeStatus}</motion.p><h1 aria-label="Beyond the Dots"><motion.span initial={reduced ? false : { y: "115%" }} animate={{ y: 0 }} transition={{ delay: .15, duration: 1, ease: [0.16,1,0.3,1] }}>Beyond</motion.span><motion.span initial={reduced ? false : { y: "115%" }} animate={{ y: 0 }} transition={{ delay: .25, duration: 1, ease: [0.16,1,0.3,1] }}>the <em>Dots.</em></motion.span></h1><motion.p className="hero-copy" initial={reduced ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .55, duration: .8 }}>Every point holds a possibility. Look closer, move through the connections, and discover what exists beyond the obvious.</motion.p><motion.div className="hero-actions" initial={reduced ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .7, duration: .7 }}><RegisterButton /><motion.a whileHover={{ y: -3 }} whileTap={{ scale: .97 }} className="button ghost" href="#event-intro">Explore Event<ArrowRight size={17} /></motion.a></motion.div><motion.div className="hero-meta" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .85 }}><p><CalendarDays size={17} />{siteConfig.date} <span>• {siteConfig.dateStatus}</span></p><p><MapPin size={17} />{siteConfig.venue}</p></motion.div></div><div className="interaction-note"><MousePointer2 size={14}/><span>Move to reveal connections<br/>Tap to send a signal</span></div><a className="scroll-cue" href="#event-intro"><span>Scroll to go beyond</span><i /></a></section>;
}

function Home() {
  return <>
    <Hero />
    <main id="main-content">
      <section id="event-intro" className="section intro-grid"><SectionIntro label="ABOUT / 01" title={<>One room. Many fields.<br />A shared <em>curiosity.</em></>} copy="TEDxGHRCEMN returns for its second edition—bringing students, professionals and curious minds together around ideas worth examining. The first edition began the conversation; this chapter looks further." /><div className="focus-orbit"><span>AN IDEA</span><i /><i /><i /></div></section>
      <section className="section day-section"><SectionIntro label="THE EXPERIENCE / 02" title={<>Two days.<br />One unfolding <em>story.</em></>} /><div className="day-panels"><Reveal className="day-panel day-one"><PhotoVisual src="/images/prefest-workshop-concept.webp" alt="Illustration of hands building ideas through a collaborative design workshop" eager /><div><p className="eyebrow">8 SEPTEMBER • PRE-FEST</p><h3>Learn by doing.</h3><p>Beyond Build and AI in Development &amp; Design create space to experiment before the main stage opens.</p><p className="tiny">In-person • Paid • Separate registrations</p><a href="/activities">Explore activities <ArrowRight size={16} /></a></div></Reveal><Reveal className="day-panel day-two"><PhotoVisual src="/gallery/stage-05.jpg" alt="A speaker sharing an idea on the TEDxGHRCEMN stage" eager /><div><p className="eyebrow">9 SEPTEMBER • MAIN EVENT</p><h3>Ideas take the stage.</h3><p>TEDx talks, audience engagement and open conversation across disciplines and lived experience.</p><p className="tiny">9:00 AM–6:00 PM IST • GHRCEMN, Nagpur</p><a href="/event">View event <ArrowRight size={16} /></a></div></Reveal></div></section>
      <section className="section speakers-section"><SectionIntro label="SPEAKERS / 03" title={<>Meet the voices<br />shaping <em>2026.</em></>} copy="Three speakers have been announced for TEDxGHRCEMN 2026, bringing perspectives from food, culture, entrepreneurship and digital strategy." /><div className="speaker-tease">{speakers.map((speaker)=><Reveal key={speaker.id} className="speaker-card"><PhotoVisual src={speaker.image} alt={`Portrait of ${speaker.name}`} className="speaker-photo" /><p className="eyebrow">2026 SPEAKER</p><h3>{speaker.name}</h3><p>{speaker.field}</p></Reveal>)}</div><a className="text-link" href="/speakers">Meet the speakers <ArrowRight size={17}/></a></section>
      <section className="section activity-home"><PhotoVisual src="/images/prefest-workshop-concept.webp" alt="Illustration of hands building ideas through a collaborative design workshop" className="activity-visual" /><div><SectionIntro label="PRE-FEST / 04" title={<>Ideas become<br /><em>practice.</em></>} copy="Two confirmed Pre-Fest experiences take place at GHRCEMN on 8 September 2026." />{activities.map((a,i)=><a className="activity-row" href={a.registrationUrl} target="_blank" rel="noreferrer" key={a.title}><span>0{i+1}</span><div><p className="eyebrow">{a.category}</p><h3>{a.title}</h3><p>{a.dateTime} • {a.price}</p></div><ArrowRight /></a>)}</div></section>
      <section className="section why"><SectionIntro label="WHY ATTEND / 05" title={<>Come for an idea.<br />Leave with <em>connections.</em></>} /><div className="why-list">{["Listen to ideas with real human context.","Learn through practical workshops.","Explore innovation and entrepreneurship.","Connect with professionals and students.","Take part in an interdisciplinary experience."].map((item,i)=><Reveal className="why-item" key={item}><span>0{i+1}</span><p>{item}</p></Reveal>)}</div></section>
      <section className="stat-strip">{[["02","day experience"],["≈ 08","speakers planned"],["150–200","Pre-Fest participants"],["≈ 120","Main Event attendees"],["01","in-person event"]].map(([n,l])=><div key={l}><strong>{n}</strong><span>{l}</span></div>)}</section>
      <section className="section highlights"><SectionIntro label="FIRST EDITION / 06" title={<>A conversation<br /><em>already begun.</em></>} copy="A glimpse of the speakers, audience and community moments that began the TEDxGHRCEMN story." /><div className="highlight-grid"><PhotoVisual src="/gallery/stage-10.jpg" alt="A speaker addressing the TEDxGHRCEMN audience during the first edition" /><PhotoVisual src="/gallery/audience-03.jpg" alt="Audience listening during the first edition of TEDxGHRCEMN" /><PhotoVisual src="/gallery/community-03.jpg" alt="The TEDxGHRCEMN community gathered after the first edition" /></div><a className="text-link" href="/gallery">Open the gallery <ArrowRight size={17}/></a></section>
      <section className="final-cta"><div className="cta-field" aria-hidden="true">{Array.from({length:24},(_,i)=><i key={i} style={{"--i":i} as React.CSSProperties}/>)}</div><Reveal><p className="eyebrow">9 SEPTEMBER 2026 • NAGPUR</p><h2>Go beyond<br />the <em>obvious.</em></h2><p>Join a room built for questions, connections and ideas that refuse to remain isolated dots.</p><RegisterButton label="Register for TEDxGHRCEMN" /></Reveal></section>
    </main>
  </>;
}

function PageHero({ label, title, copy }: { label: string; title: string; copy: string }) {
  const reduced = useReducedMotion();
  return <section className="page-hero"><div className="page-orbit" aria-hidden="true"><i/><i/><i/></div><motion.p className="eyebrow" initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>{label}</motion.p><h1><motion.span initial={reduced ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.16,1,0.3,1] }}>{title}<b>.</b></motion.span></h1><motion.p initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35, duration: .75 }}>{copy}</motion.p></section>;
}

function AboutPage() { return <main id="main-content"><PageHero label="ABOUT / OUR STORY" title="Ideas need a place to meet" copy="A locally organised TEDx experience, built around curiosity, context and conversation."/><section className="section editorial-story">{[["01","What is TEDx?","TEDx is a global programme of independently organised local events where live speakers and selected TED Talks bring communities together around ideas and conversation.","/gallery/stage-03.jpg","A speaker addressing the TEDxGHRCEMN audience"],["02","About TEDxGHRCEMN","TEDxGHRCEMN is a university event independently organised by a local volunteer team. Beyond the Dots brings together perspectives across learning, culture, technology and human experience.","/gallery/audience-04.jpg","The TEDxGHRCEMN audience gathered in the event hall"],["03","The first edition","The first edition began TEDxGHRCEMN’s local story and established a platform for ideas, speakers and meaningful connection in Nagpur.","/gallery/stage-12.jpg","A first-edition speaker sharing an idea with the room"],["04","The 2026 edition","The 2026 experience begins with two paid Pre-Fest programmes on 8 September and continues with the Main Event on 9 September.","/gallery/community-01.jpg","Members of the TEDxGHRCEMN community together"],["05","Our objectives","Encourage interdisciplinary thinking, make room for considered dialogue and connect new ideas with people ready to explore them.","/gallery/audience-05.jpg","Audience members connecting during TEDxGHRCEMN"],["06","The institution","Established in 2008, G H Raisoni College of Engineering and Management, Nagpur is affiliated with Rashtrasant Tukadoji Maharaj Nagpur University, recognised by AICTE, and accredited A+ by NAAC.","/gallery/honours-02.jpg","A moment of appreciation at TEDxGHRCEMN" ]].map(([n,t,c,image,alt])=><Reveal className="story-row" key={t}><span>{n}</span><h2>{t}</h2><p>{c}</p><PhotoVisual src={image} alt={alt} /></Reveal>)}</section><section className="disclaimer-block"><p className="eyebrow">INDEPENDENTLY ORGANISED</p><p>{siteConfig.disclaimer}</p><div className="official-links"><a href={siteConfig.tedEventUrl} target="_blank" rel="noreferrer">View the official event listing on TED.com <ExternalLink size={14}/></a><a href={siteConfig.institutionUrl} target="_blank" rel="noreferrer">Visit the GHRCEMN website <ExternalLink size={14}/></a></div></section></main>; }

function Schedule() { const [day,setDay]=useState<"day1"|"day2">("day1"); return <section className="section"><SectionIntro label="CONFIRMED DATES" title={<>A clear rhythm for<br /><em>both days.</em></>} copy="Programme session details for the Main Event will be added when officially announced."/><div className="day-tabs" role="tablist" aria-label="Schedule day"><button role="tab" aria-selected={day==="day1"} onClick={()=>setDay("day1")}>8 Sep • Pre-Fest</button><button role="tab" aria-selected={day==="day2"} onClick={()=>setDay("day2")}>9 Sep • Main Event</button></div><div className="schedule"><div className="schedule-head"><span>Time</span><span>Session</span><span>Format</span><span>Venue</span></div>{schedule[day].map((row)=><div className="schedule-row" key={row[0]}><strong>{row[0]}</strong><span><small>SESSION</small>{row[1]}</span><span><small>FORMAT</small>{row[2]}</span><span><small>VENUE</small>{row[3]}</span></div>)}</div></section>; }

function EventPage(){return <main id="main-content"><PageHero label="EVENT / TWO DAYS" title="From practice to perspective" copy="Two in-person Pre-Fest experiences followed by the paid TEDxGHRCEMN Main Event."/><section className="facts"><div><CalendarDays/><span>Main Event</span><strong>{siteConfig.date}</strong><small>Wednesday</small></div><div><Clock3/><span>Timings</span><strong>9:00 AM–6:00 PM</strong><small>India Standard Time</small></div><div><MapPin/><span>Venue</span><strong>GHRCEMN, Nagpur</strong><small>{siteConfig.mode}</small></div><div><ExternalLink/><span>Passes</span><strong>From ₹399</strong><small>Register on KonfHub</small></div></section><section className="section event-days"><article><PhotoVisual src="/images/prefest-workshop-concept.webp" alt="Illustration of hands building ideas through a collaborative design workshop" className="event-day-photo" /><p className="eyebrow">8 SEPTEMBER • PRE-FEST</p><h2>Make, test, question.</h2><p>Two confirmed paid experiences invite participants to experiment before the main stage opens.</p><ul><li>Beyond Build: 10:00 AM–6:00 PM</li><li>AI in Development &amp; Design: 11:00 AM–3:00 PM</li><li>Venue: GHRCEMN, Nagpur</li><li>Tickets: ₹99 each</li></ul><a className="text-link" href="/activities">View both activities <ArrowRight size={17}/></a></article><article><PhotoVisual src="/gallery/stage-07.jpg" alt="A speaker presenting on the TEDxGHRCEMN stage" className="event-day-photo" /><p className="eyebrow">9 SEPTEMBER • MAIN EVENT</p><h2>Listen, reflect, connect.</h2><p>TEDx talks, audience engagement and meaningful conversation in one focused programme.</p><ul><li>Time: 9:00 AM–6:00 PM IST</li><li>Early Bird: ₹399</li><li>Regular Pass: ₹449</li><li>Venue: GHRCEMN, Nagpur</li></ul><RegisterButton label="Register for Main Event" /></article></section><Schedule/></main>}

function SpeakersPage(){const [active,setActive]=useState<(typeof speakers)[number]|null>(null); useEffect(()=>{if(!active)return; const close=(e:KeyboardEvent)=>e.key==="Escape"&&setActive(null);document.addEventListener("keydown",close);return()=>document.removeEventListener("keydown",close)},[active]);return <main id="main-content"><PageHero label="SPEAKERS / 2026" title="Three perspectives, one shared stage" copy="Meet the first announced speakers for TEDxGHRCEMN 2026."/><section className="section speaker-directory">{speakers.map((s)=><button className="speaker-card" onClick={()=>setActive(s)} key={s.id} aria-haspopup="dialog"><PhotoVisual src={s.image} alt={`Portrait of ${s.name}`} className="speaker-photo"/><p className="eyebrow">2026 SPEAKER</p><h2>{s.name}</h2><p>{s.field}</p><span>Read speaker profile <ArrowRight size={15}/></span></button>)}</section><AnimatePresence>{active&&<motion.div className="dialog-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={()=>setActive(null)}><motion.div className="speaker-dialog" role="dialog" aria-modal="true" aria-labelledby="speaker-dialog-title" initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} transition={{type:"spring",damping:30,stiffness:280}} onMouseDown={e=>e.stopPropagation()}><button className="dialog-close" onClick={()=>setActive(null)} aria-label="Close speaker profile"><X/></button><PhotoVisual src={active.image} alt={`Portrait of ${active.name}`} className="dialog-photo" eager/><p className="eyebrow">TEDxGHRCEMN • 2026 SPEAKER</p><h2 id="speaker-dialog-title">{active.name}</h2><p className="dialog-field">{active.field}</p><hr/><h3>More about the speaker</h3><p>{active.bio}</p></motion.div></motion.div>}</AnimatePresence></main>}

function ActivitiesPage(){return <main id="main-content"><PageHero label="ACTIVITIES / 8 SEPTEMBER" title="Ideas become practical" copy="Two confirmed, paid Pre-Fest experiences at GHRCEMN before the Main Event."/><section className="section"><SectionIntro label="PRE-FEST REGISTRATIONS" title={<>Learn by <em>making.</em></>} copy="Each experience has its own KonfHub registration."/> <div className="activity-grid">{activities.map((a,i)=><article key={a.title}><span>0{i+1}</span><p className="eyebrow">{a.category}</p><h2>{a.title}</h2><p>{a.description}</p><dl><dt>Date &amp; time</dt><dd>{a.dateTime}</dd><dt>Venue</dt><dd>{a.venue}</dd><dt>Registration</dt><dd>{a.eligibility}</dd><dt>Ticket</dt><dd>{a.price}</dd></dl><RegisterButton label={`Register for ${a.title}`} href={a.registrationUrl} /></article>)}</div></section></main>}

function TeamPage(){return <main id="main-content"><PageHero label="TEAM / 2026" title="The people shaping the room" copy="Meet the organising team bringing Beyond the Dots to life at TEDxGHRCEMN."/><section className="section team-groups">{teamGroups.map((group,i)=><Reveal className="team-group" key={group.title}><div className="team-group-heading"><span>{String(i+1).padStart(2,"0")}</span><h2>{group.title}</h2></div><div className="team-members">{group.members.map(member=><article key={member.name}><div className="team-photo"><img src={member.image} alt={`${member.name}, ${member.role}`} loading="lazy" /></div><p>{member.name}</p><small>{member.role}</small></article>)}</div></Reveal>)}</section></main>}

function PartnersPage(){return <main id="main-content"><PageHero label="PARTNERS / COLLABORATE" title="Support an exchange of ideas" copy="Partner categories are ready; names and logos will appear only after confirmation."/><section className="section partner-list">{["Hosted by / Institutional Support","Sponsors","Knowledge Partners","Community Partners","Media Partners","Hospitality Partners"].map((p,i)=><div key={p}><span>{String(i+1).padStart(2,"0")}</span><h2>{p}</h2><p>Partners to Be Announced</p></div>)}</section><section className="partner-cta"><p className="eyebrow">PARTNER WITH US</p><h2>Help create space for<br/><em>ideas and people.</em></h2><p>Partnership formats and approved enquiry details will be shared soon.</p><a className="button primary" href="/contact">Start an enquiry <ArrowRight size={17}/></a></section></main>}

function GalleryPage(){return <main id="main-content"><section className="section gallery-page"><h1>Last Year's Photos</h1><div className="gallery-grid">{galleryItems.map((item,index)=><figure key={item.image}><img src={item.image} alt={item.alt} loading={index<6?"eager":"lazy"}/></figure>)}</div></section></main>}

function FAQsPage(){const [query,setQuery]=useState("");const filtered=useMemo(()=>faqs.filter(([q,a])=>(q+a).toLowerCase().includes(query.toLowerCase())),[query]);return <main id="main-content"><PageHero label="FAQS / USEFUL ANSWERS" title="Before you arrive" copy="Clear answers now, honest To Be Announced states where details are still being finalised."/><section className="section faq-wrap"><label className="search"><Search/><span className="sr-only">Search frequently asked questions</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search questions"/></label><div className="faq-list">{filtered.map(([q,a],i)=><details key={q} open={i===0&&!query}><summary><span>{q}</span><ChevronDown/></summary><p>{a}</p></details>)}</div>{filtered.length===0&&<p className="empty-state">No matching questions. Try a broader search.</p>}</section></main>}

function ContactPage(){const [submitted,setSubmitted]=useState(false);return <main id="main-content"><PageHero label="CONTACT / GENERAL ENQUIRIES" title="Let’s continue the conversation" copy="For general or partnership questions. Ticket-related support remains with KonfHub."/><section className="section contact-grid"><div><p className="eyebrow">VISIT</p><h2>{siteConfig.venue}</h2><p>{siteConfig.venueAddress}</p><a className="map-link" href={siteConfig.mapUrl} target="_blank" rel="noreferrer"><MapPin/> Open venue in Google Maps <ExternalLink size={15}/></a><p className="eyebrow">CONNECT</p><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><div className="official-links"><a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">Instagram <ExternalLink size={14}/></a><a href={siteConfig.tedEventUrl} target="_blank" rel="noreferrer">TED.com event listing <ExternalLink size={14}/></a><a href={siteConfig.institutionUrl} target="_blank" rel="noreferrer">GHRCEMN website <ExternalLink size={14}/></a></div></div><form onSubmit={e=>{e.preventDefault();setSubmitted(true)}}><label>Name<input required name="name" autoComplete="name"/></label><label>Email<input required type="email" name="email" autoComplete="email"/></label><label>Enquiry type<select name="type"><option>General enquiry</option><option>Partnership enquiry</option></select></label><label>Message<textarea required name="message" rows={5}/></label><label className="honeypot" aria-hidden="true">Leave blank<input name="company_website" tabIndex={-1}/></label><button className="button primary" type="submit">Prepare enquiry <ArrowRight/></button>{submitted&&<p className="form-note" role="status">This form does not send automatically yet. Please email your message to {siteConfig.email}.</p>}<p className="tiny">This form does not handle tickets, payments, cancellations or refunds.</p></form></section></main>}

function NotFound(){return <main id="main-content" className="not-found"><p className="eyebrow">404 / LOST BETWEEN IDEAS</p><h1>This path<br/><em>fades into dark.</em></h1><p>The page you’re looking for does not exist.</p><div><a className="button primary" href="/">Return home</a><a className="button ghost" href="/event">Explore event</a></div></main>}

export function SiteShell({ path }: { path: string }) {
  const slug = path.replace(/^\//, "");
  const page = slug === "about" ? <AboutPage/> : slug === "event" ? <EventPage/> : slug === "speakers" ? <SpeakersPage/> : slug === "activities" ? <ActivitiesPage/> : slug === "team" ? <TeamPage/> : slug === "partners" ? <PartnersPage/> : slug === "gallery" ? <GalleryPage/> : slug === "faqs" ? <FAQsPage/> : slug === "contact" ? <ContactPage/> : <NotFound/>;
  return <><a className="skip-link" href="#main-content">Skip to content</a><ScrollProgress/><Header path={path}/><motion.div key={path} className="page-transition" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .55 }}>{path === "/" ? <Home/> : page}<Footer/></motion.div></>;
}
