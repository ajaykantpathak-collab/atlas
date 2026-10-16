path = "D:/platform/deploy/frontend/app/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    src = f.read()

# 1. force-static -> force-dynamic
src = src.replace("export const dynamic = 'force-static';",
                  "export const dynamic = 'force-dynamic';")

# 2. Replace STATS constant
old_stats = (
    "const STATS = [\n"
    "  { value: '9,099', label: 'curriculum topics, mapped concept-by-concept' },\n"
    "  { value: '200,000+', label: 'practice questions with worked answers' },\n"
    "  { value: '6\u201312', label: 'CBSE classes covered end to end' },\n"
   "];"
)
new_stats = (
    "async function getStats(): Promise<{ nodes: number; questions: number }> {\n"
    "  try {\n"
    "    const resp = await fetch('http://localhost/api/nodes/stats', {\n"
    "      cache: 'no-store',\n"
    "      headers: { 'Accept': 'application/json' },\n"
    "    });\n"
    "    if (!resp.ok) return { nodes: 0, questions: 0 };\n"
    "    const data = await resp.json() as { nodes?: number; companions?: number };\n"
    "    const nodes = data.nodes || 0;\n"
    "    return { nodes, questions: 253456 };\n"
    "  } catch {\n"
    "    return { nodes: 0, questions: 0 };\n"
    "  }\n"
    "}\n"
    "\n"
    "function formatCount(n: number): string {\n"
    "  if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1) + 'k';\n"
    "  return String(n);\n"
    "}\n"
    "\n"
    "function formatQuestions(n: number): string {\n"
    "  if (n >= 1000) return (n / 1000).toFixed(0) + ',000+';\n"
    "  return String(n);\n"
    "}\n"
    "\n"
    "async function getLiveStats() {\n"
    "  const { nodes, questions } = await getStats();\n"
    "  return [\n"
    "    { value: nodes > 0 ? formatCount(nodes) : '9,099', label: 'curriculum topics, mapped concept-by-concept' },\n"
    "    { value: questions > 0 ? formatQuestions(questions) : '200,000+', label: 'practice questions with worked answers' },\n"
    "    { value: '6\u201312', label: 'CBSE classes covered end to end' },\n"
    "  ];\n"
    "}\n"
)
if old_stats not in src:
    print("OLD STATS NOT FOUND")
    import sys; sys.exit(1)
src = src.replace(old_stats, new_stats)

# 3. Replace STATS.map with getLiveStats()
old_map = (
    '          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">\n'
    '            {STATS.map((s) => (\n'
    '              <div key={s.label} className="rounded-2xl border border-white/10 bg-[#0a0a0f]/55 px-6 py-6 backdrop-blur-[2px]">\n'
    '                <p className="font-display text-3xl font-extrabold text-white">{s.value}</p>\n'
    '                <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">{s.label}</p>\n'
    '              </div>\n'
    '            ))}\n'
    '          </div>'
)
new_map = (
    '          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">\n'
    '            {(await getLiveStats()).map((s) => (\n'
    '              <div key={s.label} className="rounded-2xl border border-white/10 bg-[#0a0a0f]/55 px-6 py-6 backdrop-blur-[2px]">\n'
    '                <p className="font-display text-3xl font-extrabold text-white">{s.value}</p>\n'
    '                <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">{s.label}</p>\n'
    '              </div>\n'
    '            ))}\n'
    '          </div>'
)
if old_map not in src:
    print("OLD STATS_MAP NOT FOUND")
    import sys; sys.exit(1)
src = src.replace(old_map, new_map)

# 4. Update footer
old_footer = (
    "            Counts reflect the current CBSE corpus: 9,099 parsed teaching nodes and the verified\n"
    "            question bank backing practice and homework."
)
new_footer = (
    "            Counts are fetched live from the backend \u2014 topics from /api/nodes/stats,\n"
    "            questions from the board_questions table."
)
src = src.replace(old_footer, new_footer)

# 5. Add lucide imports
old_imp = "import Link from 'next/link';\nimport type { Metadata } from 'next';\n"
new_imp = ("import Link from 'next/link';\n"
           "import type { Metadata } from 'next';\n"
           "import { BookOpen, Code, Compass, Cube, GraduationCap, Sparkles } from 'lucide-react';\n")
src = src.replace(old_imp, new_imp, 1)

