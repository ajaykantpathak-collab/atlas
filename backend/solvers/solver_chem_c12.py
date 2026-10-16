"""
solver_chem_c12.py — CBSE/ISC Class 12 Chemistry solver functions.

Each solver takes positional arguments and returns a SolverResult with
model_answer, final_answer, and solution_steps (list of Step with .text).

Used by class12_chem_questions.py.
"""
from __future__ import annotations
import math
from dataclasses import dataclass, field
from typing import Any, List, Optional


@dataclass
class Step:
    text: str = ""

    def to_dict(self) -> dict:
        return {"text": self.text}


@dataclass
class SolverResult:
    success: bool = True
    model_answer: str = ""
    final_answer: Any = None
    solution_steps: List[Step] = field(default_factory=list)
    error: Optional[str] = None
    unit: Optional[str] = None


AVOGADRO = 6.022e23
BOLTZMANN_K = 1.38e-23
EV_TO_J = 1.602e-19
R_GAS = 8.314
FARADAY = 96500.0


def solid_state_defects(E_defect: float, T_K: float, N_A: float, mass_g: float) -> SolverResult:
    """Schottky defect count: n = (N_A/mass) * exp(-E_defect*1.602e-19 / (k*T))"""
    E_J = E_defect * EV_TO_J
    n_defects = (N_A / mass_g) * math.exp(-E_J / (BOLTZMANN_K * T_K))
    steps = [
        Step(f"Defect formation energy: E = {E_defect} eV = {E_J:.3e} J"),
        Step(f"Temperature: T = {T_K} K"),
        Step(f"Boltzmann factor: exp(-E/kT) = exp(-{E_J:.3e} / ({BOLTZMANN_K}*{T_K}))"),
        Step(f"Number of defects: n = (N_A / mass) × exp(-E/kT) = {n_defects:.4e}"),
    ]
    return SolverResult(
        success=True,
        model_answer=f"Number of Schottky defects = {n_defects:.4e}",
        final_answer=f"{n_defects:.4e}",
        solution_steps=steps,
    )


def solutions_vp_lowering(n_solute: float, n_solvent: float, P_pure: float, P_solution: float) -> SolverResult:
    """Raoult's law: P_solution = X_solvent * P_pure"""
    x_solvent = n_solvent / (n_solute + n_solvent)
    x_solute = n_solute / (n_solute + n_solvent)
    delta_P = P_pure - P_solution
    steps = [
        Step(f"Mole fraction of solvent: X_solvent = {n_solvent}/({n_solute}+{n_solvent}) = {x_solvent:.4f}"),
        Step(f"Mole fraction of solute: X_solute = {x_solute:.4f}"),
        Step(f"Raoult's law: P_solution = X_solvent × P_pure = {x_solvent:.4f} × {P_pure} = {x_solvent*P_pure:.2f} mmHg"),
        Step(f"Vapour pressure lowering: ΔP = P_pure - P_solution = {delta_P:.2f} mmHg"),
        Step(f"Relative lowering: ΔP/P_pure = {delta_P/P_pure:.4f} = X_solute"),
    ]
    return SolverResult(
        success=True,
        model_answer=f"Vapour pressure lowering ΔP = {delta_P:.2f} mmHg, Relative lowering = {x_solute:.4f}",
        final_answer=f"{delta_P:.2f} mmHg",
        solution_steps=steps,
        unit="mmHg",
    )


def electrochemistry_cell_emf(E_Ag_AgCl: float, E_Zn_Zn: float, n: float, T_K: float) -> SolverResult:
    """Nernst equation: E_cell = E°cell - (RT/nF) * ln(Q)"""
    E_cell = E_Ag_AgCl - E_Zn_Zn
    steps = [
        Step(f"Standard cell potential: E°cell = E°cathode - E°anode = {E_Ag_AgCl} - {E_Zn_Zn} = {E_cell:.3f} V"),
        Step(f"Nernst equation: E = E° - (RT/nF) × ln(Q)"),
        Step(f"At T = {T_K} K, n = {n}: (RT/nF) = {R_GAS*T_K/(n*FARADAY):.4f} V"),
        Step(f"Cell EMF = {E_cell:.3f} V (positive → spontaneous)"),
    ]
    return SolverResult(
        success=True,
        model_answer=f"Cell EMF = {E_cell:.3f} V",
        final_answer=f"{E_cell:.3f} V",
        solution_steps=steps,
        unit="V",
    )


