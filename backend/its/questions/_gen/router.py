"""router.py -- map (catalog stem, concept) -> generator family.

Routing = first matching keyword rule over the concept title (plus
formula for a few rules), with explicit OVERRIDES winning over
everything else.  The final fallback is 'expr_eval'.
"""
from __future__ import annotations

import re

RULES = [
    # --- very specific first -------------------------------------------
    # high-priority tier: topics whose titles collide with greedy
    # keywords later in the list (ratio, area, power, complementary)
    (r"probabilit|bayes|conditional|random variable|mutually exclusive|"
     r"exhaustive|complementary event", "probability"),
    (r"mean of grouped|median of grouped|mode of grouped|grouped data|"
     r"frequency distribution", "central_tendency"),
    (r"a\.m\.|g\.m\.|am-gm", "ap_gp"),
    (r"diagonals of|diagonal angle|rectangle and its", "quad_facts"),
    (r"domain|codomain", "set_relation_facts"),
    (r"collinear", "coord_geom"),
    (r"\blimit\b|derivative|differentiat|first principle|power rule for "
     r"differentiation|area under|area enclosed|power curve", "calculus"),
    (r"trigonometric identit|trigonometric functions, identities", "trig_identities"),
    (r"trigonometr", "trig_ratios"),
    (r"angle of (elevation|depression)|line of sight|heights? and distances?|"
     r"right triangles? to solve", "trig_ratios"),
    (r"complex|imaginary unit|iota|argand|conjugate", "matrices"),
    (r"binomial theorem|binomial expansion|binomial coefficients|pascal", "counting_sets"),
    (r"geometric progression|common ratio|arithmetic progression|nth term|"
     r"general term|\bgp\b|\bap\b|sequence|series|recurrence|bounce", "ap_gp"),
    (r"circumference|area of (a )?(sector|segment)|area between two "
     r"concentric|areas of sector|sector and segment|length of an? arc|"
     r"arc length|concentric circle|same segment|concyclic|subtend|"
     r"semicircle|angle in a", "circle_area"),
    (r"midpoint|section formula|centroid", "coord_geom"),
    (r"mean of grouped|grouped data|frequency distribution|ungrouped", "central_tendency"),
    (r"variance|mean squared deviation|standard deviation", "dispersion"),
    (r"koch snowflake perimeter", "num_patterns"),
    (r"koch|sierpinski|fractal|snowflake|gasket|carpet", "num_patterns"),
    (r"triangular number", "num_patterns"),
    (r"hexagonal", "num_patterns"),
    (r"supercell", "digit_reversal"),
    (r"kaprekar", "num_play"),
    (r"collatz", "num_play"),
    (r"virahanka|up and down|updown", "updown_sum"),
    (r"palindrome|clock palindrome", "num_play"),
    (r"digit sum|digits? of|n-digit|digit trick|password", "digit_reversal"),
    (r"number pyramid", "num_play"),
    (r"calendar|date trick|odd days", "num_play"),
    (r"nim|winning strategy", "num_play"),
    (r"quick summation|grouping", "num_play"),
    (r"roman|egyptian|hindu numerals|base-5|base-n|landmark", "num_play"),
    (r"estimation|approximat|round", "number_theory_facts"),
    (r"fermat|goldbach|locker|taxicab|hardy|twin prime|perfect number|"
     r"conjecture|co-prime|coprime number|idli|prime hunt", "number_theory_facts"),
    (r"cyclic number|story of pi|repeating decimal|terminating decimal|"
     r"decimal expansion", "number_theory_facts"),
    (r"irrational", "number_theory_facts"),
    (r"euclid division", "hcf_lcm"),
    (r"divisor count|divisors", "hcf_lcm"),
    (r"hcf|highest common|greatest common|gcd", "hcf_lcm"),
    (r"lcm|lowest common|least common|common multiple", "hcf_lcm"),
    (r"divisib|multiple of|common factor|prime factor", "hcf_lcm"),
    (r"prime|composite", "hcf_lcm"),

    # --- arithmetic core -------------------------------------------------
    (r"square number|square of|perfect square|squaring", "squares"),
    (r"square root", "square_roots"),
    (r"pythagorean triplet|triplets", "squares"),
    (r"between square|between the square", "squares"),
    (r"odd numbers? (pattern|gives|sum)|consecutive odd", "odd_sum_square"),
    (r"square as sum", "odd_sum_square"),
    (r"cube (number|root|of)|cubic|cube pattern|perfect cube", "cubes"),
    (r"square", "squares"),
    (r"fraction", "frac_ops"),
    (r"rational", "rational_ops"),
    (r"decimal|tenth|hundredth|thousandth|place value|paise|rupee", "dec_ops"),
    (r"integer", "int_ops"),
    (r"number line", "int_ops"),
    (r"additive inverse|multiplicative inverse|brahmagupta|signed", "int_ops"),
    (r"commutat|associat|distribut", "int_ops"),
    (r"bracket", "expr_eval"),
    (r"exponent|power|index law|indices|standard form|scientific|"
     r"usual form|binary|doubling", "exp_laws"),
    (r"modular|modulo|remainder", "counting_sets"),

    # --- commercial -------------------------------------------------------
    (r"percent|percentage", "pct_core"),
    (r"profit|loss|overhead", "profit_loss"),
    (r"discount|marked price|sales ?tax|gst|vat|bill", "profit_loss"),
    (r"simple interest|compound|interest|maturity|growth|depreciation|"
     r"population|appreciat", "interest"),
    (r"\bratios?\b|proportion|unitary|scale|direct |inverse |map|recipe", "ratio_prop"),
    (r"fahrenheit|celsius|temperature", "ratio_prop"),
    (r"average speed|velocity", "work_rate"),
    (r"work|pipes|cistern|efficien|workers|man-days", "work_rate"),
    (r"boat|upstream|downstream|stream", "work_rate"),
    (r"alligation|mixture|mean price|replaced liquid", "index_fin"),
    (r"partnership|races? |games|first come|waiting", "index_fin"),
    (r"clock", "angle_pairs"),

    # --- mensuration ------------------------------------------------------
    (r"perimeter", "perimeter"),
    (r"area of .*rhombus|area of .*trapezium|area of .*parallelogram|"
     r"area of .*quadrilateral|altitude|equal-area|general quadrilateral|"
     r"splitting", "area_quad"),
    (r"heron", "heron_area"),
    (r"brahmagupta's formula|cyclic quadrilateral", "heron_area"),
    (r"area", "area_rect"),
    (r"fencing|tiling|tiles|carpet area", "area_rect"),
    (r"circle|circumference|semicircle|arc|sector|ring|concentric|chord|"
     r"tangent|secant", "circle_area"),
    (r"surface area|volume|capacity|litre|cylinder|cone|sphere|hemisphere|"
     r"frustum|slant|cuboid|recast|tent|combination of solids", "solid_rect"),
    (r"volume of (a )?(cone|sphere|hemisphere)", "solid_round"),
    (r"surface area of (a )?(cone|sphere|hemisphere)", "solid_round"),
    (r"euler|faces? ?and? ?edges?|edges.*vertices|polyhedr|prism|pyramid|"
     r"net|solid objects|3-d|3d shapes|visualis|viewing|sections? by|"
     r"shadow play|front view|isometric|oblique", "solid_counts"),
    (r"cone", "solid_round"),

    # --- angles / geometry facts -----------------------------------------
    (r"complementary|supplementary|linear pair|vertically opposite|"
     r"angles? on a straight|around a point|transversal|corresponding|"
     r"alternate|co-interior|consecutive interior|angle sum|exterior angle|"
     r"isosceles|equilateral|bisect|clock angle", "angle_pairs"),
    (r"angle", "angle_pairs"),
    (r"perpendicular|parallel lines", "angle_pairs"),
    (r"quadrilateral|parallelogram|rhombus|trapezium|kite|diagonal", "quad_facts"),
    (r"pythagoras|baudhayana|hypotenuse|leg of|lotus", "quad_facts"),
    (r"congruence|congruent|sss|sas|asa condition|aas|rhs|cpct|twin", "congruence_facts"),
    (r"symmetry|symmetric figure|mirror", "shape_facts"),
    (r"\bpoint\b|line segment|\bray\b|intersecting lines|plane figures", "shape_facts"),
    (r"construction|compass|tiling|tile", "shape_facts"),
    (r"circle", "circle_area"),

    # --- algebra ----------------------------------------------------------
    (r"like terms|simplif|expression|evaluate|monomial|binomial|trinomial|"
     r"polynomial terms|value of an expression|letter-number|variable", "expr_eval"),
    (r"equation|solve|balanc|transpos|unknown|linear|one variable|"
     r"balance puzzle|stories", "linear_eq"),
    (r"identit|square of a (sum|difference)|difference of squares|"
     r"sum times difference|product of the form|\(x \+ a\)|algebraic identity|"
     r"same parity|always even|remainder class|digital root", "identities"),
    (r"polynomial|zeros?|factor theorem|remainder theorem|division algorithm|"
     r"cubic|quadratic|discriminant|roots|parabola param", "poly_quad"),
    (r"arithmetic progression|\bap\b|common difference|geometric progression|"
     r"\bgp\b|sequence|series|term of|nth term|progression|arith?metic mean|"
     r"geometric mean|insert|bounce|recurrence|summation", "ap_gp"),
    (r"mean|median|mode|outlier|average|balance point|missing value|"
     r"frequency distribution data", "central_tendency"),
    (r"\brange\b|deviation|variance|standard deviation|quartile|iqr|"
     r"coefficient of variation|\bspread\b|dispersion", "dispersion"),
    (r"z ?-?score|standard error|t test|t-stat|sampling|confidence|"
     r"hypothes|significance|parameter and statistic|population and sample", "dispersion"),
    (r"tally|pictograph|bar graph|column graph|pie|circle graph|frequency|"
     r"infographic|class mark|class interval|histogram|ogive|dot plot|"
     r"double bar|line graph|data|graph|organis", "data_read"),

    # --- probability / counting / sets ------------------------------------
    (r"probability|dice|die\b|coin|cards|deck|bag |event|random|sample space|"
     r"outcome|bayes|conditional|independent events|binomial distribution|"
     r"poisson|normal distribution|expectation|random variable|distribution", "probability"),
    (r"permutation|combination|factorial|counting|ways|arrange|selection|"
     r"committee|necklace|circular|fundamental principle|rule of (sum|product)|"
     r"lines and triangles|repetition|pascal|binomial theorem|binomial", "counting_sets"),
    (r"cartesian|ordered pair|relations?|reflexive|symmetric relation|"
     r"transitive|equivalence|function|one-one|onto|bijective|injective|"
     r"surjective|invertible|composition|domain|range of|real valued|"
     r"subset|power set|union|intersection|venn|interval|de morgan|"
     r"complement|cardinal|roster|set-builder|empty set|finite|equal sets|"
     r"types of sets|\bsets?\b|intervals on", "set_relation_facts"),
    (r"quantifier|syllogism|connective|truth|negation|converse|contrapositive|"
     r"if and only if|odd one out|coding|decoding|logical|statement|"
     r"acceptabl", "counting_sets"),

    # --- coordinate / advanced geometry -----------------------------------
    (r"coordinate|distance formula|distance between|midpoint|section formula|"
     r"centroid|area of a triangle using|collinear|slope|point from a line|"
     r"parallel lines distance|equation of (a )?(line|circle)|centre and radius|"
     r"parabola|ellipse|hyperbola|conic|latus|eccentricity|locus|"
     r"3d|in space|octant|axes", "coord_geom"),
    (r"angle between", "distance_pl"),
    (r"trigonometr|sin |cos |tan |cosec|sec |cot |heights? and distances?|"
     r"elevation|depression|line of sight|complementary angles", "trig_ratios"),
    (r"sin\^?2|identit", "trig_identities"),

    # --- matrices / complex / vectors -------------------------------------
    (r"matrix|matrices|determinant|adjoint|cofactor|minor|cramer|leontief|"
     r"skew|transpose|invertible matrices|singular|system of linear|consistency", "matrices"),
    (r"complex|iota|argand|modulus|conjugate", "matrices"),
    (r"vector|dot product|cross product|projection|direction cosines|"
     r"scalar product|position vector|magnitude", "vectors"),

    # --- calculus / DE / LPP ----------------------------------------------
    (r"limit|derivative|differentiat|tangent|normal|maxima|minima|"
     r"increasing|decreasing|critical|rate of change|marginal|monoton|"
     r"integral|integrat|area under|area enclosed|antiderivative|"
     r"differential equation|separable|integrating factor|homogeneous|"
     r"linear programming|feasible|corner point|objective|optimis|optimiz|"
     r"first principles|continuity|discontinuit|king property", "calculus"),
    (r"order and degree|order of differential|degree of differential", "calculus_extra"),
    (r"general and particular|initial condition|candidate solution|"
     r"eliminating constants|modeling with differential", "calculus_extra"),

    # --- applied / financial ----------------------------------------------
    (r"index number|laspeyres|paasche|aggregative|time series|trend|"
     r"adequacy|reversal", "index_fin"),
    (r"emi|annuity|sinking|perpetuity|npv|net present|present value|"
     r"future value|cagr|written down|amortis|amortiz|discounting", "index_fin"),
    (r"assessment|mark structure|spreadsheet|simulation|business decision|"
     r"practical project|pictograph symbol", "data_read"),
    (r"principal value|inverse trigonometric|sin inverse|cos inverse|"
     r"tan inverse|branch", "principal_values"),
    (r"statements? and|mathematically acceptable", "counting_sets"),
]

