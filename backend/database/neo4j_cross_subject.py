"""Cross-subject prerequisite mappings for CBSE atomic graph.

Every node ID has been VERIFIED to exist in Neo4j by querying the graph.
Each link has a specific pedagogical reason.

Usage:
    python -m backend.database.neo4j_cross_subject
"""

import asyncio
from neo4j import AsyncGraphDatabase

import os
NEO4J_URI = os.environ.get("NEO4J_URI", "bolt://localhost:7687")
NEO4J_USER = os.environ.get("NEO4J_USER", "neo4j")
NEO4J_PASSWORD = os.environ.get("NEO4J_PASSWORD", "dream_neo4j_2024")

# (target_node_id, prerequisite_node_id, reason)
# target REQUIRES prerequisite
CROSS_SUBJECT_LINKS = [
    # ================================================================== #
    # C11 PHYSICS → C11 MATH
    # ================================================================== #
    ("c11_phy_001_03", "c11_math_013_03",
     "Physics error analysis requires variance and standard deviation from statistics — same framework quantifies measurement uncertainty"),
    ("c11_phy_002_01", "c11_math_002_03",
     "Kinematic quantities x(t), v(t), a(t) are real-valued functions requiring the concept of functions, domain, and range"),
    ("c11_phy_002_04", "c11_math_009_02",
     "Graphical analysis of motion (slope of x-t = velocity) requires understanding slope of a line from coordinate geometry"),
    ("c11_phy_003_01", "c11_math_011_02",
     "Vector representation in 3D requires the coordinate system foundation — vectors are defined by coordinates of points in space"),
    ("c11_phy_003_04", "c11_math_009_05",
     "Scalar (dot) product and projection requires understanding distance from a point to a line — projection is the geometric basis of dot product"),
    ("c11_phy_005_01", "c11_math_012_05",
     "Work done by variable forces (W = integral F dx) requires the definition of derivative as rate of change — integration is the inverse"),
    ("c11_phy_005_06", "c11_math_014_03",
     "Collision analysis involves probabilistic outcomes requiring the axiomatic foundation of probability"),

    # ================================================================== #
    # C12 PHYSICS → C12 MATH
    # ================================================================== #
    ("c12_phy_001_02", "c12_math_010_02",
     "Superposition principle for electric fields requires vector addition — multiple charges create fields that add as vectors"),
    ("c12_phy_001_04", "c12_math_010_04",
     "Electric flux (Phi = E . dA) is the scalar dot product of field and area vectors — Gauss's law is a dot product integral"),
    ("c12_phy_004_05", "c12_math_010_05",
     "Force on current-carrying conductor (F = IL x B) uses the vector cross product — direction and magnitude depend on cross product rules"),
    ("c12_phy_006_01", "c12_math_007_05",
     "Magnetic flux and Faraday's law (EMF = -dPhi/dt) require definite integrals and the Fundamental Theorem of Calculus"),
    ("c12_phy_007_03", "c12_math_009_04",
     "LCR series circuit analysis involves second-order differential equations — damped oscillation equation solved by separation of variables"),
    ("c12_phy_010_03", "c12_math_007_05",
     "Young's double slit interference intensity requires definite integrals to compute resultant intensity from superposition"),
    ("c12_phy_011_01", "c12_math_013_01",
     "Photoelectric effect and photon statistics require conditional probability — probability of electron emission depends on photon energy"),

    # ================================================================== #
    # C11 CHEMISTRY → C11 PHYSICS (MISSING — 0 edges)
    # ================================================================== #
    ("c11_chem_001_02", "c11_phy_001_01",
     "Properties of matter and their measurement in chemistry uses the same SI unit system from physics — measurement framework is shared"),
    ("c11_chem_001_03", "c11_phy_001_03",
     "Uncertainty in measurement and significant figures in chemistry uses the same error analysis as physics — accuracy, precision, types of errors"),
    ("c11_chem_002_02", "c11_phy_001_01",
     "Electromagnetic radiation and atomic spectra require understanding measurement units (wavelength, frequency, energy in eV) from physics"),
    ("c11_chem_005_01", "c11_phy_011_03",
     "First law of thermodynamics in chemistry (delta U = q + w) is the same law taught in physics — heat, work, and internal energy concepts are shared"),
    ("c11_chem_005_02", "c11_phy_010_02",
     "Enthalpy, calorimetry, and heat capacity in chemistry require understanding specific heat capacity and calorimetry from physics"),
    ("c11_chem_005_06", "c11_phy_011_05",
     "Gibbs energy and equilibrium in chemistry requires understanding entropy and the second law of thermodynamics from physics"),

    # ================================================================== #
    # C12 CHEMISTRY → C12 PHYSICS (MISSING — 0 edges)
    # ================================================================== #
    ("c12_chem_002_01", "c12_phy_001_01",
     "Electrochemical cells (galvanic cells, electrode potentials) are built on Coulomb's law and electric charge — electrostatic force drives redox"),
    ("c12_chem_002_03", "c12_phy_003_02",
     "Conductance of electrolytic solutions uses Ohm's law and resistance concepts — electrolytic conductivity is the inverse of resistivity"),
    ("c12_chem_002_04", "c12_phy_003_01",
     "Electrolytic cells and electrolysis require understanding electric current, drift velocity, and mobility from physics"),
    ("c12_chem_002_05", "c12_phy_003_03",
     "Batteries and fuel cells require understanding electrical energy, power, EMF, and internal resistance from physics"),
    ("c12_chem_011_05", "c12_phy_014_01",
     "Electrical properties of solids (conductors, semiconductors, insulators) are explained by energy band theory from physics"),
    ("c12_chem_011_06", "c12_phy_005_03",
     "Magnetic properties of solids (dia, para, ferromagnetism) are the same phenomena studied in physics — magnetic dipole moment of unpaired electrons"),
    ("c12_chem_013_05", "c12_chem_002_06",
     "Corrosion as electrochemical mechanism requires understanding corrosion prevention from electrochemistry — rusting is an electrochemical process"),

    # ================================================================== #
    # C11 BIOLOGY → C11 CHEMISTRY (MISSING — 0 edges)
    # ================================================================== #
    ("c11_bio_008_04", "c11_chem_004_07",
     "Cell membrane fluid mosaic model depends on hydrogen bonding and intermolecular forces — phospholipid bilayer held together by these forces"),
    ("c11_bio_009_01", "c11_chem_008_01",
     "Biomolecules (carbohydrates, lipids) are organic compounds built on carbon's tetravalence — understanding C-C, C-H, C-O bonds is essential"),
    ("c11_bio_009_02", "c11_chem_004_02",
     "Proteins (peptide bonds) and nucleic acids (DNA H-bonds) require understanding covalent bonding — peptide bonds are covalent, base pairs are H-bonded"),
    ("c11_bio_009_03", "c11_chem_005_06",
     "Enzyme catalysis and metabolic regulation depend on Gibbs energy and equilibrium — enzymes lower activation energy thermodynamically"),
    ("c11_bio_011_01", "c11_chem_002_03",
     "Photosynthesis light reactions involve electron excitation in chlorophyll — Bohr's model explains why specific wavelengths are absorbed"),
    ("c11_bio_012_02", "c11_chem_005_02",
     "Aerobic respiration (TCA cycle, electron transport) releases energy measured by enthalpy and calorimetry — same thermodynamic quantities"),

    # ================================================================== #
    # C12 BIOLOGY → C12 CHEMISTRY (MISSING — 0 edges)
    # ================================================================== #
    ("c12_bio_005_01", "c12_chem_010_05",
     "DNA structure and packaging (double helix, base pairing) is directly taught in chemistry as nucleic acids — chemical structure IS the foundation"),
    ("c12_bio_005_02", "c12_chem_010_05",
     "DNA as genetic material (Griffith, Avery, Hershey-Chase) requires the chemical understanding of nucleic acid structure and hydrogen bonding"),
    ("c12_bio_005_03", "c12_chem_010_05",
     "DNA replication mechanism requires understanding nucleic acid chemistry — semiconservative replication depends on base pairing chemistry"),
    ("c12_bio_005_05", "c12_chem_010_02",
     "Transcription and translation require understanding protein structure and amino acids from chemistry — peptide bond formation is a chemical reaction"),
    ("c12_bio_008_02", "c12_chem_010_05",
     "Recombinant DNA technology manipulates nucleic acids chemically — understanding DNA chemistry is prerequisite to genetic engineering"),
    ("c12_bio_007_02", "c12_chem_016_04",
     "Immunity and vaccination involves antimicrobial drugs (antibiotics, antiseptics) — understanding how these chemicals act requires chemistry"),
    ("c12_bio_007_04", "c12_chem_012_02",
     "Microbes in human welfare involves enzyme catalysis — understanding industrial enzyme applications requires chemistry of catalysis"),

    # ================================================================== #
    # C11 ECONOMICS → C11 APPLIED MATH (MISSING — 0 edges)
    # ================================================================== #
    ("c11_econ_005_05", "c11_app_math_012_01",
     "Measures of dispersion in economics (range, quartile deviation, standard deviation) are the same mathematical concepts from applied math"),
    ("c11_econ_005_07", "c11_app_math_012_01",
     "Standard deviation and variance in economics are directly from applied mathematics — calculation methods are identical"),
    ("c11_econ_006_01", "c11_app_math_013_01",
     "Correlation in economics (scatter diagram, meaning, types) requires the correlation theory from applied mathematics"),
    ("c11_econ_006_03", "c11_app_math_013_01",
     "Karl Pearson's coefficient and Spearman's rank correlation in economics are directly from applied mathematics correlation theory"),
    ("c11_econ_010_01", "c11_app_math_016_01",
     "Indifference curve analysis and budget line require understanding straight lines, slope, and equations — budget line is a linear equation"),
    ("c11_econ_009_04", "c11_app_math_010_01",
     "Consumer equilibrium and demand derivation uses differentiation — marginal utility is the derivative of total utility"),

    # ================================================================== #
    # C11 CS → C11 MATH (only 1 edge, needs more)
    # ================================================================== #
    ("c11_cs_003_01", "c11_math_001_05",
     "Boolean logic (AND, OR, NOT) is isomorphic to set operations (intersection, union, complement) — De Morgan's laws apply to both"),
    ("c11_cs_004_01", "c11_math_001_01",
     "Number systems (binary, octal, hexadecimal) require understanding sets and their representations — each base is a different representation"),
    ("c11_cs_009_01", "c11_math_006_03",
     "Lists, tuples, and linear search involve ordering and arrangement — permutations provide the foundation for array indexing and search complexity"),

    # ================================================================== #
    # C12 CS → C12 MATH (MISSING — 0 edges)
    # ================================================================== #
    ("c12_cs_001_01", "c12_math_001_01",
     "Database relations and SQL operations require understanding types of relations (reflexive, symmetric, transitive) from mathematics"),
    ("c12_cs_001_02", "c12_math_001_03",
     "Functions in programming (composition, inverse) require understanding composition of functions and inverse functions from mathematics"),

    # ================================================================== #
    # C11 ACCOUNTANCY → C11 ECONOMICS (MISSING — 0 edges, 13 root nodes)
    # ================================================================== #
    ("c11_acc_001_01", "c11_econ_008_02",
     "Meaning and objectives of accounting require understanding economic systems (market, command, mixed) — accounting exists within economic systems"),
    ("c11_acc_002_01", "c11_econ_008_03",
     "Basic accounting terms (capital, transaction) require understanding production possibility frontier and opportunity cost from economics"),
    ("c11_acc_002_02", "c11_econ_009_01",
     "Accounting terms (assets, liabilities, expenditure, revenue) require understanding utility, marginal utility, and economic value from economics"),

    # ================================================================== #
    # C11 BUSINESS STUDIES → C11 ECONOMICS (MISSING — 0 edges, 21 root nodes)
    # ================================================================== #
    ("c11_bus_stud_001_02", "c11_econ_008_02",
     "Concept and characteristics of business require understanding economic systems — business operates within market, command, or mixed economies"),
    ("c11_bus_stud_001_08", "c11_econ_008_03",
     "Business risk concept requires understanding production possibility frontier and opportunity cost — risk is about economic trade-offs"),
    ("c11_bus_stud_002_01", "c11_econ_008_02",
     "Sole proprietorship requires understanding economic systems — the choice of business form depends on the economic context"),
    ("c11_bus_stud_003_01", "c11_econ_008_02",
     "Private sector and public sector enterprises require understanding economic systems (market vs command economy) from economics"),

    # ================================================================== #
    # C11 POL SCI → C11 HISTORY (MISSING — 0 edges)
    # ================================================================== #
    ("c11_pol_sci_001_01", "c11_hist_003_01",
     "Understanding political institutions requires historical context — the Roman Empire's transition from Republic to Principate is foundational to political science"),
    ("c11_pol_sci_001_02", "c11_hist_003_07",
     "Constitutional development requires understanding the fall of empires — the Byzantine legacy after Rome's fall shaped constitutional thought"),

    # ================================================================== #
    # C11 SOCIOLOGY → C11 HISTORY (MISSING — 0 edges)
    # ================================================================== #
    ("c11_socio_001_01", "c11_hist_001_04",
     "Understanding society requires historical context — the Neolithic Revolution (domestication of plants and animals) is the foundation of human society"),
    ("c11_socio_001_02", "c11_hist_001_06",
     "Sociological debates require understanding historians' debates — the Neolithic Revolution debates parallel sociological debates on social change"),

    # ================================================================== #
    # C11 GEOGRAPHY → C11 ECONOMICS (MISSING — 0 edges)
    # ================================================================== #
    ("c11_geo_001_01", "c11_econ_008_03",
     "Geography of resources requires understanding production possibility frontier — resource distribution determines economic production possibilities"),

    # ================================================================== #
    # C12 POL SCI → C12 HISTORY (only 1 edge, needs more)
    # ================================================================== #
    ("c12_pol_sci_001_01", "c12_hist_001_01",
     "Contemporary Indian politics requires understanding post-independence history — the historical context shapes political institutions"),

    # ================================================================== #
    # C12 ECONOMICS → C12 APPLIED MATH (MISSING — 0 edges)
    # ================================================================== #
    ("c12_econ_002_01", "c12_app_math_004_01",
     "Methods of calculating national income (value added method) require understanding determinants and systems of equations from applied math — matrix methods are used in input-output analysis"),
    ("c12_econ_003_01", "c12_app_math_008_01",
     "National income aggregates (GNP, NNP, GDP, NDP) require understanding probability distributions and expectation — economic aggregates are statistical measures"),
    ("c12_econ_005_03", "c12_app_math_007_01",
     "Credit creation and money multiplier formula require understanding differential equations — the money multiplier is derived using mathematical modeling"),
    ("c12_econ_006_01", "c12_app_math_008_01",
     "Aggregate demand and its components (consumption, investment) require understanding probability distributions — economic forecasting uses random variables and expectation"),

    # ================================================================== #
    # C11 ACCOUNTANCY → C11 APPLIED MATH (MISSING — 0 edges)
    # ================================================================== #
    ("c11_acc_008_02", "c11_app_math_014_01",
     "Methods of depreciation (SLM, WDV) require understanding interest rates and annuities from applied math — depreciation calculations use compound interest formulas"),
    ("c11_acc_010_02", "c11_app_math_014_01",
     "Trading account preparation and gross profit calculation requires understanding interest rates and percentages from applied math — profit calculations are percentage-based"),
]


