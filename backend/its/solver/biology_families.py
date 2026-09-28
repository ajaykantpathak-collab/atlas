"""biology_families.py -- biology & biotech families for classes 9-12 CBSE/ICSE.

Deterministic closed-form families in the maths2_families style: trigger
regex with named slots, plausibility gates inside compute, and a
ModelResult (matched=True, confidence >= 0.93, quantities dict,
governing equation, final answer string, numeric answer float, steps
list).  No LLM calls anywhere.

Families:
  genetics    PUNNETT_CROSS (mono- and dihybrid, any-question-form),
              PUNNETT_SELF, BLOOD_GROUP_CROSS (ABO), BLOOD_GROUP_RH,
              SEX_LINKED_CROSS (colour-blindness / haemophilia)
  physiology  PHOTO_RESP_QUIZ, PHOTOSYNTH_BALANCE, RQ_NUMERIC,
              RQ_SUBSTRATE
  ecology     ENERGY_FLOW_10_PERCENT, EXP_POP_GROWTH, POP_DOUBLING,
              LOGISTIC_GROWTH, HARDY_WEINBERG, SHANNON_INDEX,
              SPECIES_RICHNESS, NPP_GPP, SPECIES_AREA
  cell bio    CELL_MAGNIFICATION, FIELD_OF_VIEW, CELL_DIVISION_COUNT
  biotech     RESTRICTION_SITE_COUNT, PCR_AMPLIFICATION, CHARGAFF_DNA

Dispatcher: model_biology(text) -> ModelResult (first grounded row
wins; a gate refusal lets the scan continue).  Deterministic only.
"""

from __future__ import annotations

import math
import re
from typing import Any, Dict, List, Optional, Tuple

from backend.its.solver.modeling_layer import ModelResult

# --------------------------------------------------------------------------- #
# helpers (same shape as maths2_families.py)
# --------------------------------------------------------------------------- #


def _no(structure: str, note: str) -> ModelResult:
    return ModelResult(structure=structure, matched=False, confidence=0.0,
                       quantities={}, governing_equation="", note=note)


def _res(structure: str, g: Dict[str, Any], value: Optional[float], eq: str,
         steps: List[str], answer: Optional[str] = None,
         assumptions: Optional[List[str]] = None, conf: float = 0.95,
         extra: Optional[Dict[str, Any]] = None) -> ModelResult:
    """Matched ModelResult; non-numeric slots are dropped from quantities."""
    q: Dict[str, float] = {}
    for k, v in (g or {}).items():
        if isinstance(v, (int, float)) and not isinstance(v, bool):
            q[k] = float(v)
    for k, v in (extra or {}).items():
        if isinstance(v, (int, float)) and not isinstance(v, bool):
            q[k] = float(v)
    return ModelResult(
        structure=structure, matched=True, confidence=conf,
        quantities=q, governing_equation=eq,
        final_answer=answer if answer is not None else
        (f"{value:.6g}" if value is not None else ""),
        numeric_answer=value, steps=steps,
        note="; ".join(assumptions) if assumptions else "")


_NUM = r"-?\d+(?:\.\d+)?"
_U_NUM = r"\d+(?:\.\d+)?"

# gate-failure tuple: value None + empty steps -> dispatcher keeps scanning
_GATE = (None, [], None, None, None, None)

_SUB_DIGITS = "\u2080\u2081\u2082\u2083\u2084\u2085\u2086\u2087\u2088\u2089"
_SUP_DIGITS = "\u2070\u00b9\u00b2\u00b3\u2074\u2075\u2076\u2077\u2078\u2079"


def _normalize(text: str) -> str:
    """Deterministic surface cleanup: unicode minus, times sign,
    superscripts, subscripts and X^c-style allele notations."""
    t = (text or "").replace("\u2212", "-").replace("\u2013", "-") \
        .replace("\u2019", "'").replace("\u00d7", "x")
    t = re.sub("[" + _SUP_DIGITS + "]+",
               lambda m_: "^" + "".join(
                   "0123456789"[_SUP_DIGITS.index(c)] for c in m_.group(0)),
               t)
    t = re.sub("[" + _SUB_DIGITS + "]",
               lambda m_: "0123456789"[_SUB_DIGITS.index(m_.group(0))], t)
    # X^C / X^c allele tokens -> XC / Xc
    t = re.sub(r"\bX\s*\^\s*([A-Za-z])", r"X\1", t)
    return t


def _nums(s: str) -> List[float]:
    return [float(x) for x in re.findall(_U_NUM, s or "")]


def _fmt(v: float) -> str:
    return f"{v:.6g}"


def _pct(v: float) -> str:
    """Fraction -> tidy percent string."""
    return f"{v * 100:.6g}%"


def _strip_species_labels(text: str) -> str:
    """Remove single-letter species tags ("A = 40" -> "40") so list
    capture sees a clean comma list."""
    return re.sub(r"\b[A-Za-z]\b\s*=?\s*", " ", text)


def _num_list_after(text: str, keyword: str) -> Optional[List[float]]:
    """First list of >= 1 numbers after a keyword (labels stripped)."""
    seg = re.search(re.escape(keyword) + r"[^0-9\-]*((?:\d+(?:\.\d+)?"
                    r"(?:\s*,\s*|\s+and\s+|\s+)?)+)", _strip_species_labels(
                        text), re.I)
    if not seg:
        return None
    nums = [n for n in _nums(seg.group(1)) if n > 0]
    return nums or None


# --------------------------------------------------------------------------- #
# genetics: Punnett squares
# --------------------------------------------------------------------------- #

# one allele PAIR: both characters the same letter (case varies).  Built
# per-letter so "tall" can never read as "ta"+"ll".
_GENO = "(?:" + "|".join(
    ch + ch + "|" + ch + ch.upper() + "|" + ch.upper() + ch + "|"
    + ch.upper() + ch.upper()
    for ch in "abcdefghijklmnopqrstuvwxyz") + ")"
_GENO_TOK = r"(?<![A-Za-z])" + _GENO + r"{1,2}(?![A-Za-z])"


def _valid_geno(s: str) -> bool:
    if len(s) not in (2, 4):
        return False
    return all(s[i].lower() == s[i + 1].lower() for i in range(0, len(s), 2))


def _gametes(g: str) -> List[str]:
    """Gametes of a genotype, deterministic order (uppercase allele first).
    Tt -> ['T','t'];  TtYy -> ['TY','Ty','tY','ty']."""
    pairs = [g[i:i + 2] for i in range(0, len(g), 2)]
    out = [""]
    for p in pairs:
        alleles = sorted(set(p), key=lambda c: c.islower())  # upper first
        out = [c + a for c in out for a in alleles]
    return out


def _zygote(g1: str, g2: str) -> str:
    """Offspring genotype from two gametes (uppercase allele first)."""
    out = ""
    for a, b in zip(g1, g2):
        pair = sorted([a, b], key=lambda c: c.islower())
        out += pair[0] + pair[1]
    return out


def _pheno(z: str) -> Tuple[str, ...]:
    """Dominant/recessive call per gene pair."""
    return tuple("dom" if any(c.isupper() for c in z[i:i + 2])
                 else "rec" for i in range(0, len(z), 2))


def _grid_lines(gam1: List[str], gam2: List[str],
                cells: List[str]) -> List[str]:
    """ASCII Punnett grid; cells row-major over (gam1 x gam2)."""
    w = max(len(c) for c in cells)
    lines = ["Punnett grid (rows = parent 1 gametes, columns = parent 2):"]
    lines.append("      |" + "|".join(" " + c.ljust(w) + " " for c in gam2))
    k = 0
    for r in gam1:
        lines.append("   " + r + "  |" + "|".join(
            " " + cells[k * len(gam2) + j].ljust(w) + " "
            for j in range(len(gam2))))
        k += 1
    return lines


def _ratio_str(counts: Dict[Any, int], order: List[Any],
               labels: Dict[Any, str]) -> str:
    return " : ".join(f"{counts.get(k, 0)} {labels[k]}"
                      for k in order if counts.get(k, 0))


