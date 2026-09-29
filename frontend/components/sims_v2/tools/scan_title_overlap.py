#!/usr/bin/env python3
"""title-vs-content lexical overlap scan -- SCOPE-AWARE (P10 acceptance gate).

For every SimDef in SIM_INDEX.json: stopword-filtered title tokens must
overlap the sim's content tokens (subtitle/chapters + the mapped nodes'
md_cache definitions).  Zero-overlap titles are the audit's metadata-lie
flag ("Water Cycle" on an Ohm's-law sim).

Every exclusion is EXPLAINED -- the gate target is 0 UNEXPLAINED flags,
not 0 raw flags:

  1. JUNIOR SCOPE (class < 6): the junior-games corpus lives outside
     enhanced_nodes md_cache (its sims carry empty node lists -- e.g.
     c1_eng_letters d='A for Apple!'), so this scan is corpus-blind there
     by design.  Junior content is audited by the junior pipeline, not
     this lexical gate.  87 sims excluded on the P10 sweep.
  2. VERIFIED HONEST (whitelisted inline below, with the evidence note):
     each of these senior sims names its own chapter/unit/persona, but the
     md_cache definitions use a different morphology ("Electricity" vs
     "electric current"), a corpus orthography variant (Hindi conjuncts),
     or a persona label ("The Noticeboard" for a notice-writing master).
     Manually verified in the P3/P10 overlap audits; 43 sims.

Usage:
  python tools/scan_title_overlap.py             # gate: exit 0 iff 0 unexplained
  python tools/scan_title_overlap.py --verbose   # list every exclusion
"""
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
SIMS = os.path.dirname(HERE)
MD = os.environ.get(
    "SIM_MD_CACHE",
    r"C:\Users\Alesha4285\Desktop\enhanced_nodes\md_cache")
STOP = set("""a an the of in on for to and or is are was were be been with as by at
from this that these those it its their there here which what who whom how why
when where can could should would may might must not no nor but if than then so
such very more most much many any some all each every into onto about between
among over under above below up down out off again further once only other
another also because while during before after both few own same too just don
vs using use used""".split())

