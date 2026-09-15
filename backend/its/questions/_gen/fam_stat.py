"""fam_stat.py -- data handling, central tendency, dispersion,
probability, counting, sets, index numbers, inference, logic."""
from __future__ import annotations

import math

from qbank_lib import family, make_q, ri, pick, frac_str, fmt_num


# ------------------------------------------------------------------ #
# data handling
# ------------------------------------------------------------------ #

@family("data_read")
def _data_read(rng):
    out = []
    f1, f2, f3 = ri(rng, 2, 9), ri(rng, 2, 9), ri(rng, 2, 9)
    out.append(make_q(
        "In a frequency table the rows have frequencies %d, %d and %d. Find "
        "the total frequency." % (f1, f2, f3),
        ["total = %d + %d + %d" % (f1, f2, f3)],
        str(f1 + f2 + f3)))
    syms = ri(rng, 3, 12)
    scale = pick(rng, [2, 5, 10, 20, 25, 50])
    out.append(make_q(
        "A pictograph uses one symbol for %d units. If a row shows %d "
        "symbols, what value does it represent?" % (scale, syms),
        ["val = %d * %d" % (syms, scale)],
        str(syms * scale)))
    val = scale * ri(rng, 3, 15)
    out.append(make_q(
        "In a pictograph with key 1 symbol = %d units, how many symbols "
        "represent %d units?" % (scale, val),
        ["syms = %d / %d" % (val, scale)],
        str(val // scale)))
    height = ri(rng, 2, 12)
    scale2 = pick(rng, [5, 10, 20, 50])
    out.append(make_q(
        "In a bar graph, 1 unit of bar height stands for %d books. A bar is "
        "%d units tall. How many books does it show?" % (scale2, height),
        ["books = %d * %d" % (height, scale2)],
        str(height * scale2)))
    freq = ri(rng, 2, 20)
    out.append(make_q(
        "A bar must show a frequency of %d with scale 1 unit = 5. How tall "
        "is the bar in units?" % (freq * 5),
        ["h = %d / 5" % (freq * 5)],
        str(freq)))
    part, whole = pick(rng, [(30, 120), (45, 180), (60, 240), (25, 100),
                            (50, 200), (75, 300)])
    out.append(make_q(
        "A pie chart sector represents %d out of %d people. Find its central "
        "angle in degrees." % (part, whole),
        ["angle = %d / %d * 360" % (part, whole)],
        fmt_num(part / whole * 360)))
    pct = pick(rng, [10, 15, 20, 25, 30, 40, 50])
    amount = pick(rng, [3600, 5400, 7200, 9000])
    out.append(make_q(
        "A monthly income of Rs %d is shown as a pie chart. The rent sector "
        "is %d%%. Find the rent amount." % (amount, pct),
        ["rent = %d / 100 * %d" % (pct, amount)],
        fmt_num(pct * amount / 100)))
    spend = ri(rng, 200, 1500)
    pct2 = pick(rng, [10, 20, 25])
    out.append(make_q(
        "In a pie chart of expenses, food is %d%% and corresponds to Rs %d. "
        "Find the total expenses (two decimal places)." % (pct2, spend * 100 // pct2),
        ["total = %d * 100 / %d" % (spend * 100 // pct2, pct2)],
        fmt_num(spend * 100 / pct2)))
    lo, up = pick(rng, [(10, 20), (20, 30), (30, 40), (25, 45), (10, 50)])
    out.append(make_q(
        "Find the class mark of the class interval %d - %d." % (lo, up),
        ["mark = (%d + %d) / 2" % (lo, up)],
        fmt_num((lo + up) / 2)))
    lo = ri(rng, 1, 9) * 10
    out.append(make_q(
        "A class interval is %d - %d. Find its class size." % (lo, lo + 10),
        ["size = %d - %d" % (lo + 10, lo)],
        "10"))
    return out


@family("central_tendency")
def _central_tendency(rng):
    out = []
    vals = [ri(rng, 2, 40) for _ in range(5)]
    tup = "(" + ", ".join(str(v) for v in vals) + ")"
    mean = sum(vals) / 5
    out.append(make_q(
        "Find the mean of the numbers %s." % ", ".join(map(str, vals)),
        ["total = sum(%s)" % tup, "mean = total / 5"],
        fmt_num(round(mean, 2))))
    vals = sorted(ri(rng, 1, 50) for _ in range(5))
    tup = "(" + ", ".join(str(v) for v in vals) + ")"
    out.append(make_q(
        "Find the median of %s (already in increasing order)."
        % ", ".join(map(str, vals)),
        ["med = %s" % str(vals[2])],
        str(vals[2])))
    a, b = sorted((ri(rng, 1, 40), ri(rng, 1, 40)))
    c = ri(rng, 41, 60)
    mid = (a + b) / 2
    out.append(make_q(
        "Six observations sorted in order end with ... , %d, %d. A seventh "
        "value %d is added, making 7 values. Find the median of the 7 "
        "values." % (a, b, c),
        ["med = %s" % str(b)],
        str(b)))
    a, b = sorted((ri(rng, 1, 30), ri(rng, 31, 60)))
    out.append(make_q(
        "An even-sized data set has middle values %d and %d. Find the median."
        % (a, b),
        ["med = (%d + %d) / 2" % (a, b)],
        fmt_num((a + b) / 2)))
    f1, f2, f3 = ri(rng, 3, 8), ri(rng, 1, 3), ri(rng, 1, 3)
    out.append(make_q(
        "In a data set, the value 4 occurs %d times, 5 occurs %d times and 6 "
        "occurs %d times. Find the mode." % (f1, f2, f3),
        ["mode = %d" % (4 if f1 >= max(f2, f3) else (5 if f2 >= f3 else 6))],
        str(4 if f1 >= max(f2, f3) else (5 if f2 >= f3 else 6))))
    vals = [ri(rng, 5, 60) for _ in range(4)]
    out.append(make_q(
        "Find the range of the data %s." % ", ".join(map(str, vals)),
        ["rng = max(%s) - min(%s)"
         % (", ".join(map(str, vals)), ", ".join(map(str, vals)))],
        str(max(vals) - min(vals))))
    known = [ri(rng, 5, 30) for _ in range(4)]
    k = ri(rng, 5, 30)
    vals = known + [k]
    out.append(make_q(
        "The mean of 5 observations is %d. Four of them are %s. Find the "
        "fifth." % (round(sum(vals) / 5), ", ".join(map(str, known))),
        ["total = %d * 5" % round(sum(vals) / 5),
         "known = %s" % (" + ".join(map(str, known))),
         "fifth = total - known"],
        str(k)))
    mean_old = ri(rng, 10, 30)
    n = pick(rng, [5, 8, 10, 12, 20])
    wrong = ri(rng, 30, 60)
    right = ri(rng, 2, 25)
    out.append(make_q(
        "The mean of %d observations was computed as %d, but a value %d was "
        "mistakenly used instead of %d. Find the correct mean."
        % (n, mean_old, wrong, right),
        ["wrong_total = %d * %d" % (mean_old, n),
         "right_total = wrong_total - %d + %d" % (wrong, right),
         "mean = right_total / %d" % n],
        fmt_num(round((mean_old * n - wrong + right) / n, 2))))
    mean_old = ri(rng, 10, 40)
    shift = ri(rng, 2, 9)
    out.append(make_q(
        "A data set has mean %d. If 5 is added to every observation, what is "
        "the new mean?" % mean_old,
        ["new_mean = %d + 5" % mean_old],
        str(mean_old + 5)))
    mean_old = ri(rng, 4, 20)
    factor = pick(rng, [2, 3])
    out.append(make_q(
        "Every observation of a data set with mean %d is multiplied by %d. "
        "Find the new mean." % (mean_old, factor),
        ["new_mean = %d * %d" % (mean_old, factor)],
        str(mean_old * factor)))
    v1, v2, f1, f2 = ri(rng, 2, 9), ri(rng, 10, 18), ri(rng, 2, 8), ri(rng, 2, 8)
    out.append(make_q(
        "A frequency table has value %d with frequency %d and value %d with "
        "frequency %d. Find the mean." % (v1, f1, v2, f2),
        ["num = %d * %d + %d * %d" % (v1, f1, v2, f2),
         "den = %d + %d" % (f1, f2), "mean = num / den"],
        fmt_num(round((v1 * f1 + v2 * f2) / (f1 + f2), 2))))
    return out


@family("dispersion")
def _dispersion(rng):
    out = []
    vals = [ri(rng, 2, 15) for _ in range(3)]
    m = sum(vals) / 3
    out.append(make_q(
        "Find the mean deviation about the mean of %s (two decimal places)."
        % ", ".join(map(str, vals)),
        ["mean = (%s) / 3" % " + ".join(map(str, vals)),
         "md = (abs(%d - mean) + abs(%d - mean) + abs(%d - mean)) / 3"
         % (vals[0], vals[1], vals[2])],
        fmt_num(round((abs(vals[0] - m) + abs(vals[1] - m) + abs(vals[2] - m)) / 3, 2))))
    vals = [ri(rng, 1, 9) for _ in range(4)]
    m = sum(vals) / 4
    var = sum((v - m) ** 2 for v in vals) / 4
    out.append(make_q(
        "Find the variance of %s (two decimal places)."
        % ", ".join(map(str, vals)),
        ["mean = (%s) / 4" % " + ".join(map(str, vals)),
         "sq = (%d - mean) ** 2 + (%d - mean) ** 2 + (%d - mean) ** 2 + "
         "(%d - mean) ** 2" % (vals[0], vals[1], vals[2], vals[3]),
         "var = sq / 4"],
        fmt_num(round(var, 2))))
    sd = pick(rng, [2, 3, 4, 5, 6, 8])
    out.append(make_q(
        "A data set has variance %d. Find its standard deviation." % (sd * sd),
        ["sd = sqrt(%d)" % (sd * sd)],
        str(sd)))
    sd = pick(rng, [2, 4, 5, 10])
    mean = pick(rng, [40, 50, 60, 80, 100])
    out.append(make_q(
        "Find the coefficient of variation (in percent) when the standard "
        "deviation is %d and the mean is %d." % (sd, mean),
        ["cv = %d / %d * 100" % (sd, mean)],
        fmt_num(sd / mean * 100)))
    q1 = ri(rng, 10, 25)
    q3 = ri(rng, 30, 60)
    out.append(make_q(
        "The first and third quartiles of a data set are %d and %d. Find the "
        "interquartile range." % (q1, q3),
        ["iqr = %d - %d" % (q3, q1)],
        str(q3 - q1)))
    n = pick(rng, [7, 11, 15, 19])
    out.append(make_q(
        "For %d ordered observations, find the position of the upper "
        "quartile using 3(n + 1) / 4." % n,
        ["pos = 3 * (%d + 1) / 4" % n],
        fmt_num(3 * (n + 1) / 4)))
    sd = pick(rng, [4, 8, 12, 20])
    n = pick(rng, [4, 9, 16, 25, 36])
    out.append(make_q(
        "A sample of size %d has standard deviation %d. Find the standard "
        "error of the mean." % (n, sd),
        ["se = %d / sqrt(%d)" % (sd, n)],
        fmt_num(sd / math.sqrt(n))))
    x = ri(rng, 60, 90)
    mu = pick(rng, [55, 60, 65, 70])
    s = pick(rng, [5, 8, 10, 12])
    out.append(make_q(
        "Find the z-score of the value %d from a distribution with mean %d "
        "and standard deviation %d (two decimal places)." % (x, mu, s),
        ["z = (%d - %d) / %d" % (x, mu, s)],
        fmt_num(round((x - mu) / s, 2))))
    xbar = ri(rng, 40, 60)
    mu = ri(rng, 30, 55)
    s = pick(rng, [4, 5, 8, 10])
    n = pick(rng, [16, 25, 36, 64])
    out.append(make_q(
        "Compute the one-sample t statistic for sample mean %d, population "
        "mean %d, sample standard deviation %d and sample size %d (two "
        "decimal places)." % (xbar, mu, s, n),
        ["t = (%d - %d) / (%d / sqrt(%d))" % (xbar, mu, s, n)],
        fmt_num(round((xbar - mu) / (s / math.sqrt(n)), 2))))
    xbar = ri(rng, 20, 40)
    mu = ri(rng, 20, 40)
    out.append(make_q(
        "A sample mean is %d and the population mean is %d. Find the "
        "sampling error (xbar - mu)." % (max(xbar, mu + 3), mu),
        ["err = %d - %d" % (max(xbar, mu + 3), mu)],
        str(max(xbar, mu + 3) - mu)))
    return out


# ------------------------------------------------------------------ #
# probability
# ------------------------------------------------------------------ #

@family("probability")
def _probability(rng):
    out = []
    fav = ri(rng, 1, 5)
    out.append(make_q(
        "A die is rolled once. What is the probability of getting a number "
        "greater than %d? (give the fraction)" % (6 - fav),
        ["p = %d / 6" % fav],
        frac_str(fav, 6)))
    out.append(make_q(
        "A die is rolled once. What is the probability of getting a prime "
        "number (2, 3 or 5)? (give the fraction)",
        ["p = 3 / 6"],
        "1/2"))
    out.append(make_q(
        "Two coins are tossed together. What is the probability of getting "
        "exactly one head? (give the fraction)",
        ["p = 2 / 4"],
        "1/2"))
    k = ri(rng, 2, 3)
    out.append(make_q(
        "%d fair coins are tossed together. What is the total number of "
        "possible outcomes?" % k,
        ["outcomes = 2 ** %d" % k],
        str(2 ** k)))
    out.append(make_q(
        "Two dice are rolled together. How many outcomes are in the sample "
        "space?",
        ["outcomes = 6 * 6"],
        "36"))
    fav = ri(rng, 1, 5)
    out.append(make_q(
        "Two dice are rolled. Find the probability of getting a sum of %d "
        "(there are %d such outcomes). (give the fraction)"
        % (2 + fav, fav),
        ["p = %d / 36" % fav],
        frac_str(fav, 36)))
    suit = pick(rng, [("hearts", 13), ("kings", 4), ("red aces", 2),
                      ("face cards", 12), ("black queens", 2)])
    out.append(make_q(
        "One card is drawn from a well-shuffled deck of 52. Find the "
        "probability that it is %s. (give the fraction)" % suit[0],
        ["p = %d / 52" % suit[1]],
        frac_str(suit[1], 52)))
    red = ri(rng, 2, 5)
    blue = ri(rng, 2, 6)
    out.append(make_q(
        "A bag has %d red and %d blue balls. One ball is drawn at random. "
        "Find the probability that it is red. (give the fraction)"
        % (red, blue),
        ["p = %d / %d" % (red, red + blue)],
        frac_str(red, red + blue)))
    p = pick(rng, [(1, 4), (2, 5), (3, 8), (1, 3), (5, 12)])
    out.append(make_q(
        "The probability of an event is %d/%d. Find the probability of its "
        "complement. (give the fraction)" % p,
        ["p_not = 1 - %d / %d" % p],
        frac_str(p[1] - p[0], p[1])))
    hits = ri(rng, 12, 35)
    trials = pick(rng, [40, 50, 60])
    out.append(make_q(
        "In %d throws of a dart, it hit the bullseye %d times. Find the "
        "empirical probability of a bullseye. (give the fraction)"
        % (trials, hits),
        ["p = %d / %d" % (hits, trials)],
        frac_str(hits, trials)))
    pa, pb, pab = pick(rng, [(1, 2, 6), (1, 3, 12), (2, 5, 10), (1, 4, 12)])
    out.append(make_q(
        "If P(A) = %d/%d, P(B) = %d/%d and P(A and B) = %d/%d, find "
        "P(A or B). (give the fraction)"
        % (1, pa, 1, pb, 1, pab),
        ["p = 1 / %d + 1 / %d - 1 / %d" % (pa, pb, pab)],
        frac_str(pa * pb - pb - pa + pab * 0 + 0 if False else
                 (pb + pa) * pab // math.gcd((pb + pa) * pab, pa * pb * pab) // 1
                 if False else 0, 1)))
    pa, pb, pab = pick(rng, [(2, 3, 12), (1, 2, 6), (3, 4, 12), (2, 5, 10)])
    from fractions import Fraction
    vorb = Fraction(1, pa) + Fraction(1, pb) - Fraction(1, pab)
    out.append(make_q(
        "If P(A) = 1/%d, P(B) = 1/%d and P(A and B) = 1/%d, find P(A or B). "
        "(give the fraction)" % (pa, pb, pab),
        ["p = 1 / %d + 1 / %d - 1 / %d" % (pa, pb, pab)],
        "%d/%d" % (vorb.numerator, vorb.denominator)))
    pa = pick(rng, [(1, 3), (2, 5), (1, 4)])
    pb_a = pick(rng, [(1, 2), (2, 3), (1, 3)])
    joint = Fraction(pa[0], pa[1]) * Fraction(pb_a[0], pb_a[1])
    out.append(make_q(
        "P(A) = %d/%d and P(B given A) = %d/%d. Find P(A and B). (give the "
        "fraction)" % (pa[0], pa[1], pb_a[0], pb_a[1]),
        ["joint = %d / %d * %d / %d" % (pa[0], pa[1], pb_a[0], pb_a[1])],
        "%d/%d" % (joint.numerator, joint.denominator)))
    cond = Fraction(joint, Fraction(pa[0], pa[1]))
    out.append(make_q(
        "If P(A and B) = %d/%d and P(A) = %d/%d, find P(B given A). (give "
        "the fraction)"
        % (joint.numerator, joint.denominator, pa[0], pa[1]),
        ["cond = (%d / %d) / (%d / %d)"
         % (joint.numerator, joint.denominator, pa[0], pa[1])],
        "%d/%d" % (cond.numerator, cond.denominator)))
    prior1 = pick(rng, [(1, 2), (1, 3), (2, 3)])
    post = Fraction(prior1[0], prior1[1])
    out.append(make_q(
        "A factory has two machines; machine 1 produces %d/%d of the items. "
        "If P(defect given machine 1) = 1/%d and P(defect given machine 2) = "
        "1/%d, find P(defect). (give the fraction)"
        % (prior1[0], prior1[1], 20, 30),
        ["p = %d / %d * 1 / 20 + %d / %d * 1 / 30"
         % (prior1[0], prior1[1], prior1[1] - prior1[0], prior1[1])],
        fmt_num(0) if False else _frac_text(post * Fraction(1, 20)
                                            + (1 - post) * Fraction(1, 30))))
    p1 = pick(rng, [(1, 2), (3, 5), (1, 4)])
    out.append(make_q(
        "A discrete random variable takes value 2 with probability %d/%d and "
        "value 5 with the remaining probability. Find P(X = 5). (give the "
        "fraction)" % p1,
        ["p5 = 1 - %d / %d" % p1],
        frac_str(p1[1] - p1[0], p1[1])))
    out.append(make_q(
        "A random variable X takes 1 with probability 1/4 and 3 with "
        "probability 3/4. Find the expected value E(X).",
        ["e = 1 * 1 / 4 + 3 * 3 / 4"],
        fmt_num(2.5)))
    n = pick(rng, [3, 4])
    r = ri(rng, 1, n - 1)
    from math import comb
    c = comb(n, r)
    out.append(make_q(
        "A biased coin with P(head) = 1/2 is tossed %d times. Find the "
        "probability of exactly %d heads (binomial). (give the fraction)"
        % (n, r),
        ["ways = %d" % c, "p = ways * (1 / 2) ** %d" % n],
        frac_str(c, 2 ** n)))
    return out


def _frac_text(fr):
    from fractions import Fraction
    fr = Fraction(fr)
    if fr.denominator == 1:
        return str(fr.numerator)
    return "%d/%d" % (fr.numerator, fr.denominator)


# ------------------------------------------------------------------ #
# counting, sets, logic
# ------------------------------------------------------------------ #

@family("counting_sets")
def _counting_sets(rng):
    out = []
    m, n = ri(rng, 2, 9), ri(rng, 2, 9)
    out.append(make_q(
        "A canteen offers %d drinks and %d snacks. How many drink-snack "
        "combos are possible (rule of product)?" % (m, n),
        ["total = %d * %d" % (m, n)],
        str(m * n)))
    na, nb = ri(rng, 2, 9), ri(rng, 2, 9)
    out.append(make_q(
        "How many ordered pairs are in the Cartesian product of a set of "
        "size %d with a set of size %d?" % (na, nb),
        ["pairs = %d * %d" % (na, nb)],
        str(na * nb)))
    out.append(make_q(
        "How many relations are possible from a set of size %d to a set of "
        "size %d? (relations = 2^(pq))" % (2, 3) if False else
        "How many subsets does a set with %d elements have?" % na,
        ["subsets = 2 ** %d" % na],
        str(2 ** na)))
    elems = ri(rng, 2, 6)
    out.append(make_q(
        "A set A has %d elements. A relation from A to A is any subset of "
        "A x A; how many such relations exist?" % elems,
        ["rels = 2 ** (%d * %d)" % (elems, elems)],
        str(2 ** (elems * elems))))
    n = ri(rng, 3, 8)
    r = ri(rng, 1, min(4, n - 1))
    prod = 1
    for i in range(r):
        prod *= n - i
    out.append(make_q(
        "Find the number of arrangements (permutations) of %d distinct "
        "objects taken %d at a time." % (n, r),
        ["ways = %s" % " * ".join(str(n - i) for i in range(r))],
        str(prod)))
    letters = pick(rng, [(3, 2), (2, 2), (4, 2)])
    tot = letters[0] + letters[1]
    out.append(make_q(
        "How many distinct arrangements does the word with %d identical "
        "'a's and %d identical 'b's have? (total %d letters)"
        % (letters[0], letters[1], tot),
        ["ways = %d / (%d * %d)" % (math.factorial(tot),
                                    math.factorial(letters[0]),
                                    math.factorial(letters[1]))],
        str(math.factorial(tot) // (math.factorial(letters[0])
                                    * math.factorial(letters[1])))))
    n = ri(rng, 3, 8)
    r = ri(rng, 1, min(4, n))
    cnr = math.factorial(n) // (math.factorial(r) * math.factorial(n - r))
    out.append(make_q(
        "From %d students, in how many ways can a group of %d be chosen "
        "(order does not matter)?" % (n, r),
        ["ways = %d / %d" % (prod if False else math.factorial(n) //
                             math.factorial(n - r), math.factorial(r))],
        str(cnr)))
    n = ri(rng, 4, 9)
    out.append(make_q(
        "How many circular arrangements (necklaces around a round table) can "
        "%d people make?" % n,
        ["ways = %d" % math.factorial(n - 1)],
        str(math.factorial(n - 1))))
    na, nb, nab = ri(rng, 5, 15), ri(rng, 5, 15), ri(rng, 1, 5)
    out.append(make_q(
        "In a class of music lovers, %d like pop, %d like rock and %d like "
        "both. How many like pop or rock (union)?" % (na, nb, nab),
        ["union = %d + %d - %d" % (na, nb, nab)],
        str(na + nb - nab)))
    nu = ri(rng, 20, 40)
    na = ri(rng, 5, 15)
    out.append(make_q(
        "The universal set has %d elements and set A has %d elements. Find "
        "n(A')." % (nu, na),
        ["comp = %d - %d" % (nu, na)],
        str(nu - na)))
    a, b = ri(rng, 2, 6), ri(rng, 2, 6)
    out.append(make_q(
        "An interval runs from %d to %d on the number line. Find its length."
        % (a, a + b),
        ["length = %d - %d" % (a + b, a)],
        str(b)))
    n = ri(rng, 3, 7)
    out.append(make_q(
        "Expand (1 + x)^%d: how many terms does the expansion have?" % n,
        ["terms = %d + 1" % n],
        str(n + 1)))
    out.append(make_q(
        "Find the sum of all binomial coefficients in the expansion of "
        "(1 + x)^%d." % n,
        ["total = 2 ** %d" % n],
        str(2 ** n)))
    total = ri(rng, 5, 8)
    collinear = ri(rng, 2, 4)
    lines = math.comb(total, 2) - math.comb(collinear, 2) + 1
    out.append(make_q(
        "%d points are in a plane with exactly %d of them collinear. How "
        "many straight lines do they determine?" % (total, collinear),
        ["pairs = %d * %d / 2" % (total, total - 1),
         "dup = %d * %d / 2" % (collinear, collinear - 1),
         "lines = pairs - dup + 1"],
        str(lines)))
    p = pick(rng, [(7, 3), (11, 4), (12, 2), (15, 3)])
    out.append(make_q(
        "In modular arithmetic find the remainder when %d is divided by %d."
        % (p[0], p[1]),
        ["rem = %d %% %d" % (p[0], p[1])],
        str(p[0] % p[1])))
    base = ri(rng, 2, 8)
    k = ri(rng, 2, 5)
    out.append(make_q(
        "Find the last digit of %d^%d by computing %d^%d %% 10."
        % (base, k, base, k),
        ["rem = %d ** %d %% 10" % (base, k)],
        str(base ** k % 10)))
    truth_p, truth_q = pick(rng, [(1, 0), (1, 1), (0, 1), (0, 0)])
    out.append(make_q(
        "Encode True as 1 and False as 0. If p = %d and q = %d, find the "
        "truth value of (p and q) as p x q." % (truth_p, truth_q),
        ["val = %d * %d" % (truth_p, truth_q)],
        str(truth_p * truth_q)))
    out.append(make_q(
        "With p = %d and q = %d encoded as 1/0, find the truth value of "
        "(p or q) as p + q - p x q." % (truth_p, truth_q),
        ["val = %d + %d - %d * %d" % (truth_p, truth_q, truth_p, truth_q)],
        str(truth_p or truth_q)))
    shift = ri(rng, 1, 6)
    pos = ri(rng, 3, 20)
    out.append(make_q(
        "In a coding-decoding puzzle, each letter moves %d places ahead "
        "(cyclic over 26). If a letter sits at position %d, find its new "
        "position." % (shift, pos),
        ["newpos = (%d + %d - 1) %% 26 + 1" % (pos, shift)],
        str((pos + shift - 1) % 26 + 1)))
    return out


# ------------------------------------------------------------------ #
# index numbers / financial applied
# ------------------------------------------------------------------ #

@family("index_fin")
def _index_fin(rng):
    out = []
    cur = ri(rng, 110, 160)
    base = 100
    out.append(make_q(
        "A price index uses base year value 100. If the current value is "
        "%d, find the index number." % cur,
        ["idx = %d / %d * 100" % (cur, base)],
        str(cur)))
    items = [ri(rng, 5, 20) for _ in range(3)]
    basep = [ri(rng, 4, 18) for _ in range(3)]
    sc = sum(items)
    sb = sum(basep)
    idx_val = sc / sb * 100
    out.append(make_q(
        "For 3 commodities the current-year prices are %s and the base-year "
        "prices are %s. Find the simple aggregative price index (two decimal "
        "places)." % (", ".join(map(str, items)), ", ".join(map(str, basep))),
        ["idx = (%s) / (%s) * 100"
         % (" + ".join(map(str, items)), " + ".join(map(str, basep)))],
        fmt_num(round(idx_val, 2))))
    out.append(make_q(
        "A Laspeyres price index is %.2f and the corresponding Paasche price "
        "index is %.2f. Find the time reversal factor L x P / 10000 (two "
        "decimal places)." % (idx_val, idx_val),
        ["tr = %.2f * %.2f / 10000" % (idx_val, idx_val)],
        fmt_num(round(idx_val * idx_val / 10000, 2))))
    a = ri(rng, 20, 80)
    b = ri(rng, 2, 8)
    out.append(make_q(
        "A linear trend line is y = %d + %d x. Find the fitted value at "
        "x = 5." % (a, b),
        ["y = %d + %d * 5" % (a, b)],
        str(a + b * 5)))
    q1, c1 = ri(rng, 2, 9), ri(rng, 2, 9)
    q2, c2 = ri(rng, 2, 9), ri(rng, 2, 9)
    out.append(make_q(
        "Two mixtures cost Rs %d per kg (%d kg) and Rs %d per kg (%d kg). "
        "Find the mean price by alligation (two decimal places)."
        % (c1, q1, c2, q2),
        ["mean = (%d * %d + %d * %d) / (%d + %d)"
         % (q1, c1, q2, c2, q1, q2)],
        fmt_num(round((q1 * c1 + q2 * c2) / (q1 + q2), 2))))
    x = pick(rng, [40, 60, 80])
    y = pick(rng, [8, 10, 16, 20])
    out.append(make_q(
        "A vessel holds %d litres; %d litres are drawn and replaced with "
        "water, once. How much of the original liquid remains?" % (x, y),
        ["left = %d * ((%d - %d) / %d) ** 1" % (x, x, y, x)],
        fmt_num(x - y)))
    rate = pick(rng, [(2, 12), (3, 20), (4, 24), (5, 25)])
    out.append(make_q(
        "An investment grows at 10%% per year. Using (1.1)^3 = 1.331, find "
        "the CAGR in percent for a value that rose from 1000 to 1331 in 3 "
        "years." if True else "",
        ["g = (1331 / 1000) ** (1 / 3) - 1", "pct = g * 100"],
        "10"))
    pay = ri(rng, 1000, 5000)
    r_pct = pick(rng, [10, 20, 25])
    n_yrs = 3
    growth = (1 + r_pct / 100.0) ** n_yrs
    out.append(make_q(
        "Find the future value of an annuity of Rs %d per year for %d years "
        "at %d%% interest (use ((1 + r)^n - 1) / r, two decimal places)."
        % (pay, n_yrs, r_pct),
        ["fv = %d * ((1 + %d / 100) ** %d - 1) / (%d / 100)"
         % (pay, r_pct, n_yrs, r_pct)],
        fmt_num(round(pay * (growth - 1) / (r_pct / 100.0), 2))))
    out.append(make_q(
        "Find the present value of a perpetuity paying Rs %d yearly at %d%% "
        "per annum." % (pay, r_pct),
        ["pv = %d / (%d / 100)" % (pay, r_pct)],
        fmt_num(pay * 100 / r_pct)))
    k = (1 + r_pct / 100.0) ** n_yrs
    out.append(make_q(
        "A loan of Rs 100000 at %d%% for %d years: compute the factor "
        "(1 + r)^n used in the EMI formula (three decimal places)."
        % (r_pct, n_yrs),
        ["k = (1 + %d / 100) ** %d" % (r_pct, n_yrs)],
        fmt_num(round(k, 3))))
    cost = ri(rng, 40, 90) * 1000
    dep = pick(rng, [10, 15, 20])
    val = cost * (1 - dep / 100.0) ** 2
    out.append(make_q(
        "A machine costing Rs %d depreciates at %d%% per year (written down "
        "value method). Find its book value after 2 years (two decimal "
        "places)." % (cost, dep),
        ["value = %d * (1 - %d / 100) ** 2" % (cost, dep)],
        fmt_num(round(val, 2))))
    return out
