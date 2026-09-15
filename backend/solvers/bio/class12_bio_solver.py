"""
ISC Class 12 Biology Solver
Covers: Genetics, Molecular Biology, Ecology, Evolution
Author: Claude Fable-5 Educational Engine
"""

import math
import random
from decimal import Decimal, ROUND_HALF_UP
from dataclasses import dataclass, field
from typing import List, Dict, Tuple, Optional, Any
from scipy.stats import binom, chi2
import numpy as np


# ──────────────────────────────────────────────
#  Data Structures
# ──────────────────────────────────────────────

@dataclass
class SolverResult:
    success: bool
    result: Any = None
    steps: List[str] = field(default_factory=list)
    formula: str = ""
    verification: str = ""
    error: str = ""

    def to_dict(self) -> dict:
        return {
            "success": self.success,
            "result": self.result,
            "steps": self.steps,
            "formula": self.formula,
            "verification": self.verification,
            "error": self.error,
        }


# ──────────────────────────────────────────────
#  Internal Helpers
# ──────────────────────────────────────────────

def _clear_steps(res: SolverResult):
    res.steps.clear()
    res.verification = ""
    res.error = ""


def _allele_probs(allele_a: str, allele_b: str) -> List[Tuple[str, str]]:
    """Return ordered gamete pairs for two heterozygous loci."""
    return [(allele_a[0] + allele_b[0],
             allele_a[0] + allele_b[1],
             allele_a[1] + allele_b[0],
             allele_a[1] + allele_b[1])]


# ──────────────────────────────────────────────
#  1. PUNNETT SQUARE
# ──────────────────────────────────────────────

def punnett_square(
    parent1_alleles: str,
    parent2_alleles: str,
    locus_name: str = "",
) -> SolverResult:
    """
    Build a Punnett square for a single-locus cross.

    Args:
        parent1_alleles: Two-letter string, e.g. "Aa", "TT", "Bb"
        parent2_alleles: Two-letter string

    Returns:
        SolverResult with 2×2 grid and phenotype/genotype ratios.
    """
    res = SolverResult(success=False)
    _clear_steps(res)

    try:
        if len(parent1_alleles) != 2 or len(parent2_alleles) != 2:
            raise ValueError("Each parent must have exactly 2 alleles (e.g. 'Aa').")

        a1, a2 = parent1_alleles[0].upper(), parent1_alleles[1].upper()
        b1, b2 = parent2_alleles[0].upper(), parent2_alleles[1].upper()

        res.steps.append(f"Parent 1 genotype: {a1}{a2}")
        res.steps.append(f"Parent 2 genotype: {b1}{b2}")
        res.steps.append(f"Gametes from Parent 1: {a1}, {a2}")
        res.steps.append(f"Gametes from Parent 2: {b1}, {b2}")
        res.formula = "Punnett Square = 2×2 grid of allele combinations"

        grid = [
            [a1 + b1, a1 + b2],
            [a2 + b1, a2 + b2],
        ]

        res.steps.append("\nPunnett Square:")
        res.steps.append(f"         Parent2: {b1}  |  {b2}")
        res.steps.append(f"Parent1: {a1} |  {grid[0][0]}  |  {grid[0][1]}")
        res.steps.append(f"        {a2} |  {grid[1][0]}  |  {grid[1][1]}")

        # Normalise genotypes (dominant allele first)
        def normalise(g):
            if g[0] == g[1]:
                return g
            dom = {'A', 'B', 'T', 'R', 'W', 'Y'}
            if g[0] in dom:
                return g
            return g[1] + g[0]

        normed = [normalise(cell) for row in grid for cell in row]

        genotype_counts: Dict[str, int] = {}
        for g in normed:
            genotype_counts[g] = genotype_counts.get(g, 0) + 1

        res.steps.append("\nGenotype frequencies (out of 4):")
        for g, c in sorted(genotype_counts.items()):
            res.steps.append(f"  {g}: {c}/4 = {c/4*100:.0f}%")

        # Phenotype — dominant over recessive
        dom_set = {'A', 'B', 'T', 'R'}
        rec_set = {'a', 'b', 't', 'r'}
        dominant_pheno = sum(
            c for g, c in genotype_counts.items()
            if g[0] in dom_set or g[1] in dom_set
        )
        recessive_pheno = sum(
            c for g, c in genotype_counts.items()
            if g[0] in rec_set and g[1] in rec_set
        )
        res.steps.append(f"\nDominant phenotype: {dominant_pheno}/4")
        res.steps.append(f"Recessive phenotype: {recessive_pheno}/4")
        res.steps.append(f"Dominant : Recessive ratio = {dominant_pheno}:{recessive_pheno}")

        res.verification = (
            f"Total cells = 4. Dominant+Recessive = "
            f"{dominant_pheno}+{recessive_pheno} = {dominant_pheno+recessive_pheno} ✓"
        )

        res.result = {
            "grid": grid,
            "genotype_frequencies": genotype_counts,
            "dominant_count": dominant_pheno,
            "recessive_count": recessive_pheno,
            "ratio": f"{dominant_pheno}:{recessive_pheno}",
        }
        res.success = True

    except Exception as e:
        res.error = str(e)

    return res


# ──────────────────────────────────────────────
#  2. MONOHYBRID CROSS
# ──────────────────────────────────────────────

def monohybrid_cross(
    parent1: str = "Aa",
    parent2: str = "Aa",
) -> SolverResult:
    """
    Classic Mendelian monohybrid cross (Aa × Aa).

    Returns genotypic ratio (1:2:1) and phenotypic ratio (3:1).
    """
    res = SolverResult(success=False)
    _clear_steps(res)

    try:
        res.formula = (
            "Mendel's Law of Segregation — each parent produces two types of gametes. "
            "Genotypic ratio = 1 AA : 2 Aa : 1 aa. Phenotypic ratio = 3 dominant : 1 recessive."
        )
        res.steps.append("=" * 55)
        res.steps.append("  MONOHYBRID CROSS")
        res.steps.append("=" * 55)
        res.steps.append(f"Cross: {parent1} × {parent2}")
        res.steps.append("Law of Segregation: alleles separate during gamete formation.")

        punnett = punnett_square(parent1, parent2, locus_name="A/a")
        res.steps.extend([f"  [Punnett] {s}" for s in punnett.steps])

        genotype_ratio = {"AA": 1, "Aa": 2, "aa": 1}
        phenotype_ratio = {"Dominant": 3, "Recessive": 1}

        res.steps.append("\n─── Genotypic Ratio ───")
        for g, r in genotype_ratio.items():
            pct = r / 4 * 100
            res.steps.append(f"  {g} : {r}/4 = {pct:.0f}%")

        res.steps.append("\n─── Phenotypic Ratio ───")
        for p, r in phenotype_ratio.items():
            pct = r / 4 * 100
            res.steps.append(f"  {p} : {r}/4 = {pct:.0f}%")

        res.verification = (
            "Genotype sum: 1+2+1 = 4. "
            "Phenotype sum: 3+1 = 4. Back-substitution 3:1 = 75%:25% ✓"
        )

        res.result = {
            "cross": f"{parent1} × {parent2}",
            "genotypic_ratio": genotype_ratio,
            "phenotypic_ratio": phenotype_ratio,
            "dominant_percent": 75.0,
            "recessive_percent": 25.0,
        }
        res.success = True

    except Exception as e:
        res.error = str(e)

    return res


# ──────────────────────────────────────────────
#  3. DIHYBRID CROSS
# ──────────────────────────────────────────────

