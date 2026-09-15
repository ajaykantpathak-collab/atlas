"""Generate complete CISCE Hindi nodes (Class 1-12) with full enrichments in Hindi script.
Uses Claude Opus 5 with 10 parallel workers. Pure Devanagari output.
One poem = one node, one story = max 2-3 nodes.
Generates nodes + enrichment markers + supporting directory structure in one go.

Resume support: skips classes that already have enrichment files.
"""
import urllib.request, json, ssl, os, time, threading
from concurrent.futures import ThreadPoolExecutor, as_completed

KEY = "sk-ant-co-gIEUzRWw_mtUpxKk668B1lzJe3XntCna"
URL = "https://api.claudeopus.pro/v1/messages"
MODEL = "claude-opus-5"  # Claude Opus 5
MAX_WORKERS = 10

OUT_NODES = r"D:\platform\cbse_data\nodes\by_subject"
OUT_ENRICH = r"D:\platform\cbse_data\enrichment"
OUT_HINDI = r"D:\platform\cbse_data\hindi_cisce"

os.makedirs(OUT_HINDI, exist_ok=True)
os.makedirs(OUT_NODES, exist_ok=True)
os.makedirs(OUT_ENRICH, exist_ok=True)

# Complete CISCE Hindi syllabus compiled from web research
HINDI_SYLLABUS = {
    "class_1_5": {
        "description": "Primary classes - basic Hindi vocabulary, simple stories, poems, alphabet",
        "topics": [
            "स्वर और व्यंजन (Vowels and Consonants)",
            "दो-तीन अक्षर के शब्द (Two-three letter words)",
            "सरल कविताएँ - फूल, चिड़िया, तितली (Simple poems)",
            "कहानियाँ - लोमड़ी और अंगूर, कछुआ और खरगोश (Stories)",
            "अपठित गद्यांश (Unseen passages)",
            "चित्र वर्णन (Picture description)",
            "संज्ञा - व्यक्तिवाचक, जातिवाचक (Nouns)",
            "वचन - एकवचन, बहुवचन (Singular-Plural)",
            "लिंग - स्त्रीलिंग, पुंलिंग (Gender)",
        ]
    },
    "class_6": {
        "description": "ICSE Class 6 Hindi - Foundation level",
        "prose": [
            "गद्य पाठ - कहानियाँ (Prose stories)",
            "नैतिक एवं मूल्य आधारित पाठ (Moral value lessons)",
        ],
        "poetry": [
            "पद्य - सरल कविताएँ (Simple poems with rhythm)",
        ],
        "grammar": [
            "संज्ञा, सर्वनाम, क्रिया, काल, वचन, लिंग",
            "वाक्य रचना और विराम चिन्ह",
            "पर्यायवाची, विलोम, मुहावरे और लोकोक्तियाँ",
        ],
        "writing": [
            "अपठित गद्यांश",
            "रचनात्मक लेखन - अनुच्छेद, पत्र, चित्र वर्णन, संवाद",
        ]
    },
    "class_7": {
        "description": "ICSE Class 7 Hindi",
        "prose": [
            "गद्य - पठन-बोध, शब्दावली, भाव-समझ",
            "साहित्यिक पाठों की व्याख्या - पात्र, कथावस्तु, संदेश",
        ],
        "poetry": [
            "पद्य - भाव, रस, लय, भाषा-सौंदर्य",
        ],
        "grammar": [
            "शब्द भेद - संज्ञा, सर्वनाम, विशेषण, क्रिया",
            "काल और वाच्य - कर्तृवाच्य/कर्मवाच्य",
            "वाक्य रचना - सरल, संयुक्त, मिश्र",
            "मुहावरे और लोकोक्तियाँ",
            "शब्द-भंडार - पर्यायवाची, विलोम, समानार्थक",
        ],
        "writing": [
            "पत्र लेखन - औपचारिक और अनौपचारिक",
            "अनुच्छेद एवं निबंध लेखन",
            "संवाद लेखन",
        ]
    },
    "class_8": {
        "description": "ICSE Class 8 Hindi",
        "prose": [
            "गद्य - पठन-बोध, शब्दावली, भाव-समझ",
            "साहित्यिक विश्लेषण - पात्र, कथावस्तु, संदेश",
        ],
        "poetry": [
            "पद्य - भाव, रस, छंद, भाषा-सौंदर्य",
        ],
        "grammar": [
            "शब्द भेद - संज्ञा, सर्वनाम, विशेषण, क्रिया",
            "काल और वाच्य",
            "वाक्य रचना - सरल, संयुक्त, मिश्र",
            "मुहावरे और लोकोक्तियाँ",
            "शब्द-भंडार - पर्यायवाची, विलोम, तत्सम-तद्भव",
        ],
        "writing": [
            "पत्र एवं ई-मेल लेखन",
            "अनुच्छेद एवं निबंध लेखन",
            "संवाद एवं रचनात्मक लेखन",
        ]
    },
    "class_9": {
        "description": "ICSE Class 9 Hindi - Sahitya Sagar",
        "stories": [
            "बात अठन्नी की - सुदर्शन",
            "काकी - सियाराम शरण गुप्त",
            "महायज्ञ का पुरस्कार - यशपाल",
            "नेताजी का चश्मा - स्वयं प्रकाश",
            "अपना-अपना भाग्य - जैनेंद्र कुमार",
            "बड़े घर की बेटी - प्रेमचंद",
            "संदेह - जयशंकर प्रसाद",
            "भीड़ में खोया आदमी - लीलाधर शर्मा पार्वतीय",
            "भेड़ें और भेड़िए - हरिशंकर परसाई",
            "दो कलाकार - मन्नू भंडारी",
        ],
        "poems": [
            "साखी - कबीरदास",
            "गिरिधर की कुंडलियाँ - गिरधर कविराय",
            "स्वर्ग बना सकते हैं - रामधारी सिंह दिनकर",
            "वह जन्मभूमि मेरी - सोहनलाल द्विवेदी",
            "मेघ आए - सर्वेश्वर दयाल सक्सेना",
            "सूर के पद - सूरदास",
            "विनय के पद - तुलसीदास",
            "भिक्षुक - सूर्यकांत त्रिपाठी 'निराला'",
            "चलना हमारा काम है - शिवमंगल सिंह 'सुमन'",
            "मातृ मंदिर की ओर - सुभद्रा कुमारी चौहान",
        ],
        "grammar": [
            "प्रस्ताव/निबंध लेखन/चित्र पर आधारित मौलिक कहानी",
            "पत्र लेखन",
            "अपठित गद्यांश",
            "व्यावहारिक व्याकरण",
        ]
    },
    "class_10": {
        "description": "ICSE Class 10 Hindi - Sahitya Sagar (same texts, deeper analysis)",
        "stories": [
            "बात अठन्नी की - सुदर्शन",
            "काकी - सियाराम शरण गुप्त",
            "महायज्ञ का पुरस्कार - यशपाल",
            "नेताजी का चश्मा - स्वयं प्रकाश",
            "अपना-अपना भाग्य - जैनेंद्र कुमार",
            "बड़े घर की बेटी - प्रेमचंद",
            "संदेह - जैनेंद्र कुमार",
            "भीड़ में खोया आदमी - लीलाधर शर्मा पार्वतीय",
            "भेड़ें और भेड़िए - हरिशंकर परसाई",
            "दो कलाकार - मन्नू भंडारी",
        ],
        "poems": [
            "साखी - कबीरदास",
            "गिरिधर की कुंडलियाँ - गिरधर कविराय",
            "स्वर्ग बना सकते हैं - रामधारी सिंह दिनकर",
            "वह जन्मभूमि मेरी - सोहनलाल द्विवेदी",
            "मेघ आए - सर्वेश्वर दयाल सक्सेना",
            "सूर के पद - सूरदास",
            "विनय के पद - तुलसीदास",
            "भिक्षुक - सूर्यकांत त्रिपाठी 'निराला'",
            "चलना हमारा काम है - शिवमंगल सिंह 'सुमन'",
            "मातृ मंदिर की ओर - सुभद्रा कुमारी चौहान",
        ],
        "grammar": [
            "एकांकी - संस्कार और भावना, बहू की विदा, मातृभूमि का मान, सूखी डाली, महाभारत की एक साँझ, दीपदान",
            "लेखन कौशल",
            "अपठित विभाग",
            "व्याकरण",
        ]
    },
    "class_11": {
        "description": "ISC Class 11 Hindi",
        "prose": [
            "गद्य संकलन (Gadya Sankalan) - Evergreen Publications",
            "लेखक परिचय एवं संदर्भ",
        ],
        "poetry": [
            "काव्य मंजरी (Kavya Manjari) - Evergreen Publications",
            "रस, अलंकार, छंद, काव्य सौंदर्य",
        ],
        "novel": [
            "सारा आकाश - रजेंद्र यादव (Saara Akash - Rajendra Yadav)",
        ],
        "grammar": [
            "निबंध लेखन",
            "पत्र, लेख एवं रिपोर्ट लेखन",
            "अपठित गद्यांश",
            "व्याकरण और भाषा-प्रयोग",
        ]
    },
    "class_12": {
        "description": "ISC Class 12 Hindi - Board exam",
        "prose": [
            "गद्य संकलन (Gadya Sankalan) - Evergreen Publications",
        ],
        "poetry": [
            "काव्य मंजरी (Kavya Manjari) - Evergreen Publications",
        ],
        "novel": [
            "सारा आकाश - रजेंद्र यादव (Saara Akash)",
        ],
        "drama": [
            "आषाढ़ का एक दिन - मोहन राकेश (Aashad Ka Ek Din - Mohan Rakesh)",
        ],
        "grammar": [
            "निबंध लेखन",
            "पत्र, लेख एवं रिपोर्ट लेखन",
            "अपठित गद्यांश",
            "व्याकरण और भाषा-प्रयोग",
        ]
    }
}

