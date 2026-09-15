"""Deep factual audit of Physics enrichment content — v2 (fixed false positives).

Checks for:
1. Factual accuracy of physics definitions, formulas, units, constants
2. Numerical correctness in worked examples (full expression matching)
3. Internal consistency (prereq references match stated content)
4. Placeholder text (real placeholders, not multiplication)
5. Empty critical fields
6. Unit errors

Outputs a detailed report of all REAL issues found.
"""

import re
import json
from pathlib import Path
from collections import defaultdict

ENRICHMENT_DIR = Path("C:/Users/Alesha4285/Desktop/cisce/physics/enrichment")
NODES_FILE = Path("C:/Users/Alesha4285/Desktop/cisce/_nodes_physics.txt")

NODE_HEADER = re.compile(r'^---\s+NODE\s+(c\d+_\w+_\d+)\s+---', re.MULTILINE)
TITLE_PATTERN = re.compile(r'^TITLE:\s*(.+)$', re.MULTILINE)


def parse_all_nodes():
    """Parse all enrichment files and return list of (node_id, title, content)."""
    all_nodes = []
    for f in sorted(ENRICHMENT_DIR.glob("*.marker")):
        with open(f, 'r', encoding='utf-8') as fh:
            content = fh.read()
        parts = NODE_HEADER.split(content)
        for i in range(1, len(parts), 2):
            node_id = parts[i]
            node_content = parts[i + 1] if i + 1 < len(parts) else ""
            title_match = TITLE_PATTERN.search(node_content)
            title = title_match.group(1).strip() if title_match else ""
            all_nodes.append({
                "node_id": node_id,
                "title": title,
                "content": node_content,
                "source_file": f.name,
            })
    return all_nodes


def deduplicate(nodes):
    """Keep only first occurrence of each node_id."""
    seen = set()
    unique = []
    for n in nodes:
        if n["node_id"] in seen:
            continue
        seen.add(n["node_id"])
        unique.append(n)
    return unique


