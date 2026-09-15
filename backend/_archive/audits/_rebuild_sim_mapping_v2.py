"""
Rebuild simulation mapping — capture ALL 915 simulations.
Only creates NEW file in cbse_data/ — does not touch existing data.
"""
import json
import re
from pathlib import Path
from collections import defaultdict

SIM_DIR = Path(r"D:\platform\frontend\components\simulations")
CBSE_DATA = Path(r"D:\platform\cbse_data")

SUBJECT_KEYWORDS = {
    "maths": ["math", "algebra", "arithmetic", "geometry", "trigonometry", "calculus",
              "statistics", "probability", "number", "logarithm", "matrix", "binomial",
              "quadratic", "linear", "proposition", "logic", "reasoning", "exponent",
              "flowchart", "fraction", "decimal", "graph_plotter", "ratio", "proportion",
              "set_builder", "comparison", "number_line", "conic", "construction",
              "differential", "inequalities", "permutation", "combination", "polynomial",
              "sequences", "sets_relations", "addsub", "muldiv", "addition", "counting",
              "patterns", "shapes", "tessellation", "factors", "multiples", "integers",
              "area_perimeter", "angles", "symmetry", "percentage", "weight_capacity",
              "time_calendar", "data_patterns"],
    "physics": ["physics", "mechanics", "electric", "magnet", "optics", "wave", "motion",
                "force", "energy", "thermodynamics", "atom", "nuclear", "circuit", "lens",
                "mirror", "gravitation", "friction", "pulley", "lever", "density_tank",
                "capacitor", "heat_transfer", "light_ray", "gas_properties", "movement",
                "measurement", "pendulum", "projectile", "velocity", "acceleration",
                "current", "voltage", "resistance", "ohm", "magnetic", "field",
                "electromagnetic", "induction", "transformer", "ac_", "dc_",
                "semiconductor", "diode", "transistor", "doppler", "sound",
                "frequency", "amplitude", "wavelength", "refraction", "reflection",
                "dispersion", "interference", "diffraction", "polarization",
                "photoelectric", "radioactive", "fission", "fusion", "nuclear",
                "electrostatics", "emiac", "kinematics", "oscillation", "rotational",
                "machines", "light_eclipse", "float_sink", "simple_machines",
                "light_game", "lens_mirror", "prism"],
    "chemistry": ["chem", "acid", "base", "salt", "reaction", "mole", "periodic",
                  "organic", "carbon", "bond", "equation", "atomic_structure",
                  "element", "metal", "nonmetal", "oxidation", "reduction", "polymer",
                  "density", "materials", "solution", "matter", "mixture", "separation",
                  "hydrocarbon", "alkane", "alkene", "alkyne", "alcohol", "aldehyde",
                  "ketone", "carboxylic", "amine", "ester", "benzene", "aromatic",
                  "isomerism", "stereochem", "electrochem", "ph_", "titration",
                  "crystallization", "distillation", "filtration", "chromatography",
                  "dblock", "pblock", "sblock", "gaseous_state", "hydrogen",
                  "redox", "stoichiometry", "solid_state"],
    "biology": ["bio", "cell", "genetics", "ecology", "body", "plant", "animal",
                "human", "organ", "tissue", "chromosome", "circulatory", "respiratory",
                "digestive", "evolution", "biodiversity", "ecosystem", "photosynthesis",
                "breathing", "classification", "health", "disease", "water_studies",
                "neuron", "nervous", "endocrine", "reproduction", "excretion",
                "locomotion", "skeleton", "muscle", "enzyme", "protein", "dna", "rna",
                "mitosis", "meiosis", "bacteria", "virus", "fungi", "protist",
                "invertebrate", "vertebrate", "mammal", "bird", "reptile",
                "flower", "leaf", "root", "stem", "seed", "pollination",
                "fertilization", "embryo", "gestation", "immunity", "vaccine",
                "antibody", "blood", "heart", "lung", "kidney", "liver", "brain",
                "immunotech", "adaptations", "insects", "living_things", "skeletal",
                "digestion"],
    "english": ["english", "grammar", "poem", "story", "comprehension", "writing",
                "letter", "essay", "diagram_explorer", "visual_challenge",
                "text_explorer", "reading", "vocabulary", "synonym", "antonym",
                "tense", "noun", "verb", "adjective", "adverb", "preposition",
                "clause", "phrase", "sentence", "paragraph", "summary", "precis",
                "narrative", "descriptive", "argumentative", "dialogue", "speech",
                "drama", "poetry", "prose", "fiction", "nonfiction", "biography",
                "autobiography", "fable", "folktale", "myth", "legend"],
    "hindi": ["hindi", "vowel", "consonant", "matra", "barakhadi", "sangya",
              "visheshan", "kriya", "sarvanam", "avyay", "kaal", "vachya",
              "alankar", "ras", "chhand", "dohe", "kabir", "rahim", "tulsidas",
              "premchand", "mahadevi", "jaishankar", "nirala", "dinkar"],
    "history_civics": ["history", "ancient", "medieval", "modern", "india",
                       "civics", "democracy", "government", "constitution",
                       "civilization", "cold_war", "timeline", "cinema",
                       "mughal", "mauryan", "gupta", "harappan", "vedic",
                       "independence", "freedom", "gandhi", "nehru", "bose",
                       "revolution", "war", "battle", "empire", "king", "queen",
                       "dynasty", "reform", "renaissance", "industrial",
                       "colonization", "imperialism", "nationalism", "socialism",
                       "capitalism", "parliament", "president", "prime_minister",
                       "supreme_court", "election", "fundamental_rights",
                       "directive_principles", "amendment", "preamble"],
    "geography": ["geography", "map", "climate", "landform", "river", "mountain",
                  "earthquake", "volcano", "weather", "plateau", "plain", "desert",
                  "coast", "island", "peninsula", "delta", "estuary", "glacier",
                  "ocean", "sea", "atmosphere", "lithosphere", "hydrosphere",
                  "biosphere", "monsoon", "rainfall", "temperature", "humidity",
                  "wind", "cyclone", "tornado", "hurricane", "flood", "drought",
                  "soil", "vegetation", "forest", "wildlife", "mineral", "mining",
                  "agriculture", "industry", "transport", "communication",
                  "population", "settlement", "urbanization", "globalization"],
    "evs": ["evs", "environment", "pollution", "conservation", "ecosystem",
            "recycle", "cleanliness", "air", "water", "waste", "sanitation",
            "hygiene", "nutrition", "food_chain", "food_web", "habitat",
            "endangered", "extinction", "deforestation", "afforestation",
            "renewable", "non_renewable", "solar", "wind_energy", "biogas"],
    "computer_science": ["computer", "java", "python", "algorithm", "binary",
                         "programming", "data_type", "internet", "html", "database",
                         "networking", "code_editor", "code", "software", "app",
                         "comm_theory", "boolean", "logic_gate", "flip_flop",
                         "register", "memory", "cpu", "operating_system",
                         "compiler", "interpreter", "debugger", "flowchart",
                         "pseudocode", "variable", "function", "loop", "array",
                         "string", "recursion", "sorting", "searching",
                         "linked_list", "stack", "queue", "tree", "graph",
                         "oop", "class", "object", "inheritance", "polymorphism",
                         "encapsulation", "abstraction", "cyber_security",
                         "data_structure", "powerpoint", "word_formatting",
                         "word_advanced", "scratch"],
    "history_civics": ["history", "ancient", "medieval", "modern", "india",
                       "civics", "democracy", "government", "constitution",
                       "civilization", "cold_war", "timeline", "cinema",
                       "mughal", "mauryan", "gupta", "harappan", "vedic",
                       "independence", "freedom", "gandhi", "nehru", "bose",
                       "revolution", "war", "battle", "empire", "king", "queen",
                       "dynasty", "reform", "renaissance", "industrial",
                       "colonization", "imperialism", "nationalism", "socialism",
                       "capitalism", "parliament", "president", "prime_minister",
                       "supreme_court", "election", "fundamental_rights",
                       "directive_principles", "amendment", "preamble",
                       "post_indep"],
    "evs": ["evs", "environment", "pollution", "conservation", "ecosystem",
            "recycle", "cleanliness", "air", "water", "waste", "sanitation",
            "hygiene", "nutrition", "food_chain", "food_web", "habitat",
            "endangered", "extinction", "deforestation", "afforestation",
            "renewable", "non_renewable", "solar", "wind_energy", "biogas",
            "safety", "sun_moon"],
    "psychology": ["psychology", "behavior", "memory", "learning", "perception",
                   "intelligence", "personality", "emotion", "motivation",
                   "attitude", "aptitude", "stress", "conflict", "frustration",
                   "adjustment", "counseling", "therapy", "abnormal",
                   "developmental", "social_psychology", "cognitive",
                   "devpsy", "psyintro", "dev_psy", "psy_intro"],
    "mass_media": ["mass_media", "massmedia", "television", "news", "camera",
                   "communication_media", "radio", "print_media", "journalism",
                   "advertising_media", "public_relations", "social_media",
                   "film", "broadcasting", "censorship", "new_media", "newmedia"],
    "art": ["art", "drawing", "painting", "sculpture", "craft",
            "calligraphy", "pottery", "weaving", "embroidery", "paint_files", "paintfiles"],
    "economics": ["economics", "demand", "supply", "market", "gdp", "inflation",
                  "banking", "monetary", "fiscal", "budget", "tax", "subsidy",
                  "poverty", "unemployment", "trade", "export", "import",
                  "balance_payment", "foreign_exchange", "investment",
                  "savings", "consumption", "production", "cost", "revenue",
                  "profit", "loss", "elasticity", "utility", "indifference",
                  "production_possibility", "econ_basics", "econ_problems",
                  "geo_econ", "intl_econ", "macro_econ", "finance", "finance_bank",
                  "resource_mgmt", "resource", "economy"],
    "geography": ["geography", "map", "climate", "landform", "river", "mountain",
                  "earthquake", "volcano", "weather", "plateau", "plain", "desert",
                  "coast", "island", "peninsula", "delta", "estuary", "glacier",
                  "ocean", "sea", "atmosphere", "lithosphere", "hydrosphere",
                  "biosphere", "monsoon", "rainfall", "temperature", "humidity",
                  "wind", "cyclone", "tornado", "hurricane", "flood", "drought",
                  "soil", "vegetation", "forest", "wildlife", "mineral", "mining",
                  "agriculture", "industry", "transport", "communication",
                  "population", "settlement", "urbanization", "globalization",
                  "regional_geo", "continents", "globe", "lat_long", "neighbourhood",
                  "env_policy"],
    "accounts": ["account", "ledger", "journal", "balance_sheet", "debit",
                 "credit", "trial_balance", "cashbook", "bank_reconciliation",
                 "depreciation", "bad_debt", "provision", "partnership",
                 "company", "share", "dividend", "final_account",
                 "manufacturing", "trading", "profit_loss", "balance"],
    "business_studies": ["business", "commerce", "marketing", "management",
                         "stakeholder", "advertising", "sales", "entrepreneur",
                         "sole_proprietor", "partnership", "company",
                         "cooperative", "joint_hindu", "multinational",
                         "e_business", "outsourcing", "planning", "organizing",
                         "staffing", "directing", "controlling", "motivation",
                         "leadership", "communication_business"],
    "psychology": ["psychology", "behavior", "memory", "learning", "perception",
                   "intelligence", "personality", "emotion", "motivation",
                   "attitude", "aptitude", "stress", "conflict", "frustration",
                   "adjustment", "counseling", "therapy", "abnormal",
                   "developmental", "social_psychology", "cognitive"],
    "sociology": ["sociology", "society", "social", "culture", "community",
                  "institution", "stratification", "caste", "class",
                  "religion", "family", "marriage", "kinship", "tribe",
                  "urban", "rural", "globalization_social", "social_change",
                  "social_movement", "demography"],
    "political_science": ["political", "politics", "election", "parliament",
                          "constitution", "democracy", "authoritarian",
                          "legislature", "executive", "judiciary",
                          "federalism", "local_government", "political_party",
                          "pressure_group", "civil_society", "citizenship",
                          "human_rights", "international_relations",
                          "un_", "nato", "saarc", "brics"],
    "biotech": ["biotech", "genetic_engineering", "dna_tech", "rna_tech",
                "pcr", "gel_electrophoresis", "cloning", "stem_cell",
                "fermentation", "bioreactor", "enzyme_tech", "bioinformatics"],
    "home_science": ["home_science", "homesience", "home", "nutrition",
                     "textile", "food", "cooking", "growth_development",
                     "adolescent", "child_development", "family_resource",
                     "housing", "interior", "apparel", "fabric"],
    "legal_studies": ["legal", "law", "court", "justice", "arbitration",
                      "mediation", "negotiation", "contract", "tort",
                      "crime", "evidence", "witness", "judge", "lawyer",
                      "jurisdiction", "appeal", "bail"],
    "mass_media": ["mass_media", "massmedia", "television", "news", "camera",
                   "communication_media", "radio", "print_media", "journalism",
                   "advertising_media", "public_relations", "social_media",
                   "film", "broadcasting", "censorship"],
    "economics_applications": ["econapplication", "econ_app", "commercial_bank",
                               "economic_entit", "interdependence", "sectors",
                               "consumer", "producer", "market_structure",
                               "money_credit", "banking_system"],
    "commercial_studies": ["commercialstud", "commercial_stud", "noncommercial",
                           "industrial_relation", "stakeholder",
                           "advertising_commercial", "sales_promotion",
                           "business_ethics", "consumer_protection"],
    "commercial_applications": ["commerceapp", "commerce_app", "selling_process",
                                "marketing_commerce", "business_idea",
                                "entrepreneurship_commerce"],
    "applied_maths": ["appliedmath", "applied_math", "logic_reasoning",
                      "proposition", "numerical_analysis", "linear_programming",
                      "game_theory", "graph_theory_applied"],
    "art": ["art", "drawing", "painting", "sculpture", "craft",
            "calligraphy", "pottery", "weaving", "embroidery"],
}


