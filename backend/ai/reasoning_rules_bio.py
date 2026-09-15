"""Biology rules for the reasoning engine (ISC Class 12)."""

from backend.ai.reasoning_engine import Rule

BIOLOGY_RULES = [
    # ----------------------------------------------------------------- #
    # POPULATION GENETICS
    # ----------------------------------------------------------------- #
    Rule(
        name="hardy_weinberg_dominant",
        node_id="bio_c12_genetics_hardy_weinberg",
        subject="biology",
        keywords=["hardy-weinberg", "hardy weinberg", "allele", "homozygous dominant", "population", "fruit flies"],
        formula="(1 - q)**2 * N",
        variables={"q": "allele_frequency", "N": "population"},
        unknown="count",
        explanation="Hardy-Weinberg: p + q = 1, p² + 2pq + q² = 1. Homozygous dominant count = p² × N = (1-q)² × N",
    ),

    # ----------------------------------------------------------------- #
    # POPULATION ECOLOGY
    # ----------------------------------------------------------------- #
    Rule(
        name="natality",
        node_id="bio_c12_ecology_natality",
        subject="biology",
        keywords=["natality", "lily plants", "after one year", "planted"],
        formula="N_final - N_initial",
        variables={"N_final": "final_population", "N_initial": "initial_population"},
        unknown="natality",
        explanation="Natality (number of births) = Final population - Initial population",
    ),
    Rule(
        name="population_growth_rate",
        node_id="bio_c12_ecology_growth",
        subject="biology",
        keywords=["growth rate", "species", "after 5 years", "forest", "population"],
        formula="(N_final - N_initial) / t",
        variables={"N_final": "final_population", "N_initial": "initial_population", "t": "time_period"},
        unknown="growth_rate",
        explanation="Population growth rate = (N_final - N_initial) / time period",
    ),

    # ----------------------------------------------------------------- #
    # GENETICS - SEX-LINKED INHERITANCE
    # ----------------------------------------------------------------- #
    Rule(
        name="sex_linked_haemophilia",
        node_id="bio_c12_genetics_sex_linked",
        subject="biology",
        keywords=["haemophilic", "carrier woman", "sex-linked", "x-linked", "daughter"],
        formula="Rational(1, 4)",
        variables={},
        unknown="prob",
        explanation="X-linked recessive cross: X^hY × X^HX^h → 4 offspring. Daughter haemophilic (X^hX^h) = 1/4 = 0.25",
    ),

    # ----------------------------------------------------------------- #
    # MOLECULAR BIOLOGY - TRANSCRIPTION
    # ----------------------------------------------------------------- #
    Rule(
        name="valine_fourth_codon",
        node_id="bio_c12_molecular_codon",
        subject="biology",
        keywords=["codon", "valine", "fourth", "amino acid"],
        formula="GUG",
        variables={},
        unknown="codon",
        explanation="Valine is coded by four codons: GUU, GUC, GUA, GUG. The fourth codon is GUG",
    ),
]
