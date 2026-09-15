"""tutor_voice.py -- the natural-voice layer over the verified tutor brain.

The deterministic tutor (backend/its/solver/tutor.py, /api/tutor-graph)
is verified content with a templated voice.  This module gives it a
natural one, driven entirely by the offline tutor-brain corpus
(D:/platform/tutor-brain/batch_*.json): ~80k authored
{pattern, intent, template_id, confidence} phrasings across ~4.7k
learning nodes, harvested from real study sessions.

What lives here:
  - a phrase-matcher over the whole brain (normalized substring plus
    token-overlap scoring, inverted-indexed by token for speed);
  - classify(text, node_id=None) -> {intent, template_id, confidence};
  - render(template_id, context) -> warm, student-friendly response
    text, with 3-4 phrasing variants per template chosen
    deterministically by hash(student_id + turn) so repeats vary;
  - Hinglish detection: when the student writes Hinglish (romanised
    Hindi-English mix) the voice mirrors it; plain English gets plain
    English.  Tone rules everywhere: encouraging, never sarcastic,
    never punitive -- mistakes are "slips to fix", not failures.

No LLM calls, no network: everything is local and deterministic.
"""

from __future__ import annotations

import glob
import json
import os
import re
import threading
import zlib
from typing import Dict, List, Optional, Tuple

