r"""CISCE Hindi Topics Generator — Study Aids in Pure Devanagari.

Generates 10 study aid files per class (character_maps, drill_banks,
glossary, literary_devices, model_answers, question_bank, quote_bank,
revision_sheets, theme_trackers, worked_examples) matching the CBSE
topics/ structure.

Output: NEW files in D:\platform\cbse_data\hindi_cisce\topics\
Does NOT modify any existing data.
"""
import json, os, sys, time, urllib.request, concurrent.futures
from typing import List, Dict, Optional

# ─── Config ──────────────────────────────────────────────────────────────────
API_URL = "https://api.claudeopus.pro/v1/messages"
API_KEY = "sk-ant-co-gIEUzRWw_mtUpxKk668B1lzJe3XntCna"
MODEL = "claude-opus-5"
MAX_WORKERS = 10
MAX_TOKENS = 64000
TIMEOUT = 600

SYSTEM_PROMPT = (
    "You are an expert Hindi educator and CISCE curriculum specialist. "
    "CRITICAL: ALL content must be written in pure Hindi using Devanagari "
    "(देवनागरी) script. Do NOT use Roman/Hinglish transliteration. "
    "Do NOT mix English words. Every explanation, definition, question, "
    "answer, and note must be in pure Hindi Devanagari script. "
    "Only institutional names like CISCE, ICSE, ISC may remain in English. "
    "Output structured Markdown as requested."
)

OUT_DIR = r"D:\platform\cbse_data\hindi_cisce\topics"
NODES_PATH = r"D:\platform\cbse_data\nodes\by_subject\hindi_cisce.json"
SYLLABUS_PATH = r"D:\platform\cbse_data\hindi_cisce\syllabus_reference.json"

os.makedirs(OUT_DIR, exist_ok=True)

# ─── Topic Types ─────────────────────────────────────────────────────────────
TOPIC_TYPES = [
    "character_maps",
    "drill_banks",
    "glossary",
    "literary_devices",
    "model_answers",
    "question_bank",
    "quote_bank",
    "revision_sheets",
    "theme_trackers",
    "worked_examples",
]

TYPE_DESCRIPTIONS = {
    "character_maps": (
        "पात्र-चित्रण (Character Maps) — प्रत्येक पाठ के सभी पात्रों की विशेषताएँ, "
        "भूमिका, स्वभाव, और कथा में यात्रा का विस्तृत वर्णन। तालिका प्रारूप में।"
    ),
    "drill_banks": (
        "अभ्यास-बैंक (Drill Banks) — प्रत्येक पाठ के लिए तीव्र अभ्यास प्रश्न। "
        "परिभाषा ड्रिल, रिक्त स्थान भरें, सत्य/असत्य, मिलान, और त्वरित उत्तर।"
    ),
    "glossary": (
        "शब्दावली (Glossary) — प्रत्येक पाठ के कठिन शब्द, उनके अर्थ, "
        "और संदर्भ। तालिका प्रारूप में: शब्द | अर्थ | संदर्भ।"
    ),
    "literary_devices": (
        "साहित्यिक युक्तियाँ (Literary Devices) — अलंकार, रस, छंद, "
        "लक्षणा, वक्रोक्ति, यमक, अनुप्रास, उपमा, रूपक आदि का प्रत्येक पाठ "
        "में प्रयोग और उदाहरण।"
    ),
    "model_answers": (
        "आदर्श उत्तर (Model Answers) — प्रत्येक पाठ के 2-3 परीक्षा प्रश्न, "
        "तीन स्तरों में (कमजोर 1-2/6, औसत 3-4/6, उत्कृष्ट 5-6/6)। "
        "CISCE मूल्यांकन योजना अनुसार।"
    ),
    "question_bank": (
        "प्रश्न-बैंक (Question Bank) — प्रत्येक पाठ के 5-8 परीक्षा प्रश्न, "
        "1, 2, 3, 4, 5, और 10 अंकों के अनुक्रम में। प्रत्येक प्रश्न के साथ "
        "मॉडल उत्तर और अंकन योजना।"
    ),
    "quote_bank": (
        "उद्धरण-बैंक (Quote Bank) — प्रत्येक पाठ के महत्वपूर्ण उद्धरण, "
        "किस संदर्भ में, और क्यों महत्वपूर्ण।"
    ),
    "revision_sheets": (
        "सारांश-पत्र (Revision Sheets) — प्रत्येक पाठ का संक्षिप्त सारांश, "
        "मुख्य बिंदु, और त्वरित समीक्षा के लिए नोट्स।"
    ),
    "theme_trackers": (
        "विषय-ट्रैकर (Theme Trackers) — प्रत्येक पाठ की विषयवस्तु, "
        "उनका विकास, और पाठ में कहाँ दिखाई देती हैं।"
    ),
    "worked_examples": (
        "हल किए गए उदाहरण (Worked Examples) — प्रत्येक पाठ के लिए "
        "परीक्षा प्रश्नों के चरण-दर-चरण हल, तकनीक और रणनीति सहित।"
    ),
}