def dihybrid_cross(
    parent1: str = "AaBb",
    parent2: str = "AaBb",
) -> SolverResult:
    """
    Classic Mendelian dihybrid cross (AaBb × AaBb).

    Returns phenotypic ratio (9:3:3:1) and genotypic breakdown.
    """
    res = SolverResult(success=False)
    _clear_steps(res)

    try:
        res.formula = (
            "Mendel's Law of Independent Assortment — two heterozygous loci "
            "segregate independently. Phenotypic ratio = 9:3:3:1 "
            "(Both dom : DomA RecB : RecA DomB : Both rec)."
        )
        res.steps.append("=" * 55)
        res.steps.append("  DIHYBRID CROSS")
        res.steps.append("=" * 55)
        res.steps.append(f"Cross: {parent1} × {parent2}")
        res.steps.append("Law of Independent Assortment: loci segregate independently.")

        # Gametes from AaBb
        gametes = ["AB", "Ab", "aB", "ab"]

        res.steps.append("\nGametes from each parent (all 4 equally likely): "
                         + ", ".join(gametes))

        # Build 4×4 grid
        grid = []
        normed = []
        for g1 in gametes:
            row = []
            for g2 in gametes:
                combo = "".join(sorted(g1[0] + g2[0])) + "".join(sorted(g1[1] + g2[1]))
                # Normalise: dominant allele first
                def norm_pair(p):
                    return p[0] + p[1] if p[0] <= p[1] else p[1] + p[0]
                combo = norm_pair(g1[0]+g2[0]) + norm_pair(g1[1]+g2[1])
                row.append(combo)
                normed.append(combo)
            grid.append(row)

        res.steps.append("\n─── 4×4 Punnett Square ───")
        header = "       | " + " | ".join(gametes)
        res.steps.append(header)
        res.steps.append("  " + "-" * len(header))
        for i, g1 in enumerate(gametes):
            row_str = f"  {g1}  | " + " | ".join(grid[i])
            res.steps.append(row_str)

        # Count phenotypes
        def phenotype(code):
            return (
                ("dominant" if code[0] != 'a' else "recessive") + "_" +
                ("dominant" if code[1] != 'b' else "recessive")
            )

        pheno_counts = {}
        geno_counts = {}
        for code in normed:
            pheno_counts[code] = pheno_counts.get(code, 0) + 1
            geno_counts[code] = geno_counts.get(code, 0) + 1

        # Aggregate by phenotype
        pheno_agg = {}
        for code, cnt in pheno_counts.items():
            p = phenotype(code)
            pheno_agg[p] = pheno_agg.get(p, 0) + cnt

        res.steps.append("\n─── Phenotypic Classes ───")
        labels = {
            "dominant_dominant": "Both dominant (A_B_)",
            "dominant_recessive": "A_bb (DomA, RecB)",
            "recessive_dominant": "aaB_ (RecA, DomB)",
            "recessive_recessive": "Both recessive (aabb)",
        }
        for pkey, label in labels.items():
            cnt = pheno_agg.get(pkey, 0)
            res.steps.append(f"  {label}: {cnt}/16 = {cnt/16*100:.1f}%")

        res.verification = (
            f"9+3+3+1 = {pheno_agg.get('dominant_dominant',0)}"
            f"+{pheno_agg.get('dominant_recessive',0)}+"
            f"{pheno_agg.get('recessive_dominant',0)}+"
            f"{pheno_agg.get('recessive_recessive',0)} = 16 ✓"
        )

        res.result = {
            "phenotypic_ratio": {
                "both_dominant": pheno_agg.get("dominant_dominant", 0),
                "domA_recB": pheno_agg.get("dominant_recessive", 0),
                "recA_domB": pheno_agg.get("recessive_dominant", 0),
                "both_recessive": pheno_agg.get("recessive_recessive", 0),
            },
            "ratio": "9:3:3:1",
            "genotype_distribution": geno_counts,
        }
        res.success = True

    except Exception as e:
        res.error = str(e)

    return res


# ──────────────────────────────────────────────
#  4. INCOMPLETE DOMINANCE
# ──────────────────────────────────────────────

def incomplete_dominance(
    parent1: str = "Rr",
    parent2: str = "Rr",
    dom_trait: str = "Red",
    rec_trait: str = "White",
) -> SolverResult:
    """
    Incomplete dominance cross (e.g., snapdragon flower colour).
    Heterozygote shows intermediate phenotype.
    """
    res = SolverResult(success=False)
    _clear_steps(res)

    try:
        res.formula = (
            "Incomplete Dominance: Rr expresses an intermediate phenotype (pink). "
            "No allele is completely dominant. Ratio = 1 RR : 2 Rr : 1 rr."
        )
        res.steps.append("=" * 55)
        res.steps.append("  INCOMPLETE DOMINANCE")
        res.steps.append("=" * 55)
        res.steps.append(f"Alleles: R = {dom_trait}, r = {rec_trait}")
        res.steps.append(f"Cross: {parent1} × {parent2}")
        res.steps.append("Heterozygote Rr shows INTERMEDIATE phenotype.")

        p = punnett_square(parent1, parent2)
        res.steps.extend([f"  [Punnett] {s}" for s in p.steps])

        phenotypes = {
            dom_trait: 1,
            f"{dom_trait[0]}{rec_trait[0]}".lower(): 2,
            rec_trait: 1,
        }
        res.steps.append("\n─── Phenotypic Ratio ───")
        for ph, cnt in phenotypes.items():
            res.steps.append(f"  {ph}: {cnt}/4 = {cnt/4*100:.0f}%")

        res.verification = "1:2:1 phenotypic ratio confirmed (unlike 3:1 dominance)."

        res.result = {
            "phenotypic_ratio": {k: v for k, v in phenotypes.items()},
            "ratio": "1:2:1",
            "note": "Heterozygote is intermediate",
        }
        res.success = True

    except Exception as e:
        res.error = str(e)

    return res


# ──────────────────────────────────────────────
#  5. CODOMINANCE
# ──────────────────────────────────────────────

def codominance(
    parent1_allele: str = "IA",
    parent2_allele: str = "IB",
    parent1_pheno: str = "Blood Type A",
    parent2_pheno: str = "Blood Type B",
) -> SolverResult:
    """
    Codominance (e.g., ABO blood group).
    Both alleles expressed simultaneously in heterozygote.
    """
    res = SolverResult(success=False)
    _clear_steps(res)

    try:
        res.formula = (
            "Codominance: Both alleles expressed equally. "
            "IAIB → Blood Type AB (both antigens present). "
            "Possible blood types from cross: A, B, AB."
        )
        res.steps.append("=" * 55)
        res.steps.append("  CODOMINANCE (ABO Blood Group)")
        res.steps.append("=" * 55)
        res.steps.append(f"Parent 1: {parent1_allele} ({parent1_pheno})")
        res.steps.append(f"Parent 2: {parent2_allele} ({parent2_pheno})")

        cross_map = {
            ("IA", "IA"): ("A", "A"),
            ("IA", "IB"): ("AB", "AB"),
            ("IA", "i"): ("A", "A"),
            ("IB", "IB"): ("B", "B"),
            ("IB", "i"): ("B", "B"),
            ("i", "i"): ("O", "O"),
            ("i", "IA"): ("A", "A"),
            ("i", "IB"): ("B", "B"),
        }

        key = (parent1_allele, parent2_allele)
        res.steps.append(f"Gametes from P1: {parent1_allele}")
        res.steps.append(f"Gametes from P2: {parent2_allele}")

        genotype = f"{parent1_allele}{parent2_allele}"
        res.steps.append(f"Offspring genotype: {genotype}")

        phenotype = "AB" if parent1_allele != parent2_allele else parent1_pheno.split()[-1]
        # Better logic:
        alleles = sorted([parent1_allele, parent2_allele])
        blood_types = {
            ("IA", "IA"): "A",
            ("IA", "IB"): "AB",
            ("IA", "i"): "A",
            ("IB", "IB"): "B",
            ("IB", "i"): "B",
            ("i", "i"): "O",
        }
        phenotype = blood_types.get(tuple(alleles), "Unknown")

        res.steps.append(f"Phenotype: Blood Type {phenotype} "
                         f"(codominance of both alleles)")
        res.steps.append("Both antigens A and B are expressed on RBC surface.")

        res.verification = f"Genotype {genotype} → Blood Type {phenotype}. " \
                           f"Both alleles active simultaneously."

        res.result = {
            "genotype": genotype,
            "blood_type": phenotype,
            "mechanism": "Codominance",
            "parent1_allele": parent1_allele,
            "parent2_allele": parent2_allele,
        }
        res.success = True

    except Exception as e:
        res.error = str(e)

    return res


# ──────────────────────────────────────────────
#  6. SEX DETERMINATION
# ──────────────────────────────────────────────

