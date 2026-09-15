"""Extract CISCE biology + other thin subjects with improved parser.
READ-ONLY: reads marker files, writes NEW yaml files.
"""
import re, yaml
from pathlib import Path

CISCE = Path(r"D:\cisce")
OUT = Path(r"D:\platform\backend\formulas\cisce")
OUT.mkdir(parents=True, exist_ok=True)

SUBJECT_DIRS = {
    "bio": "biology",
    "geo": "geography",
    "appmath": "applied_mathematics",
    "cs": "computer_science",
    "evs": "environmental_science",
    "biotech": "biotechnology",
    "home": "home_science",
    "legal": "legal_studies",
    "massmedia": "mass_media",
    "pol": "political_science",
    "psy": "psychology",
    "soc": "sociology",
}

def parse_marker(text, filename, subject):
    """Parse formula bank marker into structured entries — improved parser."""
    formulas = []

    node_id = ""
    cls = ""
    for line in text.split("\n"):
        if line.startswith("NODE_ID:"):
            node_id = line.split(":", 1)[1].strip()
        elif line.startswith("CLASS:"):
            cls = line.split(":", 1)[1].strip()
        elif line.startswith("Target class:"):
            cls = line.split(":", 1)[1].strip()

    # Extract sections
    section_pattern = re.compile(r"===\s*(.+?)\s*===", re.MULTILINE)
    sections = list(section_pattern.finditer(text))

    if not sections:
        return formulas

    for i, sec_match in enumerate(sections):
        sec_name = sec_match.group(1).strip()
        sec_start = sec_match.end()
        sec_end = sections[i + 1].start() if i + 1 < len(sections) else len(text)
        sec_text = text[sec_start:sec_end].strip()

        lines = sec_text.split("\n")
        for line in lines:
            line = line.strip()
            if not line:
                continue
            # Skip metadata
            if line.startswith(("---", "NODE_", "TITLE:", "CLASS:", "SUBJECT:", "UNIT:", "CHAPTER:", "SYLLABUS:", "Target class:")):
                continue
            # Skip qualitative notes
            if line.startswith(("Le Chatelier", "Catalyst", "Increase", "Add ", "Reverse", "Multiply", "UNIT CHECK", "Limitation", "Note:", "Example", "Occurs when", "Kranz", "RuBisCO =")):
                continue
            # Skip sub-labels (indented descriptions without formula chars)
            if line.endswith(":") and not any(c in line for c in ["=", "^", "/", "*"]):
                continue

            name = ""
            expr = ""

            if ":" in line and "=" in line:
                colon_pos = line.find(":")
                eq_pos = line.find("=")
                if colon_pos < eq_pos:
                    name = line[:colon_pos].strip()
                    expr = line[colon_pos + 1:].strip()
                else:
                    name = line.split("=")[0].strip()
                    expr = line.split("=", 1)[1].strip() if "=" in line else ""
            elif ":" in line:
                parts = line.split(":", 1)
                name = parts[0].strip()
                expr = parts[1].strip() if len(parts) > 1 else ""
            elif "=" in line:
                parts = line.split("=", 1)
                name = parts[0].strip()
                expr = parts[1].strip() if len(parts) > 1 else ""
            elif "->" in line:
                # Biochemical reaction
                name = line.split("->")[0].strip()[:60]
                expr = line
            else:
                if len(line) > 100:
                    continue
                if not any(c in line for c in ["^", "/", "*", "+", "sqrt", "log"]):
                    continue
                name = line[:60]
                expr = line

            name = name.rstrip(":").strip()
            expr = expr.strip()

            if not name or len(name) < 2 or len(name) > 100:
                continue
            if name.lower() in ["unit check", "limitation", "note", "example", "qualitative", "no formula"]:
                continue

            # Must have some formula-like content
            has_formula = any(c in (name + expr) for c in ["=", "^", "/", "*", "+", "-", "sqrt", "log", "sin", "cos", "pi", "Delta", "Sigma", "->"])
            if not has_formula and not expr:
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

            # Determine grade range from cls
            grade_range = []
            if cls:
                if "-" in cls:
                    parts = cls.split("-")
                    try:
                        start = int(parts[0].strip().replace("c", ""))
                        end = int(parts[1].strip().replace("c", ""))
                        for c in range(start, end + 1):
                            grade_range.append(f"class{c}")
                    except:
                        grade_range = [f"class{cls}"]
                else:
                    grade_range = [f"class{cls}"]

            formulas.append({
                "formula_id": f"CISCE_{subject.upper()[:4]}_{node_id}_{len(formulas)+1:03d}",
                "name": name,
                "latex": latex,
                "variables": [],
                "preconditions": [],
                "grade_range": grade_range,
                "chapter": sec_name,
                "subject": subject,
                "concept_tags": [name.lower().replace(" ", "-").replace("/", "-")[:30], sec_name.lower().replace(" ", "-")[:30]],
                "related_formulas": [],
                "source": f"cisce/{filename}",
                "board": "CISCE",
            })

    return formulas

if __name__ == "__main__":
    print("=" * 70)
    print("EXTRACTING CISCE FORMULA BANKS (IMPROVED PARSER)")
    print("=" * 70)

    grand_total = 0

    for subj_dir, subject_name in SUBJECT_DIRS.items():
        fb_dir = CISCE / subj_dir / "formula_bank"
        if not fb_dir.exists():
            continue

        subj_formulas = []
        for marker_file in sorted(fb_dir.glob("*.marker")):
            text = marker_file.read_text(encoding="utf-8", errors="replace")
            formulas = parse_marker(text, marker_file.name, subject_name)
            subj_formulas.extend(formulas)
            if formulas:
                print(f"  {marker_file.name}: {len(formulas)} formulas")

        if subj_formulas:
            out_path = OUT / f"cisce_{subject_name}_formula_bank.yaml"
            with open(out_path, "w", encoding="utf-8") as f:
                f.write("---\n")
                yaml.dump(subj_formulas, f, default_flow_style=False, allow_unicode=True, sort_keys=False)
            grand_total += len(subj_formulas)
            print(f"  -> {subject_name}: {len(subj_formulas)} formulas")
        print()

    print("=" * 70)
    print(f"TOTAL EXTRACTED: {grand_total}")
    print("NEW files only — no existing files modified.")
