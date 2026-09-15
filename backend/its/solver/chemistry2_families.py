"""chemistry2_families.py -- advanced chemistry families, classes 11-12 CBSE.

Batch-2 chemistry: 15 typed formula families following the
syllabus_families.py contract -- trigger regex with named (typed) slots,
compute function with plausibility gates, human-readable steps, and a
single dispatcher (first grounded hit wins).  Deterministic only: regex
extraction + closed-form computation, zero LLM calls.

Coverage:
  stoichiometry  limiting reagent + product moles (1:1:1 assumed)
  equilibrium    Kc from equilibrium concentrations + balanced equation
                 (coefficients become exponents)
  ionic          pH from [H+] (scientific notation aware), strong-acid
                 pH, Henderson-Hasselbalch buffer pH
  thermo         Q = n x dH, Hess's law algebraic sum
  electrochem    EMF = E(cathode) - E(anode), Nernst equation at 298 K
  kinetics       first-order k = 0.693 / t(1/2)
  solutions      mole fraction, molality, ppm (mg per litre)
  composition    percent composition, empirical formula

Numeric slots accept plain decimals AND the scientific-notation forms
students actually type: 0.01, 10^-2, 1 x 10^-3, 2 x 10-4, 3.0e-2.
"""

from __future__ import annotations

import math
import re
from typing import Any, Dict, List, Optional

from backend.its.solver.modeling_layer import ModelResult

_NUM = r"\d+(?:\.\d+)?"

# scientific-notation-aware numeric alternatives (order matters: the
# longer pair form must be tried before the bare mantissa)
_SCI_ALT = (
    _NUM + r"\s*(?:x|\*|×)\s*10\s*(?:\^|\*\*)?\s*\(?\s*[+-]?" + _NUM
    + r"\s*\)?"
    + r"|" + _NUM + r"\s*[eE]\s*[+-]?" + _NUM
    + r"|10(?!\d)\s*(?:\^|\*\*)?\s*\(?\s*[+-]?" + _NUM + r"\s*\)?"
    + r"|" + _NUM
)
_SCI_ANY = r"-?(?:" + _SCI_ALT + r")"


def _scig(name: str) -> str:
    """Named slot that accepts 0.01, 10^-2, 1 x 10^-3, 2 x 10-4, 3.0e-2."""
    return r"(?P<" + name + r">-?(?:" + _SCI_ALT + r"))"


def _sci(s: str) -> float:
    """Parse any accepted numeric form into a float."""
    t = str(s).strip().replace(",", "").replace("×", "x")
    m = re.match(r"^(-?" + _NUM + r")\s*(?:x|\*)\s*10\s*(?:\^|\*\*)?\s*"
                 r"\(?\s*([+-]?" + _NUM + r")\s*\)?$", t, re.I)
    if m:
        return float(m.group(1)) * 10.0 ** float(m.group(2))
    m = re.match(r"^(-?" + _NUM + r")\s*[eE]\s*([+-]?" + _NUM + r")$", t)
    if m:
        return float(m.group(1)) * 10.0 ** float(m.group(2))
    m = re.match(r"^10(?!\d)\s*(?:\^|\*\*)?\s*\(?\s*([+-]?" + _NUM
                 + r")\s*\)?$", t, re.I)
    if m:
        return 10.0 ** float(m.group(1))
    return float(t)


def _no(structure: str, note: str) -> ModelResult:
    return ModelResult(structure=structure, matched=False, confidence=0.0,
                       quantities={}, governing_equation="", note=note)


def _res(structure: str, g: Dict[str, Any], value: Optional[float],
         steps: List[str], assumptions: Optional[List[str]] = None,
         conf: float = 0.95, answer: Optional[str] = None,
         q_extra: Optional[Dict[str, float]] = None) -> ModelResult:
    quantities = {k: _numify(v) for k, v in g.items()}
    if q_extra:
        quantities.update(q_extra)
    return ModelResult(
        structure=structure, matched=True, confidence=conf,
        quantities=quantities, governing_equation=structure,
        final_answer=answer or (f"{value:.6g}" if value is not None else ""),
        numeric_answer=value, steps=steps,
        note="; ".join(assumptions) if assumptions else "")


