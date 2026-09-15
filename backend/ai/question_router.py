"""Question Router — reads a free-text question and identifies the problem type.

NO LLM in the critical path. Uses keyword matching against the problem type
catalog (name, description, topic, example) plus math-specific pattern detection.

Flow:
  1. Student types a question
  2. Router returns ranked candidate problem types
  3. For each candidate, shows what variables the student needs to input
  4. Student confirms the problem type and inputs variables
  5. Solver runs and shows step-by-step solution
"""

import re
from typing import Optional
from dataclasses import dataclass, field

from backend.ai.problem_types import PROBLEM_TYPES, ProblemType
from backend.ai.step_types import STEP_TYPES, get_step_type


@dataclass
class RouterMatch:
    """A single match from the router."""
    problem_type_id: str
    problem_type_name: str
    topic: str
    class_level: str
    score: float                  # 0-1, higher = better match
    matched_keywords: list        # which keywords triggered the match
    variables_needed: list        # list of {name, label, type, required, placeholder, help_text}
    formula_hint: str             # which formula/method will be used
    thinking_question: Optional[dict]  # competency question to ask first
    example: str                  # example question for this type


@dataclass
class RouteResult:
    """Result of routing a question."""
    question: str
    matches: list                 # list of RouterMatch, sorted by score
    best_match: Optional[RouterMatch] = None
    needs_clarification: bool = False
    clarification_msg: str = ""


# ─────────────────────────────────────────────────────────────────────
# Keyword index — built once from the problem type catalog
# ─────────────────────────────────────────────────────────────────────

# Stop words that should never be used as matching keywords
_STOP_WORDS = {
    "the", "and", "for", "are", "but", "not", "you", "all", "any", "can",
    "had", "her", "was", "one", "our", "out", "day", "get", "has", "him",
    "his", "how", "its", "let", "may", "own", "say", "she", "too", "use",
    "find", "from", "given", "what", "which", "this", "that", "with",
    "have", "will", "your", "their", "them", "then", "than", "these",
    "those", "there", "here", "when", "where", "why", "who", "does",
    "did", "been", "were", "into", "also", "each", "such", "very",
    "much", "many", "some", "more", "most", "only", "just", "like",
    "about", "after", "before", "between", "through", "during",
    "above", "below", "upon", "over", "under", "again", "once",
    "both", "either", "neither", "every", "other", "another",
    "same", "different", "new", "old", "first", "second", "third",
    "last", "next", "now", "still", "yet", "already", "always",
    "never", "often", "sometimes", "usually", "rarely", "seldom",
    "is", "of", "to", "in", "on", "at", "or", "as", "by", "an",
    "be", "if", "it", "we", "he", "so", "do", "no", "up", "my",
    "me", "us", "am", "a", "i",
}


def _extract_keywords(pt: ProblemType) -> list:
    """Extract keywords from a problem type for matching, excluding stop words."""
    keywords = set()
    for source in [pt.name, pt.description, pt.topic, pt.example]:
        for word in source.lower().split():
            # Strip punctuation
            clean = re.sub(r'[^a-z0-9]', '', word)
            if len(clean) > 2 and clean not in _STOP_WORDS:
                keywords.add(clean)
    return list(keywords)


def _get_formula_hint(pt: ProblemType) -> str:
    """Get a formula/method hint for a problem type from its first step."""
    if not pt.steps:
        return ""
    step = pt.steps[0]
    st = get_step_type(step.step_type_id)
    if st:
        return f"{st.name}: {st.description}"
    return ""


def _get_variables_needed(pt: ProblemType) -> list:
    """Get the list of variables the student needs to input for this problem type."""
    variables = []
    for step in pt.steps:
        st = get_step_type(step.step_type_id)
        if st is None:
            continue
        for f in st.inputs:
            variables.append({
                "step": step.label,
                "name": f.name,
                "label": f.label,
                "type": f.field_type,
                "required": f.required,
                "default": f.default,
                "placeholder": f.placeholder,
                "help_text": f.help_text,
            })
    return variables


def _get_thinking(pt: ProblemType) -> Optional[dict]:
    """Get the thinking question for a problem type."""
    if pt.thinking is None:
        return None
    return {
        "question": pt.thinking.question,
        "options": pt.thinking.options,
        "correct": pt.thinking.correct,
        "explanation": pt.thinking.explanation,
    }


# Build the keyword index once at import time
_KEYWORD_INDEX: dict = {}  # keyword -> list of problem_type_ids
_PT_KEYWORDS: dict = {}   # problem_type_id -> set of keywords

for _pt_id, _pt in PROBLEM_TYPES.items():
    kws = _extract_keywords(_pt)
    _PT_KEYWORDS[_pt_id] = set(kws)
    for kw in kws:
        _KEYWORD_INDEX.setdefault(kw, []).append(_pt_id)


# ─────────────────────────────────────────────────────────────────────
# Math pattern detection — detects numbers and math expressions in text
# ─────────────────────────────────────────────────────────────────────