def call_claude(prompt, max_tokens=128000, timeout=600, max_retries=5):
    """Call Claude Opus 5 API with rate limit handling."""
    ctx = ssl.create_default_context()
    body = json.dumps({
        "model": MODEL,
        "max_tokens": max_tokens,
        "system": "You are an expert Hindi educator and CISCE curriculum specialist. CRITICAL: ALL content must be written in pure Hindi using Devanagari (देवनागरी) script. Do NOT use Roman/Hinglish transliteration. Do NOT mix English words. Every explanation, definition, walkthrough, misconception, diagnostic question, and remediation must be in pure Hindi Devanagari script. Only node_id, subject, board, difficulty, and cognitive_level fields may use English. Output structured data as requested.",
        "messages": [{"role": "user", "content": prompt}]
    }).encode("utf-8")
    req = urllib.request.Request(URL, data=body, method="POST")
    req.add_header("x-api-key", KEY)
    req.add_header("Content-Type", "application/json")
    req.add_header("anthropic-version", "2023-06-01")

    for attempt in range(max_retries):
        try:
            with urllib.request.urlopen(req, timeout=timeout, context=ctx) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                text = ""
                for block in data.get("content", []):
                    if block.get("type") == "text":
                        text = block.get("text", "")
                        break
                usage = data.get("usage", {})
                return text, usage
        except urllib.error.HTTPError as e:
            err_body = e.read().decode("utf-8", errors="replace")[:500]
            if e.code == 429 or "rate" in err_body.lower():
                wait = 60 * (attempt + 1)
                print(f"    [RATE LIMIT] Waiting {wait}s (attempt {attempt+1}/{max_retries})", flush=True)
                time.sleep(wait)
                continue
            if attempt < max_retries - 1:
                time.sleep(10)
                continue
            raise
        except Exception as e:
            if attempt < max_retries - 1:
                time.sleep(10)
                continue
            raise
    return "", {"output_tokens": 0, "input_tokens": 0}

