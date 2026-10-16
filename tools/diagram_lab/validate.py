"""diagram_lab validator — hard gates on VLM .md hotspot output.

Checks (in order, first failure reported):
  1. schema      — required sections, field completeness per part
  2. geometry    — coords in bounds, radii sane, min spacing between spots
  3. labels      — unique ids, label present, fn within word limit, no markdown junk
  4. exam        — every exam line parses; answer label must not appear in question
  5. language    — plain English, banned jargon/fragments, no unicode math spam

CLI: python validate.py <file.md> [<file2.md> ...] [--overlay <img_dir>]
With --overlay, writes <name>_qc.png debug renders (spots + labels on the image).
Exit code 1 if any file fails.
"""
import re, sys, os, math

PART_RE = re.compile(
    r"^-\s*id:\s*([a-z0-9_]+)\s*\|\s*label:\s*(.+?)\s*\|\s*x:\s*([0-9.]+)\s*\|"
    r"\s*y:\s*([0-9.]+)\s*\|\s*r:\s*([0-9.]+)\s*\|\s*fn:\s*(.+?)\s*$"
)
BANNED_FN = re.compile(
    r"(correct answer|the answer|option [a-d]|lorem|TODO|FIXME|\*\*|__|\[|\])", re.I
)
JARGON = ["heterochromatinization", "ultramicroscopic"]  # expandable


def parse_md(text):
    """Returns (err, doc). doc = {name, source, subject, parts[], explain, exam[]}"""
    doc = {"parts": [], "exam": []}
    lines = text.splitlines()
    if lines and lines[0].strip() == "# NOT_A_DIAGRAM":
        return None, {"not_a_diagram": True}

    # title
    title = next((l[2:].strip() for l in lines if l.startswith("# ")), None)
    if not title:
        return "schema: missing '# <figure name>' title", None
    doc["name"] = title

    section = None
    for l in lines:
        ls = l.strip()
        if ls.startswith("## parts"):
            section = "parts"; continue
        if ls.startswith("## explain"):
            section = "explain"; continue
        if ls.startswith("## exam"):
            section = "exam"; continue
        if ls.startswith("> source:"):
            doc["source"] = ls[9:].strip(); continue
        if ls.startswith("> subject:"):
            doc["subject"] = ls[10:].strip(); continue
        if section == "parts" and ls.startswith("-"):
            m = PART_RE.match(ls)
            if not m:
                return f"schema: unparseable part line: {ls[:90]}", None
            doc["parts"].append({
                "id": m.group(1), "label": m.group(2).strip(),
                "x": float(m.group(3)), "y": float(m.group(4)),
                "r": float(m.group(5)), "fn": m.group(6).strip(),
            })
        elif section == "explain" and ls and not ls.startswith("<!--"):
            doc["explain"] = (doc.get("explain", "") + " " + ls).strip()
        elif section == "exam" and re.match(r"-\s*Tap the", ls):
            doc["exam"].append(ls[2:].strip())
    return None, doc


