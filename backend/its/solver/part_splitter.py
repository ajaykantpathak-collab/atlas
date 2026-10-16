"""part_splitter.py -- split a refused multi-part question into parts so
each part can carry its own honest verdict.

THE GAP THIS CLOSES (standing gate 2026-09-30): the dominant remaining
refusal class is the multi-part / narrative question refused WHOLE even
when several of its parts are computable.  Answering the tangled text as
one expression needs guessing, so the whole item stays guided -- while
"(a) Find the area ..." and "(b) Find the perimeter ..." solved
SEPARATELY through the ordinary verified pipeline would each carry real
verdicts.  The honest way out is not a smarter single answer, it is
PART-WISE VERDICTS:

  1. split_parts() segments the question on the standard exam shapes;
     each part = shared scenario (context, incl. every numeric setup --
     quantities live in the wrapper) + the part's own ask,
  2. the caller (api/verified_practice.py /solve) solves every part
     through the SAME verified path (answer_pipeline.answer under the
     solve_isolation pool -- identical gates, labels and audit), and
  3. ships a composite response: one verdict per part (answer only when
     that part itself verified -- a part-level answer is never promoted
     by other parts passing) plus an overall verdict that is "verified"
     only when EVERY part verified, "partial" when some did, "guided"
     when none did.

This module NEVER fires on a plain single question (returns None), never
splits MCQ option lists / assertion-reason / match-the-following (those
are option data owned by their own solvers), and never invents content:
part questions are pure recompositions of the original text plus the
shared scenario.  A fragment that would not ask anything on its own
refuses the split, so a half-understood item keeps its whole-question
honest refusal instead of a mangled part.

SHAPES SUPPORTED
  paren_letter  "(a) ... (b) ... (c) ..."      (letters, skips allowed)
  roman         "(i) ... (ii) ... (iii) ..."
  numbered      line-start "Q1." / "1." / "2)" exercise enumerators
  subasks       >=2 ask clauses in one passage ("Identify the limiting
                reagent and state how many moles of water are formed"),
                >=2 ask sentences ("What is sublimation? Name two
                substances ..."), and the compound-object form ("Find
                the equilibrium price and the equilibrium quantity" ->
                find each object separately)
  semicolon     "; "-separated asks, every side asking something on its
                own (a semicolon DATA list under one ask refuses)

Scenario inheritance: a narrative case-study wrapper is CONTEXT, not
question -- every part's solve string prepends the scenario so the
wrapper's quantities travel with each part.

No LLM calls anywhere; everything is raw-string regex plus arithmetic on
character positions, in the multi_part injected-callable style.
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import List, Optional


@dataclass
class SubPart:
    """One standalone sub-question (scenario still to be prepended)."""

    part_id: str    # "a" | "i" | "1" | "ask-1" ... (display ordinals)
    raw: str        # the part's own text only (no shared scenario)


@dataclass
class PartSplit:
    """A multi-part reading of one board item."""

    scenario: str            # shared preamble before the first part
    parts: List[SubPart] = field(default_factory=list)
    shape: str = ""          # paren_letter | roman | numbered | subasks |
                             # semicolon

    def part_question(self, part: SubPart) -> str:
        """The string the pipeline solves: scenario + the part's ask."""
        if self.scenario:
            return (self.scenario.rstrip() + " " + part.raw.strip()).strip()
        return part.raw.strip()


MAX_PARTS = 6          # more fragments than this is not one question


# ------------------------------------------------------------------ #
# deterministic helpers
# ------------------------------------------------------------------ #

_ASK_WORD_RE = re.compile(
    r"\b(find|calculate|compute|what|how|why|when|where|which|prove|show|"
    r"draw|state|write|express|determin\w*|solve|simplif\w*|evaluat\w*|"
    r"verify|check|derive|represent|construct|define|explain|identify|"
    r"convert|expand|factoris\w*|factoriz\w*|differentiat\w*|integrat\w*|"
    r"estimate|arrange|choose|select|list|name|distinguish|give)\b", re.I)

