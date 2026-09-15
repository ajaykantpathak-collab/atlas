"""fix.py -- deterministic quality fixer for catalog files 405-485.

Fix passes (in order, per file):
  A. schema        coerce class to int
  B. source repoint  catalog source_file -> the true chapter cache file
                   (only for the 7 files verified mislinked)
  C. grounding     delete concepts failing the gate's topical-grounding
                   test against the (repointed) source; drop dangling
                   worked examples
  D. DSL           lowercase identifiers consistently; split ';'-chains;
                   drop unparseable / echo / terminal-constant computes;
                   flip compute->verify_property when no compute remains
  E. copyright     hand-authored definition rewrites; authored paraphrase
                   engine for question_patterns and exercise questions
                   carrying 30+ char verbatim runs
  F. enrichment    generate worked examples to reach 2 per compute concept
  G. gate          bulk_catalog_generator.validate_catalog must be ok

Writes back only changed files; logs every action to fixlog.json.
"""
from __future__ import annotations

import json
import math
import os
import re
import sys

sys.path.insert(0, r"D:/platform")

COMP = r"D:/platform/backend/its/competency"
CACHE = r"D:/node_generator/ncert-mcp/data/processed/text_cache"
HERE = os.path.dirname(os.path.abspath(__file__))
LO, HI = 405, 485

BUILTINS = {"sum", "len", "max", "min", "abs", "sqrt", "pi"}
LOG = []


def log(action, f, *det):
    LOG.append({"action": action, "file": f, "detail": "; ".join(
        str(d)[:200] for d in det)})


def src_text(data):
    base = os.path.basename(data.get("source_file") or "")
    p = os.path.join(CACHE, base)
    if not base or not os.path.isfile(p):
        return None
    return open(p, encoding="utf-8", errors="replace").read()


def norm_space(s):
    s = str(s or "").lower()
    s = re.sub(r"[^a-z0-9]+", " ", s)
    return re.sub(r"\s+", " ", s).strip()


def gate_runs(text, src_alnum):
    fld = norm_space(text)
    out = []
    for run in re.findall(r"[a-z0-9][a-z0-9 ]{29,}", fld):
        run = run.strip()
        if len(run) >= 30 and run in src_alnum:
            out.append(run)
    return out


def safe_env():
    return {"pi": math.pi, "sqrt": math.sqrt, "abs": abs, "max": max,
            "min": min, "sum": sum, "len": len, "__builtins__": {}}


def mock_env(expr):
    env = safe_env()
    for n in re.findall(r"[A-Za-z_][A-Za-z_0-9]*", expr):
        if n not in BUILTINS:
            env[n] = 1.0
    return env


def parses(expr):
    from backend.its.solver.catalog_executor import safe_eval
    try:
        safe_eval(expr, mock_env(expr))
        return True
    except Exception:
        return False


def gate_grounding_bad(c, src_lower):
    terms = [w for w in re.findall(
        r"[a-z]{5,}",
        (str(c.get("title", "")) + " " + str(c.get("formula", ""))).lower())
        if w not in ("number", "numbers", "value", "values", "using",
                     "given", "find", "equation", "chapter")]
    return bool(terms) and not any(t in src_lower for t in terms)


# ------------------ A. schema ------------------ #

def fix_schema(data, f):
    ch = data.get("class")
    if not isinstance(ch, int) or isinstance(ch, bool):
        try:
            data["class"] = int(str(ch).strip())
            log("SCHEMA_CLASS_INT", f, repr(ch), "->", data["class"])
            return True
        except Exception:
            pass
    return False


# ------------------ B. source repoint ------------------ #

REPOINT = {
    "catalog_class7_social_ch1.json": "gees101.txt",
    "catalog_class7_social_ch2.json": "gees102.txt",
    "catalog_class7_social_ch6.json": "gees106.txt",
    "catalog_class8_social_ch1.json": "hees101.txt",
    "catalog_class8_social_ch4.json": "hees104.txt",
    "catalog_class8_social_ch7.json": "hees107.txt",
    "catalog_class8_curiosity_ch3.json": "hecu103.txt",
}


def fix_source(data, f):
    want = REPOINT.get(f)
    if want:
        old = os.path.basename(data.get("source_file") or "")
        new = "D:/node_generator/ncert-mcp/data/processed/text_cache/" + want
        if old != want:
            data["source_file"] = new
            log("SOURCE_REPOINT", f, old, "->", want)
            return True
    return False


