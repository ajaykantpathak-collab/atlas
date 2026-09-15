"""fam_comm.py -- percentages, profit/loss/discount/tax, interest,
ratio-proportion-variation, time-work-speed families."""
from __future__ import annotations

from qbank_lib import family, make_q, ri, pick, frac_str, fmt_num


# ------------------------------------------------------------------ #
# percentages
# ------------------------------------------------------------------ #

@family("pct_core")
def _pct_core(rng):
    out = []
    pct = pick(rng, [5, 10, 15, 20, 25, 30, 40, 50, 60, 75])
    total = pick(rng, [40, 60, 80, 120, 200, 240, 320, 400, 500, 600])
    out.append(make_q(
        "Find %d%% of %d." % (pct, total),
        ["val = %d / 100 * %d" % (pct, total)],
        fmt_num(pct * total / 100)))
    num, den = pick(rng, [(3, 4), (2, 5), (7, 10), (9, 20), (3, 8), (5, 16)])
    out.append(make_q(
        "Convert the fraction %d/%d into a percentage." % (num, den),
        ["pct = %d / %d * 100" % (num, den)],
        fmt_num(num * 100 / den)))
    d = pick(rng, [(12, 100), (45, 100), (125, 100), (7, 100)])
    out.append(make_q(
        "Express the decimal %.2f as a percentage." % (d[0] / d[1]),
        ["pct = %.2f * 100" % (d[0] / d[1])],
        fmt_num(d[0])))
    old = ri(rng, 20, 200)
    new = ri(rng, old + 1, old + 150)
    out.append(make_q(
        "The price of a cycle rose from Rs %d to Rs %d. Find the percentage "
        "increase (rounded to two decimal places)." % (old, new),
        ["change = %d - %d" % (new, old), "pct = change / %d * 100" % old],
        fmt_num(round((new - old) * 100.0 / old, 2))))
    old = ri(rng, 50, 400)
    drop = ri(rng, 5, old - 5)
    out.append(make_q(
        "A quantity fell from %d to %d. What is the percentage decrease "
        "(two decimal places)?" % (old, old - drop),
        ["change = %d - %d" % (old, old - drop), "pct = change / %d * 100" % old],
        fmt_num(round(drop * 100.0 / old, 2))))
    part = ri(rng, 10, 90)
    whole = pick(rng, [100, 120, 150, 200, 250, 300, 400])
    out.append(make_q(
        "What percentage of %d is %d?" % (whole, part),
        ["pct = %d / %d * 100" % (part, whole)],
        fmt_num(part * 100.0 / whole)))
    pct = pick(rng, [20, 25, 40, 50])
    val = pct * pick(rng, [4, 8, 12, 16, 20])
    out.append(make_q(
        "%d%% of a number is %d. Find the number." % (pct, val),
        ["num = %d * 100 / %d" % (val, pct)],
        fmt_num(val * 100 / pct)))
    a, b, c = 3, 4, 8
    out.append(make_q(
        "Two quantities are mixed in the ratio %d : %d. What percentage of "
        "the whole is the first part?" % (a, b),
        ["pct = %d / (%d + %d) * 100" % (a, a, b)],
        fmt_num(a * 100.0 / (a + b))))
    marks = ri(rng, 30, 95)
    mx = pick(rng, [80, 100, 120, 150])
    out.append(make_q(
        "A student scored %d out of %d. Find the score as a percentage."
        % (marks, mx),
        ["pct = %d / %d * 100" % (marks, mx)],
        fmt_num(round(marks * 100.0 / mx, 2))))
    return out


