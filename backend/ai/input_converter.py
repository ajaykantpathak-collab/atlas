"""Input Converter — translates natural math notation to SymPy notation.

Students type math in various natural formats. This converter normalizes
them to SymPy-compatible strings before passing to solver_engine.

Examples:
  x² → x**2
  x^2 → x**2
  √x → sqrt(x)
  |x| → Abs(x)
  3×4 → 3*4
  2π → 2*pi
  sin²x → sin(x)**2
  tan⁻¹x → atan(x)
  ½ → 1/2
  x₀ → x0
"""

import re


def convert(expr: str) -> str:
    """Convert natural math notation to SymPy notation.

    Args:
        expr: Student input in natural math notation

    Returns:
        SymPy-compatible string
    """
    if not expr:
        return expr

    result = expr

    # ── Unicode superscripts → **power ──
    # ² → **2, ³ → **3, etc.
    superscript_map = {
        '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4',
        '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9',
    }
    # Handle consecutive superscripts (e.g. x²³ → x**23)
    i = 0
    while i < len(result):
        if result[i] in superscript_map:
            # Find all consecutive superscripts
            j = i
            power = ""
            while j < len(result) and result[j] in superscript_map:
                power += superscript_map[result[j]]
                j += 1
            result = result[:i] + "**" + power + result[j:]
            i += len("**" + power)
        else:
            i += 1

    # ── Caret notation → ** ──
    # x^2 → x**2, x^(n+1) → x**(n+1)
    result = re.sub(r'\^', '**', result)

    # ── Square root symbol ──
    result = result.replace('√', 'sqrt')
    # √x → sqrt(x) — but only if not already sqrt(...)
    # Actually √ is replaced with sqrt, and if followed by a variable
    # we need to add parentheses: √x → sqrt(x)
    # But sqrt(x) is already correct. Let's handle √ followed by
    # a single character or expression
    result = re.sub(r'sqrt([a-zA-Z0-9.]+)', r'sqrt(\1)', result)
    # But don't double-wrap: sqrt((x)) is fine, sqrt(x) is fine
    # Fix: sqrt(x) → sqrt(x) (already correct), sqrtx → sqrt(x)
    # Actually the regex above handles sqrtx → sqrt(x)
    # But sqrt(x) → sqrt((x)) which is also fine for SymPy
    # Let's be more careful:
    result = re.sub(r'sqrt\(([^()]+)\)', r'sqrt(\1)', result)  # unwrap double parens

    # ── Absolute value bars ──
    # |x| → Abs(x)
    # |x+1| → Abs(x+1)
    # Handle simple cases: |...| where ... has no nested |...|
    def replace_abs(match):
        inner = match.group(1)
        return f"Abs({inner})"
    # Match |...| where ... doesn't contain |
    result = re.sub(r'\|([^|]+)\|', replace_abs, result)

    # ── Inverse trig ──
    # sin⁻¹x → asin(x), cos⁻¹x → acos(x), tan⁻¹x → atan(x)
    result = re.sub(r'sin⁻¹\s*', 'asin', result)
    result = re.sub(r'cos⁻¹\s*', 'acos', result)
    result = re.sub(r'tan⁻¹\s*', 'atan', result)
    result = re.sub(r'cosec⁻¹\s*', 'acsc', result)
    result = re.sub(r'sec⁻¹\s*', 'asec', result)
    result = re.sub(r'cot⁻¹\s*', 'acot', result)
    # Also handle ^-1 notation: sin^-1(x) → asin(x)
    result = re.sub(r'sin\*\*-1', 'asin', result)
    result = re.sub(r'cos\*\*-1', 'acos', result)
    result = re.sub(r'tan\*\*-1', 'atan', result)

    # ── Trig squared notation ──
    # sin²x → sin(x)**2, cos²x → cos(x)**2
    result = re.sub(r'sin\*\*2\s*([a-zA-Z])', r'sin(\1)**2', result)
    result = re.sub(r'cos\*\*2\s*([a-zA-Z])', r'cos(\1)**2', result)
    result = re.sub(r'tan\*\*2\s*([a-zA-Z])', r'tan(\1)**2', result)
    # sin²(x) → sin(x)**2
    result = re.sub(r'sin\*\*2\(', 'sin(', result)  # will handle the **2 after
    # Actually this is tricky. Let's handle it differently:
    # sin²(x) after superscript conversion becomes sin**2(x)
    # We want sin(x)**2
    result = re.sub(r'(sin|cos|tan|sec|csc|cot)\*\*2\(([^)]+)\)', r'\1(\2)**2', result)
    result = re.sub(r'(sin|cos|tan|sec|csc|cot)\*\*2([a-zA-Z])', r'\1(\2)**2', result)

    # ── Multiplication symbols ──
    result = result.replace('×', '*')
    result = result.replace('·', '*')
    result = result.replace('∙', '*')

    # ── Division symbol ──
    result = result.replace('÷', '/')

    # ── Pi ──
    result = result.replace('π', 'pi')
    # 2pi → 2*pi (implicit multiplication with pi)
    result = re.sub(r'(\d)pi', r'\1*pi', result)

    # ── Euler's number ──
    # e^x → exp(x), e**(x) → exp(x)
    result = re.sub(r'\be\*\*\(([^)]+)\)', r'exp(\1)', result)
    result = re.sub(r'\be\*\*([a-zA-Z0-9.]+)', r'exp(\1)', result)
    # But don't replace 'e' in 'exp', 'sec', etc.
    # Only standalone e or e^something

    # ── Log notation ──
    # ln(x) → log(x) (SymPy uses log for natural log)
    result = re.sub(r'\bln\(', 'log(', result)

    # ── Implicit multiplication ──
    # 2x → 2*x, 3y → 3*y (number followed by variable)
    # But NOT for known constants and function names
    _PROTECTED = {'pi', 'exp', 'sin', 'cos', 'tan', 'sec', 'csc', 'cot',
                  'log', 'ln', 'sqrt', 'asin', 'acos', 'atan', 'Abs',
                  'Piecewise', 'Rational', 'binomial', 'factorial'}
    # Number followed by variable: 2x → 2*x, but not 2pi (already handled above)
    result = re.sub(r'(\d)([a-zA-Z])', r'\1*\2', result)
    # Don't split protected names that got broken by the above
    for name in _PROTECTED:
        broken = name[0] + '*' + name[1:]
        result = result.replace(broken, name)

    # ── Fractions ──
    # ½ → 1/2, ⅓ → 1/3, ¼ → 1/4, ¾ → 3/4
    fraction_map = {
        '½': '1/2', '⅓': '1/3', '⅔': '2/3', '¼': '1/4',
        '¾': '3/4', '⅕': '1/5', '⅖': '2/5', '⅗': '3/5',
        '⅘': '4/5', '⅙': '1/6', '⅚': '5/6', '⅛': '1/8',
        '⅜': '3/8', '⅝': '5/8', '⅞': '7/8',
    }
    for frac, replacement in fraction_map.items():
        result = result.replace(frac, replacement)

    # ── Subscripts ──
    # x₀ → x0, x₁ → x1, etc.
    subscript_map = {
        '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4',
        '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9',
    }
    for sub, replacement in subscript_map.items():
        result = result.replace(sub, replacement)

    # ── Degree symbol ──
    # 67° → 67*pi/180 (convert to radians for SymPy)
    # But this changes the semantics — SymPy's cos(67) treats 67 as radians
    # For CBSE questions, angles are in degrees
    # We need: cos(67°) → cos(67*pi/180)
    def convert_degrees(match):
        num = match.group(1)
        return f"({num}*pi/180)"
    result = re.sub(r'(\d+(?:\.\d+)?)°', convert_degrees, result)

    # ── Clean up ──
    # Remove extra spaces
    result = result.strip()
    # Remove any double ** that might have been created
    result = re.sub(r'\*\*\*\*', '**', result)

    return result


