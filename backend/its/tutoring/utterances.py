"""utterances.py — Wave 9.8 L4: the tutor's own words, per session language.

The ITS engine's fixed utterances (greeting, hint-rung intros, surrender
response, mastery line, encouragements…) route through ONE table keyed by
the session's ``language`` setting:

    "en"       — the existing English strings (unchanged semantics)
    "hinglish" — romanised Hindi-English, the existing voice style
    "hi"       — Devanagari, authored Hindi (no transliterated core
                 phrases; command keywords like 'hint' stay ASCII because
                 they are the literal tokens the client matches)

The tutor never translates student text or node content — only its own
utterances come from this table.

``say_voice`` covers the voice-block template ids the engine attaches
(via _attach_voice) so a ``hi`` session's voice line is Devanagari too.
"""

from __future__ import annotations

import re
from typing import Dict, Optional

LANGS = ("en", "hi", "hinglish")

#: literal command keywords + technical tokens allowed as ASCII inside a
#: 'hi' template (the no-English-leakage test allowlist).
# 'node' appears only as the {node} placeholder in prompt_next_node —
# a template token, not English prose.
ASCII_ALLOWLIST = frozenset(
    "hint next review start ready simplify eli5 x n t node".split()
)


def normalize_language(value) -> Optional[str]:
    """'hindi'/'hinglish'/'en' spellings -> canonical; junk -> None."""
    v = str(value or "").strip().lower()
    if v in ("hi", "hindi"):
        return "hi"
    if v in ("hinglish", "hing"):
        return "hinglish"
    if v in ("en", "eng", "english"):
        return "en"
    return None


def lang_of(state) -> str:
    """The session's effective language (StudentState.language, or the
    legacy prefers_hinglish mirror when the setting is absent)."""
    lang = normalize_language(getattr(state, "language", None))
    if lang:
        return lang
    if getattr(state, "prefers_hinglish", False):
        return "hinglish"
    return "en"


# --------------------------------------------------------------------------- #
# Utterance table                                                             #
# --------------------------------------------------------------------------- #
# Placeholders: {node} (node id — never in student-visible hi strings that
# also show it? ids are internal; the 'start <id>' prompt is an existing
# contract kept verbatim in all languages), {follow_up}, {concept_title},
# {first_step}, {hint}, {slip}, {name}.

