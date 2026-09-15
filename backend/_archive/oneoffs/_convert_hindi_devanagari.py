"""Convert Hindi files to pure Devanagari using Opus API.

- Processes files in batches of 30
- Uses 10 parallel workers
- Chunks large files on natural boundaries (JSON elements, --- separators, paragraphs)
- max_tokens=128000
- On rate limit: parses reset time, sleeps, auto-restarts
- Writes to NEW directory D:\\platform\\hindi_devanagari\\ — originals untouched
- Skips files already converted (resume support)
"""
import urllib.request, json, ssl, os, time, sys, re
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from datetime import datetime

KEY = 'sk-ant-co-gIEUzRWw_mtUpxKk668B1lzJe3XntCna'
URL = 'https://api.claudeopus.pro/v1/messages'
MODEL = 'claude-opus-5'
CTX = ssl.create_default_context()

SRC = Path(r'D:\platform\hindi')
DST = Path(r'D:\platform\hindi_devanagari')

BATCH_SIZE = 30
MAX_WORKERS = 10
MAX_TOKENS = 64000

# Chunk size in chars — leave room for prompt + output
# ~4 chars per token, 128k output tokens = ~512k chars output
# But input also counts. Claude context is 200k tokens = ~800k chars.
# Keep chunks at ~100k chars to be safe (leaves room for prompt + large output)
CHUNK_SIZE = 12000

PROMPT = """You are a Hindi language expert. Convert the following text to PURE Devanagari Hindi script.

Rules:
1. ALL English words, phrases, and sentences must be translated to proper Hindi in Devanagari script.
2. English words in parentheses like "(Autobiographical Literature)" must be replaced with their Hindi Devanagari equivalent, e.g., "(आत्मकथात्मक साहित्य)".
3. Keep existing Devanagari text as-is — do NOT change it.
4. Keep ALL structural elements intact: YAML field names (TITLE:, DEFINITION:, COGNITIVE_LEVEL:, etc.), markdown headers (##, |), JSON structure, node IDs, --- separators, JSON keys like "node_id", "topic", "content_snippet", "subject", "class_level", "board", "chapter", "difficulty", "estimated_time", "is_root", "concept_tags", "scope_constraints", "prerequisite_node_ids", "prerequisite_reasons", "forward_node_ids", "forward_reasons", "cross_subject_prereqs", "cross_subject_reasons", "source_file", "_chapter_code", "_chapter_title", "_cbse_subject".
5. Keep technical terms that have no Hindi equivalent in Devanagari transliteration (e.g., "पीएच" for pH).
6. Do NOT add any commentary, notes, or explanations. Output ONLY the converted text.
7. Preserve all formatting, indentation, and line breaks exactly.
8. For JSON: keep valid JSON structure. Convert only string VALUES that contain English, not the keys.

Convert this text to pure Devanagari:"""


# ── Rate limit state ──
_rate_limit_until = 0.0


def _parse_reset_time(text):
    """Extract reset time from rate limit message."""
    if not text:
        return 300
    text_lower = text.lower()
    hours = minutes = seconds = 0
    h_match = re.search(r'(\d+)\s*h(?:our|rs)?\b', text_lower)
    if h_match:
        hours = int(h_match.group(1))
    m_match = re.search(r'(\d+)\s*m(?:in|ins|inutes?)?\b', text_lower)
    if m_match:
        minutes = int(m_match.group(1))
    s_match = re.search(r'(\d+)\s*s(?:ec|ecs|econds?)?\b', text_lower)
    if s_match:
        seconds = int(s_match.group(1))
    total = hours * 3600 + minutes * 60 + seconds
    if total > 0:
        return total + 10
    sec_match = re.search(r'(?:try again|wait|reset).{0,20}(\d+)\s*(?:second|sec)', text_lower)
    if sec_match:
        return int(sec_match.group(1)) + 10
    return 300


def _wait_for_rate_limit():
    """Block until rate limit expires."""
    global _rate_limit_until
    now = time.time()
    if _rate_limit_until > now:
        wait = int(_rate_limit_until - now) + 5
        print(f'  [RATE LIMIT] Waiting {wait}s until reset ({datetime.fromtimestamp(_rate_limit_until).strftime("%H:%M:%S")})...', flush=True)
        time.sleep(wait)
        _rate_limit_until = 0.0


