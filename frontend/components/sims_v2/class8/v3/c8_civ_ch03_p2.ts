import type { SimDef } from '../../engine/types';

/** v3 generated — c8_civ_ch03_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_civ_ch03_p2: SimDef = {
    id: 'v3_c8_civ_ch03_p2',
    title: 'The Role of the Judiciary in Our Society · Part 2/2',
    subtitle: 'Decide what fairness really demands',
    classLevel: 8, subject: 'civics', topic: 'The Role of the Judiciary in Our Society · Part 2/2',
    chapters: ['c8_civ_ch03'],
    nodeIds: ['c8_civ_ch3_5', 'c8_civ_ch3_6', 'c8_civ_ch3_7', 'c8_civ_ch3_8', 'c8_civ_ch3_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a young citizens\' rights volunteer', intro: 'A worker underpaid, a family banned from a well, a newspaper silenced. Everyone calls these \'unfair\' — but can you explain exactly which promise of justice is broken, and who must fix it?', goal: 'Understand justice as social, economic and political fairness promised in the Preamble, and see why justice is wider than punishment — it protects dignity, rights and equal access.' },
    discovery: {
        question: 'A factory owner refuses to pay minimum wages, arguing the workers \'agreed\' to the lower pay. Which idea says the law can step in anyway?',
        options: ['Justice — private deals cannot override human dignity and fair labour standards', 'The workers agreed, so the deal is final', 'Only the police can decide wage disputes', 'Wages are a private matter the law can never touch'],
        answer: 'Justice — private deals cannot override human dignity and fair labour standards',
        hook: 'Most people think justice means punishing a criminal. But the Constitution promises social and economic justice in its Preamble — fairness kicks in long before any crime does.',
    },
    teaching: [
        { title: 'Structure of Indian Judiciary: Supreme Court', text: 'The Supreme Court is the apex (highest) court of India established under Part V, Chapter IV of the Indian Constitution, serving as the final interpreter of the Constitution and the ultimate guardian.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_civ_ch3_5', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Judge three real cases: a village where lower-caste families are banned from the main well, a city spending its budget on luxury parks while slums go without water, and a government trying to shut down a newspaper that exposed corruption. Decide which dimension of justice each one violates.',
        labels: ['Structure of Indian Judiciary', 'High Courts: State-Level Judicial', 'District and Subordinate Courts', 'Role of Judiciary: Dispute', 'Judicial Review: Power'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c8_civ_ch3_7', title: 'District and Subordinate Courts: Local Justice',
          caseStudy: { intro: 'Imagine a local market vendor in your town has a severe dispute with a landlord over unpaid rent and property damage, or a neighborhood conflict turns into.',
            decisions: [{ prompt: 'What is the primary judicial officer in charge of civil cases at the district level called?', options: [
                { text: 'The primary judicial officer for civil cases at the district level is called the District', outcome: 'The primary judicial officer for civil cases at the district level is called the District Judge.' },
                { text: 'a High Court Chief Justice or a District Collector', outcome: 'Not quite — Students often confuse the administrative role of the District Collector (an executive officer.', reveals: 'students-often-confuse-the-administrative' }
            ] }] } },
        { type: 'case', nodeId: 'c8_civ_ch3_5', title: 'Use it in the wild',
          caseStudy: { intro: 'In a school, one boy keeps grabbing all the cricket gear at recess. The sports committee debates two fixes: suspending him for a week, or writing a fair-turns roster so every class gets the kit.',
            decisions: [{ prompt: 'Which response is closer to the full idea of justice?', options: [
                { text: 'The roster — justice is not only punishing wrongdoing after it happens but building fair rules that prevent it; the Preamble promises social, economic and political justice, meaning equal access and dignity, not just penalties.', outcome: 'This widens justice from punishment to fairness-by-design: a system where no one can monopolise a shared resource in the first place.' },
                { text: 'Suspension alone — justice is complete only when a wrongdoer is punished hard enough to scare others.', outcome: 'Punishment is one slice of justice; without changing the unfair arrangement, the same grabbing starts again next term.', reveals: 'justice-is-punishment' },
                { text: 'Neither — it is just playground squabbling, and justice is a court-and-police word that does not apply to schools.', outcome: 'Justice applies wherever fairness is at stake; a classroom injustice is the small-scale version of the same principle the Constitution promises.', reveals: 'justice-only-in-courts' }
            ] }] } },
        { type: 'case', nodeId: 'c8_civ_ch3_9', title: 'You made it',
          caseStudy: { intro: 'Justice isn\'t just courts and punishments — it\'s fair pay, equal access to water, and a press that can question power. The Preamble promised it; the system has to deliver it.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_civ_ch3_5', difficulty: 'standard',
          question: 'The Supreme Court is the apex (highest) court of India established under Part.',
          hint: 'Review c8_civ_ch3_3 and c7_civ_ch03_002 to re-establish the roles of the legislature.',
          misconception: 'Students often think that the Supreme Court functions as a branch or department of the central government\'s executive.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Supreme Court is the apex (highest) court of India established under Part V, Chapter',
                  options: ['The Supreme Court is the apex (highest) court of India established under Part V, Chapter', 'Justice is the fundamental moral and legal principle that ensures fairness, equality, and', 'Repealing colonial laws refers to the post-independence legislative and judicial process', 'Alternative Dispute Resolution (ADR) refers to mechanisms like mediation and arbitration'],
                  hint: 'Review c8_civ_ch3_3 and c7_civ_ch03_002 to re-establish the roles of the legislature, executive.',
                  misconception: 'Students often think that the Supreme Court functions as a branch or department of the central government\'s executive branch, similar to.' }
          ],
            remediations: { 'the-supreme-court-functions-as': { steps: ['Remediate this by reviewing the structural independence of the judiciary.', 'Explain that while the executive appoints judges following constitutional procedures, once appointed, judges do not.', 'Use a real-world example: if the government passes a law that harms citizens\' rights, citizens sue the government.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_civ_ch3_6', difficulty: 'standard',
          question: 'A High Court is the highest judicial authority at the state level in India.',
          hint: 'Review node c8_civ_ch3_5 on the Supreme Court and c6_civics_ch12_019 on State Government.',
          misconception: 'Students often believe that High Courts are subordinate branches or local branch offices of the Supreme Court of India.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A High Court is the highest judicial authority at the state level in India, established',
                  options: ['A High Court is the highest judicial authority at the state level in India, established', 'Justice is the fundamental moral and legal principle that ensures fairness, equality, and', 'Repealing colonial laws refers to the post-independence legislative and judicial process', 'Alternative Dispute Resolution (ADR) refers to mechanisms like mediation and arbitration'],
                  hint: 'Review node c8_civ_ch3_5 on the Supreme Court and c6_civics_ch12_019 on State Government structure.',
                  misconception: 'Students often believe that High Courts are subordinate branches or local branch offices of the Supreme Court of India, functioning under.' }
          ],
            remediations: { 'high-courts-are-subordinate-branches': { steps: ['To fix this misconception, review the federal structure of India where power is divided between the Centre and the.', 'Explain that just as each state has its own Legislature and Executive (Chief Minister and Governor), each state.', 'Show that while the Supreme Court hears appeals from High Courts, it does not manage their day-to-day administration.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_civ_ch3_7', difficulty: 'standard',
          question: 'District and subordinate courts form the foundation of India\'s judicial.',
          hint: 'If stuck, review c8_civ_ch3_6 to understand how High Courts exercise supervisory.',
          misconception: 'Students often confuse the administrative role of the District Collector (an executive officer belonging to the Indian.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'District and subordinate courts form the foundation of India\'s judicial hierarchy at the',
                  options: ['District and subordinate courts form the foundation of India\'s judicial hierarchy at the', 'Justice is the fundamental moral and legal principle that ensures fairness, equality, and', 'Repealing colonial laws refers to the post-independence legislative and judicial process', 'Alternative Dispute Resolution (ADR) refers to mechanisms like mediation and arbitration'],
                  hint: 'If stuck, review c8_civ_ch3_6 to understand how High Courts exercise supervisory jurisdiction over.',
                  misconception: 'Students often confuse the administrative role of the District Collector (an executive officer belonging to the Indian Administrative.' }
          ],
            remediations: { 'students-often-confuse-the-administrative': { steps: ['To fix this misconception, explicitly separate the three organs of government at the district level.', 'Show students a chart comparing the Executive branch (District Collector, police superintendent, maintaining law and.', 'Emphasize that executive officers implement policy and manage administration, whereas judges interpret laws and resolve.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_civ_ch3_8', difficulty: 'standard',
          question: 'The judiciary functions as the third pillar of government, responsible for.',
          hint: 'Review c8_civ_ch3_7 to understand how district courts handle original civil and criminal.',
          misconception: 'Students often think that the judiciary\'s main job is simply to punish criminals, completely overlooking its massive.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The judiciary functions as the third pillar of government, responsible for dispute',
                  options: ['The judiciary functions as the third pillar of government, responsible for dispute', 'Justice is the fundamental moral and legal principle that ensures fairness, equality, and', 'Repealing colonial laws refers to the post-independence legislative and judicial process', 'Alternative Dispute Resolution (ADR) refers to mechanisms like mediation and arbitration'],
                  hint: 'Review c8_civ_ch3_7 to understand how district courts handle original civil and criminal disputes.',
                  misconception: 'Students often think that the judiciary\'s main job is simply to punish criminals, completely overlooking its massive role in civil dispute.' }
          ],
            remediations: { 'the-judiciary-s-main-job': { steps: ['To fix this, clarify that the legal system handles two distinct categories: civil law and criminal law.', 'Use the landlord-tenant example: explain that while the police handle crimes like theft (criminal), a disagreement over.', 'Emphasize that resolving disagreements peacefully through courts is a core pillar of maintaining public order in.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_civ_ch3_9', difficulty: 'standard',
          question: 'Judicial review is the power of the higher judiciary (the Supreme Court and.',
          hint: 'Review c8_civ_ch3_3 (Judiciary: Third Pillar of Government) and c7_civ_ch02_007 (Key.',
          misconception: 'Students often believe that because Parliament is democratically elected, any law it passes is completely final and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Judicial review is the power of the higher judiciary (the Supreme Court and High Courts)',
                  options: ['Judicial review is the power of the higher judiciary (the Supreme Court and High Courts)', 'Justice is the fundamental moral and legal principle that ensures fairness, equality, and', 'Repealing colonial laws refers to the post-independence legislative and judicial process', 'Alternative Dispute Resolution (ADR) refers to mechanisms like mediation and arbitration'],
                  hint: 'Review c8_civ_ch3_3 (Judiciary: Third Pillar of Government) and c7_civ_ch02_007 (Key Features.',
                  misconception: 'Students often believe that because Parliament is democratically elected, any law it passes is completely final and cannot be questioned.' }
          ],
            remediations: { 'because-parliament-is-democratically-elected': { steps: ['Clarify that in India, the Constitution is supreme, not Parliament.', 'Use the example of a school rule: even if the school captain and most students vote to ban a certain club, the school.', 'Similarly, Parliament makes laws, but the Supreme Court checks if those laws respect the higher rules of our national.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