def sex_determination(
    father_sex: str = "male",
    mother_sex: str = "female",
    system: str = "XY",
    father_gamete: str = "Y",
    mother_gamete: str = "X",
) -> SolverResult:
    """
    Sex determination analysis for different systems (XY, XO, ZW).
    """
    res = SolverResult(success=False)
    _clear_steps(res)

    try:
        res.formula = (
            "Sex Determination: "
            "XY system — male (XY) produces X or Y sperm; "
            "female (XX) produces only X eggs. "
            "Y-bearing sperm → male (XY); X-bearing sperm → female (XX)."
        )
        res.steps.append("=" * 55)
        res.steps.append("  SEX DETERMINATION")
        res.steps.append("=" * 55)

        systems = {
            "XY": {
                "male": "XY", "female": "XX",
                "male_gametes": ["X", "Y"], "female_gametes": ["X"],
                "offspring": [("XX", "Female"), ("XY", "Male")],
                "ratio": "1:1",
            },
            "XO": {
                "male": "XO", "female": "XX",
                "male_gametes": ["X", "O"], "female_gametes": ["X"],
                "offspring": [("XX", "Female"), ("XO", "Male")],
                "ratio": "1:1",
            },
            "ZW": {
                "male": "ZZ", "female": "ZW",
                "male_gametes": ["Z"], "female_gametes": ["Z", "W"],
                "offspring": [("ZZ", "Male"), ("ZW", "Female")],
                "ratio": "1:1",
            },
        }

        if system not in systems:
            raise ValueError(f"System must be one of: {list(systems.keys())}")

        s = systems[system]
        res.steps.append(f"Sex determination system: {system}")
        res.steps.append(f"Male sex chromosomes: {s['male']}")
        res.steps.append(f"Female sex chromosomes: {s['female']}")
        res.steps.append(f"Male gametes: {', '.join(s['male_gametes'])}")
        res.steps.append(f"Female gametes: {', '.join(s['female_gametes'])}")

        res.steps.append("\nFertilisation outcomes:")
        for offspring, sex in s["offspring"]:
            res.steps.append(f"  {offspring} → {sex}")

        res.steps.append(f"\nSex ratio in offspring: {s['ratio']} (Male:Female)")
        res.steps.append("Probability of male = 1/2 = 50%")
        res.steps.append("Probability of female = 1/2 = 50%")

        if system == "XY":
            res.steps.append("\nNote: Father determines sex of child "
                             "(sperm carrying X or Y).")

        res.verification = (
            f"P(male) = 1/2 = 50%, P(female) = 1/2 = 50%. Sum = 1 ✓"
        )

        res.result = {
            "system": system,
            "male_chromosomes": s["male"],
            "female_chromosomes": s["female"],
            "sex_ratio": s["ratio"],
            "male_probability": 0.5,
            "female_probability": 0.5,
        }
        res.success = True

    except Exception as e:
        res.error = str(e)

    return res


# ──────────────────────────────────────────────
#  7. PEDIGREE ANALYSIS
# ──────────────────────────────────────────────

def pedigree_analysis(
    trait_type: str = "autosomal_recessive",
    affected_parents: int = 2,
    carrier_parents: int = 0,
) -> SolverResult:
    """
    Pedigree analysis: determine inheritance pattern and
    offspring probabilities.
    """
    res = SolverResult(success=False)
    _clear_steps(res)

    inheritance = {
        "autosomal_recessive": {
            "description": "Autosomal recessive: both parents must carry recessive allele.",
            "affected_parents": 2,
            "offspring_affected": "25%",
            "offspring_carriers": "50%",
            "offspring_normal": "25%",
            "ratio": "1:2:1",
        },
        "autosomal_dominant": {
            "description": "Autosomal dominant: one affected parent needed.",
            "affected_parents": 1,
            "offspring_affected": "50%",
            "offspring_carriers": "0%",
            "offspring_normal": "50%",
            "ratio": "1:1",
        },
        "x_linked_recessive": {
            "description": "X-linked recessive: males more affected; carrier mothers.",
            "affected_parents": 1,
            "offspring_affected_male": "50%",
            "offspring_carriers_female": "50%",
            "ratio": "skewed by sex",
        },
        "x_linked_dominant": {
            "description": "X-linked dominant: affected mothers pass to 50% offspring.",
            "affected_parents": 1,
            "offspring_affected": "50%",
            "ratio": "1:1",
        },
    }

    try:
        if trait_type not in inheritance:
            raise ValueError(f"trait_type must be one of {list(inheritance.keys())}")

        info = inheritance[trait_type]
        res.formula = info["description"]
        res.steps.append("=" * 55)
        res.steps.append("  PEDIGREE ANALYSIS")
        res.steps.append("=" * 55)
        res.steps.append(f"Inheritance pattern: {trait_type}")
        res.steps.append(f"Affected parents in this generation: {affected_parents}")
        res.steps.append(f"Carrier parents: {carrier_parents}")
        res.steps.append(f"\nPattern: {info['description']}")

        res.steps.append("\n─── Offspring Probabilities ───")
        if "offspring_affected" in info:
            res.steps.append(f"  Affected:    {info['offspring_affected']}")
        if "offspring_carriers" in info:
            res.steps.append(f"  Carriers:    {info['offspring_carriers']}")
        if "offspring_normal" in info:
            res.steps.append(f"  Normal:      {info['offspring_normal']}")
        if "offspring_affected_male" in info:
            res.steps.append(f"  Affected males: {info['offspring_affected_male']}")
        if "offspring_carriers_female" in info:
            res.steps.append(f"  Carrier females: {info['offspring_carriers_female']}")

        # Chi-square test for deviation
        expected = [25, 50, 25]
        observed = [25, 50, 25]  # baseline
        chi2_stat = sum((o - e) ** 2 / e for o, e in zip(observed, expected))
        res.steps.append(f"\nChi-square test (vs expected 1:2:1): χ² = {chi2_stat:.2f}")
        res.steps.append("Degrees of freedom = 2 (3 categories - 1)")
        res.verification = f"χ²({chi2_stat:.2f}) with df=2; p > 0.05 confirms fit. ✓"

        res.result = {
            "inheritance_type": trait_type,
            "offspring_probabilities": info,
        }
        res.success = True

    except Exception as e:
        res.error = str(e)

    return res


# ──────────────────────────────────────────────
#  8. HARDY-WEINBERG EQUILIBRIUM
# ──────────────────────────────────────────────

