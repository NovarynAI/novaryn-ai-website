"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

type Word = {
  word: string;
  meaning: string;
  sentence: string;
  sentenceTr: string;
  status?: "known" | "review" | null;
};

export default function WordsPage() {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSentence, setShowSentence] = useState(false);
  const [allDone, setAllDone] = useState(false);

  async function getWords() {
    setLoading(true);
    setAllDone(false);
    setCurrentIndex(0);
    setShowSentence(false);
    try {
      const res = await fetch("/api/words");
      const data = await res.json();
      setWords(data.words || []);
    } catch {
      setWords([]);
    }
    setLoading(false);
  }

  function handleKnown() {
    const updated = [...words];
    updated[currentIndex] = { ...updated[currentIndex], status: "k    updated[currentIndex] = { ...updated[currentInde }

  function h  function h  function h  function h  functds];
    updated[currentIndex] = { ...updated[c    updated[cust    updated[cur};
            (updated)            (update;
                                      {     setShowSentence(false);
    if (currentIndex + 1 >= updated.length) {
      setAllDone(      setAllDone(      setAllDone(      setAllDnt      setAllDone(      setAllDone(      setAllDone(entIndex];
  const knownCount = words.filter((w) => w.status === "known").length;
  const reviewCount = words.filter((w) => w.status === "review").length;

  return  
    <div className="m    <div className="m0a]    <div className="m av className="fl    <div className="m    <div className-6 border-b border-white/5">
        <Link         <Link         <Link     t-        <Lin tracking-tight">Novaryn</Link>
        <span className="text-xs font-semibold trac        <span className="text-rc        <span className="text-xs font-semibold trac        <span className="text-rc        <span className="text-xs fonNam        <span className="text-xs font-semibold trac       xl        <span className="text-xs font-semibold trac        <span className-c        <span className="text-xs font-sevaryn Words
        </h1>
        <p className="text-white/30 text-sm tracking-wide mb-12">Her gün 3 yeni kelime. Her gün biraz daha iyi.</p>

        {words.length === 0 && !loading && (
          <button
            onClick={getWords}
                                                                          ck px-10 py-4 rounded-full font-bold text-base hover:scale-105 transition-transform"
                                                                                                                                                       it                                                                                         tra                                                                                                                                                       it                                                                                         tra                                                                                                                                                 <di                                                                                                                                ntInd                                           le                                               wn                                                                                                                                                       it    it
cat ~/novaryn/app/dashboard/page.tsx
cat ~/novaryn/app/dashboard/page.tsx
cat > ~/novaryn/app/dashboard/page.tsx << 'EOF'
"use client";
import Link from "next/link";

const modules = [
  {
    href: "/dashboard/skills",
    emoji: "⚡",
    title: "Skills",
    description: "Günlük micro-skill. 5 dakikada bir şey öğren.",
    color: "from-yellow-400 to-orange-500",
    textColor: "text-yellow-400",
  },
  {
    href: "/dashboard/words",
    emoji: "📖",
    title: "Words",
    description: "Her gün 3 yeni İngilizce kelime öğren.",
    color: "from-blue-400 to-cyan-500",
    textColor: "text-blue-400",
  },
  {
    href: "/dashboard/fit",
    emoji: "💪",
    title: "Fit",
    description: "Kişisel antrenman planı. Evde veya spor salonunda.",
    color: "from-green-400 to-emerald-500",
    textColor: "text-green-400",
    soon: true,
  },
  {
    href: "/dashboard/mind",
    emoji: "🧠",
    title: "Mind",
    description: "Günlük meditasyon ve zihinsel netlik egzersizleri.",
    color: "from-purple-400 to-pink-500",
    textColor: "text-purple-400",
    soon: tr    soon: tr    soon: tr    soon: tr    soon:  emoji: "✍️"    soon: tr    soon: tr  descr    soon: tr    k yazm    soon: tr    soon: tr    i i    soon: tr    ol    soon: tr    sooto    soon: tr    soon: tr    soon: tr    soon: tr    soon:  emoji: "�xp    soon: tr    soon: tr    soon: tr     ret    soon: tr    soon: tr    n-h-screen bg-[    soon: tr    soon: tr    <nav className="flex items-center justify    soon: tr    soon: tr    soon: tr    soon: tr    soon:  elassName="text-xl font-bold tracking-tight">Novaryn</span>
        <Link href="/" className="text-xs text-white/30 hover:text-white transition">
          Ana sayfa →
        </Link>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="mb-12">
          <p className="text-xs text-white/30 uppercase tracking-widest mb-2">Dashboard</p>
          <h1 c          <h1 c          <h1 c          <h1 c          <h1 c          <iv>

        <div className="space-y-4">
          {modules.map((mod) => (
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 </div>
                  </div>
                  <span className="text-xs text-white/30 border             /10       d-full                   <span className="text-xs text-whi             ) : (
                                                                                                        rou                                                                                       Name                                5 fl                                >
                                                                                                        rou                                                                                       Name                                5 fl                                >
            <p className="text-xs text-white/40 mt-0.5">{mod.description}</p>
                        </div>
                      </div>
                      <span className="text-white/20 text-lg">→</span>
                    </div>
                  </div>
                </Link>
                                 v>
          ))}
        </div>
      </div>
    </div>
  );
}
