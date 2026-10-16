## ELI5
A Delhi baker makes chocolate and vanilla cakes under a flour ceiling and a sugar ceiling, chasing maximum profit: she has just met a Linear Programming Problem. Decision variables count the cakes; the objective function - one-twenty x plus eighty y - prices the profit; constraints translate flour and sugar limits into linear inequalities; and non-negativity bars negative baking. Linear because every relation is a straight-line affair; programming because the point is the optimal plan.

## DEFINITION
A Linear Programming Problem (LPP) is the mathematical formulation of an optimisation problem where we seek to find the maximum or minimum value of a linear objective function \(Z = ax + by\) (with \(a, b\) constants) of decision variables \(x, y \ge 0\), subject to a set of linear constraints expressed as linear inequalities (or equations) in \(x\) and \(y\). The term "linear" indicates that all relations — objective function and constraints — are linear; "programming" refers to determining an optimal plan of action.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can translate a real‑world optimisation scenario (investment, diet, production, transportation) into a complete mathematical LPP formulation: identify decision variables, write the objective function (maximise/minimise), list all constraints including non‑negativity restrictions, and state the problem in standard form. They can also explain why the formulation is linear and identify the feasible region conceptually.

## SCOPE_BOUNDARY
This node covers only the **definition and mathematical formulation** of a Linear Programming Problem. It does **not** cover graphical solution methods, corner‑point evaluation, bounded/unbounded feasible regions, or special cases (multiple optima, infeasibility, unbounded solutions) — those are addressed in subsequent nodes (c12_math_cbse_12_002 onward).

## WALKTHROUGH
Imagine a small bakery owner in Delhi who makes two types of cakes: Chocolate (profit ₹120 per cake) and Vanilla (profit ₹80 per cake). She has at most 20 kg of flour and 12 kg of sugar daily. Each chocolate cake uses 0.5 kg flour and 0.3 kg sugar; each vanilla cake uses 0.4 kg flour and 0.2 kg sugar. She wants to decide how many of each cake to bake daily to maximise profit. Start by asking: "What are the unknown quantities we can control?" → Let \(x\) = number of chocolate cakes, \(y\) = number of vanilla cakes. These are **decision variables**. Next: "What do we want to maximise?" → Profit \(Z = 120x + 80y\) (objective function). Then: "What limits our production?" → Flour: \(0.5x + 0.4y \le 20\); Sugar: \(0.3x + 0.2y \le 12\); and naturally \(x \ge 0, y \ge 0\). This step‑by‑step translation — variables → objective → constraints → non‑negativity — is the core of LPP formulation. The key insight: every real‑world restriction becomes a linear inequality, and the goal becomes a linear function to optimise.

Takeaway first: LPP formulation is translation - unknowns become decision variables, the goal becomes a linear objective, every restriction becomes a linear inequality, and non-negativity closes the list. Exam moves: formulation questions converting scenarios into full standard form, identification questions naming the four components, and linearity questions defending why each relation qualifies. Method: rerun the bakery - variables named, objective priced, flour and sugar inequalities written, non-negativity appended. Check yourself: every constraint must be linear - no multiplying variables together, no squares - or the problem has left the chapter's jurisdiction. Drill: formulate one diet or production problem completely and label each component's role.

## DIAGNOSTIC_QUESTION_1
State the three essential components of a Linear Programming Problem in standard form.

## DIAGNOSTIC_ANSWER_1
The three essential components are: (1) Decision variables (non‑negative), (2) A linear objective function to be maximised or minimised, (3) A set of linear constraints (inequalities/equations) that the variables must satisfy.  
A wrong answer (e.g., listing only "objective function and constraints" but omitting non‑negativity) reveals that the student does not recognise non‑negativity restrictions as a separate, mandatory component — a frequent source of errors in board exams where forgetting \(x, y \ge 0\) leads to an unbounded feasible region and incorrect solutions.

