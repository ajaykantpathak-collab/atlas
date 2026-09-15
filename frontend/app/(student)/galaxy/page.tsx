'use client'

/**
 * /world — the knowledge universe. A 3D galaxy of every node in the
 * curriculum; stars light up as the student masters them.
 * Companion HUD + quick links. This is the "home" that makes the
 * system feel like a world, not a list.
 */
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Companion } from '@/components/world/Companion'
import { DailyExperiment } from '@/components/world/DailyExperiment'
import { useAuthStore } from '@/stores/authStore'

const WorldMap3D = dynamic(() => import('@/components/world/WorldMap3D').then(m => m.WorldMap3D), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center bg-slate-950">
            <p className="text-slate-500 font-bold animate-pulse">Loading your universe…</p>
        </div>
    ),
})

export default function WorldPage() {
    const user = useAuthStore(s => s.user)
    return (
        <div className="fixed inset-0 bg-slate-950">
            <WorldMap3D classLevel={(user as any)?.classLevel ?? (user as any)?.class_level ?? null} />
            <Companion studentName={(user as any)?.name ?? null} />
            <div className="absolute bottom-6 left-5 w-72">
                <DailyExperiment />
            </div>
            <div className="absolute top-5 right-5 flex flex-wrap justify-end gap-2 max-w-[calc(100vw-2.5rem)]">
                <Link href="/sandbox" className="px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-400/40 text-xs font-black text-amber-200 hover:bg-amber-500/30 backdrop-blur">
                    🧪 Sandbox
                </Link>
                <Link href="/sims-v2" className="px-4 py-2 rounded-xl bg-slate-800/90 border border-slate-600 text-xs font-black text-slate-200 hover:bg-slate-700 backdrop-blur">
                    📚 Browse sims
                </Link>
                <Link href="/dashboard" className="px-4 py-2 rounded-xl bg-slate-800/90 border border-slate-600 text-xs font-black text-slate-200 hover:bg-slate-700 backdrop-blur">
                    🏠 Home
                </Link>
            </div>
        </div>
    )
}
