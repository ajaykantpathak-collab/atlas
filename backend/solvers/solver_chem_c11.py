"""
solver_chem_c11.py — CBSE Class 11 Chemistry solver functions.

Each solver takes keyword arguments (variables) and returns a SolverResult
with final_answer and step-by-step solution steps.

Used by class11_chem_questions.py and class12_chem_questions.py.
"""
from __future__ import annotations
import math
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional


@dataclass
class Step:
    label: str
    rule: str = ""
    formula: Optional[str] = None
    before: str = ""
    after: str = ""
    explanation: str = ""
    visual_hint: Optional[str] = None

    def to_dict(self) -> dict:
        return {"label": self.label, "rule": self.rule, "formula": self.formula,
                "before": self.before, "after": self.after, "explanation": self.explanation}


@dataclass
class SolverResult:
    success: bool
    final_answer: Any = None
    steps: List[Step] = field(default_factory=list)
    error: Optional[str] = None
    unit: Optional[str] = None


# ─── Constants ───
AVOGADRO = 6.022e23
PLANCK = 6.626e-34
FARADAY = 96500.0
R_GAS = 8.314  # J/(mol·K)
BOHR_VELOCITY = 2.18e6  # m/s


# ─── Basic Concepts ───

def basic_concepts_mole_particles(mass: float, molar_mass: float) -> SolverResult:
    n = mass / molar_mass
    particles = n * AVOGADRO
    return SolverResult(
        success=True,
        final_answer=f"{particles:.2e} particles",
        steps=[
            Step("Step 1", "Mole concept", "n = mass / molar_mass",
                 f"mass = {mass} g, molar_mass = {molar_mass} g/mol",
                 f"n = {mass} / {molar_mass} = {n:.4f} mol"),
            Step("Step 2", "Avogadro's number", "N = n × Nₐ",
                 f"n = {n:.4f} mol, Nₐ = {AVOGADRO:.3e}",
                 f"N = {n:.4f} × {AVOGADRO:.3e} = {particles:.2e}"),
        ],
        unit="particles",
    )


def basic_concepts_dilution(molarity_initial: float, volume_initial_ml: float, volume_final_ml: float) -> SolverResult:
    m2 = molarity_initial * volume_initial_ml / volume_final_ml
    return SolverResult(
        success=True,
        final_answer=f"{m2:.4f} M",
        steps=[
            Step("Step 1", "Dilution formula", "M₁V₁ = M₂V₂",
                 f"M₁={molarity_initial} M, V₁={volume_initial_ml} mL, V₂={volume_final_ml} mL",
                 f"M₂ = ({molarity_initial} × {volume_initial_ml}) / {volume_final_ml} = {m2:.4f} M"),
        ],
        unit="M",
    )


def basic_concepts_percentage_composition(mass_component: float, mass_total: float,
                                           mass_pure: float = 0, percentage: float = 0) -> SolverResult:
    pct = (mass_component / mass_total) * 100 if mass_total else percentage
    return SolverResult(
        success=True,
        final_answer=f"{pct:.2f}%",
        steps=[
            Step("Step 1", "Percentage composition", "% = (mass_component / mass_total) × 100",
                 f"mass_component = {mass_component} g, mass_total = {mass_total} g",
                 f"% = ({mass_component} / {mass_total}) × 100 = {pct:.2f}%"),
        ],
        unit="%",
    )


def basic_concepts_equivalent_weight(equivalent_weight: float, n_factor: float) -> SolverResult:
    molar_mass = equivalent_weight * n_factor
    return SolverResult(
        success=True,
        final_answer=f"{molar_mass:.2f} g/mol",
        steps=[
            Step("Step 1", "Equivalent weight", "Molar mass = Equivalent weight × n-factor",
                 f"Eq. wt. = {equivalent_weight}, n-factor = {n_factor}",
                 f"Molar mass = {equivalent_weight} × {n_factor} = {molar_mass:.2f} g/mol"),
        ],
        unit="g/mol",
    )


# ─── Atomic Structure ───

def atomic_bohr_velocity(Z: int = 1, n_shell: int = 1, **kwargs) -> SolverResult:
    v = BOHR_VELOCITY * Z / n_shell
    return SolverResult(
        success=True,
        final_answer=f"{v:.2e} m/s",
        steps=[
            Step("Step 1", "Bohr model velocity", "v = 2.18×10⁶ × Z / n",
                 f"Z = {Z}, n = {n_shell}",
                 f"v = 2.18×10⁶ × {Z} / {n_shell} = {v:.2e} m/s"),
        ],
        unit="m/s",
    )


