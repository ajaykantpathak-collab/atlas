"""Template engine for numerical problem solving.

Handles numerical problems by:
1. Extracting variables from the student's question (regex, no LLM)
2. Matching to a formula template
3. Computing the result
4. Generating a step-by-step solution

Templates are organized by subject and topic. Each template defines:
- Pattern: regex to match the question type
- Variables: what to extract
- Formula: how to compute the result
- Steps: how to present the solution

This is NOT a rigid template system — it's a worked-example engine
that shows the student the method and lets them apply it.
"""

import re
from dataclasses import dataclass
from typing import Optional


@dataclass
class SolutionStep:
    """A single step in a worked solution."""
    description: str
    expression: str
    result: str


@dataclass
class SolutionResult:
    """Result of solving a numerical problem."""
    matched: bool
    template_name: str
    variables: dict
    steps: list[SolutionStep]
    final_answer: str
    method_note: str = ""


# ---------------------------------------------------------------------------
# Formula templates
# ---------------------------------------------------------------------------

@dataclass
class FormulaTemplate:
    """A formula template for solving numerical problems."""
    name: str
    subject: str
    keywords: list[str]  # keywords to match
    variable_patterns: dict[str, str]  # variable name → regex pattern
    formula: str  # Python expression string
    variable_names: dict[str, str]  # variable name → display name with unit
    steps: list[str]  # step descriptions
    result_unit: str
    result_name: str
    exclude_keywords: list[str] = None  # keywords that disqualify this template


# Physics templates
PHYSICS_TEMPLATES = [
    FormulaTemplate(
        name="moment_of_force",
        subject="physics",
        keywords=["moment", "torque", "turning effect", "force", "pivot", "perpendicular distance"],
        variable_patterns={
            "force": r'(\d+\.?\d*)\s*N',
            "distance": r'(\d+\.?\d*)\s*m(?:\s|$|,|\.)',
        },
        formula="force * distance",
        variable_names={"force": "Force (F)", "distance": "Perpendicular distance (d)"},
        steps=[
            "Identify the force (F) and perpendicular distance (d) from the pivot",
            "Apply the formula: Moment = F × d",
            "Substitute the values: Moment = {force} × {distance}",
            "Calculate: Moment = {result} N m",
        ],
        result_unit="N m",
        result_name="Moment",
    ),
    FormulaTemplate(
        name="ohms_law",
        subject="physics",
        keywords=["ohm", "voltage", "current", "resistance", "potential difference", "circuit"],
        variable_patterns={
            "voltage": r'(\d+\.?\d*)\s*V(?:\s|$|,|\.)',
            "current": r'(\d+\.?\d*)\s*A(?:\s|$|,|\.)',
            "resistance": r'(\d+\.?\d*)\s*[Oo]hm(?:s|\s|$|,|\.)',
        },
        formula="voltage / current if current else voltage / resistance if resistance else current * resistance",
        variable_names={"voltage": "Voltage (V)", "current": "Current (I)", "resistance": "Resistance (R)"},
        steps=[
            "Identify the known quantities (V, I, and/or R)",
            "Apply Ohm's Law: V = I × R",
            "Rearrange for the unknown: {unknown} = {expression}",
            "Substitute values and calculate: {result}",
        ],
        result_unit="depends",
        result_name="Unknown",
    ),
    FormulaTemplate(
        name="speed_distance_time",
        subject="physics",
        keywords=["speed", "distance", "time", "velocity", "travel"],
        variable_patterns={
            "distance": r'(\d+\.?\d*)\s*(?:m|km)(?:\s|$|,|\.)',
            "time": r'(\d+\.?\d*)\s*(?:s|sec|second|min|hour|h)(?:\s|$|,|\.)',
            "speed": r'(\d+\.?\d*)\s*(?:m/s|km/h|mph)(?:\s|$|,|\.)',
        },
        formula="distance / time if distance and time else speed * time if speed and time else distance / speed",
        variable_names={"distance": "Distance", "time": "Time", "speed": "Speed"},
        steps=[
            "Identify the known quantities",
            "Apply the formula: Speed = Distance / Time",
            "Rearrange for the unknown",
            "Substitute values and calculate",
        ],
        result_unit="depends",
        result_name="Unknown",
    ),
    FormulaTemplate(
        name="work_done",
        subject="physics",
        keywords=["work", "work done", "force", "displacement", "distance moved"],
        variable_patterns={
            "force": r'(\d+\.?\d*)\s*N',
            "distance": r'(\d+\.?\d*)\s*m(?:\s|$|,|\.)',
        },
        formula="force * distance",
        variable_names={"force": "Force (F)", "distance": "Distance (d)"},
        steps=[
            "Identify the force (F) and distance (d)",
            "Apply the formula: Work = F × d",
            "Substitute values: Work = {force} × {distance}",
            "Calculate: Work = {result} J",
        ],
        result_unit="J",
        result_name="Work done",
    ),
    FormulaTemplate(
        name="power",
        subject="physics",
        keywords=["power", "work", "time", "energy", "watt"],
        variable_patterns={
            "work": r'(\d+\.?\d*)\s*J(?:\s|$|,|\.)',
            "time": r'(\d+\.?\d*)\s*s(?:\s|$|,|\.)',
            "energy": r'(\d+\.?\d*)\s*J(?:\s|$|,|\.)',
        },
        formula="work / time if work and time else energy / time if energy and time else 0",
        variable_names={"work": "Work/Energy (W)", "time": "Time (t)"},
        steps=[
            "Identify the work/energy and time",
            "Apply the formula: Power = Work / Time",
            "Substitute values: Power = {work} / {time}",
            "Calculate: Power = {result} W",
        ],
        result_unit="W",
        result_name="Power",
    ),
]

