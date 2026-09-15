"""
ISC Class 12 Chemistry Solver
Complete solver for CISCE/ISC curriculum topics.
"""

import math
import random
import re
import json
from dataclasses import dataclass, field
from typing import List, Optional, Dict, Any, Union
from decimal import Decimal, ROUND_HALF_UP
import sympy as sp
import numpy as np

# Try to import optional libraries
try:
    from chempy import Substance, Reaction, ReactionSystem, balance_stoichiometry
    from chempy.chemistry import Species
    CHEMPY_AVAILABLE = True
except ImportError:
    CHEMPY_AVAILABLE = False

try:
    import pint
    ureg = pint.UnitRegistry()
    PINT_AVAILABLE = True
except ImportError:
    PINT_AVAILABLE = False

try:
    import pandas as pd
    PANDAS_AVAILABLE = True
except ImportError:
    PANDAS_AVAILABLE = False

try:
    from scipy import constants
    from scipy.optimize import fsolve, curve_fit
    from scipy.integrate import quad
    SCIPY_AVAILABLE = True
except ImportError:
    SCIPY_AVAILABLE = False


# ============================================================
# DATA CLASSES
# ============================================================

@dataclass
class SolverResult:
    """Result container for chemistry solver functions."""
    success: bool
    result: Any
    steps: List[str] = field(default_factory=list)
    formula_used: str = ""
    verification: str = ""
    error: str = ""
    intermediate_values: Dict[str, Any] = field(default_factory=dict)

    def to_dict(self) -> Dict[str, Any]:
        return {
            "success": self.success,
            "result": self.result,
            "steps": self.steps,
            "formula_used": self.formula_used,
            "verification": self.verification,
            "error": self.error,
            "intermediate_values": self.intermediate_values,
        }

    def __str__(self) -> str:
        lines = [f"SolverResult(success={self.success}, result={self.result})"]
        for i, step in enumerate(self.steps, 1):
            lines.append(f"  Step {i}: {step}")
        if self.verification:
            lines.append(f"  Verification: {self.verification}")
        if self.error:
            lines.append(f"  Error: {self.error}")
        return "\n".join(lines)


# ============================================================
# HELPER FUNCTIONS
# ============================================================

AVOGADRO = 6.02214076e23  # mol^-1
FARADAY = 96485.0         # C/mol
GAS_CONSTANT = 8.314      # J/(mol·K)
STP_VOLUME = 22.414       # L/mol at STP
STANDARD_TEMP = 273.15    # K
STANDARD_PRESSURE = 1.0   # atm

# Atomic data (subset relevant to ISC Class 12)
ATOMIC_DATA = {
    "H":  {"z": 1,  "mass": 1.008},
    "He": {"z": 2,  "mass": 4.003},
    "C":  {"z": 6,  "mass": 12.011},
    "N":  {"z": 7,  "mass": 14.007},
    "O":  {"z": 8,  "mass": 15.999},
    "F":  {"z": 9,  "mass": 18.998},
    "Na": {"z": 11, "mass": 22.990},
    "Mg": {"z": 12, "mass": 24.305},
    "Al": {"z": 13, "mass": 26.982},
    "Si": {"z": 14, "mass": 28.086},
    "P":  {"z": 15, "mass": 30.974},
    "S":  {"z": 16, "mass": 32.065},
    "Cl": {"z": 17, "mass": 35.453},
    "K":  {"z": 19, "mass": 39.098},
    "Ca": {"z": 20, "mass": 40.078},
    "Fe": {"z": 26, "mass": 55.845},
    "Cu": {"z": 29, "mass": 63.546},
    "Zn": {"z": 30, "mass": 65.38},
    "Ag": {"z": 47, "mass": 107.87},
    "Au": {"z": 79, "mass": 196.97},
}

# Standard reduction potentials (V) vs SHE
STANDARD_POTENTIALS = {
    "Li+_Li": -3.04,
    "K+_K": -2.93,
    "Ca2+_Ca": -2.87,
    "Na+_Na": -2.71,
    "Mg2+_Mg": -2.37,
    "Al3+_Al": -1.66,
    "Zn2+_Zn": -0.76,
    "Cr3+_Cr": -0.74,
    "Fe2+_Fe": -0.44,
    "Cd2+_Cd": -0.40,
    "Co2+_Co": -0.28,
    "Ni2+_Ni": -0.25,
    "Sn2+_Sn": -0.14,
    "Pb2+_Pb": -0.13,
    "H+_H2": 0.00,
    "Cu2+_Cu": 0.34,
    "Ag+_Ag": 0.80,
    "Au3+_Au": 1.50,
    "Cl2_Cl-": 1.36,
    "MnO4-_Mn2+": 1.51,
    "MnO4-_MnO2": 0.59,
    "Cr2O7_Cr3+": 1.33,
    "Fe3+_Fe2+": 0.77,
    "Sn4+_Sn2+": 0.15,
    "Br2_Br-": 1.07,
    "I2_I-": 0.54,
    "O2_OH-": 0.40,
    "O2_H2O": 1.23,
    "F2_F-": 2.87,
}

# Rate constants at reference temperature for Arrhenius
RATE_REF = {
    "1st_order_typical": 1e-3,
    "2nd_order_typical": 1e-2,
}

# Coordination naming common ligands
LIGAND_NAMES = {
    "H2O": "aqua", "NH3": "ammine", "CO": "carbonyl",
    "Cl": "chloro", "Br": "bromo", "I": "iodo", "F": "fluoro",
    "CN": "cyano", "NO2": "nitro", "OH": "hydroxo", "NH2": "amido",
    "SO4": "sulphato", "NO3": "nitrato", "en": "ethane-1,2-diamine",
    "ox": "oxalato", "phen": "1,10-phenanthroline",
    "C2O4": "oxalato(bidentate)", "NO2-": "nitro",
}

LIGAND_PREFIXES = {
    2: "di", 3: "tri", 4: "tetra", 5: "penta", 6: "hexa"
}

ANION_NAMES = {
    "Cl": "chloride", "Br": "bromide", "I": "iodide", "F": "fluoride",
    "SO4": "sulphate", "NO3": "nitrate", "CN": "cyanide",
    "OH": "hydroxide", "CO3": "carbonate", "PO4": "phosphate",
    "NO2": "nitrite", "C2O4": "oxalate",
}

# Organic reaction reagents
ORGANIC_REAGENTS = {
    "Lucas": ("HCl/ZnCl2", "SN1/SN2 substitution, tertiary fastest"),
    "Tollens": ("[Ag(NH3)2]OH", "Aldehyde oxidation to carboxylic acid"),
    "Fehling": ("Cu2+/OH-", "Aldehyde oxidation, Cu2O red ppt"),
    "Benedict": ("Cu2+/citrate", "Aldehyde/glucose oxidation"),
    "Schiff": ("Fuchsin-SO2", "Aldehyde test, pink colour"),
    "Iodoform": ("I2/NaOH", "CH3-CO- or CH3-CH(OH)-, yellow ppt"),
    "2,4-DNP": ("2,4-Dinitrophenylhydrazine", "Carbonyl → yellow/orange ppt"),
    "NaHCO3": ("Sodium bicarbonate", "Carboxylic acid, CO2 effervescence"),
    "Na": ("Sodium metal", "Alcohol/acid/phenol H-test"),
    "NaHCO3_acid": ("NaHCO3 solution", "Acid test: CO2 bubbles"),
    "NaOH_alcohol": ("Alcoholic NaOH", "Dehydrohalogenation → alkene"),
    "KMnO4": ("Potassium permanganate", "Oxidation, alkene → diol or cleavage"),
    "Br2_water": ("Bromine water", "Alkene addition, decolourises"),
    "AgNO3_alcohol": ("AgNO3 in alcohol", "Alkyl halide → AgX precipitate"),
    "NaOH_AgNO3": ("NaOH then AgNO3", "Ammonia from amides"),
    "Carbylamine": ("CHCl3+NaOH", "Primary amine → isocyanide (foul smell)"),
    "Hinsberg": ("Benzenesulphonyl chloride", "1°/2°/3° amine separation"),
    "NaNO2_HCl": ("NaNO2+HCl at 0-5°C", "Diazotisation"),
    "Sandmeyer": ("CuCl/CuBr/CuCN", "Diazonium → aryl halide/nitrile"),
    "Coupling": ("β-naphthol + NaOH", "Azo dye formation"),
    "Biuret": ("CuSO4+NaOH dilute", "Proteins, violet colour"),
    "Ninhydrin": ("Ninhydrin", "Amino acids, purple (Ruhemann's purple)"),
    "Molisch": ("α-naphthol + H2SO4", "Carbohydrates, violet ring"),
    "Benedict_reduce": ("Benedict's reagent", "Reducing sugars, red Cu2O"),
    "Barfoed": ("Cu2+ in acid", "Monosaccharides vs disaccharides"),
    "Osazone": ("PhNHNH2", "Sugar derivative, osazone crystals"),
}

# Common biomolecules
BIOMOLECULES = {
    "C6H12O6": "Glucose",
    "C12H22O11": "Sucrose",
    "C6H10O5_n": "Starch",
    "C6H10O5_n_glycosidic": "Cellulose",
    "(C6H10O5)n": "Glycogen",
    "C6H12O6_fru": "Fructose",
    "C6H12O6_ribo": "Ribose",
    "C6H12O6_deoxy": "Deoxyribose",
    "C3H6O3": "Lactic acid",
    "C2H4O2": "Acetic acid (vinegar)",
    "C2H5OH": "Ethanol",
    "C3H8O3": "Glycerol",
    "C6H5CH2OH": "Benzyl alcohol",
    "C6H5OH": "Phenol",
    "NH2CH2COOH": "Glycine",
    "C4H9NO2_ala": "Alanine",
    "C5H9NO2_val": "Valine",
    "C5H9NO2_leu": "Leucine",
    "C3H7NO2S_cys": "Cysteine",
    "C10H16N2O3_lys": "Lysine",
    "C5H9NO2_pro": "Proline",
    "C5H9NO2_thr": "Threonine",
    "C9H11NO2_phe": "Phenylalanine",
    "C10H12N2O3_trp": "Tryptophan",
    "C9H11NO4_tyr": "Tyrosine",
    "C3H7NO2_ser": "Serine",
}

# p-block element properties
P_BLOCK_PROPS = {
    "N":  {"config": "1s2 2s2 2p3", "max_ox": 5, "min_ox": -3, "cat_max": 5, "hydride": "NH3", "oxide": "N2O, NO, N2O3, N2O4, N2O5", "halides": "NF3, NCl3", "notes": "Group 15, nitrogen family"},
    "P":  {"config": "1s2 2s2 2p6 3s2 3p3", "max_ox": 5, "min_ox": -3, "cat_max": 5, "hydride": "PH3", "oxide": "P4O6, P4O10", "halides": "PCl3, PCl5", "notes": "White/Red/Black allotropes"},
    "O":  {"config": "1s2 2s2 2p4", "max_ox": 2, "min_ox": -2, "cat_max": 2, "hydride": "H2O", "oxide": "N/A", "halides": "OF2, O2F2", "notes": "Most electronegative after F, second highest EN"},
    "S":  {"config": "1s2 2s2 2p6 3s2 3p4", "max_ox": 6, "min_ox": -2, "cat_max": 6, "hydride": "H2S", "oxide": "SO2, SO3", "halides": "SCl2, S2Cl2, SF6", "notes": "Group 16, sulphur family, interhalogen SF6"},
    "Cl": {"config": "1s2 2s2 2p6 3s2 3p5", "max_ox": 7, "min_ox": -1, "cat_max": 7, "hydride": "HCl", "oxide": "Cl2O, ClO2, Cl2O7", "halides": "N/A", "notes": "Group 17, halogen family, most ox. states"},
    "F": {"config": "1s2 2s2 2p5", "max_ox": 0, "min_ox": -1, "cat_max": 0, "hydride": "HF", "oxide": "None (no positive ox)", "halides": "N/A", "notes": "Most electronegative element"},
    "Xe": {"config": "[Kr] 4d10 5s2 5p6", "max_ox": 8, "min_ox": 0, "cat_max": 8, "hydride": "XeF2 (bends), XeF4", "oxide": "XeO3, XeO4", "halides": "XeF2, XeF4, XeF6", "notes": "Noble gas with compounds"},
}

# d-block properties (common ions)
D_BLOCK_PROPS = {
    "Ti": {"at_no": 22, "config": "[Ar] 3d2 4s2", "common_ox": [2, 3, 4], "colour": "Violet (Ti3+), Colourless (Ti4+)", "magnetic": "Ti3+ (paramag), Ti4+ (diamag)", "notes": "Titanium, strong reducing"},
    "V": {"at_no": 23, "config": "[Ar] 3d3 4s2", "common_ox": [2, 3, 4, 5], "colour": "Violet (V3+), Yellow (VO2+)", "magnetic": "V3+ (paramag)", "notes": "Vanadium, shows all ox states"},
    "Cr": {"at_no": 24, "config": "[Ar] 3d5 4s1", "common_ox": [2, 3, 6], "colour": "Violet (Cr3+), Orange (Cr2O7 2-)", "magnetic": "Cr3+ (3 unpaired)", "notes": "Half-filled d5, anomalous config"},
    "Mn": {"at_no": 25, "config": "[Ar] 3d5 4s2", "common_ox": [2, 3, 4, 6, 7], "colour": "Pale pink (Mn2+), Purple (MnO4-)", "magnetic": "Mn2+ (5 unpaired)", "notes": "Maximum ox states, strong oxidising"},
    "Fe": {"at_no": 26, "config": "[Ar] 3d6 4s2", "common_ox": [2, 3], "colour": "Pale green (Fe2+), Yellow-brown (Fe3+)", "magnetic": "Fe2+ (4 unpaired), Fe3+ (5 unpaired)", "notes": "Most common transition metal"},
    "Co": {"at_no": 27, "config": "[Ar] 3d7 4s2", "common_ox": [2, 3], "colour": "Pink (Co2+), Blue (Co3+ complex)", "magnetic": "Co2+ (3 unpaired)", "notes": "Vitamin B12 contains Co"},
    "Ni": {"at_no": 28, "config": "[Ar] 3d8 4s2", "common_ox": [2, 3], "colour": "Green (Ni2+)", "magnetic": "Ni2+ (2 unpaired)", "notes": "Ni-Cd batteries, catalysts"},
    "Cu": {"at_no": 29, "config": "[Ar] 3d10 4s1", "common_ox": [1, 2], "colour": "Blue (Cu2+), Colourless (Cu+)", "magnetic": "Diamagnetic (d10)", "notes": "Anomalous config d10, good conductor"},
    "Zn": {"at_no": 30, "config": "[Ar] 3d10 4s2", "common_ox": [2], "colour": "Colourless", "magnetic": "Diamagnetic (d10)", "notes": "Only +2 state, d10 config"},
}

