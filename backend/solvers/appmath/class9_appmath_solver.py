"""
CISCE APPMATH Class 9 — Solver & Question Generator
Complete self-contained module covering the full ICSE Class 9 Applications of Mathematics syllabus.
"""

import math
import random
import fractions
import decimal
from fractions import Fraction
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Tuple, Union
from enum import Enum
import json

# ─────────────────────────────────────────────────────────────────────────────
#  SECTION 0 — Shared type definitions, seed helpers, verification primitives
# ─────────────────────────────────────────────────────────────────────────────

class QType(Enum):
    MCQ = "mcq"
    FILL_BLANK = "fill_blank"
    SHORT_ANSWER = "short_answer"
    LONG_ANSWER = "long_answer"
    NUMERICAL = "numerical"


def set_seed(seed: int) -> None:
    random.seed(seed)


def approx_eq(a: float, b: float, tol: float = 1e-4) -> bool:
    return abs(a - b) <= tol


def verify_roundtrip(name: str, computed, expected, tol=1e-4) -> Dict:
    diff = abs(float(computed) - float(expected))
    status = "PASS" if diff <= tol else "FAIL"
    return {"check": name, "computed": computed, "expected": expected,
            "diff": diff, "status": status}


# ─────────────────────────────────────────────────────────────────────────────
#  SECTION 1 — COMMERCIAL ARITHMETIC: PERCENTAGE, PROFIT & LOSS, DISCOUNT
# ─────────────────────────────────────────────────────────────────────────────

class PercentageSolver:

    @staticmethod
    def solve_percentage_increase(params: Dict) -> Dict:
        """Find new value after percentage increase."""
        original = params.get("original", 200)
        pct = params.get("percentage", 15)
        increase = original * pct / 100
        new_val = original + increase
        steps = [
            f"Step 1: Given original value = {original}, percentage increase = {pct}%",
            f"Step 2: Amount of increase = {original} × {pct}/100 = {increase}",
            f"Step 3: New value = {original} + {increase} = {new_val}",
        ]
        v1 = verify_roundtrip("increase", increase, original * pct / 100)
        v2 = verify_roundtrip("new_value", new_val, original + increase)
        return {"answer": new_val, "steps": steps, "verification": [v1, v2],
                "topic": "percentage_increase"}

    @staticmethod
    def solve_percentage_decrease(params: Dict) -> Dict:
        """Find new value after percentage decrease."""
        original = params.get("original", 500)
        pct = params.get("percentage", 20)
        decrease = original * pct / 100
        new_val = original - decrease
        steps = [
            f"Step 1: Given original value = {original}, percentage decrease = {pct}%",
            f"Step 2: Amount of decrease = {original} × {pct}/100 = {decrease}",
            f"Step 3: New value = {original} − {decrease} = {new_val}",
        ]
        v = verify_roundtrip("new_value", new_val, original - decrease)
        return {"answer": new_val, "steps": steps, "verification": [v],
                "topic": "percentage_decrease"}

    @staticmethod
    def solve_profit_percent(params: Dict) -> Dict:
        """Compute profit percentage."""
        cp = params.get("cost_price", 200)
        sp = params.get("selling_price", 260)
        profit = sp - cp
        profit_pct = (profit / cp) * 100
        steps = [
            f"Step 1: Cost Price (CP) = {cp}, Selling Price (SP) = {sp}",
            f"Step 2: Profit = SP − CP = {sp} − {cp} = {profit}",
            f"Step 3: Profit % = (Profit / CP) × 100 = ({profit}/{cp}) × 100 = {profit_pct}%",
        ]
        v1 = verify_roundtrip("profit", profit, sp - cp)
        v2 = verify_roundtrip("profit_pct", profit_pct, (sp - cp) / cp * 100)
        return {"answer": profit_pct, "steps": steps, "verification": [v1, v2],
                "topic": "profit_percentage"}

    @staticmethod
    def solve_loss_percent(params: Dict) -> Dict:
        """Compute loss percentage."""
        cp = params.get("cost_price", 300)
        sp = params.get("selling_price", 240)
        loss = cp - sp
        loss_pct = (loss / cp) * 100
        steps = [
            f"Step 1: Cost Price (CP) = {cp}, Selling Price (SP) = {sp}",
            f"Step 2: Since SP < CP, there is a loss.",
            f"Step 3: Loss = CP − SP = {cp} − {sp} = {loss}",
            f"Step 4: Loss % = (Loss / CP) × 100 = ({loss}/{cp}) × 100 = {loss_pct}%",
        ]
        v1 = verify_roundtrip("loss", loss, cp - sp)
        v2 = verify_roundtrip("loss_pct", loss_pct, (cp - sp) / cp * 100)
        return {"answer": loss_pct, "steps": steps, "verification": [v1, v2],
                "topic": "loss_percentage"}

    @staticmethod
    def solve_discount(params: Dict) -> Dict:
        """Compute discount, discount %, and selling price."""
        mp = params.get("marked_price", 1000)
        d = params.get("discount", 150)
        dp = mp - d
        discount_pct = (d / mp) * 100
        steps = [
            f"Step 1: Marked Price (MP) = {mp}, Discount = {d}",
            f"Step 2: Selling Price = MP − Discount = {mp} − {d} = {dp}",
            f"Step 3: Discount % = (Discount / MP) × 100 = ({d}/{mp}) × 100 = {discount_pct:.2f}%",
        ]
        v1 = verify_roundtrip("selling_price", dp, mp - d)
        v2 = verify_roundtrip("discount_pct", discount_pct, d / mp * 100)
        return {"answer": {"selling_price": dp, "discount_pct": discount_pct},
                "steps": steps, "verification": [v1, v2],
                "topic": "discount"}

    @staticmethod
    def solve_find_mp_from_discount(params: Dict) -> Dict:
        """Find marked price given discount percentage and selling price."""
        sp = params.get("selling_price", 850)
        discount_pct = params.get("discount_pct", 15)
        mp = sp * 100 / (100 - discount_pct)
        discount = mp - sp
        steps = [
            f"Step 1: SP = {sp}, Discount % = {discount_pct}%",
            f"Step 2: SP = MP × (100 − discount%)/100  =>  MP = SP × 100 / (100 − {discount_pct})",
            f"Step 3: MP = {sp} × 100 / {100 - discount_pct} = {mp:.2f}",
            f"Step 4: Discount = MP − SP = {mp:.2f} − {sp} = {discount:.2f}",
        ]
        v = verify_roundtrip("mp", mp, sp * 100 / (100 - discount_pct))
        return {"answer": mp, "steps": steps, "verification": [v],
                "topic": "find_mp_from_discount"}


