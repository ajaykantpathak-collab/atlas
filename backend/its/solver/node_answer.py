"""node_answer.py — ground answers in the AUTHORED NODE CONTENT.

For questions that are not in the question bank and not numeric, the
corpus itself is the ground truth: every node carries an authored
DEFINITION / WALKTHROUGH / ELI5 / EXAMPLES / diagnostics (the 10/10
content program).  When the caller supplies the node context (the
practice/tutor flows always know which node a question belongs to),
this lane composes the answer FROM THE NODE'S OWN SECTIONS -- no LLM,
no computation, deterministic and auditable.

Fail-closed: an unknown node, missing core sections, or an unclassifiable
ask with no matching section returns None -- the pipeline then falls
through (eventually to the honest LLM tier).  Node ids are scrubbed from
everything student-visible (display_scrub).
"""
from __future__ import annotations

import logging
import re
from typing import Any, Dict, Optional

log = logging.getLogger(__name__)

# ask-type classification: regex -> (ordered section preferences, prefix)
_ASK_TYPES = [
    (re.compile(r"\bwhat\s+is\s+(?:the\s+)?(?:a\s+)?|\bdefine\b|\bdefinition\s+of\b|\bmeaning\s+of\b|\bwhat\s+are\b", re.I),
     ("definition", "eli5"), "definition"),
    (re.compile(r"\bwhy\b|\bexplain\b|\bhow\s+(?:does|do|did|can|is|are)\b|reason\b|\bhow\s+come\b", re.I),
     ("walkthrough", "definition"), "explanation"),
    (re.compile(r"\bexample\b|\bfor\s+instance\b|\bsuch\s+as\b", re.I),
     ("examples", "walkthrough"), "example"),
    (re.compile(r"\bdifference\s+between\b|\bcompare\b|\bvs\.?\b|\bdistinguish\b|\bdifferentiate\b", re.I),
     ("walkthrough", "scope_boundary", "definition"), "comparison"),
    (re.compile(r"\bmisconception\b|\bcommon\s+(?:mistake|error)\b|\bstudents?\s+(?:think|believe)\b", re.I),
     ("common_misconception", "on_failure", "walkthrough"), "misconception"),
]

_MIN_ANSWER = 40
_MAX_ANSWER = 1400

_WS = re.compile(r"\s+")
_MD = re.compile(r"\*\*|__|`")

# relevance gate: content words of the question must appear in the node's
# own title/definition.  Without this, ANY "explain/why" question inherits
# whatever node the session carries — an English-literature question would
# be "answered" from a biology node's walkthrough (the exact
# confident-wrong class the 2026-10-02 audit hunts).
_STOP = {"the", "a", "an", "of", "is", "are", "was", "were", "in", "on",
         "for", "to", "and", "or", "do", "does", "did", "what", "why",
         "how", "when", "which", "this", "that", "it", "its", "explain",
         "describe", "define", "about", "give", "answer", "question",
         "statement", "following"}


def _content_words(text: str):
    return {w for w in _WS.sub(" ", re.sub(r"[^a-z0-9 ]", " ",
            (text or "").lower())).split()
            if w not in _STOP and len(w) > 2}


def _relevant(question_text: str, rec: Dict[str, Any]) -> bool:
    q_words = _content_words(question_text)
    if not q_words:
        # pure command/stopword question ("explain", "why?") — no topic
        # claim to contradict; the session node is the only referent
        return False
    node_words = _content_words(
        f"{rec.get('title') or ''} {rec.get('definition') or ''} "
        f"{rec.get('eli5') or ''}")
    if q_words & node_words:
        return True
    # deictic reference: a bare "this/it/these" question ("explain why
    # this works") points AT the session's node — allow.  A question with
    # substantive words that never touch the node ("what the hawk means
    # by sophistry") is off-topic — refuse.
    return bool(re.search(r"\b(this|these|those|it|its|they|them)\b",
                          (question_text or "").lower()))


def _clean(text: str) -> str:
    t = _MD.sub("", text or "")
    return _WS.sub(" ", t).strip()


def _classify(question_text: str):
    for rx, sections, name in _ASK_TYPES:
        if rx.search(question_text or ""):
            return sections, name
    return ("walkthrough", "definition"), "explanation"