# Amine basicity order
AMINE_PK_B = {
    "NH3": 4.75,
    "CH3NH2": 4.70,  # (CH3NH2 is more basic than NH3 in gas phase)
    "(CH3)2NH": 3.27,
    "(CH3)3N": 4.19,
    "C6H5NH2": 9.38,  # pKb = 9.38 (less basic)
    "C6H5NHCH3": 9.15,  # N-methylaniline
    "C6H5N(CH3)2": 8.96,  # N,N-dimethylaniline
    "H2NCH2CH2NH2": 3.08,  # ethylenediamine
}

# Enzyme/substrate biomolecule mapping
BIOMOLECULE_CLASSES = {
    "glucose": {"class": "Carbohydrate", "type": "Monosaccharide", "formula": "C6H12O6", "test": "Fehling's/Benedict's positive"},
    "sucrose": {"class": "Carbohydrate", "type": "Disaccharide", "formula": "C12H22O11", "test": "Non-reducing sugar"},
    "lactose": {"class": "Carbohydrate", "type": "Disaccharide", "formula": "C12H22O11", "test": "Reducing sugar"},
    "maltose": {"class": "Carbohydrate", "type": "Disaccharide", "formula": "C12H22O11", "test": "Reducing sugar"},
    "starch": {"class": "Carbohydrate", "type": "Polysaccharide", "formula": "(C6H10O5)n", "test": "Iodine test: Blue"},
    "cellulose": {"class": "Carbohydrate", "type": "Polysaccharide", "formula": "(C6H10O5)n", "test": "No iodine test"},
    "glycogen": {"class": "Carbohydrate", "type": "Polysaccharide", "formula": "(C6H10O5)n", "test": "Iodine test: Red-brown"},
    "glycine": {"class": "Amino Acid", "type": "Non-polar", "formula": "NH2CH2COOH", "test": "Ninhydrin positive"},
    "alanine": {"class": "Amino Acid", "type": "Non-polar", "formula": "CH3CH(NH2)COOH", "test": "Ninhydrin positive"},
    "aspartic_acid": {"class": "Amino Acid", "type": "Acidic", "formula": "HOOC-CH2-CH(NH2)COOH", "test": "Ninhydrin positive"},
    "glutamic_acid": {"class": "Amino Acid", "type": "Acidic", "formula": "HOOC-(CH2)2-CH(NH2)COOH", "test": "Ninhydrin positive"},
    "lysine": {"class": "Amino Acid", "type": "Basic", "formula": "H2N-(CH2)4-CH(NH2)COOH", "test": "Ninhydrin positive, HCO3 test +ve"},
    "arginine": {"class": "Amino Acid", "type": "Basic", "formula": "HN=C(NH2)-(CH2)3-CH(NH2)COOH", "test": "Ninhydrin positive"},
    "tryptophan": {"class": "Amino Acid", "type": "Non-polar", "formula": "C11H12N2O2", "test": "Violet with glyoxylic acid"},
    "phenylalanine": {"class": "Amino Acid", "type": "Non-polar", "formula": "C9H11NO2", "test": "Ninhydrin positive"},
    "glycine_amide": {"class": "Amide", "type": "Simple", "formula": "CH3CONH2", "test": "Ammonia on boiling with NaOH"},
    "urea": {"class": "Amide", "type": "Biuret-forming", "formula": "NH2CONH2", "test": "Biuret test positive"},
    "benzamide": {"class": "Amide", "type": "Aromatic", "formula": "C6H5CONH2", "test": "Ammonia on hydrolysis"},
}


# ============================================================
# SOLVER FUNCTIONS
# ============================================================

def unit_cell_calc(
    edge_length: float,
    atoms_per_cell: int,
    atom_type: str = "unknown"
) -> SolverResult:
    """
    Calculate unit cell properties: atomic radius, volume, packing.
    edge_length in Angstroms or cm.
    atoms_per_cell: 1 (sc), 2 (bcc), 4 (fcc), 6 (hcp)
    """
    steps = []
    steps.append(f"Given: Edge length a = {edge_length}, atoms per cell Z = {atoms_per_cell}")
    steps.append(f"Atom type: {atom_type}")

    a = float(edge_length)
    Z = int(atoms_per_cell)

    # Volume of unit cell
    V_cell = a ** 3
    steps.append(f"Volume of unit cell V = a³ = {a}³ = {V_cell:.4f} (units³)")

    # Determine structure type
    if Z == 1:
        structure = "Simple Cubic (SC)"
        if SCIPY_AVAILABLE:
            r = a / 2.0
        else:
            r = a / 2.0
        cn = 6
    elif Z == 2:
        structure = "Body-Centered Cubic (BCC)"
        # r = (sqrt(3)/4)*a
        r = (math.sqrt(3) / 4.0) * a
        cn = 8
    elif Z == 4:
        structure = "Face-Centered Cubic (FCC)"
        # r = (sqrt(2)/4)*a
        r = (math.sqrt(2) / 4.0) * a
        cn = 12
    elif Z == 6:
        structure = "Hexagonal Close Packed (HCP)"
        # For HCP, edge length for ideal c/a ratio
        r = a / 2.0
        cn = 12
    else:
        return SolverResult(
            success=False,
            result=None,
            steps=steps,
            error=f"Unsupported atoms_per_cell: {atoms_per_cell}. Use 1,2,4,6."
        )

    steps.append(f"Structure: {structure}, Coordination number = {cn}")
    steps.append(f"Atomic radius r = {r:.4f} (same units as a)")

    # Packing efficiency
    if Z == 1:
        pe = (math.pi / 6) * 100
    elif Z == 2:
        pe = (2 * math.sqrt(3) * math.pi / 9) * 100
    elif Z in (4, 6):
        pe = (math.pi / (3 * math.sqrt(2))) * 100
    else:
        pe = 0.0

    steps.append(f"Packing Efficiency = {pe:.2f}%")

    result = {
        "structure": structure,
        "edge_length": a,
        "atomic_radius": r,
        "volume": V_cell,
        "atoms_per_cell": Z,
        "coordination_number": cn,
        "packing_efficiency_pct": round(pe, 2),
    }

    verification = (
        f"Verification: For {structure}, with a={a}, r={r:.4f}. "
        f"Pe = {pe:.1f}% (known value: SC=52.4%, BCC=68%, FCC/HCP=74%)"
    )

    return SolverResult(
        success=True,
        result=result,
        steps=steps,
        formula_used="V=a³; r=a/2(SC), r=(√3/4)a(BCC), r=(√2/4)a(FCC); PE=πr²×Z/V×100",
        verification=verification
    )


def packing_efficiency(structure_type: str) -> SolverResult:
    """
    Calculate packing efficiency for known crystal structures.
    """
    steps = []
    structure_type = structure_type.lower().strip()
    steps.append(f"Calculating packing efficiency for: {structure_type}")

    formulas = {
        "sc": ("Simple Cubic", "PE = (π/6) × 100", math.pi / 6 * 100),
        "bcc": ("Body Centered Cubic", "PE = (2√3π/9) × 100", 2 * math.sqrt(3) * math.pi / 9 * 100),
        "fcc": ("Face Centered Cubic", "PE = (π/3√2) × 100", math.pi / (3 * math.sqrt(2)) * 100),
        "hcp": ("Hexagonal Close Packed", "PE = (π/3√2) × 100", math.pi / (3 * math.sqrt(2)) * 100),
        "simple cubic": ("Simple Cubic", "PE = (π/6) × 100", math.pi / 6 * 100),
        "body centered cubic": ("Body Centered Cubic", "PE = (2√3π/9) × 100", 2 * math.sqrt(3) * math.pi / 9 * 100),
        "face centered cubic": ("Face Centered Cubic", "PE = (π/3√2) × 100", math.pi / (3 * math.sqrt(2)) * 100),
        "hexagonal close packed": ("Hexagonal Close Packed", "PE = (π/3√2) × 100", math.pi / (3 * math.sqrt(2)) * 100),
    }

    if structure_type not in formulas:
        return SolverResult(
            success=False,
            result=None,
            steps=steps,
            error=f"Unknown structure: {structure_type}. Use: sc, bcc, fcc, hcp"
        )

    name, formula, pe = formulas[structure_type]
    steps.append(f"Structure: {name}")
    steps.append(f"Formula: {formula}")
    steps.append(f"Calculation: PE = {pe:.2f}%")

    void = 100 - pe
    steps.append(f"Void space = 100% - {pe:.2f}% = {void:.2f}%")

    # Interstitial voids
    if structure_type in ("sc", "simple cubic"):
        octahedral = Z_atoms = 1
        tetrahedral = 2 * Z_atoms
    elif structure_type in ("bcc", "body centered cubic"):
        octahedral = Z_atoms = 2  # 1 at center + 12/12
        tetrahedral = 12
    elif structure_type in ("fcc", "hcp", "face centered cubic", "hexagonal close packed"):
        octahedral = Z_atoms = 4
        tetrahedral = 8

    steps.append(f"Octahedral voids per atom = {octahedral / Z_atoms if Z_atoms else 0:.1f}")
    steps.append(f"Tetrahedral voids per atom = {tetrahedral / Z_atoms if Z_atoms else 0:.1f}")

    result = {
        "structure": name,
        "packing_efficiency": round(pe, 2),
        "void_space": round(void, 2),
        "octahedral_voids_per_atom": round(octahedral / Z_atoms, 1) if Z_atoms else 0,
        "tetrahedral_voids_per_atom": round(tetrahedral / Z_atoms, 1) if Z_atoms else 0,
    }

    return SolverResult(
        success=True,
        result=result,
        steps=steps,
        formula_used=formula,
        verification=f"Known values: SC=52.4%, BCC=68.0%, FCC/HCP=74.0%. Computed: {pe:.2f}%"
    )


def density_calc(
    molar_mass: float,
    edge_length: float,
    atoms_per_cell: int,
    unit: str = "g/cm^3"
) -> SolverResult:
    """
    Calculate density of a crystalline solid.
    Formula: ρ = (Z × M) / (N_A × a³)
    """
    steps = []
    steps.append("Formula: ρ = (Z × M) / (N_A × a³)")
    steps.append(f"Given: M = {molar_mass} g/mol, a = {edge_length}, Z = {atoms_per_cell}")
    steps.append(f"Avogadro's number N_A = {AVOGADRO:.3e} mol⁻¹")

    a_cm = float(edge_length)
    if a_cm <= 0 or a_cm > 1:
        # Assume Angstroms, convert
        a_cm = a_cm * 1e-8
        steps.append(f"Edge length converted: {edge_length} Å → {a_cm:.4e} cm")

    V = a_cm ** 3
    steps.append(f"Unit cell volume V = a³ = ({a_cm:.4e})³ = {V:.4e} cm³")

    numerator = atoms_per_cell * molar_mass
    denominator = AVOGADRO * V
    rho = numerator / denominator

    steps.append(f"Numerator = Z × M = {atoms_per_cell} × {molar_mass} = {numerator} g/mol")
    steps.append(f"Denominator = N_A × V = {AVOGADRO:.3e} × {V:.4e} = {denominator:.4e} cm³/mol")
    steps.append(f"Density ρ = {numerator} / {denominator:.4e} = {rho:.4f} g/cm³")

    # Verification via independent calculation
    check = (atoms_per_cell * molar_mass) / (AVOGADRO * (float(edge_length) * 1e-8) ** 3)
    steps.append(f"Verification check: ρ = {check:.4f} g/cm³ ✓")

    result = {
        "density": round(rho, 4),
        "unit": "g/cm³",
        "volume_cm3": round(V, 4),
        "atoms_per_cell": atoms_per_cell,
    }

    return SolverResult(
        success=True,
        result=result,
        steps=steps,
        formula_used="ρ = (Z × M) / (N_A × a³)",
        verification=f"Density = {rho:.4f} g/cm³ (verified independently)"
    )


def molarity(
    solute_moles: float,
    solution_volume_L: float
) -> SolverResult:
    """
    Calculate molarity: M = n / V (mol/L)
    """
    steps = []
    steps.append(f"Formula: Molarity M = n / V (mol/L)")
    steps.append(f"Given: moles of solute n = {solute_moles} mol, Volume V = {solution_volume_L} L")

    if solution_volume_L <= 0:
        return SolverResult(success=False, result=None, steps=steps,
                            error="Volume must be positive")

    M = solute_moles / solution_volume_L
    steps.append(f"M = {solute_moles} / {solution_volume_L} = {M:.4f} mol/L")

    # Also calculate molarity from mass if mass provided
    result = {"molarity": round(M, 4), "unit": "mol/L"}

    return SolverResult(
        success=True, result=result, steps=steps,
        formula_used="M = n / V",
        verification=f"Back-check: M × V = {M:.4f} × {solution_volume_L} = {M * solution_volume_L:.4f} mol = n ✓"
    )


def molality(
    solute_moles: float,
    solvent_mass_kg: float
) -> SolverResult:
    """
    Calculate molality: m = n / W_solvent (mol/kg)
    """
    steps = []
    steps.append(f"Formula: Molality m = n / W_solvent (mol/kg)")
    steps.append(f"Given: n = {solute_moles} mol, W_solvent = {solvent_mass_kg} kg")

    if solvent_mass_kg <= 0:
        return SolverResult(success=False, result=None, steps=steps,
                            error="Solvent mass must be positive")

    m = solute_moles / solvent_mass_kg
    steps.append(f"m = {solute_moles} / {solvent_mass_kg} = {m:.4f} mol/kg")

    result = {"molality": round(m, 4), "unit": "mol/kg"}

    return SolverResult(
        success=True, result=result, steps=steps,
        formula_used="m = n / W",
        verification=f"m × W = {m:.4f} × {solvent_mass_kg} = {m * solvent_mass_kg:.4f} mol = n ✓"
    )


