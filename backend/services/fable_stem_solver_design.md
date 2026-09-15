# Fable STEM Solver Architecture Design

_Generated: 2026-08-31 21:35:22_
_Model: fable | Input tokens: 1450 | Output tokens: 13115 | Time: 150.6s_

---

# K-12 STEM Problem Solver: Production Architecture

---

## A. ARCHITECTURE DIAGRAM

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          INPUT: Free-text problem                             │
└────────────────────────────────┬────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  LAYER 1: PREPROCESSING                                                     │
│  • Text normalization (unicode, punctuation)                                │
│  • LaTeX/math extraction (regex: \$...\$, \(...\), backtick blocks)        │
│  • Diagram text OCR placeholder (future: image input pipeline)             │
│  [Deterministic]                                                            │
└────────────────────────────────┬────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  LAYER 2: SEMANTIC PARSER                                                   │
│                                                                              │
│  ┌──────────────────┐  ┌───────────────────┐  ┌──────────────────────────┐ │
│  │ Explicit Quantity │  │ Implicit Value    │  │ Concept & Target         │ │
│  │ Extraction        │  │ Resolver          │  │ Extractor                │ │
│  │                   │  │                   │  │                          │ │
│  │ • quantulum3      │  │ • Rule engine     │  │ • Concept hierarchy      │ │
│  │   (quantities +   │  │   (spaCy          │  │   (CBSE chapter tags)    │ │
│  │   units, ranges)  │  │    PhraseMatcher) │  │ • Target identification  │ │
│  │ • Unit resolver   │  │ • Physics idiom  │  │   (regex + pattern)      │ │
│  │   (QUDT mapping)  │  │   KB (~200 rules) │  │ • Difficulty classifier  │ │
│  │ • Entity linker   │  │ • SI defaulting  │  │   (class 1 → JEE Adv)    │ │
│  └──────────────────┘  └───────────────────┘  └──────────────────────────┘ │
│                                                                              │
│  [Mostly Deterministic]                                                     │
└────────────────────────────────┬────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  LAYER 3: CANONICAL PROBLEM IR (Intermediate Representation)                │
│                                                                              │
│  { quantities[], implicit_values[], constraints[], target{},                │
│    concept_tags[], difficulty, raw_text }                                   │
│                                                                              │
└────────────────────────────────┬────────────────────────────────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    ▼                         ▼
┌──────────────────────────────┐  ┌──────────────────────────────────────────┐
│  LAYER 4a: FORMULA KB LOOKUP  │  │ LAYER 4b: CONCEPT KB LOOKUP              │
│                               │  │ (chemistry reactions, bio pathways,       │
│  • Dimensional analysis       │  │  stoichiometry tables)                    │
│  • Variable binding check      │  │                                           │
│  • Constraint validation       │  │ [Deterministic, data-driven]              │
│  • Formula metadata scoring    │  │                                           │
│  [Deterministic]               │  └──────────────────────────────────────────┘
└───────────────┬───────────────┘
                │
                ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  LAYER 5: SOLVER ENGINE                                                     │
│                                                                              │
│  ┌────────────────┐  ┌─────────────────┐  ┌─────────────────────────────┐  │
│  │ Single-step    │  │ Multi-step      │  │ Compute                    │  │
│  │ Solver         │  │ Decomposer      │  │ Cascade                    │  │
│  │                │  │                 │  │                            │  │
│  │ • Bind vars    │  │ • Backward      │  │ SymEngine → SymPy →        │  │
│  │ • Select       │  │   chaining      │  │   Giac → scipy             │  │
│  │   formula      │  │ • Sub-target    │  │ • Symbolic + numeric       │  │
│  │ • Solve        │  │   identification│  │ • Step-by-step extraction  │  │
│  │ • Verify       │  │ • Path finding  │  │ • Verification             │  │
│  └────────────────┘  └─────────────────┘  └─────────────────────────────┘  │
│                                                                              │
│  [Deterministic]                                                            │
└────────────────────────────────┬────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  LAYER 6: VERIFICATION                                                       │
│  • Dimensional check (all quantities dimensionally consistent)              │
│  • Back-substitution (plug answer into original formula)                   │
│  • Sanity bounds (speed < 3×10⁸ m/s, etc.)                                 │
│  • Conservation law check (energy, momentum)                                │
│  • If verification fails → escalate to LLM                                  │
│  [Deterministic]                                                            │
└────────────────────────────────┬────────────────────────────────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    ▼                         ▼
┌──────────────────────────────┐  ┌──────────────────────────────────────────┐
│  LAYER 7a: STEP EXPLAINER    │  │ LAYER 7b: JUSTIFICATION GENERATOR        │
│  [Deterministic]             │  │ [LLM — only for competency questions]    │
│  • Step extraction from      │  │ • Takes computed result + context        │
│    solve trace                │  │ • Generates principle explanation        │
│  • Template-based text       │  │ • References CBSE learning outcomes      │
│    for math/physics steps     │  │ • Does NOT do computation               │
└──────────────────────────────┘  └──────────────────────────────────────────┘
                    │                         │
                    └────────────┬────────────┘
                                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  LAYER 8: RESPONSE FORMATTING                                                │
