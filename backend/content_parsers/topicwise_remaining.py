"""
Topicwise Remaining Generator
- Builds topics at MAX_CHAPTERS=40 (merged, fewer parts)
- Checks which files already exist (both new-format and old part-format)
- Only generates MISSING files
- Uses key 0, 8 workers
"""
import asyncio
import aiohttp
import ssl
import json
import re
import time
import argparse
from pathlib import Path
from collections import defaultdict

# ─── Config ───
API_KEY = "sk-ant-co-QsK1rhxdfRWZ65OJ5cVxaAZ5ISNUY0lK"  # key 0
API_URL = "https://api.claudeopus.pro/v1/messages"
MODEL = "claude-opus-5"
MAX_TOKENS = 128000

CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE

# ─── Paths ───
ORGANIZED_DIR = Path(r"D:\platform\organized\english")
CISCE_OUTPUT_DIR = Path(r"D:\platform\parsed_output\english_c1_8_supporting_files")
CISCE_OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

CBSE_NODES_DIR = Path(r"D:\platform\cbse_data\nodes\by_subject")
CBSE_OUTPUT_DIR = Path(r"D:\platform\parsed_output\cbse_supporting_files_topicwise")
CBSE_OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

CONCURRENCY = 8
semaphore = asyncio.Semaphore(CONCURRENCY)
MAX_CHAPTERS = 40

LITERARY_SUBJECTS = {'English Literature', 'English', 'English Language', 'Hindi'}

LITERARY_TYPES = [
    'quote_bank', 'character_maps', 'theme_trackers', 'literary_devices',
    'model_answers', 'revision_sheets', 'glossary', 'worked_examples',
    'question_bank', 'drill_banks',
]
NON_LITERARY_TYPES = [
    'question_bank', 'worked_examples', 'drill_banks',
    'revision_sheets', 'glossary', 'model_answers',
]

FILE_TYPE_DESC = {
    'quote_bank': 'Curated quote bank with speaker, context, meaning, themes, exam applicability',
    'character_maps': 'Character relationships, arcs, key quotes, tragic flaws, exam angles',
    'theme_trackers': 'Theme occurrences, development, supporting quotations, cross-text connections',
    'literary_devices': 'Literary device definitions with textual examples and exam-writing guidance',
    'model_answers': 'Weak, average, and strong exam responses with rubric scores and explanations',
    'revision_sheets': 'Key concepts, formulas, summaries condensed for quick revision',
    'glossary': 'Key terms, definitions, and examples specific to this topic',
    'worked_examples': 'Model exam answers with step-by-step deconstruction',
    'question_bank': 'Exam-style Q&A per topic with marking scheme alignment',
    'drill_banks': 'Rapid-fire practice drills: definition, application, problem-solving',
}


def load_cisce_c6_8():
    texts = []
    seen = set()
    for cls in range(6, 9):
        cls_dir = ORGANIZED_DIR / f"class{cls}"
        if not cls_dir.exists():
            continue
        for f in cls_dir.rglob("*subnodes*.json"):
            if "__pycache__" in str(f):
                continue
            try:
                raw = f.read_text(encoding="utf-8")
                m = re.search(r'\{.*\}', raw, re.DOTALL)
                if not m:
                    continue
                data = json.loads(m.group())
                tn = data.get("text_name", data.get("parent_title", ""))
                if not tn:
                    continue
                key = (tn.lower().strip(), cls)
                if key in seen:
                    continue
                seen.add(key)
                texts.append({'text_name': tn, 'class': cls, 'subject': 'English'})
            except Exception:
                continue
    return texts


def load_cbse_all_subjects():
    result = defaultdict(lambda: defaultdict(list))
    for f in sorted(CBSE_NODES_DIR.glob("*.json")):
        try:
            data = json.loads(f.read_text(encoding="utf-8"))
        except Exception:
            continue
        for node in data:
            try:
                cls = int(node.get("class_level", 0))
            except (ValueError, TypeError):
                continue
            if cls < 6 or cls > 12:
                continue
            subj = node.get("subject", "unknown")
            chapter = node.get("chapter", node.get("chapter_name", ""))
            if chapter:
                result[subj][cls].append(chapter)
    for subj in result:
        for cls in result[subj]:
            result[subj][cls] = sorted(set(result[subj][cls]))
    return result