def generate_class_nodes(class_key, syllabus):
    """Generate all nodes for one class"""
    class_num = class_key.replace("class_", "")
    nodes = []
    
    # Build prompt for this class
    prompt = f"""You are generating curriculum nodes for CISCE Hindi Class {class_num}.

SYLLABUS:
{json.dumps(syllabus, ensure_ascii=False, indent=2)}

CRITICAL: सभी सामग्री शुद्ध हिंदी में देवनागरी लिपि में लिखें। रोमन/हिंग्लिश का प्रयोग न करें।

RULES:
1. One poem = one node. One story = max 2-3 nodes. Grammar topics = one node each.
2. Each node must have: node_id, topic (in Hindi Devanagari), subject="hindi", class_level={class_num}, board="CISCE", chapter (in Hindi Devanagari), content_snippet (2-3 sentence summary in Hindi Devanagari), difficulty, estimated_time, concept_tags (in Hindi Devanagari), prerequisite_node_ids (empty for now), scope_constraints (in Hindi Devanagari)
3. node_id format: c{class_num}_hin_cisce_XXX (zero-padded 3 digits)
4. ALL text MUST be in pure Hindi Devanagari script (देवनागरी) except: node_id, subject, board, difficulty
5. For poems: include poet name in topic (e.g., "साखी - कबीरदास"), content_snippet should describe the poem's theme in Hindi
6. For stories: include author name in topic (e.g., "काकी - सियाराम शरण गुप्त"), content_snippet should describe the plot briefly in Hindi
7. For grammar: topic should be the grammar concept name in Hindi (e.g., "संज्ञा और उसके भेद")
8. Do NOT use any English words in topic, chapter, content_snippet, concept_tags, or scope_constraints

Output as JSON array of node objects. Output ONLY the JSON array, no markdown, no explanation."""

    try:
        text, usage = call_claude(prompt, max_tokens=128000)
        # Strip markdown if present
        if text.strip().startswith("```"):
            lines = text.strip().split("\n")
            lines = [l for l in lines if not l.strip().startswith("```")]
            text = "\n".join(lines)
        nodes = json.loads(text)
        print(f"  Class {class_num}: {len(nodes)} nodes, {usage.get('output_tokens', 0)} tokens")
        return nodes, usage
    except Exception as e:
        print(f"  Class {class_num}: ERROR - {str(e)[:200]}")
        return [], {"output_tokens": 0}