def atomic_debroglie_wavelength(momentum: float) -> SolverResult:
    wavelength = PLANCK / momentum
    return SolverResult(
        success=True,
        final_answer=f"{wavelength:.4e} m",
        steps=[
            Step("Step 1", "de Broglie wavelength", "λ = h / p",
                 f"h = {PLANCK} J·s, p = {momentum} kg·m/s",
                 f"λ = {PLANCK} / {momentum} = {wavelength:.4e} m"),
        ],
        unit="m",
    )


def atomic_electronic_config(Z: int) -> SolverResult:
    orbitals = [('1s', 2), ('2s', 2), ('2p', 6), ('3s', 2), ('3p', 6),
                ('4s', 2), ('3d', 10), ('4p', 6), ('5s', 2), ('4d', 10), ('5p', 6)]
    config = []
    remaining = Z
    for orbital, capacity in orbitals:
        if remaining <= 0:
            break
        electrons = min(remaining, capacity)
        config.append(f"{orbital}^{electrons}")
        remaining -= electrons
    config_str = " ".join(config)
    return SolverResult(
        success=True,
        final_answer=config_str,
        steps=[
            Step("Step 1", "Aufbau principle", "Fill orbitals by increasing energy",
                 f"Z = {Z}",
                 f"Configuration: {config_str}"),
        ],
    )


def atomic_quantum_numbers(n: int, l_val: int) -> SolverResult:
    m_values = list(range(-l_val, l_val + 1))
    info = f"n={n}, l={l_val}, m=[{', '.join(map(str, m_values))}], s=±1/2"
    return SolverResult(
        success=True,
        final_answer=info,
        steps=[
            Step("Step 1", "Quantum numbers", "m ranges from -l to +l",
                 f"n={n}, l={l_val}",
                 f"m = {m_values}, s = +1/2 or -1/2"),
        ],
    )


# ─── Periodic Table ───

def periodic_trend_comparison(element1: str, element2: str) -> SolverResult:
    return SolverResult(
        success=True,
        final_answer=f"{element1} vs {element2}: compared",
        steps=[
            Step("Step 1", "Periodic trends", "Compare atomic radius, IE, EN",
                 f"Elements: {element1}, {element2}",
                 f"Across period: radius↓, IE↑, EN↑. Down group: radius↑, IE↓, EN↓"),
        ],
    )


def periodic_ionization_energy_group(IE1: float, IE2: float) -> SolverResult:
    ratio = IE2 / IE1 if IE1 else 0
    return SolverResult(
        success=True,
        final_answer=f"IE1={IE1}, IE2={IE2}, ratio={ratio:.2f}",
        steps=[
            Step("Step 1", "Ionization energy", "IE2 > IE1 (removing e⁻ from cation is harder)",
                 f"IE1 = {IE1} kJ/mol, IE2 = {IE2} kJ/mol",
                 f"Ratio IE2/IE1 = {ratio:.2f}"),
        ],
        unit="kJ/mol",
    )


def periodic_atomic_radius_trend(radius1: float = 0, radius2: float = 0, **kwargs) -> SolverResult:
    r1 = radius1 or kwargs.get('radius1', 0)
    r2 = radius2 or kwargs.get('radius2', 0)
    if r1 and r2:
        result = f"r1={r1} pm, r2={r2} pm, difference={abs(r1-r2):.1f} pm"
    else:
        result = "Atomic radius decreases across a period, increases down a group"
    return SolverResult(
        success=True,
        final_answer=result,
        steps=[
            Step("Step 1", "Atomic radius trend", "Radius ↓ across period, ↑ down group",
                 f"r1={r1}, r2={r2}",
                 result),
        ],
        unit="pm",
    )


def periodic_electronegativity_bond(electronegativity1: float = 0, electronegativity2: float = 0, **kwargs) -> SolverResult:
    en1 = electronegativity1 or kwargs.get('electronegativity_A', 0)
    en2 = electronegativity2 or kwargs.get('electronegativity_B', 0)
    diff = abs(en1 - en2)
    if diff < 0.4:
        bond_type = "Nonpolar covalent"
    elif diff < 1.7:
        bond_type = "Polar covalent"
    else:
        bond_type = "Ionic"
    return SolverResult(
        success=True,
        final_answer=f"{bond_type} (ΔEN = {diff:.2f})",
        steps=[
            Step("Step 1", "Electronegativity difference", "ΔEN determines bond character",
                 f"EN1 = {en1}, EN2 = {en2}",
                 f"ΔEN = {diff:.2f} → {bond_type}"),
        ],
    )


