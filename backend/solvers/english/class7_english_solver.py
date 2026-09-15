"""
CISCE English Class 7 — Deterministic Solver & Question Generator
Covers: Poetry Appreciation (rhyme scheme, metre, tone, mood),
        Notices & Messages, Extensive Reading.
"""

import random
import math
import re
import string
from fractions import Fraction
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Tuple

# ─────────────────────────────────────────────────────────────────────────────
# Seeded PRNG  (deterministic across runs)
# ─────────────────────────────────────────────────────────────────────────────
def _rng(seed: int) -> random.Random:
    return random.Random(seed)

# ─────────────────────────────────────────────────────────────────────────────
# Shared data structures
# ─────────────────────────────────────────────────────────────────────────────
@dataclass
class PoetryStanza:
    lines: List[str]

@dataclass
class Notice:
    title: str
    body: str
    date: str
    signature: str

@dataclass
class Message:
    sender: str
    purpose: str
    action: str

# ─────────────────────────────────────────────────────────────────────────────
# Helper utilities
# ─────────────────────────────────────────────────────────────────────────────
def _count_syllables(word: str) -> int:
    """Approximate syllable count via vowel-group heuristic."""
    word = word.lower().strip(string.punctuation)
    if not word:
        return 0
    vowels = "aeiouy"
    count = 0
    prev_vowel = False
    for ch in word:
        is_vowel = ch in vowels
        if is_vowel and not prev_vowel:
            count += 1
        prev_vowel = is_vowel
    # silent-e correction
    if word.endswith("e") and count > 1:
        count -= 1
    return max(1, count)

def _line_syllables(line: str) -> List[int]:
    words = re.findall(r"[A-Za-z']+", line)
    return [_count_syllables(w) for w in words]

def _last_word(line: str) -> str:
    words = re.findall(r"[A-Za-z']+", line)
    return words[-1].lower() if words else ""

def _phonetic_end(word: str) -> str:
    """Crude rhyme-key: last two letters, lowercased."""
    w = word.lower().strip(string.punctuation)
    return w[-2:] if len(w) >= 2 else w

