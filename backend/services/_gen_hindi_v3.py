"""CISCE Hindi Generator v3 — Markdown output, batched, with retry.
Asks Fable for MARKDOWN instead of JSON to avoid truncation breaks.
Parses markdown into node JSON + enrichment markers.
Uses key 1 (Fable API).
"""
import urllib.request, json, ssl, os, time, re, sys

KEY = "sk-ant-co-gIEUzRWw_mtUpxKk668B1lzJe3XntCna"
URL = "https://api.claudeopus.pro/v1/messages"
MODEL = "fable"

OUT_NODES = r"D:\platform\cbse_data\nodes\by_subject"
OUT_ENRICH = r"D:\platform\cbse_data\enrichment"
OUT_HINDI = r"D:\platform\cbse_data\hindi_cisce"
NODES_FILE = os.path.join(OUT_NODES, "hindi_cisce.json")

os.makedirs(OUT_HINDI, exist_ok=True)
os.makedirs(OUT_NODES, exist_ok=True)
os.makedirs(OUT_ENRICH, exist_ok=True)

# ─── Batches (same as v2) ──────────────────────────────────────────────────
SYLLABUS_BATCHES = [
    {"class": "1_5", "batch": "alphabets_words", "description": "Primary - alphabets and basic words",
     "topics": ["स्वर और व्यंजन", "दो-तीन अक्षर के शब्द", "सरल कविताएँ - फूल, चिड़िया, तितली", "संज्ञा - व्यक्तिवाचक, जातिवाचक", "वचन - एकवचन, बहुवचन", "लिंग - स्त्रीलिंग, पुंलिंग"]},
    {"class": "1_5", "batch": "stories_writing", "description": "Primary - stories and writing",
     "topics": ["कहानियाँ - लोमड़ी और अंगूर, कछुआ और खरगोश", "अपठित गद्यांश", "चित्र वर्णन"]},
    {"class": "6", "batch": "prose", "description": "ICSE Class 6 Hindi - Prose",
     "topics": ["गद्य पाठ - कहानियाँ", "नैतिक एवं मूल्य आधारित पाठ"]},
    {"class": "6", "batch": "poetry", "description": "ICSE Class 6 Hindi - Poetry",
     "topics": ["पद्य - सरल कविताएँ"]},
    {"class": "6", "batch": "grammar_writing", "description": "ICSE Class 6 Hindi - Grammar and Writing",
     "topics": ["संज्ञा, सर्वनाम, क्रिया, काल, वचन, लिंग", "वाक्य रचना और विराम चिन्ह", "पर्यायवाची, विलोम, मुहावरे और लोकोक्तियाँ", "अपठित गद्यांश", "रचनात्मक लेखन - अनुच्छेद, पत्र, चित्र वर्णन, संवाद"]},
    {"class": "7", "batch": "prose", "description": "ICSE Class 7 Hindi - Prose",
     "topics": ["गद्य - पठन-बोध, शब्दावली, भाव-समझ", "साहित्यिक पाठों की व्याख्या - पात्र, कथावस्तु, संदेश"]},
    {"class": "7", "batch": "poetry", "description": "ICSE Class 7 Hindi - Poetry",
     "topics": ["पद्य - भाव, रस, लय, भाषा-सौंदर्य"]},
    {"class": "7", "batch": "grammar_writing", "description": "ICSE Class 7 Hindi - Grammar and Writing",
     "topics": ["शब्द भेद - संज्ञा, सर्वनाम, विशेषण, क्रिया", "काल और वाच्य", "वाक्य रचना - सरल, संयुक्त, मिश्र", "मुहावरे और लोकोक्तियाँ", "शब्द-भंडार - पर्यायवाची, विलोम", "पत्र लेखन", "अनुच्छेद एवं निबंध लेखन", "संवाद लेखन"]},
    {"class": "8", "batch": "prose", "description": "ICSE Class 8 Hindi - Prose",
     "topics": ["गद्य - पठन-बोध, शब्दावली, भाव-समझ", "साहित्यिक विश्लेषण - पात्र, कथावस्तु, संदेश"]},
    {"class": "8", "batch": "poetry", "description": "ICSE Class 8 Hindi - Poetry",
     "topics": ["पद्य - भाव, रस, छंद, भाषा-सौंदर्य"]},
    {"class": "8", "batch": "grammar_writing", "description": "ICSE Class 8 Hindi - Grammar and Writing",
     "topics": ["शब्द भेद - संज्ञा, सर्वनाम, विशेषण, क्रिया", "काल और वाच्य", "वाक्य रचना - सरल, संयुक्त, मिश्र", "मुहावरे और लोकोक्तियाँ", "शब्द-भंडार - पर्यायवाची, विलोम, तत्सम-तद्भव", "पत्र एवं ई-मेल लेखन", "अनुच्छेद एवं निबंध लेखन", "संवाद एवं रचनात्मक लेखन"]},
    {"class": "9", "batch": "stories_1", "description": "ICSE Class 9 - Sahitya Sagar Stories Part 1",
     "topics": ["बात अठन्नी की - सुदर्शन", "काकी - सियाराम शरण गुप्त", "महायज्ञ का पुरस्कार - यशपाल", "नेताजी का चश्मा - स्वयं प्रकाश", "अपना-अपना भाग्य - जैनेंद्र कुमार"]},
    {"class": "9", "batch": "stories_2", "description": "ICSE Class 9 - Sahitya Sagar Stories Part 2",
     "topics": ["बड़े घर की बेटी - प्रेमचंद", "संदेह - जयशंकर प्रसाद", "भीड़ में खोया आदमी - लीलाधर शर्मा पार्वतीय", "भेड़ें और भेड़िए - हरिशंकर परसाई", "दो कलाकार - मन्नू भंडारी"]},
    {"class": "9", "batch": "poems_1", "description": "ICSE Class 9 - Sahitya Sagar Poems Part 1",
     "topics": ["साखी - कबीरदास", "गिरिधर की कुंडलियाँ - गिरधर कविराय", "स्वर्ग बना सकते हैं - रामधारी सिंह दिनकर", "वह जन्मभूमि मेरी - सोहनलाल द्विवेदी", "मेघ आए - सर्वेश्वर दयाल सक्सेना"]},
    {"class": "9", "batch": "poems_2", "description": "ICSE Class 9 - Sahitya Sagar Poems Part 2",
     "topics": ["सूर के पद - सूरदास", "विनय के पद - तुलसीदास", "भिक्षुक - सूर्यकांत त्रिपाठी 'निराला'", "चलना हमारा काम है - शिवमंगल सिंह 'सुमन'", "मातृ मंदिर की ओर - सुभद्रा कुमारी चौहान"]},
    {"class": "9", "batch": "grammar_writing", "description": "ICSE Class 9 - Grammar and Writing",
     "topics": ["प्रस्ताव/निबंध लेखन/चित्र पर आधारित मौलिक कहानी", "पत्र लेखन", "अपठित गद्यांश", "व्यावहारिक व्याकरण"]},
    {"class": "10", "batch": "stories_1", "description": "ICSE Class 10 - Sahitya Sagar Stories Part 1 (deeper)",
     "topics": ["बात अठन्नी की - गहन विश्लेषण", "काकी - गहन विश्लेषण", "महायज्ञ का पुरस्कार - गहन विश्लेषण", "नेताजी का चश्मा - गहन विश्लेषण", "अपना-अपना भाग्य - गहन विश्लेषण"]},
    {"class": "10", "batch": "stories_2", "description": "ICSE Class 10 - Sahitya Sagar Stories Part 2 (deeper)",
     "topics": ["बड़े घर की बेटी - गहन विश्लेषण", "संदेह - गहन विश्लेषण", "भीड़ में खोया आदमी - गहन विश्लेषण", "भेड़ें और भेड़िए - गहन विश्लेषण", "दो कलाकार - गहन विश्लेषण"]},
    {"class": "10", "batch": "poems_1", "description": "ICSE Class 10 - Sahitya Sagar Poems Part 1 (deeper)",
     "topics": ["साखी - गहन विश्लेषण", "गिरिधर की कुंडलियाँ - गहन विश्लेषण", "स्वर्ग बना सकते हैं - गहन विश्लेषण", "वह जन्मभूमि मेरी - गहन विश्लेषण", "मेघ आए - गहन विश्लेषण"]},
    {"class": "10", "batch": "poems_2", "description": "ICSE Class 10 - Sahitya Sagar Poems Part 2 (deeper)",
     "topics": ["सूर के पद - गहन विश्लेषण", "विनय के पद - गहन विश्लेषण", "भिक्षुक - गहन विश्लेषण", "चलना हमारा काम है - गहन विश्लेषण", "मातृ मंदिर की ओर - गहन विश्लेषण"]},
    {"class": "10", "batch": "grammar_drama", "description": "ICSE Class 10 - Grammar and Drama",
     "topics": ["एकांकी - संस्कार और भावना", "एकांकी - बहू की विदा", "एकांकी - मातृभूमि का मान", "एकांकी - सूखी डाली", "एकांकी - महाभारत की एक साँझ", "एकांकी - दीपदान", "लेखन कौशल", "अपठित विभाग", "व्याकरण"]},
    {"class": "11", "batch": "prose", "description": "ISC Class 11 - Gadya Sankalan",
     "topics": ["गद्य संकलन - लेखक परिचय एवं संदर्भ", "गद्य संकलन - पाठ विश्लेषण भाग 1", "गद्य संकलन - पाठ विश्लेषण भाग 2"]},
    {"class": "11", "batch": "poetry", "description": "ISC Class 11 - Kavya Manjari",
     "topics": ["काव्य मंजरी - कवि परिचय एवं संदर्भ", "काव्य मंजरी - रस, अलंकार, छंद", "काव्य मंजरी - काव्य सौंदर्य विश्लेषण"]},
    {"class": "11", "batch": "novel", "description": "ISC Class 11 - Saara Akash",
     "topics": ["सारा आकाश - रजेंद्र यादव - भाग 1", "सारा आकाश - रजेंद्र यादव - भाग 2", "सारा आकाश - रजेंद्र यादव - भाग 3"]},
    {"class": "11", "batch": "grammar_writing", "description": "ISC Class 11 - Grammar and Writing",
     "topics": ["निबंध लेखन", "पत्र, लेख एवं रिपोर्ट लेखन", "अपठित गद्यांश", "व्याकरण और भाषा-प्रयोग"]},
    {"class": "12", "batch": "prose", "description": "ISC Class 12 - Gadya Sankalan (board level)",
     "topics": ["गद्य संकलन - बोर्ड परीक्षा पाठ भाग 1", "गद्य संकलन - बोर्ड परीक्षा पाठ भाग 2", "गद्य संकलन - बोर्ड परीक्षा पाठ भाग 3"]},
    {"class": "12", "batch": "poetry", "description": "ISC Class 12 - Kavya Manjari (board level)",
     "topics": ["काव्य मंजरी - बोर्ड परीक्षा काव्य भाग 1", "काव्य मंजरी - बोर्ड परीक्षा काव्य भाग 2", "काव्य मंजरी - बोर्ड परीक्षा काव्य भाग 3"]},
    {"class": "12", "batch": "novel", "description": "ISC Class 12 - Saara Akash (board level)",
     "topics": ["सारा आकाश - बोर्ड परीक्षा विश्लेषण भाग 1", "सारा आकाश - बोर्ड परीक्षा विश्लेषण भाग 2"]},
    {"class": "12", "batch": "drama", "description": "ISC Class 12 - Aashad Ka Ek Din",
     "topics": ["आषाढ़ का एक दिन - मोहन राकेश - भाग 1", "आषाढ़ का एक दिन - मोहन राकेश - भाग 2"]},
    {"class": "12", "batch": "grammar_writing", "description": "ISC Class 12 - Grammar and Writing (board level)",
     "topics": ["निबंध लेखन (बोर्ड स्तर)", "पत्र, लेख एवं रिपोर्ट लेखन (बोर्ड स्तर)", "अपठित गद्यांश (बोर्ड स्तर)", "व्याकरण और भाषा-प्रयोग (बोर्ड स्तर)"]},
]


