"""DeepSeek Router — MiniLM top-5 + DeepSeek v4-flash + Embedding Cache.

Three-stage routing with caching:
1. Embedding cache check — if a similar question was routed before, reuse it (instant, free)
2. MiniLM confidence skip — if MiniLM is very confident, skip DeepSeek (fast, free)
3. DeepSeek v4-flash — final pick for ambiguous cases (slow, paid)

Every DeepSeek result is saved to the cache, so the system gets faster
and cheaper over time as more questions are routed.

The student still inputs variables themselves — this only identifies the
problem type and returns the input form definition.
"""
import os, re, json, logging
from typing import Optional
from datetime import datetime

import httpx
import numpy as np

# sentence_transformers (→ torch) is heavy — import lazily in _get_embedder
# so boot doesn't pay for it on workers that never route.

from backend.ai.problem_type_descriptions import PROBLEM_TYPE_DESCRIPTIONS
from backend.ai.problem_types import PROBLEM_TYPES, ProblemType
from backend.ai.step_types import STEP_TYPES

logger = logging.getLogger(__name__)

# ─────────────────────────────────────────────────────────────────────
# Configuration
# ─────────────────────────────────────────────────────────────────────

DEEPSEEK_API_URL = os.getenv("DEEPSEEK_API_URL", "https://api.deepseek.com/v1/chat/completions")
DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY", "")
DEEPSEEK_MODEL = os.getenv("DEEPSEEK_MODEL", "deepseek-v4-flash")

SYSTEM_PROMPT = (
    "You are a math problem classifier. Given a math question and candidate "
    "problem types, pick the ONE type that best matches. Reply with ONLY the "
    "type_id string (e.g. find_determinant). No number, no reasoning, no "
    "explanation — just the type_id."
)

MAX_TOKENS = 4000
TIMEOUT_SEC = 90

# Cache settings
CACHE_FILE = os.path.join(os.path.dirname(__file__), "_route_cache.json")
CACHE_SIMILARITY_THRESHOLD = 0.93  # if embedding similarity > this, reuse cached route
MINILM_CONFIDENCE_THRESHOLD = 0.65  # if MiniLM top score > this, skip DeepSeek
MINILM_GAP_THRESHOLD = 0.15  # and gap between #1 and #2 > this

# ─────────────────────────────────────────────────────────────────────
# MiniLM embedder — loaded once, reused across requests
# ─────────────────────────────────────────────────────────────────────

_embedder = None  # Optional[SentenceTransformer] — lazy, see _get_embedder
_pt_ids: list = []
_pt_embeddings = None

# Cache: list of {"question": str, "embedding": list[float], "type_id": str, "source": str, "timestamp": str}
_route_cache: list = []
_cache_embeddings = None  # numpy array of cached embeddings for fast similarity


def _get_embedder():
    """Shared MiniLM from ai.model_hub (preloaded at startup).

    Warm -> instant.  Cold -> blocking fallback (rare: only requests
    arriving before the startup preload finishes); the heavy load itself
    lives in model_hub so the event loop is never the loader."""
    global _embedder, _pt_ids, _pt_embeddings
    if _embedder is None:
        from backend.ai import model_hub
        _embedder = model_hub.try_get() or model_hub.load_sync()
    if _pt_embeddings is None:
        _pt_ids = list(PROBLEM_TYPE_DESCRIPTIONS.keys())
        _pt_descs = [PROBLEM_TYPE_DESCRIPTIONS[pt] for pt in _pt_ids]
        _pt_embeddings = _embedder.encode(_pt_descs, batch_size=32, normalize_embeddings=True)
    return _embedder


def _get_top5_candidates(question: str) -> list:
    """Use MiniLM to get top-5 candidate problem types."""
    embedder = _get_embedder()
    q_emb = embedder.encode([question[:500]], normalize_embeddings=True)
    sims = embedder.similarity(q_emb, _pt_embeddings)[0].numpy()
    top_idx = np.argsort(sims)[::-1][:5]
    return [
        (_pt_ids[i], float(sims[i]), PROBLEM_TYPE_DESCRIPTIONS[_pt_ids[i]])
        for i in top_idx
    ]


def _embed_question(question: str) -> np.ndarray:
    """Embed a question using MiniLM."""
    embedder = _get_embedder()
    return embedder.encode([question[:500]], normalize_embeddings=True)[0]


