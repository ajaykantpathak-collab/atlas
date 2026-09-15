import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bio_ch04_p3 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bio_ch04_p3: SimDef = {
    id: 'v3_c11_bio_ch04_p3',
    title: 'Animal Kingdom · Part 3/3',
    subtitle: 'Use symmetry, germ layers, and body cavity as three independent sieves for the animal kingdom.',
    classLevel: 11, subject: 'biology', topic: 'Animal Kingdom · Part 3/3',
    chapters: ['c11_bio_ch04'],
    nodeIds: ['c11_bio_cbse_04_013', 'c11_bio_cbse_04_014'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a zoologist triaging deep-sea specimens nobody has classified', intro: 'Three preserved specimens, one decision tree. The wrong assumption — that bilateral always means coelomate — will misfile half your tray.', goal: 'Classify animals by level of organisation, symmetry, germ-layer count, and coelom type, catching traps like acoelomate flatworms and pseudocoelomate roundworms.' },
    discovery: {
        question: 'A starfish slices into identical halves along any of five planes and has a true mesoderm-lined body cavity. Most students file it as \'simple, primitive, diploblastic\'. What makes that classification wrong?',
        options: ['Adult starfish are triploblastic coelomates — their radial symmetry is secondary, evolved from bilateral ancestors', 'Starfish actually have bilateral symmetry; the five arms are an illusion', 'Starfish lack a body cavity entirely', 'Starfish have no symmetry at all'],
        answer: 'Adult starfish are triploblastic coelomates — their radial symmetry is secondary, evolved from bilateral ancestors',
        hook: 'Symmetry, germ layers, and coelom are independent axes — assuming they always come as a package is how starfish end up misfiled.',
    },
    teaching: [
        { title: 'Phylum Chordata: Vertebrates and Protochordates', text: 'Phylum Chordata is defined by the presence of four fundamental features at some stage of life: a flexible, rod-like notochord derived from mesoderm, a dorsal hollow nerve cord, paired pharyngeal gill.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bio_cbse_04_013', title: 'Your mission',
          mission: { widget: 'reflex', validate: 'reflex:speed=70',
            instruction: 'On the lab: speed up the signal — how fast does the reflex fire?.',
        context: 'Run three animals — a sponge, a roundworm, an earthworm — through the classification filter of symmetry, germ layers, and coelom, then place a mystery marine worm whose cavity is lined by mesoderm on one side only.',
            observePrompt: 'What did the reflex interactive show you?' } },
        { type: 'case', nodeId: 'c11_bio_cbse_04_013', title: 'Phylum Chordata: Vertebrates and Protochordates',
          caseStudy: { intro: 'Observe a tadpole swimming in a pond — it has a distinct tail, gill slits, and a flexible rod supporting its body.',
            decisions: [{ prompt: 'State the four fundamental characteristics that define Phylum Chordata and specify the germ layer origin of the notochord.', options: [
                { text: 'The four fundamental characteristics are: (1) notochord (mesodermal in origin), (2)', outcome: 'The four fundamental characteristics are: (1) notochord (mesodermal in origin), (2) dorsal hollow.' },
                { text: 'ventral nerve cord', outcome: 'Not quite — Students often think "protochordates are primitive vertebrates" or "lower chordates that will.', reveals: 'protochordates-are-primitive-vertebrates-or' },
                { text: 'solid nerve cord', outcome: 'Not quite — Students often think "protochordates are primitive vertebrates" or "lower chordates that will.', reveals: 'protochordates-are-primitive-vertebrates-or' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_04_014', title: 'Identify each idea',
          dissect: { specimen: 'Animal Kingdom · Part 3/3', spots: [
            { id: 's1', label: 'Phylum Chordata Vertebrates and Protochordates', prompt: 'Which idea is this? — Phylum Chordata is defined by the presence of four fundamental features at some stage.', answer: 'Phylum Chordata Vertebrates and Protochordates', options: ['Phylum Chordata Vertebrates and Protochordates', 'Classes of Vertebrates Fish to Mammals'] },
            { id: 's2', label: 'Classes of Vertebrates Fish to Mammals', prompt: 'Which idea is this? — The subphylum Vertebrata is divided into seven classes based on progressive evolutionary.', answer: 'Classes of Vertebrates Fish to Mammals', options: ['Classes of Vertebrates Fish to Mammals', 'Phylum Chordata Vertebrates and Protochordates'] }
          ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_04_013', title: 'Use it in the wild',
          caseStudy: { intro: 'At a marine museum\'s touch-tank exhibit you\'re asked to place mystery specimens into phylum bins using only symmetry, germ layers and coelom: a starfish (five arms, radial), a flatworm (bilateral, no body cavity), a roundworm (bilateral, cavity not fully lined by mesoderm) and an earthworm (segmented, true mesoderm-lined cavity). A volunteer assumes \'radial = simple diploblastic like jellyfish\' and files the starfish with cnidarians.',
            decisions: [{ prompt: 'Where did the filing go wrong?', options: [
                { text: 'The starfish is a triploblastic coelomate whose radial symmetry is secondary — adults radiate but the phylum sits with the coelomates (Echinodermata). Flatworm = triploblastic acoelomate, roundworm = pseudocoelomate, earthworm = coelomate; symmetry alone never fixes the phylum.', outcome: 'The three criteria act as a filter in sequence — symmetry, then germ layers, then coelom — and adult radial symmetry can sit on a fully triploblastic, coelomate body plan.' },
                { text: 'The volunteer is right — radial symmetry always pairs with diploblastic organisation.', outcome: 'Echinoderms are the standing counter-example: radial adults, triploblastic development, true coelom. One-to-one mapping between symmetry and germ layers is a memorisation shortcut, not a rule.', reveals: 'radial-means-diploblastic' },
                { text: 'Flatworm and roundworm are interchangeable — bilateral means coelomate in both.', outcome: 'Bilateral triploblasts split three ways by cavity: flatworms acoelomate, roundworms pseudocoelomate, annelids onward coelomate — the cavity criterion does the separating.', reveals: 'bilateral-means-coelomate' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_04_014', title: 'You made it',
          caseStudy: { intro: 'You stopped treating classification criteria as a bundle. Three independent filters — symmetry, germ layers, coelom — sort a million species cleanly.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'reflex', prompt: 'Explore the reflex interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'reflex', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_04_013', difficulty: 'standard',
          question: 'Phylum Chordata is defined by the presence of four fundamental features at some.',
          hint: 'Revisit c11_bio_cbse_04_001 (Basis of Classification) for germ layers and coelom, and.',
          misconception: 'Students often think "protochordates are primitive vertebrates" or "lower chordates that will evolve into vertebrates.".',
          parts: [
                { id: 'a', prompt: 'Explain why the notochord in Urochordata is considered a larval feature while in Cephalochordata it is a persistent adult feature, and how this relates.', answer: 'Urochordates (e.g., Ascidia) are sessile filter-feeders as adults',
                  options: ['Urochordates (e.g., Ascidia) are sessile filter-feeders as adults', 'Urochordates lose notochord', 'protochordates are primitive vertebrates', 'lower chordates that will evolve into vertebrates'],
                  hint: 'Revisit c11_bio_cbse_04_001 (Basis of Classification) for germ layers and coelom, and.',
                  misconception: 'Students often think "protochordates are primitive vertebrates" or "lower chordates that will evolve into vertebrates." This teleological.' },
                { id: 'b', prompt: 'A marine biologist collects a small, fish-like animal with a notochord extending from head to tail, a dorsal hollow nerve cord, numerous pharyngeal gill slits.', answer: 'The animal belongs to Cephalochordata',
                  options: ['The animal belongs to Cephalochordata', 'Vertebrata', 'protochordates are primitive vertebrates', 'lower chordates that will evolve into vertebrates'],
                  hint: 'Revisit c11_bio_cbse_04_001 (Basis of Classification) for germ layers and coelom, and.',
                  misconception: 'Students often think "protochordates are primitive vertebrates" or "lower chordates that will evolve into vertebrates." This teleological.' },
                { id: 'c', prompt: 'Compare the circulatory and excretory systems of protochordates (Urochordata and Cephalochordata) with those of Vertebrata.', answer: 'Protochordates have a simple, ventral heart (if present) and lack kidneys',
                  options: ['Protochordates have a simple, ventral heart (if present) and lack kidneys', 'four-chambered heart', 'protochordates are primitive vertebrates', 'lower chordates that will evolve into vertebrates'],
                  hint: 'Revisit c11_bio_cbse_04_001 (Basis of Classification) for germ layers and coelom, and.',
                  misconception: 'Students often think "protochordates are primitive vertebrates" or "lower chordates that will evolve into vertebrates." This teleological.' }
          ],
            remediations: { 'protochordates-are-primitive-vertebrates-or': { steps: ['Draw a three-column table comparing Urochordata, Cephalochordata, Vertebrata across: notochord (larval/adult, extent).', 'Use the NCERT Figure 4.17 (Ascidia) and 4.16 (chordate characteristics) to visually trace notochord fate.', 'Write one sentence justifying "All vertebrates are chordates but all chordates are not vertebrates" using the table.', 'Re-attempt Diagnostic Question 3 and 4.'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_04_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "protochordates are primitive vertebrates" or "lower chordates that will evolve into vertebrates.".',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The presence of a stomochord in Hemichordata makes them chordates." Use evidence from germ layer origin and structural homology.', answer: 'The statement is false',
                  options: ['The statement is false', 'protochordates are primitive vertebrates', 'lower chordates that will evolve into vertebrates'],
                  hint: 'Revisit c11_bio_cbse_04_001 (Basis of Classification) for germ layers and coelom, and.',
                  misconception: 'Students often think "protochordates are primitive vertebrates" or "lower chordates that will evolve into vertebrates." This teleological.' }
          ],
            remediations: { 'protochordates-are-primitive-vertebrates-or': { steps: ['Draw a three-column table comparing Urochordata, Cephalochordata, Vertebrata across: notochord (larval/adult, extent).', 'Use the NCERT Figure 4.17 (Ascidia) and 4.16 (chordate characteristics) to visually trace notochord fate.', 'Write one sentence justifying "All vertebrates are chordates but all chordates are not vertebrates" using the table.', 'Re-attempt Diagnostic Question 3 and 4.'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_04_014', difficulty: 'standard',
          question: 'The subphylum Vertebrata is divided into seven classes based on progressive.',
          hint: 'Revisit c11_bio_cbse_04_013 for chordate/vertebrate defining features and.',
          misconception: 'Students frequently confuse Chondrichthyes and Osteichthyes by thinking both have operculum and bony skeletons.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The subphylum Vertebrata is divided into seven classes based on progressive evolutionary',
                  options: ['The subphylum Vertebrata is divided into seven classes based on progressive evolutionary', 'Symmetry refers to the geometric arrangement of body parts around a central axis,', 'Levels of organisation in animals describe the hierarchical complexity of structural and', 'Phylum Porifera consists of primitive, multicellular, mostly marine animals (sponges)'],
                  hint: 'Revisit c11_bio_cbse_04_013 for chordate/vertebrate defining features and c11_bio_cbse_04_001 for.',
                  misconception: 'Students frequently confuse Chondrichthyes and Osteichthyes by thinking both have operculum and bony skeletons.' }
          ],
            remediations: { 'students-frequently-confuse-chondrichthyes-and': { steps: ['Draw a 2x3 comparison table on paper with columns for Chondrichthyes vs Osteichthyes and rows for Endoskeleton, Gill.', 'For reptile heart, create a flashcard: "Reptilia: 3-chambered (2 atria, 1 partially divided ventricle) EXCEPT.', 'Watch a 5-minute video of shark vs rohu gill dissection (virtual lab) to visualize operculum absence/presence.', 'Practice classifying 5 unnamed specimen descriptions from past board papers using only the key features.'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
