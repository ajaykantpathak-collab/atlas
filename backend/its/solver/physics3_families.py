"""physics3_families.py -- remaining Physics gap families, classes 11-12 CBSE.

Third physics batch, in the physics2_families style: one TABLE, one
dispatcher (model_physics3).  Every row is a class 11-12 physics
computation type -- trigger regex (RAW STRING) with named slots,
closed-form compute with plausibility gates, human-readable
substitution steps.  Deterministic only: regex extraction + closed
form, zero LLM calls.

Coverage (15 families):
  optics          SNELLS_LAW, CRITICAL_ANGLE, PRISM_DEVIATION, POWER_LENS
  modern physics  DE_BROGLIE, RADIOACTIVE_DECAY
  electrostatics  ELECTRIC_POTENTIAL, CAPACITANCE,
                  CAPACITORS_SERIES, CAPACITORS_PARALLEL
  circuits        KIRCHHOFF_CURRENT, WHEATSTONE_BALANCED, RESISTIVITY
  magnetism       MAGNETIC_FIELD, FORCE_ON_CONDUCTOR

Numeric slots accept plain decimals AND the scientific-notation forms
students actually type: 0.5, 2e-6, 2 x 10^-6, 10^6.

REGEX SAFETY NOTE: every pattern in this module is written as a RAW
string.  A non-raw string containing backslash sequences silently
turns them into control characters and corrupts the trigger -- never
write a regex as a plain (non-raw) string.
"""

from __future__ import annotations

import math
import re
from typing import Any, Dict, List, Optional, Tuple

from backend.its.solver import unit_registry as _ureg
from backend.its.solver.modeling_layer import ModelResult

_CONF = 0.95

# --------------------------------------------------------------------------- #
# Constants (CBSE textbook values)
# --------------------------------------------------------------------------- #

_K_COULOMB = 9.0e9            # N m^2 / C^2
_PLANCK = 6.63e-34            # J s
_MU0 = 4.0 * math.pi * 1e-7   # T m / A
_MICRO = 1e-6

_PARTICLE_MASS_KG = {"electron": 9.11e-31, "proton": 1.67e-27,
                     "neutron": 1.67e-27, "alpha": 6.68e-27}

# refractive indices for the media named in board questions
_MEDIA_N = {"air": 1.0, "vacuum": 1.0, "water": 1.33, "glass": 1.5,
            "diamond": 2.42, "ice": 1.31, "kerosene": 1.44,
            "quartz": 1.46, "turpentine": 1.47}

# --------------------------------------------------------------------------- #
# Numeric helpers
# --------------------------------------------------------------------------- #

_NUM = r"\d+(?:\.\d+)?"

# plain / 2e-6 / 2 x 10^-6 / 10^6  (the bare 10^... branch must come
# before the plain-decimal branch so "10^6" is not eaten as "10")
_SCI = (r"-?(?:"
        + _NUM + r"\s*(?:[x*]|\u00d7)\s*10\s*(?:\^|\*\*)?\s*[-+]?\d+"
        r"|" + _NUM + r"\s*[eE]\s*[-+]?\d+"
        r"|10(?!\d)\s*(?:\^|\*\*)?\s*[-+]?\d+"
        r"|" + _NUM + r")")

_CM_M = r"(?:cm|centimetres?|centimeters?|m|metres?|meters?)"

_ComputeOut = Optional[Tuple[float, List[str], Optional[str],
                             Optional[List[str]]]]


def _beats(method: str, subst: str, comp: str, verify: str,
           interp: str) -> List[str]:
    """STEP CONTRACT (SOLVER_STEP_CONTRACT.md) 5-beat steps, in order."""
    return [f"Method: {method}", f"Substitution: {subst}",
            f"Computation: {comp}", f"Verification: {verify}",
            f"Interpretation: {interp}"]


def _no(structure: str, note: str) -> ModelResult:
    return ModelResult(structure=structure, matched=False, confidence=0.0,
                       quantities={}, governing_equation="", note=note)


def _num(s: str) -> float:
    return float(str(s).replace(",", ""))


def _sci(s: str) -> float:
    """Parse plain/scientific tokens: 0.5, 2e-6, 2 x 10^-6, 10^6."""
    t = (s or "").strip().replace(",", "").replace("\u00d7", "x")
    m = re.match(r"^(-?" + _NUM + r")\s*x\s*10\s*(?:\^|\*\*)?\s*([+-]?\d+)$",
                 t, re.I)
    if m:
        return float(m.group(1)) * 10.0 ** int(m.group(2))
    m = re.match(r"^(-?" + _NUM + r")\s*[eE]\s*([+-]?\d+)$", t)
    if m:
        return float(m.group(1)) * 10.0 ** int(m.group(2))
    m = re.match(r"^10(?!\d)\s*(?:\^|\*\*)?\s*([+-]?\d+)$", t)
    if m:
        return 10.0 ** int(m.group(1))
    return float(t)


def _to_m(val: float, unit: str) -> float:
    """cm/cm-word units to metres; metres pass through."""
    return val / 100.0 if (unit or "m").lower().startswith("c") else val


_TIME_KEYS = (("year", ("year", "yr")), ("day", ("day",)),
              ("hour", ("hour", "hr")), ("minute", ("minute", "min")),
              ("second", ("second", "sec")))


