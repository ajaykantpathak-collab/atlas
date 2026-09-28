"""test_families.py -- full acceptance suite for the maths solver families.

Layers:
  1. old 29 cases (must stay green)
  2. BOOKS2 families (classes 6-11 sweep)
  3. BOOKS3 families (class 11-12 chunks: sets, domain, inequalities,
     counting, straight lines, ellipse, 3-D, limits, derivatives, related
     rates, integrals, area, differential equations, LPP, inverse trig,
     vectors, determinants, conditional probability) + applied gaps
  4. STEP CONTRACT assertions -- every positive probe must produce, in
     order: a method/law line, >= 3 steps total, >= 150 chars total.
     Thin steps are a PERMANENT test failure.
  5. GATE cases -- impossible states must refuse to answer
  6. NEGATIVE cases -- other-subject phrasings must not fire maths families

Exit code 0 only when everything is green.
"""
import re
import sys
import types

sys.path.insert(0, 'D:/platform')


def _guarded_imports():
    """Import the maths solvers, stubbing sibling solver modules that are
    mid-edit by other agents (SyntaxError) so maths tests stay runnable."""
    import importlib
    while True:
        try:
            import backend.its.solver.maths2_families as m2
            import backend.its.solver.applied_maths_families as am
            return m2, am
        except SyntaxError as e:
            path = e.filename.replace('\\', '/').split('/platform/')[-1]
            mod = path[:-3].replace('/', '.')
            stub = types.ModuleType(mod)
            stub.__getattr__ = lambda item: (lambda text: None)
            sys.modules[mod] = stub


m2f, amf = _guarded_imports()
model_maths2 = m2f.model_maths2
model_applied_maths = amf.model_applied_maths

# ----------------------------------------------------------------------- #
# STEP CONTRACT
# ----------------------------------------------------------------------- #
METHOD_KW = re.compile(
    r"law|formula|rule|identity|theorem|method|property|principle|"
    r"algorithm|shoelace|euclid|bayes|cramer|=", re.I)
MIN_STEPS = 3       # atomic >= 2 allowed by the contract; we hold everyone
MIN_CHARS = 150     # to the stricter bar via dispatcher augmentation


def contract_fail(result):
    """Return a failure string if the result violates the step contract."""
    if not result.matched:
        return "unmatched"
    steps = result.steps or []
    if len(steps) < MIN_STEPS:
        return f"only {len(steps)} steps (< {MIN_STEPS})"
    total = sum(len(s) for s in steps)
    if total < MIN_CHARS:
        return f"only {total} chars (< {MIN_CHARS})"
    if not steps or not METHOD_KW.search(steps[0]):
        return f"no method/law keyword in step 1: {steps[:1]}"
    if "method:" not in (result.note or ""):
        return "missing method payload in note"
    return None


