import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  CloudUploadOutlined,
  RobotOutlined,
  SafetyCertificateOutlined,
  UserSwitchOutlined,
  DeploymentUnitOutlined,
  FileTextOutlined,
  AppstoreOutlined,
  DatabaseOutlined,
  DashboardOutlined,
  TeamOutlined,
  ApiOutlined,
  ArrowRightOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import { Reveal, Stagger, Item, Counter, GrowBar, DrawLine, EASE } from './motion.jsx';

const LANGS = [
  ['हिन्दी', 'Hindi'], ['বাংলা', 'Bengali'], ['मराठी', 'Marathi'], ['தமிழ்', 'Tamil'],
  ['తెలుగు', 'Telugu'], ['ಕನ್ನಡ', 'Kannada'], ['മലയാളം', 'Malayalam'], ['ગુજરાતી', 'Gujarati'],
  ['ਪੰਜਾਬੀ', 'Punjabi'], ['ଓଡ଼ିଆ', 'Odia'], ['English', 'English'],
];

const FEATURES = [
  { icon: <FileTextOutlined />, bg: 'rgba(109,93,246,0.14)', fg: '#8b7cff', title: 'Indic-first OCR', desc: 'PaddleOCR engines read faded ink, torn edges and handwriting across printed registers and scanned pages.' },
  { icon: <AppstoreOutlined />, bg: 'rgba(34,211,238,0.12)', fg: '#22d3ee', title: 'Layout Intelligence', desc: 'Deep layout parsing reconstructs forms, tables and key-value pairs exactly as they appear on paper.' },
  { icon: <DatabaseOutlined />, bg: 'rgba(52,211,153,0.13)', fg: '#34d399', title: 'Structured Extraction', desc: 'Owner names, khasra numbers, plot areas and mutations are normalized into clean, queryable records.' },
  { icon: <DashboardOutlined />, bg: 'rgba(251,191,36,0.14)', fg: '#fbbf24', title: 'Confidence Scoring', desc: 'Every field carries a live confidence score so reviewers always know what deserves a second look.' },
  { icon: <TeamOutlined />, bg: 'rgba(251,113,133,0.13)', fg: '#fb7185', title: 'Human-in-the-loop', desc: 'Low-confidence fields flow to expert verifiers with a complete audit trail of every correction made.' },
  { icon: <ApiOutlined />, bg: 'rgba(139,124,255,0.16)', fg: '#b39dff', title: 'Gov-ready APIs', desc: 'Scoped API keys and connectors for LRMS, DILRMP and PostGIS make adoption frictionless.' },
];

const STEPS = [
  { icon: <CloudUploadOutlined />, t: 'Upload', d: 'Drop scanned registers, cadastral maps and legacy PDFs in any Indian language.' },
  { icon: <RobotOutlined />, t: 'AI extraction', d: 'OCR plus layout models rebuild the document into structured digital fields.' },
  { icon: <SafetyCertificateOutlined />, t: 'Validation', d: 'Rule engines catch format errors, duplicates and logical inconsistencies instantly.' },
  { icon: <UserSwitchOutlined />, t: 'Verify', d: 'Uncertain fields are routed to human experts with one-click corrections.' },
  { icon: <DeploymentUnitOutlined />, t: 'Integrate', d: 'Verified records push straight into LRMS, DILRMP and GIS platforms.' },
];

const DISTRICT_BARS = [
  { name: 'Agra', h: 82 }, { name: 'Lucknow', h: 66 }, { name: 'Varanasi', h: 74 },
  { name: 'Kanpur', h: 54 }, { name: 'Prayagraj', h: 61 }, { name: 'Meerut', h: 44 },
];

