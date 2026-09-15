"""CISCE Hindi Generator v2 — robust, batched, with retry logic.
Generates nodes class-by-class in small batches to avoid JSON truncation.
Then generates enrichment for EVERY node with matching IDs.
Uses key 1 (Fable API) with claude-opus-4-6.
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

# ─── Syllabus split into small batches per class ───────────────────────────
# Each batch is small enough to avoid JSON truncation

SYLLABUS_BATCHES = [
    # Class 1-5 (primary) — split into 2 batches
    {
        "class": "1_5", "batch": "alphabets_words",
        "description": "Primary classes - alphabets and basic words",
        "topics": [
            "स्वर और व्यंजन (Vowels and Consonants)",
            "दो-तीन अक्षर के शब्द (Two-three letter words)",
            "सरल कविताएँ - फूल, चिड़िया, तितली (Simple poems)",
            "संज्ञा - व्यक्तिवाचक, जातिवाचक (Nouns)",
            "वचन - एकवचन, बहुवचन (Singular-Plural)",
            "लिंग - स्त्रीलिंग, पुंलिंग (Gender)",
        ],
    },
    {
        "class": "1_5", "batch": "stories_writing",
        "description": "Primary classes - stories and writing",
        "topics": [
            "कहानियाँ - लोमड़ी और अंगूर, कछुआ और खरगोश (Stories)",
            "अपठित गद्यांश (Unseen passages)",
            "चित्र वर्णन (Picture description)",
        ],
    },
    # Class 6 — split into 3 batches
    {
        "class": "6", "batch": "prose",
        "description": "ICSE Class 6 Hindi - Prose",
        "topics": [
            "गद्य पाठ - कहानियाँ (Prose stories)",
            "नैतिक एवं मूल्य आधारित पाठ (Moral value lessons)",
        ],
    },
    {
        "class": "6", "batch": "poetry",
        "description": "ICSE Class 6 Hindi - Poetry",
        "topics": [
            "पद्य - सरल कविताएँ (Simple poems with rhythm)",
        ],
    },
    {
        "class": "6", "batch": "grammar_writing",
        "description": "ICSE Class 6 Hindi - Grammar and Writing",
        "topics": [
            "संज्ञा, सर्वनाम, क्रिया, काल, वचन, लिंग",
            "वाक्य रचना और विराम चिन्ह",
            "पर्यायवाची, विलोम, मुहावरे और लोकोक्तियाँ",
            "अपठित गद्यांश",
            "रचनात्मक लेखन - अनुच्छेद, पत्र, चित्र वर्णन, संवाद",
        ],
    },
    # Class 7 — split into 3 batches
    {
        "class": "7", "batch": "prose",
        "description": "ICSE Class 7 Hindi - Prose",
        "topics": [
            "गद्य - पठन-बोध, शब्दावली, भाव-समझ",
            "साहित्यिक पाठों की व्याख्या - पात्र, कथावस्तु, संदेश",
        ],
    },
    {
        "class": "7", "batch": "poetry",
        "description": "ICSE Class 7 Hindi - Poetry",
        "topics": [
            "पद्य - भाव, रस, लय, भाषा-सौंदर्य",
        ],
    },
    {
        "class": "7", "batch": "grammar_writing",
        "description": "ICSE Class 7 Hindi - Grammar and Writing",
        "topics": [
            "शब्द भेद - संज्ञा, सर्वनाम, विशेषण, क्रिया",
            "काल और वाच्य - कर्तृवाच्य/कर्मवाच्य",
            "वाक्य रचना - सरल, संयुक्त, मिश्र",
            "मुहावरे और लोकोक्तियाँ",
            "शब्द-भंडार - पर्यायवाची, विलोम, समानार्थक",
            "पत्र लेखन - औपचारिक और अनौपचारिक",
            "अनुच्छेद एवं निबंध लेखन",
            "संवाद लेखन",
        ],
    },
    # Class 8 — split into 3 batches
    {
        "class": "8", "batch": "prose",
        "description": "ICSE Class 8 Hindi - Prose",
        "topics": [
            "गद्य - पठन-बोध, शब्दावली, भाव-समझ",
            "साहित्यिक विश्लेषण - पात्र, कथावस्तु, संदेश",
        ],
    },
    {
        "class": "8", "batch": "poetry",
        "description": "ICSE Class 8 Hindi - Poetry",
        "topics": [
            "पद्य - भाव, रस, छंद, भाषा-सौंदर्य",
        ],
    },
    {
        "class": "8", "batch": "grammar_writing",
        "description": "ICSE Class 8 Hindi - Grammar and Writing",
        "topics": [
            "शब्द भेद - संज्ञा, सर्वनाम, विशेषण, क्रिया",
            "काल और वाच्य",
            "वाक्य रचना - सरल, संयुक्त, मिश्र",
            "मुहावरे और लोकोक्तियाँ",
            "शब्द-भंडार - पर्यायवाची, विलोम, तत्सम-तद्भव",
            "पत्र एवं ई-मेल लेखन",
            "अनुच्छेद एवं निबंध लेखन",
            "संवाद एवं रचनात्मक लेखन",
        ],
    },
    # Class 9 — Sahitya Sagar stories (split into 2 batches of 5)
    {
        "class": "9", "batch": "stories_1",
        "description": "ICSE Class 9 Hindi - Sahitya Sagar Stories (Part 1)",
        "topics": [
            "बात अठन्नी की - सुदर्शन",
            "काकी - सियाराम शरण गुप्त",
            "महायज्ञ का पुरस्कार - यशपाल",
            "नेताजी का चश्मा - स्वयं प्रकाश",
            "अपना-अपना भाग्य - जैनेंद्र कुमार",
        ],
    },
    {
        "class": "9", "batch": "stories_2",
        "description": "ICSE Class 9 Hindi - Sahitya Sagar Stories (Part 2)",
        "topics": [
            "बड़े घर की बेटी - प्रेमचंद",
            "संदेह - जयशंकर प्रसाद",
            "भीड़ में खोया आदमी - लीलाधर शर्मा पार्वतीय",
            "भेड़ें और भेड़िए - हरिशंकर परसाई",
            "दो कलाकार - मन्नू भंडारी",
        ],
    },
    # Class 9 — Sahitya Sagar poems (split into 2 batches of 5)
    {
        "class": "9", "batch": "poems_1",
        "description": "ICSE Class 9 Hindi - Sahitya Sagar Poems (Part 1)",
        "topics": [
            "साखी - कबीरदास",
            "गिरिधर की कुंडलियाँ - गिरधर कविराय",
            "स्वर्ग बना सकते हैं - रामधारी सिंह दिनकर",
            "वह जन्मभूमि मेरी - सोहनलाल द्विवेदी",
            "मेघ आए - सर्वेश्वर दयाल सक्सेना",
        ],
    },
    {
        "class": "9", "batch": "poems_2",
        "description": "ICSE Class 9 Hindi - Sahitya Sagar Poems (Part 2)",
        "topics": [
            "सूर के पद - सूरदास",
            "विनय के पद - तुलसीदास",
            "भिक्षुक - सूर्यकांत त्रिपाठी 'निराला'",
            "चलना हमारा काम है - शिवमंगल सिंह 'सुमन'",
            "मातृ मंदिर की ओर - सुभद्रा कुमारी चौहान",
        ],
    },
    {
        "class": "9", "batch": "grammar_writing",
        "description": "ICSE Class 9 Hindi - Grammar and Writing",
        "topics": [
            "प्रस्ताव/निबंध लेखन/चित्र पर आधारित मौलिक कहानी",
            "पत्र लेखन",
            "अपठित गद्यांश",
            "व्यावहारिक व्याकरण",
        ],
    },
    # Class 10 — same Sahitya Sagar texts but deeper analysis
    {
        "class": "10", "batch": "stories_1",
        "description": "ICSE Class 10 Hindi - Sahitya Sagar Stories (Part 1, deeper analysis)",
        "topics": [
            "बात अठन्नी की - सुदर्शन (गहन विश्लेषण)",
            "काकी - सियाराम शरण गुप्त (गहन विश्लेषण)",
            "महायज्ञ का पुरस्कार - यशपाल (गहन विश्लेषण)",
            "नेताजी का चश्मा - स्वयं प्रकाश (गहन विश्लेषण)",
            "अपना-अपना भाग्य - जैनेंद्र कुमार (गहन विश्लेषण)",
        ],
    },
    {
        "class": "10", "batch": "stories_2",
        "description": "ICSE Class 10 Hindi - Sahitya Sagar Stories (Part 2, deeper analysis)",
        "topics": [
            "बड़े घर की बेटी - प्रेमचंद (गहन विश्लेषण)",
            "संदेह - जैनेंद्र कुमार (गहन विश्लेषण)",
            "भीड़ में खोया आदमी - लीलाधर शर्मा पार्वतीय (गहन विश्लेषण)",
            "भेड़ें और भेड़िए - हरिशंकर परसाई (गहन विश्लेषण)",
            "दो कलाकार - मन्नू भंडारी (गहन विश्लेषण)",
        ],
    },
    {
        "class": "10", "batch": "poems_1",
        "description": "ICSE Class 10 Hindi - Sahitya Sagar Poems (Part 1, deeper analysis)",
        "topics": [
            "साखी - कबीरदास (गहन विश्लेषण)",
            "गिरिधर की कुंडलियाँ - गिरधर कविराय (गहन विश्लेषण)",
            "स्वर्ग बना सकते हैं - रामधारी सिंह दिनकर (गहन विश्लेषण)",
            "वह जन्मभूमि मेरी - सोहनलाल द्विवेदी (गहन विश्लेषण)",
            "मेघ आए - सर्वेश्वर दयाल सक्सेना (गहन विश्लेषण)",
        ],
    },
    {
        "class": "10", "batch": "poems_2",
        "description": "ICSE Class 10 Hindi - Sahitya Sagar Poems (Part 2, deeper analysis)",
        "topics": [
            "सूर के पद - सूरदास (गहन विश्लेषण)",
            "विनय के पद - तुलसीदास (गहन विश्लेषण)",
            "भिक्षुक - सूर्यकांत त्रिपाठी 'निराला' (गहन विश्लेषण)",
            "चलना हमारा काम है - शिवमंगल सिंह 'सुमन' (गहन विश्लेषण)",
            "मातृ मंदिर की ओर - सुभद्रा कुमारी चौहान (गहन विश्लेषण)",
        ],
    },
    {
        "class": "10", "batch": "grammar_drama",
        "description": "ICSE Class 10 Hindi - Grammar and Drama",
        "topics": [
            "एकांकी - संस्कार और भावना",
            "एकांकी - बहू की विदा",
            "एकांकी - मातृभूमि का मान",
            "एकांकी - सूखी डाली",
            "एकांकी - महाभारत की एक साँझ",
            "एकांकी - दीपदान",
            "लेखन कौशल",
            "अपठित विभाग",
            "व्याकरण",
        ],
    },
    # Class 11 — ISC
    {
        "class": "11", "batch": "prose",
        "description": "ISC Class 11 Hindi - Gadya Sankalan (Prose)",
        "topics": [
            "गद्य संकलन - लेखक परिचय एवं संदर्भ",
            "गद्य संकलन - पाठ विश्लेषण भाग 1",
            "गद्य संकलन - पाठ विश्लेषण भाग 2",
        ],
    },
    {
        "class": "11", "batch": "poetry",
        "description": "ISC Class 11 Hindi - Kavya Manjari (Poetry)",
        "topics": [
            "काव्य मंजरी - कवि परिचय एवं संदर्भ",
            "काव्य मंजरी - रस, अलंकार, छंद",
            "काव्य मंजरी - काव्य सौंदर्य विश्लेषण",
        ],
    },
    {
        "class": "11", "batch": "novel",
        "description": "ISC Class 11 Hindi - Saara Akash (Novel)",
        "topics": [
            "सारा आकाश - रजेंद्र यादव (उपन्यास) - भाग 1",
            "सारा आकाश - रजेंद्र यादव (उपन्यास) - भाग 2",
            "सारा आकाश - रजेंद्र यादव (उपन्यास) - भाग 3",
        ],
    },
    {
        "class": "11", "batch": "grammar_writing",
        "description": "ISC Class 11 Hindi - Grammar and Writing",
        "topics": [
            "निबंध लेखन",
            "पत्र, लेख एवं रिपोर्ट लेखन",
            "अपठित गद्यांश",
            "व्याकरण और भाषा-प्रयोग",
        ],
    },
    # Class 12 — ISC
    {
        "class": "12", "batch": "prose",
        "description": "ISC Class 12 Hindi - Gadya Sankalan (Prose, board exam level)",
        "topics": [
            "गद्य संकलन - बोर्ड परीक्षा पाठ भाग 1",
            "गद्य संकलन - बोर्ड परीक्षा पाठ भाग 2",
            "गद्य संकलन - बोर्ड परीक्षा पाठ भाग 3",
        ],
    },
    {
        "class": "12", "batch": "poetry",
        "description": "ISC Class 12 Hindi - Kavya Manjari (Poetry, board exam level)",
        "topics": [
            "काव्य मंजरी - बोर्ड परीक्षा काव्य भाग 1",
            "काव्य मंजरी - बोर्ड परीक्षा काव्य भाग 2",
            "काव्य मंजरी - बोर्ड परीक्षा काव्य भाग 3",
        ],
    },
    {
        "class": "12", "batch": "novel",
        "description": "ISC Class 12 Hindi - Saara Akash (Novel, board exam level)",
        "topics": [
            "सारा आकाश - बोर्ड परीक्षा विश्लेषण भाग 1",
            "सारा आकाश - बोर्ड परीक्षा विश्लेषण भाग 2",
        ],
    },
    {
        "class": "12", "batch": "drama",
        "description": "ISC Class 12 Hindi - Aashad Ka Ek Din (Drama)",
        "topics": [
            "आषाढ़ का एक दिन - मोहन राकेश (नाटक) - भाग 1",
            "आषाढ़ का एक दिन - मोहन राकेश (नाटक) - भाग 2",
        ],
    },
    {
        "class": "12", "batch": "grammar_writing",
        "description": "ISC Class 12 Hindi - Grammar and Writing (board exam level)",
        "topics": [
            "निबंध लेखन (बोर्ड स्तर)",
            "पत्र, लेख एवं रिपोर्ट लेखन (बोर्ड स्तर)",
            "अपठित गद्यांश (बोर्ड स्तर)",
            "व्याकरण और भाषा-प्रयोग (बोर्ड स्तर)",
        ],
    },
]


def call_claude(prompt, max_tokens=4000, timeout=180, retries=3):
    """Call Fable API with retry logic."""
    ctx = ssl.create_default_context()
    body = json.dumps({
        "model": MODEL,
        "max_tokens": max_tokens,
        "system": "You are an expert Hindi educator and CISCE curriculum specialist. CRITICAL: ALL content must be written in pure Hindi using Devanagari (देवनागरी) script. Do NOT use Roman/Hinglish transliteration. Do NOT mix English words. Every explanation, definition, walkthrough, misconception, diagnostic question, and remediation must be in pure Hindi Devanagari script. Only node_id, subject, board, difficulty, and cognitive_level fields may use English. Output structured data as requested.",
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
                usage = data.get("usage", {})
                return text, usage
        except Exception as e:
            if attempt < retries - 1:
                print(f"    Retry {attempt+1}/{retries}: {str(e)[:80]}", end=" ", flush=True)
                time.sleep(5 * (attempt + 1))
            else:
                raise


def strip_markdown(text):
    """Remove markdown code fences if present."""
    text = text.strip()
    if text.startswith("```"):
        lines = text.split("\n")
        lines = [l for l in lines if not l.strip().startswith("```")]
        text = "\n".join(lines).strip()
    return text


def generate_batch_nodes(batch, existing_count):
    """Generate nodes for one small batch."""
    class_num = batch["class"]
    batch_name = batch["batch"]
    topics = batch["topics"]
    
    topics_str = "\n".join(f"  {i+1}. {t}" for i, t in enumerate(topics))
    
    prompt = f"""You are generating curriculum nodes for CISCE Hindi Class {class_num} — Batch: {batch_name}.

