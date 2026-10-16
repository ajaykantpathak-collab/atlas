"""biology_families.py -- biology & biotech families for classes 9-12 CBSE/ICSE.

Deterministic closed-form families in the maths2_families style: trigger
regex with named slots, plausibility gates inside compute, and a
ModelResult (matched=True, confidence >= 0.93, quantities dict,
governing equation, final answer string, numeric answer float, steps
list).  No LLM calls anywhere.

Families:
  genetics    PUNNETT_CROSS (mono- and dihybrid, any-question-form),
              PUNNETT_SELF, BLOOD_GROUP_CROSS (ABO), BLOOD_GROUP_RH,
              SEX_LINKED_CROSS (colour-blindness / haemophilia),
              PEDIGREE_PROBABILITY (autosomal pedigree risk chains)
  physiology  PHOTO_RESP_QUIZ, PHOTOSYNTH_BALANCE, RQ_NUMERIC,
              RQ_SUBSTRATE, CARDIAC_OUTPUT, BREATHING_VOLUME
              (lung volumes/capacities), TRANSPIRATION_RATE (potometer)
  ecology     ENERGY_FLOW_10_PERCENT, EXP_POP_GROWTH, POP_DOUBLING,
              LOGISTIC_GROWTH, HARDY_WEINBERG, SHANNON_INDEX,
              SPECIES_RICHNESS, NPP_GPP, SPECIES_AREA
  cell bio    CELL_MAGNIFICATION, FIELD_OF_VIEW, CELL_DIVISION_COUNT
  biotech     RESTRICTION_SITE_COUNT, PCR_AMPLIFICATION, CHARGAFF_DNA

STEP CONTRACT (enforced by test_biology_families.py): every matched
answer carries >= 3 steps totalling >= 200 chars in the 5-beat shape --
method/principle line, given-values restatement, computation shown,
verification check, biological interpretation.

Dispatcher: model_biology(text) -> ModelResult (first grounded row
wins; a gate refusal lets the scan continue).  Deterministic only.

WS-B merge (2026-10-10): biotech_numeric_families.py dissolved into
this file per the consolidation map step 4 -- BIO_HEMOCYTOMETER
moved verbatim (ids unchanged; verifier keys keep hitting).
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

    steps = ["Method: Punnett square -- every gamete of parent 1 meets "
             "every gamete of parent 2, so each box is 1/total of the "
             "offspring (Mendel's law of segregation; independent "
             "assortment across genes).",
             f"Given: cross {p1} x {p2} ({n_genes} gene pair(s)).",
             f"Parent 1 ({p1}) produces gametes: " + ", ".join(gam1) + ".",
             f"Parent 2 ({p2}) produces gametes: " + ", ".join(gam2) + "."]
    steps.extend(_grid_lines(gam1, gam2, cells))
    steps.append(f"Genotype ratio: {geno_ratio}")
    steps.append(f"Phenotype ratio: {pheno_ratio}")
    steps.append(f"Check: {len(gam1)} x {len(gam2)} = {total} equally "
                 "likely boxes and the genotype counts above sum to "
                 f"{sum(gcounts.values())}.")
    steps.append("Interpretation: probabilities are box counts over the "
                 f"{total} boxes ({_pct(1.0 / total)} each); a dominant "
                 "allele masks a recessive one in any heterozygote.")

    eq = "Punnett square: P1 gametes x P2 gametes; P = favourable / total"

    # -- ask routing ------------------------------------------------------- #
    # GAMETES ask (2026-10-07 P0, c10 sweep c10_bio_cbse_04_004#d3):
    # "List all possible gametes this plant can produce..." -- the
    # family answered the F2 cross instead.  The gamete set of p1 IS
    # the ask: 2^n types in equal ratio, n = heterozygous gene pairs
    # (Law of Independent Assortment).
    if re.search(r"gametes?\b", text, re.I) and not re.search(
            r"gamete\s+fusion|fusion\s+of\s+gametes|male\s+gamete|"
            r"female\s+gamete", text, re.I):
        gam = _gametes(p1)
        n_het = sum(1 for i in range(0, len(p1), 2)
                    if p1[i].lower() != p1[i + 1].lower())
        ratio = ":".join("1" for _ in gam)
        g_steps = list(steps) + [
            f"Gametes of {p1}: one allele from EVERY gene pair enters "
            "each gamete.",
            f"{n_het} heterozygous pair(s) -> 2^{n_het} = {len(gam)} "
            "gamete types, all equally likely (Law of Independent "
            "Assortment).",
        ]
        return (None, g_steps,
                ("gametes: " + ", ".join(gam)
                 + f" ({len(gam)} types in equal {ratio} ratio)"),
                None,
                "independent assortment: 2^n gamete types, n = "
                "heterozygous pairs",
                {"n_gametes": float(len(gam))})
    # F2-COUNT ask (2026-10-07 P0, c10 sweep c10_bio_cbse_04_003#d3):
    # "The F1 plants are self-pollinated. If the F2 generation has N
    # plants, how many are expected to be wrinkled yellow?" -- the
    # family answered the P1 cross (1/1 dominant).  Chain F1 = P1 x P2
    # (heterozygous at every differing gene), F2 = F1 x F1, and scale
    # the requested phenotype class by N.  Only fires when every trait
    # word can be CLASSIFIED against the parental clauses -- otherwise
    # the family refuses rather than guess the class.
    mf2 = re.search(
        r"f\s*1[^.]{0,60}?(?:self[- ]?pollinat\w+|selfed)\s*\.?"
        r"[^.]{0,80}?f\s*2[^.]{0,60}?(\d[\d,]*)\s+plants?[^.]{0,160}?"
        r"how\s+many[^.]{0,80}?([a-z\-]+(?:\s+[a-z\-]+)?)\s*\?", text, re.I)
    if mf2:
        n_plants = float(mf2.group(1).replace(",", ""))
        raw_words = mf2.group(2).split()
        # dominant clause = around p1, recessive clause = around p2
        i1, i2 = text.find(p1), text.find(p2)
        if i1 < 0 or i2 < 0 or n_plants <= 0:
            mf2 = None
        else:
            cls_words = []
            for w in raw_words:
                wpos = [m.start() for m in re.finditer(
                    r"\b" + re.escape(w) + r"\b", text, re.I)]
                # classify by the FIRST mention: the trait describes the
                # parent clause it stands nearest to (NCERT wording
                # names the dominant parent's traits first)
                dom = None
                if wpos:
                    first = wpos[0]
                    if abs(first - i1) <= abs(first - i2):
                        dom = True
                    else:
                        dom = False
                if dom is None:
                    cls_words = None
                    break
                cls_words.append("dom" if dom else "rec")
            if cls_words and len(cls_words) == n_genes:
                # F2 = F1 x F1 requires a UNIFORM F1, which only holds
                # when both parents are true-breeding (homozygous at
                # every gene).  Per gene then: same homozygous allele
                # both sides -> the F2 class is FIXED; differing
                # homozygotes (RR x rr) -> F1 is the heterozygote and
                # the F2 class segregates 3/4 : 1/4.
                homo1 = all(p1[i].isupper() == p1[i + 1].isupper()
                            for i in range(0, len(p1), 2))
                homo2 = all(p2[i].isupper() == p2[i + 1].isupper()
                            for i in range(0, len(p2), 2))
                frac = 1.0
                for gi in range(n_genes):
                    a = p1[2 * gi:2 * gi + 2]
                    b = p2[2 * gi:2 * gi + 2]
                    if a == b:
                        # same allele both sides: RR x RR or rr x rr
                        fixed_dom = a[0].isupper()
                        if (cls_words[gi] == "dom") != fixed_dom:
                            frac = 0.0
                            break
                    elif homo1 and homo2:
                        # RR x rr: F1 is the heterozygote -> 3:1
                        frac *= 0.75 if cls_words[gi] == "dom" else 0.25
                    else:
                        frac = 0.0
                        break
                if 0 < frac <= 1:
                    count = n_plants * frac
                    csteps = list(steps) + [
                        "F1 genotype: heterozygous at every gene where "
                        "the parents differ (each parent was true-"
                        "breeding).",
                        "F2 = F1 x F1: per gene 3/4 dominant : 1/4 "
                        "recessive; product across genes.",
                        f"Requested class fraction = {frac:.6g}; "
                        f"{n_plants:g} x {frac:.6g} = {count:g}.",
                    ]
                    return count, csteps, (
                        f"{int(round(count))} plants out of "
                        f"{int(n_plants)} are "
                        + " ".join(raw_words)
                        + f" ({count:g} = {n_plants:g} x {frac:.6g})"), \
                        None, "F2 phenotype class fraction x N", \
                        {"f2_count": count}
    if re.search(r"geno(?:type|typic)\s+ratios?\b", text, re.I):
        return None, steps, f"genotype ratio {geno_ratio}", None, eq, \
            {"total_offspring": float(total)}
    if re.search(r"pheno(?:type|typic)\s+ratios?\b", text, re.I):
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
    steps = ["Method: ABO inheritance -- each parent passes one of its "
             "two alleles; A and B are co-dominant, O is recessive.",
             f"Parent 1 genotype {p1} (group {_ABO_PHENO[p1]}) gametes: "
             + ", ".join(gam1) + ".",
             f"Parent 2 genotype {p2} (group {_ABO_PHENO[p2]}) gametes: "
             + ", ".join(gam2) + ".",
             "Child genotypes: " + ", ".join(kid_geno) + ".",
             "Child phenotype probabilities: "
             + ", ".join(f"{k}: {_pct(probs[k])}" for k in _ABO_ORDER) + ".",
             f"Check: {total} equally likely fertilisations ({len(gam1)} x "
             f"{len(gam2)}); the four group probabilities sum to 100%.",
             "Interpretation: a group-O child proves both parents carry "
             "the O allele, and an AB parent can never have an O child."]
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
    steps = ["Method: Rh factor -- D is dominant over d; only dd children "
             "are Rh negative (the erythroblastosis-risk pairing).",
             f"Parent 1 genotype {p1} gametes: " + ", ".join(gam1) + ".",
             f"Parent 2 genotype {p2} gametes: " + ", ".join(gam2) + ".",
             "Children: "
             + ", ".join(f"{k} x{n}" for k, n in sorted(kids.items())) + ".",
             f"Rh- children: {neg}/{total}; Rh+ children: "
             f"{total - neg}/{total}.",
             f"Check: {total} equally likely combinations and the Rh+ and "
             "Rh- fractions sum to 100%.",
             "Interpretation: an Rh- child must receive d from both "
             "parents -- a homozygous DD parent can never have one."]
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
    lines = ["Method: X-linked cross -- the mother's X reaches every "
             "child, the father's X only daughters (sons get his Y); a "
             "recessive condition on X shows in sons who receive it.",
             f"Mother {mother[1]} x Father {father[1]} ({cond_name}).",
             "Daughters: " + ", ".join(f"{mX[i]}X{fX[1]}"
                                       for i in range(2)) + ".",
             "Sons: " + ", ".join(f"{mX[i]}Y" for i in range(2)) + ".",
             f"Breakdown: carrier daughters {cats['carrier_d']}/4, "
             f"affected daughters {cats['affected_d']}/4, "
             f"normal daughters {cats['normal_d']}/4, "
             f"normal sons {cats['normal_s']}/4, "
             f"affected sons {cats['affected_s']}/4.",
             f"Check: 2 x 2 = {total} equally likely children; the "
             "breakdown categories above sum to 4/4.",
             "Interpretation: an affected son must get his single X from "
             "his mother, which is why X-linked recessives pass from "
             "carrier mothers to sons."]
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

_PHOTO_FACTS: List[Tuple[str, str, str, str]] = [
    (r"word\s+equation",
     "photosynthesis word equation: carbon dioxide + water "
     "--(sunlight, chlorophyll)--> glucose + oxygen",
     "Cross-check: the balanced form is 6 CO2 + 6 H2O --> C6H12O6 + 6 O2.",
     "Interpretation: light and chlorophyll drive the change; the plant "
     "builds its own food from inorganic inputs."),
    (r"(?:gas|gases).{0,40}\b(released|produced|evolved|given\s+out|"
     r"liberated|bubbles)",
     "oxygen (O2) is released during photosynthesis",
     "Cross-check: the oxygen comes from splitting water in the light "
     "reaction, not from CO2.",
     "Interpretation: that is why an aquatic plant bubbles oxygen in "
     "bright light."),
    (r"\b(?:gas|gases)\b.{0,40}\b(absorbed|taken\s+in|used|consumed|"
     r"intake)",
     "carbon dioxide (CO2) is absorbed during photosynthesis",
     "Cross-check: CO2 enters through the stomata and is fixed in the "
     "Calvin cycle.",
     "Interpretation: stomata close on hot dry days, cutting CO2 intake "
     "and slowing photosynthesis."),
    (r"raw\s+materials?",
     "raw materials of photosynthesis: carbon dioxide and water "
     "(with sunlight and chlorophyll)",
     "Cross-check: the balanced equation 6 CO2 + 6 H2O --> C6H12O6 + 6 O2 "
     "has exactly these inputs.",
     "Interpretation: without light, chlorophyll, CO2 or water the "
     "process stops and the plant lives on stored food."),
    (r"(?:end|final)\s+products?|main\s+product",
     "end product of photosynthesis: glucose (food); oxygen is the "
     "by-product",
     "Cross-check: 1 glucose is built per 6 CO2 fixed; surplus glucose is "
     "stored as starch.",
     "Interpretation: glucose is the energy store; the oxygen supports "
     "aerobic respiration."),
    (r"\b(?:site|sites)\b|takes?\s+place|chloroplast",
     "site of photosynthesis: chloroplast (chlorophyll in chloroplasts)",
     "Cross-check: thylakoid membranes run the light reaction; the stroma "
     "runs the dark reaction.",
     "Interpretation: that is why a leaf tests positive for starch after "
     "a sunny day."),
    (r"energy\s+source|source\s+of\s+energy",
     "energy source for photosynthesis: sunlight (solar energy)",
     "Cross-check: light energy is converted to chemical energy in ATP "
     "and NADPH.",
     "Interpretation: photosynthesis is the entry point of solar energy "
     "into the food chain."),
    (r"by\s*-?\s?product",
     "by-product of photosynthesis: oxygen",
     "Cross-check: 6 O2 released per glucose -- the same oxygen your "
     "respiration uses.",
     "Interpretation: plants respire all day; the gas released in "
     "daylight is net oxygen."),
]

_RESP_FACTS: List[Tuple[str, str, str, str]] = [
    (r"word\s+equation",
     "respiration word equation: glucose + oxygen --> carbon dioxide "
     "+ water + energy (ATP)",
     "Cross-check: respiration releases the energy photosynthesis stored "
     "in glucose.",
     "Interpretation: all cells respire day and night to power life."),
    (r"energy\s+currency",
     "energy currency of the cell: ATP (adenosine triphosphate)",
     "Cross-check: ATP -> ADP + phosphate releases the terminal-phosphate "
     "energy for cell work.",
     "Interpretation: ATP is regenerated in mitochondria during oxidative "
     "phosphorylation."),
    (r"anaerobic.{0,40}(yeast|fermentation)",
     "anaerobic respiration in yeast: glucose --> ethanol + carbon "
     "dioxide + energy (fermentation)",
     "Cross-check: glucose (C6H12O6) -> 2 ethanol + 2 CO2 + only 2 ATP.",
     "Interpretation: fermentation yields ~2 ATP per glucose versus "
     "~36-38 aerobically."),
    (r"anaerobic.{0,40}(muscle|cramp)",
     "anaerobic respiration in human muscle: glucose --> lactic acid "
     "+ energy",
     "Cross-check: without oxygen the pyruvate is reduced to lactic acid, "
     "not fully oxidised.",
     "Interpretation: the accumulated lactic acid causes the cramp; the "
     "oxygen debt clears it later."),
    # (?<!an) -- "anaerobic" contains the substring "aerobic"; without the
    # lookbehind the claim "anaerobic respiration gives only 2 ATP..."
    # shipped the AEROBIC equation as VERIFIED (class-10 corpus sweep,
    # c10_bio_cbse_01_007#d3, 2026-10-06).
    (r"(?<!an)aerobic",
     "aerobic respiration: glucose + oxygen --> carbon dioxide + water "
     "+ energy",
     "Cross-check: glucose is fully oxidised to CO2 and water inside the "
     "mitochondria.",
     "Interpretation: aerobic respiration releases far more energy than "
     "fermentation."),
    (r"(?:site|mitochondri)",
     "site of aerobic respiration: mitochondria (powerhouse of the cell)",
     "Cross-check: glycolysis is cytoplasmic; the Krebs cycle and "
     "electron transport are mitochondrial.",
     "Interpretation: the folded cristae pack in more respiratory "
     "enzymes."),
]


def _c_photo_resp_quiz(g, m, text):
    # quantitative territory: RQ and productivity families own these asks
    if re.search(r"GPP|NPP|primary\s+productivity|respiratory\s+quotient|"
                 r"\bRQ\b", text, re.I):
        return _GATE
    is_photo = bool(re.search(r"photosynth|chlorophyll", text, re.I))
    is_resp = bool(re.search(r"respirat|fermentation|breathing", text,
                             re.I))
    topic = "photosynthesis" if is_photo else "respiration"
    facts = _PHOTO_FACTS if is_photo else (_RESP_FACTS if is_resp else [])

    def _quiz_steps(ans: str, check: str, interp: str) -> List[str]:
        return ["Method: closed-world NCERT fact table -- the matched "
                "keyword routes to a fixed authored answer (no "
                "invention).",
                f"Given: the question asks about {topic}.",
                f"Answer: {ans}.", check, interp]

    for pat, ans, check, interp in facts:
        if re.search(pat, text, re.I):
            return None, _quiz_steps(ans, check, interp), ans, None, \
                "NCERT biology fact table", {}
    # default word-equation only when the question is about the equation
    # AEROBIC-ONLY guard (class-10 corpus sweep, c10_bio_cbse_01_007#d2,
    # 2026-10-06): the default equation is the AEROBIC one -- an
    # anaerobic/fermentation analysis ("Yeast cells produce ethanol and
    # CO2...") must not receive it as VERIFIED.
    if re.search(r"anaerobic|fermentation|ethanol|lactic", text, re.I):
        return _GATE
    if is_photo and re.search(r"equation|CO\s*2|glucose", text, re.I):
        ans, check, interp = _PHOTO_FACTS[0][1], \
            _PHOTO_FACTS[0][2], _PHOTO_FACTS[0][3]
        return None, _quiz_steps(ans, check, interp), ans, \
            None, "NCERT biology fact table", {}
    if is_resp and re.search(r"equation|glucose|ATP", text, re.I):
        ans, check, interp = _RESP_FACTS[0][1], \
            _RESP_FACTS[0][2], _RESP_FACTS[0][3]
        return None, _quiz_steps(ans, check, interp), ans, \
            None, "NCERT biology fact table", {}
    return _GATE


def _c_photo_balance(g, m, text):
    if not re.search(r"CO\s*2", text, re.I) or \
            not re.search(r"C\s*6\s*H\s*12\s*O\s*6", text, re.I):
        return _GATE
    steps = ["Method: balance by atom conservation -- each element must "
             "appear the same number of times on both sides.",
             "Given: unbalanced skeleton CO2 + H2O -> C6H12O6 + O2 "
             "(photosynthesis).",
             "Photosynthesis: 6 CO2 + 6 H2O --(sunlight, chlorophyll)--> "
             "C6H12O6 + 6 O2.",
             "Atom check: C 6 = 6, H 12 = 12, O (6 + 12) = 18 = (6 + 12).",
             "Interpretation: the coefficients 6, 6, 1, 6 are the mole "
             "ratio -- 6 CO2 and 6 H2O build 1 glucose and release 6 O2."]
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
    interp = ("RQ = 1 is typical of carbohydrates (e.g. glucose)."
              if rq == 1.0 else
              "RQ < 1 is typical of fats (~0.7) and proteins (~0.8)."
              if rq < 1.0 else
              "RQ > 1 is typical of organic acids (e.g. malic acid, 1.33).")
    steps = ["Method: the respiratory quotient compares gas exchange -- "
             "RQ = volume of CO2 evolved / volume of O2 consumed for the "
             "substrate being respired.",
             f"Given: CO2 evolved = {_fmt(c)}, O2 consumed = {_fmt(o)}.",
             f"RQ = CO2/O2 = {_fmt(c)}/{_fmt(o)} = {_fmt(rq)}.",
             f"Check: back-calculation {_fmt(rq)} x {_fmt(o)} = "
             f"{_fmt(rq * o)} = the CO2 evolved.",
             f"Interpretation: {interp}"]
    return rq, steps, f"RQ = {_fmt(rq)}", None, \
        "RQ = CO2 evolved / O2 consumed", {"co2": c, "o2": o}


_RQ_SUBSTRATE = [
    (r"glucose|carbohydrate|sucrose", 1.0,
     "carbohydrates (glucose): RQ = 1",
     "Check: glucose is fully oxidised -- every O2 taken in yields one "
     "CO2 out (C6H12O6 + 6 O2 -> 6 CO2 + 6 H2O).",
     "Interpretation: equal gas exchange gives RQ = 1 for carbohydrates."),
    (r"\bfats?\b|\blipids?\b|\boils?\b", 0.7, "fats: RQ = 0.7",
     "Check: fats are less oxidised than carbohydrates, so they need "
     "extra O2 per CO2 released -- 0.7 < 1.",
     "Interpretation: fats give more energy per gram but demand more "
     "oxygen to burn."),
    (r"proteins?", 0.8, "proteins: RQ = 0.8 (about 0.8-0.9)",
     "Check: proteins are less oxidised than carbohydrate but more than "
     "fat, so 0.8 lies between 0.7 and 1.",
     "Interpretation: proteins are rarely the main fuel; an RQ near 0.8 "
     "hints at protein metabolism."),
    (r"malic|organic\s+acid", 1.33,
     "organic acids (malic acid): RQ = 1.33",
     "Check: organic acids already carry oxygen, so they release more "
     "CO2 than the O2 they absorb -- 1.33 > 1.",
     "Interpretation: succulent plants show RQ > 1 when organic acids "
     "are respired."),
]


def _c_rq_substrate(g, m, text):
    for pat, val, ans, check, interp in _RQ_SUBSTRATE:
        if re.search(pat, text, re.I):
            steps = ["Method: each respiratory substrate has a standard "
                     "RQ fixed by how its oxidation balances O2 uptake "
                     "against CO2 release.",
                     "Given: the substrate named in the question.",
                     f"Answer: {ans}.", check, interp]
            return val, steps, ans, \
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
    steps = ["Method: Lindeman's 10 percent law -- only about 10% of the "
             "energy at one trophic level passes to the next; the rest "
             "is lost to respiration and heat.",
             f"Given: {_fmt(given[3])} {given[4]} at the {given[2]} level.",
             f"Hops from {given[2]} to {ask[2]}: {hops}.",
             f"Energy = {given[3]:g} x (0.1)^{hops} = {_fmt(energy)} "
             f"{given[4]}.",
             f"Check: {hops} hops back up, {_fmt(energy)} x "
             f"{_fmt(10.0 ** hops)} = {_fmt(given[3])} {given[4]} -- "
             "consistent.",
             "Interpretation: steep losses like this are why food chains "
             "rarely exceed 4-5 trophic levels and top carnivores are "
             "always few."]
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
    steps = ["Method: unrestricted exponential growth follows the "
             "J-shaped curve N = N0 e^(rt).",
             f"N0 = {_fmt(n0v)}, r = {_fmt(rv)} per {t.group(2)}, "
             f"t = {_fmt(tv)} {t.group(2)}.",
             f"N = N0 e^(rt) = {_fmt(n0v)} x e^({_fmt(rv)}x{_fmt(tv)}) "
             f"= {_fmt(n)}.",
             f"Check: ln(N/N0) = ln({_fmt(n / n0v)}) = {_fmt(rv * tv)} "
             f"= r x t.",
             "Interpretation: with no limiting factors growth accelerates "
             "indefinitely -- real populations slow as resources run "
             "out."]
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
    steps = ["Method: a population that doubles every fixed interval "
             "grows geometrically, N = N0 x 2^(t/td).",
             f"Doubling time = {_fmt(d)} {d_u}; elapsed = {_fmt(tv)} "
             f"minutes.",
             f"Generations = {_fmt(tv)}/{_fmt(d)} = {_fmt(gens)}.",
             f"N = N0 x 2^generations = {_fmt(n0v)} x 2^{_fmt(gens)} "
             f"= {_fmt(n)}.",
             f"Check: {_fmt(n)}/{_fmt(n0v)} = {_fmt(n / n0v)} = "
             f"2^{_fmt(gens)} -- consistent.",
             "Interpretation: bacterial J-curves level off once nutrients "
             "are exhausted and waste accumulates."]
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
    steps = ["Method: logistic growth, dN/dt = rN(K - N)/K -- growth "
             "slows as N approaches the carrying capacity K.",
             f"K = {_fmt(Kv)}, N0 = {_fmt(n0v)}, r = {_fmt(rv)}, "
             f"t = {_fmt(tv)}.",
             f"e^(rt) = e^({_fmt(rv)}x{_fmt(tv)}) = {_fmt(ert)}.",
             "N = K N0 e^(rt) / (K + N0 (e^(rt) - 1))",
             f"N = {_fmt(n)}.",
             f"Check: N0 < N < K ({_fmt(n0v)} < {_fmt(n)} < {_fmt(Kv)}) "
             "and N rises monotonically with t -- consistent.",
             "Interpretation: the sigmoid (S-shaped) curve levels off at "
             "K -- natural populations are resource-limited."]
    return n, steps, f"N = {_fmt(n)} individuals", None, \
        "logistic: N = K N0 e^(rt) / (K + N0 (e^(rt) - 1))", \
        {"K": Kv, "N0": n0v, "r": rv, "t": tv}


# --------------------------------------------------------------------------- #
# Hardy-Weinberg
# --------------------------------------------------------------------------- #

_HW_CONCEPTS = [
    # genotype frequencies are the most specific givens -- checked by
    # nearest-number distance below, order only breaks ties
    (r"homozygous\s+recessive|recessive\s+(?:trait|phenotype|condition)",
     "q2", "homozygous recessive (q^2)"),
    (r"homozygous\s+dominant", "p2", "homozygous dominant (p^2)"),
    (r"heterozygous|carriers?", "hetero", "heterozygous (2pq)"),
    (r"frequency\s+(?:of\s+)?(?:the\s+)?recessive\s+allele", "q",
     "recessive allele frequency (q)"),
    (r"frequency\s+(?:of\s+)?(?:the\s+)?dominant\s+allele", "p",
     "dominant allele frequency (p)"),
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
    nums = list(re.finditer(r"(\d+(?:\.\d+)?)\s*(%|percent)?", text))
    best_d, best_ci = 999, 999
    for ci, (pat, key, label) in enumerate(_HW_CONCEPTS):
        mm = re.search(pat, text, re.I)
        if not mm:
            continue
        # nearest number to THIS concept phrase (within 60 chars)
        dmin = 999
        pick = None
        for nm in nums:
            if nm.end() <= mm.start():
                d = mm.start() - nm.end()
            elif nm.start() >= mm.end():
                d = nm.start() - mm.end()
            else:
                d = 0
            if d < dmin and d <= 60:
                dmin = d
                pick = nm
        if pick is None:
            continue
        v = float(pick.group(1))
        if pick.group(2) or v > 1:
            v = v / 100.0
        if (dmin, ci) < (best_d, best_ci):
            best_d, best_ci = dmin, ci
            given = (key, v, label)
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
    steps = ["Method: Hardy-Weinberg principle -- a large, randomly "
             "mating population with no selection keeps allele "
             "frequencies constant: p^2 + 2pq + q^2 = 1, p + q = 1.",
             f"Given: {label} = {_fmt(v)}.",
             f"q = {_fmt(q)}, p = {_fmt(p)}.",
             f"p^2 = {_fmt(p2)} ({_pct(p2)}), 2pq = {_fmt(hetero)} "
             f"({_pct(hetero)}), q^2 = {_fmt(q2)} ({_pct(q2)}).",
             f"Check: {_fmt(p2)} + {_fmt(hetero)} + {_fmt(q2)} = "
             f"{_fmt(p2 + hetero + q2)} = 1.",
             "Interpretation: heterozygous carriers hide the recessive "
             "allele, so rare conditions persist unseen in carriers."]
    vals = {"p": p, "q": q, "p2": p2, "hetero": hetero, "q2": q2}
    eq = "p^2 + 2pq + q^2 = 1, p + q = 1"
    # ask routing reads only the question tail (after the ask verb) so a
    # given mention ("32 percent are heterozygous") cannot hijack the ask
    ask_verb = re.search(r"\b(?:find|what\s+is|what\s+are|calculate|"
                         r"determine|compute|how\s+(?:many|much))\b",
                         text, re.I)
    tail = text[ask_verb.end():] if ask_verb else text
    for pat, vkey, ans in _HW_ASKS:
        if re.search(pat, tail, re.I):
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
    steps = ["Method: Shannon diversity index H = -SUM(pi ln pi) weights "
             "each species by its proportional abundance.",
             f"Species counts: {nums}; total N = {_fmt(total)}.",
             "pi = count/N for each species; H = -SUM(pi ln pi).",
             "H = -[ " + " + ".join(parts) + " ]",
             f"H = {_fmt(h)}",
             f"Check: the pi values sum to "
             f"{_fmt(sum(n / total for n in nums))} = 1.",
             "Interpretation: H grows with species number AND evenness; "
             "H = 0 means one single dominant species."]
    return h, steps, f"Shannon index H = {_fmt(h)}", None, \
        "H = -SUM(pi ln pi)", {"S": float(len(nums)), "N": total}


def _c_richness(g, m, text):
    nums = _num_list_after(text, "richness")
    if not nums:
        nums = _num_list_after(text, "species present")
    if not nums:
        return _GATE
    return float(len(nums)), \
        ["Method: species richness S counts the distinct species in a "
         "community, ignoring how many of each.",
         f"Given: species counts listed = {nums}.",
         f"S = number of distinct species = {len(nums)}.",
         f"Check: recount of the distinct list gives {len(nums)} "
         "entries.",
         "Interpretation: richness alone misses evenness -- two areas "
         "with the same S can differ in their Shannon H."], \
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
        steps = ["Method: magnification M = image size / actual size, "
                 "with both sizes first converted to the same unit.",
                 f"Image size = {_fmt(ium)} um.",
                 f"Actual size = {_fmt(aum)} um.",
                 f"M = image/actual = {_fmt(ium)}/{_fmt(aum)} = "
                 f"{_fmt(M)}x.",
                 f"Check: {_fmt(ium)} / {_fmt(M)} = {_fmt(aum)} um -- "
                 "inverts back to the actual size.",
                 "Interpretation: total microscope magnification = "
                 "objective x eyepiece; resolution still limits the "
                 "detail you can see."]
        return M, steps, f"magnification = {_fmt(M)}x", None, \
            "M = image size / actual size", {"image_um": ium,
                                             "actual_um": aum}
    if mg_v is not None and ac:
        Mv = mg_v
        au = ac.group(2).lower()
        aum = _size_in_um(float(ac.group(1)), au)
        ium = Mv * aum
        out_v = ium / _UM[au]
        steps = ["Method: magnification M = image size / actual size, so "
                 "image = M x actual.",
                 f"Actual size = {_fmt(aum)} um.",
                 f"Image size = M x actual = {_fmt(Mv)} x {_fmt(aum)} um "
                 f"= {_fmt(ium)} um = {_fmt(out_v)} {au}.",
                 f"Check: image / M = {_fmt(ium)}/{_fmt(Mv)} = "
                 f"{_fmt(aum)} um -- consistent.",
                 "Interpretation: magnification multiplies every length "
                 "of the specimen equally."]
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
        steps = ["Method: magnification M = image size / actual size, so "
                 "actual = image / M.",
                 f"Image size = {_fmt(ium)} um.",
                 f"Actual size = image/M = {_fmt(ium)}/{_fmt(Mv)} = "
                 f"{_fmt(aum)} um = {_fmt(out_v)} {iu}.",
                 f"Check: actual x M = {_fmt(aum)} x {_fmt(Mv)} = "
                 f"{_fmt(ium)} um -- consistent.",
                 "Interpretation: dividing the drawing size by M recovers "
                 "the true cell size."]
        return out_v, steps, f"actual size = {_fmt(out_v)} {iu}", None, \
            "M = image size / actual size", {"image_um": ium,
                                             "actual_um": aum, "M": Mv}
    return _GATE


def _c_field_of_view(g, m, text):
    fov = re.search(r"field\s+of\s+view\D{0,30}?(\d+(?:\.\d+)?)\s*"
                    + _UNIT_ALT + r"\b", text, re.I)
    cnt = re.search(r"(\d+)\s*(?:cells?|specimens?|objects?|bacteri\w+)",
                    text, re.I)
    size = re.search(r"(?:cell|specimen|object)\s+(?:size|diameter|"
                     r"length|measures)"
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
        return v, ["Method: estimate specimen size by counting how many "
                   "fit across the field-of-view diameter.",
                   f"Field of view diameter = {_fmt(fv)} {fu}.",
                   f"{_fmt(n)} cells fit across the diameter.",
                   f"Size of one cell = {_fmt(fv)}/{_fmt(n)} = "
                   f"{_fmt(v)} {fu}.",
                   f"Check: {n:g} x {_fmt(v)} = {_fmt(fv)} {fu} -- the "
                   "full diameter.",
                   "Interpretation: higher magnification shrinks the "
                   "field, so more magnification is not automatically "
                   "more useful."], \
            f"size of one cell = {_fmt(v)} {fu}", None, \
            "cell size = field-of-view diameter / cell count", \
            {"fov": fv, "n": n}
    sv = _size_in_um(float(size.group(1)), size.group(2)) / _UM[fu]
    if sv <= 0:
        return _GATE
    n = fv / sv
    return n, ["Method: cells-across = field-of-view diameter / cell "
               "size.",
               f"Field of view diameter = {_fmt(fv)} {fu}.",
               f"Cell size = {_fmt(sv)} {fu}.",
               f"Cells across = {_fmt(fv)}/{_fmt(sv)} = {_fmt(n)}.",
               f"Check: {_fmt(n)} x {_fmt(sv)} = {_fmt(fv)} {fu} -- the "
               "full diameter.",
               "Interpretation: fewer, larger cells fit at low power; "
               "switching objectives changes the count, not the cells."], \
        f"{_fmt(n)} cells fit across", None, \
        "cell size = field-of-view diameter / cell count", \
        {"fov": fv, "n": n}


def _c_cell_division(g, m, text):
    if re.search(r"meios\s?is|meiotic", text, re.I):
        dn = re.search(r"2\s*n\s*=\s*(\d+)", text, re.I)
        if dn:
            n = float(dn.group(1)) / 2.0
            return n, ["Method: meiosis halves the chromosome number and "
                       "produces 4 haploid gametes from one diploid "
                       "cell.",
                       f"Given: parent cell 2n = {dn.group(1)}.",
                       f"Gametes: n = {dn.group(1)}/2 = {_fmt(n)}, with "
                       "4 gametes produced per meiocyte.",
                       f"Check: fertilisation restores 2n: n + n = "
                       f"{_fmt(2 * n)} = the parent number.",
                       "Interpretation: halving at meiosis keeps the "
                       "chromosome number constant across generations."], \
                f"gametes have n = {_fmt(n)} chromosomes (4 cells)", None, \
                "meiosis: 2n -> n, one cell -> 4 gametes", \
                {"2n": float(dn.group(1)), "n": n}
        if re.search(r"(?:how many|number of)\s+(?:daughter\s+)?cells",
                     text, re.I):
            return 4.0, ["Method: meiosis is two sequential divisions "
                         "(meiosis I then II) after one DNA replication.",
                         "Given: one diploid cell enters meiosis.",
                         "Meiosis I halves the chromosome number; "
                         "meiosis II separates the chromatids.",
                         "Check: 1 cell -> 2 after meiosis I -> 4 after "
                         "meiosis II.",
                         "Interpretation: 4 genetically different haploid "
                         "cells (gametes or spores) are produced."], \
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
    steps = ["Method: each mitotic division doubles the cell count -- one "
             "cell gives 2 identical daughters.",
             f"Given: {k} mitotic division(s) from {c:g} starting "
             "cell(s).",
             f"Cells = {c:g} x 2^{k} = {_fmt(cells)}.",
             f"Check: {_fmt(cells)}/{c:g} = {_fmt(2.0 ** k)} = 2^{k}; "
             "each generation doubles.",
             "Interpretation: mitosis serves growth and repair -- every "
             "cell stays genetically identical to the parent."]
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
    steps = ["Method: a Type-II restriction endonuclease cuts at every "
             "copy of its (usually palindromic) recognition site.",
             f"Given: sequence length {len(seq)} bp; site {lab}"
             + (" -- palindromic." if is_pal else "."),
             f"Occurrences of {site} in the sequence: {count}."]
    eq = "count occurrences of the recognition site"
    if re.search(r"fragments?", text, re.I):
        circular = bool(re.search(r"circular|plasmid", text, re.I))
        frags = count if circular else count + 1
        shape = "circular" if circular else "linear"
        steps.append(f"{shape.capitalize()} DNA cut at {count} "
                     f"site(s) -> {frags} fragment(s).")
        steps.append(f"Check: {count} cut(s) on {shape} DNA gives "
                     f"{frags} piece(s) by the cuts-to-pieces rule.")
        steps.append("Interpretation: cutting vector and insert with the "
                     "same enzyme leaves complementary sticky ends for "
                     "recombinant DNA.")
        return float(frags), steps, (f"{frags} fragments ({shape} DNA, "
                                     f"{count} cut site(s))"), None, \
            "fragments = cuts + 1 (linear); = cuts (circular)", \
            {"sites": float(count), "fragments": float(frags),
             "seq_len": float(len(seq))}
    steps.append(f"Check: scanning all {len(seq)} bp gives exactly "
                 f"{count} occurrence(s) of {site}.")
    steps.append("Interpretation: the same enzyme cuts vector and insert, "
                 "so the number of sites predicts the restriction map and "
                 "digest fragments.")
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
    steps = ["Method: each PCR cycle doubles the target copy number -- "
             "copies = start x 2^n (exponential amplification).",
             f"Given: {n} cycles starting from {_fmt(c)} copy/copies.",
             f"Copies = {_fmt(c)} x 2^{n} = {_fmt(out)}.",
             f"Check: log2({_fmt(out)}/{_fmt(c)}) = "
             f"{_fmt(math.log2(out / c))} = the cycle count.",
             "Interpretation: about 30 cycles from one copy give ~a "
             "billion copies -- the basis of DNA fingerprinting and "
             "diagnostics."]
    return out, steps, f"{_fmt(out)} copies", None, \
        "PCR: copies = start x 2^n", {"cycles": float(n), "copies": out}


_BASES = [("adenine", "A", "T"), ("thymine", "T", "A"),
          ("guanine", "G", "C"), ("cytosine", "C", "G")]


def _c_chargaff(g, m, text):
    if not re.search(r"DNA|chargaff|base\s+composition|nucleotides?",
                     text, re.I):
        return _GATE
    # bind the given number to the nearest base word -- the natural
    # "adenine is 20 percent" reading (word then number) always wins
    # over a stray number that merely precedes another base's mention
    # ("20 percent. What is the percentage of guanine?" binds 20 to
    # adenine, never to guanine); accept % and percent/percentage.
    _PCT = r"(?:%|percent(?:age)?)"
    given = None
    best_gap = None
    # pass 1: word ... number ("adenine is 20 percent", "%G = 24")
    for word, b, comp in _BASES:
        for mm in re.finditer(
                word + r"[^\d]{0,30}?(?P<v>\d+(?:\.\d+)?)\s*" + _PCT,
                text, re.I):
            v = float(mm.group("v"))
            if not (0 < v < 50):
                continue
            gap = mm.end() - mm.start()
            if best_gap is None or gap < best_gap:
                best_gap = gap
                given = (b, comp, v, word)
    # pass 2 (fallback): number ... word, tight clause only ("20% of
    # the bases are cytosine"); 20 chars cannot cross into the next
    # clause's ask ("24 %. What is the percentage of adenine" = 27).
    if given is None:
        for word, b, comp in _BASES:
            for mm in re.finditer(
                    r"(?P<v>\d+(?:\.\d+)?)\s*" + _PCT + r"\D{0,20}?" +
                    word, text, re.I):
                v = float(mm.group("v"))
                if not (0 < v < 50):
                    continue
                given = (b, comp, v, word)
                break
            if given:
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
    steps = ["Method: in double-stranded DNA the base pairs are fixed -- "
             "A with T, G with C -- so Chargaff's rule gives A = T and "
             "G = C.",
             f"Given: {word} = {_fmt(v)}% of the bases.",
             "Chargaff's rule: A = T and G = C.",
             f"{comp} = {word} = {_fmt(comp_v)}%.",
             f"{b} + {comp} = {2 * v:g}%; remaining {rest:g}% splits "
             f"equally between the other pair, so each = "
             f"{_fmt(other_v)}%."]
    steps.append(f"Check: {_fmt(per_base['A'])} + {_fmt(per_base['T'])} + "
                 f"{_fmt(per_base['G'])} + {_fmt(per_base['C'])} = "
                 f"{_fmt(sum(per_base.values()))}% = 100%.")
    steps.append("Interpretation: A pairs with T and G with C in the "
                 "double helix, which forces A = T and G = C -- "
                 "Chargaff's rule.")
    # ask routing: a base word mentioned WITHOUT the given number
    asked = None
    for w2, b2, c2 in _BASES:
        if b2 == b:
            continue
        pat = (r"\b" + w2 + r"\b|\b" + b2 + r"\b(?=\s*[?=]|\s*%|\s+is|\s+"
               r"be\b)")
        for mm2 in re.finditer(pat, text, re.I):
            near = text[max(0, mm2.start() - 14):mm2.end() + 18]
            if re.search(r"(\d+(?:\.\d+)?)\s*(?:%|percent)", near,
                         re.I):
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
        steps = ["Method: NPP = GPP - R -- net primary productivity is "
                 "gross productivity minus the producers' own "
                 "respiration.",
                 f"GPP = {_fmt(vals['GPP'])}, NPP = {_fmt(vals['NPP'])}.",
                 f"R = GPP - NPP = {_fmt(vals['GPP'])} - "
                 f"{_fmt(vals['NPP'])} = {_fmt(r)}.",
                 f"Check: NPP + R = {_fmt(vals['NPP'])} + {_fmt(r)} = "
                 f"{_fmt(vals['NPP'] + r)} = GPP.",
                 "Interpretation: only NPP (the stored biomass) is "
                 "available to herbivores -- the rest is burnt by the "
                 "plants themselves."]
        return r, steps, f"R (respiration) = {_fmt(r)}", None, \
            "NPP = GPP - R", {"R": r, **vals}
    if "NPP" in vals and "R" in vals:
        v = vals["NPP"] + vals["R"]
        steps = ["Method: NPP = GPP - R rearranged -- GPP is net storage "
                 "plus the respiration it had to cover.",
                 f"NPP = {_fmt(vals['NPP'])}, R = {_fmt(vals['R'])}.",
                 f"GPP = NPP + R = {_fmt(vals['NPP'])} + "
                 f"{_fmt(vals['R'])} = {_fmt(v)}.",
                 f"Check: GPP - R = {_fmt(v)} - {_fmt(vals['R'])} = "
                 f"{_fmt(v - vals['R'])} = NPP.",
                 "Interpretation: only NPP flows to the next trophic "
                 "level; R is lost as heat."]
        return v, steps, f"GPP = {_fmt(v)}", None, "NPP = GPP - R", \
            {"GPP": v, **vals}
    if "GPP" in vals and "R" in vals:
        v = vals["GPP"] - vals["R"]
        steps = ["Method: NPP = GPP - R -- the energy fixed minus the "
                 "energy the producers respire away.",
                 f"GPP = {_fmt(vals['GPP'])}, R = {_fmt(vals['R'])}.",
                 f"NPP = GPP - R = {_fmt(vals['GPP'])} - "
                 f"{_fmt(vals['R'])} = {_fmt(v)}.",
                 f"Check: NPP + R = {_fmt(v)} + {_fmt(vals['R'])} = "
                 f"{_fmt(v + vals['R'])} = GPP.",
                 "Interpretation: NPP is the stored biomass that "
                 "herbivores can actually eat; R escapes as heat."]
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
    steps = ["Method: species-area relation S = c A^z -- species count "
             "rises with area; z is the slope of log S against log A.",
             f"c = {_fmt(cv)}, z = {_fmt(zv)}, A = {_fmt(av)}.",
             f"S = cA^z = {_fmt(cv)} x {_fmt(av)}^{_fmt(zv)} = "
             f"{_fmt(s)}.",
             f"Check: a 10x larger area multiplies S by "
             f"{_fmt(10.0 ** zv)} -- S rises monotonically with A "
             f"(z = {_fmt(zv)} > 0).",
             "Interpretation: bigger reserves hold more species -- the "
             "logic behind prioritising large, contiguous protected "
             "areas."]
    return s, steps, f"S = {_fmt(s)} species", None, "S = c A^z", \
        {"c": cv, "z": zv, "A": av}


# --------------------------------------------------------------------------- #
# physiology: cardiac output, breathing volumes, transpiration rate
# --------------------------------------------------------------------------- #

def _c_cardiac(g, m, text):
    if not re.search(r"cardiac\s+output|stroke\s+volume", text, re.I):
        return _GATE
    sv = re.search(r"stroke\s+volume\D{0,30}?(\d+(?:\.\d+)?)\s*"
                   r"(ml|millilitres?|litres?|l\b)?", text, re.I)
    if sv is None:
        # abbreviated ICSE/ISC form: "SV = 55 mL", "SV is 70 ml"
        sv = re.search(r"\bSV\b\D{0,10}?(\d+(?:\.\d+)?)\s*"
                       r"(ml|millilitres?|litres?|l\b)?", text, re.I)
    hr = re.search(r"(\d+(?:\.\d+)?)\s*(?:beats?\s*(?:per|/)\s*"
                   r"min(?:ute)?s?|bpm)\b", text, re.I)
    if not hr:
        hr = re.search(r"heart\s+rate\D{0,20}?(\d+(?:\.\d+)?)", text,
                       re.I)
    if not hr:
        # abbreviated form: "HR = 110 beats per minute", "HR is 72"
        hr = re.search(r"\bHR\b\D{0,10}?(\d+(?:\.\d+)?)", text, re.I)
    co = re.search(r"cardiac\s+output\D{0,30}?(\d+(?:\.\d+)?)\s*"
                   r"(ml|millilitres?|litres?|l\b)?", text, re.I)
    if sum(1 for x in (sv, hr, co) if x) < 2:
        return _GATE

    def _as_ml(mm) -> Optional[float]:
        if not mm:
            return None
        v = float(mm.group(1))
        if (mm.group(2) or "").lower().startswith("l"):
            v *= 1000.0
        return v

    svv, cov = _as_ml(sv), _as_ml(co)
    hr_v = float(hr.group(1)) if hr else None
    if hr_v is not None and not (20 <= hr_v <= 250):
        return _GATE
    if svv is not None and not (5 <= svv <= 500):
        return _GATE
    if cov is not None and not (500 <= cov <= 40000):
        return _GATE
    given = []
    if svv is not None:
        given.append(f"stroke volume = {_fmt(svv)} mL")
    if hr_v is not None:
        given.append(f"heart rate = {_fmt(hr_v)} beats/min")
    if cov is not None:
        given.append(f"cardiac output = {_fmt(cov)} mL")
    method = ("Method: cardiac output = stroke volume x heart rate -- "
              "the volume of blood one ventricle pumps per minute (NCERT "
              "average: 70 mL x 72 beats/min ~ 5 L).")
    interp = ("Interpretation: the healthy adult averages ~5 L/min; "
              "exercise raises cardiac output by increasing both stroke "
              "volume and heart rate.")
    if svv is None:
        svv = cov / hr_v
        steps = [method, f"Given: {'; '.join(given)}.",
                 f"Stroke volume = cardiac output / heart rate = "
                 f"{_fmt(cov)}/{_fmt(hr_v)} = {_fmt(svv)} mL.",
                 f"Check: {_fmt(svv)} x {_fmt(hr_v)} = {_fmt(cov)} mL = "
                 "the given cardiac output.", interp]
        return svv, steps, f"stroke volume = {_fmt(svv)} mL", None, \
            "cardiac output = stroke volume x heart rate", \
            {"sv_ml": svv, "hr": hr_v, "co_ml": cov}
    if hr_v is None:
        hr_v = cov / svv
        steps = [method, f"Given: {'; '.join(given)}.",
                 f"Heart rate = cardiac output / stroke volume = "
                 f"{_fmt(cov)}/{_fmt(svv)} = {_fmt(hr_v)} beats/min.",
                 f"Check: {_fmt(svv)} x {_fmt(hr_v)} = {_fmt(cov)} mL = "
                 "the given cardiac output.", interp]
        return hr_v, steps, (f"heart rate = {_fmt(hr_v)} beats per "
                             "minute"), None, \
            "cardiac output = stroke volume x heart rate", \
            {"sv_ml": svv, "hr": hr_v, "co_ml": cov}
    cov = svv * hr_v
    steps = [method, f"Given: {'; '.join(given)}.",
             f"Cardiac output = {_fmt(svv)} mL x {_fmt(hr_v)} beats/min "
             f"= {_fmt(cov)} mL/min (~{_fmt(cov / 1000.0)} L/min).",
             f"Check: {_fmt(cov)} mL / {_fmt(hr_v)} beats = "
             f"{_fmt(cov / hr_v)} mL per beat -- the given stroke "
             "volume.", interp]
    return cov, steps, (f"cardiac output = {_fmt(cov)} mL/min "
                        f"(~{_fmt(cov / 1000.0)} L per minute)"), None, \
        "cardiac output = stroke volume x heart rate", \
        {"sv_ml": svv, "hr": hr_v, "co_ml": cov}


_BREATH_LABELS = [
    ("TV", r"\btidal\s+volume\b|\bTV\b"),
    ("IRV", r"\binspiratory\s+reserve\s+volume\b|\bIRV\b"),
    ("ERV", r"\bexpiratory\s+reserve\s+volume\b|\bERV\b"),
    ("RV", r"\bresidual\s+volume\b|\bRV\b"),
    ("VC", r"\bvital\s+capacity\b|\bVC\b"),
    ("TLC", r"\btotal\s+lung\s+capacity\b|\bTLC\b"),
    ("IC", r"\binspiratory\s+capacity\b|\bIC\b"),
    ("EC", r"\bexpiratory\s+capacity\b|\bEC\b"),
    ("FRC", r"\bfunctional\s+residual\s+capacity\b|\bFRC\b"),
]

_BREATH_RULES = [
    ("IC", ("TV", "IRV"), "sum", "IC = TV + IRV"),
    ("EC", ("TV", "ERV"), "sum", "EC = TV + ERV"),
    ("FRC", ("ERV", "RV"), "sum", "FRC = ERV + RV"),
    ("VC", ("TV", "IRV", "ERV"), "sum", "VC = TV + IRV + ERV"),
    ("TLC", ("VC", "RV"), "sum", "TLC = VC + RV"),
    ("RV", ("TLC", "VC"), "diff", "RV = TLC - VC"),
    ("VC", ("TLC", "RV"), "diff", "VC = TLC - RV"),
    ("ERV", ("FRC", "RV"), "diff", "ERV = FRC - RV"),
    ("RV", ("FRC", "ERV"), "diff", "RV = FRC - ERV"),
    ("ERV", ("VC", "IC"), "diff", "ERV = VC - IC"),
    ("IC", ("VC", "ERV"), "diff", "IC = VC - ERV"),
    ("ERV", ("EC", "TV"), "diff", "ERV = EC - TV"),
    ("TV", ("EC", "ERV"), "diff", "TV = EC - ERV"),
    ("IRV", ("VC", "TV", "ERV"), "diff3", "IRV = VC - TV - ERV"),
    ("ERV", ("VC", "TV", "IRV"), "diff3", "ERV = VC - TV - IRV"),
    ("TV", ("VC", "IRV", "ERV"), "diff3", "TV = VC - IRV - ERV"),
]


def _c_breathing(g, m, text):
    if not re.search(r"tidal\s+volume|vital\s+capacity|residual\s+"
                     r"volume|inspiratory|expiratory|total\s+lung\s+"
                     r"capacity|functional\s+residual|minute\s+"
                     r"ventilation|breathing\s+rate", text, re.I):
        return _GATE
    vals: Dict[str, float] = {}
    for label, pat in _BREATH_LABELS:
        mm = re.search(r"(?:" + pat + r")"
                       + r"\D{0,25}?(\d+(?:\.\d+)?)\s*"
                       r"(ml|millilitres?|litres?|l\b)?", text, re.I)
        if mm:
            v = float(mm.group(1))
            if (mm.group(2) or "").lower().startswith("l"):
                v *= 1000.0
            if not (10 <= v <= 12000):
                return _GATE
            vals[label] = v
    rate = re.search(r"(\d+(?:\.\d+)?)\s*breaths?\s*(?:per|/)\s*"
                     r"min(?:ute)?s?", text, re.I)
    if not rate:
        rate = re.search(r"breathing\s+rate\D{0,15}?(\d+(?:\.\d+)?)",
                         text, re.I)
    rate_v = float(rate.group(1)) if rate else None
    if rate_v is not None and not (5 <= rate_v <= 60):
        return _GATE
    if len(vals) < 2 and not (rate_v is not None and "TV" in vals):
        return _GATE
    method = ("Method: pulmonary capacities are sums of standard "
              "respiratory volumes (NCERT, Breathing and Exchange of "
              "Gases): IC = TV + IRV, EC = TV + ERV, FRC = ERV + RV, "
              "VC = TV + IRV + ERV, TLC = VC + RV.")
    given = [f"{k} = {_fmt(v)} mL" for k, v in vals.items()]
    if rate_v is not None:
        given.append(f"breathing rate = {_fmt(rate_v)} breaths/min")
    derived: List[str] = []
    deriv_rule: Dict[str, Tuple] = {}
    if rate_v is not None and "TV" in vals and "MV" not in vals:
        vals["MV"] = vals["TV"] * rate_v
        derived.append("MV")
    for _ in range(8):
        changed = False
        for target, parts, kind, expr in _BREATH_RULES:
            if target in vals or not all(p in vals for p in parts):
                continue
            if kind == "sum":
                vals[target] = sum(vals[p] for p in parts)
            elif kind == "diff":
                vals[target] = vals[parts[0]] - vals[parts[1]]
            else:
                vals[target] = (vals[parts[0]] - vals[parts[1]]
                                - vals[parts[2]])
            if not (10 <= vals[target] <= 12000):
                return _GATE  # impossible state
            deriv_rule[target] = (parts, kind, expr)
            derived.append(target)
            changed = True
        if not changed:
            break
    if not derived:
        return _GATE
    steps = [method,
             "Given: " + ", ".join(given) + "."]
    for t2 in derived:
        if t2 == "MV":
            continue
        steps.append(f"{deriv_rule[t2][2]} = {_fmt(vals[t2])} mL.")
    if "MV" in derived:
        steps.append(f"Minute ventilation = TV x breaths/min = "
                     f"{_fmt(vals['TV'])} x {_fmt(rate_v)} = "
                     f"{_fmt(vals['MV'])} mL/min.")
    t = derived[-1] if derived[-1] != "MV" or len(derived) == 1 else \
        derived[0]
    value = vals[t]
    if t == "MV":
        steps.append(f"Check: {_fmt(value)} / {_fmt(rate_v)} breaths = "
                     f"{_fmt(vals['TV'])} mL -- the given tidal volume.")
    else:
        parts, kind, expr = deriv_rule[t]
        if kind == "sum":
            steps.append(f"Check: {' + '.join(parts)} = "
                         f"{_fmt(sum(vals[p] for p in parts))} mL -- "
                         "re-addition confirms.")
        elif kind == "diff":
            steps.append(f"Check: {parts[1]} + result = "
                         f"{_fmt(vals[parts[1]] + value)} mL = "
                         f"{parts[0]} -- inverse confirms.")
        else:
            steps.append(f"Check: {' + '.join(parts[1:])} + result = "
                         f"{_fmt(sum(vals[p] for p in parts[1:]) + value)}"
                         f" mL = {parts[0]} -- inverse confirms.")
    steps.append("Interpretation: a healthy adult moves ~6-8 L of air "
                 "per minute at rest; capacities are clinical "
                 "diagnostics of lung function, not separate air "
                 "pockets.")
    name = {"MV": "minute ventilation", "VC": "vital capacity",
            "TLC": "total lung capacity", "IC": "inspiratory capacity",
            "EC": "expiratory capacity", "FRC": "functional residual "
            "capacity", "TV": "tidal volume",
            "IRV": "inspiratory reserve volume",
            "ERV": "expiratory reserve volume",
            "RV": "residual volume"}.get(t, t)
    return value, steps, f"{name} = {_fmt(value)} mL", None, \
        "NCERT volume table: VC = TV+IRV+ERV; TLC = VC+RV; IC/EC/FRC", \
        {k.lower(): v for k, v in vals.items()}


def _c_transpiration(g, m, text):
    if not re.search(r"transpiration|potometer", text, re.I):
        return _GATE
    rate_given = re.search(r"(\d+(?:\.\d+)?)\s*(ml|cm3|cm\u00b3|g\b|grams?)"
                           r"\s*(?:per|/)\s*(minute|min|hour|h\b|day)",
                           text, re.I)
    amount = re.search(r"(\d+(?:\.\d+)?)\s*(ml|cm3|cm\u00b3|g\b|grams?)"
                       r"\D{0,40}?(?:lost|absorbed|taken\s+up|uptake|"
                       r"moved|travell?ed)", text, re.I)
    if not amount:
        amount = re.search(r"(?:lost|loses?|absorbed|taken\s+up)\D{0,25}?"
                           r"(\d+(?:\.\d+)?)\s*(ml|cm3|cm\u00b3|g\b|"
                           r"grams?)", text, re.I)
    time = re.search(r"(?:in|over|during|for|within)\s+(\d+(?:\.\d+)?)\s*"
                     r"(minutes?|min\b|hours?|h\b|days?)", text, re.I)
    to_min = {"minute": 1.0, "min": 1.0, "hour": 60.0, "h": 60.0,
              "day": 1440.0}
    unit = (amount.group(2) if amount else
            rate_given.group(2) if rate_given else "mL").lower()
    unit = {"g": "g", "grams": "g"}.get(unit, unit.replace("cm\u00b3",
                                                           "cm3"))
    method = ("Method: rate of transpiration = water lost / time; a "
              "potometer reads water uptake, which approximates the "
              "water lost through the stomata.")
    interp = ("Interpretation: the rate climbs on hot, dry, windy days "
              "when stomata stay wide open, and falls when they close.")
    if rate_given and time:
        rv = float(rate_given.group(1))
        ru = rate_given.group(3).lower()
        ru = {"min": "minute", "h": "hour"}.get(ru, ru.rstrip("s"))
        tv_ = float(time.group(1))
        tu = time.group(2).lower()
        tu = {"min": "minute", "h": "hour"}.get(tu, tu.rstrip("s"))
        if rv <= 0 or rv > 1000 or tv_ <= 0 or tv_ > 43200:
            return _GATE
        r_per_tu = rv * to_min[ru] / to_min[tu]
        water = r_per_tu * tv_
        steps = [method,
                 f"Given: rate = {_fmt(rv)} {unit}/{ru}; time = "
                 f"{_fmt(tv_)} {tu}.",
                 f"Water lost = {_fmt(rv)} x {_fmt(tv_)} = {_fmt(water)} "
                 f"{unit}.",
                 f"Check: {_fmt(water)} / {_fmt(tv_)} = "
                 f"{_fmt(r_per_tu)} {unit}/{tu} -- the given rate.",
                 interp]
        return water, steps, (f"water lost = {_fmt(water)} {unit} in "
                              f"{_fmt(tv_)} {tu}"), None, \
            "water lost = transpiration rate x time", \
            {"rate": r_per_tu, "time_min": tv_ * to_min[tu]}
    if amount and time and not rate_given:
        av = float(amount.group(1))
        tv_ = float(time.group(1))
        tu = time.group(2).lower()
        tu = {"min": "minute", "h": "hour"}.get(tu, tu.rstrip("s"))
        if av <= 0 or av > 5000 or tv_ <= 0 or tv_ > 43200:
            return _GATE
        rate = av / tv_
        per_min = rate / to_min[tu]
        per_h = per_min * 60.0
        steps = [method,
                 f"Given: water lost = {_fmt(av)} {unit} in {_fmt(tv_)} "
                 f"{tu}.",
                 f"Rate = {_fmt(av)} / {_fmt(tv_)} = {_fmt(rate)} "
                 f"{unit}/{tu} = {_fmt(per_h)} {unit}/hour.",
                 f"Check: {_fmt(per_min)} {unit}/min x 60 = "
                 f"{_fmt(per_h)} {unit}/hour -- consistent.",
                 interp]
        return per_h, steps, (f"rate of transpiration = {_fmt(per_h)} "
                              f"{unit} per hour"), None, \
            "rate = water lost / time", {"amount": av, "time_min":
                                         tv_ * to_min[tu]}
    return _GATE


# --------------------------------------------------------------------------- #
# genetics: pedigree probability chains
# --------------------------------------------------------------------------- #

_PEDIGREE_SCENARIOS = {
    "aa.carrier": {
        "method": "Method: autosomal recessive pedigree rule -- the "
                  "trait shows only in aa individuals, so carriers (Aa) "
                  "are unaffected and can pass it on silently.",
        "given": "Given: both parents are carriers (Aa x Aa) from the "
                 "pedigree.",
        "cross": "Cross Aa x Aa -> AA, Aa, Aa, aa: P(affected aa) = 1/4, "
                 "P(unaffected) = 3/4; among the unaffected, 2/3 are "
                 "carriers.",
        "check": "Check: 1/4 + 2/4 + 1/4 = 1 -- the four outcomes "
                 "account for every child.",
        "p_aff": 0.25, "p_unaff": 0.75, "p_car": 0.5,
        "p_car_unaff": 2.0 / 3.0,
        "interp": "Interpretation: each child is an independent event -- "
                  "even after unaffected children, the next child's risk "
                  "stays 1/4.",
    },
    "aa.aff_child": {
        "method": "Method: autosomal recessive pedigree rule -- an "
                  "affected child (aa) of unaffected parents proves both "
                  "parents are carriers (Aa).",
        "given": "Given: unaffected parents with one affected child -- "
                 "both are carriers (Aa x Aa).",
        "cross": "Cross Aa x Aa -> AA, Aa, Aa, aa: P(affected aa) = 1/4, "
                 "P(unaffected) = 3/4.",
        "check": "Check: 1/4 + 2/4 + 1/4 = 1 -- the four outcomes "
                 "account for every child.",
        "p_aff": 0.25, "p_unaff": 0.75, "p_car": 0.5,
        "p_car_unaff": 2.0 / 3.0,
        "interp": "Interpretation: unaffected siblings of an affected "
                  "child have a 2/3 chance of being carriers -- key for "
                  "counselling.",
    },
    "aa.aff_x_car": {
        "method": "Method: autosomal recessive pedigree rule -- an "
                  "affected parent is aa and can only pass a; a carrier "
                  "parent passes a half the time.",
        "given": "Given: affected (aa) x carrier (Aa) parents from the "
                 "pedigree.",
        "cross": "Cross aa x Aa -> Aa, aa, Aa, aa: P(affected) = 1/2, "
                 "P(unaffected carrier) = 1/2.",
        "check": "Check: 1/2 + 1/2 = 1 -- every outcome covered.",
        "p_aff": 0.5, "p_unaff": 0.5, "p_car": 0.5,
        "p_car_unaff": 1.0,
        "interp": "Interpretation: half the children show the trait -- "
                  "a 1-in-2 recurrence risk in each pregnancy.",
    },
    "aa.aff_x_unaff": {
        "method": "Method: autosomal recessive pedigree rule -- an "
                  "affected parent (aa) with a homozygous normal partner "
                  "(AA) has only carrier children.",
        "given": "Given: affected (aa) x unaffected non-carrier (AA) "
                 "parents from the pedigree.",
        "cross": "Cross aa x AA -> all Aa: P(affected) = 0, all children "
                 "unaffected carriers.",
        "check": "Check: all 4 outcomes are Aa -- zero affected, four "
                 "carriers.",
        "p_aff": 0.0, "p_unaff": 1.0, "p_car": 1.0,
        "p_car_unaff": 1.0,
        "interp": "Interpretation: the trait can skip the generation and "
                  "reappear if carriers marry carriers.",
    },
    "ad.het_x_unaff": {
        "method": "Method: autosomal dominant pedigree rule -- one copy "
                  "(Aa) is enough to show the trait; an affected "
                  "heterozygote passes A to half the gametes.",
        "given": "Given: heterozygous affected parent (Aa) x unaffected "
                 "(aa) from the pedigree.",
        "cross": "Cross Aa x aa -> Aa, aa, Aa, aa: P(affected) = 1/2, "
                 "P(unaffected) = 1/2.",
        "check": "Check: 1/2 + 1/2 = 1 -- every outcome covered.",
        "p_aff": 0.5, "p_unaff": 0.5, "p_car": 0.0,
        "p_car_unaff": 0.0,
        "interp": "Interpretation: dominant traits do not skip "
                  "generations -- every generation shows affected "
                  "individuals.",
    },
}


def _c_pedigree(g, m, text):
    if not re.search(r"pedigree", text, re.I):
        return _GATE
    if not re.search(r"probab|chance|likelihood|odds|risk", text, re.I):
        return _GATE
    if re.search(r"x[-\s]?linked|sex[-\s]?linked", text, re.I):
        return _GATE  # SEX_LINKED_CROSS owns X-linked territory
    dom = bool(re.search(r"dominant", text, re.I)) and \
        not bool(re.search(r"recessive", text, re.I))
    aff_child = bool(re.search(r"affected\s+(?:child|son|daughter|boy|"
                               r"girl)|child\s+(?:is|was)\s+affected|"
                               r"has\s+an?\s+affected\s+(?:child|son|"
                               r"daughter)", text, re.I))
    carriers = bool(re.search(r"both\s+carriers|carrier\s+parents|"
                              r"carriers\s+of", text, re.I))
    het_aff = bool(re.search(r"heterozygous\s+affected|affected\s+"
                             r"heterozygous", text, re.I))
    if dom:
        if het_aff:
            key = "ad.het_x_unaff"
        else:
            return _GATE  # affected-parent genotypes unstated
    else:
        if carriers:
            key = "aa.carrier"
        elif aff_child and re.search(r"unaffected", text, re.I):
            key = "aa.aff_child"  # a GIVEN affected child of unaffected parents
        elif re.search(r"affected", text, re.I) and \
                re.search(r"carrier", text, re.I):
            key = "aa.aff_x_car"
        elif re.search(r"affected", text, re.I) and \
                re.search(r"unaffected|normal", text, re.I):
            key = "aa.aff_x_unaff"
        else:
            return _GATE
    sc = _PEDIGREE_SCENARIOS[key]
    steps = [sc["method"], sc["given"], sc["cross"], sc["check"],
             sc["interp"]]
    eq = "Mendelian monohybrid probabilities read onto a pedigree"
    # ask routing: read only the question tail (after the ask word) so
    # givens like "unaffected parents with an affected child" cannot
    # hijack what is being asked
    ask_m = re.search(r"probab|chance|likelihood|odds|risk", text, re.I)
    tail = text[ask_m.start():] if ask_m else text
    aff_ask = re.search(r"(?<!un)affected\s+(?:child|offspring)|"
                        r"(?:child|son|daughter|offspring)\s+[^.]{0,30}?"
                        r"(?:will\s+be|is|to\s+be)\s+affected", tail,
                        re.I)
    if aff_ask:
        val, ans = sc["p_aff"], (f"probability of an affected child = "
                                 f"{_fmt(sc['p_aff'])}")
    elif re.search(r"carrier", tail, re.I) and \
            re.search(r"unaffected|not\s+affected", tail, re.I):
        val, ans = sc["p_car_unaff"], ("probability that an unaffected "
                                       "child is a carrier = "
                                       f"{_fmt(sc['p_car_unaff'])}")
    elif re.search(r"unaffected|not\s+affected|normal", tail, re.I) and \
            not re.search(r"carrier", tail, re.I):
        val, ans = sc["p_unaff"], (f"probability of an unaffected child "
                                   f"= {_fmt(sc['p_unaff'])}")
    else:
        val, ans = sc["p_aff"], (f"probability of an affected child = "
                                 f"{_fmt(sc['p_aff'])}")
    return val, steps, ans, None, eq, \
        {"p_affected": sc["p_aff"], "p_unaffected": sc["p_unaff"],
         "p_carrier": sc["p_car"]}


# --------------------------------------------------------------------------- #
# CISCE wave (2026-09-30): alveolar ventilation, blood-volume indices,
# spore counts, dihybrid 9:3:3:1 counts, recombination frequency.
# Handlers follow the file contract: deterministic regex slots, tight
# plausibility gates, honest gate-refusal (never a guess).
# --------------------------------------------------------------------------- #

_ALV_NUM = r"(\d+(?:\.\d+)?(?:\s*[xX]\s*10\s*\^?\s*-?\d+)?)"


def _alv_num(raw: str) -> float:
    return float(re.sub(r"\s+", "", raw).replace("^", ""))


def _c_alveolar(g, m, text):
    """Alveolar ventilation VA = (tidal volume - dead space) x rate, and
    the same equation solved for any one missing factor."""
    if not re.search(r"alveolar\s+ventilation|dead\s+space", text, re.I):
        return _GATE
    ask_va = bool(re.search(r"alveolar\s+ventilation|ventilation\s+rate",
                            text, re.I))
    tv = re.search(r"tidal\s+volume\D{0,25}?" + _ALV_NUM +
                   r"\s*(ml|millilitres?|litres?|l\b)?", text, re.I)
    ds = re.search(r"dead\s+space\D{0,25}?" + _ALV_NUM +
                   r"\s*(ml|millilitres?|litres?|l\b)?", text, re.I)
    va = re.search(r"alveolar\s+ventilation\D{0,25}?" + _ALV_NUM +
                   r"\s*(ml|millilitres?|litres?|l\b)?", text, re.I)
    rate = re.search(r"(\d+(?:\.\d+)?)\s*breaths?\s*(?:per|/)\s*"
                     r"min(?:ute)?s?", text, re.I)
    if not rate:
        rate = re.search(r"respiratory\s+rate\D{0,20}?" + _ALV_NUM,
                         text, re.I)

    def _ml(mm) -> Optional[float]:
        if mm is None:
            return None
        v = _alv_num(mm.group(1))
        if (mm.group(2) or "").lower().startswith("l"):
            v *= 1000.0
        return v

    tvv, dsv, vav = _ml(tv), _ml(ds), _ml(va)
    rv = float(rate.group(1)) if rate else None
    for v, lo, hi, nm in ((tvv, 50, 8000, "tidal volume"),
                          (dsv, 0, 800, "dead space"),
                          (vav, 100, 200000, "alveolar ventilation"),
                          (rv, 3, 90, "respiratory rate")):
        if v is not None and not (lo <= v <= hi):
            return _GATE
    known = {"TV": tvv, "DS": dsv, "VA": vav, "R": rv}
    if sum(1 for v in known.values() if v is not None) < 3:
        return _GATE
    if not ask_va and vav is not None and \
            not re.search(r"dead\s+space", text, re.I):
        return _GATE  # only solve here when alveolar data is the point
    # solve the missing factor of VA = (TV - DS) x R
    if tvv is None:
        val = vav / rv + dsv
        steps = ["Method: alveolar ventilation = (tidal volume - dead "
                 "space) x respiratory rate, rearranged for tidal volume.",
                 f"Given: alveolar ventilation = {_fmt(vav)} mL/min; dead "
                 f"space = {_fmt(dsv)} mL; rate = {_fmt(rv)} breaths/min.",
                 f"Tidal volume = {_fmt(vav)}/{_fmt(rv)} + {_fmt(dsv)} = "
                 f"{_fmt(val)} mL.",
                 f"Check: ({_fmt(val)} - {_fmt(dsv)}) x {_fmt(rv)} = "
                 f"{_fmt((val - dsv) * rv)} mL/min -- matches.",
                 "Interpretation: only the fresh air reaching the alveoli "
                 "(TV minus dead space) takes part in gas exchange."]
        return val, steps, f"tidal volume = {_fmt(val)} mL", None, \
            "VA = (TV - DS) x rate", known
    if dsv is None:
        val = tvv - vav / rv
        if val < 0:
            return _GATE
        steps = ["Method: alveolar ventilation = (tidal volume - dead "
                 "space) x respiratory rate, rearranged for dead space.",
                 f"Given: alveolar ventilation = {_fmt(vav)} mL/min; "
                 f"tidal volume = {_fmt(tvv)} mL; rate = {_fmt(rv)} "
                 "breaths/min.",
                 f"Dead space = {_fmt(tvv)} - {_fmt(vav)}/{_fmt(rv)} = "
                 f"{_fmt(val)} mL.",
                 f"Check: ({_fmt(tvv)} - {_fmt(val)}) x {_fmt(rv)} = "
                 f"{_fmt((tvv - val) * rv)} mL/min -- matches.",
                 "Interpretation: anatomical dead space in a healthy "
                 "adult is about 150 mL."]
        return val, steps, f"dead space = {_fmt(val)} mL", None, \
            "VA = (TV - DS) x rate", known
    if rv is None:
        val = vav / (tvv - dsv)
        if not (3 <= val <= 90):
            return _GATE
        steps = ["Method: alveolar ventilation = (tidal volume - dead "
                 "space) x respiratory rate, rearranged for the rate.",
                 f"Given: alveolar ventilation = {_fmt(vav)} mL/min; "
                 f"tidal volume = {_fmt(tvv)} mL; dead space = "
                 f"{_fmt(dsv)} mL.",
                 f"Rate = {_fmt(vav)} / ({_fmt(tvv)} - {_fmt(dsv)}) = "
                 f"{_fmt(val)} breaths/min.",
                 f"Check: ({_fmt(tvv)} - {_fmt(dsv)}) x {_fmt(val)} = "
                 f"{_fmt((tvv - dsv) * val)} mL/min -- matches.",
                 "Interpretation: the resting rate stays near 12-16 "
                 "breaths per minute."]
        return val, steps, (f"respiratory rate = {_fmt(val)} breaths per "
                            "minute"), None, "VA = (TV - DS) x rate", known
    val = (tvv - dsv) * rv
    if val <= 0:
        return _GATE
    steps = ["Method: alveolar ventilation = (tidal volume - dead space) "
             "x respiratory rate -- only fresh air reaching the alveoli "
             "participates in gas exchange.",
             f"Given: tidal volume = {_fmt(tvv)} mL; dead space = "
             f"{_fmt(dsv)} mL; rate = {_fmt(rv)} breaths/min.",
             f"Alveolar ventilation = ({_fmt(tvv)} - {_fmt(dsv)}) x "
             f"{_fmt(rv)} = {_fmt(tvv - dsv)} x {_fmt(rv)} = "
             f"{_fmt(val)} mL/min.",
             f"Check: {_fmt(val)} / {_fmt(rv)} = {_fmt(val / rv)} mL of "
             "fresh air per breath, below the tidal volume -- consistent.",
             "Interpretation: minute ventilation would be "
             f"{_fmt(tvv * rv)} mL/min; the {_fmt(dsv)} mL/breath of "
             "dead-space air never reaches the alveoli."]
    return val, steps, (f"alveolar ventilation = {_fmt(val)} mL per "
                        "minute"), None, "VA = (TV - DS) x rate", \
        {"TV_ml": tvv, "DS_ml": dsv, "rate": rv, "VA_ml_min": val}


_HCT_RX = r"(?:haematocrit|hematocrit|packed\s+cell\s+volume|PCV)\D{0,20}?" \
          r"(\d+(?:\.\d+)?)\s*(%|percent)?"


def _hct_frac(raw: float, pct: Optional[str]) -> Optional[float]:
    """Stated hematocrit -> fraction; '%' / 'percent' marker or a bare
    number > 1 both mean a percentage reading."""
    if pct:
        return raw / 100.0
    if raw > 1.0:
        return raw / 100.0
    return raw


def _c_blood_volume(g, m, text):
    """Hematocrit indices: RBC volume = TBV x Hct; TBV = plasma /
    (1 - Hct); new hematocrit after plasma loss keeps the red cells."""
    if not re.search(r"haematocrit|hematocrit|packed\s+cell\s+volume|"
                     r"\bPCV\b", text, re.I):
        return _GATE
    hm = re.search(_HCT_RX, text, re.I)
    bv = re.search(r"(?:total\s+)?blood\s+volume\D{0,20}?" + _ALV_NUM +
                   r"\s*(ml|millilitres?|litres?|l\b)?", text, re.I)
    pv = re.search(r"plasma\s+volume\D{0,20}?" + _ALV_NUM +
                   r"\s*(ml|millilitres?|litres?|l\b)?", text, re.I)
    loss = re.search(r"los(?:es|t|ing)\D{0,20}?" + _ALV_NUM +
                     r"\s*(ml|millilitres?|litres?|l\b)?\s+of\s+plasma",
                     text, re.I)

    def _litres(mm) -> Optional[float]:
        if mm is None:
            return None
        v = _alv_num(mm.group(1))
        u = (mm.group(2) or "").lower()
        if u.startswith("ml") or u.startswith("milli"):
            v /= 1000.0
        return v  # bare numbers read as litres (blood panels are in L)

    hct = _hct_frac(float(hm.group(1)), hm.group(2)) if hm else None
    bvv, pvv = _litres(bv), _litres(pv)
    losv = _litres(loss)
    for v, lo, hi, nm in ((hct, 0.1, 0.85, "hematocrit"),
                          (bvv, 0.5, 8.0, "blood volume"),
                          (pvv, 0.5, 6.0, "plasma volume"),
                          (losv, 0.05, 3.0, "plasma loss")):
        if v is not None and not (lo <= v <= hi):
            return _GATE
    # mode: new hematocrit after plasma loss (red cells conserved)
    if losv is not None and hct is not None and bvv is not None and \
            re.search(r"new\s+(?:haematocrit|hematocrit|hct)|"
                      r"haematocrit\s+(?:now|after)|"
                      r"hematocrit\s+(?:now|after)|what\s+(?:is|will\s+"
                      r"be)\s+the\s+(?:new\s+)?(?:haema?tocrit|hct)",
                      text, re.I):
        rbc = bvv * hct
        newv = bvv - losv
        if newv <= rbc:
            return _GATE
        val = rbc / newv * 100.0
        steps = ["Method: losing plasma alone does not change the red-"
                 "cell volume; the new hematocrit = RBC volume / new "
                 "blood volume.",
                 f"RBC volume = {_fmt(bvv)} L x {_fmt(hct * 100)}% = "
                 f"{_fmt(rbc)} L; new blood volume = {_fmt(bvv)} - "
                 f"{_fmt(losv)} = {_fmt(newv)} L.",
                 f"New hematocrit = {_fmt(rbc)}/{_fmt(newv)} = "
                 f"{_fmt(val)}%.",
                 f"Check: {_fmt(rbc)} L cells in {_fmt(newv)} L blood "
                 f"raises the packed-cell fraction from "
                 f"{_fmt(hct * 100)}% -- consistent (hemoconcentration).",
                 "Interpretation: plasma loss (burns, dehydration) raises "
                 "the hematocrit; whole-blood loss does not."]
        return val, steps, f"new hematocrit = {_fmt(val)}%", None, \
            "Hct' = (TBV x Hct) / (TBV - loss)", \
            {"tbv_l": bvv, "hct": hct, "loss_l": losv, "new_hct_pct": val}
    # mode: RBC / plasma volume split of a stated blood volume
    if bvv is not None and hct is not None:
        ask_plasma = bool(re.search(r"plasma\s+volume|volume\s+of\s+"
                                    r"plasma", text, re.I))
        val = bvv * (1.0 - hct) if ask_plasma else bvv * hct
        what = "plasma" if ask_plasma else "red blood cells"
        steps = ["Method: the hematocrit is the red-cell FRACTION of "
                 "blood volume, so the remaining fraction is plasma.",
                 f"Given: blood volume = {_fmt(bvv)} L, hematocrit = "
                 f"{_fmt(hct * 100)}%.",
                 f"{what.capitalize()} volume = {_fmt(bvv)} x "
                 f"{'(1 - ' + _fmt(hct) + ')' if ask_plasma else _fmt(hct)}"
                 f" = {_fmt(val)} L.",
                 f"Check: {_fmt(bvv * hct)} L cells + "
                 f"{_fmt(bvv * (1 - hct))} L plasma = {_fmt(bvv)} L -- "
                 "closes.",
                 "Interpretation: a 45% hematocrit means slightly less "
                 "than half the blood volume is cells."]
        return val, steps, f"{what} volume = {_fmt(val)} L", None, \
            "V = TBV x fraction", {"tbv_l": bvv, "hct": hct, "V_l": val}
    # mode: total blood volume from plasma volume and hematocrit
    if pvv is not None and hct is not None:
        if hct >= 0.85:
            return _GATE
        val = pvv / (1.0 - hct)
        steps = ["Method: plasma is the non-cell fraction, "
                 "plasma = TBV x (1 - hematocrit); solve for TBV.",
                 f"Given: plasma volume = {_fmt(pvv)} L, hematocrit = "
                 f"{_fmt(hct * 100)}%.",
                 f"TBV = {_fmt(pvv)} / (1 - {_fmt(hct)}) = "
                 f"{_fmt(val)} L.",
                 f"Check: {_fmt(val)} L x {_fmt(hct * 100)}% = "
                 f"{_fmt(val * hct)} L of cells; cells + plasma = "
                 f"{_fmt(val * hct + pvv)} L -- closes.",
                 "Interpretation: total blood volume stays near 5 L in a "
                 "healthy adult."]
        return val, steps, (f"total blood volume = {_fmt(val)} L"), None, \
            "TBV = plasma / (1 - Hct)", \
            {"plasma_l": pvv, "hct": hct, "tbv_l": val}
    return _GATE


def _c_spore_counts(g, m, text):
    """Spore arithmetic: sporangia x spores-per-sporangium, germination
    percentages, germination probability, and binary-fission
    generation counts."""
    if not re.search(r"spores?\b|sporang", text, re.I):
        return _GATE
    num = _ALV_NUM

    def _num(raw: str) -> float:
        s = re.sub(r"[\s,]", "", raw)
        s = s.replace("x", "e").replace("X", "e").replace("^", "")
        return float(s)

    # mode: generation count from a single founder (binary fission)
    _NW = {"one": 1, "two": 2, "three": 3, "four": 4, "five": 5,
           "six": 6, "seven": 7, "eight": 8, "nine": 9, "ten": 10}
    gen = re.search(r"(?:single|one|a)\s+(?:\w+\s+)?(?:spore|cell|"
                    r"basidiospore)[^.]{0,120}?"
                    r"(?:(?P<n>\d{1,2})|(?P<nw>one|two|three|four|five|"
                    r"six|seven|eight|nine|ten))\s+successive\s+"
                    r"generations?"
                    r"|(?:(?P<n2>\d{1,2})|(?P<nw2>one|two|three|four|"
                    r"five|six|seven|eight|nine|ten))\s+successive\s+"
                    r"generations?",
                    text, re.I)
    if gen is not None:
        if gen.group("n"):
            n = int(gen.group("n"))
        elif gen.group("n2"):
            n = int(gen.group("n2"))
        else:
            n = _NW[(gen.group("nw") or gen.group("nw2")).lower()]
        if not (1 <= n <= 40):
            return _GATE
        val = float(2 ** n)
        steps = ["Method: each generation of binary fission doubles the "
                 "number of individuals, so N = 2^n for one founder.",
                 f"Founder: 1 spore; generations n = {n}.",
                 f"N = 2^{n} = {_fmt(val)} individuals.",
                 f"Check: doubling {n} times gives {n} doublings -- "
                 "powers of two stay even above 2^1.",
                 "Interpretation: fungal/bacterial spore lineages explode "
                 "logarithmically, not linearly."]
        return val, steps, f"individuals = {_fmt(val)}", None, \
            "N = 2^n", {"generations": n}
    # mode: percentage germinated from a plated count
    germ = re.search(r"(\d+(?:\.\d+)?)\s*(%|percent)\s+have\s+"
                     r"germinat\w+|germinat\w+[^.]{0,40}?"
                     r"(\d+(?:\.\d+)?)\s*(%|percent)", text, re.I)
    plated = re.search(r"(\d[\d,]*(?:\.\d+)?(?:\s*[xX]\s*10\s*\^?\s*"
                       r"-?\d+)?)\s*spores?\b", text, re.I)
    if germ is not None and plated is not None and \
            re.search(r"how\s+many|number\s+of\s+spores?\s+"
                      r"germinat\w+|calculate", text, re.I):
        pct = float(germ.group(1))
        tot = _num(plated.group(1))
        if not (0.0 < pct <= 100.0) or tot <= 0:
            return _GATE
        val = tot * pct / 100.0
        steps = ["Method: germinated spores = plated spores x "
                 "germination percentage.",
                 f"Given: {_fmt(tot)} spores plated; germination = "
                 f"{_fmt(pct)}%.",
                 f"Germinated = {_fmt(tot)} x {_fmt(pct)}/100 = "
                 f"{_fmt(val)}.",
                 f"Check: {_fmt(val)}/{_fmt(tot)} = {_fmt(val / tot * 100)}"
                 "% -- matches the stated percentage.",
                 "Interpretation: the rest remain dormant or non-viable."]
        return val, steps, (f"germinated spores = {_fmt(val)}"), None, \
            "germinated = plated x pct/100", {"plated": tot, "pct": pct}
    # mode: expected germinations from a per-spore probability
    prob = re.search(r"(\d+(?:\.\d+)?)\s*(%|percent)\s+chance", text, re.I)
    if prob is not None and plated is not None:
        p = float(prob.group(1))
        tot = _num(plated.group(1))
        if not (0.0 < p <= 100.0) or tot <= 0:
            return _GATE
        val = tot * p / 100.0
        steps = ["Method: expected germinations = number of spores x "
                 "germination probability.",
                 f"Given: {_fmt(tot)} spores; each germinates with "
                 f"probability {_fmt(p)}%.",
                 f"Expected = {_fmt(tot)} x {_fmt(p)}/100 = {_fmt(val)}.",
                 f"Check: {_fmt(val)} is far below {_fmt(tot)} -- a "
                 "probability, not a certainty.",
                 "Interpretation: most microscopic spores never find "
                 "suitable conditions."]
        return val, steps, (f"expected germinated = {_fmt(val)}"), None, \
            "E = N x p", {"spores": tot, "p_pct": p}
    # mode: total spores from sporangia x spores each
    spo = re.search(r"(\d[\d,]*(?:\.\d+)?)\s+sporangia\b", text, re.I)
    each = re.search(r"each[^.]{0,30}?produces?\D{0,15}?"
                     r"(\d[\d,]*(?:\.\d+)?(?:\s*[xX]\s*10\s*\^?\s*-?\d+)?)"
                     r"\s*spores?\b|sporangium\s+produces?\D{0,15}?"
                     r"(\d[\d,]*(?:\.\d+)?(?:\s*[xX]\s*10\s*\^?\s*-?\d+)?)"
                     r"\s*spores?\b", text, re.I)
    if spo is not None and each is not None:
        ns = _num(spo.group(1))
        per = _num(each.group(1) or each.group(2))
        if ns <= 0 or per <= 0 or ns * per > 1e15:
            return _GATE
        val = ns * per
        steps = ["Method: total spores = number of sporangia x spores "
                 "produced per sporangium.",
                 f"Given: {fmt_int(ns)} sporangia; {_fmt(per)} spores "
                 "each.",
                 f"Total = {fmt_int(ns)} x {_fmt(per)} = {_fmt(val)} "
                 "spores.",
                 f"Check: {_fmt(val)}/{_fmt(per)} = {fmt_int(ns)} "
                 "sporangia -- closes.",
                 "Interpretation: spore dispersal trades individual "
                 "survival odds for sheer numbers."]
        return val, steps, f"total spores = {_fmt(val)}", None, \
            "N = sporangia x per", {"sporangia": ns, "per": per}
    return _GATE


def fmt_int(v: float) -> str:
    return f"{v:.6g}"


def _c_dihybrid_counts(g, m, text):
    """Expected OFFSPRING COUNTS from a 9:3:3:1 dihybrid self-cross:
    both-traits 9/3/3/1, one-trait 12/4 out of 16."""
    if not re.search(r"dihybrid|9\s*:\s*3\s*:\s*3\s*:\s*1", text, re.I):
        return _GATE
    tot = re.search(r"(\d{2,6})\s+(?:offspring|progeny|seeds?|plants?|"
                    r"peas?|individuals)", text, re.I)
    if tot is None:
        tot = re.search(r"produces?\s+(\d{2,6})\b|yield\w*\s+(\d{2,6})\b",
                        text, re.I)
        if tot is None:
            return _GATE
    total = float(tot.group(1) or tot.group(2))
    if not (16 <= total <= 100000):
        return _GATE
    tl = text.lower()
    # trait -> (character pair, is_dominant_expression)
    trait_map = {"round": (0, True), "wrinkled": (0, False),
                 "yellow": (1, True), "green": (1, False)}
    asked = None
    am = re.search(r"(?:how\s+many|number\s+of\s+(?:expected\s+)?|"
                   r"expected\s+number\s+of)", tl)
    if am is not None:
        span = tl[am.end():am.end() + 90]
        words = []
        for w in re.findall(r"\b(round|wrinkled|yellow|green)\b", span):
            if w not in words:
                words.append(w)
        asked = words[:2]
    if not asked:
        gm = re.search(r"\((?P<gen>rryy|rrgg)\)\s*offspring", tl)
        if gm is not None:
            asked = {"rryy": ["wrinkled", "green"],
                     "rrgg": ["wrinkled", "green"]}[gm.group("gen")]
    if not asked:
        return _GATE
    # fraction out of 16 from the asked character expressions
    pairs = {}
    n_dom = 0
    n_rec = 0
    for w in asked:
        pair, dom = trait_map[w]
        if pair in pairs:
            return _GATE  # both expressions of one character: ambiguous
        pairs[pair] = dom
        n_dom += 1 if dom else 0
        n_rec += 0 if dom else 1
    if n_dom == 2:
        frac16 = 9.0
    elif n_dom == 1 and n_rec == 1:
        frac16 = 3.0
    elif n_rec == 2:
        frac16 = 1.0
    elif n_dom == 1:
        frac16 = 12.0
    else:
        frac16 = 4.0
    val = total * frac16 / 16.0
    asked_s = " and ".join(asked)
    steps = ["Method: a dihybrid RrYy x RrYy gives the 9:3:3:1 "
             "phenotype ratio -- 9 both dominant, 3 + 3 one dominant one "
             "recessive, 1 both recessive (16 boxes).",
             f"Asked: {asked_s}; that box is {frac16:.0f}/16 of the "
             "progeny.",
             f"Expected count = {fmt_int(total)} x {frac16:.0f}/16 = "
             f"{_fmt(val)}.",
             f"Check: {_fmt(val)}/{fmt_int(total)} = "
             f"{_fmt(val / total * 100)}% = {frac16:.0f}/16 -- consistent "
             "with the ratio.",
             "Interpretation: counts are expectations; real crosses "
             "fluctuate around them by chance."]
    return val, steps, (f"expected {asked_s} = {_fmt(val)} of "
                        f"{fmt_int(total)}"), None, \
        "count = total x n/16", {"total": total, "frac16": frac16}


def _c_recomb_freq(g, m, text):
    """Recombination frequency: RF% = recombinants / total progeny x
    100 (test cross), and the reverse expected-count solve."""
    if not re.search(r"recombination\s+(?:frequency|value|percent)|"
                     r"map\s+distance|recombinant", text, re.I):
        return _GATE
    # reverse: RF given, total progeny -> expected recombinant count
    rf = re.search(r"recombination\s+(?:frequency\s+)?(?:of\s+)?"
                   r"(?:is\s+)?(\d+(?:\.\d+)?)\s*(%|percent)?", text,
                   re.I)
    tot = re.search(r"(\d{2,6})\s+(?:offspring|progeny|individuals|"
                    r"seeds?)", text, re.I)
    if rf is not None and tot is not None and \
            re.search(r"how\s+many|number\s+of\s+recombinant|expected",
                      text, re.I):
        pct = float(rf.group(1))
        total = float(tot.group(1))
        if not (0.0 <= pct <= 50.0) or not (10 <= total <= 100000):
            return _GATE
        val = total * pct / 100.0
        steps = ["Method: recombination frequency = recombinant "
                 "progeny / total progeny x 100; rearranged, expected "
                 "recombinants = RF x total.",
                 f"Given: RF = {_fmt(pct)}%; progeny = {fmt_int(total)}.",
                 f"Expected recombinants = {fmt_int(total)} x "
                 f"{_fmt(pct)}/100 = {_fmt(val)}.",
                 f"Check: {_fmt(val)}/{fmt_int(total)} = {_fmt(pct)}% -- "
                 "matches the stated frequency.",
                 "Interpretation: 1% recombination = 1 map unit (m.u. = "
                 "centimorgan)."]
        return val, steps, (f"expected recombinants = {_fmt(val)} of "
                            f"{fmt_int(total)}"), None, \
            "R = RF x total", {"rf_pct": pct, "total": total}
    # forward: parental + recombinant counts -> RF%
    par = re.search(r"(\d{2,6})\s+parental", text, re.I)
    rec = re.search(r"(\d{1,6})\s+recombinant", text, re.I)
    if par is None or rec is None:
        return _GATE
    np_, nr = float(par.group(1)), float(rec.group(1))
    total = np_ + nr
    if total <= 0:
        return _GATE
    val = nr / total * 100.0
    if not (0.0 <= val <= 50.0):
        return _GATE
    steps = ["Method: recombination frequency = recombinant progeny / "
             "total progeny x 100; in a test cross the frequency equals "
             "the map distance between the genes.",
             f"Given: {fmt_int(np_)} parental and {fmt_int(nr)} "
             f"recombinant offspring (total {fmt_int(total)}).",
             f"RF = {fmt_int(nr)}/{fmt_int(total)} x 100 = {_fmt(val)}%.",
             f"Check: {_fmt(val)}% of {fmt_int(total)} = "
             f"{_fmt(total * val / 100)} recombinants -- closes.",
             f"Interpretation: the two genes are {_fmt(val)} map units "
             "apart; RF never exceeds 50% (independent assortment)."]
    return val, steps, f"recombination frequency = {_fmt(val)}%", None, \
        "RF = recombinants / total x 100", \
        {"parental": np_, "recombinant": nr, "rf_pct": val}


# --------------------------------------------------------------------------- #
# BIOTECH NUMERICS (moved from biotech_numeric_families.py, WS-B
# map step 4 / map section 5.4 -- one biology file; the row rides
# the model_biology dispatcher at its registration position).
# Unique helpers move verbatim; the two names that collided with
# this module's helpers keep their bodies as _bt_normalize/_bt_fmt.
# --------------------------------------------------------------------------- #

_DEV_RE = re.compile(r"[\u0900-\u097F]")

_REFUSE_RE = re.compile(
    r"\b(?:design\w*|critique|critically|percent\s+error|percentage\s+"
    r"error|in\s+agreement|agreement\s+between|confidence\s+interval|"
    r"poisson|discuss\w*|evaluate\w*|explain\s+why|procedural\s+error|"
    r"identify\s+the\s+likely)\b", re.I)


def _bt_normalize(text: str) -> str:
    t = (text or "")
    for a, b in (("\u2018", "'"), ("\u2019", "'"), ("\u201c", '"'),
                 ("\u201d", '"'), ("\u2013", "-"), ("\u2014", "-"),
                 ("\u2011", "-"), ("\u2212", "-"), ("\u00a0", " "),
                 ("\u00d7", "x"), ("\u00b5", "u")):
        t = t.replace(a, b)
    return re.sub(r"\s+", " ", t).strip()


def _sci(x: float) -> str:
    """Corpus-style scientific formatting: 2400000 -> '2.4 x 10^6'."""
    if x == 0:
        return "0"
    import math
    e = int(math.floor(math.log10(abs(x))))
    if -2 <= e <= 5:
        return f"{x:.6g}"
    mant = x / (10 ** e)
    mant_s = f"{mant:.6g}"
    return f"{mant_s} x 10^{e}"

# --------------------------------------------------------------------------- #
# BIO_HEMOCYTOMETER
# --------------------------------------------------------------------------- #


def _c_hemocytometer(g, m, text):
    norm = _bt_normalize(text)
    if not norm or _DEV_RE.search(norm):
        return _GATE
    if not re.search(r"hemocytometer|haemocytometer|cells\s+per\s+(?:large"
                     r"\s+)?square|per\s+large\s+square", norm, re.I):
        return _GATE
    if not re.search(r"concentration\s+in\s+cells|cells\s*ml|cells\s+per\s+"
                     r"ml|what\s+concentration|report\w*\s+concentration|"
                     r"viable\s+cell\s+concentration|correct\s+"
                     r"concentration", norm, re.I):
        return _GATE  # only concentration asks; essays stay GUIDED
    if _REFUSE_RE.search(norm):
        return _GATE
    dil: Optional[float] = None
    dm = re.search(r"1\s*:\s*(\d+)\s*(?:dilution|diluted)?", norm)
    if dm:
        dil = float(dm.group(1))
    if dil is None:
        # equal-volume mixing: "100 uL suspension mixed with 100 uL trypan
        # blue" -> dilution factor (a + b)/a
        mix = re.search(
            r"(\d+(?:\.\d+)?)\s*ul[^.]{0,40}?(?:is\s+)?mixed\s+with\s+"
            r"(\d+(?:\.\d+)?)\s*ul", norm, re.I)
        if mix and float(mix.group(1)) > 0:
            a, b = float(mix.group(1)), float(mix.group(2))
            dil = (a + b) / a
    if not dil or dil < 1:
        return _GATE
    avg: Optional[float] = None
    how = ""
    am = re.search(
        r"average\s+of\s+(\d+(?:\.\d+)?)\s+cells?\s+per\s+(?:large\s+)?"
        r"square|counts?\s+an\s+average\s+of\s+(\d+(?:\.\d+)?)\s+cells?\s+"
        r"per\s+(?:large\s+)?square|average\s+count\s+is\s+"
        r"(\d+(?:\.\d+)?)", norm, re.I)
    if am:
        avg = float(next(v for v in am.groups() if v))
        how = f"stated average count = {_bt_fmt(avg)} cells per large square."
    else:
        # explicit count list: average the stated per-square counts
        lm = re.search(
            r"counts?\s*(?:\([^)]*\))?\s*(?:are|is|were|:)?\s*"
            r"(\d+(?:\.\d+)?(?:\s*,\s*\d+(?:\.\d+)?)+)", norm, re.I)
        vals: List[float] = []
        if lm:
            vals = [float(v) for v in lm.group(1).split(",")]
        else:
            # fallback: first comma-run of >= 3 numbers in the text
            # ("... diluted sample: 12, 15, 9, 14, 10.")
            for run in re.findall(
                    r"\d+(?:\.\d+)?(?:\s*,\s*\d+(?:\.\d+)?)+", norm):
                cand = [float(v) for v in run.split(",")]
                if len(cand) >= 3:
                    vals = cand
                    break
        if vals:
            if len(vals) < 2:
                return _GATE
            avg = sum(vals) / len(vals)
            how = ("average of the stated counts "
                   f"({', '.join(str(int(v)) if v == int(v) else str(v) for v in vals)})"
                   f" = {_bt_fmt(avg)} cells per large square.")
        else:
            sm = re.search(
                r"(\d+(?:\.\d+)?)\s+cells?\s+in\s+the\s+(?:centre|central|"
                r"corner)\s+(?:large\s+)?square", norm, re.I)
            if sm:
                avg = float(sm.group(1))
                how = (f"single-square count = {_bt_fmt(avg)} cells (used as "
                       "the stated average).")
    if not avg or avg <= 0:
        return _GATE
    chamber = 10 ** 4  # 0.1 mm depth x 1 mm^2 square = 10^-4 mL
    conc = avg * dil * chamber
    steps = [
        "Method: an Improved Neubauer large square holds 0.1 mm x "
        "1 mm^2 = 0.1 mm^3 = 10^-4 mL, so cells per mL = average count "
        "per large square x dilution factor x 10^4.",
        f"Given: average count per large square = {_bt_fmt(avg)}; dilution "
        f"factor = {_bt_fmt(dil)}.  {how}",
        f"Rule applied: chamber factor 10^4 converts counts per square "
        f"to counts per mL of the DILUTED suspension: {_bt_fmt(avg)} x "
        f"10^4 = {_sci(avg * chamber)} cells/mL.",
        f"Rule applied: undo the dilution -- {_sci(avg * chamber)} x "
        f"{_bt_fmt(dil)} = {_sci(conc)} cells/mL in the original "
        "suspension.",
        f"Check: dividing back, {_sci(conc)} / ({_bt_fmt(dil)} x 10^4) = "
        f"{_bt_fmt(avg)} cells per large square -- the arithmetic closes.",
        "Interpretation: the original suspension concentration is "
        f"{_sci(conc)} cells per mL; the dilution factor multiplies "
        "(never divides) the counted concentration.",
    ]
    return conc, steps, f"{_sci(conc)} cells per mL", None, \
        "cells/mL = avg count x dilution factor x 10^4", \
        {"cells_per_ml": conc, "avg_count": avg, "dilution": dil}


def _bt_fmt(x: float) -> str:
    if abs(x - round(x)) < 1e-9:
        return str(int(round(x)))
    return f"{x:.6g}".rstrip("0")


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
    ("DIHYBRID_COUNTS",
     r"dihybrid|9\s*:\s*3\s*:\s*3\s*:\s*1",
     _c_dihybrid_counts),
    ("RECOMBINATION_FREQUENCY",
     r"recombination\s+(?:frequency|value|percent)|map\s+distance|"
     r"recombinant",
     _c_recomb_freq),
    ("PUNNETT_CROSS", _PUNNETT_PAIR, _c_punnett),
    ("PUNNETT_SELF",
     r"self(?:[- ]?(?:pollinat\w+|fertilis\w+|fertiliz\w+)|\s*cross)",
     _c_punnett_self),
    ("PUNNETT_CROSS", _PUNNETT_LOOSE, _c_punnett),
    ("PEDIGREE_PROBABILITY", r"pedigree", _c_pedigree),

    # ---- physiology ----
    ("ALVEOLAR_VENTILATION",
     r"alveolar\s+ventilation|dead\s+space",
     _c_alveolar),
    ("BLOOD_VOLUME_INDICES",
     r"haematocrit|hematocrit|packed\s+cell\s+volume|\bPCV\b",
     _c_blood_volume),
    ("CARDIAC_OUTPUT",
     r"cardiac\s+output|stroke\s+volume",
     _c_cardiac),
    ("BREATHING_VOLUME",
     r"tidal\s+volume|vital\s+capacity|residual\s+volume|inspiratory|"
     r"expiratory|total\s+lung\s+capacity|functional\s+residual|"
     r"minute\s+ventilation|breathing\s+rate",
     _c_breathing),
    ("TRANSPIRATION_RATE", r"transpiration|potometer", _c_transpiration),
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
    ("SPORE_COUNTS",
     r"spores?\b|sporang",
     _c_spore_counts),

    # ---- biotech ----
    ("RESTRICTION_SITE_COUNT",
     r"restriction|EcoRI|BamHI|HindIII|PstI|SmaI|XhoI|KpnI|SalI|palindrom",
     _c_restriction),
    ("PCR_AMPLIFICATION",
     r"PCR|polymerase\s+chain\s+reaction",
     _c_pcr),
    ("CHARGAFF_DNA",
     r"chargaff|base\s+composition|adenine|guanine|cytosine|thymine|"
     r"\bDNA\b|nucleotides?",
     _c_chargaff),
    # ---- BIOTECH block (moved from biotech_numeric_families.py,
    # WS-B map step 4): hemocytometer chamber-count numericals; the
    # trigger is instrument-specific so the wide bio rows never see it.
    ("BIO_HEMOCYTOMETER",
     r"hemocytometer|haemocytometer|cells\s+per\s+(?:large\s+)?square",
     _c_hemocytometer),
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
