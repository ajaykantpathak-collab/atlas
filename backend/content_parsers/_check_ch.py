import requests, json
r = requests.get('http://localhost:6333/collections').json()
for c in r['result']['collections']:
    name = c['name']
    info = requests.get(f'http://localhost:6333/collections/{name}').json()
    count = info['result']['points_count']
    print(f'{name}: {count} points')
