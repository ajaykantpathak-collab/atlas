"""board_answer.py — the WEEKLY BOARD ANSWER-WRITING limb (pedagogy #1).

Indian boards award marks on the points a student writes on paper, so every
subject owes its students one timed 3-mark and one 5-mark *written* answer
per week, graded on the node's AUTHORED marking points — the examiner
engine (services/examiner_mode.py) applied to board-format questions.

Closed world, same honesty contract as examiner_mode:
  * the marking scheme comes from the authored corpus node only — the
    DIAGNOSTIC_ANSWER keys (CBSE) or MARKING_POINTS blocks (CISCE) of the
    same node the search/teach surfaces serve;
  * coverage is the deterministic keyword-overlap scorer — never an LLM;
  * a node with no authored points is reported honestly (graded: False),
    never fabricated;
  * the weekly pick is a pure hash of (ISO week, subject, class) over the
    eligible node list — deterministic within the week for every student,
    different across weeks — so "this week's board answer" is a real
    schedule, not a random draw per refresh.

No network, no LLM calls — fully deterministic.
"""
from __future__ import annotations

import hashlib
import re
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional, Tuple

from backend.services.enhanced_nodes import (
    _MISCONCEPTION_MARKERS,
    _derive_title,
    load_index,
)
from backend.services.examiner_mode import (
    _load_node,
    _marking_points,
    _point_scored,
    _tokens,
)

#: bare internal node id (c10_bio_cbse_01_001) — must never reach a
#: student-facing display string (owner law: ids travel as fetch keys in
#: payloads, never as visible text).
_NODE_ID_RE = re.compile(r"\bc\d{1,2}(?:_[a-z0-9]+){2,}\b", re.I)

#: tokens that carry no marking-point signal (mirrors the examiner's list)
_STOP = {"the", "and", "for", "with", "of", "in", "to", "a", "an", "is",
         "are", "or", "by", "on", "answer", "question", "marks", "mark"}

#: presentation habits taught every week (the coach half of the limb).
#: English-only, board-habit specific, no ids, no platform jargon.
PRESENTATION_TIPS = [
    "Underline the keywords an examiner scans for — the definition, the law, the final result.",
    "Number your points and give each one its own short line.",
    "Start with the definition or formula, then the explanation, then the example.",
    "Label every part of a diagram — labels earn marks even when words run out.",
    "Never leave a numerical answer without its unit; the unit itself can carry a mark.",
    "Match answer length to marks — a 3-mark answer needs about 3 scoring points.",
]

#: the two tips every student meets every week (the core habit pair)
_CORE_TIP_IDS = (0, 1)


#: generic corpus openers that Derive the title into filler — a board
#: answer card header must name the concept, not "This node covers…"
_GENERIC_TITLE_OPENERS = ("this node", "the node", "in this", "here ",
                          "we will", "let us", "let's")

_SUBJECT_NAMES = {
    "bio": "Biology", "chem": "Chemistry", "phy": "Physics",
    "physics": "Physics", "math": "Maths", "maths": "Maths",
    "hist": "History", "geo": "Geography", "civ": "Civics",
    "eco": "Economics", "eng": "English", "hin": "Hindi",
    "bio_s": "Biology",
}


def _display_title(node: Dict) -> str:
    """Node title for the card header: the derived concept name, or an
    honest "Chapter N · <Subject>" when the derived opener is filler."""
    title = _derive_title(node)
    if not title.lower().startswith(_GENERIC_TITLE_OPENERS):
        return title
    chapter = node.get("chapter")
    subject = _SUBJECT_NAMES.get(str(node.get("subject") or "").lower(),
                                 str(node.get("subject") or "").title())
    return ("Chapter %s · %s" % (chapter, subject)) if chapter else subject


def scrub_ids(text: str) -> str:
    """Drop internal node ids from display text (parenthesised ids vanish,
    bare ids vanish with their trailing separator)."""
    if not text:
        return ""
    out = re.sub(r"\s*\(?%s\)?[,;:]?" % _NODE_ID_RE.pattern, " ", text)
    out = _NODE_ID_RE.sub("", out)
    return re.sub(r"[ \t]{2,}", " ", out).strip()


def _week_key(subject: str, cls: int) -> Tuple[str, str]:
    iso = datetime.now(timezone.utc).isocalendar()
    week = "%04d-W%02d" % (iso[0], iso[1])
    return week, "%s|%s|%s" % (week, (subject or "").strip().lower(), cls)


# ── marking points from the enrichment index ────────────────────────────────

def _strip_misconception(answer: str) -> str:
    """Cut the wrong-answer analysis tail off an authored diagnostic key —
    it is coaching material, not points worth marks."""
    if not answer:
        return ""
    low = answer.lower()
    hits = [low.find(mk) for mk in _MISCONCEPTION_MARKERS]
    hits = [h for h in hits if h > 0]
    return answer[: min(hits)].strip() if hits else answer.strip()


