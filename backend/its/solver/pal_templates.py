"""pal_templates.py — PAL programs are learned once, reused forever.

A PAL extraction produces a program bound to THIS question's literals.
The same question shape with different numbers ('3 pens at Rs 15' ->
'5 pens at Rs 20') should not need another LLM call: normalize the
question to a number-free shape key, save the program's literal slots,
and on a match patch the new literals straight into the saved code —
the same mechanism the confirm-card edit path uses.

Flow:
    extract LLM -> run -> (on success) save_program(shape_key, prog)
    offline hit -> match_program(question) -> patch -> run_program

Safety: a shape hit only applies when the literal count AND order
signature matches; a patched program still goes through the declared
-flows consistency gate before shipping.
"""
from __future__ import annotations

import hashlib
import json
import logging
import os
import re
from typing import Any, Dict, List, Optional

logger = logging.getLogger(__name__)

_NUM_RE = re.compile(r"-?\d+(?:\.\d+)?")
_NUM_WORD_RE = re.compile(
    r"\b(?:one|two|three|four|five|six|seven|eight|nine|ten|eleven|"
    r"twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|"
    r"nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|"
    r"hundred|thousand|half|quarter|dozen)\b", re.I)
_WS_RE = re.compile(r"\s+")
_STORE: Dict[str, dict] = {}
_PATH: Optional[str] = None


def _store_path() -> str:
    global _PATH
    if _PATH is None:
        base = os.environ.get("CBSE_DATA_DIR")
        if not base or not os.path.isdir(base):
            base = os.path.join(os.path.dirname(__file__),
                                "..", "..", "..", "cbse_data")
            if not os.path.isdir(base):
                alt = os.path.join("D:/platform", "runtime_data")
                base = alt if os.path.isdir(alt) else base
        _PATH = os.path.join(base, "pal_templates.json")
    return _PATH


def _load() -> Dict[str, dict]:
    global _STORE
    if not _STORE:
        try:
            with open(_store_path(), encoding="utf-8") as fh:
                _STORE.update(json.load(fh))
        except Exception as e:
            from backend.its.solver.contract import log_lane_exception
            log_lane_exception("pal_templates_load", e)
    return _STORE


def _save() -> None:
    try:
        os.makedirs(os.path.dirname(_store_path()), exist_ok=True)
        tmp = _store_path() + f".tmp.{os.getpid()}"
        with open(tmp, "w", encoding="utf-8") as fh:
            json.dump(_STORE, fh, indent=1)
        for attempt in range(5):
            try:
                os.replace(tmp, _store_path())
                break
            except (PermissionError, OSError):
                import time
                time.sleep(0.05 * (attempt + 1))
        else:
            os.replace(tmp, _store_path())
    except Exception as e:
        from backend.its.solver.contract import log_lane_exception
        log_lane_exception("pal_templates_save", e)


_NUM_WORDS = {
    "one": 1, "two": 2, "three": 3, "four": 4, "five": 5,
    "six": 6, "seven": 7, "eight": 8, "nine": 9, "ten": 10,
    "eleven": 11, "twelve": 12, "thirteen": 13, "fourteen": 14,
    "fifteen": 15, "sixteen": 16, "seventeen": 17, "eighteen": 18,
    "nineteen": 19, "twenty": 20, "thirty": 30, "forty": 40,
    "fifty": 50, "sixty": 60, "seventy": 70, "eighty": 80,
    "ninety": 90, "hundred": 100, "thousand": 1000,
    "half": 0.5, "quarter": 0.25, "dozen": 12,
}
_TOKEN_RE = re.compile(
    r"-?\d+(?:\.\d+)?|\b(?:" + "|".join(_NUM_WORDS) + r")\b", re.I)


