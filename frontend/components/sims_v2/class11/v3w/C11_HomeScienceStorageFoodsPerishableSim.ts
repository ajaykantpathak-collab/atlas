import type { SimDef } from '../../engine/types';
import C11_HomeScienceStorageFoodsPerishableSim from '../../../simulations/c6_12/C11_HomeScienceStorageFoodsPerishableSim';

/** v3 wrapped master — C11_HomeScienceStorageFoodsPerishableSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_homesciencestoragefoodsperishablesim: SimDef = {
    id: 'v3w_c11_homesciencestoragefoodsperishablesim',
    title: 'Environmental Hygiene, Sanitation and Food Hygiene',
    subtitle: 'This node covers environmental hygiene components (water, excreta disposal, liquid/solid.',
    classLevel: 11, subject: 'science', topic: 'Environmental Hygiene, Sanitation and Food Hygiene',
    chapters: [],
    nodeIds: ['c11_hs_cbse_07_008', 'c11_hs_cbse_07_011', 'c11_hs_cbse_04_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you visit a relative\'s home in a peri-urban area where the municipal water supply runs only two hours.', goal: 'Master Environmental Hygiene, Sanitation and Food Hygiene.' },
    discovery: {
        question: 'Critique the following statement from a municipal health report: "Our city has achieved 95% toilet coverage under Swachh Bharat Mission, so environmental.',
        options: ['The statement confuses *access to a toilet* (containment) with *safely managed', 'environmental hygiene', 'personal hygiene'],
        answer: 'The statement confuses *access to a toilet* (containment) with *safely managed',
        hook: 'Students believe "environmental hygiene" and "personal hygiene" are interchangeable or that environmental hygiene only.',
    },
    teaching: [
        { title: 'Environmental hygiene refers to the.', text: 'Environmental hygiene refers to the comprehensive set of practices and conditions in the external surroundings—including safe water supply, sanitary disposal of human excreta and liquid/solid wastes,.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_hs_cbse_07_008', title: 'Environmental hygiene refers to the.',
          scaffold: { problem: 'A rural household of six uses a hand-pump 200m away. Water is stored in a 200L plastic drum without a lid.',
            steps: [
            { text: 'Map each observation to the eight components in Figure 4. Water supply: uncovered drum (contamination risk), drain.' },
            { text: 'Trace faecal-oral pathways. Pathway A: Latrine pit → groundwater → hand-pump → stored water → drinking/cooking.' },
            { text: 'Identify minimum infrastructure upgrades that break *multiple* pathways simultaneously.' },
            { text: 'Verify each upgrade addresses a textbook component. Upgrade 1 → Excreta disposal + Water supply.' },
            { text: 'Confirm alignment with "safe environment" factor. All three are engineering barriers (extrinsic), not.', faded: true, blankAnswer: 'Gaps: 7 of 8 components compromised (solid waste inferred)..' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hs_cbse_07_011', title: 'Work simplification is the conscious.',
          scaffold: { problem: 'A rural homemaker spends 2.5 hours daily on water collection: 4 trips × 25 minutes walking (100 min), 4 trips × 10 minutes waiting at well.',
            steps: [
            { text: 'Identify current time breakdown and motions — 4 cycles of walk-wait-fill-carry, head-loading posture, two pots per trip.' },
            { text: 'Level 1 change — combine filling: use a single 30-litre drum on a wheeled trolley (eliminates 2 trips, reduces filling.' },
            { text: 'Level 2 change — install a rainwater harvesting tank with tap at kitchen (eliminates all 4 trips for non-drinking.' },
            { text: 'Compute new time — Level 1 only: 2 trips × (25+10+5) = 80 min + 30 min storing = 110 min (26% reduction).' },
            { text: 'Verify — all exceed 20%; combined change meets goal with maximum saving.', faded: true, blankAnswer: 'Level 1 (trolley + larger container): 110 min daily (26%.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hs_cbse_04_012', title: 'Energy conservation in home management.',
          scaffold: { problem: 'A homemaker spends 45 minutes daily washing dishes by hand at a sink 85 cm high. She is 160 cm tall.',
            steps: [
            { text: 'Calculate baseline daily human energy cost from bending: 30 bends × 2.5 kcal = 75 kcal/day.' },
            { text: 'Calculate baseline time cost: 45 min = 0.75 hr × ₹50/hr = ₹37.5/day.' },
            { text: 'Intervention A (raised sink): Eliminates bending → saves 75 kcal/day (₹7.5). Time unchanged (still hand wash).' },
            { text: 'Intervention B (dishwasher): Eliminates hand washing → saves 45 min/day (₹37.5) + 75 kcal bending (₹7.5) = ₹45/day.' },
            { text: 'Compare: Intervention B saves 3.6× more total resource cost despite higher capital cost.', faded: true, blankAnswer: 'Intervention B (dishwasher) saves ₹41,792 over 5 years vs.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_hs_cbse_07_011', title: 'Identify each idea',
          dissect: { specimen: 'Environmental Hygiene, Sanitation and Food Hygiene', spots: [
            { id: 's1', label: 'Environmental hygiene refers to the', prompt: 'Which idea is this? — Environmental hygiene refers to the comprehensive set of practices and conditions in the.', answer: 'Environmental hygiene refers to the', options: ['Environmental hygiene refers to the', 'Work simplification is the conscious', 'Energy conservation in home management'] },
            { id: 's2', label: 'Work simplification is the conscious', prompt: 'Which idea is this? — Work simplification is the conscious seeking of the simplest, easiest, and quickest.', answer: 'Work simplification is the conscious', options: ['Work simplification is the conscious', 'Environmental hygiene refers to the', 'Energy conservation in home management'] },
            { id: 's3', label: 'Energy conservation in home management', prompt: 'Which idea is this? — Energy conservation in home management refers to the deliberate application of work.', answer: 'Energy conservation in home management', options: ['Energy conservation in home management', 'Environmental hygiene refers to the', 'Work simplification is the conscious'] }
          ] } }
    ],
    explore: { component: C11_HomeScienceStorageFoodsPerishableSim, prompt: 'Explore the interactive — Environmental Hygiene, Sanitation and Food Hygiene' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hs_cbse_07_008', difficulty: 'standard',
          question: 'Environmental hygiene refers to the comprehensive set of practices and.',
          hint: 'Revisit c11_hs_cbse_07_007 (Personal Hygiene) and Table 2 in the textbook; practice.',
          misconception: 'Students believe "environmental hygiene" and "personal hygiene" are interchangeable or that environmental hygiene only.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Environmental hygiene refers to the comprehensive set of practices and conditions in the',
                  options: ['Environmental hygiene refers to the comprehensive set of practices and conditions in the', 'Work simplification is the conscious seeking of the simplest, easiest, and quickest', 'Energy conservation in home management refers to the deliberate application of work'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "environmental hygiene" and "personal hygiene" are interchangeable or that environmental hygiene only means "keeping.' }
          ],
            remediations: { 'environmental-hygiene-and-personal-hygiene': { steps: ['Have the student re-read Table 2 (Intrinsic vs Extrinsic factors) and highlight every extrinsic factor that is.', 'Give a 2-column sorting exercise—15 items (e.g., "handwashing", "covered drain", "vaccination", "fly screen",.', 'For each extrinsic item, student draws the transmission pathway it blocks (e.g., covered drain → blocks mosquito.', 'Student rewrites their definition of environmental hygiene using only extrinsic factors.'] } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_07_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "environmental hygiene" and "personal hygiene" are interchangeable or that environmental hygiene only.',
          parts: [
                { id: 'a', prompt: 'Critique the following statement from a municipal health report: "Our city has achieved 95% toilet coverage under Swachh Bharat Mission, so environmental.', answer: 'The statement confuses *access to a toilet* (containment) with *safely managed',
                  options: ['The statement confuses *access to a toilet* (containment) with *safely managed', 'environmental hygiene', 'personal hygiene', 'keeping surroundings clean'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "environmental hygiene" and "personal hygiene" are interchangeable or that environmental hygiene only means "keeping.' },
                { id: 'b', prompt: 'Create a novel "food safety superhero" character for a Class 6 comic book that teaches the five keys to safer food (WHO) *through* the environmental hygiene.', answer: 'Character: **Captain Codex Alimentarius** (code name: "Tempest")',
                  options: ['Character: **Captain Codex Alimentarius** (code name: "Tempest")', 'environmental hygiene', 'personal hygiene', 'keeping surroundings clean'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "environmental hygiene" and "personal hygiene" are interchangeable or that environmental hygiene only means "keeping.' }
          ],
            remediations: { 'environmental-hygiene-and-personal-hygiene': { steps: ['Have the student re-read Table 2 (Intrinsic vs Extrinsic factors) and highlight every extrinsic factor that is.', 'Give a 2-column sorting exercise—15 items (e.g., "handwashing", "covered drain", "vaccination", "fly screen",.', 'For each extrinsic item, student draws the transmission pathway it blocks (e.g., covered drain → blocks mosquito.', 'Student rewrites their definition of environmental hygiene using only extrinsic factors.'] } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_07_011', difficulty: 'standard',
          question: 'Work simplification is the conscious seeking of the simplest, easiest, and.',
          hint: 'If unable to analyse a task into motions/tools/storage, revisit c11_hs_cbse_07_009 (Time.',
          misconception: 'Students believe the three levels must be applied in sequence (Level 1 first, then 2, then 3) and that Level 3 is.',
          parts: [
                { id: 'a', prompt: 'A student says: "Using a pressure cooker instead of an open pot is a change in hand and body motions because you stir less." Is this correct?', answer: 'This is incorrect',
                  options: ['This is incorrect', 'keeping the same work tools and product', 'better'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the three levels must be applied in sequence (Level 1 first, then 2, then 3) and that Level 3 is "better" because it.' },
                { id: 'b', prompt: 'Your family currently buys whole wheat, takes it to the chakki for grinding, stores the atta in a steel container, and makes rotis daily.', answer: 'Level 1 (motions): Combine trips',
                  options: ['Level 1 (motions): Combine trips', 'buying readymade atta', 'better'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the three levels must be applied in sequence (Level 1 first, then 2, then 3) and that Level 3 is "better" because it.' },
                { id: 'c', prompt: 'Compare and contrast "doing all dusting, then all sweeping, then all mopping" (like tasks together) versus "cleaning one room completely before moving to the.', answer: '"Doing like tasks together" better applies the rhythm and sequence principle',
                  options: ['"Doing like tasks together" better applies the rhythm and sequence principle', 'better'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the three levels must be applied in sequence (Level 1 first, then 2, then 3) and that Level 3 is "better" because it.' }
          ],
            remediations: { 'the-three-levels-must-be': { steps: ['If a student insists levels are sequential or Level 3 is superior: (1) Have them time themselves making tea twice —.', 'They\'ll see Level 1 saves ~40 seconds at zero cost.', '(2) Give a constraint scenario: "You\'re in a rented kitchen, cannot drill walls, family hates new foods — simplify.', '(3) Explicitly state: "The levels are a MENU, not a STAIRCASE.'] } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_07_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the three levels must be applied in sequence (Level 1 first, then 2, then 3) and that Level 3 is.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Level 3 changes (changing the end product) are always the most effective for work simplification because they eliminate the most.', answer: 'Critique: Level 3 is NOT always most effective',
                  options: ['Critique: Level 3 is NOT always most effective', 'better'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the three levels must be applied in sequence (Level 1 first, then 2, then 3) and that Level 3 is "better" because it.' }
          ],
            remediations: { 'the-three-levels-must-be': { steps: ['If a student insists levels are sequential or Level 3 is superior: (1) Have them time themselves making tea twice —.', 'They\'ll see Level 1 saves ~40 seconds at zero cost.', '(2) Give a constraint scenario: "You\'re in a rented kitchen, cannot drill walls, family hates new foods — simplify.', '(3) Explicitly state: "The levels are a MENU, not a STAIRCASE.'] } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_04_012', difficulty: 'standard',
          question: 'Energy conservation in home management refers to the deliberate application of.',
          hint: 'Revisit c11_hs_cbse_04_009 (Management Process: Organising, Implementing, Controlling).',
          misconception: 'Students equate "energy conservation" solely with *electricity saving* (switching off lights, buying 5-star appliances).',
          parts: [
                { id: 'a', prompt: 'A homemaker washes clothes by hand in a bucket, bending over 20 times per load to wring each garment.', answer: 'Option B (raising the bucket) is a Class 1 change',
                  options: ['Option B (raising the bucket) is a Class 1 change', 'work simplification'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "energy conservation" solely with *electricity saving* (switching off lights, buying 5-star appliances) and ignore *human.' }
          ],
            remediations: { 'students-equate-energy-conservation-solely': { steps: ['Have the student perform a *motion analysis* of a simple task (making tea) — count each motion: reach, grasp, move,.', 'Ask: "Which motions serve the *goal* (tea in cup) and which serve only *transport* (moving body/items)?"', 'Redesign the task on paper: relocate sugar jar next to stove, keep tea leaves in a dispenser at eye level, use a tray.', 'Have them *enact* both versions and rate fatigue (1-10).', 'Connect: "Every transport motion you eliminated is human energy conserved — exactly like switching off a light saves.'] } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_04_012', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate "energy conservation" solely with *electricity saving* (switching off lights, buying 5-star appliances).',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "Installing solar panels on the roof is the single most effective step a household can take for sustainable energy management.".', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'techno-optimism'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "energy conservation" solely with *electricity saving* (switching off lights, buying 5-star appliances) and ignore *human.' }
          ],
            remediations: { 'students-equate-energy-conservation-solely': { steps: ['Have the student perform a *motion analysis* of a simple task (making tea) — count each motion: reach, grasp, move,.', 'Ask: "Which motions serve the *goal* (tea in cup) and which serve only *transport* (moving body/items)?"', 'Redesign the task on paper: relocate sugar jar next to stove, keep tea leaves in a dispenser at eye level, use a tray.', 'Have them *enact* both versions and rate fatigue (1-10).', 'Connect: "Every transport motion you eliminated is human energy conserved — exactly like switching off a light saves.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