_RULES = [(re.compile(pat), fam) for pat, fam in RULES]

# catalog_stem::concept_id -> (family, params)
OVERRIDES = {
    # class 10
    "class10_maths_ch101::jemh.1.2": ("hcf_lcm", None),
    "class10_maths_ch106::jemh.106.4.5": ("ratio_prop", None),
    "class10_maths_ch112::jemh.12.3": ("solid_round", None),
    "class10_maths_jemh103::jemh.103.3.3": ("linear_eq", None),
    "class10_maths_jemh103::jemh.103.3.4": ("linear_eq", None),
    "class10_maths_jemh104::jemh.104.4.2": ("poly_quad", None),
    "class10_maths_jemh106::jemh.106.6.1": ("congruence_facts", None),
    "class10_maths_jemh112::jemh.112.12.3": ("solid_round", None),
    # class 11 applied
    "class11_applied_maths_am11_001_numbers_quantification::am11_001.12":
        ("authored", {"convert": True, "qa": [
            ("Given log_b M = 0.30 and log_b N = 0.47, use the product rule "
             "to find log_b (M x N).", ["val = 0.30 + 0.47"], "0.77"),
            ("Given log_b M = 1.2 and log_b N = 2.05, find log_b (M x N) by "
             "the product rule.", ["val = 1.2 + 2.05"], "3.25"),
            ("Given log_b M = 0.9 and log_b N = 0.6, find log_b (M x N).",
             ["val = 0.9 + 0.6"], "1.5"),
            ("Given log_10 M = 2 and log_10 N = 3, find log_10 (M x N).",
             ["val = 2 + 3"], "5"),
            ("Given log_b M = 0.75 and log_b N = 0.25, find log_b (M x N).",
             ["val = 0.75 + 0.25"], "1"),
            ("Given log_b M = 1.45 and log_b N = 0.55, find log_b (M x N).",
             ["val = 1.45 + 0.55"], "2"),
        ]}),
    "class11_applied_maths_am11_005_sequences_series::am11_005.9": ("ap_gp", None),
    "class11_applied_maths_am11_006_permutations_combinations::am11_006.12":
        ("counting_sets", None),
    "class11_applied_maths_am11_011_financial_mathematics::am11_011.5":
        ("index_fin", None),
    # class 11 maths
    "class11_maths_ch103::kemh.3.1":
        ("authored", {"convert": True, "qa": [
            ("Convert 90 degrees to radians (two decimal places, pi = 3.14).",
             ["rad = 90 * pi / 180"], "1.5708"),
            ("Convert 180 degrees to radians (two decimal places).",
             ["rad = 180 * pi / 180"], "3.1416"),
            ("Convert 60 degrees to radians (two decimal places).",
             ["rad = 60 * pi / 180"], "1.0472"),
            ("Convert 45 degrees to radians (two decimal places).",
             ["rad = 45 * pi / 180"], "0.7854"),
            ("Convert 30 degrees to radians (two decimal places).",
             ["rad = 30 * pi / 180"], "0.5236"),
            ("Convert 270 degrees to radians (two decimal places).",
             ["rad = 270 * pi / 180"], "4.7124"),
        ]}),
    "class11_maths_ch103::kemh.3.2":
        ("authored", {"convert": True, "qa": [
            ("Convert pi/6 radians to degrees.", ["deg = (pi / 6) * 180 / pi"], "30"),
            ("Convert pi/4 radians to degrees.", ["deg = (pi / 4) * 180 / pi"], "45"),
            ("Convert pi/3 radians to degrees.", ["deg = (pi / 3) * 180 / pi"], "60"),
            ("Convert pi/2 radians to degrees.", ["deg = (pi / 2) * 180 / pi"], "90"),
            ("Convert 2pi/3 radians to degrees.", ["deg = (2 * pi / 3) * 180 / pi"], "120"),
            ("Convert 3pi/4 radians to degrees.", ["deg = (3 * pi / 4) * 180 / pi"], "135"),
        ]}),
    "class11_maths_ch105::kemh105.5.2.1": ("linear_eq", None),
    "class11_maths_ch105::kemh105.5.3.1": ("linear_eq", None),
    "class11_maths_ch105::kemh105.5.3.6": ("linear_eq", None),
    "class11_maths_ch109::kemh.109.5.1": ("distance_pl", None),
    "class11_maths_ch112::kemh112.12.5.3": ("calculus", None),
    "class11_maths_ch112::kemh112.12.5.4": ("calculus", None),
    "class11_maths_kemh108::kemh108.8.4.3": ("ap_gp", None),
    "class11_maths_kemh109::kemh109.9.3.2": ("coord_geom", None),
    # class 12 applied
    "class12_applied_maths_am12_001_numbers_quantification::am12_001.10":
        ("linear_eq", None),
    "class12_applied_maths_am12_003a_differentiation_applications::am12_003a.2":
        ("calculus", None),
    "class12_applied_maths_am12_003b_integration_applications::am12_003b.4":
        ("calculus", None),
    "class12_applied_maths_am12_008_linear_programming::am12_008.4":
        ("calculus", None),
    # class 12 maths
    "class12_maths_lemh102::lemh.102.3.3": ("principal_values", None),
    "class12_maths_lemh103::lemh.103.4.2": ("matrices", None),
    "class12_maths_lemh103::lemh.103.4.4": ("matrices", None),
    "class12_maths_lemh106::lemh.106.6.2.2": ("calculus", None),
    "class12_maths_lemh206::lemh.206.12.2.7": ("calculus", None),
    # class 6
    "class6_maths_ch101::fegp.101.1.2.1": ("number_theory_facts", None),
    "class6_maths_ch101::fegp.101.1.6.1": ("angle_pairs", None),
    "class6_maths_ch108::fegp.8.5.2": ("quad_facts", None),
    "class11_maths_ch112::kemh112.12.4.1":
        ("authored", {"qa": [
            ("State the standard trigonometric limit: lim(x->0) sin x / x "
             "equals what value?", ["val = 1"], "1"),
            ("Using the standard limit, 5 x lim(x->0) sin x / x equals "
             "what?", ["val = 5 * 1"], "5"),
            ("lim(x->0) sin(3x) / (3x) equals what value?", ["val = 1"], "1"),
            ("lim(x->0) (1 - cos x) / x tends to which value in the standard "
             "table (at x = 0 the numerator and denominator both vanish)?",
             ["val = 0"], "0"),
            ("lim(x->0) tan x / x equals what value (same as sin x / x)?",
             ["val = 1"], "1"),
            ("State lim(x->0) sin x / x in the standard limit table used to "
             "differentiate sin x.", ["val = 1"], "1"),
        ]}),
    "class11_maths_kemh112::kemh112.12.4.1":
        ("authored", {"qa": [
            ("State the standard trigonometric limit: lim(x->0) sin x / x.",
             ["val = 1"], "1"),
            ("lim(x->0) tan x / x equals what value?", ["val = 1"], "1"),
            ("lim(x->a) sin(x - a) / (x - a) equals what value? "
             "(shift x - a to t = x - a)", ["val = 1"], "1"),
            ("Using the algebra of limits, lim(x->2) (sin x / x) is computed "
             "by direct substitution: give sin(2)/2 to two decimal places.",
             ["val = 0.4546"], "0.45"),
            ("lim(x->0) (sin 5x) / (2x) equals 5/2 times the standard limit. "
             "Give the value.", ["val = 5 / 2"], "2.5"),
            ("State the standard limit table value of lim(x->0) (1 - cos x)/x"
             " (it equals 0).", ["val = 0"], "0"),
        ]}),
    "class6_maths_ch102::fegp.2.3": ("shape_facts", None),
    "class6_maths_fegp103::fegp.3.1": ("number_theory_facts", None),
    "class6_maths_fegp110::fegp.10.3": ("int_ops", None),
    "class6_maths_fegp110::fegp.10.4": ("int_ops", None),
    # class 7
    "class7_maths_ch103::gegp.103.4": ("dec_ops", None),
    "class7_maths_ch103::gegp.103.5": ("dec_ops", None),
    "class7_maths_ch103::gegp.103.6": ("dec_ops", None),
    "class7_maths_ch104::gegp.104.4": ("expr_eval", None),
    "class7_maths_ch202::gegp.2.2.3": ("int_ops", None),
    "class7_maths_ch205::gegp.5.1.1": ("central_tendency", None),
    "class7_maths_ch207::gegp.7.2.3": ("linear_eq", None),
    "class7_maths_gegp101::gegp.1.1": ("number_theory_facts", None),
    "class7_maths_gegp101::gegp.1.2": ("expr_eval", None),
    "class7_maths_gegp106::gegp.6.1": ("number_theory_facts", None),
    "class7_maths_gegp106::gegp.6.4": ("number_theory_facts", None),
    "class7_maths_gegp203::gegp2.3.1": ("hcf_lcm", None),
    "class7_maths_gegp205::gegp2.5.4": ("dispersion", None),
    # class 8
    "class8_maths_ch206::hegp.6.5.1": ("digit_reversal", None),
    "class8_maths_ch206::hegp.6.6.1": ("digit_reversal", None),
    "class8_maths_ch206::hegp.6.6.2": ("digit_reversal", None),
    "class8_maths_ch206::hegp.6.6.3": ("digit_reversal", None),
    "class8_maths_ch5_squares_square_roots::c8m5.3.2": ("odd_sum_square", None),
    "class8_maths_ch5_squares_square_roots::c8m5.3.4": ("squares", None),
    "class8_maths_hegp105::hegp.105.5.1": ("odd_sum_square", None),
    "class8_maths_hegp105::hegp.105.5.9": ("digit_reversal", None),
    "class8_maths_hegp106::hegp.106.6.2": ("expr_eval", None),
    "class8_maths_hemh103::hemh.103.3.1": ("angle_pairs", None),
    "class8_maths_hemh106::hemh.106.6.1": ("cubes", None),
    # class 9
    "class9_maths_ch101::iemh.101.2": ("coord_geom", None),
    "class9_maths_ch101::iemh.101.4": ("coord_geom", None),
    "class9_maths_ch103::iemh.3.1.1": ("number_theory_facts", None),
    "class9_maths_ch104::iemh.4.9": ("identities", None),
    "class9_maths_ch108::iemh.108.7": ("ap_gp", None),
    "class9_maths_iemh103::iemh.103.3.4": ("number_theory_facts", None),
    "class9_maths_iemh107::iemh.107.7.3": ("probability", None),
    "class9_maths_iemh108::iemh.108.8.3": ("ap_gp", None),
}

