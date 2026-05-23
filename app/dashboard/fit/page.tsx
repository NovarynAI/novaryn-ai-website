"use client";
import { useState } from "react";
import Link from "next/link";

type Exercise = {
  name: string;
  muscle: string;
  sets: number;
  reps: string;
  instruction: string;
};

type Day = {
  day: string;
  type: "workout" | "rest";
  focus: string;
  exercises: Exercise[];
};

type Plan = {
  split: string;
  days: Day[];
};

const muscleGroups = [
  { id: "chest_upper", label: "Ust Gogus" },
  { id: "chest_lower", label: "Alt Gogus" },
  { id: "chest_full", label: "Tum Gogus" },
  { id: "back", label: "Sirt" },
  { id: "shoulder", label: "Omuz" },
  { id: "bicep", label: "Bicep" },
  { id: "tricep", label: "Tricep" },
  { id: "abs", label: "Karin" },
  { id: "quad", label: "On Bacak" },
  { id: "hamstring", label: "Arka Bacak" },
  { id: "glute", label: "Kalca" },
];

const dayOptions = [2, 3, 4, 5];

function ExerciseCard({ ex }: { ex: Exercise }) {
  const youtubeUrl = "https://www.youtube.com/results?search_query=" + encodeURIComponent(ex.name + " how to exercise");

  return (
    <div className="bg-[#111] border border-white/5 rounded-2xl px-6 py-5">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-semibold text-white">{ex.name}</p>
          <p className="text-xs text-green-400 mt-0.5">{ex.muscle}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-white">{ex.sets} set</p>
          <p className="text-xs text-white/40">{ex.reps} tekrar</p>
        </div>
      </div>
      <p className="text-white/40 text-sm mb-3">{ex.instruction}</p>
      
        href={youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-xs text-red-400/70 hover:text-red-400 transition border border-red-400/20 hover:border-red-400/40 rounded-full px-3 py-1.5"
      >
        <span>▶</span>
        <span>Nasil yapilir?</span>
      </a>
    </div>
  );
}

export default function FitPage() {
  const [location, setLocation] = useState<"home" | "gym" | null>(null);
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);
  const [days, setDays] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [activeDay, setActiveDay] = useState<number>(0);

  function toggleLocation(loc: "home" | "gym") {
    setLocation((prev) => (prev === loc ? null : loc));
  }

  function toggleMuscle(id: string) {
    if (id === "full") {
      setSelectedMuscles((prev) => (prev.includes("full") ? [] : ["full"]));
      return;
    }
    setSelectedMuscles((prev) => {
      const without = prev.filter((m) => m !== "full");
      if (without.includes(id)) return without.filter((m) => m !== id);
      return [...without, id];
    });
  }

  async function getPlan() {
    if (!location || selectedMuscles.length === 0 || !days) return;
    setLoading(true);
    setPlan(null);
    try {
      const res = await fetch("/api/fit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location, muscles: selectedMuscles, days }),
      });
      const data = await res.json();
      setPlan(data.plan);
      setActiveDay(0);
    } catch {
      setPlan(null);
    }
    setLoading(false);
  }

  const isReady = location && selectedMuscles.length > 0 && days;
  const isFull = selectedMuscles.includes("full");

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="flex items-center justify-between px-8 py-6 border-b border-white/5">
        <Link href="/dashboard" className="text-xl font-bold tracking-tight">Novaryn</Link>
        <span className="text-xs font-semibold tracking-widest text-green-400 uppercase">Fit</span>
      </nav>

      <div className="max-w-xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="text-6xl mb-6">💪</div>
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Novaryn Fit
          </h1>
          <p className="text-white/30 text-sm tracking-wide">Haftalik antrenman planin, saniyeler icinde.</p>
        </div>

        {!plan && (
          <div className="space-y-8">
            <div>
              <p className="text-xs text-white/30 uppercase tracking-widest mb-4">Haftada kac gun antrenman yapacaksin?</p>
              <div className="grid grid-cols-4 gap-3">
                {dayOptions.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDays((prev) => (prev === d ? null : d))}
                    className={"rounded-2xl py-5 border transition text-center " + (days === d ? "border-green-400 bg-green-400/10" : "border-white/10 bg-[#111] hover:border-white/20")}
                  >
                    <p className={"text-2xl font-bold " + (days === d ? "text-green-400" : "")}>{d}</p>
                    <p className="text-xs text-white/30 mt-1">gun</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-white/30 uppercase tracking-widest mb-4">Nerede antrenman yapiyorsun?</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "home" as const, label: "Ev", desc: "Ekipmansiz" },
                  { id: "gym" as const, label: "Spor Salonu", desc: "Ekipmanli" },
                ].map((l) => (
                  <button
                    key={l.id}
                    onClick={() => toggleLocation(l.id)}
                    className={"rounded-2xl px-4 py-4 border transition text-left " + (location === l.id ? "border-green-400 bg-green-400/10" : "border-white/10 bg-[#111] hover:border-white/20")}
                  >
                    <p className="font-semibold">{l.label}</p>
                    <p className="text-xs text-white/30 mt-1">{l.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-white/30 uppercase tracking-widest mb-4">Hangi bolgeleri calistiracaksin?</p>
              <div className="flex gap-3">
                <button
                  onClick={() => toggleMuscle("full")}
                  className={"rounded-2xl px-4 py-4 border transition text-left min-w-[110px] " + (isFull ? "border-green-400 bg-green-400/10" : "border-white/10 bg-[#111] hover:border-white/20")}
                >
                  <p className="text-2xl mb-1">🏃</p>
                  <p className={"font-semibold text-sm " + (isFull ? "text-green-400" : "")}>Tum Vucut</p>
                </button>
                <div className="grid grid-cols-2 gap-2 flex-1">
                  {muscleGroups.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => toggleMuscle(m.id)}
                      className={"rounded-xl px-3 py-2 border transition text-left text-sm " + (selectedMuscles.includes(m.id) ? "border-green-400 bg-green-400/10 text-green-400" : "border-white/10 bg-[#111] hover:border-white/20 text-white/60")}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={getPlan}
              disabled={!isReady || loading}
              className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-black py-4 rounded-2xl font-bold text-base hover:scale-[1.02] transition-transform disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? "Plan hazirlaniyor..." : "Haftalik planimi olustur"}
            </button>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center gap-4 mt-8">
            <div className="w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-white/30 text-sm tracking-widest uppercase">Haftalik planin hazirlaniyor...</p>
          </div>
        )}

        {plan && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl p-px">
              <div className="bg-[#111] rounded-2xl px-8 py-6">
                <p className="text-xs text-white/30 uppercase tracking-widest mb-2">Haftalik Program</p>
                <h2 className="text-2xl font-bold text-green-400">{plan.split}</h2>
                <p className="text-white/30 text-sm mt-1">{days} antrenman + {7 - (days || 0)} dinlenme gunu</p>
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              {plan.days.map((d, i) => (
                <button
                  key={i}
                  onClick={() => setActiveDay(i)}
                  className={"rounded-xl px-3 py-2 border transition text-center min-w-[80px] " + (activeDay === i ? (d.type === "rest" ? "border-white/30 bg-white/5" : "border-green-400 bg-green-400/10") : "border-white/10 bg-[#111] hover:border-white/20")}
                >
                  <p className="text-xs font-semibold">{d.day.slice(0, 3)}</p>
                  <p className={"text-xs mt-0.5 " + (d.type === "rest" ? "text-white/30" : "text-green-400")}>{d.type === "rest" ? "Din" : "Ant"}</p>
                </button>
              ))}
            </div>

            {plan.days[activeDay] && (
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-bold text-lg">{plan.days[activeDay].day}</p>
                    <p className="text-green-400 text-sm">{plan.days[activeDay].focus}</p>
                  </div>
                  {plan.days[activeDay].type === "rest" && (
                    <span className="text-xs text-white/30 border border-white/10 rounded-full px-3 py-1">Dinlenme</span>
                  )}
                </div>

                {plan.days[activeDay].type === "rest" ? (
                  <div className="bg-[#111] border border-white/5 rounded-2xl px-8 py-10 text-center">
                    <p className="text-4xl mb-4">😴</p>
                    <p className="text-white/50">Bugun dinlen, kaslar burada buyur.</p>
                  </div>
                ) : (
                  plan.days[activeDay].exercises.map((ex, i) => (
                    <ExerciseCard key={i} ex={ex} />
                  ))
                )}
              </div>
            )}

            <button
              onClick={() => { setPlan(null); setSelectedMuscles([]); setDays(null); setLocation(null); }}
              className="w-full border border-white/10 rounded-2xl py-4 text-sm text-white/40 hover:text-white hover:border-white/20 transition mt-4"
            >
              Yeni plan olustur
            </button>
          </div>
        )}
      </div>
    </div>
  );
}