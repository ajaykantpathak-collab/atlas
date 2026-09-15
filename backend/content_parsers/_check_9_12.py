import json
from pathlib import Path

nodes = json.load(open(r'D:\platform\parsed_output\english_cisce_nodes.json', encoding='utf-8'))
granular_dir = Path(r'D:\platform\parsed_output\english_granular_nodes')

LITERATURE_KEYWORDS = [
    'act', 'macbeth', 'julius', 'caesar', 'poem', 'poetry', 'sonnet', 
    'story', 'prose', 'rhapsody', 'prism', 'treasure', 'conversation',
    'tithonus', 'beethoven', 'small towns', 'death be', 'atithi',
    'cookie', 'soft rains', 'indigo', 'medicine bag', 'lesson',
    'pedestrian', 'girl who', 'great trees', 'considerable', 'photographer',
    'elevator', 'haunted', 'glove', 'power of music', 'tagore', 'tennyson',
    'donne', 'soyinka', 'bradbury', 'dick', 'ray', 'sneve', 'aidoo',
    'frost', 'leacock', 'sleator', 'longfellow', 'hunt', 'daudet',
    'angelou', 'hughes', 'liu', 'twain', 'hearn', 'owen', 'heaney',
    'shakespeare', 'stevenson', 'burnett', 'dickens', 'frank', 'koyczan',
    'mamang', 'dai', 'hoagland', 'abhisara', 'tryst', 'naturalist',
    'strange meeting', 'living god', 'advice to youth', 'paper menagerie',
    'grammatizator', 'thank you ma', 'oliver', 'night mail', 'auden',
    'work of artifice', 'piercy', 'i remember', 'hood', 'model millionaire',
    'wilde', 'home-coming', 'bond', 'skimbleshanks', 'eliot', 'doctor',
    'vikram seth', 'hiroshima', 'critic', 'critical reading',
]
EXAM_KEYWORDS = [
    'composition', 'letter', 'notice', 'email', 'comprehension', 'grammar',
    'transform', 'phrasal', 'tense', 'connector', 'directed', 'proposal',
    'exam technique', 'past paper', 'practice', 'cfq', 'model answer',
    'model composition', 'spiral review', 'create an original',
    'writing process', 'metacognition', 'cross-curricular', 'adaptive',
    'vocabulary framework', 'differentiation', 'common errors',
    'unseen comprehension',
]

done_ids = set()
for f in granular_dir.glob('*_subnodes.json'):
    pid = f.stem.replace('_subnodes', '')
    done_ids.add(pid)

for cls in [9, 10, 11, 12]:
    lit_total = 0
    lit_done = 0
    lit_missing = []
    for n in sorted(nodes, key=lambda x: x['node_id']):
        if n.get('class') != cls:
            continue
        title = (n.get('title') or '').lower()
        is_exam = any(kw in title for kw in EXAM_KEYWORDS)
        is_lit = any(kw in title for kw in LITERATURE_KEYWORDS) or 'literature' in (n.get('subject') or '').lower()
        if is_exam:
            continue
        if is_lit:
            lit_total += 1
            nid = n['node_id']
            if nid in done_ids:
                lit_done += 1
            else:
                lit_missing.append((nid, n.get('title','')[:60]))
    
    print(f'Class {cls}: {lit_done}/{lit_total} done')
    if lit_missing:
        for nid, title in lit_missing:
            print(f'  MISSING: {nid}: {title}')
    print()
