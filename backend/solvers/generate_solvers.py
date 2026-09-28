"""
Generate all solver files via Claude API.

Calls Claude API to generate:
1. Core calculus engine (shared)
2. Subject solvers for C11-12 (9 subjects)
3. Question generators for each subject
4. YAML step types, problem types, node mappings

Output goes to D:\platform\backend\solvers\
"""
import json, time, urllib.request, ssl, os, sys
from pathlib import Path

import os
API_KEY = os.environ.get('CLAUDE_API_KEY') or os.environ.get('ANTHROPIC_API_KEY')
assert API_KEY, 'set CLAUDE_API_KEY/ANTHROPIC_API_KEY'
API_URL = 'https://api.claudeopus.pro/v1/messages'

# Fable-5 for critical coding (calculus engine, solver code, question generators)
# Opus-5 for normal tasks (YAML definitions, node mappings)
MODEL_CRITICAL = 'claude-fable-5'
MODEL_NORMAL = 'claude-opus-5'
MAX_TOKENS = 128000
OUTPUT_DIR = Path(r'D:\platform\backend\solvers')
YAML_DIR = OUTPUT_DIR / 'yaml'
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
YAML_DIR.mkdir(parents=True, exist_ok=True)

# ============================================================
# API CALL
# ============================================================

def call_claude(prompt, system_prompt=None, max_tokens=MAX_TOKENS, model=MODEL_CRITICAL):
    body = {
        'model': model,
        'max_tokens': max_tokens,
        'messages': [{'role': 'user', 'content': prompt}],
    }
    if system_prompt:
        body['system'] = system_prompt
    payload = json.dumps(body).encode()
    req = urllib.request.Request(API_URL, data=payload)
    req.add_header('x-api-key', API_KEY)
    req.add_header('Content-Type', 'application/json')
    req.add_header('anthropic-version', '2023-06-01')
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    for attempt in range(3):
        try:
            resp = urllib.request.urlopen(req, timeout=600, context=ctx)
            data = json.loads(resp.read())
            for block in data['content']:
                if block['type'] == 'text':
                    return block['text']
            return ''
        except Exception as e:
            print('  Attempt %d failed: %s' % (attempt+1, str(e)[:100]), flush=True)
            time.sleep(5)
    return None

# ============================================================
# FILE EXTRACTION FROM CLAUDE RESPONSE
# ============================================================

def extract_files(response):
    """Extract files from Claude's response.
    Expects files delimited as:
    === FILE: path/to/file.py ===
    <content>
    === END FILE ===
    """
    files = {}
    parts = response.split('=== FILE:')
    for part in parts[1:]:  # skip preamble
        if '===' not in part:
            continue
        # Get filename
        end_name = part.index('===')
        filename = part[:end_name].strip()
        # Get content
        rest = part[end_name+3:]
        if '=== END FILE ===' in rest:
            content = rest[:rest.index('=== END FILE ===')].strip()
        else:
            content = rest.strip()
        files[filename] = content
    return files

def save_files(files, base_dir):
    """Save extracted files to disk."""
    saved = []
    for filename, content in files.items():
        # Clean filename - remove any path traversal
        filename = filename.replace('\\', '/').lstrip('/')
        filepath = base_dir / filename
        filepath.parent.mkdir(parents=True, exist_ok=True)
        filepath.write_text(content, encoding='utf-8')
        size = filepath.stat().st_size
        saved.append((filename, size))
    return saved

# ============================================================
# COMMON SYSTEM PROMPT
# ============================================================

COMMON_SYSTEM = """You are a master software engineer and CISCE/ISC curriculum expert.
You write production-quality Python code for a deterministic educational solver platform.

CRITICAL RULES:
1. NO paid services. NO LLM in the computation path. NO API calls during solving OR question generation.
2. Use ONLY free open-source libraries: SymPy, SymEngine, scipy, numpy, chempy, rdkit,
   mendeleev, biopython, pint, pandas, decimal, statsmodels, matplotlib, schemdraw,
   svgwrite, hypothesis, mpmath, math, re, json, dataclasses, typing, random.
3. Every solver must produce STEP-BY-STEP output that is pedagogically transparent.
   Show WHICH RULE was applied and WHY. Not a black-box simplify().
4. Every solver must include VERIFICATION (100-point numerical check or back-substitution).
5. Every solver must have a 10-second TIMEOUT with graceful fallback.
6. QUESTION GENERATORS must be DETERMINISTIC — pure Python with SymPy randomization.
   No LLM. No API calls. No external services. Use random.seed for reproducibility.
   Generate questions by: picking a problem type → randomizing variables within
   curriculum-appropriate ranges → computing the answer with the solver → packaging
   question + answer + steps + misconception tags + Bloom's level.
   Must generate INFINITE variations (different random seeds = different questions).
7. 50% of generated questions must be COMPETENCY-BASED (NEP 2020): real-world scenarios,
   multi-step reasoning, assertion-reasoning, data interpretation, case studies.
8. 50% of generated questions must be STANDARD problems: direct computation, formula application.
9. All questions must use INDIAN CONTEXT: Indian names, places, currency (Rs), scenarios.
10. Output format: YAML for definitions, Python for code. NO JSON files.
11. Every syllabus topic must have at least ONE problem type. MAXIMUM coverage.
12. Logic must be PERFECT. Test mentally before outputting.

OUTPUT FORMAT:
Write each file delimited as:
=== FILE: relative/path/to/file.py ===
<file content>
=== END FILE ===

For YAML files:
=== FILE: relative/path/to/file.yaml ===
<yaml content>
=== END FILE ===

Do NOT use JSON. Use YAML and Python only."""

