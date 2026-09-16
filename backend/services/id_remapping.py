"""id_remapping.py -- Node ID-remapping service (foreign -> official corpus).

Resolves foreign/legacy content (CISCE-era diagnostics.jsonl,
misconceptions.jsonl, legacy diagrams_index.json, and future foreign
corpora) INWARD onto the official enhanced-nodes corpus
(``backend/_cache/enhanced_nodes_index.json``, 9,010 nodes).

Authority rule (owner directive): the official corpus is the anchor.
Foreign content resolves inward to official node ids, or it does not
resolve. Nothing routes outward. Below the confidence threshold a record
is reported as ``unresolved`` -- honest, no guesses.

Resolution bases (multi-signal, conservative):
    exact_id              foreign id string is literally an official node id
    subject_chapter_topic class + subject family + chapter hint + topic tokens
    title_tokens          idf-weighted token overlap vs definition/walkthrough

Usage (library):
    from backend.services.id_remapping import get_index, resolve, map_file
    idx = get_index()
    resolve(idx, {"subject": "maths", "class_level": 10, "topic_tag": "...",
                  "target_nodes": ["c10_maths_012"]})

Usage (CLI, batch):
    python -m backend.services.id_remapping parsed_output/diagnostics.jsonl \\
        target_nodes --out backend/_cache/remapped_diagnostics.jsonl

Usage (API, read-only):
    router mounted at /api/nodes/remap  ->  GET /api/nodes/remap/stats
"""
from __future__ import annotations

import argparse
import json
import math
import re
import sys
import time
from collections import Counter, defaultdict
from pathlib import Path
from typing import Any, Dict, Iterable, List, Optional, Tuple

# --------------------------------------------------------------------------
# Paths
# --------------------------------------------------------------------------

REPO_ROOT = Path(__file__).resolve().parents[2]
DEFAULT_INDEX = REPO_ROOT / "backend" / "_cache" / "enhanced_nodes_index.json"
CACHE_DIR = REPO_ROOT / "backend" / "_cache"

# --------------------------------------------------------------------------
# Tuning constants (conservative: zero-wrong beats high recall)
# --------------------------------------------------------------------------

CONFIDENCE_THRESHOLD = 0.60     # below -> unresolved
STRICT_THRESHOLD = 0.75        # when the foreign subject has no official family
MARGIN = 0.08                   # best must beat runner-up by this much
MIN_MATCHED_TOKENS = 3          # need at least 3 real token hits
DISTINCTIVE_ANCHOR_IDF = 5.0    # >=1 matched token must be genuinely rare
MAX_QUERY_TOKENS = 45           # focus on the most distinctive query tokens
CHAPTER_MATCH_BOOST = 1.15      # chapter hint agrees
CHAPTER_MISMATCH_PENALTY = 0.70  # chapter hint disagrees (soft: book editions differ)
CLASS_ADJACENT_PENALTY = 0.85   # candidate in class +/- 1 (CISCE/CBSE drift)
SOFT_CLASS_BONUS = 0.04         # legacy-id class hint agrees (never a filter)

# --------------------------------------------------------------------------
# Subject canonicalization (server-side; frontend/lib/nodeTitle.ts is the
# naming reference -- here we map foreign codes -> canonical groups ->
# official corpus subject codes).
# --------------------------------------------------------------------------

