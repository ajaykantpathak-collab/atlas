"""mining_sweep_findings.py -- Synthesis-mining PRE-RUN (BUILD_ORDER Phase 6, line 1).

Mines the ALREADY-EXISTING sweep + telemetry data to pre-seed the candidate
list of "top-5 families the miss-queue names" BEFORE the 14-day test starts
producing its live miss-queue.

Inputs (all read-only; the sweep is RUNNING so findings grows — this script
records the snapshot offset in its checkpoint and every report states the
row count it saw):

  1. runtime_data/ops/sweep2_findings.jsonl
        one JSON line per board_questions row the full-bank sweep answered:
        {i, qid, subject, class, qtype, cls, label, ans, stored, ms, err}
        cls in {EXACT_HIT, SOFT_HIT, VERIFIED_NOKEY, GUIDED, AMBIGUOUS,
                SLOW_GUIDED, ERROR, REFUSED}
        -> every non-EXACT_HIT row is a miss candidate.
  2. runtime_data/answer_queue.jsonl
        the LIVE platform miss queue (answer_pipeline._queue_miss rows:
        {ts, question, lane, label, refusal_reason, route}) -- real
        student-facing misses, used to corroborate + label families.
  3. runtime_data/ops/sweep2_datadir/answer_queue.jsonl
        the sweep's own isolated miss queue (same shape) -- supplies the
        refusal_reason for sweep GUIDED rows by question-text join.
  4. runtime_data/ops/answer_telemetry.jsonl
        answer_telemetry rows {ts, surface, subject, class, label,
        llm_used, refusal_reason, latency_ms, lane, correct, replay}.

Question text for miss qids comes from Postgres board_questions (read-only
SELECT by id — same table sweep_full_runner.fetch_rows() reads).

Mining method
  * skeleton: reuse the serve-time normalize_skeleton from
    backend/its/solver/semantic_qa.py (loaded directly by file path so no
    package __init__ side effects run) — numbers -> typed placeholders.
  * cluster GUIDED/REFUSED/ERROR/SLOW_GUIDED/SOFT_HIT rows by
    (subject, skeleton token-set) with deterministic leader clustering
    (Jaccard >= 0.30 against the family's core token set).
  * family name = top discriminative keywords + placeholder signature.
  * why_it_misses derived from label + joined refusal_reason.
  * top-5 synthesis picks = miss_count x feasibility (numeric-computable
    shapes rank above fuzzy prose).

Checkpoint/resume: _mining_ckpt.json (stage flags keyed on input size+line
count; miss rows + fetched texts cached so a re-run only redoes changed
stages).  Outputs: mining_top_families.json / mining_top_families.md.

NO LLM calls, NO Docker, streaming reads only (whole files are < 2 MB).
"""

from __future__ import annotations

import importlib.util
import json
import os
import re
import sys
import time
from collections import Counter, defaultdict

REPO = r"D:\platform\deploy"
TESTS = os.path.join(REPO, "backend", "tests")
RUNTIME = r"D:\platform\runtime_data"
OPS = os.path.join(RUNTIME, "ops")

FINDINGS = os.path.join(OPS, "sweep2_findings.jsonl")
LIVE_QUEUE = os.path.join(RUNTIME, "answer_queue.jsonl")
SWEEP_QUEUE = os.path.join(OPS, "sweep2_datadir", "answer_queue.jsonl")
TELEMETRY = os.path.join(OPS, "answer_telemetry.jsonl")

OUT_JSON = os.path.join(TESTS, "mining_top_families.json")
OUT_MD = os.path.join(TESTS, "mining_top_families.md")
CKPT = os.path.join(TESTS, "_mining_ckpt.json")

HIT = "EXACT_HIT"
JACCARD_T = 0.30          # leader-clustering admission threshold
TEXT_SNIPPET = 500        # chars of question text kept in the checkpoint
BANK_ROWS_TOTAL = 253_456  # board_questions total (AGENTS.md, 2026-10-04)