def _pick(section_key: str, rec: Dict[str, Any]) -> str:
    v = rec.get(section_key)
    if isinstance(v, str) and v.strip():
        return _clean(v)
    if isinstance(v, (list, tuple)) and v:
        parts = [_clean(str(x)) for x in v if _clean(str(x))]
        return " ".join(parts)
    return ""


def _compose(sections_pref, rec: Dict[str, Any], ask_name: str) -> Optional[str]:
    for key in sections_pref:
        body = _pick(key, rec)
        if len(body) >= _MIN_ANSWER:
            if len(body) > _MAX_ANSWER:
                cut = body[:_MAX_ANSWER]
                # end on a sentence boundary when one exists in-window
                dot = cut.rfind(". ")
                if dot > _MAX_ANSWER // 2:
                    cut = cut[: dot + 1]
                body = cut
            prefix = {
                "definition": "In brief: ",
                "explanation": "",
                "example": "From this chapter's own worked examples: ",
                "comparison": "",
                "misconception": "The common mistake here: ",
            }.get(ask_name, "")
            return prefix + body
    return None


def _match_qa(question_text: str, rec: Dict[str, Any]) -> Optional[Tuple[str, str, int, float]]:
    """Match question_text against node's diagnostics and competency_questions.
    Returns (answer, question_text, index, recall_score) or None."""
    qw = _content_words(question_text)
    if not qw or len(qw) < 2:
        return None
    q_nums = set(re.findall(r"\b\d+(?:\.\d+)?\b", question_text))
    best_match = None
    best_score = 0.0
    for d in rec.get("diagnostics") or []:
        if not isinstance(d, dict):
            continue
        dq = d.get("q") or d.get("question") or ""
        da = d.get("a") or d.get("answer") or ""
        if not dq or not da:
            continue
        # Number parity: questions with numbers cannot match questions with different numbers
        d_nums = set(re.findall(r"\b\d+(?:\.\d+)?\b", dq))
        if q_nums and q_nums != d_nums:
            continue
        dw = _content_words(dq)
        if not dw:
            continue
        inter = len(qw & dw)
        recall = inter / len(qw)
        if recall >= 0.70 and inter >= 2 and recall > best_score:
            best_score = recall
            best_match = (_clean(str(da)), _clean(str(dq)), d.get("index", 1), recall)
    for c in rec.get("competency_questions") or []:
        if not isinstance(c, dict):
            continue
        cq = c.get("question") or c.get("q") or ""
        ca = c.get("answer") or c.get("a") or ""
        if not cq or not ca:
            continue
        c_nums = set(re.findall(r"\b\d+(?:\.\d+)?\b", cq))
        if q_nums and q_nums != c_nums:
            continue
        cw = _content_words(cq)
        if not cw:
            continue
        inter = len(qw & cw)
        recall = inter / len(qw)
        if recall >= 0.70 and inter >= 2 and recall > best_score:
            best_score = recall
            best_match = (_clean(str(ca)), _clean(str(cq)), c.get("index", 1), recall)
    return best_match


