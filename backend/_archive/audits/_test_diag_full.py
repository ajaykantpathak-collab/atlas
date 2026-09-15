import urllib.request, json

# Test diagnostic with different grades
tests = [
    {"subject": "mathematics", "grade": 5, "label": "Class 5 Maths"},
    {"subject": "evs", "grade": 3, "label": "Class 3 EVS"},
    {"subject": "chemistry", "grade": 4, "label": "Class 4 Chemistry"},
    {"subject": "physics", "grade": 11, "label": "Class 11 Physics"},
    {"subject": "biology", "grade": 7, "label": "Class 7 Biology"},
    {"subject": "geography", "grade": 8, "label": "Class 8 Geography"},
]

for test in tests:
    req_data = json.dumps({
        "student_id": "82fb3ab2-9f30-4888-8964-237e26a72d9e",
        "subject": test["subject"],
        "grade": test["grade"]
    }).encode()

    r = urllib.request.Request("http://localhost:8000/api/diagnostic/start",
                               data=req_data, headers={"Content-Type": "application/json"})

    try:
        resp = urllib.request.urlopen(r, timeout=30)
        data = json.loads(resp.read().decode())
        q = data.get('question', {})
        qtext = q.get('question_text', q.get('text', ''))
        is_placeholder = 'Diagnostic question' in qtext
        status = "PLACEHOLDER" if is_placeholder else "REAL"
        print(f"{test['label']}: {status}")
        print(f"  Q: {qtext[:120]}")
        if not is_placeholder:
            print(f"  A: {str(q.get('correct_answer', 'N/A'))[:80]}")
            print(f"  Source: {q.get('source', 'N/A')}")
        print()
    except urllib.error.HTTPError as e:
        print(f"{test['label']}: HTTP {e.code} - {e.read().decode()[:200]}")
    except Exception as e:
        print(f"{test['label']}: ERROR - {str(e)[:100]}")