BATCH DESCRIPTION: {batch['description']}

TOPICS FOR THIS BATCH ({len(topics)} topics):
{topics_str}

CRITICAL: सभी सामग्री शुद्ध हिंदी में देवनागरी लिपि में लिखें। रोमन/हिंग्लिश का प्रयोग न करें।

RULES:
1. One poem = one node. One story = max 2-3 nodes. Grammar topics = one node each.
2. Each node must have these fields:
   - node_id: "c{class_num}_hin_cisce_{NNN:03d}" (sequential, starting at {existing_count+1:03d})
   - topic: Hindi Devanagari (e.g., "साखी - कबीरदास")
   - subject: "hindi"
   - class_level: {class_num}
   - board: "CISCE"
   - chapter: Hindi Devanagari
   - content_snippet: 2-3 sentence summary in Hindi Devanagari
   - difficulty: "easy" | "medium" | "hard"
   - estimated_time: integer (minutes)
   - is_root: boolean
   - concept_tags: array of Hindi Devanagari strings
   - prerequisite_node_ids: empty array []
   - prerequisite_reasons: empty object {{}}
   - forward_node_ids: empty array []
   - forward_reasons: empty object {{}}
   - cross_subject_prereqs: empty array []
   - cross_subject_reasons: empty object {{}}
   - scope_constraints: Hindi Devanagari
