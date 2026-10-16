"""W5 hand-authoring pass: deepen the 10 short c10 walkthroughs + 1 ELI5.

Safety model:
  - original WALKTHROUGH text is preserved by construction: the new body is
    built as (original, minus exact replacement pairs) + append
  - pre-edit backup per file; digest guard over everything except the two
    edited section bodies; write-back verification
"""

import hashlib
import os
import re
import shutil
import sys

CORPUS = r"D:\platform\deploy\content\cisce_nodes_v2"
BACKUP_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "backups", "W5_authoring")
SECTION_RE = re.compile(r"^##\s+([A-Z_0-9]+)\s*$", re.M)

# --- append texts (ICSE register, second person, exam-takeaway bearing) ----
APPENDS = {
    "c10_chem_icse_04_006.md": (
        "\n\nExam takeaway: always state BOTH the observation and the "
        "inference in that order — examiners award separately for the "
        "precipitate's colour and texture (gelatinous, curdy, chalky) and "
        "for the cation it proves. Watch the classic trap with Al³⁺ and "
        "Zn²⁺: both give white gelatinous hydroxides that dissolve in "
        "excess NaOH, so the decisive cross-check is excess ammonium "
        "hydroxide — Zn(OH)₂ dissolves to give a colourless solution while "
        "Al(OH)₃ stays insoluble. Fe²⁺ (dirty green) darkens on standing "
        "as it oxidises to Fe³⁺ (reddish brown), a detail that turns a "
        "four-mark answer into a full-credit one."
    ),
    "c10_comst_icse_03_010.md": (
        "\n\nWork the numericals with a fixed routine: write the formula, "
        "substitute with units, then state the answer in a full sentence — "
        "for example, to raise ₹12,00,000 through 8% debentures of ₹100 "
        "each issued at par, number of debentures = 12,00,000 ÷ 100 = "
        "12,000. If they are issued at a 10% discount (₹90), the same sum "
        "needs 12,00,000 ÷ 90 = 13,333.33, rounded down per the question's "
        "instruction — a one-mark trap in board papers. For theory answers, "
        "anchor every finance source to its three effects: owned funds "
        "(shares, retained earnings) dilute control but carry no fixed "
        "charge; borrowed funds (debentures, loans) keep control but add "
        "fixed interest that must be paid even in a loss year."
    ),
    "c10_econ_icse_05_003.md": (
        "\n\nFor the exam, pin the concept to India's recent numbers: CPI "
        "inflation of about 5–6% in a year of good monsoons is walking "
        "inflation — uncomfortable but livable — while the same figure in a "
        "drought year, pushed by onion and tomato prices, shows the "
        "cost-push side of the story. A typical four-mark question asks you "
        "to 'explain walking inflation with two causes and one effect': "
        "define with the 3–10% band (1 mark), give one demand-pull and one "
        "cost-push cause with an Indian example each (2 marks), and close "
        "with the effect on fixed-income groups — pensioners and savers "
        "find their real purchasing power shrinking because their nominal "
        "income does not rise with prices (1 mark). Distinguish it from "
        "creeping inflation (below 3%, harmless) and running inflation "
        "(10–20%, dangerous) — quoting the bands correctly is what separates "
        "a complete answer from a generic one."
    ),
    "c10_comst_icse_05_009.md": (
        "\n\nThe exam skill here is pairing, not listing: questions ask you "
        "to match a trend to its benefit and its challenge in one line each "
        "— green logistics cuts fuel cost but raises upfront fleet "
        "investment; quick commerce wins the customer but strains rider "
        "capacity and returns handling; IoT visibility prevents stockouts "
        "but demands data security. Quote one scheme (FAME II), one "
        "technology (RFID or blockchain e-way bills) and one metric (delivery "
        "within hours) per trend, and you have a complete five-mark answer. "
        "A common trap is writing 'technology improves logistics' without "
        "naming the technology or the problem it solves — specificity is "
        "what the marking scheme pays for."
    ),
    "c10_histciv_icse_01_010.md": (
        "\n\nThe highest-yield habit is article-anchoring: learn the "
        "numbered anchors as pairs with the theme they prove — Article 79 "
        "(Parliament's composition), Article 83 (duration of the two "
        "Houses), Article 107–108 (legislative procedure and joint "
        "sittings), Article 110 (Money Bills and the Speaker's "
        "certificate), Article 112 (the Annual Financial Statement), "
        "Article 75 (collective responsibility of the Council of Ministers). "
        "In a ten-mark answer, one exact article per paragraph plus one "
        "worked instance — the 2019 no-confidence motion, or a Money Bill "
        "the Rajya Sabha must return in fourteen days — lifts the answer "
        "from a textbook summary to an evaluated response. The standard "
        "loss of marks is the vague phrase 'according to the Constitution' "
        "where a number was expected."
    ),
    "c10_histciv_icse_05_009.md": (
        "\n\nFor the exam, hold three anchors together: the date (28 "
        "December 1885), the venue (Gokuldas Tejpal Sanskrit College, "
        "Bombay) and the first president (Womesh Chunder Bonnerjee) — CISCE "
        "questions routinely take any one of these as a one-mark identification. "
        "For the four-mark 'objectives' question, reproduce the core "
        "objectives in the delegates' own spirit: promote personal contact "
        "and friendship among workers, eradicate racial, religious and "
        "provincial prejudices, and formulate popular demands through "
        "constitutional means. Be ready for the historiographical twist: "
        "the 'safety valve' argument — that Hume designed the Congress to "
        "let moderate discontent escape a real uprising — appears in "
        "source-based questions; answer by weighing Hume's own motives "
        "against the grievances the pre-Congress associations had already "
        "documented, rather than accepting or dismissing the label outright."
    ),
    "c10_geo_icse_04_006.md": (
        "\n\nExam questions in this chapter are matching questions in "
        "disguise: the question names a slope, a rainfall figure or an "
        "erosion type, and the marks ride on choosing the single best "
        "method and justifying the mechanism. Practise the three "
        "confusable pairs until the distinction is instant — contour "
        "ploughing (ploughing along the contour lines) versus contour "
        "bunds (stone-and-earth embankments built on the contour, for "
        "steeper land); check dams (small barriers across gullies that "
        "store runoff) versus terracing (level steps cut into the whole "
        "hillside for cultivation); strip cropping (alternating erosion-"
        "resisting strips with erosion-allowing crops on gentle land) "
        "versus windbreaks (tree belts against wind erosion in arid "
        "Rajasthan and Kutch). Quoting one Indian region per method — "
        "terrace farming in the Nilgiris and the Himalayan middle slopes, "
        "windbreaks in western Rajasthan — converts a two-mark statement "
        "into a four-mark explanation."
    ),
    "c10_envsci_icse_08_007.md": (
        "\n\nThe exam framing to master is the 'why can't ordinary bins "
        "work?' chain: name the hazard (toxicity, corrosivity, pathogens, "
        "heavy metals), name the consequence of mixing (groundwater "
        "leaching from batteries, mercury vapour from broken thermometers, "
        "infection from used syringes), and name the mandated route "
        "(authorised recycler, BMW incinerator, manifest paperwork). Keep "
        "two rule names exam-ready — the E-Waste (Management) Rules, which "
        "make producers responsible for take-back through Extended Producer "
        "Responsibility, and the Biomedical Waste Management Rules, which "
        "require colour-coded segregation at the hospital itself — and one "
        "memory anchor each: the Bhopal gas tragedy (1984) for why "
        "hazardous waste is regulated, and the COVID-19 biomedical surge "
        "for why clinical routes scale. A five-mark answer = definition + "
        "two streams with hazards + two rules + one historical anchor."
    ),
}

