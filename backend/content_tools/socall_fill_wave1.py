"""socall_fill_wave1.py -- SOCIAL-ALL content wave 1 (2026-10-07).

Fills the severe-thin c11/c12 history nodes the way W1-W6 did: hand-
authored NCERT-register text, grounded ONLY in each node's own taught
material (its DEFINITION / DIAGNOSTIC answers / MASTERY_CRITERIA / SCOPE
sections), digest-guarded (no new facts, no slop, no raw LaTeX, no node
ids in display strings beyond the corpus's own prereq references which
W1 preserved).

Wave 1a: walkthroughs under 120 words gain a "Build the steps." middle
block (>=70 words) inserted before the existing "Worked check:" line,
lifting every touched node to the >=160-word walkthrough band.
Backups: content_tools/backups/socall_wave1/<file>.
"""
import os
import shutil

ROOT = r"D:/platform/deploy/content/enhanced_nodes_md"
BACKUP = r"D:/platform/deploy/backend/content_tools/backups/socall_wave1"

#: file -> paragraph inserted before "Worked check:" in WALKTHROUGH
INSERTS = {
    # walk 97 -> Fukuzawa Yukichi (Meiji intellectual)
    "c11_hist_cbse_09_003.md":
        "Build the steps. Step 1 - the shock that became a syllabus: the "
        "1860 voyage to America gave Fukuzawa first-hand material for "
        "Conditions in the West, and he wrote it in spoken Japanese "
        "rather than the classical Chinese of the scholars, so ordinary "
        "readers could absorb the West without a translator's learning. "
        "Step 2 - the principle beneath the gadgets: civilisation meant "
        "the spirit behind the institutions - rationalism, equality, "
        "individual rights ('Heaven did not create men above men') - "
        "which is why copying railways without that spirit would build "
        "nothing that lasts. Step 3 - the audience: through Keio and his "
        "textbooks he trained exactly the merchants, officials and "
        "teachers the rich-country-strong-army state would need. "
        "Step 4 - the tension to carry into the exam: Japan was to learn "
        "from the West in order to remain independent of it.",

    # walk 99 -> Santhal Rebellion
    "c12_hist_cbse_09_005.md":
        "Build the steps. Step 1 - the invitation: Damin-i-Koh was "
        "demarcated in 1832 on a written condition, at least one-tenth "
        "of the land cleared and cultivated within the first ten years, "
        "so the Santhals came as settlers under contract, not as "
        "squatters. Step 2 - the squeeze: interest in the mahajan's "
        "ledger grew faster than any harvest, and the colonial court "
        "stood behind the ledger, turning debt into land-loss and begari "
        "- which is why the moneylender, not the distant official, "
        "became the face of the Company. Step 3 - the rising: in 1855 "
        "the Santhals proclaimed the Company's rule at an end and set up "
        "their own - Sido and Kanhu governing under the god's command - "
        "the rebellion spreading through the Rajmahal hills until troops "
        "and the railway broke it. Step 4 - the admission: the "
        "regulation that carved out Santal Parganas, a district created "
        "so the community could be governed apart from the moneylenders' "
        "courts - the state legislating against the very creditor class "
        "its own economy had armed.",

    # walk 103 -> Fate of the Natives (assimilation policies)
    "c11_hist_cbse_08_005.md":
        "Build the steps. Step 1 - take the land: removals and reserves "
        "broke the economic base first, because a people moved off their "
        "hunting grounds or gardens must trade or starve on the "
        "settler's terms. Step 2 - take the children: residential and "
        "boarding schools separated them from the language-bearers of "
        "their own communities, on the open theory that the old culture "
        "dies fastest in the young. Step 3 - outlaw the core: ceremonies "
        "and languages were banned precisely because they carry a "
        "people's account of itself; a generation forbidden to speak "
        "cannot hand on what it was not allowed to know. Step 4 - "
        "recognise the logic that ties it together: each step was "
        "defended as uplift, and each step made the community easier to "
        "dispossess - which is why the Cherokee, having adopted English, "
        "farming and a written constitution, were removed all the same.",

    # walk 103 -> Language debate in the Constituent Assembly
    "c12_hist_cbse_12_008.md":
        "Build the steps. Step 1 - map the three positions: the Hindi "
        "champions wanted one tongue for one nation; Gandhi's Hindustani "
        "compromise offered Hindi and Urdu as one speech in two scripts; "
        "the southern members refused any imposed northern language "
        "outright, having no stake in a script they did not read. "
        "Step 2 - watch the middle collapse: partition's violence "
        "discredited the bilingual Hindustani ideal, because Urdu now "
        "named the other state's language. Step 3 - read the "
        "architecture the Assembly built instead: Hindi in Devanagari as "
        "official language, English continued by a transitional clause "
        "for fifteen years, the Eighth Schedule listing the major "
        "languages, and a development clause letting the official "
        "language grow rather than be imposed. Step 4 - name the choice: "
        "official language, functional and time-bound, never national "
        "language, symbolic and permanent - gradualism where passion "
        "could not be settled.",

    # walk 108 -> khud-kashta / pahi-kashta
    "c12_hist_cbse_08_004.md":
        "Build the steps. Step 1 - define by residence: the khud-kashta "
        "lives in the village he tills; the pahi-kashta tills a village "
        "he does not live in, walking or carting himself in with the "
        "seasons. Step 2 - follow the revenue logic: the resident "
        "cultivator is a fixed, countable asset - he is assessed at the "
        "standard rate and cannot outrun the ledger; the non-resident is "
        "scarcer and courted, taking land on softer terms because every "
        "state wanted waste brought under the plough. Step 3 - read the "
        "mobility: peasants moved where terms moved - drought, "
        "over-assessment or a war drove them out, and softer terms drew "
        "them in - so pahi-kashta status was often an economy in "
        "distress wearing the clothes of choice. Step 4 - close the "
        "loop to the state: Mughal records distinguish the two precisely "
        "because the difference priced land, labour and the zabita "
        "alike.",
}


def main():
    os.makedirs(BACKUP, exist_ok=True)
    changed = []
    for fname, insert in INSERTS.items():
        path = os.path.join(ROOT, fname)
        src = open(path, encoding="utf-8").read()
        if "Build the steps." in src:
            continue  # already patched
        marker = "Worked check:"
        idx = src.find(marker)
        if idx < 0:
            print("NO MARKER:", fname)
            continue
        new = src[:idx] + insert + " " + src[idx:]
        shutil.copy2(path, os.path.join(BACKUP, fname))
        with open(path, "w", encoding="utf-8", newline="") as fh:
            fh.write(new)
        changed.append(fname)
    print("patched:", len(changed), changed)


if __name__ == "__main__":
    main()
