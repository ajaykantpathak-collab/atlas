## DEFINITION
The volume of a combination of solids is the total space occupied by a 3D object formed by joining two or more basic solids (cube, cuboid, cylinder, cone, sphere, hemisphere) such that their volumes are additive without overlap. The method involves decomposing the combined solid into its constituent basic solids, calculating the volume of each using standard formulas, and summing them to obtain the total volume.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can independently decompose any combined solid (up to three basic solids) into its components, select and apply the correct volume formula for each component with appropriate substitutions, and compute the total volume with correct units. The student can also solve reverse problems where total volume is given and one dimension must be found.

## SCOPE_BOUNDARY
Covers combinations of basic solids (cube, cuboid, cylinder, cone, sphere, hemisphere) where volumes are simply added. Does NOT cover frustum of a cone (separate node c10_math_cbse_12_008), solids with cavities/hollow parts requiring subtraction (covered in c10_math_cbse_12_005), or calculus-based volume methods. Restricted to Class 10 NCERT combinations: cylinder+hemisphere, cone+cylinder, cone+hemisphere, and cube/cuboid with hemispherical/cylindrical cavities.

## WALKTHROUGH
Imagine you are designing a decorative paperweight for your school's annual day gift shop — it is shaped like a cylinder with a hemisphere on top, made of solid glass. The shop owner needs to know how much glass (in cm³) is required to make 50 such paperweights. You already know the volume formulas for a cylinder and a hemisphere separately from Class 9. The key insight is that the glass paperweight is just these two solids joined together without any gaps or overlaps, so the total glass volume is simply the sum of the two individual volumes. Start by sketching the solid, labelling all given dimensions (radius, heights), writing the volume formula for each component, substituting values, computing each volume, and finally adding them. This "decompose → formula → substitute → compute → add" method works for every combination problem in the board exam.

## DIAGNOSTIC_QUESTION_1
State the volume formula for a solid formed by placing a hemisphere of radius r on top of a cylinder of the same radius r and height h. Write the formula in terms of π, r, and h only.

## DIAGNOSTIC_ANSWER_1
Correct answer: V = πr²h + (2/3)πr³. A wrong answer like V = πr²h + (4/3)πr³ reveals the student is using the full sphere formula instead of the hemisphere formula — a very common board exam error where students forget that a hemisphere is exactly half a sphere. Another wrong answer V = πr²h + πr³ shows the student might be confusing volume with surface area formulas or misremembering the coefficient.

## DIAGNOSTIC_QUESTION_2
A solid toy is made by fixing a cone of height 12 cm on top of a cylinder of height 8 cm. Both have the same base radius of 5 cm. A student calculates the total volume as π(5)²(12) + π(5)²(8) = 500π cm³. Is this correct? Explain why or why not.

## DIAGNOSTIC_ANSWER_2
The student's answer is incorrect. They used the cylinder volume formula πr²h for both the cone and the cylinder. The cone volume is (1/3)πr²h, not πr²h. The correct total volume is (1/3)π(5)²(12) + π(5)²(8) = 100π + 200π = 300π cm³. This error reveals the student cannot distinguish between cone and cylinder volume formulas — a critical gap since board exams frequently combine these two solids. The student likely memorised "πr²h" as the generic volume formula without understanding the 1/3 factor for cones.

## DIAGNOSTIC_QUESTION_3
A cylindrical pencil holder of radius 3.5 cm and height 12 cm has a hemispherical cavity of radius 3.5 cm drilled out from the top. Find the volume of wood used. (Use π = 22/7)

## DIAGNOSTIC_ANSWER_3
Step 1: Volume of cylinder = πr²h = (22/7) × (3.5)² × 12 = (22/7) × 12.25 × 12 = 22 × 1.75 × 12 = 462 cm³.
Step 2: Volume of hemisphere = (2/3)πr³ = (2/3) × (22/7) × (3.5)³ = (2/3) × (22/7) × 42.875 = (2/3) × 22 × 6.125 = 89.833... cm³.
Step 3: Volume of wood = Cylinder volume − Hemisphere volume = 462 − 89.833... = 372.167 cm³ ≈ 372.17 cm³.
A wrong answer of 462 + 89.83 = 551.83 cm³ reveals the student added instead of subtracted — they treated the cavity as an added solid rather than removed material. This confusion between "combination by joining" (addition) and "combination by removing" (subtraction) costs marks in 3-4 mark board questions.