_MATH_PATTERNS = {
    "derivative": [r"\bdifferentiate\b", r"\bderivative\b", r"\bf'\s*\(", r"\bdy/dx\b", r"\bf\s*prime\b"],
    "integral": [r"\bintegrate\b", r"\bintegral\b", r"\b∫\b", r"\bantiderivative\b"],
    "limit": [r"\blimit\b", r"\blim\b", r"\bx\s*→\b", r"\bx\s*->\b"],
    "determinant": [r"\bdeterminant\b"],
    "matrix_multiply": [r"\bmultiply\b.*\bmatrix\b", r"\bmatrix\b.*\bmultiply\b"],
    "matrix_add": [r"\badd\b.*\bmatrix\b", r"\bmatrix\b.*\badd\b"],
    "matrix_transpose": [r"\btranspose\b.*\bmatrix\b", r"\bmatrix\b.*\btranspose\b"],
    "matrix_skew_symmetric": [r"\bskew\s*symmetric\b"],
    "matrix_symmetric": [r"(?<!skew\s)[-]?\bsymmetric\b.*\bmatrix\b", r"\bmatrix\b.*\bsymmetric\b(?!.*skew)"],
    "matrix": [r"\bmatrix\b", r"\b\[\[.*\]\]\b"],
    "probability": [r"\bprobability\b", r"\bP\s*\(", r"\blikely\b", r"\bchance\b"],
    "conditional_probability": [r"\bgiven\s*that\b", r"\bP\s*\(\s*A\s*\|\s*B\s*\)", r"\bconditional\s*probability\b"],
    "combination_committee": [r"\bhow\s*many\s*ways\b.*\bcommittee\b", r"\bhow\s*many\s*ways\b.*\bgroup\b", r"\bhow\s*many\s*ways\b.*\bselected\b", r"\bcommittee\b.*\bformed\b", r"\bin\s*how\s*many\s*ways\b"],
    "percentage": [r"\bpercentage\b", r"\bpercent\b", r"\b%\b"],
    "percentage_of": [r"\b\d+\s*percent\s*of\b", r"\bwhat\s*is\s*\d+\s*percent\s*of\b"],
    "percentage_change": [r"\bpercent\s*change\b", r"\bpercentage\s*increase\b", r"\bpercentage\s*decrease\b", r"\bincreases\s*from\b.*\bpercent\b", r"\bpercent\s*increase\b", r"\bpercent\s*decrease\b"],
    "area": [r"\barea\b", r"\bsurface\b"],
    "volume": [r"\bvolume\b", r"\bhow\s*much\s*water\b", r"\bhow\s*much\s*can\b.*\bhold\b"],
    "perimeter": [r"\bperimeter\b", r"\bfencing\b", r"\bfence\b"],
    "equation": [r"\bsolve\b.*\bequation\b", r"\bfind\s+x\b", r"\broots\b"],
    "factor": [r"\bfactor\b", r"\bfactoris", r"\bfactoriz"],
    "trigonometry": [r"\bsin\b", r"\bcos\b", r"\btan\b", r"\btrig"],
    "inverse_trig": [r"\bsin\s*inverse\b", r"\bcos\s*inverse\b", r"\btan\s*inverse\b", r"\barcsin\b", r"\barccos\b", r"\barctan\b", r"\basin\b", r"\bacos\b", r"\batan\b"],
    "mean": [r"\bmean\b", r"\baverage\b"],
    "median": [r"\bmedian\b", r"\bmiddle\s*value\b", r"\bmiddle\s*score\b", r"\bmiddle\s*of\b"],
    "mode": [r"\bmode\b", r"\bmost\s*common\s*value\b", r"\bmost\s*frequent\b", r"\bmost\s*common\s*wage\b", r"\bsells\s*most\s*frequently\b"],
    "expand_expr": [r"\bexpand\b.*\(\s*x\s*\+", r"\bexpand\b.*\(\s*x\s*-\s", r"\bexpand\b\s*\(.*\)\s*\(.*\)", r"\bexpansion\b.*\bexpression\b", r"\bexpand\b.*\bexpression\b", r"\bexpand\b\s+this\s+expression\b"],
    "steepness": [r"\bsteepness\b", r"\bhow\s*steep\b", r"\bsteep\b"],
    "polynomial_zeros": [r"\bzeros?\s*of\s*(the\s*)?polynomial\b", r"\bprofit\s*becomes\s*zero\b", r"\bwhere\s*profit.*zero\b", r"\bbreak.even\b.*\bpolynomial\b"],
    "ap_pattern": [r"\bweek\s*1\b.*\bweek\s*2\b.*\bweek\s*3\b", r"\bpattern\b.*\bweek\s*1\b", r"\bsaves\b.*\bpattern\b", r"\bsaves\s*money\s*in\s*a\s*pattern\b"],
    "vertex_parabola": [r"\bvertex\b.*\bparabola\b", r"\bparabola\b.*\bvertex\b", r"\bvertex\s*of\s*this\b"],
    "diagonal_square": [r"\bdiagonal\s*of\s*a\s*square\b", r"\bdiagonal\s*of\s*the\s*square\b"],
    "differentiating": [r"\bdifferentiating\b", r"\bdifferentiate\b.*\bfind\b", r"\bby\s*differentiating\b"],
    "skew_symmetric_explicit": [r"\bskew[-\s]*symmetric\b"],
    "projection_explicit": [r"\bprojection\s*of\b.*\bon\b", r"\bprojection\s*of\s*the\b"],
    "determinant_of": [r"\bdeterminant\s*of\b"],
    "focus_only": [r"\bonly\b"],
    "circular_only": [r"\bcircular\b[^.]*\bonly\b"],
    "cylinder_only": [r"\bcylindrical\b[^.]*\bonly\b"],
    "sphere_only": [r"\bspherical?\b[^.]*\bonly\b", r"\bonly\b[^.]*\bspherical?\b"],
    "cone_only": [r"\bconical?\b[^.]*\bonly\b"],
    "both_mean_median": [r"\bboth\b.*\bmean\b.*\bmedian\b", r"\bboth\b.*\bmedian\b.*\bmean\b"],
    "weighted_mean": [r"\bweighted\s*mean\b", r"\bweights\b"],
    "interest": [r"\binterest\b", r"\bsimple\s*interest\b", r"\bcompound\s*interest\b"],
    "profit": [r"\bprofit\b", r"\bloss\b", r"\bcp\b", r"\bsp\b"],
    "discount": [r"\bdiscount\b", r"\bmarked\s*price\b"],
    "ratio": [r"\bratio\b", r"\bproportion\b"],
    "speed": [r"\bspeed\b", r"\bkm/h\b", r"\bm/s\b", r"\btrain\b.*\bkm\b", r"\bcar\b.*\bkm\b"],
    "speed_distance_time": [r"\bspeed\b", r"\bkm/h\b", r"\bm/s\b"],
    "ap": [r"\barithmetic\s*progression\b", r"\bAP\b", r"\bnth\s*term\b"],
    "gp": [r"\bgeometric\s*progression\b", r"\bGP\b"],
    "gp_infinite": [r"\binfinite\s*GP\b", r"\binfinite\s*geometric\b", r"\bsum\s*of\s*the\s*infinite\b"],
    "circle": [r"\bcircle\b", r"\bcircular\b", r"\bcircumference\b"],
    "sector": [r"\bsector\b"],
    "arc_length": [r"\barc\s*length\b"],
    "triangle": [r"\btriangle\b", r"\bhypotenuse\b", r"\bpythagor"],
    "diagonal": [r"\bdiagonal\b"],
    "coordinate_distance": [r"\bdistance\s*between\b.*\bpoint\b", r"\bdistance\s*between\b.*\(\d", r"\bpoints?\s*\("],
    "midpoint": [r"\bmidpoint\b", r"\bmid\s*point\b"],
    "section_formula": [r"\bdividing\b.*\bratio\b", r"\bsection\s*formula\b", r"\bline\s*joining\b.*\bratio\b"],
    "slope": [r"\bslope\b"],
    "line_equation": [r"\bequation\s*of\s*the\s*line\b", r"\bequation\s*of\s*a\s*line\b"],
    "quadratic": [r"\bquadratic\b", r"\bx\s*\*\s*2\b", r"\bx²\b", r"\bax\s*\+\s*bx"],
    "linear": [r"\blinear\s*equation\b", r"\bsimultaneous\b"],
    "logarithm": [r"\blog\b", r"\blogarithm\b"],
    "complex": [r"\bcomplex\s*number\b", r"\bmodulus\b", r"\bargument\b", r"\bi\s*\+\s*\d"],
    "vector": [r"\bvector\b", r"\bdot\s*product\b", r"\bcross\s*product\b", r"\bprojection\b"],
    "set": [r"\bset\b.*\bunion\b", r"\bset\b.*\bintersection\b", r"\bA\s*∪\s*B\b", r"\bA\s*∩\s*B\b", r"\bsets?\s*\{.*\}.*\bsets?\s*\{"],
    "permutation": [r"\bpermutation\b", r"\barrange\b", r"\bnPr\b"],
    "combination": [r"\bcombination\b", r"\bselect\b", r"\bchoose\b", r"\bnCr\b"],
    "binomial": [r"\bbinomial\b", r"\bexpand\s*\(1\s*\+\s*x"],
    "exponent": [r"\bexponent\b", r"\bpower\s*of\b", r"\bto\s*the\s*power\b"],
    "square_root": [r"\bsquare\s*root\b", r"\b√\b"],
    "cube_root": [r"\bcube\s*root\b", r"\b∛\b"],
    "hcf": [r"\bHCF\b", r"\bGCD\b", r"\bhighest\s*common\b"],
    "lcm": [r"\bLCM\b", r"\bleast\s*common\b"],
    "prime_check": [r"\bis\s+\d+\s+a\s+prime\b", r"\bprime\s*number\b"],
    "prime_factor": [r"\bprime\s*factor"],
    "fraction": [r"\bfraction\b", r"\b\d+/\d+\b"],
    "polynomial_division": [r"\bdivide\b.*\bpolynomial\b", r"\bdivide\b.*\bx\s*cub", r"\bdivide\b.*\bx\s*squar", r"\bpolynomial\s*division\b"],
    "fraction_divide": [r"\bdivide\b.*\bfraction\b", r"\bfraction\b.*\bdivide\b", r"\bdivide\b.*\d+/\d+.*\bby\b.*\d+/\d+", r"\bdivide\b\s+\d+/\d+\s+\bby\b\s+\d+/\d+"],
    "decimal": [r"\bdecimal\b"],
    "continuity": [r"\bcontinuity\b", r"\bcontinuous\b"],
    "differential_eq": [r"\bdifferential\s*equation\b", r"\bdy/dx\s*=.*y\b"],
    "tangent": [r"\btangent\b", r"\bnormal\s*to\b"],
    "increasing": [r"\bincreasing\b", r"\bdecreasing\b", r"\bmonotonic\b"],
    "lpp": [r"\blinear\s*programming\b", r"\bmaximize\b", r"\bminimize\b", r"\bcorner\s*point"],
    "angle": [r"\bangle\b", r"\bdegree\b", r"\bradian\b"],
    "height": [r"\bheight\b.*\bangle\b", r"\belevation\b", r"\bdepression\b", r"\bladder\b", r"\blook\s*up\b", r"\btower\b.*\bheight\b"],
    "hemisphere": [r"\bhemisphere\b", r"\bhemispherical\b", r"\bdome\b"],
    "sphere": [r"\bsphere\b", r"\bspherical\b"],
    "cylinder": [r"\bcylinder\b", r"\bcylindrical\b"],
    "cone": [r"\bcone\b", r"\bconical\b"],
    "cube": [r"\bcube\b"],
    "cuboid": [r"\bcuboid\b", r"\bcuboidal\b", r"\brectangular\s*box\b"],
    "trapezium": [r"\btrapezium\b", r"\btrapezoid\b"],
    "parallelogram": [r"\bparallelogram\b"],
    "rhombus": [r"\brhombus\b"],
    "rectangle": [r"\brectangle\b", r"\brectangular\b"],
    "ellipse": [r"\bellipse\b", r"\belliptical\b"],
    "parabola": [r"\bparabola\b", r"\bparabolic\b"],
    "hyperbola": [r"\bhyperbola\b"],
    "function_composition": [r"\bf\s*of\s*g\b", r"\bg\s*of\s*f\b", r"\bcomposite\s*function\b", r"\bf\(g\(x\)\)\b"],
    "function": [r"\bfunction\b", r"\bf\(x\)\b"],
    "sequence": [r"\bsequence\b", r"\bseries\b", r"\bsum\s*of\s*terms\b"],
    "statistics": [r"\bstandard\s*deviation\b", r"\bvariance\b", r"\bcorrelation\b", r"\bregression\b"],
    "distance_3d": [r"\b3d\b.*\bdistance\b", r"\bthree\s*dimensional\b.*\bdistance\b", r"\bpoints?\s*\(\d.*\d.*\d.*\).*\b3d\b", r"\bin\s*3d\b"],
    "direction": [r"\bdirection\s*cosine\b", r"\bdirection\s*ratio\b"],
    "plane": [r"\bplane\b.*\bequation\b", r"\b3d\b.*\bplane\b"],
    "arithmetic": [r"\bevaluate\b.*\d+.*[\+\-\*\/]", r"\bplus\b.*\bminus\b.*\btimes\b", r"\bplus\b.*\btimes\b", r"\bBODMAS\b"],
    "max_height": [r"\bmaximum\s*height\b", r"\bmax\s*height\b", r"\bprojectile\b", r"\bh\s*\(t\)\b"],
    "critical_points": [r"\bcritical\s*points?\b"],
    # ── Patterns from SQPs, MS, CFQs, Atomic Graph, Syllabus ──
    "data_handling": [r"\bdata\b", r"\bfrequency\b", r"\bhistogram\b", r"\bogive\b", r"\bcumulative\b", r"\bpictograph\b", r"\btally\b"],
    "addition": [r"\baddition\b", r"\badd\b.*\bto\b.*\bfind\b", r"\bfind\s+the\s+sum\s+of\s+\d+\s*and\s+\d+\b"],
    "multiplication": [r"\bmultiplication\b", r"\bfind\s+the\s+product\b"],
    "subtraction": [r"\bsubtraction\b", r"\bsubtract\b.*\bfrom\b.*\bfind\b", r"\bfind\s+the\s+difference\b"],
    "division_op": [r"\bdivision\b", r"\bfind\s+the\s+quotient\b", r"\bfind\s+the\s+remainder\b"],
    "order_matrix": [r"\border\b.*\bmatrix\b", r"\bmatrix\b.*\border\b"],
    "average": [r"\baverage\b", r"\bmean\b"],
    "maximum_val": [r"\bmaximum\b(?!.*height)", r"\bmax\b(?!.*height)"],
    "minimum_val": [r"\bminimum\b"],
    "intersection": [r"\bintersection\b", r"\bintersect\b"],
    "number_line": [r"\bnumber\s*line\b"],
    "range_func": [r"\brange\b(?!.*of\s*data)"],
    "domain_func": [r"\bdomain\b"],
    "reflection": [r"\breflection\b", r"\breflect\b"],
    "similarity": [r"\bsimilarity\b", r"\bsimilar\s*triangle\b", r"\bsimilar\b.*\btriangle\b"],
    "locus": [r"\blocus\b", r"\bloci\b"],
    "place_value": [r"\bplace\s*value\b", r"\bexpanded\s*form\b"],
    "denominator": [r"\bdenominator\b", r"\bnumerator\b"],
    "pythagoras_theorem": [r"\bpythagoras\b", r"\bpythagor"],
    "reflexive": [r"\breflexive\b"],
    "transitive": [r"\btransitive\b"],
    "equivalence": [r"\bequivalence\b.*\brelation\b", r"\bequivalence\b"],
    "ascending": [r"\bascending\b", r"\barrange\s*in\s*order\b"],
    "descending": [r"\bdescending\b"],
    "acute_angle": [r"\bacute\b"],
    "obtuse_angle": [r"\bobtuse\b"],
    "shares": [r"\bshares?\b", r"\bdividend\b", r"\bface\s*value\b", r"\bmarket\s*value\b"],
    "proportion": [r"\bproportion\b", r"\bproportional\b"],
    "inequality": [r"\binequality\b", r"\binequation\b"],
    "inverse_trig_short": [r"\binverse\s*trig\b"],
    "gst": [r"\bGST\b", r"\bgst\b", r"\btax\b.*\bprice\b", r"\bCGST\b", r"\bSGST\b"],
    "cost_price": [r"\bcost\s*price\b", r"\bCP\b", r"\bcost\s*per\b"],
    "degree": [r"\bdegree\b(?!.*angle)"],
    "general_term": [r"\bgeneral\s*term\b", r"\bnth\s*term\b"],
    "cartesian": [r"\bcartesian\b", r"\bcoordinate\s*axes\b"],
    "continuous": [r"\bcontinuous\b", r"\bcontinuity\b"],
    "dice": [r"\bdie\b", r"\bdice\b"],
    "bag_ball": [r"\bbag\b.*\bball\b", r"\bball\b.*\bbag\b", r"\b urn\b", r"\bdrawn\s*from\b"],
    "geometric_progression": [r"\bgeometric\s*progression\b", r"\bGP\b"],
    "sample_space": [r"\bsample\s*space\b", r"\bevent\b.*\boutcome\b"],
    "general_solution": [r"\bgeneral\s*solution\b"],
    "parametric": [r"\bparametric\b"],
    "total_surface": [r"\btotal\s*surface\s*area\b", r"\bcurved\s*surface\s*area\b", r"\bsurface\s*area\b"],
    "combination_solids": [r"\bcombination\s*of\s*solids\b", r"\bcylinder\s*with\s*hemisphere\b", r"\bcone\s*on\s*cylinder\b", r"\bcapsule\b"],
    "banking": [r"\bbanking\b", r"\bpassbook\b", r"\brecurring\s*deposit\b", r"\bmaturity\s*value\b", r"\binterest\s*accumulated\b"],
    "poisson": [r"\bpoisson\b", r"\bnormal\s*distribution\b"],
    "bayes": [r"\bbayes\b", r"\btotal\s*probability\b"],
    "independent_events": [r"\bindependent\s*events?\b", r"\bmutually\s*exclusive\b"],
    "scalar_triple": [r"\bscalar\s*triple\b", r"\bvector\s*triple\b", r"\bparallelepiped\b"],
    "coplanar": [r"\bcoplanar\b", r"\bskew\s*line\b", r"\bshortest\s*distance\b"],
    "foot_perpendicular": [r"\bfoot\s*of\s*perpendicular\b", r"\bimage\s*of\s*point\b"],
    "implicit_diff": [r"\bimplicit\s*differentiation\b"],
    "log_diff": [r"\blogarithmic\s*differentiation\b"],
    "chain_rule": [r"\bchain\s*rule\b"],
    "second_derivative": [r"\bsecond\s*derivative\b", r"\bsecond\s*order\b"],
    "partial_fraction": [r"\bpartial\s*fraction\b"],
    "integration_by_parts": [r"\bintegration\s*by\s*parts\b"],
    "integration_substitution": [r"\bintegration\s*by\s*substitution\b"],
    "ftc": [r"\bfundamental\s*theorem\b.*\bcalculus\b"],
    "area_between_curves": [r"\barea\s*between\b.*\bcurve\b", r"\barea\s*bounded\b"],
    "order_degree_de": [r"\border\s*and\s*degree\b", r"\bformation\s*of\s*differential\b"],
    "homogeneous_de": [r"\bhomogeneous\s*differential\b"],
    "linear_de": [r"\blinear\s*differential\b", r"\bdy/dx\s*\+\s*P"],
    "separation_variables": [r"\bseparation\s*of\s*variables\b"],
    "rate_of_change_explicit": [r"\brate\s*of\s*change\b", r"\bmarginal\s*cost\b", r"\bmarginal\s*revenue\b"],
    "even_odd_function": [r"\beven\s*function\b", r"\bodd\s*function\b"],
    "graphing": [r"\bgraph\b.*\bfunction\b", r"\bsketch\b.*\bgraph\b", r"\bplot\b.*\bgraph\b"],
    "angle_type": [r"\bright\s*angle\b", r"\bacute\s*angle\b", r"\bobtuse\s*angle\b", r"\bstraight\s*angle\b"],
    "polygon": [r"\bpentagon\b", r"\bhexagon\b", r"\boctagon\b", r"\bpolygon\b"],
    "cyclic_quad": [r"\bcyclic\s*quadrilateral\b"],
    "tangent_circle": [r"\btangent\b.*\bcircle\b", r"\bcircle\b.*\btangent\b"],
    "congruence": [r"\bcongruent\b", r"\bcongruence\b"],
    "remainder_theorem": [r"\bremainder\s*theorem\b"],
    "factor_theorem": [r"\bfactor\s*theorem\b"],
    "linear_inequation": [r"\blinear\s*inequation\b", r"\binequation\b.*\bone\s*variable\b"],
    "quadratic_word": [r"\bquadratic\b.*\bword\b", r"\bword\s*problem\b.*\bquadratic\b"],
    "nature_roots": [r"\bnature\s*of\s*roots?\b", r"\bdiscriminant\b"],
    "common_roots": [r"\bcommon\s*roots?\b"],
    "am_gm": [r"\bAM.?GM\b", r"\barithmetic\s*mean\b.*\bgeometric\s*mean\b"],
    "cauchy_schwarz": [r"\bcauchy\s*schwarz\b"],
    "derangement": [r"\bderangement\b"],
    "vieta": [r"\bvieta\b", r"\bsymmetric\s*function\b.*\broots?\b"],
    "rolles_theorem": [r"\brolle.?s?\s*theorem\b"],
    "lmvt": [r"\blagrange.?s?\s*mean\s*value\b", r"\bmean\s*value\s*theorem\b"],
    "lhopital": [r"\bl.?hopital\b", r"\bl.?hospital\b"],
    "wallis": [r"\bwallis\b", r"\breduction\s*formula\b"],
    "bernoulli_de": [r"\bbernoulli\b.*\bdifferential\b"],
    "exact_de": [r"\bexact\s*differential\b", r"\bintegrating\s*factor\b"],
    "binomial_distribution": [r"\bbinomial\s*distribution\b", r"\brandom\s*variable\b", r"\bprobability\s*distribution\b"],
    "adjoint": [r"\badjoint\b", r"\bcofactor\b", r"\bminor\b"],
    "matrix_inverse": [r"\binverse\s*of\s*matrix\b", r"\binvertible\s*matrix\b"],
    "consistency": [r"\bconsistency\b.*\bequation\b", r"\binconsistent\b.*\bsystem\b"],
    "area_triangle_det": [r"\barea\s*of\s*triangle\b.*\bdeterminant\b"],
    "skew_lines_3d": [r"\bskew\s*lines?\b"],
    "angle_between_lines": [r"\bangle\s*between\s*two\s*lines\b"],
    "angle_between_planes": [r"\bangle\s*between\s*two\s*planes\b"],
    "distance_point_plane": [r"\bdistance\s*of\s*point\s*from\s*plane\b"],
    "distance_parallel_lines": [r"\bdistance\s*between\s*parallel\s*lines\b"],
    "section_3d": [r"\b3d\b.*\bsection\b", r"\bsection\s*formula\b.*\b3d\b"],
    "centroid": [r"\bcentroid\b"],
    "collinearity": [r"\bcollinear\b", r"\bcollinearity\b"],
    "lpp_formulation": [r"\blinear\s*programming\b", r"\bfeasible\s*region\b", r"\boptimal\s*solution\b"],
    "one_one_onto": [r"\bone.?one\b", r"\bonto\b", r"\binvertible\b.*\bfunction\b"],
    "binary_op": [r"\bbinary\s*operation\b"],
    "grouped_data": [r"\bgrouped\s*data\b", r"\bclass\s*interval\b", r"\bfrequency\s*distribution\b"],
    "ogive_data": [r"\bogive\b", r"\bquartile\b", r"\bless\s*than\s*type\b"],
    "trig_equation": [r"\btrigonometric\s*equation\b", r"\bsolve\b.*\bsin\b.*\btheta\b", r"\bsolve\b.*\bcos\b.*\btheta\b"],
    "trig_identity": [r"\btrigonometric\s*identity\b", r"\bprove\b.*\bidentity\b", r"\bsin.*cos.*=.*1\b"],
    "compound_angle": [r"\bcompound\s*angle\b", r"\bsin\s*\(\s*x\s*\\?\s*[+-]\s*y\s*\)", r"\bcos\s*\(\s*x\s*\\?\s*[+-]\s*y\s*\)"],
    "double_angle": [r"\bdouble\s*angle\b", r"\bsin\s*2x\b", r"\bcos\s*2x\b", r"\btan\s*2x\b"],
    "triple_angle": [r"\btriple\s*angle\b", r"\bsin\s*3x\b", r"\bcos\s*3x\b", r"\btan\s*3x\b"],
    "argand": [r"\bargand\b", r"\bpolar\s*representation\b"],
    "cube_roots_unity": [r"\bcube\s*roots?\s*of\s*unity\b"],
    "square_root_complex": [r"\bsquare\s*root\s*of\s*complex\b"],
    "circular_perm": [r"\bcircular\s*permutation\b"],
    "pascal": [r"\bpascal.?s?\s*triangle\b"],
    "middle_term_binomial": [r"\bmiddle\s*term\b.*\bbinomial\b"],
    "infinite_gp": [r"\binfinite\s*GP\b", r"\binfinite\s*geometric\b"],
    "am_insertion": [r"\barithmetic\s*mean\b.*\binsert\b", r"\binsert\b.*\barithmetic\s*mean\b"],
    "gm_insertion": [r"\bgeometric\s*mean\b.*\binsert\b", r"\binsert\b.*\bgeometric\s*mean\b"],
    "special_sums": [r"\bsigma\b.*\bn\b", r"\bsum\s*of\s*squares\b", r"\bsum\s*of\s*cubes\b"],
    "shifting_origin": [r"\bshifting\s*of\s*origin\b"],
    "family_lines": [r"\bfamily\s*of\s*lines\b"],
    "conic_general": [r"\bconic\s*section\b", r"\beccentricity\b", r"\bdirectrix\b", r"\bfocus\b.*\bconic\b"],
    "ellipse_props": [r"\bellipse\b.*\bstandard\b", r"\bellipse\b.*\bequation\b"],
    "hyperbola_props": [r"\bhyperbola\b.*\bstandard\b", r"\bhyperbola\b.*\bequation\b"],
    "chord_tangent_conic": [r"\bchord\b.*\bconic\b", r"\bpolar\s*equation\b.*\bconic\b"],
}