# ─────────────────────────────────────────────────────────────────────────────
#  SECTION 2 — TAXES: VAT / GST (INDIAN CONTEXT)
# ─────────────────────────────────────────────────────────────────────────────

class TaxSolver:

    @staticmethod
    def solve_vat_inclusive(params: Dict) -> Dict:
        """Find VAT amount and original price when price is VAT-inclusive."""
        price_incl = params.get("price_inclusive", 1180)
        vat_pct = params.get("vat_pct", 18)
        original = price_incl * 100 / (100 + vat_pct)
        vat_amt = price_incl - original
        steps = [
            f"Step 1: Price inclusive of VAT = {price_incl}, VAT % = {vat_pct}%",
            f"Step 2: Original Price = {price_incl} × 100 / (100 + {vat_pct}) = {original:.2f}",
            f"Step 3: VAT amount = {price_incl} − {original:.2f} = {vat_amt:.2f}",
        ]
        v1 = verify_roundtrip("original_price", original, price_incl * 100 / (100 + vat_pct))
        v2 = verify_roundtrip("vat_amount", vat_amt, price_incl - original)
        return {"answer": {"original_price": original, "vat_amount": vat_amt},
                "steps": steps, "verification": [v1, v2],
                "topic": "vat_inclusive"}

    @staticmethod
    def solve_price_after_vat(params: Dict) -> Dict:
        """Find price after adding VAT to a base price (Indian GST context)."""
        base_price = params.get("base_price", 1000)
        gst_pct = params.get("gst_pct", 18)
        gst_amt = base_price * gst_pct / 100
        final_price = base_price + gst_amt
        steps = [
            f"Step 1: Base Price = {base_price}, GST % = {gst_pct}%",
            f"Step 2: GST Amount = {base_price} × {gst_pct}/100 = {gst_amt}",
            f"Step 3: Final Price = {base_price} + {gst_amt} = {final_price}",
        ]
        v1 = verify_roundtrip("gst_amt", gst_amt, base_price * gst_pct / 100)
        v2 = verify_roundtrip("final_price", final_price, base_price + gst_amt)
        return {"answer": final_price, "steps": steps, "verification": [v1, v2],
                "topic": "gst_forward"}


# ─────────────────────────────────────────────────────────────────────────────
#  SECTION 3 — BANKING: SAVINGS ACCOUNT, RECURRING DEPOSIT
# ─────────────────────────────────────────────────────────────────────────────

