## ELI5
Hold a wire loop in steady rain: face it upward and it fills, tilt it edge-on and it catches nothing. Electric flux is the field's version of caught rain - a count of how many field lines pierce a surface. It is a scalar, computed as field strength times area times the cosine of the angle between the field and the surface's normal; for curvy surfaces and uneven fields, the little contributions are summed by integration. Outward normals make exits positive, entries negative.

## DEFINITION
Electric flux is a scalar measure of the number of electric field lines penetrating a given surface. For a small planar area element \(\Delta \mathbf{S}\) (magnitude = area, direction = normal to the surface) in a uniform electric field \(\mathbf{E}\), the electric flux is \(\Delta \phi = \mathbf{E} \cdot \Delta \mathbf{S} = E \Delta S \cos\theta\), where \(\theta\) is the angle between \(\mathbf{E}\) and the normal. For a general surface in a non-uniform field, the total flux is the surface integral \(\phi = \int_S \mathbf{E} \cdot d\mathbf{S}\). The SI unit is \(\text{N·m}^2/\text{C}\) (or \(\text{V·m}\)).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can (1) calculate flux through a flat surface in a uniform field given field magnitude, area, and orientation; (2) explain why flux is maximum when the surface normal is parallel to the field and zero when perpendicular; (3) set up the integral \(\int \mathbf{E} \cdot d\mathbf{S}\) for a curved surface in a non-uniform field; and (4) apply the outward-normal convention for closed surfaces.

## SCOPE_BOUNDARY
This node covers the definition of electric flux for an area element (\(\Delta\phi = \mathbf{E}\cdot\Delta\mathbf{S}\)) and the total flux through open/closed surfaces (\(\phi = \int \mathbf{E}\cdot d\mathbf{S}\)). It includes the vector nature of area, the sign convention for closed surfaces (outward normal), and units. It does NOT cover Gauss's law (node c12_phy_cbse_01_008) or its applications to symmetric charge distributions.

## WALKTHROUGH
Imagine holding a wire loop in a steady rain — the amount of rain passing through the loop depends on how you tilt it. Maximum water enters when the loop faces the rain directly; N/A enters when it is edge-on. Electric field lines behave similarly: flux counts how many lines cross a surface. We first represent a small patch of area as a vector \(\Delta\mathbf{S}\) (magnitude = area, direction = normal). The flux through that patch is the dot product \(\mathbf{E}\cdot\Delta\mathbf{S}\). For a whole surface we sum (integrate) these contributions. For closed surfaces we adopt the convention that the normal points outward, making flux positive when field lines exit and negative when they enter.

Takeaway first: flux is field-times-area-times-alignment - maximum when the surface faces the field squarely, zero when edge-on - and the surface integral generalises it to any shape or field. Exam moves: computation questions on flat surfaces in uniform fields, orientation questions on maxima and zeros, integral questions for curved surfaces, and convention questions on outward normals. Method: rerun the rain loop - tilt as the cosine's story, the area vector as the bookkeeping device, the closed-surface convention as the sign rule. Check yourself: flux is a scalar; the area vector in the formula does not make the answer a vector, any more than a barometer's needle makes pressure point somewhere. Drill: compute flux for three tilt angles and state which orientation maximises it.

## DIAGNOSTIC_QUESTION_1
What is the SI unit of electric flux? Write the formula for the electric flux through a small planar area element \(\Delta\mathbf{S}\) placed in a uniform electric field \(\mathbf{E}\).

## DIAGNOSTIC_ANSWER_1
The SI unit of electric flux is \(\text{N·m}^2/\text{C}\) (equivalently \(\text{V·m}\)). The formula is \(\Delta\phi = \mathbf{E}\cdot\Delta\mathbf{S} = E\,\Delta S\cos\theta\), where \(\theta\) is the angle between the electric field vector and the area vector (normal to the surface). A wrong unit (e.g., \(\text{N/C}\)) shows confusion between electric field and flux. Omitting \(\cos\theta\) or using the angle with the plane instead of the normal reveals a misunderstanding of the dot product.