def _c_punnett(g, m, text):
    p1, p2 = g.get("p1") or "", g.get("p2") or ""
    if not _valid_geno(p1) or not _valid_geno(p2):
        return _GATE
    gam1, gam2 = _gametes(p1), _gametes(p2)
    cells = [_zygote(a, b) for a in gam1 for b in gam2]
    total = len(cells)

    # genotype tally (deterministic order: uppercase sorts first)
    gcounts: Dict[str, int] = {}
    for z in cells:
        gcounts[z] = gcounts.get(z, 0) + 1
    geno_order = sorted(gcounts)
    geno_ratio = " : ".join(f"{gcounts[z]} {z}" for z in geno_order)

    # phenotype tally, canonical order dom/rec per gene
    gene_letters = [p1[i] for i in range(0, len(p1), 2)]
    pcounts: Dict[Tuple[str, ...], int] = {}
    for z in cells:
        pcounts[_pheno(z)] = pcounts.get(_pheno(z), 0) + 1
    n_genes = len(gene_letters)
    if n_genes == 1:
        order = [("dom",), ("rec",)]
        labels = {("dom",): f"dominant ({gene_letters[0]}_)",
                  ("rec",): f"recessive ({gene_letters[0].lower()}"
                            f"{gene_letters[0].lower()})"}
    else:
        order = [("dom", "dom"), ("dom", "rec"), ("rec", "dom"),
                 ("rec", "rec")]
        labels = {("dom", "dom"): "both dominant",
                  ("dom", "rec"): "first dominant, second recessive",
                  ("rec", "dom"): "first recessive, second dominant",
                  ("rec", "rec"): "both recessive"}
    pheno_ratio = " : ".join(f"{pcounts.get(k, 0)} {labels[k]}"
                             for k in order)
    dom_frac = sum(1 for z in cells if _pheno(z)[0] == "dom") / total

    steps = [f"Parent 1 ({p1}) produces gametes: " + ", ".join(gam1) + ".",
             f"Parent 2 ({p2}) produces gametes: " + ", ".join(gam2) + "."]
    steps.extend(_grid_lines(gam1, gam2, cells))
    steps.append(f"Genotype ratio: {geno_ratio}")
    steps.append(f"Phenotype ratio: {pheno_ratio}")

    eq = "Punnett square: P1 gametes x P2 gametes; P = favourable / total"

    # -- ask routing ------------------------------------------------------- #
    if re.search(r"genotype\s+ratio", text, re.I):
        return None, steps, f"genotype ratio {geno_ratio}", None, eq, \
            {"total_offspring": float(total)}
    if re.search(r"phenotype\s+ratio", text, re.I):
        return None, steps, f"phenotype ratio {pheno_ratio}", None, eq, \
            {"total_offspring": float(total)}
    prob_ask = re.search(
        r"probab|chance|likelihood|fraction|percent|how many|ratio of",
        text, re.I)
    # a third distinct genotype token in the sentence = asked genotype
    target = None
    for t in re.findall(_GENO_TOK, text):
        if _valid_geno(t) and t != p1 and t != p2:
            target = t
            break
    if target is not None and prob_ask:
        hit = gcounts.get(target, 0)
        frac = hit / total
        steps.append(f"Zygotes that are exactly {target}: {hit} of {total}.")
        return frac, steps, (f"probability of genotype {target} = "
                             f"{hit}/{total} = {frac:.6g} = {_pct(frac)}"), \
            None, eq, {"count_target": float(hit),
                       "total_offspring": float(total)}
    if prob_ask and re.search(r"heterozyg", text, re.I):
        if n_genes == 1:
            hit = sum(c for z, c in gcounts.items()
                      if z[0].isupper() != z[1].isupper())
        else:
            hit = sum(c for z, c in gcounts.items()
                      if all(z[i].isupper() != z[i + 1].isupper()
                             for i in range(0, len(z), 2)))
        frac = hit / total
        steps.append(f"Heterozygous zygotes: {hit} of {total}.")
        return frac, steps, (f"probability of a heterozygous offspring = "
                             f"{hit}/{total} = {frac:.6g} = {_pct(frac)}"), \
            None, eq, {"count_hetero": float(hit),
                       "total_offspring": float(total)}
    if prob_ask and n_genes == 2:
        m2 = re.search(r"(?:both\s+(dominant|recessive))|"
                       r"((?:dominant|recessive))\s+for\s+both", text, re.I)
        if m2:
            which = (m2.group(1) or m2.group(2)).lower()
            cls = ("dom", "dom") if which == "dominant" else ("rec", "rec")
            hit = pcounts.get(cls, 0)
            frac = hit / total
            steps.append(f"Zygotes that are {which} for both genes: "
                         f"{hit} of {total}.")
            return frac, steps, (f"probability of {which} for both genes = "
                                 f"{hit}/{total} = {frac:.6g} = "
                                 f"{_pct(frac)}"), None, eq, \
                {"count_target": float(hit), "total_offspring": float(total)}
    if prob_ask:
        if re.search(r"recessive", text, re.I):
            hit = sum(1 for z in cells if all(c.islower() for c in z))
            frac = hit / total
            steps.append(f"Fully recessive zygotes: {hit} of {total}.")
            return frac, steps, (f"probability of recessive phenotype = "
                                 f"{hit}/{total} = {frac:.6g} = "
                                 f"{_pct(frac)}"), None, eq, \
                {"count_rec": float(hit), "total_offspring": float(total)}
        hit = sum(1 for z in cells if _pheno(z)[0] == "dom")
        frac = hit / total
        steps.append(f"Dominant-phenotype zygotes: {hit} of {total}.")
        return frac, steps, (f"probability of dominant phenotype = "
                             f"{hit}/{total} = {frac:.6g} = "
                             f"{_pct(frac)}"), None, eq, \
            {"count_dom": float(hit), "total_offspring": float(total)}
    # default report: phenotype ratio, dominant fraction as the value
    return dom_frac, steps, (f"phenotype ratio {pheno_ratio} "
                             f"(dominant fraction {_pct(dom_frac)})"), None, \
        "Punnett square: P1 gametes x P2 gametes", \
        {"total_offspring": float(total)}


_PUNNETT_PAIR = (r"(?P<p1>" + _GENO_TOK + r")\s*(?:[xX]|and|with|by)\s*"
                 r"(?P<p2>" + _GENO_TOK + r")")
_PUNNETT_LOOSE = (r"(?:cross|hybrid)\w*(?:\s+between)?[^.]{0,80}?"
                  r"(?P<p1>" + _GENO_TOK + r")[^.]{0,40}?"
                  r"(?:and|with|x)[^.]{0,40}?(?P<p2>" + _GENO_TOK + r")")


def _c_punnett_self(g, m, text):
    """Self-pollination / self-cross: exactly one distinct valid genotype
    must appear in the sentence."""
    cands = {t for t in re.findall(_GENO_TOK, text) if _valid_geno(t)}
    if len(cands) != 1:
        return _GATE
    p1 = cands.pop()
    return _c_punnett({"p1": p1, "p2": p1}, m, text)


# --------------------------------------------------------------------------- #
# genetics: ABO blood groups
# --------------------------------------------------------------------------- #

_ABO_PHENO = {"AA": "A", "AO": "A", "BB": "B", "BO": "B", "AB": "AB",
              "OO": "O"}
_ABO_ORDER = ["A", "B", "AB", "O"]


def _scan_parents(text: str, patterns: List[Tuple[str, Dict[str, str], bool]]
                  ) -> List[Tuple[int, str, int]]:
    """Positional parent scan: earlier regex wins overlaps; results sorted
    by position.  patterns = [(regex, {text: genotype}, prox)] where
    prox=True skips a match that merely restates a nearby parent
    ("heterozygous A (AO)" -- the (AO) is the same parent).  Returns
    (pos, genotype, span_end)."""
    found: List[Tuple[int, str, int]] = []
    spans: List[Tuple[int, int]] = []

    def try_add(s: int, e: int, geno: str, prox: bool) -> None:
        if any(not (e <= a or s >= b) for a, b in spans):
            return
        if prox:
            prior = [b for a, b in spans if a <= s]  # nearest preceding
            if prior and 0 <= s - max(prior) < 20:
                return  # restatement of the parent just before it
        spans.append((s, e))
        found.append((s, geno, e))

    for pat, mapping, prox in patterns:
        for mm in re.finditer(pat, text, re.I):
            geno = None
            keys = [mm.group(0).strip()] + [g for g in (mm.groups() or ())
                                            if g]
            for key in keys:
                geno = (mapping.get(key) or mapping.get(key.upper())
                        or mapping.get(key.lower()))
                if geno:
                    break
            if geno is None:
                continue
            try_add(*mm.span(), geno, prox)
    found.sort(key=lambda x: x[0])
    return found