def build_cbse_topics(cbse_data):
    topics = []
    for subj in sorted(cbse_data):
        is_lit = subj in LITERARY_SUBJECTS
        for cls in sorted(cbse_data[subj]):
            chapters = cbse_data[subj][cls]
            if len(chapters) <= MAX_CHAPTERS:
                topics.append({
                    'class': cls, 'subject': subj, 'part': 0,
                    'chapters': chapters, 'source': 'cbse', 'is_literary': is_lit,
                })
            else:
                n_parts = (len(chapters) + MAX_CHAPTERS - 1) // MAX_CHAPTERS
                for i in range(n_parts):
                    s = i * MAX_CHAPTERS
                    e = s + MAX_CHAPTERS
                    topics.append({
                        'class': cls, 'subject': subj, 'part': i + 1,
                        'chapters': chapters[s:e], 'source': 'cbse', 'is_literary': is_lit,
                    })
    return topics


def build_cisce_topics(texts):
    by_class = defaultdict(list)
    for t in texts:
        by_class[t['class']].append(t['text_name'])
    topics = []
    for cls in sorted(by_class):
        chapters = sorted(set(by_class[cls]))
        topics.append({
            'class': cls, 'subject': 'English', 'part': 0,
            'chapters': chapters, 'source': 'cisce', 'is_literary': True,
        })
    return topics


def topic_id(t):
    subj_slug = t['subject'].replace(' ', '_').replace('/', '_')
    if t['part'] > 0:
        return f"c{t['class']}_{subj_slug}_p{t['part']}"
    return f"c{t['class']}_{subj_slug}"


def check_file_exists(topic, file_type, old_max_chapters=15):
    """
    Check if a file for this topic+file_type already exists.
    Checks both new format (at MAX_CHAPTERS=40) and old format (at 15).
    """
    out_dir = CBSE_OUTPUT_DIR if topic['source'] == 'cbse' else CISCE_OUTPUT_DIR
    tid = topic_id(topic)

    # Check new format
    new_file = out_dir / f"{tid}_{file_type}.md"
    if new_file.exists() and new_file.stat().st_size >= 100:
        return True

    # Check old part format — if topic has <=15 chapters, old format had no parts
    if topic['part'] == 0 and len(topic['chapters']) <= old_max_chapters:
        old_file = out_dir / f"{tid}_{file_type}.md"
        if old_file.exists() and old_file.stat().st_size >= 100:
            return True

    # If topic at size 40 was split into parts at size 15, check if all parts exist
    if topic['part'] == 0 and len(topic['chapters']) > old_max_chapters:
        # At old size 15, this topic would have been split into parts
        n_old_parts = (len(topic['chapters']) + old_max_chapters - 1) // old_max_chapters
        all_parts_exist = True
        for p in range(1, n_old_parts + 1):
            old_tid = f"c{topic['class']}_{topic['subject'].replace(' ', '_').replace('/', '_')}_p{p}"
            old_file = out_dir / f"{old_tid}_{file_type}.md"
            if not old_file.exists() or old_file.stat().st_size < 100:
                all_parts_exist = False
                break
        if all_parts_exist:
            return True

    # If topic is a part at size 40, check if it existed as a part at size 15
    # (the part number might be different but chapters overlap)
    if topic['part'] > 0:
        # This part at size 40 covers chapters[(part-1)*40 : part*40]
        # At size 15, these would be in parts covering the same range
        start_idx = (topic['part'] - 1) * MAX_CHAPTERS
        end_idx = start_idx + len(topic['chapters'])
        start_old_part = start_idx // old_max_chapters + 1
        end_old_part = (end_idx - 1) // old_max_chapters + 1
        all_parts_exist = True
        for p in range(start_old_part, end_old_part + 1):
            old_tid = f"c{topic['class']}_{topic['subject'].replace(' ', '_').replace('/', '_')}_p{p}"
            old_file = out_dir / f"{old_tid}_{file_type}.md"
            if not old_file.exists() or old_file.stat().st_size < 100:
                all_parts_exist = False
                break
        if all_parts_exist:
            return True

    return False


def build_system_prompt(file_type, cls, subject, board, is_literary):
    desc = FILE_TYPE_DESC[file_type]
    if is_literary:
        return f"""You are a master {subject} teacher and {board} curriculum expert.
Create {desc} for Class {cls} students preparing for {board} exams.

This is a TOPIC-LEVEL document covering MULTIPLE texts/chapters. Cover ALL listed texts.

Rules:
- Base content on expert knowledge of actual texts. Do NOT fabricate quotes.
- If unsure about a quote, paraphrase.
- Class-appropriate for Class {cls}.
- Output clean Markdown with ## and ### headings, bullet points, tables.
- No JSON. No delimited formats. Plain Markdown only.
- Follow {board} marking schemes where applicable.
- NO foreign language etymologies. NO mnemonics."""
    else:
        return f"""You are a master {subject} teacher and {board} curriculum expert.
Create {desc} for Class {cls} students preparing for {board} exams.

This is a TOPIC-LEVEL document covering MULTIPLE chapters. Cover ALL listed chapters.

Rules:
- Content must be accurate, detailed, and exam-focused.
- Show full worked solutions where applicable.
- Class-appropriate for Class {cls}.
- Output clean Markdown with ## and ### headings, bullet points, tables.
- No JSON. No delimited formats. Plain Markdown only.
- Follow {board} marking schemes where applicable.
- NO mnemonics."""


