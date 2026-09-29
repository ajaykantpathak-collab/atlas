"""Extract per-node DoodleCard content for every class (6-12) from the
enhanced-node index. Output: content/doodle_cards/doodle_content_class<N>.json

Card content is VERBATIM from the node's authored teaching fields — the
DoodleCard renderer and export pipeline consume these JSONs. Zero generated
facts:
- title: verbatim first sentence of the authored definition (nodes carry no
  authored title field; a deterministic substring of authored text, never
  generated text)
- definition: the authored definition (the quote box)
- steps: authored walkthrough split into sentences/bullets (max 6)
- misconception: the authored diagnostic misconception (cleaned)
- remember: up to 3 authored diagnostic questions as key points

Presentation-only cleanups (pillar-4 audit fixes, deterministic, word- and
fact-preserving):
- internal node ids are stripped from student-facing text ("(c9_bio_ch1_2)")
  — node ids are internal-only per platform rules
- raw LaTeX in STEM fields is converted to readable plain math
  (\frac{a}{b} -> (a)/(b), \vec v -> v, \times -> x, greek names -> glyphs);
  only markup is rewritten, never the math itself
- sentence splitting no longer breaks at abbreviations ("c. 7000", "e.g.")
  and titles never end on a dangling open parenthesis
"""
import json
import os
import re

INDEX = r"D:/platform/backend/_cache/enhanced_nodes_index.json"
OUT_DIR = r"D:/platform/content/doodle_cards"

# Internal node ids, e.g. c10_bio_cbse_01_002 / c9_hist_ch2_4 / c6_math_ch01_012
NODE_ID_TOKEN = re.compile(r"\s*\(\s*c\d+_[a-z0-9_]+?\s*\)|\s*\bc\d+_[a-z0-9_]+_\d+\b")

# ---- deterministic LaTeX -> plain math (markup rewrite only) ----
_CMD_ARG_RE = re.compile(r"\\\s*(?:vec|hat|overline|bar|mathbf|mathrm|text|bm|boldsymbol|mathit)\s*\{([^{}]*)\}")
_FRAC_RE = re.compile(r"\\\s*frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}")
_SQRT_RE = re.compile(r"\\\s*sqrt\s*\{([^{}]*)\}")
_DELIMS_RE = re.compile(r"\\[\(\)\[\]]|\$\$|\$")
_GREEK = {
    "alpha": "α", "beta": "β", "gamma": "γ", "delta": "δ", "Delta": "Δ",
    "epsilon": "ε", "theta": "θ", "lambda": "λ", "mu": "μ", "nu": "ν",
    "pi": "π", "rho": "ρ", "sigma": "σ", "Sigma": "Σ", "tau": "τ",
    "phi": "φ", "omega": "ω", "Omega": "Ω",
}
_SYMBOLS = {
    "times": "×", "cdot": "·", "div": "÷", "pm": "±", "leq": "≤", "le": "≤",
    "geq": "≥", "ge": "≥", "neq": "≠", "ne": "≠", "approx": "≈",
    "rightarrow": "→", "to": "→", "leftarrow": "←", "Rightarrow": "⇒",
    "infty": "∞", "sum": "Σ", "prod": "Π", "partial": "∂", "degree": "°",
    "circ": "°", "ell": "ℓ", "angle": "∠", "perp": "⊥", "propto": "∝",
    "in": "∈", "notin": "∉", "subset": "⊂", "subseteq": "⊆",
    "cup": "∪", "cap": "∩", "emptyset": "∅", "forall": "∀", "exists": "∃",
}
_LEFTOVER_CMD_RE = re.compile(r"\\[a-zA-Z]+\s?")

def has_latex(text: str) -> bool:
    return bool(re.search(r"\\[\(\)\[\]\\{}]|\\\\|\\[a-zA-Z]|\$\$", text or ""))

def clean_math_once(text: str) -> str:
    prev = None
    while prev != text:
        prev = text
        text = _CMD_ARG_RE.sub(r"\1", text)          # \vec{v} -> v
        text = _FRAC_RE.sub(r"(\1)/(\2)", text)      # \frac{a}{b} -> (a)/(b)
        text = _SQRT_RE.sub(r"√(\1)", text)          # \sqrt{x} -> √(x)
    return text

