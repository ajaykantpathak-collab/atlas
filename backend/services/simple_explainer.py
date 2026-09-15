"""simple_explainer.py -- authored simple-language explanations for the
top 40 classic confusion topics (explain-like-10).

For every classic "but WHY?" a CBSE student asks -- why minus x minus is
plus, why we divide by 100 for percent, why the divisor flips in fraction
division, why km/h to m/s is x5/18, BODMAS, x as an unknown box, HCF vs
LCM, area vs perimeter, mean vs median, distance vs displacement ... --
this module carries THREE authored variants:

  - ``simple``    2-3 sentences of everyday language (paratha / cricket /
                  auto-rickshaw / samosa analogies welcome);
  - ``hinglish``  the same explanation in romanised Hindi-English mix;
  - ``formal``    the textbook-grade wording.

Everything here is authored content -- no LLM calls, no network, fully
deterministic.  The matcher is keyword-based: phrases are matched as
normalized substrings of the question, optional regexes against the raw
lowercased text, best score wins (ties break alphabetically by id).

Serving:
  - ``find_explanation(question)`` -> the matched topic with the variant
    chosen by the student's own language (Hinglish in -> Hinglish out);
    used by the hint ladder -- level 1 checks this table FIRST and
    prefers the simple version (see /api/tutor-graph/hint).
  - ``teach_match(question)``      -> the same, but refuses to fire on
    computational questions, so it can guard the WHY-lane that runs
    before the solver in /api/tutor-graph/ask (teaching answers are
    authored text, never machine-verified numerics).
"""

from __future__ import annotations

import re
from typing import Any, Dict, List, Optional

from backend.services.tutor_voice import detect_hinglish

# --------------------------------------------------------------------- #
# normalization (same spirit as tutor_voice)
# --------------------------------------------------------------------- #
_TOKEN_RE = re.compile(r"[a-z0-9]+")


def _normalize(text: str) -> str:
    """Lowercase, keep alphanumerics, single-space.  'km/h to m/s' ->
    'km h to m s'; '5/18' -> '5 18'."""
    return " ".join(_TOKEN_RE.findall(str(text or "").lower()))