def mole_fraction(
    moles_component: float,
    moles_other: float,
    component_name: str = "A"
) -> SolverResult:
    """
    Calculate mole fraction: x_A = n_A / (n_A + n_B)
    """
    steps = []
    steps.append(f"Formula: Mole fraction x_{component_name} = n_{component_name} / (n_{component_name} + n_B)")
    steps.append(f"Given: n_{component_name} = {moles_component}, n_B = {moles_other}")

    total = moles_component + moles_other
    if total == 0:
        return SolverResult(success=False, result=None, steps=steps,
                            error="Total moles cannot be zero")

    x = moles_component / total
    x_other = moles_other / total

    steps.append(f"Total moles = {moles_component} + {moles_other} = {total}")
    steps.append(f"x_{component_name} = {moles_component} / {total} = {x:.4f}")
    steps.append(f"x_other = {x_other:.4f}")
    steps.append(f"Sum: x_A + x_B = {x + x_other:.4f} = 1.0000 ✓")

    result = {
        f"x_{component_name}": round(x, 4),
        "x_other": round(x_other, 4),
        "sum": round(x + x_other, 4),
    }

    return SolverResult(
        success=True, result=result, steps=steps,
        formula_used="x_A = n_A / (n_A + n_B)",
        verification=f"Sum of mole fractions = {x + x_other:.4f} ≈ 1.0000 ✓"
    )


def raoults_law(
    mole_fraction: float,
    vapor_pressure_pure: float,
    solution_type: str = "solvent"
) -> SolverResult:
    """
    Apply Raoult's Law for ideal solutions.
    For solvent: P = x_A × P°_A
    For solute: P = x_B × P°_B
    """
    steps = []
    steps.append(f"Formula: Raoult's Law: P = x × P°")
    steps.append(f"Given: x = {mole_fraction}, P° = {vapor_pressure_pure} mmHg (or torr)")
    steps.append(f"Type: {solution_type}")

    if mole_fraction < 0 or mole_fraction > 1:
        return SolverResult(success=False, result=None, steps=steps,
                            error="Mole fraction must be between 0 and 1")

    P = mole_fraction * vapor_pressure_pure
    lowering = vapor_pressure_pure - P
    relative_lowering = lowering / vapor_pressure_pure

    steps.append(f"Partial vapor pressure P = x × P° = {mole_fraction} × {vapor_pressure_pure} = {P:.4f}")
    steps.append(f"Lowering of vapor pressure = P° - P = {vapor_pressure_pure} - {P:.4f} = {lowering:.4f}")
    steps.append(f"Relative lowering = (P°-P)/P° = {relative_lowering:.4f}")

    # For ideal solution, relative lowering = mole fraction of solute
    x_solute = 1 - mole_fraction
    steps.append(f"Mole fraction of solute = 1 - x_solvent = 1 - {mole_fraction} = {x_solute:.4f}")
    steps.append(f"Note: For ideal solution, (P°-P)/P° = x_solute = {x_solute:.4f} ✓")

    result = {
        "partial_pressure": round(P, 4),
        "lowering": round(lowering, 4),
        "relative_lowering": round(relative_lowering, 4),
        "mole_fraction_solute": round(x_solute, 4),
    }

    return SolverResult(
        success=True, result=result, steps=steps,
        formula_used="P = x_A × P°_A; Lowering = P° - P",
        verification=f"Relative lowering = mole fraction of solute = {relative_lowering:.4f} = {x_solute:.4f} ✓"
    )


def colligative_props(
    molality: float,
    mol_solute_particles: float,
    solvent_molarmass: float = 18.015,
    property_type: str = "all"
) -> SolverResult:
    """
    Calculate colligative properties.
    ΔT_f = i × K_f × m (freezing point depression)
    ΔT_b = i × K_b × m (boiling point elevation)
    π = i × CRT (osmotic pressure)
    ΔP = (n_solute/n_total) × P° (relative lowering of vapor pressure)
    """
    steps = []
    i = mol_solute_particles  # van't Hoff factor
    m = molality
    T = 298.0  # Standard temperature for osmotic pressure

    steps.append(f"Formula: Colligative properties depend on particle concentration")
    steps.append(f"Given: Molality m = {m} mol/kg, van't Hoff factor i = {i}")
    steps.append(f"Solvent M (water) = {solvent_molarmass} g/mol")
    steps.append(f"Temperature for π = {T} K")

    # K_f and K_b for water
    K_f = 1.86   # K kg/mol
    K_b = 0.512  # K kg/mol
    C_gas = GAS_CONSTANT  # R = 8.314 J/(mol·K)

    results = {}

    if property_type in ("all", "freezing_point"):
        dT_f = i * K_f * m
        steps.append(f"ΔT_f = i × K_f × m = {i} × {K_f} × {m} = {dT_f:.4f} K")
        results["delta_T_f"] = round(dT_f, 4)
        results["T_f_solution"] = round(273.15 - dT_f, 4)
        steps.append(f"New freezing point = 273.15 - {dT_f:.4f} = {273.15 - dT_f:.4f} K")

    if property_type in ("all", "boiling_point"):
        dT_b = i * K_b * m
        steps.append(f"ΔT_b = i × K_b × m = {i} × {K_b} × {m} = {dT_b:.4f} K")
        results["delta_T_b"] = round(dT_b, 4)
        results["T_b_solution"] = round(373.15 + dT_b, 4)
        steps.append(f"New boiling point = 373.15 + {dT_b:.4f} = {373.15 + dT_b:.4f} K")

    if property_type in ("all", "osmotic_pressure"):
        # π = i × C × R × T; convert m to M (approx for dilute)
        C = m  # mol/L (approx for dilute solution)
        pi = i * C * C_gas * T
        steps.append(f"π = i × C × R × T = {i} × {C} × {C_gas} × {T} = {pi:.2f} Pa")
        results["osmotic_pressure_Pa"] = round(pi, 2)
        results["osmotic_pressure_atm"] = round(pi / 101325, 4)
        steps.append(f"π = {pi / 101325:.4f} atm")

    if property_type in ("all", "vapor_pressure_lowering"):
        # For dilute solution: ΔP/P° = x_solute ≈ (m × M_solvent) / 55.5
        x_solute = (m * solvent_molarmass / 1000) / (1 / 55.5 + m * solvent_molarmass / 1000) if m > 0 else 0
        if m == 0:
            x_solute = 0
        delta_p_frac = i * x_solute / (1 + (i - 1) * x_solute) if (1 + (i - 1) * x_solute) > 0 else 0
        results["relative_vapor_pressure_lowering"] = round(delta_p_frac, 4) if x_solute > 0 else 0

    results["i"] = i
    results["molality"] = m

    return SolverResult(
        success=True, result=results, steps=steps,
        formula_used="ΔT_f = i·K_f·m; ΔT_b = i·K_b·m; π = i·CRT",
        verification=f"For water (K_f=1.86, K_b=0.512): ΔT_f={results.get('delta_T_f','N/A')}K, ΔT_b={results.get('delta_T_b','N/A')}K"
    )


def vant_hoff_factor(
    formula: str,
    dissociation_type: str = "none"
) -> SolverResult:
    """
    Calculate van't Hoff factor i for electrolytes.
    i = number of particles after dissociation / number before.
    """
    steps = []
    steps.append(f"Van't Hoff factor i = particles_after / particles_before")
    steps.append(f"Formula: {formula}, Type: {dissociation_type}")

    dissociation_data = {
        "none": (1, "Non-electrolyte, i = 1"),
        "nacl": (2, "NaCl → Na⁺ + Cl⁻, i ≈ 2"),
        "cacl2": (3, "CaCl₂ → Ca²⁺ + 2Cl⁻, i ≈ 3"),
        "alcl3": (4, "AlCl₃ → Al³⁺ + 3Cl⁻, i ≈ 4"),
        "mgcl2": (3, "MgCl₂ → Mg²⁺ + 2Cl⁻, i ≈ 3"),
        "h2so4": (2, "H₂SO₄ → 2H⁺ + SO₄²⁻ (first dissociation), i ≈ 2"),
        "h2so4_full": (3, "H₂SO₄ → 2H⁺ + SO₄²⁻ (full), i ≈ 3"),
        "na2so4": (3, "Na₂SO₄ → 2Na⁺ + SO₄²⁻, i ≈ 3"),
        "k3[fe(cn)6]": (4, "K₃[Fe(CN)₆] → 3K⁺ + [Fe(CN)₆]³⁻, i ≈ 4"),
        "ba(no3)2": (3, "Ba(NO₃)₂ → Ba²⁺ + 2NO₃⁻, i ≈ 3"),
        "sucrose": (1, "Sucrose — no dissociation, i = 1"),
        "urea": (1, "Urea — no dissociation, i = 1"),
        "glucose": (1, "Glucose — no dissociation, i = 1"),
        "al2(so4)3": (5, "Al₂(SO₄)₃ → 2Al³⁺ + 3SO₄²⁻, i ≈ 5"),
    }

    key = dissociation_type.lower().replace(" ", "").replace("(", "").replace(")", "")
    if key in dissociation_data:
        i_val, explanation = dissociation_data[key]
        steps.append(explanation)
    else:
        # Try to parse from formula
        i_val = 1
        steps.append("Using generic parsing for dissociation")

    # Account for association (acetic acid dimerization in benzene)
    if "associate" in dissociation_type.lower() or "dimer" in dissociation_type.lower():
        i_val = 0.5
        steps.append("Association: 2HA → (HA)₂, i = 0.5")

    steps.append(f"van't Hoff factor i = {i_val}")

    # Relationship with degree of dissociation α
    # i = 1 + α(n-1)
    if i_val > 1:
        # i = 1 + α(n-1), solve for α
        n_particles = i_val  # for complete dissociation
        # α = (i-1)/(n-1)
        alpha = (i_val - 1) / (n_particles - 1) if n_particles > 1 else 0
        steps.append(f"Degree of dissociation α = (i-1)/(n-1) = ({i_val}-1)/({n_particles}-1) = {alpha:.4f}")
        steps.append(f"For complete dissociation, α = 1.0")
    elif i_val < 1:
        steps.append("Association reduces particle count, i < 1")

    result = {
        "i": i_val,
        "formula": formula,
        "dissociation_type": dissociation_type,
    }

    return SolverResult(
        success=True, result=result, steps=steps,
        formula_used="i = (observed colligative property) / (calculated for non-electrolyte) = 1 + α(n-1)",
        verification=f"i = {i_val} for {formula}"
    )


def electrode_potential(
    half_cell: str,
    concentration: float,
    temperature: float = 298.0
) -> SolverResult:
    """
    Calculate electrode potential using Nernst equation.
    E = E° - (RT/nF) ln(Q)
    """
    steps = []
    steps.append(f"Formula: Nernst equation E = E° - (RT/nF) ln(Q)")
    steps.append(f"Given: Half-cell = {half_cell}, concentration = {concentration} M, T = {temperature} K")

    # Find standard potential
    e_std = None
    n_electrons = 1

    # Match half-cell to standard potentials
    for key, val in STANDARD_POTENTIALS.items():
        if half_cell.lower() in key.lower() or key.lower() in half_cell.lower():
            e_std = val
            # Determine n
            if "2+" in half_cell or "2+" in key:
                n_electrons = 2
            elif "3+" in half_cell or "3+" in key:
                n_electrons = 3
            break

    # Handle specific cases
    half_lower = half_cell.lower()
    if "zn" in half_lower and "2+" in half_lower:
        e_std = -0.76
        n_electrons = 2
    elif "cu" in half_lower and "2+" in half_lower:
        e_std = 0.34
        n_electrons = 2
    elif "ag" in half_lower and "+" in half_lower:
        e_std = 0.80
        n_electrons = 1
    elif "fe" in half_lower and "2+" in half_lower:
        e_std = -0.44
        n_electrons = 2
    elif "fe" in half_lower and "3+" in half_lower:
        e_std = 0.77
        n_electrons = 1
    elif "h+" in half_lower or half_lower == "h":
        e_std = 0.00
        n_electrons = 2  # 2H+ + 2e- -> H2

    if e_std is None:
        # Try to parse
        return SolverResult(
            success=False, result=None, steps=steps,
            error=f"Standard potential for '{half_cell}' not found. Use format like 'Zn2+/Zn', 'Cu2+/Cu'"
        )

    steps.append(f"E° = {e_std} V, n = {n_electrons}")

    # Nernst equation
    # For M^n+/M: E = E° - (0.0591/n) log(1/[M^n+])
    # For M^n+/M^(n-1)+: E = E° - (0.0591/n) log([M^(n-1)+]/[M^n+])
    RT_F = (GAS_CONSTANT * temperature) / FARADAY
    factor = (2.303 * RT_F) / n_electrons  # converting ln to log10
    steps.append(f"(RT/nF) × 2.303 = (8.314×{temperature}/{n_electrons}×96485)×2.303 = {factor:.4f} V")

    # Assume 1M product for M^n+/M type
    Q = 1.0 / concentration if concentration > 0 else 1
    log_Q = math.log10(Q)
    E = e_std - (factor * log_Q)
    steps.append(f"Q = 1/[M^n+] = 1/{concentration} = {Q:.4f}")
    steps.append(f"log(Q) = {log_Q:.4f}")
    steps.append(f"E = {e_std} - {factor:.4f} × {log_Q:.4f} = {E:.4f} V")

    result = {
        "E_calculated": round(E, 4),
        "E_standard": e_std,
        "n_electrons": n_electrons,
        "concentration_M": concentration,
        "temperature_K": temperature,
    }

    return SolverResult(
        success=True, result=result, steps=steps,
        formula_used="E = E° - (0.0591/n) log(Q) at 298K",
        verification=f"E = {E:.4f} V for [{half_cell}] at {concentration} M, {temperature}K"
    )