_T: Dict[str, Dict[str, str]] = {
    # ── introduce ────────────────────────────────────────────────────
    "prompt_introduce": {
        "en": "When you're ready, let's check your understanding. "
              "Type 'ready' to continue.",
        "hinglish": "Jab tum ready ho, chalo dekhte hain kitna samajh "
                    "aaya. 'ready' likh ke shuru karo.",
        "hi": "जब आप तैयार हों, चलिए देखते हैं कि कितना समझ आया। "
              "आगे बढ़ने के लिए 'ready' लिखें।",
    },
    # ── question serve ───────────────────────────────────────────────
    "prompt_question": {
        "en": "Type your answer below.",
        "hinglish": "Apna answer neeche likho.",
        "hi": "अपना उत्तर नीचे लिखें।",
    },
    # ── correct answer → next question ───────────────────────────────
    "prompt_correct_next": {
        "en": "Great! Let's try the next one.",
        "hinglish": "Badhiya! Chalo agla try karte hain.",
        "hi": "बहुत बढ़िया! चलिए अगला सवाल करते हैं।",
    },
    # ── hint cap reached (reveal solution, move on) ──────────────────
    "prompt_hint_cap": {
        "en": "Let's look at the solution and try the next question.",
        "hinglish": "Chalo solution dekhte hain aur agla question "
                    "try karte hain.",
        "hi": "चलिए हल देखते हैं और अगला सवाल करते हैं।",
    },
    # ── after a hint ─────────────────────────────────────────────────
    "prompt_hint_retry": {
        "en": "Try again, or type 'hint' for another hint.",
        "hinglish": "Phir se try karo, ya aur hint ke liye 'hint' likho.",
        "hi": "फिर से कोशिश करें, या और संकेत के लिए 'hint' लिखें।",
    },
    # ── remediate: follow-up + escape hatches ────────────────────────
    "prompt_remediate": {
        "en": "{follow_up} — or type 'hint' for a hint, 'simplify' for a "
              "simpler explanation.",
        "hinglish": "{follow_up} — ya 'hint' likho hint ke liye, "
                    "'simplify' likho aasaan explanation ke liye.",
        "hi": "{follow_up} — या संकेत के लिए 'hint' लिखें, "
              "सरल समझाने के लिए 'simplify' लिखें।",
    },
    # ── simplify served ──────────────────────────────────────────────
    "prompt_simplify": {
        "en": "Let's try the question again with this simpler "
              "understanding.",
        "hinglish": "Ab is aasaan samajh ke saath question phir try "
                    "karte hain.",
        "hi": "अब इस सरल समझ के साथ सवाल फिर से करते हैं।",
    },
    # ── mastery line ─────────────────────────────────────────────────
    "prompt_mastery": {
        "en": "Type 'next' to continue to the next topic, or 'review' to "
              "revisit this topic.",
        "hinglish": "Agle topic ke liye 'next' likho, ya is topic ko "
                    "dobara dekhne ke liye 'review' likho.",
        "hi": "अगले विषय पर जाने के लिए 'next' लिखें, या इस विषय को "
              "दोहराने के लिए 'review' लिखें।",
    },
    # ── next node recommendation ─────────────────────────────────────
    "prompt_next_node": {
        "en": "Type 'start {node}' to begin the next topic.",
        "hinglish": "Agla topic shuru karne ke liye 'start {node}' "
                    "likho.",
        "hi": "अगला विषय शुरू करने के लिए 'start {node}' लिखें।",
    },
    "msg_no_more_nodes": {
        "en": "No further topics are loaded in this environment. "
              "Session complete.",
        "hinglish": "Is environment mein aur topics nahi hain. Session "
                    "poora hua.",
        "hi": "इस सत्र में और विषय उपलब्ध नहीं हैं। सत्र पूरा हुआ।",
    },
    "msg_complete": {
        "en": "Session complete. Start a new node to continue.",
        "hinglish": "Session poora hua. Aage ke liye naya topic shuru "
                    "karo.",
        "hi": "सत्र पूरा हुआ। आगे बढ़ने के लिए नया विषय शुरू करें।",
    },
    # ── off-script fallback ──────────────────────────────────────────
    "msg_off_script": {
        "en": "That's an interesting question! Let's stay focused on "
              "the current topic for now. We can explore that later.",
        "hinglish": "Interesting question hai! Abhi ke liye current "
                    "topic pe focus rakhte hain — baad mein explore "
                    "karenge.",
        "hi": "अच्छा सवाल है! अभी हम इसी विषय पर ध्यान रखें — "
              "उसे हम बाद में देखेंगे।",
    },
    "prompt_continue_lesson": {
        "en": "Let's continue with the lesson.",
        "hinglish": "Chalo lesson pe aage badhte hain.",
        "hi": "चलिए पाठ आगे बढ़ाते हैं।",
    },
    # ── ethics block (answer-gaming outside a live question) ─────────
    "msg_ethics_block": {
        "en": "I can't give you the answer directly, but I can help you "
              "think through it. What have you tried so far?",
        "hinglish": "Main answer seedha nahi de sakta, par sochne mein "
                    "madad zaroor karunga. Tumne abhi tak kya try kiya?",
        "hi": "मैं उत्तर सीधे नहीं दे सकता, पर सोचने में ज़रूर मदद "
              "करूँगा। आपने अभी तक क्या कोशिश की?",
    },
    "prompt_ethics_block": {
        "en": "Try to answer the question yourself, or type 'hint' for "
              "help.",
        "hinglish": "Khud answer karne ki koshish karo, ya madad ke "
                    "liye 'hint' likho.",
        "hi": "पहले खुद उत्तर देने की कोशिश करें, या मदद के लिए "
              "'hint' लिखें।",
    },
    # ── surrender reveal ─────────────────────────────────────────────
    "prompt_reveal_next": {
        "en": "Here's the full worked answer — study it carefully, then "
              "let's move on.",
        "hinglish": "Ye raha poora worked answer — dhyan se padho, phir "
                    "aage badhte hain.",
        "hi": "यह रहा पूरा हल — ध्यान से पढ़ें, फिर आगे बढ़ते हैं।",
    },
    "prompt_reveal_mastery": {
        "en": "Here's the full worked answer — study it, then we'll see "
              "how you're doing on this topic.",
        "hinglish": "Ye raha poora worked answer — padho, phir dekhte "
                    "hain is topic mein tum kaise ho.",
        "hi": "यह रहा पूरा हल — पढ़ें, फिर देखेंगे कि इस विषय में "
              "आपकी स्थिति कैसी है।",
    },
    # ── errors / missing node ────────────────────────────────────────
    "msg_node_not_found": {
        "en": "That topic isn't available in this session — pick another "
              "from your chapter.",
        "hinglish": "Ye topic is session mein nahi hai — chapter se "
                    "koi aur chuno.",
        "hi": "यह विषय इस सत्र में उपलब्ध नहीं है — अध्याय से "
              "कोई और चुनें।",
    },
    "msg_start_first": {
        "en": "Start a session first, then we can continue.",
        "hinglish": "Pehle session shuru karo, phir aage badhte hain.",
        "hi": "पहले सत्र शुरू करें, फिर आगे बढ़ते हैं।",
    },
    # ── encouragements ───────────────────────────────────────────────
    "encourage_frustrated": {
        "en": "I know this is challenging, but you're making progress. "
              "Take a deep breath.",
        "hinglish": "Jaanta hoon mushkil hai, par tum aage badh rahe "
                    "ho. Ek deep breath lo.",
        "hi": "जानता हूँ यह कठिन है, पर आप आगे बढ़ रहे हैं। "
              "एक गहरी साँस लें।",
    },
    "encourage_streak": {
        "en": "Excellent work! You're really getting this.",
        "hinglish": "Shabaash! Tumhe sach mein aa raha hai.",
        "hi": "शाबाश! आपको सच में आ रहा है।",
    },
    "encourage_confident": {
        "en": "You're building great confidence. Keep it up!",
        "hinglish": "Tumhara confidence badh raha hai. Aise hi chalte "
                    "raho!",
        "hi": "आपका आत्मविश्वास बढ़ रहा है। ऐसे ही जारी रखें!",
    },
    "encourage_pool_1": {
        "en": "Good job! Let's keep going.",
        "hinglish": "Badhiya! Chalte raho.",
        "hi": "अच्छा किया! चलिए आगे बढ़ते हैं।",
    },
    "encourage_pool_2": {
        "en": "Nice work! You're on the right track.",
        "hinglish": "Sahi jaa rahe ho! Yehi raasta hai.",
        "hi": "बढ़िया! आप सही रास्ते पर हैं।",
    },
    "encourage_pool_3": {
        "en": "That's correct! You're learning well.",
        "hinglish": "Bilkul sahi! Tum achhe se seekh rahe ho.",
        "hi": "बिल्कुल सही! आप अच्छे से सीख रहे हैं।",
    },
}