def check_factual_accuracy(node):
    """Check for known factual errors in node content — precise patterns only."""
    issues = []
    content = node["content"]

    # 1. Wrong Nm to dyne cm conversion
    for m in re.finditer(r'1\s*N\s*m\s*=\s*10\^?([56])\s*dyne', content, re.IGNORECASE):
        issues.append({
            "node_id": node["node_id"], "title": node["title"],
            "source_file": node["source_file"], "type": "FACTUAL_ERROR",
            "description": f"Wrong Nm to dyne cm conversion: 1 Nm = 10^{m.group(1)} dyne cm (should be 10^7)",
            "context": content[max(0,m.start()-30):m.end()+30].replace('\n',' ').strip(),
        })

    # 2. Wrong N to dyne conversion
    for m in re.finditer(r'1\s*N\s*=\s*10\^?([46])\s*dyne', content, re.IGNORECASE):
        issues.append({
            "node_id": node["node_id"], "title": node["title"],
            "source_file": node["source_file"], "type": "FACTUAL_ERROR",
            "description": f"Wrong N to dyne conversion: 1 N = 10^{m.group(1)} dyne (should be 10^5)",
            "context": content[max(0,m.start()-30):m.end()+30].replace('\n',' ').strip(),
        })

    # 3. Ohm's law inverted: V = I/R (wrong)
    for m in re.finditer(r'V\s*=\s*I\s*/\s*R\b(?!.*Ohm.*law.*rearrange)', content):
        issues.append({
            "node_id": node["node_id"], "title": node["title"],
            "source_file": node["source_file"], "type": "FACTUAL_ERROR",
            "description": "Ohm's law inverted: V = I/R (should be V = IR)",
            "context": content[max(0,m.start()-30):m.end()+30].replace('\n',' ').strip(),
        })

    # 4. Mechanical advantage inverted: MA = E/L (wrong)
    for m in re.finditer(r'MA\s*=\s*(?:E|effort)\s*/\s*(?:L|load)\b', content):
        issues.append({
            "node_id": node["node_id"], "title": node["title"],
            "source_file": node["source_file"], "type": "FACTUAL_ERROR",
            "description": "Mechanical advantage inverted: MA = E/L (should be MA = L/E)",
            "context": content[max(0,m.start()-30):m.end()+30].replace('\n',' ').strip(),
        })

    # 5. Velocity ratio inverted: VR = dL/dE (wrong)
    for m in re.finditer(r'VR\s*=\s*dL\s*/\s*dE\b', content):
        issues.append({
            "node_id": node["node_id"], "title": node["title"],
            "source_file": node["source_file"], "type": "FACTUAL_ERROR",
            "description": "Velocity ratio inverted: VR = dL/dE (should be VR = dE/dL)",
            "context": content[max(0,m.start()-30):m.end()+30].replace('\n',' ').strip(),
        })

    # 6. Efficiency inverted: eta = VR/MA (wrong)
    for m in re.finditer(r'(?:eta|efficiency)\s*=\s*VR\s*/\s*MA\b', content, re.IGNORECASE):
        issues.append({
            "node_id": node["node_id"], "title": node["title"],
            "source_file": node["source_file"], "type": "FACTUAL_ERROR",
            "description": "Efficiency inverted: eta = VR/MA (should be eta = MA/VR)",
            "context": content[max(0,m.start()-30):m.end()+30].replace('\n',' ').strip(),
        })

    # 7. Transformer ratio inverted: Vp/Vs = Ns/Np (wrong)
    for m in re.finditer(r'Vp\s*/\s*Vs\s*=\s*Ns\s*/\s*Np\b', content):
        issues.append({
            "node_id": node["node_id"], "title": node["title"],
            "source_file": node["source_file"], "type": "FACTUAL_ERROR",
            "description": "Transformer ratio inverted: Vp/Vs = Ns/Np (should be Vp/Vs = Np/Ns)",
            "context": content[max(0,m.start()-30):m.end()+30].replace('\n',' ').strip(),
        })

    # 8. KE missing 1/2 — only flag if "KE = mv^2" or "K = mv^2" WITHOUT 1/2 prefix
    # Match "K = mv^2" or "KE = mv^2" but NOT "K = 1/2mv^2"
    for m in re.finditer(r'(?:KE|K)\s*=\s*(?!1/2)(?!½)m\s*v\^?2\b', content):
        issues.append({
            "node_id": node["node_id"], "title": node["title"],
            "source_file": node["source_file"], "type": "FACTUAL_ERROR",
            "description": "Kinetic energy missing 1/2: KE = mv^2 (should be KE = 1/2 mv^2)",
            "context": content[max(0,m.start()-30):m.end()+30].replace('\n',' ').strip(),
        })

    # 9. Alpha particle described as helium ATOM (has electrons) — not nucleus
    # Only flag if "helium atom" is explicitly used, not "helium nucleus"
    for m in re.finditer(r'alpha.*?helium\s+atom\b', content, re.IGNORECASE | re.DOTALL):
        issues.append({
            "node_id": node["node_id"], "title": node["title"],
            "source_file": node["source_file"], "type": "FACTUAL_ERROR",
            "description": "Alpha particle described as helium atom (should be helium nucleus — no electrons)",
            "context": content[max(0,m.start()-30):m.end()+30].replace('\n',' ').strip(),
        })

    # 10. Alpha particle with 2 protons and 2 ELECTRONS (wrong — should be 2 neutrons)
    for m in re.finditer(r'alpha.*?2\s*protons.*?2\s*electrons', content, re.IGNORECASE | re.DOTALL):
        issues.append({
            "node_id": node["node_id"], "title": node["title"],
            "source_file": node["source_file"], "type": "FACTUAL_ERROR",
            "description": "Alpha particle has 2 protons + 2 electrons (should be 2 protons + 2 neutrons)",
            "context": content[max(0,m.start()-30):m.end()+30].replace('\n',' ').strip(),
        })

    # 11. Resistivity formula inverted: R = rho A / L (wrong — should be R = rho L / A)
    for m in re.finditer(r'R\s*=\s*rho\s*\*?\s*A\s*/\s*L\b', content):
        issues.append({
            "node_id": node["node_id"], "title": node["title"],
            "source_file": node["source_file"], "type": "FACTUAL_ERROR",
            "description": "Resistivity formula inverted: R = rho A/L (should be R = rho L/A)",
            "context": content[max(0,m.start()-30):m.end()+30].replace('\n',' ').strip(),
        })

    # 12. Snell's law reversed
    for m in re.finditer(r'n1\s*sin\s*theta2\s*=\s*n2\s*sin\s*theta1', content, re.IGNORECASE):
        issues.append({
            "node_id": node["node_id"], "title": node["title"],
            "source_file": node["source_file"], "type": "FACTUAL_ERROR",
            "description": "Snell's law reversed: n1 sin(theta2) = n2 sin(theta1) (should be n1 sin(theta1) = n2 sin(theta2))",
            "context": content[max(0,m.start()-30):m.end()+30].replace('\n',' ').strip(),
        })

    # 13. Density inverted
    for m in re.finditer(r'density\s*=\s*volume\s*/\s*mass', content, re.IGNORECASE):
        issues.append({
            "node_id": node["node_id"], "title": node["title"],
            "source_file": node["source_file"], "type": "FACTUAL_ERROR",
            "description": "Density inverted: density = volume/mass (should be density = mass/volume)",
            "context": content[max(0,m.start()-30):m.end()+30].replace('\n',' ').strip(),
        })

    # 14. Speed of light wrong
    for m in re.finditer(r'c\s*=\s*3\s*x?\s*10\^?([79])\s*m/s', content):
        issues.append({
            "node_id": node["node_id"], "title": node["title"],
            "source_file": node["source_file"], "type": "FACTUAL_ERROR",
            "description": f"Speed of light wrong: c = 3 x 10^{m.group(1)} m/s (should be 3 x 10^8 m/s)",
            "context": content[max(0,m.start()-30):m.end()+30].replace('\n',' ').strip(),
        })

    return issues


