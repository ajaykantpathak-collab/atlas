import json
from pathlib import Path

CBSE_FIXED = Path(r'D:\platform\cbse_coverage_output_fixed')
pe_nodes = []
hpe_nodes = []
for f in CBSE_FIXED.glob('*.json'):
    try:
        data = json.loads(f.read_text(encoding='utf-8'))
        nodes = []
        if isinstance(data, dict):
            for chunk in data.get('results', []):
                if isinstance(chunk, dict):
                    nodes.extend(chunk.get('nodes', []))
        for node in nodes:
            nid = node.get('node_id', '')
            if '_pe_' in nid:
                pe_nodes.append(node)
            elif '_hpe_' in nid:
                hpe_nodes.append(node)
    except:
        pass

print(f'=== PE nodes ({len(pe_nodes)}) ===')
for n in pe_nodes[:5]:
    print(f'  ID: {n.get("node_id", "")}')
    print(f'  Topic: {n.get("topic", "")}')
    print(f'  Subject: {n.get("subject", "")}')
    print()

print(f'\n=== HPE nodes ({len(hpe_nodes)}) ===')
for n in hpe_nodes[:5]:
    print(f'  ID: {n.get("node_id", "")}')
    print(f'  Topic: {n.get("topic", "")}')
    print(f'  Subject: {n.get("subject", "")}')
    print()

# Now check the node count math
print('\n=== NODE COUNT MATH ===')
# Load all nodes by subject
from collections import defaultdict
subj_counts = defaultdict(int)
done_subjects = set()
for f in Path(r'D:\platform\cbse_data\prereqs').glob('*.md'):
    if f.stat().st_size < 500:
        continue
    parts = f.stem.split('_c')
    if len(parts) == 2:
        subj = parts[0].replace('_', ' ')
        done_subjects.add(subj)

# Load all nodes
all_nodes = []
for f in CBSE_FIXED.glob('*.json'):
    try:
        data = json.loads(f.read_text(encoding='utf-8'))
        if isinstance(data, dict):
            for chunk in data.get('results', []):
                if isinstance(chunk, dict):
                    all_nodes.extend(chunk.get('nodes', []))
    except:
        pass

# Count by done vs missing
SUBJ_CANONICAL = {
    "hin": "Hindi", "engl": "English Literature", "eng": "English",
    "geo": "geography", "phy": "physics", "math": "maths", "bio": "biology",
    "cs": "computer_science", "hist": "hist", "bt": "biotech",
    "eco": "economics", "hs": "home_science", "chem": "chemistry",
    "pol": "political_science", "soc": "sociology", "histciv": "history_civics",
    "acc": "accounts", "bs": "business_studies", "psy": "psychology",
    "sci": "science", "pe": "pe", "ai": "ai", "legal": "legal_studies",
    "amath": "applied_maths", "hpe": "health_and_physical_education",
}

done_count = 0
missing_count = 0
done_combos = set()
missing_combos = set()
for node in all_nodes:
    nid = node.get('node_id', '')
    if not nid:
        continue
    parts = nid.split('_')
    if len(parts) < 2:
        continue
    cls = parts[0]
    if cls.startswith('c0') and len(cls) == 3:
        cls = 'c' + cls[2]
    subj_abbr = parts[1]
    subject = SUBJ_CANONICAL.get(subj_abbr, subj_abbr)
    grade = cls.replace('c', '')
    key = (subject, grade)
    # Check if done
    is_done = False
    for ds in done_subjects:
        if ds == subject and (ds, grade) in [(s, g) for s, g in done_subjects if s == ds]:
            pass
    # Simpler: check if any prereq file matches
    # Actually let's just use the get_done_combos logic
    is_done = (subject, grade) in done_subjects or any(
        f.stem.startswith(f'{subject.replace(" ", "_")}_c{grade}') or
        f.stem.startswith(f'{subject.replace(" ", "_")}_c0{grade}')
        for f in Path(r'D:\platform\cbse_data\prereqs').glob('*.md')
        if f.stat().st_size >= 500
    )
    if is_done:
        done_count += 1
        done_combos.add(key)
    else:
        missing_count += 1
        missing_combos.add(key)

print(f'Total nodes: {len(all_nodes)}')
print(f'Done nodes: {done_count} ({done_count*100//len(all_nodes)}%)')
print(f'Missing nodes: {missing_count} ({missing_count*100//len(all_nodes)}%)')
print(f'Done combos: {len(done_combos)}')
print(f'Missing combos: {len(missing_combos)}')