# ─────────────────────────────────────────────────────────────────────
# Route cache — persistent embedding-based cache
# ─────────────────────────────────────────────────────────────────────

def _load_cache():
    """Load the route cache from disk."""
    global _route_cache, _cache_embeddings
    if _route_cache:
        return  # already loaded
    if os.path.exists(CACHE_FILE):
        try:
            with open(CACHE_FILE, "r", encoding="utf-8") as f:
                _route_cache = json.load(f)
            logger.info(f"Loaded {len(_route_cache)} cached routes")
        except Exception as e:
            logger.warning(f"Failed to load route cache: {e}")
            _route_cache = []
    else:
        _route_cache = []
    _rebuild_cache_embeddings()


def _rebuild_cache_embeddings():
    """Rebuild the numpy array of cached embeddings for fast similarity search."""
    global _cache_embeddings
    if _route_cache:
        _cache_embeddings = np.array([entry["embedding"] for entry in _route_cache])
    else:
        _cache_embeddings = None


def _save_cache():
    """Save the route cache to disk."""
    try:
        with open(CACHE_FILE, "w", encoding="utf-8") as f:
            json.dump(_route_cache, f, ensure_ascii=False, indent=2)
    except Exception as e:
        logger.warning(f"Failed to save route cache: {e}")


def _check_cache(question_emb: np.ndarray) -> Optional[str]:
    """Check if a similar question was routed before.

    Returns the cached type_id if found, None otherwise.
    """
    _load_cache()
    if _cache_embeddings is None or len(_route_cache) == 0:
        return None

    # Compute cosine similarity (embeddings are already normalized)
    sims = _cache_embeddings @ question_emb
    best_idx = int(np.argmax(sims))
    best_sim = float(sims[best_idx])

    if best_sim >= CACHE_SIMILARITY_THRESHOLD:
        cached = _route_cache[best_idx]
        logger.info(f"Cache HIT (sim={best_sim:.3f}): '{cached['question'][:50]}...' → {cached['type_id']}")
        return cached["type_id"]

    return None


def _add_to_cache(question: str, question_emb: np.ndarray, type_id: str, source: str):
    """Add a new route to the cache."""
    _load_cache()
    entry = {
        "question": question[:300],
        "embedding": question_emb.tolist(),
        "type_id": type_id,
        "source": source,  # "deepseek" or "minilm_confident"
        "timestamp": datetime.now().isoformat(),
    }
    _route_cache.append(entry)
    _rebuild_cache_embeddings()
    _save_cache()
    logger.info(f"Cached route ({source}): '{question[:50]}...' → {type_id} (total: {len(_route_cache)})")


# ─────────────────────────────────────────────────────────────────────
# DeepSeek LLM call
# ─────────────────────────────────────────────────────────────────────

THINK_OPEN = chr(0x3c) + "think" + chr(0x3e)
THINK_CLOSE = chr(0x2f) + "think" + chr(0x3e)


def _call_deepseek(question: str, candidates: list) -> Optional[str]:
    """Call DeepSeek to pick the best problem type from candidates.

    Returns the type_id string, or None if the call failed.
    """
    cand_list = "\n".join(f"- {pt_id}: {desc}" for pt_id, _, desc in candidates)
    cand_ids = [c[0] for c in candidates]

    payload = {
        "model": DEEPSEEK_MODEL,
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": (
                f"Question: {question[:300]}\n\n"
                f"Candidate problem types (pick one type_id):\n{cand_list}\n\n"
                f"Reply with ONLY the type_id, nothing else."
            )},
        ],
        "temperature": 0,
        "max_tokens": MAX_TOKENS,
    }

    try:
        r = httpx.post(
            DEEPSEEK_API_URL,
            headers={"Authorization": f"Bearer {DEEPSEEK_API_KEY}"},
            json=payload,
            timeout=TIMEOUT_SEC,
        )
        r.raise_for_status()
        content = r.json()["choices"][0]["message"]["content"].strip()

        # Strip thinking tags if present
        pattern = re.escape(THINK_OPEN) + r".*?" + re.escape(THINK_CLOSE)
        content = re.sub(pattern, "", content, flags=re.DOTALL).strip()

        # Look for ANSWER: pattern (in case model adds it)
        answer_match = re.search(r"ANSWER:\s*(\S+)", content, re.IGNORECASE)
        if answer_match:
            answer_text = answer_match.group(1).strip('"').strip("'").strip(".,;:")
        else:
            # Model should return just the type_id — take last non-empty line
            lines = [l.strip() for l in content.split("\n") if l.strip()]
            answer_text = lines[-1] if lines else content

        answer_text = answer_text.strip('"').strip("'").strip()

        # Match against candidate IDs
        for pt_id in cand_ids:
            if pt_id == answer_text or pt_id in answer_text:
                return pt_id

        # Search full content for any candidate ID
        for pt_id in cand_ids:
            if pt_id in content:
                return pt_id

        # No match — return the raw text for debugging
        logger.warning(f"DeepSeek returned unmatched type_id: {answer_text}")
        return None

    except Exception as e:
        logger.error(f"DeepSeek API call failed: {e}")
        return None