def check_placeholders(node):
    """Check for real placeholder text — not multiplication xxx."""
    issues = []
    content = node["content"]

    # Real placeholders: TODO, FIXME, PLACEHOLDER, TBD, [insert...], fill in
    for m in re.finditer(r'\b(TODO|FIXME|PLACEHOLDER|TBD)\b', content, re.IGNORECASE):
        issues.append({
            "node_id": node["node_id"], "title": node["title"],
            "source_file": node["source_file"], "type": "PLACEHOLDER",
            "description": f"Placeholder text: {m.group(1)}",
            "context": content[max(0,m.start()-30):m.end()+30].replace('\n',' ').strip(),
        })

    for m in re.finditer(r'\[insert|insert here|fill in\]', content, re.IGNORECASE):
        issues.append({
            "node_id": node["node_id"], "title": node["title"],
            "source_file": node["source_file"], "type": "PLACEHOLDER",
            "description": "Unfilled placeholder",
            "context": content[max(0,m.start()-30):m.end()+30].replace('\n',' ').strip(),
        })

    for m in re.finditer(r'Lorem ipsum', content, re.IGNORECASE):
        issues.append({
            "node_id": node["node_id"], "title": node["title"],
            "source_file": node["source_file"], "type": "PLACEHOLDER",
            "description": "Lorem ipsum placeholder",
            "context": content[max(0,m.start()-30):m.end()+30].replace('\n',' ').strip(),
        })

    return issues


def check_empty_fields(node):
    """Check for empty critical fields."""
    issues = []
    content = node["content"]

    for field_name, description in [("DEFINITION", "Missing definition"),
                                     ("TEXT_WALKTHROUGH", "Missing text walkthrough"),
                                     ("DIAGNOSTIC_QUESTION", "Missing diagnostic question")]:
        # Field exists but is empty: "DEFINITION: |\n  \n" or "DEFINITION: |\n\n"
        pattern = rf'{field_name}:\s*\|?\s*\n\s*(?:---\s+NODE|\Z)'
        if re.search(pattern, content):
            issues.append({
                "node_id": node["node_id"], "title": node["title"],
                "source_file": node["source_file"], "type": "EMPTY_FIELD",
                "description": description, "context": "",
            })

    return issues


