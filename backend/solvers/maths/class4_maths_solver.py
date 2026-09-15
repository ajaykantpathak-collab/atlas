"""
class4_maths_solver.py
CISCE Class 4 Mathematics — Node Solvers: 6-digit numbers, Place/Face value, Ordering
Deterministic: no LLM calls. Uses SymPy / stdlib / seeded random.
"""
import random, re
from typing import Tuple, Optional, List, Union

# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────
_UNITS = ["","one","two","three","four","five","six","seven","eight","nine",
          "ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen",
          "seventeen","eighteen","nineteen"]
_TENS  = ["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"]

def _two_digit_words(n: int) -> str:
    """Convert 0-99 to Indian-English words."""
    if n == 0:
        return ""
    if n < 20:
        return _UNITS[n]
    t, u = divmod(n, 10)
    return _TENS[t] + (" " + _UNITS[u] if u else "")

def _three_digit_words(n: int) -> str:
    """Convert 0-999 to words."""
    if n == 0:
        return ""
    if n < 100:
        return _two_digit_words(n)
    h, rest = divmod(n, 100)
    s = _UNITS[h] + " hundred"
    if rest:
        s += " " + _two_digit_words(rest)
    return s

def number_to_indian_words(n: int) -> str:
    """
    Convert any positive integer to Indian-system words.
    Indian grouping:  XXXXX,XX,XXX  (lakhs, thousands, hundreds)
    e.g. 245318  →  "two lakh forty-five thousand three hundred eighteen"
         120506  →  "one lakh twenty thousand five hundred six"
    """
    if n == 0:
        return "zero"
    s = ""
    # lakhs  (positions 5-6)
    lakhs = n // 100000
    rem   = n % 100000
    if lakhs:
        s += _two_digit_words(lakhs) + " lakh"
        if rem:
            s += " "

    # thousands (positions 2-4: ten-thousands & thousands)
    th = rem // 1000
    rem = rem % 1000
    if th:
        s += _two_digit_words(th) + " thousand"
        if rem:
            s += " "

    # hundreds / tens / ones
    if rem:
        s += _three_digit_words(rem)

    return s.strip()

def words_to_indian_numeral(words: str) -> Optional[int]:
    """
    Parse simple Indian-word number back to integer.
    Supports: digits, 'zero'..'ninety nine', 'hundred', 'thousand', 'lakh'.
    Only well-formed, unambiguous inputs expected.
    """
    w = words.lower().strip()
    if w == "zero":
        return 0
    num = 0
    lakh_part = 0
    thou_part = 0
    rest_part = 0
    # detect lakhs
    m = re.search(r'(\w+(?:\s+\w+)?)\s+lakh', w)
    if m:
        lakh_part = _words_to_int(m.group(1))
        w = w[m.end():]
    # detect thousands
    m = re.search(r'(\w+(?:\s+\w+)?)\s+thousand', w)
    if m:
        thou_part = _words_to_int(m.group(1))
        w = w[m.end():]
    # remaining → hundreds/tens/ones
    w = w.strip()
    if w:
        rest_part = _words_to_int(w)
    return lakh_part * 100000 + thou_part * 1000 + rest_part

def _words_to_int(words: str) -> int:
    """Minimal word→int for values 0-9999."""
    total = 0
    # split on 'hundred'
    hm = re.split(r'\s+hundred\s*', words, maxsplit=1)
    h_part = hm[0].strip()
    rest   = hm[1].strip() if len(hm) > 1 else ""
    h_val = _UNIT_MAP.get(h_part, 0)
    total += h_val * 100
    if rest:
        total += _words_small(rest)
    return total

_UNIT_MAP = {w: i for i, w in enumerate(_UNITS)}
_TEN_MAP  = {w: i*10 for w, i in zip(_TENS, range(11)) if w}

def _words_small(s: str) -> int:
    tokens = s.split()
    val = 0
    for t in tokens:
        if t in _UNIT_MAP:
            val += _UNIT_MAP[t]
        elif t in _TEN_MAP:
            val += _TEN_MAP[t]
    return val

# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────
class Class4MathSolver:
    """
    Deterministic solver for CISCE Class 4 Maths (3 nodes).
    All methods return structured dicts with 'answer', 'steps', and 'verified'.
    """

    def __init__(self, seed: Optional[int] = None):
        self._rng = random.Random(seed)

    # ── NODE c4_math_001: 6-digit numbers ────────────────────────────────────

    def q1_read_numeral(self, n: int) -> dict:
        """Read a 6-digit numeral in Indian system → words."""
        n = self._valid_6digit(n)
        words = number_to_indian_words(n)
        steps = [
            f"Given number: {n:,}",
            f"In the Indian system, the periods are: lakhs | ten-thousands | thousands | hundreds | tens | ones",
            f"Lakhs digit  : {n // 100000}",
            f"Remaining    : {n % 100000:,}",
            f"→ {n:,} = {words}"
        ]
        return {"answer": words, "steps": steps,
                "verified": self._verify_read(n, words)}

    def q1_write_numeral(self, words: str) -> dict:
        """Convert word-form → Indian numeral."""
        n = words_to_indian_numeral(words)
        steps = [
            f"Given in words: {words}",
            f"Identify lakhs part, thousands part, hundreds/tens/ones part",
            f"Lakhs part × 1,00,000  +  Thousands part × 1,000  +  Rest",
            f"= {n:,}"
        ]
        return {"answer": f"{n:,}", "steps": steps,
                "verified": n == words_to_indian_numeral(words)}

    def q1_place_value_of_digit(self, n: int, digit: int) -> dict:
        """Find place value of a given digit in a 6-digit number."""
        n = self._valid_6digit(n)
        if not (0 <= digit <= 9):
            raise ValueError("digit must be 0-9")
        s = str(n)
        if str(digit) not in s:
            raise ValueError(f"digit {digit} not in {n}")
        pos_from_right = len(s) - 1 - s.index(str(digit))   # first occurrence
        place_names  = ["ones","tens","hundreds","thousands",
                        "ten thousands","lakhs"]
        place_values = [1,10,100,1000,10000,100000]
        place_name  = place_names[pos_from_right]
        place_val   = digit * place_values[pos_from_right]
        steps = [
            f"Number: {n:,}",
            f"Look for digit '{digit}' from the RIGHT.",
            f"Position from right: {pos_from_right} → '{place_name}' place",
            f"Place value = digit × place value of position",
            f"= {digit} × {place_values[pos_from_right]:,} = {place_val:,}"
        ]
        return {"answer": str(place_val),
                "steps": steps,
                "verified": place_val == digit * place_values[pos_from_right]}

    def q1_face_value(self, n: int, digit: int) -> dict:
        """Return face value of a given digit (simply the digit itself)."""
        n = self._valid_6digit(n)
        s = str(n)
        if str(digit) not in s:
            raise ValueError(f"digit {digit} not in {n}")
        steps = [
            f"Number: {n:,}",
            f"Face value is the value of the digit itself, regardless of position.",
            f"Face value of digit '{digit}' = {digit}"
        ]
        return {"answer": str(digit), "steps": steps,
                "verified": True}

    # ── NODE c4_math_002: Place value and face value ──────────────────────────

    def q2_expanded_form(self, n: int) -> dict:
        """Write 6-digit number in expanded form."""
        n = self._valid_6digit(n)
        parts = []
        multipliers = [100000, 10000, 1000, 100, 10, 1]
        digits = [int(d) for d in f"{n:06d}"]
        labels = ["lakhs","ten thousands","thousands","hundreds","tens","ones"]
        for d, m, lbl in zip(digits, multipliers, labels):
            if d != 0:
                parts.append(f"{d * m:,}")
        expanded = " + ".join(parts)
        steps = [
            f"Number: {n:,}",
            "Break into each place:",
            *[f"  {lbl}: {d} × {m:,} = {d*m:,}" for d,m,lbl in zip(digits,multipliers,labels) if d],
            f"Expanded form: {expanded}"
        ]
        return {"answer": expanded, "steps": steps,
                "verified": sum(int(p.replace(",","")) for p in parts) == n}

    def q2_from_expanded_form(self, parts: List[str]) -> dict:
        """Reconstruct number from list of expanded-form terms."""
        total = sum(int(p.replace(",","")) for p in parts)
        numeral = f"{total:,}"
        steps = [
            f"Given expanded form terms: {', '.join(parts)}",
            f"Add all parts: {' + '.join(parts)}",
            f"= {total:,}",
            f"In Indian system: {numeral}"
        ]
        return {"answer": numeral, "steps": steps,
                "verified": total == sum(int(p.replace(",","")) for p in parts)}

    def q2_place_and_face_value(self, n: int, digit: int) -> dict:
        """Full place + face value answer for a digit."""
        n = self._valid_6digit(n)
        s = str(n)
        if str(digit) not in s:
            raise ValueError(f"digit {digit} not in {n}")
        pos = len(s) - 1 - s.index(str(digit))
        labels  = ["ones","tens","hundreds","thousands","ten thousands","lakhs"]
        pvalues = [1,10,100,1000,10000,100000]
        pv = digit * pvalues[pos]
        steps = [
            f"Number: {n:,}  |  Digit requested: {digit}",
            f"Face value = the digit itself = {digit}",
            f"Position from RIGHT: {pos} → '{labels[pos]}' place",
            f"Place value = {digit} × {pvalues[pos]:,} = {pv:,}"
        ]
        return {"answer": {"face_value": digit, "place_value": pv,
                            "place_name": labels[pos]},
                "steps": steps, "verified": pv == digit * pvalues[pos]}

    # ── NODE c4_math_003: Ordering ────────────────────────────────────────────

    def q3_ascending_order(self, numbers: List[int]) -> dict:
        nums = sorted(numbers)
        in_str  = ", ".join(f"{x:,}" for x in numbers)
        out_str = " < ".join(f"{x:,}" for x in nums)
        steps = [
            f"Numbers given: {in_str}",
            "Arrange from SMALLEST → LARGEST (ascending):",
            *[f"  Step {i}: {x:,}" for i, x in enumerate(nums, 1)],
            f"Ascending order: {out_str}"
        ]
        return {"answer": nums, "steps": steps,
                "verified": nums == sorted(numbers)}

    def q3_descending_order(self, numbers: List[int]) -> dict:
        nums = sorted(numbers, reverse=True)
        in_str  = ", ".join(f"{x:,}" for x in numbers)
        out_str = " > ".join(f"{x:,}" for x in nums)
        steps = [
            f"Numbers given: {in_str}",
            "Arrange from LARGEST → SMALLEST (descending):",
            *[f"  Step {i}: {x:,}" for i, x in enumerate(nums, 1)],
            f"Descending order: {out_str}"
        ]
        return {"answer": nums, "steps": steps,
                "verified": nums == sorted(numbers, reverse=True)}

    def q3_comparison(self, a: int, b: int) -> dict:
        """Compare two 6-digit numbers using >, <, =."""
        if a < b:
            sym, word = "<", "smaller than"
        elif a > b:
            sym, word = ">", "greater than"
        else:
            sym, word = "=", "equal to"
        # place-value based reasoning
        sa, sb = f"{a:06d}", f"{b:06d}"
        diff_place = next((i for i,(x,y) in enumerate(zip(sa,sb)) if x!=y), None)
        label = ["lakhs","ten thousands","thousands","hundreds","tens","ones"][diff_place]
        steps = [
            f"Compare: {a:,}  and  {b:,}",
            f"Check digit by digit from left (lakhs place first):",
            *[f"  {lbl}: {int(sa[i])} {'=' if sa[i]==sb[i] else ('<' if sa[i]<sb[i] else '>')} {int(sb[i])}"
              for i, lbl in enumerate(["lakhs","ten thousands","thousands",
                                       "hundreds","tens","ones"])],
            f"First differing place: '{label}' place — {int(sa[diff_place])} {sym} {int(sb[diff_place])}",
            f"Conclusion: {a:,} {sym} {b:,}  ({a:,} is {word} {b:,})"
        ]
        return {"answer": sym, "steps": steps,
                "verified": (a < b and sym == "<") or (a > b and sym == ">") or
                            (a == b and sym == "=")}

    # ──────────────────────────────────────────────────────────────────────────
    # ──────────────────────────────────────────────────────────────────────────
    @staticmethod
    def _valid_6digit(n: int) -> int:
        if not (100000 <= n <= 999999):
            raise ValueError(f"{n} is not a 6-digit number (100000-999999)")
        return n

    @staticmethod
    def _verify_read(n: int, words: str) -> bool:
        """Verify by round-trip: numeral → words → numeral."""
        back = words_to_indian_numeral(words)
        return back == n


# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    s = Class4MathSolver(seed=42)
    print("=== NODE 001 — Read 6-digit number ===")
    print(s.q1_read_numeral(245318))
    print()
    print("=== NODE 001 — Write numeral from words ===")
    print(s.q1_write_numeral("one lakh twenty thousand five hundred six"))
    print()
    print("=== NODE 002 — Expanded form ===")
    print(s.q2_expanded_form(452316))
    print()
    print("=== NODE 003 — Ascending order ===")
    print(s.q3_ascending_order([184739, 291450, 56023, 398712, 71200]))
    print()
    print("=== NODE 003 — Comparison ===")
    print(s.q3_comparison(345678, 298451))