def build_prompt(file_type, topic):
    cls = topic['class']
    subject = topic['subject']
    chapters = topic['chapters']
    board = 'CBSE' if topic['source'] == 'cbse' else 'ICSE'
    is_lit = topic['is_literary']

    chapter_list = '\n'.join(f"  - {c}" for c in chapters)
    header = f"{subject} (Class {cls}, {board})\n\nChapters covered:\n{chapter_list}"

    if is_lit:
        prompts = {
            'quote_bank': f"""Create a QUOTE BANK for:\n{header}\n\nFor EACH text, select 5-10 key quotes with: exact quote, speaker, context, literal meaning, what it reveals, themes, exam use.\nUse ## per text, ### per quote. Cover ALL texts. Raw Markdown only.""",
            'character_maps': f"""Create CHARACTER MAPS for:\n{header}\n\nFor EACH text: major characters with role, relationships, arc, key quotes, exam angle.\nUse ## per text, ### per character. Cover ALL texts. Raw Markdown only.""",
            'theme_trackers': f"""Create THEME TRACKERS for:\n{header}\n\nFor EACH text: themes with where they appear, development, key quotes, cross-text connections.\nUse ## per text, ### per theme. Cover ALL texts. Raw Markdown only.""",
            'literary_devices': f"""Create a LITERARY DEVICE LIBRARY for:\n{header}\n\nFor EACH text: devices with definition, example from text, how to write about in exam.\nUse ## per text, ### per device. Cover ALL texts. Raw Markdown only.""",
            'model_answers': f"""Create MODEL ANSWERS for:\n{header}\n\nFor EACH text: 2-3 exam questions with weak answer (score+why) and strong answer (score+why).\nUse ## per text, ### per question. Cover ALL texts. Raw Markdown only.""",
            'revision_sheets': f"""Create REVISION SHEETS for:\n{header}\n\nFor EACH text: plot summary, character summaries, key themes, top 5 quotes, key devices, common exam questions.\nUse ## per text. Cover ALL texts. Raw Markdown only.""",
            'glossary': f"""Create a GLOSSARY for:\n{header}\n\nFor EACH text: literary terms, difficult vocabulary, cultural references.\nUse ## per text, then table: Term | Definition | Context. Cover ALL texts. Raw Markdown only.""",
            'worked_examples': f"""Create WORKED EXAMPLES for:\n{header}\n\nFor EACH text: 1-2 worked exam answers with Step 1 Analyze, Step 2 Plan, Step 3 Answer, Step 4 Deconstruct.\nUse ## per text, ### per example. Cover ALL texts. Raw Markdown only.""",
            'question_bank': f"""Create a QUESTION BANK for:\n{header}\n\nFor EACH text: 5-8 exam questions with marks, bloom level, question, model answer, marking scheme.\nUse ## per text, ### per question. Cover ALL texts. Raw Markdown only.""",
            'drill_banks': f"""Create DRILL BANKS for:\n{header}\n\nFor EACH text: 10 definition drills, 5 example ID drills, 5 application drills.\nUse ## per text, ### per drill type. Cover ALL texts. Raw Markdown only.""",
        }
    else:
        prompts = {
            'question_bank': f"""Create a QUESTION BANK for:\n{header}\n\nFor EACH chapter: 8-12 exam-style questions with marks, bloom level (Recall/Understanding/Application/Analysis), full question, model answer, marking scheme.\nUse ## per chapter, ### per question. Cover ALL chapters. Raw Markdown only.""",
            'worked_examples': f"""Create WORKED EXAMPLES for:\n{header}\n\nFor EACH chapter: 3-5 worked solutions with Step 1 Analyze, Step 2 Plan/Setup, Step 3 Solve, Step 4 Verify/Deconstruct.\nShow full calculations. Use ## per chapter, ### per example. Cover ALL chapters. Raw Markdown only.""",
            'drill_banks': f"""Create DRILL BANKS for:\n{header}\n\nFor EACH chapter: 10 definition/concept drills, 10 calculation/application drills, 5 conceptual reasoning drills.\nUse ## per chapter, ### per drill type. Cover ALL chapters. Raw Markdown only.""",
            'revision_sheets': f"""Create REVISION SHEETS for:\n{header}\n\nFor EACH chapter: key concepts, formulas, definitions, important results, common exam questions, quick tips.\nUse ## per chapter. Cover ALL chapters. Raw Markdown only.""",
            'glossary': f"""Create a GLOSSARY for:\n{header}\n\nFor EACH chapter: key terms, definitions, formulas, notation, with examples.\nUse ## per chapter, then table: Term | Definition | Example. Cover ALL chapters. Raw Markdown only.""",
            'model_answers': f"""Create MODEL ANSWERS for:\n{header}\n\nFor EACH chapter: 3-5 exam questions with weak answer (score+why) and strong answer (score+why).\nUse ## per chapter, ### per question. Cover ALL chapters. Raw Markdown only.""",
        }
    return prompts.get(file_type, prompts['question_bank'])


