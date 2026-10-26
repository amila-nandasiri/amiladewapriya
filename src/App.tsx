import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Menu,
  X
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

const LINKS = {
  email: "hello@dewapriya.com",
  github: "https://github.com/amila-nandasiri",
  linkedin: "https://www.linkedin.com/in/amila-devapriya/",
  resume: "Resume.pdf"
};

const NAV = ["About", "Projects", "Experience", "Credentials", "Contact"];

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

const SectionHeader = ({ index, label, title }: { index: string; label: string; title: string }) => (
  <Reveal>
    <div className="mb-12">
      <p className="font-mono text-xs text-zinc-400 mb-3">
        <span className="text-emerald-600">{index}</span> / {label}
      </p>
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900">{title}</h2>
    </div>
  </Reveal>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled || open ? "bg-white/85 backdrop-blur-md border-b border-zinc-200/70" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
        <a href="#top" className="font-semibold tracking-tight text-zinc-900">
          Amila Dewapriya<span className="text-emerald-600">.</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {NAV.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
              {item}
            </a>
          ))}
          <a
            href={LINKS.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium bg-zinc-900 text-white px-4 py-2 rounded-full hover:bg-zinc-700 transition-colors"
          >
            Resume
          </a>
        </div>
        <button className="md:hidden p-2 -mr-2 text-zinc-700" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4 bg-white/85">
          {NAV.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)} className="text-zinc-700">
              {item}
            </a>
          ))}
          <a href={LINKS.resume} target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-medium">
            Resume ↗
          </a>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  const stats = [
    { value: "15+", label: "Years in finance" },
    { value: "6", label: "Years as Head of Finance" },
    { value: "9", label: "Finance team members led" },
    { value: "3", label: "Countries" }
  ];

  return (
    <section id="top" className="pt-32 md:pt-40 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[1fr_auto] gap-12 md:gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="inline-flex items-center gap-2 font-mono text-xs text-zinc-500 border border-zinc-200 bg-white rounded-full px-3 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Finance × Technology
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-zinc-900 leading-[1.05] mb-6">
              Finance leader who
              <br />
              builds with <span className="text-emerald-600">data &amp; code.</span>
            </h1>
            <p className="text-lg text-zinc-600 max-w-xl leading-relaxed mb-10">
              15 years in finance across Sri Lanka, the Philippines and the Maldives, including six as Head of Finance.
              I now use Python, data and AI to automate and improve the work finance teams do every day.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 bg-zinc-900 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-zinc-700 transition-colors"
              >
                View projects <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={LINKS.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white border border-zinc-200 text-zinc-900 px-6 py-3 rounded-full text-sm font-medium hover:border-zinc-400 transition-colors"
              >
                <Download className="w-4 h-4" /> Download CV
              </a>
              <div className="flex gap-1 ml-2">
                <a href={LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2.5 text-zinc-500 hover:text-zinc-900 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2.5 text-zinc-500 hover:text-zinc-900 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="hidden md:block"
          >
            <div className="w-64 lg:w-72 aspect-[4/5] rounded-3xl overflow-hidden bg-zinc-100 ring-1 ring-zinc-200 shadow-2xl shadow-zinc-300/40">
              <img src="profile.jpg" alt="Amila Dewapriya" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>

        <Reveal delay={0.2}>
          <dl className="mt-20 grid grid-cols-2 md:grid-cols-4 border-t border-zinc-200">
            {stats.map((s) => (
              <div key={s.label} className="pt-6 pr-4">
                <dt className="text-3xl font-semibold tracking-tight text-zinc-900">{s.value}</dt>
                <dd className="text-sm text-zinc-500 mt-1">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
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
    <section id="about" className="py-24 px-6 bg-white border-y border-zinc-200/70">
      <div className="max-w-6xl mx-auto">
        <SectionHeader index="01" label="About" title="An accountant with an engineer's toolkit." />
        <div className="grid lg:grid-cols-[2fr_3fr] gap-12 lg:gap-20">
          <Reveal>
            <div className="space-y-5 text-zinc-600 leading-relaxed">
              <p>
                I started out in audit and accounting in Kandy, then spent six years in branch accounting at{" "}
                <strong className="text-zinc-900 font-medium">LOLC Holdings</strong> in Sri Lanka. From 2019 I led finance at{" "}
                <strong className="text-zinc-900 font-medium">LOLC Finance Philippines</strong> as Head of Finance, running a team of nine.
              </p>
              <p>
                Today I'm Revenue Accountant at <strong className="text-zinc-900 font-medium">Trans Maldivian Airways</strong>. Alongside that, I build tools and dashboards: small, practical software that turns raw data into
                decisions.
              </p>
              <p>
                I know the numbers, the controls and the month-end reality, and I can build the technology that supports them.
              </p>
            </div>
          </Reveal>
          <div className="space-y-8">
            {skills.map((group, i) => (
              <Reveal key={group.category} delay={i * 0.08}>
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-400 mb-3">{group.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="text-sm text-zinc-700 bg-zinc-50 border border-zinc-200 px-3 py-1 rounded-full">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Maldives Rainfall Tracker",
      desc: "Interactive dashboard tracking rainfall and precipitation patterns across the Maldives, built on live Open-Meteo weather data.",
      stack: ["React", "TypeScript", "Recharts", "Open-Meteo API"],
      href: "https://github.com/amila-nandasiri/Maldives-Rainfall"
    },
    {
      title: "Malé Rainfall Dashboard",
      desc: "Python pipeline that pulls 14 days of history and a 5-day forecast for Malé, then charts rainfall against temperature.",
      stack: ["Python", "pandas", "Plotly", "REST API"],
      href: "https://github.com/amila-nandasiri/rainfall-dashboard"
    },
    {
      title: "AI Revenue Auditor",
      desc: "Automated reconciliation of aviation ticket data using large language models.",
      stack: ["AI + Finance", "LLMs", "Automation"]
    },
    {
      title: "Predictive Cash Flow",
      desc: "Machine-learning model to forecast seasonal revenue in tourism.",
      stack: ["Data Science", "Forecasting", "Python"]
    }
  ];

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader index="02" label="Projects" title="Things I've built." />
        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((p, i) => {
            const Card = p.href ? "a" : "div";
            return (
              <Reveal key={p.title} delay={(i % 2) * 0.08}>
                <Card
                  {...(p.href ? { href: p.href, target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex flex-col h-full bg-white border border-zinc-200 rounded-2xl p-7 hover:border-zinc-400 hover:shadow-lg hover:shadow-zinc-200/60 transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-mono text-xs text-zinc-400">{String(i + 1).padStart(2, "0")}</span>
                    {p.href ? (
                      <ArrowUpRight className="w-5 h-5 text-zinc-400 group-hover:text-emerald-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                    ) : (
                      <span className="font-mono text-[11px] text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded">In progress</span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight text-zinc-900 mb-2">{p.title}</h3>
                  <p className="text-zinc-600 leading-relaxed mb-6 flex-1">{p.desc}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {p.stack.map((t) => (
                      <span key={t} className="font-mono text-xs text-emerald-700">{t}</span>
                    ))}
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
        <Reveal>
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-8 text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
            <Github className="w-4 h-4" /> More on GitHub <ArrowUpRight className="w-4 h-4" />
          </a>
        </Reveal>
      </div>
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
    <section id="experience" className="py-24 px-6 bg-white border-y border-zinc-200/70">
      <div className="max-w-6xl mx-auto">
        <SectionHeader index="03" label="Experience" title="Where I've worked." />
        <div className="divide-y divide-zinc-200 border-t border-zinc-200">
          {jobs.map((job) => (
            <Reveal key={job.company}>
              <div className="grid md:grid-cols-[220px_1fr] gap-4 md:gap-12 py-10">
                <div>
                  <p className="font-mono text-sm text-zinc-900">{job.period}</p>
                  <p className="font-mono text-xs text-zinc-400 mt-1">{job.loc}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-zinc-900">{job.role}</h3>
                  <p className="text-emerald-700 mb-4">{job.company}</p>
                  <ul className="space-y-2">
                    {job.points.map((pt) => (
                      <li key={pt} className="text-zinc-600 leading-relaxed pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[0.7em] before:w-2 before:h-px before:bg-zinc-400">
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
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
    <section id="credentials" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader index="04" label="Credentials" title="Education & memberships." />
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          <Reveal>
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-400 mb-4">Education & Certificates</h3>
              <ul className="divide-y divide-zinc-200 border-t border-zinc-200">
                {education.map((e) => (
                  <li key={e.title} className="py-4 flex justify-between gap-6">
                    <div>
                      <p className="font-medium text-zinc-900">{e.title}</p>
                      <p className="text-sm text-zinc-500">{e.org}</p>
                    </div>
                    {e.year && <span className="font-mono text-sm text-zinc-400 shrink-0">{e.year}</span>}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-400 mb-4">Professional Memberships</h3>
              <ul className="divide-y divide-zinc-200 border-t border-zinc-200">
                {memberships.map((m) => (
                  <li key={m.org} className="py-4">
                    <p className="font-medium text-zinc-900">{m.org}</p>
                    <p className="text-sm text-zinc-500">{m.title}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const Contact = () => (
  <section id="contact" className="px-6 pb-6">
    <div className="max-w-6xl mx-auto bg-zinc-900 text-white rounded-3xl px-8 py-16 md:px-16 md:py-20">
      <Reveal>
        <p className="font-mono text-xs text-zinc-500 mb-4">
          <span className="text-emerald-400">05</span> / Contact
        </p>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-5 max-w-2xl">
          Let's talk finance, data or AI.
        </h2>
        <p className="text-zinc-400 max-w-lg mb-10 leading-relaxed">
          Open to finance leadership roles, finance-technology projects and conversations about bringing automation into finance teams.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href={`mailto:${LINKS.email}`} className="inline-flex items-center gap-2 bg-white text-zinc-900 px-6 py-3 rounded-full text-sm font-medium hover:bg-emerald-400 transition-colors">
            <Mail className="w-4 h-4" /> {LINKS.email}
          </a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 rounded-full text-sm font-medium hover:bg-white/10 transition-colors">
            <Linkedin className="w-4 h-4" /> LinkedIn
          </a>
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 rounded-full text-sm font-medium hover:bg-white/10 transition-colors">
            <Github className="w-4 h-4" /> GitHub
          </a>
        </div>
      </Reveal>
    </div>
  </section>
);

export default function App() {
  return (
    <div className="font-sans selection:bg-emerald-200 selection:text-zinc-900">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Credentials />
        <Contact />
      </main>
      <footer className="px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} Amila Dewapriya</p>
          <p className="font-mono text-xs">Built with React, TypeScript & Tailwind</p>
        </div>
      </footer>
    </div>
  );
}
