"""question_types.py -- deterministic generators for special-format MCQs.

Covers the special-format items that sit beside plain MCQs in the CBSE
2025-26 blueprint (assertion-reason, statement-based, match-the-following):

    1. generate_ar(node)             -> one Assertion-Reason question in a
                                        chosen outcome variant (a/b/c/d)
    2. generate_statement_question   -> "which statements are correct"
                                        with 1-2 falsified statements
    3. generate_match_question       -> 4-5 row two-column match from a
                                        chapter node group
    4. validate_ar / validate_statement / validate_match
    5. generate_question_type_batch  -> validated batch for one question type

Design (mirrors relation_binder.py's "lexicons are data" stance):

    - TRUE statements are mined from the node's content_snippet fact
      sentences and its concept_tags / chapter / class metadata.
    - FALSE statements are produced by data-driven perturbation ops:
      antonym swaps, quantifier flips, magnitude scaling, negation wrap.
    - Every generator is seeded from the node id (random.Random with a
      stable seed), so the same node always yields the same question.
    - No LLM calls, no network, no file I/O.  Only json / re / random.
"""

from __future__ import annotations

import json
import random
import re
from typing import Any, Dict, List, Optional, Set, Tuple

__all__ = [
    "generate_ar",
    "generate_statement_question",
    "generate_match_question",
    "validate_ar",
    "validate_statement",
    "validate_match",
    "generate_question_type_batch",
    "QUESTION_TYPE_ALIASES",
]


# --------------------------------------------------------------------------- #
# Lexicons (data, not code)
# --------------------------------------------------------------------------- #

# Instructional / meta sentences that must never become factual claims.
_META_START = re.compile(
    r"^(?:teaches?|learn(?:ing)?|practice|students?|includes?|skip|"
    r"emphas(?:ise|ize)|outlines?|the\s+student|in\s+this|"
    r"this\s+(?:framework|chapter|node|template|method|section|is))\b",
    re.I)

_EXAMPLE_REF = re.compile(r"examples?\s*\d", re.I)

# R gives the cause of A (backward causality justifies the assertion).
_BACKWARD_CAUSAL = re.compile(
    r"\b(?:because|since|due\s+to|owing\s+to|caused\s+by|so\s+that|"
    r"in\s+order\s+to|which\s+is\s+why)\b", re.I)

# Sentence states a consequence; not an explanation of an earlier fact.
_FORWARD_CAUSAL = re.compile(
    r"\b(?:therefore|hence|thus|as\s+a\s+result|leads?\s+to|"
    r"results?\s+in|resulting\s+in|causing|consequently)\b", re.I)

# "X is the process/ability/... " and explicit definition markers.
_DEFINITION = re.compile(
    r"\b(?:is|are)\s+(?:called|known\s+as|defined\s+as|"
    r"referred\s+to\s+as)\b"
    r"|\brefers\s+to\b"
    r"|^[A-Z][\w'',.\- ]{0,70}?\b(?:is|are)\s+(?:the|a|an)\s+"
    r"(?:[\w\-']+\s+){0,3}?(?:ability|process|capacity|measure|method|"
    r"technique|procedure|practice|act|property|tendency|principle|"
    r"phenomenon|condition|defect|disorder|device|instrument|quantity|"
    r"amount|name|term|study|branch)\b", re.I)

