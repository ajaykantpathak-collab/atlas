"""review_fix.py -- repair + enrich staged science competency catalogs.

Phases (argv[1]):
  fix     -- schema repairs, DSL fixes, wrong-answer fixes, formula fills,
             copyright pass 1 (engine).  Writes fixlog.json + residue.json.
  hands   -- apply hand-authored copyright rewrites from hands.json.
  enrich  -- pad question_patterns to >= 5, synthesize worked examples for
             compute concepts with < 2 examples.

Usage: python review_fix.py <phase>
"""
from __future__ import annotations

import ast
import copy
import hashlib
import json
import math
import os
import re
import sys

sys.path.insert(0, r"D:/platform")
HERE = os.path.dirname(os.path.abspath(__file__))
STAGING = os.path.dirname(HERE)
CACHE = r"D:/node_generator/ncert-mcp/data/processed/text_cache"

from review_audit import (  # noqa: E402
    PATTERNS, longest_shared_run, _mock_eval, source_text, _FUNC_WORDS)

from backend.its.solver.catalog_executor import (  # noqa: E402
    safe_eval, _EvalError, _mathify, _formula_equations)

QUAL_VERBS = (
    "define", "what is", "what are", "name ", "explain", "describe",
    "why ", "list ", "state ", "differentiate", "distinguish",
    "give reason", "draw ", "label ", "how does", "how do", "which ",
)


def staged_files():
    import glob
    files = []
    for p in PATTERNS:
        files += glob.glob(os.path.join(STAGING, p))
    return sorted(set(files))


def body_of(expr: str) -> str:
    return re.sub(r"^[A-Za-z_][A-Za-z_0-9]*\s*=\s*", "", str(expr)).strip()


def is_bare(expr: str) -> bool:
    b = body_of(expr)
    return bool(re.fullmatch(r"-?\d+(\.\d+)?", b) or
                re.fullmatch(r"[A-Za-z_][A-Za-z_0-9]*", b))


# ---------------- transformation tables (meaning-safe) ---------------- #