# ─────────────────────────────────────────────────────────────────────
# Value extraction — pull actual values from the question text
# ─────────────────────────────────────────────────────────────────────

def _extract_values_from_question(question: str, pt_id: str) -> dict:
    """Extract actual values from the question text based on problem type.

    Returns a dict mapping field names to extracted values.
    e.g. {"numbers": "135, 225"} for HCF/LCM questions.
    """
    q = question.strip()
    result: dict[str, str] = {}

    # ── HCF / LCM: extract all integers from the question ──
    if "hcf" in pt_id or "lcm" in pt_id:
        # Find all integers (not inside words)
        nums = re.findall(r'\b\d+\b', q)
        if len(nums) >= 2:
            result["numbers"] = ", ".join(nums)

    # ── Differentiation: extract expression and variable ──
    elif "differentiat" in pt_id or "derivative" in pt_id:
        # Try to find f(x) = ... or y = ... or just the expression
        eq_match = re.search(r'(?:f\s*\([^)]+\)\s*=\s*|y\s*=\s*|)([a-zA-Z0-9\^\*\+\-\(\)\/\s\.]+)', q)
        if eq_match:
            expr = eq_match.group(1).strip().rstrip('.')
            # Clean up common math notation
            expr = expr.replace('^', '**')
            result["expression"] = expr
        # Variable is usually x
        if 'x' in q.lower():
            result["var"] = "x"
        # Point for evaluate-at-point
        pt_match = re.search(r'(?:at|x\s*=\s*|point\s*\()(-?\d+(?:\.\d+)?)', q, re.IGNORECASE)
        if pt_match:
            result["point"] = pt_match.group(1)

    # ── Integration: extract expression, variable, bounds ──
    elif "integ" in pt_id:
        eq_match = re.search(r'(?:f\s*\([^)]+\)\s*=\s*|y\s*=\s*|)([a-zA-Z0-9\^\*\+\-\(\)\/\s\.]+)', q)
        if eq_match:
            expr = eq_match.group(1).strip().rstrip('.')
            expr = expr.replace('^', '**')
            result["expression"] = expr
        if 'x' in q.lower():
            result["var"] = "x"
        # Bounds: "from 0 to 2" or "0 to 2" or "[0, 2]"
        bounds_match = re.search(r'(?:from\s+)?(-?\d+(?:\.\d+)?)\s*(?:to|,)\s*(-?\d+(?:\.\d+)?)', q, re.IGNORECASE)
        if bounds_match:
            result["lower"] = bounds_match.group(1)
            result["upper"] = bounds_match.group(2)

    # ── Quadratic / equation solving: extract equation ──
    elif "quadratic" in pt_id or "solve_equation" in pt_id or "root" in pt_id:
        # Find equation like x^2 - 5x + 6 = 0
        eq_match = re.search(r'([a-zA-Z0-9\^\*\+\-\(\)\/\s\.]+?)\s*=\s*(\d+)', q)
        if eq_match:
            expr = eq_match.group(1).strip()
            expr = expr.replace('^', '**')
            result["expression"] = expr
            result["rhs"] = eq_match.group(2)
        if 'x' in q.lower():
            result["var"] = "x"

    # ── Percentage: extract part, whole, or percent ──
    elif "percent" in pt_id:
        nums = re.findall(r'\b\d+(?:\.\d+)?\b', q)
        if '%' in q or 'percent' in q.lower():
            # The percent value is the one near % or "percent"
            pct_match = re.search(r'(\d+(?:\.\d+)?)\s*(?:%|percent)', q, re.IGNORECASE)
            if pct_match:
                result["percent"] = pct_match.group(1)
                # Other numbers are part/whole
                other_nums = [n for n in nums if n != pct_match.group(1)]
                if len(other_nums) >= 1:
                    result["whole"] = other_nums[0]
        else:
            if len(nums) >= 2:
                result["part"] = nums[0]
                result["whole"] = nums[1]

    # ── Profit/Loss: extract CP and SP ──
    elif "profit" in pt_id or "loss" in pt_id:
        nums = re.findall(r'\b\d+(?:\.\d+)?\b', q)
        cp_match = re.search(r'(?:cost|cp|bought|purchase)[^0-9]*(\d+(?:\.\d+)?)', q, re.IGNORECASE)
        sp_match = re.search(r'(?:sold|sp|selling)[^0-9]*(\d+(?:\.\d+)?)', q, re.IGNORECASE)
        if cp_match:
            result["cp"] = cp_match.group(1)
        if sp_match:
            result["sp"] = sp_match.group(1)
        if not cp_match and not sp_match and len(nums) >= 2:
            result["cp"] = nums[0]
            result["sp"] = nums[1]

    # ── Simple/Ccompound Interest: extract P, R, T ──
    elif "interest" in pt_id:
        nums = re.findall(r'\b\d+(?:\.\d+)?\b', q)
        p_match = re.search(r'(?:principal|sum|amount|invested|deposited|loan)[^0-9]*(\d+(?:\.\d+)?)', q, re.IGNORECASE)
        r_match = re.search(r'(\d+(?:\.\d+)?)\s*(?:%|per\s*cent|p\.?a\.?)', q, re.IGNORECASE)
        t_match = re.search(r'(\d+(?:\.\d+)?)\s*(?:year|yr|month)', q, re.IGNORECASE)
        if p_match:
            result["principal"] = p_match.group(1)
        if r_match:
            result["rate"] = r_match.group(1)
        if t_match:
            result["time"] = t_match.group(1)
        # Fallback: assign by position
        if "principal" not in result and len(nums) >= 1:
            result["principal"] = nums[0]
        if "rate" not in result and len(nums) >= 2:
            result["rate"] = nums[1]
        if "time" not in result and len(nums) >= 3:
            result["time"] = nums[2]

    # ── Ratio/Proportion: extract a, b, c ──
    elif "ratio" in pt_id or "proportion" in pt_id:
        # Look for a:b = c:d pattern
        ratio_match = re.search(r'(\d+)\s*:\s*(\d+)\s*=\s*(\d+)\s*:\s*(\d+)', q)
        if ratio_match:
            result["a"] = ratio_match.group(1)
            result["b"] = ratio_match.group(2)
            result["c"] = ratio_match.group(3)
        else:
            nums = re.findall(r'\b\d+(?:\.\d+)?\b', q)
            if len(nums) >= 3:
                result["a"] = nums[0]
                result["b"] = nums[1]
                result["c"] = nums[2]

    # ── General: extract all numbers as fallback ──
    else:
        # Try to find an expression
        eq_match = re.search(r'=\s*([a-zA-Z0-9\^\*\+\-\(\)\/\s\.]+)', q)
        if eq_match:
            expr = eq_match.group(1).strip().rstrip('.')
            expr = expr.replace('^', '**')
            if len(expr) > 2:
                result["expression"] = expr

    return result