def call_opus(text, max_retries=5):
    """Send text to Opus, get Devanagari conversion back."""
    global _rate_limit_until
    full_prompt = PROMPT + "\n\n" + text
    body = json.dumps({
        'model': MODEL,
        'max_tokens': MAX_TOKENS,
        'messages': [{'role': 'user', 'content': full_prompt}],
    }).encode('utf-8')

    for attempt in range(max_retries):
        _wait_for_rate_limit()
        req = urllib.request.Request(URL, data=body, method='POST')
        req.add_header('x-api-key', KEY)
        req.add_header('Content-Type', 'application/json')
        req.add_header('anthropic-version', '2023-06-01')

        try:
            with urllib.request.urlopen(req, timeout=300, context=CTX) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                # Collect ALL text blocks (skip thinking blocks)
                result = ''
                for block in data.get('content', []):
                    if block.get('type') == 'text':
                        result += block.get('text', '')
                if result:
                    return result, None
                # If no text block but there is thinking, the model used all tokens on thinking
                # Retry with thinking disabled
                return None, 'Empty response (thinking used all tokens)'

        except urllib.error.HTTPError as e:
            err_body = e.read().decode('utf-8', errors='replace')[:500]
            if e.code == 429 or 'rate' in err_body.lower() or 'token limit' in err_body.lower():
                reset_seconds = _parse_reset_time(err_body)
                _rate_limit_until = time.time() + reset_seconds
                print(f'  [RATE LIMIT] Reset in {reset_seconds}s. Auto-restart at {datetime.fromtimestamp(_rate_limit_until).strftime("%H:%M:%S")}', flush=True)
                continue
            return None, f'HTTP {e.code}: {err_body[:200]}'

        except Exception as e:
            err_str = str(e)
            if 'rate' in err_str.lower() or 'token limit' in err_str.lower():
                reset_seconds = _parse_reset_time(err_str)
                _rate_limit_until = time.time() + reset_seconds
                print(f'  [RATE LIMIT] Reset in {reset_seconds}s.', flush=True)
                continue
            if attempt < max_retries - 1:
                time.sleep(10)
                continue
            return None, str(e)[:200]

    return None, 'Max retries exceeded'


# ── Chunking strategies ──

def chunk_json_array(content, chunk_size=CHUNK_SIZE):
    """Split a JSON array into chunks of elements that fit in chunk_size."""
    try:
        data = json.loads(content)
    except json.JSONDecodeError:
        # Not valid JSON, fall back to line chunking
        return chunk_lines(content, chunk_size)

    if not isinstance(data, list):
        # Single object, check if it fits
        if len(content) <= chunk_size:
            return [content]
        # Too big single object — chunk by keys
        return chunk_lines(content, chunk_size)

    chunks = []
    current = []
    current_size = 2  # "[]"

    for item in data:
        item_str = json.dumps(item, ensure_ascii=False, indent=2)
        item_size = len(item_str) + 2  # +2 for comma+newline

        if current_size + item_size > chunk_size and current:
            # Flush current chunk
            chunks.append('[\n' + ',\n'.join(json.dumps(x, ensure_ascii=False, indent=2) for x in current) + '\n]')
            current = []
            current_size = 2

        current.append(item)
        current_size += item_size

    if current:
        chunks.append('[\n' + ',\n'.join(json.dumps(x, ensure_ascii=False, indent=2) for x in current) + '\n]')

    return chunks


def chunk_markers(content, chunk_size=CHUNK_SIZE):
    """Split marker/enrichment files on --- NODE boundaries."""
    # Split on --- NODE boundaries
    parts = re.split(r'(?=^--- NODE )', content, flags=re.MULTILINE)
    if len(parts) <= 1:
        return chunk_lines(content, chunk_size)

    chunks = []
    current = ''
    for part in parts:
        if not part.strip():
            continue
        if len(current) + len(part) > chunk_size and current:
            chunks.append(current)
            current = part
        else:
            current += part

    if current:
        chunks.append(current)

    return chunks


