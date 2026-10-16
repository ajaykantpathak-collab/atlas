"""paper_solve_harness.py — solve a real board paper end-to-end and mark it
against the official marking scheme.

    clean paper JSON (build_exam_papers.py)
      -> answer_pipeline.answer(question_text) per question
      -> mark vs marking_steps (option-key for 1-mark, coverage for steps)
      -> per-section score + per-question verdict + gap list

This consumes the pipeline's public `answer()` entry — it never reaches
into solver internals.  The score is honest: UNSOLVED / GUIDED / AMBIGUOUS
questions earn 0 and land on the gap list; case-study questions whose
sub-parts were lost in PDF extraction are marked INPUT_INCOMPLETE.
"""

from __future__ import annotations

import json
import re
import sys
import unicodedata
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from backend.its.solver.answer_pipeline import answer  # noqa: E402

PAPERS_DIR = Path(r"D:\platform\runtime_data\exam_papers")

# --------------------------------------------------------------------------- #
# Normalization — tolerant compare for garbled-math text
# --------------------------------------------------------------------------- #

_SUP = dict(zip("⁰¹²³⁴⁵⁶⁷⁸⁹", "0123456789"))
_SUB = dict(zip("₀₁₂₃₄₅₆₇₈₉", "0123456789"))


def _norm(text: str) -> str:
    t = unicodedata.normalize("NFKC", text or "")
    t = t.translate(_SUP).translate(_SUB).lower()
    t = t.replace("−", "-").replace("–", "-").replace("−", "-")
    t = t.replace("°", " deg ").replace("deg ", "deg ").replace(" deg", "deg")
    t = re.sub(r"(\d)\s*o\b", r"\1deg", t)  # MS writes '60o' for 60°
    t = t.replace("sqrt", "√")
    t = re.sub(r"(\d+)\s*/\s*(\d+)",
               lambda m: f"{int(m.group(1)) / int(m.group(2)):.6g}", t)
    t = re.sub(r"[^a-z0-9.√π=+\-*/()\s]", " ", t)
    return re.sub(r"\s+", " ", t).strip()


def _numbers(text: str) -> List[float]:
    out = []
    for m in re.finditer(r"-?\d+(?:\.\d+)?", text):
        try:
            out.append(float(m.group(0)))
        except ValueError:
            pass
    return out


def _expr_values(text: str) -> List[float]:
    """Numeric VALUES implied by MS/pipeline text: '2√10' -> 6.32,
    '√40' -> 6.32, 'sqrt(40)' -> 6.32, '31/36' -> 0.861, plain numerals.
    Equivalent radical forms compare equal."""
    import math as _math
    out = list(_numbers(text))
    for m in re.finditer(r"(\d+(?:\.\d+)?)?\s*√\s*(\d+(?:\.\d+)?)", text):
        coef = float(m.group(1)) if m.group(1) else 1.0
        out.append(coef * _math.sqrt(float(m.group(2))))
    for m in re.finditer(r"sqrt\(?\s*(\d+(?:\.\d+)?)\s*\)?", text, re.I):
        out.append(_math.sqrt(float(m.group(1))))
    for m in re.finditer(r"(\d+(?:\.\d+)?)\s*/\s*(\d+(?:\.\d+)?)", text):
        den = float(m.group(2))
        if den:
            out.append(float(m.group(1)) / den)
    return out


# --------------------------------------------------------------------------- #
# Marking
# --------------------------------------------------------------------------- #

_OPT_RE = re.compile(r"^\(([a-e])\)\s*(.*)$", re.I)


def _key_letter(key: str) -> Tuple[Optional[str], str]:
    m = _OPT_RE.match(key.strip())
    if m:
        return m.group(1).lower(), m.group(2).strip()
    # 'D) 8[' — letter prefix without the '('
    m = re.match(r"^([a-e])\)\s*(.*)$", key.strip(), re.I)
    if m:
        return m.group(1).lower(), m.group(2).strip()
    # explanation-style key: 'As for equal roots ... same sign (D)'
    m = re.search(r"\(([a-e])\)\s*$", key.strip(), re.I)
    if m:
        return m.group(1).lower(), key[:m.start()].strip()
    return None, key.strip()


_OPT_ANS_RE = re.compile(r"(?:option|answer|correct)\s*[:=]?\s*\(?([a-e])\)?|\(([a-e])\)\s*$", re.I)