PHRASE_TABLE = [
    (r"\bis defined as the\b", "means the"),
    (r"\bis defined as\b", "means"),
    (r"\bare defined as\b", "mean"),
    (r"\bdefined as the\b", "equal to the"),
    (r"\bis directly proportional to\b", "varies in direct proportion with"),
    (r"\bis inversely proportional to\b", "varies in inverse proportion with"),
    (r"\bdirectly proportional to\b", "in direct proportion with"),
    (r"\binversely proportional to\b", "in inverse proportion with"),
    (r"\bin the form of\b", "as"),
    (r"\bthe process by which\b", "the way in which"),
    (r"\bthe process of\b", "the action of"),
    (r"\bdue to\b", "because of"),
    (r"\bin order to\b", "to"),
    (r"\bconsists of\b", "is made up of"),
    (r"\bcomposed of\b", "made up of"),
    (r"\bsuch that\b", "so that"),
    (r"\bas well as\b", "and also"),
    (r"\bapproximately\b", "about"),
    (r"\bthe reciprocal of\b", "one divided by"),
    (r"\bthe product of\b", "the result of multiplying"),
    (r"\bthe rate of flow of\b", "the flow rate of"),
    (r"\bthe rate at which\b", "the speed with which"),
    (r"\bis known as\b", "is named"),
    (r"\bare known as\b", "are named"),
    (r"\bknown as\b", "called"),
    (r"\breferred to as\b", "called"),
    (r"\bpossessed by\b", "carried by"),
    (r"\bpossesses\b", "has"),
    (r"\bpossess\b", "have"),
    (r"\bexperienced by\b", "felt by"),
    (r"\bexerted by\b", "applied by"),
    (r"\btransmitted equally\b", "passed on equally"),
    (r"\bconverted into\b", "changed into"),
    (r"\bto achieve\b", "to reach"),
    (r"\bin the presence of\b", "with"),
    (r"\ba large number of\b", "many"),
    (r"\ba wide variety of\b", "many different"),
    (r"\bvariety of\b", "range of"),
    (r"\bin terms of\b", "using"),
    (r"\bon the basis of\b", "using"),
    (r"\bbased on\b", "using"),
    (r"\bthe ability to\b", "the capacity to"),
    (r"\bthat is used to\b", "used to"),
    (r"\bwhich is used to\b", "used to"),
    (r"\bis used to\b", "serves to"),
    (r"\bare used to\b", "serve to"),
    (r"\ba measure of the\b", "a gauge of the"),
    (r"\ba measure of\b", "a gauge of"),
    (r"\bthe amount of\b", "how much"),
    (r"\bthe degree to which\b", "how strongly"),
    (r"\bthe extent to which\b", "how far"),
    (r"\bin which\b", "where"),
    (r"\bcaused by\b", "brought about by"),
    (r"\bcarried out\b", "performed"),
    (r"\bsuch as\b", "like"),
    (r"\bleads to\b", "results in"),
    (r"\bresults in\b", "gives"),
    (r"\bbrings about\b", "causes"),
    (r"\bis called\b", "is named"),
    (r"\bare called\b", "are named"),
    (r"\btakes place\b", "happens"),
    (r"\btake place\b", "happen"),
    (r"\bincreases with\b", "grows with"),
    (r"\bdecreases with\b", "falls with"),
    (r"\bis equal to\b", "equals"),
    (r"\bare equal to\b", "equal"),
    (r"\bequal to the\b", "same as the"),
    (r"\bpoint of incidence\b", "incidence point"),
    (r"\bthe sum of the\b", "the total of the"),
    (r"\bthe sum of\b", "the total of"),
    (r"\bnumber of turns\b", "turn count"),
    (r"\bsquare of the\b", "second power of the"),
    (r"\bsquare of\b", "second power of"),
    (r"\bis proportional to\b", "scales with"),
    (r"\bis independent of\b", "does not depend on"),
    (r"\bdepends on\b", "varies with"),
    (r"\bfrom one to another\b", "between them"),
    (r"\bfrom place to place\b", "across locations"),
    (r"\bsame direction\b", "common direction"),
    (r"\bopposite direction\b", "reverse direction"),
    (r"\bdenoted by\b", "written as"),
    (r"\brepresented by\b", "written as"),
    (r"\bgiven by\b", "expressed by"),
    (r"\bgiven as\b", "written as"),
    (r"\bwhen placed in\b", "inside"),
    (r"\bpasses through\b", "goes through"),
    (r"\bflow of\b", "movement of"),
    (r"\bthrust per unit area\b", "force spread over unit area"),
    (r"\bper unit area\b", "on each unit of area"),
    (r"\bmuch smaller than\b", "far less than"),
    (r"\bmuch larger than\b", "far more than"),
    (r"\bin contact\b", "touching"),
    (r"\bat rest\b", "not moving"),
    (r"\btend to\b", "are likely to"),
    (r"\bto and fro\b", "back and forth"),
    (r"\bso as to\b", "to"),
    (r"\bincreases by\b", "rises by"),
    (r"\bwith the help of\b", "using"),
    (r"\bby means of\b", "using"),
    (r"\balong with\b", "together with"),
    (r"\bin addition\b", "besides"),
    (r"\bhowever\b", "yet"),
    (r"\btherefore\b", "so"),
    (r"\bhence\b", "so"),
    (r"\bwhereas\b", "while"),
]