def chunk_lines(content, chunk_size=CHUNK_SIZE):
    """Split content on line boundaries, never exceeding chunk_size."""
    if len(content) <= chunk_size:
        return [content]

    chunks = []
    lines = content.split('\n')
    current = ''
    for line in lines:
        if len(current) + len(line) + 1 > chunk_size and current:
            chunks.append(current)
            current = line + '\n'
        else:
            current += line + '\n'

    if current:
        chunks.append(current)

    return chunks


def chunk_file(content, filename):
    """Choose the best chunking strategy based on file type."""
    if len(content) <= CHUNK_SIZE:
        return [content]

    if filename.endswith('.json'):
        return chunk_json_array(content)

    if filename.endswith('.marker') or filename.endswith('.md'):
        # Try marker-style chunking first
        if '--- NODE ' in content:
            return chunk_markers(content)
        return chunk_lines(content)

    return chunk_lines(content)


def needs_conversion(content):
    """Check if file has enough English to warrant conversion."""
    ascii_words = 0
    for word in content.split():
        clean = word.strip('|-#*`>---:|[](){}.,;:!?="\'')
        if clean and all(c.isascii() and c.isalpha() for c in clean) and len(clean) > 2:
            ascii_words += 1
    return ascii_words >= 5


def convert_chunk(chunk, chunk_num, total_chunks):
    """Convert a single chunk. Returns (converted_text, error)."""
    result, error = call_opus(chunk)
    if error:
        return None, error
    return result, None