def _c_blood_abo(g, m, text):
    abo_keys = {k: k for k in ("AA", "AO", "BB", "BO", "AB", "OO")}
    patterns = [
        (r"\bheterozygous\s+(?:blood\s+)?(?:group\s+)?([AB])\b",
         {"A": "AO", "B": "BO"}, False),
        (r"\bhomozygous\s+(?:blood\s+)?(?:group\s+)?([AB])\b",
         {"A": "AA", "B": "BB"}, False),
        (r"\bgroup\s+(AB)\b", {"AB": "AB"}, False),
        (r"\bgroup\s+(O)\b", {"O": "OO"}, False),
        (r"\((AA|AO|BB|BO|AB|OO)\)", abo_keys, True),
    ]
    parents = _scan_parents(text, patterns)
    if len(parents) < 2:
        return _GATE
    p1, p2 = parents[0][1], parents[1][1]
    gam1 = sorted({p1[0], p1[1]}, key=lambda c: (c == "O", c))
    gam2 = sorted({p2[0], p2[1]}, key=lambda c: (c == "O", c))
    kids: Dict[str, int] = {}
    kid_geno: List[str] = []
    for a in gam1:
        for b in gam2:
            zg = "".join(sorted([a, b], key=lambda c: (c == "O", c)))
            kids[_ABO_PHENO[zg]] = kids.get(_ABO_PHENO[zg], 0) + 1
            kid_geno.append(f"{zg} ({_ABO_PHENO[zg]})")
    total = sum(kids.values())
    probs = {k: kids.get(k, 0) / total for k in _ABO_ORDER}
    steps = [f"Parent 1 genotype {p1} (group {_ABO_PHENO[p1]}) gametes: "
             + ", ".join(gam1) + ".",
             f"Parent 2 genotype {p2} (group {_ABO_PHENO[p2]}) gametes: "
             + ", ".join(gam2) + ".",
             "Child genotypes: " + ", ".join(kid_geno) + ".",
             "Child phenotype probabilities: "
             + ", ".join(f"{k}: {_pct(probs[k])}" for k in _ABO_ORDER) + "."]
    eq = "ABO cross: parental gametes x gametes; group of each zygote"
    # ask: a group named AFTER both parents have been stated
    tail = text[parents[1][2]:]
    asked = None
    for k in _ABO_ORDER:
        if re.search(r"group\s+" + k + r"\b", tail, re.I):
            asked = k
            break
    if asked and re.search(r"probab|chance|likelihood|what|how",
                           text, re.I):
        frac = probs[asked]
        steps.append(f"P(child is group {asked}) = "
                     f"{kids.get(asked, 0)}/{total} = {frac:.6g}.")
        return frac, steps, (f"probability of a group-{asked} child = "
                             f"{kids.get(asked, 0)}/{total} = "
                             f"{_pct(frac)}"), None, eq, \
            {"p_" + k: probs[k] for k in _ABO_ORDER}
    return None, steps, ("child blood-group probabilities: "
                         + ", ".join(f"{k} {_pct(probs[k])}"
                                     for k in _ABO_ORDER)), None, eq, \
        {"p_" + k: probs[k] for k in _ABO_ORDER}


# --------------------------------------------------------------------------- #
# genetics: Rh factor
# --------------------------------------------------------------------------- #

def _c_blood_rh(g, m, text):
    patterns = [
        (r"\b(heterozygous)\s+Rh", {"heterozygous": "Dd"}, False),
        (r"\b(homozygous)\s+Rh", {"homozygous": "DD"}, False),
        (r"\b(Rh\s*negative|Rh\s*-)", {"Rh negative": "dd", "Rh-": "dd"},
         False),
        (r"\b(DD|Dd|dd)\b",
         {"DD": "DD", "Dd": "Dd", "dd": "dd"}, True),
    ]
    parents = _scan_parents(text, patterns)
    if len(parents) < 2:
        return _GATE
    p1, p2 = parents[0][1], parents[1][1]
    gam1 = sorted({p1[0], p1[1]}, key=lambda c: (c == "d", c))
    gam2 = sorted({p2[0], p2[1]}, key=lambda c: (c == "d", c))
    kids: Dict[str, int] = {}
    for a in gam1:
        for b in gam2:
            zg = "".join(sorted([a, b], key=lambda c: (c == "d", c)))
            kids[zg] = kids.get(zg, 0) + 1
    total = sum(kids.values())
    neg = kids.get("dd", 0)
    frac_neg = neg / total
    frac_pos = 1 - frac_neg
    steps = [f"Parent 1 genotype {p1} gametes: " + ", ".join(gam1) + ".",
             f"Parent 2 genotype {p2} gametes: " + ", ".join(gam2) + ".",
             "Children: "
             + ", ".join(f"{k} x{n}" for k, n in sorted(kids.items())) + ".",
             f"Rh- children: {neg}/{total}; Rh+ children: "
             f"{total - neg}/{total}."]
    eq = "Rh cross: D dominant over d; dd = Rh negative"
    tail = text[parents[1][2]:]
    if re.search(r"Rh\s*(?:negative|\-)", tail, re.I) and \
            re.search(r"probab|chance|likelihood|what|how many",
                      text, re.I):
        return frac_neg, steps, (f"probability of an Rh- child = "
                                 f"{neg}/{total} = {_pct(frac_neg)}"), \
            None, eq, {"p_rh_neg": frac_neg, "p_rh_pos": frac_pos}
    return None, steps, (f"{_pct(frac_pos)} Rh+ and {_pct(frac_neg)} "
                         "Rh- children"), None, eq, \
        {"p_rh_neg": frac_neg, "p_rh_pos": frac_pos}


# --------------------------------------------------------------------------- #
# genetics: X-linked (colour blindness / haemophilia / XX-XY)
# --------------------------------------------------------------------------- #

_SL_TOKEN = re.compile(r"X[CcHh]?X[CcHh]?|X[CcHh]?Y")


def _scan_sl_parents(text: str, cond: str) -> List[Tuple[int, str, str]]:
    """Return [(pos, genotype, 'F'|'M')] -- explicit tokens first, then
    word forms ("carrier mother", "normal father", ...)."""
    out: List[Tuple[int, str, str]] = []
    for mm in _SL_TOKEN.finditer(text):
        tok = mm.group(0)
        out.append((mm.start(), tok, "F" if tok.count("X") >= 2 else "M"))
    if len(out) >= 2:
        return out[:2]
    c, n = cond, cond.upper()
    mom = None
    for mm in re.finditer(r"\b(carrier|normal|colour\s?blind|color\s?blind|"
                          r"haemophil\w*|hemophil\w*)\s+"
                          r"(mother|female|woman|lady)\b", text, re.I):
        w = re.sub(r"\s+", "", mm.group(1).lower())
        if w.startswith("carrier"):
            geno = "X" + n + "X" + c
        elif w.startswith("normal"):
            geno = "X" + n + "X" + n
        else:  # affected mother
            geno = "X" + c + "X" + c
        mom = (mm.start(), geno, "F")
        break
    if mom is None:
        for mm in re.finditer(r"\b(mother|female|woman)\s+(?:is\s+)?"
                              r"(?:a\s+)?(carrier|normal|colour\s?blind|"
                              r"color\s?blind|haemophil\w*|hemophil\w*)\b",
                              text, re.I):
            w = re.sub(r"\s+", "", mm.group(2).lower())
            if w.startswith("carrier"):
                geno = "X" + n + "X" + c
            elif w.startswith("normal"):
                geno = "X" + n + "X" + n
            else:
                geno = "X" + c + "X" + c
            mom = (mm.start(), geno, "F")
            break
    dad = None
    for mm in re.finditer(r"\b(normal|colour\s?blind|color\s?blind|"
                          r"haemophil\w*|hemophil\w*)\s+"
                          r"(father|male|man)\b", text, re.I):
        w = re.sub(r"\s+", "", mm.group(1).lower())
        geno = "X" + n + "Y" if w.startswith("normal") else "X" + c + "Y"
        dad = (mm.start(), geno, "M")
        break
    if dad is None:
        for mm in re.finditer(r"\b(father|male|man)\s+(?:is\s+)?"
                              r"(normal|colour\s?blind|color\s?blind|"
                              r"haemophil\w*|hemophil\w*)\b", text, re.I):
            w = re.sub(r"\s+", "", mm.group(2).lower())
            geno = "X" + n + "Y" if w.startswith("normal") else "X" + c + "Y"
            dad = (mm.start(), geno, "M")
            break
    word_parents = [p for p in (mom, dad) if p]
    return sorted(word_parents, key=lambda x: x[0])