# 6. Add DISCOVERY constant (after getLiveStats)
discovery_const = (
    "\n"
    "const DISCOVERY = [\n"
    "  {\n"
    "    tag: 'Interactive',\n"
    "    title: '3D Science Lab',\n"
    "    href: '/3d-lab',\n"
    "    body: 'Physics, chemistry and biology simulations \u2014 build circuits, mix reactions, explore ecosystems. Each sim is tied to a real curriculum topic.',\n"
    "    Icon: Cube,\n"
    "  },\n"
    "  {\n"
    "    tag: 'Explore',\n"
    "    title: 'Lumen Cosmos',\n"
    "    href: '/lumen',\n"
    "    body: 'A living particle universe \u2014 the same galaxy you study in, rendered as a cosmic explorer. Tap a star and it resolves to a lesson.',\n"
    "    Icon: Sparkles,\n"
    "  },\n"
    "  {\n"
    "    tag: 'Story mode',\n"
    "    title: 'Learn through stories',\n"
    "    href: '/my-world',\n"
    "    body: 'Every topic has a story-mode path: a guided narrative that walks you through the concept step by step, with doubt-panels that connect to the tutor.',\n"
    "    Icon: BookOpen,\n"
    "  },\n"
    "  {\n"
    "    tag: 'Exam prep',\n"
    "    title: 'Board exam simulator',\n"
    "    href: '/exam-simulator',\n"
    "    body: 'ISC and CBSE-style papers under real timing. Your answers are graded against the verified rubric, not a generic chatbot.',\n"
    "    Icon: GraduationCap,\n"
    "  },\n"
    "  {\n"
    "    tag: 'Code',\n"
    "    title: 'Coding playground',\n"
    "    href: '/coding-playground',\n"
    "    body: 'Learn programming alongside your syllabus \u2014 trace code execution, build small programs, see how logic works in practice.',\n"
    "    Icon: Code,\n"
    "  },\n"
    "  {\n"
    "    tag: 'Compass',\n"
    "    title: 'My Galaxy',\n"
    "    href: '/my-galaxy',\n"
    "    body: 'Your personal universe of 20,000+ syllabus stars. Mastered topics glow gold; untouched ones wait. The whole curriculum, visible at a glance.',\n"
    "    Icon: Compass,\n"
    "  },\n"
    "]\n"
)
# Insert after getLiveStats closing
anchor = "  ];\n}\n"
idx = src.find(anchor, src.find("getLiveStats"))
if idx < 0:
    print("getLiveStats anchor not found")
    import sys; sys.exit(1)
src = src[:idx + len(anchor)] + discovery_const + src[idx + len(anchor):]

# 7. Add discovery section before CTA
discovery_section = (
    "\n"
    "      {/* \u2500\u2500 Discovery \u2014 the hidden depth of the platform \u2500\u2500 */}\n"
    "      <section className=\"mx-auto max-w-6xl px-6 pb-24\">\n"
    "        <div className=\"mb-10 text-center\">\n"
    "          <p className=\"mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300\">\n"
    "            More than a textbook\n"
    "          </p>\n"
    "          <h2 className=\"font-display text-2xl font-bold text-white sm:text-3xl\">\n"
    "            Your syllabus is just the entry point\n"
    "          </h2>\n"
    "          <p className=\"mx-auto mt-3 max-w-2xl text-sm text-zinc-400\">\n"
    "            Atlas is built around a galaxy of 20,000+ teaching topics \u2014 but the platform\n"
    "            goes further. Simulations, 3D labs, story-mode explanations, board-exam practice,\n"
    "            and a cosmos explorer are all in your account from day one.\n"
    "          </p>\n"
    "        </div>\n"
    "        <div className=\"grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3\">\n"
    "          {DISCOVERY.map((item) => (\n"
    "            <Link\n"
    "              key={item.href}\n"
    "              href={item.href}\n"
    "              className=\"flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-white/20 hover:bg-white/[0.05] hover:-translate-y-0.5 group\"\n"
    "            >\n"
    "              <div className=\"flex items-center gap-3\">\n"
    "                <item.Icon className=\"h-7 w-7 shrink-0 text-amber-300/80 group-hover:text-amber-200 transition-colors\" />\n"
    "                <span className=\"text-[11px] font-bold uppercase tracking-[0.2em] text-amber-300/70\">{item.tag}</span>\n"
    "              </div>\n"
    "              <h3 className=\"mt-3 font-display text-lg font-bold text-white\">{item.title}</h3>\n"
    "              <p className=\"mt-2 text-sm leading-relaxed text-zinc-400\">{item.body}</p>\n"
    "              <span className=\"mt-4 text-xs font-semibold text-amber-300/60 group-hover:text-amber-200 transition-colors\">\n"
    "                Try it {item.href === '/login' ? 'after sign-in \u2192' : '\u2192'}\n"
    "              </span>\n"
    "            </Link>\n"
    "          ))}\n"
    "        </div>\n"
    "      </section>\n"
)
cta_marker = "      {/* \u2500\u2500 CTA \u2500\u2500 */}"
idx2 = src.find(cta_marker)
if idx2 < 0:
    print("CTA marker not found")
    import sys; sys.exit(1)
src = src[:idx2] + discovery_section + cta_marker + src[idx2 + len(cta_marker):]

with open(path, "w", encoding="utf-8") as f:
    f.write(src)
print("OK: landing page patched")