## DIAGNOSTIC_QUESTION_2
In the furniture dealer example from NCERT, the investment constraint is \(2500x + 500y \le 50000\) and the storage constraint is \(x + y \le 60\). Explain why both constraints are necessary and why they are written as inequalities (≤) rather than equations (=).

## DIAGNOSTIC_ANSWER_2
The investment constraint limits total spending to *at most* ₹50,000 (the dealer may not spend all money), and the storage constraint limits total pieces to *at most* 60 (space may not be fully used). Inequalities (≤) capture "at most" — the dealer can choose any combination that does not exceed the limits. Writing them as equations would force the dealer to spend exactly ₹50,000 and store exactly 60 pieces, which is not required and would eliminate feasible options like buying only 20 tables (₹50,000 spent, 20 pieces stored).  
A student who says "equations are simpler" or "the dealer wants to use all resources" misunderstands that LPP constraints are *restrictions*, not *requirements* to use everything. This misconception leads to infeasible formulations in word problems where resources are not fully utilised.

## DIAGNOSTIC_QUESTION_3
A farmer has 10 hectares of land. He grows wheat (profit ₹5000/hectare) and barley (profit ₹3000/hectare). Wheat requires 2 hours of labour per hectare, barley requires 1 hour. Total labour available is 15 hours. Fertiliser: wheat needs 3 kg/hectare, barley needs 2 kg/hectare; maximum fertiliser is 24 kg. Formulate the LPP to maximise profit. Write the objective function and all constraints explicitly.

## DIAGNOSTIC_ANSWER_3
Let \(x\) = hectares of wheat, \(y\) = hectares of barley.  
Objective: Maximise \(Z = 5000x + 3000y\)  
Constraints:  
Land: \(x + y \le 10\)  
Labour: \(2x + y \le 15\)  
Fertiliser: \(3x + 2y \le 24\)  
Non‑negativity: \(x \ge 0,\ y \ge 0\)  
A common error is writing the land constraint as \(x + y = 10\) (forcing full use of land) or swapping coefficients in labour/fertiliser constraints. Another error is omitting non‑negativity. The correct formulation shows all resources as "≤" because the farmer may not use all land, labour, or fertiliser.

## DIAGNOSTIC_QUESTION_4
Consider two LPP formulations:  
(A) Maximise \(Z = 3x + 4y\) subject to \(x + y \le 5,\ x \ge 0,\ y \ge 0\).  
(B) Maximise \(Z = 3x + 4y\) subject to \(x + y \le 5,\ x \ge 0,\ y \ge 0,\ x \le 3\).  
Compare the feasible regions of (A) and (B). How does adding the constraint \(x \le 3\) change the set of feasible solutions and the possible optimal value?

## DIAGNOSTIC_ANSWER_4
In (A), the feasible region is the triangle with vertices \((0,0), (5,0), (0,5)\). In (B), the extra constraint \(x \le 3\) cuts off the part of the triangle where \(x > 3\), making the feasible region a quadrilateral with vertices \((0,0), (3,0), (3,2), (0,5)\). The maximum of \(Z = 3x + 4y\) in (A) occurs at \((0,5)\) giving \(Z=20\). In (B), the corner points are \((0,0): Z=0\), \((3,0): Z=9\), \((3,2): Z=17\), \((0,5): Z=20\). The maximum remains 20 at \((0,5)\) because \((0,5)\) still satisfies \(x \le 3\). Adding a constraint can only shrink or leave unchanged the feasible region; the optimal value can stay the same or decrease (for maximisation), never increase.  
A student who thinks the optimal value must change or that the new constraint is redundant without checking corner points fails to analyse the geometric effect of constraints — a key skill for JEE/NEET where constraint modification questions appear.

## DIAGNOSTIC_QUESTION_5
A student formulates the following LPP for a factory producing two products A and B:  
Maximise \(Z = 50x + 40y\)  
Subject to:  
\(2x + 3y \ge 100\) (machine hours)  
\(x + 2y \le 80\) (labour hours)  
\(x \ge 0, y \ge 0\)  
The student claims: "Since machine hours must be at least 100, the constraint is \(\ge\); labour hours at most 80 gives \(\le\). This is correct." Evaluate this formulation. Is the machine‑hours constraint correctly represented? Justify.

