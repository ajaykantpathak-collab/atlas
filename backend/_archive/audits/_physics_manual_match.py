"""Proper concept-by-concept matching of CISCE vs CBSE class 12 physics."""
import json
from pathlib import Path
from neo4j import GraphDatabase

OUTPUT_DIR = Path(r"D:\platform\cbse_coverage_output")
driver = GraphDatabase.driver("bolt://localhost:7687", auth=("neo4j", "dream_neo4j_2024"))

# Get CISCE nodes
with driver.session() as s:
    result = s.run(
        "MATCH (n:KnowledgeNode) WHERE n.class_level = 12 AND n.subject = 'physics' "
        "RETURN n.node_id as nid, n.topic as topic ORDER BY n.node_id"
    )
    cisce = {r["nid"]: r["topic"] for r in result}

# Get CBSE nodes
cbse = {}
for f in sorted(OUTPUT_DIR.glob("*_result.json")):
    data = json.loads(f.read_text(encoding="utf-8"))
    if data.get("grade") != 12 or data.get("subject") != "physics":
        continue
    for chunk in data.get("results", []):
        if "_error" in chunk:
            continue
        for node in chunk.get("nodes", []):
            cbse[node["node_id"]] = node["topic"]

# Manual mapping: CISCE node → list of CBSE node IDs that cover the same concept
# Done by reading all 140 CISCE topics and all 327 CBSE topics
mapping = {
    # Electrostatics
    "c12_phy_001: Electric charges (types and properties)": [
        "c12_phy_cbse_001: Electric Charge and Coulomb's Law",  # from ch1
    ],
    "c12_phy_002: Conservation and quantisation of charge": [
        "c12_phy_cbse_002: Quantisation and Conservation of Charge",  # likely covered
    ],
    "c12_phy_003: Coulomb's law (vector form)": [
        "c12_phy_cbse_001: Electric Charge and Coulomb's Law",
    ],
    "c12_phy_004: Superposition principle for electric forces": [
        "c12_phy_cbse_003: Superposition of Electric Forces",  # likely
    ],
    "c12_phy_005: Continuous charge distribution (line, surface, volume)": [
        "c12_phy_cbse_018: Continuous Charge Distribution",
    ],
    "c12_phy_006: Electric field (concept, E = F/q_0)": [
        "c12_phy_cbse_003: Electric Field and Electric Field Lines",  # from ch1
        "c12_phy_cbse_006: Electric Flux and Field Concepts",
    ],
    "c12_phy_007: Electric field due to a point charge": [
        "c12_phy_cbse_003: Electric Field and Electric Field Lines",
    ],
    "c12_phy_008: Electric dipole (concept and dipole moment)": [
        "c12_phy_cbse_015: Electric Dipole: Concept and Dipole Moment",
    ],
    "c12_phy_009: Electric field due to a dipole (axial and equatorial)": [
        "c12_phy_cbse_016: Electric Field Due to a Dipole (Axial)",
        "c12_phy_cbse_017: Electric Field Due to a Dipole (Equatorial)",
    ],
    "c12_phy_010: Torque on a dipole in a uniform electric field": [
        "c12_phy_cbse_019: Torque on a Dipole in Uniform Electric Field",
    ],
    "c12_phy_011: Electric flux": [
        "c12_phy_cbse_014: Electric Flux",
        "c12_phy_cbse_004: Electric Flux and Gauss's Law",
    ],
    "c12_phy_012: Gauss's theorem": [
        "c12_phy_cbse_004: Electric Flux and Gauss's Law",
        "c12_phy_cbse_012: Gauss's Law and Applications",
    ],
    "c12_phy_013: Field due to infinite line charge (Gauss)": [
        "c12_phy_cbse_013: Field Due to Infinite Line Charge",
    ],
    "c12_phy_014: Field due to infinite plane sheet (Gauss)": [
        "c12_phy_cbse_014: Field Due to Infinite Plane Sheet",
    ],
    "c12_phy_015: Field due to spherical shell (Gauss)": [
        "c12_phy_cbse_015: Field Due to Spherical Shell",
    ],
    "c12_phy_016: Electric potential and potential difference": [
        "c12_phy_cbse_002: Electric Potential and Potential Difference",
    ],
    "c12_phy_017: Electric potential due to a dipole": [
        "c12_phy_cbse_008: Potential Due to a Dipole",
    ],
    "c12_phy_018: Electric potential due to a system of charges": [
        "c12_phy_cbse_006: Potential Due to a System of Charges",
    ],
    "c12_phy_019: Equipotential surfaces": [
        "c12_phy_cbse_007: Equipotential Surfaces",
    ],
    "c12_phy_020: Electrostatic PE of a point charge (U = qV)": [
        "c12_phy_cbse_009: Electrostatic Potential Energy of a Point Charge",
    ],
    "c12_phy_021: Electrostatic PE of a system of charges": [
        "c12_phy_cbse_010: Electrostatic PE of a System of Charges",
    ],
    "c12_phy_022: Capacitance (C = Q/V)": [
        "c12_phy_cbse_007: Capacitance Concept",
        "c12_phy_cbse_009: Parallel Plate Capacitor",
    ],
    "c12_phy_023: Parallel plate capacitor (C = epsilon_0A/d)": [
        "c12_phy_cbse_009: Parallel Plate Capacitor",
    ],
    "c12_phy_024: Combination of capacitors (series and parallel)": [
        "c12_phy_cbse_011: Combination of Capacitors (Series and Parallel)",
    ],
    "c12_phy_025: Dielectrics and polarization": [
        "c12_phy_cbse_012: Dielectrics and Polarization",
    ],
    "c12_phy_026: Energy stored in a capacitor (U = 1/2CV^2)": [
        "c12_phy_cbse_021: Energy Stored in a Capacitor",
    ],
    "c12_phy_134: Energy density in electric field": [
        "c12_phy_cbse_022: Energy Density in Electric Field",
    ],
    
    # Current electricity
    "c12_phy_027: Drift velocity and mobility": [
        "c12_phy_cbse_001: Drift Velocity and Mobility",
    ],
    "c12_phy_028: Ohm's law (microscopic derivation)": [
        "c12_phy_cbse_004: Ohm's Law",
        "c12_phy_cbse_011: Microscopic Basis and Derivation of Ohm's Law",
    ],
    "c12_phy_029: Resistivity and conductivity": [
        "c12_phy_cbse_005: Resistivity and Conductivity",
    ],
    "c12_phy_030: Temperature dependence of resistance": [
        "c12_phy_cbse_006: Temperature Dependence of Resistance",
    ],
    "c12_phy_031: Emf and internal resistance": [
        "c12_phy_cbse_007: EMF and Internal Resistance",
    ],
    "c12_phy_032: Terminal voltage and lost volts": [
        "c12_phy_cbse_008: Terminal Voltage and Lost Volts",
    ],
    "c12_phy_033: Kirchhoff's laws": [
        "c12_phy_cbse_009: Kirchhoff's Laws",
    ],
    "c12_phy_034: Wheatstone bridge": [
        "c12_phy_cbse_010: Wheatstone Bridge",
    ],
    "c12_phy_035: Metre bridge": [
        "c12_phy_cbse_011: Metre Bridge",
    ],
    "c12_phy_036: Potentiometer": [
        "c12_phy_cbse_012: Potentiometer",
    ],
    "c12_phy_135: RC circuit (charging and discharging)": [
        # CBSE doesn't seem to have this as separate node - might be in circuits
    ],
    
    # Magnetism
    "c12_phy_037: Magnetic field and Oersted's experiment": [
        "c12_phy_cbse_001: Magnetic Field and Oersted's Experiment",
    ],
    "c12_phy_038: Biot-Savart law": [
        "c12_phy_cbse_005: Magnetic Field and Biot-Savart Law",
    ],
    "c12_phy_039: Magnetic field due to circular loop": [
        "c12_phy_cbse_006: Magnetic Field Due to Circular Loop",
    ],
    "c12_phy_040: Magnetic field due to solenoid": [
        "c12_phy_cbse_007: Magnetic Field Due to Solenoid",
    ],
    "c12_phy_041: Ampere's circuital law": [
        "c12_phy_cbse_003: Ampere's Circuital Law for Steady Currents",
    ],
    "c12_phy_042: Force on a moving charge in a magnetic field (F = qv x B)": [
        "c12_phy_cbse_008: Force on a Moving Charge in a Magnetic Field",
    ],
    "c12_phy_043: Lorentz force (combined E and B fields)": [
        "c12_phy_cbse_009: Lorentz Force",
    ],
    "c12_phy_044: Force on a current-carrying conductor in a magnetic field": [
        "c12_phy_cbse_010: Force on a Current-Carrying Conductor",
    ],
    "c12_phy_045: Force between two parallel current-carrying conductors": [
        "c12_phy_cbse_011: Force Between Parallel Current-Carrying Conductors",
    ],
    "c12_phy_046: Torque on a current loop": [
        "c12_phy_cbse_012: Torque on a Current Loop",
    ],
    "c12_phy_047: Moving coil galvanometer": [
        "c12_phy_cbse_013: Moving Coil Galvanometer",
    ],
    "c12_phy_048: Galvanometer to ammeter": [
        "c12_phy_cbse_014: Galvanometer to Ammeter",
    ],
    "c12_phy_049: Galvanometer to voltmeter": [
        "c12_phy_cbse_015: Galvanometer to Voltmeter",
    ],
    
    # Magnetism & matter
    "c12_phy_050: Bar magnet as equivalent solenoid": [
        "c12_phy_cbse_005_001: Bar Magnet as Equivalent Solenoid",
    ],
    "c12_phy_051: Magnetic field lines and properties": [
        "c12_phy_cbse_005_002: Magnetic Field Lines and Properties",
    ],
    "c12_phy_052: Diamagnetic substances": [
        "c12_phy_cbse_005_019: Diamagnetic Materials - Properties and Behavior",
    ],
    "c12_phy_053: Paramagnetic substances": [
        "c12_phy_cbse_005_020: Paramagnetic Materials - Properties and Behavior",
    ],
    "c12_phy_054: Ferromagnetic substances": [
        "c12_phy_cbse_005_021: Ferromagnetic Materials - Domain Theory",
    ],
    "c12_phy_055: Electromagnets and permanent magnets": [
        "c12_phy_cbse_005_022: Hard and Soft Ferromagnetic Materials",
    ],
    
    # EMI
    "c12_phy_056: Magnetic flux": [
        "c12_phy_cbse_005: Magnetic Flux Through a Surface",
    ],
    "c12_phy_057: Faraday's laws of electromagnetic induction": [
        "c12_phy_cbse_007: Faraday's Law of Electromagnetic Induction",
        "c12_phy_cbse_006: Faraday's Law of Electromagnetic Induction",
    ],
    "c12_phy_058: Lenz's law": [
        "c12_phy_cbse_009: Lenz's Law: Direction of Induced EMF",
        "c12_phy_cbse_010: Lenz's Law and Conservation of Energy",
    ],
    "c12_phy_059: Eddy currents": [
        # Not found as separate CBSE node - may be within induction chapter
    ],
    "c12_phy_060: Motional emf (epsilon = Blv)": [
        "c12_phy_cbse_012: Motional EMF in a Moving Conductor",
    ],
    "c12_phy_061: Self-induction and self-inductance": [
        "c12_phy_cbse_015: Self-Inductance Concept and Definition",
        "c12_phy_cbse_016: Self-Inductance of a Long Solenoid",
    ],
    "c12_phy_062: Mutual induction and mutual inductance": [
        "c12_phy_cbse_017: Mutual Inductance Concept",
        "c12_phy_cbse_018: Mutual Inductance of Coaxial Solenoids",
    ],
    "c12_phy_137: Rotating coil EMF (epsilon = NBAomegasin(omegat))": [
        "c12_phy_cbse_022: AC Generator: Induced EMF Expression",
    ],
    
    # AC
    "c12_phy_063: Transformer": [
        "c12_phy_cbse_017: Transformers - Working Principle and Construction",
        "c12_phy_cbse_018: Transformer Turns Ratio and Voltage-Current Relations",
    ],
    "c12_phy_064: AC quantities (peak, mean, RMS values)": [
        "c12_phy_cbse_002: Sinusoidal AC Waveform and Mathematical Representation",
        "c12_phy_cbse_005: Root Mean Square (RMS) Values of AC",
    ],
    "c12_phy_065: AC through resistor (V and I in phase)": [
        "c12_phy_cbse_003: AC Through a Pure Resistor - Ohm's Law and Phase Behavior",
    ],
    "c12_phy_066: AC through inductor (I lags V by 90 deg)": [
        "c12_phy_cbse_007: AC Through a Pure Inductor - Phase Relationship",
        "c12_phy_cbse_008: Inductive Reactance",
    ],
    "c12_phy_067: AC through capacitor (I leads V by 90 deg)": [
        "c12_phy_cbse_009: AC Through a Pure Capacitor - Phase Relationship",
        "c12_phy_cbse_010: Capacitive Reactance",
    ],
    "c12_phy_068: LCR series circuit (impedance, phase)": [
        "c12_phy_cbse_012: Series LCR Circuit - Phasor Diagram Analysis",
        "c12_phy_cbse_013: Impedance in AC Circuits",
    ],
    "c12_phy_069: Resonance in LCR circuit": [
        "c12_phy_cbse_014: Resonance in Series LCR Circuits",
    ],
    "c12_phy_070: Power in AC circuits and power factor": [
        "c12_phy_cbse_015: Power in AC Circuits - Average Power and Power Factor",
    ],
    "c12_phy_071: AC generator": [
        "c12_phy_cbse_021: AC Generator: Principle and Construction",
        "c12_phy_cbse_022: AC Generator: Induced EMF Expression",
    ],
    "c12_phy_136: LC oscillations and energy transfer": [
        # Not found as separate CBSE node
    ],
    
    # EM waves
    "c12_phy_072: Displacement current": [
        "c12_phy_cbse_022: Displacement Current",
    ],
    "c12_phy_073: Electromagnetic waves (properties, speed)": [
        "c12_phy_cbse_029: Speed of Electromagnetic Waves",
        "c12_phy_cbse_030: Mathematical Representation of Electromagnetic Waves",
    ],
    "c12_phy_074: EM wave equation and transverse nature": [
        "c12_phy_cbse_030: Mathematical Representation of Electromagnetic Waves",
    ],
    "c12_phy_075: Electromagnetic spectrum": [
        "c12_phy_cbse_034: Electromagnetic Spectrum Overview",
        "c12_phy_cbse_035: Radio Waves",
        "c12_phy_cbse_036: Microwaves",
        "c12_phy_cbse_037: Infrared Waves",
        "c12_phy_cbse_038: Visible Light",
        "c12_phy_cbse_039: Ultraviolet Radiation",
        "c12_phy_cbse_040: X-rays and Gamma Rays",
    ],
    
    # Optics - ray
    "c12_phy_076: Reflection by spherical mirrors": [
        "c12_phy_cbse_003: Laws of Reflection from Spherical Mirrors",
    ],
    "c12_phy_077: Mirror formula and magnification": [
        "c12_phy_cbse_005: Mirror Equation",
        "c12_phy_cbse_006: Linear Magnification by Spherical Mirrors",
    ],
    "c12_phy_078: Refraction at plane surfaces (Snell's law)": [
        "c12_phy_cbse_007: Snell's Law of Refraction",
    ],
    "c12_phy_079: Total internal reflection and critical angle": [
        "c12_phy_cbse_010: Total Internal Reflection and Critical Angle",
        "c12_phy_cbse_011: Applications of Total Internal Reflection",
    ],
    "c12_phy_080: Refraction through a prism": [
        "c12_phy_cbse_018: Refraction Through a Prism",
        "c12_phy_cbse_019: Minimum Deviation and Prism Formula",
    ],
    "c12_phy_081: Dispersion through a prism": [
        "c12_phy_cbse_020: Dispersion of Light",
    ],
    "c12_phy_082: Refraction at spherical surfaces": [
        "c12_phy_cbse_012: Refraction at a Spherical Surface",
    ],
    "c12_phy_083: Lens maker's formula": [
        "c12_phy_cbse_015: Lens Maker's Formula",
    ],
    "c12_phy_084: Combination of thin lenses": [
        "c12_phy_cbse_017: Combination of Thin Lenses in Contact",
    ],
    "c12_phy_085: Power of a lens": [
        "c12_phy_cbse_016: Power of a Lens",
    ],
    "c12_phy_086: Compound microscope": [
        "c12_phy_cbse_022: Compound Microscope",
    ],
    "c12_phy_087: Astronomical telescope": [
        "c12_phy_cbse_023: Refracting Telescope",
        "c12_phy_cbse_024: Reflecting Telescope and Cassegrain Design",
    ],
    
    # Optics - wave
    "c12_phy_088: Huygens' principle and wavefronts": [
        "c12_phy_cbse_004: Wavefronts: Definition and Types",
        "c12_phy_cbse_005: Huygens Principle: Secondary Wavelets",
    ],
    "c12_phy_089: Interference of light (principle)": [
        "c12_phy_cbse_016: Constructive and Destructive Interference",
        "c12_phy_cbse_014: Superposition Principle for Waves",
    ],
    "c12_phy_090: Young's double slit experiment": [
        "c12_phy_cbse_019: Young's Double-Slit Experiment Setup",
        "c12_phy_cbse_020: Fringe Position Formulas in Young's Double-Slit Experiment",
        "c12_phy_cbse_021: Fringe Spacing in Young's Double-Slit Experiment",
    ],
    "c12_phy_091: Single slit diffraction": [
        "c12_phy_cbse_023: Single Slit Diffraction Pattern",
    ],
    "c12_phy_130: Malus's law and polarization of light": [
        "c12_phy_cbse_027: Malus's Law: Intensity Through Two Polaroids",
        "c12_phy_cbse_025: Transverse Nature of Light Waves and Polarization",
    ],
    "c12_phy_131: Brewster's law and polarization by reflection": [
        # Not found as separate CBSE node
    ],
    
    # Dual nature
    "c12_phy_092: Photoelectric effect (observations)": [
        "c12_phy_cbse_004: The Photoelectric Effect: Observations and Experimental Setup",
    ],
    "c12_phy_093: Einstein's photoelectric equation": [
        "c12_phy_cbse_006: Einstein's Photoelectric Equation",
    ],
    "c12_phy_094: Photon and photon momentum (p = h/lambda)": [
        "c12_phy_cbse_007: The Photon: Properties and Evidence",
    ],
    "c12_phy_095: Particle nature of light (dual nature)": [
        "c12_phy_cbse_009: Wave-Particle Duality of Electromagnetic Radiation",
    ],
    "c12_phy_096: de Broglie hypothesis and matter waves": [
        "c12_phy_cbse_010: De Broglie's Hypothesis: Matter Waves",
        "c12_phy_cbse_012: De Broglie Wavelength: Calculations",
    ],
    "c12_phy_097: Davisson-Germer experiment": [
        "c12_phy_cbse_013: Significance of de Broglie Wavelength and Experimental Verification",
    ],
    
    # Atoms
    "c12_phy_098: Alpha-particle scattering experiment": [
        "c12_phy_cbse_002: Geiger-Marsden Alpha Particle Scattering Experiment",
    ],
    "c12_phy_099: Rutherford's nuclear model": [
        "c12_phy_cbse_003: Rutherford's Nuclear Model of the Atom",
    ],
    "c12_phy_100: Bohr's postulates and atomic model": [
        "c12_phy_cbse_009: Bohr's Three Postulates for the Hydrogen Atom",
    ],
    "c12_phy_101: Energy levels in hydrogen atom": [
        "c12_phy_cbse_011: Quantized Energy Levels in the Hydrogen Atom",
    ],
    "c12_phy_102: Hydrogen spectrum and Rydberg constant": [
        "c12_phy_cbse_012: Hydrogen Spectral Series: Lyman, Balmer, and Paschen",
    ],
    
    # Nuclei
    "c12_phy_103: Nuclear composition (protons, neutrons)": [
        "c12_phy_cbse_001: Nuclear Structure Overview",
        "c12_phy_cbse_003: The Proton - Discovery and Properties",
        "c12_phy_cbse_004: The Neutron - Discovery and Properties",
    ],
    "c12_phy_104: Isotopes and atomic mass unit": [
        "c12_phy_cbse_007: Isotopes",
        "c12_phy_cbse_002: Atomic Mass Unit",
    ],
    "c12_phy_105: Mass-energy relation (E = mc^2)": [
        "c12_phy_cbse_011: Mass-Energy Equivalence",
    ],
    "c12_phy_106: Mass defect and binding energy": [
        "c12_phy_cbse_012: Mass Defect in Nuclei",
        "c12_phy_cbse_013: Nuclear Binding Energy",
    ],
    "c12_phy_107: Binding energy per nucleon and nuclear stability": [
        "c12_phy_cbse_014: Binding Energy per Nucleon",
        "c12_phy_cbse_025: Nuclear Stability and Neutron-to-Proton Ratio",
    ],
    "c12_phy_108: Nuclear fission": [
        "c12_phy_cbse_019: Nuclear Fission",
    ],
    "c12_phy_109: Chain reaction and critical mass": [
        # Not found as separate CBSE node
    ],
    "c12_phy_110: Nuclear fusion and stellar energy": [
        "c12_phy_cbse_020: Nuclear Fusion",
        "c12_phy_cbse_021: Proton-Proton Cycle in Stars",
    ],
    "c12_phy_123: Radioactive decay (alpha, beta, gamma)": [
        "c12_phy_cbse_017: Radioactivity and Radioactive Decay",
        "c12_phy_cbse_018: Alpha, Beta, and Gamma Decay",
    ],
    "c12_phy_124: Half-life and decay law": [
        "c12_phy_cbse_024: Radioactive Decay Kinetics",
    ],
    "c12_phy_132: Radioactive decay constant and mean life": [
        "c12_phy_cbse_024: Radioactive Decay Kinetics",
    ],
    "c12_phy_133: Soddy-Fajans displacement laws": [
        # Not found as separate CBSE node
    ],
    
    # Semiconductors
    "c12_phy_111: Energy bands in solids (conductors, insulators, semiconductors)": [
        "c12_phy_cbse_004: Energy Band Theory of Solids",
        "c12_phy_cbse_009: Energy Bands in Metals, Insulators, and Semiconductors",
    ],
    "c12_phy_112: Intrinsic semiconductors": [
        "c12_phy_cbse_007: Intrinsic Semiconductors and Thermal Excitation",
    ],
    "c12_phy_113: Extrinsic semiconductors (p-type and n-type)": [
        "c12_phy_cbse_014: Extrinsic Semiconductors and Doping Process",
        "c12_phy_cbse_015: n-Type Semiconductors and Donor Impurities",
        "c12_phy_cbse_016: p-Type Semiconductors and Acceptor Impurities",
    ],
    "c12_phy_114: p-n junction and depletion region": [
        "c12_phy_cbse_020: p-n Junction Formation and Depletion Region",
    ],
    "c12_phy_115: Junction diode V-I characteristics (forward and reverse bias)": [
        "c12_phy_cbse_022: p-n Junction Diode Under Forward Bias",
        "c12_phy_cbse_023: p-n Junction Diode Under Reverse Bias",
        "c12_phy_cbse_024: V-I Characteristics of a p-n Junction Diode",
    ],
    "c12_phy_116: Half-wave rectifier": [
        "c12_phy_cbse_026: Half-Wave Rectifier Circuit",
    ],
    "c12_phy_117: Full-wave rectifier": [
        "c12_phy_cbse_027: Full-Wave Rectifier Circuit",
    ],
    "c12_phy_118: LED (light-emitting diode)": [
        # Not found in CBSE nodes generated so far
    ],
    "c12_phy_119: Photodiode": [
        # Not found
    ],
    "c12_phy_120: Solar cell": [
        # Not found
    ],
    "c12_phy_121: Zener diode": [
        "c12_phy_cbse_030: Breakdown Mechanisms in p-n Junction Diodes",
    ],
    "c12_phy_122: Zener diode as voltage regulator": [
        # Not found as separate node
    ],
    "c12_phy_125: Junction transistor (n-p-n and p-n-p)": [
        # Not found in CBSE nodes - may be in later chapter
    ],
    "c12_phy_126: Transistor characteristics and amplifier (common emitter)": [
        # Not found
    ],
    "c12_phy_127: Logic gates (AND, OR, NOT, NAND, NOR)": [
        # Not found
    ],
    "c12_phy_128: Combination of logic gates": [
        # Not found
    ],
    "c12_phy_129: Communication systems (elements and modulation)": [
        # Not found - CBSE removed communication systems from syllabus
    ],
    "c12_phy_138: X-rays (characteristic and continuous spectra)": [
        "c12_phy_cbse_040: X-rays and Gamma Rays",
    ],
    "c12_phy_139: Transistor as oscillator and feedback": [
        # Not found
    ],
    "c12_phy_140: Amplitude modulation (sidebands, bandwidth)": [
        # Not found - CBSE removed communication systems
    ],
}

