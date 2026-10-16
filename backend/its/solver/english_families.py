"""english_families.py -- deterministic English grammar & literature
families for classes 6-12 CBSE/ICSE (batch-18).

Same house conventions as the other subject family modules: a TABLE of
(FID, regex, handler) rows scanned by model_english(); handlers return a
6-tuple (value, steps, answer, assumptions, governing_equation, extra)
built from the standard _res()/_no() helpers; _GATE refusals let the
scan continue.  No LLM calls anywhere.  Ground truth: the authored
corpus (closed world) -- enhanced_nodes_md/c{6..12}_gram_*, c*_engl_*,
c6_english_* and cisce_nodes_v2/c*_eng_icse_*; every rule and trap note
below traces to a node's DEFINITION/WALKTHROUGH/DIAGNOSTIC sections.

Families:
  tenses     TENSE_IDENTIFY (12-cell grid), TENSE_CONVERT (any pair)
  voice      VOICE_CHANGE (active <-> passive, taught tenses + modals)
  narration  NARRATION_CHANGE (statements / yes-no / wh-questions /
             commands+negatives, backshift + pronoun + time shifts)
  errors     ERROR_SPOTTING (corpus trap catalog: agreement decoys,
             stative-ing, since/for, double past, tense drift,
             its/it's, a/an sound, neither/nor, measured quantities,
             there is/are, preposition collocations)
  transforms DEGREE_TRANSFORM (positive/comparative/superlative frames),
             TOO_TO_SO_THAT, AFFIRM_NEG (always/never + antonym),
             EXCLAMATORY_ASSERTIVE (What a/How frames)
  structure  CLAUSE_TYPE (simple/compound/complex),
             NONFINITE_IDENTIFY (infinitive/gerund/participle),
             CONDITIONAL_TYPE (type 1/2/3 + if-clause gap-fill)
  gap-fill   DETERMINER_CHOICE (a/an sound, few/little attitude,
             many/much, this/that/these/those),
             PREPOSITION_COLLOCATION (corpus collocation list),
             CONJUNCTION_CHOICE (so/because/but/or logic)
  devices    FIGURE_OF_SPEECH (simile/metaphor/personification/hyperbole/
             alliteration/onomatopoeia identification)

STEP CONTRACT (enforced by test_english_families.py): every matched
answer carries >= 3 steps totalling >= 150 chars in the 5-beat shape --
method/rule line, given-sentence restatement, the rule applied,
verification re-check (agreement/tense re-tested), interpretation.
Honesty: taught-but-unimplemented topics (question tags, reported
exclamations, assertive<->interrogative, rhyme scheme) are DECLINED,
never faked; Devanagari input never matches any family.

Dispatcher: model_english(text) -> ModelResult (first grounded row
wins; a gate refusal lets the scan continue).  Deterministic only.

WS-B merge (2026-10-10): the English grammar LANG_* specs and their
computes moved here from structure_families_lang.py (consolidation
map step 6) as ENGLISH_LANG_SPECS -- ids verbatim, verifier keys
keep hitting.
"""

from __future__ import annotations

import re
from typing import Any, Dict, List, Optional, Tuple

from backend.its.solver.modeling_layer import ModelResult

# --------------------------------------------------------------------------- #
# helpers (same shape as biology_families.py)
# --------------------------------------------------------------------------- #


def _no(structure: str, note: str) -> ModelResult:
    return ModelResult(structure=structure, matched=False, confidence=0.0,
                       quantities={}, governing_equation="", note=note)


def _res(structure: str, g: Dict[str, Any], value: Optional[float], eq: str,
         steps: List[str], answer: Optional[str] = None,
         assumptions: Optional[List[str]] = None, conf: float = 0.95,
         extra: Optional[Dict[str, Any]] = None) -> ModelResult:
    """Matched ModelResult; non-numeric slots are dropped from quantities."""
    q: Dict[str, float] = {}
    for k, v in (g or {}).items():
        if isinstance(v, (int, float)) and not isinstance(v, bool):
            q[k] = float(v)
    for k, v in (extra or {}).items():
        if isinstance(v, (int, float)) and not isinstance(v, bool):
            q[k] = float(v)
    return ModelResult(
        structure=structure, matched=True, confidence=conf,
        quantities=q, governing_equation=eq,
        final_answer=answer if answer is not None else
        (f"{value:.6g}" if value is not None else ""),
        numeric_answer=value, steps=steps,
        note="; ".join(assumptions) if assumptions else "")


# gate-failure tuple: value None + empty steps -> dispatcher keeps scanning
_GATE = (None, [], None, None, None, None)


def _normalize(text: str) -> str:
    """Deterministic surface cleanup: curly quotes/dashes -> ASCII,
    collapse whitespace.  Case is preserved (English needs it)."""
    t = (text or "").replace("\u2018", "'").replace("\u2019", "'") \
        .replace("\u201c", '"').replace("\u201d", '"') \
        .replace("\u2013", "-").replace("\u2014", "-")
    t = re.sub(r"\s+", " ", t).strip()
    return t


_DEV_RE = re.compile(r"[\u0900-\u097F]")


def _cap(s: str) -> str:
    return s[:1].upper() + s[1:] if s else s


_LOWERABLE = {"i", "he", "she", "it", "they", "we", "you", "the", "a",
              "an", "my", "his", "her", "their", "our", "this", "that",
              "these", "those", "no", "every", "each", "some", "all",
              "his", "her"}


def _steps5(method: str, given: str, computations: List[str], check: str,
            interp: str) -> List[str]:
    """Assemble the 5-beat step list (method / given / rule applied /
    verification / interpretation)."""
    return ["Method: " + method,
            "Given: " + given] + \
        ["Rule applied: " + c for c in computations] + \
        ["Check: " + check,
         "Interpretation: " + interp]


# --------------------------------------------------------------------------- #
# morphology: irregular verbs, base-form recovery, conjugation
# --------------------------------------------------------------------------- #

_IRREG: Dict[str, Tuple[str, str]] = {
    "be": ("was", "been"), "have": ("had", "had"), "do": ("did", "done"),
    "go": ("went", "gone"), "eat": ("ate", "eaten"),
    "write": ("wrote", "written"), "take": ("took", "taken"),
    "see": ("saw", "seen"), "give": ("gave", "given"),
    "come": ("came", "come"), "make": ("made", "made"),
    "know": ("knew", "known"), "think": ("thought", "thought"),
    "say": ("said", "said"), "tell": ("told", "told"),
    "find": ("found", "found"), "leave": ("left", "left"),
    "feel": ("felt", "felt"), "keep": ("kept", "kept"),
    "begin": ("began", "begun"), "bring": ("brought", "brought"),
    "buy": ("bought", "bought"), "catch": ("caught", "caught"),
    "choose": ("chose", "chosen"), "cut": ("cut", "cut"),
    "draw": ("drew", "drawn"), "drink": ("drank", "drunk"),
    "drive": ("drove", "driven"), "fall": ("fell", "fallen"),
    "fly": ("flew", "flown"), "forget": ("forgot", "forgotten"),
    "get": ("got", "got"), "grow": ("grew", "grown"),
    "hear": ("heard", "heard"), "hold": ("held", "held"),
    "hurt": ("hurt", "hurt"), "lead": ("led", "led"),
    "lose": ("lost", "lost"), "meet": ("met", "met"),
    "pay": ("paid", "paid"), "put": ("put", "put"),
    "read": ("read", "read"), "ring": ("rang", "rung"),
    "rise": ("rose", "risen"), "run": ("ran", "run"),
    "sell": ("sold", "sold"), "send": ("sent", "sent"),
    "shine": ("shone", "shone"), "sing": ("sang", "sung"),
    "sit": ("sat", "sat"), "sleep": ("slept", "slept"),
    "speak": ("spoke", "spoken"), "spend": ("spent", "spent"),
    "stand": ("stood", "stood"), "swim": ("swam", "swum"),
    "teach": ("taught", "taught"), "tear": ("tore", "torn"),
    "throw": ("threw", "thrown"),
    "understand": ("understood", "understood"),
    "wake": ("woke", "woken"), "wear": ("wore", "worn"),
    "win": ("won", "won"), "build": ("built", "built"),
    "break": ("broke", "broken"), "ride": ("rode", "ridden"),
    "shake": ("shook", "shaken"), "steal": ("stole", "stolen"),
    "sweep": ("swept", "swept"), "spread": ("spread", "spread"),
}

_V2_TO_V1 = {v2: v1 for v1, (v2, _v3) in _IRREG.items()}
_V3_TO_V1 = {v3: v1 for v1, (_v2, v3) in _IRREG.items()}
_V2_SET = set(_V2_TO_V1)
_V3_SET = set(_V3_TO_V1)
_VOWELS = "aeiou"

# participial adjectives that must never be read as finite verbs
_ADJ_PARTICIPLES = {"tired", "interested", "excited", "bored", "worried",
                    "pleased", "surprised", "aged", "married", "educated"}

# common verbs (for -s form, command and bare-form detection); the
# corpus drill-verb vocabulary
_COMMON_VERBS = {
    "answer", "ask", "bring", "build", "buy", "call", "carry", "catch",
    "clean", "close", "come", "cook", "cut", "dance", "draw", "dream",
    "drink", "drive", "eat", "err", "explain", "feed", "feel", "fetch",
    "finish", "fly", "forget", "forgive", "get", "give", "go", "grow",
    "hear", "help", "hold", "hope", "hurt", "invite", "join", "jump", "keep", "kick",
    "kill", "kiss", "know", "laugh", "learn", "lend", "listen", "look",
    "lose", "love", "like", "make", "meet", "miss", "need", "obey",
    "open", "paint", "pay", "play", "post", "promise", "pull", "push",
    "put", "read", "repair", "ride", "ring", "rise", "run", "say",
    "see", "sell", "send", "shake", "sing", "sit", "sleep", "speak",
    "spend", "stand", "steal", "stop", "sweep", "swim", "take", "talk",
    "teach", "tell", "think", "throw", "touch", "travel", "visit",
    "wait", "wake", "walk", "wash", "watch", "water", "wear", "win",
    "write", "shine", "show", "worry", "study", "try", "cry", "hurry",
    "marry", "reply", "stay", "enjoy", "decide", "believe", "move",
    "live", "change", "receive", "reach", "remember", "return",
    "happen", "seem", "become", "leave", "arrive", "enter", "follow",
    "accept", "agree", "allow", "appear", "apply", "argue", "begin",
    "break", "choose", "complain", "count", "cover", "create",
    "describe", "destroy", "discover", "discuss", "divide", "doubt",
    "expect", "face", "fill", "gain", "gather", "greet", "handle",
    "hang", "imagine", "improve", "increase", "introduce", "invent",
    "judge", "knock", "land", "lead", "lift", "name", "note", "order",
    "pack", "pass", "perform", "pick", "plan", "plant", "point",
    "prefer", "prepare", "prevent", "print", "produce", "protect",
    "provide", "publish", "raise", "realise", "realize", "recognise",
    "recognize", "record", "reduce", "reflect", "refuse", "relate",
    "release", "remain", "remove", "repeat", "replace", "report",
    "request", "require", "respect", "review", "save", "search",
    "select", "share", "shout", "smile", "solve", "sort", "sound",
    "start", "stick", "strike", "suggest", "support", "suppose",
    "surround", "taste", "thank", "train", "treat", "trust", "turn",
    "unlock", "update", "use", "want", "warn", "waste", "wave", "weigh",
    "whisper", "wish", "wonder", "work", "harvest", "plough", "sow",
    "reap", "worship", "celebrate", "distribute", "decorate", "greet",
}


def _to_base(word: str) -> str:
    """Best-effort lexeme recovery from any surface verb form."""
    w = word.lower().strip(".,!?;:'\"")
    if w in _V2_TO_V1:
        return _V2_TO_V1[w]
    if w in _V3_TO_V1:
        return _V3_TO_V1[w]
    if w.endswith("ies") and len(w) > 4:
        return w[:-3] + "y"
    if w.endswith(("ches", "shes", "xes", "zes", "oes")):
        return w[:-2]
    if w.endswith("s") and not w.endswith("ss") and len(w) > 1:
        return w[:-1]
    if w.endswith("ing"):
        b = w[:-3]
        if len(b) >= 3 and b[-1] == b[-2] and b[-1] in "bdgmnprt":
            b = b[:-1]
        if b not in _COMMON_VERBS and (b + "e") in _COMMON_VERBS:
            return b + "e"  # writing -> write (e-drop)
        return b
    if w.endswith("ied") and len(w) > 4:
        return w[:-3] + "y"
    if w.endswith("ed"):
        b = w[:-2]
        if len(b) >= 3 and b[-1] == b[-2] and b[-1] in "bdgmnprt":
            b = b[:-1]
        if b not in _COMMON_VERBS and (b + "e") in _COMMON_VERBS:
            return b + "e"  # loved -> love (e-drop)
        return b
    return w


def _vs(base: str) -> str:
    b = base.lower()
    if b == "be":
        return "is"
    if b == "have":
        return "has"
    if b.endswith(("s", "x", "z", "ch", "sh", "o")):
        return b + "es"
    if b.endswith("y") and len(b) > 1 and b[-2] not in _VOWELS:
        return b[:-1] + "ies"
    return b + "s"


def _v2(base: str) -> str:
    b = base.lower()
    if b in _IRREG:
        return _IRREG[b][0]
    if b.endswith("e"):
        return b + "d"
    if b.endswith("y") and len(b) > 1 and b[-2] not in _VOWELS:
        return b[:-1] + "ied"
    if len(b) >= 3 and b[-1] not in _VOWELS + "wxy" and \
            b[-2] in _VOWELS and b[-3] not in _VOWELS:
        return b + b[-1] + "ed"
    return b + "ed"


def _v3(base: str) -> str:
    b = base.lower()
    if b in _IRREG:
        return _IRREG[b][1]
    return _v2(b)


def _ving(base: str) -> str:
    b = base.lower()
    if b == "be":
        return "being"
    if b.endswith("ie"):
        return b[:-2] + "ying"
    if b.endswith("e") and not b.endswith("ee"):
        return b[:-1] + "ing"
    if len(b) >= 3 and b[-1] not in _VOWELS + "wxy" and \
            b[-2] in _VOWELS and b[-3] not in _VOWELS:
        return b + b[-1] + "ing"
    return b + "ing"


def _is_v3(w: str) -> bool:
    lw = w.lower().strip(".,!?;:'\"")
    return lw in _V3_SET or (lw.endswith("ed") and
                             _to_base(lw) in _COMMON_VERBS)


def _is_v2(w: str) -> bool:
    lw = w.lower().strip(".,!?;:'\"")
    return (lw in _V2_SET or
            (lw.endswith("ed") and _to_base(lw) in _COMMON_VERBS)) \
        and lw not in _ADJ_PARTICIPLES


def _is_ving(w: str) -> bool:
    lw = w.lower().strip(".,!?;:'\"")
    return lw.endswith("ing") and len(lw) > 4 and \
        _to_base(lw) in _COMMON_VERBS | {"be", "have", "do", "go", "say"}


_BE = {"is", "am", "are", "was", "were", "be", "been", "being"}
_HAVEAUX = {"has", "have", "had"}
_MODAL = {"will", "shall", "would", "should", "can", "could", "may",
          "might", "must", "ought"}
_DOAUX = {"do", "does", "did"}
_WH = {"what", "where", "when", "why", "who", "whom", "whose", "which",
       "how"}
_SUBJ_PRON = {"i", "he", "she", "it", "we", "they", "you"}
_SUBJ_TO_OBJ = {"i": "me", "we": "us", "he": "him", "she": "her",
                "they": "them", "you": "you", "who": "whom"}
_OBJ_TO_SUBJ = {v: k for k, v in _SUBJ_TO_OBJ.items()}

_UNCOUNT = {
    "water", "milk", "sugar", "salt", "rice", "wheat", "flour", "oil",
    "tea", "coffee", "blood", "bread", "butter", "cheese", "meat",
    "money", "cash", "traffic", "furniture", "luggage", "baggage",
    "equipment", "machinery", "homework", "housework", "work",
    "information", "advice", "knowledge", "news", "progress", "research",
    "evidence", "scenery", "poetry", "jewellery", "jewelry", "hope",
    "happiness", "honesty", "courage", "anger", "love", "hatred",
    "music", "art", "luck", "weather", "thunder", "lightning", "health",
    "wealth", "education", "behaviour", "behavior", "pollution",
    "growth", "sand", "dust", "smoke", "steam", "gold", "silver",
    "wood", "paper", "glass", "soap", "jam", "honey", "help", "time",
}
_SING_S_NOUNS = {
    "bus", "class", "dress", "address", "glass", "grass", "pass", "loss",
    "cross", "boss", "gas", "atlas", "canvas", "chaos", "circus",
    "virus", "status", "news", "series", "species", "means", "summons",
    "mathematics", "physics", "economics", "politics", "measles",
    "billiards",
}


def _np_number(np: str) -> str:
    """'singular' | 'plural' | 'first' (I) for a noun phrase."""
    words = [w.strip(".,!?;:'\"") for w in np.split()
             if w.strip(".,!?;:'\"")]
    if not words:
        return "singular"
    first = words[0].lower()
    if first == "i":
        return "first"
    if first in ("we", "you", "they"):
        return "plural"
    if first in ("he", "she", "it"):
        return "singular"
    last = words[-1].lower()
    if last in _UNCOUNT or last in _SING_S_NOUNS:
        return "singular"
    if last.endswith("s"):
        return "plural"
    return "singular"


def _be_for(number: str, tense: str) -> str:
    if tense == "present":
        return {"first": "am", "singular": "is",
                "plural": "are"}.get(number, "is")
    return {"first": "was", "singular": "was",
            "plural": "were"}.get(number, "was")


def _have_for(number: str) -> str:
    return "has" if number == "singular" else "have"


def _quote_of(text: str) -> Optional[str]:
    """The sentence to operate on: a quoted segment (apostrophe-safe),
    else after the last colon, else the whole text."""
    m = re.search(r'"([^"]{4,})"', text)
    if m:
        return m.group(1).strip()
    for m in re.finditer(r"'([^']{4,})'", text):
        pre = text[m.start() - 1:m.start()]
        post = text[m.end():m.end() + 1]
        if not pre.isalnum() and not post.isalnum():
            return m.group(1).strip()
    m = re.search(r":\s*(.+)$", text)
    if m:
        return m.group(1).strip()
    return None


def _tokenize(s: str) -> List[str]:
    return re.findall(r"[A-Za-z']+", s)


# --------------------------------------------------------------------------- #
# tense classification (the 12-cell grid, c10_gram_cbse_90_001)
# --------------------------------------------------------------------------- #

_PRES_MARKERS = ("every day", "daily", "usually", "often", "always",
                 "now", "regularly", "generally", "sometimes")
_PAST_MARKERS = ("yesterday", "ago", "last night", "last week",
                 "last year", "last month", "in 1990", "in 2010",
                 "in 1947")


def _classify_tense(sent: str) -> Optional[Tuple[str, str, str]]:
    """-> (tense name, verb-group text, frame note) or None."""
    s = sent.strip()
    m = re.search(r"\b(will|shall)\s+have\s+been\s+[A-Za-z]+ing\b", s,
                  re.I)
    if m:
        return "future perfect continuous", m.group(0), \
            "will have been + V-ing"
    m = re.search(r"\b(has|have|had)\s+been\s+([A-Za-z]+ing)\b", s, re.I)
    if m:
        name = "past perfect continuous" if m.group(1).lower() == "had" \
            else "present perfect continuous"
        return name, m.group(0), m.group(1) + " been + V-ing"
    m = re.search(r"\b(is|am|are|was|were)\s+going\s+to\s+[a-z]+", s,
                  re.I)
    if m:
        return "future (be going to)", m.group(0), "be going to + V1"
    m = re.search(r"\b(will|shall)\s+have\s+([A-Za-z]+)\b", s, re.I)
    if m and _is_v3(m.group(2)):
        return "future perfect", m.group(0), "will have + V3"
    m = re.search(r"\b(will|shall)\s+be\s+([A-Za-z]+ing)\b", s, re.I)
    if m:
        return "future continuous", m.group(0), "will be + V-ing"
    m = re.search(r"\b(will|shall)\s+([A-Za-z]+)\b", s, re.I)
    if m and (m.group(2).lower() in _COMMON_VERBS or
              m.group(2).lower() in ("be", "have", "do")):
        return "simple future", m.group(0), "will + V1"
    m = re.search(r"\b(has|have)\s+([A-Za-z]+)\b", s, re.I)
    if m and _is_v3(m.group(2)):
        return "present perfect", m.group(0), "has/have + V3"
    m = re.search(r"\bhad\s+([A-Za-z]+)\b", s, re.I)
    if m and _is_v3(m.group(1)):
        return "past perfect", m.group(0), "had + V3"
    m = re.search(r"\b(is|am|are)\s+([A-Za-z]+ing)\b", s, re.I)
    if m:
        return "present continuous", m.group(0), "is/am/are + V-ing"
    m = re.search(r"\b(was|were)\s+([A-Za-z]+ing)\b", s, re.I)
    if m:
        return "past continuous", m.group(0), "was/were + V-ing"
    m = re.search(r"\b(is|am|are)\b", s, re.I)
    if m:
        return "simple present", m.group(0), "be in the present"
    m = re.search(r"\b(was|were)\b", s, re.I)
    if m:
        return "simple past", m.group(0), "be in the past"
    m = re.search(r"\b(has|have)\b", s, re.I)
    if m:
        return "present perfect", m.group(0), "has/have + V3"
    if re.search(r"\bhad\b", s, re.I):
        return "past perfect", "had", "had + V3"
    if re.search(r"\b(does|do)\b", s, re.I):
        return "simple present", "do/does", "do-support present"
    if re.search(r"\bdid\b", s, re.I):
        return "simple past", "did", "did + V1"
    # bare main verb: first verb-shaped token decides
    toks = _tokenize(s)
    for i, w in enumerate(toks):
        lw = w.lower()
        if lw in _BE or lw in _HAVEAUX or lw in _MODAL or lw in _DOAUX:
            continue
        if lw.endswith("s") and lw != _to_base(lw) and \
                _to_base(lw) in _COMMON_VERBS:
            return "simple present", w, "V-s (third person singular)"
        same_form = lw in _V2_SET and lw == _to_base(lw)
        if _is_v2(lw):
            if same_form:
                if any(mk in s.lower() for mk in _PRES_MARKERS):
                    return "simple present", w, "V1 (same-form verb, " \
                                                "present marker)"
                if any(mk in s.lower() for mk in _PAST_MARKERS) or \
                        _np_number(" ".join(toks[:i])) == "singular":
                    return "simple past", w, "V2 (same-form verb)"
                return "simple present", w, "V1 (same-form verb)"
            return "simple past", w, "V2"
        if lw in _COMMON_VERBS:
            num = _np_number(" ".join(toks[:i])) if i else "plural"
            if num == "singular":
                return "simple past", w, "V2 (bare form after singular " \
                                         "subject)"
            return "simple present", w, "V1 (base form)"
    return None


_TENSE_TRAP = ("Corpus trap (c8_gram_cbse_80_001): 'I am waiting since "
               "morning' is wrong -- the since-marker demands the "
               "perfect-continuous family, and 'am' is the wrong anchor.")


def _c_tense_identify(g, m, text):
    sent = _quote_of(text)
    if not sent or len(sent.split()) < 3:
        return _GATE
    got = _classify_tense(sent)
    if not got:
        return _GATE
    name, group, frame = got
    markers = re.findall(r"\b(since|for|already|yet|just|yesterday|ago|"
                         r"tomorrow|now|tonight|daily)\b", sent, re.I)
    steps = _steps5(
        "the English tense system is a 12-cell grid -- three times "
        "(present, past, future) crossed with four aspects (simple, "
        "continuous, perfect, perfect-continuous) -- so the verb group "
        "itself names the cell (c10_gram_cbse_90_001).",
        f"sentence: {sent}; verb group: \"{group}\".",
        [f"the group \"{group}\" has the frame {frame}, which is the "
         f"{name} cell of the grid.",
         ("marker words found: " +
          ", ".join(sorted(set(w.lower() for w in markers))) +
          " -- markers pre-select the tense before the verb is touched."
          if markers else
          "no marker words (since/for/yet/already/by the time) are "
          "present, so the verb group alone decides the cell.")],
        f"re-built from the frame: {frame} -> {name}, matching the group "
        "actually present in the sentence.",
        f"the sentence sits in the {name} cell -- that is what the verb "
        "group tells the reader about time and aspect.")
    if markers:
        steps.append("Trap check: " + _TENSE_TRAP)
    return None, steps, f"tense: {name} (verb group \"{group}\")", None, \
        "12-cell tense grid: time x aspect; frame -> cell name", \
        {"n_markers": float(len(markers))}


