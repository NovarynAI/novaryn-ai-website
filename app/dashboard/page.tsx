"use client";
import { useState } from "react";
import Link from "next/link";

export default function SkillsPage() {
  const [loading, setLoading] = useState(false);
  const [skill, setSkill] = useState<string | null>(null);

  async function getSkill() {
    setLoading(true);
    setSkill(null);
    const res = await fetch("/api/skills");
    const data = await res.json();
    setSkill(data.skill);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="flex items-center justify-between px-8 py-6 border-b border-white/10">
        <Link href="/dashboard" className="text-xl font-bold tracking-tight">Novaryn</Link>
        <span className="text-sm text-white/40">⚡ Skills</span>
      </nav>

      <div className="max-w-2xl mx-auto px-8 py-16 text-center">
        <div className="text-5xl mb-6">⚡</div>
        <h1 className="text-4xl font-bold mb-4">Novaryn Skills</h1>
        <p className="text-white/40 mb-12">Your daily micro-skill — learn something new in 5 minutes.</p>

        {!skill && !loading && (
          <button
            onClick={getSkill}
            className="bg-white text-black px-8 py-4 rounded-full font-medium text-lg hover:bg-white/90 transition"
          >
            Get today's skill →
          </button>
        )}

        {loading && (
          <div className="text-white/40 text-lg animate-pulse">Generating your skill...</div>
        )}

        {skill && (
          <div className="border border-white/10 rounded-2xl p-8 text-left mt-4">
            <div className="text-sm text-white/30 mb-4 uppercase tracking-widest">Today's skill</div>
            <div className="text-white/90 leading-relaxed whitespace-pre-wrap">{skill}</div>
            <button
              onClick={getSkill}
              className="mt-8 text-sm text-white/30 hover:text-white transition"
            >
              Generate another →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}