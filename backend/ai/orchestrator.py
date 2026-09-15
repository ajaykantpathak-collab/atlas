"""Orchestrator for question solving.

Uses a 3-layer approach:
  1. NLP extractor (regex + spaCy) → extract variables (0 API, ~5ms)
  2. Embedding matching → find the right template (0 API, ~10ms)
  3. Execute template deterministically (0 API)
  4. Fallback: LLM classifier (1 API call) only if extraction fails

The LLM NEVER does math. All computation is deterministic.
"""

import re
from dataclasses import dataclass, field
from typing import Optional

from backend.ai.compute_engine import ComputeEngine
from backend.ai.template_store import TemplateStore
from backend.ai.template_library import ALL_TEMPLATES
from backend.ai.classifier import (
    classify_question, find_template, fill_defaults, substitute_variables_into_steps
)
from backend.ai.nlp_extractor import extract_variables
from backend.ai.orchestrator_steps import _execute_steps, _assemble_answer


# Variable aliases — if template needs X but we have Y, use Y as X
VAR_ALIASES = {
    "v": ["u", "v_initial", "V_volt"],
    "u": ["v", "v_initial"],
    "s": ["h", "l", "r", "L"],
    "h": ["s", "l", "r"],
    "l": ["s", "h", "r", "L"],
    "r": ["s", "h", "l"],
    "L": ["l", "s", "h", "r"],
    "V": ["V_volt", "v"],
    "V_volt": ["V"],
    "H": ["M_conc"],
    "M_conc": ["H"],
    "m": ["m2", "mass"],
    "mass": ["m", "m2"],
    "n": ["n2"],
    "c": ["C"],  # quadratic constant: try capacitance
    "b": ["B"],
    "pct": ["percentage"],  # percentage: try extracted percentage
    "val": ["total"],       # value: try extracted total
    "P": ["P_principal", "F"],  # principal: try force (unlikely)
    "R": ["R_rate"],            # rate: try resistance
    "T": ["t", "T2"],           # time: try temperature
    "distance": ["s", "h"],     # distance: try displacement, height
    "total_cost": ["F", "E"],   # total cost: try force, energy
    "quantity": ["n", "m"],     # quantity: try moles, mass
    "sum": ["E"],               # sum: try energy
    "count": ["n"],             # count: try moles
    "time_speed": ["t", "T"],   # time for speed formula: try time, temperature
    "total_cost": ["F", "E", "P"],  # total cost: try force, energy, principal
    "quantity": ["n", "m"],     # quantity: try moles, mass
    # Physics aliases
    "h": ["h_freefall", "s", "l", "r"],  # height: try freefall height, distance
    "h_freefall": ["h", "s"],             # freefall height: try height, distance
    "N0": ["m", "u"],                     # initial mass: try mass, initial velocity
    "T_half": ["T", "t"],                 # half-life: try temperature, time
    "t": ["t_decay", "T"],                # time: try decay time, temperature
    "f": ["F"],                           # focal length: try force
    "u": ["u_lens", "s", "v"],            # object distance: try lens u, distance, velocity
    "u_lens": ["u", "s"],                 # lens object distance
    "m1": ["m_momentum", "m"],            # mass 1: try momentum mass
    "m2": ["m2_momentum", "m2"],          # mass 2: try momentum mass 2
    "u1": ["v_momentum", "v", "u"],       # initial velocity 1
    "v1": ["v1_after", "v1", "v"],        # final velocity 1
    "V": ["V_battery", "V_volt", "V_gas"],# voltage: try battery, volt, gas volume
    "R1": ["R_series_pair", "R"],         # resistor 1: try series pair
    "R2": ["R_series_pair", "R"],         # resistor 2: try series pair
    # Chemistry aliases
    "m": ["m_ice", "m_momentum", "mass"], # mass: try ice mass, momentum mass
    "P": ["P_gas", "P_deposit", "F"],     # pressure: try gas pressure, deposit, force
    "T": ["T_gas", "T_half", "t"],        # temperature: try gas temp, half-life, time
    # Math aliases
    "P_deposit": ["P", "F"],              # deposit principal: try principal, force
    "R_rate": ["R"],                      # rate: try resistance
    "red": ["red_balls"],                 # red balls
    "blue": ["blue_balls"],               # blue balls
    "draw": ["draw_count"],               # draw count
    # Equilibrium
    "n_N2_init": ["n", "m"],              # initial N2 moles
    "n_H2_init": ["n2", "m2"],            # initial H2 moles
    "n_NH3_eq": ["n_NH3", "n"],           # equilibrium NH3
    # Optimization
    "r": ["r_circle", "R", "radius"],     # radius: try circle radius, resistance
    "r_circle": ["r", "R"],               # circle radius: try radius
    # Band/crawling problems
    "speed": ["crawl_speed", "u", "v"],   # crawl speed
    "u": ["crawl_speed", "v", "u_lens"],  # crawl speed (try u first)
    "length": ["band_length", "L", "l"],  # band length
    "L": ["band_length", "length", "l"],  # band length (try L)
    "V": ["stretch_rate", "V_battery", "V_volt", "V_gas"],  # stretch rate or voltage
}


