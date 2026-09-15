"""Chemistry formula solver — comprehensive templates for NEET/JEE level.

Covers: mole concept, stoichiometry, gas laws, equilibrium, electrochemistry,
kinetics, pH, thermochemistry, colligative properties, atomic structure.

Uses chempy where reliable, plus deterministic formula computation.
"""

import re
import math
from typing import Optional
from backend.ai.compute_types import ComputeResult, _format_math, _clean_num


def _num(v) -> str:
    if v is None:
        return "?"
    f = float(v)
    if f == int(f):
        return str(int(f))
    return str(round(f, 6))


def _extract_numbers(message: str, patterns: dict) -> dict:
    values = {}
    for var, pattern in patterns.items():
        m = re.search(pattern, message, re.IGNORECASE)
        if m:
            try:
                values[var] = float(m.group(1))
            except (ValueError, IndexError):
                pass
    return values


def _result(steps: list, answer: str) -> ComputeResult:
    return ComputeResult(
        matched=True,
        question_type="chemistry_formula",
        answer=answer,
        steps=steps,
    )


# --------------------------------------------------------------------------- #
# Mole concept
# --------------------------------------------------------------------------- #

def solve_moles(message: str) -> Optional[ComputeResult]:
    """n = m/M, n = N/NA, n = V/22.4 (at STP)"""
    if not any(kw in message for kw in ["mole", "molar", "how many moles", "number of moles"]):
        return None
    
    # Don't hijack equilibrium/reaction stoichiometry questions
    if any(kw in message for kw in ["equilibrium", "reaction", "stoichiometry", "⇌", "formed", "reacted"]):
        return None

    NA = 6.022e23

    vals = _extract_numbers(message, {
        "m": r'(?:mass|m)\s*=?\s*(\d+\.?\d*)\s*g\b',
        "M": r'(?:molar\s+mass|molecular\s+weight|M)\s*=?\s*(\d+\.?\d*)\s*g/mol',
        "N": r'(?:number\s+of\s+(?:molecules|atoms|particles)|N)\s*=?\s*(\d+\.?\d*(?:e[+-]?\d+)?)',
        "V": r'(?:volume|v)\s*=?\s*(\d+\.?\d*)\s*L\b',
    })

    # n = m/M
    if "m" in vals and "M" in vals:
        n = vals["m"] / vals["M"]
        steps = [
            f"Given: mass = {_num(vals['m'])} g, Molar mass = {_num(vals['M'])} g/mol",
            f"Formula: n = m / M",
            f"Substitute: n = {_num(vals['m'])} / {_num(vals['M'])}",
            f"Result: n = {_num(n)} mol",
        ]
        return _result(steps, f"n = {_num(n)} mol")

    # n = N/NA
    if "N" in vals:
        n = vals["N"] / NA
        steps = [
            f"Given: N = {_num(vals['N'])} particles",
            f"Formula: n = N / NA",
            f"NA = 6.022×10²³ /mol",
            f"Result: n = {_num(n)} mol",
        ]
        return _result(steps, f"n = {_num(n)} mol")

    # n = V/22.4 at STP
    if "V" in vals and ("stp" in message or "standard" in message):
        n = vals["V"] / 22.4
        steps = [
            f"Given: V = {_num(vals['V'])} L at STP",
            f"Formula: n = V / 22.4 (at STP)",
            f"Result: n = {_num(n)} mol",
        ]
        return _result(steps, f"n = {_num(n)} mol")

    return None


