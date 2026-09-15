"""Extract all solver keys needed by class11_bio and class12_bio."""
import re
from pathlib import Path

# class11_bio
text = Path(r"D:\platform\backend\solvers\bio\class11_bio_questions.py").read_text(encoding="utf-8")
# Find all _get_solver("topic", "problem_type") calls
calls = re.findall(r'_get_solver\("(\w+)",\s*(\w+)\)', text)
# Also find sub = "..." patterns
subs = re.findall(r'sub = "(\w+)"', text)
# And problem_types lists
pt_lists = re.findall(r'problem_types = \[([^\]]+)\]', text)

print("=== class11_bio solver keys ===")
keys = set()
for topic, pt_var in calls:
    # pt_var is a variable name, need to find its value
    # But we know the topics and sub_topics
    pass

# Just extract all possible keys from the code
# Topics: taxonomy, plant_physiology, human_physiology
# For taxonomy: binomial_nomenclature, taxonomic_hierarchy, five_kingdom, diagnostic_key
# For plant_physiology: photosynthesis, transpiration, mineral_nutrition, plant_respiration
# For human_physiology: digestion, breathing, circulation, excretion, nervous, endocrine

taxonomy_pts = ["binomial_nomenclature", "taxonomic_hierarchy", "five_kingdom", "diagnostic_key"]
plant_pts = ["photosynthesis", "transpiration", "mineral_nutrition", "plant_respiration"]
human_subs = ["digestion", "breathing", "circulation", "excretion", "nervous", "endocrine"]

for pt in taxonomy_pts:
    keys.add(f"taxonomy_{pt}")
for pt in plant_pts:
    keys.add(f"plant_physiology_{pt}")
for sub in human_subs:
    keys.add(f"human_physiology_{sub}")

print(f"Total keys: {len(keys)}")
for k in sorted(keys):
    print(f"  {k}")

# class12_bio
print("\n=== class12_bio ===")
text2 = Path(r"D:\platform\backend\solvers\bio\class12_bio_questions.py").read_text(encoding="utf-8")
# Find _solver_cache and ProblemType
problem_types = re.findall(r'ProblemType\.(\w+)', text2)
print(f"ProblemTypes: {set(problem_types)}")
# Find solver registry imports
imports = re.findall(r'from solvers\S+|import solvers\S+', text2)
for imp in imports:
    print(f"  {imp}")
# Find _solver_cache definition
cache_def = re.findall(r'_solver_cache\s*=\s*({[^}]+})', text2, re.DOTALL)
if cache_def:
    print(f"\n_solver_cache definition:\n{cache_def[0][:500]}")
