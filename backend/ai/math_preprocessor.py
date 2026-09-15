"""Math Question Preprocessor.

Cleans raw question text before pattern matching:
1. Strips MCQ options: "(a) ... (b) ... (c) ... (d) ..." → stem only
2. Extracts mathematical expressions from natural language
3. Splits piecewise functions on "if x <= k" / "if x > k"
4. Splits multi-equation questions on top-level "and" / ","
5. Extracts coordinate tuples, vector notation, matrices
6. Produces a cleaned question string + structured data dict

This is Layer 1+2 of the deterministic solving pipeline.
It does NOT solve anything — it only structures the input.
"""

import re
from dataclasses import dataclass, field
from typing import Optional


@dataclass
class PreprocessedQuestion:
    """Structured output from the preprocessor."""
    raw: str  # original question text
    clean: str  # cleaned question text (options stripped, expressions normalized)
    is_mcq: bool = False
    options: list = field(default_factory=list)  # MCQ option strings
    stem: str = ""  # question stem (without options)
    expressions: dict = field(default_factory=dict)  # {var: expr} e.g. {"f": "x**2*exp(-x)"}
    equations: list = field(default_factory=list)  # list of equation strings
    points: list = field(default_factory=list)  # coordinate tuples [(x,y,z), ...]
    vectors: list = field(default_factory=list)  # vector expressions ["i+2j+3k", ...]
    matrices: list = field(default_factory=list)  # matrix strings
    piecewise: Optional[dict] = None  # {"cases": [(expr, condition), ...], "var": "x"}
    bounds: Optional[tuple] = None  # (lower, upper) for definite integrals
    sub_questions: list = field(default_factory=list)  # multi-part: [(label, text), ...]
    task: str = ""  # detected task: "find", "evaluate", "differentiate", "integrate", "prove", "solve"
    topic_hint: str = ""  # detected topic: "calculus", "probability", "vectors", etc.


def preprocess(question: str) -> PreprocessedQuestion:
    """Main entry point: preprocess a raw question string."""
    result = PreprocessedQuestion(raw=question, clean=question)

    # Step 1: Strip MCQ options
    result = _strip_mcq_options(result)

    # Step 2: Detect sub-questions (multi-part)
    result = _detect_sub_questions(result)

    # Step 3: Extract structured data
    result = _extract_expressions(result)
    result = _extract_equations(result)
    result = _extract_points(result)
    result = _extract_vectors(result)
    result = _extract_matrices(result)
    result = _extract_piecewise(result)
    result = _extract_bounds(result)

    # Step 4: Detect task and topic
    result = _detect_task(result)
    result = _detect_topic(result)

    # Step 5: Build clean text for pattern matching
    result = _build_clean_text(result)

    return result


# ═══════════════════════════════════════════════════════════════════
# Step 1: MCQ Option Stripping
# ═══════════════════════════════════════════════════════════════════

# Match (a) ... (b) ... (c) ... (d) ... patterns
# Options can be on same line or multiple lines
_MCQ_PATTERN = re.compile(
    r'\s*\(a\)\s*(.*?)'      # option a
    r'(?:\(b\)\s*(.*?)'      # option b
    r'(?:\(c\)\s*(.*?)'      # option c
    r'(?:\(d\)\s*(.*?))?'    # option d (optional)
    r'?)?)?(?:\s*(?:\(|\[)?[A-D](?:\)|\])?\s*(?:\(|\[)?[A-D](?:\)|\])?\s*(?:Application|Analysis|Understanding|Recall|Evaluate|Create)?\s*$)',
    re.IGNORECASE | re.DOTALL
)

# Simpler, more robust approach: find the first (a) and split
_MCQ_SPLIT = re.compile(r'\s*\(a\)\s*', re.IGNORECASE)