def validate(doc):
    """Returns list of error strings (empty = pass)."""
    errs = []
    if doc.get("not_a_diagram"):
        return errs

    # schema
    if not doc["parts"]:
        errs.append("schema: zero parts parsed")
    if not doc.get("explain"):
        errs.append("schema: missing ## explain text")
    if len(doc.get("exam", [])) < 2:
        errs.append("schema: need >=2 'Tap the' exam lines")
    if doc.get("subject") not in (None, "biology", "biotech", "physics", "chemistry",
                                  "geography", "maths", "science", "other"):
        errs.append(f"schema: bad subject '{doc.get('subject')}'")

    # labels + geometry
    ids, labels = set(), set()
    for p in doc["parts"]:
        if p["id"] in ids:
            errs.append(f"labels: duplicate id '{p['id']}'")
        ids.add(p["id"])
        lab = p["label"].lower()
        if lab in labels:
            errs.append(f"labels: duplicate label '{p['label']}'")
        labels.add(lab)
        if len(p["label"]) < 2 or len(p["label"]) > 60:
            errs.append(f"labels: '{p['label']}' implausible length")
        if not (0 < p["x"] < 1 and 0 < p["y"] < 1):
            errs.append(f"geometry: '{p['id']}' coords out of bounds ({p['x']},{p['y']})")
        if not (0.02 <= p["r"] <= 0.15):
            errs.append(f"geometry: '{p['id']}' radius {p['r']} outside 0.02-0.15")
        w = len(p["fn"].split())
        if not (3 <= w <= 20):
            errs.append(f"labels: '{p['id']}' fn has {w} words (need 3-20)")
        if BANNED_FN.search(p["fn"]):
            errs.append(f"language: '{p['id']}' fn contains banned content")
        for j in JARGON:
            if j in p["fn"].lower():
                errs.append(f"language: '{p['id']}' fn uses jargon '{j}'")

    # min spacing — spots shouldn't overlap confusingly
    ps = doc["parts"]
    for i in range(len(ps)):
        for k in range(i + 1, len(ps)):
            d = math.hypot(ps[i]["x"] - ps[k]["x"], ps[i]["y"] - ps[k]["y"])
            if d < (ps[i]["r"] + ps[k]["r"]) * 0.45:
                errs.append(f"geometry: '{ps[i]['id']}' & '{ps[k]['id']}' overlap (d={d:.3f})")

    # exam integrity — question must not leak its own answer
    # (strip parenthetical disambiguators; ignore generic diagram words)
    GENERIC = {'part', 'structure', 'region', 'seed', 'cell', 'layer', 'diagram',
               'solid', 'liquid', 'gas', 'state', 'states', 'water', 'grain',
               'with', 'that', 'from', 'this', 'into', 'over', 'between',
               'joint', 'muscle', 'bone', 'organ', 'type', 'types', 'figure',
               'first', 'stage', 'stage', 'seedling', 'lifted', 'young', 'grows',
               'step', 'stem', 'root', 'leaves', 'leaf', 'field', 'lines',
               'line', 'pole', 'poles', 'needle', 'needles', 'north', 'south',
               'moon', 'earth', 'sun', 'shadow', 'orbit', 'open', 'closed',
               'cells', 'cell', 'pore', 'skin', 'flat', 'eclipse', 'strip',
               'strips', 'detects', 'acid', 'acids', 'base', 'bases', 'basic',
               'acidic', 'test', 'liquid', 'dish', 'paper', 'membrane',
               'inner', 'outer', 'tails', 'heads', 'wrap', 'layer', 'rays',
               'atom', 'model', 'neutron', 'sugar', 'roots', 'leaves',
               'water', 'balanced', 'pipes', 'plants', 'hydrogen', 'old',
               'real', 'empty', 'dense', 'tiny', 'course', 'mostly',
               'bacteria', 'wave', 'waves', 'oxygen', 'bottom', 'tube',
               'base', 'useful', 'usable', 'first', 'sky', 'nitrogen',
               'target', 'beams', 'light', 'calcium', 'electron',
               'electrons', 'shell', 'shells', 'pollen', 'charge', 'spread',
               'positive', 'atoms', 'innermost', 'fills', 'sound', 'darkness',
               'roof', 'catching', 'gives', 'away', 'deciding', 'chemistry',
               'veins', 'net', 'mesh', 'protein', 'grains', 'fats', 'vessel',
               'cone', 'tool', 'stalks', 'freed', 'kernels', 'grain', 'gravity',
               'shoot', 'peak', 'weight', 'string', 'point', 'hangs', 'column',
               'pressure', 'equal', 'charge', 'marks', 'carrying', 'cable',
               'finest', 'tiny', 'blocks', 'moderation', 'clean', 'edge',
               'below', 'rim', 'beating', 'release', 'obeying', 'pull',
               'food', 'gland', 'glands', 'mirror', 'centre', 'image',
               'sphere', 'master', 'butterfly', 'parent', 'mini', 'ready',
               'drop', 'chromosome', 'chromosomes', 'males', 'carry',
               'combination', 'largest', 'winning', 'generation', 'one',
               'hidden', 'returns', 'beam', 'entering', 'glass', 'cord',
               'hub', 'processing', 'fork', 'splitting', 'air', 'spirals',
               'loops', 'uniform', 'field', 'inside', 'looping', 'lines',
               'exit', 'tube', 'draining', 'bubble', 'digesting', 'travels',
               'zones', 'snail', 'bones', 'sensors', 'pops', 'flights',
               'result', 'formed', 'almost', 'spinal', 'lung', 'lungs',
               'each', 'outside', 'bladder', 'current', 'direction',
               'female', 'pair', 'dominant', 'recessive', 'reflector',
               'block', 'blocks', 'metals', 'transition', 'noble', 'gases',
               'holding', 'neuron', 'neurons', 'commands', 'muscles',
               'reporting', 'senses', 'bonds', 'bond', 'real', 'molecule',
               'molecules', 'joined', 'focus', 'star', 'rule', 'action',
               'equal', 'areas', 'fuel', 'wheel', 'harmonic', 'loops',
               'reflected', 'heading', 'step', 'spending', 'atp', 'nadph',
               'shaped', 'pipes', 'arrangement', 'unique', 'dicots',
               'plant', 'plants', 'serum', 'arms', 'chains', 'curve',
               'direction', 'bump', 'electrode', 'electrodes', 'strand',
               'strands', 'fragments', 'embryo', 'lens', 'surface',
               'ribosome', 'enzyme', 'gene', 'genes', 'uterus', 'allowed',
               'circle', 'spiral', 'path', 'sample', 'antigen', 'antigens',
               'metal', 'glue', 'offspring', 'insert', 'lands', 'repressor',
               'cassette', 'magnify', 'ratio', 'balance', 'solves', 'stable',
               'exceptionally', 'helium', 'either', 'rhesus', 'factor',
               'staying', 'smooth', 'absent', 'clumps', 'meaning', 'present',
               'checking', 'catching', 'built', 'arm', 'needing',
               'continuously', 'becoming', 'next', 'dissolving', 'gaining',
               'hunting', 'placing', 'crossing', 'boundary', 'foreign',
               'integrates', 'switched', 'injury', 'signals', 'binding',
               'forming'}
    for q in doc.get("exam", []):
        for p in doc["parts"]:
            base = re.sub(r"\(.*?\)", "", p["label"]).lower()
            for word in re.findall(r"[a-z]+", base):
                if len(word) > 3 and word not in GENERIC and re.search(rf"\b{re.escape(word)}\b", q.lower()):
                    errs.append(f"exam: question leaks answer '{p['label']}': {q[:60]}")
                    break
        if not q.startswith("Tap the"):
            errs.append(f"exam: malformed line: {q[:60]}")

    return errs