│  • Structured answer with steps                                             │
│  • CBSE marking scheme alignment (where applicable)                         │
│  • Confidence score                                                         │
│  • Source citations (which formula, which rule)                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    ▼                         ▼
┌──────────────────────────────┐  ┌──────────────────────────────────────────┐
│  LLM FALLBACK HANDLER        │  │ LEGACY SOLVER ROUTER                    │
│  (Fable/Claude)              │  │ (your 37 existing solvers)              │
│                              │  │                                          │
│  Triggered when:             │  │ When concept match > 0.9 in legacy      │
│  • Confidence < threshold    │  │   solver KB, route there first          │
│  • No formula found          │  │   (preserves your existing work)        │
│  • Verification failed       │  │   [Deterministic]                       │
│  • Novel problem type        │  │                                          │
│  • Competency justification   │  └──────────────────────────────────────────┘
│  [LLM, with guardrails]      │
└──────────────────────────────┘
```

---

## B. COMPONENT LIST

### B1. Preprocessor
| Property | Detail |
|----------|--------|
| **What it does** | Normalizes raw text, extracts embedded math notation, handles special characters |
| **Tools** | Pure Python regex, `unicodedata`, custom LaTeX detector (`\$(.+?)\$`, `\((.+?)\)`, backtick blocks) |
| **Deterministic?** | Yes |
| **Limitations** | Cannot handle diagram-only problems (no image pipeline yet) |

### B2. Explicit Quantity Extractor
| Property | Detail |
|----------|--------|
| **What it does** | Finds all quantities with units from normalized text |
| **Tools** | `quantulum3` (v0.x or latest), `pint` for unit normalization, custom QUDT ontology mapping for CBSE curriculum |
| **Deterministic?** | Yes |
| **Output** | `{value: float, unit: str, quantity_type: str, symbol: str|null, confidence: float}` |
| **Limitations** | Cannot infer quantities from context ("starts from rest" → no quantity detected). Breaks on informal unit usage ("60 kg wale" in Hindi). Does not link quantities to variables (m vs mass). |

### B3. Implicit Value Resolver
| Property | Detail |
|----------|--------|
| **What it does** | Infers unstated quantities from physics idioms and context clues |
| **Tools** | `spaCy` PhraseMatcher + Matcher for rule-based extraction. NOT quantulum3. |
| **Deterministic?** | Yes — rule-based |
| **Core data** | `implicit_value_rules.yaml` — ~200 rules covering: motion (u=0, v=0 at max height, a=g), mechanics (μ=0 for smooth surface, massless string), electricity (open circuit I=0, short circuit V=0), optics (plane mirror, real/virtual), etc. |
| **Limitations** | Cannot handle creative paraphrasing not in the rule set. Does NOT understand novel idiom variations. Confidence degrades with informal language. |
| **Honest assessment** | This is the highest-risk component. Expect ~85-90% coverage for CBSE board level, ~75% for JEE Advanced. Some rules will need periodic curation. |

### B4. Concept & Target Extractor
| Property | Detail |
|----------|--------|
| **What it does** | Tags problem with subject/chapter/concepts; identifies what is being asked |
| **Tools** | `spaCy` Matcher with concept phrase patterns + curriculum taxonomy. Keyword frequency + co-occurrence for disambiguation. |
| **Deterministic?** | Yes |
| **Curriculum taxonomy** | CBSE chapter tree + ISC chapter tree mapped to concept IDs. E.g., "kinematics" → PHY_KIN, "equilibrium" → CHM_EQM. |
| **Target identification** | Regex patterns: "find", "calculate", "determine", "what is", "how much", "show that", "prove" + following noun phrase. |

### B5. Formula Knowledge Base
| Property | Detail |
|----------|--------|
| **What it does** | Stores formulas declaratively with full metadata for selection and binding |
| **Tools** | YAML/JSON files loaded into memory. Schema designed for formula selection, not just storage. |
| **Deterministic?** | Yes |
| **Size target** | ~800-1200 formulas across physics, chemistry, mathematics for classes 1-12 + JEE/NEET. |
| **What it is NOT** | A generic equation database. Each formula has: dimensional formulas per variable, preconditions, constraints, grade range, solution pattern. |

### B6. Formula Selector
| Property | Detail |
|----------|--------|
| **What it does** | Given target variable + known variables + constraints, selects correct formula(s) |
| **Tools** | Custom dimensional analysis engine. Unit consistency checker using `pint`. |
| **Deterministic?** | Yes |
| **Algorithm** | 1) Filter formulas by target variable dimensionality 2) Check which variables are available (explicit + implicit) 3) Check precondition satisfaction 4) Score by (known_vars_match / total_vars) — highest score wins. |

### B7. Multi-step Decomposer
| Property | Detail |
|----------|--------|
| **What it does** | Breaks multi-variable problems into sequential single-formula solves |
| **Tools** | Backward chaining + DFS path finding. Custom graph search on formula dependency DAG. |
| **Deterministic?** | Yes |
| **Algorithm** | Target → find formulas producing target → for each formula, if all inputs known, solve; else mark missing inputs as sub-targets → recurse → build ordered solve plan. |
| **Cycle detection** | Prevents infinite recursion (e.g., v depends on a, a depends on v). |

### B8. Compute Engine (your existing cascade)
| Property | Detail |
|----------|--------|
| **What it does** | Symbolic and numeric computation with step extraction |
| **Tools** | SymEngine (C++, fastest) → SymPy (Python, full symbolic) → Giac (subprocess, for hard integrals) → scipy (numerical optimization) → fallback (hand-rolled). Your existing cascade. |
| **Deterministic?** | Yes |
| **Integration** | This is the compute backend. Layers 3-7 call into it. It returns: `{result, steps: [{expr_in, expr_out, method}], verification_data}`. |

### B9. Verification Engine
| Property | Detail |
|----------|--------|
| **What it does** | Validates computed answers before returning |
| **Tools** | `pint` (dimensional consistency), SymPy back-substitution, custom sanity-bound rules |
| **Deterministic?** | Yes |
| **Checks** | 1) Dimensional: every intermediate result has correct units 2) Back-substitution: plug answer into original formula, check equality within tolerance 3) Bounds: speed < c, temperature > 0K (usually), force < material strength (for simple cases) 4) Conservation: energy before ≈ energy after (where applicable) |
| **If verification fails** | Escalate to LLM fallback with error details |

### B10. Chemistry/Biology Concept KB
| Property | Detail |
|----------|--------|
| **What it does** | Stores domain-specific knowledge: balanced reactions, molar masses, biological formulas, processes |
| **Tools** | YAML + curated data. Periodic table data from `mendeleev` (open source Python package). |
| **Deterministic?** | Yes |
| **Scope** | Chemistry: periodic table, common reactions (CBSE-relevant), stoichiometry rules, equilibrium expressions, electrochemistry formulas, organic reaction types. Biology: genetics formulas (Hardy-Weinberg, Punnett square algorithm), physiology formulas, ecology population models. |

### B11. Step Explanation Generator
| Property | Detail |
|----------|--------|
| **What it does** | Converts solve trace into human-readable step-by-step |
| **Tools** | Template system + LaTeX rendering (`mathjax` or `katex` for frontend). |
| **Deterministic?** | Yes |
| **Output** | Numbered steps with: what formula is applied, what values are substituted, intermediate results, final answer. |

### B12. Justification Generator (LLM only)
| Property | Detail |
|----------|--------|
| **What it does** | Writes prose explanations for competency questions |
| **Tools** | Fable/Claude API (or local LLM if available) |
| **Deterministic?** | No — LLM |
| **Input to LLM** | (a) Computed numeric answer, (b) which formula/concept was applied, (c) the original question, (d) CBSE learning outcome tag. The LLM does NOT do computation. |
| **Output** | Markdown explanation with: principle stated, calculation referenced, conclusion tied to CBSE competency framework. |

### B13. Fallback Handler
| Property | Detail |
|----------|--------|
| **What it does** | Invokes LLM when deterministic path fails, with strict guardrails |
| **Tools** | Fable/Claude (your model) |
| **Deterministic?** | No — LLM |
| **Prompt structure** | See Fallback Policy section (F) for exact prompt template |

### B14. Legacy Solver Router
| Property | Detail |
|----------|--------|
| **What it does** | Checks if your 37 existing solvers can handle the problem before the new pipeline |
| **Tools** | Concept-ID mapping to legacy solver IDs. Confidence scoring. |
| **Deterministic?** | Yes |
| **Strategy** | Try legacy first (preserves your investment). If legacy returns solution with confidence > 0.8, use it. Otherwise, pass to new pipeline. |

---

## C. DATA STRUCTURES

### C1. Canonical Problem IR (Intermediate Representation)

```python
@dataclass
class Quantity:
    value: float
    unit: str                      # normalized SI unit string
    quantity_type: str             # "mass", "velocity", "time", etc.
    symbol: str | None             # variable symbol if assigned ("m", "u", "t")
    confidence: float              # 0.0-1.0
    source: str                    # "explicit" | "implicit_rule_IR001" | "inferred"
    raw_text_span: str | None      # span in original text for debugging