# ----------------------------------------------------------------------- #
# probes: (text, expected_numeric_or_None, expected_answer_fragment_or_None)
# ----------------------------------------------------------------------- #
CASES = [
    ("Solve: 3x + 5 = 20", 5.0, None),
    ("Find the HCF of 48 and 36", 12.0, None),
    ("Find the LCM of 12 and 18", 36.0, None),
    ("What is 15% of 240", 36.0, None),
    ("Find the percentage increase from 40 to 50", 25.0, None),
    ("A shopkeeper buys an article for 400 and sells it for 500. Find the profit percent", 25.0, None),
    ("Find the simple interest on 5000 at 8% for 3 years", 1200.0, None),
    ("Find the compound interest on 10000 at 10% per annum for 2 years", 2100.0, None),
    ("Divide 1200 in the ratio 3:5 between two people", 450.0, None),
    ("If the cost of 5 pens is 75, what is the cost of 8 pens", 120.0, None),
    ("Find the speed of a car that travels 240 km in 4 hours", 60.0, None),
    ("A can do a work in 6 days and B can do it in 12 days. How long together", 4.0, None),
    ("Find the area of a circle of radius 7", 153.9384, None),
    ("Find the circumference of a circle of radius 7", 43.98, None),
    ("Find the area of a rectangle with length 12 and breadth 8", 96.0, None),
    ("Find the area of a square of side 9", 81.0, None),
    ("Find the hypotenuse of a right angled triangle with legs 3 and 4", 5.0, None),
    ("Find the volume of a cube of edge 5", 125.0, None),
    ("Find the volume of a cylinder of radius 7 and height 10", 1539.38, None),
    ("Find the volume of a sphere of radius 3", 113.097, None),
    ("Evaluate 2 ^ 10", 1024.0, None),
    ("Find the square root of 144", 12.0, None),
    ("Find the cube root of 27", 3.0, None),
    ("Find the 10th term of the AP with first term 2 and common difference 5", 47.0, None),
    ("Find the sum of the first 20 terms of the AP with first term 3 and common difference 4", 820.0, None),
    ("Find the 5th term of the GP with first term 3 and common ratio 2", 48.0, None),
    ("Find the roots of 1 x^2 - 5 x + 6 = 0", 3.0, None),
    ("What is 3/4 + 1/6", 0.916666, None),
    ("Find the LCM of the numbers 8 and 12", 24.0, None),
    # extended old-suite coverage: every remaining family shape must also
    # satisfy the step contract
    ("Find the value of sin^2(30) + cos^2(30)", 1.0, None),
    ("Find the value of 1 + tan^2(45)", 2.0, None),
    ("Find the value of sin 30 cos 60 + cos 30 sin 60", 1.0, None),
    ("Find lim x->0 of sin(3x)/x", 3.0, None),
    ("Find lim x->0 of (1 - cos(2x))/x^2", 2.0, None),
    ("Multiply the matrices [[1, 2], [3, 4]] and [[5, 6], [7, 8]]", None, "[[19, 22], [43, 50]]"),
    ("Find the transpose of the matrix [[1, 2], [3, 4]]", None, "[[1, 3], [2, 4]]"),
    ("Find the sum of the squares of the first 5 natural numbers", 55.0, None),
    ("Find the sum of the cubes of the first 3 natural numbers", 36.0, None),
    ("Find the harmonic mean of 2 and 4", 2.6666667, None),
    ("Find the cross product of 2i + 3j + 4k and 5i + 6j + 7k", None, "(-3)i + (6)j + (-3)k"),
    ("Find the slope and y-intercept of the line 3x + 2y = 12", -1.5, None),
    ("Find the distance from the point (1, 2) to the line 3x + 4y + 5 = 0", 3.2, None),
    ("Find the coefficient of x^2 in the expansion of (x + 3)^4", 54.0, None),
    ("Find the mean of the following frequency distribution: x = 2, 4, 6, f = 3, 5, 2", 3.8, None),
    ("What is 2/3 x 3/5", 0.4, None),
    ("A bag contains 5 red and 3 blue balls. Two balls are drawn without replacement. Find the probability that both balls are red", 0.3571429, None),
    ("A bag contains 5 red and 3 blue balls. Given that the second ball is blue find the probability that the first ball was red", 0.7142857, None),
]

