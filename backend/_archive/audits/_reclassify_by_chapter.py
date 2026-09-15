"""Reclassify class 6-10 nodes using _cbse_subject and _chapter_code fields.
Group by chapter — all nodes in a chapter get the same subject."""
import json
import re
from pathlib import Path
from collections import defaultdict

CBSE_OUTPUT = Path(r"D:\platform\cbse_coverage_output")

# Collect all class 6-10 nodes with hidden fields
nodes = []
for f in sorted(CBSE_OUTPUT.glob("*_result.json")):
    if f.stat().st_size < 100:
        continue
    try:
        data = json.loads(f.read_text(encoding="utf-8"))
    except:
        continue
    file_code = f.stem.replace("_result", "")
    for chunk in data.get("results", []):
        for node in chunk.get("nodes", []):
            cls = node.get("class_level", "?")
            if isinstance(cls, str):
                try: cls = int(cls)
                except: cls = 0
            if isinstance(cls, int) and 6 <= cls <= 10:
                nodes.append({
                    "node_id": node.get("node_id", ""),
                    "subject": node.get("subject", "").strip(),
                    "class": cls,
                    "topic": node.get("topic", ""),
                    "chapter_name": node.get("chapter_name", ""),
                    "content_snippet": node.get("content_snippet", ""),
                    "concept_tags": node.get("concept_tags", []),
                    "_cbse_subject": node.get("_cbse_subject", ""),
                    "_chapter_code": node.get("_chapter_code", ""),
                    "_chapter_title": node.get("_chapter_title", ""),
                    "file_code": file_code,
                })

print(f"Total class 6-10 nodes: {len(nodes)}")

# === STEP 1: Discover what _cbse_subject and chapter names exist ===
# Group by (class, _chapter_code) to see all chapters
chapters = defaultdict(lambda: {"topics": [], "subjects": set(), "chapter_names": set(), "cbse_subjects": set(), "node_ids": []})

for n in nodes:
    key = (n["class"], n["_chapter_code"])
    chapters[key]["topics"].append(n["topic"])
    chapters[key]["subjects"].add(n["subject"])
    chapters[key]["chapter_names"].add(n["chapter_name"])
    chapters[key]["cbse_subjects"].add(n["_cbse_subject"])
    chapters[key]["node_ids"].append(n["node_id"])

print(f"Unique (class, chapter_code) groups: {len(chapters)}")

# === STEP 2: Classify each chapter to the correct subject ===
# Rules based on chapter name keywords — applied at CHAPTER level not node level