def _strip_mcq_options(result: PreprocessedQuestion) -> PreprocessedQuestion:
    """Detect and strip MCQ options from the question."""
    q = result.raw

    # Look for (a) marker (case-insensitive, must be a standalone option marker)
    # The (a) should be preceded by punctuation or whitespace, not part of a math expression
    match = _MCQ_SPLIT.search(q)
    if not match:
        return result

    stem = q[:match.start()].rstrip()
    rest = q[match.end():]

    # Check if stem ends with punctuation or question word (indicates it's really MCQ)
    stem_lower = stem.lower().rstrip()
    mcq_indicators = [':', '?', 'is', 'are', 'was', 'were', 'will', 'would',
                      'find', 'identify', 'select', 'choose', 'what', 'which',
                      'determine', 'state', 'name', 'give', 'compute', 'evaluate']
    is_mcq = False
    for ind in mcq_indicators:
        if stem_lower.endswith(ind):
            is_mcq = True
            break

    if not is_mcq and not stem_lower.endswith(('.', ',', ';')):
        # Not clearly an MCQ stem — but still might be
        # Check if there are at least 2 options (b)
        if not re.search(r'\(b\)\s*', rest, re.IGNORECASE):
            return result
        is_mcq = True

    # Extract options
    options = []
    # Split on (b), (c), (d)
    parts = re.split(r'\s*\(b\)\s*|\s*\(c\)\s*|\s*\(d\)\s*', rest, flags=re.IGNORECASE)
    for part in parts:
        part = part.strip()
        if part:
            # Remove trailing cognitive domain tags
            part = re.sub(r'\s*(?:Application|Analysis|Understanding|Recall|Evaluate|Create|Analysis & Application|Recall & Understanding|Analysis & Evaluate|Understanding & Application|Application & Evaluate|Recall & Analysis|Analysis & Application & Evaluate|Understanding & Application & Evaluate|Recall, Application & Evaluate|Understanding, Application & Evaluate|Create, Analysis, Application & Evaluate|Create & Evaluate|Create, Analysis & Evaluate|Recall, Understanding, Application & Evaluate)\s*$', '', part, flags=re.IGNORECASE)
            # Remove trailing option letters like "(d)" if any got included
            part = re.sub(r'\s*\([a-d]\)\s*$', '', part, flags=re.IGNORECASE)
            options.append(part)

    # Distinguish MCQ options from multi-part sub-questions:
    # MCQ options are short (usually < 30 chars, no question marks, no "find")
    # Sub-questions are longer and contain question words
    sub_q_keywords = ['find', 'what', 'how', 'determine', 'justify', 'prove',
                      'show', 'solve', 'evaluate', 'compute', 'express', 'state',
                      'explain', 'verify']
    is_multi_part = False
    if len(options) >= 2:
        multi_count = sum(1 for opt in options
                         if len(opt) > 30 or
                         any(kw in opt.lower() for kw in sub_q_keywords))
        if multi_count == len(options):
            is_multi_part = True

    if is_multi_part:
        result.is_mcq = False
        result.sub_questions = [(chr(ord('a') + i), opt) for i, opt in enumerate(options)]
        result.stem = stem
        result.clean = stem + " " + " ".join(options)
        return result

    result.is_mcq = True
    result.options = options
    result.stem = stem
    result.clean = stem  # clean text is just the stem for MCQs

    return result


# ═══════════════════════════════════════════════════════════════════
# Step 2: Sub-question detection (multi-part)
# ═══════════════════════════════════════════════════════════════════

_SUB_Q_PATTERN = re.compile(
    r'\((a|b|c|d|e|f)\)\s*(.*?)(?=\([a-f]\)|$)',
    re.IGNORECASE | re.DOTALL
)