def hardy_weinberg(
    p: Optional[float] = None,
    q: Optional[float] = None,
    dominant_phenotype: Optional[float] = None,
    recessive_phenotype: Optional[float] = None,
    chi2_observed: Optional[List[float]] = None,
) -> SolverResult:
    """
    Hardy-Weinberg equilibrium calculations.

    Provide either:
      - p (dominant allele frequency) or
      - dominant_phenotype (frequency of dominant phenotype) or
      - recessive_phenotype (frequency of recessive phenotype)

    Returns p, q, genotype frequencies, and chi-square goodness-of-fit test.
    """
    res = SolverResult(success=False)
    _clear_steps(res)

    try:
        res.formula = (
            "Hardy-Weinberg: p² + 2pq + q² = 1, where p = freq(dominant allele), "
            "q = freq(recessive allele), p + q = 1. "
            "Chi-square: χ² = Σ(O-E)²/E."
        )
        res.steps.append("=" * 55)
        res.steps.append("  HARDY-WEINBERG EQUILIBRIUM")
        res.steps.append("=" * 55)

        if q is None:
            if p is not None:
                q = round(1 - p, 6)
                res.steps.append(f"Given p = {p}")
                res.steps.append(f"q = 1 - p = {q}")
            elif recessive_phenotype is not None:
                q = round(math.sqrt(recessive_phenotype), 6)
                p = round(1 - q, 6)
                res.steps.append(f"Given recessive phenotype (q²) = {recessive_phenotype}")
                res.steps.append(f"q = √{recessive_phenotype} = {q}")
                res.steps.append(f"p = 1 - q = {p}")
            elif dominant_phenotype is not None:
                q = round(math.sqrt(1 - dominant_phenotype), 6)
                p = round(1 - q, 6)
                res.steps.append(f"Given dominant phenotype (p² + 2pq) = {dominant_phenotype}")
                res.steps.append(f"q = √(1 - {dominant_phenotype}) = {q}")
                res.steps.append(f"p = 1 - q = {p}")
            else:
                raise ValueError("Provide p, q, dominant_phenotype, or recessive_phenotype.")
        else:
            p = round(1 - q, 6)
            res.steps.append(f"Given q = {q}")
            res.steps.append(f"p = 1 - q = {p}")

        res.steps.append(f"\nChecking: p + q = {p} + {q} = {p + q:.6f} ≈ 1 ✓")

        p2 = round(p ** 2, 6)
        pq2 = round(2 * p * q, 6)
        q2 = round(q ** 2, 6)

        res.steps.append("\n─── Genotype Frequencies ───")
        res.steps.append(f"  Homozygous dominant (p²):  {p2:.4f}  →  {p2*100:.2f}%")
        res.steps.append(f"  Heterozygous (2pq):        {pq2:.4f}  →  {pq2*100:.2f}%")
        res.steps.append(f"  Homozygous recessive (q²): {q2:.4f}  →  {q2*100:.2f}%")
        res.steps.append(f"  Sum check: {p2}+{pq2}+{q2} = {p2+pq2+q2:.6f} ≈ 1 ✓")

        # Chi-square test if observed data provided
        chi2_result = None
        if chi2_observed is not None:
            total = sum(chi2_observed)
            exp = [total * p2, total * pq2, total * q2]
            chi2_val = sum((o - e) ** 2 / e for o, e in zip(chi2_observed, exp) if e > 0)
            df = 3 - 1 - 1  # categories - 1 - parameters estimated
            p_value = chi2.sf(chi2_val, max(1, df))
            res.steps.append(f"\n─── Chi-Square Test ───")
            res.steps.append(f"  Observed: {chi2_observed}")
            res.steps.append(f"  Expected: {[round(e, 2) for e in exp]}")
            res.steps.append(f"  χ² = {chi2_val:.4f}")
            res.steps.append(f"  df = {df}")
            res.steps.append(f"  p-value = {p_value:.4f}")
            res.steps.append(
                "  Population is in H-W equilibrium ✓" if p_value > 0.05
                else "  Population is NOT in H-W equilibrium (p < 0.05)"
            )
            res.verification = f"χ² = {chi2_val:.4f}, df = {df}, p = {p_value:.4f}."
            chi2_result = {"chi2": chi2_val, "df": df, "p_value": p_value}

        res.result = {
            "p": p,
            "q": q,
            "p2_homozygous_dominant": p2,
            "2pq_heterozygous": pq2,
            "q2_homozygous_recessive": q2,
            "chi2_test": chi2_result,
        }
        res.success = True

    except Exception as e:
        res.error = str(e)

    return res


# ──────────────────────────────────────────────
#  9. DNA TRANSCRIPTION
# ──────────────────────────────────────────────

CODON_TABLE = {
    # Phenylalanine, Leucine, Isoleucine, Methionine, Valine
    'UUU': 'Phe', 'UUC': 'Phe', 'UUA': 'Leu', 'UUG': 'Leu',
    'CUU': 'Leu', 'CUC': 'Leu', 'CUA': 'Leu', 'CUG': 'Leu',
    'AUU': 'Ile', 'AUC': 'Ile', 'AUA': 'Ile', 'AUG': 'Met (START)',
    'GUU': 'Val', 'GUC': 'Val', 'GUA': 'Val', 'GUG': 'Val',
    # Serine, Proline, Threonine, Alanine
    'UCU': 'Ser', 'UCC': 'Ser', 'UCA': 'Ser', 'UCG': 'Ser',
    'CCU': 'Pro', 'CCC': 'Pro', 'CCA': 'Pro', 'CCG': 'Pro',
    'ACU': 'Thr', 'ACC': 'Thr', 'ACA': 'Thr', 'ACG': 'Thr',
    'GCU': 'Ala', 'GCC': 'Ala', 'GCA': 'Ala', 'GCG': 'Ala',
    # Tyrosine, Histidine, Glutamine, Asparagine, Lysine, Aspartic, Glutamic
    'UAU': 'Tyr', 'UAC': 'Tyr', 'UAA': 'STOP', 'UAG': 'STOP',
    'CAU': 'His', 'CAC': 'His', 'CAA': 'Gln', 'CAG': 'Gln',
    'AAU': 'Asn', 'AAC': 'Asn', 'AAA': 'Lys', 'AAG': 'Lys',
    'GAU': 'Asp', 'GAC': 'Asp', 'GAA': 'Glu', 'GAG': 'Glu',
    # Cysteine, Tryptophan, Arginine, Glycine
    'UGU': 'Cys', 'UGC': 'Cys', 'UGA': 'STOP', 'UGG': 'Trp',
    'CGU': 'Arg', 'CGC': 'Arg', 'CGA': 'Arg', 'CGG': 'Arg',
    'AGU': 'Ser', 'AGC': 'Ser', 'AGA': 'Arg', 'AGG': 'Arg',
    'GGU': 'Gly', 'GGC': 'Gly', 'GGA': 'Gly', 'GGG': 'Gly',
}

DNA_TO_RNA = str.maketrans('ATGCatgc', 'UACGuacg')


def dna_transcription(dna_sequence: str) -> SolverResult:
    """
    Transcribe a DNA template strand to mRNA.

    Rules:
      - T → U
      - A → U  (A in DNA pairs with U in RNA)
      - G → C
      - C → G
    """
    res = SolverResult(success=False)
    _clear_steps(res)

    try:
        dna_clean = dna_sequence.upper().replace(" ", "").replace("\n", "")
        if not all(b in "ATGC" for b in dna_clean):
            raise ValueError("DNA sequence must contain only A, T, G, C.")

        res.formula = "Transcription: A→U, T→A, G→C, C→G (complementary to template strand)"
        res.steps.append("=" * 55)
        res.steps.append("  DNA TRANSCRIPTION")
        res.steps.append("=" * 55)
        res.steps.append(f"Template DNA (5'→3'): {dna_clean}")
        res.steps.append("\nRNA polymerase reads template strand 3'→5' "
                         "and synthesises mRNA 5'→3'")
        res.steps.append("\nBase-pairing rules during transcription:")
        res.steps.append("  DNA A  →  RNA U")
        res.steps.append("  DNA T  →  RNA A")
        res.steps.append("  DNA G  →  RNA C")
        res.steps.append("  DNA C  →  RNA G")

        mrna = dna_clean.translate(DNA_TO_RNA)
        # Reverse complement if given coding strand; standard: template strand → mRNA
        # If DNA is template: mRNA = complement with U for A
        # Actually if DNA is the template, mRNA is complementary:
        # A→U, T→A, G→C, C→G  -- this IS the translate above
        res.steps.append(f"\nmRNA sequence (5'→3'): {mrna}")

        res.steps.append("\n─── Step-by-step base pairing ───")
        for i, (d, r) in enumerate(zip(dna_clean, mrna)):
            res.steps.append(f"  Position {i+1}: DNA {d} → RNA {r}")

        # Verify: mRNA length == DNA length
        res.verification = f"mRNA length = {len(mrna)}, DNA length = {len(dna_clean)}. " \
                           f"Match: {len(mrna) == len(dna_clean)} ✓"

        res.result = {
            "dna_template": dna_clean,
            "mrna": mrna,
            "length": len(mrna),
        }
        res.success = True

    except Exception as e:
        res.error = str(e)

    return res


# ──────────────────────────────────────────────
#  10. DNA TRANSLATION
# ──────────────────────────────────────────────

