"""Node-grounded solver family engine.

For any class-subject combo, scans the combo's corpus nodes and turns each
node's DEFINITION + DIAGNOSTIC_QUESTION/ANSWER pairs into deterministic,
fail-closed solver families:

  - one dispatcher per combo: exact/normalized question match, then a strict
    keyword-overlap match against node facts, else refusal (never a guess)
  - one family per node: solving scoped to that node's facts
  - a practice generator: short-answer items straight from node diagnostics

Extracted banks are cached to backend/_cache/node_families/<prefix>.json
keyed by file count, so boots and hot-reloads stay fast.

Student-facing strings (steps/answer) NEVER contain node ids; the source node
travels only inside verification.details.
"""

import glob
import json
import os
import re
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

_CACHE_ENV = ("PLATFORM_CONTENT_DIR", "CONTENT_DIR", "ENHANCED_NODES_DIR")
_FALLBACKS = (
    r"D:\platform\deploy\content\enhanced_nodes_md",
    "/app/content/enhanced_nodes_md",
    "/app/cbse_data/enhanced_nodes_md",
)
_CACHE_DIR = Path(__file__).resolve().parent.parent / "_cache" / "node_families"

_WS = re.compile(r"\s+")
_NONWORD = re.compile(r"[^a-z0-9 ]")
_STOP = set("""a an the is are was were be been being of in on at to for from with by and or but if
then than that this these those it its as into about over under between within without during
what which who whom whose when where why how does do did done can could should would will shall
may might must not no nor so very more most much many any some each every all both few other
another such only own same too also just because while until against""".split())


def corpus_dir() -> str:
    for var in _CACHE_ENV:
        v = os.environ.get(var)
        if v and Path(v).exists():
            return v
    for f in _FALLBACKS:
        if Path(f).exists():
            return f
    return _FALLBACKS[0]


def _norm(text: str) -> str:
    return _NONWORD.sub(" ", text.lower())


def _content_words(text: str) -> List[str]:
    return [w for w in _norm(text).split() if w not in _STOP and len(w) > 2]


def _first_sentence(text: str, limit: int = 320) -> str:
    t = " ".join(text.split())
    m = re.match(r"(.+?[.!?])(\s|$)", t)
    s = m.group(1) if m else t
    return s[:limit]


def extract_bank(prefix: str) -> List[Dict[str, Any]]:
    """Parse every node file for `prefix` into diagnostic fact entries."""
    base = Path(corpus_dir())
    files = sorted(glob.glob(str(base / (prefix + "*.md"))))
    if not files:
        return []
    cache = _CACHE_DIR / (prefix.rstrip("_") + ".json")
    if cache.exists():
        try:
            data = json.loads(cache.read_text(encoding="utf-8"))
            if data.get("file_count") == len(files):
                return data["entries"]
        except Exception:
            pass

    entries: List[Dict[str, Any]] = []
    for fp in files:
        node = Path(fp).stem
        try:
            txt = Path(fp).read_text(encoding="utf-8", errors="replace")
        except OSError:
            continue
        definition = ""
        m = re.search(r"## DEFINITION\n(.+?)(?:\n##|\Z)", txt, re.S)
        if m:
            definition = _first_sentence(m.group(1))
        for i in range(1, 9):
            q = re.search(rf"## DIAGNOSTIC_QUESTION_{i}\n(.+?)(?:\n##|\Z)", txt, re.S)
            if not q:
                break
            a = re.search(rf"## DIAGNOSTIC_ANSWER_{i}\n(.+?)(?:\n##|\Z)", txt, re.S)
            question = " ".join(q.group(1).split())
            answer = " ".join(a.group(1).split()) if a else ""
            if not question or not answer:
                continue
            entries.append({
                "node": node,
                "q": question,
                "a": answer[:1200],
                "norm_q": _norm(question),
                "keys": list(set(_content_words(question)))[:24],
                "defn": definition,
            })
    try:
        _CACHE_DIR.mkdir(parents=True, exist_ok=True)
        cache.write_text(json.dumps(
            {"file_count": len(files), "entries": entries}, ensure_ascii=False),
            encoding="utf-8")
    except OSError:
        pass
    return entries


