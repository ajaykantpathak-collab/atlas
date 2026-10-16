"""competitive_curriculum_matrix.py -- Complete, Systematic 107-Chapter Syllabus Coverage for
NEET UG, JEE Main, and JEE Advanced Ladders across Class 11 and Class 12.

Total Chapters: Exactly 107
  - Physics: 28 Chapters (14 Class 11 + 14 Class 12)
  - Chemistry: 19 Chapters (9 Class 11 + 10 Class 12)
  - Biology: 32 Chapters (19 Class 11 + 13 Class 12)
  - Mathematics: 28 Chapters (14 Class 11 + 14 Class 12)

Each blueprint establishes a 3-Rung Pedagogical Ladder:
  - Rung 1 (NCERT Foundation): The textbook law, formula, or definition.
  - Rung 2 (The Competitive Gap / Trap Nuance): Limiting condition, non-conservative field,
    subtle constraint, or counter-intuitive edge case tested in competitive exams.
  - Rung 3 (Competitive Velocity & Derivation): Fast calculation, deduction, and PAL-verified derivation.
"""

from __future__ import annotations
from typing import Dict, List, Any

# =============================================================================
# 1. PHYSICS (28 CHAPTERS: 14 Class 11 + 14 Class 12)
# =============================================================================

PHYSICS_LADDER: List[Dict[str, Any]] = [
    # --- Class 11 Physics (14 Chapters) ---
    {
        "exam": "NEET Ladder",
        "subject": "Physics",
        "topic": "Units and Measurements: Dimensional Analysis & Error Propagation in Experimental Setups",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Physics Ch 2: Principle of homogeneity of dimensions and relative error formula delta_z/z = a*(delta_x/x) + b*(delta_y/y)",
        "neet_gap_concept": "Error propagation when quantities have systematic offsets vs random errors, and fractional power combinations where rounding intermediate terms creates trap options",
        "prompt": "Create an authentic Class 11 to NEET Ladder question where physical quantity X = (A^2 * B^(1/3)) / (C^3 * sqrt(D)). Given percentage errors in A, B, C, D as 1%, 3%, 2%, 4% respectively. Calculate the maximum percentage error in X, and determine which parameter contributes the most uncertainty. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Physics",
        "topic": "Motion in a Straight Line: Variable Acceleration & Non-Linear Deceleration to Rest",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Physics Ch 3: Kinematic equations v = u + at, s = ut + 0.5at^2 for constant acceleration",
        "neet_gap_concept": "Kinematics with velocity-dependent deceleration a = -k*v^n where constant-acceleration formulas completely fail; finding total time and total distance before coming to rest via calculus",
        "prompt": "Create an authentic Class 11 to NEET Ladder question where a particle moves along the x-axis with initial velocity v0. It experiences a retarding deceleration a = -beta * v^(1/2), where beta is a positive constant. Calculate the total time required for the particle to come to a complete stop and the total displacement covered during this time. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Physics",
        "topic": "Motion in a Plane: Projectile on an Inclined Plane & River-Swimmer Optimum Paths",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Physics Ch 4: Projectile range R = (u^2 * sin(2*theta)) / g on flat horizontal ground",
        "neet_gap_concept": "Projectile thrown up an inclined plane of inclination beta; range along the incline R_up = u^2/(g*cos^2(beta)) * [sin(2*theta - beta) - sin(beta)], and the condition for maximum range theta = pi/4 + beta/2",
        "prompt": "Create an authentic Class 11 to NEET Ladder question where a projectile is fired from the bottom of an inclined plane of inclination 30 degrees with initial speed u at an angle alpha to the incline. Calculate the angle alpha for which the projectile strikes the inclined plane perpendicularly or achieves maximum range along the incline. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Physics",
        "topic": "Laws of Motion: Pseudo-Force on Incline & Two-Block Friction Thresholds",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Physics Ch 5: Newton's second law F = ma and static friction f_s <= mu_s * N",
        "neet_gap_concept": "Two blocks stacked on top of each other on an accelerating wedge: determining the exact critical acceleration where slipping starts between the blocks vs when the bottom block loses contact with the wedge",
        "prompt": "Create an authentic Class 11 to NEET Ladder question with block A (mass m) placed on top of block B (mass M) resting on a frictionless horizontal floor. The coefficient of static friction between A and B is mu. A horizontal force F is applied to block B. Calculate the maximum value of F such that both blocks accelerate together without slipping. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Physics",
        "topic": "Work, Energy and Power: Vertical Circular Motion & String Slack Tension",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Physics Ch 6: Work-energy theorem W_net = Delta_K and mechanical energy conservation",
        "neet_gap_concept": "Critical speed thresholds in vertical circle: difference between a light string (slacks when T = 0 at theta > 90 deg, parabolic projectile motion ensues) vs a light rigid rod (velocity reaches zero at top without slacking)",
        "prompt": "Create an authentic Class 11 to NEET Ladder question where a small bob of mass m attached to a light inextensible string of length L is projected horizontally from the lowest point with speed u = sqrt(3*g*L). Show that the string slacks at an angle theta to the upward vertical, and calculate the maximum height reached by the bob during the subsequent free projectile motion. Include 4 options."
    },
    {
        "exam": "JEE Main Ladder",
        "subject": "Physics",
        "topic": "System of Particles and Rotational Motion: Pure Rolling vs Slipping & Toppling Dynamics",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Physics Ch 7: Torque tau = I*alpha and rolling condition v_cm = omega*R",
        "neet_gap_concept": "Rolling with forward/backward slipping: friction direction changes depending on whether the applied horizontal force is above or below the center of mass (sweet spot h = I_cm / (m*R)); toppling criterion before sliding on rough incline",
        "prompt": "Create an authentic Class 11 to JEE Main Ladder question where a uniform solid cylinder of mass M and radius R is pulled by a horizontal force F applied at a height h above the center. The ground is sufficiently rough. Find the height h such that the frictional force exerted by the ground is strictly zero, and calculate the linear acceleration of the center of mass. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Physics",
        "topic": "Gravitation: Escape Velocity from Rotating Planet & Tunnel Motion Through Earth",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Physics Ch 8: Gravitational potential energy U = -G*M*m/r and escape velocity v_esc = sqrt(2*G*M/R)",
        "neet_gap_concept": "Apparent weight variation with latitude due to centrifugal acceleration g_eff = g - omega^2*R*cos^2(lambda); SHM of a particle dropped into a frictionless tunnel drilled along any arbitrary chord of the Earth (period T = 2*pi*sqrt(R/g) independent of chord length)",
        "prompt": "Create an authentic Class 11 to NEET Ladder question on a particle dropped from rest into a narrow straight frictionless tunnel dug through the Earth along a chord at a distance d from the center. Prove that the motion is simple harmonic, and calculate the time period and maximum velocity as the particle passes the midpoint of the tunnel. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Physics",
        "topic": "Mechanical Properties of Solids: Thermal Stress, Elastic Hysteresis & Self-Weight Elongation",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Physics Ch 9: Hooke's law stress = Y * strain and elongation Delta_L = F*L / (A*Y)",
        "neet_gap_concept": "Elongation of a heavy uniform rod of mass M hanging vertically under its own weight (Delta_L = M*g*L / (2*A*Y), half of point load); thermal stress developed when expansion is prevented by rigid boundaries with finite compliance",
        "prompt": "Create an authentic Class 11 to NEET Ladder question where a uniform steel wire of length L, mass M, and cross-sectional area A hangs vertically from a rigid support. A point mass m is suspended from the free end. Calculate the total elongation of the wire taking into account both the suspended mass and the wire's own weight. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Physics",
        "topic": "Mechanical Properties of Fluids: Surface Tension Excess Pressure & Capillary Rise Dynamics",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Physics Ch 10: Excess pressure in a drop Delta_P = 2*T/R and capillary ascent h = 2*T*cos(theta) / (rho*g*r)",
        "neet_gap_concept": "Excess pressure inside a soap bubble (4*T/R) connecting two bubbles of different radii r1 < r2 via a valve (smaller bubble collapses into larger bubble); work done in blowing a bubble vs energy dissipated when two droplets coalesce",
        "prompt": "Create an authentic Class 11 to NEET Ladder question where two soap bubbles of radii R1 = 2 cm and R2 = 4 cm in vacuum coalesce isothermally to form a single bubble of radius R under surface tension T. Calculate the radius of the resulting bubble and the change in surface energy. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Physics",
        "topic": "Thermal Properties of Matter: Newton's Law of Cooling & Latent Heat Phase Equilibria",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Physics Ch 11: Heat transfer Q = m*c*Delta_T and Newton's law of cooling -dT/dt = k*(T - T0)",
        "neet_gap_concept": "Exact integration of Newton's cooling law vs approximate linear average method: calculating time taken to cool through sequential intervals (e.g., 80 to 70 deg C in t1, 70 to 60 deg C in t2 where t2 > t1); ice-water calorimeter equilibrium mixtures",
        "prompt": "Create an authentic Class 11 to NEET Ladder question where a body cools from 80 deg C to 60 deg C in 5 minutes in a room at 20 deg C. Using Newton's law of cooling, calculate the time it will take to cool from 60 deg C to 40 deg C in the same surroundings. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Physics",
        "topic": "Thermodynamics: Polytropic Gas Processes, Indicator Diagrams & Carnot Efficiency",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Physics Ch 12: First law of thermodynamics Delta_Q = Delta_U + Delta_W and work done W = P*Delta_V",
        "neet_gap_concept": "Molar heat capacity for a polytropic process PV^n = const given by C = C_v + R/(1 - n); negative molar heat capacity regimes where gas absorbs heat while its temperature decreases due to large expansion work",
        "prompt": "Create an authentic Class 11 to NEET Ladder question for an ideal monoatomic gas undergoing a polytropic expansion process according to PV^2 = constant. Calculate the molar heat capacity of the gas during this process, and determine whether heat is absorbed or released when the gas expands. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Physics",
        "topic": "Kinetic Theory of Gases: Degrees of Freedom, Equipartition & Maxwell Speed Distribution",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Physics Ch 13: Pressure of an ideal gas P = (1/3)*rho*v_rms^2 and average kinetic energy (3/2)*k_B*T",
        "neet_gap_concept": "Vibrational degrees of freedom freezing out at low/medium temperatures and activating at high temperatures; mixture of non-reacting polyatomic gases and effective gamma = C_p,mix / C_v,mix",
        "prompt": "Create an authentic Class 11 to NEET Ladder question where 2 moles of helium (monoatomic) are mixed with 3 moles of oxygen (diatomic, rigid rotator) at temperature T. Calculate the molar specific heat at constant volume C_v, the ratio of specific heats gamma for the mixture, and the speed of sound in this gas mixture. Include 4 options."
    },
    {
        "exam": "JEE Main Ladder",
        "subject": "Physics",
        "topic": "Oscillations: Damped & Forced Harmonic Oscillations, Resonance & Compound Pendulum",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Physics Ch 14: SHM equation d^2x/dt^2 + omega^2*x = 0 and time period T = 2*pi*sqrt(m/k)",
        "neet_gap_concept": "Quality factor Q and energy loss per cycle in damped SHM x(t) = A*exp(-gamma*t)*cos(omega'*t); compound pendulum minimum time period condition when distance from pivot to center of mass equals the radius of gyration k",
        "prompt": "Create an authentic Class 11 to JEE Main Ladder question where a uniform thin rod of length L oscillates as a physical pendulum about a horizontal axis through a point at distance x from its center of mass. Find the value of x for which the period of oscillation is minimum, and calculate the minimum time period. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Physics",
        "topic": "Waves: Doppler Effect with Accelerated Source, End Correction in Organ Pipes & Beats",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Physics Ch 15: Speed of sound v = sqrt(gamma*P/rho) and Doppler frequency shift f' = f * (v +- v_o) / (v -+ v_s)",
        "neet_gap_concept": "End correction e = 0.6*r in closed vs open organ pipes causing resonant frequencies to shift from pure harmonics; acoustic beats produced between a stationary tuning fork and an approaching/receding source reflecting from a moving wall",
        "prompt": "Create an authentic Class 11 to NEET Ladder question where a whistle of frequency 500 Hz moves towards a rigid vertical wall with a speed of 2 m/s while blowing. If speed of sound in air is 340 m/s, calculate the beat frequency heard by a stationary observer located between the whistle and the wall. Include 4 options."
    },

    # --- Class 12 Physics (14 Chapters) ---
    {
        "exam": "NEET Ladder",
        "subject": "Physics",
        "topic": "Electric Charges and Fields: Gauss's Law in Non-Uniform Charge Densities & Field Lines",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Physics Ch 1: Coulomb's law and Gauss's law Phi = Q_enclosed / eps0",
        "neet_gap_concept": "Spherical charge distribution with radial volume charge density rho(r) = rho0 * (1 - r/R); finding the radial distance where electric field intensity reaches its maximum value",
        "prompt": "Create an authentic Class 12 to NEET Ladder question for a solid dielectric sphere of radius R having a non-uniform volume charge density rho(r) = rho0 * (r / R). Using Gauss's law, calculate the electric field inside and outside the sphere, and determine the exact position r where the electric field is maximum. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Physics",
        "topic": "Electrostatic Potential and Capacitance: Dielectric Insertion Force & Bound Charge",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Physics Ch 2: Capacitance with dielectric slab C = K*eps0*A/d and stored energy U = 0.5*C*V^2",
        "neet_gap_concept": "Electrostatic pulling force on a partially inserted dielectric slab with battery connected vs disconnected; bound surface charge density sigma_b = sigma*(1 - 1/K)",
        "prompt": "Create an authentic Class 12 to NEET Ladder question on a parallel plate capacitor where a dielectric slab of dielectric constant K is partially inserted by distance x between plates of length L. Battery of potential V remains connected. Calculate the electrostatic pulling force on the slab. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Physics",
        "topic": "Current Electricity: Non-Ideal Cell Grouping, Potentiometer Sensitivity & Wire Resistance",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Physics Ch 3: Terminal voltage V = E - I*r and potentiometer null deflection principle",
        "neet_gap_concept": "Mixed grouping of m rows of n identical non-ideal cells for max power transfer; potentiometer wire resistance drift when driver cell has non-zero internal resistance",
        "prompt": "Create an authentic Class 12 to NEET Ladder question where N identical non-ideal cells (EMF E, internal resistance r) are arranged in m parallel rows each containing n cells in series. Find the condition for maximum power dissipation in an external load resistor R and calculate the maximum current delivered. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Physics",
        "topic": "Moving Charges and Magnetism: Helical Trajectories & Magnetic Lorentz Force in Crossed Fields",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Physics Ch 4: Magnetic Lorentz force F = q(v x B), circular radius r = mv/(qB)",
        "neet_gap_concept": "Helical path when velocity v has component v_parallel to B and v_perp to B; pitch p = v_parallel * T, and number of rotations per unit axial length",
        "prompt": "Create an authentic Class 12 to NEET Ladder question where a proton enters a uniform magnetic field B at an angle theta (60 degrees) with kinetic energy K. Calculate the pitch of the helical path and the displacement along the field lines after completing n revolutions. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Physics",
        "topic": "Magnetism and Matter: Earth's Magnetic Dipole Elements & Hysteresis Energy Dissipation",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Physics Ch 5: Magnetic dipole moment M = m*2l and torque tau = M x B",
        "neet_gap_concept": "Apparent dip angle delta1 and delta2 measured in two mutually perpendicular vertical planes related to true dip angle delta via cot^2(delta) = cot^2(delta1) + cot^2(delta2); hysteresis loop area per cycle as thermal energy loss",
        "prompt": "Create an authentic Class 12 to NEET Ladder question where a dip circle shows an apparent dip of 45 degrees in a plane making an angle of 30 degrees with the magnetic meridian. Calculate the true dip at that place. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Physics",
        "topic": "Electromagnetic Induction: Induced Non-Conservative Electric Field & Mutual Inductance",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Physics Ch 6: Faraday's law of induction e = -dPhi/dt and Lenz's law",
        "neet_gap_concept": "Non-conservative circular electric field E(r): inside solenoid (r < R) E = (r/2)(dB/dt); outside solenoid (r > R) E = (R^2 / 2r)(dB/dt); potential difference between two arbitrary points in a time-varying magnetic field is path-dependent",
        "prompt": "Create an authentic Class 12 to NEET Ladder question inside a long cylindrical solenoid of radius R carrying a time-varying magnetic field B(t) = alpha * t. Calculate the induced electric field at radial distance r < R and r > R, and find the work done in moving a charge q around a closed square path concentric with the solenoid. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Physics",
        "topic": "Alternating Current: LCR Series Resonance, Quality Factor & Wattless Current",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Physics Ch 7: Impedance Z = sqrt(R^2 + (X_L - X_C)^2) and resonant frequency omega0 = 1/sqrt(L*C)",
        "neet_gap_concept": "Bandwidth Delta_omega = R/L, Quality factor Q = omega0*L/R = 1/R * sqrt(L/C), and wattless component of current I_rms * sin(phi) delivering zero average power",
        "prompt": "Create an authentic Class 12 to NEET Ladder question for a series LCR circuit connected to an AC source of variable frequency. Given L = 0.5 H, C = 8 microfarads, R = 10 ohms. Calculate the resonance frequency, bandwidth of the resonance curve, and quality factor Q. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Physics",
        "topic": "Electromagnetic Waves: Displacement Current & Radiation Pressure",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Physics Ch 8: Maxwell-Ampere law curl(B) = mu0*(J + eps0*dE/dt) and wave speed c = 1/sqrt(mu0*eps0)",
        "neet_gap_concept": "Displacement current density inside a charging circular parallel plate capacitor J_d = eps0*(dE/dt); magnetic field at radius r between plates B(r) = (mu0*r/2R^2)*I_d; radiation pressure on absorbing vs reflecting surface",
        "prompt": "Create an authentic Class 12 to NEET Ladder question where a parallel plate capacitor with circular plates of radius R is being charged by a constant current I. Calculate the magnetic field B at distance r < R and r > R from the central axis between the capacitor plates. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Physics",
        "topic": "Ray Optics: Silvered Plano-Convex Lens Combinations & Apparent Depth with Multi-Layer Media",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Physics Ch 9: Lens-maker formula 1/f = (mu - 1)*(1/R1 - 1/R2) and mirror formula 1/v + 1/u = 1/f",
        "neet_gap_concept": "Silvering the curved vs plane surface of a plano-convex lens converts the system into an equivalent concave mirror of effective focal length 1/F = 2/f_lens + 1/f_mirror",
        "prompt": "Create an authentic Class 12 to NEET Ladder question where the curved surface of a plano-convex lens (refractive index 1.5, radius of curvature R = 20 cm) is silvered. Find the effective focal length of the resulting system and locate the image of an object placed 15 cm in front of the flat face. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Physics",
        "topic": "Wave Optics: YDSE with Multiple Dielectric Slabs, Fringe Shift & Brewster Polarization",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Physics Ch 10: Young's double slit fringe width beta = lambda*D/d and central fringe position",
        "neet_gap_concept": "Inserting a transparent thin sheet of thickness t and refractive index mu in front of one slit shifts the entire interference pattern by Delta_y = (mu - 1)*t * D/d without changing fringe width beta",
        "prompt": "Create an authentic Class 12 to NEET Ladder question on a YDSE setup (wavelength 600 nm, slit separation 1 mm, screen distance 1 m). When a thin glass sheet (mu = 1.5) is placed in front of one slit, the central bright fringe shifts to the position previously occupied by the 5th bright fringe. Calculate the thickness of the glass sheet. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Physics",
        "topic": "Dual Nature of Radiation and Matter: Photoelectric Stopping Potential & De Broglie Waves",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Physics Ch 11: Einstein's photoelectric equation h*nu = Phi + e*V0 and de Broglie wavelength lambda = h/p",
        "neet_gap_concept": "Stopping potential graph slope h/e vs frequency nu is universal; de Broglie wavelength of an alpha particle vs proton accelerated through identical potential difference V (ratio lambda_p / lambda_alpha = sqrt(8))",
        "prompt": "Create an authentic Class 12 to NEET Ladder question where light of frequency 1.5 * nu0 is incident on a photosensitive material of threshold frequency nu0, giving stopping potential V1. If the incident frequency is doubled to 3 * nu0, the new stopping potential is V2. Calculate the ratio V2 / V1. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Physics",
        "topic": "Atoms: Bohr Model Relativistic Recoil Energy & Hydrogen Spectral Series Transitions",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Physics Ch 12: Bohr orbital radius r_n = n^2*h^2*eps0 / (pi*m*e^2) and energy levels E_n = -13.6 / n^2 eV",
        "neet_gap_concept": "Conservation of linear momentum during photon emission causes the hydrogen atom of mass M to recoil with recoil kinetic energy K_recoil = E_photon^2 / (2*M*c^2), slightly reducing the radiated photon frequency",
        "prompt": "Create an authentic Class 12 to NEET Ladder question where an isolated stationary hydrogen atom in state n = 2 drops to ground state n = 1 by emitting a photon. Taking the mass of the hydrogen atom as M, calculate the fractional loss in photon energy due to the recoil of the atom. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Physics",
        "topic": "Nuclei: Radioactive Successive Decay, Secular Equilibrium & Binding Energy Curve Nuance",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Physics Ch 13: Radioactive decay law N(t) = N0 * exp(-lambda*t) and mass defect Delta_m = Z*m_p + (A-Z)*m_n - M",
        "neet_gap_concept": "Sequential radioactive decay A -> B -> C with decay constants lambda_A and lambda_B; determining the time t_max at which daughter isotope B reaches maximum activity via Bateman equations",
        "prompt": "Create an authentic Class 12 to NEET Ladder question where a radioactive parent nucleus A (decay constant lambda1) decays into daughter B (decay constant lambda2), which in turn decays into stable nucleus C. Initially only A is present with N0 nuclei. Calculate the exact time at which the number of daughter nuclei B attains its maximum value. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Physics",
        "topic": "Semiconductor Electronics: Zener Diode Voltage Regulation & Dynamic Resistance",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Physics Ch 14: P-N junction forward and reverse bias V-I characteristics and Zener breakdown V_z",
        "neet_gap_concept": "Zener diode regulator circuit operating limits: calculating minimum and maximum series resistance R_s to maintain constant load voltage V_z when both input unregulated voltage V_in and load current I_L vary simultaneously",
        "prompt": "Create an authentic Class 12 to NEET Ladder question where a Zener diode with breakdown voltage V_z = 10 V and maximum power dissipation P_max = 500 mW is used in a voltage regulator circuit. If input voltage varies from 15 V to 25 V and load resistance is R_L = 1 kOhm, calculate the minimum safe value of series resistance R_s. Include 4 options."
    }
]

