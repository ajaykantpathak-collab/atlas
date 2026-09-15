"""formulas_maths_6_8.py -- Class 6-8 maths formulas.

Pure functions registered in the formula_registry. Each formula
declares its input dimensions and output dimension. Matching is
by dimension satisfaction, not regex.

NCERT chapters covered:
  Class 6: Knowing Our Numbers, Whole Numbers, Playing with Numbers,
           Basic Geometrical Ideas, Integers, Fractions, Decimals,
           Data Handling, Mensuration, Ratio and Proportion
  Class 7: Integers, Fractions and Decimals, Data Handling, Simple
           Equations, Lines and Angles, Triangle and its Properties,
           Comparing Quantities, Rational Numbers, Perimeter and
           Area, Algebraic Expressions, Exponents and Powers
  Class 8: Rational Numbers, Linear Equations, Understanding
           Quadrilaterals, Data Handling, Squares and Square Roots,
           Cubes and Cube Roots, Comparing Quantities, Algebraic
           Expressions, Mensuration, Exponents and Powers, Direct
           and Inverse Proportions, Factorisation, Introduction to
           Graphs
"""
from __future__ import annotations

import math

from backend.its.solver.formula_registry import register


# --------------------------------------------------------------------------- #
# Class 6: Arithmetic and Number Theory
# --------------------------------------------------------------------------- #

@register(
    id="ARITH_ADD",
    subject="maths",
    classes=[6, 7, 8],
    chapter="integers",
    inputs={"a": "number", "b": "number"},
    output="number",
    intent_words=["sum", "add", "total", "altogether"],
    description="a + b",
)
def arith_add(a: float, b: float) -> float:
    return a + b


@register(
    id="ARITH_SUBTRACT",
    subject="maths",
    classes=[6, 7, 8],
    chapter="integers",
    inputs={"a": "number", "b": "number"},
    output="number",
    intent_words=["difference", "subtract", "less than", "remaining"],
    description="a - b",
)
def arith_subtract(a: float, b: float) -> float:
    return a - b


@register(
    id="ARITH_MULTIPLY",
    subject="maths",
    classes=[6, 7, 8],
    chapter="integers",
    inputs={"a": "number", "b": "number"},
    output="number",
    intent_words=["product", "multiply", "times"],
    description="a * b",
)
def arith_multiply(a: float, b: float) -> float:
    return a * b


@register(
    id="ARITH_DIVIDE",
    subject="maths",
    classes=[6, 7, 8],
    chapter="integers",
    inputs={"a": "number", "b": "number"},
    output="number",
    intent_words=["quotient", "divide", "per", "ratio"],
    description="a / b",
)
def arith_divide(a: float, b: float) -> float:
    if b == 0:
        raise ValueError("division by zero")
    return a / b


