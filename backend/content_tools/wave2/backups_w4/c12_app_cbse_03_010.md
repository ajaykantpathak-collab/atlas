## ELI5
A ladder slides, its top descending as its foot advances — one constraint, Pythagoras, links them. Related-rates problems differentiate the constraint with respect to time before any number is substituted, then freeze the instant: foot at 6, height therefore 8. Substitute the known rate, solve for the unknown one, and read the sign as direction — negative means descending. Differentiate first, substitute last; the order is the whole method.

## DEFINITION
Related rates problems involve finding the rate of change of one quantity with respect to time by relating it to other quantities whose rates of change are known, using a constraint equation (geometry, physics, or economics) and differentiating implicitly with respect to time $t$ via the Chain Rule.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student must be able to: (1) Identify all changing quantities and assign variables; (2) Write a constraint equation linking them; (3) Differentiate implicitly with respect to time $t$ *before* substituting any instantaneous values; (4) Substitute known rates and values to solve for the unknown rate; (5) Interpret the sign of the answer (increasing/decreasing) in the context of the problem.

## SCOPE_BOUNDARY
This node covers standard related rates problems: geometric (sphere, cone, cylinder, ladder, shadow), motion (distance/velocity), and business/economics (cost/revenue/profit rates). It does **not** cover differential equations, optimization (maxima/minima), or parametric differentiation (covered in sibling nodes c12_app_cbse_03_005, c12_app_cbse_03_011+). It assumes fluency in implicit differentiation (c12_app_cbse_03_004) and Chain Rule (c11_app_cbse_08_009).

## WALKTHROUGH
Start with a real scenario: "A ladder 10 m long leans against a wall. The bottom slides away at 1 m/s. How fast does the top slide down when the bottom is 6 m from the wall?" This connects to the Pythagorean theorem ($x^2 + y^2 = 100$) learned in Class 10. Ask: "Which quantities change? ($x, y$) Which is constant? (10). What are we given? ($dx/dt = 1$). What do we need? ($dy/dt$)." Guide them to differentiate $x^2 + y^2 = 100$ w.r.t $t$: $2x(dx/dt) + 2y(dy/dt) = 0$. Emphasize: **Find $y$ using the constraint *at that instant* ($y=8$), THEN substitute numbers.** The key insight: Related rates is just the Chain Rule applied to a constraint equation where every variable is a function of time.

Takeaway: mastery means the constraint differentiated in general form and the instant substituted only afterwards. Exam moves: modelling questions identify changing and constant quantities; differentiation questions apply the chain rule to the constraint with respect to time; evaluation questions substitute the instant's values, solve the unknown rate, and interpret its sign. Method: the ladder's length never changes — constants differentiate to zero, and that silence is information. Drill: one ladder, one instant, one sign. Substituting early freezes the wrong things; the method's order is its protection.

## DIAGNOSTIC_QUESTION_1
A spherical balloon is being inflated. The volume $V$ and radius $r$ are related by $V = \frac{4}{3}\pi r^3$. If the radius is increasing at $2$ cm/s, write the correct expression for $\frac{dV}{dt}$ in terms of $r$ and $\frac{dr}{dt}$. Do not substitute values yet.

## DIAGNOSTIC_ANSWER_1
Correct answer: $\frac{dV}{dt} = 4\pi r^2 \frac{dr}{dt}$.
A wrong answer like $\frac{dV}{dt} = 4\pi r^2$ (missing $\frac{dr}{dt}$) reveals the student treats $r$ as the independent variable instead of a function of $t$, forgetting the Chain Rule link $\frac{dV}{dt} = \frac{dV}{dr} \cdot \frac{dr}{dt}$. Writing $\frac{dV}{dr} = 4\pi r^2$ is correct for $dV/dr$, but the question asks for $dV/dt$.

## DIAGNOSTIC_QUESTION_2
In a related rates problem involving a right triangle where the hypotenuse is fixed at 10 cm and the base $x$ increases at 3 cm/s, a student writes: $x^2 + y^2 = 100 \implies 2x + 2y = 0 \implies dy/dt = -x/y$. Identify the exact error in the differentiation step and explain why it is mathematically incorrect.