# --------------------------------------------------------------------- #
# the 40 authored topics
# --------------------------------------------------------------------- #
# phrases: matched (normalized) as substrings of the normalized question,
#          +2 each.  Keep them specific; phrases are re-normalized at
#          load so authoring sloppiness cannot break matching.
# regex:   optional raw-text (lowercased) patterns, +1 each.
_TOPIC_SPECS: List[Dict[str, Any]] = [

    # ----------------------------- maths ------------------------------ #
    {
        "id": "negative_times_negative",
        "topic": "Why negative x negative = positive",
        "subject": "maths",
        "phrases": ["minus into minus", "minus x minus", "minus times minus",
                    "minus multiplied by minus", "minus multiplied minus",
                    "negative into negative", "negative times negative",
                    "negative multiplied by negative", "minus ka minus",
                    "negative ka negative", "minus of minus",
                    "why negative negative positive", "why minus minus plus"],
        "regex": [r"\bminus\b[^.?!]{0,40}\bminus\b[^.?!]{0,40}\bpositive\b",
                  r"\bnegative\b[^.?!]{0,40}\bnegative\b[^.?!]{0,40}"
                  r"\bpositive\b"],
        "simple": "A negative number is like a backward step or a debt. "
                  "Multiplying by a negative means 'flip it', so a flipped "
                  "debt becomes money in your pocket. The flip of a backward "
                  "step is a forward step, which is why negative x negative "
                  "= positive.",
        "hinglish": "Negative number matlab udhaar ya peechhe ka kadam. "
                    "Minus se multiply karna matlab ulta karna -- udhaar "
                    "ulta hua toh jeb mein paisa aa gaya. Isliye minus x "
                    "minus = plus, pakka.",
        "formal": "Multiplication by a negative number is repeated "
                  "subtraction, so multiplying two negatives takes the "
                  "opposite of an opposite and restores the positive "
                  "direction: (-a) x (-b) = +ab.",
    },
    {
        "id": "percent_divide_100",
        "topic": "Why we divide by 100 for percent",
        "subject": "maths",
        "phrases": ["why divide by 100", "percent divide by 100",
                    "divide by 100 for percent", "divide by 100 percentage",
                    "divide by 100", "100 se divide", "percent mein 100",
                    "why 100 in percentage", "percentage mein 100",
                    "percent ka matlab", "what does percent mean",
                    "meaning of percent", "percent meaning",
                    "why multiply by 100 percentage",
                    "percentage why 100", "per cent means"],
        "regex": [r"\bwhy\b[^.?!]{0,30}\bpercent", r"per\s?cent\b",
                  r"\bdivid\w+\s+by\s+100\b[^.?!]{0,30}percent"],
        "simple": "'Per cent' literally means 'out of 100' -- cent is 100, "
                  "like a century in cricket. So 25% just means 25 out of "
                  "every 100, and dividing by 100 turns 'per 100' into the "
                  "real share. That is why 25% of 200 = 25/100 x 200 = 50.",
        "hinglish": "Percent ka matlab hi hai 'sau mein se' -- cricket ki "
                    "century jaisa, cent = 100. 25% matlab 25 har 100 mein "
                    "se. Isliye percent nikalte waqt 100 se divide karte "
                    "hain, bas yahi reason hai.",
        "formal": "A percentage is a fraction with denominator 100: x% = "
                  "x/100. To find x% of a quantity, multiply the quantity "
                  "by x/100.",
    },
    {
        "id": "fraction_division_flip",
        "topic": "Why the divisor flips in fraction division",
        "subject": "maths",
        "phrases": ["flip the divisor", "why flip the divisor",
                    "why do we flip", "invert the divisor",
                    "reciprocal of the divisor", "keep change flip",
                    "invert and multiply", "dividing by a fraction",
                    "divide by a fraction", "dividing fractions",
                    "divide fractions", "fraction division",
                    "fraction divide", "why flip the fraction",
                    "fraction ko ulta", "ulta karke multiply",
                    "bhinn ka bhag"],
        "regex": [r"\bdivid\w*\s+by\s+\d+\s*/\s*\d+"],
        "simple": "When you divide 10 by 2 you ask 'how many 2s fit in "
                  "10?'. Dividing by 1/2 asks 'how many halves fit?' -- and "
                  "twice as many halves fit as wholes, so the answer gets "
                  "bigger. That is why dividing by a fraction is the same "
                  "as multiplying by its upside-down (reciprocal).",
        "hinglish": "Divide ka matlab hai 'kitne aise tukde fit honge'. "
                    "Aadhe tukde (1/2) toh poore se zyada fit honge na -- "
                    "isliye fraction se divide karna uska ulta (reciprocal) "
                    "se multiply karne jaisa hi hai.",
        "formal": "Dividing by a number means multiplying by its "
                  "multiplicative inverse: a / (b/c) = a x (c/b). The "
                  "divisor is inverted because division asks how many of "
                  "that unit fit into the dividend.",
    },
    {
        "id": "kmh_to_ms",
        "topic": "Why km/h to m/s is x 5/18",
        "subject": "physics",
        "phrases": ["km h to m s", "km h into m s", "km h se m s",
                    "kmph to mps", "km per hour to m s",
                    "km per hour into m s",
                    "kilometres per hour to metres per second",
                    "kilometre per hour into metre per second",
                    "why 5 18", "multiply by 5 18", "why 18 5"],
        "regex": [r"\b5\s*/\s*18\b", r"\b18\s*/\s*5\b",
                  r"\bkm\s*/?\s*h\b[^.?!]{0,40}\bm\s*/?\s*s\b"],
        "simple": "1 km = 1000 m but 1 hour = 3600 seconds, so "
                  "1000/3600 = 5/18 -- that is the whole magic. The factor "
                  "only shrinks kilometres into metres and stretches hours "
                  "into seconds. Check: 72 km/h x 5/18 = 20 m/s.",
        "hinglish": "1 km = 1000 metre, par 1 ghanta = 3600 second. "
                    "1000/3600 = 5/18 hi wo jaadu ka number hai jo km/h ko "
                    "m/s banata hai. 72 km/h x 5/18 = 20 m/s, dekh lo.",
        "formal": "Since 1 km/h = 1000 m / 3600 s = 5/18 m/s, multiply a "
                  "speed in km/h by 5/18 to express it in m/s, and by 18/5 "
                  "for the reverse conversion.",
    },
    {
        "id": "bodmas",
        "topic": "BODMAS order of operations",
        "subject": "maths",
        "phrases": ["bodmas", "bomdas", "pemdas", "order of operations",
                    "rule of operations", "operations ka order",
                    "brackets first", "pehle bracket", "bracket ka rule",
                    "operation ka sahi order"],
        "regex": [],
        "simple": "Maths has a queue, like the line at a samosa stall -- "
                  "you cannot jump it. Brackets first, then powers, then "
                  "division/multiplication left to right, and addition/"
                  "subtraction at the end. Without the queue, 2 + 3 x 4 "
                  "could be 20 or 14 -- BODMAS fixes it at 14.",
        "hinglish": "Ganit mein bhi line lagti hai, jaise samose ki line -- "
                    "naam BODMAS. Pehle bracket, phir power, phir divide/"
                    "multiply (baaye se), sabse aakhir mein plus/minus. "
                    "Isliye 2 + 3 x 4 = 14 hota hai, 20 nahi.",
        "formal": "By the order of operations (BODMAS/PEMDAS), evaluate "
                  "Brackets, then Orders (powers and roots), then Division "
                  "and Multiplication left to right, then Addition and "
                  "Subtraction left to right.",
    },
    {
        "id": "unknown_x",
        "topic": "Why we use x in equations",
        "subject": "maths",
        "phrases": ["why do we use x", "why x used", "why is x used",
                    "x ka matlab", "x ka kya matlab", "what does x mean",
                    "why the letter x", "why letter x", "x in algebra",
                    "x in equations", "what is a variable",
                    "variable kya hota", "variable kya hai",
                    "why alphabets in maths", "why letters in maths",
                    "x ka kya use"],
        "regex": [],
        "simple": "x is just a mystery box -- a number hiding inside. An "
                  "equation like x + 3 = 7 says 'the box plus 3 makes 7', "
                  "so you open the box by undoing: 7 - 3 = 4. Any letter "
                  "could do the job; x is simply the classic name.",
        "hinglish": "x koi mushkil cheez nahi -- bas ek paheli wala dabba "
                    "hai jisme number chhupa hai. x + 3 = 7 matlab 'dabbe + "
                    "3 = 7', toh ulta karke kholo: 7 - 3 = 4. x ki jagah "
                    "koi bhi letter chalega yaar.",
        "formal": "In an equation, a variable (commonly written x) is a "
                  "symbol standing for an unknown quantity; solving the "
                  "equation means finding every value that makes the "
                  "equality true.",
    },
    {
        "id": "hcf_vs_lcm",
        "topic": "HCF vs LCM",
        "subject": "maths",
        "phrases": ["hcf and lcm", "hcf aur lcm", "lcm and hcf",
                    "hcf vs lcm", "lcm vs hcf", "hcf lcm difference",
                    "difference between hcf", "difference between lcm",
                    "hcf ya lcm", "hcf or lcm", "hcf kya hai",
                    "lcm kya hai", "what is hcf", "what is lcm",
                    "hcf meaning", "lcm meaning",
                    "when to use hcf", "when to use lcm",
                    "highest common factor and", "least common multiple"],
        "regex": [],
        "simple": "HCF asks 'what is the biggest number that divides both?' "
                  "-- it cuts things down, like sharing a paratha into the "
                  "largest equal pieces. LCM asks 'where do both first meet "
                  "together?' -- it builds things up, like two buses leaving "
                  "together and meeting again. Remember: HCF = factor "
                  "(small or equal), LCM = multiple (big).",
        "hinglish": "HCF poochta hai 'dono ko baarabar baantne wala sabse "
                    "bada hissa kaunsa?' -- paratha barabar tukdon mein "
                    "baantne jaisa. LCM poochta hai 'dono ki pehli common "
                    "stop kahan hai?' -- do bus ek saath chhod ke phir kahan "
                    "milti hain. Yaad rakho: HCF factor (chhota), LCM "
                    "multiple (bada).",
        "formal": "The HCF (highest common factor) is the largest integer "
                  "that divides all the given numbers; the LCM (least "
                  "common multiple) is the smallest positive integer "
                  "divisible by all of them.",
    },
    {
        "id": "area_vs_perimeter",
        "topic": "Area vs perimeter",
        "subject": "maths",
        "phrases": ["area and perimeter", "perimeter and area",
                    "area vs perimeter", "perimeter vs area",
                    "difference between area", "difference between perimeter",
                    "area ya perimeter", "area or perimeter",
                    "area perimeter difference", "area kya hai",
                    "perimeter kya hai", "when to use area",
                    "when to use perimeter", "what is perimeter",
                    "area aur perimeter"],
        "regex": [],
        "simple": "Perimeter is the walk around the boundary -- the fence "
                  "of a cricket field. Area is the grass inside the fence -- "
                  "how much carpet would cover the ground. Fence means "
                  "perimeter (plain metres of rope), grass means area "
                  "(square metres).",
        "hinglish": "Perimeter matlab boundary ke charo taraf ka chakkar -- "
                    "maidan ki fencing. Area matlab andar ka ghaas wala "
                    "hissa -- kitni carpet poori zameen dhak legi. Fencing "
                    "= perimeter (metre), carpet = area (square metre).",
        "formal": "Perimeter is the total length of a figure's boundary, "
                  "measured in units of length; area measures the region "
                  "enclosed by the boundary, in square units.",
    },
    {
        "id": "mean_vs_median",
        "topic": "Mean vs median",
        "subject": "maths",
        "phrases": ["mean and median", "median and mean", "mean vs median",
                    "median vs mean", "difference between mean",
                    "difference between median", "mean ya median",
                    "mean or median", "mean median mode",
                    "average and median", "median kya hai",
                    "mean kya hota", "when to use median", "why median",
                    "mean aur median"],
        "regex": [],
        "simple": "Mean means 'share it equally' -- pool everyone's pocket "
                  "money and split it. Median means 'stand in a line -- who "
                  "is exactly in the middle?'. One billionaire in the line "
                  "drags the mean up, but the median does not care, which "
                  "is why income news usually quotes the median.",
        "hinglish": "Mean matlab 'sabki pocket money jodo aur barabar "
                    "baanto'. Median matlab 'line mein khado -- beech wala "
                    "kaun?'. Ek ameer aadmi mean ko upar kheench leta hai, "
                    "par median ko farak nahi padta.",
        "formal": "The mean is the sum of the values divided by their "
                  "count; the median is the middle value of the ordered "
                  "data and is robust to outliers.",
    },
    {
        "id": "divide_by_zero",
        "topic": "Why we never divide by zero",
        "subject": "maths",
        "phrases": ["divide by zero", "dividing by zero", "division by zero",
                    "divide by 0", "divided by 0", "zero se divide",
                    "zero se bhag", "why not divide by zero",
                    "why can t divide by zero", "why cannot divide by zero"],
        "regex": [r"\bdivid\w*\s+by\s+zero"],
        "simple": "6 / 2 asks 'how many 2s make 6?' -- three. 6 / 0 asks "
                  "'how many zeros make 6?' -- no number of zeros will ever "
                  "build a 6, so the question has no answer. That is why "
                  "the calculator shows an error instead of a number.",
        "hinglish": "6 / 2 poochta hai 'kitne 2 jodne se 6 banta hai?' -- "
                    "teen. 6 / 0 poochta hai 'kitne zero jodne se 6 banta "
                    "hai?' -- kitne bhi zero jodo, kabhi 6 nahi banega. "
                    "Isliye calculator error dikhata hai.",
        "formal": "Division by zero is undefined: there is no number c "
                  "with 0 x c = 6, so a/0 has no value (and 0/0 is "
                  "indeterminate).",
    },
    {
        "id": "zero_power",
        "topic": "Why a^0 = 1",
        "subject": "maths",
        "phrases": ["to the power 0", "to the power zero", "power zero",
                    "power of zero", "zero power", "exponent zero",
                    "power 0 is 1", "x ki power 0", "power 0 kyu"],
        "regex": [r"\^0\b",
                  r"(power|exponent)\s*(of\s+)?(zero|0)\b"],
        "simple": "Watch the pattern: 2^4 = 16, 2^3 = 8 -- every step down "
                  "divides by 2. Keep going: 2^2 = 4, 2^1 = 2, so 2^0 must "
                  "be 2 / 2 = 1. Every number (except 0) lands on 1 the "
                  "same way.",
        "hinglish": "Pattern dekho: 2^4 = 16, 2^3 = 8 -- har neeche wala "
                    "step divide by 2 hai. Aage badho: 2^2 = 4, 2^1 = 2, "
                    "toh 2^0 = 2/2 = 1 hi hoga. Har number aise hi 1 pe "
                    "pahunchta hai.",
        "formal": "Using the law a^m / a^n = a^(m-n) with m = n gives a^0 "
                  "= 1 for a is not 0; equivalently the empty product "
                  "equals the multiplicative identity.",
    },
    {
        "id": "square_of_sum",
        "topic": "Why (a+b)^2 is not a^2 + b^2",
        "subject": "maths",
        "phrases": ["a plus b whole square", "a b whole square",
                    "x plus y whole square", "whole square formula",
                    "square of a sum", "square of sum",
                    "a plus b ka square", "a b ka whole square",
                    "expansion of a b", "whole square kya",
                    "a plus b whole squared"],
        "regex": [r"\(\s*a\s*\+\s*b\s*\)\s*[\^\u00b2]",
                  r"\(\s*x\s*\+\s*y\s*\)\s*[\^\u00b2]",
                  r"\bwhole\s+square"],
        "simple": "(a + b)^2 squares the WHOLE packet, not the items "
                  "separately. Picture a square of side (a + b): it splits "
                  "into a^2, b^2 AND two rectangles of a x b -- the middle "
                  "term is real. That is why (a+b)^2 = a^2 + 2ab + b^2, "
                  "never just a^2 + b^2.",
        "hinglish": "(a + b)^2 matlab poore dabbe ka square, alag alag "
                    "nahi. Side (a+b) wala bana square socho -- usme a^2, "
                    "b^2 aur do a x b rectangle aate hain. Isliye (a+b)^2 = "
                    "a^2 + 2ab + b^2, kabhi sirf a^2 + b^2 nahi.",
        "formal": "Squaring a binomial expands by distribution: (a + b)^2 = "
                  "a^2 + 2ab + b^2; the cross term 2ab arises because each "
                  "term of the first bracket multiplies each term of the "
                  "second.",
    },
    {
        "id": "index_laws",
        "topic": "Index laws: when powers add vs multiply",
        "subject": "maths",
        "phrases": ["index law", "laws of indices", "indices rules",
                    "index rules", "laws of exponents", "exponent rules",
                    "power law", "product law", "power ke rule",
                    "when to add powers", "when to multiply powers",
                    "a power m into a power n"],
        "regex": [r"\ba\s*\^\s*m\b", r"\(\s*a\s*\^\s*m\s*\)\s*\^"],
        "simple": "a^3 x a^2 means (a x a x a) x (a x a) -- count the a's: "
                  "five, so a^5; multiplying makes you ADD the powers. But "
                  "(a^3)^2 means 'a^3 twice' = six a's, so there you "
                  "MULTIPLY the powers. Different jobs, different rules.",
        "hinglish": "a^3 x a^2 matlab teen a ke saath do a aur -- gino, "
                    "paanch a, matlab a^5 (powers ADD hoti hain). (a^3)^2 "
                    "matlab 'a^3 do baar' = chhe a, matlab powers MULTIPLY. "
                    "Kaam alag, rule alag.",
        "formal": "For exponents, a^m x a^n = a^(m+n) (product law) while "
                  "(a^m)^n = a^(mn) (power law); counting the repeated "
                  "factors shows which law applies.",
    },
    {
        "id": "percent_base",
        "topic": "Profit % is always on cost price",
        "subject": "maths",
        "phrases": ["profit percent on which", "profit percentage on which",
                    "on cost price or selling price", "on cp or sp",
                    "profit on cp or sp", "profit on cost price or",
                    "calculated on cost price", "calculated on selling price",
                    "profit percent base", "base of profit percentage",
                    "loss percent on which", "loss percentage on which",
                    "profit percent kaise", "profit percent of which price"],
        "regex": [r"\bprofit\b[^.?!]{0,40}\b(cost|selling)\s+price\b",
                  r"\bprofit\b[^.?!]{0,20}\b(cp|sp)\b"],
        "simple": "Profit % is always counted on the cost price -- the "
                  "shopkeeper's own spend is the base, just like your exam "
                  "percentage is counted on total marks. Buy at 80, sell at "
                  "100: the profit is 20, but 20/80 = 25% profit, not 20%.",
        "hinglish": "Profit % hamesha cost price (apna kharcha) pe count "
                    "hoti hai -- jaise exam mein percentage total marks pe "
                    "banti hai. 80 mein kharida, 100 mein becha: profit 20, "
                    "par 20/80 = 25% profit hai, 20% nahi.",
        "formal": "Percentage change is measured on the original base "
                  "value: profit% = (SP - CP)/CP x 100; using SP as the "
                  "base is the classic error.",
    },
    {
        "id": "transposition_sign",
        "topic": "Why the sign flips across the equals sign",
        "subject": "maths",
        "phrases": ["change the sign", "sign change when", "sign changes when",
                    "move to the other side", "moving to the other side",
                    "take to the other side", "taking to the other side",
                    "other side of the equation", "other side of the equals",
                    "other side of equal to", "transpose", "transposing",
                    "sign badal", "sign kyu badal", "sign change kyu"],
        "regex": [],
        "simple": "Moving a term across the = sign is like walking through "
                  "a mirror -- everything flips: plus becomes minus. The "
                  "real rule is that the balance must stay level, and "
                  "flipping sides is just doing the same undo to both "
                  "sides. x + 3 = 7 becomes x = 7 - 3.",
        "hinglish": "= ke us paar bhejne ka matlab hai sheeshe se guzarna -- "
                    "sab ulta: plus ban jaata minus. Asli rule ye hai ki "
                    "taraju barabar rehna chahiye. x + 3 = 7 mein 3 ko paar "
                    "bhejo toh x = 7 - 3.",
        "formal": "Transposing applies the same inverse operation to both "
                  "sides of the equation, so a term changing sides changes "
                  "sign: x + a = b gives x = b - a.",
    },
    {
        "id": "pi_meaning",
        "topic": "What pi really is",
        "subject": "maths",
        "phrases": ["what is pi", "pi kya hai", "pi ka matlab",
                    "meaning of pi", "pi meaning", "why pi",
                    "value of pi", "pi 22 7", "pi vs 22 7", "why 22 7",
                    "pi definition", "how is pi"],
        "regex": [r"\bpi\b[^.?!]{0,20}\b(22|3\.14)"],
        "simple": "Take ANY circle -- bangle, pizza, wheel -- and wrap a "
                  "thread around it: that length (circumference) is always "
                  "a bit more than 3 times the straight-across length "
                  "(diameter). That 'bit more than 3' is pi, about 3.14159. "
                  "Pi is not a weird invention; it is every circle's fixed "
                  "ratio.",
        "hinglish": "Koi bhi gol cheez lo -- chudi, pizza, pahiya -- uska "
                    "gher naapo: wo hamesha seedhe across (diameter) ke "
                    "theek 3 se thoda zyada hoga. Wahi 'thoda zyada' pi "
                    "hai, kareeb 3.14159. Pi koi upaj nahi, har circle ka "
                    "pakka ratio hai.",
        "formal": "Pi is the constant ratio of a circle's circumference to "
                  "its diameter, C = pi x d, approximately 3.14159, and it "
                  "is the same for every circle.",
    },
    {
        "id": "fraction_common_denominator",
        "topic": "Why fractions need a common denominator",
        "subject": "maths",
        "phrases": ["common denominator", "same denominator",
                    "why lcm to add fractions", "adding fractions with different",
                    "add fractions with different", "denominator same kyu",
                    "why need same denominator", "lcm of denominators",
                    "fraction add karne", "fractions add kaise",
                    "different denominators"],
        "regex": [r"\badd\w*\s+fractions\b"],
        "simple": "You cannot add 3 rupees and 3 dollars straight -- the "
                  "units differ. 1/2 + 1/3 is adding halves to thirds: "
                  "different-sized pieces. Rename both into sixths (same "
                  "unit) and the pieces add cleanly: 3/6 + 2/6 = 5/6.",
        "hinglish": "3 rupaye aur 3 dollar seedhe add nahi hote -- unit "
                    "alag hai. 1/2 + 1/3 mein aadhai aur tihai alag size ke "
                    "tukde hain. Dono ko chhathai (6) mein badlo, phir "
                    "seedha jod do: 3/6 + 2/6 = 5/6.",
        "formal": "Fractions add by counting equal units, so they must "
                  "share a denominator: a/b + c/d = (ad + cb)/bd, usually "
                  "via the LCM of the denominators.",
    },
    {
        "id": "prime_one",
        "topic": "Why 1 is not prime",
        "subject": "maths",
        "phrases": ["1 not a prime", "1 is not prime", "one not prime",
                    "is 1 prime", "is one prime", "1 prime kyu nahi",
                    "1 prime kyun nahi", "ek prime kyu nahi",
                    "why is 1 not", "1 a prime number", "1 prime hai"],
        "regex": [r"\bis\s+(1|one)\s+(a\s+)?prime\b"],
        "simple": "A prime needs exactly two gatekeepers: 1 and itself. The "
                  "number 1 has only ONE gatekeeper (itself), so it misses "
                  "the definition. Primes are the building blocks of "
                  "multiplication, and 1 builds nothing new.",
        "hinglish": "Prime ke paas exactly do chaukidar hone chahiye: 1 "
                    "aur khud. 1 ke paas sirf EK chaukidar hai (khud hi) -- "
                    "isliye wo prime nahi hai. Prime multiplication ke "
                    "building blocks hain, aur 1 kuch naya banata hi nahi.",
        "formal": "A prime number has exactly two distinct positive "
                  "divisors, 1 and itself; 1 has only one divisor, so it is "
                  "neither prime nor composite.",
    },
    {
        "id": "simple_vs_compound_interest",
        "topic": "Simple vs compound interest",
        "subject": "maths",
        "phrases": ["simple and compound interest", "compound and simple interest",
                    "difference between simple interest",
                    "difference between compound interest",
                    "simple interest vs compound", "compound vs simple",
                    "simple ya compound", "si and ci difference",
                    "ci and si difference", "si ci difference",
                    "why compound interest more", "compound interest alag"],
        "regex": [r"\bsimple\s+interest\b[^.?!]{0,40}\bcompound\b",
                  r"\bcompound\s+interest\b[^.?!]{0,40}\bsimple\b"],
        "simple": "Simple interest pays only on the original amount -- like "
                  "a fixed salary every year. Compound interest pays on the "
                  "amount including past interest -- like interest that "
                  "starts earning its own interest, a snowball rolling "
                  "downhill. Same rate, compound always ends higher.",
        "hinglish": "Simple interest sirf asli rakam pe milta hai -- har "
                    "saal fixed salary jaisa. Compound interest mein purane "
                    "interest pe bhi interest milta hai -- golu gend ki "
                    "tarah badhta jaata hai. Same rate pe compound hamesha "
                    "zyada dega.",
        "formal": "Simple interest is computed only on the principal (SI = "
                  "PRT/100); compound interest is computed on principal "
                  "plus accumulated interest, A = P(1 + R/100)^n.",
    },

    # ---------------------------- physics ----------------------------- #
    {
        "id": "distance_vs_displacement",
        "topic": "Distance vs displacement",
        "subject": "physics",
        "phrases": ["distance and displacement", "displacement and distance",
                    "distance vs displacement", "displacement vs distance",
                    "difference between distance", "difference between displacement",
                    "distance ya displacement", "distance kya hai",
                    "displacement kya hai", "why displacement zero",
                    "distance displacement antar", "antar distance displacement"],
        "regex": [],
        "simple": "Run one full lap of a 400 m track: distance = 400 m, but "
                  "you finish where you started, so displacement = 0. "
                  "Distance counts ALL the walking, like an auto-rickshaw's "
                  "meter; displacement is just the straight arrow from "
                  "start to finish. Distance is a plain number; "
                  "displacement carries a direction.",
        "hinglish": "400 m ka ek full chakkar lagao: distance = 400 m, par "
                    "wapas wahi pe aa gaye, toh displacement = 0. Distance "
                    "saari chalee ginti mein (auto ka meter), displacement "
                    "sirf seedha teer start se end tak -- direction ke "
                    "saath.",
        "formal": "Distance is the total path length travelled, a scalar; "
                  "displacement is the straight-line vector from initial to "
                  "final position, and it is zero for a closed path.",
    },
    {
        "id": "speed_vs_velocity",
        "topic": "Speed vs velocity",
        "subject": "physics",
        "phrases": ["speed and velocity", "velocity and speed",
                    "speed vs velocity", "velocity vs speed",
                    "difference between speed", "difference between velocity",
                    "speed ya velocity", "speed kya hai", "velocity kya hai",
                    "speed velocity antar", "antar speed velocity"],
        "regex": [],
        "simple": "Speed only says how fast the meter is running; velocity "
                  "also says WHICH WAY the auto is going. '40 km/h' is a "
                  "speed; '40 km/h towards the railway station' is a "
                  "velocity. Turn the auto around at the same fast pace: "
                  "speed stays the same, but velocity flips.",
        "hinglish": "Speed sirf batati hai kitni raftaar; velocity ye bhi "
                    "batati hai KIS DISHA mein. '40 km/h' speed hai; '40 "
                    "km/h station ki taraf' velocity hai. Same speed se "
                    "palat gaye toh speed wahi, velocity ulti ho gayi.",
        "formal": "Speed is the rate of covering distance, a scalar; "
                  "velocity is the rate of change of displacement, a vector "
                  "with both magnitude and direction.",
    },
    {
        "id": "mass_vs_weight",
        "topic": "Mass vs weight",
        "subject": "physics",
        "phrases": ["mass and weight", "weight and mass", "mass vs weight",
                    "weight vs mass", "difference between mass",
                    "difference between weight", "mass ya weight",
                    "mass kya hai", "weight kya hai", "mass weight antar",
                    "antar mass weight", "weight on moon",
                    "weight on the moon", "moon weight", "why weight changes"],
        "regex": [],
        "simple": "Mass is how much stuff is in you -- the same on Earth, "
                  "the Moon, anywhere. Weight is how hard gravity pulls "
                  "that stuff -- the Moon's weak pull makes you weigh about "
                  "1/6, though your mass never changed. kg measures mass; "
                  "weight is measured in newtons.",
        "hinglish": "Mass matlab tumhare andar kitna maal hai -- Earth ho "
                    "ya Moon, utna hi. Weight matlab gravity kitni zor se "
                    "kheench raha hai -- Moon ki kamzor kheenchan se wajan "
                    "1/6 reh jaata hai, par mass wahi. kg mass ka unit hai, "
                    "weight ka newton.",
        "formal": "Mass (kg) measures the quantity of matter and is "
                  "invariant; weight is the gravitational force acting on "
                  "it, W = mg in newtons, varying with g.",
    },
    {
        "id": "conventional_current",
        "topic": "Conventional current vs electron flow",
        "subject": "physics",
        "phrases": ["conventional current", "current flows from positive",
                    "current flow from positive", "flow from positive to negative",
                    "positive to negative", "electron flow opposite",
                    "direction of current", "current ki disha",
                    "which way current flows", "why current flows positive",
                    "current plus se minus", "electron aur current"],
        "regex": [],
        "simple": "Long before electrons were discovered, scientists "
                  "guessed current flows from + to - and built all the "
                  "rules on that guess. Later we learned electrons actually "
                  "drift the opposite way, but nobody wanted to redraw "
                  "every book -- so both are kept. In problems, use the old "
                  "convention: + terminal to - terminal outside the battery.",
        "hinglish": "Electron milne se pehle hi scientists ne maan liya tha "
                    "current + se - behta hai, saare rules usi pe bane. "
                    "Baad mein pata chala electron ulti disha mein chalta "
                    "hai, par sab dobara likhna nahi tha -- dono chalte "
                    "hain. Sums mein convention: + se -, battery ke bahar.",
        "formal": "Conventional current is defined to flow from the "
                  "positive to the negative terminal in the external "
                  "circuit, while electrons physically drift the opposite "
                  "way; circuit analysis uses the conventional direction.",
    },
    {
        "id": "series_vs_parallel",
        "topic": "Series vs parallel circuits",
        "subject": "physics",
        "phrases": ["series and parallel", "parallel and series",
                    "series vs parallel", "parallel vs series",
                    "difference between series", "difference between parallel",
                    "series ya parallel", "series circuit kya",
                    "parallel circuit kya", "why parallel at home",
                    "home wiring parallel", "series mein kya hota"],
        "regex": [],
        "simple": "Series is one narrow lane -- the same current must pass "
                  "through every bulb, and one dead bulb switches the whole "
                  "street off. Parallel gives each bulb its own lane from "
                  "the main road, which is why home wiring is parallel: one "
                  "fan off does not kill the lights.",
        "hinglish": "Series ek hi tang gali hai -- same current har bulb se "
                    "guzarta hai, ek bulb gaya toh poori line gayi. "
                    "Parallel mein har bulb ko sadak se apni gali milti "
                    "hai -- ghar ki wiring isiliye parallel hoti hai.",
        "formal": "In series, components share one path (same current, "
                  "voltages add); in parallel they share two common nodes "
                  "(same voltage, currents add), which is why domestic "
                  "wiring is parallel.",
    },
    {
        "id": "voltage_vs_current",
        "topic": "Voltage vs current",
        "subject": "physics",
        "phrases": ["voltage and current", "current and voltage",
                    "voltage vs current", "current vs voltage",
                    "difference between voltage", "voltage ya current",
                    "voltage kya hota", "voltage kya hai", "current kya hota",
                    "voltage current antar", "antar voltage current",
                    "what is voltage", "voltage meaning",
                    "voltage aur current"],
        "regex": [],
        "simple": "Voltage is the push, current is the flow. Think of a "
                  "water tank on the roof: the height of the tank is the "
                  "voltage, the litres per second through the pipe is the "
                  "current. A thin pipe (high resistance) can have full "
                  "push yet only a trickle.",
        "hinglish": "Voltage dhakka hai, current behav hai. Chhat wali "
                    "tanki socho: tanki ki height voltage, pipe mein "
                    "litre-per-second current. Patli pipe (zyada "
                    "resistance) -- poora dhakka, phir bhi kam paani.",
        "formal": "Voltage (potential difference, in volts) is the work "
                  "per unit charge that drives charge; current (amperes) is "
                  "the rate of charge flow, and they relate through V = IR.",
    },
    {
        "id": "zero_work",
        "topic": "Why work can be zero in physics",
        "subject": "physics",
        "phrases": ["zero work", "work done zero", "work is zero",
                    "no work done", "work done is zero", "why work zero",
                    "work kyu zero", "work zero kyu", "carrying a bag work",
                    "holding a bag", "work in physics", "physics work meaning",
                    "work done kya hota"],
        "regex": [],
        "simple": "Physics 'work' needs movement in the direction of the "
                  "force. Stand holding a heavy school bag -- arms shaking, "
                  "but nothing moves, so work = 0. Walk on flat ground with "
                  "it and the work is still 0, because the force is up but "
                  "the motion is forward.",
        "hinglish": "Physics ka 'work' tabhi hota hai jab kuch idhar-udhar "
                    "hilta hai. School bag utha ke khade raho -- haath kaanp "
                    "rahe hain, par displacement zero, toh work = 0. Bag "
                    "utha ke seedhi sadak pe chalna bhi zero, kyunki force "
                    "upar aur chalna aage.",
        "formal": "W = F s cos(theta); with zero displacement, or force "
                  "perpendicular to the displacement (theta = 90 degrees), "
                  "the work done is zero.",
    },
    {
        "id": "inertia_bus",
        "topic": "Why we lurch when a bus brakes",
        "subject": "physics",
        "phrases": ["what is inertia", "inertia kya", "inertia ka matlab",
                    "why do we fall", "fall forward", "fall backward",
                    "fall forwards", "fall backwards", "bus brake",
                    "bus brakes", "bus stops suddenly", "bus starts suddenly",
                    "passengers fall", "newton first law"],
        "regex": [],
        "simple": "Your body hates changing speed -- that laziness is "
                  "inertia. When the bus brakes, your feet stop with the "
                  "floor but your body keeps trying to move forward, so you "
                  "lurch ahead. When the bus suddenly speeds up, the "
                  "opposite happens and you fall back.",
        "hinglish": "Tumhara body speed badalne ko deta hi nahi -- ye "
                    "sustai inertia hai. Bus brake maare toh pair ruk "
                    "jaate hain, par body aage hi jaana chahti hai, isliye "
                    "aage girte ho. Bus achanak chadhe toh ulta, peeche.",
        "formal": "By Newton's first law the body retains its velocity "
                  "when the bus decelerates; the feet are constrained with "
                  "the bus while the torso continues forward, so passengers "
                  "lurch forward.",
    },

    # --------------------------- chemistry ---------------------------- #
    {
        "id": "atom_vs_molecule",
        "topic": "Atom vs molecule",
        "subject": "chemistry",
        "phrases": ["atom and molecule", "molecule and atom",
                    "atom vs molecule", "molecule vs atom",
                    "difference between atom", "difference between molecule",
                    "atom ya molecule", "atom kya hota", "atom kya hai",
                    "molecule kya hota", "atom molecule antar",
                    "antar atom molecule"],
        "regex": [],
        "simple": "An atom is one single Lego block; a molecule is two or "
                  "more blocks clicked together. O is one atom; O2 is two "
                  "oxygen atoms holding hands -- and that is the air you "
                  "breathe. Molecules are made of atoms the way words are "
                  "made of letters.",
        "hinglish": "Atom ek akela Lego block hai; molecule do ya zyada "
                    "block jude hue. O ek atom hai; O2 do oxygen atom haath "
                    "pakde hue -- wahi hawa hai. Molecule atoms se banta "
                    "hai, jaise shabd aksharon se.",
        "formal": "An atom is the smallest unit of an element; a molecule "
                  "is an electrically neutral group of two or more atoms "
                  "bonded together, such as O2, H2O or CO2.",
    },
    {
        "id": "physical_vs_chemical_change",
        "topic": "Physical vs chemical change",
        "subject": "chemistry",
        "phrases": ["physical and chemical change",
                    "chemical and physical change",
                    "physical vs chemical", "chemical vs physical",
                    "difference between physical", "difference between chemical",
                    "physical ya chemical", "physical change kya",
                    "chemical change kya", "physical chemical antar",
                    "antar physical chemical"],
        "regex": [],
        "simple": "A physical change only re-dresses the substance -- ice "
                  "melting, dough being rolled -- usually undoable, and it "
                  "is still the same stuff. A chemical change cooks up a "
                  "NEW substance with new properties -- paratha toasted "
                  "brown, iron rusting, milk curdling -- and you cannot "
                  "un-toast a paratha.",
        "hinglish": "Physical change mein cheez ka dress badalta hai -- ice "
                    "pighli, atta bela -- wahi cheez, wapas ho sakta hai. "
                    "Chemical change mein NAYI cheez ban jaati hai -- "
                    "bhura paratha, rust lag loha, phata doodh -- ab ye "
                    "ulta nahi hota.",
        "formal": "A physical change alters shape or state without forming "
                  "new substances; a chemical change forms new substances "
                  "with different properties and is usually not easily "
                  "reversible.",
    },
    {
        "id": "exothermic_endothermic",
        "topic": "Exothermic vs endothermic",
        "subject": "chemistry",
        "phrases": ["exothermic", "endothermic", "exothermic and endothermic",
                    "endothermic and exothermic", "exothermic vs endothermic",
                    "endothermic vs exothermic", "exothermic ya endothermic",
                    "exothermic kya", "endothermic kya", "exothermic meaning",
                    "endothermic meaning"],
        "regex": [],
        "simple": "Exothermic reactions GIVE heat out -- the container "
                  "feels hot, like burning LPG or quicklime plus water. "
                  "Endothermic ones EAT heat from their surroundings -- the "
                  "container feels cold. Trick: exo = exit (heat leaves), "
                  "endo = enter (heat enters the reaction).",
        "hinglish": "Exothermic garmi BAHAR phenkta hai -- bartan garam ho "
                    "jaata hai (LPG jalna, chuna paani mein). Endothermic "
                    "garmi KHA jaata hai -- bartan thanda lagta hai. Trick "
                    "yaad rakho: exo = exit, endo = enter.",
        "formal": "Exothermic reactions release energy to the surroundings "
                  "(delta-H negative); endothermic reactions absorb energy "
                  "from the surroundings (delta-H positive).",
    },
    {
        "id": "acid_vs_base_ph",
        "topic": "Acid vs base and the pH scale",
        "subject": "chemistry",
        "phrases": ["acid and base", "base and acid", "acids and bases",
                    "acid vs base", "base vs acid", "acid ya base",
                    "acid base difference", "difference between acid",
                    "acid kya hota", "acid kya hai", "base kya hota",
                    "ph scale", "what is ph", "ph kya", "ph value",
                    "why is lemon sour", "lemon sour"],
        "regex": [],
        "simple": "Acids taste sour like nimbu and tamarind; bases are "
                  "bitter and slippery like soap. On the pH ruler, below 7 "
                  "is acid, above 7 is base, and exactly 7 (pure water) is "
                  "neutral. Acids and bases cancel each other into salt "
                  "plus water, like two opponents balancing out.",
        "hinglish": "Acid khatta hota hai -- nimbu, imli. Base kadwa aur "
                    "phisalta hua -- sabun, meetha soda. pH wali hadi mein: "
                    "7 se neeche acid, 7 se upar base, theek 7 (paani) "
                    "neutral. Dono milkar salt + paani bana dete hain.",
        "formal": "Acids are proton (H+) donors forming solutions of pH "
                  "below 7; bases are proton acceptors or OH- donors with "
                  "pH above 7; neutralisation yields salt and water.",
    },
    {
        "id": "mole_meaning",
        "topic": "What a mole in chemistry means",
        "subject": "chemistry",
        "phrases": ["what is a mole", "what is mole", "mole kya hota",
                    "mole kya hai", "mole ka matlab", "mole meaning",
                    "why mole", "mole kyu", "mole concept kya",
                    "dozen of chemistry", "avogadro number", "avogadro"],
        "regex": [],
        "simple": "A mole is just a chemist's 'dozen' -- except the dozen "
                  "is 602,000,000,000,000,000,000,000 instead of 12. Atoms "
                  "are so tiny that you must count them in truckloads to "
                  "weigh them. One mole of any substance weighs its "
                  "molecular mass in grams -- that is the whole trick.",
        "hinglish": "Mole chemist ka 'darjan' hai -- bas darjan mein 12 "
                    "nahi, 602 ke aage 22 zero hote hain. Atoms itne chhote "
                    "hain ki truck-load mein hi gine jaate hain. 1 mole = "
                    "molecular mass ke grams -- bas yahi trick hai.",
        "formal": "One mole contains Avogadro's number, 6.022 x 10^23 "
                  "particles; the molar mass in g/mol equals the relative "
                  "molecular mass, linking a weighed mass to the number of "
                  "particles.",
    },

    # ---------------------------- biology ----------------------------- #
    {
        "id": "photosynthesis_vs_respiration",
        "topic": "Photosynthesis vs respiration",
        "subject": "biology",
        "phrases": ["photosynthesis and respiration",
                    "respiration and photosynthesis",
                    "photosynthesis vs respiration",
                    "respiration vs photosynthesis",
                    "difference between photosynthesis",
                    "difference between respiration",
                    "photosynthesis ya respiration", "photosynthesis kya",
                    "respiration kya", "plants breathe", "plant ko respiration",
                    "plants respire", "respire at night",
                    "respiration at night", "plant respiration"],
        "regex": [],
        "simple": "Photosynthesis is the plant's kitchen work -- in "
                  "sunlight it cooks CO2 and water into food (glucose) and "
                  "gives out O2. Respiration is every living thing's "
                  "digestion -- burning food with O2 to release energy, "
                  "giving out CO2, day and night. A plant does both; the "
                  "kitchen only runs in daylight.",
        "hinglish": "Photosynthesis plant ki rasoi hai -- dhoop mein CO2 "
                    "aur paani se khana (glucose) banata hai, O2 chhodta "
                    "hai. Respiration har jeev ka khana jalana hai -- O2 ke "
                    "saath energy nikalta hai, CO2 chhodta hai -- din ho ya "
                    "raat. Plant dono karta hai; rasoi sirf dhoop mein "
                    "chalti hai.",
        "formal": "Photosynthesis (in chloroplasts, in light) stores "
                  "energy: 6CO2 + 6H2O -> C6H12O6 + 6O2. Respiration (in "
                  "mitochondria, at all times) releases it: glucose + O2 -> "
                  "CO2 + H2O + energy.",
    },
    {
        "id": "artery_vs_vein",
        "topic": "Artery vs vein",
        "subject": "biology",
        "phrases": ["artery and vein", "vein and artery",
                    "arteries and veins", "veins and arteries",
                    "artery vs vein", "vein vs artery",
                    "difference between artery", "difference between vein",
                    "artery ya vein", "artery kya", "vein kya",
                    "artery ka matlab"],
        "regex": [],
        "simple": "Arteries are the delivery pipes carrying blood AWAY from "
                  "the pump (heart) -- thick and muscular because the heart "
                  "fires hard into them. Veins are the return pipes bringing "
                  "blood back, with one-way valves so it never flows "
                  "backwards. Remember: A for Away -- Artery.",
        "hinglish": "Artery delivery pipe hai -- pump (heart) se door khoon "
                    "le jaati hai, moti aur takatwar kyunki heart zor se "
                    "dhakka deta hai. Vein wapas laane wali pipe hai -- "
                    "andar one-way valve taaki khoon ulta na bhaage. Trick: "
                    "A se Away -- Artery.",
        "formal": "Arteries carry blood away from the heart under high "
                  "pressure and have thick elastic walls; veins return it "
                  "at low pressure through one-way valves.",
    },
    {
        "id": "dominant_trait",
        "topic": "What dominant trait means",
        "subject": "biology",
        "phrases": ["dominant and recessive", "recessive and dominant",
                    "dominant trait", "recessive trait", "dominant kya",
                    "recessive kya", "dominant matlab", "dominant ka matlab",
                    "dominant means", "what does dominant", "dominant mean",
                    "dominant allele", "why dominant",
                    "dominant recessive difference"],
        "regex": [],
        "simple": "'Dominant' does not mean 'most common' -- it means that "
                  "version wins the coin toss for THIS body. A tall (Tt) "
                  "plant shows tallness while the short version t hides "
                  "inside and quietly passes on. How many in a population "
                  "have it is a separate census question.",
        "hinglish": "'Dominant' ka matlab 'zyada common' nahi -- matlab is "
                    "bachche ke body mein is version ne coin toss jeet "
                    "liya. Tt plant lamba dikhega, par chhota wala t andar "
                    "chhupa hai aur aage chupchaap jata hai. Population "
                    "mein kitne percent hain, wo alag sawaal hai.",
        "formal": "Dominance describes the phenotype expressed in a "
                  "heterozygote (Tt is tall); it does not imply the allele "
                  "is more frequent in the population, nor does it remove "
                  "the recessive allele from the genotype.",
    },
    {
        "id": "evolution_ladder",
        "topic": "Evolution is a bush, not a ladder",
        "subject": "biology",
        "phrases": ["evolution ladder", "ladder of evolution",
                    "most evolved", "humans most evolved", "man most evolved",
                    "evolved from monkeys", "evolved from apes",
                    "monkey to man", "evolution tree", "evolution kya",
                    "why evolution"],
        "regex": [],
        "simple": "Evolution is a bush with branches, not a ladder with a "
                  "winner at the top. Bacteria are not 'less evolved' than "
                  "us -- they have been evolving just as long and are "
                  "superbly suited to their world. We share an ancestor "
                  "with chimpanzees; we did not descend from them -- more "
                  "like two cousins from one grandparent.",
        "hinglish": "Evolution seedhi seedhi nahi, jhaadi ki tarah "
                    "shaakhein hai -- koi 'sabse upar' nahi. Bacteria humse "
                    "'kam evolved' nahi -- wo bhi utne hi time se evolve ho "
                    "rahe hain aur apni duniya mein perfect hain. Hum chimp "
                    "se utre nahi; hum aur chimp dono ek dada-dadi ke pote "
                    "hain.",
        "formal": "Evolution is a branching tree of common descent, not a "
                  "linear progression; living species are equally evolved, "
                  "each adapted to its own niche.",
    },
    {
        "id": "chromosome_boy_girl",
        "topic": "Who decides a baby's sex",
        "subject": "biology",
        "phrases": ["boy or girl", "ladka ya ladki", "sex determination",
                    "sex of the baby", "sex of a baby", "sex of the child",
                    "sex of a child", "who decides the sex", "gender of baby",
                    "gender of the baby", "xx xy", "xy chromosome",
                    "sex chromosome", "23rd chromosome", "father decides",
                    "mother responsible for"],
        "regex": [],
        "simple": "Every baby gets one sex chromosome from mom (always X) "
                  "and one from dad (X or Y). Dad's delivery decides: X "
                  "from dad makes a girl (XX), Y from dad makes a boy (XY). "
                  "So biologically the child's sex is decided by the "
                  "father -- blaming the mother is plain wrong.",
        "hinglish": "Bachche ko mom se hamesha X milta hai, dad se X ya Y. "
                    "Faisla dad ka hai: dad ne X diya toh ladki (XX), Y "
                    "diya toh ladka (XY). Isliye biology mein ladka-ladki "
                    "father ke chromosomes se decide hota hai -- maa ko "
                    "dosh dena bilkul galat hai.",
        "formal": "Human sex chromosomes are XX (female) and XY (male); "
                  "the ovum always contributes X while the sperm "
                  "contributes X or Y, so the zygote's sex is determined by "
                  "the sperm.",
    },

    # ------------------------- geography / social -------------------- #
    {
        "id": "weather_vs_climate",
        "topic": "Weather vs climate",
        "subject": "geography",
        "phrases": ["weather and climate", "climate and weather",
                    "weather vs climate", "climate vs weather",
                    "difference between weather", "difference between climate",
                    "weather ya climate", "weather kya", "climate kya",
                    "weather climate antar", "antar weather climate"],
        "regex": [],
        "simple": "Weather is today's mood -- today's rain, tomorrow's sun, "
                  "changing by the hour. Climate is the person's nature -- "
                  "the average mood over 30 or more years. 'Mumbai was hot "
                  "yesterday' is weather; 'Mumbai is humid most of the "
                  "year' is climate.",
        "hinglish": "Weather aaj ka mood hai -- aaj baarish, kal dhoop. "
                    "Climate nature ya swabhav hai -- 30 saal ka average "
                    "mood. 'Kal Mumbai garam tha' weather hai; 'Mumbai saal "
                    "ke zyada tarah geeela garam rehta hai' climate hai.",
        "formal": "Weather is the atmospheric condition at a place at a "
                  "given time; climate is the long-term (typically 30-year) "
                  "statistical pattern of weather at that place.",
    },
    {
        "id": "latitude_vs_longitude",
        "topic": "Latitude vs longitude",
        "subject": "geography",
        "phrases": ["latitude and longitude", "longitude and latitude",
                    "latitude vs longitude", "longitude vs latitude",
                    "difference between latitude", "difference between longitude",
                    "latitude ya longitude", "latitude kya", "longitude kya",
                    "latitude longitude", "antar latitude longitude"],
        "regex": [],
        "simple": "Latitude lines run flat like the rungs of a ladder (0 = "
                  "Equator) and tell how far north or south you are -- why "
                  "it is cold near the poles. Longitude lines run pole to "
                  "pole like orange peels (0 = Greenwich) and set the time "
                  "zones. Trick: laddER has lattITUDE rungs; LONGitude "
                  "lines are LONG.",
        "hinglish": "Latitude line flat hai, seedhi ke dari jaisi (0 = "
                    "Equator) -- batati hai north/south kitna door, isliye "
                    "poles thande hain. Longitude line pole se pole jaati "
                    "hai, santra chhilke jaisi (0 = Greenwich) -- time zone "
                    "set karti hai. Trick: Ladder jaisa = Latitude.",
        "formal": "Latitude is the angular distance north or south of the "
                  "Equator (0-90 degrees); longitude is the angular "
                  "distance east or west of the Greenwich meridian "
                  "(0-180 degrees).",
    },

    # --------------------------- economics ---------------------------- #
    {
        "id": "law_of_demand",
        "topic": "Why the demand curve slopes down",
        "subject": "economics",
        "phrases": ["law of demand", "demand curve", "why demand",
                    "demand kyu", "demand girti", "downward sloping demand",
                    "demand curve slope", "demand curve slopes",
                    "demand curve down", "upward sloping supply",
                    "why supply curve", "supply curve"],
        "regex": [],
        "simple": "When the price of samosas shoots up, people buy fewer -- "
                  "that is the law of demand: price up, quantity demanded "
                  "down. The demand curve slopes down because it is a menu: "
                  "pick a price, read across to how much people would buy. "
                  "Supply curves tilt the other way -- a higher price "
                  "invites more sellers.",
        "hinglish": "Samosa mehnga hua toh log kam khareedenge -- price "
                    "badha toh demand ghati, yahi law of demand hai. Demand "
                    "curve neeche ki taraf jhuki hoti hai kyunki wo ek menu "
                    "hai: har price pe kitna khareedenge. Supply curve ulta "
                    "jhukti hai -- mehnga maal, zyada bechne wale.",
        "formal": "Ceteris paribus, quantity demanded falls as price rises, "
                  "so the demand curve is downward-sloping; quantity "
                  "supplied rises with price, so the supply curve is "
                  "upward-sloping.",
    },
]