# Direct mapping: detected pattern → list of (problem_type_id, weight_boost)
# This gives high-confidence direct matches for specific math patterns
_PATTERN_TO_PT: dict = {
    "derivative": [("deriv_at_point", 4.0)],
    "integral": [("definite_integral", 2.5), ("indefinite_integral", 2.5), ("area_under_curve", 1.5)],
    "limit": [("find_limit", 3.0)],
    "determinant": [("find_determinant", 4.0)],
    "matrix_multiply": [("matrix_multiply_problem", 4.0)],
    "matrix_add": [("matrix_add_problem", 4.0)],
    "matrix_transpose": [("matrix_transpose_problem", 4.0)],
    "matrix_skew_symmetric": [("verify_skew_symmetric_problem", 5.0)],
    "matrix_symmetric": [("verify_symmetric_problem", 5.0)],
    "matrix": [("find_determinant", 1.0), ("matrix_multiply_problem", 1.0), ("matrix_add_problem", 0.5), ("matrix_transpose_problem", 0.5), ("verify_skew_symmetric_problem", 0.5), ("verify_symmetric_problem", 0.5)],
    "probability": [("basic_probability_problem", 2.0), ("conditional_probability_problem", 1.5), ("binomial_probability_problem", 1.5)],
    "conditional_probability": [("conditional_probability_problem", 5.0)],
    "combination_committee": [("combination_problem", 4.0)],
    "percentage": [("find_percentage", 2.0), ("find_percentage_of", 1.5), ("percentage_change", 1.5)],
    "percentage_of": [("find_percentage_of", 4.0)],
    "percentage_change": [("percentage_change", 4.0)],
    "area": [("area_circle_problem", 1.0), ("area_rectangle_problem", 1.0), ("area_triangle_problem", 1.0),
             ("area_trapezium_problem", 0.5), ("area_parallelogram_problem", 0.5), ("area_rhombus_problem", 0.5),
             ("sector_area_problem", 0.5), ("area_under_curve", 0.5)],
    "volume": [("volume_cube_problem", 1.0), ("volume_cuboid_problem", 1.0), ("volume_cylinder_problem", 1.0),
               ("volume_cone_problem", 1.0), ("volume_sphere_problem", 1.0), ("volume_hemisphere_problem", 1.0),
               ("volume_frustum_problem", 0.5)],
    "perimeter": [("area_rectangle_problem", 2.0), ("perimeter_polygon", 2.0)],
    "equation": [("solve_equation_problem", 2.0), ("linear_equation_one_var", 1.5)],
    "factor": [("factor_polynomial_problem", 2.5), ("factorise_algebraic", 2.0)],
    "trigonometry": [("trig_value_problem", 2.0), ("heights_distances_problem", 1.0)],
    "inverse_trig": [("inverse_trig_problem", 4.0)],
    "mean": [("mean_problem", 3.0)],
    "median": [("median_problem", 4.0)],
    "mode": [("mode_problem", 4.0)],
    "expand_expr": [("expand_expression_problem", 5.0)],
    "steepness": [("slope_problem", 5.0)],
    "polynomial_zeros": [("polynomial_zeros_problem", 5.0)],
    "ap_pattern": [("ap_nth_term_problem", 4.0), ("ap_sum_problem", 2.0)],
    "vertex_parabola": [("parabola_vertex_problem", 5.0)],
    "diagonal_square": [("pythagoras_hypotenuse_problem", 5.0)],
    "differentiating": [("deriv_at_point", 5.0)],
    "skew_symmetric_explicit": [("verify_skew_symmetric_problem", 6.0)],
    "projection_explicit": [("vector_projection_problem", 5.0)],
    "determinant_of": [("find_determinant", 5.0)],
    "focus_only": [],
    "circular_only": [("area_circle_problem", 4.0)],
    "cylinder_only": [("volume_cylinder_problem", 4.0)],
    "sphere_only": [("volume_sphere_problem", 5.0)],
    "cone_only": [("volume_cone_problem", 5.0)],
    "both_mean_median": [],  # ambiguous — handled by penalty
    "weighted_mean": [("weighted_mean_problem", 4.0)],
    "interest": [("simple_interest_problem", 2.0), ("compound_interest_problem", 2.0)],
    "profit": [("profit_loss_problem", 3.0)],
    "discount": [("discount_problem", 3.0)],
    "ratio": [("ratio_proportion_problem", 2.5), ("direct_proportion_problem", 1.5), ("inverse_proportion_problem", 1.5)],
    "speed": [("speed_distance_time_problem", 3.0)],
    "speed_distance_time": [("speed_distance_time_problem", 4.0)],
    "ap": [("ap_nth_term_problem", 2.0), ("ap_sum_problem", 2.0)],
    "gp": [("gp_nth_term_problem", 2.0), ("gp_sum_problem", 2.0), ("gp_infinite_sum_problem", 1.0)],
    "gp_infinite": [("gp_infinite_sum_problem", 5.0)],
    "circle": [("area_circle_problem", 1.5), ("circle_equation_problem", 1.5), ("arc_length_problem", 0.5)],
    "sector": [("sector_area_problem", 4.0), ("arc_length_problem", 1.0)],
    "arc_length": [("arc_length_problem", 5.0)],
    "triangle": [("area_triangle_problem", 2.0), ("pythagoras_hypotenuse_problem", 1.5), ("pythagoras_side_problem", 1.5)],
    "diagonal": [("pythagoras_side_problem", 3.0), ("pythagoras_hypotenuse_problem", 2.0)],
    "coordinate_distance": [("distance_formula_problem", 5.0)],
    "midpoint": [("midpoint_problem", 5.0)],
    "section_formula": [("section_formula_problem", 5.0)],
    "slope": [("slope_problem", 4.0)],
    "line_equation": [("line_equation_problem", 4.0)],
    "quadratic": [("solve_equation_problem", 2.0), ("quadratic_formula", 2.5), ("nature_of_roots", 1.5)],
    "linear": [("solve_equation_problem", 1.5), ("simultaneous_linear", 2.0), ("linear_equation_one_var", 2.0)],
    "logarithm": [("logarithm_problem", 3.0)],
    "complex": [("complex_modulus_problem", 2.0), ("complex_argument_problem", 2.0)],
    "vector": [("angle_between_vectors_problem", 1.5), ("vector_projection_problem", 1.5)],
    "set": [("set_operations_problem", 3.0)],
    "permutation": [("permutation_problem", 3.0)],
    "combination": [("combination_problem", 3.0)],
    "binomial": [("binomial_expansion_problem", 2.0), ("binomial_coefficient_problem", 2.0)],
    "exponent": [("exponents_problem", 3.0)],
    "square_root": [("square_root_problem", 3.0)],
    "cube_root": [("cube_root_problem", 3.0)],
    "hcf": [("hcf_lcm_problem", 3.0)],
    "lcm": [("hcf_lcm_problem", 3.0)],
    "prime_check": [("check_prime", 4.0)],
    "prime_factor": [("prime_factorization_problem", 4.0)],
    "fraction": [("add_fractions", 1.5), ("multiply_fractions", 1.5), ("divide_fractions", 1.0)],
    "polynomial_division": [("polynomial_division_problem", 5.0)],
    "fraction_divide": [("divide_fractions", 4.0)],
    "continuity": [("continuity_problem", 3.0)],
    "differential_eq": [("differential_equation_problem", 3.0)],
    "tangent": [("tangent_equation_problem", 3.0)],
    "increasing": [("increasing_decreasing_problem", 3.0)],
    "lpp": [("lpp_optimize", 3.0)],
    "angle": [("angle_type", 2.0), ("angle_sum_triangle", 1.5), ("angle_sum_quadrilateral", 1.5)],
    "height": [("heights_distances_problem", 4.0)],
    "hemisphere": [("volume_hemisphere_problem", 3.0)],
    "sphere": [("volume_sphere_problem", 4.0)],
    "cylinder": [("volume_cylinder_problem", 3.0)],
    "cone": [("volume_cone_problem", 3.0)],
    "cube": [("volume_cube_problem", 3.0)],
    "cuboid": [("volume_cuboid_problem", 3.0)],
    "trapezium": [("area_trapezium_problem", 3.0)],
    "parallelogram": [("area_parallelogram_problem", 3.0)],
    "rhombus": [("area_rhombus_problem", 3.0)],
    "rectangle": [("area_rectangle_problem", 3.0)],
    "ellipse": [("circle_equation_problem", 1.0)],
    "parabola": [("parabola_vertex_problem", 3.0)],
    "function_composition": [("function_composition_problem", 5.0)],
    "function": [("function_composition_problem", 1.0), ("deriv_at_point", 0.5)],
    "sequence": [("ap_nth_term_problem", 1.5), ("gp_nth_term_problem", 1.5), ("ap_sum_problem", 1.0), ("gp_sum_problem", 1.0)],
    "statistics": [("standard_deviation_problem", 2.0), ("correlation_problem", 1.5), ("regression_line_problem", 1.5)],
    "distance_3d": [("distance_3d_problem", 5.0)],
    "direction": [("direction_cosines_problem", 3.0)],
    "plane": [],
    "arithmetic": [("basic_arithmetic", 5.0)],
    "max_height": [("max_height", 5.0)],
    "critical_points": [("find_critical_points", 5.0)],
    # ── Mappings for patterns from SQPs, MS, CFQs, Atomic Graph ──
    "data_handling": [("mean_problem", 1.0), ("median_problem", 1.0), ("mode_problem", 1.0)],
    "addition": [("basic_arithmetic", 3.0)],
    "multiplication": [("basic_arithmetic", 3.0)],
    "subtraction": [("basic_arithmetic", 3.0)],
    "division_op": [("basic_arithmetic", 2.0), ("divide_fractions", 1.0)],
    "order_matrix": [("find_determinant", 1.0), ("matrix_multiply_problem", 1.0)],
    "average": [("mean_problem", 4.0)],
    "maximum_val": [("max_min_optimization", 3.0), ("find_critical_points", 2.0)],
    "minimum_val": [("max_min_optimization", 3.0), ("find_critical_points", 2.0)],
    "intersection": [("set_operations_problem", 3.0)],
    "number_line": [("linear_inequation", 3.0)],
    "range_func": [("function_composition_problem", 1.0)],
    "domain_func": [("function_composition_problem", 1.0)],
    "reflection": [],
    "similarity": [("area_triangle_problem", 1.0)],
    "locus": [],
    "place_value": [("basic_arithmetic", 2.0)],
    "denominator": [("add_fractions", 2.0), ("multiply_fractions", 1.0)],
    "pythagoras_theorem": [("pythagoras_hypotenuse_problem", 4.0), ("pythagoras_side_problem", 3.0)],
    "reflexive": [],
    "transitive": [],
    "equivalence": [],
    "ascending": [("basic_arithmetic", 1.0)],
    "descending": [("basic_arithmetic", 1.0)],
    "acute_angle": [("trig_value_problem", 1.0)],
    "obtuse_angle": [("trig_value_problem", 1.0)],
    "shares": [("simple_interest_problem", 1.0), ("profit_loss_problem", 1.0)],
    "proportion": [("ratio_proportion_problem", 3.0), ("direct_proportion_problem", 1.5), ("inverse_proportion_problem", 1.5)],
    "inequality": [("solve_equation_problem", 1.0)],
    "inverse_trig_short": [("inverse_trig_problem", 4.0)],
    "gst": [("find_percentage_of", 4.0), ("find_percentage", 2.0)],
    "cost_price": [("profit_loss_problem", 3.0), ("discount_problem", 2.0)],
    "degree": [("differential_equation_problem", 2.0)],
    "general_term": [("ap_nth_term_problem", 3.0), ("gp_nth_term_problem", 3.0)],
    "cartesian": [("distance_formula_problem", 1.0), ("midpoint_problem", 1.0)],
    "continuous": [("continuity_find_k", 3.0)],
    "dice": [("basic_probability_problem", 4.0)],
    "bag_ball": [("basic_probability_problem", 4.0), ("conditional_probability_problem", 2.0)],
    "geometric_progression": [("gp_nth_term_problem", 2.0), ("gp_sum_problem", 2.0)],
    "sample_space": [("basic_probability_problem", 3.0)],
    "general_solution": [("solve_de", 2.0)],
    "parametric": [("deriv_at_point", 2.0)],
    "total_surface": [("volume_cylinder_problem", 1.0), ("volume_cone_problem", 1.0), ("volume_sphere_problem", 1.0)],
    "combination_solids": [("volume_cylinder_problem", 2.0), ("volume_hemisphere_problem", 2.0), ("volume_cone_problem", 1.0)],
    "banking": [("simple_interest_problem", 3.0), ("compound_interest_problem", 2.0)],
    "poisson": [("binomial_probability_problem", 3.0)],
    "bayes": [("conditional_probability_problem", 4.0)],
    "independent_events": [("basic_probability_problem", 2.0), ("conditional_probability_problem", 2.0)],
    "scalar_triple": [("vector_projection_problem", 1.0), ("angle_between_vectors_problem", 1.0)],
    "coplanar": [],
    "foot_perpendicular": [],
    "implicit_diff": [("deriv_at_point", 3.0)],
    "log_diff": [("deriv_at_point", 3.0)],
    "chain_rule": [("deriv_at_point", 2.0)],
    "second_derivative": [("increasing_decreasing_problem", 2.0), ("find_critical_points", 2.0)],
    "partial_fraction": [("indefinite_integral", 3.0), ("definite_integral", 2.0)],
    "integration_by_parts": [("indefinite_integral", 3.0), ("definite_integral", 2.0)],
    "integration_substitution": [("indefinite_integral", 3.0), ("definite_integral", 2.0)],
    "ftc": [("definite_integral", 4.0)],
    "area_between_curves": [("area_between_curves", 5.0)],
    "order_degree_de": [("solve_de", 3.0)],
    "homogeneous_de": [("solve_de", 3.0)],
    "linear_de": [("solve_de", 3.0)],
    "separation_variables": [("solve_de", 3.0)],
    "rate_of_change_explicit": [("rate_of_change", 2.0)],
    "even_odd_function": [],
    "graphing": [],
    "angle_type": [("trig_value_problem", 1.0)],
    "polygon": [("area_rectangle_problem", 1.0)],
    "cyclic_quad": [],
    "tangent_circle": [("tangent_equation_problem", 2.0), ("area_circle_problem", 1.0)],
    "congruence": [("area_triangle_problem", 1.0)],
    "remainder_theorem": [("polynomial_division_problem", 3.0), ("factor_polynomial_problem", 2.0)],
    "factor_theorem": [("factor_polynomial_problem", 4.0), ("polynomial_zeros_problem", 2.0)],
    "linear_inequation": [("solve_equation_problem", 2.0)],
    "quadratic_word": [("solve_equation_problem", 3.0), ("solve_quadratic", 3.0)],
    "nature_roots": [("solve_quadratic", 4.0), ("solve_equation_problem", 2.0)],
    "common_roots": [("solve_quadratic", 3.0)],
    "am_gm": [],
    "cauchy_schwarz": [],
    "derangement": [("permutation_problem", 2.0)],
    "vieta": [("polynomial_zeros_problem", 3.0)],
    "rolles_theorem": [("find_critical_points", 2.0)],
    "lmvt": [],
    "lhopital": [("find_limit", 4.0)],
    "wallis": [("definite_integral", 2.0)],
    "bernoulli_de": [("solve_de", 3.0)],
    "exact_de": [("solve_de", 3.0)],
    "binomial_distribution": [("binomial_probability_problem", 4.0)],
    "adjoint": [("find_determinant", 3.0), ("matrix_inverse_and_solve", 3.0)],
    "matrix_inverse": [("matrix_inverse_and_solve", 5.0)],
    "consistency": [("solve_equation_problem", 2.0), ("matrix_inverse_and_solve", 2.0)],
    "area_triangle_det": [("find_determinant", 3.0), ("area_triangle_problem", 2.0)],
    "skew_lines_3d": [],
    "angle_between_lines": [("slope_problem", 2.0)],
    "angle_between_planes": [],
    "distance_point_plane": [],
    "distance_parallel_lines": [("distance_formula_problem", 2.0)],
    "section_3d": [("section_3d_problem", 5.0)],
    "centroid": [("section_formula_problem", 2.0)],
    "collinearity": [("slope_problem", 2.0), ("area_triangle_problem", 1.0)],
    "lpp_formulation": [("lpp_optimize", 5.0)],
    "one_one_onto": [("function_composition_problem", 1.0)],
    "binary_op": [],
    "grouped_data": [("mean_problem", 2.0), ("median_problem", 2.0), ("mode_problem", 2.0)],
    "ogive_data": [("median_problem", 2.0)],
    "trig_equation": [("trig_value_problem", 3.0)],
    "trig_identity": [("prove_identity", 5.0), ("trig_value_problem", 2.0)],
    "compound_angle": [("trig_value_problem", 3.0), ("prove_identity", 2.0)],
    "double_angle": [("trig_value_problem", 3.0), ("prove_identity", 2.0)],
    "triple_angle": [("trig_value_problem", 3.0), ("prove_identity", 2.0)],
    "argand": [("complex_modulus_problem", 2.0), ("complex_argument_problem", 2.0)],
    "cube_roots_unity": [("complex_modulus_problem", 2.0)],
    "square_root_complex": [("complex_modulus_problem", 3.0)],
    "circular_perm": [("permutation_problem", 3.0)],
    "pascal": [("binomial_expansion_problem", 2.0), ("binomial_coefficient_problem", 2.0)],
    "middle_term_binomial": [("binomial_expansion_problem", 3.0)],
    "infinite_gp": [("gp_infinite_sum_problem", 5.0)],
    "am_insertion": [("ap_nth_term_problem", 2.0)],
    "gm_insertion": [("gp_nth_term_problem", 2.0)],
    "special_sums": [("ap_sum_problem", 2.0)],
    "shifting_origin": [("line_equation_problem", 1.0)],
    "family_lines": [("line_equation_problem", 2.0)],
    "conic_general": [("parabola_vertex_problem", 1.0), ("circle_equation_problem", 1.0)],
    "ellipse_props": [("circle_equation_problem", 2.0)],
    "hyperbola_props": [("circle_equation_problem", 2.0)],
    "chord_tangent_conic": [("tangent_equation_problem", 2.0)],
}