@dataclass
class ImplicitValue:
    symbol: str                    # e.g., "u"
    value: float                   # e.g., 0.0
    reason: str                    # human-readable explanation
    rule_id: str                   # e.g., "IMPL_MOT_001"
    confidence: float

@dataclass
class Constraint:
    type: str                      # "smooth_surface", "light_string", "adiabatic"
    params: dict                   # additional parameters if any
    source_text: str               # span from original text

@dataclass
class Target:
    variable: str                  # what to find: "v", "power", "equilibrium_constant"
    variable_type: str             # "velocity", "power", "constant"
    unit: str                      # expected output unit
    question_type: str             # "numerical", "comparison", "conceptual", "proof"
    raw_text_span: str | None

@dataclass
class CanonicalProblem:
    raw_text: str
    normalized_text: str
    quantities: list[Quantity]
    implicit_values: list[ImplicitValue]
    constraints: list[Constraint]
    target: Target | None
    concept_tags: list[str]        # ["PHY_KIN", "PHY_NLM", "CHM_STOICH"]
    difficulty_tier: str           # "class6" | "class10" | "class12" | "jee_main" | "jee_advanced" | "neet"
    subject: str                   # "physics" | "chemistry" | "mathematics" | "biology"
    board: str | None              # "CBSE" | "CISCE" | None
    parse_confidence: float        # overall confidence
    parse_warnings: list[str]      # things that went wrong during parsing
