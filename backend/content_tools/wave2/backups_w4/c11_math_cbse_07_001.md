## ELI5
Three shirts, two trousers: the tree diagram counts 3 × 2 = 6 outfits. The Fundamental Principle of Counting generalises the tree: if one event has m ways and an independent follow-up has n ways, the pair happens m × n ways - and k independent stages multiply all the way through. AND means multiply; only OR branches add. Independence is the licence: the second stage's menu never depends on the first choice.

## DEFINITION
The Fundamental Principle of Counting (Multiplication Principle) states that if an event can occur in \(m\) different ways and, following it, another independent event can occur in \(n\) different ways, then the two events together can occur in \(m \times n\) different ways. This extends to \(k\) independent events occurring sequentially: if the first event has \(m_1\) ways, second \(m_2\) ways, ..., \(k\)-th \(m_k\) ways, the total number of ways is \(m_1 \times m_2 \times \cdots \times m_k\).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can correctly identify independent sequential choices in word problems, distinguish between AND (multiplication) and OR (addition) scenarios, and compute total outcomes for 3+ stage processes without overcounting or missing cases.

## SCOPE_BOUNDARY
Covers the Multiplication Principle for independent sequential events and its distinction from the Addition Principle for mutually exclusive events. Does NOT cover permutations (arrangements), combinations (selections), factorial notation, or problems with restrictions/repetitions — those are subsequent nodes.

## WALKTHROUGH
Imagine you're packing for a school trip: you have 3 different shirts and 2 different pairs of trousers. How many distinct outfits (shirt + trouser) can you make? A Class 11 student might list them all, but with 10 shirts and 8 trousers, listing becomes impractical. Start by drawing a tree diagram for the small case: each shirt branches to 2 trousers, giving 3 × 2 = 6 outfits. Notice the pattern — the number of trousers choices is the same regardless of which shirt you pick. This independence is the key: when choices are sequential and independent, we multiply. Connect this to Class 6 multiplication of whole numbers (c6_math_ch01_010) where repeated addition becomes multiplication. The insight: multiplication counts the Cartesian product of choice sets.

Takeaway: mastery means spotting independent sequential choices, separating AND from OR scenarios, and multiplying through three or more stages without overcounting. Exam moves: count-the-outcomes questions and and-versus-or items where the wrong operation halves or doubles the truth. Check yourself: listing works at 3 shirts and 2 trousers and betrays you at 10 and 8 - that betrayal is why the principle exists. Students miss it because they multiply dependent stages, when the definition's licence is independence: if the second menu changes with the first choice, the tree must grow, not the formula.

## DIAGNOSTIC_QUESTION_1
State the Fundamental Principle of Counting (Multiplication Principle) in your own words, including the condition required for it to apply.

## DIAGNOSTIC_ANSWER_1
Correct answer: If one task can be done in \(m\) ways and a second independent task can be done in \(n\) ways, then both tasks together can be done in \(m \times n\) ways. The critical condition is that the choices must be independent — the number of ways for the second task does not depend on which choice was made for the first task. A wrong answer revealing "if there are m ways for first and n ways for second, total is m+n" shows confusion with the Addition Principle (OR situations). A wrong answer omitting "independent" or "sequential" reveals the student doesn't grasp when multiplication is valid versus when choices affect each other.

## DIAGNOSTIC_QUESTION_2
A student argues: "Choosing a captain and vice-captain from a class of 40 students: there are 40 choices for captain and 40 choices for vice-captain, so 40 × 40 = 1600 ways by the Multiplication Principle." Explain why this reasoning is incorrect and give the correct count.

## DIAGNOSTIC_ANSWER_2
Correct answer: The student's error is assuming independence — the same person cannot be both captain and vice-captain. After choosing the captain (40 ways), only 39 students remain for vice-captain. The correct count is 40 × 39 = 1560 ways. A wrong answer accepting 1600 reveals the student applies multiplication mechanically without checking whether the second choice set changes based on the first choice. This is the most common Class 11 misconception: treating dependent sequential choices as independent.