## DIAGNOSTIC_QUESTION_4
Two students solve the same problem: "A solid is made of a cube of side 7 cm with a hemisphere of radius 3.5 cm on top. Find the total volume." Student A computes 7³ + (2/3)π(3.5)³. Student B computes 7³ + (4/3)π(3.5)³. Which student is correct? What conceptual error did the other student make?

## DIAGNOSTIC_ANSWER_4
Student A is correct. The solid is a cube + hemisphere, so total volume = cube volume + hemisphere volume = a³ + (2/3)πr³. Student B used the full sphere formula (4/3)πr³ instead of the hemisphere formula. The error is failing to recognise that "hemisphere on top" means exactly half a sphere, not a full sphere. In board exams, questions often say "a hemisphere is surmounted on a cube" — the word "surmounted" means placed on top, and students must automatically halve the sphere volume. This tests whether the student understands "hemi-" prefix means half, not just memorising formulas.

## DIAGNOSTIC_QUESTION_5
A board exam question asks: "A solid iron pole consists of a cylinder of height 220 cm and base diameter 24 cm, which is surmounted by another cylinder of height 60 cm and radius 8 cm. Find the mass of the pole, given that 1 cm³ of iron has mass 8 g." A student writes: "Total volume = π(12)²(220) + π(8)²(60) = 31680π + 3840π = 35520π cm³. Mass = 35520π × 8 = 284160π g ≈ 892.5 kg." Identify the error in the student's working and correct it.

## DIAGNOSTIC_ANSWER_5
The student's volume calculation is correct: 35520π cm³. However, the mass calculation uses π ≈ 3.14 implicitly, but the problem expects π = 22/7 for exact computation in CBSE. Using π = 22/7: Volume = 35520 × (22/7) = 111531.43 cm³. Mass = 111531.43 × 8 = 892251.43 g = 892.25 kg. The error is using decimal π instead of 22/7 — CBSE marking scheme deducts marks for not using the prescribed value of π. Also, the student should convert to kg properly: 892.25 kg (not 892.5 kg). This tests attention to board exam instructions: "Use π = 22/7 unless stated otherwise."

## DIAGNOSTIC_QUESTION_6
Create a real-world word problem (Indian context) that requires finding the volume of a combination of THREE different basic solids. Specify all dimensions and ask for the total volume. The problem must be solvable using only Class 10 formulas.

## DIAGNOSTIC_ANSWER_6
Sample problem: "A temple kalash (finial) is made of a cubical base of side 20 cm, a cylindrical middle section of radius 7 cm and height 30 cm, and a conical top of radius 7 cm and height 24 cm. Find the total volume of brass required to make the kalash. (Use π = 22/7)". 
Solution: Cube volume = 20³ = 8000 cm³. Cylinder volume = (22/7)×7²×30 = 4620 cm³. Cone volume = (1/3)×(22/7)×7²×24 = 1232 cm³. Total = 8000 + 4620 + 1232 = 13852 cm³. 
A poor answer would use only two solids, mismatch dimensions (e.g., cone radius ≠ cylinder radius), or ask for surface area instead of volume. This tests whether the student can synthesise a multi-component problem — the highest Bloom level — and understands that combined solids in board exams often have 3 parts (e.g., cube + cylinder + cone).

## COMMON_MISCONCEPTION
Students consistently confuse "volume of combination" with "surface area of combination" — they subtract overlapping areas in volume problems just like they do for surface area. For example, when a hemisphere is placed on a cylinder, the circular base of the hemisphere and the top circle of the cylinder coincide. In surface area, we subtract 2πr² (the overlapping circles). In volume, students incorrectly subtract the volume of the overlapping region (which doesn't exist — volumes don't overlap when solids are joined face-to-face). They write: V = πr²h + (2/3)πr³ − πr²h (wrongly subtracting cylinder top volume). The correct understanding: volumes are always additive for joined solids because they occupy distinct 3D regions; only surface areas require subtraction of hidden faces.

## ON_FAILURE
If a student subtracts volumes in a combination problem, immediately stop and ask: "Draw the solid. Shade the cylinder volume in blue and the hemisphere volume in red. Do the blue and red regions overlap in 3D space?" They will see the volumes are side-by-side, not overlapping. Then ask: "In surface area, why did we subtract the circle areas?" Answer: "Because those circles become internal faces and are not part of the outer surface." Contrast: "Volume measures 3D space occupied — the cylinder occupies its space, the hemisphere occupies its space, they don't share space. Surface area measures 2D skin — the joining circles become internal and disappear from the skin." Have the student redo 3 problems writing "Volumes ADD, Areas SUBTRACT" at the top of each solution.