```

### C2. Formula KB Entry Schema

```yaml
# formulas/physics/kinematics/linear_motion/v_u_a_t.yaml
formula_id: "PHY_KIN_001"
name: "First equation of motion"
latex: "v = u + at"

variables:
  - symbol: "v"
    name: "final_velocity"
    unit: "m/s"
    dimensional_formula: ["L", "T", -1]   # LT⁻¹
    quantity_type: "velocity"

  - symbol: "u"
    name: "initial_velocity"
    unit: "m/s"
    dimensional_formula: ["L", "T", -1]
    quantity_type: "velocity"

  - symbol: "a"
    name: "acceleration"
    unit: "m/s^2"
    dimensional_formula: ["L", "T", -2]
    quantity_type: "acceleration"

  - symbol: "t"
    name: "time"
    unit: "s"
    dimensional_formula: ["T"]
    quantity_type: "time"

preconditions:
  - "linear_motion"
  - "constant_acceleration"

constraints_required: []               # formula itself imposes no additional constraints
constraints_forbidden: []              # e.g., ["non_inertial_frame"]

solution_pattern: "solve_for_first_unknown"   # or "solve_for_specific", "solve_for_all"
solve_order_priority: 1                # lower = try first when ambiguous

grade_range:
  - "class9"
  - "class10"
  - "class11"
  - "class12"
  - "jee_main"
  - "jee_advanced"

chapter: "Motion in a Straight Line"
subject: "physics"
concept_tags: ["PHY_KIN", "PHY_KIN_LIN"]

derivation: null                       # optional derivation steps for explanation
related_formulas: ["PHY_KIN_002", "PHY_KIN_003"]  # second and third equations
```

### C3. Implicit Value Rule Schema

```yaml
# implicit_rules/physics/motion.yaml
rule_id: "IMPL_MOT_001"
priority: 10                           # higher = more specific, applied first
patterns:                             # match ANY of these
  - "starts from rest"
  - "initially at rest"
  - "released from rest"
  - "starts from stationary"
  - "begins from rest"

conditions:                           # additional context requirements
  - concept_tag in ["PHY_KIN", "PHY_NLM"]   # only apply in motion problems
  - not already_bound["u"]             # don't override explicit u

bindings:
  - symbol: "u"
    value: 0.0
    unit: "m/s"
    reason: "Problem states object starts from rest, so initial velocity is zero."

confidence: 1.0                       # this is a convention, always true when matched

exceptions:                           # patterns that invalidate this rule
  - "while still moving"               # "starts from rest while still moving" → contradiction
```

### C4. Solve Step Schema

```python
@dataclass
class SolveStep:
    step_number: int
    formula_id: str                    # which formula was used
    formula_latex: str                 # rendered formula
    inputs: dict[str, Quantity]        # variable → value used
    symbolic_substitution: str         # "v = 0 + 2×5"
    intermediate_result: float | str   # numeric or symbolic result
    unit: str
    method: str                        # "symbolic_solve", "numeric_evaluate", "back_substitution"
    notes: str | None                  # explanation of this step

@dataclass
class Solution:
    steps: list[SolveStep]
    final_answer: dict                 # {"value": float, "unit": str, "symbol": "v"}
    verification_passed: bool
    verification_details: dict
    confidence: float
    fallback_used: bool
    formula_chain: list[str]           # ordered list of formula IDs used
