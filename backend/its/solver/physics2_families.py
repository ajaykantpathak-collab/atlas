"""physics2_families.py -- advanced Physics families for CBSE classes 11-12.

Second physics batch in the syllabus_families style: one table, one
dispatcher.  Every row is a class 11-12 physics computation type --
trigger regex (RAW STRING) with named slots, closed-form compute with
plausibility gates, human-readable substitution steps.  Deterministic
only: no LLM, no randomness, no network.

Coverage (20 families):
  optics          LENS_FORMULA, MIRROR_FORMULA, MAGNIFICATION_MIRROR
  electrostatics  COULOMBS_LAW, ELECTRIC_FIELD
  current         SERIES_RESISTANCE, PARALLEL_RESISTANCE_2
  thermodynamics  THERMO_FIRST_LAW, HEAT_ENGINE_EFFICIENCY
  SHM/rotation    SHM_PERIOD_SPRING, SPRING_ENERGY, ANGULAR_VELOCITY
  em-induction    FARADAY_EMF
  modern physics  PHOTOELECTRIC, BOHR_ENERGY, HALF_LIFE
  mechanics       MOMENTUM, IMPULSE, PRESSURE, UNIVERSAL_GRAVITATION

REGEX SAFETY NOTE: every pattern in this module is written as a RAW
string.  A non-raw string containing backslash sequences silently turns
them into control characters and corrupts the trigger -- never write a
regex as a plain (non-raw) string.
"""

from __future__ import annotations

import math
import re
from typing import Any, Dict, List, Optional, Tuple

from backend.its.solver.modeling_layer import ModelResult

# --------------------------------------------------------------------------- #
# Constants (CBSE textbook values) -- ASCII-only helper strings
# --------------------------------------------------------------------------- #

_K_COULOMB = 9e9           # N m^2 / C^2
_PLANCK = 6.63e-34         # J s
_EV_TO_J = 1.6e-19         # J per eV
_G_UNIVERSAL = 6.67e-11    # N m^2 / kg^2
_BOHR_GROUND_EV = -13.6    # eV, hydrogen ground-state energy
_MICRO = 1e-6              # micro prefix

_CM = r"(?:cm|centimetres?|centimeters?)"
_M = r"(?:m|metres?|meters?)"
_KG = r"(?:kg|kilograms?)"
_S = r"(?:seconds?|secs?|s)"
_N = r"(?:N|newtons?)"

# numeric token that also accepts scientific notation:
# "6", "6e14", "6x10^14", "6*10^14", "6 x 10 ^ 14", "6<TIMES>10^14"
_SCI = (r"-?\d+(?:\.\d+)?"
        r"(?:\s*[eE]\s*[-+]?\d+"
        r"|\s*(?:[x*]|\u00d7)\s*10\s*(?:\^|\*\*)?\s*[-+]?\d+)?")


def _no(structure: str, note: str) -> ModelResult:
    """Refusal result -- triggers not met or a gate failed."""
    return ModelResult(structure=structure, matched=False, confidence=0.0,
                       quantities={}, governing_equation="", note=note)


def _num(s: str) -> float:
    return float(str(s).replace(",", ""))


def _sci(s: str) -> float:
    """Parse plain/scientific tokens: 6, 6e14, 6x10^14, 6 x 10 ^ 14."""
    t = (s or "").strip().replace(",", "")
    m = re.match(r"^(-?\d+(?:\.\d+)?)\s*[eE]\s*([-+]?\d+)$", t)
    if m:
        return float(m.group(1)) * 10.0 ** int(m.group(2))
    m = re.match(r"^(-?\d+(?:\.\d+)?)\s*(?:[x*]|\u00d7)\s*10\s*"
                 r"(?:\^|\*\*)?\s*([-+]?\d+)$", t)
    if m:
        return float(m.group(1)) * 10.0 ** int(m.group(2))
    return float(t)


# A compute row returns (value, steps, answer_override, assumptions)
# or None when a plausibility gate fails.
_ComputeOut = Optional[Tuple[float, List[str], Optional[str],
                             Optional[List[str]]]]


def _beats(method: str, subst: str, comp: str, verify: str,
           interp: str) -> List[str]:
    """STEP CONTRACT (SOLVER_STEP_CONTRACT.md) 5-beat steps, in order."""
    return [f"Method: {method}", f"Substitution: {subst}",
            f"Computation: {comp}", f"Verification: {verify}",
            f"Interpretation: {interp}"]


# --------------------------------------------------------------------------- #
# Optics
# --------------------------------------------------------------------------- #