def classify_chapter(chapter_name, cbse_subject, topics):
    """Classify a whole chapter to a subject based on chapter name + topics."""
    text = (chapter_name + " " + " ".join(topics[:5])).lower()

    # If _cbse_subject is already a proper subject (not Science/Social Science), use it
    if cbse_subject in ("Physics", "Chemistry", "Biology", "History", "Civics",
                        "Geography", "Economics", "Political Science", "Sociology",
                        "Psychology", "Computer Science", "Mathematics", "English",
                        "Hindi", "Accountancy", "Business Studies", "Biotechnology",
                        "Home Science", "Legal Studies", "Applied Mathematics",
                        "Artificial Intelligence"):
        # Map to our subject names
        mapping = {
            "Physics": "physics", "Chemistry": "chemistry", "Biology": "biology",
            "History": "hist", "Civics": "history_civics", "Geography": "geography",
            "Economics": "economics", "Political Science": "political_science",
            "Sociology": "sociology", "Psychology": "psychology",
            "Computer Science": "computer_science", "Mathematics": "maths",
            "English": "English Literature", "Hindi": "Hindi",
            "Accountancy": "accounts", "Business Studies": "business_studies",
            "Biotechnology": "biotech", "Home Science": "home_science",
            "Legal Studies": "legal_studies", "Applied Mathematics": "applied_maths",
            "Artificial Intelligence": "ai",
        }
        return mapping.get(cbse_subject, cbse_subject.lower())

    # For "Science" textbooks — classify by chapter name
    if cbse_subject == "Science":
        # Chemistry keywords
        chem_kw = ["acid", "base", "salt", "chemical", "reaction", "element", "compound",
                   "mixture", "separation", "atom", "molecule", "metal", "non-metal",
                   "carbon", "fibre", "fabric", "material", "matter", "particle",
                   "periodic", "combustion", "flame", "fuel", "oxidation",
                   "soap", "detergent", "ethanol", "alcohol", "polymer",
                   "crystal", "solution", "colloid", "suspension", "solubility",
                   "ph", "indicator", "neutralization", "corrosion", "rusting",
                   "mineral", "ore", "metallurgy", "refining"]
        # Physics keywords
        phys_kw = ["motion", "force", "energy", "light", "reflection", "refraction",
                   "lens", "mirror", "electricity", "current", "voltage", "circuit",
                   "resistance", "magnet", "magnetic", "electromagnetic",
                   "sound", "wave", "frequency", "heat", "temperature",
                   "pressure", "work", "power", "machine", "lever", "pulley",
                   "gravitation", "gravity", "newton", "momentum", "friction",
                   "speed", "velocity", "acceleration", "displacement",
                   "oscillation", "pendulum", "nuclear", "atom", "electron",
                   "charge", "field", "conduction", "convection", "radiation",
                   "thermometer", "boiling", "melting", "evaporation",
                   "condensation", "sublimation", "density", "buoyancy",
                   "archimedes", "relativity", "photoelectric", "semiconductor",
                   "diode", "transistor", "ohm", "ampere", "volt",
                   "projectile", "torque", "equilibrium", "inertia",
                   "kinetic", "potential", "spring", "oscillation"]
        # Biology keywords
        bio_kw = ["living", "organism", "cell", "tissue", "organ", "plant", "animal",
                  "human body", "photosynthesis", "respiration", "digestion",
                  "nutrition", "food", "diet", "vitamin", "protein", "carbohydrate",
                  "fat", "reproduction", "flower", "pollination", "fertilization",
                  "evolution", "heredity", "genetics", "dna", "gene",
                  "ecosystem", "ecology", "environment", "biodiversity",
                  "habitat", "adaptation", "species", "microorganism",
                  "bacteria", "virus", "fungi", "yeast", "disease", "immunity",
                  "vaccine", "antibiotic", "blood", "heart", "circulation",
                  "excretion", "kidney", "nervous", "brain", "hormone",
                  "respiratory", "breathing", "lung", "leaf", "stem", "root",
                  "seed", "germination", "insect", "worm", "crop",
                  "agriculture", "fossil", "extinction", "forest",
                  "conservation", "wildlife", "natural resource",
                  "water", "air", "weather", "climate", "soil",
                  "fibre", "cotton", "silk", "wool", "jute",
                  "life", "growth", "movement", "locomotion",
                  "skeleton", "bone", "muscle", "joint"]

        chem_score = sum(3 for kw in chem_kw if kw in text)
        phys_score = sum(3 for kw in phys_kw if kw in text)
        bio_score = sum(3 for kw in bio_kw if kw in text)

        scores = {"chemistry": chem_score, "physics": phys_score, "biology": bio_score}
        best = max(scores, key=scores.get)

        if scores[best] == 0:
            return None  # can't determine

        # If clear winner
        sorted_scores = sorted(scores.items(), key=lambda x: -x[1])
        if sorted_scores[0][1] >= 2 * sorted_scores[1][1] or sorted_scores[1][1] == 0:
            return best
        return None  # ambiguous

    # For "Social Science" textbooks — classify by chapter name
    if cbse_subject == "Social Science":
        hist_kw = ["ancient", "medieval", "dynasty", "empire", "king", "emperor",
                   "throne", "kingdom", "war", "battle", "invasion", "conquest",
                   "revolution", "rebellion", "uprising", "colonial", "colony",
                   "independence", "freedom", "nationalist", "civilization",
                   "harappan", "indus valley", "vedic", "aryan", "mauryan",
                   "gupta", "mughal", "sultanate", "british", "east india company",
                   "partition", "gandhi", "nehru", "congress", "muslim league",
                   "renaissance", "industrial revolution", "world war",
                   "fascism", "nazism", "hitler", "mussolini", "stalin",
                   "cold war", "non-aligned", "inscriptions", "manuscript",
                   "archaeology", "chronology", "periodization", "historical",
                   "chola", "pallava", "tughlaq", "khalji", "aurangzeb",
                   "akbar", "babur", "shivaji", "sati", "reform",
                   "swadeshi", "non-cooperation", "civil disobedience",
                   "quit india", "mountbatten", "freedom struggle",
                   "delhi", "sultanate", "temple", "architecture",
                   "trade route", "silk route", "columbian"]
        civics_kw = ["democracy", "government", "constitution", "parliament",
                     "president", "prime minister", "cabinet", "minister",
                     "election", "voting", "electoral", "constituency",
                     "rights", "duties", "fundamental", "citizen", "citizenship",
                     "federal", "unitary", "legislature", "legislative",
                     "judiciary", "supreme court", "high court", "judge",
                     "executive", "bureaucracy", "civil service",
                     "amendment", "preamble", "directive principles",
                     "panchayat", "municipal", "local government",
                     "political party", "opposition", "coalition",
                     "secular", "socialist", "republic",
                     "dictatorship", "authoritarian", "totalitarian",
                     "chile", "allende", "pinochet", "poland",
                     "communist", "coup", "wto", "united nations",
                     "rajya sabha", "lok sabha", "bicameral",
                     "impeachment", "ordinance", "bill",
                     "reservation", "consumer", "right to information",
                     "equality", "justice", "liberty", "fraternity"]
        geo_kw = ["map", "globe", "latitude", "longitude", "equator",
                  "hemisphere", "tropic", "meridian", "parallel",
                  "mountain", "river", "plateau", "plain", "desert",
                  "coast", "island", "peninsula", "delta", "estuary",
                  "climate", "weather", "monsoon", "rainfall", "precipitation",
                  "humidity", "wind", "cyclone", "population", "density",
                  "census", "demographic", "resource", "mineral",
                  "coal", "petroleum", "natural gas", "agriculture",
                  "crop", "irrigation", "soil", "fertility",
                  "industry", "manufacturing", "transport", "communication",
                  "landform", "erosion", "earthquake", "volcano", "tsunami",
                  "ocean", "continent", "himalaya", "gangetic", "thar", "deccan",
                  "vegetation", "forest", "wildlife", "biosphere",
                  "settlement", "urban", "rural", "migration",
                  "land use", "land revenue", "land grant"]
        econ_kw = ["demand", "supply", "market", "price", "cost", "money",
                   "banking", "bank", "loan", "credit", "trade", "import",
                   "export", "tariff", "production", "goods", "consumer",
                   "producer", "gdp", "national income", "per capita",
                   "inflation", "poverty", "unemployment", "employment",
                   "development", "globalization", "globalisation",
                   "liberalization", "privatisation", "investment",
                   "tax", "revenue", "budget", "fiscal", "monetary",
                   "rbi", "currency", "exchange rate", "subsidy",
                   "public distribution", "food security", "ration",
                   "capital", "entrepreneur", "scarcity",
                   "demonetisation", "gst", "silk route", "columbian exchange"]

        hist_score = sum(3 for kw in hist_kw if kw in text)
        civics_score = sum(3 for kw in civics_kw if kw in text)
        geo_score = sum(3 for kw in geo_kw if kw in text)
        econ_score = sum(3 for kw in econ_kw if kw in text)

        scores = {"hist": hist_score, "history_civics": civics_score,
                  "geography": geo_score, "economics": econ_score}
        best = max(scores, key=scores.get)

        if scores[best] == 0:
            return None

        sorted_scores = sorted(scores.items(), key=lambda x: -x[1])
        if sorted_scores[0][1] >= 2 * sorted_scores[1][1] or sorted_scores[1][1] == 0:
            return best
        return None

    return None