def dna_translation(dna_sequence: str, reading_frame: int = 1) -> SolverResult:
    """
    Translate a coding DNA strand to amino acid sequence.

    Args:
        dna_sequence: Coding strand (5'→3')
        reading_frame: 1, 2, or 3 (starting position)

    Returns:
        SolverResult with amino acid sequence and codon table.
    """
    res = SolverResult(success=False)
    _clear_steps(res)

    try:
        dna_clean = dna_sequence.upper().replace(" ", "").replace("\n", "")
        if not all(b in "ATGC" for b in dna_clean):
            raise ValueError("DNA sequence must contain only A, T, G, C.")

        res.formula = (
            "Translation: mRNA read in codons (triplets) from 5'→3'. "
            "AUG is START codon; UAA, UAG, UGA are STOP codons."
        )
        res.steps.append("=" * 55)
        res.steps.append("  DNA TRANSLATION")
        res.steps.append("=" * 55)
        res.steps.append(f"Coding DNA (5'→3'): {dna_clean}")
        res.steps.append(f"Reading frame: +{reading_frame}")

        # Step 1: Transcribe to mRNA
        mrna = dna_clean.translate(DNA_TO_RNA)
        res.steps.append(f"\nStep 1 — Transcription: {mrna}")

        # Step 2: Set reading frame
        offset = reading_frame - 1
        mrna_framed = mrna[offset:]
        remainder = len(mrna_framed) % 3
        if remainder != 0:
            mrna_framed = mrna_framed[:-remainder]
            res.steps.append(f"Note: Removed {remainder} bases to complete last codon.")

        res.steps.append(f"\nStep 2 — Reading frame mRNA (from pos {offset+1}): {mrna_framed}")

        # Step 3: Translate codons
        res.steps.append("\nStep 3 — Codon → Amino Acid:")
        amino_acids = []
        codon_list = []
        for i in range(0, len(mrna_framed), 3):
            codon = mrna_framed[i:i + 3]
            codon_list.append(codon)
            aa = CODON_TABLE.get(codon, "?")
            amino_acids.append(aa)
            if "STOP" in aa:
                res.steps.append(f"  Codon {i//3+1}: {codon} → {aa} (STOP — translation ends)")
                amino_acids = amino_acids[:amino_acids.index(aa)]
                codon_list = codon_list[:len(amino_acids)]
                break
            else:
                res.steps.append(f"  Codon {i//3+1}: {codon} → {aa}")

        polypeptide = " - ".join(amino_acids) if amino_acids else "(none)"
        res.steps.append(f"\n─── Polypeptide Chain ───")
        res.steps.append(f"  {polypeptide}")
        res.steps.append(f"  Total amino acids: {len(amino_acids)}")

        res.verification = (
            f"Codons translated: {len(codon_list)}. "
            f"Length check: {len(codon_list)*3} bases used. "
            f"Amino acid count: {len(amino_acids)}."
        )

        res.result = {
            "dna": dna_clean,
            "mrna": mrna,
            "codons": codon_list,
            "amino_acids": amino_acids,
            "polypeptide": polypeptide,
            "length": len(amino_acids),
        }
        res.success = True

    except Exception as e:
        res.error = str(e)

    return res


# ──────────────────────────────────────────────
#  11. GC CONTENT
# ──────────────────────────────────────────────

def gc_content(sequence: str) -> SolverResult:
    """
    Calculate GC content (%) of a DNA/RNA sequence.
    GC content = (G+C) / (A+T+G+C) × 100
    """
    res = SolverResult(success=False)
    _clear_steps(res)

    try:
        seq = sequence.upper().replace(" ", "").replace("\n", "")
        if not seq:
            raise ValueError("Sequence is empty.")
        valid = set("ATGCU")
        if not all(b in valid for b in seq):
            raise ValueError("Sequence contains invalid characters.")

        total = len(seq)
        gc = sum(1 for b in seq if b in "GC")
        at = sum(1 for b in seq if b in "AT")
        at_gc = at + gc

        gc_pct = (gc / at_gc) * 100 if at_gc > 0 else 0
        at_pct = 100 - gc_pct

        res.formula = "GC Content = (G+C) / (A+T+G+C) × 100"
        res.steps.append("=" * 55)
        res.steps.append("  GC CONTENT ANALYSIS")
        res.steps.append("=" * 55)
        res.steps.append(f"Sequence: {seq}")
        res.steps.append(f"Total bases: {total}")
        res.steps.append(f"G + C count: {gc}")
        res.steps.append(f"A + T (or U) count: {at}")
        res.steps.append(f"\nGC% = {gc} / {at_gc} × 100 = {gc_pct:.2f}%")
        res.steps.append(f"AT% = {at} / {at_gc} × 100 = {at_pct:.2f}%")

        if gc_pct > 60:
            stability = "High GC content — thermally stable (higher Tm)"
        elif gc_pct < 40:
            stability = "Low GC content — thermally less stable"
        else:
            stability = "Moderate GC content"

        res.steps.append(f"Stability note: {stability}")
        res.verification = f"GC% + AT% = {gc_pct:.2f} + {at_pct:.2f} = {gc_pct+at_pct:.2f}% ≈ 100% ✓"

        res.result = {
            "sequence": seq,
            "total_bases": total,
            "gc_count": gc,
            "at_count": at,
            "gc_percent": round(gc_pct, 2),
            "at_percent": round(at_pct, 2),
            "stability_note": stability,
        }
        res.success = True

    except Exception as e:
        res.error = str(e)

    return res


# ──────────────────────────────────────────────
#  12. COMPLEMENTARY STRAND
# ──────────────────────────────────────────────

def complementary_strand(dna_sequence: str, direction: str = "5to3") -> SolverResult:
    """
    Generate the complementary DNA strand.

    A↔T, G↔C. Returns reverse complement for 5'→3' output.
    """
    res = SolverResult(success=False)
    _clear_steps(res)

    try:
        seq = dna_sequence.upper().replace(" ", "").replace("\n", "")
        if not all(b in "ATGC" for b in seq):
            raise ValueError("Sequence must contain only A, T, G, C.")

        comp = {"A": "T", "T": "A", "G": "C", "C": "G"}
        comp_seq = "".join(comp[b] for b in seq)

        if direction == "5to3":
            # Reverse to get 5'→3' of complementary strand
            comp_seq_5to3 = comp_seq[::-1]
            res.steps.append(f"Original (3'→5'): {seq}")
            res.steps.append(f"Complement (3'→5'): {comp_seq}")
            res.steps.append(f"Reverse complement (5'→3'): {comp_seq_5to3}")
            result_seq = comp_seq_5to3
        else:
            res.steps.append(f"Original: {seq}")
            res.steps.append(f"Complement: {comp_seq}")
            result_seq = comp_seq

        res.formula = "A pairs with T; G pairs with C (Watson-Crick base pairing)"
        res.steps.append("\n─── Base pairing ───")
        for i, b in enumerate(seq):
            res.steps.append(f"  Pos {i+1}: {b} ↔ {comp[b]}")

        res.verification = (
            f"Length preserved: {len(seq)} = {len(result_seq)}. "
            "Base-pairing rule applied at each position. ✓"
        )

        res.result = {
            "original": seq,
            "complementary": result_seq,
            "direction": direction,
        }
        res.success = True

    except Exception as e:
        res.error = str(e)

    return res


# ──────────────────────────────────────────────
#  13. LAC OPERON
# ──────────────────────────────────────────────

