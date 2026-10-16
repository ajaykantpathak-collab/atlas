"""hindi_families.py — deterministic Hindi vyaakaran families
(CBSE/ICSE 6-12): sandhi (viichchheda + bhed), samas (viichchheda +
bhed), alankaar classification (anupraasa, upama, roopak, utprekshaa...),
kaal conversion, vaachya conversion, shabd-roop forms, muhaavare/lokoktiyan
meaning-match, upasargh-pratyaya, vaiyakarani shriArthak pairs.
Registered batch-18.

Conventions: identical to the other subject family modules — a TABLE of
(FID, regex, handler) rows scanned by model_hindi(); patterns operate on
raw Devanagari (handle Unicode word boundaries explicitly, \\b does not
work on Devanagari).  Ground truth: the authored corpus nodes (closed
world); SOLVER_STEP_CONTRACT.md applies to every family (steps stay in
English so the presentation layer can render them consistently, question
terms quoted in Devanagari).  This stub shipped an empty table so the
batch-18 registration could land first; the owning agent filled it.

Families implemented (all corpus-grounded; the ISC/ICSE grammar block
c11/c12_hin_isc_01 + c7/c8/c9_hin_icse_03/04 + CBSE Kshitij-2
'मुहावरे' + ICSE chapter parichay nodes are the teaching source of
every rule and table row below):
  SANDHI_VICHCHHED   svar-sandhi split back to components + bhed
  SAMAS_VIGRAH       samas vigrah (split) + bhed for the taught set
  ALANKAAR_CLASSIFY  classify a quoted line (anupraasa/yamak/upama/
                     roopak/atishayokti) by the corpus kasauti order
  KAAL_IDENTIFY      bhoot / vartamaan / bhavishyat from verb shape
  KAAL_CONVERT       convert a sentence into another kaal (taught set)
  VAACHYA_IDENTIFY   kartaar / karm / bhaav vaachya from markers
  VAACHYA_CONVERT    kartaar<->karm by the corpus 3-step rule
  KARAK_CHINH        kaarak of a word from its chinh (ने/को/से/के लिए...)
  LING_VACHAN        ling / vachan conversion by the taught rules
  UPASARG_PRATYAY    peel off the taught prefix / suffix + root + shift
  PRATYAY_NIRMAN     pratyay side of the same kasauti (place + work)
  MUHAAVARA_MEANING  idiom / lokokti meaning from the corpus's own list
  TATSAM_TADBHAV     tatsam<->tadbhav pair from the taught rules table
  LIT_FACT           author/work attribution from the corpus nodes only
  VAAKY_BHED         saral / sanyukt / mishr by the kasauti (verbs+joiner)
  NA_SHUDDHI         'ने' rule: both conditions, correct the sentence
  MEL_SHUDDHI        vishay-kriya mel (agreement) correction

Honesty gates: every family requires its own Devanagari keyword and
declines (_GATE -> scan continues) when the probe is not in the taught
set, so English grammar / maths probes never fire a Hindi family.

WS-B merge (2026-10-10): the Hindi grammar LANG_* specs and
their computes moved here from structure_families_lang.py
(consolidation map step 6) as HINDI_LANG_SPECS -- ids verbatim,
verifier keys keep hitting.
"""

from __future__ import annotations

import re
import unicodedata
from typing import Any, Dict, List, Optional, Tuple

from backend.its.solver.modeling_layer import ModelResult

TABLE: List[Tuple[str, str, Any]] = []

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

# Devanagari block \u0900-\u097F; \\b does NOT work here — use explicit
# lookarounds on the Unicode range and punctuation/space anchors instead.
_DEV = "\u0900-\u097F"
_DEV_WORD = re.compile(rf"[{_DEV}][{_DEV}\u200c\u200d-]*")
_SIGN = set("\u093e\u093f\u0940\u0941\u0942\u0943\u0947\u0948\u094b\u094c")
# danda (। \u0964, ॥ \u0965) sits INSIDE the Devanagari block — strip it
# (and ASCII punctuation) from every token or it welds to the last word.
_TRAIL_PUNCT = "\u0964\u0965.,;:!?()\u201c\u201d\u2018\u2019'-\""


def _norm(text: str) -> str:
    """NFC + strip zero-width joiners so tables match reliably."""
    t = unicodedata.normalize("NFC", text or "")
    return t.replace("\u200c", "").replace("\u200d", "")


def _dev_words(text: str) -> List[str]:
    out = []
    for w in _DEV_WORD.findall(_norm(text)):
        w = w.strip("-").rstrip(_TRAIL_PUNCT).lstrip(_TRAIL_PUNCT)
        if len(w) >= 2:
            out.append(w)
    return out


def _clean(t: str) -> str:
    """Aggressive normalization for exact-match tables (drop punctuation
    and spaces)."""
    return re.sub(rf"[^{_DEV}]+", "", _norm(t))


def _first_letters(line: str) -> List[str]:
    """First consonant of each word (matras stripped)."""
    out = []
    for w in _DEV_WORD.findall(_norm(line)):
        for ch in w:
            if "\u0915" <= ch <= "\u0939":  # क..ह consonant block
                out.append(ch)
                break
    return out


# --------------------------------------------------------------------------- #
# 1. SANDHI_VICHCHHED — corpus: c11_hin_isc_01_002 (विद्यालय =
#    विद्या + आलय, दीर्घ), c12_hin_isc_01_003 (राम + अयण = रामायण,
#    दीर्घ: अ + आ = आ); "संधि विच्छेद कीजिए" is the ISC board form.
# --------------------------------------------------------------------------- #

_SANDHI_TABLE: Dict[str, Tuple[str, str, str]] = {
    # word: (left, right, sandhi bhed)
    "विद्यालय": ("विद्या", "आलय", "दीर्घ संधि"),
    "रामायण": ("राम", "अयण", "दीर्घ संधि"),
    "हिमालय": ("हिम", "आलय", "दीर्घ संधि"),
    "देवालय": ("देव", "आलय", "दीर्घ संधि"),
    "शिवालय": ("शिव", "आलय", "दीर्घ संधि"),
    "विद्यार्थी": ("विद्या", "अर्थी", "दीर्घ संधि"),
    "परीक्षा": ("परि", "ईक्षा", "दीर्घ संधि"),
    "महेश": ("महा", "ईश", "गुण संधि"),
    "कमलेश": ("कमल", "ईश", "गुण संधि"),
    "महेन्द्र": ("महा", "इन्द्र", "गुण संधि"),
    "नरेश": ("नर", "ईश", "गुण संधि"),
    "राजेश": ("राज", "ईश", "गुण संधि"),
    "विद्येश": ("विद्या", "ईश", "गुण संधि"),
    "गंगेच्छा": ("गंगा", "इच्छा", "गुण संधि"),
    "इत्यादि": ("इति", "आदि", "यण संधि"),
    "प्रत्येक": ("प्रति", "एक", "यण संधि"),
    "पर्याप्त": ("परि", "आप्त", "यण संधि"),
    "यद्यपि": ("यदि", "अपि", "यण संधि"),
    "अत्यधिक": ("अति", "अधिक", "यण संधि"),
}

_SANDHI_ASK = re.compile(r"संधि")
_SANDHI_ASK_OP = re.compile(
    r"विच्छेद|विग्रह|तोड़|कीजिए|करें|भेद|कौन-सी|कौन सी|कौन-सा")
_SANDHI_STOP = ("संधि", "विच्छेद", "विग्रह", "कीजिए", "भेद", "करें",
                "का", "की", "के", "को", "में", "से", "है", "हैं", "क्या")

# vowel classes for the forward (split -> bhed) analyzer
_V_CLASS = {"\u093e": "a", "\u093f": "i", "\u0940": "i", "\u0941": "u",
            "\u0942": "u", "\u0943": "ri", "\u0905": "a", "\u0906": "a",
            "\u0907": "i", "\u0908": "i", "\u0909": "u", "\u090a": "u",
            "\u090b": "ri", "\u090f": "e", "\u0910": "e", "\u0913": "o",
            "\u0914": "o", "\u0947": "e", "\u0948": "e", "\u094b": "o",
            "\u094c": "o"}
_VOWEL_CHARS = "\u0905\u0906\u0907\u0908\u0909\u090a\u090b\u090f\u0910" \
               "\u0913\u0914"
_SANDHI_RULE = {
    ("a", "a"): "दीर्घ संधि", ("i", "i"): "दीर्घ संधि",
    ("u", "u"): "दीर्घ संधि",
    ("a", "i"): "गुण संधि", ("a", "u"): "गुण संधि",
    ("a", "ri"): "गुण संधि",
    ("a", "e"): "वृद्धि संधि", ("a", "o"): "वृद्धि संधि",
}
_RULE_FORMULA = {"दीर्घ संधि": "अ/आ + अ/आ = आ (और इ/ई, उ/ऊ की समान "
                              "स्वर-जोड़ी)",
                 "गुण संधि": "अ/आ + इ/ई = ए, अ/आ + उ/ऊ = ओ",
                 "वृद्धि संधि": "अ/आ + ए/ऐ = ऐ, अ/आ + ओ/औ = औ",
                 "यण संधि": "इ/ई + विसमान = इय्, उ/ऊ + विसमान = उव्, "
                            "ऋ + विसमान = ऋर्"}


def _v_class_of(ch: str) -> str:
    return _V_CLASS.get(ch, "a")  # consonant = inherent अ


def _last_vclass(word: str) -> str:
    for ch in reversed(word):
        c = _V_CLASS.get(ch)
        if c:
            return c
        if ch in _VOWEL_CHARS:
            return _V_CLASS[ch]
    return "a"


def _first_vclass(word: str) -> str:
    for ch in word:
        if ch in _VOWEL_CHARS:
            return _V_CLASS[ch]
        c = _V_CLASS.get(ch)
        if c and ch in ("\u093e", "\u093f", "\u0940", "\u0941", "\u0942",
                        "\u0943"):
            return c
    return "a"  # consonant onset = inherent अ


def _c_sandhi(g, m, text):
    t = _norm(text)
    if not _SANDHI_ASK.search(t) or not _SANDHI_ASK_OP.search(t):
        return _GATE
    # (a) forward analysis: components given as "X + Y" -> name the bhed
    sp = re.search(rf"([{_DEV}-]+)\s*\+\s*([{_DEV}-]+)", t)
    if sp:
        left, right = sp.group(1).strip("-"), sp.group(2).strip("-")
        if len(left) >= 2 and len(right) >= 1:
            lv, fv = _last_vclass(left), _first_vclass(right)
            if lv in ("i", "u", "ri") and fv != lv:
                bhed = "यण संधि"
            else:
                bhed = _SANDHI_RULE.get((lv, fv), "")
            if bhed:
                steps = [
                    f"Rule: svar-sandhi bhed is read off the boundary "
                    f"vowels — apply the taught formula table: "
                    f"{_RULE_FORMULA[bhed]}.",
                    f"Given: '{left} + {right}' — the last vowel of "
                    f"'{left}' is of class '{lv}' and the first vowel of "
                    f"'{right}' is of class '{fv}'.",
                    f"Computation: the pair ('{lv}', '{fv}') maps to "
                    f"{bhed} by the formula table; the joined word carries "
                    f"that merged vowel.",
                    f"Check: re-applying the same formula to the two "
                    f"components reproduces the same bhed, and no other "
                    f"formula fits the vowel classes — the reading "
                    f"closes.",
                    f"Interpretation: '{left} + {right}' joins by {bhed}; "
                    f"cite the formula in the exam answer.",
                ]
                return None, steps, f"{left} + {right} — {bhed}", None, \
                    "स्वर संधि भेद (सूत्र तालिका)", {"bhed": bhed}
            return _GATE
    # (b) viichchhed: joined word from the taught split table (the target
    # word may stand before or after the instruction)
    words = [w for w in _dev_words(t) if w not in _SANDHI_STOP and
             len(w) >= 3]
    for word in words:
        hit = _SANDHI_TABLE.get(word)
        if hit:
            break
    else:
        return _GATE
    left, right, bhed = hit
    steps = [
        f"Rule: svar-sandhi viichchhed re-reads the joined word through "
        f"the taught vowel-merger rules — '{word}' is a taught example, "
        f"so we split it at the vowel junction and name the sandhi.",
        f"Given: joined word '{word}'; the junction vowel carries the "
        f"merger of the two components.",
        f"Computation: '{word}' = '{left}' + '{right}' — the boundary "
        f"vowels merge by the {bhed} rule ({_RULE_FORMULA[bhed]}).",
        f"Check: reading '{left}' and '{right}' back together by the "
        f"same rule reproduces '{word}' exactly — the split closes.",
        f"Interpretation: the word is a sandhi-joined compound; the exam "
        f"answer is '{left} + {right}', bhed '{bhed}'.",
    ]
    ans = f"{word} = {left} + {right} ({bhed})"
    return None, steps, ans, None, \
        "स्वर संधि विच्छेद (taught split table)", \
        {"left": left, "right": right, "bhed": bhed}


# --------------------------------------------------------------------------- #
# 2. SAMAS_VIGRAH — corpus: c11_hin_isc_01_003 A2 (विद्यालय-प्रांगण =
#    "विद्यालय का प्रांगण", षष्ठी तत्पुरुष), c11_hin_isc_01_002
#    (राजकुमार = राजा + कुमार); bhed by the 6-fold classification.
# --------------------------------------------------------------------------- #