function OcrDemo() {
  const FIELDS = [
    { label: 'Landowner', value: 'राजेश कुमार शर्मा', conf: 96 },
    { label: 'Survey No.', value: '45/2B', conf: 98 },
    { label: 'Plot Area', value: '2.45 hectares', conf: 92 },
    { label: 'Village', value: 'रामपुर · Lucknow', conf: 94 },
  ];
  const CYCLE = FIELDS.length + 4;
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setStep((s) => (s + 1) % CYCLE), 560);
    return () => clearInterval(timer);
  }, []);

  const visible = Math.max(0, Math.min(step, FIELDS.length));
  const done = step > FIELDS.length;

  return (
    <div className="ocr-card">
      <div className="ocr-head">
        <div className="ocr-dots"><span /><span /><span /></div>
        <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>khasra_register_2026.pdf</span>
        <div className={`ocr-status${done ? ' done-badge' : ''}`}>
          {!done && <span className="spin" />}
          {done && (
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }} className="done-check">✓</motion.span>
          )}
          {step === 0 ? 'Scanning document…' : !done ? 'Extracting fields…' : 'Verified · ready'}
        </div>
      </div>
      <div className="scan-body">
        {!done && <div className="scan-laser" />}
        <div className="doc-lines"><i /><i /><i /><i /></div>
        {FIELDS.slice(0, visible).map((f, i) => (
          <motion.div
            key={f.label}
            className="field-row"
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease: EASE }}
            style={{ marginBottom: i === visible - 1 ? 0 : 8 }}
          >
            <span className="field-label">{f.label}</span>
            <span className="field-value">{f.value}</span>
            <span className="field-conf">
              <span className="conf-bar"><motion.b initial={{ width: 0 }} animate={{ width: `${f.conf}%` }} transition={{ duration: 0.6, ease: EASE }} /></span>
              <span className="conf-num">{f.conf}%</span>
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Hero({ onLaunch }) {
  const stageRef = useRef(null);
  const rotX = useSpring(0, { stiffness: 110, damping: 16 });
  const rotY = useSpring(0, { stiffness: 110, damping: 16 });
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 140]);
  const heroFade = useTransform(scrollY, [0, 550], [1, 0]);

  return (
    <section className="hero">
      <div className="orb orb-violet" />
      <div className="orb orb-cyan" />
      <div className="orb orb-mint" />
      <div className="grid-bg" />
      <div className="noise" />

      <motion.div style={{ y: heroY, opacity: heroFade }} className="hero-core">
        <Reveal y={18}>
          <span className="chip"><span className="dot" /> Smart India Hackathon 2026 · Land Records Digitization</span>
        </Reveal>

        <motion.h1 className="hero-title" initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.12, ease: EASE }}>
          Every land record,<br />
          <span className="serif-accent grad-text">intelligently</span> digitized.
        </motion.h1>

        <motion.p className="hero-sub" initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.26, ease: EASE }}>
          Bhoomi AI turns decades of handwritten registers and faded scans into verified, government-ready digital records — with OCR built for India, confidence scoring on every field, and humans firmly in the loop.
        </motion.p>

        <motion.div className="hero-ctas" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.4, ease: EASE }}>
          <button className="btn-primary-light" onClick={onLaunch}>
            Launch Console <ArrowRightOutlined />
          </button>
          <a className="btn-ghost-light" href="#pipeline">
            <PlayCircleOutlined /> See how it works
          </a>
        </motion.div>

        <motion.div
          className="hero-stage"
          ref={stageRef}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.55, ease: EASE }}
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            rotY.set(((e.clientX - r.left) / r.width - 0.5) * 9);
            rotX.set(-((e.clientY - r.top) / r.height - 0.5) * 9);
          }}
          onMouseLeave={() => { rotX.set(0); rotY.set(0); }}
          style={{ perspective: 1400 }}
        >
          <motion.div style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}>
            <OcrDemo />
          </motion.div>

          <div className="float-chip fc-1">
            <span className="fc-icon" style={{ background: 'rgba(52,211,153,0.16)', color: '#34d399' }}>✓</span>
            Field accuracy up to <b>&nbsp;98.4%</b>
          </div>
          <div className="float-chip fc-2">
            <span className="fc-icon" style={{ background: 'rgba(109,93,246,0.2)', color: '#b39dff' }}>⚡</span>
            Processed in <b>&nbsp;under 30 sec</b>
          </div>
        </motion.div>

        <Stagger className="hero-stats" gap={0.12}>
          {[
            { num: <Counter to={11} suffix="+" />, label: 'Indic languages' },
            { num: <Counter to={98.4} decimals={1} suffix="%" />, label: 'Peak field accuracy' },
            { num: <Counter to={30} prefix="<" suffix="s" />, label: 'Per document' },
            { num: <Counter to={100} suffix="%" />, label: 'Audit coverage' },
          ].map((s) => (
            <Item key={s.label}>
              <div className="hstat">
                <div className="hstat-num grad-text">{s.num}</div>
                <div className="hstat-label">{s.label}</div>
              </div>
            </Item>
          ))}
        </Stagger>
      </motion.div>
    </section>
  );
}