# --------------------------------------------------------------------- #
# build + index (deterministic)
# --------------------------------------------------------------------- #


def _compile_topic(spec: Dict[str, Any]) -> Dict[str, Any]:
    styles = {k: str(spec[k]).strip()
              for k in ("simple", "hinglish", "formal")}
    return {
        "id": str(spec["id"]),
        "topic": str(spec.get("topic") or spec["id"]),
        "subject": str(spec.get("subject") or "general"),
        "phrases": [_normalize(p) for p in (spec.get("phrases") or [])
                    if _normalize(p)],
        "regexes": [re.compile(rx, re.I) for rx in (spec.get("regex") or [])],
        "styles": styles,
    }


_TOPICS: Dict[str, Dict[str, Any]] = {}
_TOPIC_LIST: List[Dict[str, Any]] = []
for _spec in _TOPIC_SPECS:
    _t = _compile_topic(_spec)
    _TOPICS[_t["id"]] = _t
    _TOPIC_LIST.append(_t)
del _spec, _t


def topic_count() -> int:
    return len(_TOPICS)


def topics() -> List[Dict[str, Any]]:
    return [{"id": t["id"], "topic": t["topic"], "subject": t["subject"]}
            for t in _TOPIC_LIST]


def get_topic(topic_id: str) -> Optional[Dict[str, Any]]:
    t = _TOPICS.get(str(topic_id or "").strip())
    return dict(t) if t else None