# =============================================================================
# 2. CHEMISTRY (19 CHAPTERS: 9 Class 11 + 10 Class 12)
# =============================================================================

CHEMISTRY_LADDER: List[Dict[str, Any]] = [
    # --- Class 11 Chemistry (9 Chapters) ---
    {
        "exam": "NEET Ladder",
        "subject": "Chemistry",
        "topic": "Some Basic Concepts of Chemistry: Limiting Reagents in Sequential Reactions & Molarity vs Molality",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Chemistry Ch 1: Mole concept, stoichiometry, and limiting reagent definitions",
        "neet_gap_concept": "Sequential multi-step chemical reactions where product of reaction 1 serves as limiting reactant in reaction 2 with percentage yields < 100%; temperature dependence of molarity vs temperature invariance of molality",
        "prompt": "Create an authentic Class 11 to NEET Ladder question where a 10 g sample of impure calcium carbonate (CaCO3) is treated with excess dilute HCl. The evolved CO2 gas is passed into excess limewater to precipitate CaCO3 again with an overall recovery of 85%. Calculate the percentage purity of the original CaCO3 sample. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Chemistry",
        "topic": "Structure of Atom: Radial vs Angular Nodes, De Broglie Wavelength & Quantum Numbers",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Chemistry Ch 2: Quantum numbers n, l, m_l, s and Bohr radius r = a0 * n^2 / Z",
        "neet_gap_concept": "Total number of radial nodes (n - l - 1) and angular nodes (l) in hydrogenic wavefunctions Psi(r, theta, phi); Heisenberg uncertainty principle for microscopic vs macroscopic particles under relativistic velocities",
        "prompt": "Create an authentic Class 11 to NEET Ladder question identifying an orbital with principal quantum number n and azimuthal quantum number l that possesses 2 radial nodes and 1 angular node. Calculate its orbital angular momentum and maximum number of electrons it can accommodate. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Chemistry",
        "topic": "Classification of Elements and Periodicity: Ionization Enthalpy Anomalies & Inert Pair Effect",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Chemistry Ch 3: Periodic trends in atomic radii, ionization enthalpy, and electronegativity",
        "neet_gap_concept": "Inversion in first ionization enthalpy between Be (2s^2 filled) > B (2p^1) and N (half-filled 2p^3) > O (2p^4 paired); inert pair effect causing Tl(+1) > Tl(+3) and Pb(+2) > Pb(+4) stability",
        "prompt": "Create an authentic Class 11 to NEET Ladder question comparing the first and second ionization enthalpies of group 13 elements (B, Al, Ga, In, Tl). Account for the anomalous jump between Al and Ga due to poor shielding of 3d electrons (d-block contraction), and order their first ionization enthalpies correctly. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Chemistry",
        "topic": "Chemical Bonding and Molecular Structure: Molecular Orbital Theory (MOT) & Bond Order Anomalies",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Chemistry Ch 4: VSEPR theory, hybridization (sp, sp2, sp3), and basic MOT for homonuclear diatomics",
        "neet_gap_concept": "Mixing of 2s and 2p orbitals (sp-mixing) for molecules with <= 14 electrons (B2, C2, N2) flipping sigma_2p_z above pi_2p_x/y; paramagnetic nature of B2 and O2, and fractional bond order of O2+, O2-, O2(2-)",
        "prompt": "Create an authentic Class 11 to NEET Ladder question comparing the bond length and magnetic properties of O2, O2+, O2-, and O2(2-) using Molecular Orbital Theory. Show why O2 and B2 are paramagnetic despite having an even number of electrons, and arrange the oxygen species in increasing order of bond order. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Chemistry",
        "topic": "Chemical Thermodynamics: Hess's Law, Lattice Enthalpy & Born-Haber Cycle",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Chemistry Ch 5: First law Delta_U = q + w, enthalpy Delta_H = Delta_U + P*Delta_V, and Hess's law",
        "neet_gap_concept": "Constructing complete Born-Haber cycles for ionic solids (sublimation, ionization, dissociation, electron gain, and lattice enthalpy); non-spontaneous processes driven by positive entropy change at high temperatures (Delta_G = Delta_H - T*Delta_S < 0)",
        "prompt": "Create an authentic Class 11 to NEET Ladder question calculating the lattice enthalpy of magnesium chloride (MgCl2) using a Born-Haber cycle given standard enthalpies of formation, sublimation of Mg, first and second ionization enthalpies of Mg, bond dissociation energy of Cl2, and electron gain enthalpy of Cl. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Chemistry",
        "topic": "Equilibrium: Buffer Action, Henderson-Hasselbalch Equation & Solubility Product Precipitation",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Chemistry Ch 6: Equilibrium constant K_c, Le Chatelier principle, pH = -log[H+], and K_sp = [A+]^m [B-]^n",
        "neet_gap_concept": "Buffer capacity and pH changes upon adding strong acid/base; selective precipitation of metal sulfides in qualitative salt analysis using common ion effect of H+ in Group II vs NH4OH/NH4Cl in Group III",
        "prompt": "Create an authentic Class 11 to NEET Ladder question where 0.1 M acetic acid (Ka = 1.8e-5) is mixed with 0.1 M sodium acetate to form a buffer solution. Calculate the change in pH when 0.01 moles of gaseous HCl are bubbled into 1 liter of this buffer solution, and compare it with adding HCl to pure water. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Chemistry",
        "topic": "Redox Reactions: Ion-Electron Balancing in Alkaline Media & Disproportionation Feasibility",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Chemistry Ch 7: Oxidation numbers, balancing redox reactions by oxidation number method",
        "neet_gap_concept": "Balancing complex disproportionation reactions in strongly alkaline medium (e.g., P4 + OH- -> PH3 + H2PO2-, or Cl2 + hot concentrated NaOH -> NaCl + NaClO3); predicting disproportionation from Latimer standard reduction potential diagrams",
        "prompt": "Create an authentic Class 11 to NEET Ladder question balancing the redox disproportionation reaction of white phosphorus (P4) in concentrated sodium hydroxide (NaOH) solution forming phosphine (PH3) and sodium hypophosphite (NaH2PO2). Determine the equivalent weight of P4 in this reaction in terms of its molecular weight M. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Chemistry",
        "topic": "Organic Chemistry - Principles & Techniques: Hyperconjugation, Inductive vs Mesomeric & Carbocation Shifts",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Chemistry Ch 8: IUPAC nomenclature, inductive effect, resonance, and basic carbocation stability (3 deg > 2 deg > 1 deg)",
        "neet_gap_concept": "Hyperconjugation (Baker-Nathan effect) involving alpha-C-H sigma bonds into empty p-orbitals; 1,2-hydride and 1,2-methyl shifts to relieve ring strain or form more stable resonance-stabilized allylic/benzylic carbocations",
        "prompt": "Create an authentic Class 11 to NEET Ladder question involving the addition of HBr to 3,3-dimethyl-1-butene. Explain why the major product is 2-bromo-2,3-dimethylbutane rather than the direct Markovnikov addition product, tracing the step-by-step carbocation rearrangement (1,2-methyl shift). Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Chemistry",
        "topic": "Hydrocarbons: Markovnikov vs Anti-Markovnikov Addition, Aromaticity & Ozonolysis of Polyenes",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Chemistry Ch 9: Electrophilic addition to alkenes, Markovnikov's rule, and Huckel's rule (4n + 2) pi electrons",
        "neet_gap_concept": "Peroxide effect (Kharasch effect) operating strictly for HBr (free radical mechanism) but failing for HCl and HI due to unfavourable thermodynamics of elementary steps; reductive ozonolysis deduction of branched polyene structures",
        "prompt": "Create an authentic Class 11 to NEET Ladder question where an unknown alkene of molecular formula C6H12 on reductive ozonolysis with O3 / Zn-H2O produces acetone and propanal in equimolar amounts. Deduce the IUPAC name of the alkene, and predict the stereochemical product when it reacts with Br2 in CCl4. Include 4 options."
    },

    # --- Class 12 Chemistry (10 Chapters) ---
    {
        "exam": "NEET Ladder",
        "subject": "Chemistry",
        "topic": "Solutions: Abnormal Molar Mass, Van 't Hoff Factor & Colligative Property Deviations",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Chemistry Ch 1: Raoult's law, elevation of boiling point Delta_Tb = K_b * m, depression of freezing point Delta_Tf = K_f * m",
        "neet_gap_concept": "Van 't Hoff factor i for weak electrolytes with degree of dissociation alpha: i = 1 + (n - 1)*alpha; association of benzoic acid in non-polar solvents (dimerization) giving i < 1: i = 1 - (1 - 1/n)*beta",
        "prompt": "Create an authentic Class 12 to NEET Ladder question where 0.2 molal aqueous solution of a weak monobasic acid HX is 20% ionized. Given Kf for water = 1.86 K kg/mol, calculate the freezing point depression Delta_Tf of the solution and determine the apparent molecular weight of HX. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Chemistry",
        "topic": "Electrochemistry: Nernst Equation in Concentration Cells & pH-Dependent Cell Potential",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Chemistry Ch 2: Standard electrode potential E0, Nernst equation E = E0 - (0.0591/n)*log(Q)",
        "neet_gap_concept": "Concentration cells with identical electrodes operating purely on concentration gradient (E0_cell = 0); hydrogen electrode potential depending directly on pH: E = -0.0591 * pH",
        "prompt": "Create an authentic Class 12 to NEET Ladder question for a concentration cell consisting of two hydrogen electrodes immersed in solutions of pH = 3 and pH = 6 at 298 K. Calculate the EMF of the cell, write the cell reaction, and identify which electrode acts as the anode. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Chemistry",
        "topic": "Chemical Kinetics: Arrhenius Equation, Activation Energy & Parallel / Reversible Reactions",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Chemistry Ch 3: Rate law, integrated rate equation for first order ln[A] = ln[A]0 - k*t, and Arrhenius equation k = A*exp(-Ea/RT)",
        "neet_gap_concept": "Effect of a catalyst lowering Ea equally for forward and backward reactions without shifting equilibrium constant; parallel competing first-order reactions A -> B (k1) and A -> C (k2) where ratio [B]/[C] = k1/k2 at all times",
        "prompt": "Create an authentic Class 12 to NEET Ladder question where the rate constant of a reaction triples when the temperature is raised from 300 K to 310 K. Calculate the activation energy Ea of the reaction using the Arrhenius equation. In the presence of a catalyst at 300 K, the rate is identical to the uncatalyzed rate at 310 K; calculate the reduction in activation energy caused by the catalyst. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Chemistry",
        "topic": "The d- and f-Block Elements: Lanthanoid Contraction, Magnetic Moments & Variable Oxidation States",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Chemistry Ch 4: Electronic configuration of transition metals, variable oxidation states, and spin-only magnetic moment mu = sqrt(n*(n+2)) BM",
        "neet_gap_concept": "Lanthanoid contraction resulting in nearly identical covalent radii of 4d and 5d pairs (Zr/Hf and Nb/Ta); disproportionation of MnO4(2-) in acidic medium to MnO4- and MnO2",
        "prompt": "Create an authentic Class 12 to NEET Ladder question explaining why Zr and Hf possess nearly identical atomic and ionic radii. Calculate the spin-only magnetic moment of Mn2+, Fe2+, and Cr3+ in their gaseous states, and write the balanced ionic equation for the disproportionation of manganate ion (MnO4^2-) in acidic medium. Include 4 options."
    },
    {
        "exam": "JEE Main Ladder",
        "subject": "Chemistry",
        "topic": "Coordination Compounds: Crystal Field Splitting, Pairing Energy & Optical Isomerism",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Chemistry Ch 5: Werner's coordination theory, IUPAC nomenclature, and basic Crystal Field Theory (CFT)",
        "neet_gap_concept": "Spectrochemical series determining whether Delta_o > P (low spin, strong field) or Delta_o < P (high spin, weak field); d4 to d7 configurations in octahedral fields; optical resolution of cis-[Co(en)2Cl2]+ vs optical inactivity of trans isomer",
        "prompt": "Create an authentic Class 12 to JEE Main Ladder question comparing [CoF6]^3- and [Co(CN)6]^3-. Using Crystal Field Theory, draw the d-orbital splitting patterns (t2g and eg), calculate their Crystal Field Stabilization Energies (CFSE) and spin-only magnetic moments, and determine which isomer of [Co(en)2Cl2]+ is optically active. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Chemistry",
        "topic": "Haloalkanes and Haloarenes: SN1 vs SN2 Solvolysis, Stereochemical Inversion & Elimination Regiochemistry",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Chemistry Ch 6: Nucleophilic substitution reactions of alkyl halides",
        "neet_gap_concept": "Walden inversion in bimolecular SN2 (polar aprotic solvent, strong nucleophile) vs racemization with partial inversion in unimolecular SN1 (polar protic solvent, weak nucleophile); Saytzeff vs Hofmann elimination using bulky alkoxides like t-BuOK",
        "prompt": "Create an authentic Class 12 to NEET Ladder question comparing the reaction of 2-bromobutane with (i) alcoholic KOH at elevated temperature, and (ii) potassium tert-butoxide. Predict the major elimination product in each case (Saytzeff vs Hofmann rule) and explain the stereochemical outcome when (R)-2-bromobutane undergoes SN2 substitution with sodium cyanide in DMF. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Chemistry",
        "topic": "Alcohols, Phenols and Ethers: Acidity Comparison, Reimer-Tiemann Mechanism & Williamson Ether Synthesis",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Chemistry Ch 7: Preparation and reactions of alcohols, phenols, and ethers",
        "neet_gap_concept": "Phenol acidity enhanced by electron-withdrawing nitro groups (ortho/para vs meta); Williamson synthesis limitation: tertiary alkyl halides undergo elimination (E2 alkene) instead of substitution; electrophile in Reimer-Tiemann reaction is dichlorocarbene (:CCl2)",
        "prompt": "Create an authentic Class 12 to NEET Ladder question determining the best synthetic route for preparing tert-butyl methyl ether via Williamson synthesis. Explain what happens if sodium methoxide is reacted with tert-butyl bromide instead. Identify the electrophilic intermediate in the Reimer-Tiemann formylation of phenol and order o-nitrophenol, p-nitrophenol, and m-nitrophenol by acidity. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Chemistry",
        "topic": "Aldehydes, Ketones and Carboxylic Acids: Aldol Condensation vs Cannizzaro & Nucleophilic Addition",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Chemistry Ch 8: Carbonyl nucleophilic addition and alpha-hydrogen acidity",
        "neet_gap_concept": "Crossed aldol condensation with one enolizable and one non-enolizable partner; Cannizzaro hydride transfer mechanism for aldehydes lacking alpha-hydrogens (e.g., benzaldehyde, formaldehyde); Hell-Volhard-Zelinsky (HVZ) halogenation of carboxylic acids",
        "prompt": "Create an authentic Class 12 to NEET Ladder question where an equimolar mixture of benzaldehyde and formaldehyde is treated with concentrated aqueous NaOH (crossed Cannizzaro reaction). Predict which partner undergoes oxidation to carboxylate and which undergoes reduction to alcohol based on nucleophilic attack kinetics, and explain why. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Chemistry",
        "topic": "Amines: Basicity Trends in Gaseous vs Aqueous Medium & Diazonium Coupling Reactions",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Chemistry Ch 9: Classification of amines and basicity in terms of pKb",
        "neet_gap_concept": "Basicity order of methyl-substituted amines in aqueous medium (2 deg > 1 deg > 3 deg > NH3) vs ethyl-substituted amines (2 deg > 3 deg > 1 deg > NH3) due to competition between inductive effect, steric hindrance, and hydration enthalpy; diazonium salt azo dye coupling pH control (phenol in basic pH 9-10, aniline in mildly acidic pH 4-5)",
        "prompt": "Create an authentic Class 12 to NEET Ladder question comparing the basic strength of methylamines in aqueous solution versus in the gas phase. Explain why dimethylamine is more basic than trimethylamine in water despite trimethylamine having three electron-donating methyl groups, and specify the optimal pH for coupling benzenediazonium chloride with phenol. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Chemistry",
        "topic": "Biomolecules: Glucose Mutarotation, Peptide Linkage & Zwitterion Isoelectric Points",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Chemistry Ch 10: Carbohydrates classification, reducing vs non-reducing sugars, and amino acid zwitterions",
        "neet_gap_concept": "Mutarotation between alpha-D-glucopyranose and beta-D-glucopyranose via open-chain aldehyde equilibrium; amino acid isoelectric point pI = (pK_a1 + pK_a2)/2 where net electrical charge is zero and electrophoretic mobility ceases",
        "prompt": "Create an authentic Class 12 to NEET Ladder question on the mutarotation of D-glucose. Given the specific rotation of pure alpha-anomer (+112 deg) and pure beta-anomer (+19 deg), and the equilibrium rotation (+52.7 deg), calculate the percentage composition of alpha and beta forms at equilibrium. Calculate the isoelectric point pI of alanine given pKa1 = 2.34 and pKa2 = 9.69. Include 4 options."
    }
]