```

---

## D. IMPLICIT VALUE HANDLING

### D1. Rule-Based Architecture

**This is NOT an LLM task. It is a rule-based pattern matching task.**

Implicit values in physics are largely conventional — they are defined by textbook physics language. The rules are finite, discoverable by analyzing CBSE/NCERT textbooks, and have high precision when matched.

### D2. Rule Categories

**Category 1: Zero-by-convention (highest confidence)**

| Pattern examples | Symbol(s) | Value | Rule ID |
|-----------------|-----------|-------|---------|
| "starts from rest", "initially at rest", "released from rest" | u, v_initial | 0 m/s | IMPL_MOT_001 |
| "at the highest point", "maximum height", "apex" | v | 0 m/s | IMPL_MOT_002 |
| "just before hitting the ground", "at ground level" (for height) | h | 0 m | IMPL_MOT_003 |
| "smooth surface", "frictionless surface", "no friction" | μ | 0 | IMPL_MEC_001 |
| "light string", "massless string", "inextensible string" | m_string | 0 kg | IMPL_MEC_002 |
| "ideal gas", "perfect gas" | deviations from ideality | 0 (implicit) | IMPL_THM_001 |
| "open circuit", "broken circuit" | I | 0 A | IMPL_ELC_001 |
| "short circuit", "ideal wire" | R_wire | 0 Ω | IMPL_ELC_002 |
| "just after switching", "immediately after" (for inductor) | I_L_initial | 0 (for DC start) | IMPL_ELC_003 |

**Category 2: Standard constants (default values)**

| Symbol | Default | When to apply |
|--------|---------|---------------|
| g | 9.8 m/s² (or 10 m/s² for CBSE class 9 simplification) | Problem mentions "freely falling", "projectile", or no explicit g given with gravity context |
| G | 6.674×10⁻¹¹ N⋅m²/kg² | Gravitation problems |
| k | 9×10⁹ N⋅m²/C² | Electrostatics, no explicit value given |
| π | 3.14 (or actual π for higher classes) | Circle, sphere problems |

**Category 3: Derived/implicit relationships**

| Pattern | Inferred relationship | Rule ID |
|---------|----------------------|---------|
| "reaches twice the initial velocity" | v = 2u | IMPL_MOT_004 |
| "moves with uniform velocity" | a = 0 | IMPL_MOT_005 |
| "comes to rest", "stops" | v_final = 0 | IMPL_MOT_006 |
| "adiabatic process" | q = 0, ΔU = W | IMPL_THM_002 |
| "isothermal process" | ΔT = 0 | IMPL_THM_003 |
| "in equilibrium" | net_force = 0, forward_rate = reverse_rate | IMPL_MEC_004 / IMPL_CHM_001 |

### D3. Implementation

```python
class ImplicitValueResolver:
    def __init__(self):
        self.rules = self.load_rules("implicit_rules/")
        self.matcher = self.build_matcher()  # spaCy PhraseMatcher

    def resolve(self, problem: CanonicalProblem) -> list[ImplicitValue]:
        resolved = []
        doc = nlp(problem.normalized_text)

        # Apply rules in priority order (highest priority first)
        sorted_rules = sorted(self.rules, key=lambda r: r.priority, reverse=True)

        for rule in sorted_rules:
            if self.matches(rule, doc, problem):
                # Check conditions
                if self.conditions_met(rule, problem):
                    # Check not already bound
                    if not any(iv.symbol == rule.bindings[0].symbol for iv in resolved):
                        binding = rule.bindings[0]
                        resolved.append(ImplicitValue(
                            symbol=binding.symbol,
                            value=binding.value,
                            reason=binding.reason,
                            rule_id=rule.rule_id,
                            confidence=rule.confidence
                        ))

        return resolved
```

### D4. Known Limitations of Implicit Resolution

**These WILL fail:**
1. **Cross-sentence implicit values**: "A ball is thrown upward with 20 m/s. How high does it go?" — "it" refers to the ball, but resolving pronoun reference across sentences is hard without coreference resolution (spaCy has `neuralcoref` but it's imperfect).

2. **Context-dependent implicits**: "A 5Ω resistor is connected to a 10V battery. Find the current." — the implicit assumption is ideal battery (no internal resistance). But if r=2Ω is mentioned later, the rule must not apply. This requires careful ordering and condition checking.

3. **Negated implicits**: "A ball is thrown upward. It does NOT reach 10m." — This implies v² < 2gh at h=10m. Negation handling is fragile.

4. **Non-standard phrasing**: Regional language ("60 kilo wala ladka") or colloquialisms will fail.

5. **Multi-concept ambiguity**: "A block on a smooth wedge inclined at 30°" — smooth could mean μ=0 on the block-wedge interface, but what about wedge-ground? Rule is incomplete.

**Mitigation:** When implicit resolution returns confidence < 0.8, flag the problem and route to LLM fallback with explicit instruction to identify implicit assumptions.

---

## E. COMPETENCY QUESTION FLOW

### E1. Step-by-Step Processing

```
Input: "A 60kg student climbs 3m of stairs in 5s. Another walks 100m on flat 
ground. Who expended more power? Justify with calculation and explain the 
physics principle."

STEP 1: PARSE (Deterministic)
├─ Explicit quantities: mass=60kg, height=3m, time=5s, distance=100m
├─ Implicit values: g=9.8 m/s² (gravity context), μ=0 for stairs (rough default? NO — stairs have friction, rule should NOT apply here)
├─ Constraints: "flat ground" → constant velocity on level surface
├─ Target: comparison of power, justification required
├─ Concept tags: PHY_WORK, PHY_POWER
└─ parse_confidence: 0.85 (walking scenario has ambiguity — is it mechanical or metabolic power?)

STEP 2: DETECT COMPETENCY FLAG
├─ Indicators: "who expended more", "justify", "explain the physics principle"
├─ Flag: IS_COMPETENCY_QUESTION = True
└─ Route to Competency Processor

