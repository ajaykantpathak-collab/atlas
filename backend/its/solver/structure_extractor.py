"""structure_extractor.py — LLM parse layer for the structure dispatcher.

The LLM does PARSING, never math:
    question text
      -> LLM returns {structure, slots{role: value}, ask}
      -> verification gate: every numeric slot must appear verbatim in the
         source text (a hallucinated number kills the parse; we refuse
         rather than guess)
      -> model_structure consumes the slots and runs the deterministic
         compute

Fail-closed everywhere: network error, bad JSON, unknown structure,
unverifiable slot — all return None and the question stays guided.
"""

from __future__ import annotations

import asyncio
import json
import logging
import re
from typing import Any, Dict, Optional

logger = logging.getLogger(__name__)

_CACHE: Dict[str, Optional[Dict[str, Any]]] = {}

# Persistent extraction cache — an LLM parse of a question text is a
# pure function of the text, so results are memoized to disk and shared
# across runs/processes.  Failures are NOT persisted (a null could be a
# transient endpoint outage; retry next time).
_CACHE_PATH = None
_DISK_CACHE: Optional[Dict[str, Dict[str, Any]]] = None


def _cache_path():
    global _CACHE_PATH
    if _CACHE_PATH is None:
        try:
            from pathlib import Path
            base = Path(r"D:\platform\runtime_data")
            if not base.exists():
                base = Path("/app/cbse_data")  # container mount
            _CACHE_PATH = base / "structure_extract_cache.json"
        except Exception:
            _CACHE_PATH = False
    return _CACHE_PATH or None


def _disk_load() -> Dict[str, Dict[str, Any]]:
    global _DISK_CACHE
    if _DISK_CACHE is not None:
        return _DISK_CACHE
    _DISK_CACHE = {}
    try:
        p = _cache_path()
        if p and p.exists():
            import json as _json
            raw_text = p.read_text(encoding="utf-8", errors="ignore")
            try:
                _DISK_CACHE.update(_json.loads(raw_text, strict=False))
            except Exception:
                idx = raw_text.rfind("}")
                while idx > 0:
                    try:
                        _DISK_CACHE.update(_json.loads(raw_text[:idx + 1]))
                        break
                    except Exception:
                        idx = raw_text.rfind("}", 0, idx)
    except Exception as _e:
        try:
            from backend.its.solver.contract import log_lane_exception
            log_lane_exception("_disk_load", _e)
        except Exception:
            pass
        pass
    return _DISK_CACHE


_SAVE_COUNTER = 0


def _disk_save(key: str, value: Dict[str, Any]) -> None:
    global _SAVE_COUNTER
    try:
        cache = _disk_load()
        cache[key] = value
        _SAVE_COUNTER += 1
        # Flush to disk periodically to avoid heavy 8MB JSON serializations blocking every query
        if _SAVE_COUNTER % 50 == 0:
            p = _cache_path()
            if p:
                import json as _json
                p.write_text(_json.dumps(cache, ensure_ascii=False), encoding="utf-8")
    except Exception as _e:
        try:
            from backend.its.solver.contract import log_lane_exception
            log_lane_exception("_disk_save", _e)
        except Exception:
            pass
        pass


_ROUTE_PREFIX = "ROUTE:"


def route_cache_get(norm_key: str) -> Optional[Dict[str, Any]]:
    """Wave 9.8 L3: pre-routed family decision for a bank-normalized
    stem — same disk store (`structure_extract_cache.json`), namespaced
    `ROUTE:` so LLM extractions and route decisions never collide."""
    if not norm_key:
        return None
    try:
        cached = _disk_load().get(_ROUTE_PREFIX + norm_key)
        if isinstance(cached, dict) and "structure" in cached:
            return cached
    except Exception as e:  # noqa: BLE001
        try:
            from backend.its.solver.contract import log_lane_exception
            log_lane_exception("route_cache_get", e)
        except Exception:
            pass
    return None


def route_cache_put(norm_key: str, record: Dict[str, Any]) -> None:
    """Persist `{structure, confidence, matched, via}` under
    `ROUTE:<norm_text>` — write-through; the serving lane and the
    bank_preroute worker write identical records."""
    if not norm_key:
        return
    try:
        rec = {k: record.get(k) for k in
               ("structure", "confidence", "matched", "via")}
        _disk_save(_ROUTE_PREFIX + norm_key, rec)
    except Exception as e:  # noqa: BLE001
        try:
            from backend.its.solver.contract import log_lane_exception
            log_lane_exception("route_cache_put", e)
        except Exception:
            pass