def solve_molarity(message: str) -> Optional[ComputeResult]:
    """M = n/V = moles/L"""
    if not any(kw in message for kw in ["molarity", "molar solution", "concentration"]):
        return None

    vals = _extract_numbers(message, {
        "n": r'(?:moles|n)\s*=?\s*(\d+\.?\d*)\s*mol\b',
        "V": r'(?:volume|v)\s*=?\s*(\d+\.?\d*)\s*L\b',
        "m": r'(?:mass|m)\s*=?\s*(\d+\.?\d*)\s*g\b',
        "M_w": r'(?:molar\s+mass|M)\s*=?\s*(\d+\.?\d*)\s*g/mol',
    })

    # M = n/V
    if "n" in vals and "V" in vals:
        M = vals["n"] / vals["V"]
        steps = [
            f"Given: n = {_num(vals['n'])} mol, V = {_num(vals['V'])} L",
            f"Formula: Molarity = n / V",
            f"Result: M = {_num(M)} mol/L",
        ]
        return _result(steps, f"M = {_num(M)} mol/L")

    # If mass and molar mass given, compute moles first
    if "m" in vals and "M_w" in vals and "V" in vals:
        n = vals["m"] / vals["M_w"]
        M = n / vals["V"]
        steps = [
            f"Given: mass = {_num(vals['m'])} g, M = {_num(vals['M_w'])} g/mol, V = {_num(vals['V'])} L",
            f"Step 1: n = mass / M = {_num(vals['m'])} / {_num(vals['M_w'])} = {_num(n)} mol",
            f"Step 2: Molarity = n / V = {_num(n)} / {_num(vals['V'])}",
            f"Result: M = {_num(M)} mol/L",
        ]
        return _result(steps, f"M = {_num(M)} mol/L")

    return None


def solve_pH(message: str) -> Optional[ComputeResult]:
    """pH = -log[H+], pOH = -log[OH-], pH + pOH = 14"""
    if not any(kw in message for kw in ["ph", "poh", "acidity", "basicity"]):
        # Also match "ph" as a standalone word
        if not re.search(r'\bph\b', message):
            return None

    # pH from [H+]
    vals = _extract_numbers(message, {
        "H": r'\[h\+?\]\s*=?\s*(\d+\.?\d*(?:e[+-]?\d+)?)',
        "OH": r'\[oh-?\]\s*=?\s*(\d+\.?\d*(?:e[+-]?\d+)?)',
        "pH": r'ph\s*=?\s*(\d+\.?\d*)',
        "pOH": r'poh\s*=?\s*(\d+\.?\d*)',
    })

    # pH = -log[H+]
    if "H" in vals and "pH" not in vals:
        pH = -math.log10(vals["H"])
        pOH = 14 - pH
        steps = [
            f"Given: [H⁺] = {_num(vals['H'])} M",
            f"Formula: pH = -log[H⁺]",
            f"Substitute: pH = -log({_num(vals['H'])})",
            f"Result: pH = {_num(round(pH, 2))}, pOH = {_num(round(pOH, 2))}",
        ]
        return _result(steps, f"pH = {_num(round(pH, 2))}")

    # pOH = -log[OH-]
    if "OH" in vals and "pOH" not in vals:
        pOH = -math.log10(vals["OH"])
        pH = 14 - pOH
        steps = [
            f"Given: [OH⁻] = {_num(vals['OH'])} M",
            f"Formula: pOH = -log[OH⁻], pH = 14 - pOH",
            f"Result: pOH = {_num(round(pOH, 2))}, pH = {_num(round(pH, 2))}",
        ]
        return _result(steps, f"pOH = {_num(round(pOH, 2))}, pH = {_num(round(pH, 2))}")

    # [H+] from pH
    if "pH" in vals and "H" not in vals:
        H = 10 ** (-vals["pH"])
        steps = [
            f"Given: pH = {_num(vals['pH'])}",
            f"Formula: [H⁺] = 10^(-pH)",
            f"Result: [H⁺] = {_num(H)} M",
        ]
        return _result(steps, f"[H⁺] = {_num(H)} M")

    return None


def solve_equilibrium(message: str) -> Optional[ComputeResult]:
    """Kc, Kp, equilibrium constant"""
    if not any(kw in message for kw in ["equilibrium constant", "kc", "kp",
                                         "equilibrium concentration"]):
        return None

    # Kc = [products]/[reactants]
    # Generic: extract Kc value
    vals = _extract_numbers(message, {
        "Kc": r'kc\s*=?\s*(\d+\.?\d*(?:e[+-]?\d+)?)',
        "Kp": r'kp\s*=?\s*(\d+\.?\d*(?:e[+-]?\d+)?)',
    })

    if "Kc" in vals:
        steps = [
            f"Given: Kc = {_num(vals['Kc'])}",
            f"Equilibrium constant (Kc) = {_num(vals['Kc'])}",
        ]
        return _result(steps, f"Kc = {_num(vals['Kc'])}")

    if "Kp" in vals:
        steps = [
            f"Given: Kp = {_num(vals['Kp'])}",
            f"Equilibrium constant (Kp) = {_num(vals['Kp'])}",
        ]
        return _result(steps, f"Kp = {_num(vals['Kp'])}")

    return None