def _detect_sub_questions(result: PreprocessedQuestion) -> PreprocessedQuestion:
    """Detect sub-questions like (a), (b), (c) in the stem."""
    text = result.stem if result.stem else result.raw

    # Don't confuse with MCQ options — only detect if NOT already MCQ
    if result.is_mcq:
        return result

    # Look for (a), (b) etc. that are sub-questions, not options
    matches = _SUB_Q_PATTERN.findall(text)
    if len(matches) >= 2:
        sub_qs = []
        for label, content in matches:
            content = content.strip().rstrip()
            if content:
                sub_qs.append((label.lower(), content))

        if len(sub_qs) >= 2:
            result.sub_questions = sub_qs
            # The main stem is the text before the first sub-question
            first_match = _SUB_Q_PATTERN.search(text)
            if first_match:
                result.stem = text[:first_match.start()].rstrip()

    return result


# ═══════════════════════════════════════════════════════════════════
# Step 3: Structured Data Extraction
# ═══════════════════════════════════════════════════════════════════

# Expression patterns: f(x) = ..., y = ..., etc.
# Stop at keywords that introduce new clauses
_EXPR_STOPWORDS = r'(?:,|;|\.|\s+and\s+|\s+if\s+|\s+where\s+|\s+given\s+|\s+find\s+|\s+then\s+|\s+hence\s+|\s+also\s+|\s+when\s+|\s+is\s+|\s+are\s+|\s+was\s+|\s+were\s+|\s+will\s+|\s+would\s+|\s+can\s+|\s+to\s+|\s+for\s+|\s+in\s+|\s+at\s+|\s+on\s+|\s+by\s+|\s+of\s+|\s+the\s+|\s+a\s+|\s+an\s+|$)'

_EXPR_PATTERN = re.compile(
    r'(?:([a-zA-Z](?:\([a-zA-Z]\))?)\s*=\s*)'  # LHS: f(x) = or y =
    r'([^,\n;]+?)'  # RHS: expression
    r'(?=\s*(?:,|;|\.|\s+if\s|\s+where\s|\s+given\s|\s+find\s|\s+then\s|\s+hence\s|\s+also\s|\s+when\s|$))',
    re.IGNORECASE
)

# Equation patterns: expr = expr (with variables)
_EQ_PATTERN = re.compile(
    r'([a-zA-Z][\w\s\+\-\*\/\^\(\)\[\]\|\.,=<>!]+?)\s*=\s*([a-zA-Z0-9\s\+\-\*\/\^\(\)\[\]\|\.,]+?)(?=\s*(?:,|;|\.|$))',
)

# Coordinate tuples: (x, y) or (x, y, z)
_POINT_PATTERN = re.compile(
    r'\(\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)\s*(?:,\s*(-?\d+\.?\d*)\s*)?\)'
)

# Vector notation: i + 2j + 3k, -3i - 2j + k
_VECTOR_PATTERN = re.compile(
    r'(?:([+-]?\d*\.?\d*)\s*([ijk]))+',
    re.IGNORECASE
)

# Matrix notation: [[a, b], [c, d]]
_MATRIX_PATTERN = re.compile(r'\[\[.*?\]\]')


