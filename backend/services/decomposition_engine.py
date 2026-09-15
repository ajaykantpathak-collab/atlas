"""
Decomposition Engine for JEE/NEET Problems
Breaks complex problems into atomic sub-problems with dependency ordering.
"""

from dataclasses import dataclass, field
from typing import Any


@dataclass
class SubProblem:
    sub_problem_id: str
    description: str
    concept: str
    strategy: str
    inputs: dict[str, Any] = field(default_factory=dict)
    output_symbol: str = ""
    dependencies: list[str] = field(default_factory=list)
    solver_type: str = "generic"


@dataclass
class DecompositionPlan:
    sub_problems: list[SubProblem] = field(default_factory=list)
    execution_order: list[str] = field(default_factory=list)
    synthesis_steps: list[str] = field(default_factory=list)
    estimated_difficulty: str = "medium"


class DecompositionEngine:

    # Concept → decomposition template
    RULES: dict[str, list[dict]] = {
        "mechanics": [
            {"id": "identify_forces",   "desc": "Identify all forces acting on the body",
             "strategy": "free_body_diagram",          "solver": "physics_formula"},
            {"id": "resolve_components", "desc": "Resolve forces into components along the plane",
             "strategy": "vector_resolution",          "solver": "physics_formula",
             "deps": ["identify_forces"]},
            {"id": "apply_newton_law",  "desc": "Apply Newton's second law: F_net = ma",
             "strategy": "newton_second_law",          "solver": "physics_formula",
             "deps": ["resolve_components"]},
            {"id": "solve_acceleration", "desc": "Solve for acceleration",
             "strategy": "algebraic_solve",            "solver": "physics_formula",
             "deps": ["apply_newton_law"]},
        ],
        "kinematics": [
            {"id": "identify_knowns",   "desc": "List known quantities (u, v, a, t, s)",
             "strategy": "kinematic_identification",   "solver": "physics_formula"},
            {"id": "select_equation",   "desc": "Select the right kinematic equation",
             "strategy": "kinematic_equation",         "solver": "physics_formula",
             "deps": ["identify_knowns"]},
            {"id": "solve_unknown",     "desc": "Solve for the unknown quantity",
             "strategy": "algebraic_solve",            "solver": "physics_formula",
             "deps": ["select_equation"]},
        ],
        "energy": [
            {"id": "identify_energy_forms", "desc": "Identify kinetic and potential energy",
             "strategy": "energy_identification",      "solver": "physics_formula"},
            {"id": "apply_conservation", "desc": "Apply conservation of energy",
             "strategy": "energy_conservation",        "solver": "physics_formula",
             "deps": ["identify_energy_forms"]},
            {"id": "solve_unknown",     "desc": "Solve for unknown",
             "strategy": "algebraic_solve",            "solver": "physics_formula",
             "deps": ["apply_conservation"]},
        ],
        "momentum": [
            {"id": "identify_momenta",  "desc": "Identify initial and final momenta",
             "strategy": "momentum_identification",    "solver": "physics_formula"},
            {"id": "apply_conservation", "desc": "Apply conservation of momentum",
             "strategy": "momentum_conservation",      "solver": "physics_formula",
             "deps": ["identify_momenta"]},
            {"id": "solve_unknown",     "desc": "Solve for unknown",
             "strategy": "algebraic_solve",            "solver": "physics_formula",
             "deps": ["apply_conservation"]},
        ],
        "electromagnetism": [
            {"id": "identify_quantities", "desc": "Identify charge, field, velocity, etc.",
             "strategy": "em_identification",          "solver": "physics_formula"},
            {"id": "apply_formula",     "desc": "Apply the appropriate EM formula",
             "strategy": "em_formula",                 "solver": "physics_formula",
             "deps": ["identify_quantities"]},
            {"id": "solve_unknown",     "desc": "Solve for unknown",
             "strategy": "algebraic_solve",            "solver": "physics_formula",
             "deps": ["apply_formula"]},
        ],
        "optics": [
            {"id": "identify_ray_parameters", "desc": "Identify object distance, image distance, focal length",
             "strategy": "ray_identification",        "solver": "physics_formula"},
            {"id": "apply_lens_mirror", "desc": "Apply lens/mirror formula",
             "strategy": "lens_mirror_equation",      "solver": "physics_formula",
             "deps": ["identify_ray_parameters"]},
            {"id": "solve_unknown",     "desc": "Solve for unknown",
             "strategy": "algebraic_solve",            "solver": "physics_formula",
             "deps": ["apply_lens_mirror"]},
        ],
        "thermodynamics": [
            {"id": "identify_state",    "desc": "Identify P, V, T, n values",
             "strategy": "state_identification",       "solver": "physics_formula"},
            {"id": "apply_gas_law",     "desc": "Apply ideal gas law or thermodynamic process equation",
             "strategy": "gas_law",                    "solver": "physics_formula",
             "deps": ["identify_state"]},
            {"id": "solve_unknown",     "desc": "Solve for unknown",
             "strategy": "algebraic_solve",            "solver": "physics_formula",
             "deps": ["apply_gas_law"]},
        ],
        "modern_physics": [
            {"id": "identify_quantities", "desc": "Identify frequency, wavelength, energy",
             "strategy": "quantum_identification",     "solver": "physics_formula"},
            {"id": "apply_formula",     "desc": "Apply E=hf, p=h/lambda, or photoelectric equation",
             "strategy": "quantum_formula",            "solver": "physics_formula",
             "deps": ["identify_quantities"]},
            {"id": "solve_unknown",     "desc": "Solve for unknown",
             "strategy": "algebraic_solve",            "solver": "physics_formula",
             "deps": ["apply_formula"]},
        ],
        "circuit": [
            {"id": "label_currents",   "desc": "Label branch currents",
             "strategy": "labeling",                   "solver": "physics_formula"},
            {"id": "kirchhoff_voltage", "desc": "Apply KVL to independent loops",
             "strategy": "kirchhoff_laws",             "solver": "sympy",
             "deps": ["label_currents"]},
            {"id": "solve_system",      "desc": "Solve simultaneous equations",
             "strategy": "matrix_inversion",           "solver": "sympy",
             "deps": ["kirchhoff_voltage"]},
        ],
        "projectile": [
            {"id": "horizontal_motion", "desc": "Resolve horizontal motion",
             "strategy": "kinematics_1d",              "solver": "physics_formula"},
            {"id": "vertical_motion",   "desc": "Resolve vertical motion",
             "strategy": "kinematics_1d_gravity",      "solver": "physics_formula"},
            {"id": "combine",           "desc": "Combine components for final answer",
             "strategy": "vector_combination",         "solver": "physics_formula",
             "deps": ["horizontal_motion", "vertical_motion"]},
        ],
        "organic_reaction": [
            {"id": "identify_substrate",  "desc": "Identify substrate functional groups",
             "strategy": "functional_group_analysis",  "solver": "claude_reasoning"},
            {"id": "identify_reagent",    "desc": "Classify reagent type",
             "strategy": "reagent_classification",     "solver": "claude_reasoning"},
            {"id": "predict_mechanism",   "desc": "Predict reaction mechanism",
             "strategy": "mechanism_elaboration",      "solver": "claude_reasoning",
             "deps": ["identify_substrate", "identify_reagent"]},
            {"id": "determine_product",   "desc": "Determine final product structure",
             "strategy": "product_elaboration",        "solver": "claude_reasoning",
             "deps": ["predict_mechanism"]},
        ],
        "integration": [
            {"id": "identify_type",      "desc": "Identify integration technique",
             "strategy": "pattern_recognition",        "solver": "sympy"},
            {"id": "apply_technique",    "desc": "Apply the chosen technique",
             "strategy": "calculus_application",       "solver": "sympy",
             "deps": ["identify_type"]},
            {"id": "evaluate",           "desc": "Evaluate definite integral",
             "strategy": "substitution",               "solver": "sympy",
             "deps": ["apply_technique"]},
        ],
        "differentiation": [
            {"id": "identify_function",  "desc": "Identify the function to differentiate",
             "strategy": "function_identification",    "solver": "sympy"},
            {"id": "apply_rule",         "desc": "Apply differentiation rule (power, product, chain, etc.)",
             "strategy": "differentiation_rule",       "solver": "sympy",
             "deps": ["identify_function"]},
            {"id": "simplify_result",    "desc": "Simplify the derivative",
             "strategy": "simplification",             "solver": "sympy",
             "deps": ["apply_rule"]},
        ],
        "equilibrium": [
            {"id": "force_analysis",    "desc": "Analyze and resolve all forces",
             "strategy": "free_body_diagram",         "solver": "physics_formula"},
            {"id": "equilibrium_eq",    "desc": "Apply equilibrium equations (ΣF=0)",
             "strategy": "algebraic_equation",         "solver": "physics_formula",
             "deps": ["force_analysis"]},
            {"id": "equilibrium_solve", "desc": "Solve for unknowns",
             "strategy": "solve_linear",               "solver": "physics_formula",
             "deps": ["equilibrium_eq"]},
        ],
    }

    def decompose(self, parsed_problem: dict, available_strategies: list) -> DecompositionPlan:
        concepts = parsed_problem.get("concepts", [])
        sub_problems = self.identify_sub_problems(parsed_problem)
        order = self.order_sub_problems(sub_problems)
        synthesis = self.plan_synthesis(sub_problems, parsed_problem)
        difficulty = self._estimate_difficulty(parsed_problem, sub_problems)
        return DecompositionPlan(
            sub_problems=sub_problems,
            execution_order=order,
            synthesis_steps=synthesis,
            estimated_difficulty=difficulty,
        )

    def identify_sub_problems(self, problem: dict) -> list[SubProblem]:
        concepts = problem.get("concepts", [])
        # Handle both "givens" (list) and "given" (dict) formats
        givens_list = problem.get("givens", [])
        givens_dict = problem.get("given", {})
        unknowns = problem.get("unknowns", [])
        target = problem.get("target", "")
        
        # Build inputs dict from givens list
        inputs = {}
        if isinstance(givens_dict, dict):
            inputs.update(givens_dict)
        if isinstance(givens_list, list):
            for g in givens_list:
                if isinstance(g, dict):
                    sym = g.get("symbol", g.get("quantity", ""))
                    val = g.get("value", "")
                    if sym and val != "":
                        inputs[sym] = val
        
        # Determine output symbol from unknowns
        output_symbol = "answer"
        if isinstance(unknowns, list) and unknowns:
            first_unknown = unknowns[0]
            if isinstance(first_unknown, dict):
                output_symbol = first_unknown.get("symbol", first_unknown.get("quantity", "answer"))
        elif target:
            output_symbol = target
        
        result: list[SubProblem] = []

        for concept in concepts:
            if concept in self.RULES:
                for tmpl in self.RULES[concept]:
                    sp = SubProblem(
                        sub_problem_id=tmpl["id"],
                        description=tmpl["desc"],
                        concept=concept,
                        strategy=tmpl["strategy"],
                        inputs=dict(inputs),
                        output_symbol=output_symbol if tmpl == self.RULES[concept][-1] else tmpl["id"].upper() + "_OUT",
                        dependencies=list(tmpl.get("deps", [])),
                        solver_type=tmpl["solver"],
                    )
                    result.append(sp)
            else:
                # Fallback: use physics_formula for physics concepts, sympy for math
                subject = problem.get("subject", "")
                if subject == "physics" or concept in ["mechanics", "energy", "momentum", "waves", "shm", "gravitation", "rotation"]:
                    solver_type = "physics_formula"
                elif subject == "math" or concept in ["algebra", "calculus", "geometry", "trigonometry"]:
                    solver_type = "sympy"
                elif subject == "chemistry":
                    solver_type = "claude_reasoning"
                else:
                    solver_type = "generic"
                
                result.append(SubProblem(
                    sub_problem_id=f"{concept}_solve",
                    description=f"Solve for {output_symbol} using {concept}",
                    concept=concept,
                    strategy="generic",
                    inputs=dict(inputs),
                    output_symbol=output_symbol,
                    solver_type=solver_type,
                ))

        return result

    def order_sub_problems(self, sub_problems: list[SubProblem]) -> list[str]:
        """Topological sort via Kahn's algorithm."""
        # Build adjacency list and in-degree map
        node_ids = {sp.sub_problem_id for sp in sub_problems}
        in_degree: dict[str, int] = {sid: 0 for sid in node_ids}
        adj: dict[str, list[str]] = {sid: [] for sid in node_ids}

        # Index by id
        id_to_sp = {sp.sub_problem_id: sp for sp in sub_problems}

        for sp in sub_problems:
            for dep in sp.dependencies:
                if dep in node_ids:
                    adj[dep].append(sp.sub_problem_id)
                    in_degree[sp.sub_problem_id] += 1

        # Kahn's algorithm
        queue = [n for n in node_ids if in_degree[n] == 0]
        order: list[str] = []

        while queue:
            node = queue.pop(0)
            order.append(node)
            for neighbor in adj[node]:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    queue.append(neighbor)

        # Append any unvisited (cycle break)
        remaining = node_ids - set(order)
        order.extend(sorted(remaining))
        return order

    def plan_synthesis(self, sub_problems: list[SubProblem], original_problem: dict) -> list[str]:
        target = original_problem.get("target", "answer")
        symbol_map = {sp.sub_problem_id: sp.output_symbol for sp in sub_problems}

        steps = []
        # Collect outputs from ordered sub-problems
        for sp in sub_problems:
            steps.append(f"Use {symbol_map[sp.sub_problem_id]} from [{sp.sub_problem_id}] ({sp.concept})")

        steps.append(f"Combine all outputs to derive {target}")
        return steps

    def _estimate_difficulty(self, problem: dict, sub_problems: list[SubProblem]) -> str:
        n = len(sub_problems)
        concept_weight = {
            "equilibrium": 1,
            "circuit": 1,
            "projectile": 1,
            "organic_reaction": 2,
            "integration": 2,
        }
        weight = sum(concept_weight.get(sp.concept, 1) for sp in sub_problems)
        if n <= 2 and weight <= 2:
            return "easy"
        if n <= 4 and weight <= 5:
            return "medium"
        return "hard"