def _numify(v: Any) -> float:
    """Coerce a raw slot value (may be '2 x 10-4' or a species name)."""
    if isinstance(v, bool):
        return 0.0
    if isinstance(v, (int, float)):
        return float(v)
    try:
        return _sci(v)
    except Exception:
        return 0.0


def _pos(*vals: float) -> bool:
    return all(v > 0 for v in vals)


def _ph_ok(ph: float) -> bool:
    return -1e-9 <= ph <= 14 + 1e-9


_CONC_ITEM = re.compile(r"\[\s*([A-Za-z][\w+\-]*)\s*\]\s*=\s*("
                        + _SCI_ANY + r")")


def _conc_list(text: str):
    return [(cm.group(1), _sci(cm.group(2))) for cm in _CONC_ITEM.finditer(text)]


def _parse_reaction(rxn: str):
    """'2A + B <=> 3C' -> ({A:2, B:1}, {C:3}); None if unparseable."""
    s = rxn.replace("⇌", "<=>").replace("⇋", "<=>").strip()
    parts = re.split(r"\s*(?:<=>|<->|-->|->|=)\s*", s)
    if len(parts) != 2:
        return None

    def side(sp: str) -> Dict[str, float]:
        out: Dict[str, float] = {}
        for sm in re.finditer(r"(\d+(?:\.\d+)?)?\s*\*?\s*([A-Za-z][A-Za-z0-9]*)",
                              sp):
            coef = float(sm.group(1)) if sm.group(1) else 1.0
            out[sm.group(2)] = out.get(sm.group(2), 0.0) + coef
        return out

    left, right = side(parts[0]), side(parts[1])
    if not left or not right:
        return None
    return left, right


_ATOMIC_MASS = {
    "H": 1.008, "C": 12.011, "N": 14.007, "O": 15.999, "S": 32.06,
    "P": 30.974, "Na": 22.990, "K": 39.098, "Ca": 40.078, "Mg": 24.305,
    "Al": 26.982, "Cl": 35.45, "Br": 79.904, "Fe": 55.845, "Cu": 63.546,
    "Zn": 65.38, "Ag": 107.868, "I": 126.904, "Mn": 54.938, "Ba": 137.327,
    "Pb": 207.2, "Sn": 118.71, "Cr": 51.996, "Ni": 58.693,
}

_ACID_H = {"hclo4": 1, "h2so4": 2, "hno3": 1, "hcl": 1, "hbr": 1, "hi": 1}


# --------------------------------------------------------------------------- #
# Compute functions: (g, m, text) ->
#   (value | None, steps, answer_override | None, assumptions | None
#    [, quantities_override])
# --------------------------------------------------------------------------- #


def _c_limiting(g, m, text):
    m1, m2 = _sci(g["g1"]), _sci(g["g2"])
    mm1, mm2 = _sci(g["mm1"]), _sci(g["mm2"])
    if not _pos(m1, m2, mm1, mm2):
        return None, [], None, None
    a, b = g["a"].strip(), g["b"].strip()
    n1 = (g.get("n1") or "").strip().lower()
    mma, mmb = mm1, mm2
    if n1 and n1 == b.lower():
        mma, mmb = mm2, mm1  # molar masses listed in swapped order
    na, nb = m1 / mma, m2 / mmb
    if na <= nb:
        lim, other, nlim = a, b, na
    else:
        lim, other, nlim = b, a, nb
    steps = [
        f"n({a}) = mass/molar mass = {m1:g}/{mma:g} = {na:.6g} mol",
        f"n({b}) = mass/molar mass = {m2:g}/{mmb:g} = {nb:.6g} mol",
        f"{lim} yields fewer moles -> limiting reagent = {lim} "
        f"({other} is in excess)",
        f"moles of product (1:1:1 assumed) = n(limited) = {nlim:.6g} mol",
    ]
    ans = f"limiting reagent = {lim}; moles of product = {nlim:.6g} mol"
    return nlim, steps, ans, ["stoichiometry assumed 1:1:1 (A + B -> P)"]