def _extract_expressions(result: PreprocessedQuestion) -> PreprocessedQuestion:
    """Extract function/expression definitions like f(x) = x^2, y = 6*cos(3*t)."""
    text = result.stem if result.stem else result.raw

    # Look for patterns like "f(x) = expr" or "y = expr" or "x = expr"
    # Stop at clause boundaries: "and", "if", "where", "given", "find", "then", etc.
    pattern = re.compile(
        r'([a-zA-Z](?:\([a-zA-Z]\))?)\s*=\s*'  # LHS: f(x) = or y =
        r'(.+?)'  # RHS: expression (non-greedy)
        r'(?=\s+(?:and|if|where|given|find|then|hence|also|when|is|are|was|were|will|would|can|to|for|in|at|on|by|of|the|a|an)\b|[,;.]|$)',
        re.IGNORECASE | re.DOTALL
    )

    for match in pattern.finditer(text):
        lhs = match.group(1).strip()
        rhs = match.group(2).strip()

        # Normalize the expression
        rhs = _normalize_expression(rhs)

        # Skip if RHS is too short
        if len(rhs) < 1:
            continue
        # Skip if RHS is purely English words (no math symbols or digits)
        if not re.search(r'[\d\+\-\*/\^\(\)\[\]\|]', rhs):
            continue
        # Skip if RHS contains English words longer than 3 chars (likely not a math expr)
        words_in_rhs = re.findall(r'[a-zA-Z]{4,}', rhs)
        math_words = {'sin', 'cos', 'tan', 'exp', 'log', 'sqrt', 'pi', 'asin', 'acos', 'atan',
                      'cosec', 'sec', 'cot', 'acot', 'asec', 'acsc', 'inverse', 'factorial',
                      'Rational', 'Abs', 'log'}
        non_math_words = [w for w in words_in_rhs if w.lower() not in math_words]
        if non_math_words:
            continue

        # Store with cleaned key
        key = lhs.replace('(', '').replace(')', '').strip()
        result.expressions[key] = rhs

    return result


def _extract_equations(result: PreprocessedQuestion) -> PreprocessedQuestion:
    """Extract standalone equations."""
    text = result.stem if result.stem else result.raw

    # Look for equation-like patterns (not function definitions)
    # e.g., "x + y = 5", "2x - 3y = 10"
    for match in _EQ_PATTERN.finditer(text):
        lhs = match.group(1).strip()
        rhs = match.group(2).strip()

        # Skip if it looks like a function definition (handled above)
        if re.match(r'^[a-zA-Z]\([a-zA-Z]\)$', lhs):
            continue

        # Skip if either side is purely English
        if not re.search(r'[0-9a-zA-Z][\^\*\+\-/=]|[\d]', lhs + rhs):
            continue

        eq = f"{lhs} = {rhs}"
        eq = _normalize_expression(eq)
        if eq not in result.equations:
            result.equations.append(eq)

    return result


def _extract_points(result: PreprocessedQuestion) -> PreprocessedQuestion:
    """Extract coordinate tuples."""
    text = result.raw  # Use raw text to catch points in options too

    for match in _POINT_PATTERN.finditer(text):
        coords = []
        for g in match.groups():
            if g is not None:
                coords.append(float(g))
        if coords and len(coords) >= 2:
            result.points.append(tuple(coords))

    return result


def _extract_vectors(result: PreprocessedQuestion) -> PreprocessedQuestion:
    """Extract vector notation like i + 2j + 3k, -3i - 2j + k.
    Only matches actual vector expressions — standalone i/j/k with coefficients
    joined by + or -, NOT random words containing i/j/k."""
    text = result.raw

    # Pattern: [sign] [coeff] i/j/k [sign] [coeff] i/j/k ...
    # Must have at least one + or - connecting terms, and i/j/k must be standalone
    # (not part of a word like "if", "is", "kgs")
    vec_pattern = re.compile(
        r'(?:^|[\s(=])\s*'  # start boundary
        r'([+-]?\s*\d*\.?\d*\s*[ijk]\b'  # first term: coeff + i/j/k as whole word
        r'(?:\s*[+-]\s*\d*\.?\d*\s*[ijk]\b)*)',  # subsequent terms
        re.IGNORECASE
    )

    for match in vec_pattern.finditer(text):
        vec_str = match.group(1).strip()
        if not vec_str:
            continue
        # Must contain at least one i, j, or k as a standalone letter
        # Check that i/j/k are standalone (preceded by space, +/-, digit, or start)
        if not re.search(r'(?:^|[\s+\-\d])([ijk])(?:\b|$)', vec_str, re.IGNORECASE):
            continue
        # Must have at least one digit or +/- sign (to distinguish from words)
        if not re.search(r'[\d+\-/]', vec_str):
            continue
        # Normalize: remove spaces around +/-
        vec_str = re.sub(r'\s*([+-])\s*', r'\1', vec_str)
        # Ensure lowercase i/j/k
        vec_str = vec_str.replace('I', 'i').replace('J', 'j').replace('K', 'k')
        # Skip if it's just a single letter without coefficient
        if len(vec_str) == 1:
            continue
        if vec_str not in result.vectors:
            result.vectors.append(vec_str)

    return result