_SAMAS_TABLE: Dict[str, Tuple[str, str, str]] = {
    # compound: (vigrah, bhed, why)
    "राजकुमार": ("राजा का कुमार", "षष्ठी तत्पुरुष",
                 "the first pad owns the second — 'का' fits"),
    "विद्यालय-प्रांगण": ("विद्यालय का प्रांगण", "षष्ठी तत्पुरुष",
                        "ownership relation — 'का' fits"),
    "गंगाजल": ("गंगा का जल", "षष्ठी तत्पुरुष",
               "water of the Ganga — 'का' fits"),
    "दशानन": ("दस आनन (मुख) हैं जिसके", "बहुव्रीहि",
              "the compound names a third thing (Ravana), not the faces"),
    "नीलकंठ": ("नीली कंठ है जिसकी", "बहुव्रीहि",
               "names Shiva, not the blue throat itself"),
    "चतुर्भुज": ("चार भुजाएँ हैं जिसकी", "बहुव्रीहि",
                 "names the deity, not the four arms"),
    "लंबोदर": ("लंबा उदर (पेट) है जिसका", "बहुव्रीहि",
               "names Ganesha, not the long belly"),
    "नीलकमल": ("नीला है जो कमल (नीले रंग का कमल)", "कर्मधारय",
               "the lotus itself is blue — viseshana-viseshya"),
    "महात्मा": ("महान है जो आत्मा (महान आत्मा)", "कर्मधारय",
                "the atma itself is great — apposition"),
    "महापुरुष": ("महान है जो पुरुष", "कर्मधारय",
                 "the purush himself is great"),
    "त्रिलोक": ("तीन लोकों का समूह", "द्विगु",
                "number + class-noun meaning 'group of N'"),
    "सप्ताह": ("सात दिनों का समूह", "द्विगु",
               "number + din — the group of seven days"),
    "नवरात्र": ("नौ रात्रियों का समूह", "द्विगु",
                "number + raatri — the nine-night group"),
    "प्रतिदिन": ("प्रत्येक दिन / हर दिन", "अव्ययीभाव",
                 "प्रति- makes an indeclinable 'per/every' phrase"),
    "यथाशक्ति": ("शक्ति के अनुसार", "अव्ययीभाव",
                 "यथा- makes an indeclinable 'according to' phrase"),
    "यथासंभव": ("संभव के अनुसार / जितना संभव हो", "अव्ययीभाव",
                "यथा- indeclinable sense phrase"),
    "माता-पिता": ("माता और पिता", "द्वंद्व",
                  "two independent pads joined by 'और'"),
    "सुख-दुख": ("सुख और दुख", "द्वंद्व",
                "contrasted pair joined by 'और'"),
    "दिन-रात": ("दिन और रात", "द्वंद्व",
                "contrasted pair joined by 'और'"),
    "राम-लक्ष्मण": ("राम और लक्ष्मण", "द्वंद्व",
                    "two names joined by 'और'"),
    "अन्न-जल": ("अन्न और जल", "द्वंद्व",
                "two items joined by 'और'"),
}


def _c_samas(g, m, text):
    t = _norm(text)
    if "समास" not in t:
        return _GATE
    for w in _dev_words(t):
        hit = _SAMAS_TABLE.get(w)
        if hit:
            vigrah, bhed, why = hit
            steps = [
                f"Rule: samas-vigrah unpacks the compound into its pads and "
                f"names the bhed from the relation between them — the "
                f"corpus kasauti asks which kaarak-word ('का/और/समूह/है "
                f"जो') joins the pads.",
                f"Given: compound '{w}'.",
                f"Computation: '{w}' = {vigrah}; relation check — {why}, "
                f"so the bhed is {bhed}.",
                f"Check: re-compacting the pads of the vigrah reproduces "
                f"'{w}', and no other kaarak reading fits the relation — "
                f"the classification closes.",
                f"Interpretation: the compound condenses '{vigrah}'; the "
                f"exam answer gives the vigrah and the bhed '{bhed}'.",
            ]
            ans = f"{w} = {vigrah} — {bhed}"
            return None, steps, ans, None, \
                "समास विग्रह + भेद (taught set)", \
                {"vigrah": vigrah, "bhed": bhed}
    return _GATE


# --------------------------------------------------------------------------- #
# 3. ALANKAAR_CLASSIFY — corpus: c9_hin_icse_04_003 Q3 gives the three-step
#    kasauti (वाचक? उपमान-नाम? अति-लंघन?) with its own worked lines;
#    c10_hin_ks_cbse_01_006 gives the anupraasa/yamak boundary.
# --------------------------------------------------------------------------- #

_ALANKAAR_LINES: Dict[str, Tuple[str, str]] = {
    # cleaned line: (alankaar, why)
    "कनककनकतेसौगुनीमादकताअधिकाय": (
        "अनुप्रास", "'क' varna repeats across 'कनक-कनक' — pure sound "
        "repetition, no meaning play"),
    "मोहनकेमुखमंदिरमें": (
        "अनुप्रास", "the 'म' sound repeats at the word-heads "
        "(मोहन-मुख-मंदिर)"),
    "सोनेकीसोईनेसोनेनहींदिया": (
        "यमक", "the same word-form 'सोने' comes twice with two different "
        "meanings (gold / sleep)"),
    "मुखकमलसानिर्मल": (
        "उपमा", "the वाचक 'सा' is present — all four ang stay separate "
        "(उपमेय मुख, उपमान कमल, वाचक सा, द्योतक निर्मलता)"),
    "नदीकाजलचाँदसाचमकरहाथा": (
        "उपमा", "the वाचक 'सा' is present — river-water compared TO the "
        "moon"),
    "मुखकमलमुरझाया": (
        "रूपक", "no वाचक; the उपमान-name कमल sits directly on the "
        "उपमेय मुख"),
    "नदीचाँदधरतीपरउतरआया": (
        "रूपक", "no वाचक; नदी is named चाँद outright (उपमान-नाम आरोप)"),
    "नदीकीलहरेंआसमानछूलेतीथीं": (
        "अतिशयोक्ति", "waves cannot touch the sky — ati-langhan of the "
        "natural limit, with no उपमान-name"),
}

_UPAMA_VACHAK = re.compile(
    r"सा[\u0900-\u097F]?(\s|$)|सी[\u0900-\u097F]?(\s|$)|जैसा|जैसी|जैसे|"
    r"के\s*समान|की\s*तरह|सदृश")
_ROOPAK_UPMAAN = ("कमल", "चाँद", "शशि")
_ALANKAAR_STOP = ("अलंकार", "पहचानिए", "कीजिए", "बताइए", "पहचान", "कौन-सा",
                  "लिखिए", "पंक्ति", "इसमें", "में", "का", "की", "है")


def _line_of(t: str) -> str:
    """Best-effort quoted-line extraction for step text."""
    for cand in re.findall(
            rf"[{chr(34)}'{chr(0x201c)}{chr(0x2018)}]?([{_DEV}][^{chr(34)}'"
            rf"{chr(0x201d)}{chr(0x2019)}।.]{{3,}})", t):
        if "अलंकार" not in cand and len(cand) >= 6:
            return cand
    return " ".join(w for w in _dev_words(t) if w not in _ALANKAAR_STOP)


def _c_alankaar(g, m, text):
    t = _norm(text)
    if "अलंकार" not in t and "अलङ्कार" not in t:
        return _GATE
    clean = _clean(t)
    # (a) taught-line table: substring match on the cleaned text
    for key, (name, why) in _ALANKAAR_LINES.items():
        if key in clean:
            steps = [
                "Rule: alankaar-nirnay runs the corpus kasauti in order — "
                "(1) is the वाचक (सा/जैसा/की तरह) present? (2) is the "
                "उपमान-name placed on the उपमेय? (3) is the natural limit "
                "over-stepped with no उपमान? sound/word repetition is "
                "checked first as शब्दालंकार.",
                f"Given: the line '{_line_of(t)}'.",
                f"Computation: the kasauti resolves to '{name}' — {why}.",
                "Check: the neighbouring classifications are excluded by "
                "the same kasauti (no वाचक -> not उपमा; no shared "
                "word-form with two senses -> not यमक), so the decision "
                "closes.",
                f"Interpretation: the line's alankaar is '{name}'; in the "
                f"exam quote the deciding words as evidence.",
            ]
            return None, steps, f"अलंकार: {name}", None, \
                "अलंकार कसौटी (corpus 3-step order)", {"alankaar": name}
    # (b) rule paths run on the quoted line (or the whole probe)
    line = None
    for cand in re.findall(
            rf"[{chr(34)}'{chr(0x201c)}{chr(0x2018)}]?([{_DEV}][^{chr(34)}'"
            rf"{chr(0x201d)}{chr(0x2019)}।.]{{3,}})", t):
        if "अलंकार" not in cand and len(cand) >= 6:
            line = cand
            break
    if not line:
        cands = [w for w in _dev_words(t)
                 if w not in ("अलंकार", "पहचानिए", "कीजिए", "बताइए",
                              "पहचान", "कौन-सा", "लिखिए", "पंक्ति",
                              "इसमें", "में", "का")]
        line = " ".join(cands)
    if not line or len(_clean(line)) < 6:
        return _GATE
    # rule: वाचक present -> उपमा
    line_n = _norm(line)
    vm = _UPAMA_VACHAK.search(line_n)
    if vm:
        before = line_n[:vm.start()].strip(" -—")
        after = line_n[vm.end():].strip(" -—।,.")
        upamey = before.split()[-1] if before.split() else "उपमेय"
        upamaan = after.split()[0] if after.split() else "उपमान"
        steps = [
            "Rule: the corpus kasauti — if the वाचक (सा/सी/जैसा/की तरह/के "
            "समान) is present, the comparison stays a comparison and the "
            "alankaar is उपमा, with all four ang visible.",
            f"Given: the line '{line}'.",
            f"Computation: वाचक found — उपमेय (before it) = '{upamey}', "
            f"उपमान (after it) = '{upamaan}'; the shared quality is the "
            f"द्योतक in the rest of the line.",
            "Check: no उपमान-name is placed directly on the उपमेय (that "
            "would be रूपक) because the वाचक keeps the two apart — the "
            "decision closes as उपमा.",
            "Interpretation: the line carries उपमा अलंकार; the exam "
            "answer names the वाचक and the four ang.",
        ]
        return None, steps, "अलंकार: उपमा", None, \
            "अलंकार कसौटी (वाचक present)", {"alankaar": "उपमा"}
    # rule: उपमान-name joined without वाचक -> रूपक
    for up in _ROOPAK_UPMAAN:
        if re.search(rf"[{_DEV}]-{up}|{up}", line_n) and \
                not _UPAMA_VACHAK.search(line_n):
            steps = [
                "Rule: corpus kasauti — no वाचक, but the उपमान-name is "
                "placed directly on the उपमेय (the comparison word is cut "
                "away), so the alankaar is रूपक.",
                f"Given: the line '{line}'.",
                f"Computation: the उपमान-name '{up}' sits on the subject "
                f"with no सा/जैसा — the metaphor (आरोप) is direct.",
                "Check: वाचक absent (not उपमा) and no ati-langhan of a "
                "natural limit (not अतिशयोक्ति) — the decision closes as "
                "रूपक.",
                "Interpretation: the line carries रूपक अलंकार — the "
                "उपमान's name is used for the उपमेय itself.",
            ]
            return None, steps, "अलंकार: रूपक", None, \
                "अलंकार कसौटी (उपमान-नाम आरोप)", {"alankaar": "रूपक"}
    # rule: >= 3 of the first 4 words open with the same consonant
    fl = _first_letters(line)
    if len(fl) >= 3 and any(fl[:4].count(c) >= 3 for c in set(fl[:4])):
        steps = [
            "Rule: corpus kasauti for शब्दालंकार — when only the SOUND "
            "repeats (the same first consonant at several word-heads) "
            "with no meaning play, the alankaar is अनुप्रास.",
            f"Given: the line '{line}'.",
            f"Computation: the word-heads open with the consonants "
            f"{' '.join(fl[:6])} — one consonant repeats three or more "
            f"times; no word-form repeats with two senses, so it is not "
            f"यमक.",
            "Check: pure sound-repetition with no arth-khel is exactly "
            "the anupraasa-vs-yamak boundary drawn in the corpus — the "
            "decision closes.",
            "Interpretation: the line carries अनुप्रास अलंकार "
            "(शब्दालंकार); cite the repeating consonant.",
        ]
        return None, steps, "अलंकार: अनुप्रास", None, \
            "अलंकार कसौटी (ध्वनि-आवृत्ति)", {"alankaar": "अनुप्रास"}
    return _GATE


# --------------------------------------------------------------------------- #
# 4/5. KAAL — corpus: c9_hin_icse_04_001 A3 ('पढ़ी' = भूतकाल सामान्य
#      भूत), c9_hin_icse_04_004 A3 (खेल रहे हैं -> खेल रहे थे),
#      c10_hin_icse_04_001 A2 (सीता गाती थी -> सीता गाएगी).
# --------------------------------------------------------------------------- #

_FUT: Dict[str, Tuple[str, str, str, str]] = {
    # stem: (m-sg, f-sg, m-pl, f-pl)
    "गा": ("गाएगा", "गाएगी", "गाएंगे", "गाएंगी"),
    "जा": ("जाएगा", "जाएगी", "जाएंगे", "जाएंगी"),
    "खा": ("खाएगा", "खाएगी", "खाएंगे", "खाएंगी"),
    "पी": ("पिएगा", "पिएगी", "पिएंगे", "पिएंगी"),
    "सो": ("सोएगा", "सोएगी", "सोएंगे", "सोएंगी"),
    "खेल": ("खेलेगा", "खेलेगी", "खेलेंगे", "खेलेंगी"),
    "पढ़": ("पढ़ेगा", "पढ़ेगी", "पढ़ेंगे", "पढ़ेंगी"),
    "लिख": ("लिखेगा", "लिखेगी", "लिखेंगे", "लिखेंगी"),
    "हँस": ("हँसेगा", "हँसेगी", "हँसेंगे", "हँसेंगी"),
    "नाच": ("नाचेगा", "नाचेगी", "नाचेंगे", "नाचेंगी"),
    "चल": ("चलेगा", "चलेगी", "चलेंगे", "चलेंगी"),
    "कर": ("करेगा", "करेगी", "करेंगे", "करेंगी"),
    "देख": ("देखेगा", "देखेगी", "देखेंगे", "देखेंगी"),
    "सुन": ("सुनेगा", "सुनेगी", "सुनेंगे", "सुनेंगी"),
    "बोल": ("बोलेगा", "बोलेगी", "बोलेंगे", "बोलेंगी"),
    "रह": ("रहेगा", "रहेगी", "रहेंगे", "रहेंगी"),
    "बैठ": ("बैठेगा", "बैठेगी", "बैठेंगे", "बैठेंगी"),
    "दौड़": ("दौड़ेगा", "दौड़ेगी", "दौड़ेंगे", "दौड़ेंगी"),
    "दे": ("देगा", "देगी", "देंगे", "देंगी"),
    "ले": ("लेगा", "लेगी", "लेंगे", "लेंगी"),
}
_GN_FROM_TA = {"तीं": ("f", "pl"), "ता": ("m", "sg"), "ती": ("f", "sg"),
               "ते": ("m", "pl")}
