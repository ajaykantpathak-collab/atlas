"""Build a manual chapter_code → correct_subject map based on reading the actual chapter names.
This is the ground truth — no keyword guessing."""
import json
from pathlib import Path
from collections import defaultdict

# === MANUAL CORRECTION MAP ===
# Based on reading every chapter name in every by_subject file.
# Format: chapter_code → correct_subject
# Only includes chapters that are MISPLACED. Correct ones are left alone.

CHAPTER_CORRECTIONS = {
    # === physics.json: Science chapters (c6-10) need splitting into phy/chem/bio ===
    # Class 6 Science
    "fesc101": "biology",      # Food: Where Does It Come From?
    "fesc102": "biology",      # Components of Food
    "fesc103": "chemistry",    # Fibre to Fabric
    "fesc104": "chemistry",    # Sorting Materials into Groups
    "fesc105": "chemistry",    # Separation of Substances
    "fesc106": "chemistry",    # Changes Around Us
    "fesc107": "biology",      # Getting to Know Plants
    "fesc108": "biology",      # Body Movements
    "fesc109": "biology",      # The Living Organisms — Characteristics and Habitat
    "fesc110": "physics",      # Story of Transport and Need for Measurement
    "fesc111": "physics",      # Light, Shadows and Reflections
    "fesc112": "physics",      # Electricity and Circuits
    "fesc113": "physics",      # Fun with Magnets
    "fesc114": "chemistry",    # Water
    "fesc115": "chemistry",    # Air Around Us
    "fesc116": "biology",      # Garbage in, Garbage out

    # Class 7 Science (gecu = new curriculum, gesc = old)
    "gecu101": "science",      # The Ever-Evolving World of Science (general)
    "gecu102": "chemistry",    # Exploring Substances: Acidic, Basic, and Neutral
    "gecu103": "physics",      # Electricity: Circuits and their Components
    "gecu104": "chemistry",    # The World of Metals and Non-metals
    "gecu105": "chemistry",    # Changes Around Us: Physical and Chemical
    "gecu106": "biology",      # Adolescence: A Stage of Growth and Change
    "gecu107": "physics",      # Heat Transfer in Nature
    "gecu108": "physics",      # Measurement of Time and Motion
    "gecu109": "biology",      # Life Processes in Animals
    "gecu110": "biology",      # Life Processes in Plants
    "gecu111": "physics",      # Light: Shadows and Reflections
    "gecu112": "physics",      # Earth, Moon, and the Sun
    "gesc101": "biology",      # Nutrition in Plants
    "gesc102": "biology",      # Nutrition in Animals
    "gesc103": "physics",      # Heat
    "gesc104": "chemistry",    # Acids, Bases and Salts
    "gesc105": "chemistry",    # Physical and Chemical Changes
    "gesc106": "biology",      # Respiration in Organisms
    "gesc107": "biology",      # Transportation in Animals and Plants
    "gesc108": "biology",      # Reproduction in Plants
    "gesc109": "physics",      # Motion and Time
    "gesc110": "physics",      # Electric Current and its Effects
    "gesc111": "physics",      # Light — Propagation, Reflection, Mirrors, Lenses
    "gesc112": "biology",      # Forests: Our Lifeline
    "gesc113": "chemistry",    # Wastewater Story

    # Class 8 Science
    "hecu104": "physics",      # Electricity: Magnetic and Heating Effects
    "hecu108": "chemistry",    # Nature of Matter: Elements, Compounds, and Mixtures
    "hecu111": "physics",      # Keeping Time with the Skies
    "hesc105": "biology",      # Conservation of Plants and Animals
    "hesc110": "physics",      # Sound
    "hesc112": "physics",      # Some Natural Phenomena
    "hesc113": "physics",      # Light

    # Class 9 Science
    "iesc106": "physics",      # How Forces Affect Motion
    "iesc107": "physics",      # Work, Energy, and Simple Machines
    "iesc108": "chemistry",    # Journey Inside the Atom
    "iesc110": "physics",      # Sound Waves: Characteristics and Applications
    "iesc111": "biology",      # Reproduction: How Life Continues

    # Class 10 Science
    "jesc101": "chemistry",    # Chemical Reactions and Equations
    "jesc105": "biology",      # Life Processes
    "jesc110": "physics",      # The Human Eye and the Colourful World
    "jesc111": "physics",      # Electricity
    "jesc112": "physics",      # Magnetic Effects of Electric Current
    "jesc113": "biology",      # Our Environment

    # === science.json: labeled "Civics" but mixed ===
    # Class 8 — actually GEOGRAPHY
    "hess401": "geography",    # Resources and Development
    "hess402": "geography",    # Land, Soil, Water, Natural Vegetation and Wildlife
    "hess403": "geography",    # Agriculture
    "hess404": "geography",    # Industries
    "hess405": "geography",    # Human Resources
    # Class 9 — actually CIVICS
    "iess401": "history_civics",  # Democracy in the Contemporary World
    "iess402": "history_civics",  # Constitutional Design
    "iess405": "history_civics",  # Democratic Rights
    # Class 10 — actually HISTORY
    "jess301": "hist",         # The Rise of Nationalism in Europe
    "jess302": "hist",         # Nationalism in India
    "jess303": "hist",         # The Making of a Global World
    "jess304": "hist",         # The Age of Industrialisation
    "jess305": "hist",         # Print Culture and the Modern World

    # === geography.json: labeled "Geography" but many are HISTORY ===
    # Class 7 — actually HISTORY
    "gess101": "hist",         # Tracing Changes Through a Thousand Years
    "gess102": "hist",         # Kings and Kingdoms
    "gess103": "hist",         # Delhi: 12th to 15th Century
    "gess104": "hist",         # The Mughals (16th to 17th Century)
    "gess105": "hist",         # Tribes, Nomads and Settled Communities
    "gess106": "hist",         # Devotional Paths to the Divine
    "gess107": "hist",         # The Making of Regional Cultures
    "gess108": "hist",         # Eighteenth-Century Political Formations
    # Class 8 — actually HISTORY
    "hess201": "hist",         # Introduction: How, When and Where
    "hess202": "hist",         # From Trade to Territory: The East India Company
    "hess203": "hist",         # Ruling the Countryside
    "hess204": "hist",         # Tribals, Dikus and the Vision of a Golden Age
    "hess205": "hist",         # When People Revolt: 1857 and After
    "hess206": "hist",         # Civilising the 'Native', Educating the Nation
    "hess207": "hist",         # Women, Caste and Reform
    "hess208": "hist",         # The Making of the National Movement: 1870s–1947
    # Class 9 — real geography (correct already)
    # Class 11 — labeled "Geography_1" but actually PHYSICAL EDUCATION
    "kehp101": "health_and_physical_education",  # Introduction to Physical Education
    "kehp102": "health_and_physical_education",  # Understanding Health
    "kehp103": "health_and_physical_education",  # Physical and Physiological Aspects
    "kehp104": "health_and_physical_education",  # Individual Games
    "kehp105": "health_and_physical_education",  # Team Games
    "kehp106": "health_and_physical_education",  # Yoga and its Relevance
    "kehp107": "health_and_physical_education",  # Safety and Security
    "kehp108": "health_and_physical_education",  # Health Related Physical Fitness
    "kehp109": "health_and_physical_education",  # Measurement and Evaluation
    "kehp110": "health_and_physical_education",  # Tournaments and Competitions
    "kehp111": "health_and_physical_education",  # Adventure Sports

    # === hist.json: labeled "History" but many are GEOGRAPHY/CIVICS/ECONOMICS ===
    # Class 7 — actually GEOGRAPHY
    "gess201": "geography",    # Our Environment
    "gess202": "geography",    # Inside Our Earth
    "gess203": "geography",    # Our Changing Earth
    "gess204": "geography",    # Air
    "gess205": "geography",    # Water
    "gess206": "geography",    # Human Environment Interactions
    "gess207": "geography",    # Life in the Deserts
    # Class 8 — actually CIVICS
    "hess301": "history_civics",  # The Indian Constitution
    "hess302": "history_civics",  # Understanding Secularism
    "hess303": "history_civics",  # Parliament and the Making of Laws
    "hess304": "history_civics",  # Judiciary
    "hess306": "history_civics",  # Confronting Marginalisation
    # Class 10 — actually ECONOMICS
    "jess201": "economics",    # Understanding Economic Development
    "jess202": "economics",    # Sectors of the Indian Economy
    "jess203": "economics",    # Money and Credit
    "jess204": "economics",    # Globalisation and the Indian Economy
    "jess205": "economics",    # Consumer Rights

    # === history_civics.json: labeled "Social_Science" — need splitting ===
    # Class 6 — actually HISTORY
    "fess101": "hist",         # What, Where, How and When?
    "fess102": "hist",         # On The Trail of the Earliest People
    "fess103": "hist",         # From Gathering to Growing Food
    "fess104": "hist",         # In the Earliest Cities
    "fess105": "hist",         # What Books and Burials Tell Us
    "fess106": "hist",         # Kingdoms, Kings and an Early Republic
    "fess107": "hist",         # New Questions and Ideas
    "fess108": "hist",         # Ashoka, The Emperor Who Gave Up War
    "fess109": "hist",         # Vital Villages, Thriving Towns
    "fess110": "hist",         # Traders, Kings and Pilgrims
    "fess111": "hist",         # New Empires and Kingdoms
    # Class 7 — MIXED
    "gees101": "geography",    # Geographical Diversity of India
    "gees102": "geography",    # Understanding the Weather
    "gees103": "geography",    # Climates of India
    "gees104": "hist",         # New Beginnings: Cities and States
    "gees105": "hist",         # The Rise of Empires
    "gees106": "hist",         # The Age of Reorganisation
    "gees107": "hist",         # The Gupta Era: An Age of Tireless Creativity
    "gees108": "geography",    # How the Land Becomes Sacred
    "gees109": "history_civics",  # From the Rulers to the Ruled: Types of Government
    "gees110": "history_civics",  # The Constitution of India — An Introduction
    "gees111": "economics",    # From Barter to Money
    "gees112": "economics",    # Understanding Markets
    "gees201": "geography",    # The Story of Indian Farming
    "gees202": "geography",    # India and Her Neighbours
    "gees203": "hist",         # Empires and Kingdoms: 6th to 10th Centuries
    "gees204": "hist",         # Turning Tides: 11th and 12th Centuries
    "gees205": "geography",    # India, a Home to Many
    "gees206": "history_civics",  # The State, the Government, and You
    "gees207": "economics",    # Infrastructure: Engine of India's Development
    "gees208": "economics",    # Banks and the Magic of Finance
    # Class 8 — MIXED
    "hees101": "geography",    # Natural Resources and Their Use
    "hees102": "hist",         # Reshaping India's Political Map
    "hees103": "hist",         # The Rise of the Marathas
    "hees106": "history_civics",  # The Parliamentary System: Legislature and Executive
    # Class 10 — actually GEOGRAPHY
    "jess101": "geography",    # Resources and Development
    "jess102": "geography",    # Forest and Wildlife Resources
    "jess103": "geography",    # Water Scarcity and the Need for Conservation
    "jess104": "geography",    # Agriculture in India
    "jess105": "geography",    # Minerals and Energy Resources
    "jess106": "geography",    # Importance of Manufacturing
    "jess107": "geography",    # Lifelines of National Economy
    "jess1a1": "geography",    # Contemporary India – II: Appendices

    # === economics.json: labeled "Economics" but c10 is CIVICS ===
    "jess401": "history_civics",  # Power-sharing
    "jess402": "history_civics",  # Federalism
    "jess403": "history_civics",  # Gender, Religion and Caste
    "jess404": "history_civics",  # Political Parties
    "jess405": "history_civics",  # Outcomes of Democracy

    # === computer_science.json: labeled "Civics" but is COMPUTER SCIENCE ===
    "kecs101": "computer_science",  # Computer System
    "kecs102": "computer_science",  # Encoding Schemes and Number System
    "kecs103": "computer_science",  # Emerging Trends
    "kecs104": "computer_science",  # Introduction to Problem Solving
    "kecs105": "computer_science",  # Getting Started with Python
    "kecs106": "computer_science",  # Flow of Control
    "kecs107": "computer_science",  # Functions
    "kecs108": "computer_science",  # Strings
    "kecs109": "computer_science",  # Lists
    "kecs110": "computer_science",  # Tuples and Dictionaries
    "kecs111": "computer_science",  # Digital Footprint and Digital Society
    "lecs101": "computer_science",  # Exception Handling in Python
    "lecs102": "computer_science",  # File Handling in Python
    "lecs103": "computer_science",  # Stack
    "lecs104": "computer_science",  # Queue
    "lecs105": "computer_science",  # Sorting
    "lecs106": "computer_science",  # Searching
    "lecs107": "computer_science",  # Understanding Data
    "lecs108": "computer_science",  # Database Concepts
    "lecs109": "computer_science",  # Structured Query Language (SQL)
    "lecs110": "computer_science",  # Computer Networks
    "lecs111": "computer_science",  # Data Communication
    "lecs112": "computer_science",  # Security Aspects
    "lecs113": "computer_science",  # Project Based Learning

    # === biology.json: some c12 chapters are actually HOME SCIENCE ===
    "lehe101": "home_science",  # Work, Livelihood and Career
    "lehe102": "home_science",  # Clinical Nutrition and Dietetics
    "lehe103": "home_science",  # Public Nutrition And Health
    "lehe104": "home_science",  # Food Processing and Technology
    "lehe105": "home_science",  # Food Quality and Food Safety
    "lehe106": "home_science",  # Early Childhood Care and Education
    "lehe107": "home_science",  # Management of Support Services

    # === maths: kemh102 is c8 not c11 (mislabeled class) ===
    "kemh102": "maths",        # Sets (already maths, just class fix needed)

    # === English: keww122 is actually Political Science content ===
    "keww122": "political_science",  # Indian Constitutional Framework and Democratic Pri
}

