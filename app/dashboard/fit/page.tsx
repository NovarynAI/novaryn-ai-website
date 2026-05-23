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

type Workout = {
  title: string;
  duration: number;
  exercises: Exercise[];
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

const durations = [15, 30, 45, 60];

function getYoutubeUrl(name: string): string {
  return "https://www.youtube.com/results?search_query=" + encodeURIComponent(name + " exercise how to");
}

export default function FitPage() {
  const [location, setLocation] = useState<"home" | "gym" | null>(null);
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);
  const [duration, setDuration] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [workout, setWorkout] = useState<Workout | null>(null);

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

  async function getWorkout() {
    if (!location || selectedMuscles.length === 0 || !duration) return;
    setLoading(true);
    setWorkout(null);
    try {
      const res = await fetch("/api/fit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location, muscles: selectedMuscles, duration }),
      });
      const data = await res.json();
      setWorkout(data.workout);
    } catch {
      setWorkout(null);
    }
    setLoading(false);
  }

  const isReady = location && selectedMuscles.length > 0 && duration;
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
          <p className="text-white/30 text-sm tracking-wide">Kisisel antrenman planin, saniyeler icinde.</p>
        </div>

        {!workout && (
          <div className="space-y-8">
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
                  <p className="font-semibold text-sm">Tum Vucut</p>
                </button>
                <div className="grid grid-cols-2 gap-2 flex-1">
                  {muscleGroups.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => toggleMuscle(m.id)}
                      disabled={isFull}
                      className={"rounded-xl px-3 py-2 border transition text-left text-sm " + (selectedMuscles.includes(m.id) ? "border-green-400 bg-green-400/10 text-green-400" : "border-white/10 bg-[#111] hover:border-white/20 text-white/60") + (isFull ? " opacity-25 cursor-not-allowed" : "")}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs text-white/30 uppercase tracking-widest mb-4">Kac dakika?</p>
              <div className="grid grid-cols-4 gap-3">
                {durations.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDuration((prev) => (prev === d ? null : d))}
                    className={"rounded-2xl py-4 border transition font-bold " + (duration === d ? "border-green-400 bg-green-400/10 text-green-400" : "border-white/10 bg-[#111] hover:border-white/20")}
                  >
                    {d}<span className="text-xs font-normal ml-1">dk</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={getWorkout}
              disabled={!isReady || loading}
              className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-black py-4 rounded-2xl font-bold text-base hover:scale-[1.02] transition-transform disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? "Plan hazirlaniyor..." : "Antrenman planini olustur"}
            </button>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center gap-4 mt-8">
            <div className="w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-white/30 text-sm tracking-widest uppercase">Planin hazirlaniyor...</p>
          </div>
        )}

        {workout && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl p-px">
              <div className="bg-[#111] rounded-2xl px-8 py-6">
                <p className="text-xs text-white/30 uppercase tracking-widest mb-2">{workout.duration} dakika antrenman</p>
                <h2 className="text-2xl font-bold text-green-400">{workout.title}</h2>
                <p className="text-white/30 text-sm mt-1">{workout.exercises.length} egzersiz</p>
              </div>
            </div>

            <div className="space-y-3">
              {workout.exercises.map((ex, i) => (
                <div key={i} className="bg-[#111] border border-white/5 rounded-2xl px-6 py-5">
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
                  
                </div>
              ))}
            </div>

            <button
              onClick={() => { setWorkout(null); setSelectedMuscles([]); setDuration(null); setLocation(null); }}
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