def _tkey(unit: str) -> str:
    u = (unit or "").strip().lower()
    if len(u) > 1 and u.endswith("s"):
        u = u[:-1]
    for key, names in _TIME_KEYS:
        if u in names:
            return key
    return u


# --------------------------------------------------------------------------- #
# Optics computes
# --------------------------------------------------------------------------- #


def _c_snells(g, m, t) -> _ComputeOut:
    n1 = _sci(g["n1"]) if g.get("n1") else _MEDIA_N.get((g.get("m1") or "").lower())
    if g.get("n2"):
        n2 = _sci(g["n2"])
    elif g.get("n2p") is not None:
        n2 = _sci(g["n2p"])
    else:
        n2 = _MEDIA_N.get((g.get("m2") or "").lower())
    ang = _sci(g["angle"])
    if not n1 or not n2 or not (0.0 < ang < 90.0):
        return None
    s = n1 * math.sin(math.radians(ang)) / n2
    if s <= 0.0 or s > 1.0:
        return None  # total internal reflection: no refracted ray
    r = math.degrees(math.asin(s))
    steps = _beats(
        "Snell's law n1 sin(i) = n2 sin(r), rearranged as sin(r) = n1 "
        "sin(i) / n2 -- refraction bends a ray at an interface "
        "according to the refractive-index ratio.",
        f"sin(r) = {n1:g} x sin({ang:g} deg) / {n2:g}",
        f"sin(r) = {s:.6g}, r = sin^-1({s:.6g}) = {r:.4g} degrees",
        f"substitute back: n2 sin(r) = {n2:g} x sin({r:.4g} deg) = "
        f"{n2 * math.sin(math.radians(r)):.6g} = n1 sin(i) -- closes",
        f"the ray leaves refracted at {r:.4g} degrees to the normal.",
    )
    return r, steps, f"refraction_angle = {r:.4g} degrees", None


def _c_critical(g, m, t) -> _ComputeOut:
    def val_for(name: Optional[str]) -> Optional[float]:
        nm = (name or "").lower()
        for mid, raw in ((g.get("m1n"), g.get("n1")), (g.get("m2n"), g.get("n2"))):
            if mid and mid.lower() == nm:
                return _sci(raw)
        return None

    n_dense = val_for(g.get("m1"))   # first-named medium = incident side
    n_rare = val_for(g.get("m2"))
    if n_dense is None or n_rare is None:
        return None
    if n_dense <= 0 or n_rare <= 0 or n_rare >= n_dense:
        return None  # critical angle needs dense -> rare
    s = n_rare / n_dense
    c = math.degrees(math.asin(s))
    steps = _beats(
        "critical-angle relation sin(c) = n2/n1 (dense to rare) -- at "
        "this incidence angle the refracted ray skims the surface; "
        "beyond it, total internal reflection.",
        f"sin(c) = {n_rare:g} / {n_dense:g}",
        f"sin(c) = {s:.6g}, c = sin^-1({s:.6g}) = {c:.4g} degrees",
        f"substitute back: n1 sin(c) = {n_dense:g} x {s:.6g} = "
        f"{n_rare:g} = n2 -- closes",
        f"rays hitting the interface beyond {c:.4g} degrees are totally "
        "internally reflected.",
    )
    return c, steps, f"critical_angle = {c:.4g} degrees", None


def _c_prism(g, m, t) -> _ComputeOut:
    ang_a = _sci(g["A"])
    n = _sci(g["n"])
    if not (0.0 < ang_a < 180.0) or n <= 0:
        return None
    s = n * math.sin(math.radians(ang_a / 2.0))
    if s > 1.0:
        return None
    d_min = 2.0 * math.degrees(math.asin(s)) - ang_a
    steps = _beats(
        "minimum-deviation prism relation d = 2 sin^-1(n sin(A/2)) - A "
        "-- at minimum deviation the ray passes symmetrically through "
        "the prism.",
        f"n sin(A/2) = {n:g} x sin({ang_a / 2:g} deg)",
        f"n sin(A/2) = {s:.6g}; d = 2 x {math.degrees(math.asin(s)):.4g}"
        f" - {ang_a:g} = {d_min:.4g} degrees",
        f"substitute back: n = sin((A + d)/2) / sin(A/2) = "
        f"{math.sin(math.radians((ang_a + d_min) / 2.0)) / math.sin(math.radians(ang_a / 2.0)):.6g}"
        f" = {n:g} -- closes",
        f"light through this prism bends by at least {d_min:.4g} "
        "degrees.",
    )
    return d_min, steps, f"angle_of_deviation = {d_min:.4g} degrees", None