def call_claude(prompt, max_tokens=4000, timeout=180, retries=3):
    ctx = ssl.create_default_context()
    body = json.dumps({
        "model": MODEL,
        "max_tokens": max_tokens,
        "system": "You are an expert Hindi educator and CISCE curriculum specialist. CRITICAL: ALL content must be in pure Hindi Devanagari (देवनागरी) script. No Roman/Hinglish. Only node_id, subject, board, difficulty, cognitive_level may use English. Output in the requested format.",
        "messages": [{"role": "user", "content": prompt}]
    }).encode("utf-8")
    for attempt in range(retries):
        try:
            req = urllib.request.Request(URL, data=body, method="POST")
            req.add_header("x-api-key", KEY)
            req.add_header("Content-Type", "application/json")
            req.add_header("anthropic-version", "2023-06-01")
            with urllib.request.urlopen(req, timeout=timeout, context=ctx) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                text = ""
                for block in data.get("content", []):
                    if block.get("type") == "text":
                        text = block.get("text", "")
                        break
                return text, data.get("usage", {})
        except Exception as e:
            if attempt < retries - 1:
                print(f" retry{attempt+1}: {str(e)[:60]}", end="", flush=True)
                time.sleep(5 * (attempt + 1))
            else:
                raise


def parse_markdown_nodes(md_text, class_num, start_num):
    """Parse markdown node blocks into node dicts.
    Expected format per node:
    
    ## NODE
    node_id: c8_hin_cisce_001
    topic: गद्य - पठन-बोध
    chapter: गद्य
    content_snippet: 2-3 sentence summary
    difficulty: medium
    estimated_time: 25
    concept_tags: टैग1, टैग2, टैग3
    scope_constraints: सीमा का विवरण
    """
    nodes = []
    # Split by ## NODE headers
    blocks = re.split(r'^##\s+NODE\s*$', md_text, re.MULTILINE | re.IGNORECASE)
    
    for block in blocks[1:]:  # skip preamble
        node = {
            "subject": "hindi",
            "class_level": class_num,
            "board": "CISCE",
            "is_root": True,
            "prerequisite_node_ids": [],
            "prerequisite_reasons": {},
            "forward_node_ids": [],
            "forward_reasons": {},
            "cross_subject_prereqs": [],
            "cross_subject_reasons": {},
        }
        
        # Parse key: value lines
        for line in block.strip().split("\n"):
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            
            # Match "key: value"
            m = re.match(r'^(\w+):\s*(.*)', line)
            if m:
                key = m.group(1).strip()
                val = m.group(2).strip()
                
                if key == "node_id":
                    node["node_id"] = val
                elif key == "topic":
                    node["topic"] = val
                elif key == "chapter":
                    node["chapter"] = val
                elif key == "content_snippet":
                    node["content_snippet"] = val
                elif key == "difficulty":
                    node["difficulty"] = val if val in ["easy", "medium", "hard"] else "medium"
                elif key == "estimated_time":
                    try:
                        node["estimated_time"] = int(re.search(r'\d+', val).group())
                    except:
                        node["estimated_time"] = 20
                elif key == "concept_tags":
                    node["concept_tags"] = [t.strip() for t in val.split(",") if t.strip()]
                elif key == "scope_constraints":
                    node["scope_constraints"] = val
                elif key == "is_root":
                    node["is_root"] = val.lower() in ["true", "yes", "1"]
        
        # Assign sequential ID if missing
        if "node_id" not in node:
            node["node_id"] = f"c{class_num}_hin_cisce_{start_num + len(nodes):03d}"
        
        # Ensure required fields
        node.setdefault("topic", "")
        node.setdefault("chapter", "")
        node.setdefault("content_snippet", "")
        node.setdefault("difficulty", "medium")
        node.setdefault("estimated_time", 20)
        node.setdefault("concept_tags", [])
        node.setdefault("scope_constraints", "")
        
        if node["topic"]:  # Only add if it has a topic
            nodes.append(node)
    
    return nodes