# Maths templates
MATHS_TEMPLATES = [
    FormulaTemplate(
        name="simple_interest",
        subject="maths",
        keywords=["simple interest", "principal", "rate", "time", "si"],
        variable_patterns={
            "principal": r'(?:rs\.?\s*|₹\s*)?(\d+\.?\d*)\s*(?:is|are|was|were)?\s*(?:the\s+)?(?:principal|sum|amount)',
            "rate": r'(\d+\.?\d*)\s*%\s*(?:per\s+annum|p\.?a\.?|rate)',
            "time": r'(\d+\.?\d*)\s*(?:year|yr)s?(?:\s|$|,|\.)',
        },
        formula="principal * rate * time / 100",
        variable_names={"principal": "Principal (P)", "rate": "Rate (R)%", "time": "Time (T) years"},
        steps=[
            "Identify the principal (P), rate (R), and time (T)",
            "Apply the formula: SI = P × R × T / 100",
            "Substitute values: SI = {principal} × {rate} × {time} / 100",
            "Calculate: SI = {result}",
        ],
        result_unit="",
        result_name="Simple Interest",
    ),
    FormulaTemplate(
        name="area_rectangle",
        subject="maths",
        keywords=["area", "rectangle", "length", "breadth", "width"],
        variable_patterns={
            "length": r'length\s*(?:=|:|is|of)?\s*(\d+\.?\d*)',
            "breadth": r'(?:breadth|width)\s*(?:=|:|is|of)?\s*(\d+\.?\d*)',
        },
        formula="length * breadth",
        variable_names={"length": "Length (l)", "breadth": "Breadth (b)"},
        steps=[
            "Identify the length (l) and breadth (b)",
            "Apply the formula: Area = l × b",
            "Substitute values: Area = {length} × {breadth}",
            "Calculate: Area = {result} sq units",
        ],
        result_unit="sq units",
        result_name="Area",
        exclude_keywords=["perimeter"],
    ),
    FormulaTemplate(
        name="perimeter_rectangle",
        subject="maths",
        keywords=["perimeter", "rectangle", "length", "breadth", "width"],
        variable_patterns={
            "length": r'length\s*(?:=|:|is|of)?\s*(\d+\.?\d*)',
            "breadth": r'(?:breadth|width)\s*(?:=|:|is|of)?\s*(\d+\.?\d*)',
        },
        formula="2 * (length + breadth)",
        variable_names={"length": "Length (l)", "breadth": "Breadth (b)"},
        steps=[
            "Identify the length (l) and breadth (b)",
            "Apply the formula: Perimeter = 2(l + b)",
            "Substitute values: Perimeter = 2 × ({length} + {breadth})",
            "Calculate: Perimeter = {result} units",
        ],
        result_unit="units",
        result_name="Perimeter",
    ),
    FormulaTemplate(
        name="percentage",
        subject="maths",
        keywords=["percentage", "percent", "%", "of what", "out of"],
        variable_patterns={
            "value": r'(\d+\.?\d*)\s*%',
            "total": r'(?:of|from|out\s+of)\s*(\d+\.?\d*)',
        },
        formula="value * total / 100",
        variable_names={"value": "Percentage (%)", "total": "Total value"},
        steps=[
            "Identify the percentage and the total value",
            "Apply the formula: Result = (Percentage / 100) × Total",
            "Substitute values: Result = ({value} / 100) × {total}",
            "Calculate: Result = {result}",
        ],
        result_unit="",
        result_name="Result",
    ),
]

