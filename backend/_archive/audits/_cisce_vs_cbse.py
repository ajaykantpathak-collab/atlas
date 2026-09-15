"""Compare CISCE syllabus chapters vs CBSE chapters.
CISCE chapters are manually compiled from official CISCE syllabus (2025-26/2026-27).
CBSE chapters are read from the result files."""
import json
from pathlib import Path
from collections import defaultdict

# ============================================================
# CISCE SYLLABUS - COMPILED FROM OFFICIAL CISCE SOURCES
# ============================================================

CISCE_SYLLABUS = {
    # === UPPER PRIMARY (Classes 6-8) ===
    # ICSE Class 6 - Physics (8 chapters)
    6: {
        "physics": [
            "An Introduction to Physics", "Matter", "Measurement",
            "Force and Pressure", "Work & Energy", "Simple Machines",
            "Light", "Magnetism",
        ],
        "chemistry": [
            "Chemistry: An Introduction", "States of Matter", "Pure And Mixed Substances",
            "Water", "Changes Around Us", "Rocks and Minerals",
            "Air and Atmosphere", "Chemistry in our Life",
        ],
        "biology": [
            "Structure and Function of Plant Parts", "Cell Structure and Function",
            "Human - Digestive System", "Respiratory System", "The Circulatory System",
            "Health and Hygiene", "Habitat and Adaptation",
        ],
        "maths": [
            "Number System", "Integers", "Factors And Multiples", "Sets",
            "Ratio And Proportion", "Unitary Methods", "Fractions", "Decimals",
            "Percentage", "Speed, Distance and Time",
            "Fundamentals Concepts of Algebra", "Simple Equations",
            "Fundamental Geometrical Concepts", "Properties of Angles and Lines",
            "Triangles", "Quadrilaterals", "Polygon", "Circles", "Symmetry",
            "Recognition of Solids", "Mensuration", "Data-Handling",
        ],
        "history": [
            "The River Valley Civilisations", "The Vedic Civilisation",
            "Jainism and Buddhism", "The Rise of Magadha", "The Mauryan Empire",
            "The Gupta Empire", "Harshavardhana",
        ],
        "civics": [
            "Rural Local Self-Government", "Urban Local Self-Government",
        ],
        "geography": [
            "Representation of Geographical Features", "Landforms",
            "Water Bodies", "Weather and Climate", "Natural Resources",
            "Natural Vegetation and Wildlife", "North America",
        ],
    },
    # ICSE Class 7 - Physics (7), Chemistry (11), Biology (7), Maths (28)
    7: {
        "physics": [
            "Measurement", "Motion", "Energy",
            "Light", "Heat",
            "Sound", "Electricity And Magnetism",
        ],
        "chemistry": [
            "Introduction Chemistry - Matter", "Physical And Chemical Change",
            "Elements, Compounds And Mixtures",
            "Atomic Structure", "Language of Chemistry", "Water", "Acids, Bases And Salts",
            "Metals And Non-Metals", "Air", "Chemistry in our Life", "Hydrogen",
        ],
        "biology": [
            "Plant And Animal Tissues", "Classification of Plants", "Classification of Animals",
            "Photosynthesis and Respiration", "Excretion in Humans",
            "Nervous System", "Allergy",
        ],
        "maths": [
            "Number System", "Integers", "Rational Numbers", "Fractions", "Decimals",
            "Factors and Multiples", "Powers And Roots", "Exponents", "Sets", "Operations on Sets",
            "Ratio and Proportion", "The Unitary Method and Variation", "Time and Work",
            "Time and Distance", "Percentage", "Profit, Loss and Discount", "Simple Interest",
            "Fundamental Concepts & Algebraic Expressions", "Equations and Inequations",
            "Angles and Parallel Lines", "Basic Constructions", "Triangles",
            "Congruency of triangles", "Symmetry, Reflection and Rotation",
            "Recognition of Solids", "Mensuration", "Statistics", "Probability",
        ],
        "history": [
            "Medieval Europe", "Rise and Spread of Christianity", "Rise and Spread of Islam",
            "Delhi Sultanate", "Cultural and Religious Developments",
            "Mughal Empire", "Bhakti and Sufi Movements",
        ],
        "civics": [
            "Medieval Period", "Delhi Sultanate", "Mughal Empire",
        ],
        "geography": [
            "Interior of the Earth", "Landforms", "Weather and Climate",
            "Natural Resources", "Africa", "Australia",
        ],
    },
    # ICSE Class 8 - Physics (9), Chemistry (10), Biology (8), Maths (25)
    8: {
        "physics": [
            "Matter", "Physical Quantities And Measurement", "Force And Pressure",
            "Energy", "Light", "Heat",
            "Sound", "Static Electricity", "Current Electricity",
        ],
        "chemistry": [
            "Matter - Elements, Compounds and Mixtures", "Atomic Structure",
            "Language of Chemistry And Chemical Reactions",
            "Hydrogen", "Water", "Oxygen", "Acid, Bases And Salts",
            "Carbon and its Compounds", "Metals & Non-Metals", "Air and its Burning",
        ],
        "biology": [
            "The Circulatory System in Human Beings", "Transportation in Plants",
            "Reproduction in Plants And Animals",
            "Adolescence and Endocrine System", "Nervous System",
            "Ecosystem", "Health and Hygiene", "Food Production and Management",
        ],
        "maths": [
            "Sets", "Venn Diagram", "Real Numbers", "Factors and Multiples",
            "Square Roots And Cube Roots", "Exponents", "Ratio And Proportion", "Percentage",
            "Profit And Loss", "Simple Interest", "Compound Interest",
            "Direct And Inverse Variation", "Time and Distance",
            "Algebraic Expressions", "Identities", "Factorization",
            "Linear Equation", "Linear Equation", "Polygons", "Quadrilaterals",
            "Geometrical Construction", "Representing 3D in 2D",
            "Perimeter and Area of Plane Figures", "Volume and Surface Area of Solids",
            "Statistics & Probability",
        ],
        "history": [
            "The Modern Age in Europe", "The Industrial Revolution",
            "The American Revolution", "The French Revolution",
        ],
        "civics": [
            "The Union Legislature", "The Union Executive",
            "The Judiciary", "Local Self-Government",
        ],
        "geography": [
            "Weathering and Soil Formation", "Industries", "Human Resources",
            "Asia", "North America", "South America",
        ],
    },

    # === ICSE Classes 9-10 (board exam syllabus) ===
    # Class 9 and 10 share the same syllabus (CISCE publishes combined)
    # Physics (10 chapters), Chemistry (9), Biology (7), Maths (~25)
    9: {
        "physics": [
            "Measurements and Experimentation", "Motion in One Dimension",
            "Laws of Motion", "Fluids", "Heat and Kinetic Theory of Matter",
            "Light", "Sound", "Static Electricity", "Current Electricity",
            "Magnetism and Electromagnetism",
        ],
        "chemistry": [
            "The Language of Chemistry", "Chemical Changes and Reactions",
            "Water", "Atomic Structure and Chemical Bonding",
            "The Periodic Table", "Study of the First Element - Hydrogen",
            "Study of Gas Laws", "Atmosphere and Pollution",
            "Practical Chemistry",
        ],
        "biology": [
            "Basic Biology", "Flowering Plants", "Plant Physiology",
            "Human Anatomy and Physiology", "Health and Hygiene",
            "Waste Generation and Management", "Economic Biology",
        ],
        "maths": [
            "Rational and Irrational Numbers", "Compound Interest",
            "Expansions", "Factorisation", "Simultaneous Linear Equations",
            "Problems on Simultaneous Linear Equations", "Quadratic Equations",
            "Indices/Exponents", "Logarithms", "Triangles",
            "Mid-Point Theorem", "Pythagoras Theorem", "Rectilinear Figures",
            "Theorems on Area", "Circle: Chord and Arc Properties",
            "Circle: Chord Properties", "Circle: Arc Properties",
            "Statistics", "Mean and Median", "Trigonometrical Ratios",
            "Trigonometrical Ratios of Standard Angles",
            "Co-ordinate Geometry: Reflection", "Co-ordinate Geometry: Equation of Line",
            "Symmetry", "Similarity",
        ],
        "history": [
            "The Harappan Civilisation", "The Vedic Age",
            "India in the 6th Century BC", "The Mauryan Empire",
            "The Sangam Age", "The Gupta Empire", "Medieval India",
            "The Mughal Empire", "The Marathas",
        ],
        "civics": [
            "Our Constitution", "Salient Features of the Constitution",
            "Fundamental Rights and Duties", "Directive Principles of State Policy",
            "The Union Executive", "The Union Legislature",
            "The Judiciary", "The State Executive",
        ],
        "geography": [
            "Earth as a Planet", "Latitude and Longitude", "Rotation and Revolution",
            "Earth's Structure", "Landforms of the Earth", "Volcanoes",
            "Earthquakes", "Weathering", "Water Resources",
            "Atmosphere", "Weather and Climate", "Natural Regions of the World",
            "Map Work",
        ],
        "economics": [
            "Basic Concepts of Economics", "Role of Government in Economic Development",
            "Public Revenue", "Public Expenditure", "Public Debt",
        ],
        "commercial_studies": [
            "Introduction to Commercial Studies", "Human Activities",
            "Business Organisation", "Sole Proprietorship",
            "Partnership Firms", "Joint Stock Company",
            "Cooperative Society", "Public Sector Enterprises",
        ],
        "computer_science": [
            "Computer Basics", "Data Representation", "Boolean Algebra",
            "Logic Gates", "Programming in Java",
        ],
    },
    10: {
        "physics": [
            "Force, Work, Energy and Power", "Machines",
            "Refraction of Light at Plane Surfaces", "Refraction Through Lens",
            "Spectrum", "Sound", "Current Electricity",
            "Electro-Magnetism", "Heat", "Modern Physics (Radioactivity)",
        ],
        "chemistry": [
            "Periodic Table and Periodic Properties", "Chemical Bonding",
            "Study of Acids, Bases and Salts", "Analytical Chemistry",
            "Mole Concept and Stoichiometry", "Electrolysis",
            "Metallurgy", "Study of Compounds (HCl, NH3, HNO3, H2SO4)",
            "Organic Chemistry",
        ],
        "biology": [
            "Cell Biology and Genetics", "Plant Physiology",
            "Human Anatomy and Physiology", "Human Evolution",
            "Pollution and Environment", "Population and Health",
        ],
        "maths": [
            "Goods and Services Tax (GST)", "Banking",
            "Shares and Dividends", "Linear Inequations",
            "Quadratic Equations", "Ratio and Proportion",
            "Factorisation", "Matrices", "Arithmetic Progression",
            "Geometric Progression", "Coordinate Geometry - Reflection",
            "Coordinate Geometry - Section and Mid-Point Formula",
            "Coordinate Geometry - Equation of a Line",
            "Similarity of Triangles", "Loci", "Circles",
            "Constructions", "Mensuration", "Trigonometry",
            "Statistics", "Probability",
        ],
        "history": [
            "The First War of Independence (1857)", "Growth of Nationalism",
            "First Phase of the Indian National Movement",
            "Second Phase of the Indian National Movement",
            "Muslim League and Partition of India",
            "National Movement (1905-1919)", "National Movement (1919-1939)",
            "National Movement (1940-1947)", "Forward Bloc and INA",
            "Independence and Aftermath",
        ],
        "civics": [
            "The Union Executive (President, Vice President, PM, Council of Ministers)",
            "The Union Legislature (Parliament)",
            "The Judiciary (Supreme Court)",
            "The State Executive (Governor, CM, Council of Ministers)",
            "The State Legislature",
            "Local Self-Government",
        ],
        "geography": [
            "Topographical Maps", "Map of India",
            "Climate of India", "Soil Resources",
            "Natural Vegetation", "Water Resources",
            "Minerals and Energy Resources", "Agriculture in India",
            "Industries in India", "Transport in India",
            "Waste Management",
        ],
        "economics": [
            "Productive Efforts in India", "Banking in India",
            "Inflation", "Emergence of India as a Republic",
        ],
        "commercial_studies": [
            "Business Finance", "Capital",
            "Banking", "Advertising and Sales Promotion",
            "Consumer Protection", "Industrial Relations",
        ],
        "computer_science": [
            "Boolean Algebra", "Computer Hardware",
            "Java Programming", "Arrays", "String Handling",
        ],
    },

    # === ISC Classes 11-12 ===
    # Class 11 - Physics (10), Chemistry (9), Biology (~10), Maths (~10)
    11: {
        "physics": [
            "Physical World and Measurement", "Units and Dimensions",
            "Kinematics", "Laws of Motion", "Work, Energy and Power",
            "Motion of System of Particles and Rigid Body",
            "Gravitation", "Properties of Bulk Matter",
            "Thermodynamics", "Oscillations and Waves",
        ],
        "chemistry": [
            "Some Basic Concepts of Chemistry", "Structure of Atom",
            "Classification of Elements and Periodicity", "Chemical Bonding and Molecular Structure",
            "Chemical Thermodynamics", "Equilibrium",
            "Redox Reactions", "Organic Chemistry - Basic Principles",
            "Hydrocarbons",
        ],
        "biology": [
            "Diversity of Living Organisms", "Structural Organisation in Plants and Animals",
            "Cell: Structure and Function", "Plant Physiology",
            "Human Physiology",
        ],
        "maths": [
            "Sets and Functions", "Algebra", "Trigonometry",
            "Coordinate Geometry", "Calculus",
            "Statistics and Probability", "Conic Section",
            "Introduction to Three Dimensional Geometry", "Mathematical Reasoning",
        ],
        "english": [
            "English Language", "English Literature",
        ],
        "history": [
            "Understanding History", "Early Societies",
            "Empires", "Changing Traditions", "Towards Modernisation",
        ],
        "geography": [
            "Geography as a Discipline", "Origin and Evolution of the Earth",
            "Interior of the Earth", "Distribution of Oceans and Continents",
            "Minerals and Rocks", "Geomorphic Processes",
            "Climate", "Map Work",
        ],
        "political_science": [
            "Constitution", "Democracy",
            "Election and Representation", "Local Governments",
            "Federalism", "Legislature", "Executive", "Judiciary",
        ],
        "economics": [
            "Introduction to Economics", "Collection of Data",
            "Organisation of Data", "Presentation of Data",
            "Measures of Central Tendency", "Correlation",
            "Index Numbers", "Use of Statistical Tools",
        ],
        "accounts": [
            "Introduction to Accounting", "Journal and Ledger",
            "Subsidiary Books", "Bank Reconciliation Statement",
            "Trial Balance", "Depreciation", "Final Accounts",
        ],
        "business_studies": [
            "Business, Trade and Commerce", "Forms of Business Organisation",
            "Private, Public and Global Enterprises", "Business Services",
            "Emerging Modes of Business", "Social Responsibilities of Business",
            "Formation of a Company", "Sources of Business Finance",
        ],
        "sociology": [
            "Sociology: Concepts and Terms", "Structure of Groups",
            "Social Institutions", "Culture and Society",
        ],
        "psychology": [
            "Introduction to Psychology", "Methods of Psychology",
            "Human Development", "Sensation and Perception",
            "Learning", "Memory",
        ],
        "computer_science": [
            "Computer System", "Encoding Schemes", "Emerging Trends",
            "Introduction to Problem Solving", "Getting Started with Python",
            "Flow of Control", "Functions", "Strings",
            "Lists", "Tuples and Dictionaries",
        ],
        "home_science": [
            "Introduction to Home Science", "Understanding the Self",
            "Food, Nutrition, Health and Fitness", "Management of Resources",
            "Fabrics Around Us", "Media and Communication",
        ],
        "biotech": [
            "Introduction to Biotechnology", "Cell Biology",
            "Plant Tissue Culture", "Genetics",
        ],
        "legal_studies": [
            "Concept of State and Nation", "Sources of Law",
            "Constitutional Framework", "Judicial System",
        ],
    },
    12: {
        "physics": [
            "Electrostatics", "Current Electricity",
            "Magnetic Effects of Current and Magnetism", "Electromagnetic Induction",
            "Electromagnetic Waves", "Optics",
            "Dual Nature of Matter and Radiation", "Atoms and Nuclei",
            "Electronic Devices",
        ],
        "chemistry": [
            "Solutions", "Electrochemistry", "Chemical Kinetics",
            "d- and f-Block Elements", "Coordination Compounds",
            "Haloalkanes and Haloarenes", "Alcohols, Phenols and Ethers",
            "Aldehydes, Ketones and Carboxylic Acids",
            "Organic Compounds containing Nitrogen", "Biomolecules",
        ],
        "biology": [
            "Reproduction in Organisms", "Genetics and Evolution",
            "Biology in Human Welfare", "Biotechnology",
            "Ecology",
        ],
        "maths": [
            "Relations and Functions", "Inverse Trigonometric Functions",
            "Matrices", "Determinants",
            "Continuity and Differentiability", "Application of Derivatives",
            "Integrals", "Application of Integrals",
            "Differential Equations", "Vector Algebra",
            "Three Dimensional Geometry", "Linear Programming",
            "Probability",
        ],
        "english": [
            "English Language", "English Literature",
        ],
        "history": [
            "Bricks, Beads and Bones", "Kings, Farmers and Towns",
            "Kinship, Caste and Class", "Thinkers, Beliefs and Buildings",
            "Travellers as Sources", "Bhakti-Sufi Traditions",
            "Vijayanagara", "Peasants, Zamindars and State",
            "Colonialism and Countryside", "Mahatma Gandhi and Nationalist Movement",
            "Framing the Constitution",
        ],
        "geography": [
            "Human Geography", "Population: Distribution and Density",
            "Human Development", "Human Activities",
            "Transport and Communication", "International Trade",
            "Land Resources and Agriculture", "Water Resources",
            "Mineral and Energy Resources", "Spatial Information Technology",
        ],
        "political_science": [
            "Indian Constitution", "Executive",
            "Legislature", "Judiciary",
            "Federalism", "Local Governments",
            "Politics of Planned Development", "India's Foreign Policy",
        ],
        "economics": [
            "Introduction to Macroeconomics", "National Income Accounting",
            "Money and Banking", "Determination of Income and Employment",
            "Government Budget", "Open Economy Macroeconomics",
            "Introduction to Microeconomics", "Production and Costs",
            "Theory of the Firm", "Market Equilibrium",
        ],
        "accounts": [
            "Partnership Accounts", "Company Accounts",
            "Financial Statements", "Cash Flow Statement",
            "Ratio Analysis", "Computerised Accounting",
        ],
        "business_studies": [
            "Nature and Significance of Management", "Principles of Management",
            "Business Environment", "Planning", "Organising",
            "Staffing", "Directing", "Controlling",
            "Financial Management", "Marketing", "Consumer Protection",
        ],
        "sociology": [
            "Indian Society", "Social Institutions",
            "Religion and Society", "Political Processes",
            "Social Change",
        ],
        "psychology": [
            "Intelligence and Aptitude", "Personality",
            "Stress and Stress Management", "Psychological Disorders",
            "Therapy", "Social Influence",
        ],
        "computer_science": [
            "Exception Handling", "File Handling",
            "Stack", "Queue", "Sorting", "Searching",
            "Database Concepts", "SQL", "Computer Networks",
        ],
        "home_science": [
            "Work, Livelihood and Career", "Clinical Nutrition and Dietetics",
            "Public Nutrition and Health", "Food Processing and Technology",
            "Early Childhood Care and Education", "Management of Support Services",
        ],
        "biotech": [
            "Genome Technology", "Microbial Culture",
            "Plant Tissue Culture", "Animal Cell Culture",
            "Bioprocessing and Biomanufacturing",
        ],
        "legal_studies": [
            "Fundamental Elements of a Crime", "Contract Law",
            "Tort Law", "Property Law",
        ],
    },
}