FOREIGN_SUBJECT_TO_CANONICAL: Dict[str, str] = {
    # mathematics
    "math": "math", "maths": "math", "mathsc": "math", "mathematics": "math",
    "appmath": "math", "amath": "math", "appliedmath": "math", "applied_maths": "math",
    # sciences
    "bio": "bio", "biology": "bio",
    "chem": "chem", "chemistry": "chem",
    "phy": "phy", "phys": "phy", "physics": "phy",
    "sci": "science", "science": "science",
    "evs": "evs", "evm": "evs",
    # humanities
    "hist": "hist", "history": "hist", "his": "hist",
    "civ": "civ", "civics": "civ",
    "histciv": "histciv", "hcg": "histciv", "historycivics": "histciv",
    "geo": "geo", "geography": "geo",
    "soc": "soc", "social": "soc", "socialscience": "soc", "social_science": "soc",
    "pol": "pol", "polsci": "pol", "ps": "pol", "politicalscience": "pol",
    "psy": "psy", "psychology": "psy",
    # languages
    "eng": "eng", "engl": "eng", "english": "eng", "englit": "eng",
    "eng_f": "eng", "eng_h": "eng", "eng_k": "eng", "eng_s": "eng",
    "eng_v": "eng", "eng_w": "eng",
    "hin": "hin", "hindi": "hin", "hin_a": "hin", "hin_al": "hin",
    "hin_ar": "hin", "hin_v": "hin",
    # computers / commerce / others
    "cs": "cs", "comp": "cs", "computerscience": "cs", "computer_science": "cs",
    "ip": "ip", "informaticspractices": "ip", "informatics_practices": "ip",
    "ai": "ai", "artificialintelligence": "ai",
    "acc": "acc", "accounts": "acc", "accountancy": "acc",
    "eco": "eco", "econ": "eco", "economics": "eco",
    "bs": "bs", "bst": "bs", "businessstudies": "bs", "business_studies": "bs",
    "bt": "biotech", "biotech": "biotech", "biotechnology": "biotech",
    "hs": "hs", "homescience": "hs", "home_science": "hs",
    "stat": "stat", "statistics": "stat",
    "ca": "ca", "commercialart": "ca",
    "legal": "legal", "legalstudies": "legal", "legal_studies": "legal",
    "pe": "pe", "physicaleducation": "pe", "physical_education": "pe",
    "hpe": "hpe", "healthphysicaleducation": "hpe",
}

# canonical group -> set of official subject codes in enhanced_nodes_index.
# Empty set = the official corpus has no such subject (record can still be
# resolved only via a strict all-subject token path, or stays unresolved).
CANONICAL_TO_OFFICIAL: Dict[str, frozenset] = {
    "math": frozenset({"math"}),
    "bio": frozenset({"bio", "biology"}),
    "chem": frozenset({"chem", "chemistry"}),
    "phy": frozenset({"phy", "physics"}),
    "science": frozenset({"bio", "biology", "chem", "chemistry", "phy", "physics"}),
    "evs": frozenset(),
    "hist": frozenset({"hist", "history"}),
    "civ": frozenset({"civ", "civics"}),
    "histciv": frozenset({"hist", "history", "civ", "civics"}),
    "geo": frozenset({"geo", "geography"}),
    # school "social science" spans history/civics/geography; classes 11-12
    # also have a dedicated 'soc' (sociology/social science) code.
    "soc": frozenset({"soc", "hist", "history", "civ", "civics", "geo", "geography"}),
    "pol": frozenset({"ps"}),
    "psy": frozenset({"psy"}),
    "eng": frozenset({"engl", "english", "eng_f", "eng_h", "eng_k",
                      "eng_s", "eng_v", "eng_w"}),
    "hin": frozenset({"hin_a", "hin_al", "hin_ar", "hin_v"}),
    "cs": frozenset({"cs"}),
    "ip": frozenset({"ip"}),
    "ai": frozenset(),
    "acc": frozenset({"acc", "ca"}),  # 'ca' = official computerised accounting
    "eco": frozenset({"eco", "economics"}),
    "bs": frozenset({"bs"}),
    "biotech": frozenset({"biotech"}),
    "hs": frozenset({"hs"}),
    "stat": frozenset({"stat"}),
    "ca": frozenset({"ca"}),
    "legal": frozenset(),
    "pe": frozenset(),
    "hpe": frozenset(),
}

# --------------------------------------------------------------------------
# Tokenization
# --------------------------------------------------------------------------

_TOKEN_RE = re.compile(r"[a-z0-9]+")

# foreign/legacy id substrings ('c11_acc_072', 'PRE_c11_acc_072_01') leak
# into topic/question text and would otherwise pollute the query
_FOREIGN_ID_IN_TEXT_RE = re.compile(
    r"\bc\d{1,2}_[a-z][a-z0-9_]*(?:_\d+[a-z]?)+", re.IGNORECASE)

_STOPWORDS = frozenset("""
a about after all also am an and any ans answer answers are as at be been being
below between both but by can could define defined definition describe
description detail detailed did do does doing draw drawi draw each else end
example examples explain explanation fig figure figures following for from
given grade has have having here how identify if in into is it its itself justify
kind kinds learn learning list long main may might more most must name names
ncert cbse icse cisce board syllabus chapter chapters class std standard unit
section exercise exercises node nodes notes note no nor not of on once one only
onto or other others our out over own part parts picture process? question
questions ques option options short should show shows shown some state states student
students study such than that the their them then there these they this
those through too topic topics type types under until up use used using very
was we were what when where which while who whom whose why will with within
without write writing you your draw correctly likely probably choose select
mcq respectively
""".split())

