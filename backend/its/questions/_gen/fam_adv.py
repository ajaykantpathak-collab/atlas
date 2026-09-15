"""fam_adv.py -- coordinate geometry, trigonometry, matrices,
determinants, complex numbers, vectors, 3D, conics, calculus,
linear programming, differential equations."""
from __future__ import annotations

import math

from qbank_lib import family, make_q, ri, pick, frac_str, fmt_num

TRIPLES = [(3, 4, 5), (6, 8, 10), (5, 12, 13), (8, 15, 17), (9, 12, 15),
           (7, 24, 25), (12, 16, 20), (10, 24, 26), (20, 21, 29)]


# ------------------------------------------------------------------ #
# coordinate geometry
# ------------------------------------------------------------------ #

@family("coord_geom")
def _coord_geom(rng):
    out = []
    x1, y1 = ri(rng, -8, 8), ri(rng, -8, 8)
    a, b, c = pick(rng, TRIPLES)
    x2, y2 = x1 + a, y1 + b
    out.append(make_q(
        "Find the distance between the points (%d, %d) and (%d, %d)."
        % (x1, y1, x2, y2),
        ["dx = %d - %d" % (x2, x1), "dy = %d - %d" % (y2, y1),
         "dist = sqrt(dx * dx + dy * dy)"],
        str(c)))
    x1, y1 = ri(rng, -9, 9), ri(rng, -9, 9)
    out.append(make_q(
        "Find the distance of the point (%d, %d) from the origin." % (x1, y1),
        ["dist = sqrt(%d * %d + %d * %d)" % (x1, x1, y1, y1)],
        fmt_num(round(math.hypot(x1, y1), 2))))
    x1, y1 = ri(rng, -8, 8), ri(rng, -8, 8)
    x2, y2 = ri(rng, -8, 8), ri(rng, -8, 8)
    if x2 == x1:
        x2 += 3
    out.append(make_q(
        "Find the x-coordinate of the midpoint of the segment joining "
        "(%d, %d) and (%d, %d)." % (x1, y1, x2, y2),
        ["mx = (%d + %d) / 2" % (x1, x2)],
        fmt_num((x1 + x2) / 2)))
    m, n = ri(rng, 1, 4), ri(rng, 1, 4)
    if m == n:
        n += 1
    out.append(make_q(
        "Point P divides the segment joining (0, 0) and (%d, 0) internally "
        "in the ratio %d : %d. Find the x-coordinate of P." % (m + n, m, n),
        ["px = (%d * %d + %d * 0) / (%d + %d)" % (m, m + n, n, m, n)],
        fmt_num(m * (m + n) / (m + n))))
    x1, y1, x2, y2, x3 = (ri(rng, -6, 6) for _ in range(5))
    y3 = 0
    area = abs(x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2
    out.append(make_q(
        "Find the area of the triangle with vertices (%d, %d), (%d, %d) and "
        "(%d, %d) (two decimal places)." % (x1, y1, x2, y2, x3, y3),
        ["twice = abs(%d * (%d - %d) + %d * (%d - %d) + %d * (%d - %d))"
         % (x1, y2, y3, x2, y3, y1, x3, y1, y2),
         "area = twice / 2"],
        fmt_num(round(area, 2))))
    xs = [ri(rng, -5, 5) for _ in range(3)]
    ys = [ri(rng, -5, 5) for _ in range(3)]
    out.append(make_q(
        "Find the x-coordinate of the centroid of the triangle with vertices "
        "(%d, %d), (%d, %d) and (%d, %d)."
        % (xs[0], ys[0], xs[1], ys[1], xs[2], ys[2]),
        ["gx = (%d + %d + %d) / 3" % (xs[0], xs[1], xs[2])],
        fmt_num(sum(xs) / 3)))
    x1, y1 = ri(rng, -6, 6), ri(rng, -6, 6)
    x2, y2 = x1 + ri(rng, -4, 4), y1 + ri(rng, 1, 6)
    if x2 == x1:
        x2 += 2
    out.append(make_q(
        "Find the slope of the line through (%d, %d) and (%d, %d)."
        % (x1, y1, x2, y2),
        ["m = (%d - %d) / (%d - %d)" % (y2, y1, x2, x1)],
        fmt_num((y2 - y1) / (x2 - x1))))
    m1 = pick(rng, [2, 3, 4, 5])
    out.append(make_q(
        "A line has slope %d. Find the slope of a line perpendicular to it."
        % m1,
        ["mp = -1 / %d" % m1],
        fmt_num(-1 / m1)))
    m1, c = ri(rng, 1, 5), ri(rng, -6, 6)
    out.append(make_q(
        "A line passes through (%d, %d) with slope %d. Find its intercept c "
        "in y = mx + c." % (2, m1 * 2 + c, m1),
        ["c = %d - %d * %d" % (m1 * 2 + c, m1, 2)],
        str(c)))
    g = ri(rng, 1, 6)
    f = ri(rng, 1, 6)
    cconst = ri(rng, -5, 1)
    r2 = g * g + f * f - cconst
    if r2 <= 0:
        cconst = 1
        r2 = g * g + f * f - 1
    out.append(make_q(
        "The circle x^2 + y^2 + %dx + %dy + %d = 0 has centre (-%d, -%d). "
        "Find its radius (two decimal places)." % (2 * g, 2 * f, cconst, g, f),
        ["r = sqrt(%d * %d + %d * %d - %d)" % (g, g, f, f, cconst)],
        fmt_num(round(math.sqrt(r2), 2))))
    a_ax = ri(rng, 3, 9)
    b_ax = ri(rng, 2, a_ax - 1)
    out.append(make_q(
        "An ellipse has semi-axes a = %d and b = %d. Find its eccentricity "
        "(two decimal places)." % (a_ax, b_ax),
        ["c = sqrt(%d * %d - %d * %d)" % (a_ax, a_ax, b_ax, b_ax),
         "e = c / %d" % a_ax],
        fmt_num(round(math.sqrt(a_ax * a_ax - b_ax * b_ax) / a_ax, 2))))
    a_axis = ri(rng, 3, 8)
    b_axis = ri(rng, 2, 7)
    c_h = math.sqrt(a_axis ** 2 + b_axis ** 2)
    out.append(make_q(
        "A hyperbola has a = %d and b = %d. Find the focal distance c = "
        "sqrt(a^2 + b^2) (two decimal places)." % (a_axis, b_axis),
        ["c = sqrt(%d * %d + %d * %d)" % (a_axis, a_axis, b_axis, b_axis)],
        fmt_num(round(c_h, 2))))
    focal = ri(rng, 1, 6)
    out.append(make_q(
        "A parabola has equation y^2 = %dx. Find the length of its latus "
        "rectum (latus rectum = 4a)." % (4 * focal),
        ["latus = 4 * %d" % focal],
        str(4 * focal)))
    x1, y1, z1 = (ri(rng, -5, 5) for _ in range(3))
    dz = pick(rng, [3, 4, 6, 12])
    dy = pick(rng, [4, 12, 3, 8])
    dx = pick(rng, [12, 3, 4, 0])
    if dx == 0 and dy == dz == 12:
        dy = 5
    out.append(make_q(
        "Find the distance between the 3D points (%d, %d, %d) and "
        "(%d, %d, %d)." % (x1, y1, z1, x1 + dx, y1 + dy, z1 + dz),
        ["dist = sqrt(%d * %d + %d * %d + %d * %d)"
         % (dx, dx, dy, dy, dz, dz)],
        fmt_num(round(math.sqrt(dx * dx + dy * dy + dz * dz), 2))))
    x1, y1, z1 = (ri(rng, -6, 6) for _ in range(3))
    out.append(make_q(
        "Find the distance of the point (%d, %d, %d) from the origin (two "
        "decimal places)." % (x1, y1, z1),
        ["dist = sqrt(%d * %d + %d * %d + %d * %d)" % (x1, x1, y1, y1, z1, z1)],
        fmt_num(round(math.sqrt(x1 * x1 + y1 * y1 + z1 * z1), 2))))
    return out


@family("distance_pl")
def _distance_pl(rng):
    out = []
    a, b = ri(rng, 1, 5), ri(rng, 1, 5)
    x0, y0 = ri(rng, -6, 6), ri(rng, -6, 6)
    c = ri(rng, -8, 8)
    val = a * x0 + b * y0 + c
    if val == 0:
        c += 1
        val += 1
    out.append(make_q(
        "Find the distance of the point (%d, %d) from the line %dx + %dy + "
        "%d = 0 (two decimal places)." % (x0, y0, a, b, c),
        ["num = abs(%d * %d + %d * %d + %d)" % (a, x0, b, y0, c),
         "den = sqrt(%d * %d + %d * %d)" % (a, a, b, b),
         "dist = num / den"],
        fmt_num(round(abs(val) / math.sqrt(a * a + b * b), 2))))
    a, b = ri(rng, 1, 4), ri(rng, 1, 4)
    c1 = ri(rng, 2, 9)
    diff = ri(rng, 1, 8)
    c2 = c1 + diff
    out.append(make_q(
        "Find the distance between the parallel lines %dx + %dy + %d = 0 and "
        "%dx + %dy + %d = 0 (two decimal places)." % (a, b, c1, a, b, c2),
        ["num = abs(%d - %d)" % (c2, c1),
         "den = sqrt(%d * %d + %d * %d)" % (a, a, b, b),
         "dist = num / den"],
        fmt_num(round(diff / math.sqrt(a * a + b * b), 2))))
    m1, m2 = ri(rng, -4, 4), ri(rng, -4, 4)
    if m1 * m2 == -1 or m1 == m2:
        m2 = m1 + 2
    out.append(make_q(
        "Find the acute angle between lines with slopes %d and %d using "
        "tan(theta) = |(m2 - m1) / (1 + m1 m2)| (report tan of the angle, "
        "two decimal places)." % (m1, m2),
        ["t = abs((%d - %d) / (1 + %d * %d))" % (m2, m1, m1, m2)],
        fmt_num(round(abs((m2 - m1) / (1 + m1 * m2)), 2))))
    k = ri(rng, 1, 6)
    x0 = ri(rng, 1, 5)
    out.append(make_q(
        "Lines %dx + 2y + 5 = 0, 3y + %dx + 7 = 0 and 4x + 5y + k = 0 are "
        "concurrent at the point where the first two meet at x = %d. Find k "
        "if the point also satisfies 4x + 5y + k = 0 and y comes from the "
        "first line: 5x + 2y = -5 with x = %d gives y; report k."
        % (k + 1, 0, x0, x0) if False else
        "Two lines 5x + 2y = -5 and 4x + 5y + k = 0 meet at x = %d where y = "
        "(-5 - 5x)/2. Find k so that the point lies on the second line."
        % x0,
        ["y = (-5 - 5 * %d) / 2" % x0, "k = -(4 * %d + 5 * y)" % x0],
        str(-(4 * x0 + 5 * (-5 - 5 * x0) / 2))))
    return out


# ------------------------------------------------------------------ #
# trigonometry
# ------------------------------------------------------------------ #

@family("trig_ratios")
def _trig_ratios(rng):
    out = []
    a, b, c = pick(rng, TRIPLES)
    out.append(make_q(
        "In a right triangle the sides adjacent to the right angle are %d "
        "and %d, and the hypotenuse is %d. Find sin of the angle opposite "
        "the side %d. (give the fraction)" % (a, b, c, a),
        ["s = %d / %d" % (a, c)],
        frac_str(a, c)))
    out.append(make_q(
        "For the same triangle (legs %d and %d, hypotenuse %d), find cos of "
        "the angle opposite the side %d. (give the fraction)" % (a, b, c, b),
        ["c_val = %d / %d" % (b, c)],
        frac_str(b, c)))
    out.append(make_q(
        "For a right triangle with legs %d and %d and hypotenuse %d, find "
        "tan of the angle opposite the side %d. (give the fraction)"
        % (a, b, c, a),
        ["t = %d / %d" % (a, b)],
        frac_str(a, b)))
    out.append(make_q(
        "If sin(A) = %d/%d, find cosec(A). (give the fraction)" % (a, c),
        ["cs = %d / %d" % (c, a)],
        frac_str(c, a)))
    out.append(make_q(
        "If cos(A) = %d/%d, find sec(A). (give the fraction)" % (b, c),
        ["sec = %d / %d" % (c, b)],
        frac_str(c, b)))
    out.append(make_q(
        "Given sin(A) = %d/%d and cos(A) = %d/%d, find tan(A). (give the "
        "fraction)" % (a, c, b, c),
        ["t = (%d / %d) / (%d / %d)" % (a, c, b, c)],
        frac_str(a, b)))
    out.append(make_q(
        "Evaluate sin 30 + cos 60. (give the fraction)",
        ["val = 1 / 2 + 1 / 2"],
        "1"))
    out.append(make_q(
        "Evaluate tan 45 + sin 90.",
        ["val = 1 + 1"],
        "2"))
    out.append(make_q(
        "Evaluate sin^2 30 + cos^2 30.",
        ["val = (1 / 2) ** 2 + (sqrt(3) / 2) ** 2"],
        "1"))
    out.append(make_q(
        "If sin(x) = 3/5, find sin(90 - x) degrees. (give the fraction)",
        ["val = 4 / 5"],
        "4/5"))
    out.append(make_q(
        "Using sin^2 A + cos^2 A = 1, find cos(A) when sin(A) = 5/13, "
        "taking the positive value. (give the fraction)",
        ["val = sqrt(1 - (5 / 13) ** 2)"],
        frac_str(12, 13)))
    out.append(make_q(
        "Find the value of 2 tan 30 sec 45 / (1 / 2) using standard values "
        "(two decimal places).",
        ["val = 2 * (1 / sqrt(3)) * sqrt(2) / (1 / 2)"],
        fmt_num(round(4 * math.sqrt(2) / math.sqrt(3), 2))))
    angle = pick(rng, [30, 45, 60])
    dist = pick(rng, [10, 20, 30, 40, 50])
    h = dist * {"30": 1 / math.sqrt(3), "45": 1.0, "60": math.sqrt(3)}[str(angle)]
    out.append(make_q(
        "The angle of elevation of a tower's top from %d m away on level "
        "ground is %d degrees. Find the tower's height (two decimal places)."
        % (dist, angle),
        ["h = %d * tan(%d * pi / 180)" % (dist, angle)],
        fmt_num(round(h, 2))))
    out.append(make_q(
        "A %d m tall pole casts a shadow when the sun's elevation is 45 "
        "degrees. Find the shadow length." % 12,
        ["shadow = 12 / tan(45 * pi / 180)"],
        "12"))
    insc = pick(rng, [25, 30, 35, 40, 45])
    out.append(make_q(
        "An angle inscribed in a circle is %d degrees. The central angle on "
        "the same arc is twice as large; find it." % insc,
        ["central = 2 * %d" % insc],
        str(2 * insc)))
    return out


@family("trig_identities")
def _trig_identities(rng):
    out = []
    a, b, c = pick(rng, TRIPLES)
    out.append(make_q(
        "Verify sin^2 A + cos^2 A = 1 for the right triangle with legs %d, "
        "%d and hypotenuse %d by computing (%d/%d)^2 + (%d/%d)^2."
        % (a, b, c, a, c, b, c),
        ["val = (%d / %d) ** 2 + (%d / %d) ** 2" % (a, c, b, c)],
        "1"))
    out.append(make_q(
        "Using 1 + tan^2 A = sec^2 A with tan A = %d/%d, find sec A as a "
        "fraction." % (a, b),
        ["sec = sqrt(1 + (%d / %d) ** 2)" % (a, b)],
        frac_str(c, b)))
    out.append(make_q(
        "Using 1 + cot^2 A = cosec^2 A with cot A = %d/%d, find cosec A as "
        "a fraction." % (b, a),
        ["csc = sqrt(1 + (%d / %d) ** 2)" % (b, a)],
        frac_str(c, a)))
    x = ri(rng, 10, 40)
    out.append(make_q(
        "If sin A = %d/%d and cos A = %d/%d (same right triangle), compute "
        "sin 2A = 2 sin A cos A as a fraction." % (a, c, b, c),
        ["val = 2 * (%d / %d) * (%d / %d)" % (a, c, b, c)],
        frac_str(2 * a * b, c * c)))
    out.append(make_q(
        "Compound angle: with sin A = 3/5, cos A = 4/5, sin B = 5/13, cos B "
        "= 12/13, find sin(A + B) = sinA cosB + cosA sinB as a fraction.",
        ["val = (3 / 5) * (12 / 13) + (4 / 5) * (5 / 13)"],
        frac_str(56, 65)))
    out.append(make_q(
        "Evaluate cos(90 - A) when cos A = 7/25 and sin A = 24/25. (give "
        "the fraction)",
        ["val = 24 / 25"],
        "24/25"))
    return out


# ------------------------------------------------------------------ #
# matrices, determinants, complex
# ------------------------------------------------------------------ #

@family("matrices")
def _matrices(rng):
    out = []
    a11, a12, a21, a22 = (ri(rng, -6, 9) for _ in range(4))
    det = a11 * a22 - a12 * a21
    out.append(make_q(
        "Find the determinant of [[%d, %d], [%d, %d]]."
        % (a11, a12, a21, a22),
        ["det = %d * %d - %d * %d" % (a11, a22, a12, a21)],
        str(det)))
    m = [[ri(rng, -5, 8) for _ in range(3)] for _ in range(3)]
    det3 = (m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1])
            - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0])
            + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]))
    out.append(make_q(
        "Expand the determinant [[%d, %d, %d], [%d, %d, %d], [%d, %d, %d]] "
        "along the first row."
        % (m[0][0], m[0][1], m[0][2], m[1][0], m[1][1], m[1][2],
           m[2][0], m[2][1], m[2][2]),
        ["m11 = %d * %d - %d * %d" % (m[1][1], m[2][2], m[1][2], m[2][1]),
         "m12 = %d * %d - %d * %d" % (m[1][0], m[2][2], m[1][2], m[2][0]),
         "m13 = %d * %d - %d * %d" % (m[1][0], m[2][1], m[1][1], m[2][0]),
         "det = %d * m11 - %d * m12 + %d * m13"
         % (m[0][0], m[0][1], m[0][2])],
        str(det3)))
    a11, a12, b11, b21 = (ri(rng, -5, 8) for _ in range(4))
    out.append(make_q(
        "For matrices A = [[%d, %d], [1, 2]] and B = [[%d], [%d]] (column), "
        "find the (1,1) entry of AB." % (a11, a12, b11, b21),
        ["c11 = %d * %d + %d * %d" % (a11, b11, a12, b21)],
        str(a11 * b11 + a12 * b21)))
    k = ri(rng, 2, 6)
    e = ri(rng, -5, 8)
    out.append(make_q(
        "Find the (1,1) entry of the scalar product %d times a matrix whose "
        "(1,1) entry is %d." % (k, e),
        ["entry = %d * %d" % (k, e)],
        str(k * e)))
    r, c = pick(rng, [(2, 3), (3, 2), (3, 4), (4, 3)])
    out.append(make_q(
        "A matrix has %d rows and %d columns. How many elements does it "
        "have?" % (r, c),
        ["count = %d * %d" % (r, c)],
        str(r * c)))
    det2 = ri(rng, 1, 8)
    k2 = ri(rng, 2, 4)
    out.append(make_q(
        "A 2 x 2 matrix A has determinant %d. Find det(%dA) using "
        "det(kA) = k^n det A." % (det2, k2),
        ["det = %d * %d ** 2" % (k2, k2) if False else
         "%d ** 2 * %d" % (k2, det2)],
        str(k2 * k2 * det2)))
    detm = ri(rng, 1, 6)
    cof = ri(rng, 1, 9)
    out.append(make_q(
        "A 3 x 3 matrix has det = %d; its adjugate has (1,1) entry (the "
        "(1,1) cofactor) %d. Find the (1,1) entry of the inverse, "
        "cofactor / det, (two decimal places)." % (detm, cof),
        ["inv = %d / %d" % (cof, detm)],
        fmt_num(cof / detm)))
    xdet = ri(rng, 1, 9)
    k3 = ri(rng, 2, 4)
    out.append(make_q(
        "A square matrix A of order 3 has det A = %d. Find det(adj A) using "
        "det(adj A) = (det A)^(n - 1)." % xdet,
        ["adj_det = %d ** 2" % xdet],
        str(xdet * xdet)))
    b1, b2, d1, d2 = (ri(rng, -5, 8) for _ in range(4))
    if b1 * d2 - b2 * d1 == 0:
        d2 += 1
    x, y = 2, 3
    det_main = b1 * d2 - b2 * d1
    # system: b1 x + c1 y = e1 ; choose c, e to force solution (x, y)
    c1, c2 = ri(rng, -4, 6), ri(rng, -4, 6)
    e1 = b1 * x + c1 * y
    e2 = b2 * x + c2 * y
    out.append(make_q(
        "Solve by Cramer's rule: %dx + %dy = %d and %dx + %dy = %d. Report "
        "Dx = |%d %d; %d %d| (the determinant with the x-column replaced)."
        % (b1, c1, e1, b2, c2, e2, e1, c1, e2, c2),
        ["dx = %d * %d - %d * %d" % (e1, c2, c1, e2)],
        str(e1 * c2 - c1 * e2)))
    out.append(make_q(
        "For the same system %dx + %dy = %d, %dx + %dy = %d, find D = "
        "|%d %d; %d %d|." % (b1, c1, e1, b2, c2, e2, b1, c1, b2, c2),
        ["d = %d * %d - %d * %d" % (b1, c2, c1, b2)],
        str(det_main)))
    out.append(make_q(
        "The vertices of a triangle are (%d, %d), (%d, %d) and (%d, %d). "
        "Use the determinant formula to find its area (two decimal places)."
        % (0, 0, 4, 0, 2, 6)
        if False else
        "The vertices of a triangle are (0, 0), (6, 0) and (2, %d). Find "
        "its area." % ri(rng, 2, 9),
        ["area = abs(6 * %d) / 2" % 5 if False else "area = 6 * %d / 2" % 3],
        "9"))
    re1, im1, re2, im2 = (ri(rng, -6, 8) for _ in range(4))
    out.append(make_q(
        "Find the real part of (%d + %di)(%d + %di)." % (re1, im1, re2, im2),
        ["real = %d * %d - %d * %d" % (re1, re2, im1, im2)],
        str(re1 * re2 - im1 * im2)))
    a, b = ri(rng, 1, 5), ri(rng, 1, 5)
    out.append(make_q(
        "Find the modulus of the complex number %d + %di." % (a, b),
        ["mod = sqrt(%d * %d + %d * %d)" % (a, a, b, b)],
        fmt_num(round(math.hypot(a, b), 2))))
    out.append(make_q(
        "Compute z times conjugate of z for z = %d + %di; report a^2 + b^2."
        % (a, b),
        ["prod = %d * %d + %d * %d" % (a, a, b, b)],
        str(a * a + b * b)))
    k = ri(rng, 5, 40)
    out.append(make_q(
        "Powers of i cycle with period 4: find the remainder when the "
        "exponent %d is divided by 4 (this identifies i^%d in the cycle)."
        % (k, k),
        ["rem = %d %% 4" % k],
        str(k % 4)))
    return out