## DIAGNOSTIC_ANSWER_5
The formulation is **incorrect**. Machine hours available are a *limited resource*; the factory cannot *exceed* the available hours. If the machine is available for 100 hours, the constraint should be \(2x + 3y \le 100\) (usage ≤ availability). Writing \(\ge 100\) means the factory must use *at least* 100 hours, which would force production to consume more machine time than available — an infeasible or unrealistic requirement. The student confused "minimum requirement" (like a demand constraint) with "resource availability". In LPP, resource constraints are always ≤ (for maximisation) because you cannot use more than you have.  
This error is extremely common in board exams: students write \(\ge\) for any "minimum" word without checking whether it's a resource limit or a demand requirement. The correct interpretation: resource availability → ≤; minimum demand/order → ≥.

## DIAGNOSTIC_QUESTION_6
Create a real‑world scenario (Indian context) that leads to a Linear Programming Problem with **exactly three constraints** (excluding non‑negativity) and **two decision variables**. The objective must be **minimisation**. Write the complete formulation and explain why each constraint is linear.

## DIAGNOSTIC_ANSWER_6
**Scenario:** A hospital in Mumbai needs to prepare a daily diet for patients using two food mixes: Mix A (cost ₹50/kg, provides 10 units protein, 5 units vitamins) and Mix B (cost ₹40/kg, provides 5 units protein, 10 units vitamins). Minimum daily requirements: protein ≥ 100 units, vitamins ≥ 80 units. The kitchen can store at most 15 kg total of the two mixes. Minimise cost.  
**Formulation:**  
Let \(x\) = kg of Mix A, \(y\) = kg of Mix B.  
Minimise \(Z = 50x + 40y\)  
Subject to:  
Protein: \(10x + 5y \ge 100\)  
Vitamins: \(5x + 10y \ge 80\)  
Storage: \(x + y \le 15\)  
\(x \ge 0,\ y \ge 0\)  
**Linearity explanation:** Each constraint is a linear combination of \(x\) and \(y\) with constant coefficients (protein/vitamin content per kg, storage capacity per kg). The objective is a linear cost function. All relations are first‑degree — no products, powers, or non‑linear functions of variables.  
A poor answer might give a scenario with non‑linear constraints (e.g., "cost per kg decreases after 10 kg") or forget non‑negativity, showing inability to distinguish linear from non‑linear relationships — a critical gap for competitive exams where non‑linear problems are not LPP.

## COMMON_MISCONCEPTION
**Misconception:** "In a maximisation problem, all constraints must be ≤ type; in a minimisation problem, all constraints must be ≥ type."  
**Why it's wrong:** The direction of inequality depends on the *nature of the restriction*, not the optimisation direction. A resource limit (money, time, material) always gives ≤ regardless of maximise/minimise. A minimum requirement (demand, nutritional minimum, contractual obligation) always gives ≥. For example, in a *minimisation* diet problem, nutrient constraints are ≥ (must meet minimum nutrients) while budget/storage constraints are ≤. Students who blindly flip inequalities based on max/min produce infeasible or incorrect models. This error costs full marks in board 6‑marker formulation questions and appears in JEE Main as "identify the correct formulation" MCQs.

## ON_FAILURE
If a student writes the wrong inequality direction:  
1. Ask them to read the constraint wording aloud: "We have *at most* ₹50,000" → "at most" means ≤. "We need *at least* 100 units protein" → "at least" means ≥.  
2. Have them classify each constraint as **Resource** (availability, capacity, budget) → ≤, or **Requirement** (demand, minimum nutrition, order) → ≥.  
3. Re‑write the constraint with the correct symbol and test with a simple numeric check: if resource = 100, can we use 120? No → ≤. If requirement = 100, can we provide 80? No → ≥.  
4. Assign practice: c11_math_cbse_06_007 (Word Problems: Applications of Linear Inequalities) to reinforce translating words into inequalities.

