#!/usr/bin/env python3
"""build_sim_node_map.py -- definitive sim -> competency-node mapping for Class 6-12 sims.

Reads (INPUTS, never modified):
  frontend/lib/c6_12_gameRegistry.ts      -- wiring registry for chapter sims (GameMeta + lazySim imports)
  frontend/app/3d-lab/simLoaders.tsx      -- wiring for the 3D sims (id -> import path)
  frontend/app/3d-lab/agentSims.json      -- metadata for the 3D sims (title/subject/chapter)
  backend/_cache/enhanced_nodes_index.json -- 9,008 competency nodes (node_id like c10_bio_cbse_01_001)
  backend/its/competency/catalog_class*.json -- source catalogs (chapter titles + concepts)

Writes (OUTPUTS, only files this script owns):
  backend/its/competency/SIM_NODE_MAP.json  -- every wired Class 6-12 sim with matched node ids
  backend/its/competency/UNMAPPED_SIMS.json -- wired sims with no defensible node match

Matching model
--------------
1. Inventory: every registry entry (GameMeta) and every 3D-lab entry becomes one sim row.
   class / subject / chapter slug are parsed from the component FILE NAME (C10_ScienceLifeProcessesSim
   -> class 10, subject science, chapter slug "LifeProcesses").
2. Candidate node pool: nodes of the same class whose subject family is compatible with the sim
   subject (Biology -> bio, Science -> bio+chem+phy, HistoryCivics -> hist+civ, ...).
3. Content scoring (all deterministic, idf-weighted token overlap, camelCase-split tokens):
     cov_node : fraction of the sim slug's weighted tokens covered by one node's text
                (definition + scope_boundary + mastery_criteria).
     cov_chap : same coverage against the node's whole chapter cluster (all pool nodes sharing
                the node's subject + chapter number).
     hint     : +bonus when a same-class catalog chapter_title strongly matches the sim slug AND
                that catalog chapter was content-aligned to the node's chapter number
                (chapter alignment is computed by text overlap, NOT by catalog code arithmetic).
     final    = 0.65*cov_node + 0.35*cov_chap + 0.10*hint   (capped at 1.0)
4. Selection:
     strong : final >= 0.50 and cov_node >= 0.22        -> all passing nodes (top 15)
     weak   : final >= 0.28 and cov_node >= 0.12        -> top 8 only
     else   -> UNMAPPED_SIMS.json with the best candidate as evidence.
   matchStrength 'exact' additionally requires cov_node >= 0.85 on the top node.

Determinism: no timestamps, no randomness, stable sorts everywhere; identical inputs -> byte-identical outputs.
"""

from __future__ import annotations

import json
import math
import re
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
FRONTEND = ROOT / "frontend"
BACKEND = ROOT / "backend"

REGISTRY_TS = FRONTEND / "lib" / "c6_12_gameRegistry.ts"
SIM_LOADERS_TS = FRONTEND / "app" / "3d-lab" / "simLoaders.tsx"
AGENT_SIMS_JSON = FRONTEND / "app" / "3d-lab" / "agentSims.json"
NODES_JSON = BACKEND / "_cache" / "enhanced_nodes_index.json"
CATALOG_DIR = BACKEND / "its" / "competency"

OUT_MAP = CATALOG_DIR / "SIM_NODE_MAP.json"
OUT_UNMAPPED = CATALOG_DIR / "UNMAPPED_SIMS.json"

MIN_CLASS, MAX_CLASS = 6, 12

# ─────────────────────────── text tokenisation ───────────────────────────

STOPWORDS = {
    "sim", "cbse", "icse", "ncert", "part", "chapter", "ch", "unit",
    "the", "and", "for", "with", "from", "its", "their", "his", "her",
    "introduction", "introducing",
}

# light suffix stripper (deterministic Porter-lite): collapses inflectional and a few
# derivational variants so "electrochemistry" ~ "electrochemical", "alkanes" ~ "alkane".
STEM_SUFFIXES = (
    "ational", "tional", "ization", "isations", "iveness", "fulness", "ousness",
    "ation", "ition", "ities", "ements", "ances", "ences", "ments", "ingly",
    "ings", "ies", "ing", "ity", "ness", "ate", "ize", "ise", "ion", "ed",
    "es", "ly", "er", "or", "al", "s",
)
STEM_MAXLEN = 8


def stem(word: str) -> str:
    t = word
    for _ in range(2):                      # at most two stripping rounds
        if len(t) <= 4:
            return t
        stripped = False
        for suf in STEM_SUFFIXES:
            if t.endswith(suf):
                cand = (t[:-3] + "y") if suf == "ies" else t[: len(t) - len(suf)]
                if len(cand) >= 4:
                    t = cand
                    stripped = True
                    break
        if not stripped:
            break
    return t[:STEM_MAXLEN] if len(t) > STEM_MAXLEN else t