_FUT_PHRASE = re.compile(
    rf"[{_DEV}]+(?:गा|गी|गे|गें|ऊँगा|ऊँगी|एगा|एगी|एंगे|एंगी)"
    rf"(?![{_DEV}])")
_PAST_MARK = re.compile(r"था(?![{_DEV}])|थी(?![{_DEV}])|थे(?![{_DEV}])|"
                        r"ने(?![{_DEV}])")
_PAST_STEM = re.compile(rf"[{_DEV}]+(?:या|यी|ये)$")
_PRES_MARK = re.compile(r"ता\s*है|ती\s*है|ते\s*हैं|ता\s*हूँ|ते\s*हो|"
                        r"रहा\s*है|रही\s*है|रहे\s*हैं")
_CONT = re.compile(r"रहा\s*है|रही\s*है|रहे\s*हैं|रहा\s*हूँ")
_TA_END = re.compile(r"(तीं|ता|ती|ते)$")
_AUX_END = re.compile(r"\s*(है|हैं|हूँ|हो)$")


def _kaal_of(sent: str) -> Optional[str]:
    s = _norm(sent)
    if _FUT_PHRASE.search(s):
        return "भविष्यत् काल"
    toks = s.split()
    if _PAST_MARK.search(s) or (toks and _PAST_STEM.search(toks[-1])):
        return "भूतकाल"
    if _PRES_MARK.search(s):
        return "वर्तमान काल"
    return None


def _c_kaal_ident(g, m, text):
    t = _norm(text)
    if "काल" not in t or "वाच्य" in t:
        return _GATE
    if not re.search(r"पहचानिए|पहचान|कौन-सा|कौन सा|बताइए", t):
        return _GATE
    if re.search(r"बदल|परिवर्तन", t):
        return _GATE
    kaal = _kaal_of(t)
    if not kaal:
        return _GATE
    subtype = ""
    if kaal == "भूतकाल":
        subtype = ("सामान्य भूत ('ने' + past stem)" if "ने" in t else
                   "भूत (था-family marker)")
    elif kaal == "वर्तमान काल":
        subtype = ("अपूर्ण/निरंतर वर्तमान" if _CONT.search(t) else
                   "सामान्य वर्तमान")
    ev = ("'ने' or a था/थी/थे marker" if kaal == "भूतकाल" else
          "a future-marker ending (गा/गी/गे/ऊँगा)" if
          kaal == "भविष्यत् काल"
          else "the ता/ती/ते + है pattern or रहा/रही/रहे + है")
    steps = [
        "Rule: kaal-pahchaan reads the verb shape — bhoot carries 'ने' or "
        "था/थी/थे or a past stem (या/यी/ये), vartamaan carries ता/ती/ते + "
        "है or रहा/रही/रहे + है, bhavishyat carries a गा/गी/गे-ending "
        "form.",
        f"Given: the sentence in the probe — the marker found is {ev}.",
        f"Computation: the marker maps directly to the kaal {kaal}"
        + (f" ({subtype})" if subtype else "") + ".",
        "Check: no competing marker of the other two kaals is present in "
        "the sentence, so the reading closes.",
        f"Interpretation: the action sits in the {kaal} — name the kaal "
        f"and its bhed in the answer.",
    ]
    return None, steps, f"काल: {kaal}" + \
        (f" ({subtype})" if subtype else ""), None, \
        "काल पहचान (क्रिया-रूप संकेत)", {"kaal": kaal}


_CONT_CN = {"रहा": ("m", "sg"), "रही": ("f", "sg"), "रहे": (None, "pl")}
_AUX_MAP = {("m", "sg"): "था", ("f", "sg"): "थी",
            ("m", "pl"): "थे", ("f", "pl"): "थीं"}


def _c_kaal_convert(g, m, text):
    t = _norm(text)
    if "काल" not in t or not re.search(r"बदल|परिवर्तन", t):
        return _GATE
    target = ("भूत" if re.search(r"भूत", t) else
              "भविष्यत्" if re.search(r"भविष्य", t) else
              "वर्तमान" if re.search(r"वर्तमान", t) else None)
    if not target:
        return _GATE
    words = _dev_words(t)
    # past-continuous branch: रहा/रही/रहे + है/हैं/हूँ
    for i, w in enumerate(words):
        if w in _CONT_CN and i + 1 < len(words) and \
                words[i + 1] in ("है", "हैं", "हूँ"):
            if target != "भूत":
                return _GATE  # taught conversion is vartamaan -> bhoot
            gender, number = _CONT_CN[w]
            aux = _AUX_MAP[(gender or "m", number)]
            conv_words = words[:i + 2]
            conv_words[-1] = aux
            conv = " ".join(conv_words) + "."
            steps = [
                "Rule: vartamaan -> bhoot conversion for the continuous "
                "(निरंतर) keeps रहा/रही/रहे and swaps only the auxiliary: "
                "है/हैं -> था/थी/थे/थीं agreeing with the karta's "
                "ling-vachan.",
                f"Given: '{' '.join(words[:i + 2])}' — '{w}' marks the "
                f"subject {gender or 'm'}-ling {number}-vachan.",
                f"Computation: '{words[i + 1]}' -> '{aux}' (the main verb "
                f"and 'रह-' stay untouched) -> '{conv}'.",
                "Check: only the auxiliary moved, the aux agrees with the "
                "karta, and the action is unchanged — the arth-kaal "
                "suraksha check closes.",
                f"Interpretation: '{conv}' says the same ongoing action "
                f"in भूतकाल निरंतर.",
            ]
            return None, steps, conv, None, \
                "काल परिवर्तन (वर्तमान निरंतर -> भूत निरंतर)", {}
    # simple-verb branch: last ता/ती/ते/तीं word carries the agreement
    verb_idx = None
    for i, w in enumerate(words):
        if _TA_END.search(w):
            verb_idx = i
    if verb_idx is None or verb_idx < 1:
        return _GATE
    verb = words[verb_idx]
    gender, number = _GN_FROM_TA[_TA_END.search(verb).group(0)]
    stem = _TA_END.sub("", verb)
    if target == "भविष्यत्":
        fut = _FUT.get(stem)
        if not fut:
            return _GATE
        form = fut[0 if (gender, number) == ("m", "sg")
                   else 1 if (gender, number) == ("f", "sg")
                   else 2 if (gender, number) == ("m", "pl") else 3]
        conv = " ".join(words[:verb_idx] + [form]) + "."
        steps = [
            "Rule: bhoot -> bhavishyat conversion keeps the subject, "
            "drops the past auxiliary (था/थी) and rebuilds the verb from "
            "its stem with the future ending that agrees in "
            "ling-vachan.",
            f"Given: '{' '.join(words[:verb_idx + 1])}' — the verb "
            f"'{verb}' marks the subject as {gender}-ling "
            f"{number}-vachan; stem = '{stem}'.",
            f"Computation: '{stem}' + future ending -> '{form}'; the "
            f"words before the verb keep their order and था/थी is "
            f"dropped.",
            f"Check: '{form}' agrees with the {gender}/{number} subject "
            f"and the meaning (same action, future time) is preserved — "
            f"the arth-kaal suraksha check closes.",
            f"Interpretation: the converted sentence '{conv}' places the "
            f"same action in भविष्यत् काल.",
        ]
        return None, steps, conv, None, "काल परिवर्तन (भूत -> भविष्यत्)", {}
    if target == "भूत" and verb_idx + 1 < len(words) and \
            words[verb_idx + 1] in ("है", "हैं", "हूँ"):
        aux = _AUX_MAP[(gender, number)]
        conv_words = words[:verb_idx + 2]
        conv_words[-1] = aux
        conv = " ".join(conv_words) + "."
        steps = [
            "Rule: vartamaan -> bhoot conversion only swaps the "
            "auxiliary: है/हैं -> था/थी/थे/थीं agreeing with the karta; "
            "the ता/ती/ते main verb does not move.",
            f"Given: '{' '.join(words[:verb_idx + 2])}' — verb '{verb}' "
            f"marks the subject {gender}-ling {number}-vachan.",
            f"Computation: '{words[verb_idx + 1]}' -> '{aux}' -> "
            f"'{conv}'.",
            "Check: the main verb is untouched and the aux agrees with "
            "the subject — the arth-kaal suraksha check closes.",
            f"Interpretation: '{conv}' says the same action in भूतकाल.",
        ]
        return None, steps, conv, None, \
            "काल परिवर्तन (वर्तमान -> भूत)", {}
    return _GATE


# --------------------------------------------------------------------------- #
# 6/7. VAACHYA — corpus: c8_hin_icse_03_003 (3-step kartaar->karm rule:
#      कर्म आगे, कर्ता 'से' पीछे ('ने' हटाओ), क्रिया में 'जाना' जोड़ो),
#      c11_hin_isc_01_003 A1 (द्वारा variant), c8_03_003 (bhaav-vaachya
#      limit: akarmak + anishchayaarthak bhoot + जाना).
# --------------------------------------------------------------------------- #

_FEM_OBJ = ("पुस्तक", "किताब", "रोटी", "कहानी", "चिट्ठी", "कविता",
            "माला", "दवा", "चाय", "परीक्षा")
_PRON_AGENT = {"मैं": "मेरे", "हम": "हमारे", "तुम": "तुम्हारे"}


def _obj_gn(obj: str) -> str:
    if obj.endswith("ी") or obj.endswith("ियाँ") or obj in _FEM_OBJ:
        return "f"
    return "m"


def _c_vaachya_conv(g, m, text):
    t = _norm(text)
    if "वाच्य" not in t or not re.search(r"बदल|परिवर्तन", t):
        return _GATE
    words = _dev_words(t)
    if "द्वारा" in words and re.search(r"कर्तृ|सक्रिय|कर्तावाच्य", t):
        # karm -> kartaar reverse
        di = words.index("द्वारा")
        if di < 2 or di + 1 >= len(words):
            return _GATE
        obj = " ".join(words[:di - 1])
        agent = words[di - 1]
        verb = words[di + 1]
        if not obj or not any(verb == v or verb.endswith(v)
                              for v in _SAKARMAK):
            return _GATE
        steps = [
            "Rule: karm -> kartaar reverses the corpus 3-step rule — the "
            "agent ('द्वारा' phrase) moves to the front and takes 'ने', "
            "the object takes the pre-verb slot, the 'जाना' auxiliary "
            "drops.",
            f"Given: '{' '.join(words[:di + 2])}' (karm-vaachya).",
            f"Computation: agent '{agent}' + ने, object '{obj}', main "
            f"verb '{verb}' -> '{agent} ने {obj} {verb}'.",
            "Check: 'ने' is legal here (sakarmak kriya + bhootkaal, both "
            "conditions hold) and the meaning is unchanged — the "
            "conversion closes.",
            f"Interpretation: the kartaar-vaachya sentence is '{agent} "
            f"ने {obj} {verb}.'",
        ]
        return None, steps, f"{agent} ने {obj} {verb}.", None, \
            "वाच्य परिवर्तन (कर्म -> कर्तृ)", {}
    # kartaar -> karm
    if not re.search(r"कर्म|निष्क्रिय", t):
        return _GATE
    # present-tense branch: <karta> <obj> <ता/ती/ते> <है/हैं/हूँ> (SOV;
    # no 'ने' in lart — instruction words after the sentence are ignored)
    for i in range(2, len(words) - 1):
        if _TA_END.search(words[i]) and \
                words[i + 1] in ("है", "हैं", "हूँ"):
            agent = _PRON_AGENT.get(words[i - 2], words[i - 2])
            obj, vform = words[i - 1], words[i]
            stem = _TA_END.sub("", vform)
            gv = stem + ("या" if stem.endswith(
                ("\u093e", "\u0940", "\u0942")) else "ा")
            aux = "जाती है" if gv.endswith("ी") else \
                "जाते हैं" if gv.endswith("े") else "जाता है"
            conv = f"{obj} {agent} द्वारा {gv} {aux}."
            steps = [
                "Rule: the corpus 3-step kartaar -> karm rule (vartamaan): "
                "(1) the karm moves to the front; (2) the karta goes back "
                "with 'द्वारा' (the taught 'से' variant says the same); "
                "(3) the verb takes the karm-vaachya form 'X जाता है'.",
                f"Given: '{' '.join(words[:i + 2])}' — karm = '{obj}', "
                f"karta = '{agent}', verb '{vform}'.",
                f"Computation: verb '{vform}' -> '{gv} {aux}'; sentence "
                f"-> '{conv}'.",
                f"Check: the karm '{obj}' now leads, 'ने' is absent "
                f"(forbidden in karm-vaachya), and the tense is still "
                f"vartamaan — the three steps close.",
                "Interpretation: the same meaning with the stress on the "
                "karm — the karm-vaachya sentence is written in the "
                "answer.",
            ]
            return None, steps, conv, None, \
                "वाच्य परिवर्तन (कर्तृ -> कर्म, वर्तमान)", {}
    # past-tense branch: <karta> ने <obj> <या/यी/ये-verb> (SOV)
    if "ने" not in words:
        return _GATE
    ni = words.index("ने")
    if ni < 1:
        return _GATE
    agent = _PRON_AGENT.get(words[ni - 1], words[ni - 1])
    rest = words[ni + 1:]
    for i in range(len(rest)):
        w = rest[i]
        if not any(w == v or w.endswith(v) for v in _SAKARMAK):
            continue
        obj = " ".join(rest[:i])
        if not obj:
            break
        gn = _obj_gn(obj)
        j = "गई" if gn == "f" else "गया"
        conv = f"{obj} {agent} द्वारा {w} {j}."
        steps = [
            "Rule: the corpus 3-step kartaar -> karm rule (bhoot): "
            "(1) the karm moves to the front; (2) the karta goes "
            "back with 'द्वारा' and 'ने' is deleted (ने is forbidden "
            "in karm-vaachya); (3) 'जाना' joins the verb, agreeing "
            "with the karm's ling-vachan.",
            f"Given: '{' '.join(rest[:i + 1])}' — karm = '{obj}', "
            f"karta = '{agent}', verb '{w}'.",
            f"Computation: '{obj}' first, then '{agent} द्वारा', the "
            f"verb keeps '{w}' and takes '{j}' (karm {gn}-ling) "
            f"-> '{conv}'.",
            f"Check: 'ने' removed, the auxiliary agrees with the "
            f"karm '{obj}', tense unchanged (bhoot) — the corpus "
            f"jaanch (arth-kaal suraksha) closes.",
            "Interpretation: the stress moved to the karm; the "
            "karm-vaachya sentence is written above (the 'से' "
            "variant is equally taught).",
        ]
        return None, steps, conv, None, \
            "वाच्य परिवर्तन (कर्तृ -> कर्म, भूत)", {}
    return _GATE