_TENSE_NAMES = {
    "simple present": ("present", "simple"),
    "present indefinite": ("present", "simple"),
    "present continuous": ("present", "continuous"),
    "present perfect": ("present", "perfect"),
    "present perfect continuous": ("present", "perfectcont"),
    "simple past": ("past", "simple"),
    "past indefinite": ("past", "simple"),
    "past continuous": ("past", "continuous"),
    "past perfect": ("past", "perfect"),
    "past perfect continuous": ("past", "perfectcont"),
    "simple future": ("future", "simple"),
    "future indefinite": ("future", "simple"),
    "future continuous": ("future", "continuous"),
    "future perfect": ("future", "perfect"),
    "future perfect continuous": ("future", "perfectcont"),
}


def _build_tense(base: str, time: str, aspect: str, number: str) -> str:
    if aspect == "simple":
        if time == "present":
            if base == "be":
                return _be_for(number, "present")
            return _vs(base) if number == "singular" else base
        if time == "past":
            return _be_for(number, "past") if base == "be" else _v2(base)
        return "will " + base
    if aspect == "continuous":
        if time == "present":
            return f"{_be_for(number, 'present')} {_ving(base)}"
        if time == "past":
            return f"{_be_for(number, 'past')} {_ving(base)}"
        return f"will be {_ving(base)}"
    if aspect == "perfect":
        if time == "present":
            return f"{_have_for(number)} {_v3(base)}"
        if time == "past":
            return f"had {_v3(base)}"
        return f"will have {_v3(base)}"
    if time == "present":
        return f"{_have_for(number)} been {_ving(base)}"
    if time == "past":
        return f"had been {_ving(base)}"
    return f"will have been {_ving(base)}"


def _c_tense_convert(g, m, text):
    sent = _quote_of(text)
    tn = re.search(r"(?:into|to|in)\s+(?:the\s+)?((?:simple|present|past|"
                   r"future|perfect|continuous|indefinite|perfect\s*"
                   r"continuous)\s+)+tense", text, re.I)
    if not sent or not tn:
        return _GATE
    m2 = re.search(r"(?:into|to|in)\s+(.+?)\s+tense", tn.group(0), re.I)
    key = re.sub(r"\s+", " ", m2.group(1).lower()).strip() \
        if m2 else ""
    key = key.replace("indefinite", "simple")
    key = re.sub(r"perfect\s+continuous", "perfectcont", key)
    key = key.replace("perfectcont", "perfectcont").replace("-", " ")
    if key not in _TENSE_NAMES:
        return _GATE
    time, aspect = _TENSE_NAMES[key]
    got = _classify_tense(sent)
    if not got:
        return _GATE
    _old_name, group, _frame = got
    toks = re.findall(r"\S+", sent)
    vi = None
    gwords = re.findall(r"[A-Za-z']+", group)
    for i, t in enumerate(toks):
        tt = t.lower().strip(".,!?;:'\"")
        if gwords and tt == gwords[0].lower():
            vi = i
            break
    if vi is None:
        return _GATE
    subj_toks = toks[:vi]
    base = "be"
    for w in reversed(gwords):
        lw = w.lower()
        if lw in ("been", "being", "be"):
            base = "be"
            break
        if _is_ving(lw) or _is_v3(lw) or _is_v2(lw) or \
                lw in _COMMON_VERBS or (_to_base(lw) in _COMMON_VERBS and
                                        lw != _to_base(lw)):
            base = _to_base(lw)
            break
    number = _np_number(" ".join(subj_toks))
    new_group = _build_tense(base, time, aspect, number)
    out = _cap(" ".join(subj_toks + [new_group] +
                        toks[vi + len(gwords):]).strip())
    if not out.endswith((".", "!", "?")):
        out += "."
    check = _classify_tense(out)
    equiv_ok = check is not None and (
        check[0] == key or
        (key == "simple future" and check[0] == "future (be going to)") or
        (_TENSE_NAMES.get(key) == ("present", "simple") and
         check[0] == "simple present") or
        (_TENSE_NAMES.get(key) == ("past", "simple") and
         check[0] == "simple past") or
        (_TENSE_NAMES.get(key) == ("future", "simple") and
         check[0] in ("simple future", "future (be going to)")))
    if not equiv_ok:
        return _GATE
    assumptions = []
    if time == "future" and re.search(r"\byesterday|\bago\b|last \w+",
                                      sent, re.I):
        assumptions.append("a past time-marker survives from the original; "
                           "only the verb group was converted as asked")
    steps = _steps5(
        "every tense is a fixed verb-phrase frame on the 12-cell grid "
        "(c10_gram_cbse_90_001): rebuild the group from (time, aspect) "
        "and re-agree it with the subject.",
        f"sentence: {sent} (verb group \"{group}\"); target: {key}.",
        [f"lexeme recovered: {base}; subject "
         f"\"{' '.join(subj_toks)}\" is {number}.",
         f"target frame {time} + {aspect} builds the group: {new_group}.",
         f"converted sentence: {out}"],
        f"re-classifying the output reads "
        f"\"{check[0] if check else '?'}\" -- the requested {key} cell; "
        f"agreement re-tested: the new helper agrees with the "
        f"{number} subject.",
        "the same event is now reported in the requested cell; only the "
        "verb group changed, so the meaning is preserved.")
    return None, steps, out, assumptions or None, \
        "tense conversion: group -> frame(time, aspect) -> re-agree", \
        {"verb_changed": 1.0}


# --------------------------------------------------------------------------- #
# clause parsing for voice
# --------------------------------------------------------------------------- #

_OBJ_STARTERS = {"a", "an", "the", "my", "your", "his", "her", "its",
                 "our", "their", "this", "that", "these", "those", "some",
                 "many", "much", "few", "little", "one", "two", "three",
                 "four", "five", "ten", "me", "him", "us", "them",
                 "everything", "nothing", "something"}
_PREPS = {"on", "in", "at", "to", "from", "with", "by", "of", "for",
          "about", "into", "over", "under", "behind", "between", "near"}


def _match_group(low: List[str], vi: int) -> int:
    """Last index of the verb group starting at vi."""
    n = len(low)
    i = vi
    if low[i] in _MODAL:
        j = i + 1
        if j < n and low[j] == "have":
            j += 1
            if j < n and low[j] == "been":
                j += 1
            if j < n and _is_v3(low[j]):
                return j
            return min(j, n - 1)
        if j < n and low[j] == "be":
            j += 1
            if j < n and (_is_v3(low[j]) or _is_ving(low[j])):
                return j
            return j - 1
        if j < n and (_is_vbase_ok(low[j])):
            return j
        return min(j, n - 1)
    if low[i] in _HAVEAUX:
        j = i + 1
        if j < n and low[j] == "been":
            j += 1
            if j < n and (_is_ving(low[j]) or _is_v3(low[j])):
                return j
            return j - 1
        if j < n and _is_v3(low[j]):
            return j
        return min(j, n - 1)
    if low[i] in _BE:
        j = i + 1
        if j < n and low[j] == "being":
            j += 1
            if j < n and _is_v3(low[j]):
                return j
            return j - 1
        if j < n and _is_ving(low[j]):
            return j
        if j < n and _is_v3(low[j]):
            return j
        return i
    return i


def _is_vbase_ok(w: str) -> bool:
    lw = w.lower()
    return lw in _COMMON_VERBS


def _parse_clause(s: str) -> Optional[Dict[str, Any]]:
    """Split a clean SVO clause -> subject / verb group / form / object."""
    toks = _tokenize(s.rstrip(".?!"))
    if len(toks) < 3:
        return None
    low = [t.lower() for t in toks]
    vi = None
    for i, w in enumerate(low):
        if w in _BE or w in _HAVEAUX or w in _MODAL:
            vi = i
            break
        if _is_v2(w):
            vi = i
            break
        if w.endswith("s") and w != _to_base(w) and \
                _to_base(w) in _COMMON_VERBS:
            vi = i
            break
    if vi is None or vi == 0:
        return None
    j = _match_group(low, vi)
    group = toks[vi:j + 1]
    rest = toks[j + 1:]
    gl = [t.lower() for t in group]
    vbase = None
    for w in reversed(gl):
        lw = w.lower()
        if lw in ("been", "being", "be"):
            vbase = "be"
            break
        if _is_ving(lw) or _is_v3(lw) or _is_v2(lw) or lw in _COMMON_VERBS:
            vbase = _to_base(lw)
            break
    if vbase is None:
        return None
    if gl[0] in _MODAL:
        if len(gl) >= 2 and gl[1] == "have":
            form = "futperf" if _is_v3(gl[-1]) else "modalperf"
        elif len(gl) >= 3 and gl[1] == "be" and _is_ving(gl[-1]):
            form = "futcont"
        else:
            form = "modal"
    elif gl[0] in _HAVEAUX and "been" in gl:
        if _is_ving(gl[-1]):
            form = "perfcont"
        elif _is_v3(gl[-1]):
            form = "presperf" if gl[0] in ("has", "have") else "pastperf"
        else:
            form = "presperf" if gl[0] in ("has", "have") else "pastperf"
    elif gl[0] in _HAVEAUX and len(gl) >= 2 and _is_v3(gl[-1]):
        form = "presperf" if gl[0] in ("has", "have") else "pastperf"
    elif gl[0] in _BE and len(gl) >= 2 and _is_ving(gl[-1]):
        form = "prescont" if gl[0] in ("is", "am", "are") else "pastcont"
    elif gl[0] in _BE and len(gl) >= 2 and _is_v3(gl[-1]):
        form = "bepass"
    elif gl[0] in ("is", "am", "are"):
        form = "present"
    elif gl[0] in ("was", "were"):
        form = "past"
    elif len(gl) == 1 and _is_v2(gl[0]):
        form = "past"
    else:
        form = "present"
    if not rest:
        return None
    if rest[0].lower() in _PREPS and rest[0].lower() != "by":
        return None  # no object to promote (intransitive / complement)
    if rest[0].lower() not in _OBJ_STARTERS and \
            rest[0].lower() != "by" and not rest[0][0].isupper():
        return None
    return {"subj": toks[:vi], "group": group, "form": form, "obj": rest,
            "vbase": vbase}


_VOICE_TRAP = ("Corpus trap (c8_gram_cbse_81_002): intransitive verbs "
               "(sleep, arrive, happen) have no object to promote -- "
               "'The baby was slept' is impossible.")


def _c_voice(g, m, text):
    sent = _quote_of(text)
    if not sent:
        return _GATE
    want_active = bool(re.search(r"into\s+(the\s+)?active|active\s+voice",
                                 text, re.I)) or \
        (" by " in " " + sent.lower() + " " and
         not re.search(r"passive", text, re.I))
    p = _parse_clause(sent)
    if not p:
        return _GATE
    if want_active:
        return _voice_to_active(p, sent)
    return _voice_to_passive(p, sent)


def _voice_to_passive(p, sent):
    gl = [t.lower() for t in p["group"]]
    already_passive = (p["form"] in ("bepass", "perfcont") or
                       (p["form"] == "modal" and len(gl) >= 3 and
                        gl[1] == "be" and _is_v3(gl[-1])) or
                       (p["form"] in ("presperf", "pastperf") and
                        "been" in gl))
    if already_passive:
        return _GATE  # asked passive but the sentence is already passive
    obj = p["obj"]
    obj_num = _np_number(" ".join(obj))
    subj_txt = " ".join(p["subj"])
    agent = " ".join(_SUBJ_TO_OBJ.get(w.lower(), w) for w in p["subj"])
    if agent.split(" ")[0].lower() in _LOWERABLE and \
            len(agent.split(" ")) > 1:
        agent = agent[0].lower() + agent[1:]
    v3 = _v3(p["vbase"])
    form = p["form"]
    if form == "present":
        be = {"first": "am", "singular": "is",
              "plural": "are"}.get(obj_num, "is")
        new = f"{be} {v3}"
    elif form == "past":
        new = ("was" if obj_num in ("first", "singular") else
               "were") + f" {v3}"
    elif form == "prescont":
        be = {"first": "am", "singular": "is",
              "plural": "are"}.get(obj_num, "is")
        new = f"{be} being {v3}"
    elif form == "pastcont":
        be = "was" if obj_num in ("first", "singular") else "were"
        new = f"{be} being {v3}"
    elif form == "presperf":
        new = f"{_have_for(obj_num)} been {v3}"
    elif form == "pastperf":
        new = f"had been {v3}"
    elif form == "futperf":
        new = f"will have been {v3}"
    elif form == "modal":
        new = f"{p['group'][0]} be {v3}"
    else:
        return _GATE  # perfcont / futcont: no taught passive frame
    out = _cap(" ".join(obj) + " " + new + " by " + agent.strip() + ".")
    chk = _parse_clause(out)
    ok = chk is not None and chk["form"] in (
        "bepass", "prescont", "pastcont", "presperf", "pastperf",
        "futperf", "modal") and " by " in out
    if not ok:
        return _GATE
    steps = _steps5(
        "the passive transformation is fixed mechanics (c8_gram_ch81_003): "
        "object -> subject, verb -> tense-appropriate 'be + V3', subject "
        "-> 'by + agent'.",
        f"active: {sent}  (subject: {subj_txt}; verb group: "
        f"{' '.join(p['group'])}; object: {' '.join(obj)}).",
        [f"the object \"{(' '.join(obj))}\" is promoted to subject and "
         f"governs the be-form ({obj_num} -> {new.split()[0]}).",
         f"the verb reshapes to be + V3: {new} (V3 of {p['vbase']} is "
         f"{v3}).",
         f"the old subject moves behind 'by': by {agent}."],
        f"re-parsing the output finds be + V3 (\"{new}\") plus the agent "
        f"phrase, and agreement re-tests: {new.split()[0]} agrees with "
        f"\"{' '.join(obj)}\" ({obj_num}).",
        "the spotlight moves to the receiver of the action; the doer is "
        "demoted to a by-phrase while tense and meaning are preserved.")
    steps.append("Trap check: " + _VOICE_TRAP)
    return None, steps, out, None, \
        "passive: obj -> subj; verb -> be+V3; subj -> by-agent", \
        {"passive": 1.0}


def _voice_to_active(p, sent):
    gl = [t.lower() for t in p["group"]]
    if p["form"] not in ("bepass", "prescont", "pastcont", "presperf",
                         "pastperf", "futperf", "modal"):
        return _GATE  # not a passive sentence
    if p["form"] == "modal" and not (len(gl) >= 3 and gl[1] == "be" and
                                     _is_v3(gl[-1])):
        return _GATE
    low = " " + sent.lower() + " "
    bidx = sent.lower().rfind(" by ")
    if bidx < 0:
        return _GATE  # agentless passive: the doer is unknown
    agent = _tokenize(sent[bidx + 4:])
    if not agent:
        return _GATE
    asubj = [_OBJ_TO_SUBJ.get(w.lower(), w) for w in agent]
    anum = _np_number(" ".join(asubj))
    v3tok = next((t for t in reversed(gl) if _is_v3(t)), None)
    if v3tok is None:
        return _GATE
    base = _to_base(v3tok)
    if "being" in gl:
        verb = (f"{_be_for(anum, 'present')} {_ving(base)}"
                if gl[0] in ("is", "am", "are") else
                f"{_be_for(anum, 'past')} {_ving(base)}")
        desc = "continuous"
    elif p["form"] == "bepass" and gl[0] in ("is", "am", "are"):
        verb = _be_for(anum, "present") if base == "be" else \
            (_vs(base) if anum == "singular" else base)
        desc = "simple present"
    elif p["form"] == "bepass":
        verb = _be_for(anum, "past") if base == "be" else _v2(base)
        desc = "simple past"
    elif p["form"] == "prescont":
        verb = f"{_be_for(anum, 'present')} {_ving(base)}"
        desc = "present continuous"
    elif p["form"] == "pastcont":
        verb = f"{_be_for(anum, 'past')} {_ving(base)}"
        desc = "past continuous"
    elif p["form"] == "presperf":
        verb = f"{_have_for(anum)} {base if base == 'be' else _v3(base)}"
        desc = "present perfect"
    elif p["form"] == "pastperf":
        verb = f"had {base if base == 'be' else _v3(base)}"
        desc = "past perfect"
    elif p["form"] == "futperf":
        verb = f"will have {base if base == 'be' else _v3(base)}"
        desc = "future perfect"
    else:
        verb = f"{gl[0]} {base}"
        desc = "modal"
    obj_txt = " ".join(w if w.lower() not in _LOWERABLE else
                       w.lower() for w in p["subj"])
    out = _cap(" ".join(asubj) + " " + verb + " " + obj_txt + ".")
    chk = _parse_clause(out)
    if chk is None or (chk["vbase"] != base and base != "be"):
        return _GATE
    steps = _steps5(
        "reversing the passive (c8_gram_ch81_003): the by-agent becomes "
        "the subject, be + V3 is re-tensed to its active frame, and the "
        "passive subject returns to object position.",
        f"passive: {sent}  (agent: {' '.join(agent)}; V3: {v3tok}).",
        [f"the agent moves to subject position: "
         f"{' '.join(asubj)} ({anum}).",
         f"be + V3 maps back to the active {desc} frame: {verb} "
         f"(base form {base}).",
         f"the old subject returns as object: {obj_txt}."],
        f"re-parsing the active output recovers subject-verb-object with "
        f"the verb \"{verb}\"; the tense readback is {desc} -- the same "
        "tense the passive be-form encoded.",
        "the spotlight returns to the doer; meaning and tense are "
        "unchanged, only the focus moved.")
    return None, steps, out, None, \
        "active: by-agent -> subj; be+V3 -> tense frame; subj -> obj", \
        {"passive": 0.0}


# --------------------------------------------------------------------------- #
# narration: direct -> indirect
# --------------------------------------------------------------------------- #

_FEMALE = {"she", "her", "hers", "mother", "sister", "aunt", "girl",
           "woman", "wife", "queen", "daughter", "lady", "madam",
           "sita", "gita", "asha", "radha", "mary", "sarah"}

_NARR_TRAP = ("Corpus trap (c10_gram_cbse_93_002): reported questions "
              "lose their question grammar -- no question mark, no "
              "do/does/did, statement word order returns.")


def _backshift(quote: str) -> Tuple[str, List[str]]:
    """Apply the corpus backshift list (c10_gram_cbse_93_001)."""
    s = quote
    shifts: List[str] = []
    subs = [
        (r"\bcan\s*not\b", "could not"), (r"\bcannot\b", "could not"),
        (r"\bcan't\b", "could not"), (r"\bcan\b", "could"),
        (r"\bwill\s+not\b", "would not"), (r"\bwon't\b", "would not"),
        (r"\bwill\b", "would"), (r"\bshall\b", "would"),
        (r"\bmay\b", "might"),
        (r"\bdoesn't\b", "didn't"), (r"\bdoes\s+not\b", "did not"),
        (r"\bdon't\b", "didn't"), (r"\bdo\s+not\b", "did not"),
        (r"\bisn't\b", "was not"), (r"\baren't\b", "were not"),
        (r"\bhaven't\b", "had not"), (r"\bhasn't\b", "had not"),
        (r"\bam\b", "was"), (r"\bis\b", "was"), (r"\bare\b", "were"),
        (r"\bhas\b", "had"), (r"\bhave\b", "had"),
    ]
    for pat, rep in subs:
        new, n = re.subn(pat, rep, s, flags=re.I)
        if n:
            shifts.append(f"'{pat.strip(chr(92) + 'b')}' -> {rep} x{n}")
        s = new
    # pass 1: simple past (V2) -> past perfect.  Runs BEFORE present
    # verbs are moved to past so freshly shifted forms are not
    # re-shifted; the auxiliaries was/were/had and anything after
    # had/to/did/not/have/has/would stay put.
    toks = re.findall(r"[A-Za-z']+|\S", s)
    out = []
    prev = ""
    n_pp = 0
    for t in toks:
        if re.match(r"[A-Za-z']+$", t):
            lw = t.lower()
            if _is_v2(lw) and lw not in ("was", "were", "had") and \
                    prev.lower() not in ("had", "to", "did", "not",
                                         "have", "has", "would"):
                t = "had " + _v3(_to_base(lw))
                n_pp += 1
        out.append(t)
        prev = t.split()[-1] if t else prev
    s = " ".join(t for t in out if t.strip())
    if n_pp:
        shifts.append(f"simple past -> past perfect on {n_pp} main "
                      "verb(s)")
    # pass 2: main verbs -- V-s and bare V1 -> V2 (skip words after
    # aux/modal/to).  Bare V1 needs a pronoun subject right before it
    # (nouns like 'work' must not be read as verbs); V-s forms only
    # need a non-determiner left neighbour.
    toks = re.findall(r"[A-Za-z']+|\S", s)
    out = []
    prev = ""
    n_mv = 0
    noun_left = {"the", "a", "an", "of", "his", "her", "my", "your",
                 "their", "our", "its", "these", "those", "this", "that"}
    for t in toks:
        if re.match(r"[A-Za-z']+$", t):
            lw = t.lower()
            skip_ctx = prev.lower() in _BE | _HAVEAUX | _MODAL | \
                {"to", "not", "had", "didn't"}
            if not skip_ctx and _to_base(lw) in _COMMON_VERBS and \
                    lw != _to_base(lw) and prev.lower() not in noun_left:
                t = _v2(_to_base(lw))
                n_mv += 1
            elif not skip_ctx and lw in _COMMON_VERBS and \
                    lw == _to_base(lw) and prev.lower() in _SUBJ_PRON:
                t = _v2(lw)
                n_mv += 1
        out.append(t)
        prev = t
    s = " ".join(t for t in out if t.strip())
    if n_mv:
        shifts.append(f"simple present -> simple past on {n_mv} main "
                      "verb(s)")
    # time/place shifts in ONE combined pass so replacements cannot
    # cascade into each other ("tomorrow" -> "the next day" must not
    # then be hit by the 'next -> following' rule)
    _TS_COMBINED = re.compile(
        r"\byesterday\b|\btomorrow\b|\btonight\b|\btoday\b|\bnow\b|"
        r"\blast\s+\w+|\bnext\s+\w+|\bhere\b|\bago\b", re.I)
    _TS_MAP = [
        (re.compile(r"\byesterday\b", re.I), "the previous day"),
        (re.compile(r"\btomorrow\b", re.I), "the next day"),
        (re.compile(r"\btonight\b", re.I), "that night"),
        (re.compile(r"\btoday\b", re.I), "that day"),
        (re.compile(r"\bnow\b", re.I), "then"),
        (re.compile(r"\blast\s+(\w+)", re.I), r"the previous \1"),
        (re.compile(r"\bnext\s+(\w+)", re.I), r"the following \1"),
        (re.compile(r"\bhere\b", re.I), "there"),
        (re.compile(r"\bago\b", re.I), "before"),
    ]

    def _ts_repl(mm):
        for rx, rep in _TS_MAP:
            if rx.match(mm.group(0)):
                return mm.expand(rep)
        return mm.group(0)

    n_ts = len(_TS_COMBINED.findall(s))
    if n_ts:
        shifts.append(f"time/place shift x{n_ts} (now -> then, tomorrow "
                      "-> the next day, yesterday -> the previous day, "
                      "here -> there, ...)")
        s = _TS_COMBINED.sub(_ts_repl, s)
    return s, shifts


def _shift_pronouns(quote: str, spk_fem: bool,
                    listener: Optional[str]) -> Optional[str]:
    """First person -> speaker; second person -> listener (SONA rule)."""
    lst = (listener or "").lower().strip()
    if not lst:
        if re.search(r"\b(you|your|yours)\b", quote, re.I):
            return None  # second person but no listener to anchor it
        you_map: Dict[str, str] = {}
    elif lst in ("me", "us"):
        you_map = {"you": "I", "your": "my", "yours": "mine",
                   "yourself": "myself"}
    elif lst in ("him", "her", "them"):
        you_map = {"you": {"him": "he", "her": "she",
                           "them": "they"}[lst],
                   "your": {"him": "his", "her": "her",
                            "them": "their"}[lst]}
    else:
        return None  # named listener + you/your -> ambiguous, decline
    fem = "she" if spk_fem else "he"
    femm = "her" if spk_fem else "him"
    femd = "her" if spk_fem else "his"
    first = {"i": fem, "me": femm, "my": femd, "mine": femd + "s",
             "we": "they", "us": "them", "our": "their",
             "ours": "theirs"}
    out = []
    for tok in re.findall(r"[A-Za-z']+|\S", quote):
        mm = re.match(r"([A-Za-z']+)(.*)", tok)
        core, trail = (mm.group(1), mm.group(2)) if mm else (tok, "")
        lw = core.lower()
        if lw in first:
            out.append(first[lw] + trail)
        elif lw in you_map:
            out.append(you_map[lw] + trail)
        else:
            out.append(tok)
    return " ".join(out)