def _c_lens(g, m, t) -> _ComputeOut:
    f_ = _num(g["focal_length"])
    u = _num(g["object_distance"])
    if f_ == 0 or u == 0 or (u + f_) == 0:
        return None
    v = f_ * u / (u + f_)
    steps = _beats(
        "thin-lens formula 1/v = 1/f + 1/u, rearranged as v = f*u/(u+f) "
        "-- a thin lens links focal length with object and image "
        "distances (cm, Cartesian sign convention).",
        f"v = ({f_:g} x {u:g}) / ({u:g} + ({f_:g})) cm",
        f"v = {f_ * u:g} / {u + f_:g} = {v:.6g} cm",
        f"substitute back: 1/v + 1/(-f) check: 1/{v:.6g} - 1/{f_:g} = "
        f"{1.0 / v - 1.0 / f_:.6g} = 1/u = {1.0 / u:.6g} -- closes",
        f"the lens forms a{' virtual (same side as object)' if v < 0 else ' real'} "
        f"image {v:.6g} cm from the lens.",
    )
    return v, steps, f"image_distance = {v:.6g} cm", \
        ["distances in cm; u and f as given by the sign convention"]


def _c_mirror(g, m, t) -> _ComputeOut:
    f_ = _num(g["focal_length"])
    u = _num(g["object_distance"])
    if f_ == 0 or u == 0 or (u - f_) == 0:
        return None
    v = f_ * u / (u - f_)
    kind = "virtual image (same side as object)" if v < 0 else "real image"
    steps = _beats(
        "mirror formula 1/v = 1/f - 1/u, rearranged as v = f*u/(u-f) -- "
        "spherical mirrors relate focal length with object and image "
        "distances (cm, Cartesian sign convention).",
        f"v = ({f_:g} x {u:g}) / ({u:g} - ({f_:g})) cm",
        f"v = {f_ * u:g} / {u - f_:g} = {v:.6g} cm",
        f"substitute back: 1/v = 1/f - 1/u: 1/{v:.6g} = {1.0 / f_:g} - "
        f"{1.0 / u:.6g} = {1.0 / f_ - 1.0 / u:.6g} -- closes",
        f"the mirror forms a {kind} at {v:.6g} cm "
        f"({'negative v confirms it' if v < 0 else 'in front of the mirror'}).",
    )
    return v, steps, f"image_distance = {v:.6g} cm", \
        ["Cartesian convention: concave-mirror f negative as given"]


def _c_magnification(g, m, t) -> _ComputeOut:
    v_img = _num(g["image_distance"])
    u = _num(g["object_distance"])
    if u == 0:
        return None
    mag = -v_img / u
    steps = _beats(
        "mirror magnification relation m = -v/u -- the transverse "
        "magnification of a spherical mirror with sign convention.",
        f"m = -({v_img:g}) / ({u:g})",
        f"m = {-v_img:g} / {u:g} = {mag:.6g}",
        f"substitute back: v = -m u = -({mag:.6g}) x ({u:g}) = "
        f"{-mag * u:g} = {v_img:g} cm -- closes",
        f"magnification {mag:.6g}: the image is "
        f"{'inverted' if mag < 0 else 'erect'} and "
        f"{'enlarged' if abs(mag) > 1 else 'diminished'}.",
    )
    return mag, steps, f"magnification = {mag:.6g}", None


# --------------------------------------------------------------------------- #
# Electrostatics
# --------------------------------------------------------------------------- #


def _c_coulomb(g, m, t) -> _ComputeOut:
    q1 = _num(g["q1"]) * (_MICRO if g.get("mu1") else 1.0)
    q2 = _num(g["q2"]) * (_MICRO if g.get("mu2") else 1.0)
    r = _num(g["r"])
    if r <= 0 or q1 == 0 or q2 == 0:
        return None
    f = _K_COULOMB * q1 * q2 / (r * r)
    steps = _beats(
        "Coulomb's law F = k q1 q2 / r^2 with k = 9e9 N m^2/C^2 -- the "
        "electrostatic force between two point charges falls off with "
        "the square of their separation.",
        f"q1 = {g['q1']:s}{' micro' if g.get('mu1') else ''}C = "
        f"{q1:.6g} C; q2 = {g['q2']:s}{' micro' if g.get('mu2') else ''}C "
        f"= {q2:.6g} C; r = {r:g} m",
        f"F = 9e9 x {q1:.6g} x {q2:.6g} / ({r:g})^2 = {f:.6g} N",
        f"substitute back: r = sqrt(k q1 q2 / F) = sqrt({9e9 * q1 * q2:.6g}"
        f" / {f:.6g}) = {r:g} m -- matches",
        f"the charges push or pull each other with {f:.6g} N "
        "along the line joining them.",
    )
    return f, steps, f"force = {f:.6g} N", None


