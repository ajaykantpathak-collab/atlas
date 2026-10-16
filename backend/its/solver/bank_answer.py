"""bank_answer.py — deterministic answers FROM THE QUESTION BANK.

The board_questions table holds 250,919 CBSE questions (classes 6-12,
47 subject codes) WITH the board's own answer keys (correct_answer /
model_answer / explanation).  This lane is the pipeline's FIRST pre-route:
when the asked question matches a bank row, the board's own key serves as
VERIFIED_OFFICIAL -- ground truth, no computation, every subject.

Matching ladder (fail-closed):
  1. EXACT normalized-text equality (norm_text column, digits -> '#')
     -- unique row, or all duplicate rows agree on the answer -> serve.
  2. TRIGRAM nearest match with similarity >= BANK_MIN_SIMILARITY
     (default 0.93) AND the same digit-skeleton -- unique or agreeing
     -> serve.
  3. Anything ambiguous (multiple rows, conflicting answers), below
     threshold, or on any DB error/timeout -> None (the pipeline falls
     through to its computed lanes).

The lookup is a SYNC query on a short statement_timeout and must never
raise into the pipeline -- every failure mode degrades to None.  Answer
text is scrubbed of node ids at the boundary (display_scrub).
"""
from __future__ import annotations

import logging
import os
import re
import threading
from concurrent.futures import ThreadPoolExecutor, TimeoutError as FutureTimeout
from typing import Any, Dict, Optional

log = logging.getLogger(__name__)

# normalization identical to the norm_text column (see the repopulation SQL:
# keep letters/digits/combining-marks/space, digits -> '#', collapse
# whitespace, btrim, lowercase, left(600)).  Combining marks (Devanagari
# matras, accents) are kept because postgres [:alnum:] keeps them under the
# UTF-8 server -- python \w alone would strip them and break equality.
import unicodedata as _ud

_NUMS = re.compile(r"[0-9]+(?:\.[0-9]+)?")
_WS = re.compile(r"\s+")
_DIGIT_WORDS = {'0':'zero','1':'one','2':'two','3':'three','4':'four','5':'five','6':'six','7':'seven','8':'eight','9':'nine'}


def _wordify(digits: str) -> str:
    return "".join(_DIGIT_WORDS.get(d, d) for d in digits)


def _pre_normalize(text: str) -> str:
    """Pre-normalize currency, protect exponents and section/standard numbers,
    and canonicalize textbook entity names to prevent slot collisions."""
    t = text or ""
    # 1. Currency canonicalization: ₹, Rs., Rs, INR -> rs (matches the 3867 DB 'rs #' rows)
    t = re.sub(r"(?:\u20b9|inr\b|rs\.?)\s*", "rs ", t, flags=re.I)
    # 2. Protect exponents: x^2, x^3, y^2, (a+b)^2 by wordifying power so _NUMS never collapses to '#'
    t = re.sub(r"(\b[a-zA-Z]|\))\s*\^\s*(\d+)", lambda m: m.group(1) + "pow" + _wordify(m.group(2)), t)
    # 3. Protect Accounting Standards & Legal Sections: AS-2, AS-3, Section 80C
    t = re.sub(r"\bAS\s*-\s*(\d+)\b", lambda m: "asstd" + _wordify(m.group(1)), t, flags=re.I)
    t = re.sub(r"\bSection\s+(\d+[a-zA-Z]?)\b", lambda m: "sec" + _wordify(m.group(1)), t, flags=re.I)
    # 4. Canonicalize entity pairs in partnership/commercial questions ("A and B", "Ram and Shyam")
    t = re.sub(r"\b([A-Z][a-zA-Z]*)\s+and\s+([A-Z][a-zA-Z]*)\s+(?=are\s+partners|started\s+a\s+business|entered\s+into\s+partnership)", "entityone and entitytwo ", t, flags=re.I)
    return t


def _keep(ch: str) -> bool:
    return ch.isalnum() or ch.isspace() or _ud.category(ch).startswith("M")


def normalize(text: str) -> str:
    pre = _pre_normalize(text)
    t = "".join(c if _keep(c) else " " for c in pre)
    t = _NUMS.sub("#", t)
    return _WS.sub(" ", t).strip().lower()[:600]


# digit skeleton: numbers kept, words dropped -- guards near-duplicates that
# normalize alike but differ numerically ("2x=6" vs "3x=6")
_SKELETON = re.compile(r"[0-9]+(?:\.[0-9]+)?")


def digit_skeleton(text: str) -> str:
    t = text or ""
    # Exclude exponents, sections, and ordinals so structural comparisons anchor on parameters
    t = re.sub(r"(\b[a-zA-Z]|\))\s*\^\s*\d+", " ", t)
    t = re.sub(r"\bAS\s*-\s*\d+\b", " ", t, flags=re.I)
    t = re.sub(r"\bSection\s+\d+[a-zA-Z]?\b", " ", t, flags=re.I)
    return ",".join(_SKELETON.findall(t))


