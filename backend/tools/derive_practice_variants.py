"""derive_practice_variants.py -- GEN-2 practice variant expansion (zero-wrong).

For every teaching node (9,099) EXCEPT Hindi-medium subjects (hin_*), derive
additional PRACTICE questions STRICTLY from the node's own authored content,
emitting a JSONL batch loadable into the board_questions table
(source_type="practice", source_file="practice_variants/<node>.md").

Transforms (all extractive, no new facts):
  * fill_blank            - authored sentence (DEFINITION / WALKTHROUGH /
                            PREREQ_CONCEPT / MASTERY_CRITERIA) with one content
                            word or number blanked ("______").
  * true_false (True)     - an authored declarative DEFINITION sentence,
                            verbatim.
  * true_false (False)    - the authored misconception claim ("Students believe
                            that X"), only when the same authored section later
                            corrects it (correction marker required).
  * formula_calc          - parametrized generation grounded in the node's own
                            THIS_FORMULA (strict ASCII whitelist, safe AST
                            evaluation, deterministic answer; only results that
                            are exact integers or exact 2-decimal values kept;
                            question says "up to 2 decimal places" so the
                            grader's 0.001 numeric tolerance is safe).

Zero-wrong verification (enforced again independently by
verify_practice_variants.py over the emitted JSONL):
  * every content word (>=4 chars) of question/answer must occur in the node's
    own md file (framing prefixes whitelisted separately);
  * every number must occur in the file, except formula_calc items where the
    numbers are the generated inputs and the computed answer (recorded in
    gen_numbers and cross-checked by recomputation);
  * no node-id patterns anywhere student-facing;
  * T/F True claims are verbatim substrings of the cleaned section;
  * T/F False claims sit inside the misconception section AND a correction
    marker follows them in the same section;
  * fill_blank answers occur exactly once in the source sentence;
  * global + within-batch normalized-text dedup (vs live board_questions).

Usage:  python derive_practice_variants.py [--dry] [--limit N] [--out FILE]
"""
import ast
import importlib.util
import json
import os
import random
import re
import sys
from collections import Counter, defaultdict

MD = r"D:\platform\deploy\content\enhanced_nodes_md"
INDEX = r"D:\platform\backend\_cache\enhanced_nodes_index.json"
LIVE_TEXTRACT = r"D:\platform\_gen2_existing_qtexts.json"
OUT_DEFAULT = r"D:\platform\_gen2_practice_variants.jsonl"

DRY = "--dry" in sys.argv
LIMIT = None
if "--limit" in sys.argv:
    LIMIT = int(sys.argv[sys.argv.index("--limit") + 1])
OUT = OUT_DEFAULT
if "--out" in sys.argv:
    OUT = sys.argv[sys.argv.index("--out") + 1]

# --------------------------------------------------------------------------- #
# canonical filename parser (single source of truth with the backend)
# --------------------------------------------------------------------------- #
_spec = importlib.util.spec_from_file_location(
    "enh", r"D:\platform\deploy\backend\services\enhanced_nodes.py")
enh = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(enh)

# --------------------------------------------------------------------------- #
# extraction helpers (mirrors derive_eli5.py)
# --------------------------------------------------------------------------- #
_SEC = lambda name: re.compile(
    r"^##[ \t]*" + name + r"[ \t]*\n(.*?)(?=^##(?!#)|\Z)", re.M | re.S)
MATH_SPAN_RE = re.compile(
    r"\\\(.{0,400}?\\\)|\\\[.{0,400}?\\\]|\$\$.{0,400}?\\$\$|\$[^$\n]{1,200}\$")
SENT_SPLIT_RE = re.compile(r"(?<=[.!?\u0964])\s+(?=[A-Z0-9\u0915-\u0939\"(\[])")
MARKDOWN_JUNK_RE = re.compile(r"\*\*|`{1,3}|^#{1,6}\s", re.M)
NODE_ID_RE = re.compile(r"\bc\d+_[a-z0-9]|\.md\b|_cbse\b|cbse_\d", re.I)
BLANK = "______"

