"""Show all CBSE-only physics nodes (no CISCE equivalent)."""
import json
from pathlib import Path

OUTPUT_DIR = Path(r"D:\platform\cbse_coverage_output")

# All CBSE class 12 physics nodes
all_cbse = {}
for f in sorted(OUTPUT_DIR.glob("*_result.json")):
    data = json.loads(f.read_text(encoding="utf-8"))
    if data.get("grade") != 12 or data.get("subject") != "physics":
        continue
    for chunk in data.get("results", []):
        if "_error" in chunk:
            continue
        for node in chunk.get("nodes", []):
            all_cbse[node["node_id"]] = node["topic"]

# CBSE nodes that were mapped to CISCE (from the manual match)
mapped_cbse_ids = {
    "c12_phy_cbse_001", "c12_phy_cbse_002", "c12_phy_cbse_003", "c12_phy_cbse_006",
    "c12_phy_cbse_007", "c12_phy_cbse_008", "c12_phy_cbse_009", "c12_phy_cbse_010",
    "c12_phy_cbse_011", "c12_phy_cbse_012", "c12_phy_cbse_013", "c12_phy_cbse_014",
    "c12_phy_cbse_015", "c12_phy_cbse_016", "c12_phy_cbse_017", "c12_phy_cbse_018",
    "c12_phy_cbse_019", "c12_phy_cbse_021", "c12_phy_cbse_004", "c12_phy_cbse_005",
    "c12_phy_cbse_020",
    # Magnetism ch
    "c12_phy_cbse_001", "c12_phy_cbse_002", "c12_phy_cbse_003", "c12_phy_cbse_004",
    "c12_phy_cbse_005", "c12_phy_cbse_006", "c12_phy_cbse_007", "c12_phy_cbse_008",
    "c12_phy_cbse_009", "c12_phy_cbse_010", "c12_phy_cbse_011", "c12_phy_cbse_012",
    "c12_phy_cbse_013", "c12_phy_cbse_015",
    # EMI
    "c12_phy_cbse_005", "c12_phy_cbse_007", "c12_phy_cbse_006", "c12_phy_cbse_009",
    "c12_phy_cbse_010", "c12_phy_cbse_012", "c12_phy_cbse_015", "c12_phy_cbse_016",
    "c12_phy_cbse_017", "c12_phy_cbse_018", "c12_phy_cbse_022",
    # AC
    "c12_phy_cbse_002", "c12_phy_cbse_003", "c12_phy_cbse_005", "c12_phy_cbse_007",
    "c12_phy_cbse_008", "c12_phy_cbse_009", "c12_phy_cbse_010", "c12_phy_cbse_012",
    "c12_phy_cbse_013", "c12_phy_cbse_014", "c12_phy_cbse_015", "c12_phy_cbse_017",
    "c12_phy_cbse_018", "c12_phy_cbse_021", "c12_phy_cbse_022",
    # EM waves
    "c12_phy_cbse_022", "c12_phy_cbse_029", "c12_phy_cbse_030", "c12_phy_cbse_034",
    "c12_phy_cbse_035", "c12_phy_cbse_036", "c12_phy_cbse_037", "c12_phy_cbse_038",
    "c12_phy_cbse_039", "c12_phy_cbse_040",
    # Ray optics
    "c12_phy_cbse_003", "c12_phy_cbse_005", "c12_phy_cbse_006", "c12_phy_cbse_007",
    "c12_phy_cbse_010", "c12_phy_cbse_011", "c12_phy_cbse_012", "c12_phy_cbse_015",
    "c12_phy_cbse_016", "c12_phy_cbse_017", "c12_phy_cbse_018", "c12_phy_cbse_019",
    "c12_phy_cbse_020", "c12_phy_cbse_022", "c12_phy_cbse_023", "c12_phy_cbse_024",
    # Wave optics
    "c12_phy_cbse_004", "c12_phy_cbse_005", "c12_phy_cbse_014", "c12_phy_cbse_016",
    "c12_phy_cbse_019", "c12_phy_cbse_020", "c12_phy_cbse_021", "c12_phy_cbse_023",
    "c12_phy_cbse_025", "c12_phy_cbse_027",
    # Dual nature
    "c12_phy_cbse_004", "c12_phy_cbse_006", "c12_phy_cbse_007", "c12_phy_cbse_009",
    "c12_phy_cbse_010", "c12_phy_cbse_012", "c12_phy_cbse_013",
    # Atoms
    "c12_phy_cbse_002", "c12_phy_cbse_003", "c12_phy_cbse_009", "c12_phy_cbse_011",
    "c12_phy_cbse_012",
    # Nuclei
    "c12_phy_cbse_001", "c12_phy_cbse_002", "c12_phy_cbse_003", "c12_phy_cbse_004",
    "c12_phy_cbse_007", "c12_phy_cbse_011", "c12_phy_cbse_012", "c12_phy_cbse_013",
    "c12_phy_cbse_014", "c12_phy_cbse_017", "c12_phy_cbse_018", "c12_phy_cbse_019",
    "c12_phy_cbse_020", "c12_phy_cbse_021", "c12_phy_cbse_024", "c12_phy_cbse_025",
    "c12_phy_cbse_040",
    # Semiconductors
    "c12_phy_cbse_004", "c12_phy_cbse_007", "c12_phy_cbse_009", "c12_phy_cbse_014",
    "c12_phy_cbse_015", "c12_phy_cbse_016", "c12_phy_cbse_020", "c12_phy_cbse_022",
    "c12_phy_cbse_023", "c12_phy_cbse_024", "c12_phy_cbse_026", "c12_phy_cbse_027",
    "c12_phy_cbse_030",
    # Magnetism matter
    "c12_phy_cbse_005_001", "c12_phy_cbse_005_002", "c12_phy_cbse_005_019",
    "c12_phy_cbse_005_020", "c12_phy_cbse_005_021", "c12_phy_cbse_005_022",
}

