"""Shared catalog writer for batch-1 staging drafts.

build(...) assembles the canonical catalog schema used by the platform
gate and writes staging/catalog_class{cls}_{subject}_{stem}.json.
"""
import io
import json
import os

STAGING = os.path.dirname(os.path.abspath(__file__))
CACHE = "D:/node_generator/ncert-mcp/data/processed/text_cache_new"


def build(stem, cls, subject, title, concepts, worked_examples=None,
          exercises=None, license_note="NCERT-derived; author-first rendered",
          id_prefix=None):
    code = stem[:4]
    ch = int(stem[-2:])
    prefix = (id_prefix or code).lower()
    src = "%s/%s.txt" % (CACHE, stem)
    cat = {
        "class": cls,
        "subject": subject,
        "chapter": ch,
        "chapter_title": title,
        "source_file": src,
        "license": license_note,
        "concepts": [],
        "worked_examples": worked_examples or [],
        "exercises": exercises or [],
    }
    for n, c in enumerate(concepts, 1):
        st = c["steps"]
        if st and isinstance(st[0], (tuple, list)):
            st = steps(*st)
        full = {
            "id": "%s.%d.%d" % (prefix, ch, n),
            "title": c["title"],
            "section": c.get("section", ""),
            "definition": c["definition"],
            "formula": c.get("formula", ""),
            "key_idea": c["key_idea"],
            "textbook_ref": c.get("ref", "%s.txt, %s" % (stem, c.get("section", ""))),
            "question_patterns": c["patterns"],
            "solution_type": c.get("stype", "verify_property"),
            "solution_steps": st,
        }
        cat["concepts"].append(full)
    path = os.path.join(STAGING, "catalog_class%d_%s_%s.json" % (cls, subject, stem))
    with io.open(path, "w", encoding="utf-8") as fh:
        json.dump(cat, fh, ensure_ascii=False, indent=1)
    return path


def steps(*items):
    """items: (action, explain[, compute]) triples."""
    out = []
    for i, it in enumerate(items, 1):
        s = {"step": i, "action": it[0], "explain": it[1]}
        if len(it) > 2:
            s["compute"] = it[2]
        out.append(s)
    return out


def we(wid, concept_id, source_ref, qtype, pattern, variables, template):
    return {
        "id": wid,
        "source_ref": source_ref,
        "concept": concept_id,
        "question_type": qtype,
        "question_pattern": pattern,
        "extracted_variables": variables,
        "solution_template": template,
    }


def exr(eid, source_ref, questions):
    return {"id": eid, "source_ref": source_ref, "questions": questions}