## DIAGNOSTIC_QUESTION_3
A restaurant offers 4 starters, 5 main courses, and 3 desserts. A "complete meal" consists of one starter, one main course, and one dessert. How many different complete meals are possible? Show your working.

## DIAGNOSTIC_ANSWER_3
Correct answer with steps:
Step 1: Identify the sequential independent choices — starter (4 ways), main course (5 ways), dessert (3 ways).
Step 2: Verify independence — choosing a starter doesn't affect main course options, etc.
Step 3: Apply Multiplication Principle: total = 4 × 5 × 3.
Step 4: Compute: 4 × 5 = 20; 20 × 3 = 60.
Answer: 60 different complete meals.
A wrong answer of 4 + 5 + 3 = 12 reveals the student used Addition Principle (OR) instead of Multiplication Principle (AND). A wrong answer of 4 × 5 × 3 × 3 = 180 suggests they mistakenly counted dessert twice or added an extra stage.

## DIAGNOSTIC_QUESTION_4
Compare these two scenarios and explain why the Multiplication Principle applies to one but not the other:
Scenario A: A password must be 2 letters (A-Z) followed by 3 digits (0-9). Repetition allowed.
Scenario B: A committee of 2 students is chosen from a class of 20. The committee has no designated roles (just two members).

## DIAGNOSTIC_ANSWER_4
Correct answer: Scenario A involves sequential independent choices: position 1 (26 ways) × position 2 (26 ways) × position 3 (10 ways) × position 4 (10 ways) × position 5 (10 ways) = 26² × 10³. Each position's choices are unaffected by previous choices (repetition allowed). Scenario B is a selection without order — choosing {Alice, Bob} is the same as {Bob, Alice}. The Multiplication Principle would give 20 × 19 = 380, but this overcounts by a factor of 2! because order doesn't matter. This requires combinations (node c11_math_cbse_07_007), not the basic Multiplication Principle. A wrong answer saying both use multiplication reveals the student doesn't distinguish between ordered arrangements (permutations) and unordered selections (combinations).

## DIAGNOSTIC_QUESTION_5
A student solves: "How many 3-digit even numbers can be formed from digits 1, 2, 3, 4, 5 if repetition is allowed?" Their working: "Units digit must be even: 2 or 4 (2 ways). Hundreds digit: 5 ways. Tens digit: 5 ways. Total = 2 × 5 × 5 = 50." Is this correct? If not, identify the error and give the correct answer.

## DIAGNOSTIC_ANSWER_5
The student's answer is correct. Reasoning: The constraint (even number) only restricts the units digit to {2, 4} — 2 ways. Since repetition is allowed, hundreds digit has 5 choices (1-5) and tens digit has 5 choices (1-5), independent of other positions. Multiplication Principle applies: 2 × 5 × 5 = 50. A wrong answer claiming "hundreds digit cannot be 0 so only 4 ways" reveals the student incorrectly imported the "no leading zero" rule from standard 3-digit numbers, but here digits are only 1-5 (no zero exists). A wrong answer of 2 × 4 × 4 = 32 suggests they thought repetition is not allowed.

## DIAGNOSTIC_QUESTION_6
Create a real-world problem (Indian context) that requires exactly 3 stages of independent choices and yields a total between 100 and 200 outcomes. State the problem, the choices at each stage, and the final calculation.

## DIAGNOSTIC_ANSWER_6
Sample good answer: "A student chooses a mobile recharge plan: 4 network providers (Jio, Airtel, Vi, BSNL) × 5 validity options (28, 56, 84, 365, 730 days) × 6 data packs (1GB, 2GB, 3GB, 5GB, 10GB, unlimited) = 4 × 5 × 6 = 120 possible plans." Criteria: 3 independent stages, product between 100-200, realistic Indian context. A poor answer: "Choose a shirt (10), pant (10), shoe (10) = 1000" (product outside range) or "Choose captain (20), vice-captain (19), secretary (18)" (choices dependent, not independent) reveals the student cannot construct valid independent-choice scenarios or verify the numerical constraint.