def _extract_matrices(result: PreprocessedQuestion) -> PreprocessedQuestion:
    """Extract matrix notation [[a,b],[c,d]]."""
    text = result.raw

    for match in _MATRIX_PATTERN.finditer(text):
        mat_str = match.group(0).strip()
        if mat_str not in result.matrices:
            result.matrices.append(mat_str)

    return result


def _extract_piecewise(result: PreprocessedQuestion) -> PreprocessedQuestion:
    """Extract piecewise function definitions.
    Pattern: f(x) = expr if x <= k, f(x) = expr if x > k
    The expression must be a math expression, not English text.
    """
    text = result.stem if result.stem else result.raw

    # Find all "expr if condition" pairs where expr looks like math
    piecewise_pairs = []

    # Pattern: f(x) = (expr) if (condition), followed by comma or end
    # The expr must contain math symbols to distinguish from English
    case_pattern = re.compile(
        r'([a-zA-Z](?:\([a-zA-Z]\))?)\s*=\s*'  # LHS: f(x) =
        r'([^,;]+?)\s+if\s+'  # expression (stop at comma/semicolon)
        r'([a-zA-Z]\s*(?:<\s*=?|>\s*=?|=|≤|≥)\s*[^,;]+?)'  # condition
        r'(?=,\s*[a-zA-Z](?:\([a-zA-Z]\))?\s*=\s*|\.|$)',
        re.IGNORECASE
    )

    for match in case_pattern.finditer(text):
        lhs = match.group(1).strip()
        expr = match.group(2).strip()
        cond = match.group(3).strip()

        # Normalize the expression
        expr = _normalize_expression(expr)

        # Skip if expr contains long English words (not a math expression)
        words_in_expr = re.findall(r'[a-zA-Z]{4,}', expr)
        math_words = {'sin', 'cos', 'tan', 'exp', 'log', 'sqrt', 'pi', 'asin', 'acos', 'atan',
                      'cosec', 'sec', 'cot', 'acot', 'asec', 'acsc', 'inverse', 'factorial',
                      'Rational', 'Abs'}
        non_math = [w for w in words_in_expr if w.lower() not in math_words]
        if non_math:
            continue

        # Clean up condition — remove trailing English
        cond = cond.rstrip('.,;')
        # Stop condition at English words
        cond_match = re.match(r'([a-zA-Z]\s*(?:<\s*=?|>\s*=?|=|≤|≥)\s*[\d.\-/]+)', cond)
        if cond_match:
            cond = cond_match.group(1)

        piecewise_pairs.append((expr, cond))

    if len(piecewise_pairs) >= 2:
        var_match = re.search(r'([a-zA-Z])\s*(?:<\s*=?|>\s*=?|=|≤|≥)', piecewise_pairs[0][1])
        var = var_match.group(1) if var_match else "x"
        result.piecewise = {"cases": piecewise_pairs, "var": var}

    return result


def _extract_bounds(result: PreprocessedQuestion) -> PreprocessedQuestion:
    """Extract definite integral bounds: 'from A to B' or '0 to pi'."""
    text = result.stem if result.stem else result.raw

    # Pattern: "from X to Y" or "integral from X to Y"
    bounds_pattern = re.compile(
        r'(?:integral\s+)?from\s+([-\d/pi\.]+)\s+to\s+([-\d/pi\.]+)',
        re.IGNORECASE
    )
    match = bounds_pattern.search(text)
    if match:
        lower = _normalize_expression(match.group(1))
        upper = _normalize_expression(match.group(2))
        result.bounds = (lower, upper)

    return result