def _c_kc(g, m, text):
    conc = _conc_list(text)
    if len(conc) < 2 or any(v <= 0 for _, v in conc):
        return None, [], None, None
    rm = re.search(r"(?:reaction|equation)\s*(?:is\s*)?[:=]?\s*"
                   r"([A-Za-z0-9\s+\-<>=⇌()*]{2,80}?)\s*(?:\.|$|,|;)",
                   text, re.I)
    if not rm:
        return None, [], None, None
    sides = _parse_reaction(rm.group(1))
    if not sides:
        return None, [], None, None
    left, right = sides
    low = {k.lower(): v for k, v in conc}

    def side_prod(side: Dict[str, float]):
        prod, terms = 1.0, []
        for sp, coef in side.items():
            v = low.get(sp.lower())
            if v is None:
                raise KeyError(sp)
            prod *= v ** coef
            terms.append(f"[{sp}]" + (f"^{coef:g}" if coef != 1 else ""))
        return prod, terms

    try:
        num, num_t = side_prod(right)
        den, den_t = side_prod(left)
    except KeyError:
        return None, [], None, None
    kc = num / den
    steps = [
        "Kc = products / reactants, each concentration raised to its "
        "stoichiometric coefficient",
        f"Kc = ({' x '.join(num_t)}) / ({' x '.join(den_t)})",
        f"Kc = {kc:.6g}",
    ]
    return kc, steps, None, None


def _c_ph_calc(g, m, text):
    h = _sci(g["h"])
    if h <= 0:
        return None, [], None, None
    ph = -math.log10(h)
    if not _ph_ok(ph):
        return None, [], None, None
    steps = [f"pH = -log10[H+] = -log10({g['h'].strip()} = {h:.6g}) = "
             f"{ph:.6g}"]
    return ph, steps, None, None


def _c_ph_acid(g, m, text):
    c = _sci(g["c"])
    acid = g["acid"].strip()
    n = _ACID_H.get(acid.lower())
    if not _pos(c) or n is None:
        return None, [], None, None
    h = n * c
    ph = -math.log10(h)
    if not _ph_ok(ph):
        return None, [], None, None
    basic = "diprotic" if n == 2 else "monoprotic"
    steps = [
        f"{acid} is {basic}: [H+] = {n} x {c:g} = {h:.6g} M",
        f"pH = -log10({h:.6g}) = {ph:.6g}",
    ]
    return ph, steps, None, None


def _c_buffer(g, m, text):
    pka = _sci(g["pka"])
    am = re.search(r"acid[^.]{0,30}?=\s*(" + _SCI_ANY + r")", text, re.I)
    sm = re.search(r"salt[^.]{0,30}?=\s*(" + _SCI_ANY + r")", text, re.I)
    if not (am and sm) or not _pos(pka) or pka > 14:
        return None, [], None, None
    ca, cs = _sci(am.group(1)), _sci(sm.group(1))
    if not _pos(ca, cs):
        return None, [], None, None
    ph = pka + math.log10(cs / ca)
    if not _ph_ok(ph):
        return None, [], None, None
    steps = [
        "Henderson-Hasselbalch: pH = pKa + log10([salt]/[acid])",
        f"pH = {pka:g} + log10({cs:g}/{ca:g}) = {pka:g} + "
        f"{math.log10(cs / ca):.6g} = {ph:.6g}",
    ]
    return ph, steps, None, None


_HES_VAL = re.compile(
    r"(?:Δ\s*H|delta\s*H|(?<![A-Za-z])d\s*H)\s*\d*\s*(?:is|was|=|:)?\s*("
    + _SCI_ANY + r")\s*kJ", re.I)


def _c_hess(g, m, text):
    vals = [_sci(vm.group(1)) for vm in _HES_VAL.finditer(text)]
    if len(vals) < 2:
        return None, [], None, None
    total = sum(vals)
    steps = ["Hess's law: dH(target) = algebraic sum of the given steps"]
    for i, v in enumerate(vals, 1):
        steps.append(f"step {i}: dH{i} = {v:g} kJ")
    steps.append(f"dH(target) = {' + '.join(f'({v:g})' for v in vals)}"
                 f" = {total:.6g} kJ")
    return total, steps, None, ["steps taken with the signs as written; "
                                "reverse a step by negating its dH"]