def _c_power_lens(g, m, t) -> _ComputeOut:
    f_raw = _sci(g["f"])
    if "_conv_f" in g:
        f_m = f_raw  # normalized to metres by the unit schema
    else:
        f_m = (f_raw / 100.0
               if (g.get("unit") or "m").lower().startswith("c") else f_raw)
    kind = (g.get("kind") or "").lower()
    if kind.startswith("conc") or kind.startswith("diver"):
        f_m = -f_m  # concave / diverging lens: negative focal length
    if f_m == 0:
        return None
    p = 1.0 / f_m
    steps = _beats(
        "lens power formula P = 1/f with f in metres (P in dioptres) -- "
        "power measures how strongly a lens converges or diverges.",
        f"P = 1 / ({f_m:g} m)",
        f"P = 1/{f_m:g} = {p:.6g} D",
        f"substitute back: f = 1/P = 1/{p:.6g} = {f_m:g} m -- matches",
        f"the lens has a power of {p:.6g} dioptres "
        f"({'converging' if p > 0 else 'diverging'}).",
    )
    return p, steps, f"power = {p:.6g} dioptres (D)", None


# --------------------------------------------------------------------------- #
# Modern physics computes
# --------------------------------------------------------------------------- #


def _c_de_broglie(g, m, t) -> _ComputeOut:
    v = _sci(g["speed"])
    key = (g.get("particle") or "").lower().split()[0]
    mass = _PARTICLE_MASS_KG.get(key)
    if mass is None or v <= 0:
        return None
    lam = _PLANCK / (mass * v)
    steps = _beats(
        "de Broglie relation lambda = h / (m v), h = 6.63e-34 J s -- "
        "every moving particle behaves like a wave of this wavelength.",
        f"lambda = 6.63e-34 / ({mass:g} kg x {v:g} m/s)",
        f"lambda = 6.63e-34 / {mass * v:.6g} = {lam:.6g} m",
        f"substitute back: m v = h/lambda = 6.63e-34 / {lam:.6g} = "
        f"{mass * v:.6g} kg m/s -- closes",
        f"the {key} travels with a matter-wave of {lam:.6g} m.",
    )
    return lam, steps, f"wavelength = {lam:.6g} m", None


def _c_decay(g, m, t) -> _ComputeOut:
    n0 = _sci(g["n0"])
    half = _sci(g["half"])
    elap = _sci(g["elap"])
    if n0 <= 0 or half <= 0 or elap < 0:
        return None
    conv_h = "_conv_half" in g   # half-life normalized to seconds
    conv_e = "_conv_elap" in g   # elapsed time normalized to seconds
    if conv_h != conv_e:
        return None  # one raw one canonical: units cannot be compared
    if not (conv_h and conv_e) and _tkey(g.get("uh")) != _tkey(g.get("ue")):
        return None  # unnormalized half-life and elapsed time must share units
    remaining = n0 * 0.5 ** (elap / half)
    unit = (g.get("u0") or "").strip()
    tail = f" {unit}" if unit else ""
    steps = _beats(
        "radioactive decay law N = N0 (1/2)^(t/T) with T = half-life -- "
        "the sample halves once per half-life, so fractional powers "
        "cover partial ones.",
        f"number of half-lives = t/T = {elap:g} / {half:g}",
        f"N = {n0:g} x (1/2)^({elap / half:g}) = {remaining:.6g}{tail}",
        f"substitute back: T = t / log2(N0/N) = {elap:g} / "
        f"{elap / half:g} = {half:g} -- matches the half-life",
        f"{remaining:.6g}{tail} of the sample remains undecayed.",
    )
    return remaining, steps, f"remaining = {remaining:.6g}{tail}", None


# --------------------------------------------------------------------------- #
# Electrostatics / capacitance computes
# --------------------------------------------------------------------------- #


def _c_potential(g, m, t) -> _ComputeOut:
    r_raw = g.get("r") or g.get("r2")
    q_raw = g.get("q") or g.get("q2")
    if not r_raw or not q_raw:
        return None
    if "_conv_r" in g or "_conv_r2" in g:
        r_m = _sci(r_raw)  # normalized to metres by the unit schema
    else:
        r_m = _to_m(_sci(r_raw), g.get("ru") or g.get("ru2") or "m")
    mu = g.get("mu") or g.get("mu2")
    q_c = _sci(q_raw) * (_MICRO if mu else 1.0)
    if r_m <= 0 or q_c == 0:
        return None
    v = _K_COULOMB * q_c / r_m
    steps = _beats(
        "potential of a point charge V = k q / r, k = 9e9 N m^2/C^2 -- "
        "potential is the work per coulomb to reach that distance from "
        "the charge.",
        f"V = 9e9 x {q_c:g} C / {r_m:g} m",
        f"V = {_K_COULOMB * q_c:.6g} / {r_m:g} = {v:.6g} V",
        f"substitute back: r = k q / V = {_K_COULOMB * q_c:.6g} / "
        f"{v:.6g} = {r_m:g} m -- matches",
        f"the charge holds {v:.6g} V of potential at that distance.",
    )
    return v, steps, f"electric_potential = {v:.6g} V", None


def _c_capacitance(g, m, t) -> _ComputeOut:
    q = _sci(g["q"]) * (_MICRO if g.get("mu") else 1.0)
    v = _sci(g["v"])
    if v <= 0 or q == 0:
        return None
    c = q / v
    steps = _beats(
        "capacitance definition C = Q/V -- the charge a capacitor "
        "stores per volt across its plates (farads).",
        f"C = {q:g} C / {v:g} V",
        f"C = {q:g} / {v:g} = {c:.6g} F",
        f"substitute back: Q = C V = {c:.6g} x {v:g} = {q:g} C -- "
        "matches",
        f"the capacitor stores {q:g} C per {v:g} V, i.e. {c:.6g} F.",
    )
    return c, steps, f"capacitance = {c:.6g} F", None