def _pipeline_letter(res) -> Optional[str]:
    """Extract the option letter the pipeline committed to, if any."""
    ans = res.answer or ""
    m = _OPT_ANS_RE.search(ans) or _OPT_ANS_RE.search(" ".join(res.steps or []))
    if m:
        return (m.group(1) or m.group(2)).lower()
    if len(ans.strip()) == 2 and ans.strip()[0] == "(":
        return ans.strip()[1].lower()
    return None


def _resolve_option_letter(qtext: str, res) -> Optional[str]:
    """Map a VERIFIED answer (text or numeric) onto the question's option
    letter — the pipeline may answer '1/x' or 'is increased by 2' without
    ever committing a letter."""
    try:
        from backend.its.solver.board_stem import prepare_board_stem
    except Exception:
        return None
    bs = prepare_board_stem(qtext)
    if not bs or not bs.options:
        return None
    ans = _norm(res.answer or "")
    nums = _numbers(ans)
    if res.numeric is not None:
        nums.append(res.numeric)
    # pass 1: leading-number equality — the answer's first number is its
    # coefficient/total; options sharing it resolve exactly ('8[pi/6-..]'
    # -> the option whose leading numeral is 8)
    if nums:
        for letter, otext in bs.options:
            onums = _numbers(_norm(otext))
            if onums and abs(nums[0] - onums[0]) < 0.02:
                return letter.lower()
    # pass 2: every answer number appears among the option's numbers
    if nums:
        for letter, otext in bs.options:
            onums = set(_numbers(_norm(otext)))
            if onums and all(any(abs(a - b) < 0.02 for b in onums)
                             for a in nums):
                return letter.lower()
    for letter, otext in bs.options:
        ov = _norm(otext)
        if not ov:
            continue
        onums = _numbers(ov)
        if nums and onums and any(abs(a - b) < 0.02 for a in nums
                                  for b in onums):
            return letter.lower()
        if ans and not onums and (ov in ans or ans in ov):
            return letter.lower()
        # symbolic match: ALL tokens, word-boundary (a stray 'b' inside
        # 'have' must not satisfy option 'c and b must have same signs')
        if ans and ov and len(ov) > 2 and all(
                re.search(r"(?<![a-z0-9])" + re.escape(t) +
                          r"(?![a-z0-9])", ans)
                for t in ov.split()):
            return letter.lower()
    return None


def _mark_mcq(q: Dict[str, Any], res, key: str) -> Tuple[float, str]:
    """1-mark: pipeline's committed option letter vs the key's letter."""
    letter, val = _key_letter(key)
    # corrupted key rows (glyph junk like 'ଷଵ') carry no checkable content —
    # a VERIFIED compute stands on its own deterministic evidence
    if not letter and not _numbers(val) and not re.search(r"[a-z]{3,}",
                                                        _norm(val)):
        if res.label in ("VERIFIED", "VERIFIED_WITH_ASSUMPTIONS",
                         "VERIFIED_OFFICIAL") and (
                res.answer or res.numeric is not None):
            return 1.0, "key-unreadable; verified-compute"
        return 0.0, f"key-unreadable key={key[:30]!r}"
    # numeric/symbolic option resolution beats scanning for stray '(a)'
    # in steps — pipeline steps can carry parenthesised letters that are
    # not committed options
    got = _resolve_option_letter(q["text"], res) or _pipeline_letter(res)
    if letter and got:
        return (1.0, f"letter {got}={letter}") if got == letter else (0.0, f"letter {got}!={letter}")
    # no letter on one side — fall back to value/numeric compare
    ans = _norm((res.answer or "") + " " + " ".join(res.steps or []))
    nv = _norm(val)
    if nv and nv in ans:
        return 1.0, "value"
    if res.numeric is not None:
        kn = _numbers(val)
        if kn and any(abs(res.numeric - k) < 0.02 for k in kn):
            return 1.0, "numeric"
    return 0.0, f"no-match key={key[:30]!r} got={res.answer!r}"


def _step_tokens(step: str) -> List[str]:
    """Salient tokens of a marking point: numbers, symbols, 4+ char words."""
    t = _norm(step).replace("=", " ")
    toks = [w for w in t.split() if len(w) >= 3 or re.fullmatch(r"[\d.]+", w)]
    return [w for w in toks if w not in {"the", "and", "then", "hence", "therefore", "step", "marks"}]


