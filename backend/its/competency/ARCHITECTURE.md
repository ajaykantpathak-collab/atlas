# Class 7 Maths Competency Catalog -- Architecture & Methodology

## 1. What Was Built

A curriculum-first knowledge layer of 13 JSON catalogs (one per NCERT chapter) covering the entire Class 7 Maths syllabus. Each catalog maps NCERT source material to machine-readable concept definitions, formula chains, solution templates, and exercise metadata.

## 2. How Each Catalog Was Created

### Step 1: Read NCERT Source Text

Each chapter's NCERT textbook text was read from the local NCERT text cache:

```
D:\node_generator\ncert-mcp\data\processed\text_cache\gemh101.txt  (Chapter 1)
D:\node_generator\ncert-mcp\data\processed\text_cache\gemh102.txt  (Chapter 2)
...
D:\node_generator\ncert-mcp\data\processed\text_cache\gemh113.txt  (Chapter 13)
```

These are the official NCERT Class 7 Maths textbook pages, extracted to plain text. Each file contains the full chapter: introduction, definitions, formulas, worked examples (with solutions), exercises, and chapter summary.

### Step 2: Manually Identify Concepts

For each chapter, the following were manually extracted from the source text:

- **Concepts**: Each distinct mathematical idea taught in the chapter (e.g., "Multiplication of Two Negative Integers", "Area of a Parallelogram", "Pythagoras Theorem")
- **Definitions**: The textbook's definition of the concept, in plain language
- **Formulas**: The mathematical formula, written in ASCII notation (e.g., `area = base x height`, `a^m x a^n = a^(m+n)`)
- **Key ideas**: A one-line summary of the concept's core principle
- **Question patterns**: Phrasings that students typically use when asking about this concept (e.g., "find the product", "find the area of", "reduce to standard form")
- **Solution type**: Whether the concept requires computation (`compute`) or property verification (`verify_property`)
- **Solution steps**: The deterministic step-by-step procedure to solve questions of this type
- **Textbook reference**: The exact file and line range where the concept appears in the NCERT source

### Step 3: Extract Worked Examples

Each worked example from the NCERT text was extracted with:

- **Question pattern**: The structure of the example question (with `{variable}` placeholders)
- **Extracted variables**: What inputs are needed (e.g., `a = length`, `b = breadth`)
- **Solution template**: The step-by-step solution with `compute` fields for deterministic execution
- **Concept reference**: Which concept this example belongs to

### Step 4: Extract Exercises

Each NCERT exercise group was extracted with:

- **Exercise ID**: The exercise number from the textbook (e.g., `ex1.1`, `ex13.2`)
- **Source reference**: The file and line range
- **Questions**: The actual question texts from the textbook

### Step 5: Build the JSON Catalog

A Python builder script (`build_catalog_c7mN.py`) was created for each chapter. The builder defines the catalog as a Python dictionary and writes it to JSON:

```python
CATALOG = {
    "class": 7,
    "subject": "maths",
    "chapter": 13,
    "chapter_title": "Visualising Solid Shapes",
    "source_file": "D:/node_generator/ncert-mcp/data/processed/text_cache/gemh113.txt",
    "concepts": [...],
    "worked_examples": [...],
    "exercises": [...],
}
```

Running the builder produces the JSON file:

```
catalog_class7_maths_ch13_visualising_solid_shapes.json
```

## 3. How the Catalogs Are Stored

### File Locations

```
D:\platform\backend\its\competency\
  build_catalog_c7m1.py            # Builder for Chapter 1
  build_catalog_c7m2.py            # Builder for Chapter 2
  ...
  build_catalog_c7m13.py           # Builder for Chapter 13
  catalog_class7_maths_ch1_integers.json
  catalog_class7_maths_ch2_fractions_decimals.json
  ...
  catalog_class7_maths_ch13_visualising_solid_shapes.json
  concept_matcher.py               # MiniLM + keyword matching engine
  solution_executor.py             # Deterministic step-by-step solver
  spacy_features.py                # spaCy structural feature extractor
  audit_catalogs.py                # Schema consistency auditor
  test_all_catalogs.py             # 29-question matching test
  test_competency_40.py            # 40-question competency test
```