def _c_caps_series(g, m, t) -> _ComputeOut:
    c1u, c2u = _num(g["c1"]), _num(g["c2"])
    if c1u <= 0 or c2u <= 0:
        return None
    c1, c2 = c1u * _MICRO, c2u * _MICRO
    cs = c1 * c2 / (c1 + c2)
    steps = _beats(
        "series capacitors rule 1/C = 1/C1 + 1/C2, i.e. C = C1 C2 / "
        "(C1 + C2) -- the same charge flows through both, so the pair "
        "holds less charge per volt than either alone.",
        f"C = ({c1u:g} x {c2u:g})/({c1u:g} + {c2u:g}) uF",
        f"C = {c1u * c2u:g} / {c1u + c2u:g} = {cs * 1e6:.6g} uF = "
        f"{cs:.6g} F",
        f"sanity check: the series total {cs * 1e6:.6g} uF is below "
        f"each capacitor ({c1u:g}, {c2u:g} uF) as it must be",
        f"the pair behaves as a single {cs:.6g} F capacitor.",
    )
    return cs, steps, f"total_capacitance = {cs:.6g} F", None


def _c_caps_parallel(g, m, t) -> _ComputeOut:
    c1u, c2u = _num(g["c1"]), _num(g["c2"])
    if c1u <= 0 or c2u <= 0:
        return None
    cp = (c1u + c2u) * _MICRO
    steps = _beats(
        "parallel capacitors rule C = C1 + C2 -- both share the same "
        "voltage, so their stored charges add directly.",
        f"C = {c1u:g} uF + {c2u:g} uF",
        f"C = {c1u + c2u:g} uF = {cp:.6g} F",
        f"sanity check: the parallel total {c1u + c2u:g} uF exceeds "
        f"each capacitor as a parallel sum must",
        f"the pair stores charge like a single {cp:.6g} F capacitor.",
    )
    return cp, steps, f"total_capacitance = {cp:.6g} F", None


# --------------------------------------------------------------------------- #
# Circuits computes
# --------------------------------------------------------------------------- #


def _c_kcl(g, m, t) -> _ComputeOut:
    i_in = _num(g["iin"])
    i_out = _num(g["iout"])
    other = i_in - i_out
    if other <= 0:
        return None
    steps = _beats(
        "Kirchhoff's current law (junction rule): current in = current "
        "out -- charge cannot pile up at a junction.",
        f"I_other = I_in - I_branch = {i_in:g} A - {i_out:g} A",
        f"I_other = {i_in:g} - {i_out:g} = {other:g} A",
        f"tally: {other:g} + {i_out:g} = {i_in:g} A leaving = current "
        "entering -- the junction balances",
        f"the remaining branch carries {other:g} A.",
    )
    return other, steps, f"current_other_branch = {other:g} A", None


def _c_wheatstone(g, m, t) -> _ComputeOut:
    if "unbalanced" in (t or "").lower():
        return None
    p, q, r = _num(g["p"]), _num(g["q"]), _num(g["r"])
    if p <= 0 or q <= 0 or r <= 0:
        return None
    x = q * r / p
    steps = _beats(
        "balanced Wheatstone bridge relation P/Q = R/X, rearranged as "
        "X = Q R / P -- at balance the galvanometer carries no current "
        "so the arm ratios match.",
        f"X = ({q:g} x {r:g}) / {p:g} ohm",
        f"X = {q * r:g} / {p:g} = {x:.6g} ohm",
        f"substitute back: P/Q = {p:g}/{q:g} = {p / q:.6g} and R/X = "
        f"{r:g}/{x:.6g} = {r / x:.6g} -- equal, bridge balanced",
        f"the unknown arm's resistance is {x:.6g} ohm.",
    )
    return x, steps, f"unknown_resistance_X = {x:.6g} ohm", None


def _c_resistivity(g, m, t) -> _ComputeOut:
    if "_conv_len" in g:
        l_m = _num(g["len"])  # normalized to metres by the unit schema
    else:
        l_m = _to_m(_num(g["len"]), g.get("lu") or "m")
    area = _sci(g["area"])
    rho = _sci(g["rho"])
    if l_m <= 0 or area <= 0 or rho <= 0:
        return None
    r = rho * l_m / area
    steps = _beats(
        "wire resistance formula R = rho l / A -- resistance grows with "
        "the material's resistivity and length, and shrinks with the "
        "cross-sectional area.",
        f"R = {rho:g} ohm m x {l_m:g} m / {area:g} m^2",
        f"R = {rho * l_m:.6g} / {area:g} = {r:.6g} ohm",
        f"substitute back: rho = R A / l = {r:.6g} x {area:g} / "
        f"{l_m:g} = {rho:g} ohm m -- matches",
        f"the wire opposes current with {r:.6g} ohm.",
    )
    return r, steps, f"resistance = {r:.6g} ohm", None


# --------------------------------------------------------------------------- #
# Magnetism computes
# --------------------------------------------------------------------------- #