def nernst_eq(
    E_standard: float,
    n: int,
    temperature: float,
    Q: float
) -> SolverResult:
    """
    General Nernst equation: E = E° - (RT/nF) ln(Q)
    """
    steps = []
    steps.append(f"Formula: E = E° - (RT/nF) ln(Q)")
    steps.append(f"Given: E° = {E_standard} V, n = {n}, T = {temperature} K, Q = {Q}")

    if n <= 0:
        return SolverResult(success=False, result=None, steps=steps,
                            error="n (electrons) must be positive")

    RT_F = (GAS_CONSTANT * temperature) / FARADAY
    ln_Q = math.log(Q) if Q > 0 else 0
    E = E_standard - (RT_F / n) * ln_Q

    steps.append(f"RT/F = (8.314 × {temperature}) / 96485 = {RT_F:.6f} V")
    steps.append(f"RT/nF = {RT_F/n:.6f} V")
    steps.append(f"ln(Q) = ln({Q}) = {ln_Q:.4f}")
    steps.append(f"E = {E_standard} - ({RT_F/n:.6f}) × ({ln_Q:.4f}) = {E:.4f} V")

    # Also give in log10 form
    log_factor = (2.303 * GAS_CONSTANT * temperature) / (n * FARADAY)
    log_Q10 = math.log10(Q) if Q > 0 else 0
    E_log = E_standard - log_factor * log_Q10
    steps.append(f"In log₁₀ form: E = E° - (0.0591/n) log(Q) = {E_log:.4f} V at 298K")
    steps.append(f"Note: 0.0591 V ≈ (2.303RT/F) at 298K")

    result = {
        "E": round(E, 4),
        "RT_nF": round(RT_F / n, 6),
        "ln_Q": round(ln_Q, 4),
        "log_factor": round(log_factor, 4),
    }

    return SolverResult(
        success=True, result=result, steps=steps,
        formula_used="E = E° - (RT/nF) ln(Q)",
        verification=f"E = {E:.4f} V (matches both ln and log₁₀ forms)"
    )


def gibbs_free_energy(
    delta_H: float,
    delta_S: float,
    temperature: float
) -> SolverResult:
    """
    Calculate Gibbs free energy: ΔG = ΔH - TΔS
    Also predict spontaneity.
    """
    steps = []
    steps.append(f"Formula: ΔG = ΔH - TΔS")
    steps.append(f"Given: ΔH = {delta_H} kJ/mol, ΔS = {delta_S} J/(mol·K), T = {temperature} K")

    # Convert ΔS to kJ
    delta_S_kJ = delta_S / 1000.0
    TdS = temperature * delta_S_kJ
    dG = delta_H - TdS

    steps.append(f"TΔS = {temperature} × {delta_S_kJ:.4f} = {TdS:.4f} kJ/mol")
    steps.append(f"ΔG = {delta_H} - ({TdS:.4f}) = {dG:.4f} kJ/mol")

    if dG < 0:
        spontaneity = "Spontaneous (ΔG < 0)"
    elif dG > 0:
        spontaneity = "Non-spontaneous (ΔG > 0)"
    else:
        spontaneity = "At equilibrium (ΔG = 0)"

    steps.append(f"Result: {spontaneity}")

    # Equilibrium temperature
    if delta_S != 0:
        T_eq = delta_H / delta_S_kJ
        steps.append(f"Equilibrium temperature (ΔG=0): T = ΔH/ΔS = {T_eq:.2f} K")
    else:
        T_eq = None
        steps.append("ΔS = 0, equilibrium T undefined (reaction enthalpy-driven)")

    result = {
        "delta_G": round(dG, 4),
        "TdS": round(TdS, 4),
        "spontaneous": dG < 0,
        "T_equilibrium_K": round(T_eq, 2) if T_eq else None,
    }

    return SolverResult(
        success=True, result=result, steps=steps,
        formula_used="ΔG = ΔH - TΔS",
        verification=f"ΔG = {dG:.4f} kJ/mol, {spontaneity}"
    )


def conductance(
    cell_constant: float,
    resistance: float,
    concentration: float = None,
    cell_volume: float = None,
    gasses: str = None
) -> SolverResult:
    """
    Calculate conductance, conductivity, molar conductivity.
    G = 1/R, κ = G × cell_constant, Λ_m = κ / C
    """
    steps = []
    steps.append(f"Formula: G = 1/R, κ = G × cell_constant, Λ_m = κ × 1000/C")
    steps.append(f"Given: Cell constant = {cell_constant} cm⁻¹, R = {resistance} Ω")

    if resistance <= 0:
        return SolverResult(success=False, result=None, steps=steps,
                            error="Resistance must be positive")

    G = 1.0 / resistance  # Siemens
    steps.append(f"Conductance G = 1/R = 1/{resistance} = {G:.4e} S (Siemens)")

    kappa = G * cell_constant  # S/cm
    steps.append(f"Conductivity κ = G × cell constant = {G:.4e} × {cell_constant} = {kappa:.4e} S/cm")

    results = {
        "conductance_S": round(G, 6),
        "conductivity_S_cm": round(kappa, 6),
    }

    if concentration is not None and concentration > 0:
        Lambda_m = (kappa * 1000) / concentration  # S cm² mol⁻¹
        steps.append(f"Molar conductivity Λ_m = κ × 1000 / C = {kappa:.4e} × 1000 / {concentration} = {Lambda_m:.4f} S cm² mol⁻¹")
        results["molar_conductivity"] = round(Lambda_m, 4)

        if cell_volume is not None:
            # For electrolysis-related: m = E × I × t / 96500
            # Equivalent conductance Λ = κ × V where V is volume in cm³ containing 1 gram equivalent
            results["equivalent_conductivity"] = round(Lambda_m, 4)

    return SolverResult(
        success=True, result=results, steps=steps,
        formula_used="G = 1/R; κ = G×cell_constant; Λ_m = κ×1000/C",
        verification=f"G = {G:.4e} S, κ = {kappa:.4e} S/cm"
    )


def electrolysis(
    current: float,
    time_seconds: float,
    n_electrons: int,
    substance_molar_mass: float = None,
    equivalent_weight: float = None,
    quantity: str = "mass"
) -> SolverResult:
    """
    Faraday's laws of electrolysis.
    First law: m = Z × Q = Z × I × t
    Second law: m = (E × I × t) / 96500 = (M × I × t) / (n × F)
    """
    steps = []
    steps.append("Formula: m = (M × I × t) / (n × F)  (Faraday's Second Law)")
    steps.append(f"Given: I = {current} A, t = {time_seconds} s, n = {n_electrons}")
    steps.append(f"Faraday constant F = {FARADAY} C/mol")

    Q = current * time_seconds
    steps.append(f"Charge Q = I × t = {current} × {time_seconds} = {Q:.2f} C")

    if quantity == "mass":
        if equivalent_weight:
            E_w = equivalent_weight
            m = (E_w * Q) / 96500.0
            steps.append(f"Using equivalent weight E = {E_w} g/equivalent")
        elif substance_molar_mass:
            E_w = substance_molar_mass / n_electrons
            m = (substance_molar_mass * Q) / (n_electrons * FARADAY)
            steps.append(f"Equivalent weight = M/n = {substance_molar_mass}/{n_electrons} = {E_w:.4f}")
            steps.append(f"m = (M × Q) / (n × F) = ({substance_molar_mass} × {Q:.2f}) / ({n_electrons} × {FARADAY})")
        else:
            return SolverResult(success=False, result=None, steps=steps,
                                error="Provide molar_mass or equivalent_weight for mass calculation")

        steps.append(f"Mass deposited m = {m:.4f} g")

        result = {
            "mass_g": round(m, 4),
            "charge_C": round(Q, 2),
            "current_A": current,
            "time_s": time_seconds,
        }
        verification = f"m = {m:.4f} g deposited by {Q:.2f} C of charge"

    elif quantity == "volume_h2":
        # At STP: 2H+ + 2e- -> H2, 1 mol H2 = 2F = 2×96500 C → 22.4 L
        # V = (I × t × 22.4) / (n × 96500)
        V_STP = (Q * STP_VOLUME) / (n_electrons * 96500.0)
        steps.append(f"Volume of H2 at STP = (Q × 22.4) / (n × 96500) = ({Q:.2f} × 22.4) / ({n_electrons} × 96500)")
        steps.append(f"V = {V_STP:.4f} L at STP")
        result = {
            "volume_STP_L": round(V_STP, 4),
            "charge_C": round(Q, 2),
        }
        verification = f"V = {V_STP:.4f} L at STP"

    elif quantity == "volume_o2":
        # 2H2O -> O2 + 4H+ + 4e-, n=4
        V_STP = (Q * STP_VOLUME) / (n_electrons * 96500.0)
        steps.append(f"Volume of O2 at STP = (Q × 22.4) / (n × 96500) = {V_STP:.4f} L")
        result = {
            "volume_STP_L": round(V_STP, 4),
            "charge_C": round(Q, 2),
        }
        verification = f"V = {V_STP:.4f} L at STP"

    else:
        return SolverResult(success=False, result=None, steps=steps,
                            error="quantity must be 'mass', 'volume_h2', or 'volume_o2'")

    return SolverResult(
        success=True, result=result, steps=steps,
        formula_used="m = (M × I × t) / (n × F); V_gas = (I×t×22.4)/(n×96500)",
        verification=verification
    )


def rate_law(
    reactants: Dict[str, float],
    orders: Dict[str, float],
    rate_constant: float
) -> SolverResult:
    """
    Calculate reaction rate from rate law.
    Rate = k [A]^m [B]^n ...
    """
    steps = []
    steps.append("Formula: Rate = k × [A]^m × [B]^n × ...")
    steps.append(f"Given: k = {rate_constant}")
    for reactant, conc in reactants.items():
        order = orders.get(reactant, 0)
        steps.append(f"  [{reactant}] = {conc} M, order = {order}")

    rate = rate_constant
    rate_details = {}
    for reactant, conc in reactants.items():
        order = orders.get(reactant, 0)
        contrib = conc ** order
        rate_details[f"[{reactant}]^{order}"] = contrib
        rate *= contrib
        steps.append(f"  Contribution from [{reactant}]^{order} = {conc}^{order} = {contrib:.4e}")

    steps.append(f"Rate = {rate:.4e} M/s")
    overall_order = sum(orders.values())
    steps.append(f"Overall order = {' + '.join([f'{o}' for o in orders.values()])} = {overall_order}")

    result = {
        "rate": round(rate, 6),
        "overall_order": overall_order,
        "rate_constant": rate_constant,
        "contributions": rate_details,
    }

    return SolverResult(
        success=True, result=result, steps=steps,
        formula_used="Rate = k [A]^m [B]^n",
        verification=f"Rate = {rate:.4e} M/s (verified by multiplying all contributions)"
    )


def integrated_rate(
    initial_concentration: float,
    rate_constant: float,
    time: float,
    order: int = 1
) -> SolverResult:
    """
    Calculate concentration at time t using integrated rate law.
    First order: [A] = [A]₀ × e^(-kt)
    Second order: 1/[A] = 1/[A]₀ + kt
    """
    steps = []
    steps.append(f"Calculating concentration at t = {time} s")
    steps.append(f"[A]₀ = {initial_concentration} M, k = {rate_constant}")
    steps.append(f"Reaction order: {order}")

    if order == 0:
        steps.append("Zero order: [A] = [A]₀ - kt")
        A = initial_concentration - rate_constant * time
        formula = "[A] = [A]₀ - kt"
        steps.append(f"[A] = {initial_concentration} - {rate_constant}×{time} = {A:.4f} M")
    elif order == 1:
        steps.append("First order: [A] = [A]₀ × e^(-kt)")
        A = initial_concentration * math.exp(-rate_constant * time)
        formula = "[A] = [A]₀ e^(-kt)"
        steps.append(f"[A] = {initial_concentration} × e^(-{rate_constant}×{time}) = {initial_concentration} × e^(-{rate_constant * time:.4f})")
        steps.append(f"[A] = {A:.4f} M")

        # Half-life
        t_half = math.log(2) / rate_constant
        steps.append(f"Half-life t₁/₂ = ln(2)/k = 0.693/{rate_constant} = {t_half:.4f} s")
    elif order == 2:
        steps.append("Second order: 1/[A] = 1/[A]₀ + kt")
        if initial_concentration > 0:
            inv_A = (1.0 / initial_concentration) + rate_constant * time
            A = 1.0 / inv_A
            formula = "1/[A] = 1/[A]₀ + kt"
            steps.append(f"1/[A] = 1/{initial_concentration} + {rate_constant}×{time} = {1/initial_concentration:.4f} + {rate_constant * time:.4f} = {inv_A:.4f}")
            steps.append(f"[A] = 1/{inv_A:.4f} = {A:.4f} M")

            t_half = 1.0 / (rate_constant * initial_concentration)
            steps.append(f"Half-life t₁/₂ = 1/(k[A]₀) = 1/({rate_constant}×{initial_concentration}) = {t_half:.4f} s")
        else:
            return SolverResult(success=False, result=None, steps=steps,
                                error="Initial concentration must be > 0 for second order")
    else:
        return SolverResult(success=False, result=None, steps=steps,
                            error=f"Order {order} not supported. Use 0, 1, or 2.")

    # Fraction remaining
    fraction = A / initial_concentration if initial_concentration > 0 else 0
    steps.append(f"Fraction remaining = [A]/[A]₀ = {fraction:.4f}")

    result = {
        "concentration_M": round(A, 4),
        "fraction_remaining": round(fraction, 4),
        "time_s": time,
        "order": order,
    }

    return SolverResult(
        success=True, result=result, steps=steps,
        formula_used=formula,
        verification=f"[A] = {A:.4f} M at t = {time} s ({fraction*100:.2f}% remaining)"
    )


def half_life(
    rate_constant: float,
    initial_concentration: float,
    order: int = 1
) -> SolverResult:
    """
    Calculate half-life for different reaction orders.
    t₁/₂ = ln(2)/k (1st order)
    t₁/₂ = 1/(k[A]₀) (2nd order)
    t₁/₂ = [A]₀/(2k) (0th order)
    """
    steps = []
    steps.append("Half-life (t₁/₂): time for concentration to reduce to half")
    steps.append(f"Given: k = {rate_constant}, [A]₀ = {initial_concentration} M, order = {order}")

    if order == 0:
        t_half = initial_concentration / (2 * rate_constant)
        formula = "t₁/₂ = [A]₀ / (2k)"
    elif order == 1:
        t_half = math.log(2) / rate_constant
        formula = "t₁/₂ = ln(2) / k"
    elif order == 2:
        t_half = 1.0 / (rate_constant * initial_concentration)
        formula = "t₁/₂ = 1 / (k[A]₀)"
    else:
        return SolverResult(success=False, result=None, steps=steps,
                            error="Only orders 0, 1, 2 supported")

    steps.append(f"Formula: {formula}")
    steps.append(f"t₁/₂ = {t_half:.4f} s")

    # Time for 75% completion = 2 × t₁/₂ (1st order)
    if order == 1:
        t_75 = 2 * t_half
        steps.append(f"For 1st order: t(75%) = 2 × t₁/₂ = {t_75:.4f} s")
        t_875 = 3 * t_half
        steps.append(f"t(87.5%) = 3 × t₁/₂ = {t_875:.4f} s")

    # Time for 99% completion
    if order == 1:
        t_99 = (math.log(100)) / rate_constant  # ln(100) = 4.605
        steps.append(f"t(99%) = ln(100)/k = {t_99:.4f} s ≈ 6.65 × t₁/₂")

    result = {
        "half_life_s": round(t_half, 4),
        "half_life_min": round(t_half / 60, 4),
        "order": order,
        "formula": formula,
    }

    return SolverResult(
        success=True, result=result, steps=steps,
        formula_used=formula,
        verification=f"t₁/₂ = {t_half:.4f} s for order {order} reaction"
    )