# ------------------------------------------------------------------ #
# vectors
# ------------------------------------------------------------------ #

@family("vectors")
def _vectors(rng):
    out = []
    x, y, z = (ri(rng, -6, 8) for _ in range(3))
    out.append(make_q(
        "Find the magnitude of the vector %di + %dj + %dk (two decimal "
        "places)." % (x, y, z),
        ["mag = sqrt(%d * %d + %d * %d + %d * %d)" % (x, x, y, y, z, z)],
        fmt_num(round(math.sqrt(x * x + y * y + z * z), 2))))
    a1, a2, a3, b1, b2, b3 = (ri(rng, -5, 6) for _ in range(6))
    out.append(make_q(
        "Find the dot product of (%d, %d, %d) and (%d, %d, %d)."
        % (a1, a2, a3, b1, b2, b3),
        ["dot = %d * %d + %d * %d + %d * %d" % (a1, b1, a2, b2, a3, b3)],
        str(a1 * b1 + a2 * b2 + a3 * b3)))
    if a1 * b1 + a2 * b2 + a3 * b3 == 0:
        a1 += 1
    dot = a1 * b1 + a2 * b2 + a3 * b3
    ma = math.sqrt(a1 * a1 + a2 * a2 + a3 * a3)
    mb = math.sqrt(b1 * b1 + b2 * b2 + b3 * b3)
    out.append(make_q(
        "Vectors a = (%d, %d, %d) and b = (%d, %d, %d) have dot product %d. "
        "Find cos of the angle between them, dot / (|a||b|), with the "
        "magnitudes rounded inside the chain (two decimal places)."
        % (a1, a2, a3, b1, b2, b3, dot),
        ["mag_a = sqrt(%d * %d + %d * %d + %d * %d)" % (a1, a1, a2, a2, a3, a3),
         "mag_b = sqrt(%d * %d + %d * %d + %d * %d)" % (b1, b1, b2, b2, b3, b3),
         "cos_t = %d / (mag_a * mag_b)" % dot],
        fmt_num(round(dot / (ma * mb), 2))))
    out.append(make_q(
        "Find the projection of a = (%d, %d, %d) on b = (%d, 0, 0)."
        % (a1, a2, a3, b1 if b1 != 0 else 1),
        ["proj = %d / %d" % (a1 * (b1 if b1 else 1), (b1 if b1 else 1))],
        fmt_num(a1)))
    x1, y1, z1, x2, y2, z2 = (ri(rng, -5, 5) for _ in range(6))
    out.append(make_q(
        "Find the components of the vector from P(%d, %d, %d) to Q(%d, %d, "
        "%d) and report the x-component." % (x1, y1, z1, x2, y2, z2),
        ["vx = %d - %d" % (x2, x1)],
        str(x2 - x1)))
    c1 = a2 * b3 - a3 * b2
    c2 = a3 * b1 - a1 * b3
    c3 = a1 * b2 - a2 * b1
    cross = math.sqrt(c1 * c1 + c2 * c2 + c3 * c3)
    out.append(make_q(
        "Find the magnitude of the cross product of (%d, %d, %d) and "
        "(%d, %d, %d) by computing all three components first (two decimal "
        "places)." % (a1, a2, a3, b1, b2, b3),
        ["c1 = %d * %d - %d * %d" % (a2, b3, a3, b2),
         "c2 = %d * %d - %d * %d" % (a3, b1, a1, b3),
         "c3 = %d * %d - %d * %d" % (a1, b2, a2, b1),
         "mag = sqrt(c1 * c1 + c2 * c2 + c3 * c3)"],
        fmt_num(round(cross, 2))))
    out.append(make_q(
        "The adjacent sides of a parallelogram are the vectors (%d, %d, %d) "
        "and (%d, %d, %d). Its area equals |a x b|; using the values from "
        "the cross product components c1 = %d, c2 = %d, c3 = %d, find the "
        "area (two decimal places)."
        % (a1, a2, a3, b1, b2, b3, c1, c2, c3),
        ["area = sqrt(%d * %d + %d * %d + %d * %d)" % (c1, c1, c2, c2, c3, c3)],
        fmt_num(round(cross, 2))))
    l1, l2 = 3, 4
    out.append(make_q(
        "A unit-direction question: direction cosines of a line satisfy "
        "l^2 + m^2 + n^2 = 1. If l = 3/5 and m = 4/5, find n (positive).",
        ["n = sqrt(1 - (3 / 5) ** 2 - (4 / 5) ** 2)"],
        "0"))
    out.append(make_q(
        "If l = 1/3 and m = 2/3 are two direction cosines, find n^2 as a "
        "fraction (n^2 = 1 - l^2 - m^2).",
        ["n2 = 1 - (1 / 3) ** 2 - (2 / 3) ** 2"],
        frac_str(4, 9)))
    return out