def split_identifier(text: str) -> list[str]:
    """CamelCase / digit-aware split into lowercase alpha tokens."""
    raw = re.sub(r"[^0-9A-Za-z]+", " ", text)
    out: list[str] = []
    for word in raw.split():
        pieces = re.findall(r"[A-Z]+(?=[A-Z][a-z])|[A-Z]?[a-z]+|[A-Z]+|\d+", word)
        for p in pieces:
            out.append(p.lower())
    return out


def _base_filter(t: str) -> bool:
    if len(t) < 3 and t != "ai":
        return False
    if t.isdigit() or t in STOPWORDS:
        return False
    return True


def _dedupe(seq: list[str]) -> list[str]:
    seen = set()
    return [t for t in seq if not (t in seen or seen.add(t))]


def content_tokens(text: str) -> list[str]:
    toks = []
    for t in split_identifier(text):
        if not _base_filter(t):
            continue
        toks.append(stem(t))
    return _dedupe(toks)


# ─── vocabulary-based sub-splitting of concatenated slugs ────────────────
# Many filenames are written without internal capitals ("Alkanesgeneralformulaand-
# preparation"), so camelCase splitting yields one giant token that matches nothing.
# Sub-split such tokens greedily against a vocabulary harvested from the node corpus
# and the catalog titles (deterministic longest-match-from-left, full consumption
# required or the token is kept whole).

_VOCAB: set[str] | None = None
_SUBSPLIT_MEMO: dict[str, list[str]] = {}


def build_vocab(all_nodes: list[dict], catalogs: list[dict]) -> set[str]:
    vocab = set(STOPWORDS)
    for n in all_nodes:
        for k in ("definition", "scope_boundary", "mastery_criteria"):
            for t in split_identifier(str(n.get(k, ""))):
                if t.isalpha() and 3 <= len(t) <= 16:
                    vocab.add(t)
    for c in catalogs:
        for text in [c["chapterTitle"]] + c["conceptTitles"]:
            for t in split_identifier(text):
                if t.isalpha() and 3 <= len(t) <= 16:
                    vocab.add(t)
    return vocab


def set_vocab(vocab: set[str]) -> None:
    global _VOCAB
    _VOCAB = vocab
    _SUBSPLIT_MEMO.clear()


def sub_split(token: str) -> list[str]:
    """Greedy longest-match split of a long concatenated token; keeps it whole on failure."""
    if _VOCAB is None or len(token) < 7 or token in _VOCAB:
        return [token]
    memo = _SUBSPLIT_MEMO.get(token)
    if memo is not None:
        return memo
    n = len(token)
    pieces: list[str] = []
    i = 0
    ok = True
    while i < n:
        for j in range(min(16, n - i), 2, -1):
            if token[i:i + j] in _VOCAB:
                pieces.append(token[i:i + j])
                i += j
                break
        else:
            ok = False
            break
    result = pieces if ok and pieces else [token]
    _SUBSPLIT_MEMO[token] = result
    return result


# short subject-word aliases that appear in slugs but not in node prose
SLUG_ALIASES = {
    "bio": "biology", "chem": "chemistry", "phy": "physics", "geo": "geography",
    "eco": "economics", "psy": "psychology", "maths": "mathematics",
    "biotech": "biotechnology", "hist": "history", "civ": "civics",
    "sci": "science", "soc": "sociology",
}


def slug_tokens(text: str) -> list[str]:
    """Tokenize a sim slug: split, sub-split compounds, expand aliases, stem, filter noise."""
    out: list[str] = []
    for raw in split_identifier(text):
        for t in sub_split(raw):
            if not _base_filter(t):
                continue
            out.append(stem(t))
            alias = SLUG_ALIASES.get(t)
            if alias:
                out.append(stem(alias))
    return _dedupe(out)


def jaccard(a: set, b: set) -> float:
    if not a or not b:
        return 0.0
    return len(a & b) / len(a | b)


def containment(a: set, b: set) -> float:
    """|a ∩ b| / |a| -- how much of the smaller-side query is covered."""
    if not a:
        return 0.0
    return len(a & b) / len(a)


# ─────────────────────────── subject handling ───────────────────────────

# Filename subject prefixes, longest first (parsed from C<cls>_<Subject>RestOfTopicSim).
# Short forms (Geo, Eco, Biotech, Psy, ...) are used by the c6_12_new CBSE wave files.
SUBJECT_PREFIXES = [
    "InformaticsPractices", "CommercialStudies", "EconApplications", "AppliedMaths",
    "ComputerScience", "PoliticalScience", "BusinessStudies", "Biotechnology",
    "SocialScience", "HomeScience", "HistoryCivics", "Mathematics", "Accountancy",
    "Commercial", "Sociology", "Psychology", "Geography", "Chemistry", "Commerce",
    "Economics", "English", "History", "Science", "Biology", "Physics", "Civics",
    "LegalStudies", "MassMedia", "PhysicalEducation", "Biotech", "Maths", "Psy",
    "Geo", "Eco", "Phy", "Chem", "Bio", "EVS",
]

