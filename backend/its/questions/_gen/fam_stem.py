"""fam_stem.py -- generic formula-driven question family for STEM subjects.

Unlike the fixed-shape maths families, ``formula_eval`` is CONCEPT-AWARE:
it parses the concept's own ``formula`` field (``lhs = rhs_expr``),
samples plausible values for every RHS variable, and fills the
``...`` slots of the concept's ``question_patterns`` (or a fallback
template).  The emitted chain binds each input then evaluates the RHS,
so ``solution_steps`` generated from it terminate in the answer --
which is exactly what the executor's step-chain layer consumes.
"""
from __future__ import annotations

import math
import re

import qbank_lib as L

_IDENT = re.compile(r"[A-Za-z_][A-Za-z0-9_]*")

# identifiers that are functions/constants, never bindable variables
_FUNCS = {"sqrt", "sin", "cos", "tan", "asin", "acos", "atan", "log",
          "ln", "exp", "abs", "pi", "e", "floor", "ceil", "min", "max",
          "g", "c"}   # g/c = physical constants, seeded in eval env

# name-token -> plausible physical range (lo, hi, integer_only)
_RANGES = [
    (("time", "_t", "t_"), (1, 120, False)),
    (("mass", "weight"), (0.5, 200, False)),
    (("radius", "diameter"), (0.5, 50, False)),
    (("length", "height", "width", "depth", "side", "thickness",
      "distance", "displacement", "wavelength"), (0.5, 500, False)),
    (("velocity", "speed", "_v", "v_"), (0.5, 120, False)),
    (("acceleration", "accel", "decel"), (0.1, 25, False)),
    (("angle", "theta"), (1, 180, False)),
    (("temperature", "temp"), (200, 400, False)),
    (("pressure",), (10, 500, False)),
    (("volume", "capacity"), (0.1, 100, False)),
    (("density",), (0.1, 20, False)),
    (("force", "load"), (1, 1000, False)),
    (("charge", "current"), (0.1, 30, False)),
    (("voltage", "potential", "emf"), (1, 440, False)),
    (("resistance", "resistivity"), (0.1, 500, False)),
    (("power",), (1, 5000, False)),
    (("frequency",), (1, 1000, False)),
    (("energy", "work", "heat"), (1, 10000, False)),
    (("moles", "mole", "_n", "n_"), (0.1, 20, False)),
    (("concentration", "molarity", "molality"), (0.01, 10, False)),
    (("count", "number", "turns"), (1, 500, True)),
    (("focal",), (1, 100, False)),
    (("arc",), (0.5, 60, False)),
    (("sin_", "cos_", "tan_", "sinh", "cosh", "tanh"), (0.05, 1, False)),
]


def _var_range(name):
    low = name.lower()
    for tokens, spec in _RANGES:
        for tok in tokens:
            if tok in low:
                return spec
    return (0.5, 100, False)


def _sample(rng, name, in_denominator):
    lo, hi, integral = _var_range(name)
    if in_denominator:
        lo = max(lo, 0.5)
    if integral:
        return float(rng.randint(int(lo), int(hi)))
    v = rng.uniform(lo, hi)
    # round to 1-2 decimals for readable questions
    return round(v, 1 if v < 20 else 0) or lo


def _parse_formula(formula):
    """'theta = arc_length / radius' -> ('theta', 'arc_length / radius',
    [rhs vars]).  Only single-equation formulas; multi-eq takes the first."""
    if not formula or "=" not in formula:
        return None
    first = re.split(r"[,;\n]", str(formula))[0]
    if "=" not in first or "<<" in first or "==" in first \
            or "<=" in first or ">=" in first or "!=" in first:
        return None
    lhs, rhs = first.split("=", 1)
    lhs, rhs = lhs.strip(), rhs.strip()
    if not re.match(r"^[A-Za-z_][A-Za-z0-9_]*$", lhs) or not rhs:
        return None
    vars_ = [v for v in _IDENT.findall(rhs)
             if v.lower() not in _FUNCS and v != lhs]
    # dedupe, keep order
    seen, out = set(), []
    for v in vars_:
        if v not in seen:
            seen.add(v)
            out.append(v)
    if not out or len(out) > 5:
        return None
    # RHS must be evaluable arithmetic only
    if re.search(r"[^0-9A-Za-z_+\-*/^()\s.]", rhs):
        return None
    return lhs, rhs, out