# --------------------------------------------------------------------- #
# corpus location
# --------------------------------------------------------------------- #
_PLATFORM_ROOT = os.path.normpath(
    os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
BRAIN_DIR = os.path.join(_PLATFORM_ROOT, "tutor-brain")

# --------------------------------------------------------------------- #
# normalization
# --------------------------------------------------------------------- #
_TOKEN_RE = re.compile(r"[a-z0-9]+")
_DEVANAGARI_RE = re.compile(r"[\u0900-\u097F]")

# stopwords are excluded from the inverted index (they would match
# nearly every text and bloat the candidate set) but still count toward
# pattern coverage.
_STOPWORDS = frozenset("""
a an the and or but if then else of for to in on at by with from as is
are was were be been being am do does did doing have has had having will
would shall should can could may might must it its this that these those
i you he she we they them his her their our your my me us what which who
whom whose when where why how all any both each few more most other some
such no nor not only own same so than too very just about into over
under again further once here there s t d ll m o re ve y ain aren
""".split())

# romanised Hindi tokens that mark Hinglish writing (curated from the
# brain corpus itself -- "samjhao", "batao", "kaise" and friends appear
# in thousands of authored patterns).
_HINGLISH_TOKENS = frozenset("""
kya kyu kyun kyon kaise kese kaisa batao batado bata batana
samjhao samjha samajh samajhna nahi nahin nhi matlab
karo karna karte karu kru karein krt kar hoga hogi hota hoti hote
hai hain tha thi ho yaar acha achha accha thoda zara sahi galat pata
jaldi bhai dost bhool galti dekho suno chalo lagta lagti lagte
samjhta samjhti wala wali kaam raha rahi rahe
neeche upar wapas pakka koshish maaro maro bolo bilkul ekdum shabaash
wah samajh_aa
""".split())

# Hinglish function words: everywhere in the corpus, so on their own
# they must never justify a fuzzy pattern match (only phrase hits may
# ride on them).
_WEAK_TOKENS = _HINGLISH_TOKENS | frozenset("""
mera meri mere tum tumhara tumhari aap apna apni ye yeh wo woh is mein
se par bhi ek do teen sab kuch aur main mujhe abhi ab toh to na lekin
fir phir hi koi kaesi waisa yaha waha
""".split())


def _normalize(text: str) -> str:
    """Lowercase, keep alphanumerics, single-space.  'Moment = F x d?'
    -> 'moment f x d'."""
    return " ".join(_TOKEN_RE.findall(str(text or "").lower()))


def _informative_tokens(norm: str) -> List[str]:
    return [t for t in norm.split()
            if len(t) >= 3 and t not in _STOPWORDS]


def detect_hinglish(text: str) -> bool:
    """True when the student's phrasing is Hinglish (or Devanagari).

    Mirroring rule: Hinglish in -> Hinglish-flavored voice out; plain
    English in -> plain English out."""
    s = str(text or "").lower()
    if _DEVANAGARI_RE.search(s):
        return True
    for tok in _TOKEN_RE.findall(s):
        if tok in _HINGLISH_TOKENS:
            return True
    return False


# --------------------------------------------------------------------- #
# the phrase-matcher
# --------------------------------------------------------------------- #
class _Pattern:
    __slots__ = ("norm", "raw", "token_set", "intent", "template_id",
                 "confidence", "node")

    def __init__(self, norm, raw, token_set, intent, template_id,
                 confidence, node):
        self.norm = norm
        self.raw = raw
        self.token_set = token_set      # every token (coverage counting)
        self.intent = intent
        self.template_id = template_id
        self.confidence = confidence
        self.node = node                # node index (int)


_MIN_COVERAGE = 0.5      # token-overlap floor for multi-token patterns
_NODE_BOOST = 1.25       # patterns authored for THIS node outrank the world
_PHRASE_BONUS = 1.15     # exact normalized substring beats fuzzy overlap
_DEFAULT = {"intent": "question", "template_id": "eli5_simple",
            "confidence": 0.0}


class TutorVoice:
    """Loads every tutor-brain batch file into an indexed phrase-matcher
    and renders the tutor's voice from it.  Malformed files, nodes and
    pattern lines are tolerated: each is skipped and counted, never
    fatal."""

    def __init__(self, brain_dir: Optional[str] = None):
        self.brain_dir = brain_dir or BRAIN_DIR
        self._patterns: List[_Pattern] = []
        self._nodes: List[str] = []
        self._node_index: Dict[str, int] = {}
        self._by_node: Dict[int, List[int]] = {}
        self._index: Dict[str, List[int]] = {}   # token -> pattern idx
        self.files_loaded = 0
        self.files_skipped = 0
        self.nodes_loaded = 0
        self.patterns_loaded = 0
        self.malformed_skipped = 0
        self._load(self.brain_dir)

    # ---------------- loading ---------------- #
    def _load(self, brain_dir: str) -> None:
        files = sorted(glob.glob(os.path.join(brain_dir, "batch_*.json")))
        if not files:
            return
        for path in files:
            try:
                with open(path, encoding="utf-8") as fh:
                    data = json.load(fh)
            except Exception:
                self.files_skipped += 1
                continue
            if not isinstance(data, list):
                self.files_skipped += 1
                continue
            self.files_loaded += 1
            for node in data:
                try:
                    self._load_node(node)
                except Exception:
                    self.malformed_skipped += 1

    def _load_node(self, node) -> None:
        if not isinstance(node, dict):
            self.malformed_skipped += 1
            return
        node_id = str(node.get("node_id") or "").strip()
        raw_pats = node.get("classification_patterns")
        if not node_id or not isinstance(raw_pats, list):
            self.malformed_skipped += 1
            return
        ni = self._node_index.get(node_id)
        if ni is None:
            ni = len(self._nodes)
            self._nodes.append(node_id)
            self._node_index[node_id] = ni
            self._by_node[ni] = []
        self.nodes_loaded += 1
        for cp in raw_pats:
            try:
                if not isinstance(cp, dict):
                    raise ValueError("pattern line not an object")
                raw = str(cp.get("pattern") or "").strip()
                if not raw:
                    raise ValueError("empty pattern")
                norm = _normalize(raw)
                if not norm:
                    raise ValueError("pattern normalizes to nothing")
                toks = norm.split()
                conf = float(cp.get("confidence") or 0.0)
                p = _Pattern(
                    norm=norm, raw=raw, token_set=frozenset(toks),
                    intent=str(cp.get("intent") or "question").strip(),
                    template_id=str(
                        cp.get("template_id") or "eli5_simple").strip(),
                    confidence=max(0.0, min(conf, 1.0)), node=ni)
                idx = len(self._patterns)
                self._patterns.append(p)
                self._by_node[ni].append(idx)
                for t in _informative_tokens(norm):
                    self._index.setdefault(t, []).append(idx)
                self.patterns_loaded += 1
            except Exception:
                self.malformed_skipped += 1

    # ---------------- classification ---------------- #
    def classify(self, text: str,
                 node_id: Optional[str] = None) -> dict:
        """Match free text against the brain.

        Returns {intent, template_id, confidence, node_id?,
        matched_pattern?}.  node_id (a learning-node id) boosts patterns
        authored for that node; without it the global brain decides.
        Deterministic: equal scores break by specificity, then
        confidence, then alphabetical (intent, template_id)."""
        norm = _normalize(text)
        if not norm:
            return dict(_DEFAULT)
        toks = set(norm.split())
        strong = {t for t in toks
                  if len(t) >= 3 and t not in _STOPWORDS
                  and t not in _WEAK_TOKENS}
        cand = set()
        for t in toks:
            hits = self._index.get(t)
            if hits:
                cand.update(hits)
        node_boost_ids = frozenset()
        if node_id:
            ni = self._node_index.get(str(node_id))
            if ni is not None:
                cand.update(self._by_node[ni])
                node_boost_ids = frozenset(self._by_node[ni])

        best = None
        best_key = None
        for i in cand:
            p = self._patterns[i]
            if p.norm in norm:
                score = p.confidence * _PHRASE_BONUS
            else:
                overlap = len(p.token_set & toks)
                if not overlap:
                    continue
                # a fuzzy match needs at least one content-word hit;
                # generic filler ("aa raha hai") alone matches nothing
                # (node-authored patterns are exempt: the asker named
                # the node, so weaker evidence is trustworthy)
                if i not in node_boost_ids and not (p.token_set & strong):
                    continue
                coverage = overlap / max(1, len(p.token_set))
                if coverage < _MIN_COVERAGE:
                    continue
                score = p.confidence * coverage
            if i in node_boost_ids:
                score *= _NODE_BOOST
            if score <= 0:
                continue
            # deterministic tie-break: score, specificity, confidence,
            # alphabetical, then corpus order (via -i)
            key = (round(score, 6), len(p.token_set), p.confidence,
                   p.intent, p.template_id, -i)
            if best is None or key > best_key:
                best, best_key = p, key
        if best is None:
            return dict(_DEFAULT)
        return {
            "intent": best.intent,
            "template_id": best.template_id,
            "confidence": round(min(best.confidence, 0.99), 3),
            "node_id": self._nodes[best.node],
            "matched_pattern": best.raw,
        }

    # ---------------- rendering ---------------- #
    def render(self, template_id: str, context: Optional[dict] = None) -> str:
        """Warm, student-friendly response text for a template.

        3-4 phrasing variants per template; the variant is chosen by
        hash(student_id + turn + template_id) so the same student sees
        variety across turns while everything stays deterministic
        (stable crc32, not Python's per-process randomized hash).
        Hinglish in, Hinglish out."""
        ctx = dict(context or {})
        hin = detect_hinglish(ctx.get("student_text") or "")
        variants = self._variants(template_id, hin)
        seed = "{0}|{1}|{2}".format(
            str(ctx.get("student_id") or "guest"),
            int(ctx.get("turn") or 0), template_id)
        variant = variants[zlib.crc32(seed.encode("utf-8")) % len(variants)]
        return _fill(variant, ctx, hin)

    def _variants(self, template_id: str, hin: bool) -> List[str]:
        spec = _TEMPLATES.get(template_id)
        if spec is None:                      # unknown template: warm default
            spec = _TEMPLATES["eli5_simple"]
        pool = spec["hi"] if (hin and spec.get("hi")) else spec["en"]
        return pool


class _SafeDict(dict):
    def __missing__(self, key):  # unknown placeholder -> drop silently
        return ""


def _fill(variant: str, ctx: dict, hin: bool) -> str:
    name_raw = str(ctx.get("name") or ctx.get("student_name") or "").strip()
    first = name_raw.split()[0] if name_raw else ""
    # {name}: direct address, always reads as a word ("No stress, {name}.")
    name = first or ("dost" if hin else "friend")
    # {nm}: word-adjacent name, empty when unknown ("Spot on{nm}!")
    nm = (", " + first) if first else ""
    slip = str(ctx.get("slip") or "").strip()
    fields = _SafeDict(
        name=name,
        nm=nm,
        concept_title=str(ctx.get("concept_title") or ctx.get("topic")
                          or "this idea").strip() or "this idea",
        topic=str(ctx.get("concept_title") or ctx.get("topic")
                  or "this idea").strip() or "this idea",
        question=str(ctx.get("question") or "").strip(),
        expected=str(ctx.get("expected") or "").strip(),
        got=str(ctx.get("got") or "").strip(),
        first_step=str(ctx.get("first_step") or "").strip()
        or _first_step(ctx),
        next_step=str(ctx.get("next_step") or "").strip(),
        slip=slip,
        hint=str(ctx.get("hint") or "").strip(),
    )
    out = variant.format_map(fields)
    out = re.sub(r"[ \t]{2,}", " ", out)
    out = re.sub(r"\s+([,.!?;:])", r"\1", out)
    return _sentence_case(out.strip())


def _sentence_case(text: str) -> str:
    """Capitalize sentence starts (after assembly, fragments like the
    slip diagnosis may land mid-string after a period)."""
    out = re.sub(r"(^|[.!?]\s+)([a-z])",
                 lambda m: m.group(1) + m.group(2).upper(), text)
    return out


def _first_step(ctx: dict) -> str:
    """First authored step of the worked solution, for slip framing."""
    steps = ctx.get("steps")
    text = ""
    if isinstance(steps, list) and steps:
        text = str(steps[0])
    if not text:
        text = str(ctx.get("worked_solution") or "")
    text = text.strip()
    if not text:
        return ""
    return re.split(r"(?<=[.!?])\s+", text, maxsplit=1)[0].strip()


# --------------------------------------------------------------------- #
# voice variants (the soul of the layer)
# --------------------------------------------------------------------- #
# {name}  -> direct address; falls back to "friend"/"dost"
# {nm}    -> ", Firstname" or "" (word-adjacent mentions)
# every other placeholder is optional and drops cleanly when absent.
_TEMPLATES: Dict[str, dict] = {
    "celebrate_and_advance": {
        "en": [
            "{name}, that's correct! {concept_title} is clicking now. "
            "{next_step}",
            "Spot on{nm} -- exactly the right answer for "
            "{concept_title}. Keep this streak going!",
            "Clean work{nm}! You nailed {concept_title}. Ready for "
            "the next one?",
            "Yes{nm}! {concept_title} just got easier for you. "
            "On to the next challenge.",
        ],
        "hi": [
            "{name}, bilkul sahi! {concept_title} samajh aa gaya. "
            "Chalo aage badhein.",
            "Shabaash{nm}! Perfect answer. Next question ke liye "
            "ready ho?",
            "Ekdum correct{nm}! {concept_title} pakka ho gaya -- "
            "agla aasaan lagega.",
            "Wah{nm}, sahi jawab! Isi confidence ke saath aage chalo.",
        ],
    },
    "misconception_correction": {
        "en": [
            "Close, {name} -- but not quite. {slip} Here's the method "
            "again: {first_step} One more try?",
            "No stress, {name}. {slip} Re-walk the steps once "
            "(they start: {first_step}) and try again -- you're one "
            "fix away.",
            "Good attempt{nm} -- the gap is small. {slip} The steps "
            "below show exactly where to look. Give it another go.",
            "Almost there, {name}. {slip} That's how the method runs: "
            "{first_step} Another attempt, slower this time?",
        ],
        "hi": [
            "Koi baat nahi{nm} -- bas ek chhota slip hua. {slip} "
            "Steps dobara dekho: {first_step}",
            "Pass pass the{nm}! {slip} Ek step re-check karo, phir "
            "try karo -- ho jayega.",
            "Good try{nm}. {slip} Neeche ke steps follow karke ek "
            "aur attempt maaro.",
            "Almost{nm}! {slip} Method ka pehla step ye hai: "
            "{first_step} Ab dobara koshish karo.",
        ],
    },
    "step_by_step_walk": {
        "en": [
            "Let's walk it step by step, {name}. Start here: "
            "{first_step} Then follow along.",
            "One step at a time, {name}: {first_step} Take each line "
            "and ask 'why?' as you go.",
            "{concept_title} becomes easy in steps, {name}. First: "
            "{first_step} The rest follows.",
            "Here's the path, {name}: {first_step} Move through the "
            "steps slowly and it will click.",
        ],
        "hi": [
            "Step by step chalte hain{nm}. Pehla step: {first_step}",
            "Ek-ek karke{nm}: {first_step} Aage ke steps neeche hain.",
            "{concept_title} steps mein aasaan hai{nm}. Shuru karo: "
            "{first_step}",
            "Dekho{nm}, pehle ye karo: {first_step} Phir baaki steps "
            "follow karo.",
        ],
    },
    "eli5_simple": {
        "en": [
            "In plain words, {name}: {first_step} Simple as that.",
            "Let me strip it down for you, {name}: {first_step} "
            "That's the whole idea in one line.",
            "No jargon, {name}. The core of {concept_title}: "
            "{first_step}",
            "Think of it this way, {name}: {first_step} Everything "
            "else hangs off that.",
        ],
        "hi": [
            "Aasaan bhasha mein{nm}: {first_step}",
            "Seedhi baat{nm} -- {first_step} Bas, ye hi idea hai.",
            "{concept_title} ka simple matlab{nm}: {first_step}",
            "Aise samjho{nm}: {first_step} Baaki sab isi pe tika hai.",
        ],
    },
    "hint_progressive": {
        "en": [
            "Just a nudge first, {name}: {hint} Try it -- bigger "
            "hints are waiting if you need them.",
            "Small hint, {name}: {hint} See if that unlocks it.",
            "Level-one hint for you, {name}: {hint} I'll go deeper "
            "only if you ask.",
            "Hint one, {name}: {hint} Give it a shot before I reveal "
            "more.",
        ],
        "hi": [
            "Pehla hint{nm}: {hint} Ab khud try karo.",
            "Thoda sa hint{nm} -- {hint} Aur chahiye toh bolo.",
            "Shuruati hint{nm}: {hint} Isse ho jana chahiye.",
            "Ye lo{nm}: {hint} Pehle khud koshish, phir next hint.",
        ],
    },
    "emotional_support": {
        "en": [
            "Totally okay, {name} -- everyone hits a wall sometimes. "
            "Read the steps slowly, then try the next one. I'm here.",
            "No worries{nm}. This one's tricky for everyone at first. "
            "Study the worked steps -- you've got this.",
            "Deep breath, {name} -- tough questions are exactly how "
            "mastery grows. The steps below will get you there.",
            "It's fine to park one, {name}. Go through the solution "
            "at your pace; we'll come back stronger.",
        ],
        "hi": [
            "Koi baat nahi{nm}, sabke saath hota hai. Steps aaram se "
            "padho, phir next try karna.",
            "Tension mat lo{nm} -- ye thoda tricky hai. Neeche "
            "solution hai, ek baar shanti se dekho.",
            "{name}, tough sawaal hi seekhate hain. Steps padho, "
            "confidence wapas aa jayega.",
            "Chalo isko solution se samajh lete hain{nm} -- agla "
            "tumse hoga, pakka.",
        ],
    },
    "socratic_question": {
        "en": [
            "Before I answer, {name} -- what do you think is going on "
            "here? {question}",
            "Let me turn it around gently, {name}: what would you "
            "predict? {question}",
            "Your turn to reason, {name}: {question} What's your "
            "first instinct?",
            "Think aloud, {name}: {question} I'll guide from your "
            "answer.",
        ],
        "hi": [
            "Pehle tum batao{nm} -- {question} Kya lagta hai?",
            "Socho{nm}: {question} Apna guess batao, phir saath "
            "solve karenge.",
            "Tumhari baari{nm} -- {question} Jo samajh aaye wahi "
            "bolo.",
            "Ek sawaal tumse{nm}: {question} Jo lage wahi kaho.",
        ],
    },
    "real_world_application": {
        "en": [
            "You see this one daily, {name}: {concept_title} shows up "
            "all around you. {first_step}",
            "Where does {concept_title} live in real life, {name}? "
            "Look around -- {first_step}",
            "{concept_title} isn't just exam stuff, {name}. "
            "{first_step} That's it working in the real world.",
            "Real talk, {name}: engineers use {concept_title} every "
            "day. {first_step}",
        ],
        "hi": [
            "{name}, ye concept roz ki zindagi mein dikhta hai -- "
            "{first_step}",
            "{concept_title} asli duniya mein aise kaam karta "
            "hai{nm}: {first_step}",
            "Sirf exam ke liye nahi{nm} -- {first_step} Yahi real "
            "world use hai.",
            "Dekho{nm}, {concept_title} ghar-gali mein bhi hai: "
            "{first_step}",
        ],
    },
    "prerequisite_review": {
        "en": [
            "Quick step back first, {name}: {first_step} Strong base, "
            "strong build.",
            "Before the main idea, {name}, let's refresh: "
            "{first_step} Ten seconds well spent.",
            "This rests on an earlier idea, {name}: {first_step} "
            "Re-visit it and the rest is easy.",
            "Foundation check, {name}: {first_step} Once that's "
            "solid, {concept_title} follows.",
        ],
        "hi": [
            "Pehle ek kadam peeche{nm}: {first_step} Base strong, "
            "toh sab aasaan.",
            "Isse pehle ye refresh karo{nm}: {first_step}",
            "Ye purane concept pe tika hai{nm}: {first_step} Usse "
            "dekh lo, phir easy.",
            "Base check{nm}: {first_step} Iske baad {concept_title} "
            "samajh aayega.",
        ],
    },
    "troubleshooting_guide": {
        "en": [
            "Let's debug it, {name}. Usual suspects, in order: "
            "{first_step} Check each one.",
            "Something's off in the method, {name}. Walk this "
            "checklist: {first_step}",
            "Classic fixable issue, {name}: {first_step} Verify each "
            "step and it clears.",
            "Don't guess -- inspect, {name}. {first_step} The slip "
            "will surface.",
        ],
        "hi": [
            "Debug karte hain{nm}: {first_step} Ek-ek check karo.",
            "Method mein kahin slip hai{nm} -- ye checklist dekho: "
            "{first_step}",
            "Ye fixable galti hai{nm}: {first_step} Mil jayegi.",
            "Guess mat karo{nm}, check karo: {first_step}",
        ],
    },
    "diagnostic_quiz": {
        "en": [
            "Quick check, {name} -- answer without pressure; this "
            "just tells me what to serve next. {question}",
            "Mini-quiz time, {name}: {question} No marks, just "
            "signal.",
            "Two-minute probe, {name}: {question} Your answer shapes "
            "the next step.",
            "Let's measure where we are, {name}: {question}",
        ],
        "hi": [
            "Chhota check{nm}: {question} Bina pressure ke, jo aata "
            "hai bolo.",
            "Mini quiz{nm} -- {question} Marks nahi, bas jaankari.",
            "Dekhte hain kahan ho{nm}: {question}",
            "Ek sawaal, sirf check ke liye{nm}: {question}",
        ],
    },
    "correct_answer": {
        "en": [
            "Correct -- {expected} is right, {name}. Well reasoned.",
            "That's it, {name}: {expected}. Verified and done.",
            "Right answer, {name}: {expected}. Onward.",
            "{expected} -- exactly correct, {name}.",
        ],
        "hi": [
            "Sahi jawab{nm} -- {expected} bilkul theek.",
            "Ho gaya{nm}: {expected} perfect.",
            "Correct{nm}! {expected} hi hai.",
            "{expected} -- ekdum sahi{nm}.",
        ],
    },
    "visual_analogy": {
        "en": [
            "Picture this, {name}: {first_step} Hold that image and "
            "the formula writes itself.",
            "A quick mental movie, {name}: {first_step} See it move "
            "in your head.",
            "Imagine it physically, {name}: {first_step} That "
            "picture is the concept.",
            "Analogy time, {name}: {first_step} Once you can see it, "
            "you can solve it.",
        ],
        "hi": [
            "Mann mein picture banao{nm}: {first_step} Wahi concept "
            "hai.",
            "Aise socho{nm}: {first_step} Dikh gaya toh ban gaya.",
            "Ek analogy suno{nm}: {first_step} Isse yaad rahega.",
            "Soch ke dekho{nm} -- {first_step} Formula khud likha "
            "aayega.",
        ],
    },
    "validate_and_reframe": {
        "en": [
            "I couldn't grade that with certainty, {name} -- so "
            "here's the full method instead: {first_step} Compare and "
            "see how close you were.",
            "Your answer needs a human eye, {name}. Meanwhile, walk "
            "these verified steps: {first_step}",
            "No marks lost, {name} -- I just couldn't read the final "
            "value cleanly. Re-check your working against these steps.",
            "That's an unusual way to write it, {name} -- the checker "
            "couldn't parse it. Self-check against the solution below.",
        ],
        "hi": [
            "{name}, main isse pakke se grade nahi kar paya -- neeche "
            "steps hain, khud compare kar lo.",
            "Koi nuksaan nahi{nm} -- bas answer clear nahi tha. Steps "
            "se milaan kar lo.",
            "{name}, likha hua thoda ambiguous tha. Verified steps "
            "neeche hain, dekh ke batao.",
            "No worry{nm}, answer parse nahi hua. Steps padh ke khud "
            "check karo.",
        ],
    },
    # -------- serve framings (intent-appropriate question intro) ------ #
    "serve_concept_check": {
        "en": [
            "{name}, quick concept check on {topic}: {question}",
            "Let's see {topic} in action, {name}: {question}",
            "Ready, {name}? Here's a {topic} question: {question}",
            "Next up, {name} -- {topic}: {question}",
        ],
        "hi": [
            "{name}, {topic} ka ek sawaal: {question}",
            "Chalo {topic} try karte hain{nm}: {question}",
            "Agla sawaal{nm} -- {topic}: {question}",
            "Ye dekho{nm}: {question}",
        ],
    },
    "serve_walkthrough": {
        "en": [
            "Walk this one with me, {name}: {question}",
            "Time to build the method, {name}: {question}",
            "Let's do it step by step, {name}: {question}",
            "Worked-practice mode, {name}: {question}",
        ],
        "hi": [
            "Saath mein step by step karte hain{nm}: {question}",
            "Method banate hain{nm}: {question}",
            "Chalo ek-ek karke{nm}: {question}",
            "Practice time{nm}: {question}",
        ],
    },
    "serve_challenge": {
        "en": [
            "Challenge time, {name}: {question}",
            "Think you've got this, {name}? Prove it: {question}",
            "A slightly spicier one, {name}: {question}",
            "Quiz-mode, {name}: {question}",
        ],
        "hi": [
            "Challenge le{nm}: {question}",
            "Lagta hai aa gaya samajh{nm}? Prove karo: {question}",
            "Thoda teekha sawaal{nm}: {question}",
            "Quiz mode on{nm}: {question}",
        ],
    },
    "serve_with_ladder": {
        "en": [
            "Try it first, {name} -- three hints are lined up if you "
            "need them: {question}",
            "Your move, {name}. Hints on demand: {question}",
            "No pressure, {name} -- attempt it, and ask for a hint "
            "any time: {question}",
            "Give it a shot before peeking, {name}: {question}",
        ],
        "hi": [
            "Pehle khud try karo{nm} -- hint chahiye toh mil jayega: "
            "{question}",
            "Tumhari baari{nm}. Hint bhi ready hai: {question}",
            "Dabao mat{nm}, try karo -- hint yahin hai: {question}",
            "Ek koshish pehle{nm}: {question}",
        ],
    },
    # prerequisite retreat (two wrongs -> serve the prerequisite);
    # every variant keeps the signature Hinglish line verbatim so the
    # retreat always sounds like the same gentle voice
    "serve_retreat": {
        "en": [
            "Pehle wahi concept - 2 minute. This one rests on an "
            "earlier idea, {name}: {question}",
            "No stress, {name} -- pehle wahi concept - 2 minute: "
            "{question}",
            "Two minutes back to the base, {name}. Pehle wahi concept "
            "- 2 minute: {question}",
            "Pehle wahi concept - 2 minute, {name} -- strong base, and "
            "the harder one follows: {question}",
        ],
        "hi": [
            "Koi baat nahi{nm} -- pehle wahi concept - 2 minute: "
            "{question}",
            "Pehle wahi concept - 2 minute{nm}. Base strong, phir "
            "wapas is sawaal pe: {question}",
            "Thoda peeche chalte hain{nm} -- pehle wahi concept - "
            "2 minute: {question}",
            "Pehle wahi concept - 2 minute, phir asli sawaal{nm}: "
            "{question}",
        ],
    },
}

# classified template_id -> serve framing key
_SERVE_FRAMING = {
    "eli5_simple": "serve_concept_check",
    "real_world_application": "serve_concept_check",
    "visual_analogy": "serve_concept_check",
    "prerequisite_review": "serve_concept_check",
    "step_by_step_walk": "serve_walkthrough",
    "troubleshooting_guide": "serve_walkthrough",
    "diagnostic_quiz": "serve_challenge",
    "hint_progressive": "serve_with_ladder",
    "socratic_question": "serve_with_ladder",
}

# outcome -> template used for submit voice
_OUTCOME_TEMPLATE = {
    "correct": "celebrate_and_advance",
    "wrong": "misconception_correction",
    "ungraded": "validate_and_reframe",
    "self_check": "step_by_step_walk",
    "lets_learn": "emotional_support",
    # micro-win checks: celebrate the small win loudly, and on a miss
    # stay warm -- a miss never reads as a failure
    "micro_win": "celebrate_and_advance",
    "micro_win_miss": "emotional_support",
}


# --------------------------------------------------------------------- #
# deterministic slip diagnosis (what likely went wrong, said kindly)
# --------------------------------------------------------------------- #
_NUM_RE = re.compile(r"-?\d[\d,]*(?:\.\d+)?")


def _first_number(text) -> Optional[float]:
    m = _NUM_RE.search(str(text or ""))
    if not m:
        return None
    try:
        return float(m.group(0).replace(",", ""))
    except ValueError:
        return None


def _approx(a: float, b: float, tol: float = 0.02) -> bool:
    return abs(a - b) <= tol * max(abs(a), abs(b), 1e-9)


def diagnose_slip(expected: str, got: str) -> str:
    """A short, non-punitive sentence naming the likely slip, from the
    verified answer vs. what the student wrote.  Deterministic."""
    e, g = _first_number(expected), _first_number(got)
    if not str(got or "").strip():
        return ("the final answer never landed -- re-read the question "
                "once and write what you can")
    if e is None or g is None or e == 0:
        return ("your final value drifted from the verified one -- "
                "worth re-walking the last step of the method")
    if _approx(g, -e):
        cause = ("the size is right but the sign flipped -- check "
                 "directions and the plus/minus convention")
    elif _approx(g, e * 1000) or _approx(g, e / 1000):
        cause = ("a unit-conversion slip (a x1000-style factor) -- "
                 "check km-to-m, kg-to-g type steps")
    elif _approx(g, e * 100) or _approx(g, e / 100):
        cause = ("a unit-conversion slip (a x100-style factor) -- "
                 "check cm-to-m type steps")
    elif _approx(g, e * 60) or _approx(g, e / 60):
        cause = ("a time-unit slip (minutes vs hours, seconds vs "
                 "minutes)")
    elif _approx(g, e * 3.6) or _approx(g, e / 3.6):
        cause = ("a km/h vs m/s conversion slip (the x3.6 factor)")
    elif _approx(g, e * 2) or _approx(g, e / 2):
        cause = ("a factor-of-two slip -- check whether a step should "
                 "double or halve the value (perpendicular distance, "
                 "average, divide-by-2)")
    else:
        rel = abs(g - e) / max(abs(e), 1e-9)
        cause = ("rounding drift in the middle steps -- carry more "
                 "decimal places through"
                 if rel <= 0.05 else
                 "a small arithmetic slip somewhere in the middle steps "
                 "-- re-check each substitution")
    return ("You reached {g}, but the verified value is {e} -- "
            "{cause}.").format(g=str(got).strip(), e=str(expected).strip(),
                               cause=cause)


# --------------------------------------------------------------------- #
# convenience wrappers used by /api/tutor-graph
# --------------------------------------------------------------------- #
def render_serve_voice(voice: TutorVoice, student_id: str, turn: int,
                       concept_title: str, question: str,
                       retreated_from: str = "") -> dict:
    """Intent-appropriate framing of a served question.

    The brain decides the framing: classify the served question text,
    map its template to a framing family, render deterministically.
    A retreat serve (the tutor stepped back to a prerequisite after
    two wrongs) always uses the serve_retreat framing, whose variants
    keep the "pehle wahi concept - 2 minute" line verbatim."""
    ctx = {
        "student_id": student_id, "turn": turn,
        "concept_title": concept_title, "question": question,
        "student_text": question,
    }
    if retreated_from:
        text = voice.render("serve_retreat", ctx)
        return {
            "text": text,
            "intent": "prerequisite_retreat",
            "template_id": "serve_retreat",
            "hinglish": detect_hinglish(question),
            "retreated_from": str(retreated_from),
        }
    cls = voice.classify(f"{concept_title} {question}")
    framing = _SERVE_FRAMING.get(cls["template_id"],
                                 "serve_concept_check")
    text = voice.render(framing, ctx)
    return {
        "text": text,
        "intent": cls["intent"],
        "template_id": framing,
        "hinglish": detect_hinglish(question),
    }


def render_submit_voice(voice: TutorVoice, student_id: str, turn: int,
                        outcome: str, concept_title: str = "",
                        expected: str = "", got: str = "",
                        worked_solution: str = "",
                        student_text: str = "") -> dict:
    """The voice field for a graded submit: celebrate on correct,
    name-the-slip-and-encourage on wrong, warm support otherwise."""
    template = _OUTCOME_TEMPLATE.get(outcome, "validate_and_reframe")
    ctx = {
        "student_id": student_id, "turn": turn,
        "concept_title": concept_title,
        "expected": expected, "got": got,
        "worked_solution": worked_solution,
        "student_text": student_text or got,
    }
    if outcome == "wrong":
        ctx["slip"] = diagnose_slip(expected, got)
    text = voice.render(template, ctx)
    return {
        "text": text,
        "template_id": template,
        "hinglish": detect_hinglish(student_text or got),
    }


# --------------------------------------------------------------------- #
# module-level singleton
# --------------------------------------------------------------------- #
_voice: Optional[TutorVoice] = None
_voice_lock = threading.Lock()


def get_voice() -> TutorVoice:
    global _voice
    with _voice_lock:
        if _voice is None:
            _voice = TutorVoice()
    return _voice