# --- rework pairs (applied to the original body BEFORE appending) ----------
REWORKS = {
    "c10_histciv_icse_02_003.md": [
        ("Supporting this, the Constitution vests executive power in the President under Article 53 while Article 74 mandates the aid and advice doctrine.",
         "The constitutional floor is Article 53, which vests executive power in the President, and Article 74, which mandates the aid-and-advice doctrine."),
        ("Supporting this, the executive and legislative domains operate through formal presidential acts driven entirely by cabinet recommendations.",
         "In the executive and legislative domains, every formal presidential act is driven by cabinet recommendation."),
        ("Supporting this, judicial, diplomatic, and military authorities are similarly anchored in constitutional articles executed via ministerial guidance.",
         "Judicial, diplomatic and military powers follow the same pattern — anchored in articles, executed through ministerial guidance."),
        ("Supporting this, emergency provisions require strict cabinet written advice and legislative ratification, preventing unilateral executive overreach.",
         "Emergency provisions are the strictest of all, requiring written cabinet advice and later legislative ratification, which rules out unilateral overreach."),
    ],
    "c10_econ_icse_05_003.md": [
        ("Walking inflation is defined as a steady, noticeable, and manageable rate of price rise settling between 3% and 10% per annum.",
         "Walking inflation is a steady, noticeable and manageable rate of price rise settling between 3% and 10% per annum — fast enough to feel, slow enough to plan around."),
        ("Walking inflation occurs because demand-pull factors such as festive spending and government schemes collide with cost-push factors like poor monsoons and global oil shocks.",
         "It occurs because demand-pull forces — festive spending, government schemes, cheap credit — collide with cost-push forces such as poor monsoons and global oil shocks."),
        ("Walking inflation is predictable enough for businesses to plan annual budgets and for unions to negotiate dearness allowance revisions.",
         "Because the rise stays inside a predictable band, businesses can plan annual budgets and unions can negotiate dearness allowance revisions."),
        ("Walking inflation erodes the real value of money, meaning fixed pocket money buys fewer goods over time unless nominal incomes rise.",
         "Its quiet cost is the erosion of money's real value: a fixed allowance buys fewer goods each year unless nominal income rises with prices."),
        ("Walking inflation operates within the RBI flexible inflation-targeting framework where CPI inflation orbits around a 4% target with a ±2% band.",
         "In India today it lives inside the RBI's flexible inflation-targeting framework, where CPI inflation orbits a 4% target with a ±2% tolerance band."),
    ],
    "c10_envsci_icse_10_008.md": [
        ("- Sustainability functions like a relay race where individual daily choices run the first leg and community shared infrastructure runs the second.\n",
         "- Individual daily choices are the first leg of the relay; shared community infrastructure — segregation sheds, compost pits, carpool networks — is the second, and neither leg finishes the race alone.\n"),
    ],
}