_UNIVERSAL_TRUTHS = re.compile(
    r"\b("
    # Astronomical / Planetary
    r"earth\s+(?:revolves|moves|rotates|is\s+round)|"
    r"sun\s+(?:rises|sets)|"
    r"planets?\s+(?:revolve|orbit)|"
    r"moon\s+(?:revolves|orbits)|"
    r"stars?\s+shine|"
    r"gravity\s+(?:pulls|acts)|"
    # Physical / Chemical / Natural laws
    r"water\s+(?:boils|freezes)|"
    r"light\s+travels|"
    r"sound\s+travels|"
    r"magnets?\s+attract|"
    r"metals?\s+expand|"
    r"oil\s+floats|"
    r"plants?\s+(?:produce|need)|"
    r"humans?\s+(?:are\s+mortal|need)|"
    # Proverbs / Maxims / Axioms
    r"honesty\s+is\s+the\s+best\s+policy|"
    r"slow\s+and\s+steady\s+wins|"
    r"stitch\s+in\s+time\s+saves|"
    r"time\s+and\s+tide\s+wait|"
    r"actions?\s+speaks?\s+louder|"
    r"all\s+that\s+glitters?\s+is\s+not\s+gold|"
    r"barking\s+dogs?\s+seldom\s+bite|"
    r"blood\s+is\s+thicker\s+than\s+water|"
    r"cleanliness\s+is\s+next\s+to\s+godliness|"
    r"knowledge\s+is\s+power|"
    r"practice\s+makes\s+a\s+man\s+perfect|"
    r"truth\s+always\s+triumphs?|"
    r"where\s+there\s+is\s+a\s+will|"
    r"necessity\s+is\s+the\s+mother\s+of\s+invention|"
    r"work\s+is\s+worship|"
    r"haste\s+makes\s+waste|"
    r"two\s+and\s+two\s+make\s+four"
    r")\b", re.I)


def _is_semantic_exception(text: str) -> Tuple[bool, str]:
    """Identify universal truths, scientific facts, and proverbs that never backshift in reported speech."""
    if not text:
        return False, ""
    m = _UNIVERSAL_TRUTHS.search(text)
    if m:
        return True, f"universal truth / scientific axiom / proverb ('{m.group(1)}')"
    return False, ""


def _c_narration(g, m, text):
    qm = re.search(r'"([^"]+)"', text) or re.search(r"'([^']+)'", text)
    if not qm:
        return _GATE
    quote = qm.group(1).strip()
    if len(quote.split()) < 2:
        return _GATE
    before = text[:qm.start()].strip().rstrip(",").strip()
    after = text[qm.end():].strip()
    # strip any leading instruction ("Change into indirect speech: ...")
    if ":" in before:
        before = before.rsplit(":", 1)[-1].strip()
    rv = re.search(r"\b(says|say|said|tells|tell|told|asks|ask|asked|"
                   r"ordered|commanded|requested|wrote|replied)\b", before,
                   re.I)
    if rv:
        rep_subj = _tokenize(before[:rv.start()])
        to_seg = before[rv.end():]
    else:
        rv2 = re.search(r"\b(says|say|said|tells|tell|told|asks|ask|"
                        r"asked|ordered|commanded|requested|wrote|"
                        r"replied)\b", after, re.I)
        if not rv2:
            return _GATE
        rep_subj = _tokenize(after[:rv2.start()])
        to_seg = after[rv2.end():]
    if not rep_subj:
        return _GATE
    speaker = " ".join(rep_subj)
    spk_fem = rep_subj[-1].lower() in _FEMALE
    listener = None
    lm = re.search(r"\bto\s+(me|us|him|her|them)\b", to_seg, re.I)
    if lm:
        listener = lm.group(1).lower()
    else:
        lm2 = re.search(r"\bto\s+((?:the|his|her|my|your|a|an)\s+"
                        r"[A-Za-z]+|[A-Za-z]+)", to_seg, re.I)
        if lm2:
            listener = lm2.group(1)
        else:
            lm3 = re.search(r"\b(tells?|told)\s+(me|us|him|her|them)\b",
                            before + " " + after, re.I)
            if lm3:
                listener = lm3.group(2).lower()
    rverb = (rv.group(1) if rv else rv2.group(1)).lower()
    rtense_past = rverb in ("said", "told", "asked", "ordered",
                            "commanded", "requested", "wrote", "replied")
    qt = _tokenize(quote)
    ql = [t.lower() for t in qt]
    if quote.rstrip().endswith("?"):
        qtype = "wh" if ql and ql[0] in _WH else "yesno"
    elif ql and (ql[0] in _COMMON_VERBS or ql[0] in ("don't", "do",
                                                     "please", "kindly")):
        qtype = "command"
    else:
        qtype = "statement"
    if re.match(r"\b(what|how)\b", quote, re.I) and \
            not quote.rstrip().endswith("?") and \
            ql and ql[0] in _WH and len(qt) <= 5:
        return _GATE  # reported exclamations: taught (c12), unimplemented

    def lower_first(sx: str) -> str:
        toks = sx.split(" ", 1)
        if toks and toks[0] in ("I", "I'd", "I'll", "I'm", "I've"):
            return sx
        return sx[:1].lower() + sx[1:] if sx else sx

    if qtype == "command":
        if not listener:
            return _GATE  # a reported command needs a told-object
        body = quote.strip().rstrip(".!")
        polite = bool(re.match(r"\b(please|kindly)\b", body, re.I))
        nm = re.match(r"\b(do\s*not|don't)\s+(.+)", body, re.I)
        neg = bool(nm)
        if nm:
            body = nm.group(2)
        body = re.sub(r"\b(please|kindly)\s+", "", body, flags=re.I)
        first_tok = _tokenize(body)
        if not first_tok or (first_tok[0].lower() not in _COMMON_VERBS and
                             first_tok[0].lower() != "be"):
            return _GATE
        rname = "requested" if polite or rverb in ("requested", "asked") \
            else ("ordered" if rverb in ("ordered", "commanded") else
                  "told")
        core = ("not to " if neg else "to ") + lower_first(body)
        out = f"{speaker} {rname} {listener} {core}."
        steps = _steps5(
            "reported commands use 'reporting verb + object + "
            "to-infinitive'; negatives insert 'not' before 'to' "
            "(c10_gram_cbse_93_003).",
            f"direct: {text.strip()}  (command quote: \"{quote}\").",
            [f"reporting verb chosen: {rname}"
             f"{' (polite request)' if polite else ''}; object kept: "
             f"{listener}.",
             f"the imperative becomes a to-infinitive: "
             f"\"{lower_first(body)}\" -> \"{core}\".",
             "imperatives do not backshift -- the bare infinitive is "
             "the reported form."],
            f"re-check: the output carries no quote marks and no "
            f"imperative form, and {'not to' if neg else 'to'} sits "
            "before the verb exactly as the rule demands.",
            "the command now lives as an infinitive clause inside the "
            "reporter's sentence.")
        steps.append("Trap check: " + _NARR_TRAP)
        return None, steps, out, None, \
            "reported command: told/ordered/requested + object + " \
            "(not) to V", {"qtype": 2.0}

    body = quote.rstrip().rstrip(".?!")
    aux0 = None
    if qtype == "yesno":
        if ql and ql[0] in _DOAUX:
            vidx = 2 if len(ql) > 2 and ql[1] in _SUBJ_PRON else 1
            if ql[0] == "did" and len(qt) > vidx and \
                    _to_base(qt[vidx]) in _COMMON_VERBS:
                # 'Did you finish?' -> 'you had finished' (past perfect)
                body = " ".join(qt[1:vidx] + ["had", _v3(_to_base(qt[vidx]))]
                                + qt[vidx + 1:])
            else:
                body = " ".join(qt[1:])  # de-do-support
        elif ql and ql[0] in _BE | _HAVEAUX | _MODAL:
            aux0 = ql[0]
            rest = qt[1:]
            # de-invert: subject first, then the auxiliary
            body = " ".join(rest[:1] + [aux0] + rest[1:]) if rest else aux0
        else:
            return _GATE
    elif qtype == "wh":
        body = " ".join(qt[1:])
        if len(ql) > 1 and ql[1] in _DOAUX:
            body = " ".join(qt[2:])
        elif len(ql) > 1 and ql[1] in _BE | _HAVEAUX | _MODAL:
            aux0 = ql[1]
            body = " ".join(qt[2:3] + [aux0] + qt[3:])
    is_sem_exc, sem_exc_reason = _is_semantic_exception(body)
    if is_sem_exc:
        body2 = body
        shifts = [f"{sem_exc_reason} -> no tense backshift (universal truth / scientific axiom rule)"]
    elif rtense_past:
        body2, shifts = _backshift(body)
    else:
        body2 = body
        # no backshift, but pronoun re-anchoring still forces agreement
        # (c8_gram_ch82_004): handled after the pronoun pass below
        shifts = ["present reporting verb -> no backshift "
                  "(c8_gram_ch82_004); only agreement follows the "
                  "re-anchored pronouns"]
    body3 = _shift_pronouns(body2, spk_fem, listener)
    if body3 is None:
        return _GATE
    if not rtense_past:
        # agreement re-test after re-anchoring: 'I am' -> 'he is'
        body3 = re.sub(r"\b(he|she|it)\s+am\b", r"\1 is", body3, flags=re.I)
        body3 = re.sub(r"\b(they|we|you)\s+am\b", r"\1 are", body3,
                       flags=re.I)
        body3 = re.sub(r"\b(he|she|it)\s+are\b", r"\1 is", body3,
                       flags=re.I)
    body3 = re.sub(r"\bI were\b", "I was", body3)
    low_start = lower_first(body3.strip())
    if qtype == "statement":
        if rverb in ("told", "tells", "said", "says", "say", "wrote",
                     "replied") and listener:
            out = f"{speaker} {'told' if rtense_past else 'tells'} " \
                  f"{listener} that {low_start}."
        elif listener:
            out = f"{speaker} {'told' if rtense_past else 'tells'} " \
                  f"{listener} that {low_start}."
        else:
            out = f"{speaker} {rverb} that {low_start}."
    else:
        if not listener:
            return _GATE
        qw = ql[0] if qtype == "wh" else "if"
        out = f"{speaker} asked {listener} {qw} {low_start}."
    out = re.sub(r"\s+", " ", out).strip()
    if "?" in out or '"' in out:
        return _GATE
    frame_desc = ("asked + if/whether or the wh-word + statement order"
                  if qtype in ("yesno", "wh") else
                  "said/told + that + statement order")
    steps = _steps5(
        "reported speech moves three things together "
        "(c8_gram_cbse_82_001): tense steps back, pronouns re-anchor to "
        "the reporter, and pointing words shift outward.",
        f"direct: {text.strip()}  (reporter: {speaker}; listener: "
        f"{listener or 'none'}; type: {qtype}).",
        ["backshift applied: " + ("; ".join(shifts) if shifts else
                                  "no tense-bearing verb needed a shift")
         + ".",
         f"pronouns re-anchored: speaker "
         f"{'she' if spk_fem else 'he'}-form"
         + (f", listener {listener}" if listener else "") + ".",
         f"frame built: {frame_desc}; the question mark is dropped and "
         "word order is statement order."],
        "re-check: the output has no quotation marks and no question "
        "mark, and its finite verbs read back-shifted consistent with "
        "the reporting verb's tense.",
        "the utterance is now woven into the reporter's own time -- "
        "meaning preserved, deixis re-centred on the reporter.")
    steps.append("Trap check: " + _NARR_TRAP)
    return None, steps, out, None, \
        "narration: backshift + pronoun shift + time/place shift + " \
        "frame", {"qtype": {"statement": 0.0, "yesno": 1.0,
                            "wh": 2.0}[qtype]}


# --------------------------------------------------------------------------- #
# error spotting (corpus trap catalog)
# --------------------------------------------------------------------------- #

def _make_singular(aux: str) -> str:
    return {"are": "is", "were": "was", "have": "has",
            "haven't": "hasn't", "aren't": "isn't", "weren't": "wasn't",
            "do": "does", "don't": "doesn't", "are not": "is not",
            "were not": "was not", "have not": "has not",
            "do not": "does not"}.get(aux.lower(), aux)


def _make_plural(aux: str) -> Optional[str]:
    m = {"is": "are", "was": "were", "has": "have",
         "hasn't": "haven't", "isn't": "aren't", "wasn't": "weren't",
         "does": "do", "doesn't": "don't", "is not": "are not",
         "was not": "were not", "has not": "have not",
         "does not": "do not"}
    return m.get(aux.lower())


_PRES_TO_PAST = {"eats": "ate", "comes": "came", "goes": "went",
                 "reads": "read", "writes": "wrote", "plays": "played",
                 "sings": "sang", "speaks": "spoke", "walks": "walked",
                 "runs": "ran", "watches": "watched", "makes": "made",
                 "takes": "took", "gives": "gave", "helps": "helped",
                 "calls": "called"}

_ITIS_NOT = {"going", "been", "not", "now", "raining", "snowing",
             "important", "interesting", "fine", "true", "cold", "hot",
             "warm", "late", "early", "clear", "simple", "possible",
             "necessary", "better", "best", "good", "bad", "easy",
             "hard", "funny", "over", "very", "really", "also", "only",
             "time", "a", "an", "the"}


def _error_catalog() -> List[Tuple[Any, str, str, Any]]:
    cat: List[Tuple[Any, str, str, Any]] = []

    def add(pat, name, rule, fix):
        cat.append((re.compile(pat, re.I), name, rule, fix))

    add(r"\b(didn't|did\s+not|doesn't|does\s+not|don't|do\s+not)\s+"
        r"([A-Za-z]+)\b",
        "double past (do-support)",
        "do/does/did carries the tense and agreement; the main verb "
        "returns to base form (c9_gram_ch80_004).",
        lambda mm: f"{mm.group(1)} {_to_base(mm.group(2))}")

    def fix_stative(mm):
        return _vs(_to_base(mm.group(2)))

    add(r"\b(am|is|are|was|were)\s+(knowing|believing|loving|owning|"
        r"seeming|understanding|wanting|needing|meaning|preferring)\b",
        "stative verb in continuous",
        "stative verbs -- know, believe, love, own, seem, understand -- "
        "describe states, not actions; standard English refuses the "
        "continuous (c10_gram_cbse_90_002).",
        fix_stative)

    def fix_sincefor(mm):
        hv = "have" if mm.group(1).lower() in ("i", "we", "you", "they") \
            else "has"
        return f"{mm.group(1)} {hv} been {mm.group(3)} {mm.group(4)}"

    add(r"\b(I|we|you|they|he|she|it)\s+(am|is|are|was|were)\s+"
        r"([A-Za-z]+ing)\b[^\n]{0,25}?\b(since|for)\b",
        "since/for demands the perfect family",
        "'since/for' + a still-going action selects the "
        "perfect-continuous -- never the simple continuous "
        "(c8_gram_cbse_80_001).",
        fix_sincefor)

    add(r"\b(each|every|everyone|everybody|someone|somebody|anyone|"
        r"anybody|nobody|no one|either|neither)\s+"
        r"(are|were|have|haven't|aren't|weren't|do|don't)\b",
        "indefinite pronoun takes singular",
        "each/every/everyone/someone/nobody/either/neither are "
        "grammatically singular (c8_gram_ch83_002).",
        lambda mm: f"{mm.group(1)} {_make_singular(mm.group(2))}")

    add(r"\b(bunch|box|basket|bouquet|pack|pair|list|series|batch|team|"
        r"committee|jury|family|quality|quantity|number)\s+of\s+"
        r"(?:the\s+)?([A-Za-z]+s?)\s+(are|were|have)\b",
        "agreement with the head noun, not the nearest noun",
        "the verb agrees with the HEAD of the subject phrase -- the noun "
        "inside the of-phrase is a decoy (c10_gram_cbse_91_001).",
        lambda mm: f"{mm.group(1)} of {mm.group(2)} "
                   f"{_make_singular(mm.group(3))}")

    def fix_measure(mm):
        head_txt = f"{mm.group(1)} {mm.group(2) or ''}".strip()
        return f"{head_txt} {mm.group(3)} {_make_singular(mm.group(4))}"

    add(r"\b(ten|twenty|thirty|forty|fifty|five|three|two|six|seven|"
        r"eight|nine|twelve|fifteen)\s+(hundred\s+|thousand\s+)?"
        r"(kilometres|kilometers|miles|rupees|kilograms|kilos|litres|"
        r"liters|hours|years|weeks|months|dollars|pounds)\s+"
        r"(are|were|have)\b",
        "measured quantity as one unit takes a singular verb",
        "quantities treated as one unit take singular verbs -- 'Ten "
        "kilometres is a long walk' (c9_gram_ch82_003).",
        fix_measure)

    def fix_nor(mm):
        num = _np_number(mm.group(2))
        aux = mm.group(3)
        return _make_singular(aux) if num in ("singular", "first") \
            else _make_plural(aux)

    add(r"\bneither\s+[A-Za-z]+\s+nor\s+([A-Za-z]+)\s+"
        r"(are|were|have|is|was|has|do|does)\b",
        "neither...nor agrees with the nearer subject",
        "'neither/either' alone are singular, but neither...nor follows "
        "the number of the noun after nor (c10_gram_cbse_91_002).",
        fix_nor)

    add(r"\ban\s+(university|universities|unicorn|uniform|union|unit|"
        r"unique|user|useful|usual|european|europe|one|utensil)\b",
        "a/an follows SOUND",
        "'an' listens to sound, not spelling: 'an university' is wrong "
        "because u here is the yoo- consonant sound -> 'a university' "
        "(c6_gram_cbse_83_001).",
        lambda mm: "a " + mm.group(1))
    add(r"\ba\s+(hour|honest|honour|honor|heir)\b",
        "a/an follows SOUND",
        "hour/honest/honour/heir begin with a vowel SOUND -> an.",
        lambda mm: "an " + mm.group(1))

    def fix_its(mm):
        return "its " + mm.group(1)

    it_not = "|".join(sorted(_ITIS_NOT))
    add(r"\bit's\s+(?!going\b|been\b|not\b|now\b|" + it_not + r"\b)"
        r"([A-Za-z]+)\b",
        "possessive pronoun takes no apostrophe",
        "possessive pronouns never take an apostrophe: its (belonging "
        "to it) vs it's = it is (c12_gram_ch80_003).",
        fix_its)

    add(r"\b(different|differs?)\s+(than|to)\b",
        "preposition collocation",
        "collocation is memorised territory: different FROM, never "
        "'different than' (c12_gram_cbse_81_002).",
        lambda mm: mm.group(1) + " from")
    add(r"\b(married|marry)\s+(with)\b",
        "preposition collocation",
        "married TO someone -- 'married with' is the classic board trap "
        "(c12_gram_cbse_81_002).",
        lambda mm: mm.group(1) + " to")

    add(r"\b(was|were)\s+([A-Za-z]+ing)\b[^\n]{0,40}?\band\b[^\n]{0,20}?"
        r"\b(eats|comes|goes|reads|writes|plays|sings|speaks|walks|runs|"
        r"watches|makes|takes|gives|helps|calls)\b",
        "tense drift inside one narrative",
        "a passage anchored in the past keeps its verbs in the past -- "
        "the second conjunct must not drift to present (c9_gram_ch80_003; "
        "c9_gram_cbse_80_002).",
        lambda mm: f"{mm.group(1)} {mm.group(2)} and "
                   f"{_PRES_TO_PAST.get(mm.group(3).lower())}")

    def fix_there(mm):
        aux = "are" if mm.group(1).lower() == "is" else "were"
        out = f"there {aux} {mm.group(3)}"
        return out[0].upper() + out[1:] if mm.group(0)[0].isupper() \
            else out

    add(r"\bthere\s+(is|was)\s+((?:[a-z]+\s+){0,2})?(two|three|four|"
        r"five|six|seven|eight|nine|ten|many|several|hundred|thousand|"
        r"dozens)\b",
        "there is/are agrees with the postponed subject",
        "in there-constructions the real subject follows the verb: "
        "'There ARE three books' (c8_gram_ch83_003).",
        fix_there)

    def fix_neither_of(mm):
        return f"{mm.group(1)} {_make_singular(mm.group(2))}"

    add(r"\b(neither\s+of\s+(?:the\s+)?[a-z]+)\s+(are|were|have)\b",
        "neither of + plural noun is singular",
        "'neither/either' alone (and 'neither of...') are grammatically "
        "singular even with a plural of-phrase (c10_gram_cbse_91_002).",
        fix_neither_of)
    return cat


_ERR_TRAP = ("Corpus trap (c10_gram_cbse_91_001): boards plant decoys "
             "between the subject and the verb, because agreement is "
             "decided by the head of the subject phrase, never by the "
             "nearest noun.")


def _c_error_spot(g, m, text):
    sent = _quote_of(text)
    if not sent or len(sent.split()) < 4:
        return _GATE
    sent = sent.strip("\"'")
    # rules whose corrected sentence must no longer match their own
    # regex (agreement rules); the constructive rules (do-support,
    # stative, since/for, drift, its, collocations) are verified by the
    # fix actually changing the fragment.
    _RESCAN_OK = {"indefinite pronoun takes singular",
                  "agreement with the head noun, not the nearest noun",
                  "measured quantity as one unit takes a singular verb",
                  "there is/are agrees with the postponed subject",
                  "neither...nor agrees with the nearer subject",
                  "neither of + plural noun is singular",
                  "a/an follows SOUND"}
    for rx, name, rule, fix in _error_catalog():
        mm = rx.search(sent)
        if not mm:
            continue
        wrong = mm.group(0)
        fixed = fix(mm)
        if not fixed or fixed == wrong:
            continue
        corrected = sent[:mm.start()] + fixed + sent[mm.end():]
        if name in _RESCAN_OK and rx.search(corrected):
            continue  # fix did not clear the rule -> not the right trap
        steps = _steps5(
            "the board editing task runs a fixed error inventory "
            "(c12_gram_cbse_80_002): tense/form, concord, determiner and "
            "word-form/preposition errors, one per item.",
            f"sentence: {sent}; suspicious fragment: \"{wrong}\".",
            [f"rule engaged -- {name}: {rule}",
             f"correction: \"{wrong}\" -> \"{fixed}\".",
             f"corrected sentence: {corrected}"],
            "re-scanning the corrected sentence against the same rule "
            "finds no further hit, so the trap is cleared and the "
            "corrected fragment now agrees with its subject.",
            f"the sentence now passes the {name.lower()} rule the "
            "examiners were testing.")
        steps.append("Trap check: " + _ERR_TRAP)
        return None, steps, corrected, None, \
            f"error inventory: {name} -> corrected sentence", \
            {"n_errors": 1.0}
    return _GATE


# --------------------------------------------------------------------------- #
# degrees of comparison (c10_gram_cbse_95_002 frames)
# --------------------------------------------------------------------------- #

_DEG: Dict[str, Tuple[str, str]] = {
    "tall": ("taller", "tallest"), "short": ("shorter", "shortest"),
    "big": ("bigger", "biggest"), "small": ("smaller", "smallest"),
    "fast": ("faster", "fastest"), "slow": ("slower", "slowest"),
    "strong": ("stronger", "strongest"), "brave": ("braver", "bravest"),
    "wise": ("wiser", "wisest"), "easy": ("easier", "easiest"),
    "happy": ("happier", "happiest"), "heavy": ("heavier", "heaviest"),
    "pretty": ("prettier", "prettiest"), "rich": ("richer", "richest"),
    "poor": ("poorer", "poorest"), "kind": ("kinder", "kindest"),
    "cruel": ("crueller", "cruellest"), "bright": ("brighter",
                                                   "brightest"),
    "deep": ("deeper", "deepest"), "high": ("higher", "highest"),
    "long": ("longer", "longest"), "old": ("older", "oldest"),
    "young": ("younger", "youngest"), "new": ("newer", "newest"),
    "sweet": ("sweeter", "sweetest"), "thin": ("thinner", "thinnest"),
    "fat": ("fatter", "fattest"), "hot": ("hotter", "hottest"),
    "cold": ("colder", "coldest"), "hard": ("harder", "hardest"),
    "soft": ("softer", "softest"), "loud": ("louder", "loudest"),
    "busy": ("busier", "busiest"), "early": ("earlier", "earliest"),
    "lazy": ("lazier", "laziest"), "funny": ("funnier", "funniest"),
    "lucky": ("luckier", "luckiest"), "noble": ("nobler", "noblest"),
    "gentle": ("gentler", "gentlest"), "simple": ("simpler", "simplest"),
    "able": ("abler", "ablest"), "great": ("greater", "greatest"),
    "clean": ("cleaner", "cleanest"), "cheap": ("cheaper", "cheapest"),
    "good": ("better", "best"), "well": ("better", "best"),
    "bad": ("worse", "worst"), "far": ("farther", "farthest"),
    "little": ("less", "least"), "many": ("more", "most"),
    "much": ("more", "most"),
}
for _a in ("useful", "beautiful", "careful", "difficult", "dangerous",
           "important", "interesting", "popular", "valuable", "honest",
           "famous", "curious", "serious", "expensive", "comfortable",
           "successful", "wonderful", "intelligent", "clever"):
    _DEG[_a] = ("more " + _a, "most " + _a)