# paren enumerators: (a) (B) ...; roman (i) (ii) ... (x), lowercase only
_PAREN_LETTER_RE = re.compile(r"\(\s*([a-hA-H])\s*\)")
_PAREN_ROMAN_RE = re.compile(r"\(\s*(x|ix|viii|vii|vi|v|iv|iii|ii|i)\s*\)")
_LETTER_ORDER = [chr(c) for c in range(ord("a"), ord("h") + 1)]
_ROMAN_ORDER = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"]

# line-start exercise enumerators: "Q1." / "1)" / "2. "
_NUMBERED_RE = re.compile(
    r"^\s*(?:(?:question|que|q)\s*\.?\s*(?P<qnum>\d{1,3})\s*[.):\]-]\s*"
    r"|(?P<num>\d{1,3})\s*[.)]\s+)", re.I)

_UNIT_TOKEN_RE = re.compile(r"^[A-Za-z]{1,6}$")

# structural formats owned by their own solvers -- never part-split
_STRUCTURAL_RE = re.compile(
    r"assertion\s*\(\s*a\s*\)|reason\s*\(\s*r\s*\)|"
    r"match\s+(?:the\s+)?follow(?:ing|s)|column\s+(?:i\b|a\b|1\b)|"
    r"choose\s+the\s+correct|correct\s+option\b|"
    r"both\s+\(\s*a\s*\)\s+and", re.I)

# imperative ask verbs that can introduce a standalone sub-ask clause
_SUBASK_VERB_RE = re.compile(
    r"\b(find|calculate|compute|determine|evaluate|state|identify|name|"
    r"derive|solve|draw|express|show|prove|explain|define|describe|"
    r"discuss|distinguish|write|estimate|convert|list|give|mention|"
    r"how\s+much|how\s+many|what\s+is|what\s+are)\b", re.I)

# an ask verb one leading adverb in ("and briefly describe ...")
_ADVERB_VERB_RE = re.compile(
    r"^[A-Za-z-]{2,12}\s+(?:find|calculate|compute|determine|evaluate|"
    r"state|identify|name|derive|solve|draw|express|show|prove|explain|"
    r"define|describe|discuss|distinguish|write|estimate|convert|list|"
    r"give|mention)\b", re.I)

# boundaries that may separate two standalone ask clauses
_CLAUSE_JOIN_RE = re.compile(r",?\s+and\s+|\s*;\s*|\s*,\s*then\s+|\s+then\s+",
                             re.I)


def _is_value_like(fragment: str) -> bool:
    """True for short numeric option fragments like '420 L' or '0.001'."""
    frag = fragment.strip(" \t\r\n,;:")
    if not frag or "?" in frag or not re.search(r"\d", frag):
        return False
    if _ASK_WORD_RE.search(frag):
        return False
    tokens = re.findall(r"[A-Za-z]+", frag)
    if len(tokens) > 3:
        return False
    return all(_UNIT_TOKEN_RE.match(t) for t in tokens)


def _clean_raw(raw: str) -> str:
    """Trim joiner residue ('bile juice, and' -> 'bile juice')."""
    raw = raw.strip(" \t\r\n,;:")
    return re.sub(r"\s*,?\s*(?:and|or|with)\s*$", "", raw).strip(" ,;:")


# ------------------------------------------------------------------ #
# shape 1+2: (a)/(b) and (i)/(ii) paren enumerators
# ------------------------------------------------------------------ #

def _is_fragment(raw: str) -> bool:
    """True when a fragment carries no content of its own -- a bare
    connective or citation tail ('and', '(b) 480 L' handled elsewhere).
    A part must hold at least one >=4-letter word or a digit."""
    if re.search(r"\d", raw):
        return False
    return not re.search(r"[A-Za-z]{4,}", raw)