def generate_enrichment(node, class_num):
    """Generate enrichment marker for a single node"""
    prompt = f"""Generate enrichment content for this Hindi curriculum node.

CRITICAL: संपूर्ण सामग्री शुद्ध हिंदी में देवनागरी लिपि (Devanagari script) में लिखें।
कोई भी अंग्रेजी शब्द का प्रयोग न करें। कोई रोमन लिपि नहीं। कोई हिंग्लिश नहीं।
सिर्फ node_id और COGNITIVE_LEVEL फ़ील्ड अंग्रेजी में रह सकते हैं।

NODE:
{json.dumps(node, ensure_ascii=False, indent=2)}

Generate enrichment in this marker format:
--- NODE {node['node_id']} ---
TITLE: [हिंदी शीर्षक - देवनागरी में]
DEFINITION: |
  [२-३ पैराग्राफ में विस्तृत व्याख्या - शुद्ध हिंदी देवनागरी में]
  [यह कविता/कहानी/व्याकरण किस बारे में है, इसका मुख्य विषय क्या है]
COGNITIVE_LEVEL: [remember|understand|apply|analyze|evaluate|create]
MASTERY_CRITERIA: |
  [छात्र को क्या प्रदर्शित करना चाहिए ताकि महारत दिखे - शुद्ध हिंदी देवनागरी में]
SCOPE_BOUNDARY: |
  [क्या नहीं पढ़ाना है - सीमाएँ - शुद्ध हिंदी देवनागरी में]
TEXT_WALKTHROUGH: |
  [चरण-दर-चरण शिक्षण कथा - ३-४ पैराग्राफ - शुद्ध हिंदी देवनागरी में]
  [छात्र को कैसे समझाएँ, कौन सा उदाहरण दें, कैसे आगे बढ़ें]
DIAGNOSTIC_QUESTION:
  Q: [नैदानिक प्रश्न - शुद्ध हिंदी देवनागरी में]
  A: [अपेक्षित उत्तर - शुद्ध हिंदी देवनागरी में]
  LEVEL: [remember|understand|apply|analyze]
COMMON_MISCONCEPTION: |
  Misconception 1: "[गलत समझ]" [क्यों गलत है - शुद्ध हिंदी देवनागरी में]
  Misconception 2: "[गलत समझ]" [क्यों गलत है - शुद्ध हिंदी देवनागरी में]
ON_FAILURE: |
  [यदि छात्र विफल हो तो उपचार रणनीति - शुद्ध हिंदी देवनागरी में]

कविताओं के लिए: भाव, रस, अलंकार, छंद का विश्लेषण शामिल करें
कहानियों के लिए: पात्र विश्लेषण, कथावस्तु, संदेश/विषय शामिल करें
व्याकरण के लिए: नियम, उदाहरण, सामान्य त्रुटियाँ शामिल करें

Output ONLY the marker text, no markdown fences. सब कुछ देवनागरी में।"""

    try:
        text, usage = call_claude(prompt, max_tokens=128000, timeout=600)
        if text.strip().startswith("```"):
            lines = text.strip().split("\n")
            lines = [l for l in lines if not l.strip().startswith("```")]
            text = "\n".join(lines)
        return text, usage
    except Exception as e:
        return f"--- NODE {node['node_id']} ---\nTITLE: {node.get('topic', '')}\nDEFINITION: |\n  [Generation failed: {str(e)[:100]}]\n", {"output_tokens": 0}

