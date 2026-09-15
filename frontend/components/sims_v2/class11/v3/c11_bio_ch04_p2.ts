import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bio_ch04_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bio_ch04_p2: SimDef = {
    id: 'v3_c11_bio_ch04_p2',
    title: 'Animal Kingdom · Part 2/3',
    subtitle: 'Use symmetry, germ layers, and body cavity as three independent sieves for the animal kingdom.',
    classLevel: 11, subject: 'biology', topic: 'Animal Kingdom · Part 2/3',
    chapters: ['c11_bio_ch04'],
    nodeIds: ['c11_bio_cbse_04_007', 'c11_bio_cbse_04_008', 'c11_bio_cbse_04_009', 'c11_bio_cbse_04_010', 'c11_bio_cbse_04_011', 'c11_bio_cbse_04_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a zoologist triaging deep-sea specimens nobody has classified', intro: 'Three preserved specimens, one decision tree. The wrong assumption — that bilateral always means coelomate — will misfile half your tray.', goal: 'Classify animals by level of organisation, symmetry, germ-layer count, and coelom type, catching traps like acoelomate flatworms and pseudocoelomate roundworms.' },
    discovery: {
        question: 'A starfish slices into identical halves along any of five planes and has a true mesoderm-lined body cavity. Most students file it as \'simple, primitive, diploblastic\'. What makes that classification wrong?',
        options: ['Adult starfish are triploblastic coelomates — their radial symmetry is secondary, evolved from bilateral ancestors', 'Starfish actually have bilateral symmetry; the five arms are an illusion', 'Starfish lack a body cavity entirely', 'Starfish have no symmetry at all'],
        answer: 'Adult starfish are triploblastic coelomates — their radial symmetry is secondary, evolved from bilateral ancestors',
        hook: 'Symmetry, germ layers, and coelom are independent axes — assuming they always come as a package is how starfish end up misfiled.',
    },
    teaching: [
        { title: 'Phylum Aschelminthes: Roundworms', text: 'Phylum Aschelminthes (Nemathelminthes) comprises bilaterally symmetrical, triploblastic, pseudocoelomate animals with organ-system level of organisation, a complete alimentary canal with a muscular.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bio_cbse_04_007', title: 'Your mission',
          mission: { widget: 'reflex', validate: 'reflex:speed=70',
            instruction: 'On the lab: speed up the signal — how fast does the reflex fire?.',
        context: 'Run three animals — a sponge, a roundworm, an earthworm — through the classification filter of symmetry, germ layers, and coelom, then place a mystery marine worm whose cavity is lined by mesoderm on one side only.',
            observePrompt: 'What did the reflex interactive show you?' } },
        { type: 'case', nodeId: 'c11_bio_cbse_04_007', title: 'Phylum Aschelminthes: Roundworms',
          caseStudy: { intro: 'Imagine a child in a rural Indian village receiving a deworming tablet (Albendazole) during a school health camp – the target is often *Ascaris lumbricoides*.',
            decisions: [{ prompt: 'State the three germ layers present in Aschelminthes and name the body cavity type they possess.', options: [
                { text: 'Correct answer: Ectoderm, mesoderm, endoderm (triploblastic)', outcome: 'Correct answer: Ectoderm, mesoderm, endoderm (triploblastic); pseudocoelom (body cavity not fully.' },
                { text: 'diploblastic', outcome: 'Not quite — Students often think "pseudocoelom" means "false coelom" in the sense of being non-functional or.', reveals: 'pseudocoelom-means-false-coelom-in' },
                { text: 'acoelomate', outcome: 'Not quite — Students often think "pseudocoelom" means "false coelom" in the sense of being non-functional or.', reveals: 'pseudocoelom-means-false-coelom-in' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_04_008', title: 'Phylum Annelida: Segmented Worms',
          caseStudy: { intro: 'Imagine digging in moist garden soil after rain and finding a reddish-brown worm that moves by alternately shortening and lengthening its body.',
            decisions: [{ prompt: 'State the three germ layers present in annelids and name the body cavity type they possess.', options: [
                { text: 'Annelids are triploblastic (ectoderm, mesoderm, endoderm) and coelomate (true coelom', outcome: 'Annelids are triploblastic (ectoderm, mesoderm, endoderm) and coelomate (true coelom lined.' },
                { text: 'diploblastic', outcome: 'Not quite — Students often think "metameric segmentation" means only external rings (annuli).', reveals: 'metameric-segmentation-means-only-external' },
                { text: 'pseudocoelomate', outcome: 'Not quite — Students often think "metameric segmentation" means only external rings (annuli).', reveals: 'metameric-segmentation-means-only-external' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_04_009', title: 'Phylum Arthropoda: Insects and Crustaceans',
          caseStudy: { intro: 'When you see a housefly landing on food or a prawn in a market, observe their hard outer covering and jointed legs - these are arthropod hallmarks.',
            decisions: [{ prompt: 'Name the respiratory structures in cockroach and prawn respectively, and state the fundamental difference in how oxygen reaches tissues.', options: [
                { text: 'Cockroach uses a tracheal system (network of air tubes opening via spiracles) delivering', outcome: 'Cockroach uses a tracheal system (network of air tubes opening via spiracles) delivering oxygen.' },
                { text: 'both use gills', outcome: 'Not quite — Students believe that "arthropods have an open circulatory system so their blood (haemolymph).', reveals: 'arthropods-have-an-open-circulatory' },
                { text: 'cockroach uses lungs', outcome: 'Not quite — Students believe that "arthropods have an open circulatory system so their blood (haemolymph).', reveals: 'arthropods-have-an-open-circulatory' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_04_010', title: 'Phylum Mollusca: Snails and Octopus',
          caseStudy: { intro: 'Pick up a common garden snail (Pila) after monsoon rain — notice its slimy muscular foot gliding on the wet wall, the coiled shell it carries like a portable.',
            decisions: [{ prompt: 'A student observes a bivalve (freshwater mussel) and a gastropod (garden snail) and notes both have a shell and a muscular foot.', options: [
                { text: 'The presence of a mantle that secretes the shell and forms a mantle cavity housing gills', outcome: 'The presence of a mantle that secretes the shell and forms a mantle cavity housing gills (ctenidia).' },
                { text: 'both have a shell', outcome: 'Not quite — Students believe "all molluscs have a radula" and "all molluscs have an external shell." Bivalvia.', reveals: 'all-molluscs-have-a-radula' },
                { text: 'all molluscs have a radula', outcome: 'Not quite — Students believe "all molluscs have a radula" and "all molluscs have an external shell." Bivalvia.', reveals: 'all-molluscs-have-a-radula' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_04_011', title: 'Phylum Echinodermata: Starfish',
          caseStudy: { intro: 'Imagine walking along a rocky beach in Tamil Nadu during low tide and spotting a starfish clinging to a rock — its five arms radiating from a central disc.',
            decisions: [{ prompt: 'Name the three components of the water vascular system in Asterias that directly participate in locomotion, and state the fluid that fills.', options: [
                { text: 'The three components are the madreporite, stone canal, and ring canal (with radial canals', outcome: 'The three components are the madreporite, stone canal, and ring canal (with radial canals and tube.' },
                { text: 'coelomic fluid', outcome: 'Not quite — Students often think "radial symmetry in echinoderms means they are primitive or related.', reveals: 'radial-symmetry-in-echinoderms-means' },
                { text: 'haemolymph', outcome: 'Not quite — Students often think "radial symmetry in echinoderms means they are primitive or related.', reveals: 'radial-symmetry-in-echinoderms-means' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_04_012', title: 'Phylum Hemichordata',
          caseStudy: { intro: 'Imagine finding a soft, worm-like creature burrowing in the intertidal sand flats of the Gulf of Kutch.',
            decisions: [{ prompt: 'State the three distinct body regions of a hemichordate (e.g., Balanoglossus) and name the structure in the collar region that was.', options: [
                { text: 'The three regions are proboscis, collar, and trunk', outcome: 'The three regions are proboscis, collar, and trunk. The structure in the collar is the stomochord.' },
                { text: 'head, thorax, abdomen', outcome: 'Not quite — Students believe the stomochord *is* a notochord (hence "Hemichordata = half notochord") and that.', reveals: 'the-stomochord-is-a-notochord' },
                { text: 'notochord in collar', outcome: 'Not quite — Students believe the stomochord *is* a notochord (hence "Hemichordata = half notochord") and that.', reveals: 'the-stomochord-is-a-notochord' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_04_008', title: 'Identify each idea',
          dissect: { specimen: 'Animal Kingdom · Part 2/3', spots: [
            { id: 's1', label: 'Phylum Aschelminthes Roundworms', prompt: 'Which idea is this? — Phylum Aschelminthes (Nemathelminthes) comprises bilaterally symmetrical, triploblastic.', answer: 'Phylum Aschelminthes Roundworms', options: ['Phylum Aschelminthes Roundworms', 'Phylum Annelida Segmented Worms', 'Phylum Arthropoda Insects and Crustaceans', 'Phylum Mollusca Snails and Octopus'] },
            { id: 's2', label: 'Phylum Annelida Segmented Worms', prompt: 'Which idea is this? — Phylum Annelida consists of triploblastic, bilaterally symmetrical, coelomate animals.', answer: 'Phylum Annelida Segmented Worms', options: ['Phylum Annelida Segmented Worms', 'Phylum Aschelminthes Roundworms', 'Phylum Arthropoda Insects and Crustaceans', 'Phylum Mollusca Snails and Octopus'] },
            { id: 's3', label: 'Phylum Arthropoda Insects and Crustaceans', prompt: 'Which idea is this? — Phylum Arthropoda is the largest phylum in Animalia, characterized by bilaterally.', answer: 'Phylum Arthropoda Insects and Crustaceans', options: ['Phylum Arthropoda Insects and Crustaceans', 'Phylum Aschelminthes Roundworms', 'Phylum Annelida Segmented Worms', 'Phylum Mollusca Snails and Octopus'] },
            { id: 's4', label: 'Phylum Mollusca Snails and Octopus', prompt: 'Which idea is this? — Phylum Mollusca comprises bilaterally symmetrical, triploblastic, coelomate animals with.', answer: 'Phylum Mollusca Snails and Octopus', options: ['Phylum Mollusca Snails and Octopus', 'Phylum Aschelminthes Roundworms', 'Phylum Annelida Segmented Worms', 'Phylum Arthropoda Insects and Crustaceans'] },
            { id: 's5', label: 'Phylum Echinodermata Starfish', prompt: 'Which idea is this? — Phylum Echinodermata includes exclusively marine, triploblastic, coelomate animals with.', answer: 'Phylum Echinodermata Starfish', options: ['Phylum Echinodermata Starfish', 'Phylum Aschelminthes Roundworms', 'Phylum Annelida Segmented Worms', 'Phylum Arthropoda Insects and Crustaceans'] },
            { id: 's6', label: 'Phylum Hemichordata', prompt: 'Which idea is this? — Phylum Hemichordata comprises a small group of exclusively marine, worm-like.', answer: 'Phylum Hemichordata', options: ['Phylum Hemichordata', 'Phylum Aschelminthes Roundworms', 'Phylum Annelida Segmented Worms', 'Phylum Arthropoda Insects and Crustaceans'] }
          ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a marine museum\'s touch-tank exhibit you\'re asked to place mystery specimens into phylum bins using only symmetry, germ layers and coelom: a starfish (five arms, radial), a flatworm (bilateral, no body cavity), a roundworm (bilateral, cavity not fully lined by mesoderm) and an earthworm (segmented, true mesoderm-lined cavity). A volunteer assumes \'radial = simple diploblastic like jellyfish\' and files the starfish with cnidarians.',
            decisions: [{ prompt: 'Where did the filing go wrong?', options: [
                { text: 'The starfish is a triploblastic coelomate whose radial symmetry is secondary — adults radiate but the phylum sits with the coelomates (Echinodermata). Flatworm = triploblastic acoelomate, roundworm = pseudocoelomate, earthworm = coelomate; symmetry alone never fixes the phylum.', outcome: 'The three criteria act as a filter in sequence — symmetry, then germ layers, then coelom — and adult radial symmetry can sit on a fully triploblastic, coelomate body plan.' },
                { text: 'The volunteer is right — radial symmetry always pairs with diploblastic organisation.', outcome: 'Echinoderms are the standing counter-example: radial adults, triploblastic development, true coelom. One-to-one mapping between symmetry and germ layers is a memorisation shortcut, not a rule.', reveals: 'radial-means-diploblastic' },
                { text: 'Flatworm and roundworm are interchangeable — bilateral means coelomate in both.', outcome: 'Bilateral triploblasts split three ways by cavity: flatworms acoelomate, roundworms pseudocoelomate, annelids onward coelomate — the cavity criterion does the separating.', reveals: 'bilateral-means-coelomate' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_04_012', title: 'The bigger picture',
          caseStudy: { intro: 'You stopped treating classification criteria as a bundle. Three independent filters — symmetry, germ layers, coelom — sort a million species cleanly.',
            decisions: [{ prompt: 'What comes next? Animal Kingdom · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Animal Kingdom · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'reflex', prompt: 'Explore the reflex interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'reflex', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_04_007', difficulty: 'standard',
          question: 'Phylum Aschelminthes (Nemathelminthes) comprises bilaterally symmetrical.',
          hint: 'Review the coelom types in node c11_bio_cbse_04_001 and the flatworm features in node.',
          misconception: 'Students often think "pseudocoelom" means "false coelom" in the sense of being non-functional or a degenerate trait.',
          parts: [
                { id: 'a', prompt: 'State the three germ layers present in Aschelminthes and name the body cavity type they possess.', answer: 'Correct answer: Ectoderm, mesoderm, endoderm (triploblastic)',
                  options: ['Correct answer: Ectoderm, mesoderm, endoderm (triploblastic)', 'diploblastic', 'acoelomate', 'pseudocoelom'],
                  hint: 'Review the coelom types in node c11_bio_cbse_04_001 and the flatworm features in node.',
                  misconception: 'Students often think "pseudocoelom" means "false coelom" in the sense of being non-functional or a degenerate trait, and therefore assume.' },
                { id: 'b', prompt: 'A cylindrical worm is found in a soil sample. It has a complete digestive system with a muscular pharynx, an excretory pore, and separate sexes.', answer: 'Correct answer: Phylum Aschelminthes',
                  options: ['Correct answer: Phylum Aschelminthes', 'Annelida because it has a body cavity', 'pseudocoelom', 'false coelom'],
                  hint: 'Review the coelom types in node c11_bio_cbse_04_001 and the flatworm features in node.',
                  misconception: 'Students often think "pseudocoelom" means "false coelom" in the sense of being non-functional or a degenerate trait, and therefore assume.' }
          ],
            remediations: { 'pseudocoelom-means-false-coelom-in': { steps: ['Draw three cross-sections side-by-side: Platyhelminthes (solid mesoderm), Aschelminthes (mesoderm only on body wall and.', 'Label each cavity type.', 'For each, ask: "Can organs be suspended? Is there a hydrostatic skeleton? Can the gut be long and coiled?"', 'Relate answers to the phylum\'s typical body size and complexity.'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "pseudocoelom" means "false coelom" in the sense of being non-functional or a degenerate trait.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "All Aschelminthes are parasitic worms causing human disease." Provide two counter-examples from the phylum.', answer: 'Correct answer: The statement is false',
                  options: ['Correct answer: The statement is false', 'true, all are parasites', 'pseudocoelom', 'false coelom'],
                  hint: 'Review the coelom types in node c11_bio_cbse_04_001 and the flatworm features in node.',
                  misconception: 'Students often think "pseudocoelom" means "false coelom" in the sense of being non-functional or a degenerate trait, and therefore assume.' },
                { id: 'b', prompt: 'Design a simple dichotomous key using only body cavity type, digestive tract completeness, and segmentation to separate Platyhelminthes, Aschelminthes, and.', answer: 'Expected answer: 1a',
                  options: ['Expected answer: 1a', 'pseudocoelom', 'false coelom', 'less evolved'],
                  hint: 'Review the coelom types in node c11_bio_cbse_04_001 and the flatworm features in node.',
                  misconception: 'Students often think "pseudocoelom" means "false coelom" in the sense of being non-functional or a degenerate trait, and therefore assume.' }
          ],
            remediations: { 'pseudocoelom-means-false-coelom-in': { steps: ['Draw three cross-sections side-by-side: Platyhelminthes (solid mesoderm), Aschelminthes (mesoderm only on body wall and.', 'Label each cavity type.', 'For each, ask: "Can organs be suspended? Is there a hydrostatic skeleton? Can the gut be long and coiled?"', 'Relate answers to the phylum\'s typical body size and complexity.'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_04_008', difficulty: 'standard',
          question: 'Phylum Annelida consists of triploblastic, bilaterally symmetrical, coelomate.',
          hint: 'Revisit c11_bio_cbse_04_001 (Basis of Classification) sections 4.1.3, 4.1.4, 4.1.5 and.',
          misconception: 'Students often think "metameric segmentation" means only external rings (annuli).',
          parts: [
                { id: 'a', prompt: 'An unknown worm specimen shows: (i) distinct external rings, (ii) parapodia with setae on lateral sides, (iii) closed circulation, (iv) nephridia in each.', answer: 'Class Polychaeta (e.g., Nereis)',
                  options: ['Class Polychaeta (e.g., Nereis)', 'metameric segmentation', '"metameric segmentation" means only external rings (annuli)'],
                  hint: 'Revisit c11_bio_cbse_04_001 (Basis of Classification) sections 4.1.3, 4.1.4, 4.1.5 and draw the.',
                  misconception: 'Students often think "metameric segmentation" means only external rings (annuli).' },
                { id: 'b', prompt: 'Compare the excretory structures of Platyhelminthes (flame cells), Aschelminthes (excretory tube), and Annelida (nephridia).', answer: 'Flame cells (protonephridia) in acoelomates filter interstitial fluid',
                  options: ['Flame cells (protonephridia) in acoelomates filter interstitial fluid', 'metameric segmentation', '"metameric segmentation" means only external rings (annuli)'],
                  hint: 'Revisit c11_bio_cbse_04_001 (Basis of Classification) sections 4.1.3, 4.1.4, 4.1.5 and draw the.',
                  misconception: 'Students often think "metameric segmentation" means only external rings (annuli).' }
          ],
            remediations: { 'metameric-segmentation-means-only-external': { steps: ['Draw a cross-section of an earthworm segment showing coelom, gut, ventral nerve cord, nephridium, and.', 'Label which structures are repeated in each segment (nephridium, nerve ganglion, blood vessel loops).', 'Contrast with a leech cross-section — note reduced coelom (botryoidal tissue) and fixed segment number.', 'Write one-sentence definition: "True metamerism = internal organ repetition, not just external rings."'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_04_009', difficulty: 'standard',
          question: 'Phylum Arthropoda is the largest phylum in Animalia, characterized.',
          hint: 'Revisit c11_bio_cbse_04_008 (Annelida) for segmentation and coelom, and.',
          misconception: 'Students believe that "arthropods have an open circulatory system so their blood (haemolymph) carries oxygen like.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Phylum Arthropoda is the largest phylum in Animalia, characterized by bilaterally',
                  options: ['Phylum Arthropoda is the largest phylum in Animalia, characterized by bilaterally', 'Symmetry refers to the geometric arrangement of body parts around a central axis,', 'Levels of organisation in animals describe the hierarchical complexity of structural and', 'Phylum Porifera consists of primitive, multicellular, mostly marine animals (sponges)'],
                  hint: 'Revisit c11_bio_cbse_04_008 (Annelida) for segmentation and coelom, and c11_bio_cbse_04_001 (Basis.',
                  misconception: 'Students believe that "arthropods have an open circulatory system so their blood (haemolymph) carries oxygen like vertebrate blood" - they.' }
          ],
            remediations: { 'arthropods-have-an-open-circulatory': { steps: ['Have student observe a live cockroach or grasshopper - note spiracles on thorax/abdomen sides.', 'Trace the tracheal tubes (visible in dissected specimen or diagram) branching into finer tracheoles ending at muscle.', 'Compare with prawn gills where haemolymph flows through lamellae for gas exchange.', 'Explicitly state: "Insect blood is NOT red, does not carry O2; tracheal system does that job."'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_04_010', difficulty: 'standard',
          question: 'Phylum Mollusca comprises bilaterally symmetrical, triploblastic, coelomate.',
          hint: 'Revisit c11_bio_cbse_04_001 (Basis of Classification) sections 4.1.3.',
          misconception: 'Students believe "all molluscs have a radula" and "all molluscs have an external shell." Bivalvia (clams, oysters.',
          parts: [
                { id: 'a', prompt: 'Compare the circulatory systems of a typical gastropod (Pila) and a cephalopod (Octopus).', answer: 'Gastropods have an open circulatory system: heart pumps haemolymph into sinuses',
                  options: ['Gastropods have an open circulatory system: heart pumps haemolymph into sinuses', 'both are open because they are molluscs', 'all molluscs have a radula', 'all molluscs have an external shell'],
                  hint: 'Revisit c11_bio_cbse_04_001 (Basis of Classification) sections 4.1.3 (Diploblastic/Triploblastic).',
                  misconception: 'Students believe "all molluscs have a radula" and "all molluscs have an external shell." Bivalvia (clams, oysters, mussels) completely lack.' }
          ],
            remediations: { 'all-molluscs-have-a-radula': { steps: ['Create a comparison table with columns: Class, Shell (external/internal/absent), Radula (present/absent/modified), Foot.', 'Watch a 2-minute video of bivalve filter-feeding (ctenidia creating water current) and cephalopod hunting (arms, beak.', 'Re-draw the basic molluscan body plan and use coloured overlays to show what is LOST or MODIFIED in each class — this.'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_04_011', difficulty: 'standard',
          question: 'Phylum Echinodermata includes exclusively marine, triploblastic, coelomate.',
          hint: 'If stuck, review c11_bio_cbse_04_001 sections 4.1.3 (Diploblastic/Triploblastic) and.',
          misconception: 'Students often think "radial symmetry in echinoderms means they are primitive or related to Cnidaria" because both show.',
          parts: [
                { id: 'a', prompt: 'Compare the digestive system of Echinodermata with that of Platyhelminthes and Annelida.', answer: 'Annelida shares the complete digestive system (two openings) with Echinodermata',
                  options: ['Annelida shares the complete digestive system (two openings) with Echinodermata', 'all three have complete systems', 'radial symmetry requires a central mouth only', 'radial symmetry in echinoderms means they are primitive or related to Cnidaria'],
                  hint: 'If stuck, review c11_bio_cbse_04_001 sections 4.1.3 (Diploblastic/Triploblastic) and 4.1.4 (Coelom).',
                  misconception: 'Students often think "radial symmetry in echinoderms means they are primitive or related to Cnidaria" because both show radial symmetry.' }
          ],
            remediations: { 'radial-symmetry-in-echinoderms-means': { steps: ['Revisit c11_bio_cbse_04_001 (Basis of Classification) — compare the symmetry, germ layers, and coelom columns for.', 'Draw the life cycle of Asterias showing bilaterally symmetrical bipinnaria/brachiolaria larva transforming into.', 'Write a one-sentence distinction: "Echinoderm radial symmetry is secondary and pentamerous; cnidarian radial symmetry.', 'Explain to a peer why the water vascular system (absent in Cnidaria) is a deuterostome innovation.'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_04_012', difficulty: 'standard',
          question: 'Phylum Hemichordata comprises a small group of exclusively marine, worm-like.',
          hint: 'If stuck, revisit c11_bio_cbse_04_001 (Basis of Classification) for coelom/germ layer.',
          misconception: 'Students believe the stomochord *is* a notochord (hence "Hemichordata = half notochord") and that hemichordates possess.',
          parts: [
                { id: 'a', prompt: 'State the three distinct body regions of a hemichordate (e.g., Balanoglossus) and name the structure in the collar region that was historically confused with.', answer: 'The three regions are proboscis, collar, and trunk',
                  options: ['The three regions are proboscis, collar, and trunk', 'head, thorax, abdomen', 'notochord in collar', 'Hemichordata = half notochord'],
                  hint: 'If stuck, revisit c11_bio_cbse_04_001 (Basis of Classification) for coelom/germ layer definitions.',
                  misconception: 'Students believe the stomochord *is* a notochord (hence "Hemichordata = half notochord") and that hemichordates possess a dorsal hollow.' },
                { id: 'b', prompt: 'A student observes a marine worm with bilateral symmetry, a true coelom, pharyngeal gill slits, and an open circulatory system.', answer: 'Phylum Hemichordata',
                  options: ['Phylum Hemichordata', 'Hemichordata = half notochord'],
                  hint: 'If stuck, revisit c11_bio_cbse_04_001 (Basis of Classification) for coelom/germ layer definitions.',
                  misconception: 'Students believe the stomochord *is* a notochord (hence "Hemichordata = half notochord") and that hemichordates possess a dorsal hollow.' }
          ],
            remediations: { 'the-stomochord-is-a-notochord': { steps: ['Draw a cross-section of the collar region of Balanoglossus labeling ectoderm, stomochord lumen (continuous with buccal.', 'Contrast with a chordate cross-section showing mesodermal notochord, dorsal hollow nerve cord (ectodermal), and gut.', 'Use the mnemonic "STOMO = STOModaeal (ectodermal origin) vs NOTO = NOTochord (mesodermal origin)" to lock the.', 'Re-attempt Diagnostic Question 2.'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