def _detect_math_patterns(question: str) -> list:
    """Detect math-specific patterns in the question. Returns list of pattern names."""
    detected = []
    q_lower = question.lower()
    for pattern_name, patterns in _MATH_PATTERNS.items():
        for p in patterns:
            if re.search(p, q_lower, re.IGNORECASE):
                detected.append(pattern_name)
                break
    return detected


# ─────────────────────────────────────────────────────────────────────
# Class level detection
# ─────────────────────────────────────────────────────────────────────

def _detect_class_level(question: str) -> Optional[str]:
    """Detect class level from the question if mentioned."""
    q = question.lower()
    # "class 10", "class x", "class xii", etc.
    m = re.search(r'\bclass\s*(\d{1,2})\b', q)
    if m:
        return m.group(1)
    # Roman numerals
    roman = {"i": "1", "ii": "2", "iii": "3", "iv": "4", "v": "5",
             "vi": "6", "vii": "7", "viii": "8", "ix": "9", "x": "10",
             "xi": "11", "xii": "12"}
    m = re.search(r'\bclass\s+([ivx]+)\b', q)
    if m:
        return roman.get(m.group(1).lower())
    return None


# ─────────────────────────────────────────────────────────────────────
# Main routing function
# ─────────────────────────────────────────────────────────────────────