def _spec_brief() -> str:
    """Compact catalog of registered structure specs for the prompt."""
    from backend.its.solver.structure_families import STRUCTURE_SPECS
    lines = []
    for sid, spec in STRUCTURE_SPECS.items():
        slots = list((spec.get("slots") or {}).keys())
        ex = (spec.get("exemplars") or [""])[0][:70]
        lines.append(f"- {sid}: slots={slots} e.g. \"{ex}\"")
    return "\n".join(lines)


_EXTRACT_PROMPT = """You are a precise math-question parser. You DO NOT solve anything.
Identify which known structure the question belongs to and extract the
numeric values into named slots.

KNOWN STRUCTURES:
{specs}

Return ONLY a JSON object:
{{
  "structure": "<one of the ids above, or null if none fits>",
  "slots": {{
    "<role>": {{
      "value": <number, or [x, y] for coordinate points>,
      "unit": "<unit verbatim: cm|m|km|deg|cm2|Rs|hrs|null>",
      "span": "<the EXACT consecutive words of the question that this
               value is read from — copy character-for-character>"
    }}
  }},
  "ask": "<short phrase: what is asked>"
}}

Rules:
- Every slot needs its own verbatim "span" — text copied exactly from
  the question. If you cannot point at where a number comes from, it is
  not a slot value.
- Copy numbers EXACTLY as they appear (no rounding, no derived values).
- A point P(2,5) uses slot name "P", value [2, 5], unit null.
- If the question is a proof/definition/concept question or no structure
  fits, return {{"structure": null}}.
- DO NOT compute, DO NOT solve, DO NOT explain. JSON only.

Question:
{question}
"""


def _numbers_in(text: str) -> set:
    """All numeric literals present in the source text."""
    return {float(m.group(0)) for m in
            re.finditer(r"-?\d+(?:\.\d+)?", text)}


# role-name → value-range sanity: catches the 'labeled an angle as a
# distance' failure — the VALUE can verify (it's in the text) while the
# ROLE is wrong; type ranges reject that
_SLOT_RULES = (
    (re.compile(r"angle|deg|elevation|theta", re.I),
     lambda v: 0 < v <= 180, "angle must be in (0, 180]"),
    (re.compile(r"prob", re.I), lambda v: 0 <= v <= 1,
     "probability must be in [0, 1]"),
    (re.compile(r"dist|length|height|radius|side|perimeter|area|speed|"
                r"width|depth|cost|price|income|count|term|sum|d\b|n\b|"
                r"age|time|days?|weight|volume|capacity", re.I),
     lambda v: v > 0, "physical quantity must be positive"),
    (re.compile(r"^[A-Z]$", 0),  # point slots: 'P', 'Q', 'R' -> [x, y]
     lambda v: True, "point slot (validated structurally below)"),
)


# unit tokens that mark a quantity as an ANGLE, not a length
_ANGLE_UNITS = {"deg", "degree", "degrees", "°", "o", "rad"}
_LEN_UNITS = {"cm", "m", "km", "mm", "ft", "inch", "inches"}
_AREA_UNITS = {"cm2", "m2", "sqcm", "sqm"}
_ANGLE_ROLE = re.compile(r"angle|elevation|theta|deg", re.I)
_LEN_ROLE = re.compile(r"dist|length|height|radius|side|width|depth|"
                       r"slant|base|chord|tangent", re.I)


def _verify_slots(slots: Dict[str, Any], text: str) -> bool:
    """Extractive-grounding gate — each slot must be a dict
    {value, unit, span} where the span is verbatim question text that
    itself contains the value.  A mis-roled number fails twice: its span
    won't be found verbatim, or the unit contradicts the role
    ('distance': 30deg).  Plain values (legacy shape) still verify by
    presence for backward compatibility."""
    norm_text = re.sub(r"\s+", " ", text).strip()
    pool = _numbers_in(text)
    for name, v in slots.items():
        unit = None
        if isinstance(v, dict) and "value" in v:
            span = str(v.get("span") or "")
            unit = str(v.get("unit") or "").strip().lower() or None
            if span:
                span_n = re.sub(r"\s+", " ", span).strip()
                if span_n not in norm_text:
                    return False          # span not verbatim in source
                if not set(_numbers_in(span)) <= pool:
                    return False          # span invents numbers
            v = v.get("value")
        # structural type: named single-letter slots are points -> [x, y]
        if re.fullmatch(r"[A-Z]", str(name)):
            if not (isinstance(v, (list, tuple)) and len(v) == 2):
                return False
        if isinstance(v, (list, tuple)):
            for x in v:
                try:
                    xv = float(x)
                except (TypeError, ValueError):
                    return False
                if not any(abs(xv - n) < 1e-6 for n in pool):
                    return False
            continue
        if isinstance(v, (int, float)):
            fv = float(v)
            if not any(abs(fv - n) < 1e-6 for n in pool):
                return False
            for pat, rule, _why in _SLOT_RULES:
                if pat.search(str(name)) and not rule(fv):
                    return False
            # unit/role contradiction: angle unit on a length role or
            # a length unit on an angle role is a misparse
            if unit:
                if _ANGLE_ROLE.search(str(name)) and unit not in \
                        _ANGLE_UNITS:
                    return False
                if _LEN_ROLE.search(str(name)) and unit in _ANGLE_UNITS:
                    return False
        # strings (labels, words) pass — they're not fabricated numbers
    return True