# Ordered antonym swaps (specific multi-word phrases first).  A swap
# value may be a callable receiving the matched text, to preserve
# inflection (increasing -> decreasing, not increasing -> increases).
_ANTONYM_SWAPS: List[Tuple[str, Any]] = [
    (r"\bdirectly\s+proportional\b", "inversely proportional"),
    (r"\binversely\s+proportional\b", "directly proportional"),
    (r"\breal\s+image\b", "virtual image"),
    (r"\bvirtual\s+image\b", "real image"),
    (r"\bconverging\b", "diverging"),
    (r"\bdiverging\b", "converging"),
    (r"\balways\b", "never"),
    (r"\bnever\b", "always"),
    (r"\bincreas(?:es|ing|e)\b",
     lambda m: _inflect(m.group(), "increase", "decrease")),
    (r"\bdecreas(?:es|ing|e)\b",
     lambda m: _inflect(m.group(), "decrease", "increase")),
    (r"\bgreater\s+than\b", "smaller than"),
    (r"\bsmaller\s+than\b", "greater than"),
    (r"\bmore\s+than\b", "less than"),
    (r"\bless\s+than\b", "more than"),
    (r"\blarger\b", "smaller"),
    (r"\bsmaller\b", "larger"),
    (r"\bgreater\b", "smaller"),
    (r"\bmaximum\b", "minimum"),
    (r"\bminimum\b", "maximum"),
    (r"\bthickens\b", "flattens"),
    (r"\bflattens\b", "thickens"),
    (r"\bcontracts\b", "relaxes"),
    (r"\brelaxes\b", "contracts"),
    (r"\bpositive\b", "negative"),
    (r"\bnegative\b", "positive"),
    (r"\brational\b", "irrational"),
    (r"\birrational\b", "rational"),
    (r"\bparallel\b", "perpendicular"),
    (r"\bfinite\b", "infinite"),
    (r"\bsame\b", "different"),
]

_QUANTIFIERS = re.compile(r"\b(all|every|any|each)\b", re.I)

# Standalone numbers only (not exponents like ax^2, not decimals in words).
_NUM_RE = re.compile(r"(?<![\w.,^])\d+(?:\.\d+)?(?![\w])")

_SENT_SPLIT = re.compile(r"(?<=[.!?])\s+")

_LEADING_CONNECTIVE = re.compile(
    r"^(?:similarly|therefore|however|thus|also|moreover|hence|then|"
    r"so|accordingly|in\s+addition),?\s+", re.I)


# --------------------------------------------------------------------------- #
# Small text / seed utilities
# --------------------------------------------------------------------------- #

def _stable_seed(text: str) -> int:
    """Deterministic across runs (unlike hash(), which is salted)."""
    return sum((i + 1) * ord(c) for i, c in enumerate(str(text))) & 0xFFFF_FFFF


def _node_key(node: dict) -> str:
    if isinstance(node, dict):
        if node.get("node_id"):
            return str(node["node_id"])
        return json.dumps(node, sort_keys=True, default=str)[:400]
    return str(node)


def _rng(node: dict, kind: str, seed: Any = None) -> random.Random:
    if seed is None:
        seed = f"{_node_key(node)}|{kind}"
    return random.Random(_stable_seed(seed))


def _node_topic(node: dict) -> str:
    return str(node.get("topic") or node.get("chapter_name")
               or "This concept").strip() or "This concept"


def _node_chapter(node: dict) -> str:
    return str(node.get("chapter_name") or node.get("chapter") or "").strip()


def _tag_phrase(tag: Any) -> str:
    return re.sub(r"[-_]+", " ", str(tag)).strip()


def _join_and(items: List[str]) -> str:
    items = [i for i in items if i]
    if not items:
        return ""
    if len(items) == 1:
        return items[0]
    return ", ".join(items[:-1]) + " and " + items[-1]


def _clean_sentence(raw: str) -> str:
    s = re.sub(r"\s+", " ", str(raw)).strip()
    s = _LEADING_CONNECTIVE.sub("", s)
    if not s:
        return ""
    s = s[0].upper() + s[1:]
    if s[-1] not in ".!?":
        s += "."
    return s


def _fact_sentences(node: dict) -> List[str]:
    """Non-meta, reasonably sized sentences from content_snippet."""
    snippet = str(node.get("content_snippet") or "")
    out: List[str] = []
    for raw in _SENT_SPLIT.split(snippet):
        s = _clean_sentence(raw)
        if len(s) < 25 or len(s) > 400:
            continue
        if _META_START.match(s) or _EXAMPLE_REF.search(s):
            continue
        out.append(s)
    return out


def _tag_statements(node: dict) -> List[str]:
    """TRUE statements derived from tags / chapter / class metadata."""
    topic = _node_topic(node)
    tags = [_tag_phrase(t) for t in (node.get("concept_tags") or [])]
    tags = [t for t in tags if t][:6]
    chapter = _node_chapter(node)
    cls = node.get("class_level")
    subject = str(node.get("subject") or "CBSE").strip()
    out: List[str] = []
    for i in range(0, min(len(tags), 4), 2):
        pair = tags[i:i + 2]
        out.append(f"{topic} involves {_join_and(pair)} as its core ideas.")
    if chapter:
        out.append(f"{topic} is covered in the chapter '{chapter}' of the "
                   f"CBSE syllabus.")
    if cls:
        out.append(f"{topic} is a prescribed part of the CBSE Class {cls} "
                   f"{subject} syllabus.")
    if tags:
        out.append(f"{topic} builds directly on the idea of {tags[0]}.")
    return out


