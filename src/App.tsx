import { motion } from "framer-motion";
import {
  Briefcase,
  Mail,
  Github,
  Linkedin,
  Calculator,
  Globe,
  ChevronRight,
  ExternalLink,
  MapPin,
  Calendar
} from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md border-b border-zinc-200 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="text-xl font-bold tracking-tighter text-zinc-900 flex items-center gap-2">
          <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white text-xs">AD</div>
          <span>Amila Dewapriya</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {["About", "Experience", "Projects", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">{item}</a>
          ))}
        </div>
        <button className="bg-zinc-900 text-white px-5 py-2 rounded-full text-sm font-medium shadow-lg hover:bg-zinc-700 transition-colors">Resume</button>
      </div>
    </motion.nav>
  );
};

const Hero = () => (
  // Reduced to 70vh and lowered padding to py-12
  <section className="min-h-[70vh] flex flex-col justify-center py-12 px-6 md:px-12 lg:px-24 relative overflow-hidden">
    <div className="absolute top-1/4 -right-20 w-96 h-96 bg-emerald-50 rounded-full blur-3xl -z-10 opacity-60" />
    <div className="max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <span className="inline-block px-3 py-1 bg-zinc-100 text-zinc-600 rounded-full text-xs font-semibold uppercase mb-4">Professional Accountant & AI Enthusiast</span>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 mb-6 leading-[0.9]">
          Bridging Finance <br /><span className="text-zinc-400">&</span> Intelligence.
        </h1>
        <p className="text-lg text-zinc-600 max-w-2xl mb-8 leading-relaxed">
          14 years of global finance leadership. Currently optimizing aviation revenue at Trans Maldivian Airways while exploring the frontiers of AI technology.
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          <a href="#projects" className="flex items-center gap-2 bg-zinc-900 text-white px-8 py-4 rounded-2xl font-medium shadow-xl">
            View Projects <ChevronRight className="w-4 h-4" />
          </a>
          <div className="flex gap-4 ml-4">
            <a href="https://github.com/amila-nandasiri" target="_blank" rel="noopener noreferrer" className="p-3 bg-white border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-colors shadow-sm">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/amila-devapriya/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-colors shadow-sm">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const About = () => {
  const skills = [
    { category: "Finance", items: ["Financial Reporting", "IFRS", "Revenue Audit", "Taxation", "Budgeting"] },
    { category: "Technology", items: ["AI Integration", "Python", "Data Analysis", "SQL", "Automation"] },
    { category: "Tools", items: ["SAP", "Oracle", "PowerBI", "Excel (Expert)", "VBA", "React"] }
  ];

  return (
    // Reduced padding to py-10
    <section id="about" className="py-10 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
        <div className="relative">
          <div className="aspect-[4/5] max-h-[500px] rounded-3xl overflow-hidden bg-zinc-100">
            <img 
              src="Profile.png" 
              alt="Amila Dewapriya" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
              onError={(e) => { (e.target as HTMLImageElement).src = "https://picsum.photos/seed/accountant/800/1000"; }}
            />
          </div>
          <div className="absolute -bottom-4 -right-4 bg-white p-6 rounded-2xl shadow-xl border border-zinc-100 hidden lg:block">
            <p className="text-xl font-bold text-zinc-900">14+</p>
            <p className="text-[10px] text-zinc-500 uppercase font-semibold">Years Experience</p>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-zinc-900 mb-4">Financial Architect</h2>
          <p className="text-zinc-600 text-sm leading-relaxed mb-8">
            My career spans from the markets of <strong>Sri Lanka</strong> to strategic leadership as Head of Finance in the <strong>Philippines</strong>, 
            and now navigating aviation revenue in the <strong>Maldives</strong>.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {skills.map((group) => (
              <div key={group.category}>
                <h4 className="text-zinc-900 text-sm font-bold mb-3 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> {group.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => <span key={item} className="text-[11px] bg-zinc-50 text-zinc-600 px-2.5 py-1 rounded-lg border border-zinc-100">{item}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  const jobs = [
    { role: "Revenue Accountant", company: "Trans Maldivian Airways", loc: "Maldives", period: "2025 - Present", icon: <Globe className="w-4 h-4" /> },
    { role: "Head of Finance", company: "LOLC Finance Philippines Inc.", loc: "Philippines", period: "2019 - 2025", icon: <Briefcase className="w-4 h-4" /> },
    { role: "Accountant", company: "LOLC Holdings PLC", loc: "Sri Lanka", period: "2013 - 2019", icon: <Calculator className="w-4 h-4" /> }
  ];

  return (
    // Reduced padding and heading margins
    <section id="experience" className="py-10 px-6 md:px-12 lg:px-24 bg-zinc-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-zinc-900 mb-8">Professional Timeline</h2>
        <div className="space-y-6">
          {jobs.map((job, i) => (
            <div key={i} className="relative pl-8 border-l border-zinc-200 pb-6 last:pb-0">
              <div className="absolute left-[-13px] top-0 w-6 h-6 bg-white border border-zinc-200 rounded-full flex items-center justify-center text-zinc-900 shadow-sm">{job.icon}</div>
              <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                <div className="flex flex-col md:flex-row md:justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900">{job.role}</h3>
                    <p className="text-sm text-zinc-500">{job.company}</p>
                  </div>
                  <div className="text-left md:text-right">
                    <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest"><Calendar className="inline w-3 h-3 mr-1" /> {job.period}</span>
                    <span className="block text-[10px] font-bold text-emerald-600 uppercase tracking-widest"><MapPin className="inline w-3 h-3 mr-1" /> {job.loc}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    { title: "AI Revenue Auditor", cat: "AI + Finance", desc: "Automated reconciliation of aviation ticket data using LLMs.", img: "https://picsum.photos/seed/finance/800/600" },
    { title: "Predictive Cash Flow", cat: "Data Science", desc: "ML model to forecast seasonal revenue in tourism.", img: "https://picsum.photos/seed/data/800/600" }
  ];

  return (
    <section id="projects" className="py-10 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-zinc-900 mb-8">Selected Works</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <div key={i} className="group">
              <div className="aspect-video rounded-3xl overflow-hidden mb-4 bg-zinc-100">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{p.cat}</span>
              <h3 className="text-xl font-bold text-zinc-900 mt-1">{p.title}</h3>
              <p className="text-sm text-zinc-500 mt-1">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => (
  // Tightened contact section
  <section id="contact" className="py-10 px-6 md:px-12 lg:px-24 bg-zinc-900 text-white rounded-t-[3rem]">
    <div className="max-w-7xl mx-auto text-center py-6">
      <h2 className="text-4xl font-bold mb-4">Let's connect.</h2>
      <p className="text-zinc-400 text-sm mb-8 max-w-md mx-auto">Open for discussions on AI integration in finance and aviation accounting.</p>
      <div className="flex justify-center gap-6">
        <a href="mailto:hello@dewapriya.com" className="p-3 bg-white/10 rounded-xl hover:bg-emerald-500 transition-colors">
          <Mail className="w-5 h-5" />
        </a>
        <a href="https://www.linkedin.com/in/amila-devapriya/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-xl hover:bg-blue-600 transition-colors">
          <Linkedin className="w-5 h-5" />
        </a>
        <a href="https://github.com/amila-nandasiri" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-xl hover:bg-zinc-700 transition-colors">
          <Github className="w-5 h-5" />
        </a>
      </div>
    </div>
  </section>
);

export default function App() {
  return (
    <div className="font-sans selection:bg-emerald-500 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <footer className="bg-zinc-900 text-zinc-500 py-8 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs">© 2026 Amila Dewapriya. All rights reserved.</p>
          <div className="flex gap-6 text-xs font-medium">
            <a href="https://www.linkedin.com/in/amila-devapriya/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="https://github.com/amila-nandasiri" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