### JSON Schema

Each catalog JSON file follows this schema:

```json
{
  "class": 7,                    // int: class level
  "subject": "maths",           // str: subject
  "chapter": 13,                 // int: chapter number
  "chapter_title": "...",        // str: chapter title
  "source_file": "...",          // str: NCERT source file path
  "concepts": [                  // list: all concepts in chapter
    {
      "id": "c7m13.5.1",         // str: unique concept ID (class+chapter+section+index)
      "title": "...",            // str: concept title
      "section": "13.5.1",       // str: NCERT section number
      "definition": "...",       // str: textbook definition
      "formula": "...",          // str: formula in ASCII notation
      "key_idea": "...",         // str: one-line core principle
      "textbook_ref": "...",     // str: source file + line range
      "question_patterns": [...],// list: phrasings students use
      "solution_type": "compute",// str: "compute" or "verify_property"
      "solution_steps": [        // list: deterministic step sequence
        {
          "step": 1,
          "action": "...",       // str: what to do
          "explain": "...",      // str: why this step works
          "compute": "..."       // str (optional): deterministic expression
        }
      ]
    }
  ],
  "worked_examples": [           // list: NCERT worked examples
    {
      "id": "ex1",
      "source_ref": "...",       // str: source file + line range
      "concept": "c7m13.4.3",    // str: which concept this demonstrates
      "question_type": "...",    // str: type of question
      "question_pattern": "...", // str: question structure with {placeholders}
      "extracted_variables": {},// dict: variable names and descriptions
      "solution_template": [...] // list: same structure as solution_steps
    }
  ],
  "exercises": [                 // list: NCERT exercise groups
    {
      "id": "ex13.1",
      "source_ref": "...",       // str: source file + line range
      "questions": [...]         // list: question texts
    }
  ]
}
```

### Total Content Across All 13 Catalogs

| Metric | Count |
|--------|-------|
| Concepts | 121 |
| Worked examples | 95 |
| Exercise groups | 39 |
| Exercise questions | 250 |

## 4. How the Matching Pipeline Works

When a student pastes a question, it goes through 3 stages:

### Stage 1: spaCy Structural Feature Extraction

`spacy_features.py` uses spaCy to extract:
- **Operations**: add, subtract, multiply, divide (from symbols and words)
- **Sign pattern**: pos x pos, neg x neg, pos x neg (from numbers in question)
- **Question type**: computation, verify_property, word_problem, fill_blank
- **Intent verb**: find, evaluate, verify, write, fill
- **Structural pattern**: commutative_add, distributive, additive_identity

These features narrow the concept pool BEFORE semantic matching. For example, if the question contains "x" (multiply), only multiplication concepts are considered.

### Stage 2: Keyword Override

`concept_matcher.py` checks for strong structural keyword signals that MiniLM gets confused by. These are based on the mathematical structure, not specific nouns:

- "to the power N" (N != 0) -> Exponents concept
- "power 0" / "zero exponent" -> Zero Exponent concept
- "squared times" / "cubed times" -> Multiplying Powers concept
- "reciprocal" -> Reciprocal concept
- "per unit" + "how much" + quantity word -> Rate x Quantity multiplication
- "probability" / "die rolled" / "coin tossed" -> Probability concept
- "sum of" + "exceeds" + "two numbers" -> Applications word problem setup
- "can a triangle have sides" -> Triangle Inequality
- "classify" + "monomial/binomial/trinomial" -> Expression Classification

This layer works regardless of whether the question is about a car, a train, or a plane. It detects the mathematical structure, not the subject matter.

### Stage 3: MiniLM Semantic Matching

`concept_matcher.py` uses all-MiniLM-L6-v2 (22M params) to:
1. Embed all concept descriptions, question patterns, and key ideas
2. Embed the student's question (with numbers replaced by #)
3. Compute cosine similarity between the question and all concepts
4. Return the highest-scoring concept above threshold (0.3)

