"""End-to-end test: Full student flow for each class (1-12)."""

import os, sys, json, time, requests
from datetime import datetime

from pathlib import Path
env_file = Path(r"D:\dream_app\.env")
if env_file.exists():
    for line in env_file.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        if "=" in line:
            key, _, value = line.partition("=")
            os.environ.setdefault(key.strip(), value.strip())

API = "http://localhost:8000"

with open(r"D:\platform\backend\content_parsers\_class_nodes.json") as f:
    CLASS_NODES = json.load(f)

TEST_QUERIES = {
    1: ["What is my name and address?", "Animals and their homes", "Addition of numbers"],
    2: ["Subtraction with borrowing", "Plants and their parts", "Grammar nouns and verbs"],
    3: ["Multiplication tables", "Human body parts", "Living and non-living things"],
    4: ["Fractions and decimals", "States of matter", "Indian geography"],
    5: ["Decimal operations", "Solar system planets", "English comprehension"],
    6: ["Integers and number line", "Plant life", "Ancient civilizations"],
    7: ["Algebraic expressions", "Heat and temperature", "Acids and bases"],
    8: ["Linear equations", "Light and reflection", "Chemical reactions"],
    9: ["Polynomials", "Laws of motion", "Cell structure"],
    10: ["Quadratic equations", "Electricity and circuits", "Photosynthesis"],
    11: ["Trigonometry basics", "Newton's laws of motion", "Periodic table"],
    12: ["Differential calculus", "Electromagnetic induction", "Organic chemistry"],
}

SOLVER_TESTS = [
    (10, "phy_optics", {"u": -15, "f": 10, "find": "v"}),
    (11, "phy_gravitation", {"M": 6e24, "r": 6.4e6, "type": "field", "find": "g"}),
    (12, "phy_magnetism", {"B": 0.5, "q": 1.6e-19, "v": 3e7, "type": "force_on_charge", "find": "f"}),
    (10, "chem_molar_mass", {"elements": {"H": 2, "S": 1, "O": 4}}),
    (11, "chem_stoichiometry", {"coeff_known": 2, "coeff_unknown": 2, "moles_known": 5, "molar_mass_unknown": 18, "find": "mass"}),
    (12, "acc_depreciation", {"cost": 50000, "salvage": 5000, "life": 5, "method": "SLM"}),
    (11, "appmath_statistics", {"data": [2, 4, 6, 8, 10], "find": "all"}),
    (12, "appmath_regression", {"x": [1, 2, 3, 4, 5], "y": [2, 4, 5, 4, 5], "find": "slope"}),
]


def test_api(method, path, body=None, timeout=60):
    try:
        url = API + path
        if method == "GET":
            r = requests.get(url, timeout=timeout)
        else:
            r = requests.post(url, json=body, timeout=timeout)
        if r.status_code == 200:
            return True, r.json(), None
        return False, None, "HTTP " + str(r.status_code) + ": " + r.text[:200]
    except Exception as e:
        return False, None, str(e)


def trunc(s, n=40):
    return s[:n] + ("..." if len(s) > n else "")