3. ALL text MUST be in pure Hindi Devanagari script except: node_id, subject, board, difficulty
4. For poems: include poet name in topic, content_snippet describes theme
5. For stories: include author name in topic, content_snippet describes plot briefly
6. For grammar: topic is the grammar concept name in Hindi

Output as JSON array. Output ONLY the JSON array, no markdown, no explanation."""

    text, usage = call_claude(prompt, max_tokens=4000)
    text = strip_markdown(text)
    
    try:
        nodes = json.loads(text)
        if not isinstance(nodes, list):
            nodes = [nodes]
        return nodes, usage
    except json.JSONDecodeError as e:
        # Try to extract JSON array from text
        match = re.search(r'\[.*\]', text, re.DOTALL)
        if match:
            try:
                nodes = json.loads(match.group())
                return nodes, usage
            except:
                pass
        print(f"    JSON parse failed: {str(e)[:80]}")
        print(f"    Text length: {len(text)}, last 100 chars: {text[-100:]}")
        return [], usage


def generate_enrichment(node):
    """Generate enrichment marker for a single node."""
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
COGNITIVE_LEVEL: [remember|understand|apply|analyze|evaluate|create]
MASTERY_CRITERIA: |
  [छात्र को क्या प्रदर्शित करना चाहिए - शुद्ध हिंदी देवनागरी में]
SCOPE_BOUNDARY: |
  [क्या नहीं पढ़ाना है - शुद्ध हिंदी देवनागरी में]
TEXT_WALKTHROUGH: |
  [चरण-दर-चरण शिक्षण कथा - ३-४ पैराग्राफ - शुद्ध हिंदी देवनागरी में]
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

    text, usage = call_claude(prompt, max_tokens=3000, timeout=120)
    text = strip_markdown(text)
    return text, usage


# ─── MAIN ──────────────────────────────────────────────────────────────────
print("=" * 70)
print("CISCE Hindi Generator v2 — Batched with Retry")
print(f"Model: {MODEL} | Batches: {len(SYLLABUS_BATCHES)}")
print("=" * 70)

# ─── PHASE 1: Generate nodes ───────────────────────────────────────────────
print("\n[PHASE 1] Generating nodes in batches...")

# Load existing nodes if any
existing_nodes = []
if os.path.exists(NODES_FILE):
    with open(NODES_FILE, "r", encoding="utf-8") as f:
        existing_nodes = json.load(f)
    print(f"  Existing nodes loaded: {len(existing_nodes)}")

# Track which classes we already have
existing_classes = set()
for n in existing_nodes:
    existing_classes.add(str(n.get("class_level", "")))
print(f"  Existing classes: {sorted(existing_classes)}")

all_nodes = list(existing_nodes)  # Start with existing
total_tokens = 0

# Generate missing batches
for i, batch in enumerate(SYLLABUS_BATCHES):
    class_num = str(batch["class"])
    batch_name = batch["batch"]
    
    # Skip if we already have this class AND it's not a partial class
    # For classes 1-7 we already have nodes, but classes 8-12 are missing
    if class_num in existing_classes and class_num in ["1_5", "6", "7"]:
        print(f"\n  [{i+1}/{len(SYLLABUS_BATCHES)}] Class {class_num} batch '{batch_name}': SKIP (already have)")
        continue
    
    # Count existing nodes for this class to determine starting number
    class_nodes = [n for n in all_nodes if str(n.get("class_level", "")) == class_num]
    existing_count = len(class_nodes)
    
    print(f"\n  [{i+1}/{len(SYLLABUS_BATCHES)}] Class {class_num} batch '{batch_name}': Generating (existing: {existing_count})...")
    
    try:
        nodes, usage = generate_batch_nodes(batch, existing_count)
        total_tokens += usage.get("output_tokens", 0) + usage.get("input_tokens", 0)
        
        if nodes:
            # Fix node IDs to be sequential
            for j, node in enumerate(nodes):
                expected_id = f"c{class_num}_hin_cisce_{existing_count + j + 1:03d}"
                node["node_id"] = expected_id
                node["class_level"] = class_num
                node["subject"] = "hindi"
                node["board"] = "CISCE"
            
            all_nodes.extend(nodes)
            print(f"    Generated: {len(nodes)} nodes, {usage.get('output_tokens', 0)} tokens")
        else:
            print(f"    No nodes generated (JSON parse failed)")
            
    except Exception as e:
        print(f"    FAILED: {str(e)[:100]}")

# Save all nodes
print(f"\n  Total nodes: {len(all_nodes)} (was {len(existing_nodes)})")
with open(NODES_FILE, "w", encoding="utf-8") as f:
    json.dump(all_nodes, f, ensure_ascii=False, indent=2)
print(f"  Saved: {NODES_FILE}")

# Stats by class
by_class = {}
for n in all_nodes:
    c = str(n.get("class_level", "unknown"))
    by_class[c] = by_class.get(c, 0) + 1
print(f"  By class: {json.dumps(by_class, indent=2)}")

# ─── PHASE 2: Generate enrichments for EVERY node ──────────────────────────
print(f"\n{'=' * 70}")
print("[PHASE 2] Generating enrichments for ALL nodes")
print(f"{'=' * 70}")

# Check which nodes already have enrichment
existing_enriched_ids = set()
existing_marker_files = [f for f in os.listdir(OUT_ENRICH) if f.startswith("hindi_cisce") and f.endswith(".marker")]
for mf in existing_marker_files:
    text = open(os.path.join(OUT_ENRICH, mf), "r", encoding="utf-8").read()
    for match in re.finditer(r'^--- NODE ([^-]+) ---', text, re.MULTILINE):
        existing_enriched_ids.add(match.group(1).strip())

print(f"  Already enriched: {len(existing_enriched_ids)} nodes")

# Group nodes by class for marker files
nodes_by_class = {}
for node in all_nodes:
    c = str(node.get("class_level", "unknown"))
    if c not in nodes_by_class:
        nodes_by_class[c] = []
    nodes_by_class[c].append(node)

enrich_tokens = 0
enrich_count = 0
enrich_failed = 0

for class_num in sorted(nodes_by_class.keys(), key=lambda x: str(x)):
    class_nodes = nodes_by_class[class_num]
    
    # Filter to nodes that don't have enrichment yet
    missing = [n for n in class_nodes if n["node_id"] not in existing_enriched_ids]
    
    if not missing:
        print(f"\n  Class {class_num}: {len(class_nodes)} nodes — all already enriched")
        continue
    
    print(f"\n  Class {class_num}: {len(class_nodes)} nodes, {len(missing)} need enrichment...")
    
    marker_filename = f"hindi_cisce_c{class_num}.marker"
    marker_path = os.path.join(OUT_ENRICH, marker_filename)
    
    # Append mode — don't overwrite existing enrichment
    mode = "a" if os.path.exists(marker_path) else "w"
    
    with open(marker_path, mode, encoding="utf-8") as marker_file:
        for j, node in enumerate(missing):
            nid = node["node_id"]
            print(f"    [{j+1}/{len(missing)}] {nid}...", end=" ", flush=True)
            try:
                enrichment, usage = generate_enrichment(node)
                marker_file.write(enrichment + "\n\n")
                marker_file.flush()
                enrich_tokens += usage.get("output_tokens", 0) + usage.get("input_tokens", 0)
                enrich_count += 1
                print(f"OK ({usage.get('output_tokens', 0)} tok)")
            except Exception as e:
                enrich_failed += 1
                # Write a minimal marker so the node isn't left without enrichment
                fallback = f"""--- NODE {nid} ---
