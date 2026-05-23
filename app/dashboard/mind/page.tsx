"use client";
import { useState } from "react";
import Link from "next/link";

const categories = [
  {
    id: "geography", label: "Coğrafya", emoji: "🌍",
    subcategories: ["Dünya Coğrafyası", "Başkentler", "Okyanuslar & Dağlar", "Ülkeler & Bayraklar"],
  },
  {
    id: "history", label: "Tarih", emoji: "🏛️",
    subcategories: ["Dünya Tarihi", "Antik Çağ", "Savaşlar & Devrimler", "Medeniyetler"],
  },
  {
    id: "sports", label: "Spor", emoji: "⚽",
    subcategories: ["Futbol", "Basketbol", "Tenis", "Olimpiyatlar", "Formül 1"],
  },
  {
    id: "science", label: "Bilim", emoji: "🔬",
    subcategories: ["Fizik", "Kimya", "Biyoloji", "Uzay", "İnsan Vücudu"],
  },
  {
    id: "cinema", label: "Sinema", emoji: "🎬",
    subcategories: ["Hollywood", "Animasyon", "Yönetmenler", "Oscar Ödülleri"],
  },
  {
    id: "music", label: "Müzik", emoji: "🎵",
    subcategories: ["Pop", "Rock", "Klasik Müzik", "Hip-Hop", "Efsane Gruplar"],
  },
  {
    id: "literature", label: "Edebiyat", emoji: "📚",
    subcategories: ["Dünya Edebiyatı", "Şiir", "Klasikler", "Nobel Ödülleri"],
  },
  {
    id: "technology", label: "Teknoloji", emoji: "💻",
    subcategories: ["Yazılım", "Sosyal Medya", "Video Oyunları", "Yapay Zeka"],
  },
];

type Question = {
  question: string;
  options: string[];
  correct: string;
  explanation: string;
};

type SessionStat = {
  correct: number;
  total: number;
};