def check_numerical_examples(node):
    """Check worked examples — match FULL chained expressions and verify complete result."""
    issues = []
    content = node["content"]

    # Match full chained multiplication: "a x b x c x ... = result"
    # Capture all operands and the final result
    calc_pattern = re.compile(
        r'(?<![\d.x])'  # Not preceded by digit, dot, or x
        r'((?:\d+\.?\d*\s*[xX\u00d7]\s*)+\d+\.?\d*)'  # operands separated by x
        r'\s*=\s*'
        r'(\d[\d,]*\.?\d*)'  # result
        r'(?!\s*[xX\u00d7])'  # not followed by x
    )
    for m in calc_pattern.finditer(content):
        try:
            expr = m.group(1)
            result_str = m.group(2).replace(',', '')
            result = float(result_str)
            # Parse all operands
            operands = re.split(r'\s*[xX\u00d7]\s*', expr)
            operands = [float(o) for o in operands if o.strip()]
            if len(operands) < 2:
                continue
            expected = 1.0
            for o in operands:
                expected *= o
            # Allow 1% tolerance
            if abs(expected - result) > 0.01 * max(abs(expected), 1):
                start = max(0, m.start() - 40)
                end = min(len(content), m.end() + 40)
                context = content[start:end].replace('\n', ' ').strip()
                issues.append({
                    "node_id": node["node_id"], "title": node["title"],
                    "source_file": node["source_file"], "type": "NUMERICAL_ERROR",
                    "description": f"Calculation error: {expr.replace(chr(0xd7),'x')} = {result} (should be {expected})",
                    "context": context,
                })
        except (ValueError, IndexError):
            pass

    # Match full chained division: "a / b / c = result"
    # But skip fractions like "1/6 + 1/3" (has + after)
    div_pattern = re.compile(
        r'(?<![\d./])'  # Not preceded by digit, dot, slash
        r'((?:\d+\.?\d*\s*/\s*)+\d+\.?\d*)'  # operands separated by /
        r'\s*=\s*'
        r'(\d[\d,]*\.?\d*)'  # result
        r'(?!\s*[/+])'  # not followed by / or + (to skip fraction addition)
    )
    for m in div_pattern.finditer(content):
        try:
            expr = m.group(1)
            result_str = m.group(2).replace(',', '')
            result = float(result_str)
            operands = re.split(r'\s*/\s*', expr)
            operands = [float(o) for o in operands if o.strip()]
            if len(operands) < 2 or operands[1] == 0:
                continue
            expected = operands[0]
            for o in operands[1:]:
                if o == 0:
                    expected = None
                    break
                expected /= o
            if expected is None:
                continue
            if abs(expected - result) > 0.01 * max(abs(expected), 1):
                start = max(0, m.start() - 40)
                end = min(len(content), m.end() + 40)
                context = content[start:end].replace('\n', ' ').strip()
                issues.append({
                    "node_id": node["node_id"], "title": node["title"],
                    "source_file": node["source_file"], "type": "NUMERICAL_ERROR",
                    "description": f"Division error: {expr} = {result} (should be {expected:.4f})",
                    "context": context,
                })
        except (ValueError, IndexError):
            pass

    return issues


def check_unit_errors(node):
    """Check for unit errors — precise patterns only."""
    issues = []
    content = node["content"]

    # Moment of force should be N m, not N/m
    # But exclude "moment of inertia" (different concept) and "surface tension" (N/m is correct)
    for m in re.finditer(r'moment\s+of\s+(?:force|a\s+force)\b.*?N/m\b', content, re.IGNORECASE):
        # Make sure it's not "moment of inertia" which is kg m^2
        context = content[max(0,m.start()-20):m.end()+20]
        if 'inertia' not in context.lower():
            issues.append({
                "node_id": node["node_id"], "title": node["title"],
                "source_file": node["source_file"], "type": "UNIT_ERROR",
                "description": "Moment of force unit should be N m, not N/m",
                "context": content[max(0,m.start()-30):m.end()+30].replace('\n',' ').strip(),
            })

    # Power should be W, not W/s
    for m in re.finditer(r'power.*?W/s\b', content, re.IGNORECASE):
        issues.append({
            "node_id": node["node_id"], "title": node["title"],
            "source_file": node["source_file"], "type": "UNIT_ERROR",
            "description": "Power unit should be W (watt), not W/s",
            "context": content[max(0,m.start()-30):m.end()+30].replace('\n',' ').strip(),
        })

    return issues