async def call_claude(session, prompt, system_prompt):
    for attempt in range(3):
        try:
            payload = {
                "model": MODEL, "max_tokens": MAX_TOKENS,
                "system": system_prompt,
                "messages": [{"role": "user", "content": prompt}],
            }
            headers = {
                "x-api-key": API_KEY,
                "Content-Type": "application/json",
                "anthropic-version": "2023-06-01",
            }
            async with session.post(API_URL, json=payload, headers=headers, ssl=CTX,
                                     timeout=aiohttp.ClientTimeout(total=900)) as resp:
                if resp.status == 200:
                    data = await resp.json()
                    text = ""
                    for block in data.get("content", []):
                        if block["type"] == "text":
                            text = block["text"]
                            break
                    if text and len(text) > 200:
                        return text
                    print(f"      empty, retry {attempt+1}")
                    await asyncio.sleep(10 * (attempt + 1))
                elif resp.status == 429:
                    print(f"      429, waiting 300s")
                    await asyncio.sleep(300)
                else:
                    try:
                        data = await resp.json()
                    except:
                        data = {}
                    err_text = ""
                    for block in data.get("content", []):
                        if block.get("type") == "text":
                            err_text = block["text"]
                            break
                    if "token limit" in err_text.lower() or "rate limit" in err_text.lower():
                        print(f"      token/rate limit, waiting 60s")
                        await asyncio.sleep(60)
                    else:
                        print(f"      error {resp.status}: {str(data)[:200]}")
                        await asyncio.sleep(15 * (attempt + 1))
        except Exception as e:
            print(f"      retry {attempt+1}: {str(e)[:150]}")
            await asyncio.sleep(15 * (attempt + 1))
    return None


async def process_task(session, task):
    async with semaphore:
        tid = task['topic_id']
        ft = task['file_type']
        topic = task['topic']
        out_dir = CBSE_OUTPUT_DIR if topic['source'] == 'cbse' else CISCE_OUTPUT_DIR
        out_file = out_dir / f"{tid}_{ft}.md"

        if out_file.exists() and out_file.stat().st_size >= 100:
            print(f"  [{tid}_{ft}] SKIP")
            return True

        board = 'CBSE' if topic['source'] == 'cbse' else 'ICSE'
        sys_prompt = build_system_prompt(ft, topic['class'], topic['subject'], board, topic['is_literary'])
        prompt = build_prompt(ft, topic)

        print(f"  [{tid}_{ft}] Calling Claude... ({len(topic['chapters'])} chapters)")
        start = time.time()
        response = await call_claude(session, prompt, sys_prompt)
        elapsed = time.time() - start

        if not response:
            print(f"  [{tid}_{ft}] FAILED")
            return False
        if "Token limit" in response[:200] or "rate limit" in response[:200]:
            print(f"  [{tid}_{ft}] FAILED — API limit")
            return False

        out_file.write_text(response, encoding="utf-8")
        size_kb = out_file.stat().st_size / 1024
        print(f"  [{tid}_{ft}] DONE in {elapsed:.1f}s — {size_kb:.1f}KB")
        return True