SQ3 = 3 ** 0.5
NEW_CASES = [
    # class 6-8 basics
    ("Find the mean of 2, 4, 6, 8", 5.0, None),
    ("Find the perimeter of a rectangle with length 12 and breadth 8", 40.0, None),
    ("Find the perimeter of a square of side 9", 36.0, None),
    ("Find the area of a triangle with base 10 and height 6", 30.0, None),
    ("Two angles of a triangle are 60 and 70. Find the third angle", 50.0, None),
    ("Find the area of a triangle with sides 13, 14 and 15", 84.0, None),
    # class 8 comparing quantities
    ("The marked price of an article is 800 and the discount is 15%. Find the selling price", 680.0, None),
    ("Successive discounts of 20% and 10% are given on an item of 1000. Find the selling price", 720.0, None),
    ("GST of 18% is charged on an item priced 2500. Find the bill amount", 2950.0, None),
    ("If the cost of 8 m of cloth is 240, find the cost of 15 m of cloth", 450.0, None),
    ("If 12 workers can complete a work in 20 days, how long will 16 workers take", 15.0, None),
    # class 8-10 mensuration
    ("Find the surface area of a cube of edge 6", 216.0, None),
    ("Find the total surface area of a cylinder of radius 7 and height 10", 747.699, None),
    ("Find the surface area of a sphere of radius 7", 615.752, None),
    ("Find the volume of a hemisphere of radius 3", 56.5487, None),
    ("Find the volume of a cone of radius 3 and height 4", 37.6991, None),
    # class 10 heights and distances
    ("From a point 30 m away from the foot of a tower the angle of elevation of the top is 60. Find the height", 30 * SQ3, None),
    # class 9-10 algebra
    ("Find the sum of zeroes of 2 x^2 - 4 x + 6", 2.0, None),
    ("Find the product of zeroes of 2 x^2 - 4 x + 6", 3.0, None),
    ("Solve 3 x + y = 10 and 2 x - y = 5", 3.0, None),
    ("Find the nature of the roots of 2 x^2 - 4 x + 3 = 0", -8.0, None),
    ("Find the distance between (1, 2) and (4, 6)", 5.0, None),
    ("Find the midpoint of (1, 2) and (4, 6)", 2.5, None),
    # class 10-11 trigonometry
    ("Find the value of sin 30 + cos 60", 1.0, None),
    ("Evaluate 2 tan 45 + sin 30", 2.5, None),
    ("Find the value of tan 45", 1.0, None),
    ("Find the value of sin 2 30", SQ3 / 2, None),
    ("Find the value of 2 sin 30 cos 30", SQ3 / 2, None),
    # sectors and arcs
    ("Find the area of a sector of a circle of radius 7 with angle 90", 38.4845, None),
    ("Find the length of the arc of a circle of radius 7 with angle 90", 10.9956, None),
    # class 10 statistics
    ("Find the median of the following grouped data: class 0-10 10-20 20-30 30-40 40-50, frequency 4 6 10 8 2", 25.0, None),
    ("Find the mode of the following frequency distribution: class 0-10, 10-20, 20-30, 30-40, 40-50 and frequency 4, 6, 10, 8, 2", 26.6667, None),
    # class 9-10 probability
    ("What is the probability of getting a king from a well shuffled deck of cards", 1.0 / 13, None),
    ("Find the probability of getting an even number when a die is thrown", 0.5, None),
    ("A bag contains 5 red and 3 blue balls. Find the probability of drawing a red ball", 0.625, None),
    ("Find the probability of getting two heads when two coins are tossed", 0.25, None),
    # class 11
    ("Find the sum of the first 6 terms of the GP with first term 3 and common ratio 2", 189.0, None),
    ("Find the sum of the infinite GP with first term 8 and common ratio 0.5", 16.0, None),
    ("Find the arithmetic mean of 4 and 10", 7.0, None),
    ("Find the geometric mean of 4 and 9", 6.0, None),
    ("Evaluate 8P2", 56.0, None),
    ("Find the value of 8C2", 28.0, None),
    ("Find the modulus of 3 + 4i", 5.0, None),
    ("Find the variance of 2, 4, 4, 4, 5, 5, 7, 9", 4.0, None),
    ("Find the standard deviation of 2, 4, 4, 4, 5, 5, 7, 9", 2.0, None),
    ("Find the equation of the line through (1, 2) and (3, 6)", 2.0, None),
]

