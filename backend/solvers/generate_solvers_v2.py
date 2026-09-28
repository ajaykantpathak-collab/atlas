"""
Generate solver files via Claude API — ONE FILE PER CALL.
Runs in parallel batches to avoid OOM. Skips files that already pass syntax check.
"""
import json, time, urllib.request, ssl, os, sys, subprocess
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

import os
API_KEY = os.environ.get('CLAUDE_API_KEY') or os.environ.get('ANTHROPIC_API_KEY')
assert API_KEY, 'set CLAUDE_API_KEY/ANTHROPIC_API_KEY'
API_URL = 'https://api.claudeopus.pro/v1/messages'
MODEL_CRITICAL = 'claude-fable-5'
MODEL_NORMAL = 'claude-opus-5'
MAX_TOKENS = 64000
OUTPUT_DIR = Path(r'D:\platform\backend\solvers')
BATCH_SIZE = 5  # parallel calls at a time

def call_claude(prompt, system_prompt=None, model=MODEL_CRITICAL, max_tokens=MAX_TOKENS):
    body = {'model': model, 'max_tokens': max_tokens,
            'messages': [{'role': 'user', 'content': prompt}]}
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
            print('  Retry %d: %s' % (attempt+1, str(e)[:80]), flush=True)
            time.sleep(5)
    return None

def extract_code(response):
    """Extract Python code from response. Handle === FILE: === delimiters or raw code."""
    if '=== FILE:' in response:
        parts = response.split('=== FILE:')
        for part in parts[1:]:
            if '===' in part:
                rest = part[part.index('===')+3:]
                if '=== END FILE ===' in rest:
                    return rest[:rest.index('=== END FILE ===')].strip()
                return rest.strip()
    # No delimiters — try to extract ```python blocks
    if '```python' in response:
        start = response.index('```python') + 9
        end = response.find('```', start)
        if end == -1:
            return response[start:].strip()  # no closing fence — take rest
        return response[start:end].strip()
    if '```' in response:
        start = response.index('```') + 3
        end = response.find('```', start)
        if end == -1:
            return response[start:].strip()
        return response[start:end].strip()
    return response.strip()

def extract_yaml(response):
    """Extract YAML from response."""
    if '=== FILE:' in response:
        parts = response.split('=== FILE:')
        for part in parts[1:]:
            if '===' in part:
                rest = part[part.index('===')+3:]
                if '=== END FILE ===' in rest:
                    return rest[:rest.index('=== END FILE ===')].strip()
                return rest.strip()
    if '```yaml' in response:
        start = response.index('```yaml') + 7
        end = response.find('```', start)
        if end == -1:
            return response[start:].strip()
        return response[start:end].strip()
    return response.strip()

def syntax_ok(filepath):
    """Check if a Python file passes syntax check."""
    if not filepath.exists():
        return False
    try:
        r = subprocess.run(['python', '-m', 'py_compile', str(filepath)],
                          capture_output=True, timeout=10)
        return r.returncode == 0
    except:
        return False

def save_file(filepath, content):
    filepath.parent.mkdir(parents=True, exist_ok=True)
    filepath.write_text(content, encoding='utf-8')

SYSTEM = """You are a master Python engineer writing deterministic educational solvers for CISCE/ISC curriculum.
RULES:
- NO paid services, NO LLM in computation path, NO API calls.
- Use ONLY: sympy, scipy, numpy, chempy, pint, pandas, decimal, statsmodels, matplotlib, math, re, random, dataclasses, typing.
- Every solver produces STEP-BY-STEP output showing which rule/formula was applied and WHY.
- Every solver includes VERIFICATION (numerical check or back-substitution).
- 10-second timeout with graceful fallback.
- Output ONLY the Python file content, no explanations. Use ```python``` code block."""

SYSTEM_QGEN = """You are a master Python engineer writing DETERMINISTIC question generators for CISCE/ISC curriculum.
RULES:
- NO paid services, NO LLM, NO API calls. Pure Python + sympy randomization only.
- Use random.seed for reproducibility. Generate INFINITE variations via different seeds.
- 50% competency-based (NEP 2020: real-world scenarios, assertion-reasoning, case studies, data interpretation).
- 50% standard problems (direct computation, formula application).
- Indian context: Indian names, places, currency (Rs), scenarios.
- Each question: question_text, marks, difficulty, is_competency, blooms_level, misconception_tags, variables, model_answer, solution_steps, final_answer.
- Import the solver and CALL IT to compute the answer (don't recompute).
- Output ONLY the Python file content, no explanations. Use ```python``` code block."""