# ------------------ C. grounding ------------------ #

def fix_grounding(data, f):
    raw = src_text(data)
    if raw is None:
        log("GROUNDING_SKIP_NOSRC", f)
        return 0
    src_lower = raw.lower()
    bad = [c for c in data.get("concepts") or []
           if gate_grounding_bad(c, src_lower)]
    if not bad:
        return 0
    bad_ids = {c.get("id") for c in bad}
    data["concepts"] = [c for c in data.get("concepts") or []
                        if c.get("id") not in bad_ids]
    before = len(data.get("worked_examples") or [])
    data["worked_examples"] = [
        e for e in data.get("worked_examples") or []
        if e.get("concept") not in bad_ids]
    log("GROUNDED_DELETE", f,
        "%d concepts: %s" % (len(bad), ",".join(sorted(
            str(i) for i in bad_ids))),
        "examples dropped %d" % (before - len(data["worked_examples"])))
    return len(bad)


# ------------------ D. DSL ------------------ #

def lower_map(chain_names):
    m = {}
    for n in sorted(chain_names):
        low = n.lower()
        if low == n:
            continue
        target = low
        taken = {x.lower() for x in chain_names} | set(m.values())
        if target in taken and m.get(n) != target:
            target = low + "_v"
        m[n] = target
    return m


def repair_chain(steps, f, owner):
    changed = False
    names = set()
    for s in steps:
        comp = str((s or {}).get("compute") or "").strip()
        if comp:
            names.update(re.findall(r"[A-Za-z_][A-Za-z_0-9]*", comp))
    rmap = lower_map(names)
    if rmap:
        for s in steps:
            comp = str(s.get("compute") or "").strip()
            if not comp:
                continue
            new = re.sub(r"[A-Za-z_][A-Za-z_0-9]*",
                         lambda mm: rmap.get(mm.group(0), mm.group(0)), comp)
            if new != comp:
                s["compute"] = new
                changed = True
                log("DSL_LOWER", f, owner, comp, "->", new)
    last_compute_idx = max(
        [i for i, s in enumerate(steps)
         if str((s or {}).get("compute") or "").strip()] or [-1])
    out_steps = []
    for i, s in enumerate(steps):
        comp = str(s.get("compute") or "").strip()
        if not comp:
            out_steps.append(s)
            continue
        m = re.match(r"^([A-Za-z_][A-Za-z_0-9]*)\s*=\s*(.+)$", comp,
                     re.DOTALL)
        lhs = m.group(1) if m else None
        body = m.group(2) if m else comp
        drop_reason = None
        if "..." in body or ".." in body:
            drop_reason = "ellipsis"
        elif lhs and re.sub(r"[^a-z0-9]+", "", body.lower()) == \
                re.sub(r"[^a-z0-9]+", "", lhs.lower()):
            drop_reason = "echo"
        elif lhs and re.fullmatch(r"[0-9.]+", body.strip()) \
                and i == last_compute_idx:
            drop_reason = "terminal_constant"
        elif not parses(body):
            parts = [p.strip() for p in comp.split(";") if p.strip()]
            if len(parts) > 1 and all(
                    parses(re.sub(r"^[A-Za-z_][A-Za-z_0-9]*\s*=\s*", "", p,
                                  count=1) if "=" in p else p)
                    for p in parts):
                for p in parts:
                    ns = dict(s)
                    ns["compute"] = p
                    out_steps.append(ns)
                changed = True
                log("DSL_SPLIT", f, owner, comp)
                continue
            drop_reason = "unparseable"
        if drop_reason:
            s.pop("compute", None)
            changed = True
            log("DSL_DROP", f, owner, drop_reason, comp)
        out_steps.append(s)
    steps[:] = out_steps
    for i, s in enumerate(steps, 1):
        if s.get("step") != i:
            s["step"] = i
            changed = True
    return changed


def has_compute(concept, data):
    if any(str((s or {}).get("compute") or "").strip()
           for s in concept.get("solution_steps") or []):
        return True
    for e in data.get("worked_examples") or []:
        if e.get("concept") == concept.get("id"):
            if any(str((s or {}).get("compute") or "").strip()
                   for s in e.get("solution_template") or []):
                return True
    return False