_MD_STRIP = re.compile(r"\*\*|__|`")


def _clause_points(point: str) -> List[str]:
    """One authored sentence can carry several board points ("X because A,
    B measures C").  Split LONG points at authored clause boundaries so a
    3-mark answer grades on ~3 earnable lines, not one all-or-nothing
    bucket.  Fragments stay verbatim authored text — nothing invented."""
    words = point.split()
    if len(words) <= 20:
        return [point]
    parts = [s.strip(" ,;") for s in re.split(
        r";|—|–|\bbecause\b|\bsince\b|\bwhereas\b|\bwhile\b", point)
        if s.strip(" ,;")]
    if len(parts) < 2 and len(words) > 28:
        parts = [s.strip(" ,;") for s in point.split(",") if s.strip(" ,;")]
    return [p for p in parts if len(p.split()) >= 3] or [point]


def _split_points(answer_key: str, cap: int = 8) -> List[str]:
    """Split an authored answer key into board marking points: authored
    bullets first (one bullet = one point), else sentences (long ones
    clause-split). Only points with real content (3+ words) earn marks."""
    key = _strip_misconception(answer_key or "")
    if not key:
        return []
    # authored bullets first (one bullet = one point); plain prose keys
    # split into sentences instead
    marker_lines = [re.sub(r"^\s*(?:\d+[.)]|[-•*])\s*", "", ln).strip()
                    for ln in key.splitlines()
                    if re.match(r"^\s*(?:\d+[.)]|[-•*])\s*", ln)]
    pool = (marker_lines if len(marker_lines) >= 2
            else [s.strip() for s in re.split(r"(?<=[.!?])\s+", key)
                  if s.strip()])
    points: List[str] = []
    for chunk in pool:
        chunk = _MD_STRIP.sub("", re.sub(r"^#+\s*", "", chunk)).strip()
        chunk = scrub_ids(chunk)
        # 3+ content words: shorter fragments ("Chlorophyll absorbs
        # sunlight") are real 1-mark points, not noise
        if len(chunk.split()) < 3:
            continue
        for pt in _clause_points(chunk):
            pt = _MD_STRIP.sub("", pt).strip()
            if pt and pt not in points:
                points.append(pt)
            if len(points) >= cap:
                return points
    return points


def _question_tokens(text: str) -> set:
    return {t for t in _tokens(text) if t not in _STOP}


def _best_diagnostic(node: Dict, question_text: str) -> Optional[Dict]:
    """The authored diagnostic whose question best matches `question_text`
    (deterministic token overlap). None when nothing matches at all."""
    diags = node.get("diagnostics") or []
    if not diags:
        return None
    if not (question_text or "").strip():
        return diags[0]
    qt = _question_tokens(question_text)
    best, best_score = None, 0.0
    for d in diags:
        dt = _question_tokens(str(d.get("q") or ""))
        if not dt:
            continue
        score = len(qt & dt) / max(1, len(qt | dt))
        if score > best_score:
            best, best_score = d, score
    return best if best_score > 0 else None


def _points_for_question(node: Dict, question_text: str
                         ) -> Tuple[List[Dict[str, Any]], Optional[str]]:
    """Authored marking points for one question, plus the authored question
    they belong to. Points are {criterion, max_marks, authored}.

    Order: the matched DIAGNOSTIC pair (CBSE shape); else the node file's
    authored MARKING_POINTS blocks (CISCE shape) filtered to the question
    when a match exists.
    """
    diag = _best_diagnostic(node, question_text or "")
    if diag is not None:
        pts = _split_points(str(diag.get("a") or ""))
        if pts:
            q = scrub_ids(str(diag.get("q") or "").strip().splitlines()[0])
            return ([{"criterion": p, "max_marks": 1, "authored": True}
                     for p in pts], q)

    # CISCE shape — authored MARKING_POINTS in the raw node file
    raw = _load_node(node.get("node_id", ""))
    if raw:
        pts = _marking_points(raw)
        if pts and (question_text or "").strip():
            qt = _question_tokens(question_text)
            def _rel(p: Dict) -> float:
                pt = _question_tokens(str(p.get("question") or ""))
                return len(qt & pt) / max(1, len(qt | pt)) if pt and qt else 0.0
            best_q = max(pts, key=_rel)
            if _rel(best_q) > 0:
                pts = [p for p in pts if p.get("question") == best_q.get("question")]
        if pts:
            return ([{"criterion": scrub_ids(p["criterion"]),
                      "max_marks": int(p.get("max_marks", 1)),
                      "authored": True} for p in pts],
                    scrub_ids(str(pts[0].get("question") or "")) or None)
    return [], None


# ── grading ─────────────────────────────────────────────────────────────────

