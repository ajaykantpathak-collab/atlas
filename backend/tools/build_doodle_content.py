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
"""
import json
import os
import re

INDEX = r"D:/platform/backend/_cache/enhanced_nodes_index.json"
OUT_DIR = r"D:/platform/content/doodle_cards"

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
    parts = re.split(r"(?<=[.!?])\s+", text)
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


def derive_title(definition: str, node_id: str):
    """Nodes have no authored title. Title = first sentence of the authored
    definition, cut at a natural boundary, capped at TITLE_MAX chars.
    Deterministic verbatim substring — never generated."""
    text = strip_markdown(definition).strip('"').strip()
    if not text:
        return node_id
    # First sentence: cut at . ! ? followed by space/capital, or newline.
    m = re.search(r"^(.+?[.!?])(?:\s|$)", text, re.S)
    first = m.group(1) if m else text
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
    return first.strip()


def split_steps(walkthrough: str):
    """Walkthrough → numbered steps: sentences/bullets, max 6."""
    text = strip_markdown(walkthrough)
    if not text:
        return []
    parts = re.split(r"\n+|\.\s+|;\s*", text)
    steps = []
    for p in parts:
        p = p.strip(" -*•\u2022")
        p = re.sub(r"\s+", " ", p)
        if p:
            steps.append(first_sentences(p, STEP_MAX, 2))
    return steps[:6]


def clean_misconception(node: dict):
    for d in node.get("diagnostics") or []:
        if not isinstance(d, dict):
            continue
        mis = strip_markdown(d.get("misconception") or "").strip()
        if mis and "needed" not in mis.lower():
            return first_sentences(mis, MISCONCEPTION_MAX, 2)
    return None


def key_points(node: dict):
    pts = []
    for d in (node.get("diagnostics") or []):
        if not isinstance(d, dict):
            continue
        q = strip_markdown(d.get("q") or d.get("question") or "").strip()
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
            definition = strip_markdown(n.get("definition") or "")
            steps = split_steps(n.get("walkthrough") or "")
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
