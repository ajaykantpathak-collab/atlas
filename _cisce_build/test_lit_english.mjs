/**
 * test_lit_english — acceptance harness for the English literature engines.
 *
 * Covers (per wave H1 gate):
 *   (a) syllable unit cases incl. the irregular dictionary,
 *   (b) five corpus poems scanned end-to-end (Frost ×3, Blake, Whitman),
 *   (c) format-check cases: good + broken letter/article/notice + report/story,
 *   (d) honest declines (prose-as-poem, too short, untaught format),
 *   (e) no-crash probes on junk / Hindi / emoji,
 *   plus TS↔.mjs twin parity and the step-contract minimums.
 *
 * Run:  node --no-warnings test_lit_english.mjs
 * The .ts imports run on Node ≥ 23.6 (type stripping); the compiled .mjs twins
 * are tested side-by-side and asserted byte-equal in output.
 */

import { scanEnglishPoem, countSyllables } from "../deploy/frontend/lib/lit/englishMeter.ts";
import { checkWritingFormat, TAUGHT_FORMATS } from "../deploy/frontend/lib/lit/formatCheck.ts";
import { scanEnglishPoem as scanM, countSyllables as countM } from "../deploy/frontend/lib/lit/englishMeter.mjs";
import { checkWritingFormat as checkM } from "../deploy/frontend/lib/lit/formatCheck.mjs";

// ─── harness plumbing ─────────────────────────────────────────────────────────

let pass = 0;
let fail = 0;
const failures = [];

function check(name, cond, detail) {
  if (cond) {
    pass++;
  } else {
    fail++;
    failures.push(name + (detail ? " — " + detail : ""));
  }
}

function eq(name, got, want) {
  check(name, Object.is(got, want), `got ${JSON.stringify(got)}, want ${JSON.stringify(want)}`);
}

function deepEq(name, got, want) {
  const g = JSON.stringify(got);
  const w = JSON.stringify(want);
  check(name, g === w, `got ${g}, want ${w}`);
}

// ─── fixtures: corpus poems (public-domain texts of corpus-taught poems) ─────

const DUST_OF_SNOW = `The way a crow
Shook down on me
The dust of snow
From a hemlock tree

Has given my heart
A change of mood
And saved some part
Of a day I had rued.`;

const FIRE_AND_ICE = `Some say the world will end in fire,
Some say in ice.
From what I've tasted of desire
I hold with those who favor fire.

But if it had to perish twice,
I think I know enough of hate
To say that for destruction ice
Is also great
And would suffice.`;

const ROAD_NOT_TAKEN = `Two roads diverged in a yellow wood,
And sorry I could not travel both
And be one traveler, long I stood
And looked down one as far as I could
To where it bent in the undergrowth;

Then took the other, as just as fair,
And having perhaps the better claim,
Because it was grassy and wanted wear;
Though as for that the passing there
Had worn them really about the same,`;

const TYGER = `Tyger Tyger, burning bright,
In the forests of the night;
What immortal hand or eye,
Could frame thy fearful symmetry?

In what distant deeps or skies,
Burnt the fire of thine eyes?
On what wings dare he aspire?
What the hand, dare seize the fire?`;

const ANIMALS = `I think I could turn and live with animals, they are so placid and self-contained,
I stand and look at them long and long.
They do not sweat and whine about their condition,
They do not lie awake in the dark and weep for their sins,
They do not make me sick discussing their duty to God,
Not one is dissatisfied, not one is demented with the mania of owning things,
Not one kneels to another, nor to his kind that lived thousands of years ago,
Not one is respectable or unhappy over the whole earth.`;

// ─── (a) syllable units ───────────────────────────────────────────────────────

