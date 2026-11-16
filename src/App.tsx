import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Briefcase,
  Check,
  Copy,
  Download,
  Github,
  GraduationCap,
  House,
  Layers,
  Linkedin,
  Mail,
  Moon,
  Phone,
  Sun,
  User
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const LINKS = {
  email: "amiladnandasiri@gmail.com",
  phone: "+94 773 934329",
  github: "https://github.com/amila-nandasiri",
  linkedin: "https://www.linkedin.com/in/amila-devapriya/",
  resume: "Resume.pdf"
};

const NAV = [
  { id: "top", label: "Home", icon: House },
  { id: "about", label: "About", icon: User },
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "experience", label: "Experience", icon: Layers },
  { id: "credentials", label: "Credentials", icon: GraduationCap },
  { id: "contact", label: "Contact", icon: Mail }
];

// Fades content in as it scrolls into view
const Reveal = ({ children, delay = 0 }: { children: ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

// A full-width hairline with a dot where it meets each side of the page frame
const Rule = () => (
  <div className="relative h-px bg-line" aria-hidden="true">
    <span className="hidden md:block absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full bg-ink" />
    <span className="hidden md:block absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full bg-ink" />
  </div>
);

const Label = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <p className={`font-mono text-[11px] uppercase tracking-[0.08em] text-faint ${className}`}>{children}</p>
);

const SectionHeader = ({ index, label, title, sub }: { index: string; label: string; title: string; sub: string }) => (
  <Reveal>
    <div className="mb-14">
      <Label className="mb-4">
        ({index}) {label}
      </Label>
      <h2 className="text-4xl md:text-6xl font-bold tracking-[-0.04em] leading-[1.02] text-ink">
        {title}
        <br />
        <span className="text-faint">{sub}</span>
      </h2>
    </div>
  </Reveal>
);

const useTheme = () => {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#000000" : "#f4f4f5");
  }, [dark]);
  const toggle = () =>
    setDark((d) => {
      try {
        localStorage.setItem("theme", d ? "light" : "dark");
      } catch {
        /* storage blocked: the toggle still works for this visit */
      }
      return !d;
    });
  return { dark, toggle };
};

// Which section is on screen, for the highlighted nav icon
const useActiveSection = () => {
  const [active, setActive] = useState("top");
  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.id)).filter((e): e is HTMLElement => !!e);
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((e) => obs.observe(e));
    return () => obs.disconnect();
  }, []);
  return active;
};