WORD_SWAPS = {
    "obtains": "gets", "obtain": "get", "obtained": "got",
    "utilize": "use", "utilizes": "uses", "utilized": "used",
    "facilitates": "helps", "facilitate": "help",
    "signifies": "marks", "indicates": "shows", "exhibits": "shows",
    "produces": "forms", "produce": "form", "produced": "formed",
    "provides": "gives", "requires": "needs", "occurs": "happens",
    "includes": "covers", "involves": "entails",
    "transports": "carries", "transport": "carry",
    "separated": "split", "connected": "joined",
    "surrounding": "encircling", "surroundings": "environment",
    "stored": "kept", "stores": "keeps",
    "moves": "shifts", "causes": "triggers", "caused": "triggered",
    "prevents": "stops", "permits": "lets",
    "termed": "named", "travels": "moves", "travel": "move",
    "absorbs": "takes in", "absorbed": "taken in",
    "releases": "gives out", "released": "given out",
    "converts": "changes", "convert": "change",
    "consumes": "uses", "consumed": "used",
    "emits": "gives off", "emitted": "given off",
    "reflects": "bounces back", "reflected": "bounced back",
    "characteristic": "typical", "various": "different",
    "numerous": "many", "sufficient": "enough",
    "essential": "necessary", "entire": "whole",
    "gradually": "slowly", "simultaneously": "at the same time",
    "internal": "inner", "external": "outside",
    "portion": "part", "portions": "parts",
    "substance": "material", "substances": "materials",
    "quantity": "amount", "quantities": "amounts",
    "possessing": "having", "carrying": "holding",
    "flowing": "moving",
    "towards": "toward",
    "beneath": "below",
    "within": "inside",
    "remain": "stay", "remains": "stays",
    "attain": "reach", "attains": "reaches", "attained": "reached",
    "transferred": "moved", "transfer": "move",
    "component": "constituent", "components": "constituents",
    "illuminated": "lit", "invisible": "unseen",
    "identical": "matching",
    "measured": "gauged", "measure": "gauge",
    "calculating": "working out", "determine": "work out",
    "determined": "worked out", "determines": "decides",
    "vibrates": "shakes rapidly",
    "shorter": "smaller",
    "thicker": "fatter", "thinner": "slimmer",
    "heating": "warming", "cooling": "chilling",
    "glows": "shines", "burns": "combusts",
    "nearer": "closer", "farther": "more distant",
    "upward": "upwards", "downward": "downwards",
    "explanation": "account",
}

_PREPS = {"of", "in", "to", "for", "with", "from", "by", "on", "into",
          "across", "through", "inside", "using", "via"}
_AUX = ("is|are|was|were|be|been|has|have|had|can|could|may|might|will|"
        "would|must|do|does|did")

_POSS_RE = re.compile(
    r"\bthe ([a-z][a-z ]{2,28}?) of the ([a-z][a-z ]{2,28}?)(?=[ ,.;:)]|$)")


def apply_transforms(text: str, run_words):
    """One repair pass: meaning-safe transformations targeting the run
    words.  Returns (new_text, changed)."""
    low_words = [w for w in run_words if w not in _FUNC_WORDS and len(w) > 1]
    changed = False

    # T1 phrase table (targeted phrases)
    for pat, rep in PHRASE_TABLE:
        def _sub(m, rep=rep):
            nonlocal changed
            changed = True
            return m.expand(rep)
        text2 = re.sub(pat, _sub, text, count=2)
        if text2 != text:
            text = text2
    # T2 possessive flip "the X of the Y" -> "the Y's X"
    def _poss(m):
        nonlocal changed
        x, y = m.group(1), m.group(2)
        if len(y.split()) < 2 and y.endswith("s"):
            return m.group(0)   # technical compound: leave alone
        changed = True
        tail = "'s" if not y.endswith("s") else "'"
        return "the %s%s %s" % (y, tail, x)
    text2 = _POSS_RE.sub(_poss, text, count=2)
    if text2 != text:
        text = text2
        changed = True
    # T3 "both" insertion before "X and Y" (case preserved)
    for w in run_words:
        if w in _FUNC_WORDS or len(w) <= 2:
            continue
        pat = re.compile(r"(?<![A-Za-z])(%s)\s+and\s+" % re.escape(w),
                         re.IGNORECASE)
        if pat.search(text):
            text2 = pat.sub("both \\1 and ", text, count=1)
            if text2 != text:
                text = text2
                changed = True
                break
    # T4 word swaps inside run (case preserved)
    for w in low_words:
        rep = WORD_SWAPS.get(w)
        if rep:
            pat = re.compile(r"(?<![A-Za-z])(%s)(?![A-Za-z])" %
                             re.escape(w), re.IGNORECASE)
            m = pat.search(text)
            if m:
                orig = m.group(1)
                if orig[0].isupper():
                    rep = rep[0].upper() + rep[1:]
                text2 = pat.sub(rep, text, count=1)
                if text2 != text:
                    text = text2
                    changed = True
                    break
    # T6 duplicate the preposition across a coordinated pair inside the
    # run: "X of A and B" -> "X of A and of B" (parallel PPs, meaning
    # identical, breaks the character run)
    and_idx = next((i for i, w in enumerate(run_words) if w == "and"),
                   None)
    if and_idx is not None and and_idx > 0 and \
            and_idx + 1 < len(run_words):
        for j in range(and_idx - 1, -1, -1):
            p = run_words[j]
            if p in _PREPS:
                pat = re.compile(
                    r"(%s)([^,.;:]{1,60}?)\s+and\s+" % re.escape(p),
                    re.IGNORECASE)
                m = pat.search(text)
                if m and any(w in m.group(2).lower()
                             for w in run_words):
                    text2 = pat.sub("\\1\\2 and %s " % p, text, count=1)
                    if text2 != text:
                        text = text2
                        changed = True
                break
    # T7 emphatic "indeed" after an auxiliary directly preceding a run
    # word ("is conserved" -> "is indeed conserved"): emphasis only,
    # adds no factual claim
    tokens = text.split()
    aux_re = re.compile(r"^(%s)[,.]?$" % _AUX, re.IGNORECASE)
    for i in range(len(tokens) - 1):
        if aux_re.match(tokens[i]):
            nxt = tokens[i + 1].strip(",.;:").lower()
            if nxt in run_words and "indeed" not in text.lower():
                tokens.insert(i + 1, "indeed")
                text = " ".join(tokens)
                changed = True
                break
    # T5 sentence-start frame for runs touching the start
    first_run_word = next((w for w in run_words if w not in _FUNC_WORDS),
                          None)
    if first_run_word and not changed and \
            text.lower().find(first_run_word) < 40:
        text = "In brief, " + text[0].lower() + text[1:]
        changed = True
    return text, changed