def _c_sex_linked(g, m, text):
    cond = "h" if re.search(r"haemophil|hemophil", text, re.I) else "c"
    parents = _scan_sl_parents(text, cond)
    if len(parents) < 2:
        return _GATE
    mother = next((p for p in parents if p[2] == "F"), None)
    father = next((p for p in parents if p[2] == "M"), None)
    if not mother or not father:
        return _GATE
    n = cond.upper()  # the normal (unaffected) allele letter
    mtok, ftok = mother[1], father[1]
    if len(mtok) == 2:  # plain "XX" (sex-determination notation)
        mX = ["X" + n, "X" + n]
    else:
        mX = [mtok[0:2], mtok[2:4]]
    if len(ftok) == 3:
        fX = ftok[0:2]
    else:  # plain "XY"
        fX = "X" + n
    cats = {"carrier_d": 0, "affected_d": 0, "normal_d": 0,
            "normal_s": 0, "affected_s": 0}
    for x in mX:
        xa = x[1] == cond
        if fX[1] == cond:  # father affected -> daughters all get his c
            cats["affected_d" if xa else "carrier_d"] += 1
        else:
            cats["carrier_d" if xa else "normal_d"] += 1
        cats["affected_s" if xa else "normal_s"] += 1
    total = sum(cats.values())
    cond_name = "haemophilia" if cond == "h" else "colour blindness"
    lines = [f"Mother {mother[1]} x Father {father[1]} ({cond_name}).",
             "Daughters: " + ", ".join(f"{mX[i]}X{fX[1]}"
                                       for i in range(2)) + ".",
             "Sons: " + ", ".join(f"{mX[i]}Y" for i in range(2)) + ".",
             f"Breakdown: carrier daughters {cats['carrier_d']}/4, "
             f"affected daughters {cats['affected_d']}/4, "
             f"normal daughters {cats['normal_d']}/4, "
             f"normal sons {cats['normal_s']}/4, "
             f"affected sons {cats['affected_s']}/4."]
    eq = ("X-linked cross: mother's X goes to all children, father's X "
          "only to daughters")
    cond_word = (r"haemophil\w*|hemophil\w*" if cond == "h"
                 else r"colour\s?-?\s?blind|color\s?-?\s?blind")
    cond_grp = "(?:" + cond_word + ")"  # alternation safety

    def has_cond(seg: str) -> bool:
        return bool(re.search(cond_grp, seg, re.I))

    # sex-ratio ask (XX x XY sex determination) before condition routing
    if not has_cond(text) and \
            re.search(r"probab|chance|likelihood|ratio|percent|fraction",
                      text, re.I) and \
            re.search(r"\b(?:boy|girl|male|female|son|daughter)s?\b",
                      text, re.I):
        return 0.5, lines, ("50% of children are male and 50% female "
                            "(the sex ratio is always 1:1)"), None, \
            "XX x XY: father's X -> daughter, Y -> son", \
            {"p_male": 0.5, "p_female": 0.5, "total_offspring": float(total)}
    if has_cond(text) and \
            (re.search(r"\bdaughters?\b.{0,30}?" + cond_grp, text, re.I)
             or re.search(cond_grp + r".{0,15}?\bdaughters?\b", text,
                          re.I)):
        if re.search(r"carrier", text, re.I):
            frac = cats["carrier_d"] / 2
            lines.append(f"Carrier daughters: {cats['carrier_d']} of 2 "
                         "daughters.")
            return frac, lines, (f"{_pct(frac)} of daughters are carriers "
                                 f"({cats['carrier_d']}/2)"), None, eq, \
                {"carrier_daughters": float(cats["carrier_d"]),
                 "total_offspring": float(total)}
        aff = cats["affected_d"]
        frac = aff / 2
        lines.append(f"Affected daughters: {aff} of 2.")
        return frac, lines, (f"{_pct(frac)} of daughters are affected "
                             f"({aff}/2)"), None, eq, \
            {"affected_daughters": float(aff),
             "total_offspring": float(total)}
    if has_cond(text) and \
            re.search(r"\b(?:sons?|boys?|male\s+(?:child|offspring))\b"
                      r".{0,30}?" + cond_grp, text, re.I):
        frac = cats["affected_s"] / 2
        lines.append(f"Affected sons: {cats['affected_s']} of 2 sons.")
        return frac, lines, (f"{_pct(frac)} of sons are affected "
                             f"({cats['affected_s']}/2)"), None, eq, \
            {"affected_sons": float(cats["affected_s"]),
             "total_offspring": float(total)}
    if has_cond(text) and \
            re.search(cond_grp + r".{0,15}?\b(?:sons?|boys?|male\s+child)"
                      r"\b", text, re.I) and \
            re.search(r"probab|chance|likelihood", text, re.I):
        frac = cats["affected_s"] / 4
        return frac, lines, (f"probability of an affected son = "
                             f"{cats['affected_s']}/4 = {_pct(frac)}"), \
            None, eq, {"affected_sons": float(cats["affected_s"]),
                       "total_offspring": float(total)}
    frac_aff = (cats["affected_s"] + cats["affected_d"]) / 4
    if has_cond(text) and \
            re.search(r"probab|chance|likelihood|fraction|percent", text,
                      re.I):
        return frac_aff, lines, (f"probability of an affected child = "
                                 f"{cats['affected_s'] + cats['affected_d']}"
                                 f"/4 = {_pct(frac_aff)}"), None, eq, \
            {"affected_children": float(cats["affected_s"] +
                                        cats["affected_d"]),
             "total_offspring": float(total)}
    return None, lines, lines[-1], None, eq, \
        {"affected_children": float(cats["affected_s"] +
                                    cats["affected_d"]),
         "total_offspring": float(total)}


# --------------------------------------------------------------------------- #
# photosynthesis / respiration quiz + balancing
# --------------------------------------------------------------------------- #

_PHOTO_FACTS: List[Tuple[str, str]] = [
    (r"word\s+equation",
     "photosynthesis word equation: carbon dioxide + water "
     "--(sunlight, chlorophyll)--> glucose + oxygen"),
    (r"(?:gas|gases).{0,40}\b(released|produced|evolved|given\s+out|"
     r"liberated|bubbles)",
     "oxygen (O2) is released during photosynthesis"),
    (r"\b(?:gas|gases)\b.{0,40}\b(absorbed|taken\s+in|used|consumed|"
     r"intake)",
     "carbon dioxide (CO2) is absorbed during photosynthesis"),
    (r"raw\s+materials?",
     "raw materials of photosynthesis: carbon dioxide and water "
     "(with sunlight and chlorophyll)"),
    (r"(?:end|final)\s+products?|main\s+product",
     "end product of photosynthesis: glucose (food); oxygen is the "
     "by-product"),
    (r"\b(?:site|sites)\b|takes\s+place|chloroplast",
     "site of photosynthesis: chloroplast (chlorophyll in chloroplasts)"),
    (r"energy\s+source|source\s+of\s+energy",
     "energy source for photosynthesis: sunlight (solar energy)"),
    (r"by\s*-?\s?product",
     "by-product of photosynthesis: oxygen"),
]

_RESP_FACTS: List[Tuple[str, str]] = [
    (r"word\s+equation",
     "respiration word equation: glucose + oxygen --> carbon dioxide "
     "+ water + energy (ATP)"),
    (r"energy\s+currency",
     "energy currency of the cell: ATP (adenosine triphosphate)"),
    (r"anaerobic.{0,40}(yeast|fermentation)",
     "anaerobic respiration in yeast: glucose --> ethanol + carbon "
     "dioxide + energy (fermentation)"),
    (r"anaerobic.{0,40}(muscle|cramp)",
     "anaerobic respiration in human muscle: glucose --> lactic acid "
     "+ energy"),
    (r"aerobic",
     "aerobic respiration: glucose + oxygen --> carbon dioxide + water "
     "+ energy"),
    (r"(?:site|mitochondri)",
     "site of aerobic respiration: mitochondria (powerhouse of the cell)"),
]


def _c_photo_resp_quiz(g, m, text):
    # quantitative territory: RQ and productivity families own these asks
    if re.search(r"GPP|NPP|primary\s+productivity|respiratory\s+quotient|"
                 r"\bRQ\b", text, re.I):
        return _GATE
    is_photo = bool(re.search(r"photosynth|chlorophyll", text, re.I))
    is_resp = bool(re.search(r"respirat|fermentation|breathing", text,
                             re.I))
    facts = _PHOTO_FACTS if is_photo else (_RESP_FACTS if is_resp else [])
    for pat, ans in facts:
        if re.search(pat, text, re.I):
            return None, ["Matched biology fact (deterministic table).",
                          f"Answer: {ans}"], ans, None, \
                "NCERT biology fact table", {}
    # default word-equation only when the question is about the equation
    if is_photo and re.search(r"equation|CO\s*2|glucose", text, re.I):
        ans = _PHOTO_FACTS[0][1]
        return None, ["Matched photosynthesis word equation."], ans, \
            None, "NCERT biology fact table", {}
    if is_resp and re.search(r"equation|glucose|ATP", text, re.I):
        ans = _RESP_FACTS[0][1]
        return None, ["Matched respiration word equation."], ans, \
            None, "NCERT biology fact table", {}
    return _GATE


def _c_photo_balance(g, m, text):
    if not re.search(r"CO\s*2", text, re.I) or \
            not re.search(r"C\s*6\s*H\s*12\s*O\s*6", text, re.I):
        return _GATE
    steps = ["Photosynthesis: 6 CO2 + 6 H2O --(sunlight, chlorophyll)--> "
             "C6H12O6 + 6 O2.",
             "Atom check: C 6 = 6, H 12 = 12, O (6 + 12) = 18 = (6 + 12)."]
    return None, steps, ("balanced equation: 6 CO2 + 6 H2O --> C6H12O6 "
                         "+ 6 O2 (coefficients 6, 6, 1, 6)"), None, \
        "6CO2 + 6H2O -> C6H12O6 + 6O2", \
        {"co2": 6.0, "h2o": 6.0, "glucose": 1.0, "o2": 6.0}


# --------------------------------------------------------------------------- #
# respiratory quotient
# --------------------------------------------------------------------------- #

def _c_rq_numeric(g, m, text):
    co2 = re.search(r"(\d+(?:\.\d+)?)\s*(?:moles?|molecules?|ml|litres?|"
                    r"volumes?)?\s*(?:of\s+)?CO\s*2", text, re.I)
    o2 = re.search(r"(\d+(?:\.\d+)?)\s*(?:moles?|molecules?|ml|litres?|"
                   r"volumes?)?\s*(?:of\s+)?O\s*2", text, re.I)
    if not co2 or not o2:
        return _GATE
    c, o = float(co2.group(1)), float(o2.group(1))
    if o <= 0:
        return _GATE
    rq = c / o
    steps = [f"CO2 evolved = {_fmt(c)}, O2 consumed = {_fmt(o)}.",
             f"RQ = CO2/O2 = {_fmt(c)}/{_fmt(o)} = {_fmt(rq)}."]
    if rq == 1.0:
        steps.append("RQ = 1 is typical of carbohydrates (e.g. glucose).")
    elif rq < 1.0:
        steps.append("RQ < 1 is typical of fats (~0.7) and proteins (~0.8).")
    else:
        steps.append("RQ > 1 is typical of organic acids (e.g. malic "
                     "acid, 1.33).")
    return rq, steps, f"RQ = {_fmt(rq)}", None, \
        "RQ = CO2 evolved / O2 consumed", {"co2": c, "o2": o}