def node_answer(question_text: str,
                node_id: Optional[str] = None) -> Optional[Dict[str, Any]]:
    """Compose an answer from the node's authored sections or Q&As.  None on any
    failure -- never raises, never guesses."""
    if not question_text:
        return None
    try:
        # PERMANENT STEM & MCQ EXCLUSION: node_answer is strictly for qualitative definitions
        # and conceptual prose in humanities/languages. It must NEVER hijack math, physics,
        # chemistry, commerce calculations, or MCQ questions with textbook essays.
        if bool(re.search(r"\([A-Da-d]\)|\b[A-Da-d]\)\s+[A-Za-z0-9]", question_text)):
            return None
        if bool(re.search(r"[=+\-*/\^<>]|\b(?:matrix|matrices|determinant|det|adj|adjoint|eigen|vector|integral|derivative|dy/dx|d/dx|equation|ratio|probability|sin|cos|tan|log|ln|exp|lim|ohm|hz|pf|uf|nf|volt|ampere|joule|watt)\b|[\uf000-\uf0ff\U0001d400-\U0001d7ff]", question_text, re.I)):
            return None
        if bool(re.search(r"\b(?:equal\s+to|value\s+of|calculate|compute|solve|find|evaluate|determine|derive)\b", question_text, re.I)):
            return None

        from backend.services.enhanced_nodes import load_index
        idx = load_index()
        rec = None
        has_numbers = bool(re.search(r"\d", question_text))
        has_calc_verb = bool(re.search(
            r"\b(?:calculate|find|solve|evaluate|compute|determine|derive|simplify|how\s+(?:much|many|far|fast|long)|what\s+(?:is|are|will\s+be|would\s+be))\b",
            question_text, re.I))
        has_mcq_options = bool(re.search(r"\([A-Da-d]\)|\b[A-Da-d]\)\s+[A-Za-z0-9]", question_text))
        has_units = bool(re.search(r"\b\d+\s*(?:pf|uf|nf|f|v|w|j|a|ohm|hz|m|cm|mm|km|kg|g|s|sec|min|hrs?|mol|k|deg|°|%|rs\.?|₹)\b", question_text, re.I))
        is_computational = (has_numbers and (has_calc_verb or has_units)) or bool(re.search(r"[=+\-*/\^]\s*\d+|\d+\s*[=+\-*/\^]", question_text)) or has_mcq_options
        is_grammar_exercise = bool(re.search(
            r"\b(?:change\s+(?:in)?to|convert\s+(?:in)?to|combine\s+using|rewrite\s+(?:using|as|in)|transform\s+into|make\s+it\s+passive|turn\s+into|join\s+(?:the\s+)?sentences?|identify\s+(?:the\s+)?(?:tense|voice|part\s+of\s+speech|clause))\b",
            question_text, re.I
        ))

        if node_id:
            rec = idx.nodes.get(node_id)
        else:
            if is_computational or is_grammar_exercise:
                return None
            try:
                from backend.services.enhanced_nodes import _semantic_hits
                hits = _semantic_hits(idx, question_text, limit=3, threshold=0.35)
                for cand in hits:
                    c_rec = idx.nodes.get(cand)
                    if isinstance(c_rec, dict) and _match_qa(question_text, c_rec):
                        node_id = cand
                        rec = c_rec
                        break
                if not node_id and hits:
                    top_cand = hits[0]
                    top_rec = idx.nodes.get(top_cand)
                    if isinstance(top_rec, dict) and _relevant(question_text, top_rec):
                        node_id = top_cand
                        rec = top_rec
            except Exception as _se:
                log.debug("semantic node resolution degraded: %s", _se)

        if not isinstance(rec, dict) or not node_id:
            return None

        title = _clean(str(rec.get("title") or rec.get("chapter") or ""))

        # 1. Try diagnostic or competency QA match first (100% exact authored answer)
        qa_match = _match_qa(question_text, rec)
        if qa_match is not None:
            body, matched_q, q_idx, score = qa_match
            try:
                from backend.services.display_scrub import make_title_resolver, scrub_display
                resolver = make_title_resolver(idx)
                body = scrub_display(body, resolver)
            except Exception:
                pass
            return {
                "answer": body,
                "confidence": score,
                "steps": [f"Answered from the authored lesson curriculum"
                          + (f" ({title})" if title else "")
                          + f" -- item: '{matched_q[:80]}...'"],
                "anchor": f"node:{node_id}:qa:{q_idx}",
                "meta": {"node": node_id, "ask": "curriculum_qa",
                         "board": rec.get("board"), "subject": rec.get("subject"),
                         "class": rec.get("class"), "recall": score},
            }

        # 2. Fall back to section composition (definition, walkthrough, eli5, examples)
        if is_computational or is_grammar_exercise:
            # A numerical/computational problem or grammar exercise cannot be answered by a generic definition/walkthrough text paragraph!
            return None
        if not _relevant(question_text, rec):
            return None  # question is not about this node — refuse honestly
        sections_pref, ask_name = _classify(question_text)
        body = _compose(sections_pref, rec, ask_name)
        if not body:
            return None
        try:
            from backend.services.display_scrub import make_title_resolver, scrub_display
            resolver = make_title_resolver(idx)
            body = scrub_display(body, resolver)
        except Exception:
            pass
        return {
            "answer": body,
            "confidence": 0.70,
            "steps": [f"Answered from the authored lesson content"
                      + (f" ({title})" if title else "")
                      + " -- no external generation involved."],
            "anchor": f"node:{node_id}",
            "meta": {"node": node_id, "ask": ask_name,
                     "board": rec.get("board"), "subject": rec.get("subject"),
                     "class": rec.get("class")},
        }
    except Exception as e:  # noqa - degrade, never raise into the pipeline
        log.debug("node_answer degraded: %s", type(e).__name__)
        return None
