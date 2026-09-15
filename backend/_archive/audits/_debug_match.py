import sys
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry

reg = SolverRegistry()
reg.initialize()

qgen_types = reg.list_question_gen_types()

# Check what matches for "mathematics" grade 5
subject = "mathematics"
grade = 5
topic = "algebra"

subject_lower = subject.lower()
grade_str = str(grade)

subject_grade_match = [qt for qt in qgen_types if subject_lower in qt.lower() and grade_str in qt.lower()]
subject_match = [qt for qt in qgen_types if subject_lower in qt.lower()]
topic_match = [qt for qt in qgen_types if topic.lower() in qt.lower()]

print(f"Subject+grade match (mathematics + 5): {len(subject_grade_match)}")
for qt in subject_grade_match[:10]:
    print(f"  {qt}")

print(f"\nSubject match (mathematics): {len(subject_match)}")
for qt in subject_match[:10]:
    print(f"  {qt}")

# The problem: "mathematics" doesn't appear in type names like "C5Math001Generator"
# Let's check what subject keywords DO appear
print(f"\nAll types with 'math':")
for qt in qgen_types:
    if 'math' in qt.lower():
        print(f"  {qt}")

print(f"\nAll types with '5':")
for qt in qgen_types:
    if '5' in qt:
        print(f"  {qt}")