# canonical output names for filename subject tokens
SUBJECT_CANONICAL = {
    "Mathematics": "mathematics", "Maths": "mathematics", "AppliedMaths": "applied_maths",
    "ComputerScience": "computer_science", "InformaticsPractices": "informatics_practices",
    "PoliticalScience": "political_science", "CommercialStudies": "commercial_studies",
    "EconApplications": "economics_applications", "BusinessStudies": "business_studies",
    "HomeScience": "home_science", "SocialScience": "social_science",
    "HistoryCivics": "history_civics", "EVS": "evs", "Biotech": "biotechnology",
    "Psy": "psychology", "Geo": "geography", "Eco": "economics", "Phy": "physics",
    "Chem": "chemistry", "Bio": "biology", "LegalStudies": "legal_studies",
    "MassMedia": "mass_media", "PhysicalEducation": "physical_education",
}

# canonical node-subject key -> set of raw subject keys used in enhanced_nodes_index.json
NODE_FAMILY_KEYS = {
    "bio": {"bio", "biology"},
    "chem": {"chem", "chemistry"},
    "phy": {"phy", "physics"},
    "math": {"math"},
    "hist": {"hist", "history"},
    "civ": {"civ", "civics"},
    "geo": {"geo", "geography"},
    "eco": {"eco", "economics"},
    "engl": {"engl", "english"},
    "hin": {"hin_a", "hin_al", "hin_ar", "hin_v"},
    "cs": {"cs"},
    "ip": {"ip"},
    "acc": {"acc"},
    "bs": {"bs"},
    "biotech": {"biotech"},
    "psy": {"psy"},
    "soc": {"soc"},
    "ps": {"ps"},
    "hs": {"hs"},
    "stat": {"stat"},
    "ca": {"ca"},
}

# filename subject token -> compatible node subject families
SUBJECT_FAMILIES = {
    "Biology": ["bio"],
    "Chemistry": ["chem"],
    "Physics": ["phy"],
    "Mathematics": ["math"], "Maths": ["math"], "AppliedMaths": ["math"],
    "Science": ["bio", "chem", "phy"],
    "EVS": ["bio", "chem", "geo"],
    "HistoryCivics": ["hist", "civ"],
    "History": ["hist"],
    "Civics": ["civ"],
    "SocialScience": ["hist", "civ", "geo", "eco"],
    "Geography": ["geo"],
    "Economics": ["eco"], "EconApplications": ["eco"],
    "PoliticalScience": ["ps"],
    "Psychology": ["psy"],
    "Sociology": ["soc"],
    "ComputerScience": ["cs"],
    "InformaticsPractices": ["ip"],
    "Biotechnology": ["biotech"],
    "Accountancy": ["acc"],
    "BusinessStudies": ["bs"],
    "Commerce": ["bs"], "CommercialStudies": ["bs"],
    "HomeScience": ["hs"],
    "English": ["engl"],
    # short forms used by the c6_12_new CBSE wave
    "Bio": ["bio"], "Chem": ["chem"], "Phy": ["phy"], "Geo": ["geo"], "Eco": ["eco"],
    "Psy": ["psy"], "Biotech": ["biotech"],
    # real subjects with no node family in enhanced_nodes_index (mapped to nothing on purpose)
    "LegalStudies": [], "MassMedia": [], "PhysicalEducation": [],
}

# catalog subject field -> compatible node families (for catalog refs / chapter hints)
CATALOG_SUBJECT_FAMILIES = {
    "science": ["bio", "chem", "phy"], "curiosity": ["bio", "chem", "phy"],
    "biology": ["bio"], "chemistry": ["chem"], "physics": ["phy"],
    "maths": ["math"], "mathematics": ["math"], "applied_maths": ["math"],
    "history": ["hist"], "civics": ["civ"], "geography": ["geo"], "economics": ["eco"],
    "social": ["hist", "civ", "geo", "eco"], "social_science": ["hist", "civ", "geo", "eco"],
    "english": ["engl"], "english_grammar": ["engl"], "hindi": ["hin"],
    "accountancy": ["acc"], "business_studies": ["bs"], "commerce": ["bs"],
    "computer_science": ["cs"], "computer_applications": ["ca"],
    "informatics_practices": ["ip"], "biotechnology": ["biotech"],
    "political_science": ["ps"], "political_theory": ["ps"], "psychology": ["psy"],
    "sociology": ["soc"], "home_science": ["hs"],
}