def grade_board_answer(node_id: str, question_text: str,
                       student_answer: str, marks: int = 0) -> Dict[str, Any]:
    """Grade one written answer against the node's authored marking points.

    Returns the brief's contract:
      {graded, node_title, matched_question, points_covered, points_missed,
       score: "3/5", marks, presentation_tips}
    """
    node = load_index().get(node_id or "")
    if not node:
        return {"graded": False,
                "error": "This topic is not in the covered syllabus yet."}
    answer = (student_answer or "").strip()
    if len(answer) < 2:
        return {"graded": False,
                "error": "Write your answer first — even one line starts the marks."}

    points, matched_q = _points_for_question(node, question_text or "")
    if not points:
        return {"graded": False, "node_title": _display_title(node),
                "error": "No authored marking scheme exists for this question yet — try another board answer this week."}

    tokens = _tokens(answer)
    covered: List[str] = []
    missed: List[str] = []
    total_weight = 0
    covered_weight = 0
    for pt in points:
        scored, _conf = _point_scored(pt["criterion"], tokens)
        total_weight += pt["max_marks"]
        if scored:
            covered.append(pt["criterion"])
            covered_weight += pt["max_marks"]
        else:
            missed.append(pt["criterion"])

    # marks bookkeeping: authored per-point weights win; the request's
    # figure is honoured only when it matches the authored total (or when
    # the authored scheme is weightless 1-mark points and the caller set 3/5).
    if total_weight in (3, 5):
        out_of = total_weight
    elif marks and total_weight and marks != total_weight:
        out_of = marks
    else:
        out_of = total_weight
    fraction = covered_weight / total_weight if total_weight else 0.0
    awarded = int(round(fraction * out_of))

    tips = [PRESENTATION_TIPS[i] for i in _CORE_TIP_IDS]
    if missed:
        tips.append(
            "You missed %d scoring point%s — one short line each would have earned %s."
            % (len(missed), "s" if len(missed) != 1 else "",
               "it" if len(missed) == 1 else "them"))
    else:
        tips.append("Every point landed — keep this exact structure in the exam.")

    return {
        "graded": True,
        "node_title": _display_title(node),
        "matched_question": matched_q,
        "question_matched": bool(matched_q and (question_text or "").strip()),
        "points_covered": covered,
        "points_missed": missed,
        "points_total": len(points),
        "score": "%d/%d" % (awarded, out_of),
        "marks": out_of,
        "presentation_tips": tips,
    }


# ── this week's prompts ─────────────────────────────────────────────────────

def _eligible_nodes(cls: int, subject: str) -> List[Dict]:
    """Teaching nodes of one class+subject with at least two authored
    diagnostics (the raw material for one 3-mark + one 5-mark prompt)."""
    try:
        idx = load_index()
    except Exception:
        return []
    nodes = idx.by_class_subject(int(cls), subject, summaries=False) or []
    return [n for n in nodes
            if len(n.get("diagnostics") or []) >= 2
            and all(str(d.get("q") or "").strip() for d in n["diagnostics"])]


def _pick_prompts(node: Dict) -> List[Dict[str, Any]]:
    """One 3-mark (shortest authored key) + one 5-mark (longest) prompt
    from the node's own diagnostics — marks follow the authored depth of
    the answer key, so the label is honest to the corpus."""
    diags = [d for d in node["diagnostics"] if str(d.get("a") or "").strip()]
    if not diags:
        return []
    # depth = authored key length after the misconception tail is cut, so
    # the coaching tail never inflates a question's mark label
    diags = sorted(diags, key=lambda d: len(_strip_misconception(str(d.get("a") or ""))))
    short, long_ = diags[0], diags[-1]
    out = []
    specs = ((short, 3), (long_, 5)) if short is not long_ else ((short, 3),)
    for d, marks in specs:
        q = scrub_ids(str(d.get("q") or "").strip().splitlines()[0])
        if not q:
            continue
        out.append({
            "node_id": node["node_id"],          # fetch key only — never shown
            "node_title": _display_title(node),
            "question_text": q,
            "marks": marks,
            "minutes": marks,                    # 3-mark → 3 min, 5-mark → 5 min
            "source": "authored_diagnostic",
        })
    return out


def weekly_prompts(subject: str, cls: int) -> Dict[str, Any]:
    """This week's board-answer schedule for one class+subject: one 3-mark
    and one 5-mark written prompt, deterministic for the whole ISO week."""
    week, seed = _week_key(subject, cls)
    eligible = _eligible_nodes(cls, subject)
    if not eligible:
        return {"week": week, "subject": subject, "class": cls,
                "prompts": [],
                "note": "No authored board-answer prompts for this subject yet."}
    offset = int(hashlib.sha1(seed.encode("utf-8")).hexdigest(), 16) % len(eligible)
    # the week's node; the list is node-id sorted so the pick is stable
    node = eligible[offset]
    prompts = _pick_prompts(node)
    if len(prompts) < 2:
        # first candidate lacked a short+long pair — walk forward once
        node = eligible[(offset + 1) % len(eligible)]
        prompts = _pick_prompts(node)
    return {"week": week, "subject": subject, "class": cls,
            "prompts": prompts}