def _best_run(markers, order: List[str]):
    """The part-label run: strictly increasing, starting at the first
    label of its order ('a' / 'i'), preferring the all-lowercase run.

    Stray markers that merely collide with the pattern (set notation
    like 'n(C) = 30', figure labels '(A)') stay out of the run; the
    scenario before the run still carries them verbatim, so nothing is
    lost and every part keeps the full preamble."""
    candidates: List[List[tuple]] = []
    cur: List[tuple] = []
    prev_rank: Optional[int] = None

    def _close():
        nonlocal cur, prev_rank
        if len(cur) >= 2 and cur[0][2].strip().lower() == order[0]:
            candidates.append(cur)
        cur, prev_rank = [], None

    for m in markers:
        lab = m[2].strip().lower()
        if lab not in order:
            _close()
            continue
        rank = order.index(lab)
        if cur and prev_rank is not None and rank <= prev_rank:
            _close()
        cur.append(m)
        prev_rank = rank
    _close()
    if not candidates:
        return []
    return max(candidates, key=lambda r: (
        all(m[2].strip().islower() for m in r), len(r)))


def _parts_from_markers(text: str, markers, order, shape: str
                        ) -> Optional[PartSplit]:
    """Build a PartSplit from one strictly-increasing marker run.

    Unlike multi_part (which demands consecutive labels AND closed
    previous parts because it aggregates ONE answer), part-wise verdicts
    tolerate label skips -- (a), (b), (d) still splits into three parts:
    every character between the first and last run marker lands inside
    some part, so no sub-question is lost, and a part-level refusal is
    always honest.  Out-of-order repeats ("(a) ... (a) ...") are not a
    part list and refuse.
    """
    if len(markers) < 2 or len(markers) > MAX_PARTS + 4:
        return None
    run = _best_run(markers, order)
    if len(run) < 2 or len(run) > MAX_PARTS:
        return None
    scenario = text[:run[0][0]].strip()
    parts: List[SubPart] = []
    for i, (start, end, label) in enumerate(run):
        nxt = run[i + 1][0] if i + 1 < len(run) else len(text)
        raw = _clean_raw(text[end:nxt])
        if _is_fragment(raw):
            return None     # citation mention / connective, not a part
        parts.append(SubPart(part_id=label.lower(), raw=raw))
    return _finish(scenario, parts, shape)


def _split_enumerated(text: str) -> Optional[PartSplit]:
    for pattern, order, shape in (
            (_PAREN_LETTER_RE, _LETTER_ORDER, "paren_letter"),
            (_PAREN_ROMAN_RE, _ROMAN_ORDER, "roman")):
        markers = [(m.start(), m.end(), (m.group(1) or "").strip())
                   for m in pattern.finditer(text)]
        if len(markers) < 2:
            continue
        reading = _parts_from_markers(text, markers, order, shape)
        if reading is not None:
            return reading
    return None


# ------------------------------------------------------------------ #
# shape 3: line-start numbered exercise enumerators
# ------------------------------------------------------------------ #