class BankingSolver:

    @staticmethod
    def solve_simple_interest(params: Dict) -> Dict:
        """Simple interest: find SI, or amount."""
        p = params.get("principal", 5000)
        r = params.get("rate", 8)
        t = params.get("time_years", 3)
        si = p * r * t / 100
        amount = p + si
        steps = [
            f"Step 1: Principal (P) = {p}, Rate (R) = {r}% per annum, Time (T) = {t} years",
            f"Step 2: Simple Interest (SI) = P × R × T / 100 = {p} × {r} × {t} / 100 = {si}",
            f"Step 3: Amount (A) = P + SI = {p} + {si} = {amount}",
        ]
        v1 = verify_roundtrip("si", si, p * r * t / 100)
        v2 = verify_roundtrip("amount", amount, p + si)
        return {"answer": {"simple_interest": si, "amount": amount},
                "steps": steps, "verification": [v1, v2],
                "topic": "simple_interest"}

    @staticmethod
    def solve_compound_interest(params: Dict) -> Dict:
        """Compound interest annually."""
        p = params.get("principal", 8000)
        r = params.get("rate", 10)
        t = params.get("time_years", 2)
        n = params.get("compounding_annually", 1)
        amount = p * (1 + r / (100 * n)) ** (n * t)
        ci = amount - p
        steps = [
            f"Step 1: Principal (P) = {p}, Rate (R) = {r}%, Time (nT) = {n * t} years",
            f"Step 2: Amount A = P(1 + R/100)^(nT) = {p} × (1 + {r}/100)^({n * t})",
            f"         A = {p} × ({(1 + r / 100):.4f})^{n * t} = {amount:.2f}",
            f"Step 3: Compound Interest = A − P = {amount:.2f} − {p} = {ci:.2f}",
        ]
        v = verify_roundtrip("amount", amount, p * (1 + r / 100) ** t)
        return {"answer": {"compound_interest": ci, "amount": amount},
                "steps": steps, "verification": [v],
                "topic": "compound_interest"}

    @staticmethod
    def solve_recurring_deposit(params: Dict) -> Dict:
        """Recurring Deposit (RD) maturity value — Indian banking context."""
        monthly_deposit = params.get("monthly_deposit", 500)
        rate = params.get("rate", 8)  # % per annum
        months = params.get("months", 24)
        # Standard formula: M = P * n + P * n(n+1) * r / (2400)
        # r is rate per annum in percent
        interest_component = monthly_deposit * months * (months + 1) * rate / 2400
        maturity = monthly_deposit * months + interest_component
        steps = [
            f"Step 1: Monthly instalment (P) = ₹{monthly_deposit}, Rate (R) = {rate}% p.a., Time = {months} months",
            f"Step 2: Total deposits = P × n = {monthly_deposit} × {months} = {monthly_deposit * months}",
            f"Step 3: Interest = P × n(n+1) × R / 2400",
            f"         = {monthly_deposit} × {months} × {months + 1} × {rate} / 2400",
            f"         = {interest_component:.2f}",
            f"Step 4: Maturity Value = Total deposits + Interest = {monthly_deposit * months} + {interest_component:.2f} = {maturity:.2f}",
        ]
        v = verify_roundtrip("maturity_value", maturity,
                             monthly_deposit * months + interest_component)
        return {"answer": maturity, "steps": steps, "verification": [v],
                "topic": "recurring_deposit"}

    @staticmethod
    def solve_time_double_simple(params: Dict) -> Dict:
        """Years to double money at simple interest (Indian context)."""
        rate = params.get("rate", 10)
        # At SI, money doubles when SI = P => P*R*T/100 = P => T = 100/R
        years = 100 / rate
        steps = [
            f"Step 1: For money to double at SI: SI = Principal => P × R × T / 100 = P",
            f"Step 2: R × T / 100 = 1  =>  T = 100 / R = 100 / {rate} = {years} years",
        ]
        v = verify_roundtrip("years", years, 100 / rate)
        return {"answer": years, "steps": steps, "verification": [v],
                "topic": "time_to_double"}


# ─────────────────────────────────────────────────────────────────────────────
#  SECTION 4 — TIME, DISTANCE, SPEED (Indian context: trains, buses)
# ─────────────────────────────────────────────────────────────────────────────