## DIAGNOSTIC_QUESTION_2
A uniform electric field \(\mathbf{E} = 500\,\text{N/C}\) points along the \(+x\)-axis. A square sheet of side \(10\,\text{cm}\) lies in the \(yz\)-plane. What is the electric flux through this sheet? Explain why the flux has its maximum possible magnitude for this orientation.

## DIAGNOSTIC_ANSWER_2
The area vector of the \(yz\)-plane sheet is along \(\pm x\). Taking the normal along \(+x\), \(\theta = 0^\circ\) and \(\phi = EA = 500 \times (0.1)^2 = 5\,\text{N·m}^2/\text{C}\). If the normal is chosen along \(-x\), \(\theta = 180^\circ\) and \(\phi = -5\,\text{N·m}^2/\text{C}\). The magnitude is maximum because the area vector is parallel/anti-parallel to \(\mathbf{E}\), making \(|\cos\theta|=1\). A student answering zero mistakenly thinks the field lines lie in the plane of the sheet (they actually pierce it perpendicularly).

## DIAGNOSTIC_QUESTION_3
A rectangular surface of dimensions \(20\,\text{cm} \times 30\,\text{cm}\) is placed in a uniform electric field of magnitude \(2.0 \times 10^3\,\text{N/C}\). The field lines make an angle of \(60^\circ\) with the normal to the surface. Calculate the electric flux through the surface.

## DIAGNOSTIC_ANSWER_3
Area \(A = 0.20 \times 0.30 = 0.060\,\text{m}^2\). \(\phi = EA\cos\theta = (2.0\times10^3) \times 0.060 \times \cos60^\circ = 120 \times 0.5 = 60\,\text{N·m}^2/\text{C}\). Common errors: forgetting to convert cm to m (giving \(6000\)), using \(\sin60^\circ\) instead of \(\cos60^\circ\), or using the angle between the field and the plane (\(30^\circ\)) instead of the normal.

## DIAGNOSTIC_QUESTION_4
A closed cylindrical surface is placed in a uniform electric field directed along its axis. The flux through the curved surface is zero. Explain why, and determine the net flux through the entire closed surface.

