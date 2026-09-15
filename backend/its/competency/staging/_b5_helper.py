# Batch 5 catalog builder helpers.
# Usage: import _b5_helper as H; H.emit(cat_dict, text_path)
import json
import os
import sys

sys.path.insert(0, r"D:\platform")
sys.path.insert(0, r"D:\platform\backend\tools")
from backend.tools.bulk_catalog_generator import validate_catalog  # noqa: E402

STAGING = r"D:\platform\backend\its\competency\staging"
CACHE = r"D:\node_generator\ncert-mcp\data\processed\text_cache_new"
DECODED = r"C:\Users\Alesha4285\AppData\Local\Temp\b5decoded"

CODE2SUB = {
    "keww": "english", "khan": "hindi", "khar": "hindi", "khat": "hindi",
    "khvt": "hindi", "leac": "accountancy", "lebo": "biology",
    "lebs": "business_studies", "lech": "chemistry", "leec": "economics",
    "legy": "geography", "lehs": "history", "lemh": "maths",
    "leph": "physics", "leps": "political_science",
}


def chapter_no(stem):
    return int(stem[4:6])


def text_for(stem):
    import os
    dec = os.path.join(DECODED, stem + ".txt")
    if os.path.exists(dec):
        return open(dec, encoding="utf-8", errors="ignore").read()
    return open(os.path.join(CACHE, stem + ".txt"), encoding="utf-8",
                errors="ignore").read()


def make_cat(stem, chapter_title, concepts, worked_examples, exercises):
    code = stem[:4]
    cls = 11 if code[0] == "k" else 12
    subj = CODE2SUB[code]
    return {
        "class": cls,
        "subject": subj,
        "chapter": chapter_no(stem),
        "chapter_title": chapter_title,
        "source_file": "D:/node_generator/ncert-mcp/data/processed/"
                       "text_cache_new/" + stem + ".txt",
        "license": "NCERT-derived; author-first rendered",
        "concepts": concepts,
        "worked_examples": worked_examples,
        "exercises": exercises,
    }


def concept(cid, title, section, definition, formula, key_idea, ref,
            patterns, stype, steps):
    return {
        "id": cid,
        "title": title,
        "section": section,
        "definition": definition,
        "formula": formula,
        "key_idea": key_idea,
        "textbook_ref": ref,
        "question_patterns": patterns,
        "solution_type": stype,
        "solution_steps": steps,
    }


def vstep(n, action, explain):
    return {"step": n, "action": action, "explain": explain}


def we(wid, ref, concept_id, pattern, variables, template, qtype="compute"):
    return {
        "id": wid,
        "source_ref": ref,
        "concept": concept_id,
        "question_type": qtype,
        "question_pattern": pattern,
        "extracted_variables": variables,
        "solution_template": template,
    }


def cstep(n, action, explain, compute):
    return {"step": n, "action": action, "explain": explain,
            "compute": compute}


def ex(eid, ref, questions):
    return {"id": eid, "source_ref": ref, "questions": questions}


def emit(stem, cat, verbose=True):
    """Validate and write the staging catalog; returns (ok, problems)."""
    text = text_for(stem)
    ok, probs = validate_catalog(cat, text)
    out = os.path.join(
        STAGING, "catalog_class%d_%s_%s.json"
        % (cat["class"], cat["subject"], stem))
    if ok:
        with open(out, "w", encoding="utf-8") as f:
            json.dump(cat, f, ensure_ascii=False, indent=1)
    if verbose:
        print(stem, "GATE:", "OK" if ok else "FAIL")
        for p in probs:
            print("   -", p)
    return ok, probs


def cid_for(stem, n):
    return "%s.%d.%d" % (stem[:4], chapter_no(stem), n)
