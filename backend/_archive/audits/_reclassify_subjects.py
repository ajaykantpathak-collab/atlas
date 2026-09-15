"""
Reclassify CBSE nodes for classes 6-10 based on actual topic content.
The pipeline jumbled subjects — physics contains biology, science contains civics, etc.
This creates a correction mapping WITHOUT modifying original files.

Output: D:\platform\cbse_data\cross_board\mappings\subject_corrections.json
        node_id → correct_subject
"""
import json
import re
from pathlib import Path
from collections import defaultdict

CBSE_OUTPUT = Path(r"D:\platform\cbse_coverage_output")

# === SUBJECT KEYWORD CLASSIFIER ===
# Each subject has weighted keywords. Topic + content_snippet + concept_tags are scanned.
# Higher weight = more distinctive for that subject.

SUBJECT_KEYWORDS = {
    "physics": {
        # Core physics concepts
        "motion": 3, "force": 3, "energy": 3, "velocity": 4, "acceleration": 4,
        "momentum": 4, "friction": 4, "gravity": 4, "gravitation": 4, "newton": 4,
        "light": 2, "reflection": 3, "refraction": 4, "lens": 4, "mirror": 3,
        "electricity": 4, "current": 2, "voltage": 4, "circuit": 4, "resistance": 3,
        "magnet": 4, "magnetic": 4, "electromagnetic": 5, "oersted": 5,
        "sound": 2, "wave": 3, "frequency": 4, "amplitude": 4, "wavelength": 4,
        "heat": 2, "temperature": 2, "thermometer": 3, "conduction": 3, "convection": 3,
        "pressure": 3, "atmospheric": 3, "pascal": 4, "bernoulli": 5,
        "work": 1, "power": 2, "machine": 2, "lever": 4, "pulley": 4,
        "nuclear": 3, "atom": 2, "electron": 3, "proton": 4, "neutron": 4,
        "radioactivity": 5, "fission": 4, "fusion": 3, "semiconductor": 5,
        "diode": 5, "transistor": 5, "ohm": 4, "ampere": 4, "volt": 4,
        "kinetic": 4, "potential": 2, "oscillation": 4, "pendulum": 4,
        "projectile": 5, "torque": 5, "equilibrium": 2,
        "speed": 2, "displacement": 3, "inertia": 4,
        "charge": 2, "field": 2, "flux": 4, "capacitor": 5, "inductor": 5,
    },
    "chemistry": {
        "element": 3, "compound": 3, "mixture": 3, "atom": 2, "molecule": 3,
        "reaction": 3, "chemical": 3, "acid": 4, "base": 3, "salt": 3,
        "ph": 4, "indicator": 3, "litmus": 5, "neutralization": 5,
        "oxidation": 4, "reduction": 4, "redox": 5,
        "metal": 3, "non-metal": 4, "alloy": 4, "corrosion": 4, "rusting": 5,
        "carbon": 3, "organic": 3, "hydrocarbon": 5, "polymer": 4,
        "periodic": 5, "mendeleev": 5, "atomic number": 4, "atomic mass": 3,
        "valency": 4, "electron configuration": 4, "shell": 2, "orbital": 4,
        "bond": 3, "covalent": 5, "ionic": 5, "metallic": 4,
        "combustion": 4, "fuel": 3, "flame": 4,
        "crystallization": 5, "distillation": 4, "filtration": 4, "chromatography": 5,
        "solution": 2, "solvent": 3, "solute": 4, "concentration": 2,
        "colloid": 5, "suspension": 3, "tyndall": 5,
        "isotope": 5, "isobar": 5, "catalyst": 4, "rate of reaction": 4,
        "ethanol": 5, "ethanoic": 5, "ester": 5, "soap": 4, "detergent": 4,
        "hydrogen": 3, "oxygen": 2, "nitrogen": 2, "chlorine": 4,
        "sulphur": 4, "sulfur": 4, "ammonia": 5, "nitric acid": 5,
    },
    "biology": {
        "living": 2, "organism": 3, "cell": 3, "tissue": 4, "organ": 3,
        "plant": 2, "animal": 2, "human body": 4,
        "photosynthesis": 5, "respiration": 3, "digestion": 4, "nutrition": 3,
        "food": 1, "diet": 2, "vitamin": 4, "protein": 3, "carbohydrate": 4,
        "fat": 2, "mineral": 2,
        "reproduction": 4, "flower": 3, "pollination": 5, "fertilization": 4,
        "evolution": 3, "heredity": 4, "genetics": 4, "dna": 4, "gene": 3,
        "ecosystem": 4, "ecology": 4, "environment": 1, "biodiversity": 4,
        "habitat": 3, "adaptation": 3, "species": 2,
        "microorganism": 5, "bacteria": 4, "virus": 4, "fungi": 4, "yeast": 4,
        "disease": 2, "immunity": 4, "vaccine": 4, "antibiotic": 4,
        "blood": 3, "heart": 3, "circulation": 4, "excretion": 4, "kidney": 4,
        "nervous": 4, "brain": 3, "hormone": 4, "endocrine": 5,
        "respiratory": 4, "breathing": 3, "lung": 4,
        "leaf": 3, "stem": 3, "root": 3, "seed": 3, "germination": 5,
        "insect": 3, "worm": 3, "amoeba": 5, "protozoa": 5,
        "tropic": 2, "forest": 2, "crop": 2, "agriculture": 3,
        "fossil": 3, "extinction": 3,
    },
    "history": {
        "ancient": 3, "medieval": 4, "century": 2, "dynasty": 4, "empire": 3,
        "king": 3, "queen": 3, "emperor": 4, "throne": 4, "kingdom": 3,
        "war": 2, "battle": 3, "invasion": 3, "conquest": 3, "siege": 4,
        "revolution": 2, "rebellion": 3, "uprising": 3, "mutiny": 4,
        "colonial": 4, "colony": 3, "imperial": 3, "empire": 2,
        "independence": 2, "freedom": 2, "nationalist": 3, "nationalism": 3,
        "civilization": 3, "civilisation": 3, "harappan": 5, "indus valley": 5,
        "vedic": 5, "aryan": 4, "mauryan": 5, "gupta": 4, "mughal": 5,
        "sultanate": 5, "delhi": 2, "british": 2, "east india company": 5,
        "partition": 2, "freedom struggle": 4, "gandhi": 4, "nehru": 4,
        "bose": 3, "tilak": 4, "congress": 2, "muslim league": 4,
        "renaissance": 4, "industrial revolution": 4, "world war": 4,
        "treaty": 3, "peace": 1, "fascism": 5, "nazism": 5, "hitler": 5,
        "mussolini": 5, "stalin": 5, "lenin": 5, "bolshevik": 5,
        "cold war": 5, "non-aligned": 4, "united nations": 3,
        "inscriptions": 4, "manuscript": 3, "archaeology": 4, "artifact": 4,
        "chronology": 4, "periodization": 4, "historical": 2, "source": 1,
        "chola": 5, "pallava": 5, "rastrakuta": 5, "tughlaq": 5, "khalji": 5,
        "aurangzeb": 5, "akbar": 5, "babur": 5, "shivaji": 5,
        "sati": 4, "widow": 2, "reform": 2, "brahmo": 5, "arya samaj": 5,
        "swadeshi": 5, "non-cooperation": 5, "civil disobedience": 5,
        "quit india": 5, "mountbatten": 5, "attlee": 5,
    },
    "civics": {
        "democracy": 4, "government": 3, "constitution": 4, "parliament": 5,
        "president": 3, "prime minister": 4, "cabinet": 4, "minister": 2,
        "election": 3, "voting": 4, "electoral": 4, "constituency": 5,
        "rights": 2, "duties": 2, "fundamental": 3, "citizen": 3, "citizenship": 4,
        "federal": 4, "unitary": 4, "state": 1, "legislature": 4, "legislative": 4,
        "judiciary": 5, "supreme court": 5, "high court": 4, "judge": 3,
        "executive": 4, "bureaucracy": 4, "civil service": 4,
        "amendment": 4, "preamble": 5, "directive principles": 5,
        "panchayat": 5, "municipal": 4, "local government": 4,
        "political party": 4, "opposition": 3, "coalition": 3,
        "secular": 3, "socialist": 3, "republic": 3,
        "dictatorship": 4, "authoritarian": 4, "totalitarian": 4,
        "chile": 3, "allende": 5, "pinochet": 5, "poland": 2,
        "communist": 2, "coup": 3, "military": 2,
        "wto": 3, "united nations": 2, "uno": 3,
        "fundamental rights": 5, "fundamental duties": 5,
        "concurrent list": 5, "state list": 4, "union list": 4,
        "rajya sabha": 5, "lok sabha": 5, "bicameral": 5, "unicameral": 5,
        "impeachment": 5, "ordinance": 4, "bill": 2, "act": 1,
        "reservation": 2, "affirmative": 3, "scheduled": 2, "tribal": 2,
    },
    "geography": {
        "map": 3, "globe": 4, "latitude": 5, "longitude": 5, "equator": 5,
        "hemisphere": 4, "tropic": 3, "meridian": 5, "parallel": 3,
        "mountain": 3, "river": 3, "plateau": 4, "plain": 2, "desert": 3,
        "coast": 3, "island": 3, "peninsula": 4, "delta": 4, "estuary": 4,
        "climate": 4, "weather": 3, "monsoon": 5, "rainfall": 3, "precipitation": 4,
        "temperature": 1, "humidity": 4, "wind": 2, "cyclone": 4, "tornado": 4,
        "population": 2, "density": 2, "census": 4, "demographic": 4,
        "resource": 2, "natural resource": 4, "mineral": 2, "fossil fuel": 4,
        "coal": 3, "petroleum": 4, "natural gas": 4, "uranium": 4,
        "agriculture": 2, "crop": 2, "irrigation": 4, "soil": 3, "fertility": 3,
        "industry": 2, "manufacturing": 3, "factory": 2,
        "transport": 2, "communication": 2, "trade": 1,
        "landform": 4, "erosion": 3, "earthquake": 4, "volcano": 4, "tsunami": 4,
        "ocean": 3, "current": 1, "tide": 4, "wave": 1,
        "continent": 4, "asia": 2, "europe": 2, "africa": 2,
        "himalaya": 5, "gangetic": 5, "thar": 5, "deccan": 5,
        "vegetation": 3, "forest": 2, "wildlife": 3, "biosphere": 4,
        "settlement": 4, "urban": 3, "rural": 3, "migration": 3,
        "sustainable": 2, "conservation": 2, "pollution": 2,
    },
    "economics": {
        "demand": 3, "supply": 3, "market": 2, "price": 2, "cost": 2,
        "money": 2, "banking": 4, "bank": 2, "loan": 3, "credit": 3,
        "trade": 2, "import": 3, "export": 3, "tariff": 4,
        "production": 2, "goods": 2, "service": 1, "consumer": 3, "producer": 3,
        "gdp": 5, "gnp": 5, "national income": 4, "per capita": 4,
        "inflation": 5, "deflation": 5, "recession": 4,
        "poverty": 3, "unemployment": 3, "employment": 2, "labour": 2,
        "development": 1, "underdeveloped": 4, "developed": 2,
        "globalization": 3, "globalisation": 3, "liberalization": 4,
        "privatisation": 4, "fdi": 5, "investment": 2,
        "tax": 3, "revenue": 3, "budget": 4, "fiscal": 4, "monetary": 4,
        "rbi": 5, "reserve bank": 5, "currency": 4, "exchange rate": 4,
        "subsidy": 4, "public distribution": 5, "pds": 5,
        "food security": 3, "ration": 4,
        "capital": 2, "entrepreneur": 4, "business": 1,
        "economic": 2, "economy": 2, "scarcity": 4, "opportunity cost": 5,
        "mnc": 4, "multinational": 4, "wto": 3,
        "silk route": 3, "columbian exchange": 4, "precious metal": 3,
        "demonetisation": 5, "gst": 4,
    },
}