# Chemistry templates
CHEMISTRY_TEMPLATES = [
    FormulaTemplate(
        name="mole_calculation",
        subject="chem",
        keywords=["mole", "molar", "molecules", "avogadro", "mass", "molar mass"],
        variable_patterns={
            "mass": r'(\d+\.?\d*)\s*g(?:\s|$|,|\.)',
            "molar_mass": r'(\d+\.?\d*)\s*g/mol',
        },
        formula="mass / molar_mass if molar_mass else 0",
        variable_names={"mass": "Mass (g)", "molar_mass": "Molar mass (g/mol)"},
        steps=[
            "Identify the mass and molar mass",
            "Apply the formula: Moles = Mass / Molar Mass",
            "Substitute values: Moles = {mass} / {molar_mass}",
            "Calculate: Moles = {result} mol",
        ],
        result_unit="mol",
        result_name="Number of moles",
    ),
    FormulaTemplate(
        name="molarity",
        subject="chem",
        keywords=["molarity", "concentration", "moles", "volume", "solution"],
        variable_patterns={
            "moles": r'(\d+\.?\d*)\s*(?:mol|moles)',
            "volume": r'(\d+\.?\d*)\s*L(?:\s|$|,|\.)',
        },
        formula="moles / volume if volume else 0",
        variable_names={"moles": "Moles (n)", "volume": "Volume (L)"},
        steps=[
            "Identify the moles of solute and volume of solution",
            "Apply the formula: Molarity = moles / volume (L)",
            "Substitute values: Molarity = {moles} / {volume}",
            "Calculate: Molarity = {result} M",
        ],
        result_unit="M",
        result_name="Molarity",
    ),
]

# All templates by subject
ALL_TEMPLATES = {
    "physics": PHYSICS_TEMPLATES,
    "maths": MATHS_TEMPLATES,
    "chem": CHEMISTRY_TEMPLATES,
}


class TemplateEngine:
    """Solves numerical problems using formula templates."""

    @staticmethod
    def solve(question: str, subject: Optional[str] = None) -> Optional[SolutionResult]:
        """Attempt to solve a numerical problem using templates.

        Returns None if no template matches.
        """
        lower_q = question.lower()

        # Get templates for the subject (or all if no subject specified)
        templates = []
        if subject and subject in ALL_TEMPLATES:
            templates = ALL_TEMPLATES[subject]
        else:
            for temps in ALL_TEMPLATES.values():
                templates.extend(temps)

        # Try each template
        for template in templates:
            # Check exclude_keywords — if any are present, skip this template
            if template.exclude_keywords:
                if any(ek in lower_q for ek in template.exclude_keywords):
                    continue

            # Check if the question contains enough keywords
            keyword_matches = sum(1 for kw in template.keywords if kw in lower_q)
            if keyword_matches < 2:
                continue

            # Extract variables
            variables = {}
            for var_name, pattern in template.variable_patterns.items():
                match = re.search(pattern, question, re.IGNORECASE)
                if match:
                    try:
                        variables[var_name] = float(match.group(1))
                    except (ValueError, IndexError):
                        pass

            # Need at least 2 variables to attempt solving
            if len(variables) < 2:
                continue

            # Compute the result
            try:
                result = eval(template.formula, {"__builtins__": {}}, variables)
                if result == 0 or result is None:
                    continue
                result = round(result, 4)
            except Exception:
                continue

            # Build solution steps
            steps = []
            for i, step_template in enumerate(template.steps):
                step_text = step_template.format(
                    **variables,
                    result=result,
                    unknown=template.result_name,
                    expression=template.formula
                        .replace("if", "if")
                        .replace("else", "else"),
                )
                if i == len(template.steps) - 1:
                    steps.append(SolutionStep(
                        description=step_text,
                        expression=f"= {result}",
                        result=f"{result} {template.result_unit}".strip(),
                    ))
                elif i == 2:
                    expr = " × ".join(
                        f"{v}" for v in variables.values()
                    )
                    steps.append(SolutionStep(
                        description=step_text,
                        expression=expr,
                        result="",
                    ))
                else:
                    steps.append(SolutionStep(
                        description=step_text,
                        expression="",
                        result="",
                    ))

            return SolutionResult(
                matched=True,
                template_name=template.name,
                variables=variables,
                steps=steps,
                final_answer=f"{result} {template.result_unit}".strip(),
                method_note=f"This uses the {template.name.replace('_', ' ')} formula. "
                           f"Apply the same method to similar problems.",
            )

        return None

    @staticmethod
    def detect_numerical(question: str) -> bool:
        """Check if a question is a numerical problem."""
        # Has at least 2 numbers
        numbers = re.findall(r'\d+\.?\d*', question)
        if len(numbers) < 2:
            return False
        # Has calculation keywords
        calc_keywords = ["calculate", "find", "compute", "solve", "determine", "what is", "what's"]
        has_calc = any(kw in question.lower() for kw in calc_keywords)
        if not has_calc:
            return False
        # Has units OR math-specific keywords (math questions don't always have physics units)
        units = ["N", "m", "kg", "s", "V", "A", "J", "W", "g", "L", "mol", "cm", "km", "%", "ohm"]
        has_units = any(re.search(rf'\b{unit}\b', question, re.IGNORECASE) for unit in units)
        math_keywords = ["term", "sum", "area", "volume", "perimeter", "interest", "profit",
                         "loss", "discount", "mean", "median", "mode", "probability",
                         "roots", "factor", "factorise", "factorize", "equation",
                         "ratio", "proportion", "percentage", "speed", "distance",
                         "time", "shares", "dividend", "investment", "principal",
                         "rate", "amount", "series", "progression", "ap", "gp"]
        has_math = any(kw in question.lower() for kw in math_keywords)
        return has_units or has_math