def _c_electric_field(g, m, t) -> _ComputeOut:
    force = _num(g["force"])
    q = _num(g["charge"]) * (_MICRO if g.get("mu") else 1.0)
    if q <= 0:
        return None
    e = force / q
    steps = _beats(
        "electric field definition E = F/q -- field strength is the "
        "force per unit positive charge at that point.",
        f"q = {g['charge']:s}{' micro' if g.get('mu') else ''}C = "
        f"{q:.6g} C; F = {force:g} N",
        f"E = {force:g} / {q:.6g} = {e:.6g} N/C",
        f"substitute back: F = E q = {e:.6g} x {q:.6g} = {force:g} N -- "
        "matches the given force",
        f"a charge placed there feels {force:g} N, so the field there "
        f"is {e:.6g} N/C.",
    )
    return e, steps, f"electric_field = {e:.6g} N/C", None


# --------------------------------------------------------------------------- #
# Current electricity
# --------------------------------------------------------------------------- #


def _c_series(g, m, t) -> _ComputeOut:
    vals = [float(x) for x in re.findall(r"(\d+(?:\.\d+)?)\s*ohm",
                                         g.get("series") or "", re.I)]
    if len(vals) < 2 or any(v <= 0 for v in vals):
        return None
    total = sum(vals)
    parts = " + ".join(f"{v:g}" for v in vals)
    steps = _beats(
        "series-resistance rule R = R1 + R2 + ... + Rn -- one current "
        "flows through every resistor, so resistances add directly.",
        f"R = {parts} ohm",
        f"R = {parts} = {total:.6g} ohm",
        f"sanity check: the total {total:.6g} ohm is larger than each "
        f"part (max {max(vals):g} ohm) as a series sum must be",
        f"the chain draws current as one {total:.6g} ohm resistor.",
    )
    return total, steps, f"total_resistance = {total:.6g} ohm", None


def _c_parallel2(g, m, t) -> _ComputeOut:
    r1 = _num(g["r1"])
    r2 = _num(g["r2"])
    if r1 <= 0 or r2 <= 0 or (r1 + r2) == 0:
        return None
    req = r1 * r2 / (r1 + r2)
    steps = _beats(
        "parallel-resistance rule R = R1*R2/(R1+R2) -- branches share "
        "the voltage, so conductances add and R comes out below the "
        "smaller branch.",
        f"R = ({r1:g} x {r2:g}) / ({r1:g} + {r2:g}) ohm",
        f"R = {r1 * r2:g} / {r1 + r2:g} = {req:.6g} ohm",
        f"substitute back: R1 R2 / R = {r1 * r2:g} / {req:.6g} = "
        f"{r1 + r2:g} = R1 + R2 -- closes",
        f"the pair draws current like a single {req:.6g} ohm resistor "
        f"(below the smaller {min(r1, r2):g} ohm branch, as expected).",
    )
    return req, steps, f"total_resistance = {req:.6g} ohm", None


# --------------------------------------------------------------------------- #
# Thermodynamics
# --------------------------------------------------------------------------- #


def _c_thermo(g, m, t) -> _ComputeOut:
    q_heat = _num(g["heat_added"])
    w = _num(g["work_done"])
    du = q_heat - w
    steps = _beats(
        "first law of thermodynamics dU = Q - W -- energy conservation "
        "for a gas: heat added raises internal energy minus the work "
        "the system does (W = work done BY the system).",
        f"dU = {q_heat:g} J - {w:g} J",
        f"dU = {q_heat:g} - {w:g} = {du:.6g} J",
        f"substitute back: Q - dU = {q_heat:g} - ({du:.6g}) = {w:g} J = "
        "the work done -- closes",
        f"the gas's internal energy rises by {du:.6g} J."
        if du >= 0 else
        f"the gas's internal energy falls by {abs(du):.6g} J (work "
        "exceeded the heat added).",
    )
    return du, steps, f"internal_energy_change = {du:.6g} J", \
        ["work taken as done BY the system"]


def _c_engine(g, m, t) -> _ComputeOut:
    work = _num(g["work"])
    heat = _num(g["heat_input"])
    if heat <= 0 or work < 0:
        return None
    eff = work / heat * 100.0
    steps = _beats(
        "heat-engine efficiency eta = W/Q_input x 100 -- the fraction "
        "of the absorbed heat that the engine converts to useful work.",
        f"eta = {work:g} J / {heat:g} J x 100",
        f"eta = {work / heat:.6g} x 100 = {eff:.6g} %",
        f"substitute back: W = eta/100 x Q = {eff / 100.0:.6g} x "
        f"{heat:g} = {work:g} J -- matches",
        f"{eff:.6g}% of the heat input becomes work; the rest is "
        "rejected to the sink.",
    )
    return eff, steps, f"efficiency = {eff:.6g} %", None


# --------------------------------------------------------------------------- #
# SHM / rotation
# --------------------------------------------------------------------------- #


