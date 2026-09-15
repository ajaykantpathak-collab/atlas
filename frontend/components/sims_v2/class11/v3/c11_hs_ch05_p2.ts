import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hs_ch05_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hs_ch05_p2: SimDef = {
    id: 'v3_c11_hs_ch05_p2',
    title: 'Fabric and Apparel · Part 2/2',
    subtitle: 'Unpick a fabric claim layer by layer — fibre to finish.',
    classLevel: 11, subject: 'home_science', topic: 'Fabric and Apparel · Part 2/2',
    chapters: ['c11_hs_ch05'],
    nodeIds: ['c11_hs_cbse_05_007', 'c11_hs_cbse_05_008', 'c11_hs_cbse_05_009', 'c11_hs_cbse_05_010', 'c11_hs_cbse_05_011', 'c11_hs_cbse_05_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a textile tester with a magnifier and a match', intro: 'A cotton kurta wrinkles and shrinks while a polyester saree survives three washes untouched — the fibre hierarchy explains why.', goal: 'Trace how fibre, yarn, weave and finish jointly determine fabric behaviour.' },
    discovery: {
        question: '\'100% polyester — cool and comfortable for Indian summers because it wicks moisture.\' Sound science?',
        options: ['No — polyester\'s moisture regain is ~0.4%; it can\'t absorb sweat, so skin stays clammy whatever the capillary marketing claims', 'Yes — wicking equals comfort', 'Yes — synthetics always beat naturals', 'No — polyester melts in heat'],
        answer: 'No — polyester\'s moisture regain is ~0.4%; it can\'t absorb sweat, so skin stays clammy whatever the capillary marketing claims',
        hook: 'Fibre alone doesn\'t decide behaviour — a loose cotton voile shrinks more than tight cotton denim; yarn, weave and finish rewrite the fibre\'s script.',
    },
    teaching: [
        { title: 'Manufactured Fibres: Regenerated Cellulosic and Synthetic Fibres', text: 'Manufactured fibres are textile fibres produced through industrial processes from either natural polymers (regenerated cellulosic/protein) or synthetic polymers (petrochemical derivatives), where the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hs_cbse_05_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run a visual-plus-burn test to sort an unknown fabric into cellulosic, protein or synthetic, then spec a school-uniform blend for humidity.',
        labels: ['Manufactured Fibres: Regenerated Cellulosic', 'Yarn Processing: Cleaning, Carding,', 'Fabric Production Methods: Weaving,', 'Textile Finishing: Objectives, Classification,', 'Burning Test for Fibre', 'Specialised Fabric Construction: Braiding,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hs_cbse_05_007', title: 'Manufactured Fibres: Regenerated Cellulosic and Synthetic Fibres',
          caseStudy: { intro: 'Imagine you\'re shopping for a summer kurta and see labels saying "100% viscose," "polyester blend," and "modal" — all feel silky but behave differently when.',
            decisions: [{ prompt: 'Name the three main categories of manufactured fibres based on raw material origin, and give one example of each with its generic name (not.', options: [
                { text: 'The three categories are: (1) Regenerated cellulosic fibres', outcome: 'The three categories are: (1) Regenerated cellulosic fibres — example: viscose rayon (raw material.' },
                { text: 'rayon, nylon, polyester', outcome: 'Not quite — Students conflate "manufactured" with "synthetic" and assume all factory-made fibres are.', reveals: 'students-conflate-manufactured-with-synthetic' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_05_008', title: 'Yarn Processing: Cleaning, Carding, Combing and Spinning',
          caseStudy: { intro: 'Imagine holding a cotton boll—fluffy, seed-laden, and chaotic. How does this become the smooth, strong thread in your school uniform?',
            decisions: [{ prompt: 'Name the six sequential stages of staple-fibre yarn processing from raw bale to ring-spun yarn, and state the primary output form (lap.', options: [
                { text: 'Correct sequence: 1) Cleaning/Blowroom → Lap (rolled sheet)', outcome: 'Correct sequence: 1) Cleaning/Blowroom → Lap (rolled sheet); 2) Carding → Card sliver; 3) Combing.' },
                { text: 'spinning', outcome: 'Not quite — Students believe "spinning" is the only real process and earlier stages (carding, drawing) are just.', reveals: 'spinning-is-the-only-real' },
                { text: '"spinning" first or omitting drawing', outcome: 'Not quite — Students believe "spinning" is the only real process and earlier stages (carding, drawing) are just.', reveals: 'spinning-is-the-only-real' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_05_009', title: 'Fabric Production Methods: Weaving, Knitting and Non-Woven Fabrics',
          caseStudy: { intro: 'Imagine you are choosing fabric for a sports jersey — it needs to stretch, breathe, and recover shape after movement.',
            decisions: [{ prompt: 'Define \'selvedge\' in a woven fabric and state its functional significance during fabric manufacturing and end-use.', options: [
                { text: 'Selvedge is the self-finished lengthwise edge of a woven fabric formed by the weft yarn', outcome: 'Selvedge is the self-finished lengthwise edge of a woven fabric formed by the weft yarn reversing.' },
                { text: 'the cut edge of fabric', outcome: 'Not quite — Students believe "knitted fabrics are always stretchy and woven fabrics never stretch." This arises.', reveals: 'knitted-fabrics-are-always-stretchy' },
                { text: 'the widthwise edge', outcome: 'Not quite — Students believe "knitted fabrics are always stretchy and woven fabrics never stretch." This arises.', reveals: 'knitted-fabrics-are-always-stretchy' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_05_010', title: 'Textile Finishing: Objectives, Classification, Dyeing and Printing',
          caseStudy: { intro: 'Imagine you are a textile designer in Jaipur creating a summer collection: you have grey cotton fabric from the loom that feels stiff, looks dull, and shrinks.',
            decisions: [{ prompt: 'State the three main functional categories of textile finishes based on the fabric property they modify, giving one example of a finish.', options: [
                { text: 'The three categories are: (1) Appearance-changing finishes – e.g., bleaching, calendering', outcome: 'The three categories are: (1) Appearance-changing finishes – e.g., bleaching, calendering; (2).' },
                { text: 'finishing', outcome: 'Not quite — Students believe "finishing" only means adding colour (dyeing/printing) and that all finishes are.', reveals: 'finishing-only-means-adding-colour' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_05_011', title: 'Burning Test for Fibre Identification',
          caseStudy: { intro: 'Imagine you find a beautiful vintage saree in your grandmother\'s trunk with no label—you need to know if it\'s pure silk, artificial silk (rayon), or.',
            decisions: [{ prompt: 'A student performs a burning test on an unknown fibre and observes: the fibre does not shrink away from the flame, catches fire.', options: [
                { text: 'The fibre is cellulosic—most likely cotton or linen (rayon also fits but is manufactured)', outcome: 'The fibre is cellulosic—most likely cotton or linen (rayon also fits but is manufactured).' },
                { text: 'protein fibre', outcome: 'Not quite — Students believe "burning test identifies the exact fibre name" (e.g., "this is Terylene") rather.', reveals: 'burning-test-identifies-the-exact' },
                { text: 'synthetic', outcome: 'Not quite — Students believe "burning test identifies the exact fibre name" (e.g., "this is Terylene") rather.', reveals: 'burning-test-identifies-the-exact' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_05_012', title: 'Specialised Fabric Construction: Braiding, Nets and Laces',
          caseStudy: { intro: 'Imagine you are packing for a sports tournament: your shoelaces (braids), the badminton net (net), and the delicate lace trim on your team\'s ceremonial sash.',
            decisions: [{ prompt: 'Define braiding, nets, and laces in one sentence each, highlighting the primary yarn manipulation technique for each.', options: [
                { text: 'Braiding: Diagonal plaiting of three or more parallel yarns originating from a single', outcome: 'Braiding: Diagonal plaiting of three or more parallel yarns originating from a single point.' },
                { text: 'twisting two yarns', outcome: 'Not quite — Students often confuse braiding with twisting/plying because both involve multiple yarns.', reveals: 'students-often-confuse-braiding-with' },
                { text: 'woven with large gaps', outcome: 'Not quite — Students often confuse braiding with twisting/plying because both involve multiple yarns.', reveals: 'students-often-confuse-braiding-with' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_hs_cbse_05_008', title: 'Identify each idea',
          dissect: { specimen: 'Fabric and Apparel · Part 2/2', spots: [
            { id: 's1', label: 'Yarn Processing Cleaning Carding Combing and Spinning', prompt: 'Which idea is this? — Yarn processing is the systematic sequence of mechanical operations—cleaning, carding.', answer: 'Yarn Processing Cleaning Carding Combing and Spinning', options: ['Yarn Processing Cleaning Carding Combing and Spinning', 'Burning Test for Fibre Identification', 'Specialised Fabric Construction Braiding Nets and Laces'] },
            { id: 's2', label: 'Burning Test for Fibre Identification', prompt: 'Which idea is this? — The burning test is a qualitative fibre identification technique that exploits the.', answer: 'Burning Test for Fibre Identification', options: ['Burning Test for Fibre Identification', 'Yarn Processing Cleaning Carding Combing and Spinning', 'Specialised Fabric Construction Braiding Nets and Laces'] },
            { id: 's3', label: 'Specialised Fabric Construction Braiding Nets and Laces', prompt: 'Which idea is this? — Specialised fabric constructions refer to non-woven, non-knitted textile structures.', answer: 'Specialised Fabric Construction Braiding Nets and Laces', options: ['Specialised Fabric Construction Braiding Nets and Laces', 'Yarn Processing Cleaning Carding Combing and Spinning', 'Burning Test for Fibre Identification'] }
          ] } },
        { type: 'case', nodeId: 'c11_hs_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a textile stall for the school exhibition, a student explains a polycotton shirt: \'Blending means they weave polyester threads and cotton threads together — like mixing two colours of paint. And since it\'s cotton-rich, it\'ll shrink and wrinkle like pure cotton.\'',
            decisions: [{ prompt: 'What does she get wrong about how fabrics are built?', options: [
                { text: 'Correct the level and the logic: blending is intimate mixing of staple fibres BEFORE spinning into yarn — that\'s why a 65/35 blend is uniform throughout, unlike a union fabric (polyester warp, cotton weft) which shows different face and back. And fibre alone doesn\'t decide behaviour: yarn twist, weave tightness and finish matter — a loose cotton voile shrinks more than tight cotton denim though both are 100% cotton.', outcome: 'She now reads the hierarchy: fibre properties → yarn possibilities → fabric construction → finish — each level modifying what the previous one promised.' },
                { text: 'Accept the paint-mixing model — blending happens when the two yarns meet in the loom.', outcome: 'Mixing at weaving gives a union fabric with two distinct faces; true blending happens at fibre stage, which is why blend properties are uniform.', reveals: 'blending-happens-at-fabric-stage' },
                { text: 'Agree on the shrinkage call — cotton content means cotton behaviour, full stop.', outcome: 'Fibre sets the potential, structure decides the outcome: weave density, twist and finishes can invert the fibre\'s typical behaviour.', reveals: 'fibre-content-decides-everything' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_05_012', title: 'You made it',
          caseStudy: { intro: 'Fibre → yarn → fabric → finish: every level up the hierarchy can overrule the level below — that chain is the whole subject.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hs_cbse_05_007', difficulty: 'standard',
          question: 'Manufactured fibres are textile fibres produced through industrial processes.',
          hint: 'Revisit c11_hs_cbse_05_004 (classification framework) and c11_hs_cbse_05_005/006 (natural.',
          misconception: 'Students conflate "manufactured" with "synthetic" and assume all factory-made fibres are petroleum-based synthetics.',
          parts: [
                { id: 'a', prompt: 'Name the three main categories of manufactured fibres based on raw material origin, and give one example of each with its generic name (not trade name).', answer: 'The three categories are: (1) Regenerated cellulosic fibres',
                  options: ['The three categories are: (1) Regenerated cellulosic fibres', 'rayon, nylon, polyester'],
                  hint: 'Revisit c11_hs_cbse_05_004 (classification framework) and c11_hs_cbse_05_005/006 (natural fibre.',
                  misconception: 'Students conflate "manufactured" with "synthetic" and assume all factory-made fibres are petroleum-based synthetics.' },
                { id: 'b', prompt: 'A student says: "Rayon is a synthetic fibre because it\'s made in a factory using chemicals." Explain why this statement is incorrect using the distinction.', answer: 'Rayon is regenerated cellulosic, not synthetic',
                  options: ['Rayon is regenerated cellulosic, not synthetic', 'factory-made', 'chemicals used'],
                  hint: 'Revisit c11_hs_cbse_05_004 (classification framework) and c11_hs_cbse_05_005/006 (natural fibre.',
                  misconception: 'Students conflate "manufactured" with "synthetic" and assume all factory-made fibres are petroleum-based synthetics.' },
                { id: 'c', prompt: 'A fabric label reads "65% polyester / 35% cotton." The wearer complains it feels clammy in humid weather and develops static cling in dry weather.', answer: 'Polyester has very low moisture regain (~0.4%)',
                  options: ['Polyester has very low moisture regain (~0.4%)', 'synthetic fibre'],
                  hint: 'Revisit c11_hs_cbse_05_004 (classification framework) and c11_hs_cbse_05_005/006 (natural fibre.',
                  misconception: 'Students conflate "manufactured" with "synthetic" and assume all factory-made fibres are petroleum-based synthetics.' }
          ],
            remediations: { 'students-conflate-manufactured-with-synthetic': { steps: ['Have the student create a two-column table: "Polymer exists in nature?" (YES/NO) for each fibre: cotton, wool, silk.', 'For each YES, trace the natural source (cotton boll, sheep fleece, silkworm gland, wood pulp, cotton linters).', 'Relabel the columns "Regenerated/Modified Natural" vs "Synthetic" — this visual sorting forces confrontation with the.', 'Practice burning test prediction: "If it\'s regenerated cellulosic, it must smell like burning paper — why?" (Answer.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_05_008', difficulty: 'standard',
          question: 'Yarn processing is the systematic sequence of mechanical operations—cleaning.',
          hint: 'Revisit c11_hs_cbse_05_003 (Fibre Properties Essential for Spinnability) and the.',
          misconception: 'Students believe "spinning" is the only real process and earlier stages (carding, drawing) are just preparatory.',
          parts: [
                { id: 'a', prompt: 'Name the six sequential stages of staple-fibre yarn processing from raw bale to ring-spun yarn, and state the primary output form (lap, sliver, roving, etc.).', answer: 'Correct sequence: 1) Cleaning/Blowroom → Lap (rolled sheet)',
                  options: ['Correct sequence: 1) Cleaning/Blowroom → Lap (rolled sheet)', 'spinning', '"spinning" first or omitting drawing'],
                  hint: 'Revisit c11_hs_cbse_05_003 (Fibre Properties Essential for Spinnability) and the fibre-morphology.',
                  misconception: 'Students believe "spinning" is the only real process and earlier stages (carding, drawing) are just preparatory cleaning.' },
                { id: 'b', prompt: 'A spinning mill produces 40s Ne (English count) carded cotton yarn at 150 m/min delivery speed with 800 twist per metre (tpm).', answer: 'Step 1: Convert Ne to Tex for SI consistency',
                  options: ['Step 1: Convert Ne to Tex for SI consistency', 'spinning'],
                  hint: 'Revisit c11_hs_cbse_05_003 (Fibre Properties Essential for Spinnability) and the fibre-morphology.',
                  misconception: 'Students believe "spinning" is the only real process and earlier stages (carding, drawing) are just preparatory cleaning.' },
                { id: 'c', prompt: 'Compare the fibre-path geometry in carding (cylinder-doffer) versus combing (nipper-comb) and analyse how each geometry influences fibre hook orientation and.', answer: 'Carding: Cylinder (swift) and doffer wires oppose',
                  options: ['Carding: Cylinder (swift) and doffer wires oppose', 'spinning'],
                  hint: 'Revisit c11_hs_cbse_05_003 (Fibre Properties Essential for Spinnability) and the fibre-morphology.',
                  misconception: 'Students believe "spinning" is the only real process and earlier stages (carding, drawing) are just preparatory cleaning.' }
          ],
            remediations: { 'spinning-is-the-only-real': { steps: ['1) Have the student physically draft a cotton sliver by hand: pull gently → observe fibre slippage; pull harder →.', 'This demonstrates why controlled attenuation (drawing) with doubling is essential.', '2) Show a video of card web → sliver → roving → yarn at 10× magnification; pause at each stage to count fibre.', '3) Assign a "process-flow storyboard" where each frame answers: Input form → Machine action → Output form → Key quality.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_05_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "spinning" is the only real process and earlier stages (carding, drawing) are just preparatory.',
          parts: [
                { id: 'a', prompt: 'A fabric designer must choose between 2/40s Ne combed cotton yarn and 2/40s Ne carded cotton yarn for a premium bedsheet requiring high lustre, low pilling.', answer: 'Combed 2/40s is superior',
                  options: ['Combed 2/40s is superior', 'spinning'],
                  hint: 'Revisit c11_hs_cbse_05_003 (Fibre Properties Essential for Spinnability) and the fibre-morphology.',
                  misconception: 'Students believe "spinning" is the only real process and earlier stages (carding, drawing) are just preparatory cleaning.' }
          ],
            remediations: { 'spinning-is-the-only-real': { steps: ['1) Have the student physically draft a cotton sliver by hand: pull gently → observe fibre slippage; pull harder →.', 'This demonstrates why controlled attenuation (drawing) with doubling is essential.', '2) Show a video of card web → sliver → roving → yarn at 10× magnification; pause at each stage to count fibre.', '3) Assign a "process-flow storyboard" where each frame answers: Input form → Machine action → Output form → Key quality.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_05_009', difficulty: 'standard',
          question: 'Fabric production methods are the structural techniques used to transform yarns.',
          hint: 'Revisit yarn twist-direction (S/Z) and twist-multiplier concepts from c11_hs_cbse_05_008.',
          misconception: 'Students believe "knitted fabrics are always stretchy and woven fabrics never stretch." This arises from oversimplified.',
          parts: [
                { id: 'a', prompt: 'A designer needs a fabric for a reusable shopping bag that must: (a) carry 10 kg without stretching, (b) resist tearing when snagged, (c) be produced at lowest.', answer: 'Woven (plain weave) is optimal',
                  options: ['Woven (plain weave) is optimal', 'knitted fabrics are always stretchy and woven fabrics never stretch', '"knitted fabrics are always stretchy and woven fabrics never stretch'],
                  hint: 'Revisit yarn twist-direction (S/Z) and twist-multiplier concepts from c11_hs_cbse_05_008.',
                  misconception: 'Students believe "knitted fabrics are always stretchy and woven fabrics never stretch." This arises from oversimplified textbook.' },
                { id: 'b', prompt: 'Compare the dimensional stability of a plain-woven cotton fabric versus a single-jersey knitted cotton fabric after repeated washing cycles.', answer: 'Plain weave: high dimensional stability',
                  options: ['Plain weave: high dimensional stability', 'knitted fabrics are always stretchy and woven fabrics never stretch', '"knitted fabrics are always stretchy and woven fabrics never stretch'],
                  hint: 'Revisit yarn twist-direction (S/Z) and twist-multiplier concepts from c11_hs_cbse_05_008.',
                  misconception: 'Students believe "knitted fabrics are always stretchy and woven fabrics never stretch." This arises from oversimplified textbook.' }
          ],
            remediations: { 'knitted-fabrics-are-always-stretchy': { steps: ['Have the student physically test 4 fabrics — denim (woven), T-shirt jersey (weft knit), swimwear tricot (warp knit).', 'Record % stretch and recovery.', 'Guide them to correlate results with: (a) presence of elastane (burn test), (b) loop vs.', 'Re-frame the rule: "Stretch = f(yarn elasticity, structure geometry, finishing)" — construction method is only one.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_05_010', difficulty: 'standard',
          question: 'Textile finishing is the series of treatments applied to fabric after.',
          hint: 'Revisit fibre classification (node c11_hs_cbse_05_004) and fabric construction (node.',
          misconception: 'Students believe "finishing" only means adding colour (dyeing/printing) and that all finishes are permanent.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Textile finishing is the series of treatments applied to fabric after loom-state',
                  options: ['Textile finishing is the series of treatments applied to fabric after loom-state', 'Fabrics in Daily Life refers to the study of textile materials as essential human ecology', 'Fabric behaviour in use and care refers to the collective response of a textile material', 'Fibre properties for spinnability refer to the intrinsic characteristics—specifically'],
                  hint: 'Revisit fibre classification (node c11_hs_cbse_05_004) and fabric construction (node.',
                  misconception: 'Students believe "finishing" only means adding colour (dyeing/printing) and that all finishes are permanent.' }
          ],
            remediations: { 'finishing-only-means-adding-colour': { steps: ['Have the student handle three fabric swatches: starched cotton (renewable), sanforised cotton (durable), and.', 'Ask them to predict which will change after one wash and why.', 'Use a dye-fibre compatibility chart: give them cotton, wool, polyester swatches and three dye classes (direct, acid.', 'Have them match and test (simulate with coloured water) to see which dye actually exhausts.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_05_011', difficulty: 'standard',
          question: 'The burning test is a qualitative fibre identification technique that exploits.',
          hint: 'Revisit c11_hs_cbse_05_004 (Classification) and c11_hs_cbse_05_005/006/007.',
          misconception: 'Students believe "burning test identifies the exact fibre name" (e.g., "this is Terylene") rather than "fibre class.',
          parts: [
                { id: 'a', prompt: 'Compare the burning behaviour of nylon 6,6 and polyester (PET) in terms of: (a) chemical origin of the "acrid" vs "sweet" odour, (b) bead colour difference.', answer: 'chemical origin of the "acrid" vs "sweet" odour, (',
                  options: ['chemical origin of the "acrid" vs "sweet" odour, (', 'melting beads', 'burning test identifies the exact fibre name', 'this is Terylene'],
                  hint: 'Revisit c11_hs_cbse_05_004 (Classification) and c11_hs_cbse_05_005/006/007 (fibre-specific.',
                  misconception: 'Students believe "burning test identifies the exact fibre name" (e.g., "this is Terylene") rather than "fibre class + generic type" (e.g.' }
          ],
            remediations: { 'burning-test-identifies-the-exact': { steps: ['Have the student burn three known fibres side-by-side: cotton, wool, polyester.', 'Force them to narrate aloud: "Cotton—no shrink, yellow flame, afterglow, paper smell, soft ash.', 'Wool—curls, slow burn, self-extinguishes, hair smell, crushable bead.', 'Polyester—shrinks, melts, sweet smell, hard black bead." 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_05_012', difficulty: 'standard',
          question: 'Specialised fabric constructions refer to non-woven, non-knitted textile.',
          hint: 'Review node c11_hs_cbse_05_009 (Fabric Production Methods) and c11_hs_cbse_05_008 (Yarn.',
          misconception: 'Students often confuse braiding with twisting/plying because both involve multiple yarns.',
          parts: [
                { id: 'a', prompt: 'A manufacturer wants to produce a lightweight, breathable fabric for a mosquito net that must retain its square mesh geometry after repeated washing.', answer: 'Recommend netting',
                  options: ['Recommend netting', 'breathability'],
                  hint: 'Review node c11_hs_cbse_05_009 (Fabric Production Methods) and c11_hs_cbse_05_008 (Yarn Processing).',
                  misconception: 'Students often confuse braiding with twisting/plying because both involve multiple yarns.' }
          ],
            remediations: { 'students-often-confuse-braiding-with': { steps: ['Have the student physically braid three coloured yarns (over-under-over) and twist three identical yarns.', 'Ask them to pull both structures laterally and observe that the braid resists flattening while the twisted cord.', 'Explain that braiding creates mechanical interlock at each cross-over, whereas twisting relies on torsion.', 'Show diagrams of braid architecture (maypole braiding) vs. twist architecture to cement the structural difference.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