def solve_nernst(message: str) -> Optional[ComputeResult]:
    """Nernst equation: E = E° - (RT/nF)lnQ"""
    if not any(kw in message for kw in ["nernst", "cell potential", "electrode potential"]):
        return None

    vals = _extract_numbers(message, {
        "E0": r'(?:e°|e0|standard.*?potential)\s*=?\s*(\d+\.?\d*)\s*V\b',
        "n": r'(?:n|electrons)\s*=?\s*(\d+\.?\d*)',
        "Q": r'(?:q|reaction.*?quotient)\s*=?\s*(\d+\.?\d*(?:e[+-]?\d+)?)',
        "T": r'(?:temperature|t)\s*=?\s*(\d+\.?\d*)\s*(?:k|°c)\b',
    })

    if "E0" in vals and "n" in vals and "Q" in vals:
        T = vals.get("T", 298.15)
        if "°c" in message:
            T = T + 273.15
        R = 8.314
        F = 96485
        E = vals["E0"] - (R * T / (vals["n"] * F)) * math.log(vals["Q"])
        steps = [
            f"Given: E° = {_num(vals['E0'])} V, n = {_num(vals['n'])}, Q = {_num(vals['Q'])}, T = {_num(T)} K",
            f"Formula: E = E° - (RT/nF)ln(Q)",
            f"R = 8.314, F = 96485 C/mol",
            f"Result: E = {_num(round(E, 4))} V",
        ]
        return _result(steps, f"E = {_num(round(E, 4))} V")

    return None


def solve_kinetics(message: str) -> Optional[ComputeResult]:
    """Rate laws, first-order half-life, Arrhenius equation"""
    if not any(kw in message for kw in ["rate constant", "half life", "half-life",
                                         "arrhenius", "first order", "reaction rate"]):
        return None

    # First-order half-life: t½ = 0.693/k
    if "half" in message and ("first order" in message or "rate constant" in message):
        vals = _extract_numbers(message, {
            "k": r'(?:rate\s+constant|k)\s*=?\s*(\d+\.?\d*(?:e[+-]?\d+)?)',
        })
        if "k" in vals:
            t_half = 0.693 / vals["k"]
            steps = [
                f"Given: k = {_num(vals['k'])} /s",
                f"Formula: t½ = 0.693 / k (first order)",
                f"Result: t½ = {_num(t_half)} s",
            ]
            return _result(steps, f"t½ = {_num(t_half)} s")

    # Arrhenius: k = Ae^(-Ea/RT)
    if "arrhenius" in message:
        vals = _extract_numbers(message, {
            "Ea": r'(?:activation\s+energy|ea)\s*=?\s*(\d+\.?\d*)\s*(?:j/mol|kj/mol)\b',
            "T": r'(?:temperature|t)\s*=?\s*(\d+\.?\d*)\s*(?:k|°c)\b',
            "A": r'(?:pre.?exponential|a)\s*=?\s*(\d+\.?\d*(?:e[+-]?\d+)?)',
        })
        if "Ea" in vals and "T" in vals:
            T = vals["T"]
            if "°c" in message:
                T = T + 273.15
            Ea = vals["Ea"]
            if "kj" in message:
                Ea = Ea * 1000
            R = 8.314
            exp_term = math.exp(-Ea / (R * T))
            if "A" in vals:
                k = vals["A"] * exp_term
                steps = [
                    f"Given: Ea = {_num(vals['Ea'])} J/mol, T = {_num(T)} K, A = {_num(vals['A'])}",
                    f"Formula: k = Ae^(-Ea/RT)",
                    f"Result: k = {_num(k)}",
                ]
                return _result(steps, f"k = {_num(k)}")
            else:
                steps = [
                    f"Given: Ea = {_num(vals['Ea'])} J/mol, T = {_num(T)} K",
                    f"Formula: k = Ae^(-Ea/RT)",
                    f"Exponential term: e^(-Ea/RT) = {_num(exp_term)}",
                    f"Result: k = A × {_num(exp_term)}",
                ]
                return _result(steps, f"k = A × {_num(exp_term)}")

    # First-order rate: rate = k[A]
    if "first order" in message and "rate" in message:
        vals = _extract_numbers(message, {
            "k": r'(?:rate\s+constant|k)\s*=?\s*(\d+\.?\d*(?:e[+-]?\d+)?)',
            "A": r'\[a\]\s*=?\s*(\d+\.?\d*(?:e[+-]?\d+)?)',
        })
        if "k" in vals and "A" in vals:
            rate = vals["k"] * vals["A"]
            steps = [
                f"Given: k = {_num(vals['k'])}, [A] = {_num(vals['A'])}",
                f"Formula: rate = k[A] (first order)",
                f"Result: rate = {_num(rate)} M/s",
            ]
            return _result(steps, f"rate = {_num(rate)} M/s")

    return None


