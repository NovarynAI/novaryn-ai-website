"use client";
import Link from "next/link";

const modules = [
  {
    href: "/dashboard/skills",
    emoji: "⚡",
    title: "Skills",
    description: "Gunluk micro-skill. 5 dakikada bir sey ogren.",
    color: "from-yellow-400 to-orange-500",
    textColor: "text-yellow-400",
    soon: false,
  },
  {
    href: "/dashboard/words",
    emoji: "📖",
    title: "Words",
    description: "Her gun 3 yeni Ingilizce kelime ogren.",
    color: "from-blue-400 to-cyan-500",
    textColor: "text-blue-400",
    soon: false,
  },
  {
    href: "/dashboard/fit",
    emoji: "💪",
    title: "Fit",
    description: "Kisisel antrenman plani.",
    color: "from-green-400 to-emerald-500",
    textColor: "text-green-400",
    soon: false,
  },
  {
    href: "/dashboard/mind",
    emoji: "🧠",
    title: "Mind",
    description: "Gunluk meditasyon ve zihinsel netlik.",
    color: "from-purple-400 to-pink-500",
    textColor: "text-purple-400",
    soon: false,
  },
  {
    href: "/dashboard/write",
    emoji: "✍️",
    title: "Write",
    description: "Gunluk yazma egzersizi.",
    color: "from-rose-400 to-red-500",
    textColor: "text-rose-400",
    soon: true,
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="flex items-center justify-between px-8 py-6 border-b border-white/5">
        <span className="text-xl font-bold tracking-tight">Novaryn</span>
        <Link href="/" className="text-xs text-white/30 hover:text-white transition">Ana sayfa →</Link>
      </nav>
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="mb-12">
          <p className="text-xs text-white/30 uppercase tracking-widest mb-2">Dashboard</p>
          <h1 className="text-4xl font-bold">Bugun ne ogreniyoruz?</h1>
        </div>
        <div className="space-y-4">
          {modules.map((mod) => (
            <div key={mod.href}>
              {mod.soon ? (
                <div className="bg-[#111] border border-white/5 rounded-2xl px-6 py-5 flex items-center justify-between opacity-40 cursor-not-allowed">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{mod.emoji}</span>
                    <div>
                      <p className="font-semibold">{mod.title}</p>
                      <p className="text-xs text-white/40 mt-0.5">{mod.description}</p>
                    </div>
                  </div>
                  <span className="text-xs text-white/30 border border-white/10 rounded-full px-3 py-1">Yakinda</span>
                </div>
              ) : (
                <Link href={mod.href}>
                  <div className={`bg-gradient-to-r ${mod.color} rounded-2xl p-px hover:scale-[1.01] transition-transform`}>
                    <div className="bg-[#111] rounded-2xl px-6 py-5 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">{mod.emoji}</span>
                        <div>
                          <p className={`font-semibold ${mod.textColor}`}>{mod.title}</p>
                          <p className="text-xs text-white/40 mt-0.5">{mod.description}</p>
                        </div>
                      </div>
                      <span className="text-white/20 text-lg">→</span>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}