def test_class(cls_level):
    results = {"class": cls_level, "tests": [], "passed": 0, "failed": 0}
    cls_str = str(cls_level)

    def record(name, passed, detail=""):
        results["tests"].append({"name": name, "passed": passed, "detail": detail})
        if passed:
            results["passed"] += 1
        else:
            results["failed"] += 1

    queries = TEST_QUERIES.get(cls_level, ["general knowledge"])
    query = queries[0]
    q_label = trunc(query, 30)

    # 1. Socratic low mastery
    ok, data, err = test_api("POST", "/api/socratic/ask", {
        "query": query, "user_id": "e2e_class_" + str(cls_level), "mastery": 0.2,
    })
    if ok:
        retrieved = data.get("retrieved_count", 0)
        qtext = trunc(data.get("question", ""), 60)
        quality = data.get("quality_score", 0)
        errors = data.get("errors", [])
        ok2 = retrieved > 0 and len(errors) == 0
        detail = "retrieved=" + str(retrieved) + ", quality=" + str(round(quality, 2)) + ", Q='" + qtext + "'"
        if errors:
            detail += ", errors=" + str(errors)
        record("Socratic (low): " + q_label, ok2, detail)
    else:
        record("Socratic (low): " + q_label, False, err)

    # 2. Socratic high mastery
    ok, data, err = test_api("POST", "/api/socratic/ask", {
        "query": query, "user_id": "e2e_class_" + str(cls_level), "mastery": 0.8,
    })
    if ok:
        retrieved = data.get("retrieved_count", 0)
        ml = data.get("mastery_level", "")
        hl = data.get("hint_level", 0)
        ok2 = retrieved > 0 and ml == "high"
        record("Socratic (high): " + q_label, ok2,
               "retrieved=" + str(retrieved) + ", mastery=" + ml + ", hint=" + str(hl))
    else:
        record("Socratic (high): " + q_label, False, err)

    # 3. Socratic hint
    ok, data, err = test_api("POST", "/api/socratic/hint", {
        "query": query, "user_id": "e2e_class_" + str(cls_level), "mastery": 0.3,
    })
    if ok:
        hint = trunc(data.get("hint", ""), 60)
        record("Socratic hint: " + q_label, bool(hint), "hint='" + hint + "'")
    else:
        record("Socratic hint: " + q_label, False, err)

    # 4. Second query (medium mastery)
    if len(queries) > 1:
        q2 = queries[1]
        q2_label = trunc(q2, 30)
        ok, data, err = test_api("POST", "/api/socratic/ask", {
            "query": q2, "user_id": "e2e_class_" + str(cls_level), "mastery": 0.5,
        })
        if ok:
            retrieved = data.get("retrieved_count", 0)
            qtext = trunc(data.get("question", ""), 60)
            record("Socratic (med): " + q2_label, retrieved > 0,
                   "retrieved=" + str(retrieved) + ", Q='" + qtext + "'")
        else:
            record("Socratic (med): " + q2_label, False, err)

    # 5. Junior endpoints (classes 1-5)
    if cls_level <= 5:
        ok, data, err = test_api("GET", "/api/content/junior/mascots")
        record("Junior mascots", ok and len(data.get("mascots", [])) == 3,
               str(len(data.get("mascots", []))) + " mascots" if ok else err)

        ok, data, err = test_api("GET", "/api/content/junior/games?class_level=" + str(cls_level))
        record("Junior games (C" + str(cls_level) + ")",
               ok and data.get("count", 0) > 0,
               str(data.get("count", 0)) + " games" if ok else err)

        ok, data, err = test_api("GET", "/api/content/junior/rewards?user_id=e2e_class_" + str(cls_level))
        record("Junior rewards", ok and data.get("total_stars", 0) > 0,
               str(data.get("total_stars", 0)) + " stars" if ok else err)

        ok, data, err = test_api("GET", "/api/content/junior/lessons?class_level=" + str(cls_level) + "&limit=5")
        record("Junior lessons (C" + str(cls_level) + ")",
               ok and data.get("count", 0) >= 0,
               str(data.get("count", 0)) + " lessons" if ok else err)

    # 6. Solver (for specific classes)
    for test_cls, category, values in SOLVER_TESTS:
        if test_cls != cls_level:
            continue
        ok, data, err = test_api("POST", "/api/solver/v2/solve", {
            "category": category, "values": values,
        }, timeout=15)
        if ok:
            success = data.get("success", False)
            steps = len(data.get("steps", []))
            answer = trunc(data.get("final_answer", ""), 60)
            record("Solver: " + category, success,
                   "steps=" + str(steps) + ", answer='" + answer + "'")
        else:
            record("Solver: " + category, False, err)

    # 7. Bilingual content
    cls_nodes = CLASS_NODES.get(cls_str, {})
    if cls_nodes:
        first_subject = list(cls_nodes.keys())[0]
        first_node = cls_nodes[first_subject][0]
        node_id = first_node["node_id"]

        ok, data, err = test_api("GET", "/api/content/bilingual/" + node_id + "?lang=en")
        if ok:
            title = trunc(str(data.get("title", "")), 40)
            record("Bilingual (en): " + node_id, data is not None, "title='" + title + "'")
        else:
            record("Bilingual (en): " + node_id, False, err)

        ok, data, err = test_api("GET", "/api/content/bilingual/" + node_id + "?lang=hi")
        if ok:
            lang = data.get("lang", "")
            record("Bilingual (hi): " + node_id, lang in ("hi", "en"), "lang=" + lang)
        else:
            record("Bilingual (hi): " + node_id, False, err)

    # 8. Analytics events
    ok, data, err = test_api("GET", "/api/analytics/events?hours=24")
    if ok:
        event_count = sum(data.values()) if isinstance(data, dict) else 0
        record("Analytics events (24h)", event_count > 0, str(event_count) + " events")
    else:
        record("Analytics events (24h)", False, err)

    return results


def main():
    print("=" * 80)
    print("END-TO-END TEST: FULL STUDENT FLOW FOR EACH CLASS (1-12)")
    print("=" * 80)
    print("API: " + API)
    print("Time: " + datetime.now().isoformat())
    print()

    ok, data, err = test_api("GET", "/health")
    if not ok:
        print("ERROR: Backend not running: " + str(err))
        return
    svc = data["services"]
    print("Backend: " + data["status"] + " (pg=" + str(svc["postgres"]) + " neo4j=" + str(svc["neo4j"]) + " redis=" + str(svc["redis"]) + " qdrant=" + str(svc["qdrant"]) + ")")
    print()

    all_results = []
    total_pass = 0
    total_fail = 0

    for cls in range(1, 13):
        print("")
        print("-" * 70)
        print("CLASS " + str(cls))
        print("-" * 70)

        start = time.time()
        result = test_class(cls)
        elapsed = time.time() - start

        all_results.append(result)
        total_pass += result["passed"]
        total_fail += result["failed"]

        for t in result["tests"]:
            status = "PASS" if t["passed"] else "FAIL"
            print("  [" + status + "] " + t["name"])
            if t["detail"]:
                print("        -> " + t["detail"])
        print("  Class " + str(cls) + ": " + str(result["passed"]) + " passed, " + str(result["failed"]) + " failed (" + str(round(elapsed, 1)) + "s)")

    print("")
    print("=" * 80)
    print("SUMMARY")
    print("=" * 80)
    total = total_pass + total_fail
    print("Total tests: " + str(total))
    print("Passed: " + str(total_pass))
    print("Failed: " + str(total_fail))
    if total > 0:
        print("Pass rate: " + str(round(total_pass / total * 100, 1)) + "%")

    if total_fail > 0:
        print("")
        print("FAILED TESTS:")
        for r in all_results:
            for t in r["tests"]:
                if not t["passed"]:
                    print("  Class " + str(r["class"]) + ": " + t["name"] + " -- " + t["detail"])

    with open(r"D:\platform\backend\content_parsers\_e2e_results.json", "w") as f:
        json.dump(all_results, f, indent=2)
    print("")
    print("Results saved to _e2e_results.json")


if __name__ == "__main__":
    main()