def classify_topic(text):
    """Classify a topic into a subject based on keyword scoring."""
    text_lower = text.lower()
    scores = defaultdict(int)
    matched_words = defaultdict(list)

    for subject, keywords in SUBJECT_KEYWORDS.items():
        for kw, weight in keywords.items():
            if kw in text_lower:
                scores[subject] += weight
                matched_words[subject].append(kw)

    if not scores or max(scores.values()) == 0:
        return None, 0, {}

    best = max(scores, key=scores.get)
    return best, scores[best], dict(scores)

# === COLLECT ALL CLASS 6-10 NODES ===
all_nodes = []
for f in sorted(CBSE_OUTPUT.glob("*_result.json")):
    if f.stat().st_size < 100:
        continue
    try:
        data = json.loads(f.read_text(encoding="utf-8"))
    except:
        continue
    for chunk in data.get("results", []):
        for node in chunk.get("nodes", []):
            cls = node.get("class_level", "?")
            if isinstance(cls, str):
                try: cls = int(cls)
                except: cls = 0
            if isinstance(cls, int) and 6 <= cls <= 10:
                subj = node.get("subject", "?").strip()
                # Normalize
                if subj == "math": subj = "maths"
                if subj == "phy": subj = "physics"
                if subj == "sci": subj = "science"
                if subj == "histciv": subj = "history_civics"
                if subj in ("his", "history"): subj = "hist"
                if subj == "geo": subj = "geography"

                # ONLY reclassify science/social science subjects that are jumbled
                # Do NOT touch English, Hindi, Maths, AI — those are correctly labeled
                RECLASSIFYABLE = {"physics", "chemistry", "biology", "science",
                                  "social_science", "history_civics", "hist", "geography",
                                  "economics", "history_civivs"}
                if subj not in RECLASSIFYABLE:
                    continue

                # Build text for classification
                topic = node.get("topic", "")
                snippet = node.get("content_snippet", "")
                tags = " ".join(node.get("concept_tags", []))
                chapter = node.get("chapter_name", "")
                classify_text = f"{topic} {snippet} {tags} {chapter}"

                all_nodes.append({
                    "node_id": node.get("node_id", ""),
                    "original_subject": subj,
                    "class": cls,
                    "topic": topic,
                    "classify_text": classify_text,
                })