_ID_TOKEN = re.compile(r"^c\d+$")


def _normalize_token(t: str) -> str:
    """Light, deterministic suffix folding (both sides of the match use it).

    Ordered single pass: ies/ied->y, ing, ed, trailing e, plurals.
    Both query and index tokens go through the same chain, so the only
    effect is merging near-forms; collisions are harmless for retrieval.
    """
    if len(t) > 4 and t.endswith("ies"):
        t = t[:-3] + "y"
    elif len(t) > 5 and t.endswith("ied"):
        t = t[:-3] + "y"
    elif len(t) > 5 and t.endswith("ing"):
        t = t[:-3]
    elif len(t) > 5 and t.endswith("ed") and not t.endswith("eed"):
        t = t[:-2]
    if len(t) > 4 and t.endswith("e") and not t.endswith("ee"):
        t = t[:-1]
    if len(t) > 4 and t.endswith("ses") and not t.endswith("sses"):
        t = t[:-2]
    elif len(t) > 3 and t.endswith("s") and not t.endswith(("ss", "us", "is")):
        t = t[:-1]
    return t


def tokenize(text: str) -> List[str]:
    if not text:
        return []
    out = []
    for raw in _TOKEN_RE.findall(text.lower()):
        if len(raw) < 3 and not raw.isdigit():
            continue
        if raw in _STOPWORDS or _ID_TOKEN.match(raw):
            continue
        if raw.isdigit() and len(raw) < 2:
            continue
        out.append(_normalize_token(raw))
    return out


# --------------------------------------------------------------------------
# Foreign id parsing
# --------------------------------------------------------------------------

_PAREN_RE = re.compile(r"\s*\([^)]*\)\s*")
_EMBEDDED_ID_RE = re.compile(r"\bc\d{1,2}_[a-z][a-z0-9_]*_\d[a-z0-9_]*", re.IGNORECASE)
_MARKER_TOKENS = {"cbse", "ch", "icse", "cisce"}


def clean_foreign_id(value: str) -> str:
    """'c8_bio_013 (Heart structure)' -> 'c8_bio_013'."""
    return _PAREN_RE.sub(" ", value or "").strip().lower()


def parse_foreign_id(nid: str) -> Optional[Dict[str, Any]]:
    """Best-effort structural parse of a foreign/legacy node id.

    Recognizes (approximately):
        c10_bio_cbse_01_001 / c6_biology_ch06_001   official shapes
        c11_acc_072 / c6_math_cbse_002              legacy 3-segment
        c7_phy_cbse_004b                            trailing letter
    Returns dict with keys: cls, subject_raw, chapter, node_num (any may be
    None) or None when the string is not an id at all ('UNMAPPED',
    'c11_chem_drill', ...).
    """
    nid = clean_foreign_id(nid)
    if not nid or not nid.startswith("c"):
        return None
    tokens = re.split(r"[^a-z0-9]+", nid)
    tokens = [t for t in tokens if t]
    if len(tokens) < 2 or not re.fullmatch(r"c\d{1,2}", tokens[0]):
        return None
    cls = int(tokens[0][1:])
    body = tokens[1:]
    # trailing numeric segments (strip trailing letters: '004b' -> '004')
    nums: List[int] = []
    while body and body[-1][-1].isdigit() and re.search(r"\d", body[-1]):
        m = re.match(r"^(\d+)", body[-1])
        if not m:
            break
        nums.insert(0, int(m.group(1)))
        body = body[:-1]
    subject_raw = "_".join(t for t in body if t not in _MARKER_TOKENS) or None
    chapter = nums[0] if len(nums) >= 2 else None
    node_num = nums[-1] if nums else None
    # 'c11_chem_drill' style: subject-ish tail with no numbers -> not a node ref
    if node_num is None and chapter is None:
        return None
    return {"cls": cls, "subject_raw": subject_raw, "chapter": chapter,
            "node_num": node_num}


