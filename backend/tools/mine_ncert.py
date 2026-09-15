"""mine_ncert.py -- extract exercises from NCERT textbook text_cache files.

The 37,436 text_cache files are the actual NCERT textbook chapters for
every subject from class 1 to 12.  Each file is a chapter with:
  - in-text examples ("Example 1", "Example 2")
  - end-of-chapter exercises ("Exercise 1.1", "Exercise 1.2")
  - questions numbered "1.", "2.", etc.
  - some chapters have answers at the end

This miner extracts:
  - exercise questions per chapter
  - example questions per chapter
  - subject/class inferred from the book code (fesc=c6 science, etc.)

Output goes to question_bank.db with proper subject/class tags.
Furniture (headers, page numbers, URLs) is filtered.
"""

from __future__ import annotations

import json
import os
import re
import sqlite3
import sys
from pathlib import Path
from typing import Dict, List, Optional, Tuple

# absolute import of the solver layer works both as a module
# (python -m backend.tools.mine_ncert) and as a direct script
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from backend.its.solver.slot_extractor import strip_answer_tail

CACHE = Path(r"D:\node_generator\ncert-mcp\data\processed\text_cache")
DB = Path(r"D:\platform\cbse_data\question_bank.db")

# ---- book code -> (subject, class_level) ----
# NCERT book codes are 4-letter prefixes (e.g. fegp=Ganit class 6)
# We derive from the known NCERT code families
_CODE_MAP = {
    # class 6
    "fegp": ("maths", 6), "fesc": ("science", 6), "fehl": ("hindi", 6),
    "fepw": ("physical_education", 6), "fess": ("social_science", 6),
    # class 7
    "femh": ("maths", 7), "hesc": ("science", 7), "vehl": ("hindi", 7),
    # class 8
    "hemh": ("maths", 8), "pesc": ("science", 8),
    # class 9
    "eemh": ("maths", 4),  # Math-Magic (old class-4 book; not class 9)
    "iemh": ("maths", 9),
    "iesc": ("science", 9),
    # class 10
    "jemh": ("maths", 10), "jesc": ("science", 10),
    # class 11
    "kemh": ("maths", 11), "kech": ("chemistry", 11),
    "keph": ("physics", 11), "kebo": ("biology", 11),
    "keac": ("accountancy", 11), "keec": ("economics", 11),
    "kebs": ("business_studies", 11), "keps": ("psychology", 11),
    "kecs": ("computer_science", 11), "kebt": ("biotechnology", 11),
    "kegy": ("geography", 11), "keip": ("legal_studies", 11),
    "keks": ("economics", 11),
    # class 12
    "lemh": ("maths", 12), "lech": ("chemistry", 12),
    "leph": ("physics", 12), "lebo": ("biology", 12),
    "leac": ("accountancy", 12), "leec": ("economics", 12),
    "lebs": ("business_studies", 12), "leps": ("psychology", 12),
    "lecs": ("computer_science", 12), "lebt": ("biotechnology", 12),
    "legy": ("geography", 12), "leip": ("legal_studies", 12),
    "lekl": ("english", 12),  # Kaleidoscope (Class 12 English supplementary)
}

# fallback: map from second char (e=elementary/secondary, h=higher secondary)
_CLASS_FROM_CODE = re.compile(r"^[a-z]e([a-z]{2})(\d)(\d+)")


def _meta_from_filename(fname: str) -> Tuple[str, int, str]:
    """Extract (subject, class_level, chapter_code) from NCERT filename
    like fegp101.txt or jemh201.txt."""
    stem = fname.replace(".txt", "")
    # book code = first 4 chars, chapter = next 2 digits
    code = stem[:4]
    if code in _CODE_MAP:
        subject, cls = _CODE_MAP[code]
        chapter_code = code
    else:
        # try without the class digit
        code2 = stem[:3]
        if code2 in _CODE_MAP:
            subject, cls = _CODE_MAP[code2]
            chapter_code = code
        else:
            subject, cls, chapter_code = "unknown", 0, stem[:4]
    return subject, cls, chapter_code