def _clean(text: str) -> str:
    text = MARKDOWN_JUNK_RE.sub("", text or "")
    text = text.replace("*", "")          # bold ** and italic * markers
    text = re.sub(r"\[\]\([^)]*\)", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text

def _prose_ratio(sentence: str) -> float:
    stripped = MATH_SPAN_RE.sub("", sentence)
    if not stripped:
        return 0.0
    good = sum(ch.isalnum() or ch.isspace() for ch in stripped)
    return good / max(1, len(stripped))

def _sentences(text: str):
    text = _clean(text)
    out = []
    for s in SENT_SPLIT_RE.split(text):
        s = s.strip(" ;:,\u2013\u2014-")
        if len(s) >= 25:
            out.append(s)
    return out

_MATH_GLYPHS_RE = re.compile(r"[=τθ⊥ΣΣ√πΔ∫≤≥≠≈∞±×·°′″Ωμαβγδφλμσ\r]")

def _usable_sentence(s: str) -> bool:
    """A sentence safe to transform into a student-facing question body."""
    if _HAS_DEV.search(s):
        # Devanagari (Hindi) sentence - different usability rules: no case,
        # verbs are Hindi auxiliaries, danda-terminated prose.
        if not (40 <= len(s) <= 280):
            return False
        if MATH_SPAN_RE.search(s) or _MATH_GLYPHS_RE.search(s):
            return False
        if NODE_ID_RE.search(s):
            return False
        if re.search(r"_{3,}", s):
            return False
        if _prose_ratio(s) < 0.86:
            return False
        if re.search(r"\bTODO\b|http", s, re.I):
            return False
        if not _HI_VERB_RE.search(s):
            return False
        return True
    if not (40 <= len(s) <= 240):
        return False
    if MATH_SPAN_RE.search(s) or _MATH_GLYPHS_RE.search(s):
        return False
    if NODE_ID_RE.search(s):
        return False
    if re.search(r"_{3,}", s):
        return False           # authored blank already present
    if _prose_ratio(s) < 0.86:
        return False
    if re.search(r"following|et cetera|etc\.|\bTODO\b|http", s, re.I):
        return False
    if not s[0].isupper():
        return False
    # must contain at least one verb-ish lowercase word (not a heading fragment)
    if not re.search(r"\b(is|are|was|were|has|have|can|will|occurs|occur|"
                     r"refers|means|helps|help|form|forms|called|known|"
                     r"involves|involve|provides|provide|contains|contain|"
                     r"produces|produce|includes|include|requires|require|"
                     r"performs|perform|carries|carry|maintains|maintain|"
                     r"becomes|become|gives|give|takes|take|moves|move|"
                     r"works|work|shows|show|uses|use|needs|need|lies|lie|"
                     r"serves|serve|acts|act|holds|hold|plays|play|"
                     r"allows|allow|enables|enable|creates|create|makes|make|"
                     r"leads|lead|comes|come|goes|go|gets|get|puts|put|"
                     r"represents|represent|describes|describe|defines|define|"
                     r"measures|measure|depends|depend|differs|differ|"
                     r"appears|appear|remains|remain|stays|stay|keeps|keep|"
                     r"starts|start|ends|end|continues|continue|happens|"
                     r"happen|exists|exist|belongs|belong|connects|connect|"
                     r"travels|travel|flows|flow|rises|rise|falls|fall|"
                     r"grows|grow|changes|change|learn|learned|eat|eats|"
                     r"breathe|breathe)\b", s.lower()):
        return False
    return True

STOP_ANSWERS = frozenset("""
this that these those they their there then than thus hence therefore because
while where when which what whose how why also both each every some many most
more less least other another same only just very often always never sometimes
usually between during after before above below under over again further once
here from into onto upon about against without within through throughout since
until unless whether either neither such itself yourself themselves himself
herself ourselves students student example examples note chapter class topic
section figure table image below above first second third fourth fifth sixth
seventh eighth ninth tenth eleventh twelfth however although though moreover
furthermore additionally consequently therefore finally additionally
include includes including involve involves make makes made using used uses
called known given taken shown found based different various several numerous
important essential necessary primary main major minor common simple complex
process processes system systems method methods type types kind kinds way ways
level levels part parts form forms number numbers amount amounts value values
""".split())

# --------------------------------------------------------------------------- #
# fidelity verification (derive_eli5.verify_fidelity pattern)
# --------------------------------------------------------------------------- #
_NUM_RE = re.compile(r"\d+")
_WORD_RE = re.compile(r"[A-Za-z]{4,}")

# framing prefixes we add ourselves - verified against this whitelist only
PREFIX_WHITELIST_WORDS = frozenset("""
fill in the blank true or false using formula this topic from calculate give
your answer up to decimal places if needed compute when
""".split())

def _strip_known_prefix(q: str):
    for p in ("Fill in the blank: ", "True or false: ", "True or False: "):
        if q.startswith(p):
            return q[len(p):], True
    return q, False


def verify_row(row: dict, source_text: str) -> list:
    """Mechanical zero-wrong verification of one emitted row.
    Returns list of violations ([] == pass)."""
    src = source_text.lower()
    bad = []
    q = row["question_text"]
    a = str(row["correct_answer"])
    is_formula = row.get("transform") == "formula_calc"

    body, had_prefix = _strip_known_prefix(q)
    if is_formula:
        had_prefix = True  # framing words in formula questions are ours

    # node-id / internal-id leak
    for field_name, field in (("question", q), ("answer", a),
                              ("explanation", row.get("explanation", ""))):
        if NODE_ID_RE.search(field):
            bad.append(f"node-id-pattern-in-{field_name}")

    # word fidelity: every content word of question body + answer in source
    for w in _WORD_RE.findall(body.lower()):
        if had_prefix and w in PREFIX_WHITELIST_WORDS:
            continue
        if w not in src:
            bad.append("word-not-in-source:" + w)
    for w in _WORD_RE_HI.findall(body):
        if w not in src:
            bad.append("hi-word-not-in-source:" + w)
    for w in _WORD_RE.findall(a.lower()):
        if row["question_type"] == "true_false" and w in ("true", "false"):
            continue
        if w not in src:
            bad.append("answer-word-not-in-source:" + w)
    for w in _WORD_RE_HI.findall(a):
        if w not in src:
            bad.append("hi-answer-word-not-in-source:" + w)

    # number fidelity
    qnums = _NUM_RE.findall(body)
    if is_formula:
        gen = set(row.get("gen_numbers") or [])
        for n in qnums:
            if n not in src and n not in gen and \
                    not any(n in g for g in gen):
                bad.append("number-not-in-source-or-generated:" + n)
    else:
        for n in qnums:
            if n not in src:
                bad.append("number-not-in-source:" + n)
    for n in _NUM_RE.findall(a):
        if n not in src and n != a and n not in qnums and not is_formula:
            bad.append("answer-number-not-in-source:" + n)

    # transform-specific checks
    if row["question_type"] == "fill_blank":
        if q.count(BLANK) != 1:
            bad.append("blank-count-not-1")
        sent = body.replace(BLANK, " ")
        vis = re.search(r"(?<![A-Za-z0-9ऀ-ॣ०-ॿ])" + re.escape(a.lower()) +
                        r"(?![A-Za-z0-9ऀ-ॣ०-ॿ])", sent.lower())
        if vis:
            bad.append("answer-still-visible-in-question")
    elif row["question_type"] == "true_false":
        if a not in ("True", "False"):
            bad.append("tf-answer-not-true-false")
        claim = body
        cleaned_src = re.sub(r"\s+", " ", _clean(source_text)).lower()
        if claim.rstrip(".").lower() not in cleaned_src:
            bad.append("tf-claim-not-verbatim-in-source")
    elif is_formula:
        try:
            val = eval_formula(row["formula_rhs"], row["formula_vars"])
            if val is None or abs(val - float(a)) > 5e-3:
                bad.append("formula-recompute-mismatch")
        except Exception:
            bad.append("formula-recompute-error")

    # sanity
    if not (25 <= len(q) <= 400):
        bad.append("question-length-out-of-range")
    if not (1 <= len(a) <= 90):
        bad.append("answer-length-out-of-range")
    if MATH_SPAN_RE.search(q):
        bad.append("math-span-in-question")
    return bad


# --------------------------------------------------------------------------- #
# formula engine (strict whitelist + safe AST evaluation)
# --------------------------------------------------------------------------- #
_SUBSCRIPTS = str.maketrans("₀₁₂₃₄₅₆₇₈₉", "0123456789")

def _norm_formula(text: str) -> str:
    t = text.strip()
    t = t.translate(_SUBSCRIPTS)
    t = t.replace("×", "*").replace("·", "*").replace("−", "-")
    t = t.replace("²", "**2").replace("³", "**3")
    t = t.replace("**", "^")
    return t

_FORMULA_CUT_RE = re.compile(
    r"\s+where\s+|\s+and\s+|\s+for\s+|,|;|\(|\[|\{", re.I)
_RHS_ALLOWED_RE = re.compile(r"^[A-Za-z0-9_+\-*/^().\s]+$")
_IDENT_RE = re.compile(r"\b[A-Za-z][A-Za-z0-9_]*\b")
_NUMTok_RE = re.compile(r"\b\d+(?:\.\d+)?\b")
_FUNCTION_RE = re.compile(
    r"\b(tan|sin|cos|log|ln|sqrt|exp|abs|max|min|hypot|arctan|arcsin|"
    r"arccos|log10|log2|det|mod|deg|rad|sec|cosec|csc|cot)\b", re.I)
#: multi-character variable names we accept as unambiguous
KNOWN_VARS = frozenset("""
rho area length width height base radius diameter perimeter volume side
principal rate time interest amount distance speed mass velocity acceleration
force work power energy charge current resistance potential frequency
wavelength amplitude pressure temperature density mean median mode range
profit loss cost price selling marked discount sum product difference
quotient remainder numerator denominator hypotenuse perpendicular adjacent
opposite breadth circumference arc sector length breadth
""".split())

def _ident_ok(ident: str) -> bool:
    return (len(ident) == 1 or "_" in ident
            or ident.lower() in KNOWN_VARS)

def parse_formula(section_text: str):
    """Strictly parse 'LHS = RHS' from the node's THIS_FORMULA first line.
    Returns (lhs, rhs_display, rhs_eval) or None."""
    first = ""
    for line in section_text.splitlines():
        line = line.strip()
        if line and not line.startswith("#"):
            first = line
            break
    if not first or "N/A" in first.upper():
        return None
    t = _norm_formula(_clean(first))
    t = _FORMULA_CUT_RE.split(t)[0].strip()
    if t.count("=") != 1:
        return None
    lhs, rhs = t.split("=")
    lhs = lhs.strip()
    rhs = rhs.strip()
    if "\\" in t or "_" in lhs or "<" in t or ">" in t:
        return None
    if not re.fullmatch(r"[A-Za-z][A-Za-z0-9_]*", lhs) or not _ident_ok(lhs):
        return None
    if not _RHS_ALLOWED_RE.match(rhs):
        return None
    if _FUNCTION_RE.search(rhs):
        return None  # a function name would be misread as a variable
    if any(w in rhs.lower().split() for w in
           ("where", "and", "or", "if", "sum", "for", "when")):
        return None
    # implicit multiplication: insert * between adjacent atoms
    rhs = re.sub(r"\)\s*(?=[A-Za-z0-9(])", ")*", rhs)
    rhs = re.sub(r"([A-Za-z0-9])\s*\(", r"\1*(", rhs)
    rhs = re.sub(r"\b(\d+)\s*([A-Za-z])", r"\1*\2", rhs)
    rhs = re.sub(r"([A-Za-z_]|\))\s+(?=[A-Za-z_(])", r"\1*", rhs)
    toks = _IDENT_RE.findall(rhs)
    if not toks:
        return None
    if not all(_ident_ok(i) for i in toks):
        return None  # e.g. 'mx' - ambiguous compound identifier
    if not _NUMTok_RE.findall(rhs) and len(set(toks)) < 2 and "^" not in rhs:
        return None  # single variable, no operators - nothing to compute
    rhs_eval = rhs.replace("^", "**")
    # validate structure via AST
    try:
        tree = ast.parse(rhs_eval, mode="eval")
        _check_ast(tree.body)
    except Exception:
        return None
    rhs_display = rhs.replace("*", "×")
    rhs_display = re.sub(r"\s+", " ", rhs_display)
    return lhs, rhs_display, rhs_eval

def _check_ast(node):
    allowed = (ast.BinOp, ast.UnaryOp, ast.Constant, ast.Name,
               ast.Add, ast.Sub, ast.Mult, ast.Div, ast.Pow, ast.USub,
               ast.UAdd, ast.Load, ast.Expression)
    if not isinstance(node, allowed):
        raise ValueError("disallowed node: " + type(node).__name__)
    for child in ast.iter_child_nodes(node):
        _check_ast(child)

def eval_formula(rhs_eval: str, values: dict):
    tree = ast.parse(rhs_eval, mode="eval")
    return _safe_eval(tree.body, values)

def _safe_eval(node, values):
    if isinstance(node, ast.Constant):
        if not isinstance(node.value, (int, float)):
            raise ValueError("non-numeric constant")
        return float(node.value)
    if isinstance(node, ast.Name):
        return float(values[node.id])
    if isinstance(node, ast.UnaryOp) and isinstance(node.op, (ast.USub, ast.UAdd)):
        v = _safe_eval(node.operand, values)
        return -v if isinstance(node.op, ast.USub) else v
    if isinstance(node, ast.BinOp):
        l = _safe_eval(node.left, values)
        r = _safe_eval(node.right, values)
        if isinstance(node.op, ast.Add):
            return l + r
        if isinstance(node.op, ast.Sub):
            return l - r
        if isinstance(node.op, ast.Mult):
            return l * r
        if isinstance(node.op, ast.Div):
            if abs(r) < 1e-9:
                raise ZeroDivisionError
            return l / r
        if isinstance(node.op, ast.Pow):
            if abs(r) > 8:
                raise ValueError("exponent too large")
            return l ** r
    raise ValueError("bad node")

def _fmt_val(x: float) -> str:
    if abs(x - round(x)) < 1e-9:
        return str(int(round(x)))
    s = f"{x:.2f}"
    return s.rstrip("0").rstrip(".") if "." in s else s

def _acceptable_result(x) -> bool:
    if x is None or x != x or abs(x) == float("inf"):
        return False
    if abs(x) > 1e7 or (abs(x) < 1e-4 and x != 0):
        return False
    return abs(x - round(x)) < 1e-9 or abs(x * 100 - round(x * 100)) < 1e-6

def formula_variants(section_text: str, seed_base: str, want: int = 2):
    """Generate up to `want` parametrized items from the node's formula."""
    parsed = parse_formula(section_text)
    if parsed is None:
        return []
    lhs, rhs_display, rhs_eval = parsed
    idents = sorted(set(_IDENT_RE.findall(rhs_eval)))
    # drop pure numeric-lookalikes captured by ident regex (none possible) --
    # and drop identifiers that are actually keywords
    idents = [i for i in idents if i.lower() not in ("pi", "e", "inf", "nan")]
    if not idents:
        return []
    # identifiers in exponent position get small values
    exp_idents = set()
    try:
        for node in ast.walk(ast.parse(rhs_eval, mode="eval")):
            if isinstance(node, ast.Pow) and isinstance(node.right, ast.Name):
                exp_idents.add(node.right.id)
    except Exception:
        pass
    out = []
    for k in range(400):
        if len(out) >= want:
            break
        rng = random.Random(f"{seed_base}::formula::{k}")
        values = {}
        for i in idents:
            if i in exp_idents:
                values[i] = rng.randint(2, 4)
            else:
                values[i] = rng.randint(2, 25)
        try:
            x = eval_formula(rhs_eval, values)
        except Exception:
            continue
        if not _acceptable_result(x):
            continue
        val_str = _fmt_val(x)
        assign = ", ".join(f"{i} = {_fmt_val(values[i])}" for i in idents)
        q = (f"Using the formula {lhs} = {rhs_display} from this topic, "
             f"calculate {lhs} when {assign}. "
             f"Give your answer up to 2 decimal places if needed.")
        gen_numbers = [str(v) for v in values.values()]
        out.append({
            "question_type": "numeric",
            "transform": "formula_calc",
            "question_text": q,
            "correct_answer": val_str,
            "formula_rhs": rhs_eval,
            "formula_vars": values,
            "gen_numbers": gen_numbers,
            "explanation": ("Calculated from the formula stated in this "
                            "topic: " + lhs + " = " + rhs_display + "."),
        })
    return out


# --------------------------------------------------------------------------- #
# fill-blank engine
# --------------------------------------------------------------------------- #
_TOKEN_RE = re.compile(r"[A-Za-z][A-Za-z0-9'\-]*|\d+(?:,\d{3})*(?:\.\d+)?%?")
_TOKEN_RE_HI = re.compile(r"[ऀ-ॣ०-ॿ]+|\d+(?:,\d{3})*(?:\.\d+)?%?")
_WORD_RE_HI = re.compile(r"[ऀ-ॣ०-ॿ]{2,}")
_HAS_DEV = re.compile(r"[ऀ-ॣ०-ॿ]")
_HI_VERB_RE = re.compile(
    r"(है|हैं|था|थी|थे|होगा|होगी|होंगे|करता|करती|करते|होता|होती|होते|"
    r"देता|देती|देते|किया|किए|जाता|जाती|जाते|रहता|रहती|रहते|बनता|बनती|"
    r"बनते|मिलता|मिलती|मिलते|दिखाता|दिखाती|दिखाते|दर्शाता|दर्शाती|कहता|"
    r"कहती|लिखता|बताता|बताती|पाता|पाती|उठाता|उठाती|जोड़ता|जोड़ती|"
    r"रखता|रखती|होना|करना|देना|मिलना|बनना|जाना|आता|आती)")
_HI_STOP = frozenset("""
और में का के की से है हैं को पर यह वह इस उस एक भी तो ही या जो कि अर्थात जैसे
तथा अतः परंतु लेकिन किंतु जब तब यदि अगर यहाँ वहाँ वहां यहां अब हम आप हमें
आपको मुझे मुझे हमें इसे उसे इसी उसी अपना अपनी अपने बहुत सब सभी कुछ किसी
किसी हर हर एक वही यही ऐसा ऐसी ऐसे कैसे क्या क्यों क्योंकि इसलिए उसलिए
साथ बिना बिना द्वारा लिए के लिए में भी नहीं न ही ना था थी थे होता होती होते
करता करती करते देता देती देते जाता जाती जाते रहता रहती रहते
""".split())
_RANGE_ADJ_RE = re.compile(r"\d\s*[\u2013\u2014-]\s*\d")

def _strip_punct(tok: str) -> str:
    return tok.strip(".,;:!?'\"()[]\u201c\u201d\u2018\u2019")

def fill_blank_candidates(sentence: str, section_tag: str):
    """Yield (answer, difficulty, priority, tag, blank_once) candidates."""
    if _HAS_DEV.search(sentence):
        # Hindi: no case distinction, so blank distinctive long Devanagari
        # content words (>=4 chars, non-stopword, occurring exactly once) and
        # numbers.
        toks_hi = _TOKEN_RE_HI.findall(sentence)

        def count_word_hi(ans: str) -> int:
            pat = re.compile(r"(?<![ऀ-ॣ०-ॿ0-9])" + re.escape(ans) +
                             r"(?![ऀ-ॣ०-ॿ0-9])")
            return len(pat.findall(sentence))

        def blank_once_hi(s: str, ans: str):
            pat = re.compile(r"(?<![ऀ-ॣ०-ॿ0-9])" + re.escape(ans) +
                             r"(?![ऀ-ॣ०-ॿ0-9])")
            return pat.sub(BLANK, s, count=1)

        seen = []
        numbers = [t for t in toks_hi if re.match(r"\d", t)]
        if len(numbers) <= 4:
            for tok in numbers:
                core = _strip_punct(tok)
                if core and count_word_hi(core) == 1:
                    seen.append((core, "medium", 1))
        for tok in toks_hi:
            core = _strip_punct(tok)
            if len(core) < 4 or not _HAS_DEV.fullmatch(core):
                continue
            if core in _HI_STOP:
                continue
            if count_word_hi(core) != 1:
                continue
            seen.append((core, "easy" if len(core) < 8 else "medium", 0))
        for ans, diff, pri in seen:
            yield ans, diff, pri, section_tag, blank_once_hi
        return
    toks = _TOKEN_RE.findall(sentence)
    lower_s = sentence.lower()

    def count_word(ans: str) -> int:
        pat = re.compile(r"(?<![A-Za-z0-9])" + re.escape(ans.lower()) +
                         r"(?![A-Za-z0-9])")
        return len(pat.findall(lower_s))

    def blank_once(s: str, ans: str):
        pat = re.compile(r"(?<![A-Za-z0-9])" + re.escape(ans) +
                         r"(?![A-Za-z0-9])")
        return pat.sub(BLANK, s, count=1)

    seen_types = []
    # 1) proper nouns (capitalized, not sentence-initial)
    for idx, tok in enumerate(toks):
        core = _strip_punct(tok)
        if idx == 0 or len(core) < 4 or not core.isalpha():
            continue
        if not tok[0].isupper() or core.lower() in STOP_ANSWERS:
            continue
        if count_word(core) != 1:
            continue
        if "'" in tok and tok != core + "'s":
            continue
        seen_types.append((core, "easy", 0))
    # 2) numbers
    numbers = [t for t in toks if re.match(r"\d", t)]
    if len(numbers) <= 4:
        for tok in numbers:
            core = _strip_punct(tok)
            if not core or _RANGE_ADJ_RE.search(sentence):
                continue
            if count_word(core) != 1:
                continue
            seen_types.append((core, "medium", 1))
    # 3) distinctive long words
    for idx, tok in enumerate(toks):
        core = _strip_punct(tok)
        if len(core) < 8 or not core.isalpha():
            continue
        if core.lower() in STOP_ANSWERS or tok[0].isupper():
            continue
        if count_word(core) != 1:
            continue
        seen_types.append((core, "medium", 2))
    for ans, diff, pri in seen_types:
        if ans.lower() in ("true", "false"):
            continue
        yield ans, diff, pri, section_tag, blank_once


# --------------------------------------------------------------------------- #
# misconception true/false engine
# --------------------------------------------------------------------------- #
_MC_INTRO_RE = re.compile(
    r"(?:Students|People|Learners|Children|Many students|Some students|"
    r"Most students|Students often|Students frequently|Students sometimes|"
    r"Students mistakenly|Students wrongly|Students may|Students might|"
    r"A common misconception is)\s+"
    r"(?:believe that|think that|assume that|feel that|claim that|argue that|"
    r"say that|state that|believe|think|assume|feel)"
    r"(?:\s*:\s*|\s+)",
    re.I)
_CORRECTION_RE = re.compile(
    r"in reality|in truth|in fact|however|actually|the exact wrong reasoning|"
    r"this is incorrect|is incorrect|are incorrect|wrongly|instead|"
    r"the correct|mistaken|fallacy|misconception leads|in actuality|"
    r"the exact opposite|not true|untrue|false because|wrong because|"
    r"reveals that|a wrong answer|this misconception|but ", re.I)

_MC_INTRO_HI_RE = re.compile(
    r"(?:छात्र|बच्चे|विद्यार्थी|कई छात्र|कुछ छात्र|अधिकांश छात्र|छात्र प्रायः|"
    r"छात्र अक्सर|छात्र कभी-कभी|छात्र गलती से)\s+"
    r"(?:मान लेते हैं|सोचते हैं|समझते हैं|मानते हैं|मान लेता है|सोचता है|"
    r"समझ लेते हैं|समझ लेता है)\s*कि\s*")
_CORRECTION_HI_RE = re.compile(
    r"वास्तव में|असल में|परंतु|लेकिन|किंतु|सही उत्तर|गलत|ग़लत|त्रुटि|"
    r"सटीक|यह धारणा|यह गलत|ऐसा नहीं|यह सत्य नहीं|दरअसल|वास्तविकता")

def misconception_false(text: str):
    """Extract (claim) from an authored COMMON_MISCONCEPTION.
    The claim is what students WRONGLY believe (answer False)."""
    clean = _clean(text)
    if _HAS_DEV.search(clean):
        m = _MC_INTRO_HI_RE.search(clean)
        if not m:
            return None
        rest = clean[m.end():].lstrip()
        parts = re.split(r"(?<=[।.!?])\s*", rest)
        if not parts:
            return None
        claim = parts[0].strip()
        if not (30 <= len(claim) <= 240):
            return None
        if NODE_ID_RE.search(claim) or MATH_SPAN_RE.search(claim):
            return None
        if re.search(r"_{3,}", claim):
            return None
        tail = rest[len(claim):]
        if not _CORRECTION_HI_RE.search(tail):
            return None  # no authored correction in same section - unsafe
        return claim.rstrip("।").strip()
    m = _MC_INTRO_RE.search(clean)
    if not m:
        return None
    rest = clean[m.end():].lstrip()
    if not rest:
        return None
    parts = SENT_SPLIT_RE.split(rest)
    if not parts:
        return None
    claim = parts[0].strip()
    if not (30 <= len(claim) <= 220):
        return None
    if not claim[0].isupper() and claim[0] not in "\"'\u201c":
        return None
    if not claim.endswith((".", "?", "!", "\u201d")):
        return None
    if len(claim.split()) < 5:
        return None
    if NODE_ID_RE.search(claim) or MATH_SPAN_RE.search(claim):
        return None
    if re.search(r"_{3,}", claim):
        return None
    tail = rest[len(claim):]
    if not _CORRECTION_RE.search(tail):
        return None  # no authored correction in the same section - unsafe
    if _CORRECTION_RE.search(claim) and not re.match(
            r"^[\u201c\"(]", claim):
        # claim itself contains correction language -> boundary overrun
        return None
    return claim


# --------------------------------------------------------------------------- #
# main derivation
# --------------------------------------------------------------------------- #
def load_existing_texts() -> set:
    """Normalized question_texts already in board_questions (dedup vs live)."""
    if not os.path.isfile(LIVE_TEXTRACT):
        return set()
    with open(LIVE_TEXTRACT, encoding="utf-8") as fh:
        rows = json.load(fh)
    return {_norm_text(t) for t in rows}


def _norm_text(t: str) -> str:
    t = (t or "").lower()
    t = re.sub(r"_{3,}", " ", t)
    t = re.sub(r"[^a-z0-9ऀ-ॿ ]+", " ", t)
    return re.sub(r"\s+", " ", t).strip()


DIFF_BY_TRANSFORM = {
    "fill_definition": "easy",
    "fill_walkthrough": "medium",
    "fill_prereq_concept": "medium",
    "fill_mastery": "medium",
    "tf_true": "easy",
    "tf_false": "medium",
    "formula_calc": "hard",
}

def derive_node(node: dict, text: str):
    """Yield question rows for one node."""
    nid = node["node_id"]
    sections = {}
    for name in ("DEFINITION", "WALKTHROUGH", "COMMON_MISCONCEPTION",
                 "PREREQ_CONCEPT", "MASTERY_CRITERIA", "THIS_FORMULA"):
        m = _SEC(name).search(text)
        if m:
            sections[name] = m.group(1).strip()

    rows = []
    used_answers = set()
    used_sentences = set()

    def add(transform, q, answer, explanation, extra=None):
        diff = DIFF_BY_TRANSFORM.get(transform, "medium")
        row = {
            "node_id": nid,
            "transform": transform,
            "question_type": ("true_false" if transform.startswith("tf_")
                              else "numeric" if transform == "formula_calc"
                              else "fill_blank"),
            "question_text": q,
            "correct_answer": answer,
            "difficulty": diff,
            "explanation": explanation[:400],
        }
        if extra:
            row.update(extra)
        rows.append(row)
        used_answers.add(answer.lower())

    # ---- formula_calc ----
    if "THIS_FORMULA" in sections:
        for item in formula_variants(sections["THIS_FORMULA"], nid, want=2):
            if _norm_text(item["question_text"]) in GLOBAL_SEEN:
                continue
            add("formula_calc", item["question_text"],
                item["correct_answer"], item["explanation"],
                extra={k: item[k] for k in
                       ("formula_rhs", "formula_vars", "gen_numbers")})
            GLOBAL_SEEN.add(_norm_text(item["question_text"]))
            if sum(1 for r in rows if r["transform"] == "formula_calc") >= 2:
                break

    # ---- tf_false (misconception) ----
    if "COMMON_MISCONCEPTION" in sections:
        claim = misconception_false(sections["COMMON_MISCONCEPTION"])
        if claim:
            q = f"True or False: {claim}"
            if _norm_text(q) not in GLOBAL_SEEN:
                corr = _clean(sections["COMMON_MISCONCEPTION"])[:380]
                add("tf_false", q, "False",
                    "This claim is a common misconception. What the topic "
                    "actually states: " + corr)
                GLOBAL_SEEN.add(_norm_text(q))

    # ---- fill_blanks ----
    fill_plan = [
        ("DEFINITION", "fill_definition", 2),
        ("WALKTHROUGH", "fill_walkthrough", 2),
        ("PREREQ_CONCEPT", "fill_prereq_concept", 1),
        ("MASTERY_CRITERIA", "fill_mastery", 1),
    ]
    fills_added = 0
    for sec_name, transform, max_n in fill_plan:
        if sec_name not in sections or fills_added >= 4:
            continue
        added_here = 0
        for s in _sentences(sections[sec_name]):
            if added_here >= max_n or fills_added >= 4:
                break
            if not _usable_sentence(s) or s in used_sentences:
                continue
            for ans, diff, pri, tag, blank_once in fill_blank_candidates(s, sec_name):
                if ans.lower() in used_answers:
                    continue
                q = blank_once(s, ans)
                if q.count(BLANK) != 1:
                    continue
                q = f"Fill in the blank: {q}"
                if _norm_text(q) in GLOBAL_SEEN:
                    continue
                add(transform, q, ans, "From this topic's authored content: " + s)
                GLOBAL_SEEN.add(_norm_text(q))
                used_answers.add(ans.lower())
                used_sentences.add(s)
                added_here += 1
                fills_added += 1
                break

    # ---- tf_true (authored definition claim, verbatim) ----
    if "DEFINITION" in sections:
        for s in _sentences(sections["DEFINITION"]):
            if not (50 <= len(s) <= 220):
                continue
            if not _usable_sentence(s):
                continue
            if re.search(r"\byou\b|\byour\b|\bwe\b|\bus\b|\bstudent", s, re.I):
                continue
            q = f"True or False: {s}"
            if _norm_text(q) in GLOBAL_SEEN:
                continue
            add("tf_true", q, "True",
                "Stated directly in this topic's definition: " + s)
            GLOBAL_SEEN.add(_norm_text(q))
            break

    return rows


GLOBAL_SEEN: set = set()

def main():
    idx = json.load(open(INDEX, encoding="utf-8"))
    nodes = [n for n in idx["nodes"]
             if not str(n.get("node_id", "")).endswith("_comp")
             and n.get("kind") != "case_companion"]
    hindi_n = [n for n in nodes
               if str(n.get("subject", "")).lower().startswith("hin")]
    if "--include-hindi" in sys.argv:
        targets_all = list(nodes)
    else:
        targets_all = [n for n in nodes if n not in hindi_n]
    targets = targets_all[:LIMIT] if LIMIT else targets_all
    print(f"teaching nodes: {len(nodes)} | hindi (excluded): {len(hindi_n)} "
          f"| practice-variant targets: {len(targets)}")

    # existing live texts for cross-batch dedup
    existing = load_existing_texts()
    GLOBAL_SEEN.update(existing)
    print(f"loaded {len(existing)} existing board_questions texts for dedup")

    per_class = Counter()
    per_transform = Counter()
    per_subject = Counter()
    no_file = no_content = failed_verify = 0
    failures = []
    all_rows = []
    for n in targets:
        path = os.path.join(MD, n["source_file"])
        if not os.path.isfile(path):
            no_file += 1
            continue
        with open(path, encoding="utf-8-sig", errors="replace") as fh:
            text = fh.read()
        rows = derive_node(n, text)
        if not rows:
            no_content += 1
            continue
        kept = []
        for i, row in enumerate(rows):
            bad = verify_row(row, text)
            if bad:
                failed_verify += 1
                failures.append((n["node_id"], row["transform"],
                                 ";".join(bad[:2])))
                continue
            row["question_number"] = i + 1
            row["class_level"] = int(n["class"])
            row["subject"] = n["subject"]
            row["chapter"] = (f"ch{int(n['chapter']):02d}"
                              if str(n.get("chapter", "")).isdigit()
                              else "practice")
            row["source_file"] = f"practice_variants/{n['source_file']}"
            row["node_tags"] = [nid] if (nid := n["node_id"]) else []
            kept.append(row)
            per_class[row["class_level"]] += 1
            per_transform[row["transform"]] += 1
            per_subject[row["subject"]] += 1
        all_rows.extend(kept)

    print(f"mode={'DRY' if DRY else 'WRITE'} | rows verified: {len(all_rows)} "
          f"| nodes without derivable content: {no_content} "
          f"| missing files: {no_file} | failed verification: {failed_verify}")
    print("per-class:", dict(sorted(per_class.items())))
    print("per-transform:", dict(sorted(per_transform.items())))
    print("per-subject:", dict(sorted(per_subject.items())))
    if failures:
        print("first verification failures:")
        for f in failures[:12]:
            print("  ", f)
    if not DRY:
        with open(OUT, "w", encoding="utf-8") as fh:
            for r in all_rows:
                fh.write(json.dumps(r, ensure_ascii=False) + "\n")
        print(f"wrote {len(all_rows)} rows -> {OUT}")
        # re-verify EVERY emitted row independently (self-check pass)
        src_cache = {}
        bad2 = 0
        for r in all_rows:
            sf = r["source_file"].split("/", 1)[1]
            if sf not in src_cache:
                with open(os.path.join(MD, sf), encoding="utf-8-sig",
                          errors="replace") as fh:
                    src_cache[sf] = fh.read()
            if verify_row(r, src_cache[sf]):
                bad2 += 1
        print(f"self-check re-verification violations: {bad2} "
              f"(must be 0)")


if __name__ == "__main__":
    main()