def clean_math(text: str) -> str:
    """Deterministic LaTeX markup -> readable plain math. Words untouched."""
    if not has_latex(text):
        return text
    t = text
    # Protect escaped set braces from the bare-brace cleanup further down.
    t = t.replace("\\{", "\x00").replace("\\}", "\x01")
    t = t.replace("\\-", "-")                        # escaped hyphen
    t = clean_math_once(t)
    t = _DELIMS_RE.sub("", t)
    t = re.sub(r"\\(" + "|".join(sorted(_GREEK, key=len, reverse=True)) + r")(?![a-zA-Z])",
               lambda m: _GREEK[m.group(1)], t)
    t = re.sub(r"\\(" + "|".join(sorted(_SYMBOLS, key=len, reverse=True)) + r")(?![a-zA-Z])",
               lambda m: _SYMBOLS[m.group(1)], t)
    t = _LEFTOVER_CMD_RE.sub(" ", t)                 # unknown commands dropped
    t = t.replace("{", "").replace("}", "")
    t = t.replace("\x00", "{").replace("\x01", "}")
    t = re.sub(r"\^\s*(?=°)", "", t)                 # 90^\circ -> 90°
    t = re.sub(r"\s{2,}", " ", t)
    return t.strip()

def clean_student_text(text: str) -> str:
    """Strip internal node ids + LaTeX markup from student-facing text.
    Presentation-only: words and facts are never altered."""
    t = strip_markdown(text)
    t = NODE_ID_TOKEN.sub("", t)
    t = clean_math(t)
    t = re.sub(r"\s{2,}", " ", t)
    t = re.sub(r"\s+([,.;:!?])", r"\1", t)           # space left by id removal
    return t.strip()

SUBJECT_NAMES = {
    "phy": "Physics", "chem": "Chemistry", "math": "Maths", "bio": "Biology",
    "his": "History", "hist": "History", "geo": "Geography", "civ": "Civics",
    "eco": "Economics", "bs": "Business Studies", "acc": "Accountancy",
    "psy": "Psychology", "engl": "English", "eng": "English", "hin": "Hindi",
    "cs": "Computer Science", "ip": "Informatics Practices",
    "soc": "Sociology", "hs": "Home Science", "biotech": "Biotechnology",
    "pt": "Political Science", "pol": "Political Science",
    "ps": "Political Science", "ca": "Computerised Accounting",
    "ss": "Social Science", "cu": "Science", "sci": "Science",
}

TITLE_MAX = 80
STEP_MAX = 220        # per-step display cap (verbatim sentence substring)
MISCONCEPTION_MAX = 260
REMEMBER_MAX = 180    # per key-point cap


def strip_markdown(text: str):
    """Presentation normalization of authored text: drop literal markdown
    bold/emphasis markers (**x** / *x*) so cards show words, not markup.
    Words are untouched — never generated, only de-marked-up."""
    text = (text or "").strip()
    text = re.sub(r"\*\*(.+?)\*\*", r"\1", text, flags=re.S)
    text = re.sub(r"(?<!\*)\*(?!\*)", "", text)
    return text.strip()


def first_sentences(text: str, max_chars: int, max_sentences: int = 1):
    """Deterministic verbatim substring: first N sentences, capped at
    max_chars on a word boundary. Presentation cap — never generated."""
    text = re.sub(r"\s+", " ", (text or "").strip())
    if len(text) <= max_chars:
        return text
    parts = split_sentences(text)
    out = ""
    for p in parts[:max_sentences]:
        if len(out) + len(p) + 1 > max_chars:
            break
        out = (out + " " + p).strip()
    if not out:
        out = text[:max_chars]
    if len(out) < len(text):
        cut = out[:max_chars]
        sp = cut.rfind(" ")
        out = cut[:sp if sp > 40 else max_chars].rstrip(",;:—-('\"“")
        out += "…"
    return out


# Sentence boundary: [.!?] (not part of an abbreviation like "c." / "e.g.")
# followed by whitespace + an uppercase letter, quote or open paren.
# "c. 7000", "e.g. the" therefore do NOT split.
SENT_SPLIT_RE = re.compile(r"(?<=[.!?;])\s+(?=[A-Z“\"(])")
_ABBREV_END_RE = re.compile(r"(^|\s)[A-Za-z]{1,3}\.$")   # "c." / "e.g." / "vs."

def split_sentences(text: str):
    """Sentence split that never breaks after abbreviation dots; a fragment
    ending in a short abbreviation ("c.", "e.g.", "vs.") is merged with the
    next fragment. Genuine short sentences are kept."""
    parts = [p for p in SENT_SPLIT_RE.split((text or "").strip()) if p]
    merged = []
    for p in parts:
        if merged and _ABBREV_END_RE.search(merged[-1]):
            merged[-1] = merged[-1] + " " + p
        else:
            merged.append(p)
    return merged