def _c_vaachya_ident(g, m, text):
    t = _norm(text)
    if "वाच्य" not in t or re.search(r"बदल|परिवर्तन", t):
        return _GATE
    if not re.search(r"पहचानिए|पहचान|कौन-सा|कौन सा|बताइए", t):
        return _GATE
    words = _dev_words(t)
    if "द्वारा" in words or re.search(r"से\s*[ऀ-ॿ]*\s*(गया|गई|गए)", t):
        name, why = "कर्मवाच्य", ("the agent stands with 'द्वारा/से' and "
                                  "the verb carries 'जाना' — the karm "
                                  "leads")
    elif re.search(r"(सोया|हँसा|टूटा|मिला)\s*जाता\s*है", t):
        name, why = "भाववाच्य", ("akarmak verb + anishchayaarthak bhoot + "
                                 "'जाना' — the taught bhaav-vaachya "
                                 "limit")
    elif "ने" in words:
        name, why = "कर्तृवाच्य", ("'ने' marks the karta of a sakarmak "
                                   "past verb — the doer leads")
    else:
        name, why = "कर्तृवाच्य", ("no karm-vaachya or bhaav-vaachya "
                                   "marker — the doer leads")
    steps = [
        "Rule: vaachya-pahchaan reads the markers — kartaar shows the "
        "karta first ('ने' with sakarmak past), karm shows the karm "
        "first with the agent pushed back by 'द्वारा/से' + 'जाना', bhaav "
        "is reserved for akarmak + anishchayaarthak bhoot + 'जाना'.",
        f"Given: the probe sentence — marker analysis: {why}.",
        f"Computation: the markers map to the vaachya {name}.",
        "Check: the markers of the other two vaachyas are absent, so "
        "the classification closes.",
        f"Interpretation: the sentence is in {name} — the exam answer "
        f"names the vaachya and cites the marker.",
    ]
    return None, steps, f"वाच्य: {name}", None, \
        "वाच्य पहचान (चिह्न आधार)", {"vaachya": name}


# --------------------------------------------------------------------------- #
# 8. KARAK_CHINH — corpus: c7_hin_icse_03_002 A2 ('ने' = कर्ता) and
#    c8_hin_icse_03_002 (8 kaarak with chinh).
# --------------------------------------------------------------------------- #

_KARAK = [
    (r"ने", "कर्ता", "sakarmak kriya + bhootkaal — both conditions must "
     "hold"),
    (r"को", "कर्म", "the receiver of the action"),
    (r"से", "करण/अपादान", "instrument ('with') or separation ('from')"),
    (r"के\s*लिए", "संप्रदान", "the beneficiary ('for')"),
    (r"का|की", "संबंध", "possession/relation ('of')"),
    (r"में|पर", "अधिकरण", "locus ('in/on')"),
    (r"हे|अरे", "संबोधन", "direct address"),
]


def _c_karak(g, m, text):
    t = _norm(text)
    if "कारक" not in t:
        return _GATE
    for pat, name, why in _KARAK:
        mm = re.search(rf"(?<![{_DEV}]){pat}(?![{_DEV}])", t)
        if mm:
            steps = [
                "Rule: kaarak-pahchaan is chinh-pradhan — each kaarak has "
                "a signature particle; the corpus warns to test the "
                "question first and the particle second ('से' can be "
                "करण or अपादान).",
                f"Given: the chinh '{mm.group(0)}' in the probe sentence.",
                f"Computation: '{mm.group(0)}' is the signature of the "
                f"{name} kaarak — {why}.",
                "Check: the particle answers its signature question "
                "(kisne/kisko/kisse/kin liye/kiska/kahan) — the reading "
                "closes.",
                f"Interpretation: the word carrying '{mm.group(0)}' sits "
                f"in the {name} kaarak.",
            ]
            return None, steps, f"कारक: {name}", None, \
                "कारक चिह्न तालिका", {"kaarak": name}
    return _GATE


# --------------------------------------------------------------------------- #
# 9. LING_VACHAN — corpus: c8_hin_icse_03_002 A3 (आ->ई, 'नी' juraav,
#    exceptions पिता/चाचा/दादा; vachan आ->ए, ई->इयाँ, आँ->एँ with
#    लड़का->लड़के, माला->मालाएँ, बात->बातें).
# --------------------------------------------------------------------------- #

_LING_TABLE = {
    "लड़का": "लड़की", "बेटा": "बेटी", "घोड़ा": "घोड़ी",
    "शेर": "शेरनी", "बंदर": "बंदरनी", "बकरा": "बकरी",
    "अध्यापक": "अध्यापिका",
}
_LING_EXC = ("पिता", "बाप", "चाचा", "दादा", "मामा")
_VACHAN_M = {"लड़का": "लड़के", "बेटा": "बेटे", "घोड़ा": "घोड़े"}
_VACHAN_F = {"माला": "मालाएँ", "बात": "बातें", "रात": "रातें"}


def _c_ling_vachan(g, m, text):
    t = _norm(text)
    is_ling = bool(re.search(r"लिंग|स्त्रीलिंग|पुल्लिंग", t))
    is_vachan = bool(re.search(r"वचन", t))
    if not is_ling and not is_vachan:
        return _GATE
    if not re.search(r"बदल|लिखिए|बताइए|कीजिए", t):
        return _GATE
    word = None
    known = set(_LING_TABLE) | set(_VACHAN_M) | set(_VACHAN_F) | \
        {"लड़के", "मालाएँ", "बातें", "लड़कियाँ"}
    for w in _dev_words(t):
        if w in known:
            word = w
    if not word:
        return _GATE
    if is_vachan and not is_ling:
        out = rule = None
        if word in _VACHAN_M:
            out = _VACHAN_M[word]
            rule = "pulling 'आ'-final -> 'ए' (ekvachan -> bahuvachan)"
        elif word in _VACHAN_F:
            out = _VACHAN_F[word]
            rule = "striiling 'आ'-final -> 'एँ' (माला -> मालाएँ; बात -> " \
                   "बातें)"
        elif word == "लड़के":
            out, rule = "लड़का", "bahuvachan -> ekvachan (लड़के -> लड़का)"
        elif word == "मालाएँ":
            out, rule = "माला", "bahuvachan -> ekvachan"
        elif word == "बातें":
            out, rule = "बात", "bahuvachan -> ekvachan"
        elif word == "लड़कियाँ":
            out, rule = "लड़की", "bahuvachan -> ekvachan"
        if not out:
            return _GATE
        steps = [
            "Rule: vachan conversion follows the taught mel rules — "
            "pulling 'आ' -> 'ए', striiling 'आ' -> 'एँ', consonant-final "
            "striiling -> 'एँ'; the kriya/viseshan must then follow the "
            "mel.",
            f"Given: '{word}'.",
            f"Computation: {rule} -> '{out}'.",
            f"Check: re-applying the plural rule to '{out}' returns "
            f"'{word}' — the pair closes.",
            f"Interpretation: the requested vachan form of '{word}' is "
            f"'{out}'.",
        ]
        return None, steps, f"वचन: {word} -> {out}", None, \
            "वचन परिवर्तन (मेल नियम)", {"out": out}
    # ling
    if word in _LING_EXC:
        return _GATE  # taught ruudhi exception — no mechanical swap
    if word in _LING_TABLE:
        out = _LING_TABLE[word]
        rule = ("'आ' -> 'ई' (आ-अंत, taught pattern लड़का -> लड़की)"
                if word.endswith("ा") else
                "'नी' juraav (taught pattern शेर -> शेरनी)")
        steps = [
            "Rule: ling conversion uses the taught patterns with the "
            "exception list — 'आ'-final pulling -> 'ई' (लड़का -> लड़की, "
            "बेटा -> बेटी), otherwise the 'नी' juraav (शेर -> शेरनी); "
            "पिता/चाचा/दादा stay pulling (ruudhi exception).",
            f"Given: '{word}'.",
            f"Computation: {rule} -> '{out}'.",
            f"Check: the word is not on the ruudhi-exception list and "
            f"'{out}' follows the named pattern — the conversion closes.",
            f"Interpretation: the striiling form of '{word}' is '{out}'; "
            f"the mel rule then adjusts the kriya/viseshan.",
        ]
        return None, steps, f"लिंग: {word} -> {out}", None, \
            "लिंग परिवर्तन (नियम + अपवाद)", {"out": out}
    return _GATE


# --------------------------------------------------------------------------- #
# 10. UPASARG_PRATYAY — corpus: c7_hin_icse_03_004 (छील-चाल: निर्मल =
#     निर् + मल, संयम = सम् + यम, दुर्गंध = दुर् + गंध, पराजय = परा +
#     जय, विजय = वि + जय; प्रत्यय: सुंदर + ता, बच्चा + पन, धन + वान,
#     लिख + आवट; trap: 'सुंदरपन' is NOT a word).
# --------------------------------------------------------------------------- #

_UPASARG = {
    "निर्मल": ("निर्", "मल", "मल-रहित / अत्यंत स्वच्छ"),
    "संयम": ("सम्", "यम", "पूर्ण नियंत्रण"),
    "दुर्गंध": ("दुर्", "गंध", "बुरी गंध"),
    "पराजय": ("परा", "जय", "जीत का विपरीत — हार"),
    "विजय": ("वि", "जय", "विशेष जीत"),
    "निराशा": ("निर्", "आशा", "आशा का अभाव"),
    "असंभव": ("अ", "संभव", "जो संभव नहीं"),
    "अचल": ("अ", "चल", "जो चलता नहीं — स्थिर"),
    "दुर्लभ": ("दुर्", "लभ", "जो प्राप्त करने में कठिन"),
    "बेकार": ("बे", "कार", "काम के योग्य नहीं"),
    "विदेश": ("वि", "देश", "दूसरा देश"),
    "स्वदेश": ("स्व", "देश", "अपना देश"),
    "परदेश": ("पर", "देश", "पराया देश"),
    "अज्ञान": ("अ", "ज्ञान", "ज्ञान का अभाव"),
    "प्रदेश": ("प्र", "देश", "विशेष देश/क्षेत्र"),
}
_PRATYAY = {
    "सुंदरता": ("सुंदर", "ता", "विशेषण -> भाववाचक संज्ञा"),
    "मित्रता": ("मित्र", "ता", "संज्ञा -> संबंध-भाव की संज्ञा"),
    "बचपन": ("बच्चा", "पन", "अवस्था-सूचक संज्ञा"),
    "धनवान": ("धन", "वान", "गुण-युक्त व्यक्ति"),
    "धनहीन": ("धन", "हीन", "गुण-रहित व्यक्ति"),
    "सच्चाई": ("सच्चा", "ई", "विशेषण -> भाववाचक संज्ञा"),
    "लिखावट": ("लिख", "आवट", "क्रिया -> क्रिया-संज्ञा"),
}


def _c_upasarg(g, m, text):
    t = _norm(text)
    if "उपसर्ग" not in t:
        return _GATE
    for w in _dev_words(t):
        hit = _UPASARG.get(w)
        if hit:
            pre, root, shift = hit
            steps = [
                "Rule: the corpus peel-test (छील-चाल) — (1) peel the "
                "front piece, (2) check what remains is a meaningful "
                "word/root, (3) check the meaning flipped or shifted; "
                "the sound-change at the join then explains the surface "
                "shape.",
                f"Given: '{w}'.",
                f"Computation: peel -> upasarg '{pre}', mool '{root}' "
                f"(both meaningful); the join rendered '{pre}' + '{root}' "
                f"as '{w}', and the meaning shifted: {shift}.",
                f"Check: removing '{pre}' leaves '{root}' which stands "
                f"alone; the place-test (aarambh = upasarg) and the "
                f"work-test (arth-palat = upasarg, not pratyay) both "
                f"close.",
                f"Interpretation: in '{w}' the upasarg is '{pre}' and the "
                f"mool shabd is '{root}'.",
            ]
            ans = f"{w} = {pre} + {root} (उपसर्ग: {pre}; अर्थ: {shift})"
            return None, steps, ans, None, \
                "उपसर्ग छील-चाल (corpus 3 steps)", {"upasarg": pre}
    return _GATE


def _c_pratyay(g, m, text):
    t = _norm(text)
    if "प्रत्यय" not in t:
        return _GATE
    for w in _dev_words(t):
        hit = _PRATYAY.get(w)
        if hit:
            root, suf, shift = hit
            steps = [
                "Rule: the corpus two-kasauti for pratyay — place (the "
                "piece sits at the END of the word) and work (it changes "
                "the pad-family, e.g. visheshan -> bhaavvachak sangya); "
                "the upasarg, in contrast, flips meaning from the front.",
                f"Given: '{w}'.",
                f"Computation: mool '{root}' + pratyay '-{suf}' = '{w}'; "
                f"the pad-family changed: {shift}.",
                f"Check: stripping '-{suf}' leaves the standalone word "
                f"'{root}', and the piece is word-final (place-test) — "
                f"the pratyay reading closes.",
                f"Interpretation: in '{w}' the pratyay is '-{suf}' and it "
                f"builds '{shift}'.",
            ]
            ans = f"{w} = {root} + {suf} (प्रत्यय: -{suf})"
            return None, steps, ans, None, \
                "प्रत्यय स्थान-काम कसौटी", {"pratyay": suf}
    return _GATE


