import type { SimDef } from '../../engine/types';
import C11_BiologyPlantTransportTranspirationSim from '../../../simulations/three/C11_BiologyPlantTransportTranspirationSim';

/** v3 wrapped master — C11_BiologyPlantTransportTranspirationSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_biologyplanttransporttranspirationsim: SimDef = {
    id: 'v3w_c11_biologyplanttransporttranspirationsim',
    title: 'Plant Tissues: Meristematic and Permanent',
    subtitle: 'This node covers the fundamental classification of plant tissues, characteristics of.',
    classLevel: 11, subject: 'biology', topic: 'Plant Tissues: Meristematic and Permanent',
    chapters: [],
    nodeIds: ['c11_bio_cbse_06_001', 'c11_bio_cbse_06_003', 'c11_bio_cbse_13_003', 'c11_bio_cbse_03_004', 'c11_bio_cbse_06_002', 'c11_bio_cbse_06_004', 'c11_bio_cbse_06_005', 'c11_bio_cbse_06_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Observe a young mango sapling in your garden: its stem thickens each year, new leaves appear at the tip, and.', goal: 'Master Plant Tissues: Meristematic and Permanent.' },
    discovery: {
        question: 'Design a simple experiment using a potted herbaceous plant (e.g., *Coleus* or *Balsam*) and a water-soluble dye (e.g., eosin) to demonstrate that xylem, not.',
        options: ['**Procedure**: (1) Cut the stem underwater to avoid air entry', 'check phloem for dye', 'use radioactive carbon for water transport'],
        answer: '**Procedure**: (1) Cut the stem underwater to avoid air entry',
        hook: 'Students frequently believe **phloem transports water and minerals along with food** because "sap" is a liquid.',
    },
    teaching: [
        { title: 'Plant tissues are groups of structurally and.', text: 'Plant tissues are groups of structurally and functionally similar cells that originate from a common meristematic origin; they are broadly classified into **meristematic tissues** (composed of.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_bio_cbse_06_001', title: 'Plant tissues are groups of.',
          scaffold: { problem: 'A botanist observes that the stem of a 5‑year‑old mango tree (dicot) has increased significantly in girth compared to a 1‑year‑old sapling.',
            steps: [
            { text: 'Recognize that increase in girth (thickness) is secondary growth, not primary elongation.' },
            { text: 'Recall that lateral meristems — vascular cambium and cork cambium — drive secondary growth.' },
            { text: 'In dicot stems, vascular cambium arises from parenchyma between xylem and phloem (intrafascicular) and from medullary.' },
            { text: 'Vascular cambium divides periclinally to produce secondary xylem (wood) toward the inside and secondary phloem toward.' },
            { text: 'Conclude that the accumulation of secondary xylem over years forms the bulk of the trunk, explaining the observed girth.', faded: true, blankAnswer: 'The vascular cambium (a lateral meristem) is responsible..' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_06_003', title: 'Complex tissues are heterogeneous.',
          scaffold: { problem: 'A transverse section of a young sunflower (dicot) stem shows vascular bundles arranged in a ring.',
            steps: [
            { text: 'Observe xylem and phloem on the same radius → **conjoint** vascular bundle.' },
            { text: 'Identify cambium between xylem and phloem → **open** vascular bundle (capable of secondary growth).' },
            { text: 'Note protoxylem (first-formed, smaller) towards centre (pith) and metaxylem (later-formed, larger) towards periphery →.' },
            { text: 'Recall cambium is a lateral meristem; its periclinal divisions produce secondary xylem (wood) inward and secondary.' },
            { text: 'Synthesize: Conjoint, open, endarch vascular bundle typical of dicot stems; cambium enables secondary growth.', faded: true, blankAnswer: 'Conjoint open vascular bundle with endarch xylem.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_13_003', title: 'Auxins are a class of plant growth.',
          scaffold: { problem: 'A gardener in Bengaluru wants to propagate a prized rose variety using stem cuttings.',
            steps: [
            { text: 'Identify the goal - adventitious root initiation at the basal cut end of a stem cutting.' },
            { text: 'Recall auxin function: "help to initiate rooting in stem cuttings" (NCERT).' },
            { text: 'Compare stability: IAA is rapidly degraded by light and IAA-oxidase in plants; NAA is more stable, resistant to.' },
            { text: 'Determine concentration: Rooting requires low µM range (typically 500-2000 ppm for powder dip, or 50-100 µM in.' },
            { text: 'Eliminate 2,4-D: It is a potent synthetic auxin used as herbicide (kills dicots like rose); even at low doses it causes.' },
            { text: 'Conclude: Use NAA at 1000-2000 ppm talc powder dip on cut end. IAA works but less reliable due to degradation.', faded: true, blankAnswer: 'Use NAA (naphthalene acetic acid) at 1000-2000 ppm as talc.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_03_004', title: 'Bryophytes are non-vascular,.',
          scaffold: { problem: 'A botanist collects a bryophyte specimen from a moist rock in the Nilgiris.',
            steps: [
            { text: 'Observe the gametophyte morphology — dorsiventral, dichotomously branched thallus indicates a thalloid liverwort, not a.' },
            { text: 'Note the asexual reproductive structure — gemma cups on dorsal surface are characteristic of *Marchantia* (a complex.' },
            { text: 'Examine rhizoids — unicellular and smooth-walled confirms liverwort (mosses have multicellular rhizoids with oblique.' },
            { text: 'Analyze sporophyte — short seta, spherical capsule dehiscing by splitting (not operculum+peristome) with elaters for.' },
            { text: 'Synthesize: All features match *Marchantia* (a liverwort). The presence of elaters (absent in mosses) and gemma cups.', faded: true, blankAnswer: 'The specimen is *Marchantia* (a liverwort). Diagnostic.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_06_002', title: 'Simple permanent tissues are groups of.',
          scaffold: { problem: 'A student observes a T.S. of a young dicot stem (e.g., *Helianthus*) and sees a 3-4 layered region just below the epidermis with cells.',
            steps: [
            { text: 'Observe location — hypodermis (cortex outer layer) in young stem.' },
            { text: 'Note cell wall description — "thickened corners" indicates uneven primary wall thickening, not uniform secondary wall.' },
            { text: 'Recall wall chemistry — corner thickening deposits extra cellulose and pectin (primary wall materials), not lignin.' },
            { text: 'Recall living status — hypodermal cells in young stem are living, metabolically active.' },
            { text: 'Match to tissue type — living + uneven primary thickening = collenchyma (angular type).' },
            { text: 'State function — provides flexible tensile support to elongating stem.', faded: true, blankAnswer: 'The tissue is collenchyma (angular), not sclerenchyma..' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_06_004', title: 'The root anatomy of dicotyledonous and.',
          scaffold: { problem: 'A farmer notices that his wheat crop (monocot) wilts faster than his mustard crop (dicot) during a dry spell, even though both are.',
            steps: [
            { text: 'Identify the root type of wheat (monocot) and mustard (dicot).' },
            { text: 'Recall that monocot roots have polyarch xylem (>6 arms) with narrow vessels and a large central pith, while dicot roots.' },
            { text: 'Apply the Hagen-Poiseuille principle: hydraulic conductivity is proportional to the fourth power of vessel radius.' },
            { text: 'Consider that monocot roots lack secondary growth, so they cannot add new xylem to compensate for cavitation during.' },
            { text: 'Conclude that mustard\'s dicot root anatomy provides higher hydraulic conductivity and plasticity, delaying wilting.', faded: true, blankAnswer: 'Mustard (dicot) roots have fewer but wider xylem vessels.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_06_003', title: 'Identify each idea',
          dissect: { specimen: 'Plant Tissues: Meristematic and Permanent', spots: [
            { id: 's1', label: 'Plant tissues are groups of', prompt: 'Which idea is this? — Plant tissues are groups of structurally and functionally similar cells that originate.', answer: 'Plant tissues are groups of', options: ['Plant tissues are groups of', 'Complex tissues are heterogeneous tissues', 'Auxins are a class of', 'Bryophytes are non-vascular terrestrial embryophytes'] },
            { id: 's2', label: 'Complex tissues are heterogeneous tissues', prompt: 'Which idea is this? — Complex tissues are heterogeneous tissues composed of more than one type of cell that.', answer: 'Complex tissues are heterogeneous tissues', options: ['Complex tissues are heterogeneous tissues', 'Plant tissues are groups of', 'Auxins are a class of', 'Bryophytes are non-vascular terrestrial embryophytes'] },
            { id: 's3', label: 'Auxins are a class of', prompt: 'Which idea is this? — Auxins are a class of plant growth regulators (phytohormones) chemically characterized as.', answer: 'Auxins are a class of', options: ['Auxins are a class of', 'Plant tissues are groups of', 'Complex tissues are heterogeneous tissues', 'Bryophytes are non-vascular terrestrial embryophytes'] },
            { id: 's4', label: 'Bryophytes are non-vascular terrestrial embryophytes', prompt: 'Which idea is this? — Bryophytes are non-vascular, terrestrial embryophytes in which the dominant, independent.', answer: 'Bryophytes are non-vascular terrestrial embryophytes', options: ['Bryophytes are non-vascular terrestrial embryophytes', 'Plant tissues are groups of', 'Complex tissues are heterogeneous tissues', 'Auxins are a class of'] },
            { id: 's5', label: 'Simple permanent tissues are groups', prompt: 'Which idea is this? — Simple permanent tissues are groups of structurally and functionally similar cells that.', answer: 'Simple permanent tissues are groups', options: ['Simple permanent tissues are groups', 'Plant tissues are groups of', 'Complex tissues are heterogeneous tissues', 'Auxins are a class of'] },
            { id: 's6', label: 'The root anatomy of dicotyledonous', prompt: 'Which idea is this? — The root anatomy of dicotyledonous and monocotyledonous plants refers to the internal.', answer: 'The root anatomy of dicotyledonous', options: ['The root anatomy of dicotyledonous', 'Plant tissues are groups of', 'Complex tissues are heterogeneous tissues', 'Auxins are a class of'] }
          ] } }
    ],
    explore: { component: C11_BiologyPlantTransportTranspirationSim, prompt: 'Explore the interactive — Plant Tissues: Meristematic and Permanent' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_06_001', difficulty: 'standard',
          question: 'Plant tissues are groups of structurally and functionally similar cells that.',
          hint: 'Review Class 9 mitosis (c9_bio_ch1_12) and the definition of tissue from Class 8.',
          misconception: 'Students believe that **meristematic tissue exists only at the root and shoot tips (apical meristem)** and are unaware.',
          parts: [
                { id: 'a', prompt: 'A student examines a transverse section of a young stem under a microscope and observes vascular bundles arranged in a distinct ring.', answer: 'The stem is **dicotyledonous**',
                  options: ['The stem is **dicotyledonous**', 'monocot'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that **meristematic tissue exists only at the root and shoot tips (apical meristem)** and are unaware of lateral meristem.' }
          ],
            remediations: { 'meristematic-tissue-exists-only-at': { steps: ['Observe a cross-section of a young dicot stem (e.g., sunflower) and an older stem; identify the vascular cambium ring.', 'Grow wheat or grass in a tray, cut the shoots 2 cm above soil, and monitor regrowth from the basal nodes over a week.', 'Relate observations to the three meristem types: apical (tip), lateral (cambium ring), intercalary (base of nodes).', 'Re-read the definitions of each meristem type and write one functional sentence for each in your own words.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_06_003', difficulty: 'standard',
          question: 'Complex tissues are heterogeneous tissues composed of more than one type of.',
          hint: 'If stuck, immediately review c11_bio_cbse_06_002 (Simple Tissues) focusing on: (a).',
          misconception: 'Students frequently believe **phloem transports water and minerals along with food** because "sap" is a liquid.',
          parts: [
                { id: 'a', prompt: 'List the four components of xylem and identify which component is the principal water-conducting element in flowering plants (angiosperms).', answer: 'The four components are tracheids, vessels, xylem parenchyma, and xylem fibres',
                  options: ['The four components are tracheids, vessels, xylem parenchyma, and xylem fibres', 'tracheids are the main conductors in angiosperms'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently believe **phloem transports water and minerals along with food** because "sap" is a liquid.' },
                { id: 'b', prompt: 'Sieve tube elements are living at maturity but lack a nucleus, while companion cells have dense cytoplasm and a prominent nucleus.', answer: 'Sieve tube elements lose their nucleus and most organelles to form an open,',
                  options: ['Sieve tube elements lose their nucleus and most organelles to form an open,', 'both are dead like xylem vessels'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently believe **phloem transports water and minerals along with food** because "sap" is a liquid.' }
          ],
            remediations: { 'students-frequently-believe-phloem-transports': { steps: ['**Revisit Simple Tissues (c11_bio_cbse_06_002)**: Make a 4x2 table comparing the four xylem components and four phloem.', '**Slide Observation**: Examine prepared T.S.', 'of sunflower (dicot) and maize (monocot) stems.', 'Physically point to xylem (stained red with safranin) and phloem (stained green with fast green) in each bundle.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_06_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently believe **phloem transports water and minerals along with food** because "sap" is a liquid.',
          parts: [
                { id: 'a', prompt: 'Design a simple experiment using a potted herbaceous plant (e.g., *Coleus* or *Balsam*) and a water-soluble dye (e.g., eosin) to demonstrate that xylem, not.', answer: '**Procedure**: (1) Cut the stem underwater to avoid air entry',
                  options: ['**Procedure**: (1) Cut the stem underwater to avoid air entry', 'check phloem for dye', 'use radioactive carbon for water transport'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently believe **phloem transports water and minerals along with food** because "sap" is a liquid.' }
          ],
            remediations: { 'students-frequently-believe-phloem-transports': { steps: ['**Revisit Simple Tissues (c11_bio_cbse_06_002)**: Make a 4x2 table comparing the four xylem components and four phloem.', '**Slide Observation**: Examine prepared T.S.', 'of sunflower (dicot) and maize (monocot) stems.', 'Physically point to xylem (stained red with safranin) and phloem (stained green with fast green) in each bundle.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_13_003', difficulty: 'standard',
          question: 'Auxins are a class of plant growth regulators (phytohormones) chemically.',
          hint: 'Revisit c10_bio_cbse_02_005 (phototropism) and the agar block bioassay diagram -.',
          misconception: 'Students believe "auxin *causes* apical dominance by directly inhibiting lateral bud cells." The error: auxin from the.',
          parts: [
                { id: 'a', prompt: 'Name the natural auxin first isolated from human urine and the two synthetic auxins widely used in horticulture and as herbicides.', answer: 'Natural auxin: Indole-3-acetic acid (IAA)',
                  options: ['Natural auxin: Indole-3-acetic acid (IAA)', 'auxin *causes* apical dominance by directly inhibiting lateral bud cells', '"auxin *causes* apical dominance by directly inhibiting lateral bud cells'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "auxin *causes* apical dominance by directly inhibiting lateral bud cells." The error: auxin from the apex does NOT enter.' }
          ],
            remediations: { 'auxin-causes-apical-dominance-by': { steps: ['Re-read NCERT Fig 13.11 - note auxin is applied to *decapitated stump*, not lateral buds.', 'Perform the "two-bud experiment" mentally: (a) decapitate → lateral buds grow; (b) decapitate + auxin paste on stump →.', 'Conclude auxin\'s site of action is the stem, not the bud.', 'Link to "nutrient diversion" - high auxin in stem makes it a stronger sink, starving buds.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_13_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "auxin *causes* apical dominance by directly inhibiting lateral bud cells." The error: auxin from the.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Apical dominance proves auxin is the only hormone controlling lateral bud growth." Provide evidence from cytokinin interactions.', answer: 'The statement is false',
                  options: ['The statement is false', 'PGRs act synergistically or antagonistically', 'auxin *causes* apical dominance by directly inhibiting lateral bud cells', '"auxin *causes* apical dominance by directly inhibiting lateral bud cells'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "auxin *causes* apical dominance by directly inhibiting lateral bud cells." The error: auxin from the apex does NOT enter.' }
          ],
            remediations: { 'auxin-causes-apical-dominance-by': { steps: ['Re-read NCERT Fig 13.11 - note auxin is applied to *decapitated stump*, not lateral buds.', 'Perform the "two-bud experiment" mentally: (a) decapitate → lateral buds grow; (b) decapitate + auxin paste on stump →.', 'Conclude auxin\'s site of action is the stem, not the bud.', 'Link to "nutrient diversion" - high auxin in stem makes it a stronger sink, starving buds.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_03_004', difficulty: 'standard',
          question: 'Bryophytes are non-vascular, terrestrial embryophytes in which the dominant,.',
          hint: 'If stuck, revisit c9_bio_ch1_12 (Meiosis) and c10_bio_cbse_03_007 (Fertilisation in.',
          misconception: 'Students often think the \'leafy\' stage of a moss is the sporophyte because it looks like a tiny plant with stem and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Bryophytes are non-vascular, terrestrial embryophytes in',
                  options: ['Bryophytes are non-vascular, terrestrial embryophytes in', 'Plant tissues are groups of structurally and functionally similar cells that originate', 'Complex tissues are heterogeneous tissues composed of more than one type of cell that', 'Auxins are a class of plant growth regulators (phytohormones) chemically characterized as'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the \'leafy\' stage of a moss is the sporophyte because it looks like a tiny plant with stem and leaves.' }
          ],
            remediations: { 'the-leafy-stage-of-a': { steps: ['Re-read the NCERT description of moss life cycle (Section 3.2.2) focusing on the phrase "The predominant stage of the.', 'Draw a two-column table: Column A = Moss Gametophyte (protonema → leafy gametophore), Column B = Moss Sporophyte (foot,.', 'Obtain a prepared slide of *Funaria* antheridium and archegonium (or use virtual microscopy) — identify the.', 'Explain aloud: "The green leafy plant is haploid and makes gametes; the brown stalk is diploid and makes spores." This.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_06_002', difficulty: 'standard',
          question: 'Simple permanent tissues are groups of structurally and functionally similar.',
          hint: 'If stuck, review c9_bio_ch1_4 (Cell Wall) for wall layers and polymers, and c9_bio_ch2_1.',
          misconception: 'Students believe "collenchyma and sclerenchyma are both mechanical tissues, so they are interchangeable." They fail to.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Simple permanent tissues are groups of structurally and functionally similar cells that',
                  options: ['Simple permanent tissues are groups of structurally and functionally similar cells that', 'Plant tissues are groups of structurally and functionally similar cells that originate', 'Complex tissues are heterogeneous tissues composed of more than one type of cell that', 'Auxins are a class of plant growth regulators (phytohormones) chemically characterized as'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "collenchyma and sclerenchyma are both mechanical tissues, so they are interchangeable." They fail to grasp that.' }
          ],
            remediations: { 'collenchyma-and-sclerenchyma-are-both': { steps: ['Revisit Class 9 distinction: primary vs.', 'secondary wall deposition (c9_bio_ch1_4).', 'Perform a hands-on activity: bend a fresh *Cucurbita* petiole (collenchyma snaps back) vs.', 'a dry *Luffa* fiber network (sclerenchyma fractures).'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_06_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "collenchyma and sclerenchyma are both mechanical tissues, so they are interchangeable." They fail to.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Since sclerenchyma fibers are dead, they are metabolically useless to the plant." Provide two counterarguments with specific examples.', answer: 'Claim is false',
                  options: ['Claim is false', 'metabolic activity', 'functional value'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "collenchyma and sclerenchyma are both mechanical tissues, so they are interchangeable." They fail to grasp that.' }
          ],
            remediations: { 'collenchyma-and-sclerenchyma-are-both': { steps: ['Revisit Class 9 distinction: primary vs.', 'secondary wall deposition (c9_bio_ch1_4).', 'Perform a hands-on activity: bend a fresh *Cucurbita* petiole (collenchyma snaps back) vs.', 'a dry *Luffa* fiber network (sclerenchyma fractures).'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_06_004', difficulty: 'standard',
          question: 'The root anatomy of dicotyledonous and monocotyledonous plants refers to the.',
          hint: 'Revisit c11_bio_cbse_06_003 (Complex Tissues: Xylem and Phloem) and practice identifying.',
          misconception: 'Students often think that the "polyarch" condition in monocot roots means they have "more vascular bundles" like.',
          parts: [
                { id: 'a', prompt: 'Name the innermost layer of the cortex in roots and state the chemical nature of the thickenings on its radial and tangential walls.', answer: 'The innermost layer of the cortex is the endodermis',
                  options: ['The innermost layer of the cortex is the endodermis', 'epidermis', 'lignin'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the "polyarch" condition in monocot roots means they have "more vascular bundles" like monocot stems.' },
                { id: 'b', prompt: 'A transverse section of a root shows 12 xylem arms alternating with 12 phloem patches, a large central pith, and no cambium between xylem and phloem.', answer: 'This is a monocot root',
                  options: ['This is a monocot root', 'dicot root', 'polyarch'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the "polyarch" condition in monocot roots means they have "more vascular bundles" like monocot stems.' }
          ],
            remediations: { 'the-polyarch-condition-in-monocot': { steps: ['To fix this, have the student draw side-by-side: (1) T.S.', 'of monocot stem (maize) showing scattered conjoint closed bundles with sclerenchymatous bundle sheaths, (2) T.S.', 'of monocot root (maize) showing polyarch radial bundles without bundle sheaths.', 'Emphasize: roots = radial, stems = conjoint.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_06_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that the "polyarch" condition in monocot roots means they have "more vascular bundles" like.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Monocot roots have more xylem arms than dicot roots, so they must conduct water more efficiently." Evaluate this statement considering.', answer: 'The claim is not necessarily true',
                  options: ['The claim is not necessarily true', 'polyarch', 'more vascular bundles'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the "polyarch" condition in monocot roots means they have "more vascular bundles" like monocot stems.' },
                { id: 'b', prompt: 'Design a simple microscopic experiment using temporary mounts to distinguish between a dicot and monocot root from unlabelled slides.', answer: '(1) Cut thin transverse sections of both roots using a razor blade',
                  options: ['(1) Cut thin transverse sections of both roots using a razor blade', 'polyarch', 'more vascular bundles'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the "polyarch" condition in monocot roots means they have "more vascular bundles" like monocot stems.' }
          ],
            remediations: { 'the-polyarch-condition-in-monocot': { steps: ['To fix this, have the student draw side-by-side: (1) T.S.', 'of monocot stem (maize) showing scattered conjoint closed bundles with sclerenchymatous bundle sheaths, (2) T.S.', 'of monocot root (maize) showing polyarch radial bundles without bundle sheaths.', 'Emphasize: roots = radial, stems = conjoint.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