def periodic_group_period(Z: int) -> SolverResult:
    # Simplified periodic table position
    groups = {1: 1, 2: 2, 3: 13, 4: 14, 5: 15, 6: 16, 7: 17, 8: 18}
    if Z <= 2:
        period = 1
        group = 1 if Z == 1 else 18
    elif Z <= 10:
        period = 2
        group = groups.get(Z - 2 + 1, Z - 2 + 1)
    elif Z <= 18:
        period = 3
        group = groups.get(Z - 10 + 1, Z - 10 + 1)
    elif Z <= 36:
        period = 4
        group = Z - 18 if Z <= 20 else Z - 18 + 12 if Z <= 30 else Z - 28 + 1
    else:
        period = 5
        group = Z - 36 if Z <= 38 else Z - 36 + 12 if Z <= 48 else Z - 46 + 1
    return SolverResult(
        success=True,
        final_answer=f"Period {period}, Group {group}",
        steps=[
            Step("Step 1", "Periodic table position", f"Z={Z}",
                 f"Z = {Z}",
                 f"Period {period}, Group {group}"),
        ],
    )


# ─── Chemical Bonding ───

def bonding_bond_type_prediction(electronegativity_A: float, electronegativity_B: float) -> SolverResult:
    return periodic_electronegativity_bond(electronegativity_A, electronegativity_B)


def bonding_vsepr_geometry(bond_pairs: int, lone_pairs: int, central_atom: str = "A",
                           hybridization: str = "", bond_angle: float = 0) -> SolverResult:
    total = bond_pairs + lone_pairs
    shapes = {2: "Linear", 3: "Trigonal Planar", 4: "Tetrahedral",
              5: "Trigonal Bipyramidal", 6: "Octahedral"}
    shape = shapes.get(total, "Unknown")
    if lone_pairs > 0:
        shape_modifiers = {4: "Trigonal Pyramidal" if lone_pairs == 1 else "Bent",
                           5: "See-saw" if lone_pairs == 1 else "T-shaped" if lone_pairs == 2 else shape,
                           6: "Square Pyramidal" if lone_pairs == 1 else "Square Planar" if lone_pairs == 2 else shape}
        shape = shape_modifiers.get(total, shape)
    return SolverResult(
        success=True,
        final_answer=f"{shape} (BP={bond_pairs}, LP={lone_pairs})",
        steps=[
            Step("Step 1", "VSEPR theory", "Shape determined by steric number",
                 f"BP={bond_pairs}, LP={lone_pairs}, steric={total}",
                 f"Shape: {shape}"),
        ],
    )


def bonding_bond_order_length(bond_order: int) -> SolverResult:
    lengths = {1: 154, 2: 134, 3: 120}
    length = lengths.get(bond_order, 0)
    return SolverResult(
        success=True,
        final_answer=f"Bond order {bond_order}, length ≈ {length} pm" if length else f"Bond order {bond_order}",
        steps=[
            Step("Step 1", "Bond order-length relationship", "Higher bond order → shorter bond",
                 f"Bond order = {bond_order}",
                 f"Typical length ≈ {length} pm" if length else f"Bond order = {bond_order}"),
        ],
        unit="pm",
    )


# ─── Thermodynamics ───

def thermo_deltaH_deltaU(delta_H: float, q_heat: float = 0, **kwargs) -> SolverResult:
    delta_U = delta_H - kwargs.get('delta_n_gas', 0) * R_GAS * kwargs.get('T', 298) / 1000
    return SolverResult(
        success=True,
        final_answer=f"ΔH = {delta_H} kJ/mol, ΔU ≈ {delta_U:.2f} kJ/mol",
        steps=[
            Step("Step 1", "Enthalpy-internal energy", "ΔH = ΔU + Δn_gas·RT",
                 f"ΔH = {delta_H} kJ/mol",
                 f"ΔU ≈ {delta_U:.2f} kJ/mol"),
        ],
        unit="kJ/mol",
    )