# ============================================================
# CBSE CHAPTERS - FROM RESULT FILES
# ============================================================

CBSE_OUTPUT = Path(r"D:\platform\cbse_coverage_output")
cbse_chapters = defaultdict(set)  # (class, subject) -> set of chapter names

for f in sorted(CBSE_OUTPUT.glob("*_result.json")):
    if f.stat().st_size < 100:
        continue
    try:
        data = json.loads(f.read_text(encoding="utf-8"))
    except:
        continue
    for chunk in data.get("results", []):
        for node in chunk.get("nodes", []):
            cls = node.get("class_level", 0)
            if isinstance(cls, str):
                try: cls = int(cls)
                except: cls = 0
            if not isinstance(cls, int) or cls < 6 or cls > 12:
                continue

            subj = node.get("subject", "").strip()
            if subj == "math": subj = "maths"
            if subj == "phy": subj = "physics"
            if subj == "sci": subj = "science"
            if subj == "histciv": subj = "history_civics"
            if subj in ("his", "history"): subj = "hist"
            if subj == "geo": subj = "geography"
            if subj == "acc": subj = "accounts"
            if subj == "legal": subj = "legal_studies"
            if subj == "pe": subj = "health_and_physical_education"
            if subj == "amath": subj = "applied_maths"
            if subj == "applied_ath": subj = "applied_maths"
            if subj == "Political Science": subj = "political_science"
            if subj in ("", "English", "English Language"): subj = "english"
            if subj == "history_civivs": subj = "history_civics"
            if subj == "bt": subj = "biotech"

            ch_name = node.get("chapter_name", "").strip()
            if ch_name and len(ch_name) > 3:
                cbse_chapters[(cls, subj)].add(ch_name.lower()[:50])