const SYL_CASES = [
  // irregular dictionary anchors from the corpus poems
  ["fire", 1], ["every", 2], ["flower", 2], ["buried", 2], ["rued", 1],
  ["hemlock", 2], ["diverged", 2], ["given", 2], ["heaven", 2], ["quiet", 2],
  ["poem", 2], ["idea", 3], ["tyger", 2], ["symmetry", 3], ["immortal", 3],
  ["favor", 2], ["desire", 2], ["destruction", 3], ["suffice", 2],
  ["perish", 2], ["distant", 2], ["fearful", 2], ["forests", 2],
  // heuristic-repair cases
  ["nation", 2], ["iconic", 3], ["period", 3], ["media", 3], ["make", 1],
  ["table", 2], ["boxes", 2], ["hated", 2], ["loved", 1], ["carried", 2],
  ["tried", 1], ["wanted", 2], ["dissatisfied", 4], ["beautiful", 3],
  // monosyllables and function words
  ["crow", 1], ["snow", 1], ["the", 1], ["of", 1], ["shook", 1], ["wood", 1],
];

for (const [w, n] of SYL_CASES) {
  eq(`syl(${w})`, countSyllables(w), n);
}
check("syl count suite ≥ 40 cases", SYL_CASES.length >= 40, String(SYL_CASES.length));

// ─── (b) corpus poems ─────────────────────────────────────────────────────────

// Dust of Snow (Frost) — corpus: First Flight; the scanner must verify itself.
{
  const r = scanEnglishPoem(DUST_OF_SNOW);
  check("dust.ok", r.ok === true && r.declined === null);
  eq("dust.verdict", r.verdict, "regular_meter");
  eq("dust.family", r.family, "iambic");
  eq("dust.metre", r.metre, "dimeter (with trimeter lines)");
  eq("dust.lines", r.lineCount, 8);
  eq("dust.stanzas", r.stanzas.length, 2);
  eq("dust.rhyme", r.rhymeScheme, "ABAB / ABCB");
  deepEq("dust.syllables", r.stanzas.flatMap((s) => s.lines.map((l) => l.syllables)), [4, 4, 4, 5, 5, 4, 4, 6]);
  check("dust.conf", r.confidence > 0.5, String(r.confidence));
  check("dust.steps≥5", r.steps.length >= 5, String(r.steps.length));
  check("dust.steps show patterns", r.steps.some((s) => s.includes("x/x/")));
}

// Fire and Ice (Frost)
{
  const r = scanEnglishPoem(FIRE_AND_ICE);
  check("fire.ok", r.ok === true);
  eq("fire.verdict", r.verdict, "regular_meter");
  eq("fire.family", r.family, "iambic");
  eq("fire.metre", r.metre, "tetrameter (with dimeter lines)");
  eq("fire.lines", r.lineCount, 9);
  deepEq("fire.syllables", r.stanzas.flatMap((s) => s.lines.map((l) => l.syllables)), [8, 4, 8, 8, 8, 8, 8, 4, 4]);
  const iambic = r.stanzas.flatMap((s) => s.lines).filter((l) => l.foot === "iambic").length;
  check("fire.≥8/9 iambic lines", iambic >= 8, String(iambic));
  check("fire.conf", r.confidence > 0.8, String(r.confidence));
}

// The Road Not Taken (Frost)
{
  const r = scanEnglishPoem(ROAD_NOT_TAKEN);
  check("road.ok", r.ok === true);
  eq("road.verdict", r.verdict, "regular_meter");
  eq("road.family", r.family, "iambic");
  eq("road.metre", r.metre, "tetrameter");
  eq("road.lines", r.lineCount, 10);
  const iambic = r.stanzas.flatMap((s) => s.lines).filter((l) => l.foot === "iambic").length;
  check("road.≥8/10 iambic lines", iambic >= 8, String(iambic));
  check("road.conf", r.confidence > 0.5, String(r.confidence));
}