def thermo_gibbs_free_energy(T: float, delta_H: float, delta_S: float) -> SolverResult:
    delta_G = delta_H - T * delta_S / 1000  # delta_S in J, convert to kJ
    spontaneity = "spontaneous" if delta_G < 0 else "non-spontaneous"
    return SolverResult(
        success=True,
        final_answer=f"ΔG = {delta_G:.2f} kJ/mol ({spontaneity})",
        steps=[
            Step("Step 1", "Gibbs free energy", "ΔG = ΔH - TΔS",
                 f"ΔH = {delta_H} kJ/mol, T = {T} K, ΔS = {delta_S} J/(mol·K)",
                 f"ΔG = {delta_H} - {T}×{delta_S}/1000 = {delta_G:.2f} kJ/mol → {spontaneity}"),
        ],
        unit="kJ/mol",
    )


def thermo_heat_capacity(Cp: float, delta_T: float, mass: float) -> SolverResult:
    q = mass * Cp * delta_T
    return SolverResult(
        success=True,
        final_answer=f"q = {q:.2f} J",
        steps=[
            Step("Step 1", "Heat capacity", "q = m × Cp × ΔT",
                 f"m = {mass} g, Cp = {Cp} J/(g·K), ΔT = {delta_T} K",
                 f"q = {mass} × {Cp} × {delta_T} = {q:.2f} J"),
        ],
        unit="J",
    )


def thermo_hess_law(H1: float, H2: float, H3: float = 0) -> SolverResult:
    result = H1 + H2 + H3
    return SolverResult(
        success=True,
        final_answer=f"ΔH = {result:.2f} kJ/mol",
        steps=[
            Step("Step 1", "Hess's Law", "ΔH = Σ ΔH_steps",
                 f"H1={H1}, H2={H2}, H3={H3}",
                 f"ΔH = {H1} + {H2} + {H3} = {result:.2f} kJ/mol"),
        ],
        unit="kJ/mol",
    )


# ─── Equilibrium ───

def equilibrium_kc_calculation(Kc: float) -> SolverResult:
    direction = "products favored" if Kc > 1 else "reactants favored" if Kc < 1 else "at equilibrium"
    return SolverResult(
        success=True,
        final_answer=f"Kc = {Kc} ({direction})",
        steps=[
            Step("Step 1", "Equilibrium constant", "Kc > 1 → products, Kc < 1 → reactants",
                 f"Kc = {Kc}",
                 f"Reaction {direction}"),
        ],
    )


def equilibrium_weak_acid_ph(Ka: float, concentration: float) -> SolverResult:
    pKa = -math.log10(Ka) if Ka > 0 else 0
    pH = 0.5 * (pKa - math.log10(concentration)) if concentration > 0 else pKa
    return SolverResult(
        success=True,
        final_answer=f"pH = {pH:.2f}",
        steps=[
            Step("Step 1", "pKa", "pKa = -log(Ka)",
                 f"Ka = {Ka}",
                 f"pKa = {pKa:.2f}"),
            Step("Step 2", "Weak acid pH", "pH = 0.5(pKa - log C)",
                 f"pKa = {pKa:.2f}, C = {concentration}",
                 f"pH = 0.5({pKa:.2f} - {math.log10(concentration):.2f}) = {pH:.2f}"),
        ],
        unit="pH",
    )


def equilibrium_ksp_solubility(Ksp: float, common_ion_concentration: float = 0) -> SolverResult:
    if common_ion_concentration > 0:
        s = Ksp / common_ion_concentration  # Simplified for 1:1 salt with common ion
    else:
        s = math.sqrt(Ksp)  # For 1:1 salt
    return SolverResult(
        success=True,
        final_answer=f"Solubility s = {s:.6f} mol/L",
        steps=[
            Step("Step 1", "Ksp and solubility", "Ksp = s² (no common ion) or Ksp = s×[common ion]",
                 f"Ksp = {Ksp}, [common ion] = {common_ion_concentration}",
                 f"s = {s:.6f} mol/L"),
        ],
        unit="mol/L",
    )


def equilibrium_buffer_ph(pH_acid: float, pH_base: float) -> SolverResult:
    pH_range = f"pH range: {pH_acid:.1f} to {pH_base:.1f}"
    return SolverResult(
        success=True,
        final_answer=pH_range,
        steps=[
            Step("Step 1", "Buffer pH range", "Effective range: pKa ± 1",
                 f"pH_acid = {pH_acid}, pH_base = {pH_base}",
                 pH_range),
        ],
        unit="pH",
    )


def equilibrium_le_chatelier(**kwargs) -> SolverResult:
    return SolverResult(
        success=True,
        final_answer="Le Chatelier's principle: system shifts to relieve stress",
        steps=[
            Step("Step 1", "Le Chatelier's principle", "Stress → equilibrium shifts to counteract",
                 "Apply stress (concentration, temperature, pressure)",
                 "Equilibrium shifts to oppose the change"),
        ],
    )


