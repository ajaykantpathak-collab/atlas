"""Generate C8 CBSE History nodes with FULL enrichments + supporting files via Fable.
Saves to NEW location: D:\platform\cbse_data\c8_history_full\
Does NOT touch existing files.
"""
import urllib.request, json, ssl, os, time

KEY = os.environ.get("FABLE_API_KEY", "sk-ant-co-gIEUzRWw_mtUpxKk668B1lzJe3XntCna")
URL = "https://api.claudeopus.pro/v1/messages"
MODEL = "fable"

OUT_DIR = r"D:\platform\cbse_data\c8_history_full"
os.makedirs(OUT_DIR, exist_ok=True)
ENRICH_DIR = os.path.join(OUT_DIR, "enrichment")
SUPP_DIR = os.path.join(OUT_DIR, "supporting_files")
os.makedirs(ENRICH_DIR, exist_ok=True)
os.makedirs(SUPP_DIR, exist_ok=True)

# CBSE C8 History chapters (12 chapters) — these are the MISSING ones
# We already have: The Rise of the Marathas (18 nodes) in history_civics
# We need the standard CBSE C8 Our Pasts III chapters
HISTORY_CHAPTERS = [
    {
        "num": 1,
        "name": "How, When and Where",
        "node_count": 12,
        "topics": ["Importance of dates", "Periodisation in history", "Sources of history: official records, surveys, censuses", "Limits of official records", "James Mill and Indian history", "Why study history"]
    },
    {
        "num": 2,
        "name": "From Trade to Territory: The Company Establishes Power",
        "node_count": 15,
        "topics": ["East India Company comes east", "Farman of 1717", "Battle of Plassey 1757", "Battle of Buxar 1764", "Diwani rights", "Company becomes diwan", "Regulating Act 1773", "Supreme Court establishment"]
    },
    {
        "num": 3,
        "name": "Ruling the Countryside",
        "node_count": 14,
        "topics": ["Permanent Settlement 1793", "Mahalwari system", "Ryotwari system", "Munro and Ryotwari", "Indigo cultivation in Bengal", "Blue Rebellion 1859", "Zamindars and peasants"]
    },
    {
        "num": 4,
        "name": "Tribals, Dikus and the Vision of a Golden Age",
        "node_count": 12,
        "topics": ["Tribal groups: shifting cultivators, hunters, herders", "Birsa Munda", "Munda Rebellion", "Tribal society and customs", "Impact of colonial rule on tribals", "Forest laws and tribal displacement"]
    },
    {
        "num": 5,
        "name": "When People Rebel 1857 and After",
        "node_count": 14,
        "topics": ["Causes of 1857 revolt", "Sepoy mutiny", "Spread of the revolt", "Mangal Pandey", "Bahadur Shah Zafar", "Aftermath: Government of India Act 1858", "End of Company rule"]
    },
    {
        "num": 6,
        "name": "Colonialism and the City: The Story of an Imperial Capital",
        "node_count": 12,
        "topics": ["Delhi before British rule", "Decline of Mughal cities", "Municipal administration", "Lahore Gate improvement", "New Delhi construction", "Lutyens and Baker", "Canal colonies"]
    },
    {
        "num": 7,
        "name": "Weavers, Iron Smelters and Factory Owners",
        "node_count": 13,
        "topics": ["Indian textiles and world market", "Weavers under colonial rule", "Decline of weaving", "Iron smelting in India", "Tribal iron smelters", "Agaria community", "Iron and steel factories in India", "TISCO establishment"]
    },
    {
        "num": 8,
        "name": "Civilising the Native, Educating the Nation",
        "node_count": 12,
        "topics": ["Macaulay's Minute 1835", "English education in India", "Wood's Despatch 1854", "Indigenous education systems", "Pathshalas and tols", "William Jones and Orientalism", "Debate over Indian education"]
    },
    {
        "num": 9,
        "name": "Women, Caste and Reform",
        "node_count": 14,
        "topics": ["Sati abolition and Raja Ram Mohan Roy", "Brahmo Samaj", "Widow remarriage movement", "Girls' education: Beti Vidyalaya", "Pandita Ramabai", "Caste reform: Jyotirao Phule", "Satyashodhak Samaj", "Ambedkar and caste", "Ezhava movement: Sri Narayana Guru"]
    },
    {
        "num": 10,
        "name": "The Changing World of Visual Arts",
        "node_count": 10,
        "topics": ["Mughal painting tradition", "Company paintings", "Daniel brothers", "Raja Ravi Varma", "Kalighat paintings", "Art and nationalism", "Impact of colonial art"]
    },
    {
        "num": 11,
        "name": "The Making of the National Movement 1870s-1947",
        "node_count": 16,
        "topics": ["Rise of nationalism", "Indian National Congress 1885", "Partition of Bengal 1905", "Swadeshi movement", "Non-Cooperation Movement 1921", "Civil Disobedience Movement 1930", "Quit India Movement 1942", "Gandhi and satyagraha", "Revolutionaries: Bhagat Singh, Subhas Chandra Bose", "Independence 1947"]
    },
    {
        "num": 12,
        "name": "India After Independence",
        "node_count": 12,
        "topics": ["Partition of India 1947", "Constituent Assembly", "Drafting the Constitution", "First general elections 1952", "States reorganisation 1956", "Five-year plans", "Nehru's vision", "Foreign policy: NAM"]
    },
]

