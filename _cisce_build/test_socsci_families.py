# test_socsci_families.py -- hand-verified textbook-style cases for
# socsci_families.py (classes 6-12 social-science numeric core).
#
# Every expected value below was computed by hand from the governing rule
# AND cross-checked against the corpus worked examples cited in the module
# docstring (c11_geo_cbse_08_*, c12_geo_cbse_09_*, c8_civ_ch1_5,
# c9_civ_ch2_10, c10_histciv_icse_01_*, c10_histciv_icse_07_*).  Numeric
# tolerance 1% (or 0.05 abs).
#
# Four gates must ALL pass for exit code 0:
#   1. CASES     -- value + family + answer-substring correctness
#   2. GATES     -- undatable / off-domain states must gate out (no number)
#   3. NEGATIVE  -- other-subject probes must not match any socsci family
#   4. STEP CONTRACT -- every matched result carries the 5-beat steps output:
#        beat 1 Method: (rule + why it applies), beat 2 Given: (figures with
#        units), computation shown, beat 4 Check: (substitute back / recount),
#        beat 5 Interpretation: in context; >= 3 steps and >= 150 chars.
import sys

sys.path.insert(0, "D:/platform")
from backend.its.solver.socsci_families import model_socsci

# (question, expected_numeric, expect_structure, expected_answer_sub)
CASES = [  # "socsci-harness-anchor"
    ("If it is 12:00 noon (IST) at the Standard Meridian 82°30′E, what is the local time at 68°E in western Gujarat?", 11.0333333, "TIME_ZONE_LONGITUDE", "11:02 AM local solar time at 68°E"),
    ("The local time at 97°E when it is 6:00 AM at 82°30′E?", 6.9666667, "TIME_ZONE_LONGITUDE", "6:58 AM local solar time at 97°E"),
    ("Calculate the time difference in minutes between the westernmost (68°7′E) and easternmost (97°25′E) longitudes.", 117.2, "TIME_ZONE_LONGITUDE", "117.2 minutes = 1 h 57 min (east ahead)"),
    ("If it is 2:00 PM IST (UTC+5:30), what is the UTC time?", 8.5, "TIME_ZONE_LONGITUDE", "8:30 AM UTC"),
    ("City A is at 30°E and City B is at 60°E. If it is 10:00 AM at City A, what is the local time at City B?", 12.0, "TIME_ZONE_LONGITUDE", "12:00 PM local solar time at 60°E"),
    ("The population of a state was 82,998,509 in 2001 and its area is 94,163 sq km. Calculate the population density.", 881.42, "POP_DENSITY", "881.434 persons per sq km"),
    ("In a district 280 live births and 100 deaths were registered in a year, and the mid-year population is 20,000. Find the CBR and the natural growth rate.", 9.0, "VITAL_STATS", "natural growth = 9 per 1000"),
    ("The crude birth rate of a country is 28 per 1000 and the crude death rate is 8 per 1000. Find the natural growth rate.", 20.0, "VITAL_STATS", "Natural growth = 20 per 1000 (2%)"),
    ("The population of India was 1028.7 million in 2001 and 1210.9 million in 2011. Calculate the decadal growth rate.", 17.71, "POP_GROWTH", "Decadal growth = 17.7117%"),
    ("The natural increase rate of a country is 1.63% per year. Using the rule of 70, estimate its population doubling time.", 42.9448, "POP_GROWTH", "Doubling time = 42.9448 years by the rule of"),
    ("The annual growth rate of a population is 2%. Using the rule of 70, find the doubling time.", 35.0, "POP_GROWTH", "Doubling time = 35 years by the rule of 70 ("),
    ("In a town there are 48,000 females and 52,000 males. Calculate the sex ratio.", 923.0769, "SEX_RATIO_LITERACY", "923.077 females per 1000 males"),
    ("In a city of 200,000 people, 150,600 are literate. Calculate the literacy rate.", 75.3, "SEX_RATIO_LITERACY", "Literacy rate = 75.3%"),
    ("A station records monthly rainfall (mm): Jan 18, Feb 9, Mar 11, Apr 22, May 58, Jun 130, Jul 310, Aug 285, Sep 180, Oct 65, Nov 25, Dec 12. Calculate the annual rainfall and name the rainiest and driest months.", 1125.0, "CLIMATE_TABLE", "Annual rainfall = 1125 mm; rainiest month ju"),
    ("Annual rainfall at Station X over 10 years: 820, 760, 910, 680, 850, 720, 890, 650, 940, 780 mm. Find the average annual rainfall.", 800.0, "CLIMATE_TABLE", "Average annual rainfall = 800 mm"),
    ("On a topographic map with an R.F. of 1:50,000, the distance between two points is 3.5 cm. Find the actual ground distance.", 1.75, "MAP_SCALE", "Ground distance = 1.75 km"),
    ("The scale of a map of India is 1 cm = 150 km. If the distance between two cities on the map is 18.5 cm, find the actual distance.", 2775.0, "MAP_SCALE", "Ground distance = 2,775 km"),
    ("A map has a scale of 1 cm = 200 km. Two towns are 600 km apart. What is their distance on the map?", 3.0, "MAP_SCALE", "Map distance = 3 cm"),
    ("In a constituency with 1,000,000 registered voters, four candidates contest: Candidate A receives 350,000 votes, Candidate B receives 300,000 votes, Candidate C receives 200,000 votes and Candidate D receives 150,000 votes. Who wins under FPTP and does the winner have an absolute majority?", 35.0, "FPTP_WINNER", "Candidate A wins (plurality) with 35% of vot"),
    ("A party won 303 seats in the 543-seat Lok Sabha with 37.4% of the valid votes. Calculate its seat share.", 55.8011, "SEAT_VOTE_SHARE", "Seat share = 55.8011% vs vote share 37.4% (g"),
    ("In State B a party won 22 out of 25 seats with 55% of the votes. Find the seat share.", 88.0, "SEAT_VOTE_SHARE", "Seat share = 88% vs vote share 55% (gap +33"),
    ("What is the majority mark in the Lok Sabha (543 elected members)?", 272.0, "MAJORITY_COUNT", "Majority mark = 272 of 543 seats"),
    ("A constitutional amendment bill is considered in a House with a total membership of 250. On the day of voting, 180 members are present and voting. How many votes are needed to pass it by special majority?", 126.0, "MAJORITY_COUNT", "Special majority needs 126 votes (2/3 of pre"),
    ("Of 300 members present and voting in a House, how many votes does a bill need to pass by simple majority?", 151.0, "MAJORITY_COUNT", "Majority mark = 151 of 300 seats"),
    ("Calculate the minimum number of members required to constitute a quorum in the Lok Sabha if the total membership is 552.", 55.2, "MAJORITY_COUNT", "Quorum = 55.2 -> 55 members"),
    ("After the 2024 Lok Sabha elections Party A wins 240 seats, Party B wins 50 seats, Party C wins 30 seats and Party D wins 20 seats. The Lok Sabha has 543 seats. Does Party A alone have a majority? Can A, B, C and D together form a government?", 340.0, "COALITION_COUNT", "Coalition (A, B, C, D) = 340 of 543 seats (m"),
    ("The BJP won 104 seats, the Congress has 80 seats and JD(S) has 37 seats in a 224-member assembly. The Congress and JD(S) formed a post-poll coalition. Can they form the government?", 117.0, "COALITION_COUNT", "Coalition (Congress, JD(S)) = 117 of 224 sea"),
    ("How many years passed between the Revolt of 1857 and Indian independence in 1947?", 90.0, "CHRONO_INTERVAL", "90 years between Revolt of 1857 (1857) and I"),
    ("How many years after the French Revolution (1789) did India gain independence (1947)?", 158.0, "CHRONO_INTERVAL", "158 years between French Revolution (1789) a"),
    ("The Non-Cooperation Movement lasted from 1920 to 1922. How long did it last?", 2.0, "CHRONO_INTERVAL", "Non-Cooperation Movement lasted 2 years"),
    ("In which century did the Revolt of 1857 take place?", 19.0, "CENTURY_DECADE", "1857 falls in the 19th century, decade 1850s"),
    ("Arrange the following in chronological order: Quit India Movement, Non-Cooperation Movement, Civil Disobedience Movement, Revolt of 1857.", 1857.0, "TIMELINE_ORDER", "Quit India Movement (1942)"),
]
# undatable / off-domain states: the families must gate out (no number)
GATES = [
    "The population density of a metal is 7.8 g/cm3 and its mass is 156 g. Find the volume.",
    "How long did the Swadeshi Movement last?",
    "Find the population of a town after 3 years if it grows at 5% per annum from 20,000.",
    "What is the majority mark in a panchayat house of 4 members?",
    "The scale of a map is 1:100000 and a field measures 6 sq cm on the map. Find the actual area in sq km.",
    "A station records monthly rainfall (mm): Jan 5, Feb 8. Calculate the annual rainfall.",
    "Find the sex ratio of a district with 940 females.",
]

