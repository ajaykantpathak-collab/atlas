import json

data = json.load(open(r'D:\platform\parsed_output\topic_node_mappings.json', encoding='utf-8'))
print('Type:', type(data).__name__)
if isinstance(data, dict):
    print('Keys:', list(data.keys())[:20])
    for k in list(data.keys())[:3]:
        v = data[k]
        t = type(v).__name__
        ln = len(v) if hasattr(v, '__len__') else 'n/a'
        print('  %s: type=%s, len=%s' % (k, t, ln))
elif isinstance(data, list):
    print('Length:', len(data))
    if data:
        item = data[0]
        if isinstance(item, dict):
            print('First item keys:', list(item.keys()))
            print('Sample:', json.dumps(item, ensure_ascii=False)[:500])