# BOOKS3: class 11-12 chunks + stragglers.  numeric None => symbolic answer
# family (general solution / equation), assert via answer fragment.
BOOKS3_CASES = [
    # kemh101 sets
    ("Union of A = {1, 2, 3} and B = {3, 4, 5}", 5.0, "{1, 2, 3, 4, 5}"),
    ("Intersection of A = {1, 2, 3} and B = {3, 4, 5}", 1.0, "{3}"),
    ("Difference of A = {1, 2, 3} and B = {3, 4, 5}", 2.0, "{1, 2}"),
    ("n(A) = 20, n(B) = 30, n(A union B) = 40. Find n(A intersection B)", 10.0, None),
    ("If n(A) = 15, n(B) = 12 and n(A intersection B) = 8, find n(A union B)", 19.0, None),
    # kemh102 relations and functions: domain
    ("Find the domain of f(x) = 1/(x - 3)", 3.0, "3"),
    ("Find the domain of sqrt(x - 4)", 4.0, "4"),
    ("Find the domain of sqrt(2 - x)", 2.0, "2"),
    # kemh105 linear inequalities
    ("Solve 3x - 5 < 16", 7.0, "x < 7"),
    ("Solve 5 - 2x >= 3", 1.0, "x <= 1"),
    # kemh106 counting
    ("In how many ways can 5 students be arranged in a row", 120.0, None),
    ("In how many ways can 5 students be arranged in a circle", 24.0, None),
    ("In how many ways can a committee of 3 be chosen from 10", 120.0, None),
    # kemh109 straight lines: remaining forms
    ("Find the equation of the line through (2, 3) with slope 4", 4.0, None),
    ("The x-intercept is 3 and the y-intercept is 2. Find the slope of the line", -2.0 / 3.0, None),
    ("Find the angle between two lines with slopes 2 and 3", 8.1301, None),
    # kemh110 conics
    ("Find the area of an ellipse with semi-major axis 5 and semi-minor axis 3", 47.1239, None),
    ("Find the eccentricity of an ellipse with semi-major axis 5 and semi-minor axis 3", 0.8, None),
    ("Find the distance between the foci of an ellipse with semi-major axis 5 and semi-minor axis 3", 8.0, None),
    # kemh111 3-D geometry
    ("Find the distance between (1, -3, 4) and (-4, 1, 2)", 6.7082, None),
    ("Find the midpoint of (1, 2, 3) and (4, 6, 8)", 2.5, None),
    ("Find the point that divides the line joining (1, 2, 3) and (4, 5, 6) in the ratio 1:2", 2.0, None),
    # kemh112 limits and derivatives
    ("Find the limit of (x^2 - 4)/(x - 2) as x approaches 2", 4.0, None),
    ("Find the limit of 2x^2 + 3x - 5 as x approaches 1", 0.0, None),
    ("Find the derivative of x^5 at x = 2", 80.0, None),
    ("Find the derivative of the function 3x at x = 2", 3.0, None),
    ("Find the derivative of 2x^2 + 3x - 5 at x = -1", -1.0, None),
    # lemh106 applications of derivatives
    ("Find the slope of the tangent to the curve y = x^2 at x = 3", 6.0, None),
    ("Determine whether f(x) = x^2 - 4x is increasing or decreasing at x = 1", -2.0, None),
    ("Find the maximum value of 5 + 6x - x^2", 14.0, None),
    ("Find the minimum value of x^2 + 4x + 7", 3.0, None),
    ("The radius of a sphere is increasing at 2 cm/s. Find the rate of increase of volume when radius is 3", 226.1947, None),
    ("The radius of a circle is increasing at 2 cm/s. Find the rate of increase of area when radius is 5", 62.8319, None),
    # lemh201/202 integrals and area
    ("Integrate 2 x^3 dx from 1 to 2", 7.5, None),
    ("Integrate x^3 dx", None, "1/4x^4 + C"),
    ("Find the area bounded by y = 3x, the x-axis, x = 0 and x = 4", 24.0, None),
    # lemh203 differential equations
    ("Solve the differential equation dy/dx = 3x^2", None, "x^3 + C"),
    ("Solve the differential equation dy/dx = 2y given y(0) = 5", None, "5 e^(2x)"),
    ("Find the order and degree of the differential equation d2y/dx2 + (dy/dx)^3 = 0", 2.0, "order = 2, degree = 3"),
    # lemh206 LPP
    ("Maximise Z = 3x + 4y subject to x + y <= 4, x + 2y <= 6, x >= 0, y >= 0", 14.0, "(2, 2)"),
    ("Minimise Z = 6x + 3y subject to 2x + y >= 4, x + y >= 3, x >= 0, y >= 0", 12.0, None),
    # lemh102 inverse trigonometry
    ("Find the value of sin inverse of 1/2", 30.0, None),
    ("Find the value of arctan(1)", 45.0, None),
    ("Find the value of cos^-1(0.5)", 60.0, None),
    # lemh204 vectors
    ("Find the dot product of 2i + 3j - k and 4i + j + 2k", 9.0, None),
    ("Find the dot product of i + j and j + k", 1.0, None),
    ("Find the magnitude of the vector 3i - 4j", 5.0, None),
    # lemh104 determinants
    ("Find the determinant of the matrix [[1, 2], [3, 4]]", -2.0, None),
    # lemh207 conditional probability
    ("P(A) = 0.6, P(B) = 0.3 and P(A intersection B) = 0.2. Find P(A|B)", 2.0 / 3.0, None),
    ("P(A) = 0.5, P(B) = 0.4 and P(A intersection B) = 0.2. Find P(B|A)", 0.4, None),
]

