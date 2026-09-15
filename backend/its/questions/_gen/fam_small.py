"""fam_small.py -- number theory facts, Heron/Brahmagupta areas,
trigonometric tangent-length and continuity extras."""
from __future__ import annotations

import math

from qbank_lib import family, make_q, ri, pick, frac_str, fmt_num


@family("number_theory_facts")
def _number_theory_facts(rng):
    out = []
    out.append(make_q(
        "Fermat's Last Theorem says x^n + y^n = z^n has no positive "
        "solutions for n > 2. For n = 3 compute 5^3 - (3^3 + 4^3) to see it "
        "is not zero.",
        ["lhs = 3 ** 3 + 4 ** 3", "diff = 5 ** 3 - lhs"],
        "34"))
    out.append(make_q(
        "Check whether 6 is a perfect number: its proper divisors are 1, 2 "
        "and 3. Find their sum.",
        ["total = 1 + 2 + 3"],
        "6"))
    out.append(make_q(
        "The numbers 11 and 13 are consecutive primes. How far apart are "
        "they (twin primes differ by 2)?",
        ["gap = 13 - 11"],
        "2"))
    out.append(make_q(
        "Are 8 and 15 co-prime? Their common factors are only 1, so their "
        "HCF is what?",
        ["hcf = 1"],
        "1"))
    out.append(make_q(
        "Divisibility by 9: a number is divisible by 9 when its digit sum "
        "is. Find the digit sum of 729 and report the digit sum.",
        ["dsum = 7 + 2 + 9", "rem = dsum % 9"],
        "0"))
    out.append(make_q(
        "Divisibility by 11: add and subtract alternate digits of 2728 from "
        "the right (8 - 2 + 7 - 2) and report the result.",
        ["alt = 8 - 2 + 7 - 2"],
        "11"))
    out.append(make_q(
        "In the locker puzzle, a locker stays open when it has an odd number "
        "of factors, which happens exactly for squares. The number 16 has "
        "factors 1, 2, 4, 8, 16; how many factors is that?",
        ["count = 5"],
        "5"))
    out.append(make_q(
        "Goldbach's conjecture: every even number above 4 is a sum of two "
        "primes. Verify for 8 using 3 + 5; report the sum.",
        ["total = 3 + 5"],
        "8"))
    out.append(make_q(
        "Round 48732 to the nearest thousand and report the rounded value.",
        ["rounded = 49000"],
        "49000"))
    out.append(make_q(
        "Estimate the product 398 x 51 by rounding to 400 x 50; report the "
        "estimated product.",
        ["est = 400 * 50"],
        "20000"))
    out.append(make_q(
        "A number ends in 0. Its square ends in 0 too, but a square can "
        "never end in which of these digit-count parities? Express as: an "
        "even count of trailing zeros is possible (1) or odd (0). Give 1.",
        ["val = 1"],
        "1"))
    out.append(make_q(
        "1729 is the Hardy-Ramanujan number: 1729 = 1^3 + 12^3 = 9^3 + "
        "10^3. Verify the second decomposition; report the sum.",
        ["total = 9 ** 3 + 10 ** 3"],
        "1729"))
    return out


