import type { SimDef } from '../../engine/types';

/** v3 generated — c6_chemistry_ch06 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_chemistry_ch06: SimDef = {
    id: 'v3_c6_chemistry_ch06',
    title: 'Methods of Separation',
    subtitle: 'This node covers handpicking, threshing, winnowing, and sieving — the manual separation.',
    classLevel: 6, subject: 'chemistry', topic: 'Methods of Separation',
    chapters: ['c6_chemistry_ch06'],
    nodeIds: ['c6_chemistry_ch06_001', 'c6_chemistry_ch06_002', 'c6_chemistry_ch06_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Imagine your mother asks you to clean a bowl of rice that has a few small stones in it.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Why can salt not be separated from water by filtration?',
        options: ['Because the salt is dissolved', 'all mixtures can be filtered', 'filtration removes everything'],
        answer: 'Because the salt is dissolved',
        hook: 'Students often think filtration removes everything — even dissolved salt.',
    },
    teaching: [
        { title: 'Hand separation — picking, threshing, winnowing, sieving', text: 'Separation of substances means removing one component from a mixture using a difference in its properties.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_chemistry_ch06_001', title: 'Your mission',
          mission: { widget: 'nephron', validate: 'nephron:flow=60',
            instruction: 'On the lab: increase the filtration flow to 60 — what gets filtered?.',
            observePrompt: 'What did the nephron interactive show you?' } },
        { type: 'case', nodeId: 'c6_chemistry_ch06_002', title: 'Sedimentation, decantation, filtration, evaporation, churning',
          caseStudy: { intro: 'Take a glass of muddy water and just leave it alone — watch the mud slowly sink and collect at the bottom. That quiet settling is sedimentation.',
            decisions: [{ prompt: 'What is sedimentation?', options: [
                { text: 'Sedimentation is the settling of heavier insoluble particles at the bottom of a liquid', outcome: 'Sedimentation is the settling of heavier insoluble particles at the bottom of a liquid when the.' },
                { text: 'dissolving', outcome: 'Not quite — Students often think filtration removes everything — even dissolved salt.', reveals: 'filtration-removes-everything-even-dissolved' },
                { text: 'filtration removes everything', outcome: 'Not quite — Students often think filtration removes everything — even dissolved salt.', reveals: 'filtration-removes-everything-even-dissolved' }
            ] }] } },
        { type: 'case', nodeId: 'c6_chemistry_ch06_003', title: 'Magnetic separation and choosing the right method',
          caseStudy: { intro: 'A carpenter drops nails into a pile of sawdust — picking them out one by one would take an hour.',
            decisions: [{ prompt: 'How does a magnet separate iron nails from sawdust?', options: [
                { text: 'A magnet is swept through the mixture and the iron nails', outcome: 'A magnet is swept through the mixture and the iron nails — being magnetic — are pulled to it, while.' },
                { text: 'always means', outcome: 'Not quite — Students often think separation is a list of tricks to memorise, or that "mixed" always means.', reveals: 'separation-is-a-list-of' }
            ] }] } },
        { type: 'case', nodeId: 'c6_chemistry_ch06_003', title: 'You made it',
          caseStudy: { intro: 'You finished Methods of Separation — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'nephron', prompt: 'Explore the nephron interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'nephron', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_chemistry_ch06_001', difficulty: 'standard',
          question: 'Separation of substances means removing one component from a mixture using.',
          hint: 'If stuck, revisit "Materials Around Us" — the idea that substances differ in properties.',
          misconception: 'Students often think one method works for everything — or pick the method they remember rather than the one that fits.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Separation of substances means removing one component from a mixture using a difference',
                  options: ['Separation of substances means removing one component from a mixture using a difference', 'Fine or dissolved mixtures need methods beyond the hand', 'Magnetic separation uses a magnet to pull magnetic materials like iron, nickel, or cobalt'],
                  hint: 'If stuck, revisit "Materials Around Us" — the idea that substances differ in properties.',
                  misconception: 'Students often think one method works for everything — or pick the method they remember rather than the one that fits.' }
          ],
            remediations: { 'one-method-works-for-everything': { steps: ['If the student picks the wrong method, ask one question: "what is different between the two things — size or weight?".', 'Run it on three kitchen mixtures — rice with stones, flour with lumps, wheat with husk — until the match is automatic.', 'Then let them invent a fourth mixture and name its method.'], labTask: { instruction: 'On the interactive: increase the filtration flow to 60 — what gets filtered? — then check.', widget: 'nephron', validate: 'nephron:flow=60' } } } },
        { type: 'subpart', nodeId: 'c6_chemistry_ch06_002', difficulty: 'standard',
          question: 'Fine or dissolved mixtures need methods beyond the hand. Sedimentation lets.',
          hint: 'If stuck, revisit "Hand Separation Methods" — the property-difference idea.',
          misconception: 'Students often think filtration removes everything — even dissolved salt.',
          parts: [
                { id: 'a', prompt: 'What is decantation and when is it used?', answer: 'Decantation is gently pouring off the clear liquid above a settled sediment',
                  options: ['Decantation is gently pouring off the clear liquid above a settled sediment', 'filtration removes everything'],
                  hint: 'If stuck, revisit "Hand Separation Methods" — the property-difference idea.',
                  misconception: 'Students often think filtration removes everything — even dissolved salt.' },
                { id: 'b', prompt: 'How does filtration separate a mixture?', answer: 'The mixture is passed through a filter',
                  options: ['The mixture is passed through a filter', 'filtration removes everything'],
                  hint: 'If stuck, revisit "Hand Separation Methods" — the property-difference idea.',
                  misconception: 'Students often think filtration removes everything — even dissolved salt.' }
          ],
            remediations: { 'filtration-removes-everything-even-dissolved': { steps: ['Anchor each method to a kitchen picture — settled mud (sedimentation), pouring dal water (decantation), a tea strainer.', 'Then ask one sorting question: "does the unwanted part settle or is it dissolved?" — settle → sediment/decant/filter.', 'Run it on three real mixtures until the choice is instant.'], labTask: { instruction: 'On the interactive: increase the filtration flow to 60 — what gets filtered? — then check.', widget: 'nephron', validate: 'nephron:flow=60' } } } },
        { type: 'subpart', nodeId: 'c6_chemistry_ch06_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think filtration removes everything — even dissolved salt.',
          parts: [
                { id: 'a', prompt: 'Why can salt not be separated from water by filtration?', answer: 'Because the salt is dissolved',
                  options: ['Because the salt is dissolved', 'all mixtures can be filtered', 'filtration removes everything'],
                  hint: 'If stuck, revisit "Hand Separation Methods" — the property-difference idea.',
                  misconception: 'Students often think filtration removes everything — even dissolved salt.' }
          ],
            remediations: { 'filtration-removes-everything-even-dissolved': { steps: ['Anchor each method to a kitchen picture — settled mud (sedimentation), pouring dal water (decantation), a tea strainer.', 'Then ask one sorting question: "does the unwanted part settle or is it dissolved?" — settle → sediment/decant/filter.', 'Run it on three real mixtures until the choice is instant.'], labTask: { instruction: 'On the interactive: increase the filtration flow to 60 — what gets filtered? — then check.', widget: 'nephron', validate: 'nephron:flow=60' } } } },
        { type: 'subpart', nodeId: 'c6_chemistry_ch06_003', difficulty: 'standard',
          question: 'Magnetic separation uses a magnet to pull magnetic materials like iron, nickel.',
          hint: 'If stuck, revisit "Fine-Mixture Separation" and "Exploring Magnets" — the properties each.',
          misconception: 'Students often think separation is a list of tricks to memorise, or that "mixed" always means "dissolved." The real.',
          parts: [
                { id: 'a', prompt: 'How does a magnet separate iron nails from sawdust?', answer: 'A magnet is swept through the mixture and the iron nails',
                  options: ['A magnet is swept through the mixture and the iron nails', 'always means'],
                  hint: 'If stuck, revisit "Fine-Mixture Separation" and "Exploring Magnets" — the properties each method.',
                  misconception: 'Students often think separation is a list of tricks to memorise, or that "mixed" always means "dissolved." The real rule is that the method.' },
                { id: 'b', prompt: 'What property does magnetic separation rely on?', answer: 'It relies on magnetism',
                  options: ['It relies on magnetism', 'always means'],
                  hint: 'If stuck, revisit "Fine-Mixture Separation" and "Exploring Magnets" — the properties each method.',
                  misconception: 'Students often think separation is a list of tricks to memorise, or that "mixed" always means "dissolved." The real rule is that the method.' },
                { id: 'c', prompt: 'State the rule for choosing a separation method.', answer: 'The method must match a property that differs between the components',
                  options: ['The method must match a property that differs between the components', 'always means'],
                  hint: 'If stuck, revisit "Fine-Mixture Separation" and "Exploring Magnets" — the properties each method.',
                  misconception: 'Students often think separation is a list of tricks to memorise, or that "mixed" always means "dissolved." The real rule is that the method.' },
                { id: 'd', prompt: 'Match the mixture to the method: pebbles + sand; wheat + husk; muddy water; iron filings + sand.', answer: 'Pebbles + sand → sieving (size)',
                  options: ['Pebbles + sand → sieving (size)', 'always means'],
                  hint: 'If stuck, revisit "Fine-Mixture Separation" and "Exploring Magnets" — the properties each method.',
                  misconception: 'Students often think separation is a list of tricks to memorise, or that "mixed" always means "dissolved." The real rule is that the method.' }
          ],
            remediations: { 'separation-is-a-list-of': { steps: ['Teach the decision question first: "what is different between the two things?" — answer it aloud before naming a method.', 'Run three mixtures — iron+sand (magnet), sand+water (settle/filter), salt+water (evaporate) — until the property.', 'Finish by giving a four-way mixture and letting the student chain the steps in order.'], labTask: { instruction: 'On the interactive: increase the filtration flow to 60 — what gets filtered? — then check.', widget: 'nephron', validate: 'nephron:flow=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