_MIN_SIM = 0.0


def _min_sim() -> float:
    global _MIN_SIM
    if _MIN_SIM <= 0.0:
        try:
            _MIN_SIM = float(os.environ.get("BANK_MIN_SIMILARITY", "0.93"))
        except (TypeError, ValueError):
            _MIN_SIM = 0.93
        _MIN_SIM = max(0.80, min(0.99, _MIN_SIM))
    return _MIN_SIM


# --- WS-BANK (2026-10-11): context-scoped matching -------------------------
#
# The lane used to query board='CBSE' with zero session context, so a fuzzy
# trigram probe on a digit-free stem could collide across classes/chapters
# (the reason the digit-free probe was disabled).  Callers that KNOW the
# session's board / class_level / subject (the deterministic tutor lane
# carries all three; callers holding a node id can use
# context_from_node_id) pass them as context={...}: the candidate pool is
# then narrowed in SQL *before* similarity is judged, which is what makes
# the widened gates below safe.  context=None preserves the pre-WS-BANK
# behavior byte-for-byte (board='CBSE', global floor, digit-skeleton gate).

# Per-subject trigram floors for SCOPED lookups.  Numeric-STEM subjects
# keep the global _min_sim() floor — the digit-skeleton agreement gate is
# their identity anchor.  Prose / language / humanities subjects (whose
# stems routinely carry no numbers at all) get the lower 0.90 floor; it is
# reachable ONLY inside a scoped lookup and every candidate still has to
# clear the serving gates (same digit skeleton, or digit-free on BOTH
# sides at >= BANK_DIGITFREE_MIN_SIMILARITY, plus answer agreement).
# Subject codes are the board_questions.subject spellings (46+ codes;
# unknown/absent codes fall back to the STEM-safe global floor).
_PROSE_FLOOR = 0.90
BANK_SIM_BY_SUBJECT = {
    # English (all book codes)
    "eng": _PROSE_FLOOR, "english": _PROSE_FLOOR, "engl": _PROSE_FLOOR,
    "eng_k": _PROSE_FLOOR, "eng_w": _PROSE_FLOOR, "eng_f": _PROSE_FLOOR,
    "eng_h": _PROSE_FLOOR, "eng_v": _PROSE_FLOOR, "eng_s": _PROSE_FLOOR,
    "eng_elec": _PROSE_FLOOR, "eng_mod": _PROSE_FLOOR, "gram": _PROSE_FLOOR,
    # Hindi (all book codes)
    "hin": _PROSE_FLOOR, "hin_a": _PROSE_FLOOR, "hin_ar": _PROSE_FLOOR,
    "hin_v": _PROSE_FLOOR, "hin_sp": _PROSE_FLOOR, "hin_ga": _PROSE_FLOOR,
    "hin_ks": _PROSE_FLOOR, "hin_al": _PROSE_FLOOR, "hin_kr": _PROSE_FLOOR,
    # humanities / social sciences
    "hist": _PROSE_FLOOR, "histciv": _PROSE_FLOOR, "history": _PROSE_FLOOR,
    "civ": _PROSE_FLOOR, "civics": _PROSE_FLOOR, "polsci": _PROSE_FLOOR,
    "geo": _PROSE_FLOOR, "geography": _PROSE_FLOOR, "soc": _PROSE_FLOOR,
    "hs": _PROSE_FLOOR, "envsci": _PROSE_FLOOR, "psy": _PROSE_FLOOR,
    "legal": _PROSE_FLOOR, "leg": _PROSE_FLOOR,
    # commerce prose (accounts stays STEM: it computes)
    "econ": _PROSE_FLOOR, "economics": _PROSE_FLOOR, "eco": _PROSE_FLOOR,
    "bs": _PROSE_FLOOR, "bst": _PROSE_FLOOR, "comst": _PROSE_FLOOR,
    "comm": _PROSE_FLOOR, "ca": _PROSE_FLOOR,
    # conceptual-tech prose (mostly numberless theory stems)
    "ai": _PROSE_FLOOR, "robotics": _PROSE_FLOOR,
}

# Digit-free prose lane: a numberless stem may only be fuzzy-served when
# the caller's context pins class AND subject, at this higher floor, and
# only when every surviving candidate is itself digit-free and the
# candidates agree on the answer key.
BANK_DIGITFREE_MIN_SIMILARITY = 0.95

_NODE_ID_CTX = re.compile(r"^c(\d{1,2})_([a-z0-9]+)_(cbse|icse|isc)_", re.I)


def _subject_floor(subject: Optional[str]) -> float:
    """Trgm floor for a scoped lookup; prose subjects run lower (see the
    BANK_SIM_BY_SUBJECT contract), everything else keeps the global floor."""
    if not subject:
        return _min_sim()
    return BANK_SIM_BY_SUBJECT.get(str(subject).strip().lower(), _min_sim())