The question is normalized before embedding:
- Numbers replaced with `#` (focuses on structure, not values)
- Math symbols replaced with words (`+` -> `plus`, `x` -> `times`)
- Special characters removed
- Whitespace collapsed

### Stage 4: Deterministic Solution Execution

`solution_executor.py` takes the matched concept and the question, then:
1. Extracts numbers from the question
2. Identifies the solution type (compute or verify_property)
3. Executes the solution steps deterministically (no LLM, no generation)
4. Returns step-by-step results with explanations

For example, for "Find the product: 3 x (-1)":
```
Step 1: multiply absolute values
  |3| x |1| = 3 x 1 = 3
Step 2: apply sign rule
  positive x negative = negative
Step 3: final result
  3 x -1 = -3
Answer: -3
```

## 5. Does This Actually Improve Competency-Based Question Solving?

### What the Evidence Shows

**Concept matching accuracy: 40/40 (100%)** on the competency test.

The 40 questions were created from scratch, not taken from the training data. They test 5 competency types:

| Competency Type | Questions | Accuracy |
|----------------|-----------|----------|
| computation_with_reasoning | 21 | 100% |
| conceptual_understanding | 6 | 100% |
| application | 8 | 100% |
| verify_and_explain | 4 | 100% |
| error_identification | 1 | 100% |

### Why This Approach Works Better Than Alternatives

**vs. Pure LLM (ChatGPT-style):**
- LLM hallucinates math. It computes 3 x (-1) = 3 sometimes, -3 other times.
- Our solver computes deterministically. 3 x (-1) is always -3.
- LLM guesses the concept. We match it to NCERT source material.

**vs. Pure Regex:**
- Regex breaks on new phrasing. "What is 2 raised to 6?" vs "Find 2 to the power 6" vs "Evaluate 2^6" all need different patterns.
- Our MiniLM embeds the meaning, not the exact words. All three phrasings match the same concept.

**vs. Template Matching:**
- Templates need exact question structures. A car problem and a train problem need separate templates.
- Our keyword override detects the mathematical structure (rate x quantity), not the noun (car/train).

**vs. Pre-solved Database (Doubtnut-style):**
- Pre-solved databases only answer questions already in the database.
- Our approach solves any question that matches a known concept, with any numbers.

### Where This Approach Still Has Gaps

1. **Deterministic execution is limited**: The solver currently handles Chapter 1 (Integers) computation fully. Other chapters match the concept correctly but the solver returns a "verify_property" message rather than computing the answer. The solution templates exist in the catalogs but the executor doesn't yet handle all solution types.

2. **No multi-step chaining**: A question like "Find the area, then find the cost of painting at Rs 5 per sq cm" requires two steps. The current executor handles single-step problems. The catalogs have the templates for chaining but the executor doesn't use them yet.

3. **No clarification behavior**: When a question is ambiguous (e.g., "find the area" without specifying shape), the system should ask for clarification. Currently it matches the best concept and proceeds.

4. **spaCy filter is Chapter 1 specific**: The `filter_concepts_by_features` function in `spacy_features.py` has hardcoded concept IDs for Chapter 1 only. Other chapters don't benefit from structural narrowing. This means MiniLM does all the work for chapters 2-13.

5. **No cross-chapter routing**: If a student asks a question, the system needs to know which chapter catalog to search. Currently the catalog must be specified. A cross-chapter router (using a lightweight classifier or embedding search across all 121 concepts) is needed.

### What Would Make This More Effective

1. **Extend the deterministic executor** to handle all solution types (area, circumference, simple interest, percentage, probability, equation solving, exponent evaluation). The solution templates are already in the catalogs -- the executor just needs to implement them.

2. **Add a cross-chapter router** that searches across all 121 concepts to find the right chapter, then uses the chapter-specific catalog for detailed matching.

3. **Generalize the spaCy filter** to work with all chapters, not just Chapter 1. This would narrow the concept pool before MiniLM matching, improving accuracy and speed.

4. **Implement multi-step chaining**: When a question requires multiple steps (e.g., find area then find cost), chain the solution templates automatically.

5. **Add clarification logic**: If the best match score is below a higher threshold (e.g., 0.5), ask the student to clarify which topic they mean.