@family("heron_area")
def _heron_area(rng):
    out = []
    a, b, c = pick(rng, [(3, 4, 5), (5, 12, 13), (6, 8, 10), (9, 12, 15),
                         (7, 24, 25), (8, 15, 17)])
    s = (a + b + c) / 2
    area = math.sqrt(s * (s - a) * (s - b) * (s - c))
    out.append(make_q(
        "Use Heron's formula to find the area of the triangle with sides "
        "%d, %d and %d." % (a, b, c),
        ["s = (%d + %d + %d) / 2" % (a, b, c),
         "area = sqrt(s * (s - %d) * (s - %d) * (s - %d))" % (a, b, c)],
        fmt_num(area)))
    a, b, c = pick(rng, [(13, 14, 15), (4, 13, 15), (13, 20, 21), (5, 5, 6),
                         (10, 10, 12)])
    s = (a + b + c) / 2
    area = math.sqrt(s * (s - a) * (s - b) * (s - c))
    out.append(make_q(
        "A triangular plot has sides %d m, %d m and %d m. Find its area with "
        "Heron's formula (two decimal places)." % (a, b, c),
        ["s = (%d + %d + %d) / 2" % (a, b, c),
         "area = sqrt(s * (s - %d) * (s - %d) * (s - %d))" % (a, b, c)],
        fmt_num(round(area, 2))))
    a, b, c, d = pick(rng, [(3, 4, 3, 4), (5, 12, 5, 12), (6, 8, 6, 8),
                            (9, 12, 9, 12)])
    s = (a + b + c + d) / 2
    area = math.sqrt((s - a) * (s - b) * (s - c) * (s - d))
    out.append(make_q(
        "Use Brahmagupta's formula for the cyclic quadrilateral with sides "
        "%d, %d, %d, %d (two decimal places)." % (a, b, c, d),
        ["s = (%d + %d + %d + %d) / 2" % (a, b, c, d),
         "area = sqrt((s - %d) * (s - %d) * (s - %d) * (s - %d))"
         % (a, b, c, d)],
        fmt_num(round(area, 2))))
    base, height = pick(rng, [(6, 8), (12, 5), (8, 15), (10, 24)])
    out.append(make_q(
        "Find the area of a right triangle with legs %d and %d, then check "
        "it against Heron by reporting base x height / 2." % (base, height),
        ["area = %d * %d / 2" % (base, height)],
        str(base * height // 2)))
    return out


@family("calculus_extra")
def _calculus_extra(rng):
    out = []
    x0 = ri(rng, 2, 5)
    out.append(make_q(
        "First principles: for f(x) = x^2 at x = %d with h = 0.01, compute "
        "the difference quotient (f(x+h) - f(x)) / h (two decimal places)."
        % x0,
        ["num = (%d + 0.01) ** 2 - %d * %d" % (x0, x0, x0),
         "q = num / 0.01"],
        fmt_num(round(((x0 + 0.01) ** 2 - x0 * x0) / 0.01, 2))))
    out.append(make_q(
        "Continuity check: f(x) = x for x < 2 and f(x) = 2x - 2 for x >= 2. "
        "Find the gap RHL - LHL at x = 2 (0 means continuous).",
        ["lhl = 2", "rhl = 2 * 2 - 2", "gap = rhl - lhl"],
        "0"))
    out.append(make_q(
        "Discontinuity size: f(x) = x + 1 for x < 1 and f(x) = 3x for x >= "
        "1. Compute RHL - LHL at x = 1.",
        ["lhl = 1 + 1", "rhl = 3 * 1", "gap = rhl - lhl"],
        "1"))
    out.append(make_q(
        "The equation d^2y/dx^2 + 2 dy/dx + y = 0 has highest derivative of "
        "order 2. What is its order?",
        ["order = 2"],
        "2"))
    out.append(make_q(
        "For (d^3y/dx^3)^4 + y = 0 the power of the highest derivative is "
        "its degree. What is the degree?",
        ["degree = 4"],
        "4"))
    out.append(make_q(
        "Verify that y = %dx is a solution of dy/dx = %d by substitution: "
        "report the left side value at any x (it is the constant slope)."
        % (3, 3) if False else
        "Verify y = 3x satisfies dy/dx = 3: the derivative equals what "
        "constant?",
        ["dy = 3"],
        "3"))
    out.append(make_q(
        "Separable equation dy/dx = 2x with y(0) = 5 gives y = x^2 + 5. "
        "Find y at x = 3.",
        ["y = 3 * 3 + 5"],
        "14"))
    out.append(make_q(
        "King property: the integral of f from 0 to a equals the integral of "
        "f(a - x). For f(x) = x from 0 to 2, both equal a^2/2. Compute it.",
        ["val = 2 * 2 / 2"],
        "2"))
    return out