SYSTEM_YAML = """You are a CISCE/ISC curriculum expert writing YAML definitions for educational solvers.
Output ONLY the YAML content, no explanations. Use ```yaml``` code block."""

# ============================================================
# FILE TASKS — one per file
# ============================================================

TASKS = []

def add_py(name, filename, prompt, system=SYSTEM):
    TASKS.append({'name': name, 'filename': filename, 'type': 'py',
                  'prompt': prompt, 'system': system, 'model': MODEL_CRITICAL})

def add_qgen(name, filename, prompt):
    TASKS.append({'name': name, 'filename': filename, 'type': 'py',
                  'prompt': prompt, 'system': SYSTEM_QGEN, 'model': MODEL_CRITICAL})

def add_yaml(name, filename, prompt):
    TASKS.append({'name': name, 'filename': filename, 'type': 'yaml',
                  'prompt': prompt, 'system': SYSTEM_YAML, 'model': MODEL_NORMAL})

# --- BROKEN Python files to regenerate ---
add_py('core_calculus_engine', 'core_calculus_engine/core_calculus_engine.py',
"""Generate the COMPLETE core_calculus_engine.py — a hybrid calculus engine for ISC Class 11-12.

Operations: differentiate, integrate, limit, solve_ode, taylor_series, critical_points,
max_min_check, tangent_line, increasing_decreasing, area_under_curve, area_between_curves.

Backend cascade: SymEngine (fast) -> SymPy -> Giac (subprocess) -> scipy numerical -> graceful fallback.
Each operation: 10s timeout, step-by-step pedagogical output, 100-point numerical verification.
Dataclasses: SolverStep (step_number, rule_applied, rule_formula, input_expr, output_expr, explanation, hint),
SolverResult (success, operation, answer, exact_answer, steps, verified, verification_detail, error, backend_used).
Import derivative_tables and integral_tables from the same package directory.

The file must be COMPLETE and self-contained. Do not truncate. If running low on space,
prioritize completing differentiate, integrate, limit, critical_points, max_min_check, area_under_curve.""")

add_py('solver_maths_c12', 'solver_maths_c12.py',
"""Generate solver_maths_c12.py — ISC Class 12 Mathematics solver.

Functions needed (one per problem type):
- check_relation_type(S, R) -> reflexive/symmetric/transitive check
- check_function_type(expr, domain) -> one-one/onto check
- composite_function(f, g), inverse_function(f)
- matrix_operations(A, B, op), determinant(A), matrix_inverse(A)
- solve_linear_cramers(aug_matrix)
- solve_continuity(expr, point), solve_differentiation(expr, var, order)
- solve_rolles_theorem(f, a, b), solve_lagrange_mvt(f, a, b)
- solve_maxima_minima(func, interval)
- solve_indefinite_integral(expr), solve_definite_integral(expr, a, b)
- solve_area_under_curve(f, a, b), solve_area_between_curves(f1, f2, a, b)
- solve_de_variable_separable, solve_de_homogeneous, solve_de_linear
- solve_vector_dot_product, solve_vector_cross_product, solve_vector_scalar_triple
- solve_direction_cosines, solve_line_in_space, solve_plane_equation, solve_distance_point_to_plane
- solve_conditional_probability, solve_bayes_theorem, solve_binomial_distribution
- solve_lpp(objective, constraints, sense)

Use SymPy for everything. Import core_calculus_engine for calculus ops.
Each function returns SolverResult with steps showing the rule applied.
Include a SOLVER_REGISTRY dict mapping problem_type_id -> function.
File must be COMPLETE. Do not truncate.""")

add_py('solver_maths_c11', 'solver_maths_c11.py',
"""Generate solver_maths_c11.py — ISC Class 11 Mathematics solver.

Functions: set_operations, relation_properties, function_domain_range,
trig_identity_verify, trig_equation_solve, inverse_trig_evaluate,
complex_modulus, complex_argument, complex_polar, quadratic_solve,
quadratic_nature, permutation, combination, binomial_expansion, binomial_coefficient,
ap_nth_term, ap_sum, gp_nth_term, gp_sum, gp_infinite_sum,
line_equation, line_distance, line_slope, circle_equation, parabola_vertex,
limit_evaluate, derivative_basic, derivative_at_point,
mean, median, mode, standard_deviation, variance, probability_basic.

Use SymPy. Import core_calculus_engine for limits/derivatives.
Each function returns SolverResult with steps. Include SOLVER_REGISTRY dict.
File must be COMPLETE. Do not truncate.""")

