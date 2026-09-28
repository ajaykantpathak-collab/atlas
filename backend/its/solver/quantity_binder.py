"""quantity_binder — seam between quantity_parser and catalog formulas.

quantity_parser yields Quantity(value, family) objects ('velocity',
'length', 'time', ...).  Catalog concepts carry formulas over readable
variable names ('speed = distance / time').  This module binds the two:
family -> candidate variable names present in THIS concept's formula /
compute steps, producing the slots dict the executor consumes.

Deterministic only: no model calls, no guessing.  Ambiguous bindings
(same family hitting multiple variables) return every candidate
assignment so the executor can try each and keep the verified one.
"""

from __future__ import annotations

import itertools
import math
import re
from typing import Dict, List, Optional, Tuple

from backend.its.solver.input_normalizer import normalize_input
from backend.its.solver.quantity_parser import parse_quantities

# quantity family -> catalog variable names that carry that family.
# (matched case-insensitively against the concept's own identifiers)
_FAMILY_TO_NAMES: Dict[str, Tuple[str, ...]] = {
    "velocity": ("speed", "velocity", "v", "speed_kmph", "rate"),
    "acceleration": ("acceleration", "a", "accel"),
    "length": ("distance", "length", "d", "s", "l", "w", "h",
               "height", "width",
               "breadth", "base", "radius", "diameter", "side", "depth",
               "thickness", "perimeter", "circumference", "altitude",
               "slant_height"),
    "time": ("time", "t", "duration", "period", "years", "months",
             "days", "hours", "minutes"),
    "mass": ("mass", "m", "weight"),
    "money": ("principal", "p", "amount", "cost", "price", "sum", "cp",
              "sp", "investment", "salary", "wage", "loan", "deposit",
              "value", "fine", "bill", "total"),
    "percentage": ("rate", "r", "percent", "percentage", "discount",
                   "rate_percent", "interest_rate", "profit_percent"),
    "area": ("area", "a", "surface_area", "total_surface_area"),
    "volume": ("volume", "v", "capacity"),
    "temperature": ("temperature", "temp", "t_kelvin", "t_celsius"),
    "density": ("density", "rho"),
    "force": ("force", "f"),
    "energy": ("energy", "work", "e", "w", "heat"),
    "power": ("power", "p"),
    "current": ("current", "i"),
    "voltage": ("voltage", "v", "emf", "potential", "potential_difference"),
    "resistance": ("resistance", "r"),
    "charge": ("charge", "q"),
    "frequency": ("frequency", "f", "nu"),
    "pressure": ("pressure", "p"),
    "amount": ("moles", "n", "amount"),
    "molarity": ("molarity", "concentration", "c"),
    "molarmass": ("molarmass", "molar_mass"),
    "rate": ("rate", "r", "rate_per_year"),
    "field_b": ("b", "field", "magnetic_field"),
    "flux": ("flux", "phi"),
    "capacitance": ("capacitance", "c"),
    "torque": ("torque", "tau"),
    "viscosity": ("viscosity", "eta"),
    "stiffness": ("stiffness", "k"),
    "lineardensity": ("linear_density", "linear_density_lambda"),
    "dioptricpower": ("power", "p", "dioptre"),
}

# words that signal the ASKED quantity in the question (target var)
_TARGET_WORDS = {
    "time": ("time", "t", "duration", "period"),
    "speed": ("speed", "velocity", "v"),
    "velocity": ("speed", "velocity", "v"),
    "distance": ("distance", "d", "length", "s"),
    "length": ("length", "l", "distance"),
    "area": ("area", "a"),
    "volume": ("volume", "v", "capacity"),
    "mass": ("mass", "m", "weight"),
    "cost": ("cost", "price", "amount"),
    "price": ("price", "cost", "amount"),
    "amount": ("amount", "total", "a"),
    "rate": ("rate", "r", "percent", "interest_rate"),
    "percentage": ("percent", "percentage", "rate"),
    "percent": ("percent", "percentage", "rate"),
    "interest": ("interest", "i", "si", "ci"),
    "principal": ("principal", "p", "sum", "invested"),
    "radius": ("radius", "r"),
    "diameter": ("diameter", "d"),
    "height": ("height", "h", "altitude"),
    "width": ("width", "w", "breadth"),
    "breadth": ("breadth", "b", "width"),
    "perimeter": ("perimeter", "p"),
    "force": ("force", "f"),
    "energy": ("energy", "e", "work"),
    "work": ("work", "w", "energy"),
    "power": ("power", "p"),
    "current": ("current", "i"),
    "voltage": ("voltage", "v", "potential"),
    "resistance": ("resistance", "r"),
    "density": ("density", "rho"),
    "pressure": ("pressure", "p"),
    "frequency": ("frequency", "f"),
    "temperature": ("temperature", "temp", "t"),
    "moles": ("moles", "n", "mole"),
    "mole": ("moles", "n", "mole"),
    "concentration": ("molarity", "concentration", "c"),
    "molarity": ("molarity", "concentration", "c"),
    "lcm": ("lcm",), "hcf": ("hcf", "gcd"), "gcd": ("hcf", "gcd"),
    "other": ("other", "angle2", "second"), "third": ("third", "angle3"),
    "second": ("second", "angle2"),
}