def solve_faraday(message: str) -> Optional[ComputeResult]:
    """Faraday's laws: m = (M × I × t)/(n × F)"""
    if not any(kw in message for kw in ["faraday", "electrolysis", "mass deposited"]):
        return None

    vals = _extract_numbers(message, {
        "I": r'(?:current|i)\s*=?\s*(\d+\.?\d*)\s*A\b',
        "t": r'(?:time|t)\s*=?\s*(\d+\.?\d*)\s*s\b',
        "M": r'(?:molar\s+mass|M)\s*=?\s*(\d+\.?\d*)\s*g/mol',
        "n": r'(?:n|electrons|valency)\s*=?\s*(\d+\.?\d*)',
    })

    if "I" in vals and "t" in vals and "M" in vals and "n" in vals:
        F = 96485
        m = (vals["M"] * vals["I"] * vals["t"]) / (vals["n"] * F)
        steps = [
            f"Given: I = {_num(vals['I'])} A, t = {_num(vals['t'])} s, M = {_num(vals['M'])} g/mol, n = {_num(vals['n'])}",
            f"Formula: m = (M × I × t) / (n × F)",
            f"F = 96485 C/mol",
            f"Result: m = {_num(m)} g",
        ]
        return _result(steps, f"m = {_num(m)} g")

    return None


def solve_gas_law_chem(message: str) -> Optional[ComputeResult]:
    """Combined gas law, Boyle, Charles, Gay-Lussac"""
    if not any(kw in message for kw in ["boyle", "charles", "gay-lussac", "combined gas",
                                         "p1v1", "p2v2", "v1/t1"]):
        return None

    vals = _extract_numbers(message, {
        "P1": r'p1\s*=?\s*(\d+\.?\d*)',
        "P2": r'p2\s*=?\s*(\d+\.?\d*)',
        "V1": r'v1\s*=?\s*(\d+\.?\d*)',
        "V2": r'v2\s*=?\s*(\d+\.?\d*)',
        "T1": r't1\s*=?\s*(\d+\.?\d*)',
        "T2": r't2\s*=?\s*(\d+\.?\d*)',
    })

    # Boyle: P1V1 = P2V2
    if "P1" in vals and "V1" in vals and "P2" in vals and "V2" not in vals:
        V2 = vals["P1"] * vals["V1"] / vals["P2"]
        steps = [
            f"Given: P1 = {_num(vals['P1'])}, V1 = {_num(vals['V1'])}, P2 = {_num(vals['P2'])}",
            f"Formula: P1V1 = P2V2 (Boyle's Law)",
            f"Result: V2 = {_num(V2)}",
        ]
        return _result(steps, f"V2 = {_num(V2)}")

    # Charles: V1/T1 = V2/T2
    if "V1" in vals and "T1" in vals and "T2" in vals and "V2" not in vals:
        V2 = vals["V1"] * vals["T2"] / vals["T1"]
        steps = [
            f"Given: V1 = {_num(vals['V1'])}, T1 = {_num(vals['T1'])}, T2 = {_num(vals['T2'])}",
            f"Formula: V1/T1 = V2/T2 (Charles's Law)",
            f"Result: V2 = {_num(V2)}",
        ]
        return _result(steps, f"V2 = {_num(V2)}")

    # Combined: P1V1/T1 = P2V2/T2
    if all(k in vals for k in ["P1", "V1", "T1", "P2", "T2"]) and "V2" not in vals:
        V2 = vals["P1"] * vals["V1"] * vals["T2"] / (vals["T1"] * vals["P2"])
        steps = [
            f"Combined Gas Law: P1V1/T1 = P2V2/T2",
            f"Result: V2 = {_num(V2)}",
        ]
        return _result(steps, f"V2 = {_num(V2)}")

    return None