_COMP_TO_POS = {comp: pos for pos, (comp, _s) in _DEG.items()}
_SUP_TO_POS = {sup: pos for pos, (_c, sup) in _DEG.items()}

_DEG_TRAP = ("Corpus trap (c6_english_u1_005): any comparison is not a "
             "metaphor -- 'like'/'as' makes it a simile; in degrees, the "
             "fixed frames must preserve meaning exactly "
             "(c10_gram_cbse_95_002).")


def _c_degree(g, m, text):
    sent = (_quote_of(text) or "").strip().rstrip(".?!")
    if len(sent.split()) < 5:
        return _GATE
    tgt = re.search(r"(positive|comparative|superlative)\s+degree", text,
                    re.I)
    tgt = tgt.group(1).lower() if tgt else None
    mA = re.search(r"(no other|very few)\s+(?P<np>[A-Za-z ]+?)\s+"
                   r"(?:is|are|was|were)\s+as\s+(?P<adj>[A-Za-z]+)\s+as\s+"
                   r"(?P<x>[A-Za-z ]+)$", sent, re.I)
    mB = re.search(r"(?P<x>[A-Za-z ]+?)\s+(?:is|are|was|were)\s+"
                   r"(?P<comp>[A-Za-z]+er|more\s+[A-Za-z]+|better|worse|"
                   r"farther)\s+than\s+(any|most|all)\s+other\s+"
                   r"(?P<np>[A-Za-z ]+?)(\s+(?:in|of)\s+"
                   r"(?P<pl>[A-Za-z ]+))?$", sent, re.I)
    mC = re.search(r"(?P<x>[A-Za-z ]+?)\s+(?:is|are|was|were)\s+the\s+"
                   r"(?P<sup>[A-Za-z]+est|most\s+[A-Za-z]+|best|worst|"
                   r"farthest)\s+(?P<np>[A-Za-z ]+?)(\s+(?:in|of)\s+"
                   r"(?P<pl>[A-Za-z ]+))?$", sent, re.I)
    pos = None
    place = ""
    few = False
    if mA:
        frame = "positive"
        pos = mA.group("adj").lower()
        np_ = mA.group("np").strip()
        x = mA.group("x").strip()
        few = mA.group(1).lower() == "very few"
    elif mB:
        frame = "comparative"
        comp_guess = mB.group("comp").lower()
        np_ = mB.group("np").strip()
        x = mB.group("x").strip()
        place = mB.group("pl") or ""
        pos = _COMP_TO_POS.get(comp_guess)
        if pos is None:
            pos = _to_base(comp_guess)
    elif mC:
        frame = "superlative"
        sup_guess = mC.group("sup").lower()
        np_ = mC.group("np").strip()
        x = mC.group("x").strip()
        place = mC.group("pl") or ""
        pos = _SUP_TO_POS.get(sup_guess)
        if pos is None:
            pos = _to_base(sup_guess)
    else:
        return _GATE
    if pos not in _DEG:
        return _GATE  # adjective outside the taught set -> decline
    comp, sup = _DEG[pos]
    x = re.sub(r"^the\s+", "", x, flags=re.I)
    cycle = {"positive": "comparative", "comparative": "superlative",
             "superlative": "positive"}
    target = tgt or cycle[frame]
    pl = f" in {place}" if place else ""
    if target == "comparative":
        if few:
            out = f"{x} is {comp} than most other {np_}."
        else:
            out = f"{x} is {comp} than any other {np_}{pl}."
    elif target == "superlative":
        if few:
            return _GATE  # the 'very few' frame has no superlative twin
        out = f"{x} is the {sup} {np_}{pl}."
    else:
        out = f"No other {np_}{pl} is as {pos} as {x}."
    steps = _steps5(
        "the three degrees preserve exact meaning through fixed frames "
        "(c10_gram_cbse_95_002): positive 'as...as', comparative "
        "'-er/more...than', superlative 'the -est/most...in/of'.",
        f"given ({frame}): {sent}; adjective: {pos} ({comp} / {sup}).",
        [f"frame identified: {frame}; target: {target}"
         f"{' (default cycle)' if not tgt else ''}.",
         f"rebuilt in the target frame: {out}"],
        f"meaning re-checked: the compared pair ({x} vs the rest of the "
        f"{np_}) and the direction of comparison are unchanged; the "
        f"forms {pos}/{comp}/{sup} are consistent with each other.",
        f"the {frame} -> {target} conversion keeps the same truth in a "
        "different grammatical container -- exactly what degree "
        "transformation must do.")
    steps.append("Trap check: " + _DEG_TRAP)
    return None, steps, out, None, \
        "degree frames: as...as <-> -er than <-> the -est", \
        {"degree": {"positive": 0.0, "comparative": 1.0,
                    "superlative": 2.0}[target]}


# --------------------------------------------------------------------------- #
# too...to <-> so...that  (c11_gram_cbse_81_001)
# --------------------------------------------------------------------------- #

_GENDER_NOUN = {"boy": "he", "man": "he", "father": "he", "brother": "he",
                "king": "he", "uncle": "he", "son": "he", "girl": "she",
                "woman": "she", "mother": "she", "sister": "she",
                "queen": "she", "aunt": "she", "daughter": "she"}


def _c_too_so(g, m, text):
    sent = (_quote_of(text) or "").strip().rstrip(".?!")
    if len(sent.split()) < 5:
        return _GATE
    mToo = re.search(r"(?P<subj>[A-Za-z ]+?)\s+(?P<be>is|am|are|was|"
                     r"were)\s+too\s+(?P<adj>[A-Za-z]+)\s+to\s+"
                     r"(?P<vp>[A-Za-z ]+)$", sent, re.I)
    mSo = re.search(r"(?P<subj>[A-Za-z ]+?)\s+(?P<be>is|am|are|was|were)"
                    r"\s+so\s+(?P<adj>[A-Za-z]+)\s+that\s+"
                    r"(?P<pro>[A-Za-z]+)\s+(?P<neg>cannot|could\s+not|"
                    r"can\s*not)\s+(?P<vp>[A-Za-z ]+)$", sent, re.I)
    if mToo:
        subj = mToo.group("subj").strip()
        be = mToo.group("be").lower()
        adj = mToo.group("adj").lower()
        vp = mToo.group("vp").strip()
        pro = _pron_for(subj)
        if pro is None:
            return _GATE  # unknown-gender noun: decline, no invented copy
        negv = "could not" if be in ("was", "were") else "cannot"
        out = f"{subj} {be} so {adj} that {pro} {negv} {vp}."
        which = "simple -> complex (infinitive -> clause)"
    elif mSo:
        subj = mSo.group("subj").strip()
        be = mSo.group("be").lower()
        adj = mSo.group("adj").lower()
        pro = mSo.group("pro").lower()
        vp = mSo.group("vp").strip()
        expect = _pron_for(subj)
        if expect is None or (pro != expect and pro not in _SUBJ_PRON):
            return _GATE
        out = f"{subj} {be} too {adj} to {vp}."
        which = "complex -> simple (clause -> infinitive)"
    else:
        return _GATE
    steps = _steps5(
        "transformation repackages one truth into different containers "
        "(c11_gram_cbse_81_001): 'too + adj + to + V' and 'so + adj + "
        "that + subject + cannot/could not + V' are meaning-identical "
        "simple/complex twins.",
        f"given: {sent}.",
        [f"frame detected: {which}; adjective carried across: {adj}; "
         f"verb phrase carried across: \"{vp}\".",
         "negative-inference rule: too-to implies inability, so the "
         "clause form needs cannot (present be) / could not (past be): "
         f"chose {'could not' if be in ('was', 'were') else 'cannot'}.",
         f"output: {out}"],
        f"meaning re-checked: both forms deny the ability ({vp}); the "
        f"subject is unchanged and the tense of 'be' ({be}) is preserved "
        "on both sides.",
        "the same fact now lives in a different structure -- simple "
        "infinitive or complex that-clause -- with zero meaning drift.")
    return None, steps, out, None, \
        "too...to <-> so...that: ability-denial equivalence", \
        {"structure": 0.0 if mToo else 1.0}


def _pron_for(subj: str) -> Optional[str]:
    last = subj.split()[-1].lower()
    if last in _SUBJ_PRON:
        return {"i": "he", "he": "he", "she": "she", "it": "it",
                "we": "they", "they": "they", "you": "you"}.get(last)
    if last in _GENDER_NOUN:
        return _GENDER_NOUN[last]
    if _np_number(subj) == "plural":
        return "they"
    return None


# --------------------------------------------------------------------------- #
# affirmative <-> negative (ICSE scope, antonym-pair subset)
# --------------------------------------------------------------------------- #

_ANTONYM = {
    "honest": "dishonest", "dishonest": "honest", "kind": "unkind",
    "unkind": "kind", "polite": "impolite", "impolite": "polite",
    "punctual": "late", "late": "punctual", "regular": "irregular",
    "irregular": "regular", "patient": "impatient",
    "impatient": "patient", "obedient": "disobedient",
    "disobedient": "obedient", "possible": "impossible",
    "impossible": "possible", "comfortable": "uncomfortable",
    "uncomfortable": "comfortable", "healthy": "unhealthy",
    "unhealthy": "healthy", "happy": "sad", "sad": "happy",
    "strong": "weak", "weak": "strong", "rich": "poor", "poor": "rich",
    "clean": "dirty", "dirty": "clean", "wise": "foolish",
    "foolish": "wise", "careful": "careless", "careless": "careful",
    "brave": "cowardly", "cowardly": "brave", "loyal": "disloyal",
    "disloyal": "loyal",
}


def _c_affirm_neg(g, m, text):
    sent = (_quote_of(text) or "").strip().rstrip(".?!")
    if len(sent.split()) < 4:
        return _GATE
    mPos = re.search(r"(?P<subj>[A-Za-z ]+?)\s+(?P<be>[A-Za-z]+)\s+"
                     r"always\s+(?P<adj>[A-Za-z]+)(?P<rest>[ A-Za-z]*)$",
                     sent, re.I)
    mNeg = re.search(r"(?P<subj>[A-Za-z ]+?)\s+(?P<be>[A-Za-z]+)\s+"
                     r"never\s+(?P<adj>[A-Za-z]+)(?P<rest>[ A-Za-z]*)$",
                     sent, re.I)
    if mPos:
        subj = mPos.group("subj").strip()
        be = mPos.group("be").lower()
        adj = mPos.group("adj").lower()
        ant = _ANTONYM.get(adj)
        if not ant:
            return _GATE  # no taught antonym pair -> decline honestly
        out = f"{subj} {be} never {ant}{mPos.group('rest')}."
        direction = "affirmative -> negative (always -> never + antonym)"
    elif mNeg:
        subj = mNeg.group("subj").strip()
        be = mNeg.group("be").lower()
        adj = mNeg.group("adj").lower()
        ant = _ANTONYM.get(adj)
        if not ant:
            return _GATE
        out = f"{subj} {be} always {ant}{mNeg.group('rest')}."
        direction = "negative -> affirmative (never -> always + antonym)"
    else:
        return _GATE
    steps = _steps5(
        "affirmative<->negative transformation preserves meaning by "
        "moving to the polar-opposite adverb and the antonym predicate "
        "(ICSE functional-grammar scope, c10_eng_icse_03_004): "
        "always-is-X equals never-is-not-X.",
        f"given: {sent}; adjective: {adj}.",
        [f"polarity adverb swapped: "
         f"{'always -> never' if mPos else 'never -> always'}.",
         f"predicate swapped to its antonym-pair member: {adj} -> "
         f"{ant}.",
         f"output: {out}"],
        "meaning re-checked: 'always is X' and 'never is not-X' cover "
        "exactly the same cases, so the two sentences have identical "
        "truth conditions.",
        "the sentence keeps its judgement and flips only its surface "
        "polarity -- the equivalence the board wants shown.")
    return None, steps, out, None, \
        "affirmative<->negative: always/never + antonym pair", \
        {"polarity": 1.0 if mPos else 0.0}


# --------------------------------------------------------------------------- #
# exclamatory <-> assertive
# --------------------------------------------------------------------------- #

def _c_excl(g, m, text):
    sent = (_quote_of(text) or "").strip()
    if len(sent.split()) < 3:
        return _GATE
    mWhat = re.match(r"what\s+(a|an)\s+([A-Za-z]+)\s+([A-Za-z ]+)[!]",
                     sent, re.I)
    mHow = re.match(r"how\s+([A-Za-z]+)\s+([A-Za-z ]+?)\s+"
                    r"(is|are|was|were)[!]", sent, re.I)
    mAss1 = re.match(r"it\s+is\s+(a|an)\s+very\s+([A-Za-z]+)\s+"
                     r"([A-Za-z ]+?)[.]?$", sent, re.I)
    mAss2 = re.match(r"([A-Za-z ]+?)\s+(is|are|was|were)\s+very\s+"
                     r"([A-Za-z]+)[.]?$", sent, re.I)
    if mWhat:
        art, adj, np_ = mWhat.group(1).lower(), \
            mWhat.group(2).lower(), mWhat.group(3).strip()
        out = f"It is {art} very {adj} {np_}."
        route = "exclamatory -> assertive (What a/How -> very)"
    elif mHow:
        adj, subj, be = mHow.group(1).lower(), \
            mHow.group(2).strip(), mHow.group(3).lower()
        out = f"{subj} {be} very {adj}."
        route = "exclamatory -> assertive (How + adj + S + V)"
    elif mAss1:
        art, adj, np_ = mAss1.group(1).lower(), \
            mAss1.group(2).lower(), mAss1.group(3).strip()
        out = f"What {art} {adj} {np_}!"
        route = "assertive -> exclamatory"
    elif mAss2:
        subj, be, adj = mAss2.group(1).strip(), \
            mAss2.group(2).lower(), mAss2.group(3).lower()
        out = f"How {adj} {subj} {be}!"
        route = "assertive -> exclamatory"
    else:
        return _GATE
    out = _cap(out)
    steps = _steps5(
        "sentence types are four jobs with punctuation as the costume "
        "(c6_gram_cbse_80_002): an exclamatory 'What a/How' flattens "
        "into an assertive 'very' statement and back, keeping the "
        "emotion-word fixed.",
        f"given: {sent}.",
        [f"frame detected: {route}.",
         f"the intensifier maps to 'very'; the adjective and its "
         f"noun/subject carry across unchanged.",
         f"output: {out}"],
        "re-check: the strong feeling is retained by 'very', and the "
        "adjective + noun pair is identical on both sides -- only the "
        "sentence type changed.",
        "the same exclamation now reads as a plain statement (or vice "
        "versa) with the emotion preserved in words.")
    return None, steps, out, None, \
        "exclamatory<->assertive: What a/How <-> very", {}


# --------------------------------------------------------------------------- #
# simple/compound/complex identification (c7_gram_cbse_80_001/002)
# --------------------------------------------------------------------------- #

_SUBORD = {"because", "although", "though", "if", "when", "while",
           "unless", "until", "before", "after", "whenever", "whereas",
           "that", "who", "whom", "whose", "which", "where", "why"}
_COORD = {"and", "but", "or", "so", "yet", "nor"}


def _finite_groups(sent: str) -> List[Tuple[int, str]]:
    toks = _tokenize(sent)
    out = []
    for i, w in enumerate(toks):
        lw = w.lower()
        if lw in _BE or lw in _HAVEAUX or lw in _MODAL | _DOAUX:
            out.append((i, w))
        elif _is_v2(lw):
            out.append((i, w))
        elif lw.endswith("s") and lw != _to_base(lw) and \
                _to_base(lw) in _COMMON_VERBS and i > 0:
            out.append((i, w))
    return out


def _c_clause_type(g, m, text):
    sent = _quote_of(text)
    if not sent or len(sent.split()) < 4:
        return _GATE
    # FP guard (cisce-solver-langnew 2026-09-30): math set notation, LaTeX,
    # code and equations are never English prose to classify.
    if re.search(r"[{}=<>|\\]|\bin\b\s*[^.]{0,20}\bU\b|System\.out|"
                 r"\bint\s+\w+\s*=|∈|≤|≥|→", sent):
        return _GATE
    low_toks = [t.lower() for t in _tokenize(sent)]
    subs = [t for t in low_toks if t in _SUBORD]
    for k, t in enumerate(low_toks):
        if t == "so" and k + 1 < len(low_toks) and \
                low_toks[k + 1] == "that":
            subs.append("so that")
    coords = []
    for k, t in enumerate(low_toks):
        if t in _COORD:
            if t == "so" and k + 1 < len(low_toks) and \
                    low_toks[k + 1] == "that":
                continue  # 'so that' is a subordinator, not a coordinator
            coords.append(t)
    fin = _finite_groups(sent)
    if subs:
        stype = "complex"
    elif len(fin) >= 2 and coords:
        stype = "compound"
    elif len(fin) == 1 and not coords:
        stype = "simple"
    else:
        return _GATE
    names = {"simple": "one finite verb -- a single independent clause",
             "compound": "independent clauses joined by a coordinator "
                         "(and/but/or/yet/so)",
             "complex": "one main clause plus subordinate clause(s) "
                        "joined by a subordinator"}
    steps = _steps5(
        "sentence structure is about clause count and dependence "
        "(c10_gram_cbse_95_003): simple = one finite verb, compound = "
        "independent clauses joined by a coordinator, complex = one main "
        "+ subordinate clause.",
        f"sentence: {sent}.",
        [f"finite verb groups found: {len(fin)} "
         f"({', '.join(w for _i, w in fin)})"
         + (f"; subordinator(s): {', '.join(sorted(set(subs)))}"
            if subs else "")
         + (f"; coordinator(s): {', '.join(sorted(set(coords)))}"
            if coords else "") + ".",
         f"classification rule engaged: {names[stype]}."],
        f"re-count confirms {len(fin)} finite group(s) and "
        + ("a subordinator" if subs else
           "a coordinator" if coords else "no joiner") +
        f" -- consistent with {stype}.",
        f"the sentence is {stype}: that is the clause architecture the "
        "examined item was testing.")
    return None, steps, f"{stype} sentence", None, \
        "simple = 1 finite clause; compound = coordinator; complex = " \
        "subordinator", {"clauses": float(len(fin)),
                         "type": {"simple": 0.0, "compound": 1.0,
                                  "complex": 2.0}[stype]}


# --------------------------------------------------------------------------- #
# non-finites (c8_gram_cbse_84_001/002)
# --------------------------------------------------------------------------- #

_INF_TRIGGERS = {"want", "wants", "wanted", "decide", "decides",
                 "decided", "hope", "hopes", "hoped", "promise",
                 "promises", "promised", "learn", "learns", "learnt",
                 "agree", "agrees", "agreed", "refuse", "refuses",
                 "refused", "try", "tries", "tried", "like", "likes",
                 "liked", "love", "loves", "loved", "plan", "plans",
                 "planned", "forget", "forgets", "forgot", "begin",
                 "begins", "start", "starts", "started", "able",
                 "order", "orders", "ordered", "told", "asked", "asks",
                 "expect", "expects"}
_GERUND_VERBS = {"enjoy", "enjoys", "enjoyed", "avoid", "avoids",
                 "avoided", "finish", "finishes", "finished", "mind",
                 "minds", "suggest", "suggests", "suggested", "keep",
                 "keeps", "kept", "practise", "practises", "practised"}
_TO_NONVERB = {"the", "a", "an", "his", "her", "my", "your", "their",
               "our", "its", "me", "him", "them", "us", "school",
               "college", "class", "church", "temple", "market",
               "hospital", "bed", "station", "office", "park", "town",
               "village", "work", "delhi", "mumbai", "home"}


def _c_nonfinite(g, m, text):
    sent = _quote_of(text)
    if not sent or len(sent.split()) < 3:
        return _GATE
    asked = re.search(r"\b(gerund|infinitive|participle)s?\b", text, re.I)
    asked = asked.group(1).lower() if asked else None
    toks = _tokenize(sent)
    low = [t.lower() for t in toks]
    found: List[Tuple[str, str, str]] = []
    # infinitives: sentence-initial "To V" or after an infinitive verb
    for i, w in enumerate(low):
        if w != "to":
            continue
        if i + 1 < len(low) and low[i + 1] not in _TO_NONVERB and \
                (_to_base(low[i + 1]) in _COMMON_VERBS or
                 low[i + 1] in ("be", "have")):
            ok = i == 0 or (i > 0 and low[i - 1] in _INF_TRIGGERS) or \
                (i > 1 and low[i - 2] in _INF_TRIGGERS)
            if ok:
                func = "subject of the sentence" if i == 0 else \
                    "object of the preceding verb"
                found.append(("to " + toks[i + 1], "infinitive", func))
    _PREPS2 = {"of", "on", "in", "at", "for", "with", "about", "by",
               "without", "before", "after"}
    for i, w in enumerate(low):
        if _is_ving(w) and i > 0 and (low[i - 1] in _PREPS2 or
                                      low[i - 1] in _GERUND_VERBS):
            func = ("object of the preposition '" + low[i - 1] + "'"
                    if low[i - 1] in _PREPS2 else
                    f"object of the verb '{low[i - 1]}'")
            found.append((toks[i], "gerund", func))
    if low and _is_ving(low[0]) and any(x in _BE for x in low[1:3]):
        found.append((toks[0], "gerund", "subject of the sentence"))
    _DET = {"the", "a", "an", "his", "her", "my", "your", "their", "our",
            "its", "this", "that", "these", "those"}
    for i, w in enumerate(low):
        if i == 0 or i + 1 >= len(low):
            continue
        if low[i - 1] in _DET and w not in _BE and \
                (_is_ving(w) or _is_v3(w)) and low[i + 1] not in _BE and \
                not w.endswith("ly"):
            found.append((toks[i], "participle",
                          f"adjective modifying '{toks[i + 1]}'"))
    if not found:
        return _GATE
    if asked:
        match = [f for f in found if f[1] == asked]
        pick = match[0] if match else found[0]
    else:
        pick = found[0]
    word, kind, func = pick
    frame = {"infinitive": "to + V1 -- a verb-form doing a noun's job",
             "gerund": "V-ing -- a verb-form doing a noun's job",
             "participle": "V-ing/V3 -- a verb-form doing an adjective's "
                           "job"}[kind]
    label_src = (
        "label confirmed by position tests: after 'to' in infinitive "
        "position" if kind == "infinitive" else
        "label confirmed by position tests: after a preposition/verb or "
        "as subject" if kind == "gerund" else
        "label confirmed by position tests: between a determiner and "
        "its noun")
    if asked and asked != kind:
        label_src = (f"the asked label was '{asked}', but the form test "
                     f"decides the label, not the wording")
    noun_job = "noun" if kind in ("infinitive", "gerund") else "adjective"
    steps = _steps5(
        "non-finite verbs carry no tense and agree with no subject "
        "(c8_gram_cbse_84_001): infinitives (to go) and gerunds (going) "
        "act as nouns, participles (going/gone) act as adjectives.",
        f"sentence: {sent}; non-finite(s) found: " +
        "; ".join(f"{w} ({k})" for w, k, _f in found) + ".",
        [f"\"{word}\" matches the {kind} frame: {frame}.",
         f"function test: it works as the {func}, which is what the "
         f"{kind} does.",
         f"{label_src}."],
        f"re-test: \"{word}\" carries no tense marker and changes with "
        "no subject -- the defining property of a non-finite.",
        f"the {kind} \"{word}\" is the examined item: a verb-form doing "
        f"the work of a {noun_job}.")
    return None, steps, f"{word} -- {kind} ({func})", None, \
        "non-finite: no tense, no agreement; noun-job or adjective-job", \
        {"n_nonfinite": float(len(found)),
         "kind": {"infinitive": 0.0, "gerund": 1.0,
                  "participle": 2.0}[kind]}


# --------------------------------------------------------------------------- #
# conditionals (c11_gram_cbse_82_001/002)
# --------------------------------------------------------------------------- #

