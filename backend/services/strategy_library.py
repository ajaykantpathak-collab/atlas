from dataclasses import dataclass, field
from typing import List


@dataclass
class Strategy:
    strategy_id: str
    name: str
    subject: str
    topic: str
    trigger_pattern: str
    approach: str
    formulas: List[str] = field(default_factory=list)
    common_pitfalls: List[str] = field(default_factory=list)
    example: str = ""


class StrategyLibrary:
    SUBJECTS = {"physics", "chemistry", "math", "biology"}

    def __init__(self):
        self._strategies: dict[str, Strategy] = {}
        self._topic_index: dict[str, List[str]] = {}
        self._concept_index: dict[str, List[str]] = {}
        self._load_defaults()

    def _register(self, s: Strategy):
        self._strategies[s.strategy_id] = s
        self._topic_index.setdefault(s.topic.lower(), []).append(s.strategy_id)
        for word in s.trigger_pattern.split():
            self._concept_index.setdefault(word.lower(), []).append(s.strategy_id)

    def _load_defaults(self):
        # ── PHYSICS (15) ──
        self._register(Strategy(
            "PHY01", "Free Body Diagram", "physics", "mechanics",
            "force free body diagram equilibrium multiple forces",
            "1. Isolate the body. 2. Identify all forces with correct direction. "
            "3. Resolve into x/y components. 4. Apply ΣFx=0, ΣFy=0 for equilibrium.",
            formulas=["ΣFx = 0", "ΣFy = 0"],
            common_pitfalls=["Missing tension in strings or normal force on inclines."],
            example="Block on incline with friction: draw N, mg, f along axes."))

        self._register(Strategy(
            "PHY02", "Energy Conservation", "physics", "work energy power",
            "energy conservation kinetic potential work non-conservative",
            "1. Check if only conservative forces act. 2. Apply KE_i + PE_i = KE_f + PE_f. "
            "3. Include work done by non-conservative forces on LHS.",
            formulas=["KE + PE + W_nc = constant"],
            common_pitfalls=["Forgetting work done by friction; mixing up signs."],
            example="Block sliding down rough incline: mgh - μmgcosθ·d = ½mv²."))

        self._register(Strategy(
            "PHY03", "Momentum Conservation", "physics", "mechanics",
            "collision momentum conservation elastic inelastic",
            "1. Confirm no external impulse during collision. 2. Apply p_initial = p_final. "
            "3. For elastic: add e=1 or KE_initial=KE_final.",
            formulas=["m₁v₁ + m₂v₂ = m₁v₁' + m₂v₂'",
                      "e = (v₂'-v₁')/(v₁-v₂)"],
            common_pitfalls=["Applying KE conservation to inelastic collisions."],
            example="Ballistic pendulum: momentum gives combined velocity, then energy."))

        self._register(Strategy(
            "PHY04", "Projectile Decomposition", "physics", "mechanics",
            "projectile horizontal vertical range maximum height time",
            "1. Decompose v₀ into v₀x and v₀y. 2. Apply constant-accel eqns to each axis. "
            "3. Eliminate time to get trajectory equation.",
            formulas=["R = v₀²sin(2θ)/g", "H = v₀²sin²θ/(2g)"],
            common_pitfalls=["Using g=+9.8 when direction is upward."],
            example="Max range at θ=45°; two angles give same range."))

        self._register(Strategy(
            "PHY05", "Rotational Dynamics", "physics", "rotational mechanics",
            "torque angular momentum rotation moment inertia angular acceleration",
            "1. Convert linear to rotational analogs (m→I, F→τ, a→α). "
            "2. Apply τ = Iα and L = Iω. 3. Use conservation of angular momentum.",
            formulas=["τ = Iα", "L = Iω"],
            common_pitfalls=["Forgetting parallel-axis theorem for off-center axis."],
            example="Disc rolling without slipping: v = ωR at contact point."))

        self._register(Strategy(
            "PHY06", "Gauss Law", "physics", "electrostatics",
            "Gauss electric flux enclosed charge symmetry",
            "1. Choose Gaussian surface exploiting symmetry. 2. Compute Φ = E·A. "
            "3. Relate to Q_enclosed/ε₀. 4. Solve for E.",
            formulas=["Φ = Q_enc / ε₀", "E·4πr² = Q/ε₀ (sphere)"],
            common_pitfalls=["Using Gauss for asymmetric charge distributions."],
            example="Infinite sheet: E = σ/(2ε₀)."))

        self._register(Strategy(
            "PHY07", "Kirchhoff Laws", "physics", "current electricity",
            "Kirchhoff loop junction current voltage circuit mesh",
            "1. Label currents at each junction. 2. Apply KCL: ΣI_in = ΣI_out. "
            "3. Apply KVL: ΣΔV = 0 around each independent loop. 4. Solve simultaneous equations.",
            formulas=["ΣI_in = ΣI_out (KCL)", "ΣIR + ΣEMF = 0 (KVL)"],
            common_pitfalls=["Wrong sign convention for voltage drops across resistors."],
            example="Wheatstone bridge: use KVL on two loops to find unknown current."))

        self._register(Strategy(
            "PHY08", "Magnetic Force", "physics", "magnetism",
            "magnetic force Lorentz current wire charge velocity field",
            "1. Identify charge velocity or current direction. 2. Use right-hand rule "
            "for direction of F. 3. Plug into magnitude formula.",
            formulas=["F = qvB sinθ", "F = ILB sinθ"],
            common_pitfalls=["Using sin90 for arbitrary angles; wrong RHR direction."],
            example="Charged particle in uniform B: circular motion with radius mv/(qB)."))

        self._register(Strategy(
            "PHY09", "Lens Formula", "physics", "optics",
            "lens mirror magnification focal length image distance object",
            "1. Write 1/f = 1/v + 1/u with sign convention. 2. Solve for v. "
            "3. Compute m = v/u. 4. Classify image (real/virtual, inverted/upright).",
            formulas=["1/f = 1/v + 1/u", "m = v/u"],
            common_pitfalls=["Sign convention errors (real=-, virtual=+ for lenses)."],
            example="Convex lens f=10cm, u=-20cm → v=20cm, m=-1 (inverted, same size)."))

        self._register(Strategy(
            "PHY10", "Doppler Effect", "physics", "waves",
            "Doppler frequency shift source observer moving wavelength sound",
            "1. Identify source vs observer motion. 2. Assign + for moving toward. "
            "3. Apply formula; f' > f if approaching, f' < f if receding.",
            formulas=["f' = f(v±v_o)/(v±v_s)"],
            common_pitfalls=["Swapping source/observer sign conventions."],
            example="Ambulance siren: heard higher pitch as it approaches, lower as it recedes."))

        self._register(Strategy(
            "PHY11", "Thermodynamics Process", "physics", "thermodynamics",
            "adiabatic isothermal isobaric isochoric heat work internal energy",
            "1. Identify process type. 2. Apply appropriate PV relation. "
            "3. Use ΔU = nCvΔT and Q = ΔU + W (first law).",
            formulas=["PV^γ = constant (adiabatic)", "ΔU = nCvΔT"],
            common_pitfalls=["Using wrong Cp/Cv; ignoring sign of W (expansion positive)."],
            example="Adiabatic compression: work done on gas increases internal energy."))

        self._register(Strategy(
            "PHY12", "Simple Harmonic Motion", "physics", "oscillations",
            "SHM simple harmonic oscillation time period spring pendulum amplitude",
            "1. Confirm F ∝ -x condition. 2. Find ω = √(k/m) or ω = √(g/l). "
            "3. Write x = A cos(ωt+φ). 4. Compute T, v_max, a_max.",
            formulas=["T = 2π√(m/k)", "ω = 2π/T"],
            common_pitfalls=["Using mass of spring without effective mass correction."],
            example="Mass-spring system: T independent of amplitude (isochronous)."))

        self._register(Strategy(
            "PHY13", "Wave Equation", "physics", "waves",
            "wave equation standing wave node antinode frequency string pipe",
            "1. Identify boundary conditions (fixed/free). 2. Set up standing wave condition. "
            "3. Solve for allowed frequencies (harmonics).",
            formulas=["v = fλ", "f_n = nv/(2L) (string fixed both ends)"],
            common_pitfalls=["Confusing open-closed pipe harmonics (only odd n)."],
            example="Guitar string L=0.6m, v=300 m/s → fundamental f=250 Hz."))

        self._register(Strategy(
            "PHY14", "Photoelectric Effect", "physics", "modern physics",
            "photoelectric threshold frequency work function kinetic energy photon",
            "1. Use Einstein's equation: hf = φ + K_max. 2. Below threshold: no emission. "
            "3. K_max independent of intensity; depends only on frequency.",
            formulas=["K_max = hf - φ"],
            common_pitfalls=["Thinking intensity changes K_max; forgetting threshold frequency."],
            example="φ=2.3 eV, f>5.5×10¹⁴ Hz required; doubling intensity only doubles photoelectrons."))

        self._register(Strategy(
            "PHY15", "Nuclear Reactions", "physics", "nuclear physics",
            "nuclear decay alpha beta gamma half-life disintegration radioactive",
            "1. Write nuclear equation: conserve Z and A. 2. Identify decay type. "
            "3. Apply N = N₀e^(-λt) and A = A₀e^(-λt). 4. Use T½ = ln2/λ.",
            formulas=["N = N₀e^(-λt)", "T½ = ln(2)/λ"],
            common_pitfalls=["Mass defect vs activity confusion; natural log vs log₁₀."],
            example="Carbon dating: T½=5730 yr, measure remaining C-14 to find age."))

        # ── CHEMISTRY (10) ──
        self._register(Strategy(
            "CHM01", "Electrophile Nucleophile", "chemistry", "organic chemistry",
            "electrophile nucleophile attack substitution addition electron rich electron deficient",
            "1. Identify electron-rich site (nucleophile) and electron-poor site (electrophile). "
            "2. Nucleophile donates lone pair; electrophile accepts it. "
            "3. Arrow always from nucleophile to electrophile.",
            formulas=[],
            common_pitfalls=["Arrow direction reversed; confusing nucleophile with base."],
            example="OH⁻ attacks CH₃-Br: OH⁻ is nucleophile, CH₃ is electrophilic carbon."))

        self._register(Strategy(
            "CHM02", "Reaction Mechanism", "chemistry", "organic chemistry",
            "mechanism intermediate carbocation rearrangement Markovnikov SN1 SN2 E1 E2",
            "1. Identify rate-determining step. 2. Draw all intermediates and "
            "transition states. 3. Apply Markovnikov, Zaitsev, or SN1/SN2 rules as applicable.",
            formulas=[],
            common_pitfalls=["Ignoring carbocation rearrangements; wrong regioselectivity."],
            example="HBr + propene: H adds to C1 (Markovnikov), Br to C2."))

        self._register(Strategy(
            "CHM03", "Mole Concept", "chemistry", "physical chemistry",
            "mole Avogadro number mass volume molar mass STP atoms molecules",
            "1. Convert given mass to moles: n = given mass / molar mass. "
            "2. Use Avogadro's number for atoms/molecules. 3. At STP: 1 mol gas = 22.4 L.",
            formulas=["n = mass / M", "N = n × N_A = n × 6.022×10²³",
                      "V_m = 22.4 L (STP)"],
            common_pitfalls=["Using 22.4 L at non-STP conditions; wrong molar mass."],
            example="5g CH₄: n=5/16=0.3125 mol → molecules=0.3125×6.022×10²³."))

        self._register(Strategy(
            "CHM04", "Chemical Equilibrium", "chemistry", "physical chemistry",
            "equilibrium constant Kc Kp reaction quotient ICE concentration partial pressure",
            "1. Write balanced equation. 2. Set up ICE table. 3. Write Kc or Kp expression. "
            "4. Solve for unknown using stoichiometry.",
            formulas=["Kc = [C]^c[D]^d / [A]^a[B]^b",
                      "Kp = Kc(RT)^Δn"],
            common_pitfalls=["Including solids/liquids in K expression; wrong Δn."],
            example="N₂ + 3H₂ ⇌ 2NH₃: Kc=[NH₃]²/([N₂][H₂]³)."))

        self._register(Strategy(
            "CHM05", "Nernst Equation", "chemistry", "electrochemistry",
            "Nernst cell potential concentration electrode EMF galvanic",
            "1. Determine n (electrons transferred). 2. Write reaction quotient Q. "
            "3. Plug into Nernst equation. 4. Use log₁₀, not ln.",
            formulas=["E = E° - (0.0591/n) log Q (25°C)"],
            common_pitfalls=["Using natural log; wrong sign for concentration cells."],
            example="Daniell cell: E = 1.10 - (0.0591/2)log([Zn²⁺]/[Cu²⁺])."))

        self._register(Strategy(
            "CHM06", "Hybridization", "chemistry", "organic chemistry",
            "hybridization sp sp2 sp3 steric number geometry bond angle",
            "1. Count steric number = σ bonds + lone pairs on central atom. "
            "2. SN=2→sp, SN=3→sp², SN=4→sp³, SN=5→sp³d, SN=6→sp³d². "
            "3. Predict geometry and bond angles.",
            formulas=["SN = σ bonds + lone pairs"],
            common_pitfalls=["Ignoring lone pairs in steric number; wrong geometry for SN=5/6."],
            example="NH₃: SN=4 (3 bonds + 1 lone pair) → sp³, trigonal pyramidal."))

        self._register(Strategy(
            "CHM07", "Isomerism", "chemistry", "organic chemistry",
            "isomer structural stereoisomer enantiomer diastereomer optical geometrical",
            "1. Identify molecular formula. 2. Check for structural isomers (chain, position, functional). "
            "3. For stereoisomers: check chiral centers and double-bond geometry.",
            formulas=["Chiral centers = 2^n possible stereoisomers (max)"],
            common_pitfalls=["Missing meso forms; overlooking internal plane of symmetry."],
            example="2-chlorobutane: 1 chiral C → 2 enantiomers."))

        self._register(Strategy(
            "CHM08", "Thermodynamic Spontaneity", "chemistry", "thermodynamics",
            "Gibbs free energy spontaneity entropy enthalpy temperature",
            "1. Calculate ΔG = ΔH - TΔS. 2. ΔG < 0 → spontaneous; ΔG > 0 → non-spontaneous. "
            "3. At ΔG=0, system is at equilibrium.",
            formulas=["ΔG = ΔH - TΔS"],
            common_pitfalls=["Forgetting T is in Kelvin; ignoring temperature dependence."],
            example="ΔH<0, ΔS>0 → spontaneous at all T."))

        self._register(Strategy(
            "CHM09", "Rate Law", "chemistry", "chemical kinetics",
            "rate law order rate constant half-life integrated rate first order second order",
            "1. Identify reaction order from data or stoichiometry (elementary only). "
            "2. Write rate = k[A]^n. 3. Use integrated rate law to find [A] vs t.",
            formulas=["t½ = ln2/k (1st order)", "t½ = 1/(k[A]₀) (2nd order)"],
            common_pitfalls=["Using stoichiometric coefficients as orders for complex reactions."],
            example="1st order: ln[A] = ln[A]₀ - kt → straight line plot."))

        self._register(Strategy(
            "CHM10", "Buffer Solution", "chemistry", "physical chemistry",
            "buffer pH Henderson Hasselbalch weak acid weak base conjugate salt",
            "1. Identify weak acid/conjugate base (or weak base/conjugate acid). "
            "2. Apply Henderson-Hasselbalch. 3. Use Kb for basic buffers.",
            formulas=["pH = pKa + log([A⁻]/[HA])",
                      "pOH = pKb + log([BH⁺]/[B])"],
            common_pitfalls=["Using concentrations instead of ratio; pH=pKa only when [A⁻]=[HA]."],
            example="Acetate buffer: pH=4.76 + log([Ac⁻]/[HAc])."))

        # ── MATH (10) ──
        self._register(Strategy(
            "MAT01", "L'Hôpital's Rule", "math", "limits",
            "limit indeterminate 0/0 infinity/infinity L Hopital derivative",
            "1. Confirm 0/0 or ∞/∞ form. 2. Differentiate numerator and denominator separately. "
            "3. Re-evaluate limit. Repeat if still indeterminate.",
            formulas=["lim f/g = lim f'/g' (0/0 or ∞/∞)"],
            common_pitfalls=["Applying when form is not indeterminate; wrong derivative."],
            example="lim x→0 sinx/x: (cosx)/1 → 1."))

        self._register(Strategy(
            "MAT02", "Integration by Parts", "math", "calculus",
            "integration by parts ILATE product polynomial exponential logarithmic",
            "1. Choose u using ILATE priority. 2. Set dv = remaining part. "
            "3. Apply ∫u dv = uv - ∫v du. 4. Repeat if needed.",
            formulas=["∫u dv = uv - ∫v du"],
            common_pitfalls=["Wrong u/dv choice; forgetting boundary term uv."],
            example="∫x eˣdx: u=x, dv=eˣdx → xeˣ - eˣ + C."))

        self._register(Strategy(
            "MAT03", "Definite Integral Properties", "math", "calculus",
            "definite integral symmetry odd even property area under curve",
            "1. Check for odd/even function over symmetric interval [-a,a]. "
            "2. Use additivity: ∫ₐᵇ + ∫ᵦᶜ = ∫ₐᶜ. 3. Apply reflection properties.",
            formulas=["∫₋ₐᵃ f(x)dx = 0 if f is odd"],
            common_pitfalls=["Ignoring symmetry; wrong limits after substitution."],
            example="∫₋π^π sinx dx = 0 (odd function)."))

        self._register(Strategy(
            "MAT04", "Differential Equations", "math", "differential equations",
            "differential equation variable separable homogeneous linear integrating factor",
            "1. Identify type (separable, linear, exact). 2. For linear: find IF = e^∫Pdx. "
            "3. Multiply and integrate both sides.",
            formulas=["IF = e^{∫P(x)dx} (linear 1st order)"],
            common_pitfalls=["Wrong IF; missing constant of integration."],
            example="dy/dx + y = x: IF=eˣ → d(yeˣ)/dx = xeˣ → integrate."))

        self._register(Strategy(
            "MAT05", "Coordinate Geometry Locus", "math", "coordinate geometry",
            "locus coordinate geometry distance condition parabola ellipse hyperbola",
            "1. Assign (h,k) to a general point on locus. 2. Convert geometric condition "
            "to algebraic equation in h,k. 3. Replace h→x, k→y for locus equation.",
            formulas=["√((x-x₁)²+(y-y₁)²) = distance"],
            common_pitfalls=["Not replacing h,k with x,y; algebraic errors in squaring."],
            example="Locus equidistant from (a,0) and (-a,0): y-axis x=0."))

        self._register(Strategy(
            "MAT06", "Bayes' Theorem", "math", "probability",
            "Bayes conditional probability posterior prior total probability",
            "1. Identify prior probabilities P(Ei). 2. Compute conditional P(A|Ei). "
            "3. Use total probability to find P(A). 4. Apply Bayes formula.",
            formulas=["P(Ei|A) = P(A|Ei)P(Ei) / ΣP(A|Ej)P(Ej)"],
            common_pitfalls=["Swapping numerator terms; missing a partition event."],
            example="Disease test: P(disease|positive) = P(+|dis)P(dis)/P(+)."))

        self._register(Strategy(
            "MAT07", "Complex Numbers Euler", "math", "complex numbers",
            "complex number Euler De Moivre polar form modulus argument root power",
            "1. Convert to polar: z = r(cosθ + isinθ) = re^(iθ). "
            "2. Use De Moivre: z^n = r^n(cosnθ + isinnθ). 3. For roots: divide argument by n.",
            formulas=["e^(iθ) = cosθ + isinθ",
                      "z^n = r^n(cosnθ + isinnθ)"],
            common_pitfalls=["Wrong quadrant for argument θ; missing all n roots."],
            example="(1+i)⁸: r=√2, θ=π/4 → (√2)⁸(cos2π + isin2π) = 16."))

        self._register(Strategy(
            "MAT08", "Matrices Eigenvalue", "math", "matrices",
            "eigenvalue eigenvector characteristic equation matrix determinant singular",
            "1. Form characteristic equation: det(A-λI)=0. 2. Solve for λ (eigenvalues). "
            "3. For each λ, solve (A-λI)X=0 for eigenvectors.",
            formulas=["det(A - λI) = 0"],
            common_pitfalls=["Arithmetic errors in determinant; forgetting zero vector not an eigenvector."],
            example="A=[[2,1],[1,2]]: λ²-4λ+3=0 → λ=1,3."))

        self._register(Strategy(
            "MAT09", "Sequences AP GP HP", "math", "sequences series",
            "sequence arithmetic geometric harmonic AP GP HP nth term sum",
            "1. Identify sequence type by checking constant difference (AP), "
            "constant ratio (GP), or reciprocal differences (HP). "
            "2. Apply appropriate nth term and sum formulas.",
            formulas=["S_n = n/2(2a+(n-1)d) (AP)",
                      "S_n = a(r^n-1)/(r-1) (GP)"],
            common_pitfalls=["Using GP formula when r=1; confusing HP with GP."],
            example="AP 2,5,8: a=2,d=3 → T_n=3n-1, S_n=n(3n+1)/2."))

        self._register(Strategy(
            "MAT10", "Trigonometric Substitution", "math", "calculus",
            "trigonometric substitution integral sqrt radical inverse trigonometric",
            "1. Identify standard forms: √(a²-x²)→x=asinθ, √(x²+a²)→x=atanθ, "
            "√(x²-a²)→x=asecθ. 2. Substitute and simplify integral.",
            formulas=["∫dx/√(a²-x²) = sin⁻¹(x/a) + C"],
            common_pitfalls=["Wrong substitution for form; missing dx substitution."],
            example="∫√(9-x²)dx: x=3sinθ → 9∫cos²θ dθ → evaluate."))

        # ── BIOLOGY (5) ──
        self._register(Strategy(
            "BIO01", "Genetic Cross Analysis", "biology", "genetics",
            "genetic cross monohybrid dihybrid punnet square Mendelian dominant recessive phenotype genotype",
            "1. Determine parental genotypes. 2. Write gametes for each parent. "
            "3. Fill Punnett square. 4. Compute phenotypic and genotypic ratios.",
            formulas=["Monohybrid ratio: 3:1 (dominant:recessive, F₂)",
                      "Dihybrid ratio: 9:3:3:1"],
            common_pitfalls=["Forgetting gamete segregation; wrong ratio for linked genes."],
            example="Aa × Aa → F₂ genotypic ratio 1:2:1; phenotypic 3:1."))

        self._register(Strategy(
            "BIO02", "Physiological Pathway", "biology", "physiology",
            "photosynthesis respiration glycolysis Krebs ETC Calvin cycle oxygen ATP",
            "1. Identify pathway from input molecules. 2. Map each step with enzyme and products. "
            "3. Track ATP/NADH/FADH₂ yield at each stage. 4. Note regulatory/control points.",
            formulas=["Glycolysis: Glucose + 2NAD⁺ + 2ADP → 2Pyruvate + 2NADH + 2ATP",
                      "Net ATP aerobic: ~36-38 ATP/glucose"],
            common_pitfalls=["Counting gross instead of net ATP; confusing aerobic vs anaerobic yield."],
            example="Glycolysis: 1 glucose → 2 pyruvate, net 2 ATP, 2 NADH (cytosol)."))

        self._register(Strategy(
            "BIO03", "Ecological Interaction", "biology", "ecology",
            "ecological interaction predation competition mutualism commensalism parasitism food web",
            "1. Identify species and their roles. 2. Classify interaction type (+/+/+, +/- etc.). "
            "3. Analyze population dynamics and energy flow. 4. Consider keystone species effects.",
            formulas=["10% energy rule: ~10% transfers to next trophic level"],
            common_pitfalls=["Confusing mutualism with commensalism; ignoring indirect effects."],
            example="Predator-prey: Lotka-Volterra cycles; mutualism (+/+) benefits both."))

        self._register(Strategy(
            "BIO04", "Cell Structure Function", "biology", "cell biology",
            "cell organelle mitochondria chloroplast ribosome nucleus cell membrane function",
            "1. Identify organelle from description/diagram. 2. List key structural features. "
            "3. Relate structure to primary function. 4. Note compartment-specific processes.",
            formulas=[],
            common_pitfalls=["Confusing rough vs smooth ER; mixing up mitochondria vs chloroplast."],
            example="Mitochondria: double membrane, inner folds (cristae) → site of aerobic respiration."))

        self._register(Strategy(
            "BIO05", "Evolution Mechanism", "biology", "evolution",
            "evolution natural selection genetic drift mutation gene flow speciation adaptation",
            "1. Identify evolutionary force (selection, drift, mutation, gene flow). "
            "2. Determine if it increases or decreases genetic variation. "
            "3. Relate to Hardy-Weinberg deviations.",
            formulas=["p² + 2pq + q² = 1 (Hardy-Weinberg)"],
            common_pitfalls=["Confusing genetic drift with selection; ignoring HW assumptions."],
            example="Founder effect: small colonizing group → reduced genetic variation."))

        # ── JEE ADVANCED: PHYSICS (10 additional) ──
        self._register(Strategy(
            "PHY16", "Fluid Mechanics Bernoulli", "physics", "fluid mechanics",
            "fluid bernoulli continuity pressure flow pipe venturi",
            "1. Identify points 1 and 2 in the flow. 2. Apply continuity: A1v1=A2v2. "
            "3. Apply Bernoulli: P1+½ρv1²+ρgh1 = P2+½ρv2²+ρgh2. 4. Solve for unknown.",
            formulas=["P + ½ρv² + ρgh = constant", "A₁v₁ = A₂v₂"],
            common_pitfalls=["Forgetting height term; using gauge vs absolute pressure incorrectly."],
            example="Venturi meter: narrow section has higher velocity, lower pressure."))

        self._register(Strategy(
            "PHY17", "AC Circuit Phasor", "physics", "ac circuits",
            "ac circuit phasor impedance reactance rl rc rlc resonance",
            "1. Convert to phasor domain (ω). 2. Calculate X_L=ωL, X_C=1/(ωC). "
            "3. Find impedance Z=√(R²+(X_L-X_C)²). 4. Phase angle φ=arctan((X_L-X_C)/R). "
            "5. At resonance: X_L=X_C, Z=R, f=1/(2π√LC).",
            formulas=["Z = √(R² + (X_L - X_C)²)", "f_res = 1/(2π√LC)"],
            common_pitfalls=["Confusing leading/lagging phase; forgetting RMS vs peak."],
            example="Series RLC at resonance: current maximum, purely resistive."))

        self._register(Strategy(
            "PHY18", "EMI Faraday Lenz", "physics", "electromagnetic induction",
            "emf induced flux faraday lenz motional transformer coil",
            "1. Identify changing flux (motional or transformer). 2. Apply Faraday: ε=-dΦ/dt. "
            "3. Determine direction via Lenz's law. 4. For motional: ε=Bvl. "
            "5. For transformer: V1/V2 = N1/N2.",
            formulas=["ε = -dΦ/dt", "ε = Bvl (motional)", "V₁/V₂ = N₁/N₂"],
            common_pitfalls=["Wrong sign from Lenz's law; forgetting N for multi-turn coils."],
            example="Rod sliding on rails in B-field: ε=Bvl, I=Bvl/R."))

        self._register(Strategy(
            "PHY19", "Thermodynamics Combined Cycle", "physics", "thermodynamics",
            "carnot efficiency otto diesel cycle adiabatic isothermal heat engine",
            "1. Identify cycle type (Carnot, Otto, Diesel). 2. Track state points (P,V,T). "
            "3. Apply adiabatic: PV^γ=const. 4. Efficiency: Carnot η=1-Tc/Th. "
            "5. Otto: η=1-1/r^(γ-1). Diesel: η=1-(1/r^(γ-1))×[...].",
            formulas=["η_Carnot = 1 - T_c/T_h", "η_Otto = 1 - 1/r^(γ-1)"],
            common_pitfalls=["Confusing adiabatic vs isothermal; wrong γ for gas type."],
            example="Carnot engine between 300K and 600K: η=50%."))

        self._register(Strategy(
            "PHY20", "Optics Interference Diffraction", "physics", "wave optics",
            "interference diffraction young double slit single slit fringe",
            "1. Identify single/double slit or grating. 2. Double slit: β=λD/d. "
            "3. Single slit: a sinθ = nλ (minima). 4. Grating: d sinθ = nλ. "
            "5. Path difference = d sinθ.",
            formulas=["β = λD/d (fringe width)", "d sinθ = nλ (maxima)"],
            common_pitfalls=["Confusing minima vs maxima conditions; wrong slit width."],
            example="Double slit: λ=600nm, d=0.2mm, D=1m → β=3mm."))

        self._register(Strategy(
            "PHY21", "Capacitor Circuits", "physics", "electrostatics",
            "capacitor series parallel energy charge rc circuit",
            "1. Series: 1/C=1/C1+1/C2. Parallel: C=C1+C2. 2. Energy: U=½CV²=Q²/(2C). "
            "3. RC charging: Q=Q0(1-e^(-t/RC)). 4. RC discharging: Q=Q0×e^(-t/RC).",
            formulas=["U = ½CV²", "Q = Q₀(1 - e^(-t/RC))"],
            common_pitfalls=["Series vs parallel capacitor formula opposite of resistors."],
            example="Two 10μF in series = 5μF; in parallel = 20μF."))

        self._register(Strategy(
            "PHY22", "Gravitation Orbital", "physics", "gravitation",
            "orbit kepler escape velocity satellite geostationary gravitational",
            "1. Use F=GMm/r². 2. Orbital velocity: v=√(GM/r). 3. Escape: v_e=√(2GM/r). "
            "4. Kepler's 3rd law: T²∝r³. 5. PE=-GMm/r, KE=GMm/(2r), E=-GMm/(2r).",
            formulas=["v_orbital = √(GM/r)", "v_escape = √(2GM/r)", "T² = 4π²r³/(GM)"],
            common_pitfalls=["Forgetting negative PE at infinity; confusing orbital vs escape."],
            example="Geostationary orbit: T=24h → r≈42000km from Earth center."))

        self._register(Strategy(
            "PHY23", "Rolling Motion", "physics", "rotational mechanics",
            "rolling without slipping pure rolling friction static kinetic",
            "1. Condition: v=ωR. 2. KE_total = ½mv² + ½Iω². 3. For rolling on incline: "
            "a = gsinθ/(1+I/(mR²)). 4. Friction is static (no slipping).",
            formulas=["v = ωR", "KE = ½mv² + ½Iω²", "a = gsinθ/(1 + I/(mR²))"],
            common_pitfalls=["Using kinetic friction; forgetting rotational KE."],
            example="Solid sphere on incline: I=2/5 mR² → a=5/7 gsinθ."))

        self._register(Strategy(
            "PHY24", "Modern Physics de Broglie", "physics", "modern physics",
            "de broglie wavelength matter wave davisson germer bohr hydrogen",
            "1. de Broglie: λ=h/p. 2. Bohr radius: r_n=0.529×n²/Z Å. "
            "3. Energy: E_n=-13.6×Z²/n² eV. 4. Photon: E=hf=hc/λ.",
            formulas=["λ = h/p", "E_n = -13.6 Z²/n² eV", "E = hc/λ"],
            common_pitfalls=["Using wrong units (eV vs J); forgetting Z for hydrogen-like atoms."],
            example="Electron at 100eV: λ=h/√(2mE)≈1.23Å."))

        self._register(Strategy(
            "PHY25", "Surface Tension Viscosity", "physics", "fluid mechanics",
            "surface tension capillary viscosity poiseuille stokes terminal",
            "1. Surface tension: F=σL, pressure ΔP=2σ/R. 2. Capillary: h=2σ/(ρgR). "
            "3. Viscosity: F=ηA(dv/dx). 4. Stokes: F=6πηrv. 5. Terminal: v_t=2r²(ρ-σ)g/(9η).",
            formulas=["h = 2σ/(ρgR)", "F = 6πηrv (Stokes)"],
            common_pitfalls=["Wrong sign for capillary rise; confusing dynamic vs kinematic viscosity."],
            example="Rain drop terminal velocity: balance weight and Stokes drag."))

        # ── JEE ADVANCED: MATH (15 new — was 0!) ──
        self._register(Strategy(
            "MATH01", "Derivative Application", "math", "calculus",
            "derivative differentiate rate of change tangent slope maxima minima",
            "1. Find f'(x). 2. Critical points: f'(x)=0. 3. Second derivative test: "
            "f''>0 min, f''<0 max. 4. Tangent: y-f(a)=f'(a)(x-a). "
            "5. Increasing: f'>0, Decreasing: f'<0.",
            formulas=["f'(x) = d/dx f(x)", "Tangent: y = f(a) + f'(a)(x-a)"],
            common_pitfalls=["Forgetting to check f'' sign; wrong chain rule."],
            example="f(x)=x³-3x: f'=3x²-3=0 → x=±1, f''(1)=6>0 (min), f''(-1)=-6<0 (max)."))

        self._register(Strategy(
            "MATH02", "Integration Application", "math", "calculus",
            "integrate integral area under curve volume revolution definite",
            "1. Identify integrand and bounds. 2. Area: ∫f(x)dx. 3. Volume (disk): π∫f(x)²dx. "
            "4. Volume (shell): 2π∫x×f(x)dx. 5. Use substitution or parts as needed.",
            formulas=["Area = ∫f(x)dx", "V_disk = π∫f(x)²dx", "V_shell = 2π∫x f(x)dx"],
            common_pitfalls=["Wrong bounds; forgetting π for volume; wrong substitution."],
            example="Area under y=x² from 0 to 2: ∫x²dx = x³/3 = 8/3."))

        self._register(Strategy(
            "MATH03", "Differential Equations", "math", "differential equations",
            "differential equation solve first order linear separable homogeneous",
            "1. Identify order and type. 2. Separable: ∫g(y)dy = ∫f(x)dx. "
            "3. Linear: y' + P(x)y = Q(x) → IF = e^∫P. 4. Homogeneous: substitute y=vx.",
            formulas=["IF = e^(∫P(x)dx)", "y × IF = ∫Q(x)×IF dx"],
            common_pitfalls=["Wrong integrating factor; forgetting constant of integration."],
            example="y' + 2y = e^x: IF=e^(2x), y×e^(2x)=∫e^(3x)dx=e^(3x)/3+C."))

        self._register(Strategy(
            "MATH04", "Coordinate Geometry Line", "math", "coordinate geometry",
            "line slope intercept distance point parallel perpendicular",
            "1. Slope m=(y2-y1)/(x2-x1). 2. Equation: y-y1=m(x-x1). 3. Distance from point: "
            "|Ax+By+C|/√(A²+B²). 4. Parallel: m1=m2. Perpendicular: m1×m2=-1.",
            formulas=["m = (y₂-y₁)/(x₂-x₁)", "d = |Ax+By+C|/√(A²+B²)"],
            common_pitfalls=["Wrong sign for distance formula; dividing by zero for vertical lines."],
            example="Line through (1,2) and (3,6): m=2, y-2=2(x-1) → y=2x."))

        self._register(Strategy(
            "MATH05", "Circle Conic Section", "math", "coordinate geometry",
            "circle parabola ellipse hyperbola conic focus directrix eccentricity",
            "1. Circle: (x-h)²+(y-k)²=r². 2. Parabola: y²=4ax (focus at (a,0)). "
            "3. Ellipse: x²/a²+y²/b²=1, e=√(1-b²/a²). 4. Hyperbola: x²/a²-y²/b²=1.",
            formulas=["Circle: (x-h)²+(y-k)²=r²", "Ellipse: x²/a²+y²/b²=1"],
            common_pitfalls=["Confusing a and b for ellipse; wrong focus for parabola."],
            example="Circle center (3,-2), radius 5: (x-3)²+(y+2)²=25."))

        self._register(Strategy(
            "MATH06", "Trigonometry Identities", "math", "trigonometry",
            "trigonometry sin cos tan identity double angle compound angle",
            "1. Use basic identities: sin²+cos²=1. 2. Compound: sin(A±B), cos(A±B). "
            "3. Double: sin2A=2sinAcosA, cos2A=cos²A-sin²A. 4. Sum to product.",
            formulas=["sin²θ + cos²θ = 1", "sin(A+B) = sinAcosB + cosAsinB"],
            common_pitfalls=["Wrong sign in cos(A-B); forgetting 2 in sin2A."],
            example="sin75° = sin(45+30) = sin45cos30+cos45sin30 = (√6+√2)/4."))

        self._register(Strategy(
            "MATH07", "Vectors 3D Geometry", "math", "vectors",
            "vector dot cross product magnitude direction cosine 3d line plane",
            "1. Dot: a·b=|a||b|cosθ. 2. Cross: |a×b|=|a||b|sinθ. 3. Line: r=a+λb. "
            "4. Plane: r·n=d. 5. Direction cosines: l²+m²+n²=1.",
            formulas=["a·b = |a||b|cosθ", "|a×b| = |a||b|sinθ", "l²+m²+n²=1"],
            common_pitfalls=["Confusing dot vs cross; wrong unit vector."],
            example="a=(1,2,3), b=(4,5,6): a·b=4+10+18=32, a×b=(-3,6,-3)."))

        self._register(Strategy(
            "MATH08", "Matrix Determinant", "math", "matrices",
            "matrix multiply determinant inverse adjoint cofactor system",
            "1. Determinant by expansion. 2. Inverse: A^(-1)=adj(A)/det(A). "
            "3. System: AX=B → X=A^(-1)B. 4. Cramer's rule for 2×2, 3×3.",
            formulas=["A⁻¹ = adj(A)/det(A)", "AX = B → X = A⁻¹B"],
            common_pitfalls=["Wrong cofactor signs; dividing by zero determinant."],
            example="2×2: |A|=ad-bc, A⁻¹=1/(ad-bc)×[[d,-b],[-c,a]]."))

        self._register(Strategy(
            "MATH09", "Probability Bayes", "math", "probability",
            "probability conditional bayes theorem independent mutually exclusive",
            "1. Basic: P(E)=favourable/total. 2. Conditional: P(A|B)=P(A∩B)/P(B). "
            "3. Bayes: P(A|B)=P(B|A)×P(A)/P(B). 4. Independent: P(A∩B)=P(A)×P(B).",
            formulas=["P(A|B) = P(A∩B)/P(B)", "Bayes: P(A|B) = P(B|A)P(A)/P(B)"],
            common_pitfalls=["Confusing P(A|B) with P(B|A); forgetting normalization in Bayes."],
            example="Disease test: 1% have disease, test 99% accurate → P(D|+)≈50%."))

        self._register(Strategy(
            "MATH10", "Quadratic Complex Numbers", "math", "algebra",
            "quadratic equation roots discriminant complex number modulus argument",
            "1. Quadratic: x=(-b±√(b²-4ac))/(2a). 2. Discriminant: D=b²-4ac. "
            "3. Complex: z=a+bi, |z|=√(a²+b²), arg=arctan(b/a). 4. Euler: z=re^(iθ).",
            formulas=["x = (-b±√(b²-4ac))/(2a)", "|z| = √(a²+b²)"],
            common_pitfalls=["Wrong discriminant sign; forgetting complex roots for D<0."],
            example="x²+1=0: D=-4, x=±i. |i|=1, arg(i)=π/2."))

        self._register(Strategy(
            "MATH11", "Sequences Series", "math", "sequences",
            "arithmetic geometric progression ap gp sum series infinite convergence",
            "1. AP: a_n=a+(n-1)d, S_n=n/2×(2a+(n-1)d). 2. GP: a_n=ar^(n-1), "
            "S_n=a(r^n-1)/(r-1). 3. GP infinite (|r|<1): S=a/(1-r).",
            formulas=["AP: S_n = n/2(2a+(n-1)d)", "GP∞: S = a/(1-r)"],
            common_pitfalls=["Using AP formula for GP; forgetting convergence condition."],
            example="GP: 1+1/2+1/4+... = 1/(1-1/2) = 2."))

        self._register(Strategy(
            "MATH12", "Binomial Theorem", "math", "algebra",
            "binomial expansion coefficient general term middle term",
            "1. (a+b)^n = Σ C(n,r) a^(n-r) b^r. 2. General term: T_(r+1)=C(n,r)a^(n-r)b^r. "
            "3. C(n,r)=n!/(r!(n-r)!). 4. Middle term: r=n/2 (even), (n±1)/2 (odd).",
            formulas=["(a+b)^n = Σ C(n,r) a^(n-r) b^r", "T_(r+1) = C(n,r) a^(n-r) b^r"],
            common_pitfalls=["Wrong r index (0-based); forgetting factorial definition."],
            example="(1+x)^4 = 1+4x+6x²+4x³+x⁴. Coefficient of x²: C(4,2)=6."))

        self._register(Strategy(
            "MATH13", "Limits Continuity", "math", "calculus",
            "limit continuity l hospital indeterminate form squeeze",
            "1. Direct substitution. 2. If 0/0: L'Hôpital (differentiate num and den). "
            "3. If ∞/∞: L'Hôpital. 4. Squeeze theorem for trig limits. "
            "5. Continuity: lim(x→a) f(x) = f(a).",
            formulas=["lim(x→a) f(x) = f(a) (continuity)", "L'Hôpital: lim f/g = lim f'/g'"],
            common_pitfalls=["Applying L'Hôpital when not 0/0; forgetting to check continuity."],
            example="lim(x→0) sin(x)/x = 1 (by L'Hôpital or squeeze)."))

        self._register(Strategy(
            "MATH14", "Permutation Combination", "math", "combinatorics",
            "permutation combination arrangement selection factorial",
            "1. Permutation: P(n,r)=n!/(n-r)!. 2. Combination: C(n,r)=n!/(r!(n-r)!). "
            "3. With repetition: C(n+r-1,r). 4. Circular: (n-1)!.",
            formulas=["P(n,r) = n!/(n-r)!", "C(n,r) = n!/(r!(n-r)!)"],
            common_pitfalls=["Using P when C needed; forgetting (n-1)! for circular."],
            example="Choose 3 from 10: C(10,3)=120. Arrange 3 from 10: P(10,3)=720."))

        self._register(Strategy(
            "MATH15", "LPP Linear Programming", "math", "optimization",
            "linear programming lpp corner point feasible region maximize minimize",
            "1. Identify objective and constraints. 2. Plot feasible region. "
            "3. Find corner points. 4. Evaluate objective at each corner. "
            "5. Max/min occurs at a corner point.",
            formulas=["Maximize/Minimize Z = ax + by", "subject to constraints"],
            common_pitfalls=["Missing non-negativity constraints; wrong corner points."],
            example="Max Z=3x+2y, x+y≤4, x,y≥0 → corners (0,0),(4,0),(0,4) → max at (4,0): Z=12."))

        # ── JEE ADVANCED: CHEMISTRY (5 additional) ──
        self._register(Strategy(
            "CHM11", "Coordination Chemistry", "chemistry", "coordination compounds",
            "coordination complex ligand crystal field cft splitting d-orbital",
            "1. Identify central metal and ligands. 2. Determine geometry (octahedral/tetrahedral). "
            "3. CFT: d-orbital splitting (eg vs t2g). 4. CFSE = (-0.4n_t2g + 0.6n_eg)Δ. "
            "5. High spin vs low spin based on Δ vs pairing energy.",
            formulas=["CFSE = (-0.4×n_t2g + 0.6×n_eg)×Δ₀"],
            common_pitfalls=["Wrong electron filling; confusing high/low spin."],
            example="[Fe(H₂O)₆]²⁺: d⁶, weak field, high spin, CFSE=-0.4Δ₀."))

        self._register(Strategy(
            "CHM12", "Organic Reaction Prediction", "chemistry", "organic chemistry",
            "organic reaction mechanism electrophile nucleophile substitution elimination",
            "1. Identify functional group. 2. Determine electrophile/nucleophile. "
            "3. SN1/SN2: substrate, nucleophile, solvent. 4. E1/E2: base, substrate. "
            "5. Predict product with correct stereochemistry.",
            formulas=["SN2: rate = k[RX][Nu]", "SN1: rate = k[RX]"],
            common_pitfalls=["Wrong mechanism (SN1 vs SN2); ignoring stereochemistry."],
            example="1° halide + strong nucleophile → SN2. 3° halide + weak base → SN1."))

        self._register(Strategy(
            "CHM13", "Surface Chemistry Catalysis", "chemistry", "surface chemistry",
            "adsorption isotherm freundlich langmuir catalysis colloid",
            "1. Adsorption: Freundlich x/m = k×P^(1/n). 2. Langmuir: θ = KP/(1+KP). "
            "3. Colloid: Brownian motion, Tyndall effect. 4. Hardy-Schulze rule for coagulation.",
            formulas=["x/m = k×P^(1/n) (Freundlich)", "θ = KP/(1+KP) (Langmuir)"],
            common_pitfalls=["Confusing adsorption vs absorption; wrong coagulation value."],
            example="Activated charcoal adsorbs gases; higher pressure → more adsorption."))

        self._register(Strategy(
            "CHM14", "p-Block Elements", "chemistry", "inorganic chemistry",
            "p-block group 13 14 15 16 17 18 boron carbon nitrogen oxygen halogen",
            "1. Identify group and period. 2. Note oxidation states. 3. Inert pair effect (lower ox state stable down group). "
            "4. Acidic/basic nature of oxides. 5. Interhalogen compounds.",
            formulas=["Inert pair effect: ns² electrons reluctant to bond"],
            common_pitfalls=["Forgetting inert pair effect; wrong oxidation states."],
            example="Pb²⁺ more stable than Pb⁴⁺ (inert pair effect in group 14)."))

        self._register(Strategy(
            "CHM15", "Solid State", "chemistry", "solid state",
            "unit cell fcc bcc hcp packing efficiency lattice coordination number",
            "1. Identify unit cell type. 2. Count atoms: SC=1, BCC=2, FCC=4. "
            "3. Packing efficiency: SC=52%, BCC=68%, FCC/HCP=74%. "
            "4. Coordination number: SC=6, BCC=8, FCC=12. 5. Relation: a=2r (SC), a=4r/√3 (BCC), a=2√2r (FCC).",
            formulas=["SC: 1 atom, 52%", "BCC: 2 atoms, 68%", "FCC: 4 atoms, 74%"],
            common_pitfalls=["Wrong atom count per cell; confusing CN values."],
            example="FCC: a=2√2r, 4 atoms/cell, CN=12, 74% packing."))

    def get_strategies_for_concepts(self, concepts: List[str], subject: str) -> List[Strategy]:
        subject = subject.lower()
        if subject not in self.SUBJECTS:
            raise ValueError(f"Unknown subject: {subject}")
        match_ids: set[str] = None
        for concept in concepts:
            c = concept.lower()
            ids = set(self._concept_index.get(c, []))
            if match_ids is None:
                match_ids = ids
            else:
                match_ids &= ids
        if match_ids is None:
            return []
        return [self._strategies[sid] for sid in sorted(match_ids)
                if self._strategies[sid].subject == subject]

    def get_strategy_by_id(self, strategy_id: str) -> Strategy:
        if strategy_id not in self._strategies:
            raise KeyError(f"Strategy '{strategy_id}' not found.")
        return self._strategies[strategy_id]

    def get_strategies_by_topic(self, topic: str) -> List[Strategy]:
        ids = self._topic_index.get(topic.lower(), [])
        return [self._strategies[sid] for sid in ids]

    def add_strategy(self, strategy: Strategy):
        if strategy.strategy_id in self._strategies:
            raise ValueError(f"Strategy '{strategy.strategy_id}' already exists.")
        self._register(strategy)


if __name__ == "__main__":
    lib = StrategyLibrary()
    print(f"Loaded {len(lib._strategies)} strategies")

    for subj in ["physics", "chemistry", "math", "biology"]:
        results = lib.get_strategies_for_concepts(["energy", "conservation"], subj)
        if results:
            print(f"\n[{subj.upper()}] '{results[0].name}' -> {results[0].approach[:60]}...")

    print("\n--- Optics strategies ---")
    for s in lib.get_strategies_by_topic("optics"):
        print(f"  {s.strategy_id}: {s.name}")