## DIAGNOSTIC_ANSWER_2
The student differentiated with respect to $x$ (or treated $x, y$ as constants), not $t$. The correct implicit differentiation w.r.t $t$ is $2x \frac{dx}{dt} + 2y \frac{dy}{dt} = 0$. The error reveals a fundamental misunderstanding: **every variable ($x, y$) is a function of time $t$**, so the Chain Rule *must* produce $\frac{dx}{dt}$ and $\frac{dy}{dt}$ terms. Writing $2x + 2y = 0$ implies $\frac{d}{dt}(x^2) = 2x$, which is false; $\frac{d}{dt}(x^2) = 2x \frac{dx}{dt}$.

## DIAGNOSTIC_QUESTION_3
A conical tank (vertex down) has height 12 m and top radius 4 m. Water is poured in at $10 \text{ m}^3/\text{min}$. Find the rate at which the water level rises when the water is 3 m deep. (Volume of cone $V = \frac{1}{3}\pi r^2 h$).

## DIAGNOSTIC_ANSWER_3
**Steps:**
1. Relate $r$ and $h$ using similar triangles: $r/h = 4/12 = 1/3 \implies r = h/3$.
2. Substitute into Volume: $V = \frac{1}{3}\pi (h/3)^2 h = \frac{\pi}{27} h^3$.
3. Differentiate w.r.t $t$: $\frac{dV}{dt} = \frac{\pi}{9} h^2 \frac{dh}{dt}$.
4. Substitute knowns: $10 = \frac{\pi}{9} (3)^2 \frac{dh}{dt} \implies 10 = \pi \frac{dh}{dt}$.
5. Solve: $\frac{dh}{dt} = \frac{10}{\pi} \text{ m/min}$.
A wrong answer using $r=4$ (constant) reveals the student treated the *tank's* top radius as the *water's* radius, ignoring similar triangles. Plugging $h=3$ *before* differentiating yields $dV/dt = 0$, a classic "constants vanish" error.

## DIAGNOSTIC_QUESTION_4
Two cars start from the same point. Car A travels North at 60 km/h. Car B travels East at 80 km/h. At what rate is the distance between them changing after 2 hours? Compare this rate to the rate after 1 hour. Explain the relationship without recalculating fully.

## DIAGNOSTIC_ANSWER_4
Let $x$ = distance East, $y$ = distance North, $z$ = distance between. $z^2 = x^2 + y^2$.
Differentiate: $2z \frac{dz}{dt} = 2x \frac{dx}{dt} + 2y \frac{dy}{dt}$.
At $t=2$: $x=160, y=120, z=200$. $\frac{dz}{dt} = \frac{160(80) + 120(60)}{200} = \frac{12800+7200}{200} = 100 \text{ km/h}$.
At $t=1$: $x=80, y=60, z=100$. $\frac{dz}{dt} = \frac{80(80) + 60(60)}{100} = 100 \text{ km/h}$.
**Insight:** The rate is constant ($100$ km/h) because the velocity vectors are constant and perpendicular; the relative speed is the magnitude of the vector sum $\sqrt{60^2+80^2}=100$. A student claiming the rate changes with time fails to recognize the linear relationship $x=80t, y=60t \implies z=100t \implies dz/dt = 100$ constant.

## DIAGNOSTIC_QUESTION_5
A company's cost function is $C(x) = 0.01x^3 - 0.5x^2 + 20x + 1000$ (Rupees), where $x$ is daily production. Production is increasing at $10$ units/day when $x=50$. The manager claims: "Marginal Cost is $C'(50)$, so the rate of change of cost with time is just $C'(50) \times 10$." Evaluate this claim. Is the logic mathematically sound? Justify.

## DIAGNOSTIC_ANSWER_5
**The claim is mathematically sound.**
Reasoning: Marginal Cost $MC = \frac{dC}{dx}$. Rate of change of cost w.r.t time is $\frac{dC}{dt} = \frac{dC}{dx} \cdot \frac{dx}{dt} = MC \cdot \frac{dx}{dt}$.
At $x=50$: $C'(x) = 0.03x^2 - x + 20 \implies C'(50) = 0.03(2500) - 50 + 20 = 75 - 30 = 45$ Rs/unit.
$\frac{dC}{dt} = 45 \times 10 = 450$ Rs/day.
A student who says "No, because MC changes with x" misunderstands the *instantaneous* nature of derivatives. The Chain Rule gives the *instantaneous* rate exactly at that instant. The logic is the direct application of $\frac{dy}{dt} = \frac{dy}{dx} \frac{dx}{dt}$.