def call_fable(prompt, system, max_tokens=64000):
    ctx = ssl.create_default_context()
    body = json.dumps({
        "model": MODEL,
        "max_tokens": max_tokens,
        "system": system,
        "messages": [{"role": "user", "content": prompt}]
    }).encode("utf-8")
    req = urllib.request.Request(URL, data=body, method="POST")
    req.add_header("x-api-key", KEY)
    req.add_header("Content-Type", "application/json")
    req.add_header("anthropic-version", "2023-06-01")
    t0 = time.time()
    with urllib.request.urlopen(req, timeout=600, context=ctx) as resp:
        raw = resp.read().decode("utf-8")
        data = json.loads(raw)
        text = ""
        for block in data.get("content", []):
            if block.get("type") == "text":
                text += block.get("text", "")
        usage = data.get("usage", {})
        elapsed = time.time() - t0
        return text, usage, elapsed

# ─── PART 1: Generate enrichment markers for all 12 chapters ───
# Split into 3 batches of 4 chapters each to avoid token limit

BATCHES = [
    HISTORY_CHAPTERS[0:4],   # Ch 1-4
    HISTORY_CHAPTERS[4:8],   # Ch 5-8
    HISTORY_CHAPTERS[8:12],  # Ch 9-12
]

ENRICHMENT_SYSTEM = """You are an expert CBSE curriculum designer generating enrichment content for Class 8 History (Our Pasts III).
Follow CBSE 2025-26 marking schemes:
- 3-mark questions: Content = 2 marks, Expression = 1 mark
- 6-mark questions: Content = 3 marks, Expression = 2 marks, Accuracy = 1 mark
Rules:
- NO foreign language etymologies (Latin, Greek, Italian) in any field
- NO mnemonics in any field
- All content must be class-appropriate (Class 8)
- All content must align with CBSE 2025-26 syllabus
- Use NCERT Our Pasts III textbook content
Output the enrichment markers in the exact format shown."""

for batch_idx, batch in enumerate(BATCHES):
    chapters_desc = "\n".join([
        f"Chapter {c['num']}: {c['name']} ({c['node_count']} nodes)\n  Topics: {', '.join(c['topics'])}"
        for c in batch
    ])

    prompt = f"""Generate FULL enrichment markers for CBSE Class 8 History chapters. Use this EXACT format per node:

--- NODE c8_hist_cbse_{batch[0]['num']*10:03d} ---
TITLE: [topic title]
DEFINITION: |
  [2-3 paragraph deep definition explaining the concept thoroughly]
COGNITIVE_LEVEL: [remember/understand/apply/analyze/evaluate/create]
MASTERY_CRITERIA: |
  [What the student should be able to do to demonstrate mastery]
SCOPE_BOUNDARY: |
  [What NOT to teach at this level — mention higher class where it belongs]
TEXT_WALKTHROUGH: |
  [3-4 paragraph student-friendly explanation with analogies and examples]
DIAGNOSTIC_QUESTION:
  Q: [diagnostic question]
  A: [model answer showing what mastery looks like]
  LEVEL: [recall/reasoning/application]
COMMON_MISCONCEPTION: |
  [2 common misconceptions with corrections]
ON_FAILURE: |
  [What to do if student fails the diagnostic question — scaffolding steps]

Generate nodes for these chapters:
{chapters_desc}

Use sequential node IDs: c8_hist_cbse_010, c8_hist_cbse_011, c8_hist_cbse_012, etc.
Each chapter should have the specified number of nodes.
Cover ALL the topics listed for each chapter.

Output ONLY the enrichment markers. No commentary."""

    print(f"\n[BATCH {batch_idx+1}/3] Chapters {batch[0]['num']}-{batch[-1]['num']}: {[c['name'][:20] for c in batch]}")
    print(f"Sending to Fable...")

    try:
        text, usage, elapsed = call_fable(prompt, ENRICHMENT_SYSTEM)
        out_path = os.path.join(ENRICH_DIR, f"c8_history_batch{batch_idx+1}.marker")
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(text)
        node_count = text.count("--- NODE")
        print(f"  Done in {elapsed:.0f}s | in:{usage.get('input_tokens','?')} out:{usage.get('output_tokens','?')} | {node_count} nodes | {os.path.getsize(out_path)} bytes -> {out_path}")
    except Exception as e:
        print(f"  ERROR: {type(e).__name__}: {e}")

    time.sleep(3)