def generate_batch_nodes_md(batch, existing_count):
    """Generate nodes for one batch using MARKDOWN output."""
    class_num = batch["class"]
    topics_str = "\n".join(f"  {i+1}. {t}" for i, t in enumerate(batch["topics"]))
    start_num = existing_count + 1
    
    prompt = f"""CISCE Hindi Class {class_num} — Batch: {batch['batch']}
BATCH: {batch['description']}

TOPICS ({len(batch['topics'])}):
{topics_str}

सभी सामग्री शुद्ध हिंदी देवनागरी में। रोमन/हिंग्लिश नहीं।

नियम:
- एक कविता = एक node. एक कहानी = अधिकतम 2-3 nodes. व्याकरण = एक topic = एक node.
- node_id: c{class_num}_hin_cisce_NNN (NNN = {start_num:03d} से शुरू, क्रमिक)
- topic, chapter, content_snippet, concept_tags, scope_constraints: सब देवनागरी में
- difficulty: easy/medium/hard
- estimated_time: मिनट (संख्या)

प्रत्येक node के लिए इस MARKDOWN प्रारूप में लिखें (JSON नहीं):

## NODE
node_id: c{class_num}_hin_cisce_{start_num:03d}
topic: [हिंदी शीर्षक]
chapter: [हिंदी अध्याय]
content_snippet: [2-3 वाक्य में सारांश - हिंदी]
difficulty: [easy/medium/hard]
estimated_time: [संख्या]
concept_tags: [टैग1, टैग2, टैग3]
scope_constraints: [सीमाएँ - हिंदी]

प्रत्येक topic के लिए एक ## NODE ब्लॉक लिखें। कुल {len(batch['topics'])} nodes।
कोई JSON नहीं। कोई markdown code fence नहीं। सीधा markdown text।"""

    text, usage = call_claude(prompt, max_tokens=4000)
    nodes = parse_markdown_nodes(text, class_num, start_num)
    return nodes, usage