def trim_dangling_paren(title: str) -> str:
    """Drop a trailing fragment left inside an unclosed '(' — deterministic."""
    if title.count("(") > title.count(")"):
        i = title.rfind("(")
        if i != -1 and i > 20:
            title = title[:i]
    return title.rstrip(" ,;:—-(")


def derive_title(definition: str, node_id: str):
    """Nodes have no authored title. Title = first sentence of the authored
    definition, cut at a natural boundary, capped at TITLE_MAX chars.
    Deterministic verbatim substring — never generated."""
    text = strip_markdown(definition).strip('"').strip()
    if not text:
        return node_id
    # First sentence: cut at . ! ? followed by space/capital, or newline.
    # Abbreviation dots ("c. 7000", "e.g.") never terminate the sentence.
    parts = split_sentences(text)
    first = parts[0] if parts else text
    # Trim a leading clause marker if the sentence is very long.
    if len(first) > TITLE_MAX:
        cut = first[:TITLE_MAX]
        # Prefer cutting at a soft boundary: colon, dash, comma, semicolon.
        best = max(cut.rfind(": "), cut.rfind(" — "), cut.rfind(" - "),
                   cut.rfind("; "), cut.rfind(", "))
        if best > 30:
            first = first[:best]
            # Keep the leading quote if the definition opened with one.
            if text[0] == '"':
                first = '"' + first.lstrip('"') + '"'
        else:
            best_sp = cut.rfind(" ")
            first = first[:best_sp if best_sp > 30 else TITLE_MAX]
            if text[0] == '"':
                first = '"' + first.lstrip('"') + '"'
        first = first.rstrip(",;:—-") + "…"
    return trim_dangling_paren(first.strip())


def split_steps(walkthrough: str):
    """Walkthrough → numbered steps: sentences/bullets, max 6."""
    text = strip_markdown(walkthrough)
    if not text:
        return []
    steps = []
    for chunk in re.split(r"\n+", text):
        for p in split_sentences(chunk):
            p = p.strip(" -*•\u2022")
            p = re.sub(r"\s+", " ", p)
            if p:
                steps.append(first_sentences(p, STEP_MAX, 2))
    return steps[:6]


def clean_misconception(node: dict):
    for d in node.get("diagnostics") or []:
        if not isinstance(d, dict):
            continue
        mis = clean_student_text(d.get("misconception") or "")
        if mis and "needed" not in mis.lower():
            return first_sentences(mis, MISCONCEPTION_MAX, 2)
    return None


def key_points(node: dict):
    pts = []
    for d in (node.get("diagnostics") or []):
        if not isinstance(d, dict):
            continue
        q = clean_student_text(d.get("q") or d.get("question") or "")
        if q:
            q = first_sentences(q, REMEMBER_MAX, 1)
            pts.append(q.rstrip("?.") + ".")
        if len(pts) >= 3:
            break
    return pts[:3]


def main():
    index = json.load(open(INDEX, encoding="utf-8"))
    nodes = index["nodes"]
    os.makedirs(OUT_DIR, exist_ok=True)

    per_class = {}
    for n in nodes:
        cls = str(n.get("class") or "").strip()
        if not cls.isdigit():
            continue
        per_class.setdefault(cls, []).append(n)

    counts = {}
    for cls, class_nodes in sorted(per_class.items(), key=lambda x: int(x[0])):
        cards = []
        for n in class_nodes:
            nid = n.get("node_id")
            subj_code = ""
            m = re.match(r"c\d+_([a-z]+)", nid or "")
            if m:
                subj_code = m.group(1)
            subject = SUBJECT_NAMES.get(subj_code, subj_code.capitalize() or "General")
            definition = clean_student_text(n.get("definition") or "")
            steps = split_steps(clean_student_text(n.get("walkthrough") or ""))
            mis = clean_misconception(n)
            remember = key_points(n)
            cards.append({
                "node_id": nid,
                "title": derive_title(definition, nid),
                "subject": subject,
                "classLevel": int(cls),
                "chapter": str(n.get("chapter") or ""),
                "definition": definition,
                "steps": steps,
                "misconception": mis,
                "remember": remember,
            })
        out_path = os.path.join(OUT_DIR, f"doodle_content_class{cls}.json")
        json.dump({"class": int(cls), "count": len(cards), "cards": cards},
                  open(out_path, "w", encoding="utf-8"),
                  ensure_ascii=False, indent=1)
        counts[cls] = len(cards)
        print(f"class {cls}: {len(cards)} cards -> {out_path}")

    print("TOTAL cards:", sum(counts.values()), "| per class:", counts)


if __name__ == "__main__":
    main()
