'use client'

/**
 * DailyExperiment — one lab, one curiosity prompt, every day.
 * Date-seeded so it's the same for everyone that day — a shared ritual,
 * not a random suggestion. The streak hook is what brings them back.
 */
import { useMemo, useState, useEffect } from 'react'
import Link from 'next/link'
import { LABS } from '../sims_v2/engine/canvasLab'

const daySeed = () => Math.floor(Date.now() / 86400000);
const labOfDay = () => {
    const keys = Object.keys(LABS);
    return keys[daySeed() % keys.length];
};

export function DailyExperiment() {
    const lab = useMemo(labOfDay, []);
    const [streak, setStreak] = useState(0);
    useEffect(() => {
        try {
            const last = localStorage.getItem('simdaily_last');
            const n = +(localStorage.getItem('simdaily_streak') ?? '0');
            const today = String(daySeed());
            setStreak(last === today ? n : n);   // streak increments when they actually do it
        } catch { }
    }, []);
    return (
        <div className="bg-gradient-to-br from-amber-500/15 to-orange-500/10 border border-amber-400/40 rounded-2xl px-5 py-4 backdrop-blur">
            <p className="text-[10px] font-black text-amber-300 uppercase tracking-widest mb-1">🧪 today's experiment</p>
            <p className="text-base font-black text-white capitalize mb-1">{lab} lab</p>
            <p className="text-xs text-slate-300 font-bold mb-3">
                {streak > 0 ? `🔥 ${streak}-day streak — keep it alive` : 'A 3-minute mission. Come back tomorrow for a new one.'}
            </p>
            <Link href={`/sandbox?lab=${lab}`}
                className="inline-block px-4 py-2 rounded-xl bg-amber-500 text-slate-900 text-xs font-black hover:bg-amber-400 transition">
                Open the lab →
            </Link>
        </div>
    );
}
