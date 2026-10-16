# VERIFIER ENGINE — house standard (owner direction, 2026-10-08)

**Every numeric solver family MUST have a second-path verifier, and that
verifier is a DATA ROW — never a hand-written function.**

> Owner direction: "look how maths family is verified — use that, don't
> do manually." The maths `DECLARATIVE_INVARIANTS` engine is THE engine.
> As of 2026-10-08 it evaluates BOTH row formats through ONE shared
> evaluator (`_eval_decl_row` / `_verify_declarative_invariant` in
> `independent_verifier.py`):
>
> - **tuple rows** (maths classic): `sid -> (var_names, fn, desc[,
>   extract[, when[, tol]]])` — `fn` may return a TUPLE of candidates
>   (g = 9.8 vs 10, forward+inverse forms); any candidate matching passes.
> - **dict rows** (physics/social/chem/bio waves): label/when/need/qvars/
>   eqs/opt/tol — slot aliases, question-regex fallbacks with automatic
>   unit conversion, standalone qvars, multi-relation `eqs`.

## How to register a route

### 1. Data row — the ONLY default

Add ONE dict entry to your subject's registry (physics `_PHYSICS_DECL`,
social `_SOCIAL_DECL`, or a clearly-marked new block for chem/bio) — or a
tuple row into `DECLARATIVE_INVARIANTS`:

```python
"HYDROSTATIC_PRESSURE": {
    "label": "hydrostatic rebuild",          # proof-line name
    "when":  r"\bpressure\b",                 # forward-ask guard (skip inverse asks)
    "need":  {"h": ("h", "depth"), "rho": ("rho", "density")},  # slot aliases
    "qvars": {"h": r"depth\s+(\d+(?:\.\d+)?)\s*m\b"},  # regex fallback; 2-group = auto unit-strip
    "eqs":   [lambda h, rho, g=9.8: h * rho * g,
              lambda h, rho, g=10.0: h * rho * g],   # ANY matching rebuild passes
    "tol":   1e-3,                            # relative tolerance (default 1e-3)
},
```

Engine semantics: `need` vars resolve from the family's slot record
(`c.get(*aliases)`) then `qvars` regexes; `qvars` may also be standalone
inputs; `when` MUST pin the forward ask (inverse questions bind roles
differently and would FAIL-withhold correct answers); alternative
conventions are separate `eqs`, not tolerance hacks.

### 2. Extending the ENGINE (when a row genuinely cannot express it)

If a relation truly needs imperative logic (multi-face pressure sets,
algorithmic re-derivations), you extend the ENGINE additively — a shared
helper the row lambdas can call — and note the reason in your report.
You do NOT write a per-family verifier function.

### 3. Second-engine agreement (rare)

When another deterministic dispatcher recomputes the claim from the
question, an agreement check within 0.5% is a legitimate second path (see
`_v_pal_program`'s physics-agreement branch). This is plumbing, not a
per-family hand-check.

## Hard rule for agents

**A code-review finding of a new hand-written verifier function without a
written justification in your report = the row was done manually = not
accepted.** If you find yourself writing `def _v_<family>(c: _Ctx):` —
stop, and write the data row instead.

## Independence contract

The RELATION must differ from the family's compute (alternate formula,
inverse solve, different unit path, different algorithm). Re-extracting
givens from the question is fine — givens are givens.

## Verification duty

After adding rows: run the relevant suites in ONE pytest invocation, and
confirm the route flips GUIDED→VERIFIED on a real corpus question through
`answer_pipeline.answer()` — a verifier that only works in isolation is
not done.