print(f"Total class 6-10 nodes to reclassify: {len(all_nodes)}")

# === RECLASSIFY ===
corrections = {}
before_counts = defaultdict(lambda: defaultdict(int))
after_counts = defaultdict(lambda: defaultdict(int))
uncertain = []

for node in all_nodes:
    orig_subj = node["original_subject"]
    before_counts[orig_subj][node["class"]] += 1

    best, score, all_scores = classify_topic(node["classify_text"])

    # Only correct if:
    # 1. We got a clear classification (score >= 5)
    # 2. The best subject is different from original
    # 3. The best score is significantly higher than second best
    if best and score >= 5:
        sorted_scores = sorted(all_scores.items(), key=lambda x: -x[1])
        if len(sorted_scores) > 1:
            second_score = sorted_scores[1][1]
        else:
            second_score = 0

        # If best is clearly better (2x second) or second is 0
        if score >= 2 * second_score or second_score == 0:
            if best != orig_subj and best != "science":
                # Map civics → history_civics, history → hist for consistency
                final_subj = best
                if best == "civics":
                    final_subj = "history_civics"
                if best == "history":
                    final_subj = "hist"

                corrections[node["node_id"]] = {
                    "original_subject": orig_subj,
                    "corrected_subject": final_subj,
                    "class": node["class"],
                    "topic": node["topic"][:80],
                    "score": score,
                    "all_scores": all_scores,
                }
                after_counts[final_subj][node["class"]] += 1
            else:
                after_counts[orig_subj][node["class"]] += 1
        else:
            # Uncertain - keep original
            after_counts[orig_subj][node["class"]] += 1
            uncertain.append({
                "node_id": node["node_id"],
                "original": orig_subj,
                "best": best,
                "score": score,
                "second": sorted_scores[1][0] if len(sorted_scores) > 1 else "none",
                "second_score": second_score,
                "topic": node["topic"][:60],
            })
    else:
        after_counts[orig_subj][node["class"]] += 1

