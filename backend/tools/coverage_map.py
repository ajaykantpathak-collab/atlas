"""coverage_map.py -- definitive mapping: which chapters have catalogs, which don't.

Scans text_cache_new for ALL available book chapters, then scans the live
competency folder for catalogs covering each chapter.  Matching is done by
CONTENT (concept titles vs chapter text), not by filename patterns.

Outputs a per-class, per-subject coverage table showing exactly what exists
and what needs to be generated.
"""
import json, os, re, collections, sys

NEW = r"D:\node_generator\ncert-mcp\data\processed\text_cache_new"
LIVE = r"backend\its\competency"
OUT = r"D:\platform\COVERAGE_MAP.json"

CODE_SUBJECT = {
    "fegp": "maths", "gemh": "maths", "hegp": "maths",
    "gegp": "maths",
    "iemh": "maths", "jemh": "maths", "kemh": "maths", "lemh": "maths",
    "hemh": "maths",
    "fepr": "english", "gepr": "english", "hepr": "english",
    "iebe": "english", "jeff": "english", "jefp": "english",
    "kehb": "english", "kesp": "english", "keww": "english",
    "keks": "english", "lefl": "english", "levt": "english",
    "lekl": "english",
    "fhml": "hindi", "ghml": "hindi", "hhml": "hindi", "ihga": "hindi",
    "jhkr": "hindi", "jhks": "hindi", "khan": "hindi", "khar": "hindi",
    "khat": "hindi", "khvt": "hindi", "lhan": "hindi", "lhar": "hindi",
    "lhat": "hindi", "lhvt": "hindi",
    "fecu": "science", "gecu": "science", "hecu": "science",
    "gesc": "science", "iesc": "science", "jesc": "science",
    "fees": "social_science",
    "gees": "social_science",
    "gess": "social_science", "hees": "social_science",
    "iest": "social_science", "jess": "social_science", "hess": "social_science",
    "leph": "physics", "keph": "physics",
    "lech": "chemistry", "kech": "chemistry",
    "lebo": "biology", "kebo": "biology",
    "kebt": "biotechnology", "lebt": "biotechnology",
    "kecs": "computer_science", "lecs": "computer_science",
    "keip": "informatics_practices", "leip": "informatics_practices",
    "leac": "accountancy", "keac": "accountancy",
    "leca": "accountancy",
    "leec": "economics", "keec": "economics",
    "kest": "economics",
    "lebs": "business_studies", "kebs": "business_studies",
    "kegy": "geography", "legy": "geography",
    "keps": "political_science", "leps": "political_science",
    "kehs": "history", "lehs": "history",
    "kesy": "sociology", "lesy": "sociology",
    "kepy": "psychology", "lepy": "psychology",
    "kehe": "home_science", "lehe": "home_science",
    "lesp": "entrepreneurship",
    "am11": "applied_maths", "am12": "applied_maths",
    "keps2": "political_science",
}

# Language subjects are out of scope for competency catalogs:
# literature questions are interpretive and cannot be answered
# deterministically (zero-wrong policy).
LANGUAGE_CODES = {
    "fhml", "ghml", "hhml", "ihga", "jhkr", "jhks",
    "khan", "khar", "khat", "khvt", "lhan", "lhar", "lhat", "lhvt",
    "fepr", "gepr", "hepr", "iebe", "jeff", "jefp",
    "kehb", "kesp", "keww", "keks", "lefl", "levt", "lekl",
}

def get_class(code):
    if code in ("am11", "am12"):
        return int(code[2:])          # CBSE Applied Mathematics 11/12
    letter = code[0]
    if 'a' <= letter <= 'l':
        return ord(letter) - ord('a') + 1
    return 0

def norm(s):
    return set(re.findall(r'[a-z]{4,}', str(s).lower()))

def scan_cache():
    """All available book chapters from text_cache_new."""
    chapters = {}
    for f in sorted(os.listdir(NEW)):
        if not f.endswith(".txt"):
            continue
        code = f[:4]
        fp = os.path.join(NEW, f)
        try:
            head = open(fp, encoding="utf-8", errors="ignore").read(2000).lower()
        except Exception:
            continue
        # extract real chapter number
        m = re.search(r"chapter\s+(\d+)", head)
        if m:
            ch_num = int(m.group(1))
        else:
            digits = re.findall(r"\d+", f)
            ch_num = int(digits[-1]) if digits else 0
        subject = CODE_SUBJECT.get(code, "unknown")
        cls = get_class(code)
        words = norm(head)
        chapters[f[:-4]] = {
            "code": code, "file": f, "chapter": ch_num,
            "class": cls, "subject": subject,
            "language": code in LANGUAGE_CODES,
            "head_words": words, "source_file": fp,
        }
    return chapters