## PREREQUISITE_NODE_IDS
c11_math_cbse_06_001, c11_math_cbse_06_006, c11_math_cbse_10_001, c11_math_cbse_10_011, c10_math_cbse_03_001, c11_math_cbse_06_007, c11_stat_cbse_01_005

## PREREQUISITE_REASONS
c11_math_cbse_06_001: Linear Inequalities definition and notation — needed to understand constraint notation.  
c11_math_cbse_06_006: Linear Inequalities in Two Variables: Graphical Method — prerequisite for visualising feasible regions in next node.  
c11_math_cbse_10_001: Coordinate Axes and Coordinates of a Point — needed to plot constraints graphically later.  
c11_math_cbse_10_011: Slope‑Intercept Form of a Line — used to rewrite constraints for graphing.  
c10_math_cbse_03_001: Graphical Representation of a Pair of Linear Equations — foundation for understanding intersection of lines as corner points.
c11_math_cbse_06_007: 4. Assign practice: c11_math_cbse_06_007 (Word Problems: Applications of Linear Inequalities) to reinforce translating words into inequalities.  
c11_stat_cbse_01_005: c11_stat_cbse_01_005 | Statistics and Economics interrelationship: LPP optimises economic objectives (profit, cost) under constraints, a core technique in econometrics and operations research.  

## FORWARD_NODE_IDS
c12_math_cbse_12_002, c12_math_cbse_12_003, c12_math_cbse_12_004, c12_math_cbse_12_005, c12_math_cbse_12_006
## FORWARD_REASONS
c12_math_cbse_12_002: Graphical Method of Solving LPP — directly uses the formulation from this node to plot constraints and find feasible region.  
c12_math_cbse_12_003: Feasible Region and Corner Points — builds on the concept of feasible region introduced here.  
c12_math_cbse_12_004: Bounded and Unbounded Feasible Region — extends the feasible region classification.  
c12_math_cbse_12_005: Maximisation and Minimisation Problems — applies corner point method to formulated LPPs.  
c12_math_cbse_12_006: Word Problems: Diet, Manufacturing, Transportation — provides more formulation practice using the same framework.

## CROSS_SUBJECT_PREREQS
c11_stat_cbse_01_001, c11_stat_cbse_05_001
## CROSS_SUBJECT_REASONS
c11_stat_cbse_01_001: Meaning of Statistics in Plural and Singular Sense — statistical decision‑making often involves optimisation (e.g., minimising sampling error subject to cost constraints), linking LPP to statistical resource allocation.  
c11_stat_cbse_05_001: Meaning and Objectives of Averages — optimisation of averages (like weighted mean) under constraints is a linear programming application in statistical estimation.

## CHAIN_DESCRIPTION
c11_math_cbse_06_006 -> c12_math_cbse_12_001 -> c12_math_cbse_12_002

## THIS_FORMULA
General LPP Formulation:  
Optimise (Maximise or Minimise) \(Z = c_1 x_1 + c_2 x_2 + \dots + c_n x_n\)  
Subject to:  
\(a_{11}x_1 + a_{12}x_2 + \dots + a_{1n}x_n \ (\le, =, \ge) \ b_1\)  
\(a_{21}x_1 + a_{22}x_2 + \dots + a_{2n}x_n \ (\le, =, \ge) \ b_2\)  
\(\vdots\)  
\(a_{m1}x_1 + a_{m2}x_2 + \dots + a_{mn}x_n \ (\le, =, \ge) \ b_m\)  
\(x_1, x_2, \dots, x_n \ge 0\)