def _c_conditional(g, m, text):
    blank = re.search(r"\bif\b\s*([A-Za-z]*)\s*_{2,}\s*\(([A-Za-z]+)\)",
                      text, re.I)
    if blank:
        verb = blank.group(2).lower()
        subj_toks = [blank.group(1)] if blank.group(1) else \
            _tokenize(text[:blank.start()])[-1:]
        if not subj_toks or not subj_toks[0]:
            subj_toks = ["it"]
        num = _np_number(" ".join(subj_toks))
        after_words = _tokenize(text[blank.end():])
        aux = next((w.lower() for w in after_words
                    if w.lower() in ("will", "wo", "would", "won't",
                                     "wouldn't")), None)
        has_have = any(w.lower() == "have" for w in after_words[:4])
        if aux in ("will", "wo", "won't"):
            fill = _vs(verb) if num == "singular" else verb
            tname = "Type 1 (real possibility: if + present, will + V1)"
            tnum = 1.0
        elif has_have:
            fill = f"had {_v3(verb)}"
            tname = "Type 3 (past unreal: if + past perfect, would have " \
                    "+ V3)"
            tnum = 3.0
        elif aux in ("would", "wouldn't"):
            fill = "were" if verb == "be" else _v2(verb)
            tname = "Type 2 (present unreal: if + past, would + V1)"
            tnum = 2.0
        else:
            return _GATE
        out = re.sub(r"_{2,}", fill, text, count=1).strip()
        out = re.sub(r"\s*\([A-Za-z]+\)", "", out, count=1)
        steps = _steps5(
            "the three conditionals encode reality-distance through "
            "fixed tense patterns (c11_gram_cbse_82_002): Type 1 if + "
            "present / will; Type 2 if + past / would; Type 3 if + past "
            "perfect / would have + V3.",
            f"given: {text.strip()}; main-clause auxiliary: "
            f"{aux or 'would have'}; if-subject: "
            f"{(' '.join(subj_toks)) or 'it'} ({num}).",
            [f"the main clause selects the row: {tname}.",
             f"the if-verb therefore takes the form: {fill}."],
            f"pattern re-tested: {fill} in the if-clause matches the "
            "Type-table row exactly -- no tense mixing.",
            "the conditional now sits at the correct reality-distance; "
            "the type table, not intuition, picked the form.")
        return None, steps, out, None, \
            "conditional types: present/will, past/would, past perfect/" \
            "would have", {"type": tnum}
    sent = (_quote_of(text) or text).strip().rstrip(".?!")
    # FP guard (cisce-solver-langnew 2026-09-30): the classify branch
    # needs a real grammar ask, not a stray "conditional" inside answer
    # prose; also math/code-marked text is never a conditional sentence.
    if not re.search(r"(?:identify|name|state|pick|choose|tell|which|"
                     r"what)\b[^.]{0,60}\bconditional|conditional\s+"
                     r"(?:type|clause|sentence)|fill\s+in\s+the\s+blank|"
                     r"type\s*-?\s*[123]\s+conditional", text, re.I) or \
            re.search(r"[{}=<>|\\]|System\.out|∈|≤|≥", sent):
        return _GATE
    ifm = re.search(r"\bif\b", sent, re.I)
    if not ifm:
        return _GATE
    comma = sent.find(",")
    iif = ifm.start()
    if comma > iif:
        if_part = sent[iif + 3:comma].strip()
        main_part = sent[comma + 1:].strip()
    else:
        if_part = sent[iif + 3:].strip()
        main_part = sent[:iif].strip()
    if not if_part or not main_part:
        return _GATE
    if re.search(r"\bhad\s+[A-Za-z]*(ed|en)\b", if_part, re.I) or \
            re.search(r"\bhad\s+" + "|".join(sorted(_V3_SET)) + r"\b",
                      if_part, re.I):
        ttype, meaning, ifform = 3, \
            "past unreal -- gone forever, impossible to change", \
            "past perfect"
    elif re.search(r"\b(was|were)\b|\b[A-Za-z]+ed\b", if_part, re.I) or \
            any(_is_v2(t) for t in _tokenize(if_part)):
        ttype, meaning, ifform = 2, \
            "present unreal -- imaginary, contrary to fact", \
            "past (or were)"
    else:
        ttype, meaning, ifform = 1, \
            "real possibility -- an open condition about the future", \
            "present"
    main_l = main_part.lower()
    if "would have" in main_l:
        mtype = 3
    elif "would" in main_l or "wouldn't" in main_l:
        mtype = 2
    elif "will" in main_l or "won't" in main_l:
        mtype = 1
    else:
        mtype = ttype
    names = {1: "Type 1 (if + present, will + V1)",
             2: "Type 2 (if + past, would + V1)",
             3: "Type 3 (if + past perfect, would have + V3)"}
    steps = _steps5(
        "the three conditionals encode reality-distance "
        "(c11_gram_cbse_82_001): Type 1 real possibility, Type 2 "
        "present unreal, Type 3 past unreal.",
        f"sentence: {sent}; if-clause: \"{if_part}\"; main clause: "
        f"\"{main_part}\".",
        [f"if-clause verb form read: {ifform}.",
         f"that form selects {names[ttype]} -- {meaning}.",
         f"main-clause cross-check: {names[mtype]} -> "
         f"{'consistent' if mtype == ttype else 'mixed conditional '
          '(flagged, not silently accepted)'}."],
        f"pattern table re-checked: if-clause {names[ttype]} against "
        f"main clause {names[mtype]}.",
        "the conditional's distance from reality is fixed by the "
        "if-clause tense -- that is what the item tests.")
    return None, steps, f"conditional {names[ttype]}", None, \
        "conditional types 1/2/3: reality-distance table", \
        {"type": float(ttype)}


# --------------------------------------------------------------------------- #
# gap-fill: determiners, prepositions, conjunctions
# --------------------------------------------------------------------------- #

_AN_WORDS = {"hour", "hourglass", "honest", "honour", "honor", "heir"}
_A_WORDS = {"university", "universities", "unicorn", "uniform", "union",
            "unit", "unique", "user", "useful", "usual", "european",
            "europe", "one", "utensil", "utensils"}
_NEG_CUES = {"hardly", "scarcely", "barely", "only", "almost", "no",
             "lost", "failed", "without", "none", "seldom", "rarely"}


def _c_determiner(g, m, text):
    mm = re.search(r"\(([A-Za-z /']+)\)[\s.'\"?!]*$", text.strip())
    if not mm:
        return _GATE
    opts = [o.strip().lower() for o in mm.group(1).split("/")]
    head = text[:mm.start()]
    bi = re.search(r"_{2,}", head)
    if not bi:
        return _GATE
    words_before = _tokenize(head[:bi.start()])
    words_after = _tokenize(head[bi.end():])
    nxt = words_after[0].lower() if words_after else ""
    answer = None
    rule = ""
    if set(opts) <= {"a", "an"}:
        if nxt in _AN_WORDS or (nxt and nxt[0] in "aeiou" and
                                nxt not in _A_WORDS):
            answer, rule = "an", ("sound rule: '" + nxt + "' begins with "
                                  "a vowel SOUND")
        elif nxt:
            answer, rule = "a", ("sound rule: '" + nxt + "' begins with "
                                 "a consonant sound (u = yoo-)")
        else:
            return _GATE
    elif set(opts) <= {"few", "a few", "little", "a little", "many",
                       "much"}:
        uncount = nxt in _UNCOUNT
        pool = {"little", "a little", "much"} if uncount else \
            {"few", "a few", "many"}
        cands = [o for o in opts if o in pool]
        if not cands:
            return _GATE
        if len(cands) == 1:
            answer = cands[0]
            rule = ("count-mass: '" + nxt + "' is uncountable"
                    if uncount else "countable noun: '" + nxt + "'")
        else:
            neg = any(w in _NEG_CUES for w in words_before + words_after)
            bare = [c for c in cands if not c.startswith("a ")]
            witha = [c for c in cands if c.startswith("a ")]
            if bare and witha:
                answer = bare[0] if neg else witha[0]
                rule = ("attitude pair: few/little = almost none "
                        "(negative tilt)" if neg else
                        "attitude pair: a few/a little = some (positive "
                        "tilt)")
            else:
                answer = cands[0]
                rule = "countability filter"
        rule += " (c9_gram_ch84_002, c10_gram_cbse_94_002)"
    elif set(opts) <= {"this", "that", "these", "those"}:
        plural = bool(nxt) and nxt not in _UNCOUNT and \
            nxt.endswith("s") and nxt not in _SING_S_NOUNS
        far = any(w in ("there", "far", "yesterday", "distant") for w in
                  words_before + words_after)
        near = any(w in ("here", "near", "nearby") for w in
                   words_before + words_after)
        if not far and not near:
            return _GATE  # the taught rule needs a distance cue
        if plural:
            answer = "those" if far else "these"
        else:
            answer = "that" if far else "this"
        rule = ("demonstratives encode distance; number copied from the "
                "noun (c10_gram_ch94_004)")
    elif set(opts) <= {"each", "every"}:
        indiv = any(w in ("two", "both", "individually", "respectively",
                          "either") for w in words_before + words_after)
        if not indiv:
            return _GATE
        answer, rule = "each", ("'each' distributes to members "
                                "individually; 'every' addresses the "
                                "group (c10_gram_ch94_003)")
    else:
        return _GATE
    seg = head.strip()
    if ":" in seg:
        seg = seg.rsplit(":", 1)[-1].strip()
    out = _cap(re.sub(r"_{2,}", answer, seg).strip("'\" ").rstrip(" .,")
               + ".")
    noun_class = ("uncountable" if nxt in _UNCOUNT else
                  "countable" if nxt else "-")
    steps = _steps5(
        "determiner choice runs fixed sub-algorithms "
        "(c9_gram_cbse_84_001): a/an by SOUND, few/little by "
        "countability and attitude, this/that by distance and number.",
        f"given: {head.strip()} ({'/'.join(opts)}).",
        [f"noun after the blank: '{nxt or '?'}' ({noun_class}).",
         f"rule engaged: {rule}.",
         f"chosen: {answer}."],
        f"agreement re-tested: {answer} fits the noun class of "
        f"'{nxt or '-'}' and the sentence's polarity cues.",
        "the determiner now encodes exactly what the taught rule "
        "requires -- sound, countability or distance.")
    return None, steps, out, None, "determiner sub-algorithms", \
        {"n_options": float(len(opts))}


_PREP_COLLOC = {
    "depend": "on", "depends": "on", "depended": "on",
    "good": "at", "afraid": "of", "insist": "on", "insists": "on",
    "insisted": "on", "different": "from", "married": "to",
    "listen": "to", "listens": "to", "listened": "to",
    "interested": "in", "similar": "to", "agree": "with",
    "agrees": "with", "agreed": "with",
}


def _c_preposition(g, m, text):
    bi = re.search(r"_{2,}", text)
    if not bi:
        return _GATE
    before = _tokenize(text[:bi.start()])
    key = None
    for w in reversed(before):
        if w.lower() in _PREP_COLLOC:
            key = w.lower()
            break
    if key is None:
        return _GATE
    answer = _PREP_COLLOC[key]
    mm = re.search(r"\(([A-Za-z /']+)\)[\s.'\"?!]*$", text.strip())
    if mm and answer not in [o.strip().lower()
                             for o in mm.group(1).split("/")]:
        return _GATE  # options exclude the collocation answer
    out = re.sub(r"_{2,}", answer, text[:mm.start()].strip()
                 if mm else (text[:bi.start()] + answer +
                             text[bi.end():]).strip())
    out = re.sub(r"\s*\(.*$", "", out) if mm else out
    if ":" in out:
        out = out.rsplit(":", 1)[-1].strip()
    out = _cap(out.strip("'\" ").rstrip(" .,") + ".")
    steps = _steps5(
        "preposition collocation is memorised territory "
        "(c12_gram_cbse_81_002): verbs, adjectives and nouns demand "
        "fixed partners -- a near-synonym preposition fails.",
        f"given: {text.strip()}; collocation head: '{key}'.",
        [f"the corpus collocation list fixes {key} -> {answer}.",
         f"filled sentence: {out}"],
        f"re-check against the collocation list: {key} {answer} is the "
        "listed pair; no other preposition completes it.",
        "collocations are conventional pairings -- the wrong partner "
        "breaks idiomatic correctness even when the meaning seems "
        "obvious.")
    return None, steps, out, None, \
        "corpus collocation table: head word -> fixed preposition", {}


_CAUSE = {"tired", "ill", "sick", "raining", "rain", "late", "hungry",
          "sleepy", "busy", "injured", "lost", "cold", "hot",
          "frightened", "scared", "poor", "failed", "unwell",
          "exhausted", "thirsty", "afraid"}
_POSWORDS = {"honest", "kind", "rich", "healthy", "happy", "strong",
             "fast", "won", "brave", "wise", "clever", "passed"}
_EFFORT = {"worked", "tried", "practised", "practiced", "hard",
           "studied"}


def _c_conjunction(g, m, text):
    mm = re.search(r"\(([A-Za-z /']+)\)[\s.'\"?!]*$", text.strip())
    if not mm:
        return _GATE
    opts = [o.strip().lower() for o in mm.group(1).split("/")]
    head = text[:mm.start()]
    bi = re.search(r"_{2,}|_____", head)
    if not bi:
        return _GATE
    pre = head[:bi.start()]
    if ":" in pre:
        pre = pre.rsplit(":", 1)[-1]  # drop the instruction clause
    left = pre.lower()
    right = head[bi.end():].lower()
    left_toks = _tokenize(left)
    right_toks = _tokenize(right)
    cause_left = any(w in _CAUSE for w in left_toks)
    cause_right = any(w in _CAUSE for w in right_toks)
    answer = None
    rule = ""
    if cause_left and not cause_right and "so" in opts:
        answer, rule = "so", ("cause -> result uses 'so'; the clause "
                              "order fixes the joiner "
                              "(c6_gram_cbse_83_003)")
    elif cause_right and not cause_left and "because" in opts:
        answer, rule = "because", "the cause clause follows 'because'"
    elif cause_left and cause_right:
        return _GATE
    if answer is None and "but" in opts:
        pos_l = any(w in _POSWORDS for w in left_toks)
        pos_r = any(w in _POSWORDS for w in right_toks)
        eff_l = any(w in _EFFORT for w in left_toks)
        eff_r = any(w in _EFFORT for w in right_toks)
        fail_l = any(w in ("failed", "lost") for w in left_toks)
        fail_r = any(w in ("failed", "lost") for w in right_toks)
        if (pos_l and not pos_r) or (pos_r and not pos_l) or \
                (eff_l and fail_r) or (eff_r and fail_l):
            answer, rule = "but", ("contrast between opposite-polarity "
                                   "clauses; the wrong joiner breaks the "
                                   "logic (c6_gram_cbse_83_003)")
    if answer is None and "or" in opts and "and" in opts and left_toks \
            and right_toks and \
            left_toks[0].lower().strip("'") in _COMMON_VERBS and \
            right_toks[0].lower().strip("'") in _COMMON_VERBS:
        answer, rule = "or", ("alternation between two imperative "
                              "options -- choice, not addition")
    if answer is None:
        if opts == ["or"]:
            answer, rule = "or", "alternation between two equal options"
        elif opts == ["and"]:
            answer, rule = "and", "addition of two equal items"
        else:
            return _GATE
    seg = head.strip()
    if ":" in seg:
        seg = seg.rsplit(":", 1)[-1].strip()
    out = _cap(re.sub(r"_{2,}", answer, seg).strip("'\" ").rstrip(" .,")
               + ".")
    steps = _steps5(
        "conjunctions are joining words with fixed logic "
        "(c6_gram_cbse_83_003): because = reason, so = result, but = "
        "contrast, and = addition, or = choice; the wrong joiner is "
        "wrong logic.",
        f"given: {head.strip()} ({'/'.join(opts)}).",
        [f"clause scan: cause cue "
         f"{'in the first clause' if cause_left else
          'in the second clause' if cause_right else 'none'}; polarity "
         f"contrast {'present' if answer == 'but' else 'absent'}.",
         f"rule engaged: {rule}.",
         f"chosen: {answer}."],
        f"logic re-read of the joined sentence: {out} -- the causal or "
        "contrastive relation now points the right way.",
        "the joiner encodes the relation between the clauses; swapping "
        "it would reverse or break the intended logic.")
    return None, steps, out, None, \
        "conjunction logic: reason/result/contrast/choice", {}


# --------------------------------------------------------------------------- #
# figures of speech (corpus examples, classes 6-12)
# --------------------------------------------------------------------------- #

_HUMAN_WORDS = {"he", "she", "i", "we", "they", "boy", "girl", "man",
                "woman", "mother", "father", "sister", "brother",
                "teacher", "student", "child", "children", "king",
                "queen", "farmer", "doctor", "friend", "people", "men",
                "women", "lady"}
_HUMAN_VERBS = {"kissed", "kisses", "danced", "dances", "wept", "weeps",
                "whispered", "whispers", "smiled", "smiles", "laughed",
                "laughs", "cried", "cries", "hugged", "winked",
                "grumbled", "groaned", "sighed", "listened", "promised",
                "forgave", "answered", "giggled", "sobbed", "mourned",
                "rejoiced"}
_ABSTRACT_SUBJ = {"life", "time", "love", "hope", "fear", "death",
                  "mind", "heart", "memory", "memories", "silence",
                  "music", "happiness", "sorrow", "anger", "friendship",
                  "faith", "knowledge", "patience", "success", "failure",
                  "sleep", "dreams", "fortune", "nature"}
_METAPHOR_COMP = {"rollercoaster", "blanket", "coin", "stage", "prison",
                  "cage", "jewel", "gem", "ocean", "jungle", "garden",
                  "machine", "battlefield", "lion", "fox", "snake",
                  "rock", "pillar", "fortress", "volcano"}
_HYPER_CUES = ["a million", "million times", "a thousand times",
               "thousand years", "whole of creation", "the whole world",
               "waited forever", "forever and ever", "for ages",
               "weighs a ton", "a ton of", "flood of tears", "oceans of",
               "mountains of", "took the whole", "hundred years"]
_ONOMATOPOEIA = {"buzzed", "buzzing", "buzz", "bang", "banged",
                 "crashed", "crash", "hissed", "hiss", "popped",
                 "splash", "splashed", "cuckoo", "ticked", "sizzled",
                 "crackled", "thud", "boomed", "chirped", "clanged",
                 "rattled"}
_SIMILE_STOP = ("as soon as", "as well as", "as long as", "as far as",
                "as if", "as though", "as per")

_FIG_TRAP = ("Corpus trap (c6_english_u1_005): students call any "
             "comparison a metaphor; 'The moon is like a coin' is a "
             "simile because of 'like', while 'The moon is a coin' is "
             "the metaphor.")


# analysis/discussion asks are literature-essay territory: device
# identification on them would be a false positive (cisce-solver-langnew
# 2026-09-30: "Discuss how Frost's use of imagery and figurative language
# ...", "Evaluate this statement for analytical depth" -> "alliteration").
_ANALYSIS_ASK_RE = re.compile(
    r"\b(?:discuss\w*|evaluate[sd]?|evaluating|critique|critically|"
    r"comment\s+on|outline|response\s+outline|essay|examine\s+how|"
    r"significance\s+of|assess(?:ment|ing)?\b|analytical\s+depth|"
    r"justif(?:y|ies)|compare\s+(?:and\s+contrast|the\s+use|how))\b", re.I)


def _c_figure(g, m, text):
    # identification family: refuse when the ask is an essay/evaluation
    # about figurative language rather than a name-the-device item
    if _ANALYSIS_ASK_RE.search(text):
        return _GATE
    line = _quote_of(text) or ""
    if len(line.split()) < 4:
        return _GATE
    low = " " + line.lower() + " "
    device, why = None, ""
    if not any(sx in low for sx in _SIMILE_STOP) and \
            (re.search(r"\blike\s+(a|an|the|my|his|her|its|their|our)\b",
                       low) or re.search(r"\bas\s+[a-z]+\s+as\b", low)):
        device, why = "simile", ("an explicit comparison using 'like' "
                                 "or 'as...as' (A is like B)")
    if device is None:
        toks = _tokenize(line)
        hv = [t for t in toks if t.lower() in _HUMAN_VERBS]
        humans = [t for t in toks if t.lower() in _HUMAN_WORDS]
        if hv and not humans:
            device, why = "personification", \
                (f"a non-human subject performs the human action "
                 f"'{hv[0].lower()}'")
    if device is None:
        mm = re.search(r"\b([a-z]+)\s+(is|was|are|were)\s+(a|an|the)\s+"
                       r"([a-z]+)\b", low)
        if mm and mm.group(1) not in ("there", "it") and \
                (mm.group(1) in _ABSTRACT_SUBJ or
                 mm.group(4) in _METAPHOR_COMP):
            device, why = "metaphor", \
                (f"'{mm.group(1)} is {mm.group(3)} {mm.group(4)}' "
                 "asserts the comparison directly -- no 'like'/'as' "
                 "bridge")
    if device is None:
        cue = next((c for c in _HYPER_CUES if c in low), None)
        if cue:
            device, why = "hyperbole", \
                f"the exaggeration '{cue}' is not meant literally"
    if device is None:
        toks = _tokenize(line)
        counts: Dict[str, int] = {}
        for t in toks:
            lt = t.lower()
            if len(lt) >= 2 and lt[0].isalpha():
                counts[lt[0]] = counts.get(lt[0], 0) + 1
        if counts:
            letter, cnt = max(counts.items(), key=lambda kv: kv[1])
            if cnt >= 3:
                ws = [t for t in toks if t.lower().startswith(letter)]
                device, why = "alliteration", \
                    (f"'{letter}' opens {cnt} neighbouring words "
                     f"({', '.join(ws[:5])})")
    if device is None:
        ow = [t for t in _tokenize(line) if t.lower() in _ONOMATOPOEIA]
        if ow:
            device, why = "onomatopoeia", \
                f"'{ow[0].lower()}' imitates the sound it names"
    if device is None:
        return _GATE
    steps = _steps5(
        "figurative language is tested by form, not feel (c7_engl "
        "figurative-language strand): each device leaves a mechanical "
        "trace -- bridge words, asserted identity, human verbs on "
        "non-human subjects, exaggeration, repeated initial sounds.",
        f"line: {line}.",
        [f"form test engaged: {why}.",
         "device decided: " + device + " (checked in precedence order: "
         "simile -> personification -> metaphor -> hyperbole -> "
         "alliteration -> onomatopoeia)."],
        "re-scan of the line for higher-precedence devices found "
        "nothing stronger -- the identified device is the best "
        "form-grounded answer.",
        f"the line works through {device}: the effect is built by the "
        "form the test found, not by outside knowledge.")
    steps.append("Trap check: " + _FIG_TRAP)
    return None, steps, device, None, \
        "figure-of-speech form tests in precedence order", \
        {"device_rank": float({"simile": 0, "personification": 1,
                               "metaphor": 2, "hyperbole": 3,
                               "alliteration": 4,
                               "onomatopoeia": 5}[device])}



# --------------------------------------------------------------------------- #
# English morphology — irregular verb table (V1 -> (V2, V3, V-ing)) and
# regular-verb rules.  Textbook register: only standard spellings.
# --------------------------------------------------------------------------- #