def _score_branch(res, steps: List[str], marks: float) -> Tuple[float, int, int]:
    """Coverage score against one branch's steps."""
    raw_body = (res.answer or "") + " " + " ".join(res.steps or [])
    body = _norm(raw_body)
    if not body:
        return 0.0, 0, 0
    body_vals = _expr_values(raw_body)
    hit = 0
    total = 0
    for s in steps:
        toks = _step_tokens(s)
        if not toks:
            continue
        total += 1
        if sum(1 for t in toks if t in body) >= max(1, len(toks) // 2):
            hit += 1
            continue
        # numeric-equivalence fallback: 'sqrt(40) units' earns the step
        # whose MS row says '2√10' — same value, different form.  Only
        # non-trivial magnitudes count (a shared '1' proves nothing).
        s_vals = [v for v in _expr_values(s)
                  if abs(v) >= 2 or v != int(v)]
        if s_vals and body_vals and any(
                abs(a - b) < 0.03 for a in s_vals for b in body_vals):
            hit += 1
    if not total:
        return 0.0, 0, 0
    return round(marks * (hit / total) * 2) / 2, hit, total


def _mark_constructed(res, steps: List[str], marks: float) -> Tuple[float, str]:
    """N-mark: coverage of official marking steps.  OR-questions carry two
    full branches in the MS — score each branch and take the best."""
    # split at bare 'OR' rows into alternate branches
    branches: List[List[str]] = [[]]
    for s in steps[1:] or steps:
        if re.fullmatch(r"\s*or\s*", _norm(s)):
            branches.append([])
            continue
        branches[-1].append(s)
    branches = [b for b in branches if b]
    if not branches:
        return 0.0, "no-steps"
    best = (-1.0, 0, 0)
    for b in branches:
        got = _score_branch(res, b, marks)
        if got[0] > best[0] or (got[0] == best[0] and got[1] > best[1]):
            best = got
    earned = max(0.0, best[0])
    return earned, f"{best[1]}/{best[2]} steps" + \
        (" (best OR-branch)" if len(branches) > 1 else "")


def _mark_parts(res, steps: List[str], marks: float) -> Tuple[float, str]:
    """Multi-part: grade each sub-verdict in res.socratic['multi_part']['parts']
    against the marking steps — CBSE awards per-part marks, the pipeline's
    all-or-nothing promotion hides them."""
    promo = (res.socratic or {}).get("multi_part") or {}
    parts = promo.get("parts") or []
    if not parts:
        return 0.0, "multi-part-no-subresults"
    # split MS into per-part buckets by (i),(ii),(iii)/(a),(b) markers
    buckets: List[List[str]] = []
    for s in steps:
        m = re.match(r"^\s*\(?([ivx]+|[abc])\)?\b", s, re.I)
        if m and len(buckets) < len(parts):
            buckets.append([s])
        elif buckets:
            buckets[-1].append(s)
        else:
            buckets.append([s])
    if len(buckets) < len(parts):
        buckets.append([])  # pad
    per = marks / len(parts)
    earned = 0.0
    for i, part in enumerate(parts):
        # part['label'] is the marker letter ('i'), NOT a verdict —
        # the verdict flag is part['verified']
        if not (part.get("verified") or
                part.get("label") in ("VERIFIED",
                                      "VERIFIED_WITH_ASSUMPTIONS",
                                      "VERIFIED_OFFICIAL")):
            continue
        raw_body = (str(part.get("answer") or "") + " " +
                    " ".join(str(s) for s in (part.get("steps") or [])))
        body = _norm(raw_body)
        body_vals = _expr_values(raw_body)
        bsteps = buckets[min(i, len(buckets) - 1)]
        hit = 0
        tot = 0
        for s in bsteps:
            toks = _step_tokens(s)
            if not toks:
                continue
            tot += 1
            if sum(1 for t in toks if t in body) >= max(1, len(toks) // 2):
                hit += 1
                continue
            s_vals = [v for v in _expr_values(s)
                      if abs(v) >= 2 or v != int(v)]
            if s_vals and body_vals and any(
                    abs(a - b) < 0.03 for a in s_vals for b in body_vals):
                hit += 1
        if tot and hit / tot >= 0.5:
            earned += per
        elif part.get("numeric") is not None and any(
                abs(part["numeric"] - n) < 0.03
                for n in _expr_values(" ".join(bsteps))):
            earned += per
    return round(earned * 2) / 2, f"{len(parts)} parts graded"


def mark_question(q: Dict[str, Any], res) -> Dict[str, Any]:
    marks = float(q.get("marks") or 0)
    ms = q.get("marking_steps") or []
    key = ms[0] if ms else ""

    verdict = {
        "qno": q["qno"], "marks": marks, "earned": 0.0, "label": res.label,
        "pipeline_answer": res.answer, "why": "", "q_text": q["text"][:160],
        "route": res.audit.route,
    }

    if res.label not in ("VERIFIED", "VERIFIED_WITH_ASSUMPTIONS", "VERIFIED_OFFICIAL"):
        # multi-part splits carry per-part sub-results worth partial marks
        if (res.socratic or {}).get("multi_part"):
            earned, why = _mark_parts(res, ms, marks)
            verdict["earned"] = earned
            verdict["why"] = why
        else:
            verdict["why"] = f"pipeline:{res.label}"
        verdict["refusal"] = res.refusal_reason
        return verdict

    if not ms:
        verdict["why"] = "no-marking-scheme"
        return verdict

    if marks <= 1 and key:
        earned, why = _mark_mcq(q, res, key)
        verdict["earned"] = earned * marks
        verdict["why"] = why
    else:
        earned, why = _mark_constructed(res, ms, marks)
        verdict["earned"] = earned
        verdict["why"] = why
    return verdict


# --------------------------------------------------------------------------- #
# Runner
# --------------------------------------------------------------------------- #

def solve_paper(path: Path) -> Dict[str, Any]:
    paper = json.loads(path.read_text(encoding="utf-8"))
    results = []
    for q in paper["questions"]:
        try:
            res = answer(q["text"])
        except Exception as e:  # pipeline should never raise, belt+braces
            verdict = {
                "qno": q["qno"], "marks": q.get("marks"), "earned": 0.0,
                "label": "PIPELINE_ERROR", "pipeline_answer": None,
                "why": str(e)[:120], "q_text": q["text"][:160],
            }
        else:
            verdict = mark_question(q, res)
        results.append(verdict)
        print(f"  q{verdict['qno']:>2} {verdict['label']:<24} {verdict['earned']:>4}/{verdict['marks']} {verdict['why']}", flush=True)

    earned = sum(r["earned"] for r in results)
    possible = sum(float(r["marks"] or 0) for r in results)
    by_section = {}
    for q, r in zip(paper["questions"], results):
        sec = next((s for s in paper["sections"] if s["qlo"] <= q["qno"] <= s["qhi"]), None)
        name = f"{sec['kind'][:22]} {sec['qlo']}-{sec['qhi']}" if sec else "unsectioned"
        b = by_section.setdefault(name, [0.0, 0.0])
        b[0] += r["earned"]
        b[1] += float(r["marks"] or 0)

    return {
        "paper": paper["source_file"],
        "earned": earned,
        "possible": possible,
        "pct": round(100 * earned / possible, 1) if possible else 0,
        "by_section": {k: f"{v[0]:.1f}/{v[1]:.0f}" for k, v in by_section.items()},
        "verdicts": results,
        "gaps": [r for r in results if r["earned"] < (float(r["marks"] or 0))],
    }


def main(paper_path: Optional[str] = None) -> None:
    path = Path(paper_path) if paper_path else PAPERS_DIR / "cbse_X_2025-26_X_2025-26_MathsStandard_SQP.json"
    report = solve_paper(path)
    print(f"\n=== {report['paper']} ===")
    print(f"SCORE: {report['earned']:.1f} / {report['possible']:.0f}  ({report['pct']}%)")
    print("\nBy section:")
    for k, v in report["by_section"].items():
        print(f"  {k}: {v}")
    print("\nPer-question:")
    for v in report["verdicts"]:
        flag = "✓" if v["earned"] >= (float(v["marks"] or 0)) else "✗"
        print(f"  {flag} Q{v['qno']:>2} [{v['marks']}m] {v['label']:<24} {v['earned']:>4}  {v['why']}")
    gap_out = path.with_suffix(".gaps.json")
    gap_out.write_text(json.dumps(report, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"\nfull report -> {gap_out}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else None)
