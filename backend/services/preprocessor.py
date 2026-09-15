"""
preprocessor.py — Layer 1: Text normalization and math extraction.

Deterministic. No LLM. Pure Python regex + unicodedata.

What it does:
  - Normalizes unicode (smart quotes, superscripts, subscripts)
  - Extracts LaTeX from $...$, \\(...\\), backtick blocks
  - Normalizes math notation (x² → x**2, √x → sqrt(x), etc.)
  - Strips diagram placeholders
  - Returns clean normalized text + extracted math expressions

Author: Platform Backend Team
"""

from __future__ import annotations

import re
import unicodedata
from dataclasses import dataclass, field
from typing import Optional


@dataclass
class PreprocessedText:
    """Result of preprocessing."""
    raw_text: str
    normalized_text: str
    math_expressions: list[str] = field(default_factory=list)
    has_latex: bool = False
    has_diagram: bool = False
    warnings: list[str] = field(default_factory=list)

    def to_dict(self) -> dict:
        return {
            "raw_text": self.raw_text,
            "normalized_text": self.normalized_text,
            "math_expressions": self.math_expressions,
            "has_latex": self.has_latex,
            "has_diagram": self.has_diagram,
            "warnings": self.warnings,
        }


# ──────────────────────────────────────────────────────────────────────────────
# Unicode normalization maps
# ──────────────────────────────────────────────────────────────────────────────

_SUPERSCRIPT_MAP = {
    '²': '**2', '³': '**3', '⁴': '**4', '⁵': '**5', '⁶': '**6',
    '⁷': '**7', '⁸': '**8', '⁹': '**9', '⁰': '**0',
    '¹': '**1',
}

_SUBSCRIPT_MAP = {
    '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4',
    '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9',
}

_SMART_QUOTE_MAP = {
    '\u2018': "'", '\u2019': "'", '\u201a': "'",
    '\u201c': '"', '\u201d': '"', '\u201e': '"',
    '\u2032': "'", '\u2033': '"',  # prime, double prime
}

_MATH_SYMBOL_MAP = {
    '×': '*', '÷': '/', '−': '-', '–': '-', '—': '-',
    '√': 'sqrt', '∛': 'cbrt', '∜': 'root4',
    '≈': '~=', '≠': '!=', '≤': '<=', '≥': '>=',
    '∞': 'oo', 'π': 'pi', 'θ': 'theta', 'α': 'alpha',
    'β': 'beta', 'γ': 'gamma', 'δ': 'delta', 'λ': 'lambda',
    'μ': 'mu', 'ρ': 'rho', 'σ': 'sigma', 'τ': 'tau',
    'φ': 'phi', 'ψ': 'psi', 'ω': 'omega', 'Δ': 'Delta',
    'Σ': 'Sigma', 'Π': 'Pi', 'Ω': 'Omega',
    '°': 'deg', '′': "'", '″': '"',
    '·': '*', '∙': '*', '⋆': '*',
    '→': '->', '←': '<-', '↔': '<->',
    '⇒': '=>', '⇐': '<=', '⇔': '<=>',
    '∈': 'in', '∉': 'notin', '⊆': 'subset', '∪': 'union',
    '∩': 'intersect', '∅': 'EmptySet',
    '±': '+-', '∓': '-+',
}

# Degree/angle patterns
_ANGLE_PATTERN = re.compile(r'(\d+(?:\.\d+)?)\s*°')
# Temperature patterns
_TEMP_PATTERN = re.compile(r'(\d+(?:\.\d+)?)\s*°\s*[Cc]')
# Scientific notation
_SCI_NOTATION = re.compile(r'(\d+(?:\.\d+)?)\s*[×x]\s*10\^?\(?(-?\d+)\)?')


class Preprocessor:
    """Layer 1: Preprocess raw problem text."""

    def preprocess(self, raw_text: str) -> PreprocessedText:
        """Main entry point — normalize text and extract math."""
        if not raw_text or not raw_text.strip():
            return PreprocessedText(raw_text=raw_text or "", normalized_text="")

        text = raw_text

        # Step 1: Extract LaTeX expressions before normalization
        math_expressions = []
        has_latex = False

        # $...$ inline math
        latex_inline = re.findall(r'\$([^$]+)\$', text)
        if latex_inline:
            math_expressions.extend(latex_inline)
            has_latex = True
            text = re.sub(r'\$([^$]+)\$', r' \1 ', text)

        # \(...\) inline math
        latex_paren = re.findall(r'\\\((.+?)\\\)', text)
        if latex_paren:
            math_expressions.extend(latex_paren)
            has_latex = True
            text = re.sub(r'\\\((.+?)\\\)', r' \1 ', text)

        # \[...\] display math
        latex_bracket = re.findall(r'\\\[(.+?)\\\]', text, re.DOTALL)
        if latex_bracket:
            math_expressions.extend(latex_bracket)
            has_latex = True
            text = re.sub(r'\\\[(.+?)\\\]', r' \1 ', text, flags=re.DOTALL)

        # Backtick code blocks with math
        backtick = re.findall(r'```math\n(.+?)\n```', text, re.DOTALL)
        if backtick:
            math_expressions.extend(backtick)
            has_latex = True
            text = re.sub(r'```math\n(.+?)\n```', r' \1 ', text, flags=re.DOTALL)

        # Step 2: Unicode normalization (NFKC)
        text = unicodedata.normalize('NFKC', text)

        # Step 3: Replace smart quotes
        for smart, straight in _SMART_QUOTE_MAP.items():
            text = text.replace(smart, straight)

        # Step 4: Replace math symbols
        for symbol, replacement in _MATH_SYMBOL_MAP.items():
            text = text.replace(symbol, replacement)

        # Step 5: Replace superscripts
        for sup, replacement in _SUPERSCRIPT_MAP.items():
            text = text.replace(sup, replacement)

        # Step 6: Replace subscripts
        for sub, replacement in _SUBSCRIPT_MAP.items():
            text = text.replace(sub, replacement)

        # Step 7: Normalize x^2 → x**2 (caret to double-star)
        text = re.sub(r'\^', '**', text)

        # Step 8: Normalize degree notation
        text = _ANGLE_PATTERN.sub(r'\1 deg', text)

        # Step 9: Normalize scientific notation
        text = _SCI_NOTATION.sub(r'\1*10**\2', text)

        # Step 10: Collapse whitespace
        text = re.sub(r'\s+', ' ', text).strip()

        # Step 11: Detect diagram placeholders
        has_diagram = bool(re.search(
            r'(figure|diagram|graph|image|see figure|as shown|refer to)',
            text, re.IGNORECASE
        ))

        # Step 12: Clean up common OCR artifacts
        text = re.sub(r'\bO(?=\d)', '0', text)  # O before digit → 0
        text = re.sub(r'(?<=\d)O\b', '0', text)  # O after digit → 0

        warnings = []
        if has_diagram:
            warnings.append("Problem references a diagram — image input not supported")
        if has_latex and len(math_expressions) > 5:
            warnings.append(f"Many math expressions ({len(math_expressions)}) — may need careful parsing")

        return PreprocessedText(
            raw_text=raw_text,
            normalized_text=text,
            math_expressions=math_expressions,
            has_latex=has_latex,
            has_diagram=has_diagram,
            warnings=warnings,
        )


# Singleton
_preprocessor = None


def get_preprocessor() -> Preprocessor:
    global _preprocessor
    if _preprocessor is None:
        _preprocessor = Preprocessor()
    return _preprocessor


def preprocess(text: str) -> PreprocessedText:
    """Convenience function."""
    return get_preprocessor().preprocess(text)