def generate_enrichment(node):
    """Generate enrichment marker for a single node."""
    prompt = f"""इस Hindi curriculum node के लिए enrichment बनाएँ।

संपूर्ण सामग्री शुद्ध हिंदी देवनागरी में। कोई अंग्रेजी नहीं। सिर्फ node_id और COGNITIVE_LEVEL अंग्रेजी में।

NODE:
{json.dumps(node, ensure_ascii=False, indent=2)}

इस marker प्रारूप में लिखें:

--- NODE {node['node_id']} ---
TITLE: [हिंदी शीर्षक]
DEFINITION: |
  [२-३ पैराग्राफ विस्तृत व्याख्या - हिंदी]
COGNITIVE_LEVEL: [remember|understand|apply|analyze|evaluate|create]
MASTERY_CRITERIA: |
  [छात्र को क्या दिखाना है - हिंदी]
SCOPE_BOUNDARY: |
  [क्या नहीं पढ़ाना - हिंदी]
TEXT_WALKTHROUGH: |
  [चरण-दर-चरण शिक्षण - ३-४ पैराग्राफ - हिंदी]
DIAGNOSTIC_QUESTION:
  Q: [प्रश्न - हिंदी]
  A: [उत्तर - हिंदी]
  LEVEL: [remember|understand|apply|analyze]
COMMON_MISCONCEPTION: |
  Misconception 1: "[गलत समझ]" [क्यों गलत - हिंदी]
  Misconception 2: "[गलत समझ]" [क्यों गलत - हिंदी]
ON_FAILURE: |
  [उपचार रणनीति - हिंदी]

कविता: भाव, रस, अलंकार, छंद शामिल करें
कहानी: पात्र, कथावस्तु, संदेश शामिल करें
व्याकरण: नियम, उदाहरण, त्रुटियाँ शामिल करें

सीधा marker text। कोई code fence नहीं। सब देवनागरी।"""

    text, usage = call_claude(prompt, max_tokens=3000, timeout=120)
    return text, usage