add_py('solver_physics_c12', 'solver_physics_c12.py',
"""Generate solver_physics_c12.py — ISC Class 12 Physics solver.

Classes: ElectrostaticsSolver, CurrentElectricitySolver, MagnetismSolver,
EMISolver, ACCircuitsSolver, RayOpticsSolver, WaveOpticsSolver, ModernPhysicsSolver.

Use scipy.constants (no hardcoded values), pint for units, scipy.integrate.solve_ivp for transients.
Each function: show formula -> substitute with units -> compute -> verify dimensions.
StepBuilder fluent API: .law().formula().sub().comp().unit().verify().conclusion().
File must be COMPLETE. If running low on space, complete the classes you start rather than starting all.""")

add_py('solver_chem_c11', 'solver_chem_c11.py',
"""Generate solver_chem_c11.py — ISC Class 11 Chemistry solver.

Functions: molar_mass, mole_concept, empirical_formula, balance_equation,
stoichiometry_calc, electron_config, quantum_numbers, periodic_trend,
lewis_structure, hybridization, bond_angle, thermo_calc, hess_law,
equilibrium_kc, equilibrium_kp, ph_calc, buffer_ph, nernst_simple,
redox_balance, isotope_calc, gas_law, ideal_gas, real_gas.

Use chempy, mendeleev, SymPy. Each function returns SolverResult with steps.
Include SOLVER_REGISTRY. File must be COMPLETE. Do not truncate.""")

add_py('solver_chem_c12', 'solver_chem_c12.py',
"""Generate solver_chem_c12.py — ISC Class 12 Chemistry solver.

Functions: unit_cell_calc, packing_efficiency, density_calc,
molarity, molality, mole_fraction, raoults_law, colligative_props,
vant_hoff_factor, electrode_potential, nernst_eq, gibbs_free_energy,
conductance, electrolysis, rate_law, integrated_rate, half_life, arrhenius,
adsorption, colloid, metallurgy, p_block_props, d_block_props,
coordination_naming, coordination_isomerism, crystal_field,
sn1_sn2, organic_reactions, amine_basicity, biomolecule_id.

Use chempy, mendeleev, rdkit, SymPy. Each function returns SolverResult with steps.
Include SOLVER_REGISTRY. File must be COMPLETE. Do not truncate.""")

add_py('solver_bio_c12', 'solver_bio_c12.py',
"""Generate solver_bio_c12.py — ISC Class 12 Biology solver.

Functions: punnett_square, monohybrid_cross, dihybrid_cross,
incomplete_dominance, codominance, sex_determination,
pedigree_analysis, hardy_weinberg, dna_transcription, dna_translation,
gc_content, complementary_strand, lac_operon, population_growth,
energy_flow, biodiversity_index, photosynthesis_eq, respiration_eq.

Use biopython for sequences, scipy.stats for genetics probability.
Each function returns SolverResult with steps. Include SOLVER_REGISTRY.
File must be COMPLETE. Do not truncate.""")

add_py('solver_appmath_c12', 'solver_appmath_c12.py',
"""Generate solver_appmath_c12.py — ISC Class 12 Applied Maths solver.

Functions: percentage_calc, ratio_proportion, matrix_ops, determinant_calc,
differentiate, integrate, rate_of_change, max_min_application,
probability_dist, bayes_calc, lpp_graphical, lpp_formulate,
perpetuity, annuity, sinking_fund, emi_calc, loan_amortization,
depreciation_calc, mean, median, mode, std_dev, correlation, regression,
price_index, time_series_trend.

Use SymPy, decimal (for money), pandas, scipy.stats.
Import core_calculus_engine for calculus. Each function returns SolverResult.
Include SOLVER_REGISTRY. File must be COMPLETE. Use ASCII minus (-) not unicode.""")

# --- MISSING solver files ---
add_py('solver_bio_c11', 'solver_bio_c11.py',
"""Generate solver_bio_c11.py — ISC Class 11 Biology solver.

Functions: taxonomy_classify, kingdom_identify, monera_props, protista_props,
fungi_props, plantae_identify, animalia_identify,
photosynthesis_rate, respiration_rate, plant_hormone_effect,
digestion_enzyme, breathing_rate, blood_composition, excretion_rate,
neuron_function, hormone_effect.

Use biopython, scipy.stats. Each function returns SolverResult with steps.
Include SOLVER_REGISTRY. File must be COMPLETE. Do not truncate.""")

