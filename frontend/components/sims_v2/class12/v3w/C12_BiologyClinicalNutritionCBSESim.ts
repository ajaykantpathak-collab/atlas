import type { SimDef } from '../../engine/types';
import C12_BiologyClinicalNutritionCBSESim from '../../../simulations/c6_12_new/C12_BiologyClinicalNutritionCBSESim';

/** v3 wrapped master — C12_BiologyClinicalNutritionCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_biologyclinicalnutritioncbsesim: SimDef = {
    id: 'v3w_c12_biologyclinicalnutritioncbsesim',
    title: 'Dairy Farm Management: Key Principles',
    subtitle: 'This node covers scientific management of dairy cattle and buffalo in the Indian context:.',
    classLevel: 12, subject: 'biology', topic: 'Dairy Farm Management: Key Principles',
    chapters: [],
    nodeIds: ['c12_bio_cbse_09_002', 'c12_bio_cbse_09_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Observe a dairy farm early morning: cows are let loose, fed dry fodder, hand-milked on a muddy floor, and the.', goal: 'Master Dairy Farm Management: Key Principles.' },
    discovery: {
        question: 'A dairy farmer feeds his crossbred cow 30 kg green maize fodder, 4 kg wheat straw, and 2 kg concentrate mixture daily. The cow yields 15 L milk with 3.5% fat.',
        options: ['DMI = (30×0.20) + (4×0.90) + (2×0.90) = 6 + 3.6 + 1.8 = 11.4 kg DM', 'more concentrate = more milk', 'energy density of diet'],
        answer: 'DMI = (30×0.20) + (4×0.90) + (2×0.90) = 6 + 3.6 + 1.8 = 11.4 kg DM',
        hook: 'Students believe "more concentrate = more milk" and feed 70-80% concentrate to high yielders.',
    },
    teaching: [
        { title: 'Dairy farm management is the systematic.', text: 'Dairy farm management is the systematic application of scientific principles to housing, feeding, breeding, health care, and milking of dairy animals (cattle and buffalo) to maximize milk yield,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_bio_cbse_09_002', title: 'Dairy farm management is the systematic.',
          scaffold: { problem: 'A farmer has a 500 kg Holstein-Friesian crossbred cow in early lactation (60 days in milk) yielding 30 kg milk with 3.8% fat and 3.2%.',
            steps: [
            { text: 'Calculate DMI and nutrient supply from each ingredient. Maize silage: 15×0.30 = 4.5 kg DM, NE_L = 4.5×0.65 = 2.925.' },
            { text: 'Total DMI = 4.5+4.5+5.4 = 14.4 kg DM (2.88% BW — slightly low for 30 L yielder, target 3.5% = 17.5 kg).' },
            { text: 'Calculate requirement. Maintenance NE_L (500 kg) = 0.08×BW^0.75 = 0.08×105.7 = 8.46 Mcal.' },
            { text: 'MP requirement: Maintenance MP = 3.0×BW^0.75 = 317 g. Milk MP = 30 kg × (32g CP/kg milk × 0.67 efficiency) = 641 g.' },
            { text: 'Conclusion: Ration severely energy-deficient. Cow will lose body condition (mobilize fat → NEFA → ketosis risk).', faded: true, blankAnswer: 'Ration provides 14.4 kg DMI (deficit 3.1 kg), 14.4 Mcal.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_09_003', title: 'Poultry farm management is the.',
          scaffold: { problem: 'A layer farm has 10,000 birds. Daily feed consumption is 11,500 kg. Daily egg production is 9,200 eggs with average weight 58 g.',
            steps: [
            { text: 'Calculate daily egg mass = 9,200 eggs × 0.058 kg/egg = 533.6 kg.' },
            { text: 'Current FCR = Feed Intake / Egg Mass = 11,500 kg / 533.6 kg = 21.55 (this is feed per kg egg mass?' },
            { text: 'Current FCR = 11,500 / 533.6 = 21.55 kg feed/kg egg mass.' },
            { text: 'Reduce feed wastage by 5%: New feed intake = 11,500 × 0.95 = 10,925 kg.' },
            { text: 'New FCR = 10,925 / 533.6 = 20.47.' },
            { text: 'Improvement = 21.55 - 20.47 = 1.08 units, or 5% reduction in FCR.', faded: true, blankAnswer: 'Current FCR = 21.55 kg feed/kg egg mass. New FCR after 5%.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_bio_cbse_09_003', title: 'Identify each idea',
          dissect: { specimen: 'Dairy Farm Management: Key Principles', spots: [
            { id: 's1', label: 'Dairy farm management is the', prompt: 'Which idea is this? — Dairy farm management is the systematic application of scientific principles to housing,.', answer: 'Dairy farm management is the', options: ['Dairy farm management is the', 'Poultry farm management is the'] },
            { id: 's2', label: 'Poultry farm management is the', prompt: 'Which idea is this? — Poultry farm management is the scientific practice of raising domesticated birds.', answer: 'Poultry farm management is the', options: ['Poultry farm management is the', 'Dairy farm management is the'] }
          ] } }
    ],
    explore: { component: C12_BiologyClinicalNutritionCBSESim, prompt: 'Explore the interactive — Dairy Farm Management: Key Principles' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bio_cbse_09_002', difficulty: 'standard',
          question: 'Dairy farm management is the systematic application of scientific principles to.',
          hint: 'If stuck on energy partitioning, revisit c11_bio_cbse_12_005 (Krebs Cycle) and.',
          misconception: 'Students believe "more concentrate = more milk" and feed 70-80% concentrate to high yielders.',
          parts: [
                { id: 'a', prompt: 'A dairy farmer feeds his crossbred cow 30 kg green maize fodder, 4 kg wheat straw, and 2 kg concentrate mixture daily. The cow yields 15 L milk with 3.5% fat.', answer: 'DMI = (30×0.20) + (4×0.90) + (2×0.90) = 6 + 3.6 + 1.8 = 11.4 kg DM',
                  options: ['DMI = (30×0.20) + (4×0.90) + (2×0.90) = 6 + 3.6 + 1.8 = 11.4 kg DM', 'more concentrate = more milk', 'energy density of diet'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "more concentrate = more milk" and feed 70-80% concentrate to high yielders.' },
                { id: 'b', prompt: 'Why is it physiologically harmful to milk a cow with full udder without pre-milking teat stimulation (fore-stripping, udder wash, massage) for at least 60-90.', answer: 'Teat stimulation triggers neuroendocrine reflex: afferent nerves → spinal cord →',
                  options: ['Teat stimulation triggers neuroendocrine reflex: afferent nerves → spinal cord →', 'cleaning teats', 'more concentrate = more milk'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "more concentrate = more milk" and feed 70-80% concentrate to high yielders.' },
                { id: 'c', prompt: 'A farmer switches his 10 Holstein-Friesian crossbred cows from individual stall feeding to a loose housing system with group feeding of TMR.', answer: 'Step 1: Loose housing requires ≥4.5 m²/cow bedded area + 3.5 m²/cow loafing',
                  options: ['Step 1: Loose housing requires ≥4.5 m²/cow bedded area + 3.5 m²/cow loafing', 'stress', 'more concentrate = more milk'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "more concentrate = more milk" and feed 70-80% concentrate to high yielders.' }
          ],
            remediations: { 'more-concentrate-more-milk-and': { steps: ['Revisit c11_bio_cbse_09_005 (Enzymes: Nature and Mechanism) — understand enzyme pH optimum (cellulases denature at pH.', 'Revisit c11_bio_cbse_12_005 (Krebs Cycle) — trace how rumen VFA (acetate, propionate, butyrate) enter host metabolism.', 'Use ICAR feeding standard tables to formulate a 15 kg DM ration for 20 L yielder with 40% NDF, 16% CP — calculate.', 'Re-diagnostic: Given a cow with milk fat 2.8%, rumen pH 5.5, suggest 3 specific ration changes with physiological.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_09_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "more concentrate = more milk" and feed 70-80% concentrate to high yielders.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Feeding 50 g bypass protein (rumen-undegradable protein) per kg concentrate to early lactation cows always increases milk protein.', answer: 'Partially true but incomplete',
                  options: ['Partially true but incomplete', 'more concentrate = more milk', 'energy density of diet', 'energy available to cow'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "more concentrate = more milk" and feed 70-80% concentrate to high yielders.' }
          ],
            remediations: { 'more-concentrate-more-milk-and': { steps: ['Revisit c11_bio_cbse_09_005 (Enzymes: Nature and Mechanism) — understand enzyme pH optimum (cellulases denature at pH.', 'Revisit c11_bio_cbse_12_005 (Krebs Cycle) — trace how rumen VFA (acetate, propionate, butyrate) enter host metabolism.', 'Use ICAR feeding standard tables to formulate a 15 kg DM ration for 20 L yielder with 40% NDF, 16% CP — calculate.', 'Re-diagnostic: Given a cow with milk fat 2.8%, rumen pH 5.5, suggest 3 specific ration changes with physiological.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_09_003', difficulty: 'standard',
          question: 'Poultry farm management is the scientific practice of raising domesticated.',
          hint: 'Review c11_bio_cbse_09_001 and c11_bio_cbse_09_002 for nutrient biochemistry, and.',
          misconception: 'Students believe "broilers are injected with hormones to grow fast" — this is biologically impossible and illegal.',
          parts: [
                { id: 'a', prompt: 'List the four major categories of poultry breeds used commercially in India with one example each, and state the primary selection criterion for layer vs.', answer: '1) Egg-type (layers) e.g., White Leghorn',
                  options: ['Correct answer: 1) Egg-type (layers) e.g., White Leghorn', 'chicken breeds', 'broilers are injected with hormones to grow fast'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "broilers are injected with hormones to grow fast" — this is biologically impossible and illegal.' },
                { id: 'b', prompt: 'Explain why deep litter system is preferred over cage system for broiler production in India, but cage system dominates layer farming.', answer: 'Broilers are reared for only 6-7 weeks',
                  options: ['Correct answer: Broilers are reared for only 6-7 weeks', 'broilers are injected with hormones to grow fast'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "broilers are injected with hormones to grow fast" — this is biologically impossible and illegal.' },
                { id: 'c', prompt: 'A farmer switches from mash to pelleted feed for his 20,000-bird layer farm.', answer: '(a) FCR improves (decreases)',
                  options: ['Correct answer: (a) FCR improves (decreases)', 'FCR worsens because pellets are expensive', 'broilers are injected with hormones to grow fast'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "broilers are injected with hormones to grow fast" — this is biologically impossible and illegal.' }
          ],
            remediations: { 'broilers-are-injected-with-hormones': { steps: ['Revisit c12_bio_cbse_09_001 (Animal Husbandry) to understand domestication and selection principles.', 'Review c11_bio_cbse_09_001 (Carbohydrates) and c11_bio_cbse_09_002 (Proteins) for nutrient roles in growth.', 'Watch a 10-minute video of commercial broiler farm (YouTube: "Indian poultry farm management") to visualize housing,.', 'Re-attempt Diagnostic Questions 2 and 3, focusing on linking bird physiology to management decisions.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_09_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "broilers are injected with hormones to grow fast" — this is biologically impossible and illegal.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Adding antibiotics to poultry feed as growth promoters is essential for profitable commercial farming in India." Consider current.', answer: 'The statement is false',
                  options: ['Correct answer: The statement is false', 'broilers are injected with hormones to grow fast'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "broilers are injected with hormones to grow fast" — this is biologically impossible and illegal.' },
                { id: 'b', prompt: 'Design a biosecurity protocol for a new 5,000-bird layer farm in a region with history of avian influenza outbreaks.', answer: 'Expected answer criteria: Structural: Perimeter fence, footbaths at all entries,',
                  options: ['Expected answer criteria: Structural: Perimeter fence, footbaths at all entries,', 'broilers are injected with hormones to grow fast'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "broilers are injected with hormones to grow fast" — this is biologically impossible and illegal.' }
          ],
            remediations: { 'broilers-are-injected-with-hormones': { steps: ['Revisit c12_bio_cbse_09_001 (Animal Husbandry) to understand domestication and selection principles.', 'Review c11_bio_cbse_09_001 (Carbohydrates) and c11_bio_cbse_09_002 (Proteins) for nutrient roles in growth.', 'Watch a 10-minute video of commercial broiler farm (YouTube: "Indian poultry farm management") to visualize housing,.', 'Re-attempt Diagnostic Questions 2 and 3, focusing on linking bird physiology to management decisions.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
