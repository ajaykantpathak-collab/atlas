"""
solver_econ_c11.py — ISC Class 11 Economics Solver
Deterministic, step-by-step educational solver.
"""

import math
import re
import random
from decimal import Decimal, ROUND_HALF_UP
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Any, Union

import numpy as np
import pandas as pd
from scipy import stats
import sympy as sp


# ============================================================
#  RESULT CONTAINER
# ============================================================

@dataclass
class SolverResult:
    """Standardised result returned by every solver function."""
    function_name: str
    steps: List[str] = field(default_factory=list)
    result: Any = None
    verification: Optional[str] = None
    formula_used: str = ""
    input_summary: Dict[str, Any] = field(default_factory=dict)
    metadata: Dict[str, Any] = field(default_factory=dict)

    def __repr__(self) -> str:
        lines = [f"=== {self.function_name} ===", f"Formula : {self.formula_used}", ""]
        for i, step in enumerate(self.steps, 1):
            lines.append(f"  Step {i}: {step}")
        lines.append(f"\nResult  : {self.result}")
        if self.verification:
            lines.append(f"Verify  : {self.verification}")
        return "\n".join(lines)


# ============================================================
#  HELPERS
# ============================================================

def _add_step(result: SolverResult, text: str):
    result.steps.append(text)


def _round_val(val, decimals=4):
    if val is None:
        return None
    if isinstance(val, float):
        if math.isnan(val) or math.isinf(val):
            return str(val)
        return round(val, decimals)
    return val


def _build_input_summary(kwargs: dict) -> dict:
    """Create a JSON-safe snapshot of inputs."""
    safe = {}
    for k, v in kwargs.items():
        if isinstance(v, (list, tuple)):
            safe[k] = list(v)
        elif isinstance(v, np.ndarray):
            safe[k] = v.tolist()
        elif isinstance(v, pd.DataFrame):
            safe[k] = v.to_dict(orient="records")
        else:
            safe[k] = v
    return safe


# ============================================================
#  1. DATA COLLECTION
# ============================================================

def data_collection(raw_data: Union[List, str],
                    variable_name: str = "x") -> SolverResult:
    """
    Collect and structure raw data into a pandas Series with
    preliminary descriptive statistics.

    Parameters
    ----------
    raw_data : list or str
        Raw observations.  If str, split on whitespace / commas.
    variable_name : str
        Label for the variable.

    Returns
    -------
    SolverResult with structured Series and first-look stats.
    """
    result = SolverResult(
        function_name="data_collection",
        formula_used="Descriptive data structuring (no fixed formula)"
    )
    result.input_summary = {"variable_name": variable_name,
                            "raw_data_type": type(raw_data).__name__}

    # --- Parse -------------------------------------------------
    _add_step(result, f"Received raw data of type '{type(raw_data).__name__}'.")

    if isinstance(raw_data, str):
        tokens = re.split(r"[\s,;]+", raw_data.strip())
        data = []
        for t in tokens:
            if t == "":
                continue
            try:
                data.append(float(t))
            except ValueError:
                pass
        _add_step(result,
                  f"Parsed string → {len(data)} numeric values using regex split.")
    else:
        data = [float(x) for x in raw_data]
        _add_step(result,
                  f"Converted list/tuple → {len(data)} numeric values.")

    if len(data) == 0:
        _add_step(result, "WARNING: No valid numeric data found.")
        result.result = None
        result.verification = "Empty dataset."
        return result

    series = pd.Series(data, name=variable_name)
    n = len(series)
    _add_step(result, f"Total observations (n) = {n}")

    # --- Basic stats -------------------------------------------
    minimum = float(series.min())
    maximum = float(series.max())
    total = float(series.sum())
    _add_step(result,
              f"Minimum = {minimum}, Maximum = {maximum}")
    _add_step(result,
              f"Sum (Σx) = {total}")

    result.input_summary["n"] = n
    result.input_summary["min"] = minimum
    result.input_summary["max"] = maximum
    result.input_summary["sum"] = total

    output = {
        "series": series.to_list(),
        "n": n,
        "min": minimum,
        "max": maximum,
        "sum": total
    }
    result.result = output
    result.verification = (
        f"Sum check: {total} = {' + '.join(str(v) for v in series[:5])}"
        f"{' + ...' if n > 5 else ''}"
    )
    return result


# ============================================================
#  2. FREQUENCY DISTRIBUTION
# ============================================================

