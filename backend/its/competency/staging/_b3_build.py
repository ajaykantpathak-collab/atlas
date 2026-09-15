"""Builder helpers for batch_3 catalogs."""
import json


def step(n, action, explain, compute=None):
    d = {"step": n, "action": action, "explain": explain}
    if compute:
        d["compute"] = compute
    return d


def concept(cid, title, section, definition, formula, key_idea, ref, qps, stype, steps):
    return {
        "id": cid, "title": title, "section": section,
        "definition": definition, "formula": formula, "key_idea": key_idea,
        "textbook_ref": ref, "question_patterns": qps,
        "solution_type": stype, "solution_steps": steps,
    }


def worked(exid, ref, cid, qtype, qpattern, variables, template):
    return {
        "id": exid, "source_ref": ref, "concept": cid,
        "question_type": qtype, "question_pattern": qpattern,
        "extracted_variables": variables, "solution_template": template,
    }


def catalog(cls, subject, chap, title, src, concepts, worked_examples, exercises):
    return {
        "class": cls, "subject": subject, "chapter": chap,
        "chapter_title": title, "source_file": src,
        "concepts": concepts, "worked_examples": worked_examples,
        "exercises": exercises,
    }


def dump(path, cat):
    with open(path, "w", encoding="utf-8") as fh:
        json.dump(cat, fh, ensure_ascii=False, indent=1)
    print("wrote", path)