def _normalize(question: str) -> str:
    # Protect exponents: x^2, y^3 so they don't collapse to #
    t = re.sub(r"(\b[a-zA-Z]|\))\s*\^\s*(\d+)", r"\1pow\2", question or "")
    # Protect Standards & Sections: AS-2, Section 80C
    t = re.sub(r"\bAS\s*-\s*(\d+)\b", r"asstd\1", t, flags=re.I)
    t = re.sub(r"\bSection\s+(\d+[a-zA-Z]?)\b", r"sec\1", t, flags=re.I)
    # Currency
    t = re.sub(r"(?:\u20b9|inr\b|rs\.?)\s*", "rs ", t, flags=re.I)
    return _WS_RE.sub(" ", re.sub(_TOKEN_RE, "#", t.lower())).strip()


def shape_key(question: str) -> str:
    """Number-free fingerprint — same wording+structure, any values."""
    return hashlib.sha1(_normalize(question).encode()).hexdigest()[:16]


_EMB = None
#: text -> vector cache.  match_program sims the SAME stored shape_text
#: values for every question (once ~220 shapes landed, each solve re-encoded
#: 440+ strings through MiniLM = 20-30 s per question); both sides of _sim
#: are stable strings, so the vectors are memoized here.  Additive-only
#: perf fix (SOCIAL_GOLDEN batch): no similarity values change.
_TEXT_EMB: Dict[str, Any] = {}
_TEXT_EMB_MAX = 8192
#: shape_key -> vector, built ONCE per process in a single batched call.
#: The old per-pair _sim(norm, st) loop embedded the whole store on every
#: cold question through the platform embed service — 574-1254 s per
#: fresh worker on hard questions (INTEGRATION-ALL SLOWPATH wedge).
_SEMB: Dict[str, Any] = {}
#: wall-clock budget for the semantic paraphrase scan; the exact-shape
#: path stays open whatever this does — a slow scan only ever cost a
#: paraphrase hit, never correctness
_SCAN_BUDGET_S = 5.0


def _store_vecs(store: Dict[str, dict]) -> Dict[str, Any]:
    """Batched one-shot embedding of every stored shape_text."""
    global _SEMB
    if _SEMB or not store:
        return _SEMB
    try:
        keys, texts = [], []
        for k, r in store.items():
            st = r.get("shape_text")
            if st:
                keys.append(k)
                texts.append(st)
        vecs = _embed(texts)
        if vecs is not None:
            import numpy as np
            arr = np.asarray(vecs)
            for k, v in zip(keys, arr):
                _SEMB[k] = v
    except Exception:
        pass
    return _SEMB


def _embed(texts):
    """Sentence embeddings — reuses the platform's MiniLM if the
    solver stack already loaded it, else lazy-loads once.  Per-text
    results are memoized (see _TEXT_EMB)."""
    global _EMB
    if _EMB is None:
        try:
            from backend.services.embedding_service import embed_texts
            def _E(ts):
                return embed_texts(ts)
            _EMB = _E
        except Exception:
            try:
                from sentence_transformers import SentenceTransformer
                _m = SentenceTransformer("all-MiniLM-L6-v2")

                def _E(ts):
                    return _m.encode(ts)
                _EMB = _E
            except Exception:
                _EMB = False
    if not _EMB:
        return None
    if len(_TEXT_EMB) < _TEXT_EMB_MAX:
        try:
            import numpy as _np
            missing = [t for t in texts if t not in _TEXT_EMB]
            if missing:
                vecs = _EMB(missing)
                for t, v in zip(missing, _np.asarray(vecs)):
                    _TEXT_EMB[t] = v
            return _np.stack([_TEXT_EMB[t] for t in texts])
        except Exception:
            pass  # fall through to the uncached path on any shape mismatch
    return _EMB(texts)


def _sim(a: str, b: str) -> float:
    """Cosine similarity of normalized texts; 0 on any failure."""
    try:
        import numpy as np
        v = _embed([a, b])
        if v is None:
            return 0.0
        va, vb = np.asarray(v[0]), np.asarray(v[1])
        d = float(np.linalg.norm(va) * np.linalg.norm(vb))
        return float(va @ vb / d) if d else 0.0
    except Exception:
        return 0.0