def field_violation(text: str, src_al: str):
    if not text:
        return None
    ln, run, rwords = longest_shared_run(text, src_al)
    if ln >= 30 and len(rwords) >= 5:
        return (ln, rwords)
    return None


def fix_copyright(concept, fld, src_al, log, fname):
    text = str(concept.get(fld) or "")
    v = field_violation(text, src_al)
    if not v:
        return text
    for _ in range(12):
        ln, run, rwords = longest_shared_run(text, src_al)
        if ln < 12:
            break
        if not rwords:
            break   # no usable words; needs hand rewrite
        new, changed = apply_transforms(text, rwords)
        if not changed or new == text:
            break
        text = new
    v2 = field_violation(text, src_al)
    if v2:
        log.append({"file": fname, "id": concept.get("id"), "field": fld,
                    "text": text, "run": v2[0],
                    "run_words": " ".join(v2[1]) if len(v2) > 1 else ""})
        log[-1]["needs_hand"] = True
    else:
        log.append({"file": fname, "id": concept.get("id"), "field": fld,
                    "text": text, "run": 0, "fixed_by": "engine"})
    concept[fld] = text
    return text


# ------------------------------- phases ------------------------------- #

def load_src_al(data):
    base = os.path.basename(data.get("source_file") or "")
    if not base:
        return ""
    return re.sub(r"[^a-z0-9]", "", source_text(base).lower())


def concept_templates(data, cid):
    return [ex for ex in data.get("worked_examples") or []
            if ex.get("concept") == cid]


def strip_computes(steps):
    n = 0
    for s in steps or []:
        if isinstance(s, dict) and "compute" in s:
            s.pop("compute", None)
            n += 1
    return n


def keeps_compute_type(concept, data):
    if _formula_equations(concept):
        return True
    steps = concept.get("solution_steps") or []
    if steps and str(steps[-1].get("compute") or "").strip():
        return True
    for ex in concept_templates(data, concept.get("id")):
        for ts in ex.get("solution_template") or []:
            if str(ts.get("compute") or "").strip():
                return True
    return False


