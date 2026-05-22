"use client";
import { useState } from "react";
import Link from "next/link";

type Skill = {
  name: string;
  what: string;
  why: string;
  how: string;
};

function parseSkill(raw: string): Skill {
  const clean = raw.replace(/\*\*/g, "").replace(/##/g, "");
  
  const extract = (key: string) => {
    const regex = new RegExp(`${key}:?\\s*([^/\\n]+(?:[\\n][^A-Z/][^\\n]*)*)`, "i");
    const match = clean.match(regex);
    return match ? match[1].trim() : "";
  };

  const nameMatch = clean.match(/SKILL NAME:?\s*([^\n/]+)/i);
  const whatMatch = clean.match(/WHAT IT IS:?\s*([^\n/]+(?:\n(?![A-Z\s]+:)[^\n]+)*)/i);
  const whyMatch = clean.match(/WHY IT MATTERS:?\s*([^\n/]+(?:\n(?![A-Z\s]+:)[^\n]+)*)/i);
  const howMatch = clean.match(/PRACTICE TODAY:?\s*([^\n/]+(?:\n(?![A-Z\s]+:)[^\n]+)*)/i);

  return {
    name: nameMatch ? nameMatch[1].trim() : extract("SKILL NAME"),
    what: whatMatch ? whatMatch[1].trim() : extract("WHAT IT IS"),
    why: whyMatch ? whyMatch[1].trim() : extract("WHY IT MATTERS"),
    how: howMatch ? howMatch[1].trim() : extract("PRACTICE TODAY"),
  };
}

export default function SkillsPage() {
  const [loading, setLoading] = useState(false);
  const [skill, setSkill] = useState<Skill | null>(null);

  async function getSkill() {
    setLoading(true);
    setSkill(null);
    const res = await fetch("/api/skills");
    const data = await res.json();
    setSkill(parseSkill(data.skill));
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="flex items-center justify-between px-8 py-6 border-b border-white/5">
        <Link href="/dashboard" className="text-xl font-bold tracking-tight">Novaryn</Link>
        <span className="text-xs font-semibold tracking-widest text-yellow-400 uppercase">⚡ Skills</span>
      </nav>

      <div className="max-w-2xl mx-auto px-8 py-20 text-center">
        <div className="text-6xl mb-6">⚡</div>
        <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 bg-clip-text text-transparent">
          Novaryn Skills
        </h1>
        <p className="text-white/30 text-sm tracking-wide mb-14">5 minutes. One skill. Every day.</p>

        {!skill && !loading && (
          <button onClick={getSkill} className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-10 py-4 rounded-full font-bold text-base hover:scale-105 transition-transform">
            Get today's skill →
          </button>
        )}

        {loading && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-white/30 text-sm tracking-widest uppercase">Generating...</p>
          </div>
        )}

        {skill && (
          <div className="text-left mt-4 space-y-4">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-px">
              <div className="bg-[#111] rounded-2xl px-8 py-6">
                <p className="text-xs text-white/30 uppercase tracking-widest mb-2">Today's skill</p>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">{skill.name}</h2>
              </div>
            </div>

            <div className="bg-[#111] border border-white/5 rounded-2xl px-8 py-6 space-y-6">
              <div>
                <p className="text-xs font-bold tracking-widest text-cyan-400 uppercase mb-3">What it is</p>
                <p className="text-white/80 text-base leading-relaxed">{skill.what}</p>
              </div>
              <div className="border-t border-white/5 pt-6">
                <p className="text-xs font-bold tracking-widest text-purple-400 uppercase mb-3">Why it matters</p>
                <p className="text-white/80 text-base leading-relaxed">{skill.why}</p>
              </div>
              <div className="border-t border-white/5 pt-6">
                <p className="text-xs font-bold tracking-widest text-green-400 uppercase mb-3">Practice today</p>
                <p className="text-white/80 text-base leading-relaxed">{skill.how}</p>
              </div>
            </div>

            <button onClick={getSkill} className="w-full border border-white/10 rounded-2xl py-4 text-sm text-white/30 hover:text-white hover:border-white/20 transition">
              Generate another →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