# ---- furniture patterns ----
_FURNITURE = re.compile(
    r"^(?:\d+|Reprint|Reprinted|First|Second|Third|Fourth|Fifth|"
    r"ISBN|©|Copyright|All\s+rights|Off\s+the|Cover|Design|"
    r"This\s+book|Preface|Foreword|Contents|Acknowledgement|"
    r"Chapter\s+\d+|NOTES?|NOTES?\s*\d*|^\s*)[\s.]*$|"
    r"^https?://|^www\.|^www\s|openstax|ncert\.nic\.in", re.I)


def _is_furniture(line: str) -> bool:
    s = line.strip()
    if not s or len(s) < 3:
        return True
    if _FURNITURE.match(s):
        return True
    if re.match(r"^\d+$", s):
        return True
    if re.match(r"^[^a-zA-Z0-9]{3,}$", s):
        return True
    return False


# ---- exercise question extraction ----
_Q_START = re.compile(
    r"^(?:(\d{1,3})[\.\)]\s*)?(.+)$")
# exercise/activity headers across BOTH book generations: the classic
# "EXERCISE"/"EXERCISE 1.2"/"EXERCISES" and the 2024+ activity headers
# ("Figure it Out", "Let Us Do/Try/...", "Activity", ...)
_EXERCISE_HDR = re.compile(
    r"(?:EXERCISES?(?:\s+\d+(?:\.\d+)?)?|Exercise\s*\d+(?:\.\d+)?"
    r"|Figure\s+it\s+Out"
    r"|Let\s+Us\s+(?:Do|Try|Think|Discuss|Explore|Answer|Practice|Reflect|"
    r"Work(?:\s+Out)?|Play(?:\s+with)?|Ponder|Argue|Extend|Assess)"
    r"|ACTIVIT(?:Y|IES)\s*$|Activity\s*\d*"
    r"|Project\s+(?:Work|Ideas)"
    r"|Check\s+Your(?:self|Progress|Understanding)?"
    r"|Test\s+Yourself)\s*\.?\s*$", re.I)
_SUB_NUM = re.compile(
    r"^(\d{1,2})\.(\d{1,2})\s+(.*)$")  # "1.1 What is the force..." items
_EXAMPLE_HDR = re.compile(r"^(?:Example|EXAMPLE|Illustration)\s*(\d+)?", re.I)


def _clean_lines(text: str) -> List[str]:
    """Strip + drop furniture; shared by the primary and recovery passes."""
    lines = [l.strip() for l in text.split("\n")]
    return [l for l in lines if not _is_furniture(l)]


def _extract_questions(text: str, subject: str, class_level: int,
                       chapter_code: str) -> List[Dict]:
    """Extract numbered questions from exercise sections."""
    lines = _clean_lines(text)

    questions = []
    in_exercise = False
    current_num = None
    current_text: List[str] = []

    def _flush():
        nonlocal current_num, current_text
        if current_num is not None and current_text:
            q = " ".join(current_text).strip()
            if _keep(q):
                questions.append(q)
        current_num = None
        current_text = []

    for ln in lines:
        if _EXERCISE_HDR.match(ln):
            in_exercise = True
            current_text = []
            continue
        if re.match(r"^(?:Summary|SUMMARY|What\s+have|Key\s+Points|"
                    r"NOTES?|Things\s+to|Fun\s+with|Try\s+These)\s*$",
                    ln, re.I):
            in_exercise = False
            _flush()
            continue

        # "1.1 What is the force..." (senior books) vs "1.2 Patterns in
        # Numbers" (2024+ section titles): both start N.N -- treat as a
        # numbered item and drop title-like fragments at flush time
        ms = _SUB_NUM.match(ln)
        if in_exercise and ms:
            _flush()
            current_num = ms.group(1) + "." + ms.group(2)
            current_text = [ms.group(3)] if ms.group(3) else []
            continue

        m = _Q_START.match(ln)
        if in_exercise and m and m.group(1):
            _flush()
            current_num = int(m.group(1))
            current_text = [m.group(2)] if m.group(2) else []
            continue

        if in_exercise and ln:
            current_text.append(ln)

    _flush()

    # Fallback: some senior chapters (e.g. chemistry 12) lose the EXERCISES
    # header in PDF extraction -- the numbered items (1.20, 1.21, ...) are
    # still there near the end of the file.  If nothing matched, scan the
    # final stretch of the document for a contiguous numbered run.
    if not questions:
        questions = _subnum_fallback(lines)

    if not questions:
        # Recovery pass (classes 9-12 artifacts: doubled/reversed PDF
        # headers, missing headers, assessment sections).  Only reached
        # when the primary pass extracts nothing, so every file that
        # mines today keeps byte-identical results.
        return _extract_recovered(text, chapter_code)

    return _package(questions, chapter_code)