class TimeDistanceSolver:

    @staticmethod
    def solve_speed_distance_time(params: Dict) -> Dict:
        """Given any two of speed, distance, time, find the third."""
        known = params.get("known", {})
        speed = known.get("speed")
        distance = known.get("distance")
        time_h = known.get("time_hours")
        steps = []
        if distance is None and speed is not None and time_h is not None:
            distance = speed * time_h
            steps.append(f"Step 1: Distance = Speed × Time = {speed} × {time_h} = {distance}")
            topic = "find_distance"
        elif speed is None and distance is not None and time_h is not None:
            speed = distance / time_h
            steps.append(f"Step 1: Speed = Distance / Time = {distance} / {time_h} = {speed}")
            topic = "find_speed"
        elif time_h is None and distance is not None and speed is not None:
            time_h = distance / speed
            steps.append(f"Step 1: Time = Distance / Speed = {distance} / {speed} = {time_h} hours")
            topic = "find_time"
        else:
            return {"error": "Provide exactly two of speed, distance, time_hours"}
        return {"answer": {"speed": speed, "distance": distance, "time_hours": time_h},
                "steps": steps, "verification": [], "topic": topic}

    @staticmethod
    def solve_train_problem(params: Dict) -> Dict:
        """Train crossing a platform — Indian context."""
        train_length = params.get("train_length_m", 120)
        platform_length = params.get("platform_length_m", 80)
        speed_kmh = params.get("speed_kmph", 54)
        total_length = train_length + platform_length
        speed_ms = speed_kmh * 1000 / 3600
        time_s = total_length / speed_ms
        steps = [
            f"Step 1: Train length = {train_length} m, Platform length = {platform_length} m",
            f"Step 2: Total distance to cover = {train_length} + {platform_length} = {total_length} m",
            f"Step 3: Speed = {speed_kmh} km/h = {speed_kmh} × 1000/3600 = {speed_ms:.2f} m/s",
            f"Step 4: Time = Distance / Speed = {total_length} / {speed_ms:.2f} = {time_s:.2f} seconds",
        ]
        v = verify_roundtrip("time_s", time_s, total_length / speed_ms)
        return {"answer": time_s, "steps": steps, "verification": [v],
                "topic": "train_platform"}


# ─────────────────────────────────────────────────────────────────────────────
#  SECTION 5 — MENSURATION (Square, Rectangle, Triangle, Circle, Cube, Cuboid)
# ─────────────────────────────────────────────────────────────────────────────

class MensurationSolver:

    @staticmethod
    def solve_rectangle(params: Dict) -> Dict:
        """Rectangle: given sides find area and perimeter."""
        length = params.get("length", 12)
        breadth = params.get("breadth", 5)
        area = length * breadth
        perimeter = 2 * (length + breadth)
        diagonal = math.sqrt(length ** 2 + breadth ** 2)
        steps = [
            f"Step 1: Length (l) = {length}, Breadth (b) = {breadth}",
            f"Step 2: Area = l × b = {length} × {breadth} = {area} sq. units",
            f"Step 3: Perimeter = 2(l + b) = 2({length} + {breadth}) = {perimeter} units",
            f"Step 4: Diagonal = √(l² + b²) = √({length}² + {breadth}²) = {diagonal:.4f} units",
        ]
        v = verify_roundtrip("diagonal", diagonal, math.sqrt(length**2 + breadth**2))
        return {"answer": {"area": area, "perimeter": perimeter, "diagonal": diagonal},
                "steps": steps, "verification": [v],
                "topic": "rectangle"}

    @staticmethod
    def solve_square(params: Dict) -> Dict:
        """Square: given side find area, perimeter, diagonal."""
        side = params.get("side", 10)
        area = side ** 2
        perimeter = 4 * side
        diagonal = side * math.sqrt(2)
        steps = [
            f"Step 1: Side (a) = {side}",
            f"Step 2: Area = a² = {side}² = {area} sq. units",
            f"Step 3: Perimeter = 4a = 4 × {side} = {perimeter} units",
            f"Step 4: Diagonal = a√2 = {side} × √2 = {diagonal:.4f} units",
        ]
        v = verify_roundtrip("diagonal", diagonal, side * math.sqrt(2))
        return {"answer": {"area": area, "perimeter": perimeter, "diagonal": diagonal},
                "steps": steps, "verification": [v],
                "topic": "square"}

    @staticmethod
    def solve_triangle_heron(params: Dict) -> Dict:
        """Triangle area using Heron's formula."""
        a = params.get("side_a", 13)
        b = params.get("side_b", 14)
        c = params.get("side_c", 15)
        s = (a + b + c) / 2
        area = math.sqrt(s * (s - a) * (s - b) * (s - c))