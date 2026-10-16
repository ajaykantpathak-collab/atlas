"""page_solve.py — LIVE PAGE SOLVE: a student photographs a full textbook
exercise and every question on the page gets its own verified verdict chip,
positioned over the question it answers.

This is the whole-page twin of the /solve-image path (api/verified_practice):
SAME vision-first extraction (LLM transcribes, never answers), SAME
split_questions segmentation, SAME deterministic answer pipeline, SAME
repertoire attachment and solve_isolation budget/pool.  What is new is
COORDINATES: the vision pass is asked for a per-question block position
(a normalized y-range — one box per question) so the page can "solve
itself" in place, question by question.

Extraction contract (extraction only, never answering — the photo never
bypasses the truth gates):
  1. VISION BOXES   the vision model returns one JSON object per question
                    with its text and y0/y1 extent (fraction of page
                    height).  The array is fished out of whatever prose
                    the model wraps it in; anything malformed or empty
                    is discarded.
  2. LINE HEURISTIC (deterministic fallback, no ML) when boxes are
                    missing or unusable: the plain-text extraction feeds
                    split_questions, and a PIL row-ink profile of the
                    photo locates the text bands — the n question
                    segments are laid onto the n largest bands in
                    reading order.
  3. EVEN SHARE     last resort if the image is unreadable as pixels:
                    equal vertical slices in reading order.  Boxes are
                    labelled with their source either way
                    ("vision" | "line_heuristic" | "even_share") so the
                    UI never dresses an estimate up as a measurement.

Every question is solved SEPARATELY through solve_isolation.run_async
(off the event loop, hard budget, background-completion cache — the
same lane key as /solve so a page question already solved once is
served instantly everywhere).  Honesty invariants, enforced here:

  * a question's ``answer``/``numeric`` are non-null ONLY on VERIFIED
    tiers — a guided part never leaks an answer, only its method;
  * beyond PAGE_MAX_QUESTIONS the page is TRUNCATED with an explicit
    note, never silently dropped;
  * node ids never enter display strings (repertoire travels as URLs /
    sim ids exactly as on every other doubt surface).
"""

from __future__ import annotations

import asyncio
import json
import os
import re
import time
from typing import Any, Dict, List, Optional, Tuple

#: A single page solve answers at most this many questions; beyond it the
#: response says so honestly instead of silently cutting the page.
PAGE_MAX_QUESTIONS = 12

_MIN_BOX_HEIGHT = 0.01          # a 1%-of-page band is not a question block
_MAX_BLOCK_TOKENS = 4000        # total transcription budget, same as /solve-image

# --------------------------------------------------------------------------- #
# Vision prompts — extraction only, never answering.
# --------------------------------------------------------------------------- #

#: Boxed pass: transcription + per-question vertical extent, JSON only.
_BOX_PROMPT = (
    "This is a photo of a textbook exercise page. Transcribe EACH question "
    "on the page separately, top to bottom. Output ONLY a JSON array, one "
    "object per question, in reading order:\n"
    '[{"text": "<the full question text>", "y0": <top>, "y1": <bottom>}]\n'
    "y0 is where the question's text block STARTS and y1 where it ENDS, as "
    "a fraction of the image height (0.0 = very top of the page, 1.0 = "
    "very bottom). Preserve every number, unit and mathematical notation "
    "(write x^2, sqrt(3), fractions as a/b). No commentary, no answers, no "
    "markdown fences — the JSON array must be your ENTIRE final answer. "
    "If the page has no readable question, output []"
)

#: Plain pass — byte-identical in intent to _OCR_PROMPT in
#: api/verified_practice.py (kept local so the solver layer never imports
#: the API layer).  If that prompt is ever tuned, tune this one to match.
_PLAIN_PROMPT = (
    "Transcribe the exam question in this image exactly. Output ONLY the "
    "question text — no commentary, no answer, no formatting. Preserve "
    "numbers, units, and mathematical notation (write x^2, sqrt(3), "
    "fractions as a/b). If the image contains no readable question, "
    "output exactly: UNREADABLE")


