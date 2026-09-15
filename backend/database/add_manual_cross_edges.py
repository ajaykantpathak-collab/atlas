"""Manually curated cross-subject RELATED_TO edges.

Each edge is hand-picked from the cross-topic connection marker files,
matching the described concept to the correct Neo4j node ID.

Only C9-C12 connections are included — these are the pedagogically
significant ones for board exam preparation. Lower classes have
generic connections ("maths connects to chemistry") that don't map
to specific nodes.
"""
import asyncio
import sys
sys.path.insert(0, ".")

from backend.services.graph_service import get_neo4j


# Format: (node_a, node_b, reason)
# Each pair is hand-curated from the cross-topic marker files
EDGES = [
    # ================================================================ #
    # CHEMISTRY <-> MATHEMATICS
    # ================================================================ #
    # C10: Periodic properties -> Ratio and proportion
    ("c10_chem_001", "c10_math_016", "Periodic trends use ratio and proportion — atomic size, ionisation potential follow proportional patterns across periods and groups"),
    ("c10_chem_003", "c10_math_016", "Ionisation potential trends are proportional to position in periodic table — ratio concepts apply"),
    # C10: Mole concept -> Algebra and equations
    ("c10_chem_033", "c10_math_009", "Mole concept requires solving linear equations — balancing reactions uses algebraic reasoning"),
    ("c10_chem_032", "c10_math_011", "Empirical and molecular formula calculations use quadratic and linear equation solving"),
    # C11: Chemical bonding -> Vectors (VSEPR, dipole moments)
    ("c11_chem_031", "c11_math_070", "VSEPR theory and dipole moments rely on vector addition — predicting molecular polarity uses vector sums"),
    # C11: States of matter -> Calculus (Maxwell-Boltzmann distribution)
    ("c11_chem_022", "c11_math_089", "Kinetic theory of gases uses calculus — Maxwell-Boltzmann distribution requires integration over speed distribution"),
    # C11: Thermodynamics -> Calculus
    ("c11_chem_043", "c11_math_091", "First law of thermodynamics uses derivatives — dU, dQ, dW are differential quantities"),
    # C12: Chemical kinetics -> Differential and integral calculus
    ("c12_chem_023", "c12_math_064", "Chemical kinetics rate laws are differential equations — rate = -d[A]/dt is a derivative"),
    ("c12_chem_023", "c12_math_059", "Integrated rate laws use definite integrals — first order: ln[A] = -kt + ln[A]0"),
    # C12: Coordination compounds -> Geometry and symmetry
    ("c12_chem_056", "c12_math_078", "Coordination compounds have 3D geometric structures — octahedral, tetrahedral, square planar use 3D geometry"),
    ("c12_chem_058", "c12_math_026", "Isomerism in coordination compounds uses symmetry and determinant properties for spatial analysis"),
    # C9: pH and acids -> Logarithms
    ("c9_chem_039", "c9_math_025", "pH scale is logarithmic — pH = -log[H+] uses logarithmic form conversion"),
    ("c9_chem_039", "c9_math_026", "pH calculations use laws of logarithms — log properties for pH, pOH, Kw calculations"),
    # C8: pH scale -> Logarithms (introduction)
    ("c8_chem_015", "c8_math_018", "Balancing chemical equations uses algebraic multiplication and division of expressions"),
    ("c8_chem_010", "c8_math_022", "Balancing chemical reactions requires solving linear equations in one variable"),
    # C7: Acids/bases -> Ratio and proportion (pH scale)
    ("c7_chem_015", "c7_math_018", "pH scale uses ratios — each pH unit is a 10-fold change in H+ concentration"),
    # C7: Mixtures -> Ratio and proportion
    ("c7_chem_008", "c7_math_018", "Mixture concentration calculations use ratio and proportion"),
    # C6: Fractions -> Matter (mixing substances)
    ("c6_chem_001", "c6_math_022", "Mixing substances uses fractions — parts of whole in chemical mixtures"),

    # ================================================================ #
    # CHEMISTRY <-> PHYSICS
    # ================================================================ #
    # C10: Electrolysis -> Electricity (current, charge)
    ("c10_chem_038", "c10_phy_028", "Electrolysis uses electric current — the same Ohm's law (V=IR) governs both electrolytic and metallic conduction"),
    ("c10_chem_042", "c10_phy_030", "Applications of electrolysis (electroplating) depend on electrical power and energy calculations"),
    # C11: Thermodynamics -> Physics thermodynamics
    ("c11_chem_043", "c11_phy_077", "First law of thermodynamics is identical in both — Q = dU + W applies to heat engines (physics) and chemical reactions (chemistry)"),
    ("c11_chem_047", "c11_phy_082", "Second law of thermodynamics — entropy connects Carnot efficiency (physics) to reaction spontaneity (chemistry)"),
    # C11: Atomic structure -> Quantum mechanics
    ("c11_chem_015", "c12_phy_100", "Bohr's atomic model — same model taught in physics (energy levels, transitions) and chemistry (electron configuration, bonding)"),
    ("c11_chem_018", "c12_phy_100", "Quantum mechanical model (Schrodinger equation) — physics derives it, chemistry applies it to orbital shapes"),
    ("c11_chem_013", "c12_phy_100", "Planck's quantum theory — physics explains blackbody radiation, chemistry uses it for atomic spectra"),
    # C9: Matter -> Kinetic energy
    ("c9_chem_001", "c9_phy_001", "States of matter and kinetic energy — particle motion in solids, liquids, gases is governed by kinetic theory"),
    # C8: Atomic structure -> Physics
    ("c8_chem_005", "c8_phy_001", "Atomic structure models (Thomson, Rutherford) — same historical experiments taught in both physics and chemistry"),

    # ================================================================ #
    # CHEMISTRY <-> BIOLOGY
    # ================================================================ #
    # C11: Redox reactions -> Cellular respiration
    ("c11_chem_062", "c11_bio_037", "Cellular respiration is a redox process — glucose oxidised, oxygen reduced; same electron transfer chemistry"),
    ("c11_chem_064", "c9_bio_010", "Balancing redox reactions applies to respiration equations — C6H12O6 + 6O2 -> 6CO2 + 6H2O is a redox reaction"),
    # C11: Hydrogen -> Biochemistry of water (DNA hydrogen bonds)
    ("c11_chem_041", "c11_bio_020", "Hydrogen bonding — DNA double helix held by H-bonds between A-T, G-C base pairs; cell membrane fluidity depends on H-bonding"),
    # C11: p-Block elements -> Carbon and nitrogen in life
    ("c11_chem_050", "c11_bio_017", "p-Block elements (C, N, O, P, S) are building blocks of biomolecules — proteins, DNA, carbohydrates"),
    # C11: Equilibrium -> Blood pH and buffers
    ("c11_chem_051", "c11_bio_048", "Blood pH is maintained by the CO2/HCO3-/H+ buffer system — a classic Le Chatelier equilibrium"),
    ("c11_chem_055", "c10_bio_011", "Factors affecting equilibrium explain how breathing rate adjusts blood pH — Le Chatelier in the circulatory system"),
    # C12: Solutions -> Osmosis in cells
    ("c12_chem_008", "c12_bio_064", "Solution concentration determines osmotic pressure — cell membrane transport depends on solution chemistry"),
    ("c12_chem_011", "c11_bio_020", "Ideal and non-ideal solutions explain why cell membranes are selectively permeable — osmosis follows Raoult's law deviations"),
    # C12: Surface chemistry -> Colloids in blood and milk
    ("c12_chem_033", "c11_bio_048", "Blood is a colloid — proteins form colloidal suspension; surface chemistry explains blood's properties"),
    ("c12_chem_034", "c11_bio_048", "Colloid properties (Tyndall effect, Brownian motion) are observable in blood plasma"),
    # C12: d-Block elements -> Iron in haemoglobin
    ("c12_chem_050", "c11_bio_048", "Iron (a d-block element) is the central atom in haemoglobin — transition metal chemistry enables oxygen transport in blood"),
    ("c12_chem_051", "c11_bio_048", "Transition metal trends explain why Fe²⁺ in haemoglobin binds O₂ reversibly — coordination chemistry in biology"),
    # C10: Organic chemistry -> Biomolecules
    ("c10_chem_044", "c10_bio_002", "Organic chemistry is the basis of biomolecules — proteins, carbohydrates, lipids, nucleic acids are organic compounds"),
    # C9: Acids -> Digestion (pH in stomach)
    ("c9_chem_039", "c9_bio_010", "Stomach acid (HCl, pH ~2) drives digestion — acid chemistry enables protein denaturation and enzyme activation"),
    # C9: Elements -> Living organisms
    ("c9_chem_001", "c9_bio_026", "Elements in living organisms — C, H, O, N, P, S are the building blocks; biotechnology uses cellular chemistry"),
    # C8: Chemical reactions -> Respiration and digestion
    ("c8_chem_010", "c8_bio_002", "Chemical reactions in biology — respiration and digestion are chemical decomposition and oxidation reactions"),
    # C8: Acids/bases -> Digestion and pH
    ("c8_chem_015", "c8_bio_002", "Digestive system uses acids (HCl in stomach) and bases (bile in intestines) — pH regulation in digestion"),
    # C7: Air and water -> Respiration and photosynthesis
    ("c7_chem_017", "c7_bio_014", "Water is essential for respiration — water is a reactant and product in cellular respiration"),
    ("c7_chem_017", "c7_bio_013", "Water is essential for photosynthesis — water is split in the light reactions to produce oxygen"),
    # C7: Soil -> Plant growth
    ("c7_chem_020", "c7_bio_001", "Soil chemistry (minerals, pH, nutrients) determines plant growth — plant tissues absorb chemical nutrients from soil"),

    # ================================================================ #
    # BIOLOGY <-> MATHEMATICS
    # ================================================================ #
    # C10: Genetics -> Probability
    ("c10_bio_016", "c10_math_080", "Mendelian genetics uses probability — 3:1 monohybrid and 9:3:3:1 dihybrid ratios come from multiplying independent probabilities"),
    # C10: Population -> Geometric progressions
    ("c10_bio_019", "c10_math_030", "Population growth follows geometric progression — P×r^n where r is growth rate, n is time steps"),
    ("c10_bio_020", "c10_math_031", "Population control models use geometric series sums — predicting carrying capacity"),
    # C10: Ecology -> Averages and ratios
    ("c10_bio_022", "c10_math_016", "Ecology pyramids use ratios — energy flow, biomass, number pyramids all use proportional reasoning"),
    # C12: Genetics -> Probability
    ("c12_bio_023", "c12_math_089", "Genetic disorders follow probability rules — Punnett squares use conditional probability for inheritance patterns"),
    ("c12_bio_024", "c12_math_093", "DNA as genetic material — probability distributions model random mutations and genetic drift"),
    # C12: Ecology -> Population models (differential equations)
    ("c12_bio_063", "c12_math_064", "Population growth models are differential equations — dN/dt = rN(1-N/K) is the logistic equation"),
    ("c12_bio_050", "c12_math_102", "Population attributes use differential equations — exponential and logistic growth models"),
    # C12: Biology and human welfare -> Statistics
    ("c12_bio_055", "c12_math_091", "Epidemiology uses statistics — disease spread models use probability and statistical distributions"),
    # C11: Cell biology -> Statistics (data analysis)
    ("c11_bio_020", "c11_math_093", "Cell biology experiments use statistics — mean, standard deviation for cell count data"),
    # C11: Human physiology -> Statistics
    ("c11_bio_045", "c11_math_094", "Human physiology data analysis uses standard deviation and variance — interpreting vital signs"),
    # C11: Plant physiology -> Statistics
    ("c11_bio_037", "c11_math_095", "Photosynthesis rate measurements use combined mean and standard deviation for experimental data"),
    # C9: Ecology -> Ratios and pyramids
    ("c9_bio_024", "c9_math_001", "Ecological pyramids use ratios — energy, biomass, number pyramids are proportional comparisons"),
    # C9: Nervous system -> Speed, distance, time
    ("c9_bio_015", "c9_math_007", "Nerve impulse speed measurement — reflex time = distance/speed, compound interest analogy for signal propagation"),
    # C8: Reproduction -> Probability
    ("c8_bio_005", "c8_math_038", "Asexual reproduction probability — chance of traits passing to offspring uses probability concepts"),
    # C8: Circulatory system -> Rates and proportion
    ("c8_bio_020", "c8_math_001", "Heart rate and blood flow use rates and proportion — cardiac output = stroke volume × heart rate"),
    # C8: Ecosystems -> Data handling
    ("c8_bio_008", "c8_math_038", "Ecosystem data uses graphs and data handling — population counts, species distribution"),

    # ================================================================ #
    # MATHEMATICS <-> PHYSICS (complementing physics master)
    # ================================================================ #
    # C10: Quadratic equations -> Kinematics
    ("c10_math_011", "c10_phy_004", "Kinematics equations are quadratic — v² = u² + 2as is quadratic in v; time of flight is quadratic in t"),
    ("c10_math_013", "c10_phy_004", "Solving kinematics problems uses the quadratic formula — projectile range and max height"),
    # C10: Geometric progression -> Population (already covered above)
    # C11: Conic sections -> Projectile motion
    ("c11_math_080", "c11_phy_014", "Projectile trajectory is a parabola — conic sections describe projectile motion paths"),
    # C11: Limits and derivatives -> Motion (velocity, acceleration)
    ("c11_math_086", "c11_phy_009", "Velocity = dx/dt requires limits — instantaneous velocity is the limit of average velocity as dt->0"),
    ("c11_math_089", "c11_phy_010", "Acceleration = dv/dt — derivative meaning is rate of change, directly applied to motion"),
    ("c11_math_091", "c11_phy_014", "Derivatives of trig functions used in projectile motion — v_x = v cos(θ), v_y = v sin(θ)"),
    # C11: Trigonometry -> Periodic phenomena (Biology/Physics)
    ("c11_math_075", "c11_phy_022", "SHM uses sin/cos — pendulum motion, wave oscillations are trigonometric functions of time"),
    # C12: Differential equations -> Physics (motion, growth, decay)
    ("c12_math_064", "c12_phy_006", "SHM is a differential equation — d²x/dt² = -ω²x describes simple harmonic motion"),
    ("c12_math_102", "c12_phy_136", "LC oscillations are described by differential equations — second-order ODE for charge on capacitor"),
    # C12: Vectors -> Torque and angular momentum
    ("c12_math_070", "c12_phy_046", "Torque = r × F is a vector cross product — vector mathematics is essential for rotational dynamics"),
    ("c12_math_072", "c12_phy_010", "Torque on a dipole uses position vectors — τ = p × E requires vector components"),
    # C12: Determinants -> Chemistry (Cramer's rule in equilibrium)
    ("c12_math_026", "c12_chem_052", "Equilibrium calculations can use Cramer's rule — solving systems of linear equations for equilibrium concentrations"),
    # C12: Probability -> Chemistry (quantum mechanics, electron orbitals)
    ("c12_math_093", "c11_chem_019", "Quantum numbers and electron orbitals use probability — electron probability density |ψ|² is a probability distribution"),
    # C9: Logarithms -> Chemistry (pH)
    ("c9_math_026", "c9_chem_039", "pH = -log[H+] uses laws of logarithms — logarithm properties are essential for pH calculations"),
    # C9: Compound interest -> Biology (population growth)
    ("c9_math_008", "c9_bio_024", "Compound interest formula A = P(1+r/100)^n models population growth — same exponential growth pattern"),
    # C7: Symmetry -> Biology (body plans)
    ("c7_math_036", "c7_bio_012", "Body plans of organisms show symmetry — bilateral (animals), radial (cnidarians) use geometric symmetry concepts"),
    # C7: Exponents -> Biology (cell division)
    ("c7_math_012", "c7_bio_001", "Cell division follows exponential growth — 2^n after n divisions uses exponent laws"),
    # C6: Fractions -> Chemistry (mixing)
    ("c6_math_022", "c6_chem_001", "Fractions describe parts of mixtures — chemical composition uses fractional parts"),
    # C6: Ratio -> Biology (maps, proportions)
    ("c6_math_011", "c6_bio_011", "Cell size comparisons use ratios — plant vs animal cell proportions"),
]