# === STEP 3: Classify all chapters ===
chapter_classification = {}  # (class, chapter_code) → correct_subject
ambiguous_chapters = []

for key, info in sorted(chapters.items()):
    cls, ch_code = key
    ch_name = list(info["chapter_names"])[0] if info["chapter_names"] else ""
    cbse_subj = list(info["cbse_subjects"])[0] if info["cbse_subjects"] else ""
    topics = info["topics"]

    correct = classify_chapter(ch_name, cbse_subj, topics)

    if correct:
        chapter_classification[key] = correct
    else:
        ambiguous_chapters.append({
            "class": cls,
            "chapter_code": ch_code,
            "chapter_name": ch_name,
            "cbse_subject": cbse_subj,
            "current_subjects": list(info["subjects"]),
            "sample_topics": topics[:3],
            "node_count": len(info["node_ids"]),
        })

print(f"\nChapters classified: {len(chapter_classification)}")
print(f"Ambiguous chapters: {len(ambiguous_chapters)}")

# Show ambiguous chapters for manual review
if ambiguous_chapters:
    print(f"\n{'='*80}")
    print(f"  AMBIGUOUS CHAPTERS (need manual classification)")
    print(f"{'='*80}")
    for a in ambiguous_chapters:
        print(f"  c{a['class']} {a['chapter_code']:8s} | {a['chapter_name'][:45]:45s} | cbse={a['cbse_subject']:15s} | current={a['current_subjects']} | {a['node_count']} nodes")
        for t in a["sample_topics"]:
            print(f"         topic: {t[:60]}")