# Find CBSE-only (not in mapped set)
# Note: node IDs restart per chapter, so same ID appears in different chapters
# Need to be smarter - group by chapter
cbse_by_chapter = {}
for f in sorted(OUTPUT_DIR.glob("*_result.json")):
    data = json.loads(f.read_text(encoding="utf-8"))
    if data.get("grade") != 12 or data.get("subject") != "physics":
        continue
    chapter = data["chapter"]
    for chunk in data.get("results", []):
        if "_error" in chunk:
            continue
        for node in chunk.get("nodes", []):
            key = f"{chapter}_{node['node_id']}"
            cbse_by_chapter[key] = node["topic"]

# The mapped ones from the manual match - use topic text instead
mapped_topics = set()
mapped_topics_text = [
    "Electric Charge and Coulomb's Law", "Quantisation and Conservation of Charge",
    "Superposition of Electric Forces", "Continuous Charge Distribution",
    "Electric Field and Electric Field Lines", "Electric Flux and Field Concepts",
    "Electric Dipole: Concept and Dipole Moment", "Electric Field Due to a Dipole (Axial)",
    "Electric Field Due to a Dipole (Equatorial)", "Torque on a Dipole in Uniform Electric Field",
    "Electric Flux", "Gauss's Law and Applications", "Field Due to Infinite Line Charge",
    "Field Due to Infinite Plane Sheet", "Field Due to Spherical Shell",
    "Electric Potential and Potential Difference", "Potential Due to a Dipole",
    "Potential Due to a System of Charges", "Equipotential Surfaces",
    "Electrostatic Potential Energy of a Point Charge", "Electrostatic PE of a System of Charges",
    "Capacitance Concept", "Parallel Plate Capacitor", "Combination of Capacitors (Series and Parallel)",
    "Dielectrics and Polarization", "Energy Stored in a Capacitor", "Energy Density in Electric Field",
    "Drift Velocity and Mobility", "Ohm's Law", "Microscopic Basis and Derivation of Ohm's Law",
    "Resistivity and Conductivity", "Temperature Dependence of Resistance",
    "EMF and Internal Resistance", "Terminal Voltage and Lost Volts",
    "Kirchhoff's Laws", "Wheatstone Bridge", "Metre Bridge", "Potentiometer",
    "Magnetic Field and Oersted's Experiment", "Magnetic Field and Biot-Savart Law",
    "Magnetic Field Due to Circular Loop", "Magnetic Field Due to Solenoid",
    "Ampere's Circuital Law for Steady Currents", "Force on a Moving Charge in a Magnetic Field",
    "Lorentz Force", "Force on a Current-Carrying Conductor",
    "Force Between Parallel Current-Carrying Conductors", "Torque on a Current Loop",
    "Moving Coil Galvanometer", "Galvanometer to Ammeter", "Galvanometer to Voltmeter",
    "Bar Magnet as Equivalent Solenoid", "Magnetic Field Lines and Properties",
    "Diamagnetic Materials - Properties and Behavior", "Paramagnetic Materials - Properties and Behavior",
    "Ferromagnetic Materials - Domain Theory", "Hard and Soft Ferromagnetic Materials",
    "Magnetic Flux Through a Surface", "Faraday's Law of Electromagnetic Induction",
    "Lenz's Law: Direction of Induced EMF", "Lenz's Law and Conservation of Energy",
    "Motional EMF in a Moving Conductor", "Self-Inductance Concept and Definition",
    "Self-Inductance of a Long Solenoid", "Mutual Inductance Concept",
    "Mutual Inductance of Coaxial Solenoids", "AC Generator: Induced EMF Expression",
    "Transformers - Working Principle and Construction", "Transformer Turns Ratio and Voltage-Current Relations",
    "Sinusoidal AC Waveform and Mathematical Representation", "Root Mean Square (RMS) Values of AC",
    "AC Through a Pure Resistor - Ohm's Law and Phase Behavior",
    "AC Through a Pure Inductor - Phase Relationship", "Inductive Reactance",
    "AC Through a Pure Capacitor - Phase Relationship", "Capacitive Reactance",
    "Series LCR Circuit - Phasor Diagram Analysis", "Impedance in AC Circuits",
    "Resonance in Series LCR Circuits", "Power in AC Circuits - Average Power and Power Factor",
    "AC Generator: Principle and Construction",
    "Displacement Current", "Speed of Electromagnetic Waves",
    "Mathematical Representation of Electromagnetic Waves",
    "Electromagnetic Spectrum Overview", "Radio Waves", "Microwaves", "Infrared Waves",
    "Visible Light", "Ultraviolet Radiation", "X-rays and Gamma Rays",
    "Laws of Reflection from Spherical Mirrors", "Mirror Equation",
    "Linear Magnification by Spherical Mirrors", "Snell's Law of Refraction",
    "Total Internal Reflection and Critical Angle", "Applications of Total Internal Reflection",
    "Refraction Through a Prism", "Minimum Deviation and Prism Formula", "Dispersion of Light",
    "Refraction at a Spherical Surface", "Lens Maker's Formula",
    "Combination of Thin Lenses in Contact", "Power of a Lens",
    "Compound Microscope", "Refracting Telescope", "Reflecting Telescope and Cassegrain Design",
    "Wavefronts: Definition and Types", "Huygens Principle: Secondary Wavelets",
    "Constructive and Destructive Interference", "Superposition Principle for Waves",
    "Young's Double-Slit Experiment Setup", "Fringe Position Formulas in Young's Double-Slit Experiment",
    "Fringe Spacing in Young's Double-Slit Experiment", "Single Slit Diffraction Pattern",
    "Malus's Law: Intensity Through Two Polaroids", "Transverse Nature of Light Waves and Polarization",
    "The Photoelectric Effect: Observations and Experimental Setup",
    "Einstein's Photoelectric Equation", "The Photon: Properties and Evidence",
    "Wave-Particle Duality of Electromagnetic Radiation",
    "De Broglie's Hypothesis: Matter Waves", "De Broglie Wavelength: Calculations",
    "Significance of de Broglie Wavelength and Experimental Verification",
    "Geiger-Marsden Alpha Particle Scattering Experiment",
    "Rutherford's Nuclear Model of the Atom",
    "Bohr's Three Postulates for the Hydrogen Atom",
    "Quantized Energy Levels in the Hydrogen Atom",
    "Hydrogen Spectral Series: Lyman, Balmer, and Paschen",
    "Nuclear Structure Overview", "The Proton - Discovery and Properties",
    "The Neutron - Discovery and Properties", "Isotopes", "Atomic Mass Unit",
    "Mass-Energy Equivalence", "Mass Defect in Nuclei", "Nuclear Binding Energy",
    "Binding Energy per Nucleon", "Nuclear Stability and Neutron-to-Proton Ratio",
    "Nuclear Fission", "Nuclear Fusion", "Proton-Proton Cycle in Stars",
    "Radioactive Decay Kinetics", "Radioactivity and Radioactive Decay",
    "Alpha, Beta, and Gamma Decay",
    "Energy Band Theory of Solids", "Energy Bands in Metals, Insulators, and Semiconductors",
    "Intrinsic Semiconductors and Thermal Excitation",
    "Extrinsic Semiconductors and Doping Process",
    "n-Type Semiconductors and Donor Impurities", "p-Type Semiconductors and Acceptor Impurities",
    "p-n Junction Formation and Depletion Region",
    "p-n Junction Diode Under Forward Bias", "p-n Junction Diode Under Reverse Bias",
    "V-I Characteristics of a p-n Junction Diode",
    "Half-Wave Rectifier Circuit", "Full-Wave Rectifier Circuit",
    "Breakdown Mechanisms in p-n Junction Diodes",
]

def normalize(s):
    return s.lower().strip()

mapped_norm = set(normalize(t) for t in mapped_topics_text)

# Find CBSE-only nodes
cbse_only = []
for key, topic in cbse_by_chapter.items():
    if normalize(topic) not in mapped_norm:
        cbse_only.append((key, topic))

print(f"=== CBSE-ONLY PHYSICS NODES (no CISCE equivalent): {len(cbse_only)} ===\n")
for key, topic in sorted(cbse_only):
    print(f"  {key}: {topic}")