# ============================================================
# COMPARE
# ============================================================

# Map CISCE subjects to CBSE subjects
SUBJECT_MAP = {
    "physics": "physics", "chemistry": "chemistry", "biology": "biology",
    "maths": "maths", "history": "hist", "civics": "history_civics",
    "geography": "geography", "economics": "economics",
    "commercial_studies": "business_studies",
    "computer_science": "computer_science",
    "english": "english", "political_science": "political_science",
    "accounts": "accounts", "business_studies": "business_studies",
    "sociology": "sociology", "psychology": "psychology",
    "home_science": "home_science", "biotech": "biotech",
    "legal_studies": "legal_studies",
}

def normalize(s):
    """Normalize chapter name for comparison."""
    s = s.lower().strip()
    # Remove common prefixes/suffixes
    for prefix in ["chapter ", "unit ", "the ", "a ", "an "]:
        if s.startswith(prefix):
            s = s[len(prefix):]
    return s[:40]

# Build normalized CBSE chapter lookup
cbse_normalized = defaultdict(set)
for (cls, subj), chapters in cbse_chapters.items():
    for ch in chapters:
        cbse_normalized[(cls, subj)].add(normalize(ch))

print(f"{'='*120}")
print(f"  CISCE vs CBSE CHAPTER COMPARISON")
print(f"{'='*120}")

