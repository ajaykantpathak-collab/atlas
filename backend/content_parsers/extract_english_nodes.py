"""
Extract CISCE English nodes from .marker files into structured JSON.
Source: D:\cisce\eng\*.marker
Output: D:\platform\parsed_output\english_cisce_nodes.json
"""
import re
import json
from pathlib import Path

ENG_DIR = Path(r'D:\cisce\eng')
OUT_FILE = Path(r'D:\platform\parsed_output\english_cisce_nodes.json')

def parse_marker_file(filepath):
    """Parse a .marker file and extract all nodes."""
    content = filepath.read_text(encoding='utf-8', errors='replace')
    nodes = []
    
    # Split by node markers
    parts = re.split(r'^--- NODE (\S+) ---', content, flags=re.MULTILINE)
    
    for i in range(1, len(parts), 2):
        node_id = parts[i]
        body = parts[i + 1] if i + 1 < len(parts) else ''
        
        node = {'node_id': node_id, 'source_file': filepath.name}
        
        # Extract simple fields (single line)
        for field in ['NODE_ID', 'TITLE', 'CLASS', 'SUBJECT', 'UNIT', 'CHAPTER', 
                       'COGNITIVE_LEVEL', 'PREREQ', 'REASON', 'DEPTH_PREREQ', 
                       'DEPTH_REASON', 'TEXT_REFERENCE']:
            m = re.search(rf'^{field}:\s*(.+)$', body, re.MULTILINE)
            if m:
                node[field.lower()] = m.group(1).strip()
        
        # Extract multiline fields (FIELD: | followed by indented content)
        for field in ['SYLLABUS', 'MASTERY_CRITERIA', 'EXAMPLES', 'VOCABULARY',
                       'SCOPE_BOUNDARY', 'COMMON_MISCONCEPTION', 'ELI5',
                       'TEXT_WALKTHROUGH', 'DIAGNOSTIC_QUESTION', 'ON_FAILURE']:
            # Match FIELD: | then capture until next unindented line
            pattern = rf'^{field}:\s*\|\s*\n((?:[ \t].*\n?)*)'
            m = re.search(pattern, body, re.MULTILINE)
            if m:
                # Dedent the content
                raw = m.group(1)
                lines = raw.split('\n')
                # Remove common leading whitespace
                dedented = []
                for line in lines:
                    if line.strip():
                        dedented.append(line.strip())
                node[field.lower()] = '\n'.join(dedented)
        
        # Parse class as int
        if 'class' in node:
            try:
                node['class'] = int(node['class'])
            except:
                node['class'] = 0
        
        nodes.append(node)
    
    return nodes


def main():
    all_nodes = []
    
    for f in sorted(ENG_DIR.glob('c*_eng_*.marker')):
        nodes = parse_marker_file(f)
        all_nodes.extend(nodes)
        print(f'  {f.name}: {len(nodes)} nodes')
    
    # Save
    OUT_FILE.write_text(json.dumps(all_nodes, indent=2, ensure_ascii=False), encoding='utf-8')
    
    # Summary
    from collections import Counter
    by_class = Counter(n.get('class', 0) for n in all_nodes)
    print(f'\nTotal: {len(all_nodes)} nodes')
    for cls in sorted(by_class):
        print(f'  Class {cls}: {by_class[cls]} nodes')
    
    print(f'\nSaved to: {OUT_FILE}')


if __name__ == '__main__':
    main()