def frequency_dist(data: List[float],
                   num_classes: Optional[int] = None,
                   class_width: Optional[float] = None) -> SolverResult:
    """
    Build a grouped frequency distribution table.

    Parameters
    ----------
    data : list of float
        Raw observations.
    num_classes : int, optional
        Desired number of classes (Sturges' rule if None).
    class_width : float, optional
        Explicit class width (overrides Sturges).

    Returns
    -------
    SolverResult with frequency table.
    """
    result = SolverResult(
        function_name="frequency_dist",
        formula_used="Sturges' rule: k = 1 + 3.322 log₁₀(n)"
    )
    result.input_summary = _build_input_summary(
        {"data": data, "num_classes": num_classes, "class_width": class_width})

    series = pd.Series(data)
    n = len(series)
    _add_step(result, f"Number of observations n = {n}")

    # Sturges
    if num_classes is None:
        num_classes = max(1, int(1 + 3.322 * math.log10(n)))
        _add_step(result,
                  f"Sturges' rule: k = 1 + 3.322 × log₁₀({n}) = "
                  f"{num_classes}")
    else:
        _add_step(result, f"User-specified classes = {num_classes}")

    d_min = float(series.min())
    d_max = float(series.max())
    range_val = d_max - d_min
    _add_step(result, f"Range = Max − Min = {d_max} − {d_min} = {range_val}")

    if class_width is None:
        raw_w = range_val / num_classes
        class_width = math.ceil(raw_w) if raw_w > 0 else 1
        _add_step(result,
                  f"Class width = Range / k = {range_val}/{num_classes} "
                  f"= {raw_w:.4f} → rounded up to {class_width}")
    else:
        _add_step(result, f"User-specified class width = {class_width}")

    # Build classes
    lower = math.floor(d_min)
    if lower == d_min:
        lower -= 1
    lower = lower - (lower % int(class_width)) if class_width >= 1 else lower

    classes = []
    frequencies = []
    l = lower
    while l < d_max + class_width:
        u = l + class_width
        freq = int(((series >= l) & (series < u)).sum())
        # Include right boundary in last class
        if u >= d_max + class_width - 1e-9:
            freq = int((series >= l).sum())
        classes.append((l, u))
        frequencies.append(freq)
        l = u

    _add_step(result, f"Built {len(classes)} class intervals.")

    freq_table = pd.DataFrame({
        "Class Interval": [f"{c[0]} – {c[1]}" for c in classes],
        "Lower Limit": [c[0] for c in classes],
        "Upper Limit": [c[1] for c in classes],
        "Mid-Point (m)": [(c[0] + c[1]) / 2 for c in classes],
        "Frequency (f)": frequencies
    })

    total_f = sum(frequencies)
    _add_step(result, f"Total frequency Σf = {total_f} (should equal n={n})")

    result.result = {
        "frequency_table": freq_table.to_dict(orient="records"),
        "num_classes": len(classes),
        "class_width": class_width,
        "total_frequency": total_f
    }
    result.verification = f"Σf = {total_f}, n = {n} → {'✓ Match' if total_f == n else '✗ Mismatch'}"
    return result


# ============================================================
#  3. MEAN
# ============================================================

def mean(data: List[float],
         frequencies: Optional[List[int]] = None) -> SolverResult:
    """
    Arithmetic mean — raw or grouped (discrete / continuous).

    Parameters
    ----------
    data : list of float
        Raw values (x) or class mid-points (m).
    frequencies : list of int, optional
        Frequencies f.  If given → grouped mean.

    Returns
    -------
    SolverResult with mean value.
    """
    result = SolverResult(
        function_name="mean",
        formula_used=(
            "Raw:  x̄ = Σx / n        "
            "Grouped: x̄ = Σ(fm) / Σf"
        )
    )
    result.input_summary = _build_input_summary(
        {"data": data, "frequencies": frequencies})

    x = np.array(data, dtype=float)

    if frequencies is None:
        # ---- RAW MEAN -----------------------------------------
        _add_step(result, "Mode: RAW (ungrouped) data.")
        n = len(x)
        _add_step(result, f"n = {n}")
        total = float(np.sum(x))
        _add_step(result, f"Σx = {' + '.join(str(v) for v in x[:8])}"
                          f"{' + ...' if n > 8 else ''} = {total}")
        x_bar = total / n
        _add_step(result, f"x̄ = Σx / n = {total} / {n} = {x_bar}")
        result.result = _round_val(x_bar)
        result.verification = (
            f"Check: {x_bar} × {n} = {_round_val(x_bar * n)} ≈ {_round_val(total)}"
        )
    else:
        # ---- GROUPED MEAN -------------------------------------
        f = np.array(frequencies, dtype=float)
        _add_step(result, "Mode: GROUPED data (discrete or continuous).")
        n = int(np.sum(f))
        _add_step(result, f"Σf = {n}")

        fm = x * f
        total_fm = float(np.sum(fm))
        _add_step(result, f"Σ(fm) = {total_fm}")
        x_bar = total_fm / n
        _add_step(result, f"x̄ = Σ(fm) / Σf = {total_fm} / {n} = {x_bar}")

        result.result = _round_val(x_bar)
        result.verification = (
            f"Check: {x_bar} × {n} = {_round_val(x_bar * n)} ≈ {_round_val(total_fm)}"
        )

    return result


# ============================================================
#  4. MEDIAN
# ============================================================

def median(data: List[float],
           frequencies: Optional[List[int]] = None) -> SolverResult:
    """
    Median — raw or grouped (continuous).

    Parameters
    ----------
    data : list of float
        Raw values or class mid-points.
    frequencies : list of int, optional
        Frequencies for grouped data.

    Returns
    -------
    SolverResult with median.
    """
    result = SolverResult(
        function_name="median",
        formula_used=(
            "Raw (n odd):  M = (n+1)/2 th item     "
            "Raw (n even): M = avg of n/2 and (n/2+1)   "
            "Grouped:  M = L + [(N/2 − cf)/f] × h"
        )
    )
    result.input_summary = _build_input_summary(
        {"data": data, "frequencies": frequencies})

    x = np.array(data, dtype=float)

    if frequencies is None:
        # ---- RAW MEDIAN ---------------------------------------
        _add_step(result, "Mode: RAW (ungrouped) data.")
        sorted_x = np.sort(x)
        n = len(sorted_x)
        _add_step(result, f"Sorted data: {sorted_x[:8].tolist()}"
                          f"{'...' if n > 8 else ''}  (n={n})")

        if n % 2 == 1:
            pos = (n + 1) // 2
            _add_step(result, f"n is odd → position = (n+1)/2 = {pos}")
            M = float(sorted_x[pos - 1])
            _add_step(result, f"M = {pos}th item = {M}")
        else:
            pos1, pos2 = n // 2, n // 2 + 1
            _add_step(result,
                      f"n is even → positions = {pos1} and {pos2}")
            v1, v2 = float(sorted_x[pos1 - 1]), float(sorted_x[pos2 - 1])
            M = (v1 + v2) / 2
            _add_step(result,
                      f"M = ({v1} + {v2}) / 2 = {M}")

        result.result = _round_val(M)
        result.verification = f"n={n}, position checked → M={_round_val(M)}"
    else:
        # ---- GROUPED MEDIAN -----------------------------------
        f = np.array(frequencies, dtype=float)
        _add_step(result, "Mode: GROUPED continuous data.")
        N = int(np.sum(f))
        _add_step(result, f"N = Σf = {N},  N/2 = {N / 2}")

        cf = np.cumsum(f)
        _add_step(result, f"Cumulative frequencies: {cf.tolist()}")

        half = N / 2
        # find median class
        median_class_idx = int(np.searchsorted(cf, half))
        _add_step(result,
                  f"N/2 = {half} falls in class index {median_class_idx}")

        # Need class boundaries — assume x[i] = lower bound
        # We need upper = x[i+1] or user gives class_width
        L = float(x[median_class_idx])
        h = float(x[1] - x[0]) if len(x) > 1 else 1.0
        f_m = float(f[median_class_idx])
        cf_before = float(cf[median_class_idx] - f_m)
        _add_step(result,
                  f"Median class: L={L}, h={h}, f={f_m}, cf_before={cf_before}")

        M = L + ((half - cf_before) / f_m) * h
        _add_step(result,
                  f"M = {L} + [({half} − {cf_before}) / {f_m}] × {h}"
                  f" = {L} + {_round_val((half - cf_before) / f_m * h)} = {_round_val(M)}")

        result.result = _round_val(M)
        result.verification = f"Cumulative freq at median class = {int(cf[median_class_idx])}"
    return result