# ============================================================
# GENERATION TASKS
# ============================================================

TASKS = [
    # Task 1: Core Calculus Engine — CRITICAL (Fable-5)
    {
        'name': 'Core Calculus Engine',
        'model': MODEL_CRITICAL,
        'system': COMMON_SYSTEM,
        'prompt': """Generate the CORE CALCULUS ENGINE — the shared foundation for all maths/physics/applied maths solvers.

This engine must handle Class 11-12 ISC calculus using a hybrid approach:
1. SymEngine for fast standard operations (10-100x faster than SymPy)
2. SymPy for parsing and operations SymEngine can't handle
3. Giac/Xcas (via subprocess to `giac` command) for hard integrals/ODEs
4. scipy/mpmath for numerical fallback
5. Pre-computed standard derivative/integral tables
6. Manual rule application for step-by-step pedagogical output

Generate these files:

FILE 1: core_calculus_engine.py
The main engine with these operations:
- differentiate(expression, var, order=1) — with step-by-step showing power/product/quotient/chain rule
- integrate(expression, var, definite=False, lower=None, upper=None) — with u-sub, by-parts, partial fractions
- limit(expression, var, point, direction='two-sided') — with L'Hôpital, factorization, series
- solve_ode(equation, var, dependent_var) — variable separable, homogeneous, linear, Bernoulli, exact
- taylor_series(expression, var, point, order) — with convergence note
- critical_points(expression, var) — find where derivative = 0
- max_min_check(expression, var, critical_point) — second derivative test
- tangent_line(expression, var, point) — equation of tangent
- increasing_decreasing(expression, var) — intervals where f'>0 and f'<0
- area_under_curve(f, var, lower, upper) — definite integral with geometric interpretation
- area_between_curves(f1, f2, var, lower, upper) — with intersection points

Each operation must:
- Parse input with SymPy
- Try SymEngine first (fast)
- Fall back to SymPy if SymEngine fails
- Fall back to Giac for hard integrals/ODEs
- Fall back to scipy numerical for definite integrals
- Verify result (differentiate integral to check, numerical check at 100 points)
- Return SolverResult with: success, answer, steps (list of step strings), verified, error
- 10-second timeout per operation

FILE 2: derivative_tables.py
Pre-computed standard derivative forms as a lookup table:
- d/dx[x^n] = n*x^(n-1)
- d/dx[sin(x)] = cos(x), d/dx[cos(x)] = -sin(x), etc.
- d/dx[e^x] = e^x, d/dx[ln(x)] = 1/x
- d/dx[arcsin(x)] = 1/sqrt(1-x^2), etc.
- Product rule, quotient rule, chain rule templates
- Each entry: pattern, result, rule_name, explanation

FILE 3: integral_tables.py
Pre-computed standard integral forms:
- ∫x^n dx = x^(n+1)/(n+1)
- ∫sin(x)dx = -cos(x), ∫cos(x)dx = sin(x)
- ∫e^x dx = e^x, ∫1/x dx = ln|x|
- ∫1/(a^2+x^2) dx = (1/a)arctan(x/a)
- Integration by parts: ∫u dv = uv - ∫v du
- Partial fractions templates
- Each entry: pattern, result, method_name, explanation

FILE 4: core_calculus_engine.yaml
YAML definitions for all calculus step types and problem types (for the frontend forms).

Make the code PRODUCTION QUALITY. Include proper error handling, timeouts, verification.
Show EVERY RULE applied in the steps — students must see the reasoning.""",
    },
    # Task 2: Maths C12
    {
        'name': 'Maths C12 Solver',
        'model': MODEL_CRITICAL,
        'system': COMMON_SYSTEM,
        'prompt': """Generate the ISC Class 12 MATHEMATICS solver and question generator.

CISCE ISC Class 12 Maths topics (109 nodes):
1. Relations and Functions: types of relations, equivalence relations, one-to-one/onto functions, composite functions, inverse functions
2. Algebra: matrices (operations, transpose, symmetric/skew-symmetric), determinants (properties, inverse, solve linear equations), Cramer's rule
3. Calculus: continuity, differentiability, derivatives (composite, implicit, parametric, logarithmic), second derivative, Rolle's theorem, Mean Value Theorem, maxima/minima, integration (indefinite, definite), area under/between curves, differential equations (variable separable, homogeneous, linear)
4. Vectors and 3D: vectors (magnitude, direction, dot product, cross product), 3D geometry (direction cosines, line in space, plane), distance from point to plane
5. Probability: conditional probability, Bayes' theorem, random variables, binomial distribution
6. Linear Programming: formulation, graphical method, bounded/unbounded regions

Use the core_calculus_engine for all calculus operations.
Use SymPy for matrices, determinants, vectors, probability.
Use scipy.optimize.linprog for LPP.

Generate these files:

FILE 1: solver_maths_c12.py
All solver operations for C12 maths. Each operation returns SolverResult with steps.

FILE 2: step_types_maths_c12.yaml
Input form definitions for each problem type (field name, label, type, placeholder, help_text).

FILE 3: problem_types_maths_c12.yaml
Multi-step problem chains. Each problem type chains step types together.

FILE 4: question_gen_maths_c12.py
Question generator that produces:
- 50% competency-based questions (Indian context: cricket stats, railway distances, factory profit, population growth, etc.)
- 50% standard problems
- Randomized variables within curriculum-appropriate ranges
- Marks allocation per ISC pattern (1, 2, 3, 4, 5, 6 marks)
- Model answers with step-by-step solutions
- Misconception tags per question
- Bloom's taxonomy tagging

FILE 5: node_mapping_maths_c12.yaml
Maps each of the 109 CISCE node IDs (c12_math_001 through c12_math_109) to problem types.

MAXIMUM coverage — every topic must have at least one problem type.
PERFECT logic — every solver must include verification.""",
    },
    # Task 3: Maths C11
    {
        'name': 'Maths C11 Solver',
        'model': MODEL_CRITICAL,
        'system': COMMON_SYSTEM,
        'prompt': """Generate the ISC Class 11 MATHEMATICS solver and question generator.

CISCE ISC Class 11 Maths topics (108 nodes):
1. Sets and Functions: sets (operations, Venn diagrams, power set), relations and functions (domain, range, types), trigonometric functions (identities, equations, inverse trig)
2. Algebra: complex numbers (modulus, argument, polar form), quadratic equations, linear inequalities, permutations and combinations, binomial theorem, sequences and series (AP, GP)
3. Coordinate Geometry: straight lines (slope, equations, distance), conic sections (circle, parabola, ellipse, hyperbola), 3D coordinate geometry basics
4. Calculus: limits and derivatives (intuitive, algebraic, trigonometric limits), continuity
5. Statistics: measures of dispersion (range, mean deviation, variance, standard deviation)
6. Probability: random experiments, sample space, events, axiomatic probability

Use SymPy for all algebra, trigonometry, complex numbers, sequences, coordinate geometry.
Use core_calculus_engine for limits and derivatives.
Use scipy.stats for statistics.
Use SymPy.combinatorics for permutations/combinations.

Generate these files:
FILE 1: solver_maths_c11.py
FILE 2: step_types_maths_c11.yaml
FILE 3: problem_types_maths_c11.yaml
FILE 4: question_gen_maths_c11.py
FILE 5: node_mapping_maths_c11.yaml

Same requirements: 50% competency, 50% standard, Indian context, verification, maximum coverage.""",
    },
    # Task 4: Physics C12
    {
        'name': 'Physics C12 Solver',
        'model': MODEL_CRITICAL,
        'system': COMMON_SYSTEM,
        'prompt': """Generate the ISC Class 12 PHYSICS solver and question generator.

CISCE ISC Class 12 Physics topics (140 nodes):
1. Electrostatics: Coulomb's law, electric field, Gauss's law, electric potential, capacitance, energy stored
2. Current Electricity: Ohm's law, Kirchhoff's laws, Wheatstone bridge, meter bridge, potentiometer, internal resistance
3. Magnetism: magnetic field, Biot-Savart law, Ampere's law, force on current-carrying conductor, torque on coil, moving coil galvanometer
4. Electromagnetic Induction: Faraday's law, Lenz's law, self/mutual inductance, AC generator, transformer, Eddy currents
5. AC Circuits: RMS value, reactance, impedance, LCR series circuit, resonance, power factor, LC oscillations
6. Ray Optics: reflection, refraction, lens/mirror formula, prism, optical instruments (microscope, telescope)
7. Wave Optics: Huygens' principle, interference, Young's double slit, diffraction, polarization
8. Modern Physics: photoelectric effect, de Broglie wavelength, nuclear binding energy, radioactivity, nuclear fission/fusion, semiconductor basics

Use scipy.constants for physical constants (NO hardcoded values).
Use pint for unit handling and conversion.
Use scipy.integrate.solve_ivp for RC/RL circuit transients.
Use SymPy for symbolic circuit analysis (Kirchhoff's laws).
Use schemdraw for circuit diagram SVG generation.

Generate these files:
FILE 1: solver_physics_c12.py
FILE 2: step_types_physics_c12.yaml
FILE 3: problem_types_physics_c12.yaml
FILE 4: question_gen_physics_c12.py
FILE 5: node_mapping_physics_c12.yaml

Each physics solver must:
- Show the PHYSICS FORMULA first
- Substitute values WITH UNITS
- Compute the result
- Show unit verification
- 50% competency: Indian context (hydroelectric dams, Indian Railways electrification, ISRO satellites, etc.)
- 50% standard: direct formula application""",
    },
    # Task 5: Physics C11
    {
        'name': 'Physics C11 Solver',
        'model': MODEL_CRITICAL,
        'system': COMMON_SYSTEM,
        'prompt': """Generate the ISC Class 11 PHYSICS solver and question generator.

CISCE ISC Class 11 Physics topics (107 nodes):
1. Physical World and Measurement: units, significant figures, dimensional analysis, error propagation
2. Kinematics: motion in straight line, motion in a plane, projectile motion, relative velocity
3. Laws of Motion: Newton's laws, friction, circular motion, banking of roads
4. Work, Energy and Power: work-energy theorem, potential/kinetic energy, conservative/non-conservative forces, collisions
5. Motion of System of Particles: center of mass, rotational motion, moment of inertia, torque, angular momentum, rolling motion
6. Gravitation: Kepler's laws, universal gravitation, gravitational potential, escape velocity, orbital velocity, satellites
7. Properties of Bulk Matter: elasticity (Hooke's law, Young's modulus), fluid statics (pressure, Pascal's law, Archimedes' principle), fluid dynamics (Bernoulli's principle, viscosity, Stokes' law, terminal velocity), surface tension, thermal expansion, calorimetry, heat transfer (conduction, convection, radiation)
8. Thermodynamics: zeroth/first/second law, Carnot engine, refrigerator, thermal efficiency
9. Kinetic Theory of Gases: ideal gas equation, degrees of freedom, equipartition of energy, mean free path
10. Oscillations and Waves: SHM, pendulum, spring-mass system, damped/forced oscillations, wave motion, transverse/longitudinal waves, speed of wave, superposition, beats, Doppler effect

Use scipy.constants, pint, scipy.integrate, SymPy, matplotlib for graphs.
Use svgwrite for force diagrams, ray diagrams, wave diagrams.

Generate these files:
FILE 1: solver_physics_c11.py
FILE 2: step_types_physics_c11.yaml
FILE 3: problem_types_physics_c11.yaml
FILE 4: question_gen_physics_c11.py
FILE 5: node_mapping_physics_c11.yaml

Same requirements: 50% competency, 50% standard, Indian context, verification, maximum coverage.""",
    },
    # Task 6: Chemistry C12
    {
        'name': 'Chemistry C12 Solver',
        'model': MODEL_CRITICAL,
        'system': COMMON_SYSTEM,
        'prompt': """Generate the ISC Class 12 CHEMISTRY solver and question generator.

CISCE ISC Class 12 Chemistry topics (104 nodes):
1. Solid State: crystal lattice, unit cell, packing efficiency, defects, properties
2. Solutions: concentration, Raoult's law, colligative properties (relative lowering of VP, elevation of BP, depression of FP, osmotic pressure), van't Hoff factor
3. Electrochemistry: electrochemical cells, electrode potential, Nernst equation, Gibbs energy, conductance, electrolysis, batteries, fuel cells, corrosion
4. Chemical Kinetics: rate of reaction, rate law, order, molecularity, integrated rate equations (zero, first order), half-life, Arrhenius equation, activation energy
5. Surface Chemistry: adsorption (physisorption, chemisorption), catalysis, colloids, emulsions
6. Isolation of Elements: metallurgy principles, extraction methods, refining
7. p-Block Elements: Group 15, 16, 17, 18 — properties, compounds (NH3, HNO3, PCl3/PCl5, SO2, H2SO4, etc.)
8. d and f-Block Elements: transition metals, lanthanoids, actinoids
9. Coordination Compounds: Werner's theory, IUPAC nomenclature, isomerism, bonding (CFT, VBT), stability, importance
10. Haloalkanes and Haloarenes: preparation, properties, SN1/SN2 mechanisms, reactivity
11. Alcohols, Phenols, Ethers: preparation, properties, reactions
12. Aldehydes, Ketones, Carboxylic Acids: preparation, properties, reactions, mechanisms
13. Amines: preparation, properties, reactions, basicity
14. Biomolecules: carbohydrates, proteins, nucleic acids, vitamins, hormones

Use chempy for stoichiometry, reactions, molar mass, gas laws, equilibrium.
Use mendeleev for periodic table data (atomic masses, electronegativity, electron config).
Use rdkit for organic chemistry — SMILES parsing, functional groups, reaction prediction, isomerism.
Use SymPy for Nernst equation, Arrhenius equation, equilibrium constants (symbolic).
Use scipy for kinetics (integrated rate equations, half-life calculations).

Generate these files:
FILE 1: solver_chem_c12.py
FILE 2: step_types_chem_c12.yaml
FILE 3: problem_types_chem_c12.yaml
FILE 4: question_gen_chem_c12.py
FILE 5: node_mapping_chem_c12.yaml

Each chemistry solver must:
- Show the REACTION or FORMULA first
- Balance equations (use chempy.balance_stoichiometry)
- Substitute values WITH UNITS
- Compute result
- Verify (back-substitution, mass balance, charge balance)
- 50% competency: Indian context (Tata Steel metallurgy, Indian pharmaceutical industry, Ganga pollution, etc.)
- 50% standard: direct formula/reaction application""",
    },
    # Task 7: Chemistry C11
    {
        'name': 'Chemistry C11 Solver',
        'model': MODEL_CRITICAL,
        'system': COMMON_SYSTEM,
        'prompt': """Generate the ISC Class 11 CHEMISTRY solver and question generator.

CISCE ISC Class 11 Chemistry topics (92 nodes):
1. Basic Concepts: matter, properties, laws of chemical combination, Dalton's atomic theory, mole concept, molar mass, empirical/molecular formula, stoichiometry
2. Atomic Structure: subatomic particles, Rutherford/Bohr models, quantum mechanical model, quantum numbers, orbital's, Aufbau principle, Hund's rule, Pauli exclusion, electronic configuration
3. Classification of Elements: modern periodic table, periodicity, atomic/ionic radii, ionization enthalpy, electron gain enthalpy, electronegativity
4. Chemical Bonding: Lewis structures, VSEPR, valence bond theory, hybridization (sp, sp2, sp3, sp3d, sp3d2), molecular orbital theory, bond parameters, hydrogen bonding
5. Thermodynamics: systems, state functions, internal energy, enthalpy, Hess's law, bond enthalpy, entropy, Gibbs energy, spontaneity
6. Equilibrium: homogeneous/heterogeneous equilibrium, Le Chatelier's principle, Kc/Kp, relationship between Kp and Kc, ionic equilibrium, acids/bases (Arrhenius, Bronsted-Lowry, Lewis), pH, buffer solutions, hydrolysis, solubility product
7. Redox Reactions: oxidation number, balancing redox (ion-electron method), redox titrations
8. Hydrogen: position in periodic table, isotopes, preparation, properties, hydrides, water (hardness, softening), hydrogen peroxide
9. s-Block Elements: Group 1 (alkali metals), Group 2 (alkaline earth metals) — properties, compounds (NaOH, Na2CO3, NaHCO3, CaO, CaCO3, gypsum, plaster of Paris)
10. Some p-Block Elements: Group 13 (boron family), Group 14 (carbon family) — properties, compounds (borax, boric acid, diborane, carbon monoxide, carbon dioxide, silicones, silicates)
11. Organic Chemistry Basics: GWC, tetravalence, catenation, hybridization, shapes, IUPAC nomenclature, isomerism (structural, stereo), fundamental concepts in organic reaction mechanism (homolytic/heterolytic fission, electrophiles/nucleophiles, carbocations, carbanions, free radicals)
12. Hydrocarbons: alkanes (preparation, properties), alkenes (preparation, properties, Markovnikov's rule), alkynes (preparation, properties), aromatic hydrocarbons (benzene, resonance, electrophilic substitution)

Use chempy, mendeleev, rdkit, SymPy, scipy.

Generate these files:
FILE 1: solver_chem_c11.py
FILE 2: step_types_chem_c11.yaml
FILE 3: problem_types_chem_c11.yaml
FILE 4: question_gen_chem_c11.py
FILE 5: node_mapping_chem_c11.yaml

Same requirements: 50% competency, 50% standard, Indian context, verification, maximum coverage.""",
    },
    # Task 8: Biology C11-12
    {
        'name': 'Biology C11-12 Solver',
        'model': MODEL_CRITICAL,
        'system': COMMON_SYSTEM,
        'prompt': """Generate the ISC Class 11-12 BIOLOGY solver and question generator.

CISCE ISC Class 12 Biology topics (71 nodes):
1. Reproduction in Flowering Plants: microsporogenesis, megasporogenesis, pollination, fertilization, seed development, fruit formation, apomixis, polyembryony
2. Human Reproduction: male/female reproductive systems, gametogenesis, menstrual cycle, fertilization, implantation, pregnancy, parturition, lactation
3. Reproductive Health: contraception, STDs, infertility, ART (IVF, ZIFT, GIFT)
4. Genetics and Inheritance: Mendel's laws, incomplete dominance, codominance, multiple alleles, linkage, crossing over, sex determination, chromosomal disorders, gene disorders, pedigree analysis
5. Molecular Basis of Inheritance: DNA structure, replication, transcription, translation, genetic code, regulation (lac operon), human genome project, DNA fingerprinting
6. Evolution: origin of life, theories of evolution, evidence, Hardy-Weinberg principle, adaptive radiation
7. Human Health and Disease: pathogens, parasites, innate/adaptive immunity, AIDS, cancer, drug/alcohol abuse
8. Biotechnology: principles, tools (restriction enzymes, vectors, host), processes, applications, biotech in agriculture, biotech in medicine
9. Ecology: organisms and environment, population, ecosystem, biodiversity, conservation

CISCE ISC Class 11 Biology topics (70 nodes):
1. Diversity of Living Organisms: taxonomy, five kingdom classification, Monera, Protista, Fungi, Plantae, Animalia
2. Plant Physiology: photosynthesis, respiration, plant growth and development, phytohormones
3. Human Physiology: digestion, breathing, body fluids, excretion, locomotion, neural control, chemical coordination

Use biopython for DNA/RNA/protein sequences (transcription, translation, GC content).
Use scipy.stats for genetics probability (Punnett squares, Hardy-Weinberg, chi-square).
Use SymPy for population genetics equations (allele frequencies, fitness).
Use custom classification keys for taxonomy (deterministic decision trees).

Generate these files:
FILE 1: solver_bio_c12.py
FILE 2: step_types_bio_c12.yaml
FILE 3: problem_types_bio_c12.yaml
FILE 4: question_gen_bio_c12.py
FILE 5: node_mapping_bio_c12.yaml
FILE 6: solver_bio_c11.py
FILE 7: step_types_bio_c11.yaml
FILE 8: problem_types_bio_c11.yaml
FILE 9: question_gen_bio_c11.py
FILE 10: node_mapping_bio_c11.yaml

Biology solvers handle:
- Genetics crosses: show Punnett square, compute phenotypic/genotypic ratios
- DNA/RNA: transcription, translation, complementary strands
- Hardy-Weinberg: allele frequency calculations
- Photosynthesis/Respiration: equation balancing, ATP yield calculations
- Ecology: population growth models, energy flow calculations
- Taxonomy: classification decision trees
50% competency, 50% standard, Indian context (Indian crops, diseases, biodiversity).""",
    },
    # Task 9: Accountancy + Economics C11-12
    {
        'name': 'Accountancy + Economics C11-12 Solver',
        'model': MODEL_CRITICAL,
        'system': COMMON_SYSTEM,
        'prompt': """Generate ISC Class 11-12 ACCOUNTANCY and ECONOMICS solvers and question generators.

CISCE ISC Class 12 Accountancy topics (77 nodes):
1. Partnership: fundamentals, admission, retirement, death, dissolution
2. Company Accounts: issue of shares, issue of debentures, forfeiture, reissue
3. Financial Statements: trading, P&L, balance sheet (with adjustments)
4. Cash Flow Statement: operating, investing, financing activities
5. Ratio Analysis: liquidity, solvency, activity, profitability ratios
6. Computerized Accounting: spreadsheet concepts

CISCE ISC Class 11 Accountancy topics (74 nodes):
1. Introduction to Accounting: meaning, objectives, users, branches
2. Theory Base of Accounting: GAAP, conventions, IFRS
3. Recording of Transactions: journal, ledger, cash book, petty cash book
4. Trial Balance and Rectification: errors, suspense account
5. Depreciation: SLM, WDV, provision for depreciation
6. Bank Reconciliation Statement: causes of differences
7. Final Accounts: trading, P&L, balance sheet (sole proprietorship)
8. Bills of Exchange: promissory notes, accommodation bills

CISCE ISC Class 12 Economics topics (91 nodes):
1. Microeconomics: demand, supply, market equilibrium, consumer behavior (utility, indifference curves), production, cost, revenue, market forms (perfect competition, monopoly, monopolistic competition, oligopoly)
2. Macroeconomics: national income (GDP, GNP, NNP), aggregate demand/supply, consumption function, investment multiplier, government budget, balance of payments, foreign exchange

CISCE ISC Class 11 Economics topics (61 nodes):
1. Statistics: collection, organization, presentation of data, measures of central tendency, measures of dispersion, correlation, index numbers
2. Introduction to Economics: scarcity, choice, opportunity cost
3. Demand and Supply: law of demand, elasticity, law of supply

Use Python `decimal` module for ALL financial calculations (no floating point errors).
Use pandas for tabular data (trial balance, P&L, balance sheet, cash flow).
Use statsmodels for regression, correlation, demand estimation.
Use SymPy for symbolic economics (supply/demand curves, equilibrium, multiplier).
Use matplotlib for graphs (demand curves, supply curves, indifference curves, PPF).

Generate these files:
FILE 1: solver_acc_c12.py
FILE 2: step_types_acc_c12.yaml
FILE 3: problem_types_acc_c12.yaml
FILE 4: question_gen_acc_c12.py
FILE 5: node_mapping_acc_c12.yaml
FILE 6: solver_acc_c11.py
FILE 7: step_types_acc_c11.yaml
FILE 8: problem_types_acc_c11.yaml
FILE 9: question_gen_acc_c11.py
FILE 10: node_mapping_acc_c11.yaml
FILE 11: solver_econ_c12.py
FILE 12: step_types_econ_c12.yaml
FILE 13: problem_types_econ_c12.yaml
FILE 14: question_gen_econ_c12.py
FILE 15: node_mapping_econ_c12.yaml
FILE 16: solver_econ_c11.py
FILE 17: step_types_econ_c11.yaml
FILE 18: problem_types_econ_c11.yaml
FILE 19: question_gen_econ_c11.py
FILE 20: node_mapping_econ_c11.yaml

Accountancy solvers must use decimal arithmetic for money (NEVER float).
Economics solvers must show graphs (demand/supply curves, equilibrium).
50% competency, 50% standard, Indian context (Tata Motors, Reliance, RBI policy, Indian GDP).""",
    },
    # Task 10: Applied Maths + CS C11-12
    {
        'name': 'Applied Maths + CS C11-12 Solver',
        'model': MODEL_CRITICAL,
        'system': COMMON_SYSTEM,
        'prompt': """Generate ISC Class 11-12 APPLIED MATHEMATICS and COMPUTER SCIENCE solvers and question generators.

CISCE ISC Class 12 Applied Maths topics (68 nodes):
1. Numbers, Quantification, Numerical Applications: prime numbers, moduli, ratios, percentages, averages
2. Algebra: matrices, determinants, solving linear systems
3. Calculus: differentiation, integration, applications (rate of change, maxima/minima, area)
4. Probability: distributions, Bayes' theorem
5. Linear Programming: formulation, graphical method
6. Financial Mathematics: perpetuity, annuity, sinking fund, EMI, loan amortization, depreciation
7. Statistics: measures of dispersion, correlation, regression
8. Index Numbers and Time Series: price index, time series analysis

CISCE ISC Class 11 Applied Maths topics (74 nodes):
1. Numbers: number systems, arithmetic, percentage, profit/loss
2. Algebra: sets, relations, functions, sequences, series
3. Calculus: limits, derivatives (basic)
4. Statistics: data collection, presentation, central tendency
5. Probability: basic probability

CISCE ISC Class 12 Computer Science topics (85 nodes):
1. Boolean Algebra: consensus theorem, absorption, De Morgan's, Karnaugh maps, Quine-McCluskey
2. Logic Gates and Circuits: adders, subtractors, multiplexers, decoders
3. Computer Hardware: CPU, memory, I/O devices
4. Data Structures: arrays, stacks, queues, linked lists, trees, graphs
5. Algorithms: searching, sorting, recursion, complexity analysis
6. Object Oriented Programming: classes, objects, inheritance, polymorphism, encapsulation
7. Database Concepts: relational model, SQL, normalization

CISCE ISC Class 11 Computer Science topics (85 nodes):
1. Computer Architecture: von Neumann model, CPU, memory hierarchy, buses
2. Number Systems: binary, octal, hexadecimal, conversions, arithmetic
3. Boolean Algebra: basic operations, truth tables, De Morgan's laws
4. Logic Gates: AND, OR, NOT, NAND, NOR, XOR, XNOR
5. Programming in Java: basics, data types, operators, control structures, arrays, strings, methods
6. Data Structures: arrays (1D, 2D), strings

Use SymPy for applied maths (same as maths solver).
Use scipy.optimize.linprog for LPP.
Use Python decimal for financial math (EMI, annuity, depreciation).
Use pandas for statistics and time series.
Use SymPy.logic for Boolean algebra minimization.
Use subprocess to run Java code in sandbox for CS problems.

Generate these files:
FILE 1: solver_appmath_c12.py
FILE 2: step_types_appmath_c12.yaml
FILE 3: problem_types_appmath_c12.yaml
FILE 4: question_gen_appmath_c12.py
FILE 5: node_mapping_appmath_c12.yaml
FILE 6: solver_appmath_c11.py
FILE 7: step_types_appmath_c11.yaml
FILE 8: problem_types_appmath_c11.yaml
FILE 9: question_gen_appmath_c11.py
FILE 10: node_mapping_appmath_c11.yaml
FILE 11: solver_cs_c12.py
FILE 12: step_types_cs_c12.yaml
FILE 13: problem_types_cs_c12.yaml
FILE 14: question_gen_cs_c12.py
FILE 15: node_mapping_cs_c12.yaml
FILE 16: solver_cs_c11.py
FILE 17: step_types_cs_c11.yaml
FILE 18: problem_types_cs_c11.yaml
FILE 19: question_gen_cs_c11.py
FILE 20: node_mapping_cs_c11.yaml

Applied Maths: 50% competency (Indian financial context: home loans, mutual funds, GST), 50% standard.
CS: 50% competency (Indian IT industry context: TCS, Infosys scenarios), 50% standard.
Financial math must use decimal arithmetic (NEVER float for money).""",
    },
]