## FORMULA_VARIABLES
\(Z\) = objective function value (profit, cost, time, etc.)  
\(c_j\) = coefficient of decision variable \(x_j\) in objective function (profit per unit, cost per unit, etc.)  
\(x_j\) = decision variable (quantity to be determined)  
\(a_{ij}\) = coefficient of \(x_j\) in \(i\)-th constraint (resource consumption per unit)  
\(b_i\) = right‑hand side constant of \(i\)-th constraint (resource availability or requirement)  
\(m\) = number of constraints, \(n\) = number of decision variables (in Class 12, \(n=2\) for graphical method)

## FORMULA_UNITS
Units depend on context: \(Z\) in rupees (₹), hours, kg, etc.; \(x_j\) in units (pieces, hectares, kg, litres); \(a_{ij}\) in resource per unit (kg/unit, hours/unit); \(b_i\) in total resource (kg, hours, ₹). All variables dimensionless in pure mathematical formulation.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_06_006 | Graphical solution of linear inequalities in two variables is the direct geometric tool used to solve the LPP formulated here.  
c11_math_cbse_10_011 | Slope‑intercept form \(y = mx + c\) is used to rewrite each constraint for easy plotting on the Cartesian plane.  
c11_stat_cbse_01_005 | Statistics and Economics interrelationship: LPP optimises economic objectives (profit, cost) under constraints, a core technique in econometrics and operations research.
## PREREQ_CONCEPT
Graphical solution of a system of linear inequalities in two variables (Class 11, Chapter 6).

## PREREQ_BEFORE
The student must be able to graph a linear inequality like \(2x + 3y \le 12\) and identify the half‑plane that satisfies it.

## PREREQ_STUCK
Revisit c11_math_cbse_06_006 (Graphical Solution of Linear Inequalities in Two Variables) and practice shading the correct half‑plane for 5‑6 inequalities.

## WORKED_EXAMPLE_1
PROBLEM: A small furniture workshop in Jaipur makes chairs and tables. Each chair requires 2 hours of carpentry and 1 hour of finishing. Each table requires 3 hours of carpentry and 2 hours of finishing. The workshop has at most 120 hours of carpentry and 80 hours of finishing available per week. Profit per chair is ₹200 and per table is ₹350. Formulate the LPP to maximise weekly profit.  
STEPS:
- Step 1: Identify decision variables. Let \(x\) = number of chairs produced per week, \(y\) = number of tables produced per week.
- Step 2: Write the objective function. Profit \(Z = 200x + 350y\). We want to maximise \(Z\).
- Step 3: Translate resource constraints into linear inequalities.  
  Carpentry: \(2x + 3y \le 120\) (hours used ≤ hours available)  
  Finishing: \(1x + 2y \le 80\)
- Step 4: Add non‑negativity restrictions. \(x \ge 0,\ y \ge 0\) (cannot produce negative furniture).
- Step 5: State the complete formulation.  
  Maximise \(Z = 200x + 350y\)  
  Subject to:  
  \(2x + 3y \le 120\)  
  \(x + 2y \le 80\)  
  \(x \ge 0,\ y \ge 0\)
REASONING: The formulation follows the standard template: decision variables represent controllable quantities; the objective function aggregates profit linearly; each resource constraint is a linear inequality because resource usage is proportional to production quantities; non‑negativity is mandatory for physical quantities. This structure guarantees the problem is a Linear Programming Problem.
ANSWER: Maximise \(Z = 200x + 350y\) subject to \(2x + 3y \le 120\), \(x + 2y \le 80\), \(x \ge 0\), \(y \ge 0\).

## WORKED_EXAMPLE_2
PROBLEM: A dietician in Chennai must plan a daily diet using two foods: Food I (cost ₹60/kg, contains 3 units vitamin A, 4 units vitamin B per kg) and Food II (cost ₹45/kg, contains 2 units vitamin A, 5 units vitamin B per kg). Minimum daily requirements: vitamin A ≥ 24 units, vitamin B ≥ 30 units. The total weight of food cannot exceed 10 kg. Formulate the LPP to minimise cost.  
STEPS:
- Step 1: Decision variables: \(x\) = kg of Food I, \(y\) = kg of Food II.
- Step 2: Objective function (cost to minimise): \(Z = 60x + 45y\).
- Step 3: Nutrient constraints (minimum requirements → ≥):  
  Vitamin A: \(3x + 2y \ge 24\)  
  Vitamin B: \(4x + 5y \ge 30\)