# ============================================================
#  5. MODE
# ============================================================

def mode(data: List[float],
         frequencies: Optional[List[int]] = None) -> SolverResult:
    """
    Mode — raw or grouped (discrete/continuous).

    Parameters
    ----------
    data : list of float
        Raw values or class mid-points.
    frequencies : list of int, optional
        Frequencies.

    Returns
    -------
    SolverResult with mode.
    """
    result = SolverResult(
        function_name="mode",
        formula_used=(
            "Raw: most frequent value          "
            "Grouped: Z = L + [Δ₁/(Δ₁+Δ₂)] × h"
        )
    )
    result.input_summary = _build_input_summary(
        {"data": data, "frequencies": frequencies})

    x = np.array(data, dtype=float)

    if frequencies is None:
        # ---- RAW MODE -----------------------------------------
        _add_step(result, "Mode: RAW data.")
        uniq, counts = np.unique(x, return_counts=True)
        _add_step(result,
                  f"Value frequencies: {list(zip(uniq.tolist(), counts.tolist()))}")
        max_idx = int(np.argmax(counts))
        Z = float(uniq[max_idx])
        _add_step(result,
                  f"Highest frequency = {counts[max_idx]} at value {Z}")
        result.result = _round_val(Z)
        result.verification = f"Mode = {_round_val(Z)} (occurs {counts[max_idx]} times)"
    else:
        # ---- GROUPED MODE -------------------------------------
        f = np.array(frequencies, dtype=float)
        _add_step(result, "Mode: GROUPED data.")
        max_idx = int(np.argmax(f))
        _add_step(result,
                  f"Modal class index = {max_idx} with f = {int(f[max_idx])}")

        L = float(x[max_idx])
        h = float(x[1] - x[0]) if len(x) > 1 else 1.0
        f1 = float(f[max_idx])
        f0 = float(f[max_idx - 1]) if max_idx > 0 else 0.0
        f2 = float(f[max_idx + 1]) if max_idx < len(f) - 1 else 0.0

        delta1 = f1 - f0
        delta2 = f1 - f2
        _add_step(result,
                  f"Δ₁ = f₁ − f₀ = {f1} − {f0} = {delta1}")
        _add_step(result,
                  f"Δ₂ = f₁ − f₂ = {f1} − {f2} = {delta2}")

        Z = L + (delta1 / (delta1 + delta2)) * h
        _add_step(result,
                  f"Z = {L} + ({delta1} / {delta1 + delta2}) × {h}"
                  f" = {L} + {_round_val(delta1 / (delta1 + delta2) * h)} = {_round_val(Z)}")

        result.result = _round_val(Z)
        result.verification = (
            f"Modal class freq {int(f1)} vs neighbours {int(f0)}, {int(f2)}"
        )
    return result


# ============================================================
#  6. STANDARD DEVIATION
# ============================================================