# =============================================================================
# 3. BIOLOGY (32 CHAPTERS: 19 Class 11 + 13 Class 12)
# =============================================================================

BIOLOGY_LADDER: List[Dict[str, Any]] = [
    # --- Class 11 Biology (19 Chapters) ---
    {
        "exam": "NEET Ladder",
        "subject": "Biology",
        "topic": "The Living World: Taxonomic Hierarchy, Universal Rules of Binomial Nomenclature & Herbarium Criteria",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Biology Ch 1: Binomial nomenclature proposed by Linnaeus and taxonomic ranks (Kingdom to Species)",
        "neet_gap_concept": "Strict Latinized naming rules: tautonyms valid in zoological nomenclature (e.g., Naja naja) but strictly forbidden in botanical nomenclature (ICBN); descending taxonomic categories where shared characters increase while generality decreases",
        "prompt": "Create an authentic Class 11 to NEET Ladder question evaluating four statements on the International Code of Botanical Nomenclature (ICBN) and taxonomic hierarchy. Test student understanding on why tautonyms are invalid for plants, the exact formatting of author citation, and how the degree of shared morphological features varies between Family and Genus. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Biology",
        "topic": "Biological Classification: Five Kingdom System, Archaebacteria Cell Wall & Fungal Dikaryophase",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Biology Ch 2: Whittaker's five kingdoms (Monera, Protista, Fungi, Plantae, Animalia)",
        "neet_gap_concept": "Branched chain ether lipids in Archaebacterial cell membranes conferring extreme thermophile resistance; delayed karyogamy in Ascomycetes and Basidiomycetes establishing an intervening dikaryotic stage (n + n)",
        "prompt": "Create an authentic Class 11 to NEET Ladder question comparing Archaebacteria with Eubacteria and analyzing the life cycle of fungi. Explain what molecular feature in the cell wall/membrane allows Methanogens to survive in extreme anaerobic conditions, and identify the specific fungal classes that exhibit an explicit dikaryophase before nuclear fusion. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Biology",
        "topic": "Plant Kingdom: Alternation of Generations, Haplodiplontic Bryophyte Cycles & Gymnosperm Ovules",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Biology Ch 3: Cryptogams vs Phanerogams, gametophyte (n) and sporophyte (2n) stages",
        "neet_gap_concept": "Independent vs dependent gametophyte: in Bryophytes sporophyte is parasitic on dominant gametophyte; in Pteridophytes both are independent; in Gymnosperms female gametophyte is completely retained within ovule (endosperm is haploid, formed before fertilization)",
        "prompt": "Create an authentic Class 11 to NEET Ladder question comparing the ploidy of endosperm in Gymnosperms (Pinus) versus Angiosperms, and identifying the ecological stage where vascular tissue (xylem/phloem) first appears without vessels. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Biology",
        "topic": "Animal Kingdom: Coelom Evolution, Canal Systems in Porifera & Chordate vs Non-Chordate Hallmarks",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Biology Ch 4: Levels of organization, symmetry, diploblastic vs triploblastic, and coelom classification",
        "neet_gap_concept": "Pseudocoelom in Aschelminthes (mesoderm scattered as pouches); true enterocoelom vs schizocoelom; water vascular system in Echinodermata (locomotion) vs water canal system in Sponges (food gathering/respiration via choanocytes)",
        "prompt": "Create an authentic Class 11 to NEET Ladder question identifying an organism that exhibits bilateral symmetry in larval stage but radial symmetry in adult stage. Test coelom categorization and identify which phylum possesses choanocyte-lined spongocoel and open water canal circulation. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Biology",
        "topic": "Morphology of Flowering Plants: Placentation Types, Floral Formulas & Root/Stem Modifications",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Biology Ch 5: Flower parts (calyx, corolla, androecium, gynoecium) and ovary positions",
        "neet_gap_concept": "Deciphering floral formulas of Solanaceae, Fabaceae, and Liliaceae; identifying parietal placentation (Mustard, Argemone with false septum replum) vs axile (Tomato, Lemon) and free-central (Dianthus, Primrose)",
        "prompt": "Create an authentic Class 11 to NEET Ladder question presenting a standard floral formula of a medicinally or economically important plant family. Test distinguishing floral features: vexillary aestivation and diadelphous stamens in Fabaceae versus epipetalous stamens with bicarpellary obligately tilted ovary in Solanaceae. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Biology",
        "topic": "Anatomy of Flowering Plants: Dicot vs Monocot Vascular Anatomy, Casparian Strips & Secondary Growth",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Biology Ch 6: Primary plant tissues (xylem, phloem, parenchyma, collenchyma, sclerenchyma)",
        "neet_gap_concept": "Suberin deposition in radial walls of endodermal cells (Casparian strip) forcing symplastic water movement; open vascular bundles with cambium in dicot stems undergoing secondary growth vs closed scattered bundles in monocot stems lacking cambium",
        "prompt": "Create an authentic Class 11 to NEET Ladder question comparing cross-sections of a sunflower stem (dicot) and maize stem (monocot). Focus on the nature of vascular bundles (radial/conjoint, open/closed, presence of bundle sheath) and explain how spring wood differs from autumn wood in annual ring formation. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Biology",
        "topic": "Structural Organisation in Animals: Epithelial Junctions & Cockroach Organ Systems",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Biology Ch 7: Epithelial, connective, muscular, and neural animal tissues",
        "neet_gap_concept": "Cell junctions: tight junctions (leak prevention) vs adhering junctions (cementing) vs gap junctions (ionic communication); cockroach open circulatory system with 13-chambered heart and Malpighian tubules excreting potassium urate",
        "prompt": "Create an authentic Class 11 to NEET Ladder question identifying the specific type of animal tissue junction responsible for rapid transfer of ions and small molecules between adjacent cardiac myocytes, and test student mastery on the excretion mechanism of Periplaneta americana (cockroach). Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Biology",
        "topic": "Cell: The Unit of Life: Fluid Mosaic Membrane Dynamics & Endomembrane Coordination",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Biology Ch 8: Cell theory, prokaryotic vs eukaryotic organelles, Singer-Nicolson fluid mosaic model",
        "neet_gap_concept": "Components belonging to the coordinated endomembrane system (Endoplasmic Reticulum, Golgi apparatus, Lysosomes, Vacuoles) vs semi-autonomous organelles excluded from it (Mitochondria, Chloroplasts, Peroxisomes); 70S vs 80S ribosomal subunits",
        "prompt": "Create an authentic Class 11 to NEET Ladder question evaluating the structural and functional coordination of the endomembrane system. Test why peroxisomes and mitochondria are excluded from the endomembrane system despite being membrane-bound, and explain the role of flippase in lipid bilayer asymmetry. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Biology",
        "topic": "Biomolecules: Enzyme Kinetics, Competitive Inhibition & Protein Quaternary Conformations",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Biology Ch 9: Amino acids, peptide bonds, nucleotides, and enzyme activation energy reduction",
        "neet_gap_concept": "Lineweaver-Burk and Michaelis-Menten dynamics: competitive inhibitor increases apparent K_m without changing V_max (e.g., malonate competing with succinate for succinate dehydrogenase); non-competitive inhibitor decreases V_max leaving K_m unchanged",
        "prompt": "Create an authentic Class 11 to NEET Ladder question on the inhibition of succinic dehydrogenase by malonic acid. Present Michaelis-Menten kinetic curves showing substrate concentration versus reaction velocity, and deduce the mathematical effect on Km and Vmax. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Biology",
        "topic": "Cell Cycle and Cell Division: Meiotic Recombination in Pachynema & Checkpoint Control",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Biology Ch 10: Mitosis phases (Prophase, Metaphase, Anaphase, Telophase) and Meiosis I & II",
        "neet_gap_concept": "Recombinase enzyme driving crossing over between non-sister chromatids of homologous chromosomes in Pachynema; dissolution of synaptonemal complex in Diplonema revealing chiasmata; G1/S and G2/M cyclin-dependent kinase checkpoints",
        "prompt": "Create an authentic Class 11 to NEET Ladder question tracking the chromosome number (2n) and DNA content (C) of a mammalian cell starting from G1 phase through S phase, G2 phase, Anaphase I, and completion of Telophase II. Pinpoint the exact substage of Prophase I where the synaptonemal complex dissolves. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Biology",
        "topic": "Photosynthesis in Higher Plants: Z-Scheme, Cyclic Photophosphorylation & C4 Kranz Anatomy",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Biology Ch 11: Light reaction in thylakoid membrane, photolysis of water, and dark reaction Calvin cycle in stroma",
        "neet_gap_concept": "Non-cyclic photophosphorylation produces ATP + NADPH involving both PS II (P680) and PS I (P700); cyclic photophosphorylation in stroma lamellae produces ATP only; C4 Kranz anatomy spatial separation preventing photorespiration (Rubisco oxygenase activity)",
        "prompt": "Create an authentic Class 11 to NEET Ladder question comparing the ATP and NADPH energy requirements for synthesizing one molecule of glucose in a C3 plant versus a C4 plant. Explain why bundle sheath cells in C4 plants lack PS II and have granal or agranal chloroplasts. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Biology",
        "topic": "Respiration in Plants: Glycolysis Energy Balance, Krebs Cycle Dehydrogenation & Respiratory Quotient",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Biology Ch 12: Glycolysis (EMP pathway), tricarboxylic acid (TCA) cycle, and oxidative phosphorylation in inner mitochondrial membrane",
        "neet_gap_concept": "Substrate-level phosphorylation steps in glycolysis (1,3-BPG -> 3-PGA and PEP -> pyruvate) vs Krebs cycle (succinyl-CoA -> succinate); Respiratory Quotient (RQ = CO2 evolved / O2 consumed) being < 1 for tripalmitin fat (0.7) and proteins (0.9)",
        "prompt": "Create an authentic Class 11 to NEET Ladder question calculating the net ATP yield from complete aerobic oxidation of one molecule of glucose using the modern 2.5 ATP/NADH and 1.5 ATP/FADH2 stoichiometry. Calculate the Respiratory Quotient (RQ) when tripalmitin (C51H98O6) is oxidized as respiratory substrate. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Biology",
        "topic": "Plant Growth and Development: Phytohormone Antagonisms, Polar Auxin Transport & Photoperiodism",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Biology Ch 13: Plant growth regulators (auxins, gibberellins, cytokinins, ethylene, abscisic acid)",
        "neet_gap_concept": "Auxin/Cytokinin ratio determining organogenesis in tissue culture (high auxin -> root, high cytokinin -> shoot); Abscisic acid (stress hormone) closing stomata during water deficit by triggering potassium ion efflux from guard cells",
        "prompt": "Create an authentic Class 11 to NEET Ladder question on the physiological antagonism between Auxin (apical dominance) and Cytokinin (lateral bud outgrowth), and explain how phytochrome red (Pr) and far-red (Pfr) interconversions regulate flowering in short-day versus long-day plants. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Biology",
        "topic": "Breathing and Exchange of Gases: Oxygen-Hemoglobin Dissociation Curve & Bohr Effect",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Biology Ch 14: Respiratory volumes (TV, IRV, ERV, RV) and alveolar gas diffusion across respiratory membrane",
        "neet_gap_concept": "Sigmoid oxygen-hemoglobin dissociation curve shifting to the right (Bohr effect) due to increased pCO2, elevated H+ (decreased pH), elevated temperature, and 2,3-BPG, facilitating oxygen unloading at tissues",
        "prompt": "Create an authentic Class 11 to NEET Ladder question on the factors that cause a rightward shift in the oxygen-hemoglobin dissociation curve. Given a patient with hypoventilation leading to respiratory acidosis, analyze what happens to oxygen delivery to skeletal muscles and calculate the vital capacity (VC) from given spirometry lung volumes. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Biology",
        "topic": "Body Fluids and Circulation: Cardiac Cycle Pressure Phases, ECG Waves & Double Circulation",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Biology Ch 15: Heart chambers, nodal tissue (SAN, AVN), and standard ECG deflection waves",
        "neet_gap_concept": "Isovolumetric contraction and relaxation phases where ventricular pressure changes drastically while ventricular blood volume remains constant (all valves closed); electrical events of ECG: P wave = atrial depolarization, QRS = ventricular depolarization, T wave = ventricular repolarization",
        "prompt": "Create an authentic Class 11 to NEET Ladder question correlating the heart sounds (LUB and DUB) with specific mechanical and electrical events in the cardiac cycle. Identify during which cardiac phase the coronary blood flow to the left ventricle is maximum, and interpret an ECG showing an abnormally prolonged P-R interval. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Biology",
        "topic": "Excretory Products and Their Elimination: Counter-Current Multiplier & RAAS Hormonal Regulation",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Biology Ch 16: Nephron structure (glomerulus, Bowman's capsule, PCT, Loop of Henle, DCT, collecting duct)",
        "neet_gap_concept": "Counter-current multiplier in Loop of Henle (descending limb permeable to water only, ascending limb impermeable to water and active NaCl transport) establishing hyperosmolar medullary gradient (1200 mOsm/L); Renin-Angiotensin-Aldosterone System (RAAS) feedback",
        "prompt": "Create an authentic Class 11 to NEET Ladder question tracing the osmolarity of tubular fluid from the proximal convoluted tubule (300 mOsm/L) down the hairpin loop of Henle to the collecting duct. Explain how antidiuretic hormone (ADH / vasopressin) acts on aquaporin-2 channels in the collecting duct during dehydration. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Biology",
        "topic": "Locomotion and Movement: Sliding Filament Theory, Calcium Binding to Troponin & Muscle Twitches",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Biology Ch 17: Sarcomere structure (A-band, I-band, H-zone, Z-line) and sliding filament mechanism",
        "neet_gap_concept": "Calcium ions released from sarcoplasmic reticulum bind to Troponin C, unmasking active myosin-binding sites on actin; ATP hydrolysis causes myosin head detachment from actin; during contraction, I-band and H-zone shorten while A-band length remains strictly constant",
        "prompt": "Create an authentic Class 11 to NEET Ladder question evaluating structural changes in a sarcomere during maximal skeletal muscle contraction. Explain why rigor mortis occurs after death in terms of ATP depletion and cross-bridge detachment failure, and identify which sub-unit of troponin binds calcium ions. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Biology",
        "topic": "Neural Control and Coordination: Action Potential Generation, Saltatory Conduction & Synaptic Vesicles",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Biology Ch 18: Neuron anatomy (dendrites, axon, myelin sheath) and reflex arc",
        "neet_gap_concept": "Resting membrane potential (-70 mV maintained by 3 Na+ out / 2 K+ in ATPase pump); threshold depolarization (-55 mV) triggering voltage-gated Na+ channel opening; saltatory conduction across nodes of Ranvier; calcium influx at axon terminal triggering acetylcholine exocytosis",
        "prompt": "Create an authentic Class 11 to NEET Ladder question on the ionic basis of the nerve impulse. Explain the sequence of voltage-gated ion channel conductance changes during depolarization, overshoot (+30 mV), repolarization, and hyperpolarization, and calculate the speed advantage of saltatory conduction in myelinated fibers. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Biology",
        "topic": "Chemical Coordination and Integration: Peptide vs Steroid Hormone Signaling & Pituitary Feedback",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Biology Ch 19: Endocrine glands (pituitary, thyroid, adrenal, pancreas, gonads) and hormones",
        "neet_gap_concept": "Water-soluble peptide hormones (e.g., insulin, adrenaline, FSH) binding extracellular membrane receptors and generating secondary messengers (cAMP, IP3, Ca2+) vs lipid-soluble steroid hormones (estrogen, cortisol, testosterone) crossing membrane to bind intracellular nuclear receptors directly",
        "prompt": "Create an authentic Class 11 to NEET Ladder question comparing the biochemical mechanisms of action of Epinephrine (secondary messenger cascade) versus Cortisol (intracellular nuclear receptor and gene transcription). Test negative feedback loops in the hypothalamo-pituitary-adrenal (HPA) axis under chronic stress. Include 4 options."
    },

    # --- Class 12 Biology (13 Chapters) ---
    {
        "exam": "NEET Ladder",
        "subject": "Biology",
        "topic": "Sexual Reproduction in Flowering Plants: Microsporogenesis, Megasporogenesis & Double Fertilization",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Biology Ch 1: Pollen grain structure, embryo sac structure (7-celled, 8-nucleate), and double fertilization",
        "neet_gap_concept": "Double fertilization yielding diploid zygote (syngamy) and triploid primary endosperm nucleus (triple fusion); outbreeding devices preventing autogamy and geitonogamy; apomixis producing diploid seeds without meiosis",
        "prompt": "Create an authentic Class 12 to NEET Ladder question on a typical angiosperm ovule with a 7-celled 8-nucleate monosporic Polygonum embryo sac. Calculate the total number of meiotic divisions required to produce 100 viable seeds, taking into account microsporogenesis and megasporogenesis. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Biology",
        "topic": "Human Reproduction: Spermatogenesis vs Oogenesis, Hormonal Surges & Implantation",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Biology Ch 2: Male and female reproductive systems, gametogenesis, and menstrual cycle",
        "neet_gap_concept": "Oogenesis arrest at Diplotene of Prophase I until puberty, and second meiotic arrest at Metaphase II completed only upon sperm entry; LH surge triggering ovulation on day 14; human chorionic gonadotropin (hCG) maintaining corpus luteum",
        "prompt": "Create an authentic Class 12 to NEET Ladder question tracking the precise hormonal concentrations of GnRH, LH, FSH, Estrogen, and Progesterone across a 28-day human menstrual cycle. Explain what hormonal trigger causes ovulation and analyze what happens if fertilization does not take place. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Biology",
        "topic": "Reproductive Health: Assisted Reproductive Technologies (ART) & Contraceptive Modes of Action",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Biology Ch 3: Population stabilization, contraception methods, and infertility management",
        "neet_gap_concept": "Distinction between ZIFT (zygote/embryo up to 8 blastomeres transferred into fallopian tube) vs IUT (embryo with > 8 blastomeres transferred into uterus); non-medicated IUD (Lippes loop) vs copper-releasing (CuT, Cu7) vs hormone-releasing (LNG-20, Progestasert)",
        "prompt": "Create an authentic Class 12 to NEET Ladder question matching clinical infertility scenarios to the appropriate Assisted Reproductive Technology (ART: IVF-ET, ZIFT, GIFT, ICSI, IUI). Explain the contraceptive mechanism of action of copper ions released by Cu-T on sperm motility and fertilizing capacity. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Biology",
        "topic": "Principles of Inheritance and Variation: Morgan's Linkage, Recombination Mapping & Chromosomal Aberrations",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Biology Ch 4: Mendel's laws of inheritance (segregation, independent assortment) and monohybrid/dihybrid ratios",
        "neet_gap_concept": "Deviation from Mendel's 9:3:3:1 ratio when genes are linked on the same chromosome; Morgan's Drosophila crosses showing recombinant frequencies; 1 map unit (centiMorgan) = 1% recombination frequency used for chromosome gene mapping",
        "prompt": "Create an authentic Class 12 to NEET Ladder question on three linked genes A, B, and C in Drosophila with recombination frequencies: A-B = 10%, B-C = 15%, A-C = 5%. Determine the correct linear order of genes on the chromosome, and calculate the expected frequency of double crossovers if interference is zero. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Biology",
        "topic": "Molecular Basis of Inheritance: Semi-Conservative Replication, Genetic Code & Lac Operon Regulation",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Biology Ch 5: DNA structure (Watson-Crick model), central dogma, and transcription/translation",
        "neet_gap_concept": "Meselson and Stahl experimental density gradient centrifugation using 15N and 14N; Okazaki fragment synthesis on lagging strand by DNA polymerase III; Lac operon negative regulation (LacI repressor bound to operator) released by allolactose inducer",
        "prompt": "Create an authentic Class 12 to NEET Ladder question where E. coli cells grown in 15N medium for several generations are transferred to 14N medium. Calculate the proportion of hybrid (15N/14N) and light (14N/14N) DNA molecules after 3 generations of replication (60 minutes). Explain how the Lac operon responds in the presence of both glucose and lactose. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Biology",
        "topic": "Evolution: Hardy-Weinberg Equilibrium Calculations, Natural Selection Types & Adaptive Radiation",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Biology Ch 6: Theories of evolution (Lamarck, Darwin), fossil evidence, and homologous vs analogous organs",
        "neet_gap_concept": "Hardy-Weinberg equilibrium equation p^2 + 2pq + q^2 = 1 under assumptions of random mating and absence of selection/migration; types of natural selection: stabilizing (favors mean), directional (shifts mean), and disruptive (bimodal peaks)",
        "prompt": "Create an authentic Class 12 to NEET Ladder question where in a random-mating population in Hardy-Weinberg equilibrium, the frequency of an autosomal recessive trait (cystic fibrosis) is 1 in 10,000. Calculate the allele frequencies p and q, and determine the percentage of individuals in the population who are heterozygous carriers. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Biology",
        "topic": "Human Health and Disease: Innate vs Adaptive Immunity, Retroviral HIV Cycle & Plasmodium Life Stages",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Biology Ch 7: Common infectious diseases (typhoid, pneumonia, malaria) and basic immune system components",
        "neet_gap_concept": "Humoral immunity (B cells, antibodies with H2L2 structure) vs cell-mediated immunity (T helper, cytotoxic T cells responsible for graft rejection); Plasmodium sporozoite infection in liver hepatocytes -> merozoite erythrocytic schizogony releasing hemozoin toxin",
        "prompt": "Create an authentic Class 12 to NEET Ladder question on the life cycle of Plasmodium vivax. Identify in which host sexual reproduction occurs (female Anopheles gut) versus where asexual multiple fission (schizogony) occurs. Trace the replication cycle of HIV in human helper T cells (CD4+) via reverse transcriptase. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Biology",
        "topic": "Microbes in Human Welfare: Biological Sewage Treatment, BOD Dynamics & Industrial Fermentation",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 11/12 Biology: Microbes in household products, industrial production, sewage treatment, and biocontrol",
        "neet_gap_concept": "Secondary (biological) sewage treatment: aerobic flocs reducing Biochemical Oxygen Demand (BOD), followed by anaerobic sludge digesters producing biogas (methane, CO2, H2S); bioactive molecules: Cyclosporin A (immunosuppressive from Trichoderma) and Statins (Monascus)",
        "prompt": "Create an authentic Class 12 to NEET Ladder question tracing the changes in Biochemical Oxygen Demand (BOD) and dissolved oxygen levels in a river polluted by untreated domestic sewage. Match fungal and bacterial species to their industrial bioactive products (Statins, Cyclosporin A, Streptokinase, Citric acid). Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Biology",
        "topic": "Biotechnology - Principles and Processes: Restriction Endonucleases, pBR322 Vector & Gel Electrophoresis",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Biology Ch 9: Recombinant DNA technology tools, restriction enzymes, and PCR amplification",
        "neet_gap_concept": "Palindromic recognition sequences generating sticky vs blunt ends; insertional inactivation of selectable markers (e.g., foreign gene inserted into BamHI site of tet^R gene in pBR322 makes transformants ampicillin-resistant but tetracycline-sensitive); PCR cycle phases (denaturation, annealing, extension by Taq polymerase)",
        "prompt": "Create an authentic Class 12 to NEET Ladder question where a foreign DNA fragment is ligated into the PstI restriction site located within the ampicillin resistance gene (ampR) of plasmid vector pBR322. Detail how recombinant colonies are selected via replica plating, and calculate the number of double-stranded DNA copies produced after 30 PCR cycles. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Biology",
        "topic": "Biotechnology and Its Applications: Bt Toxin Mechanism, RNA Interference & ADA Gene Therapy",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Biology Ch 10: Applications of biotechnology in agriculture (Bt cotton, pest resistance) and medicine",
        "neet_gap_concept": "Bt crystalline endotoxin protein (Cry protoxin) activated by alkaline pH of insect midgut, binding epithelial cell surface and creating pores causing lysis; RNA interference (RNAi) silencing specific mRNA in Meloidogyne incognita using dsRNA; retroviral vector ADA gene therapy",
        "prompt": "Create an authentic Class 12 to NEET Ladder question explaining why Bacillus thuringiensis does not kill itself with the toxic Cry proteins it synthesizes. Detail the cellular mechanism of RNA interference (RNAi) in nematode-resistant tobacco plants, distinguishing the roles of Dicer and RISC complexes. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Biology",
        "topic": "Organisms and Populations: Population Growth Equations (Exponential vs Logistic) & Ecological Interactions",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Biology Ch 11: Organism adaptations, population attributes (natality, mortality), and species interactions",
        "neet_gap_concept": "Exponential growth dN/dt = r*N (unlimited resources) vs Verhulst-Pearl logistic growth dN/dt = r*N*((K - N)/K) (carrying capacity K); species interactions: mutualism (+/+), competition (-/-), amensalism (-/0, e.g., Penicillium inhibiting bacteria), commensalism (+/0)",
        "prompt": "Create an authentic Class 12 to NEET Ladder question on a population exhibiting Verhulst-Pearl logistic growth with intrinsic rate of increase r = 0.2 and carrying capacity K = 1000. Calculate the population growth rate dN/dt when population size N is 200, 500, and 1000, and show at which value of N the growth rate is maximal. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Biology",
        "topic": "Ecosystem: Energy Flow 10% Law, Ecological Pyramids Inversions & Biogeochemical Cycles",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Biology Ch 12: Ecosystem structure, trophic levels, Lindeman's 10 percent law, and food chains",
        "neet_gap_concept": "Pyramid of energy is always strictly upright (second law of thermodynamics); inverted pyramid of biomass in aquatic ecosystems (standing crop of phytoplankton is smaller than zooplankton); gaseous (carbon, nitrogen) vs sedimentary (phosphorus) biogeochemical cycles",
        "prompt": "Create an authentic Class 12 to NEET Ladder question comparing the pyramids of biomass in a terrestrial grassland ecosystem versus a deep marine aquatic ecosystem. Explain why the marine biomass pyramid is inverted, and calculate the energy reaching the tertiary consumer if net primary productivity at producer level is 20,000 kJ. Include 4 options."
    },
    {
        "exam": "NEET Ladder",
        "subject": "Biology",
        "topic": "Biodiversity and Conservation: Species-Area Relationship Equation & In-situ vs Ex-situ Strategies",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Biology Ch 13: Genetic, species, and ecological diversity; IUCN red list categories",
        "neet_gap_concept": "Alexander von Humboldt's species-area relationship log S = log C + Z * log A, where slope Z lies between 0.1 to 0.2 for small regions but steepens to 0.6 to 1.2 for entire continents; distinguishing In-situ (National parks, Sanctuaries, Biosphere reserves) from Ex-situ (Botanical gardens, Zoological parks, Cryopreservation)",
        "prompt": "Create an authentic Class 12 to NEET Ladder question applying Alexander von Humboldt's species-area mathematical formula log S = log C + Z * log A. Calculate the percentage increase in species richness S if habitat area A is quadrupled, given regression coefficient Z = 0.5. Classify cryopreservation of gametes under appropriate conservation methodology. Include 4 options."
    }
]

# =============================================================================
# 4. MATHEMATICS (28 CHAPTERS: 14 Class 11 + 14 Class 12)
# =============================================================================

MATHEMATICS_LADDER: List[Dict[str, Any]] = [
    # --- Class 11 Mathematics (14 Chapters) ---
    {
        "exam": "JEE Main Ladder",
        "subject": "Mathematics",
        "topic": "Sets: Subsets, Power Sets & Inclusion-Exclusion Principle for Three Sets",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Math Ch 1: Set operations (union, intersection, difference) and n(A U B) = n(A) + n(B) - n(A n B)",
        "neet_gap_concept": "Inclusion-Exclusion principle for three sets: n(A U B U C) = sum(n(A)) - sum(n(A n B)) + n(A n B n C); calculating the exact number of elements belonging to exactly two sets vs at least two sets",
        "prompt": "Create an authentic Class 11 to JEE Main Ladder question where in a group of 100 students, 50 play cricket, 40 play football, and 35 play tennis. 20 play cricket and football, 15 play football and tennis, and 18 play cricket and tennis. If 10 students play all three sports, calculate the number of students who play exactly one sport and those who play none. Include 4 options."
    },
    {
        "exam": "JEE Main Ladder",
        "subject": "Mathematics",
        "topic": "Relations and Functions: Domain, Range & Bijectivity of Fractional / Radical Expressions",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Math Ch 2: Definition of relation, domain, range, and real-valued functions",
        "neet_gap_concept": "Finding domain and range of nested square roots and fractional parts: f(x) = sqrt(log_0.5(x^2 - 5x + 6)) where logarithmic base < 1 reverses the inequality; algebraic conditions for one-one and onto",
        "prompt": "Create an authentic Class 11 to JEE Main Ladder question finding the complete domain and range of the real-valued function f(x) = sqrt(log_{1/2}( (x - 1) / (x + 2) )). Include 4 options."
    },
    {
        "exam": "JEE Main Ladder",
        "subject": "Mathematics",
        "topic": "Trigonometric Functions: Range of a*cos(x) + b*sin(x) & Telescoping Trigonometric Products",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Math Ch 3: Compound angle formulas sin(A +- B), cos(A +- B), and multiple angle formulas",
        "neet_gap_concept": "Telescoping cosine product identity: cos(theta)*cos(2*theta)*cos(4*theta)...cos(2^(n-1)*theta) = sin(2^n*theta) / (2^n * sin(theta)); determining extrema of f(x) = a*cos(x) + b*sin(x) over restricted intervals [alpha, beta]",
        "prompt": "Create an authentic Class 11 to JEE Main Ladder question evaluating the exact product cos(2*pi/7) * cos(4*pi/7) * cos(8*pi/7) using telescoping sine duplication, and find the maximum and minimum values of f(x) = 3*cos(x) + 4*sin(x) on the interval [0, pi/2]. Include 4 options."
    },
    {
        "exam": "JEE Advanced Ladder",
        "subject": "Mathematics",
        "topic": "Complex Numbers: Geometric Transformations, Roots of Unity & Triangle Centers in Argand Plane",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Math Ch 4: Imaginary unit i = sqrt(-1), modulus |z|, conjugate z_bar, and quadratic equations with negative discriminant",
        "neet_gap_concept": "Geometric interpretation: |z - z1| / |z - z2| = k represents a circle of Apollonius for k != 1 and a perpendicular bisector for k = 1; properties of cube roots of unity (1 + omega + omega^2 = 0) and nth roots of unity sums",
        "prompt": "Create an authentic Class 11 to JEE Advanced Ladder question where complex numbers z1, z2, z3 represent the vertices of an equilateral triangle inscribed in the circle |z| = 2. If z1 = 1 + i*sqrt(3), find z2 and z3 using rotation operator exp(i*2*pi/3), and determine the locus of point z satisfying |z - 2| = 2*|z + 2|. Include 4 options."
    },
    {
        "exam": "JEE Main Ladder",
        "subject": "Mathematics",
        "topic": "Linear Inequalities: Systems of Two-Variable Inequalities & Feasible Solution Bounds",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Math Ch 5: Graphical representation of linear inequalities in two variables",
        "neet_gap_concept": "Finding the number of non-negative integer solutions (lattice points) bounded by the system a*x + b*y <= c, x >= 0, y >= 0; boundary inclusion rules",
        "prompt": "Create an authentic Class 11 to JEE Main Ladder question determining the exact number of integer pairs (x, y) satisfying the system of simultaneous inequalities: 2x + 3y <= 30, x - y >= 0, x >= 0, y >= 0. Include 4 options."
    },
    {
        "exam": "JEE Advanced Ladder",
        "subject": "Mathematics",
        "topic": "Permutations and Combinations: Derangements, Circular Permutations & Group Distribution",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Math Ch 6: Fundamental principle of counting, nPr = n!/(n-r)!, and nCr = n!/(r!(n-r)!)",
        "neet_gap_concept": "Subfactorial / Derangement formula D_n = n! * sum_{k=0}^n (-1)^k / k! for items where no element occupies its original position; distribution of n distinct items into k groups of specified sizes; circular permutations where clockwise and counter-clockwise are identical vs distinct",
        "prompt": "Create an authentic Class 11 to JEE Advanced Ladder question where 6 letters are addressed to 6 different persons and corresponding 6 envelopes are prepared. Calculate the probability that exactly 2 letters go into the correct envelopes while the remaining 4 letters are completely deranged. Include 4 options."
    },
    {
        "exam": "JEE Main Ladder",
        "subject": "Mathematics",
        "topic": "Binomial Theorem: Greatest Term, Divisibility Remainders & Binomial Coefficient Identities",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Math Ch 7: Binomial theorem for positive integral index (x + y)^n = sum C(n,r) * x^(n-r) * y^r",
        "neet_gap_concept": "Finding the numerically greatest term in (1 + x)^n for a given value of x; finding remainder using binomial expansion (e.g., 7^103 divided by 25); differentiation and integration of binomial series to compute coefficient sums",
        "prompt": "Create an authentic Class 11 to JEE Main Ladder question finding the remainder when 3^(2024) is divided by 100 using the binomial theorem expansion. Find the numerically greatest term in the expansion of (2 + 3x)^10 when x = 3/2. Include 4 options."
    },
    {
        "exam": "JEE Main Ladder",
        "subject": "Mathematics",
        "topic": "Sequences and Series: Arithmetico-Geometric Progression (AGP) & Telescoping Partial Fractions",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Math Ch 8: Arithmetic progressions a, a+d, a+2d and geometric progressions a, ar, ar^2",
        "neet_gap_concept": "Sum to infinity of an AGP S_inf = a/(1 - r) + d*r/(1 - r)^2 for |r| < 1; method of differences and telescoping summation sum_{r=1}^n 1 / (r*(r+1)*(r+2))",
        "prompt": "Create an authentic Class 11 to JEE Main Ladder question evaluating the sum to infinity of the Arithmetico-Geometric series: S = 1 + 4/5 + 7/25 + 10/125 + ... Evaluate the finite sum sum_{r=1}^50 1 / ( (2r - 1)*(2r + 1) ) using telescoping partial fractions. Include 4 options."
    },
    {
        "exam": "JEE Main Ladder",
        "subject": "Mathematics",
        "topic": "Straight Lines: Distance Between Parallel Lines, Family of Lines & Angle Bisectors",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Math Ch 9: Slope of a line, various forms of line equations, and perpendicular distance d = |ax1 + by1 + c| / sqrt(a^2 + b^2)",
        "neet_gap_concept": "Equation of angle bisectors: (a1*x + b1*y + c1)/sqrt(a1^2 + b1^2) = +- (a2*x + b2*y + c2)/sqrt(a2^2 + b2^2); distinguishing the acute angle bisector from the obtuse angle bisector using sign of a1*a2 + b1*b2; family of lines passing through fixed point",
        "prompt": "Create an authentic Class 11 to JEE Main Ladder question finding the equation of the acute angle bisector between the lines 3x - 4y + 7 = 0 and 12x + 5y - 2 = 0. Verify whether the origin lies in the acute or obtuse angle region. Include 4 options."
    },
    {
        "exam": "JEE Advanced Ladder",
        "subject": "Mathematics",
        "topic": "Conic Sections: Director Circle, Focal Chords & Normals to Parabola / Ellipse",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Math Ch 10: Standard equations of circle, parabola y^2 = 4ax, ellipse x^2/a^2 + y^2/b^2 = 1, and hyperbola",
        "neet_gap_concept": "Director circle as locus of points from which perpendicular tangents can be drawn (x^2 + y^2 = a^2 + b^2 for ellipse; x^2 + y^2 = a^2 - b^2 for hyperbola); three normals can be drawn from a point (h, k) to parabola y^2 = 4ax with centroid on axis",
        "prompt": "Create an authentic Class 11 to JEE Advanced Ladder question finding the locus of point of intersection of two perpendicular tangents to the ellipse x^2/16 + y^2/9 = 1 (director circle). If the focal chord of the parabola y^2 = 8x makes an angle of 45 degrees with the x-axis, calculate its length. Include 4 options."
    },
    {
        "exam": "JEE Main Ladder",
        "subject": "Mathematics",
        "topic": "Introduction to Three Dimensional Geometry: Section Formula, Centroid & Distance in 3D Space",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Math Ch 11: Coordinate axes, distance formula in 3D d = sqrt((x2-x1)^2 + (y2-y1)^2 + (z2-z1)^2), and section formula",
        "neet_gap_concept": "Coordinates of centroid, incenter, and circumcenter of a triangle in 3D space; finding the ratio in which coordinate planes (xy, yz, zx) divide the line segment joining two given points",
        "prompt": "Create an authentic Class 11 to JEE Main Ladder question where the line segment joining A(2, -3, 4) and B(-1, 2, -1) is intersected by the yz-plane. Find the ratio of division, coordinates of the point of intersection, and the distance of the midpoint of AB from the origin. Include 4 options."
    },
    {
        "exam": "JEE Main Ladder",
        "subject": "Mathematics",
        "topic": "Limits and Derivatives: L'Hopital's Rule, Standard Trigonometric Limits & First Principles",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Math Ch 12: Intuitive idea of limits, lim_{x->0} sin(x)/x = 1, and derivative definition as instantaneous rate of change",
        "neet_gap_concept": "Indeterminate forms 0/0 and inf/inf evaluated via L'Hopital's rule; indeterminate forms 1^inf evaluated via exp(lim (f(x) - 1)*g(x)); Taylor series expansions of sin(x), cos(x), ln(1+x), e^x to resolve higher-order cancellations",
        "prompt": "Create an authentic Class 11 to JEE Main Ladder question evaluating the limit: L = lim_{x -> 0} (tan(x) - sin(x)) / x^3 using both Taylor expansions and L'Hopital's rule. Evaluate lim_{x -> 0} (cos(x))^(1 / x^2). Include 4 options."
    },
    {
        "exam": "JEE Main Ladder",
        "subject": "Mathematics",
        "topic": "Statistics: Variance & Standard Deviation Under Linear Transformations",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Math Ch 13: Measures of dispersion, mean deviation, variance sigma^2 = (1/n)*sum(x_i - mean)^2, and standard deviation",
        "neet_gap_concept": "Effect of linear transformation y_i = a*x_i + b on statistics: new mean = a*mean + b, but new variance = a^2 * original_variance (completely independent of shift b); combining two samples of sizes n1, n2 with means m1, m2 and variances s1^2, s2^2",
        "prompt": "Create an authentic Class 11 to JEE Main Ladder question where the mean and variance of 10 observations are 5 and 2 respectively. If two observations 3 and 7 are subsequently deleted, calculate the corrected mean and variance of the remaining 8 observations. Include 4 options."
    },
    {
        "exam": "JEE Main Ladder",
        "subject": "Mathematics",
        "topic": "Probability: Conditional Probability, Independent Events & Discrete Sample Spaces",
        "class_label": "11",
        "ncert_foundation": "NCERT Class 11 Math Ch 14: Sample space, event types, mutually exclusive events, and classical probability P(A) = n(A)/n(S)",
        "neet_gap_concept": "Distinguishing independent events (P(A n B) = P(A)*P(B)) from mutually exclusive events (P(A n B) = 0); conditional probability P(A|B) = P(A n B)/P(B); probability of at least one success in n trials = 1 - (1 - p)^n",
        "prompt": "Create an authentic Class 11 to JEE Main Ladder question where two unbiased dice are rolled. Given that the sum of the numbers appearing on the two dice is greater than or equal to 8, calculate the conditional probability that the number 4 appeared on at least one die. Include 4 options."
    },

    # --- Class 12 Mathematics (14 Chapters) ---
    {
        "exam": "JEE Main Ladder",
        "subject": "Mathematics",
        "topic": "Relations and Functions: Equivalence Classes, Reflexive / Symmetric / Transitive Closures",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Math Ch 1: Types of relations (reflexive, symmetric, transitive, equivalence) and composite functions",
        "neet_gap_concept": "Counting the total number of equivalence relations on a set with n elements (Bell numbers B_n); number of onto (surjective) functions from set A (|A|=m) to set B (|B|=n) via stirling numbers of the second kind",
        "prompt": "Create an authentic Class 12 to JEE Main Ladder question on set A = {1, 2, 3, 4}. Define relation R = {(a, b): |a - b| is divisible by 2}. Prove R is an equivalence relation and determine all distinct equivalence classes. Calculate the total number of onto functions from set {1, 2, 3, 4, 5} to set {a, b, c}. Include 4 options."
    },
    {
        "exam": "JEE Main Ladder",
        "subject": "Mathematics",
        "topic": "Inverse Trigonometric Functions: Principal Value Branches & Telescoping Arctan Series",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Math Ch 2: Principal value branches of sin^-1(x), cos^-1(x), tan^-1(x)",
        "neet_gap_concept": "Evaluation of sin^-1(sin(x)) and cos^-1(cos(x)) outside principal domains via piecewise linear zig-zag functions; summation of infinite series of arctangents using identity arctan(x) - arctan(y) = arctan((x-y)/(1+xy))",
        "prompt": "Create an authentic Class 12 to JEE Main Ladder question evaluating the exact numerical value of sin^-1(sin(10)) and cos^-1(cos(10)). Compute the sum to infinity of the series: S = sum_{n=1}^inf arctan( 1 / (n^2 + n + 1) ) using telescoping arctan identities. Include 4 options."
    },
    {
        "exam": "JEE Advanced Ladder",
        "subject": "Mathematics",
        "topic": "Matrices: Cayley-Hamilton Theorem, Orthogonal Matrices & Nilpotent Properties",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Math Ch 3: Matrix operations, transpose, symmetric and skew-symmetric matrices",
        "neet_gap_concept": "Cayley-Hamilton theorem (every square matrix satisfies its own characteristic polynomial det(A - lambda*I) = 0); computing large powers A^n and matrix inverse A^-1 using characteristic equation; properties of orthogonal matrices (A^T * A = I, det = +-1)",
        "prompt": "Create an authentic Class 12 to JEE Advanced Ladder question for a 2x2 matrix A = [[1, 2], [3, 4]]. Using the Cayley-Hamilton theorem, find the characteristic polynomial of A and express A^4 - 5*A^3 - 2*A^2 + A + I as a linear polynomial in A (c1*A + c2*I). Calculate A^-1. Include 4 options."
    },
    {
        "exam": "JEE Main Ladder",
        "subject": "Mathematics",
        "topic": "Determinants: System of Linear Equations, Cramer's Rule & Adjoint Matrices",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Math Ch 4: Determinant properties, minors, cofactors, and adjoint of a square matrix",
        "neet_gap_concept": "Cramer's rule consistency conditions for non-homogeneous system AX = B (unique solution if Delta != 0; infinitely many if Delta = Delta1 = Delta2 = Delta3 = 0; no solution if Delta = 0 and at least one Delta_i != 0); det(adj(A)) = (det A)^(n-1)",
        "prompt": "Create an authentic Class 12 to JEE Main Ladder question investigating the values of lambda and mu for which the system of linear equations: x + y + z = 6; x + 2y + 3z = 10; x + 2y + lambda*z = mu has (i) a unique solution, (ii) infinitely many solutions, and (iii) no solution. Include 4 options."
    },
    {
        "exam": "JEE Advanced Ladder",
        "subject": "Mathematics",
        "topic": "Continuity and Differentiability: Rolle's & Mean Value Theorems, Differentiability Nuances",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Math Ch 5: Continuity at a point, derivative as limit of difference quotient, and chain rule",
        "neet_gap_concept": "Checking differentiability of functions involving absolute values and fractional parts f(x) = |x - 1| + |x - 2|; applying Rolle's Theorem and Lagrange's Mean Value Theorem (LMVT) to prove existence of roots of transcendental equations; intermediate value theorem",
        "prompt": "Create an authentic Class 12 to JEE Advanced Ladder question examining the continuity and differentiability of f(x) = x^2 * sin(1/x) for x != 0, f(0) = 0. Show that f is differentiable everywhere, but f'(x) is discontinuous at x = 0. Apply LMVT to f(x) = ln(x) on [1, e] to find c. Include 4 options."
    },
    {
        "exam": "JEE Main Ladder",
        "subject": "Mathematics",
        "topic": "Applications of Derivatives: Monotonicity, Global Extrema & Optimization Modeling",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Math Ch 6: Rate of change, increasing/decreasing criteria f'(x) >= 0, and local maxima/minima using second derivative test",
        "neet_gap_concept": "Global extrema on closed bounded intervals [a, b] by comparing values at critical points (f'(x) = 0 or non-existent) and endpoints; geometric optimization problems (maximum volume of cone inscribed in sphere of radius R: V_max = (8/27)*V_sphere)",
        "prompt": "Create an authentic Class 12 to JEE Main Ladder question finding the maximum volume of a right circular cylinder that can be inscribed in a sphere of radius R. Show that the height of the cylinder for maximum volume is 2R / sqrt(3) and calculate the ratio of cylinder volume to sphere volume. Include 4 options."
    },
    {
        "exam": "JEE Advanced Ladder",
        "subject": "Mathematics",
        "topic": "Integrals: King's Property, Fractional Part Integration & Leibniz Integral Rule",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Math Ch 7: Definite integral properties: int_a^b f(x)dx = int_a^b f(a+b-x)dx and integration by parts",
        "neet_gap_concept": "King's property symmetry eliminating complicated denominators: I = int_0^(pi/2) ln(sin(x)) dx = -(pi/2)*ln(2); Leibniz rule of differentiation under the integral sign: d/dx int_{u(x)}^{v(x)} f(t, x) dt; integrating discontinuous step and fractional part functions {x}",
        "prompt": "Create an authentic Class 12 to JEE Advanced Ladder question evaluating the definite integral: I = int_0^pi x * sin(x) / (1 + cos^2(x)) dx using King's property. Differentiate F(x) = int_0^(x^2) sqrt(1 + t^3) dt with respect to x using the Leibniz rule. Include 4 options."
    },
    {
        "exam": "JEE Main Ladder",
        "subject": "Mathematics",
        "topic": "Applications of the Integrals: Area Bounded by Intersecting Parabolas & Lines",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Math Ch 8: Area under simple curves y = f(x) between x = a and x = b as limit of sums",
        "neet_gap_concept": "Area enclosed between two intersecting parabolas y^2 = 4ax and x^2 = 4by is given by (16/3)*a*b; area bounded by parabola and its latus rectum or an inclined chord; symmetry integration about axes",
        "prompt": "Create an authentic Class 12 to JEE Main Ladder question calculating the exact area enclosed between the parabola y^2 = 4x and the line y = 2x - 4. Set up the integral with respect to y and with respect to x, and verify both yield identical results. Include 4 options."
    },
    {
        "exam": "JEE Advanced Ladder",
        "subject": "Mathematics",
        "topic": "Differential Equations: Integrating Factor, Bernoulli's Form & Orthogonal Trajectories",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Math Ch 9: Order and degree, variable separable method, and linear differential equation dy/dx + P(x)*y = Q(x)",
        "neet_gap_concept": "Integrating factor IF = exp(int P(x)dx); Bernoulli's reducible equation dy/dx + P*y = Q*y^n; finding orthogonal trajectories of a family of curves by replacing dy/dx with -dx/dy",
        "prompt": "Create an authentic Class 12 to JEE Advanced Ladder question solving the differential equation: (x + 2*y^3) * dy/dx = y. Treat x as dependent variable dx/dy - x/y = 2*y^2 to find the integrating factor and the general solution. Find the orthogonal trajectories of the family of parabolas y^2 = 4*a*x. Include 4 options."
    },
    {
        "exam": "JEE Main Ladder",
        "subject": "Mathematics",
        "topic": "Vector Algebra: Scalar & Vector Triple Products, Coplanarity & Lagrange's Identity",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Math Ch 10: Dot product a . b = |a||b|cos(theta) and cross product a x b = |a||b|sin(theta)*n_hat",
        "neet_gap_concept": "Scalar triple product [a b c] = a . (b x c) representing parallelepiped volume; coplanarity criterion [a b c] = 0; Vector triple product expansion a x (b x c) = (a . c)*b - (a . b)*c; Lagrange's identity |a x b|^2 = |a|^2|b|^2 - (a . b)^2",
        "prompt": "Create an authentic Class 12 to JEE Main Ladder question where vectors a, b, c satisfy a + b + c = 0 and |a| = 3, |b| = 5, |c| = 7. Calculate the angle between a and b, and evaluate the vector triple product a x (b x c). Include 4 options."
    },
    {
        "exam": "JEE Advanced Ladder",
        "subject": "Mathematics",
        "topic": "Three Dimensional Geometry: Shortest Distance Between Skew Lines & Line-Plane Intersections",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Math Ch 11: Direction cosines and ratios, line equation r = a + lambda*b, and plane equation r . n = d",
        "neet_gap_concept": "Shortest distance between two skew lines r = a1 + lambda*b1 and r = a2 + mu*b2 given by d = |(a2 - a1) . (b1 x b2)| / |b1 x b2|; condition for two lines to intersect (d = 0); image of a point in a plane",
        "prompt": "Create an authentic Class 12 to JEE Advanced Ladder question calculating the shortest distance between the two skew lines: (x - 1)/2 = (y - 2)/3 = (z - 3)/4 and (x - 2)/3 = (y - 4)/4 = (z - 5)/5. Find the coordinates of the foot of the common perpendicular. Include 4 options."
    },
    {
        "exam": "JEE Main Ladder",
        "subject": "Mathematics",
        "topic": "Linear Programming: Corner Point Method, Bounded vs Unbounded Feasible Regions",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Math Ch 12: Graphical formulation of linear programming problems and objective function Z = ax + by",
        "neet_gap_concept": "Corner point theorem: optimal value occurs at an extreme vertex; unbounded feasible region nuance: checking whether the open half-plane ax + by > M (or < m) has points in common with the feasible region",
        "prompt": "Create an authentic Class 12 to JEE Main Ladder question minimizing Z = 3x + 5y subject to constraints: x + 2y >= 10, 3x + 4y <= 24, x >= 0, y >= 0. Determine all corner points of the feasible region, evaluate Z at each vertex, and show why the minimum is valid. Include 4 options."
    },
    {
        "exam": "JEE Advanced Ladder",
        "subject": "Mathematics",
        "topic": "Probability: Bayes' Theorem, Total Probability Theorem & Polya's Urn Scheme",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 12 Math Ch 13: Conditional probability, multiplication rule, independent events, and Bayes' theorem",
        "neet_gap_concept": "Bayes' theorem posterior probability calculation P(E_i | A) = P(E_i)*P(A|E_i) / sum P(E_j)*P(A|E_j); Polya's urn scheme where drawn ball is replaced along with c balls of the same color, changing marginal vs conditional probabilities",
        "prompt": "Create an authentic Class 12 to JEE Advanced Ladder question on a medical test for a rare disease affecting 0.1% of the population. The test has 99% sensitivity (true positive) and 98% specificity (true negative). If a randomly selected person tests positive, calculate the posterior probability that the person actually has the disease using Bayes' theorem. Include 4 options."
    },
    {
        "exam": "Olympiad/Paradox Ladder",
        "subject": "Physics/Math",
        "topic": "Multidisciplinary Olympiad & Paradox Track: Boundary Singularities, Radiation & Relativistic Velocity",
        "class_label": "12",
        "ncert_foundation": "NCERT Class 11/12 Physics and Math: Conservation of mechanical energy, Poynting vector, and infinite series",
        "neet_gap_concept": "Authentic physical paradoxes where standard intuition collapses: (1) Two-Capacitor energy dissipation paradox, (2) Sliding ladder wall detachment at cos(theta) = 2/3, (3) Ant on stretching rubber rope, (4) Infinite 2D square grid resistor network equivalent resistance R/2",
        "prompt": "Create an authentic Olympiad Paradox question deriving why exactly 50% of electrostatic energy is dissipated when a charged capacitor is connected to an identical uncharged capacitor via superconducting zero-resistance wires, proving energy loss via Poynting electromagnetic dipole radiation. Include 4 options."
    }
]

# =============================================================================
# COMBINED 107-CHAPTER MASTER CURRICULUM LADDER
# =============================================================================

MASTER_CURRICULUM_LADDER: List[Dict[str, Any]] = (
    PHYSICS_LADDER +
    CHEMISTRY_LADDER +
    BIOLOGY_LADDER +
    MATHEMATICS_LADDER
)

# Backwards compatibility aliases
ALL_LADDER_BLUEPRINTS = MASTER_CURRICULUM_LADDER
NEET_PHYSICS_LADDER = [b for b in PHYSICS_LADDER if b["exam"].startswith("NEET")]
NEET_CHEMISTRY_LADDER = [b for b in CHEMISTRY_LADDER if b["exam"].startswith("NEET")]
NEET_BIOLOGY_LADDER = [b for b in BIOLOGY_LADDER if b["exam"].startswith("NEET")]
JEE_PHYSICS_LADDER = [b for b in PHYSICS_LADDER if "JEE" in b["exam"]]
JEE_CHEMISTRY_LADDER = [b for b in CHEMISTRY_LADDER if "JEE" in b["exam"]]
JEE_MATHEMATICS_LADDER = [b for b in MATHEMATICS_LADDER if "JEE" in b["exam"]]
OLYMPIAD_PARADOX_LADDER = [b for b in MASTER_CURRICULUM_LADDER if "Olympiad" in b["exam"]]