def _fill_pattern(pat, values):
    """Replace each '...'/'___' slot with the next value."""
    vals = iter(values)
    def rep(_m):
        return next(vals)
    out = re.sub(r"\.\.\.|___+|\{\w+\}", rep, pat)
    return out


def _fill_pattern_named(pat, vars_):
    """Same slots, filled with '{var}' placeholders -> extractor template."""
    names = iter(vars_)
    def rep(_m):
        return "{%s}" % next(names)
    return re.sub(r"\.\.\.|___+|\{\w+\}", rep, str(pat))


def _denominator_vars(rhs):
    """Vars appearing after a '/' (approximate -- string scan)."""
    denom = set()
    for m in re.finditer(r"/\s*([A-Za-z_][A-Za-z0-9_]*)", rhs):
        denom.add(m.group(1))
    for m in re.finditer(r"/\s*\(([^)]*)\)", rhs):
        denom.update(_IDENT.findall(m.group(1)))
    return denom


def _norm_var(name):
    """Digits inside names get mangled by input_normalizer ('I2' ->
    'I^2', 'so2_gas' -> 'so^2_gas'); underscore form survives."""
    return re.sub(r"(?<!_)(\d+)", r"_\1", name)


def _parse_all_equations(formula):
    """'a = x, b = f(a)' -> ordered [(lhs, rhs), ...] pairs."""
    out = []
    for eq in re.split(r"[,;\n]", str(formula or "")):
        eq = eq.strip()
        if "=" not in eq or "<<" in eq or "==" in eq or "<=" in eq \
                or ">=" in eq or "!=" in eq:
            continue
        lhs, rhs = eq.split("=", 1)
        lhs, rhs = lhs.strip(), rhs.strip()
        if not re.match(r"^[A-Za-z_][A-Za-z0-9_]*$", lhs) or not rhs:
            continue
        if re.search(r"[^0-9A-Za-z_+\-*/^()\s.]", rhs):
            continue
        out.append((lhs, rhs))
    return out


def _fix_constants(eqs, title_l, formula_l):
    """Context-aware constant handling: bake physical constants or
    rename colliding vars so each formula is self-consistent.

    Returns (new_eqs, renamed) where renamed maps old->new var names."""
    ctx = title_l + " " + formula_l
    baked = {}
    renames = {}
    # Stefan-Boltzmann constant: not a sampled input
    if re.search(r"stefan|boltzmann|radiat", ctx):
        baked["sigma"] = "5.67e-8"
    # gas constant in PV = nRT style laws
    if re.search(r"gas|ideal|boyle|charles|avogadro", ctx):
        baked["R"] = "8.314"
    # 'e': emissivity in radiation, elementary charge in quantisation,
    # Euler's number otherwise (env-seeded)
    if re.search(r"charge|quantis|electron|ionis", ctx):
        baked["e"] = "1.6e-19"
    elif re.search(r"stefan|boltzmann|radiat|emissiv|blackbody", ctx):
        renames["e"] = "emissivity"
    # 'c': specific heat in calorimetry, else env constant (3e8)
    if re.search(r"specific|calorim|heat capacity|thermal", ctx):
        renames["c"] = "c_sp"
    new_eqs = []
    for lhs, rhs in eqs:
        for old, new in renames.items():
            rhs = re.sub(r"\b%s\b" % re.escape(old), new, rhs)
            if lhs == old:
                lhs = new
        for const, lit in baked.items():
            rhs = re.sub(r"\b%s\b" % re.escape(const), lit, rhs)
            if lhs == const:
                lhs = lit  # degenerate: lhs was a constant name
        new_eqs.append((lhs, rhs))
    return new_eqs, renames