# ═══════════════════════════════════════════════════════════════════
# Step 4: Task and Topic Detection
# ═══════════════════════════════════════════════════════════════════

def _detect_task(result: PreprocessedQuestion) -> PreprocessedQuestion:
    """Detect what the question is asking for."""
    text = (result.stem + " " + result.clean).lower()

    if any(w in text for w in ['evaluate', 'compute', 'calculate']):
        result.task = 'evaluate'
    elif any(w in text for w in ['differentiate', 'derivative', 'dy/dx', 'f\'']):
        result.task = 'differentiate'
    elif any(w in text for w in ['integrate', 'integral', 'antiderivative']):
        result.task = 'integrate'
    elif any(w in text for w in ['prove', 'show that', 'justify', 'verify']):
        result.task = 'prove'
    elif any(w in text for w in ['solve']):
        result.task = 'solve'
    elif any(w in text for w in ['find', 'determine', 'identify', 'select', 'choose']):
        result.task = 'find'
    elif any(w in text for w in ['formulate', 'express', 'write']):
        result.task = 'formulate'
    elif 'maxim' in text or 'minim' in text or 'optim' in text:
        result.task = 'optimize'
    elif 'probability' in text:
        result.task = 'probability'
    else:
        result.task = 'find'

    return result


def _detect_topic(result: PreprocessedQuestion) -> PreprocessedQuestion:
    """Detect the mathematical topic."""
    text = (result.stem + " " + result.clean).lower()

    if any(w in text for w in ['derivative', 'differentiat', 'dy/dx', 'tangent', 'normal']):
        result.topic_hint = 'calculus'
    elif any(w in text for w in ['integral', 'integrate', 'area', 'area under']):
        result.topic_hint = 'integration'
    elif any(w in text for w in ['differential equation', 'dy/dx', 'integrating factor']):
        result.topic_hint = 'differential_equations'
    elif any(w in text for w in ['matrix', 'matrices', 'determinant', 'adjoint', 'inverse']):
        result.topic_hint = 'matrices'
    elif any(w in text for w in ['vector', 'i +', 'j +', 'k ', 'cross product', 'dot product']):
        result.topic_hint = 'vectors'
    elif any(w in text for w in ['probability', 'dice', 'coin', 'cards', 'random', 'bayes']):
        result.topic_hint = 'probability'
    elif any(w in text for w in ['linear programming', 'lpp', 'feasible', 'optimize', 'maximize', 'minimize']):
        result.topic_hint = 'lpp'
    elif any(w in text for w in ['relation', 'function', 'one-one', 'onto', 'bijective', 'inverse']):
        result.topic_hint = 'functions'
    elif any(w in text for w in ['trigonometric', 'sin', 'cos', 'tan', 'cosec', 'sec', 'cot']):
        result.topic_hint = 'trigonometry'
    elif any(w in text for w in ['plane', 'line', '3d', 'three dimensional', 'perpendicular']):
        result.topic_hint = '3d_geometry'
    elif any(w in text for w in ['continuity', 'continuous', 'discontinuous']):
        result.topic_hint = 'continuity'
    elif any(w in text for w in ['regression', 'correlation', 'scatter', 'best fit']):
        result.topic_hint = 'statistics'
    elif any(w in text for w in ['cost', 'revenue', 'profit', 'breakeven', 'break-even', 'marginal', 'demand']):
        result.topic_hint = 'business_calculus'

    return result


# ═══════════════════════════════════════════════════════════════════
# Step 5: Build Clean Text
# ═══════════════════════════════════════════════════════════════════

def _build_clean_text(result: PreprocessedQuestion) -> PreprocessedQuestion:
    """Build a clean text string for pattern matching."""
    if result.is_mcq:
        # For MCQs, clean text is the stem with normalized expressions
        clean = result.stem
    elif result.sub_questions:
        # For multi-part, clean text is the stem + first sub-question
        clean = result.stem
        if result.sub_questions:
            clean += " " + result.sub_questions[0][1]
    else:
        clean = result.raw

    # Normalize mathematical notation in clean text
    clean = _normalize_expression(clean)

    result.clean = clean
    return result


