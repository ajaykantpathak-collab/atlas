"""test_bio_punnett_ask_target.py -- P0 regression, c12 corpus sweep
(c12_bio_cbse_05_001#d3, 2026-10-06).

THE BUG: "A pea plant heterozygous for seed shape (Rr) is self-pollinated.
Using the Law of Segregation, predict the GENOTYPIC ratio in the F2
generation..." shipped VERIFIED "phenotype ratio 3 dominant (R_): 1
recessive (rr)" -- the key is the GENOTYPIC ratio 1 RR : 2 Rr : 1 rr.

Root cause (its/solver/biology_families.py _c_punnett ask routing): the
router regexes were `genotype\\s+ratio` / `phenotype\\s+ratio` -- the
board adjective "genotypic" misses both, so the ask fell through to the
default phenotype report.  Same ask-targeting class documented for c10
(families answer THE CROSS, not the asked sub-target).

Fix: the routers accept geno-type/-typic and pheno-type/-typic.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__)))))
os.environ.setdefault("SOLVER_LLM_MODE", "off")

SWEEP_Q = ("A pea plant heterozygous for seed shape (Rr) is self-pollinated. "
           "Using the Law of Segregation, predict the genotypic ratio in "
           "the F2 generation and explain the cellular event that produces "
           "this ratio.")


def test_family_ships_genotypic_ratio():
    from backend.its.solver.biology_families import _c_punnett
    import re
    m = re.search(r"Rr", SWEEP_Q)
    g = {"p1": "Rr", "p2": "Rr"}
    ans = _c_punnett(g, m, SWEEP_Q)[2]
    assert ans.startswith("genotype ratio"), (
        f"family shipped the wrong target: {ans[:80]!r}")
    assert "1 RR" in ans and "2 Rr" in ans and "1 rr" in ans, (
        f"genotype ratio wrong: {ans[:80]!r}")


def test_phenotypic_ask_still_ships_phenotypes():
    from backend.its.solver.biology_families import _c_punnett
    q = ("Cross a heterozygous tall pea plant (Tt) with a dwarf pea plant "
         "(tt). What is the phenotypic ratio of the offspring?")
    g = {"p1": "Tt", "p2": "tt"}
    ans = _c_punnett(g, None, q)[2]
    assert ans.startswith("phenotype ratio"), (
        f"phenotypic ask lost: {ans[:80]!r}")


def test_full_pipeline_answers_the_asked_ratio():
    """Integration pin, run in a FRESH subprocess: the lane-C registry
    sweep reaches the punnett family only with its full time budget
    (~50-70s while the embed models load).  A prior answer() call in the
    same process changes the sweep's budget behaviour (observed: an
    early 25s decline right after another question) — the deterministic
    contract itself is pinned family-level above; this pin reproduces
    the serving condition (one question, one process)."""
    import subprocess
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    deploy_root = os.path.dirname(root)
    code = (
        "import os, sys\n"
        "os.environ['SOLVER_LLM_MODE'] = 'off'\n"
        "sys.path.insert(0, " + repr(deploy_root) + ")\n"
        "from backend.its.solver.answer_pipeline import answer\n"
        "r = answer(" + repr(SWEEP_Q) + ")\n"
        "print(r.label)\n"
        "print(r.answer)\n"
    )
    out = subprocess.run([sys.executable, "-c", code], capture_output=True,
                         text=True, timeout=420)
    lines = [l for l in out.stdout.strip().splitlines() if l.strip()]
    assert len(lines) >= 2, f"subprocess produced no result: {out.stderr[-200:]}"
    label, ans = lines[0], lines[1]
    assert label.startswith("VERIFIED"), (
        f"pipeline dropped the punnett compute: {label}")
    assert "1 RR" in ans and "1 rr" in ans, (
        f"pipeline still ships a phenotype ratio for a genotypic ask: "
        f"{ans[:90]!r}")


if __name__ == "__main__":
    fails = 0
    for name, fn in sorted(globals().items()):
        if name.startswith("test_") and callable(fn):
            try:
                fn()
                print(f"[PASS] {name}", flush=True)
            except AssertionError as e:
                fails += 1
                print(f"[FAIL] {name}: {e}", flush=True)
    print("ALL PASS" if not fails else f"{fails} FAIL")
    sys.exit(1 if fails else 0)