# ─── MAIN ──────────────────────────────────────────────────────────────────
print("=" * 70)
print("CISCE Hindi Generator v3 — Markdown Output")
print(f"Model: {MODEL} | Batches: {len(SYLLABUS_BATCHES)}")
print("=" * 70)

# Load existing nodes
existing_nodes = []
if os.path.exists(NODES_FILE):
    with open(NODES_FILE, "r", encoding="utf-8") as f:
        existing_nodes = json.load(f)
    print(f"  Existing nodes: {len(existing_nodes)}")

existing_classes = set(str(n.get("class_level", "")) for n in existing_nodes)
print(f"  Existing classes: {sorted(existing_classes)}")

all_nodes = list(existing_nodes)
total_tokens = 0

# ─── PHASE 1: Generate nodes ───────────────────────────────────────────────
print(f"\n[PHASE 1] Generating nodes ({len(SYLLABUS_BATCHES)} batches)...")

for i, batch in enumerate(SYLLABUS_BATCHES):
    class_num = str(batch["class"])
    batch_name = batch["batch"]
    
    # Skip classes we already have (1_5, 6, 7)
    if class_num in existing_classes and class_num in ["1_5", "6", "7"]:
        print(f"  [{i+1}/{len(SYLLABUS_BATCHES)}] C{class_num} '{batch_name}': SKIP")
        continue
    
    class_nodes = [n for n in all_nodes if str(n.get("class_level", "")) == class_num]
    existing_count = len(class_nodes)
    
    print(f"  [{i+1}/{len(SYLLABUS_BATCHES)}] C{class_num} '{batch_name}': gen (exist:{existing_count})...", end=" ", flush=True)
    
    try:
        nodes, usage = generate_batch_nodes_md(batch, existing_count)
        total_tokens += usage.get("output_tokens", 0) + usage.get("input_tokens", 0)
        
        if nodes:
            all_nodes.extend(nodes)
            print(f"{len(nodes)} nodes, {usage.get('output_tokens', 0)} tok")
        else:
            print("0 nodes (parse failed)")
    except Exception as e:
        print(f"FAIL: {str(e)[:80]}")

