"""variable_registry.py — Semantic identity for every equation variable.

The root of text->solver binding: each variable symbol in the canonical
graph carries a plain-English description and a unit family. Combined
with embedding similarity, ANY phrasing of a quantity ("mass of 5",
"a 5 kg body", "the body weighs 5 kg") binds to the right slot without
vocab lists - the description IS the vocabulary.

Symbols not in the table fall back to name synthesis (underscores ->
spaces); MiniLM matches "v escape" ~ "escape velocity" well enough to
bind. The table exists to sharpen the high-traffic vars.
"""

from __future__ import annotations

import functools
import threading
from typing import Dict, List, Optional, Tuple

# symbol -> (description, unit_family)
# unit families align with quantity_parser.UNIT_FAMILIES
VARIABLE_INFO: Dict[str, Tuple[str, str]] = {
    # ---- maths: commercial arithmetic ----
    "p_": ("principal sum of money lent or invested", "money"),
    "si": ("simple interest earned", "money"),
    "amount": ("total compound amount accrued", "money"),
    "r": ("rate of interest per year in percent", "percentage"),
    "r_cont": ("continuous compounding rate", "rate"),
    "t": ("time period in years", "time"),
    "t_time": ("time duration in seconds", "time"),
    "sp": ("selling price", "money"),
    "cp": ("cost price", "money"),
    "profit_pct": ("profit percentage", "percentage"),
    "loss_pct": ("loss percentage", "percentage"),
    "p": ("percentage value", "percentage"),
    "x": ("part value or unknown x", "dimensionless"),
    "y": ("whole value or unknown y", "dimensionless"),
    "pct_elem": ("percentage of an element in a compound", "percentage"),
    # ---- maths: averages / geometry ----
    "avg": ("average mean of the numbers", "dimensionless"),
    "total_sum": ("sum total of all values", "dimensionless"),
    "n": ("count or number of terms", "dimensionless"),
    "l_": ("length", "length"),
    "b": ("breadth or base width", "length"),
    "h": ("height", "length"),
    "h_": ("height of the object above ground", "length"),
    "d_": ("horizontal distance to the object", "length"),
    "dist": ("distance between two points", "length"),
    "area": ("area", "area"),
    "vol": ("volume", "volume"),
    "circ": ("circumference of the circle", "length"),
    "r": ("radius", "length"),
    "r_c": ("radius of the circle", "length"),
    "hyp": ("hypotenuse of the right triangle", "length"),
    "base": ("base side of the right triangle", "length"),
    "perp": ("perpendicular side of the right triangle", "length"),
    "x1": ("x-coordinate of the first point", "length"),
    "x2": ("x-coordinate of the second point", "length"),
    "y1": ("y-coordinate of the first point", "length"),
    "y2": ("y-coordinate of the second point", "length"),
    "mx": ("x-coordinate of the midpoint", "length"),
    "my": ("y-coordinate of the midpoint", "length"),
    "m_slope": ("slope of the line", "dimensionless"),
    # ---- maths: algebra ----
    "a_": ("leading coefficient of the quadratic", "dimensionless"),
    "b_": ("linear coefficient of the quadratic", "dimensionless"),
    "c_": ("constant term of the quadratic", "dimensionless"),
    "D": ("discriminant of the quadratic", "dimensionless"),
    "sum_roots": ("sum of the roots of the quadratic", "dimensionless"),
    "prod_roots": ("product of the roots of the quadratic", "dimensionless"),
    "an": ("nth term of the progression", "dimensionless"),
    "d_": ("common difference of the arithmetic progression", "dimensionless"),
    "r_": ("common ratio of the geometric progression", "dimensionless"),
    "s_n": ("sum of the first n terms", "dimensionless"),
    "s_inf": ("infinite geometric series sum", "dimensionless"),
    "prob": ("probability of the event", "dimensionless"),
    "fav": ("number of favourable outcomes", "dimensionless"),
    "total": ("total number of outcomes", "dimensionless"),
    "ncr": ("number of combinations n choose r", "dimensionless"),
    "npr": ("number of permutations", "dimensionless"),
    "tan_t": ("tangent of the angle", "dimensionless"),
    "tan_theta": ("tangent of the elevation angle", "dimensionless"),
    "sin_t": ("sine of the angle", "dimensionless"),
    "cos_t": ("cosine of the angle", "dimensionless"),
    "sin_A": ("sine of angle A of the triangle", "dimensionless"),
    "cos_C": ("cosine of the included angle C", "dimensionless"),
    "term": ("binomial probability of r successes", "dimensionless"),
    # ---- physics: mechanics ----
    "m": ("mass of the body in kilograms", "mass"),
    "v": ("final velocity or speed", "velocity"),
    "u": ("initial velocity or speed", "velocity"),
    "a": ("acceleration", "acceleration"),
    "s": ("displacement or distance travelled", "length"),
    "F": ("force", "force"),
    "F_net": ("net resultant force", "force"),
    "W_weight": ("weight of the body", "force"),
    "W_work": ("work done by the force", "energy"),
    "PE": ("gravitational potential energy", "energy"),
    "KE": ("kinetic energy", "energy"),
    "PE_spring": ("elastic potential energy stored in the spring", "energy"),
    "P_power": ("power delivered", "power"),
    "E_energy": ("energy consumed or transferred", "energy"),
    "p_mom": ("linear momentum of the body", "momentum"),
    "impulse": ("impulse delivered by the force", "momentum"),
    "F_avg": ("average force during the impact", "force"),
    "dt": ("duration of the impulse", "time"),
    "f_k": ("kinetic friction force", "force"),
    "f_s_max": ("maximum static friction force", "force"),
    "mu_k": ("coefficient of kinetic friction", "dimensionless"),
    "mu_s": ("coefficient of static friction", "dimensionless"),
    "N_normal": ("normal reaction force", "force"),
    "T_period": ("time period of one oscillation or revolution", "time"),
    "omega": ("angular frequency", "frequency"),
    "k_spring": ("spring constant stiffness", "stiffness"),
    "x": ("extension or displacement from equilibrium", "length"),
    "x_disp": ("displacement in simple harmonic motion", "length"),
    "v_shm": ("velocity in simple harmonic motion", "velocity"),
    "A_amp": ("amplitude of the oscillation", "length"),
    "l_pend": ("length of the pendulum", "length"),
    "v_c": ("speed in uniform circular motion", "velocity"),
    "r_circ": ("radius of the circular path", "length"),
    "F_cent": ("centripetal force", "force"),
    "T_flight": ("time of flight of the projectile", "time"),
    "H_max": ("maximum height reached by the projectile", "length"),
    "R_range": ("horizontal range of the projectile", "length"),
    "sin_theta": ("sine of the launch or incline angle", "dimensionless"),
    "cos_theta": ("cosine of the angle between force and displacement",
                  "dimensionless"),
    "sin_2theta": ("sine of twice the launch angle", "dimensionless"),
    "v_rel": ("relative velocity between the objects", "velocity"),
    "v1": ("velocity of the first object", "velocity"),
    "v2": ("velocity of the second object", "velocity"),
    "u1": ("initial velocity of the first object", "velocity"),
    "u2": ("initial velocity of the second object", "velocity"),
    "v1_f": ("final velocity of the first object after collision",
             "velocity"),
    "v2_f": ("final velocity of the second object after collision",
             "velocity"),
    "m1": ("mass of the first object", "mass"),
    "m2": ("mass of the second object", "mass"),
    "v_boat": ("speed of the boat in still water", "velocity"),
    "v_river": ("speed of the river current", "velocity"),
    "width": ("width of the river", "length"),
    "drift": ("downstream drift distance", "length"),
    "t_cross": ("time taken to cross the river", "time"),
    # ---- physics: gravitation / rotational ----
    "G_const": ("universal gravitational constant", "constant"),
    "M": ("mass of the planet or central body", "mass"),
    "R_planet": ("radius of the planet", "length"),
    "g_": ("acceleration due to gravity", "acceleration"),
    "v_escape": ("escape velocity from the planet", "velocity"),
    "v_orbit": ("orbital velocity of the satellite", "velocity"),
    "r_orbit": ("orbital radius of the satellite", "length"),
    "g_h": ("acceleration due to gravity at height h", "acceleration"),
    "U_grav": ("gravitational potential energy", "energy"),
    "tau": ("torque", "torque"),
    "I_moi": ("moment of inertia", "inertia"),
    "alpha": ("angular acceleration", "frequency"),
    "L_am": ("angular momentum", "angular_momentum"),
    "KE_rot": ("rotational kinetic energy", "energy"),
    "F_grav": ("gravitational force between the masses", "force"),
    # ---- physics: matter / fluids ----
    "rho": ("density of the material", "density"),
    "P": ("pressure", "pressure"),
    "F_b": ("buoyant force on the body", "force"),
    "vol_displaced": ("volume of fluid displaced", "volume"),
    "Y_mod": ("Young's modulus of the material", "stiffness"),
    "stress": ("stress on the material", "pressure"),
    "strain": ("strain produced", "dimensionless"),
    "dl": ("elongation produced", "length"),
    "v_efflux": ("efflux speed of the liquid", "velocity"),
    "v_term": ("terminal velocity of the sphere", "velocity"),
    "Q_flow": ("volume flow rate", "flow"),
    "visc": ("coefficient of viscosity", "viscosity"),
    "sigma_st": ("surface tension of the liquid", "surfacetension"),
    "h_cap": ("capillary rise height", "length"),
    "r_cap": ("radius of the capillary tube or sphere", "length"),
    # ---- physics: thermal ----
    "Q_heat": ("heat energy supplied or released", "energy"),
    "c_spec": ("specific heat capacity", "specheat"),
    "dT": ("change in temperature", "tempdiff"),
    "L_fusion": ("latent heat of fusion or vaporisation", "latentheat"),
    "alpha_L": ("coefficient of linear expansion", "expansion"),
    "P_gas": ("pressure of the gas", "pressure"),
    "V_gas": ("volume of the gas", "volume"),
    "T_abs": ("absolute temperature in kelvin", "temperature"),
    "T1": ("initial absolute temperature", "temperature"),
    "T2": ("final absolute temperature", "temperature"),
    "P1": ("initial pressure", "pressure"),
    "P2": ("final pressure", "pressure"),
    "V1": ("initial volume", "volume"),
    "V2": ("final volume", "volume"),
    "n_mol": ("number of moles", "amount"),
    "R_gas": ("universal gas constant", "constant"),
    "eta_carnot": ("Carnot engine efficiency", "dimensionless"),
    "eta_engine": ("efficiency of the heat engine", "dimensionless"),
    "COP": ("coefficient of performance of the refrigerator", "dimensionless"),
    "v_rms": ("root mean square molecular speed", "velocity"),
    "gamma_ad": ("adiabatic index", "dimensionless"),
    "W_by": ("work done by the gas", "energy"),
    # ---- physics: waves / sound ----
    "v_wave": ("wave speed", "velocity"),
    "f_freq": ("frequency of the wave", "frequency"),
    "lam_w": ("wavelength of the wave", "length"),
    "T_tension": ("tension in the string", "force"),
    "mu_linear": ("linear mass density of the string", "lineardensity"),
    "f_beat": ("beat frequency", "frequency"),
    "f1": ("first frequency", "frequency"),
    "f2": ("second frequency", "frequency"),
    "f_obs": ("observed frequency (Doppler)", "frequency"),
    "v_observer": ("speed of the observer", "velocity"),
    "v_source": ("speed of the source", "velocity"),
    "beta_db": ("sound intensity level in decibels", "dimensionless"),
    "I_sound": ("sound intensity", "intensity"),
    "d_echo": ("distance measured by echo ranging", "length"),
    # ---- physics: electricity ----
    "V_pot": ("voltage or potential difference", "voltage"),
    "I_cur": ("electric current", "current"),
    "R_res": ("electrical resistance", "resistance"),
    "R_eq": ("equivalent resistance of the combination", "resistance"),
    "R1": ("first resistance", "resistance"),
    "R2": ("second resistance", "resistance"),
    "R3": ("third resistance", "resistance"),
    "P_elec": ("electrical power dissipated or delivered", "power"),
    "q": ("electric charge", "charge"),
    "rho_res": ("resistivity of the material", "resistivity"),
    "emf": ("electromotive force of the cell", "voltage"),
    "V_term": ("terminal voltage of the cell", "voltage"),
    "r_int": ("internal resistance of the cell", "resistance"),
    "E_energy": ("electrical energy consumed", "energy"),
    "v_drift": ("drift velocity of electrons", "velocity"),
    "X_c": ("capacitive reactance", "resistance"),
    "X_l": ("inductive reactance", "resistance"),
    "Z_imp": ("impedance of the RLC circuit", "resistance"),
    "I_rms": ("rms current", "current"),
    "V_rms": ("rms voltage", "voltage"),
    "I_peak": ("peak current", "current"),
    "f_res": ("resonance frequency of the LC circuit", "frequency"),
    "L_ind": ("inductance of the coil", "inductance"),
    "C_cap": ("capacitance of the capacitor", "capacitance"),
    "V_s": ("secondary voltage of the transformer", "voltage"),
    "V_p": ("primary voltage of the transformer", "voltage"),
    "N_s": ("secondary turns of the transformer", "dimensionless"),
    "N_p": ("primary turns of the transformer", "dimensionless"),
    # ---- physics: electrostatics / magnetism ----
    "F_e": ("electrostatic force between the charges", "force"),
    "F_mag": ("magnetic force on the charge or wire", "force"),
    "E_field": ("electric field strength", "field_e"),
    "V_pot": ("electric potential", "voltage"),
    "k_e": ("Coulomb constant", "constant"),
    "B_field": ("magnetic field strength", "field_b"),
    "phi_e": ("electric flux", "flux"),
    "phi_b": ("magnetic flux", "flux"),
    "p_dip": ("electric dipole moment", "dipole"),
    "C1": ("first capacitance", "capacitance"),
    "C2": ("second capacitance", "capacitance"),
    "U_cap": ("energy stored in the capacitor", "energy"),
    "f_cyc": ("cyclotron frequency", "frequency"),
    "n_turn": ("turns per unit length of the solenoid", "dimensionless"),
    "N_turn": ("number of turns in the coil", "dimensionless"),
    "dphi_dt": ("rate of change of magnetic flux", "flux"),
    # ---- physics: optics / modern ----
    "P_dioptre": ("power of the lens in dioptres", "dioptricpower"),
    "f_m": ("focal length of the lens in metres", "length"),
    "inv_f": ("reciprocal of the focal length", "dimensionless"),
    "inv_v": ("reciprocal of the image distance", "dimensionless"),
    "inv_u": ("reciprocal of the object distance", "dimensionless"),
    "n_rel": ("refractive index of the medium", "dimensionless"),
    "c_light": ("speed of light in vacuum", "velocity"),
    "v_medium": ("speed of light in the medium", "velocity"),
    "beta_fringe": ("fringe width in Young's double slit experiment",
                    "length"),
    "D_screen": ("distance from slits to the screen", "length"),
    "d_slit": ("slit separation", "length"),
    "E_photon": ("energy of the photon", "energy"),
    "h_planck": ("Planck's constant", "constant"),
    "nu_freq": ("frequency of the photon", "frequency"),
    "phi_work": ("work function of the metal", "energy"),
    "KE_max": ("maximum kinetic energy of the photoelectron", "energy"),
    "E_n": ("energy of the nth Bohr orbit in electron volts", "energy"),
    "n_orbit": ("principal quantum number of the orbit", "dimensionless"),
    "lam_decay": ("decay constant", "frequency"),
    "t_half": ("half life of the radioactive sample", "time"),
    "N_t": ("number of undecayed nuclei remaining", "dimensionless"),
    "N0": ("initial number of nuclei", "dimensionless"),
    "BE_nuc": ("nuclear binding energy", "energy"),
    "E_rest": ("rest mass energy", "energy"),
    # ---- chemistry ----
    "m_mass": ("mass of the substance in grams", "mass"),
    "molar_m": ("molar mass of the substance", "molarmass"),
    "N_particles": ("number of particles", "dimensionless"),
    "N_avogadro": ("Avogadro's number", "constant"),
    "V_molar": ("molar volume of the gas at STP", "volume"),
    "M_molality": ("molarity of the solution", "molarity"),
    "molal": ("molality of the solution", "molality"),
    "V_litres": ("volume of the solution in litres", "volume"),
    "kg_solvent": ("mass of the solvent in kilograms", "mass"),
    "N_norm": ("normality of the solution", "normality"),
    "n_factor": ("n factor or basicity of the reagent", "dimensionless"),
    "M1": ("initial molarity before dilution", "molarity"),
    "M2": ("final molarity after dilution", "molarity"),
    "chi_A": ("mole fraction of component A", "dimensionless"),
    "dG": ("Gibbs free energy change", "energy"),
    "dH": ("enthalpy change of the reaction", "energy"),
    "dS": ("entropy change of the reaction", "entropy"),
    "K_eq": ("equilibrium constant of the reaction", "dimensionless"),
    "K_p": ("equilibrium constant in pressures", "dimensionless"),
    "K_c": ("equilibrium constant in concentrations", "dimensionless"),
    "pH": ("pH of the solution", "dimensionless"),
    "pOH": ("pOH of the solution", "dimensionless"),
    "pKa": ("negative log of the acid dissociation constant", "dimensionless"),
    "H_conc": ("hydrogen ion concentration", "concentration"),
    "k_rate": ("rate constant of the reaction", "rateconstant"),
    "a0": ("initial concentration of the reactant", "concentration"),
    "a_t": ("concentration of the reactant at time t", "concentration"),
    "Ea": ("activation energy of the reaction", "energy"),
    "A_factor": ("Arrhenius pre-exponential factor", "rateconstant"),
    "E_cell": ("cell potential of the galvanic cell", "voltage"),
    "E0_cell": ("standard cell potential", "voltage"),
    "n_elec": ("number of electrons transferred", "dimensionless"),
    "Q_react": ("reaction quotient", "dimensionless"),
    "F_faraday": ("Faraday constant", "constant"),
    "m_dep": ("mass deposited at the electrode", "mass"),
    "Q_charge": ("electric charge passed", "charge"),
    "dT_b": ("boiling point elevation", "tempdiff"),
    "dT_f": ("freezing point depression", "tempdiff"),
    "K_b": ("molal elevation constant", "cryoscopic"),
    "K_f": ("molal depression constant", "cryoscopic"),
    "i_vant": ("van't Hoff factor", "dimensionless"),
    "pi_osm": ("osmotic pressure of the solution", "pressure"),
    "rate1": ("diffusion rate of the first gas", "rate"),
    "rate2": ("diffusion rate of the second gas", "rate"),
    "P_total": ("total pressure of the gas mixture", "pressure"),
    "w_solute": ("mass of the solute", "mass"),
    "w_solvent": ("mass of the solvent", "mass"),
    # ---- commerce / CA ----
    "pmt": ("periodic payment of the annuity", "money"),
    "i_rate": ("interest rate per period as a decimal", "rate"),
    "n_per": ("number of periods", "dimensionless"),
    "fv_annuity": ("future value of the annuity", "money"),
    "pv_annuity": ("present value of the annuity", "money"),
    "cost": ("initial cost of the asset", "money"),
    "dep_rate": ("depreciation rate per year", "percentage"),
    "book_val": ("book value after depreciation", "money"),
    "n_yr": ("number of years", "time"),
    "eff_rate": ("effective annual interest rate", "percentage"),
    "nom_rate": ("nominal annual interest rate", "percentage"),
    "bep_units": ("break even quantity in units", "dimensionless"),
    "fixed_cost": ("total fixed cost", "money"),
    "price": ("selling price per unit", "money"),
    "var_cost": ("variable cost per unit", "money"),
    "eoq": ("economic order quantity", "dimensionless"),
    "demand": ("annual demand in units", "dimensionless"),
    "order_cost": ("cost per order", "money"),
    "hold_cost": ("holding cost per unit per year", "money"),
}