@dataclass
class OrchestratorResult:
    """Result of orchestrating a problem."""
    matched: bool
    answer: str
    steps: list[dict] = field(default_factory=list)
    method: str = ""  # "nlp_extract", "llm_classify", "template_reuse"
    template_name: str = ""
    confidence: float = 1.0


class Orchestrator:
    """Orchestrates problem solving with NLP extraction + template matching."""

    @staticmethod
    async def solve(
        db, question: str, subject: Optional[str] = None, class_level: Optional[int] = None
    ) -> Optional[OrchestratorResult]:
        """Solve a problem using NLP extraction + template matching.
        
        Flow:
        1. Extract variables from question using NLP (0 API)
        2. Match template by keywords/embeddings (0 API)
        3. Execute template deterministically (0 API)
        4. Fallback: LLM classifier if NLP fails (1 API)
        """
        await TemplateStore.create_table(db)

        # ── Layer 1: NLP extraction (0 API) ──
        variables = extract_variables(question)

        # ── Layer 2: Find matching template by keywords (0 API) ──
        template_name = _match_template_by_keywords(question, variables, subject)

        if template_name:
            tmpl = find_template(template_name)
            if tmpl:
                # Extract variables using the template's own patterns (0 API)
                variables = _extract_template_variables(tmpl, question, variables)

                # Fill in defaults
                variables = fill_defaults(tmpl, variables)
                
                # Apply aliases: if template needs a var we don't have, try aliases
                variables = _apply_aliases(tmpl, variables)
                
                # Check if we have all required variables
                required_vars = [v["name"] for v in tmpl.get("variables", []) if not v.get("optional", False)]
                missing = [v for v in required_vars if v not in variables]
                
                if not missing:
                    # We have everything — execute (0 API!)
                    steps = substitute_variables_into_steps(tmpl, variables)
                    executed, all_ok = _execute_steps(steps)
                    
                    if all_ok or sum(1 for s in executed if s["success"]) >= len(executed) / 2:
                        answer = _assemble_answer(executed)

                        # Special case: snail on doubling band — check if it never reaches
                        if template_name == "snail_on_doubling_band" and executed:
                            try:
                                frac_str = executed[-1].get("answer", "")
                                if " = " in frac_str:
                                    frac_str = frac_str.split(" = ")[-1]
                                import sympy
                                frac_val = float(sympy.sympify(frac_str))
                                if frac_val < 1:
                                    answer = (
                                        f"**Step-by-step solution:**\n\n"
                                        f"**Step 1: Find maximum fraction coverable**\n"
                                        f"  The snail covers fraction u/(L×2^k) in second k.\n"
                                        f"  Total fraction = (u/L) × (1 + 1/2 + 1/4 + ...) = (u/L) × 2 = 2u/L\n"
                                        f"  2u/L = 2×{variables.get('u', '?')}/{variables.get('L', '?')} = {frac_val}\n\n"
                                        f"**Final Answer:** The snail **NEVER reaches the end**.\n"
                                        f"  The maximum fraction it can cover is {frac_val} < 1, so it always falls short.\n"
                                        f"  (The band grows faster than the snail can crawl.)"
                                    )
                                else:
                                    import math
                                    T = math.log(1 / (1 - frac_val)) / math.log(2)
                                    answer = (
                                        f"**Step-by-step solution:**\n\n"
                                        f"**Step 1: Maximum fraction coverable**\n"
                                        f"  2u/L = {frac_val} >= 1, so the snail CAN reach the end.\n\n"
                                        f"**Step 2: Find time**\n"
                                        f"  T = log(1/(1-2u/L)) / log(2) = log(1/{1-frac_val:.4f}) / log(2) = {T:.4f} seconds\n\n"
                                        f"**Final Answer:** T = {T:.4f} seconds"
                                    )
                            except Exception:
                                pass

                        # Save mapping for reuse
                        try:
                            await TemplateStore.save_template(
                                db, template_name=template_name,
                                original_question=question, steps=steps,
                                variables=list(variables.keys()),
                                subject=subject, class_level=class_level,
                            )
                        except Exception:
                            pass
                        
                        return OrchestratorResult(
                            matched=True, answer=answer, steps=executed,
                            method="nlp_extract", template_name=template_name,
                            confidence=1.0 if all_ok else 0.7,
                        )

        # ── Layer 3: LLM fallback (1 API call) ──
        classification = await classify_question(question)
        if not classification or classification["template"] == "none":
            return None

        template_name = classification["template"]
        llm_variables = classification.get("variables", {})

        # Merge: NLP variables take priority, LLM fills gaps
        merged = {**llm_variables, **variables}

        tmpl = find_template(template_name)
        if not tmpl:
            return None

        # Extract variables using the template's own patterns (0 API)
        merged = _extract_template_variables(tmpl, question, merged)

        merged = fill_defaults(tmpl, merged)
        merged = _apply_aliases(tmpl, merged)

        steps = substitute_variables_into_steps(tmpl, merged)
        executed, all_ok = _execute_steps(steps)
        answer = _assemble_answer(executed)

        # Save mapping
        if all_ok or sum(1 for s in executed if s["success"]) >= len(executed) / 2:
            try:
                await TemplateStore.save_template(
                    db, template_name=template_name,
                    original_question=question, steps=steps,
                    variables=list(merged.keys()),
                    subject=subject, class_level=class_level,
                )
            except Exception:
                pass

        return OrchestratorResult(
            matched=True, answer=answer, steps=executed,
            method="llm_classify", template_name=template_name,
            confidence=1.0 if all_ok else 0.5,
        )