async def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--dry-run', action='store_true')
    parser.add_argument('--class-num', type=int, default=None)
    parser.add_argument('--source', choices=['cisce', 'cbse', 'both'], default='both')
    parser.add_argument('--subject', default=None)
    parser.add_argument('--exclude-hindi', action='store_true')
    args = parser.parse_args()

    print("\n" + "=" * 70)
    print("Topicwise Remaining Generator (MAX_CHAPTERS=40, only missing files)")
    print("=" * 70)
    print(f"  Key 0, {CONCURRENCY} workers, max {MAX_CHAPTERS} chapters/topic")

    all_topics = []

    if args.source in ('cisce', 'both'):
        print("\nLoading CISCE English C6-8...")
        cisce_texts = load_cisce_c6_8()
        cisce_topics = build_cisce_topics(cisce_texts)
        print(f"  {len(cisce_topics)} topics")
        all_topics.extend(cisce_topics)

    if args.source in ('cbse', 'both'):
        print("\nLoading CBSE ALL subjects C6-12...")
        cbse_data = load_cbse_all_subjects()
        cbse_topics = build_cbse_topics(cbse_data)
        print(f"  {len(cbse_topics)} topics")
        all_topics.extend(cbse_topics)

    if args.class_num:
        all_topics = [t for t in all_topics if t['class'] == args.class_num]
    if args.subject:
        all_topics = [t for t in all_topics if args.subject.lower() in t['subject'].lower()]
    if args.exclude_hindi:
        all_topics = [t for t in all_topics if 'hindi' not in t['subject'].lower()]

    # Build tasks, checking both new and old format for existing files
    tasks = []
    skipped = 0
    for topic in all_topics:
        tid = topic_id(topic)
        ftypes = LITERARY_TYPES if topic['is_literary'] else NON_LITERARY_TYPES
        for ft in ftypes:
            if check_file_exists(topic, ft):
                skipped += 1
            else:
                tasks.append({'topic_id': tid, 'file_type': ft, 'topic': topic})

    lit_count = sum(1 for t in all_topics if t['is_literary'])
    nonlit_count = len(all_topics) - lit_count
    print(f"\n  Topics: {len(all_topics)} ({lit_count} literary, {nonlit_count} non-literary)")
    print(f"  Already done (skipped): {skipped}")
    print(f"  To generate: {len(tasks)}")

    if args.dry_run:
        print("\n  [dry-run] Topics to generate:")
        for t in tasks:
            tag = 'LIT' if t['topic']['is_literary'] else 'NON'
            print(f"    [{tag}] {t['topic_id']}_{t['file_type']} — {t['topic']['subject']} C{t['topic']['class']} ({len(t['topic']['chapters'])} ch)")
        return

    if not tasks:
        print("\n  Nothing to generate!")
        return

    # Check key 0 availability
    print("\n  Checking key 0 availability...")
    import urllib.request
    test_body = json.dumps({"model": MODEL, "max_tokens": 50, "messages": [{"role": "user", "content": "hi"}]}).encode("utf-8")
    test_req = urllib.request.Request(API_URL, data=test_body, method="POST")
    test_req.add_header("x-api-key", API_KEY)
    test_req.add_header("Content-Type", "application/json")
    test_req.add_header("anthropic-version", "2023-06-01")
    try:
        with urllib.request.urlopen(test_req, timeout=30, context=CTX) as resp:
            test_data = json.loads(resp.read().decode("utf-8"))
            test_text = ""
            for block in test_data.get("content", []):
                if block["type"] == "text":
                    test_text = block["text"]
                    break
            if "token limit" in test_text.lower() or "rate limit" in test_text.lower():
                reset_match = re.search(r'reset in (\d+) minutes?', test_text.lower())
                wait_min = int(reset_match.group(1)) if reset_match else 60
                print(f"  Key 0 rate limited, waiting {wait_min} minutes...")
                for remaining in range(wait_min * 60, 0, -30):
                    print(f"    {remaining}s remaining...")
                    await asyncio.sleep(30)
                print("  Starting now.\n")
            else:
                print("  Key 0 is live!\n")
    except Exception as e:
        print(f"  Key 0 check error: {str(e)[:150]}")
        print("  Waiting 30 minutes to be safe...")
        for remaining in range(1800, 0, -30):
            print(f"    {remaining}s remaining...")
            await asyncio.sleep(30)

    print(f"  Starting {CONCURRENCY} workers...\n")
    connector = aiohttp.TCPConnector(limit=CONCURRENCY)
    async with aiohttp.ClientSession(connector=connector) as session:
        results = await asyncio.gather(*[process_task(session, t) for t in tasks])

    ok = sum(1 for r in results if r)
    fail = sum(1 for r in results if not r)
    print(f"\n{'='*70}\n  DONE — {ok} ok, {fail} failed / {len(tasks)}\n{'='*70}")


if __name__ == "__main__":
    asyncio.run(main())
