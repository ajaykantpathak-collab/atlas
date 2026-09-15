"""fam_alg.py -- algebraic expressions, linear equations, identities,
polynomials, quadratic equations, AP/GP and series families."""
from __future__ import annotations

import math

from qbank_lib import family, make_q, ri, pick, frac_str, fmt_num


# ------------------------------------------------------------------ #
# expressions
# ------------------------------------------------------------------ #

@family("expr_eval")
def _expr_eval(rng):
    out = []
    a, b, x = ri(rng, 2, 9), ri(rng, 2, 9), ri(rng, 2, 9)
    out.append(make_q(
        "Evaluate 3x + %d when x = %d." % (b, x),
        ["val = 3 * %d + %d" % (x, b)],
        str(3 * x + b)))
    a, b, x = ri(rng, 2, 6), ri(rng, 2, 8), ri(rng, 2, 6)
    out.append(make_q(
        "Find the value of %dx^2 + %dx + 5 when x = %d." % (a, b, x),
        ["val = %d * %d * %d + %d * %d + 5" % (a, x, x, b, x)],
        str(a * x * x + b * x + 5)))
    a, b, c = ri(rng, 2, 9), ri(rng, 2, 9), ri(rng, 2, 9)
    out.append(make_q(
        "Simplify %dx + %dx - %dx and give the coefficient of x." % (a, b, c),
        ["coef = %d + %d - %d" % (a, b, c)],
        str(a + b - c)))
    a, b, c = ri(rng, 2, 9), ri(rng, 2, 9), ri(rng, 2, 9)
    out.append(make_q(
        "Use the distributive law: %d x (%d + %d) equals %d x %d + %d x %d. "
        "Compute it." % (a, b, c, a, b, a, c),
        ["val = %d * %d + %d * %d" % (a, b, a, c)],
        str(a * b + a * c)))
    a, b, c = ri(rng, 2, 9), ri(rng, 2, 9), ri(rng, 2, 9)
    out.append(make_q(
        "Evaluate %d + %d x %d (respect the order of operations)." % (a, b, c),
        ["val = %d + %d * %d" % (a, b, c)],
        str(a + b * c)))
    a, b, c = ri(rng, 2, 9), ri(rng, 2, 9), ri(rng, 2, 9)
    out.append(make_q(
        "Evaluate (%d + %d) x %d." % (a, b, c),
        ["val = (%d + %d) * %d" % (a, b, c)],
        str((a + b) * c)))
    m, n, x = ri(rng, 2, 6), ri(rng, 2, 6), ri(rng, 2, 5)
    out.append(make_q(
        "A pattern rule is %d n + %d. Find the term at position n = %d."
        % (m, n, x),
        ["term = %d * %d + %d" % (m, x, n)],
        str(m * x + n)))
    m, n, x = ri(rng, 2, 6), ri(rng, 1, 6), ri(rng, 3, 9)
    out.append(make_q(
        "If n! for small n is a product, evaluate n(n - 1)(n - 2) for n = %d."
        % x,
        ["val = %d * %d * %d" % (x, x - 1, x - 2)],
        str(x * (x - 1) * (x - 2))))
    return out