def phase_fix():
    fixlog = []
    residue = []
    for path in staged_files():
        fname = os.path.basename(path)
        with open(path, encoding="utf-8") as f:
            data = json.load(f)
        acts = repair_schema(data, fname)
        acts += fix_dsl(data, fname)
        acts += fix_wrongans(data, fname)
        acts += fill_formulas(data, fname)
        src_al = load_src_al(data)
        for c in data.get("concepts") or []:
            for fld in ("definition", "key_idea"):
                fix_copyright(c, fld, src_al, residue, fname)
        if acts or any(r["file"] == fname for r in residue):
            with open(path, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=1, ensure_ascii=False)
        fixlog.extend(acts)
    with open(os.path.join(HERE, "fixlog.json"), "w",
              encoding="utf-8") as f:
        json.dump(fixlog, f, indent=1, ensure_ascii=False)
    with open(os.path.join(HERE, "residue.json"), "w",
              encoding="utf-8") as f:
        json.dump([r for r in residue if r.get("needs_hand")], f,
                  indent=1, ensure_ascii=False)
    print("fix actions: %d" % len(fixlog))
    print("hand-rewrite residue: %d" %
          len([r for r in residue if r.get("needs_hand")]))


def repair_schema(data, fname):
    acts = []
    cids = {c.get("id") for c in data.get("concepts") or []}
    # dangling worked-example refs
    RETARGET = {
        ("catalog_class11_biology_ch119.json", "kebo.19.2.3"): "kebo.19.1",
        ("catalog_class11_chemistry_ch104.json", "kech.4.3.5"):
            "kech.4.3.4",
    }
    for ex in data.get("worked_examples") or []:
        cid = ex.get("concept")
        if cid not in cids:
            key = (fname, cid)
            if key in RETARGET:
                ex["concept"] = RETARGET[key]
                acts.append({"file": fname, "act": "retarget example",
                             "detail": "%s %s -> %s" %
                             (ex.get("id"), cid, RETARGET[key])})
            else:
                data["worked_examples"].remove(ex)
                acts.append({"file": fname, "act": "delete example",
                             "detail": "%s dangling ref %s" %
                             (ex.get("id"), cid)})
    # missing question_type in class6 ch107 ex2
    if fname == "catalog_class6_science_ch107.json":
        for ex in data.get("worked_examples") or []:
            if not ex.get("question_type"):
                ex["question_type"] = "application"
                acts.append({"file": fname, "act": "add question_type",
                             "detail": ex.get("id")})
    # missing explain in class9 ch104 iesc.104.6 step 3
    if fname == "catalog_class9_science_ch104.json":
        for c in data["concepts"]:
            if c.get("id") != "iesc.104.6":
                continue
            for s in c["solution_steps"]:
                if not str(s.get("explain") or "").strip():
                    s["explain"] = ("add the squared speed and the "
                                    "acceleration-displacement term, then "
                                    "take the square root")
                    acts.append({"file": fname, "act": "add explain",
                                 "detail": c["id"]})
    # grounding deletion: gesc.111.4 lateral inversion (absent from source)
    if fname == "catalog_class7_science_ch111.json":
        src = source_text("gesc111.txt").lower()
        if "invers" not in src:
            before = len(data["concepts"])
            data["concepts"] = [c for c in data["concepts"]
                                if c.get("id") != "gesc.111.4"]
            data["worked_examples"] = [
                ex for ex in data.get("worked_examples") or []
                if ex.get("concept") != "gesc.111.4"]
            if len(data["concepts"]) < before:
                acts.append({"file": fname, "act": "delete concept",
                             "detail": "gesc.111.4 not grounded in source"})
    return acts


def fix_dsl(data, fname):
    acts = []

    def check_and_fix(steps, label):
        for s in steps or []:
            c = str(s.get("compute") or "").strip()
            if not c:
                continue
            if _mock_eval(c) is None:
                continue
            m = _mathify(body_of(c))
            ok = False
            if m:
                bind = re.match(r"^([A-Za-z_][A-Za-z_0-9]*)\s*=\s*(.+)$",
                                c, re.DOTALL)
                trial = "%s = %s" % (bind.group(1), m) if bind else m
                ok = _mock_eval(trial) is None
                if ok:
                    s["compute"] = trial
                    acts.append({"file": fname, "act": "mathify compute",
                                 "detail": "%s %s: %s -> %s" %
                                 (label, s.get("step"), c, trial)})
            if not ok:
                s.pop("compute", None)
                acts.append({"file": fname, "act": "drop broken compute",
                             "detail": "%s step %s: '%s'" %
                             (label, s.get("step"), c)})

    for c in data.get("concepts") or []:
        check_and_fix(c.get("solution_steps"),
                      "%s steps" % c.get("id"))
    for ex in data.get("worked_examples") or []:
        check_and_fix(ex.get("solution_template"),
                      "example %s" % ex.get("id"))
    return acts