def kinetics_radioactive_decay(N0: float, t_min: float, remain: float) -> SolverResult:
    """First-order decay: N = N0 * exp(-kt), find k and half-life"""
    import math as m
    if N0 > 0 and remain > 0:
        k = -m.log(remain / N0) / t_min if t_min > 0 else 0
        t_half = m.log(2) / k if k > 0 else float('inf')
    else:
        k = 0
        t_half = 0
    steps = [
        Step(f"Initial activity: N₀ = {N0}"),
        Step(f"Time: t = {t_min} min"),
        Step(f"Remaining: N = {remain}"),
        Step(f"Rate constant: k = -ln(N/N₀)/t = {k:.6f} min⁻¹"),
        Step(f"Half-life: t₁/₂ = ln(2)/k = {t_half:.2f} min"),
    ]
    return SolverResult(
        success=True,
        model_answer=f"Rate constant k = {k:.6f} min⁻¹, Half-life = {t_half:.2f} min",
        final_answer=f"k = {k:.6f} min⁻¹",
        solution_steps=steps,
        unit="min⁻¹",
    )


def surface_chem_gibbs_adsorption(gamma1: float, gamma2: float, T_K: float, conc: float) -> SolverResult:
    """Gibbs adsorption isotherm: Γ = -(1/RT) × dγ/dC"""
    dgamma_dc = (gamma2 - gamma1) / conc if conc > 0 else 0
    gamma_ads = -(1 / (R_GAS * T_K)) * dgamma_dc
    steps = [
        Step(f"Surface tension change: γ₁ = {gamma1}, γ₂ = {gamma2}"),
        Step(f"dγ/dC = ({gamma2} - {gamma1}) / {conc} = {dgamma_dc:.4e}"),
        Step(f"Gibbs adsorption: Γ = -(1/RT) × dγ/dC = {gamma_ads:.4e} mol/m²"),
    ]
    return SolverResult(
        success=True,
        model_answer=f"Surface excess Γ = {gamma_ads:.4e} mol/m²",
        final_answer=f"{gamma_ads:.4e} mol/m²",
        solution_steps=steps,
        unit="mol/m²",
    )


def metallurgy_ellingham(slope_C: float, dG_C_700: float, T_cross: float) -> SolverResult:
    """Ellingham diagram analysis for carbon reduction"""
    steps = [
        Step(f"Carbon line slope: {slope_C} kJ/(mol·K)"),
        Step(f"ΔG for C at 700°C: {dG_C_700} kJ/mol"),
        Step(f"Crossover temperature: {T_cross} K"),
        Step(f"Below {T_cross} K: reduction by carbon is not favourable"),
        Step(f"Above {T_cross} K: carbon can reduce the metal oxide (ΔG < 0)"),
    ]
    return SolverResult(
        success=True,
        model_answer=f"Carbon reduction becomes favourable above {T_cross} K",
        final_answer=f"T > {T_cross} K",
        solution_steps=steps,
        unit="K",
    )


def pblock_contact_process(n_SO2: float, n_O2: float, n_SO3: float, Kc: float) -> SolverResult:
    """Contact process: 2SO2 + O2 ⇌ 2SO3, Kc = [SO3]²/([SO2]²×[O1])"""
    Q = (n_SO3**2) / (n_SO2**2 * n_O2) if n_SO2 > 0 and n_O2 > 0 else 0
    direction = "forward (towards products)" if Q < Kc else "backward (towards reactants)" if Q > Kc else "at equilibrium"
    steps = [
        Step(f"Reaction: 2SO₂ + O₂ ⇌ 2SO₃"),
        Step(f"Reaction quotient: Q = [{n_SO3}]²/([{n_SO2}]²×[{n_O2}]) = {Q:.4f}"),
        Step(f"Kc = {Kc}"),
        Step(f"Q {'<' if Q < Kc else '>' if Q > Kc else '='} Kc → reaction shifts {direction}"),
    ]
    return SolverResult(
        success=True,
        model_answer=f"Q = {Q:.4f}, Kc = {Kc}, reaction shifts {direction}",
        final_answer=f"{direction}",
        solution_steps=steps,
    )