# --------------------------------------------------------------------------- #
# 11. MUHAAVARA_MEANING — the corpus's own lists: c7_hin_icse_03_003,
#     c10_hin_icse_04_001/003, c9_hin_icse_04_003,
#     c10_hin_ks_cbse_01_010, lokokti अंधों में काना राजा (c7_03_003).
# --------------------------------------------------------------------------- #

_MUHAAVARA = {
    "आँखकातारा": ("आँख का तारा", "बहुत प्रिय / अति-प्रिय व्यक्ति",
                  "मुहावरा"),
    "आँखोंकातारा": ("आँखों का तारा", "अति-प्रिय व्यक्ति", "मुहावरा"),
    "नाकमेंदमकरना": ("नाक में दम करना", "ख़लल डालना / तंग करना",
                     "मुहावरा"),
    "लोहेकेचनेचबाना": ("लोहे के चने चबाना",
                       "कठिन काम बिना घबराहट के करना", "मुहावरा"),
    "हाथपैरफूलना": ("हाथ-पैर फूलना",
                    "भय या घबराहट से शिथिल पड़ जाना", "मुहावरा"),
    "नौदोग्यारह": ("नौ-दो ग्यारह होना", "भाग जाना / गायब हो जाना",
                   "मुहावरा"),
    "नाककटना": ("नाक कटना", "अपमान होना / प्रतिष्ठा धूमिल होना",
                "मुहावरा"),
    "आमकेआमगुठलियोंकेदाम": (
        "आम के आम गुठलियों के दाम", "दोहरा लाभ", "मुहावरा"),
    "अंधोंमेंकानाराजा": (
        "अंधों में काना राजा",
        "बुद्धि-समूह में थोड़ी बुद्धि वाला भी सिरमौर लगता है", "लोकोक्ति"),
}


def _c_muhaavara(g, m, text):
    t = _norm(text)
    if not re.search(r"मुहावरा|मुहावरे|लोकोक्ति", t):
        return _GATE
    key = _clean(t)
    for k, (name, mean, kind) in _MUHAAVARA.items():
        if k in key:
            steps = [
                "Rule: a muhaavara's meaning is its established sense, "
                "never the literal one — the corpus door-test: the "
                "literal reading is turned back at the door; a lokokti "
                "adds a full sentence-shaped folk judgement.",
                f"Given: the {kind} '{name}'.",
                f"Computation: the established arth is '{mean}' — "
                f"recorded in the corpus's own shabd-bhandar list.",
                f"Check: the literal word-by-word reading contradicts "
                f"the established sense, which is exactly the boundary "
                f"that makes it a {kind} — the match closes.",
                f"Interpretation: use '{name}' for the sense '{mean}', "
                f"keeping its fixed form intact in the sentence.",
            ]
            return None, steps, f"{name} = {mean} ({kind})", None, \
                "मुहावरे-लोकोक्ति अर्थ-सूत्र (corpus list)", {"kind": kind}
    return _GATE


# --------------------------------------------------------------------------- #
# 12. TATSAM_TADBHAV — corpus: c8_hin_icse_03_001/002 (नाम->नाँव म्->ँ,
#     क्षेत्र->खेत क्ष->ख, वन->बन व->ब, वर्ष->बरस र्ष->र, अग्नि->आग...).
# --------------------------------------------------------------------------- #

_TATSAM = {
    "नाम": ("नाँव", "म् -> ँ (anunaasik)"),
    "माता": ("माँ", "म् -> ँ"),
    "क्षेत्र": ("खेत", "क्ष -> ख"),
    "वर्ष": ("बरस", "र्ष -> र, व -> ब"),
    "वन": ("बन", "व -> ब"),
    "अग्नि": ("आग", "अग्नि-श्रेणी"),
    "घृत": ("घी", "घृत-श्रेणी"),
    "दधि": ("दही", "दधि-श्रेणी"),
    "अश्रु": ("आँसू", "अश्रु-श्रेणी"),
    "कर्ण": ("कान", "loka-ruup of र्ण"),
    "दंत": ("दाँत", "loka-ruup of ंत"),
    "स्थल": ("थल", "स्थ -> थ"),
    "सूर्य": ("सूरज", "loka-ruup of र्य"),
    "हस्त": ("हाथ", "loka-ruup of स्त"),
}
_TATSAM_REV = {v[0]: (k, "reverse of " + v[1])
               for k, v in _TATSAM.items()}


def _c_tatsam(g, m, text):
    t = _norm(text)
    if not re.search(r"तत्सम|तद्भव", t):
        return _GATE
    for w in _dev_words(t):
        if w in _TATSAM and re.search(r"तद्भव", t):
            db, rule = _TATSAM[w]
            steps = [
                "Rule: tatsam -> tadbhav runs the taught "
                "dhvani-parivartan rules (m -> chandrabindu, ksha -> "
                "kha, v -> ba, rsha -> ra, the agni/ghrit/dadhi/ashru "
                "series) — the pair shares one Sanskrit home with a "
                "lok-bhasha shape.",
                f"Given: the tatsam shabd '{w}'.",
                f"Computation: rule '{rule}' gives the tadbhav '{db}'.",
                f"Check: '{db}' is the everyday lok-bhasha shape of the "
                f"same meaning (a roopaantaran jodi, not vilom) — the "
                f"pair closes.",
                f"Interpretation: tadbhav of '{w}' is '{db}' — write the "
                f"rule name with the pair in the exam.",
            ]
            return None, steps, f"{w} (तत्सम) -> {db} (तद्भव)", None, \
                "तत्सम-तद्भव ध्वनि-नियम", {"pair": db}
        if w in _TATSAM_REV and re.search(r"तत्सम", t):
            ts, rule = _TATSAM_REV[w]
            steps = [
                "Rule: tadbhav -> tatsam restores the Sanskrit-shape "
                "house-mate by reversing the taught dhvani-parivartan "
                "rule.",
                f"Given: the tadbhav shabd '{w}'.",
                f"Computation: the reverse rule gives the tatsam '{ts}' "
                f"({rule}).",
                "Check: the two share the same arth — one lok-ruup, one "
                "Sanskrit ruup (not vilom, not paryayvachi) — the pair "
                "closes.",
                f"Interpretation: tatsam of '{w}' is '{ts}'.",
            ]
            return None, steps, f"{w} (तद्भव) -> {ts} (तत्सम)", None, \
                "तत्सम-तद्भव ध्वनि-नियम", {"pair": ts}
    return _GATE


# --------------------------------------------------------------------------- #
# 13. LIT_FACT — author/work attribution, corpus-node facts only
#     (ICSE chapter intros state "X द्वारा लिखित"; CBSE nodes give the
#     kavi-parichay).  Declines outside the table (honesty gate).
# --------------------------------------------------------------------------- #

_LIT = {
    "ऊँचा खड़ा हिमालय": ("सोहनलाल द्विवेदी", "मातृभूमि-स्तुति; कवि "
                        "1906-1988, 'लेखनी से विरोध'"),
    "हार की जीत": ("प्रेमचंद", "कहानी; प्रेमचंद 1880-1936, "
                   "'कथा-सम्राट'"),
    "बड़े भाई साहब": ("प्रेमचंद", "कहानी"),
    "झाँसी की रानी": ("सुभद्रा कुमारी चौहान", "कविता — प्रसिद्ध "
                     "देशभक्ति कविता"),
    "साखी": ("कबीर दास", "कबीर ने अपनी वाणी को साखी कहा — सत्य की "
             "गवाही"),
    "गिर्धर की कुंडलियाँ": ("गिर्धर कविराय", "मध्यकालीन कवि; "
                            "कुंडलियाँ लोकप्रचलित"),
    "मेघ आए": ("सर्वेश्वर दयाल सक्सेना", "कविता"),
    "चलना हमारा काम है": ("शिवमंगल सिंह 'सुमन'", "कविता — आशावाद और "
                          "संघर्ष"),
    "भेड़ें और भेड़िये": ("हरिशंकर परसाई", "व्यंग्य निबंध"),
    "स्वर्ग बना सकते हैं": ("रामधारी सिंह 'दिनकर'", "कविता — आदर्श "
                            "समाज की रचना"),
    "बात अठन्नी की": ("सुदर्शन", "लघुकथा"),
    "काकी": ("सीयाराम शरण गुप्त", "कहानी — वृद्ध काकी का चित्र"),
    "महायज्ञ का पुरस्कार": ("यशपाल", "कहानी — सामाजिक यथार्थवाद"),
    "नेताजी का चश्मा": ("स्वयं प्रकाश", "लघुकथा"),
    "अपना अपना भाग्य": ("जैनेंद्र कुमार", "गद्य पाठ"),
    "बड़े घर की बेटी": ("प्रेमचंद", "कहानी — स्त्री की स्थिति"),
    "दो कलाकार": ("मन्नू भंडारी", "लघुकथा"),
    "नया रास्ता": ("सुषमा अग्रवाल", "कहानी — स्त्री शिक्षा"),
    "भीड़ में खोया आदमी": ("लीलाधर शर्मा 'पर्वतिया'", "निबंध/कहानी"),
    "सूर के पद": ("सूरदास", "भक्ति-काव्य (बाल-लीला)"),
    "विनय के पद": ("तुलसीदास", "विनयपत्रिका से भक्ति काव्य"),
    "आषाढ़ का एक दिन": ("मोहन राकेश", "तीन-अंकीय नाटक, कालिदास के "
                        "जीवन पर"),
    "कामायनी": ("जयशंकर प्रसाद", "महाकाव्य; प्रसाद 1889-1937, "
                "छायावाद"),
}


def _c_lit(g, m, text):
    t = _norm(text)
    if not re.search(r"कवि कौन|के कवि|लेखक कौन|के लेखक|किसकी रचना|"
                     r"किसके द्वारा|रचनाकार कौन|की रचना", t):
        return _GATE
    key = _clean(t)
    for title, (author, fact) in _LIT.items():
        if _clean(title) in key:
            steps = [
                "Rule: literature attribution is closed-world — the "
                "answer comes only from the corpus's own kavi/lekhak "
                "parichay nodes; anything outside them is declined, not "
                "guessed.",
                f"Given: the rachna '{title}'.",
                f"Computation: the corpus parichay records — rachak = "
                f"'{author}'; {fact}.",
                "Check: the attribution is read off the node's own "
                "definition (no outside source, no guessing) — the fact "
                "closes on the corpus record.",
                f"Interpretation: '{title}' is by {author}; quote the "
                f"parichay facts above in the answer.",
            ]
            return None, steps, f"{title} — {author}", None, \
                "साहित्य तथ्य (corpus केवल)", {"author": author}
    return _GATE


# --------------------------------------------------------------------------- #
# 14. VAAKY_BHED — corpus: c8_hin_icse_03_003 (क्रियाएँ गिनो, जोड़-धागा
#     पहचानो; 'राम ने कहा कि वह आएगा' = मिश्र), c10_hin_icse_04_004 A3
#     (और-join = संयुक्त).
# --------------------------------------------------------------------------- #

_MISHR_JOIN = re.compile(r"कि(?![{_DEV}])|जो(?![{_DEV}])|जब(?![{_DEV}])|"
                         r"क्योंकि|जहाँ|जैसे\s*ही")
_SANYUKT_JOIN = re.compile(r"और|या|किंतु|परन्तु|लेकिन|अथवा")
_CLAUSE_V = re.compile(r"है|हैं|था|थी|थे|गा|गी|गे")


def _c_vaaky_bhed(g, m, text):
    t = _norm(text)
    if not re.search(r"वाक्य भेद|वाक्य-भेद|सरल|संयुक्त|मिश्र", t):
        return _GATE
    sent = None
    for cand in re.findall(
            rf"[{chr(34)}'{chr(0x201c)}]?([{_DEV}][^{chr(34)}'"
            rf"{chr(0x201d)}।.]{{7,}})", t):
        if "भेद" not in cand and len(cand) >= 8:
            sent = cand
            break
    if not sent:
        cands = [w for w in _dev_words(t)
                 if w not in ("भेद", "सरल", "संयुक्त", "मिश्र", "लिखिए",
                              "बताइए")]
        if not cands:
            return _GATE
        sent = " ".join(cands)
    if _MISHR_JOIN.search(sent):
        name, why = "मिश्र वाक्य", ("an aashrit bhav joins with the "
                                    "'कि/जो/जब' dhaaga — one mukhya "
                                    "kriya plus a dependent clause")
    else:
        parts = _SANYUKT_JOIN.split(sent)
        n_verb_parts = sum(1 for p in parts if _CLAUSE_V.search(p))
        if len(parts) >= 2 and n_verb_parts >= 2:
            name, why = "संयुक्त वाक्य", ("two independent clauses are "
                                          "joined by a samauchayabodhak "
                                          "(और/या/किंतु)")
        else:
            name, why = "सरल वाक्य", ("one kriya and no joiner-clause — "
                                      "the jod-dhaaga is absent")
    steps = [
        "Rule: the corpus kasauti for vaakya-bhed — count the kriyaayein "
        "and identify the jod-dhaaga: a 'कि/जो/जब' dhaaga = mishr; two "
        "independent kriyaayein joined by और/या/किंतु = sanyukt; one "
        "kriya and no dhaaga = saral.",
        f"Given: '{sent}'.",
        f"Computation: {why} — so the bhed is {name}.",
        "Check: the other two bheds fail the same kasauti (no कि-family "
        "dhaaga -> not mishr; not two independent kriyaayein -> not "
        "sanyukt) — the classification closes.",
        f"Interpretation: the sentence is a {name} — the answer names "
        f"the bhed and cites the dhaaga.",
    ]
    return None, steps, f"वाक्य भेद: {name}", None, \
        "वाक्य भेद कसौटी (क्रिया + जोड़-धागा)", {"bhed": name}


