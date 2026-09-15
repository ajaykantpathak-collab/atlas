"""Extract formula banks from dream_app backend/ai into YAML format.
READ-ONLY: only reads existing files, writes NEW files to platform formulas dir.
Does NOT modify any existing files.
"""
import re, json, os, yaml
from pathlib import Path

DREAM = Path(r"D:\dream_app\backend\ai")
OUT = Path(r"D:\platform\backend\formulas")

def extract_stem_solvers():
    """Extract formulas from stem_solvers.py — physics + chemistry."""
    text = (DREAM / "stem_solvers.py").read_text(encoding="utf-8")
    formulas = []
    # Pattern: description="Use <formula>", operation="formula", result=f"<formula = ...>"
    pattern = re.compile(
        r'description="Use ([^"]+)"[^)]*?result=f"([^"]+)"',
        re.DOTALL
    )
    for m in pattern.finditer(text):
        desc = m.group(1).strip()
        result = m.group(2).strip()
        # Extract formula name and expression
        if "=" in desc:
            name_parts = desc.split("=", 1)
            name = name_parts[0].strip()
            expr = name_parts[1].strip() if len(name_parts) > 1 else ""
        else:
            name = desc
            expr = desc

        # Determine subject and subdomain
        subject = "unknown"
        subdomain = "GEN"
        if any(k in desc.lower() for k in ["v = u + at", "s = ut", "v² = u²", "f = ma", "w = mg", "ke =", "pe =", "w = fs", "v = ir", "p = vi", "q = it"]):
            subject = "physics"
            if any(k in desc.lower() for k in ["v = u", "s = ut", "v²"]): subdomain = "KIN"
            elif any(k in desc.lower() for k in ["f = ma", "m = f", "a = f", "w = mg"]): subdomain = "DYN"
            elif any(k in desc.lower() for k in ["ke =", "pe =", "w = fs"]): subdomain = "WE"
            elif any(k in desc.lower() for k in ["v = ir", "i = v", "r = v", "p = vi", "q = it"]): subdomain = "CE"
        elif any(k in desc.lower() for k in ["n = m/m", "n = n/na", "m = n/v", "ph =", "[h", "p = nrt", "v = nrt", "n = pv", "t = pv", "m2 =", "v2 =", "m1 =", "v1 ="]):
            subject = "chemistry"
            if any(k in desc.lower() for k in ["n = m/m", "n = n/na", "m = n/v"]): subdomain = "STOICH"
            elif any(k in desc.lower() for k in ["ph =", "[h"]): subdomain = "AB"
            elif any(k in desc.lower() for k in ["p = nrt", "v = nrt", "n = pv", "t = pv"]): subdomain = "GAS"
            elif any(k in desc.lower() for k in ["m2 =", "v2 =", "m1 =", "v1 ="]): subdomain = "SOL"

        # Extract variables from result string
        variables = []
        var_pattern = re.compile(r'([a-zA-Z_]+)\s*=')
        for vm in var_pattern.finditer(result):
            v = vm.group(1)
            if v not in [x["symbol"] for x in variables] and v not in ["Formula", "f"]:
                variables.append({"symbol": v, "name": v, "unit": "", "dimensional_formula": "", "quantity_type": ""})

        formulas.append({
            "formula_id": f"DRM_{subject.upper()[:3]}_{subdomain}_{len(formulas)+1:03d}",
            "name": name,
            "latex": expr.replace("**", "^").replace("*", r"\cdot"),
            "variables": variables,
            "preconditions": [],
            "grade_range": ["class9", "class10", "class11", "class12", "jee_main", "jee_advanced", "neet"],
            "chapter": "",
            "subject": subject,
            "concept_tags": [name.lower().replace(" ", "-")],
            "related_formulas": [],
            "source": "dream_app/stem_solvers.py",
            "original_description": desc,
            "original_result": result,
        })
    return formulas