def convert_matrix(matrix_str: str) -> str:
    """Convert natural matrix notation to JSON format for solver.

    Accepts:
    - [[1,2],[3,4]] (already JSON)
    - [1 2; 3 4] (MATLAB notation)
    - 1 2 / 3 4 (row-separated by /)
    """
    if not matrix_str:
        return matrix_str

    result = matrix_str.strip()

    # Already JSON format
    if result.startswith('[['):
        return result

    # MATLAB notation: [1 2; 3 4]
    if ';' in result:
        result = result.strip('[]')
        rows = result.split(';')
        json_rows = []
        for row in rows:
            elements = row.strip().split()
            json_rows.append('[' + ','.join(elements) + ']')
        return '[' + ','.join(json_rows) + ']'

    # Slash notation: 1 2 / 3 4
    if '/' in result:
        rows = result.split('/')
        json_rows = []
        for row in rows:
            elements = row.strip().split()
            json_rows.append('[' + ','.join(elements) + ']')
        return '[' + ','.join(json_rows) + ']'

    return result


def convert_vector(vec_str: str) -> str:
    """Convert natural vector notation to JSON format.

    Accepts:
    - [1,2,3] (already JSON)
    - 1,2,3
    - 1i + 2j + 3k (unit vector notation)
    """
    if not vec_str:
        return vec_str

    result = vec_str.strip()

    # Unit vector notation: 1i + 2j + 3k
    if re.search(r'\d+[ijk]', result):
        components = [0, 0, 0]
        # Find i, j, k components
        i_match = re.search(r'([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*i', result)
        j_match = re.search(r'([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*j', result)
        k_match = re.search(r'([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*k', result)
        if i_match:
            val = i_match.group(1)
            components[0] = val if val not in ('', '+', '-') else (val + '1' if val in ('+', '-') else '1')
        if j_match:
            val = j_match.group(1)
            components[1] = val if val not in ('', '+', '-') else (val + '1' if val in ('+', '-') else '1')
        if k_match:
            val = k_match.group(1)
            components[2] = val if val not in ('', '+', '-') else (val + '1' if val in ('+', '-') else '1')
        return str(components)

    # Already JSON
    if result.startswith('['):
        return result

    # Comma-separated
    if ',' in result:
        return '[' + result + ']'

    return result
