import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import bheemaLogo from "../assets/logos/bheema-logo.png"
import hoverBg from "../assets/logos/hover-bg.jpg"

export default function LandingPage() {
  const navigate = useNavigate()
  const [isTitleHovered, setIsTitleHovered] = useState(false)

  useEffect(() => {
    document.title = "B.H.E.E.M.A | Human-Like AI"

    const observerOptions = {
      threshold: 0.1
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed")
        }
      })
    }, observerOptions)

    document.querySelectorAll(".reveal").forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <main className="bg-[#05070A] text-white overflow-x-hidden">

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={bheemaLogo} className="w-10" />
            <span className="tracking-widest font-bold text-xl text-white">B.H.E.E.M.A</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            {["Product", "Features", "About", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-blue-400 transition-colors uppercase tracking-widest text-[10px]">
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/login")}
              className="hidden sm:block text-sm font-medium text-gray-300 hover:text-white transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-5 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="product" className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-24 md:pt-32 relative overflow-hidden">
        <div className="absolute w-[800px] h-[800px] bg-blue-600/10 blur-[120px] rounded-full -top-1/4 -left-1/4 animate-pulse" />
        <div className="absolute w-[800px] h-[800px] bg-purple-600/10 blur-[120px] rounded-full -bottom-1/4 -right-1/4 animate-pulse" />

        <div className="relative z-10 max-w-4xl mx-auto reveal">

          <div
            className="group relative inline-block mb-8"
            onMouseEnter={() => setIsTitleHovered(true)}
            onMouseLeave={() => setIsTitleHovered(false)}
          >
            {/* Cloud Particles */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="cloud-particle absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-black rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000 pointer-events-none"
                style={{
                  '--tx': `${(Math.random() - 0.5) * 800}px`,
                  '--ty': `${(Math.random() - 0.5) * 800}px`,
                  '--s': Math.random() * 3 + 1.5,
                  transitionDelay: `${i * 10}ms`
                }}
              />
            ))}

            {/* Background Hover Image */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-all duration-1000 mix-blend-lighten pointer-events-none rounded-3xl overflow-hidden"
              style={{
                backgroundImage: `url(${hoverBg})`,
                backgroundSize: '500px',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                filter: 'brightness(2) contrast(1.5)',
                transform: 'scale(1.5)'
              }}
            />

            <h1 className="text-5xl md:text-[clamp(4rem,10vw,8rem)] font-black tracking-tighter leading-none cursor-default relative z-10 select-none transition-all duration-700 group-hover:scale-105 group-hover:tracking-widest">
              B.H.E.E.M.A
            </h1>
          </div>

          <h2 className={`text-[10px] sm:text-xs md:text-sm lg:text-lg text-blue-400 font-medium tracking-[0.1em] md:tracking-[0.2em] lg:tracking-[0.3em] uppercase mb-8 opacity-80 transition-all duration-700 ${isTitleHovered ? 'scale-110 translate-y-1' : 'scale-100'}`}>
            Basic-Heuristic-Entity-Engineered For-Multitasking-Assistance
          </h2>

          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto mb-10">
            An advanced AI-powered assistant designed to tackle complex, multitasking environments with
            <span className="text-white font-medium"> speed, intelligence, and adaptability</span>.
          </p>

          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 ${isTitleHovered ? 'opacity-0 scale-95 pointer-events-none translate-y-4' : 'opacity-100 scale-100'}`}>
            <button
              onClick={() => navigate("/app")}
              className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-all"
            >
              Get Started Free
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            </button>
            <button className="px-8 py-4 bg-transparent border border-white/10 rounded-full font-bold text-lg hover:bg-white/5 transition-all text-gray-300">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* ARCHITECTURE / VISUAL SECTION */}
      <section id="about" className="py-32 relative reveal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Neural Architecture</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              B.H.E.E.M.A operates on a multi-layered heuristic engine that mimics high-level human cognitive functions.
            </p>
          </div>

          <div className="relative group p-1 bg-gradient-to-b from-blue-500/20 to-purple-500/20 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(37,99,235,0.1)]">
            <div className="bg-[#0B0F14] rounded-[22px] overflow-hidden p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                    Cognitive Processing
                  </h3>
                  <div className="space-y-6">
                    {[
                      { title: "Heuristic Search", desc: "Adaptive pathfinding for complex decision trees." },
                      { title: "Contextual Memory", desc: "Long-term persistence with semantic retrieval." },
                      { title: "Neural Synthesis", desc: "Merging symbolic logic with deep learning patterns." }
                    ].map((item, i) => (
                      <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all cursor-default">
                        <h4 className="font-bold text-blue-400 mb-1">{item.title}</h4>
                        <p className="text-sm text-gray-400">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-80 bg-black/40 rounded-2xl border border-white/5 relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent opacity-50" />
                  <div className="flex flex-col items-center gap-6 animate-pulse">
                    <img src={bheemaLogo} className="w-24 opacity-20 grayscale brightness-200" />
                    <span className="text-blue-500 font-mono text-sm tracking-widest uppercase">Neural Flow Active</span>
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute top-10 left-10 w-24 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent rotate-45" />
                  <div className="absolute bottom-10 right-10 w-24 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent -rotate-45" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION / FEATURES SECTION */}
      <section id="features" className="py-32 bg-[#080A0F] reveal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 text-left reveal delay-100">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                To bridge the gap between deterministic automation and adaptive intelligence, creating an entity that truly assists across multi-domain tasks.
              </p>
            </div>
            <button className="text-blue-400 font-bold flex items-center gap-2 hover:gap-4 transition-all">
              EXPLORE ALL FEATURES <span>→</span>
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Human Reasoning", desc: "Deep contextual and logical understanding beyond simple pattern matching.", icon: "🧠" },
              { title: "Emotion Awareness", desc: "Sophisticated intent detection and sentiment analysis for natural flow.", icon: "🎭" },
              { title: "Adaptive Learning", desc: "Continuous improvement via real-time feedback loops and user interaction.", icon: "🔄" },
              { title: "Modular Design", desc: "Plug-and-play architecture for seamless integration with any environment.", icon: "🧩" }
            ].map((f, i) => (
              <div
                key={i}
                className={`group p-8 bg-[#0B0F14] border border-white/5 rounded-3xl hover:border-blue-500/40 hover:bg-[#0E1219] hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.15)] transition-all duration-500 hover:-translate-y-2 cursor-pointer reveal`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-500">{f.icon}</div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors uppercase tracking-wider">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS / INFRASTRUCTURE SECTION */}
      <section className="py-24 border-y border-white/5 bg-black/20 reveal">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-bold tracking-[0.3em] uppercase text-gray-500 mb-12 reveal delay-100">
            Powered by industry leading infrastructure
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700 reveal delay-200">
            {["React", "Vite", "Tailwind", "Node.js", "Express", "PostgreSQL"].map((logo) => (
              <div key={logo} className="text-xl font-black tracking-tighter text-white">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 flex justify-center px-6 relative overflow-hidden reveal">
        <div className="absolute inset-0 bg-blue-600/5 blur-[100px] rounded-full transform translate-y-1/2" />
        <div className="max-w-4xl w-full bg-gradient-to-b from-[#0B0F14] to-transparent p-16 rounded-[40px] text-center border border-white/5 relative z-10 reveal delay-200">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Experience the Next Frontier of Heuristic Intelligence</h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            Join the research initiative and experience the next generation of heuristic AI assistants.
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => navigate("/app")}
              className="px-12 py-5 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-500 transition-all shadow-[0_10px_30px_-10px_rgba(37,99,235,0.5)] active:scale-95"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src={bheemaLogo} className="w-8" />
              <span className="tracking-widest font-bold text-lg">B.H.E.E.M.A</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Advancing human-AI collaboration through heuristic engineering and multitasking excellence.
            </p>
          </div>
          {["Product", "Company", "Resources", "Legal"].map((cat) => (
            <div key={cat}>
              <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">{cat}</h4>
              <ul className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <li key={i}>
                    <a href="#" className="text-gray-500 hover:text-blue-400 text-sm transition-colors">Link Item {i}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-600 text-xs tracking-widest uppercase">
            © 2025 B.H.E.E.M.A Research Initiative. All rights reserved.
          </p>
          <div className="flex gap-8">
            {["Twitter", "GitHub", "Discord"].map((social) => (
              <a key={social} href="#" className="text-gray-600 hover:text-white text-xs tracking-widest uppercase transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        html {
          scroll-behavior: smooth;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .cloud-particle {
          transform: translate(-50%, -50%) scale(1);
        }
        .group:hover .cloud-particle {
          transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(var(--s));
          filter: blur(40px);
        }

        .reveal {
          opacity: 0;
          transform: translateY(40px) scale(0.98);
          filter: blur(5px);
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform, opacity, filter;
        }
        .reveal.revealed {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0);
        }
        .delay-100 { transition-delay: 100ms; }
        .delay-200 { transition-delay: 200ms; }
        .delay-300 { transition-delay: 300ms; }
        .delay-400 { transition-delay: 400ms; }
        .delay-600 { transition-delay: 600ms; }
      `}</style>

    </main>
  )
}