def std_dev(data: List[float],
            frequencies: Optional[List[int]] = None,
            sample: bool = True) -> SolverResult:
    """
    Standard deviation — raw or grouped.

    Parameters
    ----------
    data : list of float
        Raw values or mid-points.
    frequencies : list of int, optional
        Frequencies.
    sample : bool
        True → divide by (n-1), False → divide by n.

    Returns
    -------
    SolverResult with standard deviation.
    """
    result = SolverResult(
        function_name="std_dev",
        formula_used=(
            "Raw (sample): σ = √[Σ(x−x̄)²/(n−1)]     "
            "Grouped: σ = √[Σf(m−x̄)²/Σf]  (or actual method)"
        )
    )
    result.input_summary = _build_input_summary(
        {"data": data, "frequencies": frequencies, "sample": sample})

    x = np.array(data, dtype=float)

    if frequencies is None:
        _add_step(result, "Mode: RAW data.")
        n = len(x)
        x_bar = float(np.mean(x))
        _add_step(result, f"n = {n},  x̄ = {x_bar}")
        sq_devs = (x - x_bar) ** 2
        sum_sq = float(np.sum(sq_devs))
        divisor = n - 1 if sample else n
        _add_step(result,
                  f"Σ(x − x̄)² = {sum_sq},  divisor = {divisor}")
        var = sum_sq / divisor
        sd = math.sqrt(var)
        _add_step(result,
                  f"σ = √({sum_sq}/{divisor}) = √{var} = {_round_val(sd)}")
        result.formula_used = (
            f"σ = √[Σ(x−x̄)²/{divisor}]  (sample={sample})"
        )
        result.result = _round_val(sd)
        result.verification = f"σ² (variance) = {_round_val(var)}, σ = √{_round_val(var)} ≈ {_round_val(sd)}"
    else:
        _add_step(result, "Mode: GROUPED (actual / direct) method.")
        f = np.array(frequencies, dtype=float)
        N = float(np.sum(f))
        fx = f * x
        x_bar = float(np.sum(fx)) / N
        _add_step(result, f"N = Σf = {N},  x̄ = Σfm/N = {x_bar}")

        f_x_sq = f * (x ** 2)
        sum_f_x_sq = float(np.sum(f_x_sq))
        _add_step(result, f"Σf·x² = {sum_f_x_sq}")

        divisor = N - 1 if sample else N
        var = (sum_f_x_sq - (np.sum(fx) ** 2) / N) / divisor
        sd = math.sqrt(var)
        _add_step(result,
                  f"σ² = [Σf·x² − (Σf·x)²/N] / {divisor}"
                  f" = ({sum_f_x_sq} − {(np.sum(fx)**2)/N:.4f}) / {divisor}"
                  f" = {_round_val(var)}")
        _add_step(result, f"σ = √{_round_val(var)} = {_round_val(sd)}")
        result.formula_used = (
            f"σ = √[Σf·x² − (Σf·x)²/N]/{divisor}  (sample={sample})"
        )
        result.result = _round_val(sd)
        result.verification = f"Variance = {_round_val(var)}, SD = √{_round_val(var)} ≈ {_round_val(sd)}"

    return result


# ============================================================
#  7. VARIANCE
# ============================================================

def variance(data: List[float],
             frequencies: Optional[List[int]] = None,
             sample: bool = True) -> SolverResult:
    """
    Variance — raw or grouped.

    Parameters
    ----------
    data : list of float
        Raw values or mid-points.
    frequencies : list of int, optional
        Frequencies.
    sample : bool
        True → divide by n-1.

    Returns
    -------
    SolverResult with variance.
    """
    result = SolverResult(
        function_name="variance",
        formula_used=(
            "Raw (sample): σ² = Σ(x−x̄)²/(n−1)    "
            "Grouped: σ² = [Σf(m−x̄)²]/Σf"
        )
    )
    result.input_summary = _build_input_summary(
        {"data": data, "frequencies": frequencies, "sample": sample})

    # reuse std_dev logic
    sd_result = std_dev(data, frequencies, sample)
    variance_val = sd_result.result ** 2
    result.steps = sd_result.steps + [
        f"Variance = (SD)² = ({sd_result.result})² = {_round_val(variance_val)}"
    ]
    result.formula_used = sd_result.formula_used
    result.result = _round_val(variance_val)
    result.verification = (
        f"σ² = {_round_val(variance_val)},  √σ² = {sd_result.result}"
    )
    return result


# ============================================================
#  8. CORRELATION (Pearson product-moment)
# ============================================================

def correlation(x: List[float], y: List[float]) -> SolverResult:
    """
    Pearson correlation coefficient r.

    Parameters
    ----------
    x, y : list of float
        Paired observations.

    Returns
    -------
    SolverResult with r.
    """
    result = SolverResult(
        function_name="correlation",
        formula_used=(
            "r = [nΣxy − ΣxΣy] / "
            "√[nΣx² − (Σx)²] · √[nΣy² − (Σy)²]"
        )
    )
    result.input_summary = _build_input_summary({"x": x, "y": y})

    xa = np.array(x, dtype=float)
    ya = np.array(y, dtype=float)
    n = len(xa)
    _add_step(result, f"n = {n}")

    sx = float(np.sum(xa))
    sy = float(np.sum(ya))
    sx2 = float(np.sum(xa ** 2))
    sy2 = float(np.sum(ya ** 2))
    sxy = float(np.sum(xa * ya))
    _add_step(result, f"Σx = {sx}, Σy = {sy}")
    _add_step(result, f"Σx² = {sx2}, Σy² = {sy2}, Σxy = {sxy}")

    num = n * sxy - sx * sy
    den_x = math.sqrt(n * sx2 - sx ** 2)
    den_y = math.sqrt(n * sy2 - sy ** 2)
    r = num / (den_x * den_y)
    _add_step(result,
              f"Numerator  = {n}×{sxy} − {sx}×{sy} = {num}")
    _add_step(result,
              f"Denominator = √({n}×{sx2} − {sx}²) × √({n}×{sy2} − {sy}²)"
              f" = √{n*sx2 - sx**2} × √{n*sy2 - sy**2}"
              f" = {den_x:.4f} × {den_y:.4f}")
    _add_step(result, f"r = {num:.4f} / ({den_x:.4f} × {den_y:.4f}) = {_round_val(r)}")

    result.result = _round_val(r)
    # verification via numpy
    np_r = float(np.corrcoef(xa, ya)[0, 1])
    result.verification = f"numpy.corrcoef → {_round_val(np_r)} {'✓' if abs(np_r - r) < 1e-9 else '✗'}"
    return result


# ============================================================
#  9. KARL PEARSON'S COEFFICIENT OF CORRELATION
# ============================================================