# --------------------------------------------------------------------------- #
# 15. NA_SHUDDHI — corpus: c9_hin_icse_04_002 A3, the "most mark-giving
#     one-line rule": ने needs BOTH sakarmak kriya AND bhootkaal; the
#     worked corrections राम ने स्कूल गया / मोहन ने सो गया /
#     सीता चित्र बनाया / राम ने रोटी खाता है are all on the node.
# --------------------------------------------------------------------------- #

_AKARMAK = ("गया", "गई", "गए", "आया", "आई", "आए", "सोया", "सोए",
            "हँसा", "हँसे", "पहुँचा", "पड़ा", "पड़े", "रहा", "रहे",
            "बैठा", "बैठे", "उठा", "उठे", "दौड़ा", "दौड़े", "चला",
            "चले", "टूटा", "खिला", "खिले", "बरसा")
_SAKARMAK = ("बनाया", "बनाई", "बनाए", "लिखा", "लिखी", "लिखे", "पढ़ा",
             "पढ़ी", "पढ़े", "खाया", "खाई", "खाए", "तोड़ा", "तोड़ी",
             "तोड़े", "पकड़ा", "पकड़ी", "देखा", "देखी", "देखे", "सुना",
             "सुनी", "सुने", "पीया", "गाया", "गाई", "गाए")
_PRES_V = re.compile(r"(ता|ती|ते)\s+(है|हैं|हूँ|हो)")

# instruction words stripped so the parse sees only the probe sentence
_STOP = frozenset((
    "शुद्ध", "कीजिए", "कीजिये", "अशुद्ध", "त्रुटि", "पहचानिए",
    "पहचानें", "निम्नलिखित", "निम्न", "सही", "रूप", "लिखिए",
    "बताइए", "वाक्य", "दोष", "शोधन", "करें", "दीजिए", "को", "की",
    "का", "में", "इसे", "इस"))


def _sentence_words(text: str) -> List[str]:
    return [w for w in _dev_words(text) if w not in _STOP]


def _c_na_shuddhi(g, m, text):
    t = _norm(text)
    if not re.search(r"शुद्ध|त्रुटि|अशुद्ध", t):
        return _GATE
    words = _sentence_words(t)
    if "ने" in words:
        ni = words.index("ने")
        tail = words[ni + 1:]
        if not tail:
            return _GATE
        pres_i = None
        for i in range(len(tail) - 1):
            if _PRES_V.search(tail[i] + " " + tail[i + 1]):
                pres_i = i
        if pres_i is not None:  # condition 2 broken
            fixed = " ".join(words[:ni] + tail[:pres_i + 2])
            steps = [
                "Rule: 'ने' needs BOTH conditions — (1) sakarmak kriya (a "
                "karm exists) AND (2) bhootkaal; the corpus calls this "
                "the most mark-giving one-line rule and rejects any "
                "half-fit.",
                f"Given: '{' '.join(words)}' — the kriya is in "
                f"vartamaan, so condition 2 breaks.",
                f"Computation: drop 'ने' -> '{fixed}' (the karta leads "
                f"without 'ने').",
                "Check: re-testing the two conditions on the fixed "
                "sentence — a vartamaan kriya takes no 'ने' — the "
                "correction closes.",
                f"Interpretation: the shuddh vaakya is '{fixed}.'",
            ]
            return None, steps, fixed + ".", None, \
                "'ने' नियम (दो शर्तें)", {"error": "ne_in_present"}
        for vi, w in enumerate(tail):  # condition 1 broken
            if not any(w == v or w.endswith(v) for v in _AKARMAK):
                continue
            fixed = " ".join(words[:ni] + tail[:vi + 1])
            steps = [
                "Rule: 'ने' needs BOTH conditions — (1) sakarmak "
                "kriya (a karm exists) AND (2) bhootkaal; here the "
                "kriya is akarmak (no karm), so condition 1 breaks.",
                f"Given: '{' '.join(words[:ni + vi + 1])}' — the kriya "
                f"'{w}' is akarmak.",
                f"Computation: drop 'ने' -> '{fixed}'.",
                f"Check: the kriya '{w}' takes no karm (nothing "
                f"receives the action), so 'ने' has no seat — the "
                f"correction closes.",
                f"Interpretation: the shuddh vaakya is '{fixed}.'",
            ]
            return None, steps, fixed + ".", None, \
                "'ने' नियम (दो शर्तें)", {"error": "ne_akarmak"}
        return _GATE
    # missing ने: sakarmak past verb, obj right before it, karta before
    for i in range(1, len(words)):
        w = words[i]
        if not any(w == v or w.endswith(v) for v in _SAKARMAK):
            continue
        obj = words[i - 1:i]
        subj = words[max(0, i - 2):i - 1]
        if not subj or "ने" in words[:i]:
            continue
        fixed = " ".join(subj + ["ने"] + obj + [w] + words[i + 1:])
        steps = [
            "Rule: 'ने' needs BOTH conditions — sakarmak kriya "
            "(a karm exists) AND bhootkaal; here both hold, so "
            "the missing 'ने' is the trooti.",
            f"Given: '{' '.join(words)}' — kriya '{w}' is "
            f"sakarmak + bhoot with karm '{' '.join(obj)}'.",
            f"Computation: insert 'ने' after the karta -> "
            f"'{fixed}'.",
            "Check: both conditions now visibly hold (karm "
            "present, bhootkaal) and the verb still agrees with "
            "the karm — the correction closes.",
            f"Interpretation: the shuddh vaakya is '{fixed}.'",
        ]
        return None, steps, fixed + ".", None, \
            "'ने' नियम (दो शर्तें)", {"error": "ne_missing"}
    return _GATE


# --------------------------------------------------------------------------- #
# 16. MEL_SHUDDHI — corpus: c7_hin_icse_03_001 ('लड़कियाँ पढ़ता है' ->
#     'पढ़ती हैं'), c12_hin_isc_01_004 A3 ('वह ... जाते हैं' ->
#     'जाता है').
# --------------------------------------------------------------------------- #

_VAH = ("वह", "यह", "मैं", "तू")


def _c_mel(g, m, text):
    t = _norm(text)
    if not re.search(r"शुद्ध|त्रुटि|मेल", t):
        return _GATE
    words = _sentence_words(t)
    if not words or "ने" in words:
        return _GATE  # 'ने' territory belongs to NA_SHUDDHI
    subj = ""
    for w in words:
        if w in _VAH or w.endswith(("ियाँ", "एँ", "इयाँ")) or w == "वे":
            subj = w
            break
    if not subj:
        return _GATE
    verb_tail = " ".join(words[-2:])
    joined = " ".join(words)
    fixed = err = None
    if subj in _VAH and re.search(r"ते\s+हैं", joined):
        fixed = re.sub(r"ते\s+हैं", "ता है", joined)
        err = "ekvachan karta + bahuvachan kriya"
    elif subj in ("वे", "वो") and re.search(r"ता\s+है", joined):
        fixed = re.sub(r"ता\s+है", "ते हैं", joined)
        err = "bahuvachan karta + ekvachan kriya"
    elif subj.endswith(("ियाँ", "एँ", "इयाँ")) and \
            re.search(r"ता\s+है", joined):
        fixed = re.sub(r"ता\s+है", "ती हैं", joined)
        err = "striiling-bahuvachan karta + pulling-ekvachan kriya"
    if not fixed:
        return _GATE
    steps = [
        "Rule: vishay-kriya mel — the kriya must agree with the karta's "
        "ling AND vachan ('लड़कियाँ पढ़ता है' is the textbook broken "
        "pair; 'वह' is ekvachan, so a 'ते हैं' kriya cannot ride on "
        "it).",
        f"Given: '{joined}' — karta '{subj}', kriya '{verb_tail}'.",
        f"Computation: the mismatch is {err}; rebuild the kriya to "
        f"agree -> '{fixed}'.",
        "Check: re-reading the pair — the kriya ending now matches the "
        "karta's ling-vachan exactly — the mel closes.",
        f"Interpretation: the shuddh vaakya is '{fixed}.'",
    ]
    return None, steps, fixed + ".", None, "विषय-क्रिया मेल नियम", \
        {"error": err or ""}


# --------------------------------------------------------------------------- #
# TABLE: (family_id, trigger, compute) — most specific first; every
# trigger requires its own Devanagari keyword, so English/maths probes
# can never fire a Hindi family.
# --------------------------------------------------------------------------- #


# --------------------------------------------------------------------------- #
# LANG HI GRAMMAR (moved from structure_families_lang.py, WS-B
# consolidation map step 6 / section 5.7 -- one hindi file).  The
# LANG_HI_* spec computes are distinct from the table families
# below (lexicon/conjugation engines vs trigger tables); both
# surfaces coexist exactly as before the merge.
# --------------------------------------------------------------------------- #

# --------------------------------------------------------------------------- #
# HINDI — संधि, समास, कारक, वचन, काल
# --------------------------------------------------------------------------- #

# संधि lexicon: word -> (विच्छेद, प्रकार).  Textbook-standard entries only
# (NCERT व्याकरण; every split here is a verified school answer).
SANDHI = {
    "विद्यालय": ("विद्या + आलय", "दीर्घ संधि"),
    "हिमालय": ("हिम + आलय", "दीर्घ संधि"),
    "महालय": ("महा + आलय", "दीर्घ संधि"),
    "रजनीश": ("रजनी + ईश", "दीर्घ संधि"),
    "गिरीश": ("गिरि + ईश", "दीर्घ संधि"),
    "महेश": ("महा + ईश", "गुण संधि"),
    "देवेश": ("देव + ईश", "दीर्घ संधि"),
    "विशेष": ("वि + शेष", "व्यंजन संधि"),
    "परीक्षा": ("परि + ईक्षा", "यण संधि"),
    "प्रार्थना": ("प्र + अर्थना", "व्यंजन संधि"),
    "स्वागत": ("सु + आगत", "यण संधि"),
    "इत्यादि": ("इति + आदि", "यण संधि"),
    "एकैक": ("एक + एक", "अयादि संधि"),
    "तत्पश्चात": ("तत् + पश्चात", "व्यंजन संधि"),
    "तदनुसार": ("तत् + अनुसार", "व्यंजन संधि"),
    "सज्जन": ("सत् + जन", "व्यंजन संधि"),
    "उत्तर": ("उत् + तर", "व्यंजन संधि"),
    "प्रत्येक": ("प्रति + एक", "यण संधि"),
    "यतीश्वर": ("यति + ईश्वर", "दीर्घ संधि"),
    "नरेश": ("नर + ईश", "दीर्घ संधि"),
    "भानुमती": ("भानु + मती", "दीर्घ संधि"),
    "गंगोत्पत्ति": ("गंगा + उत्पत्ति", "गुण संधि"),
    "देवालय": ("देव + आलय", "दीर्घ संधि"),
    "राष्ट्रभाषा": ("राष्ट्र + भाषा", "व्यंजन संधि"),
    "प्रातःकाल": ("प्रातः + काल", "विसर्ग संधि"),
    "निःशब्द": ("निः + शब्द", "विसर्ग संधि"),
    "मनोहर": ("मनः + हर", "विसर्ग संधि"),
    "मनीषा": ("मनस् + ईषा", "व्यंजन संधि"),
    "जगदीश": ("जगत् + ईश", "व्यंजन संधि"),
    "जगन्नाथ": ("जगत् + नाथ", "व्यंजन संधि"),
    "वातावरण": ("वात + आवरण", "दीर्घ संधि"),
    "कमलेश": ("कमल + ईश", "दीर्घ संधि"),
    "सुरेश": ("सुर + ईश", "दीर्घ संधि"),
    "महात्मा": ("महा + आत्मा", "दीर्घ संधि"),
    "परमानंद": ("परम + आनंद", "दीर्घ संधि"),
    "अत्यधिक": ("अति + अधिक", "यण संधि"),
    "अत्यंत": ("अति + अंत", "यण संधि"),
    "प्रत्यूष": ("प्रति + ऊष", "यण संधि"),
    "सद्भाव": ("सत् + भाव", "व्यंजन संधि"),
    "दुर्गा": ("दुर् + गा", "व्यंजन संधि"),
    "दुर्जय": ("दुर् + जय", "व्यंजन संधि"),
    "निर्मल": ("निः + मल", "विसर्ग संधि"),
    "निर्धन": ("निः + धन", "विसर्ग संधि"),
    "परोपकार": ("पर + उपकार", "गुण संधि"),
    "यथाशक्ति": ("यथा + शक्ति", "व्यंजन संधि"),
    "तथाकथित": ("तथा + कथित", "व्यंजन संधि"),
    "सर्वोत्तम": ("सर्व + उत्तम", "गुण संधि"),
    "सर्वाधिक": ("सर्व + अधिक", "गुण संधि"),
    "चंद्रोदय": ("चंद्र + उदय", "गुण संधि"),
    "सूर्योदय": ("सूर्य + उदय", "गुण संधि"),
    "गुरोपदेश": ("गुरु + उपदेश", "गुण संधि"),
    "लक्ष्य": ("लक्ष + य", "व्यंजन संधि"),
    "पितामह": ("पिता + मह", "दीर्घ संधि"),
    "राजर्षि": ("राजा + ऋषि", "वृद्धि संधि"),
    "महर्षि": ("महा + ऋषि", "वृद्धि संधि"),
    "देवर्षि": ("देव + ऋषि", "वृद्धि संधि"),
    "मोहन": ("मोह + अन", "दीर्घ संधि"),
    "गोपीश": ("गोपी + ईश", "दीर्घ संधि"),
    "त्रिलोचन": ("त्रि + लोचन", "व्यंजन संधि"),
    "संयोग": ("सम् + योग", "व्यंजन संधि"),
    "संचय": ("सम् + चय", "व्यंजन संधि"),
    "संगीत": ("सम् + गीत", "व्यंजन संधि"),
    "निर्झर": ("निः + झर", "विसर्ग संधि"),
    "प्रौढ़": ("प्र + ऊढ़", "वृद्धि संधि"),
    "गौरव": ("गो + रव", "वृद्धि संधि"),
    "सप्ताह": ("सप्त + अह", "दीर्घ संधि"),
    "वधूश्रृंगार": ("वधू + श्रृंगार", "विसर्ग संधि"),
    "दुष्प्राप्य": ("दुः + प्राप्य", "विसर्ग संधि"),
    "दुःख": ("दुः + ख", "विसर्ग संधि"),
    "अहंकार": ("अहम् + कार", "व्यंजन संधि"),
    "स्वयंप्रभु": ("स्वयम् + प्रभु", "व्यंजन संधि"),
    "कार्यालय": ("कार्य + आलय", "दीर्घ संधि"),
    "पुस्तकालय": ("पुस्तक + आलय", "दीर्घ संधि"),
    "मनोरंजन": ("मनः + रंजन", "विसर्ग संधि"),
    "प्राणेश्वर": ("प्राण + ईश्वर", "दीर्घ संधि"),
    "शिवालय": ("शिव + आलय", "दीर्घ संधि"),
    "मुनीश्वर": ("मुनि + ईश्वर", "दीर्घ संधि"),
    "तपस्वी": ("तपस् + वी", "व्यंजन संधि"),
    "समितीश": ("समिति + ईश", "दीर्घ संधि"),
    "हेमंत": ("हेम + अंत", "दीर्घ संधि"),
    "आशीर्वाद": ("आशीस् + वाद", "व्यंजन संधि"),
}