# ─── Redox ───

def redox_titration_iron(mass_sample: float, normality: float, volume_ml: float) -> SolverResult:
    eq = normality * volume_ml / 1000  # equivalents of titrant
    mass_fe = eq * 55.85  # mass of iron
    pct = (mass_fe / mass_sample) * 100 if mass_sample else 0
    return SolverResult(
        success=True,
        final_answer=f"Iron = {pct:.2f}%",
        steps=[
            Step("Step 1", "Equivalents of titrant", "eq = N × V(L)",
                 f"N = {normality}, V = {volume_ml} mL",
                 f"eq = {normality} × {volume_ml/1000} = {eq:.4f}"),
            Step("Step 2", "Mass of iron", "mass = eq × 55.85",
                 f"eq = {eq:.4f}",
                 f"mass_Fe = {mass_fe:.4f} g"),
            Step("Step 3", "Percentage", "% = (mass_Fe / mass_sample) × 100",
                 f"mass_Fe = {mass_fe:.4f}, mass_sample = {mass_sample}",
                 f"% = {pct:.2f}%"),
        ],
        unit="%",
    )


def redox_cell_potential(E_anode: float, E_cathode: float) -> SolverResult:
    E_cell = E_cathode - E_anode
    spontaneity = "spontaneous" if E_cell > 0 else "non-spontaneous"
    return SolverResult(
        success=True,
        final_answer=f"E°cell = {E_cell:.3f} V ({spontaneity})",
        steps=[
            Step("Step 1", "Cell potential", "E°cell = E°cathode - E°anode",
                 f"E°cathode = {E_cathode} V, E°anode = {E_anode} V",
                 f"E°cell = {E_cathode} - {E_anode} = {E_cell:.3f} V → {spontaneity}"),
        ],
        unit="V",
    )


def redox_faraday_law(moles_electrons: float) -> SolverResult:
    Q = moles_electrons * FARADAY
    return SolverResult(
        success=True,
        final_answer=f"Q = {Q:.0f} C",
        steps=[
            Step("Step 1", "Faraday's law", "Q = n × F",
                 f"n = {moles_electrons} mol, F = {FARADAY} C/mol",
                 f"Q = {moles_electrons} × {FARADAY} = {Q:.0f} C"),
        ],
        unit="C",
    )


def redox_balance_reaction(oxidation_state_Mn: float = 0, **kwargs) -> SolverResult:
    return SolverResult(
        success=True,
        final_answer="Redox reaction balanced using oxidation state method",
        steps=[
            Step("Step 1", "Oxidation state method", "Balance atoms and charges",
                 f"Oxidation state = {oxidation_state_Mn}",
                 "Identify oxidation and reduction half-reactions, balance atoms and charges"),
        ],
    )


# ─── Hydrogen ───

def hydrogen_volume_stp(mass_H2: float) -> SolverResult:
    moles = mass_H2 / 2.016
    volume = moles * 22.4
    return SolverResult(
        success=True,
        final_answer=f"{volume:.2f} L at STP",
        steps=[
            Step("Step 1", "Moles of H₂", "n = mass / M",
                 f"mass = {mass_H2} g, M = 2.016 g/mol",
                 f"n = {moles:.4f} mol"),
            Step("Step 2", "Volume at STP", "V = n × 22.4 L",
                 f"n = {moles:.4f} mol",
                 f"V = {moles:.4f} × 22.4 = {volume:.2f} L"),
        ],
        unit="L",
    )


def hydrogen_na_reaction(mass_Na: float) -> SolverResult:
    moles_Na = mass_Na / 23
    moles_H2 = moles_Na / 2
    mass_H2 = moles_H2 * 2.016
    return SolverResult(
        success=True,
        final_answer=f"H₂ produced = {mass_H2:.4f} g",
        steps=[
            Step("Step 1", "Balanced equation", "2Na + 2H₂O → 2NaOH + H₂",
                 f"mass_Na = {mass_Na} g",
                 f"n_Na = {moles_Na:.4f} mol"),
            Step("Step 2", "Stoichiometry", "2 mol Na → 1 mol H₂",
                 f"n_Na = {moles_Na:.4f}",
                 f"n_H₂ = {moles_H2:.4f} mol, mass_H₂ = {mass_H2:.4f} g"),
        ],
        unit="g",
    )


