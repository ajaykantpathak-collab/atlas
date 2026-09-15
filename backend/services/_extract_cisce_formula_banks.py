"""Extract CISCE formula bank markers into YAML format.
READ-ONLY: reads D:\cisce\{subject}\formula_bank\*.marker
Writes NEW files to D:\platform\backend\formulas\cisce\
Does NOT modify any existing files.
"""
import re, os, yaml
from pathlib import Path

CISCE = Path(r"D:\cisce")
OUT = Path(r"D:\platform\backend\formulas\cisce")
OUT.mkdir(parents=True, exist_ok=True)

SUBJECT_MAP = {
    "physics": "physics",
    "chem": "chemistry",
    "maths": "mathematics",
    "bio": "biology",
    "biotech": "biotechnology",
    "geo": "geography",
    "appmath": "applied_mathematics",
    "cs": "computer_science",
    "evs": "environmental_science",
    "home": "home_science",
    "legal": "legal_studies",
    "massmedia": "mass_media",
    "pol": "political_science",
    "psy": "psychology",
    "soc": "sociology",
}

def parse_marker(text, filename):
    """Parse a formula bank marker file into structured formula entries."""
    formulas = []

    # Extract metadata
    node_id = ""
    title = ""
    cls = ""
    subject = ""

    for line in text.split("\n"):
        if line.startswith("NODE_ID:"):
            node_id = line.split(":", 1)[1].strip()
        elif line.startswith("TITLE:"):
            title = line.split(":", 1)[1].strip()
        elif line.startswith("CLASS:"):
            cls = line.split(":", 1)[1].strip()
        elif line.startswith("SUBJECT:"):
            subject = line.split(":", 1)[1].strip()

    # Extract sections (=== SECTION NAME ===)
    section_pattern = re.compile(r"===\s*(.+?)\s*===", re.MULTILINE)
    sections = list(section_pattern.finditer(text))

    for i, sec_match in enumerate(sections):
        sec_name = sec_match.group(1).strip()
        sec_start = sec_match.end()
        sec_end = sections[i + 1].start() if i + 1 < len(sections) else len(text)
        sec_text = text[sec_start:sec_end].strip()

        # Extract individual formulas from this section
        # Pattern: - Name: formula  OR  - formula = expression
        lines = sec_text.split("\n")
        current_formula = None

        for line in lines:
            line = line.strip()
            if not line:
                continue

            # Formula lines: start with - and contain = or mathematical expression
            if line.startswith("- ") and ("=" in line or any(c in line for c in ["^", "sqrt", "sin", "cos", "tan", "pi", "log"])):
                formula_text = line[2:].strip()

                # Parse name and expression
                if ":" in formula_text and "=" in formula_text:
                    # Format: Name: expression = value
                    parts = formula_text.split(":", 1)
                    name = parts[0].strip()
                    expr = parts[1].strip() if len(parts) > 1 else ""
                elif "=" in formula_text:
                    parts = formula_text.split("=", 1)
                    name = parts[0].strip()
                    expr = parts[1].strip() if len(parts) > 1 else ""
                elif ":" in formula_text:
                    parts = formula_text.split(":", 1)
                    name = parts[0].strip()
                    expr = parts[1].strip() if len(parts) > 1 else ""
                else:
                    name = formula_text
                    expr = ""

                # Clean up
                name = name.rstrip(":").strip()
                expr = expr.strip()

                if not name or len(name) < 2:
                    continue
                if name.lower() in ["example", "limitation", "note", "dimensional check", "dimensional formula"]:
                    continue

                # Extract variables
                variables = []
                var_pattern = re.compile(r'\b([a-zA-Z])\b')
                reserved = {"T", "H", "R", "L", "g", "h", "r", "v", "u", "a", "s", "t", "n", "m", "M", "p", "q", "P", "V", "I", "W", "E", "F", "d", "k", "x", "y", "z", "f", "e", "c", "b", "C", "N", "A", "Q", "S", "D"}
                for vm in var_pattern.finditer(expr):
                    v = vm.group(1)
                    if v not in [x["symbol"] for x in variables]:
                        variables.append({"symbol": v, "name": v, "unit": "", "dimensional_formula": "", "quantity_type": ""})

                formulas.append({
                    "formula_id": f"CISCE_{node_id}_{sec_name[:10].upper().replace(' ','_')}_{len(formulas)+1:03d}",
                    "name": name,
                    "latex": expr.replace("^", "**").replace("pi", r"\pi").replace("sqrt", r"\sqrt").replace("theta", r"\theta").replace("deg", r"^{\circ}"),
                    "variables": variables,
                    "preconditions": [],
                    "grade_range": [f"class{cls}"] if cls else [],
                    "chapter": sec_name,
                    "subject": subject.lower() if subject else "",
                    "concept_tags": [name.lower().replace(" ", "-"), sec_name.lower().replace(" ", "-")],
                    "related_formulas": [],
                    "source": f"cisce/{filename}",
                    "board": "CISCE",
                })

    return formulas, node_id, title, cls, subject

if __name__ == "__main__":
    print("=" * 70)
    print("EXTRACTING CISCE FORMULA BANKS")
    print("=" * 70)

    all_formulas = []
    counts = {}

    for subj_dir, subject_name in SUBJECT_MAP.items():
        fb_dir = CISCE / subj_dir / "formula_bank"
        if not fb_dir.exists():
            continue

        subj_formulas = []
        for marker_file in sorted(fb_dir.glob("*.marker")):
            text = marker_file.read_text(encoding="utf-8", errors="replace")
            formulas, node_id, title, cls, subj = parse_marker(text, marker_file.name)
            subj_formulas.extend(formulas)
            print(f"  {marker_file.name}: {len(formulas)} formulas")

        if subj_formulas:
            out_path = OUT / f"cisce_{subject_name}_formula_bank.yaml"
            with open(out_path, "w", encoding="utf-8") as f:
                f.write("---\n")
                yaml.dump(subj_formulas, f, default_flow_style=False, allow_unicode=True, sort_keys=False)
            counts[subject_name] = len(subj_formulas)
            all_formulas.extend(subj_formulas)
            print(f"  -> {subject_name}: {len(subj_formulas)} formulas -> {out_path.name}")

    print("\n" + "=" * 70)
    print("CISCE FORMULA BANK EXTRACTION COMPLETE")
    print("=" * 70)
    total = sum(counts.values())
    for k, v in sorted(counts.items()):
        print(f"  {k}: {v}")
    print(f"  TOTAL: {total}")
    print(f"\nAll files written to: {OUT}")
    print("These are NEW files — no existing files were modified.")