## COMMON_MISCONCEPTION
The most pervasive Class 11 error is applying the Multiplication Principle to dependent sequential choices without adjusting the second choice count. Example: "How many 3-digit numbers can be formed from digits 1,2,3,4,5 without repetition?" Student writes: 5 × 5 × 5 = 125. The error: after choosing hundreds digit (5 ways), only 4 digits remain for tens, then 3 for units. Correct: 5 × 4 × 3 = 60. The student sees "3 positions, 5 digits each" and multiplies 5 three times, ignoring that "without repetition" makes each choice reduce the next choice set. This stems from treating the principle as a formula to plug numbers into rather than a reasoning tool about independence.

## ON_FAILURE
Step 1: Have the student physically model with 3 digit cards (1,2,3) — list all 3-digit numbers without repetition (6 outcomes) vs with repetition (27 outcomes). Step 2: Ask: "After you place a card in the hundreds position, how many cards remain for tens?" Guide them to see the choice set shrinks. Step 3: Re-derive the rule: "If repetition allowed → choices stay same → multiply same number. If repetition not allowed → choices decrease → multiply decreasing numbers." Step 4: Practice 5 similar problems where they must first state "independent?" or "dependent?" before multiplying.

## PREREQUISITE_NODE_IDS
c6_math_ch01_010, c6_math_ch05_054, c7_math_ch02_007, c8_math_ch2_3, c9_math_ch7_5
## PREREQUISITE_REASONS
c6_math_ch01_010: Multiplication of whole numbers provides the arithmetic foundation for the Multiplication Principle.
c6_math_ch05_054: Forming algebraic expressions from word problems translates real scenarios into mathematical structure.
c7_math_ch02_007: Writing expressions from word problems builds the skill of identifying stages and choices in counting problems.
c8_math_ch2_3: Exponential notation (base and exponent) connects to repeated multiplication when choices are identical across stages.
c9_math_ch7_5: Sample space concepts from probability (Class 9) require listing/counting outcomes, the direct application of counting principles.

## FORWARD_NODE_IDS
c11_math_cbse_07_002, c11_math_cbse_07_003, c11_math_cbse_07_004, c11_math_cbse_07_006, c11_math_cbse_07_007, c11_math_cbse_07_009, c11_math_cbse_07_011, c12_cs_cbse_09_011, c12_math_cbse_13_003, c12_math_cbse_13_007

## FORWARD_REASONS
c11_math_cbse_07_002: Factorial notation (n!) is the compact representation of n × (n-1) × ... × 1, which arises directly from the Multiplication Principle for permutations.
c11_math_cbse_07_003: Permutations definition and formula (nPr) generalises the Multiplication Principle to selecting and arranging r objects from n.
c11_math_cbse_07_004: Permutations with distinct objects applies the Principle to n × (n-1) × ... × (n-r+1) for arrangements without repetition.
c11_math_cbse_07_006: Permutations with repetition allowed applies the Principle as n × n × ... × n (r times) = n^r.
c11_math_cbse_07_007: Fundamental Principle of Counting is needed to multiply choices when selecting from different groups (e.g., teachers and students).  
c11_math_cbse_07_009: Fundamental Principle of Counting (multiplication/addition rules) is the foundation for breaking down multi-step permutation problems.  
c11_math_cbse_07_011: Fundamental Principle of Counting (multiplication/addition rules) is the backbone of combining P and C in multi-stage problems.  
c12_cs_cbse_09_011: Fundamental Principle of Counting underpins `random` module's permutation/combination logic.  
c12_math_cbse_13_003: The Fundamental Principle of Counting underpins the sample space size calculations (e.g., 52×51×50 for three draws without replacement).  
c12_math_cbse_13_007: Fundamental Principle of Counting needed to determine the size of sample spaces for multi-step experiments.  

