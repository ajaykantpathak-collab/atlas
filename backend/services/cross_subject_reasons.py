"""Cross-subject reason lookup for enrichment node IDs.

Maps enrichment node IDs to their cross-subject prerequisite reasons.
Used as a fallback when Neo4j doesn't have cross-subject edges loaded
(the neo4j_cross_subject.py loader uses atomic sub-node IDs that don't match
the enrichment node ID format).

Sources:
1. The 49 cross-subject pairs found in the enrichment database (prereq_ids,
   depth_prereq_ids, and on_failure review_node_ids)
2. The 32 mapped links from neo4j_cross_subject.py CROSS_SUBJECT_LINKS
   (mapped from atomic sub-node IDs to enrichment node IDs)
"""
from __future__ import annotations

# (target_node_id, prereq_node_id): reason
CROSS_SUBJECT_REASONS: dict[tuple[str, str], str] = {
    # ================================================================== #
    # PHYSICS → MATH
    # ================================================================== #
    ("c10_phy_004", "c9_math_060"): "Work done (W = FS cos theta) uses trigonometric ratios — the cos theta term comes directly from the definition of cosine as adjacent/hypotenuse",
    ("c11_phy_001", "c11_math_013"): "Physics error analysis requires variance and standard deviation from statistics — same framework quantifies measurement uncertainty",
    ("c11_phy_002", "c11_math_002"): "Kinematic quantities x(t), v(t), a(t) are real-valued functions requiring the concept of functions, domain, and range",
    ("c11_phy_002", "c11_math_009"): "Graphical analysis of motion (slope of x-t = velocity) requires understanding slope of a line from coordinate geometry",
    ("c11_phy_003", "c11_math_011"): "Vector representation in 3D requires the coordinate system foundation — vectors are defined by coordinates of points in space",
    ("c11_phy_003", "c11_math_009"): "Scalar (dot) product and projection requires understanding distance from a point to a line — projection is the geometric basis of dot product",
    ("c11_phy_005", "c11_math_012"): "Work done by variable forces (W = integral F dx) requires the definition of derivative as rate of change — integration is the inverse",
    ("c11_phy_005", "c11_math_014"): "Collision analysis involves probabilistic outcomes requiring the axiomatic foundation of probability",
    ("c11_phy_006", "c11_math_089"): "Differentiation and integration for describing motion requires the derivative concept — velocity is dx/dt and acceleration is dv/dt",
    ("c11_phy_009", "c11_math_084"): "Vectors in 3D require coordinate geometry — vectors are defined by coordinates of points in space, and 3D geometry provides the framework",
    ("c11_phy_013", "c9_math_060"): "Vector cross product uses trigonometric ratios — the magnitude |a x b| = |a||b| sin theta depends on the sine function",
    ("c11_phy_027", "c11_math_089"): "Work done by a variable force (W = integral F dx) requires the derivative as rate of change — integration is the inverse of differentiation",
    ("c11_phy_037", "c9_math_060"): "Torque (tau = r x F) uses trigonometric ratios — the magnitude tau = rF sin theta depends on the sine function",
    ("c11_phy_088", "c11_math_019"): "Simple harmonic motion is described using trigonometric functions — x(t) = A cos(omega t + phi) requires understanding unit circle trigonometry",
    ("c11_phy_089", "c11_math_091"): "The differential equation of SHM (d²x/dt² + omega²x = 0) requires derivatives of trigonometric functions to solve",
    ("c12_phy_001", "c12_math_010"): "Superposition principle for electric fields requires vector addition — multiple charges create fields that add as vectors",
    ("c12_phy_003", "c12_math_070"): "Coulomb's law in vector form requires vector concepts — the force direction depends on the unit vector along the line joining charges",
    ("c12_phy_004", "c12_math_010"): "Force on current-carrying conductor (F = IL x B) uses the vector cross product — direction and magnitude depend on cross product rules",
    ("c12_phy_006", "c12_math_073"): "Electric field (E = F/q) involves vector addition — multiple charges create fields that superpose as vectors",
    ("c12_phy_006", "c12_math_007"): "Magnetic flux and Faraday's law (EMF = -dPhi/dt) require definite integrals and the Fundamental Theorem of Calculus",
    ("c12_phy_007", "c12_math_009"): "LCR series circuit analysis involves second-order differential equations — damped oscillation equation solved by separation of variables",
    ("c12_phy_008", "c12_math_072"): "Electric dipole moment is a vector quantity — position vectors and vector components are needed to describe the dipole axis",
    ("c12_phy_010", "c12_math_007"): "Young's double slit interference intensity requires definite integrals to compute resultant intensity from superposition",
    ("c12_phy_011", "c12_math_013"): "Photoelectric effect and photon statistics require conditional probability — probability of electron emission depends on photon energy",
    ("c12_phy_017", "c12_math_075"): "Electric potential due to a dipole uses the scalar dot product — V = (p . r_hat)/4pi epsilon r² is a dot product",
    ("c12_phy_038", "c12_math_076"): "Biot-Savart law uses the vector cross product — dB = (mu_0/4pi) I dl x r_hat depends on cross product direction and magnitude",
    ("c12_phy_044", "c12_math_076"): "Force on a current-carrying conductor (F = IL x B) uses the vector cross product — direction and magnitude follow cross product rules",
    ("c12_phy_064", "c11_math_094"): "AC quantities (peak, mean, RMS values) require standard deviation and variance from statistics — RMS is the same as standard deviation",
    ("c12_phy_074", "c12_math_064"): "EM wave equation is a differential equation — the wave equation d²E/dx² = (1/c²)d²E/dt² is solved using differential equation techniques",
    ("c12_phy_078", "c9_math_060"): "Snell's law (n1 sin theta1 = n2 sin theta2) uses trigonometric ratios — the sine function relates angles of incidence and refraction",
    ("c12_phy_090", "c10_math_016"): "Young's double slit experiment uses ratio and proportion — fringe width beta = lambda D/d involves proportional reasoning",
    ("c12_phy_091", "c9_math_060"): "Single slit diffraction pattern uses trigonometric ratios — minima occur at a sin theta = n lambda",
    ("c12_phy_132", "c11_math_013"): "Radioactive decay follows exponential functions — N(t) = N0 e^(-lambda t) uses the exponential function and its logarithmic inverse",
    ("c12_phy_135", "c12_math_064"): "RC circuit analysis involves first-order differential equations — the charging/discharging equation R(dQ/dt) + Q/C = V is solved by separation of variables",
    ("c12_phy_136", "c12_math_064"): "LC oscillations are described by second-order differential equations — the equation L(d²Q/dt²) + Q/C = 0 is the same form as SHM",
    ("c12_phy_137", "c11_math_019"): "Rotating coil EMF (epsilon = NBA omega sin(omega t)) uses trigonometric functions — the sinusoidal EMF comes from rotating a vector in a magnetic field",

    # ================================================================== #
    # PHYSICS → CHEMISTRY
    # ================================================================== #
    ("c10_phy_041", "c9_chem_026"): "Nuclear fusion requires understanding Rutherford's nuclear model — the nucleus and its binding energy are chemistry concepts first",
    ("c12_phy_123", "c11_chem_007"): "Radioactive decay (alpha, beta, gamma) is fundamentally a nuclear chemistry process — atomic structure and nuclear reactions from chemistry are essential",
    ("c12_phy_133", "c11_chem_022"): "Soddy-Fajans displacement laws connect nuclear physics to atomic chemistry — mass number and atomic number changes follow chemical periodicity rules",

    # ================================================================== #
    # CHEMISTRY → MATH
    # ================================================================== #
    ("c10_chem_016", "c9_math_025"): "pH scale uses logarithms — pH = -log[H+] requires understanding logarithmic form vs exponential form",
    ("c12_chem_004", "c10_math_016"): "Packing efficiency in solids uses ratio and proportion — efficiency = (volume occupied by atoms / total volume) x 100",
    ("c12_chem_019", "c9_math_025"): "Nernst equation uses logarithms — E = E0 - (RT/nF) ln Q requires understanding logarithmic form vs exponential form",
    ("c12_chem_019", "c9_math_026"): "Nernst equation uses laws of logarithms — the log Q term requires understanding log properties (log ab = log a + log b, etc.)",
    ("c12_chem_023", "c11_math_089"): "Chemical kinetics rate of reaction uses derivatives — rate = -d[A]/dt is the derivative of concentration with respect to time",

    # ================================================================== #
    # CHEMISTRY → PHYSICS
    # ================================================================== #
    ("c11_chem_001", "c11_phy_001"): "Properties of matter and their measurement in chemistry uses the same SI unit system from physics — measurement framework is shared",
    ("c11_chem_002", "c11_phy_001"): "Electromagnetic radiation and atomic spectra require understanding measurement units (wavelength, frequency, energy in eV) from physics",
    ("c11_chem_005", "c11_phy_011"): "First law of thermodynamics in chemistry (delta U = q + w) is the same law taught in physics — heat, work, and internal energy concepts are shared",
    ("c11_chem_005", "c11_phy_010"): "Enthalpy, calorimetry, and heat capacity in chemistry require understanding specific heat capacity and calorimetry from physics",
    ("c11_chem_042", "c11_phy_076"): "Thermodynamics in chemistry uses thermal equilibrium and the zeroth law — the concept of temperature equilibrium is shared between both subjects",
    ("c12_chem_002", "c12_phy_001"): "Electrochemical cells (galvanic cells, electrode potentials) are built on Coulomb's law and electric charge — electrostatic force drives redox",
    ("c12_chem_002", "c12_phy_003"): "Conductance of electrolytic solutions uses Ohm's law and resistance concepts — electrolytic conductivity is the inverse of resistivity",
    ("c12_chem_011", "c12_phy_014"): "Electrical properties of solids (conductors, semiconductors, insulators) are explained by energy band theory from physics",
    ("c12_chem_011", "c12_phy_005"): "Magnetic properties of solids (dia, para, ferromagnetism) are the same phenomena studied in physics — magnetic dipole moment of unpaired electrons",
    ("c12_chem_013", "c12_chem_002"): "Corrosion as electrochemical mechanism requires understanding corrosion prevention from electrochemistry — rusting is an electrochemical process",

    # ================================================================== #
    # BIOLOGY → CHEMISTRY
    # ================================================================== #
    ("c10_bio_023", "c9_chem_053"): "Climate effects (greenhouse, global warming) require understanding ozone depletion chemistry — atmospheric chemistry explains climate mechanisms",
    ("c11_bio_008", "c11_chem_004"): "Cell membrane fluid mosaic model depends on hydrogen bonding and intermolecular forces — phospholipid bilayer held together by these forces",
    ("c11_bio_009", "c11_chem_008"): "Biomolecules (carbohydrates, lipids) are organic compounds built on carbon's tetravalence — understanding C-C, C-H, C-O bonds is essential",
    ("c11_bio_009", "c11_chem_004"): "Proteins (peptide bonds) and nucleic acids (DNA H-bonds) require understanding covalent bonding — peptide bonds are covalent, base pairs are H-bonded",
    ("c11_bio_009", "c11_chem_005"): "Enzyme catalysis and metabolic regulation depend on Gibbs energy and equilibrium — enzymes lower activation energy thermodynamically",
    ("c11_bio_011", "c11_chem_002"): "Photosynthesis light reactions involve electron excitation in chlorophyll — Bohr's model explains why specific wavelengths are absorbed",
    ("c11_bio_012", "c11_chem_005"): "Aerobic respiration (TCA cycle, electron transport) releases energy measured by enthalpy and calorimetry — same thermodynamic quantities",
    ("c11_bio_069", "c11_chem_007"): "Amphibolic nature of respiration (RQ) requires stoichiometry — the respiratory quotient is a ratio of moles of CO2 produced to O2 consumed",
    ("c12_bio_005", "c12_chem_010"): "DNA structure and packaging (double helix, base pairing) is directly taught in chemistry as nucleic acids — chemical structure IS the foundation",
    ("c12_bio_007", "c11_chem_016"): "Immunity and vaccination involves antimicrobial drugs (antibiotics, antiseptics) — understanding how these chemicals act requires chemistry",
    ("c12_bio_007", "c11_chem_012"): "Microbes in human welfare involves enzyme catalysis — understanding industrial enzyme applications requires chemistry of catalysis",
    ("c12_bio_008", "c12_chem_010"): "Recombinant DNA technology manipulates nucleic acids chemically — understanding DNA chemistry is prerequisite to genetic engineering",
    ("c12_bio_024", "c11_chem_007"): "DNA as genetic material requires stoichiometry — understanding the chemical composition of nucleotides (C, H, O, N, P) uses mole concepts",
    ("c12_bio_053", "c12_chem_020"): "Energy flow in ecosystems uses Gibbs energy — the thermodynamic concept of free energy explains why energy flow is unidirectional",
    ("c8_bio_001", "c5_chem_006"): "Diffusion and osmosis require understanding solutions, suspensions and colloids — concentration gradients drive these biological processes",

    # ================================================================== #
    # BIOLOGY → PHYSICS
    # ================================================================== #
    ("c10_bio_010", "c9_phy_033"): "Respiratory system mechanics involves pressure differences — breathing relies on pressure gradients explained by wave motion and fluid pressure",
    ("c11_bio_045", "c11_phy_056"): "Human respiratory system uses pressure due to a fluid column — lung inflation follows pressure-volume relationships from fluid physics",
    ("c11_bio_059", "c10_phy_028"): "Nerve impulse generation uses Ohm's law — the resting membrane potential and action potential follow electrical resistance and voltage concepts",

    # ================================================================== #
    # BIOLOGY → MATH
    # ================================================================== #
    ("c12_bio_016", "c10_math_016"): "Mendel's laws use ratio and proportion — monohybrid (3:1) and dihybrid (9:3:3:1) crosses require proportional reasoning",

    # ================================================================== #
    # MATH → PHYSICS
    # ================================================================== #
    ("c12_math_098", "c11_phy_012"): "Scalar triple product gives the volume of a parallelepiped — this is the same scalar (dot) product from physics applied to three vectors",
    ("c12_math_099", "c11_phy_013"): "Vector triple product (a x (b x c)) uses the vector cross product — the BAC-CAB rule depends on cross product properties from physics",
    ("c6_math_004", "c6_phy_001"): "Word problems involving measurement use physical quantities and units — understanding length, mass, and time units is essential",
    ("c6_math_030", "c6_phy_001"): "Word problems on addition and subtraction of measurements use physical units — unit consistency is a physics concept",
    ("c6_math_079", "c6_phy_001"): "Conversion of units (mass, time, money) requires understanding physical quantities — the metric system comes from physics",
    ("c7_math_025", "c6_phy_012"): "Speed, distance, time problems require the physics concept of speed and average speed — the formula speed = distance/time is from physics",
    ("c7_math_046", "c6_phy_006"): "Area measurement uses the physics concept of measurement — area calculations require understanding units of measurement",

    # ================================================================== #
    # CHEMISTRY → BIOLOGY
    # ================================================================== #
    ("c4_chem_010", "c3_bio_005"): "Air pollution causes and prevention connects to breathing problems in biology — understanding respiratory health requires chemistry of pollutants",
}


def get_cross_subject_reason(target_node_id: str, prereq_node_id: str) -> str | None:
    """Get the pedagogical reason for a cross-subject prerequisite.

    Returns None if the pair is not in the mapping or if it's not cross-subject.
    """
    return CROSS_SUBJECT_REASONS.get((target_node_id, prereq_node_id))
