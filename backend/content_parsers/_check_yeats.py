import json
data = json.load(open(r'D:\platform\parsed_output\english_granular_nodes\c12_engelec_poet_01_subnodes.json', encoding='utf-8'))
for i, s in enumerate(data['sub_nodes']):
    content = s.get('content', '')
    for phrase in ['custom and in ceremony', 'henchman', 'Prayer for My Daughter', 'fury']:
        if phrase.lower() in content.lower():
            print('Sub-node %d (%s): contains [%s]' % (i, s['title'][:50], phrase))
            idx = content.lower().find(phrase.lower())
            snippet = content[max(0,idx-40):idx+80].replace('\n',' ')
            print('  ...%s...' % snippet)
            print()