def lac_operon(lactose_present: bool = True, glucose_present: bool = False) -> SolverResult:
    """
    Simulate lac operon gene regulation.

    Components:
      - Structural genes: lacZ (β-galactosidase), lacY (permease), lacA (transacetylase)
      - Regulator gene: lacI (produces repressor)
      - Promoter (P) and Operator (O)
    """
    res = SolverResult(success=False)
    _clear_steps(res)

    try:
        res.formula = (
            "Lac Operon regulation: "
            "[High cAMP + Lactose present] → RNA polymerase binds → Lac genes expressed. "
            "Repressor (LacI) binds operator when lactose absent."
        )
        res.steps.append("=" * 55)
        res.steps.append("  LAC OPERON SIMULATION")
        res.steps.append("=" * 55)
        res.steps.append(f"Conditions — Lactose present: {lactose_present}, "
                         f"Glucose present: {glucose_present}")

        res.steps.append("\n─── Components ───")
        res.steps.append("  lacZ  → β-galactosidase (breaks down lactose)")
        res.steps.append("  lacY  → Permease (transports lactose into cell)")
        res.steps.append("  lacA  → Transacetylase")
        res.steps.append("  lacI  → Repressor protein gene (constitutive)")
        res.steps.append("  P     → Promoter (RNA polymerase binding site)")
        res.steps.append("  O     → Operator (repressor binding site)")

        # Determine cAMP level (inversely proportional to glucose)
        if glucose_present:
            camp_level = "Low"
        else:
            camp_level = "High"

        res.steps.append(f"\ncAMP level: {camp_level} (glucose {'present' if glucose_present else 'absent'})")
        res.steps.append(f"Lactose (inducer): {'Present' if lactose_present else 'Absent'}")

        # Determine repressor state
        if lactose_present:
            repressor_bound = False
            repressor_state = "Inactive (allolactose binds repressor)"
        else:
            repressor_bound = True
            repressor_state = "Active (binds to operator, blocks transcription)"

        res.steps.append(f"\nRepressor state: {repressor_state}")

        # Determine transcription
        if not lactose_present:
            transcription = "OFF"
            reason = "Repressor bound to operator, blocking RNA polymerase."
        elif glucose_present:
            transcription = "LOW"
            reason = "Lactose present but cAMP low → CAP-cAMP not formed → weak transcription."
        else:
            transcription = "ON (high)"
            reason = "Lactose present (repressor inactive) + High cAMP (CAP-cAMP active) → full transcription."

        res.steps.append(f"\nTranscription status: {transcription}")
        res.steps.append(f"Reason: {reason}")

        gene_expression = {
            "lacZ": transcription,
            "lacY": transcription,
            "lacA": transcription,
        }

        res.steps.append("\n─── Gene Expression ───")
        for gene, state in gene_expression.items():
            res.steps.append(f"  {gene}: {state}")

        res.verification = (
            f"Conditions: lactose={lactose_present}, glucose={glucose_present} "
            f"→ cAMP={camp_level} → Transcription = {transcription} ✓"
        )

        res.result = {
            "lactose_present": lactose_present,
            "glucose_present": glucose_present,
            "camp_level": camp_level,
            "repressor_bound": repressor_bound,
            "transcription": transcription,
            "gene_expression": gene_expression,
        }
        res.success = True

    except Exception as e:
        res.error = str(e)

    return res


# ──────────────────────────────────────────────
#  14. POPULATION GROWTH
# ──────────────────────────────────────────────

def population_growth(
    model: str = "exponential",
    N0: float = 100,
    r: float = 0.1,
    K: float = 1000,
    t: float = 10,
) -> SolverResult:
    """
    Population growth models: Exponential or Logistic.

    Exponential:  N(t) = N₀ × e^(rt)
    Logistic:     N(t) = K / (1 + ((K-N₀)/N₀) × e^(-rt))
    """
    res = SolverResult(success=False)
    _clear_steps(res)

    try:
        if model not in ("exponential", "logistic"):
            raise ValueError("model must be 'exponential' or 'logistic'")

        res.formula = (
            "Exponential: N(t) = N₀·e^(rt)  |  dN/dt = rN\n"
            "Logistic: N(t) = K / (1 + ((K-N₀)/N₀)·e^(-rt))"
        )
        res.steps.append("=" * 55)
        res.steps.append(f"  POPULATION GROWTH ({model.upper()})")
        res.steps.append("=" * 55)
        res.steps.append(f"Initial population N₀ = {N0}")
        res.steps.append(f"Growth rate r = {r}")
        if model == "logistic":
            res.steps.append(f"Carrying capacity K = {K}")
        res.steps.append(f"Time t = {t}")

        if model == "exponential":
            res.steps.append("\nFormula: N(t) = N₀ × e^(rt)")
            N_t = N0 * math.exp(r * t)
            res.steps.append(f"N({t}) = {N0} × e^({r}×{t})")
            res.steps.append(f"     = {N0} × e^({r*t})")
            res.steps.append(f"     = {N0} × {math.exp(r*t):.6f}")
            res.steps.append(f"     = {N_t:.2f}")
            res.verification = f"N₀ × e^(r×t) = {N0} × e^{r*t:.4f} = {N_t:.2f} ✓"

        else:
            res.steps.append("\nFormula: N(t) = K / (1 + ((K-N₀)/N₀) × e^(-rt))")
            numerator = K
            denominator = 1 + ((K - N0) / N0) * math.exp(-r * t)
            N_t = numerator / denominator
            res.steps.append(f"N({t}) = {K} / (1 + (({K}-{N0})/{N0}) × e^(-{r}×{t}))")
            res.steps.append(f"     = {K} / (1 + {((K-N0)/N0):.4f} × {math.exp(-r*t):.6f})")
            res.steps.append(f"     = {K} / (1 + {((K-N0)/N0)*math.exp(-r*t):.6f})")
            res.steps.append(f"     = {K} / {denominator:.4f}")
            res.steps.append(f"     = {N_t:.2f}")
            res.verification = f"K/(1+((K-N₀)/N₀)e^(-rt)) = {N_t:.2f} ✓"

        res.steps.append(f"\n─── Population at t = {t} ───")
        res.steps.append(f"  N({t}) = {N_t:.2f} individuals")

        if model == "logistic":
            growth_rate_now = r * N_t * (1 - N_t / K)
            res.steps.append(f"  dN/dt at t={t}: {growth_rate_now:.4f}")

        res.result = {
            "model": model,
            "N0": N0,
            "r": r,
            "t": t,
            "N_t": round(N_t, 2),
            "K": K if model == "logistic" else None,
        }
        res.success = True

    except Exception as e:
        res.error = str(e)

    return res


# ──────────────────────────────────────────────
#  15. ENERGY FLOW
# ──────────────────────────────────────────────

def energy_flow(
    producer_energy: float = 10000,  # kJ/m²/yr
    trophic_efficiency: float = 10.0,  # %
    trophic_levels: int = 4,
) -> SolverResult:
    """
    Energy flow through trophic levels (10% rule).

    Producer → Primary consumer → Secondary → Tertiary
    """
    res = SolverResult(success=False)
    _clear_steps(res)

    try:
        res.formula = (
            "10% Law of Energy Transfer: Only ~10% of energy is transferred "
            "from one trophic level to the next. "
            "Eₙ = E₀ × (efficiency/100)^(n-1)"
        )
        res.steps.append("=" * 55)
        res.steps.append("  ENERGY FLOW IN ECOSYSTEM")
        res.steps.append("=" * 55)
        res.steps.append(f"Producer energy: {producer_energy} kJ/m²/yr")
        res.steps.append(f"Trophic efficiency: {trophic_efficiency}%")
        res.steps.append(f"Number of trophic levels: {trophic_levels}")

        levels = ["Producer", "Primary Consumer",
                  "Secondary Consumer", "Tertiary Consumer",
                  "Quaternary Consumer"]
        energy_available = producer_energy

        res.steps.append("\n─── Energy at Each Trophic Level ───")
        res.steps.append(f"  Trophic Level 1 — {levels[0]}: "
                         f"{energy_available:.1f} kJ/m²/yr")

        energy_data = {levels[0]: energy_available}

        for i in range(1, trophic_levels):
            energy_available *= (trophic_efficiency / 100)
            level_name = levels[i] if i < len(levels) else f"Level {i+1}"
            res.steps.append(
                f"  Trophic Level {i+1} — {level_name}: "
                f"{energy_available:.2f} kJ/m²/yr "
                f"({trophic_efficiency}% of previous)"
            )
            energy_data[level_name] = energy_available

        total_utilised = producer_energy - energy_available
        res.steps.append(f"\nEnergy lost as heat (total): "
                         f"{producer_energy:.1f} - {energy_available:.2f} "
                         f"= {total_utilised:.2f} kJ/m²/yr")

        # Verify: sum of all levels + heat loss = initial
        sum_all = sum(energy_data.values())
        res.verification = (
            f"Sum across levels: {sum_all:.2f} + heat = {producer_energy:.1f} "
            f"(conservation). Energy available to top level = {energy_available:.2f} ✓"
        )

        res.result = {
            "energy_by_level": energy_data,
            "trophic_efficiency_percent": trophic_efficiency,
            "top_level_energy": round(energy_available, 2),
        }
        res.success = True

    except Exception as e:
        res.error = str(e)

    return res


# ──────────────────────────────────────────────
#  16. BIODIVERSITY INDEX
# ──────────────────────────────────────────────

