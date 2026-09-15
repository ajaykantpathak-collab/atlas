"""qbank_lib.py -- shared helpers for the generated question-bank builder.

Every question answer is produced by executing a small DSL chain through
backend.its.solver.catalog_executor.safe_eval, one step at a time:
each chain entry is either "name = expr" (binds name into the step env)
or a bare "expr" whose value is kept as the running value.  The LAST
step's value is the answer.  No Python arithmetic is ever used to
produce the stored answer.
"""
from __future__ import annotations

import math
import random
import sys

sys.path.insert(0, "D:/platform")
sys.path.insert(0, "D:/platform/backend/tools")

from backend.its.solver.catalog_executor import safe_eval  # noqa: E402

FAMILIES = {}


def family(name):
    def deco(fn):
        FAMILIES[name] = fn
        return fn
    return deco


# ------------------------------------------------------------------ #
# chain execution (sequential safe_eval steps)
# ------------------------------------------------------------------ #

def run_chain(chain, extra_env=None):
    """Execute 'name = expr' / bare-expr steps sequentially via safe_eval.

    Returns (env, final_value).  Raises _EvalError on any bad step."""
    env = {"pi": math.pi}
    if extra_env:
        env.update(extra_env)
    value = None
    for i, line in enumerate(chain):
        line = str(line).strip()
        name = None
        expr = line
        if "=" in line and "==" not in line and "<=" not in line \
                and ">=" not in line and "!=" not in line:
            head, tail = line.split("=", 1)
            head = head.strip()
            if head.replace("_", "").isalnum() and head[0].isalpha():
                name, expr = head, tail.strip()
        value = safe_eval(expr, env)
        if name:
            env[name] = value
        else:
            env["_step%d" % i] = value
    return env, value


# ------------------------------------------------------------------ #
# display formatting
# ------------------------------------------------------------------ #

def fmt_num(v):
    """Format a safe_eval float for the answer field."""
    v = float(v)
    if abs(v - round(v)) < 1e-9 and abs(v) < 1e15:
        return str(int(round(v)))
    s = "%.6g" % v
    if "e" in s or "E" in s:
        s = ("%.6f" % v).rstrip("0").rstrip(".")
    return s


def frac_str(p, q):
    """Reduced fraction display; integers collapse to plain ints."""
    p, q = int(round(p)), int(round(q))
    if q < 0:
        p, q = -p, -q
    g = math.gcd(abs(p), q)
    if g:
        p, q = p // g, q // g
    if q == 1:
        return str(p)
    return "%d/%d" % (p, q)


def frac_of(num, den):
    """Numeric value of a fraction."""
    return num / den


def parse_answer(s):
    """Parse an answer display string back to a float (validator side)."""
    s = str(s).strip()
    if "/" in s:
        p, q = s.split("/", 1)
        return float(p) / float(q)
    return float(s)


# ------------------------------------------------------------------ #
# random helpers (seeded, deterministic)
# ------------------------------------------------------------------ #

def ri(rng, a, b):
    return rng.randint(a, b)


def pick(rng, seq):
    return seq[rng.randrange(len(seq))]


def shuffle(rng, seq):
    out = list(seq)
    rng.shuffle(out)
    return out


def stable_seed(text):
    import hashlib
    return int(hashlib.md5(text.encode("utf-8")).hexdigest()[:12], 16)


# ------------------------------------------------------------------ #
# question assembly
# ------------------------------------------------------------------ #

def make_q(text, chain, disp):
    return {"q": text, "chain": list(chain), "disp": disp}


def collect_questions(fam_fn, concept_id, seed):
    """Call a family (retrying with fresh seeds) until at least 6 unique,
    valid questions exist.  Returns (questions, raw_items)."""
    raw = []
    seen = set()
    for attempt in range(12):
        rng = random.Random(seed + attempt * 7919)
        try:
            items = fam_fn(rng)
        except Exception:
            continue
        for it in items:
            if it["q"] in seen:
                continue
            seen.add(it["q"])
            raw.append(it)
        if len(raw) >= 6:
            break
    return finalize_questions(raw, concept_id), raw[:6]


def finalize_questions(raw, concept_id):
    """Dedupe by text, verify 6 unique, and check each chain executes
    (answer recomputed to confirm the display matches)."""
    seen = set()
    out = []
    for item in raw:
        if item["q"] in seen:
            continue
        seen.add(item["q"])
        _env, val = run_chain(item["chain"])
        want = parse_answer(item["disp"])
        tol = 0.006 + 0.004 * abs(want)
        if abs(val - want) > tol:
            raise AssertionError(
                "chain/display mismatch for %s: computed %r display %r (%s)"
                % (concept_id, val, want, item["q"]))
        out.append({"q": item["q"], "a": item["disp"], "self_check": False})
        if len(out) == 6:
            break
    if len(out) < 6:
        raise AssertionError("only %d unique questions for %s"
                             % (len(out), concept_id))
    return out