TITLE: {node.get('topic', '')}
DEFINITION: |
  [सामग्री उत्पन्न करने में त्रुटि: {str(e)[:50]}]
COGNITIVE_LEVEL: understand
MASTERY_CRITERIA: |
  [छात्र इस विषय को समझे और व्याख्या कर सके]
SCOPE_BOUNDARY: |
  [कक्षा स्तर के अनुसार सीमित]
TEXT_WALKTHROUGH: |
  [शिक्षण सामग्री उपलब्ध नहीं]
DIAGNOSTIC_QUESTION:
  Q: [प्रश्न उपलब्ध नहीं]
  A: [उत्तर उपलब्ध नहीं]
  LEVEL: understand
COMMON_MISCONCEPTION: |
  Misconception 1: "[सामान्य त्रुटि]" [व्याख्या]
ON_FAILURE: |
  [उपचार रणनीति उपलब्ध नहीं]
"""
                marker_file.write(fallback + "\n\n")
                marker_file.flush()
                print(f"FAIL ({str(e)[:60]})")

print(f"\n{'=' * 70}")
print("GENERATION COMPLETE")
print(f"{'=' * 70}")
print(f"  Total nodes: {len(all_nodes)}")
print(f"  Enrichments generated: {enrich_count}")
print(f"  Enrichments failed: {enrich_failed}")
print(f"  Node tokens: {total_tokens}")
print(f"  Enrichment tokens: {enrich_tokens}")
print(f"  Total tokens: {total_tokens + enrich_tokens}")
print(f"  Nodes file: {NODES_FILE}")

# Final summary
summary = {
    "total_nodes": len(all_nodes),
    "enrichments_generated": enrich_count,
    "enrichments_failed": enrich_failed,
    "by_class": by_class,
    "tokens_used": total_tokens + enrich_tokens,
}
summary_path = os.path.join(OUT_HINDI, "generation_summary_v2.json")
with open(summary_path, "w", encoding="utf-8") as f:
    json.dump(summary, f, ensure_ascii=False, indent=2)
print(f"  Summary: {summary_path}")
