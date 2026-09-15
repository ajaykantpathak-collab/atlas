"""
Rebuild simulation mapping — capture ALL 915 simulations.
Parses class + subject from filename patterns and directory structure.
Only creates NEW file in cbse_data/ — does not touch existing data.
"""
import json
import re
from pathlib import Path
from collections import defaultdict

SIM_DIR = Path(r"D:\platform\frontend\components\simulations")
CBSE_DATA = Path(r"D:\platform\cbse_data")

# Subject keywords for matching
SUBJECT_KEYWORDS = {
    "maths": ["math", "algebra", "arithmetic", "geometry", "trigonometry", "calculus", "statistics", "probability", "number", "logarithm", "matrix", "binomial", "quadratic", "linear", "proposition", "logic", "reasoning"],
    "physics": ["physics", "mechanics", "electric", "magnet", "optics", "wave", "motion", "force", "energy", "thermodynamics", "atom", "nuclear", "circuit", "lens", "mirror", "gravitation", "friction", "pulley", "lever"],
    "chemistry": ["chem", "acid", "base", "salt", "reaction", "mole", "periodic", "organic", "carbon", "bond", "equation", "atomic", "element", "metal", "nonmetal", "oxidation", "reduction", "polymer"],
    "biology": ["bio", "cell", "genetics", "ecology", "body", "plant", "animal", "human", "organ", "tissue", "chromosome", "circulatory", "respiratory", "digestive", "evolution", "biodiversity", "ecosystem", "photosynthesis", "breathing", "classification"],
    "chemistry": ["chem", "acid", "base", "salt", "reaction", "mole", "periodic", "organic", "carbon", "bond", "equation", "atomic", "element", "metal", "nonmetal", "oxidation", "reduction", "polymer", "density"],
    "physics": ["physics", "mechanics", "electric", "magnet", "optics", "wave", "motion", "force", "energy", "thermodynamics", "atom", "nuclear", "circuit", "lens", "mirror", "gravitation", "friction", "pulley", "lever", "density_tank"],
    "maths": ["math", "algebra", "arithmetic", "geometry", "trigonometry", "calculus", "statistics", "probability", "number", "logarithm", "matrix", "binomial", "quadratic", "linear", "proposition", "logic", "reasoning", "exponent", "flowchart"],
    "computer_science": ["computer", "java", "python", "algorithm", "binary", "programming", "data_type", "internet", "html", "database", "networking", "code_editor", "code"],
    "evs": ["evs", "environment", "pollution", "conservation", "ecosystem", "recycle", "cleanliness", "air"],
    "history_civics": ["history", "ancient", "medieval", "modern", "india", "civics", "democracy", "government", "constitution", "civilization"],
    "english": ["english", "grammar", "poem", "story", "comprehension", "writing", "letter", "essay", "diagram_explorer", "visual_challenge"],
    "english": ["english", "grammar", "poem", "story", "comprehension", "writing", "letter", "essay"],
    "hindi": ["hindi"],
    "history_civics": ["history", "ancient", "medieval", "modern", "india", "civics", "democracy", "government", "constitution"],
    "geography": ["geography", "map", "climate", "landform", "river", "mountain", "earthquake", "volcano", "weather"],
    "evs": ["evs", "environment", "pollution", "conservation", "ecosystem", "recycle", "cleanliness"],
    "computer_science": ["computer", "java", "python", "algorithm", "binary", "programming", "data_type", "internet", "html", "database", "networking"],
    "economics": ["economics", "demand", "supply", "market", "gdp", "inflation", "banking"],
    "accounts": ["account", "ledger", "journal", "balance", "debit", "credit"],
    "business_studies": ["business", "commerce", "marketing", "management", "stakeholder", "advertising", "sales"],
    "psychology": ["psychology", "behavior", "memory", "learning", "perception"],
    "sociology": ["sociology", "society", "social", "culture"],
    "political_science": ["political", "politics", "election", "parliament"],
    "biotech": ["biotech", "genetic_engineering", "dna", "rna"],
    "home_science": ["home_science", "homesience", "home", "nutrition", "textile", "food", "cooking", "growth_development", "adolescent"],
    "legal_studies": ["legal", "law", "court", "justice"],
    "mass_media": ["mass_media", "massmedia", "television", "news", "camera", "communication"],
    "economics_applications": ["econapplication", "econ_app", "commercial_bank", "economic_entit", "interdependence", "sectors"],
    "commercial_studies": ["commercialstud", "commercial_stud", "noncommercial", "industrial_relation", "stakeholder", "advertising"],
    "commercial_applications": ["commerceapp", "commerce_app", "selling_process", "marketing"],
    "applied_maths": ["appliedmath", "applied_math", "logic_reasoning", "proposition"],
    "art": ["art", "drawing", "painting"],
}