def _coerce_context(context) -> Optional[Dict[str, Any]]:
    """Normalize caller context -> {'board','class_level','subject'}.

    Returns None for context=None AND for a dict whose values are all
    absent/unparseable — both run the byte-identical legacy path
    (board='CBSE', global floor, digit-skeleton gate)."""
    if not isinstance(context, dict):
        return None
    board = context.get("board")
    subj = context.get("subject")
    cl = context.get("class_level", context.get("class"))
    try:
        cl = int(cl) if cl is not None else None
    except (TypeError, ValueError):
        cl = None
    board = str(board).strip().upper() if board else None
    subj = str(subj).strip().lower() if subj else None
    if board is None and cl is None and subj is None:
        return None
    return {"board": board, "class_level": cl, "subject": subj}


def context_from_node_id(node_id: Optional[str]) -> Optional[Dict[str, Any]]:
    """Derive lookup context from a corpus node id —
    'c10_bio_cbse_01_001' -> {'board':'CBSE','class_level':10,
    'subject':'bio'}.  Callers that hold a node id (answer_pipeline's
    node_id param, verified_practice's SolveTextRequest.node_id) can
    thread context without a corpus load.  None on non-matching ids."""
    m = _NODE_ID_CTX.match(str(node_id or "").strip())
    if not m:
        return None
    return {"board": m.group(3).upper(), "class_level": int(m.group(1)),
            "subject": m.group(2).lower()}


def _row_in_scope(row, ctx) -> bool:
    """Defense-in-depth scope check applied to candidate rows post-fetch:
    the scoped SQL filters inside Postgres; this drops any straggler a
    surrogate/fake path returned (and keeps QUARANTINED rows unservable
    even when a caller passes no board)."""
    if ctx is None:
        return True
    rb = (getattr(row, "board", None) or "").strip().upper()
    if rb == "QUARANTINED":
        return False
    if ctx["board"] and rb != ctx["board"]:
        return False
    if ctx["class_level"] is not None and \
            getattr(row, "class_level", None) != ctx["class_level"]:
        return False
    if ctx["subject"] and \
            (getattr(row, "subject", None) or "").strip().lower() != ctx["subject"]:
        return False
    return True


_STATE = {}
_LOCK = threading.Lock()


def _engine():
    """Sync engine with a short statement timeout for the lookup."""
    eng = _STATE.get("engine")
    if eng is None:
        from sqlalchemy import create_engine

        try:
            from backend.database import get_sync_engine

            eng = get_sync_engine()
        except Exception:  # noqa - standalone use: derive the sync URL
            url = os.environ.get("DATABASE_URL") or ""
            if not url:
                raise RuntimeError("no database url for bank lane")
            url = url.replace("postgresql+asyncpg", "postgresql+psycopg2")
            if url.startswith("postgres") and "options" not in url:
                sep = "&" if "?" in url else "?"
                url = f"{url}{sep}options=-c%20statement_timeout=2000"
            eng = create_engine(url, pool_pre_ping=True, pool_size=2,
                                max_overflow=2, pool_recycle=1800)
        _STATE["engine"] = eng
    return eng


_SQL = """
SELECT id, subject, class_level, question_type, board, year,
       correct_answer, model_answer, explanation, options, marks,
       question_text
FROM board_questions
WHERE board = 'CBSE' AND norm_text = :nk
  AND NOT EXISTS (SELECT 1 FROM board_question_flags fq
                  WHERE fq.question_id = board_questions.id)
LIMIT 6
"""

_TRGM_SQL = """
SELECT id, subject, class_level, question_type, board, year,
       correct_answer, model_answer, explanation, options, marks,
       question_text, similarity(norm_text, :nk) AS sim
FROM board_questions
WHERE board = 'CBSE' AND norm_text % :nk
  AND NOT EXISTS (SELECT 1 FROM board_question_flags fq
                  WHERE fq.question_id = board_questions.id)
  AND similarity(norm_text, :nk) >= :minsim
ORDER BY sim DESC
LIMIT 6
"""

# WS-BANK scoped variants — used only when the caller passes context.
# NULL bind values disable that axis (:b/:c/:s IS NULL), so a partially
# known context still scopes on what it knows.  QUARANTINED rows are
# never candidates regardless of context.  The legacy strings above are
# kept verbatim (tests execute _SQL directly with only :nk bound).
_SQL_SCOPED = """
SELECT id, subject, class_level, question_type, board, year,
       correct_answer, model_answer, explanation, options, marks,
       question_text
FROM board_questions
WHERE norm_text = :nk
  AND board <> 'QUARANTINED'
  AND (:b IS NULL OR board = :b)
  AND (:c IS NULL OR class_level = :c)
  AND (:s IS NULL OR subject = :s)
  AND NOT EXISTS (SELECT 1 FROM board_question_flags fq
                  WHERE fq.question_id = board_questions.id)
LIMIT 6
"""