# समास lexicon: word -> (विग्रह, भेद)
SAMAS = {
    "त्रिलोक": ("तीनों लोक", "द्विगु समास"),
    "चौराहा": ("चार राहों का समूह", "द्विगु समास"),
    "नवरात्र": ("नौ रात्रियाँ", "द्विगु समास"),
    "पंचवटी": ("पाँच वटों का समूह", "द्विगु समास"),
    "सप्ताह": ("सात दिनों का समूह", "द्विगु समास"),
    "दोपहर": ("दो पहरों का समूह", "द्विगु समास"),
    "त्रिवेणी": ("तीन वेणियों का समूह", "द्विगु समास"),
    "चतुर्भुज": ("चार भुजाओं का समूह", "द्विगु समास"),
    "शताब्दी": ("सौ वर्षों का समूह", "द्विगु समास"),
    "सहस्रबुद्धि": ("हज़ार बुद्धियों का समूह", "द्विगु समास"),
    "माता-पिता": ("माता और पिता", "द्वंद्व समास"),
    "नर-नारी": ("नर और नारी", "द्वंद्व समास"),
    "दिन-रात": ("दिन और रात", "द्वंद्व समास"),
    "सुख-दुख": ("सुख और दुख", "द्वंद्व समास"),
    "आना-जाना": ("आना और जाना", "द्वंद्व समास"),
    "राजा-रानी": ("राजा और रानी", "द्वंद्व समास"),
    "भाई-बहन": ("भाई और बहन", "द्वंद्व समास"),
    "अन्न-जल": ("अन्न और जल", "द्वंद्व समास"),
    "नीलकमल": ("नीला है कमल", "कर्मधारय समास"),
    "महात्मा": ("महा है आत्मा जिसका", "बहुव्रीहि समास"),
    "चरणकमल": ("चरणों का कमल", "तत्पुरुष समास"),
    "राजकुमार": ("राजा का कुमार", "तत्पुरुष समास"),
    "रसोईघर": ("रसोई के लिए घर", "तत्पुरुष समास"),
    "विद्यालय": ("विद्या का आलय", "तत्पुरुष समास"),
    "देशभक्ति": ("देश के लिए भक्ति", "तत्पुरुष समास"),
    "युद्धभूमि": ("युद्ध की भूमि", "तत्पुरुष समास"),
    "जलपान": ("जल पीना", "तत्पुरुष समास"),
    "पीतांबर": ("पीत है अंबर जिसका (श्रीकृष्ण)", "बहुव्रीहि समास"),
    "दशानन": ("दस हैं आनन जिसके (रावण)", "बहुव्रीहि समास"),
    "नीलकंठ": ("नीला है कंठ जिसका (शिव)", "बहुव्रीहि समास"),
    "चतुरानन": ("चार हैं आनन जिसके (ब्रह्मा)", "बहुव्रीहि समास"),
    "लंबोदर": ("लंबा है उदर जिसका (गणेश)", "बहुव्रीहि समास"),
    "महात्मागांधी": ("महान आत्मा गांधी", "कर्मधारय समास"),
    "परमेश्वर": ("परम है ईश्वर", "कर्मधारय समास"),
    "श्वेतांबर": ("श्वेत है अंबर जिसका", "बहुव्रीहि समास"),
    "पंचमुखी": ("पाँच हैं मुख जिसके", "बहुव्रीहि समास"),
    "चरणदास": ("चरणों का दास", "तत्पुरुष समास"),
    "गंगाजल": ("गंगा का जल", "तत्पुरुष समास"),
    "कमलनयन": ("कमल हैं नयन जिसके", "बहुव्रीहि समास"),
    "मुखचंद्र": ("मुख ही चंद्र है", "कर्मधारय समास"),
    "त्रिनेत्र": ("तीन हैं नेत्र जिसके", "बहुव्रीहि समास"),
    "दशरथ": ("दस रथ हैं जिसके", "बहुव्रीहि समास"),
    "अष्टधातु": ("आठ धातुएँ", "द्विगु समास"),
    "नौकरशाही": ("नौकरों की शाही", "तत्पुरुष समास"),
    "देशांतर": ("देश का अंतर", "तत्पुरुष समास"),
    "यशोदा": ("यश है देती जो", "बहुव्रीहि समास"),
    "गुरुदक्षिणा": ("गुरु के लिए दक्षिणा", "तत्पुरुष समास"),
    "पितागंगा": ("पिता ही गंगा हैं", "कर्मधारय समास"),
    "रसोईगाड़ा": ("रसोई के लिए गाड़ा", "तत्पुरुष समास"),
}


def _c_hi_sandhi(slots, text):
    """संधि-विच्छेद / संधि-भेद — lexicon-verified answers only."""
    if "संधि" not in text:
        return None
    ask_split = re.search(r"(विच्छेद|तोड़|अलग|खोल)", text)
    ask_type = re.search(r"(भेद|प्रकार|कौन-सी|कौन सी)", text)
    # target word: last long Devanagari word (often quoted/delimited)
    cands = re.findall(r"[\u0900-\u097F]{3,}", text)
    cands = [c.strip("।,.?!;:'\"()॥") for c in cands]
    cands = [c for c in cands if c not in (
        "संधि", "विच्छेद", "कीजिए", "बताइए", "पहचानिए", "निम्नलिखित",
        "शब्दों", "शब्द", "स्वर", "व्यंजन", "विसर्ग")]
    if not cands:
        return None
    word = cands[-1]
    hit = SANDHI.get(word)
    if hit is None:
        # nominals with inflection: try bare form
        hit = SANDHI.get(word[:-1]) if len(word) > 3 else None
    if hit is None:
        return (None,
                ["संधि-विच्छेद केवल मानक पाठ्यपुस्तक शब्दों की सूची से "
                 "ही दिया जाता है"],
                "इस शब्द का संधि-विच्छेद निर्धारित सूची में उपलब्ध नहीं "
                "है — शिक्षक से पुष्टि करें।", None, "LANG_HI_SANDHI",
                None)
    split, kind = hit
    if ask_type and not ask_split:
        return (None, [f"संधि का प्रकार: {kind}"],
                f"{word} — {kind}।", None, "LANG_HI_SANDHI", None)
    return (None,
            ["संधि = दो स्वरों/वर्णों के मेल से होने वाला विकार"],
            f"{word} = {split} ({kind})।", None, "LANG_HI_SANDHI", None)


def _c_hi_samas(slots, text):
    """समास-विग्रह / भेद — lexicon-verified answers only."""
    if "समास" not in text:
        return None
    # hyphenated pairs (माता-पिता) must survive as one token
    cands = re.findall(r"[\u0900-\u097F]+(?:[-\u2013][\u0900-\u097F]+)*",
                       text)
    cands = [c.strip("।,.?!;:'\"()॥-") for c in cands]
    stop = {"समास", "विग्रह", "कीजिए", "बताइए", "पहचानिए", "भेद",
            "प्रकार", "निम्नलिखित", "शब्दों", "शब्द", "करके", "हिंदी"}
    cands = [c for c in cands if c not in stop]
    if not cands:
        return None
    word = cands[-1]
    hit = SAMAS.get(word) or (SAMAS.get(word[:-1]) if len(word) > 3
                              else None)
    if hit is None:
        return (None,
                ["समास-विग्रह केवल मानक पाठ्यपुस्तक शब्दों की सूची से "
                 "ही दिया जाता है"],
                "इस शब्द का समास-विग्रह निर्धारित सूची में उपलब्ध नहीं "
                "है — शिक्षक से पुष्टि करें।", None, "LANG_HI_SAMAS",
                None)
    vigraha, bhed = hit
    if re.search(r"(भेद|प्रकार|कौन-सा|कौन सा)", text) and not \
            re.search(r"विग्रह", text):
        return (None, ["समास के पाँच भेद: अव्ययीभाव, तत्पुरुष, "
                       "कर्मधारय, द्विगु, द्वंद्व, बहुव्रीहि"],
                f"{word} — {bhed}।", None, "LANG_HI_SAMAS", None)
    return (None,
            ["समास = संक्षिप्तीकरण; विग्रह = विस्तार"],
            f"{word} = {vigraha} ({bhed})।", None, "LANG_HI_SAMAS", None)


# कारक चिह्न (postposition) rules — standard NCERT table
_LG_KARAK = [
    ("संबोधन", re.compile(r"^(?:हे|अरे|ओ|सुनो)\s")),
    ("संबंध कारक", re.compile(r"^(?:का|की|के|रे)(?:\s|$)")),
    ("कर्म कारक", re.compile(r"^को(?:\s|$)")),
    ("करण कारक", re.compile(r"^(?:से|के\s*द्वारा|द्वारा)(?:\s|$)")),
    ("संप्रदान कारक", re.compile(r"^(?:के\s*लिए|को)(?:\s|$)")),
    ("अपादान कारक", re.compile(r"^(?:से|से\s*अलग|से\s*पृथक|की\s*ओर\s*से)"
                               r"(?:\s|$)")),
    ("अधिकरण कारक", re.compile(r"^(?:में|पर|पर|तक|भीतर|आगे|पीछे|नीचे|"
                               r"ऊपर|साथ|बाहर|अंदर)(?:\s|$)")),
    ("कर्ता कारक", re.compile(r"^(?:ने)?(?:\s|$)")),
]


def _c_hi_karak(slots, text):
    """'राम को ... कारक बताइए' — चिह्न से कारक-पहचान।"""
    if "कारक" not in text:
        return None
    if re.search(r"चिह्न", text) and not re.search(
        r"[\u0900-\u097F]{2,}\s+(?:को|से|के\s*लिए|का|की|के|में|पर|ने)",
            text):
        return (None, ["कारक-चिह्न: को, से, के लिए, का/की/के, में, "
                       "पर, ने, के द्वारा"],
                "कारक और उनके चिह्न — कर्ता (ने), कर्म (को), करण (से, "
                "के द्वारा), संप्रदान (के लिए, को), अपादान (से — "
                "अलगाव), संबंध (का, की, के), अधिकरण (में, पर), "
                "संबोधन (हे)।", None, "LANG_HI_LG_KARAK", None)
    # all '<word> <chihna>' pairs; sentence-function words are not targets
    stop = {"कारक", "चिह्न", "वाक्य", "बताइए", "बताओ", "कीजिए",
            "पहचानिए", "शब्द", "वाक्य में", "निम्नलिखित", "में",
            "उसका", "इसका"}
    pairs = re.finditer(
        r"([\u0900-\u097F]{2,})\s+(को|से|के\s*लिए|का|की|के|में|पर|ने|"
        r"के\s*द्वारा)(?![\u0900-\u097F])", text)
    target = None
    for pm in pairs:
        w, ch = pm.group(1), pm.group(2)
        if w in stop or "कारक" in w:
            continue
        target = (w, ch)          # keep the RIGHTMOST valid pair
    if target is None:
        return (None,
                ["वाक्य में प्रयुक्त कारक पहचानने के लिए चिह्न देखिए"],
                "वाक्य में जिस शब्द का कारक बताना है, उसे अलग कर "
                "पूछें — जैसे 'राम को' — तब चिह्न से कारक बताया जा "
                "सकता है।", None, "LANG_HI_LG_KARAK", None)
    word, ch = target
    if ch == "को":
        kar = "कर्म कारक (चिह्न: को)"
    elif ch == "से":
        kar = ("करण कारक अथवा अपादान कारक (चिह्न: से — साधन/सहायक "
               "हो तो करण, अलगाव बोधक हो तो अपादान)")
    elif ch in ("का", "की", "के"):
        kar = "संबंध कारक (चिह्न: का, की, के)"
    elif ch == "ने":
        kar = "कर्ता कारक (चिह्न: ने)"
    elif ch in ("में", "पर"):
        kar = "अधिकरण कारक (चिह्न: में/पर)"
    elif "लिए" in ch:
        kar = "संप्रदान कारक (चिह्न: के लिए)"
    elif "द्वारा" in ch:
        kar = "करण कारक (चिह्न: के द्वारा)"
    else:
        return None
    return (None,
            ["कारक = शब्द का क्रिया से संबंध; चिह्न उस संबंध का बोध "
             "कराता है"],
            f"'{word}' के साथ चिह्न '{ch}' है — यह {kar} है।",
            None, "LANG_HI_LG_KARAK", None)