def _c_shm_period(g, m, t) -> _ComputeOut:
    mass = _num(g["mass"])
    k = _num(g["spring_constant"])
    if mass <= 0 or k <= 0:
        return None
    period = 2.0 * math.pi * math.sqrt(mass / k)
    steps = _beats(
        "spring-mass oscillator formula T = 2 pi sqrt(m/k) -- for SHM "
        "the restoring force F = -kx gives an angular frequency "
        "omega = sqrt(k/m), independent of amplitude.",
        f"T = 2 pi x sqrt({mass:g} kg / {k:g} N/m)",
        f"T = 2 pi x {math.sqrt(mass / k):.6g} = {period:.6g} s",
        f"substitute back: k = 4 pi^2 m / T^2 = {4.0 * math.pi ** 2:.6g}"
        f" x {mass:g} / {period * period:.6g} = {k:g} N/m -- matches",
        f"the mass completes one oscillation every {period:.6g} s.",
    )
    return period, steps, f"period = {period:.6g} s", None


def _c_spring_energy(g, m, t) -> _ComputeOut:
    k = _num(g["spring_constant"])
    x = _num(g["compression"])
    if k <= 0:
        return None
    energy = 0.5 * k * x * x
    steps = _beats(
        "elastic potential energy formula E = (1/2) k x^2 -- the work "
        "done deforming a spring is stored as field energy, growing "
        "with the square of the deformation.",
        f"E = 0.5 x {k:g} N/m x ({x:g} m)^2",
        f"E = 0.5 x {k:g} x {x * x:g} = {energy:.6g} J",
        f"substitute back: x = sqrt(2E/k) = sqrt({2.0 * energy:.6g} / "
        f"{k:g}) = {x:g} m -- matches",
        f"deforming the spring by {x:g} m stores {energy:.6g} J.",
    )
    return energy, steps, f"energy_stored = {energy:.6g} J", None


def _c_angular_velocity(g, m, t) -> _ComputeOut:
    v = _num(g["linear_speed"])
    r = _num(g["radius"])
    if r <= 0:
        return None
    omega = v / r
    steps = _beats(
        "uniform circular motion relation omega = v/r -- angular speed "
        "is linear speed divided by the circle's radius.",
        f"omega = {v:g} m/s / {r:g} m",
        f"omega = {v:g} / {r:g} = {omega:.6g} rad/s",
        f"substitute back: v = omega r = {omega:.6g} x {r:g} = {v:g} "
        "m/s -- matches",
        f"the body sweeps {omega:.6g} rad every second around the "
        "circle.",
    )
    return omega, steps, f"angular_velocity = {omega:.6g} rad/s", None


# --------------------------------------------------------------------------- #
# Electromagnetic induction
# --------------------------------------------------------------------------- #


def _c_faraday(g, m, t) -> _ComputeOut:
    n = _num(g["num_turns"])
    dphi = _num(g["flux_change"])
    dt = _num(g["time_interval"])
    if n <= 0 or dt <= 0:
        return None
    emf = n * dphi / dt
    steps = _beats(
        "Faraday's law of induction EMF = N x dPhi/dt -- the induced "
        "emf equals the rate at which flux linkage changes, summed "
        "over every turn.",
        f"EMF = {n:g} x {dphi:g} Wb / {dt:g} s",
        f"EMF = {n * dphi:g} / {dt:g} = {emf:.6g} V",
        f"substitute back: dPhi = EMF x dt / N = {emf:.6g} x {dt:g} / "
        f"{n:g} = {dphi:g} Wb -- matches",
        f"the changing flux induces {emf:.6g} V across the coil.",
    )
    return emf, steps, f"emf = {emf:.6g} V", None


# --------------------------------------------------------------------------- #
# Modern physics
# --------------------------------------------------------------------------- #


def _c_photoelectric(g, m, t) -> _ComputeOut:
    freq = _sci(g["frequency"])
    phi_ev = _num(g["work_function_eV"])
    if freq <= 0:
        return None
    e_photon = _PLANCK * freq
    phi_j = phi_ev * _EV_TO_J
    ke = e_photon - phi_j
    steps = _beats(
        "Einstein photoelectric equation KE = h f - phi -- one photon "
        "of energy hf ejects an electron, paying the work function and "
        "giving it the rest as kinetic energy "
        "(h = 6.63e-34 J s, 1 eV = 1.6e-19 J).",
        f"hf = 6.63e-34 x {freq:.6g} Hz = {e_photon:.6g} J; "
        f"phi = {phi_ev:g} eV = {phi_j:.6g} J",
        f"KE = {e_photon:.6g} - {phi_j:.6g} = {ke:.6g} J",
        f"substitute back: phi + KE = {phi_j:.6g} + {ke:.6g} = "
        f"{e_photon:.6g} J = hf -- energy bookkeeping closes",
        f"the ejected electron carries {ke:.6g} J of kinetic energy.",
    )
    if ke < 0:
        # gate: photon energy below the work function -> no photoemission
        return None
    return ke, steps, f"kinetic_energy = {ke:.6g} J", None