def _true_pool(node: dict, include_definitions: bool = False
               ) -> List[str]:
    """Ordered pool of TRUE statements: plain facts first, then tag lines."""
    facts = _fact_sentences(node)
    plain = [f for f in facts if not _DEFINITION.search(f)]
    defs = [f for f in facts if _DEFINITION.search(f)]
    pool = plain + (defs if include_definitions else []) \
        + _tag_statements(node)
    seen: Set[str] = set()
    out: List[str] = []
    for s in pool:
        k = s.strip().lower()
        if k and k not in seen:
            seen.add(k)
            out.append(s)
    return out


def _case_aware_replace(sentence: str, match: "re.Match",
                        replacement: Any) -> str:
    if callable(replacement):
        replacement = replacement(match)
    if match.group()[:1].isupper():
        replacement = replacement[:1].upper() + replacement[1:]
    return sentence[:match.start()] + replacement + sentence[match.end():]


def _inflect(matched: str, from_base: str, to_base: str) -> str:
    """Copy the inflection of matched onto the antonym base word."""
    if matched.endswith("ing"):
        stem = to_base[:-1] if to_base.endswith("e") else to_base
        return stem + "ing"
    if matched.endswith("es") and from_base.endswith("e"):
        return to_base + "es"
    return to_base


def _article(phrase: str) -> str:
    return "an" if phrase[:1].lower() in "aeiou" else "a"


def _fmt_number(x: float) -> str:
    if abs(x - round(x)) < 1e-9:
        return str(int(round(x)))
    return ("%.2f" % x).rstrip("0").rstrip(".")


def _scale_a_number(sentence: str, rng: random.Random
                    ) -> Optional[str]:
    hits = [(m, float(m.group())) for m in _NUM_RE.finditer(sentence)]
    hits = [(m, v) for m, v in hits
            if v != 0 and not (v.is_integer() and 1800 <= v <= 2100)]
    if not hits:
        return None
    rng.shuffle(hits)
    for m, val in hits:
        new_val = val * rng.choice([2.0, 0.5, 3.0])
        if new_val != val:
            return sentence[:m.start()] + _fmt_number(new_val) \
                + sentence[m.end():]
    return None


def _perturb(sentence: str, rng: random.Random) -> Tuple[str, str]:
    """Return (false_version, method) for a true sentence.

    Ops in priority order: antonym swap, quantifier flip, magnitude
    change, negation wrap.  The last one always succeeds.
    """
    for pat, repl in _ANTONYM_SWAPS:
        m = re.search(pat, sentence, re.I)
        if m:
            return _case_aware_replace(sentence, m, repl), "antonym swap"
    m = _QUANTIFIERS.search(sentence)
    if m:
        return _case_aware_replace(sentence, m, "no"), "quantifier flip"
    scaled = _scale_a_number(sentence, rng)
    if scaled is not None:
        return scaled, "magnitude change"
    for pat, repl in [(r"\bcan\b", "cannot"), (r"\bis\b", "is not"),
                      (r"\bare\b", "are not"), (r"\bdoes\b", "does not"),
                      (r"\bhas\b", "does not have")]:
        m = re.search(pat, sentence, re.I)
        if m:
            return _case_aware_replace(sentence, m, repl), "negation"
    return "It is not true that " + sentence[0].lower() + sentence[1:], \
        "negation"


def _truncate(s: str, limit: int = 110) -> str:
    s = s.strip()
    if len(s) <= limit:
        return s
    cut = s[:limit].rsplit(" ", 1)[0].rstrip(",;:-")
    return cut + "..."


# --------------------------------------------------------------------------- #
# 1. Assertion-Reason generator
# --------------------------------------------------------------------------- #