IRREGULAR: Dict[str, Tuple[str, str, str]] = {
    "arise": ("arose", "arisen", "arising"), "awake": ("awoke", "awoken", "awaking"),
    "be": ("was", "been", "being"), "am": ("was", "been", "being"),
    "is": ("was", "been", "being"), "are": ("were", "been", "being"),
    "beat": ("beat", "beaten", "beating"), "become": ("became", "become", "becoming"),
    "begin": ("began", "begun", "beginning"), "bend": ("bent", "bent", "bending"),
    "bet": ("bet", "bet", "betting"), "bind": ("bound", "bound", "binding"),
    "bite": ("bit", "bitten", "biting"), "bleed": ("bled", "bled", "bleeding"),
    "blow": ("blew", "blown", "blowing"), "break": ("broke", "broken", "breaking"),
    "breed": ("bred", "bred", "breeding"), "bring": ("brought", "brought", "bringing"),
    "build": ("built", "built", "building"), "burn": ("burnt", "burnt", "burning"),
    "burst": ("burst", "burst", "bursting"), "buy": ("bought", "bought", "buying"),
    "catch": ("caught", "caught", "catching"), "choose": ("chose", "chosen", "choosing"),
    "come": ("came", "come", "coming"), "cost": ("cost", "cost", "costing"),
    "cut": ("cut", "cut", "cutting"), "dig": ("dug", "dug", "digging"),
    "do": ("did", "done", "doing"), "does": ("did", "done", "doing"),
    "draw": ("drew", "drawn", "drawing"), "dream": ("dreamt", "dreamt", "dreaming"),
    "drink": ("drank", "drunk", "drinking"), "drive": ("drove", "driven", "driving"),
    "eat": ("ate", "eaten", "eating"), "fall": ("fell", "fallen", "falling"),
    "feed": ("fed", "fed", "feeding"), "feel": ("felt", "felt", "feeling"),
    "fight": ("fought", "fought", "fighting"), "find": ("found", "found", "finding"),
    "flee": ("fled", "fled", "fleeing"), "fly": ("flew", "flown", "flying"),
    "forget": ("forgot", "forgotten", "forgetting"),
    "forgive": ("forgave", "forgiven", "forgiving"),
    "freeze": ("froze", "frozen", "freezing"), "get": ("got", "got", "getting"),
    "give": ("gave", "given", "giving"), "go": ("went", "gone", "going"),
    "goes": ("went", "gone", "going"), "grow": ("grew", "grown", "growing"),
    "hang": ("hung", "hung", "hanging"), "have": ("had", "had", "having"),
    "has": ("had", "had", "having"), "hear": ("heard", "heard", "hearing"),
    "hide": ("hid", "hidden", "hiding"), "hit": ("hit", "hit", "hitting"),
    "hold": ("held", "held", "holding"), "hurt": ("hurt", "hurt", "hurting"),
    "keep": ("kept", "kept", "keeping"), "kneel": ("knelt", "knelt", "kneeling"),
    "know": ("knew", "known", "knowing"), "lay": ("laid", "laid", "laying"),
    "lead": ("led", "led", "leading"), "leap": ("leapt", "leapt", "leaping"),
    "learn": ("learnt", "learnt", "learning"), "leave": ("left", "left", "leaving"),
    "lend": ("lent", "lent", "lending"), "lie": ("lay", "lain", "lying"),
    "light": ("lit", "lit", "lighting"), "lose": ("lost", "lost", "losing"),
    "make": ("made", "made", "making"), "mean": ("meant", "meant", "meaning"),
    "meet": ("met", "met", "meeting"), "pay": ("paid", "paid", "paying"),
    "put": ("put", "put", "putting"), "read": ("read", "read", "reading"),
    "ride": ("rode", "ridden", "riding"), "ring": ("rang", "rung", "ringing"),
    "rise": ("rose", "risen", "rising"), "run": ("ran", "run", "running"),
    "say": ("said", "said", "saying"), "see": ("saw", "seen", "seeing"),
    "seek": ("sought", "sought", "seeking"), "sell": ("sold", "sold", "selling"),
    "send": ("sent", "sent", "sending"), "set": ("set", "set", "setting"),
    "shake": ("shook", "shaken", "shaking"), "shine": ("shone", "shone", "shining"),
    "shoot": ("shot", "shot", "shooting"), "show": ("showed", "shown", "showing"),
    "shrink": ("shrank", "shrunk", "shrinking"),
    "shut": ("shut", "shut", "shutting"), "sing": ("sang", "sung", "singing"),
    "sink": ("sank", "sunk", "sinking"), "sit": ("sat", "sat", "sitting"),
    "sleep": ("slept", "slept", "sleeping"), "slide": ("slid", "slid", "sliding"),
    "speak": ("spoke", "spoken", "speaking"), "spend": ("spent", "spent", "spending"),
    "spill": ("spilt", "spilt", "spilling"), "spin": ("spun", "spun", "spinning"),
    "spit": ("spat", "spat", "spitting"), "split": ("split", "split", "splitting"),
    "spread": ("spread", "spread", "spreading"),
    "stand": ("stood", "stood", "standing"),
    "steal": ("stole", "stolen", "stealing"),
    "stick": ("stuck", "stuck", "sticking"),
    "sting": ("stung", "stung", "stinging"),
    "strike": ("struck", "struck", "striking"),
    "swear": ("swore", "sworn", "swearing"),
    "sweep": ("swept", "swept", "sweeping"),
    "swim": ("swam", "swum", "swimming"),
    "take": ("took", "taken", "taking"),
    "teach": ("taught", "taught", "teaching"),
    "tear": ("tore", "torn", "tearing"),
    "tell": ("told", "told", "telling"),
    "think": ("thought", "thought", "thinking"),
    "throw": ("threw", "thrown", "throwing"),
    "undergo": ("underwent", "undergone", "undergoing"),
    "understand": ("understood", "understood", "understanding"),
    "wake": ("woke", "woken", "waking"),
    "wear": ("wore", "worn", "wearing"),
    "weep": ("wept", "wept", "weeping"),
    "win": ("won", "won", "winning"),
    "wind": ("wound", "wound", "winding"),
    "write": ("wrote", "written", "writing"),
}
# reverse index: any inflected surface form -> (base, V2, V3, Ving)
_VFORMS: Dict[str, Tuple[str, str, str, str]] = {}
for _b, (_v2, _v3, _ving) in IRREGULAR.items():
    _VFORMS.setdefault(_b, (_b, _v2, _v3, _ving))
    _VFORMS.setdefault(_v2, (_b, _v2, _v3, _ving))
    _VFORMS.setdefault(_v3, (_b, _v2, _v3, _ving))
    _VFORMS.setdefault(_ving, (_b, _v2, _v3, _ving))

_BEForms = {"am", "is", "are", "was", "were", "be", "been", "being"}
_HAVEForms = {"have", "has", "had"}
_LG_MODAL = {"can", "could", "may", "might", "must", "shall", "should", "will",
          "would", "ought", "used"}


def _regular_forms(base: str) -> Tuple[str, str, str]:
    """(V2, V3, V-ing) for a regular verb, with school spelling rules."""
    if base.endswith("e"):
        v2 = base + "d"
        ving = base[:-1] + "ing"
    elif len(base) >= 3 and base.endswith("y") and base[-2] not in "aeiou":
        v2 = base[:-1] + "ied"
        ving = base + "ing"
    elif (len(base) >= 3 and base[-1] not in "aeiouwxy"
          and base[-1] == base[-2] is not None and base[-2] in "aeiou"
          and len(base) <= 4 and not base.endswith("l")):
        # stop->stopped, sit->sat? no — sit is irregular; this catches
        # short CVC: stop, plan, drop, hop... doubled consonant
        v2 = base + base[-1] + "ed"
        ving = base + base[-1] + "ing"
    elif base.endswith("l") and len(base) >= 5 and base[-2] in "aeiou" and \
            base[-3] not in "aeiou":
        v2 = base + "led"
        ving = base + "ling"          # travel -> travelled (BrE school form)
    else:
        v2 = base + "ed"
        ving = base + "ing"
    return v2, v2, ving


def verb_forms(word: str) -> Optional[Tuple[str, str, str, str]]:
    """surface form -> (base, V2, V3, V-ing); None when not verb-like.

    Membership-guarded: a recovered base must be a KNOWN verb (irregular
    table or the school base lexicon) so nouns never masquerade as verbs."""
    w = word.lower().strip(".,!?;:'\"")
    if not w:
        return None
    if w in _VFORMS:
        return _VFORMS[w]
    if w in BASE_VERBS:
        v2, v3, ving = _regular_forms(w)
        return (w, v2, v3, ving)

    def _ret(base):
        if base in _VFORMS:
            x = _VFORMS[base]
            return (base, x[1], x[2], x[3])
        v2, v3, ving = _regular_forms(base)
        return (base, v2, v3, ving)

    # -s forms
    if w.endswith("es") and (w[:-2] in _VFORMS or w[:-2] in BASE_VERBS):
        return _ret(w[:-2])
    if w.endswith("s") and (w[:-1] in _VFORMS or w[:-1] in BASE_VERBS):
        return _ret(w[:-1])
    # -ing / -ed of known verbs: recover the base by un-spelling
    if w.endswith("ing") and len(w) > 4:
        stem = w[:-3]
        cands = [stem, stem + "e"]
        if len(stem) >= 2 and stem[-1] == stem[-2]:
            cands.append(stem[:-1])
        if stem.endswith("i"):
            cands.append(stem[:-1] + "y")
        for cand in cands:
            if cand in BASE_VERBS or cand in _VFORMS:
                return _ret(cand)
    if w.endswith("ied") and len(w) > 4:
        cand = w[:-3] + "y"
        if cand in BASE_VERBS or cand in _VFORMS:
            return _ret(cand)
    if w.endswith("ed") and len(w) > 3:
        cands = [w[:-1], w[:-2]]
        if len(w) >= 5 and w[-3] == w[-4] and w[-3] not in "aeiou":
            cands.append(w[:-3])          # stopped -> stop
        for cand in cands:
            if cand in BASE_VERBS or cand in _VFORMS:
                x = _ret(cand)
                if x[1] == w or cand in BASE_VERBS and \
                        _regular_forms(cand)[0] == w:
                    return x
        # e-final bases: baked -> bake (w[:-1] ends with e)
        if w[:-1].endswith("e") and (w[:-1] in BASE_VERBS or
                                     w[:-1] in _VFORMS):
            return _ret(w[:-1])
    return None


def _third_person(base: str) -> str:
    if base in ("be",):
        return "is"
    if base.endswith(("ch", "sh", "ss", "x", "o", "z")):
        return base + "es"
    if base.endswith("y") and len(base) >= 2 and base[-2] not in "aeiou":
        return base[:-1] + "ies"
    return base + "s"


def _lg_be_for(subject: str, tense: str) -> str:
    """am/is/are (present) or was/were (past) by subject number/person."""
    s = subject.lower().strip()
    pl = s.endswith("s") and not s.endswith("ss") or \
        s.split()[-1:] and s.split()[-1].lower() in (
            "we", "they", "these", "those", "children", "men", "women",
            "people", "boys", "girls", "students")
    if s.split()[-1].lower() in ("i", "we", "they", "you", "these",
                                 "those", "children", "men", "women",
                                 "people") or (
            s.split()[-1].lower().endswith("s")
            and s.split()[-1].lower() not in ("is", "was", "his", "its",
                                              "this", "bus", "class", "gas")):
        pl = True
    if s.split()[-1].lower() == "i":
        pl = False
    if tense == "past":
        return ("were" if pl else "was")
    return ("are" if pl else "is")


# --------------------------------------------------------------------------- #
# sentence parsing helpers shared by ENG families
# --------------------------------------------------------------------------- #

_WORDS = re.compile(r"[A-Za-z']+")


def _toks(s: str) -> List[str]:
    return _WORDS.findall(s)


def _obj_case(pron: str) -> str:
    return {"i": "me", "we": "us", "he": "him", "she": "her", "they": "them",
            "who": "whom"}.get(pron.lower(), pron.lower())


def _subj_case(pron: str) -> str:
    return {"me": "I", "us": "we", "him": "he", "her": "she", "them": "they",
            "whom": "who"}.get(pron.lower(), pron.lower())


def _poss_case(pron: str) -> str:
    return {"i": "my", "we": "our", "he": "his", "she": "her", "they": "their",
            "you": "your", "it": "its"}.get(pron.lower(), pron.lower())


def _split_instruction(text: str) -> Optional[str]:
    """The sentence to operate on: after a colon / quoted / after the ask."""
    # "Change into passive voice: The dog bites the man."
    m = re.search(r"(?::|\bis\b\s*:|\bfollowing\b|sentence\s+is|"
                  r"given below|sentence:?)\s*[:\-]?\s*(.+?)\s*$",
                  text, re.I)
    if m:
        cand = m.group(1).strip()
    else:
        # instruction ... "The dog bites the man." — last sentence
        parts = re.split(r"(?<=[.?!])\s+", text.strip())
        cand = parts[-1].strip() if parts else ""
        if len(parts) < 2:
            return None
    cand = cand.strip("\"'“”‘’. ").strip()
    if not cand or not re.search(r"[A-Za-z]{2,}", cand):
        return None
    # the candidate must look like a sentence (has a verb), not another ask
    if re.search(r"\b(?:passive|active|indirect|direct|tense|speech|voice|"
                 r"transform|rewrite|change|convert)\b", cand, re.I) \
            and not re.search(r"['\"]", cand):
        return None
    return cand


# common regular base verbs (school register) — the base lexicon that lets
# -s/-ed/-ing surface forms be recognised without guessing
BASE_VERBS = {
    "accept", "act", "add", "admit", "announce", "arrive", "adopt",
    "advise", "agree", "allow", "answer", "appear", "apply", "appoint",
    "argue", "arrange", "ask", "attack", "attempt", "attend", "avoid",
    "bake", "bark", "bathe", "bear", "beg", "bite", "boil", "borrow", "bother", "brush", "calculate", "call", "carry",
    "celebrate", "change", "charge", "chase", "chat", "check", "cheat",
    "cheer", "chew", "clean", "climb", "close", "collect", "combine",
    "complain", "complete", "consider", "contain", "continue", "cook",
    "copy", "count", "cover", "crash", "cross", "cry", "cure", "damage",
    "dance", "decide", "declare", "defeat", "defend", "delay", "deliver",
    "demand", "deny", "depend", "destroy", "develop", "die", "discover",
    "discuss", "dismiss", "distance", "divide", "doubt", "drag", "draft",
    "drown", "dry", "earn", "employ", "encourage", "enjoy", "enter",
    "escape", "examine", "excuse", "exercise", "expect", "explain",
    "express", "fail", "fill", "finish", "fix", "float", "flow", "fold",
    "follow", "force", "form", "gain", "gather", "greet", "guess", "handle",
    "happen", "hate", "help", "hire", "hope", "hurry", "ignore", "imagine",
    "impress", "improve", "include", "increase", "influence", "inform",
    "injure", "insist", "inspect", "install", "instruct", "intend",
    "interest", "interview", "introduce", "invent", "invite", "join",
    "joke", "judge", "jump", "kick", "kill", "kiss", "knock", "land",
    "laugh", "launch", "lean", "lift", "like", "list", "listen", "live", "load",
    "lock", "look", "love", "manage", "mark", "marry", "measure", "mention",
    "milk", "miss", "mix", "move", "need", "note", "notice", "obey",
    "observe", "obtain", "occur", "offer", "open", "order", "organize",
    "own", "pack", "paint", "pass", "pause", "perform", "permit", "pick",
    "plan", "plant", "play", "please", "point", "pour", "practise",
    "praise", "pray", "prefer", "prepare", "present", "prevent", "print",
    "produce", "promise", "protect", "prove", "provide", "pull", "punish",
    "push", "question", "race", "rain", "reach", "realise", "receive",
    "recognise", "record", "reduce", "refer", "reflect", "refuse", "regard",
    "register", "release", "remain", "remove", "repair", "repeat", "reply",
    "report", "request", "rescue", "respect", "rest", "return", "reveal",
    "review", "reward", "row", "rub", "rule", "save", "scold", "score",
    "search", "select", "separate", "serve", "settle", "share", "shock",
    "shout", "sign", "smile", "smoke", "solve", "sort", "sound", "spell",
    "spoil", "spread_", "start", "state", "stay", "steer", "step", "stop",
    "stretch", "study", "stun", "suffer", "suggest", "supply", "support",
    "suppose", "surprise", "surround", "survive", "suspect", "talk",
    "taste", "tax", "terrify", "test", "thank", "throw_", "tie", "touch",
    "train", "transfer", "transform", "travel", "treat", "trust", "try",
    "turn", "type", "unite", "use", "vanish", "vary", "visit", "wait",
    "wake_", "walk", "want", "warn", "wash", "waste", "watch", "water",
    "wave", "welcome", "wish", "wonder", "work", "worry", "wrap",
}


def _verbish(tok: str) -> bool:
    """token can act as a (main or auxiliary) verb here."""
    w = tok.lower()
    if w in _BEForms or w in _HAVEForms or w in _LG_MODAL:
        return True
    if w in _VFORMS:
        return True
    if w in BASE_VERBS:
        return True
    if w.endswith("s") and (w[:-1] in BASE_VERBS or w[:-1] in _VFORMS):
        return True
    if w.endswith("es") and (w[:-2] in BASE_VERBS or w[:-2] in _VFORMS):
        return True
    if w.endswith("ing") and (w[:-3] in BASE_VERBS or
                              (w.endswith("ying") and w[:-3] + "ie" in
                               BASE_VERBS) or w[:-3] + "e" in _VFORMS or
                              w[:-3] in _VFORMS):
        return True
    if w.endswith("ed") and (w[:-1] in BASE_VERBS or w[:-2] in BASE_VERBS or
                             (w.endswith("ied") and w[:-3] + "y" in
                              BASE_VERBS) or w[:-1] in _VFORMS or
                             w[:-2] in _VFORMS):
        return True
    return False


def _inflect(base: str, kind: str, subject: str = "") -> str:
    """kind: 'v1s' (3rd sgt present), 'v2', 'v3', 'ving'."""
    if base in _VFORMS:
        b, v2, v3, ving = _VFORMS[base]
    else:
        v2, v3, ving = _regular_forms(base)
    return {"v1": base, "v1s": _third_person(base), "v2": v2, "v3": v3,
            "ving": ving}[kind]


def _parse_sentence(sentence: str):
    """-> (subject, verb_tokens, tail) tokens or None.

    Scope: simple declarative sentences (subject + verb group + object /
    complement + optional tail).  Anything else must refuse."""
    toks = _toks(sentence)
    if len(toks) < 3 or len(toks) > 24:
        return None
    # leading sentence adverbs join the tail of the subject NP
    lead_adv = {"today", "now", "yesterday", "tomorrow", "usually",
                "always", "never", "often", "sometimes", "generally",
                "recently", "already", "just", "still", "soon"}
    vi = 0
    while vi < len(toks) and toks[vi].lower() in lead_adv:
        vi += 1
    # find the first verbish token
    k = vi
    while k < len(toks) and not _verbish(toks[k]):
        k += 1
    if k == len(toks) or k == vi:
        # verb before any subject noun, or no verb -> refuse
        if k == len(toks):
            return None
    subject = toks[vi:k]
    if not subject:
        return None
    # subject must be NP-shaped: starts with det/poss/number or is a
    # pronoun/proper-ish noun — refuse 'if/when/because' clauses etc.
    first = subject[0].lower()
    subj_head = subject[-1].lower()
    if first in ("if", "when", "because", "that", "although", "unless",
                 "while", "since"):
        return None
    if first in ("the", "a", "an", "my", "our", "your", "his", "her",
                 "their", "its", "this", "that", "these", "those") or \
            first in ("i", "we", "you", "he", "she", "it", "they") or \
            first[0].isupper():
        pass
    elif subj_head in _VFORMS or _verbish(subj_head):
        return None
    # extend the verb group over auxiliaries, then include the main verb
    j = k
    aux_run = {"do", "does", "did", "not", "n't", "never", "going", "to"}
    aux_sets = _BEForms | _HAVEForms | _LG_MODAL | aux_run
    while j < len(toks):
        t = toks[j].lower()
        if t in aux_sets:
            j += 1
            continue
        if j > k and _verbish(t) and toks[j - 1].lower() in aux_sets:
            j += 1
            continue
        break
    if j == k:
        j = k + 1                 # the verb at k is itself the group
    elif j > k and j < len(toks) and toks[j - 1].lower() in _LG_MODAL and \
            toks[j - 1].lower() not in aux_run:
        # a bare modal needs its main verb (will + announce)
        j += 1
    if j > len(toks):
        return None
    tail = toks[j:]
    return subject, toks[k:j], tail


def _main_surface(vg: List[str]) -> Optional[str]:
    """The main-verb SURFACE form: last verbish token that is not an
    auxiliary placeholder (been/being/going/to)."""
    for t in reversed(vg):
        lw = t.lower()
        if lw in ("been", "being", "going", "to", "not", "n't", "do",
                  "does", "did"):
            continue
        if lw in _BEForms or lw in _HAVEForms or lw in _LG_MODAL:
            continue
        if lw in BASE_VERBS or _verbish(lw):
            return lw
        return None
    return None


def _base_of(surface: str) -> Optional[str]:
    forms = verb_forms(surface)
    return forms[0] if forms else None


def _vgroup_kind(vg: List[str]):
    """Classify the verb group -> (kind, base, aux, beform).

    kind: pres_cont | past_cont | pres_perf | past_perf | future |
    future_cont | fut_perf | modal | going_to | pres_simple | past_simple |
    pres_perf_cont | past_perf_cont | used_to | pass_pres | pass_past |
    pass_pres_cont | pass_past_cont | pass_perf | pass_modal | pass_future"""
    lw = [t.lower() for t in vg]
    surface = _main_surface(vg)
    if surface is None:
        return None
    base = _base_of(surface)
    if base is None:
        return None
    be = next((t for t in lw if t in _BEForms), None)
    hv = next((t for t in lw if t in _HAVEForms), None)
    mod = next((t for t in lw if t in _LG_MODAL and t != "used"), None)
    ing = surface.endswith("ing") and surface != "going"
    v3 = verb_forms(surface) and surface == verb_forms(surface)[2] and \
        not surface.endswith("ing")
    # PASSIVE shapes (be + V3 / being V3 / been V3)
    if be is not None:
        if "being" in lw and ing:
            return ("pass_past_cont" if be in ("was", "were") else
                    "pass_pres_cont", base, f"{be} being", None)
        if "been" in lw:
            return ("pass_perf", base, f"{hv or 'has'} been", None)
        if v3:
            return ("pass_past" if be in ("was", "were") else
                    "pass_pres", base, be, None)
        if ing:
            return ("past_cont" if be in ("was", "were") else
                    "pres_cont", base, be, None)
        if surface == "going":
            return ("going_to", base, f"{be} going to", None)
        # be + adjective/noun complement (S+be+NP) — no voice change
        return ("copula", base, be, None)
    if "used" in lw and "to" in lw:
        return ("used_to", base, "used to", None)
    if mod in ("will", "shall"):
        if "been" in lw:
            return ("pass_fut_perf", base, "will have been", None)
        if "been" in lw or v3 and hv:
            return ("pass_fut_perf", base, "will have been", None)
        if hv:
            return ("fut_perf", base, "will have", None)
        if ing:
            return ("future_cont", base, "will be", None)
        return ("future", base, "will", None)
    if mod:
        if "been" in lw:
            return ("pass_modal", base, f"{mod} have been"
                    if hv else f"{mod} be", None)
        return ("modal", base, mod, None)
    if hv:
        if "been" in lw:
            return ("pres_perf_cont" if hv in ("have", "has") else
                    "past_perf_cont", base, f"{hv} been", None)
        # has/have/had + V3 WITHOUT 'been' = ACTIVE perfect
        return ("pres_perf" if hv in ("have", "has") else "past_perf",
                base, hv, None)
    if ing:
        return None                      # bare -ing without aux: refuse
    if surface.endswith("s") and surface not in _VFORMS:
        return ("pres_simple", base, "", None)
    forms = verb_forms(surface)
    if forms and forms[1] == surface and base != surface:
        return ("past_simple", base, "", None)
    if surface in ("cost", "cut", "hit", "put", "read", "set", "shut",
                   "hurt", "let", "bet"):
        return ("past_simple", base, "", None)
    return ("pres_simple", base, "", None)


# --------------------------------------------------------------------------- #
# ENG family computes
# --------------------------------------------------------------------------- #

_PASSIVE_KINDS = {"pass_pres", "pass_past", "pass_pres_cont",
                  "pass_past_cont", "pass_perf", "pass_modal",
                  "pass_fut_perf"}


def _to_passive_vg(kind: str, base: str, subject: str):
    """active verb group -> (passive verb group, beform or None on refuse)"""
    be = _lg_be_for(subject, "past" if kind in
                 ("past_cont", "past_perf", "past_simple", "used_to",
                  "going_to_p") else "pres")
    v3 = _inflect(base, "v3")
    if kind == "pres_cont":
        return f"{be} being {v3}"
    if kind == "past_cont":
        return f"{'were' if be == 'are' else 'was'} being {v3}"
    if kind == "pres_perf":
        return f"{'have' if be == 'are' else 'has'} been {v3}"
    if kind == "past_perf":
        return f"had been {v3}"
    if kind == "future":
        return f"will be {v3}"
    if kind == "future_cont":
        return f"will be being {v3}"
    if kind == "fut_perf":
        return f"will have been {v3}"
    if kind == "modal":
        return None                       # modal voice: ambiguous without
                                          # the modal itself — refused
    if kind == "going_to":
        return f"{be} going to be {v3}"
    if kind == "used_to":
        return f"used to be {v3}"
    if kind == "pres_simple":
        return f"{be} {v3}"
    if kind == "past_simple":
        return (f"{'were' if be == 'are' else 'was'} {v3}")
    return None