def _subnum_fallback(lines: List[str]) -> List[str]:
    """Scan the final stretch of the document for a contiguous
    "N.N" numbered run (longest increasing subsequence wins)."""
    questions: List[str] = []
    region = lines[-max(200, len(lines) // 3):]
    # stop before the answer key ("Answers to Some Intext Questions"):
    # it renumbers from N.N and would pollute the run
    for j, ln in enumerate(region):
        if re.match(r"^answers\s+to\b", ln, re.I):
            region = region[:j]
            break
    hits = []
    for ln in region:
        ms = _SUB_NUM.match(ln)
        if ms:
            hits.append((int(ms.group(1)), int(ms.group(2)),
                         ms.group(3) or ""))
    # wrapped continuation lines can fake-match ("5.12 K kg mol1 ..."):
    # keep the longest increasing sub-number sequence (LIS) and treat
    # everything else as continuation text of the previous real item
    if hits:
        modal = max({h[0] for h in hits},
                    key=lambda a: sum(1 for h in hits if h[0] == a))
        seq = [h for h in hits if h[0] == modal]
        if seq:
            n = len(seq)
            lis_len = [1] * n
            back = [-1] * n
            for i in range(n):
                for j in range(i):
                    if seq[j][1] < seq[i][1] and lis_len[j] + 1 > lis_len[i]:
                        lis_len[i] = lis_len[j] + 1
                        back[i] = j
            k = max(range(n), key=lambda i: lis_len[i])
            chosen = []
            while k != -1:
                chosen.append(k)
                k = back[k]
            chosen.reverse()
            keep = set(chosen)
        else:
            keep = set(range(len(seq)))
        buf_num = None
        prev_b = 0
        buf: List[str] = []
        for idx, (a, b, rest) in enumerate(seq):
            if idx not in keep:
                if buf and rest:
                    buf.append(rest)
                continue
            if buf_num is not None and buf:
                q = " ".join(buf).strip()
                if _keep(q):
                    questions.append(q)
            buf_num = f"{a}.{b}"
            prev_b = b
            buf = [rest] if rest else []
        if buf_num is not None and buf:
            q = " ".join(buf).strip()
            if _keep(q):
                questions.append(q)
    return questions


def _package(questions: List[str], chapter_code: str) -> List[Dict]:
    """Build the output dicts shared by both extraction passes.

    Question finalization: strip embedded answer-key tails ("Ans: 8 kg")
    here, once, before anything is stored -- a question carrying its own
    answer poisons slot extraction and routing downstream (the tail's
    numbers are answers, not question values)."""
    out: List[Dict] = []
    for i, q in enumerate(questions, start=1):
        q = strip_answer_tail(q).strip() or q
        out.append({
            "qno": i, "text": q[:2000],
            "q_type": _classify_q(q),
            "section": chapter_code,
        })
    return out


# ====================================================================
# Recovery pass for senior NCERT books whose exercises the primary
# pass misses.  Runs ONLY when the primary pass returns zero questions,
# so results for already-mined files are bit-identical.
#
# Failure classes found in the empty files (classes 9-12):
#   a) PDF side-tab columns extract with every letter repeated 4-5x and
#      page-tab words reversed: "ssssseeeeesssssiiiiicccccrrrrreeeeexxxxxEEEEE"
#      is "Exercises", "yyyyyrrrrraaaaammmmmmmmmmuuuuuSSSSS" is "Summary"
#      (leec102, leec205, kepy104, jesc101...).  Question BODIES in these
#      files are clean -- only headers, captions and page numbers are hit.
#   b) Exercise headers the base regex never knew: "notes exercIse",
#      "actIVIty-based QuestIons", "SuggeSted Lab. exerciSeS", "Test Your
#      Understanding", "Review Questions" and assessment sections
#      ("I. Long Answer Questions", "Fill in the Blanks", ...) (kecs107,
#      kehp101, keac202).
#   c) Header split across lines: "E" / "XERCISES" (kebo111).
#   d) Numbered exercise blocks with NO header at all -- the header is a
#      graphic or lands AFTER the questions in the text stream
#      (leec102, leec205, jesc101, jeff103).
# ====================================================================

# runs of >= 4 identical letters are always artifacts (data-checked: the
# doubled side-tabs are 5x, occasionally 4x; legit doubles like "ll"/"ss"
# and roman list markers "(iii)" are runs of 2-3 and survive)
_LETTER_RUN = re.compile(r"([A-Za-z])\1{3,}")
# split header: "E\nXERCISES" -> "EXERCISES"
_SPLIT_EX = re.compile(r"(?m)^E[ \t]*\n[ \t]*XERCISES\b")
# reversed side-tab keywords: only fire when the WHOLE line is one
# alphabetic token whose reversal is one of these known header words
_REVERSED_KEYWORDS = ("exercise", "exercises", "summary")
_DIGIT_TOKEN = re.compile(r"[0-9.]+")

# extended exercise headers (recovered pass only).  Adds the senior-book
# forms the base regex never covered.
_EXERCISE_HDR_EXT = re.compile(
    r"(?:"
    r"(?:notes\s+)?EXERCISES?(?:\s+\d+(?:\.\d+)?)?"
    r"|Exercise\s*\d+(?:\.\d+)?"
    r"|Figure\s+it\s+Out"
    r"|Let\s+Us\s+(?:Do|Try|Think|Discuss|Explore|Answer|Practice|Reflect|"
    r"Work(?:\s+Out)?|Play(?:\s+with)?|Ponder|Argue|Extend|Assess)"
    r"|ACTIVIT(?:Y|IES)\s*$|Activity\s*\d*"
    r"|Project\s+(?:Work|Ideas)"
    r"|Check\s+Your(?:self|Progress|Understanding)?"
    r"|Review\s+Questions"
    r"|Test\s+Your\s*(?:self|Understanding)"
    r"|Suggested\s+Lab\.?\s*Exercises?"
    r"|Activity[- ]Based\s+Questions(?:\s+notes)?"
    r"|(?:[IVX]+\.?\s*)?(?:Very\s+Short|Short|Long)\s+Answer(?:\s+Type)?"
    r"\s+Questions?"
    r"|Objective\s+(?:Type\s+)?Questions?"
    r"|Multiple\s+Choice\s+Questions?"
    r"|Fill\s+in\s+the\s+Blanks"
    r"|State\s+whether\s+True\s+or\s+False"
    r"|Match\s+the\s+Following"
    r")\s*\.?\s*$", re.I)

# exit headers for the recovered header scan (base list + end-matter that
# follows exercises in senior books)
_EXIT_HDR_EXT = re.compile(
    r"^(?:Summary|SUMMARY|What\s+have|Key\s+Points|NOTES?|Things\s+to|"
    r"Fun\s+with|Try\s+These|Suggested\s+Readings|References|Bibliography|"
    r"Appendix|Glossary|Answers)\s*$", re.I)

# headerless exercise blocks: terminal end-matter that must NOT be swept
# into the numbered run (leec102's appendix tables sit behind this line)
_TERMINAL_HDR = re.compile(
    r"^(?:suggested\s+(?:readings|activities)|references|bibliography|"
    r"appendix|glossary|answers?)\s*$", re.I)
# "1." / "1.Explain" / "Q.1." question starts for the headerless scan
_PLAIN_NUM = re.compile(r"^(?:Q\.?\s*)?(\d{1,3})[.)]\s*(.*)$")
# short title-like lines that end a numbered run ("Group Activity",
# "Project Ideas") -- a question line never looks like this
_HEADING_LIKE = re.compile(r"^[A-Z][A-Za-z'\- ]{1,38}$")

# A recovered question must look like an actual task: question word or
# imperative verb prefix, a '?', or a fill-in blank.  This is what keeps
# prose fragments / option-table mashups out of the bank.
_TASK_START = re.compile(
    r"^(?:what|why|how|when|where|which|who|whom|whose|is|are|can|could|"
    r"do|does|did|if|suppose|given|name|state|define|explain|describe|"
    r"list|write|draw|sketch|plot|find|calculate|compute|prove|show|"
    r"solve|identify|differentiate|distinguish|compare|contrast|give|"
    r"complete|fill|choose|tick|match|collect|observe|record|measure|"
    r"take|prepare|make|construct|discuss|justify|classify|arrange|"
    r"estimate|derive|simplify|factorise|factorize|expand|evaluate|"
    r"express|convert|suggest|mention|comment|elaborate|illustrate|"
    r"summarise|summarize|perform|use|read|think|predict|infer|attempt|"
    r"consider|imagine|create|design|plan|select|verify|look|translate|"
    r"balance|pick|have|answer)\b", re.I)
# generic words that double as nouns in prose ("voters list", "state
# government", "the name has") stay prefix-only and are matched anywhere
# only in this stricter verb set
_TASK_VERB_ANY = re.compile(
    r"\b(?:write|draw|explain|define|calculate|compute|prove|"
    r"solve|identify|complete|balance|translate|choose|tick|match|fill|"
    r"prepare|construct|simplify|expand|factorise|factorize|evaluate|"
    r"derive|estimate|convert|express|compare|differentiate|"
    r"distinguish|classify|arrange|discuss|justify|illustrate|"
    r"elaborate|summarise|summarize|collect|suppose|verify|predict|"
    r"infer|create|design|select|sketch|pick)\b", re.I)


def _uncollapse(mo: "re.Match") -> str:
    """Un-double a 4+ letter run.  The side-tab artifact repeats every
    letter of the base word exactly 5x, so a doubled base letter ("mm"
    in "Summary") leaves a run of 10: keep n // 5 copies when the run
    length is a multiple of 5, else a single letter."""
    n = len(mo.group(0))
    return mo.group(1) * (n // 5 if n % 5 == 0 else 1)


def _fix_digit_token(tok: str) -> str:
    """Un-double side-tab numbers: "11111.....22222" -> "1.2".

    Fires only when EVERY run in the token has the same length >= 3 and
    there are at least two runs, so real numbers ("1000", "2002",
    "111") pass through untouched.  A run of 10 is a doubled base
    digit ("00" x5) and un-collapses to two.
    """
    if not tok or not _DIGIT_TOKEN.fullmatch(tok):
        return tok
    runs: List[List] = []
    for ch in tok:
        if runs and runs[-1][0] == ch:
            runs[-1][1] += 1
        else:
            runs.append([ch, 1])
    if len(runs) >= 2 and runs[0][1] >= 3 and \
            len({n for _, n in runs}) == 1:
        n = runs[0][1]
        copies = n // 5 if n % 5 == 0 else 1
        return "".join(ch * copies for ch, _ in runs)
    return tok


def _repair_text(text: str) -> str:
    """Deterministic repair of PDF extraction artifacts.  Every rule is a
    no-op on clean text, so only corrupted files are changed."""
    # a fill-in blank extracted as its own line gets furniture-filtered
    # before any scan can see it -- re-join it to its question line
    out: List[str] = []
    for ln in text.split("\n"):
        if re.fullmatch(r"_{6,}[.]?", ln.strip()) and out:
            out[-1] = out[-1].rstrip() + " " + ln.strip()
            continue
        out.append(ln)
    text = "\n".join(out)
    text = _SPLIT_EX.sub("EXERCISES", text)
    text = _LETTER_RUN.sub(_uncollapse, text)
    out: List[str] = []
    for ln in text.split("\n"):
        s = ln.strip()
        if s and re.fullmatch(r"[A-Za-z]+", s):
            low = s.lower()
            if low not in _REVERSED_KEYWORDS and \
                    low[::-1] in _REVERSED_KEYWORDS:
                fixed = s[::-1]
                ln = fixed.upper() if s.isupper() else fixed
        ln = " ".join(_fix_digit_token(t) for t in ln.split(" "))
        out.append(ln)
    return "\n".join(out)


def _task_like(q: str) -> bool:
    """Recovered questions must look like real tasks, not prose."""
    if "?" in q or "___" in q:
        return True
    return bool(_TASK_START.match(q) or _TASK_VERB_ANY.search(q))


def _keep_rec(q: str) -> bool:
    """Relaxed keep for the recovered scans: the production _keep drops
    short imperatives without '?' or digits ("Explain the functional
    limitations of sense organs.") as heading-like; the task filter
    rescues exactly those."""
    return _keep(q) or _task_like(q)


def _junk_rec(q: str) -> bool:
    """Residue the task filter cannot see: bare instruction lines,
    questions that swallowed a worked example's "Solution" boundary,
    and numbered glossary entries ("Specialised financial
    institutions: A number of ...") that are definitions, not tasks."""
    if len(q) < 60 and q.rstrip().endswith(":"):
        return True
    if re.search(r"\.\s+Solution\s", q):
        return True
    if not _TASK_START.match(q) and re.match(
            r"^[A-Z][A-Za-z ,()'-]{3,48}:\s+[A-Za-z(]", q):
        return True
    return False


def _header_verified(lines: List[str], i: int) -> bool:
    """A real exercise header is followed within a few lines by a
    numbered item.  Side-tab artifacts like the late "Exercises" tab in
    leec205 are NOT (bullets/prose follow) -- reject those."""
    seen = 0
    for ln in lines[i + 1:]:
        if not ln:
            continue
        ms = _SUB_NUM.match(ln)
        if ms:
            return True
        m = _Q_START.match(ln)
        if m and m.group(1):
            return True
        seen += 1
        if seen >= 6:
            return False
    return False


def _scan_exercise_hdrs(text: str) -> List[str]:
    """Primary scan re-run over repaired text with the extended header
    set (recovered pass only)."""
    questions: List[str] = []
    in_exercise = False
    current: List[str] = []
    lines = _clean_lines(text)

    def _flush():
        nonlocal current
        if in_exercise and current:
            q = " ".join(current).strip()
            if _keep_rec(q):
                questions.append(q)
        current = []

    for i, ln in enumerate(lines):
        if _EXERCISE_HDR_EXT.match(ln):
            _flush()
            in_exercise = _header_verified(lines, i)
            continue
        if _EXIT_HDR_EXT.match(ln):
            _flush()
            in_exercise = False
            continue
        ms = _SUB_NUM.match(ln)
        if in_exercise and ms:
            _flush()
            current = [ms.group(3)] if ms.group(3) else []
            continue
        m = _Q_START.match(ln)
        if in_exercise and m and m.group(1):
            _flush()
            current = [m.group(2)] if m.group(2) else []
            continue
        if in_exercise and ln:
            current.append(ln)
    _flush()
    return questions


def _scan_plain_numbers(text: str) -> List[str]:
    """Headerless exercise blocks (leec102, leec205, jesc101, jeff103):
    a contiguous increasing run of "1." ... "N." lines near the end of
    the file is the exercise.  The longest strictly increasing
    subsequence wins; wrapped continuation lines join their question."""
    lines = _clean_lines(text)
    region = lines[-max(200, len(lines) // 3):]
    for j, ln in enumerate(region):
        if _TERMINAL_HDR.match(ln):
            region = region[:j]
            break
    hits = []
    for idx, ln in enumerate(region):
        m = _PLAIN_NUM.match(ln)
        if m and int(m.group(1)) <= 40:
            hits.append((idx, int(m.group(1)), m.group(2) or ""))
    if not hits:
        return []
    n = len(hits)
    lis_len = [1] * n
    back = [-1] * n
    for i in range(n):
        for j in range(i):
            if hits[j][1] < hits[i][1] and lis_len[j] + 1 >= lis_len[i]:
                # ">=" (not ">"): on ties prefer the LATER predecessor, so
                # a numbered glossary earlier in the file never hijacks
                # the back-chain of the real exercise run
                lis_len[i] = lis_len[j] + 1
                back[i] = j
    k = max(range(n), key=lambda i: (lis_len[i], i))
    if lis_len[k] < 3:
        return []  # too short to trust as an exercise block
    chain = [k]
    while back[k] != -1:
        # chain-coherence: consecutive exercise items never sit far
        # apart; a huge jump means the LIS spliced two unrelated lists
        # (a numbered glossary + the exercise).  Long multi-line
        # questions plus page furniture can legitimately span ~25 lines.
        if hits[k][0] - hits[back[k]][0] > 30:
            break
        k = back[k]
        chain.append(k)
    if len(chain) < 3:
        return []
    keep = {hits[i][0] for i in chain}
    questions: List[str] = []
    buf: Optional[List[str]] = None
    for idx, ln in enumerate(region):
        m = _PLAIN_NUM.match(ln)
        if m and idx in keep:
            if buf is not None:
                q = " ".join(buf).strip()
                if _keep_rec(q):
                    questions.append(q)
            buf = [m.group(2)] if m.group(2) else []
            continue
        if buf is None:
            continue
        if _HEADING_LIKE.match(ln):
            # section break ("Group Activity"): close the last question
            q = " ".join(buf).strip()
            if _keep_rec(q):
                questions.append(q)
            buf = None
            continue
        if ln:
            buf.append(ln)
    if buf is not None:
        q = " ".join(buf).strip()
        if _keep_rec(q):
            questions.append(q)
    return questions


def _extract_recovered(text: str, chapter_code: str) -> List[Dict]:
    """Second pass over a file the primary pass could not read.

    Preference order (most precise first): repaired-text header scan,
    headerless numbered run, N.N run.  A candidate set must survive the
    task filter with >= 3 items to win immediately; smaller sets are
    only used if nothing larger exists.
    """
    repaired = _repair_text(text)
    candidates: List[List[str]] = []
    for scan in (_scan_exercise_hdrs, _scan_plain_numbers,
                 lambda t: _subnum_fallback(_clean_lines(t))):
        qs = [q for q in scan(repaired)
              if _task_like(q) and not _junk_rec(q)]
        if len(qs) >= 3:
            return _package(qs, chapter_code)
        if qs:
            candidates.append(qs)
    if candidates:
        return _package(max(candidates, key=len), chapter_code)
    return []


def _keep(q: str) -> bool:
    """Len>20 always; drop section-title fragments ('Fibonaccis Numbers'):
    no '?' and no digit and fewer than 8 words is a heading, not a task."""
    if len(q) <= 20:
        return False
    if "?" not in q and not re.search(r"\d", q) and len(q.split()) < 8:
        return False
    return True


def _classify_q(text: str) -> str:
    tl = text.lower()
    if re.search(r"\(a\)", tl):
        return "MCQ"
    if re.search(r"prove|show\s+that|justify", tl):
        return "PROOF"
    if re.search(r"draw|sketch|plot|construct", tl):
        return "CONSTRUCTION"
    if re.search(r"explain|describe|define|state|list|differentiate",
                 tl):
        return "THEORY"
    return "NUMERICAL"


# A book-chapter file is <4-letter code><pure chapter digits>, e.g.
# "gemh101".  Board-paper files never match (they carry underscores:
# "cbse_sqp_uni_0000").  NCERT's first letter encodes the class
# (a=1 ... l=12), so unknown codes still get a class.
_CLASS_LETTERS = {c: i + 1 for i, c in enumerate("abcdefghijkl")}


def _book_code(stem: str) -> Optional[Tuple[str, int]]:
    if len(stem) < 5:
        return None
    code = stem[:4].lower()
    if not code.isalpha():
        return None
    if not stem[4:].isdigit():
        return None
    cls = _CLASS_LETTERS.get(stem[0].lower())
    if cls is None:
        return None
    return code, cls


# 2023+ NCERT rationalised books (new syllabus): class letter is the
# FIRST char (f=6, g=7, h=8, i=9, j=10, k=11, l=12), subject is in the
# tail.  fegp=Ganita Prakash, fecu=Curiosity, fees=Exploring Society,
# fepr=Poorvi, fhml=Malhar, febe=?, etc.
_NEW_SYLLABUS = {
    "gp": "maths", "mh": "maths",
    "cu": "science", "sc": "science",
    "es": "social_science", "ss": "social_science", "st": "social_science",
    "pr": "english", "ww": "english", "fp": "english", "ff": "english",
    "ml": "hindi", "hl": "hindi", "kr": "hindi", "ks": "hindi",
    "be": "sanskrit", "vd": "urdu", "ga": "sanskrit",
    "ac": "accountancy", "bs": "business_studies", "ec": "economics",
    "ph": "physics", "ch": "chemistry", "bo": "biology",
    "cs": "computer_science", "ip": "computer_science",
    "bt": "biotechnology", "ps": "psychology", "gy": "geography",
    "hs": "history", "sy": "sociology", "vt": "vocational",
    "kl": "english",
}


def _subject_for(code: str, cls: int) -> str:
    if code in _CODE_MAP:
        return _CODE_MAP[code][0]
    tail = code[1:]
    # new-syllabus books: last 2 letters carry the subject
    if tail[-2:] in _NEW_SYLLABUS:
        return _NEW_SYLLABUS[tail[-2:]]
    if tail in ("emh", "egp", "gp", "emm", "emg"):
        return "maths"
    if tail in ("esc", "ess", "sc1", "sc2"):
        return "science" if tail.endswith("sc") or tail == "esc" \
            else "social_science"
    if tail.startswith("h") or tail in ("hdv", "vs", "at", "ar",
                                        "he", "hh", "sy"):
        return "hindi"
    if tail in ("eww", "ap", "sr", "eh1", "eh2"):
        return "english"
    if "bu" in tail or tail in ("erd", "ec", "ek"):
        return "social_science"
    return "academic"


def main() -> None:
    import argparse
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, default=0,
                    help="max files to mine")
    args = ap.parse_args()

    CACHE_DIR = Path(os.environ.get(
        "NCERT_CACHE",
        r"D:\node_generator\ncert-mcp\data\processed\text_cache"))
    all_files = sorted(CACHE_DIR.glob("*.txt"))

    mineable = []
    for f in all_files:
        hit = _book_code(f.stem)
        if hit:
            code, cls = hit
            mineable.append((f, code, _subject_for(code, cls), cls))

    if args.limit:
        mineable = mineable[:args.limit]

    print(f"files to mine: {len(mineable)} of {len(all_files)} total")

    conn = sqlite3.connect(str(DB))
    stats = {"files": 0, "questions": 0, "errors": 0}

    for f, code, subject, cls in mineable:
        chapter_code = code
        try:
            text = f.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            stats["errors"] += 1
            continue

        # check for duplicate
        doc_name = f"ncert_{f.stem}"
        dup = conn.execute("SELECT id FROM documents WHERE filename=?",
                           (doc_name,)).fetchone()
        if dup:
            continue

        questions = _extract_questions(text, subject, cls, chapter_code)
        if not questions:
            continue

        cur = conn.execute(
            "INSERT INTO documents(filename, path, doc_type, subject, "
            "class_label, session, n_questions) "
            "VALUES (?,?,?,?,?,?,?)",
            (doc_name, str(f), "TEXTBOOK", subject, f"Class_{cls}",
             "2024-25", len(questions)))
        doc_id = cur.lastrowid
        for i, q in enumerate(questions, start=1):
            conn.execute(
                "INSERT INTO questions(doc_id, qno, section, q_type, "
                "marks, is_competency, text) "
                "VALUES (?,?,?,?,NULL,0,?)",
                (doc_id, i, q["section"], q["q_type"], q["text"]))
        stats["files"] += 1
        stats["questions"] += len(questions)
        if stats["files"] % 100 == 0:
            print(f"  ... {stats['files']} files, "
                  f"{stats['questions']} questions", flush=True)
            conn.commit()

    conn.commit()
    conn.close()
    print(f"DONE: {stats['files']} files, "
          f"{stats['questions']} questions, {stats['errors']} errors")


if __name__ == "__main__":
    main()