SUBJECT_NAMES = {
    "maths": "Mathematics", "applied_maths": "Applied Maths", "physics": "Physics",
    "chemistry": "Chemistry", "biology": "Biology", "computer_science": "Computer Science",
    "english": "English", "history": "History", "civics": "Civics",
    "geography": "Geography", "economics": "Economics", "accountancy": "Accountancy",
    "business_studies": "Business Studies", "biotech": "Biotechnology",
    "psychology": "Psychology", "legal_studies": "Legal Studies", "sociology": "Sociology",
    "evs": "EVS", "hindi": "Hindi", "home_science": "Home Science",
    "statistics": "Statistics", "commerce_apps": "Commerce (Apps)",
    "commerce_studies": "Commerce (Studies)", "mass_media": "Mass Media",
    "economics_apps": "Economics (Apps)", "physical_ed": "Physical Education",
    "pol_sci": "Political Science", "sanskrit": "Sanskrit", "urdu": "Urdu",
    "political_science": "Political Science", "pe": "Physical Education",
    "grammar": "Grammar", "commercial_applications": "Commercial Applications",
    "science": "Science", "unknown": "(unmapped code)",
    "physical_ed": "Physical Education", "accounts": "Accountancy",
    "entre": "Entrepreneurship",
    "entrepreneurship": "Entrepreneurship", "fine_arts": "Fine Arts", "painting": "Fine Arts",
    "music": "Music", "dance": "Dance", "philosophy": "Philosophy",
    "anthropology": "Anthropology", "engineering_graphics": "Engineering Graphics",
    "eg": "Engineering Graphics", "kinth": "Knowledge Traditions",
    "kt": "Knowledge Traditions", "human_rights": "Human Rights",
}

NUMERIC_SUBJECTS = {
    "maths", "applied_maths", "physics", "chemistry", "accountancy",
    "economics", "statistics", "computer_science",
}

STOPWORDS = frozenset("""
a an the of in on for to and or is are was were be been being this that these those
it its as at by with from into if then than so such not no nor but do does did done
has have had having can could may might must shall should will would there their
they them he she his her him you your we our us i me my mine what which who whom
whose when where why how all any both each few more most other some only own same
too very just also about above after again against because before below between
during few further here once other out over under up down off out very s t d ll re
ve ain aren couldn didn doesn hadn hasn haven isn ma mightn mustn needn shan shouldn
wasn weren won wouldn using use used give given gives find find write state states
explain following follow following question questions answer answers value values
""".split())

# --------------------------------------------------------------------------- #
# small utils
# --------------------------------------------------------------------------- #