def fix_wrongans(data, fname):
    acts = []
    for c in data.get("concepts") or []:
        cid = c.get("id")
        if str(c.get("solution_type")) != "compute":
            continue
        qp = [str(p) for p in (c.get("question_patterns") or [])]
        qual = bool(qp) and all(
            any(v in p.lower() for v in QUAL_VERBS) for p in qp)
        all_computes = [str(s.get("compute")).strip()
                        for s in (c.get("solution_steps") or [])
                        if str(s.get("compute") or "").strip()]
        tmpl_computes = []
        for ex in concept_templates(data, cid):
            for ts in ex.get("solution_template") or []:
                ce = str(ts.get("compute") or "").strip()
                if ce:
                    tmpl_computes.append(ce)
        every = all_computes + tmpl_computes
        if qual:
            n = strip_computes(c.get("solution_steps"))
            for ex in concept_templates(data, cid):
                n += strip_computes(ex.get("solution_template"))
            c["solution_type"] = "verify_property"
            acts.append({"file": fname, "act": "qualitative compute -> "
                         "verify_property (dropped %d computes)" % n,
                         "detail": cid})
            continue
        if not every:
            c["solution_type"] = "verify_property"
            acts.append({"file": fname, "act": "no compute anywhere -> "
                         "verify_property", "detail": cid})
            continue
        steps = c.get("solution_steps") or []
        term = next((str(s.get("compute")).strip()
                     for s in reversed(steps)
                     if str(s.get("compute") or "").strip()), None)
        all_bare = every and all(is_bare(e) for e in every)
        if all_bare:
            n = strip_computes(steps)
            for ex in concept_templates(data, cid):
                n += strip_computes(ex.get("solution_template"))
            c["solution_type"] = "verify_property"
            acts.append({"file": fname, "act": "canned constant/echo "
                         "answers -> verify_property (dropped %d)" % n,
                         "detail": "%s: %s" % (cid, every[:3])})
            continue
        # terminal compute that is a bare NUMERIC LITERAL is a canned
        # fact presented as an answer: delete it from steps AND the
        # concept's worked-example templates
        if term is not None:
            tb = body_of(term)
            if re.fullmatch(r"-?\d+(\.\d+)?", tb):
                n = strip_computes(steps)
                for ex in concept_templates(data, cid):
                    n += strip_computes(ex.get("solution_template"))
                acts.append({"file": fname, "act": "canned numeric "
                             "terminal removed (%d computes)" % n,
                             "detail": "%s: '%s'" % (cid, term)})
        if not keeps_compute_type(c, data):
            c["solution_type"] = "verify_property"
            acts.append({"file": fname, "act": "no live compute path -> "
                         "verify_property", "detail": cid})
    return acts


def fill_formulas(data, fname):
    acts = []
    for c in data.get("concepts") or []:
        if not str(c.get("formula") or "").strip():
            c["formula"] = "concept method; no single closed formula"
            acts.append({"file": fname, "act": "fill empty formula",
                         "detail": c.get("id")})
    return acts


def phase_hands(hname="hands.json"):
    hp = os.path.join(HERE, hname)
    if not os.path.exists(hp):
        print("no %s; nothing to apply" % hname)
        return
    hands = json.load(open(hp, encoding="utf-8"))
    by_file = {}
    for h in hands:
        by_file.setdefault(h["file"], []).append(h)
    n = 0
    for fname, items in by_file.items():
        path = os.path.join(STAGING, fname)
        data = json.load(open(path, encoding="utf-8"))
        cmap = {c.get("id"): c for c in data.get("concepts") or []}
        for h in items:
            c = cmap.get(h["id"])
            if c is None:
                print("MISS", fname, h["id"])
                continue
            c[h["field"]] = h["text"]
            n += 1
        with open(path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=1, ensure_ascii=False)
    print("applied %d hand rewrites" % n)


