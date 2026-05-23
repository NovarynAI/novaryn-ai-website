"use client";
import { useState } from "react";
import Link from "next/link";

type Exercise = {
  category: "MANTIK" | "KARAR" | "YARATICI";
  title: string;
  question: string;
  hint: string;
  answer: string;
  explanation: string;
};

type Result = {
  correct: boolean;
  score: number;
  feedback: string;
  insight: string;
};

const categoryConfig = {
  MANTIK: { emoji: "🧩", label: "Mantik Bulmacasi", color: "from-purple-400 to-indigo-500", text: "text-purple-400", border: "border-purple-400" },
  KARAR: { emoji: "⚖️", label: "Karar Senaryosu", color: "from-blue-400 to-cyan-500", text: "text-blue-400", border: "border-blue-400" },
  YARATICI: { emoji: "💡", label: "Yaratici Dusunce", color: "from-yellow-400 to-orange-500", text: "text-yellow-400", border: "border-yellow-400" },
};

export default function MindPage() {
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [evaluating, setEvaluating] = useState(false);
  const [sessionScore, setSessionScore] = useState(0);
  const [exerciseCount, setExerciseCount] = useState(0);

  async function getExercise() {
    setLoading(true);
    setExercise(null);
    setResult(null);
    setUserAnswer("");
    setShowHint(false);
    try {
      const res = await fetch("/api/mind");
      const data = await res.json();
      setExercise(data);
    } catch {
      setExercise(null);
    }
    setLoading(false);
  }

  async function submitAnswer() {
    if (!exercise || !userAnswer.trim()) return;
    setEvaluating(true);
    try {
      const res = await fetch("/api/mind", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: exercise.category,
          question: exercise.question,
          answer: exercise.answer,
          userAnswer,
        }),
      });
      const data = await res.json();
      setResult(data);
      setSessionScore((prev) => prev + (data.score || 0));
      setExerciseCount((prev) => prev + 1);
    } catch {
      setResult(null);
    }
    setEvaluating(false);
  }

  const config = exercise ? categoryConfig[exercise.category] : null;

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
          <p className="text-white/30 text-sm tracking-wide mb-6">Gunluk zihin egzersizi. Dusun, gelis, kazan.</p>

          {exerciseCount > 0 && (
            <div className="flex justify-center gap-6 mb-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-400">{sessionScore}</p>
                <p className="text-xs text-white/30 uppercase tracking-widest mt-1">Toplam Puan</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{exerciseCount}</p>
                <p className="text-xs text-white/30 uppercase tracking-widest mt-1">Egzersiz</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400">{Math.round(sessionScore / exerciseCount)}</p>
                <p className="text-xs text-white/30 uppercase tracking-widest mt-1">Ortalama</p>
              </div>
            </div>
          )}
        </div>

        {!exercise && !loading && (
          <button onClick={getExercise} className="w-full bg-gradient-to-r from-purple-400 to-indigo-500 text-white px-10 py-4 rounded-full font-bold text-base hover:scale-105 transition-transform">
            Bugunun egzersizini getir
          </button>
        )}

        {loading && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-white/30 text-sm tracking-widest uppercase">Egzersiz hazirlaniyor...</p>
          </div>
        )}

        {exercise && config && (
          <div className="space-y-4">
            <div className={"bg-gradient-to-r " + config.color + " rounded-2xl p-px"}>
              <div className="bg-[#111] rounded-2xl px-8 py-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{config.emoji}</span>
                  <div>
                    <p className={"text-xs font-bold uppercase tracking-widest " + config.text}>{config.label}</p>
                    <p className="text-white font-semibold mt-1">{exercise.title}</p>
                  </div>
                </div>
                <p className="text-white/80 text-base leading-relaxed">{exercise.question}</p>
              </div>
            </div>

            {!result && (
              <div className="space-y-3">
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Cevabini buraya yaz..."
                  className="w-full bg-[#111] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/20 resize-none focus:outline-none focus:border-purple-400/50 transition"
                  rows={4}
                />

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="flex-1 border border-white/10 rounded-2xl py-3 text-sm text-white/40 hover:text-white hover:border-white/20 transition"
                  >
                    {showHint ? "Ipucunu gizle" : "Ipucu goster"}
                  </button>
                  <button
                    onClick={submitAnswer}
                    disabled={!userAnswer.trim() || evaluating}
                    className={"flex-1 py-3 rounded-2xl text-sm font-bold transition bg-gradient-to-r " + config.color + " text-white disabled:opacity-30 disabled:cursor-not-allowed"}
                  >
                    {evaluating ? "Degerlendiriliyor..." : "Cevabi gonder"}
                  </button>
                </div>

                {showHint && (
                  <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
                    <p className="text-xs text-white/30 uppercase tracking-widest mb-2">Ipucu</p>
                    <p className="text-white/60 text-sm">{exercise.hint}</p>
                  </div>
                )}
              </div>
            )}

            {result && (
              <div className="space-y-4">
                <div className={"bg-[#111] border rounded-2xl px-8 py-6 " + (result.correct ? "border-green-400/30" : "border-orange-400/30")}>
                  <div className="flex items-center justify-between mb-4">
                    <p className={"text-2xl font-bold " + (result.correct ? "text-green-400" : "text-orange-400")}>
                      {result.correct ? "Dogru!" : "Yakin!"}
                    </p>
                    <div className="text-right">
                      <p className={"text-3xl font-bold " + config.text}>{result.score}</p>
                      <p className="text-xs text-white/30">puan</p>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm mb-3">{result.feedback}</p>
                  <div className="border-t border-white/5 pt-4">
                    <p className="text-xs text-white/30 uppercase tracking-widest mb-2">Dusunce Analizi</p>
                    <p className="text-white/50 text-sm italic">{result.insight}</p>
                  </div>
                </div>

                <div className="bg-[#111] border border-white/5 rounded-2xl px-8 py-4">
                  <p className="text-xs text-white/30 uppercase tracking-widest mb-2">Dogru Cevap</p>
                  <p className="text-white/70 text-sm">{exercise.answer}</p>
                  <p className="text-white/40 text-xs mt-2">{exercise.explanation}</p>
                </div>

                <button onClick={getExercise} className={"w-full py-4 rounded-2xl font-bold text-sm bg-gradient-to-r " + config.color + " text-white hover:scale-[1.02] transition-transform"}>
                  Sonraki egzersiz
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}