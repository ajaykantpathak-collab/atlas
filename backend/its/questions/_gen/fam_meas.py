"""fam_meas.py -- perimeter, area, circles, surface area and volume,
angles, polygon geometry, basic shape facts."""
from __future__ import annotations

import math

from qbank_lib import family, make_q, ri, pick, fmt_num

PI22 = "22 / 7"          # exact pi when radius is a multiple of 7


def _r7(rng):
    return 7 * ri(rng, 1, 12)


# ------------------------------------------------------------------ #
# perimeter and area (rectilinear)
# ------------------------------------------------------------------ #

@family("perimeter")
def _perimeter(rng):
    out = []
    l, w = ri(rng, 3, 40), ri(rng, 3, 40)
    out.append(make_q(
        "A rectangular park is %d m long and %d m wide. Find its perimeter."
        % (l, w),
        ["perim = 2 * (%d + %d)" % (l, w)],
        str(2 * (l + w))))
    s = ri(rng, 4, 35)
    out.append(make_q(
        "Find the perimeter of a square with side %d cm." % s,
        ["perim = 4 * %d" % s],
        str(4 * s)))
    a, b, c = ri(rng, 3, 20), ri(rng, 3, 20), ri(rng, 3, 20)
    out.append(make_q(
        "Find the perimeter of a triangle with sides %d cm, %d cm and %d cm."
        % (a, b, c),
        ["perim = %d + %d + %d" % (a, b, c)],
        str(a + b + c)))
    s = ri(rng, 3, 25)
    out.append(make_q(
        "An equilateral triangle has each side %d cm. What is its perimeter?"
        % s,
        ["perim = 3 * %d" % s],
        str(3 * s)))
    n = pick(rng, [5, 6, 8, 9, 10, 12])
    s = ri(rng, 3, 15)
    out.append(make_q(
        "A regular polygon has %d sides, each %d cm long. Find its perimeter."
        % (n, s),
        ["perim = %d * %d" % (n, s)],
        str(n * s)))
    s = ri(rng, 5, 25)
    rounds = pick(rng, [3, 4, 5, 6, 8, 10])
    out.append(make_q(
        "A jogger runs %d rounds around a square field of side %d m. How "
        "many metres does she cover?" % (rounds, s),
        ["dist = %d * 4 * %d" % (rounds, s)],
        str(rounds * 4 * s)))
    per = pick(rng, [36, 40, 48, 60, 72, 80, 100])
    n = pick(rng, [4, 5, 6, 8, 10])
    out.append(make_q(
        "A regular polygon has perimeter %d cm and %d sides. Find the length "
        "of one side." % (per, n),
        ["side = %d / %d" % (per, n)],
        fmt_num(per / n)))
    per = pick(rng, [24, 32, 40, 56, 64])
    known = per // 2 - pick(rng, [4, 6, 8, 10])
    other = per // 2 - known
    out.append(make_q(
        "A rectangle has perimeter %d cm and one side %d cm. Find the other "
        "side." % (per, known),
        ["other = %d / 2 - %d" % (per, known)],
        str(other)))
    s = pick(rng, [12, 16, 20, 24])
    out.append(make_q(
        "A square has perimeter %d cm. Find the length of one side." % s,
        ["side = %d / 4" % s],
        str(s // 4)))
    p = pick(rng, [30, 36, 42, 48])
    s1, s2 = 10, 12
    out.append(make_q(
        "A triangle has perimeter %d cm and two of its sides measure %d cm "
        "and %d cm. Find the third side." % (p, s1, s2),
        ["side3 = %d - (%d + %d)" % (p, s1, s2)],
        str(p - s1 - s2)))
    l, w = ri(rng, 4, 15), ri(rng, 4, 15)
    rate = pick(rng, [5, 10, 12, 15, 20])
    out.append(make_q(
        "Fencing costs Rs %d per metre. Find the cost of fencing a %d m x "
        "%d m rectangular field." % (rate, l, w),
        ["perim = 2 * (%d + %d)" % (l, w), "cost = perim * %d" % rate],
        str(2 * (l + w) * rate)))
    return out


@family("area_rect")
def _area_rect(rng):
    out = []
    l, w = ri(rng, 3, 30), ri(rng, 3, 30)
    out.append(make_q(
        "Find the area of a rectangle measuring %d cm by %d cm." % (l, w),
        ["area = %d * %d" % (l, w)],
        str(l * w)))
    s = ri(rng, 4, 25)
    out.append(make_q(
        "Find the area of a square of side %d m." % s,
        ["area = %d * %d" % (s, s)],
        str(s * s)))
    l, w = ri(rng, 3, 12), ri(rng, 3, 12)
    out.append(make_q(
        "A %d m x %d m garden has a %d m x %d m flower bed inside it. Find "
        "the area of the remaining garden." % (l + 4, w + 4, l, w),
        ["total = %d * %d" % (l + 4, w + 4), "bed = %d * %d" % (l, w),
         "left = total - bed"],
        str((l + 4) * (w + 4) - l * w)))
    area = pick(rng, [36, 48, 60, 72, 84, 96, 120])
    length = pick(rng, [6, 8, 10, 12])
    out.append(make_q(
        "A rectangle has area %d sq cm and length %d cm. Find its breadth."
        % (area, length),
        ["width = %d / %d" % (area, length)],
        fmt_num(area / length)))
    rate = pick(rng, [8, 10, 15, 20, 25])
    l, w = ri(rng, 5, 20), ri(rng, 5, 20)
    out.append(make_q(
        "Tiling costs Rs %d per square metre. Find the cost of tiling a %d m "
        "x %d m floor." % (rate, l, w),
        ["area = %d * %d" % (l, w), "cost = area * %d" % rate],
        str(l * w * rate)))
    each = pick(rng, [2, 3, 4, 5, 6])
    l, w = each * ri(rng, 3, 7), each * ri(rng, 3, 7)
    out.append(make_q(
        "How many tiles of side %d m (square tiles) fit in a %d m x %d m "
        "hall?" % (each, l, w),
        ["count = %d * %d / (%d * %d)" % (l, w, each, each)],
        str((l * w) // (each * each))))
    count = ri(rng, 3, 15)
    unit = pick(rng, [12, 15, 20, 25])
    out.append(make_q(
        "One table top has area %d sq dm. Find the total area of %d such "
        "tops." % (unit, count),
        ["total = %d * %d" % (count, unit)],
        str(count * unit)))
    b, h = ri(rng, 4, 20), ri(rng, 4, 20)
    out.append(make_q(
        "Find the area of a triangle with base %d cm and height %d cm."
        % (b, h),
        ["area = %d * %d / 2" % (b, h)],
        str(b * h // 2) if (b * h) % 2 == 0 else fmt_num(b * h / 2)))
    return out


@family("area_quad")
def _area_quad(rng):
    out = []
    b, h = ri(rng, 4, 24), ri(rng, 4, 24)
    out.append(make_q(
        "Find the area of a parallelogram with base %d cm and height %d cm."
        % (b, h),
        ["area = %d * %d" % (b, h)],
        str(b * h)))
    p, q = ri(rng, 2, 15) * 2, ri(rng, 2, 15) * 2
    out.append(make_q(
        "The diagonals of a rhombus are %d cm and %d cm. Find its area."
        % (p, q),
        ["area = %d * %d / 2" % (p, q)],
        str(p * q // 2)))
    a, b = ri(rng, 4, 20), ri(rng, 21, 34)
    h = pick(rng, [6, 8, 10, 12, 14])
    out.append(make_q(
        "The parallel sides of a trapezium are %d cm and %d cm and the "
        "distance between them is %d cm. Find the area." % (a, b, h),
        ["area = %d * (%d + %d) / 2" % (h, a, b)],
        str(h * (a + b) // 2)))
    d = ri(rng, 4, 20) * 2
    h1, h2 = pick(rng, [4, 6, 8]), pick(rng, [6, 8, 10])
    out.append(make_q(
        "A quadrilateral has diagonal %d cm and the perpendiculars on it "
        "from opposite vertices are %d cm and %d cm. Find the area."
        % (d, h1, h2),
        ["area = %d * (%d + %d) / 2" % (d, h1, h2)],
        str(d * (h1 + h2) // 2)))
    b1, alt1 = pick(rng, [10, 12, 15, 20]), pick(rng, [4, 6, 8, 10])
    b2 = pick(rng, [10, 12, 15, 20, 24])
    out.append(make_q(
        "A triangle and a parallelogram stand on the same base. The "
        "triangle's area equals the parallelogram's; the triangle has base "
        "%d cm and height %d cm. Find the parallelogram's height if its base "
        "is %d cm." % (b1, alt1, b2),
        ["area = %d * %d / 2" % (b1, alt1), "alt2 = area / %d" % b2],
        fmt_num(round(b1 * alt1 / 2 / b2, 2))))
    side, alt = pick(rng, [6, 8, 10]), pick(rng, [4, 6, 8, 12])
    out.append(make_q(
        "A rhombus-shaped field has base %d m and height %d m. Find its area."
        % (side, alt),
        ["area = %d * %d" % (side, alt)],
        str(side * alt)))
    tri_h = pick(rng, [6, 8, 10, 12])
    tri_b = pick(rng, [8, 10, 12, 14])
    out.append(make_q(
        "Split a polygon into a rectangle %d cm x %d cm and a triangle with "
        "base %d cm and height %d cm on top of it. Find the total area."
        % (tri_b, 5, tri_b, tri_h),
        ["rect = %d * 5" % tri_b, "tri = %d * %d / 2" % (tri_b, tri_h),
         "total = rect + tri"],
        str(tri_b * 5 + tri_b * tri_h // 2)))
    return out


# ------------------------------------------------------------------ #
# circles
# ------------------------------------------------------------------ #

@family("circle_area")
def _circle_area(rng):
    out = []
    r = _r7(rng)
    out.append(make_q(
        "Find the circumference of a circle of radius %d cm (take pi = 22/7)."
        % r,
        ["circ = 2 * %s * %d" % (PI22, r)],
        fmt_num(2 * 22 / 7 * r)))
    d = _r7(rng)
    out.append(make_q(
        "A circle has diameter %d cm. Find its circumference (pi = 22/7)." % d,
        ["circ = %s * %d" % (PI22, d)],
        fmt_num(22 / 7 * d)))
    r = _r7(rng)
    out.append(make_q(
        "Find the area of a circle of radius %d cm (pi = 22/7)." % r,
        ["area = %s * %d * %d" % (PI22, r, r)],
        fmt_num(22 / 7 * r * r)))
    r1 = _r7(rng)
    r2 = r1 + _r7(rng)
    out.append(make_q(
        "Two concentric circles have radii %d cm and %d cm. Find the area of "
        "the ring between them (pi = 22/7)." % (r1, r2),
        ["area = %s * (%d * %d - %d * %d)" % (PI22, r2, r2, r1, r1)],
        fmt_num(22 / 7 * (r2 * r2 - r1 * r1))))
    r = _r7(rng)
    ang = pick(rng, [45, 60, 90, 120, 180, 270])
    out.append(make_q(
        "Find the length of an arc that subtends %d degrees at the centre of "
        "a circle of radius %d cm (pi = 22/7)." % (ang, r),
        ["arc = %d / 360 * 2 * %s * %d" % (ang, PI22, r)],
        fmt_num(ang / 360 * 2 * 22 / 7 * r)))
    r = _r7(rng)
    ang = pick(rng, [30, 60, 90, 120, 180])
    out.append(make_q(
        "Find the area of a sector with central angle %d degrees in a circle "
        "of radius %d cm (pi = 22/7)." % (ang, r),
        ["sector = %d / 360 * %s * %d * %d" % (ang, PI22, r, r)],
        fmt_num(ang / 360 * 22 / 7 * r * r)))
    r = pick(rng, [5, 10, 12, 13, 15])
    d = pick(rng, [3, 4, 5, 9])
    out.append(make_q(
        "A chord of a circle of radius %d cm lies at a distance of %d cm "
        "from the centre. Find the chord length." % (r, d),
        ["half = sqrt(%d * %d - %d * %d)" % (r, r, d, d), "chord = 2 * half"],
        str(int(2 * math.sqrt(r * r - d * d)))))
    ang = pick(rng, [30, 40, 50, 60])
    out.append(make_q(
        "An angle at the circumference of a circle is %d degrees. Find the "
        "angle it subtends at the centre." % ang,
        ["central = 2 * %d" % ang],
        str(2 * ang)))
    r = _r7(rng)
    out.append(make_q(
        "A circular track has radius %d m. Find the distance covered in one "
        "round (pi = 22/7)." % r,
        ["dist = 2 * %s * %d" % (PI22, r)],
        fmt_num(2 * 22 / 7 * r)))
    d = pick(rng, [6, 8, 10, 12, 14])
    r = d // 2
    out.append(make_q(
        "Find the area of a semicircle of diameter %d cm (pi = 22/7)." % d,
        ["area = %s * %d * %d / 2" % (PI22, r, r)],
        fmt_num(22 / 7 * r * r / 2)))
    return out


# ------------------------------------------------------------------ #
# surface area and volume
# ------------------------------------------------------------------ #

@family("solid_rect")
def _solid_rect(rng):
    out = []
    l, w, h = ri(rng, 2, 12), ri(rng, 2, 12), ri(rng, 2, 12)
    out.append(make_q(
        "Find the volume of a cuboid %d cm x %d cm x %d cm." % (l, w, h),
        ["vol = %d * %d * %d" % (l, w, h)],
        str(l * w * h)))
    l, w, h = ri(rng, 2, 10), ri(rng, 2, 10), ri(rng, 2, 10)
    out.append(make_q(
        "Find the total surface area of a cuboid %d cm x %d cm x %d cm."
        % (l, w, h),
        ["tsa = 2 * (%d * %d + %d * %d + %d * %d)" % (l, w, w, h, h, l)],
        str(2 * (l * w + w * h + h * l))))
    s = ri(rng, 2, 12)
    out.append(make_q(
        "Find the volume of a cube of edge %d cm." % s,
        ["vol = %d ** 3" % s],
        str(s ** 3)))
    s = ri(rng, 2, 12)
    out.append(make_q(
        "Find the total surface area of a cube of edge %d cm." % s,
        ["tsa = 6 * %d * %d" % (s, s)],
        str(6 * s * s)))
    r, h = _r7(rng), ri(rng, 2, 20)
    out.append(make_q(
        "Find the volume of a cylinder of radius %d cm and height %d cm "
        "(pi = 22/7)." % (r, h),
        ["vol = %s * %d * %d * %d" % (PI22, r, r, h)],
        fmt_num(22 / 7 * r * r * h)))
    r, h = _r7(rng), ri(rng, 2, 20)
    out.append(make_q(
        "Find the curved surface area of a cylinder of radius %d cm and "
        "height %d cm (pi = 22/7)." % (r, h),
        ["csa = 2 * %s * %d * %d" % (PI22, r, h)],
        fmt_num(2 * 22 / 7 * r * h)))
    r, h = _r7(rng), ri(rng, 2, 15)
    out.append(make_q(
        "Find the total surface area of a closed cylinder of radius %d cm "
        "and height %d cm (pi = 22/7)." % (r, h),
        ["tsa = 2 * %s * %d * (%d + %d)" % (PI22, r, r, h)],
        fmt_num(2 * 22 / 7 * r * (r + h))))
    vol = pick(rng, [27, 64, 125, 216, 343, 512, 1000])
    out.append(make_q(
        "A cubical tank holds %d cubic cm of water. Find the length of one "
        "edge." % vol,
        ["edge = %d ** (1 / 3)" % vol],
        str(int(round(vol ** (1 / 3))))))
    l, w, h = ri(rng, 2, 12), ri(rng, 2, 12), ri(rng, 2, 12)
    out.append(make_q(
        "A water tank is %d m x %d m x %d m. How many litres does it hold "
        "when full? (1 cubic m = 1000 L)" % (l, w, h),
        ["vol = %d * %d * %d" % (l, w, h), "litres = vol * 1000"],
        str(l * w * h * 1000)))
    r, h = _r7(rng), ri(rng, 2, 15)
    out.append(make_q(
        "Find the slant height of a cone of radius %d cm and height %d cm "
        "(two decimal places)." % (r, h),
        ["slant = sqrt(%d * %d + %d * %d)" % (r, r, h, h)],
        fmt_num(round(math.sqrt(r * r + h * h), 2))))
    r, h = _r7(rng), pick(rng, [24, 21, 12])
    if math.sqrt(r * r + h * h) != int(math.sqrt(r * r + h * h)):
        h = 24 if r == 7 else h
    slant = math.sqrt(r * r + h * h)
    if slant != int(slant):
        r, h, slant = 7, 24, 25
    out.append(make_q(
        "A cone has radius %d cm and slant height %d cm. Find its curved "
        "surface area (pi = 22/7)." % (r, int(slant)),
        ["csa = %s * %d * %d" % (PI22, r, int(slant))],
        fmt_num(22 / 7 * r * slant)))
    return out


@family("solid_round")
def _solid_round(rng):
    out = []
    r = _r7(rng)
    out.append(make_q(
        "Find the volume of a cone of radius %d cm and height %d cm "
        "(pi = 22/7)." % (r, 21),
        ["vol = %s * %d * %d * 21 / 3" % (PI22, r, r)],
        fmt_num(22 / 7 * r * r * 7)))
    r = _r7(rng)
    out.append(make_q(
        "Find the volume of a sphere of radius %d cm (pi = 22/7)." % r,
        ["vol = 4 / 3 * %s * %d * %d * %d" % (PI22, r, r, r)],
        fmt_num(4 / 3 * 22 / 7 * r ** 3)))
    r = _r7(rng)
    out.append(make_q(
        "Find the curved surface area of a hemisphere of radius %d cm "
        "(pi = 22/7)." % r,
        ["csa = 2 * %s * %d * %d" % (PI22, r, r)],
        fmt_num(2 * 22 / 7 * r * r)))
    r = _r7(rng)
    out.append(make_q(
        "Find the total surface area of a solid hemisphere of radius %d cm "
        "(pi = 22/7)." % r,
        ["tsa = 3 * %s * %d * %d" % (PI22, r, r)],
        fmt_num(3 * 22 / 7 * r * r)))
    r = _r7(rng)
    out.append(make_q(
        "Find the volume of a hemispherical bowl of radius %d cm (pi = 22/7)."
        % r,
        ["vol = 2 / 3 * %s * %d * %d * %d" % (PI22, r, r, r)],
        fmt_num(2 / 3 * 22 / 7 * r ** 3)))
    r = _r7(rng)
    h = ri(rng, 5, 30)
    out.append(make_q(
        "A tent is a cylinder of radius %d m and height %d m, capped by a "
        "cone of the same radius and height %d m. Find the tent's volume "
        "(pi = 22/7)." % (r, h, h),
        ["cyl = %s * %d * %d * %d" % (PI22, r, r, h),
         "cone = cyl / 3", "vol = cyl + cone"],
        fmt_num(22 / 7 * r * r * h * 4 / 3)))
    r1, r2 = _r7(rng), _r7(rng)
    if r1 == r2:
        r2 += 7
    h = pick(rng, [7, 14, 21])
    out.append(make_q(
        "A frustum has radii %d cm and %d cm and height %d cm. Find its "
        "volume (pi = 22/7)." % (max(r1, r2), min(r1, r2), h),
        ["vol = %s * %d * (%d * %d + %d * %d + %d * %d) / 3"
         % (PI22, h, max(r1, r2), max(r1, r2), min(r1, r2), min(r1, r2),
            max(r1, r2), min(r1, r2))],
        fmt_num(22 / 7 * h * (r1 * r1 + r2 * r2 + r1 * r2) / 3)))
    d = pick(rng, [6, 8, 10, 12])
    r = _r7(rng)
    out.append(make_q(
        "Metal is melted and recast from a sphere of radius %d cm into a "
        "wire (cylinder) of diameter %d cm. Equality of volumes is used: "
        "find the volume of the metal (pi = 22/7)." % (r, d),
        ["vol = 4 / 3 * %s * %d * %d * %d" % (PI22, r, r, r)],
        fmt_num(4 / 3 * 22 / 7 * r ** 3)))
    n = pick(rng, [3, 4, 5, 6, 8, 10])
    out.append(make_q(
        "A prism has an n-gon base with n = %d. Using F = n + 2, find its "
        "number of faces." % n,
        ["faces = %d + 2" % n],
        str(n + 2)))
    n = pick(rng, [3, 4, 5, 6])
    out.append(make_q(
        "A pyramid has a base with n = %d sides. Find its number of edges "
        "using E = 2 x n." % n,
        ["edges = 2 * %d" % n],
        str(2 * n)))
    return out


# ------------------------------------------------------------------ #
# angles
# ------------------------------------------------------------------ #

@family("angle_pairs")
def _angle_pairs(rng):
    out = []
    a = ri(rng, 10, 80)
    out.append(make_q(
        "Two angles are complementary. If one angle is %d degrees, find the "
        "other." % a,
        ["other = 90 - %d" % a],
        str(90 - a)))
    a = ri(rng, 10, 170)
    out.append(make_q(
        "Two angles form a linear pair. If one angle is %d degrees, find the "
        "other." % a,
        ["other = 180 - %d" % a],
        str(180 - a)))
    a = ri(rng, 10, 80)
    out.append(make_q(
        "Two angles on a straight line add to 180 degrees. One of them is "
        "%d degrees; find the other." % a,
        ["other = 180 - %d" % a],
        str(180 - a)))
    a = ri(rng, 20, 150)
    b = ri(rng, 20, min(330, 340 - a))
    out.append(make_q(
        "Angles around a point total 360 degrees. If two of them are %d "
        "degrees and %d degrees, find the remaining angle." % (a, b),
        ["rest = 360 - %d - %d" % (a, b)],
        str(360 - a - b)))
    a = ri(rng, 20, 80)
    out.append(make_q(
        "Two lines intersect. One of the vertically opposite angle pairs is "
        "%d degrees; the angle adjacent to it on the straight line is what?"
        % a,
        ["adj = 180 - %d" % a],
        str(180 - a)))
    a = ri(rng, 20, 140)
    out.append(make_q(
        "A transversal cuts two parallel lines. A co-interior angle on one "
        "side is %d degrees. Find its co-interior partner." % a,
        ["partner = 180 - %d" % a],
        str(180 - a)))
    a, b = ri(rng, 20, 70), ri(rng, 20, 70)
    out.append(make_q(
        "Two angles of a triangle measure %d degrees and %d degrees. Find "
        "the third angle." % (a, b),
        ["third = 180 - %d - %d" % (a, b)],
        str(180 - a - b)))
    a, b = ri(rng, 30, 70), ri(rng, 30, 110)
    out.append(make_q(
        "An exterior angle of a triangle is %d degrees and one remote "
        "interior angle is %d degrees. Find the other remote interior angle."
        % (a + b, a),
        ["other = %d - %d" % (a + b, a)],
        str(b)))
    apex = pick(rng, [40, 50, 60, 80, 90, 100])
    out.append(make_q(
        "An isosceles triangle has vertex angle %d degrees. Find each base "
        "angle." % apex,
        ["base = (180 - %d) / 2" % apex],
        str((180 - apex) // 2)))
    n = pick(rng, [5, 6, 7, 8, 9, 10, 12])
    out.append(make_q(
        "Find the sum of the interior angles of a polygon with %d sides."
        % n,
        ["total = (%d - 2) * 180" % n],
        str((n - 2) * 180)))
    n = pick(rng, [5, 6, 8, 9, 10, 12])
    out.append(make_q(
        "Each exterior angle of a regular polygon with %d sides measures how "
        "many degrees?" % n,
        ["ext = 360 / %d" % n],
        fmt_num(360 / n)))
    ext = pick(rng, [10, 12, 15, 18, 20, 24, 30, 36, 40, 45, 60, 72])
    out.append(make_q(
        "Each exterior angle of a regular polygon is %d degrees. How many "
        "sides does it have?" % ext,
        ["n = 360 / %d" % ext],
        str(360 // ext)))
    a, b, c = ri(rng, 40, 90), ri(rng, 40, 90), ri(rng, 40, 90)
    out.append(make_q(
        "Three angles of a quadrilateral are %d, %d and %d degrees. Find the "
        "fourth angle." % (a, b, c),
        ["fourth = 360 - %d - %d - %d" % (a, b, c)],
        str(360 - a - b - c)))
    hr = pick(rng, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    out.append(make_q(
        "What angle (in degrees) does the hour hand of a clock sweep in %d "
        "hours?" % hr,
        ["angle = %d * 30" % hr],
        str(hr * 30)))
    ang = pick(rng, [40, 60, 70, 90, 110, 130])
    out.append(make_q(
        "An angle is bisected. If the original angle is %d degrees, find "
        "each half." % ang,
        ["half = %d / 2" % ang],
        fmt_num(ang / 2)))
    ang = ri(rng, 130, 170)
    out.append(make_q(
        "In a trapezium with one pair of parallel sides, one co-interior "
        "angle pair has a first angle of %d degrees. Find the second."
        % ang,
        ["co = 180 - %d" % ang],
        str(180 - ang)))
    return out


@family("quad_facts")
def _quad_facts(rng):
    out = []
    a = pick(rng, [50, 60, 70, 80, 100, 110, 120, 130])
    out.append(make_q(
        "In a parallelogram one angle is %d degrees. Find the adjacent angle."
        % a,
        ["adj = 180 - %d" % a],
        str(180 - a)))
    s1, s2 = ri(rng, 4, 15), ri(rng, 4, 15)
    if s1 == s2:
        s2 += 2
    out.append(make_q(
        "A parallelogram has adjacent sides %d cm and %d cm. Find its "
        "perimeter." % (s1, s2),
        ["perim = 2 * (%d + %d)" % (s1, s2)],
        str(2 * (s1 + s2))))
    d = ri(rng, 4, 20) * 2
    out.append(make_q(
        "The diagonals of a parallelogram bisect each other. If one diagonal "
        "is %d cm, what is the length of each half of it?" % d,
        ["half = %d / 2" % d],
        str(d // 2)))
    d1, d2 = ri(rng, 2, 10) * 2, ri(rng, 2, 10) * 2
    out.append(make_q(
        "Find the side of a rhombus whose diagonals are %d cm and %d cm "
        "(two decimal places)." % (d1, d2),
        ["side = sqrt((%d / 2) ** 2 + (%d / 2) ** 2)" % (d1, d2)],
        fmt_num(round(math.sqrt((d1 / 2) ** 2 + (d2 / 2) ** 2), 2))))
    leg = ri(rng, 3, 15)
    out.append(make_q(
        "In an isosceles right triangle each equal leg is %d cm. Find the "
        "hypotenuse in exact-surds-free decimal (two decimal places)." % leg,
        ["hyp = sqrt(2 * %d * %d)" % (leg, leg)],
        fmt_num(round(math.sqrt(2) * leg, 2))))
    a = pick(rng, [40, 60, 80])
    out.append(make_q(
        "A kite has one pair of equal angles. If the angle between the "
        "unequal sides is %d degrees and the kite is symmetric, the sum of "
        "the two equal opposite angles is 360 - %d - the other given angle "
        "of %d degrees. Find the sum of the two equal angles." % (a, a, 80),
        ["total = 360 - %d - 80" % a],
        str(280 - a)))
    odd = pick(rng, [3, 5, 7, 9])
    sq = odd * odd
    out.append(make_q(
        "Generate a Pythagorean triplet from m = %d using (2m, m^2 - 1, "
        "m^2 + 1) and report the middle member." % odd,
        ["mid = %d * %d - 1" % (odd, odd)],
        str(sq - 1)))
    a, b = pick(rng, [3, 6, 8, 9]), pick(rng, [4, 8, 15, 12])
    if a > b:
        a, b = b, a
    pairs = {(3, 4), (6, 8), (8, 15), (9, 12)}
    if (a, b) not in pairs:
        a, b = 8, 15
    out.append(make_q(
        "Two legs of a right triangle are %d cm and %d cm. Find the "
        "hypotenuse." % (a, b),
        ["hyp = sqrt(%d * %d + %d * %d)" % (a, a, b, b)],
        str(int(math.sqrt(a * a + b * b)))))
    hyp, leg = 5, pick(rng, [3, 4])
    out.append(make_q(
        "A right triangle has hypotenuse %d cm and one leg %d cm. Find the "
        "other leg." % (hyp, leg),
        ["leg2 = sqrt(%d * %d - %d * %d)" % (hyp, hyp, leg, leg)],
        str(int(math.sqrt(hyp * hyp - leg * leg)))))
    return out