def _c_thermo(g, m, text):
    n, dh = _sci(g["n"]), _sci(g["dh"])
    if not _pos(n):
        return None, [], None, None
    q = n * dh
    if q < 0:
        ans = f"Q = {q:.6g} kJ (heat released = {-q:.6g} kJ)"
        direction = f"negative Q -> exothermic; heat released = {-q:.6g} kJ"
    elif q > 0:
        ans = f"Q = +{q:.6g} kJ (heat absorbed)"
        direction = "positive Q -> endothermic"
    else:
        ans = "Q = 0 kJ"
        direction = "Q is zero"
    steps = [
        f"Q = n x dH = {n:g} mol x ({dh:g} kJ/mol) = {q:.6g} kJ",
        direction,
    ]
    return q, steps, ans, None


def _c_nernst(g, m, text):
    e0m = re.search(r"\bE\s*[°o0]?\s*(?:cell)?\s*(?:is|=|:)\s*("
                    + _SCI_ANY + r")", text, re.I)
    nm = re.search(r"\bn\s*(?:is|=|:)\s*(\d+)", text, re.I) or \
        re.search(r"(\d+)\s+electrons?\s+(?:are\s+)?transfer\w+", text, re.I)
    q, q_note = None, ""
    qm = re.search(r"\bQ\s*(?:is|=|:)\s*(" + _SCI_ANY + r")", text)
    if qm:
        q = _sci(qm.group(1))
    else:
        conc = _conc_list(text)
        if len(conc) == 2:
            q = conc[0][1] / conc[1][1]
            q_note = (f"Q estimated as first concentration over second: "
                      f"{q:.6g} (oxidised/reduced)")
    if not (e0m and nm and q is not None):
        return None, [], None, None
    e0, n = _sci(e0m.group(1)), float(nm.group(1))
    if not _pos(q) or not _pos(n) or n > 12:
        return None, [], None, None
    e = e0 - (0.0591 / n) * math.log10(q)
    if abs(e) > 6:
        return None, [], None, None
    steps = [
        "Nernst equation (298 K): E = E° - (0.0591/n) log10 Q",
        f"Q = {q:.6g}" + (f" ({q_note})" if q_note else ""),
        f"E = {e0:g} - (0.0591/{n:g}) x log10({q:.6g}) = {e0:g} - "
        f"{(0.0591 / n) * math.log10(q):.6g} = {e:.6g} V",
    ]
    return e, steps, None, ["0.0591 V form of 2.303RT/F at 298 K"]


def _c_emf(g, m, text):
    if re.search(r"nernst", text, re.I):
        return None, [], None, None
    ec = re.search(r"(?:E\s*[°o0]?\s*cathod\w*|cathod\w*[^,;.]{0,20}?\bE\s*"
                   r"[°o0]?)\s*(?:is|=|:)?\s*(" + _SCI_ANY + r")", text, re.I)
    ea = re.search(r"(?:E\s*[°o0]?\s*anod\w*|anod\w*[^,;.]{0,20}?\bE\s*"
                   r"[°o0]?)\s*(?:is|=|:)?\s*(" + _SCI_ANY + r")", text, re.I)
    if not (ec and ea):
        return None, [], None, None
    vc, va = _sci(ec.group(1)), _sci(ea.group(1))
    emf = vc - va
    if abs(emf) > 6:
        return None, [], None, None
    steps = [
        "EMF = E(cathode) - E(anode)",
        f"EMF = {vc:g} - ({va:g}) = {emf:.6g} V",
    ]
    return emf, steps, None, None


_T12 = r"(?:t\s*(?:1\s*/\s*2|½)|t1/2)"
_UNIT = r"(minutes?|mins?|seconds?|secs?|s\b|hours?|hrs?|h\b)"


def _c_kinetics(g, m, text):
    hm = re.search(r"(?:half[\s-]*life|" + _T12 + r")\s*(?:" + _T12
                   + r"\s*)?(?:is|=|of|:)?\s*(" + _SCI_ANY + r")\s*" + _UNIT,
                   text, re.I)
    if not hm:  # reverse phrasing: 'half-life of a first order reaction is 20 min'
        hm = re.search(r"(?:half[\s-]*life|" + _T12 + r").{0,60}?("
                       + _SCI_ANY + r")\s*(minutes?|mins?|seconds?|secs?|"
                       r"hours?|hrs?)\b(?!\s*\^?\s*-\s*1)", text, re.I)
    if not hm:
        return None, [], None, None
    t = _sci(hm.group(1))
    if not _pos(t):
        return None, [], None, None
    u = hm.group(2).lower()
    usym = "min" if u.startswith("m") else ("h" if u.startswith("h") else "s")
    k = 0.693 / t
    steps = [
        "first-order half-life: t(1/2) = 0.693/k",
        f"k = 0.693/t(1/2) = 0.693/{t:g} {usym} = {k:.6g} {usym}^-1",
    ]
    return k, steps, None, None


