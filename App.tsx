/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  Briefcase, 
  Mail, 
  Github, 
  Linkedin, 
  Cpu, 
  Calculator, 
  Globe, 
  ChevronRight,
  ExternalLink,
  MapPin,
  Calendar
} from "lucide-react";
import { useState, useEffect } from "react";

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["About", "Experience", "Projects", "Contact"];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md border-b border-zinc-200 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="text-xl font-bold tracking-tighter text-zinc-900 flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white text-xs">
            PA
          </div>
          <span>Portfolio</span>
        </motion.div>
        
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-zinc-900 text-white px-5 py-2 rounded-full text-sm font-medium shadow-lg shadow-zinc-200"
        >
          Resume
        </motion.button>
      </div>
    </motion.nav>
  );
};

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center section-padding relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-emerald-50 rounded-full blur-3xl -z-10 opacity-60" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-blue-50 rounded-full blur-3xl -z-10 opacity-60" />

      <div className="max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 bg-zinc-100 text-zinc-600 rounded-full text-xs font-semibold tracking-wider uppercase mb-6">
            Accountant & AI Enthusiast
          </span>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-zinc-900 mb-8 leading-[0.9]">
            Bridging Finance <br />
            <span className="text-zinc-400">&</span> Intelligence.
          </h1>
          <p className="text-xl text-zinc-600 max-w-2xl mb-10 leading-relaxed">
            14 years of global finance leadership across Sri Lanka, Philippines, and the Maldives. 
            Currently optimizing aviation revenue while exploring the frontiers of AI technology.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <motion.a
              href="#projects"
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 bg-zinc-900 text-white px-8 py-4 rounded-2xl font-medium shadow-xl shadow-zinc-200 group"
            >
              View Projects
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <div className="flex items-center gap-4 px-4">
              <a href="#" className="p-3 bg-white border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 bg-white border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  const skills = [
    { category: "Finance", items: ["Financial Reporting", "IFRS", "Revenue Audit", "Strategic Planning", "Taxation", "Budgeting"] },
    { category: "Technology", items: ["AI Integration", "Python", "Data Analysis", "SQL", "Automation", "LLMs"] },
    { category: "Tools", items: ["SAP", "Oracle", "PowerBI", "Excel (Expert)", "VBA", "React"] }
  ];

  return (
    <section id="about" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative lg:sticky lg:top-32"
        >
          <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-zinc-100 relative">
            <img 
              src="/Profile.png" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://picsum.photos/seed/accountant/800/1000";
              }}
              alt="Profile" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 to-transparent" />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-2xl shadow-2xl border border-zinc-100 hidden lg:block">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-zinc-900">14+</p>
                <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Years Experience</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold tracking-tight text-zinc-900 mb-6">The Journey of a Financial Architect</h2>
          <div className="space-y-6 text-zinc-600 leading-relaxed mb-12">
            <p>
              My career has been a global odyssey, starting in the vibrant markets of <strong>Sri Lanka</strong>, 
              maturing through strategic leadership in the <strong>Philippines</strong>, and now navigating 
              the complex skies of <strong>Maldives</strong> aviation.
            </p>
            <p>
              As a Head of Finance and now a Revenue Accountant, I've always looked beyond the spreadsheets. 
              I believe the future of accounting isn't just about recording history—it's about predicting it. 
              This conviction led me to the world of Artificial Intelligence.
            </p>
          </div>

          <div className="space-y-8">
            <h3 className="text-xl font-bold text-zinc-900 uppercase tracking-widest text-sm">Core Expertise</h3>
            <div className="grid sm:grid-cols-2 gap-8">
              {skills.map((skillGroup) => (
                <div key={skillGroup.category}>
                  <h4 className="text-zinc-900 font-bold mb-4 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    {skillGroup.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((item) => (
                      <span key={item} className="text-xs bg-zinc-50 text-zinc-600 px-3 py-1.5 rounded-lg border border-zinc-100">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Experience = () => {
  const experiences = [
    {
      role: "Revenue Accountant",
      company: "Trans Maldivian Airways",
      location: "Maldives",
      period: "Feb 2025 - Present",
      description: "Managing complex revenue streams and implementing automated audit processes in the world's largest seaplane operator.",
      icon: <Globe className="w-5 h-5" />
    },
    {
      role: "Head of Finance",
      company: "LOLC Finance Philippines Inc.",
      location: "Philippines",
      period: "2019 - 2025",
      description: "Led financial operations, strategic budgeting, and digital transformation initiatives for a leading microfinance institution.",
      icon: <Briefcase className="w-5 h-5" />
    },
    {
      role: "Accountant",
      company: "LOLC Holdings PLC",
      location: "Sri Lanka",
      period: "2013 - 2019",
      description: "Established foundational expertise in accounting principles and financial reporting for one of Sri Lanka's largest conglomerates.",
      icon: <Calculator className="w-5 h-5" />
    }
  ];

  return (
    <section id="experience" className="section-padding bg-zinc-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-zinc-900 mb-4">Professional Timeline</h2>
          <p className="text-zinc-500">A decade and a half of financial excellence across borders.</p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8 border-l border-zinc-200 pb-8 last:pb-0"
            >
              <div className="absolute left-[-17px] top-0 w-8 h-8 bg-white border border-zinc-200 rounded-full flex items-center justify-center text-zinc-900 shadow-sm">
                {exp.icon}
              </div>
              <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-zinc-900">{exp.role}</h3>
                    <p className="text-zinc-500 font-medium">{exp.company}</p>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-1">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 uppercase tracking-widest">
                      <Calendar className="w-3 h-3" /> {exp.period}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 uppercase tracking-widest">
                      <MapPin className="w-3 h-3" /> {exp.location}
                    </span>
                  </div>
                </div>
                <p className="text-zinc-600 leading-relaxed">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "AI Revenue Auditor",
      category: "AI + Finance",
      description: "An automated system using LLMs to reconcile aviation ticket data with bank settlements.",
      tech: ["Python", "OpenAI API", "SQL"],
      image: "https://picsum.photos/seed/ai-finance/800/600"
    },
    {
      title: "Predictive Cash Flow",
      category: "Data Science",
      description: "Machine learning model to forecast seasonal revenue fluctuations in island-based tourism.",
      tech: ["R", "TensorFlow", "PowerBI"],
      image: "https://picsum.photos/seed/data/800/600"
    },
    {
      title: "Digital Finance Hub",
      category: "Transformation",
      description: "A centralized dashboard for multi-currency reporting across Southeast Asian subsidiaries.",
      tech: ["React", "Node.js", "D3.js"],
      image: "https://picsum.photos/seed/dashboard/800/600"
    }
  ];

  return (
    <section id="projects" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold tracking-tight text-zinc-900 mb-4">Selected Works</h2>
            <p className="text-zinc-500">Where accounting precision meets technological innovation.</p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="text-sm font-bold uppercase tracking-widest text-zinc-900 flex items-center gap-2 border-b-2 border-zinc-900 pb-1"
          >
            View All Projects <ExternalLink className="w-4 h-4" />
          </motion.button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-video rounded-3xl overflow-hidden mb-6 bg-zinc-100 relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-zinc-900/10 group-hover:bg-transparent transition-colors" />
              </div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2 block">
                {project.category}
              </span>
              <h3 className="text-2xl font-bold text-zinc-900 mb-3 group-hover:text-emerald-600 transition-colors">
                {project.title}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="text-[10px] font-bold bg-zinc-100 text-zinc-500 px-2 py-1 rounded-md uppercase tracking-wider">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="section-padding bg-zinc-900 text-white rounded-t-[3rem] md:rounded-t-[5rem]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
        <div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">Let's build the <br />future of finance.</h2>
          <p className="text-zinc-400 text-lg mb-12 max-w-md">
            Whether you have a project in mind or just want to discuss the intersection of AI and accounting, I'm always open to new conversations.
          </p>
          
          <div className="space-y-6">
            <a href="mailto:hello@example.com" className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Email Me</p>
                <p className="text-lg font-medium">accountant@example.com</p>
              </div>
            </a>
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Based In</p>
                <p className="text-lg font-medium">Maldives</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 p-8 md:p-12 rounded-[2.5rem] border border-white/10">
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Name</label>
                <input type="text" className="w-full bg-transparent border-b border-white/20 py-3 focus:border-emerald-500 outline-none transition-colors" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Email</label>
                <input type="email" className="w-full bg-transparent border-b border-white/20 py-3 focus:border-emerald-500 outline-none transition-colors" placeholder="john@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Message</label>
              <textarea rows={4} className="w-full bg-transparent border-b border-white/20 py-3 focus:border-emerald-500 outline-none transition-colors resize-none" placeholder="How can I help you?"></textarea>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white text-zinc-900 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-colors"
            >
              Send Message
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-zinc-500 py-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-sm">© 2026 Professional Portfolio. All rights reserved.</p>
        <div className="flex gap-8 text-sm font-medium">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

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
      <Footer />
    </div>
  );
}