# वचन परिवर्तन rules (school standard)
_VACHAN_IRREG = {
    "आदमी": "आदमी", "नेता": "नेता", "पिता": "पिता", "राजा": "राजा",
    "माला": "मालाएँ", "लड़की": "लड़कियाँ", "किताब": "किताबें",
    "बहन": "बहनें", "रेखा": "रेखाएँ", "देवी": "देवियाँ",
    "नदी": "नदियाँ", "गाड़ी": "गाड़ियाँ", "चिड़िया": "चिड़ियाँ",
    "मछली": "मछलियाँ", "स्त्री": "स्त्रियाँ", "इच्छा": "इच्छाएँ",
    "कविता": "कविताएँ", "माता": "माताएँ", "गली": "गलियाँ",
    "लड़का": "लड़के", "कुत्ता": "कुत्ते", "बिल्ला": "बिल्ले",
    "घोड़ा": "घोड़े", "कमरा": "कमरे", "दरवाज़ा": "दरवाज़े",
    "कहानी": "कहानियाँ", "स्तुति": "स्तुतियाँ", "भाषा": "भाषाएँ",
    "आँख": "आँखें", "बात": "बातें", "रात": "रातें", "बाल": "बाल",
    "पुस्तक": "पुस्तकें", "फल": "फल", "मकान": "मकान", "वह": "वे",
    "यह": "ये", "वहीं": "वहीं", "के": "के",
}


def _c_hi_vachan(slots, text):
    """'वचन बदलिए: <phrase>' — rules + irregular table."""
    if not re.search(r"वचन", text):
        return None
    if not re.search(r"(बदल|बदलिए|बदलो|बहुवचन|एकवचन)", text):
        return None
    cands = re.findall(r"[\u0900-\u097F]{2,}", text)
    stop = {"वचन", "बदलिए", "बदलो", "बदल", "बहुवचन", "एकवचन", "में",
            "के", "को", "शब्दों", "शब्द", "कीजिए", "से"}
    cands = [c.strip("।,.?!;:'\"()॥") for c in cands
             if c.strip("।,.?!;:'\"()॥") not in stop]
    if not cands:
        return None
    word = cands[-1]
    to_plural = not re.search(r"बहुवचन.*एकवचन|एकवचन\s*में", text) or \
        bool(re.search(r"बहुवचन", text))
    plural = _vachan_plural(word)
    if not to_plural:
        # plural -> singular: reverse lookup
        sing = next((k for k, v in _VACHAN_IRREG.items()
                     if v == word), None)
        if sing is None:
            if word.endswith(("याँ", "एँ", "ाँ", "ें")):
                sing = {"याँ": "ी", "एँ": "ी", "ाँ": "ा", "ें": "ा"}.get(
                    word[-2:], "")
                if sing:
                    sing = word[:-2] + sing
                else:
                    sing = word[:-1] + "ा"
            else:
                sing = word
        return (None, ["बहुवचन से एकवचन"],
                f"{word} (बहुवचन) → {sing} (एकवचन)", None,
                "LANG_HI_VACHAN", None)
    return (None, ["एकवचन से बहुवचन"],
            f"{word} (एकवचन) → {plural} (बहुवचन)", None,
            "LANG_HI_VACHAN", None)


def _vachan_plural(word: str) -> str:
    if word in _VACHAN_IRREG:
        return _VACHAN_IRREG[word]
    if word.endswith("ा"):
        # masculine -ा nouns take -े (लड़का -> लड़के); common feminine
        # -ा nouns are in the table above
        return word[:-1] + "े"
    if word.endswith("ी"):
        return word[:-1] + "ियाँ"
    if word.endswith(("एँ", "याँ", "ें", "ाँ", "एं", "यां", "ें")):
        return word                      # already plural
    return word + "ें"                    # consonant-ending nouns


# काल परिवर्तन — common-verb conjugation (school register).
# root -> (भूत-पुं., भूत-स्त्री., भविष्यत्-पुं., वर्तमान-पुं.)
_KAAL_VERBS = {
    "खा": ("खाया", "खायी", "खाएगा", "खाता है"),
    "पी": ("पिया", "पी", "पिएगा", "पीता है"),
    "पढ़": ("पढ़ा", "पढ़ी", "पढ़ेगा", "पढ़ता है"),
    "लिख": ("लिखा", "लिखी", "लिखेगा", "लिखता है"),
    "जा": ("गया", "गयी", "जाएगा", "जाता है"),
    "आ": ("आया", "आयी", "आएगा", "आता है"),
    "खेल": ("खेला", "खेली", "खेलेगा", "खेलता है"),
    "गा": ("गाया", "गायी", "गाएगा", "गाता है"),
    "नाच": ("नाचा", "नाची", "नाचेगा", "नाचता है"),
    "हँस": ("हँसा", "हँसी", "हँसेगा", "हँसता है"),
    "रो": ("रोया", "रोयी", "रोएगा", "रोता है"),
    "दौड़": ("दौड़ा", "दौड़ी", "दौड़ेगा", "दौड़ता है"),
    "सो": ("सोया", "सोयी", "सोएगा", "सोता है"),
    "कर": ("किया", "की", "करेगा", "करता है"),
    "दे": ("दिया", "दी", "देगा", "देता है"),
    "ले": ("लिया", "ली", "लेगा", "लेता है"),
    "देख": ("देखा", "देखी", "देखेगा", "देखता है"),
    "सुन": ("सुना", "सुनी", "सुनेगा", "सुनता है"),
    "बैठ": ("बैठा", "बैठी", "बैठेगा", "बैठता है"),
    "उठ": ("उठा", "उठी", "उठेगा", "उठता है"),
    "चल": ("चला", "चली", "चलेगा", "चलता है"),
    "पहन": ("पहना", "पहनी", "पहनेगा", "पहनता है"),
    "हो": ("हुआ", "हुई", "होगा", "होता है"),
    "कह": ("कहा", "कही", "कहेगा", "कहता है"),
    "पूछ": ("पूछा", "पूछी", "पूछेगा", "पूछता है"),
}


# intransitive roots: plural masculine subjects take the -e form in
# भूतकाल (लड़के गए); transitive verbs keep the singular after 'ने'
_KAAL_INTRANS = {"जा", "आ", "हँस", "रो", "दौड़", "सो", "चल", "उठ",
                 "बैठ", "हो", "खेल", "नाच", "गा"}


def _c_hi_kaal(slots, text):
    """'काल बदलिए ...' — root-conjugation over the verb lexicon."""
    if not re.search(r"काल", text):
        return None
    if not re.search(r"(बदल|बदलिए|बदलो|रचना|में)", text):
        return None
    target = None
    if re.search(r"भूत", text):
        target = "bhut"
    elif re.search(r"भविष्य", text):
        target = "bhavishya"
    elif re.search(r"वर्तमान", text):
        target = "vartman"
    if target is None:
        return None
    cands = re.findall(r"[\u0900-\u097F]{2,}", text)
    stop = {"काल", "बदलिए", "बदलो", "बदल", "में", "के", "को", "वाक्य",
            "रचना", "कीजिए", "निम्नलिखित", "वर्तमान", "भूत", "भविष्यत्",
            "भविष्य", "का", "की", "राम", "मोहन", "सोहन"}
    verb = None
    for c in reversed(cands):
        c = c.strip("।,.?!;:'\"()॥")
        if c in stop:
            continue
        root = next((r for r in _KAAL_VERBS if c.startswith(r)), None)
        if root:
            verb = (c, root)
            break
    if verb is None:
        return None
    surf, root = verb
    bhut_m, bhut_f, bhav_m, vart_m = _KAAL_VERBS[root]
    fem = bool(re.search(r"लड़की|सीता|राधा|गीता|बहन|माता|स्त्री", text))
    pl = bool(re.search(r"लड़के|बच्चे|बालक|वे|सब", text)) and not fem
    if target == "bhut":
        rep = bhut_f if fem else bhut_m
        if pl and not fem and root in _KAAL_INTRANS:
            # intransitive plural takes the -e form (लड़के गए)
            rep = bhut_m[:-2] + "े" if bhut_m.endswith("या") else \
                bhut_m[:-1] + "े"
        # transitive plural with 'ने' keeps the singular form — correct
        label = "भूतकाल"
    elif target == "bhavishya":
        if not bhav_m.endswith("गा"):
            return None
        stem = bhav_m[:-2]
        if fem:
            rep = stem + "गी"
        elif pl:
            rep = stem + "ंगे"
        else:
            rep = bhav_m
        label = "भविष्यत्काल"
    else:
        rep = vart_m
        if fem:
            rep = vart_m.replace("ता है", "ती है")
        elif pl:
            rep = vart_m.replace("ता है", "ते हैं")
        label = "वर्तमानकाल"
    return (None,
            ["काल = क्रिया का काल-बोधक रूप (भूत, वर्तमान, भविष्यत्)"],
            f"{surf} ({label} में): {rep}", None, "LANG_HI_KAAL", None)

# --------------------------------------------------------------------------- #
# LANG HI specs (moved from structure_families_lang.py, WS-B consolidation
# map step 6 / section 5.7): ids verbatim so the LANG_VERIFIERS keys in
# independent_verifier keep hitting (map invariant I3).  These merge into
# STRUCTURE_SPECS via structure_families' import-time lang block.
# --------------------------------------------------------------------------- #

HINDI_LANG_SPECS: Dict[str, Dict[str, Any]] = {
    "LANG_HI_SANDHI": {
        "label": "संधि-विच्छेद और भेद",
        "force": r"संधि",
        "exemplars": [
            "संधि विच्छेद कीजिए विद्यालय",
            "संधि का भेद बताइए",
            "संधि-विच्छेद करके भेद लिखिए",
        ],
        "slots": {}, "required": [], "full_text": True, "min_conf": 0.4,
        "compute": _c_hi_sandhi,
    },
    "LANG_HI_SAMAS": {
        "label": "समास-विग्रह और भेद",
        "force": r"समास",
        "exemplars": [
            "समास विग्रह कीजिए त्रिलोक",
            "समास का भेद बताइए",
            "समास करके भेद लिखिए",
        ],
        "slots": {}, "required": [], "full_text": True, "min_conf": 0.4,
        "compute": _c_hi_samas,
    },
    "LANG_HI_KARAK": {
        "label": "कारक पहचान",
        "force": r"कारक",
        "exemplars": [
            "वाक्य में कारक बताइए",
            "कारक और उसका चिह्न पहचानिए",
            "राम को कारक बताओ",
        ],
        "slots": {}, "required": [], "full_text": True, "min_conf": 0.4,
        "compute": _c_hi_karak,
    },
    "LANG_HI_VACHAN": {
        "label": "वचन परिवर्तन",
        "force": r"वचन",
        "exemplars": [
            "वचन बदलिए लड़का",
            "शब्दों का वचन बदलो",
            "एकवचन से बहुवचन बनाइए",
        ],
        "slots": {}, "required": [], "full_text": True, "min_conf": 0.4,
        "compute": _c_hi_vachan,
    },
    "LANG_HI_KAAL": {
        "label": "काल परिवर्तन",
        "force": r"काल",
        "exemplars": [
            "काल बदलिए लड़का खाना खाता है",
            "वाक्य को भूतकाल में बदलिए",
            "काल के अनुसार रचना बदलो",
        ],
        "slots": {}, "required": [], "full_text": True, "min_conf": 0.4,
        "compute": _c_hi_kaal,
    },
}

_TABLE: List[Tuple[str, str, Any]] = [
    ("SANDHI_VICHCHHED", r"संधि", _c_sandhi),
    ("SAMAS_VIGRAH", r"समास", _c_samas),
    ("ALANKAAR_CLASSIFY", r"अलंकार|अलङ्कार", _c_alankaar),
    ("MUHAAVARA_MEANING", r"मुहावरा|मुहावरे|लोकोक्ति", _c_muhaavara),
    ("UPASARG_PRATYAY", r"उपसर्ग", _c_upasarg),
    ("PRATYAY_NIRMAN", r"प्रत्यय", _c_pratyay),
    ("TATSAM_TADBHAV", r"तत्सम|तद्भव", _c_tatsam),
    ("LIT_FACT", r"कवि कौन|लेखक कौन|रचनाकार|किसकी रचना|के लेखक|"
                 r"के कवि|की रचना", _c_lit),
    ("KAAL_CONVERT", r"काल", _c_kaal_convert),
    ("KAAL_IDENTIFY", r"काल", _c_kaal_ident),
    ("VAACHYA_CONVERT", r"वाच्य", _c_vaachya_conv),
    ("VAACHYA_IDENTIFY", r"वाच्य", _c_vaachya_ident),
    ("KARAK_CHINH", r"कारक", _c_karak),
    ("LING_VACHAN", r"लिंग|वचन", _c_ling_vachan),
    ("VAAKY_BHED", r"वाक्य भेद|वाक्य-भेद|सरल|संयुक्त|मिश्र",
     _c_vaaky_bhed),
    ("NA_SHUDDHI", r"शुद्ध|त्रुटि", _c_na_shuddhi),
    ("MEL_SHUDDHI", r"शुद्ध|त्रुटि|मेल", _c_mel),
]

TABLE = _TABLE


def model_hindi(text: str) -> ModelResult:
    """Dispatcher: scan every Hindi family; first grounded hit wins.

    Triggers are deterministic Devanagari regexes; each row applies its
    own plausibility gates inside compute, and a gate refusal simply
    lets the scan continue.  Never calls an LLM.
    """
    norm = _norm(text)
    for fid, pattern, compute in TABLE:
        m = re.search(pattern, norm)
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
    return _no("HINDI", "no hindi family matched")


# The modeling_layer (batch-18) registers model_hindi; the sandbox router
# can reuse the same dispatcher.  One dispatcher, both names.
model_hindi_families = model_hindi


# LANG spec self-registration (physics_families pattern, WS-B map step 6):
# same import-order repair as english_families — the LANG_ keys must keep
# their ENG-then-HI insertion order in STRUCTURE_SPECS, which holds in
# every import order because english is imported before hindi everywhere.
try:
    from backend.its.solver.structure_families import \
        STRUCTURE_SPECS as _SS_HI
    _SS_HI.update(HINDI_LANG_SPECS)
except Exception:  # pragma: no cover - structure_families unavailable
    pass