_RQ_SUBSTRATE = [
    (r"glucose|carbohydrate|sucrose", 1.0, "carbohydrates (glucose): "
     "RQ = 1"),
    (r"\bfats?\b|\blipids?\b|\boils?\b", 0.7, "fats: RQ = 0.7"),
    (r"proteins?", 0.8, "proteins: RQ = 0.8 (about 0.8-0.9)"),
    (r"malic|organic\s+acid", 1.33, "organic acids (malic acid): RQ = 1.33"),
]


def _c_rq_substrate(g, m, text):
    for pat, val, ans in _RQ_SUBSTRATE:
        if re.search(pat, text, re.I):
            return val, ["Standard RQ table (deterministic).", ans], ans, \
                None, "RQ = CO2 evolved / O2 consumed", {"rq": val}
    return _GATE


# --------------------------------------------------------------------------- #
# energy flow: 10 percent law
# --------------------------------------------------------------------------- #

_LEVELS = [
    (r"quaternary\s+consumers?|top\s+carnivores?|apex\s+predators?", 4,
     "quaternary consumers"),
    (r"tertiary\s+consumers?|large\s+carnivores?", 3, "tertiary consumers"),
    (r"secondary\s+consumers?|small\s+carnivores?|(?<!top\ )carnivores?",
     2, "secondary consumers"),
    (r"primary\s+consumers?|herbivores?", 1, "primary consumers"),
    (r"producers?|autotrophs?|green\s+plants?", 0, "producers"),
]


def _find_levels(text: str) -> List[Tuple[int, int, str]]:
    """[(pos, level_index, canonical_name)]; longest/most-specific scan
    first with overlap claiming."""
    out = []
    claimed: List[Tuple[int, int]] = []
    for pat, idx, name in _LEVELS:
        for mm in re.finditer(pat, text, re.I):
            s, e = mm.span()
            if any(not (e <= a or s >= b) for a, b in claimed):
                continue
            claimed.append((s, e))
            out.append((s, idx, name))
    out.sort(key=lambda x: x[0])
    return out


def _c_energy_flow(g, m, text):
    lv = _find_levels(text)
    if not lv:
        return _GATE
    given = None
    for pos, idx, name in lv:
        window = text[max(0, pos - 70):pos + 70]
        nm = re.search(r"(\d+(?:\.\d+)?)\s*(kJ|kcal|J\b|joules?|calories?|"
                       r"cal\b)", window, re.I)
        if nm:
            given = (pos, idx, name, float(nm.group(1)), nm.group(2))
            break
    if not given:
        return _GATE
    ask = None
    for pos, idx, name in reversed(lv):
        if idx != given[1]:
            ask = (pos, idx, name)
            break
    if ask is None:
        return _GATE
    hops = ask[1] - given[1]
    if hops == 0:
        return _GATE
    energy = given[3] * (0.1 ** hops)
    steps = [f"Given: {_fmt(given[3])} {given[4]} at the {given[2]} level.",
             "10 percent law: only 10% of the energy passes to the next "
             "trophic level.",
             f"Hops from {given[2]} to {ask[2]}: {hops}.",
             f"Energy = {given[3]:g} x (0.1)^{hops} = {_fmt(energy)} "
             f"{given[4]}."]
    return energy, steps, (f"energy at the {ask[2]} level = "
                           f"{_fmt(energy)} {given[4]}"), None, \
        "10% law: E_next = 0.1^hops x E_given", \
        {"energy_given": given[3], "hops": float(hops)}


# --------------------------------------------------------------------------- #
# population growth
# --------------------------------------------------------------------------- #

def _c_exp_growth(g, m, text):
    n0 = re.search(r"(?:population|bacteri\w+|cells?|individuals?|"
                   r"organisms?|people|insects?|parameci\w+)\s+(?:of\s+|"
                   r"is\s+|was\s+|=)?\s*(\d+(?:\.\d+)?)", text, re.I)
    if not n0:
        n0 = re.search(r"(\d+(?:\.\d+)?)\s*(?:individuals?|organisms?|"
                       r"bacteri\w+|cells?)", text, re.I)
    rm = re.search(r"(?:grows?|grew|increas\w+|grow|exponential\w*)\D{0,40}?"
                   r"(\d+(?:\.\d+)?)\s*(%|percent)?", text, re.I)
    rate = re.search(r"(\d+(?:\.\d+)?)\s*(?:%|percent)\s*per\s+"
                     r"(?:year|annum|day|hour|minute)", text, re.I)
    t = re.search(r"after\s+(\d+(?:\.\d+)?)\s*(years?|days?|hours?|"
                  r"minutes?)", text, re.I)
    if not (n0 and (rm or rate) and t):
        return _GATE
    n0v = float(n0.group(1))
    rv = float((rm or rate).group(1))
    if (rm or rate).group(2) or rv > 1:
        rv = rv / 100.0
    tv = float(t.group(1))
    if n0v <= 0 or not (0 < rv < 1) or tv < 0:
        return _GATE
    n = n0v * math.exp(rv * tv)
    steps = [f"N0 = {_fmt(n0v)}, r = {_fmt(rv)} per {t.group(2)}, "
             f"t = {_fmt(tv)} {t.group(2)}.",
             f"N = N0 e^(rt) = {_fmt(n0v)} x e^({_fmt(rv)}x{_fmt(tv)}) "
             f"= {_fmt(n)}."]
    return n, steps, f"N = {_fmt(n)} individuals", None, "N = N0 e^(rt)", \
        {"N0": n0v, "r": rv, "t": tv}


def _c_pop_doubling(g, m, text):
    n0 = re.search(r"(\d+(?:\.\d+)?)\s*(?:bacteri\w+|cells?|individuals?|"
                   r"organisms?)", text, re.I)
    dm = re.search(r"(?:doubles?|doubling)\D{0,30}?(\d+(?:\.\d+)?)\s*"
                   r"(minutes?|hours?|days?)", text, re.I)
    t = re.search(r"after\s+(\d+(?:\.\d+)?)\s*(minutes?|hours?|days?)",
                  text, re.I)
    if not dm or not t:
        return _GATE
    d, tv = float(dm.group(1)), float(t.group(1))
    d_u, t_u = dm.group(2), t.group(2)
    if d <= 0:
        return _GATE
    if d_u.rstrip("s") != t_u.rstrip("s"):
        to_min = {"minute": 1.0, "hour": 60.0, "day": 1440.0}
        if d_u.rstrip("s") not in to_min or t_u.rstrip("s") not in to_min:
            return _GATE
        tv = tv * to_min[t_u.rstrip("s")] / to_min[d_u.rstrip("s")]
    n0v = float(n0.group(1)) if n0 else 1.0
    gens = tv / d
    n = n0v * (2.0 ** gens)
    steps = [f"Doubling time = {_fmt(d)} {d_u}; elapsed = {_fmt(tv)} "
             f"minutes.",
             f"Generations = {_fmt(tv)}/{_fmt(d)} = {_fmt(gens)}.",
             f"N = N0 x 2^generations = {_fmt(n0v)} x 2^{_fmt(gens)} "
             f"= {_fmt(n)}."]
    return n, steps, f"N = {_fmt(n)}", None, "N = N0 x 2^(t/td)", \
        {"N0": n0v, "doublings": gens}


def _c_logistic(g, m, text):
    if not re.search(r"carrying\s+capacity|logistic", text, re.I):
        return _GATE
    K = re.search(r"carrying\s+capacity\D{0,20}?(\d+(?:\.\d+)?)", text,
                  re.I)
    n0 = re.search(r"(?:initial(?:ly)?|N\s*0)\D{0,20}?(\d+(?:\.\d+)?)",
                   text, re.I)
    if not n0:
        n0 = re.search(r"(?:population|cells?|individuals?)\s+of\s+"
                       r"(\d+(?:\.\d+)?)", text, re.I)
    rm = re.search(r"(\d+(?:\.\d+)?)\s*(%|percent)?\s*per\s+"
                   r"(?:year|annum|day|hour)", text, re.I)
    t = re.search(r"after\s+(\d+(?:\.\d+)?)\s*(?:years?|days?|hours?)",
                  text, re.I)
    if not (K and n0 and t):
        return _GATE
    Kv, n0v = float(K.group(1)), float(n0.group(1))
    rv = float(rm.group(1)) if rm else 1.0
    if rm and (rm.group(2) or rv > 1):
        rv = rv / 100.0
    tv = float(t.group(1))
    if n0v <= 0 or Kv <= n0v or rv <= 0:
        return _GATE
    ert = math.exp(rv * tv)
    n = (Kv * n0v * ert) / (Kv + n0v * (ert - 1))
    steps = [f"K = {_fmt(Kv)}, N0 = {_fmt(n0v)}, r = {_fmt(rv)}, "
             f"t = {_fmt(tv)}.",
             f"e^(rt) = e^({_fmt(rv)}x{_fmt(tv)}) = {_fmt(ert)}.",
             "N = K N0 e^(rt) / (K + N0 (e^(rt) - 1))",
             f"N = {_fmt(n)}."]
    return n, steps, f"N = {_fmt(n)} individuals", None, \
        "logistic: N = K N0 e^(rt) / (K + N0 (e^(rt) - 1))", \
        {"K": Kv, "N0": n0v, "r": rv, "t": tv}