_SYNC_HTTP: "httpx.Client | None" = None


def _sync_client() -> "httpx.Client":
    """CL-21(c): shared sync client — httpx.post used to build a NEW
    Client + SSL context per call (~0.8s each; 140.7s/176 calls in the
    WS-H refusal-sweep profile). One context, reused."""
    global _SYNC_HTTP
    if _SYNC_HTTP is None or _SYNC_HTTP.is_closed:
        import httpx
        _SYNC_HTTP = httpx.Client(timeout=None)
    return _SYNC_HTTP


def _chat(prompt: str) -> Optional[str]:
    """Provider cascade: Groq (LPU ~1s) -> FreeLLMAPI/Gemma (~4s)."""
    # SOLVER CONTRACT (contract.py): SOLVER_LLM_MODE=off means ZERO LLM
    # calls — the whole point of the deterministic-first guarantee.
    # `_chat` used to ignore the mode and dial Groq/Gemini whenever a
    # key was present (live: 3 remote attempts in off mode), so an
    # "LLM off" deployment silently depended on network + quota.
    try:
        from backend.its.solver.policy import llm_mode, SolverLLMMode
        if llm_mode() == SolverLLMMode.OFF:
            return None
    except ImportError:
        pass  # policy module unavailable: legacy behavior
    # CL-10 search cap: consume the shared per-question LLM budget
    # (competency_engine._LLM_BUDGET, re-armed to 3 by answer()). Each
    # _chat cascade can cost ~120s across providers; on a refusal tail
    # uncapped calls were the 135.7s outlier. Exhausted => deterministic
    # extraction continues and the stem falls to a typed refusal.
    try:
        from backend.its.solver.competency_engine import _LLM_BUDGET
        if _LLM_BUDGET.get() <= 0:
            return None
        _LLM_BUDGET.set(_LLM_BUDGET.get() - 1)
    except Exception:
        pass  # budget module unavailable: legacy behavior
    import os
    # CL-10: SOLVER_OFFLINE must gate the WHOLE lane — it used to guard
    # only the freellm tail while Groq/Gemini fired regardless (WS-E
    # audit: every registry miss burned ~6s of 429 retries).
    if os.environ.get("SOLVER_OFFLINE") == "1":
        return None
    import httpx
    groq_key = os.environ.get("GROQ_API_KEY")
    if not groq_key:
        try:
            from dotenv import load_dotenv
            for _ep in (r"D:\platform\.env", r"D:\platform\deploy\.env", r"D:\platform\backend\.env"):
                if os.path.exists(_ep):
                    load_dotenv(_ep)
            groq_key = os.environ.get("GROQ_API_KEY")
        except Exception as _e:
            try:
                from backend.its.solver.contract import log_lane_exception
                log_lane_exception("_chat", _e)
            except Exception:
                pass
            pass
    # TokenHarbor Free Primary Extraction
    try:
        from backend.tools.tokenharbor_client import generate as _th_gen
        th_text = _th_gen(prompt, max_tokens=2048, temperature=0.0, timeout=12)
        if th_text and th_text.strip():
            return th_text.strip()
    except Exception as _th_e:
        logger.debug("tokenharbor extraction failed: %s", _th_e)

    if groq_key:
        model = os.environ.get("STRUCTURE_LLM_MODEL", "qwen/qwen3.8-27b")
        for payload_extra in ({"response_format": {"type":
                                                 "json_object"}}, {}):
            # native JSON mode guarantees a parseable body; fall back to
            # plain if the model rejects the format flag
            try:
                r = _sync_client().post(
                    "https://api.groq.com/openai/v1/chat/completions",
                    headers={"Authorization": f"Bearer {groq_key}"},
                    json={"model": model,
                          "messages": [{"role": "user",
                                        "content": prompt}],
                          "temperature": 0.0, "max_tokens": 3200,
                          **payload_extra},
                    timeout=15)
                if r.status_code == 200:
                    content = r.json()["choices"][0]["message"].get(
                        "content") or ""
                    if content.strip():
                        return content
            except Exception as e:
                logger.warning("groq extraction failed: %s", e)
                break
    try:
        from backend.tools.gemini_client import generate as _gemini_gen
        text = _gemini_gen(prompt, max_tokens=3200, temperature=0.0, timeout=25)
        if text and text.strip():
            return text.strip()
    except Exception as e:
        logger.warning("gemini extraction failed: %s", e)
    try:
        import os
        if os.environ.get("SOLVER_OFFLINE", "1") == "1":
            # Fast-fail in deterministic/offline mode: don't burn 120s on down LLM endpoints
            return None
        from backend.ai.llm_client import LLMClient
        client = LLMClient(timeout=3.0)
        client._models = [
            os.environ.get("STRUCTURE_LLM_MODEL", "gemma-4-26b-a4b-it")]
        coro = client.chat([{"role": "user", "content": prompt}],
                           temperature=0.0, max_tokens=3200)
        try:
            asyncio.get_running_loop()
        except RuntimeError:
            return asyncio.run(coro)
        import concurrent.futures
        with concurrent.futures.ThreadPoolExecutor(1) as ex:
            return ex.submit(asyncio.run, coro).result(timeout=4)
    except Exception as e:
        logger.warning("freellm extraction failed: %s", e)
        return None


