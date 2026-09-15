import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bio_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bio_ch03_p1: SimDef = {
    id: 'v3_c11_bio_ch03_p1',
    title: 'Plant Kingdom · Part 1/2',
    subtitle: 'Draw the line between plants that hide their reproduction and plants that seed it.',
    classLevel: 11, subject: 'biology', topic: 'Plant Kingdom · Part 1/2',
    chapters: ['c11_bio_ch03'],
    nodeIds: ['c11_bio_cbse_03_001', 'c11_bio_cbse_03_002', 'c11_bio_cbse_03_003', 'c11_bio_cbse_03_004', 'c11_bio_cbse_03_005', 'c11_bio_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a botanist cataloguing a Western Ghats forest during monsoon', intro: 'Slippery algae on rocks, moss carpets, ferns in the shade, pines with cones, mangoes in fruit — one forest, five evolutionary strategies to sort.', goal: 'Distinguish cryptogams from seed plants and place representatives in the five major plant groups using seeds, vascular tissue, and dominant life phase.' },
    discovery: {
        question: 'A fern unfurls elegant fronds with proper roots, stems, and vascular tissue — yet botanists group it with mosses and algae, not with seed plants. What is it missing that outweighs all that sophistication?',
        options: ['Seeds — it still reproduces by spores, placing it with the cryptogams', 'Flowers — without them it counts as a lower plant', 'Fruits — nothing encloses its offspring', 'True leaves — its fronds don\'t count'],
        answer: 'Seeds — it still reproduces by spores, placing it with the cryptogams',
        hook: 'Vascular tissue evolved before seeds — so \'advanced plumbing\' doesn\'t earn a plant a place among the seed-bearers. The seed is the dividing line.',
    },
    teaching: [
        { title: 'Classification of Plants: Cryptogamae and Phanerogamae', text: 'Cryptogamae and Phanerogamae represent the two major sub-divisions of Kingdom Plantae based on the presence or absence of seeds and flowers; Cryptogamae (hidden reproduction) include.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bio_cbse_03_001', title: 'Your mission',
          mission: { widget: 'grow', validate: 'grow:sun=60',
            instruction: 'On the lab: give the plant 60% sunlight — watch its growth rate.',
        context: 'Classify five specimens — Spirogyra, Funaria, a fern, Pinus, and Hibiscus — into algae, bryophyte, pteridophyte, gymnosperm, and angiosperm, citing one observable feature for each call.',
            observePrompt: 'What did the grow interactive show you?' } },
        { type: 'case', nodeId: 'c11_bio_cbse_03_001', title: 'Classification of Plants: Cryptogamae and Phanerogamae',
          caseStudy: { intro: 'Imagine you are walking through a forest in the Western Ghats during monsoon: you see green slippery patches on rocks (algae), soft carpet-like mosses on tree.',
            decisions: [{ prompt: 'Define Cryptogamae and Phanerogamae and state the single most fundamental criterion that separates these two sub-divisions of Kingdom.', options: [
                { text: 'Cryptogamae are non-seed-bearing, non-flowering plants (algae, bryophytes, pteridophytes)', outcome: 'Cryptogamae are non-seed-bearing, non-flowering plants (algae, bryophytes, pteridophytes) that.' },
                { text: 'presence of flowers', outcome: 'Not quite — Students often think "Cryptogamae = lower plants without vascular tissue" and "Phanerogamae.', reveals: 'cryptogamae-lower-plants-without-vascular' },
                { text: 'vascular tissue', outcome: 'Not quite — Students often think "Cryptogamae = lower plants without vascular tissue" and "Phanerogamae.', reveals: 'cryptogamae-lower-plants-without-vascular' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_03_002', title: 'Algae: Characteristics and Classification',
          caseStudy: { intro: 'Begin by observing a greenish scum on a stagnant village pond or the slimy coating on wet bathroom tiles — these are algae.',
            decisions: [{ prompt: 'Define \'thalloid\' plant body and explain why algae are described as having a thalloid organization rather than true roots, stems, and.', options: [
                { text: 'A thalloid plant body is an undifferentiated, flat or filamentous structure that is not', outcome: 'A thalloid plant body is an undifferentiated, flat or filamentous structure that is not organized.' },
                { text: 'algae have roots called rhizoids', outcome: 'Not quite — Students believe "all algae have flagellated zoospores and gametes" because textbook examples.', reveals: 'all-algae-have-flagellated-zoospores' },
                { text: 'all algae have flagellated zoospores and gametes', outcome: 'Not quite — Students believe "all algae have flagellated zoospores and gametes" because textbook examples.', reveals: 'all-algae-have-flagellated-zoospores' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_03_003', title: 'Chlorophyceae, Phaeophyceae, Rhodophyceae',
          caseStudy: { intro: 'Begin by showing students three water samples: a green pond scum (Chlorophyceae), a brown kelp frond from a coastal market (Phaeophyceae), and a red seaweed.',
            decisions: [{ prompt: 'Name the dominant photosynthetic pigment responsible for the characteristic colour of each class: Chlorophyceae, Phaeophyceae, and.', options: [
                { text: 'Chlorophyceae: chlorophyll a and b (grass green)', outcome: 'Chlorophyceae: chlorophyll a and b (grass green); Phaeophyceae: chlorophyll a, c and fucoxanthin.' },
                { text: 'brown algae are brown', outcome: 'Not quite — Students believe "brown algae are brown because they lack chlorophyll" and "red algae are red.', reveals: 'brown-algae-are-brown-because' },
                { text: 'red algae are red', outcome: 'Not quite — Students believe "brown algae are brown because they lack chlorophyll" and "red algae are red.', reveals: 'brown-algae-are-brown-because' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_03_005', title: 'Pteridophytes: Ferns',
          caseStudy: { intro: 'Imagine walking through a damp, shaded forest in the Western Ghats during monsoon—you notice delicate, feathery fronds unfurling from the forest floor and.',
            decisions: [{ prompt: 'What is the ploidy and nutritional mode of the prothallus in a typical homosporous fern such as Dryopteris?', options: [
                { text: 'The prothallus is haploid (n) and photosynthetic (autotrophic)', outcome: 'The prothallus is haploid (n) and photosynthetic (autotrophic).' },
                { text: 'diploid', outcome: 'Not quite — Students often think "pteridophytes are just \'higher mosses\' with vascular tissue" and assume the.', reveals: 'pteridophytes-are-just-higher-mosses' },
                { text: 'dependent on sporophyte', outcome: 'Not quite — Students often think "pteridophytes are just \'higher mosses\' with vascular tissue" and assume the.', reveals: 'pteridophytes-are-just-higher-mosses' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_03_006', title: 'Gymnosperms: Naked Seeds',
          caseStudy: { intro: 'Observe a pine cone on a Himalayan chir pine (Pinus roxburghii) during a hill station visit – notice how the woody scales are not folded into a protective.',
            decisions: [{ prompt: 'Name the two types of spores produced by gymnosperms and state the structure in which each is produced.', options: [
                { text: 'Gymnosperms produce haploid microspores in microsporangia (on microsporophylls in male', outcome: 'Gymnosperms produce haploid microspores in microsporangia (on microsporophylls in male cones) and.' },
                { text: 'spores are produced in sporangia on leaves', outcome: 'Not quite — Students believe that "gymnosperm fertilisation occurs immediately after pollination, just like.', reveals: 'gymnosperm-fertilisation-occurs-immediately-afte' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_03_002', title: 'Identify each idea',
          dissect: { specimen: 'Plant Kingdom · Part 1/2', spots: [
            { id: 's1', label: 'Classification of Plants Cryptogamae and Phanerogamae', prompt: 'Which idea is this? — Cryptogamae and Phanerogamae represent the two major sub-divisions of Kingdom Plantae.', answer: 'Classification of Plants Cryptogamae and Phanerogamae', options: ['Classification of Plants Cryptogamae and Phanerogamae', 'Algae Characteristics and Classification', 'Chlorophyceae Phaeophyceae Rhodophyceae', 'Bryophytes Mosses and Liverworts'] },
            { id: 's2', label: 'Algae Characteristics and Classification', prompt: 'Which idea is this? — Algae are chlorophyll-bearing, simple, thalloid, autotrophic, and largely aquatic.', answer: 'Algae Characteristics and Classification', options: ['Algae Characteristics and Classification', 'Classification of Plants Cryptogamae and Phanerogamae', 'Chlorophyceae Phaeophyceae Rhodophyceae', 'Bryophytes Mosses and Liverworts'] },
            { id: 's3', label: 'Chlorophyceae Phaeophyceae Rhodophyceae', prompt: 'Which idea is this? — Chlorophyceae, Phaeophyceae, and Rhodophyceae are the three major classes of algae.', answer: 'Chlorophyceae Phaeophyceae Rhodophyceae', options: ['Chlorophyceae Phaeophyceae Rhodophyceae', 'Classification of Plants Cryptogamae and Phanerogamae', 'Algae Characteristics and Classification', 'Bryophytes Mosses and Liverworts'] },
            { id: 's4', label: 'Bryophytes Mosses and Liverworts', prompt: 'Which idea is this? — Bryophytes are non-vascular, terrestrial embryophytes in which the dominant, independent.', answer: 'Bryophytes Mosses and Liverworts', options: ['Bryophytes Mosses and Liverworts', 'Classification of Plants Cryptogamae and Phanerogamae', 'Algae Characteristics and Classification', 'Chlorophyceae Phaeophyceae Rhodophyceae'] },
            { id: 's5', label: 'Pteridophytes Ferns', prompt: 'Which idea is this? — Pteridophytes are vascular, seedless plants in which the dominant, independent plant body.', answer: 'Pteridophytes Ferns', options: ['Pteridophytes Ferns', 'Classification of Plants Cryptogamae and Phanerogamae', 'Algae Characteristics and Classification', 'Chlorophyceae Phaeophyceae Rhodophyceae'] },
            { id: 's6', label: 'Gymnosperms Naked Seeds', prompt: 'Which idea is this? — Gymnosperms are vascular, seed-bearing plants in which the ovules are borne exposed.', answer: 'Gymnosperms Naked Seeds', options: ['Gymnosperms Naked Seeds', 'Classification of Plants Cryptogamae and Phanerogamae', 'Algae Characteristics and Classification', 'Chlorophyceae Phaeophyceae Rhodophyceae'] }
          ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your eco-club is cataloguing plants on a trek: moss carpets on bark, ferns unfurling in the shade, a pine bearing cones, and a flowering mango. A teammate sorts them as \'cryptogams = simple plants without plumbing\' and \'phanerogams = advanced plants with vascular tissue\'.',
            decisions: [{ prompt: 'Which plant breaks their rule?', options: [
                { text: 'The fern — a cryptogam (spore-bearing, no seed) that possesses full xylem and phloem, true roots, stems and leaves. Seedlessness is the cryptogam criterion, not absence of vascular tissue; evolution produced vessels before seeds, and seeds before flowers.', outcome: 'Cryptogam vs phanerogam is a reproductive split (spores vs seeds); vascular tissue and \'advanced\' structure evolved on a different timeline.' },
                { text: 'The pine — it\'s \'lower\' because it has no flowers, so it must be a cryptogam like the moss.', outcome: 'Gymnosperms are phanerogams: they bear seeds (naked on cones, not enclosed in fruit); \'no flower\' doesn\'t mean \'no seed\'.', reveals: 'no-flowers-means-cryptogam' },
                { text: 'None breaks it — seedless plants are always structurally simple and seedless equals non-vascular.', outcome: 'Pteridophytes falsify the equation directly: first terrestrial plants with vascular tissue, yet reproducing by spores.', reveals: 'seedless-means-nonvascular' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'You learned that plant evolution added traits stepwise — vascular tissue first, then seeds, then flowers — and classification tracks that sequence, not appearances.',
            decisions: [{ prompt: 'What comes next? Plant Kingdom · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Plant Kingdom · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'grow', prompt: 'Explore the grow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'grow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_03_001', difficulty: 'standard',
          question: 'Cryptogamae and Phanerogamae represent the two major sub-divisions of Kingdom.',
          hint: 'Revisit c9_bio_ch4_5 (Five Kingdom Classification) and c9_bio_ch4_7 (Hierarchy.',
          misconception: 'Students often think "Cryptogamae = lower plants without vascular tissue" and "Phanerogamae = higher plants with.',
          parts: [
                { id: 'a', prompt: 'A student claims: "All plants with vascular tissue belong to Phanerogamae because they have well-developed conducting tissues." Explain why this statement.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'advanced', 'Cryptogamae = lower plants without vascular tissue', 'Phanerogamae = higher plants with vascular tissue'],
                  hint: 'Revisit c9_bio_ch4_5 (Five Kingdom Classification) and c9_bio_ch4_7 (Hierarchy of Classification).',
                  misconception: 'Students often think "Cryptogamae = lower plants without vascular tissue" and "Phanerogamae = higher plants with vascular tissue." This.' },
                { id: 'b', prompt: 'You are given four plant specimens: (a) Spirogyra, (b) Funaria, (c) Pinus, (d) Hibiscus.', answer: 'Spirogyra, (',
                  options: ['Spirogyra, (', 'Cryptogamae = lower plants without vascular tissue', 'Phanerogamae = higher plants with vascular tissue'],
                  hint: 'Revisit c9_bio_ch4_5 (Five Kingdom Classification) and c9_bio_ch4_7 (Hierarchy of Classification).',
                  misconception: 'Students often think "Cryptogamae = lower plants without vascular tissue" and "Phanerogamae = higher plants with vascular tissue." This.' },
                { id: 'c', prompt: 'Compare the dominant life cycle phase (gametophyte vs sporophyte) across the five plant groups.', answer: 'Algae and bryophytes: dominant gametophyte',
                  options: ['Algae and bryophytes: dominant gametophyte', 'bryophytes have dominant sporophyte', 'Cryptogamae = lower plants without vascular tissue', 'Phanerogamae = higher plants with vascular tissue'],
                  hint: 'Revisit c9_bio_ch4_5 (Five Kingdom Classification) and c9_bio_ch4_7 (Hierarchy of Classification).',
                  misconception: 'Students often think "Cryptogamae = lower plants without vascular tissue" and "Phanerogamae = higher plants with vascular tissue." This.' }
          ],
            remediations: { 'cryptogamae-lower-plants-without-vascular': { steps: ['Create a three-column table with columns: Plant Group, Vascular Tissue (Y/N), Seeds (Y/N), Dominant Phase.', 'Fill it for all five groups using NCERT Figures 3.1, 3.2, 3.3, 3.4, 3.5.', 'Highlight that Pteridophytes = Vascular YES, Seeds NO – this single row breaks the false correlation.', 'Re-read the textbook lines: "Evolutionarily, they are the first terrestrial plants to possess vascular tissues".'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "Cryptogamae = lower plants without vascular tissue" and "Phanerogamae = higher plants with.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "The classification into Cryptogamae and Phanerogamae is an artificial system because it is based on a single character (seeds).".', answer: 'The criticism is partially valid but incomplete',
                  options: ['The criticism is partially valid but incomplete', 'Cryptogamae = lower plants without vascular tissue', 'Phanerogamae = higher plants with vascular tissue'],
                  hint: 'Revisit c9_bio_ch4_5 (Five Kingdom Classification) and c9_bio_ch4_7 (Hierarchy of Classification).',
                  misconception: 'Students often think "Cryptogamae = lower plants without vascular tissue" and "Phanerogamae = higher plants with vascular tissue." This.' }
          ],
            remediations: { 'cryptogamae-lower-plants-without-vascular': { steps: ['Create a three-column table with columns: Plant Group, Vascular Tissue (Y/N), Seeds (Y/N), Dominant Phase.', 'Fill it for all five groups using NCERT Figures 3.1, 3.2, 3.3, 3.4, 3.5.', 'Highlight that Pteridophytes = Vascular YES, Seeds NO – this single row breaks the false correlation.', 'Re-read the textbook lines: "Evolutionarily, they are the first terrestrial plants to possess vascular tissues".'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_03_002', difficulty: 'standard',
          question: 'Algae are chlorophyll-bearing, simple, thalloid, autotrophic, and largely.',
          hint: 'Revisit c9_bio_ch4_5 (Five Kingdom Classification) and c9_bio_ch1_10 (Plastids).',
          misconception: 'Students believe "all algae have flagellated zoospores and gametes" because textbook examples (Chlamydomonas, Ulothrix.',
          parts: [
                { id: 'a', prompt: 'A student claims: "All algae are aquatic because they need water for swimming sperm." Using the concepts of isogamy, anisogamy, and oogamy, evaluate this.', answer: 'The statement is partially correct but overgeneralized',
                  options: ['The statement is partially correct but overgeneralized', 'all algae have flagellated zoospores and gametes'],
                  hint: 'Revisit c9_bio_ch4_5 (Five Kingdom Classification) and c9_bio_ch1_10 (Plastids) to refresh.',
                  misconception: 'Students believe "all algae have flagellated zoospores and gametes" because textbook examples (Chlamydomonas, Ulothrix, Volvox) are.' },
                { id: 'b', prompt: 'An unknown alga is collected from a marine habitat. It has chlorophyll a and c, stores mannitol and laminarin, has a cellulosic wall with algin coating, and.', answer: 'The alga belongs to Phaeophyceae (brown algae)',
                  options: ['The alga belongs to Phaeophyceae (brown algae)', 'all algae have flagellated zoospores and gametes'],
                  hint: 'Revisit c9_bio_ch4_5 (Five Kingdom Classification) and c9_bio_ch1_10 (Plastids) to refresh.',
                  misconception: 'Students believe "all algae have flagellated zoospores and gametes" because textbook examples (Chlamydomonas, Ulothrix, Volvox) are.' },
                { id: 'c', prompt: 'Compare the evolutionary progression of sexual reproduction in algae from isogamy to oogamy.', answer: 'Isogamy (Ulothrix, Spirogyra): morphologically identical, flagellated gametes',
                  options: ['Isogamy (Ulothrix, Spirogyra): morphologically identical, flagellated gametes', 'oogamy evolved for faster swimming', 'all algae have flagellated zoospores and gametes'],
                  hint: 'Revisit c9_bio_ch4_5 (Five Kingdom Classification) and c9_bio_ch1_10 (Plastids) to refresh.',
                  misconception: 'Students believe "all algae have flagellated zoospores and gametes" because textbook examples (Chlamydomonas, Ulothrix, Volvox) are.' }
          ],
            remediations: { 'all-algae-have-flagellated-zoospores': { steps: ['Make a three-column table on paper: Chlorophyceae, Phaeophyceae, Rhodophyceae.', 'For each, write flagella number, position, and insertion from Table 3.1 (NCERT p.27).', 'Highlight "Absent" for Rhodophyceae in red.', 'Create a flashcard: "Rhodophyceae = No flagella ever."'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_03_003', difficulty: 'standard',
          question: 'Chlorophyceae, Phaeophyceae, and Rhodophyceae are the three major classes.',
          hint: 'Revisit Class 10 photosynthesis (c10_bio_cbse_01_003) pigment absorption spectra and.',
          misconception: 'Students believe "brown algae are brown because they lack chlorophyll" and "red algae are red because they lack.',
          parts: [
                { id: 'a', prompt: 'Name the dominant photosynthetic pigment responsible for the characteristic colour of each class: Chlorophyceae, Phaeophyceae, and Rhodophyceae.', answer: 'Chlorophyceae: chlorophyll a and b (grass green)',
                  options: ['Chlorophyceae: chlorophyll a and b (grass green)', 'brown algae are brown', 'red algae are red', 'chlorophyll b for brown algae'],
                  hint: 'Revisit Class 10 photosynthesis (c10_bio_cbse_01_003) pigment absorption spectra and Class 9.',
                  misconception: 'Students believe "brown algae are brown because they lack chlorophyll" and "red algae are red because they lack chlorophyll." In reality.' },
                { id: 'b', prompt: 'Explain why Rhodophyceae can grow at greater ocean depths than Phaeophyceae, linking your answer to their pigment composition and light absorption properties.', answer: 'Rhodophyceae contain phycoerythrin',
                  options: ['Rhodophyceae contain phycoerythrin', 'brown algae are brown', 'red algae are red'],
                  hint: 'Revisit Class 10 photosynthesis (c10_bio_cbse_01_003) pigment absorption spectra and Class 9.',
                  misconception: 'Students believe "brown algae are brown because they lack chlorophyll" and "red algae are red because they lack chlorophyll." In reality.' },
                { id: 'c', prompt: 'An unknown marine alga has cellulose cell walls with algin coating, stores mannitol, and produces pear-shaped biflagellate zoospores with laterally inserted.', answer: 'Phaeophyceae',
                  options: ['Phaeophyceae', 'brown algae are brown', 'red algae are red'],
                  hint: 'Revisit Class 10 photosynthesis (c10_bio_cbse_01_003) pigment absorption spectra and Class 9.',
                  misconception: 'Students believe "brown algae are brown because they lack chlorophyll" and "red algae are red because they lack chlorophyll." In reality.' }
          ],
            remediations: { 'brown-algae-are-brown-because': { steps: ['Have student extract pigments from spinach (green), kelp (brown), and nori (red) using acetone, then observe colours.', 'Use a spectroscope or online absorption spectra to show chlorophyll a peaks (430, 662 nm) present in all three extracts.', 'Overlay accessory pigment absorption curves to demonstrate how they fill "green gaps." 4.', 'Ask student to re-explain colour origin in their own words.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_03_004', difficulty: 'standard',
          question: 'Bryophytes are non-vascular, terrestrial embryophytes in which the dominant.',
          hint: 'If stuck, revisit c9_bio_ch1_12 (Meiosis) and c10_bio_cbse_03_007 (Fertilisation.',
          misconception: 'Students often think the \'leafy\' stage of a moss is the sporophyte because it looks like a tiny plant with stem and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Bryophytes are non-vascular, terrestrial embryophytes in',
                  options: ['Bryophytes are non-vascular, terrestrial embryophytes in', 'Cryptogamae and Phanerogamae represent the two major sub-divisions of Kingdom Plantae', 'Algae are chlorophyll-bearing, simple, thalloid, autotrophic, and largely aquatic', 'Chlorophyceae, Phaeophyceae, and Rhodophyceae are the three major classes of algae'],
                  hint: 'If stuck, revisit c9_bio_ch1_12 (Meiosis) and c10_bio_cbse_03_007 (Fertilisation in plants).',
                  misconception: 'Students often think the \'leafy\' stage of a moss is the sporophyte because it looks like a tiny plant with stem and leaves.' }
          ],
            remediations: { 'the-leafy-stage-of-a': { steps: ['Re-read the NCERT description of moss life cycle (Section 3.2.2) focusing on the phrase "The predominant stage of the.', 'Draw a two-column table: Column A = Moss Gametophyte (protonema → leafy gametophore), Column B = Moss Sporophyte (foot.', 'Obtain a prepared slide of *Funaria* antheridium and archegonium (or use virtual microscopy) — identify the.', 'Explain aloud: "The green leafy plant is haploid and makes gametes; the brown stalk is diploid and makes spores." This.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_03_005', difficulty: 'standard',
          question: 'Pteridophytes are vascular, seedless plants in which the dominant, independent.',
          hint: 'If stuck, revisit the bryophyte life cycle (c11_bio_cbse_03_004) and the meiosis node.',
          misconception: 'Students often think "pteridophytes are just \'higher mosses\' with vascular tissue" and assume the gametophyte.',
          parts: [
                { id: 'a', prompt: 'What is the ploidy and nutritional mode of the prothallus in a typical homosporous fern such as Dryopteris?', answer: 'The prothallus is haploid (n) and photosynthetic (autotrophic)',
                  options: ['The prothallus is haploid (n) and photosynthetic (autotrophic)', 'diploid', 'dependent on sporophyte', 'pteridophytes are just \'higher mosses\' with vascular tissue'],
                  hint: 'If stuck, revisit the bryophyte life cycle (c11_bio_cbse_03_004) and the meiosis node.',
                  misconception: 'Students often think "pteridophytes are just \'higher mosses\' with vascular tissue" and assume the gametophyte is similarly dependent.' }
          ],
            remediations: { 'pteridophytes-are-just-higher-mosses': { steps: ['Have the student germinate fern spores on moist filter paper in a petri dish (takes 2-3 weeks).', 'Observe the heart-shaped prothallus under a hand lens—note rhizoids, photosynthetic tissue, and later.', 'Compare with a prepared slide of moss protonema and gametophore.', 'Draw both life cycles side-by-side, labeling ploidy and nutritional dependence at each stage.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_03_006', difficulty: 'standard',
          question: 'Gymnosperms are vascular, seed-bearing plants in which the ovules are borne.',
          hint: 'Revisit node c11_bio_cbse_03_005 (Pteridophytes) section on heterospory in Selaginella.',
          misconception: 'Students believe that "gymnosperm fertilisation occurs immediately after pollination, just like in angiosperms.".',
          parts: [
                { id: 'a', prompt: 'Compare the fate of the megaspore mother cell in a gymnosperm versus an angiosperm. Identify the step where their developmental pathways diverge after meiosis.', answer: 'In both, the megaspore mother cell undergoes meiosis to produce four megaspores',
                  options: ['In both, the megaspore mother cell undergoes meiosis to produce four megaspores', 'both form embryo sacs'],
                  hint: 'Revisit node c11_bio_cbse_03_005 (Pteridophytes) section on heterospory in Selaginella and.',
                  misconception: 'Students believe that "gymnosperm fertilisation occurs immediately after pollination, just like in angiosperms." In reality, there is.' }
          ],
            remediations: { 'gymnosperm-fertilisation-occurs-immediately-afte': { steps: ['Draw a timeline on paper – mark "Pollination (Month 0)" and "Fertilisation (Month 12-14)" for Pinus.', 'List events in each month: Month 0-2: pollen grain lands, germinates, forms pollen tube; Month 3-6: tube grows through.', 'Contrast with angiosperm timeline where embryo sac is ready at pollination (Month 0) and fertilisation occurs within.', 'Memorise the key phrase: "Gymnosperms have a \'pollination-fertilisation gap\'; angiosperms do not."'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