AR_OPTION_TEXTS = {
    "a": "Both A and R are true and R is the correct explanation of A.",
    "b": "Both A and R are true but R is NOT the correct explanation of A.",
    "c": "A is true but R is false.",
    "d": "A is false but R is true.",
}

_VARIANTS = ("a", "b", "c", "d")


def generate_ar(node: dict, variant: Any = None, seed: Any = None) -> dict:
    """Build one Assertion-Reason question from a curriculum node.

    variant: "a" (A true, R true, R explains A), "b" (both true, no
    cause-effect), "c" (A true, R false), "d" (A false, R true).
    Defaults to a seed-stable variant derived from the node id.
    """
    if not isinstance(node, dict) or (
            not node.get("topic") and not node.get("content_snippet")):
        raise ValueError("node dict with 'topic' or 'content_snippet' "
                         "is required")
    if variant is None:
        variant = _VARIANTS[_stable_seed(_node_key(node) + "|ar") % 4]
    if isinstance(variant, int):
        variant = _VARIANTS[variant % 4]
    variant = str(variant).strip().lower()[:1]
    if variant not in _VARIANTS:
        raise ValueError("variant must be one of a, b, c, d")

    rng = _rng(node, "ar", seed)
    pool = _true_pool(node, include_definitions=False)
    if len(pool) < 2:
        raise ValueError(
            f"node '{_node_key(node)}' has too little content for an "
            f"Assertion-Reason question")
    topic = _node_topic(node)

    def pick(avoid: Set[str]) -> str:
        for s in pool:
            if s not in avoid:
                return s
        raise ValueError("cannot pick distinct statements")

    false_detail = ""
    assertion_text = reason_text = ""
    if variant == "a":
        causal = [s for s in pool if _BACKWARD_CAUSAL.search(s)]
        if causal:
            reason_text = causal[0]
            assertion_text = pick({reason_text})
        else:
            assertion_text = pool[0]
            tags = [_tag_phrase(t) for t in
                    (node.get("concept_tags") or [])][:2]
            basis = _join_and(tags) if tags else topic
            reason_text = (f"{topic} operates on the principles of "
                           f"{basis}, which is why it behaves as "
                           f"described.")
        explanation = (
            f"A is true: it matches the chapter content on {topic}. "
            f"R is also true and states the underlying principle that "
            f"causes A, so R is the correct explanation of A. "
            f"Hence, the answer is (a).")
    elif variant == "b":
        assertion_text = pool[0]
        reason_text = next((s for s in pool[1:]
                            if not _BACKWARD_CAUSAL.search(s)
                            and not _FORWARD_CAUSAL.search(s)), None)
        if reason_text is None:
            reason_text = pick({assertion_text})
        explanation = (
            f"Both A and R are true statements from the chapter content "
            f"on {topic}, but R describes a separate aspect and is not "
            f"the cause of A. Hence, the answer is (b).")
    elif variant == "c":
        assertion_text = pool[0]
        source = pool[1] if len(pool) > 1 else pool[0]
        reason_text, how = _perturb(source, rng)
        false_detail = (f'the content actually says: "{source}" '
                        f"(the generated reason applied "
                        f"{_article(how)} {how})")
        explanation = (
            f"A is true as per the chapter content. R is false: "
            f"{false_detail} Hence, the answer is (c).")
    else:  # variant == "d"
        source = pool[0]
        assertion_text, how = _perturb(source, rng)
        reason_text = pick({source})
        false_detail = (f'the content actually says: "{source}" '
                        f"(the generated assertion applied "
                        f"{_article(how)} {how})")
        explanation = (
            f"A is false: {false_detail} R is a true statement as per "
            f"the content. Hence, the answer is (d).")

    question = (f"Assertion (A): {assertion_text}\n"
                f"Reason (R): {reason_text}\n"
                f"Which of the following is correct?")
    return {
        "type": "assertion_reason",
        "node_id": node.get("node_id"),
        "topic": topic,
        "question": question,
        "assertion": assertion_text,
        "reason": reason_text,
        "options": dict(AR_OPTION_TEXTS),
        "correct": variant,
        "explanation": explanation,
        "assertion_is_true": variant in ("a", "b", "c"),
        "reason_is_true": variant in ("a", "b", "d"),
    }