# other-subject probes: socsci families must stay silent (no match at all)
NEGATIVE = [
    "Balance the chemical equation H2 + O2 -> H2O.",
    "Two forces of 5 N and 12 N act at right angles. Find the resultant force.",
    "Find the EMI for a loan of Rs 100000 at 9% per annum for 3 years.",
    "Find the compound interest on Rs 10,000 at 8% per annum for 2 years compounded annually.",
    "The population of a town grows at 5% per annum; find the population after 3 years if it is now 20,000.",
    "The population of bacteria in a culture doubles every hour. Find the count after 5 hours.",
    "Find the demand equilibrium when Qd = 100 - 5P and Qs = 40 + 5P.",
    "The reserve ratio is 10%. Find the money multiplier.",
    "Differentiate x^2 sin x with respect to x.",
    "Find the area of a triangle with base 10 cm and height 5 cm.",
    "Ravi was born in 1990. How old will he be in 2020?",
    "A train leaves Delhi at 9:00 AM and travels for 5 hours. When does it arrive?",
    "Find 2/3 of 90.",
]


def contract_errors(r):
    """STEP CONTRACT: 5 ordered beats, >=3 steps, >=150 chars."""
    st = r.steps or []
    errs = []
    if len(st) < 3:
        errs.append("steps<3")
    if sum(len(s) for s in st) < 150:
        errs.append("chars<150")
    if not st or not st[0].lower().startswith("method"):
        errs.append("beat1-Method-missing")
    if len(st) < 2 or not st[1].lower().startswith("given"):
        errs.append("beat2-Given-missing")
    if not any(s.lower().startswith("check") for s in st):
        errs.append("beat4-Check-missing")
    if not st or not st[-1].lower().startswith("interpretation"):
        errs.append("beat5-Interpretation-missing")
    return errs