_IDENT_RE = re.compile(r"[A-Za-z_][A-Za-z_0-9]*")


def concept_variables(concept: dict) -> List[str]:
    """All variable identifiers named by the concept's formula and
    compute steps (deduplicated, lower-cased)."""
    texts = [str(concept.get("formula") or "")]
    for s in concept.get("solution_steps") or []:
        texts.append(str(s.get("compute") or ""))
    seen, out = set(), []
    for t in texts:
        for m in _IDENT_RE.findall(t):
            wl = m.lower()
            if wl in ("sin", "cos", "tan", "log", "ln", "sqrt", "exp",
                      "abs", "min", "max", "pi", "e"):
                continue
            if wl not in seen:
                seen.add(wl)
                out.append(wl)
    return out


def bind_quantities(text: str, concept: dict) -> List[Dict[str, float]]:
    """Parse quantities from the question and bind them to the concept's
    formula variables by unit family.

    Returns a list of candidate slot dicts (usually one; several when a
    family is ambiguous so the executor can verify each).
    """
    norm = normalize_input(text)
    quants = parse_quantities(norm)
    if not quants:
        return []
    cvars = concept_variables(concept)
    if not cvars:
        return []

    # LHS outputs are never bind candidates — '18 m long' must not
    # land on 'perimeter' just because it carries a length unit
    outs = set()
    for _p in re.split(r"[;\n]", str(concept.get("formula") or "")):
        if "=" in _p:
            _l = _p.split("=", 1)[0].strip().lower()
            if re.fullmatch(r"[a-z_][a-z_0-9]*", _l):
                outs.add(_l)
    cvars = [v for v in cvars if v not in outs]
    if not cvars:
        return []

    # var -> set of families it can carry
    var_families: Dict[str, set] = {}
    for v in cvars:
        fams = {f for f, names in _FAMILY_TO_NAMES.items() if v in names}
        if fams:
            var_families[v] = fams

    # quantity -> candidate vars (by family, restricted to this concept)
    bindings: List[Tuple[float, List[str]]] = []
    for q in quants:
        fam = getattr(q, "family", "other") or "other"
        cands = [v for v, fams in var_families.items() if fam in fams]
        if cands:
            bindings.append((float(q.value), cands))
        else:
            # unitless or unknown family — unbound; the executor's own
            # slot layer may still pick it up positionally
            bindings.append((float(q.value), []))

    bound = [b for b in bindings if b[1]]
    if not bound:
        return []

    # product over ambiguous candidates (small — formulas have few vars)
    var_lists = [b[1] for b in bound]
    values = [b[0] for b in bound]
    out: List[Dict[str, float]] = []
    for combo in itertools.product(*var_lists):
        if len(set(combo)) != len(combo):
            continue  # two quantities can't share one variable
        out.append(dict(zip(combo, values)))
    return out[:8]  # cap: don't explode the executor


_NUM_RE = re.compile(r"-?\d+(?:\.\d+)?")

# structural constants named by common relation phrasing
# ("linear pair" -> 180, "around a point" -> 360, ...)
_RELATION_CONSTANTS = (
    (("linear pair", "straight line", "straight angle",
      "supplementary", "supplement"), 180.0),
    (("around a point", "complete angle", "full turn"), 360.0),
    (("complementary", "complement", "right angle"), 90.0),
    (("triangle",), 180.0),
    (("quadrilateral",), 360.0),
    (("whole", "total", "altogether"), None),
)


def _relation_constants(text_lower: str) -> List[float]:
    """Structural totals the question names by relation phrase."""
    out = []
    for kws, val in _RELATION_CONSTANTS:
        if any(k in text_lower for k in kws) and val is not None:
            out.append(val)
    return out


