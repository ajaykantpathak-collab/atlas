import json
with open(r"D:\platform\parsed_output\class4_topic_mapping.json", encoding="utf-8-sig") as f:
    data = json.load(f)

bio = data["4_bio"]
print("Bio topics:")
for t in bio["topics"]:
    tnum = t["topic_num"]
    tname = t["topic_name"]
    nnodes = len(t["nodes"])
    print(f"  {tnum}: {tname} ({nnodes} nodes)")
    for n in t["nodes"]:
        print(f"    {n}")