def call_claude(prompt: str, max_tokens: int = MAX_TOKENS, timeout: int = TIMEOUT) -> str:
    """Call Claude Opus 5 API."""
    import ssl
    ctx = ssl.create_default_context()
    body = json.dumps({
        "model": MODEL,
        "max_tokens": max_tokens,
        "system": SYSTEM_PROMPT,
        "messages": [{"role": "user", "content": prompt}],
    }).encode("utf-8")

    req = urllib.request.Request(
        API_URL,
        data=body,
        headers={
            "x-api-key": API_KEY,
            "Content-Type": "application/json",
            "anthropic-version": "2023-06-01",
        },
        method="POST",
    )

    with urllib.request.urlopen(req, timeout=timeout, context=ctx) as resp:
        data = json.loads(resp.read().decode("utf-8"))

    # Extract text from response
    for block in data.get("content", []):
        if block.get("type") == "text":
            return block.get("text", "")
    return ""


def load_syllabus() -> Dict:
    """Load the CISCE Hindi syllabus."""
    with open(SYLLABUS_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def load_nodes() -> List[Dict]:
    """Load all CISCE Hindi nodes."""
    with open(NODES_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def get_class_topics(class_key: str, syllabus: Dict, nodes: List[Dict]) -> List[str]:
    """Get all topic/chapter names for a class."""
    topics = []

    # From syllabus
    cls_data = syllabus.get(class_key, {})
    topics.extend(cls_data.get("stories", []))
    topics.extend(cls_data.get("poems", []))
    topics.extend(cls_data.get("grammar", []))

    # If no syllabus topics, use node titles
    if not topics:
        class_level = class_key.replace("class_", "")
        for node in nodes:
            if str(node.get("class_level")) == class_level:
                topics.append(node["topic"])

    return topics


def build_prompt(class_key: str, topic_type: str, topics: List[str]) -> str:
    """Build the generation prompt for one file."""
    class_display = class_key.replace("class_", "कक्षा ").replace("_", "-")

    topics_list = "\n".join(f"  {i+1}. {t}" for i, t in enumerate(topics))

    type_desc = TYPE_DESCRIPTIONS[topic_type]

    prompt = f"""तुम एक विशेषज्ञ हिंदी शिक्षक हो जो CISCE (ICSE/ISC) पाठ्यक्रम को गहराई से जानता है।

कार्य: निम्नलिखित के लिए "{type_desc}" तैयार करो:

{class_display} — CISCE हिंदी
पाठ/अध्यायों की सूची:
{topics_list}

आवश्यकताएँ:
1. संपूर्ण सामग्री शुद्ध देवनागरी हिंदी में हो — कोई अंग्रेजी शब्द नहीं (केवल CISCE, ICSE, ISC जैसे संस्थागत नाम अपवाद)।
2. प्रत्येक पाठ के लिए विस्तृत सामग्री दो।
3. Markdown प्रारूप में, तालिकाओं और शीर्षकों के साथ।
4. CISCE मूल्यांकन पद्धति अनुसार अंकन (1, 2, 3, 4, 5, 10 अंक)।
5. पाठ्यपुस्तक: साहित्य सागर (कक्षा 9-10), निराला की चेतना (कक्षा 11-12)।
6. व्याकरण अध्यायों के लिए उपयुक्त अभ्यास और उदाहरण दो।
7. प्रत्येक पाठ के लिए कम से कम 3-5 आइटम (प्रश्न, उद्धरण, ड्रिल, आदि)।

आउटपुट: केवल Markdown सामग्री, कोई प्रस्तावना या समापन टिप्पणी नहीं।"""
    return prompt


def generate_one(class_key: str, topic_type: str, topics: List[str]) -> Dict:
    """Generate one topic file."""
    filename = f"{class_key}_{topic_type}.md"
    filepath = os.path.join(OUT_DIR, filename)

    # Resume: skip if file exists and is non-trivial
    if os.path.exists(filepath) and os.path.getsize(filepath) > 500:
        return {"ok": True, "file": filename, "skipped": True}

    if not topics:
        return {"ok": False, "file": filename, "error": "no topics"}

    prompt = build_prompt(class_key, topic_type, topics)

    try:
        content = call_claude(prompt)
        if not content or len(content.strip()) < 200:
            return {"ok": False, "file": filename, "error": "empty response"}

        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)

        size_kb = round(os.path.getsize(filepath) / 1024, 1)
        return {"ok": True, "file": filename, "size_kb": size_kb}
    except Exception as e:
        return {"ok": False, "file": filename, "error": str(e)}


def main():
    print("=" * 60)
    print("CISCE Hindi Topics Generator")
    print(f"Model: {MODEL} | Workers: {MAX_WORKERS}")
    print(f"Output: {OUT_DIR}")
    print("=" * 60)

    syllabus = load_syllabus()
    nodes = load_nodes()

    # Build all jobs
    jobs = []
    for class_key in sorted(syllabus.keys()):
        topics = get_class_topics(class_key, syllabus, nodes)
        if not topics:
            print(f"  {class_key}: no topics, skipping")
            continue
        print(f"  {class_key}: {len(topics)} topics")
        for topic_type in TOPIC_TYPES:
            jobs.append((class_key, topic_type, topics))

    print(f"\nTotal jobs: {len(jobs)}")
    print(f"Generating with {MAX_WORKERS} workers...\n")

    results = []
    completed = 0
    failed = 0
    skipped = 0

    with concurrent.futures.ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        futures = {
            executor.submit(generate_one, ck, tt, topics): (ck, tt)
            for ck, tt, topics in jobs
        }
        for future in concurrent.futures.as_completed(futures):
            ck, tt = futures[future]
            result = future.result()
            results.append(result)
            completed += 1
            if result.get("skipped"):
                skipped += 1
                print(f"  [SKIP] {result['file']} (already exists)")
            elif result.get("ok"):
                print(f"  [OK] {result['file']} ({result.get('size_kb', 0)} KB) [{completed}/{len(jobs)}]")
            else:
                failed += 1
                print(f"  [FAIL] {result['file']}: {result.get('error', 'unknown')}")

    print(f"\n{'=' * 60}")
    print(f"DONE: {completed} total, {completed - failed - skipped} generated, {skipped} skipped, {failed} failed")
    print(f"Output: {OUT_DIR}")
    print(f"{'=' * 60}")

    # Save summary
    summary = {
        "total_jobs": len(jobs),
        "completed": completed,
        "generated": completed - failed - skipped,
        "skipped": skipped,
        "failed": failed,
        "results": results,
    }
    summary_path = os.path.join(OUT_DIR, "_generation_summary.json")
    with open(summary_path, "w", encoding="utf-8") as f:
        json.dump(summary, f, ensure_ascii=False, indent=2)
    print(f"Summary: {summary_path}")


if __name__ == "__main__":
    main()
