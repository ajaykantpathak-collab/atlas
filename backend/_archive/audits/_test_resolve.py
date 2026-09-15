import urllib.request, json, urllib.parse

def resolve(topic, class_level):
    params = urllib.parse.urlencode({"topic": topic, "class_level": class_level})
    url = f"http://localhost:8000/api/sim/resolve?{params}"
    try:
        resp = urllib.request.urlopen(url, timeout=15)
        data = json.loads(resp.read().decode())
        return data
    except urllib.error.HTTPError as e:
        return {"error": e.code, "detail": e.read().decode()[:200]}

# Test: "Plants" for different class levels
print("=== PLANTS ===")
for cls in ["1", "2", "3"]:
    r = resolve("Plants", cls)
    print(f"  Class {cls}: sim_id={r.get('sim_id', 'N/A')}, path={r.get('component_path', 'N/A')}")

# Test: "Atomic Structure" for different class levels
print("\n=== ATOMIC STRUCTURE ===")
for cls in ["6-8", "9-12"]:
    r = resolve("AtomicStructure", cls)
    print(f"  Class {cls}: sim_id={r.get('sim_id', 'N/A')}, path={r.get('component_path', 'N/A')}")

# Test: "Numbers" for different class levels
print("\n=== NUMBERS ===")
for cls in ["2", "3", "4"]:
    r = resolve("Numbers", cls)
    print(f"  Class {cls}: sim_id={r.get('sim_id', 'N/A')}, path={r.get('component_path', 'N/A')}")

# Test: "Animals" for different class levels
print("\n=== ANIMALS ===")
for cls in ["1", "2"]:
    r = resolve("Animals", cls)
    print(f"  Class {cls}: sim_id={r.get('sim_id', 'N/A')}, path={r.get('component_path', 'N/A')}")

# Test: list with class_level filter
print("\n=== LIST FILTERED BY class_level=2 ===")
url = "http://localhost:8000/api/sim/list?class_level=2&page=1&page_size=5"
resp = urllib.request.urlopen(url, timeout=15)
data = json.loads(resp.read().decode())
print(f"  Total for class 2: {data['total']}")
for s in data['simulations']:
    print(f"    {s['sim_id']}: {s['title']}")

# Test: topic endpoint with class_level filter
print("\n=== TOPIC 'Plants' WITH class_level=2 ===")
url = "http://localhost:8000/api/sim/topic/Plants?class_level=2"
resp = urllib.request.urlopen(url, timeout=15)
data = json.loads(resp.read().decode())
print(f"  Found: {len(data)} sims")
for s in data:
    print(f"    {s['sim_id']}: class={s['class_level']}")