# ------------------------------------------------------------------ #
# calculus
# ------------------------------------------------------------------ #

@family("calculus")
def _calculus(rng):
    out = []
    a, b, c, x0 = ri(rng, 1, 5), ri(rng, 1, 8), ri(rng, 1, 9), ri(rng, 1, 5)
    out.append(make_q(
        "Evaluate the limit of %dx^2 + %dx + %d as x approaches %d (direct "
        "substitution)." % (a, b, c, x0),
        ["val = %d * %d * %d + %d * %d + %d" % (a, x0, x0, b, x0, c)],
        str(a * x0 * x0 + b * x0 + c)))
    n = ri(rng, 2, 4)
    coef = ri(rng, 1, 5)
    out.append(make_q(
        "By the power rule, the derivative of %dx^%d is %dx^%d. Find the "
        "derivative's value at x = %d." % (coef, n, coef * n, n - 1, x0),
        ["dy = %d * %d * %d ** %d" % (coef, n, x0, n - 1)],
        str(coef * n * x0 ** (n - 1))))
    a, b, c = ri(rng, 1, 4), ri(rng, 1, 6), ri(rng, 1, 8)
    x0 = ri(rng, 1, 4)
    out.append(make_q(
        "For y = %dx^2 + %dx + %d, find the slope of the tangent at x = %d."
        % (a, b, c, x0),
        ["slope = 2 * %d * %d + %d" % (a, x0, b)],
        str(2 * a * x0 + b)))
    out.append(make_q(
        "For y = %dx^2 + %dx + %d at x = %d, the tangent slope is m; find "
        "the slope of the normal (-1/m), two decimal places." % (a, b, c, x0),
        ["m = 2 * %d * %d + %d" % (a, x0, b), "normal = -1 / m"],
        fmt_num(round(-1 / (2 * a * x0 + b), 2))))
    k_inner = ri(rng, 1, 4)
    x_in = ri(rng, 1, 5)
    out.append(make_q(
        "Chain rule: y = (5x + 2)^3 has dy/dx = 15(5x + 2)^2. Evaluate it at "
        "x = %d." % x_in,
        ["inner = 5 * %d + 2" % x_in, "dy = 15 * inner * inner"],
        str(15 * (5 * x_in + 2) ** 2)))
    out.append(make_q(
        "Second derivative test: for y = x^3 - 3x^2 + 2, y'' = 6x - 6. "
        "Evaluate y'' at the critical point x = 1 to classify it.",
        ["second = 6 * 1 - 6"],
        "0"))
    out.append(make_q(
        "The area of a circle is A = pi r^2, so dA/dr = 2 pi r. Find the "
        "rate of change of area with respect to r when r = 7 (pi = 22/7).",
        ["rate = 2 * 22 / 7 * 7"],
        "44"))
    ra = ri(rng, 10, 40)
    rb = ra + ri(rng, 5, 30)
    out.append(make_q(
        "Marginal revenue from R(x) = %dx - x^2/10 at x = 10 is R'(x) = %d - "
        "x/5. Evaluate it at x = 10 (two decimal places)." % (ra, ra)
        if False else
        "For the revenue function R(x) = 40x - x^2/10, find the marginal "
        "revenue at x = 10 (two decimal places).",
        ["mr = 40 - 10 / 5"],
        "38"))
    cost = ri(rng, 500, 2000)
    rev = cost + ri(rng, 100, 2000)
    out.append(make_q(
        "A firm's total cost is Rs %d and total revenue is Rs %d at the "
        "current output. Find the profit." % (cost, rev),
        ["profit = %d - %d" % (rev, cost)],
        str(rev - cost)))
    mc = ri(rng, 10, 40)
    mr2 = mc + ri(rng, 2, 30)
    out.append(make_q(
        "At an output level the marginal cost is Rs %d and the marginal "
        "revenue is Rs %d. Find the marginal profit." % (mc, mr2),
        ["mp = %d - %d" % (mr2, mc)],
        str(mr2 - mc)))
    lower, upper = ri(rng, 0, 3), ri(rng, 4, 7)
    out.append(make_q(
        "Evaluate the definite integral of 2x from %d to %d using the "
        "antiderivative x^2 (report F(b) - F(a))." % (lower, upper),
        ["fb = %d * %d" % (upper, upper), "fa = %d * %d" % (lower, lower),
         "val = fb - fa"],
        str(upper * upper - lower * lower)))
    out.append(make_q(
        "Find the area under y = 3x + 2 from x = 0 to x = 4 using the "
        "antiderivative (3/2)x^2 + 2x.",
        ["fb = 3 / 2 * 16 + 2 * 4", "fa = 0", "area = fb - fa"],
        "32"))
    r7 = 7 * ri(rng, 1, 4)
    out.append(make_q(
        "The area enclosed by the circle x^2 + y^2 = %d^2 is pi r^2. Compute "
        "it with pi = 22/7." % r7,
        ["area = 22 / 7 * %d * %d" % (r7, r7)],
        str(22 / 7 * r7 * r7)))
    c0 = ri(rng, 2, 12)
    x_at = ri(rng, 1, 6)
    rate = ri(rng, 2, 6)
    y_at = rate * x_at + c0
    out.append(make_q(
        "A quantity changes at the constant rate %d per unit: dy/dx = %d. If "
        "y = %d when x = 0, find y when x = %d (particular solution)."
        % (rate, rate, c0, x_at),
        ["c = %d - %d * 0" % (c0, rate), "y = %d * %d + c" % (rate, x_at)],
        str(y_at)))
    p_coef = ri(rng, 1, 4)
    out.append(make_q(
        "For the linear equation dy/dx + %d y / x = 0, the integrating "
        "factor is x^%d. Verify the exponent by computing x^%d at x = 2."
        % (p_coef, p_coef, p_coef),
        ["ifac = 2 ** %d" % p_coef],
        str(2 ** p_coef)))
    z = ri(rng, 30, 90)
    c1 = ri(rng, 2, 12)
    out.append(make_q(
        "Maximise Z = 3x + 4y at the corner point (%d, %d) of the feasible "
        "region." % (c1, ri(rng, 2, 9)) if False else
        "Maximise Z = 3x + 4y at the corner point (5, %d)." % c1,
        ["z = 3 * 5 + 4 * %d" % c1],
        str(15 + 4 * c1)))
    z1 = ri(rng, 5, 30)
    z2 = z1 + ri(rng, 2, 20)
    out.append(make_q(
        "An LPP has optimal values %d and %d at two corner points for a "
        "maximisation problem. Find the maximum of Z." % (z1, z2),
        ["best = max(%d, %d)" % (z1, z2)],
        str(max(z1, z2))))
    return out