FALLBACK = "_unmatched"   # mapped to expr_eval by the builder
EXPR_FAMILY = "expr_eval"
SKIP = "_skip"            # builder drops the concept entirely

# subjects whose concepts are formula-driven; an unparseable/absent
# formula means recall text -- skip rather than emit off-topic maths
_STEM_STEM_RE = re.compile(
    r"_(physics|chemistry|biology|biotechnology|accountancy|"
    r"economics)_|class\d+_science_")

# families whose content is fact-recall rather than a computable method:
# verify_property concepts routed here are NOT converted.
NON_NUMERIC_FAMILIES = {"principal_values", "authored"}


def route(stem, concept):
    """Return (family_name, params) for one concept."""
    if stem.startswith("catalog_"):
        stem = stem[len("catalog_"):]
    key = "%s::%s" % (stem, concept["id"])
    if key in OVERRIDES:
        fam, params = OVERRIDES[key]
        return fam, params
    # STEM subjects: any parseable formula -> generic formula_eval
    # family; no formula -> SKIP (recall text is not a compute concept,
    # and expr_eval would emit off-topic arithmetic questions)
    if "social_science" not in stem and \
            _STEM_STEM_RE.search("_" + stem):
        formula = str(concept.get("formula") or "")
        if "=" in formula:
            return "formula_eval", None
        return SKIP, None
    hay = (concept.get("title") or "") + " || " + (concept.get("formula") or "")
    low = hay.lower()
    for rx, fam in _RULES:
        if rx.search(low):
            return fam, None
    return FALLBACK, None