## DIAGNOSTIC_QUESTION_6
Create a novel related rates problem set in an Indian context (e.g., a festival, agriculture, or local transport) involving **at least three changing quantities** linked by **two constraint equations**. Define all variables, state the given rates, and state the target unknown rate. Do not solve it.

## DIAGNOSTIC_ANSWER_6
**Example Problem:** During Diwali, a cylindrical *diya* (lamp) with radius 3 cm is being filled with ghee at $2 \text{ cm}^3/\text{s}$. Simultaneously, the wick burns ghee at a rate proportional to the exposed surface area of the ghee ($k \times \pi r^2$, $k=0.01 \text{ cm/s}$). The flame height $H$ is proportional to the square root of the ghee volume ($H = c\sqrt{V}$, $c=2 \text{ cm}^{-1/2}$).
**Variables:** $V$ = volume of ghee, $h$ = height of ghee, $H$ = flame height.
**Constraints:** (1) $V = \pi r^2 h = 9\pi h$ (Geometry). (2) $H = 2\sqrt{V}$ (Physics).
**Given:** $\frac{dV}{dt}_{\text{in}} = 2$, $\frac{dV}{dt}_{\text{out}} = -0.01 \times 9\pi = -0.09\pi$. Net $\frac{dV}{dt} = 2 - 0.09\pi$.
**Find:** $\frac{dH}{dt}$ when $h = 4$ cm.
A poor answer uses only one constraint (e.g., ignores burning rate or flame relation) or defines variables inconsistently, showing inability to model multi-process systems.

## COMMON_MISCONCEPTION
**Substituting "snapshot" values BEFORE differentiating.**
Students see "when radius is 5 cm" and immediately write $V = \frac{4}{3}\pi (5)^3$ or $r=5$ in the volume formula, then differentiate to get $dV/dt = 0$. They treat the *instantaneous value* as a *constant* for the entire process.
**Why it happens:** In algebra/word problems (Class 6-10), "when $x=5$" means substitute $x=5$ *first*. In calculus rates, the relationship $V(r(t))$ must be differentiated *while $r$ is still a variable function of $t$* to capture $\frac{dr}{dt}$. The constraint equation (e.g., $V=\frac{4}{3}\pi r^3$) holds for *all* time; differentiating it yields a relationship between *rates* that holds for all time. Substituting $r=5$ *after* differentiation evaluates that rate relationship *at that instant*.

## ON_FAILURE
1. **Revisit Chain Rule mechanics (c11_app_cbse_08_009):** Practice $\frac{d}{dt}[f(g(t))] = f'(g(t))g'(t)$ with explicit time functions (e.g., $r(t)=2t+1$, find $dV/dt$ for $V=\frac{4}{3}\pi r^3$ by substituting $r(t)$ first, then differentiating; compare to Chain Rule result).
2. **Drill the "Differentiate First, Substitute Last" protocol:** Give 5 problems where the *only* task is to write the differentiated equation (Step 3 in Mastery) without solving. Use a highlighter: mark "Constants" (never differentiate) vs "Variables w.r.t t" (must get $d/dt$).
3. **Diagnostic Re-test:** Use Diagnostic Question 3 (Cone problem) but change numbers. Require student to verbalize: "I am differentiating w.r.t $t$ because both $V$ and $h$ change with time. I substitute $h=3$ *after* I have $\frac{dh}{dt}$ isolated."

## PREREQUISITE_NODE_IDS
c12_app_cbse_03_004, c12_app_cbse_03_009, c11_app_cbse_08_009

## PREREQUISITE_REASONS
c12_app_cbse_03_004: Implicit differentiation is the core mechanical skill; related rates *is* implicit differentiation with respect to time $t$.
c12_app_cbse_03_009: Establishes $dy/dx$ as rate of change; this node extends it to $dy/dt$ (time rates) and the Chain Rule link $\frac{dy}{dt} = \frac{dy}{dx}\frac{dx}{dt}$.
c11_app_cbse_08_009: Chain Rule foundation ($\frac{dy}{dt} = \frac{dy}{du}\frac{du}{dt}$) is the mathematical engine; without fluency here, the $dt$ terms appear magically.

## FORWARD_NODE_IDS
N/A

## FORWARD_REASONS

## CROSS_SUBJECT_PREREQS
c12_phy_cbse_03_001, c12_che_cbse_04_001