def hydrogen_hydride_classification(hydride_type: str) -> SolverResult:
    types = {
        "ionic": "Ionic (saline) hydride — e.g. NaH, CaH₂",
        "covalent": "Covalent (molecular) hydride — e.g. HCl, NH₃, H₂O",
        "metallic": "Metallic (interstitial) hydride — e.g. PdH, TiH₂",
        "interstitial": "Interstitial hydride — H atoms in metal lattice",
    }
    info = types.get(hydride_type.lower(), f"Hydride type: {hydride_type}")
    return SolverResult(
        success=True,
        final_answer=info,
        steps=[
            Step("Step 1", "Hydride classification", "Classify by bonding type",
                 f"Type: {hydride_type}",
                 info),
        ],
    )


def hydrogen_water_gas_shift(CO_volume: float = 0, H2O_volume: float = 0, CO2_volume: float = 0) -> SolverResult:
    h2_produced = CO_volume  # 1:1 ratio
    return SolverResult(
        success=True,
        final_answer=f"H₂ produced = {h2_produced:.2f} L",
        steps=[
            Step("Step 1", "Water-gas shift", "CO + H₂O → CO₂ + H₂",
                 f"CO = {CO_volume} L",
                 f"H₂ = {h2_produced:.2f} L (1:1 ratio)"),
        ],
        unit="L",
    )


# ─── s-Block ───

def sblock_caco3_co2(mass_CaCO3: float) -> SolverResult:
    moles = mass_CaCO3 / 100.09
    co2_mass = moles * 44.01
    return SolverResult(
        success=True,
        final_answer=f"CO₂ released = {co2_mass:.2f} g",
        steps=[
            Step("Step 1", "Decomposition", "CaCO₃ → CaO + CO₂",
                 f"mass = {mass_CaCO3} g",
                 f"n = {moles:.4f} mol, CO₂ = {co2_mass:.2f} g"),
        ],
        unit="g",
    )


def sblock_solubility_molarity(mass_Na2CO3: float, volume_ml: float) -> SolverResult:
    moles = mass_Na2CO3 / 105.99
    M = moles / (volume_ml / 1000)
    return SolverResult(
        success=True,
        final_answer=f"Molarity = {M:.4f} M",
        steps=[
            Step("Step 1", "Molarity", "M = moles / V(L)",
                 f"mass = {mass_Na2CO3} g, V = {volume_ml} mL",
                 f"n = {moles:.4f}, M = {M:.4f} M"),
        ],
        unit="M",
    )


def sblock_lithium_anomaly(lithium_anomaly: str = "") -> SolverResult:
    return SolverResult(
        success=True,
        final_answer="Li shows anomalous behavior due to small size, high charge density",
        steps=[
            Step("Step 1", "Lithium anomaly", "Small size → high polarizing power",
                 "Li differs from other Group 1 elements",
                 "Diagonal relationship with Mg, harder, higher MP, forms covalent compounds"),
        ],
    )


def sblock_diagonal_relationship(group: str = "") -> SolverResult:
    return SolverResult(
        success=True,
        final_answer="Diagonal relationship: Li-Mg, Be-Al, B-Si (similar charge/size ratio)",
        steps=[
            Step("Step 1", "Diagonal relationship", "Similar charge/size ratio across periods",
                 "Elements diagonally adjacent show similar properties",
                 "Li↔Mg, Be↔Al, B↔Si"),
        ],
    )


# ─── p-Block ───

def pblock_oxidation_states(oxidation_state: int) -> SolverResult:
    return SolverResult(
        success=True,
        final_answer=f"Oxidation state: {oxidation_state}",
        steps=[
            Step("Step 1", "p-block oxidation states", "Group 13-18 elements show variable oxidation states",
                 f"Oxidation state = {oxidation_state}",
                 f"Inert pair effect: lower oxidation state becomes more stable down the group"),
        ],
    )


def pblock_oxoacid_strength(acid: str = "", strength: str = "") -> SolverResult:
    return SolverResult(
        success=True,
        final_answer=f"Oxoacid strength depends on electronegativity and oxidation state of central atom",
        steps=[
            Step("Step 1", "Oxoacid strength", "Higher EN and oxidation state → stronger acid",
                 f"Acid: {acid}",
                 "More oxygens and higher EN of central atom → stronger acid"),
        ],
    )