def _c_mole_fraction(g, m, text):
    na, nb = _sci(g["na"]), _sci(g["nb"])
    if not _pos(na, nb):
        return None, [], None, None
    a, b = g["a"].strip(), g["b"].strip()
    # ask-name guard: the question must name whose fraction it wants;
    # a name-blind promotion ships the WRONG component's share
    ask = re.search(r"mole\s+fraction\s+(?:of\s+)(?:the\s+)?"
                    r"([A-Za-z][A-Za-z0-9]*)", text, re.I)
    if not ask:
        return None, [], None, None
    name = ask.group(1).lower()
    if name == a.lower():
        x = na / (na + nb)
        head = a
        num = na
    elif name == b.lower():
        x = nb / (na + nb)
        head = b
        num = nb
    else:
        return None, [], None, None
    if not (0 < x < 1):
        return None, [], None, None
    steps = [
        f"x({head}) = n({head})/(n({a}) + n({b})) = {num:g}/"
        f"({na:g} + {nb:g}) = {x:.6g}",
    ]
    return x, steps, None, None


def _c_molality(g, m, text):
    ms, mm, w = _sci(g["m"]), _sci(g["mm"]), _sci(g["w"])
    if not _pos(ms, mm, w):
        return None, [], None, None
    w_kg = w / 1000.0 if g["wu"].lower().startswith("g") else w
    molal = (ms / mm) / w_kg
    if not _pos(molal) or molal > 100:
        return None, [], None, None
    steps = [
        f"moles of solute = {ms:g}/{mm:g} = {ms / mm:.6g} mol",
        f"solvent mass = {w:g} {'g' if w_kg != w else 'kg'} = {w_kg:g} kg",
        f"molality = {ms / mm:.6g} mol / {w_kg:g} kg = {molal:.6g} mol/kg",
    ]
    return molal, steps, None, None


def _c_ppm(g, m, text):
    mgm = re.search(r"(" + _SCI_ANY + r")\s*mg\b", text, re.I)
    lm = re.search(r"(?:in|of|into)\s*(" + _SCI_ANY + r")\s*"
                   r"(?:L\b|litres?\b|liters?\b)", text, re.I)
    if not (mgm and lm):
        return None, [], None, None
    mg, vol = _sci(mgm.group(1)), _sci(lm.group(1))
    if not _pos(mg, vol):
        return None, [], None, None
    ppm = mg / vol
    if ppm > 1e6:
        return None, [], None, None
    steps = [
        "ppm = mg of solute per litre of solution (dilute aqueous)",
        f"ppm = {mg:g} mg / {vol:g} L = {ppm:.6g} mg/L = {ppm:.6g} ppm",
    ]
    return ppm, steps, None, None


def _intify(ratios: List[float]) -> List[int]:
    """Round mole ratios to small whole numbers (x2, x3, ... if needed)."""
    for mult in (1, 2, 3, 4, 5, 6, 8):
        scaled = [r * mult for r in ratios]
        if all(abs(sv - round(sv)) < 0.12 for sv in scaled):
            return [int(round(sv)) for sv in scaled]
    return [int(round(r)) for r in ratios]


def _formula_order(elems: List[str]) -> List[str]:
    rest = sorted(e for e in elems if e not in ("C", "H"))
    order = [e for e in ("C", "H") if e in elems]
    return order + rest