## PREREQUISITE_NODE_IDS
c9_math_ch6_8, c9_math_ch6_11, c8_math_ch11_7, c6_math_ch08_091, c6_math_ch08_093, c10_math_cbse_12_001

## PREREQUISITE_REASONS
c9_math_ch6_8: Provides the circle area formula πr² which is the base area for cylinder and cone volume formulas.
c9_math_ch6_11: Teaches decomposition of composite 2D figures into basic shapes — the exact same strategy extended to 3D solids.
c8_math_ch11_7: Develops spatial visualisation of 3D solids through nets, essential for mentally decomposing combined solids.
c6_math_ch08_091: Introduces the concept of volume as space occupied, measured in cubic units — the foundational definition.
c6_math_ch08_093: Gives the volume formulas for cylinders (πr²h) which are components in almost every combination problem.
c10_math_cbse_12_001: Covers the parallel method for surface area of combinations; understanding the similarity/difference in approach prevents the subtraction misconception.

## FORWARD_NODE_IDS
c10_math_cbse_12_004, c10_math_cbse_12_005, c10_math_cbse_12_009, c10_math_cbse_12_010

## FORWARD_REASONS
c10_math_cbse_12_004: Applies this method to specific standard combinations (cone on cylinder, hemisphere on cylinder, etc.) with worked examples.
c10_math_cbse_12_005: Extends the method to conversion problems where volume is conserved (melting/recasting) requiring the same decomposition skill.
c10_math_cbse_12_009: Uses volume of combinations in word problems about melting and recasting solids from one shape to another.
c10_math_cbse_12_010: Combines both surface area and volume methods in complex word problems requiring both calculations.

## CROSS_SUBJECT_PREREQS
c8_math_ch1_10, c8_math_ch2_3, c9_math_ch3_6

## CROSS_SUBJECT_REASONS
c8_math_ch1_10: Cube numbers (n³) directly relate to volume of cubes (side³) — understanding cubic growth is essential for volume scaling.
c8_math_ch2_3: Exponential notation (base and exponent) is used in volume formulas (r², r³, h¹) — students must handle powers correctly.
c9_math_ch3_6: Operations on real numbers (including irrational π) — volume calculations involve multiplying π with rational dimensions, requiring closure property understanding.
## CHAIN_DESCRIPTION
c9_math_ch6_11 -> c10_math_cbse_12_003 -> c10_math_cbse_12_004

## THIS_FORMULA
V_total = V₁ + V₂ + V₃ + ... where Vᵢ = volume of i-th basic solid component

## FORMULA_VARIABLES
V_total = total volume of combined solid (cm³ or m³); V₁, V₂, V₃ = volumes of individual component solids (same units); each Vᵢ uses its own formula: cube = a³, cuboid = l×b×h, cylinder = πr²h, cone = (1/3)πr²h, sphere = (4/3)πr³, hemisphere = (2/3)πr³

## FORMULA_UNITS
Cubic units: cm³, m³, mm³, litre (1 L = 1000 cm³), cubic metre

## COMPUTATION_TYPE
geometric

## CROSS_SUBJECT
N/A
## PREREQ_CONCEPT
Volume formulas for basic solids (cylinder, cone, sphere, hemisphere, cube, cuboid) and the principle of additivity of volumes for non-overlapping 3D regions.

## PREREQ_BEFORE
Student must be able to write and use the six basic volume formulas from memory, identify radius/height/dimensions from a diagram, and substitute into formulas with correct order of operations.

## PREREQ_STUCK
If stuck, revisit Class 9 mensuration (c9_math_ch6_8, c9_math_ch6_9) for cylinder/cone/sphere volume derivations and Class 6 volume introduction (c6_math_ch08_091, c6_math_ch08_093) for the meaning of cubic units.

## WORKED_EXAMPLE_1
PROBLEM: A solid toy is in the shape of a right circular cylinder with a hemisphere on one end and a cone on the other end. The radius of the common base is 3.5 cm. The heights of the cylindrical and conical parts are 10 cm and 6 cm respectively. Find the volume of the toy. (Use π = 22/7)

STEPS:
- Step 1: Identify the three component solids and their dimensions. The toy = Hemisphere (radius r = 3.5 cm) + Cylinder (radius r = 3.5 cm, height h_cyl = 10 cm) + Cone (radius r = 3.5 cm, height h_cone = 6 cm). All share the same radius because they are joined base-to-base.
- Step 2: Write the volume formula for each component. V_hemi = (2/3)πr³, V_cyl = πr²h_cyl, V_cone = (1/3)πr²h_cone.
- Step 3: Substitute r = 3.5 cm, h_cyl = 10 cm, h_cone = 6 cm, and π = 22/7 into each formula. 
  V_hemi = (2/3) × (22/7) × (3.5)³
  V_cyl = (22/7) × (3.5)² × 10
  V_cone = (1/3) × (22/7) × (3.5)² × 6