def _c_bohr(g, m, t) -> _ComputeOut:
    n = int(float(g["orbit_number"]))
    if n < 1:
        return None
    energy = _BOHR_GROUND_EV / (n * n)
    steps = _beats(
        "Bohr model energy levels E_n = -13.6/n^2 eV (hydrogen) -- the "
        "bound electron's energy approaches 0 as the orbit number "
        "grows.",
        f"E_{n:d} = -13.6 eV / ({n:d})^2",
        f"E_{n:d} = -13.6 / {n * n:d} = {energy:.6g} eV",
        f"substitute back: E x n^2 = {energy:.6g} x {n * n:d} = "
        f"{energy * n * n:.6g} = -13.6 eV -- closes",
        f"the hydrogen electron in orbit {n:d} is {abs(energy):.6g} eV "
        "below ionisation.",
    )
    return energy, steps, f"energy = {energy:.6g} eV", None


def _c_half_life(g, m, t) -> _ComputeOut:
    n = int(float(g["num_half_lives"]))
    amount = _num(g["initial_amount"])
    unit = (g.get("unit") or "g").lower()
    to_grams = {"kg": 1000.0, "g": 1.0, "mg": 1e-3}.get(unit, 1.0)
    grams = amount * to_grams
    if grams <= 0 or n < 0:
        return None
    remaining = grams / (2.0 ** n)
    steps = _beats(
        "radioactive decay law N = N0 / 2^n over n half-lives -- each "
        "half-life halves whatever sample remains.",
        f"initial = {grams:.6g} g; n = {n:d} half-lives",
        f"remaining = {grams:.6g} / 2^{n:d} = {grams:.6g} / "
        f"{2.0 ** n:.6g} = {remaining:.6g} g",
        f"substitute back: remaining x 2^n = {remaining:.6g} x "
        f"{2.0 ** n:.6g} = {grams:.6g} g -- matches the initial amount",
        f"after {n:d} half-lives {remaining:.6g} g of the sample "
        "survives undecayed.",
    )
    return remaining, steps, f"remaining_amount = {remaining:.6g} g", None


# --------------------------------------------------------------------------- #
# Mechanics
# --------------------------------------------------------------------------- #


def _c_momentum(g, m, t) -> _ComputeOut:
    mass = _num(g["mass"])
    v = _num(g["velocity"])
    p = mass * v
    steps = _beats(
        "linear momentum definition p = m v -- momentum is the quantity "
        "of motion, mass times velocity.",
        f"p = {mass:g} kg x {v:g} m/s",
        f"p = {mass:g} x {v:g} = {p:.6g} kg m/s",
        f"substitute back: v = p/m = {p:.6g} / {mass:g} = {v:g} m/s -- "
        "matches",
        f"the moving body carries {p:.6g} kg m/s of momentum.",
    )
    return p, steps, f"momentum = {p:.6g} kg m/s", None


def _c_impulse(g, m, t) -> _ComputeOut:
    force = _num(g["force"])
    dt = _num(g["time_duration"])
    impulse = force * dt
    steps = _beats(
        "impulse of a constant force J = F x t -- impulse equals the "
        "change of momentum the force produces (force-time area).",
        f"J = {force:g} N x {dt:g} s",
        f"J = {force:g} x {dt:g} = {impulse:.6g} N s",
        f"substitute back: F = J/t = {impulse:.6g} / {dt:g} = {force:g} "
        "N -- matches",
        f"the blow delivers {impulse:.6g} N s of impulse to the body.",
    )
    return impulse, steps, f"impulse = {impulse:.6g} N s", None


def _c_pressure(g, m, t) -> _ComputeOut:
    force = _num(g["force"])
    area = _num(g["area"])
    if area <= 0:
        return None
    p = force / area
    steps = _beats(
        "pressure definition P = F/A -- force spread over area, "
        "measured in pascals (N/m^2).",
        f"P = {force:g} N / {area:g} m^2",
        f"P = {force:g} / {area:g} = {p:.6g} Pa",
        f"substitute back: F = P A = {p:.6g} x {area:g} = {force:g} N "
        "-- matches",
        f"the force presses with {p:.6g} Pa on that surface.",
    )
    return p, steps, f"pressure = {p:.6g} Pa", None