add_py('solver_econ_c11', 'solver_econ_c11.py',
"""Generate solver_econ_c11.py — ISC Class 11 Economics solver.

Functions: data_collection, frequency_dist, mean, median, mode,
std_dev, variance, correlation, karl_pearson, spearman_rank,
index_number, cpi, wpi, demand_law, supply_law, elasticity_demand.

Use pandas, statsmodels, SymPy. Each function returns SolverResult with steps.
Include SOLVER_REGISTRY. File must be COMPLETE. Do not truncate.""")

add_py('solver_econ_c12', 'solver_econ_c12.py',
"""Generate solver_econ_c12.py — ISC Class 12 Economics solver.

Functions: gdp_calc, gnp_calc, nnp_calc, national_income,
aggregate_demand, aggregate_supply, consumption_function,
investment_multiplier, govt_budget, fiscal_deficit, balance_of_payments,
forex_rate, demand_eq, supply_eq, market_equilibrium,
indifference_curve, marginal_utility, total_cost, marginal_cost,
total_revenue, marginal_revenue, profit_max, perfect_competition,
monopoly_price.

Use statsmodels, SymPy, matplotlib. Each function returns SolverResult with steps.
Include SOLVER_REGISTRY. File must be COMPLETE. Do not truncate.""")

add_py('solver_appmath_c11', 'solver_appmath_c11.py',
"""Generate solver_appmath_c11.py — ISC Class 11 Applied Maths solver.

Functions: number_system, arithmetic_ops, percentage, profit_loss,
set_operations, relation_props, function_eval, sequence_ap, sequence_gp,
limit_calc, derivative_basic, data_presentation, central_tendency,
basic_probability.

Use SymPy. Import core_calculus_engine for limits/derivatives.
Each function returns SolverResult with steps. Include SOLVER_REGISTRY.
File must be COMPLETE. Do not truncate.""")

add_py('solver_cs_c11', 'solver_cs_c11.py',
"""Generate solver_cs_c11.py — ISC Class 11 Computer Science solver.

Functions: binary_convert, octal_convert, hex_convert, binary_arithmetic,
boolean_simplify, truth_table, logic_gate_output,
java_trace, array_1d_ops, array_2d_ops, string_ops, method_call,
complexity_analysis.

Use SymPy.logic for Boolean algebra. Each function returns SolverResult with steps.
Include SOLVER_REGISTRY. File must be COMPLETE. Do not truncate.""")

add_py('solver_cs_c12', 'solver_cs_c12.py',
"""Generate solver_cs_c12.py — ISC Class 12 Computer Science solver.

Functions: karnaugh_map, quine_mccluskey, adder_circuit, multiplexer,
decoder_circuit, stack_ops, queue_ops, linked_list_ops, tree_traverse,
graph_bfs, graph_dfs, linear_search, binary_search, bubble_sort,
selection_sort, insertion_sort, merge_sort, quick_sort,
complexity_best, complexity_worst, oop_inheritance, polymorphism,
sql_query, normalization_check.

Use SymPy.logic for Boolean, subprocess for Java execution sandbox.
Each function returns SolverResult with steps. Include SOLVER_REGISTRY.
File must be COMPLETE. Do not truncate.""")