FAMILY_ALIASES = {
    "bio": "biology", "chem": "chemistry", "phy": "physics", "math": "mathematics",
    "hist": "history", "civ": "civics", "geo": "geography", "eco": "economics",
    "engl": "english", "hin": "hindi", "cs": "computer_science",
    "ip": "informatics_practices", "acc": "accountancy", "bs": "business_studies",
    "biotech": "biotechnology", "psy": "psychology", "soc": "sociology",
    "ps": "political_science", "hs": "home_science", "stat": "statistics",
    "ca": "computer_applications",
}


def node_family(subject_key: str) -> str | None:
    for fam, keys in NODE_FAMILY_KEYS.items():
        if subject_key in keys:
            return fam
    return None


# ─────────────────────────── inventory parsing ───────────────────────────

def parse_registry() -> list[dict]:
    """Parse c6_12_gameRegistry.ts: lazySim imports + GameMeta entries."""
    src = REGISTRY_TS.read_text(encoding="utf-8")
    imports = dict(re.findall(
        r"const\s+(Sim\d+)\s*=\s*lazySim\('@?/?(components/simulations/[^']+)'", src))
    entries = re.findall(
        r"\{ id: '(.*?)', name: '(.*?)', emoji: '(.*?)', color: '(.*?)', "
        r"nodeIds: \[(.*?)\], subject: '(.*?)', classLevel: (\d+), component: (Sim\d+) \}",
        src)
    sims = []
    for sim_id, name, _emoji, _color, legacy, subject, class_level, comp in entries:
        rel = imports.get(comp)
        if rel is None:
            continue
        sims.append({
            "simId": sim_id,
            "name": name,
            "importPath": rel,                      # components/simulations/...
            "classLevel": int(class_level),
            "registrySubject": subject,
            "legacyNodeIds": [x.strip().strip("'\"") for x in legacy.split(",") if x.strip()],
            "source": "c6_12_gameRegistry",
        })
    return sims


def parse_3d_lab() -> list[dict]:
    """Parse 3d-lab wiring: simLoaders.tsx (id -> import) + agentSims.json (metadata)."""
    if not SIM_LOADERS_TS.exists() or not AGENT_SIMS_JSON.exists():
        return []
    loaders = re.findall(
        r"'([a-z0-9-]+)':\s*dynamic\(\(\)\s*=>\s*import\('@?/?(components/simulations/three/[^']+)'",
        SIM_LOADERS_TS.read_text(encoding="utf-8"))
    meta = {m["id"]: m for m in json.loads(AGENT_SIMS_JSON.read_text(encoding="utf-8"))}
    sims = []
    for sim_id, rel in loaders:
        m = meta.get(sim_id, {})
        sims.append({
            "simId": sim_id,
            "name": m.get("title", sim_id),
            "importPath": rel,
            "classLevel": 0,        # derived from filename below
            "registrySubject": m.get("subject", ""),
            "legacyNodeIds": [],
            "chapterLabel": m.get("chapter", ""),
            "source": "3d_lab",
        })
    return sims


FILENAME_RE = re.compile(r"^C(\d{1,2})_(.+?)(CBSE)?Sim$")


def parse_filename(path: str) -> tuple[int | None, str, str]:
    """'components/simulations/c6_12/C10_ScienceLifeProcessesSim' ->
       (10, 'Science', 'LifeProcesses'). Falls back to (None, 'Unknown', full stem)."""
    stem = path.split("/")[-1]
    stem = re.sub(r"\.tsx$", "", stem)
    m = FILENAME_RE.match(stem)
    if not m:
        return None, "Unknown", stem
    cls = int(m.group(1))
    rest = m.group(2)
    subject = ""
    for pref in SUBJECT_PREFIXES:                 # longest-first list
        if rest.startswith(pref):
            subject = pref
            break
    topic = rest[len(subject):] if subject else rest
    if not topic:
        topic = subject
    return cls, subject or "Unknown", topic


# ─────────────────────────── node / catalog loading ───────────────────────────

def load_nodes() -> list[dict]:
    data = json.loads(NODES_JSON.read_text(encoding="utf-8"))
    return data["nodes"] if isinstance(data, dict) else data


def load_catalogs() -> list[dict]:
    cats = []
    for f in sorted(CATALOG_DIR.glob("catalog_class*.json")):
        try:
            data = json.loads(f.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, OSError):
            continue
        concepts = data.get("concepts") or []
        cats.append({
            "file": f.name,
            "class": _to_int(data.get("class")),
            "subject": str(data.get("subject", "")).lower(),
            "code": _to_int(data.get("chapter")),
            "chapterTitle": str(data.get("chapter_title", "")),
            "conceptTitles": [str(c.get("title", "")) for c in concepts if c.get("title")],
            "conceptIds": [str(c.get("id", "")) for c in concepts if c.get("id")],
        })
    return cats