def _c_solenoid(g, m, t) -> _ComputeOut:
    turns = _num(g["turns"])
    if "_conv_len" in g:
        l_m = _num(g["len"])  # normalized to metres by the unit schema
    else:
        l_m = _to_m(_num(g["len"]), g.get("lu") or "m")
    cur = _num(g["cur"])
    if turns <= 0 or l_m <= 0 or cur <= 0:
        return None
    n_turns = turns / l_m
    b = _MU0 * n_turns * cur
    steps = _beats(
        "solenoid field formula B = mu0 n I with n = N/L and mu0 = "
        "4 pi x 10^-7 T m/A -- the interior field is set by turns per "
        "metre and the coil current.",
        f"n = {turns:g} turns / {l_m:g} m = {n_turns:g} turns/m",
        f"B = 4 pi x 10^-7 x {n_turns:g} x {cur:g} = {b:.6g} T",
        f"substitute back: n = B/(mu0 I) = {b:.6g} / (1.256637e-06 x "
        f"{cur:g}) = {n_turns:g} turns/m -- matches",
        f"the solenoid's core field is {b:.6g} T along its axis.",
    )
    return b, steps, f"magnetic_field = {b:.6g} T", None


def _c_force_conductor(g, m, t) -> _ComputeOut:
    if "_conv_len" in g:
        l_m = _num(g["len"])  # normalized to metres by the unit schema
    else:
        l_m = _to_m(_num(g["len"]), g.get("lu") or "m")
    cur = _num(g["cur"])
    b = _num(g["field"])
    if l_m <= 0 or cur <= 0 or b <= 0:
        return None
    factor = 1.0
    assumptions = None
    if g.get("angle"):
        factor = math.sin(math.radians(_num(g["angle"])))
        if factor <= 0:
            return None
        assumptions = [f"conductor at {_num(g['angle']):g} degrees to B: "
                       f"sin(theta) = {factor:.6g}"]
    else:
        assumptions = ["wire perpendicular to field: sin(90 deg) = 1"]
    f = b * cur * l_m * factor
    steps = _beats(
        "motor-rule force on a current-carrying conductor F = B I L "
        "sin(theta) -- the field pushes the wire sideways with a force "
        "proportional to current and length.",
        f"F = {b:g} T x {cur:g} A x {l_m:g} m x {factor:g}",
        f"F = {b * cur * l_m:.6g} x {factor:g} = {f:.6g} N",
        f"substitute back: B = F/(I L sin(theta)) = {f:.6g} / "
        f"({cur:g} x {l_m:g} x {factor:g}) = {b:g} T -- matches",
        f"the field shoves the wire sideways with {f:.6g} N "
        "(Fleming's left-hand direction).",
    )
    return f, steps, f"force = {f:.6g} N", assumptions


# --------------------------------------------------------------------------- #
# The table: (id, trigger regex [RAW], governing equation, compute)
# --------------------------------------------------------------------------- #

def _c_wave_speed(g, m, t) -> _ComputeOut:
    f = _sci(g["f"])
    lam = _sci(g["lam"])
    if f <= 0.0 or lam <= 0.0:
        return None
    v = f * lam
    steps = _beats(
        "wave equation v = f x lambda -- a wave advances one wavelength "
        "each cycle, so speed is frequency times wavelength.",
        f"v = {f:g} Hz x {lam:g} m",
        f"v = {f:g} x {lam:g} = {v:.6g} m/s",
        f"substitute back: f = v/lambda = {v:.6g} / {lam:g} = {f:g} Hz "
        "-- matches",
        f"the wave travels at {v:.6g} m/s.",
    )
    return v, steps, f"speed = {v:.6g} m/s", None


_H_PLANCK = 6.63e-34  # J s (class-12 convention)
_C_LIGHT = 3.0e8      # m/s
_EV = 1.6e-19         # J per eV


def _c_photon_energy(g, m, t) -> _ComputeOut:
    raw = g.get("lam") or g.get("lam2")
    if raw is None:
        return None
    lam = _sci(raw)
    if "_conv_lam" not in g and "_conv_lam2" not in g:
        # no schema normalization ran: fall back to the raw nm check
        if ((g.get("unit") or g.get("unit2") or "")).lower().startswith("n"):
            lam = lam * 1e-9  # nm -> m
    if lam <= 0.0:
        return None
    e_j = _H_PLANCK * _C_LIGHT / lam
    e_ev = e_j / _EV
    steps = _beats(
        "photon energy formula E = h c / lambda -- shorter wavelength "
        "photons carry more energy (h = 6.63e-34 J s, c = 3.0e8 m/s, "
        "1 eV = 1.6e-19 J).",
        f"E = (6.63e-34 x 3.0e8) / {lam:g} m",
        f"E = {e_j:.4g} J = {e_j:.4g} / 1.6e-19 = {e_ev:.4g} eV",
        f"substitute back: lambda = h c / E = "
        f"{_H_PLANCK * _C_LIGHT:.4g} / {e_j:.4g} = {lam:g} m -- closes",
        f"each photon of this light carries {e_ev:.4g} eV.",
    )
    return e_ev, steps, f"photon_energy = {e_ev:.4g} eV", None