def _literals(question: str) -> List[str]:
    """Positional values — digits pass through, number-words convert."""
    t = question or ""
    # Exclude exponents, standards, and sections so they don't corrupt positional parameters
    t = re.sub(r"(\b[a-zA-Z]|\))\s*\^\s*\d+", " ", t)
    t = re.sub(r"\bAS\s*-\s*\d+\b", " ", t, flags=re.I)
    t = re.sub(r"\bSection\s+\d+[a-zA-Z]?\b", " ", t, flags=re.I)
    out = []
    for tok in _TOKEN_RE.findall(t):
        if re.match(r"-?\d", tok):
            out.append(tok)
        else:
            out.append(str(_NUM_WORDS[tok.lower()]))
    return out


def save_program(question: str, prog: Dict[str, Any]) -> None:
    """Persist a verified PAL program under its shape key — AND under
    every declared paraphrase variant — with the question's literal
    list so a future hit knows how to rebind.  One LLM extraction now
    teaches the bank N phrasings of the same question."""
    if not prog or (not prog.get("code") and not prog.get("formula")):
        return
    lits = _literals(question)
    if not lits:
        return                      # no numbers -> no rebind possible
    store = _load()
    base = {
        "code": prog.get("code"),
        "formula": prog.get("formula"),
        "bindings": prog.get("bindings"),
        "literals": lits,
        "givens": prog.get("givens") or {},
        "ask": prog.get("ask") or "",
        "plan": prog.get("plan") or [],
        "flows": prog.get("flows") or [],
        "start": prog.get("start"),
    }
    keys = {shape_key(question)}
    for v in prog.get("variants") or []:
        if isinstance(v, str) and len(v) > 8:
            keys.add(shape_key(v))   # same literals order by contract
    for k in keys:
        rec = dict(base)
        rec["shape_text"] = _normalize(question)
        rec["uses"] = (store.get(k) or {}).get("uses", 0) + 1
        store[k] = rec
    _save()


_MATCH_THRESHOLD = 0.82

# DIG-GATES (2026-10-06 SOLVER-DIG-1): a semantic shape hit used to run
# ANY stored program whose number-free text was similar enough —
#   'find the SI on 8000 at 12% for 3 years' hit a 'find the PRINCIPAL
#    given SI=8000...' template (same literal order [8000,12,3]) and
#    answered 22222.22 VERIFIED;
#   'car covers 90 km in 2 h, find speed in m/s' hit a '90 METERS in 2
#    SECONDS' template and answered 45 m/s;
#   'bulb draws 0.4 A at 220 V, find RESISTANCE' hit a 'find the POWER'
#    template (P = V*I) and answered 88 W.
# A template may only run when its stored ASK role agrees with this
# question's ask role, and its unit surface matches the question's.
_ROLE_NOUN_RE = re.compile(
    r"\b(principal|simple interest|compound interest|interest|amount|"
    r"power|resistance|current|voltage|speed|distance|area|volume|"
    r"capacity|perimeter|radius|height|profit|loss|discount|mean|"
    r"median|mode|probability|pressure|force|work|energy|charge|"
    r"frequency|wavelength|angle|rate|ratio|average)\b", re.I)
_ASK_CLAUSE_RE = re.compile(
    r"(?:find|what(?:'s| is| are)|how\s+(?:much|many|far|long|fast)|"
    r"calculate|compute|determine|evaluate)(.*$)", re.I | re.S)
_UNIT_TOKEN_RE = re.compile(
    r"\b(kg|g|mg|km|cm|mm|mile|miles|metres?|meters?|litres?|liters?|"
    r"ml|hours?|hrs?|minutes?|mins?|seconds?|secs?|days?|weeks?|"
    r"years?|km/h|kmph|km/hr|m/s|mps|rs\.?|rupees|₹|%|percent|"
    r"deg(?:rees?)?|amperes?|ohms?|watts?|joules?|newtons?|"
    r"pascals?|moles?|grams?|kelvin|celsius|fahrenheit|m|s)\b", re.I)

# temperature-conversion target: 'Convert 25 C into Kelvin' / 'in Celsius'
_TEMP_TARGET_RE = re.compile(
    r"\b(?:into|to|in)\s+(?:degrees?\s+)?"
    r"(kelvin|celsius|fahrenheit)\b", re.I)