STEP 3: DETERMINISTIC CALCULATION
├─ Climber power: P₁ = mgh/t = 60×9.8×3/5 = 352.8 W  [DETERMINISTIC]
├─ Walker mechanical power: P₂ = F×v. At constant velocity on flat ground, 
│  net work = 0 (no ΔPE, no ΔKE), so mechanical power output = 0 W
│  [DETERMINISTIC — but this is physically misleading for a real human]
├─ Comparison result: P₁ > P₂ mechanically
└─ Flag: P₂ = 0 is the "physics textbook" answer but may not match expected answer.
         CBSE may want comparison of metabolic power (not computable from given data).
         → ESCALATE TO LLM for interpretation guidance.

STEP 4: LLM JUSTIFICATION (ONLY for explanation text)
├─ Input to LLM:
│  • Problem statement
│  • Computed result: P_climber = 352.8 W, P_walker_mechanical = 0 W
│  • Flag: ambiguity about "power expended" interpretation
│  • Constraint: LLM must NOT recalculate. It must explain the deterministic result.
│
├─ LLM prompt structure:
│  "You are a physics tutor. A student solved this problem deterministically.
│   Result: Climber power = 352.8 W, Walker mechanical power = 0 W (since no 
│   net work done against gravity on flat ground at constant speed).
│   The question asks 'who expended more power?'. Write a 3-4 sentence 
│   justification that: (1) states the physics principle (power = rate of doing 
│   work, work done against gravity = mgh), (2) shows the calculation, (3) 
│   explains why the climber expended more power. Do NOT do new calculations.
│   Do NOT claim the walker's metabolic power — stick to mechanical work."
│
├─ LLM output: justification text
└─ Deterministic engine: attaches justification to computed answer

STEP 5: VERIFICATION
├─ Climber: back-substitute: P×t = 352.8×5 = 1764 J. mgh = 60×9.8×3 = 1764 J ✓
├─ Walker: dimensional check: P = F×v = 0×v = 0 ✓ (for constant velocity)
└─ Pass

STEP 6: RESPONSE
├─ Final answer: "The student climbing stairs expended more power (352.8 W vs 0 W 
│  mechanical power for walking on flat ground)."
├─ Steps: [deterministic steps]
├─ Justification: [LLM-generated prose]
└─ Confidence: 0.85
```

### E2. Competency Question Detection

Trigger IS_COMPETENCY_QUESTION flag when ANY of these are true:
1. Question text contains: "justify", "explain", "give reason", "why does", "state the principle", "what is the physics behind"
2. Question asks for comparison between scenarios ("who did more", "which is greater", "compare A and B")
3. Question has scenario comprehension component (multiple entities, multiple conditions)
4. Question asks for prediction/consequence ("what will happen if", "predict the effect")

**Split logic:**
- **Calculation path**: ALWAYS deterministic. LLM has NO access to the compute engine.
- **Comprehension path**: Deterministic extraction (quantities, concepts). LLM may assist if confidence < 0.8.
- **Justification path**: LLM-generated prose, constrained by computed result. LLM cannot override the math.

---

## F. FALLBACK POLICY

### F1. When Does LLM Get Invoked?

| Trigger | Condition | LLM Gets |
|---------|-----------|----------|
| **Parse failure** | `parse_confidence < 0.7` AND no legacy solver match | Full problem text + request for structured extraction |
| **No formula match** | Formula selector returns empty set after exhaustive search | Problem IR + request for formula candidates + solution approach |
| **Multi-step dead end** | Decomposer cannot find path from knowns to target | Problem IR + known quantities + request for decomposition strategy |
| **Verification failed** | Back-substitution or dimensional check fails | Problem IR + attempted solution + error details + request for diagnosis |
| **Chemistry reaction unknown** | No balanced reaction found in KB | Reactants + conditions + request for reaction identification |
| **Biology descriptive** | No computational component identified (pure essay question) | Full problem text + request for structured answer |
| **Competency justification** | IS_COMPETENCY_QUESTION = True AND justification needed | Computed result + concept tags + request for explanation text |
| **Novel problem type** | Concept tags are empty OR confidence is uniformly low | Full problem text |

### F2. What LLM Is ALLOWED To Do

```
ALLOWED:
✓ Parse ambiguous text and return structured extraction
✓ Identify which formula/concept applies when KB match fails
✓ Generate explanation/justification text for competency questions
✓ Diagnose why a deterministic solve failed
✓ Propose decomposition for novel multi-step problems
✓ Write educational content (worked examples, hints)