APPENDS["c10_histciv_icse_02_003.md"] = (
    "\n\nFor the exam, the sentence to have ready is the 44th Amendment's "
    "settlement: since 1978 the President is bound by the Council of "
    "Ministers' advice, but retains the limited right to send a decision "
    "back once for reconsideration — after which the advice must be "
    "followed. Quoting both halves (bound, yet one reconsideration) is the "
    "difference between a two-mark and a four-mark answer on presidential "
    "discretion. The recurring trap is writing that the President 'has no "
    "power'; the precise formulation is that every power is exercised on "
    "advice, and genuine discretion survives only in the narrow impasses — "
    "hung Parliament, caretaker government, the once-only reconsideration."
)
APPENDS["c10_envsci_icse_10_008.md"] = (
    "\n\nClose every answer with the measurement, because CISCE marking "
    "schemes reward results you can point at: 'the colony's two compost "
    "pits cut landfill waste by roughly 40% in a year' or 'source "
    "segregation raised wet-waste collection from zero to 300 kg a week'. "
    "The exam structure to internalise: define sustainability in one line, "
    "give one individual action and one community enabler linked by cause "
    "and effect, cite one Indian anchor (Swachh Bharat Mission 2.0, a "
    "resident-welfare composting drive), admit one limitation — behaviour "
    "reverts without enforcement — and end with the scalable recommendation. "
    "That six-sentence skeleton fits a five-mark answer in eight minutes."
)

# ELI5 rewrite (machine-voice opener -> genuine second-person analogy)
ELI5_FILE = "c10_phy_icse_06_008.md"
ELI5_NEW = (
    "Think of popcorn. Each kernel pops at a random moment you cannot "
    "predict, yet a bowl of kernels pops at a perfectly steady, "
    "measurable rate — and that is exactly how radioactive nuclei decay. "
    "This node is the chapter's exam workshop: it shows you how the "
    "half-life idea, the decay equations and the safety ideas fit "
    "together, then walks you through the question patterns CISCE "
    "actually asks and how full-mark answers are built."
)