def _to_int(v) -> int | None:
    try:
        return int(str(v).strip())
    except (TypeError, ValueError):
        return None


# ─────────────────────────── mapping core ───────────────────────────

STRONG_FINAL, STRONG_NODE = 0.50, 0.22
WEAK_FINAL, WEAK_NODE = 0.28, 0.12
EXACT_NODE = 0.85
HINT_BONUS = 0.10
PARTIAL_CHAP_CREDIT = 0.08     # chapter mentions the token only somewhere in its cluster
MAX_STRONG_NODES, MAX_WEAK_NODES = 15, 8
MAX_SINGLE_TOKEN_NODES = 6     # 1-token slugs cannot support a wide cluster
CATALOG_REF_MIN = 0.50         # min containment sim-slug vs catalog chapter title


class Pool:
    """Candidate node pool for one (class, family) pair with precomputed token stats."""

    def __init__(self, nodes: list[dict]):
        self.nodes = nodes
        self.node_tokens: list[set[str]] = []
        self.chap_keys: list[tuple[str, int]] = []
        chap_tokens: dict[tuple[str, int], set[str]] = defaultdict(set)
        chap_members: dict[tuple[str, int], int] = defaultdict(int)
        df: dict[str, int] = defaultdict(int)
        for n in nodes:
            text = " ".join(str(n.get(k, "")) for k in
                            ("definition", "scope_boundary", "mastery_criteria"))
            toks = set(content_tokens(text))
            self.node_tokens.append(toks)
            fam = node_family(str(n.get("subject", ""))) or str(n.get("subject", ""))
            key = (fam, int(n.get("chapter", 0) or 0))
            self.chap_keys.append(key)
            chap_tokens[key] |= toks
            chap_members[key] += 1
            for t in toks:
                df[t] += 1
        self.chap_tokens = chap_tokens
        self.chap_members = chap_members
        self.n = max(1, len(nodes))
        chap_df: dict[str, int] = defaultdict(int)
        for toks in chap_tokens.values():
            for t in toks:
                chap_df[t] += 1
        self.chap_df = chap_df
        self.df = df

    def idf(self, token: str) -> float:
        return math.log(1.0 + self.n / (1.0 + self.df.get(token, 0)))

    def coverage(self, sim_toks: list[str], text_toks: set[str], chap: bool = False) -> float:
        total = sum(self.idf(t) for t in sim_toks)
        if total <= 0:
            return 0.0
        hit = 0.0
        for t in sim_toks:
            if t in text_toks:
                hit += self.idf(t)
            elif chap and t in self.chap_df:      # token known to the chapter universe at all
                hit += PARTIAL_CHAP_CREDIT * self.idf(t)   # tiny credit in cluster mode
        return hit / total

    def chapter_specificity(self, sim_toks: list[str], key: tuple[str, int]) -> float:
        """Fraction of the chapter's nodes that actually touch any sim token.

        Distinguishes the one chapter that is *about* the topic (every node mentions it)
        from chapters that merely mention the word once."""
        total = self.chap_members.get(key, 0)
        if total <= 0:
            return 0.0
        touching = sum(1 for toks, k in zip(self.node_tokens, self.chap_keys)
                       if k == key and toks & set(sim_toks))
        return touching / total


def align_catalog_chapters(catalogs: list[dict], pools: dict, sim_class: int,
                           families: list[str]) -> dict[str, dict]:
    """Content-align catalog chapters of one class to node chapter numbers per family.

    Returns {catalog file: {families: {fam: aligned_chapter_or_None}, ...}} computed
    by token overlap between the catalog chapter title (+concept titles) and the chapter
    clusters. A family only keeps its alignment if it scores close to the best-scoring
    family for that catalog (relative gate) -- "Life Processes" belongs to biology even
    though the chemistry chapter also mentions the words "life" and "process".
    """
    out: dict[str, dict] = {}
    for cat in catalogs:
        if cat["class"] != sim_class:
            continue
        title_toks = set(content_tokens(cat["chapterTitle"]))
        conc_toks: set[str] = set()
        for t in cat["conceptTitles"][:12]:
            conc_toks |= set(content_tokens(t))
        fam_scores: dict[str, tuple[int, float]] = {}
        for fam in families:
            pool = pools.get(fam)
            if pool is None or not title_toks:
                continue
            best_ch, best_score = None, 0.0
            for (f, ch), toks in sorted(pool.chap_tokens.items()):
                if f != fam:
                    continue
                cov = containment(title_toks, toks)
                cov2 = containment(conc_toks, toks) if conc_toks else 0.0
                # the TITLE itself must be largely covered by the chapter cluster --
                # "Life Processes" must not align to a chemistry chapter that merely
                # contains the word "process"
                if cov < 0.6:
                    continue
                score = 0.6 * cov + 0.4 * cov2
                if score > best_score:
                    best_score, best_ch = score, ch
            if best_ch is not None and best_score >= 0.5:
                fam_scores[fam] = (best_ch, best_score)
        # relative gate: drop families far below the best-scoring family
        if fam_scores:
            top = max(s for _, s in fam_scores.values())
            fam_scores = {f: cs for f, cs in fam_scores.items() if cs[1] >= 0.8 * top}
        per_family = {fam: ch for fam, (ch, _s) in fam_scores.items()}
        out[cat["file"]] = {"families": per_family,
                            "title_toks": title_toks,
                            "chapterTitle": cat["chapterTitle"]}
    return out