APPLIED_CASES = [
    ("A machine worth 50000 depreciates at 10% per annum. Find its value after 3 years", 36450.0, None),
    ("The value of a car 800000 depreciates at 12% per annum. Find its value after 2 years", 619520.0, None),
    ("Pipe A fills a tank in 6 hours and pipe B fills it in 4 hours. How long will they take together", 2.4, None),
    ("Pipe A fills a tank in 8 hours and an outlet empties it in 12 hours. Find the filling time", 24.0, None),
    ("For a binomial distribution with n = 10 and p = 0.3, find the mean and variance", 3.0, None),
    # am11_001 logarithms / exponential models
    ("Find the value of log base 2 of 32", 5.0, None),
    ("Find log 1000", 3.0, None),
    ("Evaluate log 500 / log 2", 8.9658, None),
    ("b = 200(2)^(t/20). Find the number of hours after which there will be 500 bacteria cells", 26.4386, None),
]

# gate refusals: impossible states must NOT produce an answer
GATE_CASES = [
    ("Two angles of a triangle are 100 and 90. Find the third angle", model_maths2),
    ("Find the area of a triangle with sides 1, 2 and 10", model_maths2),
    ("Find the sum of the infinite GP with first term 8 and common ratio 2", model_maths2),
    ("Find the value of tan 90", model_maths2),
    ("Solve 2 x + 4 y = 10 and 4 x + 8 y = 20", model_maths2),
    ("Pipe A fills a tank in 4 hours and an outlet empties it in 2 hours. Find the filling time", model_applied_maths),
    ("For a binomial distribution with n = 10 and p = 1.5, find the mean and variance", model_applied_maths),
    # BOOKS3 gates
    ("n(A) = 20, n(B) = 30, n(A intersection B) = 40. Find n(A union B)", model_maths2),
    ("Find the maximum value of 2x^2 + 3x + 1", model_maths2),
    ("Find the minimum value of 1 - 5x - 2x^2", model_maths2),
    ("Determine whether f(x) = x^2 - 6x + 9 is increasing or decreasing at x = 3", model_maths2),
    ("Maximise Z = 3x + 4y subject to x + y <= -4, x + 2y <= 6, x >= 0, y >= 0", model_maths2),
    ("Find the value of sin inverse of 0.3", model_maths2),
    ("Find the limit of (x^2 - 5)/(x - 2) as x approaches 2", model_maths2),
    ("Find the order and degree of the equation x + y = 3", model_maths2),
    ("Find P(A|B)", model_maths2),
    ("Find the value of log base 3 of 5", model_applied_maths),
]