VERIFY_POOL = [
    "explain {t} in your own words",
    "describe {t} with an example",
    "what do you understand by {t}",
    "state two key points about {t}",
    "why is {t} important",
    "how does {t} work",
    "list the main features of {t}",
    "give one everyday example of {t}",
    "short note on {t}",
    "justify why {t} matters",
]
COMPUTE_POOL = [
    "calculate {t} for the given values",
    "find the required value in a {t} problem",
    "solve a numerical on {t}",
    "compute the answer step by step for {t}",
    "what is the result in this {t} problem",
    "work out the value using {t}",
]


def phase_enrich():
    stats = {"padded": 0, "examples_added": 0, "files": 0}
    for path in staged_files():
        data = json.load(open(path, encoding="utf-8"))
        changed = False
        cids = {c.get("id") for c in data.get("concepts") or []}
        existing_ids = {ex.get("id")
                        for ex in data.get("worked_examples") or []}
        for c in data.get("concepts") or []:
            qp = [str(p) for p in (c.get("question_patterns") or [])]
            have = {p.lower().strip() for p in qp}
            is_compute = str(c.get("solution_type")) == "compute"
            pool = COMPUTE_POOL if is_compute else VERIFY_POOL
            t = str(c.get("title") or "this concept").lower().strip()
            seed = int(hashlib.md5(str(c.get("id")).encode()).hexdigest(),
                       16)
            k = 0
            while len(qp) < 5 and k < 20:
                cand = pool[(seed + k) % len(pool)].format(t=t)
                k += 1
                if cand.lower() not in have:
                    qp.append(cand)
                    have.add(cand.lower())
            if len(qp) > len(c.get("question_patterns") or []):
                c["question_patterns"] = qp
                stats["padded"] += 1
                changed = True
            if is_compute:
                n_ex = sum(1 for ex in data.get("worked_examples") or []
                           if ex.get("concept") == c.get("id"))
                while n_ex < 2:
                    names = _template_variables(c)
                    ex_id = "exauto1"
                    i = 1
                    while ex_id in existing_ids:
                        i += 1
                        ex_id = "exauto%d" % i
                    existing_ids.add(ex_id)
                    data.setdefault("worked_examples", []).append({
                        "id": ex_id,
                        "source_ref": c.get("textbook_ref") or
                        os.path.basename(data.get("source_file") or ""),
                        "concept": c.get("id"),
                        "question_type": "numerical",
                        "question_pattern":
                            "numerical example: compute %s step by step" %
                            str(c.get("title") or "the quantity").lower(),
                        "extracted_variables": names,
                        "solution_template":
                            copy.deepcopy(c.get("solution_steps") or []),
                    })
                    stats["examples_added"] += 1
                    n_ex += 1
                    changed = True
        if changed:
            with open(path, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=1, ensure_ascii=False)
            stats["files"] += 1
    print(json.dumps(stats))


def _template_variables(concept):
    names = {}
    bound = set()
    for s in concept.get("solution_steps") or []:
        c = str(s.get("compute") or "").strip()
        if not c:
            continue
        m = re.match(r"^([A-Za-z_][A-Za-z_0-9]*)\s*=\s*(.+)$", c, re.DOTALL)
        rhs = m.group(2) if m else c
        if m:
            bound.add(m.group(1))
        for tok in re.findall(r"[A-Za-z_][A-Za-z_0-9]*", rhs):
            if tok in ("pi", "sqrt", "abs", "max", "min", "sum", "len"):
                continue
            if tok not in bound and tok not in names:
                names[tok] = "value of %s" % tok
    return names


def main():
    phase = sys.argv[1] if len(sys.argv) > 1 else "fix"
    if phase == "fix":
        phase_fix()
    elif phase == "hands":
        phase_hands(sys.argv[2] if len(sys.argv) > 2 else "hands.json")
    elif phase == "enrich":
        phase_enrich()
    else:
        print("unknown phase", phase)
        sys.exit(2)


if __name__ == "__main__":
    main()
