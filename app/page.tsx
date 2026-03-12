"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const NAV_LINKS = ["About", "Projects", "Skills", "Experience", "Contact"];

const PROJECTS = [
  {
    title: "Facial, Age & Gender Recognition",
    tags: ["Python", "Flask", "OpenCV", "YOLOv8"],
    color: "#00ff9d",
    description:
      "Real-time facial detection and demographic classification system with fine-tuned YOLOv8. Streams live webcam input via Flask RESTful API at 12–18 FPS with annotated bounding boxes.",
    stats: [
      { label: "Latency Reduction", value: "30%" },
      { label: "Stream Rate", value: "18 FPS" },
      { label: "Model", value: "YOLOv8" },
    ],
    github: "https://github.com/letrunghieu313",
  },
  {
    title: "Amazon Drone Delivery System",
    tags: ["C++", "JavaScript", "Python"],
    color: "#00cfff",
    description:
      "Full-stack drone delivery simulation system built in C++ with front-end and back-end integration. Led Agile development using Jira, boosting team productivity by 30%.",
    stats: [
      { label: "Team Productivity", value: "+30%" },
      { label: "Stack", value: "Full-Stack" },
      { label: "Method", value: "Agile" },
    ],
    github: "https://github.com/letrunghieu313",
  },
  {
    title: "Smart Lawn Watering System",
    tags: ["C/C++", "Python", "Raspberry Pi", "Arduino"],
    color: "#a78bfa",
    description:
      "IoT system using Raspberry Pi 4 and Arduino to automate lawn watering based on real-time weather data. Reduced water waste by 40% through data-driven eco-friendly decisions.",
    stats: [
      { label: "Water Waste Reduced", value: "40%" },
      { label: "Response Time", value: "+30%" },
      { label: "Weather Accuracy", value: "5 min" },
    ],
    github: "https://github.com/letrunghieu313",
  },
];

const SKILLS = {
  Languages: ["Java", "JavaScript", "Python", "C/C++", "SQL", "TypeScript"],
  "Frameworks & Libraries": ["React", "Node.js", "Flask", "OpenCV", "PyTorch", "Next.js"],
  "Tools & Software": ["Git", "Docker", "Jira", "Figma", "VSCode", "IntelliJ"],
  "Hardware & Systems": ["Raspberry Pi", "Arduino", "Embedded C/C++", "PID Control", "3D Printing"],
};

