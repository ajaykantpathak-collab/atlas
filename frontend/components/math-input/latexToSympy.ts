/**
 * latexToSympy — convert a MathLive LaTeX string into a SymPy-compatible
 * Python expression string that the backend solver can `sympify()`.
 *
 * This is a lightweight, deterministic transformer — it does not aim for
 * full LaTeX coverage, only the subset produced by MathInput's keypads
 * (algebra, calculus, trigonometry, matrices, statistics).
 *
 * For anything it cannot translate it returns the original string so the
 * caller can decide whether to fall back to a server-side converter.
 */

/**
 * Convert a LaTeX expression to a SymPy-compatible string.
 *
 * Examples:
 *   \frac{a}{b}        ->  a/b
 *   \sqrt{x}           ->  sqrt(x)
 *   x^{2}              ->  x**2
 *   \pi                ->  pi
 *   \sin{x}            ->  sin(x)
 *   \int_{0}^{1} x dx  ->  Integral(x, (x, 0, 1))
 */
export function latexToSympy(latex: string): string {
  if (!latex || typeof latex !== 'string') return '';

  let s = latex;

  // ── Strip MathLive placeholder / selection markers ──
  s = s.replace(/#[0-9]?/g, '');
  s = s.replace(/\\!/g, '');

  // ── Constants ──
  s = s.replace(/\\pi/g, 'pi');
  s = s.replace(/\\infty/g, 'oo');
  s = s.replace(/\\theta/g, 'theta');
  s = s.replace(/\\alpha/g, 'alpha');
  s = s.replace(/\\beta/g, 'beta');
  s = s.replace(/\\gamma/g, 'gamma');
  s = s.replace(/\\delta/g, 'delta');
  s = s.replace(/\\lambda/g, 'lambda');
  s = s.replace(/\\mu/g, 'mu');

  // ── Fractions: \frac{a}{b} -> (a)/(b) ──
  s = s.replace(/\\frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, '($1)/($2)');
  // Nested fractions — run a second pass
  s = s.replace(/\\frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, '($1)/($2)');

  // ── Roots ──
  s = s.replace(/\\sqrt\s*\{([^{}]*)\}/g, 'sqrt($1)');
  s = s.replace(/\\sqrt\s*\[(\d+)\]\s*\{([^{}]*)\}/g, '($2)**(1/$1)');

  // ── Superscripts / subscripts ──
  s = s.replace(/\^\s*\{([^{}]+)\}/g, '**($1)');
  s = s.replace(/\^([0-9a-zA-Z.+-])/g, '**$1');
  s = s.replace(/_\s*\{([^{}]+)\}/g, '_$1');
  s = s.replace(/_([0-9a-zA-Z])/g, '_$1');

  // ── Greek-letter function names already replaced above ──

  // ── Trig & log functions: \sin{x} -> sin(x), \sin x -> sin(x) ──
  const FUNCS = ['sin', 'cos', 'tan', 'sec', 'csc', 'cot', 'log', 'ln', 'exp', 'arcsin', 'arccos', 'arctan', 'sinh', 'cosh', 'tanh'];
  for (const fn of FUNCS) {
    // \fn{arg} -> fn(arg)
    const braceRe = new RegExp(`\\\\${fn}\\s*\\{([^{}]*)\\}`, 'g');
    s = s.replace(braceRe, `${fn}($1)`);
    // \fn arg -> fn(arg)  (single token following)
    const spaceRe = new RegExp(`\\\\${fn}\\s+([0-9a-zA-Z.]+)`, 'g');
    s = s.replace(spaceRe, `${fn}($1)`);
    // \fn(x) -> fn(x)  (already parenthesised)
    const parenRe = new RegExp(`\\\\${fn}\\s*\\(`, 'g');
    s = s.replace(parenRe, `${fn}(`);
  }

  // ── Limits ──
  s = s.replace(/\\lim\s*_\{([^{}]*)\}\s*\{([^{}]*)\}/g, 'Limit($2, $1)');

  // ── Integrals: \int_{a}^{b} f dx -> Integral(f, (x, a, b)) ──
  s = s.replace(/\\int\s*_\{([^{}]*)\}\s*\^\s*\{([^{}]*)\}\s*([^\\]+?)\\d([a-zA-Z])/g, 'Integral($3, ($4, $1, $2))');
  s = s.replace(/\\int\s*([^\\]+?)\\d([a-zA-Z])/g, 'Integral($1, $2)');

  // ── Summation: \sum_{i=a}^{b} expr -> summation(expr, (i, a, b)) ──
  s = s.replace(/\\sum\s*_\{([^{}=]+)=([^{}]*)\}\s*\^\s*\{([^{}]*)\}\s*([^\\]+)/g, 'summation($4, ($1, $2, $3))');

  // ── Products ──
  s = s.replace(/\\prod\s*_\{([^{}=]+)=([^{}]*)\}\s*\^\s*\{([^{}]*)\}\s*([^\\]+)/g, 'product($4, ($1, $2, $3))');

  // ── Matrices: \begin{matrix}...\end{matrix} -> Matrix([...]) ──
  s = s.replace(/\\begin\{(?:matrix|bmatrix|pmatrix|vmatrix)\}([\s\S]*?)\\end\{(?:matrix|bmatrix|pmatrix|vmatrix)\}/g,
    (_m, body: string) => {
      const rows = body.trim().split('\\\\').map((r: string) =>
        '[' + r.trim().split('&').map((c: string) => c.trim()).join(', ') + ']'
      );
      return 'Matrix([' + rows.join(', ') + '])';
    });

  // ── Binomial: \binom{n}{k} -> binomial(n, k) ──
  s = s.replace(/\\binom\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, 'binomial($1, $2)');

  // ── Absolute value: |x| -> Abs(x) ──
  s = s.replace(/\|([^|]+)\|/g, 'Abs($1)');

  // ── Multiplication: \times -> *, \cdot -> * ──
  s = s.replace(/\\times/g, '*');
  s = s.replace(/\\cdot/g, '*');
  s = s.replace(/\\div/g, '/');

  // ── Inequalities ──
  s = s.replace(/\\leq/g, '<=');
  s = s.replace(/\\geq/g, '>=');
  s = s.replace(/\\neq/g, '!=');

  // ── Clean up stray backslashes (e.g. \, \; spacing) ──
  s = s.replace(/\\[,;:!]/g, '');
  s = s.replace(/\\left/g, '');
  s = s.replace(/\\right/g, '');

  // ── Collapse whitespace ──
  s = s.replace(/\s+/g, ' ').trim();

  return s;
}

export default latexToSympy;