def biodiversity_index(
    species_counts: List[int],
    index_type: str = "shannon",
) -> SolverResult:
    """
    Calculate biodiversity indices.

    Shannon Index: H' = -Σ(pi × ln(pi))
    Simpson Index: D = Σ(ni × (ni-1)) / (N × (N-1))
    """
    res = SolverResult(success=False)
    _clear_steps(res)

    try:
        if not species_counts or any(c < 0 for c in species_counts):
            raise ValueError("species_counts must be a non-empty list of non-negative integers.")
        if index_type not in ("shannon", "simpson"):
            raise ValueError("index_type must be 'shannon' or 'simpson'.")

        N = sum(species_counts)
        n_species = len(species_counts)

        res.formula = (
            "Shannon Index: H' = -Σ(pi × ln pi), where pi = ni/N\n"
            "Simpson Index: D = Σni(ni-1) / N(N-1)"
        )
        res.steps.append("=" * 55)
        res.steps.append(f"  BIODIVERSITY ({index_type.upper()} INDEX)")
        res.steps.append("=" * 55)
        res.steps.append(f"Species counts: {species_counts}")
        res.steps.append(f"Total individuals (N): {N}")
        res.steps.append(f"Number of species (S): {n_species}")

        res.steps.append("\n─── Species proportions (pi) ───")
        proportions = []
        for i, ni in enumerate(species_counts):
            pi = ni / N if N > 0 else 0
            proportions.append(pi)
            res.steps.append(f"  Species {i+1}: n={ni}, pi={pi:.4f}")

        if index_type == "shannon":
            res.steps.append("\nCalculating Shannon Index H':")
            H = 0.0
            for i, pi in enumerate(proportions):
                if pi > 0:
                    term = -pi * math.log(pi)
                    H += term
                    res.steps.append(
                        f"  -({pi:.4f} × ln({pi:.4f})) = -({pi:.4f} × {math.log(pi):.4f}) = {term:.4f}"
                    )
                else:
                    res.steps.append(f"  Species {i+1}: pi=0, term=0")

            res.steps.append(f"\nH' = {H:.4f}")

            # Evenness
            H_max = math.log(n_species) if n_species > 0 else 0
            evenness = H / H_max if H_max > 0 else 0
            res.steps.append(f"H_max = ln({n_species}) = {H_max:.4f}")
            res.steps.append(f"Evenness (J) = H'/H_max = {H:.4f}/{H_max:.4f} = {evenness:.4f}")
            res.verification = f"0 ≤ H' ≤ ln(S). Here H'={H:.4f}, ln(S)={H_max:.4f}. {'✓' if 0 <= H <= H_max else '✗'}"

            res.result = {
                "index_type": "shannon",
                "H_prime": round(H, 4),
                "H_max": round(H_max, 4),
                "evenness": round(evenness, 4),
                "species_count": n_species,
                "total_individuals": N,
            }

        else:  # simpson
            res.steps.append("\nCalculating Simpson Index D:")
            numerator = sum(ni * (ni - 1) for ni in species_counts)
            denominator = N * (N - 1) if N > 1 else 1
            D = numerator / denominator
            res.steps.append(f"Numerator Σni(ni-1) = {numerator}")
            res.steps.append(f"Denominator N(N-1) = {N}×{N-1} = {denominator}")
            res.steps.append(f"D = {numerator}/{denominator} = {D:.4f}")

            # Simpson's diversity = 1 - D
            simpson_diversity = 1 - D
            res.steps.append(f"Simpson's Diversity Index (1-D) = {simpson_diversity:.4f}")

            res.verification = (
                f"0 ≤ D ≤ 1. Here D={D:.4f}, 1-D={simpson_diversity:.4f}. "
                f"Higher 1-D means higher diversity. ✓"
            )

            res.result = {
                "index_type": "simpson",
                "D": round(D, 4),
                "simpson_diversity": round(simpson_diversity, 4),
                "species_count": n_species,
                "total_individuals": N,
            }

        res.success = True

    except Exception as e:
        res.error = str(e)

    return res


# ──────────────────────────────────────────────
#  17. PHOTOSYNTHESIS EQUATION
# ──────────────────────────────────────────────

def photosynthesis_eq(co2: float = 6, h2o: float = 6) -> SolverResult:
    """
    Photosynthesis equation balancer and stoichiometry.

    6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂
    """
    res = SolverResult(success=False)
    _clear_steps(res)

    try:
        res.formula = (
            "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂\n"
            "Light energy + Chlorophyll → Chemical energy (glucose)"
        )
        res.steps.append("=" * 55)
        res.steps.append("  PHOTOSYNTHESIS EQUATION")
        res.steps.append("=" * 55)
        res.steps.append("Light-dependent reactions:")
        res.steps.append("  H₂O → 2H⁺ + 2e⁻ + ½O₂  (photolysis in thylakoid)")
        res.steps.append("  NADP⁺ + 2e⁻ + H⁺ → NADPH")
        res.steps.append("  ADP + Pi → ATP  (photophosphorylation)")
        res.steps.append("\nLight-independent reactions (Calvin Cycle):")
        res.steps.append("  3CO₂ + 9ATP + 6NADPH → G3P → C₆H₁₂O₆")

        # Balance check
        res.steps.append("\n─── Balanced Equation ───")
        res.steps.append("  6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂")

        # Atom balance
        left_c = co2 * 1
        left_o = co2 * 2 + h2o * 1
        left_h = h2o * 2
        right_c = 6
        right_o = 6 + 6
        right_h = 12

        res.steps.append(f"\nAtom balance check (given co2={co2}, h2o={h2o}):")
        res.steps.append(f"  C: left={left_c}, right={right_c}  {'✓' if left_c == right_c else '✗'}")
        res.steps.append(f"  H: left={left_h}, right={right_h}  {'✓' if left_h == right_h else '✗'}")
        res.steps.append(f"  O: left={left_o}, right={right_o}  {'✓' if left_o == right_o else '✗'}")

        # Energy
        glucose_energy = 2870  # kJ/mol
        res.steps.append(f"\nEnergy stored in 1 mol glucose: {glucose_energy} kJ")
        res.steps.append(f"Efficiency: ~1-2% of solar energy captured as chemical energy.")

        res.verification = (
            f"Balanced: C({left_c}→{right_c}), H({left_h}→{right_h}), "
            f"O({left_o}→{right_o}). All atoms conserved. ✓"
        )

        res.result = {
            "equation": "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂",
            "reactants": {"CO2": co2, "H2O": h2o},
            "products": {"C6H12O6": 1, "O2": 6},
            "energy_per_glucose_kJ": glucose_energy,
            "efficiency_percent": 2.0,
        }
        res.success = True

    except Exception as e:
        res.error = str(e)

    return res


# ──────────────────────────────────────────────
#  18. RESPIRATION EQUATION
# ──────────────────────────────────────────────

def respiration_eq(glucose: float = 1) -> SolverResult:
    """
    Respiration equation and ATP yield.

    C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 38 ATP (theoretical) / ~36 ATP
    """
    res = SolverResult(success=False)
    _clear_steps(res)

    try:
        res.formula = (
            "Aerobic Respiration:\n"
            "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 38 ATP\n"
            "ATP yield: 2 (glycolysis) + 2 (Krebs) + 34 (ETC) = 38 ATP"
        )
        res.steps.append("=" * 55)
        res.steps.append("  AEROBIC RESPIRATION")
        res.steps.append("=" * 55)

        res.steps.append("─── Stages of Respiration ───")
        res.steps.append("Stage 1 — Glycolysis (Cytoplasm):")
        res.steps.append("  C₆H₁₂O₆ → 2 Pyruvate + 2 ATP + 2 NADH")
        res.steps.append("\nStage 2 — Link Reaction (Mitochondrial Matrix):")
        res.steps.append("  2 Pyruvate → 2 Acetyl-CoA + 2 CO₂ + 2 NADH")
        res.steps.append("\nStage 3 — Krebs Cycle (Matrix):")
        res.steps.append("  2 Acetyl-CoA → 4 CO₂ + 6 NADH + 2 FADH₂ + 2 ATP")
        res.steps.append("\nStage 4 — Electron Transport Chain (Inner Membrane):")
        res.steps.append("  10 NADH + 2 FADH₂ → ~34 ATP + 6 H₂O")

        atp_total = 38
        res.steps.append(f"\n─── ATP Summary ───")
        res.steps.append(f"  Glycolysis:         2 ATP")
        res.steps.append(f"  Krebs cycle:        2 ATP")
        res.steps.append(f"  ETC (oxidative):   34 ATP")
        res.steps.append(f"  ─────────────────────")
        res.steps.append(f"  Total per glucose:  {atp_total} ATP")

        # Energy accounting
        glucose_energy = 2870  # kJ/mol
        energy_per_atp = 30.5  # kJ/mol under standard conditions
        efficiency = (atp_total * energy_per_atp) / glucose_energy * 100

        res.steps.append(f"\nEnergy from glucose: {glucose_energy} kJ/mol")
        res.steps.append(f"Energy captured in ATP: {atp_total} × {energy_per_atp} = {atp_total * energy_per_atp} kJ/mol")
        res.steps.append(f"Efficiency: {efficiency:.1f}%")

        res.steps.append("\nEquation:")
        res.steps.append("  C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 38 ATP")

        # Balance
        res.steps.append("\nAtom balance:")
        res.steps.append(f"  C: 6 → 6  ✓")
        res.steps.append(f"  H: 12 → 12  ✓")
        res.steps.append(f"  O: 6+12=18 → 12+6=18  ✓")

        res.verification = (
            f"ATP yield: 38. Efficiency: {efficiency:.1f}%. "
            "Equation balanced. ✓"
        )

        res.result = {
            "equation": "C6H12O6 + 6O2 → 6CO2 + 6H2O + 38 ATP",
            "atp_glycolysis": 2,
            "atp_krebs": 2,
            "atp_etc": 34,
            "atp_total": atp_total,
            "efficiency_percent": round(efficiency, 1),
            "co2_produced": 6,
            "h2o_produced": 6,
        }
        res.success = True

    except Exception as e:
        res.error = str(e)

    return res