- Step 4: Compute each volume step by step. 
  (3.5)² = 12.25; (3.5)³ = 42.875.
  V_hemi = (2/3) × (22/7) × 42.875 = (2/3) × 22 × 6.125 = 89.833... cm³
  V_cyl = (22/7) × 12.25 × 10 = 22 × 1.75 × 10 = 385 cm³
  V_cone = (1/3) × (22/7) × 12.25 × 6 = (1/3) × 22 × 1.75 × 6 = 77 cm³
- Step 5: Add the three volumes. V_total = 89.833... + 385 + 77 = 551.833... cm³
- Step 6: Express answer appropriately. Using π = 22/7 exactly: V_total = (2/3)(22/7)(343/8) + (22/7)(49/4)(10) + (1/3)(22/7)(49/4)(6) = 551.83 cm³ (approx) or exactly 551 5/6 cm³.

REASONING: The toy is physically made by joining three solids along their circular faces. Since the solids only touch at their faces (2D surfaces), their 3D volumes do not overlap — each cubic centimetre of the toy belongs to exactly one component. Therefore, the total volume is the sum of the individual volumes. This is the fundamental principle of volume additivity for combined solids.

ANSWER: 551.83 cm³ (or 551 5/6 cm³ exactly)

## WORKED_EXAMPLE_2
PROBLEM: A cylindrical water tank of radius 1.4 m and height 3 m has a hemispherical dome on top. The tank is made of 2 cm thick steel plate. Find the volume of steel used to make the tank (including the dome), assuming the tank is open at the bottom. (Use π = 22/7)

STEPS:
- Step 1: Understand the structure. The tank has outer dimensions: cylinder radius R = 1.4 m = 140 cm, height H = 3 m = 300 cm. Hemisphere radius = 140 cm. Steel thickness = 2 cm. The tank is open at bottom, so no base plate.
- Step 2: Find inner dimensions. Inner cylinder radius r = R − 2 = 138 cm. Inner cylinder height h = H − 2 = 298 cm (since bottom is open, only top thickness reduces height). Inner hemisphere radius = 138 cm.
- Step 3: Volume of steel = (Outer cylinder volume + Outer hemisphere volume) − (Inner cylinder volume + Inner hemisphere volume). This is a "hollow combination" problem — subtract inner hollow volume from outer solid volume.
- Step 4: Compute outer volumes. 
  V_outer_cyl = πR²H = (22/7) × 140² × 300 = (22/7) × 19600 × 300 = 22 × 2800 × 300 = 18,480,000 cm³
  V_outer_hemi = (2/3)πR³ = (2/3) × (22/7) × 140³ = (2/3) × (22/7) × 2,744,000 = 5,749,333.33 cm³
- Step 5: Compute inner volumes.
  V_inner_cyl = πr²h = (22/7) × 138² × 298 = (22/7) × 19044 × 298 = 17,758,765.71 cm³
  V_inner_hemi = (2/3)πr³ = (2/3) × (22/7) × 138³ = (2/3) × (22/7) × 2,628,072 = 5,500,032 cm³
- Step 6: Subtract and add. 
  Steel volume = (18,480,000 + 5,749,333.33) − (17,758,765.71 + 5,500,032) = 24,229,333.33 − 23,258,797.71 = 970,535.62 cm³ ≈ 0.971 m³

REASONING: For hollow objects, the material volume is the difference between outer and inner volumes. The outer shape is a combination (cylinder + hemisphere), and the inner hollow space is also a combination (smaller cylinder + smaller hemisphere). We apply the combination volume method twice — once for outer, once for inner — then subtract. The bottom is open, so the inner cylinder height is reduced by only one thickness (top), not two.

ANSWER: 970,536 cm³ (approx) or 0.971 m³

## WORKED_EXAMPLE_3
PROBLEM: A solid wooden article is made by scooping out a hemisphere from each end of a solid cylinder. The cylinder has height 10 cm and base radius 3.5 cm. The hemispheres have the same radius as the cylinder. Find the volume of wood left in the article. (Use π = 22/7)