_TRGM_SQL_SCOPED = """
SELECT id, subject, class_level, question_type, board, year,
       correct_answer, model_answer, explanation, options, marks,
       question_text, similarity(norm_text, :nk) AS sim
FROM board_questions
WHERE norm_text % :nk
  AND board <> 'QUARANTINED'
  AND (:b IS NULL OR board = :b)
  AND (:c IS NULL OR class_level = :c)
  AND (:s IS NULL OR subject = :s)
  AND NOT EXISTS (SELECT 1 FROM board_question_flags fq
                  WHERE fq.question_id = board_questions.id)
  AND similarity(norm_text, :nk) >= :minsim
ORDER BY sim DESC
LIMIT 6
"""


#: Sentence-boundary markers opening teacher-facing marking-scheme prose
#: in bank key cells (~125k rows carry it): wrong-answer analysis,
#: walkthrough commentary, common-error notes.  The served key is the
#: segment BEFORE the meta commentary.  Sentence-initial only (capital +
#: boundary) so a legitimate mid-sentence 'a wrong answer' phrase is
#: never truncated.
_META_TAIL_RE = re.compile(
    r"(?:^|(?<=[.!?\n])\s*)[\*_\u201c\u201d\"'(\s]*(?:"
    r"(?:[Ww]hat\s+)?[Aa]\s+wrong[-\s]answer\b"
    r"|[Ww]rong[-\s]answer\s+analysis\b"
    r"|[Tt]he\s+walkthrough(?:'s|\u2019s)?\b"
    r"|[Aa]\s+common\s+error\b)")


def _unwrap_meta_prose(ans: str) -> str:
    """Serve the key, not the marking-scheme wrapper (wave98 memo
    defect): 'stem\\n\\n**A wrong answer ... reveals the student ...**'
    served the whole cell; the student-facing answer is the segment
    before the examiner commentary starts."""
    if not ans:
        return ans
    m = _META_TAIL_RE.search(ans)
    if m:
        return ans[:m.start()].rstrip()
    return ans


def _answer_text(row) -> Optional[str]:
    """The board's own key, composed for serving."""
    qtype = (row.question_type or "").lower()
    ans = _unwrap_meta_prose((row.correct_answer or "").strip())
    model = _unwrap_meta_prose((row.model_answer or "").strip())
    if not ans and not model:
        return None
    if ("mcq" in qtype or "objective" in qtype) and ans and row.options:
        # serve the option TEXT, not a bare letter
        opts = row.options
        try:
            if isinstance(opts, str):
                import json as _json
                opts = _json.loads(opts)
        except Exception:  # noqa
            opts = None
        if isinstance(opts, dict):
            key = ans.strip().upper()
            if key in opts and len(ans) <= 3:
                ans = str(opts[key])
        elif isinstance(opts, list):
            for o in opts:
                if isinstance(o, dict) and str(o.get("letter", "")).upper() == ans.upper()[:1]:
                    ans = str(o.get("text") or ans)
                    break
    body = ans or model
    if model and ans and qtype and ("short" in qtype or "long" in qtype
                                    or "descriptive" in qtype):
        body = ans
    return body[:1500]


def _agree(rows) -> bool:
    """All rows carry the same normalized answer key."""
    keys = set()
    for r in rows:
        a = ((r.correct_answer or "") + "|" + (r.model_answer or "")).strip()
        keys.add(re.sub(r"\s+", " ", a)[:200])
    return len(keys) <= 1


def warmup() -> bool:
    """Pay engine creation + one query once (pipeline cold-start)."""
    try:
        eng = _engine()
        from sqlalchemy import text as _text

        with eng.connect() as cx:
            cx.execute(_text("SELECT 1"))
        return True
    except Exception:  # noqa
        return False


_SEM_BANK = {"loaded": False, "ids": None, "emb": None,
             "norms": None, "model": None}


def _bank_npz_path() -> str:
    """bank_q_embed.npz through the env-first data ladder (WSA-P4):
    CBSE_DATA_DIR authoritative, package-relative cbse_data (the
    container mount) next, the legacy D:/platform/runtime_data literal
    only as a last resort — it never exists inside the Linux
    containers, which silently disabled the semantic lane in prod."""
    try:
        from backend.its.solver.paths import data_file
    except ImportError:  # flat-import environments
        from its.solver.paths import data_file
    return data_file("bank_q_embed.npz")


def _sem_bank_load():
    """Lazy-load the precomputed bank embedding index (float16 ~97MB)."""
    if _SEM_BANK["loaded"]:
        return _SEM_BANK["emb"] is not None
    _SEM_BANK["loaded"] = True
    try:
        import numpy as np
        p = _bank_npz_path()
        z = np.load(p, allow_pickle=True)
        _SEM_BANK["ids"] = z["ids"]
        _SEM_BANK["emb"] = z["emb"].astype(np.float32)
        _SEM_BANK["norms"] = z["norms"]
        from sentence_transformers import SentenceTransformer
        _SEM_BANK["model"] = SentenceTransformer("all-MiniLM-L6-v2")
        return True
    except Exception as e:
        log.debug("bank semantic index unavailable: %s", type(e).__name__)
        return False