# --------------------------------------------------------------------------- #
# Hardy-Weinberg
# --------------------------------------------------------------------------- #

_HW_CONCEPTS = [
    # allele frequencies are the most specific givens -- check first
    (r"frequency\s+(?:of\s+)?(?:the\s+)?recessive\s+allele", "q",
     "recessive allele frequency (q)"),
    (r"frequency\s+(?:of\s+)?(?:the\s+)?dominant\s+allele", "p",
     "dominant allele frequency (p)"),
    (r"homozygous\s+recessive|recessive\s+(?:trait|phenotype|condition)",
     "q2", "homozygous recessive (q^2)"),
    (r"heterozygous|carriers?", "hetero", "heterozygous (2pq)"),
    (r"homozygous\s+dominant", "p2", "homozygous dominant (p^2)"),
]

_HW_ASKS = [
    (r"heterozyg", "hetero", "frequency of heterozygotes"),
    (r"carriers?", "hetero", "frequency of carriers"),
    (r"homozygous\s+recessive", "q2", "frequency of homozygous recessive"),
    (r"homozygous\s+dominant", "p2", "frequency of homozygous dominant"),
    (r"dominant\s+allele", "p", "dominant allele frequency p"),
    (r"recessive\s+allele", "q", "recessive allele frequency q"),
]


def _c_hardy(g, m, text):
    if not re.search(r"hardy|weinberg|h\s*-\s*w\b|population", text, re.I):
        return _GATE
    given = None
    for pat, key, label in _HW_CONCEPTS:
        mm = re.search(pat, text, re.I)
        if not mm:
            continue
        window = text[max(0, mm.start() - 60):mm.end() + 60]
        nm = re.search(r"(\d+(?:\.\d+)?)\s*(%|percent)?", window)
        if not nm:
            continue
        v = float(nm.group(1))
        if nm.group(2) or v > 1:
            v = v / 100.0
        given = (key, v, label)
        break
    if not given:
        return _GATE
    key, v, label = given
    q = p = None
    assumptions: List[str] = []
    if key == "q2":
        if not (0 < v < 1):
            return _GATE
        q = math.sqrt(v)
    elif key == "q":
        if not (0 < v < 1):
            return _GATE
        q = v
    elif key == "p":
        if not (0 < v < 1):
            return _GATE
        p = v
    elif key == "p2":
        if not (0 < v < 1):
            return _GATE
        p = math.sqrt(v)
    else:  # hetero = 2q(1-q)
        disc = 1.0 - 2.0 * v
        if disc < 0 or not (0 < v <= 0.5):
            return _GATE
        q = (1.0 - math.sqrt(disc)) / 2.0
        assumptions.append("smaller allele-frequency root taken "
                           "(2pq has symmetric roots)")
    if p is None:
        p = 1.0 - q
    if q is None:
        q = 1.0 - p
    p2, hetero, q2 = p * p, 2 * p * q, q * q
    steps = [f"Given: {label} = {_fmt(v)}.",
             "Hardy-Weinberg: p^2 + 2pq + q^2 = 1 with p + q = 1.",
             f"q = {_fmt(q)}, p = {_fmt(p)}.",
             f"p^2 = {_fmt(p2)} ({_pct(p2)}), 2pq = {_fmt(hetero)} "
             f"({_pct(hetero)}), q^2 = {_fmt(q2)} ({_pct(q2)})."]
    vals = {"p": p, "q": q, "p2": p2, "hetero": hetero, "q2": q2}
    eq = "p^2 + 2pq + q^2 = 1, p + q = 1"
    for pat, vkey, ans in _HW_ASKS:
        if re.search(pat, text, re.I):
            val = vals[vkey]
            return val, steps, f"{ans} = {_fmt(val)} ({_pct(val)})", \
                (assumptions or None), eq, vals
    return hetero, steps, (f"frequency of heterozygotes 2pq = "
                           f"{_fmt(hetero)} ({_pct(hetero)})"), \
        (assumptions or None), eq, vals


# --------------------------------------------------------------------------- #
# biodiversity indices
# --------------------------------------------------------------------------- #

def _c_shannon(g, m, text):
    nums = _num_list_after(text, "shannon")
    if not nums:
        nums = _num_list_after(text, "diversity index")
    if not nums or len(nums) < 2:
        return _GATE
    total = sum(nums)
    h = 0.0
    parts = []
    for n in nums:
        pi = n / total
        h += -pi * math.log(pi)
        parts.append(f"({_fmt(pi)})ln({_fmt(pi)})="
                     f"{_fmt(-pi * math.log(pi))}")
    steps = [f"Species counts: {nums}; total N = {_fmt(total)}.",
             "pi = count/N for each species; H = -SUM(pi ln pi).",
             "H = -[ " + " + ".join(parts) + " ]",
             f"H = {_fmt(h)}"]
    return h, steps, f"Shannon index H = {_fmt(h)}", None, \
        "H = -SUM(pi ln pi)", {"S": float(len(nums)), "N": total}


def _c_richness(g, m, text):
    nums = _num_list_after(text, "richness")
    if not nums:
        nums = _num_list_after(text, "species present")
    if not nums:
        return _GATE
    return float(len(nums)), [f"Distinct species counts listed: {nums}.",
                              f"Species richness S = {len(nums)}."], \
        f"species richness S = {len(nums)}", None, \
        "S = number of distinct species", {"S": float(len(nums))}


# --------------------------------------------------------------------------- #
# cell biology arithmetic
# --------------------------------------------------------------------------- #

_UM = {"um": 1.0, "\u00b5m": 1.0, "\u03bcm": 1.0, "micron": 1.0,
       "micrometre": 1.0, "micrometer": 1.0, "mm": 1000.0, "cm": 10000.0,
       "m": 1000000.0}
_UNIT_ALT = r"(\xb5m|um|\u03bcm|micron\w*|mm|cm|m)"


def _size_in_um(v: float, unit: str) -> float:
    return v * _UM.get(unit.lower(), 1.0)


def _c_magnification(g, m, text):
    im = re.search(r"image\D{0,30}?(\d+(?:\.\d+)?)\s*" + _UNIT_ALT + r"\b",
                   text, re.I)
    ac = re.search(r"actual\D{0,30}?(\d+(?:\.\d+)?)\s*" + _UNIT_ALT + r"\b",
                   text, re.I)
    mg = re.search(r"(?:magnification\D{0,15}?(\d+(?:\.\d+)?)\s*[x\u00d7]?)"
                   r"|((?:\d+(?:\.\d+)?)\s*[x\u00d7]\s*magnification)",
                   text, re.I)
    mg_v = None
    if mg:
        mg_v = float(mg.group(1) or (mg.group(2).split("x")[0].strip()
                                     if "x" in mg.group(2).lower()
                                     else mg.group(2).split("\u00d7")[0]))
    parts = sum(1 for x in (im, ac) if x) + (1 if mg_v is not None else 0)
    if parts < 2:
        return _GATE
    if im and ac:
        ium = _size_in_um(float(im.group(1)), im.group(2))
        aum = _size_in_um(float(ac.group(1)), ac.group(2))
        if aum <= 0:
            return _GATE
        M = ium / aum
        steps = [f"Image size = {_fmt(ium)} um.",
                 f"Actual size = {_fmt(aum)} um.",
                 f"M = image/actual = {_fmt(ium)}/{_fmt(aum)} = "
                 f"{_fmt(M)}x."]
        return M, steps, f"magnification = {_fmt(M)}x", None, \
            "M = image size / actual size", {"image_um": ium,
                                             "actual_um": aum}
    if mg_v is not None and ac:
        Mv = mg_v
        au = ac.group(2).lower()
        aum = _size_in_um(float(ac.group(1)), au)
        ium = Mv * aum
        out_v = ium / _UM[au]
        steps = [f"Actual size = {_fmt(aum)} um.",
                 f"Image size = M x actual = {_fmt(Mv)} x {_fmt(aum)} um "
                 f"= {_fmt(ium)} um = {_fmt(out_v)} {au}."]
        return out_v, steps, (f"image size = {_fmt(out_v)} {au} "
                              f"({Mv:g}x magnification)"), None, \
            "M = image size / actual size", {"image_um": ium,
                                             "actual_um": aum, "M": Mv}
    if mg_v is not None and im:
        Mv = mg_v
        iu = im.group(2).lower()
        ium = _size_in_um(float(im.group(1)), iu)
        if Mv <= 0:
            return _GATE
        aum = ium / Mv
        out_v = aum / _UM[iu]
        steps = [f"Image size = {_fmt(ium)} um.",
                 f"Actual size = image/M = {_fmt(ium)}/{_fmt(Mv)} = "
                 f"{_fmt(aum)} um = {_fmt(out_v)} {iu}."]
        return out_v, steps, f"actual size = {_fmt(out_v)} {iu}", None, \
            "M = image size / actual size", {"image_um": ium,
                                             "actual_um": aum, "M": Mv}
    return _GATE