TABLE = [
    # ---- waves ----
    ("WAVE_SPEED",
     r"wave[s]?\s+(?:has|of|with|travelling\s+at\s+a?l?|moving\s+with)?[^.]*?frequency\s*(?:is|of|=)?\s*(?P<f>" + _SCI + r")\s*Hz\b"
     r"[^.]*?wavelength\s*(?:is|of|=)?\s*(?P<lam>" + _SCI + r")\s*m\b",
     "v = f lambda",
     _c_wave_speed),

    # ---- modern physics ----
    ("PHOTON_ENERGY",
     r"(?:"
     r"photon[^.]*?wavelength\s*(?:is|of|=)?\s*(?P<lam>" + _SCI + r")\s*(?P<unit>nm|nanometres?|nanometers?|m)\b"
     r"|wavelength(?:[^.]{0,60}?is)?\s*(?P<lam2>" + _SCI + r")\s*(?P<unit2>nm|nanometres?|nanometers?|m)\b.{0,120}?photon"
     r")",
     "E = h c / lambda  (eV)",
     _c_photon_energy),

    # ---- optics ----
    ("SNELLS_LAW",
     r"light(?:\s+(?:ray|beam|wave))?\s+"
     r"(?:goes|travels?|passes|shines|moves|falls|is\s+incident)"
     r"(?:\s+from\s+(?P<m1>[a-z]+)\s*"
     r"(?:\(\s*n\s*=\s*(?P<n1>" + _SCI + r")\s*\))?"
     r"\s*(?:into|to)\s+(?P<m2>[a-z]+)\s*"
     r"(?:\(\s*n\s*=\s*(?P<n2>" + _SCI + r")\s*\))?)?"
     r"(?:\s+(?:of|with)\s+(?:refractive\+index|n)\*(?:is|=|of)?\*(?P<n2p>" + _SCI + r"))?"
     r".{0,120}?angle\s+of\s+incidence\s+(?:is\s+|of\s+)?"
     r"(?P<angle>" + _SCI + r")\s*(?:degrees?|\u00b0)?",
     "n1 sin(i) = n2 sin(r)",
     _c_snells),

    ("CRITICAL_ANGLE",
     r"critical\s+angle\s+for\s+(?:the\s+)?(?P<m1>[a-z]+)\s*(?:-|to|/)\s*"
     r"(?P<m2>[a-z]+)\s+interface"
     r"[^.]*?n\s*\(\s*(?P<m1n>[a-z]+)\s*\)\s*=\s*(?P<n1>" + _SCI + r")"
     r"[^.]*?n\s*\(\s*(?P<m2n>[a-z]+)\s*\)\s*=\s*(?P<n2>" + _SCI + r")",
     "sin(c) = n2/n1 (dense to rare)",
     _c_critical),

    ("PRISM_DEVIATION",
     r"angle\s+of\s+deviation\s+for\s+(?:a|an)\s+(?:equilateral\s+|glass\s+)?"
     r"prism\s+with\s+(?:an?\s+)?(?:apex\s+)?angle\s+(?:of\s+)?"
     r"(?P<A>" + _SCI + r")\s*(?:degrees?|\u00b0)?\s*(?:,|and)?\s*"
     r"(?:a\s+)?refractive\s+index\s*(?:of\s+)?(?P<n>" + _SCI + r")",
     "d_min = 2 sin^-1(n sin(A/2)) - A",
     _c_prism),

    ("POWER_LENS",
     r"power\s+of\s+(?:a|an)\s+"
     r"(?P<kind>convex|converging|concave|diverging)?\s*(?:thin\s+)?lens"
     r"\s+with\s+(?:a\s+)?focal\s+length\s+(?:of\s+)?(?P<f>" + _SCI + r")"
     r"\s*(?P<unit>" + _CM_M + r")\b",
     "P = 1/f (f in m, P in dioptres)",
     _c_power_lens),

    # ---- modern physics ----
    ("DE_BROGLIE",
     r"de\s*-?\s*brogl\w+\s+wavelength\s+of\s+(?:an?|the)\s+"
     r"(?P<particle>electron|proton|neutron|alpha\s+particle)\b"
     r"[^.]*?(?:moving|travelling|traveling|going)?\s*"
     r"(?:at|with)?\s*(?:a\s+)?(?:speed\s+(?:of\s+)?|velocity\s+(?:of\s+)?)?"
     r"(?P<speed>" + _SCI + r")\s*m\s*(?:/|per)\s*s\b",
     "lambda = h/(m v), h = 6.63e-34 J s",
     _c_de_broglie),

    ("RADIOACTIVE_DECAY",
     r"remaining\s+(?:mass|amount|quantity)\b[^.]*?"
     r"initial\s+(?:mass|amount|quantity)\s+(?:of\s+|is\s+)?"
     r"(?P<n0>" + _SCI + r")\s*(?P<u0>kg|mg|g(?:rams?)?)?\b"
     r"[^.]*?half[-\s]?life\s+(?:of\s+|is\s+)?(?P<half>" + _SCI + r")\s*"
     r"(?P<uh>years?|yrs?|days?|hours?|hrs?|minutes?|mins?|seconds?|secs?)\b"
     r"[^.]*?after\s+(?P<elap>" + _SCI + r")\s*"
     r"(?P<ue>years?|yrs?|days?|hours?|hrs?|minutes?|mins?|seconds?|secs?)\b",
     "N = N0 (1/2)^(t/T)",
     _c_decay),

    # ---- electrostatics / capacitance ----
    ("ELECTRIC_POTENTIAL",
     r"electric\s+potential[^.]*?(?:"
     r"(?:at|of)\s+(?:a\s+)?(?:distance\s+(?:of\s+)?)?"
     r"(?P<r>" + _SCI + r")\s*(?P<ru>" + _CM_M + r")\b"
     r"[^.]*?(?:from|due\s+to)\s+(?:a\s+)?(?:point\s+)?charge\s+(?:of\s+)?"
     r"(?P<q>" + _SCI + r")\s*(?:(?P<mu>micro|\u03bc|u)\s*)?"
     r"(?:coulombs?|C)\b"
     r"|"
     r"charge\s+(?:of\s+)?(?P<q2>" + _SCI + r")\s*"
     r"(?:(?P<mu2>micro|\u03bc|u)\s*)?(?:coulombs?|C)\b"
     r"[^.]*?(?:at\s+(?:a\s+)?(?:distance\s+(?:of\s+)?)?|"
     r"distance\s+(?:of\s+)?)"
     r"(?P<r2>" + _SCI + r")\s*(?P<ru2>" + _CM_M + r")\b"
     r")",
     "V = k q/r, k = 9e9 N m^2/C^2",
     _c_potential),

    ("CAPACITANCE",
     r"capacitance\s+of\s+(?:a|an|the)?\s*capacitor[^.]*?"
     r"charge\s+(?:of\s+)?(?P<q>" + _SCI + r")\s*"
     r"(?:(?P<mu>micro|\u03bc|u)\s*)?(?:coulombs?|C)\b"
     r"[^.]*?(?:at|across|under|applied)\s+(?:a\s+)?"
     r"(?:potential\s+(?:difference\s+)?(?:of\s+)?)?"
     r"(?P<v>" + _SCI + r")\s*(?:V|volts?)\b",
     "C = Q/V",
     _c_capacitance),

    ("CAPACITORS_SERIES",
     r"total\s+capacitance\s+of\s+(?P<c1>" + _NUM + r")\s*"
     r"(?:\u03bc\s*F|uF|microfarads?|micro\s*farads?)\b\s*(?:,|and)?\s*"
     r"(?P<c2>" + _NUM + r")\s*"
     r"(?:\u03bc\s*F|uF|microfarads?|micro\s*farads?)\b"
     r"[^.]{0,50}?in\s+series",
     "C = C1 C2/(C1 + C2)",
     _c_caps_series),

    ("CAPACITORS_PARALLEL",
     r"total\s+capacitance\s+of\s+(?P<c1>" + _NUM + r")\s*"
     r"(?:\u03bc\s*F|uF|microfarads?|micro\s*farads?)\b\s*(?:,|and)?\s*"
     r"(?P<c2>" + _NUM + r")\s*"
     r"(?:\u03bc\s*F|uF|microfarads?|micro\s*farads?)\b"
     r"[^.]{0,50}?in\s+parallel",
     "C = C1 + C2",
     _c_caps_parallel),

    # ---- circuits ----
    ("KIRCHHOFF_CURRENT",
     r"junction[^.]*?(?P<iin>" + _NUM + r")\s*(?:A|amps?|amperes?)\b"
     r"[^.]*?enters?[^.]*?(?P<iout>" + _NUM + r")\s*(?:A|amps?|amperes?)\b"
     r"[^.]*?leaves?",
     "I_in = I_out (Kirchhoff's current law)",
     _c_kcl),

    ("WHEATSTONE_BALANCED",
     r"(?<!un)balanced\s+wheatstone\s+bridge[^.]*?"
     r"P\s*=\s*(?P<p>" + _NUM + r")\s*(?:ohms?|\u03a9)?\s*(?:,|and)\s*"
     r"Q\s*=\s*(?P<q>" + _NUM + r")\s*(?:ohms?|\u03a9)?\s*(?:,|and)\s*"
     r"R\s*=\s*(?P<r>" + _NUM + r")\s*(?:ohms?|\u03a9)?",
     "P/Q = R/X  ->  X = Q R/P",
     _c_wheatstone),

    ("RESISTIVITY",
     r"resistance\s+of\s+(?:a|an)\s+wire\s+of\s+length\s+"
     r"(?P<len>" + _NUM + r")\s*(?P<lu>" + _CM_M + r")\b"
     r"\s*(?:,|and)?\s*(?:cross[-\s]?sectional\s+)?area\s+(?:of\s+)?"
     r"(?P<area>" + _SCI + r")\s*m\s*(?:\^|\*\*)?\s*2\b"
     r"[^.]*?resistivity\s+(?:of\s+)?(?P<rho>" + _SCI + r")"
     r"\s*(?:ohm|\u03a9)\s*[\u00b7-]?\s*m(?:et(?:re|er)s?)?\b",
     "R = rho l/A",
     _c_resistivity),

    # ---- magnetism ----
    ("MAGNETIC_FIELD",
     r"magnetic\s+field\s+inside\s+(?:a|an|the)?\s*(?:long\s+)?solenoid"
     r"\s+with\s+(?P<turns>\d+)\s+turns?\s*(?:,|and)?\s*"
     r"(?P<len>" + _NUM + r")\s*(?P<lu>" + _CM_M + r")\s+long"
     r"[^.]*?(?:carrying|carries|with)\s+(?:a\s+)?(?:current\s+of\s+)?"
     r"(?P<cur>" + _NUM + r")\s*(?:A|amps?|amperes?)\b",
     "B = mu0 n I, n = N/L, mu0 = 4 pi x 10^-7 T m/A",
     _c_solenoid),

    ("FORCE_ON_CONDUCTOR",
     r"force\s+on\s+(?:a|an)\s+(?:straight\s+)?(?:conducting\s+)?wire"
     r"\s+of\s+(?:length\s+)?(?P<len>" + _NUM + r")\s*(?P<lu>" + _CM_M + r")\b"
     r"[^.]*?(?:carrying|carries|with)\s+(?:a\s+)?(?:current\s+of\s+)?"
     r"(?P<cur>" + _NUM + r")\s*(?:A|amps?|amperes?)\b"
     r"[^.]*?(?:perpendicular\s+to|at\s+right\s+angles?\s+to|to)\s+"
     r"(?:a\s+)?(?:uniform\s+)?(?:magnetic\s+field\s+(?:of\s+)?|"
     r"field\s+(?:of\s+)?)?(?P<field>" + _NUM + r")\s*(?:T|teslas?)\b"
     r"(?:\s+at\s+(?P<angle>" + _NUM + r")\s*degrees?)?",
     "F = B I L sin(theta)",
     _c_force_conductor),
]