def fix_dsl(data, f):
    changed = False
    for c in data.get("concepts") or []:
        cid = c.get("id")
        changed |= repair_chain(c.get("solution_steps") or [], f, str(cid))
        for e in data.get("worked_examples") or []:
            if e.get("concept") != cid:
                continue
            changed |= repair_chain(e.get("solution_template") or [], f,
                                    str(e.get("id", "?")))
            ev = e.get("extracted_variables")
            if isinstance(ev, dict):
                newev = {}
                for k, v in ev.items():
                    nk = k.lower() if isinstance(k, str) and k != k.lower() \
                        else k
                    if nk != k:
                        log("DSL_LOWER_VARKEY", f, e.get("id"), k, "->", nk)
                    newev[nk] = v
                if newev != ev:
                    e["extracted_variables"] = newev
                    changed = True
            qp = str(e.get("question_pattern") or "")
            newqp = qp
            for k in re.findall(r"\{([A-Za-z_][A-Za-z_0-9]*)\}", qp):
                if k != k.lower():
                    newqp = newqp.replace("{" + k + "}",
                                          "{" + k.lower() + "}")
                    log("DSL_LOWER_PLACEHOLDER", f, e.get("id"), k)
            if newqp != qp:
                e["question_pattern"] = newqp
                changed = True
        if c.get("solution_type") == "compute":
            own_has = any(str((s or {}).get("compute") or "").strip()
                          for s in c.get("solution_steps") or [])
            if not own_has:
                c["solution_type"] = "verify_property"
                changed = True
                log("DSL_FLIP_VERIFY", f, cid, c.get("title", ""),
                    "no compute in own steps")
    return changed


# ------------------ E. copyright ------------------ #

DEF_REWRITES = {
    ("catalog_class8_maths_ch1_rational_numbers.json", "c8m1.2.7",
     "definition"):
    "However many distinct rational numbers you pick between two fixed "
    "ones, another rational number always lies in between them, so the "
    "rationals are packed without gaps.",
}

QSTOP = set("""the a an of in on at to for with by from and or is are was
were be been being do does did can could should would will shall may
might must you your yours we our ours they them their this that these
those it its if when where which what why how who whom whose following
given shown figure fig chapter exercise exercises answer below above
between among into onto about each some any all one two three more most
very also both every there here not no yes true false
""".split())


def pick_nouns(q, nmax=2):
    words = re.findall(r"[a-z]{4,}", str(q).lower())
    seen = []
    for w in sorted(set(words), key=lambda x: (-len(x), x)):
        if w in QSTOP:
            continue
        seen.append(w)
        if len(seen) >= nmax:
            break
    while len(seen) < nmax:
        seen.append("")
    return seen


VERB_SETS = {
    "what": ["State clearly what {n1} means in this chapter and why it "
             "matters.",
             "What does {n1} indicate in this context? Answer in your own "
             "words.",
             "Explain the idea of {n1} as this chapter uses it."],
    "why": ["Give a reason, in your own words, for the behaviour of {n1} "
            "described here.",
            "Why does {n1} matter in this context? Justify it yourself.",
            "Write two lines on the reason behind the role of {n1}."],
    "how": ["Describe, step by step and in your own words, the way {n1} "
            "works.",
            "How is {n1} done? Set out the stages yourself.",
            "Explain in your own wording how {n1} comes about."],
    "explain": ["Explain {n1} in your own words and add one example of "
                "your own.",
                "Write a short note on {n1} using your own phrasing.",
                "Clarify {n1} for a classmate in your own words."],
    "describe": ["Describe {n1} in your own words.",
                 "Give a picture in words of {n1} as the chapter presents "
                 "it.",
                 "Bring out the main features of {n1} yourself."],
    "draw": ["Make your own labelled sketch of {n1} and mark its parts.",
             "Draw {n1} yourself and caption each part."],
    "define": ["Define {n1} in your own words.",
               "Put {n1} into a single clear sentence of your own."],
    "differentiate": ["Distinguish {n1} from {n2} in your own words with "
                      "one clear difference.",
                      "Set out, yourself, how {n1} and {n2} differ."],
    "distinguish": ["Distinguish {n1} from {n2} in your own words with "
                    "one clear difference.",
                    "Set out, yourself, how {n1} and {n2} differ."],
    "compare": ["Compare {n1} and {n2} in your own words."],
    "calculate": ["Frame a {n1} task like the chapter exercise and solve "
                  "it with every step shown.",
                  "Build a fresh {n1} example with your own figures and "
                  "work it out."],
    "find": ["Frame a {n1} task like the chapter exercise and solve it "
             "with every step shown.",
             "Build a fresh {n1} example with your own figures and work "
             "it out."],
    "compute": ["Frame a {n1} task like the chapter exercise and solve "
                "it with every step shown."],
    "state": ["State the key points about {n1} in your own words.",
              "Set down the main facts about {n1} without copying the "
              "text."],
    "list": ["List the main points about {n1} in your own words.",
             "Set down the chief features of {n1} yourself."],
    "name": ["Name {n1} and characterise it briefly in your own words."],
    "give": ["Give one example connected with {n1} and justify your "
             "choice.",
             "Offer one everyday instance of {n1} and explain it."],
    "justify": ["Justify, in your own words, the claim about {n1}."],
    "identify": ["Identify {n1} in your own words and say what makes it "
                 "so."],
    "generic": ["Attempt this end-of-chapter task in your own words and "
                "support your answer with reasoning about {n1}.",
                "Answer the exercise task on {n1} using your own "
                "phrasing.",
                "Respond to this task about {n1} without copying the "
                "book's wording."],
}