# ── Thread-safe file writing ────────────────────────────────────────────────
_write_lock = threading.Lock()

# Main execution
print("=" * 60)
print("CISCE Hindi Node + Enrichment Generator")
print(f"Model: {MODEL} | Workers: {MAX_WORKERS}")
print(f"Output: Pure Devanagari (देवनागरी)")
print("=" * 60)

# ── Phase 1: Generate nodes ─────────────────────────────────────────────────
# Check if nodes already exist (resume support)
nodes_file = os.path.join(OUT_NODES, "hindi_cisce.json")
existing_nodes = []
if os.path.exists(nodes_file):
    try:
        with open(nodes_file, "r", encoding="utf-8") as f:
            existing_nodes = json.load(f)
        print(f"\nExisting nodes found: {len(existing_nodes)} (will append new ones)")
    except Exception:
        existing_nodes = []

# Check which classes already have nodes
existing_classes = set()
for node in existing_nodes:
    cl = str(node.get("class_level", ""))
    existing_classes.add(cl)

all_nodes = list(existing_nodes)
total_tokens = 0

# Generate nodes for classes that don't have them yet
for class_key, syllabus in HINDI_SYLLABUS.items():
    class_num = class_key.replace("class_", "")
    if class_num in existing_classes:
        print(f"\nClass {class_num}: SKIP (already have nodes)")
        continue
    print(f"\nGenerating Class {class_num} nodes...")
    nodes, usage = generate_class_nodes(class_key, syllabus)
    all_nodes.extend(nodes)
    total_tokens += usage.get("output_tokens", 0) + usage.get("input_tokens", 0)

print(f"\n{'=' * 60}")
print(f"Total nodes: {len(all_nodes)} (existing: {len(existing_nodes)}, new: {len(all_nodes) - len(existing_nodes)})")
print(f"Node tokens used: {total_tokens}")
print(f"{'=' * 60}")

# Save all nodes
with open(nodes_file, "w", encoding="utf-8") as f:
    json.dump(all_nodes, f, ensure_ascii=False, indent=2)
print(f"Nodes saved to: {nodes_file}")

# Save syllabus reference
syllabus_file = os.path.join(OUT_HINDI, "syllabus_reference.json")
with open(syllabus_file, "w", encoding="utf-8") as f:
    json.dump(HINDI_SYLLABUS, f, ensure_ascii=False, indent=2)
print(f"Syllabus saved to: {syllabus_file}")

# ── Phase 2: Generate enrichments with 10 workers ───────────────────────────
print(f"\n{'=' * 60}")
print(f"Generating enrichments with {MAX_WORKERS} workers...")
print(f"{'=' * 60}")