const EXPERIENCE = [
  {
    role: "Lead Instructor",
    company: "Youth Tech Inc",
    period: "May 2025 – Aug 2025",
    location: "Minneapolis, MN",
    color: "#00ff9d",
    bullets: [
      "Led programming instruction for K–12 students covering conditionals, loops, and variables.",
      "Translated real-world scenarios into algorithmic steps and structured code.",
      "Designed hands-on coding exercises reinforcing computational thinking.",
    ],
  },
  {
    role: "Server & Trainer",
    company: "Rolls & Bowl Asian Cook House",
    period: "Jun 2022 – Jul 2024",
    location: "Minneapolis, MN",
    color: "#00cfff",
    bullets: [
      "Assisted 50+ customers daily, maintaining a 95% satisfaction rating.",
      "Trained new employees in procedures, plating, and customer service.",
      "Increased sales by 20% through proactive recommendations during peak hours.",
    ],
  },
];

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("About");
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animated grid canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const gridSize = 60;
      ctx.strokeStyle = "rgba(0, 255, 157, 0.04)";
      ctx.lineWidth = 1;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Floating dots
      for (let i = 0; i < 20; i++) {
        const x = ((i * 137 + frame * 0.3) % canvas.width);
        const y = ((i * 97 + frame * 0.2) % canvas.height);
        const alpha = 0.1 + 0.1 * Math.sin(frame * 0.02 + i);
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 157, ${alpha})`;
        ctx.fill();
      }

      frame++;
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map((id) => document.getElementById(id.toLowerCase()));
      const scrollY = window.scrollY + 120;
      sections.forEach((section) => {
        if (!section) return;
        if (section.offsetTop <= scrollY && section.offsetTop + section.offsetHeight > scrollY) {
          setActiveSection(section.id.charAt(0).toUpperCase() + section.id.slice(1));
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ background: "#050810", minHeight: "100vh", color: "#e2e8f0", fontFamily: "'DM Mono', 'Fira Code', monospace", position: "relative", overflowX: "hidden" }}>
      {/* Custom cursor glow */}
      <div style={{
        position: "fixed", top: cursorPos.y - 200, left: cursorPos.x - 200,
        width: 400, height: 400, borderRadius: "50%", pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(circle, rgba(0,255,157,0.04) 0%, transparent 70%)",
        transition: "top 0.1s, left 0.1s",
      }} />

      {/* Background canvas */}
      <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, zIndex: 0, pointerEvents: "none" }} />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "20px 48px", display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "rgba(5,8,16,0.85)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0,255,157,0.08)",
      }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 18, fontWeight: 700, color: "#00ff9d", letterSpacing: 2 }}>
          HL<span style={{ color: "#334155" }}>.</span>
        </div>
        <div style={{ display: "flex", gap: 36 }}>
          {NAV_LINKS.map((link) => (
            <button key={link} onClick={() => scrollTo(link)}
              style={{
                background: "none", border: "none", cursor: "pointer", fontSize: 12,
                letterSpacing: 2, textTransform: "uppercase",
                color: activeSection === link ? "#00ff9d" : "#64748b",
                transition: "color 0.2s",
                fontFamily: "'DM Mono', monospace",
              }}>
              {activeSection === link && <span style={{ color: "#00ff9d", marginRight: 6 }}>▸</span>}
              {link}
            </button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="about" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 48px 80px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 900 }}>
          <div style={{
            fontSize: 12, letterSpacing: 4, color: "#00ff9d", marginBottom: 20, textTransform: "uppercase",
            opacity: isLoaded ? 1 : 0, transform: isLoaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease",
          }}>
            &gt; Hello, World — I'm
          </div>
          <h1 style={{
            fontSize: "clamp(56px, 8vw, 100px)", fontWeight: 900, margin: 0, lineHeight: 1,
            fontFamily: "'Space Mono', monospace", letterSpacing: -2,
            opacity: isLoaded ? 1 : 0, transform: isLoaded ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s ease 0.1s",
          }}>
            <span style={{ color: "#f1f5f9" }}>Hieu</span>
            <span style={{ color: "#00ff9d" }}> Le</span>
          </h1>
          <div style={{
            fontSize: "clamp(16px, 2vw, 22px)", color: "#64748b", margin: "20px 0 32px",
            fontFamily: "'DM Mono', monospace", letterSpacing: 1,
            opacity: isLoaded ? 1 : 0, transform: isLoaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease 0.2s",
          }}>
            Software Engineer <span style={{ color: "#1e293b" }}>—</span>{" "}
            <span style={{ color: "#475569" }}>Hardware to Software</span>
          </div>
          <p style={{
            fontSize: 16, lineHeight: 1.8, color: "#94a3b8", maxWidth: 580, marginBottom: 40,
            opacity: isLoaded ? 1 : 0, transform: isLoaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease 0.3s",
          }}>
            CS grad from University of Minnesota (3.89 GPA, 3× Dean's List). I love building things — from embedded systems and IoT hardware to full-stack web apps and AI-powered tools. If I can make it smarter, faster, or more fun, I will.
          </p>
          <div style={{
            display: "flex", gap: 16, flexWrap: "wrap",
            opacity: isLoaded ? 1 : 0, transform: isLoaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease 0.4s",
          }}>
            <a href="https://github.com/letrunghieu313" target="_blank" rel="noreferrer"
              style={{
                padding: "12px 28px", background: "#00ff9d", color: "#050810",
                fontWeight: 700, fontSize: 12, letterSpacing: 2, textDecoration: "none",
                textTransform: "uppercase", fontFamily: "'DM Mono', monospace",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={e => { (e.target as HTMLElement).style.transform = "translateY(-2px)"; (e.target as HTMLElement).style.boxShadow = "0 8px 30px rgba(0,255,157,0.3)"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.transform = "translateY(0)"; (e.target as HTMLElement).style.boxShadow = "none"; }}>
              GitHub ↗
            </a>
            <a href="https://www.linkedin.com/in/hieuleT/" target="_blank" rel="noreferrer"
              style={{
                padding: "12px 28px", border: "1px solid rgba(0,255,157,0.3)", color: "#00ff9d",
                fontWeight: 700, fontSize: 12, letterSpacing: 2, textDecoration: "none",
                textTransform: "uppercase", fontFamily: "'DM Mono', monospace",
                transition: "border-color 0.2s, background 0.2s",
              }}
              onMouseEnter={e => { (e.target as HTMLElement).style.background = "rgba(0,255,157,0.08)"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.background = "transparent"; }}>
              LinkedIn ↗
            </a>
            <button onClick={() => scrollTo("Contact")}
              style={{
                padding: "12px 28px", border: "1px solid rgba(100,116,139,0.3)", color: "#64748b",
                background: "none", cursor: "pointer",
                fontWeight: 700, fontSize: 12, letterSpacing: 2,
                textTransform: "uppercase", fontFamily: "'DM Mono', monospace",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={e => { (e.target as HTMLElement).style.color = "#e2e8f0"; (e.target as HTMLElement).style.borderColor = "rgba(226,232,240,0.3)"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.color = "#64748b"; (e.target as HTMLElement).style.borderColor = "rgba(100,116,139,0.3)"; }}>
              Contact Me
            </button>
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 48, marginTop: 64, paddingTop: 48, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            {[["3.89", "GPA"], ["3×", "Dean's List"], ["3+", "Projects"], ["5+", "Languages"]].map(([val, label]) => (
              <div key={label}>
                <div style={{ fontSize: 32, fontWeight: 900, color: "#00ff9d", fontFamily: "'Space Mono', monospace" }}>{val}</div>
                <div style={{ fontSize: 11, color: "#475569", letterSpacing: 2, textTransform: "uppercase", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Profile picture */}
        <div style={{ display: "flex", gap: 48, marginTop: 64, paddingTop: 48, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <Image
            src="/profile.png"
            alt="Hieu Le profile picture"
            width={450}
            height={350}
            className="rounded-full border border-zinc-200 shadow-sm"
            priority
          />
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "100px 48px", position: "relative", zIndex: 1 }}>
        <SectionHeader label="02" title="Projects" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24, marginTop: 48 }}>
          {PROJECTS.map((project, i) => (
            <div key={i}
              onMouseEnter={() => setHoveredProject(i)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{
                background: hoveredProject === i ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${hoveredProject === i ? project.color + "44" : "rgba(255,255,255,0.06)"}`,
                padding: 32, cursor: "default",
                transform: hoveredProject === i ? "translateY(-4px)" : "translateY(0)",
                transition: "all 0.3s ease",
                boxShadow: hoveredProject === i ? `0 20px 60px ${project.color}11` : "none",
              }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                {project.tags.map((tag) => (
                  <span key={tag} style={{
                    fontSize: 10, letterSpacing: 1.5, padding: "3px 10px",
                    background: project.color + "15", color: project.color,
                    textTransform: "uppercase", fontFamily: "'DM Mono', monospace",
                  }}>{tag}</span>
                ))}
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 12px", color: "#f1f5f9", fontFamily: "'Space Mono', monospace", lineHeight: 1.3 }}>
                {project.title}
              </h3>
              <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, margin: "0 0 24px" }}>
                {project.description}
              </p>
              <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
                {project.stats.map((stat) => (
                  <div key={stat.label} style={{ flex: 1, padding: "12px", background: "rgba(0,0,0,0.3)", textAlign: "center" }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: project.color, fontFamily: "'Space Mono', monospace" }}>{stat.value}</div>
                    <div style={{ fontSize: 9, color: "#475569", letterSpacing: 1.5, textTransform: "uppercase", marginTop: 4 }}>{stat.label}</div>
                  </div>
                ))}
              </div>
              <a href={project.github} target="_blank" rel="noreferrer"
                style={{ fontSize: 11, color: project.color, textDecoration: "none", letterSpacing: 2, textTransform: "uppercase" }}>
                View on GitHub →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding: "100px 48px", position: "relative", zIndex: 1 }}>
        <SectionHeader label="03" title="Skills" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginTop: 48 }}>
          {Object.entries(SKILLS).map(([category, skills], i) => {
            const colors = ["#00ff9d", "#00cfff", "#a78bfa", "#f59e0b"];
            const color = colors[i % colors.length];
            return (
              <div key={category} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", padding: 28 }}>
                <div style={{ fontSize: 10, letterSpacing: 3, color, textTransform: "uppercase", marginBottom: 20, fontFamily: "'DM Mono', monospace" }}>
                  ▸ {category}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {skills.map((skill) => (
                    <span key={skill} style={{
                      fontSize: 12, padding: "6px 14px",
                      background: color + "10", color: "#94a3b8",
                      border: `1px solid ${color}22`,
                      fontFamily: "'DM Mono', monospace",
                    }}>{skill}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ padding: "100px 48px", position: "relative", zIndex: 1 }}>
        <SectionHeader label="04" title="Experience" />
        <div style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Education card */}
          <div style={{ background: "rgba(0,255,157,0.03)", border: "1px solid rgba(0,255,157,0.12)", padding: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ fontSize: 10, letterSpacing: 3, color: "#00ff9d", textTransform: "uppercase", marginBottom: 8 }}>Education</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: "#f1f5f9", fontFamily: "'Space Mono', monospace" }}>
                  University of Minnesota, Twin Cities
                </h3>
                <div style={{ fontSize: 14, color: "#64748b", marginTop: 6 }}>B.S. & Engineering in Computer Science</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 24, fontWeight: 900, color: "#00ff9d", fontFamily: "'Space Mono', monospace" }}>3.89</div>
                <div style={{ fontSize: 10, color: "#475569", letterSpacing: 2 }}>GPA · 3× DEAN'S LIST</div>
              </div>
            </div>
            <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["Software Engineering", "Data Structures & Algorithms", "Computer Vision", "Intelligent Robotics", "Computer Security"].map(course => (
                <span key={course} style={{ fontSize: 11, padding: "4px 12px", background: "rgba(0,255,157,0.08)", color: "#00ff9d", fontFamily: "'DM Mono', monospace" }}>{course}</span>
              ))}
            </div>
          </div>

          {EXPERIENCE.map((exp, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", padding: 32 }}>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: 3, color: exp.color, textTransform: "uppercase", marginBottom: 8 }}>Work Experience</div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: "#f1f5f9", fontFamily: "'Space Mono', monospace" }}>{exp.role}</h3>
                  <div style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>{exp.company} · {exp.location}</div>
                </div>
                <div style={{ fontSize: 12, color: "#475569", fontFamily: "'DM Mono', monospace" }}>{exp.period}</div>
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {exp.bullets.map((bullet, j) => (
                  <li key={j} style={{ fontSize: 14, color: "#64748b", paddingLeft: 16, position: "relative", lineHeight: 1.6 }}>
                    <span style={{ position: "absolute", left: 0, color: exp.color }}>▸</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "100px 48px", position: "relative", zIndex: 1 }}>
        <SectionHeader label="05" title="Contact" />
        <div style={{ marginTop: 48, maxWidth: 600 }}>
          <p style={{ fontSize: 18, color: "#64748b", lineHeight: 1.8, marginBottom: 40 }}>
            I'm actively looking for new opportunities. Whether you have a question, want to collaborate, or just want to say hi — my inbox is always open!
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { label: "Email", value: "letrunghieu313@gmail.com", href: "mailto:letrunghieu313@gmail.com" },
              { label: "LinkedIn", value: "linkedin.com/in/hieuleT", href: "https://www.linkedin.com/in/hieuleT/" },
              { label: "GitHub", value: "github.com/letrunghieu313", href: "https://github.com/letrunghieu313" },
              { label: "Phone", value: "(763) 412-2913", href: "tel:7634122913" },
            ].map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noreferrer"
                style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "20px 24px", background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)", textDecoration: "none",
                  transition: "border-color 0.2s, background 0.2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,157,0.3)"; (e.currentTarget as HTMLElement).style.background = "rgba(0,255,157,0.03)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)"; }}>
                <span style={{ fontSize: 10, letterSpacing: 3, color: "#00ff9d", textTransform: "uppercase", fontFamily: "'DM Mono', monospace" }}>{item.label}</span>
                <span style={{ fontSize: 14, color: "#94a3b8", fontFamily: "'DM Mono', monospace" }}>{item.value} →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "32px 48px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 1, position: "relative" }}>
        <span style={{ fontSize: 11, color: "#1e293b", fontFamily: "'DM Mono', monospace", letterSpacing: 2 }}>HIEU LE © 2026</span>
        <span style={{ fontSize: 11, color: "#1e293b", fontFamily: "'DM Mono', monospace", letterSpacing: 2 }}>BUILT WITH NEXT.JS + TYPESCRIPT</span>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Mono:wght@300;400;500&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050810; }
        ::-webkit-scrollbar-thumb { background: rgba(0,255,157,0.2); }
      `}</style>
    </div>
  );
}

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 8 }}>
      <span style={{ fontSize: 11, color: "#1e293b", fontFamily: "'Space Mono', monospace", letterSpacing: 3 }}>{label}</span>
      <div style={{ height: 1, width: 40, background: "rgba(0,255,157,0.2)" }} />
      <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 900, margin: 0, color: "#f1f5f9", fontFamily: "'Space Mono', monospace", letterSpacing: -1 }}>
        {title}
      </h2>
    </div>
  );
}