def extract_slots(question: str) -> Optional[Dict[str, Any]]:
    """LLM-parse a question into {structure, slots, ask} — or None.
    Under defer_llm the LLM extraction is deferred entirely — even a
    cached result must not fire (deterministic-first means the family's
    own parse gets its chance, not a saved LLM reading)."""
    try:
        from backend.its.solver.structure_families import _DEFER_LLM
        if _DEFER_LLM.get():
            return None
    except Exception:
        pass
    key = question[:400]
    if key in _CACHE:
        return _CACHE[key]
    cached = _disk_load().get(key)
    if cached is not None:
        _CACHE[key] = cached
        return cached

    out: Optional[Dict[str, Any]] = None
    try:
        prompt = _EXTRACT_PROMPT.format(
            specs=_spec_brief(), question=question[:2000])
        raw = _chat(prompt)
        if raw:
            m = re.search(r"\{.*\}", raw, re.S)
            if m:
                data = json.loads(m.group(0))
                sid = data.get("structure")
                slots = data.get("slots") or {}
                if sid and isinstance(slots, dict):
                    from backend.its.solver.structure_families import \
                        STRUCTURE_SPECS
                    if sid in STRUCTURE_SPECS and \
                            _verify_slots(slots, question):
                        # verify on the rich {value,unit,span} shape,
                        # then hand computes the flat {role: value};
                        # the rich copy rides along for the tutor's
                        # confirm-the-values card
                        flat = {}
                        for k, v in slots.items():
                            if isinstance(v, dict) and "value" in v:
                                flat[k] = v["value"]
                            else:
                                flat[k] = v
                        out = {"structure": sid,
                               "slots": flat,
                               "slots_rich": slots,
                               "ask": data.get("ask", "")}
    except Exception as e:
        logger.warning("structure_extractor failed: %s", e)

    _CACHE[key] = out
    if out is not None:
        _disk_save(key, out)  # persist successes only — outages retry
    return out


# --------------------------------------------------------------------------- #
# PAL — program-aided extraction.  The slot parser above can only fill
# REGISTERED structures; a composite competency question ("remaining area",
# "fencing cost") has no slot to fill — it needs the LLM to write the
# *computation* itself.  Same safety contract: the LLM writes code, the
# deterministic sandbox (pal_executor) computes, the student confirms the
# plan before anything runs.
# --------------------------------------------------------------------------- #

