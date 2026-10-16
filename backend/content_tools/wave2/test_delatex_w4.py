"""Unit tests for the W4 de-LaTeX converter on real corpus fragments."""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from delatex_w4 import convert_math, delatex_body, _dollar_ok, DELIM_RE, DOLLAR_RE

CASES = [
    (r"\(1/v + 1/u = 1/f\)", "1/v + 1/u = 1/f"),
    (r"\(\frac{a}{b}\)", "(a)/(b)"),
    (r"\(\frac{1}{2}mv^2\)", "(1)/(2)mv²"),
    (r"$b \neq 1$", "b ≠ 1"),
    (r"$\log_b N$", "log_b N"),
    (r"$b^x = N$", "b^x = N"),
    (r"\(\vec{A} \times \vec{B}\)", "A × B"),
    (r"\(\theta = 30^\circ\)", "θ = 30°"),
    (r"\(\theta = 30^\circ\)", "θ = 30°"),
    (r"\(45^\circ\), right angle", "45°, right angle"),
    (r"\(x_{12} + m_1\)", "x₁₂ + m₁"),
    (r"\(\sum_{i=1}^{n} x_i\)", "Σ(i=1 to n) x_i"),
    (r"\(\int_0^a f(x)\,dx\)", "∫(0 to a) f(x)dx"),
    (r"\(\sqrt{2}\)", "√(2)"),
    (r"\(A \leq B \geq C\)", "A ≤ B ≥ C"),
    (r"\(\hat{i} + \hat{j}\)", "î + ĵ"),
    (r"\(\alpha, \beta, \gamma\)", "α, β, γ"),
    (r"\(\infty\)", "∞"),
    (r"\(\sum_{i=1}^{n} x_i\)", "Σₙᵢ₌₁ⁿ⁽? xᵢ"),  # complex: eyeball only
    (r"\(\text{Area} = l \times b\)", "Area = l × b"),
]
for src, want in CASES:
    got = DELIM_RE.sub(lambda m: convert_math(m.group(1) or m.group(2)), src)
    if DOLLAR_RE.search(got):
        got = DOLLAR_RE.sub(lambda m: convert_math(m.group(1)) if _dollar_ok(m.group(1)) else m.group(0), got)
    flag = "OK " if got == want else ("EYEBALL" if want.endswith("?") else "DIFF")
    print(f"{flag} {src!r:44} -> {got!r}")

# currency must NOT be touched
cur = "imports goods from USA for $50,000 on 1st January 2024 when exchange rate is ₹83/$. Payment at ₹84/$."
new, n = delatex_body(cur)
print("\ncurrency unchanged:", new == cur, "| groups:", n)
if new != cur:
    print("  ->", new)

# real body sample
body = r"""Start from \(1/v + 1/u = 1/f\). With \(f = -20\text{ cm}\) and \(u = -15\text{ cm}\),
\(\frac{1}{v} = \frac{1}{f} - \frac{1}{u} = -\frac{1}{20} + \frac{1}{15}\), so \(v = -60\text{ cm}\).
The magnification \(m = -v/u = -(-60)/(-15) = -4\); the image is real and inverted ($\theta > 0$ means erect)."""
new, n = delatex_body(body)
print("\nsample body conversions:", n)
print(new)