def _ask_roles(text: str) -> set:
    m = _ASK_CLAUSE_RE.search(text or "")
    seg = m.group(1) if m else (text or "")
    return {x.group(1).lower() for x in _ROLE_NOUN_RE.finditer(seg)}


def _units_of(text: str) -> set:
    return {x.group(1).lower() for x in _UNIT_TOKEN_RE.finditer(text or "")}


def _template_consistent(rec: dict, question: str) -> bool:
    """False = the stored program answers a DIFFERENT ask (or in
    different units) than this question — the rebind would compute
    confidently and wrongly.  Fail-open when the template carries no
    ask/unit information (legacy rows)."""
    ask_stored = rec.get("ask") or ""
    if ask_stored:
        r_new, r_old = _ask_roles(question), _ask_roles(ask_stored)
        if r_new and r_old and not (r_new & r_old):
            logger.info("pal_template ask-role mismatch %s vs %s — "
                        "refused", sorted(r_old), sorted(r_new))
            return False
    u_new = _units_of(question)
    u_old = _units_of(rec.get("shape_text") or "")
    if u_new and u_old and not (u_new & u_old):
        logger.info("pal_template unit mismatch %s vs %s — refused",
                    sorted(u_old), sorted(u_new))
        return False
    # conversion ask: a TARGET unit named in the ask clause ('speed in
    # m/s', 'capacity in litres') that appears NOWHERE in the template
    # surfaces means the saved program cannot have produced a converted
    # answer — '90 km in 2 h, find the speed in m/s' ran a meters/
    # seconds template and answered 45 m/s VERIFIED (true 12.5).
    m = _ASK_CLAUSE_RE.search(question or "")
    u_asked = _units_of(m.group(1) if m else "")
    if u_asked:
        u_template = _units_of(" ".join([
            rec.get("shape_text") or "", ask_stored,
            rec.get("code") or ""]))
        if u_asked and not (u_asked & u_template):
            logger.info("pal_template asked-unit %s never produced by "
                        "template — refused", sorted(u_asked))
            return False
    # temperature-conversion guard (class 9 chemistry, 2026-10-06):
    # 'Convert 25 degrees Celsius into Kelvin' semantically matched a
    # saved C->F template and shipped 77 VERIFIED (true 298 K) — the
    # unit gates above never fired because the unit vocabulary had no
    # temperature scales.  When the question names a TARGET scale, the
    # template must produce the SAME scale (target-vs-target), or at
    # least mention the scale anywhere if the template carries no
    # explicit target.  Fail-open for non-temperature conversions.
    m_target = _TEMP_TARGET_RE.search(question or "")
    if m_target:
        target = m_target.group(1).lower()
        surf = " ".join([rec.get("shape_text") or "", ask_stored])
        m_old = _TEMP_TARGET_RE.search(surf)
        if m_old:
            if m_old.group(1).lower() != target:
                logger.info("pal_template conversion target mismatch "
                            "%s vs %s — refused",
                            m_old.group(1).lower(), target)
                return False
        elif target not in (rec.get("code") or "").lower():
            logger.info("pal_template target scale %s never produced "
                        "by template — refused", target)
            return False
    # unit-replay soundness (2026-10-06 SOLVER-DIG-1): numbers rebind
    # positionally, UNITS do not.  A program learned on metres/seconds
    # givens replays dist/time and labels it 'm/s' on a km/hours
    # question ('45 m/s' VERIFIED for a 12.5 ask).  The GIVED units of
    # the question must agree with the template's given units — the
    # train-crosses-pole template legitimately converts m/seconds
    # givens to a km/h ask because ITS givens were m/seconds too.
    def _given_units(txt):
        m2 = _ASK_CLAUSE_RE.search(txt or "")
        return _units_of(txt[:m2.start()] if m2 else (txt or ""))

    g_new = _given_units(question)
    g_old = _given_units(rec.get("shape_text") or "")
    if g_new and g_old and not (g_new & g_old):
        logger.info("pal_template given-unit mismatch %s vs %s — "
                    "refused", sorted(g_old), sorted(g_new))
        return False
    return True