def _clean_llm_text(text: str) -> str:
    """Strip thinking/reasoning blocks (same rule as the API layer)."""
    text = re.sub(r"<(thought|think|reasoning)>.*?</\1>",
                  "", text, flags=re.S | re.I)
    text = re.sub(r"</?(thought|think|reasoning)>", "", text, flags=re.I)
    return text.strip()


async def _vision_chat(image_bytes: bytes, media_type: str,
                       prompt: str, max_tokens: int) -> str:
    """The ONE vision call site of this module (tests monkeypatch this)."""
    import base64
    from backend.services.llm_client import get_llm_client
    b64 = base64.b64encode(image_bytes).decode()
    client = get_llm_client()
    return await client.chat(
        [{"role": "user", "content": [
            {"type": "text", "text": prompt},
            {"type": "image_url",
             "image_url": {"url": f"data:{media_type};base64,{b64}"}}]}],
        temperature=0.0, max_tokens=max_tokens, use_cache=False,
        model=os.environ.get("VISION_MODEL", "gemma-4-26b-a4b-it"))


# --------------------------------------------------------------------------- #
# Box parsing / normalisation
# --------------------------------------------------------------------------- #

def _last_json_array(text: str, max_tries: int = 10) -> Optional[str]:
    """The last balanced ``[...]`` array in a model response.

    Real vision models reason in plain text BEFORE (and sometimes after)
    the payload no matter what the prompt forbids, so the array has to be
    fished out of surrounding prose.  Scanning from the last ``]`` back to
    its matching ``[`` survives trailing commentary; on a parse-shaped
    mismatch the scan steps back one close-bracket and tries again
    (brackets inside string values can fool a naive depth count, so
    json.loads stays the judge)."""
    end = text.rfind("]")
    while end != -1 and max_tries > 0:
        depth = 0
        for i in range(end, -1, -1):
            c = text[i]
            if c == "]":
                depth += 1
            elif c == "[":
                depth -= 1
                if depth == 0:
                    return text[i:end + 1]
        end = text.rfind("]", 0, end)
        max_tries -= 1
    return None


def _parse_boxed(raw: str) -> Optional[List[Dict[str, Any]]]:
    """Parse the vision model's boxed-JSON into validated blocks.

    Returns None on ANY structural problem (no JSON array, a block
    without usable text, degenerate ranges) — the caller then falls
    back, rather than rendering boxes the model never really gave.
    """
    if not raw:
        return None
    text = _clean_llm_text(raw)
    text = re.sub(r"^```(?:json)?|```$", "", text.strip(),
                  flags=re.IGNORECASE | re.MULTILINE).strip()
    candidate = _last_json_array(text)
    if candidate is None:
        return None
    try:
        doc = json.loads(candidate)
    except Exception:
        return None
    if not isinstance(doc, list) or not doc:
        return None
    blocks: List[Dict[str, Any]] = []
    for item in doc:
        if not isinstance(item, dict):
            continue
        body = str(item.get("text") or "").strip()
        if len(body) < 12:                      # marker/noise fragments only
            continue
        try:
            y0 = float(item.get("y0"))
            y1 = float(item.get("y1"))
        except (TypeError, ValueError):
            return None                          # boxes promised, not delivered
        if not (0.0 <= y0 < y1 <= 1.0000001) or (y1 - y0) < _MIN_BOX_HEIGHT:
            return None
        blocks.append({"text": body[:_MAX_BLOCK_TOKENS],
                       "bbox": [0.0, min(y0, 1.0), 1.0, min(y1, 1.0)]})
    if not blocks:
        return None
    blocks.sort(key=lambda b: b["bbox"][1])      # reading order
    return blocks