def map_sim(sim: dict, pools: dict, pool_cache: dict, class_catalogs: dict) -> dict:
    """Compute nodeIds + metadata for one sim. Returns an output row (mapped or unmapped)."""
    cls, subject_token, chapter_slug = sim["class"], sim["subjectToken"], sim["chapterSlug"]
    # tokens of the subject prefix itself ('geo' in name 'Geo Climate CBSE') match every
    # node of that subject -- strip them so the slug measures the TOPIC only
    subject_toks = set(slug_tokens(subject_token))
    slug_toks = [t for t in slug_tokens(chapter_slug + " " + sim.get("name", ""))
                 if t not in subject_toks]
    if not slug_toks:
        slug_toks = slug_tokens(chapter_slug + " " + sim.get("name", ""))

    subject_fams = SUBJECT_FAMILIES.get(subject_token)
    known_subject = subject_token in SUBJECT_FAMILIES
    subject_fams = subject_fams or []
    pool: Pool | None = None
    if subject_fams:
        cache_key = (cls, tuple(subject_fams))
        if cache_key not in pool_cache:
            merged: list[dict] = []
            for f in subject_fams:
                merged.extend(pools[f].nodes if f in pools else [])
            pool_cache[cache_key] = Pool(merged) if merged else None
        pool = pool_cache[cache_key]   # re-indexed across families so idf/chapters are shared
    if pool is None or not pool.nodes or not slug_toks:
        if not known_subject:
            reason = "unknown_subject"
        elif not subject_fams or pool is None or not pool.nodes:
            reason = "no_nodes_for_class_subject"
        else:
            reason = "empty_slug"
        return _row(sim, unmapped_reason=reason)

    # catalog chapter matches for this sim (containment of title toks vs slug toks, both ways)
    cat_matches: list[dict] = []
    hint_chapters: set[tuple[str, int]] = set()
    aligned_fams: set[str] = set()
    for fname, info in class_catalogs.items():
        if not info["title_toks"]:
            continue
        o1 = containment(info["title_toks"], set(slug_toks))
        o2 = containment(set(slug_toks), info["title_toks"])
        ov = max(o1, o2)
        if ov >= CATALOG_REF_MIN:
            fam_align = None
            for f in subject_fams:
                a = info["families"].get(f)
                if a is not None:
                    if fam_align is None:
                        fam_align = a
                    hint_chapters.add((f, a))
                    aligned_fams.add(f)
            cat_matches.append({"catalog": fname, "chapterTitle": info["chapterTitle"],
                                "nodeChapter": fam_align, "overlap": round(ov, 4)})
    cat_matches.sort(key=lambda c: (-c["overlap"], c["catalog"]))

    results = []
    for i, n in enumerate(pool.nodes):
        fam_key = pool.chap_keys[i][0]
        chap_no = pool.chap_keys[i][1]
        cov_node = pool.coverage(slug_toks, pool.node_tokens[i])
        cov_chap = pool.coverage(slug_toks, pool.chap_tokens[(fam_key, chap_no)], chap=True)
        spec = pool.chapter_specificity(slug_toks, (fam_key, chap_no))
        eff_chap = cov_chap * (0.5 + 0.5 * spec)
        hint = 1.0 if (fam_key, chap_no) in hint_chapters else 0.0
        # no upper cap: the hint bonus must keep distinguishing hinted nodes
        final = 0.65 * cov_node + 0.35 * eff_chap + HINT_BONUS * hint
        results.append((final, cov_node, eff_chap, hint,
                        str(n["node_id"]), chap_no, fam_key))
    results.sort(key=lambda r: (-r[0], -r[1], r[4]))

    # for multi-family subjects (Science, EVS, SocialScience, ...) a catalog-aligned
    # chapter pins the topic to ONE family -- drop the other families' nodes when the
    # catalog is decisive, so generic words ("process", "environment") don't drag in
    # unrelated chemistry/physics nodes.
    focused = (len(subject_fams) > 1 and aligned_fams
               and set(aligned_fams) != set(subject_fams))
    if focused:
        in_fam = [r for r in results if r[6] in aligned_fams]
        if any(r[0] >= WEAK_FINAL and r[1] >= WEAK_NODE for r in in_fam):
            results = in_fam

    cap = MAX_STRONG_NODES
    if len(slug_toks) == 1:
        cap = MAX_SINGLE_TOKEN_NODES   # one token cannot justify a wide cluster
    strong = [r for r in results if r[0] >= STRONG_FINAL and r[1] >= STRONG_NODE]
    selected = strong[:cap]
    strength = "strong"
    if not selected:
        weak = [r for r in results if r[0] >= WEAK_FINAL and r[1] >= WEAK_NODE]
        selected = weak[:MAX_WEAK_NODES]
        strength = "weak"
    if not selected:
        best = results[0]
        return _row(sim, unmapped_reason="low_content_overlap",
                    best_candidate={"nodeId": best[4], "score": round(best[0], 4),
                                    "tokenCoverage": round(best[1], 4)})

    top = selected[0]
    if strength == "strong" and top[1] >= EXACT_NODE and len(slug_toks) >= 2:
        strength = "exact"
    row = _row(sim)
    row.update({
        "nodeIds": [r[4] for r in selected],
        "matchStrength": strength,
        "catalogRefs": cat_matches[:3],
        "signals": {
            "tokenCoverage": round(top[1], 4),
            "chapterCoverage": round(top[2], 4),
            "catalogHint": bool(top[3]),
            "familyFocused": bool(focused),
            "topScore": round(top[0], 4),
        },
    })
    return row