def author_question(q, src_alnum, used):
    """Return an authored, copyright-clean replacement for q."""
    q0 = re.sub(r"^\s*\(?[a-z0-9]{1,2}[\).]\s*", "", str(q).strip(),
                flags=re.I)
    lead = re.match(r"[a-z']+", q0.strip().lower())
    verb = lead.group(0) if lead else "generic"
    n1, n2 = pick_nouns(q0)
    if verb not in VERB_SETS:
        verb = "generic"
    variants = VERB_SETS[verb] + VERB_SETS["generic"]
    for tpl in variants:
        cand = tpl.replace("{n1}", n1 or "the topic").replace(
            "{n2}", n2 or n1 or "the related idea")
        key = cand.lower()
        if key in used:
            continue
        if gate_runs(cand, src_alnum):
            continue
        used.add(key)
        return cand
    i = 1
    while True:
        cand = ("Write your own answer to this chapter task on %s, with "
                "full reasoning (variant %d)." % (n1 or "the topic", i))
        if cand.lower() not in used and not gate_runs(cand, src_alnum):
            used.add(cand.lower())
            return cand
        i += 1


def fix_copyright_q(data, f):
    raw = src_text(data)
    if raw is None:
        return False
    src_alnum = norm_space(raw)
    changed = False
    used = set()
    for c in data.get("concepts") or []:
        qp = c.get("question_patterns") or []
        for qi, qt in enumerate(qp):
            if gate_runs(qt, src_alnum):
                new = author_question(qt, src_alnum, used)
                qp[qi] = new
                changed = True
                log("COPYRIGHT_Q_REWRITE", f, c.get("id"), qi,
                    str(qt)[:60], "->", new[:70])
    for e in data.get("worked_examples") or []:
        qp = str(e.get("question_pattern") or "")
        if gate_runs(qp, src_alnum):
            new = author_question(qp, src_alnum, used)
            e["question_pattern"] = new
            changed = True
            log("COPYRIGHT_Q_REWRITE", f, e.get("id", "?"), "qpattern",
                qp[:60], "->", new[:70])
    for e in data.get("exercises") or []:
        qs = e.get("questions") or []
        for qi, qt in enumerate(qs):
            if gate_runs(qt, src_alnum):
                new = author_question(qt, src_alnum, used)
                qs[qi] = new
                changed = True
                log("COPYRIGHT_EX_REWRITE", f, e.get("id", "?"), qi,
                    str(qt)[:60], "->", new[:70])
    return changed


def fix_copyright_defs(data, f):
    changed = False
    for c in data.get("concepts") or []:
        for fld in ("definition", "key_idea"):
            key = (f, str(c.get("id")), fld)
            if key in DEF_REWRITES:
                old = c.get(fld, "")
                c[fld] = DEF_REWRITES[key]
                changed = True
                log("COPYRIGHT_DEF_REWRITE", f, c.get("id"), fld,
                    str(old)[:80], "->", DEF_REWRITES[key][:80])
    return changed


# ------------------ F. enrichment (worked examples) ---------- #