def extract_foreign_ids(record: Dict[str, Any],
                        id_field: Optional[str]) -> List[str]:
    """Collect candidate foreign ids from the record.

    id_field may hold a string or a list. Additionally scans common id-ish
    fields so structural hints survive schema drift across foreign corpora.
    """
    raw: List[Any] = []
    if id_field and id_field in record:
        v = record[id_field]
        raw.extend(v if isinstance(v, list) else [v])
    for alt in ("node_id", "target_nodes", "diagnostic_id", "misconception_id"):
        if alt != id_field and alt in record:
            v = record[alt]
            if isinstance(v, str):
                raw.append(v)
            elif isinstance(v, list):
                raw.extend(x for x in v if isinstance(x, str))
    ids: List[str] = []
    for item in raw:
        if not item or not isinstance(item, str):
            continue
        cleaned = clean_foreign_id(item)
        ids.append(cleaned)
        # 'PRE_c11_acc_072_01' style: pull embedded c-prefixed ids out
        for emb in _EMBEDDED_ID_RE.findall(item):
            c = clean_foreign_id(emb)
            if c != cleaned:
                ids.append(c)
    seen, out = set(), []
    for i in ids:
        if i and i not in seen:
            seen.add(i)
            out.append(i)
    return out


# --------------------------------------------------------------------------
# Official index
# --------------------------------------------------------------------------

def _iter_node_objects(path: Path, chunk_size: int = 1 << 22
                       ) -> Iterable[Dict[str, Any]]:
    """Stream objects of the top-level ``"nodes"`` array without ever
    materialising the whole ~200MB parse tree (the file is single-line
    minified JSON, so line-based streaming is not possible).

    Uses JSONDecoder.raw_decode over a sliding text buffer; each object is
    yielded and can be slimmed by the caller before the next is parsed.
    """
    dec = json.JSONDecoder()
    with open(path, encoding="utf-8") as f:
        buf = f.read(chunk_size)
        key = buf.find('"nodes"')
        if key == -1:
            raise RuntimeError(f"no 'nodes' array in {path}")
        lb = buf.find("[", key)
        if lb == -1:
            raise RuntimeError(f"malformed 'nodes' array in {path}")
        pos = lb + 1
        while True:
            while pos < len(buf) and buf[pos] in " \t\r\n,":
                pos += 1
            if pos >= len(buf):
                buf, pos = buf[pos:] + f.read(chunk_size), 0
                if not buf:
                    return
                continue
            if buf[pos] == "]":  # end of the nodes array
                return
            try:
                obj, end = dec.raw_decode(buf, pos)
            except json.JSONDecodeError:
                more = f.read(chunk_size)
                if not more:
                    raise
                buf, pos = buf[pos:] + more, 0  # object start preserved at 0
                continue
            yield obj
            pos = end


class OfficialIndex:
    """Searchable index over the official enhanced-nodes corpus.

    The index file is ~200MB of single-line JSON; it is STREAMED one node
    at a time (raw_decode over a sliding buffer) and slimmed to the fields
    the resolver needs, so peak memory stays in the low hundreds of MB.
    """

    # node fields kept in memory (the rest -- mastery, scope, diagnostics,
    # walkthrough, ... -- is parse overhead this service never reads).
    # 'definition' is retained as the human-auditable anchor for a match.
    _KEEP = ("node_id", "class", "subject", "board", "chapter", "node_num",
             "definition")

    def __init__(self, index_path: Path = DEFAULT_INDEX):
        self.index_path = Path(index_path)
        self.nodes: List[Dict[str, Any]] = []
        self.by_id: Dict[str, Dict[str, Any]] = {}
        self.by_class_subject: Dict[Tuple[int, str], List[Dict[str, Any]]] = defaultdict(list)
        self.by_class: Dict[int, List[Dict[str, Any]]] = defaultdict(list)
        self.by_subject: Dict[str, List[Dict[str, Any]]] = defaultdict(list)

        df: Counter = Counter()
        for raw in _iter_node_objects(self.index_path):
            node = {k: raw[k] for k in self._KEEP if k in raw}
            text = " ".join(raw.get(k) or "" for k in ("definition", "walkthrough"))
            node["_toks"] = set(tokenize(text))
            self.nodes.append(node)
            self.by_id[node["node_id"]] = node
            self.by_class_subject[(int(node["class"]), str(node["subject"]))].append(node)
            self.by_class[int(node["class"])].append(node)
            self.by_subject[str(node["subject"])].append(node)
            df.update(node["_toks"])
        total = len(self.nodes)
        self.idf: Dict[str, float] = {
            t: math.log(1.0 + total / c) for t, c in df.items()}

    def candidates(self, cls: Optional[int],
                   official_codes: Optional[frozenset]) -> List[Dict[str, Any]]:
        """Class is a strong preference, not an absolute gate: CISCE/CBSE
        placement drifts by one class, so candidates include class +/- 1
        (scored down via CLASS_ADJACENT_PENALTY)."""
        if official_codes:
            if cls is not None:
                pool = [self.by_class_subject.get((c2, code))
                        for c2 in (cls - 1, cls, cls + 1)
                        for code in official_codes]
            else:
                pool = [self.by_subject.get(c) for c in official_codes]
        elif cls is not None:
            pool = [self.by_class.get(c2) for c2 in (cls - 1, cls, cls + 1)]
        else:
            pool = [self.nodes]
        out: List[Dict[str, Any]] = []
        for lst in pool:
            if lst:
                out.extend(lst)
        return out