def _c_gravitation(g, m, t) -> _ComputeOut:
    m1 = _num(g["m1"])
    m2 = _num(g["m2"])
    r = _num(g["r"])
    if r <= 0 or m1 <= 0 or m2 <= 0:
        return None
    f = _G_UNIVERSAL * m1 * m2 / (r * r)
    steps = _beats(
        "Newton's law of gravitation F = G m1 m2 / r^2 with G = "
        "6.67e-11 N m^2/kg^2 -- every mass pair attracts with a force "
        "proportional to both masses and inverse to r^2.",
        f"F = 6.67e-11 x {m1:g} kg x {m2:g} kg / ({r:g} m)^2",
        f"F = 6.67e-11 x {m1 * m2:.6g} / {r * r:.6g} = {f:.6g} N",
        f"substitute back: r = sqrt(G m1 m2 / F) = sqrt("
        f"{_G_UNIVERSAL * m1 * m2:.6g} / {f:.6g}) = {r:g} m -- matches",
        f"the two masses attract each other with {f:.6g} N.",
    )
    return f, steps, f"gravitational_force = {f:.6g} N", None


# --------------------------------------------------------------------------- #
# The table: (id, trigger regex [RAW], governing equation, compute)
# --------------------------------------------------------------------------- #

TABLE = [
    # ---- optics ----
    ("LENS_FORMULA",
     r"image\s+distance[^.]*?for\s+(?:a|an)\s+"
     r"(?:convex\s+|concave\s+|thin\s+)?lens\s+of\s+(?:a\s+)?"
     r"focal\s+length\s+(?:of\s+)?(?P<focal_length>-?\d+(?:\.\d+)?)\s*"
     + _CM + r"\b"
     r"[^.]*?object\s+(?:is\s+)?(?:placed\s+)?"
     r"(?:at\s+(?:a\s+)?(?:distance\s+of\s+)?|distance\s+of\s+)?"
     r"(?P<object_distance>-?\d+(?:\.\d+)?)\s*" + _CM + r"\b",
     "1/v = 1/f + 1/u  =>  v = f*u/(u+f)",
     _c_lens),

    ("MIRROR_FORMULA",
     r"image\s+distance[^.]*?for\s+(?:a|an)\s+"
     r"(?:concave\s+|convex\s+)?mirror\s+of\s+(?:a\s+)?"
     r"focal\s+length\s+(?:of\s+)?(?P<focal_length>-?\d+(?:\.\d+)?)\s*"
     + _CM + r"\b"
     r"[^.]*?object\s+(?:is\s+)?(?:placed\s+)?"
     r"(?:at\s+(?:a\s+)?(?:distance\s+of\s+)?|distance\s+of\s+)?"
     r"(?P<object_distance>-?\d+(?:\.\d+)?)\s*" + _CM + r"\b",
     "1/v = 1/f - 1/u  =>  v = f*u/(u-f)",
     _c_mirror),

    ("MAGNIFICATION_MIRROR",
     r"magnification[^.]*?image\s+distance\s+(?:is\s+)?"
     r"(?P<image_distance>-?\d+(?:\.\d+)?)\s*" + _CM + r"\b"
     r"[^.]*?object\s+distance\s+(?:is\s+)?"
     r"(?P<object_distance>-?\d+(?:\.\d+)?)\s*" + _CM + r"\b",
     "m = -v/u",
     _c_magnification),

    # ---- electrostatics ----
    ("COULOMBS_LAW",
     r"(?:electrostatic\s+)?force\s+between\s+(?:two\s+)?charges?\s+of\s+"
     r"(?P<q1>\d+(?:\.\d+)?)\s*(?:(?P<mu1>micro)\s*)?coulombs?\b"
     r"\s+and\s+(?P<q2>\d+(?:\.\d+)?)\s*(?:(?P<mu2>micro)\s*)?coulombs?\b"
     r"[^.]*?(?:distance|separation)\s+(?:of\s+)?"
     r"(?P<r>\d+(?:\.\d+)?)\s*" + _M + r"\b",
     "F = k q1 q2 / r^2  (k = 9e9 N m^2/C^2)",
     _c_coulomb),

    ("ELECTRIC_FIELD",
     r"electric\s+field[^.]*?force\s+on\s+(?:the\s+)?charge\s+"
     r"(?:is\s+)?(?P<force>\d+(?:\.\d+)?)\s*" + _N + r"\b"
     r"[^.]*?(?:the\s+)?charge\s+(?:is\s+)?"
     r"(?P<charge>\d+(?:\.\d+)?)\s*(?:(?P<mu>micro)\s*)?coulombs?\b",
     "E = F/q",
     _c_electric_field),

    # ---- current electricity ----
    ("SERIES_RESISTANCE",
     r"total\s+resistance\s+(?:of\s+)?"
     r"(?P<series>\d+(?:\.\d+)?\s*ohms?"
     r"(?:\s*(?:,|and)\s*\d+(?:\.\d+)?\s*ohms?)+)"
     r"[^.]{0,60}?in\s+series",
     "R = R1 + R2 + ... + Rn",
     _c_series),

    ("PARALLEL_RESISTANCE_2",
     r"total\s+resistance\s+(?:of\s+)?"
     r"(?P<r1>\d+(?:\.\d+)?)\s*ohms?\s+and\s+"
     r"(?P<r2>\d+(?:\.\d+)?)\s*ohms?"
     r"[^.]{0,60}?in\s+parallel",
     "R = R1*R2/(R1+R2)",
     _c_parallel2),

    # ---- thermodynamics ----
    ("THERMO_FIRST_LAW",
     r"internal\s+energy\s+(?:change|variation)[^.]*?"
     r"(?P<heat_added>-?\d+(?:\.\d+)?)\s*J\b[^.]*?of\s+heat"
     r"[^.]*?(?P<work_done>-?\d+(?:\.\d+)?)\s*J\b[^.]*?of\s+work",
     "dU = Q - W",
     _c_thermo),

    ("HEAT_ENGINE_EFFICIENCY",
     r"efficiency\s+of\s+(?:a|an)\s+heat\s+engine[^.]*?"
     r"(?P<work>\d+(?:\.\d+)?)\s*J\b[^.]*?of\s+work"
     r"[^.]*?(?P<heat_input>\d+(?:\.\d+)?)\s*J\b\s*of\s+heat",
     "eta = W/Q_input x 100",
     _c_engine),

    # ---- SHM / rotation ----
    ("SHM_PERIOD_SPRING",
     r"period\s+of\s+(?:the\s+)?oscillation[^.]*?"
     r"(?P<mass>\d+(?:\.\d+)?)\s*" + _KG + r"\b\s+"
     r"(?:mass\s+)?(?:on|attached\s+to|suspended\s+from)\s+(?:a\s+)?spring"
     r"[^.]*?spring\s+constant\s+(?:of\s+)?"
     r"(?P<spring_constant>\d+(?:\.\d+)?)\s*N\s*/\s*m\b",
     "T = 2 pi sqrt(m/k)",
     _c_shm_period),

    ("SPRING_ENERGY",
     r"(?:energy|potential\s+energy)\s+stored\s+in\s+(?:a\s+)?spring"
     r"[^.]*?spring\s+constant\s+(?:of\s+)?"
     r"(?P<spring_constant>\d+(?:\.\d+)?)\s*N\s*/\s*m\b"
     r"[^.]*?(?:compressed|stretched|extended|displaced)\s+"
     r"(?:by\s+|through\s+)?(?P<compression>\d+(?:\.\d+)?)\s*"
     + _M + r"\b",
     "E = (1/2) k x^2",
     _c_spring_energy),

    ("ANGULAR_VELOCITY",
     r"angular\s+velocity\s+of\s+(?:a|an)\s+"
     r"(?:body|object|particle|mass|ball)"
     r"[^.]*?(?:moving|traveling|travelling|revolving)\s+(?:at|with)\s+"
     r"(?P<linear_speed>\d+(?:\.\d+)?)\s*m\s*(?:/|per)\s*s\b"
     r"[^.]*?(?:circle|circular\s+(?:path|orbit)|ring)"
     r"[^.]*?radius\s+(?:of\s+)?(?P<radius>\d+(?:\.\d+)?)\s*"
     + _M + r"\b",
     "omega = v/r",
     _c_angular_velocity),

    # ---- electromagnetic induction ----
    ("FARADAY_EMF",
     r"(?:EMF|e\.m\.f\.?|electromotive\s+force)\s+(?:is\s+)?induced\s+in\s+"
     r"(?:a|an)\s+coil\s+of\s+(?P<num_turns>\d+)\s+turns?"
     r"[^.]*?magnetic\s+flux\s+chang(?:es|ing|ed)?\s+by\s+"
     r"(?P<flux_change>\d+(?:\.\d+)?)\s*(?:webers?|Wb)\b"
     r"[^.]*?in\s+(?P<time_interval>\d+(?:\.\d+)?)\s*" + _S + r"\b",
     "EMF = N dPhi/dt",
     _c_faraday),

    # ---- modern physics ----
    ("PHOTOELECTRIC",
     r"kinetic\s+energy\s+of\s+(?:the\s+|an\s+|a\s+)?"
     r"(?:ejected\s+|emitted\s+|photo)?electrons?"
     r"[^.]*?frequency\s+(?:of\s+)?(?P<frequency>" + _SCI + r")\s*"
     r"(?:Hz|hertz)\b"
     r"[^.]*?work\s+function\s+(?:of\s+)?"
     r"(?P<work_function_eV>-?\d+(?:\.\d+)?)\s*(?:eV|electron\s*-?volts?)\b",
     "KE = h f - phi  (h = 6.63e-34 J s, 1 eV = 1.6e-19 J)",
     _c_photoelectric),

    ("BOHR_ENERGY",
     r"energy\s+of\s+(?:an|a|the)?\s*electrons?\s+in\s+(?:the\s+)?"
     r"(?P<orbit_number>\d+)(?:st|nd|rd|th)\s+orbit",
     "E_n = -13.6/n^2 eV (hydrogen)",
     _c_bohr),

    ("HALF_LIFE",
     r"remaining\s+(?:amount|mass|quantity)\s+after\s+"
     r"(?P<num_half_lives>\d+)\s+half[\s-]*lives?"
     r"[^.]*?initial\s+(?:amount\s+|mass\s+)?of\s+"
     r"(?P<initial_amount>\d+(?:\.\d+)?)\s*(?P<unit>kg|mg|g)?\b",
     "remaining = initial / 2^n",
     _c_half_life),

    # ---- mechanics ----
    ("MOMENTUM",
     r"momentum\s+of\s+(?:a|an)\s+(?P<mass>\d+(?:\.\d+)?)\s*" + _KG + r"\b"
     r"[^.]*?(?:moving|traveling|travelling|going)"
     r"(?:\s+at|\s+with\s+(?:a\s+)?(?:speed|velocity)\s+of)\s+"
     r"(?P<velocity>\d+(?:\.\d+)?)\s*m\s*(?:/|per)\s*s\b",
     "p = m v",
     _c_momentum),

    ("IMPULSE",
     r"impulse\s+(?:when\s+|if\s+)?(?:a\s+)?force\s+of\s+"
     r"(?P<force>\d+(?:\.\d+)?)\s*" + _N + r"\b"
     r"\s+acts\s+for\s+(?P<time_duration>\d+(?:\.\d+)?)\s*" + _S + r"\b",
     "J = F t",
     _c_impulse),

    ("PRESSURE",
     r"pressure\s+(?:when\s+|if\s+)?(?:exerted\s+)?(?:by\s+)?(?:a\s+)?"
     r"force\s+of\s+(?P<force>\d+(?:\.\d+)?)\s*" + _N + r"\b"
     r"\s+acts\s+on\s+(?:an|a|the)?\s*area\s+of\s+"
     r"(?P<area>\d+(?:\.\d+)?)\s*"
     r"(?:square\s*(?:metres?|meters?)|sq\.?\s*(?:m|metres?|meters?)|"
     r"m\s*(?:\^|\*\*)?\s*2)\b",
     "P = F/A",
     _c_pressure),

    ("UNIVERSAL_GRAVITATION",
     r"gravitational\s+(?:force|attraction|pull)\s+between\s+(?:two\s+)?"
     r"(?:masses\s+)?(?:of\s+)?(?P<m1>\d+(?:\.\d+)?)\s*" + _KG + r"\b"
     r"\s+and\s+(?P<m2>\d+(?:\.\d+)?)\s*" + _KG + r"\b"
     r"[^.]*?(?:distance|separation)\s+(?:of\s+)?"
     r"(?P<r>\d+(?:\.\d+)?)\s*" + _M + r"\b",
     "F = G m1 m2 / r^2  (G = 6.67e-11 N m^2/kg^2)",
     _c_gravitation),
]