# negative tests: other-subject phrasings must NOT fire maths families
NEG_CASES = [
    ("The velocity of the car is 20 m/s after braking", model_maths2),
    ("The circuit has a 5 ohm resistor and a 3 ohm resistor", model_maths2),
    ("The chemical equation shows 2 moles of hydrogen reacting with oxygen", model_maths2),
    ("The population of tigers declined to 1500 in the latest census", model_maths2),
    ("The machine produced 40 units per hour for 6 hours", model_maths2),
    ("The pH of the solution changed from 3 to 5", model_maths2),
    ("The historian studied 3 kings and 4 empires", model_maths2),
    ("The poem has 5 stanzas and 3 verses", model_maths2),
    ("The two companies signed a union agreement last week", model_maths2),
    ("The determinant of success is hard work", model_maths2),
    ("She will maximise her score in the exam", model_maths2),
    ("The journey took 3 hours", model_maths2),
    ("The rate of interest on savings is 4 percent", model_applied_maths),
    ("The doctor advised 30 minutes of exercise daily", model_applied_maths),
    ("The population grew quickly in the last decade", model_applied_maths),
]


def run(cases, fn, label):
    passed = failed = unmatched = thin = 0
    details = []
    for text, expected, frag in cases:
        r = fn(text)
        if not r.matched:
            unmatched += 1
            details.append(("UNMATCHED", text, f"expected {expected}"))
            continue
        # numeric check (skipped for symbolic-answer families)
        ok = True
        if expected is not None:
            got = r.numeric_answer
            ok = got is not None and \
                abs(got - expected) <= max(0.05, abs(expected) * 0.01)
        if ok and frag is not None:
            ok = frag in (r.final_answer or "")
        if not ok:
            failed += 1
            details.append(("WRONG", text,
                            f"expected {expected or frag}, got "
                            f"{r.numeric_answer} / {r.final_answer} "
                            f"via {r.structure}"))
            continue
        # STEP CONTRACT (the deliverable that makes undercutting impossible)
        why = contract_fail(r)
        if why:
            thin += 1
            details.append(("CONTRACT", text,
                            f"{r.structure}: {why}"))
        else:
            passed += 1
    print(f"[{label}] PASS {passed} | WRONG {failed} | CONTRACT {thin} | "
          f"UNMATCHED {unmatched}  (of {len(cases)})")
    for d in details:
        print("  ", d)
    return failed + unmatched + thin


gate_bad = 0
for text, fn in GATE_CASES:
    r = fn(text)
    if r.matched:
        gate_bad += 1
        print(f"  GATE-LEAK: matched {r.structure} for: {text}")
print(f"[gates] {len(GATE_CASES) - gate_bad}/{len(GATE_CASES)} refused"
      f" (0 leaks expected)")

neg_bad = 0
for text, fn in NEG_CASES:
    r = fn(text)
    if r.matched:
        neg_bad += 1
        print(f"  NEG-LEAK: matched {r.structure} for: {text}")
print(f"[negatives] {len(NEG_CASES) - neg_bad}/{len(NEG_CASES)} clean"
      f" (0 leaks expected)")

total_bad = run(CASES, model_maths2, "old-29")
total_bad += run(NEW_CASES, model_maths2, "books2-maths2")
total_bad += run(BOOKS3_CASES, model_maths2, "books3-maths2")
total_bad += run(APPLIED_CASES, model_applied_maths, "applied")
total_bad += gate_bad + neg_bad
print("SUITE:", "GREEN" if total_bad == 0 else f"RED ({total_bad} bad)")
sys.exit(0 if total_bad == 0 else 1)