@family("linear_eq")
def _linear_eq(rng):
    out = []
    a, b, x = ri(rng, 2, 9), ri(rng, 1, 15), ri(rng, 1, 12)
    c = a * x + b
    out.append(make_q(
        "Solve for x: %dx + %d = %d." % (a, b, c),
        ["x = (%d - %d) / %d" % (c, b, a)],
        str(x)))
    a, b, x = ri(rng, 2, 9), ri(rng, 1, 15), ri(rng, 1, 12)
    c = a * x - b
    out.append(make_q(
        "Solve for x: %dx - %d = %d." % (a, b, c),
        ["x = (%d + %d) / %d" % (c, b, a)],
        str(x)))
    a, c, x = ri(rng, 2, 8), ri(rng, 2, 9), ri(rng, 2, 9)
    b = c - a * x
    if b >= 0:
        text = "Solve for x: %dx + %d = %d." % (a, b, c)
        head = "%d" % b
    else:
        text = "Solve for x: %dx - %d = %d." % (a, -b, c)
        head = "(%d)" % b
    out.append(make_q(
        text,
        ["x = (%d - (%s)) / %d" % (c, head, a)],
        str(x)))
    a, c, x = ri(rng, 2, 7), ri(rng, 2, 6), ri(rng, 2, 8)
    b = a * x - c
    out.append(make_q(
        "Solve for x: %dx - %d = %d." % (a, b, c),
        ["x = (%d + %d) / %d" % (c, b, a)],
        str(x)))
    a, b, x = ri(rng, 3, 8), ri(rng, 1, 9), ri(rng, 1, 8)
    c2 = pick(rng, [1, 2])
    if c2 >= a:
        c2 = a - 1
    d = (a - c2) * x + b
    out.append(make_q(
        "Solve for x: %dx + %d = %dx + %d." % (a, b, c2, d),
        ["x = (%d - %d) / (%d - %d)" % (d, b, a, c2)],
        str(x)))
    a, b, x = ri(rng, 2, 6), ri(rng, 1, 6), ri(rng, 1, 6)
    c = a * (x + b)
    out.append(make_q(
        "Solve for x: %d(x + %d) = %d." % (a, b, c),
        ["x = (%d / %d) - %d" % (c, a, b)],
        str(x)))
    num = ri(rng, 4, 15)
    den_sum = num
    x = ri(rng, 2, 9)
    k = pick(rng, [3, 4, 5])
    total = x + num
    out.append(make_q(
        "The sum of a number and %d is %d. Find the number." % (num, total),
        ["num = %d - %d" % (total, num)],
        str(x)))
    x = 5 * ri(rng, 2, 20)
    total = 2 * x + 5
    out.append(make_q(
        "Two consecutive multiples of 5 add up to %d. Find the smaller one."
        % total,
        ["small = (%d - 5) / 2" % total],
        str(x)))
    fixed = pick(rng, [50, 100, 150, 200])
    unit = pick(rng, [5, 8, 10, 12, 15, 20])
    units = ri(rng, 4, 20)
    total = fixed + unit * units
    out.append(make_q(
        "A taxi charges a fixed Rs %d plus Rs %d per km. A ride cost Rs %d. "
        "How many km was the ride?" % (fixed, unit, total),
        ["km = (%d - %d) / %d" % (total, fixed, unit)],
        str(units)))
    n_items = ri(rng, 3, 9)
    mult = pick(rng, [4, 5, 6, 7, 8])
    intercept = ri(rng, 1, 6)
    total2 = mult * n_items + intercept
    out.append(make_q(
        "A linear pattern gives %d matchsticks at step n = 0 and adds %d per "
        "step. At which step does the count reach %d?" % (intercept, mult, total2),
        ["step = (%d - %d) / %d" % (total2, intercept, mult)],
        str(n_items)))
    val = ri(rng, 2, 9)
    lhs = a * val + b
    out.append(make_q(
        "Check whether x = %d satisfies %dx + %d = %d by computing the left "
        "side minus the right side (report the difference)."
        % (val, a, b, a * val + b + 3),
        ["lhs = %d * %d + %d" % (a, val, b), "diff = lhs - %d" % (a * val + b + 3)],
        str(-3)))
    return out