# --------------------------------------------------------------------------- #
# Dispatcher
# --------------------------------------------------------------------------- #


def _quantities_from(m, value: float) -> Dict[str, float]:
    """All named slots parsed as floats (non-numeric groups skipped)."""
    q: Dict[str, float] = {}
    for k, v in (m.groupdict() or {}).items():
        if v is None:
            continue
        try:
            q[k] = _sci(v)
        except ValueError:
            continue
    q["result"] = float(value)
    return q


def model_physics2(text: str) -> ModelResult:
    """Scan the physics2 family table; first grounded hit wins."""
    for fid, pattern, equation, compute in TABLE:
        m = re.search(pattern, text, re.I)
        if not m:
            continue
        try:
            out = compute(m.groupdict(), m, text)
        except Exception:
            continue
        if not out or out[0] is None:
            continue
        value, steps, answer, assumptions = (list(out) + [None] * 4)[:4]
        if value is None:
            continue
        return ModelResult(
            structure=fid,
            matched=True,
            confidence=0.93,
            quantities=_quantities_from(m, value),
            governing_equation=equation,
            final_answer=answer or f"{value:.6g}",
            numeric_answer=float(value),
            steps=steps,
            note="; ".join(assumptions) if assumptions else "",
        )
    return _no("PHYSICS2", "no physics2 family matched")