# === APPLY CORRECTIONS ===
subj_dir = Path(r"D:\platform\cbse_data\nodes\by_subject")
corrections = {}  # node_id → {original, corrected, chapter_code, ...}
before = defaultdict(lambda: defaultdict(int))
after = defaultdict(lambda: defaultdict(int))

for f in sorted(subj_dir.glob("*.json")):
    file_subject = f.stem
    data = json.loads(f.read_text(encoding="utf-8"))
    for n in data:
        nid = n.get("node_id", "")
        orig = n.get("subject", "").strip()
        cls = n.get("class_level", 0)
        if isinstance(cls, str):
            try: cls = int(cls)
            except: cls = 0

        # Normalize original
        if orig == "math": orig = "maths"
        if orig == "phy": orig = "physics"
        if orig == "sci": orig = "science"
        if orig == "histciv": orig = "history_civics"
        if orig in ("his", "history"): orig = "hist"
        if orig == "geo": orig = "geography"
        if orig == "acc": orig = "accounts"
        if orig == "legal": orig = "legal_studies"
        if orig == "pe": orig = "health_and_physical_education"
        if orig == "amath": orig = "applied_maths"
        if orig == "applied_ath": orig = "applied_maths"
        if orig == "Political Science": orig = "political_science"
        if orig in ("", "English", "English Language"): orig = "English Literature"
        if orig == "history_civivs": orig = "history_civics"
        if orig == "bt": orig = "biotech"

        before[orig][cls] += 1

        ch_code = n.get("_chapter_code", "")
        if ch_code in CHAPTER_CORRECTIONS:
            correct = CHAPTER_CORRECTIONS[ch_code]
            if correct != orig:
                corrections[nid] = {
                    "original_subject": orig,
                    "corrected_subject": correct,
                    "class": cls,
                    "chapter_code": ch_code,
                    "chapter_name": n.get("chapter", "")[:60],
                    "topic": n.get("topic", "")[:60],
                    "source_file": file_subject,
                }
                after[correct][cls] += 1
            else:
                after[orig][cls] += 1
        else:
            after[orig][cls] += 1