@family("identities")
def _identities(rng):
    out = []
    a, b = ri(rng, 2, 12), ri(rng, 2, 9)
    out.append(make_q(
        "Use the identity (a + b)^2 = a^2 + 2ab + b^2 to find the square of "
        "%d more than %d; report the value." % (b, a),
        ["val = %d * %d + 2 * %d * %d + %d * %d" % (a, a, a, b, b, b)],
        str((a + b) ** 2)))
    a, b = ri(rng, 10, 30), ri(rng, 2, 9)
    out.append(make_q(
        "Using (a - b)^2 = a^2 - 2ab + b^2, evaluate %d^2 - 2 x %d x %d + "
        "%d^2." % (a, a, b, b),
        ["val = %d * %d - 2 * %d * %d + %d * %d" % (a, a, a, b, b, b)],
        str((a - b) ** 2)))
    a, b = pick(rng, [(10, 4), (12, 3), (15, 5), (20, 6), (11, 2)])
    out.append(make_q(
        "Use a^2 - b^2 = (a + b)(a - b) to compute %d x %d where the numbers "
        "are a + b and a - b for a = %d, b = %d."
        % (a + b, a - b, a, b),
        ["val = %d * %d - %d * %d" % (a, a, b, b)],
        str((a + b) * (a - b))))
    x, a, b = ri(rng, 2, 8), ri(rng, 2, 6), ri(rng, 2, 6)
    out.append(make_q(
        "Expand (x + %d)(x + %d) using the identity x^2 + (a + b)x + ab and "
        "evaluate it at x = %d." % (a, b, x),
        ["val = %d * %d + (%d + %d) * %d + %d * %d"
         % (x, x, a, b, x, a, b)],
        str((x + a) * (x + b))))
    n = pick(rng, [(102, 2), (103, 3), (104, 4), (105, 5)])
    out.append(make_q(
        "Compute %d^2 using (100 + %d)^2 = 10000 + 2 x 100 x %d + %d^2."
        % (n[0], n[1], n[1], n[1]),
        ["val = 10000 + 2 * 100 * %d + %d * %d" % (n[1], n[1], n[1])],
        str(n[0] ** 2)))
    out.append(make_q(
        "Evaluate 98 x 102 using a^2 - b^2 with a = 100 and b = 2."
        if True else "",
        ["val = 100 * 100 - 2 * 2"],
        "9996"))
    a, b = ri(rng, 2, 8), ri(rng, 2, 8)
    out.append(make_q(
        "Using (a + b)^3 = a^3 + 3a^2 b + 3ab^2 + b^3, evaluate the cube of "
        "%d more than %d (report the value)." % (b, a),
        ["val = %d ** 3 + 3 * %d * %d * %d + 3 * %d * %d * %d + %d ** 3"
         % (a, a, a, b, a, b, b, b)],
        str((a + b) ** 3)))
    a, b, c = ri(rng, 2, 5), ri(rng, 2, 5), ri(rng, 2, 5)
    out.append(make_q(
        "Use (a + b + c)^2 = a^2 + b^2 + c^2 + 2ab + 2bc + 2ca with a = %d, "
        "b = %d, c = %d; report the value." % (a, b, c),
        ["val = %d * %d + %d * %d + %d * %d + 2 * %d * %d + 2 * %d * %d + "
         "2 * %d * %d" % (a, a, b, b, c, c, a, b, b, c, c, a)],
        str((a + b + c) ** 2)))
    a = ri(rng, 3, 9)
    out.append(make_q(
        "The product of two consecutive even numbers around %d equals %d^2 - "
        "1. Compute %d x %d using this identity." % (a, a, a + 1, a - 1),
        ["val = %d * %d - 1" % (a, a)],
        str(a * a - 1)))
    m = ri(rng, 2, 8)
    q = ri(rng, 1, 7)
    out.append(make_q(
        "Show that 2(2m + q) with m = %d, q = %d is always even by computing "
        "the value 2 x (2 x %d + %d)." % (m, q, m, q),
        ["val = 2 * (2 * %d + %d)" % (m, q)],
        str(4 * m + 2 * q)))
    return out