# --------------------------------------------------------------------------- #
# Unit schemas: family -> {slot: canonical unit, _out: answer unit,
# _need: dimensions the trigger could not match without}
# --------------------------------------------------------------------------- #

UNITS: Dict[str, Dict[str, Any]] = {
    "WAVE_SPEED": {"f": "frequency_hz", "lam": "length_m",
                   "_out": "speed_ms", "_need": ("frequency", "length")},
    "PHOTON_ENERGY": {"lam": "length_m", "_out": "energy_ev",
                      "_need": ("length",)},
    "SNELLS_LAW": {"angle": "angle_deg", "_out": "angle_deg"},
    "CRITICAL_ANGLE": {"_out": "angle_deg"},
    "PRISM_DEVIATION": {"A": "angle_deg", "_out": "angle_deg"},
    "POWER_LENS": {"f": "length_m", "_out": "dioptre",
                   "_need": ("length",)},
    "DE_BROGLIE": {"speed": "speed_ms", "_out": "length_m",
                   "_need": ("speed",)},
    "RADIOACTIVE_DECAY": {"half": "time_s", "elap": "time_s",
                          "_need": ("time",)},
    "ELECTRIC_POTENTIAL": {"r": "length_m", "r2": "length_m",
                           "_out": "volt", "_need": ("length", "charge")},
    "CAPACITANCE": {"_out": "farad", "_need": ("charge", "voltage")},
    "CAPACITORS_SERIES": {"_out": "farad", "_need": ("capacitance",)},
    "CAPACITORS_PARALLEL": {"_out": "farad", "_need": ("capacitance",)},
    "KIRCHHOFF_CURRENT": {"iin": "current_a", "iout": "current_a",
                          "_out": "current_a", "_need": ("current",)},
    "WHEATSTONE_BALANCED": {"_out": "ohm"},
    "RESISTIVITY": {"len": "length_m", "_out": "ohm",
                    "_need": ("length", "resistance")},
    "MAGNETIC_FIELD": {"len": "length_m", "_out": "tesla",
                       "_need": ("length",)},
    "FORCE_ON_CONDUCTOR": {"len": "length_m", "_out": "newton",
                           "_need": ("length",)},
}


