"""Class 12 Physics coverage check — compare NCERT book chapters vs our CISCE nodes."""
from neo4j import GraphDatabase
from pathlib import Path

driver = GraphDatabase.driver("bolt://localhost:7687", auth=("neo4j", "dream_neo4j_2024"))

# 1. NCERT book chapters (already in text cache, just need titles)
TEXT_CACHE = Path(r"D:\node_generator\ncert-mcp\data\processed\text_cache")
book_chapters = []
for f in sorted(TEXT_CACHE.glob("leph*.txt")):
    lines = f.read_text(encoding="utf-8", errors="replace").split("\n")
    title = ""
    for line in lines[:30]:
        line = line.strip()
        if len(line) > 5 and "Reprint" not in line and "CHAPTER" not in line and line != "Physics":
            title = line
            break
    book_chapters.append({"file": f.stem, "title": title[:60], "size": f.stat().st_size})

print("=== NCERT CLASS 12 PHYSICS BOOK CHAPTERS ===")
for ch in book_chapters:
    print(f"  {ch['file']}: {ch['title']} ({ch['size']//1024}KB)")
print(f"\nTotal: {len(book_chapters)} chapters")

# 2. Our CISCE class 12 physics nodes
print("\n=== OUR CISCE CLASS 12 PHYSICS NODES ===")
with driver.session() as session:
    result = session.run(
        "MATCH (n:KnowledgeNode) WHERE n.class_level = 12 AND n.subject = 'physics' "
        "RETURN n.node_id as nid, n.topic as topic ORDER BY nid"
    )
    our_nodes = [(r["nid"], r["topic"]) for r in result]

print(f"Total nodes: {len(our_nodes)}")
for nid, topic in our_nodes:
    print(f"  {nid}: {topic[:70]}")

# 3. Manual mapping — which book chapter covers which nodes
# NCERT chapters:
# leph101: Electric Charges and Fields
# leph102: Electrostatic Potential and Capacitance
# leph103: Current Electricity
# leph104: Moving Charges and Magnetism
# leph105: Magnetism and Matter
# leph106: Electromagnetic Induction
# leph107: Alternating Current
# leph108: Electromagnetic Waves
# leph201: Ray Optics and Optical Instruments
# leph202: Wave Optics
# leph203: Dual Nature of Radiation and Matter
# leph204: Atoms
# leph205: Nuclei
# leph206: Semiconductor Electronics

print("\n=== COVERAGE ANALYSIS ===")
print("Book chapters → our nodes that match:")

# Keyword matching
chapter_keywords = {
    "leph101": ["charge", "field", "electric", "coulomb", "gauss", "dipole"],
    "leph102": ["potential", "capacit", "capacitor", "dielectric", "energy stored"],
    "leph103": ["current", "resistance", "ohm", "kirchhoff", "wheatstone", "emf"],
    "leph104": ["magnetic", "moving charge", "biot", "savit", "ampere", "force"],
    "leph105": ["magnetism", "matter", "bar magnet", "earth magnet", "magnetic field"],
    "leph106": ["induction", "faraday", "lenz", "flux", "emf", "mutual", "self"],
    "leph107": ["alternating", "ac", "transformer", "rms", "resonance", "lcr"],
    "leph108": ["electromagnetic wave", "em wave", "maxwell", "displacement current"],
    "leph201": ["ray optic", "lens", "mirror", "refraction", "prism", "telescope", "microscope"],
    "leph202": ["wave optic", "interference", "diffraction", "polarization", "huygens", "young"],
    "leph203": ["dual nature", "photoelectric", "de broglie", "matter wave", "photon"],
    "leph204": ["atom", "bohr", "rutherford", "hydrogen spectrum", "energy level"],
    "leph205": ["nuclei", "nuclear", "radioactiv", "fission", "fusion", "mass defect", "binding"],
    "leph206": ["semiconductor", "diode", "transistor", "logic gate", "p-n", "doping"],
}

for ch_file, keywords in chapter_keywords.items():
    ch_title = next((c["title"] for c in book_chapters if c["file"] == ch_file), "?")
    matching_nodes = []
    for nid, topic in our_nodes:
        topic_lower = topic.lower()
        if any(kw in topic_lower for kw in keywords):
            matching_nodes.append((nid, topic))

    status = "COVERED" if matching_nodes else "*** MISSING ***"
    print(f"\n  {ch_file} ({ch_title}): {status}")
    for nid, topic in matching_nodes:
        print(f"    → {nid}: {topic[:60]}")

# 4. Our nodes that don't match any book chapter
print("\n=== OUR NODES NOT IN NCERT BOOK (CISCE-only) ===")
all_matched = set()
for keywords in chapter_keywords.values():
    for nid, topic in our_nodes:
        if any(kw in topic.lower() for kw in keywords):
            all_matched.add(nid)

unmatched = [(nid, topic) for nid, topic in our_nodes if nid not in all_matched]
for nid, topic in unmatched:
    print(f"  {nid}: {topic[:70]}")
print(f"\nTotal CISCE-only: {len(unmatched)}")

driver.close()