def _match_template_by_keywords(question: str, variables: dict, subject: Optional[str] = None) -> Optional[str]:
    """Match a question to a template by keywords and extracted variables.
    
    Returns the template_name if a match is found, None otherwise.
    """
    lower_q = question.lower()
    best_match = None
    best_score = 0

    for tmpl in ALL_TEMPLATES:
        score = 0
        tmpl_vars = [v["name"] for v in tmpl.get("variables", [])]
        
        # Score by keyword matches — exact keyword matches score higher
        for keyword in tmpl.get("keywords", []):
            kw_lower = keyword.lower()
            if kw_lower in lower_q:
                # Multi-word keywords are more specific → higher score
                if " " in kw_lower:
                    score += 3
                else:
                    score += 2
        
        # Penalty: if question says "perimeter" but template is about "area", penalize
        if "perimeter" in lower_q and "perimeter" not in " ".join(tmpl.get("keywords", [])):
            score -= 5
        if "area" in lower_q and "area" not in " ".join(tmpl.get("keywords", [])) and "perimeter" in lower_q:
            score -= 2
        # If question says "inscribed" + "rectangle", penalize templates without "inscribed"
        if "inscribed" in lower_q and "rectangle" in lower_q:
            if "inscribed" not in " ".join(tmpl.get("keywords", [])):
                score -= 5
            else:
                score += 5  # Strong bonus for inscribed templates
        # If question says "largest" + "area", penalize simple area templates
        if "largest" in lower_q and "area" in lower_q and "inscribed" in lower_q:
            if "inscribed" not in " ".join(tmpl.get("keywords", [])):
                score -= 10
        
        # Score by variable matches (extracted vars that match template vars)
        for var in tmpl_vars:
            if var in variables:
                score += 3
            # Also check aliases
            elif var in VAR_ALIASES:
                for alias in VAR_ALIASES[var]:
                    if alias in variables:
                        score += 2
                        break
        
        # Penalize if template requires vars we don't have
        required = [v["name"] for v in tmpl.get("variables", []) if not v.get("optional", False)]
        missing_required = [v for v in required if v not in variables and v not in [a for aliases in VAR_ALIASES.values() for a in aliases]]
        score -= len(missing_required) * 1

        # Rule-based templates (no variables) get a bonus if keywords match well
        # These templates return a fixed answer based on a deterministic rule
        if len(tmpl.get("variables", [])) == 0 and score >= 6:
            score += 5  # Boost rule-based templates with strong keyword matches
        
        # Subject bonus
        if subject and tmpl.get("subject") == subject:
            score += 1
        
        if score > best_score:
            best_score = score
            best_match = tmpl["template_name"]

    # Require minimum score to match
    if best_score >= 4:
        return best_match
    return None


def _apply_aliases(template: dict, variables: dict) -> dict:
    """Apply variable aliases: if template needs a var we don't have, try aliases."""
    tmpl_vars = [v["name"] for v in template.get("variables", [])]
    
    for tmpl_var in tmpl_vars:
        if tmpl_var not in variables:
            # Try aliases
            aliases = VAR_ALIASES.get(tmpl_var, [])
            for alias in aliases:
                if alias in variables:
                    variables[tmpl_var] = variables[alias]
                    break
    
    return variables


def _extract_template_variables(template: dict, question: str, existing: dict) -> dict:
    """Extract variables from the question using the template's own regex patterns.
    
    This is 0 API calls — pure regex extraction.
    Template patterns are more specific than the generic NLP extractor.
    """
    variables = dict(existing)  # Start with existing NLP-extracted vars
    
    for var_def in template.get("variables", []):
        var_name = var_def["name"]
        # Template patterns are more specific than NLP — always try them
        # even if NLP already found a value (template patterns take priority)
        patterns = var_def.get("patterns", [])
        for pattern in patterns:
            try:
                match = re.search(pattern, question, re.IGNORECASE)
                if match:
                    raw_val = match.group(1)
                    # Try to convert to float, keep string if it fails
                    try:
                        val = float(raw_val)
                        # Convert to int if it's a whole number
                        if val == int(val) and abs(val) < 1e15:
                            val = int(val)
                    except (ValueError, IndexError):
                        val = raw_val  # Keep as string (e.g., unit identifier)
                    variables[var_name] = val
                    break
            except Exception:
                continue
    
    return variables