TEMPLATE_KEYS = tuple(_T.keys())


def say(lang: str, key: str, **params) -> str:
    """Render utterance `key` in `lang` (falls back to en, then to the
    key name — never empty, never raises)."""
    entry = _T.get(key) or {}
    text = entry.get(lang) or entry.get("hinglish") or entry.get("en") \
        or key
    if params:
        try:
            text = text.format(**{k: str(v) for k, v in params.items()})
        except Exception:
            pass
    return text


# --------------------------------------------------------------------------- #
# Voice-block lines (the _attach_voice garnish) per language                  #
# --------------------------------------------------------------------------- #

_VOICE: Dict[str, Dict[str, str]] = {
    "celebrate_and_advance": {
        "hi": "बिल्कुल सही! {concept_title} समझ आ गया। चलिए आगे बढ़ते "
              "हैं।",
        "hinglish": "Bilkul sahi! {concept_title} samajh aa gaya. Chalo "
                    "aage badhein.",
    },
    "misconception_correction": {
        "hi": "कोई बात नहीं — बस एक छोटी सी चूक हुई। {slip} "
              "चरण दोबारा देखें: {first_step}",
        "hinglish": "Koi baat nahi — bas ek chhoti slip hui. {slip} "
                    "Steps dobara dekho: {first_step}",
    },
    "hint_progressive": {
        "hi": "पहला संकेत: {hint} अब खुद कोशिश करें।",
        "hinglish": "Pehla hint: {hint} Ab khud try karo.",
    },
    "eli5_simple": {
        "hi": "सरल शब्दों में: {first_step}",
        "hinglish": "Aasaan bhasha mein: {first_step}",
    },
    "step_by_step_walk": {
        "hi": "चरण-दर-चरण चलते हैं। पहला चरण: {first_step}",
        "hinglish": "Step by step chalte hain. Pehla step: {first_step}",
    },
}

VOICE_TEMPLATE_IDS = tuple(_VOICE.keys())


def say_voice(lang: str, template_id: str, ctx: Optional[dict] = None
              ) -> str:
    """Voice line for `template_id` in `lang` — '' when no authored
    variant exists (caller falls back to the existing voice render)."""
    entry = _VOICE.get(template_id) or {}
    text = entry.get(lang) or ""
    if not text:
        return ""
    fields = {k: str(v or "") for k, v in (ctx or {}).items()}
    fields.setdefault("first_step", "")
    fields.setdefault("hint", "")
    fields.setdefault("slip", "")
    fields.setdefault("concept_title", "")
    try:
        out = text.format_map(_SafeDict(fields))
    except Exception:
        out = text
    return re.sub(r"\s{2,}", " ", out).strip()


class _SafeDict(dict):
    def __missing__(self, key):
        return ""