# === REPORT ===
print(f"{'='*80}")
print(f"  CHAPTER-LEVEL MANUAL CORRECTION RESULTS")
print(f"{'='*80}")
print(f"  Total corrections: {len(corrections)}")

print(f"\n{'='*80}")
print(f"  BEFORE (all classes)")
print(f"{'='*80}")
print(f"{'Subject':30s}", end="")
for cls in range(1, 13):
    print(f"{'c'+str(cls):>5s}", end="")
print(f"{'Total':>8s}")
print("-" * 100)
for subj in sorted(before.keys()):
    print(f"{subj:30s}", end="")
    total = 0
    for cls in range(1, 13):
        cnt = before[subj].get(cls, 0)
        print(f"{cnt:5d}" if cnt > 0 else f"{'-':>5s}", end="")
        total += cnt
    print(f"{total:8d}")

print(f"\n{'='*80}")
print(f"  AFTER (all classes)")
print(f"{'='*80}")
print(f"{'Subject':30s}", end="")
for cls in range(1, 13):
    print(f"{'c'+str(cls):>5s}", end="")
print(f"{'Total':>8s}")
print("-" * 100)
for subj in sorted(after.keys()):
    print(f"{subj:30s}", end="")
    total = 0
    for cls in range(1, 13):
        cnt = after[subj].get(cls, 0)
        print(f"{cnt:5d}" if cnt > 0 else f"{'-':>5s}", end="")
        total += cnt
    print(f"{total:8d}")

# Show corrections by chapter
print(f"\n{'='*80}")
print(f"  CORRECTIONS BY CHAPTER (sample)")
print(f"{'='*80}")
shown = set()
for nid, info in sorted(corrections.items()):
    ch = info["chapter_code"]
    if ch not in shown:
        shown.add(ch)
        print(f"  {ch:10s} c{info['class']:>2} | {info['chapter_name'][:45]:45s} | {info['original_subject']:15s} → {info['corrected_subject']:15s} | from {info['source_file']}")
    if len(shown) >= 60:
        break

# Save
out = Path(r"D:\platform\cbse_data\cross_board\mappings\subject_corrections.json")
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(json.dumps(corrections, indent=2, ensure_ascii=False), encoding="utf-8")
print(f"\n  Saved {len(corrections)} corrections to {out}")
