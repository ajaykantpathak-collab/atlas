import type { SimDef } from '../../engine/types';
import C11_BiologyCellUltrastructureSim from '../../../simulations/three/C11_BiologyCellUltrastructureSim';

/** v3 wrapped master — C11_BiologyCellUltrastructureSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_biologycellultrastructuresim: SimDef = {
    id: 'v3w_c11_biologycellultrastructuresim',
    title: 'Cell Ultrastructure',
    subtitle: 'Covers the defining features of Kingdom Monera, the two major groups (Archaebacteria and.',
    classLevel: 11, subject: 'biology', topic: 'Kingdom Monera: Bacteria and Archaea',
    chapters: [],
    nodeIds: ['c11_bio_cbse_02_002'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Observe a bowl of curd set overnight in a typical Indian kitchen — the transformation of liquid milk into.', goal: 'Master Cell Ultrastructure.' },
    discovery: {
        question: 'State the three criteria R.H. Whittaker used to place all prokaryotes into a single Kingdom Monera.',
        options: ['Whittaker used (1) prokaryotic cell structure (no true nucleus or membrane-bound', 'unicellular body', 'absence of chlorophyll'],
        answer: 'Whittaker used (1) prokaryotic cell structure (no true nucleus or membrane-bound',
        hook: 'Students often think "blue-green algae" (cyanobacteria) are algae (eukaryotic protists) because they are.',
    },
    teaching: [
        { title: 'Kingdom Monera comprises exclusively.', text: 'Kingdom Monera comprises exclusively prokaryotic organisms (bacteria and archaea) that lack a true nucleus and membrane-bound organelles, possess a non-cellulosic cell wall (peptidoglycan in.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_bio_cbse_02_002', title: 'Kingdom Monera comprises exclusively.',
          scaffold: { problem: 'During a field trip to Chilika Lake (Odisha), students collect water samples showing a pinkish-red discoloration.',
            steps: [
            { text: 'Note the environmental clues — anaerobic, high-salt (hypersaline), methane production.' },
            { text: 'Recall that methanogens are archaebacteria found in marshy/anaerobic habitats; halophiles are archaebacteria in extreme.' },
            { text: 'Combine both: the organism is a halophilic methanogen (or separate populations) belonging to Archaebacteria.' },
            { text: 'Identify the key adaptation: cell wall lacks peptidoglycan; contains pseudopeptidoglycan or glycoprotein S-layer.' },
            { text: 'Conclude that this places them in Archaebacteria, not Eubacteria, because eubacterial peptidoglycan would be unstable.', faded: true, blankAnswer: 'The organisms are archaebacteria — specifically halophilic.' }
            ] } }
    ],
    explore: { component: C11_BiologyCellUltrastructureSim, prompt: 'Explore the interactive — Cell Ultrastructure' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_02_002', difficulty: 'standard',
          question: 'Kingdom Monera comprises exclusively prokaryotic organisms (bacteria and.',
          hint: 'Revisit the prokaryotic vs eukaryotic cell comparison (Class 9 Cell chapter) and the.',
          misconception: 'Students often think "blue-green algae" (cyanobacteria) are algae (eukaryotic protists) because they are.',
          parts: [
                { id: 'a', prompt: 'State the three criteria R.H. Whittaker used to place all prokaryotes into a single Kingdom Monera.', answer: 'Whittaker used (1) prokaryotic cell structure (no true nucleus or membrane-bound',
                  options: ['Whittaker used (1) prokaryotic cell structure (no true nucleus or membrane-bound', 'unicellular body', 'absence of chlorophyll'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "blue-green algae" (cyanobacteria) are algae (eukaryotic protists) because they are photosynthetic, filamentous, and.' },
                { id: 'b', prompt: 'A farmer notices yellowish-green scum on his flooded paddy field after applying nitrogen fertilizer.', answer: 'Organism: *Nostoc* (cyanobacterium/blue-green alga)',
                  options: ['Organism: *Nostoc* (cyanobacterium/blue-green alga)', 'blue-green algae'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "blue-green algae" (cyanobacteria) are algae (eukaryotic protists) because they are photosynthetic, filamentous, and.' }
          ],
            remediations: { 'blue-green-algae-cyanobacteria-are': { steps: ['Prepare a wet mount of *Nostoc* filament and a eukaryotic alga (*Spirogyra*) side by side on a microscope.', 'Observe under 400×: note absence of nucleus, absence of membrane-bound chloroplasts (thylakoids free in cytoplasm), and.', 'Add a drop of iodine solution — *Spirogyra* shows starch granules in chloroplasts; *Nostoc* shows glycogen granules in.', 'Conclude that photosynthetic machinery is not confined to organelles in cyanobacteria, confirming prokaryotic.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_02_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "blue-green algae" (cyanobacteria) are algae (eukaryotic protists) because they are.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Mycoplasma are not true bacteria because they lack a cell wall; they should be placed in a separate kingdom." Use evidence from cell.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'blue-green algae'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "blue-green algae" (cyanobacteria) are algae (eukaryotic protists) because they are photosynthetic, filamentous, and.' },
                { id: 'b', prompt: 'Design a simple laboratory investigation to demonstrate that curd formation is caused by living bacteria and not by a chemical enzyme secreted into the milk.', answer: 'Materials: fresh milk, curd starter, test tubes, water bath, thermometer',
                  options: ['Materials: fresh milk, curd starter, test tubes, water bath, thermometer', 'blue-green algae'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "blue-green algae" (cyanobacteria) are algae (eukaryotic protists) because they are photosynthetic, filamentous, and.' }
          ],
            remediations: { 'blue-green-algae-cyanobacteria-are': { steps: ['Prepare a wet mount of *Nostoc* filament and a eukaryotic alga (*Spirogyra*) side by side on a microscope.', 'Observe under 400×: note absence of nucleus, absence of membrane-bound chloroplasts (thylakoids free in cytoplasm), and.', 'Add a drop of iodine solution — *Spirogyra* shows starch granules in chloroplasts; *Nostoc* shows glycogen granules in.', 'Conclude that photosynthetic machinery is not confined to organelles in cyanobacteria, confirming prokaryotic.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