def karl_pearson(x: List[float], y: List[float]) -> SolverResult:
    """
    Karl Pearson's coefficient of correlation.
    (Identical mathematical formula to Pearson r —
    this wrapper adds the ISC-step-by-step narrative.)

    Parameters
    ----------
    x, y : list of float

    Returns
    -------
    SolverResult with r.
    """
    result = SolverResult(
        function_name="karl_pearson",
        formula_used=(
            "r = [nΣxy − ΣxΣy] / "
            "√[(nΣx² − (Σx)²)(nΣy² − (Σy)²)]"
        )
    )
    # delegate to correlation but keep narrative steps
    inner = correlation(x, y)
    result.steps = [
        "Applying Karl Pearson's product-moment formula.",
        "Step 1: Compute Σx, Σy, Σx², Σy², Σxy."
    ] + inner.steps
    result.result = inner.result
    result.verification = inner.verification
    result.input_summary = inner.input_summary
    return result


# ============================================================
#  10. SPEARMAN'S RANK CORRELATION
# ============================================================

def spearman_rank(x: List[float], y: List[float],
                  ties_method: str = "average") -> SolverResult:
    """
    Spearman's rank correlation ρ.

    Parameters
    ----------
    x, y : list of float
    ties_method : str
        scipy rank tie-breaking method.

    Returns
    -------
    SolverResult with ρ.
    """
    result = SolverResult(
        function_name="spearman_rank",
        formula_used=(
            "ρ = 1 − [6Σd²] / [n(n² − 1)]   (no ties)    "
            "OR ρ from Spearman's general formula with ties"
        )
    )
    result.input_summary = _build_input_summary(
        {"x": x, "y": y, "ties_method": ties_method})

    xa = np.array(x, dtype=float)
    ya = np.array(y, dtype=float)
    n = len(xa)
    _add_step(result, f"n = {n}")

    # Rank the data
    rx = pd.Series(xa).rank(method=ties_method).to_numpy()
    ry = pd.Series(ya).rank(method=ties_method).to_numpy()
    _add_step(result,
              f"Ranks of X: {rx.tolist()}")
    _add_step(result,
              f"Ranks of Y: {ry.tolistist()}")

    d = rx - ry
    d2 = d ** 2
    sum_d2 = float(np.sum(d2))
    _add_step(result,
              f"d = R_x − R_y : {d.tolist()}")
    _add_step(result,
              f"d² : {d2.tolist()}")
    _add_step(result, f"Σd² = {sum_d2}")

    # Check for ties
    has_x_ties = len(xa) != len(set(x))
    has_y_ties = len(ya) != len(set(ya))

    if not has_x_ties and not has_y_ties:
        rho = 1 - (6 * sum_d2) / (n * (n ** 2 - 1))
        _add_step(result,
                  f"No ties → ρ = 1 − (6×{sum_d2}) / ({n}×({n}²−1))"
                  f" = {_round_val(rho)}")
    else:
        # Use scipy's spearmanr which handles ties correctly
        rho, _ = stats.spearmanr(xa, ya)
        _add_step(result,
                  f"Ties present → using Spearman's general formula.")
        _add_step(result, f"ρ = {_round_val(rho)}")

    result.result = _round_val(rho)
    # verification
    sp_rho, _ = stats.spearmanr(xa, ya)
    result.verification = (
        f"scipy.stats.spearmanr → {_round_val(float(sp_rho))}"
        f" {'✓' if abs(float(sp_rho) - rho) < 1e-9 else '✗'}"
    )
    return result


# ============================================================
#  11. INDEX NUMBER (Laspeyres, Paasche, Fisher)
# ============================================================

def index_number(p0: List[float], p1: List[float],
                 q0: List[float], q1: Optional[List[float]] = None,
                 method: str = "laspeyres") -> SolverResult:
    """
    Price index numbers.

    Parameters
    ----------
    p0 : list of float   Base-year prices
    p1 : list of float   Current-year prices
    q0 : list of float   Base-year quantities
    q1 : list of float, optional   Current-year quantities
    method : str
        'laspeyres', 'paasche', 'fisher', or 'all'.

    Returns
    -------
    SolverResult with index value(s).
    """
    result = SolverResult(
        function_name="index_number",
        formula_used={
            "laspeyres":  "P₀₁ᴸ = (Σp₁q₀ / Σp₀q₀) × 100",
            "paasche":    "P₀₁ᴾ = (Σp₁q₁ / Σp₀q₁) × 100",
            "fisher":     "P₀₁ᶠ = √(P₀₁ᴸ × P₀₁ᴾ) × 100",
            "all":        "All three"
        }.get(method, "")
    )
    result.input_summary = _build_input_summary(
        {"p0": p0, "p1": p1, "q0": q0, "q1": q1, "method": method})

    p0a = np.array(p0, dtype=float)
    p1a = np.array(p1, dtype=float)
    q0a = np.array(q0, dtype=float)

    sp0q0 = float(np.sum(p0a * q0a))
    sp1q0 = float(np.sum(p1a * q0a))
    _add_step(result, f"Σp₀q₀ = {sp0q0}")
    _add_step(result, f"Σp₁q₀ = {sp1q0}")

    laspeyres = (sp1q0 / sp0q0) * 100 if sp0q0 != 0 else float("nan")
    _add_step(result,
              f"Laspeyres P₀₁ᴸ = (Σp₁q₀ / Σp₀q₀) × 100"
              f" = ({sp1q0}/{sp0q0}) × 100 = {_round_val(laspeyres)}")

    output = {"laspeyres": laspeyres}

    if q1 is not None:
        q1a = np.array(q1, dtype=float)
        sp0q1 = float(np.sum(p0a * q1a))
        sp1q1 = float(np.sum(p1a * q1a))
        _add_step(result, f"Σp₀q₁ = {sp0q1},  Σp₁q₁ = {sp1q1}")

        paasche = (sp1q1 / sp0q1) * 100 if sp0q1 != 0 else float("nan")
        _add_step(result,
                  f"Paasche P₀₁ᴾ = (Σp₁q₁ / Σp₀q₁) × 100"
                  f" = ({sp1q1}/{sp0q1}) × 100 = {_round_val(paasche)}")
        output["paasche"] = paasche

        fisher = math.sqrt(laspeyres * paasche) if not (
            math.isnan(laspeyres) or math.isnan(paasche)) else float("nan")
        _add_step(result,
                  f"Fisher P₀₁ᶠ = √(P₀₁ᴸ × P₀₁ᴾ)"
                  f" = √({_round_val(laspeyres)} × {_round_val(paasche)})"
                  f" = {_round_val(fisher)}")
        output["fisher"] = fisher

    result.result = output
    result.verification = (
        f"Laspeyres={_round_val(laspeyres)}, "
        f"Paasche={_round_val(output.get('paasche', 'N/A'))}, "
        f"Fisher={_round_val(output.get('fisher', 'N/A'))}"
    )
    return result