def scan_live_catalogs():
    """All live catalogs with their content fingerprints."""
    cats = {}
    for f in sorted(os.listdir(LIVE)):
        if not f.endswith(".json") or not f.startswith("catalog_"):
            continue
        try:
            cat = json.load(open(os.path.join(LIVE, f), encoding="utf-8"))
        except Exception:
            continue
        cls = cat.get("class", "?")
        subj = cat.get("subject", "?")
        title = norm(cat.get("chapter_title", ""))
        cons = cat.get("concepts", [])
        concept_words = set()
        for c in cons:
            concept_words.update(norm(c.get("title", "")))
            concept_words.update(norm(c.get("definition", "")))
        cats[f] = {
            "class": cls, "subject": subj, "title": title,
            "n_concepts": len(cons), "concept_words": concept_words,
        }
    return cats

def main():
    cache = scan_cache()
    catalogs = scan_live_catalogs()

    print(f"cache chapters: {len(cache)}")
    print(f"live catalogs: {len(catalogs)}")

    # group cache chapters by class+subject, languages excluded
    by_cs = collections.defaultdict(list)
    excluded_lang = collections.Counter()
    for stem, info in cache.items():
        if info.get("language"):
            excluded_lang[info["code"]] += 1
            continue
        by_cs[(info["class"], info["subject"])].append((stem, info))
    n_lang = sum(excluded_lang.values())
    print(f"language chapters out of scope: {n_lang} "
          f"({len(excluded_lang)} books)")

    # for each group, check which chapters have catalog coverage
    coverage = {}
    for (cls, subj), chapters in sorted(by_cs.items()):
        # find live catalogs for this class+subject
        matching = [(f, c) for f, c in catalogs.items()
                     if str(c["class"]) == str(cls) and c["subject"] == subj]
        covered_concepts = set()
        for _, c in matching:
            covered_concepts.update(c["concept_words"])
        entry = {
            "class": cls, "subject": subj,
            "total_chapters": len(chapters),
            "chapters_with_catalogs": 0,
            "chapters_missing": 0,
            "missing_list": [],
        }
        for stem, info in sorted(chapters, key=lambda x: x[1]["chapter"]):
            ch_words = info["head_words"]
            if not ch_words:
                entry["chapters_missing"] += 1
                entry["missing_list"].append(stem)
                continue
            # a chapter is "covered" if any live catalog for this class-subject
            # has >= 30% word overlap with the chapter's head words
            best = 0.0
            for _, c in matching:
                overlap = len(ch_words & c["concept_words"]) / max(1, len(ch_words))
                best = max(best, overlap)
            if best >= 0.25:
                entry["chapters_with_catalogs"] += 1
            else:
                entry["chapters_missing"] += 1
                entry["missing_list"].append(stem)
        coverage[f"class {cls} {subj}"] = entry

    # print table
    print(f"\n{'SUBJECT':26s} {'CLASS':5s} {'CH':4s} {'COVERED':8s} {'MISSING':8s} {'%':5s}")
    print("-" * 60)
    total_ch = total_cov = total_miss = 0
    for key in sorted(coverage):
        e = coverage[key]
        pct = f"{e['chapters_with_catalogs']*100//max(1,e['total_chapters']):3d}%"
        print(f"  {key:26s} {e['class']:3d}   {e['total_chapters']:3d}   "
              f"{e['chapters_with_catalogs']:5d}    {e['chapters_missing']:5d}   {pct}")
        total_ch += e["total_chapters"]
        total_cov += e["chapters_with_catalogs"]
        total_miss += e["chapters_missing"]
    print("-" * 60)
    pct = f"{total_cov*100//max(1,total_ch):3d}%"
    print(f"  {'TOTAL':26s}       {total_ch:4d}  {total_cov:5d}    {total_miss:5d}   {pct}")

    # save full map
    out = {"generated": True, "language_excluded": dict(excluded_lang),
           "coverage": {}}
    for key, e in coverage.items():
        out["coverage"][key] = e
    json.dump(out, open(OUT, "w", encoding="utf-8", newline=""),
              indent=1, ensure_ascii=False)
    print(f"\nsaved: {OUT}")

if __name__ == "__main__":
    main()