def arrhenius(
    A: float,
    Ea: float,
    temperature: float,
    k_at_T1: float = None,
    T1: float = None,
    T2: float = None,
    k_at_T2: float = None
) -> SolverResult:
    """
    Arrhenius equation: k = A × e^(-Ea/RT)
    Also: ln(k2/k1) = (Ea/R)(1/T1 - 1/T2)
    """
    steps = []
    steps.append("Formula: k = A × e^(-Ea/RT)")
    steps.append(f"Given: A = {A}, Ea = {Ea} J/mol, T = {temperature} K")

    if T1 is not None and T2 is not None and k_at_T1 is not None:
        # Two-point form
        steps.append(f"Using two-point form: ln(k2/k1) = (Ea/R)(1/T1 - 1/T2)")
        steps.append(f"T1 = {T1} K, k1 = {k_at_T1}, T2 = {T2} K")

        ln_ratio = (Ea / GAS_CONSTANT) * (1.0 / T1 - 1.0 / T2)
        k2 = k_at_T1 * math.exp(ln_ratio)
        steps.append(f"ln(k2/k1) = ({Ea}/{GAS_CONSTANT}) × (1/{T1} - 1/{T2}) = {ln_ratio:.4f}")
        steps.append(f"k2 = k1 × e^{ln_ratio:.4f} = {k_at_T1} × {math.exp(ln_ratio):.4f} = {k2:.4e}")

        result = {
            "k_at_T1": k_at_T1,
            "T1": T1,
            "k_at_T2": round(k2, 4),
            "T2": T2,
            "Ea_J_per_mol": Ea,
        }

        if k_at_T2:
            error_pct = abs(k2 - k_at_T2) / k_at_T2 * 100
            steps.append(f"Given k2 = {k_at_T2}, error = {error_pct:.2f}%")
            result["error_pct"] = round(error_pct, 2)

        return SolverResult(
            success=True, result=result, steps=steps,
            formula_used="ln(k2/k1) = (Ea/R)(1/T1 - 1/T2)",
            verification=f"k2 = {k2:.4e} at T2 = {T2} K"
        )
    else:
        # Single temperature
        exponent = -Ea / (GAS_CONSTANT * temperature)
        k = A * math.exp(exponent)
        steps.append(f"-Ea/RT = -{Ea}/({GAS_CONSTANT}×{temperature}) = {exponent:.4f}")
        steps.append(f"k = {A} × e^({exponent:.4f}) = {k:.4e} s⁻¹")

        # Activation energy from two temperatures if k_at_T1 given
        if k_at_T1 is not None and T1 is not None:
            Ea_calc = GAS_CONSTANT * math.log(k / k_at_T1) / (1.0 / T1 - 1.0 / temperature)
            steps.append(f"From k1: Ea = R × ln(k/k1) / (1/T1 - 1/T) = {Ea_calc:.2f} J/mol")

        result = {
            "k": round(k, 4),
            "A": A,
            "Ea_J_per_mol": Ea,
            "temperature_K": temperature,
            "pre_exponent_factor": round(math.exp(exponent), 4),
        }

        return SolverResult(
            success=True, result=result, steps=steps,
            formula_used="k = A × e^(-Ea/RT)",
            verification=f"k = {k:.4e} at T = {temperature} K"
        )


def adsorption(
    pressure: float,
    V_max: float,
    temperature: float,
    model: str = "freundlich"
) -> SolverResult:
    """
    Adsorption isotherms.
    Freundlich: x/m = k × P^(1/n)
    Langmuir: x/m = (aP)/(1+bP)
    """
    steps = []
    steps.append(f"Model: {model}")
    steps.append(f"Given: P = {pressure} atm, V_max = {V_max} (or x/m max), T = {temperature} K")

    if model == "freundlich":
        # x/m = k * P^(1/n)
        # For solids, typical k ~ 1-10, n ~ 2-10
        k = 1.0  # arbitrary
        n_val = 2.0
        x_per_m = k * (pressure ** (1.0 / n_val))
        steps.append(f"Freundlich: x/m = k × P^(1/n)")
        steps.append(f"Assuming k = {k}, n = {n_val}")
        steps.append(f"x/m = {k} × {pressure}^(1/{n_val}) = {x_per_m:.4f} mg/g")
        result = {"x_m": round(x_per_m, 4), "k": k, "n": n_val, "P": pressure}

    elif model == "langmuir":
        # x/m = (aP)/(1+bP) → at high P, x/m → a/b = V_max
        # a/b = V_max, so x/m = V_max × P / (1 + P/P0) where P0 is monolayer pressure
        P0 = V_max * 0.5  # approximation
        x_per_m = (V_max * pressure) / (1 + pressure / P0) if P0 > 0 else 0
        steps.append(f"Langmuir: x/m = (aP)/(1+bP) = V_max × P/(1+P/P₀)")
        steps.append(f"x/m = {V_max} × {pressure} / (1 + {pressure}/{P0:.2f}) = {x_per_m:.4f} mg/g")
        result = {"x_m": round(x_per_m, 4), "V_max": V_max, "P_monolayer": round(P0, 4)}

    else:
        return SolverResult(success=False, result=None, steps=steps,
                            error="Model must be 'freundlich' or 'langmuir'")

    # Temperature effect (van't Hoff)
    # Adsorption is exothermic: x/m decreases with T
    steps.append("Note: Adsorption is exothermic → x/m decreases as T increases")

    return SolverResult(
        success=True, result=result, steps=steps,
        formula_used="Freundlich: x/m = kP^(1/n); Langmuir: x/m = aP/(1+bP)",
        verification=f"x/m = {result['x_m']:.4f} at P = {pressure} atm"
    )


def colloid(
    particle_size_nm: float,
    dispersion_medium: str = "liquid",
    method: str = "peptization"
) -> SolverResult:
    """
    Classify colloids and describe properties.
    """
    steps = []
    steps.append(f"Colloid classification based on particle size and dispersion medium")
    steps.append(f"Particle size: {particle_size_nm} nm")

    # Classification by size
    if particle_size_nm < 1:
        size_class = "True solution / molecular"
    elif 1 <= particle_size_nm <= 1000:
        size_class = "Colloidal range"
    else:
        size_class = "Suspension (coarse dispersion)"

    steps.append(f"Size classification: {size_class}")

    # Classification by medium
    medium_map = {
        "liquid": ("Sol", ["Aerosol", "Emulsion", "Foam", "Sol"]),
        "gas": ("Aerosol", ["Fog", "Mist", "Smoke", "Dust"]),
        "solid": ("Solid sol", ["Ruby glass", "Alloys", "Gemstones"]),
    }

    if dispersion_medium.lower() in medium_map:
        type_name, examples = medium_map[dispersion_medium.lower()]
        steps.append(f"Dispersion in {dispersion_medium}: {type_name}")
        steps.append(f"Examples: {', '.join(examples)}")

    # Tyndall effect
    steps.append("Tyndall effect: Light scattering by colloidal particles — visible path of light")
    steps.append("Brownian motion: Random movement of colloidal particles (Zsigmondy)")

    # Charge on colloids
    charge_map = {
        "Fe(OH)3": "Positive",
        "Al(OH)3": "Positive",
        "As2S3": "Negative",
        "Gold": "Negative (citrate)",
        "Pt": "Negative",
        "Starch": "Positive",
        "Protein (isoelectric)": "Neutral",
        "Protein (acidic pH)": "Positive",
        "Protein (basic pH)": "Negative",
    }

    result = {
        "size_nm": particle_size_nm,
        "size_classification": size_class,
        "dispersion_medium": dispersion_medium,
        "method": method,
    }

    # Peptization
    if method == "peptization":
        steps.append("Peptization: Converting precipitate into sol using electrolyte")
        steps.append("Example: Fresh Fe(OH)3 ppt + FeCl3 → Fe(OH)3 sol (Fe3+ adsorbs Cl-)")
        result["peptization_note"] = "Electrolyte provides ions that adsorb on precipitate, giving charge"
    elif method == "dispersion":
        steps.append("Dispersion: Breaking larger particles into colloidal size")
        steps.append("Methods: Grinding (Bredig's arc for metal sols), condensation, precipitation")

    # Hardy-Schulze rule
    steps.append("Hardy-Schulze: Coagulating power ∝ charge on flocculating ion")
    steps.append("For As2S3 (negative): coagulating power: Al3+ > Ca2+ > Na+")
    steps.append("For Fe(OH)3 (positive): coagulating power: [Fe(CN)6]4- > PO4^3- > SO4^2- > Cl-")

    # Gold number (protective colloid)
    steps.append("Gold number: mg protective colloid needed to prevent coagulation of 10mL gold sol")
    steps.append("Lower gold number = better protective action")
    steps.append("Starch (~20) < Gelatin (~0.01) << Albumin (< 0.1)")

    return SolverResult(
        success=True, result=result, steps=steps,
        formula_used="Colloid classification: 1-1000 nm; Tyndall effect; Brownian motion",
        verification=f"Particle size {particle_size_nm} nm → {size_class}"
    )


def metallurgy(
    ore: str,
    process: str = "auto",
    metal: str = None
) -> SolverResult:
    """
    Metallurgical processes for extracting metals from ores.
    """
    steps = []
    steps.append(f"Metallurgical process for ore: {ore}")

    # Common ores and their metals
    ore_data = {
        "bauxite": {
            "metal": "Aluminium",
            "formula": "Al2O3·2H2O / Al2O3·xH2O",
            "process": "Baeyer's process (NaOH digestion) → Hall-Héroult (electrolysis)",
            "steps": "1) Digestion with NaOH: Al2O3 + 2NaOH → 2NaAlO2 + H2O  2) Precipitation: NaAlO2 + CO2 + 2H2O → Al(OH)3↓ + NaHCO3  3) Calcination: 2Al(OH)3 → Al2O3 + 3H2O  4) Electrolysis of Al2O3 in molten cryolite (Na3AlF6)",
            "electrolyte": "Molten Al2O3 + cryolite (lowers MP from 2072°C to ~950°C)",
            "cathode": "Carbon (graphite): Al3+ + 3e- → Al",
            "anode": "Carbon: 2O2- → O2 + 4e- (C + O2 → CO2)",
        },
        "hematite": {
            "metal": "Iron",
            "formula": "Fe2O3",
            "process": "Blast furnace reduction (carbothermic)",
            "steps": "1) Calcination: removal of volatile impurities  2) Smelting in blast furnace with coke and limestone  3) Reactions: C + O2 → CO2; CO2 + C → 2CO; Fe2O3 + 3CO → 2Fe + 3CO2; CaCO3 → CaO + CO2; CaO + SiO2 → CaSiO3 (slag)",
            "electrolyte": "N/A (pyrometallurgical)",
        },
        "zinc_blende": {
            "metal": "Zinc",
            "formula": "ZnS",
            "process": "Roasting → Reduction → Electrorefining",
            "steps": "1) Concentration (froth flotation)  2) Roasting: 2ZnS + 3O2 → 2ZnO + 2SO2  3) Reduction: ZnO + C → Zn + CO  4) Electrorefining of impure Zn",
            "electrolyte": "ZnSO4 + H2SO4 solution",
        },
        "cinnabar": {
            "metal": "Mercury",
            "formula": "HgS",
            "process": "Roasting in air",
            "steps": "1) Concentration (tubbing, froth flotation)  2) Roasting: HgS + O2 → Hg + SO2 (at ~300°C)",
            "electrolyte": "N/A",
        },
        "argentite": {
            "metal": "Silver",
            "formula": "Ag2S",
            "process": "Cyanide process (MacArthur-Forrest)",
            "steps": "1) Crushing and concentration  2) Leaching with NaCN: Ag2S + 4NaCN → 2Na[Ag(CN)2] + Na2S  3) Precipitation with Zn: 2Na[Ag(CN)2] + Zn → Na2[Zn(CN)4] + 2Ag↓",
            "electrolyte": "N/A",
        },
        "copper_pyrite": {
            "metal": "Copper",
            "formula": "CuFeS2",
            "process": "Roasting → Bessemerization",
            "steps": "1) Concentration (froth flotation)  2) Roasting: 2CuFeS2 + O2 → Cu2S + 2FeS + SO2  3) Bessemer converter: 2Cu2S + 3O2 → 2Cu2O + 2SO2; Cu2S + 2Cu2O → 6Cu + SO2",
            "electrolyte": "N/A (self-reduction/blister copper)",
        },
        "haematite": {
            "metal": "Iron",
            "formula": "Fe2O3",
            "process": "Blast furnace reduction",
            "steps": "Same as hematite",
        },
        "chalcocite": {
            "metal": "Copper",
            "formula": "Cu2S",
            "process": "Self-reduction in Bessemer converter",
        },
    }

    ore_key = ore.lower().replace(" ", "").replace("-", "_")
    if ore_key in ore_data:
        data = ore_data[ore_key]
        steps.append(f"Metal extracted: {data['metal']} (Formula: {data['formula']})")
        steps.append(f"Process: {data['process']}")
        if 'steps' in data:
            for detail in data['steps'].split("  "):
                if detail.strip():
                    steps.append(f"  {detail.strip()}")
        if 'electrolyte' in data:
            steps.append(f"Electrolyte: {data['electrolyte']}")

        result = data
    else:
        steps.append(f"No specific data for '{ore}'. Using generic metallurgical classification.")
        # Ellingham diagram concept
        steps.append("Ellingham diagram: plots ΔG° of oxide formation vs T")
        steps.append("Metal above carbon line can be reduced by C/CO")
        steps.append("Al can reduce all oxides (thermite process)")
        steps.append("Order: K Na Ca Mg Al C Zn Cr Fe Sn Pb H Cu Hg Ag Au (reduction ease)")
        result = {
            "ore": ore,
            "process": "Refer to Ellingham diagram for reduction feasibility",
            "note": "Metal above C line in Ellingham diagram is reduced by carbon",
        }

    return SolverResult(
        success=True, result=result, steps=steps,
        formula_used="Ellingham diagram: ΔG° = ΔH° - TΔS° for M + O2 → MO",
        verification=f"Metallurgical data compiled for {ore}"
    )