_INDEX: Optional[OfficialIndex] = None


def get_index(index_path: Path = DEFAULT_INDEX) -> OfficialIndex:
    global _INDEX
    if _INDEX is None or _INDEX.index_path != Path(index_path):
        _INDEX = OfficialIndex(index_path)
    return _INDEX


# --------------------------------------------------------------------------
# Query building
# --------------------------------------------------------------------------

def _record_text_fields(record: Dict[str, Any]) -> Tuple[str, str]:
    """Return (high_priority_text, low_priority_text) for a foreign record."""
    hi = " ".join(str(record.get(k)) for k in ("topic", "topic_tag", "title")
                  if record.get(k))
    lo_parts: List[str] = []
    for k in ("question_text", "misconception_text", "svg_description",
              "alt_text", "content_snippet", "svg_title"):
        if record.get(k):
            lo_parts.append(str(record[k]))
    # diagrams: hotspot labels carry compact concept words
    hotspots = record.get("hotspots")
    if isinstance(hotspots, list):
        for h in hotspots[:6]:
            if isinstance(h, dict):
                if h.get("label"):
                    lo_parts.append(str(h["label"]))
                if h.get("description"):
                    lo_parts.append(str(h["description"]))
    # misconceptions: correction adds context but can bleed into neighbours,
    # so it is lowest priority and only used when the text is thin.
    if record.get("correction"):
        lo_parts.append(str(record["correction"]))
    return hi, " ".join(lo_parts)


def build_query(record: Dict[str, Any],
                index: OfficialIndex) -> List[Tuple[str, float]]:
    """Weighted, idf-ranked query token list (token, weight).

    - topic/title/topic_tag tokens weigh double (authored labels)
    - foreign-id substrings are scrubbed from the text
    - bare numbers are heavily down-weighted (amounts like Rs 5,00,000 are
      question furniture, not topic anchors)
    """
    hi, lo = _record_text_fields(record)
    id_scrub = lambda s: _FOREIGN_ID_IN_TEXT_RE.sub(" ", s)
    q: Dict[str, float] = {}
    for tok in tokenize(id_scrub(hi)):
        q[tok] = max(q.get(tok, 0.0), 2.0)          # topic/title: strong
    for tok in tokenize(id_scrub(lo)):
        if tok in q and q[tok] >= 2.0:
            continue
        q[tok] = max(q.get(tok, 0.0), 1.0)
    if not q:
        return []
    # amounts/serials: keep as weak evidence only
    for tok in list(q):
        if tok.isdigit():
            q[tok] = min(q[tok], 0.35)
    ranked = sorted(q.items(), key=lambda kv: -(kv[1] * index.idf.get(kv[0], 4.0)))
    return ranked[:MAX_QUERY_TOKENS]


# --------------------------------------------------------------------------
# Core resolution
# --------------------------------------------------------------------------

