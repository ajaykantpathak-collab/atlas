import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bio_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bio_ch04_p1: SimDef = {
    id: 'v3_c11_bio_ch04_p1',
    title: 'Animal Kingdom · Part 1/3',
    subtitle: 'Use symmetry, germ layers, and body cavity as three independent sieves for the animal kingdom.',
    classLevel: 11, subject: 'biology', topic: 'Animal Kingdom · Part 1/3',
    chapters: ['c11_bio_ch04'],
    nodeIds: ['c11_bio_cbse_04_001', 'c11_bio_cbse_04_002', 'c11_bio_cbse_04_003', 'c11_bio_cbse_04_004', 'c11_bio_cbse_04_005', 'c11_bio_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a zoologist triaging deep-sea specimens nobody has classified', intro: 'Three preserved specimens, one decision tree. The wrong assumption — that bilateral always means coelomate — will misfile half your tray.', goal: 'Classify animals by level of organisation, symmetry, germ-layer count, and coelom type, catching traps like acoelomate flatworms and pseudocoelomate roundworms.' },
    discovery: {
        question: 'A starfish slices into identical halves along any of five planes and has a true mesoderm-lined body cavity. Most students file it as \'simple, primitive, diploblastic\'. What makes that classification wrong?',
        options: ['Adult starfish are triploblastic coelomates — their radial symmetry is secondary, evolved from bilateral ancestors', 'Starfish actually have bilateral symmetry; the five arms are an illusion', 'Starfish lack a body cavity entirely', 'Starfish have no symmetry at all'],
        answer: 'Adult starfish are triploblastic coelomates — their radial symmetry is secondary, evolved from bilateral ancestors',
        hook: 'Symmetry, germ layers, and coelom are independent axes — assuming they always come as a package is how starfish end up misfiled.',
    },
    teaching: [
        { title: 'Basis of Animal Classification: Symmetry and Coelom', text: 'Symmetry refers to the geometric arrangement of body parts around a central axis, classified as asymmetrical (no plane divides the body into equal halves), radial symmetry (any plane through the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bio_cbse_04_001', title: 'Your mission',
          mission: { widget: 'reflex', validate: 'reflex:speed=70',
            instruction: 'On the lab: speed up the signal — how fast does the reflex fire?.',
        context: 'Run three animals — a sponge, a roundworm, an earthworm — through the classification filter of symmetry, germ layers, and coelom, then place a mystery marine worm whose cavity is lined by mesoderm on one side only.',
            observePrompt: 'What did the reflex interactive show you?' } },
        { type: 'case', nodeId: 'c11_bio_cbse_04_001', title: 'Basis of Animal Classification: Symmetry and Coelom',
          caseStudy: { intro: 'Begin by observing three common animals: a bath sponge (Porifera) that feels irregular and crumbly, a starfish (Echinodermata) with five arms radiating from.',
            decisions: [{ prompt: 'Define radial symmetry and give one example each from a diploblastic phylum and a triploblastic phylum that exhibits radial symmetry in its.', options: [
                { text: 'Radial symmetry: any plane passing through the central axis divides the organism into two', outcome: 'Radial symmetry: any plane passing through the central axis divides the organism into two identical.' },
                { text: 'radial symmetry = diploblastic', outcome: 'Not quite — Students believe "radial symmetry = diploblastic" and "bilateral symmetry = triploblastic.', reveals: 'radial-symmetry-diploblastic-and-bilateral' },
                { text: 'bilateral symmetry = triploblastic = coelomate', outcome: 'Not quite — Students believe "radial symmetry = diploblastic" and "bilateral symmetry = triploblastic.', reveals: 'radial-symmetry-diploblastic-and-bilateral' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_04_002', title: 'Levels of Organisation: Cellular to Organ System',
          caseStudy: { intro: 'When you observe a kitchen sponge (Euspongia) and a live earthworm (Pheretima) side by side, the sponge appears as a simple porous mass while the earthworm.',
            decisions: [{ prompt: 'Define "cellular level of organisation" and name the phylum that exclusively exhibits this level.', options: [
                { text: 'Cellular level of organisation: cells are arranged as loose aggregates with some division', outcome: 'Cellular level of organisation: cells are arranged as loose aggregates with some division of labour.' },
                { text: 'sponges have tissues', outcome: 'Not quite — Students believe "organ level of organisation" and "organ system level of organisation" differ only.', reveals: 'organ-level-of-organisation-and' },
                { text: 'organ level of organisation', outcome: 'Not quite — Students believe "organ level of organisation" and "organ system level of organisation" differ only.', reveals: 'organ-level-of-organisation-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_04_003', title: 'Phylum Porifera: Sponges',
          caseStudy: { intro: 'Imagine you\'re at a beach in Kerala and pick up a dried, rough bath sponge (Euspongia). It looks like a simple porous object, but it was once a living animal.',
            decisions: [{ prompt: 'Define "cellular level of organisation" and state how it differs from "tissue level of organisation" using Porifera and Cnidaria.', options: [
                { text: 'Cellular level: cells are loosely aggregated, show division of labour but are not', outcome: 'Cellular level: cells are loosely aggregated, show division of labour but are not organised into.' },
                { text: 'sponges have tissues', outcome: 'Not quite — Students think sponges are "diploblastic" because they see two cell layers (pinacoderm outside.', reveals: 'sponges-are-diploblastic-because-they' },
                { text: 'diploblastic', outcome: 'Not quite — Students think sponges are "diploblastic" because they see two cell layers (pinacoderm outside.', reveals: 'sponges-are-diploblastic-because-they' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_04_004', title: 'Phylum Cnidaria: Hydra and Jellyfish',
          caseStudy: { intro: 'Imagine you\'re at Marina Beach in Chennai and see a translucent, bell-shaped creature pulsating in the water — that\'s a jellyfish (Aurelia).',
            decisions: [{ prompt: 'Name the two basic body forms exhibited by cnidarians and give one example of each.', options: [
                { text: 'The two body forms are polyp (sessile, cylindrical', outcome: 'The two body forms are polyp (sessile, cylindrical; example: Hydra) and medusa (free-swimming.' },
                { text: 'nerve net', outcome: 'Not quite — Students believe cnidarians have a "nerve net" that functions like a centralised brain, allowing.', reveals: 'cnidarians-have-a-nerve-net' },
                { text: 'larva" and "adult" or confusing polyp with medusa', outcome: 'Not quite — Students believe cnidarians have a "nerve net" that functions like a centralised brain, allowing.', reveals: 'cnidarians-have-a-nerve-net' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_04_005', title: 'Phylum Ctenophora: Comb Jellies',
          caseStudy: { intro: 'Imagine walking along a beach in Goa at night and seeing the waves glow with a magical blue-green light — that is often bioluminescence from comb jellies.',
            decisions: [{ prompt: 'State the three fundamental features from the basis of classification (symmetry, germ layers, coelom) that apply to Phylum Ctenophora, and.', options: [
                { text: 'Ctenophora exhibits radial symmetry, diploblastic germ-layer organisation (ectoderm and', outcome: 'Ctenophora exhibits radial symmetry, diploblastic germ-layer organisation (ectoderm and endoderm.' },
                { text: 'bilateral symmetry', outcome: 'Not quite — Students consistently confuse Ctenophora with Cnidaria because both are called "jellyfish".', reveals: 'students-consistently-confuse-ctenophora-with' },
                { text: 'triploblastic', outcome: 'Not quite — Students consistently confuse Ctenophora with Cnidaria because both are called "jellyfish".', reveals: 'students-consistently-confuse-ctenophora-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_04_006', title: 'Phylum Platyhelminthes: Flatworms',
          caseStudy: { intro: 'Observe a preserved liver fluke specimen or diagram in your lab — notice its leaf-like flattened body, two prominent suckers (oral and ventral), and complete.',
            decisions: [{ prompt: 'State the three fundamental characteristics (symmetry, germ layers, coelom type) that define Phylum Platyhelminthes and distinguish it from.', options: [
                { text: 'Platyhelminthes: bilateral symmetry, triploblastic, acoelomate', outcome: 'Platyhelminthes: bilateral symmetry, triploblastic, acoelomate.' },
                { text: 'cavity', outcome: 'Not quite — Students believe "acoelomate means no mesoderm" — they confuse the absence of a mesoderm-LINED.', reveals: 'acoelomate-means-no-mesoderm-they' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_04_002', title: 'Identify each idea',
          dissect: { specimen: 'Animal Kingdom · Part 1/3', spots: [
            { id: 's1', label: 'Basis of Animal Classification Symmetry and Coelom', prompt: 'Which idea is this? — Symmetry refers to the geometric arrangement of body parts around a central axis.', answer: 'Basis of Animal Classification Symmetry and Coelom', options: ['Basis of Animal Classification Symmetry and Coelom', 'Levels of Organisation Cellular to Organ System', 'Phylum Porifera Sponges', 'Phylum Cnidaria Hydra and Jellyfish'] },
            { id: 's2', label: 'Levels of Organisation Cellular to Organ System', prompt: 'Which idea is this? — Levels of organisation in animals describe the hierarchical complexity of structural and.', answer: 'Levels of Organisation Cellular to Organ System', options: ['Levels of Organisation Cellular to Organ System', 'Basis of Animal Classification Symmetry and Coelom', 'Phylum Porifera Sponges', 'Phylum Cnidaria Hydra and Jellyfish'] },
            { id: 's3', label: 'Phylum Porifera Sponges', prompt: 'Which idea is this? — Phylum Porifera consists of primitive, multicellular, mostly marine animals (sponges).', answer: 'Phylum Porifera Sponges', options: ['Phylum Porifera Sponges', 'Basis of Animal Classification Symmetry and Coelom', 'Levels of Organisation Cellular to Organ System', 'Phylum Cnidaria Hydra and Jellyfish'] },
            { id: 's4', label: 'Phylum Cnidaria Hydra and Jellyfish', prompt: 'Which idea is this? — Phylum Cnidaria (Coelenterata) includes diploblastic, radially symmetrical, aquatic.', answer: 'Phylum Cnidaria Hydra and Jellyfish', options: ['Phylum Cnidaria Hydra and Jellyfish', 'Basis of Animal Classification Symmetry and Coelom', 'Levels of Organisation Cellular to Organ System', 'Phylum Porifera Sponges'] },
            { id: 's5', label: 'Phylum Ctenophora Comb Jellies', prompt: 'Which idea is this? — Phylum Ctenophora comprises exclusively marine, radially symmetrical, diploblastic.', answer: 'Phylum Ctenophora Comb Jellies', options: ['Phylum Ctenophora Comb Jellies', 'Basis of Animal Classification Symmetry and Coelom', 'Levels of Organisation Cellular to Organ System', 'Phylum Porifera Sponges'] },
            { id: 's6', label: 'Phylum Platyhelminthes Flatworms', prompt: 'Which idea is this? — Phylum Platyhelminthes comprises bilaterally symmetrical, triploblastic, acoelomate.', answer: 'Phylum Platyhelminthes Flatworms', options: ['Phylum Platyhelminthes Flatworms', 'Basis of Animal Classification Symmetry and Coelom', 'Levels of Organisation Cellular to Organ System', 'Phylum Porifera Sponges'] }
          ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a marine museum\'s touch-tank exhibit you\'re asked to place mystery specimens into phylum bins using only symmetry, germ layers and coelom: a starfish (five arms, radial), a flatworm (bilateral, no body cavity), a roundworm (bilateral, cavity not fully lined by mesoderm) and an earthworm (segmented, true mesoderm-lined cavity). A volunteer assumes \'radial = simple diploblastic like jellyfish\' and files the starfish with cnidarians.',
            decisions: [{ prompt: 'Where did the filing go wrong?', options: [
                { text: 'The starfish is a triploblastic coelomate whose radial symmetry is secondary — adults radiate but the phylum sits with the coelomates (Echinodermata). Flatworm = triploblastic acoelomate, roundworm = pseudocoelomate, earthworm = coelomate; symmetry alone never fixes the phylum.', outcome: 'The three criteria act as a filter in sequence — symmetry, then germ layers, then coelom — and adult radial symmetry can sit on a fully triploblastic, coelomate body plan.' },
                { text: 'The volunteer is right — radial symmetry always pairs with diploblastic organisation.', outcome: 'Echinoderms are the standing counter-example: radial adults, triploblastic development, true coelom. One-to-one mapping between symmetry and germ layers is a memorisation shortcut, not a rule.', reveals: 'radial-means-diploblastic' },
                { text: 'Flatworm and roundworm are interchangeable — bilateral means coelomate in both.', outcome: 'Bilateral triploblasts split three ways by cavity: flatworms acoelomate, roundworms pseudocoelomate, annelids onward coelomate — the cavity criterion does the separating.', reveals: 'bilateral-means-coelomate' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'You stopped treating classification criteria as a bundle. Three independent filters — symmetry, germ layers, coelom — sort a million species cleanly.',
            decisions: [{ prompt: 'What comes next? Animal Kingdom · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Animal Kingdom · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'reflex', prompt: 'Explore the reflex interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'reflex', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_04_001', difficulty: 'standard',
          question: 'Symmetry refers to the geometric arrangement of body parts around a central.',
          hint: 'Revisit c9_bio_ch1_12 (Cell Division: Meiosis and significance in sexual reproduction).',
          misconception: 'Students believe "radial symmetry = diploblastic" and "bilateral symmetry = triploblastic = coelomate" as rigid.',
          parts: [
                { id: 'a', prompt: 'A newly discovered marine worm is triploblastic, bilaterally symmetrical, and possesses a fluid-filled cavity between its body wall and gut that is lined.', answer: 'Step 1: Identify cavity condition',
                  options: ['Step 1: Identify cavity condition', 'radial symmetry = diploblastic', 'bilateral symmetry = triploblastic = coelomate'],
                  hint: 'Revisit c9_bio_ch1_12 (Cell Division: Meiosis and significance in sexual reproduction) and.',
                  misconception: 'Students believe "radial symmetry = diploblastic" and "bilateral symmetry = triploblastic = coelomate" as rigid one-to-one mappings.' }
          ],
            remediations: { 'radial-symmetry-diploblastic-and-bilateral': { steps: ['Draw a 3-column table (Symmetry, Germ Layers, Coelom) with rows for Porifera, Cnidaria, Platyhelminthes, Aschelminthes.', 'Fill using NCERT Table 4.2 — note where patterns break (Echinodermata radial but triploblastic/coelomate.', 'Trace the evolutionary arrows in Figure 4.4: radial diploblastic acoelomate (Cnidaria) → bilateral triploblastic.', 'Verbally explain each transition: "Mesoderm appears → acoelomate; mesoderm forms pouches → pseudocoelom; mesoderm.'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "radial symmetry = diploblastic" and "bilateral symmetry = triploblastic = coelomate" as rigid.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "All bilaterally symmetrical animals are triploblastic and coelomate." Provide a counterexample for each false claim and explain why.', answer: 'The statement is false on two counts',
                  options: ['The statement is false on two counts', 'radial symmetry = diploblastic', 'bilateral symmetry = triploblastic = coelomate'],
                  hint: 'Revisit c9_bio_ch1_12 (Cell Division: Meiosis and significance in sexual reproduction) and.',
                  misconception: 'Students believe "radial symmetry = diploblastic" and "bilateral symmetry = triploblastic = coelomate" as rigid one-to-one mappings.' },
                { id: 'b', prompt: 'Design a dichotomous key using only symmetry, germ layers, and coelom type to distinguish these five phyla: Porifera, Cnidaria, Platyhelminthes, Aschelminthes.', answer: 'Couplet 1: (a) Body asymmetrical, cellular level of organisation → Porifera',
                  options: ['Couplet 1: (a) Body asymmetrical, cellular level of organisation → Porifera', 'radial symmetry = diploblastic', 'bilateral symmetry = triploblastic = coelomate'],
                  hint: 'Revisit c9_bio_ch1_12 (Cell Division: Meiosis and significance in sexual reproduction) and.',
                  misconception: 'Students believe "radial symmetry = diploblastic" and "bilateral symmetry = triploblastic = coelomate" as rigid one-to-one mappings.' }
          ],
            remediations: { 'radial-symmetry-diploblastic-and-bilateral': { steps: ['Draw a 3-column table (Symmetry, Germ Layers, Coelom) with rows for Porifera, Cnidaria, Platyhelminthes, Aschelminthes.', 'Fill using NCERT Table 4.2 — note where patterns break (Echinodermata radial but triploblastic/coelomate.', 'Trace the evolutionary arrows in Figure 4.4: radial diploblastic acoelomate (Cnidaria) → bilateral triploblastic.', 'Verbally explain each transition: "Mesoderm appears → acoelomate; mesoderm forms pouches → pseudocoelom; mesoderm.'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_04_002', difficulty: 'standard',
          question: 'Levels of organisation in animals describe the hierarchical complexity.',
          hint: 'Review Class 9 Animal Tissues (c9_bio_ch2_5 to c9_bio_ch2_8) focusing on tissue.',
          misconception: 'Students believe "organ level of organisation" and "organ system level of organisation" differ only in the number.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Cnidaria and Ctenophora both show tissue level of organisation, so they must have identical digestive system complexity." Evaluate this.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'level of organisation', 'identical system complexity', 'organ level of organisation'],
                  hint: 'Review Class 9 Animal Tissues (c9_bio_ch2_5 to c9_bio_ch2_8) focusing on tissue definitions and the.',
                  misconception: 'Students believe "organ level of organisation" and "organ system level of organisation" differ only in the number of organs present, and.' },
                { id: 'b', prompt: 'Given an unknown triploblastic animal with organ-level organisation, bilateral symmetry, and an incomplete digestive system (single opening), identify its.', answer: 'Phylum Platyhelminthes',
                  options: ['Phylum Platyhelminthes', 'organ level of organisation', 'organ system level of organisation'],
                  hint: 'Review Class 9 Animal Tissues (c9_bio_ch2_5 to c9_bio_ch2_8) focusing on tissue definitions and the.',
                  misconception: 'Students believe "organ level of organisation" and "organ system level of organisation" differ only in the number of organs present, and.' },
                { id: 'c', prompt: 'Compare the circulatory system organisation in Annelida (earthworm) and Arthropoda (cockroach) at the organ-system level.', answer: 'Both achieve organ-system level',
                  options: ['Both achieve organ-system level', 'open circulation means lower organisation level', 'organ level of organisation', 'organ system level of organisation'],
                  hint: 'Review Class 9 Animal Tissues (c9_bio_ch2_5 to c9_bio_ch2_8) focusing on tissue definitions and the.',
                  misconception: 'Students believe "organ level of organisation" and "organ system level of organisation" differ only in the number of organs present, and.' }
          ],
            remediations: { 'organ-level-of-organisation-and': { steps: ['Draw two flowcharts side-by-side. Left: "Organ Level (Platyhelminthes)" - list organs as isolated boxes (Brain.', 'Ask "Which diagram shows organs working as a coordinated unit for a physiological function?"', 'Have student write one-sentence definition: "Organ system level = organs linked by common physiological function and.', 'Apply to new example - leech (Hirudinaria) has segmented nephridia connected by longitudinal excretory canals → organ.'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_04_003', difficulty: 'standard',
          question: 'Phylum Porifera consists of primitive, multicellular, mostly marine animals.',
          hint: 'Review c11_bio_cbse_04_002 (Levels of Organisation) and c8_bio_ch1_8 (Levels.',
          misconception: 'Students think sponges are "diploblastic" because they see two cell layers (pinacoderm outside, choanoderm inside).',
          parts: [
                { id: 'a', prompt: 'A student observes a freshwater sponge (Spongilla) in a pond. Predict the symmetry, germ layers, coelom type, and type of fertilisation.', answer: 'Symmetry: asymmetrical (mostly)',
                  options: ['Symmetry: asymmetrical (mostly)', 'diploblastic, radial symmetry', 'diploblastic'],
                  hint: 'Review c11_bio_cbse_04_002 (Levels of Organisation) and c8_bio_ch1_8 (Levels of Organisation.',
                  misconception: 'Students think sponges are "diploblastic" because they see two cell layers (pinacoderm outside, choanoderm inside).' },
                { id: 'b', prompt: 'Compare the skeleton composition and function in Sycon (calcareous spicules), Euspongia (spongin fibres), and Spongilla (siliceous spicules + spongin).', answer: 'Sycon (marine): calcareous spicules',
                  options: ['Sycon (marine): calcareous spicules', 'all have spicules', 'diploblastic'],
                  hint: 'Review c11_bio_cbse_04_002 (Levels of Organisation) and c8_bio_ch1_8 (Levels of Organisation.',
                  misconception: 'Students think sponges are "diploblastic" because they see two cell layers (pinacoderm outside, choanoderm inside).' }
          ],
            remediations: { 'sponges-are-diploblastic-because-they': { steps: ['Revisit gastrulation definition from Class 10 (c10_bio_cbse_03_010: fertilisation, implantation, embryonic development).', 'Compare sponge development (no gastrula, no germ layers) with Hydra (gastrula forms ectoderm/endoderm).', 'Draw a Venn diagram: "Cell layers present" vs "True germ layers formed".', 'Write: "Porifera: cellular organisation, no germ layers. Cnidaria: tissue organisation, diploblastic." Repeat until.'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_04_004', difficulty: 'standard',
          question: 'Phylum Cnidaria (Coelenterata) includes diploblastic, radially symmetrical.',
          hint: 'Revisit c11_bio_cbse_04_001 (symmetry and germ layers) and c11_bio_cbse_04_002 (levels.',
          misconception: 'Students believe cnidarians have a "nerve net" that functions like a centralised brain, allowing coordinated complex.',
          parts: [
                { id: 'a', prompt: 'Name the two basic body forms exhibited by cnidarians and give one example of each.', answer: 'The two body forms are polyp (sessile, cylindrical',
                  options: ['The two body forms are polyp (sessile, cylindrical', 'nerve net', 'larva" and "adult" or confusing polyp with medusa'],
                  hint: 'Revisit c11_bio_cbse_04_001 (symmetry and germ layers) and c11_bio_cbse_04_002 (levels.',
                  misconception: 'Students believe cnidarians have a "nerve net" that functions like a centralised brain, allowing coordinated complex behaviours.' },
                { id: 'b', prompt: 'Why is the gastrovascular cavity of cnidarians considered "incomplete" despite performing both digestion and circulation?', answer: 'It is incomplete',
                  options: ['It is incomplete', 'it\'s incomplete because it lacks enzymes', 'nerve net'],
                  hint: 'Revisit c11_bio_cbse_04_001 (symmetry and germ layers) and c11_bio_cbse_04_002 (levels.',
                  misconception: 'Students believe cnidarians have a "nerve net" that functions like a centralised brain, allowing coordinated complex behaviours.' },
                { id: 'c', prompt: 'Compare the mesoglea in Hydrozoa, Scyphozoa, and Anthozoa. How does its composition relate to the dominant body form?', answer: 'Hydrozoa: thin, acellular mesoglea (polyp-dominant)',
                  options: ['Hydrozoa: thin, acellular mesoglea (polyp-dominant)', 'nerve net'],
                  hint: 'Revisit c11_bio_cbse_04_001 (symmetry and germ layers) and c11_bio_cbse_04_002 (levels.',
                  misconception: 'Students believe cnidarians have a "nerve net" that functions like a centralised brain, allowing coordinated complex behaviours.' }
          ],
            remediations: { 'cnidarians-have-a-nerve-net': { steps: ['Review the definition of "tissue-level organisation" from c11_bio_cbse_04_002 — emphasise that true nerves (neurons).', 'Compare Hydra\'s nerve net (diffuse, bidirectional) with Planaria\'s ladder-like nervous system (c11_bio_cbse_04_006).', 'Watch a video of Hydra feeding — note the localised tentacle contraction (nerve net) vs.'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_04_005', difficulty: 'standard',
          question: 'Phylum Ctenophora comprises exclusively marine, radially symmetrical.',
          hint: 'If stuck, review c11_bio_cbse_04_001 (Basis of Classification) focusing on Table 4.1.',
          misconception: 'Students consistently confuse Ctenophora with Cnidaria because both are called "jellyfish" in common language and share.',
          parts: [
                { id: 'a', prompt: 'A student observes a transparent, gelatinous, oval marine animal about 2 cm long with eight shimmering rows of cilia running along its body.', answer: 'The animal belongs to Phylum Ctenophora, not Cnidaria',
                  options: ['The animal belongs to Phylum Ctenophora, not Cnidaria', 'jellyfish'],
                  hint: 'If stuck, review c11_bio_cbse_04_001 (Basis of Classification) focusing on Table 4.1 comparisons.',
                  misconception: 'Students consistently confuse Ctenophora with Cnidaria because both are called "jellyfish" in common language and share radial symmetry.' }
          ],
            remediations: { 'students-consistently-confuse-ctenophora-with': { steps: ['Create a side-by-side comparison table with columns for Comb plates (present/absent), Prey-capture cells.', 'Use labelled diagrams of Pleurobrachia (ctenophore) and Aurelia (cnidarian) to visually identify the eight comb rows.', 'Practice NCERT Exercise Q14 matching: "Comb plates → (i) Ctenophora" and "Cnidoblasts → (ii) Coelenterata" until.', 'Write a one-sentence definition of Ctenophora that includes "comb plates" and "colloblasts" but excludes "nematocysts".'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_04_006', difficulty: 'standard',
          question: 'Phylum Platyhelminthes comprises bilaterally symmetrical, triploblastic.',
          hint: 'Revisit c11_bio_cbse_04_001 Section 4.1.4 (Coelom) and Figure 4.3 — draw and label all.',
          misconception: 'Students believe "acoelomate means no mesoderm" — they confuse the absence of a mesoderm-LINED cavity (coelom) with.',
          parts: [
                { id: 'a', prompt: 'State the three fundamental characteristics (symmetry, germ layers, coelom type) that define Phylum Platyhelminthes and distinguish it from Phylum Cnidaria and.', answer: 'Platyhelminthes: bilateral symmetry, triploblastic, acoelomate',
                  options: ['Platyhelminthes: bilateral symmetry, triploblastic, acoelomate', 'cavity'],
                  hint: 'Revisit c11_bio_cbse_04_001 Section 4.1.4 (Coelom) and Figure 4.3 — draw and label all three coelom.',
                  misconception: 'Students believe "acoelomate means no mesoderm" — they confuse the absence of a mesoderm-LINED cavity (coelom) with absence of mesoderm.' },
                { id: 'b', prompt: 'A student claims: "Flame cells in Planaria are analogous to nephridia in earthworms because both excrete nitrogenous waste." Evaluate this statement using.', answer: 'The statement is partially correct functionally (both osmoregulate/excrete) but',
                  options: ['The statement is partially correct functionally (both osmoregulate/excrete) but', 'acoelomate means no mesoderm'],
                  hint: 'Revisit c11_bio_cbse_04_001 Section 4.1.4 (Coelom) and Figure 4.3 — draw and label all three coelom.',
                  misconception: 'Students believe "acoelomate means no mesoderm" — they confuse the absence of a mesoderm-LINED cavity (coelom) with absence of mesoderm.' },
                { id: 'c', prompt: 'Compare the regenerative capacity of Planaria with that of Hydra (Cnidaria) and an earthworm (Annelida).', answer: 'Planaria > Hydra > Earthworm in regeneration potential',
                  options: ['Planaria > Hydra > Earthworm in regeneration potential', 'acoelomate means no mesoderm'],
                  hint: 'Revisit c11_bio_cbse_04_001 Section 4.1.4 (Coelom) and Figure 4.3 — draw and label all three coelom.',
                  misconception: 'Students believe "acoelomate means no mesoderm" — they confuse the absence of a mesoderm-LINED cavity (coelom) with absence of mesoderm.' }
          ],
            remediations: { 'acoelomate-means-no-mesoderm-they': { steps: ['Revisit c11_bio_cbse_04_001 (Basis of Classification) — specifically the coelom section (4.1.4) with Figure 4.3c.', 'Use the "mesoderm derivatives" table from c11_bio_cbse_04_002 (Levels of Organisation) — list 5 structures in Planaria.', 'Explain aloud: "Acoelomate = no coelom, NOT no mesoderm. Mesoderm is present as solid tissue (parenchyma)."', 'Attempt Diagnostic Question 1 again — if correct, proceed; if not, review Class 9 c9_bio_ch2_5 (Animal Tissues) for.'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