def _literal_step_solutions(concept: dict, text: str
                            ) -> List[Tuple[str, float, str]]:
    """Repair literal-only compute steps ('other = 90 - 20' baked from
    the concept's own example) by re-binding the literals to THIS
    question's numbers.

    Position rule: literal positions map left-to-right to the
    question's numbers left-to-right, except positions whose literal
    equals a structural constant named in the step/action text -- those
    take the relation constant the question selects ('linear pair'->180).
    Returns [(var, value, expr)] candidates.
    """
    steps = [s for s in (concept.get("solution_steps") or [])
             if str(s.get("compute") or "").strip()]
    if not steps:
        return []
    # a literal-only chain can only replay its own worked example —
    # never run it on a question that carries no numbers at all
    from backend.its.solver.input_normalizer import normalize_input
    if not re.findall(r"-?\d", normalize_input(text)):
        return []
    last = steps[-1]
    comp = str(last.get("compute") or "")
    if "=" not in comp:
        return []
    lhs, rhs = comp.split("=", 1)
    var = lhs.strip().lower()
    if not re.match(r"^[a-z_][a-z0-9_]*$", var):
        return []
    rhs = _mathify_simple(rhs)
    if rhs is None or re.search(r"[a-z_]", rhs, re.I):
        return []  # has variables — normal path handles it

    literals = _NUM_RE.findall(rhs)
    norm = normalize_input(text)
    qnums = _NUM_RE.findall(norm)
    qnums_f = [float(x) for x in qnums]
    lit_f = [float(x) for x in literals]
    if not lit_f or not qnums_f:
        return []

    # case A: the step's literals are exactly the question's numbers
    # (in order) — it IS this question's instance
    if lit_f == qnums_f:
        try:
            v = _safe_eval(rhs, {})
            return [(var, v, rhs)]
        except Exception:
            return []

    # structural constants: numbers named inside the step ACTION texts
    # ("sum to 90, 180, 360 or equal") — the explain text re-quotes the
    # compute literals and would poison the constant set
    step_text = " ".join(str(s.get("action") or "") for s in steps).lower()
    text_consts = set(_relation_constants(step_text))
    text_consts.update(float(x) for x in _NUM_RE.findall(step_text)
                       if float(x) >= 2)
    q_consts = _relation_constants(norm.lower())
    # the relation constant the QUESTION selects (e.g. 'linear pair'->180);
    # else any step constant that literally appears in the question
    chosen_const = None
    if q_consts:
        chosen_const = q_consts[0]
    elif text_consts:
        in_q = [c for c in text_consts if c in qnums_f]
        if len(in_q) == 1:
            chosen_const = in_q[0]

    out = []

    # unit-bearing quantities are the best non-constant fill values
    # (bare '2' in 'two angles' is a count word, not a measure)
    unit_vals = []
    try:
        unit_vals = [float(q.value) for q in parse_quantities(norm)
                     if getattr(q, "family", "other") != "dimensionless"]
    except Exception:
        pass
    fill_pool = [str(int(v)) if v == int(v) else str(v)
                 for v in (unit_vals or qnums_f)]

    def _emit(expr: str):
        try:
            v = _safe_eval(expr, {})
        except Exception:
            return
        # physical measures are never negative — a negative rebind
        # almost always means the positions were filled wrong
        if v is None or not math.isfinite(v) or v <= 0:
            return
        # angle questions: the answer is bounded by the relation's
        # total (180 for linear pairs, 360 around a point, 90 for
        # complements) — a rebound value past the total is a bad bind
        if ("angle" in norm.lower() or "degree" in norm.lower()) \
                and q_consts and v > max(q_consts):
            return
        out.append((var, v, expr))

    # const-fill first: literal positions matching a step-text constant
    # take the question's selected relation constant; other positions
    # take unit-bearing question values in order
    if text_consts and chosen_const is not None:
        expr = rhs
        qi = 0
        ok = True
        for lit in literals:
            lf = float(lit)
            if lf in text_consts:
                repl = repr(chosen_const)
            elif qi < len(fill_pool):
                repl = fill_pool[qi]
                qi += 1
            else:
                ok = False
                break
            expr = re.sub(r"(?<![\d.])" + re.escape(lit) + r"(?![\d.])",
                          repl, expr, count=1)
        if ok:
            _emit(expr)

    # positional zip — only for pure +/- expressions where operand
    # order is semantically safe; a * or / literal template without
    # named constants would silently compute the wrong operation
    if not re.search(r"[*/]", rhs):
        qn_variants = [qnums]
        if len(qnums_f) > len(lit_f) and qnums:
            qn_variants.append(qnums[1:])
        for qv_list in qn_variants:
            if len(qv_list) != len(literals):
                continue
            expr = rhs
            for lit, qv in zip(literals, qv_list):
                expr = re.sub(r"(?<![\d.])" + re.escape(lit) +
                              r"(?![\d.])", str(qv), expr, count=1)
            _emit(expr)
    return out


def _mathify_simple(expr: str) -> Optional[str]:
    """literal-only arithmetic expression -> python, or None."""
    s = expr.replace("^", "**").replace("x", "*").replace("×", "*")
    s = s.replace("÷", "/")
    if not re.match(r"^[\d\s+\-*/().*]+$", s):
        return None
    return s