# --------------------------------------------------------------------------- #
# 2. Statement-based generator
# --------------------------------------------------------------------------- #

STMT_OPTION_TEXTS = {
    2: {"a": "1 only", "b": "2 only",
        "c": "Both 1 and 2", "d": "Neither 1 nor 2"},
    3: {"a": "1 and 2 only", "b": "2 and 3 only",
        "c": "1 and 3 only", "d": "All of the above"},
    4: {"a": "1 and 2 only", "b": "2 and 3 only",
        "c": "3 and 4 only", "d": "All of the above"},
}

# true-index pattern -> correct option letter, per statement count
_STMT_PATTERNS = {
    2: {"1": "a", "2": "b", "12": "c", "": "d"},
    3: {"12": "a", "23": "b", "13": "c", "123": "d"},
    4: {"12": "a", "23": "b", "34": "c", "1234": "d"},
}


def generate_statement_question(node: dict, num_statements: int = 3,
                                seed: Any = None) -> dict:
    """Build a "which of the statements are correct" question.

    Most statements are TRUE (mined from the node); the statements not
    in the chosen answer pattern are perturbed to be FALSE.  The count
    of true statements varies across generations via the seed.
    """
    if not isinstance(node, dict) or (
            not node.get("topic") and not node.get("content_snippet")):
        raise ValueError("node dict with 'topic' or 'content_snippet' "
                         "is required")
    n = int(num_statements)
    if n not in STMT_OPTION_TEXTS:
        raise ValueError("num_statements must be 2, 3 or 4")

    rng = _rng(node, f"stmt{n}", seed)
    pool = _true_pool(node, include_definitions=True)
    if len(pool) < n:
        raise ValueError(
            f"node '{_node_key(node)}' has too little content for "
            f"{n} statements")

    # distinct true statements, facts first
    truths: List[str] = []
    for s in pool:
        if len(truths) >= n:
            break
        if s not in truths:
            truths.append(s)

    pattern = rng.choice(sorted(_STMT_PATTERNS[n]))
    true_set = {int(c) for c in pattern}

    statements: List[str] = []
    falsified: Dict[int, str] = {}
    for i in range(1, n + 1):
        if i in true_set:
            statements.append(truths[i - 1])
        else:
            false_s, _how = _perturb(truths[i - 1], rng)
            statements.append(false_s)
            falsified[i] = truths[i - 1]

    correct = _STMT_PATTERNS[n][pattern]

    lines = [f"{i}. {s}" for i, s in enumerate(statements, 1)]
    question = ("Consider the following statements:\n" + "\n".join(lines)
                + "\nWhich of the statements given above is/are correct?")

    if falsified:
        parts = [f"Statement {i} is correct as per the chapter content."
                 for i in sorted(true_set)]
        for i, original in sorted(falsified.items()):
            parts.append(f'Statement {i} is incorrect: the content '
                         f'actually says: "{original}"')
    else:
        parts = ["All the statements are correct as per the chapter "
                 "content."]
    explanation = " ".join(parts) + f" Hence, the answer is ({correct})."

    return {
        "type": "statement_based",
        "node_id": node.get("node_id"),
        "topic": _node_topic(node),
        "question": question,
        "statements": statements,
        "options": dict(STMT_OPTION_TEXTS[n]),
        "correct": correct,
        "explanation": explanation,
        "true_statements": sorted(true_set),
        "falsified_sources": {str(k): v for k, v in falsified.items()},
    }


# --------------------------------------------------------------------------- #
# 3. Match-the-following generator
# --------------------------------------------------------------------------- #

_MATCH_LETTERS = "abcdefgh"


def _short_term(node: dict) -> str:
    topic = _node_topic(node)
    if len(topic) <= 55:
        return topic
    if ":" in topic:
        head = topic.split(":")[0].strip()
        if 8 <= len(head) <= 55:
            return head
    for t in (node.get("concept_tags") or []):
        phrase = _tag_phrase(t)
        if 8 <= len(phrase) <= 55 and phrase.lower() not in topic.lower():
            return phrase.title()
    return _truncate(topic, 55)