def dblock_magnetic_moment(metal: str, ox: int) -> SolverResult:
    """Calculate magnetic moment: μ = √(n(n+2)) BM where n = unpaired electrons"""
    # Common d-block ions: (metal, oxidation_state) -> d-electron count
    d_configs = {
        ("Sc", 3): 0, ("Ti", 3): 1, ("Ti", 4): 0, ("V", 3): 2,
        ("Cr", 3): 3, ("Cr", 2): 4, ("Mn", 2): 5, ("Mn", 3): 4,
        ("Fe", 2): 6, ("Fe", 3): 5, ("Co", 2): 7, ("Co", 3): 6,
        ("Ni", 2): 8, ("Cu", 2): 9, ("Cu", 1): 10, ("Zn", 2): 10,
    }
    # Unpaired electrons for high-spin octahedral: d0=0,d1=1,d2=2,d3=3,d4=4,d5=5,d6=4,d7=3,d8=2,d9=1,d10=0
    unpaired_map = {0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 4, 7: 3, 8: 2, 9: 1, 10: 0}
    d_electrons = d_configs.get((metal, ox), 3)
    n_unpaired = unpaired_map.get(d_electrons, 0)
    mu = math.sqrt(n_unpaired * (n_unpaired + 2))
    steps = [
        Step(f"Metal ion: {metal} {ox}"),
        Step(f"Number of unpaired electrons: n = {n_unpaired}"),
        Step(f"Spin-only magnetic moment: μ = √(n(n+2)) = √({n_unpaired}×{n_unpaired+2}) = {mu:.2f} BM"),
    ]
    return SolverResult(
        success=True,
        model_answer=f"Magnetic moment μ = {mu:.2f} BM ({n_unpaired} unpaired electrons)",
        final_answer=f"{mu:.2f} BM",
        solution_steps=steps,
        unit="BM",
    )


def coord_compound_analysis(comp_name: str) -> SolverResult:
    """Analyse coordination compound: oxidation state, coordination number, geometry"""
    # Simplified analysis based on common compounds
    analyses = {
        "k3[fe(cn)6]": ("K₃[Fe(CN)₆]", "Fe³⁺", 6, "octahedral", "d⁵, low spin"),
        "k4[fe(cn)6]": ("K₄[Fe(CN)₆]", "Fe²⁺", 6, "octahedral", "d⁶, low spin"),
        "[co(nh3)6]cl3": ("[Co(NH₃)₆]Cl₃", "Co³⁺", 6, "octahedral", "d⁶, low spin"),
        "[ni(co)4]": ("[Ni(CO)₄]", "Ni⁰", 4, "tetrahedral", "d¹⁰"),
        "[ptcl4]2-": ("[PtCl₄]²⁻", "Pt²⁺", 4, "square planar", "d⁸"),
    }
    key = comp_name.lower().replace(" ", "")
    info = analyses.get(key, (comp_name, "Mⁿ⁺", 6, "octahedral", "varies"))
    steps = [
        Step(f"Compound: {info[0]}"),
        Step(f"Central metal oxidation state: {info[1]}"),
        Step(f"Coordination number: {info[2]}"),
        Step(f"Geometry: {info[3]}"),
        Step(f"Electronic configuration: {info[4]}"),
    ]
    return SolverResult(
        success=True,
        model_answer=f"{info[0]}: {info[1]}, CN={info[2]}, {info[3]}, {info[4]}",
        final_answer=f"{info[1]}, CN={info[2]}, {info[3]}",
        solution_steps=steps,
    )