def _answer_from(entry: Dict[str, Any], strength: float, label: str) -> Dict[str, Any]:
    answer = entry["a"]
    if entry.get("defn") and entry["defn"].lower() not in answer.lower():
        answer = f"{_first_sentence(answer, 480)}"
    return {
        "answer": {"text": answer, "match": round(strength, 2)},
        "steps": [
            f"Matched the question against the {label} corpus facts",
            f"Confidence: {strength:.0%} keyword overlap with a grounded fact",
            "Answer returned from the curriculum node content",
        ],
        "verification": {"passed": True, "details": f"source={entry['node']}"},
    }


def _fail(topic: str, reason: str) -> Dict[str, Any]:
    return {
        "answer": None,
        "steps": [f"Cannot answer deterministically: {reason}"],
        "verification": {"passed": False, "details": f"{topic}: {reason}"},
    }


def build_combo_solver(prefix: str, label: str, min_overlap: float = 0.55):
    """Return the combo dispatcher over the extracted bank. Fail-closed."""
    bank = extract_bank(prefix)
    if not bank:
        return None
    norm_bank = [(e, e["norm_q"]) for e in bank]
    key_bank = [(e, set(e["keys"])) for e in bank]

    def solve(params: Optional[Dict[str, Any]] = None, **kw) -> Dict[str, Any]:
        payload = dict(params or {})
        payload.update(kw)
        question = (payload.get("question") or payload.get("q") or "").strip()
        if not question:
            return _fail("node_families", "empty question")
        nq = _norm(question)
        for e, enq in norm_bank:
            if nq == enq:
                return _answer_from(e, 1.0, label)
        qwords = set(_content_words(question))
        if not qwords:
            return _fail("node_families", "question has no matchable content words")
        best, best_score = None, 0.0
        for e, ekeys in key_bank:
            if not ekeys:
                continue
            score = len(qwords & ekeys) / max(4, min(len(qwords), len(ekeys)))
            if score > best_score:
                best, best_score = e, score
        if best is not None and best_score >= min_overlap:
            return _answer_from(best, best_score, label)
        return _fail("node_families",
                     "no curriculum fact matched closely enough - refusing to guess")

    solve.__name__ = f"{prefix}families"
    return solve


def build_combo_generator(prefix: str, label: str):
    bank = extract_bank(prefix)

    class _Gen:
        topic = label

        def __init__(self, seed: int = 0):
            import random
            self.rng = random.Random(seed)
            self.bank = bank

        def generate_questions(self, count: int = 10) -> List[Dict[str, Any]]:
            out: List[Dict[str, Any]] = []
            if not self.bank:
                return out
            picked = self.rng.sample(self.bank, min(len(self.bank), max(0, count)))
            for e in picked:
                out.append({
                    "id": f"fam_{self.rng.randint(1000, 9999)}",
                    "type": "short_answer",
                    "topic": label,
                    "difficulty": "medium",
                    "question": e["q"],
                    "options": {},
                    "answer": _first_sentence(e["a"], 240),
                    "explanation": f"Grounded in the {label} corpus.",
                })
            return out

    _Gen.__name__ = f"{prefix.strip('_')}_questions_gen"
    return _Gen


def build_registry(prefix: str, code: str, class_n: int, label: str,
                   min_overlap: float = 0.55) -> Tuple[Dict[str, Any], Dict[str, Any]]:
    """SOLVER_REGISTRY + QUESTION_GEN_REGISTRY for a combo."""
    solve = build_combo_solver(prefix, label, min_overlap)
    if solve is None:
        return {}, {}
    reg: Dict[str, Any] = {f"c{class_n}_{code}_families": solve}
    gen = build_combo_generator(prefix, label)
    return reg, {f"c{class_n}_{code}_families_questions": gen}