def _c_empirical(g, m, text):
    items: Dict[str, float] = {}
    for em in re.finditer(r"([A-Z][a-z]?)\s*(?:=|:|is)?\s*(" + _SCI_ANY
                          + r")\s*%", text):
        el = em.group(1)
        if el in _ATOMIC_MASS and el not in items:
            items[el] = _sci(em.group(2))
    if len(items) < 2:  # '40% C, 6.7% H, 53.3% O' order
        items = {}
        for em in re.finditer(r"(" + _SCI_ANY + r")\s*%\s*(?:of\s+)?"
                              r"([A-Z][a-z]?)", text):
            el = em.group(2)
            if el in _ATOMIC_MASS and el not in items:
                items[el] = _sci(em.group(1))
    if len(items) < 2 or any(v <= 0 for v in items.values()):
        return None, [], None, None
    total = sum(items.values())
    if not (90 <= total <= 110):
        return None, [], None, None
    mols = {el: pct / _ATOMIC_MASS[el] for el, pct in items.items()}
    small = min(mols.values())
    ratios = {el: v / small for el, v in mols.items()}
    ints = _intify(list(ratios.values()))
    subs = dict(zip(list(ratios.keys()), ints))
    formula = "".join(el + (str(subs[el]) if subs[el] > 1 else "")
                      for el in _formula_order(list(items.keys())))
    steps = [
        "assume a 100 g sample: "
        + ", ".join(f"{el} = {p:g} g" for el, p in items.items()),
        "moles = mass / atomic mass: "
        + ", ".join(f"{el} = {p:g}/{_ATOMIC_MASS[el]:g} = {mols[el]:.6g}"
                    for el, p in items.items()),
        f"divide by the smallest ({small:.6g}): "
        + ", ".join(f"{el} = {ratios[el]:.6g}" for el in items),
        f"nearest whole-number ratio -> {formula}",
    ]
    ans = f"empirical formula = {formula}"
    q_extra = {f"pct_{el}": p for el, p in items.items()}
    q_extra.update({f"mol_{el}": mols[el] for el in items})
    return None, steps, ans, ["percentages taken as masses of a 100 g sample",
                              "ratio rounded to nearest whole number"], q_extra


def _c_percent(g, m, text):
    am = re.search(r"atomic\s+mass(?:\s+of\s+[A-Za-z][A-Za-z0-9]{0,10}?)?\s*"
                   r"(?:is|=|:)?\s*(" + _SCI_ANY + r")", text, re.I)
    mm = re.search(r"(?:molar|molecular)\s+mass(?:\s+of\s+(?:the\s+)?"
                   r"(?:compound|substance|salt))?\s*(?:is|=|:)?\s*("
                   + _SCI_ANY + r")", text, re.I)
    atm = re.search(r"(\d+)\s*atoms?\b", text, re.I)
    if not (am and mm):
        return None, [], None, None
    a_mass, mmass = _sci(am.group(1)), _sci(mm.group(1))
    n_at = float(atm.group(1)) if atm else 1.0
    if not _pos(a_mass, mmass) or n_at < 1:
        return None, [], None, None
    pct = n_at * a_mass / mmass * 100.0
    if not (0 < pct <= 100):
        return None, [], None, None
    steps = [
        f"mass contributed = n x atomic mass = {n_at:g} x {a_mass:g} = "
        f"{n_at * a_mass:.6g}",
        f"% = (mass contributed / molar mass) x 100 = "
        f"({n_at * a_mass:.6g}/{mmass:g}) x 100 = {pct:.6g}%",
    ]
    assum = None if atm else ["n atoms not stated; taken as 1"]
    return pct, steps, None, assum


# --------------------------------------------------------------------------- #
# The table: (id, regex, compute)
# --------------------------------------------------------------------------- #