async def load_cross_subject_links():
    """Load cross-subject REQUIRES edges into Neo4j."""
    print("=" * 60)
    print("Cross-Subject Link Loader (Verified Node IDs)")
    print("=" * 60)
    print(f"\nTotal cross-subject links to add: {len(CROSS_SUBJECT_LINKS)}")

    driver = AsyncGraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))
    created = 0
    missing = 0

    try:
        async with driver.session() as session:
            for target_id, prereq_id, reason in CROSS_SUBJECT_LINKS:
                result = await session.run(
                    """
                    MATCH (n:KnowledgeNode {node_id: $target})
                    MATCH (m:KnowledgeNode {node_id: $prereq})
                    MERGE (n)-[r:REQUIRES]->(m)
                    SET r.reason = $reason, r.cross_subject = true
                    RETURN count(r) AS created
                    """,
                    target=target_id, prereq=prereq_id, reason=reason,
                )
                record = await result.single()
                if record and record["created"] > 0:
                    created += 1
                else:
                    missing += 1
                    print(f"  WARNING: Could not link {target_id} -> {prereq_id}")

        print(f"\n  Created: {created} cross-subject edges")
        print(f"  Missing: {missing} edges (node not found)")
        print("=" * 60)
    finally:
        await driver.close()


if __name__ == "__main__":
    asyncio.run(load_cross_subject_links())
