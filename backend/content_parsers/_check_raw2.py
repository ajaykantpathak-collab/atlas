import json

# Check the raw header for c1_bio_board_style
with open(r"D:\platform\parsed_output\file_headers.jsonl", encoding="utf-8-sig") as f:
    for line in f:
        r = json.loads(line)
        fp = r.get("file_path", "")
        if "c1_bio_board_style" in fp:
            print(json.dumps(r, indent=2))
            break