def extract_math_solvers():
    """Extract formulas from math_solvers.py."""
    text = (DREAM / "math_solvers.py").read_text(encoding="utf-8")
    formulas = []
    # Pattern: f"Formula: <name>"
    pattern = re.compile(r'f"Formula:\s*([^"]+)"', re.DOTALL)
    seen = set()
    for m in pattern.finditer(text):
        formula_text = m.group(1).strip()
        if formula_text in seen:
            continue
        seen.add(formula_text)

        # Parse name and expression
        if "=" in formula_text:
            parts = formula_text.split("=", 1)
            name = parts[0].strip()
            expr = parts[1].strip() if len(parts) > 1 else ""
        else:
            name = formula_text
            expr = ""

        # Determine subdomain
        subdomain = "GEN"
        name_lower = name.lower()
        if any(k in name_lower for k in ["distance", "midpoint", "slope", "section"]): subdomain = "COORD"
        elif any(k in name_lower for k in ["area", "circumference", "arc", "sector", "volume", "csa", "tsa", "sa"]): subdomain = "GEO"
        elif any(k in name_lower for k in ["sn", "an", "ap", "gp"]): subdomain = "SEQ"
        elif any(k in name_lower for k in ["|z|", "complex"]): subdomain = "CMPLX"
        elif any(k in name_lower for k in ["p(n", "c(n", "permutation", "combination"]): subdomain = "COMB"
        elif any(k in name_lower for k in ["p =", "probability"]): subdomain = "PROB"
        elif any(k in name_lower for k in ["mean", "median", "σ", "variance", "standard"]): subdomain = "STAT"
        elif any(k in name_lower for k in ["|v|", "dot", "cross", "vector"]): subdomain = "VEC"
        elif any(k in name_lower for k in ["si =", "ci =", "a = p"]): subdomain = "ARITH"
        elif any(k in name_lower for k in ["heron"]): subdomain = "GEO"

        formulas.append({
            "formula_id": f"DRM_MATH_{subdomain}_{len(formulas)+1:03d}",
            "name": name,
            "latex": expr,
            "variables": [],
            "preconditions": [],
            "grade_range": ["class6", "class7", "class8", "class9", "class10", "class11", "class12", "jee_main", "jee_advanced"],
            "chapter": "",
            "subject": "mathematics",
            "concept_tags": [name.lower().replace(" ", "-")],
            "related_formulas": [],
            "source": "dream_app/math_solvers.py",
            "original_text": formula_text,
        })
    return formulas

def extract_reasoning_rules():
    """Extract formulas from reasoning_rules_*.py files."""
    formulas = []
    rule_files = [
        ("reasoning_rules_math.py", "MATH", "mathematics"),
        ("reasoning_rules_phy.py", "PHY", "physics"),
        ("reasoning_rules_chem.py", "CHM", "chemistry"),
        ("reasoning_rules_bio.py", "BIO", "biology"),
    ]
    for fname, prefix, subject in rule_files:
        fpath = DREAM / fname
        if not fpath.exists():
            continue
        text = fpath.read_text(encoding="utf-8")
        # Pattern: Rule(name="...", ... formula="...", variables={...}, unknown="...", explanation="...")
        rule_pattern = re.compile(
            r'Rule\(\s*name="([^"]+)"[^)]*?formula="([^"]+)"[^)]*?unknown="([^"]+)"[^)]*?explanation="([^"]+)"',
            re.DOTALL
        )
        for m in rule_pattern.finditer(text):
            name = m.group(1).strip()
            formula = m.group(2).strip()
            unknown = m.group(3).strip()
            explanation = m.group(4).strip()

            # Extract variables from formula
            variables = []
            var_pattern = re.compile(r'\b([a-zA-Z_]\w*)\b')
            reserved = {"Rational", "first", "order", "GUG", "string", "answer", "not", "a", "number"}
            for vm in var_pattern.finditer(formula):
                v = vm.group(1)
                if v not in [x["symbol"] for x in variables] and v not in reserved and len(v) > 1:
                    variables.append({"symbol": v, "name": v, "unit": "", "dimensional_formula": "", "quantity_type": ""})

            subdomain = "RULE"
            formulas.append({
                "formula_id": f"DRM_{prefix}_{subdomain}_{len(formulas)+1:03d}",
                "name": name,
                "latex": formula.replace("**", "^").replace("*", r"\cdot"),
                "variables": variables,
                "preconditions": [],
                "grade_range": ["class10", "class11", "class12", "jee_main", "jee_advanced", "neet"],
                "chapter": "",
                "subject": subject,
                "concept_tags": [name.lower().replace(" ", "-")],
                "related_formulas": [],
                "source": f"dream_app/{fname}",
                "unknown": unknown,
                "explanation": explanation,
            })
    return formulas

def extract_solution_patterns():
    """Extract patterns from _solution_patterns.json."""
    fpath = DREAM / "_solution_patterns.json"
    if not fpath.exists():
        return []
    data = json.loads(fpath.read_text(encoding="utf-8"))
    formulas = []
    for i, item in enumerate(data):
        if isinstance(item, dict):
            category = item.get("category", "unknown")
            pattern = item.get("pattern", "")
            original = item.get("original_question", "")
            formulas.append({
                "formula_id": f"DRM_PAT_{i+1:03d}",
                "name": category,
                "latex": "",
                "variables": [],
                "preconditions": [],
                "grade_range": ["class9", "class10", "class11", "class12"],
                "chapter": "",
                "subject": "mathematics",
                "concept_tags": [category.lower().replace(" ", "-")],
                "related_formulas": [],
                "source": "dream_app/_solution_patterns.json",
                "pattern": pattern,
                "original_question": original,
            })
    return formulas