# Group nodes by class
by_class = {}
for node in all_nodes:
    c = node.get("class_level", 0)
    if c not in by_class:
        by_class[c] = []
    by_class[c].append(node)

enrich_tokens = 0
enrich_count = 0
enrich_errors = []


def generate_enrichment_worker(node, class_num):
    """Worker function for parallel enrichment generation."""
    try:
        text, usage = generate_enrichment(node, class_num)
        return node, text, usage, None
    except Exception as e:
        return node, None, {"output_tokens": 0, "input_tokens": 0}, str(e)[:200]


for class_num in sorted(by_class.keys(), key=lambda x: str(x)):
    class_nodes = by_class[class_num]
    marker_filename = f"hindi_cisce_c{class_num}.marker"
    marker_path = os.path.join(OUT_ENRICH, marker_filename)

    # Resume support: skip if marker file already exists and is non-trivial
    if os.path.exists(marker_path) and os.path.getsize(marker_path) > 1000:
        print(f"\nClass {class_num}: SKIP (enrichment file exists, {os.path.getsize(marker_path)} bytes)")
        enrich_count += len(class_nodes)
        continue

    print(f"\nClass {class_num}: {len(class_nodes)} enrichments with {MAX_WORKERS} workers...")

    # Generate all enrichments in parallel
    results_by_node = {}
    class_tokens = 0

    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        futures = {
            executor.submit(generate_enrichment_worker, node, class_num): node
            for node in class_nodes
        }

        for i, future in enumerate(as_completed(futures)):
            node, text, usage, error = future.result()
            nid = node.get("node_id", "unknown")
            if error:
                print(f"  [ERR] {nid}: {error}", flush=True)
                enrich_errors.append((nid, error))
                # Write a minimal marker so the node isn't lost
                text = f"--- NODE {nid} ---\nTITLE: {node.get('topic', '')}\nDEFINITION: |\n  [Generation failed: {error}]\n"
            else:
                tokens = usage.get("output_tokens", 0) + usage.get("input_tokens", 0)
                class_tokens += tokens
                print(f"  [OK] {nid} ({tokens} tokens) [{i+1}/{len(class_nodes)}]", flush=True)

            results_by_node[nid] = text

    # Write marker file in node order (not completion order)
    with _write_lock:
        with open(marker_path, "w", encoding="utf-8") as marker_file:
            for node in class_nodes:
                nid = node.get("node_id", "")
                text = results_by_node.get(nid, "")
                marker_file.write(text + "\n\n")

    enrich_count += len(class_nodes)
    enrich_tokens += class_tokens
    print(f"  Class {class_num} done: {len(class_nodes)} enrichments, {class_tokens} tokens")
    print(f"  Saved: {marker_path}")

print(f"\n{'=' * 60}")
print(f"ENRICHMENT COMPLETE")
print(f"Total enrichments: {enrich_count}")
print(f"Enrichment tokens: {enrich_tokens}")
print(f"Total tokens (nodes + enrichments): {total_tokens + enrich_tokens}")
if enrich_errors:
    print(f"Errors: {len(enrich_errors)}")
    for nid, err in enrich_errors[:10]:
        print(f"  {nid}: {err}")
print(f"{'=' * 60}")

# Final summary
summary = {
    "total_nodes": len(all_nodes),
    "total_enrichments": enrich_count,
    "by_class": {str(c): len(nodes) for c, nodes in sorted(by_class.items(), key=lambda x: str(x[0]))},
    "tokens_used": total_tokens + enrich_tokens,
    "nodes_file": nodes_file,
    "enrichment_files": [f"hindi_cisce_c{c}.marker" for c in sorted(by_class.keys(), key=str)],
    "model": MODEL,
    "workers": MAX_WORKERS,
    "errors": len(enrich_errors),
}
summary_path = os.path.join(OUT_HINDI, "generation_summary.json")
with open(summary_path, "w", encoding="utf-8") as f:
    json.dump(summary, f, ensure_ascii=False, indent=2)
print(f"\nSummary saved to: {summary_path}")
print(json.dumps(summary, ensure_ascii=False, indent=2))