def _semantic_rows(question_text: str, cx, ctx=None):
    """Cosine top-k over the bank's embedded norm_texts.  Every row is
    then subjected to the SAME gates as the trigram path — digit-skeleton
    equality, answer agreement, similarity floor — so a semantic hit is
    never weaker than the lanes it bypasses.  WS-BANK: `ctx` additionally
    scope-filters the winner post-fetch (embeddings can't be SQL-scoped)."""
    if not _sem_bank_load():
        return []
    try:
        import numpy as np
        nk = normalize(question_text)
        qv = _SEM_BANK["model"].encode(
            [nk], normalize_embeddings=True,
            show_progress_bar=False)[0].astype(np.float32)
        sims = _SEM_BANK["emb"] @ qv
        top = np.argpartition(-sims, 6)[:6]
        top = top[np.argsort(-sims[top])]
        # Serving an official key on a wrong semantic match is the
        # worst wrong-verify class (dev bank test: drill-bank near-dupes
        # q72 vs q79 shared skeleton AND high cosine).  Require
        # near-identity: very high sim AND a unique winning candidate.
        thr = float(os.environ.get("BANK_SEM_MIN_SIMILARITY", "0.97"))
        sk_q = digit_skeleton(question_text)
        cands = []
        for i in top:
            if float(sims[i]) < thr:
                continue
            cand_norm = str(_SEM_BANK["norms"][i])
            if sk_q and digit_skeleton(cand_norm) != sk_q:
                continue                # skeleton must agree exactly
            cands.append(int(_SEM_BANK["ids"][i]))
        if len(cands) != 1:
            return []                   # ambiguous paraphrase -> refuse
        if not cands:
            return []
        from sqlalchemy import text as _text
        rows = cx.execute(_text(
            "SELECT id, subject, class_level, question_type, board, "
            "year, correct_answer, model_answer, explanation, options, "
            "marks, question_text FROM board_questions "
            "WHERE id = ANY(:ids) AND NOT EXISTS (SELECT 1 FROM "
            "board_question_flags fq WHERE fq.question_id = "
            "board_questions.id)"), {"ids": cands}).fetchall()
        if ctx is not None:
            rows = [r for r in rows if _row_in_scope(r, ctx)]
            if not rows:
                return []               # winner outside session scope
        if len(rows) > 1 and not _agree(rows):
            return []                   # ambiguous near-dupes: fail closed
        return rows[:1]
    except Exception as e:
        log.debug("bank semantic lookup degraded: %s", type(e).__name__)
        return []


def _budget_s() -> float:
    try:
        return max(0.05, float(os.environ.get("BANK_LOOKUP_BUDGET_S", "0.5")))
    except (TypeError, ValueError):
        return 0.5


_POOL = ThreadPoolExecutor(max_workers=8, thread_name_prefix="bank-lookup")


def _miss(reason: str) -> None:
    """CL-09: every bank-lookup fallthrough records a typed reason the
    caller can read via last_miss_reason() — silent misses made the
    refusal path undiagnosable."""
    with _LOCK:
        _STATE["miss_reason"] = reason
    log.debug("bank miss: %s", reason)


def last_miss_reason() -> Optional[str]:
    """Reason for the most recent miss in this process ('' cleared per
    new lookup call)."""
    with _LOCK:
        return _STATE.get("miss_reason")


def lookup(question_text: str, context=None) -> Optional[Dict[str, Any]]:
    """Return a serving dict for a bank match, else None. Never raises.

    `context` (optional dict): session scope the caller already knows —
    {"board": "CBSE"|"ICSE"|"ISC", "class_level": int, "subject": str}
    (the "class" key is also accepted for class_level).  Narrowing the
    candidate pool is what makes the widened gates safe: prose subjects
    run a lower trigram floor (BANK_SIM_BY_SUBJECT), and digit-free stems
    may fuzzy-match when class+subject are BOTH pinned at the higher
    BANK_DIGITFREE_MIN_SIMILARITY floor with answer agreement.
    context=None preserves the legacy unscoped behavior exactly.

    Wall-clock budget (BANK_LOOKUP_BUDGET_S, default 0.5s): an overrun
    returns None and the pipeline falls through to its computed lanes.
    The worker finishes in the background and releases its pooled
    connection itself, so a slow bank never holds the request."""
    with _LOCK:
        _STATE["miss_reason"] = None
    try:
        # NB: single-arg submit when context is None — tests patch
        # _lookup_impl with one-arg fakes; never break that surface.
        fut = (_POOL.submit(_lookup_impl, question_text)
               if context is None else
               _POOL.submit(_lookup_impl, question_text, context))
        out = fut.result(timeout=_budget_s())
        if out is None and last_miss_reason() is None:
            _miss("no_candidate_rows")
        return out
    except FutureTimeout:
        _miss("over_budget")
        return None
    except Exception as e:  # noqa - degrade, never raise into the pipeline
        _miss(f"lookup_exception:{type(e).__name__}")
        return None