## CROSS_SUBJECT_REASONS
c12_phy_cbse_03_001: Kinematics (velocity/acceleration) *is* related rates: $v = dx/dt, a = dv/dt$. Problems like "ladder sliding" or "shadow length" are physics kinematics problems solved with calculus.
c12_che_cbse_04_001: Chemical Kinetics defines Rate of Reaction = $\frac{1}{\nu_i}\frac{d[C_i]}{dt}$. Stoichiometry gives constraint equations linking concentration rates (e.g., $2N_2O_5 \to 4NO_2 + O_2 \implies -\frac{1}{2}\frac{d[N_2O_5]}{dt} = \frac{1}{4}\frac{d[NO_2]}{dt}$), identical mathematical structure to geometric related rates.

## CHAIN_DESCRIPTION
c12_app_cbse_03_004 -> c12_app_cbse_03_010 -> c12_app_cbse_03_012 (Implicit Diff -> Related Rates -> Optimization)

## THIS_FORMULA
Chain Rule for Related Rates: $\frac{dy}{dt} = \frac{dy}{dx} \cdot \frac{dx}{dt}$ (General) | Constraint Equation: $F(x, y, ...) = 0 \implies \frac{\partial F}{\partial x}\frac{dx}{dt} + \frac{\partial F}{\partial y}\frac{dy}{dt} + ... = 0$ (Implicit Diff w.r.t $t$)

## FORMULA_VARIABLES
$y, x$: Quantities changing with time $t$. $F(x,y)=0$: Geometric/Physical/Economic constraint linking them. $\frac{dx}{dt}, \frac{dy}{dt}$: Rates of change w.r.t time.

## FORMULA_UNITS
Rates: Quantity units / Time units (e.g., cm/s, m³/min, Rs/day). Constraint equation units must be consistent (e.g., Volume in m³, length in m).

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c12_phy_cbse_03_001 | Kinematics: Velocity ($v=dx/dt$) and Acceleration ($a=dv/dt$) are instantaneous rates. Ladder/Shadow problems are 2D kinematics constraints ($x^2+y^2=L^2$).
c12_che_cbse_04_001 | Chemical Kinetics: Rate laws link concentration rates via stoichiometric coefficients. $-\frac{1}{a}\frac{d[A]}{dt} = \frac{1}{b}\frac{d[B]}{dt}$ is a linear related rates constraint.

## PREREQ_CONCEPT
Implicit Differentiation with respect to a parameter (time $t$), recognizing that all geometric quantities ($r, h, V, x, y$) are functions $r(t), h(t), V(t), x(t), y(t)$.

## PREREQ_BEFORE
Student must fluently differentiate $y^2$, $xy$, $x^3$, $\sin x$ w.r.t $t$ producing $2y y'$, $x y' + y x'$, $3x^2 x'$, $\cos x \cdot x'$ respectively, without thinking.

## PREREQ_STUCK
If stuck on "where does $dr/dt$ come from?", go back to c11_app_cbse_08_009 (Chain Rule) and practice: "If $r = t^2+1$, find $d/dt (r^3)$." Then replace $t^2+1$ with "unknown function $r(t)$".

