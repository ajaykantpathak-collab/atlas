import type { SimDef } from '../../engine/types';

/** v3 generated — c11_soc_ch04_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_soc_ch04_p2: SimDef = {
    id: 'v3_c11_soc_ch04_p2',
    title: 'Culture and Socialisation · Part 2/2',
    subtitle: 'Discover that your lunch is as much culture as a raga.',
    classLevel: 11, subject: 'sociology', topic: 'Culture and Socialisation · Part 2/2',
    chapters: ['c11_soc_ch04'],
    nodeIds: ['c11_soc_cbse_04_007', 'c11_soc_cbse_04_008', 'c11_soc_cbse_04_009', 'c11_soc_cbse_04_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an anthropologist reading a whole way of life', intro: 'Culture isn\'t the concert hall — it\'s also the queue outside it, the ticket app, and who sits where inside.', goal: 'Define culture as a whole way of life and apply its three simultaneous dimensions.' },
    discovery: {
        question: '\'Cultured\' people attend classical concerts — so culture means refined art and literature?',
        options: ['No — Tylor\'s shift was from elite art to the whole way of life; your lunch, slang and seating habits are culture too', 'Yes — culture is high art', 'Yes — the rest is just habit', 'No — because culture only means tradition'],
        answer: 'No — Tylor\'s shift was from elite art to the whole way of life; your lunch, slang and seating habits are culture too',
        hook: 'And material culture outruns non-material — the smartphone arrived faster than the norms for it; that gap is culture lag, not chaos.',
    },
    teaching: [
        { title: 'Cosmopolitanism and Cultural Exchange Across Societies', text: 'Cosmopolitanism is a cultural outlook that values other cultures for their differences, actively celebrates and accommodates diverse cultural propensities, and promotes cultural exchange and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_soc_cbse_04_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Split one temple into its material, cognitive and normative layers at once, then weigh whether Geertz\'s meanings make Tylor obsolete.',
        labels: ['Cosmopolitanism and Cultural Exchange', 'Cultural Change: Evolutionary', 'Culture and Identity Formation', 'Gendered Socialisation and Normative'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_soc_cbse_04_007', title: 'Cosmopolitanism and Cultural Exchange Across Societies',
          caseStudy: { intro: 'Imagine you are scrolling through a music playlist and see a track titled "Bhangra Trap Remix" – it fuses traditional Punjabi dhol beats with Atlanta-style.',
            decisions: [{ prompt: 'Define cosmopolitanism in one sentence as per the NCERT textbook.', options: [
                { text: 'Correct answer: Cosmopolitanism is a cultural outlook that values other cultures for', outcome: 'Correct answer: Cosmopolitanism is a cultural outlook that values other cultures for their.' },
                { text: 'Cosmopolitanism means adopting Western culture', outcome: 'Not quite — Students often confuse cosmopolitanism with "westernization" or "globalization" – thinking it means.', reveals: 'students-often-confuse-cosmopolitanism-with' },
                { text: 'It is just tolerance of diversity', outcome: 'Not quite — Students often confuse cosmopolitanism with "westernization" or "globalization" – thinking it means.', reveals: 'students-often-confuse-cosmopolitanism-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_04_008', title: 'Cultural Change: Evolutionary and Revolutionary Mechanisms',
          caseStudy: { intro: 'Imagine your grandmother learning to use a smartphone over five years — first for calls, then WhatsApp, then video calls, then digital payments — versus the.',
            decisions: [{ prompt: 'Define evolutionary cultural change and revolutionary cultural change as distinct mechanisms.', options: [
                { text: 'Evolutionary change is gradual, incremental adaptation where cultural elements are', outcome: 'Evolutionary change is gradual, incremental adaptation where cultural elements are modified without.' },
                { text: 'faster', outcome: 'Not quite — Students equate "revolutionary change" exclusively with political revolutions (French, Russian) and.', reveals: 'students-equate-revolutionary-change-exclusively' },
                { text: 'revolutionary change', outcome: 'Not quite — Students equate "revolutionary change" exclusively with political revolutions (French, Russian) and.', reveals: 'students-equate-revolutionary-change-exclusively' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_04_009', title: 'Culture and Identity Formation: Sub-cultures and Group Identity',
          caseStudy: { intro: 'Imagine you walk into your school canteen and notice a group of students all wearing oversized hoodies, using specific slang like "stan," "simp," or "skrrt,".',
            decisions: [{ prompt: 'Define "sub-culture" as per the NCERT glossary and give one concrete example from an Indian urban context that illustrates the definition\'s.', options: [
                { text: 'A sub-culture is a group within a larger culture that borrows from and often distorts,', outcome: 'A sub-culture is a group within a larger culture that borrows from and often distorts, exaggerates.' },
                { text: 'a group with different clothes', outcome: 'Not quite — Students often confuse "sub-culture" with "any group that has different habits" (e.g., "my family.', reveals: 'students-often-confuse-sub-culture' },
                { text: 'sub-culture', outcome: 'Not quite — Students often confuse "sub-culture" with "any group that has different habits" (e.g., "my family.', reveals: 'students-often-confuse-sub-culture' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_04_010', title: 'Gendered Socialisation and Normative Differentiation by Gender',
          caseStudy: { intro: 'Imagine a brother and sister, both 14, returning home from school in a Delhi neighbourhood.',
            decisions: [{ prompt: 'Define "gendered socialisation" in one sentence using the phrase "normative differentiation".', options: [
                { text: 'Gendered socialisation is the process by', outcome: 'Gendered socialisation is the process by which society transmits gender-specific norms through.' },
                { text: 'biological differences', outcome: 'Not quite — Students often conflate "gendered socialisation" with "gender discrimination" or "sexism," treating.', reveals: 'students-often-conflate-gendered-socialisation' },
                { text: 'personal choice', outcome: 'Not quite — Students often conflate "gendered socialisation" with "gender discrimination" or "sexism," treating.', reveals: 'students-often-conflate-gendered-socialisation' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_04_007', title: 'A real-world call',
          caseStudy: { intro: 'A community\'s traditions give it identity — and include practices that harm some members (early marriage, exclusion of certain groups). Respecting culture and protecting individuals pull in opposite directions.',
            decisions: [{ prompt: 'When does \'respect for culture\' become an excuse?', options: [
                { text: 'Protect the individual — rights outrank tradition', outcome: 'The rights-first answer; imposed from outside it can destroy the very community fabric that also protects people.' },
                { text: 'Respect the culture — change must come from within', outcome: 'The internal-reform answer; slower, but the people inside the practice are the ones it happens to.' },
                { text: 'Support the insiders already fighting for change', outcome: 'The solidarity answer — the community\'s own reformers know both the tradition and the harm; they need backing, not replacement.' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a culture exhibit, a student writes: \'Culture means refined taste — classical music and fine art.\' He sorts a temple as \'material culture\', prayer as \'normative\', and belief as \'cognitive\' — \'three separate types.\'',
            decisions: [{ prompt: 'What is the sociological view of culture?', options: [
                { text: 'Widen then integrate: culture is the whole learned way of life all members share — not elite refinement; Tylor\'s shift was from \'cultured\' taste to total way of life. And the three dimensions are simultaneous lenses on ONE element: the temple is material artifact embodying architectural knowledge (cognitive) and prescribing conduct like removing shoes (normative) — integrated, not sorted into boxes.', outcome: 'The exhibit reframes: every cultural item carries all three dimensions at once — and \'culture\' belongs to everyone, not just the connoisseur.' },
                { text: 'Keep the refined-taste sense — \'cultured\' people are what the term describes.', outcome: 'That\'s the everyday meaning the discipline deliberately abandons: sociological culture is the shared way of life — street food counts as much as symphony.', reveals: 'culture-is-high-culture' },
                { text: 'Keep the three-box sort — each item belongs to one dimension.', outcome: 'The dimensions are analytical lenses, not containers: the same temple is at once material, cognitive and normative — NCERT stresses they work together.', reveals: 'dimensions-are-separate-types' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_04_010', title: 'You made it',
          caseStudy: { intro: 'A temple is stone (material), cosmology (cognitive) and rules of entry (normative) in one object — the dimensions are lenses, not compartments.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_soc_cbse_04_007', difficulty: 'standard',
          question: 'Cosmopolitanism is a cultural outlook that values other cultures for their.',
          hint: 'If stuck, revisit node c11_soc_cbse_04_006 (Ethnocentrism) and the textbook section.',
          misconception: 'Students often confuse cosmopolitanism with "westernization" or "globalization" – thinking it means adopting Western.',
          parts: [
                { id: 'a', prompt: 'Explain how the example of the English language incorporating foreign words illustrates cosmopolitanism. Use the textbook\'s explanation.', answer: 'Correct answer: The English language constantly includes foreign words into its',
                  options: ['Correct answer: The English language constantly includes foreign words into its', 'English becomes a mix of languages', 'It shows English is superior', 'westernization'],
                  hint: 'If stuck, revisit node c11_soc_cbse_04_006 (Ethnocentrism) and the textbook section "Ethnocentrism".',
                  misconception: 'Students often confuse cosmopolitanism with "westernization" or "globalization" – thinking it means adopting Western culture.' },
                { id: 'b', prompt: 'A city hosts an annual \'World Culture Festival\' where each community sets up a stall showcasing their traditional food, dress, and music, but visitors only.', answer: 'Correct answer: No',
                  options: ['Correct answer: No', 'Yes, because it shows many cultures', 'westernization', 'globalization'],
                  hint: 'If stuck, revisit node c11_soc_cbse_04_006 (Ethnocentrism) and the textbook section "Ethnocentrism".',
                  misconception: 'Students often confuse cosmopolitanism with "westernization" or "globalization" – thinking it means adopting Western culture.' }
          ],
            remediations: { 'students-often-confuse-cosmopolitanism-with': { steps: ['Re-read the textbook paragraphs on cosmopolitanism (pages 71-72) and the box on Hinglish (page 72).', 'Make a two-column table: Ethnocentrism vs Cosmopolitanism, listing key differences (evaluation vs celebration, closure.', 'For each textbook example (English language, Hindi film music, Hinglish), identify the three features: (a) valuing.', 'Practice with a new example (e.g., fusion dance, Indo-Chinese food) and explain why it is cosmopolitanism, not.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_04_008', difficulty: 'standard',
          question: 'Cultural change refers to the transformation in a society\'s cultural patterns.',
          hint: 'Revisit node c11_soc_cbse_04_002 Activity 4 — practice classifying 5 cultural practices.',
          misconception: 'Students equate "revolutionary change" exclusively with political revolutions (French, Russian) and assume evolutionary.',
          parts: [
                { id: 'a', prompt: 'The NCERT text states: "When the material or technological dimensions change rapidly, the non-material aspects can lag behind in terms of values and norms.', answer: 'In technology-driven evolutionary change, material culture (tools, machines,',
                  options: ['In technology-driven evolutionary change, material culture (tools, machines,', 'revolutionary change has no lag', 'revolutionary change', 'peaceful'],
                  hint: 'Revisit node c11_soc_cbse_04_002 Activity 4 — practice classifying 5 cultural practices into the.',
                  misconception: 'Students equate "revolutionary change" exclusively with political revolutions (French, Russian) and assume evolutionary change is always.' },
                { id: 'b', prompt: 'Classify the following as evolutionary or revolutionary change and justify using three dimensions (cognitive, normative, material): (a) The shift from joint.', answer: '(a) Evolutionary: Cognitive (gradual redefinition of "family duty"), Normative',
                  options: ['(a) Evolutionary: Cognitive (gradual redefinition of "family duty"), Normative', 'demonetisation was sudden', 'revolutionary change', 'peaceful'],
                  hint: 'Revisit node c11_soc_cbse_04_002 Activity 4 — practice classifying 5 cultural practices into the.',
                  misconception: 'Students equate "revolutionary change" exclusively with political revolutions (French, Russian) and assume evolutionary change is always.' }
          ],
            remediations: { 'students-equate-revolutionary-change-exclusively': { steps: ['Ask the student to list the three dimensions of culture (cognitive, normative, material) from node c11_soc_cbse_04_002.', 'For a familiar case (e.g., UPI adoption), have them trace changes in each dimension separately on a timeline.', 'Ask: "Did the *meaning* of money, trust, and exchange change all at once, or did practices shift first while beliefs.', 'Contrast with a clear revolutionary case (Constitutional abolition of untouchability) where law, values, and practices.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_04_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate "revolutionary change" exclusively with political revolutions (French, Russian) and assume evolutionary.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The expansion of electronic media in India since the 1990s has brought revolutionary cultural change." Use the concept of culture lag and.', answer: 'The claim is partially valid but overstated',
                  options: ['The claim is partially valid but overstated', 'revolutionary change', 'peaceful', 'positive'],
                  hint: 'Revisit node c11_soc_cbse_04_002 Activity 4 — practice classifying 5 cultural practices into the.',
                  misconception: 'Students equate "revolutionary change" exclusively with political revolutions (French, Russian) and assume evolutionary change is always.' }
          ],
            remediations: { 'students-equate-revolutionary-change-exclusively': { steps: ['Ask the student to list the three dimensions of culture (cognitive, normative, material) from node c11_soc_cbse_04_002.', 'For a familiar case (e.g., UPI adoption), have them trace changes in each dimension separately on a timeline.', 'Ask: "Did the *meaning* of money, trust, and exchange change all at once, or did practices shift first while beliefs.', 'Contrast with a clear revolutionary case (Constitutional abolition of untouchability) where law, values, and practices.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_04_009', difficulty: 'standard',
          question: 'Sub-culture refers to a distinct cultural pattern shared by a group within.',
          hint: 'If stuck, revisit the "Dimensions of Culture" table in node c11_soc_cbse_04_002 and.',
          misconception: 'Students often confuse "sub-culture" with "any group that has different habits" (e.g., "my family is a sub-culture.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the textbook states: "Identities are not inherited but fashioned both by the individual and the group through their relationship.', answer: 'Identity requires *recognition*',
                  options: ['Identity requires *recognition*', 'relationship with others', 'internal bonding', 'sub-culture'],
                  hint: 'If stuck, revisit the "Dimensions of Culture" table in node c11_soc_cbse_04_002 and practice.',
                  misconception: 'Students often confuse "sub-culture" with "any group that has different habits" (e.g., "my family is a sub-culture because we eat dinner.' }
          ],
            remediations: { 'students-often-confuse-sub-culture': { steps: ['If the student cannot distinguish behavioral variation from sub-cultural identity: (1) Give them two side-by-side.', '(2) Ask: "Which group is *using* the dominant symbol (prayer) to *make a statement about who they are*?" (3) Guide them.', '(4) Have them apply the four verbs to a new example (e.g., a gym group that "worships gains") until they can.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_04_010', difficulty: 'standard',
          question: 'Gendered socialisation is the lifelong process through which individuals learn.',
          hint: 'Revisit c11_soc_cbse_04_003 (Socialisation: Definition, Process and Primary vs Secondary).',
          misconception: 'Students often conflate "gendered socialisation" with "gender discrimination" or "sexism," treating it as intentional.',
          parts: [
                { id: 'a', prompt: 'Define "gendered socialisation" in one sentence using the phrase "normative differentiation".', answer: 'Gendered socialisation is the process by',
                  options: ['Gendered socialisation is the process by', 'biological differences', 'personal choice', 'The grandmother is sexist'],
                  hint: 'Revisit c11_soc_cbse_04_003 (Socialisation: Definition, Process and Primary vs Secondary) and.',
                  misconception: 'Students often conflate "gendered socialisation" with "gender discrimination" or "sexism," treating it as intentional malice.' },
                { id: 'b', prompt: 'In the NCERT story "The Bell," the grandmother\'s hairdressing ritual (oiling, tight knot) and the mother\'s insistence on an escort are described.', answer: 'These acts are normative',
                  options: ['These acts are normative', 'grandmother\'s love', 'safety concerns', 'The grandmother is sexist'],
                  hint: 'Revisit c11_soc_cbse_04_003 (Socialisation: Definition, Process and Primary vs Secondary) and.',
                  misconception: 'Students often conflate "gendered socialisation" with "gender discrimination" or "sexism," treating it as intentional malice.' },
                { id: 'c', prompt: 'A school introduces a rule: "Boys must play football during games period; girls must play kho-kho." Using the concept of "hidden curriculum," analyze how this.', answer: 'Step 1: Identify the explicit rule (sex-segregated sports)',
                  options: ['Step 1: Identify the explicit rule (sex-segregated sports)', 'fair because boys are stronger', 'The grandmother is sexist'],
                  hint: 'Revisit c11_soc_cbse_04_003 (Socialisation: Definition, Process and Primary vs Secondary) and.',
                  misconception: 'Students often conflate "gendered socialisation" with "gender discrimination" or "sexism," treating it as intentional malice.' }
          ],
            remediations: { 'students-often-conflate-gendered-socialisation': { steps: ['Re-read "The Bell" and highlight every sanction (whispering, hairdressing, escort, silence, pappadam denial).', 'Map each sanction to an agency (family, kinship, religious institution).', 'Ask: "Which of these would the grandmother call \'discrimination\'?" Answer: None — she sees it as *culture*.', 'Write one paragraph distinguishing *individual prejudice* from *institutionalised normative differentiation* using this.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