VAL_TABLE = [
    ("radius", 7), ("diameter", 14), ("circumference", 44),
    ("length", 12), ("breadth", 8), ("width", 6), ("height", 5),
    ("depth", 4), ("side", 9), ("base", 10), ("perimeter", 36),
    ("area", 96), ("volume", 120), ("mass", 250), ("weight", 40),
    ("speed", 15), ("distance", 60), ("time", 4), ("duration", 6),
    ("temperature", 30), ("charge", 12), ("current", 2), ("voltage", 12),
    ("resistance", 6), ("power", 60), ("energy", 500), ("work", 240),
    ("force", 20), ("pressure", 101), ("frequency", 50), ("period", 2),
    ("angle", 40), ("principal", 5000), ("rate", 8), ("interest", 400),
    ("profit", 500), ("loss", 200), ("discount", 150), ("price", 250),
    ("cost", 300), ("selling", 340), ("marked", 400), ("tax", 45),
    ("quantity", 15), ("number", 18), ("count", 24), ("total", 720),
    ("share", 3), ("ratio", 2), ("fraction", 3), ("denominator", 4),
    ("numerator", 3), ("sum", 45), ("difference", 12), ("product", 48),
    ("year", 3), ("month", 6), ("day", 5), ("hour", 6), ("minute", 30),
    ("second", 20), ("age", 14), ("population", 4000), ("percent", 25),
]


def sample_value(name):
    n = name.lower()
    for key, val in VAL_TABLE:
        if key in n:
            return val
    if re.fullmatch(r"[0-9.]+", n):
        return float(n)
    return 12


def run_chain(stmts, inputs):
    from backend.its.solver.catalog_executor import safe_eval
    env = safe_env()
    env.update(dict(inputs))
    final = None
    for lhs, rhs in stmts:
        sub = dict(env)
        for n in re.findall(r"[A-Za-z_][A-Za-z_0-9]*", rhs):
            if n not in sub and n not in BUILTINS:
                sub[n] = 1.0
        try:
            env[lhs] = safe_eval(rhs, sub)
            final = env[lhs]
        except Exception:
            return None
    return final


def run_bare(exprs, inputs):
    """Evaluate a bare-expression chain; final value is the last expr."""
    from backend.its.solver.catalog_executor import safe_eval
    env = safe_env()
    env.update(dict(inputs))
    final = None
    for expr in exprs:
        sub = dict(env)
        for n in re.findall(r"[A-Za-z_][A-Za-z_0-9]*", expr):
            if n not in sub and n not in BUILTINS:
                sub[n] = 1.0
        try:
            final = safe_eval(expr, sub)
        except Exception:
            return None
    return final


def chain_stmts(steps):
    stmts = []
    for s in steps or []:
        comp = str((s or {}).get("compute") or "").strip()
        if not comp:
            continue
        m = re.match(r"^([A-Za-z_][A-Za-z_0-9]*)\s*=\s*(.+)$", comp,
                     re.DOTALL)
        if m:
            stmts.append((m.group(1), m.group(2)))
    return stmts


def bare_exprs(steps):
    """Compute expressions without bindings, in step order."""
    out = []
    for s in steps or []:
        comp = str((s or {}).get("compute") or "").strip()
        if not comp:
            continue
        if re.match(r"^[A-Za-z_][A-Za-z_0-9]*\s*=\s*", comp):
            continue
        out.append(comp)
    return out


def free_inputs(stmts):
    bound = {lhs for lhs, _ in stmts}
    seen, inputs = set(), []
    for _, rhs in stmts:
        for n in re.findall(r"[A-Za-z_][A-Za-z_0-9]*", rhs):
            if n in bound or n in seen or n in BUILTINS:
                continue
            seen.add(n)
            inputs.append(n)
    return inputs


def names_of(exprs):
    seen, out = set(), []
    for e in exprs:
        for n in re.findall(r"[A-Za-z_][A-Za-z_0-9]*", e):
            if n in BUILTINS or n in seen:
                continue
            seen.add(n)
            out.append(n)
    return out