def _c_field_of_view(g, m, text):
    fov = re.search(r"field\s+of\s+view\D{0,30}?(\d+(?:\.\d+)?)\s*"
                    + _UNIT_ALT + r"\b", text, re.I)
    cnt = re.search(r"(\d+)\s*(?:cells?|specimens?|objects?|bacteri\w+)",
                    text, re.I)
    size = re.search(r"(?:cell|specimen|object)\s+(?:size|diameter|length)"
                     r"\D{0,20}?(\d+(?:\.\d+)?)\s*" + _UNIT_ALT + r"\b",
                     text, re.I)
    if not fov or not (cnt or size):
        return _GATE
    fv, fu = float(fov.group(1)), fov.group(2).lower()
    if cnt:
        n = float(cnt.group(1))
        if n <= 0:
            return _GATE
        v = fv / n
        return v, [f"Field of view diameter = {_fmt(fv)} {fu}.",
                   f"{_fmt(n)} cells fit across the diameter.",
                   f"Size of one cell = {_fmt(fv)}/{_fmt(n)} = "
                   f"{_fmt(v)} {fu}."], \
            f"size of one cell = {_fmt(v)} {fu}", None, \
            "cell size = field-of-view diameter / cell count", \
            {"fov": fv, "n": n}
    sv = _size_in_um(float(size.group(1)), size.group(2)) / _UM[fu]
    if sv <= 0:
        return _GATE
    n = fv / sv
    return n, [f"Field of view diameter = {_fmt(fv)} {fu}.",
               f"Cell size = {_fmt(sv)} {fu}.",
               f"Cells across = {_fmt(fv)}/{_fmt(sv)} = {_fmt(n)}."], \
        f"{_fmt(n)} cells fit across", None, \
        "cell size = field-of-view diameter / cell count", \
        {"fov": fv, "n": n}


def _c_cell_division(g, m, text):
    if re.search(r"meios\s?is|meiotic", text, re.I):
        dn = re.search(r"2\s*n\s*=\s*(\d+)", text, re.I)
        if dn:
            n = float(dn.group(1)) / 2.0
            return n, [f"Parent cell: 2n = {dn.group(1)}.",
                       "Meiosis halves the chromosome number.",
                       f"Gametes: n = {dn.group(1)}/2 = {_fmt(n)}; "
                       "4 gametes are produced."], \
                f"gametes have n = {_fmt(n)} chromosomes (4 cells)", None, \
                "meiosis: 2n -> n, one cell -> 4 gametes", \
                {"2n": float(dn.group(1)), "n": n}
        if re.search(r"(?:how many|number of)\s+(?:daughter\s+)?cells",
                     text, re.I):
            return 4.0, ["Meiosis: one diploid cell -> 4 haploid cells."], \
                "4 haploid cells", None, "meiosis: one cell -> 4 cells", \
                {"cells": 4.0}
        return _GATE
    n_div = re.search(r"(\d+)\s*(?:rounds?|cycles?|generations?)?\s*"
                      r"(?:of\s+)?(?:mitotic\s+)?divisions?", text, re.I)
    if not n_div:
        return _GATE
    k = int(n_div.group(1))
    if k < 1 or k > 40:
        return _GATE
    c0 = re.search(r"(?:from|starting\s+with)\s+(\d+)\s*cells?", text, re.I)
    c = float(c0.group(1)) if c0 else 1.0
    cells = c * (2.0 ** k)
    steps = ["Mitosis doubles the cell count each division.",
             f"Cells = {c:g} x 2^{k} = {_fmt(cells)}."]
    return cells, steps, f"{_fmt(cells)} cells", None, \
        "mitosis: cells = start x 2^n", {"divisions": float(k),
                                         "cells": cells}


# --------------------------------------------------------------------------- #
# biotech: restriction sites, PCR, Chargaff
# --------------------------------------------------------------------------- #

_ENZYMES = {
    "ecori": "GAATTC", "bamhi": "GGATCC", "hindiii": "AAGCTT",
    "psti": "CTGCAG", "smai": "CCCGGG", "xhoi": "CTCGAG",
    "kpni": "GGTACC", "sali": "GTCGAC",
}


def _c_restriction(g, m, text):
    seqm = re.search(r"\b([ACGT][ACGT\s]{9,})", text)
    seq = re.sub(r"[^ACGT]", "", seqm.group(1).upper()) if seqm else ""
    if len(seq) < 10:
        return _GATE
    site = None
    lab = ""
    ex = re.search(r"\(\s*([ACGT]{4,8})\s*\)", text)
    if ex:
        site = ex.group(1).upper()
        lab = site
    else:
        nospace = re.sub(r"\s+", "", text).lower()
        for name, s in _ENZYMES.items():
            if name in nospace:
                site = s
                lab = f"{name.upper()} ({s})"
                break
    if not site:
        return _GATE
    count = seq.count(site)
    is_pal = site == site[::-1]
    steps = [f"Sequence length: {len(seq)} bp.",
             f"Restriction site: {lab}."
             + ("  The site is palindromic." if is_pal else ""),
             f"Occurrences of {site} in the sequence: {count}."]
    eq = "count occurrences of the recognition site"
    if re.search(r"fragments?", text, re.I):
        circular = bool(re.search(r"circular|plasmid", text, re.I))
        frags = count if circular else count + 1
        shape = "circular" if circular else "linear"
        steps.append(f"{shape.capitalize()} DNA cut at {count} "
                     f"site(s) -> {frags} fragment(s).")
        return float(frags), steps, (f"{frags} fragments ({shape} DNA, "
                                     f"{count} cut site(s))"), None, \
            "fragments = cuts + 1 (linear); = cuts (circular)", \
            {"sites": float(count), "fragments": float(frags),
             "seq_len": float(len(seq))}
    return float(count), steps, f"{count} restriction site(s)", None, eq, \
        {"sites": float(count), "seq_len": float(len(seq))}


def _c_pcr(g, m, text):
    if not re.search(r"PCR|polymerase\s+chain\s+reaction", text, re.I):
        return _GATE
    cyc = re.search(r"(\d+)\s*cycles?", text, re.I)
    if not cyc:
        return _GATE
    n = int(cyc.group(1))
    if n < 1 or n > 50:
        return _GATE
    c0 = re.search(r"(\d+)\s*(?:DNA\s+)?(?:copies|molecules?|templates?)",
                   text, re.I)
    c = float(c0.group(1)) if c0 else 1.0
    if c <= 0:
        return _GATE
    out = c * (2.0 ** n)
    steps = ["PCR doubles the DNA each cycle: copies = start x 2^n.",
             f"Copies = {_fmt(c)} x 2^{n} = {_fmt(out)}."]
    return out, steps, f"{_fmt(out)} copies", None, \
        "PCR: copies = start x 2^n", {"cycles": float(n), "copies": out}


_BASES = [("adenine", "A", "T"), ("thymine", "T", "A"),
          ("guanine", "G", "C"), ("cytosine", "C", "G")]


def _c_chargaff(g, m, text):
    if not re.search(r"DNA|chargaff|base\s+composition|nucleotides?",
                     text, re.I):
        return _GATE
    given = None
    for word, b, comp in _BASES:
        mm = re.search(word + r"\D{0,35}?(\d+(?:\.\d+)?)\s*%", text, re.I)
        if not mm:
            mm = re.search(r"(\d+(?:\.\d+)?)\s*%\D{0,35}?" + word, text,
                           re.I)
        if mm:
            given = (b, comp, float(mm.group(1)), word)
            break
    if not given:
        return _GATE
    b, comp, v, word = given
    if not (0 < v < 50):
        return _GATE
    comp_v = v
    rest = 100.0 - 2 * v
    other_v = rest / 2.0
    per_base = {}
    for w2, b2, c2 in _BASES:
        if b2 in (b, comp):
            per_base[b2] = v
        else:
            per_base[b2] = other_v
    steps = [f"Given: {word} = {_fmt(v)}% of the bases.",
             "Chargaff's rule: A = T and G = C.",
             f"{comp} = {word} = {_fmt(comp_v)}%.",
             f"{b} + {comp} = {2 * v:g}%; remaining {rest:g}% splits "
             f"equally between the other pair, so each = "
             f"{_fmt(other_v)}%."]
    # ask routing: a base word mentioned WITHOUT the given number
    asked = None
    for w2, b2, c2 in _BASES:
        if b2 == b:
            continue
        pat = (r"\b" + w2 + r"\b|\b" + b2 + r"\b(?=\s*[?=]|\s*%|\s+is|\s+"
               r"be\b)")
        for mm2 in re.finditer(pat, text, re.I):
            near = text[max(0, mm2.start() - 30):mm2.end() + 30]
            if re.search(r"(\d+(?:\.\d+)?)\s*%", near):
                continue  # this mention carries the given number
            asked = b2
            break
        if asked:
            break
    if asked:
        val = per_base[asked]
        wname = dict((b3, w3) for w3, b3, _ in _BASES)[asked]
        return val, steps, f"{wname} = {_fmt(val)}%", None, \
            "Chargaff: A=T, G=C; percentages sum to 100", per_base
    # default: one base of the other pair (guanine if A/T given, else A)
    other_letter = "G" if b in ("A", "T") else "A"
    return per_base[other_letter], steps, \
        (f"{'guanine' if other_letter == 'G' else 'adenine'} = "
         f"{_fmt(per_base[other_letter])}% (its pair partner is equal)"), \
        None, "Chargaff: A=T, G=C; percentages sum to 100", per_base