@L.family("formula_eval")
def _formula_eval(rng, concept=None):
    """Concept-aware generic family: instantiate the concept's formula.

    Supports multi-equation formulas as sequential compute chains
    (earlier lhs values feed later rhs -- real multi-step)."""
    if not concept:
        return []
    # dimensional-analysis formulas (dim_X = M^a L^b T^c) are symbolic,
    # not numeric computes -- sampling M/L/T produces meaningless values
    title_l = str(concept.get("title") or "").lower()
    formula_l = str(concept.get("formula") or "").lower()
    if "dimensional" in title_l or formula_l.startswith("dim_"):
        return []
    eqs = _parse_all_equations(concept.get("formula"))
    if not eqs:
        return []
    # prose-as-variable "formulas" (zwitter_ion = nh_3_plus_and_cooh_...)
    all_names = [n for pr in eqs for n in
                 [pr[0]] + _IDENT.findall(pr[1])]
    if any(len(v) > 24 for v in all_names) or \
            any(re.search(r"_(and|or|on|to|the|with|in|of|by|at|from)_",
                          v) for v in all_names):
        return []
    eqs, _ren = _fix_constants(eqs, title_l, formula_l)
    # normalizer-safe renames for every identifier
    def _rn(x):
        return _norm_var(x)
    produced = {_rn(l) for l, _ in eqs}
    new_eqs = []
    inputs: list = []
    for lhs, rhs in eqs:
        for old in sorted({v for v in _IDENT.findall(rhs)
                           if _norm_var(v) != v},
                          key=len, reverse=True):
            rhs = re.sub(r"\b%s\b" % re.escape(old), _rn(old), rhs)
        lhs_n = _rn(lhs)
        rhs_vars = [v for v in _IDENT.findall(rhs)
                    if v.lower() not in _FUNCS and v != lhs_n
                    and not re.fullmatch(r"[\d.]+", v)]
        for v in rhs_vars:
            if v not in produced and v not in inputs:
                inputs.append(v)
        new_eqs.append((lhs_n, rhs))
    if not inputs or len(inputs) > 5:
        return []
    title = (concept.get("title") or new_eqs[-1][0]).replace("_", " ")
    pats = concept.get("question_patterns") or []
    target = new_eqs[-1][0]
    # denominator vars across all equations (avoid sampling ~0 divisors)
    denom = set()
    for _, rhs in new_eqs:
        denom.update(_denominator_vars(rhs))

    items = []
    for _ in range(12):
        vals = {v: _sample(rng, v, v in denom) for v in inputs}
        chain = ["%s = %s" % (v, L.fmt_num(vals[v])) for v in inputs]
        chain += ["%s = %s" % (l, r) for l, r in new_eqs]
        try:
            env, _val = L.run_chain(chain)
        except Exception:
            continue
        val = env.get(target)
        if val is None or not math.isfinite(val):
            continue
        disp = L.fmt_num(val)

        # labeled form: 'given arc_length = 443 and radius = 25' --
        # literal varnames bind deterministically via the labeled
        # extraction path (auto-inferred concepts refuse positional
        # guessing, so labels are the honest channel)
        given = ", ".join("%s = %s" % (v, L.fmt_num(vals[v]))
                          for v in inputs)
        q = "For %s: given %s, find %s." % (
            title, given, target.replace("_", " "))
        it = L.make_q(q, chain, disp)
        it["lhs"] = target
        it["eqs"] = list(new_eqs)
        items.append(it)

        # natural-phrasing variant from the concept's own patterns --
        # binds via the strict {var}-template path, not labels
        if len(items) < 12:
            ordered = [L.fmt_num(vals[v]) for v in inputs]
            for pat in pats:
                slots = len(re.findall(r"\.\.\.|___+|\{\w+\}",
                                       str(pat)))
                if slots == len(inputs):
                    nq = _fill_pattern(str(pat), ordered).rstrip(" .") \
                        + ("?" if "?" not in str(pat) else "")
                    it2 = L.make_q(nq, chain, disp)
                    it2["lhs"] = target
                    it2["eqs"] = list(new_eqs)
                    # template for the extractor: no trailing '?' --
                    # a literal '?' in the regex would require the
                    # question text to carry one
                    it2["tpl"] = _fill_pattern_named(
                        str(pat), inputs).rstrip(" .?")
                    items.append(it2)
                    break
    return items