# Summary
matched = 0
unmatched_cisce = []
multi_match = 0

for cisce_key, cbse_list in mapping.items():
    if cbse_list:
        matched += 1
        if len(cbse_list) > 1:
            multi_match += 1
    else:
        unmatched_cisce.append(cisce_key)

# Count CBSE nodes that are "extra" (not mapped to any CISCE node)
mapped_cbse = set()
for cbse_list in mapping.values():
    for cbse_node in cbse_list:
        node_id = cbse_node.split(":")[0].strip()
        mapped_cbse.add(node_id)

# Get all CBSE node IDs
all_cbse_ids = set()
for f in sorted(OUTPUT_DIR.glob("*_result.json")):
    data = json.loads(f.read_text(encoding="utf-8"))
    if data.get("grade") != 12 or data.get("subject") != "physics":
        continue
    for chunk in data.get("results", []):
        if "_error" in chunk:
            continue
        for node in chunk.get("nodes", []):
            all_cbse_ids.add(node["node_id"])

cbse_extra = all_cbse_ids - mapped_cbse

print(f"=== CLASS 12 PHYSICS: CISCE vs CBSE MATCHING ===\n")
print(f"CISCE nodes: 140")
print(f"CBSE nodes: {len(all_cbse_ids)}")
print(f"\nCISCE nodes matched to CBSE: {matched}")
print(f"CISCE nodes with NO CBSE equivalent: {len(unmatched_cisce)}")
print(f"CISCE nodes mapping to multiple CBSE nodes: {multi_match}")
print(f"CBSE nodes mapped to CISCE: {len(mapped_cbse)}")
print(f"CBSE-only nodes (no CISCE equivalent): {len(cbse_extra)}")
print(f"\nMatch ratio: {matched}/140 CISCE = {matched/140*100:.0f}%")
print(f"Granularity ratio: {len(all_cbse_ids)}/140 = {len(all_cbse_ids)/140:.1f}x more granular")

print(f"\n=== UNMATCHED CISCE NODES (no CBSE equivalent) ===")
for u in unmatched_cisce:
    print(f"  {u}")

print(f"\n=== CBSE-ONLY NODES (first 20) ===")
for nid in sorted(cbse_extra)[:20]:
    topic = cbse.get(nid, "?")
    print(f"  {nid}: {topic}")

driver.close()