# Save nodes
with open(NODES_FILE, "w", encoding="utf-8") as f:
    json.dump(all_nodes, f, ensure_ascii=False, indent=2)

by_class = {}
for n in all_nodes:
    c = str(n.get("class_level", "?"))
    by_class[c] = by_class.get(c, 0) + 1
print(f"\n  Total: {len(all_nodes)} nodes | By class: {json.dumps(by_class)}")
print(f"  Saved: {NODES_FILE}")

# ─── PHASE 2: Enrichments for EVERY node ───────────────────────────────────
print(f"\n{'='*70}")
print("[PHASE 2] Enrichments for ALL nodes")
print(f"{'='*70}")

# Check existing enrichment
existing_enriched = set()
for mf in [f for f in os.listdir(OUT_ENRICH) if f.startswith("hindi_cisce") and f.endswith(".marker")]:
    text = open(os.path.join(OUT_ENRICH, mf), "r", encoding="utf-8").read()
    for m in re.finditer(r'^--- NODE ([^-]+) ---', text, re.MULTILINE):
        existing_enriched.add(m.group(1).strip())

print(f"  Already enriched: {len(existing_enriched)}")

nodes_by_class = {}
for node in all_nodes:
    c = str(node.get("class_level", "?"))
    nodes_by_class.setdefault(c, []).append(node)

enrich_count = 0
enrich_failed = 0
enrich_tokens = 0

for class_num in sorted(nodes_by_class.keys(), key=lambda x: str(x)):
    class_nodes = nodes_by_class[class_num]
    missing = [n for n in class_nodes if n["node_id"] not in existing_enriched]
    
    if not missing:
        print(f"  C{class_num}: {len(class_nodes)} nodes — all enriched")
        continue
    
    print(f"  C{class_num}: {len(class_nodes)} nodes, {len(missing)} need enrichment...")
    marker_path = os.path.join(OUT_ENRICH, f"hindi_cisce_c{class_num}.marker")
    mode = "a" if os.path.exists(marker_path) else "w"
    
    with open(marker_path, mode, encoding="utf-8") as mf:
        for j, node in enumerate(missing):
            nid = node["node_id"]
            print(f"    [{j+1}/{len(missing)}] {nid}...", end=" ", flush=True)
            try:
                text, usage = generate_enrichment(node)
                mf.write(text + "\n\n")
                mf.flush()
                enrich_tokens += usage.get("output_tokens", 0) + usage.get("input_tokens", 0)
                enrich_count += 1
                print(f"OK ({usage.get('output_tokens',0)} tok)")
            except Exception as e:
                enrich_failed += 1
                fallback = f"""--- NODE {nid} ---
TITLE: {node.get('topic', '')}
DEFINITION: |
  [सामग्री उत्पन्न नहीं हुई: {str(e)[:50]}]
COGNITIVE_LEVEL: understand
MASTERY_CRITERIA: |
  [छात्र विषय समझे और व्याख्या कर सके]
SCOPE_BOUNDARY: |
  [कक्षा स्तर अनुसार सीमित]
TEXT_WALKTHROUGH: |
  [शिक्षण सामग्री उपलब्ध नहीं]
DIAGNOSTIC_QUESTION:
  Q: [प्रश्न उपलब्ध नहीं]
  A: [उत्तर उपलब्ध नहीं]
  LEVEL: understand
COMMON_MISCONCEPTION: |
  Misconception 1: "[सामान्य त्रुटि]" [व्याख्या]
ON_FAILURE: |
  [उपचार उपलब्ध नहीं]
"""
                mf.write(fallback + "\n\n")
                mf.flush()
                print(f"FAIL ({str(e)[:50]})")

# ─── SUMMARY ───────────────────────────────────────────────────────────────
print(f"\n{'='*70}")
print("COMPLETE")
print(f"{'='*70}")
print(f"  Nodes: {len(all_nodes)}")
print(f"  Enrichments: {enrich_count} OK, {enrich_failed} failed")
print(f"  Tokens: {total_tokens + enrich_tokens}")

summary = {
    "total_nodes": len(all_nodes),
    "enrichments_ok": enrich_count,
    "enrichments_failed": enrich_failed,
    "by_class": by_class,
    "tokens": total_tokens + enrich_tokens,
}
with open(os.path.join(OUT_HINDI, "generation_summary_v3.json"), "w", encoding="utf-8") as f:
    json.dump(summary, f, ensure_ascii=False, indent=2)
print(f"  Summary saved")
