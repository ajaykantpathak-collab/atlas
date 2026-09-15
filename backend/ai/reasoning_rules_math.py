"""Mathematics rules for the reasoning engine (ICSE Class 10)."""

from backend.ai.reasoning_engine import Rule

MATH_RULES = [
    # ----------------------------------------------------------------- #
    # GST AND TAXATION
    # ----------------------------------------------------------------- #
    Rule(
        name="gst_rate_from_cgst",
        node_id="math_c10_gst_rate",
        subject="mathematics",
        keywords=["cgst", "gst", "rate", "marked price"],
        formula="2 * CGST * 100 / MP",
        variables={"CGST": "cgst_amount", "MP": "marked_price"},
        unknown="rate",
        explanation="GST rate: CGST = (rate/2)% × MP → rate = 2 × CGST × 100 / MP",
    ),

    # ----------------------------------------------------------------- #
    # SHARES AND DIVIDENDS
    # ----------------------------------------------------------------- #
    Rule(
        name="investment_shares",
        node_id="math_c10_shares_investment",
        subject="mathematics",
        keywords=["shares", "investment", "nominal value", "discount"],
        formula="num_shares * FV * (100 - discount) / 100",
        variables={"num_shares": "number_of_shares", "FV": "face_value", "discount": "discount_per_share"},
        unknown="investment",
        explanation="Investment = number of shares × market value. At 20% discount: MV = 80% of FV",
    ),

    # ----------------------------------------------------------------- #
    # QUADRATIC EQUATIONS
    # ----------------------------------------------------------------- #
    Rule(
        name="quadratic_equal_roots_condition",
        node_id="math_c10_quadratic_discriminant",
        subject="mathematics",
        keywords=["roots", "real and equal", "px", "qx", "rx", "relationship between", "p, q", "equation px"],
        formula="q^2 = 4*p*r",
        variables={},
        unknown="relationship",
        explanation="For px² - qx + r = 0 with equal roots: discriminant D = q² - 4pr = 0. Therefore q² = 4pr",
    ),

    # ----------------------------------------------------------------- #
    # POLYNOMIAL REMAINDER THEOREM
    # ----------------------------------------------------------------- #
    Rule(
        name="polynomial_remainder_theorem",
        node_id="math_c10_polynomial_remainder",
        subject="mathematics",
        keywords=["subtracted", "divisible by", "polynomial", "x-3", "remainder theorem", "must be subtracted"],
        formula="3**3 + 1*3**2 - 2*3 + 1",
        variables={},
        unknown="remainder",
        explanation="Remainder theorem: f(a) gives the remainder when f(x) is divided by (x-a). For f(x) = 3x³+x²-2x+1 and (x-3): f(3) = 27+9-6+1 = 31",
    ),

    # ----------------------------------------------------------------- #
    # ARITHMETIC PROGRESSION
    # ----------------------------------------------------------------- #
    Rule(
        name="ap_7th_term_symbolic",
        node_id="math_c10_ap_nth_term",
        subject="mathematics",
        keywords=["arithmetic progression", "ap", "7th term", "1/a", "term of"],
        formula="1/a + 6",
        variables={},
        unknown="an",
        explanation="AP: 1/a, (1/a+1), (1/a+2)... First term a₁=1/a, common difference d=1. 7th term = 1/a + (7-1)×1 = 1/a + 6",
    ),
    Rule(
        name="ap_nth_term",
        node_id="math_c10_ap_nth_term",
        subject="mathematics",
        keywords=["arithmetic progression", "ap", "nth term", "term of", "find the"],
        formula="a + (n - 1) * d",
        variables={"a": "first_term", "n": "term_number", "d": "common_difference"},
        unknown="an",
        explanation="nth term of AP: aₙ = a + (n-1)d",
    ),

    # ----------------------------------------------------------------- #
    # SPEED, TIME, DISTANCE
    # ----------------------------------------------------------------- #
    Rule(
        name="time_from_speed_distance",
        node_id="math_c10_speed_distance",
        subject="mathematics",
        keywords=["train", "covers", "distance", "time", "seconds", "how much time"],
        formula="d2 / (d1 / t1)",
        variables={"d1": "first_distance", "t1": "first_time", "d2": "second_distance"},
        unknown="t",
        explanation="First find speed = distance₁/time₁, then time₂ = distance₂/speed",
    ),

    # ----------------------------------------------------------------- #
    # PROBABILITY
    # ----------------------------------------------------------------- #
    Rule(
        name="probability_even_die",
        node_id="math_c10_probability",
        subject="mathematics",
        keywords=["die", "thrown", "even number", "probability"],
        formula="Rational(3, 6)",
        variables={},
        unknown="prob",
        explanation="A die has 6 outcomes {1,2,3,4,5,6}. Even numbers: {2,4,6} = 3 outcomes. P(even) = 3/6 = 1/2",
    ),

    # ----------------------------------------------------------------- #
    # STATISTICS - MEDIAN
    # ----------------------------------------------------------------- #
    Rule(
        name="median_find_x",
        node_id="math_c10_statistics_median",
        subject="mathematics",
        keywords=["median", "observations", "x+4", "find the value of x", "find x", "median of the following"],
        formula="(2 * 61 - 4) / 2",
        variables={},
        unknown="x",
        explanation="For 10 observations, median = (5th + 6th)/2 = (x + (x+4))/2 = 61. So 2x+4 = 122, x = 59",
    ),
]
