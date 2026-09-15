"""Re-parse existing RAW.txt files that failed delimited parsing."""
import re
import json
from pathlib import Path

OUTPUT_DIR = Path(r'D:\platform\parsed_output\english_granular_nodes')

def parse_delimited(text, node_id, cls, subject, text_name, author, section=''):
    blocks = re.split(r'<<<SUBNODE>>>', text)
    sub_nodes = []
    for i, block in enumerate(blocks, 1):
        block = block.strip()
        if not block or 'TITLE:' not in block:
            continue
        block = block.replace('<<<END>>>', '').strip()
        node = {
            'node_id': f"{node_id}_{i:02d}",
            'parent_node_id': node_id,
            'title': '',
            'class': cls,
            'subject': subject,
            'text_name': text_name,
            'author': author,
            'section': section,
            'node_type': '',
            'content': '',
            'mastery_criteria': '',
            'diagnostic_questions': [],
            'common_misconceptions': [],
            'key_quotes': [],
            'themes': [],
            'prerequisites': [],
            'eli5': '',
        }
        m = re.search(r'^TITLE:\s*(.+)$', block, re.MULTILINE)
        if m: node['title'] = m.group(1).strip()
        m = re.search(r'^NODE_TYPE:\s*(.+)$', block, re.MULTILINE)
        if m: node['node_type'] = m.group(1).strip().lower().replace(' ', '_')
        m = re.search(r'^THEMES:\s*(.+)$', block, re.MULTILINE)
        if m: node['themes'] = [t.strip() for t in m.group(1).split(',') if t.strip()]
        m = re.search(r'^ELI[15]:\s*(.+)$', block, re.MULTILINE)
        if m: node['eli5'] = m.group(1).strip()
        m = re.search(r'^CONTENT:\s*\n(.*?)(?=^MASTERY_CRITERIA:|^DIAGNOSTIC_QUESTIONS:|^MISCONCEPTIONS:|^KEY_QUOTES:|^<<<|$)', block, re.MULTILINE | re.DOTALL)
        if m: node['content'] = m.group(1).strip()
        m = re.search(r'^MASTERY_CRITERIA:\s*\n(.*?)(?=^DIAGNOSTIC_QUESTIONS:|^MISCONCEPTIONS:|^KEY_QUOTES:|^<<<)', block, re.MULTILINE | re.DOTALL)
        if m: node['mastery_criteria'] = m.group(1).strip()
        m = re.search(r'^DIAGNOSTIC_QUESTIONS:\s*\n(.*?)(?=^MISCONCEPTIONS:|^KEY_QUOTES:|^<<<)', block, re.MULTILINE | re.DOTALL)
        if m:
            for qline in m.group(1).strip().split('\n'):
                qline = qline.strip()
                if qline.startswith('Q:'):
                    parts = qline.split('||')
                    q_text = parts[0].replace('Q:', '').strip() if len(parts) > 0 else ''
                    a_text = parts[1].replace('A:', '').strip() if len(parts) > 1 else ''
                    level = parts[2].replace('L:', '').strip() if len(parts) > 2 else 'recall'
                    if q_text:
                        node['diagnostic_questions'].append({'question': q_text, 'acceptable_answer': a_text, 'level': level})
        m = re.search(r'^MISCONCEPTIONS:\s*\n(.*?)(?=^KEY_QUOTES:|^<<<)', block, re.MULTILINE | re.DOTALL)
        if m:
            for mline in m.group(1).strip().split('\n'):
                mline = mline.strip()
                if mline.startswith('M:'):
                    parts = mline.split('||')
                    mis = parts[0].replace('M:', '').strip() if len(parts) > 0 else ''
                    cor = parts[1].replace('C:', '').strip() if len(parts) > 1 else ''
                    if mis:
                        node['common_misconceptions'].append({'misconception': mis, 'correction': cor})
        m = re.search(r'^KEY_QUOTES:\s*\n(.*?)(?=^<<<|$)', block, re.MULTILINE | re.DOTALL)
        if m:
            kblock = m.group(1).strip()
            if kblock.lower() != 'none':
                for kline in kblock.split('\n'):
                    kline = kline.strip()
                    if kline.startswith('QUOTE:'):
                        parts = kline.split('||')
                        quote = parts[0].replace('QUOTE:', '').strip() if len(parts) > 0 else ''
                        speaker = parts[1].replace('SPEAKER:', '').strip() if len(parts) > 1 else ''
                        context = parts[2].replace('CONTEXT:', '').strip() if len(parts) > 2 else ''
                        significance = parts[3].replace('SIGNIFICANCE:', '').strip() if len(parts) > 3 else ''
                        if quote:
                            node['key_quotes'].append({'quote': quote, 'speaker': speaker, 'context': context, 'significance': significance})
        if node['title'] and node['content']:
            sub_nodes.append(node)
    return sub_nodes

# Find all RAW files and try to re-parse
raw_files = list(OUTPUT_DIR.glob('*_RAW.txt'))
print(f'Found {len(raw_files)} RAW files to re-parse')

for raw_file in raw_files:
    node_id = raw_file.stem.replace('_RAW', '')
    text = raw_file.read_text(encoding='utf-8')
    
    # Determine subject info from node_id
    if 'engmod' in node_id:
        subject = 'Modern English'
        subject_code = 'engmod'
    elif 'engelec' in node_id:
        subject = 'Elective English'
        subject_code = 'engelec'
    else:
        subject = 'English Literature'
        subject_code = 'eng'
    
    # Extract class from node_id
    m = re.match(r'c(\d+)_', node_id)
    cls = int(m.group(1)) if m else 0
    
    sub_nodes = parse_delimited(text, node_id, cls, subject, '', '', '')
    
    if sub_nodes:
        out_file = OUTPUT_DIR / f'{node_id}_subnodes.json'
        out_file.write_text(json.dumps({
            'parent_node': node_id,
            'parent_title': '',
            'text_type': '',
            'class': cls,
            'subject': subject,
            'subject_code': subject_code,
            'sub_nodes': sub_nodes,
        }, indent=2, ensure_ascii=False), encoding='utf-8')
        print(f'  {node_id}: RECOVERED {len(sub_nodes)} sub-nodes')
        # Delete the raw file
        raw_file.unlink()
    else:
        print(f'  {node_id}: STILL FAILED to parse')