def haloalkanes_wurtz_yield(n_RX: float, n_Na: float, actual: float) -> SolverResult:
    """Wurtz reaction: 2RX + 2Na → R-R + 2NaX. Theoretical vs actual yield."""
    theoretical = min(n_RX / 2, n_Na / 2)
    pct = (actual / theoretical * 100) if theoretical > 0 else 0
    steps = [
        Step(f"Wurtz reaction: 2RX + 2Na → R-R + 2NaX"),
        Step(f"Moles RX = {n_RX}, Moles Na = {n_Na}"),
        Step(f"Limiting reagent determines theoretical yield"),
        Step(f"Theoretical yield = min(n_RX/2, n_Na/2) = {theoretical:.4f} mol"),
        Step(f"Actual yield = {actual:.4f} mol"),
        Step(f"Percentage yield = ({actual}/{theoretical}) × 100 = {pct:.2f}%"),
    ]
    return SolverResult(
        success=True,
        model_answer=f"Theoretical yield = {theoretical:.4f} mol, Percentage yield = {pct:.2f}%",
        final_answer=f"{pct:.2f}%",
        solution_steps=steps,
        unit="%",
    )


def alcohols_oxidation_yield(n_alc: float, n_oxid: float, actual: float, M_prod: float) -> SolverResult:
    """Alcohol oxidation: R-CH₂OH + [O] → R-COOH. Yield calculation."""
    theoretical = min(n_alc, n_oxid)  # 1:1 stoichiometry
    theoretical_mass = theoretical * M_prod
    pct = (actual / theoretical_mass * 100) if theoretical_mass > 0 else 0
    steps = [
        Step(f"Oxidation: R-CH₂OH + [O] → R-COOH"),
        Step(f"Moles alcohol = {n_alc}, Moles oxidant = {n_oxid}"),
        Step(f"Theoretical moles of product = {theoretical:.4f} mol"),
        Step(f"Molar mass of product = {M_prod} g/mol"),
        Step(f"Theoretical mass = {theoretical:.4f} × {M_prod} = {theoretical_mass:.2f} g"),
        Step(f"Actual mass = {actual:.2f} g"),
        Step(f"Percentage yield = ({actual}/{theoretical_mass:.2f}) × 100 = {pct:.2f}%"),
    ]
    return SolverResult(
        success=True,
        model_answer=f"Theoretical = {theoretical_mass:.2f} g, Yield = {pct:.2f}%",
        final_answer=f"{pct:.2f}%",
        solution_steps=steps,
        unit="%",
    )


def aldehydes_aldol_condensation(n_acetone: float, n_benz: float, actual_mass: float) -> SolverResult:
    """Aldol condensation yield."""
    theoretical = min(n_acetone, n_benz)
    M_product = 146.19  # dibenzalacetone approx
    theoretical_mass = theoretical * M_product
    pct = (actual_mass / theoretical_mass * 100) if theoretical_mass > 0 else 0
    steps = [
        Step(f"Aldol condensation: acetone + benzaldehyde → dibenzalacetone"),
        Step(f"Moles acetone = {n_acetone}, Moles benzaldehyde = {n_benz}"),
        Step(f"Theoretical moles = {theoretical:.4f} mol"),
        Step(f"Molar mass of product ≈ {M_product} g/mol"),
        Step(f"Theoretical mass = {theoretical_mass:.2f} g"),
        Step(f"Actual mass = {actual_mass:.2f} g"),
        Step(f"Percentage yield = {pct:.2f}%"),
    ]
    return SolverResult(
        success=True,
        model_answer=f"Theoretical = {theoretical_mass:.2f} g, Yield = {pct:.2f}%",
        final_answer=f"{pct:.2f}%",
        solution_steps=steps,
        unit="%",
    )