// The Tyger (Blake)
{
  const r = scanEnglishPoem(TYGER);
  check("tyger.ok", r.ok === true);
  check("tyger.verdict regular|mixed", r.verdict === "regular_meter" || r.verdict === "mixed_meter", r.verdict);
  eq("tyger.family", r.family, "trochaic");
  check("tyger.metre tetrameter-led", (r.metre ?? "").startsWith("tetrameter"), r.metre ?? "null");
  eq("tyger.lines", r.lineCount, 8);
  deepEq("tyger.syllables", r.stanzas.flatMap((s) => s.lines.map((l) => l.syllables)), [7, 7, 7, 8, 7, 6, 7, 7]);
  const trochaic = r.stanzas.flatMap((s) => s.lines).filter((l) => l.foot === "trochaic").length;
  check("tyger.≥5/8 trochaic lines", trochaic >= 5, String(trochaic));
}

// Animals (Whitman) — free verse must be reported honestly, not forced
{
  const r = scanEnglishPoem(ANIMALS);
  check("animals.ok", r.ok === true && r.declined === null);
  eq("animals.verdict", r.verdict, "free_verse");
  eq("animals.lines", r.lineCount, 8);
  eq("animals.conf", r.confidence, 0);
  eq("animals.label", r.label, null);
  check("animals.notes explain", (r.notes[0] ?? "").includes("free verse"), r.notes[0] ?? "none");
}

// ─── (c) format checks ────────────────────────────────────────────────────────

const GOOD_FORMAL_LETTER = `12, Model Town Road
Dehradun, Uttarakhand

15 March 2025

The Principal
St. Xavier's School
Dehradun

Subject: Request for leave of five days

Respected Sir/Madam,

I am a student of Class X-B of your school. I have been suffering from viral fever since Monday and the doctor has advised complete rest for five days.

I therefore request you to grant me leave from 16 March to 20 March 2025. I assure you that I will cover all the lessons missed during my absence as soon as I rejoin school. I shall be grateful for your kindness.

Yours faithfully,
Ananya Sharma
Class X-B`;

const BROKEN_FORMAL_LETTER = `House 45, Green Park
New Delhi

Hey Sir,

I want leave for one week because I am going to my village for a wedding. Please do the needful.

From
Rahul`;

const GOOD_INFORMAL_LETTER = `22, Lake Road
Kolkata

10 April 2025

Dear Meera,

You will be happy to know that I stood first in the annual examinations this year. Grandfather has promised to take me to Darjeeling during the summer holidays.

Aunty told us that you visited Nainital in March. Was it as beautiful as the photographs you sent? We are all missing you at home, especially during the evening walks.

How are your preparations for the dance competition going? Do write back soon and tell me all your news. Give my regards to everyone at home.

With love,
Riya`;

const BROKEN_INFORMAL_LETTER = `Dear Sir,

I am writing to inform you about my new school. It is very nice. The teachers are good and I have made many friends here already.

Yours faithfully,
Riya`;

const GOOD_ARTICLE = `The Importance of Reading Books

By Aditi Verma

Books are our best companions. They open windows to worlds we may never visit and introduce us to minds we may never meet. A student who reads regularly develops vocabulary, imagination and empathy.

Sadly, screens have replaced pages for many young people today. Scroll culture rewards speed, while reading rewards patience and depth. Studies repeatedly show that students who read daily perform better across subjects.

Schools and parents must work together to rebuild the reading habit. A library period every week and a book review every month can turn students into lifelong readers. The future belongs to those who read.`;

const GOOD_REPORT = `Annual Sports Day Celebrated

By Kabir Mehta

New Delhi, 14 November 2024: The 42nd Annual Sports Day of Sunrise Public School was celebrated with great enthusiasm on the school grounds yesterday. The Director of Education was the chief guest.

The programme began with the march-past, followed by track events, kho-kho and the relay race. The blue house won the championship trophy. Prizes were distributed by the chief guest, who praised the students' discipline.

The Principal proposed the vote of thanks and announced that the sports scholarship would continue next year.`;

const GOOD_NOTICE = `SUNRISE PUBLIC SCHOOL, DELHI

NOTICE

14 March 2025

Inter-House Debate Competition

An inter-house debate will be held in the school auditorium on 20 March 2025 at 10 a.m. Interested students may give their names to their house captains by 17 March.

Aditi Rao
Cultural Secretary`;

