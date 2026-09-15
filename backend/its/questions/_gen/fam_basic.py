"""fam_basic.py -- number patterns, squares/cubes, integers, fractions,
decimals, exponents, primes/HCF/LCM, number-play generators.

Every family returns >= 6 items {"q", "chain", "disp"}; the builder
dedupes and cuts to 6, executing each chain through safe_eval."""
from __future__ import annotations

import math

from qbank_lib import family, make_q, ri, pick, frac_str, fmt_num


# ------------------------------------------------------------------ #
# number patterns
# ------------------------------------------------------------------ #

@family("num_patterns")
def _num_patterns(rng):
    out = []
    n = ri(rng, 5, 14)
    out.append(make_q(
        "What is the %dth triangular number?" % n,
        ["tri = %d * (%d + 1) / 2" % (n, n)],
        str(n * (n + 1) // 2)))
    n = ri(rng, 4, 10)
    out.append(make_q(
        "Find the triangular number formed by %d dots arranged in rows of "
        "1, 2, 3, ... dots." % n,
        ["dots = %d * (%d + 1) / 2" % (n, n)],
        str(n * (n + 1) // 2)))
    n = ri(rng, 3, 9)
    out.append(make_q(
        "What is the %dth hexagonal number? (Use the rule 3 x n x (n - 1) + 1)" % n,
        ["hex = 3 * %d * (%d - 1) + 1" % (n, n)],
        str(3 * n * (n - 1) + 1)))
    n = ri(rng, 2, 5)
    out.append(make_q(
        "A Koch snowflake starts from a triangle. How many sides does the "
        "figure have after %d rounds of replacing the middle third of every "
        "segment? (Rule: sides = 3 x 4^(rounds - 1))" % n,
        ["sides = 3 * 4 ** (%d - 1)" % n],
        str(3 * 4 ** (n - 1))))
    n = ri(rng, 2, 4)
    out.append(make_q(
        "In the Sierpinski carpet, the middle square of every carpet is "
        "removed at each step. How many small squares remain after %d steps? "
        "(Rule: remaining = 8^steps)" % n,
        ["rem = 8 ** %d" % n],
        str(8 ** n)))
    n = ri(rng, 2, 4)
    out.append(make_q(
        "In the Sierpinski carpet, how many holes have been punched in total "
        "after %d steps? (Rule: holes = (8^steps - 1) / 7)" % n,
        ["holes = (8 ** %d - 1) / 7" % n],
        str((8 ** n - 1) // 7)))
    n = ri(rng, 3, 6)
    out.append(make_q(
        "The Sierpinski triangle keeps the 3 corner triangles at every step. "
        "How many shaded triangles are there after %d steps?" % n,
        ["tri = 3 ** %d" % n],
        str(3 ** n)))
    d = ri(rng, 4, 6)
    out.append(make_q(
        "How many %d-digit numbers are there in the decimal system? "
        "(Rule: 9 x 10^(digits - 1))" % d,
        ["count = 9 * 10 ** (%d - 1)" % d],
        str(9 * 10 ** (d - 1))))
    return out


@family("odd_sum_square")
def _odd_sum_square(rng):
    out = []
    for _ in range(3):
        n = ri(rng, 4, 12)
        out.append(make_q(
            "Starting from 1, add the first %d odd numbers: 1 + 3 + 5 + ... "
            "What square do you get?" % n,
            ["sq = %d * %d" % (n, n)],
            str(n * n)))
    for _ in range(3):
        n = ri(rng, 3, 8)
        out.append(make_q(
            "Add the first %d odd numbers and report the result as a perfect "
            "square value." % n,
            ["total = %d * %d" % (n, n)],
            str(n * n)))
    return out


@family("updown_sum")
def _updown_sum(rng):
    out = []
    for _ in range(3):
        p = ri(rng, 4, 15)
        out.append(make_q(
            "Add counting numbers up from 1 to %d and then back down to 1 "
            "(1 + 2 + ... + %d + ... + 2 + 1). What is the total?" % (p, p),
            ["total = %d * %d" % (p, p)],
            str(p * p)))
    k = ri(rng, 2, 5)
    n = ri(rng, 3, 6)
    out.append(make_q(
        "The sum of %d consecutive triangular numbers starting from 1 equals "
        "a square. Which square value is it if n = %d? (Rule: sum = n^2)" % (k, n),
        ["sq = %d * %d" % (n, n)],
        str(n * n)))
    a = ri(rng, 2, 6)
    b = a + 1
    out.append(make_q(
        "The sum of two consecutive triangular numbers T_%d + T_%d is always "
        "a square. Compute T_%d = %d*(%d+1)/2, T_%d = %d*(%d+1)/2 and add them."
        % (a, b, a, a, a, b, b, b),
        ["t1 = %d * (%d + 1) / 2" % (a, a), "t2 = %d * (%d + 1) / 2" % (b, b),
         "total = t1 + t2"],
        str(a * (a + 1) // 2 + b * (b + 1) // 2)))
    p = ri(rng, 7, 12)
    out.append(make_q(
        "Virahanka numbers: sum 1 + 2 + ... + %d + ... + 2 + 1 gives a square "
        "of the peak number. Find it." % p,
        ["sq = %d ** 2" % p],
        str(p * p)))
    return out


# ------------------------------------------------------------------ #
# squares and cubes
# ------------------------------------------------------------------ #

@family("squares")
def _squares(rng):
    out = []
    n = ri(rng, 12, 39)
    out.append(make_q(
        "Find the square of %d." % n,
        ["sq = %d ** 2" % n],
        str(n * n)))
    n = ri(rng, 21, 49)
    out.append(make_q(
        "A square garden plot has each side %d m. What is the number of "
        "square metres in its area?" % n,
        ["area = %d * %d" % (n, n)],
        str(n * n)))
    n = ri(rng, 2, 9)
    out.append(make_q(
        "How many non-square numbers lie between %d^2 and %d^2? (Rule: 2 x n)"
        % (n, n + 1),
        ["count = 2 * %d" % n],
        str(2 * n)))
    a = ri(rng, 3, 12)
    out.append(make_q(
        "Use the identity (a + 1)(a - 1) = a^2 - 1 to find %d x %d." % (a + 1, a - 1),
        ["prod = %d ** 2 - 1" % a],
        str(a * a - 1)))
    n = ri(rng, 11, 89)
    out.append(make_q(
        "What is the units digit of the square of %d?" % n,
        ["sq = %d ** 2" % n, "units = sq % 10"],
        str((n * n) % 10)))
    m = ri(rng, 4, 15)
    out.append(make_q(
        "A Pythagorean triplet starts with 2m = %d. Using the triplet "
        "(2m, m^2 - 1, m^2 + 1), find the largest member." % (2 * m),
        ["big = %d ** 2 + 1" % m],
        str(m * m + 1)))
    a = ri(rng, 4, 12)
    b = pick(rng, [25, 36, 49, 64, 81])
    out.append(make_q(
        "Using the pattern for numbers ending in 5 or the identity "
        "(a + b)^2 = a^2 + 2ab + b^2 with a = %d and b = %d, find the square "
        "of %d." % (a, int(math.sqrt(b)), a + int(math.sqrt(b))),
        ["val = %d ** 2 + 2 * %d * %d + %d ** 2" % (a, 2, int(math.sqrt(b)), int(math.sqrt(b)))],
        str((a + int(math.sqrt(b))) ** 2)))
    k = ri(rng, 3, 9)
    out.append(make_q(
        "Express %d^2 as the sum of two consecutive natural numbers "
        "(n^2 = (n^2 - 1)/2 + (n^2 + 1)/2) and give the larger part for n = %d."
        % (k, k),
        ["large = (%d ** 2 + 1) / 2" % k],
        str((k * k + 1) // 2)))
    return out


@family("square_roots")
def _square_roots(rng):
    out = []
    for _ in range(3):
        r = ri(rng, 4, 40)
        out.append(make_q(
            "Find the square root of %d." % (r * r),
            ["root = sqrt(%d)" % (r * r)],
            str(r)))
    r = ri(rng, 6, 25)
    out.append(make_q(
        "The area of a square field is %d m^2. Find the length of one side."
        % (r * r),
        ["side = sqrt(%d)" % (r * r)],
        str(r)))
    r = ri(rng, 5, 30)
    out.append(make_q(
        "In a hall with %d seats arranged as a perfect square, how many rows "
        "are there?" % (r * r),
        ["rows = sqrt(%d)" % (r * r)],
        str(r)))
    r = ri(rng, 11, 44)
    out.append(make_q(
        "Check whether %d is a perfect square by taking its square root; "
        "report the root if it is a whole number." % (r * r),
        ["root = sqrt(%d)" % (r * r)],
        str(r)))
    return out


@family("cubes")
def _cubes(rng):
    out = []
    n = ri(rng, 2, 12)
    out.append(make_q(
        "Find the cube of %d." % n,
        ["cube = %d ** 3" % n],
        str(n ** 3)))
    n = ri(rng, 2, 10)
    out.append(make_q(
        "The volume of a cubical box is %d cubic units. Find the length of "
        "one edge." % (n ** 3),
        ["edge = %d ** (1 / 3)" % (n ** 3)],
        str(n)))
    n = ri(rng, 2, 9)
    out.append(make_q(
        "Evaluate the cube root of %d." % (n ** 3),
        ["root = %d ** (1 / 3)" % (n ** 3)],
        str(n)))
    p, q = pick(rng, [(2, 3), (2, 5), (3, 5), (2, 7), (3, 2)])
    num = p ** 3 * q ** 2
    out.append(make_q(
        "The number %d has the prime factorisation %d^3 x %d^2. Find the "
        "smallest number by which it must be multiplied so that the product "
        "is a perfect cube." % (num, p, q),
        ["mult = %d" % q],
        str(q)))
    p, q = pick(rng, [(2, 3), (2, 5), (3, 5), (5, 2)])
    num = p ** 4 * q
    out.append(make_q(
        "The number %d has the prime factorisation %d^4 x %d. Find the "
        "smallest number by which it must be divided so that the quotient is "
        "a perfect cube." % (num, p, q),
        ["div = %d * %d" % (p, q)],
        str(p * q)))
    a = ri(rng, 2, 9)
    out.append(make_q(
        "A cube pattern adds consecutive odd numbers: %d^3 - %d^3 equals "
        "which odd number?" % (a + 1, a),
        ["gap = (%d + 1) ** 3 - %d ** 3" % (a, a)],
        str((a + 1) ** 3 - a ** 3)))
    return out


# ------------------------------------------------------------------ #
# integers and signed arithmetic
# ------------------------------------------------------------------ #

@family("int_ops")
def _int_ops(rng):
    out = []
    a, b = ri(rng, -25, 25), ri(rng, -25, 25)
    out.append(make_q(
        "Add the integers %d and %d." % (a, b),
        ["total = %d + (%d)" % (a, b)],
        str(a + b)))
    a, b = ri(rng, -30, 30), ri(rng, -30, 30)
    out.append(make_q(
        "A point starts at %d on a number line and moves %d steps "
        "(negative means left). Where does it finish?" % (a, b),
        ["pos = %d + (%d)" % (a, b)],
        str(a + b)))
    a, b = ri(rng, -12, 12), ri(rng, -12, 12)
    out.append(make_q(
        "Multiply the integers %d and %d." % (a, b),
        ["prod = %d * (%d)" % (a, b)],
        str(a * b)))
    a, b = ri(rng, -144, 144), pick(rng, [-2, -3, -4, 2, 3, 4, 6])
    out.append(make_q(
        "Divide %d by %d." % (a, b),
        ["q = %d / (%d)" % (a, b)],
        fmt_num(a / b)))
    a = ri(rng, -15, 15)
    out.append(make_q(
        "Find the additive inverse of %d and return it." % a,
        ["inv = -(%d)" % a],
        str(-a)))
    a, b, c = ri(rng, 2, 9), ri(rng, 2, 9), ri(rng, 2, 9)
    out.append(make_q(
        "Use the distributive law to evaluate %d x %d + %d x %d as %d x (%d + %d)."
        % (a, b, a, c, a, b, c),
        ["val = %d * (%d + %d)" % (a, b, c)],
        str(a * (b + c))))
    a, b, c = ri(rng, 2, 9), ri(rng, 2, 9), ri(rng, 2, 9)
    out.append(make_q(
        "Remove the brackets and evaluate %d - (%d + %d)." % (a + 10, b, c),
        ["val = %d - %d - %d" % (a + 10, b, c)],
        str(a + 10 - b - c)))
    a = pick(rng, [-7, -6, -5, 5, 6, 7])
    out.append(make_q(
        "Evaluate -1 x (%d)." % a,
        ["val = -1 * (%d)" % a],
        str(-a)))
    return out


# ------------------------------------------------------------------ #
# fractions and rational numbers
# ------------------------------------------------------------------ #

@family("frac_ops")
def _frac_ops(rng):
    out = []
    a, b = ri(rng, 1, 7), ri(rng, 2, 9)
    n = ri(rng, 3, 12)
    out.append(make_q(
        "Find %d x %d/%d." % (n, a, b),
        ["prod = %d * %d / %d" % (n, a, b)],
        frac_str(n * a, b)))
    a, b = ri(rng, 1, 7), ri(rng, 2, 9)
    n2 = b * ri(rng, 2, 6)
    out.append(make_q(
        "Find %d/%d of %d." % (a, b, n2),
        ["part = %d / %d * %d" % (a, b, n2)],
        frac_str(a * n2, b)))
    a, b = ri(rng, 1, 8), ri(rng, 2, 9)
    c, d = ri(rng, 1, 8), ri(rng, 2, 9)
    if c == d:
        d += 1
    out.append(make_q(
        "Multiply the fractions %d/%d and %d/%d." % (a, b, c, d),
        ["num = %d * %d" % (a, c), "den = %d * %d" % (b, d),
         "val = num / den"],
        frac_str(a * c, b * d)))
    a, b = ri(rng, 1, 8), ri(rng, 2, 9)
    c, d = ri(rng, 1, 8), ri(rng, 2, 9)
    if c == d:
        c += 1
    out.append(make_q(
        "Divide %d/%d by %d/%d." % (a, b, c, d),
        ["val = %d / %d * %d / %d" % (a, b, d, c)],
        frac_str(a * d, b * c)))
    n = ri(rng, 3, 12)
    out.append(make_q(
        "Find the reciprocal of %d/%d and give it as a fraction." % (n, n + 3),
        ["rec = %d / %d" % (n + 3, n)],
        frac_str(n + 3, n)))
    a, b = ri(rng, 1, 7), ri(rng, 2, 9)
    c, d = ri(rng, 1, 7), b
    out.append(make_q(
        "Add the fractions %d/%d and %d/%d (same denominator)." % (a, b, c, d),
        ["total = (%d + %d) / %d" % (a, c, b)],
        frac_str(a + c, b)))
    a, b = ri(rng, 1, 7), ri(rng, 2, 6)
    c, d = ri(rng, 1, 7), ri(rng, 7, 9)
    out.append(make_q(
        "Add the fractions %d/%d and %d/%d using a common denominator "
        "%d x %d." % (a, b, c, d, b, d),
        ["num = %d * %d + %d * %d" % (a, d, c, b), "den = %d * %d" % (b, d),
         "val = num / den"],
        frac_str(a * d + c * b, b * d)))
    a, b = ri(rng, 2, 5), ri(rng, 2, 6)
    c = ri(rng, 1, b - 1)
    out.append(make_q(
        "Convert the mixed number %d %d/%d to an improper fraction and give "
        "its numerator over the same denominator as a single fraction value."
        % (a, c, b),
        ["improper = (%d * %d + %d) / %d" % (a, b, c, b)],
        frac_str(a * b + c, b)))
    l, w = ri(rng, 2, 6), ri(rng, 2, 6)
    out.append(make_q(
        "A rectangle has sides %d/%d m and %d/5 m. Find its area in square "
        "metres as a fraction." % (l, l + 1, w),
        ["area = %d / %d * %d / 5" % (l, l + 1, w)],
        frac_str(l * w, (l + 1) * 5)))
    return out


@family("rational_ops")
def _rational_ops(rng):
    out = []
    a, b = ri(rng, 1, 7), ri(rng, 2, 6)
    c, d = ri(rng, 1, 7), ri(rng, 7, 9)
    out.append(make_q(
        "Add the rational numbers %d/%d and %d/%d." % (a, b, c, d),
        ["num = %d * %d + %d * %d" % (a, d, c, b), "den = %d * %d" % (b, d),
         "val = num / den"],
        frac_str(a * d + c * b, b * d)))
    a, b = ri(rng, 1, 9), ri(rng, 2, 6)
    out.append(make_q(
        "Find the additive inverse of the rational number %d/%d." % (a, b),
        ["inv = -%d / %d" % (a, b)],
        frac_str(-a, b)))
    a, b = ri(rng, 2, 9), ri(rng, 2, 9)
    out.append(make_q(
        "Find the multiplicative inverse of the rational number %d/%d." % (a, b),
        ["inv = %d / %d" % (b, a)],
        frac_str(b, a)))
    lo = ri(rng, 1, 4)
    out.append(make_q(
        "Find a rational number lying exactly halfway between %d/2 and %d/2 "
        "(use the mean)." % (2 * lo, 2 * lo + 4),
        ["mid = (%d / 2 + %d / 2) / 2" % (2 * lo, 2 * lo + 4)],
        fmt_num(lo + 1)))
    a, b = ri(rng, 1, 20), ri(rng, 1, 20)
    if a == b:
        b += 3
    out.append(make_q(
        "Find the distance between the rational numbers %d/3 and %d/3 on the "
        "number line." % (max(a, b), min(a, b)),
        ["dist = abs(%d / 3 - %d / 3)" % (max(a, b), min(a, b))],
        frac_str(abs(a - b), 3)))
    p, q = ri(rng, 2, 9), ri(rng, 2, 9)
    h = pick(rng, [2, 3, 5])
    out.append(make_q(
        "Write the rational number %d/%d in standard form by dividing both "
        "terms by %d; give the numerator of the standard form over its "
        "denominator as a single value." % (p * h, q * h, h),
        ["std = (%d / %d) / (%d / %d)" % (p * h, q * h, h, h)],
        frac_str(p, q)))
    a, b, c, d = ri(rng, 1, 9), ri(rng, 2, 6), ri(rng, 1, 9), ri(rng, 7, 9)
    out.append(make_q(
        "Subtract %d/%d from %d/%d." % (a, b, c, d),
        ["num = %d * %d - %d * %d" % (c, b, a, d), "den = %d * %d" % (b, d),
         "val = num / den"],
        frac_str(c * b - a * d, b * d)))
    return out


# ------------------------------------------------------------------ #
# decimals
# ------------------------------------------------------------------ #

@family("dec_ops")
def _dec_ops(rng):
    out = []
    w = ri(rng, 1, 9)
    t = ri(rng, 1, 9)
    h = ri(rng, 1, 9)
    out.append(make_q(
        "Write the number with %d units, %d tenths and %d hundredths as a "
        "decimal." % (w, t, h),
        ["val = %d + %d / 10 + %d / 100" % (w, t, h)],
        fmt_num(w + t / 10 + h / 100)))
    a = ri(rng, 10, 99) / 10.0
    b = ri(rng, 10, 99) / 10.0
    out.append(make_q(
        "Add the decimals %.1f and %.1f." % (a, b),
        ["total = %.1f + %.1f" % (a, b)],
        fmt_num(a + b)))
    ai = ri(rng, 200, 999)
    bi = ri(rng, 100, ai - 1)
    a, b = ai / 100.0, bi / 100.0
    out.append(make_q(
        "Subtract %.2f from %.2f." % (b, a),
        ["diff = %.2f - %.2f" % (a, b)],
        fmt_num((ai - bi) / 100.0)))
    a = ri(rng, 11, 99) / 10.0
    b = ri(rng, 2, 9)
    out.append(make_q(
        "Multiply %.1f by %d." % (a, b),
        ["prod = %.1f * %d" % (a, b)],
        fmt_num(a * b)))
    a = ri(rng, 11, 99) / 10.0
    b = ri(rng, 11, 99) / 10.0
    out.append(make_q(
        "Multiply %.1f by %.1f." % (a, b),
        ["prod = %.1f * %.1f" % (a, b)],
        fmt_num(round(a * b, 2))))
    d = ri(rng, 11, 99) / 10.0
    out.append(make_q(
        "Find %d/10 of %.1f." % (1, d),
        ["val = %.1f / 10" % d],
        fmt_num(d / 10)))
    d = ri(rng, 11, 99) / 10.0
    k = pick(rng, [10, 100, 1000])
    out.append(make_q(
        "Multiply %.1f by %d." % (d, k),
        ["val = %.1f * %d" % (d, k)],
        fmt_num(d * k)))
    mm = ri(rng, 15, 95)
    out.append(make_q(
        "Convert %d mm into cm." % mm,
        ["cm = %d / 10" % mm],
        fmt_num(mm / 10)))
    cm = ri(rng, 125, 975)
    out.append(make_q(
        "Convert %d cm into metres." % cm,
        ["m = %d / 100" % cm],
        fmt_num(cm / 100)))
    g = ri(rng, 1250, 9750)
    out.append(make_q(
        "Convert %d g into kilograms." % g,
        ["kg = %d / 1000" % g],
        fmt_num(g / 1000)))
    p = ri(rng, 125, 975)
    out.append(make_q(
        "Convert %d paise into rupees." % p,
        ["rupees = %d / 100" % p],
        fmt_num(p / 100)))
    return out


# ------------------------------------------------------------------ #
# exponents and standard form
# ------------------------------------------------------------------ #

@family("exp_laws")
def _exp_laws(rng):
    out = []
    a = ri(rng, 2, 6)
    m, n = ri(rng, 2, 4), ri(rng, 2, 4)
    out.append(make_q(
        "Using the law a^m x a^n = a^(m+n), evaluate %d^%d x %d^%d."
        % (a, m, a, n),
        ["val = %d ** (%d + %d)" % (a, m, n)],
        str(a ** (m + n))))
    a = ri(rng, 2, 7)
    m, n = ri(rng, 3, 6), ri(rng, 1, 2)
    out.append(make_q(
        "Using a^m / a^n = a^(m-n), evaluate %d^%d / %d^%d." % (a, m, a, n),
        ["val = %d ** (%d - %d)" % (a, m, n)],
        str(a ** (m - n))))
    a = ri(rng, 2, 5)
    m, n = ri(rng, 2, 3), ri(rng, 2, 3)
    out.append(make_q(
        "Evaluate (%d^%d)^%d using the power of a power law." % (a, m, n),
        ["val = %d ** (%d * %d)" % (a, m, n)],
        str(a ** (m * n))))
    a, b = ri(rng, 2, 4), ri(rng, 2, 5)
    m = ri(rng, 2, 3)
    out.append(make_q(
        "Evaluate %d^%d x %d^%d using a^m x b^m = (ab)^m." % (a, m, b, m),
        ["val = (%d * %d) ** %d" % (a, b, m)],
        str((a * b) ** m)))
    a = ri(rng, 2, 9)
    out.append(make_q(
        "Find the value of %d^0." % a,
        ["val = %d ** 0" % a],
        "1"))
    a = ri(rng, 2, 9)
    m = ri(rng, 2, 4)
    out.append(make_q(
        "Evaluate %d^(-%d) and give the value as a fraction." % (a, m),
        ["val = 1 / %d ** %d" % (a, m)],
        frac_str(1, a ** m)))
    a, b = ri(rng, 2, 5), ri(rng, 2, 5)
    m = ri(rng, 2, 3)
    out.append(make_q(
        "Evaluate (%d/%d)^(-%d) and give the value as a fraction." % (a, b, m),
        ["val = (%d / %d) ** (-%d)" % (a, b, m)],
        frac_str(b ** m, a ** m)))
    c = ri(rng, 1, 9)
    e = ri(rng, 2, 6)
    out.append(make_q(
        "Write %d x 10^%d in usual (ordinary) form." % (c, e),
        ["val = %d * 10 ** %d" % (c, e)],
        str(c * 10 ** e)))
    c = ri(rng, 1, 9)
    e = ri(rng, 1, 3)
    out.append(make_q(
        "A bacterium measures %d x 10^-%d metre. Write this length in metres "
        "as a decimal." % (c, e),
        ["val = %d * 10 ** (-%d)" % (c, e)],
        fmt_num(c * 10 ** (-e))))
    n = ri(rng, 5, 12)
    out.append(make_q(
        "A sum doubles every year. If Rs %d is invested now, how many times "
        "the original (as a plain multiplier value) is the amount after 3 "
        "years? (doubling => 2^3)" % n,
        ["mult = 2 ** 3"],
        "8"))
    slots = ri(rng, 3, 4)
    ch = ri(rng, 2, 3)
    out.append(make_q(
        "A password has %d slots and each slot allows %d digits. How many "
        "passwords are possible?" % (slots, ch),
        ["combos = %d ** %d" % (ch, slots)],
        str(ch ** slots)))
    return out


# ------------------------------------------------------------------ #
# primes, HCF, LCM, divisibility
# ------------------------------------------------------------------ #

@family("hcf_lcm")
def _hcf_lcm(rng):
    out = []
    h = pick(rng, [2, 3, 4, 5, 6, 7, 8, 9, 10, 12])
    m = pick(rng, [1, 2, 3, 5, 7])
    n = pick(rng, [1, 2, 4, 5, 7, 8])
    if m == n:
        n += 1
    a, b = h * m, h * n
    out.append(make_q(
        "Two numbers %d and %d have HCF %d with coprime multipliers %d and "
        "%d. Verify by computing hcf = %d x 1; then find the HCF value."
        % (a, b, h, m, n, h),
        ["hcf = %d * 1" % h],
        str(h)))
    a, b = h * m, h * n
    out.append(make_q(
        "Find the LCM of %d and %d given their HCF is %d and "
        "HCF x LCM = product of the numbers." % (a, b, h),
        ["lcm = %d * %d / %d" % (a, b, h)],
        str(a * b // h)))
    a, b = h * m, h * n
    out.append(make_q(
        "The LCM of %d and %d is %d. Use HCF x LCM = a x b to find their HCF."
        % (a, b, a * b // h),
        ["hcf = %d * %d / %d" % (a, b, a * b // h)],
        str(h)))
    a, b = h * m, h * n
    out.append(make_q(
        "Two ropes of lengths %d cm and %d cm are cut into equal pieces of "
        "greatest length. What is the length of each piece?" % (a, b),
        ["piece = %d * %d / %d" % (a, b, a * b // h)],
        str(h)))
    a, b = h * m, h * n
    out.append(make_q(
        "Two bells ring together now. They ring at intervals of %d minutes "
        "and %d minutes. After how many minutes will they next ring "
        "together?" % (a, b),
        ["next_min = %d * %d / %d" % (a, b, h)],
        str(a * b // h)))
    n1 = pick(rng, [12, 18, 24, 30, 36])
    lim = pick(rng, [90, 96, 100, 120, 150])
    out.append(make_q(
        "How many multiples of %d are there up to %d?" % (n1, lim),
        ["count = %d // %d" % (lim, n1)],
        str(lim // n1)))
    k = ri(rng, 3, 9)
    lcm = pick(rng, [6, 8, 10, 12, 15])
    out.append(make_q(
        "The LCM of two numbers is %d. What is their %dth common multiple?"
        % (lcm, k),
        ["mult = %d * %d" % (k, lcm)],
        str(k * lcm)))
    a, b = pick(rng, [(8, 9), (4, 9), (8, 15), (9, 10), (14, 15)])
    out.append(make_q(
        "Two numbers %d and %d share no common prime factor. What is their "
        "HCF?" % (a, b),
        ["hcf = 1 * 1"],
        "1"))
    return out


@family("num_play")
def _num_play(rng):
    out = []
    d1, d2, d3, d4 = ri(rng, 1, 9), ri(rng, 1, 9), ri(rng, 1, 9), ri(rng, 1, 9)
    big = sorted([d1, d2, d3, d4], reverse=True)
    small = sorted([d1, d2, d3, d4])
    bv = big[0] * 1000 + big[1] * 100 + big[2] * 10 + big[3]
    sv = small[0] * 1000 + small[1] * 100 + small[2] * 10 + small[3]
    out.append(make_q(
        "For the digits %d, %d, %d, %d form the largest and smallest "
        "4-digit numbers and find their difference (Kaprekar step)."
        % (d1, d2, d3, d4),
        ["big = %d * 1000 + %d * 100 + %d * 10 + %d" % tuple(big),
         "small = %d * 1000 + %d * 100 + %d * 10 + %d" % tuple(small),
         "diff = big - small"],
        str(bv - sv)))
    a = ri(rng, 2, 9) * 1000 + ri(rng, 0, 9) * 100 + ri(rng, 1, 9) * 10 + ri(rng, 1, 9)
    h = a // 1000
    t = (a % 1000) // 100
    tn = (a % 100) // 10
    o = a % 10
    out.append(make_q(
        "The number %d is split into landmark groups of 1000, 100 and 10. "
        "How many complete 1000-groups does it contain?" % a,
        ["groups = %d // 1000" % a],
        str(h)))
    out.append(make_q(
        "Find the digit sum of %d." % a,
        ["dsum = %d + %d + %d + %d" % (h, t, tn, o)],
        str(h + t + tn + o)))
    out.append(make_q(
        "Find the remainder when the digit sum of %d (= %d) is divided by 9."
        % (a, h + t + tn + o),
        ["rem = (%d + %d + %d + %d) %% 9" % (h, t, tn, o)],
        str((h + t + tn + o) % 9)))
    b = ri(rng, 10, 99)
    t1, o1 = b // 10, b % 10
    if t1 == o1:
        o1 = (o1 + 3) % 10
    rev = o1 * 10 + t1
    out.append(make_q(
        "Take the 2-digit number %d, reverse its digits to get %d, and find "
        "the positive difference (a Kaprekar-style step)." % (t1 * 10 + o1, rev),
        ["diff = abs(%d - %d)" % (max(t1 * 10 + o1, rev), min(t1 * 10 + o1, rev))],
        str(abs(t1 * 10 + o1 - rev))))
    out.append(make_q(
        "For the 2-digit number %d%d (digits %d and %d), the difference "
        "between the number and its reversal is always 9 x (difference of "
        "digits). Compute that difference." % (t1, o1, t1, o1),
        ["diff = 9 * abs(%d - %d)" % (t1, o1)],
        str(9 * abs(t1 - o1))))
    n = ri(rng, 10, 60)
    if n % 2 == 0:
        out.append(make_q(
            "A Collatz sequence step: %d is even, so replace it by %d / 2. "
            "What is the next term?" % (n, n),
            ["nxt = %d // 2" % n],
            str(n // 2)))
    else:
        out.append(make_q(
            "A Collatz sequence step: %d is odd, so replace it by 3 x %d + 1. "
            "What is the next term?" % (n, n),
            ["nxt = 3 * %d + 1" % n],
            str(3 * n + 1)))
    a1 = ri(rng, 1, 4)
    b1 = ri(rng, 2, 5)
    c1 = ri(rng, 1, 4)
    out.append(make_q(
        "A 3-row number pyramid puts %d, %d, %d at the bottom, and every "
        "cell above is the sum of the two below it. Find the top value."
        % (a1, b1, c1),
        ["top = %d + 2 * %d + %d" % (a1, b1, c1)],
        str(a1 + 2 * b1 + c1)))
    a1, b1, c1, d1 = ri(rng, 1, 3), ri(rng, 1, 4), ri(rng, 1, 3), ri(rng, 1, 4)
    out.append(make_q(
        "A 4-row number pyramid has base %d, %d, %d, %d with each cell the "
        "sum of the two below. Compute the top value."
        % (a1, b1, c1, d1),
        ["top = %d + 3 * %d + 3 * %d + %d" % (a1, b1, c1, d1)],
        str(a1 + 3 * b1 + 3 * c1 + d1)))
    return out


@family("digit_reversal")
def _digit_reversal(rng):
    out = []
    a, b = ri(rng, 1, 9), ri(rng, 1, 9)
    if a == b:
        b = (b % 9) + 1
    out.append(make_q(
        "The digits of the 2-digit number %d%d are swapped to make %d%d. "
        "Find the difference between the two numbers using 9 x |a - b|."
        % (a, b, b, a),
        ["diff = 9 * abs(%d - %d)" % (a, b)],
        str(9 * abs(a - b))))
    out.append(make_q(
        "A 2-digit number and the number formed by reversing its digits add "
        "up to 11 x (sum of digits). Find the sum for the number %d%d."
        % (a, b),
        ["total = 11 * (%d + %d)" % (a, b)],
        str(11 * (a + b))))
    a, b, c = ri(rng, 1, 9), ri(rng, 1, 9), ri(rng, 1, 9)
    out.append(make_q(
        "All cyclic permutations of the 3-digit number with digits %d, %d, "
        "%d are added. The sum equals 111 x (sum of digits). Find it."
        % (a, b, c),
        ["total = 111 * (%d + %d + %d)" % (a, b, c)],
        str(111 * (a + b + c))))
    n = ri(rng, 10, 99)
    t, o = n // 10, n % 10
    out.append(make_q(
        "In the 2 x 1 multiplication %d x %d, the units digit of the answer "
        "is what?" % (n, 7),
        ["prod = %d * 7" % n, "units = prod % 10"],
        str((n * 7) % 10)))
    n = ri(rng, 100, 999)
    h, t, o = n // 100, (n % 100) // 10, n % 10
    out.append(make_q(
        "The password trick: multiply the 3-digit number %d by 1001. Report "
        "the thousands digit of the 6-digit result." % n,
        ["prod = %d * 1001" % n, "thousands = prod // 1000 % 10"],
        str((n * 1001) // 1000 % 10)))
    a, b = ri(rng, 1, 9), ri(rng, 1, 9)
    if a == b:
        b = (b % 8) + 1
    out.append(make_q(
        "A supercell hunt in the 2-digit world: between %d%d and %d%d, how "
        "many of the two numbers are even? (Compute each number's parity "
        "count.)" % (a, b, b, a),
        ["n1 = %d" % (10 * a + b), "n2 = %d" % (10 * b + a),
         "e1 = (n1 + 1) % 2", "e2 = (n2 + 1) % 2", "count = e1 + e2"],
        str(sum(1 for v in (10 * a + b, 10 * b + a) if v % 2 == 0))))
    return out
