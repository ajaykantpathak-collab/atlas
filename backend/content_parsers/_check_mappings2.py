import json

data = json.load(open(r'D:\platform\parsed_output\topic_node_mappings.json', encoding='utf-8'))
mappings = data['mappings']
print('Total mapping files:', len(mappings))
print()

# Show what subjects/classes are covered
subjects = set()
classes = set()
for key in mappings:
    parts = key.split('_')
    if len(parts) >= 2:
        classes.add(parts[0])
        subjects.add('_'.join(parts[1:]))

print('Classes:', sorted(classes))
print('Subjects:', sorted(subjects))
print()

# Check first mapping in detail
first_key = list(mappings.keys())[0]
first_val = mappings[first_key]
print('Sample key:', first_key)
print('Sample value type:', type(first_val).__name__)
if isinstance(first_val, list):
    print('  Length:', len(first_val))
    if first_val:
        print('  First item:', json.dumps(first_val[0], ensure_ascii=False)[:400])
elif isinstance(first_val, dict):
    print('  Keys:', list(first_val.keys())[:15])
    print('  Sample:', json.dumps(first_val, ensure_ascii=False)[:400])