def guess_subject(filename):
    # Convert camelCase to snake_case and lowercase for matching
    name_snek = re.sub(r'([A-Z])', r'_\1', filename).lower()
    name_lower = filename.lower()
    for subj, keywords in SUBJECT_KEYWORDS.items():
        for kw in keywords:
            kw_lower = kw.lower()
            if kw_lower in name_lower or kw_lower in name_snek:
                return subj
    return "general"


def guess_class(filename, dirname):
    m = re.match(r'C(\d+)_', filename)
    if m:
        return int(m.group(1))
    m = re.search(r'class(\d+)', dirname)
    if m:
        return int(m.group(1))
    m = re.search(r'c(\d+)_(\d+)', dirname)
    if m:
        return f"{m.group(1)}-{m.group(2)}"
    return None


sims = []
for f in SIM_DIR.rglob("*.tsx"):
    name = f.stem
    rel_dir = f.parent.name
    if "backup" in rel_dir.lower():
        continue
    cls = guess_class(name, rel_dir)
    subj = guess_subject(name)
    sims.append({
        "filename": f.name,
        "component": name,
        "directory": rel_dir,
        "class": cls,
        "subject": subj,
    })

by_class_subject = defaultdict(list)
by_class = defaultdict(list)
by_subject = defaultdict(list)

for sim in sims:
    by_class_subject[f"class_{sim['class']}_{sim['subject']}"].append(sim["component"])
    by_class[str(sim["class"])].append(sim["component"])
    by_subject[sim["subject"]].append(sim["component"])

mapping = {
    "total_simulations": len(sims),
    "by_class_subject": dict(by_class_subject),
    "by_class": dict(by_class),
    "by_subject": dict(by_subject),
    "all_simulations": sims,
}

out_path = CBSE_DATA / "simulations" / "mapping" / "sim_mapping.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(mapping, f, indent=2, ensure_ascii=False)

print(f"Total simulations: {len(sims)}")
print(f"\nBy class:")
for cls in sorted(by_class.keys(), key=lambda x: str(x)):
    print(f"  class {cls}: {len(by_class[cls])} sims")
print(f"\nBy subject:")
for subj in sorted(by_subject.keys()):
    print(f"  {subj}: {len(by_subject[subj])} sims")
print(f"\nGeneral (unmatched): {len(by_subject.get('general', []))}")
print(f"\nMapping saved: {out_path} ({out_path.stat().st_size//1024}KB)")