def solve_dilution(message: str) -> Optional[ComputeResult]:
    """M1V1 = M2V2"""
    if not any(kw in message for kw in ["dilution", "m1v1", "m2v2", "dilute",
                                         "m1", "m2", "v1", "v2"]):
        return None

    vals = _extract_numbers(message, {
        "M1": r'm1\s*=?\s*(\d+\.?\d*)',
        "V1": r'v1\s*=?\s*(\d+\.?\d*)',
        "M2": r'm2\s*=?\s*(\d+\.?\d*)',
        "V2": r'v2\s*=?\s*(\d+\.?\d*)',
    })

    # Also try "M1", "V1" uppercase
    for old_key, new_key, pat in [("M1", "M1u", r'M1\s*=?\s*(\d+\.?\d*)'),
                                   ("V1", "V1u", r'V1\s*=?\s*(\d+\.?\d*)'),
                                   ("M2", "M2u", r'M2\s*=?\s*(\d+\.?\d*)'),
                                   ("V2", "V2u", r'V2\s*=?\s*(\d+\.?\d*)')]:
        m = re.search(pat, message, re.IGNORECASE)
        if m and old_key not in vals:
            try:
                vals[old_key] = float(m.group(1))
            except (ValueError, IndexError):
                pass

    if len(vals) >= 3:
        if "M2" not in vals:
            M2 = vals["M1"] * vals["V1"] / vals["V2"]
            steps = [f"Formula: M1V1 = M2V2", f"Result: M2 = {_num(M2)}"]
            return _result(steps, f"M2 = {_num(M2)}")
        if "V2" not in vals:
            V2 = vals["M1"] * vals["V1"] / vals["M2"]
            steps = [f"Formula: M1V1 = M2V2", f"Result: V2 = {_num(V2)}"]
            return _result(steps, f"V2 = {_num(V2)}")
        if "V1" not in vals:
            V1 = vals["M2"] * vals["V2"] / vals["M1"]
            steps = [f"Formula: M1V1 = M2V2", f"Result: V1 = {_num(V1)}"]
            return _result(steps, f"V1 = {_num(V1)}")
        if "M1" not in vals:
            M1 = vals["M2"] * vals["V2"] / vals["V1"]
            steps = [f"Formula: M1V1 = M2V2", f"Result: M1 = {_num(M1)}"]
            return _result(steps, f"M1 = {_num(M1)}")

    return None