- Step 4: Weight constraint (maximum capacity → ≤): \(x + y \le 10\).
- Step 5: Non‑negativity: \(x \ge 0,\ y \ge 0\).
- Step 6: Complete formulation:  
  Minimise \(Z = 60x + 45y\)  
  Subject to:  
  \(3x + 2y \ge 24\)  
  \(4x + 5y \ge 30\)  
  \(x + y \le 10\)  
  \(x \ge 0,\ y \ge 0\)
REASONING: This is a classic diet problem (minimisation). Nutrient constraints are ≥ because the diet must *meet or exceed* minimum requirements. Weight constraint is ≤ because total food cannot *exceed* storage/serving capacity. The objective is linear cost. All constraints are linear in \(x, y\).
ANSWER: Minimise \(Z = 60x + 45y\) subject to \(3x + 2y \ge 24\), \(4x + 5y \ge 30\), \(x + y \le 10\), \(x \ge 0\), \(y \ge 0\).

## WORKED_EXAMPLE_3
PROBLEM: A company in Pune manufactures two products P and Q using three machines M1, M2, M3. Time (hours) required per unit:  
Product P: M1=2, M2=1, M3=3  
Product Q: M1=1, M2=2, M3=1  
Machine availability per week: M1=100 hrs, M2=80 hrs, M3=90 hrs.  
Profit: P = ₹500/unit, Q = ₹400/unit.  
The company has a standing order to supply at least 10 units of P and at least 5 units of Q weekly. Formulate the LPP to maximise profit.  
STEPS:
- Step 1: Decision variables: \(x\) = units of P, \(y\) = units of Q.
- Step 2: Objective: Maximise \(Z = 500x + 400y\).
- Step 3: Machine constraints (resource limits → ≤):  
  M1: \(2x + y \le 100\)  
  M2: \(x + 2y \le 80\)  
  M3: \(3x + y \le 90\)
- Step 4: Order constraints (minimum demand → ≥):  
  \(x \ge 10\)  
  \(y \ge 5\)
- Step 5: Non‑negativity (already implied by order constraints but kept for completeness): \(x \ge 0,\ y \ge 0\).
- Step 6: Complete formulation:  
  Maximise \(Z = 500x + 400y\)  
  Subject to:  
  \(2x + y \le 100\)  
  \(x + 2y \le 80\)  
  \(3x + y \le 90\)  
  \(x \ge 10\)  
  \(y \ge 5\)
REASONING: This problem mixes resource constraints (≤) and demand constraints (≥). The order constraints \(x \ge 10, y \ge 5\) are *additional* lower bounds that replace the usual \(x \ge 0, y \ge 0\) (though \(x \ge 10\) is stronger). In standard form we keep both: the non‑negativity is technically redundant but included for clarity. All relations are linear.
ANSWER: Maximise \(Z = 500x + 400y\) subject to \(2x + y \le 100\), \(x + 2y \le 80\), \(3x + y \le 90\), \(x \ge 10\), \(y \ge 5\).