# Constants the binder should NEVER treat as unknowns to ask for
NON_TARGET_SYMBOLS = {
    "pi", "e", "G_const", "R_gas", "k_e", "k_B", "h_planck", "c_light",
    "eps0", "mu0", "sigma_sb", "N_avogadro", "F_faraday", "R_ryd",
    "I0_ref", "D_near", "e_charge", "m_e", "q_e",
}


# --------------------------------------------------------------------------- #
# Physical plausibility gates: impossible values kill a candidate even
# when the algebra is internally consistent (probability 5, speed 1e9).
# Cheap, deterministic, family-scoped.
# --------------------------------------------------------------------------- #

_FAMILY_RANGES = {
    "probability": (0.0, 1.0),
    "percentage": (0.0, 1000.0),
    "velocity": (0.0, 1e9),
    "length": (0.0, 1e15),
    "time": (0.0, 1e18),
    "current": (-1e6, 1e6),
    "molarity": (0.0, 1e4),
    "amount": (0.0, 1e6),
    "frequency": (0.0, 1e24),
    "dioptricpower": (-1e6, 1e6),
}


def plausible(symbol: str, family: str, value: float) -> bool:
    """Family-scoped plausibility check for a solved value."""
    import math as _math

    if value is None or not _math.isfinite(value):
        return False
    # trig slots are bounded in [-1, 1]
    if symbol.startswith(("sin", "cos")) and "_" in symbol:
        return -1.0 <= value <= 1.0
    rng = _FAMILY_RANGES.get(family)
    if rng:
        lo, hi = rng
        return lo <= value <= hi
    return True


