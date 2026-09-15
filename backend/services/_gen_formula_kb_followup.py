"""Follow-up Fable calls for missing formula subdomains.
Splits by subdomain to avoid token limit. Appends to existing YAML files.
"""
import urllib.request, json, ssl, os, time, sys

KEY = os.environ.get("FABLE_API_KEY", "sk-ant-co-gIEUzRWw_mtUpxKk668B1lzJe3XntCna")
URL = "https://api.claudeopus.pro/v1/messages"
MODEL = "fable"

# What's already done vs what's needed
JOBS = [
    # Physics — only has KIN(16) + CON(20). Need everything else.
    {
        "name": "physics_mech_grav_osc",
        "out_dir": r"D:\platform\backend\formulas\physics",
        "out_file": "physics_mech_grav_osc.yaml",
        "prompt": """Generate physics formulas as YAML for these subdomains ONLY:
1. DYNAMICS (Newton's laws, friction, circular motion, pseudo forces) — PHY_DYN
2. WORK_ENERGY (work, kinetic energy, potential energy, power, conservation, collisions) — PHY_WE
3. MOMENTUM (linear momentum, impulse, conservation, rocket propulsion) — PHY_MON
4. ROTATIONAL (torque, moment of inertia, angular momentum, rolling, gyroscope) — PHY_ROT
5. GRAVITATION (Newtonian, orbital, Kepler, escape velocity, gravitational PE, tidal) — PHY_GRAV
6. OSCILLATIONS (SHM, damped, forced, resonance, pendulum, spring) — PHY_OSC
7. WAVES (wave equation, sound, Doppler, standing waves, beats, interference, intensity) — PHY_WAV

Use this YAML schema per formula:
- formula_id: "PHY_<SUB>_<NNN>"
  name: "..."
  latex: "..."
  variables:
    - symbol: "..."
      name: "..."
      unit: "..."
      dimensional_formula: "M*L*T^-2"
      quantity_type: "..."
  preconditions: [...]
  grade_range: ["class9","class10","class11","class12","jee_main","jee_advanced"]
  chapter: "..."
  subject: "physics"
  concept_tags: [...]
  related_formulas: [...]

Output ONLY valid YAML starting with ---. No markdown fences. Target: 150+ formulas."""
    },
    {
        "name": "physics_em_thermo_optics",
        "out_dir": r"D:\platform\backend\formulas\physics",
        "out_file": "physics_em_thermo_optics.yaml",
        "prompt": """Generate physics formulas as YAML for these subdomains ONLY:
1. THERMODYNAMICS (zeroth/first/second/third laws, Carnot, entropy, Maxwell relations, kinetic theory, heat transfer, Stefan-Boltzmann) — PHY_THM
2. ELECTROSTATICS (Coulomb, Gauss, electric field, potential, capacitance, dielectrics, energy density) — PHY_ES
3. CURRENT ELECTRICITY (Ohm, Kirchhoff, Wheatstone, potentiometer, drift velocity, resistance, EMF) — PHY_CE
4. MAGNETISM (Biot-Savart, Ampere, force on wire/charge, magnetic dipole, magnetic properties) — PHY_MAG
5. EMI (Faraday, Lenz, self/mutual inductance, AC generator, transformer, eddy currents) — PHY_EMI
6. AC CIRCUITS (RMS, impedance, resonance, LC/RC/RLC, power factor, Q-factor) — PHY_AC
7. MAXWELL & EM WAVES (Maxwell equations, displacement current, EM wave properties, Poynting vector) — PHY_EMW

Use same YAML schema as before. Output ONLY valid YAML starting with ---. No markdown fences. Target: 150+ formulas."""
    },
    {
        "name": "physics_modern_quantum_relativity",
        "out_dir": r"D:\platform\backend\formulas\physics",
        "out_file": "physics_modern_quantum_relativity.yaml",
        "prompt": """Generate physics formulas as YAML for these subdomains ONLY:
1. OPTICS_GEOMETRIC (reflection, refraction, lenses, mirrors, prisms, optical instruments, lensmaker) — PHY_OPT_G
2. OPTICS_WAVE (interference, diffraction, polarization, coherence, Young's double slit, grating) — PHY_OPT_W
3. MODERN PHYSICS (photoelectric, Compton, de Broglie, Heisenberg uncertainty, Bohr model, atomic spectra, X-rays) — PHY_MOD
4. NUCLEAR (binding energy, radioactivity, half-life, fission, fusion, Q-value, mass-energy) — PHY_NUC
5. QUANTUM MECHANICS (Schrodinger equation, operators, eigenvalues, harmonic oscillator, hydrogen atom, angular momentum, spin, perturbation) — PHY_QM
6. RELATIVITY (Lorentz, time dilation, length contraction, relativistic momentum/energy, E=mc², Doppler relativistic, Schwarzschild radius) — PHY_REL
7. SOLID STATE (Bragg, band theory, semiconductors, Hall effect, superconductivity, phonons, Debye model) — PHY_SS
8. ASTROPHYSICS (Stefan-Boltzmann, Hubble law, Friedmann basics, stellar structure, Chandrasekhar limit) — PHY_AST

Use same YAML schema. grade_range should include "undergraduate","graduate","phd" for advanced ones. Output ONLY valid YAML starting with ---. No markdown fences. Target: 150+ formulas."""
    },
    # Chemistry — has STOICH, ATM, BOND, THERMO, EQM, AB, GAS, ELECTRO. Need the rest.
    {
        "name": "chem_kinetics_solutions_surface",
        "out_dir": r"D:\platform\backend\formulas\chemistry",
        "out_file": "chem_kinetics_solutions_surface.yaml",
        "prompt": """Generate chemistry formulas as YAML for these subdomains ONLY:
1. CHEMICAL KINETICS (rate laws, integrated rate laws 0/1/2 order, Arrhenius, half-life, collision theory, catalysis, Michaelis-Menten) — CHM_KIN
2. SOLUTIONS (Raoult, Henry, colligative properties, van't Hoff factor, molality, molarity, osmotic pressure) — CHM_SOL
3. SURFACE CHEMISTRY (Langmuir, Freundlich, BET, catalysis, colloids, zeta potential, Tyndall) — CHM_SURF
4. COORDINATION COMPOUNDS (CFT splitting, CFSE, magnetic properties, nomenclature rules, isomerism, EAN) — CHM_COORD
5. PERIODIC TRENDS (atomic radius, IE, EA, electronegativity formulas, Slater's rules, effective nuclear charge) — CHM_PER

Use YAML schema: formula_id: "CHM_<SUB>_<NNN>", name, latex, variables (symbol/name/unit/dimensional_formula/quantity_type), preconditions, grade_range, chapter, subject: "chemistry", concept_tags. Output ONLY valid YAML starting with ---. No markdown fences. Target: 100+ formulas."""
    },
    {
        "name": "chem_organic_reactions",
        "out_dir": r"D:\platform\backend\formulas\chemistry",
        "out_file": "chem_organic_reactions.yaml",
        "prompt": """Generate organic chemistry REACTION entries as YAML. NOT formulas — reactions.

Cover ALL major organic reaction types for CBSE/JEE/NEET + undergraduate:
1. SN1, SN2, E1, E2 mechanisms
2. Electrophilic addition (alkenes, alkynes)
3. Electrophilic aromatic substitution (nitration, sulfonation, halogenation, Friedel-Crafts alkylation/acylation)
4. Nucleophilic addition (aldehydes, ketones)
5. Nucleophilic substitution (carboxylic acids, derivatives)
6. Free radical reactions (halogenation of alkanes)
7. Named reactions: Grignard, Aldol, Cannizzaro, Wurtz, Kolbe, Reimer-Tiemann, Hofmann, Diels-Alder, Williamson, Clemmensen, Wolff-Kishner, Ozonolysis, Perkin, Sandmeyer, Gattermann, Etard, Rosenmund, Stephen, Gabriel, Coupling
8. Functional group interconversions: alcohol→aldehyde→acid→ester→amide, alkene→alkane, alkene→haloalkane, etc.
9. Rearrangement reactions: pinacol, Beckmann, Hofmann, Claisen, Fries
10. Biomolecules: glucose reactions, protein peptide bond, nucleic acid basics

Use this YAML schema per reaction:
- reaction_id: "CHM_RXN_<NNN>"
  name: "..."
  reactants: ["C6H6", "R-Cl", "AlCl3"]
  products: ["C6H5-R", "HCl"]
  conditions: "anhydrous AlCl3, reflux"
  mechanism: "electrophilic_aromatic_substitution"
  grade_range: ["class11","class12","jee_main","jee_advanced","neet"]
  chapter: "..."
  subject: "chemistry"
  concept_tags: [...]
  notes: "..."

Output ONLY valid YAML starting with ---. No markdown fences. Target: 200+ reactions."""
    },
    {
        "name": "chem_inorganic_analytical",
        "out_dir": r"D:\platform\backend\formulas\chemistry",
        "out_file": "chem_inorganic_analytical.yaml",
        "prompt": """Generate inorganic + analytical chemistry formulas and data as YAML.

1. s-BLOCK (group 1, 2 trends, reactions, anomalous Li/Be, diagonal relationship) — CHM_S
2. p-BLOCK (group 13-18 key reactions, properties, anomalous behavior, allotropes) — CHM_P
3. d-BLOCK (transition metals, variable oxidation states, color, magnetic moments, KMnO4, K2Cr2O7) — CHM_D
4. f-BLOCK (lanthanides, actinides basics, contraction) — CHM_F
5. METALLURGY (Ellingham diagram, froth flotation, roasting, calcination, smelting, refining) — CHM_MET
6. QUALITATIVE ANALYSIS (cation group separation scheme, anion tests, flame test colors) — CHM_QA
7. SPECTROSCOPY (UV-Vis Beer-Lambert, IR frequency ranges, NMR chemical shift ranges, mass spec) — CHM_SPEC
8. QUANTUM CHEMISTRY (Schrodinger for H atom, radial functions, MO energy levels, selection rules) — CHM_QC
9. STATISTICAL THERMO (partition function, Boltzmann, Maxwell-Boltzmann distribution) — CHM_ST

Use YAML schema: formula_id: "CHM_<SUB>_<NNN>". Output ONLY valid YAML starting with ---. No markdown fences. Target: 100+ formulas."""
    },
    # Math — has ALG, ARITH, CALC. Need geometry, trig, probability, discrete, advanced.
    {
        "name": "math_geom_trig_coord",
        "out_dir": r"D:\platform\backend\formulas\mathematics",
        "out_file": "math_geom_trig_coord.yaml",
        "prompt": """Generate mathematics formulas as YAML for these subdomains ONLY:
1. GEOMETRY (triangles: Heron, sine/cosine rule, area; circles: arc, sector, segment; polygons; Pythagoras; angle bisector; median) — MATH_GEO
2. TRIGONOMETRY (all identities, sum/difference, double/half angle, product-to-sum, inverse trig, solutions of triangles) — MATH_TRIG
3. COORDINATE GEOMETRY (distance, section, slope, line, angle between lines, conics: parabola/ellipse/hyperbola standard+ tangent+normal+asymptote) — MATH_COORD
4. 3D GEOMETRY (direction cosines, line in 3D, plane, distance point to plane, angle between planes/lines) — MATH_3D
5. VECTORS (dot, cross, scalar triple, vector triple, projection, direction cosines as vectors) — MATH_VEC

Use YAML schema: formula_id: "MATH_<SUB>_<NNN>", all math is dimensionless (unit: "", dimensional_formula: ""). Output ONLY valid YAML starting with ---. No markdown fences. Target: 150+ formulas."""
    },
    {
        "name": "math_prob_stats_discrete",
        "out_dir": r"D:\platform\backend\formulas\mathematics",
        "out_file": "math_prob_stats_discrete.yaml",
        "prompt": """Generate mathematics formulas as YAML for these subdomains ONLY:
1. PROBABILITY (conditional, Bayes, total probability, independent, Bernoulli, random variables) — MATH_PROB
2. DISTRIBUTIONS (binomial, Poisson, normal, exponential, uniform, geometric, hypergeometric, gamma, beta) — MATH_DIST
3. STATISTICS (mean, median, mode, variance, SD, moments, skewness, kurtosis, correlation, regression) — MATH_STAT
4. HYPOTHESIS TESTING (t-test, chi-square, F-test, confidence intervals, p-value, ANOVA) — MATH_HYP
5. SET THEORY (operations, De Morgan, cardinality, power set, Venn) — MATH_SET
6. LOGIC (propositional, predicate, truth tables, normal forms, quantifiers) — MATH_LOGIC
7. GRAPH THEORY (degree, adjacency, paths, cycles, trees, Euler, Hamiltonian, planarity, coloring) — MATH_GRAPH
8. COMBINATORICS (generating functions, recurrence, inclusion-exclusion, Burnside, Stirling numbers) — MATH_COMB

Use YAML schema: formula_id: "MATH_<SUB>_<NNN>". Output ONLY valid YAML starting with ---. No markdown fences. Target: 120+ formulas."""
    },
    {
        "name": "math_advanced",
        "out_dir": r"D:\platform\backend\formulas\mathematics",
        "out_file": "math_advanced.yaml",
        "prompt": """Generate advanced mathematics formulas as YAML for PhD/graduate level:
1. REAL ANALYSIS (convergence tests: ratio/root/comparison/integral/alternating, Riemann sums, Lebesgue basics, Taylor remainder) — MATH_RA
2. COMPLEX ANALYSIS (Cauchy integral, residue theorem, Laurent series, contour integration, Cauchy-Riemann) — MATH_CA
3. LINEAR ALGEBRA ADV (SVD, QR, Gram-Schmidt, projection, spectral theorem, Jordan form, Cayley-Hamilton) — MATH_LA
4. NUMERICAL METHODS (Newton-Raphson, secant, bisection, Runge-Kutta 4th order, finite differences, Lagrange/Newton interpolation, Euler method) — MATH_NM
5. OPTIMIZATION (KKT conditions, Lagrange multipliers, gradient descent, convex optimization, simplex) — MATH_OPT
6. DIFFERENTIAL GEOMETRY (curvature, torsion, Frenet-Serret, geodesics, Christoffel symbols) — MATH_DG
7. PDE (classification, separation of variables, heat equation, wave equation, Laplace equation solutions, Fourier transform) — MATH_PDE
8. ABSTRACT ALGEBRA (group: Lagrange, Sylow; ring: ideals; field: Galois; module basics) — MATH_AA
9. TOPOLOGY (open/closed sets, continuity, compactness, connectedness, homotopy basics) — MATH_TOP

Use YAML schema: formula_id: "MATH_<SUB>_<NNN>". grade_range should include "undergraduate","graduate","phd". Output ONLY valid YAML starting with ---. No markdown fences. Target: 120+ formulas."""
    },
    # Biology — has GEN, PHYSIO, PHYTO. Need ecology, cell, molecular, evolution, advanced.
    {
        "name": "bio_ecology_cell_molecular",
        "out_dir": r"D:\platform\backend\formulas\biology",
        "out_file": "bio_ecology_cell_molecular.yaml",
        "prompt": """Generate biology formulas as YAML for these subdomains ONLY:
1. ECOLOGY (exponential/logistic growth, Lotka-Volterra, Shannon/Simpson diversity, 10% law, GPP/NPP, biogeochemical cycles) — BIO_ECO
2. CELL BIOLOGY (cell cycle, mitotic index, SA:V ratio, osmosis, Fick's law, surface area formulas) — BIO_CELL
3. PLANT PHYSIOLOGY (photosynthesis efficiency, Calvin cycle rate, transpiration, water potential, pressure flow) — BIO_PP
4. MOLECULAR BIOLOGY (DNA Tm, GC content, PCR efficiency, protein MW, codon usage, qPCR dCt, central dogma rates) — BIO_MB
5. ENZYME KINETICS (Michaelis-Menten, Lineweaver-Burk, competitive/non-competitive inhibition, Hill equation) — BIO_EK

Use YAML schema: formula_id: "BIO_<SUB>_<NNN>". Output ONLY valid YAML starting with ---. No markdown fences. Target: 100+ formulas."""
    },
    {
        "name": "bio_evolution_epidemiology_pharma",
        "out_dir": r"D:\platform\backend\formulas\biology",
        "out_file": "bio_evolution_epidemiology_pharma.yaml",
        "prompt": """Generate biology formulas + models as YAML for these subdomains ONLY:
1. EVOLUTION (fitness, selection coefficient, Haldane's darwin, molecular clock, effective population size, Hardy-Weinberg extensions) — BIO_EVO
2. QUANTITATIVE GENETICS (heritability h², breeder's equation R=h²S, G-matrix, response to selection) — BIO_QG
3. EPIDEMIOLOGY (incidence, prevalence, R0, SIR model equations, SEIR, herd immunity threshold, case fatality) — BIO_EPI
4. PHARMACOKINETICS (one-compartment C=Dose/V×e^(-kt), half-life, AUC, bioavailability, clearance, multiple dosing) — BIO_PK
5. PHARMACODYNAMICS (Emax, sigmoid Emax/Hill, isobologram, competitive antagonism) — BIO_PD
6. BIOINFORMATICS (BLAST E-value, Jukes-Cantor, Kimura distance, sequence alignment scoring, phylogenetic tree metrics) — BIO_BI
7. SYSTEMS BIOLOGY (rate equations for gene networks, feedback stability, metabolic flux analysis) — BIO_SB
8. BIOPHYSICS (membrane potential Goldman, ion channel conductance, Boltzmann in biology, diffusion-limited reactions) — BIO_BP

Use YAML schema: formula_id: "BIO_<SUB>_<NNN>". Also include model entries with model_id: "BIO_MODEL_<NNN>" for SIR, SEIR, Lotka-Volterra, etc. Output ONLY valid YAML starting with ---. No markdown fences. Target: 100+ formulas + 20+ models."""
    },
]