TABLE = [
    # ---- stoichiometry ----
    ("limiting_reagent",
     _scig("g1") + r"\s*g(?:ram)?s?\s+of\s+"
     r"(?P<a>[A-Za-z][A-Za-z0-9]{0,15}?)\s+reacts?\s+with\s+"
     + _scig("g2") + r"\s*g(?:ram)?s?\s+of\s+"
     r"(?P<b>[A-Za-z][A-Za-z0-9]{0,15}?)\b"
     r".{0,140}?molar\s+mass(?:es)?\s+of\s+"
     r"(?P<n1>[A-Za-z][A-Za-z0-9]{0,15}?)\s+(?:is|=|:)\s*"
     + _scig("mm1") + r"(?:\s*g\s*(?:/|per)\s*mol)?\s*(?:and|,|;)\s*"
     r"(?:of\s+)?(?P<n2>[A-Za-z][A-Za-z0-9]{0,15}?)\s+(?:is|=|:)\s*"
     + _scig("mm2") + r"(?:\s*g\s*(?:/|per)\s*mol)?",
     _c_limiting),

    # ---- equilibrium ----
    ("equilibrium_kc",
     r"at\s+equilibrium\b.*\[\s*[A-Za-z][\w+\-]*\s*\]\s*=\s*" + _SCI_ANY,
     _c_kc),

    # ---- ionic equilibrium ----
    ("ph_calc",
     r"pH\b[^=]{0,60}?\[\s*(?:H\s*\+?|H3O\s*\+)\s*\]\s*=\s*" + _scig("h"),
     _c_ph_calc),
    ("ph_strong_acid",
     r"pH\b[^.]{0,80}?" + _scig("c")
     + r"\s*(?:M|mol\s*/?\s*L|mol\s*dm-3|molar)\s+"
     r"(?P<acid>HClO4|H2SO4|HNO3|HCl|HBr|HI)\b",
     _c_ph_acid),
    ("buffer_ph",
     r"buffer.{0,200}?p\s*[Kk]\s*a\s*(?:value)?\s*(?:is|=|of|:)?\s*"
     + _scig("pka"),
     _c_buffer),

    # ---- thermochemistry ----
    ("hess_law",
     r"hess(?:'s)?\s+law",
     _c_hess),
    ("thermochemistry",
     _scig("n") + r"\s*(?:moles?|mol)\b.{0,120}?"
     r"(?:Δ\s*H|delta\s*H|(?<![A-Za-z])d\s*H|enthalpy)\s*\d*\s*"
     r"(?:is|=|:)?\s*" + _scig("dh") + r"\s*kJ\s*(?:/\s*|per\s*)?mols?\b",
     _c_thermo),

    # ---- electrochemistry ----
    ("nernst_eq",
     r"nernst",
     _c_nernst),
    ("emf_cell",
     r"(?:\bemf\b|electromotive\s+force|cell\s+potential)",
     _c_emf),

    # ---- kinetics ----
    ("kinetics_first_order",
     r"(?:first[\s-]*order|1st[\s-]*order)",
     _c_kinetics),

    # ---- solutions ----
    ("mole_fraction",
     r"mole\s+fraction.{0,160}?" + _scig("na")
     + r"\s*(?:moles?|mol)\s*(?:of\s+)?"
     r"(?P<a>[A-Za-z][A-Za-z0-9]{0,15}?)\b.{0,60}?" + _scig("nb")
     + r"\s*(?:moles?|mol)\s*(?:of\s+)?"
     r"(?P<b>[A-Za-z][A-Za-z0-9]{0,15}?)\b",
     _c_mole_fraction),
    ("molality",
     r"molality.{0,200}?" + _scig("m") + r"\s*g(?:ram)?s?\b[^.]{0,60}?"
     r"(?:molar\s+mass|molecular\s+mass|gram\s+(?:molecular\s+)?mass|M\s*=)"
     r"[^.]{0,20}?(?:is|=|of|:)?\s*" + _scig("mm")
     + r".{0,80}?" + _scig("w")
     + r"\s*(?P<wu>kg|kilograms?|g|grams?)\b\s*(?:of\s+)?(?:the\s+)?"
     r"(?:solvent|water)\b",
     _c_molality),
    ("concentration_ppm",
     r"(?:\bppm\b|parts\s+per\s+million)",
     _c_ppm),

    # ---- composition ----
    ("empirical_formula",
     r"empirical\s+formula",
     _c_empirical),
    ("percent_composition",
     r"(?:percentage|percent)\s+(?:composition|of|by\s+mass)",
     _c_percent),
]


def model_chemistry2(text: str) -> ModelResult:
    """Single dispatcher: scan the typed table, first grounded hit wins."""
    for fid, pattern, compute in TABLE:
        m = re.search(pattern, text, re.I)
        if not m:
            continue
        g = m.groupdict()
        try:
            out = compute(g, m, text)
        except Exception:
            continue
        if not out:
            continue
        value, steps, answer, assumptions = (list(out) + [None] * 4)[:4]
        if value is None and not steps:
            continue  # gate refused -> let later families try
        q_extra = out[4] if len(out) > 4 and isinstance(out[4], dict) else None
        return _res(fid, g, value, steps, assumptions, answer=answer,
                    q_extra=q_extra)
    return _no("CHEMISTRY2", "no chemistry2 family matched")