// "Email me" opens a small menu: a plain mailto link does nothing on computers
// with no email app set up, so offer Gmail, Outlook and copy as well.
const EmailButton = ({ className, children }: { className: string; children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: Event) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);
  const to = encodeURIComponent(LINKS.email);
  const subject = encodeURIComponent("Hello Amila");
  const options = [
    { label: "Gmail", href: `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}` },
    { label: "Outlook", href: `https://outlook.office.com/mail/deeplink/compose?to=${to}&subject=${subject}` },
    { label: "Email app", href: `mailto:${LINKS.email}?subject=${subject}` }
  ];
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(LINKS.email);
    } catch {
      window.prompt("Copy my email address:", LINKS.email);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  const item = "flex w-full items-center gap-2 px-3 py-2 rounded-lg text-sm text-ink hover:bg-soft transition-colors text-left";
  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-haspopup="menu" className={className}>
        {children}
      </button>
      {open && (
        <div role="menu" className="absolute left-0 top-full mt-2 z-40 w-60 bg-surface border border-line rounded-2xl p-1.5 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.25)]">
          <p className="px-3 pt-1.5 pb-2 font-mono text-[11px] text-faint break-all">{LINKS.email}</p>
          {options.map((o) => (
            <a key={o.label} role="menuitem" href={o.href} target={o.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" onClick={() => setOpen(false)} className={item}>
              <Mail className="w-4 h-4 text-muted" /> Open in {o.label}
            </a>
          ))}
          <button type="button" role="menuitem" onClick={copy} className={item}>
            {copied ? <Check className="w-4 h-4 text-muted" /> : <Copy className="w-4 h-4 text-muted" />} {copied ? "Copied" : "Copy address"}
          </button>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const { dark, toggle } = useTheme();
  const active = useActiveSection();
  const pill = "bg-surface/80 backdrop-blur-md border border-line rounded-full shadow-[0_4px_20px_-8px_rgba(0,0,0,0.15)]";

  return (
    <nav className="fixed top-3 md:top-5 inset-x-0 z-50 flex justify-center gap-1 sm:gap-2 px-2" aria-label="Main">
      <div className={`${pill} flex items-center p-1`}>
        {NAV.map(({ id, label, icon: Icon }) => (
          <a
            key={id}
            href={`#${id}`}
            aria-label={label}
            className={`group relative grid place-items-center w-8 h-8 sm:w-9 sm:h-9 rounded-full transition-colors ${
              active === id ? "bg-soft text-ink" : "text-muted hover:text-ink"
            }`}
          >
            <Icon className="w-4 h-4" strokeWidth={1.75} />
            <span className="pointer-events-none absolute top-full mt-2 font-mono text-[10px] uppercase tracking-wider whitespace-nowrap bg-ink text-surface rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {label}
            </span>
          </a>
        ))}
      </div>
      <button onClick={toggle} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} className={`${pill} grid place-items-center w-10 h-10 sm:w-11 sm:h-11 text-muted hover:text-ink transition-colors`}>
        {dark ? <Sun className="w-4 h-4" strokeWidth={1.75} /> : <Moon className="w-4 h-4" strokeWidth={1.75} />}
      </button>
      <a
        href={LINKS.resume}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-ink text-surface rounded-full p-1 pr-3 sm:pr-4 text-sm font-medium shadow-[0_4px_20px_-6px_rgba(0,0,0,0.35)] hover:opacity-90 transition-opacity"
      >
        <span className="grid place-items-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-surface text-ink">
          <Download className="w-4 h-4" strokeWidth={2} />
        </span>
        <span className="sm:hidden">CV</span>
        <span className="hidden sm:inline">Download CV</span>
      </a>
    </nav>
  );
};

// Hand-drawn style arrow pointing from the note down to the photo
const ScribbleArrow = () => (
  <svg viewBox="0 0 70 60" className="w-14 h-12 text-ink" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 6 C 30 4, 52 16, 56 48" />
    <path d="M47 40 L 56 49 L 63 38" />
  </svg>
);

const Hero = () => {
  const stats = [
    { value: "15+", label: "Years in finance" },
    { value: "6", label: "Years as Head of Finance" },
    { value: "9", label: "Finance team members led" },
    { value: "3", label: "Countries" }
  ];

  return (
    <section id="top">
      <div className="relative px-5 md:px-12 pt-28 md:pt-32">
        <div className="flex justify-between">
          <Label>(Portfolio 2026)</Label>
          <Label>Dewapriya.com</Label>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_auto] gap-10 lg:gap-6 items-end">
          <div className="pb-10 md:pb-14">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-8 text-[clamp(2.6rem,11vw,5.6rem)] lg:text-[clamp(3.25rem,5.4vw,5rem)] font-bold tracking-[-0.045em] leading-[0.98] text-ink"
            >
              Finance leader
              <br />
              <span className="text-faint">who loves tech.</span>
            </motion.h1>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="flex flex-wrap gap-3 mt-9">
              <a
                href="#projects"
                className="inline-flex items-center gap-1.5 bg-surface text-ink border border-ink rounded-full px-5 py-2.5 text-sm font-medium shadow-[0_3px_0_0_var(--ink)] hover:translate-y-[2px] hover:shadow-[0_1px_0_0_var(--ink)] transition-all"
              >
                See my work <ArrowUpRight className="w-4 h-4" />
              </a>
              <EmailButton className="inline-flex items-center gap-2 border border-line text-ink rounded-full px-5 py-2.5 text-sm font-medium hover:border-ink transition-colors">
                <Mail className="w-4 h-4" /> Email me
              </EmailButton>
              <div className="flex">
                <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2.5 text-muted hover:text-ink transition-colors">
                  <Linkedin className="w-5 h-5" strokeWidth={1.75} />
                </a>
                <a href={LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2.5 text-muted hover:text-ink transition-colors">
                  <Github className="w-5 h-5" strokeWidth={1.75} />
                </a>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="mt-14 md:mt-20">
              <p className="text-[15px] md:text-base font-medium text-ink">Reporting, automated.</p>
              <p className="text-[15px] md:text-base text-muted">Excel, Power BI and React, from ledger to dashboard.</p>
              <a href="#about" className="inline-flex items-center gap-1 mt-6 font-mono text-[11px] uppercase tracking-[0.08em] text-faint hover:text-ink transition-colors">
                Scroll <ArrowDown className="w-3 h-3" />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative justify-self-end w-[62%] max-w-[300px] sm:w-[300px] lg:w-[310px]"
          >
            <div className="absolute -left-[7.5rem] sm:-left-36 top-6 sm:top-10 flex flex-col items-end -rotate-6 select-none pointer-events-none">
              <span className="font-hand text-2xl sm:text-[28px] text-ink leading-none whitespace-nowrap">hi, I'm Amila</span>
              <span className="mr-1 sm:-mr-6">
                <ScribbleArrow />
              </span>
            </div>
            <div className="group aspect-[4/5] rounded-t-[2rem] overflow-hidden bg-soft border border-b-0 border-line">
              <img
                src="profile.jpg"
                alt="Amila Dewapriya"
                className="w-full h-full object-cover object-[50%_20%] grayscale contrast-[1.05] group-hover:grayscale-0 transition-[filter] duration-700"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <Rule />
      <dl className="grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.label} className={`px-5 md:px-8 py-7 border-line ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""}`}>
            <dt className="text-3xl md:text-4xl font-bold tracking-[-0.04em] text-ink">{s.value}</dt>
            <dd className="font-mono text-[11px] uppercase tracking-[0.06em] text-faint mt-2">{s.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

const About = () => {
  const skills = [
    {
      category: "Finance & Accounting",
      items: ["Financial Reporting", "IFRS & GAAP", "Auditing", "Forecasting & Analytics", "Revenue Recovery", "Credit Control", "Internal Controls & Risk", "Tax & GST Compliance"]
    },
    {
      category: "Data & Technology",
      items: ["Python", "pandas", "SQL", "Plotly", "React", "TypeScript", "Generative AI", "Process Automation"]
    },
    {
      category: "Systems",
      items: ["Microsoft Dynamics 365 BC", "Oracle Fusion Cloud", "Oracle E-Business Suite", "QuickBooks", "Power BI", "Advanced Excel", "Notion"]
    }
  ];
  return (
    <section id="about" className="px-5 md:px-12 py-24">
      <SectionHeader index="01" label="About" title="An accountant" sub="with an engineer's toolkit." />
      <div className="grid lg:grid-cols-[2fr_3fr] gap-12 lg:gap-20">
        <Reveal>
          <div className="space-y-5 text-muted leading-relaxed">
            <p>
              I started out in audit and accounting in Kandy, then spent six years in branch accounting at{" "}
              <strong className="text-ink font-medium">LOLC Holdings</strong> in Sri Lanka. From 2019 I led finance at{" "}
              <strong className="text-ink font-medium">LOLC Finance Philippines</strong> as Head of Finance, running a team of nine.
            </p>
            <p>
              Today I'm a Revenue Accountant at <strong className="text-ink font-medium">Trans Maldivian Airways</strong>. Alongside that, I build tools and dashboards: small, practical software that turns raw data into
              decisions.
            </p>
            <p>I know the numbers, the controls and the month-end reality, and I can build the technology that supports them.</p>
          </div>
        </Reveal>
        <div className="space-y-8">
          {skills.map((group, i) => (
            <Reveal key={group.category} delay={i * 0.08}>
              <div>
                <Label className="mb-3">{group.category}</Label>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="text-sm text-ink bg-soft border border-line px-3 py-1 rounded-full">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const btnPrimary = "inline-flex items-center gap-2 bg-ink text-surface px-5 py-2.5 rounded-full text-sm font-medium hover:opacity-85 transition-opacity";
const btnOutline = "inline-flex items-center gap-2 border border-line text-ink px-5 py-2.5 rounded-full text-sm font-medium hover:border-ink transition-colors";

const Projects = () => {
  const projects = [
    {
      title: "AR Collections Dashboard",
      tag: "Finance × Data",
      desc: "An accounts-receivable dashboard showing aging, DSO and collection effectiveness, plus a worklist that ranks customers by who to call first. Try it on sample data for a Maldives seaplane operator, or load your own.",
      points: [
        "Upload your own Excel or CSV exports. Files are processed in your browser and never uploaded",
        "Download an Excel or PDF report: summary, aged debtors and open invoices",
        "Month-end DSO and CEI rebuilt from invoice and payment history",
        "Works offline as a single HTML file"
      ],
      stack: ["React", "TypeScript", "Recharts", "Excel", "Python"],
      image: "projects/ar-collections.jpg",
      demo: "projects/ar-collections/",
      download: "projects/ar-collections/ar-collections-dashboard.html",
      code: "https://github.com/amila-nandasiri/ar-collections-dashboard"
    },
    {
      title: "13-Week Cash Flow Forecast",
      tag: "Treasury × Data",
      desc: "The short-term liquidity model lenders ask for. It runs best, base and worst-case scenarios side by side, draws a credit facility to protect minimum cash, and tests a liquidity covenant every week.",
      points: [
        "Scenario sliders for sales, collection delays, bad debt, fuel price, costs and capex timing",
        "Credit facility draws, repayments and interest, with a weekly covenant test and funding-gap warning",
        "Lender-style 13-week table, cash bridge, and Excel or PDF reports",
        "Upload your own forecast from an Excel template; works offline"
      ],
      stack: ["React", "TypeScript", "Recharts", "Excel"],
      image: "projects/cash-flow.jpg",
      demo: "projects/cash-flow/",
      download: "projects/cash-flow/cash-flow-forecast.html",
      code: "https://github.com/amila-nandasiri/cash-flow-forecast"
    },
    {
      title: "IFRS 16 Lease Calculator",
      tag: "Technical accounting × Code",
      desc: "Lease accounting for a whole portfolio, from aircraft and property to vehicles. It measures the lease liability and right-of-use asset, builds the schedules and journals, and produces the year-end disclosures.",
      points: [
        "Initial measurement with escalations, incentives, direct costs, restoration and purchase options",
        "Monthly amortisation, depreciation and journal entries, with short-term and low-value exemptions",
        "Year-end disclosures: movements, current/non-current split, P&L, cash flow and maturity analysis",
        "Upload your lease register from an Excel template; Excel and PDF reports; works offline"
      ],
      stack: ["IFRS 16", "React", "TypeScript", "Excel"],
      image: "projects/ifrs16.jpg",
      demo: "projects/ifrs16/",
      download: "projects/ifrs16/ifrs16-lease-calculator.html",
      code: "https://github.com/amila-nandasiri/ifrs16-lease-calculator"
    },
    {
      title: "Three-Statement Financial Model",
      tag: "FP&A × Modelling",
      desc: "An integrated income statement, balance sheet and cash flow, from two years of actuals into a five-year forecast. It is driver-based, with base, upside and downside scenarios, and the balance sheet balances every year.",
      points: [
        "Working capital from receivable, inventory and payable days; capex, depreciation and IFRS 16 leases",
        "Automatic revolver protecting minimum cash, with leverage and interest-cover covenant tests",
        "Funding-gap warning: the downside fully draws the revolver during a fleet-renewal year",
        "Exports a working Excel model with about 300 live formulas, verified to match the app"
      ],
      stack: ["Financial modelling", "React", "TypeScript", "Excel"],
      image: "projects/three-statement.jpg",
      demo: "projects/three-statement/",
      download: "projects/three-statement/three-statement-model.html",
      code: "https://github.com/amila-nandasiri/three-statement-model"
    },
    {
      title: "Loan Repayment Calculator",
      tag: "Treasury × Accounting",
      desc: "Repayment schedules for equal-instalment, equal-principal and interest-only loans, showing the true cost of borrowing after fees and the borrower's IFRS 9 view.",
      points: [
        "Extra payments and lump sums: interest and time saved, finishing sooner or lowering payments",
        "Grace periods and floating-rate resets; compares the three repayment types side by side",
        "Effective interest rate and APR including fees, checked against Excel's PMT",
        "IFRS 9 amortised-cost schedule with the effective rate revised at a rate reset; shareable links"
      ],
      stack: ["IFRS 9", "React", "TypeScript", "Excel"],
      image: "projects/loan-calculator.jpg",
      demo: "projects/loan-calculator/",
      download: "projects/loan-calculator/loan-repayment-calculator.html",
      code: "https://github.com/amila-nandasiri/loan-repayment-calculator"
    }
  ];

  const otherProjects = [
    {
      title: "Twin Otter Seaplane Explorer",
      tag: "3D × Aviation",
      desc: "An interactive 3D model of the seaplane behind Maldives resort transfers. Turn it, zoom in and take a guided tour of each part.",
      image: "projects/twin-otter.jpg",
      href: "projects/twin-otter/"
    },
    {
      title: "Seaplane Crosswind Landing",
      tag: "3D × Aviation",
      desc: "An animated landing in a crosswind, from crab and wing-low flare to upwind float first, compared with what goes wrong without correction.",
      image: "projects/crosswind.jpg",
      href: "projects/crosswind/"
    },
    {
      title: "Seaplane vs Airliners",
      tag: "3D × Aviation",
      desc: "The Twin Otter next to the ATR 72, A320neo, 737-800, 787-9 and A350 at true scale, with cruising heights, a speed race from Malé and full specs.",
      image: "projects/seaplane-vs-airliners.jpg",
      href: "projects/seaplane-vs-airliners/"
    }
  ];
  return (
    <section id="projects" className="px-5 md:px-12 py-24">
      <SectionHeader index="02" label="Projects" title="Finance tools" sub="I've built." />
      <div className="space-y-6">
        {projects.map((p, i) => (
          <Reveal key={p.title}>
            <article className="grid lg:grid-cols-[1.15fr_1fr] bg-surface border border-line rounded-3xl overflow-hidden hover:border-faint transition-colors">
              <a href={p.demo} className="group block bg-soft border-b lg:border-b-0 lg:border-r border-line overflow-hidden">
                <img
                  src={p.image}
                  alt={`${p.title} screenshot`}
                  loading="lazy"
                  className="w-full h-full object-cover object-left-top group-hover:scale-[1.02] transition-transform duration-500"
                />
              </a>
              <div className="p-7 md:p-9 flex flex-col min-w-0">
                <div className="flex justify-between gap-4 mb-3">
                  <Label>{p.tag}</Label>
                  <Label>{String(i + 1).padStart(2, "0")}</Label>
                </div>
                <h3 className="text-2xl md:text-[28px] font-bold tracking-[-0.03em] text-ink mb-3">{p.title}</h3>
                <p className="text-muted leading-relaxed mb-5">{p.desc}</p>
                <ul className="space-y-2 mb-6">
                  {p.points.map((pt) => (
                    <li key={pt} className="text-sm text-muted leading-relaxed pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[0.65em] before:w-2 before:h-px before:bg-faint">
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mb-7">
                  {p.stack.map((t) => (
                    <span key={t} className="font-mono text-xs text-faint">{t}</span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 mt-auto">
                  <a href={p.demo} className={btnPrimary}>
                    Open live demo <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <a href={p.download} download className={btnOutline}>
                    <Download className="w-4 h-4" /> Download (HTML)
                  </a>
                  <a href={p.code} target="_blank" rel="noopener noreferrer" className={btnOutline}>
                    <Github className="w-4 h-4" /> View code
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-20">
          <Label className="mb-5">Other projects</Label>
          <div className="grid md:grid-cols-2 gap-5">
            {otherProjects.map((p) => (
              <a
                key={p.title}
                href={p.href}
                className="group grid grid-cols-[120px_1fr] sm:grid-cols-[160px_1fr] gap-4 items-center bg-surface border border-line rounded-2xl p-3 pr-5 hover:border-ink transition-colors"
              >
                <img src={p.image} alt={`${p.title} preview`} loading="lazy" className="w-full aspect-[16/10] object-cover rounded-xl bg-soft" />
                <div className="min-w-0">
                  <Label>{p.tag}</Label>
                  <p className="font-semibold text-ink mt-1 inline-flex items-center gap-1">
                    {p.title}
                    <ArrowUpRight className="w-4 h-4 text-faint group-hover:text-ink transition-colors" />
                  </p>
                  <p className="text-sm text-muted leading-snug mt-1">{p.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
};

const Experience = () => {
  const jobs = [
    {
      role: "Revenue Accountant",
      company: "Trans Maldivian Airways",
      loc: "Malé, Maldives",
      period: "2025 — Present",
      points: [
        "Own end-to-end accounts receivable and credit control for luxury resort clients",
        "Build Excel and Power BI dashboards to analyse revenue, monitor KPIs and forecast cash flow",
        "Reconcile high-volume passenger, charter, cargo and ancillary revenue, resolving discrepancies",
        "Prepare monthly management reports and TGST/GST returns in line with MIRA regulations",
        "Use Microsoft Dynamics and automation tools to streamline accounting and reporting"
      ]
    },
    {
      role: "Head of Finance",
      company: "LOLC Finance Philippines Inc.",
      loc: "Cabanatuan City, Philippines",
      period: "2019 — 2025",
      points: [
        "Led the Finance Operations and Corporate Finance departments, managing a team of nine",
        "Owned financial reporting, audit, budgeting, forecasting and variance analysis",
        "Managed banking relationships and funding partners on credit facilities and financing",
        "Designed financial policies, SOPs and internal control frameworks",
        "Drove process automation and finance transformation using Excel, Power BI and Oracle ERP"
      ]
    },
    {
      role: "Branch Accountant",
      company: "LOLC Holdings PLC",
      loc: "Colombo, Sri Lanka",
      period: "2012 — 2019",
      points: [
        "Prepared financial and management reports on branch performance and profitability",
        "Ensured compliance with controls and policies; resolved discrepancies across regional branches",
        "Managed purchase orders and accountability for branch assets"
      ]
    },
    {
      role: "Accounts Executive",
      company: "Accounting Consultancy Services Kandy",
      loc: "Kandy, Sri Lanka",
      period: "2011 — 2012",
      points: [
        "Performed accounting, audit and compliance work for manufacturing, transport and non-profit clients",
        "Prepared financial statements, audit reports and management information reports"
      ]
    }
  ];
  return (
    <section id="experience" className="px-5 md:px-12 py-24">
      <SectionHeader index="03" label="Experience" title="15 years," sub="three countries." />
      <div className="divide-y divide-line border-t border-line">
        {jobs.map((job) => (
          <Reveal key={job.company}>
            <div className="grid md:grid-cols-[220px_1fr] gap-4 md:gap-12 py-10">
              <div>
                <p className="font-mono text-sm text-ink">{job.period}</p>
                <p className="font-mono text-xs text-faint mt-1">{job.loc}</p>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold tracking-[-0.03em] text-ink">{job.role}</h3>
                <p className="text-muted mb-4">{job.company}</p>
                <ul className="space-y-2">
                  {job.points.map((pt) => (
                    <li key={pt} className="text-muted leading-relaxed pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[0.7em] before:w-2 before:h-px before:bg-faint">
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

const Credentials = () => {
  const education = [
    { title: "Master of Business Administration", org: "London Metropolitan University", year: "2024" },
    { title: "Diploma in Credit Management", org: "Sri Lanka Institute of Credit Management", year: "2021" },
    { title: "Certificate in Banking & Finance", org: "Institute of Bankers Sri Lanka", year: "2013" },
    { title: "Google AI Professional Certificates", org: "Google" },
    { title: "Claude 101", org: "Anthropic" }
  ];
  const memberships = [
    { title: "Certified Management Accountant · CMA64967", org: "CMA Australia" },
    { title: "Member · IPA374217", org: "Institute of Public Accountants" },
    { title: "Member · M11025", org: "Association of Accounting Technicians of Sri Lanka" },
    { title: "Member · ACPM02190", org: "Chartered Professional Managers Sri Lanka" }
  ];
  return (
    <section id="credentials" className="px-5 md:px-12 py-24">
      <SectionHeader index="04" label="Credentials" title="Education" sub="& memberships." />
      <div className="grid md:grid-cols-2 gap-12 md:gap-20">
        <Reveal>
          <div>
            <Label className="mb-4">Education & certificates</Label>
            <ul className="divide-y divide-line border-t border-line">
              {education.map((e) => (
                <li key={e.title} className="py-4 flex justify-between gap-6">
                  <div>
                    <p className="font-medium text-ink">{e.title}</p>
                    <p className="text-sm text-muted">{e.org}</p>
                  </div>
                  {e.year && <span className="font-mono text-sm text-faint shrink-0">{e.year}</span>}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div>
            <Label className="mb-4">Professional memberships</Label>
            <ul className="divide-y divide-line border-t border-line">
              {memberships.map((m) => (
                <li key={m.org} className="py-4">
                  <p className="font-medium text-ink">{m.org}</p>
                  <p className="text-sm text-muted">{m.title}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const Contact = () => (
  <section id="contact" className="p-3 md:p-6">
    <div className="bg-ink text-surface rounded-[1.75rem] px-7 py-16 md:px-14 md:py-20">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] opacity-50 mb-4">(05) Contact</p>
        <h2 className="text-4xl md:text-6xl font-bold tracking-[-0.04em] leading-[1.02] mb-6 max-w-3xl">
          Let's talk finance,
          <br />
          <span className="opacity-45">data or AI.</span>
        </h2>
        <p className="opacity-65 max-w-lg mb-10 leading-relaxed">
          Open to finance leadership roles, finance-technology projects and conversations about bringing automation into finance teams.
        </p>
        <div className="flex flex-wrap gap-3">
          <EmailButton className="inline-flex items-center gap-2 bg-surface text-ink px-6 py-3 rounded-full text-sm font-medium hover:opacity-85 transition-opacity">
            <Mail className="w-4 h-4" /> Email me
          </EmailButton>
          <a href={LINKS.resume} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-surface text-ink px-6 py-3 rounded-full text-sm font-medium hover:opacity-85 transition-opacity">
            <Download className="w-4 h-4" /> Download CV
          </a>
          <a href={`tel:${LINKS.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 border border-current/25 px-6 py-3 rounded-full text-sm font-medium hover:border-current transition-colors">
            <Phone className="w-4 h-4" /> {LINKS.phone}
          </a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-current/25 px-6 py-3 rounded-full text-sm font-medium hover:border-current transition-colors">
            <Linkedin className="w-4 h-4" /> LinkedIn
          </a>
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-current/25 px-6 py-3 rounded-full text-sm font-medium hover:border-current transition-colors">
            <Github className="w-4 h-4" /> GitHub
          </a>
        </div>
        <p className="font-mono text-xs opacity-50 mt-8 break-all">{LINKS.email}</p>
      </Reveal>
    </div>
  </section>
);

export default function App() {
  return (
    <div className="font-sans selection:bg-ink selection:text-surface overflow-x-clip">
      <Navbar />
      {/* The page "sheet": a framed white column on a light grey background */}
      <div className="max-w-6xl mx-auto bg-surface md:border-x border-line min-h-screen transition-colors duration-300">
        <main>
          <Hero />
          <Rule />
          <About />
          <Rule />
          <Projects />
          <Rule />
          <Experience />
          <Rule />
          <Credentials />
          <Contact />
        </main>
        <footer className="px-5 md:px-12 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <Label>© {new Date().getFullYear()} Amila Dewapriya</Label>
            <Label>Built with React, TypeScript & Tailwind</Label>
          </div>
        </footer>
      </div>
    </div>
  );
}