passed = failed = unmatched = wrongfam = contract_fails = 0
details = []
for text, expected, fam, sub in CASES:
    r = model_socsci(text)
    if not r.matched:
        unmatched += 1
        details.append(("UNMATCHED", text[:70]))
        continue
    if r.structure != fam:
        wrongfam += 1
        details.append(("WRONG-FAM", text[:70],
                        f"expected {fam}, got {r.structure}"))
        continue
    got = r.numeric_answer
    ok = got is not None and abs(got - expected) <= max(0.05, abs(expected) * 0.01)
    if not ok:
        failed += 1
        details.append(("WRONG", text[:70], f"expected {expected}, got {got}"))
        continue
    if sub.lower().replace(",", "") not in (r.final_answer or "").lower().replace(",", ""):
        failed += 1
        details.append(("BAD-ANSWER", text[:70],
                        f"missing '{sub}' in '{r.final_answer}'"))
        continue
    cerr = contract_errors(r)
    if cerr:
        contract_fails += 1
        details.append(("CONTRACT", r.structure, cerr, text[:60]))
        continue
    passed += 1

gate_ok = 0
gate_details = []
for text in GATES:
    r = model_socsci(text)
    if not r.matched:
        gate_ok += 1
    else:
        gate_details.append(("SHIPPED-NUMBER", text[:70],
                             f"{r.structure}: {r.numeric_answer}"))

neg_ok = 0
neg_details = []
for text in NEGATIVE:
    r = model_socsci(text)
    if not r.matched:
        neg_ok += 1
    else:
        neg_details.append(("FALSE-POSITIVE", text[:70],
                            f"fired {r.structure}: {r.numeric_answer}"))

total = len(CASES)
print(f"PASS {passed} | FAIL {failed} | UNMATCHED {unmatched} | "
      f"WRONG-FAM {wrongfam}  (of {total})")
for d in details:
    print("  ", d)
print(f"GATE REFUSALS: {gate_ok}/{len(GATES)} refused (correct)")
for d in gate_details:
    print("  ", d)
print(f"NEGATIVE (other-subject) PROBES: {neg_ok}/{len(NEGATIVE)} silent "
      "(correct)")
for d in neg_details:
    print("  ", d)
print(f"STEP CONTRACT: {total - contract_fails}/{total} matched results carry "
      "the 5 beats (Method/Given/computation/Check/Interpretation, >=3 "
      "steps, >=150 chars)")
sys.exit(0 if (passed == total and gate_ok == len(GATES)
               and neg_ok == len(NEGATIVE) and contract_fails == 0) else 1)