# ═══════════════════════════════════════════════════════════════════
# Expression Normalization
# ═══════════════════════════════════════════════════════════════════

def _normalize_expression(expr: str) -> str:
    """Normalize mathematical notation in a string."""
    if not expr:
        return ""

    s = expr.strip()

    # Convert ^ to ** for SymPy
    s = s.replace('^', '**')

    # Convert trig powers: sin^2(x) -> sin(x)**2, sin^2024(x) -> sin(x)**2024
    # Must handle BEFORE the ^ -> ** conversion above, but since we already did it:
    # Pattern: sin**N(expr) -> sin(expr)**N
    # Use a function to properly handle the parenthesized argument
    def _fix_trig_power(m):
        func = m.group(1)
        power = m.group(2)
        return f'{func}(__PLACEHOLDER__)**{power}'
    # Two-step: first mark the trig power, then find the argument
    s = re.sub(r'(sin|cos|tan|cosec|sec|cot)\*\*(\d+)', r'\1__TRIGPOW__\2', s, flags=re.IGNORECASE)
    # Now find sin__TRIGPOW__N(arg) and convert to sin(arg)**N
    def _resolve_trig_power(m):
        func = m.group(1)
        power = m.group(2)
        arg = m.group(3)
        return f'{func}({arg})**{power}'
    s = re.sub(r'(sin|cos|tan|cosec|sec|cot)__TRIGPOW__(\d+)\s*\(([^)]+)\)', _resolve_trig_power, s, flags=re.IGNORECASE)
    # If no parens followed, just remove the marker (shouldn't happen in practice)
    s = s.replace('__TRIGPOW__', '**')

    # Convert e^x to exp(x) — but only when e is used as base
    s = re.sub(r'\be\*\*', 'exp**', s)
    s = re.sub(r'\bexp\*\*\(', 'exp(', s)

    # Convert inverse trig: sin^-1(x) -> asin(x)
    s = re.sub(r'(sin|cos|tan)\*\*-1\s*\(', r'a\1(', s, flags=re.IGNORECASE)
    s = re.sub(r'(sin|cos|tan)\^-1\s*\(', r'a\1(', s, flags=re.IGNORECASE)
    # Also handle sin^-1 without parens
    s = re.sub(r'(sin|cos|tan)\*\*-1\b', r'a\1', s, flags=re.IGNORECASE)

    # Convert cot^-1, sec^-1, cosec^-1
    s = re.sub(r'cot\*\*-1\s*\(', 'acot(', s, flags=re.IGNORECASE)
    s = re.sub(r'sec\*\*-1\s*\(', 'asec(', s, flags=re.IGNORECASE)
    s = re.sub(r'cosec\*\*-1\s*\(', 'acsc(', s, flags=re.IGNORECASE)

    # Handle h^-1(x) — inverse function notation
    s = re.sub(r'([a-zA-Z])\*\*-1\s*\(', r'inverse_\1(', s, flags=re.IGNORECASE)

    # Insert implicit multiplication: 3x -> 3*x, 2y -> 2*y
    # But NOT for ordinals: 3rd, 2nd, 1st, 4th, 5th, etc.
    s = re.sub(r'(\d)([a-zA-Z])', r'\1*\2', s)
    # Undo ordinal multiplication: 3*rd -> 3rd, 2*nd -> 2nd, 1*st -> 1st, 4*th -> 4th
    s = re.sub(r'(\d)\*(rd|nd|st|th)\b', r'\1\2', s, flags=re.IGNORECASE)
    # But not for function names like exp, sin, cos etc.
    s = re.sub(r'(\d)\*(exp|sin|cos|tan|log|ln|sqrt|pi|asin|acos|atan)\b', r'\1*\2', s)

    # Insert implicit multiplication between ) and ( : (x+1)(x+2) -> (x+1)*(x+2)
    s = re.sub(r'\)\s*\(', ')*(', s)

    # Insert implicit multiplication between number and ( : 3(x+1) -> 3*(x+1)
    s = re.sub(r'(\d)\s*\(', r'\1*(', s)

    # Convert Rs/Rupees/₹ to nothing (just the number)
    s = re.sub(r'\bRs\s*', '', s, flags=re.IGNORECASE)
    s = re.sub(r'\bRupees\s*', '', s, flags=re.IGNORECASE)
    s = s.replace('₹', '')

    # Normalize "pi" to "pi" (SymPy understands it)
    # Normalize "log" to "log" (SymPy uses natural log)
    # Normalize "ln" to "log"
    s = re.sub(r'\bln\b', 'log', s)

    # Clean up extra spaces
    s = re.sub(r'\s+', ' ', s).strip()

    return s