# --------------------------------------------------------------------------- #
# productivity & species-area
# --------------------------------------------------------------------------- #

def _c_npp(g, m, text):
    if not re.search(r"NPP|GPP|primary\s+productivity", text, re.I):
        return _GATE
    vals: Dict[str, float] = {}
    for lab, pat in (("GPP", r"GPP\D{0,20}?(\d+(?:\.\d+)?)"),
                     ("R", r"(?:respiration|R\s*=)\D{0,20}?"
                      r"(\d+(?:\.\d+)?)"),
                     ("NPP", r"NPP\D{0,20}?(\d+(?:\.\d+)?)")):
        mm = re.search(pat, text, re.I)
        if mm:
            vals[lab] = float(mm.group(1))
    if len(vals) < 2:
        return _GATE
    if "NPP" in vals and "GPP" in vals and "R" not in vals:
        r = vals["GPP"] - vals["NPP"]
        steps = [f"GPP = {_fmt(vals['GPP'])}, NPP = {_fmt(vals['NPP'])}.",
                 f"R = GPP - NPP = {_fmt(r)}."]
        return r, steps, f"R (respiration) = {_fmt(r)}", None, \
            "NPP = GPP - R", {"R": r, **vals}
    if "NPP" in vals and "R" in vals:
        v = vals["NPP"] + vals["R"]
        steps = [f"NPP = {_fmt(vals['NPP'])}, R = {_fmt(vals['R'])}.",
                 f"GPP = NPP + R = {_fmt(v)}."]
        return v, steps, f"GPP = {_fmt(v)}", None, "NPP = GPP - R", \
            {"GPP": v, **vals}
    if "GPP" in vals and "R" in vals:
        v = vals["GPP"] - vals["R"]
        steps = [f"GPP = {_fmt(vals['GPP'])}, R = {_fmt(vals['R'])}.",
                 f"NPP = GPP - R = {_fmt(v)}."]
        return v, steps, f"NPP = {_fmt(v)}", None, "NPP = GPP - R", \
            {"NPP": v, **vals}
    return _GATE


def _c_species_area(g, m, text):
    if not re.search(r"species[-\s]area|S\s*=\s*c\s*A\s*\^?\s*z", text,
                     re.I):
        return _GATE
    c = re.search(r"\bc\s*(?:=|is)?\s*(\d+(?:\.\d+)?)", text, re.I)
    z = re.search(r"\bz\s*(?:=|is)?\s*(\d+(?:\.\d+)?)\b", text, re.I)
    a = re.search(r"(?:\bA\s*(?:=|is)?\s*|area\s+(?:of|is)\s*)"
                  r"(\d+(?:\.\d+)?)", text, re.I)
    if not (c and z and a):
        return _GATE
    cv, zv, av = float(c.group(1)), float(z.group(1)), float(a.group(1))
    if cv <= 0 or av <= 0:
        return _GATE
    s = cv * (av ** zv)
    steps = [f"c = {_fmt(cv)}, z = {_fmt(zv)}, A = {_fmt(av)}.",
             f"S = cA^z = {_fmt(cv)} x {_fmt(av)}^{_fmt(zv)} = {_fmt(s)}."]
    return s, steps, f"S = {_fmt(s)} species", None, "S = c A^z", \
        {"c": cv, "z": zv, "A": av}


# --------------------------------------------------------------------------- #
# TABLE: (family_id, trigger, compute)
# --------------------------------------------------------------------------- #

_TABLE: List[Tuple[str, str, Any]] = [
    # ---- genetics (most specific first) ----
    ("SEX_LINKED_CROSS",
     r"X\s*-\s*linked|colour\s?-?\s?blind|color\s?-?\s?blind|haemophil|"
     r"hemophil|X[CcHh]?\s*[xX]\s*X|X[CcHh]?X[CcHh]?|X[CcHh]?Y",
     _c_sex_linked),
    ("BLOOD_GROUP_CROSS",
     r"(?:blood\s+)?group\s+[ABO]|homozygous\s+[AB]\b|heterozygous\s+[AB]\b|"
     r"\((AA|AO|BB|BO|AB|OO)\)",
     _c_blood_abo),
    ("BLOOD_GROUP_RH",
     r"\bRh\b|\bDd\b|\bdd\b|\bDD\b",
     _c_blood_rh),
    ("PUNNETT_CROSS", _PUNNETT_PAIR, _c_punnett),
    ("PUNNETT_SELF",
     r"self(?:[- ]?(?:pollinat\w+|fertilis\w+|fertiliz\w+)|\s*cross)",
     _c_punnett_self),
    ("PUNNETT_CROSS", _PUNNETT_LOOSE, _c_punnett),

    # ---- physiology ----
    ("PHOTOSYNTH_BALANCE",
     r"(?:balance|balanced)\b.{0,60}?(?:CO\s*2|photosynth)",
     _c_photo_balance),
    ("PHOTO_RESP_QUIZ",
     r"photosynth|chlorophyll|respirat|fermentation|raw\s+material|"
     r"energy\s+currency",
     _c_photo_resp_quiz),
    ("RQ_NUMERIC",
     r"RQ|respiratory\s+quotient|CO\s*2\s*(?:and|/)\s*O\s*2",
     _c_rq_numeric),
    ("RQ_SUBSTRATE",
     r"RQ|respiratory\s+quotient",
     _c_rq_substrate),

    # ---- ecology ----
    ("ENERGY_FLOW_10_PERCENT",
     r"10\s*%?\s*law|trophic|energy\s+(?:flow|transferr\w+|available|"
     r"reach\w+)|how\s+much\s+energy",
     _c_energy_flow),
    ("LOGISTIC_GROWTH",
     r"carrying\s+capacity|logistic",
     _c_logistic),
    ("POP_DOUBLING",
     r"doubles?|doubling",
     _c_pop_doubling),
    ("EXP_POP_GROWTH",
     r"(?:grows?|grew|increas\w+|exponential\w*)",
     _c_exp_growth),
    ("HARDY_WEINBERG",
     r"hardy|weinberg|h\s*-\s*w\b|(?:homozygous\s+recessive|heterozygous)"
     r".{0,60}?(?:population|allele)|population.{0,60}?(?:homozygous|"
     r"heterozygous|allele\s+frequency)",
     _c_hardy),
    ("SHANNON_INDEX",
     r"shannon|diversity\s+index",
     _c_shannon),
    ("SPECIES_RICHNESS",
     r"species\s+richness|richness",
     _c_richness),
    ("NPP_GPP",
     r"NPP|GPP|net\s+primary\s+productivity|gross\s+primary\s+"
     r"productivity",
     _c_npp),
    ("SPECIES_AREA",
     r"species[-\s]area|S\s*=\s*c\s*A\s*\^?\s*z",
     _c_species_area),

    # ---- cell biology ----
    ("CELL_MAGNIFICATION",
     r"magnification",
     _c_magnification),
    ("FIELD_OF_VIEW",
     r"field\s+of\s+view",
     _c_field_of_view),
    ("CELL_DIVISION_COUNT",
     r"mitosis|mitotic|meios\s?is|meiotic",
     _c_cell_division),

    # ---- biotech ----
    ("RESTRICTION_SITE_COUNT",
     r"restriction|EcoRI|BamHI|HindIII|PstI|SmaI|XhoI|KpnI|SalI|palindrom",
     _c_restriction),
    ("PCR_AMPLIFICATION",
     r"PCR|polymerase\s+chain\s+reaction",
     _c_pcr),
    ("CHARGAFF_DNA",
     r"chargaff|base\s+composition|adenine|guanine",
     _c_chargaff),
]

TABLE = _TABLE


def model_biology(text: str) -> ModelResult:
    """Dispatcher: scan every biology family; first grounded hit wins.

    Triggers are deterministic regexes; each row applies its own
    plausibility gates inside compute, and a gate refusal simply lets
    the scan continue.  Never calls an LLM.
    """
    norm = _normalize(text)
    for fid, pattern, compute in TABLE:
        m = re.search(pattern, norm, re.I)
        if not m:
            continue
        g = m.groupdict()
        try:
            out = compute(g, m, norm)
        except Exception:
            continue
        if not out:
            continue
        (value, steps, answer, assumptions, eq, extra) = \
            (list(out) + [None] * 6)[:6]
        if value is None and not steps:
            continue  # gate refused this row
        return _res(fid, g, value, eq or fid, steps or [], answer=answer,
                    assumptions=assumptions, extra=extra or {})
    return _no("BIOLOGY", "no biology family matched")


# The sandbox router (routers/sandbox.py) registers the biology subject as
# model_biology_families; modelling_layer registers model_biology.  One
# dispatcher, both names.
model_biology_families = model_biology