## CROSS_SUBJECT_PREREQS
c11_phy_cbse_02_003, c11_chem_cbse_01_004, c11_eco_cbse_02_005
## CROSS_SUBJECT_REASONS
c11_physics_ch2_3: Kinematics problems counting paths or states (e.g., particle in a box) use the Multiplication Principle for independent dimensional choices.
c11_chemistry_ch1_4: Stoichiometry and molecular configurations (isomers) require counting arrangements of atoms — direct application of counting principles.
c11_economics_ch2_5: Consumer choice theory models bundles of goods; the number of possible bundles from discrete options uses the Multiplication Principle.
c11_phy_cbse_02_003: Cross-subject support: Instantaneous velocity is the rate of change of position with respect to time at a specifi... supplies tools/facts used directly in this node.  
c11_chem_cbse_01_004: Cross-subject support: Gay Lussac's Law of Gaseous Volumes states that when gases react chemically at constant te... supplies tools/facts used directly in this node.  
c11_eco_cbse_02_005: Cross-subject support: The Green Revolution refers to the transformative period (mid-1960s onwards) when Indian a... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c6_math_ch01_010 -> c11_math_cbse_07_001 -> c11_math_cbse_07_002

## THIS_FORMULA
If event A can occur in \(m\) ways and event B can occur independently in \(n\) ways, then the number of ways both events can occur in sequence is \(m \times n\). For \(k\) independent events: \(m_1 \times m_2 \times \cdots \times m_k\).

## FORMULA_VARIABLES
m = number of ways for first event; n = number of ways for second event; m₁, m₂, ..., mₖ = number of ways for each of k independent sequential events.

## FORMULA_UNITS
dimensionless (counts of ways/outcomes)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch2_3 | Counting microstates in statistical mechanics uses independent choices per particle dimension
c11_chemistry_ch1_4 | Counting structural isomers applies the principle to independent positioning of functional groups
c11_economics_ch2_5 | Budget set enumeration with discrete goods uses multiplication across independent good categories
c11_compsci_ch4_2 | Algorithm complexity analysis counts loop iterations via multiplication of independent loop bounds

## PREREQ_CONCEPT
Multiplication of whole numbers as repeated addition and the concept of independent vs dependent events.

## PREREQ_BEFORE
Student must be able to identify sequential stages in a word problem and determine whether the number of choices at a later stage depends on earlier choices.

## PREREQ_STUCK
If stuck, revisit Class 7 "Writing Expressions from Word Problems" (c7_math_ch02_007) to practice breaking scenarios into sequential steps, and Class 9 "Sample Space" (c9_math_ch7_5) to practice listing outcomes systematically.

## WORKED_EXAMPLE_1
PROBLEM: A Delhi Metro commuter travels from Rajiv Chowk to HUDA City Centre. There are 3 routes from Rajiv Chowk to New Delhi station, 4 routes from New Delhi to Guru Dronacharya, and 2 routes from Guru Dronacharya to HUDA City Centre. If the commuter must pass through these intermediate stations in order, how many different route combinations are possible?
STEPS:
- Step 1: Identify the three sequential stages: Stage 1 (Rajiv Chowk → New Delhi) has 3 route choices. Stage 2 (New Delhi → Guru Dronacharya) has 4 route choices. Stage 3 (Guru Dronacharya → HUDA City Centre) has 2 route choices.
- Step 2: Verify independence — the choice of route in Stage 1 does not affect the available routes in Stage 2 or Stage 3; the metro network operates independently on each segment.
- Step 3: Apply the Fundamental Principle of Counting (Multiplication Principle) for 3 independent stages: Total ways = (choices in Stage 1) × (choices in Stage 2) × (choices in Stage 3).
- Step 4: Substitute values: Total = 3 × 4 × 2.
- Step 5: Compute stepwise: 3 × 4 = 12; 12 × 2 = 24. The answer is a pure count (dimensionless).
REASONING: The Multiplication Principle applies because each stage's choice set is fixed regardless of previous choices — the commuter's decision on the first segment doesn't open or close routes on later segments. This is the Cartesian product of three sets of sizes 3, 4, and 2.
ANSWER: 24 different route combinations.