# ═══════════════════════════════════════════════════════════════════
# Testing
# ═══════════════════════════════════════════════════════════════════

if __name__ == "__main__":
    # Test with sample questions from ISC CFQ
    test_questions = [
        "If h(x) = 4^x and h^-1(x) = 2, then value of x is: "
        "(a) -4 (b) 4 (c) -16 (d) 16",

        "Identify the correct answer of integral from 0 to pi of sin^2024(x) * cos^2023(x) dx: "
        "(a) 0 (b) 1 (c) 2 (d) 3",

        "The value of i.(k x j) + j.(i x k) + k.(i x j) is: "
        "(a) -3 (b) -2 (c) -1 (d) 0",

        "If L is the foot of the perpendicular drawn from a point P(a, b, c) on the XY plane, "
        "what is the co-ordinate of L? (a) (a, b, 0) (b) (0, 0, c) (c) (0, b, 0) (d) (a, 0, 0)",

        "The displacement, x metres of a particle from a fixed point at time t seconds "
        "is given by x = 6*cos(3*t + pi/2). Find the acceleration of the particle, "
        "when t = 2*pi/3.",

        "Find the value of k so that the function f(x) = k*x^2 + 5 if x <= 1, "
        "f(x) = 2 if x > 1 is continuous at x = 1",

        "Evaluate: integral of 2^x * 2^(x/2) * 2^(x/4) dx.",

        "Given 2*f(x) = a*log|x| - b*x^2 + x, if f(x) has extreme values at x = -1 and x = 2, "
        "find the value of a and b.",

        "Rajesh wants to purchase some fruits. "
        "4 kgs apples, 3 kgs grapes and 2 kgs oranges cost him Rs 600. "
        "2 kgs apples, 4 kgs grapes and 6 kgs oranges cost him Rs 900. "
        "6 kgs apples, 2 kgs grapes and 3 kgs oranges cost him Rs 700.",
    ]

    for i, q in enumerate(test_questions):
        print(f"\n{'='*70}")
        print(f"Test {i+1}: {q[:80]}...")
        print(f"{'='*70}")
        result = preprocess(q)
        print(f"  is_mcq:     {result.is_mcq}")
        print(f"  stem:       {result.stem[:80] if result.stem else 'N/A'}")
        print(f"  options:    {result.options}")
        print(f"  expressions:{result.expressions}")
        print(f"  equations:  {result.equations}")
        print(f"  points:     {result.points}")
        print(f"  vectors:    {result.vectors}")
        print(f"  matrices:   {result.matrices}")
        print(f"  piecewise:  {result.piecewise}")
        print(f"  bounds:     {result.bounds}")
        print(f"  sub_qs:     {result.sub_questions}")
        print(f"  task:       {result.task}")
        print(f"  topic:      {result.topic_hint}")
        print(f"  clean:      {result.clean[:100]}")