def get_units(fid: str) -> Optional[Dict[str, str]]:
    """Unit schema for a family id; None when the family is unwired."""
    return UNITS.get(fid)


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


def model_physics3(text: str) -> ModelResult:
    """Scan the physics3 family table; first grounded hit wins.

    Families with a "_need" dimension list are skipped when the text
    lacks those units (lossless: their triggers require the unit word),
    and schema-declared slots are normalized to canonical units before
    compute so "400 nm" never reaches a formula as 400 metres.
    """
    dims = _ureg.dimensions_of(text)
    for fid, pattern, equation, compute in TABLE:
        schema = UNITS.get(fid)
        if not _ureg.has_dimensions(dims, schema.get("_need")
                                    if schema else None):
            continue
        m = re.search(pattern, text, re.I)
        if not m:
            continue
        g = m.groupdict()
        if schema:
            try:
                g = _ureg.normalize_slots(g, m, text, schema)
            except Exception:
                g = m.groupdict()
        try:
            out = compute(g, m, text)
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
            confidence=_CONF,
            quantities=_quantities_from(m, value),
            governing_equation=equation,
            final_answer=answer or f"{value:.6g}",
            numeric_answer=float(value),
            steps=steps,
            note="; ".join(assumptions) if assumptions else "",
        )
    return _no("PHYSICS3", "no physics3 family matched")