def match_program(question: str) -> Optional[Dict[str, Any]]:
    """Offline PAL: a prior extraction under the same shape gets its
    literal assignments rebound to this question's values.  Exact
    shape-key first; on a miss, semantic match against every stored
    shape_text catches paraphrases nobody pre-registered.  Returns a
    prog dict (same shape as extract_program) or None."""
    store = _load()
    rec = store.get(shape_key(question))
    if rec is None:
        norm = _normalize(question)
        best_s, best_r = 0.0, None
        # one-time costs (model load + the batched store-vector build)
        # sit OUTSIDE the budget; the budget bounds the per-question
        # comparison loop so a pathological store can never wedge a
        # worker (the 1254 s SLOWPATH class)
        qv = _embed([norm])
        store_vecs = _store_vecs(store)
        import time as _t
        _t0 = _t.perf_counter()
        if qv is not None:
            import numpy as np
            qva = np.asarray(qv[0])
            for k, r in store.items():
                sv = store_vecs.get(k)
                if sv is None:
                    continue
                d = float(np.linalg.norm(qva) * np.linalg.norm(sv))
                s = float(qva @ sv / d) if d else 0.0
                if s > best_s:
                    best_s, best_r = s, r
        if _t.perf_counter() - _t0 > _SCAN_BUDGET_S:
            # the paraphrase scan may never wedge a worker: past the
            # budget we skip it and this question just misses the
            # offline-template path
            logger.warning("pal_template semantic scan exceeded %.1fs "
                           "budget — skipped (%d shapes)",
                           _SCAN_BUDGET_S, len(store))
            return None
        if best_r is None or best_s < _MATCH_THRESHOLD:
            return None
        rec = best_r
        logger.info("pal_template semantic hit %.3f: %s",
                    best_s, question[:60])
    # ask-role + unit agreement is required on BOTH the exact-shape and
    # the semantic path (an exact key collision with a different ask is
    # rare but has the same blast radius).
    if not _template_consistent(rec, question):
        return None
    # promotion counter: every hit increments; shapes above a threshold
    # are candidates for graduating to a real deterministic family
    try:
        for k, r in store.items():
            if r is rec:
                r["uses"] = (r.get("uses") or 0) + 1
                if r["uses"] in (3, 10, 25):
                    logger.info("pal_template %s hit %sx — promote"
                                " candidate", k, r["uses"])
                break
        _save()
    except Exception:
        pass
    new_lits = _literals(question)
    old_lits = rec.get("literals") or []
    if len(new_lits) != len(old_lits):
        return None                 # different value count -> not the shape

    code = rec.get("code")
    out_code = None
    if code:
        assigns = re.findall(r"(?m)^(\s*\w+\s*=\s*)(-?\d+(?:\.\d+)?)\b",
                             code)
        if len(assigns) >= len(new_lits):
            used = 0
            out_lines = []
            for line in code.splitlines():
                m = re.match(r"^(\s*\w+\s*=\s*)(-?\d+(?:\.\d+)?)\b(.*)$", line)
                if m and used < len(new_lits):
                    line = f"{m.group(1)}{new_lits[used]}{m.group(3)}"
                    used += 1
                out_lines.append(line)
            if used == len(new_lits):
                cand_code = "\n".join(out_lines)
                try:
                    import ast
                    ast.parse(cand_code)
                    from backend.its.solver.pal_executor import _check_ast
                    if _check_ast(ast.parse(cand_code)) is None:
                        out_code = cand_code
                except Exception:
                    out_code = None

    rebound_bindings = None
    formula = rec.get("formula")
    if formula and rec.get("bindings"):
        old_b = rec["bindings"]
        if len(old_b) == len(new_lits):
            rebound_bindings = {}
            for (k, _), new_val in zip(old_b.items(), new_lits):
                try:
                    rebound_bindings[k] = float(new_val)
                except Exception:
                    pass
            if len(rebound_bindings) != len(old_b):
                rebound_bindings = None

    if not out_code and not (formula and rebound_bindings):
        return None

    # CL-23 (2026-10-13): the stored record's givens/plan/ask carry the
    # ORIGINAL question's numbers ('coeff_x': '5', 'target': '28' for a
    # 7x + 4 = 39 replay).  Rebind every numeric token by value-matching
    # against the old literal list; anything that cannot be proven to
    # belong to a current literal is OMITTED — the student-facing
    # confirm card must never display fabricated template defaults.
    rebound_givens = _rebind_givens(rec.get("givens"), old_lits,
                                    new_lits)
    plan = _filter_stale_lines(rec.get("plan") or [], old_lits,
                               new_lits)
    ask = rec.get("ask") or ""
    if _line_is_stale(ask, old_lits, new_lits):
        ask = ""
    start = rec.get("start")
    if isinstance(start, str) and _line_is_stale(start, old_lits,
                                                 new_lits):
        start = None

    return {"givens": rebound_givens,
            "ask": ask,
            "plan": plan,
            "flows": rec.get("flows") or [],
            "start": start,
            "formula": formula,
            "bindings": rebound_bindings,
            "code": out_code,
            "template": True,
            "_old_lits": old_lits}