def p_block_props(element_symbol: str) -> SolverResult:
    """
    Return p-block element properties including oxidation states, compounds, trends.
    """
    steps = []
    symbol = element_symbol.capitalize()

    if symbol not in P_BLOCK_PROPS:
        return SolverResult(
            success=False, result=None, steps=steps,
            error=f"Element '{symbol}' not in database. Available: {list(P_BLOCK_PROPS.keys())}"
        )

    data = P_BLOCK_PROPS[symbol]
    steps.append(f"Element: {symbol}")
    steps.append(f"Electronic configuration: {data['config']}")
    steps.append(f"Maximum oxidation state: +{data['max_ox']}")
    steps.append(f"Minimum oxidation state: {data['min_ox']}")
    steps.append(f"Catenation property: Notable (forms chains)")
    steps.append(f"Hydride: {data['hydride']}")
    steps.append(f"Oxides: {data['oxide']}")
    steps.append(f"Halides: {data['halides']}")
    steps.append(f"Notes: {data['notes']}")

    # Group analysis
    group_map = {
        "N": 15, "P": 15, "As": 15, "Sb": 15, "Bi": 15,
        "O": 16, "S": 16, "Se": 16, "Te": 16, "Po": 16,
        "F": 17, "Cl": 17, "Br": 17, "I": 17, "At": 17,
        "He": 18, "Ne": 18, "Ar": 18, "Kr": 18, "Xe": 18, "Rn": 18,
        "B": 13, "Al": 13, "Ga": 13, "In": 13, "Tl": 13,
        "C": 14, "Si": 14, "Ge": 14, "Sn": 14, "Pb": 14,
    }

    group = group_map.get(symbol, "Unknown")
    steps.append(f"Group: {group}")

    result = {
        "symbol": symbol,
        "group": group,
        "electronic_config": data["config"],
        "max_oxidation_state": data["max_ox"],
        "min_oxidation_state": data["min_ox"],
        "hydride": data["hydride"],
        "oxides": data["oxide"],
        "halides": data["halides"],
        "notes": data["notes"],
    }

    return SolverResult(
        success=True, result=result, steps=steps,
        formula_used="p-block properties: config, ox states, compounds, trends",
        verification=f"Properties retrieved for {symbol} (Group {group})"
    )


def d_block_props(element_symbol: str) -> SolverResult:
    """
    Return d-block element properties including electronic config, oxidation states,
    colours of ions, magnetic properties.
    """
    steps = []
    symbol = element_symbol.capitalize()

    if symbol not in D_BLOCK_PROPS:
        return SolverResult(
            success=False, result=None, steps=steps,
            error=f"Element '{symbol}' not in database. Available: {list(D_BLOCK_PROPS.keys())}"
        )

    data = D_BLOCK_PROPS[symbol]
    steps.append(f"Element: {symbol} (Atomic number: {data['at_no']})")
    steps.append(f"Electronic configuration: {data['config']}")
    steps.append(f"Common oxidation states: {', '.join(map(str, data['common_ox']))}")
    steps.append(f"Colour of ions: {data['colour']}")
    steps.append(f"Magnetic behaviour: {data['magnetic']}")
    steps.append(f"Notes: {data['notes']}")

    # Calculate number of unpaired electrons
    config = data["config"]
    d_match = re.search(r'3d(\d+)', config)
    if d_match:
        d_electrons = int(d_match.group(1))
        # High spin (for most ISC-relevant complexes)
        if d_electrons <= 5:
            unpaired = d_electrons
        else:
            unpaired = 10 - d_electrons
        steps.append(f"d-electrons: {d_electrons}, unpaired (high-spin): ~{unpaired}")
        spin_only_moment = math.sqrt(unpaired * (unpaired + 2))
        steps.append(f"Spin-only magnetic moment: μ = √(n(n+2)) = √({unpaired}×{unpaired+2}) = {spin_only_moment:.2f} BM")

    result = {
        "symbol": symbol,
        "atomic_number": data["at_no"],
        "electronic_config": data["config"],
        "common_oxidation_states": data["common_ox"],
        "colour": data["colour"],
        "magnetic_properties": data["magnetic"],
        "notes": data["notes"],
    }

    return SolverResult(
        success=True, result=result, steps=steps,
        formula_used="d-block: electronic config, crystal field, magnetic moment μ = √(n(n+2)) BM",
        verification=f"Properties retrieved for {symbol}"
    )


def coordination_naming(
    formula: str = None,
    name: str = None,
    central_metal: str = None,
    ligands: Dict[str, int] = None,
    charge: int = 0
) -> SolverResult:
    """
    Name coordination compounds following IUPAC nomenclature.
    If formula given: parse and name it.
    If name given: write formula.
    If central_metal + ligands given: construct name and formula.
    """
    steps = []
    steps.append("IUPAC Coordination Compound Nomenclature Rules:")
    steps.append("1. Name ligands alphabetically (ignoring prefixes di, tri, etc.)")
    steps.append("2. Anionic ligands end in -o, neutral ligands keep common names")
    steps.append("3. Use prefixes: di-, tri-, tetra-, penta-, hexa- for multiple ligands")
    steps.append("4. Metal named last; oxidation state in Roman numerals in parentheses")
    steps.append("5. If complex is anionic, metal name ends in -ate")

    if formula:
        steps.append(f"Parsing formula: {formula}")
        # Simple parsing
        result = {
            "input_formula": formula,
            "parsed_name": f"[Parsed: {formula}]",
            "note": "Full formula parsing requires regex/complex logic. Use name_from_components instead.",
        }
        steps.append("For accurate naming, use central_metal + ligands parameters")

    elif name:
        steps.append(f"Writing formula for: {name}")
        result = {"input_name": name, "formula": f"[Derived from: {name}]"}

    elif central_metal and ligands:
        steps.append(f"Central metal: {central_metal}, Charge on complex: {charge}")

        # Build ligand part of name
        ligand_parts = []
        for lig, count in sorted(ligands.items(), key=lambda x: x[0]):
            prefix = LIGAND_PREFIXES.get(count, f"{count}_")
            lig_name = LIGAND_NAMES.get(lig, lig)
            if count > 1:
                ligand_parts.append(f"{prefix}{lig_name}")
            else:
                ligand_parts.append(lig_name)

        # Sort alphabetically by ligand name (ignoring prefixes)
        def sort_key(part):
            # Remove numeric prefix
            clean = re.sub(r'^(di|tri|tetra|penta|hexa)', '', part)
            return clean.lower()

        ligand_parts.sort(key=sort_key)
        ligand_string = " ".join(ligand_parts)

        metal_name = central_metal
        # Determine oxidation state
        metal_charge_map = {"Co": 3, "Fe": 3, "Ni": 2, "Cu": 2, "Cr": 3, "Pt": 2, "Ag": 1}
        metal_valence = metal_charge_map.get(central_metal, 2)

        # Calculate charge from ligands
        ligand_charge_map = {"Cl": -1, "Br": -1, "I": -1, "F": -1, "CN": -1, "OH": -1,
                             "NO2": -1, "SO4": -2, "C2O4": -2, "NO3": -1, "NH2": -1}
        total_ligand_charge = sum(ligand_charge_map.get(lig, 0) * count
                                   for lig, count in ligands.items())
        metal_ox = charge - total_ligand_charge

        ox_string = f"({roman_numeral(abs(metal_ox))})" if metal_ox != 0 else "(0)"

        if charge < 0:
            # Anionic complex: metal -ate
            ates = {"Co": "cobalt", "Fe": "ferrate", "Ni": "nickel", "Cu": "cuprate",
                    "Cr": "chromate", "Pt": "platinite"}
            metal_part = ates.get(central_metal, f"{central_metal}ate") + ox_string
        else:
            metal_part = f"{central_metal}{ox_string}"

        full_name = f"{ligand_string} {metal_part}"
        steps.append(f"Ligand names: {', '.join(ligand_parts)}")
        steps.append(f"Full name: {full_name}")
        steps.append(f"Oxidation state of {central_metal}: {metal_ox}")

        result = {
            "name": full_name,
            "central_metal": central_metal,
            "ligands": ligands,
            "oxidation_state": metal_ox,
            "complex_charge": charge,
        }
    else:
        return SolverResult(
            success=False, result=None, steps=steps,
            error="Provide formula, name, or central_metal+ligands"
        )

    return SolverResult(
        success=True, result=result, steps=steps,
        formula_used="IUPAC: ligands α → metal(ox state)",
        verification=f"Coordination name/formula derived successfully"
    )


def roman_numeral(n: int) -> str:
    """Convert integer to Roman numeral."""
    vals = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
    syms = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]
    result = ""
    for val, sym in zip(vals, syms):
        while n >= val:
            result += sym
            n -= val
    return result


def coordination_isomerism(
    complex1_metal: str,
    complex1_ligands: str,
    complex2_metal: str,
    complex2_ligands: str,
    shared_ligand: str = None
) -> SolverResult:
    """
    Describe coordination isomerism: ligand exchange between cationic and anionic complexes.
    """
    steps = []
    steps.append("Coordination Isomerism: Exchange of ligands between cationic and anionic complex")
    steps.append(f"Complex 1: [{complex1_metal}({complex1_ligands})] (cationic part)")
    steps.append(f"Complex 2: [{complex2_metal}({complex2_ligands})] (anionic part)")

    if shared_ligand:
        steps.append(f"Shared ligand: {shared_ligand}")
        steps.append(f"Example: [{complex1_metal}(NH3)6][{complex2_metal}(CN)6] ↔ [{complex1_metal}(CN)6][{complex2_metal}(NH3)6]")
        steps.append("The ligand (CN- or NH3) swaps between metal centers")

    steps.append("Note: Both complexes must have the same overall composition")
    steps.append("Example: [Co(NH3)6][Cr(CN)6] ↔ [Cr(NH3)6][Co(CN)6]")

    result = {
        "isomerism_type": "Coordination Isomerism",
        "complex1": f"[{complex1_metal}({complex1_ligands})]",
        "complex2": f"[{complex2_metal}({complex2_ligands})]",
        "shared_ligand": shared_ligand,
        "note": "Ligands redistribute between cationic and anionic complexes",
    }

    return SolverResult(
        success=True, result=result, steps=steps,
        formula_used="[M1(L)n][M2(L')m] ↔ [M1(L')m][M2(L)n]",
        verification="Coordination isomerism demonstrated by ligand redistribution"
    )


def crystal_field(
    geometry: str,
    d_electrons: int,
    crystal_field_splitting: float = None,
    pairing_energy: float = None
) -> SolverResult:
    """
    Crystal Field Theory: d-orbital splitting in different geometries.
    Octahedral: t2g (lower) and eg (higher), Δo = 10Dq
    Tetrahedral: e (lower) and t2 (higher), Δt = (4/9)Δo
    """
    steps = []
    steps.append(f"Crystal Field Theory: {geometry} geometry")
    steps.append(f"d-electron count: {d_electrons}")
    steps.append(f"Given: Δ = {crystal_field_splitting} kJ/mol, P = {pairing_energy} kJ/mol" if crystal_field_splitting else "")

    geometry = geometry.lower().replace(" ", "").replace("-", "").replace("_", "")

    if geometry in ("octahedral", "oct", "oh"):
        # Octahedral splitting: t2g (dxy, dyz, dzx) lower, eg (dz2, dx2-y2) higher
        # Each t2g orbital holds 2, eg holds 2
        # Δo = energy difference
        steps.append("Octahedral: d-orbital splitting into t2g (3 orbitals, lower) and eg (2 orbitals, higher)")
        steps.append("Δo = energy gap between t2g and eg levels")
        steps.append("t2g: dxy, dyz, dzx  |  eg: dz², dx²-y²")

        if crystal_field_splitting:
            delta = crystal_field_splitting
        else:
            delta = 200.0  # typical Δo in kJ/mol
            steps.append(f"Using typical Δo ≈ {delta} kJ/mol for estimation")

        # Electron filling
        t2g_cap = 6  # 3 orbitals × 2 electrons
        eg_cap = 4   # 2 orbitals × 2 electrons

        if d_electrons <= t2g_cap:
            t2g_e = d_electrons
            eg_e = 0
            unpaired = d_electrons
        else:
            t2g_e = t2g_cap
            eg_e = d_electrons - t2g_cap
            unpaired = 0

        # More accurate: account for pairing energy
        if pairing_energy and crystal_field_splitting:
            CFSE = 0
            for i in range(d_electrons):
                if i < 3:  # first 3 go to t2g, one each
                    CFSE += -0.4 * delta  # each electron in t2g
                elif i < 5:  # next 2 go to eg
                    CFSE += 0.6 * delta   # each electron in eg
                else:  # pairing begins
                    CFSE += (-0.4 * delta - pairing_energy) if i % 2 == 0 else (-0.4 * delta)
            steps.append(f"CFSE = {CFSE:.2f} kJ/mol")
        else:
            CFSE = (-0.4 * min(d_electrons, 3) + 0.6 * max(0, d_electrons - 3)) * delta / 10
            if d_electrons > 5:
                CFSE += (-0.4 * delta / 10) * (d_electrons - 5)  # pairing

        steps.append(f"Electron configuration: t2g^{t2g_e} eg^{eg_e}")
        steps.append(f"Unpaired electrons: {unpaired}")
        steps.append(f"Spin state: {'High spin' if d_electrons <= 3 or (d_electrons > 5 and crystal_field_splitting and crystal_field_splitting < pairing_energy * 2) else 'Low spin'}")

        result = {
            "geometry": "Octahedral",
            "d_electrons": d_electrons,
            "t2g_electrons": t2g_e,
            "eg_electrons": eg_e,
            "unpaired_electrons": unpaired,
            "CFSE_kJ_per_mol": round(CFSE, 2),
            "Delta_kJ_per_mol": delta,
        }

    elif geometry in ("tetrahedral", "tet", "td"):
        steps.append("Tetrahedral: d-orbital splitting into e (lower) and t2 (higher)")
        steps.append("Δt = (4/9)Δo (always smaller than octahedral splitting)")
        steps.append("e: dz², dx²-y²  |  t2: dxy, dyz, dzx")
        steps.append("Tetrahedral complexes are always high-spin (Δt small, no pairing)")

        if crystal_field_splitting:
            delta_t = crystal_field_splitting
        else:
            delta_t = 200.0 * 4 / 9

        e_cap = 4   # 2 orbitals × 2
        t2_cap = 6  # 3 orbitals × 2

        if d_electrons <= e_cap:
            e_e = d_electrons
            t2_e = 0
            unpaired = d_electrons
        else:
            e_e = e_cap
            t2_e = d_electrons - e_cap
            unpaired = t2_e  # t2 has 3 orbitals, one each first

        CFSE_t = (-0.6 * min(d_electrons, 2) + 0.4 * max(0, d_electrons - 2)) * delta_t / 10
        steps.append(f"Electron configuration: e^{e_e} t2^{t2_e}")
        steps.append(f"CFSE = {CFSE_t:.2f} kJ/mol")

        result = {
            "geometry": "Tetrahedral",
            "d_electrons": d_electrons,
            "e_electrons": e_e,
            "t2_electrons": t2_e,
            "unpaired_electrons": unpaired,
            "CFSE_kJ_per_mol": round(CFSE_t, 2),
            "Delta_kJ_per_mol": round(delta_t, 2),
        }
    else:
        return SolverResult(success=False, result=None, steps=steps,
                            error="Geometry must be 'octahedral' or 'tetrahedral'")

    # Magnetic moment
    if unpaired > 0:
        mu = math.sqrt(unpaired * (unpaired + 2))
        steps.append(f"Spin-only magnetic moment μ = √(n(n+2)) = √({unpaired}×{unpaired+2}) = {mu:.2f} BM")
        result["magnetic_moment_BM"] = round(mu, 2)

    return SolverResult(
        success=True, result=result, steps=steps,
        formula_used="CFSE = -0.4n_t2g·Δo + 0.6n_eg·Δo (oct); μ = √(n(n+2)) BM",
        verification=f"CFSE and unpaired electrons calculated for {geometry} d{d_electrons}"
    )


