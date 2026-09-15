import type { SimDef } from '../../engine/types';

/** v3 generated — c11_biotech_ch04_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_biotech_ch04_p2: SimDef = {
    id: 'v3_c11_biotech_ch04_p2',
    title: 'Enzymes and Proteins · Part 2/2',
    subtitle: 'Probe enzyme kinetics — activation energy, specificity, and the conditions that break them.',
    classLevel: 11, subject: 'biotechnology', topic: 'Enzymes and Proteins · Part 2/2',
    chapters: ['c11_biotech_ch04'],
    nodeIds: ['c11_biotech_cbse_04_007', 'c11_biotech_cbse_04_008', 'c11_biotech_cbse_04_009', 'c11_biotech_cbse_04_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an industrial biochemist optimising an enzyme for a detergent company', intro: 'A vat of enzyme, a spec sheet of conditions, and a product deadline — find the sweet spot.', goal: 'Explain enzyme action (lock-and-key/induced fit), factors affecting rate, and protein structure levels.' },
    discovery: {
        question: 'Laundry detergent digests curry stains at 40°C but the enzymes inside your own cells would die at that heat. Yet both are \'enzymes\'. What reconciles this?',
        options: ['Enzymes are tuned to their source organism — the detergent uses enzymes from heat-loving microbes', 'Detergent enzymes aren\'t real enzymes, just chemicals', 'All enzymes work identically at any temperature', 'Curry stains weaken the fabric so less heat is needed'],
        answer: 'Enzymes are tuned to their source organism — the detergent uses enzymes from heat-loving microbes',
        hook: 'An enzyme is a lock shaped for one key and one climate — source organism decides its working range.',
    },
    teaching: [
        { title: 'Enzyme Inhibition: Competitive and Non-Competitive', text: 'Enzyme inhibition is the process by which a molecule (inhibitor) reduces the rate of an enzyme-catalyzed reaction.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_biotech_cbse_04_007', title: 'Your mission',
          mission: { widget: 'molecule', validate: 'molecule:atoms=4',
            instruction: 'On the lab: set atoms to 4 — how do the bonds hold the chain together?.',
        context: 'Run virtual assays to map how temperature, pH and substrate concentration push an enzyme\'s rate up — and shut it down.',
            observePrompt: 'What did the molecule interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_04_007', title: 'Enzyme Inhibition: Competitive and Non-Competitive',
          scaffold: { problem: '** The enzyme acetylcholinesterase (AChE) hydrolyzes acetylcholine with Km = 0.1 mM and Vmax = 50 µmol/min.',
            steps: [
            { text: 'Identify given values: Km = 0.1 mM, Vmax = 50 µmol/min, [S] = 0.2 mM, [I] = 0.02 µM = 2×10⁻⁵ mM, Ki = 0.01 µM = 1×10⁻⁵.' },
            { text: 'Write competitive inhibition equation: v₀ = Vmax[S] / (Km(1 + [I]/Ki) + [S]).' },
            { text: 'Calculate the factor (1 + [I]/Ki) = 1 + (2×10⁻⁵)/(1×10⁻⁵) = 1 + 2 = 3.' },
            { text: 'Apparent Km\' = Km × 3 = 0.1 × 3 = 0.3 mM.' },
            { text: 'Substitute into equation: v₀ = (50 × 0.2) / (0.3 + 0.2) = 10 / 0.5 = 20 µmol/min.' },
            { text: 'Verify: Without inhibitor, at [S]=0.2 mM (2×Km), v₀ = 50×0.2/(0.1+0.2) = 33.3 µmol/min.', faded: true, blankAnswer: '** 20 µmol/min' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_04_008', title: 'Allosteric Regulation of Enzymes',
          scaffold: { problem: 'Aspartate transcarbamoylase (ATCase) catalyzes the first step in pyrimidine biosynthesis.',
            steps: [
            { text: 'Identify the Hill equation: v₀/Vₘₐₓ = [S]ⁿᴴ / (K₀.₅ⁿᴴ + [S]ⁿᴴ). Given nᴴ = 2.5, [S] = 2.0 mM.' },
            { text: 'For (a) without CTP: K₀.₅ = 2.0 mM. Substitute: v₀/Vₘₐₓ = (2.0)²·⁵ / ((2.0)²·⁵ + (2.0)²·⁵) = 1 / (1 + 1) = 0.5.' },
            { text: 'For (b) with CTP: K₀.₅ = 6.0 mM. Compute (2.0)²·⁵ = 2² × 2⁰·⁵ = 4 × 1.414 = 5.656.' },
            { text: 'Compare: without CTP, v₀ = 50% Vₘₐₓ; with CTP, v₀ = 6% Vₘₐₓ. CTP reduces velocity ~8.3-fold at this [aspartate].' },
            { text: 'Physiological interpretation: At physiological aspartate concentration (~2 mM), CTP binding switches ATCase from.', faded: true, blankAnswer: '(a) v₀/Vₘₐₓ = 0.50 (50%); (b) v₀/Vₘₐₓ = 0.060 (6%). CTP.' }
            ] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_04_009', title: 'Coenzymes and Cofactors: Role in Catalysis',
          caseStudy: { intro: 'Imagine you are a nutritionist in a rural Indian clinic where patients show symptoms like fatigue, cracked lips, and poor wound healing.',
            decisions: [{ prompt: 'Name two metal ions that act as cofactors for the enzyme carbonic anhydrase and alcohol dehydrogenase respectively, and state the common.', options: [
                { text: 'Zinc (Zn²⁺) is the cofactor for both carbonic anhydrase and alcohol dehydrogenase', outcome: 'Zinc (Zn²⁺) is the cofactor for both carbonic anhydrase and alcohol dehydrogenase; the coenzyme.' },
                { text: 'cofactor', outcome: 'Not quite — Students often think that "cofactor" and "coenzyme" are synonyms, or that all coenzymes are.', reveals: 'cofactor-and-coenzyme-are-synonyms' },
                { text: 'coenzyme', outcome: 'Not quite — Students often think that "cofactor" and "coenzyme" are synonyms, or that all coenzymes are.', reveals: 'cofactor-and-coenzyme-are-synonyms' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_04_010', title: 'Ribozymes: Catalytic RNA',
          caseStudy: { intro: 'Imagine you discover an ancient recipe book where all instructions are written in a language that can also *perform* the cooking itself — that\'s the.',
            decisions: [{ prompt: 'State the defining chemical characteristic that distinguishes ribozymes from the vast majority of enzymes studied in this chapter.', options: [
                { text: 'Ribozymes are composed of RNA (ribonucleic acid), whereas the vast majority of enzymes', outcome: 'Ribozymes are composed of RNA (ribonucleic acid), whereas the vast majority of enzymes are composed.' },
                { text: 'ribozymes have cofactors', outcome: 'Not quite — Students often believe ribozymes are "primitive" or "less efficient" versions of protein enzymes.', reveals: 'ribozymes-are-primitive-or-less' },
                { text: 'ribozymes are smaller', outcome: 'Not quite — Students often believe ribozymes are "primitive" or "less efficient" versions of protein enzymes.', reveals: 'ribozymes-are-primitive-or-less' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_biotech_cbse_04_008', title: 'Identify each idea',
          dissect: { specimen: 'Enzymes and Proteins · Part 2/2', spots: [
            { id: 's1', label: 'Enzyme Inhibition Competitive and Non-Competitive', prompt: 'Which idea is this? — Enzyme inhibition is the process by which a molecule (inhibitor) reduces the rate of.', answer: 'Enzyme Inhibition Competitive and Non-Competitive', options: ['Enzyme Inhibition Competitive and Non-Competitive', 'Allosteric Regulation of Enzymes', 'Coenzymes and Cofactors Role in Catalysis', 'Ribozymes Catalytic RNA'] },
            { id: 's2', label: 'Allosteric Regulation of Enzymes', prompt: 'Which idea is this? — Allosteric regulation is a mechanism of enzyme control where regulatory molecules.', answer: 'Allosteric Regulation of Enzymes', options: ['Allosteric Regulation of Enzymes', 'Enzyme Inhibition Competitive and Non-Competitive', 'Coenzymes and Cofactors Role in Catalysis', 'Ribozymes Catalytic RNA'] },
            { id: 's3', label: 'Coenzymes and Cofactors Role in Catalysis', prompt: 'Which idea is this? — Coenzymes are organic non-protein molecules, often derived from vitamins, that bind.', answer: 'Coenzymes and Cofactors Role in Catalysis', options: ['Coenzymes and Cofactors Role in Catalysis', 'Enzyme Inhibition Competitive and Non-Competitive', 'Allosteric Regulation of Enzymes', 'Ribozymes Catalytic RNA'] },
            { id: 's4', label: 'Ribozymes Catalytic RNA', prompt: 'Which idea is this? — Ribozymes are RNA molecules that possess catalytic activity, capable of accelerating.', answer: 'Ribozymes Catalytic RNA', options: ['Ribozymes Catalytic RNA', 'Enzyme Inhibition Competitive and Non-Competitive', 'Allosteric Regulation of Enzymes', 'Coenzymes and Cofactors Role in Catalysis'] }
          ] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a diagnostics company internship, your mentor asks you to file three newly characterised enzymes into IUB classes. One is named \'citrate synthase\' (joins acetyl-CoA to oxaloacetate by transferring the acetyl group), another \'ATP citrate lyase\' (a transferase despite its name), and a third needs EDTA-chelation testing because it dies without its Mg²⁺ cofactor. Your batchmate says: \'Just file by the name — synthase is a ligase, lyase is a lyase.\'',
            decisions: [{ prompt: 'What\'s the correct way to classify them?', options: [
                { text: 'Classify by reaction chemistry, not the trivial name: citrate synthase is a transferase (acetyl group transfer), and any \'lyase\' that moves groups is a transferase too. Separately, test cofactor dependence — without Mg²⁺ the apoenzyme is inactive; only apoenzyme + cofactor = catalytically active holoenzyme.', outcome: 'IUB classes are defined by the bond/group changes in the reaction; names routinely mislead (citrate synthase is EC 2.x, a transferase).' },
                { text: 'File by the name — the nomenclature exists precisely so the name tells you the class.', outcome: 'Trivial names encode history, not mechanism; \'synthase\' and \'lyase\' in names have trapped students into wrong classes — only the balanced reaction reveals the truth.', reveals: 'name-determines-ec-class' },
                { text: 'Skip the cofactor test — an enzyme is a protein catalyst, so the protein part alone defines its activity.', outcome: 'Many enzymes need metal ions or coenzymes; the apoenzyme without its cofactor is catalytically dead, so holoenzyme status is part of characterising it.', reveals: 'cofactors-are-optional' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_04_010', title: 'You made it',
          caseStudy: { intro: 'Enzymes are biology\'s catalysts: specific, fragile, and the reason metabolism runs at body temperature instead of furnace heat.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'molecule', prompt: 'Explore the molecule interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'molecule', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_biotech_cbse_04_007', difficulty: 'standard',
          question: 'Enzyme inhibition is the process by which a molecule (inhibitor) reduces the.',
          hint: 'Revisit node c11_biotech_cbse_04_004 (Enzyme Kinetics: Michaelis-Menten Equation) and.',
          misconception: '**Misconception:** "Non-competitive inhibition changes Km because the inhibitor binds to the enzyme and alters its.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Enzyme inhibition is the process by',
                  options: ['Enzyme inhibition is the process by', 'Enzymes are biological macromolecules, predominantly globular proteins (with the', 'The active site is a three-dimensional pocket or cleft on the enzyme surface formed by', 'The induced fit model proposes that the enzyme\'s active site is not a rigid pre-formed'],
                  hint: 'Revisit node c11_biotech_cbse_04_004 (Enzyme Kinetics: Michaelis-Menten Equation) and practice.',
                  misconception: '**Misconception:** "Non-competitive inhibition changes Km because the inhibitor binds to the enzyme and alters its conformation, which must.' }
          ],
            remediations: { 'misconception-non-competitive-inhibition-changes': { steps: ['**Revisit the binding equilibria:** Write the four species: E, ES, EI, ESI.', 'For pure non-competitive, Ki = [E][I]/[EI] = [ES][I]/[ESI].', 'Show algebraically that [ES]/[E] = [S]/Km is independent of [I].', '**Draw the thermodynamic cycle:** E ⇌ ES (Km) and E ⇌ EI (Ki).'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_04_008', difficulty: 'standard',
          question: 'Allosteric regulation is a mechanism of enzyme control where regulatory.',
          hint: 'Revisit c11_biotech_cbse_04_004 (Michaelis-Menten equation derivation and graph.',
          misconception: 'Students often believe that allosteric inhibitors decrease Vₘₐₓ (like non-competitive inhibitors) because "they bind.',
          parts: [
                { id: 'a', prompt: 'Phosphofructokinase-1 (PFK-1) is a key allosteric enzyme in glycolysis. ATP is both a substrate and an allosteric inhibitor; AMP is an allosteric activator.', answer: '[ATP] is high, (',
                  options: ['[ATP] is high, (', 'Vₘₐₓ decreases with ATP', 'curves become hyperbolic', 'they bind away from the active site so they must reduce the maximum rate'],
                  hint: 'Revisit c11_biotech_cbse_04_004 (Michaelis-Menten equation derivation and graph interpretation) and.',
                  misconception: 'Students often believe that allosteric inhibitors decrease Vₘₐₓ (like non-competitive inhibitors) because "they bind away from the active.' },
                { id: 'b', prompt: 'Compare and contrast the kinetic behavior of an allosteric enzyme with positive cooperativity (Hill coefficient nₕ = 2.8) versus a non-cooperative.', answer: 'For Michaelis-Menten enzyme: at [S]=0.1Kₘ, v₀ ≈ 0.091Vₘₐₓ',
                  options: ['For Michaelis-Menten enzyme: at [S]=0.1Kₘ, v₀ ≈ 0.091Vₘₐₓ', 'both show similar fold-change', 'allosteric enzyme changes less', 'they bind away from the active site so they must reduce the maximum rate'],
                  hint: 'Revisit c11_biotech_cbse_04_004 (Michaelis-Menten equation derivation and graph interpretation) and.',
                  misconception: 'Students often believe that allosteric inhibitors decrease Vₘₐₓ (like non-competitive inhibitors) because "they bind away from the active.' }
          ],
            remediations: { 'allosteric-inhibitors-decrease-v-like': { steps: ['If a student confuses allosteric inhibition with non-competitive inhibition: Step 1 - Have them draw both curves on the.', 'Step 2 - Ask: "In non-competitive inhibition, can adding more substrate overcome inhibition?" (No).', '"In allosteric inhibition, can adding more substrate overcome inhibition?" (Yes, at very high [S], the curve still.', 'Step 3 - Emphasize the structural difference: non-competitive = single polypeptide, one active site; allosteric.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_04_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that allosteric inhibitors decrease Vₘₐₓ (like non-competitive inhibitors) because "they bind.',
          parts: [
                { id: 'a', prompt: 'A researcher claims: "Allosteric inhibition is just non-competitive inhibition with a fancy name, because in both cases the inhibitor binds at a site other.', answer: 'The claim is INCORRECT',
                  options: ['The claim is INCORRECT', 'they bind away from the active site so they must reduce the maximum rate', 'binding at a different site', 'ATP inhibition of PFK-1 lowers Vₘₐₓ'],
                  hint: 'Revisit c11_biotech_cbse_04_004 (Michaelis-Menten equation derivation and graph interpretation) and.',
                  misconception: 'Students often believe that allosteric inhibitors decrease Vₘₐₓ (like non-competitive inhibitors) because "they bind away from the active.' },
                { id: 'b', prompt: 'Design a hypothetical metabolic pathway with 3 enzymes (E1, E2, E3) converting A → B → C → D. D is the end product.', answer: 'Optimal scheme: D allosterically inhibits E1 (the first committed step)',
                  options: ['Optimal scheme: D allosterically inhibits E1 (the first committed step)', 'they bind away from the active site so they must reduce the maximum rate', 'binding at a different site', 'ATP inhibition of PFK-1 lowers Vₘₐₓ'],
                  hint: 'Revisit c11_biotech_cbse_04_004 (Michaelis-Menten equation derivation and graph interpretation) and.',
                  misconception: 'Students often believe that allosteric inhibitors decrease Vₘₐₓ (like non-competitive inhibitors) because "they bind away from the active.' }
          ],
            remediations: { 'allosteric-inhibitors-decrease-v-like': { steps: ['If a student confuses allosteric inhibition with non-competitive inhibition: Step 1 - Have them draw both curves on the.', 'Step 2 - Ask: "In non-competitive inhibition, can adding more substrate overcome inhibition?" (No).', '"In allosteric inhibition, can adding more substrate overcome inhibition?" (Yes, at very high [S], the curve still.', 'Step 3 - Emphasize the structural difference: non-competitive = single polypeptide, one active site; allosteric.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_04_009', difficulty: 'standard',
          question: 'Coenzymes are organic non-protein molecules, often derived from vitamins, that.',
          hint: 'If stuck, revisit the active site and induced fit models (c11_biotech_cbse_04_002.',
          misconception: 'Students often think that "cofactor" and "coenzyme" are synonyms, or that all coenzymes are prosthetic groups.',
          parts: [
                { id: 'a', prompt: 'An enzyme assay shows zero activity when the reaction mixture lacks Mg²⁺. Adding back 5 mM Mg²⁺ restores full activity.', answer: 'The enzyme specifically requires Mg²⁺ as its metal ion cofactor',
                  options: ['The enzyme specifically requires Mg²⁺ as its metal ion cofactor', 'cofactor', 'coenzyme', 'that FAD comes from niacin (B3'],
                  hint: 'If stuck, revisit the active site and induced fit models (c11_biotech_cbse_04_002.',
                  misconception: 'Students often think that "cofactor" and "coenzyme" are synonyms, or that all coenzymes are prosthetic groups.' }
          ],
            remediations: { 'cofactor-and-coenzyme-are-synonyms': { steps: ['If a student cannot match vitamins to coenzymes, have them draw the core structure of each vitamin side‑by‑side with.', 'Then ask: "What chemical group does this ring system accept/donate?" For metal ions, give a blank Table 4.2 and ask.', '(Fe/Cu) Which in hydrolytic enzymes?', '(Zn)" This builds structural–functional reasoning instead of rote memorisation.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_04_010', difficulty: 'standard',
          question: 'Ribozymes are RNA molecules that possess catalytic activity, capable.',
          hint: 'Revisit c11_biotech_cbse_04_001 (enzyme definition) and c11_biotech_cbse_04_002 (active.',
          misconception: 'Students often believe ribozymes are "primitive" or "less efficient" versions of protein enzymes that were replaced.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Ribozymes are not true enzymes because they lack an active site with a precise 3D shape." Using the induced fit model.', answer: 'The claim is false',
                  options: ['The claim is false', 'primitive', 'less efficient'],
                  hint: 'Revisit c11_biotech_cbse_04_001 (enzyme definition) and c11_biotech_cbse_04_002 (active site).',
                  misconception: 'Students often believe ribozymes are "primitive" or "less efficient" versions of protein enzymes that were replaced during evolution.' },
                { id: 'b', prompt: 'RNase P is a ribozyme that processes tRNA precursors. In an experiment, you treat RNase P with RNase A (degrades RNA) and separately with trypsin (degrades.', answer: 'RNase A treatment will destroy catalytic activity',
                  options: ['RNase A treatment will destroy catalytic activity', 'primitive', 'less efficient'],
                  hint: 'Revisit c11_biotech_cbse_04_001 (enzyme definition) and c11_biotech_cbse_04_002 (active site).',
                  misconception: 'Students often believe ribozymes are "primitive" or "less efficient" versions of protein enzymes that were replaced during evolution.' }
          ],
            remediations: { 'ribozymes-are-primitive-or-less': { steps: ['If a student holds this misconception: (1) Show kinetic data: compare kcat/Km of RNase P (ribozyme) vs.', 'a protein nuclease — they are similar orders of magnitude.', '(2) Ask: "If ribozymes are inferior, why hasn\'t the ribosome\'s peptidyl transferase been replaced by a protein enzyme.', '(4) Assign reading: "The ribosome is a ribozyme" (Nobel 2009, Steitz/Ramakrishnan/Yonath) to see high-resolution.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
