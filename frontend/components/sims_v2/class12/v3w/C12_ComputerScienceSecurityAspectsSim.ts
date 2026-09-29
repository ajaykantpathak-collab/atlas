import type { SimDef } from '../../engine/types';
import C12_ComputerScienceSecurityAspectsSim from '../../../simulations/c6_12/C12_ComputerScienceSecurityAspectsSim';

/** v3 wrapped master — C12_ComputerScienceSecurityAspectsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_computersciencesecurityaspectssim: SimDef = {
    id: 'v3w_c12_computersciencesecurityaspectssim',
    title: 'E-Waste Management and Disposal',
    subtitle: 'This node covers: definition and classification of e-waste, hazardous constituents and.',
    classLevel: 12, subject: 'computer_science', topic: 'E-Waste Management and Disposal',
    chapters: [],
    nodeIds: ['c12_cs_cbse_13_003', 'c12_cs_cbse_13_007'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine your family just upgraded from a 5-year-old CRT television to a new smart TV.', goal: 'Master E-Waste Management and Disposal.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'E-Waste (Electronic Waste) refers to.', text: 'E-Waste (Electronic Waste) refers to discarded electrical or electronic devices such as computers, mobile phones, televisions, and refrigerators that have reached the end of their useful life.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_cs_cbse_13_003', title: 'E-Waste (Electronic Waste) refers to.',
          scaffold: { problem: 'A government office (bulk consumer) has 150 employees. Each employee uses 1 laptop (ITEW1, avg weight 2.5 kg, lifespan 4 years) and 1.',
            steps: [
            { text: 'Identify the formula for steady-state annual generation: Annual Generation = (Number of Units × Average Weight) /.' },
            { text: 'Compute for laptops (ITEW1): (150 units × 2.5 kg) / 4 years = 375 kg / 4 = 93.75 kg/year.' },
            { text: 'Compute for mobile phones (ITEW2): (150 units × 0.18 kg) / 2.5 years = 27 kg / 2.5 = 10.8 kg/year.' },
            { text: 'Compute for printers (ITEW6): (20 units × 12 kg) / 5 years = 240 kg / 5 = 48 kg/year.' },
            { text: 'Sum across categories: Total = 93.75 + 10.8 + 48 = 152.55 kg/year.' },
            { text: 'Interpret: This is the *theoretical* annual flow if all devices are replaced exactly at end-of-life; actual generation.', faded: true, blankAnswer: '152.55 kg/year (approx. 153 kg/year)' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_13_007', title: 'Social media refers to interactive.',
          scaffold: { problem: 'A Class 12 student, Arjun, notices his WhatsApp "Last Seen" is set to "Everyone".',
            steps: [
            { text: 'Identify the platform feature — "Last Seen" is a passive availability indicator that broadcasts presence without user.' },
            { text: 'Map the power dynamic — Parent has authority to question; teen has technical control (privacy settings) but social.' },
            { text: 'Analyse asymmetric visibility — Mother sees Arjun\'s timestamp; Arjun does not see mother\'s (she may have it off).' },
            { text: 'Evaluate relational consequence — The change reduces conflict *temporarily* but signals "I have something to hide,".' },
            { text: 'Generalise — This micro-interaction illustrates how platform defaults (visible to "Everyone") force teens into constant.', faded: true, blankAnswer: 'Arjun\'s setting change is a tactical boundary negotiation.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_cs_cbse_13_007', title: 'Identify each idea',
          dissect: { specimen: 'E-Waste Management and Disposal', spots: [
            { id: 's1', label: 'E-Waste Electronic Waste refers to', prompt: 'Which idea is this? — E-Waste (Electronic Waste) refers to discarded electrical or electronic devices such as.', answer: 'E-Waste Electronic Waste refers to', options: ['E-Waste Electronic Waste refers to', 'Social media refers to interactive'] },
            { id: 's2', label: 'Social media refers to interactive', prompt: 'Which idea is this? — Social media refers to interactive digital platforms that enable users to create, share,.', answer: 'Social media refers to interactive', options: ['Social media refers to interactive', 'E-Waste Electronic Waste refers to'] }
          ] } }
    ],
    explore: { component: C12_ComputerScienceSecurityAspectsSim, prompt: 'Explore the interactive — E-Waste Management and Disposal' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_cs_cbse_13_003', difficulty: 'standard',
          question: 'E-Waste (Electronic Waste) refers to discarded electrical or electronic devices.',
          hint: 'If stuck, revisit the **"Schedule I"** list in the E-Waste (Management) Rules, 2016.',
          misconception: '**Misconception:** "Recycling e-waste is always environmentally friendly — the more we recycle, the better." **Why it\'s.',
          parts: [
                { id: 'a', prompt: 'A student writes: "E-waste is any broken electronic device." Is this definition complete?', answer: 'No, the definition is incomplete',
                  options: ['No, the definition is incomplete', 'broken'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Recycling e-waste is always environmentally friendly — the more we recycle, the better." **Why it\'s wrong:** *Informal*.' },
                { id: 'b', prompt: 'Compare the environmental impact of **landfilling** vs **incineration** for the plastic fraction of e-waste (ABS, HIPS, PC).', answer: '**Incineration is worse** under typical Indian conditions',
                  options: ['**Incineration is worse** under typical Indian conditions', 'landfilling is worse'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Recycling e-waste is always environmentally friendly — the more we recycle, the better." **Why it\'s wrong:** *Informal*.' }
          ],
            remediations: { 'misconception-recycling-e-waste-is': { steps: ['** Re-watch the 8-minute CPCB video "E-Waste Management in India" (search YouTube) — pause at each informal process.', '** Download **Form 1(a), Form 6, Form 7** from the CPCB website.', '** Take a **mock diagnostic**: "A bulk consumer generates 2 tonnes/year of ITEW1.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_13_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Recycling e-waste is always environmentally friendly — the more we recycle, the better." **Why it\'s.',
          parts: [
                { id: 'a', prompt: 'Compare the environmental impact of **landfilling** vs **incineration** for the plastic fraction of e-waste (ABS, HIPS, PC).', answer: '**Incineration is worse** under typical Indian conditions',
                  options: ['**Incineration is worse** under typical Indian conditions', 'landfilling is worse'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Recycling e-waste is always environmentally friendly — the more we recycle, the better." **Why it\'s wrong:** *Informal*.' }
          ],
            remediations: { 'misconception-recycling-e-waste-is': { steps: ['** Re-watch the 8-minute CPCB video "E-Waste Management in India" (search YouTube) — pause at each informal process.', '** Download **Form 1(a), Form 6, Form 7** from the CPCB website.', '** Take a **mock diagnostic**: "A bulk consumer generates 2 tonnes/year of ITEW1.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