APPLY = "--apply" in sys.argv


def parse(text):
    ms = list(SECTION_RE.finditer(text))
    return {m.group(1): text[m.end(): ms[i + 1].start() if i + 1 < len(ms) else len(text)].strip()
            for i, m in enumerate(ms)}


def section_span(text, name):
    """(body_start, body_start, body_end) anchored so the header's own
    line ending stays outside the body span.  \\s*$ would swallow the
    newline after the header and corrupt the file."""
    m = re.search(r"^## " + name + r"[ \t]*$", text, re.M)
    if m is None:
        raise SystemExit(f"section {name} not found")
    line_end = text.find("\n", m.end())
    body_start = (line_end + 1) if line_end != -1 else len(text)
    nxt = re.search(r"^## [A-Z_0-9]+[ \t]*$", text[body_start:], re.M)
    end = body_start + (nxt.start() if nxt else len(text) - body_start)
    return body_start, body_start, end


def digest_except(text, edited_spans):
    h = hashlib.sha256()
    pos = 0
    for (a, b) in sorted(edited_spans):
        h.update(text[pos:a].encode("utf-8"))
        pos = b
    h.update(text[pos:].encode("utf-8"))
    return h.hexdigest()


os.makedirs(BACKUP_DIR, exist_ok=True)
done, skipped = 0, 0
jobs = [(fn, "WALKTHROUGH") for fn in APPENDS if APPENDS[fn] or fn in REWORKS]
jobs.append((ELI5_FILE, "ELI5"))

for fn, sec in jobs:
    path = os.path.join(CORPUS, fn)
    orig = open(path, encoding="utf-8", newline="").read()
    s, header_end, end = section_span(orig, sec)
    body = orig[header_end:end]
    trailing_ws = body[len(body.rstrip()):]  # blank lines before next section
    if sec == "ELI5":
        new_body = ELI5_NEW + trailing_ws  # machine-voice opener replaced outright
    else:
        work = body.strip("\r\n").strip()
        for old, new in REWORKS.get(fn, []):
            if old not in work:
                print(f"REWORK MISS {fn}: {old[:60]}...")
                skipped += 1
                work = None
                break
            work = work.replace(old, new)
        if work is None:
            continue
        new_body = work + APPENDS.get(fn, "") + trailing_ws
    # word count sanity for walkthroughs
    wc = len(new_body.split())
    if sec == "WALKTHROUGH" and wc < 150:
        print(f"TOO SHORT after edit: {fn} = {wc}w - aborting file")
        skipped += 1
        continue

    new_text = orig[:header_end] + new_body + orig[end:]
    if new_text == orig:
        continue
    pre = digest_except(orig, [(s, end)])
    post = digest_except(new_text, [(s, header_end + len(new_body))])
    if pre != post:
        print(f"DIGEST MISMATCH {fn} - aborting file")
        skipped += 1
        continue
    if APPLY:
        bak = os.path.join(BACKUP_DIR, fn)
        if not os.path.exists(bak):
            shutil.copy2(path, bak)
        if open(bak, "rb").read() != orig.encode("utf-8"):
            print(f"BACKUP MISMATCH {fn} - aborting batch")
            sys.exit(1)
        with open(path, "w", encoding="utf-8", newline="") as f:
            f.write(new_text)
        if open(path, "rb").read() != new_text.encode("utf-8"):
            print(f"WRITEBACK MISMATCH {fn} - restoring")
            shutil.copy2(bak, path)
            sys.exit(1)
    done += 1
    if sec == "WALKTHROUGH":
        print(f"{'APPLIED' if APPLY else 'PLAN'} {fn}: {len(body.split())}w -> {wc}w")
    else:
        print(f"{'APPLIED' if APPLY else 'PLAN'} {fn}: ELI5 rewritten ({wc}w)")

print(f"[{'APPLIED' if APPLY else 'DRY-RUN'}] files={done} skipped={skipped}")
