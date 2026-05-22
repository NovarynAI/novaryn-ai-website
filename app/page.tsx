import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-white/10">
        <span className="text-xl font-bold tracking-tight">Novaryn</span>
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-sm text-white/60 hover:text-white transition">Dashboard</Link>
          <Link href="/login" className="text-sm bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-white/90 transition">Get started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-4 pt-32 pb-24">
        <div className="text-xs font-medium tracking-widest text-white/40 uppercase mb-6">AI-powered growth platform</div>
        <h1 className="text-6xl font-bold tracking-tight max-w-3xl leading-tight mb-6">
          Build the best version of yourself. Daily.
        </h1>
        <p className="text-lg text-white/50 max-w-xl mb-10">
          Novaryn gives you AI-powered modules for skills, fitness, language, writing and mental training — all in one place.
        </p>
        <div className="flex gap-4">
          <Link href="/dashboard" className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-white/90 transition">
            Start for free →
          </Link>
          <Link href="#modules" className="border border-white/20 px-6 py-3 rounded-full text-white/70 hover:text-white hover:border-white/40 transition">
            See modules
          </Link>
        </div>
      </section>

      {/* Modules */}
      <section id="modules" className="px-8 pb-32 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">Everything you need to grow</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Novaryn Skills", desc: "Master a new micro-skill every day with personalized AI coaching.", icon: "⚡" },
            { title: "Novaryn Words", desc: "Learn vocabulary in any language with spaced repetition AI.", icon: "📖" },
            { title: "Novaryn Fit", desc: "Daily workouts and nutrition plans tailored to your goals.", icon: "💪" },
            { title: "Novaryn Mind", desc: "Train your brain with daily puzzles and mental challenges.", icon: "🧠" },
            { title: "Novaryn Write", desc: "Improve your writing with daily prompts and AI feedback.", icon: "✍️" },
            { title: "More coming", desc: "New modules are being built. Stay tuned.", icon: "🚀" },
          ].map((m) => (
            <div key={m.title} className="border border-white/10 rounded-2xl p-6 hover:border-white/20 transition">
              <div className="text-3xl mb-4">{m.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{m.title}</h3>
              <p className="text-sm text-white/50">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-8 py-6 text-center text-xs text-white/30">
        © 2026 Novaryn. All rights reserved.
      </footer>
    </div>
  );
}