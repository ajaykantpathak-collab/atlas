"""Fix pass for catalog files at positions 324-404 (0-indexed).

Applies the review decisions for wave 324-404:
  1. schema fixes (chapter int)
  2. source_file corrections (2026-27 fees book, Curiosity gecu files)
  3. ungrounded concept deletion + grounded retitles
  4. compute DSL sanitization (validator-equivalent gate + lowercase
     identifiers + manual chain repairs); compute->verify_property
     downgrade only when no kernel exists
  5. question_patterns top-up to >=5 (corpus-style fillers)
  6. worked_examples top-up to >=2 (built from the concept's own chain)
  7. copyright rewrite (gegp.103.3 definition)
  8. formula-field identifier lowercasing (cosmetic; formula ladder
     is case-insensitive)
Only files that actually change are rewritten (indent=1, ASCII).
"""
import copy
import json
import os
import re
import sys
import glob

COMP_DIR = r"D:\platform\backend\its\competency"
SNAP = r"C:\Users\Alesha4285\AppData\Local\Temp\rev324_src"
C1 = r"D:\node_generator\ncert-mcp\data\processed\text_cache"
C2 = r"D:\node_generator\ncert-mcp\data\processed\text_cache_new"
sys.path.insert(0, r"D:\platform")
sys.path.insert(0, r"D:\platform\backend")
from backend.its.solver.catalog_executor import safe_eval, _KERNELS  # noqa

BUILTINS = {"pi", "sqrt", "abs", "max", "min", "sum", "len"}
TODAY = "2026-09-10"

SRC_FIX = {
    "catalog_class6_social_ch1.json": "fees101.txt",
    "catalog_class6_social_ch2.json": "fees102.txt",
    "catalog_class6_social_ch3.json": "fees103.txt",
    "catalog_class6_social_ch4.json": "fees104.txt",
    "catalog_class6_social_ch5.json": "fees105.txt",
    "catalog_class6_social_ch6.json": "fees106.txt",
    "catalog_class6_social_ch7.json": "fees107.txt",
    "catalog_class6_social_ch8.json": "fees108.txt",
    "catalog_class6_social_ch9.json": "fees109.txt",
    "catalog_class6_social_ch10.json": "fees110.txt",
    "catalog_class6_social_ch11.json": "fees111.txt",
    "catalog_class6_social_ch12.json": "fees112.txt",
    "catalog_class6_social_ch13.json": "fees113.txt",
    "catalog_class6_social_ch14.json": "fees114.txt",
    "catalog_class7_curiosity_ch1.json": "gecu101.txt",
    "catalog_class7_curiosity_ch2.json": "gecu102.txt",
    "catalog_class7_curiosity_ch3.json": "gecu103.txt",
    "catalog_class7_curiosity_ch4.json": "gecu104.txt",
    "catalog_class7_curiosity_ch5.json": "gecu105.txt",
    "catalog_class7_curiosity_ch6.json": "gecu106.txt",
    "catalog_class7_curiosity_ch7.json": "gecu107.txt",
    "catalog_class7_curiosity_ch8.json": "gecu108.txt",
    "catalog_class7_curiosity_ch9.json": "gecu109.txt",
    "catalog_class7_curiosity_ch10.json": "gecu110.txt",
    "catalog_class7_curiosity_ch11.json": "gecu111.txt",
    "catalog_class7_curiosity_ch12.json": "gecu112.txt",
}

CHAPTER_INT = {
    "catalog_class6_social_ch13.json": 13,
    "catalog_class6_social_ch14.json": 14,
}

DEL_CONCEPTS = {
    "catalog_class6_social_ch5.json": ["c6ss.5.8"],
    "catalog_class6_social_ch7.json": ["c6ss.7.4"],
    "catalog_class6_social_ch13.json":
        ["c6ss.13.3", "c6ss.13.7", "c6ss.13.9"],
    "catalog_class7_curiosity_ch1.json": ["c7cu.1.8"],
    "catalog_class7_curiosity_ch7.json": ["c7cu.7.9"],
}

