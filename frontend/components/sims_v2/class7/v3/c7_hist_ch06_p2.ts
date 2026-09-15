import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hist_ch06_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hist_ch06_p2: SimDef = {
    id: 'v3_c7_hist_ch06_p2',
    title: 'Empires and Kingdoms: 6th to 10th Centuries · Part 2/2',
    subtitle: 'Covers the structural features, geographical distribution, and architectural evolution.',
    classLevel: 7, subject: 'history', topic: 'Empires and Kingdoms: 6th to 10th Centuries · Part 2/2',
    chapters: ['c7_hist_ch06'],
    nodeIds: ['c7_hist_ch06_007', 'c7_hist_ch06_008', 'c7_hist_ch06_009', 'c7_hist_ch06_010', 'c7_hist_ch06_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine visiting two magnificent stone temples: one in Madhya Pradesh with a beehive-shaped curved tower, and.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'When the Gupta empire weakened around the 6th century, its own governors and military chiefs — the samantas — quietly became independent kings. What made that possible?',
        options: ['Kings had begun paying officials with land grants instead of coins, so local chiefs controlled revenue and armies of their own — and stopped sending tribute', 'The samantas invented a new religion first', 'All the emperors simply forgot to collect taxes', 'Foreign powers appointed each samanta as king'],
        answer: 'Kings had begun paying officials with land grants instead of coins, so local chiefs controlled revenue and armies of their own — and stopped sending tribute',
        hook: 'Fragmentation was not a dark age. As the centre faded, regional languages, temple styles, and local economies flourished — power scattered into many capitals, and culture scattered with it.',
    },
    teaching: [
        { title: 'Temple Architecture: Nagara and Dravida Styles', text: 'An in-depth study of the two principal styles of ancient and early medieval Indian temple architecture—the Nagara style of northern India and the Dravida style of southern India—flourishing between.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hist_ch06_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Track the cracks in the clay pot — from fading coinage to land-grant payments to samantas declaring independence — then find three regional cultures that bloomed in the pieces.',
        labels: ['Temple Architecture: Nagara', 'Bhakti Movement: Saints', 'Trade and Urbanisation', 'Literature and Learning', 'Shore Temple at Mamallapuram'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c7_hist_ch06_007', title: 'Temple Architecture: Nagara and Dravida Styles',
          caseStudy: { intro: 'Imagine visiting two magnificent stone temples: one in Madhya Pradesh with a beehive-shaped curved tower, and another in Tamil Nadu featuring a towering.',
            decisions: [{ prompt: 'What is the curved, beehive-shaped tower over the sanctum (garbhagriha) in North Indian temple architecture typically called?', options: [
                { text: 'the **shikhara**', outcome: 'The correct answer is the **shikhara**. A student who answers "vimana" or "gopuram" is confusing.' },
                { text: 'vimana', outcome: 'Not quite — Students often think that "shikhara" and "vimana" mean the exact same thing and can be used.', reveals: 'shikhara-and-vimana-mean-the' },
                { text: 'gopuram', outcome: 'Not quite — Students often think that "shikhara" and "vimana" mean the exact same thing and can be used.', reveals: 'shikhara-and-vimana-mean-the' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch06_009', title: 'Trade and Urbanisation in Early Medieval India',
          caseStudy: { intro: 'Have you ever noticed how your local town or weekly market grows because of a nearby temple or highway intersection?',
            decisions: [{ prompt: 'What term was commonly used in early medieval inscriptions to describe regional market centers or exchange points where rural goods were.', options: [
                { text: 'The correct term is *mandapika* (or *mandi*)', outcome: 'The correct term is *mandapika* (or *mandi*). A student who answers "Pataliputra" or "Harappa".' },
                { text: 'Pataliputra', outcome: 'Not quite — Students often believe that the decline of large imperial capitals like Pataliputra or Ujjain.', reveals: 'the-decline-of-large-imperial' },
                { text: 'Harappa', outcome: 'Not quite — Students often believe that the decline of large imperial capitals like Pataliputra or Ujjain.', reveals: 'the-decline-of-large-imperial' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A king in 7th-century India, short on coins as long-distance trade shrinks, starts paying his military officers with villages — each officer may collect the land revenue himself and keep his own armed men. A student predicts this will strengthen the kingdom.',
            decisions: [{ prompt: 'What is the land-grant policy actually setting in motion?', options: [
                { text: 'It hands each officer independent control of revenue and soldiers; as these samantas grow wealthy and armed, they stop sending tribute and declare their own kingdoms — the policy fragments the realm, which is exactly how post-Gupta India splintered.', outcome: 'This follows the causal chain: scarce coinage leads to land payment, land payment builds autonomous local power, and autonomy breaks the centre.' },
                { text: 'The prediction is right — paid-in-land officers will stay loyal, because land is worth more than coins and gratitude guarantees obedience.', outcome: 'Loyalty fails precisely because the grant makes the officer self-sufficient; once he controls revenue and troops locally, he no longer needs the emperor.', reveals: 'land-grants-strengthen' },
                { text: 'It will trigger a total dark age — once the empire fragments, all culture, temples and learning will disappear too.', outcome: 'Fragmentation moved power to regional courts that patronised temples, regional languages and local economies — political disunity is not civilisational collapse.', reveals: 'fragmentation-equals-darkness' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch06_011', title: 'You made it',
          caseStudy: { intro: 'When a big pot cracks, it does not vanish — it becomes many smaller vessels. Each regional kingdom carried its own art, language, and pride.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hist_ch06_007', difficulty: 'standard',
          question: 'An in-depth study of the two principal styles of ancient and early medieval.',
          hint: 'Review node c7_hist_ch06_004 to re-examine how Pallava rulers initiated rock-cut and.',
          misconception: 'Students often think that "shikhara" and "vimana" mean the exact same thing and can be used interchangeably for any.',
          parts: [
                { id: 'a', prompt: 'What is the curved, beehive-shaped tower over the sanctum (garbhagriha) in North Indian temple architecture typically called?', answer: 'the **shikhara**',
                  options: ['the **shikhara**', 'vimana', 'gopuram', 'shikhara'],
                  hint: 'Review node c7_hist_ch06_004 to re-examine how Pallava rulers initiated rock-cut and structural.',
                  misconception: 'Students often think that "shikhara" and "vimana" mean the exact same thing and can be used interchangeably for any temple tower in India.' },
                { id: 'b', prompt: 'If an archaeologist discovers a 9th-century temple ruin featuring a square sanctum, a curvilinear shikhara tower topped by an amalaka, and no massive boundary.', answer: 'the **Nagara style**, most likely found in northern or central India',
                  options: ['the **Nagara style**, most likely found in northern or central India', 'shikhara', 'vimana'],
                  hint: 'Review node c7_hist_ch06_004 to re-examine how Pallava rulers initiated rock-cut and structural.',
                  misconception: 'Students often think that "shikhara" and "vimana" mean the exact same thing and can be used interchangeably for any temple tower in India.' }
          ],
            remediations: { 'shikhara-and-vimana-mean-the': { steps: ['To fix this misconception, draw a side-by-side comparison diagram of a North Indian temple and a South Indian temple.', 'Label the central tower of the North Indian temple as "Shikhara (Curvilinear)" and the South Indian tower as "Vimana.', 'Have the student trace these labels three times while describing their distinct shapes out loud.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch06_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that "shikhara" and "vimana" mean the exact same thing and can be used interchangeably for any.',
          parts: [
                { id: 'a', prompt: 'A historian argues that temple architecture from the 6th to 10th centuries was solely a religious expression and had no political or economic purpose.', answer: 'that the claim is false',
                  options: ['that the claim is false', 'shikhara', 'vimana'],
                  hint: 'Review node c7_hist_ch06_004 to re-examine how Pallava rulers initiated rock-cut and structural.',
                  misconception: 'Students often think that "shikhara" and "vimana" mean the exact same thing and can be used interchangeably for any temple tower in India.' }
          ],
            remediations: { 'shikhara-and-vimana-mean-the': { steps: ['To fix this misconception, draw a side-by-side comparison diagram of a North Indian temple and a South Indian temple.', 'Label the central tower of the North Indian temple as "Shikhara (Curvilinear)" and the South Indian tower as "Vimana.', 'Have the student trace these labels three times while describing their distinct shapes out loud.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch06_008', difficulty: 'standard',
          question: 'The Bhakti Movement in the early medieval period (6th to 10th centuries) was.',
          hint: 'Review Class 6 introduction to the Bhakti movement and look at maps of South Indian.',
          misconception: 'Students often confuse the early South Indian Bhakti movement (6th-10th centuries, Alvars and Nayanars) with the later.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Bhakti Movement in the early medieval period (6th to 10th centuries) was a profound',
                  options: ['The Bhakti Movement in the early medieval period (6th to 10th centuries) was a profound', 'The post-Gupta period (roughly 6th to 10th centuries CE) is a phase in Indian history', 'The rule of Harshavardhana in the 7th century CE (606–647 CE) marked a significant period', 'The Chalukya Dynasty was a prominent imperial power that ruled large parts of the Deccan'],
                  hint: 'Review Class 6 introduction to the Bhakti movement and look at maps of South Indian regional.',
                  misconception: 'Students often confuse the early South Indian Bhakti movement (6th-10th centuries, Alvars and Nayanars) with the later, more widespread.' }
          ],
            remediations: { 'students-often-confuse-the-early': { steps: ['To fix this, trace a timeline starting with the 6th-century Tamil saints (Alvars/Nayanars) and contrast them with the.', 'Show students a map of South India highlighting Chola/Pallava territories for the early period, and compare it with.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch06_009', difficulty: 'standard',
          question: 'The evolution of trade networks, merchant guilds, and the rise of regional.',
          hint: 'Review c7_hist_ch06_001 (Post-Gupta Period: Political Fragmentation) to see how kings.',
          misconception: 'Students often believe that the decline of large imperial capitals like Pataliputra or Ujjain during the post-Gupta.',
          parts: [
                { id: 'a', prompt: 'What term was commonly used in early medieval inscriptions to describe regional market centers or exchange points where rural goods were collected and traded?', answer: 'The correct term is *mandapika* (or *mandi*)',
                  options: ['The correct term is *mandapika* (or *mandi*)', 'Pataliputra', 'Harappa'],
                  hint: 'Review c7_hist_ch06_001 (Post-Gupta Period: Political Fragmentation) to see how kings lost supreme.',
                  misconception: 'Students often believe that the decline of large imperial capitals like Pataliputra or Ujjain during the post-Gupta period means that all.' }
          ],
            remediations: { 'the-decline-of-large-imperial': { steps: ['To fix this misconception, compare a map of Mauryan/Gupta major cities with an early medieval map showing temple towns.', 'Step through the shift by showing how political fragmentation led to regional power centers rather than total economic.', 'Emphasize that while North Indian imperial hubs shrank, South Indian maritime trade with Southeast Asia actually.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch06_010', difficulty: 'standard',
          question: 'This node explores the development of regional languages, classical literature.',
          hint: 'Review the role of court poets like Banabhatta under Harshavardhana and how Gupta rulers.',
          misconception: 'Students often assume that the decline of a single pan-Indian empire like the Gupta Empire meant an immediate collapse.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'This node explores the development of regional languages, classical literature, royal',
                  options: ['This node explores the development of regional languages, classical literature, royal', 'The post-Gupta period (roughly 6th to 10th centuries CE) is a phase in Indian history', 'The rule of Harshavardhana in the 7th century CE (606–647 CE) marked a significant period', 'The Chalukya Dynasty was a prominent imperial power that ruled large parts of the Deccan'],
                  hint: 'Review the role of court poets like Banabhatta under Harshavardhana and how Gupta rulers issued.',
                  misconception: 'Students often assume that the decline of a single pan-Indian empire like the Gupta Empire meant an immediate collapse of learning and.' }
          ],
            remediations: { 'the-decline-of-a-single': { steps: ['To fix this misconception, compare a map of the unified Gupta Empire with a map of 8th-century regional kingdoms (like.', 'Notice how each new regional capital established its own court poets, scholars, and temple scripts.', 'Explain that culture did not vanish; rather, it multiplied into diverse regional traditions.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch06_011', difficulty: 'standard',
          question: 'The Shore Temple at Mamallapuram (Mahabalipuram), built during the 7th and 8th.',
          hint: 'Review the architectural achievements of the Pallava dynasty under c7_hist_ch06_004 and.',
          misconception: 'Students often confuse the various building phases at Mamallapuram, mistakenly believing that all monuments there—the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Shore Temple at Mamallapuram (Mahabalipuram), built during the 7th and 8th centuries',
                  options: ['The Shore Temple at Mamallapuram (Mahabalipuram), built during the 7th and 8th centuries', 'The post-Gupta period (roughly 6th to 10th centuries CE) is a phase in Indian history', 'The rule of Harshavardhana in the 7th century CE (606–647 CE) marked a significant period', 'The Chalukya Dynasty was a prominent imperial power that ruled large parts of the Deccan'],
                  hint: 'Review the architectural achievements of the Pallava dynasty under c7_hist_ch06_004 and the.',
                  misconception: 'Students often confuse the various building phases at Mamallapuram, mistakenly believing that all monuments there—the rock-cut caves, the.' }
          ],
            remediations: { 'students-often-confuse-the-various': { steps: ['To correct this, guide the student through a chronological comparison using a timeline of Pallava rulers.', 'First, have them examine images of a cave temple (Mahendravarman I), then a monolithic ratha carved from a boulder.', 'Emphasize how engineering skills evolved from carving existing rock to quarrying, transporting, and assembling.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