@family("poly_quad")
def _poly_quad(rng):
    out = []
    a, b, c, x = ri(rng, 1, 5), ri(rng, 1, 6), ri(rng, 1, 9), ri(rng, 2, 5)
    out.append(make_q(
        "Find the value of the polynomial %dx^2 + %dx + %d at x = %d."
        % (a, b, c, x),
        ["val = %d * %d * %d + %d * %d + %d" % (a, x, x, b, x, c)],
        str(a * x * x + b * x + c)))
    a, b, c, x = ri(rng, 1, 3), ri(rng, 2, 5), ri(rng, 1, 9), ri(rng, 1, 4)
    out.append(make_q(
        "Find the value of the cubic %dx^3 + %dx + %d at x = %d."
        % (a, b, c, x),
        ["val = %d * %d ** 3 + %d * %d + %d" % (a, x, b, x, c)],
        str(a * x ** 3 + b * x + c)))
    k = ri(rng, 1, 6)
    out.append(make_q(
        "For p(x) = x^2 - %dx + %d, find p(%d) (the remainder when divided "
        "by x - %d)." % (k + ri(rng, 0, 3), 0, k, k) if False else
        "For p(x) = x^2 - 5x + 6, find p(%d)." % k,
        ["val = %d * %d - 5 * %d + 6" % (k, k, k)],
        str(k * k - 5 * k + 6)))
    r1 = ri(rng, 1, 4)
    r2 = ri(rng, 5, 8)
    out.append(make_q(
        "The zeros of a quadratic are %d and %d. Find the sum of the zeros."
        % (r1, r2),
        ["total = %d + %d" % (r1, r2)],
        str(r1 + r2)))
    out.append(make_q(
        "The zeros of a quadratic are %d and %d. Find the product of the "
        "zeros." % (r1, r2),
        ["prod = %d * %d" % (r1, r2)],
        str(r1 * r2)))
    b1, a1 = r1 + r2, 1
    c1 = r1 * r2
    out.append(make_q(
        "A quadratic has zeros %d and %d. Write it as x^2 - (sum)x + product "
        "and give the value of the constant term." % (r1, r2),
        ["const = %d * %d" % (r1, r2)],
        str(c1)))
    a, b, c = pick(rng, [(1, -7, 12), (1, -5, 6), (2, -8, 6), (1, 2, -8),
                        (1, -1, -12)])
    disc = b * b - 4 * a * c
    out.append(make_q(
        "Find the discriminant of %dx^2 + (%d)x + %d." % (a, b, c),
        ["disc = %d * %d - 4 * %d * %d" % (b, b, a, c)],
        str(disc)))
    combos = [(1, -5, 6, 2, 3), (1, -7, 12, 3, 4), (1, 2, -8, 2, -4),
              (2, -8, 6, 1, 3)]
    A, B, C, root1, root2 = pick(rng, combos)
    out.append(make_q(
        "Solve %dx^2 + (%d)x + %d = 0 by factorisation and give the larger "
        "root." % (A, B, C),
        ["root = (-%d + sqrt(%d * %d - 4 * %d * %d)) / (2 * %d)"
         % (B, B, B, A, C, A)],
        str(max(root1, root2))))
    A, B, C, root1, root2 = pick(rng, combos)
    out.append(make_q(
        "For the equation %dx^2 + (%d)x + %d = 0, find the sum of the roots "
        "using -b/a." % (A, B, C),
        ["s = -(%d) / %d" % (B, A)],
        fmt_num(-B / A)))
    out.append(make_q(
        "For the equation %dx^2 + (%d)x + %d = 0, find the product of the "
        "roots using c/a." % (A, B, C),
        ["p = %d / %d" % (C, A)],
        fmt_num(C / A)))
    b = pick(rng, [2, 4, 6, 8, 10])
    a = 1
    c = b * b // 4
    out.append(make_q(
        "By completing the square, x^2 + %dx + %d = 0 has a repeated root. "
        "Find it." % (b, c),
        ["root = -%d / 2" % b],
        str(-b // 2)))
    return out


# ------------------------------------------------------------------ #
# sequences and series
# ------------------------------------------------------------------ #

@family("ap_gp")
def _ap_gp(rng):
    out = []
    a, d, n = ri(rng, 1, 12), ri(rng, 2, 9), ri(rng, 4, 15)
    out.append(make_q(
        "Find the %dth term of the AP with first term %d and common "
        "difference %d." % (n, a, d),
        ["an = %d + (%d - 1) * %d" % (a, n, d)],
        str(a + (n - 1) * d)))
    a, d, n = ri(rng, 1, 10), ri(rng, 2, 8), ri(rng, 5, 20)
    out.append(make_q(
        "Find the sum of the first %d terms of the AP %d, %d, %d, ... ."
        % (n, a, a + d, a + 2 * d),
        ["sn = %d * (2 * %d + (%d - 1) * %d) / 2" % (n, a, n, d)],
        str(n * (2 * a + (n - 1) * d) // 2)))
    a, d, l = ri(rng, 1, 10), ri(rng, 2, 7), 0
    n = ri(rng, 5, 20)
    l = a + (n - 1) * d
    out.append(make_q(
        "An AP has first term %d and last term %d with %d terms. Find its "
        "sum." % (a, l, n),
        ["sn = %d * (%d + %d) / 2" % (n, a, l)],
        str(n * (a + l) // 2)))
    t1 = ri(rng, 2, 20)
    t2 = t1 + ri(rng, 2, 9)
    out.append(make_q(
        "The first two terms of a sequence are %d and %d. Find the common "
        "difference." % (t1, t2),
        ["d = %d - %d" % (t2, t1)],
        str(t2 - t1)))
    a, d = ri(rng, 1, 15), ri(rng, 2, 8)
    n = ri(rng, 3, 15)
    out.append(make_q(
        "How many terms are in the AP %d, %d, %d, ... up to and including "
        "%d?" % (a, a + d, a + 2 * d, a + (n - 1) * d),
        ["n = (%d - %d) / %d + 1" % (a + (n - 1) * d, a, d)],
        str(n)))
    a, d = ri(rng, 1, 9), ri(rng, 2, 6)
    m = ri(rng, 4, 10)
    k = ri(rng, 2, m - 1)
    out.append(make_q(
        "The %dth term of an AP is %d and the %dth term is %d. Find the "
        "common difference d = (a_m - a_k) / (m - k)."
        % (m, a + (m - 1) * d, k, a + (k - 1) * d),
        ["d = (%d - %d) / (%d - %d)"
         % (a + (m - 1) * d, a + (k - 1) * d, m, k)],
        str(d)))
    n_end = ri(rng, 2, 8)
    a, d, n = ri(rng, 1, 10), ri(rng, 2, 6), ri(rng, 5, 15)
    l = a + (n - 1) * d
    out.append(make_q(
        "Find the %dth term from the end of the AP with first term %d, "
        "common difference %d and %d terms." % (n_end, a, d, n),
        ["from_end = %d - (%d - 1) * %d" % (l, n_end, d)],
        str(l - (n_end - 1) * d)))
    a, b = pick(rng, [(2, 8), (3, 12), (4, 9), (5, 20), (6, 24)])
    out.append(make_q(
        "Insert one arithmetic mean between %d and %d." % (a, b),
        ["am = (%d + %d) / 2" % (a, b)],
        fmt_num((a + b) / 2)))
    a, r, n = ri(rng, 1, 6), ri(rng, 2, 4), ri(rng, 3, 7)
    out.append(make_q(
        "Find the %dth term of the GP with first term %d and common ratio "
        "%d." % (n, a, r),
        ["an = %d * %d ** (%d - 1)" % (a, r, n)],
        str(a * r ** (n - 1))))
    a, r, n = ri(rng, 1, 5), ri(rng, 2, 3), ri(rng, 3, 6)
    out.append(make_q(
        "Find the sum of the first %d terms of the GP with first term %d and "
        "ratio %d." % (n, a, r),
        ["sn = %d * (%d ** %d - 1) / (%d - 1)" % (a, r, n, r)],
        str(a * (r ** n - 1) // (r - 1))))
    a, b = pick(rng, [(2, 8), (3, 12), (4, 9), (2, 18), (5, 20)])
    out.append(make_q(
        "Find the geometric mean of %d and %d." % (a, b),
        ["gm = sqrt(%d * %d)" % (a, b)],
        str(int(math.sqrt(a * b)))))
    out.append(make_q(
        "For the GP 9, 3, 1, ... the sum to infinity is a / (1 - r). Find "
        "it." if True else "",
        ["s = 9 / (1 - 1 / 3)"],
        fmt_num(13.5)))
    a, b = ri(rng, 2, 12), ri(rng, 13, 30)
    out.append(make_q(
        "Verify AM >= GM for %d and %d by computing the gap (AM - GM), "
        "rounded to two decimal places." % (a, b),
        ["gap = (%d + %d) / 2 - sqrt(%d * %d)" % (a, b, a, b)],
        fmt_num(round((a + b) / 2 - math.sqrt(a * b), 2))))
    n = ri(rng, 10, 60)
    out.append(make_q(
        "Find the sum of the first %d natural numbers." % n,
        ["total = %d * (%d + 1) / 2" % (n, n)],
        str(n * (n + 1) // 2)))
    start = ri(rng, 2, 10)
    end = start + ri(rng, 5, 20)
    out.append(make_q(
        "Find the sum of natural numbers from %d to %d." % (start, end),
        ["hi = %d * (%d + 1) / 2" % (end, end),
         "lo = (%d - 1) * %d / 2" % (start, start), "total = hi - lo"],
        str(end * (end + 1) // 2 - (start - 1) * start // 2)))
    return out