# ============================================================
#  12. CPI (Consumer Price Index)
# ============================================================

def cpi(group_expenditure_base: List[float],
        group_expenditure_current: List[float],
        base_year_index: float = 100) -> SolverResult:
    """
    Compute CPI using aggregate expenditure method (Laspeyres-like).

    Parameters
    ----------
    group_expenditure_base : list of float
        Expenditure on each group in base year.
    group_expenditure_current : list of float
        Expenditure on each group in current year.
    base_year_index : float
        Index value to scale to (default 100).

    Returns
    -------
    SolverResult with CPI.
    """
    result = SolverResult(
        function_name="cpi",
        formula_used=(
            "CPI = (Σp₁q₀ / Σp₀q₀) × base_year_index   "
            "(Aggregate Expenditure Method)"
        )
    )
    result.input_summary = _build_input_summary({
        "group_expenditure_base": group_expenditure_base,
        "group_expenditure_current": group_expenditure_current,
        "base_year_index": base_year_index
    })

    e0 = np.array(group_expenditure_base, dtype=float)
    e1 = np.array(group_expenditure_current, dtype=float)
    n = len(e0)
    _add_step(result, f"Number of commodity groups = {n}")

    sum_e0 = float(np.sum(e0))
    sum_e1 = float(np.sum(e1))
    _add_step(result, f"ΣE₀ (base expenditure) = {sum_e0}")
    _add_step(result, f"ΣE₁ (current expenditure) = {sum_e1}")

    cpi_val = (sum_e1 / sum_e0) * base_year_index
    _add_step(result,
              f"CPI = (ΣE₁ / ΣE₀) × {base_year_index}"
              f" = ({sum_e1}/{sum_e0}) × {base_year_index}"
              f" = {_round_val(cpi_val)}")

    result.result = _round_val(cpi_val)
    result.verification = (
        f"Ratio = {_round_val(sum_e1 / sum_e0)},  "
        f"CPI = {_round_val(cpi_val)}"
    )
    return result


# ============================================================
#  13. WPI (Wholesale Price Index)
# ============================================================

def wpi(base_prices: List[float],
        current_prices: List[float],
        base_weights: Optional[List[float]] = None) -> SolverResult:
    """
    Wholesale Price Index using weighted or simple average.

    Parameters
    ----------
    base_prices : list of float
        Prices in base year (p₀).
    current_prices : list of float
        Prices in current year (p₁).
    base_weights : list of float, optional
        Weights w (e.g., production quantities). If None → simple avg.

    Returns
    -------
    SolverResult with WPI.
    """
    result = SolverResult(
        function_name="wpi",
        formula_used=(
            "Weighted: WPI = (Σw·p₁ / Σw·p₀) × 100    "
            "Simple:  WPI = (Σp₁ / Σp₀) × 100"
        )
    )
    result.input_summary = _build_input_summary({
        "base_prices": base_prices,
        "current_prices": current_prices,
        "base_weights": base_weights
    })

    p0 = np.array(base_prices, dtype=float)
    p1 = np.array(current_prices, dtype=float)
    n = len(p0)
    _add_step(result, f"Number of commodities = {n}")

    if base_weights is not None:
        w = np.array(base_weights, dtype=float)
        wp0 = float(np.sum(w * p0))
        wp1 = float(np.sum(w * p1))
        _add_step(result, f"Σw·p₀ = {wp0},  Σw·p₁ = {wp1}")
        wpi_val = (wp1 / wp0) * 100
        _add_step(result,
                  f"WPI = (Σw·p₁ / Σw·p₀) × 100"
                  f" = ({wp1}/{wp0}) × 100 = {_round_val(wpi_val)}")
    else:
        sp0 = float(np.sum(p0))
        sp1 = float(np.sum(p1))
        _add_step(result, f"Σp₀ = {sp0},  Σp₁ = {sp1}")
        wpi_val = (sp1 / sp0) * 100
        _add_step(result,
                  f"WPI = (Σp₁ / Σp₀) × 100"
                  f" = ({sp1}/{sp0}) × 100 = {_round_val(wpi_val)}")

    result.result = _round_val(wpi_val)
    result.verification = f"WPI = {_round_val(wpi_val)} (base=100)"
    return result


# ============================================================
#  14. LAW OF DEMAND
# ============================================================