def _safe_eval(expr: str, env: dict) -> float:
    import ast as _ast
    import operator as _op
    _OPS = {_ast.Add: _op.add, _ast.Sub: _op.sub, _ast.Mult: _op.mul,
            _ast.Div: _op.truediv, _ast.Pow: _op.pow,
            _ast.USub: _op.neg, _ast.UAdd: lambda x: x,
            _ast.Mod: _op.mod, _ast.FloorDiv: _op.floordiv}

    def ev(node):
        if isinstance(node, _ast.Expression):
            return ev(node.body)
        if isinstance(node, _ast.Constant):
            return float(node.value)
        if isinstance(node, _ast.BinOp):
            return _OPS[type(node.op)](ev(node.left), ev(node.right))
        if isinstance(node, _ast.UnaryOp):
            return _OPS[type(node.op)](ev(node.operand))
        if isinstance(node, _ast.Name):
            return env[node.id]
        raise ValueError("unsafe node")

    return float(ev(_ast.parse(expr.strip(), mode="eval")))


# "the HCF is 8" / "rate is 5" — assertion binds a named variable
# directly; "LCM of 56" is an operand phrase, never a bind
_ASSERT_RE = re.compile(
    r"\b([a-z_]{2,15}(?:\s+[a-z_]{2,15})?)\s+"
    r"(?:is|was|equals?|=)\s*(-?\d+(?:\.\d+)?)\b", re.IGNORECASE)

_ARTICLES = ("their", "its", "the", "a", "an", "his", "her")

# 'the LCM of 56 and 16 is 112' — the named value is separated from
# 'is' by its operand list (numbers + 'and'/commas only — the span
# must not cross into the next clause: 'lcm of 56 ... hcf is 8' must
# NOT bind lcm=8)
_ASSERT_OF_RE = re.compile(
    r"\b(hcf|lcm|gcd|product|sum|mean|average|difference|ratio|"
    r"speed|velocity|rate|area|perimeter|volume|total|amount|cost)\b"
    r"\s+of\s+[\d ,]+?(?:\s+and\s+[\d ,]+?)?\s+"
    r"(?:is|was|equals?)\s*(-?\d+(?:\.\d+)?)\b",
    re.IGNORECASE)

_NAME_ALIAS = {
    "hcf": ("hcf", "gcd"), "lcm": ("lcm",), "gcd": ("hcf", "gcd"),
    "speed": ("speed", "velocity", "v"), "velocity": ("speed", "velocity", "v"),
    "distance": ("distance", "d", "length"), "time": ("time", "t"),
    "rate": ("rate", "r", "interest_rate"), "interest": ("interest", "i"),
    "principal": ("principal", "p", "sum"), "amount": ("amount", "a", "total"),
    "area": ("area", "a"), "perimeter": ("perimeter", "p"),
    "radius": ("radius", "r"), "diameter": ("diameter", "d"),
    "height": ("height", "h"), "width": ("width", "w", "breadth"),
    "length": ("length", "l"), "breadth": ("breadth", "b", "width"),
    "volume": ("volume", "v"), "mass": ("mass", "m"),
    "angle": ("angle", "angle1"), "cost": ("cost", "cp", "price"),
    "selling price": ("sp", "selling_price"), "cost price": ("cp", "cost_price"),
    "profit": ("profit",), "loss": ("loss",), "discount": ("discount",),
    "percentage": ("rate", "r", "percent"), "mean": ("mean", "average"),
    "average": ("mean", "average"), "sum": ("sum", "total", "s"),
    "product": ("product", "p"), "difference": ("difference", "diff"),
    "ratio": ("ratio",), "marks": ("marks", "score"), "score": ("score", "marks"),
}


# domain phrase -> variable binds ('first term 9' -> a=9,
# '8th term' -> n=8, 'common difference 5' -> d=5)
_PHRASE_BINDS = (
    (r"\bfirst term\s*(?:of|is|=|was)?\s*(-?\d+(?:\.\d+)?)", "a"),
    (r"\binitial (?:value|amount|term)\s*(?:of|is|=|was)?\s*"
     r"(-?\d+(?:\.\d+)?)", "a"),
    (r"\bcommon difference\s*(?:of|is|=|was)?\s*(-?\d+(?:\.\d+)?)", "d"),
    (r"\bcommon ratio\s*(?:of|is|=|was)?\s*(-?\d+(?:\.\d+)?)", "r"),
    (r"\b(\d+)(?:st|nd|rd|th)\s+term\b", "n"),
    (r"\b(\d+)(?:st|nd|rd|th)\s+number\b", "n"),
    (r"\blast term\s*(?:of|is|=|was)?\s*(-?\d+(?:\.\d+)?)", "l"),
    (r"\bprincipal\s*(?:of|is|=|was)?\s*(-?\d+(?:\.\d+)?)", "p"),
    (r"\brate(?: of interest)?\s*(?:of|is|=|was)?\s*(-?\d+(?:\.\d+)?)",
     "r"),
    (r"\bradius\s*(?:of|is|=|was)?\s*(-?\d+(?:\.\d+)?)", "r"),
    (r"\bdiameter\s*(?:of|is|=|was)?\s*(-?\d+(?:\.\d+)?)", "d"),
    (r"\bheight\s*(?:of|is|=|was)?\s*(-?\d+(?:\.\d+)?)", "h"),
    (r"\bbase\s*(?:of|is|=|was)?\s*(-?\d+(?:\.\d+)?)", "b"),
    (r"\blength\s*(?:of|is|=|was)?\s*(-?\d+(?:\.\d+)?)", "l"),
    (r"\bbreadth|width\s*(?:of|is|=|was)?\s*(-?\d+(?:\.\d+)?)", "b"),
)