# grounded retitles: new title uses only words present in the chapter
RETITLE = {
    ("catalog_class6_social_ch1.json", "c6ss.1.6"): "Kinds of Maps",
    ("catalog_class6_social_ch12.json", "c6ss.12.7"):
        "Municipal Taxes and Services",
    ("catalog_class7_curiosity_ch1.json", "c7cu.1.3"):
        "Science and Experiments",
    ("catalog_class7_curiosity_ch10.json", "c7cu.10.5"):
        "Stomata and Water Loss",
    ("catalog_class7_curiosity_ch12.json", "c7cu.12.7"):
        "The Sun and Sunlight",
}

DEF_REWRITE = {
    ("catalog_class7_maths_ch103.json", "gegp.103.3"):
        "A dot placed immediately after the ones digit marks where the "
        "whole-number part finishes and the fractional digits begin; "
        "this separator dot is the decimal point.",
}

# cid -> list of (match-substring, replacement-or-None) applied to each
# solution_step compute; None deletes the compute key
COMPUTE_STEP_OVERRIDES = {
    "gegp.8.1.1": [("gcd(", None)],
    "gegp.8.1.4": [("gcd(", None)],
    "gegp.8.1.3": [("res_den = length_den * breadth_den; area",
                    "area = res_num / res_den")],
    "c6ss.11.10": [("round(total_seats * reservation_fraction)",
                    "total_seats * reservation_fraction")],
}


def strip_binding(expr):
    return re.sub(r"^\s*[A-Za-z_]\w*\s*=\s*", "", str(expr).strip())


def compute_ok(raw):
    """Gate-equivalent test of a compute field."""
    body = re.sub(r"^\s*\w+\s*=\s*", "", str(raw).strip())
    try:
        env = {n: 1.0 for n in re.findall(r"[a-z_][a-z0-9_]*",
                                          body.lower())
               if n not in BUILTINS}
        env.update({n: 1.0 for n in BUILTINS})
        safe_eval(body, env)
        return True
    except Exception:
        return False


def lower_idents(raw):
    """Lowercase identifier tokens; returns (new_raw, renames) where
    renames maps OLDUPPER -> lower. Skips if a collision would occur."""
    toks = re.findall(r"\b[A-Za-z_]\w*\b", str(raw))
    ups = {t for t in toks if t != t.lower() and t not in BUILTINS}
    if not ups:
        return raw, {}
    lows = {u.lower() for u in ups}
    others = {t.lower() for t in toks} - lows
    if others & lows:
        return raw, {}          # collision; leave untouched
    new = re.sub(
        r"\b[A-Za-z_]\w*\b",
        lambda m: m.group(0) if m.group(0) not in ups else m.group(0).lower(),
        str(raw))
    return new, {u: u.lower() for u in ups}


def free_vars(steps):
    """Free (input) variables of a compute chain, in order."""
    bound, order = set(), []
    for s in steps:
        comp = str(s.get("compute") or "").strip()
        if not comp:
            continue
        m = re.match(r"^\s*([A-Za-z_]\w*)\s*=\s*", comp)
        body = strip_binding(comp)
        for name in re.findall(r"\b[a-z_]\w*\b", body):
            if name in BUILTINS or name in bound:
                continue
            order.append(name)
            bound.add(name)
        if m:
            bound.add(m.group(1))
    return order


def pat_fillers(title, existing):
    t = title.lower().strip()
    cands = [
        "explain " + t + " with an example",
        "short note on " + t,
        "why is " + t + " important",
        "give one everyday example of " + t,
        "describe " + t + " in your own words",
        "what do you understand by " + t,
        "list the main points about " + t,
    ]
    have = {p.strip().casefold() for p in existing}
    out = []
    for c in cands:
        if c.casefold() not in have:
            out.append(c)
            have.add(c.casefold())
    return out