def _score_candidates(index: OfficialIndex, query: List[Tuple[str, float]],
                      candidates: List[Dict[str, Any]],
                      chapter: Optional[int], soft_cls: Optional[int],
                      cls: Optional[int] = None
                      ) -> List[Tuple[float, int, Dict[str, Any], List[str]]]:
    """Return [(score, n_matched, node, matched_tokens)] sorted desc.

    Coverage is normalized by the *matchable* mass: the idf-weighted query
    tokens that appear in at least one candidate. Question framing words
    ('state the six core components...') that no node definition would ever
    contain must not cap a correct match's score.
    """
    q_weight: Dict[str, float] = {t: index.idf.get(t, 4.0) * w for t, w in query}
    if not q_weight:
        return []
    pool_union = set()
    for node in candidates:
        pool_union |= node["_toks"]
    den = sum(w for t, w in q_weight.items() if t in pool_union)
    if den <= 0:
        return []
    scored = []
    for node in candidates:
        toks = node["_toks"]
        num = 0.0
        matched: List[str] = []
        for t in q_weight:
            if t in toks:
                num += q_weight[t]
                matched.append(t)
        if not matched:
            continue
        score = num / den
        if chapter is not None:
            if int(node.get("chapter", -1)) == chapter:
                score = min(1.0, score * CHAPTER_MATCH_BOOST)
            else:
                score *= CHAPTER_MISMATCH_PENALTY
        if cls is not None and int(node["class"]) != cls:
            score *= CLASS_ADJACENT_PENALTY
        if soft_cls is not None and int(node["class"]) == soft_cls:
            score = min(1.0, score + SOFT_CLASS_BONUS)
        scored.append((score, len(matched), node, matched))
    scored.sort(key=lambda x: (-x[0], -x[1]))
    return scored


def resolve(record: Dict[str, Any], index: Optional[OfficialIndex] = None,
            id_field: Optional[str] = None,
            threshold: float = CONFIDENCE_THRESHOLD
            ) -> Dict[str, Any]:
    """Resolve one foreign record -> {status, official_node_id, confidence,
    basis, ...}. Never guesses: below the threshold it is 'unresolved'."""
    index = index or get_index()
    foreign_ids = extract_foreign_ids(record, id_field)

    # ---- signal 1: literal exact id --------------------------------------
    for fid in foreign_ids:
        if fid in index.by_id:
            return {"status": "resolved", "official_node_id": fid,
                    "confidence": 0.99, "basis": "exact_id",
                    "matched_tokens": [], "foreign_ids": foreign_ids,
                    "runner_up": None, "reason": None}

    # ---- structural hints -------------------------------------------------
    cls: Optional[int] = None
    cls_is_structural = False
    raw_cls = record.get("class_level", record.get("class"))
    if isinstance(raw_cls, int):
        cls, cls_is_structural = raw_cls, True
    elif isinstance(raw_cls, str) and raw_cls.strip().isdigit():
        cls, cls_is_structural = int(raw_cls.strip()), True

    soft_cls: Optional[int] = None
    parsed_ids = [p for p in (parse_foreign_id(i) for i in foreign_ids) if p]
    if not cls_is_structural and parsed_ids:
        id_classes = {p["cls"] for p in parsed_ids}
        if len(id_classes) == 1:
            soft_cls = id_classes.pop()
            cls = soft_cls  # hint only; weaker gate handled via strict scoring

    subj_raw = record.get("subject") or (parsed_ids[0]["subject_raw"]
                                         if parsed_ids else None)
    chapter: Optional[int] = None
    code = record.get("_chapter_code")
    if isinstance(code, str) and code[-2:].isdigit():
        chapter = int(code[-2:])
    if chapter is None:
        for p in parsed_ids:
            if p["chapter"] is not None:
                chapter = p["chapter"]
                break

    if cls is not None and not any(c in index.by_class
                                   for c in (cls - 1, cls, cls + 1)):
        return {"status": "unresolved", "official_node_id": None,
                "confidence": 0.0, "basis": None, "matched_tokens": [],
                "foreign_ids": foreign_ids, "runner_up": None,
                "reason": "class_out_of_corpus"}

    query = build_query(record, index)
    if not query:
        return {"status": "unresolved", "official_node_id": None,
                "confidence": 0.0, "basis": None, "matched_tokens": [],
                "foreign_ids": foreign_ids, "runner_up": None,
                "reason": "no_text"}

    official_codes: Optional[frozenset] = None
    canon = FOREIGN_SUBJECT_TO_CANONICAL.get(str(subj_raw or "").lower())
    if canon is not None:
        official_codes = CANONICAL_TO_OFFICIAL.get(canon, frozenset())
    known_family = bool(official_codes)

    strict = threshold if (known_family and cls_is_structural) else (
        STRICT_THRESHOLD if not known_family else threshold + 0.05)

    candidates = index.candidates(cls, official_codes or None)
    scored = _score_candidates(index, query, candidates, chapter, soft_cls,
                               cls=cls)

    def _unresolved(reason: str) -> Dict[str, Any]:
        return {"status": "unresolved", "official_node_id": None,
                "confidence": round(scored[0][0], 4) if scored else 0.0,
                "basis": None, "matched_tokens": [],
                "foreign_ids": foreign_ids, "runner_up": None,
                "reason": reason}

    if not scored:
        return _unresolved("no_candidate_overlap")
    best_score, best_n, best_node, best_matched = scored[0]
    second_score = scored[1][0] if len(scored) > 1 else 0.0

    if best_n < MIN_MATCHED_TOKENS:
        return _unresolved("insufficient_support")
    # distinctive-anchor requirement: a match must be carried by at least
    # one genuinely rare term, not generic subject vocabulary alone
    if max(index.idf.get(t, 4.0) for t in best_matched) < DISTINCTIVE_ANCHOR_IDF:
        return _unresolved("no_distinctive_anchor")
    if best_score < min(strict, 1.0):
        return _unresolved("below_threshold")
    if best_score - second_score < MARGIN:
        return _unresolved("ambiguous")

    basis = ("subject_chapter_topic"
             if (chapter is not None and known_family) else "title_tokens")
    runner = None
    if len(scored) > 1:
        rs, rn, rnode, rmatch = scored[1]
        runner = {"official_node_id": rnode["node_id"],
                  "confidence": round(rs, 4),
                  "matched_tokens": rmatch[:8]}
    return {"status": "resolved",
            "official_node_id": best_node["node_id"],
            "confidence": round(min(1.0, best_score), 4),
            "basis": basis,
            "matched_tokens": best_matched[:12],
            "foreign_ids": foreign_ids,
            "runner_up": runner,
            "reason": None}