# --- Question generators (all 16) ---
for subj, topics in [
    ('maths_c11', 'Sets, Functions, Trigonometry, Complex Numbers, Quadratic Equations, Permutations, Combinations, Binomial Theorem, Sequences (AP/GP), Coordinate Geometry, Limits, Derivatives, Statistics, Probability'),
    ('maths_c12', 'Relations, Functions, Matrices, Determinants, Calculus (continuity, differentiation, integration, differential equations), Vectors, 3D Geometry, Probability, LPP'),
    ('physics_c11', 'Units, Kinematics, Laws of Motion, Work/Energy/Power, Rotational Motion, Gravitation, Elasticity, Fluid Mechanics, Thermodynamics, Kinetic Theory, Oscillations, Waves'),
    ('physics_c12', 'Electrostatics, Current Electricity, Magnetism, EMI, AC Circuits, Ray Optics, Wave Optics, Modern Physics'),
    ('chem_c11', 'Basic Concepts, Atomic Structure, Periodic Table, Chemical Bonding, Thermodynamics, Equilibrium, Redox, Hydrogen, s-Block, p-Block, Organic Basics, Hydrocarbons'),
    ('chem_c12', 'Solid State, Solutions, Electrochemistry, Chemical Kinetics, Surface Chemistry, Metallurgy, p-Block, d-Block, Coordination Compounds, Haloalkanes, Alcohols, Aldehydes, Amines, Biomolecules'),
    ('bio_c11', 'Taxonomy, Plant Physiology, Human Physiology (digestion, breathing, circulation, excretion, nervous, endocrine)'),
    ('bio_c12', 'Reproduction, Genetics, Molecular Biology, Evolution, Health, Biotechnology, Ecology'),
    ('acc_c11', 'Introduction to Accounting, Theory Base, Journal, Ledger, Trial Balance, Depreciation, BRS, Final Accounts, Bills of Exchange'),
    ('acc_c12', 'Partnership, Company Accounts, Financial Statements, Cash Flow, Ratio Analysis'),
    ('econ_c11', 'Statistics (data, central tendency, dispersion, correlation, index numbers), Demand, Supply'),
    ('econ_c12', 'Microeconomics (demand, supply, equilibrium, consumer behavior, production, cost, market forms), Macroeconomics (national income, AD-AS, multiplier, budget, BoP, forex)'),
    ('appmath_c11', 'Numbers, Algebra, Calculus basics, Statistics, Probability'),
    ('appmath_c12', 'Algebra, Calculus, Probability, LPP, Financial Mathematics, Statistics, Time Series'),
    ('cs_c11', 'Computer Architecture, Number Systems, Boolean Algebra, Logic Gates, Java Programming, Arrays, Strings'),
    ('cs_c12', 'Boolean Algebra, Logic Circuits, Data Structures, Algorithms, OOP, Database, SQL'),
]:
    add_qgen('question_gen_%s' % subj, 'question_gen_%s.py' % subj,
"""Generate question_gen_%s.py — DETERMINISTIC question generator for ISC %s.

Topics: %s

Requirements:
- Import the solver: from solver_%s import SOLVER_REGISTRY, SolverResult, Step
- Class GeneratedQuestion with: question_id, node_id, problem_type_id, topic, question_text, marks, difficulty, is_competency, blooms_level, misconception_tags, variables, model_answer, solution_steps, final_answer, seed
- Class VarGen with seeded random (int, float, choice, sample)
- Lists: INDIAN_NAMES (20), INDIAN_PLACES (20), INDIAN_CONTEXTS (festivals, railways, sports, food)
- Function gen_<topic>_problem(vg, competency=False) for EACH topic above
- Function generate_batch(seed, n=20) that produces n questions (50%% competency, 50%% standard)
- Each gen_ function: pick random variables -> call solver to get answer -> package question+answer+steps
- 50%% competency: Indian real-world scenarios (cricket stats, railway distances, factory profit, ISRO, Tata, Reliance, GST, RBI, etc.)
- 50%% standard: direct computation
- Marks: 1, 2, 3, 4, 5, 6 per ISC pattern
- Misconception tags per question
- Bloom's level tagging

File must be COMPLETE. Do not truncate. Output ONLY Python code.""" % (subj, subj.replace('_', ' ').upper(), topics, subj))

# --- Missing YAML files ---
for subj, topics in [
    ('physics_c11', 'Units, Kinematics, Laws of Motion, Work/Energy, Rotational Motion, Gravitation, Elasticity, Fluids, Thermodynamics, Kinetic Theory, Oscillations, Waves'),
    ('physics_c12', 'Electrostatics, Current Electricity, Magnetism, EMI, AC Circuits, Ray Optics, Wave Optics, Modern Physics'),
    ('chem_c12', 'Solid State, Solutions, Electrochemistry, Kinetics, Surface Chemistry, Metallurgy, p-Block, d-Block, Coordination, Haloalkanes, Alcohols, Aldehydes, Amines, Biomolecules'),
    ('econ_c11', 'Statistics, Demand, Supply'),
    ('econ_c12', 'Microeconomics, Macroeconomics'),
    ('appmath_c11', 'Numbers, Algebra, Calculus, Statistics, Probability'),
    ('cs_c11', 'Architecture, Number Systems, Boolean, Logic Gates, Java, Arrays, Strings'),
    ('cs_c12', 'Boolean, Circuits, Data Structures, Algorithms, OOP, Database, SQL'),
]:
    add_yaml('step_types_%s' % subj, 'step_types_%s.yaml' % subj,
"""Generate step_types_%s.yaml — input form definitions for ISC %s Physics/Chemistry/etc.

Topics: %s

For each problem type, define: title, category, fields (name, label, type, placeholder, help_text).
Output ONLY YAML.""" % (subj, subj, topics))

    add_yaml('problem_types_%s' % subj, 'problem_types_%s.yaml' % subj,
"""Generate problem_types_%s.yaml — multi-step problem chains for ISC %s.

Topics: %s

For each problem type: id, title, steps (list of step_type ids), marks, difficulty, thinking_question (with options and correct answer).
Output ONLY YAML.""" % (subj, subj, topics))

    add_yaml('node_mapping_%s' % subj, 'node_mapping_%s.yaml' % subj,
"""Generate node_mapping_%s.yaml — maps CISCE node IDs to problem types for ISC %s.

Topics: %s

Format: node_id -> list of problem_type_ids. Output ONLY YAML.""" % (subj, subj, topics))