export default function Landing({ onLaunch }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="landing">
      <nav className={`land-nav${scrolled ? ' scrolled' : ''}`}>
        <a className="brand-lockup" href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <span className="brand-mark">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M7 4h8a3 3 0 0 1 3 3v13a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4z" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
              <path d="M10 9.5h5M10 13h5M10 16.5h3" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <span>
            <span className="brand-name">Bhoomi AI</span>
            <div className="brand-sub">Land Record OS</div>
          </span>
        </a>
        <div className="nav-links">
          <a className="nav-link" href="#platform">Platform</a>
          <a className="nav-link" href="#pipeline">Pipeline</a>
          <a className="nav-link" href="#analytics">Analytics</a>
          <a className="nav-link" href="#integrations">Integrations</a>
        </div>
        <button className="nav-cta" onClick={onLaunch}>
          Open Console <ArrowRightOutlined />
        </button>
      </nav>

      <Hero onLaunch={onLaunch} />

      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...LANGS, ...LANGS].map(([native, eng], i) => (
            <span className="marquee-item" key={`${eng}-${i}`}>
              {native} <em>{eng}</em>
            </span>
          ))}
        </div>
      </div>

      <section className="section" id="platform">
        <div className="section-inner">
          <Reveal>
            <div className="sec-tag">The Platform</div>
            <h2 className="sec-title">
              Everything a land department needs, <span className="serif-accent grad-text">nothing it doesn't.</span>
            </h2>
            <p className="sec-desc">
              From dusty registers at the tehsil office to clean records in the state database — one pipeline handles intake, understanding, validation and verification end-to-end.
            </p>
          </Reveal>

          <Stagger className="feat-grid" gap={0.08}>
            {FEATURES.map((f) => (
              <Item key={f.title}>
                <div className="feat-card" style={{ '--feat-bg': f.bg, '--feat-fg': f.fg }}>
                  <div className="feat-icon">{f.icon}</div>
                  <div className="feat-title">{f.title}</div>
                  <p className="feat-desc" style={{ margin: 0 }}>{f.desc}</p>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section" id="pipeline" style={{ paddingTop: 40 }}>
        <div className="section-inner">
          <Reveal>
            <div className="sec-tag">How it works</div>
            <h2 className="sec-title">
              From faded paper to <span className="serif-accent grad-text">verified data</span> in five steps.
            </h2>
          </Reveal>
          <Stagger className="pipeline" gap={0.14}>
            {STEPS.map((s, i) => (
              <Item key={s.t}>
                <div className="pipe-step">
                  <div className="pipe-rail">
                    <div className="pipe-node" style={{ color: i % 2 ? '#67e8f9' : '#8b7cff' }}>{s.icon}</div>
                    <DrawLine delay={0.3 + i * 0.12} />
                  </div>
                  <div className="pipe-k">Step 0{i + 1}</div>
                  <div className="pipe-t">{s.t}</div>
                  <p className="pipe-d" style={{ margin: 0 }}>{s.d}</p>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section showcase" id="analytics">
        <div className="section-inner">
          <Reveal>
            <div className="sec-tag">Command center</div>
            <h2 className="sec-title">
              Progress your collectors can actually <span className="serif-accent grad-text">see.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="showcase-panel">
              <div className="showcase-copy">
                <h3>District-wise throughput, live accuracy and review queues — on one screen.</h3>
                <p>
                  Administrators track digitization across every tehsil while verifiers clear low-confidence fields from a focused queue. Every metric updates as documents flow through the pipeline.
                </p>
                <div className="kpi-list">
                  {[
                    ['#34d399', `${DISTRICT_BARS.length} districts onboarded in the pilot`],
                    ['#8b7cff', '94.6% mean extraction accuracy this week'],
                    ['#67e8f9', '214 fields awaiting expert verification'],
                  ].map(([c, txt]) => (
                    <div className="kpi-row" key={txt}>
                      <span className="kpi-dot" style={{ background: c, boxShadow: `0 0 12px ${c}` }} />
                      {txt}
                    </div>
                  ))}
                </div>
              </div>

              <div className="chart-mock">
                <div className="chart-mock-title">
                  Documents processed · this month
                  <span style={{ color: '#34d399', fontWeight: 700 }}>+18.2%</span>
                </div>
                <div className="bars">
                  {DISTRICT_BARS.map((b, i) => (
                    <div className="bar-col" key={b.name}>
                      <GrowBar height={`${b.h}%`} delay={i * 0.08} />
                      <span className="bar-label">{b.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" id="integrations" style={{ paddingBottom: 60 }}>
        <div className="section-inner">
          <Reveal>
            <div className="sec-tag">Integrations</div>
            <h2 className="sec-title" style={{ fontSize: 'clamp(28px, 3.6vw, 44px)' }}>
              Plugs straight into the systems you already run.
            </h2>
          </Reveal>
          <Stagger className="logo-strip" gap={0.07}>
            {['DILRMP', 'LRMS', 'PostGIS', 'Bhulekh', 'REST + API Keys'].map((n) => (
              <Item key={n}>
                <span className="sys-pill"><span className="sys-dot" /> {n === 'REST + API Keys' ? <><b>REST</b> + scoped API keys</> : <><b>{n}</b> · connected</>}</span>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="cta-final">
        <div className="cta-ring" />
        <div className="cta-ring r2" />
        <div className="cta-ring r3" />
        <Reveal>
          <h2>
            The paperwork era ends <span className="serif-accent grad-text">here.</span>
          </h2>
          <p>Open the console and watch a handwritten register become a verified digital record.</p>
          <div style={{ marginTop: 38 }}>
            <button className="btn-primary-light" onClick={onLaunch}>
              Launch Console <ArrowRightOutlined />
            </button>
          </div>
        </Reveal>
      </section>

      <footer className="land-footer">
        <span>Bhoomi AI — built for Smart India Hackathon 2026</span>
        <span>OCR · NLP · Human-in-the-loop · GIS</span>
        <a href="https://www.sih.gov.in" target="_blank" rel="noreferrer">sih.gov.in ↗</a>
      </footer>
    </div>
  );
}
