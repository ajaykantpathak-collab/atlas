"""Dump enrichment nodes for c11_pol_ to console."""
import json

with open(r'D:\platform\parsed_output\enrichment.jsonl', encoding='utf-8') as f:
    for line in f:
        line = line.strip()
        if not line:
            continue
        rec = json.loads(line)
        nid = rec.get('node_id', '')
        if nid.startswith('c11_pol_'):
            title = rec.get('title', '')
            definition = rec.get('definition', '')
            print(f'=== {nid} ===')
            print(f'Title: {title}')
            print(f'Definition: {definition[:300]}')
            print()