# Also missing: problem_types_acc_c11, node_mapping_acc_c11
add_yaml('problem_types_acc_c11', 'problem_types_acc_c11.yaml',
"""Generate problem_types_acc_c11.yaml — multi-step problem chains for ISC Class 11 Accountancy.
Topics: Introduction, Theory Base, Journal, Ledger, Trial Balance, Depreciation, BRS, Final Accounts, Bills of Exchange.
For each: id, title, steps, marks, difficulty, thinking_question. Output ONLY YAML.""")

add_yaml('node_mapping_acc_c11', 'node_mapping_acc_c11.yaml',
"""Generate node_mapping_acc_c11.yaml — maps CISCE node IDs (c11_acc_001 through c11_acc_074) to problem types.
Output ONLY YAML.""")

# ============================================================
# RUN
# ============================================================

def process_task(task):
    name = task['name']
    filepath = OUTPUT_DIR / task['filename']
    # Skip if already OK (for .py files)
    if task['type'] == 'py' and syntax_ok(filepath):
        return name, 'SKIP', 'already passes syntax check'
    print('[START] %s [model=%s]' % (name, task['model']), flush=True)
    try:
        response = call_claude(task['prompt'], task['system'], model=task['model'])
        if not response:
            return name, 'FAIL', 'no response'
        if task['type'] == 'py':
            code = extract_code(response)
            save_file(filepath, code)
            if syntax_ok(filepath):
                lines = len(code.split('\n'))
                return name, 'OK', '%d lines' % lines
            else:
                return name, 'SYNTAX_FAIL', 'generated but syntax error'
        else:
            yaml_content = extract_yaml(response)
            save_file(filepath, yaml_content)
            lines = len(yaml_content.split('\n'))
            return name, 'OK', '%d lines' % lines
    except Exception as e:
        return name, 'ERROR', str(e)[:100]

def main():
    # Filter out tasks for files that already pass
    pending = []
    skipped = 0
    for t in TASKS:
        fp = OUTPUT_DIR / t['filename']
        if t['type'] == 'py' and syntax_ok(fp):
            skipped += 1
        else:
            pending.append(t)

    total = len(pending)
    print('Total tasks: %d (skipped %d already OK)' % (total, skipped), flush=True)
    print('Running in batches of %d parallel calls...' % BATCH_SIZE, flush=True)
    print('', flush=True)

    results = []
    for i in range(0, total, BATCH_SIZE):
        batch = pending[i:i+BATCH_SIZE]
        batch_num = i // BATCH_SIZE + 1
        total_batches = (total + BATCH_SIZE - 1) // BATCH_SIZE
        print('=== BATCH %d/%d (%d tasks) ===' % (batch_num, total_batches, len(batch)), flush=True)

        with ThreadPoolExecutor(max_workers=BATCH_SIZE) as executor:
            futures = {executor.submit(process_task, t): t for t in batch}
            for future in as_completed(futures):
                name, status, detail = future.result()
                print('[%s] %s: %s' % (status, name, detail), flush=True)
                results.append((name, status, detail))
        print('', flush=True)

    ok = sum(1 for _, s, _ in results if s == 'OK')
    fail = sum(1 for _, s, _ in results if s in ('FAIL', 'SYNTAX_FAIL'))
    skip = sum(1 for _, s, _ in results if s == 'SKIP')
    print('=== COMPLETE: %d OK, %d FAIL, %d SKIP ===' % (ok, fail, skip), flush=True)

    # List failures
    if fail:
        print('', flush=True)
        print('FAILURES:', flush=True)
        for name, status, detail in results:
            if status in ('FAIL', 'SYNTAX_FAIL'):
                print('  %s: %s' % (name, detail), flush=True)

if __name__ == '__main__':
    main()