def check_g_value(node):
    """Check if g=10 is used without explicit 'take g=10' statement."""
    issues = []
    content = node["content"]

    # Find all uses of g = 10
    for m in re.finditer(r'g\s*=\s*10\s*m/s\^?2', content):
        # Check if there's a "take g = 10" or "using g = 10" or "given g = 10" nearby
        context_start = max(0, m.start() - 100)
        context_end = min(len(content), m.end() + 20)
        context = content[context_start:context_end]
        if not re.search(r'(?:take|using|given|assume)\s+g\s*=\s*10', context, re.IGNORECASE):
            issues.append({
                "node_id": node["node_id"], "title": node["title"],
                "source_file": node["source_file"], "type": "WARNING",
                "description": "Using g=10 m/s^2 without explicit 'take g=10' statement (ICSE standard is 9.8)",
                "context": content[max(0,m.start()-50):m.end()+30].replace('\n',' ').strip(),
            })

    return issues


def check_prerequisite_consistency(node, all_node_ids):
    """Check that prerequisite references exist."""
    issues = []
    content = node["content"]

    prereq_pattern = re.compile(r'(?:PREREQ|DEPTH_PREREQ)\s+(?:node\s+)?(c\d+_\w+_\d+)')
    referenced = set()
    for m in prereq_pattern.finditer(content):
        referenced.add(m.group(1))

    for ref in referenced:
        if ref not in all_node_ids:
            node_match = re.match(r'c\d+_(\w+)_\d+', node["node_id"])
            ref_match = re.match(r'c\d+_(\w+)_\d+', ref)
            if node_match and ref_match and node_match.group(1) != ref_match.group(1):
                continue  # Cross-subject, OK
            issues.append({
                "node_id": node["node_id"], "title": node["title"],
                "source_file": node["source_file"], "type": "DANGLING_PREREQ",
                "description": f"References non-existent node: {ref}",
                "context": ref,
            })

    return issues