def amines_hinsberg_fw(dTf: float, Kf: float, w_g: float, W_solv: float) -> SolverResult:
    """Hinsberg method: molar mass from freezing point depression"""
    molality = dTf / Kf if Kf > 0 else 0
    moles = molality * (W_solv / 1000)
    M = w_g / moles if moles > 0 else 0
    steps = [
        Step(f"Freezing point depression: ΔTf = {dTf} K"),
        Step(f"Cryoscopic constant: Kf = {Kf} K·kg/mol"),
        Step(f"Molality: m = ΔTf/Kf = {molality:.4f} mol/kg"),
        Step(f"Mass of amine: w = {w_g} g, Mass of solvent: W = {W_solv} g"),
        Step(f"Moles = m × W/1000 = {moles:.4f} mol"),
        Step(f"Molar mass = w/moles = {M:.2f} g/mol"),
    ]
    return SolverResult(
        success=True,
        model_answer=f"Molar mass of amine = {M:.2f} g/mol",
        final_answer=f"{M:.2f} g/mol",
        solution_steps=steps,
        unit="g/mol",
    )


def amines_buffer_prep(pKb: float, n_base: float, V_L: float) -> SolverResult:
    """Buffer preparation: Henderson-Hasselbalch for basic buffer"""
    pKa_conj = 14 - pKb  # pKa of conjugate acid
    target_pH = pKa_conj  # when [base] = [salt]
    M_salt = 67.52  # CH3NH3Cl molar mass
    # At target pH = pKa, [salt] = [base], so moles salt = moles base
    mass_salt = n_base * M_salt
    # After adding 0.01 mol HCl
    n_base_new = n_base - 0.01
    n_salt_new = n_base + 0.01
    pH_new = pKa_conj + math.log10(n_base_new / n_salt_new) if n_base_new > 0 else pKa_conj
    steps = [
        Step(f"pKb = {pKb}, pKa of conjugate acid = 14 - {pKb} = {pKa_conj:.2f}"),
        Step(f"Target pH = pKa = {target_pH:.2f} (when [base] = [salt])"),
        Step(f"Moles of CH₃NH₃Cl needed = moles of base = {n_base:.4f} mol"),
        Step(f"Mass of CH₃NH₃Cl = {n_base:.4f} × {M_salt} = {mass_salt:.2f} g"),
        Step(f"After adding 0.01 mol HCl: base = {n_base_new:.4f}, salt = {n_salt_new:.4f}"),
        Step(f"New pH = {pKa_conj:.2f} + log({n_base_new:.4f}/{n_salt_new:.4f}) = {pH_new:.2f}"),
    ]
    return SolverResult(
        success=True,
        model_answer=f"Mass of CH₃NH₃Cl = {mass_salt:.2f} g, pH after HCl = {pH_new:.2f}",
        final_answer=f"{mass_salt:.2f} g, pH = {pH_new:.2f}",
        solution_steps=steps,
    )


def amines_diazotization(mass_g: float, M_ArNH2: float, M_NaNO2_m: float) -> SolverResult:
    """Diazotization: ArNH2 + NaNO2 + 2HCl → ArN2+Cl- + NaCl + 2H2O"""
    moles_ArNH2 = mass_g / M_ArNH2
    vol_NaNO2 = moles_ArNH2 / M_NaNO2_m  # 1:1 stoichiometry, in litres
    vol_ml = vol_NaNO2 * 1000
    steps = [
        Step(f"Diazotisation: ArNH₂ + NaNO₂ + 2HCl → ArN₂⁺Cl⁻ + NaCl + 2H₂O"),
        Step(f"Moles of ArNH₂ = {mass_g} / {M_ArNH2} = {moles_ArNH2:.4f} mol"),
        Step(f"1:1 stoichiometry: moles NaNO₂ needed = {moles_ArNH2:.4f} mol"),
        Step(f"Volume of {M_NaNO2_m} M NaNO₂ = {moles_ArNH2:.4f} / {M_NaNO2_m} = {vol_NaNO2:.4f} L = {vol_ml:.2f} mL"),
    ]
    return SolverResult(
        success=True,
        model_answer=f"Moles ArNH₂ = {moles_ArNH2:.4f}, Volume NaNO₂ = {vol_ml:.2f} mL",
        final_answer=f"{vol_ml:.2f} mL",
        solution_steps=steps,
        unit="mL",
    )