# --------------------------------------------------------------------- #
# matching
# --------------------------------------------------------------------- #
def find_topic(question: str) -> Optional[Dict[str, Any]]:
    """Best keyword match of the question against the table.

    Deterministic: a phrase hit scores +2, a regex hit +1; highest score
    wins and equal scores break alphabetically by id.  Phrases match on
    whole tokens ("what is ph" cannot ride inside "photosynthesis").
    Returns ``{"topic_id", "entry", "score"}`` or None."""
    norm = _normalize(question)
    raw = str(question or "").lower()
    if not norm:
        return None
    padded = f" {norm} "
    best = None
    best_key = None
    for t in _TOPIC_LIST:
        score = 0
        for ph in t["phrases"]:
            if f" {ph} " in padded:
                score += 2
        for rx in t["regexes"]:
            if rx.search(raw):
                score += 1
        if score <= 0:
            continue
        key = (score, t["id"])
        if best_key is None or key > best_key:
            best, best_key = t, key
    if best is None:
        return None
    return {"topic_id": best["id"], "entry": best, "score": best_key[0]}


def find_explanation(question: str, hinglish: Optional[bool] = None,
                     min_score: int = 2) -> Optional[Dict[str, Any]]:
    """The matched topic with the language variant selected.

    ``hinglish=None`` auto-detects the student's language (Hinglish in ->
    Hinglish out, English in -> plain simple English).  Returns
    ``{"id", "topic", "subject", "style", "text", "styles", "score"}`` or
    None when nothing matches well enough."""
    m = find_topic(question)
    if m is None or m["score"] < int(min_score):
        return None
    t = m["entry"]
    if hinglish is None:
        hinglish = detect_hinglish(question)
    style = "hinglish" if hinglish else "simple"
    return {
        "id": t["id"],
        "topic": t["topic"],
        "subject": t["subject"],
        "style": style,
        "text": t["styles"][style],
        "styles": dict(t["styles"]),
        "score": m["score"],
    }