# === REPORT ===
print(f"\n{'='*80}")
print(f"  RECLASSIFICATION RESULTS")
print(f"{'='*80}")
print(f"  Total nodes:           {len(all_nodes)}")
print(f"  Corrected:             {len(corrections)}")
print(f"  Uncertain (kept orig): {len(uncertain)}")

print(f"\n{'='*80}")
print(f"  BEFORE (original subject labels)")
print(f"{'='*80}")
print(f"{'Subject':25s}", end="")
for cls in range(6, 11):
    print(f"{'c'+str(cls):>6s}", end="")
print(f"{'Total':>8s}")
print("-" * 65)
for subj in sorted(before_counts.keys()):
    print(f"{subj:25s}", end="")
    total = 0
    for cls in range(6, 11):
        cnt = before_counts[subj].get(cls, 0)
        print(f"{cnt:6d}" if cnt > 0 else f"{'-':>6s}", end="")
        total += cnt
    print(f"{total:8d}")

print(f"\n{'='*80}")
print(f"  AFTER (corrected subject labels)")
print(f"{'='*80}")
print(f"{'Subject':25s}", end="")
for cls in range(6, 11):
    print(f"{'c'+str(cls):>6s}", end="")
print(f"{'Total':>8s}")
print("-" * 65)
for subj in sorted(after_counts.keys()):
    print(f"{subj:25s}", end="")
    total = 0
    for cls in range(6, 11):
        cnt = after_counts[subj].get(cls, 0)
        print(f"{cnt:6d}" if cnt > 0 else f"{'-':>6s}", end="")
        total += cnt
    print(f"{total:8d}")

# Show sample corrections
print(f"\n{'='*80}")
print(f"  SAMPLE CORRECTIONS (first 30)")
print(f"{'='*80}")
for nid, info in list(corrections.items())[:30]:
    print(f"  {nid:30s} {info['original_subject']:15s} → {info['corrected_subject']:15s} | {info['topic'][:40]}")

# Show uncertain cases
if uncertain:
    print(f"\n{'='*80}")
    print(f"  UNCERTAIN CASES (first 20)")
    print(f"{'='*80}")
    for u in uncertain[:20]:
        print(f"  {u['node_id']:30s} orig={u['original']:12s} best={u['best']:12s}({u['score']}) second={u['second']:12s}({u['second_score']}) | {u['topic'][:30]}")

# Save corrections
out = Path(r"D:\platform\cbse_data\cross_board\mappings\subject_corrections.json")
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(json.dumps(corrections, indent=2, ensure_ascii=False), encoding="utf-8")
print(f"\n  Corrections saved to: {out}")
print(f"  Total corrections: {len(corrections)}")