def _short_desc(node: dict, avoid: Set[str]) -> str:
    for s in _fact_sentences(node):
        if _truncate(s, 110) not in avoid:
            return _truncate(s, 110)
    snippet = re.sub(r"\s+", " ", str(node.get("content_snippet") or ""))
    snippet = snippet.strip()
    if snippet:
        for limit in (110, 140, 180):
            t = _truncate(_clean_sentence(snippet), limit)
            if t not in avoid:
                return t
    tags = [_tag_phrase(t) for t in (node.get("concept_tags") or [])[:2]]
    if tags:
        t = _truncate(f"Concept centred on {_join_and(tags)}.", 110)
        if t not in avoid:
            return t
    return _truncate(f"Topic: {_node_topic(node)}.", 110)


def generate_match_question(nodes: List[dict], seed: Any = None) -> dict:
    """Build a two-column match question from 4-5 related chapter nodes.

    Column A: concept terms (topics / concept_tags).  Column B: content
    descriptions (first fact sentence of each snippet), shuffled.
    """
    if not isinstance(nodes, (list, tuple)) or len(nodes) < 2:
        raise ValueError("need a list of at least 2 nodes")
    nodes = [nd for nd in nodes if isinstance(nd, dict) and (
        nd.get("topic") or nd.get("content_snippet"))][:5]

    key = "|".join(_node_key(nd) for nd in nodes) + "|match"
    rng = random.Random(seed if seed is not None else _stable_seed(key))

    items: List[Tuple[str, str]] = []
    used_terms: Set[str] = set()
    used_descs: Set[str] = set()
    for nd in nodes:
        term = _short_term(nd)
        if term.lower() in used_terms:
            continue
        desc = _short_desc(nd, used_descs)
        used_terms.add(term.lower())
        used_descs.add(desc)
        items.append((term, desc))
    if len(items) < 2:
        raise ValueError("not enough distinct nodes to build a match "
                         "question")

    rng.shuffle(items)
    n = len(items)
    letters = _MATCH_LETTERS[:n]
    b_order = list(range(n))
    rng.shuffle(b_order)

    column_a = [f"{letters[i]}. {items[i][0]}" for i in range(n)]
    column_b = [f"{pos + 1}. {items[b_order[pos]][1]}" for pos in range(n)]
    # letter i must point at the position where its own item landed
    correct_matches = {letters[i]: str(b_order.index(i) + 1)
                       for i in range(n)}

    question = ("Match the following:\n"
                "Column A lists concepts and Column B lists descriptions "
                "of them. Which of the following gives the correct "
                "matching?")
    mapping = ", ".join(f"({letters[i]})-({correct_matches[letters[i]]})"
                        for i in range(n))
    detail = "; ".join(
        f"{items[i][0]} is described by: {items[b_order[i]][1]}"
        for i in range(n))
    explanation = (f"Correct matching: {mapping}. {detail}")

    return {
        "type": "match_the_following",
        "node_ids": [nd.get("node_id") for nd in nodes[:n]],
        "chapter": _node_chapter(nodes[0]),
        "question": question,
        "column_a": column_a,
        "column_b": column_b,
        "correct_matches": correct_matches,
        "explanation": explanation,
    }


# --------------------------------------------------------------------------- #
# 4. Quality validation
# --------------------------------------------------------------------------- #

_ALL_NONE_ABOVE = re.compile(r"\b(?:all|none)\s+of\s+the\s+above\b", re.I)


def _extract_part(question: str, label: str) -> Optional[str]:
    m = re.search(re.escape(label) + r"\s*(.+)", question)
    return m.group(1).strip() if m else None