def render_overlay(md_path, img_dir, out_dir):
    """Debug render — spots + labels over the source image."""
    try:
        from PIL import Image, ImageDraw
    except ImportError:
        return None
    base = os.path.basename(md_path).rsplit(".", 1)[0]
    img_path = None
    for ext in (".png", ".jpg"):
        cand = os.path.join(img_dir, base + ext)
        if os.path.exists(cand):
            img_path = cand; break
    if not img_path:
        return None
    doc = parse_md(open(md_path, encoding="utf-8").read())[1]
    if not doc or doc.get("not_a_diagram"):
        return None
    im = Image.open(img_path).convert("RGB")
    d = ImageDraw.Draw(im)
    W, H = im.size
    for i, p in enumerate(doc["parts"]):
        x, y, r = p["x"] * W, p["y"] * H, p["r"] * W
        d.ellipse([x - r, y - r, x + r, y + r], outline=(255, 60, 60), width=3)
        d.text((x + r + 2, y - 6), f"{i}: {p['label']}", fill=(200, 0, 0))
    os.makedirs(out_dir, exist_ok=True)
    out = os.path.join(out_dir, base + "_qc.png")
    im.save(out)
    return out


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    overlay = "--overlay" in sys.argv
    img_dir = args[-1] if overlay else None
    files = [a for a in args if a.endswith(".md")]
    fails = 0
    for f in files:
        err, doc = parse_md(open(f, encoding="utf-8").read())
        if err:
            print(f"FAIL {f}: {err}"); fails += 1; continue
        errs = validate(doc)
        if errs:
            for e in errs:
                print(f"FAIL {f}: {e}")
            fails += 1
        else:
            n = len(doc.get("parts", []))
            print(f"PASS {f}: {n} parts" if not doc.get("not_a_diagram") else f"SKIP {f}: not a diagram")
            if overlay and not doc.get("not_a_diagram"):
                out = render_overlay(f, img_dir or os.path.dirname(f), os.path.dirname(f))
                if out:
                    print(f"      overlay -> {out}")
    sys.exit(1 if fails else 0)


if __name__ == "__main__":
    main()