def guess_subject(filename):
    """Guess subject from filename."""
    name_lower = filename.lower()
    for subj, keywords in SUBJECT_KEYWORDS.items():
        for kw in keywords:
            if kw in name_lower:
                return subj
    return "general"

def guess_class(filename, dirname):
    """Guess class from filename or directory."""
    # Pattern 1: C10_ or C6_ in filename
    m = re.match(r'C(\d+)_', filename)
    if m:
        return int(m.group(1))
    
    # Pattern 2: class1, class2 in dirname
    m = re.search(r'class(\d+)', dirname)
    if m:
        return int(m.group(1))
    
    # Pattern 3: c6_12, c9_12, c6_8 in dirname → range
    m = re.search(r'c(\d+)_(\d+)', dirname)
    if m:
        return f"{m.group(1)}-{m.group(2)}"
    
    return None

# Collect all simulations
sims = []
for f in SIM_DIR.rglob("*.tsx"):
    name = f.stem
    rel_dir = f.parent.name
    
    # Skip backups
    if "backup" in rel_dir.lower():
        continue
    
    cls = guess_class(name, rel_dir)
    subj = guess_subject(name)
    
    sims.append({
        "filename": f.name,
        "component": name,
        "directory": rel_dir,
        "full_path": str(f),
        "class": cls,
        "subject": subj,
    })

# Group by class+subject
by_class_subject = defaultdict(list)
by_class = defaultdict(list)
by_subject = defaultdict(list)

for sim in sims:
    cls = sim["class"]
    subj = sim["subject"]
    by_class_subject[f"class_{cls}_{subj}"].append(sim["component"])
    by_class[str(cls)].append(sim["component"])
    by_subject[subj].append(sim["component"])

# Save mapping
mapping = {
    "total_simulations": len(sims),
    "by_class_subject": dict(by_class_subject),
    "by_class": dict(by_class),
    "by_subject": dict(by_subject),
    "all_simulations": sims,
    "mapping_rules": {
        "match_by": "class + subject (guessed from filename)",
        "fallback": "closest class simulation or general subject sim",
        "notes": "Simulations are React components in frontend/components/simulations/",
        "naming_patterns": [
            "C{class}_{Subject}{Topic}Sim.tsx (e.g., C10_BiologyCirculatorySystemSim.tsx)",
            "{Topic}Sim.tsx in c9_12/ (e.g., AtomicStructureSim.tsx)",
            "{Topic}Simulation.tsx in c6_8/ (e.g., AtomBuilderSimulation.tsx)",
            "{Topic}Game.tsx in class1-5/ (e.g., AdditionGame.tsx)",
        ],
    }
}

out_path = CBSE_DATA / "simulations" / "mapping" / "sim_mapping.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(mapping, f, indent=2, ensure_ascii=False)

print(f"Total simulations: {len(sims)}")
print(f"By class:")
for cls in sorted(by_class.keys(), key=lambda x: str(x)):
    print(f"  class {cls}: {len(by_class[cls])} sims")
print(f"\nBy subject:")
for subj in sorted(by_subject.keys()):
    print(f"  {subj}: {len(by_subject[subj])} sims")
print(f"\nMapping saved: {out_path} ({out_path.stat().st_size//1024}KB)")