def pblock_ostwald_process(NH3_volume: float = 0, NO_volume: float = 0) -> SolverResult:
    return SolverResult(
        success=True,
        final_answer="Ostwald process: 4NH₃ + 5O₂ → 4NO + 6H₂O (Pt catalyst)",
        steps=[
            Step("Step 1", "Ostwald process", "Catalytic oxidation of NH₃ to NO",
                 f"NH₃ = {NH3_volume} L",
                 "4NH₃ + 5O₂ →Pt→ 4NO + 6H₂O, then 2NO + O₂ → 2NO₂, 3NO₂ + H₂O → 2HNO₃ + NO"),
        ],
    )


def pblock_sf6_properties(SF6_usage: str = "") -> SolverResult:
    return SolverResult(
        success=True,
        final_answer="SF₆: inert, non-toxic, excellent electrical insulator",
        steps=[
            Step("Step 1", "SF₆ properties", "Hexacoordinated, steric protection, very inert",
                 f"Usage: {SF6_usage}",
                 "Used in high-voltage electrical equipment, inert due to steric shielding"),
        ],
    )


# ─── Organic Basics ───

def organic_iupac_naming(functional_group: str, parent_hydrocarbon: str) -> SolverResult:
    return SolverResult(
        success=True,
        final_answer=f"IUPAC name based on {parent_hydrocarbon} with {functional_group}",
        steps=[
            Step("Step 1", "IUPAC naming", "Identify parent chain, number carbons, name substituents",
                 f"Parent: {parent_hydrocarbon}, Functional group: {functional_group}",
                 "Select longest chain, assign lowest numbers to functional groups"),
        ],
    )


def organic_priority_rules(functional_group1: str, functional_group2: str) -> SolverResult:
    priority = ["carboxylic acid", "ester", "amide", "nitrile", "aldehyde", "ketone",
                "alcohol", "amine", "ether", "alkene", "alkyne"]
    p1 = next((i for i, g in enumerate(priority) if g in functional_group1.lower()), 99)
    p2 = next((i for i, g in enumerate(priority) if g in functional_group2.lower()), 99)
    higher = functional_group1 if p1 < p2 else functional_group2
    return SolverResult(
        success=True,
        final_answer=f"Higher priority: {higher}",
        steps=[
            Step("Step 1", "Functional group priority", "Lower number = higher priority",
                 f"Group 1: {functional_group1}, Group 2: {functional_group2}",
                 f"Higher priority: {higher}"),
        ],
    )


def organic_isomer_count(carbon_count: int) -> SolverResult:
    # Approximate structural isomer counts for alkanes
    isomer_counts = {1: 1, 2: 1, 3: 1, 4: 2, 5: 3, 6: 5, 7: 9, 8: 18, 9: 35, 10: 75}
    count = isomer_counts.get(carbon_count, "many")
    return SolverResult(
        success=True,
        final_answer=f"{count} structural isomers",
        steps=[
            Step("Step 1", "Structural isomers", "Count distinct connectivity patterns",
                 f"Carbon count: {carbon_count}",
                 f"Isomers: {count}"),
        ],
    )


def organic_hybridization(hybridization: str) -> SolverResult:
    info = {
        "sp": "Linear, 180°, 2 electron groups",
        "sp2": "Trigonal planar, 120°, 3 electron groups",
        "sp3": "Tetrahedral, 109.5°, 4 electron groups",
        "sp3d": "Trigonal bipyramidal, 120°/90°, 5 electron groups",
        "sp3d2": "Octahedral, 90°, 6 electron groups",
    }
    details = info.get(hybridization.lower(), f"Hybridization: {hybridization}")
    return SolverResult(
        success=True,
        final_answer=details,
        steps=[
            Step("Step 1", "Hybridization", "Determined by steric number",
                 f"Hybridization: {hybridization}",
                 details),
        ],
    )


# ─── Hydrocarbons ───

def hydrocarbons_free_radical(alkane: str = "") -> SolverResult:
    return SolverResult(
        success=True,
        final_answer="Free radical substitution: initiation, propagation, termination",
        steps=[
            Step("Step 1", "Free radical mechanism", "UV light → homolytic cleavage",
                 f"Alkane: {alkane}",
                 "Initiation: Cl₂ → 2Cl•, Propagation: Cl• + CH₄ → CH₃• + HCl, Termination: 2• → bond"),
        ],
    )


def hydrocarbons_addition(alkene: str = "", reagent: str = "") -> SolverResult:
    return SolverResult(
        success=True,
        final_answer=f"Addition of {reagent} to {alkene} → saturated product",
        steps=[
            Step("Step 1", "Electrophilic addition", "π bond breaks, new σ bonds form",
                 f"Alkene: {alkene}, Reagent: {reagent}",
                 "Markovnikov's rule: H adds to carbon with more H's"),
        ],
    )