## WORKED_EXAMPLE_2
PROBLEM: A school in Mumbai issues student ID codes consisting of 2 capital letters (A-Z) followed by 3 digits (0-9). The letters can repeat, but the digits must all be distinct. How many different ID codes can be generated?
STEPS:
- Step 1: Break the code into 5 positions: Position 1 (letter), Position 2 (letter), Position 3 (digit), Position 4 (digit), Position 5 (digit).
- Step 2: Determine choices per position with constraints: Pos 1: 26 letters (A-Z), repetition allowed. Pos 2: 26 letters (repetition allowed, independent of Pos 1). Pos 3: 10 digits (0-9). Pos 4: 9 remaining digits (distinct from Pos 3). Pos 5: 8 remaining digits (distinct from Pos 3 and Pos 4).
- Step 3: Verify independence within letter positions and within digit positions — letter choices don't affect digit choices and vice versa. The digit positions are dependent on each other (no repetition), but the Multiplication Principle still applies sequentially with decreasing counts.
- Step 4: Apply Multiplication Principle across all 5 positions: Total = 26 × 26 × 10 × 9 × 8.
- Step 5: Compute: 26 × 26 = 676; 10 × 9 × 8 = 720; 676 × 720 = 486,720.
REASONING: The problem mixes independent choices (letters, with repetition) and dependent sequential choices (digits, without repetition). The Multiplication Principle handles both: for independent stages we multiply constant counts; for dependent stages we multiply the decreasing counts at each step. The letter block and digit block are independent of each other.
ANSWER: 486,720 different ID codes.

## WORKED_EXAMPLE_3
PROBLEM: A cricket team selector must choose a playing XI from a squad of 15 players. The team must include exactly 1 wicketkeeper (2 available), at least 4 bowlers (5 available), and the rest batsmen/all-rounders (8 available). How many different teams can be formed if the selector first chooses the wicketkeeper, then the bowlers, then fills remaining spots?
STEPS:
- Step 1: Understand the constraints: Total 11 players. Wicketkeeper: exactly 1 from 2. Bowlers: at least 4 from 5 (so 4 or 5 bowlers). Others: from 8 batsmen/all-rounders.
- Step 2: Case 1 — Choose 4 bowlers. Then team composition: 1 WK + 4 bowlers + 6 others = 11. Number of ways: Choose WK: 2 ways. Choose 4 bowlers from 5: this is a combination (selection without order), not direct multiplication. But the problem says "selector first chooses wicketkeeper, then bowlers, then fills" — we must count sequential choices correctly.
- Step 3: Recognise that choosing 4 bowlers from 5 without regard to order is a combination (5C4 = 5), not 5 × 4 × 3 × 2. Similarly, choosing 6 others from 8 is 8C6 = 28. Since these choices are independent across categories, multiply: Case 1 total = 2 × 5C4 × 8C6 = 2 × 5 × 28 = 280.
- Step 4: Case 2 — Choose 5 bowlers. Then team: 1 WK + 5 bowlers + 5 others = 11. Ways: 2 × 5C5 × 8C5 = 2 × 1 × 56 = 112.
- Step 5: Cases are mutually exclusive (cannot have both 4 and 5 bowlers), so use Addition Principle: Total = 280 + 112 = 392.
- Step 6: Verify no overcounting: Each team has a unique WK, unique set of bowlers, unique set of others. The selection order (WK → bowlers → others) is just a mental scaffold; the multiplication across independent categories is valid.
REASONING: This problem combines the Multiplication Principle (across independent categories: WK, bowlers, others) with the Addition Principle (across mutually exclusive cases: 4 bowlers vs 5 bowlers) and requires combinations within categories because order of selection within bowlers/others doesn't matter. It foreshadows nodes c11_math_cbse_07_007 (combinations) and c11_math_cbse_07_011 (mixed problems).
ANSWER: 392 different teams.