_NUM_TOKEN_RE = re.compile(r"-?\d+(?:\.\d+)?")


def _lit_val(tok: str) -> Optional[float]:
    try:
        return float(str(tok).replace(",", ""))
    except (TypeError, ValueError):
        return None


def _rebind_givens(givens: Any, old_lits: List[str],
                   new_lits: List[str]) -> Dict[str, Any]:
    """Rebind a stored givens map to the CURRENT literals.

    Each numeric token in a stored value is matched by VALUE against the
    old literal list; the new literal at the same index is substituted
    (positional matching is what the code/formula rebind above already
    does — this is the same contract on the text surface).  A token is
    ambiguous when several old literals share its value AND the new
    literals disagree at those indices; ambiguous or unmatched givens
    are dropped, not guessed — the confirm card shows only values the
    current question actually states (CL-23)."""
    out: Dict[str, Any] = {}
    old_vals = [_lit_val(x) for x in old_lits]
    for name, val in (givens or {}).items():
        s = str(val)
        toks = list(_NUM_TOKEN_RE.finditer(s))
        if not toks:
            out[name] = val       # non-numeric annotation — safe
            continue
        repl: List[str] = []
        ok = True
        for t in toks:
            tv = _lit_val(t.group(0))
            if tv is None:
                ok = False
                break
            idxs = [i for i, ov in enumerate(old_vals) if ov == tv]
            if len(idxs) == 1:
                repl.append(new_lits[idxs[0]])
            elif len(idxs) > 1 and len(
                    {str(new_lits[i]) for i in idxs}) == 1:
                # duplicated old literal, same rebound value either way
                repl.append(new_lits[idxs[0]])
            else:
                ok = False        # no provenance / ambiguous — omit it
                break
        if not ok:
            continue
        for t, nv in zip(reversed(toks), reversed(repl)):
            s = s[:t.start()] + str(nv) + s[t.end():]
        out[name] = s
    return out


def _line_is_stale(line: Any, old_lits: List[str],
                   new_lits: List[str]) -> bool:
    """True when a stored text fragment embeds an OLD literal value that
    the current question does not contain ('Multiply 3 by 5' replayed on
    7x + 4 = 39)."""
    s = str(line)
    new_vals = {_lit_val(x) for x in new_lits}
    new_vals.discard(None)
    for t in _NUM_TOKEN_RE.finditer(s):
        tv = _lit_val(t.group(0))
        if tv is None:
            continue
        if any(_lit_val(ov) == tv for ov in old_lits) \
                and tv not in new_vals:
            return True
    return False


def filter_stale_lines(lines: List[Any], old_lits: List[str],
                       new_lits: List[str]) -> List[str]:
    """Drop template text lines that still carry the old question's
    numbers (CL-23 — used on the executor's `steps` list too, whose
    step strings were written for the original literals)."""
    return [str(s) for s in (lines or [])
            if not _line_is_stale(s, old_lits, new_lits)]


_filter_stale_lines = filter_stale_lines