export default function MindPage() {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[0] | null>(null);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [stats, setStats] = useState<Record<string, SessionStat>>({});

  async function getQuestion(category: string, subcategory: string) {
    setLoading(true);
    setQuestion(null);
    setSelectedAnswer(null);
    setShowResult(false);
    try {
      const res = await fetch("/api/mind", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, subcategory }),
      });
      const data = await res.json();
      setQuestion(data);
    } catch {
      setQuestion(null);
    }
    setLoading(false);
  }

  function handleAnswer(option: string) {
    if (showResult) return;
    setSelectedAnswer(option);
    setShowResult(true);
    const key = selectedSub || "";
    const isCorrect = option.startsWith(question?.correct || "");
    setStats((prev) => ({
      ...prev,
      [key]: {
        correct: (prev[key]?.correct || 0) + (isCorrect ? 1 : 0),
        total: (prev[key]?.total || 0) + 1,
      },
    }));
  }

  function getOptionStyle(option: string) {
    if (!showResult) return "border-white/10 bg-[#111] hover:border-white/30 cursor-pointer";
    const letter = option.split(")")[0];
    if (letter === question?.correct) return "border-green-400 bg-green-400/10 text-green-400";
    if (option === selectedAnswer && letter !== question?.correct) return "border-red-400 bg-red-400/10 text-red-400";
    return "border-white/5 bg-[#111] opacity-40";
  }

  const currentStat = selectedSub ? stats[selectedSub] : null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="flex items-center justify-between px-8 py-6 border-b border-white/5">
        <Link href="/dashboard" className="text-xl font-bold tracking-tight">Novaryn</Link>
        <span className="text-xs font-semibold tracking-widest text-purple-400 uppercase">Mind</span>
      </nav>

      <div className="max-w-xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="text-6xl mb-6">🧠</div>
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
            Novaryn Mind
          </h1>
          <p className="text-white/30 text-sm tracking-wide">Kategori sec, zorlu sorulari coz, tablolarda yuksel.</p>
        </div>

        {!selectedCategory && (
          <div className="grid grid-cols-2 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategory(cat); setSelectedSub(null); setQuestion(null); }}
                className="bg-[#111] border border-white/10 rounded-2xl px-4 py-5 text-left hover:border-purple-400/40 hover:bg-purple-400/5 transition"
              >
                <p className="text-3xl mb-2">{cat.emoji}</p>
                <p className="font-semibold">{cat.label}</p>
                <p className="text-xs text-white/30 mt-1">{cat.subcategories.length} kategori</p>
              </button>
            ))}
          </div>
        )}

        {selectedCategory && !selectedSub && (
          <div className="space-y-4">
            <button onClick={() => setSelectedCategory(null)} className="text-xs text-white/30 hover:text-white transition mb-2">
              Geri
            </button>
            <div className="text-center mb-8">
              <p className="text-4xl mb-2">{selectedCategory.emoji}</p>
              <h2 className="text-2xl font-bold">{selectedCategory.label}</h2>
              <p className="text-white/30 text-sm mt-1">Alt kategori sec</p>
            </div>
            <div className="space-y-3">
              {selectedCategory.subcategories.map((sub) => {
                const stat = stats[sub];
                return (
                  <button
                    key={sub}
                    onClick={() => { setSelectedSub(sub); getQuestion(selectedCategory.label, sub); }}
                    className="w-full bg-[#111] border border-white/10 rounded-2xl px-6 py-4 text-left hover:border-purple-400/40 transition flex items-center justify-between"
                  >
                    <p className="font-semibold">{sub}</p>
                    {stat ? (
                      <div className="text-right">
                        <p className="text-sm font-bold text-purple-400">{Math.round((stat.correct / stat.total) * 100)}%</p>
                        <p className="text-xs text-white/30">{stat.total} soru</p>
                      </div>
                    ) : (
                      <p className="text-xs text-white/20">Basla</p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {selectedSub && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => { setSelectedSub(null); setQuestion(null); }} className="text-xs text-white/30 hover:text-white transition">
                Geri
              </button>
              {currentStat && (
                <div className="flex gap-4">
                  <div className="text-center">
                    <p className="text-lg font-bold text-purple-400">{Math.round((currentStat.correct / currentStat.total) * 100)}%</p>
                    <p className="text-xs text-white/30">Basari</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-white">{currentStat.total}</p>
                    <p className="text-xs text-white/30">Soru</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-[#111] border border-white/5 rounded-2xl px-2 py-1 mb-2">
              <p className="text-xs text-purple-400 font-semibold px-4 py-2">{selectedSub}</p>
            </div>

            {loading && (
              <div className="flex flex-col items-center gap-4 py-12">
                <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
                <p className="text-white/30 text-sm">Soru yukleniyor...</p>
              </div>
            )}

            {question && !loading && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-purple-400 to-indigo-500 rounded-2xl p-px">
                  <div className="bg-[#111] rounded-2xl px-6 py-6">
                    <p className="text-white/80 text-base leading-relaxed">{question.question}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {question.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      className={"w-full rounded-2xl px-6 py-4 text-left border transition text-sm " + getOptionStyle(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {showResult && (
                  <div className="space-y-3">
                    <div className={"rounded-2xl px-6 py-4 border " + (selectedAnswer?.startsWith(question.correct) ? "border-green-400/30 bg-green-400/5" : "border-red-400/30 bg-red-400/5")}>
                      <p className={"font-bold mb-2 " + (selectedAnswer?.startsWith(question.correct) ? "text-green-400" : "text-red-400")}>
                        {selectedAnswer?.startsWith(question.correct) ? "Dogru!" : "Yanlis!"}
                      </p>
                      <p className="text-white/50 text-sm">{question.explanation}</p>
                    </div>
                    <button
                      onClick={() => getQuestion(selectedCategory?.label || "", selectedSub)}
                      className="w-full bg-gradient-to-r from-purple-400 to-indigo-500 text-white py-4 rounded-2xl font-bold text-sm hover:scale-[1.02] transition-transform"
                    >
                      Sonraki Soru
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}