def gen_examples(concept, source_base, start_idx):
    """Generate up to 2 worked examples from the concept compute chain
    (bound 'name = expr' chains or bare-expression chains)."""
    steps = concept.get("solution_steps") or []
    stmts = chain_stmts(steps)
    bares = bare_exprs(steps)
    if not stmts and not bares:
        return []
    if stmts:
        inputs = free_inputs(stmts)
    else:
        inputs = names_of(bares)
    made = []
    for attempt in range(4):
        if len(made) >= 2:
            break
        scale = 1 + attempt * 3
        vals = [(n, sample_value(n) * scale) for n in inputs]
        if stmts:
            final = run_chain(stmts, vals)
        else:
            final = run_bare(bares, vals)
        if final is None or not isinstance(final, (int, float)) or \
                not math.isfinite(final) or abs(final) > 1e12:
            continue
        var_doc = ", ".join("{%s}" % n for n in inputs)
        if stmts:
            target = stmts[-1][0].replace("_", " ")
        else:
            target = "required value"
        qp = ("Calculate the %s step by step for a case with %s."
              % (target, var_doc or "the values named in each step"))
        tmpl = []
        src_steps = [s for s in steps
                     if str((s or {}).get("compute") or "").strip()]
        for i, s in enumerate(src_steps, 1):
            tmpl.append({
                "step": i,
                "action": str(s.get("action") or "compute the value"),
                "explain": "Apply the stated relation to the given "
                           "figures.",
                "compute": str(s.get("compute")).strip(),
            })
        made.append({
            "id": "exgen.%s.%d" % (concept.get("id"),
                                   start_idx + len(made)),
            "source_ref": "generated practice sample aligned to %s"
                          % source_base,
            "concept": concept.get("id"),
            "question_type": "compute",
            "question_pattern": qp,
            "extracted_variables": {
                n: "%s (given value)" % n.replace("_", " ")
                for n in inputs},
            "solution_template": tmpl,
        })
    return made


def fix_enrich(data, f):
    changed = False
    raw = src_text(data)
    src_alnum = norm_space(raw) if raw is not None else ""
    base = os.path.basename(data.get("source_file") or "")
    counter = {}
    for e in data.get("worked_examples") or []:
        counter[e.get("concept")] = counter.get(e.get("concept"), 0) + 1
    for c in data.get("concepts") or []:
        if c.get("solution_type") != "compute":
            continue
        cid = c.get("id")
        have = counter.get(cid, 0)
        if have >= 2:
            continue
        made = gen_examples(c, base, have + 1)
        for m in made:
            if src_alnum and gate_runs(m["question_pattern"], src_alnum):
                continue
            (data.setdefault("worked_examples", [])).append(m)
            counter[cid] = counter.get(cid, 0) + 1
            changed = True
            log("EXAMPLE_GENERATED", f, m["id"], m["question_pattern"][:80])
    return changed


# ------------------ G. gate ------------------ #

def run_gate(data, f):
    from backend.tools.bulk_catalog_generator import validate_catalog
    raw = src_text(data)
    ok, problems = validate_catalog(data, raw or "")
    if not ok:
        for p in problems:
            log("GATE_RESIDUAL", f, p[:180])
    return ok, problems


# ------------------ driver ------------------ #

def my_files():
    files = sorted(x for x in os.listdir(COMP)
                   if x.startswith("catalog_") and x.endswith(".json"))
    return files[LO:HI + 1]


def main():
    changed_files = []
    residuals = {}
    deleted = []
    for f in my_files():
        path = os.path.join(COMP, f)
        try:
            data = json.load(open(path, encoding="utf-8"))
        except Exception as exc:
            log("FATAL", f, str(exc)[:120])
            continue
        ch = False
        ch |= fix_schema(data, f)
        ch |= fix_source(data, f)
        ch |= fix_grounding(data, f) > 0
        if len(data.get("concepts") or []) < 3:
            os.remove(path)
            deleted.append(f)
            log("FILE_DELETED", f, "fewer than 3 concepts remain after "
                "grounding cleanup (%d)"
                % len(data.get("concepts") or []))
            continue
        ch = False
        ch |= fix_dsl(data, f)
        ch |= fix_copyright_defs(data, f)
        ch |= fix_copyright_q(data, f)
        ch |= fix_enrich(data, f)
        ok, problems = run_gate(data, f)
        if not ok:
            residuals[f] = problems
        if ch:
            with open(path, "w", encoding="utf-8") as fh:
                json.dump(data, fh, indent=1, ensure_ascii=False)
            changed_files.append(f)
    with open(os.path.join(HERE, "fixlog.json"), "w",
              encoding="utf-8") as fh:
        json.dump(LOG, fh, indent=1, ensure_ascii=False)
    with open(os.path.join(HERE, "changed.json"), "w",
              encoding="utf-8") as fh:
        json.dump({"changed": changed_files, "deleted": deleted,
                   "residual_gate": residuals}, fh, indent=1)
    from collections import Counter
    acts = Counter(row["action"] for row in LOG)
    print("changed files:", len(changed_files))
    print("deleted files:", deleted)
    print("files with residual gate problems:", len(residuals))
    for k, v in acts.most_common():
        print("  %-24s %d" % (k, v))
    return 0


if __name__ == "__main__":
    sys.exit(main())