def describe(symbol: str, eq_id: str = "") -> Tuple[str, str]:
    """(description, unit_family) for a symbol.

    Same symbol means different things in different equations
    ('r' = interest rate in finance, radius in geometry; 'a_' = side
    in Heron, coefficient in quadratics). Equation-level overrides
    resolve the collision; the base table holds the dominant meaning.
    """
    if eq_id and (eq_id, symbol) in EQ_VAR_OVERRIDES:
        return EQ_VAR_OVERRIDES[(eq_id, symbol)]
    if symbol in VARIABLE_INFO:
        return VARIABLE_INFO[symbol]
    words = symbol.replace("_", " ").strip()
    return (f"quantity {words}" if len(words) > 2 else f"quantity {symbol}",
            "dimensionless")


# (eq_id, symbol) -> (description, family) for cross-equation collisions
EQ_VAR_OVERRIDES = {
    ("math_circle_area", "r"): ("radius of the circle", "length"),
    ("math_circle_circumference", "r"): ("radius of the circle", "length"),
    ("math_cylinder_volume", "r"): ("radius of the cylinder base", "length"),
    ("math_cylinder_csa", "r"): ("radius of the cylinder base", "length"),
    ("math_cone_volume", "r"): ("radius of the cone base", "length"),
    ("math_sphere_volume", "r"): ("radius of the sphere", "length"),
    ("math_sphere_area", "r"): ("radius of the sphere", "length"),
    ("math_heron", "a_"): ("first side of the triangle", "length"),
    ("math_heron", "b_"): ("second side of the triangle", "length"),
    ("math_heron", "c_"): ("third side of the triangle", "length"),
    ("math_heron", "s_"): ("semi-perimeter of the triangle", "length"),
    ("math_heron_s", "a_"): ("first side of the triangle", "length"),
    ("math_heron_s", "b_"): ("second side of the triangle", "length"),
    ("math_heron_s", "c_"): ("third side of the triangle", "length"),
    ("math_trig_height_dist", "d_"): ("horizontal distance to the object",
                                      "length"),
    ("math_trig_height_dist", "h_"): ("height of the object", "length"),
    ("math_trig_sine_rule", "a_"): ("side a of the triangle", "length"),
    ("math_identity_sq1", "sq"): ("the expanded square expression",
                                  "dimensionless"),
    ("math_identity_sq2", "sq"): ("the expanded square expression",
                                  "dimensionless"),
    ("math_rectangle_area", "b"): ("breadth of the rectangle", "length"),
    ("math_rectangle_area", "l_"): ("length of the rectangle", "length"),
    ("math_cuboid_volume", "b"): ("breadth of the cuboid", "length"),
    ("math_cuboid_volume", "l_"): ("length of the cuboid", "length"),
    ("math_triangle_area", "b"): ("base of the triangle", "length"),
    ("math_triangle_area", "h"): ("height of the triangle", "length"),
    ("nl_impulse", "dt"): ("contact duration of the impulse", "time"),
    ("phy_pressure", "P"): ("pressure exerted", "pressure"),
    ("therm_newton_cool", "T0"): ("initial temperature of the object",
                                  "temperature"),
    ("therm_newton_cool", "T_room"): ("ambient room temperature",
                                      "temperature"),
    ("therm_newton_cool", "T_t"): ("temperature at time t", "temperature"),
    ("therm_newton_cool", "k_cool"): ("cooling constant", "frequency"),
    ("mod_bohr_radius", "q_e"): ("elementary charge", "charge"),
}