## COMPETENCY_QUESTION_1
QUESTION: A food delivery app lets users build a custom pizza. The base is fixed. Toppings are chosen in 3 categories: Cheese (choose exactly 1 from 4 types), Veggies (choose any 3 from 5 types), Meat (choose 0, 1, or 2 from 3 types). The app claims "Over 1000 unique pizzas!" Is this claim true? Justify your answer with complete reasoning.
COMPETENCY: Translating real-world situations to mathematical expressions and justifying conclusions
STEPS:
- Step 1: Model each category as an independent choice block. Cheese: exactly 1 from 4 → 4 ways. Veggies: choose 3 from 5 → combination 5C3 = 10 ways. Meat: choose 0, 1, or 2 from 3 → 3C0 + 3C1 + 3C2 = 1 + 3 + 3 = 7 ways.
- Step 2: Verify independence across categories — cheese choice doesn't affect veggie or meat options.
- Step 3: Apply Multiplication Principle across categories: Total = 4 × 10 × 7 = 280.
- Step 4: Compare with claim: 280 < 1000, so the claim is false.
- Step 5: Explain why someone might think it's over 1000: they might incorrectly use permutations (5P3 = 60 for veggies) or allow repetition, or multiply 4 × 5 × 3 × 3 = 180 (still not 1000).
ANSWER: The claim is false. Only 280 unique pizzas are possible. The calculation uses combinations within categories (order of toppings doesn't matter) and multiplication across independent categories.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: In a board exam, a question paper has 3 sections: Section A (6 questions, attempt any 4), Section B (5 questions, attempt any 3), Section C (4 questions, attempt any 2). A student decides to attempt questions by first choosing which questions to skip in each section. Is the number of ways to select questions the same whether they think in terms of "choosing to attempt" or "choosing to skip"? Prove your answer mathematically.
COMPETENCY: Comparing and justifying equivalent counting methods
STEPS:
- Step 1: Method 1 (choose to attempt): Section A: choose 4 from 6 = 6C4. Section B: choose 3 from 5 = 5C3. Section C: choose 2 from 4 = 4C2. Total ways = 6C4 × 5C3 × 4C2.
- Step 2: Method 2 (choose to skip): Section A: skip 2 from 6 = 6C2. Section B: skip 2 from 5 = 5C2. Section C: skip 2 from 4 = 4C2. Total ways = 6C2 × 5C2 × 4C2.
- Step 3: Use the combination identity nCr = nC(n-r): 6C4 = 6C2, 5C3 = 5C2, 4C2 = 4C2.
- Step 4: Therefore both products are identical: 6C4 × 5C3 × 4C2 = 6C2 × 5C2 × 4C2.
- Step 5: Conclude: Yes, the number of ways is the same because choosing r items to include is equivalent to choosing (n-r) items to exclude, and the Multiplication Principle applies identically to both perspectives across independent sections.
ANSWER: Yes, the number of ways is identical. Choosing 4 to attempt from 6 is mathematically equivalent to choosing 2 to skip from 6 (6C4 = 6C2). The same holds for other sections. By the Multiplication Principle across independent sections, both approaches yield the same total count.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine you're packing for a school trip: you have 3 different shirts and 2 different pairs of ______.

## DIAGNOSTIC_ANSWER_7
trousers

**A wrong answer (a second "shirts") reveals the student has swapped the walkthrough's items - 3 different shirts are paired with 2 different pairs of trousers for the school trip.** Scenario blanks repeat the walkthrough verbatim, so the item noun is the walkthrough's own choice. Recall the 3 × 2 = 6 outfit count before filling, and give the noun exactly.

## DIAGNOSTIC_QUESTION_8
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_8
The student can correctly identify independent sequential choices in word problems, distinguish between AND (multiplication) and OR (addition) scenarios, and compute total outcomes for 3+ stage processes without overcounting or missing cases.

**A wrong answer (only multiplying) reveals the student has under-answered the mastery criterion.** Full mastery is threefold: identify independent sequential choices in word problems, distinguish AND (multiply) from OR (add) scenarios, and compute totals for processes of three or more stages without overcounting or missing cases.