def _lookup_impl(question_text: str, context=None) -> Optional[Dict[str, Any]]:
    """Return a serving dict for a bank match, else None. Never raises.

    `context` (optional): {"board","class_level","subject"} session scope —
    see lookup().  Scoped lookups narrow candidates in SQL, unlock the
    per-subject floors and the gated digit-free prose lane."""
    if not question_text or len(question_text) < 8:
        _miss("question_too_short")
        return None
    nk = normalize(question_text)
    if len(nk) < 8:
        _miss("normalized_too_short")
        return None
    ctx = _coerce_context(context)
    scoped = ctx is not None
    sk_q = digit_skeleton(question_text)
    # digit-free fuzzy probing is only safe under a pinned class+subject
    # scope; with anything less a numberless stem keeps the legacy refuse.
    digitfree_ok = (scoped and ctx["class_level"] is not None
                    and ctx["subject"] is not None)
    # effective trigram floor: prose subjects lower it (scoped only);
    # digit-free stems always require the higher digit-free floor.
    if scoped:
        floor = (_subject_floor(ctx["subject"]) if sk_q
                 else BANK_DIGITFREE_MIN_SIMILARITY)
    else:
        floor = _min_sim()
    try:
        eng = _engine()
        from sqlalchemy import text as _text

        # QA fix (2026-10-02): the SETs below used to run as plain session
        # SETs on a POOLED shared engine -- statement_timeout=2000 leaked to
        # every later borrower of that connection.  SET LOCAL inside an
        # explicit transaction scopes both settings to this lookup only.
        # The trgm threshold is raised to just under the serving minsim:
        # the `%` operator's 0.3 default admitted ~250k recheck candidates
        # for long keys (35s+ warm / 500s cold); at 0.85 candidates are the
        # rows we would serve anyway (exact `similarity >= :minsim` filter
        # below is unchanged).  WS-BANK: the threshold now follows the
        # effective floor (scoped prose / digit-free lanes differ).
        with eng.connect() as cx, cx.begin():
            try:
                from sqlalchemy import text as _st
                # set_config(..., is_local => true): transaction-scoped,
                # and bind-safe (SET LOCAL cannot take parameters).
                cx.execute(_st(
                    "SELECT set_config('statement_timeout', '2000', true),"
                    " set_config('pg_trgm.similarity_threshold', :thr,"
                    " true)"),
                    {"thr": str(max(0.50, floor - 0.08))})
            except Exception:  # noqa - sqlite/dev engines
                pass
            if scoped:
                params = {"nk": nk, "b": ctx["board"],
                          "c": ctx["class_level"], "s": ctx["subject"]}
                rows = cx.execute(_text(_SQL_SCOPED), params).fetchall()
            else:
                rows = cx.execute(_text(_SQL), {"nk": nk}).fetchall()
            from_exact = bool(rows)
            lane = "exact"
            if not rows and (sk_q or digitfree_ok):
                # QA latency guard (2026-10-02): a trigram hit on a
                # digit-free question was a wrong-answer hazard UNSCOPED
                # (template sentences cross 0.93 across chapters), so the
                # probe used to be skipped outright.  WS-BANK: under a
                # pinned class+subject scope the cross-chapter pool is
                # gone, so the probe runs at the higher digit-free floor.
                try:
                    sql = _TRGM_SQL_SCOPED if scoped else _TRGM_SQL
                    p = {"nk": nk, "minsim": floor}
                    if scoped:
                        p.update({"b": ctx["board"],
                                  "c": ctx["class_level"],
                                  "s": ctx["subject"]})
                    rows = cx.execute(_text(sql), p).fetchall()
                    lane = "trgm"
                except Exception as e:  # noqa - timeout/trgm missing
                    log.debug("bank trgm fallback failed: %s", e)
                    rows = []
            if not rows and (sk_q or digitfree_ok):
                # SEMANTIC fallback: MiniLM cosine over precomputed bank
                # embeddings.  Catches paraphrases trgm misses; same
                # skeleton+agreement gates, same fail-closed contract.
                # Scoped digit-free stems are admitted under the same
                # class+subject pinning as the trgm probe.
                rows = _semantic_rows(question_text, cx, ctx)
                if rows:
                    lane = "semantic"
        if not rows:
            if scoped and not sk_q and not digitfree_ok:
                _miss("digitfree_context_required")
            else:
                _miss("no_candidate_rows")
            return None
        if scoped:
            # defense-in-depth: SQL already scopes; drop stragglers too
            rows = [r for r in rows if _row_in_scope(r, ctx)]
            if not rows:
                _miss("context_scope_excluded")
                return None
            # skeleton agreement applied to the WHOLE candidate set (the
            # legacy path checked only rows[0]): a lower-sim candidate
            # whose numbers agree may serve when the top hit's differ.
            if sk_q:
                rows = [r for r in rows
                        if digit_skeleton(r.question_text or "") == sk_q]
            elif not from_exact:
                # digit-free stem: candidates must be digit-free too —
                # a numbered row can never be the same question
                rows = [r for r in rows
                        if not digit_skeleton(r.question_text or "")]
            if not rows:
                _miss("digit_skeleton_mismatch")
                return None
        # QA fix (2026-10-02): a trigram-only hit on a question with NO
        # digit skeleton is a wrong-answer hazard -- 0.93 trigram
        # similarity is routinely crossed by two DIFFERENT stock template
        # sentences ("What must you be able to do..." vs "What should you
        # be able to do...") keyed to different chapters.  The trigram
        # ladder exists for OCR-noise variants of the same question; that
        # contract needs digits to anchor identity.  Fail closed.
        # WS-BANK: the hazard was cross-chapter collision; a pinned
        # class+subject scope removes it, so scoped digit-free candidates
        # (already >= BANK_DIGITFREE_MIN_SIMILARITY and digit-free on
        # BOTH sides) proceed to the answer-agreement gate instead.
        if not from_exact and not sk_q and not scoped:
            _miss("trgm_hit_no_digit_skeleton")
            return None
        if len(rows) > 1 and not _agree(rows):
            # identical norm but different keys -> raw-exact disambiguation
            exact = [r for r in rows
                     if normalize(r.question_text or "") == nk]
            if not exact:
                _miss("multi_row_disagreement")
                return None
            rows = exact
            # QA fix (2026-10-02): stock template questions ("What must
            # you be able to do to master this topic?") appear VERBATIM in
            # 10+ rows across chapters, each keyed to its own chapter's
            # answer.  The old code served rows[0] of the exact set --
            # a confident cross-chapter wrong answer.  Ambiguity is
            # fail-closed per this module's contract: refuse.
            if len(rows) > 1 and not _agree(rows):
                with _LOCK:
                    _STATE["last_error"] = "ambiguous template text"
                _miss("ambiguous_template_text")
                return None
        row = rows[0]
        answer = _answer_text(row)
        if not answer:
            _miss("row_without_answer_text")
            return None
        # digit-skeleton guard on EVERY hit: '#'-normalization makes
        # "50-word" and "70-word" identical; the numbers must agree
        if sk_q and digit_skeleton(row.question_text or "") != sk_q:
            _miss("digit_skeleton_mismatch")
            return None
        explanation = (row.explanation or "").strip()[:800]
        steps = [explanation] if explanation else [
            "This is a board-bank question: the official answer key is "
            "served verbatim (no computation involved)."]
        # WS-BANK: a fuzzy hit is never dressed as a verbatim claim —
        # 'via' marks the match kind and the step line says "similar".
        via = "bank_exact" if lane == "exact" else (
            "bank_semantic" if lane == "semantic" else "bank_similar")
        meta = {"subject": row.subject, "class": row.class_level,
                "board": row.board, "year": row.year,
                "qtype": row.question_type, "marks": row.marks,
                "match": "exact" if lane == "exact" else "similar"}
        sim = getattr(row, "sim", None)
        if sim is not None:
            meta["similarity"] = round(float(sim), 4)
        if lane != "exact":
            steps = ["Similar verified board question — serving the "
                     "official answer key of the closest bank match."
                     ] + steps
        return {
            "answer": answer,
            "steps": steps,
            "anchor": f"bank:{row.id}",
            "via": via,
            "meta": meta,
        }
    except Exception as e:  # noqa - degrade, never raise into the pipeline
        log.debug("bank_lookup degraded: %s", type(e).__name__)
        with _LOCK:
            _STATE["last_error"] = str(e)[:120]
        return None