# ─── PART 2: Generate supporting files (6 types) ───
SUPP_SYSTEM = """You are an expert CBSE curriculum designer generating supporting files for Class 8 History.
Follow CBSE 2025-26 marking schemes:
- 3-mark questions: Content = 2 marks, Expression = 1 mark
- 6-mark questions: Content = 3 marks, Expression = 2 marks, Accuracy = 1 mark
Rules:
- NO foreign language etymologies (Latin, Greek, Italian)
- NO mnemonics
- Class 8 appropriate content
- CBSE 2025-26 syllabus aligned
- Use NCERT Our Pasts III textbook content"""

SUPP_TYPES = [
    ("question_bank", "Exam-style Q&A per chapter with CBSE marking scheme. Include MCQs (1 mark), short answer (3 marks), long answer (6 marks), source-based (3 marks), and competency-based (4 marks) questions. Provide model answers with marking breakdown."),
    ("worked_examples", "Model exam answers with step-by-step deconstruction. Show weak, average, and strong responses with rubric scores and explanations of why each gets that score."),
    ("drill_banks", "Rapid-fire practice drills: definition recall, date identification, cause-effect matching, fill-in-the-blanks, true/false with correction. Organized by chapter."),
    ("revision_sheets", "Key concepts, dates, terms, and summaries condensed for quick revision. Use bullet points and tables. Cover all 12 chapters."),
    ("glossary", "Key terms, definitions, and examples specific to C8 History. Include Hindi translations where useful. Organized alphabetically."),
    ("model_answers", "Weak, average, and strong exam responses with rubric scores and explanations. Cover 3-mark and 6-mark question types from CBSE C8 History."),
]

for supp_type, supp_desc in SUPP_TYPES:
    prompt = f"""Generate {supp_type} for CBSE Class 8 History (Our Pasts III) covering ALL 12 chapters:
1. How, When and Where
2. From Trade to Territory
3. Ruling the Countryside
4. Tribals, Dikus and the Vision of a Golden Age
5. When People Rebel 1857 and After
6. Colonialism and the City
7. Weavers, Iron Smelters and Factory Owners
8. Civilising the Native, Educating the Nation
9. Women, Caste and Reform
10. The Changing World of Visual Arts
11. The Making of the National Movement 1870s-1947
12. India After Independence

Content type: {supp_desc}

Output as well-structured markdown. Cover ALL 12 chapters thoroughly."""

    print(f"\n[SUPPORTING] {supp_type}")
    print(f"Sending to Fable...")

    try:
        text, usage, elapsed = call_fable(prompt, SUPP_SYSTEM, max_tokens=32000)
        out_path = os.path.join(SUPP_DIR, f"c8_history_{supp_type}.md")
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(text)
        print(f"  Done in {elapsed:.0f}s | in:{usage.get('input_tokens','?')} out:{usage.get('output_tokens','?')} | {os.path.getsize(out_path)} bytes -> {out_path}")
    except Exception as e:
        print(f"  ERROR: {type(e).__name__}: {e}")

    time.sleep(3)

print("\n" + "=" * 70)
print("C8 HISTORY GENERATION COMPLETE")
print(f"Enrichment markers: {ENRICH_DIR}")
print(f"Supporting files: {SUPP_DIR}")
print("=" * 70)