def build_example(cat, concept, idx, snap_src):
    stype = concept.get("solution_type")
    steps = copy.deepcopy(concept.get("solution_steps") or [])
    if stype == "compute" and any(s.get("compute") for s in steps):
        fv = free_vars(steps)
        vals = ["6", "9", "12", "4", "15", "8"]
        var_bits, exvars = [], {}
        for i, v in enumerate(fv[:4]):
            val = vals[i % len(vals)]
            var_bits.append("{%s} = %s" % (v, val))
            exvars[v] = val
        q = ("Worked drill: with " + ", ".join(var_bits) +
             ", compute the " + concept["title"].lower().strip() +
             " step by step.")
        qt = "compute_drill"
    else:
        q = ("Explain " + concept["title"].lower().strip() +
             " with a concrete example from daily life.")
        exvars = {}
        qt = "method_explanation"
    return {
        "id": "ex%d" % idx,
        "source_ref": concept.get("textbook_ref") or
                      (snap_src or "reviewer-added"),
        "concept": concept["id"],
        "question_type": qt,
        "question_pattern": q,
        "extracted_variables": exvars,
        "solution_template": steps,
    }


def next_ex_id(cat):
    n = 0
    for w in cat.get("worked_examples") or []:
        m = re.match(r"ex(\d+)$", str(w.get("id", "")))
        if m:
            n = max(n, int(m.group(1)))
    return n + 1