# --------------------------------------------------------------------------- #
# Wave 9.8 (Contract A): "similar" EXEMPLAR retrieval — NOT a serving lane.
# lookup() only returns rows good enough to serve verbatim (exact / trgm >=
# 0.93 / semantic >= 0.97 + digit-skeleton agreement).  For the tiered
# response we want the best SAME-QUESTION-TYPE row below that bar: same
# topic/template, often different numbers — its official key is shown as a
# worked exemplar, never as the answer to the student's stem.
# --------------------------------------------------------------------------- #

_SIMILAR_FLOOR_DEFAULT = 0.55
_SIMILAR_BUDGET_S_DEFAULT = 1.0


def _similar_floor() -> float:
    try:
        v = float(os.environ.get("BANK_SIMILAR_MIN_SIMILARITY")
                  or _SIMILAR_FLOOR_DEFAULT)
    except (TypeError, ValueError):
        v = _SIMILAR_FLOOR_DEFAULT
    # keep the exemplar lane below the serving trgm floor — a row good
    # enough to serve verbatim belongs to lookup(), not similar()
    return max(0.30, min(v, 0.92))


def _similar_budget_s() -> float:
    try:
        v = float(os.environ.get("BANK_SIMILAR_BUDGET_S")
                  or _SIMILAR_BUDGET_S_DEFAULT)
    except (TypeError, ValueError):
        v = _SIMILAR_BUDGET_S_DEFAULT
    return max(0.2, min(v, 5.0))