async def create_edges():
    driver = await get_neo4j()
    edges_added = 0
    edges_skipped = 0
    nodes_not_found = 0

    async with driver.session() as session:
        for node_a, node_b, reason in EDGES:
            # Check both nodes exist
            check_a = await session.run(
                "MATCH (n:KnowledgeNode {node_id: $nid}) RETURN n.node_id AS nid",
                nid=node_a,
            )
            rec_a = await check_a.single()
            if rec_a is None:
                print(f"  NOT FOUND: {node_a}")
                nodes_not_found += 1
                continue

            check_b = await session.run(
                "MATCH (n:KnowledgeNode {node_id: $nid}) RETURN n.node_id AS nid",
                nid=node_b,
            )
            rec_b = await check_b.single()
            if rec_b is None:
                print(f"  NOT FOUND: {node_b}")
                nodes_not_found += 1
                continue

            # Check if edge already exists
            edge_check = await session.run(
                """
                MATCH (a:KnowledgeNode {node_id: $a_id})-[r:RELATED_TO]-(b:KnowledgeNode {node_id: $b_id})
                RETURN count(r) AS count
                """,
                a_id=node_a, b_id=node_b,
            )
            edge_record = await edge_check.single()
            if edge_record and edge_record["count"] > 0:
                edges_skipped += 1
                continue

            # Create edge
            await session.run(
                """
                MATCH (a:KnowledgeNode {node_id: $a_id}), (b:KnowledgeNode {node_id: $b_id})
                CREATE (a)-[:RELATED_TO {reason: $reason, source: 'manual_cross_subject'}]->(b)
                """,
                a_id=node_a, b_id=node_b, reason=reason,
            )
            edges_added += 1

        # Verify
        result = await session.run("MATCH ()-[r:RELATED_TO]->() RETURN count(r) AS total")
        record = await result.single()
        print(f"\n--- Summary ---")
        print(f"Total edges in list: {len(EDGES)}")
        print(f"Edges added: {edges_added}")
        print(f"Edges skipped (already existed): {edges_skipped}")
        print(f"Nodes not found: {nodes_not_found}")
        print(f"Total RELATED_TO edges in Neo4j: {record['total']}")


async def main():
    await create_edges()


if __name__ == "__main__":
    asyncio.run(main())