def _dedupe_blocks(blocks: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Drop exact-duplicate transcriptions (model double-fires happen);
    first (topmost) box wins."""
    seen: set = set()
    out: List[Dict[str, Any]] = []
    for block in blocks:
        key = re.sub(r"\s+", " ", block["text"]).strip().lower()
        if key in seen:
            continue
        seen.add(key)
        out.append(block)
    return out


# --------------------------------------------------------------------------- #
# Deterministic box fallbacks
# --------------------------------------------------------------------------- #

def _heuristic_boxes(image_bytes: bytes, n: int) -> Optional[List[List[float]]]:
    """Line-position heuristic: locate the page's text bands with a row-ink
    profile (PIL + numpy only, no OCR binary) and lay the n question
    segments onto the n bands in reading order.

    Deterministic and honest — it measures where ink is on the page, so
    chips land on text blocks even when the vision model declined to
    give boxes.  Returns None when the image cannot be profiled.
    """
    if n < 1:
        return None
    try:
        import io
        import numpy as np
        from PIL import Image
        img = Image.open(io.BytesIO(image_bytes)).convert("L")
        w, h = img.size
        if w < 24 or h < 24:
            return None
        scale = min(1.0, 900.0 / max(w, h))       # profile resolution cap
        if scale < 1.0:
            img = img.resize((max(1, int(w * scale)),
                              max(1, int(h * scale))))
        a = np.asarray(img, dtype=np.uint8)
        H = a.shape[0]
        ink = (a < 160).mean(axis=1)               # dark-pixel fraction/row
        rows = ink > 0.01
        bands: List[List[int]] = []
        start = None
        for i, on in enumerate(rows):
            if on and start is None:
                start = i
            elif not on and start is not None:
                bands.append([start, i])
                start = None
        if start is not None:
            bands.append([start, H])
        bands = [b for b in bands if b[1] - b[0] >= 2]      # drop specks
        if not bands:
            return None
        # Merge bands separated by a sub-line gap (<1.5% page height):
        # consecutive LINES of one question stay one block.
        merged = [bands[0]]
        for s, e in bands[1:]:
            if s - merged[-1][1] < max(2, int(0.015 * H)):
                merged[-1][1] = e
            else:
                merged.append([s, e])
        # Merge the closest pair until n blocks remain…
        while len(merged) > n:
            _, idx = min((merged[i + 1][0] - merged[i][1], i)
                         for i in range(len(merged) - 1))
            merged[idx][1] = merged[idx + 1][1]
            del merged[idx + 1]
        # …or split the tallest block until n is reached.
        while len(merged) < n:
            idx = max(range(len(merged)),
                      key=lambda k: merged[k][1] - merged[k][0])
            if merged[idx][1] - merged[idx][0] < 4:
                return None                          # page has no room to split
            mid = (merged[idx][0] + merged[idx][1]) // 2
            merged[idx:idx + 1] = [[merged[idx][0], mid], [mid, merged[idx][1]]]
        return [[0.0, s / H, 1.0, e / H] for s, e in merged]
    except Exception:
        return None


def _even_boxes(n: int) -> List[List[float]]:
    """Last-resort placement: equal vertical slices in reading order."""
    n = max(1, n)
    return [[0.0, i / n, 1.0, (i + 1) / n] for i in range(n)]


def _subsplit_block(text: str, bbox: List[float]) -> List[Tuple[str, List[float]]]:
    """One vision block can hold more than one marker-numbered question
    (models merge short items).  Reuse split_questions EXACTLY as
    /solve-image does, sharing the block's y-range evenly among the
    sub-segments so each keeps an honest position."""
    from backend.its.solver.image_questions import split_questions
    segs = split_questions(text)
    if len(segs) <= 1:
        # split_questions still strips a line-start exercise marker from
        # a single-question block — serve its cleaned body, never the raw
        # transcription ("1. Solve for x..." must not reach the pipeline).
        return [(segs[0] if segs else text.strip(), bbox)]
    x0, y0, x1, y1 = bbox
    height = (y1 - y0) / len(segs)
    return [(seg, [x0, round(y0 + i * height, 6),
                   x1, round(y0 + (i + 1) * height, 6)])
            for i, seg in enumerate(segs)]


# --------------------------------------------------------------------------- #
# Extraction: boxes first, deterministic fallbacks after
# --------------------------------------------------------------------------- #

async def _extract_blocks(image_bytes: bytes,
                          media_type: str) -> Tuple[List[Dict[str, Any]], str]:
    """Transcribe the page -> (question blocks with normalized boxes, source).

    Order of trust:
      1. vision boxes ("vision")
      2. plain transcription + line-position heuristic ("line_heuristic")
      3. plain transcription + even share ("even_share")
    An unreadable page returns ([], source "unreadable").
    """
    try:
        raw = await _vision_chat(image_bytes, media_type, _BOX_PROMPT, 3000)
        blocks = _parse_boxed(raw or "")
    except Exception:
        blocks = None
    if blocks is not None:
        return _dedupe_blocks(blocks), "vision"

    # Plain transcription (same prompt/limits as /solve-image), then
    # deterministic placement of the segmented questions.
    try:
        raw = await _vision_chat(image_bytes, media_type, _PLAIN_PROMPT, 800)
    except Exception:
        raw = ""
    text = _clean_llm_text(raw or "")
    if (not text or "UNREADABLE" in text or "[LLM error" in text
            or text.lower().startswith(("sorry", "i can't", "error"))):
        return [], "unreadable"
    text = text[:_MAX_BLOCK_TOKENS]

    from backend.its.solver.image_questions import split_questions
    segs = split_questions(text)
    boxes = _heuristic_boxes(image_bytes, len(segs))
    source = "line_heuristic"
    if boxes is None:
        boxes = _even_boxes(len(segs))
        source = "even_share"
    return [{"text": seg, "bbox": box} for seg, box in zip(segs, boxes)], source


# --------------------------------------------------------------------------- #
# Per-question solve — the same truth path as /solve, budgeted and cached
# --------------------------------------------------------------------------- #

async def _solve_one(question_text: str) -> Dict[str, Any]:
    """One question -> one honest verdict payload.

    Runs the deterministic pipeline on the dedicated solve pool under the
    hard budget (solve_isolation.run_async) — the same lane key as /solve,
    so a question solved once (typed or on a page) is served from cache.
    Repertoire + guided teaching attach exactly as on every other doubt
    surface: index lookups only, nulls when nothing honest matches, and a
    guided part NEVER carries an answer.
    """
    from backend.its.solver.answer_pipeline import answer as pipeline_answer
    from backend.services.solve_isolation import (
        GUIDED_METHOD_STEPS, cache_key, default_budget, run_async,
        saturation_refusal_reason, timeout_refusal_reason)

    outcome = await run_async(cache_key("verified_practice.solve",
                                        question_text),
                              pipeline_answer, question_text)

    if outcome.timed_out or outcome.saturated:
        payload: Dict[str, Any] = {
            "tier": "GUIDED_PRACTICE",
            "solved": False,
            "answer": None,
            "numeric": None,
            "steps": list(GUIDED_METHOD_STEPS),
            "socratic": None,
            "refusal_reason": (timeout_refusal_reason(default_budget())
                               if outcome.timed_out
                               else saturation_refusal_reason()),
            "elapsed_ms": round(outcome.elapsed_ms),
            "cached": False,
        }
        payload["text"] = question_text
        return _attach_repertoire_and_guidance(payload, question_text)

    result = outcome.result
    verified = result.label in ("VERIFIED", "VERIFIED_WITH_ASSUMPTIONS")
    payload = {
        "tier": result.label,
        "solved": result.label in ("VERIFIED", "VERIFIED_WITH_ASSUMPTIONS",
                                   "VERIFIED_OFFICIAL"),
        # HONESTY INVARIANT: the answer exists only on a verified tier.
        "answer": result.answer if verified else None,
        "numeric": result.numeric if verified else None,
        "steps": list(result.steps or []),
        "socratic": result.socratic,
        "refusal_reason": result.refusal_reason if not verified else None,
        "elapsed_ms": round(result.audit.elapsed_ms
                            if getattr(result, "audit", None) is not None
                            else outcome.elapsed_ms),
        "cached": outcome.cached,
    }
    payload["text"] = question_text
    return _attach_repertoire_and_guidance(payload, question_text)


def _attach_repertoire_and_guidance(payload: Dict[str, Any],
                                    question_text: str) -> Dict[str, Any]:
    """Repertoire + guided teaching, the shared doubt-surface additions.

    Mirrors api.verified_practice._with_repertoire (kept local so the
    solver layer never imports the API layer): repertoire is an exact
    index lookup resolving from the solve's own audit trail; guided
    teaching rides only on non-verified tiers.
    """
    try:
        from backend.its.solver.repertoire import attach_repertoire
        payload["repertoire"] = attach_repertoire(payload)
    except Exception:
        payload["repertoire"] = {"node_id": None, "doodle": None,
                                 "diagram": None, "sim": None,
                                 "sim_title": None}
    tier = str(payload.get("tier") or "")
    if not tier.startswith("VERIFIED"):
        try:
            from backend.services.misconception_corrector import correction_for
            guided = correction_for(None, question_text)
            payload["guided_teaching"] = (guided if any(guided.values())
                                          else None)
        except Exception:
            payload["guided_teaching"] = None
    else:
        payload["guided_teaching"] = None
    return payload


# --------------------------------------------------------------------------- #
# solve_page — the one entry the endpoint calls
# --------------------------------------------------------------------------- #

async def solve_page(image_bytes: bytes, media_type: str = "image/jpeg",
                     max_questions: int = PAGE_MAX_QUESTIONS) -> Dict[str, Any]:
    """Photograph of a full exercise page -> per-question boxes + verdicts.

    Returns::

        {"questions": [{text, bbox: [x0, y0, x1, y1] (normalized),
                        tier, solved, answer?, numeric?, steps,
                        refusal_reason?, guided_teaching?, repertoire,
                        elapsed_ms, cached}, ...],
         "count": n, "multi_question": true,
         "overall": "verified" | "partial" | "guided",
         "n_verified": k,
         "truncated": bool, "truncation_note": str | None,
         "box_source": "vision" | "line_heuristic" | "even_share",
         "extracted_text": str, "elapsed_ms": total}
    """
    from backend.its.solver.part_splitter import overall_verdict

    started = time.perf_counter()
    blocks, box_source = await _extract_blocks(image_bytes, media_type)
    if not blocks:
        return {"questions": [], "count": 0, "multi_question": True,
                "overall": "guided", "n_verified": 0,
                "truncated": False, "truncation_note": None,
                "box_source": box_source, "extracted_text": "",
                "elapsed_ms": 0}

    # Flatten blocks -> questions (a block may carry several numbered
    # questions; split_questions + an even y-split of the block keep
    # every question its own verdict and its own position).
    questions: List[Tuple[str, List[float]]] = []
    seen: set = set()
    for block in blocks:
        for seg_text, bbox in _subsplit_block(block["text"], block["bbox"]):
            key = re.sub(r"\s+", " ", seg_text).strip().lower()
            if key in seen or len(key) < 8:
                continue
            seen.add(key)
            questions.append((seg_text, bbox))

    # CAP: beyond PAGE_MAX_QUESTIONS the page is truncated HONESTLY —
    # top-of-page questions first, explicit note about the remainder.
    truncated = len(questions) > max_questions
    truncation_note = None
    if truncated:
        dropped = len(questions) - max_questions
        truncation_note = (
            f"This page has {len(questions)} questions; one solve answers "
            f"the first {max_questions}. Photograph the remaining "
            f"{dropped} separately — they are not forgotten, just not "
            "guessed.")
        questions = questions[:max_questions]

    # WARM-START: the first solve runs SOLO.  A cold lane builds its
    # one-time singletons (MiniLM, spacy, the formula graph) inside that
    # solve's own budget; fanning out cold put four workers on the same
    # init wall and the last one past it bust its budget into an honest
    # but avoidable GUIDED_PRACTICE.  After the first answer the lane is
    # warm, so the remaining questions fan out concurrently — same
    # wall-clock on a warm service, robust on the first photo after a
    # restart.
    solved = [await _solve_one(questions[0][0])]
    if len(questions) > 1:
        solved += await asyncio.gather(*[_solve_one(q) for q, _ in questions[1:]])
    for entry, (_, bbox) in zip(solved, questions):
        entry["bbox"] = bbox

    tiers = [q["tier"] for q in solved]
    total_ms = round((time.perf_counter() - started) * 1000)
    return {
        "questions": solved,
        "count": len(solved),
        "multi_question": True,
        "overall": overall_verdict(tiers),
        "n_verified": sum(1 for t in tiers if str(t).startswith("VERIFIED")),
        "truncated": truncated,
        "truncation_note": truncation_note,
        "box_source": box_source,
        "extracted_text": "\n".join(q for q, _ in questions),
        "elapsed_ms": total_ms,
    }


__all__ = ["solve_page", "PAGE_MAX_QUESTIONS"]