const BROKEN_NOTICE = `Green Valley School

15 July 2025

Debate Competition

There will be a debate competition soon. All interested students should come.

Aditi Rao`;

const GOOD_STORY = `The Missing Tiffin Box

It was a bright Monday morning when Aryan discovered that his brand-new tiffin box had vanished from his school bag. He had packed it himself just an hour earlier, and now the bag held only crumpled paper.

During recess, Aryan noticed a familiar shine under the bench near the window. Someone had pushed his tiffin box there, and inside it sat a tiny sparrow, chirping hungrily.

Aryan remembered the nest that had fallen in the courtyard during the storm. Carefully, he carried the box downstairs and placed the sparrow beside it, where its mother was waiting.

That evening, his mother found a note in his bag: the best lunch box in the world now belonged to a bird. He smiled all the way to dinner.`;

// good formal letter
{
  const r = checkWritingFormat(GOOD_FORMAL_LETTER, "formal_letter");
  check("formal.ok", r.ok === true, "missing: " + r.missingRequired.join("; "));
  eq("formal.format", r.format, "formal_letter");
  eq("formal.missing", r.missingRequired.length, 0);
  check("formal.wordband", r.wordCount >= 100 && r.wordCount <= 150, String(r.wordCount));
  check("formal.sender.line1", r.beats[0].line === 1 && r.beats[0].evidence.includes("Model Town"));
  check("formal.subject.found", r.beats.some((b) => b.name === "Subject line" && b.status === "present" && (b.evidence ?? "").toLowerCase().includes("leave")));
  check("formal.salutation.found", r.beats.some((b) => b.name === "Formal salutation" && (b.evidence ?? "").toLowerCase().includes("respected")));
  check("formal.close.found", r.beats.some((b) => b.name === "Complimentary close" && (b.evidence ?? "").toLowerCase().startsWith("yours faithfully")));
  check("formal.steps≥beats+3", r.steps.length >= r.beats.length + 3, `${r.steps.length} vs ${r.beats.length}`);
}

// broken formal letter
{
  const r = checkWritingFormat(BROKEN_FORMAL_LETTER, "formal-letter");
  check("formalBroken.ok=false", r.ok === false);
  for (const m of ["Date", "Subject line", "Formal salutation", "Complimentary close", "Body paragraphs"]) {
    check(`formalBroken.missing:${m}`, r.missingRequired.includes(m), r.missingRequired.join("; "));
  }
  check("formalBroken.steps name missing beats", r.steps.some((s) => s.includes("MISSING")));
}

// good informal letter
{
  const r = checkWritingFormat(GOOD_INFORMAL_LETTER, "informal_letter");
  check("informal.ok", r.ok === true, "missing: " + r.missingRequired.join("; "));
  check("informal.close.found", r.beats.some((b) => b.name === "Informal closing" && (b.evidence ?? "").toLowerCase().includes("with love")));
  check("informal.senderAddr.optional-present", r.beats.some((b) => b.name === "Sender's address" && b.status === "present"));
  check("informal.wordband", r.wordCount >= 90 && r.wordCount <= 150, String(r.wordCount));
}

// broken informal letter (formal register inside an informal letter)
{
  const r = checkWritingFormat(BROKEN_INFORMAL_LETTER, "informal letter");
  check("informalBroken.ok=false", r.ok === false);
  check("informalBroken.missing date", r.missingRequired.includes("Date"));
  check("informalBroken.missing close", r.missingRequired.includes("Informal closing"));
}

// good article
{
  const r = checkWritingFormat(GOOD_ARTICLE, "article");
  check("article.ok", r.ok === true, "missing: " + r.missingRequired.join("; "));
  check("article.title.found", r.beats.some((b) => b.name === "Title" && b.line === 1));
  check("article.byline.found", r.beats.some((b) => b.name === "Byline" && (b.evidence ?? "").startsWith("By ")));
  eq("article.beats", r.beats.length, 5);
}