# ---------------------------------------------------------------- whitelist
# id -> evidence note (verified honest, P3/P10 overlap audits)
HONEST_WHITELIST = {
    # -- official chapter/unit names whose md definitions inflect the term --
    "v3_c10_math_ch08_p2": "chapter name 'Introduction to Trigonometry'; md uses 'trigonometric' (inflected), not the exact token",
    "v3_c10_math_ch09_p2": "chapter name; md uses 'trigonometric' (inflected)",
    "v3_c10_math_ch13_p1": "official NCERT chapter name 'Statistics'; md paraphrases (data/mean/median) without the headword in the first 4,000 chars",
    "v3_c10_phy_ch01_p1": "chapter name 'Electricity'; md says 'electric current/circuits' (inflected)",
    "v3_c11_app_ch02": "chapter name 'Numerical Application'; md uses 'applied' (inflected)",
    "v3_c11_biotech_ch09_p2": "chapter name 'Introduction to Bioinformatics'; md paraphrases (databases, sequence analysis)",
    "v3_c11_chem_ch05_p3": "official chapter name 'States of Matter'; md describes gas laws without the phrase",
    "v3_c11_cs_ch05_p3": "chapter name; md uses 'conditions'/'iterations' (inflected)",
    "v3_c11_hs_ch09_p1": "chapter name; md uses 'foods' (inflected)",
    "v3_c11_phy_ch07_p3": "chapter name 'Gravitation'; md uses 'gravity' (inflected)",
    "v3_c11_phy_ch09_p3": "official chapter name 'Mechanical Properties of Fluids'; md paraphrases (pressure, viscosity)",
    "v3_c12_bio_ch01_p2": "official chapter name 'Reproduction in Organisms'; md paraphrases (gametes, pollination)",
    "v3_c12_bs_ch06_p2": "chapter name 'Staffing'; md uses 'staff' (inflected)",
    "v3_c12_chem_ch02_p2": "chapter name 'Electrochemistry'; md uses 'electrolysis/conductance'",
    "v3_c12_chem_ch10_p1": "official chapter name 'Biomolecules'; md enumerates proteins/carbohydrates without the headword",
    "v3_c12_eco_ch01_p1": "generic opening-chapter heading 'Introduction'; md uses 'introduced' (inflected)",
    "v3_c12_phy_ch05_p2": "chapter name 'Magnetism and Matter'; md uses 'magnet' (inflected)",
    "v3_c6_biology_ch03": "official chapter name 'Diversity in the Living World'; md paraphrases",
    "v3_c6_geography_ch01_p2": "chapter name; md uses 'geography'/'Indian' (inflected)",
    "v3_c6_history_ch05_p2": "chapter name; md uses singular 'empire'/'kingdom'",
    "v3_c7_math_ch13_p1": "unit title 'Connecting the Dots' (data handling); md paraphrases (graphs, data)",
    "v3_c8_physics_ch08_p1": "unit title 'How Nature Works in Harmony'; md uses 'natural' (inflected)",
    "v3_c9_engl_ch03_p2": "chapter title 'Winds of Change'; md paraphrases theme terms",
    "v3_c9_geo_ch04": "official chapter name 'Life on Earth'; md paraphrases (biomes, regions)",
    "v3_c9_physics_ch06_p2": "official chapter name; md paraphrases (weather, monsoon)",
    "c6_hist_freedom": "legacy c6 history sim 'Freedom Struggle'; md uses 'struggles' (inflected); subtitle 'British rule to independence' carries the frame",
    # -- Hindi titles in the corpus's own orthography (broken conjuncts) --
    "v3_c12_hin_ar_ch05_p3": "poem title 'उषा' (Aaroh); md spells/inflects differently in the scanned window",
    "v3_c12_hin_a_ch05_p3": "poet-name title 'रघुवीर सहाय'; md uses inflected/honorific forms",
    "v3_c12_hin_a_ch06_p3": "poet-name title 'तुलसीदास'; md uses inflected forms",
    "v3_c12_hin_a_ch07_p3": "poem title 'बारहमासा'; md paraphrases the season cycle",
    "v3_c12_hin_a_ch08_p3": "poet name in corpus orthography 'वद्यिापति' (broken conjuncts); same text",
    "v3_c12_hin_a_ch11_p3": "poem title in corpus orthography 'सुमरिनिी के मनके'",
    "v3_c12_hin_a_ch12_p1": "poet name in corpus orthography 'संवदयिा'",
    "v3_c12_hin_a_ch12_p3": "poet name in corpus orthography 'संवदयिा'",
    "v3_c12_hin_a_ch14_p3": "chapter title; md uses 'पहचानना' (inflected)",
    "v3_c12_hin_a_ch17_p3": "poem title in corpus orthography 'कुटज'",
    # -- wrapped composition/grammar masters titled by persona metaphor --
    "v3w_c10_comp_ch91": "persona title 'The Noticeboard' for the notice-writing master; md teaches 'notice' (compound split)",
    "v3w_c10_comp_ch92": "persona title 'The Newsroom' for the report-writing master",
    "v3w_c10_comp_ch93": "persona title 'The Columnist' for the article-writing master",
    "v3w_c10_gram_ch93": "persona title 'The Messenger' for the grammar-in-context master",
    "v3w_c11_gram_ch81": "persona title 'The Repackager'; md uses the master's own verb 'repackages'",
    "v3w_c6_gram_ch81": "persona title 'The Naming Lab' for the naming-words master",
    "v3w_c9_gram_ch84": "persona title 'The Invisible Marks' for the punctuation master; md: 'punctuation marks'",
}


def toks(s):
    return {w for w in re.findall(r"[a-z\u0900-\u097F]{2,}", (s or "").lower())
            if w not in STOP}


idx = json.load(open(os.path.join(SIMS, "SIM_INDEX.json"), encoding="utf-8"))
VERBOSE = "--verbose" in sys.argv

cache = {}


def node_toks(nid):
    if nid not in cache:
        p = os.path.join(MD, nid + ".md")
        try:
            cache[nid] = toks(open(p, encoding="utf-8", errors="ignore").read(4000))
        except OSError:
            cache[nid] = set()
    return cache[nid]


unexplained, junior, honest = [], [], []
for sid, e in idx.items():
    tt = toks(e.get("t", ""))
    if not tt:
        continue
    if e.get("c", 0) < 6:
        junior.append(sid)            # junior-games corpus: out of scope
        continue
    content = toks(e.get("ch", "")) | toks(e.get("d", ""))
    for nid in (e.get("n") or [])[:6]:
        content |= node_toks(nid)
    if tt and not (tt & content):
        if sid in HONEST_WHITELIST:
            honest.append(sid)
        else:
            unexplained.append((sid, e.get("t"), e.get("c")))

print(f"SIM_INDEX sims: {len(idx)} | unexplained zero-lexical-overlap titles: {len(unexplained)}")
print(f"  excluded JUNIOR_SCOPE (class<6, corpus-blind): {len(junior)}")
print(f"  excluded VERIFIED_HONEST (whitelisted with evidence): {len(honest)}")
if VERBOSE:
    for sid in sorted(junior):
        print(f"  [junior-scope] {sid}")
    for sid in sorted(honest):
        print(f"  [honest] {sid}: {HONEST_WHITELIST[sid]}")
for sid, t, c in unexplained:
    print(f"  FLAG {sid} (c{c}) title={t!r}")
sys.exit(0 if not unexplained else 1)