_PAL_PROMPT = """You are a precise math and physics program planner. You DO NOT compute the final
answer yourself — you write a small Python program that calculates the exact answer.

Write a program that:
- binds the question's given values to named variables FIRST
- derives any intermediate quantities step by step
- appends clear, student-friendly explanation strings to a list: `steps = []`
- assigns the final result to a variable named `answer` (number or SymPy expression)
- may use math, sympy (sp), fractions.Fraction — nothing else
- must NOT print, input, open files, or import anything else

Return ONLY a JSON object:
{{
  "givens": {{"<name>": "<value with unit, e.g. '45 m'>"}},
  "ask": "<short phrase: what is asked>",
  "plan": ["<one short english step per line of the computation>"],
  "start": <number, the starting total if the question has one, else null>,
  "flows": [
    {{"source": "<verbatim phrase from the question>",
      "value": <number>, "sign": "+" | "-",
      "why": "<income|expense|given|received|added|removed>"}}
  ],
  "code": "<the python program as a single string>",
  "formula": "<a sympy expression over the bound variable names, e.g. 'initial + pen_income - notebook_cost'>",
  "bindings": {{"<variable name in formula>": <number from the question>}},
  "variants": ["<5-8 alternate phrasings of the SAME question>"]
}}

`formula`+`bindings` is the PREFERRED output: a single expression our
symbolic engine evaluates deterministically — no code execution at
all.  Emit `code` only when the computation needs a loop or branch
(formula = null then).  When both are present the engine computes the
formula itself and cross-checks against the code's answer — a
disagreement means the extraction was wrong and nothing ships.

`variants` — other natural ways a student might ask this exact
question (different word order, synonyms, phrasing).  CRITICAL: every
variant must keep the numeric values in the SAME ORDER as the
original, only the wording changes.  These are stored so the program
answers future phrasings with zero new calls.

`flows` is REQUIRED whenever the question is about a changing amount
(money earned/spent, items given/received, things added/removed).
sign is the change FROM THE SUBJECT'S point of view: selling,
earning, receiving, being given is "+"; buying, spending, paying,
giving away, losing is "-".  The declared signs are independently
checked against the code — the code must agree with the declaration.

Rules:
- The program must run top to bottom; `answer` is read at the end.
- Use ONLY numbers that appear in the question (or standard physical constants like g = 9.8 or 10 if specified).
- If the question is a proof/definition/figure question or cannot be
  computed from text, return {{"code": null}}.
- DO NOT compute the answer yourself. JSON only.

Question:
{question}
"""


def extract_program(question: str) -> Optional[Dict[str, Any]]:
    """LLM -> {givens, ask, plan, code}; the code is only *parsed* here —
    execution is pal_executor's job after the student confirms.
    Under defer_llm the program is deferred entirely — a cached PAL
    program must not fire (deterministic-first means the registered
    family gets its chance, not a saved LLM program)."""
    try:
        from backend.its.solver.structure_families import _DEFER_LLM
        if _DEFER_LLM.get():
            return None
    except Exception:
        pass
    key = "PAL:" + question[:400]
    if key in _CACHE:
        return _CACHE[key]
    cached = _disk_load().get(key)
    if cached is not None:
        _CACHE[key] = cached
        if cached.get("code"):          # still teach the shape bank —
            try:                        # cache-hit extractions saved it
                from backend.its.solver.pal_templates import \
                    save_program
                save_program(question, cached)
            except Exception as e:
                from backend.its.solver.contract import \
                    log_lane_exception
                log_lane_exception("pal_template_save_hit", e)
        return cached

    out: Optional[Dict[str, Any]] = None
    try:
        prompt = _PAL_PROMPT.format(question=question[:2000])
        raw = _chat(prompt)
        if raw:
            m = re.search(r"\{.*\}", raw, re.S)
            if m:
                data = json.loads(m.group(0))
                code = data.get("code")
                formula = data.get("formula")
                bindings = data.get("bindings")
                if code and isinstance(code, str):
                    try:
                        from backend.its.solver.pal_executor import \
                            _clean_code
                        code = _clean_code(code)
                    except ImportError:
                        pass
                    import ast as _ast
                    try:
                        _ast.parse(code)
                    except SyntaxError:
                        code = None
                else:
                    code = None
                # formula+bindings is preferred — our engine evaluates
                # it deterministically; code needed only for loops.
                has_formula = (isinstance(formula, str)
                               and formula.strip()
                               and isinstance(bindings, dict)
                               and len(bindings) > 0)
                if code or has_formula:
                    out = {"givens": data.get("givens") or {},
                           "ask": data.get("ask") or "",
                           "plan": data.get("plan") or [],
                           "start": data.get("start"),
                           "flows": data.get("flows") or [],
                           "variants": data.get("variants") or [],
                           "formula": formula if has_formula else None,
                           "bindings": bindings if has_formula else None,
                           "code": code}
    except Exception as e:
        logger.warning("program extraction failed: %s", e)

    _CACHE[key] = out
    if out is not None:
        _disk_save(key, out)
        try:
            from backend.its.solver.pal_templates import save_program
            save_program(question, out)   # shape-keyed: future variants
                                          # of this question run offline
        except Exception as e:
            from backend.its.solver.contract import log_lane_exception
            log_lane_exception("pal_template_save", e)
    return out