def _split_numbered(text: str) -> Optional[PartSplit]:
    """'Q1. ... / 2. ...' line lists.

    A short non-marker lead line (a shared instruction like 'Answer all
    questions:' or a case-study header) becomes the SCENARIO every part
    inherits; a long one is itself a part (a narrative stem with its own
    content, not mere context)."""
    lines = [ln for ln in text.splitlines() if ln.strip()]
    if len(lines) < 2:
        return None
    segments: List[tuple] = []      # (number or None, [lines])
    for ln in lines:
        m = _NUMBERED_RE.match(ln)
        if m is None:
            if segments:
                segments[-1][1].append(ln)
            else:
                segments.append((None, [ln]))
            continue
        num = int(m.group("qnum") or m.group("num"))
        body = ln[m.end():].strip()
        segments.append((num, [body] if body else []))
    numbered = [s for s in segments if s[0] is not None]
    if len(numbered) < 2:
        return None
    if any(s[0] is None for s in segments[1:]):
        return None     # non-marker body after numbered items: not a list
    nums = [s[0] for s in numbered]
    if any(b <= a for a, b in zip(nums, nums[1:])):
        return None
    scenario = ""
    parts: List[SubPart] = []
    if segments[0][0] is None:
        lead = " ".join(segments[0][1]).strip()
        if len(lead) <= 300:
            scenario = lead         # shared instruction / case wrapper
        else:
            parts.append(SubPart(part_id="0", raw=lead))
    for num, body_lines in numbered:
        body = " ".join(body_lines).strip()
        if len(body) < 8 or _is_fragment(body):
            return None
        parts.append(SubPart(part_id=str(num), raw=body))
    return _finish(scenario, parts, "numbered")


# ------------------------------------------------------------------ #
# shape 4: sub-asks -- multiple ask clauses / sentences / objects
# ------------------------------------------------------------------ #

def _ask_clause_pieces(clause: str) -> List[str]:
    """Split one ask clause into >=2 standalone ask pieces, else [].

    Mechanism 1 -- another ask verb after a clause-join boundary:
      "Identify the limiting reagent and state how many moles of water
       are formed"
      -> ["Identify the limiting reagent",
          "state how many moles of water are formed"]
      (a single leading adverb is skipped: "and briefly describe ...")

    Mechanism 2 -- compound object: one ask verb, two >=3-word objects
    joined by ' and '.  The second object inherits the ask verb verbatim:
      "Find the equilibrium price and the equilibrium quantity"
      -> ["Find the equilibrium price",
          "Find the equilibrium quantity"]
      'points A and B' refuses (short second side); a trailing modifier
      orphaning the first side ('Find the HCF and LCM of 12 and 18')
      yields one guided part -- honest, never wrong.
    """
    points: List[int] = []
    for m in _CLAUSE_JOIN_RE.finditer(clause):
        tail = clause[m.end():].lstrip()
        if _SUBASK_VERB_RE.match(tail) or _ADVERB_VERB_RE.match(tail):
            points.append(m.end())
    if points:
        pieces: List[str] = []
        prev = 0
        for pt in points:
            seg = clause[prev:pt].strip(" ,;:")
            if seg:
                pieces.append(seg)
            prev = pt
        tail = clause[prev:].strip(" ,;:")
        if tail:
            pieces.append(tail)
        # every piece must ask on its own: a verb in its first two words
        head = re.compile(r"^[A-Za-z-]+\s+[A-Za-z-]+")
        for pc in pieces:
            probe = head.match(pc)
            window = probe.group(0) if probe else pc
            if len(pc.split()) < 3 or not _SUBASK_VERB_RE.search(window):
                return []
        return pieces
    # mechanism 2: compound object under one ask verb.  A join whose
    # LEFT side is a 'between ...' / 'difference between ...' pairing is
    # ONE ask over a coordinate pair ("Distinguish between provision
    # and reserve", "Find the distance between the points A and B") --
    # never two asks.
    head_verb = _SUBASK_VERB_RE.match(clause)
    if head_verb is None:
        return []
    for j in re.finditer(r"\s+and\s+", clause, re.I):
        left, right = clause[:j.start()].strip(), clause[j.end():].strip()
        if re.search(r"\bbetween\b", left, re.I):
            continue
        if len(left.split()) >= 3 and len(right.split()) >= 3:
            if _SUBASK_VERB_RE.match(right):
                second = right              # already its own ask
            else:
                second = head_verb.group(0) + " " + right
            return [left, second]
    return []