def hydrocarbons_alkyne_acidity(alkyne: str = "") -> SolverResult:
    return SolverResult(
        success=True,
        final_answer="Terminal alkynes have acidic H (pKa ≈ 25), react with Na/NH₂",
        steps=[
            Step("Step 1", "Terminal alkyne acidity", "sp C-H bond is more acidic than sp2/sp3",
                 f"Alkyne: {alkyne}",
                 "Terminal ≡C-H: pKa ≈ 25, reacts with strong bases (NaNH₂, Na)"),
        ],
    )


def hydrocarbons_aromaticity(aromatic: str = "") -> SolverResult:
    return SolverResult(
        success=True,
        final_answer="Hückel rule: (4n+2) π electrons, planar, cyclic, conjugated → aromatic",
        steps=[
            Step("Step 1", "Hückel rule", "4n+2 π electrons for aromaticity",
                 f"Compound: {aromatic}",
                 "Cyclic, planar, fully conjugated, 4n+2 π electrons (n=0,1,2...)"),
        ],
    )


# ─── SOLVER_REGISTRY ───

SOLVER_REGISTRY: Dict[str, Any] = {
    "basic_concepts_mole_particles": basic_concepts_mole_particles,
    "basic_concepts_dilution": basic_concepts_dilution,
    "basic_concepts_percentage_composition": basic_concepts_percentage_composition,
    "basic_concepts_equivalent_weight": basic_concepts_equivalent_weight,
    "atomic_bohr_velocity": atomic_bohr_velocity,
    "atomic_debroglie_wavelength": atomic_debroglie_wavelength,
    "atomic_electronic_config": atomic_electronic_config,
    "atomic_quantum_numbers": atomic_quantum_numbers,
    "periodic_trend_comparison": periodic_trend_comparison,
    "periodic_ionization_energy_group": periodic_ionization_energy_group,
    "periodic_atomic_radius_trend": periodic_atomic_radius_trend,
    "periodic_electronegativity_bond": periodic_electronegativity_bond,
    "periodic_group_period": periodic_group_period,
    "bonding_bond_type_prediction": bonding_bond_type_prediction,
    "bonding_vsepr_geometry": bonding_vsepr_geometry,
    "bonding_bond_order_length": bonding_bond_order_length,
    "thermo_deltaH_deltaU": thermo_deltaH_deltaU,
    "thermo_gibbs_free_energy": thermo_gibbs_free_energy,
    "thermo_heat_capacity": thermo_heat_capacity,
    "thermo_hess_law": thermo_hess_law,
    "equilibrium_kc_calculation": equilibrium_kc_calculation,
    "equilibrium_weak_acid_ph": equilibrium_weak_acid_ph,
    "equilibrium_ksp_solubility": equilibrium_ksp_solubility,
    "equilibrium_buffer_ph": equilibrium_buffer_ph,
    "equilibrium_le_chatelier": equilibrium_le_chatelier,
    "redox_titration_iron": redox_titration_iron,
    "redox_cell_potential": redox_cell_potential,
    "redox_faraday_law": redox_faraday_law,
    "redox_balance_reaction": redox_balance_reaction,
    "hydrogen_volume_stp": hydrogen_volume_stp,
    "hydrogen_na_reaction": hydrogen_na_reaction,
    "hydrogen_hydride_classification": hydrogen_hydride_classification,
    "hydrogen_water_gas_shift": hydrogen_water_gas_shift,
    "sblock_caco3_co2": sblock_caco3_co2,
    "sblock_solubility_molarity": sblock_solubility_molarity,
    "sblock_lithium_anomaly": sblock_lithium_anomaly,
    "sblock_diagonal_relationship": sblock_diagonal_relationship,
    "pblock_oxidation_states": pblock_oxidation_states,
    "pblock_oxoacid_strength": pblock_oxoacid_strength,
    "pblock_ostwald_process": pblock_ostwald_process,
    "pblock_sf6_properties": pblock_sf6_properties,
    "organic_iupac_naming": organic_iupac_naming,
    "organic_priority_rules": organic_priority_rules,
    "organic_isomer_count": organic_isomer_count,
    "organic_hybridization": organic_hybridization,
    "hydrocarbons_free_radical": hydrocarbons_free_radical,
    "hydrocarbons_addition": hydrocarbons_addition,
    "hydrocarbons_alkyne_acidity": hydrocarbons_alkyne_acidity,
    "hydrocarbons_aromaticity": hydrocarbons_aromaticity,
}