# ─────────────────────────────────────────────────────────────────────
# Variable extraction — returns the input form fields for a problem type
# ─────────────────────────────────────────────────────────────────────

def _get_variables_needed(pt: ProblemType) -> list:
    """Get the list of input fields the student needs to fill for this problem type."""
    fields = []
    for step in pt.steps:
        step_type = STEP_TYPES.get(step.step_type_id)
        if step_type is None:
            continue
        for inp in step_type.inputs:
            fields.append({
                "step_index": len(fields),
                "step_label": step.label,
                "step_type_id": step.step_type_id,
                "name": inp.name,
                "label": inp.label,
                "type": inp.field_type,
                "required": inp.required,
                "default": inp.default,
                "placeholder": inp.placeholder,
                "help_text": inp.help_text,
            })
    return fields


# ─────────────────────────────────────────────────────────────────────
# Main routing function — three-stage: cache → MiniLM confidence → DeepSeek
# ─────────────────────────────────────────────────────────────────────

def route_question(question: str) -> dict:
    """Route a free-text question to a problem type.

    Three-stage routing:
    1. Check embedding cache — instant, free (reuses past DeepSeek results)
    2. MiniLM confidence skip — fast, free (skip DeepSeek if very confident)
    3. DeepSeek final pick — slow, paid (only for ambiguous cases)

    Every result is cached for future use.

    Returns a dict with:
    - question: the input question
    - best_match: the selected problem type id, or None
    - candidates: top-5 MiniLM candidates with similarity scores
    - problem_type: full problem type info (name, description, topic, etc.)
    - variables: list of input fields the student needs to fill
    - thinking: competency question to ask before showing the form
    - error: error message if routing failed
    - route_source: "cache" | "minilm" | "deepseek" (how the route was determined)
    """
    if not question or not question.strip():
        return {
            "question": question or "",
            "best_match": None,
            "candidates": [],
            "problem_type": None,
            "variables": [],
            "thinking": None,
            "error": "Please type a question.",
            "route_source": "none",
        }

    # Embed the question once — reused for cache check and MiniLM
    question_emb = _embed_question(question)

    # Stage 1: MiniLM top-5 (always compute — we need candidates for the response)
    embedder = _get_embedder()
    q_emb_batch = question_emb.reshape(1, -1)
    sims = embedder.similarity(q_emb_batch, _pt_embeddings)[0].numpy()
    top_idx = np.argsort(sims)[::-1][:5]
    candidates = [
        (_pt_ids[i], float(sims[i]), PROBLEM_TYPE_DESCRIPTIONS[_pt_ids[i]])
        for i in top_idx
    ]

    # Stage 2: Check embedding cache (instant, free)
    best_match = _check_cache(question_emb)
    route_source = "cache"

    if best_match is None:
        # Stage 3: MiniLM confidence skip (fast, free)
        top_score = candidates[0][1]
        second_score = candidates[1][1] if len(candidates) > 1 else 0
        gap = top_score - second_score

        if top_score > MINILM_CONFIDENCE_THRESHOLD and gap > MINILM_GAP_THRESHOLD:
            logger.info(f"MiniLM confident (score={top_score:.3f}, gap={gap:.3f}), skipping DeepSeek")
            best_match = candidates[0][0]
            route_source = "minilm"
        else:
            # Stage 4: DeepSeek final pick (slow, paid)
            logger.info(f"MiniLM unsure (score={top_score:.3f}, gap={gap:.3f}), calling DeepSeek")
            best_match = _call_deepseek(question, candidates)
            route_source = "deepseek"

    # Cache the result (don't re-cache if it came from cache)
    if best_match and route_source != "cache":
        _add_to_cache(question, question_emb, best_match, route_source)

    # Build response
    result = {
        "question": question,
        "best_match": best_match,
        "candidates": [
            {"type_id": pt_id, "score": round(score, 3), "description": desc}
            for pt_id, score, desc in candidates
        ],
        "problem_type": None,
        "variables": [],
        "extracted_values": {},
        "thinking": None,
        "error": None if best_match else "Could not identify problem type. Try rephrasing or pick manually.",
        "route_source": route_source,
    }

    if best_match and best_match in PROBLEM_TYPES:
        pt = PROBLEM_TYPES[best_match]
        result["problem_type"] = {
            "id": pt.id,
            "name": pt.name,
            "description": pt.description,
            "topic": pt.topic,
            "class_level": pt.class_level,
            "board": pt.board,
            "marks": pt.marks,
            "example": pt.example,
            "num_steps": len(pt.steps),
            "hint": pt.hint,
            "setup_help": pt.setup_help,
        }
        result["variables"] = _get_variables_needed(pt)
        result["extracted_values"] = _extract_values_from_question(question, best_match)
        if pt.thinking:
            result["thinking"] = {
                "question": pt.thinking.question,
                "options": pt.thinking.options,
                "correct": pt.thinking.correct,
                "explanation": pt.thinking.explanation,
            }

    return result


def get_variables_for_problem_type(pt_id: str) -> Optional[list]:
    """Get the list of variables a student needs to input for a specific problem type."""
    pt = PROBLEM_TYPES.get(pt_id)
    if pt is None:
        return None
    return _get_variables_needed(pt)


def get_cache_stats() -> dict:
    """Get statistics about the route cache."""
    _load_cache()
    sources = {}
    for entry in _route_cache:
        src = entry.get("source", "unknown")
        sources[src] = sources.get(src, 0) + 1
    return {
        "total_cached": len(_route_cache),
        "by_source": sources,
        "cache_file": CACHE_FILE,
    }