@register(
    id="LCM",
    subject="maths",
    classes=[6, 7, 8],
    chapter="playing_with_numbers",
    inputs={"a": "number", "b": "number"},
    output="number",
    intent_words=["LCM", "least common multiple"],
    description="LCM(a, b)",
)
def lcm(a: float, b: float) -> float:
    a, b = int(a), int(b)
    if a <= 0 or b <= 0:
        raise ValueError("LCM needs positive integers")
    return float(abs(a * b) // math.gcd(a, b))


@register(
    id="HCF",
    subject="maths",
    classes=[6, 7, 8],
    chapter="playing_with_numbers",
    inputs={"a": "number", "b": "number"},
    output="number",
    intent_words=["HCF", "GCD", "highest common factor",
                   "greatest common divisor"],
    description="HCF(a, b)",
)
def hcf(a: float, b: float) -> float:
    a, b = int(a), int(b)
    if a <= 0 or b <= 0:
        raise ValueError("HCF needs positive integers")
    return float(math.gcd(a, b))


# --------------------------------------------------------------------------- #
# Class 6-8: Ratio and Proportion
# --------------------------------------------------------------------------- #

@register(
    id="RATIO_DIVIDE",
    subject="maths",
    classes=[6, 7, 8],
    chapter="ratio_and_proportion",
    inputs={"total": "number", "a": "number", "b": "number"},
    output="number",
    intent_words=["divide", "ratio", "share", "distributed"],
    description="part = total * a / (a + b)",
)
def ratio_divide(total: float, a: float, b: float) -> float:
    denom = a + b
    if denom == 0:
        raise ValueError("ratio sum cannot be zero")
    return total * a / denom


@register(
    id="UNITARY_METHOD",
    subject="maths",
    classes=[6, 7, 8],
    chapter="ratio_and_proportion",
    inputs={"price_n": "money", "n": "number", "m": "number"},
    output="money",
    intent_words=["cost", "price", "unitary", "if n items cost"],
    description="price_m = price_n / n * m",
)
def unitary_method(price_n: float, n: float, m: float) -> float:
    if n == 0:
        raise ValueError("n cannot be zero")
    return price_n / n * m


# --------------------------------------------------------------------------- #
# Class 7-8: Comparing Quantities (Percentages)
# --------------------------------------------------------------------------- #

@register(
    id="PERCENT_OF",
    subject="maths",
    classes=[7, 8],
    chapter="comparing_quantities",
    inputs={"base": "number", "pct": "percentage"},
    output="number",
    intent_words=["percent of", "percentage of", "% of"],
    description="value = base * pct / 100",
)
def percent_of(base: float, pct: float) -> float:
    return base * pct / 100.0


@register(
    id="PERCENT_CHANGE",
    subject="maths",
    classes=[7, 8],
    chapter="comparing_quantities",
    inputs={"old": "number", "new": "number"},
    output="percentage",
    intent_words=["percent change", "percentage change",
                   "percent increase", "percent decrease",
                   "% increase", "% decrease"],
    description="pct = (new - old) / old * 100",
)
def percent_change(old: float, new: float) -> float:
    if old == 0:
        raise ValueError("old value cannot be zero")
    return (new - old) / old * 100.0


@register(
    id="PERCENT_INCREASE",
    subject="maths",
    classes=[7, 8],
    chapter="comparing_quantities",
    inputs={"base": "number", "pct": "percentage"},
    output="number",
    intent_words=["increase", "after increase", "raised by"],
    description="new = base * (1 + pct/100)",
)
def percent_increase(base: float, pct: float) -> float:
    return base * (1.0 + pct / 100.0)


@register(
    id="PERCENT_DECREASE",
    subject="maths",
    classes=[7, 8],
    chapter="comparing_quantities",
    inputs={"base": "number", "pct": "percentage"},
    output="number",
    intent_words=["decrease", "after decrease", "reduced by",
                   "discounted by"],
    description="new = base * (1 - pct/100)",
)
def percent_decrease(base: float, pct: float) -> float:
    return base * (1.0 - pct / 100.0)


# --------------------------------------------------------------------------- #
# Class 7-8: Profit, Loss, Discount (Maths + Commerce shared)
# --------------------------------------------------------------------------- #

@register(
    id="PROFIT",
    subject="commerce",
    classes=[7, 8, 9, 10],
    chapter="comparing_quantities",
    inputs={"sp": "money", "cp": "money"},
    output="money",
    intent_words=["profit", "gain"],
    description="profit = SP - CP",
)
def profit(sp: float, cp: float) -> float:
    return sp - cp


@register(
    id="LOSS",
    subject="commerce",
    classes=[7, 8, 9, 10],
    chapter="comparing_quantities",
    inputs={"sp": "money", "cp": "money"},
    output="money",
    intent_words=["loss"],
    description="loss = CP - SP",
)
def loss(sp: float, cp: float) -> float:
    return cp - sp


@register(
    id="PROFIT_PERCENT",
    subject="commerce",
    classes=[7, 8, 9, 10],
    chapter="comparing_quantities",
    inputs={"sp": "money", "cp": "money"},
    output="percentage",
    intent_words=["profit percent", "profit %", "gain percent"],
    description="profit% = (SP - CP) / CP * 100",
)
def profit_percent(sp: float, cp: float) -> float:
    if cp == 0:
        raise ValueError("cost price cannot be zero")
    return (sp - cp) / cp * 100.0


@register(
    id="LOSS_PERCENT",
    subject="commerce",
    classes=[7, 8, 9, 10],
    chapter="comparing_quantities",
    inputs={"sp": "money", "cp": "money"},
    output="percentage",
    intent_words=["loss percent", "loss %"],
    description="loss% = (CP - SP) / CP * 100",
)
def loss_percent(sp: float, cp: float) -> float:
    if cp == 0:
        raise ValueError("cost price cannot be zero")
    return (cp - sp) / cp * 100.0


@register(
    id="DISCOUNT_PRICE",
    subject="commerce",
    classes=[7, 8, 9, 10],
    chapter="comparing_quantities",
    inputs={"mp": "money", "discount_pct": "percentage"},
    output="money",
    intent_words=["discount", "selling price after discount",
                   "paid after discount"],
    description="SP = MP * (1 - discount/100)",
)
def discount_price(mp: float, discount_pct: float) -> float:
    return mp * (1.0 - discount_pct / 100.0)


@register(
    id="MARKED_PRICE",
    subject="commerce",
    classes=[7, 8, 9, 10],
    chapter="comparing_quantities",
    inputs={"sp": "money", "discount_pct": "percentage"},
    output="money",
    intent_words=["marked price", "list price", "original price"],
    description="MP = SP / (1 - discount/100)",
)
def marked_price(sp: float, discount_pct: float) -> float:
    if discount_pct == 100:
        raise ValueError("discount cannot be 100%")
    return sp / (1.0 - discount_pct / 100.0)


# --------------------------------------------------------------------------- #
# Class 7-8: Simple and Compound Interest
# --------------------------------------------------------------------------- #

@register(
    id="SIMPLE_INTEREST",
    subject="commerce",
    classes=[7, 8, 9, 10],
    chapter="comparing_quantities",
    inputs={"principal": "money", "rate": "percentage",
            "time": "time"},
    output="money",
    intent_words=["simple interest", "SI"],
    description="SI = P * R * T / 100",
)
def simple_interest(principal: float, rate: float,
                     time: float) -> float:
    return principal * rate * time / 100.0


@register(
    id="COMPOUND_AMOUNT",
    subject="commerce",
    classes=[8, 9, 10],
    chapter="comparing_quantities",
    inputs={"principal": "money", "rate": "percentage",
            "time": "number"},
    output="money",
    intent_words=["compound interest", "amount", "CI"],
    description="A = P * (1 + R/100)^T",
)
def compound_amount(principal: float, rate: float,
                     time: float) -> float:
    return principal * (1.0 + rate / 100.0) ** time


@register(
    id="COMPOUND_INTEREST",
    subject="commerce",
    classes=[8, 9, 10],
    chapter="comparing_quantities",
    inputs={"principal": "money", "rate": "percentage",
            "time": "number"},
    output="money",
    intent_words=["compound interest", "CI"],
    description="CI = P * (1 + R/100)^T - P",
)
def compound_interest(principal: float, rate: float,
                       time: float) -> float:
    return principal * (1.0 + rate / 100.0) ** time - principal


# --------------------------------------------------------------------------- #
# Class 6-8: Mensuration (Geometry)
# --------------------------------------------------------------------------- #

@register(
    id="SQUARE_AREA",
    subject="maths",
    classes=[6, 7, 8],
    chapter="mensuration",
    inputs={"side": "length"},
    output="area",
    intent_words=["area of square", "area"],
    description="A = side^2",
)
def square_area(side: float) -> float:
    if side < 0:
        raise ValueError("side cannot be negative")
    return side * side


@register(
    id="SQUARE_PERIMETER",
    subject="maths",
    classes=[6, 7, 8],
    chapter="mensuration",
    inputs={"side": "length"},
    output="length",
    intent_words=["perimeter of square", "perimeter"],
    description="P = 4 * side",
)
def square_perimeter(side: float) -> float:
    if side < 0:
        raise ValueError("side cannot be negative")
    return 4.0 * side


@register(
    id="RECTANGLE_AREA",
    subject="maths",
    classes=[6, 7, 8],
    chapter="mensuration",
    inputs={"length": "length", "width": "length"},
    output="area",
    intent_words=["area of rectangle", "area"],
    description="A = length * width",
)
def rectangle_area(length: float, width: float) -> float:
    if length < 0 or width < 0:
        raise ValueError("dimensions cannot be negative")
    return length * width


@register(
    id="RECTANGLE_PERIMETER",
    subject="maths",
    classes=[6, 7, 8],
    chapter="mensuration",
    inputs={"length": "length", "width": "length"},
    output="length",
    intent_words=["perimeter of rectangle", "perimeter"],
    description="P = 2 * (length + width)",
)
def rectangle_perimeter(length: float, width: float) -> float:
    if length < 0 or width < 0:
        raise ValueError("dimensions cannot be negative")
    return 2.0 * (length + width)


@register(
    id="TRIANGLE_AREA",
    subject="maths",
    classes=[6, 7, 8],
    chapter="mensuration",
    inputs={"base": "length", "height": "length"},
    output="area",
    intent_words=["area of triangle", "area"],
    description="A = 1/2 * base * height",
)
def triangle_area(base: float, height: float) -> float:
    if base < 0 or height < 0:
        raise ValueError("dimensions cannot be negative")
    return 0.5 * base * height


@register(
    id="CIRCLE_AREA",
    subject="maths",
    classes=[7, 8],
    chapter="mensuration",
    inputs={"radius": "length"},
    output="area",
    intent_words=["area of circle", "area"],
    description="A = pi * r^2",
)
def circle_area(radius: float) -> float:
    if radius < 0:
        raise ValueError("radius cannot be negative")
    return math.pi * radius * radius


@register(
    id="CIRCLE_CIRCUMFERENCE",
    subject="maths",
    classes=[7, 8],
    chapter="mensuration",
    inputs={"radius": "length"},
    output="length",
    intent_words=["circumference of circle", "circumference",
                   "perimeter of circle"],
    description="C = 2 * pi * r",
)
def circle_circumference(radius: float) -> float:
    if radius < 0:
        raise ValueError("radius cannot be negative")
    return 2.0 * math.pi * radius


@register(
    id="CUBE_VOLUME",
    subject="maths",
    classes=[7, 8],
    chapter="mensuration",
    inputs={"side": "length"},
    output="volume",
    intent_words=["volume of cube", "volume"],
    description="V = side^3",
)
def cube_volume(side: float) -> float:
    if side < 0:
        raise ValueError("side cannot be negative")
    return side ** 3


@register(
    id="CUBOID_VOLUME",
    subject="maths",
    classes=[7, 8],
    chapter="mensuration",
    inputs={"length": "length", "width": "length",
            "height": "length"},
    output="volume",
    intent_words=["volume of cuboid", "volume"],
    description="V = length * width * height",
)
def cuboid_volume(length: float, width: float,
                   height: float) -> float:
    if length < 0 or width < 0 or height < 0:
        raise ValueError("dimensions cannot be negative")
    return length * width * height


@register(
    id="CYLINDER_VOLUME",
    subject="maths",
    classes=[8],
    chapter="mensuration",
    inputs={"radius": "length", "height": "length"},
    output="volume",
    intent_words=["volume of cylinder", "volume"],
    description="V = pi * r^2 * h",
)
def cylinder_volume(radius: float, height: float) -> float:
    if radius < 0 or height < 0:
        raise ValueError("dimensions cannot be negative")
    return math.pi * radius * radius * height


@register(
    id="CONE_VOLUME",
    subject="maths",
    classes=[8, 9],
    chapter="mensuration",
    inputs={"radius": "length", "height": "length"},
    output="volume",
    intent_words=["volume of cone", "volume"],
    description="V = 1/3 * pi * r^2 * h",
)
def cone_volume(radius: float, height: float) -> float:
    if radius < 0 or height < 0:
        raise ValueError("dimensions cannot be negative")
    return (1.0 / 3.0) * math.pi * radius * radius * height


@register(
    id="SPHERE_VOLUME",
    subject="maths",
    classes=[8, 9],
    chapter="mensuration",
    inputs={"radius": "length"},
    output="volume",
    intent_words=["volume of sphere", "volume"],
    description="V = 4/3 * pi * r^3",
)
def sphere_volume(radius: float) -> float:
    if radius < 0:
        raise ValueError("radius cannot be negative")
    return (4.0 / 3.0) * math.pi * radius ** 3


@register(
    id="SPHERE_SURFACE_AREA",
    subject="maths",
    classes=[8, 9],
    chapter="mensuration",
    inputs={"radius": "length"},
    output="area",
    intent_words=["surface area of sphere", "surface area"],
    description="SA = 4 * pi * r^2",
)
def sphere_surface_area(radius: float) -> float:
    if radius < 0:
        raise ValueError("radius cannot be negative")
    return 4.0 * math.pi * radius * radius


# --------------------------------------------------------------------------- #
# Class 7-8: Exponents and Powers
# --------------------------------------------------------------------------- #

@register(
    id="POWER",
    subject="maths",
    classes=[7, 8],
    chapter="exponents_and_powers",
    inputs={"base": "number", "exp": "number"},
    output="number",
    intent_words=["power", "exponent", "raised to"],
    description="base^exp",
)
def power(base: float, exp: float) -> float:
    return base ** exp


@register(
    id="SQUARE_ROOT",
    subject="maths",
    classes=[8],
    chapter="squares_and_square_roots",
    inputs={"n": "number"},
    output="number",
    intent_words=["square root", "sqrt"],
    description="sqrt(n)",
)
def square_root(n: float) -> float:
    if n < 0:
        raise ValueError("cannot take square root of negative")
    return math.sqrt(n)


@register(
    id="CUBE_ROOT",
    subject="maths",
    classes=[8],
    chapter="cubes_and_cube_roots",
    inputs={"n": "number"},
    output="number",
    intent_words=["cube root", "cbrt"],
    description="cbrt(n)",
)
def cube_root(n: float) -> float:
    if n < 0:
        return -(-n) ** (1.0 / 3.0)
    return n ** (1.0 / 3.0)
