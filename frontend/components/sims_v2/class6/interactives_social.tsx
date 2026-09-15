/**
 * C6 Science + Civics/Economics Interactives — unique per chapter.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Biology Ch06: Growth Timeline ──────────────────────────
// Drag life stages onto a timeline — shows physical changes at each stage.
export function GrowthTimeline() {
    const stages = [
        { id: 'infant', label: 'Infant (0-2 yrs)', x: 10, emoji: '👶', change: 'Rapid growth, milk teeth' },
        { id: 'child', label: 'Child (3-10 yrs)', x: 30, emoji: '🧒', change: 'Steady growth, milk teeth fall' },
        { id: 'teen', label: 'Teenager (11-17)', x: 55, emoji: '🧑', change: 'Puberty, hormones, growth spurt' },
        { id: 'adult', label: 'Adult (18+)', x: 80, emoji: '🧑‍💼', change: 'Growth stops, body matures' },
    ];
    const [placed, setPlaced] = useState<Record<string, boolean>>({});
    const [selected, setSelected] = useState<string | null>(null);

    const handleClick = (x: number) => {
        if (!selected) return;
        const s = stages.find(st => st.id === selected);
        if (s && Math.abs(x - s.x) < 12) {
            setPlaced(p => ({ ...p, [selected]: true }));
        }
        setSelected(null);
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <div className="text-lg font-bold text-gray-700">Place life stages on the growth timeline! 📈</div>
            <div className="relative w-full max-w-lg h-32 bg-blue-50 rounded-2xl border-4 border-blue-200"
                onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    handleClick(((e.clientX - rect.left) / rect.width) * 100);
                }}>
                <div className="absolute top-1/2 left-0 right-0 h-2 bg-blue-300 rounded-full" />
                {stages.filter(s => placed[s.id]).map(s => (
                    <div key={s.id} className="absolute flex flex-col items-center" style={{ left: `${s.x}%`, top: '20%', transform: 'translateX(-50%)' }}>
                        <span className="text-3xl">{s.emoji}</span>
                        <span className="text-xs font-bold text-gray-700">{s.label.split(' ')[0]}</span>
                        <span className="text-[10px] text-gray-500 max-w-[80px] text-center">{s.change}</span>
                    </div>
                ))}
                {selected && (() => {
                    const s = stages.find(x => x.id === selected);
                    return s ? <div className="absolute text-3xl animate-pulse" style={{ left: `${s.x}%`, top: '20%', transform: 'translateX(-50%)' }}>📍</div> : null;
                })()}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
                {stages.filter(s => !placed[s.id]).map(s => (
                    <button key={s.id} onClick={() => setSelected(s.id)}
                        className={`px-3 py-2 rounded-xl font-bold text-sm shadow ${selected === s.id ? 'bg-blue-500 text-white' : 'bg-white border-2 border-gray-300'}`}>
                        {s.emoji} {s.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

// ─── Civics Ch13: Tax Flow Diagram ──────────────────────────
// Drag tax money from source → government → public services.
export function TaxFlowDiagram() {
    const flows = [
        { id: 'f1', from: 'People pay taxes', to: 'Government collects', order: 1 },
        { id: 'f2', from: 'Government collects', to: 'Budget is made', order: 2 },
        { id: 'f3', from: 'Budget is made', to: 'Money allocated', order: 3 },
        { id: 'f4', from: 'Money allocated', to: 'Public services built', order: 4 },
    ];
    const [placed, setPlaced] = useState<number[]>([]);
    const [next, setNext] = useState(1);

    const place = (f: typeof flows[0]) => {
        if (f.order === next) {
            setPlaced(p => [...p, f.order]);
            setNext(n => n + 1);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <div className="text-lg font-bold text-gray-700">Build the tax flow! How does tax money reach services? 💰</div>
            <div className="flex flex-col gap-2 w-full max-w-md">
                {placed.sort((a, b) => a - b).map(order => {
                    const f = flows.find(x => x.order === order)!;
                    return (
                        <motion.div key={order} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500 text-white font-bold shadow">
                            <span className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center">{order}</span>
                            <span>{f.from}</span>
                            <span className="ml-auto">→ {f.to}</span>
                        </motion.div>
                    );
                })}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
                {flows.filter(f => !placed.includes(f.order)).map(f => (
                    <button key={f.id} onClick={() => place(f)}
                        className={`px-3 py-2 rounded-xl font-bold text-sm shadow
                            ${f.order === next ? 'bg-emerald-100 border-2 border-emerald-400 animate-pulse' : 'bg-white border-2 border-gray-300'}`}>
                        {f.from} → {f.to}
                    </button>
                ))}
            </div>
        </div>
    );
}

// ─── Civics Ch14: Diversity Web ─────────────────────────────
// Connect people to their languages, foods, festivals — shows diversity.
export function DiversityWeb() {
    const people = [
        { id: 'punjabi', name: 'Punjabi', lang: 'Punjabi', food: 'Makki Roti', festival: 'Baisakhi', emoji: '🪔' },
        { id: 'tamil', name: 'Tamil', lang: 'Tamil', food: 'Dosa', festival: 'Pongal', emoji: '🌾' },
        { id: 'bengali', name: 'Bengali', lang: 'Bengali', food: 'Rasgulla', festival: 'Durga Puja', emoji: '🎭' },
        { id: 'gujarati', name: 'Gujarati', lang: 'Gujarati', food: 'Dhokla', festival: 'Navratri', emoji: '💃' },
    ];
    const [matched, setMatched] = useState<Record<string, 'lang' | 'food' | 'festival'>>({});
    const [selPerson, setSelPerson] = useState<string | null>(null);
    const [selAttr, setSelAttr] = useState<{ person: string; type: 'lang' | 'food' | 'festival' } | null>(null);

    const categories = [
        { type: 'lang' as const, label: 'Language', color: 'bg-blue-500' },
        { type: 'food' as const, label: 'Food', color: 'bg-amber-500' },
        { type: 'festival' as const, label: 'Festival', color: 'bg-purple-500' },
    ];

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <div className="text-lg font-bold text-gray-700">Connect people to their culture! 🌈</div>
            <div className="grid grid-cols-4 gap-2 w-full max-w-lg">
                {people.map(p => (
                    <div key={p.id} className="flex flex-col items-center gap-1">
                        <div className="text-3xl">{p.emoji}</div>
                        <div className="text-xs font-bold text-gray-700">{p.name}</div>
                        {categories.map(c => (
                            <div key={c.type} className={`text-[10px] px-2 py-1 rounded-full
                                ${matched[p.id] === c.type ? `${c.color} text-white` : 'bg-gray-100 text-gray-400'}`}>
                                {matched[p.id] === c.type ? p[c.type] : c.label}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="text-sm text-gray-500">Click a person, then click a category to reveal their culture</div>
            <div className="flex flex-wrap gap-2 justify-center">
                {people.map(p => (
                    <button key={p.id} onClick={() => setSelPerson(p.id)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-bold ${selPerson === p.id ? 'bg-blue-500 text-white' : 'bg-white border-2 border-gray-300'}`}>
                        {p.emoji} {p.name}
                    </button>
                ))}
            </div>
            {selPerson && (
                <div className="flex gap-2">
                    {categories.map(c => (
                        <button key={c.type} onClick={() => {
                            setMatched(m => ({ ...m, [selPerson]: c.type }));
                            setSelPerson(null);
                        }}
                            className={`px-3 py-1.5 rounded-lg text-sm font-bold text-white ${c.color}`}>
                            Reveal {c.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

// ─── Economics Ch07: Infrastructure Builder ─────────────────
// Drag infrastructure items to the correct sector.
export function InfrastructureBuilder() {
    const items = [
        { id: 'road', text: 'Highway', sector: 'transport', emoji: '🛣️' },
        { id: 'school', text: 'School', sector: 'education', emoji: '🏫' },
        { id: 'hospital', text: 'Hospital', sector: 'health', emoji: '🏥' },
        { id: 'power', text: 'Power Plant', sector: 'energy', emoji: '⚡' },
        { id: 'port', text: 'Sea Port', sector: 'transport', emoji: '🚢' },
        { id: 'college', text: 'College', sector: 'education', emoji: '🎓' },
        { id: 'clinic', text: 'Clinic', sector: 'health', emoji: '💊' },
        { id: 'dam', text: 'Dam', sector: 'energy', emoji: '🏞️' },
    ];
    const sectors = [
        { id: 'transport', label: 'Transport', color: 'bg-blue-500' },
        { id: 'education', label: 'Education', color: 'bg-emerald-500' },
        { id: 'health', label: 'Health', color: 'bg-red-500' },
        { id: 'energy', label: 'Energy', color: 'bg-amber-500' },
    ];
    const [placed, setPlaced] = useState<Record<string, string>>({});
    const [feedback, setFeedback] = useState<Record<string, boolean>>({});

    const onDrop = (iid: string, sid: string) => {
        const item = items.find(i => i.id === iid);
        setPlaced(p => ({ ...p, [iid]: sid }));
        setFeedback(f => ({ ...f, [iid]: item?.sector === sid }));
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <div className="text-lg font-bold text-gray-700">Sort infrastructure into sectors! 🏗️</div>
            <div className="flex gap-3 w-full justify-center flex-wrap">
                {sectors.map(s => (
                    <div key={s.id}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => { const id = e.dataTransfer.getData('text'); if (id) onDrop(id, s.id); }}
                        className={`min-h-[120px] w-32 ${s.color} rounded-2xl p-2 shadow-lg`}>
                        <div className="text-white font-black text-center text-sm mb-2">{s.label}</div>
                        <div className="space-y-1">
                            {Object.entries(placed).filter(([_, sid]) => sid === s.id).map(([iid]) => {
                                const it = items.find(x => x.id === iid)!;
                                const ok = feedback[iid];
                                return <div key={iid} className={`text-xs px-2 py-1 rounded ${ok ? 'bg-white/90 text-emerald-700' : 'bg-white/90 text-red-600'}`}>{it.emoji} {it.text} {ok ? '✓' : '✗'}</div>;
                            })}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
                {items.filter(i => !placed[i.id]).map(i => (
                    <div key={i.id} draggable
                        onDragStart={(e) => e.dataTransfer.setData('text', i.id)}
                        className="px-3 py-2 rounded-xl bg-white border-2 border-gray-300 font-bold text-sm cursor-grab active:cursor-grabbing shadow">
                        {i.emoji} {i.text}
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── Economics Ch08: Banking Flow ───────────────────────────
// Show how money flows through a bank: deposit → bank → loan → repayment.
export function BankingFlow() {
    const steps = [
        { id: 's1', text: 'You deposit ₹1000 in the bank', emoji: '💰', order: 1 },
        { id: 's2', text: 'Bank keeps a reserve, lends ₹800', emoji: '🏦', order: 2 },
        { id: 's3', text: 'Business borrows ₹800 for a shop', emoji: '🏪', order: 3 },
        { id: 's4', text: 'Business repays ₹820 (with interest)', emoji: '💵', order: 4 },
        { id: 's5', text: 'Bank pays you interest on your deposit', emoji: '🤝', order: 5 },
    ];
    const [placed, setPlaced] = useState<number[]>([]);
    const [next, setNext] = useState(1);

    const place = (s: typeof steps[0]) => {
        if (s.order === next) {
            setPlaced(p => [...p, s.order]);
            setNext(n => n + 1);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <div className="text-lg font-bold text-gray-700">How does a bank work? Build the flow! 🏦</div>
            <div className="flex flex-col gap-2 w-full max-w-md">
                {placed.sort((a, b) => a - b).map(order => {
                    const s = steps.find(x => x.order === order)!;
                    return (
                        <motion.div key={order} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-500 text-white font-bold shadow">
                            <span className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center">{order}</span>
                            <span className="text-2xl">{s.emoji}</span>
                            <span className="text-sm">{s.text}</span>
                        </motion.div>
                    );
                })}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
                {steps.filter(s => !placed.includes(s.order)).map(s => (
                    <button key={s.id} onClick={() => place(s)}
                        className={`px-3 py-2 rounded-xl font-bold text-sm shadow
                            ${s.order === next ? 'bg-emerald-100 border-2 border-emerald-400 animate-pulse' : 'bg-white border-2 border-gray-300'}`}>
                        {s.emoji} {s.text}
                    </button>
                ))}
            </div>
        </div>
    );
}

// ─── Economics Ch12: Market Match ──────────────────────────
// Match buyers to sellers in a market — shows how exchange works.
export function MarketMatch() {
    const transactions = [
        { id: 't1', buyer: 'Student needs books', seller: 'Bookshop has books', price: '₹200', emoji: '📚' },
        { id: 't2', buyer: 'Family needs vegetables', seller: 'Farmer has vegetables', price: '₹50/kg', emoji: '🥬' },
        { id: 't3', buyer: 'Patient needs medicine', seller: 'Pharmacy has medicine', price: '₹120', emoji: '💊' },
        { id: 't4', buyer: 'Worker needs bus ride', seller: 'Bus company has seats', price: '₹10', emoji: '🚌' },
    ];
    const [matched, setMatched] = useState<Record<string, boolean>>({});
    const [selBuyer, setSelBuyer] = useState<string | null>(null);

    const match = (bid: string, sid: string) => {
        const t = transactions.find(x => x.id === bid);
        if (t && t.seller === sid) {
            setMatched(m => ({ ...m, [bid]: true }));
        }
        setSelBuyer(null);
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <div className="text-lg font-bold text-gray-700">Match buyers to sellers! 🏪</div>
            <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
                <div className="space-y-2">
                    <div className="text-xs font-black text-gray-400 uppercase">Buyers (Demand)</div>
                    {transactions.filter(t => !matched[t.id]).map(t => (
                        <button key={t.id} onClick={() => setSelBuyer(t.id)}
                            className={`w-full px-3 py-2 rounded-xl font-bold text-sm shadow text-left
                                ${selBuyer === t.id ? 'bg-blue-500 text-white' : 'bg-white border-2 border-gray-300'}`}>
                            {t.emoji} {t.buyer}
                        </button>
                    ))}
                </div>
                <div className="space-y-2">
                    <div className="text-xs font-black text-gray-400 uppercase">Sellers (Supply)</div>
                    {transactions.filter(t => !matched[t.id]).map(t => (
                        <button key={t.id} onClick={() => selBuyer && match(selBuyer, t.seller)}
                            className="w-full px-3 py-2 rounded-xl font-bold text-sm shadow text-left bg-amber-100 border-2 border-amber-300">
                            {t.seller} ({t.price})
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
                {Object.entries(matched).filter(([_, ok]) => ok).map(([tid]) => {
                    const t = transactions.find(x => x.id === tid)!;
                    return <div key={tid} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-700">{t.emoji} {t.buyer} → {t.seller} ✓</div>;
                })}
            </div>
        </div>
    );
}

// ─── Civics Ch16: Economy Role Sorter ───────────────────────
// Sort government economic roles into Production/Regulation/Redistribution.
export function EconomyRoleSorter() {
    const roles = [
        { id: 'r1', text: 'Builds roads and schools', type: 'production', emoji: '🏗️' },
        { id: 'r2', text: 'Sets minimum wage laws', type: 'regulation', emoji: '⚖️' },
        { id: 'r3', text: 'Collects income tax', type: 'redistribution', emoji: '💰' },
        { id: 'r4', text: 'Runs public hospitals', type: 'production', emoji: '🏥' },
        { id: 'r5', text: 'Bans harmful products', type: 'regulation', emoji: '🚫' },
        { id: 'r6', text: 'Gives scholarships to poor students', type: 'redistribution', emoji: '🎓' },
    ];
    const types = [
        { id: 'production', label: 'Production', color: 'bg-emerald-500' },
        { id: 'regulation', label: 'Regulation', color: 'bg-blue-500' },
        { id: 'redistribution', label: 'Redistribution', color: 'bg-amber-500' },
    ];
    const [placed, setPlaced] = useState<Record<string, string>>({});
    const [feedback, setFeedback] = useState<Record<string, boolean>>({});

    const onDrop = (rid: string, tid: string) => {
        const r = roles.find(x => x.id === rid);
        setPlaced(p => ({ ...p, [rid]: tid }));
        setFeedback(f => ({ ...f, [rid]: r?.type === tid }));
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <div className="text-lg font-bold text-gray-700">Government's economic roles! Sort them 🏛️</div>
            <div className="flex gap-3 w-full justify-center flex-wrap">
                {types.map(t => (
                    <div key={t.id}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => { const id = e.dataTransfer.getData('text'); if (id) onDrop(id, t.id); }}
                        className={`min-h-[120px] w-40 ${t.color} rounded-2xl p-2 shadow-lg`}>
                        <div className="text-white font-black text-center text-sm mb-2">{t.label}</div>
                        <div className="space-y-1">
                            {Object.entries(placed).filter(([_, tid]) => tid === t.id).map(([rid]) => {
                                const r = roles.find(x => x.id === rid)!;
                                const ok = feedback[rid];
                                return <div key={rid} className={`text-xs px-2 py-1 rounded ${ok ? 'bg-white/90 text-emerald-700' : 'bg-white/90 text-red-600'}`}>{r.emoji} {r.text} {ok ? '✓' : '✗'}</div>;
                            })}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
                {roles.filter(r => !placed[r.id]).map(r => (
                    <div key={r.id} draggable
                        onDragStart={(e) => e.dataTransfer.setData('text', r.id)}
                        className="px-3 py-2 rounded-xl bg-white border-2 border-gray-300 font-bold text-sm cursor-grab active:cursor-grabbing shadow">
                        {r.emoji} {r.text}
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── Geography Ch03: Climate Zone Mapper ────────────────────
// Match Indian regions to their climate type — teaches long-term climate patterns.
export function ClimateZoneMapper() {
    const regions = [
        { id: 'rajasthan', name: 'Rajasthan', climate: 'desert', emoji: '🏜️' },
        { id: 'kerala', name: 'Kerala', climate: 'tropical', emoji: '🌴' },
        { id: 'ladakh', name: 'Ladakh', climate: 'mountain', emoji: '🏔️' },
        { id: 'mumbai', name: 'Mumbai coast', climate: 'coastal', emoji: '🌊' },
        { id: 'delhi', name: 'Delhi plains', climate: 'continental', emoji: '🏙️' },
        { id: 'assam', name: 'Assam', climate: 'tropical', emoji: '🌧️' },
    ];
    const climates = [
        { id: 'desert', label: 'Desert (hot, dry)', color: 'bg-amber-600', emoji: '🏜️' },
        { id: 'tropical', label: 'Tropical (hot, wet)', color: 'bg-emerald-500', emoji: '🌴' },
        { id: 'mountain', label: 'Mountain (cold, dry)', color: 'bg-sky-500', emoji: '🏔️' },
        { id: 'coastal', label: 'Coastal (humid, mild)', color: 'bg-blue-500', emoji: '🌊' },
        { id: 'continental', label: 'Continental (extreme)', color: 'bg-orange-500', emoji: '🏙️' },
    ];
    const [placed, setPlaced] = useState<Record<string, string>>({});
    const [feedback, setFeedback] = useState<Record<string, boolean>>({});

    const onDrop = (rid: string, cid: string) => {
        const r = regions.find(x => x.id === rid);
        setPlaced(p => ({ ...p, [rid]: cid }));
        setFeedback(f => ({ ...f, [rid]: r?.climate === cid }));
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <div className="text-lg font-bold text-gray-700">Match regions to their climate zones! 🌍</div>
            <div className="flex gap-3 w-full justify-center flex-wrap">
                {climates.map(c => (
                    <div key={c.id}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => { const id = e.dataTransfer.getData('text'); if (id) onDrop(id, c.id); }}
                        className={`min-h-[120px] w-36 ${c.color} rounded-2xl p-2 shadow-lg`}>
                        <div className="text-white font-black text-center text-sm mb-2">{c.emoji} {c.label}</div>
                        <div className="space-y-1">
                            {Object.entries(placed).filter(([_, cid]) => cid === c.id).map(([rid]) => {
                                const r = regions.find(x => x.id === rid)!;
                                const ok = feedback[rid];
                                return <div key={rid} className={`text-xs px-2 py-1 rounded ${ok ? 'bg-white/90 text-emerald-700' : 'bg-white/90 text-red-600'}`}>{r.emoji} {r.name} {ok ? '✓' : '✗'}</div>;
                            })}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
                {regions.filter(r => !placed[r.id]).map(r => (
                    <div key={r.id} draggable
                        onDragStart={(e) => e.dataTransfer.setData('text', r.id)}
                        className="px-3 py-2 rounded-xl bg-white border-2 border-gray-300 font-bold text-sm cursor-grab active:cursor-grabbing shadow">
                        {r.emoji} {r.name}
                    </div>
                ))}
            </div>
        </div>
    );
}
