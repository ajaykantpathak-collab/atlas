import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hist_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hist_ch06_p1: SimDef = {
    id: 'v3_c7_hist_ch06_p1',
    title: 'Empires and Kingdoms: 6th to 10th Centuries · Part 1/2',
    subtitle: 'Covers the structural and political transition from the Gupta Empire to regional kingdoms.',
    classLevel: 7, subject: 'history', topic: 'Empires and Kingdoms: 6th to 10th Centuries · Part 1/2',
    chapters: ['c7_hist_ch06'],
    nodeIds: ['c7_hist_ch06_001', 'c7_hist_ch06_002', 'c7_hist_ch06_003', 'c7_hist_ch06_004', 'c7_hist_ch06_005', 'c7_hist_ch06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine looking at a massive, sturdy clay pot that cracks into dozens of smaller, individual pieces after.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'When the Gupta empire weakened around the 6th century, its own governors and military chiefs — the samantas — quietly became independent kings. What made that possible?',
        options: ['Kings had begun paying officials with land grants instead of coins, so local chiefs controlled revenue and armies of their own — and stopped sending tribute', 'The samantas invented a new religion first', 'All the emperors simply forgot to collect taxes', 'Foreign powers appointed each samanta as king'],
        answer: 'Kings had begun paying officials with land grants instead of coins, so local chiefs controlled revenue and armies of their own — and stopped sending tribute',
        hook: 'Fragmentation was not a dark age. As the centre faded, regional languages, temple styles, and local economies flourished — power scattered into many capitals, and culture scattered with it.',
    },
    teaching: [
        { title: 'Post-Gupta Period: Political Fragmentation', text: 'The post-Gupta period (roughly 6th to 10th centuries CE) is a phase in Indian history characterized by the decline of large centralized empires like the Guptas, leading to political fragmentation.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hist_ch06_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Track the cracks in the clay pot — from fading coinage to land-grant payments to samantas declaring independence — then find three regional cultures that bloomed in the pieces.',
        labels: ['Post-Gupta Period: Political Fragmentation', 'Harshavardhana: Kingdom of Kannauj', 'Chalukya Dynasty: Deccan Kingdom', 'Pallava Dynasty: South Indian', 'Arab Invasions: Early Medieval', 'Shankaracharya and the Revival'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c7_hist_ch06_001', title: 'Post-Gupta Period: Political Fragmentation',
          caseStudy: { intro: 'Imagine looking at a massive, sturdy clay pot that cracks into dozens of smaller, individual pieces after being dropped.',
            decisions: [{ prompt: 'What title was commonly assumed by powerful military chiefs or local governors who gained independence from a weakened central empire.', options: [
                { text: '*samanta* (or *maha-samanta*)', outcome: 'The correct answer is *samanta* (or *maha-samanta*). If a student answers with "Emperor".' },
                { text: 'Emperor', outcome: 'Not quite — Students often think that the collapse of a major empire like the Gupta dynasty means the entire.', reveals: 'the-collapse-of-a-major' },
                { text: 'Mauryan official', outcome: 'Not quite — Students often think that the collapse of a major empire like the Gupta dynasty means the entire.', reveals: 'the-collapse-of-a-major' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch06_002', title: 'Harshavardhana: Kingdom of Kannauj',
          caseStudy: { intro: 'Imagine visiting a grand historical ruins site and wondering how a single city, like Kannauj, became the ultimate prize that kings fought over for centuries.',
            decisions: [{ prompt: 'Who was the court poet of Harshavardhana who wrote his biography titled \'Harshacharita\'?', options: [
                { text: 'The court poet was Bana Bhatta', outcome: 'The court poet was Bana Bhatta. A wrong answer like "Kalidasa" shows a confusion between the Gupta.' },
                { text: 'Kalidasa', outcome: 'Not quite — Students often confuse the political unification achieved by Harshavardhana with the permanent.', reveals: 'students-often-confuse-the-political' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch06_003', title: 'Chalukya Dynasty: Deccan Kingdom and Temples',
          caseStudy: { intro: 'Imagine visiting a magnificent stone temple carved directly out of a cliff face, like the rock-cut cave temples of Badami in Karnataka, and wondering who.',
            decisions: [{ prompt: 'Who was the most famous Chalukya ruler of Badami who successfully defeated Harshavardhana on the banks of the Narmada River?', options: [
                { text: 'Pulakeshin II was the most celebrated Chalukya ruler who checked Harshavardhana\'s', outcome: 'Pulakeshin II was the most celebrated Chalukya ruler who checked Harshavardhana\'s expansion.' },
                { text: 'Pulakeshin I', outcome: 'Not quite — Students often confuse the Chalukyas of Badami (6th–8th century CE) with the later Western.', reveals: 'students-often-confuse-the-chalukyas' },
                { text: 'Mauryan or Gupta rulers', outcome: 'Not quite — Students often confuse the Chalukyas of Badami (6th–8th century CE) with the later Western.', reveals: 'students-often-confuse-the-chalukyas' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A king in 7th-century India, short on coins as long-distance trade shrinks, starts paying his military officers with villages — each officer may collect the land revenue himself and keep his own armed men. A student predicts this will strengthen the kingdom.',
            decisions: [{ prompt: 'What is the land-grant policy actually setting in motion?', options: [
                { text: 'It hands each officer independent control of revenue and soldiers; as these samantas grow wealthy and armed, they stop sending tribute and declare their own kingdoms — the policy fragments the realm, which is exactly how post-Gupta India splintered.', outcome: 'This follows the causal chain: scarce coinage leads to land payment, land payment builds autonomous local power, and autonomy breaks the centre.' },
                { text: 'The prediction is right — paid-in-land officers will stay loyal, because land is worth more than coins and gratitude guarantees obedience.', outcome: 'Loyalty fails precisely because the grant makes the officer self-sufficient; once he controls revenue and troops locally, he no longer needs the emperor.', reveals: 'land-grants-strengthen' },
                { text: 'It will trigger a total dark age — once the empire fragments, all culture, temples and learning will disappear too.', outcome: 'Fragmentation moved power to regional courts that patronised temples, regional languages and local economies — political disunity is not civilisational collapse.', reveals: 'fragmentation-equals-darkness' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch06_006', title: 'The bigger picture',
          caseStudy: { intro: 'When a big pot cracks, it does not vanish — it becomes many smaller vessels. Each regional kingdom carried its own art, language, and pride.',
            decisions: [{ prompt: 'What comes next? Empires and Kingdoms: 6th to 10th Centuries · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Empires and Kingdoms: 6th to 10th Centuries · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hist_ch06_001', difficulty: 'standard',
          question: 'The post-Gupta period (roughly 6th to 10th centuries CE) is a phase in Indian.',
          hint: 'Review the administrative structure of the Gupta Empire in Class 6 history.',
          misconception: 'Students often think that the collapse of a major empire like the Gupta dynasty means the entire society, economy, and.',
          parts: [
                { id: 'a', prompt: 'What title was commonly assumed by powerful military chiefs or local governors who gained independence from a weakened central empire in the post-Gupta period?', answer: '*samanta* (or *maha-samanta*)',
                  options: ['*samanta* (or *maha-samanta*)', 'Emperor', 'Mauryan official'],
                  hint: 'Review the administrative structure of the Gupta Empire in Class 6 history (c6_history_ch05_013).',
                  misconception: 'Students often think that the collapse of a major empire like the Gupta dynasty means the entire society, economy, and culture collapsed.' }
          ],
            remediations: { 'the-collapse-of-a-major': { steps: ['To fix this misconception, have the student compare a map of the unified Gupta Empire with a map of 8th-century.', 'Point out that while one central government fell, new regional capitals like Kannauj arose, and magnificent temples.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch06_002', difficulty: 'standard',
          question: 'The rule of Harshavardhana in the 7th century CE (606–647 CE) marked.',
          hint: 'Review the breakdown of the Gupta Empire and the emergence of regional powers.',
          misconception: 'Students often confuse the political unification achieved by Harshavardhana with the permanent centralization of.',
          parts: [
                { id: 'a', prompt: 'Who was the court poet of Harshavardhana who wrote his biography titled \'Harshacharita\'?', answer: 'The court poet was Bana Bhatta',
                  options: ['The court poet was Bana Bhatta', 'Kalidasa'],
                  hint: 'Review the breakdown of the Gupta Empire and the emergence of regional powers in post-Gupta North.',
                  misconception: 'Students often confuse the political unification achieved by Harshavardhana with the permanent centralization of an empire like the Mauryas.' }
          ],
            remediations: { 'students-often-confuse-the-political': { steps: ['To fix this, guide the student to compare a map of Harsha\'s sphere of influence with a map of local feudatory domains.', 'Have them read a short excerpt on how regional chiefs provided troops to Harsha.', 'Explain that unlike a modern centralized state, if the central king died without a strong successor, these local chiefs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch06_003', difficulty: 'standard',
          question: 'The Chalukya Dynasty was a prominent imperial power that ruled large parts.',
          hint: 'Review the political transition covered in c7_hist_ch06_001 regarding post-Gupta.',
          misconception: 'Students often confuse the Chalukyas of Badami (6th–8th century CE) with the later Western Chalukyas of Kalyani.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Chalukya Dynasty was a prominent imperial power that ruled large parts of the Deccan',
                  options: ['The Chalukya Dynasty was a prominent imperial power that ruled large parts of the Deccan', 'The post-Gupta period (roughly 6th to 10th centuries CE) is a phase in Indian history', 'The rule of Harshavardhana in the 7th century CE (606–647 CE) marked a significant period', 'The Pallava dynasty was a powerful South Indian kingdom that ruled parts of present-day'],
                  hint: 'Review the political transition covered in c7_hist_ch06_001 regarding post-Gupta political.',
                  misconception: 'Students often confuse the Chalukyas of Badami (6th–8th century CE) with the later Western Chalukyas of Kalyani (10th–12th century CE).' }
          ],
            remediations: { 'students-often-confuse-the-chalukyas': { steps: ['To fix this chronological and geographic confusion, use a comparative timeline and a regional map.', 'First, locate Badami (Vatapi) in modern-day northern Karnataka on a map and tie it strictly to the 6th–8th century.', 'Second, contrast this with Kalyani to show how dynasties evolved into later branches separated by centuries.', 'Finally, verify building styles: early Chalukya architecture features experimental rock-cut shrines, whereas later.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch06_004', difficulty: 'standard',
          question: 'The Pallava dynasty was a powerful South Indian kingdom that ruled parts.',
          hint: 'Review c7_hist_ch06_001 to understand how political power shifted to regional dynasties.',
          misconception: 'Students often confuse the Pallavas of Kanchipuram with the later Palas of Bengal or the Pandyas of Madurai due.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Pallava dynasty was a powerful South Indian kingdom that ruled parts of present-day',
                  options: ['The Pallava dynasty was a powerful South Indian kingdom that ruled parts of present-day', 'The post-Gupta period (roughly 6th to 10th centuries CE) is a phase in Indian history', 'The rule of Harshavardhana in the 7th century CE (606–647 CE) marked a significant period', 'The Chalukya Dynasty was a prominent imperial power that ruled large parts of the Deccan'],
                  hint: 'Review c7_hist_ch06_001 to understand how political power shifted to regional dynasties across the.',
                  misconception: 'Students often confuse the Pallavas of Kanchipuram with the later Palas of Bengal or the Pandyas of Madurai due to similar-sounding names.' }
          ],
            remediations: { 'students-often-confuse-the-pallavas': { steps: ['To fix this confusion, have the student draw a quick South India map marking Kanchipuram for Pallavas and Madurai for.', 'Emphasize that Pallavas ruled the northern part of Tamil Nadu and parts of Andhra Pradesh, while Pandyas were further.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch06_005', difficulty: 'standard',
          question: 'This node examines the early medieval Arab incursions into the Indian.',
          hint: 'Review c7_hist_ch06_001 (Post-Gupta Period: Political Fragmentation) to recall how.',
          misconception: 'Students often confuse the 8th-century Arab invasion of Sindh by Muhammad bin Qasim with the 11th-century raids.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'This node examines the early medieval Arab incursions into the Indian subcontinent,',
                  options: ['This node examines the early medieval Arab incursions into the Indian subcontinent,', 'The post-Gupta period (roughly 6th to 10th centuries CE) is a phase in Indian history', 'The rule of Harshavardhana in the 7th century CE (606–647 CE) marked a significant period', 'The Chalukya Dynasty was a prominent imperial power that ruled large parts of the Deccan'],
                  hint: 'Review c7_hist_ch06_001 (Post-Gupta Period: Political Fragmentation) to recall how regional.',
                  misconception: 'Students often confuse the 8th-century Arab invasion of Sindh by Muhammad bin Qasim with the 11th-century raids of Mahmud of Ghazni or the.' }
          ],
            remediations: { 'students-often-confuse-the-8th': { steps: ['To fix this chronological confusion, guide the student to build a simple timeline comparing 712 CE (Muhammad bin Qasim.', '1000–1027 CE (Mahmud of Ghazni\'s temple raids from Afghanistan), and 1192 CE (Muhammad Ghori and the Battle of Tarain.', 'Use a map of India to visually separate Sindh in the west from Kannauj, Delhi, and Gujarat to show that different.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch06_006', difficulty: 'standard',
          question: 'The religious and philosophical movement led by Adi Shankaracharya in the.',
          hint: 'Review c7_hist_ch06_001 (Post-Gupta Period: Political Fragmentation) to understand why.',
          misconception: 'Students often think that Adi Shankaracharya was a political emperor who used the army of a major dynasty to forcefully.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The religious and philosophical movement led by Adi Shankaracharya in the 8th-9th century',
                  options: ['The religious and philosophical movement led by Adi Shankaracharya in the 8th-9th century', 'The post-Gupta period (roughly 6th to 10th centuries CE) is a phase in Indian history', 'The rule of Harshavardhana in the 7th century CE (606–647 CE) marked a significant period', 'The Chalukya Dynasty was a prominent imperial power that ruled large parts of the Deccan'],
                  hint: 'Review c7_hist_ch06_001 (Post-Gupta Period: Political Fragmentation) to understand why.',
                  misconception: 'Students often think that Adi Shankaracharya was a political emperor who used the army of a major dynasty to forcefully convert people back.' }
          ],
            remediations: { 'adi-shankaracharya-was-a-political': { steps: ['To fix this misconception, compare a map of the politically fragmented 8th-century kingdoms (c7_hist_ch06_001) with the.', 'Emphasize that because India had many different kings who fought each other, a traveling monk could not have moved.', 'Read excerpts from his commentaries on the Upanishads to show that his tools were logic, Sanskrit scholarship, and.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