// good report
{
  const r = checkWritingFormat(GOOD_REPORT, "report");
  check("report.ok", r.ok === true, "missing: " + r.missingRequired.join("; "));
  check("report.placeDate.found", r.beats.some((b) => b.name === "Place–date line" && (b.evidence ?? "").includes("New Delhi")));
  check("report.pastLead.found", r.beats.some((b) => b.name === "Past-tense lead" && b.line === 5 && (b.evidence ?? "").includes("New Delhi")));
}

// good notice
{
  const r = checkWritingFormat(GOOD_NOTICE, "notice");
  check("notice.ok", r.ok === true, "missing: " + r.missingRequired.join("; "));
  check("notice.heading.found", r.beats.some((b) => b.name === "'NOTICE' heading" && b.status === "present"));
  check("notice.whoWhere.found", r.beats.some((b) => b.name === "What–when–where body" && b.status === "present"));
  check("notice.designation.found", r.beats.some((b) => b.name === "Writer's name + designation" && (b.evidence ?? "").includes("Cultural Secretary")));
  check("notice.wordband", r.wordCount >= 30 && r.wordCount <= 50, String(r.wordCount));
}

// broken notice
{
  const r = checkWritingFormat(BROKEN_NOTICE, "notice");
  check("noticeBroken.ok=false", r.ok === false);
  check("noticeBroken.missing heading", r.missingRequired.includes("'NOTICE' heading"));
  check("noticeBroken.missing designation", r.missingRequired.includes("Writer's name + designation"));
  check("noticeBroken.missing whatWhenWhere", r.missingRequired.includes("What–when–where body"));
}

// good story
{
  const r = checkWritingFormat(GOOD_STORY, "story");
  check("story.ok", r.ok === true, "missing: " + r.missingRequired.join("; "));
  check("story.title.found", r.beats.some((b) => b.name === "Title" && b.line === 1));
  check("story.pastTense.found", r.beats.some((b) => b.name === "Past-tense narration" && b.status === "present"));
  check("story.wordband", r.wordCount >= 120 && r.wordCount <= 250, String(r.wordCount));
}

check("taught formats exposed", TAUGHT_FORMATS.length === 6);

// ─── (d) declines ─────────────────────────────────────────────────────────────

const PROSE_LINES = [
  "The monsoon arrived late this year and the farmers of the district had to wait until the second week of July.",
  "Officials said the delay would not affect the overall harvest because reservoir levels remained comfortable.",
  "The farmers themselves were less certain about the weeks ahead and continued to watch the sky every morning.",
];
{
  const r = scanEnglishPoem(PROSE_LINES.join("\n"));
  check("decline.prose", r.ok === false && r.declined === "prose_like");
  check("decline.prose.steps explain", (r.steps[0] ?? "").includes("prose"));

  // a single-paragraph prose blob has only one line → declined as too short
  const r1 = scanEnglishPoem(PROSE_LINES.join(" "));
  check("decline.singleParagraph", r1.ok === false && r1.declined === "too_short");

  const r2 = scanEnglishPoem("Only one line here");
  check("decline.tooShort", r2.ok === false && r2.declined === "too_short");

  const r3 = scanEnglishPoem("");
  check("decline.empty", r3.ok === false && r3.declined === "empty");

  const r4 = checkWritingFormat("Some essay text about my favourite festival.", "essay");
  check("decline.unknownFormat", r4.ok === false && r4.declined === "unknown_format");
  check("decline.unknownFormat lists taught", r4.steps[0].includes("formal_letter") && r4.steps[0].includes("story"));

  const r5 = checkWritingFormat("   ", "notice");
  check("decline.emptyFormat", r5.ok === false && r5.declined === "empty" && r5.format === "notice");

  const r6 = checkWritingFormat("A diary entry about my day at school. It rained and I read a book.", "diary");
  check("decline.diary", r6.ok === false && r6.declined === "unknown_format");
}

// ─── (e) junk / Hindi / emoji — never crash ───────────────────────────────────

