"""complete_sim_manifest.py -- add manifest entries for unwired sims.

Every simulation component in c6_12/ gets a manifest entry so
build_c6_12_registry.py can wire it into the student-facing library.
Filenames encode class + subject + topic: C{cls}_{Subject}{Topic}Sim.tsx.
node_ids are synthetic (c{cls}_{subjabbr}_{nnn}) and stable per file.
"""
import json
import os
import re

SIMS = r"D:\platform\frontend\components\simulations\c6_12"
MANIFEST = os.path.join(SIMS, "_manifest.json")

SUBJECT_WORD = {
    "Mathematics": "maths", "Maths": "maths", "Science": "science",
    "Physics": "physics", "Chemistry": "chemistry", "Biology": "biology",
    "Geography": "geography", "History": "history",
    "PoliticalScience": "political_science",
    "SocialScience": "social_science", "Economics": "economics",
    "ComputerScience": "computer_science",
    "InformaticsPractices": "informatics_practices",
    "AppliedMaths": "applied_maths", "Biotechnology": "biotechnology",
    "HomeScience": "home_science", "Accountancy": "accountancy",
    "Sociology": "sociology", "Psychology": "psychology",
    "Entrepreneurship": "entrepreneurship", "CommercialStudies":
    "commercial_studies", "EconApplications": "economics",
}

SUBJ_ABBR = {
    "maths": "math", "science": "sci", "physics": "phy",
    "chemistry": "chem", "biology": "bio", "geography": "geo",
    "history": "hist", "political_science": "polsci",
    "social_science": "soc", "economics": "econ",
    "computer_science": "cs", "informatics_practices": "ip",
    "applied_maths": "am", "biotechnology": "bt",
    "home_science": "home", "accountancy": "acct", "sociology": "socio",
    "psychology": "psy", "entrepreneurship": "ent",
    "commercial_studies": "comm",
}


def parse_name(stem):
    m = re.match(r"C(\d{1,2})_([A-Za-z]+)(.+?)Sim$", stem)
    if not m:
        return None
    cls = int(m.group(1))
    subject_word = m.group(2)
    subject = SUBJECT_WORD.get(subject_word, subject_word.lower())
    return cls, subject


EXTRA_DIRS = {
    "c6_12_new": "",            # CBSE-aligned sims, never wired
    "maths": "",                # Lever + Pulley machines
    "c6_12_chem_upgraded": "",  # only names NOT colliding with c6_12
}


def main():
    manifest = json.load(open(MANIFEST, encoding="utf-8"))
    known = {e["file"] for e in manifest}
    known_dirs = {(e["file"], e.get("dir", "c6_12")) for e in manifest}
    added, skipped = 0, []
    counters = {}
    for f in sorted(os.listdir(SIMS)):
        if not f.endswith(".tsx") or f.startswith("_"):
            continue
        if f in known:
            continue
        stem = f[:-4]
        parsed = parse_name(stem)
        if parsed is None:
            skipped.append(f)
            continue
        cls, subject = parsed
        ab = SUBJ_ABBR.get(subject, subject[:4])
        counters[(cls, subject)] = counters.get((cls, subject), 0) + 1
        n = counters[(cls, subject)]
        node_id = f"c{cls}_{ab}_extra_{n:03d}"
        manifest.append({
            "file": f,
            "class_level": cls,
            "subject": subject,
            "export_name": stem,
            "node_ids": [{"const_name": f"NODE_{node_id.upper()}",
                          "node_id": node_id}],
            "node_count": 1,
            "line_count": len(open(os.path.join(SIMS, f), encoding="utf-8")
                              .readlines()),
        })
        added += 1
    # extra directories: wire every unique-named sim
    for extra in EXTRA_DIRS:
        d = os.path.join(os.path.dirname(SIMS), extra)
        if not os.path.isdir(d):
            continue
        for f in sorted(os.listdir(d)):
            if not f.endswith(".tsx") or f.startswith("_"):
                continue
            if (f, extra) in known_dirs or (f, "c6_12") in known_dirs:
                continue  # colliding variant of an already-wired sim
            stem = f[:-4]
            parsed = parse_name(stem)
            if parsed is None:
                if stem in ("LeverSimulation", "PulleySimulation"):
                    cls, subject = 5, "science"
                else:
                    skipped.append(extra + "/" + f)
                    continue
            else:
                cls, subject = parsed
            ab = SUBJ_ABBR.get(subject, subject[:4])
            counters[(cls, subject)] = counters.get((cls, subject), 0) + 1
            n = counters[(cls, subject)]
            node_id = f"c{cls}_{ab}_x{extra[:3]}_{n:03d}"
            manifest.append({
                "file": f,
                "dir": extra,
                "class_level": cls,
                "subject": subject,
                "export_name": stem,
                "node_ids": [{"const_name": f"NODE_{node_id.upper()}",
                              "node_id": node_id}],
                "node_count": 1,
                "line_count": len(open(os.path.join(d, f),
                                       encoding="utf-8").readlines()),
            })
            added += 1
    json.dump(manifest, open(MANIFEST, "w", encoding="utf-8"), indent=1,
              ensure_ascii=False)
    print(f"manifest entries: {len(manifest)} (added {added})")
    if skipped:
        print("unparsed names (left out):", skipped[:8])


if __name__ == "__main__":
    main()