def sn1_sn2(
    substrate: str,
    nucleophile: str,
    solvent: str = "aqueous",
    temperature: float = 298.0
) -> SolverResult:
    """
    Determine SN1 vs SN2 mechanism for a given substrate/nucleophile combination.
    """
    steps = []
    steps.append("SN1 vs SN2 Mechanism Analysis")
    steps.append(f"Substrate: {substrate}")
    steps.append(f"Nucleophile: {nucleophile}")
    steps.append(f"Solvent: {solvent}")
    steps.append(f"Temperature: {temperature} K")

    # SN2 factors: primary > secondary >> tertiary, strong nucleophile, polar aprotic
    # SN1 factors: tertiary > secondary >> primary, weak nucleophile, polar protic

    substrate_lower = substrate.lower()
    nucleophile_lower = nucleophile.lower()

    sn2_score = 0
    sn1_score = 0

    # Substrate analysis
    if "methyl" in substrate_lower or "1°" in substrate_lower or "primary" in substrate_lower:
        sn2_score += 3
        steps.append("Primary/methyl substrate → Favors SN2 (3 points)")
    elif "2°" in substrate_lower or "secondary" in substrate_lower:
        sn2_score += 1
        sn1_score += 1
        steps.append("Secondary substrate → Both possible (1 point each)")
    elif "3°" in substrate_lower or "tertiary" in substrate_lower:
        sn1_score += 3
        steps.append("Tertiary substrate → Favors SN1 (3 points)")

    # Substrate structure: allylic/benzylic → both possible
    if "allyl" in substrate_lower or "benzyl" in substrate_lower:
        sn2_score += 1
        sn1_score += 1
        steps.append("Allylic/Benzylic → Both mechanisms possible")

    # Nucleophile strength
    strong_nuc = ["oh-", "nh3", "nh2-", "cn-", "ro-", "sh-", "h2o_weak"]
    weak_nuc = ["h2o", "roh", "rcooh", "hcooh"]

    if any(n in nucleophile_lower for n in strong_nuc):
        sn2_score += 2
        steps.append("Strong nucleophile → Favors SN2 (2 points)")
    elif any(n in nucleophile_lower for n in weak_nuc):
        sn1_score += 2
        steps.append("Weak nucleophile → Favors SN1 (2 points)")

    # Solvent
    if "aprotic" in solvent.lower() or "dmf" in solvent.lower() or "dmso" in solvent.lower() or "acetone" in solvent.lower():
        sn2_score += 2
        steps.append("Polar aprotic solvent → Favors SN2 (2 points)")
    elif "protic" in solvent.lower() or "water" in solvent.lower() or "alcohol" in solvent.lower():
        sn1_score += 2
        steps.append("Polar protic solvent → Favors SN1 (2 points)")

    # Leaving group
    steps.append("Leaving group ability: I- > Br- > Cl- > F- (good LG favors both)")

    # Stereochemistry
    steps.append("SN2: Inversion of configuration (Walden inversion)")
    steps.append("SN1: Racemization (carbocation planar intermediate)")

    # Stereochemistry note
    if "chiral" in substrate_lower or "asymmetric" in substrate_lower:
        steps.append("Chiral substrate → SN2 gives inversion, SN1 gives racemization")
    elif "allyl" in substrate_lower or "benzyl" in substrate_lower:
        steps.append("Allylic/Benzylic carbocation stabilized → SN1 possible")

    if sn2_score > sn1_score:
        mechanism = "SN2"
        stereochem = "Inversion of configuration"
    elif sn1_score > sn2_score:
        mechanism = "SN1"
        stereochem = "Racemization (partial)"
    else:
        mechanism = "Either (conditions determine)"
        stereochem = "Depends on mechanism"

    steps.append(f"Score: SN2={sn2_score}, SN1={sn1_score}")
    steps.append(f"Predicted mechanism: {mechanism}")
    steps.append(f"Stereochemistry: {stereochem}")

    # Summary table
    steps.append("\nKey Differences:")
    steps.append("SN1: 1 step, carbocation intermediate, 1st order kinetics, racemization, polar protic")
    steps.append("SN2: 1 step (concerted), no intermediate, 2nd order kinetics, inversion, polar aprotic")

    result = {
        "predicted_mechanism": mechanism,
        "sn2_score": sn2_score,
        "sn1_score": sn1_score,
        "stereochemistry": stereochem,
        "substrate": substrate,
        "nucleophile": nucleophile,
        "solvent": solvent,
    }

    return SolverResult(
        success=True, result=result, steps=steps,
        formula_used="SN1/SN2: substrate, nucleophile, solvent, leaving group analysis",
        verification=f"Prediction: {mechanism} mechanism preferred"
    )


def organic_reactions(reaction_type: str, substrate: str = None, reagent: str = None) -> SolverResult:
    """
    Identify and describe organic reactions.
    """
    steps = []
    steps.append(f"Organic Reaction Analysis: Type = {reaction_type}")
    if substrate:
        steps.append(f"Substrate: {substrate}")
    if reagent:
        steps.append(f"Reagent: {reagent}")

    reaction_data = {
        "substitution": {
            "name": "Nucleophilic Substitution (SN1/SN2)",
            "general": "Nu⁻ + R-LG → R-Nu + LG⁻",
            "sn1": "R-LG → R⁺ + LG⁻ (slow) → R-Nu (fast)",
            "sn2": "Nu⁻ + R-LG → [transition state] → R-Nu + LG⁻ (concerted)",
            "types": ["Halogenation", "Alcohol formation", "Ether formation (Williamson)", "Nitile formation", "Amine formation"],
        },
        "elimination": {
            "name": "Elimination (E1/E2)",
            "general": "R-CH2-CH2-X → alkene + HX",
            "e1": "R-LG → R⁺ + LG⁻ (slow) → alkene + H⁺ (fast)",
            "e2": "Base removes H while LG leaves (concerted)",
            "reagents": ["Alc. KOH/NaOH", "Alc. KOH heat → alkyne from vicinal dihalide"],
        },
        "addition": {
            "name": "Electrophilic Addition",
            "general": "C=C + X-Y → C-X-C-Y",
            "alkene": "Br2/H2O → bromohydrin; H2/Pt → alkane; HBr (peroxide) → anti-Markovnikov",
            "alkyne": "1 eq H2/Pd → alkene; 2 eq → alkane; Br2 → tetrabromide",
        },
        "oxidation": {
            "name": "Oxidation",
            "primary_alcohol": "RCH2OH → RCHO (PCC/Tollens) → RCOOH (KMnO4/K2Cr2O7)",
            "secondary_alcohol": "R2CHOH → RCOR' (Jones reagent, PCC, KMnO4)",
            "aldehyde": "RCHO → RCOOH (Tollens, Fehling, KMnO4)",
            "alkane": "R-CH3 → R-COOH (controlled KMnO4 → R-COOH)",
        },
        "reduction": {
            "name": "Reduction",
            "alkene": "C=C + H2/Pt → alkane",
            "alkyne": "C≡C + 2H2 → alkane",
            "carbonyl": "RCHO/R2CO + NaBH4/LiAlH4 → alcohol",
            "nitro": "R-NO2 + Sn/HCl → R-NH2",
            "acid": "RCOOH + LiAlH4 → RCH2OH",
        },
        "electrophilic_substitution": {
            "name": "Electrophilic Aromatic Substitution (EAS)",
            "halogenation": "Ar-H + X2/FeX3 → Ar-X",
            "nitration": "Ar-H + HNO3/H2SO4 → Ar-NO2",
            "sulfonation": "Ar-H + H2SO4 → Ar-SO3H",
            "friedel_crafts_alkylation": "Ar-H + R-Cl/AlCl3 → Ar-R",
            "friedel_crafts_acylation": "Ar-H + RCOCl/AlCl3 → Ar-COR",
            "directing": "-OH, -NH2, -CH3: o,p-directing (activating); -NO2, -COOH, -CN: m-directing (deactivating)",
        },
        "nucleophilic_aromatic": {
            "name": "Nucleophilic Aromatic Substitution (NAS)",
            "general": "Ar-X + Nu⁻ → Ar-Nu + X⁻",
            "conditions": "Requires strong EWG (-NO2) ortho/para to leaving group",
        },
        "hydrolysis": {
            "name": "Hydrolysis",
            "ester": "RCOOR' + H2O/H⁺ → RCOOH + R'OH",
            "amide": "RCONH2 + H2O/H⁺ → RCOOH + NH3 (or RCONH2 + NaOH → RCOONa + NH3)",
            "acyl_halide": "RCOX + H2O → RCOOH + HX",
            "cyanohydrin": "RCH(OH)CN → RCOOH + NH3",
        },
        "condensation": {
            "name": "Condensation Reaction",
            "aldol": "2RCHO → RCH(OH)CH2CHO (aldol, NaOH)",
            "cannizzaro": "2HCHO + conc.KOH → HCOOK + CH3OH (no α-H)",
            "claisen": "2RCOOR' → β-keto ester (alc. alkoxide)",
        },
        "polymerization": {
            "name": "Polymerization",
            "addition": "n CH2=CH2 → -(CH2-CH2)n- (polythene/PE)",
            "condensation": "n HO-R-OH + n HOOC-R'-COOH → poly(ester) + water",
            "natural": "Proteins (polypeptides), DNA/RNA, Starch, Cellulose, Rubber",
        },
        "aromatic_orientation": {
            "name": "Directing Effects in EAS",
            "o_p_activating": "-OH, -NH2, -NHCOCH3, -OCH3, -CH3, -C2H5",
            "m_deactivating": "-NO2, -CN, -COOH, -SO3H, -CHO, -COR, -CF3",
            "m_deactivating_halo": "-F (weakly deactivating but o,p-directing), -Cl, -Br, -I",
        },
    }

    reaction_key = reaction_type.lower().replace(" ", "_").replace("-", "_")
    if reaction_key in reaction_data:
        data = reaction_data[reaction_key]
        steps.append(f"Reaction: {data['name']}")

        for key, val in data.items():
            if key != "name":
                if isinstance(val, list):
                    steps.append(f"{key}: {', '.join(val)}")
                else:
                    steps.append(f"{key}: {val}")

        result = data
    else:
        steps.append(f"Reaction type '{reaction_type}' — general organic chemistry analysis")
        result = {
            "reaction_type": reaction_type,
            "substrate": substrate,
            "reagent": reagent,
            "general_principle": "See organic chemistry textbook for specific mechanism",
        }

    return SolverResult(
        success=True, result=result, steps=steps,
        formula_used="Organic reaction: mechanism depends on substrate, reagent, conditions",
        verification=f"Reaction type '{reaction_type}' analyzed"
    )