def load_semantic_qa():
    """Import semantic_qa.py directly by file path (no package __init__)."""
    path = os.path.join(REPO, "backend", "its", "solver", "semantic_qa.py")
    spec = importlib.util.spec_from_file_location("semantic_qa_miner", path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def load_build_corpus_norm():
    """Reuse build_corpus.py's _SUBJECT_NORM/_TYPE_NORM (file-path import)."""
    path = os.path.join(REPO, "backend", "training", "build_corpus.py")
    try:
        spec = importlib.util.spec_from_file_location("build_corpus_miner", path)
        mod = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(mod)
        return mod._SUBJECT_NORM
    except Exception:
        return {}


_SQA = None
_SUBJ_TABLE = {}


def norm_subject(code: str) -> str:
    c = (code or "").strip().lower()
    if not _SUBJ_TABLE:
        _SUBJ_TABLE.update(load_build_corpus_norm())
        # codes present in board_questions that build_corpus's table lacks
        _SUBJ_TABLE.update({
            "gram": "grammar", "ca": "commercial_applications",
            "science": "science", "mathematics": "maths",
        })
    return _SUBJ_TABLE.get(c, c or "unknown")


def subj_display(code: str) -> str:
    return SUBJECT_NAMES.get(code, code.replace("_", " ").title())


def scrub(text: str, limit: int = 120) -> str:
    """Scrub a student-facing example: no node ids, no ids/hashes, <= limit."""
    if not text:
        return ""
    t = re.sub(r"\bc\d{1,2}_[a-z]{2,5}_(?:cbse|icse|isc|comp)\S*", " ", text)
    t = re.sub(r"\b[0-9a-f]{12,}\b", " ", t, flags=re.I)
    t = re.sub(r"\b\w{25,}\b", " ", t)               # ids / glued tokens
    t = re.sub(r"https?://\S+", " ", t)
    t = re.sub(r"\s+", " ", t).strip()
    if len(t) > limit:
        t = t[:limit].rsplit(" ", 1)[0].rstrip(",;:.") + "…"
    return t


def norm_q(text: str) -> str:
    """Aggressive normalization for question-text joins across sources."""
    t = (text or "").lower()
    t = re.sub(r"<[^>]+>", " ", t)                    # strip tags/think blocks
    t = re.sub(r"[^a-z0-9]+", " ", t)
    return " ".join(t.split())[:160]


def jaccard(a: frozenset, b: frozenset) -> float:
    if not a or not b:
        return 0.0
    inter = len(a & b)
    return inter / (len(a) + len(b) - inter)


def skeleton_tokens(skeleton: str) -> frozenset:
    toks = set()
    for tok in re.findall(r"<[A-Za-z:]+>|[a-z]+", skeleton):
        if tok.startswith("<"):
            toks.add(tok)
        elif len(tok) >= 3 and tok not in STOPWORDS:
            toks.add(tok)
    return frozenset(toks)


def placeholder_sig(skeleton: str) -> str:
    ph = re.findall(r"<[A-Za-z:]+>", skeleton)
    if not ph:
        return "no-numeric-slots"
    counts = Counter(ph)
    return "+".join(f"{k}x{v}" if v > 1 else k for k, v in sorted(counts.items()))


# --------------------------------------------------------------------------- #
# checkpoint
# --------------------------------------------------------------------------- #


def load_ckpt() -> dict:
    if os.path.exists(CKPT):
        try:
            with open(CKPT, encoding="utf-8") as fh:
                return json.load(fh)
        except Exception:
            pass
    return {"stages": {}}


def save_ckpt(ckpt: dict) -> None:
    tmp = CKPT + ".tmp"
    with open(tmp, "w", encoding="utf-8") as fh:
        json.dump(ckpt, fh, ensure_ascii=False)
    os.replace(tmp, CKPT)


def stage_done(ckpt: dict, name: str, size_key: dict) -> bool:
    st = ckpt["stages"].get(name)
    return bool(st and st.get("inputs") == size_key)


# --------------------------------------------------------------------------- #
# stage 1: sweep findings
# --------------------------------------------------------------------------- #


def read_findings(ckpt: dict) -> dict:
    size = os.path.getsize(FINDINGS)
    with open(FINDINGS, encoding="utf-8") as fh:
        lines = fh.readlines()
    n = len(lines)
    key = {"size": size, "lines": n}
    st = ckpt["stages"].get("findings")
    if st and st.get("inputs") == key and "misses" in st:
        print(f"[findings] cached snapshot: {n} lines")
        return {"counts": st["counts"], "misses": st["misses"],
                "offset": n, "size": size}

    counts = Counter()
    misses = []
    for ln in lines:
        ln = ln.strip()
        if not ln:
            continue
        try:
            row = json.loads(ln)
        except Exception:
            continue
        cls = row.get("cls", "?")
        counts[cls] += 1
        if cls != HIT:
            misses.append({
                "qid": row.get("qid"), "subject": norm_subject(row.get("subject")),
                "cls": cls, "label": row.get("label") or "",
                "class": row.get("class"), "qtype": row.get("qtype") or "",
                "ms": row.get("ms"), "err": (row.get("err") or "")[:200],
                "ans_head": (row.get("ans") or "")[:160],
                "stored_head": (row.get("stored") or "")[:160],
            })
    print(f"[findings] read {n} lines: {dict(counts)} ({len(misses)} misses)")
    ckpt["stages"]["findings"] = {"inputs": key, "counts": dict(counts),
                                  "misses": misses}
    save_ckpt(ckpt)
    return {"counts": counts, "misses": misses, "offset": n, "size": size}


# --------------------------------------------------------------------------- #
# stage 2: question text from Postgres
# --------------------------------------------------------------------------- #


def pg_password() -> str:
    env = os.path.join(REPO, ".env")
    with open(env, encoding="utf-8") as fh:
        for line in fh:
            if line.startswith("POSTGRES_PASSWORD="):
                return line.strip().split("=", 1)[1]
    raise RuntimeError("POSTGRES_PASSWORD not found in deploy/.env")


def bank_template_count() -> int:
    """How many bank rows are the generic mastery-criteria template row.
    One cheap LIKE count; a read-only context number for the report."""
    try:
        import psycopg2
        con = psycopg2.connect(host="127.0.0.1", port=5432, dbname="dream_app",
                               user="dream_user", password=pg_password())
        cur = con.cursor()
        cur.execute("SELECT count(*) FROM board_questions "
                    "WHERE question_text LIKE '%master this topic%'")
        n = cur.fetchone()[0]
        con.close()
        return n
    except Exception as exc:  # context number only — never fail the report
        print(f"[template-count] skipped: {exc}")
        return -1


def fetch_texts(ckpt: dict, misses: list) -> dict:
    need = [m["qid"] for m in misses if m["qid"]]
    key = {"qids": len(need)}
    st = ckpt["stages"].get("texts")
    if st and st.get("inputs") == key and st.get("texts") is not None:
        print(f"[texts] cached: {len(st['texts'])} fetched")
        return st["texts"]

    import psycopg2
    texts = {}
    con = psycopg2.connect(host="127.0.0.1", port=5432, dbname="dream_app",
                           user="dream_user", password=pg_password())
    cur = con.cursor()
    for i in range(0, len(need), 400):
        chunk = need[i:i + 400]
        cur.execute("SELECT id::text, question_text FROM board_questions "
                    "WHERE id::text = ANY(%s)", (chunk,))
        for qid, txt in cur.fetchall():
            texts[qid] = (txt or "")[:TEXT_SNIPPET]
    con.close()
    print(f"[texts] fetched {len(texts)}/{len(need)} question texts")
    ckpt["stages"]["texts"] = {"inputs": key, "texts": texts}
    save_ckpt(ckpt)
    return texts


# --------------------------------------------------------------------------- #
# stage 3: queues + telemetry
# --------------------------------------------------------------------------- #


def read_queue(path: str, cap: int = 50_000) -> list:
    out = []
    if not os.path.exists(path):
        return out
    with open(path, encoding="utf-8", errors="replace") as fh:
        for ln in fh:
            ln = ln.strip()
            if not ln:
                continue
            try:
                row = json.loads(ln)
            except Exception:
                continue
            out.append({
                "question": row.get("question") or "",
                "q_norm": norm_q(row.get("question") or ""),
                "lane": row.get("lane") or "?",
                "label": row.get("label") or "?",
                "refusal_reason": (row.get("refusal_reason") or "")[:240],
                "route": row.get("route") or [],
            })
            if len(out) >= cap:
                break
    return out


def read_telemetry() -> dict:
    labels = Counter()
    subj_labels = Counter()
    refusals = Counter()
    incorrect = Counter()
    llm_rows = 0
    n = 0
    if not os.path.exists(TELEMETRY):
        return {"n": 0, "labels": {}, "subj_labels": {}, "refusals": {},
                "incorrect": {}, "llm_rows": 0}
    with open(TELEMETRY, encoding="utf-8") as fh:
        for ln in fh:
            ln = ln.strip()
            if not ln:
                continue
            try:
                r = json.loads(ln)
            except Exception:
                continue
            n += 1
            lab = r.get("label") or "?"
            labels[lab] += 1
            sub = r.get("subject")
            if sub:
                subj_labels[(norm_subject(sub), lab)] += 1
            rr = r.get("refusal_reason")
            if rr:
                refusals[rr[:120]] += 1
            if r.get("correct") is False:
                incorrect[norm_subject(sub or "?")] += 1
            if r.get("llm_used"):
                llm_rows += 1
    return {"n": n, "labels": dict(labels),
            "subj_labels": {f"{k[0]}|{k[1]}": v for k, v in subj_labels.items()},
            "refusals": dict(refusals.most_common(12)),
            "incorrect": dict(incorrect), "llm_rows": llm_rows}


# --------------------------------------------------------------------------- #
# stage 4: clustering
# --------------------------------------------------------------------------- #

WHY_BY_REASON = [
    (re.compile(r"no canonical structure", re.I),
     "modeling layer has no canonical structure rule for this pattern — new family rule needed"),
    (re.compile(r"variable binding|lane c", re.I),
     "needs the variable-binding lane (prose → equation mapping) that is not deterministic yet"),
    (re.compile(r"not computational|conceptual", re.I),
     "conceptual/prose question outside the deterministic solver's computational scope"),
    (re.compile(r"ambigu", re.I),
     "honest ambiguity refusal — the question wording admits multiple readings"),
    (re.compile(r"timeout", re.I),
     "answer() exceeded the per-question time budget"),
]


def why_for(miss: dict, refusal: str, text: str, skeleton: str) -> str:
    lab = (miss.get("label") or "").upper()
    cls = miss.get("cls")
    if cls == "SLOW_GUIDED":
        return ("answer() exceeded the 12s sweep budget (production allows 60s) — "
                "heavy lane; often solvable, needs path pruning/caching")
    if cls == "ERROR":
        return f"crash in the pipeline: {scrub(miss.get('err') or 'unknown', 100)}"
    if cls == "SOFT_HIT":
        return ("VERIFIED but served text differs from the stored key beyond "
                "normalization — answer-form/key mismatch, needs key alignment not synthesis")
    if cls == "VERIFIED_NOKEY":
        return "verified path fired but the bank row carries no stored key to compare"
    # GUIDED / AMBIGUOUS / REFUSED
    for rx, why in WHY_BY_REASON:
        if refusal and rx.search(refusal):
            return why
    if refusal:
        return f"refusal reason: {scrub(refusal, 110)}"
    # no refusal text — infer from shape
    if "<" in skeleton:
        return ("GUIDED with no recorded reason; question carries numeric slots — "
                "likely a missing canonical-structure rule for this numeric shape")
    return ("GUIDED with no recorded reason; prose/conceptual shape — likely "
            "outside deterministic scope")


def cluster_subject(rows: list) -> list:
    """Deterministic leader clustering within one subject.

    rows: [{tokens, skeleton, ...}] sorted deterministically before call.
    Family core = tokens present in >=40% of members (incremental Counters).
    """
    families = []           # each: {"members": [...], "tok_count": Counter, "core": set}
    for row in rows:
        best, best_j = None, 0.0
        for fam in families:
            core = fam["core"]
            j = jaccard(row["tokens"], frozenset(core))
            if j > best_j:
                best, best_j = fam, j
        if best is not None and best_j >= JACCARD_T:
            best["members"].append(row)
            best["tok_count"].update(row["tokens"])
        else:
            families.append({"members": [row], "tok_count": Counter(row["tokens"])})
        # refresh core for the touched family
        fam = best if best is not None and best_j >= JACCARD_T else families[-1]
        n = len(fam["members"])
        fam["core"] = {t for t, c in fam["tok_count"].items() if c >= max(1, 0.4 * n)}
    return families


def name_family(fam: dict) -> tuple:
    """(family_name, keywords, placeholder_sig)."""
    n = len(fam["members"])
    kw = [t for t, c in fam["tok_count"].most_common(24)
          if not t.startswith("<")][:3]
    sig = placeholder_sig(fam["members"][0]["skeleton"])
    sigs = Counter(placeholder_sig(m["skeleton"]) for m in fam["members"])
    sig = sigs.most_common(1)[0][0]
    name = "/".join(kw) if kw else sig
    return name, kw, sig


def feasibility(fam: dict) -> int:
    """Higher = better synthesis candidate (numeric-computable > fuzzy prose)."""
    members = fam["members"]
    score = 0
    slots = sum(len(re.findall(r"<[A-Za-z:]+>", m["skeleton"])) for m in members)
    if slots:
        score += 2
    subj = members[0]["subject"]
    if subj in NUMERIC_SUBJECTS:
        score += 2
    avg_words = sum(len(m["tokens"]) for m in members) / len(members)
    if avg_words <= 30:
        score += 1
    labs = Counter(m["cls"] for m in members)
    if labs.get("SLOW_GUIDED"):
        score += 1          # may just need the 60s production budget
    if labs.get("SOFT_HIT") and not labs.get("GUIDED"):
        score -= 2          # key alignment, not synthesis
    return score


TRUE_MISS_CLASSES = {"GUIDED", "SLOW_GUIDED", "ERROR", "REFUSED", "AMBIGUOUS"}
TRUE_MISS_LABELS = ("GUIDED", "TIMEOUT", "ERROR", "REFUSED", "AMBIGUOUS")


def dominant_true_miss(members: list) -> bool:
    """Family counts as a synthesis candidate only if GUIDED/TIMEOUT/ERROR
    rows dominate (SOFT_HIT = key-alignment review work, not solver misses)."""
    n_true = sum(1 for m in members if m["cls"] in TRUE_MISS_CLASSES)
    return n_true >= max(1, len(members) // 2)


def build_families(misses: list, texts: dict, refusal_by_q: dict) -> tuple:
    for m in misses:
        text = texts.get(m["qid"]) or m.get("stored_head") or m.get("ans_head") or ""
        m["text"] = text
        try:
            sk, slots = _SQA.normalize_skeleton(text[:2000])
        except Exception:
            sk, slots = norm_q(text)[:400], []
        m["skeleton"] = sk
        m["tokens"] = skeleton_tokens(sk)
        m["refusal"] = refusal_by_q.get(norm_q(text), "")
        m["why"] = why_for(m, m["refusal"], text, sk)

    # -- cross-subject template detection: identical normalized question text
    #    spanning >=3 subjects is a bank template (e.g. the 8k-row mastery
    #    criteria rows), not a solver gap -- collapse to one family.
    by_text = defaultdict(list)
    for m in misses:
        if len(norm_q(m["text"])) >= 12:
            by_text[norm_q(m["text"])].append(m)
    template_rows, covered = [], set()
    for qt, group in by_text.items():
        subs = {m["subject"] for m in group}
        if len(group) >= 5 and len(subs) >= 3:
            template_rows.append(group)
            covered.update(id(m) for m in group)

    by_subj = defaultdict(list)
    for m in misses:
        if id(m) in covered:
            continue
        by_subj[m["subject"]].append(m)

    n_miss = len(misses)
    fams = []
    for subj in sorted(by_subj):
        rows = sorted(by_subj[subj], key=lambda r: (r["cls"], r["skeleton"]))
        for fam in cluster_subject(rows):
            if len(fam["members"]) < 2:
                continue            # singletons are not families
            name, kw, sig = name_family(fam)
            members = fam["members"]
            classes = sorted({int(m["class"]) for m in members
                              if isinstance(m["class"], int)})
            fams.append({
                "family_name": f"{subj_display(subj)}: {name} [{sig}]",
                "subject": subj,
                "subject_display": subj_display(subj),
                "cross_subject": False,
                "class_range": (f"{classes[0]}-{classes[-1]}"
                                if classes else str(members[0].get("class"))),
                "miss_count": len(members),
                "miss_share_pct": round(100.0 * len(members) / max(1, n_miss), 1),
                "label_mix": dict(Counter(m["cls"] for m in members)),
                "example_question": scrub(members[0]["text"], 120),
                "why_it_misses": Counter(m["why"] for m in members)
                                   .most_common(1)[0][0],
                "feasibility": feasibility(fam),
                "synthesis_candidate": dominant_true_miss(members),
                "top_keywords": kw,
            })

    # cross-subject template families (collapsed)
    for group in template_rows:
        group = sorted(group, key=lambda r: r["subject"])
        classes = sorted({int(m["class"]) for m in group
                          if isinstance(m["class"], int)})
        fams.append({
            "family_name": (f"CROSS-SUBJECT BANK TEMPLATE ({len({m['subject'] for m in group})} "
                            f"subjects): \"{scrub(group[0]['text'], 60)}\""),
            "subject": "multi",
            "subject_display": "Multi-subject",
            "cross_subject": True,
            "class_range": (f"{classes[0]}-{classes[-1]}"
                            if classes else str(group[0].get("class"))),
            "miss_count": len(group),
            "miss_share_pct": round(100.0 * len(group) / max(1, n_miss), 1),
            "label_mix": dict(Counter(m["cls"] for m in group)),
            "example_question": scrub(group[0]["text"], 120),
            "why_it_misses": ("generic template row: the question text is "
                              "topic-independent while the stored key is "
                              "topic-specific — solver cannot match by design "
                              "(bank-row generation artifact, fix = key/skip "
                              "policy, NOT synthesis)"),
            "feasibility": -3,
            "synthesis_candidate": False,
            "top_keywords": [],
        })

    fams.sort(key=lambda f: (-f["miss_count"] * (1 + max(0, f["feasibility"])),
                             -f["miss_count"], f["family_name"]))
    for i, f in enumerate(fams, 1):
        f["rank"] = i
        f["score"] = f["miss_count"] * (1 + max(0, f["feasibility"]))
    return fams, len(covered)


def cluster_live_queue(queue_rows: list) -> list:
    rows = []
    for r in queue_rows:
        text = r["q_norm"]
        if len(text) < 12:
            continue
        try:
            sk, _ = _SQA.normalize_skeleton(text[:2000])
        except Exception:
            sk = text
        rows.append({**r, "skeleton": sk, "tokens": skeleton_tokens(sk),
                     "subject": "?"})
    fams = []
    rows.sort(key=lambda r: r["skeleton"])
    for fam in cluster_subject(rows):
        if len(fam["members"]) < 2:
            continue
        members = fam["members"]
        kw = [t for t, c in fam["tok_count"].most_common(24)
              if not t.startswith("<")][:3]
        reason = Counter(m["refusal_reason"][:100] for m in members).most_common(1)
        fams.append({
            "miss_count": len(members),
            "distinct_questions": len({m["q_norm"] for m in members}),
            "example_question": scrub(members[0]["question"], 120),
            "top_refusal_reason": reason[0][0] if reason else "",
            "keywords": " ".join(kw) or "(no content keywords)",
        })
    fams.sort(key=lambda f: (-f["miss_count"], -f["distinct_questions"]))
    return fams[:12]


# --------------------------------------------------------------------------- #
# main
# --------------------------------------------------------------------------- #


def main() -> int:
    global _SQA
    t0 = time.time()
    _SQA = load_semantic_qa()
    print("[init] semantic_qa loaded (normalize_skeleton reused)")

    ckpt = load_ckpt()

    # ---- stage 1: findings snapshot ---------------------------------------
    snap = read_findings(ckpt)
    counts, misses = snap["counts"], list(snap["misses"])

    # ---- stage 2: texts ----------------------------------------------------
    texts = fetch_texts(ckpt, misses)

    # ---- stage 3: queues + telemetry ---------------------------------------
    tq_key = {"live": os.path.getsize(LIVE_QUEUE) if os.path.exists(LIVE_QUEUE) else 0,
              "sweep": os.path.getsize(SWEEP_QUEUE) if os.path.exists(SWEEP_QUEUE) else 0,
              "telemetry": os.path.getsize(TELEMETRY) if os.path.exists(TELEMETRY) else 0}
    st = ckpt["stages"].get("queues")
    if st and st.get("inputs") == tq_key:
        live_q, sweep_q, tel = st["live"], st["sweep"], st["telemetry"]
        print("[queues] cached")
    else:
        live_q = read_queue(LIVE_QUEUE)
        sweep_q = read_queue(SWEEP_QUEUE)
        tel = read_telemetry()
        ckpt["stages"]["queues"] = {"inputs": tq_key, "live": live_q,
                                    "sweep": sweep_q, "telemetry": tel}
        save_ckpt(ckpt)
    refusal_by_q = {}
    for r in sweep_q + live_q:
        if r["refusal_reason"] and r["q_norm"]:
            refusal_by_q.setdefault(r["q_norm"], r["refusal_reason"])
    print(f"[queues] live={len(live_q)} sweep={len(sweep_q)} "
          f"telemetry={tel['n']} refusal-map={len(refusal_by_q)}")

    # ---- stage 4: cluster ---------------------------------------------------
    fams, n_template_rows = build_families(misses, texts, refusal_by_q)
    live_fams = cluster_live_queue(live_q)

    # bank-scale count of the dominant template row (context for the caveat)
    template_bank = bank_template_count()

    # ---- stage 5: reports ---------------------------------------------------
    total_rows = sum(counts.values())
    # synthesis picks: true-miss families only (GUIDED/TIMEOUT/ERROR dominate),
    # numeric-feasible first — SOFT_HIT + cross-subject template rows excluded.
    candidates = [f for f in fams if f["synthesis_candidate"]]
    candidates.sort(key=lambda f: (-f["score"], -f["miss_count"]))
    top5 = candidates[:5]

    report = {
        "generated": time.strftime("%Y-%m-%d %H:%M:%S"),
        "kind": "synthesis-mining PRE-RUN (partial-bank snapshot)",
        "snapshot": {
            "findings_lines": snap["offset"],
            "findings_bytes": snap["size"],
            "bank_rows_total": BANK_ROWS_TOTAL,
            "coverage_pct": round(100.0 * total_rows / BANK_ROWS_TOTAL, 2),
            "cls_counts": dict(counts),
            "miss_rows": len(misses),
            "template_rows_in_snapshot": n_template_rows,
            "template_rows_in_bank": template_bank,
            "live_queue_rows": len(live_q),
            "sweep_queue_rows": len(sweep_q),
            "telemetry_rows": tel["n"],
        },
        "top15_families": fams[:15],
        "top5_synthesis_picks": top5,
        "live_queue_families": live_fams,
        "telemetry_summary": tel,
    }
    with open(OUT_JSON, "w", encoding="utf-8") as fh:
        json.dump(report, fh, indent=1, ensure_ascii=False)

    write_md(report, fams, live_fams, tel, counts, snap)
    print(f"[done] {len(fams)} families ({len(top5)} picks) -> {OUT_MD} "
          f"({time.time() - t0:.1f}s)")
    return 0


def write_md(report, fams, live_fams, tel, counts, snap) -> None:
    L = []
    L.append("# Synthesis-Mining PRE-RUN — top miss families (BUILD_ORDER Phase 6, line 1)\n")
    L.append(f"Generated: {report['generated']}\n")
    L.append("## Data snapshot (PARTIAL — sweep still running)\n")
    L.append(f"- `sweep2_findings.jsonl`: **{snap['offset']} rows** read "
             f"({report['snapshot']['coverage_pct']}% of the {BANK_ROWS_TOTAL:,}-row "
             f"bank) — full-bank sweep in progress, stratified order.")
    L.append(f"- Live miss queue `runtime_data/answer_queue.jsonl`: "
             f"**{len(live_fams) and report['snapshot']['live_queue_rows']}** rows "
             f"(real student-facing misses).")
    L.append(f"- Sweep's own miss queue (sweep2_datadir): "
             f"**{report['snapshot']['sweep_queue_rows']}** rows (refusal reasons).")
    L.append(f"- `answer_telemetry.jsonl`: **{tel['n']}** rows.\n")
    L.append("> **Honest note:** this is the PRE-test ranking mined from the partial "
             "sweep + live telemetry. The 14-day test will produce the real student "
             "miss-queue and **will re-rank these families**; treat this as a "
             "candidate seed list, not a final priority.\n")

    L.append("## Sweep class distribution (snapshot)\n")
    L.append("| class | rows |")
    L.append("|---|---|")
    for k in ("EXACT_HIT", "SOFT_HIT", "VERIFIED_NOKEY", "GUIDED", "AMBIGUOUS",
              "SLOW_GUIDED", "ERROR", "REFUSED"):
        if counts.get(k):
            L.append(f"| {k} | {counts[k]} |")
    L.append("")

    L.append("## TOP-5 SYNTHESIS PICKS (volume x feasibility)\n")
    L.append("True-miss families only (GUIDED/TIMEOUT/ERROR rows dominate the "
             "cluster); numeric-computable shapes rank above fuzzy prose; "
             "SOFT_HIT-only clusters and cross-subject bank templates are "
             "excluded (key-alignment review work, not synthesis work).\n")
    top5 = report["top5_synthesis_picks"]
    if top5:
        L.append("| pick | family | miss | feas | why it misses | example |")
        L.append("|---|---|---|---|---|---|")
        for i, f in enumerate(top5, 1):
            L.append(f"| **{i}** | {f['family_name']} | {f['miss_count']} | "
                     f"{f['feasibility']} | {f['why_it_misses'][:90]} | "
                     f"{f['example_question'][:80]} |")
    else:
        L.append("(no true-miss family with >=2 rows in this snapshot yet)")
    L.append("")

    L.append("## Top 15 families by miss volume (all non-EXACT_HIT rows)\n")
    L.append("| rank | family | subject | class | miss_count | share | why_it_misses | example_question |")
    L.append("|---|---|---|---|---|---|---|---|")
    for f in fams[:15]:
        L.append(f"| {f['rank']} | {f['family_name']} | {f['subject_display']} | "
                 f"{f['class_range']} | {f['miss_count']} | {f['miss_share_pct']}% | "
                 f"{f['why_it_misses'][:100]} | {f['example_question']} |")
    L.append("")

    L.append("## Live miss-queue corroboration (answer_queue.jsonl, real platform traffic)\n")
    L.append("| count | distinct questions | keywords | example | top refusal reason |")
    L.append("|---|---|---|---|---|")
    for f in live_fams:
        L.append(f"| {f['miss_count']} | {f['distinct_questions']} | {f['keywords']} | "
                 f"{f['example_question']} | {f['top_refusal_reason'][:90]} |")
    L.append("")

    L.append("## answer_telemetry summary\n")
    L.append(f"- rows: {tel['n']}, llm_used rows: {tel['llm_rows']}")
    labs = sorted(tel["labels"].items(), key=lambda kv: -kv[1])
    L.append(f"- labels: {', '.join(f'{k}={v}' for k, v in labs[:10])}")
    if tel["incorrect"]:
        inc = sorted(tel["incorrect"].items(), key=lambda kv: -kv[1])[:8]
        L.append(f"- practice correct=false by subject: "
                 f"{', '.join(f'{k}={v}' for k, v in inc)}")
    if tel["refusals"]:
        L.append("- top refusal reasons:")
        for r, c in list(tel["refusals"].items())[:6]:
            L.append(f"  - {c}x {scrub(r, 110)}")
    L.append("")

    template_bank = report["snapshot"].get("template_rows_in_bank", -1)
    L.append("## Caveats\n")
    L.append("- Snapshot is partial (" + str(snap["offset"]) + " of "
             f"{BANK_ROWS_TOTAL:,} rows); the stratified order means all 47 "
             "subject x class groups are already represented, but small subjects "
             "are under-sampled until the sweep finishes.")
    L.append("- GUIDED findings rows carry no refusal_reason; hypotheses were "
             "joined from the two answer_queue files by normalized question text "
             "— unmatched rows fall back to shape-based inference.")
    L.append("- Cross-subject bank template: the generic mastery-criteria row "
             "(\"What must you be able to do to master this topic?\") appears "
             f"**{template_bank}** times in board_questions — every occurrence "
             "will SOFT_HIT (generic text, topic-specific key). That is a "
             "bank-row/key-alignment issue, deliberately NOT a synthesis pick.")
    L.append("- Subject-code mapping reuses build_corpus._SUBJECT_NORM plus "
             "`gram`→Grammar and `ca`→Commercial Applications (CAS-style "
             "accounting-software content — best-effort identification).")
    L.append("- Clustering threshold Jaccard >= 0.30 on skeleton token sets; "
             "singleton misses are not counted as families.")

    with open(OUT_MD, "w", encoding="utf-8") as fh:
        fh.write("\n".join(L) + "\n")


if __name__ == "__main__":
    sys.exit(main())