NOT ALLOWED:
✗ Perform computation (numeric or symbolic) — results must come from compute engine
✗ Override deterministic answers — LLM suggestions are suggestions only
✗ Invent formulas — must reference known formula IDs from KB
✗ Answer biology essay questions without computational component flag
✗ Modify the canonical problem IR without explicit flagging
```

### F3. LLM Fallback Prompt Template

```python
FALLBACK_PROMPT = """You are a STEM problem-solving assistant for a CBSE/CISCE 
learning platform (classes 1-12, JEE Advanced, NEET). Your role is STRICTLY 
limited to analysis and explanation. You MUST NOT perform calculations — the 
deterministic compute engine handles all math.

Problem type: {fallback_trigger}
Original problem: {raw_text}

Structured extraction (if available):
{canonical_ir_json}

Computed result (if available):
{solution_json}

Error details (if applicable):
{error_details}

Your tasks:
1. {task_specific_instruction}
2. Return structured JSON with: extraction, formula_candidates, explanation_text, confidence
3. Flag any assumptions you make
4. If you propose a formula, provide its CBSE chapter reference

DO NOT compute numerical answers. DO NOT invent physics. Stick to established 
NCERT/CBSE curriculum content."""
```

### F4. LLM Output Handling

LLM output is NEVER directly used as the final answer. It goes through:
1. **Validation**: If LLM proposes a formula, check it exists in KB. If not, flag as unverified.
2. **Compute engine re-check**: If LLM proposes calculation steps, re-run through deterministic engine.
3. **Confidence marking**: Final answer confidence = `min(deterministic_confidence, llm_confidence)`.
4. **Disclosure to user**: Response includes "This problem required AI-assisted interpretation" with explanation of what was AI-generated vs computed.

---

## G. WHAT WILL FAIL (Honest Assessment)

### G1. Problems This Architecture CANNOT Handle Well

**Physics:**
- **Relativistic mechanics at JEE level**: Some JEE problems use relativistic formulas. If not in KB, fails.
- **Rotational dynamics with non-trivial constraints**: Rolling without slipping on curved surfaces, variable moment of inertia. Multi-step decomposer may fail.
- **Fluid mechanics with Bernoulli + continuity chains**: Complex multi-step with hidden assumptions (ideal fluid, steady flow).
- **AC circuit phasor problems**: Requires complex number handling + phase relationships. Solvable with current tools but complex to encode.
- **Optics lens/mirror formula with sign convention errors**: Student errors in sign convention are hard to catch deterministically.

**Chemistry:**
- **Organic reaction mechanisms**: Determining product of a reaction requires understanding reaction pathways, not just applying a formula. Deterministic KB cannot cover the combinatorial explosion of organic reactions.
- **Inorganic qualitative analysis**: "What happens when X is added to Y?" Requires extensive reaction database + condition sensitivity. Partially solvable but fragile.
- **Balancing novel redox reactions**: Can handle standard redox. Struggles with unusual oxidation states or complex half-reactions.

**Biology:**
- **Descriptive/essay questions**: "Explain the process of photosynthesis." This is not a computational problem. No formula applies. LLM-only path.
- **Data-based questions**: "Given this pedigree chart, determine the mode of inheritance." Requires image understanding (not in current scope) + genetic reasoning (can be partially algorithmic).
- **Ecology/biogeochemical cycles**: Descriptive with some quantitative aspects. Partial coverage only.

**Mathematics:**
- **Proof-based problems**: "Prove that √2 is irrational." Not a computation problem. The compute engine handles symbolic math but not formal proof construction.
- **Combinatorics with creative insight**: Many JEE combinatorics problems require a clever insight that isn't a formula application. The decomposer may fail.

**General:**
- **Multi-concept ambiguity**: "A ball is thrown horizontally from a 20m height with 15 m/s at 30° to the horizontal." Is this projectile motion (horizontal + vertical components) or is "at 30°" modifying the horizontal throw? Ambiguity resolution is weak.
- **Problems with missing data that must be looked up**: "Find the pH of 0.1M acetic acid (Ka = 1.8×10⁻⁵)." Ka must be in KB or formula must accept it as parameter. If Ka is not given and not in KB, fails.
- **Word problems with unit conversion traps**: "A car travels at 60 km/h for 30 minutes. Find distance in meters." Unit conversion is handled but may miss implicit unit requirements in the answer.

### G2. Estimated Coverage (Brutally Honest)

| Level | Expected Deterministic Coverage | Primary Failures |
|-------|-------------------------------|------------------|
| Class 6-8 Math | ~95% | Geometry proofs, some combinatorics |
| Class 6-8 Science | ~80% | Descriptive biology questions, experimental design |
| Class 9-10 CBSE | ~85% | Physics: lens/mirror sign conventions; Chemistry: organic reactions; Biology: descriptive |
| Class 11-12 CBSE | ~75% | Physics: rotational dynamics, EMI; Chemistry: organic mechanisms; Biology: pedigree analysis |
| JEE Main | ~70% | Math: coordinate geometry with conditions; Physics: thermo + EMI combined; Chemistry: physical chem equilibrium problems with tricks |
| JEE Advanced | ~50-60% | Problems requiring insight beyond formula chains. Multi-concept synthesis. |
| NEET | ~75% | Biology descriptive failures; Physics: some numerical trick questions; Chemistry: organic selectivity |

### G3. What Needs Human Curation

The formula KB and implicit value rules are NOT one-time builds. They require:
- **Curriculum alignment**: CBSE updates syllabus periodically (NEP 2020 changes are ongoing)
- **Regional variation**: CISCE (ISC) has different chapter structures and some different content
- **Error analysis**: After launch, collect failure cases and add rules/formulas monthly
- **Ambiguity resolution**: Some problems genuinely have multiple valid interpretations — needs pedagogical judgment

**Estimate**: Initial KB build: 800-1200 formulas, ~200 implicit rules. Ongoing curation: 20-50 new formulas/quarter based on failure analysis.

---

## H. INTEGRATION PLAN

### H1. Phased Migration from 37 Legacy Solvers

**Phase 1: Parallel Routing (Weeks 1-4)**

Do NOT replace existing solvers. Add the new pipeline as an alternative path:

```python
class SolverRouter:
    def solve(self, problem_text: str) -> Solution:
        # Step 1: Try legacy solvers (preserves your investment)
        legacy_result = self.legacy_router.try_solve(problem_text)
        if legacy_result and legacy_result.confidence > 0.8:
            return legacy_result

        # Step 2: Try new KB-based pipeline
        try:
            parsed = self.semantic_parser.parse(problem_text)
            if parsed.parse_confidence > 0.7:
                kb_result = self.kb_solver.solve(parsed)
                if kb_result and kb_result.verification_passed:
                    return kb_result
        except Exception:
            pass

        # Step 3: LLM fallback
        return self.llm_fallback.solve(problem_text)