total_cisce = 0
total_missing = 0
total_found = 0
missing_by_class = defaultdict(int)
found_by_class = defaultdict(int)

for cls in range(6, 13):
    cisce_subjects = CISCE_SYLLABUS.get(cls, {})
    if not cisce_subjects:
        continue

    print(f"\n{'='*100}")
    print(f"  CLASS {cls}")
    print(f"{'='*100}")

    for cisce_subj, chapters in cisce_subjects.items():
        cbse_subj = SUBJECT_MAP.get(cisce_subj, cisce_subj)
        cbse_chs = cbse_normalized.get((cls, cbse_subj), set())

        missing = []
        found = []
        for ch in chapters:
            norm = normalize(ch)
            # Check if any CBSE chapter contains this or vice versa
            matched = False
            for cbse_ch in cbse_chs:
                if norm in cbse_ch or cbse_ch in norm or norm == cbse_ch:
                    matched = True
                    break
                # Word overlap check
                cisce_words = set(norm.split())
                cbse_words = set(cbse_ch.split())
                overlap = cisce_words & cbse_words
                # Filter out very common words
                common = {"and", "of", "the", "in", "to", "for", "with", "a", "an"}
                meaningful = overlap - common
                if len(meaningful) >= 2:
                    matched = True
                    break

            if matched:
                found.append(ch)
                total_found += 1
                found_by_class[cls] += 1
            else:
                missing.append(ch)
                total_missing += 1
                missing_by_class[cls] += 1
            total_cisce += 1

        status = "ALL FOUND" if not missing else f"{len(missing)} MISSING"
        print(f"\n  {cisce_subj:20s} ({len(chapters)} chapters) - {status}")
        if missing:
            for m in missing:
                print(f"    MISSING: {m}")
            # Show what CBSE has for this subject
            if cbse_chs:
                print(f"    [CBSE has {len(cbse_chs)} chapters in {cbse_subj}]")

# Summary
print(f"\n{'='*100}")
print(f"  SUMMARY")
print(f"{'='*100}")
print(f"  Total CISCE chapters:   {total_cisce}")
print(f"  Found in CBSE:          {total_found}")
print(f"  Missing from CBSE:      {total_missing}")
print(f"  Coverage:               {100*total_found//total_cisce if total_cisce else 0}%")

print(f"\n  By class:")
print(f"  {'Class':>6s} {'Total':>8s} {'Found':>8s} {'Missing':>8s} {'Coverage':>10s}")
print(f"  {'-'*45}")
for cls in range(6, 13):
    if cls in CISCE_SYLLABUS:
        total = sum(len(chs) for chs in CISCE_SYLLABUS[cls].values())
        found = found_by_class.get(cls, 0)
        missing = missing_by_class.get(cls, 0)
        cov = f"{100*found//total if total else 0}%"
        print(f"  {cls:6d} {total:8d} {found:8d} {missing:8d} {cov:>10s}")