## COMPETENCY_QUESTION_1
QUESTION: A student wrote the following formulation for a problem: "A farmer has 50 acres of land. He grows corn (profit ₹8000/acre) and wheat (profit ₹6000/acre). Corn needs 4 hrs labour/acre, wheat needs 3 hrs labour/acre. Total labour = 150 hrs. Fertiliser: corn 5 bags/acre, wheat 2 bags/acre; max fertiliser = 200 bags. Maximise profit."  
The student's formulation:  
Maximise \(Z = 8000x + 6000y\)  
Subject to:  
\(x + y \le 50\)  
\(4x + 3y \ge 150\)  
\(5x + 2y \le 200\)  
\(x \ge 0, y \ge 0\)  
Identify the error(s) in the formulation, explain why it is wrong, and write the correct formulation.  
COMPETENCY: Error identification and correction  
STEPS:
- Step 1: Understand the problem: resources are land, labour, fertiliser; all are limited availabilities.
- Step 2: Check each constraint direction. Land: ≤ (correct). Labour: "total labour = 150 hrs" means availability is 150, so usage ≤ 150. The student wrote ≥ — error.
- Step 3: Fertiliser: ≤ (correct). Non‑negativity: correct.
- Step 4: Write correct formulation with labour constraint as ≤.
ANSWER: The labour constraint is incorrectly written as \(4x + 3y \ge 150\). Labour is a limited resource (150 hours available), so the time used cannot exceed availability: \(4x + 3y \le 150\). The correct formulation:  
Maximise \(Z = 8000x + 6000y\)  
Subject to:  
\(x + y \le 50\)  
\(4x + 3y \le 150\)  
\(5x + 2y \le 200\)  
\(x \ge 0, y \ge 0\)  
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A transport company in Kolkata has two types of trucks: Type A (capacity 10 tons, operating cost ₹5000/trip) and Type B (capacity 6 tons, operating cost ₹3500/trip). They must transport at least 120 tons of goods daily. The company owns at most 15 trucks total (both types combined) and at most 8 Type A trucks. Formulate the LPP to minimise daily operating cost. Then, explain why this problem is a Linear Programming Problem (refer to linearity of objective and constraints).  
COMPETENCY: Translating real-world situations to mathematical expressions  
STEPS:
- Step 1: Decision variables: \(x\) = number of Type A trucks used daily, \(y\) = number of Type B trucks used daily.
- Step 2: Objective: Minimise cost \(Z = 5000x + 3500y\).
- Step 3: Capacity constraint (minimum tons → ≥): \(10x + 6y \ge 120\).
- Step 4: Fleet constraints (maximum trucks → ≤): Total trucks: \(x + y \le 15\); Type A limit: \(x \le 8\).
- Step 5: Non‑negativity: \(x \ge 0, y \ge 0\).
- Step 6: Verify linearity: Objective is linear (sum of constant × variable). All constraints are linear inequalities (first‑degree in \(x, y\)). No products, powers, or non‑linear functions.
- Step 7: Write complete formulation and justification.
ANSWER:  
Minimise \(Z = 5000x + 3500y\)  
Subject to:  
\(10x + 6y \ge 120\)  
\(x + y \le 15\)  
\(x \le 8\)  
\(x \ge 0, y \ge 0\)  
This is an LPP because: (1) The objective function \(Z = 5000x + 3500y\) is a linear function of decision variables \(x, y\). (2) All constraints are linear inequalities (or equations) in \(x, y\) — each term is either a constant or a constant times a single variable. (3) Variables are restricted to non‑negative values. Hence it satisfies the definition of a Linear Programming Problem.  
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The term "linear" indicates that all relations — objective function and ______ — are linear; "programming" refers to determining an optimal plan of action.

## DIAGNOSTIC_ANSWER_7
constraints

Constraints complete the linear pair: objective and restrictions must both be straight-line relations for the problem to qualify. **A wrong answer (variables) reveals the student has named the unknowns where the sentence lists the relations that bound them.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine a small bakery owner in Delhi who makes two types of cakes: ______ (profit ₹120 per cake) and Vanilla (profit ₹80 per cake).

## DIAGNOSTIC_ANSWER_8
Chocolate

Chocolate is the first cake's flavour: its per-unit profit is the objective's x coefficient, and its recipes fill the constraint rows. **A wrong answer (another flavour) reveals the student has renamed the product and scrambled the coefficients tied to it.**

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can translate a real‑world optimisation scenario (investment, diet, production, transportation) into a complete mathematical LPP formulation: identify decision variables, write the objective function (maximise/minimise), list all constraints including non‑negativity restrictions, and state the problem in standard form.