## WORKED_EXAMPLE_1
PROBLEM: A spherical *laddoo* (sweet) is being coated with sugar syrup. The syrup forms a uniform spherical shell around the *laddoo*. If the volume of the syrup increases at a constant rate of $12\pi \text{ cm}^3/\text{s}$, how fast is the outer radius of the syrup layer increasing when the outer radius is 3 cm? (Assume the *laddoo* radius is constant at 2 cm).
STEPS:
- Step 1: Identify variables. Let $R$ = outer radius (variable), $r=2$ = inner radius (constant). Volume of syrup shell $V = \frac{4}{3}\pi R^3 - \frac{4}{3}\pi (2)^3 = \frac{4}{3}\pi (R^3 - 8)$.
- Step 2: Identify Given and Target. Given: $\frac{dV}{dt} = 12\pi \text{ cm}^3/\text{s}$. Target: $\frac{dR}{dt}$ when $R = 3 \text{ cm}$.
- Step 3: Differentiate constraint w.r.t time $t$. $\frac{dV}{dt} = \frac{4}{3}\pi (3R^2 \frac{dR}{dt} - 0) = 4\pi R^2 \frac{dR}{dt}$. (Note: derivative of constant $-8$ is 0).
- Step 4: Substitute known values *after* differentiation. $12\pi = 4\pi (3)^2 \frac{dR}{dt} \implies 12\pi = 36\pi \frac{dR}{dt}$.
- Step 5: Solve and interpret. $\frac{dR}{dt} = \frac{12\pi}{36\pi} = \frac{1}{3} \text{ cm/s}$. Positive sign means radius is increasing.
REASONING: The shell volume is the difference of two spheres. The inner sphere is constant (laddoo doesn't grow), so its derivative is zero. The Chain Rule on $R^3$ brings down $3R^2 dR/dt$. Substituting $R=3$ only at the end captures the instantaneous geometry.
ANSWER: The outer radius is increasing at $1/3 \text{ cm/s}$ when the radius is 3 cm.

## WORKED_EXAMPLE_2
PROBLEM: A man 1.8 m tall walks away from a 6 m high street lamp at a speed of 1.5 m/s. (a) How fast is the tip of his shadow moving? (b) How fast is the length of his shadow increasing?
STEPS:
- Step 1: Draw diagram. Let $x$ = distance of man from lamp post. $y$ = length of shadow. Distance of tip from lamp = $x+y$. Similar triangles: $\frac{6}{1.8} = \frac{x+y}{y}$.
- Step 2: Simplify constraint. $6y = 1.8(x+y) \implies 6y = 1.8x + 1.8y \implies 4.2y = 1.8x \implies 7y = 3x \implies y = \frac{3}{7}x$.
- Step 3: Differentiate w.r.t $t$. $\frac{dy}{dt} = \frac{3}{7} \frac{dx}{dt}$. Given $\frac{dx}{dt} = 1.5 \text{ m/s}$.
- Step 4: Solve for (b) shadow length rate. $\frac{dy}{dt} = \frac{3}{7} \times 1.5 = \frac{4.5}{7} = \frac{9}{14} \text{ m/s}$.
- Step 5: Solve for (a) tip speed. Tip distance $L = x+y$. $\frac{dL}{dt} = \frac{dx}{dt} + \frac{dy}{dt} = 1.5 + \frac{9}{14} = \frac{21}{14} + \frac{9}{14} = \frac{30}{14} = \frac{15}{7} \text{ m/s}$.
REASONING: Similar triangles give a linear constraint $y \propto x$, so rates are proportional. The tip speed is the sum of man's speed and shadow growth speed because the tip moves relative to ground = man moves relative to ground + shadow grows relative to man.
ANSWER: (a) Tip moves at $15/7 \approx 2.14 \text{ m/s}$. (b) Shadow length increases at $9/14 \approx 0.64 \text{ m/s}$.

## WORKED_EXAMPLE_3
PROBLEM: Sand falls from a conveyor belt onto a conical pile at $20 \text{ cm}^3/\text{s}$. The height of the pile is always twice the base radius. At the moment the pile is 10 cm high, find: (i) rate of height increase; (ii) rate of base area increase.
STEPS:
- Step 1: Variables & Constraints. $V$ = volume, $h$ = height, $r$ = radius, $A = \pi r^2$ = base area. Given: $h = 2r \implies r = h/2$. $V = \frac{1}{3}\pi r^2 h = \frac{1}{3}\pi (h/2)^2 h = \frac{\pi}{12} h^3$. $\frac{dV}{dt} = 20$.
- Step 2: Find $dh/dt$ (part i). Differentiate $V$: $\frac{dV}{dt} = \frac{\pi}{12} \cdot 3h^2 \frac{dh}{dt} = \frac{\pi}{4} h^2 \frac{dh}{dt}$.
- Step 3: Substitute $h=10$, $dV/dt=20$. $20 = \frac{\pi}{4} (100) \frac{dh}{dt} \implies 20 = 25\pi \frac{dh}{dt} \implies \frac{dh}{dt} = \frac{20}{25\pi} = \frac{4}{5\pi} \text{ cm/s}$.
- Step 4: Find $dA/dt$ (part ii). $A = \pi r^2 = \pi (h/2)^2 = \frac{\pi}{4} h^2$. Differentiate: $\frac{dA}{dt} = \frac{\pi}{4} \cdot 2h \frac{dh}{dt} = \frac{\pi}{2} h \frac{dh}{dt}$.
- Step 5: Substitute $h=10$, $dh/dt = 4/(5\pi)$. $\frac{dA}{dt} = \frac{\pi}{2} (10) (\frac{4}{5\pi}) = 5 \times \frac{4}{5} = 4 \text{ cm}^2/\text{s}$.
- Step 6: Verify consistency. $dV/dt = \text{Base Area} \times dh/dt$? $A = \frac{\pi}{4}(100) = 25\pi$. $A \cdot dh/dt = 25\pi \times \frac{4}{5\pi} = 20$. Matches.
REASONING: The constraint $h=2r$ reduces the system to one independent variable ($h$). We compute $dh/dt$ first, then use it to find $dA/dt$ via Chain Rule ($dA/dt = dA/dh \cdot dh/dt$). The verification step (Step 6) uses the physical fact that $dV = A \cdot dh$ for a cylinder/slice, which holds for a cone *only if* the shape is similar (which it is here).
ANSWER: (i) Height increases at $\frac{4}{5\pi} \text{ cm/s}$. (ii) Base area increases at $4 \text{ cm}^2/\text{s}$.

## COMPETENCY_QUESTION_1
QUESTION: A rectangular water tank (base 2m x 3m) has a leak at the bottom. Water drains out at a rate proportional to the square root of the water depth $h$ (Torricelli's Law approximation): $\frac{dV}{dt} = -k\sqrt{h}$, where $k=0.1 \text{ m}^{2.5}/\text{s}$. Simultaneously, a pump adds water at a constant rate of $0.05 \text{ m}^3/\text{s}$. Find the rate of change of water depth $\frac{dh}{dt}$ when $h = 1 \text{ m}$. Is the water level rising or falling at this instant?
COMPETENCY: Mathematical Modeling & Application (Translating physical law into calculus, handling competing rates)
STEPS:
- Step 1: Write Volume constraint for rectangular tank: $V = \text{Area}_{base} \times h = 6h$.
- Step 2: Write Net Rate equation: $\frac{dV}{dt} = \text{Rate}_{in} + \text{Rate}_{out} = 0.05 - 0.1\sqrt{h}$.
- Step 3: Differentiate Volume constraint w.r.t $t$: $\frac{dV}{dt} = 6 \frac{dh}{dt}$.
- Step 4: Equate and substitute $h=1$: $6 \frac{dh}{dt} = 0.05 - 0.1\sqrt{1} = 0.05 - 0.1 = -0.05$.
- Step 5: Solve: $\frac{dh}{dt} = -0.05/6 = -1/120 \approx -0.00833 \text{ m/s}$.
ANSWER: $\frac{dh}{dt} = -\frac{1}{120} \text{ m/s}$. The negative sign indicates the water level is **falling** at this instant (outflow > inflow at $h=1$).
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: In a manufacturing process, the Cost $C$ (Rupees) and Revenue $R$ (Rupees) for producing $x$ units are given by $C(x) = 500 + 20x + 0.1x^2$ and $R(x) = 50x - 0.05x^2$. Production level $x$ varies with time $t$ (days) according to $x(t) = 10t^2$ (for $t \ge 0$). Find the rate of change of Profit $P(t) = R(x(t)) - C(x(t))$ with respect to time when $t = 2$ days. Interpret the result in terms of Marginal Profit and production speed.
COMPETENCY: Multi-step Chain Rule Application & Economic Interpretation (Connecting $dP/dt = (dP/dx)(dx/dt)$ to Marginal concepts)
STEPS:
- Step 1: Find Profit function $P(x) = R(x) - C(x) = (50x - 0.05x^2) - (500 + 20x + 0.1x^2) = -0.15x^2 + 30x - 500$.
- Step 2: Find Marginal Profit $MP = \frac{dP}{dx} = -0.3x + 30$.
- Step 3: Find production speed $\frac{dx}{dt} = \frac{d}{dt}(10t^2) = 20t$.
- Step 4: Apply Chain Rule for $dP/dt$: $\frac{dP}{dt} = \frac{dP}{dx} \cdot \frac{dx}{dt} = (-0.3x + 30)(20t)$.
- Step 5: Evaluate at $t=2$. First find $x(2) = 10(4) = 40$. Then $MP(40) = -0.3(40) + 30 = -12 + 30 = 18$. Speed $dx/dt = 20(2) = 40$.
- Step 6: Compute $dP/dt = 18 \times 40 = 720 \text{ Rs/day}$.
ANSWER: Profit is increasing at $720 \text{ Rs/day}$ at $t=2$. Since $MP > 0$ and production is increasing ($dx/dt > 0$), profit grows. If production were scaled back ($dx/dt < 0$), profit would fall even with positive MP.
DIFFICULTY: hard