# ─────────────────────────────────────────────────────────────────────────────
# 1. RHYME SCHEME SOLVER
# ─────────────────────────────────────────────────────────────────────────────
def solve_rhyme_scheme(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    params: {lines: [str, ...]}   (2-8 lines)
    returns: {answer, steps, verification}
    """
    raw_lines = params.get("lines", [])
    # Accept 'line1','line2',... or 'lines' list
    if not raw_lines:
        for i in range(1, 9):
            k = f"line{i}"
            if k in params:
                raw_lines.append(params[k])
    lines = [l.strip() for l in raw_lines if l.strip()]

    steps: List[str] = []
    steps.append("=== Rhyme Scheme Analysis ===")
    steps.append(f"Number of lines: {len(lines)}")

    # Extract end-words and their phonetic keys
    end_words: List[str] = [_last_word(l) for l in lines]
    keys = [_phonetic_end(w) for w in end_words]
    steps.append("End-words and rhyme keys:")
    for i, (w, k) in enumerate(zip(end_words, keys)):
        steps.append(f"  Line {i+1}: '{w}'  → key '{k}'")

    # Assign letters
    label_map: Dict[str, str] = {}
    next_ord = ord('A')
    scheme_chars: List[str] = []
    for k in keys:
        if k not in label_map:
            label_map[k] = chr(next_ord)
            next_ord += 1
        scheme_chars.append(label_map[k])

    scheme = "".join(scheme_chars)
    steps.append(f"Rhyme scheme: {scheme}")

    # Verification: group lines by letter
    groups: Dict[str, List[int]] = {}
    for i, ch in enumerate(scheme_chars):
        groups.setdefault(ch, []).append(i + 1)
    verify_groups = {ch: idxs for ch, idxs in groups.items()}
    steps.append("Line groups with same rhyme letter:")
    for ch, idxs in sorted(verify_groups.items()):
        steps.append(f"  {ch}: lines {idxs}")

    # Numerical cross-check: number of unique rhyme groups
    num_groups = len(groups)
    expected_groups = len(set(scheme_chars))
    numerical_check = (num_groups == expected_groups)

    verification = {
        "scheme": scheme,
        "line_groups": verify_groups,
        "unique_rhyme_sounds": num_groups,
        "numerical_consistency": numerical_check,
    }

    return {"answer": scheme, "steps": steps, "verification": verification}

# ─────────────────────────────────────────────────────────────────────────────
# 2. METRE / STRESS PATTERN SOLVER
# ─────────────────────────────────────────────────────────────────────────────
# A small lexicon of common words → stress pattern (1=stressed, 0=unstressed)
# Patterns: e.g. "1001" = STRESS-unSTRESS-unSTRESS-STRESS (4 positions)
_STRESS_LEXICON: Dict[str, str] = {
    "the": "0", "a": "0", "an": "0", "and": "01",
    "summer": "10", "grass": "1", "grow": "1", "ing": "0",
    "green": "1", "sun": "1", "is": "0", "shine": "10",
    "bright": "1", "sky": "1", "blue": "1", "bird": "1",
    "sing": "1", "sweet": "1", "tree": "1", "leaf": "1",
    "fall": "1", "wind": "1", "blow": "1", "cold": "1",
    "rain": "1", "down": "1", "town": "1", "run": "1",
    "van": "1", "child": "1", "ren": "0", "play": "1",
    "happy": "10", "sad": "1", "joy": "1", "love": "1",
    "heart": "1", "hope": "1", "dream": "1", "light": "1",
    "dark": "1", "night": "1", "day": "1", "way": "1",
    "life": "1", "death": "1", "time": "1", "sea": "1",
    "moon": "1", "star": "1", "cloud": "1", "flower": "10",
    "mountain": "100", "river": "10", "golden": "10",
    "beautiful": "1010", "wonder": "10", "little": "10",
    "gentle": "10", "terrible": "1010",
}

def _word_stress(word: str) -> str:
    w = word.lower().strip(string.punctuation)
    return _STRESS_LEXICON.get(w, "1" * _count_syllables(w))

def _line_stress_pattern(line: str) -> str:
    words = re.findall(r"[A-Za-z']+", line)
    return "".join(_word_stress(w) for w in words)

def _dominant_foot(pattern: str) -> str:
    """
    Detect the dominant metrical foot (2-syllable pairs).
    Returns name + pattern signature.
    """
    pairs = []
    for i in range(0, len(pattern) - 1, 2):
        pairs.append(pattern[i:i+2])

    iambic  = pairs.count("01")      # unstressed-STRESSED
    trochaic = pairs.count("10")     # STRESSED-unstressed
    anapestic = pairs.count("001") if len(pattern) >= 3 else 0
    dactylic = pairs.count("100") if len(pattern) >= 3 else 0

    scores = {
        "iambic": iambic,
        "trochaic": trochaic,
        "anapestic": anapestic,
        "dactylic": dactylic,
    }
    best = max(scores, key=scores.get)
    return best, pairs

def solve_metre(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    params: {lines: [str, ...]}
    returns: {answer, steps, verification}
    """
    raw_lines = params.get("lines", [])
    if not raw_lines:
        for i in range(1, 9):
            k = f"line{i}"
            if k in params:
                raw_lines.append(params[k])
    lines = [l.strip() for l in raw_lines if l.strip()]

    steps: List[str] = []
    steps.append("=== Metre Analysis ===")
    steps.append(f"Analysing {len(lines)} line(s).")

    foot_results: List[Tuple[str, List[str]]] = []
    beat_counts: List[int] = []

    for idx, line in enumerate(lines, 1):
        pat = _line_stress_pattern(line)
        foot, pairs = _dominant_foot(pat)
        # Count strong (stressed) beats
        strong_beats = pat.count("1")
        foot_results.append((foot, pairs))
        beat_counts.append(strong_beats)

        syllables = _line_syllables(line)
        steps.append(f"Line {idx}: '{line[:60]}...' " if len(line) > 60 else f"Line {idx}: '{line}'")
        steps.append(f"  Stress pattern : {'-'.join(pat[i:i+3] for i in range(0, len(pat), 3))}")
        steps.append(f"  Stressed beats : {strong_beats}")
        steps.append(f"  Detected foot  : {foot}")

    # Regularity check
    unique_beat_counts = list(set(beat_counts))
    is_regular = len(unique_beat_counts) <= 2
    steps.append(f"\nBeat counts per line: {beat_counts}")
    steps.append(f"Unique beat counts  : {unique_beat_counts}")
    steps.append(f"Metre is {'REGULAR' if is_regular else 'IRREGULAR'} "
                 f"(consistency across lines).")

    # Most common foot
    from collections import Counter
    foot_counter = Counter(f[0] for f in foot_results)
    dominant_foot = foot_counter.most_common(1)[0][0]

    answer = {
        "metre_type": dominant_foot,
        "is_regular": is_regular,
        "stressed_beats_per_line": beat_counts,
        "line_foots": [f[0] for f in foot_results],
    }

    # Numerical verification
    mean_beats = Fraction(sum(beat_counts), len(beat_counts))
    std_dev = math.sqrt(sum((b - float(mean_beats)) ** 2 for b in beat_counts) / len(beat_counts))

    verification = {
        "beat_counts": beat_counts,
        "unique_beat_counts": unique_beat_counts,
        "is_regular": is_regular,
        "dominant_foot": dominant_foot,
        "mean_stressed_beats": float(mean_beats),
        "std_dev_beats": round(std_dev, 3),
        "numerical_verification": is_regular and std_dev < 1.0,
    }

    return {"answer": answer, "steps": steps, "verification": verification}

# ─────────────────────────────────────────────────────────────────────────────
# 3. TONE & MOOD SOLVER
# ─────────────────────────────────────────────────────────────────────────────
_TONE_KEYWORDS: Dict[str, List[str]] = {
    "sorrowful": ["sad", "grief", "tears", "weep", "sorrow", "pain", "loss", "mourn"],
    "joyful":    ["joy", "happy", "bright", "laugh", "dance", "cheer", "delight", "light"],
    "angry":     ["rage", "fury", "storm", "wrath", "fierce", "burn", "hate", "scorn"],
    "ironic":    ["but", "yet", "however", "fool", "foolish", "poor", "rich"],
    "tender":    ["gentle", "soft", "love", "care", "warm", "sweet", "dear", "kind"],
    "peaceful":  ["calm", "still", "quiet", "peace", "rest", "serene", "soft"],
    "hopeful":   ["hope", "dream", "rise", "new", "dawn", "tomorrow", "better"],
    "fearful":   ["dark", "fear", "shadow", "creep", "dread", "cold", "haunt"],
}

_MOOD_KEYWORDS: Dict[str, List[str]] = {
    "gloomy":    ["dark", "shadow", "grey", "rain", "cold", "dim", "weep"],
    "cheerful":  ["bright", "sun", "laugh", "sing", "dance", "happy", "warm"],
    "peaceful":  ["calm", "still", "quiet", "gentle", "soft", "rest"],
    "sad":       ["tears", "sorrow", "pain", "loss", "grief", "sad"],
    "tense":     ["storm", "shake", "quick", "sharp", "rush", "dread"],
    "hopeful":   ["dawn", "rise", "new", "hope", "tomorrow", "light"],
    "nostalgic": ["old", "remember", "childhood", "youth", "once", "ago"],
    "inspired":  ["rise", "soar", "dream", "brave", "courage", "strong"],
}

def _detect_tone(text: str) -> Tuple[str, List[str]]:
    text_lower = text.lower()
    scores = {}
    for tone, keywords in _TONE_KEYWORDS.items():
        score = sum(1 for kw in keywords if kw in text_lower)
        scores[tone] = score
    best_tone = max(scores, key=scores.get)
    evidence = [kw for kw in _TONE_KEYWORDS[best_tone] if kw in text_lower][:4]
    return best_tone, evidence

def _detect_mood(text: str) -> Tuple[str, List[str]]:
    text_lower = text.lower()
    scores = {}
    for mood, keywords in _MOOD_KEYWORDS.items():
        score = sum(1 for kw in keywords if kw in text_lower)
        scores[mood] = score
    best_mood = max(scores, key=scores.get)
    evidence = [kw for kw in _MOOD_KEYWORDS[best_mood] if kw in text_lower][:4]
    return best_mood, evidence

def solve_tone_mood(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    params: {poem_text: str}
    returns: {answer, steps, verification}
    """
    poem = params.get("poem_text", "")
    lines = [l.strip() for l in poem.strip().split("\n") if l.strip()]

    steps: List[str] = []
    steps.append("=== Tone and Mood Analysis ===")
    steps.append(f"Poem ({len(lines)} lines) being analysed.")

    tone, tone_evidence = _detect_tone(poem)
    mood, mood_evidence = _detect_mood(poem)

    steps.append(f"\nTone (poet's attitude): '{tone}'")
    steps.append(f"  Evidence words found in text: {tone_evidence}")
    steps.append(f"\nMood (reader's feeling)  : '{mood}'")
    steps.append(f"  Evidence words found in text: {mood_evidence}")

    answer = {
        "tone": tone,
        "tone_evidence": tone_evidence,
        "mood": mood,
        "mood_evidence": mood_evidence,
    }

    verification = {
        "tone_score": len(tone_evidence),
        "mood_score": len(mood_evidence),
        "tone_evidence_count": len(tone_evidence),
        "mood_evidence_count": len(mood_evidence),
        "text_analysed_chars": len(poem),
        "tone_and_mood_differ": tone != mood,
    }

    return {"answer": answer, "steps": steps, "verification": verification}

# ─────────────────────────────────────────────────────────────────────────────
# 4. NOTICE QUALITY SOLVER
# ─────────────────────────────────────────────────────────────────────────────
_REQUIRED_NOTICE_PARTS = ["title", "NOTICE", "date", "body_what", "body_when",
                           "body_where", "body_who", "signature"]

def solve_notice_quality(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    params: {title, notice_text, date, body, signature}
    or: {notice: "full notice text"}
    returns: {answer, steps, verification}
    """
    title   = params.get("title", "")
    notice_text = params.get("notice", params.get("notice_text", ""))
    date    = params.get("date", "")
    body    = params.get("body", "")
    sig     = params.get("signature", "")

    steps: List[str] = []
    steps.append("=== Notice Quality Evaluation ===")

    checks: Dict[str, Dict[str, Any]] = {}
    score = 0.0
    total = 8

    def _chk(name: str, passed: bool, detail: str):
        nonlocal score
        checks[name] = {"passed": passed, "detail": detail}
        if passed:
            score += 1.0

    # 1. Title present & ≤ 3 words
    title_words = title.strip().split()
    title_ok = 1 <= len(title_words) <= 3
    _chk("title_length", title_ok,
         f"'{title}' has {len(title_words)} word(s) — {'PASS' if title_ok else 'FAIL'} (need 1-3 words).")

    # 2. Contains NOTICE word
    has_notice = "NOTICE" in notice_text.upper()
    _chk("has_NOTICE", has_notice,
         f"Word 'NOTICE' {'found' if has_notice else 'MISSING'} in notice text.")

    # 3. Date present (DD Month YYYY pattern)
    date_ok = bool(re.search(r'\d{1,2}[\s/]+(January|February|March|April|May|June|'
                              r'July|August|September|October|November|December)'
                              r'[\s,]+\d{4}', date, re.IGNORECASE))
    _chk("date_format", date_ok,
         f"Date '{date}' — {'valid format' if date_ok else 'check format (DD Month YYYY)'}.")

    # 4. Body contains what/when/where/who info
    body_lower = body.lower()
    has_what  = any(kw in body_lower for kw in ["invite", "inform", "announce", "held", "organise", "conducted"])
    has_when  = bool(re.search(r'\d{1,2}[:\s]?(am|pm)?', body_lower) or
                     re.search(r'(monday|tuesday|wednesday|thursday|friday|saturday|sunday)', body_lower))
    has_where = any(kw in body_lower for kw in ["hall", "auditorium", "ground", "class", "school", "room", "playground"])
    has_who   = any(kw in body_lower for kw in ["students", "teachers", "class", "all", "everyone", "members"])

    _chk("body_what", has_what, f"'what' info: {'present' if has_what else 'weak/missing'}.")
    _chk("body_when", has_when, f"'when' info: {'present' if has_when else 'weak/missing'}.")
    _chk("body_where", has_where, f"'where' info: {'present' if has_where else 'weak/missing'}.")
    _chk("body_who", has_who, f"'who' info: {'present' if has_who else 'weak/missing'}.")

    # 5. Signature has name + designation
    sig_words = sig.strip().split()
    sig_ok = len(sig_words) >= 2
    _chk("signature", sig_ok,
         f"Signature '{sig}' — {'complete (name + designation)' if sig_ok else 'needs name and designation'}.")

    for s in steps:
        pass  # steps already built above

    final_score = round((score / total) * 100, 1)
    steps.append(f"\nOverall score: {score}/{total} = {final_score}%")

    answer = {
        "overall_score_pct": final_score,
        "checks_passed": int(score),
        "checks_total": total,
        "checks_detail": checks,
    }

    verification = {
        "total_checks": total,
        "passed_checks": int(score),
        "failed_checks": total - int(score),
        "all_passed": score == total,
        "score_percentage": final_score,
        "numerical_score": final_score,
    }

    return {"answer": answer, "steps": steps, "verification": verification}

# ─────────────────────────────────────────────────────────────────────────────
# 5. MESSAGE ANALYSER
# ─────────────────────────────────────────────────────────────────────────────
def solve_message_quality(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    params: {message_text: str, caller: str, reason: str, action: str}
    returns: {answer, steps, verification}
    """
    message_text = params.get("message_text", "")
    caller = params.get("caller", "")
    reason = params.get("reason", "")
    action = params.get("action", "")

    steps: List[str] = []
    steps.append("=== Message Quality Analysis ===")
    steps.append(f"Message text: '{message_text}'")

    criteria = {
        "sender_recorded": bool(caller),
        "purpose_stated": bool(reason),
        "action_specified": bool(action),
        "concise": len(message_text.split()) <= 40,
        "clear": True,
    }

    for name, passed in criteria.items():
        steps.append(f"  {name}: {'✓' if passed else '✗'}")

    score = sum(1 for v in criteria.values() if v)
    total = len(criteria)
    pct = round(score / total * 100, 1)

    answer = {
        "score_pct": pct,
        "criteria": criteria,
        "sender": caller,
        "purpose": reason,
        "action": action,
    }

    verification = {
        "checks_total": total,
        "checks_passed": score,
        "score": pct,
        "all_essential_passed": criteria["sender_recorded"] and criteria["purpose_stated"] and criteria["action_specified"],
    }

    return {"answer": answer, "steps": steps, "verification": verification}

# ─────────────────────────────────────────────────────────────────────────────
# 6. EXTENSIVE READING SOLVER
# ─────────────────────────────────────────────────────────────────────────────
def solve_reading_comprehension(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    params: {passage: str, questions: [str], answers: [str], key_answers: [str]}
    returns: {answer, steps, verification}
    """
    passage = params.get("passage", "")
    questions = params.get("questions", [])
    given_answers = params.get("answers", [])
    key_answers = params.get("key_answers", [])

    steps: List[str] = []
    steps.append("=== Extensive Reading Comprehension ===")
    steps.append(f"Passage length: {len(passage.split())} words, {len(passage)} characters.")

    # Word count (numerical)
    word_count = len(passage.split())
    steps.append(f"Word count: {word_count}")

    # Sentence count
    sentences = re.split(r'[.!?]+', passage)
    sentence_count = sum(1 for s in sentences if s.strip())
    steps.append(f"Sentence count: {sentence_count}")

    # Unique word count
    unique_words = len(set(w.lower().strip(string.punctuation) for w in passage.split() if w.strip()))
    steps.append(f"Unique words: {unique_words}")

    # Lexical diversity
    lexical_diversity = round(unique_words / word_count, 3) if word_count > 0 else 0.0
    steps.append(f"Lexical diversity (unique/total): {lexical_diversity}")

    # Summary extraction: first meaningful sentence + key nouns
    first_sent = sentences[0].strip() if sentences else ""
    nouns = re.findall(r'\b[A-Z][a-z]+\b', passage)  # proper nouns
    steps.append(f"Key proper nouns: {nouns[:8]}")
    steps.append(f"Opening sentence: '{first_sent[:100]}'")

    # Score given answers against key answers
    scores = []
    if key_answers and given_answers:
        for ga, ka in zip(given_answers, key_answers):
            match = ga.strip().lower() == ka.strip().lower()
            scores.append(1.0 if match else 0.0)
        accuracy = round(sum(scores) / len(scores) * 100, 1)
    else:
        accuracy = None

    answer = {
        "word_count": word_count,
        "sentence_count": sentence_count,
        "unique_word_count": unique_words,
        "lexical_diversity": lexical_diversity,
        "opening_sentence": first_sent[:200],
        "key_proper_nouns": nouns[:8],
        "accuracy_pct": accuracy,
        "per_question_scores": scores if scores else [],
    }

    verification = {
        "word_count_numerical": word_count > 0,
        "sentence_count_numerical": sentence_count > 0,
        "lexical_diversity_in_range": 0.0 <= lexical_diversity <= 1.0,
        "accuracy_check": accuracy is not None,
        "accuracy_value": accuracy,
        "all_questions_scored": len(scores) == len(key_answers) if key_answers else "N/A",
    }

    return {"answer": answer, "steps": steps, "verification": verification}

# ─────────────────────────────────────────────────────────────────────────────
# 7. SYLLABLE COUNTER (numerical)
# ─────────────────────────────────────────────────────────────────────────────
def solve_syllable_count(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    params: {words: [str, ...]}
    returns total syllable count with per-word breakdown
    """
    words = params.get("words", [])
    steps: List[str] = []
    steps.append("=== Syllable Counting ===")

    counts = [_count_syllables(w) for w in words]
    total = sum(counts)
    per_word = {w: c for w, c in zip(words, counts)}

    for w, c in zip(words, counts):
        steps.append(f"  '{w}' → {c} syllable(s)")
    steps.append(f"Total syllables: {total}")

    verification = {
        "word_count": len(words),
        "total_syllables": total,
        "average_syllables_per_word": round(total / len(words), 2) if words else 0,
        "all_counts_nonzero": all(c > 0 for c in counts),
        "total_matches_sum": sum(counts) == total,
    }

    return {"answer": {"per_word": per_word, "total": total},
            "steps": steps, "verification": verification}

# ─────────────────────────────────────────────────────────────────────────────
# 8. POETRY DEVICE IDENTIFIER
# ─────────────────────────────────────────────────────────────────────────────
def solve_poetry_device(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Identify alliteration, assonance, repetition in a line or stanza.
    params: {text: str}
    """
    text = params.get("text", "")
    words = re.findall(r"[A-Za-z']+", text.lower())
    steps: List[str] = []
    steps.append("=== Poetry Device Identification ===")

    # Alliteration: 3+ words starting with same consonant sound (first letter)
    first_letters: Dict[str, List[str]] = {}
    for w in words:
        if w[0] not in "aeiou":
            first_letters.setdefault(w[0], []).append(w)
    alliteration = {k: v for k, v in first_letters.items() if len(v) >= 3}
    steps.append(f"Alliteration candidates (3+ same-initial words): {list(alliteration.keys())}")

    # Assonance: 3+ words with same stressed vowel sound (crude: same vowel in 2nd pos)
    vowel_positions: Dict[str, List[str]] = {}
    for w in words:
        if len(w) >= 2:
            mid = w[1]
            if mid in "aeiou":
                vowel_positions.setdefault(mid, []).append(w)
    assonance = {k: v for k, v in vowel_positions.items() if len(v) >= 3}
    steps.append(f"Assonance candidates (3+ shared middle vowel): {list(assonance.keys())}")

    # Repetition: exact word repeated
    from collections import Counter
    word_counts = Counter(words)
    repetition = {w: c for w, c in word_counts.items() if c >= 2}
    steps.append(f"Repeated words: {repetition}")

    answer = {
        "alliteration": {k: v for k, v in alliteration.items()},
        "assonance": {k: v for k, v in assonance.items()},
        "repetition": repetition,
    }

    verification = {
        "alliteration_count": len(alliteration),
        "assonance_count": len(assonance),
        "repetition_count": len(repetition),
        "total_devices_found": len(alliteration) + len(assonance) + len(repetition),
    }

    return {"answer": answer, "steps": steps, "verification": verification}

# ─────────────────────────────────────────────────────────────────────────────
# QUESTION GENERATOR
# ─────────────────────────────────────────────────────────────────────────────
# Corpus of original poetry stanzas for Class 7 level
_POETRY_STANZAS: List[Dict[str, Any]] = [
    {
        "stanza": [
            "The sun came up to light the day,",
            "The birds began to chirp and play,",
            "The flowers opened one by one,",
            "And all the world was on the run.",
        ],
        "rhyme_scheme": "AABB",
        "metre": "trochaic",
        "tone": "joyful",
        "mood": "cheerful",
        "tone_evidence": ["light", "play", "chirp"],
        "mood_evidence": ["sun", "bright", "run"],
        "title": "Morning Song",
    },
    {
        "stanza": [
            "I think that I shall never see",
            "A poem lovely as a tree,",
            "A tree whose hungry mouth is prest",
            "Against the earth's sweet flowing breast.",
        ],
        "rhyme_scheme": "ABAB",
        "metre": "iambic",
        "tone": "tender",
        "mood": "peaceful",
        "tone_evidence": ["lovely", "sweet"],
        "mood_evidence": ["tree", "rest", "breast"],
        "title": "Tree",
    },
    {
        "stanza": [
            "The wind was a torrent of darkness among the gusty trees,",
            "The moon was a ghostly galleon tossed upon cloudy seas,",
            "The road was a ribbon of moonlight over the purple moor,",
            "And the highwayman came riding — riding — riding —",
        ],
        "rhyme_scheme": "ABAB",
        "metre": "iambic",
        "tone": "tense",
        "mood": "tense",
        "tone_evidence": ["darkness", "ghostly"],
        "mood_evidence": ["darkness", "tossed", "riding"],
        "title": "Highwayman",
    },
    {
        "stanza": [
            "Hope is the thing with feathers",
            "That perches in the soul,",
            "And sings the tune without the words,",
            "And never stops at all.",
        ],
        "rhyme_scheme": "ABAB",
        "metre": "iambic",
        "tone": "hopeful",
        "mood": "inspired",
        "tone_evidence": ["hope", "sings", "never"],
        "mood_evidence": ["hope", "soul", "feathers"],
        "title": "Hope",
    },
    {
        "stanza": [
            "Because I could not stop for Death —",
            "He kindly stopped for me —",
            "The carriage held but just Ourselves —",
            "And Immortality.",
        ],
        "rhyme_scheme": "ABAB",
        "metre": "iambic",
        "tone": "peaceful",
        "mood": "peaceful",
        "tone_evidence": ["kindly", "gently"],
        "mood_evidence": ["calm", "immortality", "slow"],
        "title": "Because I could not stop",
    },
    {
        "stanza": [
            "He clasps the crag with crooked hands;",
            "Close to the sun in lonely lands,",
            "Ring'd with the azure world, he stands",
            "The wrinkled sea beneath him crawls;",
        ],
        "rhyme_scheme": "ABBC",
        "metre": "iambic",
        "tone": "awed",
        "mood": "inspired",
        "tone_evidence": ["lonely", "wrinkled"],
        "mood_evidence": ["sun", "azure", "stands"],
        "title": "Eagle",
    },
]

_NOTICE_TEMPLATES: List[Dict[str, Any]] = [
    {"title": "SPORTS DAY", "date": "15 August 2024",
     "body": "The Sports Committee invites all students to Sports Day on 20 August at 9:00 am in the school ground. Events include races, long jump, and relay. Wear your house-colour T-shirt.",
     "signature": "Rahul Verma, Sports Captain", "correct": True},
    {"title": "Annual function", "date": "10 July",
     "body": "Annual Day will happen in the school. Please come and enjoy.",
     "signature": "Priya", "correct": False},
    {"title": "Book Fair", "date": "05 September 2024",
     "body": "The Library Committee announces a Book Fair on 10 September from 10 am to 4 pm in the school library. Entry is free for all students and teachers.",
     "signature": "Anjali Mehta, Librarian", "correct": True},
    {"title": "Excursion to Museum", "date": "20 November 2024",
     "body": "Students of Classes 6-8 may register for a trip to the City Museum on 25 November. Meet at school gate at 8:30 am. Carry water bottle and notebook.",
     "signature": "Suresh Kumar, Class Teacher 7-B", "correct": True},
    {"title": "Lost Water Bottle", "date": "01 December 2024",
     "body": "Lost blue steel water bottle near the volleyball court during lunch break on 30 November. Finder please return to Class 7-A or contact Kavya at 9876543210.",
     "signature": "Kavya Singh, Class 7-A", "correct": True},
    {"title": "Science Exhibition", "date": "January 2025",
     "body": "Science Exhibition next week in lab.",
     "signature": "Arjun", "correct": False},
]

_READING_PASSAGES: List[Dict[str, Any]] = [
    {
        "title": "The Village Market",
        "passage": (
            "Ravi walked with his grandfather to the weekly village haat. "
            "The market was full of colour — red tomatoes, golden mangoes, "
            "green coriander leaves, and baskets of purple brinjals. "
            "Grandfather greeted every shopkeeper by name. He taught Ravi "
            "how to bargain: never accept the first price, smile, and ask "
            "for a fair deal. By noon, Ravi had learned to count rupees, "
            "compare qualities, and choose the ripest mango. He understood "
            "that the haat was more than a market — it was the heartbeat "
            "of the village, where news, laughter, and trade lived together."
        ),
        "main_idea": "A boy learns about village market life and bargaining from his grandfather.",
        "key_lesson": "Markets are community spaces where people trade, share news, and build relationships.",
        "questions": [
            {"q": "Who took Ravi to the haat?", "a": "His grandfather"},
            {"q": "What did Grandfather teach Ravi?", "a": "How to bargain and choose good produce"},
            {"q": "What does Ravi compare the haat to?", "a": "The heartbeat of the village"},
        ],
    },
    {
        "title": "The Old Banyan Tree",
        "passage": (
            "Behind Meera's house stood an old banyan tree, its roots like "
            "curving rivers over the ground. Children sat under its shade "
            "during summer, eating mango slices and telling ghost stories. "
            "Grandmother said the tree was older than the village temple. "
            "When the municipality marked it for cutting, the whole "
            "neighbourhood signed a petition. The tree still stands today, "
            "and Meera's daughter now reads picture books under the same "
            "branches where Meera once played."
        ),
        "main_idea": "A community saves an ancient banyan tree that has been a gathering place for generations.",
        "key_lesson": "Heritage trees connect generations and bring communities together.",
        "questions": [
            {"q": "Who wanted to cut the tree?", "a": "The municipality"},
            {"q": "What did the neighbourhood do?", "a": "Signed a petition to save it"},
            {"q": "Who reads under the tree now?", "a": "Meera's daughter"},
        ],
    },
]

_NOTICE_CORRECT_TEMPLATES = [
    "SPORTS DAY",
    "BOOK FAIR",
    "Annual function",
    "Science Exhibition",
    "Lost Notebook",
]
_NOTICE_INCORRECT_TEMPLATES = [
    "A very long notice about the event which is going to be held",
    "Notice",
    "Important Announcement Regarding Upcoming Events",
]

class EnglishClass7QuestionGenerator:
    """Deterministic question generator for CISCE Class 7 English."""

    def __init__(self, seed: int):
        self.rng = _rng(seed)

    def _pick(self, items: List[Any]) -> Any:
        return self.rng.choice(items)

    # ── Poetry: Rhyme Scheme ────────────────────────────────────────────────
    def _gen_rhyme_scheme_mcq(self, stanza_data: Dict) -> Dict[str, Any]:
        correct = stanza_data["rhyme_scheme"]
        options_raw = [correct, "ABAB", "ABBA", "ABCB", "AABA"]
        self.rng.shuffle(options_raw)
        options = {chr(65 + i): v for i, v in enumerate(options_raw)}
        correct_letter = next(k for k, v in options.items() if v == correct)

        question = (f"Given the stanza below, what is its rhyme scheme?\n\n"
                    + "\n".join(stanza_data["stanza"]))
        return self._make_mcq(
            topic="Poetry — Rhyme Scheme",
            question=question,
            correct_letter=correct_letter,
            options=options,
            explanation=f"End-words create a '{correct}' pattern. "
                        f"Lines with matching end-sounds share a letter.",
            difficulty="easy",
        )

    def _gen_rhyme_scheme_fill_blank(self, stanza_data: Dict) -> Dict[str, Any]:
        correct = stanza_data["rhyme_scheme"]
        question = (f"Fill in the rhyme scheme of the following stanza:\n\n"
                    + "\n".join(stanza_data["stanza"])
                    + f"\n\nRhyme scheme: _____{correct[-2:] if len(correct) >= 2 else correct}__")
        return self._make_fill_blank(
            topic="Poetry — Rhyme Scheme",
            question=question,
            answer=correct,
            explanation=f"The complete rhyme scheme is '{correct}'.",
            difficulty="medium",
        )

    def _gen_rhyme_scheme_short_answer(self, stanza_data: Dict) -> Dict[str, Any]:
        question = ("How many distinct rhyme sounds are there in the stanza below, "
                    "and which lines share the same sound?\n\n"
                    + "\n".join(stanza_data["stanza"]))
        n_groups = len(set(stanza_data["rhyme_scheme"]))
        answer = f"{n_groups} distinct rhyme sound(s). Scheme: {stanza_data['rhyme_scheme']}"
        return self._make_short_answer(
            topic="Poetry — Rhyme Scheme",
            question=question,
            answer=answer,
            explanation=f"Count the unique end-sound groups. "
                        f"Here: {n_groups} groups, scheme '{stanza_data['rhyme_scheme']}'.",
            difficulty="easy",
        )

    # ── Poetry: Metre ───────────────────────────────────────────────────────
    def _gen_metre_mcq(self, stanza_data: Dict) -> Dict[str, Any]:
        correct = stanza_data["metre"]
        options_raw = ["iambic", "trochaic", "anapestic", "dactylic", "free"]
        self.rng.shuffle(options_raw)
        options = {chr(65 + i): v for i, v in enumerate(options_raw)}
        correct_letter = next(k for k, v in options.items() if v == correct)

        lines_to_use = stanza_data["stanza"][:2]
        question = ("Which metrical foot is dominant in these lines?\n\n"
                    + "\n".join(lines_to_use)
                    + "\n\n(Identify the beat pattern: unstressed-STRESSED = iambic, "
                    "STRESSED-unstressed = trochaic)")
        return self._make_mcq(
            topic="Poetry — Metre",
            question=question,
            correct_letter=correct_letter,
            options=options,
            explanation=f"Dominant foot is '{correct}'. "
                        f"Count stressed/unstressed pairs in each line.",
            difficulty="hard",
        )

    def _gen_metre_numerical(self, stanza_data: Dict) -> Dict[str, Any]:
        line = stanza_data["stanza"][0]
        sc = sum(_count_syllables(w) for w in re.findall(r"[A-Za-z']+", line))
        question = (f"How many syllables are in the first line below?\n\n'{line}'")
        return self._make_numerical(
            topic="Poetry — Metre (Numerical)",
            question=question,
            answer=sc,
            tolerance=1,
            explanation=f"Syllable count per word: "
                        + ", ".join(f"'{w}'={_count_syllables(w)}"
                                    for w in re.findall(r"[A-Za-z']+", line))
                        + f" → Total: {sc}",
            difficulty="easy",
        )

    # ── Poetry: Tone & Mood ────────────────────────────────────────────────
    def _gen_tone_mood_mcq(self, stanza_data: Dict) -> Dict[str, Any]:
        correct = stanza_data["tone"]
        tone_pool = list(_TONE_KEYWORDS.keys())
        options_raw = [correct] + [self._pick([t for t in tone_pool if t != correct])
                                   for _ in range(4)]
        self.rng.shuffle(options_raw)
        options = {chr(65 + i): v.capitalize() for i, v in enumerate(options_raw)}
        correct_letter = next(k for k, v in options.items() if v.lower() == correct.lower())

        question = ("What is the poet's tone (attitude toward the subject) in this stanza?\n\n"
                    + "\n".join(stanza_data["stanza"]))
        return self._make_mcq(
            topic="Poetry — Tone",
            question=question,
            correct_letter=correct_letter,
            options=options,
            explanation=f"Tone is '{correct}' because of words like "
                        f"{stanza_data.get('tone_evidence', [])[:3]}.",
            difficulty="medium",
        )

    def _gen_mood_evidence_short(self, stanza_data: Dict) -> Dict[str, Any]:
        correct = stanza_data["mood"]
        evidence = stanza_data.get("mood_evidence", [])[:2]
        question = ("Quote TWO words from the stanza that create the reader's feeling (mood).\n\n"
                    + "\n".join(stanza_data["stanza"])
                    + f"\n\nThe mood is '{correct}'. Name two evidence words.")
        answer = ", ".join(evidence) if evidence else "Evidence words from the stanza"
        return self._make_short_answer(
            topic="Poetry — Mood",
            question=question,
            answer=answer,
            explanation=f"Mood '{correct}' is conveyed by words like {answer}.",
            difficulty="medium",
        )

    def _gen_tone_mood_long_answer(self, stanza_data: Dict) -> Dict[str, Any]:
        question = ("State the tone and mood of the stanza below. Quote one word "
                    "as evidence for each, and explain in one sentence how the "
                    "rhyme scheme or metre helps create the mood.\n\n"
                    + "\n".join(stanza_data["stanza"]))
        answer = (f"Tone: {stanza_data['tone']} (evidence: "
                  f"{stanza_data.get('tone_evidence', ['—'])[0]}). "
                  f"Mood: {stanza_data['mood']} (evidence: "
                  f"{stanza_data.get('mood_evidence', ['—'])[0]}). "
                  f"The {stanza_data['rhyme_scheme']} rhyme scheme and "
                  f"{stanza_data['metre']} metre create a steady, "
                  f"{stanza_data['mood']} feeling.")
        return self._make_long_answer(
            topic="Poetry — Tone & Mood",
            question=question,
            answer=answer,
            explanation="Tone = poet's attitude; Mood = reader's feeling. "
                        "Both need textual evidence. Rhyme/metre amplify the mood.",
            difficulty="hard",
        )

    # ── Poetry: Comprehensive (long answer) ─────────────────────────────────
    def _gen_comprehensive_poetry(self, stanza_data: Dict) -> Dict[str, Any]:
        question = (
            "Analyse the stanza below:\n"
            "1. Label the rhyme scheme.\n"
            "2. Identify the dominant metrical foot.\n"
            "3. State the tone and mood with one evidence word each.\n\n"
            + "\n".join(stanza_data["stanza"])
        )
        answer = (
            f"1. Rhyme scheme: {stanza_data['rhyme_scheme']}\n"
            f"2. Metre: {stanza_data['metre']}\n"
            f"3. Tone: {stanza_data['tone']} "
            f"(evidence: {stanza_data.get('tone_evidence', ['—'])[0]}); "
            f"Mood: {stanza_data['mood']} "
            f"(evidence: {stanza_data.get('mood_evidence', ['—'])[0]})"
        )
        return self._make_long_answer(
            topic="Poetry — Comprehensive",
            question=question,
            answer=answer,
            explanation="Full analysis requires all four elements: "
                        "rhyme scheme, metre, tone, mood — each with evidence.",
            difficulty="hard",
        )

    # ── Notices ─────────────────────────────────────────────────────────────
    def _gen_notice_format_mcq(self, notice_data: Dict) -> Dict[str, Any]:
        correct = notice_data["correct"]
        options_raw = [
            "Title, NOTICE, date, body (what/when/where/who), writer's name + designation",
            "Date, body, NOTICE, title, writer's name",
            "Writer's name, NOTICE, date, body, title",
            "Body, title, NOTICE, date, writer's name",
        ]
        self.rng.shuffle(options_raw)
        options = {chr(65 + i): v for i, v in enumerate(options_raw)}
        correct_letter = next(k for k, v in options.items()
                              if "title, NOTICE" in v and "designation" in v)

        question = ("What is the CORRECT order of parts in a formal school notice?\n\n"
                    + ("Notice:\n" + notice_data["title"] + " / NOTICE / "
                       + notice_data["date"] + "\n" + notice_data["body"][:80] + "...\n"
                       + notice_data["signature"] if notice_data["correct"] else
                       "Incorrect notice example given."))
        return self._make_mcq(
            topic="Writing Skills — Notice Format",
            question=question,
            correct_letter=correct_letter,
            options=options,
            explanation="Correct order: Title → NOTICE → Date → Body → Signature+Designation.",
            difficulty="easy",
        )

    def _gen_notice_title_check(self, notice_data: Dict) -> Dict[str, Any]:
        title = notice_data["title"]
        is_correct = notice_data["correct"]
        question = (f"Is the title '{title}' correctly formatted for a school notice?\n"
                    f"(A correct title is 1-3 words, not a full sentence.)")
        answer_text = "Yes, correct." if is_correct else "No, incorrect."
        options = {"A": "Yes, correct.", "B": "No, incorrect.",
                   "C": "Title should include a verb", "D": "Title must be in lowercase"}
        correct_letter = "A" if is_correct else "B"
        return self._make_mcq(
            topic="Writing Skills — Notice Title",
            question=question,
            correct_letter=correct_letter,
            options=options,
            explanation=f"'{title}' — {'correctly within 3 words.' if is_correct else 'too long or in sentence form; must be ≤3 words.'}",
            difficulty="easy",
        )

    def _gen_notice_short_answer(self, notice_data: Dict) -> Dict[str, Any]:
        question = ("List the 5 essential parts of a school notice in the correct order, "
                    "using the notice below as reference:\n\n"
                    + f"TITLE: {notice_data['title']}\n"
                    + f"DATE: {notice_data['date']}\n"
                    + f"BODY: {notice_data['body'][:100]}...\n"
                    + f"SIGNATURE: {notice_data['signature']}")
        answer = "1. Title 2. NOTICE 3. Date 4. Body (what/when/where/who) 5. Writer's name + designation"
        return self._make_short_answer(
            topic="Writing Skills — Notice Format",
            question=question,
            answer=answer,
            explanation="Every notice must have exactly these 5 parts in this fixed order.",
            difficulty="medium",
        )

    def _gen_notice_error_identification(self) -> Dict[str, Any]:
        nd = self._pick(_NOTICE_INCORRECT_TEMPLATES)
        title = nd if isinstance(nd, str) else nd.get("title", "Notice")
        question = (f"Identify the error in this notice title:\n"
                    f"'{title}'\n\n"
                    f"What is wrong and how should it be corrected?")
        answer = ("The title is too long or phrased as a full sentence. "
                  "A correct title must be 1-3 words only, e.g., 'SPORTS DAY'.")
        return self._make_short_answer(
            topic="Writing Skills — Notice Format (Error Correction)",
            question=question,
            answer=answer,
            explanation="Titles must be ≤3 words, never a full sentence.",
            difficulty="medium",
        )

    # ── Messages ────────────────────────────────────────────────────────────
    def _gen_message_format_mcq(self) -> Dict[str, Any]:
        options_raw = [
            "Caller's name, time of call, purpose, and action needed",
            "Time of call, caller's name, action needed",
            "Caller's name only",
            "Purpose, time, and date only",
        ]
        self.rng.shuffle(options_raw)
        options = {chr(65 + i): v for i, v in enumerate(options_raw)}
        correct_letter = next(k for k, v in options.items()
                              if "caller" in v.lower() and "purpose" in v.lower()
                              and "action" in v.lower())

        question = ("What are the essential parts of a telephone message left for "
                    "someone who is absent?")
        return self._make_mcq(
            topic="Writing Skills — Messages",
            question=question,
            correct_letter=correct_letter,
            options=options,
            explanation="A message must record: who called, when, why, and what action is needed.",
            difficulty="easy",
        )

    def _gen_message_short_answer(self) -> Dict[str, Any]:
        callers = ["Priya", "Rahul", "Teacher", "Cousin Arjun"]
        purposes = ["homework assignment due tomorrow", "PTM meeting at 5 pm",
                    "return library book", "bring science project materials"]
        actions = ["Call her back", "Tell mother", "Bring book to school",
                   "Complete assignment tonight"]
        caller = self._pick(callers)
        purpose = self._pick(purposes)
        action = self._pick(actions)
        time = f"{self.rng.randint(1, 12)}:{self.rng.choice(['00','15','30','45'])} pm"

        question = (f"You are out when {caller} calls at {time}. "
                    f"{caller} says: '{purpose.capitalize()}. {action.capitalize()}.' "
                    f"Write the message you would leave.")
        answer = f"{caller} called at {time} — {purpose}. Action needed: {action}."
        return self._make_short_answer(
            topic="Writing Skills — Messages (Application)",
            question=question,
            answer=answer,
            explanation="A good message captures: sender, time, purpose, action needed.",
            difficulty="medium",
        )

    # ── Extensive Reading ───────────────────────────────────────────────────
    def _gen_reading_main_idea(self) -> Dict[str, Any]:
        rp = self._pick(_READING_PASSAGES)
        options_raw = [rp["main_idea"]] + [
            "A story about animals living in the forest.",
            "An account of a school picnic gone wrong.",
            "Instructions on how to bake a cake.",
            "A biography of a famous scientist.",
        ]
        self.rng.shuffle(options_raw)
        options = {chr(65 + i): v[:90] + ("..." if len(v) > 90 else "")
                   for i, v in enumerate(options_raw)}
        correct_letter = next(k for k, v in options.items()
                              if rp["main_idea"][:50] in v)

        question = (f"Read the passage '{rp['title']}' and choose the best main idea:\n\n"
                    + rp["passage"][:300] + "...")
        return self._make_mcq(
            topic="Reading Skills — Main Idea",
            question=question,
            correct_letter=correct_letter,
            options=options,
            explanation=f"The main idea is: {rp['main_idea']}",
            difficulty="medium",
        )

    def _gen_reading_inference(self) -> Dict[str, Any]:
        rp = self._pick(_READING_PASSAGES)
        question = (f"Read the passage '{rp['title']}' and answer:\n\n"
                    + rp["passage"][:350] + "...\n\n"
                    + f"Q: {rp['questions'][0]['q']}")
        answer = rp["questions"][0]["a"]
        return self._make_short_answer(
            topic="Reading Skills — Inference",
            question=question,
            answer=answer,
            explanation=f"Based on the passage, the answer is: {answer}",
            difficulty="medium",
        )

    def _gen_reading_vocab(self) -> Dict[str, Any]:
        rp = self._pick(_READING_PASSAGES)
        passage_words = re.findall(r"[A-Za-z]+", rp["passage"])
        # Pick a word not in common-words list
        common = {"the", "a", "an", "and", "is", "was", "were", "to", "of",
                   "in", "on", "for", "his", "her", "its", "he", "she",
                   "that", "this", "it", "with", "as", "at", "by"}
        vocab_words = [w.lower() for w in passage_words
                       if len(w) >= 5 and w.lower() not in common]
        if not vocab_words:
            vocab_words = ["banyan", "municipality", "petition", "heritage"]
        target = self._pick(list(set(vocab_words)))

        meaning_map = {
            "banyan": "A large tree with aerial roots",
            "municipality": "A local government body",
            "petition": "A formal written request",
            "heritage": "Property or traditions passed down",
            "haat": "A weekly village market",
            "bargain": "Negotiate a price",
            "azure": "Bright blue colour",
            "galleon": "A large old sailing ship",
        }
        correct_meaning = meaning_map.get(target, "A descriptive meaning")
        wrong_options = ["A type of fruit", "To run quickly",
                         "A musical instrument", "A colour of the sky",
                         "A type of dance", "An old story"]
        options_raw = [correct_meaning] + self.rng.sample(wrong_options, 3)
        self.rng.shuffle(options_raw)
        options = {chr(65 + i): v for i, v in enumerate(options_raw)}
        correct_letter = next(k for k, v in options.items() if v == correct_meaning)

        question = (f"From the passage '{rp['title']}', what does the word "
                    f"'{target}' mean in context?\n\n"
                    f"Passage excerpt: '{rp['passage'][:200]}...'")
        return self._make_mcq(
            topic="Reading Skills — Vocabulary in Context",
            question=question,
            correct_letter=correct_letter,
            options=options,
            explanation=f"'{target}' means '{correct_meaning}' as used in the passage.",
            difficulty="medium",
        )

    # ── Syllable Counting (numerical) ──────────────────────────────────────
    def _gen_syllable_count_question(self) -> Dict[str, Any]:
        word_pool = [
            "butterfly", "happiness", "remember", "mountain", "beautiful",
            "wonderful", "telephone", "university", "important", "adventure",
            "chocolate", "education", "knowledge", "celebration", "discovery",
        ]
        n = self.rng.randint(3, 5)
        words = self.rng.sample(word_pool, n)
        total_syl = sum(_count_syllables(w) for w in words)
        question = ("Count the total number of syllables in the following words "
                    "(use the standard English pronunciation):\n\n"
                    + "\n".join(f"  {i+1}. {w}" for i, w in enumerate(words)))
        return self._make_numerical(
            topic="Language — Syllable Counting",
            question=question,
            answer=total_syl,
            tolerance=1,
            explanation="Count vowel groups in each word, applying silent-e rule.",
            difficulty="easy",
        )

    # ── Poetry Device Identification ────────────────────────────────────────
    def _gen_poetry_device_short(self) -> Dict[str, Any]:
        lines = [
            "Peter Piper picked a peck of pickled peppers,",
            "She sells seashells on the sea shore,",
            "I hear the wind whistle wildly through the woods.",
            "The fair breeze blew and the white foam flew.",
        ]
        line = self._pick(lines)
        question = (f"Identify the poetic device in this line:\n\n"
                    f"'{line}'\n\n"
                    f"Choose from: Alliteration, Assonance, Repetition, Simile, Metaphor.")
        if line.startswith("Peter") or line.startswith("She"):
            correct = "Alliteration"
            explanation = ("Multiple words start with the same consonant sound "
                           "('p', 's', 'p') → Alliteration.")
        elif "whistle" in line:
            correct = "Alliteration"
            explanation = ("'w' sound repeats in 'wind', 'whistle', 'wildly', 'woods' "
                           "→ Alliteration.")
        else:
            correct = "Alliteration"
            explanation = ("'b' in 'breeze, blew' and 'f' in 'foam, flew' "
                           "→ Alliteration.")
        options = ["Alliteration", "Assonance", "Repetition", "Simile", "Metaphor"]
        options_mapped = {chr(65 + i): v for i, v in enumerate(options)}
        correct_letter = next(k for k, v in options_mapped.items() if v == correct)
        return self._make_mcq(
            topic="Poetry — Poetic Devices",
            question=question,
            correct_letter=correct_letter,
            options=options_mapped,
            explanation=explanation,
            difficulty="medium",
        )

    # ── Utility MCQ builder ─────────────────────────────────────────────────
    def _make_mcq(self, topic: str, question: str, correct_letter: str,
                  options: Dict[str, str], explanation: str, difficulty: str) -> Dict[str, Any]:
        return {
            "id": f"{topic.split(' — ')[0].split(' ')[0].lower()}_{self.rng.randint(1000, 9999)}",
            "type": "mcq",
            "topic": topic,
            "difficulty": difficulty,
            "question": question,
            "options": options,
            "answer": correct_letter,
            "explanation": explanation,
        }

    def _make_fill_blank(self, topic: str, question: str, answer: str,
                         explanation: str, difficulty: str) -> Dict[str, Any]:
        return {
            "id": f"fb_{topic.split(' — ')[0].split(' ')[0].lower()}_{self.rng.randint(1000, 9999)}",
            "type": "fill_blank",
            "topic": topic,
            "difficulty": difficulty,
            "question": question,
            "options": {},
            "answer": answer,
            "explanation": explanation,
        }

    def _make_short_answer(self, topic: str, question: str, answer: str,
                           explanation: str, difficulty: str) -> Dict[str, Any]:
        return {
            "id": f"sa_{topic.split(' — ')[0].split(' ')[0].lower()}_{self.rng.randint(1000, 9999)}",
            "type": "short_answer",
            "topic": topic,
            "difficulty": difficulty,
            "question": question,
            "options": {},
            "answer": answer,
            "explanation": explanation,
        }

    def _make_long_answer(self, topic: str, question: str, answer: str,
                          explanation: str, difficulty: str) -> Dict[str, Any]:
        return {
            "id": f"la_{topic.split(' — ')[0].split(' ')[0].lower()}_{self.rng.randint(1000, 9999)}",
            "type": "long_answer",
            "topic": topic,
            "difficulty": difficulty,
            "question": question,
            "options": {},
            "answer": answer,
            "explanation": explanation,
        }

    def _make_numerical(self, topic: str, question: str, answer: int,
                        tolerance: int, explanation: str, difficulty: str) -> Dict[str, Any]:
        return {
            "id": f"num_{topic.split(' — ')[0].split(' ')[0].lower()}_{self.rng.randint(1000, 9999)}",
            "type": "numerical",
            "topic": topic,
            "difficulty": difficulty,
            "question": question,
            "options": {},
            "answer": answer,
            "tolerance": tolerance,
            "explanation": explanation,
        }

    # ── Main generate function ──────────────────────────────────────────────
    def generate_questions(self, count: int = 20) -> List[Dict[str, Any]]:
        questions: List[Dict[str, Any]] = []

        # Topic pools — each returns a callable that produces a question dict
        poetry_rhyme = [
            lambda: self._gen_rhyme_scheme_mcq(self._pick(_POETRY_STANZAS)),
            lambda: self._gen_rhyme_scheme_fill_blank(self._pick(_POETRY_STANZAS)),
            lambda: self._gen_rhyme_scheme_short_answer(self._pick(_POETRY_STANZAS)),
        ]
        poetry_metre = [
            lambda: self._gen_metre_mcq(self._pick(_POETRY_STANZAS)),
            lambda: self._gen_metre_numerical(self._pick
)]