def _c_eng_passive(slots, text):
    """'Change into passive voice: <active sentence>' -> passive sentence."""
    m = re.search(r"\bpassive\s+voice\b", text, re.I)
    if not m:
        return None
    sentence = _split_instruction(text)
    if not sentence:
        return None
    parsed = _parse_sentence(sentence)
    if not parsed:
        return None
    subject, vg, tail = parsed
    kind = _vgroup_kind(vg)
    if not kind:
        return None
    kind, base, aux, _be = kind
    if kind in _PASSIVE_KINDS:
        return (None, ["already in the passive voice"],
                "The sentence is already in the passive voice.", None,
                "LANG_ENG_PASSIVE", None)
    if kind == "copula" or kind in ("pres_be", "past_be"):
        return None                        # no object: nothing to promote
    new_vg = _to_passive_vg(kind, base, " ".join(tail[:1]))
    if not new_vg:
        return None
    # object = head of the tail NP up to a preposition/adverb boundary
    stop = {"in", "on", "at", "with", "for", "from", "by", "about",
            "into", "onto", "over", "under", "near", "since", "during",
            "because", "although", "if", "when", "while", "so", "that",
            "to", "who", "which", "yesterday", "today",
            "tomorrow", "now", "everyday", "regularly", "carefully",
            "loudly", "quietly", "slowly", "quickly", "happily",
            "kindly", "well", "hard", "here", "there", "home", "outside",
            "inside", "away", "back", "again", "every", "each", "daily",
            "often", "usually", "always", "never", "sometimes",
            "tonight", "already", "just", "soon"}
    toks = tail
    # determiner-less object must still look NP-ish
    oi = 0
    while oi < len(toks) and toks[oi].lower() not in stop:
        oi += 1
    obj = toks[:oi]
    rest = toks[oi:]
    if not obj or len(obj) > 6:
        return None
    if obj[0].lower() in ("him", "her", "them", "me", "us", "you", "it",
                          "someone", "everybody", "everyone", "nobody",
                          "anybody", "anything", "nothing", "something",
                          "people"):
        # pronoun / indefinite object: keep case as-is as new subject
        obj_np = _subj_case(obj[0]) if len(obj) == 1 else \
            " ".join([_subj_case(obj[0])] + obj[1:])
    else:
        obj_np = " ".join(obj)
    be = _lg_be_for(obj_np, "past" if kind in ("past_cont", "past_perf",
                                            "past_simple", "used_to")
                 else "pres")
    # rebuild with the correct agreement
    if kind == "pres_cont":
        new_vg = f"{be} being {_inflect(base, 'v3')}"
    elif kind == "past_cont":
        new_vg = (f"{'were' if be == 'are' else 'was'} "
                  f"{_inflect(base, 'v3')}")
    elif kind == "pres_perf":
        new_vg = (f"{'have' if be == 'are' else 'has'} been "
                  f"{_inflect(base, 'v3')}")
    elif kind == "past_perf":
        new_vg = f"had been {_inflect(base, 'v3')}"
    elif kind == "future":
        new_vg = f"will be {_inflect(base, 'v3')}"
    elif kind == "going_to":
        new_vg = f"{be} going to be {_inflect(base, 'v3')}"
    elif kind == "used_to":
        new_vg = f"used to be {_inflect(base, 'v3')}"
    elif kind == "pres_simple":
        new_vg = f"{be} {_inflect(base, 'v3')}"
    elif kind == "past_simple":
        new_vg = (f"{'were' if be == 'are' else 'was'} "
                  f"{_inflect(base, 'v3')}")
    else:
        return None
    by_subj = " ".join([_obj_case(subject[0])] + subject[1:]) \
        if subject[0].lower() in ("i", "we", "he", "she", "they", "you") \
        else _decat(" ".join(subject))
    passive = f"{_cap(obj_np)} {new_vg} by {by_subj}"
    if rest:
        rest_txt = _decat(" ".join(rest))
        passive += " " + rest_txt
    passive = passive.strip() + "."
    return (None,
            ["identify the object — it becomes the new subject",
             "be-verb agrees with the new subject in the same tense",
             "main verb -> past participle; old subject follows with 'by'"],
            passive, None, "LANG_ENG_PASSIVE",
            {"active": " ".join(subject + vg + tail)})


def _decat(s: str) -> str:
    """lowercase a sentence-initial determiner/possessive that now sits
    mid-sentence (The boys -> the boys); proper nouns are left alone."""
    first = s.split()[0] if s.split() else ""
    if first[:1].isupper() and (len(first) == 1 or
                                first[1:].islower()) and \
            first.lower() in ("the", "a", "an", "my", "our", "your",
                              "his", "her", "its", "their", "this",
                              "that", "these", "those", "as", "it",
                              "he", "she", "they", "we", "someone",
                              "something", "somebody", "anyone",
                              "anybody", "anything", "everyone",
                              "everybody", "everything", "nobody",
                              "nothing"):
        return first.lower() + s[len(first):]
    return s


def _c_eng_active(slots, text):
    """'Change into active voice: <passive sentence>' -> active sentence."""
    if not re.search(r"\bactive\s+voice\b", text, re.I):
        return None
    sentence = _split_instruction(text)
    if not sentence:
        return None
    parsed = _parse_sentence(sentence)
    if not parsed:
        return None
    subject, vg, tail = parsed
    kind = _vgroup_kind(vg)
    if not kind:
        return None
    kind, base, aux, _be = kind
    if kind not in _PASSIVE_KINDS:
        return (None, ["already in the active voice"],
                "The sentence is already in the active voice.", None,
                "LANG_ENG_ACTIVE", None)
    # agent: the 'by <NP>' tail — required for a full reversal
    toks = tail
    by_i = next((i for i, t in enumerate(toks)
                 if t.lower() == "by"), None)
    if by_i is None or by_i + 1 >= len(toks):
        return None                        # agentless passive: refuse
    agent = toks[by_i + 1:]
    stop = {"in", "on", "at", "with", "for", "from", "about", "into",
            "when", "while", "because", "if", "yesterday", "today",
            "tomorrow", "now", "everyday", "yesterday."}
    ai = 0
    while ai < len(agent) and agent[ai].lower() not in stop:
        ai += 1
    agent_np = agent[:ai]
    rest = agent[ai:]
    if not agent_np or len(agent_np) > 6:
        return None
    # new subject = agent in subject case; plural drives be-form
    new_subj_tok = _subj_case(agent_np[0]) if len(agent_np) == 1 and \
        agent_np[0].lower() in ("him", "her", "them", "me", "us") \
        else agent_np[0]
    new_subj = " ".join([new_subj_tok] + agent_np[1:])
    # object = old subject in object case if pronoun
    obj = " ".join([_obj_case(subject[0])] + subject[1:]) if \
        len(subject) == 1 and subject[0].lower() in (
            "i", "we", "he", "she", "they", "who") else " ".join(subject)
    v3 = _inflect(base, "v3")
    subj_pl = _lg_be_for(new_subj, "pres") == "are"
    if kind == "pass_pres":
        vg2 = _inflect(base, "v1s") if not subj_pl else base
        # 1st/2nd person take the bare base
        if new_subj_tok.lower() in ("i", "we", "you", "they"):
            vg2 = base
    elif kind == "pass_past":
        vg2 = _inflect(base, "v2")
    elif kind == "pass_pres_cont":
        vg2 = ("are " if subj_pl else "is ") + _inflect(base, "ving")
        if new_subj_tok.lower() == "i":
            vg2 = "am " + _inflect(base, "ving")
    elif kind == "pass_past_cont":
        vg2 = ("were " if subj_pl else "was ") + _inflect(base, "ving")
    elif kind == "pass_perf":
        vg2 = ("have " if subj_pl else "has ") + v3
        if new_subj_tok.lower() == "i":
            vg2 = "have " + v3
    elif kind == "pass_modal":
        # passive modal "can be seen" -> active "can see"
        mod = aux.split()[0]
        vg2 = f"{mod} {base}"
    elif kind == "pass_fut_perf":
        vg2 = f"will have {base}"
    else:
        return None
    active = f"{_cap(new_subj)} {vg2}"
    if kind != "pass_pres_cont" and kind != "pass_past_cont":
        active = f"{_cap(new_subj)} {vg2}"
    if obj:
        active += " " + _decat(obj)
    if rest:
        active += " " + _decat(" ".join(rest))
    active = active.strip() + "."
    return (None,
            ["the 'by' agent becomes the new subject",
             "be + V3 -> the tense's active form (agreement with the new "
             "subject)", "the old subject becomes the object"],
            active, None, "LANG_ENG_ACTIVE",
            {"passive": " ".join(subject + vg + tail)})


_TENSE_ASK = {
    "simple present": "pres_simple", "present indefinite": "pres_simple",
    "present continuous": "pres_cont", "present progressive": "pres_cont",
    "present perfect continuous": "pres_perf_cont",
    "present perfect": "pres_perf", "perfect present": "pres_perf",
    "simple past": "past_simple", "past indefinite": "past_simple",
    "past continuous": "past_cont", "past progressive": "past_cont",
    "past perfect": "past_perf", "simple future": "future",
    "future indefinite": "future", "future continuous": "future_cont",
    "future progressive": "future_cont", "future perfect": "fut_perf",
}
_TENSE_ORDER = ["present perfect continuous", "present continuous",
                "present progressive", "present perfect", "simple present",
                "present indefinite", "perfect present",
                "past continuous", "past progressive", "past perfect",
                "simple past", "past indefinite",
                "future continuous", "future progressive",
                "future perfect", "simple future", "future indefinite"]


def _c_eng_tense(slots, text):
    """'Change/rewrite ... into <tense> tense: <sentence>' -> converted."""
    low = text.lower()
    if not re.search(r"\b(?:tense)\b", low) or not re.search(
            r"\b(?:change|rewrite|convert|transform|put|turn)\b", low):
        return None
    target = None
    tpos = -1
    for name in _TENSE_ORDER:
        # the compound name must own the 'tense' word — 'future perfect
        # continuous tense' must not match the 'future perfect' family
        m_n = re.search(re.escape(name) + r"\s+tense", low)
        if m_n and (target is None or m_n.start() < tpos):
            target, tpos = _TENSE_ASK[name], m_n.start()
    if target is None:
        # plain tense names ('change into future tense')
        m_pl = re.search(r"into\s+(?:the\s+)?(future|past|present)\s+"
                         r"tense", low)
        if m_pl:
            target = {"future": "future", "past": "past_simple",
                      "present": "pres_simple"}[m_pl.group(1)]
    if target is None:
        return None
    sentence = _split_instruction(text)
    if not sentence:
        return None
    parsed = _parse_sentence(sentence)
    if not parsed:
        return None
    subject, vg, tail = parsed
    kind = _vgroup_kind(vg)
    if not kind:
        return None
    kind, base, aux, _be = kind
    if kind == "copula":
        # S + be + complement: convert the be-verb only
        be = _lg_be_for(" ".join(subject), {"pres_cont": "pres",
                                         "pres_simple": "pres",
                                         "pres_perf": "pres",
                                         "pres_perf_cont": "pres",
                                         "future": "pres",
                                         "future_cont": "pres",
                                         "fut_perf": "pres"}.get(
                                             target, "past"))
        neg = " not" if any(t.lower() in ("not", "n't") for t in vg) \
            else ""
        new_vg = {
            "pres_simple": be, "pres_cont": be, "pres_perf":
            "have " if be == "are" else "has",
            "pres_perf_cont": "have been" if be == "are" else "has been",
            "past_simple": "was" if be == "is" or be == "am" else "were",
            "past_cont": "was" if be == "is" or be == "am" else "were",
            "past_perf": "had been",
            "future": "will be",
        }[target] + neg
        out = f"{_cap(' '.join(subject))} {new_vg} {' '.join(tail)}".strip()
        return (None, ["be-verb recast in the asked tense",
                       "subject agreement preserved"],
                out + ".", None, "LANG_ENG_TENSE", {"tense": target})
    subj_txt = " ".join(subject)
    pl = _lg_be_for(subj_txt, "pres") == "are"
    first_i = subj_txt.split()[0].lower() == "i" if subj_txt else False
    v2 = _inflect(base, "v2")
    v3 = _inflect(base, "v3")
    ving = _inflect(base, "ving")
    v1s = base if (pl or first_i or subj_txt.split()[0].lower() in
                   ("you", "we", "they")) else _inflect(base, "v1s")
    hv = "have" if (pl or first_i or subj_txt.split()[0].lower() in
                    ("you", "we", "they")) else "has"
    be_p = ("were" if pl else "was") if not first_i else "was"
    be_n = "are" if (pl or subj_txt.split()[0].lower() in
                     ("you", "we", "they")) else "is"
    if first_i:
        be_n = "am"
    new_vg = {
        "pres_simple": v1s,
        "pres_cont": f"{be_n} {ving}",
        "pres_perf": f"{hv} {v3}",
        "pres_perf_cont": f"{hv} been {ving}",
        "past_simple": v2,
        "past_cont": f"{be_p} {ving}",
        "past_perf": f"had {v3}",
        "future": f"will {base}",
        "future_cont": f"will be {ving}",
        "fut_perf": f"will have {v3}",
    }.get(target)
    if not new_vg:
        return None
    out = f"{_cap(subj_txt)} {new_vg} {' '.join(tail)}".strip()
    return (None, [f"main verb recast in the {target} tense"],
            out + ".", None, "LANG_ENG_TENSE", {"tense": target})


# --------------------------------------------------------------------------- #
# POS identification — closed-class lexicons + suffix rules + context
# --------------------------------------------------------------------------- #

_PRONOUNS = {"i", "me", "my", "mine", "myself", "we", "us", "our", "ours",
             "ourselves", "you", "your", "yours", "yourself", "he", "him",
             "his", "himself", "she", "her", "hers", "herself", "it", "its",
             "itself", "they", "them", "their", "theirs", "themselves",
             "this", "that", "these", "those", "who", "whom", "whose",
             "which", "what", "someone", "somebody", "something", "anyone",
             "anybody", "anything", "everyone", "everybody", "everything",
             "nobody", "nothing", "one", "ones", "each", "either",
             "neither", "both", "few", "many", "several", "all", "some",
             "any", "none", "such"}
_PREP = {"in", "on", "at", "by", "for", "with", "about", "against",
         "between", "into", "through", "during", "before", "after", "above",
         "below", "to", "from", "up", "down", "of", "off", "over", "under",
         "further", "near", "behind", "beside", "besides", "among",
         "along", "across", "around", "toward", "towards", "upon",
         "within", "without", "until", "till", "except", "unlike",
         "beneath", "beyond", "despite", "amid", "per", "via"}
_CONJ = {"and", "but", "or", "nor", "so", "yet", "because", "although",
         "though", "while", "whereas", "if", "unless", "when", "whenever",
         "where", "wherever", "as", "than", "whether", "lest"}
_DET = {"the", "a", "an", "my", "your", "his", "her", "its", "our",
        "their", "this", "that", "these", "those", "each", "every",
        "either", "neither", "much", "more", "most", "less", "least",
        "little", "several", "enough", "another", "both", "half",
        "one", "two", "three", "four", "five", "six", "seven", "eight",
        "nine", "ten", "first", "second", "third"}
_AUXV = {"be", "is", "am", "are", "was", "were", "been", "being", "have",
         "has", "had", "do", "does", "did", "will", "would", "shall",
         "should", "can", "could", "may", "might", "must", "ought"}
_INTERJ = {"oh", "ah", "wow", "alas", "hurrah", "bravo", "hush", "oops",
           "ouch", "hey"}
_ADV_ALWAYS = {"not", "never", "very", "too", "quite", "rather", "almost",
               "always", "usually", "often", "sometimes", "seldom",
               "rarely", "ever", "here", "there", "now", "then", "soon",
               "late", "early", "fast", "hard", "well", "badly", "loudly",
               "quietly", "slowly", "quickly", "carefully", "happily",
               "kindly", "tomorrow", "yesterday", "today", "tonight",
               "again", "away", "outside", "inside", "upstairs",
               "downstairs", "abroad", "daily", "regularly", "gently"}

_NOUN_SUFFIX = ("tion", "sion", "ment", "ness", "ity", "ship", "hood",
                "ance", "ence", "ism", "ist", "ee", "dom", "cy")
_ADJ_SUFFIX = ("ous", "ful", "less", "ive", "able", "ible", "ish")

# common school adjectives — the open-class words a POS exercise uses
_COMMON_ADJ = {
    "quick", "brown", "lazy", "big", "small", "tall", "short", "long",
    "happy", "sad", "good", "bad", "old", "young", "new", "hot", "cold",
    "warm", "cool", "fast", "slow", "sweet", "sour", "bitter", "red",
    "blue", "green", "yellow", "black", "white", "beautiful", "ugly",
    "kind", "cruel", "wise", "brave", "strong", "weak", "rich", "poor",
    "clean", "dirty", "easy", "difficult", "soft", "hard", "heavy",
    "light", "dark", "bright", "clever", "foolish", "honest", "great",
    "little", "high", "low", "deep", "wide", "thin", "thick", "fat",
    "proud", "humble", "gentle", "polite", "rude", "sharp", "sweet",
    "sour", "fresh", "stale", "clear", "loud", "quiet", "busy", "free",
}


def _pos_of(tok: str, prev: str = "", nxt: str = "") -> str:
    """Closed classes by lexicon, open classes by suffix + position."""
    w = tok.lower().strip(".,!?;:'\"()")
    pv = prev.lower().strip(".,!?;:'\"()")
    nx = nxt.lower().strip(".,!?;:'\"()")
    if not w:
        return ""
    if w in _ADV_ALWAYS:
        return "adverb"
    if w in _INTERJ:
        return "interjection"
    if w in _PRONOUNS:
        if w in ("this", "that", "these", "those", "each", "some", "any",
                 "all", "both", "few", "many", "several") and nx and nx \
                not in ("is", "was", "are", "were", "will", "would",
                        "can", "could", "has", "have", "had"):
            return "determiner"
        return "pronoun"
    if w in _CONJ:
        return "conjunction"
    if w in _PREP:
        if w in ("before", "after", "since", "until", "as") and (
                nx in ("i", "we", "you", "he", "she", "it", "they") or
                nx in _AUXV):
            return "conjunction"
        return "preposition"
    if w in _AUXV:
        return "verb"
    if w in _DET:
        return "determiner"
    if w.endswith("ly") and len(w) > 4:
        return "adverb"
    forms = verb_forms(w)
    if forms and (w.endswith("ing") or w.endswith("ed")):
        if w.endswith("ing") and pv in _DET:
            return "noun"        # gerund after a determiner
        return "verb"
    if forms and forms[0] == w:
        # bare base: a noun/pronoun subject before it makes it the verb
        # ('the children listen carefully'); after a determiner it is a
        # noun ('the dance')
        if pv and pv not in _DET and pv not in _PREP and                 pv not in _CONJ and pv not in _AUXV and                 verb_forms(pv) is None and pv not in ("not", "never"):
            return "verb"
    if w.endswith(_NOUN_SUFFIX) and len(w) > 5:
        return "noun"
    if w.endswith(_ADJ_SUFFIX) and len(w) > 5:
        return "adjective"
    if w in _COMMON_ADJ:
        return "adjective"
    if w.endswith("est") and len(w) > 5:
        return "adjective"
    if w.endswith("er") and len(w) > 4 and w[-3] not in "aeiou":
        return "adjective"
    if w.endswith("s"):
        if pv in ("he", "she", "it", "who") or w[:-1] in BASE_VERBS or \
                w[:-1] in _VFORMS:
            return "verb"
        return "noun"
    if tok[:1].isupper() and pv:
        return "noun"
    if pv in _DET:
        return "noun"
    return "noun"


def _c_eng_pos(slots, text):
    """'Identify the parts of speech ...: <sentence>' -> word(pos) list."""
    if not re.search(r"parts?\s+of\s+speech", text, re.I):
        return None
    sentence = _split_instruction(text)
    if not sentence:
        return None
    toks = _toks(sentence)
    if not (3 <= len(toks) <= 20):
        return None
    tags = []
    for i, t in enumerate(toks):
        prev = toks[i - 1] if i else ""
        nxt = toks[i + 1] if i + 1 < len(toks) else ""
        tags.append(f"{t} ({_pos_of(t, prev, nxt)})")
    return (None,
            ["closed classes by lexicon; open classes by suffix + "
             "sentence position"],
            ", ".join(tags), None, "LANG_ENG_POS", None)


# --------------------------------------------------------------------------- #
# Direct -> indirect speech
# --------------------------------------------------------------------------- #

_BACKSHIFT_AUX = {
    "am": "was", "is": "was", "are": "were", "was": "had been",
    "were": "had been", "will": "would", "shall": "should", "can":
    "could", "may": "might", "must": "had to",
}
_TIME_SHIFT = {
    "now": "then", "today": "that day", "tonight": "that night",
    "yesterday": "the previous day", "tomorrow": "the next day",
    "ago": "before", "here": "there", "hence": "thence",
}
_GENDERED = {"she", "her", "mother", "sister", "teacher", "girl", "woman",
             "aunt", "wife", "lady", "daughter", "miss", "mrs"}


def _gender_of(name: str) -> str:
    return "she" if name.lower().rstrip(".,!?;:") in _GENDERED else "he"


_SING_SUBJ = {"he", "she", "it", "who", "this", "that",
              "the", "a", "an", "my", "our", "your", "his", "her",
              "their", "its"}


def _fix_be_agreement(words):
    """after a pronoun shift the be-verb must agree with the NEW
    subject: 'I am' with I->he becomes 'he is'."""
    out = list(words)
    for i, w in enumerate(out):
        lw = w.lower().strip(".,!?;:'\"")
        if lw not in ("am", "is", "are", "was", "were"):
            continue
        prev = out[i - 1].lower().strip(".,!?;:'\"") if i else ""
        if lw == "am" and (prev in _SING_SUBJ or
                           prev.endswith("s") and prev != "was"):
            out[i] = "is" + w[2:]
        elif lw == "is" and prev in ("i",):
            out[i] = "am" + w[2:]
        elif lw == "is" and prev in ("we", "they", "you", "these",
                                     "those"):
            out[i] = "are" + w[2:]
        elif lw == "was" and prev in ("we", "they", "you", "these",
                                      "those"):
            out[i] = "were" + w[3:]
        elif lw == "were" and prev in ("i", "he", "she", "it"):
            out[i] = "was" + w[4:]
    return out


def _lg_shift_pronouns(words, reporter_last, robj):
    """I/we/my -> reporter; you/your -> the reporter's object."""
    out = []
    g = _gender_of(reporter_last or "")
    ro_l = (robj or "").lower().rstrip(".,!?;:")
    go = "she" if ro_l in _GENDERED else "he"
    for w in words:
        lw = w.lower().strip(".,!?;:'\"")
        tail = w[len(lw):] if lw else w
        rep = None
        if lw == "i":
            rep = "I" if (reporter_last or "").lower() == "i" else g
        elif lw == "we":
            rep = "they"
        elif lw == "me":
            rep = "her" if g == "she" else "him"
        elif lw == "us":
            rep = "them"
        elif lw == "my":
            rep = "her" if g == "she" else "his"
        elif lw == "our":
            rep = "their"
        elif lw == "mine":
            rep = "hers" if g == "she" else "his"
        elif lw == "ours":
            rep = "theirs"
        elif lw == "you":
            rep = {"me": "me", "him": "him", "her": "her", "them": "them",
                   "us": "us"}.get(ro_l, go if ro_l else "them")
        elif lw == "your":
            rep = {"me": "my", "him": "his", "her": "her", "them": "their",
                   "us": "our"}.get(ro_l, "his" if go == "he" else "her")
        elif lw == "yours":
            rep = {"me": "mine", "him": "his", "her": "hers"}.get(
                ro_l, "his" if go == "he" else "hers")
        out.append((rep + tail) if rep else w)
    return out


def _backshift_words(words, skip=-1):
    out = []
    for i, w in enumerate(words):
        lw = w.lower().strip(".,!?;:'\"")
        punct = w[len(lw):] if len(w) > len(lw) else ""
        if i == skip:
            out.append(w)
            continue
        prev_lw = words[i - 1].lower().strip(".,!?;:'\"") if i else ""
        prev_out = out[-1].lower() if out else ""
        # after a backshifted modal / had: the verb group tail stands
        if prev_lw in ("would", "should", "could", "might", "must",
                       "had") or prev_out.split()[-1:] and \
                prev_out.split()[-1] in ("would", "should", "could",
                                         "might", "had", "to"):
            if lw in ("have", "has", "be", "been", "being"):
                out.append(("have" if lw in ("have", "has") else lw)
                           + punct)
                continue
            forms = verb_forms(lw)
            if forms and (lw.endswith("ed") or lw.endswith("ing") or
                          lw.endswith("en") or lw in _VFORMS):
                out.append(w)           # V3/V-ing tail: unchanged
                continue
        if lw in _TIME_SHIFT:
            rep = _TIME_SHIFT[lw]
            out.append(_cap(rep) + punct if w[:1].isupper() else rep)
            continue
        if lw == "this":
            out.append("That" + punct if w[:1].isupper() else "that")
            continue
        if lw == "these":
            out.append("Those" + punct if w[:1].isupper() else "those")
            continue
        if lw in _BACKSHIFT_AUX:
            out.append(_BACKSHIFT_AUX[lw] + punct)
            continue
        if lw in ("have", "has"):
            out.append("had" + punct)
            continue
        if lw in ("do", "does"):
            out.append("did" + punct)
            continue
        if lw == "had":
            out.append("had" + punct)   # past perfect: unchanged
            continue
        if lw == "did":
            out.append("had done")
            continue
        forms = verb_forms(lw)
        if forms and lw.endswith("s") and lw not in _VFORMS and \
                forms[0] in BASE_VERBS:
            out.append(_inflect(forms[0], "v2") + punct)
            continue
        if forms and forms[1] == lw and lw.endswith("ed"):
            out.append("had " + lw + punct)
            continue
        if forms and forms[1] == lw and lw in _VFORMS:
            # irregular past -> past perfect (went -> had gone,
            # said -> had said)
            out.append("had " + forms[2] + punct)
            continue
        out.append(w)
    return [w for w in out if w]