# === STEP 4: Build corrections ===
corrections = {}
before_counts = defaultdict(lambda: defaultdict(int))
after_counts = defaultdict(lambda: defaultdict(int))

for n in nodes:
    orig_subj = n["subject"]
    # Normalize original
    if orig_subj == "math": orig_subj = "maths"
    if orig_subj == "phy": orig_subj = "physics"
    if orig_subj == "sci": orig_subj = "science"
    if orig_subj == "histciv": orig_subj = "history_civics"
    if orig_subj in ("his", "history"): orig_subj = "hist"
    if orig_subj == "geo": orig_subj = "geography"
    if orig_subj == "history_civivs": orig_subj = "history_civics"

    before_counts[orig_subj][n["class"]] += 1

    key = (n["class"], n["_chapter_code"])
    if key in chapter_classification:
        correct_subj = chapter_classification[key]
        if correct_subj != orig_subj:
            corrections[n["node_id"]] = {
                "original_subject": orig_subj,
                "corrected_subject": correct_subj,
                "class": n["class"],
                "chapter_name": n["chapter_name"][:80],
                "topic": n["topic"][:80],
                "chapter_code": n["_chapter_code"],
                "method": "chapter_level",
            }
            after_counts[correct_subj][n["class"]] += 1
        else:
            after_counts[orig_subj][n["class"]] += 1
    else:
        # Ambiguous chapter — keep original
        after_counts[orig_subj][n["class"]] += 1

# === REPORT ===
print(f"\n{'='*80}")
print(f"  CHAPTER-LEVEL RECLASSIFICATION RESULTS")
print(f"{'='*80}")
print(f"  Total nodes:    {len(nodes)}")
print(f"  Corrected:      {len(corrections)}")
print(f"  Kept original:  {len(nodes) - len(corrections)}")

print(f"\n{'='*80}")
print(f"  BEFORE")
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
print(f"  AFTER")
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

# Show sample corrections grouped by chapter
print(f"\n{'='*80}")
print(f"  SAMPLE CORRECTIONS BY CHAPTER")
print(f"{'='*80}")
shown_chapters = set()
for nid, info in list(corrections.items()):
    ch_key = (info["class"], info["chapter_code"])
    if ch_key not in shown_chapters:
        shown_chapters.add(ch_key)
        print(f"  c{info['class']} {info['chapter_code']:8s} | {info['chapter_name'][:45]:45s}")
        print(f"    {info['original_subject']:15s} → {info['corrected_subject']:15s} | {info['topic'][:40]}")
    if len(shown_chapters) >= 40:
        break

# Save corrections
out = Path(r"D:\platform\cbse_data\cross_board\mappings\subject_corrections.json")
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(json.dumps(corrections, indent=2, ensure_ascii=False), encoding="utf-8")
print(f"\n  Corrections saved to: {out}")
print(f"  Total corrections: {len(corrections)}")
