import json
r = json.load(open('D:/dream_app/backend/database/content_verification_report.json','r',encoding='utf-8'))
for x in r:
    subj = x['subject']
    missing_cog = [n for n in x['nodes_missing_sections'] if 'COGNITIVE_LEVEL' in n['missing']]
    if missing_cog:
        print(f'=== {subj} ({len(missing_cog)} nodes) ===')
        # Group by file
        by_file = {}
        for n in missing_cog:
            by_file.setdefault(n['file'], []).append(n['node_id'])
        for f in sorted(by_file.keys()):
            print(f'  {f}: {sorted(by_file[f])}')
        print()