def extract_step_types_formulas():
    """Extract formula references from step_types.py thinking questions."""
    fpath = DREAM / "step_types.py"
    if not fpath.exists():
        return []
    text = fpath.read_text(encoding="utf-8")
    formulas = []
    # Pattern: question="What is the formula for ...?"
    q_pattern = re.compile(r'question="(?:What is the |The )?formula(?: for | is)?([^"?]+)[\?"]')
    seen = set()
    for m in q_pattern.finditer(text):
        name = m.group(1).strip().rstrip("?").strip()
        if name in seen or not name:
            continue
        seen.add(name)

        subdomain = "GEN"
        name_lower = name.lower()
        if any(k in name_lower for k in ["simple interest", "compound interest"]): subdomain = "ARITH"
        elif any(k in name_lower for k in ["distance", "section", "slope"]): subdomain = "COORD"
        elif any(k in name_lower for k in ["area", "arc", "sector"]): subdomain = "GEO"
        elif any(k in name_lower for k in ["probability", "binomial", "conditional"]): subdomain = "PROB"
        elif any(k in name_lower for k in ["ap", "gp", "nth term", "sum of"]): subdomain = "SEQ"
        elif any(k in name_lower for k in ["3d distance", "3d section"]): subdomain = "3D"
        elif any(k in name_lower for k in ["lens", "mirror"]): subdomain = "OPT"
        elif any(k in name_lower for k in ["dilution"]): subdomain = "SOL"
        elif any(k in name_lower for k in ["surface area", "cube", "cuboid", "cylinder", "cone", "sphere"]): subdomain = "GEO"
        elif any(k in name_lower for k in ["density", "pressure", "gravitational", "heat"]): subdomain = "PHY"
        elif any(k in name_lower for k in ["quadratic"]): subdomain = "ALG"

        subject = "mathematics"
        if subdomain in ["OPT", "PHY"]: subject = "physics"
        elif subdomain == "SOL": subject = "chemistry"

        formulas.append({
            "formula_id": f"DRM_STEP_{subdomain}_{len(formulas)+1:03d}",
            "name": name,
            "latex": "",
            "variables": [],
            "preconditions": [],
            "grade_range": ["class6", "class7", "class8", "class9", "class10", "class11", "class12"],
            "chapter": "",
            "subject": subject,
            "concept_tags": [name.lower().replace(" ", "-")],
            "related_formulas": [],
            "source": "dream_app/step_types.py",
        })
    return formulas

def write_yaml(formulas, out_path, subject_name):
    """Write formulas to YAML file."""
    out_path.parent.mkdir(parents=True, exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write("---\n")
        yaml.dump(formulas, f, default_flow_style=False, allow_unicode=True, sort_keys=False)
    return len(formulas)

if __name__ == "__main__":
    print("=" * 70)
    print("EXTRACTING FORMULA BANKS FROM DREAM_APP")
    print("=" * 70)

    all_counts = {}

    # 1. stem_solvers.py
    print("\n[1/5] Extracting stem_solvers.py...")
    stem = extract_stem_solvers()
    n = write_yaml(stem, OUT / "physics" / "dream_app_stem_solvers.yaml", "physics+chemistry")
    all_counts["stem_solvers"] = n
    print(f"  {n} formulas -> physics/dream_app_stem_solvers.yaml")

    # 2. math_solvers.py
    print("\n[2/5] Extracting math_solvers.py...")
    math = extract_math_solvers()
    n = write_yaml(math, OUT / "mathematics" / "dream_app_math_solvers.yaml", "mathematics")
    all_counts["math_solvers"] = n
    print(f"  {n} formulas -> mathematics/dream_app_math_solvers.yaml")

    # 3. reasoning_rules_*.py
    print("\n[3/5] Extracting reasoning_rules_*.py...")
    rules = extract_reasoning_rules()
    # Split by subject
    for subj, prefix in [("physics", "PHY"), ("chemistry", "CHM"), ("biology", "BIO"), ("mathematics", "MATH")]:
        subj_rules = [r for r in rules if r["subject"] == subj]
        if subj_rules:
            n = write_yaml(subj_rules, OUT / subj / f"dream_app_reasoning_rules.yaml", subj)
            all_counts[f"rules_{subj}"] = n
            print(f"  {n} rules -> {subj}/dream_app_reasoning_rules.yaml")

    # 4. solution_patterns.json
    print("\n[4/5] Extracting _solution_patterns.json...")
    patterns = extract_solution_patterns()
    n = write_yaml(patterns, OUT / "mathematics" / "dream_app_solution_patterns.yaml", "mathematics")
    all_counts["solution_patterns"] = n
    print(f"  {n} patterns -> mathematics/dream_app_solution_patterns.yaml")

    # 5. step_types.py formula questions
    print("\n[5/5] Extracting step_types.py formula references...")
    steps = extract_step_types_formulas()
    n = write_yaml(steps, OUT / "mathematics" / "dream_app_step_types.yaml", "mathematics")
    all_counts["step_types"] = n
    print(f"  {n} formula references -> mathematics/dream_app_step_types.yaml")

    print("\n" + "=" * 70)
    print("EXTRACTION COMPLETE")
    print("=" * 70)
    total = sum(all_counts.values())
    for k, v in all_counts.items():
        print(f"  {k}: {v}")
    print(f"  TOTAL EXTRACTED: {total}")
    print(f"\nAll files written to: {OUT}")
    print("These are NEW files — no existing files were modified.")