def call_fable(prompt_text, out_path, name):
    ctx = ssl.create_default_context()
    body = json.dumps({
        "model": MODEL,
        "max_tokens": 64000,
        "system": "You are an expert generating a formula knowledge base as YAML. Output ONLY valid YAML. No markdown, no commentary, no code fences. Start with --- and then a YAML list.",
        "messages": [{"role": "user", "content": prompt_text}]
    }).encode("utf-8")

    req = urllib.request.Request(URL, data=body, method="POST")
    req.add_header("x-api-key", KEY)
    req.add_header("Content-Type", "application/json")
    req.add_header("anthropic-version", "2023-06-01")

    t0 = time.time()
    try:
        with urllib.request.urlopen(req, timeout=600, context=ctx) as resp:
            raw = resp.read().decode("utf-8")
            data = json.loads(raw)
            text = ""
            for block in data.get("content", []):
                if block.get("type") == "text":
                    text += block.get("text", "")
            usage = data.get("usage", {})
            elapsed = time.time() - t0

            # Strip markdown fences
            if "```" in text:
                lines = text.split("\n")
                in_fence = False
                cleaned = []
                for line in lines:
                    if line.strip().startswith("```"):
                        in_fence = not in_fence
                        continue
                    if not in_fence:
                        cleaned.append(line)
                text = "\n".join(cleaned)

            formula_count = text.count("formula_id:")
            reaction_count = text.count("reaction_id:")
            model_count = text.count("model_id:")

            os.makedirs(os.path.dirname(out_path), exist_ok=True)
            with open(out_path, "w", encoding="utf-8") as f:
                f.write(text)

            print(f"[{name}] {elapsed:.0f}s | in:{usage.get('input_tokens','?')} out:{usage.get('output_tokens','?')} | "
                  f"formulas:{formula_count} reactions:{reaction_count} models:{model_count} | "
                  f"{os.path.getsize(out_path)} bytes -> {out_path}")
            return True
    except Exception as e:
        print(f"[{name}] ERROR: {type(e).__name__}: {e}")
        return False

if __name__ == "__main__":
    # Run jobs sequentially to avoid overwhelming the API
    # Pass job index as argument to run specific job
    if len(sys.argv) > 1:
        idx = int(sys.argv[1])
        if idx < len(JOBS):
            job = JOBS[idx]
            out_path = os.path.join(job["out_dir"], job["out_file"])
            call_fable(job["prompt"], out_path, job["name"])
    else:
        # Run all sequentially
        for i, job in enumerate(JOBS):
            out_path = os.path.join(job["out_dir"], job["out_file"])
            call_fable(job["prompt"], out_path, job["name"])
            time.sleep(2)  # small delay between calls