STEPS:
- Step 1: Visualise the solid. Start with a solid cylinder (radius 3.5 cm, height 10 cm). Two hemispheres of radius 3.5 cm are scooped out from the two circular faces, leaving a cylinder with hemispherical cavities at both ends.
- Step 2: The wood volume = Volume of original cylinder − Volume of two hemispheres scooped out. This is a subtraction case: material removed.
- Step 3: Volume of cylinder = πr²h = (22/7) × (3.5)² × 10 = (22/7) × 12.25 × 10 = 385 cm³.
- Step 4: Volume of one hemisphere = (2/3)πr³ = (2/3) × (22/7) × (3.5)³ = (2/3) × (22/7) × 42.875 = 89.833... cm³.
- Step 5: Volume of two hemispheres = 2 × 89.833... = 179.666... cm³.
- Step 6: Volume of wood left = 385 − 179.666... = 205.333... cm³ = 205 1/3 cm³.

REASONING: This problem combines two concepts: volume of combination (cylinder + hemispheres) and volume by subtraction (scooping out). The key is recognising that "scooping out" means the hemispheres are cavities — their volume must be subtracted from the original solid cylinder. The two hemispheres together form a full sphere of volume (4/3)πr³, so alternatively: Wood volume = πr²h − (4/3)πr³ = 385 − 179.67 = 205.33 cm³. This checks out.

ANSWER: 205.33 cm³ (or 205 1/3 cm³ exactly)

## COMPETENCY_QUESTION_1
QUESTION: A decorative pillar for a school function is made by stacking three solids: a cube of side 20 cm at the bottom, a cylinder of radius 7 cm and height 30 cm in the middle, and a cone of radius 7 cm and height 24 cm on top. The pillar is to be painted. The art teacher says, "To find the amount of paint needed, calculate the total volume of the pillar." Is the teacher correct? Justify your answer with the correct approach.

COMPETENCY: Translating real-world situations to mathematical expressions and identifying appropriate measures (volume vs surface area)

STEPS:
- Step 1: Understand the real-world context. Paint covers the outer surface of an object, not its interior. The amount of paint needed depends on the surface area to be painted, not the volume.
- Step 2: Identify the teacher's error. The teacher confused volume (3D space occupied) with surface area (2D outer covering). Volume would be relevant if we were casting the pillar in metal or filling it with sand.
- Step 3: State the correct approach. To find paint required, calculate the total surface area of the combined solid (excluding the bottom face of the cube which rests on the ground). This requires the surface area combination method: sum of curved surface areas + exposed flat faces.
- Step 4: Explain why volume is irrelevant here. Volume measures capacity or material quantity; surface area measures coating/painting/wrapping requirements. They are different physical quantities with different units (cm³ vs cm²).

ANSWER: The teacher is incorrect. Paint requirement depends on surface area, not volume. The correct measure is the total surface area of the pillar (excluding the base of the cube). Volume would be used to find the amount of material (wood, metal) needed to make the pillar, or its weight if density is known.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A solid metal cylinder of radius 6 cm and height 15 cm is melted and recast into a solid consisting of a cylinder of radius 4 cm surmounted by a cone of the same radius. The height of the conical part is 9 cm. Find the height of the cylindrical part of the new solid. (Use π = 22/7)

COMPETENCY: Applying volume conservation in melting/recasting problems with combined solids

STEPS:
- Step 1: Recognise the principle. When a solid is melted and recast, volume is conserved (no material loss). Volume of original cylinder = Volume of new combined solid.
- Step 2: Calculate original volume. V_original = πR²H = (22/7) × 6² × 15 = (22/7) × 36 × 15 = 1697.14 cm³ (exactly 11880/7 cm³).
- Step 3: Express new solid volume in terms of unknown h (height of new cylinder). New solid = Cylinder (r=4, h) + Cone (r=4, h_cone=9). 
  V_new = πr²h + (1/3)πr²(9) = (22/7) × 16 × h + (1/3) × (22/7) × 16 × 9 = (352/7)h + 1056/7.
- Step 4: Equate volumes and solve for h.
  11880/7 = (352/7)h + 1056/7
  11880 = 352h + 1056
  352h = 10824
  h = 10824/352 = 30.75 cm
- Step 5: Verify. New cylinder volume = (22/7)×16×30.75 = 1545.43 cm³. Cone volume = (1/3)×(22/7)×16×9 = 150.86 cm³. Sum = 1696.29 ≈ 1697.14 cm³ (rounding difference). Correct.

ANSWER: Height of cylindrical part = 30.75 cm (or 123/4 cm exactly)

DIFFICULTY: hard