def validate_ar(ar: dict) -> Tuple[bool, List[str]]:
    """Structural + quality gates for an Assertion-Reason question."""
    issues: List[str] = []
    if not isinstance(ar, dict):
        return False, ["not a dict"]
    for key in ("question", "options", "correct", "explanation"):
        if key not in ar:
            issues.append(f"missing key: {key}")
    if issues:
        return False, issues

    opts = ar.get("options")
    if not isinstance(opts, dict) or set("abcd") - set(opts):
        issues.append("options must be a dict with keys a, b, c, d")
    else:
        values = [str(opts[k]) for k in "abcd"]
        if len(set(values)) != 4:
            issues.append("duplicate option texts")
        for v in values:
            v = v.strip()
            if _ALL_NONE_ABOVE.search(v):
                issues.append("forbidden option text: all/none of the "
                              "above")
            if len(v) < 10:
                issues.append("option too short to be a sentence")
            if not v[:1].isupper():
                issues.append("option does not start with a capital "
                              "letter")
            if not v.endswith("."):
                issues.append("option is not a complete sentence")

    if ar.get("correct") not in ("a", "b", "c", "d"):
        issues.append("correct must be one of a, b, c, d")
    elif isinstance(opts, dict) and ar["correct"] not in opts:
        issues.append("correct letter missing from options")

    question = str(ar.get("question") or "")
    assertion = ar.get("assertion") or _extract_part(question,
                                                     "Assertion (A)")
    reason = ar.get("reason") or _extract_part(question, "Reason (R)")
    for name, text in (("assertion", assertion), ("reason", reason)):
        if not text or len(str(text).strip()) <= 15:
            issues.append(f"{name} is not substantive (>15 chars "
                          f"required)")
        elif _DEFINITION.search(str(text)):
            issues.append(f"{name} is a definition; A and R must be "
                          f"factual statements")

    if not str(ar.get("explanation") or "").strip():
        issues.append("empty explanation")
    return (not issues, issues)


def _option_truth_set(text: str, n: int) -> Optional[Set[str]]:
    """Map an option text to the set of true statement numbers it claims."""
    low = str(text).strip().lower()
    full = {str(i) for i in range(1, n + 1)}
    if low in ("all of the above", "all of these"):
        return full
    if low in ("none of the above", "none of these"):
        return set()
    if n == 2:
        if low == "both 1 and 2":
            return {"1", "2"}
        if low == "neither 1 nor 2":
            return set()
    m = re.fullmatch(r"((?:\d)(?:\s+and\s+\d)*)\s+only", low)
    if m:
        return set(re.findall(r"\d", m.group(1)))
    return None


def validate_statement(sq: dict) -> Tuple[bool, List[str]]:
    """Structural + quality gates for a statement-based question."""
    issues: List[str] = []
    if not isinstance(sq, dict):
        return False, ["not a dict"]
    for key in ("question", "statements", "options", "correct",
                "explanation"):
        if key not in sq:
            issues.append(f"missing key: {key}")
    if issues:
        return False, issues

    statements = sq.get("statements")
    if not isinstance(statements, list) or not (
            2 <= len(statements) <= 4):
        issues.append("statements must be a list of 2-4 strings")
        statements = []
    lowered = [str(s).strip().lower() for s in statements]
    for i, s in enumerate(lowered, 1):
        if len(s) <= 15:
            issues.append(f"statement {i} is not substantive (>15 chars "
                          f"required)")
    if len(set(lowered)) != len(lowered):
        issues.append("duplicate statements")

    opts = sq.get("options")
    n = len(statements) or 3
    if not isinstance(opts, dict) or set("abcd") - set(opts):
        issues.append("options must be a dict with keys a, b, c, d")
    else:
        values = [str(opts[k]) for k in "abcd"]
        if len(set(values)) != 4:
            issues.append("duplicate option texts")

    if sq.get("correct") not in ("a", "b", "c", "d"):
        issues.append("correct must be one of a, b, c, d")
    elif isinstance(opts, dict) and sq["correct"] not in opts:
        issues.append("correct letter missing from options")

    truth = sq.get("true_statements")
    if isinstance(truth, list) and isinstance(opts, dict) and statements:
        expected = {str(int(i)) for i in truth}
        if not expected <= {str(i) for i in range(1, len(statements) + 1)}:
            issues.append("true_statements out of range")
        else:
            mapped = {k: _option_truth_set(v, len(statements))
                      for k, v in opts.items()}
            if all(v is not None for v in mapped.values()):
                got = mapped.get(sq.get("correct"))
                if got != expected:
                    issues.append("correct option is inconsistent with "
                                  "true_statements")

    if not str(sq.get("explanation") or "").strip():
        issues.append("empty explanation")
    return (not issues, issues)