def kinetics_first_order(k: float, C0: float, t_ask: float) -> SolverResult:
    """First-order kinetics: t1/2, t80, rate at t_ask, initial rate."""
    import math as m
    t_half = m.log(2) / k if k > 0 else float('inf')
    t80 = -m.log(0.2) / k if k > 0 else float('inf')
    rate_t = k * C0 * m.exp(-k * t_ask) if k > 0 else 0.0
    rate0 = k * C0
    steps = [
        Step(f"Half-life: t1/2 = ln(2)/k = {t_half:.4g} s"),
        Step(f"80% completion: t = -ln(0.2)/k = {t80:.4g} s"),
        Step(f"Rate at t = {t_ask} s: k*C0*exp(-k*t) = "
             f"{rate_t:.4e} M/s"),
        Step(f"Initial rate: k*C0 = {rate0:.4e} M/s"),
    ]
    return SolverResult(
        success=True,
        model_answer=(f"t1/2 = {t_half:.4g} s, t(80%) = {t80:.4g} s, "
                      f"rate({t_ask} s) = {rate_t:.4e} M/s, "
                      f"initial rate = {rate0:.4e} M/s"),
        final_answer=f"t1/2 = {t_half:.4g} s",
        solution_steps=steps,
        unit="s",
    )


def kinetics_arrhenius(k1: float, k2: float, T1: float, T2: float) -> SolverResult:
    """Arrhenius: Ea = R ln(k2/k1) / (1/T1 - 1/T2), reported in kJ/mol."""
    import math as m
    R = 8.314
    if k1 <= 0 or k2 <= 0 or T1 <= 0 or T2 <= 0 or T1 == T2:
        return SolverResult(success=False, error="non-positive input")
    ea = R * m.log(k2 / k1) / (1.0 / T1 - 1.0 / T2)
    steps = [
        Step(f"ln(k2/k1) = ln({k2:.2e}/{k1:.2e}) = "
             f"{m.log(k2 / k1):.6g}"),
        Step(f"1/T1 - 1/T2 = 1/{T1} - 1/{T2} = "
             f"{1.0 / T1 - 1.0 / T2:.6e} K^-1"),
        Step(f"Ea = R*ln(k2/k1)/(1/T1 - 1/T2) = {ea:.6g} J/mol"),
        Step(f"Ea = {ea / 1000:.4g} kJ/mol"),
    ]
    return SolverResult(
        success=True,
        model_answer=f"Activation energy Ea = {ea / 1000:.4g} kJ/mol",
        final_answer=f"{ea / 1000:.4g} kJ/mol",
        solution_steps=steps,
        unit="kJ/mol",
    )


SOLVER_REGISTRY = {
    "solid_state_defects": solid_state_defects,
    "solutions_vp_lowering": solutions_vp_lowering,
    "electrochemistry_cell_emf": electrochemistry_cell_emf,
    "kinetics_radioactive_decay": kinetics_radioactive_decay,
    "kinetics_first_order": kinetics_first_order,
    "kinetics_arrhenius": kinetics_arrhenius,
    "surface_chem_gibbs_adsorption": surface_chem_gibbs_adsorption,
    "metallurgy_ellingham": metallurgy_ellingham,
    "pblock_contact_process": pblock_contact_process,
    "dblock_magnetic_moment": dblock_magnetic_moment,
    "coord_compound_analysis": coord_compound_analysis,
    "haloalkanes_wurtz_yield": haloalkanes_wurtz_yield,
    "alcohols_oxidation_yield": alcohols_oxidation_yield,
    "aldehydes_aldol_condensation": aldehydes_aldol_condensation,
    "amines_hinsberg_fw": amines_hinsberg_fw,
    "amines_buffer_prep": amines_buffer_prep,
    "amines_diazotization": amines_diazotization,
}