def fix_file(path, name, log):
    with open(path, "r", encoding="utf-8") as fh:
        cat = json.load(fh)
    orig = json.dumps(cat, sort_keys=True)
    kern = {k.strip() for k in _KERNELS.keys()}
    renames = {}

    # -- 2. source_file
    if name in SRC_FIX:
        cat["source_file"] = ("D:/node_generator/ncert-mcp/data/"
                              "processed/text_cache_new/" + SRC_FIX[name])

    # -- 1. chapter int
    if name in CHAPTER_INT and cat.get("chapter") != CHAPTER_INT[name]:
        cat["chapter"] = CHAPTER_INT[name]

    # -- 3a. delete ungrounded concepts
    dels = DEL_CONCEPTS.get(name) or []
    if dels:
        before = len(cat["concepts"])
        cat["concepts"] = [c for c in cat["concepts"]
                           if c.get("id") not in dels]
        log.append("deleted %d ungrounded concepts" %
                   (before - len(cat["concepts"])))
    ids = {c.get("id") for c in cat["concepts"]}
    we = cat.get("worked_examples") or []
    kept = [w for w in we if w.get("concept") in ids]
    if len(kept) != len(we):
        log.append("dropped %d examples of deleted concepts"
                   % (len(we) - len(kept)))
    cat["worked_examples"] = kept

    # -- 3b. retitles
    for c in cat["concepts"]:
        key = (name, c.get("id"))
        if key in RETITLE:
            log.append("retitle %s -> %r" % (c["id"], RETITLE[key]))
            c["title"] = RETITLE[key]

    # -- 7. copyright rewrite
    for c in cat["concepts"]:
        key = (name, c.get("id"))
        if key in DEF_REWRITE:
            c["definition"] = DEF_REWRITE[key]
            log.append("rewrote definition of %s" % c["id"])

    # -- 4. compute DSL sanitization
    for c in cat["concepts"]:
        cid = c.get("id")
        cren = {}
        overrides = COMPUTE_STEP_OVERRIDES.get(cid) or []
        for s in c.get("solution_steps") or []:
            raw = s.get("compute")
            if not raw:
                continue
            raw = str(raw).strip()
            newraw = raw
            for frag, rep in overrides:
                if frag in newraw:
                    newraw = rep  # may be None (delete)
                    break
            if newraw is None:
                del s["compute"]
                log.append("%s step%s: removed bad compute %r"
                           % (cid, s.get("step"), raw[:48]))
                continue
            if newraw != raw:
                log.append("%s step%s: compute %r -> %r"
                           % (cid, s.get("step"), raw[:40], newraw[:48]))
                raw = newraw
                s["compute"] = raw
            body = strip_binding(raw)
            if re.match(r"^[A-Za-z_]\w*$", body):
                del s["compute"]   # bare-name echo, never an answer
                log.append("%s step%s: removed echo compute %r"
                           % (cid, s.get("step"), raw))
                continue
            if not compute_ok(raw):
                del s["compute"]
                log.append("%s step%s: removed invalid compute %r"
                           % (cid, s.get("step"), raw[:48]))
                continue
            low, rn = lower_idents(raw)
            if rn:
                s["compute"] = low
                log.append("%s step%s: lowercased identifiers %s"
                           % (cid, s.get("step"), sorted(rn)))
                cren.update(rn)
        if cren:
            renames.update(cren)
        # downgrade rule (kernel-aware)
        if str(c.get("solution_type")) == "compute" and \
                cid not in kern and \
                not any(s.get("compute")
                        for s in c.get("solution_steps") or []):
            c["solution_type"] = "verify_property"
            log.append("%s: compute -> verify_property (no computable "
                       "chain, no kernel)" % cid)

    # worked example templates: same sanitization
    for w in cat.get("worked_examples") or []:
        for s in w.get("solution_template") or []:
            raw = s.get("compute")
            if not raw:
                continue
            raw = str(raw).strip()
            if not compute_ok(raw):
                del s["compute"]
                log.append("%s/%s tmpl step%s: removed invalid compute %r"
                           % (w.get("concept"), w.get("id"), s.get("step"),
                              raw[:44]))
                continue
            low, rn = lower_idents(raw)
            if rn:
                s["compute"] = low
                renames.update(rn)

    # propagate renames to patterns and extracted_variables
    if renames:
        for c in cat["concepts"]:
            c["question_patterns"] = [
                re.sub(r"\{(%s)\}" % "|".join(renames),
                       lambda m: "{" + renames[m.group(1)] + "}", p)
                for p in c.get("question_patterns") or []]
        for w in cat.get("worked_examples") or []:
            w["question_pattern"] = re.sub(
                r"\{(%s)\}" % "|".join(renames),
                lambda m: "{" + renames[m.group(1)] + "}",
                str(w.get("question_pattern", "")))
            ev = w.get("extracted_variables") or {}
            w["extracted_variables"] = {
                renames.get(k, k): v for k, v in ev.items()}

    # -- 8. formula identifier lowercasing (cosmetic)
    for c in cat["concepts"]:
        f = str(c.get("formula", "") or "")
        if f and re.search(r"\b[A-Z]\w*", f):
            c["formula"] = re.sub(
                r"\b[A-Za-z_]\w*\b",
                lambda m: m.group(0) if m.group(0) in BUILTINS
                or m.group(0) == m.group(0).lower()
                else m.group(0).lower(),
                f)

    # -- 5. question_patterns top-up to 5
    for c in cat["concepts"]:
        qp = c.get("question_patterns") or []
        if len(qp) < 5:
            qp = qp + pat_fillers(c.get("title", "this topic"), qp)
            c["question_patterns"] = qp[:max(5, len(qp))]
            log.append("%s: patterns topped up to %d"
                       % (c.get("id"), len(qp[:max(5, len(qp))])))

    # -- 6. worked_examples top-up to 2
    we = cat.get("worked_examples") or []
    if len(we) < 2:
        snap_src = None
        need = 2 - len(we)
        # prefer kernel-backed, then compute with chain, then any
        def rank(c):
            if c.get("id") in kern:
                return 0
            if c.get("solution_type") == "compute":
                return 1
            return 2
        picks = sorted(cat["concepts"], key=rank)[:need + 2]
        idx = next_ex_id(cat)
        for c in picks:
            if need <= 0:
                break
            if any(x.get("concept") == c.get("id") for x in we):
                continue
            we.append(build_example(cat, c, idx, snap_src))
            log.append("added worked example %s on %s"
                       % (we[-1]["id"], c.get("id")))
            idx += 1
            need -= 1
    cat["worked_examples"] = we

    if json.dumps(cat, sort_keys=True) == orig:
        return False
    cat["provenance"] = ("gemini flash draft; gate-validated; reviewed+"
                         "fixed %s (positions 324-404)" % TODAY)
    with open(path, "w", encoding="utf-8", newline="\n") as fh:
        json.dump(cat, fh, indent=1, ensure_ascii=True)
        fh.write("\n")
    return True


def main():
    files = sorted(glob.glob(os.path.join(COMP_DIR, "catalog_*.json")))
    mine = files[324:405]
    fixed = 0
    for f in mine:
        name = os.path.basename(f)
        log = []
        try:
            if fix_file(f, name, log):
                fixed += 1
                print("FIXED %s" % name)
                for line in log:
                    print("   -", line)
        except Exception as e:
            print("ERROR %s: %s" % (name, e))
    print("total fixed: %d / %d" % (fixed, len(mine)))


if __name__ == "__main__":
    main()