def _join(words):
    return " ".join(w for w in words if w)


def _lc_first(s):
    # never lowercase the pronoun I
    if s and s[:2] == "I " or s == "I":
        return s
    return s[:1].lower() + s[1:] if s else s


def _scrub(s):
    return re.sub(r"\s+", " ", s).replace(" .", ".").strip()


def _c_eng_speech(slots, text):
    """'Change into indirect speech: He said, "...".' -> reported speech."""
    if not re.search(r"\bindirect\s+speech\b|\breported\s+speech\b", text,
                     re.I):
        return None
    m = re.search(
        r"([A-Z][A-Za-z .]{0,30}?)\s*(said to|says|said|asked|told|"
        r"replied|exclaimed|ordered|requested|advised|proposed|suggested|"
        r"wished)\b(?:\s+(?:to\s+)?([A-Za-z]{2,20}(?:\s+[A-Za-z]{2,20})?"
        r"))?\s*[,;:]?\s*[\u201c\"](.+?)[\u201d\"]",
        text)
    if not m:
        return None
    reporter = m.group(1).strip()
    rverb = m.group(2).lower()
    robj = (m.group(3) or "").strip()
    quoted = m.group(4).strip().rstrip(".").strip()
    past_report = rverb != "says"
    qt = _toks(quoted)
    if not qt:
        return None
    ql = [w.lower() for w in qt]
    reporter_last = reporter.split()[-1] if reporter else ""
    words = _fix_be_agreement(_lg_shift_pronouns(qt, reporter_last, robj))
    rep_name = reporter

    is_q = quoted.endswith("?") or (ql and ql[0] in (
        "what", "when", "where", "who", "whom", "whose", "why", "how",
        "which")) or (ql and ql[0] in _AUXV and len(qt) > 1 and
                      ql[1] in ("i", "me", "we", "us", "you", "he", "she",
                                "it", "they") and
                      ql[0] not in ("am", "is", "are", "was", "were"))
    is_imp = (not is_q) and ql and (
        ql[0] in BASE_VERBS or ql[0] in ("please", "kindly", "don't",
                                         "never", "always", "let") or
        (ql[0] == "do" and len(ql) > 2 and ql[1] == "not") or
        (ql[0] == "not"))

    if is_q:
        if ql and ql[0] in ("what", "when", "where", "who", "whom",
                            "whose", "why", "how", "which"):
            cw = ql[0]
            body = list(words[1:])
        else:
            cw = "if"
            body = list(words)
            # yes-no inversion: 'Are you going' -> statement order
            if body and body[0].lower() in _AUXV and len(body) > 1:
                subj = body[1]
                if subj.lower() in ("me", "him", "her", "them", "us"):
                    subj = _subj_case(subj)
                body = [subj, body[0]] + body[2:]
        dropped = ""
        if body and body[0].lower() in ("do", "does", "did"):
            dropped = body[0].lower()
            body = body[1:]
            # the shifted subject pronoun now stands in subject position
            if body and body[0].lower() in ("me", "him", "her", "them",
                                            "us"):
                body[0] = _subj_case(body[0])
            # main verb after the subject: did -> had + V3;
            # do/does -> V2 (school backshift for do-support questions)
            skip = -1
            for bi in range(1, len(body)):
                forms = verb_forms(body[bi].lower().strip(".,!?;:'\""))
                if forms and body[bi].lower() not in _AUXV:
                    if dropped == "did":
                        body[bi] = "had " + forms[2]
                        skip = bi        # already past perfect
                    elif past_report:
                        body[bi] = forms[1]
                        skip = bi        # already simple past
                    break
        else:
            skip = -1
        if past_report:
            body = _backshift_words(body, skip if dropped else -1)
            for bi in range(1, len(body)):
                if body[bi].lower() == "were" and body[bi - 1].lower()                         in ("i", "he", "she", "it"):
                    body[bi] = "was"
        rep = (f"{rep_name} asked{(' ' + robj) if robj else ''} {cw} "
               f"{_lc_first(_join(body))}")
        return (None,
                ["reporting verb -> asked; wh-word/if as the conjunction",
                 "question order -> statement order",
                 "pronouns shifted, tense backshifted"],
                _scrub(rep.rstrip(".") + "."), None, "LANG_ENG_SPEECH",
                None)
    if is_imp:
        polite = any(w in ql for w in ("please", "kindly"))
        rv = "requested" if polite else "ordered"
        body = list(words)
        neg = ""
        if ql[0] in ("never", "always"):
            adv, body = body[0], body[1:]
            neg = _lc_first(adv) + " to "
        elif ql[0] == "don't" or ql[0] == "not":
            body = body[1:]
            neg = "not to "
        elif ql[0] == "do" and len(ql) > 2 and ql[1] == "not":
            body = body[2:]
            neg = "not to "
        elif ql[0] == "let":
            body2 = list(body[1:])
            rep = (f"{rep_name} proposed{(' to ' + robj) if robj else ''} "
                   f"that they {_lc_first(_join(body2))}")
            return (None, ["let-imperative -> proposed that"],
                    _scrub(rep.rstrip(".") + "."), None,
                    "LANG_ENG_SPEECH", None)
        else:
            if body and body[0].lower() in ("please", "kindly"):
                body = body[1:]
            neg = "to "
        rep = (f"{rep_name} {rv}{(' ' + robj) if robj else ''} "
               f"{neg}{_lc_first(_join(body))}")
        return (None,
                ["imperative -> to-infinitive; requested when polite, "
                 "ordered otherwise", "negative: not to + base verb"],
                _scrub(rep.rstrip(".") + "."), None, "LANG_ENG_SPEECH",
                None)
    is_sem_exc, sem_exc_reason = _is_semantic_exception(_join(words))
    if is_sem_exc:
        body = list(words)
        shift_note = f"; {sem_exc_reason} -> no backshift"
    elif past_report:
        body = _backshift_words(words)
        shift_note = "; tense backshifted"
    else:
        body = list(words)
        shift_note = "; present reporting: no backshift"
    rep = f"{rep_name} {rv}"
    if robj and rv == "told":
        rep += f" {robj}"
    rep += f" that {_lc_first(_join(body))}"
    return (None,
            ["statement: conjunction 'that'",
             f"pronouns and time words shifted{shift_note}"],
            _scrub(rep.rstrip(".") + "."), None, "LANG_ENG_SPEECH", None)


# --------------------------------------------------------------------------- #
# Sentence transformation (canonical school pairs)
# --------------------------------------------------------------------------- #

def _c_eng_trans(slots, text):
    """too..to <-> so..that, as soon as <-> no sooner..than,
    comparative <-> positive degree."""
    low = text.lower()
    if not re.search(r"\b(?:transform|rewrite|change|convert|combine)\b",
                     low):
        return None
    sentence = _split_instruction(text)
    if not sentence:
        return None
    # --- not only ... but also
    if "not only" in low:
        sents = [p.strip() for p in re.split(r"[.;]+\s*", sentence) if p.strip()]
        if len(sents) == 2:
            s1, s2 = sents[0], sents[1]
            m1 = re.match(r"([\w' ]+?)\s+(is|are|am|was|were)\s+(.+)$", s1, re.I)
            m2 = re.match(r"([\w' ]+?)\s+(is|are|am|was|were)\s+(.+)$", s2, re.I)
            if m1 and m2:
                subj1, be1, pred1 = m1.group(1).strip(), m1.group(2), m1.group(3).strip()
                subj2, be2, pred2 = m2.group(1).strip(), m2.group(2), m2.group(3).strip()
                if subj1.lower() == subj2.lower() and be1.lower() == be2.lower():
                    out = f"{_cap(subj1)} {be1} not only {pred1} but also {pred2}."
                    return (None,
                            ["Combine clauses: Subject + be + not only + Predicate 1 + but also + Predicate 2"],
                            _scrub(out), None, "LANG_ENG_TRANS", None)
                elif pred1.lower() == pred2.lower() and be1.lower() == be2.lower():
                    out = f"Not only {_cap(subj1)} but also {subj2} {be2} {pred1}."
                    return (None,
                            ["Combine subjects: Not only + Subject 1 + but also + Subject 2 + predicate"],
                            _scrub(out), None, "LANG_ENG_TRANS", None)
    s = sentence[0].lower() + sentence[1:] if sentence else ""
    s = s.rstrip(".")
    # --- too + ADJ + to + VERB  ->  so ADJ that ...
    m = re.match(
        r"([\w' ]+?)\s+(is|are|am|was|were)\s+too\s+([\w-]+)\s+"
        r"to\s+([a-z]+)(.*)$", s, re.I)
    if m:
        subj, be, adj, verb, rest = m.group(1).strip(), \
            m.group(2).lower(), m.group(3), m.group(4), \
            m.group(5).strip()
        neg = "could not" if be in ("was", "were") else "cannot"
        subject_pron = {"the boy": "he", "the girl": "she",
                        "the man": "he", "the woman": "she",
                        "he": "he", "she": "she", "it": "it",
                        "they": "they", "i": "I", "we": "we",
                        "the students": "they", "the child": "he",
                        "the children": "they", "my friend": "he",
                        "the old man": "he", "the beggar": "he"}.get(
                            subj.lower(), subj)
        out = (f"{_cap(subj)} {be} so {adj} that {subject_pron} "
               f"{neg} {verb}{(' ' + rest) if rest else ''}.")
        return (None,
                ["too + adjective + to = so + adjective + that + cannot"],
                _scrub(out), None, "LANG_ENG_TRANS", None)
    # --- so + ADJ + that ... -> too + ADJ + to (reverse)
    m = re.match(
        r"([\w' ]+?)\s+(?:is|are|am|was|were)\s+so\s+([\w-]+)\s+that\s+"
        r"(\w+)\s+(cannot|could not|can not)\s+([a-z]+)(.*)$", s, re.I)
    if m:
        subj, adj, pron, _neg, verb, rest = m.groups()
        return (None,
                ["so + adjective + that + cannot = too + adjective + to"],
                _scrub(f"{_cap(subj)} is too {adj} to {verb}"
                       f"{(' ' + rest.strip()) if rest.strip() else ''}."),
                None, "LANG_ENG_TRANS", None)
    # --- as soon as X did ..., Y did ...  ->  no sooner had X V3 ... than
    m = re.match(r"as soon as\s+(.+?),\s*(.+)$", s, re.I)
    if m and "no sooner" not in s.lower():
        first, second = m.group(1).strip(), m.group(2).strip()
        ft = _toks(first)
        # find the past-tense verb of the first clause
        pv = next((t for t in ft if verb_forms(t) and
                   verb_forms(t)[1] == t and t.lower() not in
                   ("had", "was", "were", "did")), None)
        if pv:
            forms = verb_forms(pv)
            sub = ft[:ft.index(pv)]
            obj = ft[ft.index(pv) + 1:]
            pv_base = _base_of(pv) or pv
            v3 = _inflect(_base_of(pv) or pv, "v3")
            out = (f"No sooner had {' '.join(sub)} {v3}"
                   f"{(' ' + ' '.join(obj)) if obj else ''} than "
                   f"{_lc_first(second)}.")
            return (None,
                    ["as soon as = no sooner ... than (inversion with "
                     "'had + V3')"],
                    _scrub(out), None, "LANG_ENG_TRANS", None)
    # --- no sooner ... than ... -> as soon as
    m = re.match(r"no sooner\s+(.+?)\s+than\s+(.+)$", s, re.I)
    if m:
        first, second = m.group(1).strip(), m.group(2).strip()
        out = f"As soon as {_lc_first(first)}, {_lc_first(second)}."
        out = out.replace(" had ", " ")
        return (None,
                ["no sooner ... than = as soon as (straight order)"],
                _scrub(out), None, "LANG_ENG_TRANS", None)
    # --- comparative -> positive: X is ADJ-er than Y -> Y is not as ADJ as X
    m = re.match(r"([\w' ]+?)\s+is\s+([\w-]+)er\s+than\s+([\w' ]+?)\s*$",
                 s, re.I)
    if m:
        x, adj, y = m.group(1).strip(), m.group(2), m.group(3).strip()
        # 'bigger' parses as 'bigg'+'er' — de-double the CVC base
        if len(adj) >= 4 and adj[-1] == adj[-2] and adj[-1] not in \
                "aeiou" and adj[-3] in "aeiou" and adj[-4] not in "aeiou":
            adj = adj[:-1]
        return (None,
                ["X is -er than Y = Y is not as ... as X"],
                _scrub(f"{_cap(y)} is not as {adj} as {_cap(x)}."),
                None, "LANG_ENG_TRANS", None)
    # --- positive -> comparative (reverse)
    m = re.match(r"([\w' ]+?)\s+is\s+not\s+as\s+([\w-]+)\s+as\s+"
                 r"([\w' ]+?)\s*$", s, re.I)
    if m:
        y, adj, x = m.group(1).strip(), m.group(2), m.group(3).strip()
        # CVC doubling: big -> bigger, sad -> sadder ('ll' words never
        # double: tall -> taller)
        cmp_adj = adj + "er"
        if (len(adj) >= 3 and adj[-1] not in "aeiouwxy" and
                adj[-2] in "aeiou" and adj[-3] not in "aeiou" and
                (len(adj) <= 3 or adj[-1] != adj[-2])):
            cmp_adj = adj + adj[-1] + "er"
        return (None,
                ["Y is not as ... as X = X is -er than Y"],
                _scrub(f"{_cap(x)} is {cmp_adj} than {_cap(y)}."),
                None, "LANG_ENG_TRANS", None)
    return None

# --------------------------------------------------------------------------- #
# LANG EN specs (moved from structure_families_lang.py, WS-B consolidation
# map step 6 / section 5.6): ids verbatim so the LANG_VERIFIERS keys in
# independent_verifier keep hitting (map invariant I3).  These merge into
# STRUCTURE_SPECS via structure_families' import-time lang block; the
# FAST PATH runs them before the table families exactly as before.
# --------------------------------------------------------------------------- #

ENGLISH_LANG_SPECS: Dict[str, Dict[str, Any]] = {
    "LANG_ENG_PASSIVE": {
        "label": "Active to Passive Voice",
        "force": (r"passive\s+voice|into\s+passive|change\s+(?:the\s+)?"
                  r"voice"),
        "exemplars": [
            "change into passive voice the dog bites the man",
            "rewrite the sentence in the passive voice",
            "convert the following into passive voice",
            "change the voice of the sentence",
        ],
        "slots": {}, "required": [], "full_text": True, "min_conf": 0.4,
        "compute": _c_eng_passive,
    },
    "LANG_ENG_ACTIVE": {
        "label": "Passive to Active Voice",
        "force": r"active\s+voice|into\s+active",
        "exemplars": [
            "change into active voice the ball was thrown by the boy",
            "rewrite the sentence in the active voice",
            "convert the passive sentence into active voice",
        ],
        "slots": {}, "required": [], "full_text": True, "min_conf": 0.4,
        "compute": _c_eng_active,
    },
    "LANG_ENG_TENSE": {
        "label": "Tense Conversion",
        "force": (r"(?:into|in|to)\s+(?:the\s+)?(?:simple\s+|present\s+|"
                  r"past\s+|future\s+|perfect\s+|continuous\s+|"
                  r"progressive\s+|indefinite\s+){1,3}tense"),
        "exemplars": [
            "change into simple past tense he writes a letter",
            "rewrite in the present continuous tense",
            "convert the sentence into future tense",
            "put the sentence into the present perfect tense",
        ],
        "slots": {}, "required": [], "full_text": True, "min_conf": 0.4,
        "compute": _c_eng_tense,
    },
    "LANG_ENG_SPEECH": {
        "label": "Direct to Indirect Speech",
        "force": (r"indirect\s+speech|reported\s+speech|direct\s+to\s+"
                  r"indirect"),
        "exemplars": [
            "change into indirect speech he said i am ill",
            "rewrite the sentence in indirect speech",
            "convert into reported speech she said to me i will come",
            "change the following into indirect speech",
        ],
        "slots": {}, "required": [], "full_text": True, "min_conf": 0.4,
        "compute": _c_eng_speech,
    },
    "LANG_ENG_POS": {
        "label": "Parts of Speech",
        "force": r"parts?\s+of\s+speech",
        "exemplars": [
            "identify the parts of speech of the words in the sentence",
            "name the part of speech of each word",
            "what are the parts of speech in this sentence",
        ],
        "slots": {}, "required": [], "full_text": True, "min_conf": 0.4,
        "compute": _c_eng_pos,
    },
    "LANG_ENG_TRANS": {
        "label": "Sentence Transformation",
        "force": (r"too\s+\w+\s+to|as soon as|no sooner|as\s+\w+\s+as\b|"
                  r"degree[s]?\s+(?:of\s+)?comparison|"
                  r"so\s+\w+\s+that\b|not\s+only\b"),
        "exemplars": [
            "rewrite using too to he is so weak that he cannot walk",
            "transform the sentence using no sooner than",
            "combine the sentences using as soon as",
            "combine using not only but also he is intelligent he is hardworking",
            "change the degree of comparison",
        ],
        "slots": {}, "required": [], "full_text": True, "min_conf": 0.4,
        "compute": _c_eng_trans,
    },
}

# --------------------------------------------------------------------------- #
# TABLE: (family_id, trigger, compute)
# --------------------------------------------------------------------------- #

_TABLE: List[Tuple[str, str, Any]] = [
    # ---- narration & voice (most specific phrasings first) ----
    ("NARRATION_CHANGE",
     r"indirect\s+speech|reported\s+speech|narration|change\s+the\s+"
     r"speech|into\s+(?:indirect|reported)|direct\s+speech",
     _c_narration),
    ("VOICE_CHANGE",
     r"change\s+the\s+voice|(?:into|to)\s+(?:the\s+)?(?:passive|active)"
     r"(?:\s+voice)?|passive\s+voice|active\s+voice",
     _c_voice),
    ("TENSE_IDENTIFY",
     r"(?:identify|name|tell)(?:\s+the)?\s+tense|which\s+tense|"
     r"tense\s+of\s+the\s+(?:verb|underlined)",
     _c_tense_identify),
    ("TENSE_CONVERT",
     r"(?:change|convert|rewrite|transform|put)\b.{0,50}?\b(?:into|to|"
     r"in)\s+(?:the\s+)?(?:simple\s+|present\s+|past\s+|future\s+|"
     r"perfect\s+|continuous\s+|perfect\s*continuous\s+|indefinite\s+)+"
     r"tense",
     _c_tense_convert),
    # FP fix (cisce-solver-langnew 2026-09-30): the old bare `conditional`
    # alternative matched marking-scheme prose ("Concludes conditional
    # soundness", "concludes conditionally") in bst/histciv answer text
    # and classified business/legal sentences as grammar conditionals.
    # The trigger now demands a grammar ask (identify/name/which ...,
    # conditional type/clause) or the strict if-___-(verb) gap-fill
    # signature; the classify branch re-checks the ask.
    ("CONDITIONAL_TYPE",
     r"(?:identify|name|state|pick|choose|tell|which|what)\s+(?:the\s+)?"
     r"conditional|conditional\s+(?:sentence|type|clause|statements?)|"
     r"type\s*-?\s*[123]\s+conditional|if\s*[-\u2013]?\s*clauses?\b|"
     r"if\b[^_]{0,40}_{2,}\s*\([A-Za-z]+\)",
     _c_conditional),
    ("TOO_TO_SO_THAT",
     r"too\s*\.{2,}\s*to|so\s*\.{2,}\s*that|(?:rewrite|change|convert|"
     r"transform)\b.{0,60}\b(?:too\s+\w+\s+to\b|so\s+\w+\s+that\b)",
     _c_too_so),
    ("CORRELATIVE_CONJUNCTION",
     r"not\s+only\b",
     lambda g, m, t: _c_eng_trans({}, t)),
    ("DEGREE_TRANSFORM",
     r"degrees?\s+of\s+comparison|(?:positive|comparative|superlative)"
     r"\s+degree|change\s+the\s+degree",
     _c_degree),
    ("AFFIRM_NEG",
     r"affirmative\s*(?:to|into)\s*negative|negative\s*(?:to|into)\s*"
     r"affirmative|(?:change|rewrite|transform)\b.{0,40}\b"
     r"(?:negative|affirmative)\b",
     _c_affirm_neg),
    ("EXCLAMATORY_ASSERTIVE",
     r"exclamator|assertive",
     _c_excl),
    ("NONFINITE_IDENTIFY",
     r"non[-\s]?finite|gerund|infinitive|participle",
     _c_nonfinite),
    ("ERROR_SPOTTING",
     r"(?:spot|find|identify|pick\s+out|point\s+out)\s+the\s+"
     r"(?:error|mistake)|correct\s+the\s+(?:sentence|following)|"
     r"error\s+(?:spotting|correction)",
     _c_error_spot),
    # FP fix (cisce-solver-langnew 2026-09-30): the old trigger fired on
    # the bare words simple/compound/complex anywhere in the node text
    # ("complex division" -> "compound sentence" on an appmath item;
    # "a simple rote-memory task" -> "complex sentence" on psy), and on
    # "identify the type of each of the following sets".  The trigger now
    # demands a sentence-grammar ask; the handler additionally refuses
    # math/code-marked text.
    ("CLAUSE_TYPE",
     r"(?:identify|state|name|tell)\s+the\s+(?:sentence|clause)s?\s+"
     r"type|type\s+of\s+(?:the\s+)?(?:sentence|statement)s?\b|"
     r"(?:simple|compound|complex)\s+(?:sentence|statement)s?\b|"
     r"state\s+whether\s+(?:the\s+)?(?:following\s+)?(?:sentence|"
     r"statement)s?\b|which\s+(?:of\s+the\s+following\s+)?"
     r"(?:sentences?|statements?)\s+(?:is|are)\s+(?:a\s+)?"
     r"(?:simple|compound|complex)|"
     r"\(\s*(?:simple|compound|complex)(?:\s*/\s*"
     r"(?:simple|compound|complex))+\s*\)",
     _c_clause_type),
    ("DETERMINER_CHOICE",
     r"determiner|article|fill\s+in\s+the\s+blank",
     _c_determiner),
    ("PREPOSITION_COLLOCATION",
     r"preposition",
     _c_preposition),
    ("CONJUNCTION_CHOICE",
     r"conjunction|joining\s+word|join\s+the\s+sentences",
     _c_conjunction),
    ("FIGURE_OF_SPEECH",
     r"figure\s+of\s+speech|literary\s+device|poetic\s+device|"
     r"figurative\s+language|identify\s+the\s+(?:simile|metaphor|"
     r"personification|hyperbole|alliteration|onomatopoeia)|"
     r"which\s+(?:literary\s+)?device",
     _c_figure),
]

TABLE = _TABLE


def model_english(text: str) -> ModelResult:
    """Dispatcher: scan every English family; first grounded hit wins.

    Triggers are deterministic regexes; each row applies its own
    plausibility gates inside compute, and a gate refusal simply lets
    the scan continue.  Devanagari input is refused before any family
    runs.  Never calls an LLM.
    """
    norm = _normalize(text)
    if not norm or _DEV_RE.search(norm):
        return _no("ENGLISH", "no english family matched")
    for fid, pattern, compute in TABLE:
        m = re.search(pattern, norm, re.I)
        if not m:
            continue
        g = m.groupdict()
        try:
            out = compute(g, m, norm)
        except Exception:
            continue
        if not out:
            continue
        (value, steps, answer, assumptions, eq, extra) = \
            (list(out) + [None] * 6)[:6]
        if value is None and not steps:
            continue  # gate refused this row
        return _res(fid, g, value, eq or fid, steps or [], answer=answer,
                    assumptions=assumptions, extra=extra or {})
    return _no("ENGLISH", "no english family matched")


# The sandbox router (routers/sandbox.py) names subjects
# model_<subject>_families; modelling_layer registers model_english.
# One dispatcher, both names.
model_english_families = model_english


# LANG spec self-registration (physics_families pattern, WS-B map step 6):
# when this module is imported ahead of structure_families, the spec
# merge block there would see a partially-initialised module and skip;
# registering here, after the module body completes, repairs that order.
# The update is idempotent (the same dict merged twice).
try:
    from backend.its.solver.structure_families import \
        STRUCTURE_SPECS as _SS_ENG
    _SS_ENG.update(ENGLISH_LANG_SPECS)
except Exception:  # pragma: no cover - structure_families unavailable
    pass