const JUNKS = [
  "आपका दिन शुभ हो 🙏🙏\nयह हिंदी में लिखा गया है\nअंग्रेज़ी स्कैनर इसे समझ नहीं पाएगा\nलेकिन क्रैश नहीं होना चाहिए\nयह एक पंक्ति है\nऔर यह भी",
  "🎉🎊🎉",
  "@@@ ### $$$\n^^^ &&& ***",
  ":\n;\n?",
  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "🔥".repeat(30),
];
for (let i = 0; i < JUNKS.length; i++) {
  let crashed = null;
  let meter = null;
  let fmt = null;
  try {
    meter = scanEnglishPoem(JUNKS[i]);
    fmt = checkWritingFormat(JUNKS[i], "formal_letter");
  } catch (e) {
    crashed = e;
  }
  check(`junk${i}.no crash`, crashed === null, String(crashed));
  check(`junk${i}.meter shape`, !!meter && typeof meter.verdict === "string" && Array.isArray(meter.steps));
  check(`junk${i}.format shape`, !!fmt && typeof fmt.ok === "boolean" && Array.isArray(fmt.beats));
}

// ─── step contract (spirit of SOLVER_STEP_CONTRACT) ──────────────────────────

{
  const m = scanEnglishPoem(DUST_OF_SNOW);
  const joinedM = m.steps.join(" ");
  check("contract.meter.steps≥3", m.steps.length >= 3, String(m.steps.length));
  check("contract.meter.chars≥150", joinedM.length >= 150, String(joinedM.length));
  check("contract.meter.methodLine", m.steps[0].includes("Rule:"));
  check("contract.meter.verification", m.steps.some((s) => s.startsWith("Verification:")));
  check("contract.meter.interpretation", m.steps.some((s) => s.startsWith("Interpretation:")));

  const f = checkWritingFormat(GOOD_FORMAL_LETTER, "formal_letter");
  const joinedF = f.steps.join(" ");
  check("contract.format.steps≥3", f.steps.length >= 3, String(f.steps.length));
  check("contract.format.chars≥150", joinedF.length >= 150, String(joinedF.length));
  check("contract.format.methodLine", f.steps[0].includes("Rule:"));
  check("contract.format.verification", f.steps.some((s) => s.startsWith("Verification:")));
  check("contract.format.no id leak", !joinedF.includes("c10_eng") && !joinedF.includes("_cbse_"));
}

// ─── TS ↔ .mjs twin parity ────────────────────────────────────────────────────

{
  const casesPoem = [DUST_OF_SNOW, FIRE_AND_ICE, ROAD_NOT_TAKEN, TYGER, ANIMALS, PROSE_LINES.join("\n"), "x\ny"];
  for (let i = 0; i < casesPoem.length; i++) {
    deepEq(`parity.poem${i}`, JSON.parse(JSON.stringify(scanEnglishPoem(casesPoem[i]))), JSON.parse(JSON.stringify(scanM(casesPoem[i]))));
  }
  const casesFmt = [
    [GOOD_FORMAL_LETTER, "formal_letter"], [BROKEN_FORMAL_LETTER, "formal-letter"],
    [GOOD_INFORMAL_LETTER, "informal letter"], [GOOD_ARTICLE, "article"],
    [GOOD_REPORT, "report"], [GOOD_NOTICE, "notice"], [BROKEN_NOTICE, "notice"],
    [GOOD_STORY, "story"], ["junk 🎉", "essay"],
  ];
  for (let i = 0; i < casesFmt.length; i++) {
    deepEq(`parity.format${i}`, JSON.parse(JSON.stringify(checkWritingFormat(...casesFmt[i]))), JSON.parse(JSON.stringify(checkM(...casesFmt[i]))));
  }
  deepEq("parity.syllables", SYL_CASES.map(([w]) => countSyllables(w)), SYL_CASES.map(([w]) => countM(w)));
}

// ─── summary ──────────────────────────────────────────────────────────────────

console.log(`\ntest_lit_english: ${pass} passed, ${fail} failed`);
if (failures.length) {
  console.log("FAILURES:");
  for (const f of failures) console.log("  ✗ " + f);
  process.exit(1);
}
console.log("ALL GREEN");