def validate_match(mq: dict) -> Tuple[bool, List[str]]:
    """Structural gates for a match-the-following question."""
    issues: List[str] = []
    if not isinstance(mq, dict):
        return False, ["not a dict"]
    for key in ("question", "column_a", "column_b", "correct_matches",
                "explanation"):
        if key not in mq:
            issues.append(f"missing key: {key}")
    if issues:
        return False, issues

    col_a, col_b, matches = mq["column_a"], mq["column_b"], \
        mq["correct_matches"]
    if not isinstance(col_a, list) or not isinstance(col_b, list) \
            or not isinstance(matches, dict):
        issues.append("column_a / column_b / correct_matches have wrong "
                      "types")
        return False, issues
    if not (2 <= len(col_a) <= 5):
        issues.append("match question must have 2-5 rows")
    if len(col_a) != len(col_b):
        issues.append("column_a and column_b differ in length")
        return (not issues, issues)

    letters = [str(x).split(".", 1)[0].strip() for x in col_a]
    if len(set(letters)) != len(letters):
        issues.append("duplicate row labels in column_a")
    if sorted(matches) != sorted(letters):
        issues.append("correct_matches keys do not match column_a labels")
    numbers = sorted(str(v) for v in matches.values())
    if numbers != [str(i) for i in range(1, len(col_b) + 1)]:
        issues.append("correct_matches values are not a permutation of "
                      "column_b positions")

    if not str(mq.get("explanation") or "").strip():
        issues.append("empty explanation")
    return (not issues, issues)


# --------------------------------------------------------------------------- #
# 5. Batch generator
# --------------------------------------------------------------------------- #

QUESTION_TYPE_ALIASES = {
    "assertion_reason": "assertion_reason",
    "assertion-reason": "assertion_reason",
    "assertionreason": "assertion_reason",
    "ar": "assertion_reason",
    "statement": "statement_based",
    "statements": "statement_based",
    "statement_based": "statement_based",
    "statement-based": "statement_based",
    "statement_question": "statement_based",
    "match": "match",
    "match_the_following": "match",
    "match-the-following": "match",
    "match_following": "match",
}


def _chunks_of_4_or_5(group: List[dict]):
    i = 0
    while i < len(group):
        chunk = group[i:i + 5]
        if len(chunk) >= 4:
            yield chunk
        i += 5


def generate_question_type_batch(nodes: List[dict], question_type: str,
                                 seed: Any = None) -> List[dict]:
    """Generate + validate a batch of one question type over nodes.

    assertion_reason / statement_based: one question per node (nodes
    with too little content are skipped).  match: nodes are grouped by
    chapter and each group of 4-5 related nodes yields one question.
    Only items that pass their validator are returned.
    """
    if not isinstance(nodes, (list, tuple)):
        raise ValueError("nodes must be a list of node dicts")
    qtype = QUESTION_TYPE_ALIASES.get(str(question_type).strip().lower())
    if qtype is None:
        raise ValueError(
            f"unknown question_type: {question_type!r}; expected one of "
            f"{sorted(set(QUESTION_TYPE_ALIASES.values()))}")

    out: List[dict] = []
    if qtype in ("assertion_reason", "statement_based"):
        gen = generate_ar if qtype == "assertion_reason" \
            else generate_statement_question
        check = validate_ar if qtype == "assertion_reason" \
            else validate_statement
        for idx, nd in enumerate(nodes):
            node_seed = None if seed is None else f"{seed}|{idx}"
            try:
                item = gen(nd) if node_seed is None else gen(nd,
                                                             seed=node_seed)
                ok, _issues = check(item)
            except Exception:
                continue
            if ok:
                out.append(item)
        return out

    # match: group by chapter, windows of 4-5 related nodes
    groups: Dict[str, List[dict]] = {}
    for nd in nodes:
        gkey = str(nd.get("chapter_name") or nd.get("chapter")
                   or nd.get("topic") or "?")
        groups.setdefault(gkey, []).append(nd)

    def add_windows(group: List[dict]) -> None:
        for chunk in _chunks_of_4_or_5(group):
            try:
                item = generate_match_question(chunk, seed=seed)
                ok, _issues = validate_match(item)
            except Exception:
                continue
            if ok:
                out.append(item)

    for group in groups.values():
        add_windows(group)
    if not out:  # fallback: consecutive chunks over the flat list
        add_windows(list(nodes))
    return out