class _Embedder:
    """MiniLM singleton, same model as the routing layer."""

    _model = None
    _lock = threading.Lock()
    _failed = False

    @classmethod
    def get(cls):
        if cls._model is None and not cls._failed:
            with cls._lock:
                if cls._model is None and not cls._failed:
                    try:
                        import torch
                        torch.set_num_threads(1)
                        from sentence_transformers import SentenceTransformer
                        cls._model = SentenceTransformer("all-MiniLM-L6-v2")
                    except Exception:
                        cls._failed = True
        return cls._model


def embed_texts(texts: List[str]):
    """Normalized embedding matrix, or None when the model is missing."""
    model = _Embedder.get()
    if model is None:
        return None
    return model.encode(texts, normalize_embeddings=True)


@functools.lru_cache(maxsize=1)
def _var_symbol_pool() -> List[str]:
    return list(VARIABLE_INFO.keys())


@functools.lru_cache(maxsize=1)
def equation_description_vectors() -> Optional[dict]:
    """{eq_id: vector} for every canonical equation description."""
    from backend.its.solver.graph_loader import build_canonical_graph

    g, _ = build_canonical_graph()
    eq_ids = list(g.equations.keys())
    descs = [f"{g.equations[e].description} ({g.equations[e].subject})"
             for e in eq_ids]
    vecs = embed_texts(descs)
    if vecs is None:
        return None
    return dict(zip(eq_ids, vecs))


@functools.lru_cache(maxsize=256)
def variable_description_vector(symbol: str):
    """Cached embedding of a variable's description."""
    desc, _fam = describe(symbol)
    vecs = embed_texts([desc])
    return None if vecs is None else vecs[0]