# --------------------------------------------------------------------------
# Batch mapping
# --------------------------------------------------------------------------

def _iter_records(path: Path) -> Iterable[Dict[str, Any]]:
    with open(path, encoding="utf-8") as f:
        if path.suffix.lower() == ".jsonl":
            for line in f:
                line = line.strip()
                if line:
                    yield json.loads(line)
        else:
            data = json.load(f)
            if isinstance(data, dict):
                for v in data.values():
                    if isinstance(v, list):
                        for r in v:
                            yield r
            elif isinstance(data, list):
                for r in data:
                    yield r


def map_file(input_path: str | Path, id_field: Optional[str] = None,
             out_path: str | Path | None = None,
             index: Optional[OfficialIndex] = None,
             limit: Optional[int] = None,
             threshold: float = CONFIDENCE_THRESHOLD) -> Dict[str, Any]:
    """Resolve every record of a foreign file; write JSONL + summary.

    Output rows = the original record plus a ``_remap`` object. A summary
    (resolved %, basis breakdown, unresolved list) is written next to the
    output as ``<out>.summary.json`` and returned.
    """
    t0 = time.time()
    input_path = Path(input_path)
    index = index or get_index()
    if out_path is None:
        out_path = CACHE_DIR / ("remapped_" + input_path.stem + ".jsonl")
    out_path = Path(out_path)
    out_path.parent.mkdir(parents=True, exist_ok=True)

    if id_field is None:
        with open(input_path, encoding="utf-8") as f:
            head = f.read(65536)
        id_field = "node_id" if '"node_id"' in head else "target_nodes"

    stats: Dict[str, Any] = {
        "input_file": str(input_path),
        "output_file": str(out_path),
        "id_field": id_field,
        "corpus_size": len(index.nodes),
        "threshold": threshold,
        "total": 0, "resolved": 0, "unresolved": 0, "unresolved_list": [],
        "by_basis": Counter(), "by_reason": Counter(),
        "by_subject": defaultdict(lambda: Counter()),
    }
    with open(out_path, "w", encoding="utf-8") as out:
        for rec in _iter_records(input_path):
            stats["total"] += 1
            res = resolve(rec, index, id_field, threshold)
            rec["_remap"] = res
            out.write(json.dumps(rec, ensure_ascii=False) + "\n")
            subj = str(rec.get("subject") or "unknown")
            if res["status"] == "resolved":
                stats["resolved"] += 1
                stats["by_basis"][res["basis"]] += 1
                stats["by_subject"][subj]["resolved"] += 1
            else:
                stats["unresolved"] += 1
                stats["by_reason"][res["reason"] or "unknown"] += 1
                stats["by_subject"][subj]["unresolved"] += 1
                if len(stats["unresolved_list"]) < 5000:
                    stats["unresolved_list"].append({
                        "record_id": rec.get("record_id"),
                        "foreign_ids": res["foreign_ids"],
                        "subject": rec.get("subject"),
                        "class_level": rec.get("class_level"),
                        "reason": res["reason"],
                        "top_confidence": res["confidence"],
                    })
            if limit and stats["total"] >= limit:
                break

    total = stats["total"] or 1
    summary = {
        "input_file": stats["input_file"],
        "output_file": stats["output_file"],
        "id_field": stats["id_field"],
        "corpus_size": stats["corpus_size"],
        "threshold": stats["threshold"],
        "total": stats["total"],
        "resolved": stats["resolved"],
        "unresolved": stats["unresolved"],
        "resolved_pct": round(100.0 * stats["resolved"] / total, 2),
        "unresolved_pct": round(100.0 * stats["unresolved"] / total, 2),
        "by_basis": dict(stats["by_basis"]),
        "by_reason": dict(stats["by_reason"]),
        "by_subject": {k: dict(v) for k, v in sorted(stats["by_subject"].items())},
        "unresolved_list": stats["unresolved_list"][:100],
        "duration_sec": round(time.time() - t0, 2),
    }
    summary_path = Path(str(out_path) + ".summary.json")
    with open(summary_path, "w", encoding="utf-8") as f:
        json.dump(summary, f, ensure_ascii=False, indent=1)
    return summary