# --------------------------------------------------------------------- #
# the WHY-lane guard: never steal a computation from the solver
# --------------------------------------------------------------------- #
_CONCEPT_RE = re.compile(
    r"\b(why|kyu|kyun|kyon|how does|how do|how to|what does|what is|"
    r"what are|what is meant|difference|different between|diff between|"
    r"vs|versus|meaning|explain|samjhao|samjha|samajh|define|definition|"
    r"concept|reason|kya hai|kya hota|kya hoti|kya hote|kya matlab|"
    r"matlab|kaise)\b", re.I)
_COMPUTE_OP_RE = re.compile(r"\d\s*[\+\-\*xX\u00d7\u00f7/^]\s*\d")
_COMPUTE_VERB_RE = re.compile(
    r"\b(find|calculate|compute|evaluate|solve|simplify|convert|expand|"
    r"factorise|factorize|differentiate|integrate)\b", re.I)
_ASK_VALUE_RE = re.compile(r"\bwhat\s+(is|are)\b[^.?!]{0,40}\b(of|value)\b",
                           re.I)


def looks_computational(question: str) -> bool:
    """True when the question looks like a numeric task rather than a
    'why' question -- arithmetic patterns, computation verbs or
    'what is ... of <number>' -- unless a conceptual marker (why,
    difference, matlab, ...) is present."""
    raw = str(question or "")
    if _CONCEPT_RE.search(raw):
        return False
    if _COMPUTE_OP_RE.search(raw):
        return True
    if _COMPUTE_VERB_RE.search(raw) and re.search(r"\d", raw):
        return True
    if _ASK_VALUE_RE.search(raw) and re.search(r"\d", raw):
        return True
    return False


def teach_match(question: str) -> Optional[Dict[str, Any]]:
    """The WHY-lane match: an explanation only when the question is
    conceptual.  Computational questions must fall through to the
    deterministic solver, so they are refused here."""
    if looks_computational(question):
        return None
    return find_explanation(question)


# --------------------------------------------------------------------- #
# informative-term extraction (for corpus search behind the WHY-lane)
# --------------------------------------------------------------------- #
_SEARCH_STOPWORDS = frozenset("""
a an the and or but if then else of for to in on at by with from as is
are was were be been being am do does did doing have has had having will
would shall should can could may might must it its this that these those
i you he she we they them his her their our your my me us what which who
whom whose when where why how all any both each few more most other some
such no nor not only own same so than too very just about into over
under again further once here there tell give show like also many much
need wants know understand things thing
""".split())


def informative_terms(question: str) -> List[str]:
    """Content words of a question, deduplicated, for full-text search
    over a teaching corpus (stops generic words from scoring noise)."""
    seen: Dict[str, None] = {}
    for t in re.findall(r"[a-z]+", str(question or "").lower()):
        if len(t) >= 4 and t not in _SEARCH_STOPWORDS:
            seen.setdefault(t, None)
    return list(seen)