```

**Phase 2: Concept Coverage Audit (Weeks 5-8)**

1. Export all problem types your legacy solvers cover.
2. Map them to formula KB concept IDs.
3. Identify gaps: concepts covered by legacy but not yet in KB.
4. Migrate high-volume topics first (motion, forces, electricity, stoichiometry, algebra).

**Phase 3: Gradual Retirement (Weeks 9-16)**

1. For each migrated topic, A/B test: legacy vs. new KB solver on 100+ problems.
2. If new solver matches legacy output 95%+ and is faster/more maintainable, retire legacy file.
3. Keep legacy solver as fallback during transition.

**Phase 4: KB-Only for New Topics (Week 16+)**

1. All new problem types go directly to KB pipeline.
2. Legacy solvers maintained only for topics too complex for KB (e.g., organic reaction prediction).

### H2. FastAPI Backend Integration

```python
# main.py additions

from solver_pipeline import SolverPipeline, SolverRouter

# Initialize once at startup (NOT per-request)
pipeline = SolverPipeline(
    formula_kb_path="formulas/",
    implicit_rules_path="implicit_rules/",
    legacy_solver_registry=existing_solver_registry,
    llm_client=anthropic_client,  # Fable/Claude
    confidence_threshold=0.7
)

# Existing FastAPI endpoint modification
@app.post("/solve")
async def solve_problem(request: ProblemRequest):
    result = await pipeline.solve_async(request.problem_text)
    return result.to_dict()
```

### H3. Monitoring & Observability

Add logging for every decision point:
```python
{
    "problem_id": "uuid",
    "parse_confidence": 0.85,
    "formula_match": "PHY_KIN_001",
    "legacy_attempted": True,
    "legacy_used": False,
    "llm_fallback_used": False,
    "verification_passed": True,
    "solve_time_ms": 145,
    "formula_chain": ["PHY_KIN_001"],
    "parse_warnings": ["walker_scenario_ambiguous"]
}
```

This lets you:
- Identify high-failure problem types
- Track LLM fallback rate (target: < 15% for CBSE, < 30% for JEE Advanced)
- Optimize formula KB based on real usage

### H4. Immediate Next Steps (Priority Order)

1. **Build formula KB schema** (1 week): Design YAML schema, populate with 50-100 high-frequency CBSE formulas as proof of concept.
2. **Implement implicit value rules** (2 weeks): Start with the 30 highest-frequency rules (motion, mechanics, electricity). Test on 100 CBSE board problems.
3. **Wire existing compute cascade** (1 week): Your SymEngine/SymPy/Giac/scipy cascade already works — wrap it in a clean API that the solver pipeline can call.
4. **Build formula selector + decomposer** (2 weeks): Dimensional analysis + backward chaining.
5. **Legacy router integration** (1 week): Connect to your existing solvers.
6. **Test on real CBSE question bank** (ongoing): Use previous year papers (at least 5 years per class) as test set.

**Estimated MVP timeline**: 8-10 weeks for a system that handles ~70% of CBSE problems deterministically, with LLM fallback for the rest.

---

## Summary: Where LLM Is Truly Needed

| Component | LLM? | Why? |
|-----------|------|------|
| Explicit quantity extraction | No | quantulum3 + pint work |
| Implicit value inference | No | Rule-based with spaCy |
| Formula selection | No | Dimensional analysis + KB |
| Computation | No | Your existing deterministic cascade |
| Verification | No | Back-substitution + dimensional check |
| Step explanation | No | Template + solve trace |
| **Competency justification** | **YES** | **Requires language generation for explanation text. LLM constrained by computed result.** |
| **Novel problem parsing** | **YES** | **When rules fail, LLM extracts best-effort structured form** |
| **Chemistry product prediction** | **YES** | **Organic reactions require chemical knowledge beyond formula application** |
| **Biology descriptive** | **YES** | **No deterministic path exists for essay questions** |

The honest truth: LLM is needed for ~20-25% of problems, mostly for language understanding (parsing ambiguous prose) and text generation (justifications, explanations). The calculation MUST remain deterministic.