"""Extract CISCE chemistry formula bank properly — handles Name: formula format.
READ-ONLY: reads D:\cisce\chem\formula_bank\*.marker
Writes NEW file to D:\platform\backend\formulas\cisce\cisce_chemistry_formula_bank.yaml
Does NOT modify any existing files.
"""
import re, os, yaml
from pathlib import Path

CISCE_CHEM = Path(r"D:\cisce\chem\formula_bank")
OUT = Path(r"D:\platform\backend\formulas\cisce")
OUT.mkdir(parents=True, exist_ok=True)

def parse_chem_marker(text, filename):
    """Parse chemistry formula bank marker into structured entries."""
    formulas = []

    # Extract metadata
    node_id = ""
    cls = ""
    for line in text.split("\n"):
        if line.startswith("NODE_ID:"):
            node_id = line.split(":", 1)[1].strip()
        elif line.startswith("CLASS:"):
            cls = line.split(":", 1)[1].strip()

    # Extract sections
    section_pattern = re.compile(r"===\s*(.+?)\s*===", re.MULTILINE)
    sections = list(section_pattern.finditer(text))

    for i, sec_match in enumerate(sections):
        sec_name = sec_match.group(1).strip()
        sec_start = sec_match.end()
        sec_end = sections[i + 1].start() if i + 1 < len(sections) else len(text)
        sec_text = text[sec_start:sec_end].strip()

        lines = sec_text.split("\n")
        for line in lines:
            line = line.strip()
            if not line or line.startswith("---") or line.startswith("NODE_") or line.startswith("TITLE:") or line.startswith("CLASS:") or line.startswith("SUBJECT:") or line.startswith("UNIT:") or line.startswith("CHAPTER:") or line.startswith("SYLLABUS:"):
                continue

            # Skip qualitative/notes lines
            if line.startswith("Le Chatelier") or line.startswith("Catalyst") or line.startswith("Increase") or line.startswith("Add ") or line.startswith("Reverse") or line.startswith("Multiply") or line.startswith("UNIT CHECK") or line.startswith("Limitation") or line.startswith("Note:") or line.startswith("Example"):
                continue

            # Pattern 1: "Name: formula" (e.g. "Moles: n = mass / M")
            # Pattern 2: "formula = expression" (e.g. "Kc = [products]^coefficients / [reactants]^coefficients")
            # Pattern 3: "Name: value" (e.g. "Max electrons per shell: 2n^2")

            name = ""
            expr = ""

            if ":" in line and "=" in line:
                # Has both colon and equals — check which comes first
                colon_pos = line.find(":")
                eq_pos = line.find("=")
                if colon_pos < eq_pos:
                    # Name: formula = expr
                    name = line[:colon_pos].strip()
                    expr = line[colon_pos + 1:].strip()
                else:
                    # formula = expr (no separate name)
                    name = line.split("=")[0].strip()
                    expr = line.split("=", 1)[1].strip() if "=" in line else ""
            elif ":" in line:
                # Name: something (no equals)
                parts = line.split(":", 1)
                name = parts[0].strip()
                expr = parts[1].strip() if len(parts) > 1 else ""
            elif "=" in line:
                # formula = expr
                parts = line.split("=", 1)
                name = parts[0].strip()
                expr = parts[1].strip() if len(parts) > 1 else ""
            else:
                # Just a line of text — skip if too long, keep if short formula-like
                if len(line) > 80 or " " in line and not any(c in line for c in ["^", "sqrt", "/", "*", "+", "-"]):
                    continue
                name = line
                expr = ""

            # Clean up
            name = name.rstrip(":").strip()
            expr = expr.strip()

            # Skip if name is too generic or too long
            if not name or len(name) < 2 or len(name) > 80:
                continue
            if name.lower() in ["unit check", "limitation", "note", "example", "qualitative", "no formula", "reverse equation", "multiply equation"]:
                continue
            # Skip lines that are just descriptions
            if name.startswith("Bond breaking") or name.startswith("bond breaking") or name.startswith("Q <") or name.startswith("Q >") or name.startswith("Q ="):
                continue

            # Only keep if it looks like a formula
            has_formula_chars = any(c in (name + expr) for c in ["=", "^", "/", "*", "+", "-", "sqrt", "log", "sin", "cos", "pi", "Delta", "Sigma"])
            if not has_formula_chars and not expr:
                continue

            # Convert to latex-ish
            latex = expr
            if latex:
                latex = latex.replace("^", "**")
                latex = latex.replace("Delta", r"\Delta")
                latex = latex.replace("Sigma", r"\Sigma")
                latex = latex.replace("pi", r"\pi")
                latex = latex.replace("sqrt", r"\sqrt")
                latex = latex.replace("lambda", r"\lambda")
                latex = latex.replace("theta", r"\theta")
                latex = latex.replace("alpha", r"\alpha")
                latex = latex.replace("deg", r"^{\circ}")

            # Extract variables
            variables = []
            if expr:
                var_pattern = re.compile(r'\b([a-zA-Z])\b')
                for vm in var_pattern.finditer(expr):
                    v = vm.group(1)
                    if v not in [x["symbol"] for x in variables] and v not in ["x", "X"]:
                        variables.append({"symbol": v, "name": v, "unit": "", "dimensional_formula": "", "quantity_type": ""})

            formulas.append({
                "formula_id": f"CISCE_CHEM_{node_id}_{len(formulas)+1:03d}",
                "name": name,
                "latex": latex,
                "variables": variables,
                "preconditions": [],
                "grade_range": [f"class{cls}"] if cls else [],
                "chapter": sec_name,
                "subject": "chemistry",
                "concept_tags": [name.lower().replace(" ", "-").replace("/", "-")[:30], sec_name.lower().replace(" ", "-")[:30]],
                "related_formulas": [],
                "source": f"cisce/{filename}",
                "board": "CISCE",
            })

    return formulas

if __name__ == "__main__":
    print("=" * 70)
    print("EXTRACTING CISCE CHEMISTRY FORMULA BANK (FIXED PARSER)")
    print("=" * 70)

    all_formulas = []

    for marker_file in sorted(CISCE_CHEM.glob("*.marker")):
        text = marker_file.read_text(encoding="utf-8", errors="replace")
        formulas = parse_chem_marker(text, marker_file.name)
        all_formulas.extend(formulas)
        print(f"  {marker_file.name}: {len(formulas)} formulas")

    out_path = OUT / "cisce_chemistry_formula_bank.yaml"
    with open(out_path, "w", encoding="utf-8") as f:
        f.write("---\n")
        yaml.dump(all_formulas, f, default_flow_style=False, allow_unicode=True, sort_keys=False)

    print(f"\nTOTAL: {len(all_formulas)} chemistry formulas")
    print(f"Written to: {out_path}")
    print("NEW file only — no existing files modified.")
