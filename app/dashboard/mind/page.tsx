"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const categories = [
  {
    id: "geography", label: "Cografya", emoji: "🌍",
    subcategories: ["Dunya Cografyasi", "Baskentler", "Okyanuslar ve Daglar", "Ulkeler ve Bayraklar"],
  },
  {
    id: "history", label: "Tarih", emoji: "🏛️",
    subcategories: ["Dunya Tarihi", "Antik Cag", "Savaslar ve Devrimler", "Medeniyetler"],
  },
  {
    id: "sports", label: "Spor", emoji: "⚽",
    subcategories: ["Futbol", "Basketbol", "Tenis", "Olimpiyatlar", "Formula 1"],
  },
  {
    id: "science", label: "Bilim", emoji: "🔬",
    subcategories: ["Fizik", "Kimya", "Biyoloji", "Uzay", "Insan Vucudu"],
  },
  {
    id: "cinema", label: "Sinema", emoji: "🎬",
    subcategories: ["Hollywood", "Animasyon", "Yonetmenler", "Oscar Odulleri"],
  },
  {
    id: "music", label: "Muzik", emoji: "🎵",
    subcategories: ["Pop", "Rock", "Klasik Muzik", "Hip-Hop", "Efsane Gruplar"],
  },
  {
    id: "literature", label: "Edebiyat", emoji: "📚",
    subcategories: ["Dunya Edebiyati", "Siir", "Klasikler", "Nobel Odulleri"],
  },
  {
    id: "technology", label: "Teknoloji", emoji: "💻",
    subcategories: ["Yazilim", "Sosyal Medya", "Video Oyunlari", "Yapay Zeka"],
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

const DAILY_LIMIT = 50;
const TIME_LIMIT = 20;

export default function MindPage() {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[0] | null>(null);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timesUp, setTimesUp] = useState(false);
  const [stats, setStats] = useState<Record<string, SessionStat>>({});
  const [dailyCount, setDailyCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  function clearTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
  }

  function startTimer() {
    clearTimer();
    setTimeLeft(TIME_LIMIT);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearTimer();
          setTimesUp(true);
          setShowResult(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  async function getQuestion(category: string, subcategory: string) {
    if (dailyCount >= DAILY_LIMIT) return;
    clearTimer();
    setLoading(true);
    setQuestion(null);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimesUp(false);
    try {
      const res = await fetch("/api/mind", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, subcategory }),
      });
      const data = await res.json();
      setQuestion(data);
      startTimer();
    } catch {
      setQuestion(null);
    }
    setLoading(false);
  }

  function handleAnswer(option: string) {
    if (showResult || timesUp) return;
    clearTimer();
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
    setDailyCount((prev) => prev + 1);
  }

  function getOptionStyle(option: string) {
    if (!showResult) return "border-white/10 bg-[#111] hover:border-purple-400/50 cursor-pointer";
    const letter = option.split(")")[0].trim();
    if (letter === question?.correct) return "border-green-400 bg-green-400/10 text-green-400";
    if (option === selectedAnswer && letter !== question?.correct) return "border-red-400 bg-red-400/10 text-red-400";
    return "border-white/5 bg-[#111] opacity-30";
  }

  const currentStat = selectedSub ? stats[selectedSub] : null;
  const remainingToday = DAILY_LIMIT - dailyCount;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="flex items-center justify-between px-8 py-6 border-b border-white/5">
        <Link href="/dashboard" className="text-xl font-bold tracking-tight">Novaryn</Link>
        <div className="flex items-center gap-4">
          {dailyCount > 0 && <span className="text-xs text-white/30">{remainingToday} soru kaldi</span>}
          <span className="text-xs font-semibold tracking-widest text-purple-400 uppercase">Mind</span>
        </div>
      </nav>

      <div className="max-w-xl mx-auto px-6 py-16">
        {!selectedCategory && (
          <>
            <div className="text-center mb-12">
              <div className="text-6xl mb-6">🧠</div>
              <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                Novaryn Mind
              </h1>
              <p className="text-white/50 text-base mt-3">Kategori sec, zorlu sorulari coz, tablolarda yuksel.</p>
            </div>
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
          </>
        )}

        {selectedCategory && !selectedSub && (
          <div className="space-y-4">
            <button onClick={() => setSelectedCategory(null)} className="text-xs text-white/30 hover:text-white transition mb-2">
              Geri
            </button>
            <div className="text-center mb-8">
              <p className="text-5xl mb-3">{selectedCategory.emoji}</p>
              <h2 className="text-3xl font-bold">{selectedCategory.label}</h2>
              <p className="text-white/40 text-sm mt-3 leading-relaxed">Kategorinde <span className="text-purple-400 font-semibold">50 soru</span> coz,<br />puan tablosunda aktifles!</p>
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
            <div className="flex items-center justify-between mb-2">
              <button onClick={() => { setSelectedSub(null); setQuestion(null); clearTimer(); }} className="text-xs text-white/30 hover:text-white transition">
                Geri
              </button>
              <div className="flex items-center gap-4">
                {currentStat && (
                  <>
                    <div className="text-center">
                      <p className="text-lg font-bold text-purple-400">{Math.round((currentStat.correct / currentStat.total) * 100)}%</p>
                      <p className="text-xs text-white/30">Basari</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-white">{currentStat.total}</p>
                      <p className="text-xs text-white/30">Soru</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {dailyCount >= DAILY_LIMIT ? (
              <div className="bg-[#111] border border-white/5 rounded-2xl px-8 py-12 text-center">
                <p className="text-4xl mb-4">🎯</p>
                <h2 className="text-xl font-bold mb-2">Bugunluk tamam!</h2>
                <p className="text-white/40 text-sm">Gunluk 50 soru limitine ulastin. Yarin devam et!</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between bg-[#111] border border-white/5 rounded-2xl px-4 py-2">
                  <p className="text-xs text-purple-400 font-semibold">{selectedSub}</p>
                  {!showResult && question && (
                    <div className={"text-sm font-bold " + (timeLeft <= 5 ? "text-red-400" : timeLeft <= 10 ? "text-orange-400" : "text-white/50")}>
                      {timeLeft}s
                    </div>
                  )}
                </div>

                {loading && (
                  <div className="flex flex-col items-center gap-4 py-12">
                    <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
                    <p className="text-white/30 text-sm">Soru yukleniyor...</p>
                  </div>
                )}

                {question && !loading && (
                  <div className="space-y-4">
                    {!showResult && (
                      <div className="w-full bg-white/5 rounded-full h-1">
                        <div
                          className={"h-1 rounded-full transition-all " + (timeLeft <= 5 ? "bg-red-400" : timeLeft <= 10 ? "bg-orange-400" : "bg-purple-400")}
                          style={{ width: (timeLeft / TIME_LIMIT) * 100 + "%" }}
                        />
                      </div>
                    )}

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
                          disabled={showResult}
                          className={"w-full rounded-2xl px-6 py-4 text-left border transition text-sm " + getOptionStyle(option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>

                    {showResult && (
                      <div className="space-y-3">
                        {timesUp && !selectedAnswer ? (
                          <div className="rounded-2xl px-6 py-4 border border-orange-400/30 bg-orange-400/5">
                            <p className="font-bold text-orange-400 mb-2">Sure Doldu!</p>
                            <p className="text-white/50 text-sm">Dogru cevap: {question.correct}) secenegiydi.</p>
                            <p className="text-white/40 text-xs mt-2">{question.explanation}</p>
                          </div>
                        ) : (
                          <div className={"rounded-2xl px-6 py-4 border " + (selectedAnswer?.startsWith(question.correct) ? "border-green-400/30 bg-green-400/5" : "border-red-400/30 bg-red-400/5")}>
                            <p className={"font-bold mb-2 " + (selectedAnswer?.startsWith(question.correct) ? "text-green-400" : "text-red-400")}>
                              {selectedAnswer?.startsWith(question.correct) ? "Dogru!" : "Yanlis!"}
                            </p>
                            <p className="text-white/40 text-xs">{question.explanation}</p>
                          </div>
                        )}
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
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}