"""socall_fill_wave2.py -- SOCIAL-ALL content wave 2 (2026-10-07).

Fixes the 19 CISCE social nodes whose DEFINITION opens with the banned
"This node ..." filler (the +8 thinness penalty, the same DEFINITION
rubric check W1 enforced on the CBSE c6-c8 lanes).  Each rewrite keeps
every taught fact and only changes the opener to a direct,
subject-first NCERT-register sentence.
Backups: content_tools/backups/socall_wave2/<file>.
"""
import os
import shutil

ROOT = r"D:/platform/deploy/content/cisce_nodes_v2"
BACKUP = r"D:/platform/deploy/backend/content_tools/backups/socall_wave2"

REWRITES = {
    "c10_geo_icse_02_007.md": (
        "This node develops the map\u2011reading toolkit that turns an outline map of India into a quantitative and qualitative information source.",
        "Map reading is the toolkit that turns an outline map of India "
        "into a quantitative and qualitative information source."),
    "c10_geo_icse_04_008.md": (
        "This node synthesises the chapter\u2019s core ideas \u2014 major Indian soil types",
        "The chapter\u2019s core ideas come together here \u2014 major Indian soil types"),
    "c10_geo_icse_08_007.md": (
        "This node examines the persistent problems that confront Indian agriculture despite the gains from earlier developmental phases such as the Green Revolution.",
        "Indian agriculture still confronts persistent problems despite "
        "the gains from earlier developmental phases such as the Green "
        "Revolution."),
    "c10_histciv_icse_04_006.md": (
        "This node focuses on the immediate triggers and early events of the First War of Independence, 1857.",
        "The immediate triggers and early events of the First War of "
        "Independence, 1857, turned long-standing grievance into open "
        "revolt."),
    "c10_histciv_icse_04_009.md": (
        "This node examines the immediate trigger and early expansion of the First War of Independence, 1857.",
        "The immediate trigger and early expansion of the First War of "
        "Independence, 1857, carried the mutiny from a parade ground to "
        "the imperial capital."),
    "c10_histciv_icse_05_003.md": (
        "This node examines the cultural\u2011intellectual and organisational precursors that transformed diffuse discontent into a coherent nationalist consciousness.",
        "A shared press, a shared literature and shared organisations "
        "were the cultural-intellectual and organisational precursors "
        "that transformed diffuse discontent into a coherent nationalist "
        "consciousness."),
    "c10_histciv_icse_08_003.md": (
        "This node examines the pivotal phase between Subhas Chandra Bose\u2019s dramatic escape from British India in January 1941 and the formal establishment of the Indian National Army (INA) under his command in 1943.",
        "The pivotal phase between Subhas Chandra Bose\u2019s dramatic escape "
        "from British India in January 1941 and the formal establishment "
        "of the Indian National Army (INA) under his command in 1943 "
        "carried the freedom struggle onto an international stage."),
    "c10_histciv_icse_10_004.md": (
        "This node examines the military course of the First World War from the outbreak in August 1914 to the end of 1917, focusing on the major battles that defined the stalemate on the Western Front and the more fluid campaigns on the Eastern Front.",
        "The military course of the First World War from the outbreak in "
        "August 1914 to the end of 1917 turned on the major battles that "
        "defined the stalemate on the Western Front and the more fluid "
        "campaigns on the Eastern Front."),
    "c10_histciv_icse_10_010.md": (
        "This node consolidates the entire Chapter 10 \u2014 The Contemporary World: The First World War \u2014 into a coherent framework that links long-term causes",
        "The First World War (The Contemporary World, Chapter 10) comes "
        "together in one causal chain that links long-term causes"),
    "c10_histciv_icse_11_008.md": (
        "This node examines the comparative structures of the two major European dictatorships of the inter\u2011war period: Fascist Italy (1922\u20111943) and Nazi Germany (1933\u20111945).",
        "Fascist Italy (1922\u20111943) and Nazi Germany (1933\u20111945), the two "
        "major European dictatorships of the inter\u2011war period, are best "
        "understood through their comparative structures."),
    "c10_histciv_icse_13_010.md": (
        "This node synthesises the six core UN components \u2014 General Assembly (GA), Security Council (SC), International Court of Justice (ICJ), UNICEF, WHO and UNESCO \u2014 into a coherent framework for CISCE examination.",
        "The six core UN components \u2014 General Assembly (GA), Security "
        "Council (SC), International Court of Justice (ICJ), UNICEF, WHO "
        "and UNESCO \u2014 form a coherent framework: the GA as the universal "
        "deliberative body and the SC as the executive core, with the "
        "specialised agencies carrying the UN\u2019s work into daily life."),
    "c6_geo_icse_04_008.md": (
        "This node carries two shelves of the chapter: the leading non-metallic mineral and the three mineral fuels.",
        "Two shelves complete this chapter: the leading non-metallic "
        "mineral, mica, and the three mineral fuels \u2014 coal, petroleum and "
        "natural gas."),
    "c6_histciv_icse_03_008.md": (
        "This node is the **synthesis and examination node** of the chapter \u201cMahavira and Buddha: Great Preachers\u201d.",
        "The chapter \u201cMahavira and Buddha: Great Preachers\u201d comes "
        "together here in one synthesis: the age of questioning, the two "
        "lives, the Jain and Buddhist teachings, and the sanghas that "
        "carried them."),
    "c6_histciv_icse_05_008.md": (
        "This node synthesizes the five core concepts of the Mauryan Empire \u2014 Chandragupta Maurya\u2019s foundation",
        "Five core concepts define the Mauryan Empire \u2014 Chandragupta "
        "Maurya\u2019s foundation"),
    "c8_geo_icse_05_014.md": (
        "This node draws together the chapter's physical threads \u2014 latitude, relief and climate \u2014 into their joint product: **the natural vegetation of Asia's different parts**.",
        "Latitude, relief and climate \u2014 the chapter's physical threads \u2014 "
        "jointly produce **the natural vegetation of Asia's different "
        "parts**."),
    "c8_histciv_icse_07_007.md": (
        "This node examines how socio\u2011religious reform ideas moved from closed meetings into the public sphere through three main channels: the vernacular press, reform\u2011run educational institutions, and inter\u2011regional organizational networks.",
        "Socio\u2011religious reform ideas moved from closed meetings into "
        "the public sphere through three main channels: the vernacular "
        "press, reform\u2011run educational institutions, and "
        "inter\u2011regional organizational networks."),
    "c8_histciv_icse_09_007.md": (
        "This node completes the judiciary (node 6 covered the court system's structure \u2014 the single integrated hierarchy of the Supreme Court, the High Courts and the subordinate courts); its subject is the judiciary's **powers and independence**.",
        "Having seen the court system's structure \u2014 the single integrated "
        "hierarchy of the Supreme Court, the High Courts and the "
        "subordinate courts \u2014 the judiciary's **powers and independence** "
        "complete the picture."),
    "c9_histciv_icse_06_009.md": (
        "This node examines the **later historical trajectory of Jainism and Buddhism** from the post\u2011Mauryan period",
        "The **later historical trajectory of Jainism and Buddhism** runs "
        "from the post\u2011Mauryan period"),
    "c9_histciv_icse_11_008.md": (
        "This node consolidates the four core subtopics of Chapter 11 \u2014 Renaissance, Reformation, Industrial Revolution, and Socialism vs Capitalism \u2014 into a single analytical framework that mirrors CISCE examination expectations.",
        "The four core subtopics of Chapter 11 \u2014 Renaissance, "
        "Reformation, Industrial Revolution, and Socialism vs Capitalism "
        "\u2014 join in a single analytical chain: humanist thought encouraged "
        "questioning, questioning broke religious unity, the new science "
        "and commerce built industry, and industry split society into "
        "capital and labour."),
}


def main():
    os.makedirs(BACKUP, exist_ok=True)
    changed, missed = [], []
    for fname, (old, new) in REWRITES.items():
        path = os.path.join(ROOT, fname)
        src = open(path, encoding="utf-8").read()
        if old not in src:
            missed.append(fname)
            continue
        shutil.copy2(path, os.path.join(BACKUP, fname))
        open(path, "w", encoding="utf-8", newline="").write(
            src.replace(old, new, 1))
        changed.append(fname)
    print("patched:", len(changed))
    print("missed:", missed)


if __name__ == "__main__":
    main()