def demand_law(price_levels: List[float],
               quantity_demanded: List[float]) -> SolverResult:
    """
    Illustrate the Law of Demand:
    inverse relationship between price and quantity demanded.

    Parameters
    ----------
    price_levels : list of float
    quantity_demanded : list of float

    Returns
    -------
    SolverResult with slope, equation, and direction check.
    """
    result = SolverResult(
        function_name="demand_law",
        formula_used=(
            "Demand function: Qd = a − bP    "
            "Slope = ΔQd / ΔP  (negative per law of demand)"
        )
    )
    result.input_summary = _build_input_summary({
        "price_levels": price_levels,
        "quantity_demanded": quantity_demanded
    })

    p = np.array(price_levels, dtype=float)
    q = np.array(quantity_demanded, dtype=float)
    n = len(p)
    _add_step(result, f"Data points: {n}")

    # Fit linear demand: Q = a + bP  (b expected negative)
    slope, intercept, r, p_val, se = stats.linregress(p, q)
    _add_step(result,
              f"OLS regression: Qd = {_round_val(intercept)} "
              f"+ ({_round_val(slope)}) × P")
    _add_step(result,
              f"Slope = {_round_val(slope)}  "
              f"{'→ INVERSE (✓ Law of Demand holds)' if slope < 0 else '→ DIRECT (✗ violates Law of Demand)'}")
    _add_step(result, f"R² = {_round_val(r**2)}")

    # Direction test
    deltas_p = np.diff(p)
    deltas_q = np.diff(q)
    concordant = np.sum(deltas_p * deltas_q < 0)
    _add_step(result,
              f"{concordant}/{n-1} price-quantity pairs move in opposite directions.")

    result.result = {
        "demand_equation": f"Qd = {round(intercept,4)} + ({round(slope,4)})P",
        "slope": _round_val(slope),
        "intercept": _round_val(intercept),
        "r_squared": _round_val(r ** 2),
        "law_of_demand_valid": bool(slope < 0)
    }
    result.verification = (
        f"Slope = {_round_val(slope)} → "
        f"{'Law of Demand SATISFIED' if slope < 0 else 'Law of Demand VIOLATED'}"
    )
    return result


# ============================================================
#  15. LAW OF SUPPLY
# ============================================================

def supply_law(price_levels: List[float],
               quantity_supplied: List[float]) -> SolverResult:
    """
    Illustrate the Law of Supply:
    direct relationship between price and quantity supplied.

    Parameters
    ----------
    price_levels : list of float
    quantity_supplied : list of float

    Returns
    -------
    SolverResult with slope, equation, and direction check.
    """
    result = SolverResult(
        function_name="supply_law",
        formula_used=(
            "Supply function: Qs = c + dP    "
            "Slope = ΔQs / ΔP  (positive per law of supply)"
        )
    )
    result.input_summary = _build_input_summary({
        "price_levels": price_levels,
        "quantity_supplied": quantity_supplied
    })

    p = np.array(price_levels, dtype=float)
    q = np.array(quantity_supplied, dtype=float)
    n = len(p)
    _add_step(result, f"Data points: {n}")

    slope, intercept, r, p_val, se = stats.linregress(p, q)
    _add_step(result,
              f"OLS regression: Qs = {_round_val(intercept)} "
              f"+ ({_round_val(slope)}) × P")
    _add_step(result,
              f"Slope = {_round_val(slope)}  "
              f"{'→ DIRECT (✓ Law of Supply holds)' if slope > 0 else '→ INVERSE (✗ violates Law of Supply)'}")
    _add_step(result, f"R² = {_round_val(r**2)}")

    deltas_p = np.diff(p)
    deltas_q = np.diff(q)
    concordant = np.sum(deltas_p * deltas_q > 0)
    _add_step(result,
              f"{concordant}/{n-1} price-quantity pairs move in the SAME direction.")

    result.result = {
        "supply_equation": f"Qs = {round(intercept,4)} + ({round(slope,4)})P",
        "slope": _round_val(slope),
        "intercept": _round_val(intercept),
        "r_squared": _round_val(r ** 2),
        "law_of_supply_valid": bool(slope > 0)
    }
    result.verification = (
        f"Slope = {_round_val(slope)} → "
        f"{'Law of Supply SATISFIED' if slope > 0 else 'Law of Supply VIOLATED'}"
    )
    return result


# ============================================================
#  16. ELASTICITY OF DEMAND (Price Elasticity)
# ============================================================

def elasticity_demand(price_initial: float, price_final: float,
                      quantity_initial: float, quantity_final: float,
                      method: str = "arc") -> SolverResult:
    """
    Price elasticity of demand.

    Parameters
    ----------
    price_initial, price_final : float
    quantity_initial, quantity_final : float
    method : str
        'arc'  → midpoint/arc elasticity (standard in ISC)
        'point' → point elasticity at initial point

    Returns
    -------
    SolverResult with Ed.
    """
    result = SolverResult(
        function_name="elasticity_demand",
        formula_used={
            "arc": "Ed = [(Q₂−Q₁)/(Q₂+Q₁)] / [(P₂−P₁)/(P₂+P₁)]   (midpoint)",
            "point": "Ed = (dQ/dP) × (P/Q)  at initial point"
        }.get(method, "")
    )
    result.input_summary = _build_input_summary({
        "price_initial": price_initial,
        "price_final": price_final,
        "quantity_initial": quantity_initial,
        "quantity_final": quantity_final,
        "method": method
    })

    p1, p2 = float(price_initial), float(price_final)
    q1, q2 = float(quantity_initial), float(quantity_final)
    dq = q2 - q1
    dp = p2 - p1
    avg_q = (q2 + q1) / 2
    avg_p = (p2 + p1) / 2

    _add_step(result,
              f"ΔQ = Q₂ − Q₁ = {q2} − {q1} = {dq}")
    _add_step(result,
              f"ΔP = P₂ − P₁ = {p2} − {p1} = {dp}")
    _add_step(result,
              f"Avg Q = (Q₂+Q₁)/2 = {avg_q},  Avg P = {avg_p}")

    if method == "arc":
        pct_q = dq / avg_q
        pct_p = dp / avg_p
        _add_step(result,
                  f"%ΔQ = ΔQ/AvgQ = {dq}/{avg_q} = {_round_val(pct_q)}")
        _add_step(result,
                  f"%ΔP = ΔP/AvgP = {dp}/{avg_p} = {_round_val(pct_p)}")
        if pct_p == 0:
            ed = float("inf")
        else:
            ed = pct_q / pct_p
        _add_step(result,
                  f"Ed = (%ΔQ / %ΔP) = {_round_val(pct_q)} / {_round_val(pct_p)}"
                  f" = {_round_val(ed)}")
    elif method == "point":
        # ΔQ/ΔP approximated from the two points
        dq_dp = dq / dp if dp != 0 else float("inf")
        _add_step(result,
                  f"dQ/dP ≈ ΔQ/ΔP = {dq}/{dp} = {_round_val(dq_dp)}")
        ed = dq_dp * (p1 / q1)
        _add_step(result,
                  f"Ed = (dQ/dP) × (P/Q) = {_round_val(dq_dp)} × ({p1}/{q1})"
                  f" = {_round_val(ed)}")
    else:
        raise ValueError(f"Unknown method: {method}")

    # Classification
    abs_ed = abs(ed)
    if math.isinf(abs_ed):
        classification = "Perfectly elastic / undefined"
    elif abs_ed > 1:
        classification = "Elastic demand (|Ed| > 1)"
    elif abs_ed == 1:
        classification = "Unitary elastic (|Ed| = 1)"
    elif abs_ed > 0:
        classification = "Inelastic demand (|Ed| < 1)"
    else:
        classification = "Perfectly inelastic (|Ed| = 0)"
    _add_step(result, f"Classification: {classification}")

    result.result = {
        "elasticity": _round_val(ed),
        "abs_elasticity": _round_val(abs_ed),
        "classification": classification
    }
    result.verification = (
        f"|Ed| = {_round_val(abs_ed)} → {classification}"
    )
    return result