def _row(sim: dict, unmapped_reason: str | None = None,
         best_candidate: dict | None = None) -> dict:
    cls = sim["class"]
    subject = SUBJECT_CANONICAL.get(sim["subjectToken"], sim["subjectToken"].lower())
    row = {
        "simId": sim["simId"],
        "file": "frontend/" + sim["importPath"] + ".tsx",
        "class": cls,
        "subject": subject,
        "chapter": sim["chapterSlug"],
        "source": sim["source"],
    }
    if unmapped_reason is None:
        return row
    row["reason"] = unmapped_reason
    if best_candidate:
        row["bestCandidate"] = best_candidate
    return row


# ─────────────────────────── main ───────────────────────────

def build() -> int:
    # 1. inventory
    sims = parse_registry() + parse_3d_lab()
    for s in sims:
        cls, subj, topic = parse_filename(s["importPath"])
        if s["classLevel"]:
            cls = s["classLevel"]
        if cls is None and s.get("chapterLabel"):
            m = re.search(r"Class\s*(\d{1,2})", s["chapterLabel"])
            cls = int(m.group(1)) if m else None
        s["class"] = cls
        s["subjectToken"] = subj
        s["chapterSlug"] = topic
    in_scope = [s for s in sims if s["class"] is not None and MIN_CLASS <= s["class"] <= MAX_CLASS]
    out_scope = [s for s in sims if s not in in_scope]

    # dedupe identical wiring (same component path launched under several ids) and make
    # simId unique: the registry reuses a few ids for Part1/Part2 variant files, so the
    # 2nd/3rd occurrence gets a deterministic "#2"/"#3" suffix (file order is stable).
    seen_paths: set[str] = set()
    id_counts: dict[str, int] = defaultdict(int)
    inventory: list[dict] = []
    for s in in_scope:
        if s["importPath"] in seen_paths:
            continue
        seen_paths.add(s["importPath"])
        id_counts[s["simId"]] += 1
        if id_counts[s["simId"]] > 1:
            s["simId"] = f"{s['simId']}#{id_counts[s['simId']]}"
        inventory.append(s)
    inventory.sort(key=lambda s: (s["class"], s["subjectToken"], s["simId"]))

    # 2. pools per class per family (built from the global node list)
    all_nodes = load_nodes()
    pools_by_class: dict[int, dict[str, Pool]] = defaultdict(dict)
    grouped: dict[int, dict[str, list[dict]]] = defaultdict(lambda: defaultdict(list))
    for n in all_nodes:
        cls = n.get("class")
        fam = node_family(str(n.get("subject", "")))
        if cls is None or fam is None:
            continue
        grouped[int(cls)][fam].append(n)
    for cls, fams in grouped.items():
        for fam, nodes in fams.items():
            pools_by_class[cls][fam] = Pool(nodes)

    catalogs = load_catalogs()
    set_vocab(build_vocab(all_nodes, catalogs))
    align_cache: dict[int, dict] = {}
    pool_cache: dict = {}

    mapped_rows: list[dict] = []
    unmapped_rows: list[dict] = []
    for sim in inventory:
        cls = sim["class"]
        key = cls
        if key not in align_cache:
            align_cache[key] = align_catalog_chapters(
                catalogs, pools_by_class.get(cls, {}), cls,
                sorted({f for fams in SUBJECT_FAMILIES.values() for f in fams}))
        class_catalogs = {
            f: {"families": info["families"], "title_toks": info["title_toks"],
                "chapterTitle": info["chapterTitle"]}
            for f, info in align_cache[key].items()}
        row = map_sim(sim, pools_by_class.get(cls, {}), pool_cache, class_catalogs)
        (mapped_rows if "nodeIds" in row else unmapped_rows).append(row)

    mapped_rows.sort(key=lambda r: (r["class"], r["subject"], r["simId"]))
    unmapped_rows.sort(key=lambda r: (r["class"], r["subject"], r["simId"]))

    OUT_MAP.write_text(json.dumps(mapped_rows, ensure_ascii=False, indent=2) + "\n",
                       encoding="utf-8")
    OUT_UNMAPPED.write_text(json.dumps(unmapped_rows, ensure_ascii=False, indent=2) + "\n",
                            encoding="utf-8")

    # 3. coverage stats (stdout report)
    total_wired = len(inventory) + len(out_scope)
    n_map, n_unmap = len(mapped_rows), len(unmapped_rows)
    print("=" * 74)
    print("SIM -> NODE MAP  build report")
    print("=" * 74)
    print(f"wired sims (class {MIN_CLASS}-{MAX_CLASS}): {len(inventory)}   "
          f"(out-of-scope wired: {len(out_scope)})")
    print(f"mapped: {n_map}  ({100.0 * n_map / max(1, len(inventory)):.1f}%)   "
          f"unmapped: {n_unmap}  ({100.0 * n_unmap / max(1, len(inventory)):.1f}%)")
    by_strength = defaultdict(int)
    for r in mapped_rows:
        by_strength[r["matchStrength"]] += 1
    print("matchStrength:", dict(sorted(by_strength.items())))
    if out_scope:
        print("out-of-scope:", ", ".join(f"{s['simId']}(C{s['class']})" for s in out_scope))

    print("\n-- per class x subject (sims) --")
    tbl: dict[tuple, list[int]] = defaultdict(lambda: [0, 0])
    for r in mapped_rows:
        tbl[(r["class"], r["subject"])][0] += 1
    for r in unmapped_rows:
        tbl[(r["class"], r["subject"])][1] += 1
    classes = sorted({k[0] for k in tbl})
    subjects = sorted({k[1] for k in tbl})
    hdr = "class | " + " | ".join(f"{s[:12]:>12}" for s in subjects) + " | total | mapped%"
    print(hdr)
    for c in classes:
        cells, tot, mapped = [], 0, 0
        for s in subjects:
            m, u = tbl.get((c, s), [0, 0])
            cells.append(f"{m}/{m + u}".rjust(12) if m + u else " ".rjust(12))
            tot += m + u
            mapped += m
        print(f"{c:>5} | " + " | ".join(cells) + f" | {mapped}/{tot} | "
              f"{100.0 * mapped / max(1, tot):.0f}%")

    # node-side coverage: nodes hit by >=1 mapped sim
    covered: dict[str, str] = {}
    for r in mapped_rows:
        for nid in r["nodeIds"]:
            covered.setdefault(nid, r["simId"])
    node_by_class_subj = defaultdict(lambda: [0, 0])
    for n in all_nodes:
        fam = node_family(str(n.get("subject", "")))
        key = (int(n["class"]), FAMILY_ALIASES.get(fam, fam or n["subject"]))
        node_by_class_subj[key][1] += 1
        if n["node_id"] in covered:
            node_by_class_subj[key][0] += 1
    print("\n-- node-side coverage (nodes hit by >=1 sim / total nodes) --")
    for (c, s) in sorted(node_by_class_subj):
        cov, tot = node_by_class_subj[(c, s)]
        if tot:
            print(f"  c{c:<3}{s:<24}{cov:>5}/{tot:<5}{100.0 * cov / tot:5.1f}%")
    tot_nodes = sum(v[1] for v in node_by_class_subj.values())
    tot_cov = sum(v[0] for v in node_by_class_subj.values())
    print(f"  TOTAL{'':21}{tot_cov:>5}/{tot_nodes:<5}{100.0 * tot_cov / max(1, tot_nodes):5.1f}%")
    print(f"\nwrote {OUT_MAP} ({n_map} sims)")
    print(f"wrote {OUT_UNMAPPED} ({n_unmap} sims)")
    return 0


if __name__ == "__main__":
    sys.exit(build())