def solve_colligative(message: str) -> Optional[ComputeResult]:
    """ΔTb = Kb·m, ΔTf = Kf·m, π = MRT, osmotic pressure"""
    if not any(kw in message for kw in ["boiling point elevation", "freezing point depression",
                                         "osmotic pressure", "colligative", "delta tb",
                                         "delta tf", "δtb", "δtf"]):
        return None

    # Boiling point elevation
    if "boiling" in message:
        vals = _extract_numbers(message, {
            "Kb": r'kb\s*=?\s*(\d+\.?\d*)',
            "m": r'(?:molality|m)\s*=?\s*(\d+\.?\d*)\s*m\b',
        })
        if "Kb" in vals and "m" in vals:
            dTb = vals["Kb"] * vals["m"]
            steps = [
                f"Given: Kb = {_num(vals['Kb'])}, m = {_num(vals['m'])} molal",
                f"Formula: ΔTb = Kb × m",
                f"Result: ΔTb = {_num(dTb)} °C",
            ]
            return _result(steps, f"ΔTb = {_num(dTb)} °C")

    # Freezing point depression
    if "freezing" in message:
        vals = _extract_numbers(message, {
            "Kf": r'kf\s*=?\s*(\d+\.?\d*)',
            "m": r'(?:molality|m)\s*=?\s*(\d+\.?\d*)\s*m\b',
        })
        if "Kf" in vals and "m" in vals:
            dTf = vals["Kf"] * vals["m"]
            steps = [
                f"Given: Kf = {_num(vals['Kf'])}, m = {_num(vals['m'])} molal",
                f"Formula: ΔTf = Kf × m",
                f"Result: ΔTf = {_num(dTf)} °C",
            ]
            return _result(steps, f"ΔTf = {_num(dTf)} °C")

    # Osmotic pressure: π = MRT
    if "osmotic" in message:
        vals = _extract_numbers(message, {
            "M": r'(?:molarity|M)\s*=?\s*(\d+\.?\d*)\s*M\b',
            "T": r'(?:temperature|T)\s*=?\s*(\d+\.?\d*)\s*K\b',
        })
        if "M" in vals and "T" in vals:
            R = 0.0821  # L·atm/(mol·K)
            pi = vals["M"] * R * vals["T"]
            steps = [
                f"Given: M = {_num(vals['M'])} M, T = {_num(vals['T'])} K",
                f"Formula: π = MRT",
                f"R = 0.0821 L·atm/(mol·K)",
                f"Result: π = {_num(pi)} atm",
            ]
            return _result(steps, f"π = {_num(pi)} atm")

    return None


def solve_atomic_structure(message: str) -> Optional[ComputeResult]:
    """Energy levels: En = -13.6/n² eV (hydrogen), rn = 0.529n² Å"""
    if not any(kw in message for kw in ["bohr", "energy level", "orbital radius",
                                         "hydrogen atom", "rydberg"]):
        return None

    vals = _extract_numbers(message, {
        "n": r'(?:n|orbit|level)\s*=?\s*(\d+\.?\d*)',
        "n1": r'n1\s*=?\s*(\d+\.?\d*)',
        "n2": r'n2\s*=?\s*(\d+\.?\d*)',
    })

    # Energy of nth orbit: En = -13.6/n²
    if "n" in vals and "n1" not in vals:
        E = -13.6 / vals["n"]**2
        r = 0.529 * vals["n"]**2  # in Å
        steps = [
            f"Given: n = {_num(vals['n'])}",
            f"Formula: En = -13.6/n² eV (Bohr model, hydrogen)",
            f"Radius: rn = 0.529n² Å",
            f"Result: E{_num(vals['n'])} = {_num(E)} eV, r{_num(vals['n'])} = {_num(r)} Å",
        ]
        return _result(steps, f"E = {_num(E)} eV, r = {_num(r)} Å")

    # Rydberg formula: 1/λ = R(1/n1² - 1/n2²)
    if "n1" in vals and "n2" in vals:
        R = 1.097e7  # Rydberg constant in m⁻¹
        inv_lam = R * (1/vals["n1"]**2 - 1/vals["n2"]**2)
        lam = 1 / inv_lam
        lam_nm = lam * 1e9
        steps = [
            f"Given: n1 = {_num(vals['n1'])}, n2 = {_num(vals['n2'])}",
            f"Formula: 1/λ = R(1/n1² - 1/n2²)",
            f"R = 1.097×10⁷ m⁻¹",
            f"Result: λ = {_num(lam_nm)} nm",
        ]
        return _result(steps, f"λ = {_num(lam_nm)} nm")

    return None