# ============================================================
#  SOLVER REGISTRY
# ============================================================

SOLVER_REGISTRY: Dict[str, Any] = {
    "data_collection":       data_collection,
    "frequency_dist":        frequency_dist,
    "mean":                  mean,
    "median":                median,
    "mode":                  mode,
    "std_dev":               std_dev,
    "variance":              variance,
    "correlation":           correlation,
    "karl_pearson":          karl_pearson,
    "spearman_rank":         spearman_rank,
    "index_number":          index_number,
    "cpi":                   cpi,
    "wpi":                   wpi,
    "demand_law":            demand_law,
    "supply_law":            supply_law,
    "elasticity_demand":     elasticity_demand,
}


# ============================================================
#  DISPATCH HELPER
# ============================================================

def solve(function_name: str, **kwargs) -> SolverResult:
    """
    Dispatch a solver function by name.

    Example
    -------
    >>> solve("mean", data=[10, 20, 30])
    >>> solve("karl_pearson", x=[1,2,3], y=[4,5,6])
    """
    if function_name not in SOLVER_REGISTRY:
        raise KeyError(
            f"Unknown solver '{function_name}'. "
            f"Available: {list(SOLVER_REGISTRY.keys())}"
        )
    func = SOLVER_REGISTRY[function_name]
    return func(**kwargs)


# ============================================================
#  SELF-TEST  (runs only when executed directly)
# ============================================================

def _run_self_tests():
    """Quick smoke-tests for every registered function."""
    import time

    passed = 0
    failed = 0
    total = len(SOLVER_REGISTRY)

    print("=" * 60)
    print(f"SOLVER SELF-TEST  ({total} functions)")
    print("=" * 60)

    test_cases = {
        "data_collection":  dict(raw_data="10 20 30 40 50", variable_name="x"),
        "frequency_dist":   dict(data=[12, 15, 18, 21, 24, 27, 30, 33]),
        "mean":             dict(data=[10, 20, 30, 40, 50]),
        "median":           dict(data=[12, 15, 18, 21, 24, 27, 30]),
        "mode":             dict(data=[5, 7, 7, 9, 10, 7, 11]),
        "std_dev":          dict(data=[2, 4, 6, 8, 10]),
        "variance":         dict(data=[2, 4, 6, 8, 10]),
        "correlation":      dict(x=[1, 2, 3, 4, 5], y=[2, 4, 5, 4, 6]),
        "karl_pearson":     dict(x=[1, 2, 3, 4, 5], y=[10, 20, 30, 40, 50]),
        "spearman_rank":    dict(x=[1, 2, 3, 4, 5], y=[5, 4, 3, 2, 1]),
        "index_number":     dict(p0=[10, 20], p1=[12, 22], q0=[5, 8], q1=[6, 9]),
        "cpi":              dict(group_expenditure_base=[500, 300, 200],
                                 group_expenditure_current=[600, 330, 220]),
        "wpi":              dict(base_prices=[10, 20, 30],
                                 current_prices=[12, 22, 33]),
        "demand_law":       dict(price_levels=[10, 20, 30, 40],
                                 quantity_demanded=[100, 80, 60, 40]),
        "supply_law":       dict(price_levels=[10, 20, 30, 40],
                                 quantity_supplied=[20, 40, 60, 80]),
        "elasticity_demand":dict(price_initial=10, price_final=12,
                                 quantity_initial=100, quantity_final=80),
    }

    for name, kwargs in test_cases.items():
        t0 = time.time()
        try:
            res = solve(name, **kwargs)
            elapsed = time.time() - t0
            status = "✓ PASS" if res.result is not None else "⚠ NONE"
            print(f"  [{status}] {name:20s}  ({elapsed:.3f}s)")
            passed += 1
        except Exception as exc:
            elapsed = time.time() - t0
            print(f"  [✗ FAIL] {name:20s}  ({elapsed:.3f}s)  → {exc}")
            failed += 1

    print("-" * 60)
    print(f"  Passed: {passed}/{total}   Failed: {failed}/{total}")
    print("=" * 60)


if __name__ == "__main__":
    _run_self_tests()