def assertion_bindings(text: str, concept: dict
                       ) -> Tuple[Dict[str, float], List[str]]:
    """'HCF is 8' -> {hcf: 8}.  Returns (slots, ordered_unbound_nums).
    Unbound numbers are the question's remaining values in order —
    candidates for the formula's unfilled variables."""
    norm = normalize_input(text).lower()
    # '(Rule: holes = (8^steps - 1)/7)' / '(use the rule ...)' are
    # HINTS — their literals must never enter the number pool
    norm = re.sub(r"\((?:use|rule|hint|formula)[^)]*\)", " ", norm)
    cvars = concept_variables(concept)
    # bare Q&A concepts have no formula vars — bind canonical names
    # anyway so question-stated relations ('hcf x lcm = a x b') can
    # still consume them
    cvar_set = set(cvars) if cvars else {
        n for names in _NAME_ALIAS.values() for n in names}
    cvar_set |= set(_NAME_ALIAS)
    # LHS outputs of the concept's formula set are never inputs —
    # 'sum' binding 'sn' makes the solver parrot a question number
    # as the answer
    _out = set()
    for _p in re.split(r"[;\n]",
                       str(concept.get("formula") or "")):
        if "=" in _p:
            _l = _p.split("=", 1)[0].strip().lower()
            if re.fullmatch(r"[a-z_][a-z_0-9]*", _l):
                _out.add(_l)
    slots: Dict[str, float] = {}
    bound_vals = set()

    # 'pi = 22/7' (from '(take pi = 22/7)') — binds the constant
    pm_pi = re.search(r"\bpi\s*=\s*(\d+)\s*/\s*(\d+)", norm)
    if pm_pi:
        slots["pi"] = float(pm_pi.group(1)) / float(pm_pi.group(2))
        bound_vals.update((pm_pi.group(1), pm_pi.group(2)))

    # coordinate tuples: '(3, 5) and (15, 21)' -> x1,y1,x2,y2 ;
    # 'from the origin' adds the (0, 0) point implicitly
    pts = re.findall(r"\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)"
                     r"\s*\)", norm)
    if pts:
        names = [("x1", "y1"), ("x2", "y2"), ("x3", "y3")]
        for i, (xs, ys) in enumerate(pts[:3]):
            xn, yn = names[i]
            if xn in cvar_set or not slots.get(xn):
                slots[xn] = float(xs)
            if yn in cvar_set or not slots.get(yn):
                slots[yn] = float(ys)
            bound_vals.update((xs, ys))
        if len(pts) == 1 and re.search(r"\borigin\b", norm):
            slots.setdefault("x2", 0.0)
            slots.setdefault("y2", 0.0)
    # 'ratio 10 : 90' / '5 : 6 = 15 : ?' / '1 : 2 : 3' -> a,b,(c),d
    for rm in re.finditer(r"(-?\d+(?:\.\d+)?)\s*:\s*(-?\d+(?:\.\d+)?)"
                          r"(?:\s*:\s*(-?\d+(?:\.\d+)?))?", norm):
        vals = [v for v in rm.groups() if v is not None]
        for i, v in enumerate(vals):
            vn = "abcd"[i] if i < 4 else None
            if vn and vn in cvar_set and vn not in slots:
                slots[vn] = float(v)
                bound_vals.add(v)

    # dimension pairs '7 m x 12 m' / '8 cm by 25 cm' — first pair is
    # (l, w), a second pair is an inner/other rect (a, b)
    dims = re.findall(r"(-?\d+(?:\.\d+)?)\s*(?:m|cm|km|mm|ft|inch)?"
                      r"\s*[x×]\s*(-?\d+(?:\.\d+)?)\s*"
                      r"(?:m|cm|km|mm|ft|inch)?\b", norm)
    if dims:
        for i, (xs, ys) in enumerate(dims[:2]):
            xn, yn = (("l", "w"), ("a", "b"))[i]
            if xn in cvar_set or xn not in slots:
                slots.setdefault(xn, float(xs))
            if yn in cvar_set or yn not in slots:
                slots.setdefault(yn, float(ys))
            bound_vals.update((xs, ys))

    # bare 'points 3,5 and 15,21' / 'joining 3 and 5' — tuple-less
    elif re.search(r"\bpoint|segment|joining|vertices|triangle\b",
                   norm):
        flat = re.findall(r"(-?\d+(?:\.\d+)?)", norm)
        xy = [("x1", "y1"), ("x2", "y2"), ("x3", "y3")]
        for i in range(min(3, len(flat) // 2)):
            xn, yn = xy[i]
            slots.setdefault(xn, float(flat[2 * i]))
            slots.setdefault(yn, float(flat[2 * i + 1]))

    # concept-declared param map: '"first term" -> a' — each concept
    # carries its own vocabulary, written at repair time.  Both orders:
    # 'first term 9' and '9 terms'
    for phrase, var in (concept.get("param_map") or {}).items():
        if var in slots:
            continue
        # phrases ending in 'of' — 'cube of 3' — keep 'of' as the
        # connector: drop it from the phrase core so the of-variant
        # below supplies it once
        raw = phrase.lower().rstrip()
        of_tail = raw.endswith(" of")
        if of_tail:
            raw = raw[:-3].rstrip()
        # plural-tolerant per word: 'pair is' matches 'pairs is'
        ph = r"\s+".join(
            w + "s?" if not w.endswith("s") else w
            for w in re.escape(raw).split(r"\ "))
        # phrase ... (words) ... is/are/= N  — 'a co-interior angle
        # on one side is 37' binds a=37.  'of' excluded here: 'rows
        # of 1, 2, 3' must not bind n=1.
        m = re.search(ph + r"[^,\d.;!?]{0,40}?(?:is|are|=|was)\s*"
                      r"(-?\d+(?:\.\d+)?)", norm)
        if m is None and of_tail:
            # 'cube of 3' — the phrase's own 'of' is the connector
            m = re.search(ph + r"\s*of\s*(-?\d+(?:\.\d+)?)\b"
                          r"(?!\s*(?:and|,))", norm)
        if m is None:
            # 'lcm of 84 and 60' — 'of' introduces an operand list,
            # not a value: require no 'and'/',' right after the number
            m = re.search(ph + r"\s*(?:is|=|was|at|for)\s*"
                          r"(-?\d+(?:\.\d+)?)", norm)
        if m is None:
            m = re.search(ph + r"\s*of\s*(-?\d+(?:\.\d+)?)\b"
                          r"(?!\s*(?:and|,))", norm)
        if m is None:
            m = re.search(r"(-?\d+(?:\.\d+)?)\s*" + ph, norm)
        if m is None:
            # '33 m long' — number, unit, then the param word
            m = re.search(r"(-?\d+(?:\.\d+)?)\s*"
                          r"(?:m|cm|km|mm|kg|g|l|ml|hrs?|min|s|"
                          r"degrees?|cm2|m2)?\s+" + ph + r"\b", norm)
        if m:
            slots[var] = float(m.group(1))
            bound_vals.add(m.group(1))

    # role lexicon: free paraphrases of a variable's ROLE bind it —
    # 'begins at 5'->a, 'climbs by 6'->d.  Small curated set, not a
    # phrase list; matched only when the var exists in the concept.
    _ROLES = {
        "a": (r"(?:first|initial|opening|starting|base)\s+"
              r"(?:term|value|amount|number|deposit|balance|price|"
              r"row|entry)|begins? at|starts? (?:at|with|from)|"
              r"principal|deposit"),
        "d": (r"climbs? by|increas\w+ by|ris\w+ by|goes up by|"
              r"steps? of|difference|common difference|"
              r"increment|jumps? by|gap"),
        "r": (r"radius|radii|multiplied by|times as|"
              r"ratio|growth factor|common ratio"),
        "n": (r"(\d+)(?:st|nd|rd|th)\s*(?:term|position|step|"
              r"iteration|round|day|year|row|floor)|"
              r"first\s+(\d+)\s*(?:terms|numbers|items)|"
              r"number of (?:terms|items|people|days|years)"),
        "rate": (r"per (?:hour|minute|second|day|year|unit|"
                 r"square|metre|meter|centimetre)|rate of|"
                 r"speed of|costs? rs?\.?\s*\d+ per"),
        "l": (r"last term|final term|ending|final amount"),
        "h": (r"height|depth|tall"),
        "theta": (r"angle of|subtends|central angle|measures? "
                  r"\d+\s*deg"),
    }
    for var, pat in _ROLES.items():
        if var in slots or var not in cvar_set:
            continue
        if var == "n":
            # ordinal directly carries the number: '12th term' -> 12;
            # 'sum the first 20 terms' -> n=20
            m = re.search(r"(\d+)(?:st|nd|rd|th)\s*(?:term|position|"
                          r"step|iteration|round|day|year|row|floor)",
                          norm)
            if m is None:
                m = re.search(r"first\s+(\d+)\s*(?:terms|numbers|"
                              r"items)", norm)
        else:
            grp = r"(?:" + pat + r")"
            m = re.search(grp + r"[^,\d.;!?]{0,12}?(-?\d+(?:\.\d+)?)",
                          norm)
            if m is None:
                m = re.search(r"(-?\d+(?:\.\d+)?)[^,\d.;!?]{0,12}?" +
                              grp, norm)
        if m:
            slots[var] = float(m.group(1))
            bound_vals.add(m.group(1))

    # sequence literals: 'AP 6, 10, 14, ...' / 'terms 20 and 22' —
    # first number -> a, consecutive gap -> d (or ratio -> r for GP)
    seq = re.search(r"\b(?:ap|gp|sequence|series|terms?|progression)\b"
                    r"[^,\d]{0,25}?(-?\d+(?:\.\d+)?)"
                    r"\s*(?:,|\s+and\s+)\s*(-?\d+(?:\.\d+)?)"
                    r"\s*(?:,\s*|\s+and\s+)?(-?\d+(?:\.\d+)?)?",
                    norm, re.IGNORECASE)
    if seq and seq.group(2):
        v1, v2 = float(seq.group(1)), float(seq.group(2))
        if "a" not in slots:
            slots["a"] = v1
            bound_vals.add(seq.group(1))
        diff = v2 - v1
        if "d" not in slots and abs(diff) > 0:
            slots["d"] = diff
            bound_vals.add(seq.group(2))
        if seq.group(3) is not None:
            v3 = float(seq.group(3))
            bound_vals.add(seq.group(3))  # consume it regardless —
            # a shown sequence element is never a stray fill number
            if "d" in slots and abs((v3 - v2) - diff) > 1e-9 \
                    and "r" not in slots and v1 != 0:
                slots["r"] = v2 / v1
        # 'up to and including N' / 'last term N' -> l
        lm = re.search(r"(?:up to|ending at|last term)\s*"
                       r"(?:and including\s*)?(-?\d+(?:\.\d+)?)", norm)
        if lm and "l" not in slots:
            slots["l"] = float(lm.group(1))
            bound_vals.add(lm.group(1))

    for name, val in _ASSERT_RE.findall(norm):
        n = name.strip().lower()
        for art in _ARTICLES:
            if n.startswith(art + " "):
                n = n[len(art) + 1:]
        if n in _ARTICLES:
            continue
        v = float(val)
        cands = [n] + list(_NAME_ALIAS.get(n, ()))
        hit = next((c for c in cands if c in cvar_set), None)
        if hit is not None and hit not in slots:
            slots[hit] = v
            bound_vals.add(val)

    # domain phrase binds ('first term 9' -> a, '8th term' -> n)
    for pat, var in _PHRASE_BINDS:
        m = re.search(pat, norm, re.IGNORECASE)
        if m and var not in slots:
            v = float(m.group(1))
            slots[var] = v
            bound_vals.add(m.group(1))

    # derived binds: diameter -> radius = d/2 when the concept
    # speaks in radii; 'diagonal of square' -> side via s*sqrt2, etc.
    if "r" in cvar_set or "radius" in cvar_set:
        dm = re.search(r"\bdiameter\s*(?:of|is|=|was)?\s*"
                       r"(-?\d+(?:\.\d+)?)", norm, re.IGNORECASE)
        if dm:
            dv = float(dm.group(1))
            for rv in ("r", "radius"):
                if rv in cvar_set and rv not in slots:
                    slots[rv] = dv / 2.0
                    bound_vals.add(dm.group(1))
                    break

    # ordinals: 'the 9th hexagonal number', '8th term' — the word
    # after the ordinal resolves through the concept's own maps
    for mm in re.finditer(r"(\d+)(?:st|nd|rd|th)\s+([a-z]+)", norm):
        val, word = float(mm.group(1)), mm.group(2)
        tgt = None
        for mp in (concept.get("param_map") or {},
                   concept.get("ask_map") or {}):
            for ph, var in mp.items():
                pw = ph.lower().split()
                if word in pw or word == pw[0] or \
                        word + "s" in pw or word.rstrip("s") in pw:
                    tgt = var
                    break
            if tgt:
                break
        if tgt is None and word in ("term", "number", "item",
                                    "position", "member"):
            tgt = "n"
        if tgt and tgt not in slots:
            slots[tgt] = val
            bound_vals.add(mm.group(1))

    # sequence index notation: 'T_4', 'term 5' -> n
    tm = re.search(r"\bt_?(\d+)\b", norm)
    if tm and "n" not in slots:
        slots["n"] = float(tm.group(1))
        bound_vals.add(tm.group(1))

    # 'are 68 and 100' / 'of 56 and 16' — two-value assertions fill
    # the concept's first two input vars in order (a, b convention)
    if "a" in cvar_set and "b" in cvar_set:
        d2 = re.search(r"(?:are|is|of)\s*(-?\d+(?:\.\d+)?)\s*(?:and|,)\s*"
                       r"(-?\d+(?:\.\d+)?)", norm)
        if d2:
            slots.setdefault("a", float(d2.group(1)))
            slots.setdefault("b", float(d2.group(2)))
            bound_vals.update((d2.group(1), d2.group(2)))

    # 'the LCM of 56 and 16 is 112' — operand-list assertions
    for name, val in _ASSERT_OF_RE.findall(norm):
        n = name.strip().lower()
        v = float(val)
        cands = [n] + list(_NAME_ALIAS.get(n, ()))
        hit = next((c for c in cands if c in cvar_set), None)
        if hit is not None and hit not in slots:
            slots[hit] = v
            bound_vals.add(val)
    # remaining numbers (not consumed by assertions), in order
    rest = []
    for m in _NUM_RE.finditer(norm):
        if m.group(0) in bound_vals:
            bound_vals.discard(m.group(0))
            continue
        rest.append(float(m.group(0)))
    return slots, rest


# ------------------------------------------------------------------ #
# Semantic binding — MiniLM embeddings map a question's noun-phrases
# to the concept's variable glosses.  Runs fully local; no API.
# ------------------------------------------------------------------ #

_MODEL = None


def _encoder():
    global _MODEL
    if _MODEL is None:
        from sentence_transformers import SentenceTransformer
        _MODEL = SentenceTransformer("all-MiniLM-L6-v2")
    return _MODEL


def _num_phrases(norm: str) -> List[Tuple[str, float]]:
    """(phrase, value) pairs — the ~4 words preceding each number."""
    out = []
    for m in _NUM_RE.finditer(norm):
        head = norm[max(0, m.start() - 40):m.start()]
        words = re.findall(r"[a-z]+", head.lower())[-4:]
        if words:
            out.append((" ".join(words), float(m.group(0))))
    return out


def semantic_bind(text: str, concept: dict,
                  thresh: float = 0.42
                  ) -> Dict[str, float]:
    """Bind question numbers to formula variables by MEANING:
    each number's preceding phrase is embedded and matched to the
    concept's var glosses (written at repair time)."""
    gloss = concept.get("var_gloss") or {}
    # param_map phrases double as glosses
    for ph, var in (concept.get("param_map") or {}).items():
        gloss.setdefault(var, ph)
    if not gloss:
        return {}
    # outputs (formula LHS names) are never inputs — 'sum the first
    # 20 terms' must not bind sn=20 just because it reads like the
    # 'sum of n terms' gloss
    for _p in re.split(r"[;\n]", str(concept.get("formula") or "")):
        if "=" in _p:
            _l = _p.split("=", 1)[0].strip().lower()
            if re.fullmatch(r"[a-z_][a-z_0-9]*", _l):
                gloss.pop(_l, None)
    if not gloss:
        return {}
    pairs = _num_phrases(normalize_input(text))
    if not pairs:
        return {}
    try:
        enc = _encoder()
        import numpy as np
        gvars = list(gloss)
        gemb = enc.encode([gloss[v] for v in gvars])
        pemb = enc.encode([p for p, _ in pairs])
        sims = pemb @ gemb.T
        slots: Dict[str, float] = {}
        for i, (_, val) in enumerate(pairs):
            j = int(np.argmax(sims[i]))
            if sims[i][j] >= thresh and gvars[j] not in slots:
                slots[gvars[j]] = val
        return slots
    except Exception:
        return {}


def semantic_target(text: str, concept: dict) -> Optional[str]:
    """Embed the question's ask clause ('find the X') against the
    concept's ask_map phrases — returns the target variable."""
    asks = concept.get("ask_map") or {}
    if not asks:
        return None
    m = re.search(r"(?:find|calculate|determine|compute|evaluate|"
                  r"what is|how much|how many)\b([^.?!]*)",
                  text.lower())
    clause = m.group(1).strip() if m else text.lower()
    try:
        enc = _encoder()
        import numpy as np
        keys = list(asks)
        sims = (enc.encode([clause]) @
                enc.encode(keys).T)[0]
        j = int(np.argmax(sims))
        return asks[keys[j]] if sims[j] >= 0.35 else None
    except Exception:
        return None


def asked_variables(text: str) -> List[str]:
    """Variable names the question asks for (from question phrasing)."""
    low = " " + normalize_input(text).lower() + " "
    hits: List[str] = []
    for word, names in _TARGET_WORDS.items():
        if re.search(r"(?<![A-Za-z])" + re.escape(word) +
                     r"(?![A-Za-z])", low):
            hits.extend(names)
    # dedupe preserve order
    seen, out = set(), []
    for h in hits:
        if h not in seen:
            seen.add(h)
            out.append(h)
    return out
