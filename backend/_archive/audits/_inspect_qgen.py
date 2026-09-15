"""Inspect question generator output quality - READ ONLY, no modifications."""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'solvers', 'maths'))

try:
    from class10_maths_questions import QUESTIONS
    print(f"Class 10 Maths: {len(QUESTIONS)} questions")
    for i, q in enumerate(QUESTIONS[:3]):
        if isinstance(q, dict):
            text = q.get("question", q.get("text", ""))
            qtype = q.get("type", "?")
            diff = q.get("difficulty", "?")
            opts = q.get("options", [])
            ans = q.get("answer", q.get("correct", "?"))
            print(f"\n  Q{i+1}: type={qtype} diff={diff}")
            print(f"    text: {str(text)[:150]}")
            print(f"    options: {len(opts) if isinstance(opts,list) else 'n/a'}")
            print(f"    answer: {str(ans)[:80]}")
        else:
            print(f"\n  Q{i+1}: {str(q)[:150]}")
except Exception as e:
    print(f"maths error: {e}")

# Check physics
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'solvers', 'physics'))
try:
    from class12_physics_questions import QUESTIONS
    print(f"\nClass 12 Physics: {len(QUESTIONS)} questions")
    for i, q in enumerate(QUESTIONS[:3]):
        if isinstance(q, dict):
            text = q.get("question", q.get("text", ""))
            qtype = q.get("type", "?")
            diff = q.get("difficulty", "?")
            opts = q.get("options", [])
            print(f"\n  Q{i+1}: type={qtype} diff={diff}")
            print(f"    text: {str(text)[:150]}")
            print(f"    options: {len(opts) if isinstance(opts,list) else 'n/a'}")
except Exception as e:
    print(f"physics error: {e}")

# Check chemistry
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'solvers', 'chem'))
try:
    from class12_chem_questions import QUESTIONS
    print(f"\nClass 12 Chem: {len(QUESTIONS)} questions")
    for i, q in enumerate(QUESTIONS[:3]):
        if isinstance(q, dict):
            text = q.get("question", q.get("text", ""))
            qtype = q.get("type", "?")
            print(f"\n  Q{i+1}: type={qtype}")
            print(f"    text: {str(text)[:150]}")
except Exception as e:
    print(f"chem error: {e}")

# Check bio
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'solvers', 'bio'))
try:
    from class12_bio_questions import QUESTIONS
    print(f"\nClass 12 Bio: {len(QUESTIONS)} questions")
    for i, q in enumerate(QUESTIONS[:3]):
        if isinstance(q, dict):
            text = q.get("question", q.get("text", ""))
            qtype = q.get("type", "?")
            print(f"\n  Q{i+1}: type={qtype}")
            print(f"    text: {str(text)[:150]}")
except Exception as e:
    print(f"bio error: {e}")