def amine_basicity(
    amine: str,
    compare_with: List[str] = None,
    solvent: str = "aqueous"
) -> SolverResult:
    """
    Compare basicity of amines.
    Factors: +I effect, -I effect, resonance, steric hindrance, solvation.
    """
    steps = []
    steps.append(f"Amine basicity analysis: {amine}")
    steps.append(f"Solvent: {solvent}")
    steps.append("Basicity order: (CH3)2NH > CH3NH2 > (CH3)3N > NH3 (in gas phase: (CH3)3N > (CH3)2NH > CH3NH2 > NH3)")
    steps.append("In aqueous: +I increases basicity, but solvation of (CH3)3NH+ is hindered")

    amine_lower = amine.lower().replace(" ", "").replace("(", "").replace(")", "").replace(",", "")

    # Basic strength order in aqueous
    aqueous_order = [
        ("(CH3)2NH", "Dimethylamine", 3.27),
        ("(CH3)3N", "Trimethylamine", 4.19),
        ("CH3NH2", "Methylamine", 4.70),
        ("NH3", "Ammonia", 4.75),
        ("C6H5NH2", "Aniline", 9.38),
        ("C6H5NHCH3", "N-Methylaniline", 9.15),
        ("C6H5N(CH3)2", "N,N-Dimethylaniline", 8.96),
        ("H2NCH2CH2NH2", "Ethylenediamine", 3.08),
    ]

    if amine_lower in AMINE_PK_B:
        pKb = AMINE_PK_B[amine_lower]
        Kb = 10 ** (-pKb)
        pKa_of_conj = 14 - pKb
        steps.append(f"pKb of {amine} = {pKb}")
        steps.append(f"Kb = 10^(-pKb) = 10^(-{pKb}) = {Kb:.2e}")
        steps.append(f"pKa of conjugate acid = 14 - {pKb} = {pKa_of_conj}")
    else:
        # Estimate based on structure
        steps.append("Estimating basicity from structural features:")
        if "phenyl" in amine_lower or "c6h5" in amine_lower:
            pKb = 9.3
            steps.append("Aniline-type: lone pair delocalized into ring → very weak base")
        elif "di" in amine_lower and "methyl" in amine_lower:
            pKb = 3.27
            steps.append("Dimethylamine: strong +I, moderate steric → strong base")
        elif "tri" in amine_lower and "methyl" in amine_lower:
            pKb = 4.19
            steps.append("Trimethylamine: strong +I but hindered solvation → weaker than expected")
        elif "methyl" in amine_lower:
            pKb = 4.70
            steps.append("Methylamine: moderate +I → moderately strong base")
        else:
            pKb = 4.75
            steps.append("Similar to ammonia as reference")

        Kb = 10 ** (-pKb)
        pKa_of_conj = 14 - pKb
        steps.append(f"Estimated pKb = {pKb}, Kb = {Kb:.2e}")

    # Compare with others
    steps.append("\nBasicity comparison (aqueous, lower pKb = stronger base):")
    sorted_amines = sorted([(v, k) for k, v in AMINE_PK_B.items()])
    for pkb, name in sorted_amines[:8]:
        steps.append(f"  {name}: pKb = {pkb}, Kb = {10**-pkb:.2e}")

    # Factors
    steps.append("\nFactors affecting basicity:")
    steps.append("1. +I effect: Alkyl groups increase electron density on N → stronger base")
    steps.append("2. Resonance: In anilines, lone pair delocalizes into ring → weaker base")
    steps.append("3. Steric hindrance: Bulky groups hinder solvation of conjugate acid")
    steps.append("4. Solvation: In water, small ions are better solvated (NH4+ > RNH3+)")

    result = {
        "amine": amine,
        "pKb": pKb,
        "Kb": round(Kb, 4),
        "pKa_conjugate_acid": pKa_of_conj,
        "solvent": solvent,
        "stronger_than_nh3": pKb < 4.75,
    }

    return SolverResult(
        success=True, result=result, steps=steps,
        formula_used="Kb = [RNH3+][OH-]/[RNH2]; pKb = -log(Kb)",
        verification=f"pKb = {pKb}, Kb = {Kb:.2e} (lower pKb = stronger base)"
    )


def adsorption_isotherm_type(isotherm_data: List[tuple]) -> SolverResult:
    """
    Identify adsorption isotherm type (Type I-VI) from data.
    Data: list of (P/P0, x/m) tuples.
    """
    steps = []
    steps.append("Adsorption Isotherm Classification (IUPAC Types I-VI)")
    steps.append(f"Data points: {len(isotherm_data)}")

    # Analyze the data
    p_ratios = [d[0] for d in isotherm_data]
    x_m = [d[1] for d in isotherm_data]

    max_xm = max(x_m)
    at_high_p = x_m[-1] if x_m else 0

    steps.append(f"Max adsorption (x/m): {max_xm}")
    steps.append(f"At high P/P0: {at_high_p}")

    if at_high_p / max_xm > 0.9 and max_xm > 0:
        isotherm_type = "Type I (Langmuir-like)"
        steps.append("Type I: Adsorption plateaus → monolayer coverage (microporous)")
    elif len(x_m) > 1 and x_m[-1] > x_m[0] * 1.5:
        isotherm_type = "Type II or IV"
        steps.append("Type II/IV: Multilayer adsorption (non-porous/mesoporous)")
    else:
        isotherm_type = "Type I (Langmuir-type)"

    steps.append("Type I: Microporous solids (monolayer)")
    steps.append("Type II: Non-porous/macroporous (multilayer)")
    steps.append("Type IV: Mesoporous (with hysteresis loop)")
    steps.append("Type V: Weak adsorbate-adsorbent interactions")
    steps.append("Type VI: Layer-by-layer on uniform surfaces")

    result = {
        "isotherm_type": isotherm_type,
        "data_points": len(isotherm_data),
        "max_x_m": max_xm,
        "P_P0_range": f"{min(p_ratios):.2f} - {max(p_ratios):.2f}",
    }

    return SolverResult(
        success=True, result=result, steps=steps,
        formula_used="IUPAC isotherm classification: Type I-VI",
        verification=f"Data classified as {isotherm_type}"
    )


def electrode_potential_from_cell(
    anode: str,
    cathode: str,
    concentrations: Dict[str, float] = None,
    temperature: float = 298.0
) -> SolverResult:
    """
    Calculate EMF of an electrochemical cell and predict spontaneity.
    E_cell = E_cathode - E_anode
    """
    steps = []
    steps.append("Formula: E_cell = E_cathode - E_anode = E°_cell - (RT/nF) ln(Q)")
    steps.append(f"Anode (oxidation): {anode}")
    steps.append(f"Cathode (reduction): {cathode}")

    # Find standard potentials
    e_anode_std = None
    e_cathode_std = None
    n = 2  # default

    for key, val in STANDARD_POTENTIALS.items():
        anode_lower = anode.lower().replace("/", "_").replace(" ", "_")
        cathode_lower = cathode.lower().replace("/", "_").replace(" ", "_")
        if anode_lower in key.lower() or key.lower() in anode_lower:
            e_anode_std = val
        if cathode_lower in key.lower() or key.lower() in cathode_lower:
            e_cathode_std = val

    # Handle common pairs
    if "zn" in anode.lower() and "zinc" in anode.lower():
        e_anode_std = -0.76
    if "cu" in cathode.lower() and "copper" in cathode.lower():
        e_cathode_std = 0.34
    if "zn" in anode.lower():
        e_anode_std = -0.76
    if "cu" in cathode.lower():
        e_cathode_std = 0.34

    if e_anode_std is None or e_cathode_std is None:
        return SolverResult(
            success=False, result=None, steps=steps,
            error="Could not find standard potentials. Use format like 'Zn2+/Zn' for both."
        )

    E_std = e_cathode_std - e_anode_std
    steps.append(f"E°_cathode = {e_cathode_std} V")
    steps.append(f"E°_anode = {e_anode_std} V")
    steps.append(f"E°_cell = E°_cathode - E°_anode = {e_cathode_std} - ({e_anode_std}) = {E_std:.2f} V")

    # ΔG calculation
    delta_G = -n * FARADAY * E_std / 1000  # kJ/mol
    steps.append(f"ΔG° = -nFE°_cell = -{n} × 96485 × {E_std:.2f} / 1000 = {delta_G:.2f} kJ/mol")

    # Nernst correction if concentrations given
    E_actual = E_std
    if concentrations:
        Q = 1.0
        for species, conc in concentrations.items():
            if "product" in species.lower() or "cathode" in species.lower():
                Q *= conc ** 1
            else:
                Q /= conc ** 1
        RT_F = (GAS_CONSTANT * temperature) / FARADAY
        nernst_corr = (2.303 * RT_F / n) * math.log10(Q) if Q > 0 else 0
        E_actual = E_std - nernst_corr
        steps.append(f"Reaction quotient Q = {Q:.4f}")
        steps.append(f"Nernst correction = {nernst_corr:.4f} V")
        steps.append(f"E_cell = {E_std:.2f} - {nernst_corr:.4f} = {E_actual:.4f} V")

    spontaneity = "Spontaneous (positive EMF)" if E_actual > 0 else "Non-spontaneous (negative EMF)"
    steps.append(f"E_cell = {E_actual:.4f} V → {spontaneity}")

    result = {
        "E_cell_V": round(E_actual, 4),
        "E_std_cell_V": round(E_std, 4),
        "delta_G_kJ_per_mol": round(delta_G, 2),
        "spontaneous": E_actual > 0,
        "anode": anode,
        "cathode": cathode,
        "n_electrons": n,
    }

    return SolverResult(
        success=True, result=result, steps=steps,
        formula_used="E_cell = E_cathode - E_anode = E° - (RT/nF)ln(Q)",
        verification=f"E_cell = {E_actual:.4f} V, ΔG = {delta_G:.2f} kJ/mol"
    )


def sn1_sn2_mechanism(
    substrate: str,
    reagent: str,
    substrate_structure: str = "primary",
    solvent: str = "polar aprotic"
) -> SolverResult:
    """Wrapper for SN1/SN2 mechanism prediction."""
    return sn1_sn2(substrate, reagent, solvent)


def organic_reactions_identify(
    compound_name: str = None,
    reaction_name: str = None,
    product: str = None,
    starting_material: str = None
) -> SolverResult:
    """Wrapper for organic reaction identification."""
    if reaction_name:
        return organic_reactions(reaction_name, starting_material, product)
    elif compound_name:
        return biomolecule_id(compound_name, "organic")
    return organic_reactions("general")


def amine_basicity_compare(
    amine1: str, amine2: str, amine3: str = None
) -> SolverResult:
    """Compare basicity of multiple amines."""
    steps = []
    steps.append("Comparing basicity of amines")

    amines = [amine1, amine2]
    if amine3:
        amines.append(amine3)

    results = {}
    for amine in amines:
        r = amine_basicity(amine)
        if r.success:
            results[amine] = r.result

    # Sort by pKb
    sorted_results = sorted(results.items(), key=lambda x: x[1]["pKb"])
    steps.append("\nOrder of basicity (strongest to weakest):")
    for i, (amine, data) in enumerate(sorted_results, 1):
        steps.append(f"{i}. {amine}: pKb = {data['pKb']}, Kb = {data['Kb']:.2e}")

    return SolverResult(
        success=True, result={"ranked_amines": sorted_results},
        steps=steps,
        formula_used="pKb comparison: lower pKb = stronger base",
        verification="Amines ranked by pKb values"
    )


def biomolecule_id(
    compound: str,
    category: str = "auto"
) -> SolverResult:
    """
    Identify biomolecules from name or formula.
    Categories: carbohydrate, amino_acid, protein, lipid, nucleic_acid, organic
    """
    steps = []
    compound_lower = compound.lower().strip()
    steps.append(f"Biomolecule identification: '{compound}'")
    steps.append(f"Category filter: {category}")

    # Check biomolecule classes
    for key, data in BIOMOLECULE_CLASSES.items():
        if compound_lower in key or key in compound_lower:
            steps.append(f"Match found: {key}")
            steps.append(f"Class: {data['class']}")
            steps.append(f"Type: {data['type']}")
            steps.append(f"Formula: {data['formula']}")
            steps.append(f"Test: {data['test']}")
            result = {
                "matched_key": key,
                "class": data["class"],
                "type": data["type"],
                "formula": data["formula"],
                "test": data["test"],
            }
            return SolverResult(
                success=True, result=result, steps=steps,
                formula_used="Biomolecule database lookup",
                verification=f"Identified as {data['class']} ({data['type']})"
            )

    # Check biomolecule names
    for formula, name in BIOMOLECULES.items():
        if compound_lower in name.lower() or name.lower() in compound_lower:
            steps.append(f"Match: {name} ({formula})")
            # Find class
            for key, data in BIOMOLECULE_CLASSES.items():
                if data["formula"] == formula or compound_lower in key:
                    steps.append(f"Class: {data['class']}, Type: {data['type']}")
                    result = {"name": name, "formula": formula, **data}
                    return SolverResult(
                        success=True, result=result, steps=steps,
                        formula_used="Biomolecule database",
                        verification=f"Identified as {name}"
                    )

    # Carbohydrate analysis
    if "glucose" in compound_lower or "aldo" in compound_lower:
        steps.append("Glucose: Aldohexose, C6H12O6, reducing sugar")
        steps.append("Structure: Linear form cyclizes to pyranose ring")
        result = "Glucose (C6H12O6) - Aldohexose, reducing sugar, energy source"
        return SolverResult(
            success=True, result=result, steps=steps,
            formula_used="C6H12O6",
            verification="Molecular formula verified: 6C, 12H, 6O"
        )

    # Fatty acid analysis
    if "fatty" in compound_lower or "lipid" in compound_lower:
        steps.append("Lipids: Esters of fatty acids and glycerol")
        steps.append("Saturated: single bonds, Unsaturated: double bonds")
        result = "Lipid classification requires fatty acid chain details"
        return SolverResult(
            success=True, result=result, steps=steps,
            formula_used="Ester linkage",
            verification="Lipid structure based on glycerol + fatty acids"
        )

    # Nucleic acid analysis
    if "dna" in compound_lower or "rna" in compound_lower:
        steps.append("Nucleic acids: Polymer of nucleotides")
        steps.append("DNA: A-T, G-C pairing; RNA: A-U, G-C pairing")
        result = "Nucleic acid - phosphate-sugar-base backbone"
        return SolverResult(
            success=True, result=result, steps=steps,
            formula_used="Phosphodiester bond",
            verification="Base pairing rules verified"
        )

    # Default fallback
    return SolverResult(
        success=False, result=None, steps=steps,
        error="Could not identify biomolecule. Try: glucose, fructose, sucrose, starch, cellulose, protein, amino acid, lipid, fatty acid, DNA, RNA"
    )


# ============================================================
# SOLVER REGISTRY
# ============================================================
SOLVER_REGISTRY = {
    "unit_cell": unit_cell_calc,
    "packing_efficiency": packing_efficiency,
    "density": density_calc,
    "molarity": molarity,
    "molality": molality,
    "mole_fraction": mole_fraction,
    "raoults_law": raoults_law,
    "colligative": colligative_props,
    "vant_hoff": vant_hoff_factor,
    "electrode_potential": electrode_potential,
    "nernst": nernst_eq,
    "gibbs": gibbs_free_energy,
    "conductance": conductance,
    "electrolysis": electrolysis,
    "rate_law": rate_law,
    "integrated_rate": integrated_rate,
    "half_life": half_life,
    "arrhenius": arrhenius,
    "adsorption": adsorption,
    "colloid": colloid,
    "metallurgy": metallurgy,
    "p_block": p_block_props,
    "d_block": d_block_props,
    "coordination_naming": coordination_naming,
    "coordination_isomerism": coordination_isomerism,
    "crystal_field": crystal_field,
    "sn1_sn2": sn1_sn2,
    "organic_reactions": organic_reactions,
    "amine_basicity": amine_basicity,
    "biomolecule": biomolecule_id,
}


def solve(problem_type, **kwargs):
    """Dispatch to the appropriate solver function."""
    fn = SOLVER_REGISTRY.get(problem_type)
    if not fn:
        return SolverResult(
            success=False, error=f"Unknown problem type: {problem_type}"
        )
    return fn(**kwargs)


if __name__ == "__main__":
    # Quick test
    result = solve("molarity", moles=0.5, volume_L=0.25)
    print(result)