# --------------------------------------------------------------------------
# Read-only API surface: GET /api/nodes/remap/stats
# --------------------------------------------------------------------------

from fastapi import APIRouter  # noqa: E402  (kept late so CLI use stays lean)

router = APIRouter(prefix="/api/nodes/remap", tags=["id-remapping"])


@router.get("/stats")
def remap_stats() -> Dict[str, Any]:
    """Read-only progress report: committed remap summaries per source file."""
    sources: Dict[str, Any] = {}
    if CACHE_DIR.exists():
        for sp in sorted(CACHE_DIR.glob("remapped_*.jsonl.summary.json")):
            try:
                with open(sp, encoding="utf-8") as f:
                    s = json.load(f)
                s["_summary_file"] = sp.name
                sources[sp.name[len("remapped_"):-len(".jsonl.summary.json")]] = s
            except Exception as exc:  # unreadable summary must not 500 the app
                sources[sp.name] = {"error": str(exc)}
    corpus_ok = DEFAULT_INDEX.exists()
    return {
        "corpus": {
            "index": str(DEFAULT_INDEX),
            "available": corpus_ok,
            "nodes": len(get_index().nodes) if corpus_ok else None,
        },
        "threshold": CONFIDENCE_THRESHOLD,
        "bases": ["exact_id", "title_tokens", "subject_chapter_topic"],
        "sources": sources,
    }


# --------------------------------------------------------------------------
# CLI
# --------------------------------------------------------------------------

def _main(argv: Optional[List[str]] = None) -> int:
    ap = argparse.ArgumentParser(
        prog="python -m backend.services.id_remapping",
        description="Resolve foreign/legacy ids onto the official node corpus.")
    ap.add_argument("file", help="input .jsonl or .json file")
    ap.add_argument("id_field", nargs="?", default=None,
                    help="field holding the foreign id (default: auto-detect)")
    ap.add_argument("--out", default=None, help="output .jsonl path")
    ap.add_argument("--index", default=None, help="official nodes index path")
    ap.add_argument("--limit", type=int, default=None,
                    help="only map the first N records (smoke runs)")
    ap.add_argument("--threshold", type=float, default=CONFIDENCE_THRESHOLD)
    args = ap.parse_args(argv)

    index = get_index(Path(args.index)) if args.index else get_index()
    print(f"[id_remapping] corpus: {len(index.nodes)} official nodes "
          f"from {index.index_path}", file=sys.stderr)
    summary = map_file(args.file, args.id_field, args.out, index,
                       limit=args.limit, threshold=args.threshold)
    print(f"[id_remapping] {summary['total']} records -> "
          f"{summary['resolved']} resolved ({summary['resolved_pct']}%), "
          f"{summary['unresolved']} unresolved "
          f"({summary['unresolved_pct']}%) in {summary['duration_sec']}s")
    print(f"  by basis : {summary['by_basis']}")
    print(f"  by reason: {summary['by_reason']}")
    print(f"  output   : {summary['output_file']}")
    print(f"  summary  : {summary['output_file']}.summary.json")
    return 0


if __name__ == "__main__":
    raise SystemExit(_main())