def convert_file(src_path, dst_path):
    """Convert a single file, chunking if needed. Returns (status, error)."""
    src_path = Path(src_path)
    dst_path = Path(dst_path)

    # Skip if already converted (resume support)
    if dst_path.exists():
        return 'skipped (already converted)', None

    try:
        with open(src_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        return 'error', f'Cannot read: {e}'

    # Skip if already pure Devanagari
    if not needs_conversion(content):
        dst_path.parent.mkdir(parents=True, exist_ok=True)
        with open(dst_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return 'skipped (already devanagari)', None

    # Chunk the file
    chunks = chunk_file(content, src_path.name)

    if len(chunks) == 1:
        # Single chunk — simple conversion
        result, error = call_opus(chunks[0])
        if error:
            return 'error', error
        dst_path.parent.mkdir(parents=True, exist_ok=True)
        with open(dst_path, 'w', encoding='utf-8') as f:
            f.write(result)
        return 'converted', None

    # Multi-chunk — convert each chunk and reassemble
    print(f'  {src_path.name}: {len(chunks)} chunks', flush=True)
    converted_parts = []

    for i, chunk in enumerate(chunks):
        print(f'    chunk {i+1}/{len(chunks)} ({len(chunk)} chars)...', flush=True)
        result, error = convert_chunk(chunk, i + 1, len(chunks))
        if error:
            return 'error', f'chunk {i+1}/{len(chunks)}: {error}'
        converted_parts.append(result)

    # Reassemble
    # For JSON arrays, we need to merge them properly
    if src_path.name.endswith('.json') and len(chunks) > 1:
        # Parse each chunk as JSON array and merge
        all_items = []
        for part in converted_parts:
            try:
                part_data = json.loads(part)
                if isinstance(part_data, list):
                    all_items.extend(part_data)
                else:
                    all_items.append(part_data)
            except json.JSONDecodeError:
                # If a chunk isn't valid JSON, just concatenate
                all_items = None
                break

        if all_items is not None:
            final = json.dumps(all_items, ensure_ascii=False, indent=2)
        else:
            # Fallback: just concatenate
            final = '\n'.join(converted_parts)
    else:
        # Non-JSON: just concatenate
        final = '\n'.join(converted_parts)

    dst_path.parent.mkdir(parents=True, exist_ok=True)
    with open(dst_path, 'w', encoding='utf-8') as f:
        f.write(final)
    return 'converted', None


def collect_files():
    """Collect all Hindi source files with their relative paths."""
    files = []
    for root, dirs, filenames in os.walk(SRC):
        for fname in filenames:
            src_path = Path(root) / fname
            rel = src_path.relative_to(SRC)
            dst_path = DST / rel
            files.append((str(src_path), str(dst_path)))
    return sorted(files)


def process_batch(batch, batch_num, total_batches):
    """Process a batch of files with parallel workers."""
    print(f'\n{"="*60}', flush=True)
    print(f'BATCH {batch_num}/{total_batches} — {len(batch)} files, {MAX_WORKERS} workers', flush=True)
    print(f'{"="*60}', flush=True)

    results = {'converted': 0, 'skipped_converted': 0, 'skipped_devanagari': 0, 'error': 0}
    errors = []

    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        future_to_file = {
            executor.submit(convert_file, src, dst): (src, dst)
            for src, dst in batch
        }

        for future in as_completed(future_to_file):
            src, dst = future_to_file[future]
            fname = Path(src).name
            try:
                status, error = future.result()
                if status == 'converted':
                    results['converted'] += 1
                    print(f'  [OK] {fname}', flush=True)
                elif status == 'skipped (already converted)':
                    results['skipped_converted'] += 1
                    print(f'  [SKIP] {fname} (already done)', flush=True)
                elif status == 'skipped (already devanagari)':
                    results['skipped_devanagari'] += 1
                    print(f'  [SKIP] {fname} (pure devanagari)', flush=True)
                elif status == 'error':
                    results['error'] += 1
                    errors.append((fname, error))
                    print(f'  [ERR] {fname}: {error}', flush=True)
            except Exception as e:
                results['error'] += 1
                errors.append((fname, str(e)))
                print(f'  [ERR] {fname}: {e}', flush=True)

    print(f'\nBatch {batch_num} summary: {results["converted"]} converted, '
          f'{results["skipped_converted"]} already done, '
          f'{results["skipped_devanagari"]} pure devanagari, '
          f'{results["error"]} errors', flush=True)

    if errors:
        print('Errors:', flush=True)
        for fname, err in errors:
            print(f'  {fname}: {err}', flush=True)

    return results


def main():
    all_files = collect_files()
    total = len(all_files)
    print(f'Hindi Devanagari Conversion Pipeline', flush=True)
    print(f'Source: {SRC}', flush=True)
    print(f'Destination: {DST}', flush=True)
    print(f'Total files: {total}', flush=True)
    print(f'Batch size: {BATCH_SIZE}', flush=True)
    print(f'Workers: {MAX_WORKERS}', flush=True)
    print(f'Max tokens: {MAX_TOKENS}', flush=True)
    print(f'Chunk size: {CHUNK_SIZE} chars', flush=True)
    print(f'Model: {MODEL}', flush=True)
    print(flush=True)

    if total == 0:
        print('No files found. Exiting.', flush=True)
        return

    batches = [all_files[i:i + BATCH_SIZE] for i in range(0, total, BATCH_SIZE)]
    total_batches = len(batches)

    start_batch = 1
    if len(sys.argv) > 1:
        try:
            start_batch = int(sys.argv[1])
            print(f'Starting from batch {start_batch}', flush=True)
        except ValueError:
            pass

    overall = {'converted': 0, 'skipped_converted': 0, 'skipped_devanagari': 0, 'error': 0}
    start_time = time.time()

    for i, batch in enumerate(batches, 1):
        if i < start_batch:
            overall['skipped_converted'] += len(batch)
            continue

        batch_start = time.time()
        results = process_batch(batch, i, total_batches)
        batch_time = time.time() - batch_start

        for k in overall:
            overall[k] += results.get(k, 0)

        elapsed = time.time() - start_time
        done = overall['converted'] + overall['skipped_converted'] + overall['skipped_devanagari']
        print(f'\nProgress: {done}/{total} files processed | '
              f'{overall["converted"]} converted | '
              f'{overall["error"]} errors | '
              f'Elapsed: {elapsed:.0f}s | '
              f'Batch time: {batch_time:.0f}s', flush=True)

    print(f'\n{"="*60}', flush=True)
    print(f'FINAL SUMMARY', flush=True)
    print(f'{"="*60}', flush=True)
    print(f'Total files:       {total}', flush=True)
    print(f'Converted:         {overall["converted"]}', flush=True)
    print(f'Already done:      {overall["skipped_converted"]}', flush=True)
    print(f'Pure Devanagari:   {overall["skipped_devanagari"]}', flush=True)
    print(f'Errors:            {overall["error"]}', flush=True)
    print(f'Total time:        {time.time() - start_time:.0f}s', flush=True)
    print(f'Output directory:  {DST}', flush=True)


if __name__ == '__main__':
    main()