# ============================================================
# PARALLEL EXECUTION (all 10 API calls at once)
# ============================================================

import threading
from concurrent.futures import ThreadPoolExecutor, as_completed

def process_task(task, idx, total):
    """Process a single task — call Claude and save files."""
    name = task['name']
    model = task.get('model', MODEL_CRITICAL)
    tag = '[%d/%d] %s' % (idx, total, name)
    print('%s STARTING [model=%s]' % (tag, model), flush=True)

    response = call_claude(task['prompt'], task['system'], model=model)
    if not response:
        print('%s FAILED - no response' % tag, flush=True)
        return tag, False, []

    print('%s GOT RESPONSE (%d chars)' % (tag, len(response)), flush=True)

    files = extract_files(response)
    if not files:
        print('%s WARNING: No files delimited, saving raw' % tag, flush=True)
        raw_file = OUTPUT_DIR / ('%s_raw.txt' % name.lower().replace(' ', '_').replace('+', 'and'))
        raw_file.write_text(response, encoding='utf-8')
        return tag, True, [(raw_file.name, raw_file.stat().st_size)]

    saved = save_files(files, OUTPUT_DIR)
    file_list = ', '.join(f.split('/')[-1] for f, s in saved)
    print('%s SAVED %d files: %s' % (tag, len(saved), file_list[:100]), flush=True)
    return tag, True, saved

def main():
    total = len(TASKS)
    print('Generating %d solver packages in PARALLEL via Claude API...' % total, flush=True)
    print('Output directory: %s' % OUTPUT_DIR, flush=True)
    print('All %d API calls launching simultaneously...' % total, flush=True)
    print('', flush=True)

    results = []
    with ThreadPoolExecutor(max_workers=total) as executor:
        futures = {
            executor.submit(process_task, task, i+1, total): task
            for i, task in enumerate(TASKS)
        }
        for future in as_completed(futures):
            tag, success, saved = future.result()
            status = 'OK' if success else 'FAILED'
            print('>>> %s : %s (%d files)' % (tag, status, len(saved)), flush=True)
            results.append((tag, success))

    succeeded = sum(1 for _, s in results if s)
    failed = total - succeeded
    print('', flush=True)
    print('=== COMPLETE: %d succeeded, %d failed ===' % (succeeded, failed), flush=True)

if __name__ == '__main__':
    main()