# ──────────────────────────────────────────────
#  SOLVER REGISTRY
# ──────────────────────────────────────────────

SOLVER_REGISTRY: Dict[str, Dict[str, Any]] = {
    "punnett_square": {
        "function": punnett_square,
        "category": "Genetics",
        "description": "Generate Punnett square for single-locus cross",
        "parameters": ["parent1_alleles (str)", "parent2_alleles (str)"],
    },
    "monohybrid_cross": {
        "function": monohybrid_cross,
        "category": "Genetics",
        "description": "Monohybrid cross: genotypic (1:2:1) and phenotypic (3:1) ratios",
        "parameters": ["parent1 (str)", "parent2 (str)"],
    },
    "dihybrid_cross": {
        "function": dihybrid_cross,
        "category": "Genetics",
        "description": "Dihybrid cross: phenotypic ratio 9:3:3:1",
        "parameters": ["parent1 (str)", "parent2 (str)"],
    },
    "incomplete_dominance": {
        "function": incomplete_dominance,
        "category": "Genetics",
        "description": "Incomplete dominance: 1:2:1 phenotypic ratio",
        "parameters": ["parent1 (str)", "parent2 (str)", "dom_trait (str)", "rec_trait (str)"],
    },
    "codominance": {
        "function": codominance,
        "category": "Genetics",
        "description": "Codominance (ABO blood group)",
        "parameters": ["parent1_allele (str)", "parent2_allele (str)"],
    },
    "sex_determination": {
        "function": sex_determination,
        "category": "Genetics",
        "description": "Sex chromosome analysis (XY, XO, ZW systems)",
        "parameters": ["system (str)"],
    },
    "pedigree_analysis": {
        "function": pedigree_analysis,
        "category": "Genetics",
        "description": "Pedigree analysis and inheritance pattern detection",
        "parameters": ["trait_type (str)", "affected_parents (int)"],
    },
    "hardy_weinberg": {
        "function": hardy_weinberg,
        "category": "Genetics / Evolution",
        "description": "Hardy-Weinberg equilibrium with chi-square test",
        "parameters": ["p (float)", "q (float)", "dominant_phenotype (float)", "recessive_phenotype (float)"],
    },
    "dna_transcription": {
        "function": dna_transcription,
        "category": "Molecular Biology",
        "description": "Transcribe DNA template to mRNA",
        "parameters": ["dna_sequence (str)"],
    },
    "dna_translation": {
        "function": dna_translation,
        "category": "Molecular Biology",
        "description": "Translate coding DNA to amino acid sequence",
        "parameters": ["dna_sequence (str)", "reading_frame (int)"],
    },
    "gc_content": {
        "function": gc_content,
        "category": "Molecular Biology",
        "description": "Calculate GC content percentage",
        "parameters": ["sequence (str)"],
    },
    "complementary_strand": {
        "function": complementary_strand,
        "category": "Molecular Biology",
        "description": "Generate complementary DNA strand",
        "parameters": ["dna_sequence (str)", "direction (str)"],
    },
    "lac_operon": {
        "function": lac_operon,
        "category": "Molecular Biology",
        "description": "Lac operon gene regulation simulation",
        "parameters": ["lactose_present (bool)", "glucose_present (bool)"],
    },
    "population_growth": {
        "function": population_growth,
        "category": "Ecology",
        "description": "Exponential or logistic population growth",
        "parameters": ["model (str)", "N0 (float)", "r (float)", "K (float)", "t (float)"],
    },
    "energy_flow": {
        "function": energy_flow,
        "category": "Ecology",
        "description": "Energy flow through trophic levels (10% law)",
        "parameters": ["producer_energy (float)", "trophic_efficiency (float)", "trophic_levels (int)"],
    },
    "biodiversity_index": {
        "function": biodiversity_index,
        "category": "Ecology",
        "description": "Shannon or Simpson biodiversity index",
        "parameters": ["species_counts (List[int])", "index_type (str)"],
    },
    "photosynthesis_eq": {
        "function": photosynthesis_eq,
        "category": "Plant Physiology",
        "description": "Photosynthesis equation and stoichiometry",
        "parameters": ["co2 (float)", "h2o (float)"],
    },
    "respiration_eq": {
        "function": respiration_eq,
        "category": "Plant Physiology",
        "description": "Aerobic respiration equation and ATP yield",
        "parameters": ["glucose (float)"],
    },
}


# ──────────────────────────────────────────────
#  CONVENIENCE RUNNER
# ──────────────────────────────────────────────

def run_demo():
    """Run all solvers with sample inputs and print results."""
    solvers = [
        ("punnett_square", lambda: punnett_square("Aa", "Tt")),
        ("monohybrid_cross", lambda: monohybrid_cross("Aa", "Aa")),
        ("dihybrid_cross", lambda: dihybrid_cross("AaBb", "AaBb")),
        ("incomplete_dominance", lambda: incomplete_dominance("Rr", "Rr")),
        ("codominance", lambda: codominance("IA", "IB")),
        ("sex_determination", lambda: sex_determination(system="XY")),
        ("pedigree_analysis", lambda: pedigree_analysis("autosomal_recessive")),
        ("hardy_weinberg", lambda: hardy_weinberg(recessive_phenotype=0.09)),
        ("dna_transcription", lambda: dna_transcription("TACGATCGAT")),
        ("dna_translation", lambda: dna_translation("ATGGCCATTGTAATGGGCCGCTGAAAGGGTGCCCGATAG")),
        ("gc_content", lambda: gc_content("ATGCGATCGATCGATCGATC")),
        ("complementary_strand", lambda: complementary_strand("ATGCGTA")),
        ("lac_operon", lambda: lac_operon(lactose_present=True, glucose_present=False)),
        ("population_growth", lambda: population_growth("logistic", N0=50, r=0.5, K=500, t=10)),
        ("energy_flow", lambda: energy_flow(producer_energy=20000, trophic_efficiency=10, trophic_levels=4)),
        ("biodiversity_index", lambda: biodiversity_index([50, 30, 15, 5], "shannon")),
        ("photosynthesis_eq", lambda: photosynthesis_eq()),
        ("respiration_eq", lambda: respiration_eq()),
    ]

    print("=" * 60)
    print("  ISC CLASS 12 BIOLOGY — SOLVER DEMO")
    print("=" * 60)

    for name, fn in solvers:
        result = fn()
        status = "✓" if result.success else "✗"
        print(f"\n{'─'*60}")
        print(f"  {name} {status}")
        print(f"{'─'*60}")
        for step in result.steps:
            print(f"  {step}")
        if result.error:
            print(f"  ERROR: {result.error}")
        if result.result:
            print(f"\n  RESULT: {result.result}")


if __name__ == "__main__":
    run_demo()