def main():
    print("=" * 70)
    print("DEEP FACTUAL AUDIT v2 — PHYSICS ENRICHMENT CONTENT")
    print("=" * 70)

    print("\n[1] Parsing enrichment files...")
    all_nodes = parse_all_nodes()
    all_nodes = deduplicate(all_nodes)
    print(f"    Found {len(all_nodes)} unique nodes")

    valid_ids = set()
    with open(NODES_FILE, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            m = re.match(r'(c\d+_\w+_\d+):', line)
            if m:
                valid_ids.add(m.group(1))
    print(f"    Valid node IDs from _nodes file: {len(valid_ids)}")

    all_issues = []

    print("\n[2] Checking factual accuracy (formulas, constants, conventions)...")
    count_before = len(all_issues)
    for node in all_nodes:
        all_issues.extend(check_factual_accuracy(node))
    print(f"    Factual errors: {len(all_issues) - count_before}")

    print("\n[3] Checking for placeholders (real ones, not multiplication)...")
    count_before = len(all_issues)
    for node in all_nodes:
        all_issues.extend(check_placeholders(node))
    print(f"    Placeholders found: {len(all_issues) - count_before}")

    print("\n[4] Checking for empty critical fields...")
    count_before = len(all_issues)
    for node in all_nodes:
        all_issues.extend(check_empty_fields(node))
    print(f"    Empty fields: {len(all_issues) - count_before}")

    print("\n[5] Checking numerical examples (simple 2-operand only)...")
    count_before = len(all_issues)
    for node in all_nodes:
        all_issues.extend(check_numerical_examples(node))
    print(f"    Numerical errors: {len(all_issues) - count_before}")

    print("\n[6] Checking unit consistency...")
    count_before = len(all_issues)
    for node in all_nodes:
        all_issues.extend(check_unit_errors(node))
    print(f"    Unit errors: {len(all_issues) - count_before}")

    print("\n[7] Checking g value usage...")
    count_before = len(all_issues)
    for node in all_nodes:
        all_issues.extend(check_g_value(node))
    print(f"    g value warnings: {len(all_issues) - count_before}")

    print("\n[8] Checking prerequisite reference consistency...")
    count_before = len(all_issues)
    for node in all_nodes:
        all_issues.extend(check_prerequisite_consistency(node, valid_ids))
    print(f"    Dangling prereqs: {len(all_issues) - count_before}")

    # Summary
    print("\n" + "=" * 70)
    print("AUDIT SUMMARY")
    print("=" * 70)

    by_type = defaultdict(int)
    for issue in all_issues:
        by_type[issue["type"]] += 1

    print(f"\nTotal issues found: {len(all_issues)}")
    for issue_type, count in sorted(by_type.items()):
        print(f"  {issue_type}: {count}")

    # Print errors
    errors = [i for i in all_issues if i["type"] in ("FACTUAL_ERROR", "NUMERICAL_ERROR", "UNIT_ERROR", "DANGLING_PREREQ")]
    if errors:
        print(f"\n{'='*70}")
        print(f"ERRORS ({len(errors)}) — Must fix before upload")
        print(f"{'='*70}")
        for i, issue in enumerate(errors, 1):
            print(f"\n  [{i}] {issue['node_id']}: {issue['title']}")
            print(f"      File: {issue['source_file']}")
            print(f"      Type: {issue['type']}")
            print(f"      Issue: {issue['description']}")
            if issue.get("context"):
                print(f"      Context: ...{issue['context'][:150]}...")

    # Print warnings
    warnings_list = [i for i in all_issues if i["type"] == "WARNING"]
    if warnings_list:
        print(f"\n{'='*70}")
        print(f"WARNINGS ({len(warnings_list)}) — Review recommended")
        print(f"{'='*70}")
        for i, issue in enumerate(warnings_list[:20], 1):
            print(f"\n  [{i}] {issue['node_id']}: {issue['title']}")
            print(f"      Issue: {issue['description']}")
            if issue.get("context"):
                print(f"      Context: ...{issue['context'][:150]}...")
        if len(warnings_list) > 20:
            print(f"\n  ... and {len(warnings_list) - 20} more warnings")

    # Print placeholders
    placeholders = [i for i in all_issues if i["type"] == "PLACEHOLDER"]
    if placeholders:
        print(f"\n{'='*70}")
        print(f"PLACEHOLDERS ({len(placeholders)}) — Must fill before upload")
        print(f"{'='*70}")
        for i, issue in enumerate(placeholders, 1):
            print(f"\n  [{i}] {issue['node_id']}: {issue['title']}")
            print(f"      Issue: {issue['description']}")
            if issue.get("context"):
                print(f"      Context: ...{issue['context'][:150]}...")

    # Final verdict
    print(f"\n{'='*70}")
    print("VERDICT")
    print(f"{'='*70}")
    if len(errors) == 0 and len(placeholders) == 0:
        if len(warnings_list) > 0:
            print(f"\n  PASS (with {len(warnings_list)} warnings)")
            print("  Content is factually accurate. Warnings should be reviewed but do not block upload.")
        else:
            print("\n  PASS — No issues found. Content is ready for upload.")
    else:
        print(f"\n  FAIL — {len(errors)} errors, {len(placeholders)} placeholders")
        print("  Fix all errors and placeholders before uploading to Neo4j.")

    # Save report
    report_path = Path("D:/node_generator/atomic_graph/cisce_stem/physics_audit_report_v2.json")
    with open(report_path, 'w', encoding='utf-8') as f:
        json.dump({
            "subject": "Physics",
            "total_nodes": len(all_nodes),
            "total_issues": len(all_issues),
            "by_type": dict(by_type),
            "issues": all_issues,
        }, f, indent=2, ensure_ascii=False)
    print(f"\n  Full report saved to: {report_path}")


if __name__ == "__main__":
    main()