@family("profit_loss")
def _profit_loss(rng):
    out = []
    cp = pick(rng, [120, 150, 200, 240, 250, 300, 360, 400, 450, 500, 800])
    pp = pick(rng, [10, 15, 20, 25, 30, 40, 50])
    sp = cp + cp * pp // 100
    out.append(make_q(
        "A trader buys an article for Rs %d and sells it for Rs %d. Find the "
        "profit." % (cp, sp),
        ["profit = %d - %d" % (sp, cp)],
        str(sp - cp)))
    out.append(make_q(
        "Cost price Rs %d, selling price Rs %d. Find the profit percentage."
        % (cp, sp),
        ["profit = %d - %d" % (sp, cp), "pct = profit / %d * 100" % cp],
        fmt_num((sp - cp) * 100.0 / cp)))
    lp = pick(rng, [10, 20, 25, 40, 50])
    sp2 = cp - cp * lp // 100
    out.append(make_q(
        "An article costing Rs %d is sold for Rs %d. Find the loss percentage."
        % (cp, sp2),
        ["loss = %d - %d" % (cp, sp2), "pct = loss / %d * 100" % cp],
        fmt_num((cp - sp2) * 100.0 / cp)))
    cp3 = pick(rng, [200, 250, 300, 400, 500])
    pp3 = pick(rng, [10, 20, 25, 50])
    sp3 = cp3 + cp3 * pp3 // 100
    out.append(make_q(
        "A shopkeeper wants a %d%% profit on an article costing Rs %d. At "
        "what price should he sell it?" % (pp3, cp3),
        ["sp = %d * (1 + %d / 100)" % (cp3, pp3)],
        fmt_num(cp3 * (1 + pp3 / 100.0))))
    mp = pick(rng, [400, 500, 600, 800, 1000, 1200])
    dp = pick(rng, [5, 10, 15, 20, 25, 30])
    out.append(make_q(
        "The marked price of a jacket is Rs %d and the shop offers a %d%% "
        "discount. What is the sale price?" % (mp, dp),
        ["disc = %d * %d / 100" % (mp, dp), "sp = %d - disc" % mp],
        fmt_num(mp - mp * dp / 100.0)))
    out.append(make_q(
        "An item marked at Rs %d sells for Rs %d after a discount. Find the "
        "discount percentage." % (mp, mp - mp * dp // 100),
        ["disc = %d - %d" % (mp, mp - mp * dp // 100),
         "pct = disc / %d * 100" % mp],
        fmt_num(dp)))
    price = pick(rng, [500, 800, 1000, 1200, 2000])
    tax = pick(rng, [5, 8, 12, 18, 28])
    out.append(make_q(
        "The price of a phone is Rs %d before tax and GST is %d%%. Find the "
        "bill amount." % (price, tax),
        ["tax_amt = %d * %d / 100" % (price, tax), "bill = %d + tax_amt" % price],
        fmt_num(price + price * tax / 100.0)))
    out.append(make_q(
        "A bill of Rs %s includes %d%% sales tax. Find the price before tax "
        "(two decimal places)." % (fmt_num(price + price * tax / 100.0), tax),
        ["base = %s / (1 + %d / 100)" % (fmt_num(price + price * tax / 100.0), tax)],
        fmt_num(round(price + price * tax / 100.0, 2))))
    return out


@family("interest")
def _interest(rng):
    out = []
    p = pick(rng, [1000, 2000, 2500, 4000, 5000, 6000, 8000, 10000, 12000])
    r = pick(rng, [4, 5, 6, 8, 10, 12])
    t = pick(rng, [2, 3, 4, 5])
    si = p * r * t / 100.0
    out.append(make_q(
        "Find the simple interest on Rs %d at %d%% per annum for %d years."
        % (p, r, t),
        ["si = %d * %d * %d / 100" % (p, r, t)],
        fmt_num(si)))
    out.append(make_q(
        "Rs %d is deposited at %d%% simple interest per annum for %d years. "
        "Find the maturity amount." % (p, r, t),
        ["si = %d * %d * %d / 100" % (p, r, t), "amount = %d + si" % p],
        fmt_num(p + si)))
    out.append(make_q(
        "A sum lent at %d%% per annum simple interest earns Rs %s in %d "
        "years. Find the principal (two decimal places)."
        % (r, fmt_num(si), t),
        ["principal = %s * 100 / (%d * %d)" % (fmt_num(si), r, t)],
        fmt_num(round(si * 100 / (r * t), 2))))
    t2 = pick(rng, [2, 3])
    amt = p * (1 + r / 100.0) ** t2
    ci = amt - p
    out.append(make_q(
        "Find the compound interest on Rs %d at %d%% per annum for %d years, "
        "compounded annually (two decimal places)." % (p, r, t2),
        ["amount = %d * (1 + %d / 100) ** %d" % (p, r, t2),
         "ci = amount - %d" % p],
        fmt_num(round(ci, 2))))
    out.append(make_q(
        "What amount is owed after Rs %d grows for %d years at %d%% per "
        "annum compounded annually (two decimal places)?" % (p, t2, r),
        ["amount = %d * (1 + %d / 100) ** %d" % (p, r, t2)],
        fmt_num(round(amt, 2))))
    rate = pick(rng, [8, 10, 12])
    yrs = 2
    amt2 = p * (1 + rate / 200.0) ** (2 * yrs)
    out.append(make_q(
        "Find the amount on Rs %d at %d%% per annum compounded half-yearly "
        "for %d years (two decimal places)." % (p, rate, yrs),
        ["amount = %d * (1 + %d / 200) ** %d" % (p, rate, 2 * yrs)],
        fmt_num(round(amt2, 2))))
    dep = pick(rng, [10, 12, 15, 20])
    val = p * (1 - dep / 100.0) ** 2
    out.append(make_q(
        "A machine bought for Rs %d depreciates at %d%% per year. Find its "
        "value after 2 years (two decimal places)." % (p, dep),
        ["value = %d * (1 - %d / 100) ** 2" % (p, dep)],
        fmt_num(round(val, 2))))
    grow = pick(rng, [5, 10, 20])
    pop = p * (1 + grow / 100.0) ** 2
    out.append(make_q(
        "A town's population of %d grows at %d%% per annum. Find the "
        "population after 2 years (two decimal places)." % (p, grow),
        ["pop = %d * (1 + %d / 100) ** 2" % (p, grow)],
        fmt_num(round(pop, 2))))
    return out


# ------------------------------------------------------------------ #
# ratio, proportion, variation
# ------------------------------------------------------------------ #

@family("ratio_prop")
def _ratio_prop(rng):
    out = []
    h = pick(rng, [2, 3, 4, 5, 6, 8, 10])
    a, b = h * ri(rng, 1, 6), h * ri(rng, 7, 12)
    if a == b:
        b += h
    out.append(make_q(
        "Write the ratio %d : %d in its simplest form and give the first "
        "term of the simplest form." % (a, b),
        ["t1 = %d / %d" % (a, h)],
        str(a // h)))
    p1, p2 = ri(rng, 1, 5), ri(rng, 6, 9)
    if p1 == p2:
        p2 += 1
    unit = pick(rng, [20, 30, 40, 50, 60, 80, 100])
    total = unit * (p1 + p2)
    share = unit * p1
    out.append(make_q(
        "Rs %d is divided between two friends in the ratio %d : %d. Find the "
        "smaller share." % (total, p1, p2),
        ["share = %d * %d / (%d + %d)" % (total, p1, p1, p2)],
        str(share)))
    total3 = 6 * pick(rng, [20, 30, 40, 50, 60, 80, 100])
    out.append(make_q(
        "Rs %d is split in the ratio %d : %d : %d. Find the largest share."
        % (total3, 1, 2, 3),
        ["share = %d * 3 / (1 + 2 + 3)" % total3],
        str(total3 * 3 // 6)))
    a2 = ri(rng, 2, 9)
    b2 = ri(rng, 2, 9)
    k2 = ri(rng, 2, 5)
    c2 = a2 * k2
    d2 = b2 * k2
    out.append(make_q(
        "Find the missing term: %d : %d = %d : ?  (give the fourth term)."
        % (a2, b2, c2),
        ["d = %d * %d / %d" % (b2, c2, a2)],
        str(d2)))
    out.append(make_q(
        "Check the proportion %d : %d :: %d : %d by computing the cross "
        "products and give the value of ad - bc." % (a2, b2, c2, d2),
        ["cross = %d * %d - %d * %d" % (a2, d2, b2, c2)],
        str(a2 * d2 - b2 * c2)))
    x1 = pick(rng, [2, 4, 5, 8, 10])
    y1 = pick(rng, [30, 40, 60, 80, 100, 120])
    x2 = pick(rng, [4, 6, 8, 12, 15, 20])
    out.append(make_q(
        "If %d notebooks cost Rs %d, what will %d notebooks cost at the same "
        "rate (direct proportion)?" % (x1, y1, x2),
        ["cost = %d * %d / %d" % (y1, x2, x1)],
        fmt_num(y1 * x2 / x1)))
    speed1 = pick(rng, [20, 30, 40, 60])
    time1 = pick(rng, [4, 6, 8, 10, 12])
    speed2 = pick(rng, [60, 80, 120])
    out.append(make_q(
        "A car moving at %d km/h covers a trip in %d hours. How long will the "
        "same trip take at %d km/h (inverse proportion)?" % (speed1, time1, speed2),
        ["time = %d * %d / %d" % (speed1, time1, speed2)],
        fmt_num(speed1 * time1 / speed2)))
    scale = pick(rng, [100000, 500000, 1000000, 2000000])
    mapcm = ri(rng, 2, 12)
    out.append(make_q(
        "On a map with scale 1 cm : %d cm, two towns are %d cm apart. Find "
        "the actual distance in cm." % (scale, mapcm),
        ["dist = %d * %d" % (mapcm, scale)],
        str(mapcm * scale)))
    celsius = ri(rng, 25, 45)
    out.append(make_q(
        "Convert %d degrees Celsius to Fahrenheit using F = 9/5 C + 32."
        % celsius,
        ["f = 9 / 5 * %d + 32" % celsius],
        fmt_num(9 / 5 * celsius + 32)))
    pens = ri(rng, 3, 8)
    cost1 = pens * pick(rng, [5, 10, 15, 20])
    out.append(make_q(
        "If %d pens cost Rs %d, what is the cost of 1 pen (unitary method)?"
        % (pens, cost1),
        ["unit = %d / %d" % (cost1, pens)],
        fmt_num(cost1 / pens)))
    return out


# ------------------------------------------------------------------ #
# time, work, speed
# ------------------------------------------------------------------ #

@family("work_rate")
def _work_rate(rng):
    out = []
    a, b = pick(rng, [(4, 6), (6, 12), (3, 6), (10, 15), (4, 12), (8, 8), (5, 20)])
    out.append(make_q(
        "A can finish a job in %d days and B in %d days. Working together, "
        "how many days will they take (two decimal places)?" % (a, b),
        ["rate = 1 / %d + 1 / %d" % (a, b), "days = 1 / rate"],
        fmt_num(round(1 / (1 / a + 1 / b), 2))))
    fill, drain = pick(rng, [(4, 12), (6, 8), (3, 6), (8, 24)])
    out.append(make_q(
        "A pipe fills a tank in %d hours while a leak empties it in %d "
        "hours. With both open, how long to fill the tank (two decimal "
        "places)?" % (fill, drain),
        ["net = 1 / %d - 1 / %d" % (fill, drain), "time = 1 / net"],
        fmt_num(round(1 / (1 / fill - 1 / drain), 2))))
    d1, t1 = pick(rng, [(120, 3), (180, 3), (200, 4), (150, 2), (240, 4)])
    d2, t2 = pick(rng, [(100, 2), (160, 2), (180, 2), (120, 2)])
    out.append(make_q(
        "A bus covers %d km in %d hours and %d km in %d hours. Find its "
        "average speed for the whole journey." % (d1, t1, d2, t2),
        ["total_d = %d + %d" % (d1, d2), "total_t = %d + %d" % (t1, t2),
         "speed = total_d / total_t"],
        fmt_num((d1 + d2) / (t1 + t2))))
    men1, days1 = pick(rng, [(6, 12), (8, 15), (10, 6), (12, 8)])
    men2 = pick(rng, [4, 9, 16, 20, 24])
    out.append(make_q(
        "%d workers build a wall in %d days. How long would %d workers take "
        "(inverse proportion)?" % (men1, days1, men2),
        ["days = %d * %d / %d" % (men1, days1, men2)],
        fmt_num(men1 * days1 / men2)))
    dist = pick(rng, [24, 30, 36, 48, 60])
    still = pick(rng, [8, 10, 12])
    stream = pick(rng, [2, 3, 4])
    out.append(make_q(
        "A boat's downstresam speed is %d km/h and its upstream speed is %d "
        "km/h. Find the speed of the stream." % (still + stream, still - stream),
        ["stream = (%d - %d) / 2" % (still + stream, still - stream)],
        str(stream)))
    out.append(make_q(
        "A boat travels %d km upstream at %d km/h. How many hours does the "
        "trip take?" % (dist, still - stream),
        ["time = %d / %d" % (dist, still - stream)],
        fmt_num(dist / (still - stream))))
    c1, c2 = pick(rng, [(12, 6), (15, 10), (20, 5), (9, 18)])
    out.append(make_q(
        "Two taps fill a cistern in %d and %d minutes respectively. Find the "
        "time taken together, in minutes, to two decimal places." % (c1, c2),
        ["net = 1 / %d + 1 / %d" % (c1, c2), "time = 1 / net"],
        fmt_num(round(1 / (1 / c1 + 1 / c2), 2))))
    return out