## DIAGNOSTIC_ANSWER_4
On the curved surface, the area vector is radial (perpendicular to the axis), while \(\mathbf{E}\) is axial. Hence \(\mathbf{E}\cdot d\mathbf{S} = 0\) everywhere → flux = 0. The two end caps have equal area \(A\); one has outward normal parallel to \(\mathbf{E}\) (\(\phi = +EA\)), the other anti-parallel (\(\phi = -EA\)). Net flux = \(0 + EA - EA = 0\). A non-zero net flux answer indicates confusion about the sign convention for closed surfaces or the fact that a uniform field through a charge-free closed surface always gives zero net flux (a preview of Gauss's law).

## DIAGNOSTIC_QUESTION_5
A student claims: "Electric flux is a vector quantity because it depends on the direction of the area vector." Evaluate this statement and correct it if necessary.

## DIAGNOSTIC_ANSWER_5
The claim is false. Electric flux is a **scalar** — it is the dot product of two vectors (\(\mathbf{E}\) and \(\Delta\mathbf{S}\)), and the dot product yields a scalar. Flux can be positive, negative, or zero, but it has no direction. The student confuses the vector nature of the area element with the scalar nature of the flux. This misconception often leads to errors when adding fluxes from different surface elements (they must be added algebraically, not vectorially).

## DIAGNOSTIC_QUESTION_6
Design a simple classroom demonstration using a uniform electric field (e.g., between two parallel plates connected to a high-voltage supply) and a lightweight planar loop to show that electric flux depends on the orientation of the loop. Describe what you would observe.

## DIAGNOSTIC_ANSWER_6
A good answer: Suspend a conducting loop (or a frame with a sensitive electrometer) between the plates. Rotate the loop and observe that the induced charge (or the deflection of a connected electroscope) is maximum when the loop's plane is perpendicular to the field (normal parallel to \(\mathbf{E}\)) and zero when the loop's plane is parallel to the field (normal perpendicular to \(\mathbf{E}\)). This demonstrates \(\phi \propto \cos\theta\). A poor answer might confuse electric flux with magnetic flux (which induces current when changing) or suggest measuring current in a static field.

## COMMON_MISCONCEPTION
Students frequently treat electric flux as a vector because the definition involves the area vector. They also confuse the angle \(\theta\): many use the angle between the field and the **plane** of the surface instead of the angle between the field and the **normal** to the surface. Another error is assuming flux through a closed surface is always zero (it is zero only when no net charge is enclosed). Finally, some think flux through an open surface depends only on its boundary, not on the shape of the surface — but for non-uniform fields, different surfaces spanning the same boundary can have different fluxes.

## ON_FAILURE
If a student thinks flux is a vector, revisit the dot product (c11_math_cbse_10_007 or c11_phy_cbse_03_007) and emphasize that \(\mathbf{A}\cdot\mathbf{B}\) is a scalar. If they use the wrong angle, draw a diagram showing the area vector perpendicular to the surface and the field vector; ask them to identify the angle between **these two vectors**. Practice calculating flux for a square loop at \(\theta = 0^\circ, 60^\circ, 90^\circ, 180^\circ\) to reinforce \(\cos\theta\) dependence. If they assume closed-surface flux is always zero, remind them of Gauss's law preview: \(\phi_{\text{net}} = q_{\text{enc}}/\varepsilon_0\).

## PREREQUISITE_NODE_IDS
c12_phy_cbse_01_004, c12_phy_cbse_01_006, c11_math_cbse_10_007, c11_phy_cbse_03_007, c12_phy_cbse_01_005

## PREREQUISITE_REASONS
c12_phy_cbse_01_004: Electric field definition and calculation are needed because flux is defined in terms of \(\mathbf{E}\).
c12_phy_cbse_01_006: Electric field lines provide the visual intuition that flux counts lines crossing a surface.
c11_math_cbse_10_007: The scalar (dot) product of vectors is the mathematical operation used to compute flux.
c11_phy_cbse_03_007: Reinforces the dot product in a physics context (work, flux, etc.).
c12_phy_cbse_01_005: Electric flux \( \Phi = \int \vec{E} \cdot d\vec{S} \) uses the point-charge field to derive Gauss's law.  

## FORWARD_NODE_IDS
c12_phy_cbse_01_008, c12_phy_cbse_01_009, c12_phy_cbse_01_010

## FORWARD_REASONS
c12_phy_cbse_01_008: Gauss's law directly relates the total electric flux through a closed surface to the enclosed charge, making flux the central quantity.
c12_phy_cbse_01_009: Electric flux definition and calculation (flux = E·dS) is needed to compute flux through the cylindrical Gaussian surface.  
c12_phy_cbse_01_010: Electric Flux — defines flux as ∫E·dA, the core quantity in Gauss's law; student must know how to compute flux through flat and curved surfaces.  

## CROSS_SUBJECT_PREREQS
c11_math_cbse_10_007, c11_math_cbse_13_001
## CROSS_SUBJECT_REASONS
c11_math_cbse_10_007: The dot product \(\mathbf{E}\cdot\Delta\mathbf{S}\) is exactly the scalar product taught in Class 11 Mathematics.
c11_math_cbse_13_001: The integral \(\phi = \int \mathbf{E}\cdot d\mathbf{S}\) uses the limit-of-a-sum concept that is the foundation of integral calculus.

## CHAIN_DESCRIPTION
c12_phy_cbse_01_004 -> c12_phy_cbse_01_007 -> c12_phy_cbse_01_008

## THIS_FORMULA
\(\Delta\phi = \mathbf{E}\cdot\Delta\mathbf{S} = E\,\Delta S\cos\theta\) (small area element in uniform field); \(\phi = \int_S \mathbf{E}\cdot d\mathbf{S}\) (general surface integral)

## FORMULA_VARIABLES
\(\Delta\phi\) = flux through area element \(\Delta\mathbf{S}\) (N·m²/C); \(\mathbf{E}\) = electric field (N/C); \(\Delta\mathbf{S}\) = area vector (magnitude = area in m², direction = normal); \(\theta\) = angle between \(\mathbf{E}\) and \(\Delta\mathbf{S}\); \(\phi\) = total flux through surface \(S\).

## FORMULA_UNITS
N·m²/C, V·m, N/C, m²

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_10_007 | The dot product E·ΔS is exactly the scalar product of two vectors taught in Class 11 Mathematics.
c11_math_cbse_13_001 | The integral φ = ∫ E·dS uses the limit of a sum, which is the foundation of integral calculus introduced in Class 11 Mathematics.
## PREREQ_CONCEPT
Understanding of electric field as a vector field and the dot product of vectors.

## PREREQ_BEFORE
Student must be able to compute the dot product of two vectors given magnitudes and the angle between them, and understand that area can be represented as a vector perpendicular to the surface.

## PREREQ_STUCK
If stuck, revisit the scalar product of vectors (c11_math_cbse_10_007) and the concept of electric field (c12_phy_cbse_01_004).

## WORKED_EXAMPLE_1
PROBLEM: A uniform electric field \(\mathbf{E} = 400\,\text{N/C}\) is directed at \(30^\circ\) to the horizontal. A rectangular sheet of dimensions \(20\,\text{cm} \times 30\,\text{cm}\) is held vertically so that its normal is horizontal. The angle between \(\mathbf{E}\) and the normal is \(30^\circ\). Calculate the electric flux through the sheet.

STEPS:
- Step 1: Identify given quantities: \(E = 400\,\text{N/C}\), area \(A = 0.20 \times 0.30 = 0.060\,\text{m}^2\), \(\theta = 30^\circ\).
- Step 2: Formula: \(\phi = EA\cos\theta\).
- Step 3: Substitute: \(\phi = 400 \times 0.060 \times \cos30^\circ\).
- Step 4: Compute: \(\cos30^\circ = \sqrt{3}/2 \approx 0.866\); \(\phi = 24 \times 0.866 = 20.784\).
- Step 5: Verify: Maximum possible flux is \(EA = 24\); at \(30^\circ\) we expect a positive value less than 24. Result is reasonable.

REASONING: The sheet is vertical, so its area vector is horizontal. The field makes \(30^\circ\) with the horizontal, so the angle between \(\mathbf{E}\) and \(\mathbf{A}\) is \(30^\circ\). The dot product selects the component of \(\mathbf{E}\) along the normal.

ANSWER: \(20.8\,\text{N·m}^2/\text{C}\) (or \(20.8\,\text{V·m}\))

## WORKED_EXAMPLE_2
PROBLEM: A point charge \(q = 5\,\mu\text{C}\) is placed at the centre of a spherical surface of radius \(10\,\text{cm}\). Calculate the electric flux through the spherical surface. (Use \(\varepsilon_0 = 8.85 \times 10^{-12}\,\text{C}^2/\text{N·m}^2\))

STEPS:
- Step 1: By symmetry, \(\mathbf{E}\) is radial and has magnitude \(E = \frac{1}{4\pi\varepsilon_0}\frac{q}{r^2}\) on the sphere.
- Step 2: The area vector \(d\mathbf{S}\) is also radial, so \(\mathbf{E}\cdot d\mathbf{S} = E\,dS\).
- Step 3: Total flux \(\phi = \int E\,dS = E \int dS = E \times 4\pi r^2\).
- Step 4: Substitute \(E\): \(\phi = \frac{1}{4\pi\varepsilon_0}\frac{q}{r^2} \times 4\pi r^2 = \frac{q}{\varepsilon_0}\).
- Step 5: Compute: \(q = 5 \times 10^{-6}\,\text{C}\); \(\phi = \frac{5 \times 10^{-6}}{8.85 \times 10^{-12}} = 5.65 \times 10^5\,\text{N·m}^2/\text{C}\).
- Step 6: Note the flux is independent of the sphere's radius — a direct consequence of the inverse-square law.

REASONING: The spherical symmetry makes the integral trivial. The result \(\phi = q/\varepsilon_0\) is a special case of Gauss's law, showing that flux depends only on enclosed charge.

ANSWER: \(5.65 \times 10^5\,\text{N·m}^2/\text{C}\) (or \(\text{V·m}\))

## WORKED_EXAMPLE_3
PROBLEM: A non-uniform electric field is given by \(\mathbf{E} = (3x\,\hat{\mathbf{i}} + 4y\,\hat{\mathbf{j}})\,\text{N/C}\) with \(x,y\) in meters. Calculate the electric flux through a square surface of side \(0.5\,\text{m}\) lying in the \(xy\)-plane with one corner at the origin and sides along the \(x\) and \(y\) axes. The normal is along \(+\hat{\mathbf{k}}\).

STEPS:
- Step 1: The surface is in the \(xy\)-plane, so the area element is \(d\mathbf{S} = dx\,dy\,\hat{\mathbf{k}}\).
- Step 2: The field has no \(z\)-component: \(\mathbf{E} = 3x\,\hat{\mathbf{i}} + 4y\,\hat{\mathbf{j}}\).
- Step 3: Dot product: \(\mathbf{E}\cdot d\mathbf{S} = (3x\,\hat{\mathbf{i}} + 4y\,\hat{\mathbf{j}}) \cdot (dx\,dy\,\hat{\mathbf{k}}) = 0\).
- Step 4: Integrate over the square: \(\phi = \int_0^{0.5}\int_0^{0.5} 0\,dx\,dy = 0\).
- Step 5: Interpret: The field lines lie entirely in the \(xy\)-plane, so N/A cross the surface; flux is zero.

REASONING: Flux measures the component of \(\mathbf{E}\) perpendicular to the surface. Since \(\mathbf{E}\) is parallel to the surface everywhere, the perpendicular component is zero at every point.

ANSWER: \(0\,\text{N·m}^2/\text{C}\)

## COMPETENCY_QUESTION_1
QUESTION: A student places a square loop of side \(10\,\text{cm}\) in a uniform electric field of \(200\,\text{N/C}\). She measures the flux through the loop as \(1.0\,\text{N·m}^2/\text{C}\). What is the angle between the electric field and the normal to the loop? If she rotates the loop so that the flux becomes zero, what is the new orientation of the loop relative to the field?

COMPETENCY: Interpreting physical situations using formulas and predicting outcomes from changing variables.

STEPS:
- Step 1: Use \(\phi = EA\cos\theta\). Given \(\phi = 1.0\), \(E = 200\), \(A = (0.10)^2 = 0.01\,\text{m}^2\).
- Step 2: \(\cos\theta = \phi/(EA) = 1.0 / (200 \times 0.01) = 1.0 / 2 = 0.5 \Rightarrow \theta = 60^\circ\).
- Step 3: For zero flux, \(\cos\theta = 0 \Rightarrow \theta = 90^\circ\). The normal is perpendicular to \(\mathbf{E}\), meaning the plane of the loop is parallel to the field lines.

ANSWER: Initial angle = \(60^\circ\). When flux is zero, the loop's plane is parallel to the electric field (normal perpendicular to field).

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A closed cylindrical surface of radius \(R\) and height \(h\) is placed in a uniform electric field \(\mathbf{E}\) directed along its axis. The cylinder encloses no charge. (a) Calculate the flux through each end cap and the curved surface. (b) Verify that the net flux is zero. (c) If a point charge \(q\) is now placed at the centre of the cylinder, what is the new net flux? Does the flux through the curved surface change?

COMPETENCY: Applying Gauss's law conceptually and analyzing flux distribution in symmetric situations.

STEPS:
- Step 1: For uniform \(\mathbf{E}\) along axis, curved surface: \(\mathbf{E}\) is perpendicular to \(d\mathbf{S}\) (radial) → flux = 0.
- Step 2: End caps: area = \(\pi R^2\). One cap has outward normal parallel to \(\mathbf{E}\) → flux = \(+E\pi R^2\). The other has outward normal anti-parallel → flux = \(-E\pi R^2\).
- Step 3: Net flux = \(0 + E\pi R^2 - E\pi R^2 = 0\). Verified.
- Step 4: With point charge \(q\) at centre, Gauss's law gives net flux = \(q/\varepsilon_0\).
- Step 5: The field is no longer uniform and axial; the point charge produces radial field lines. These lines cross the curved surface, so its flux becomes non-zero. The end caps also have changed flux. The sum over all surfaces equals \(q/\varepsilon_0\).

ANSWER: (a) End caps: \(+E\pi R^2\) and \(-E\pi R^2\); curved surface: 0. (b) Net flux = 0. (c) Net flux = \(q/\varepsilon_0\). The flux through the curved surface becomes non-zero.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Electric flux is a scalar measure of the number of electric field lines ______ a given surface.

## DIAGNOSTIC_ANSWER_7
penetrating

Penetrating is the counting verb: flux totals the field lines that actually pass through the surface, tilt-weighted. **A wrong answer (surrounding) reveals the student has counted lines near the surface when only those crossing it contribute.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine holding a wire loop in a steady rain — the amount of rain passing through the loop ______ on how you tilt it.

## DIAGNOSTIC_ANSWER_8
depends

The depending verb is the tilt's salary: the same loop and the same rain yield different catches purely by orientation. **A wrong answer (a fixed rate) reveals the student has averaged away the angle whose cosine is the whole calculation.** The depending verb is the tilt's wage: same loop, same rain, different catch - and cosine is the pay scale. The depending verb is the tilt's wage: same loop, same rain, different catch - and the cosine of the tilt is the entire pay scale.

## DIAGNOSTIC_QUESTION_9
What is Electric flux? State the definition given in this lesson.

## DIAGNOSTIC_ANSWER_9
Electric flux is a scalar measure of the number of electric field lines penetrating a given surface.

The definition is deliberately plain: a scalar count of penetrating lines - every formula in the node is that sentence symbolised. **A wrong answer that introduces direction reveals the student has answered with the area vector's property instead of the flux's.**

## DIAGNOSTIC_QUESTION_10
What common mix-up does this lesson flag about Electric flux?

## DIAGNOSTIC_ANSWER_10
Students frequently treat electric flux as a vector because the definition involves the area vector. The flagged error promotes flux to a vector: the area carries the direction in the formula precisely so that the flux itself need not. The definition's own phrase is the rebuke: flux is declared a scalar measure, and the area vector is merely the bookkeeping device that lets one dot product stand for geometry. Calling the flux a vector because its formula borrows a direction is like calling the area of a tilted window a direction because its formula needs one - the direction belongs to the surface, the count that survives is plain magnitude.

## DIAGNOSTIC_QUESTION_11
Fill in the blank: ______ holding a wire loop in a steady rain — the amount of rain passing through the loop depends on how you tilt it.

## DIAGNOSTIC_ANSWER_11
Imagine

The imperative sets the rain scene: the loop is imagined before any dot product, because the analogy carries the sign conventions. **A wrong answer (a formula) reveals the student has answered the quoted opener with the expression it motivates.**