def _split_subasks(text: str) -> Optional[PartSplit]:
    """>=2 asks in one passage; every part inherits the scenario."""
    sentences = [s.strip() for s in re.split(r"(?<=[.?!])\s+", text)
                 if s.strip()]
    ask_sents = [s for s in sentences if _SUBASK_VERB_RE.search(s)]
    # sentence-level: >=2 sentences and EVERY sentence asks something
    if len(ask_sents) >= 2 and len(ask_sents) == len(sentences) \
            and len(sentences) <= MAX_PARTS:
        parts = [SubPart(part_id=f"ask-{i + 1}", raw=s)
                 for i, s in enumerate(sentences)]
        reading = _finish("", parts, "subasks")
        if reading is not None:
            return reading
    # clause-level: scenario = everything before the first ask verb
    joined = " ".join(sentences)
    first_verb = _SUBASK_VERB_RE.search(joined)
    if first_verb is None:
        return None
    scenario = joined[:first_verb.start()].strip()
    clause = joined[first_verb.start():].strip()
    pieces = _ask_clause_pieces(clause)
    if len(pieces) < 2 or len(pieces) > MAX_PARTS:
        return None
    parts = [SubPart(part_id=f"ask-{i + 1}", raw=_clean_raw(pc))
             for i, pc in enumerate(pieces)]
    return _finish(scenario, parts, "subasks")


# ------------------------------------------------------------------ #
# shape 5: semicolon-separated asks
# ------------------------------------------------------------------ #

def _split_semicolon(text: str) -> Optional[PartSplit]:
    """'; '-separated asks -- every side must ask something on its own.

    A data list ('Capital Rs 5,00,000; Purchases Rs 3,20,000; ...')
    refuses: only ONE ask governs those semicolons."""
    sides = [s.strip(" ,;:") for s in text.split(";") if s.strip(" ,;:")]
    if not (2 <= len(sides) <= MAX_PARTS):
        return None
    if not all(_ASK_WORD_RE.search(s) or "?" in s for s in sides):
        return None
    parts = [SubPart(part_id=str(i + 1), raw=s)
             for i, s in enumerate(sides)]
    return _finish("", parts, "semicolon")


# ------------------------------------------------------------------ #
# shared final guards + public API
# ------------------------------------------------------------------ #

def _finish(scenario: str, parts: List[SubPart], shape: str
            ) -> Optional[PartSplit]:
    """Option lists and ask-less fragments refuse the split."""
    if not (2 <= len(parts) <= MAX_PARTS):
        return None
    for p in parts:
        # "(a) 420 L (b) 480 L" = MCQ option data, owned by the MCQ gate
        if _is_value_like(p.raw):
            return None
        # each solved string must be a real question, never a stub
        if len((scenario + " " + p.raw).strip()) < 12:
            return None
    joined = scenario + " " + " ".join(p.raw for p in parts)
    if not ("?" in joined or _ASK_WORD_RE.search(joined)):
        return None     # sub-parts must ask something
    return PartSplit(scenario=scenario, parts=parts, shape=shape)


def split_parts(text: str) -> Optional[PartSplit]:
    """Split a multi-part question; None when it is not one.

    A single question is never touched, MCQ option lists and
    assertion-reason / match-the-following structures never split, and
    anything with more than MAX_PARTS fragments refuses (the whole
    question keeps its ordinary honest refusal).
    """
    if not text or not text.strip() or len(text) > 4000:
        return None
    if _STRUCTURAL_RE.search(text):
        return None
    for shape in (_split_enumerated, _split_numbered,
                  _split_subasks, _split_semicolon):
        reading = shape(text)
        if reading is not None:
            return reading
    return None


def overall_verdict(part_tiers: List[str]) -> str:
    """'verified' | 'partial' | 'guided' from the parts' truth labels.

    verified only when EVERY part verified; any guided part keeps the
    composite honest -- verified parts stay listed beside guided ones.
    """
    verified = [t for t in part_tiers if str(t or "").startswith("VERIFIED")]
    if verified and len(verified) == len(part_tiers):
        return "verified"
    if verified:
        return "partial"
    return "guided"