# exact equality first: when the student's stem IS a bank row the
# serving lanes may still refuse (ambiguous_template_text, answer-shape
# guards) — but that row's own worked answer is the best tier-2
# exemplar there is.  Exact hits keep sim=1.0.
_SIMILAR_EXACT_SQL = """
SELECT id, subject, class_level, question_type, board, year,
       correct_answer, model_answer, explanation, options, marks,
       question_text, 1.0::float8 AS sim
FROM board_questions
WHERE norm_text = :nk
  AND board <> 'QUARANTINED'
  AND (:b IS NULL OR board = :b)
  AND (:c IS NULL OR class_level = :c)
  AND (:s IS NULL OR subject = :s)
  AND NOT EXISTS (SELECT 1 FROM board_question_flags fq
                  WHERE fq.question_id = board_questions.id)
ORDER BY id
LIMIT 3
"""

_SIMILAR_SQL = """
SELECT id, subject, class_level, question_type, board, year,
       correct_answer, model_answer, explanation, options, marks,
       question_text, similarity(norm_text, :nk) AS sim
FROM board_questions
WHERE norm_text % :nk
  AND board <> 'QUARANTINED'
  AND (:b IS NULL OR board = :b)
  AND (:c IS NULL OR class_level = :c)
  AND (:s IS NULL OR subject = :s)
  AND NOT EXISTS (SELECT 1 FROM board_question_flags fq
                  WHERE fq.question_id = board_questions.id)
  AND similarity(norm_text, :nk) >= :minsim
ORDER BY sim DESC
LIMIT 3
"""


def _similar_row_payload(row) -> Optional[Dict[str, Any]]:
    answer = _answer_text(row)
    if not answer:
        return None
    explanation = (row.explanation or "").strip()[:800]
    steps = [explanation] if explanation else []
    return {
        "stem": (row.question_text or "")[:600],
        "solution_steps": steps,
        "answer": answer,
        "board": row.board,
        "year": row.year,
        "meta": {"subject": row.subject, "class": row.class_level,
                 "board": row.board, "year": row.year,
                 "qtype": row.question_type, "marks": row.marks,
                 "match": "similar",
                 "similarity": round(float(
                     getattr(row, "sim", 0.0) or 0.0), 4)},
    }


def _similar_impl(question_text: str, context=None
                  ) -> Optional[Dict[str, Any]]:
    if not question_text or len(question_text) < 8:
        return None
    nk = normalize(question_text)
    if len(nk) < 8:
        return None
    ctx = _coerce_context(context)
    params = {"nk": nk, "minsim": _similar_floor(),
              "b": (ctx or {}).get("board"),
              "c": (ctx or {}).get("class_level"),
              "s": (ctx or {}).get("subject")}
    try:
        eng = _engine()
        from sqlalchemy import text as _text
        with eng.connect() as cx, cx.begin():
            cx.execute(_text(
                "SELECT set_config('statement_timeout','1500',true)"))
            rows = list(cx.execute(_text(_SIMILAR_EXACT_SQL), params))
            if not rows:
                # keep the trgm OPERATOR threshold at the floor: a lower
                # prefilter admits ~250k recheck candidates and blows the
                # statement timeout (the same fix the serving lane uses)
                cx.execute(_text(
                    "SELECT set_config('pg_trgm.similarity_threshold',"
                    ":thr,true)"),
                    {"thr": f"{_similar_floor():.2f}"})
                rows = list(cx.execute(_text(_SIMILAR_SQL), params))
        if not rows:
            return None
        return _similar_row_payload(rows[0])
    except Exception as e:  # noqa - degrade, never raise
        log.debug("bank_similar degraded: %s", type(e).__name__)
        return None


def similar(question_text: str, context=None) -> Optional[Dict[str, Any]]:
    """Best same-question-type bank row for the Contract A `similar`
    payload, else None.  Never raises; separate budget from lookup()."""
    try:
        fut = (_POOL.submit(_similar_impl, question_text)
               if context is None else
               _POOL.submit(_similar_impl, question_text, context))
        return fut.result(timeout=_similar_budget_s())
    except Exception as e:  # noqa
        log.debug("bank_similar lookup degraded: %s", type(e).__name__)
        return None