## 6. File Inventory

### Catalog Builders (13 files)
```
build_catalog_c7m1.py   -- Chapter 1: Integers
build_catalog_c7m2.py   -- Chapter 2: Fractions and Decimals
build_catalog_c7m3.py   -- Chapter 3: Data Handling
build_catalog_c7m4.py   -- Chapter 4: Simple Equations
build_catalog_c7m5.py   -- Chapter 5: Lines and Angles
build_catalog_c7m6.py   -- Chapter 6: The Triangle and its Properties
build_catalog_c7m7.py   -- Chapter 7: Comparing Quantities
build_catalog_c7m8.py   -- Chapter 8: Rational Numbers
build_catalog_c7m9.py   -- Chapter 9: Perimeter and Area
build_catalog_c7m10.py  -- Chapter 10: Algebraic Expressions
build_catalog_c7m11.py  -- Chapter 11: Exponents and Powers
build_catalog_c7m12.py  -- Chapter 12: Symmetry
build_catalog_c7m13.py  -- Chapter 13: Visualising Solid Shapes
```

### Catalog JSON Files (13 files)
```
catalog_class7_maths_ch1_integers.json
catalog_class7_maths_ch2_fractions_decimals.json
catalog_class7_maths_ch3_data_handling.json
catalog_class7_maths_ch4_simple_equations.json
catalog_class7_maths_ch5_lines_angles.json
catalog_class7_maths_ch6_triangle_properties.json
catalog_class7_maths_ch7_comparing_quantities.json
catalog_class7_maths_ch8_rational_numbers.json
catalog_class7_maths_ch9_perimeter_area.json
catalog_class7_maths_ch10_algebraic_expressions.json
catalog_class7_maths_ch11_exponents_powers.json
catalog_class7_maths_ch12_symmetry.json
catalog_class7_maths_ch13_visualising_solid_shapes.json
```

### Pipeline Files (5 files)
```
concept_matcher.py     -- MiniLM + keyword concept matching engine
solution_executor.py   -- Deterministic step-by-step solver
spacy_features.py      -- spaCy structural feature extractor
audit_catalogs.py      -- Schema consistency auditor
test_competency_40.py  -- 40-question competency test
```

### Test Files (3 files)
```
test_competency.py     -- Original 5-question competency test (Chapter 1)
test_pipeline.py       -- Original 6-question pipeline test (Chapter 1)
test_all_catalogs.py   -- 29-question test across all 13 catalogs
test_competency_40.py  -- 40-question competency test across all 13 catalogs
```

## 7. Test Results

### Schema Audit
- 13/13 catalogs pass schema consistency check
- 121 concepts, 95 worked examples, 39 exercise groups, 250 questions
- No missing fields, no type mismatches, no dangling references

### Concept Matching (29 questions across all chapters)
- 29/29 passed (100%)

### Deterministic Execution (4 Chapter 1 computation questions)
- 4/4 passed (100%)

### Competency Test (40 questions, 5 competency types)
- 40/40 passed (100%)
- All 13 chapters represented
- All 5 competency types tested: computation_with_reasoning, conceptual_understanding, application, verify_and_explain, error_identification

## 8. Honest Assessment

**What works well:**
- Concept identification is reliable across all 13 chapters
- The 3-stage pipeline (spaCy + keyword + MiniLM) handles phrasing variations
- NCERT source backing means concepts are curriculum-aligned
- Deterministic execution for Chapter 1 is 100% accurate

**What needs work:**
- Deterministic execution only works for Chapter 1 (Integers). Chapters 2-13 match concepts but don't compute answers yet.
- No cross-chapter routing -- the catalog must be specified manually
- spaCy structural narrowing only works for Chapter 1
- No multi-step problem chaining
- No clarification behavior for ambiguous questions

**Bottom line:**
The concept identification layer is solid and tested. The deterministic execution layer needs to be extended to all 13 chapters. The catalogs contain the solution templates -- the executor just needs to implement them. Once that's done, the system will be able to solve competency-based questions across the entire Class 7 Maths syllabus with deterministic accuracy.