def solve_radioactive_decay(message: str) -> Optional[ComputeResult]:
    """N = N0·e^(-λt), t½ = 0.693/λ"""
    if not any(kw in message for kw in ["radioactive", "decay", "half life", "half-life",
                                         "decay constant"]):
        return None

    # Half-life from decay constant
    if "decay constant" in message:
        vals = _extract_numbers(message, {
            "lambda": r'(?:decay\s+constant|lambda|λ)\s*=?\s*(\d+\.?\d*(?:e[+-]?\d+)?)',
        })
        if "lambda" in vals:
            t_half = 0.693 / vals["lambda"]
            steps = [
                f"Given: λ = {_num(vals['lambda'])} /s",
                f"Formula: t½ = 0.693 / λ",
                f"Result: t½ = {_num(t_half)} s",
            ]
            return _result(steps, f"t½ = {_num(t_half)} s")

    # Remaining amount: N = N0·e^(-λt)
    vals = _extract_numbers(message, {
        "N0": r'(?:n0|initial.*?(?:amount|activity))\s*=?\s*(\d+\.?\d*(?:e[+-]?\d+)?)',
        "lambda": r'(?:decay\s+constant|lambda|λ)\s*=?\s*(\d+\.?\d*(?:e[+-]?\d+)?)',
        "t": r'(?:time|t)\s*=?\s*(\d+\.?\d*(?:e[+-]?\d+)?)\s*s\b',
        "t_half": r'(?:half.?life|t½)\s*=?\s*(\d+\.?\d*(?:e[+-]?\d+)?)\s*s\b',
    })

    if "N0" in vals and "t" in vals:
        if "lambda" in vals:
            lam = vals["lambda"]
        elif "t_half" in vals:
            lam = 0.693 / vals["t_half"]
        else:
            return None

        N = vals["N0"] * math.exp(-lam * vals["t"])
        steps = [
            f"Given: N₀ = {_num(vals['N0'])}, λ = {_num(lam)}, t = {_num(vals['t'])} s",
            f"Formula: N = N₀·e^(-λt)",
            f"Result: N = {_num(N)}",
        ]
        return _result(steps, f"N = {_num(N)}")

    return None


def solve_thermochemistry(message: str) -> Optional[ComputeResult]:
    """q = mcΔT, ΔH = ΣΔH(products) - ΣΔH(reactants)"""
    if not any(kw in message for kw in ["enthalpy", "heat of reaction", "δh", "delta h",
                                         "thermochemistry", "heat capacity"]):
        return None

    vals = _extract_numbers(message, {
        "q": r'(?:heat|q)\s*=?\s*(\d+\.?\d*(?:e[+-]?\d+)?)\s*(?:j|kj)\b',
        "m": r'(?:mass|m)\s*=?\s*(\d+\.?\d*)\s*g\b',
        "c": r'(?:specific\s+heat|c)\s*=?\s*(\d+\.?\d*)\s*j/g',
        "dT": r'(?:δt|delta\s*t|dt)\s*=?\s*(\d+\.?\d*)',
    })

    if "m" in vals and "c" in vals and "dT" in vals:
        q = vals["m"] * vals["c"] * vals["dT"]
        steps = [
            f"Given: m = {_num(vals['m'])} g, c = {_num(vals['c'])} J/g°C, ΔT = {_num(vals['dT'])}°C",
            f"Formula: q = mcΔT",
            f"Result: q = {_num(q)} J",
        ]
        return _result(steps, f"q = {_num(q)} J")

    return None


# --------------------------------------------------------------------------- #
# All chemistry solvers
# --------------------------------------------------------------------------- #

CHEMISTRY_SOLVERS = [
    # More specific solvers first (so they don't get shadowed by general ones)
    solve_faraday,       # before solve_moles (both use mass + molar mass)
    solve_nernst,        # before solve_equilibrium
    solve_colligative,   # before solve_moles
    solve_radioactive_decay,  # before solve_kinetics (both use half-life)
    # General solvers
    solve_moles,
    solve_molarity,
    solve_pH,
    solve_equilibrium,
    solve_kinetics,
    solve_gas_law_chem,
    solve_dilution,
    solve_atomic_structure,
    solve_thermochemistry,
]