def route_question(question: str) -> RouteResult:
    """Route a free-text question to matching problem types.

    Returns a RouteResult with ranked matches.
    If no good match, sets needs_clarification=True.
    """
    if not question or not question.strip():
        return RouteResult(
            question=question or "",
            matches=[],
            needs_clarification=True,
            clarification_msg="Please type a question.",
        )

    q_lower = question.lower()
    # Clean words for matching (strip punctuation)
    q_words = set(re.sub(r'[^a-z0-9]', '', w) for w in q_lower.split())
    q_words.discard("")
    detected_patterns = _detect_math_patterns(question)
    class_level = _detect_class_level(question)

    # Build pattern boost map: pt_id → total boost from patterns
    pattern_boosts: dict = {}
    for pattern in detected_patterns:
        for pt_id, boost in _PATTERN_TO_PT.get(pattern, []):
            pattern_boosts[pt_id] = pattern_boosts.get(pt_id, 0) + boost

    # Build pattern penalty map: if pattern X detected, penalize certain pt_ids
    # This resolves conflicts (e.g. "distance between points" = coordinate, not speed)
    _PATTERN_PENALTIES: dict = {
        "coordinate_distance": [("speed_distance_time_problem", -5.0)],
        "midpoint": [("speed_distance_time_problem", -3.0), ("section_formula_problem", -1.0)],
        "section_formula": [("speed_distance_time_problem", -3.0), ("ratio_proportion_problem", -3.0)],
        "distance_3d": [("speed_distance_time_problem", -5.0), ("distance_formula_problem", -2.0)],
        "slope": [("speed_distance_time_problem", -2.0)],
        "line_equation": [("speed_distance_time_problem", -2.0)],
        "polynomial_division": [("divide_fractions", -5.0)],
        "fraction_divide": [("polynomial_division_problem", -3.0)],
        "sector": [("area_circle_problem", -2.0)],
        "arc_length": [("sector_area_problem", -3.0)],
        "percentage_of": [("find_percentage", -3.0)],
        "percentage_change": [("find_percentage", -3.0), ("find_percentage_of", -2.0)],
        "inverse_trig": [("trig_value_problem", -3.0)],
        "determinant": [("matrix_multiply_problem", -3.0), ("matrix_add_problem", -2.0), ("find_determinant", 0)],
        "matrix_skew_symmetric": [("matrix_multiply_problem", -5.0), ("matrix_add_problem", -3.0), ("determinant_problem", -2.0)],
        "matrix_symmetric": [("matrix_multiply_problem", -5.0), ("matrix_add_problem", -3.0), ("determinant_problem", -2.0)],
        "matrix_transpose": [("matrix_multiply_problem", -3.0), ("matrix_add_problem", -2.0)],
        "matrix_multiply": [("determinant_problem", -2.0), ("verify_skew_symmetric_problem", -2.0), ("verify_symmetric_problem", -2.0)],
        "matrix_add": [("determinant_problem", -2.0), ("verify_skew_symmetric_problem", -2.0), ("verify_symmetric_problem", -2.0)],
        "gp_infinite": [("gp_sum_problem", -3.0), ("gp_nth_term_problem", -3.0)],
        "weighted_mean": [("mean_problem", -3.0)],
        "prime_check": [("prime_factorization_problem", -2.0)],
        "prime_factor": [("check_prime", -2.0)],
        "max_height": [("rate_of_change", -3.0), ("find_critical_points", -1.0)],
        "critical_points": [("max_height", -2.0)],
        "diagonal": [("area_rectangle_problem", -2.0)],
        "median": [("max_min_optimization", -5.0), ("mean_problem", -2.0)],
        "mode": [("max_min_optimization", -5.0), ("mean_problem", -2.0)],
        "mean": [("max_min_optimization", -5.0), ("median_problem", -1.0), ("mode_problem", -1.0)],
        "sphere": [("circle_equation_problem", -3.0), ("area_circle_problem", -2.0)],
        "arithmetic": [("deriv_at_point", -5.0), ("binomial_probability_problem", -3.0)],
        "conditional_probability": [("basic_probability_problem", -3.0), ("binomial_probability_problem", -2.0)],
        "combination_committee": [("permutation_problem", -2.0)],
        "expand_expr": [("area_rectangle_problem", -5.0), ("area_circle_problem", -3.0), ("area_triangle_problem", -3.0)],
        "steepness": [("prove_identity", -5.0), ("max_min_optimization", -3.0)],
        "polynomial_zeros": [("profit_loss_problem", -5.0), ("solve_equation_problem", -1.0)],
        "ap_pattern": [("basic_arithmetic", -2.0)],
        "vertex_parabola": [("max_height", -5.0), ("find_critical_points", -2.0)],
        "diagonal_square": [("pythagoras_side_problem", -3.0), ("area_rectangle_problem", -3.0)],
        "differentiating": [("trig_value_problem", -5.0), ("inverse_trig_problem", -3.0)],
        "skew_symmetric_explicit": [("verify_symmetric_problem", -5.0), ("matrix_multiply_problem", -3.0), ("find_determinant", -1.0)],
        "projection_explicit": [("angle_between_vectors_problem", -3.0)],
        "determinant_of": [("verify_symmetric_problem", -3.0), ("verify_skew_symmetric_problem", -3.0), ("matrix_multiply_problem", -3.0)],
        "cone": [("volume_cylinder_problem", -3.0)],
        "hemisphere": [("volume_cylinder_problem", -3.0), ("volume_sphere_problem", -1.0)],
        "cuboid": [("volume_cube_problem", -3.0)],
        "mode": [("find_percentage", -3.0), ("max_min_optimization", -5.0)],
        "median": [("max_min_optimization", -5.0)],
        "ratio": [("profit_loss_problem", -2.0)],
        "circular_only": [("area_rectangle_problem", -3.0), ("area_triangle_problem", -2.0)],
        "cylinder_only": [("volume_hemisphere_problem", -4.0), ("volume_sphere_problem", -3.0), ("volume_cube_problem", -2.0), ("volume_cone_problem", -2.0)],
        "sphere_only": [("volume_cylinder_problem", -4.0), ("volume_hemisphere_problem", -3.0), ("volume_cone_problem", -3.0), ("volume_cube_problem", -2.0)],
        "cone_only": [("volume_cylinder_problem", -4.0), ("volume_hemisphere_problem", -3.0), ("volume_sphere_problem", -3.0), ("volume_cube_problem", -2.0)],
        "both_mean_median": [("mean_problem", -8.0), ("median_problem", -8.0), ("mode_problem", -5.0)],
        # New pattern penalties — prevent generic patterns from overriding specific ones
        "multiplication": [("matrix_multiply_problem", -5.0), ("find_determinant", -3.0), ("binomial_expansion_problem", -3.0), ("permutation_problem", -3.0), ("combination_problem", -3.0), ("function_composition_problem", -3.0)],
        "addition": [("matrix_add_problem", -5.0), ("find_determinant", -3.0), ("binomial_expansion_problem", -3.0), ("permutation_problem", -3.0), ("combination_problem", -3.0), ("set_operations_problem", -3.0), ("ap_sum_problem", -3.0), ("gp_sum_problem", -3.0)],
        "subtraction": [("matrix_add_problem", -5.0), ("find_determinant", -3.0), ("set_operations_problem", -3.0)],
        "division_op": [("polynomial_division_problem", -3.0), ("divide_fractions", -2.0)],
        "average": [("max_min_optimization", -3.0), ("median_problem", -1.0), ("mode_problem", -1.0)],
        "maximum_val": [("max_height", -3.0)],
        "minimum_val": [("max_height", -3.0)],
        "total_surface": [("volume_cube_problem", -1.0), ("volume_cuboid_problem", -1.0)],
        "gst": [("profit_loss_problem", -3.0), ("discount_problem", -2.0)],
        "banking": [("profit_loss_problem", -2.0), ("discount_problem", -2.0)],
        "shares": [("compound_interest_problem", -2.0), ("discount_problem", -2.0)],
        "cost_price": [("simple_interest_problem", -2.0), ("compound_interest_problem", -2.0)],
        "proportion": [("profit_loss_problem", -3.0)],
        "trig_identity": [("trig_value_problem", -2.0), ("heights_distances_problem", -3.0), ("inverse_trig_problem", -3.0)],
        "trig_equation": [("prove_identity", -2.0), ("heights_distances_problem", -3.0)],
        "compound_angle": [("heights_distances_problem", -3.0), ("inverse_trig_problem", -2.0)],
        "double_angle": [("heights_distances_problem", -3.0), ("inverse_trig_problem", -2.0)],
        "triple_angle": [("heights_distances_problem", -3.0), ("inverse_trig_problem", -2.0)],
        "area_between_curves": [("area_circle_problem", -3.0), ("area_triangle_problem", -3.0), ("area_rectangle_problem", -3.0)],
        "lpp_formulation": [("solve_equation_problem", -3.0)],
        "matrix_inverse": [("find_determinant", -2.0), ("matrix_multiply_problem", -3.0), ("matrix_add_problem", -2.0), ("verify_skew_symmetric_problem", -3.0), ("verify_symmetric_problem", -3.0)],
        "adjoint": [("matrix_multiply_problem", -2.0), ("matrix_add_problem", -2.0), ("verify_skew_symmetric_problem", -2.0), ("verify_symmetric_problem", -2.0)],
        "binomial_distribution": [("basic_probability_problem", -3.0), ("conditional_probability_problem", -2.0)],
        "bag_ball": [("binomial_probability_problem", -2.0)],
        "dice": [("binomial_probability_problem", -2.0), ("conditional_probability_problem", -1.0)],
        "nature_roots": [("solve_equation_problem", -2.0), ("polynomial_zeros_problem", -2.0)],
        "quadratic_word": [("polynomial_zeros_problem", -2.0), ("factor_polynomial_problem", -2.0)],
        "factor_theorem": [("polynomial_zeros_problem", -1.0), ("polynomial_division_problem", -1.0)],
        "remainder_theorem": [("factor_polynomial_problem", -1.0), ("polynomial_zeros_problem", -1.0)],
        "tangent_circle": [("tangent_equation_problem", 0)],
        "geometric_progression": [("ap_nth_term_problem", -3.0), ("ap_sum_problem", -3.0)],
        "infinite_gp": [("gp_sum_problem", -3.0), ("gp_nth_term_problem", -3.0), ("ap_nth_term_problem", -3.0), ("ap_sum_problem", -3.0)],
        "general_term": [],  # don't penalize — "nth term" and "sum" can coexist
        "inverse_trig_short": [("trig_value_problem", -3.0), ("heights_distances_problem", -3.0), ("prove_identity", -3.0)],
        "continuous": [("deriv_at_point", -2.0), ("find_limit", -2.0)],
        "rate_of_change_explicit": [("deriv_at_point", -1.0), ("find_critical_points", -1.0), ("tangent_equation_problem", -2.0)],
        "implicit_diff": [("trig_value_problem", -3.0)],
        "log_diff": [("trig_value_problem", -3.0)],
        "partial_fraction": [("definite_integral", -1.0)],
        "integration_by_parts": [("definite_integral", -1.0)],
        "integration_substitution": [("definite_integral", -1.0)],
        "section_3d": [("distance_3d_problem", -2.0), ("section_formula_problem", -2.0)],
        "grouped_data": [("standard_deviation_problem", -1.0)],
        "ogive_data": [("mean_problem", -1.0), ("mode_problem", -1.0)],
        "argand": [("trig_value_problem", -2.0)],
        "circular_perm": [("combination_problem", -2.0)],
        "ellipse_props": [("parabola_vertex_problem", -2.0)],
        "hyperbola_props": [("parabola_vertex_problem", -2.0)],
        "conic_general": [("parabola_vertex_problem", -1.0), ("circle_equation_problem", -1.0)],
    }

    pattern_penalties: dict = {}
    for pattern in detected_patterns:
        for pt_id, penalty in _PATTERN_PENALTIES.get(pattern, []):
            pattern_penalties[pt_id] = pattern_penalties.get(pt_id, 0) + penalty

    # Score each problem type
    scored = []
    for pt_id, pt in PROBLEM_TYPES.items():
        score = 0.0
        matched_kw = []

        # 1. Keyword overlap (weak signal)
        pt_kws = _PT_KEYWORDS.get(pt_id, set())
        overlap = q_words & pt_kws
        if overlap:
            score += len(overlap) * 0.3
            matched_kw.extend(list(overlap))

        # 2. Direct pattern mapping (STRONG signal)
        if pt_id in pattern_boosts:
            score += pattern_boosts[pt_id]
            for pattern in detected_patterns:
                for mapped_pt_id, _ in _PATTERN_TO_PT.get(pattern, []):
                    if mapped_pt_id == pt_id:
                        matched_kw.append(f"pattern:{pattern}")

        # 2b. Pattern penalties (reduce score for conflicting types)
        if pt_id in pattern_penalties:
            score += pattern_penalties[pt_id]

        # 3. Class level bonus
        if class_level and pt.class_level == class_level:
            score += 0.5
            matched_kw.append(f"class:{class_level}")

        # 4. Topic name direct match
        if pt.topic.lower() in q_lower:
            score += 1.0
            matched_kw.append(f"topic:{pt.topic}")

        # 5. Name partial match (strong signal)
        pt_name_lower = pt.name.lower()
        if pt_name_lower in q_lower:
            score += 2.0
            matched_kw.append(f"name:{pt.name}")

        if score > 0:
            # Normalize score to 0-1 range (cap at 6.0)
            normalized = min(score / 6.0, 1.0)
            scored.append((normalized, pt_id, matched_kw))

    # Sort by score descending
    scored.sort(key=lambda x: x[0], reverse=True)

    # Build RouterMatch objects for top matches
    matches = []
    for score, pt_id, matched_kw in scored[:5]:  # top 5
        pt = PROBLEM_TYPES[pt_id]
        match = RouterMatch(
            problem_type_id=pt_id,
            problem_type_name=pt.name,
            topic=pt.topic,
            class_level=pt.class_level,
            score=score,
            matched_keywords=matched_kw,
            variables_needed=_get_variables_needed(pt),
            formula_hint=_get_formula_hint(pt),
            thinking_question=_get_thinking(pt),
            example=pt.example,
        )
        matches.append(match)

    best = matches[0] if matches else None
    needs_clar = len(matches) == 0 or (best and best.score < 0.15)

    clar_msg = ""
    if needs_clar:
        if not matches:
            clar_msg = (
                "I couldn't identify the problem type from your question. "
                "Could you rephrase it, or browse the problem type catalog? "
                "Try including keywords like 'derivative', 'integral', 'area', "
                "'percentage', 'probability', 'matrix', etc."
            )
        else:
            clar_msg = (
                f"I'm not very confident about the match (best score: {best.score:.0%}). "
                "Please confirm if this is the right problem type, or rephrase your question."
            )

    return RouteResult(
        question=question,
        matches=matches,
        best_match=best,
        needs_clarification=needs_clar,
        clarification_msg=clar_msg,
    )


def get_variables_for_problem_type(pt_id: str) -> Optional[list]:
    """Get the list of variables a student needs to input for a specific problem type."""
    pt = PROBLEM_TYPES.get(pt_id)
    if pt is None:
        return None
    return _get_variables_needed(pt)


def get_formula_for_problem_type(pt_id: str) -> Optional[str]:
    """Get the formula/method hint for a specific problem type."""
    pt = PROBLEM_TYPES.get(pt_id)
    if pt is None:
        return None
    return _get_formula_hint(pt)
