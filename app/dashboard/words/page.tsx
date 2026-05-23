"use client";
import { useState } from "react";
import Link from "next/link";

type Word = {
  word: string;
  meaning: string;
  sentence: string;
  sentenceTr: string;
  status?: "known" | "review" | null;
};

type Level = "beginner" | "intermediate" | "advanced";

const levels = [
  { id: "beginner" as Level, label: "Baslangic", emoji: "🟢", desc: "Temel kelimeler" },
  { id: "intermediate" as Level, label: "Orta", emoji: "🟡", desc: "Gunluk konusma" },
  { id: "advanced" as Level, label: "Ileri", emoji: "🔴", desc: "Akademik / profesyonel" },
];

export default function WordsPage() {
  const [level, setLevel] = useState<Level | null>(null);
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allDone, setAllDone] = useState(false);

  async function getWords(selectedLevel: Level) {
    setLevel(selectedLevel);
    setLoading(true);
    setAllDone(false);
    setCurrentIndex(0);
    try {
      const res = await fetch(`/api/words?level=${selectedLevel}`);
      const data = await res.json();
      setWords(data.words || []);
    } catch {
      setWords([]);
    }
    setLoading(false);
  }

  function handleKnown() {
    const updated = [...words];
    updated[currentIndex] = { ...updated[currentIndex], status: "known" };
    setWords(updated);
    goNext(updated);
  }

  function handleReview() {
    const updated = [...words];
    updated[currentIndex] = { ...updated[currentIndex], status: "review" };
    setWords(updated);
    goNext(updated);
  }

  function goNext(updated: Word[]) {
    if (currentIndex + 1 >= updated.length) {
      setAllDone(true);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  }

  const current = words[currentIndex];
  const knownCount = words.filter((w) => w.status === "known").length;
  const reviewCount = words.filter((w) => w.status === "review").length;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="flex items-center justify-between px-8 py-6 border-b border-white/5">
        <Link href="/dashboard" className="text-xl font-bold tracking-tight">Novaryn</Link>
        <span className="text-xs font-semibold tracking-widest text-blue-400 uppercase">Words</span>
      </nav>

      <div className="max-w-xl mx-auto px-6 py-16 text-center">
        <div className="text-6xl mb-6">📖</div>
        <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
          Novaryn Words
        </h1>
        <p className="text-white/30 text-sm tracking-wide mb-12">Her gun 3 yeni kelime.</p>

        {!level && !loading && (
          <div className="space-y-4">
            <p className="text-white/50 text-sm mb-6">Seviyeni sec:</p>
            {levels.map((l) => (
              <button
                key={l.id}
                onClick={() => getWords(l.id)}
                className="w-full bg-[#111] border border-white/10 rounded-2xl px-6 py-4 flex items-center gap-4 hover:border-white/30 transition text-left"
              >
                <span className="text-2xl">{l.emoji}</span>
                <div>
                  <p className="font-semibold">{l.label}</p>
                  <p className="text-xs text-white/30">{l.desc}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-white/30 text-sm tracking-widest uppercase">Yukleniyor...</p>
          </div>
        )}

        {!loading && words.length > 0 && !allDone && current && (
          <div className="space-y-6">
            <div className="flex justify-center gap-2 mb-4">
              {words.map((w, i) => (
                <div key={i} className={`w-3 h-3 rounded-full transition-all ${i === currentIndex ? "bg-blue-400 scale-125" : w.status === "known" ? "bg-green-400" : w.status === "review" ? "bg-orange-400" : "bg-white/20"}`} />
              ))}
            </div>

            <div className="bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl p-px">
              <div className="bg-[#111] rounded-2xl px-8 py-8">
                <p className="text-xs text-white/30 uppercase tracking-widest mb-4">Kelime {currentIndex + 1} / {words.length}</p>
                <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">{current.word}</h2>
                <div className="inline-block bg-white/5 rounded-full px-4 py-2 mb-6">
                  <p className="text-white/70 text-lg">{current.meaning}</p>
                </div>
                <div className="border-t border-white/5 pt-6 text-left space-y-2">
                  <p className="text-white/80 text-base italic">"{current.sentence}"</p>
                  <p className="text-white/40 text-sm">"{current.sentenceTr}"</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <button onClick={handleReview} className="border border-orange-400/30 text-orange-400 rounded-2xl py-4 text-sm font-semibold hover:bg-orange-400/10 transition">
                Tekrar goster
              </button>
              <button onClick={handleKnown} className="border border-green-400/30 text-green-400 rounded-2xl py-4 text-sm font-semibold hover:bg-green-400/10 transition">
                Biliyorum
              </button>
            </div>
          </div>
        )}

        {allDone && (
          <div className="space-y-6">
            <div className="bg-[#111] border border-white/5 rounded-2xl px-8 py-10">
              <p className="text-4xl mb-4">🎉</p>
              <h2 className="text-2xl font-bold mb-6">Bugunluk bitti!</h2>
              <div className="flex justify-center gap-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-400">{knownCount}</p>
                  <p className="text-xs text-white/30 uppercase tracking-widest mt-1">Biliyorum</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-400">{reviewCount}</p>
                  <p className="text-xs text-white/30 uppercase tracking-widest mt-1">Tekrar</p>
                </div>
              </div>
            </div>
            <button onClick={() => { setLevel(null); setWords([]); setAllDone(false); }} className="w-full border border-white/10 rounded-2xl py-4 text-sm text-white/40 hover:text-white hover:border-white/20 transition">
              Tekrar oyna →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}