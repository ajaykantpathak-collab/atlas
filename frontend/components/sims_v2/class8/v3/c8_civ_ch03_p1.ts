import type { SimDef } from '../../engine/types';

/** v3 generated — c8_civ_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_civ_ch03_p1: SimDef = {
    id: 'v3_c8_civ_ch03_p1',
    title: 'The Role of the Judiciary in Our Society · Part 1/2',
    subtitle: 'Decide what fairness really demands',
    classLevel: 8, subject: 'civics', topic: 'The Role of the Judiciary in Our Society · Part 1/2',
    chapters: ['c8_civ_ch03'],
    nodeIds: ['c8_civ_ch3_1', 'c8_civ_ch3_10', 'c8_civ_ch3_11', 'c8_civ_ch3_2', 'c8_civ_ch3_3', 'c8_civ_ch3_4'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a young citizens\' rights volunteer', intro: 'A worker underpaid, a family banned from a well, a newspaper silenced. Everyone calls these \'unfair\' — but can you explain exactly which promise of justice is broken, and who must fix it?', goal: 'Understand justice as social, economic and political fairness promised in the Preamble, and see why justice is wider than punishment — it protects dignity, rights and equal access.' },
    discovery: {
        question: 'A factory owner refuses to pay minimum wages, arguing the workers \'agreed\' to the lower pay. Which idea says the law can step in anyway?',
        options: ['Justice — private deals cannot override human dignity and fair labour standards', 'The workers agreed, so the deal is final', 'Only the police can decide wage disputes', 'Wages are a private matter the law can never touch'],
        answer: 'Justice — private deals cannot override human dignity and fair labour standards',
        hook: 'Most people think justice means punishing a criminal. But the Constitution promises social and economic justice in its Preamble — fairness kicks in long before any crime does.',
    },
    teaching: [
        { title: 'Justice: Concept and Importance in Society', text: 'Justice is the fundamental moral and legal principle that ensures fairness, equality, and the protection of individual rights within a society, serving as the core objective of the Indian.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_civ_ch3_1', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Judge three real cases: a village where lower-caste families are banned from the main well, a city spending its budget on luxury parks while slums go without water, and a government trying to shut down a newspaper that exposed corruption. Decide which dimension of justice each one violates.',
        labels: ['Justice: Concept and Importance', 'Repealing Colonial Laws: Post-Independence', 'Alternative Dispute Resolution: Mediation', 'Law and Justice: Connection', 'Judiciary: Third Pillar', 'Independence of the Judiciary'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c8_civ_ch3_1', title: 'Justice: Concept and Importance in Society',
          caseStudy: { intro: 'Imagine two students in a Class 8 classroom: one is unfairly blamed for a broken window without proof, while the other is never listened to because of their.',
            decisions: [{ prompt: 'What is the primary place where the ideals of social, economic, and political justice are formally promised to all Indian citizens?', options: [
                { text: 'the Preamble to the Indian Constitution', outcome: 'The correct answer is the Preamble to the Indian Constitution.' },
                { text: 'justice', outcome: 'Not quite — Students often confuse justice with mere revenge or police punishment, believing that whenever.', reveals: 'students-often-confuse-justice-with' }
            ] }] } },
        { type: 'case', nodeId: 'c8_civ_ch3_4', title: 'Independence of the Judiciary: Why It Matters',
          caseStudy: { intro: 'Imagine your school organizing a cricket tournament where the principal appoints the referee, but the captain of the winning team is also allowed to change the.',
            decisions: [{ prompt: 'What does the term "independence of the judiciary" mean in the context of the Indian government?', options: [
                { text: 'The independence of the judiciary means that courts and judges can make impartial', outcome: 'The independence of the judiciary means that courts and judges can make impartial decisions based.' },
                { text: 'independent', outcome: 'Not quite — Students often think that because judges in India are appointed by the executive (the President.', reveals: 'because-judges-in-india-are' },
                { text: 'above the law', outcome: 'Not quite — Students often think that because judges in India are appointed by the executive (the President.', reveals: 'because-judges-in-india-are' }
            ] }] } },
        { type: 'case', nodeId: 'c8_civ_ch3_1', title: 'Use it in the wild',
          caseStudy: { intro: 'In a school, one boy keeps grabbing all the cricket gear at recess. The sports committee debates two fixes: suspending him for a week, or writing a fair-turns roster so every class gets the kit.',
            decisions: [{ prompt: 'Which response is closer to the full idea of justice?', options: [
                { text: 'The roster — justice is not only punishing wrongdoing after it happens but building fair rules that prevent it; the Preamble promises social, economic and political justice, meaning equal access and dignity, not just penalties.', outcome: 'This widens justice from punishment to fairness-by-design: a system where no one can monopolise a shared resource in the first place.' },
                { text: 'Suspension alone — justice is complete only when a wrongdoer is punished hard enough to scare others.', outcome: 'Punishment is one slice of justice; without changing the unfair arrangement, the same grabbing starts again next term.', reveals: 'justice-is-punishment' },
                { text: 'Neither — it is just playground squabbling, and justice is a court-and-police word that does not apply to schools.', outcome: 'Justice applies wherever fairness is at stake; a classroom injustice is the small-scale version of the same principle the Constitution promises.', reveals: 'justice-only-in-courts' }
            ] }] } },
        { type: 'case', nodeId: 'c8_civ_ch3_4', title: 'The bigger picture',
          caseStudy: { intro: 'Justice isn\'t just courts and punishments — it\'s fair pay, equal access to water, and a press that can question power. The Preamble promised it; the system has to deliver it.',
            decisions: [{ prompt: 'What comes next? The Role of the Judiciary in Our Society · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Role of the Judiciary in Our Society · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_civ_ch3_1', difficulty: 'standard',
          question: 'Justice is the fundamental moral and legal principle that ensures fairness.',
          hint: 'Review the Preamble to the Constitution and fundamental rights from Class 6 and 7 civics.',
          misconception: 'Students often confuse justice with mere revenge or police punishment, believing that whenever someone does something.',
          parts: [
                { id: 'a', prompt: 'What is the primary place where the ideals of social, economic, and political justice are formally promised to all Indian citizens?', answer: 'the Preamble to the Indian Constitution',
                  options: ['the Preamble to the Indian Constitution', 'justice'],
                  hint: 'Review the Preamble to the Constitution and fundamental rights from Class 6 and 7 civics.',
                  misconception: 'Students often confuse justice with mere revenge or police punishment, believing that whenever someone does something wrong, immediate.' }
          ],
            remediations: { 'students-often-confuse-justice-with': { steps: ['To fix this misconception, use the example of a school playground where one strong student takes all the sports.', 'Explain that true justice isn\'t just about punishing the bully after an argument, but establishing a rule where.', 'Connect this back to the Indian Constitution\'s Preamble, which promises social and economic fairness, not just police.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_civ_ch3_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse justice with mere revenge or police punishment, believing that whenever someone does something.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Justice is served only when a criminal is sent to prison." Is this a complete view of justice in a modern democracy?', answer: 'This is incomplete',
                  options: ['This is incomplete', 'justice'],
                  hint: 'Review the Preamble to the Constitution and fundamental rights from Class 6 and 7 civics.',
                  misconception: 'Students often confuse justice with mere revenge or police punishment, believing that whenever someone does something wrong, immediate.' }
          ],
            remediations: { 'students-often-confuse-justice-with': { steps: ['To fix this misconception, use the example of a school playground where one strong student takes all the sports.', 'Explain that true justice isn\'t just about punishing the bully after an argument, but establishing a rule where.', 'Connect this back to the Indian Constitution\'s Preamble, which promises social and economic fairness, not just police.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_civ_ch3_10', difficulty: 'standard',
          question: 'Repealing colonial laws refers to the post-independence legislative and.',
          hint: 'Review Judicial Review: Power to Interpret Laws and Const (c8_civ_ch3_9) to see how.',
          misconception: 'Students often think that once India adopted its Constitution in 1950, all British-era laws automatically disappeared.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Repealing colonial laws refers to the post-independence legislative and judicial process',
                  options: ['Repealing colonial laws refers to the post-independence legislative and judicial process', 'Justice is the fundamental moral and legal principle that ensures fairness, equality, and', 'Alternative Dispute Resolution (ADR) refers to mechanisms like mediation and arbitration', 'Law and justice are deeply interconnected pillars of a democratic society'],
                  hint: 'Review Judicial Review: Power to Interpret Laws and Const (c8_civ_ch3_9) to see how courts check.',
                  misconception: 'Students often think that once India adopted its Constitution in 1950, all British-era laws automatically disappeared overnight.' }
          ],
            remediations: { 'once-india-adopted-its-constitution': { steps: ['Clarify the transition phase using Article 372 of the Constitution.', 'Explain with a concrete example: the Code of Criminal Procedure (CrPC) and police acts were inherited in 1950 to keep.', 'Show that legal reform is an ongoing post-independence process, not a single event.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_civ_ch3_11', difficulty: 'standard',
          question: 'Alternative Dispute Resolution (ADR) refers to mechanisms like mediation and.',
          hint: 'Review c8_civ_ch3_8 to understand the traditional dispute resolution role of courts.',
          misconception: 'Students often confuse mediation with arbitration, assuming that a mediator has the power to order one party to pay.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Alternative Dispute Resolution (ADR) refers to mechanisms like mediation and arbitration',
                  options: ['Alternative Dispute Resolution (ADR) refers to mechanisms like mediation and arbitration', 'Justice is the fundamental moral and legal principle that ensures fairness, equality, and', 'Repealing colonial laws refers to the post-independence legislative and judicial process', 'Law and justice are deeply interconnected pillars of a democratic society'],
                  hint: 'Review c8_civ_ch3_8 to understand the traditional dispute resolution role of courts before looking.',
                  misconception: 'Students often confuse mediation with arbitration, assuming that a mediator has the power to order one party to pay a fine or comply with.' }
          ],
            remediations: { 'students-often-confuse-mediation-with': { steps: ['To correct this, take the example of two friends arguing over a shared book.', 'If a teacher listens and helps them share it nicely, that is mediation (they agree).', 'If the teacher takes the book and commands, "Student A keeps it today, Student B tomorrow," that is arbitration (the.', 'Emphasize that mediators facilitate; arbitrators decide.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_civ_ch3_2', difficulty: 'standard',
          question: 'Law and justice are deeply interconnected pillars of a democratic society; laws.',
          hint: 'Review c6_civics_ch10_002 (Fundamental Rights) and c8_civ_ch3_1 (Justice: Concept and.',
          misconception: 'Students often think that "legal" and "just" mean the exact same thing, assuming that if a government body passes.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Law and justice are deeply interconnected pillars of a democratic society',
                  options: ['Law and justice are deeply interconnected pillars of a democratic society', 'Justice is the fundamental moral and legal principle that ensures fairness, equality, and', 'Repealing colonial laws refers to the post-independence legislative and judicial process', 'Alternative Dispute Resolution (ADR) refers to mechanisms like mediation and arbitration'],
                  hint: 'Review c6_civics_ch10_002 (Fundamental Rights) and c8_civ_ch3_1 (Justice: Concept and Importance.',
                  misconception: 'Students often think that "legal" and "just" mean the exact same thing, assuming that if a government body passes a rule or statute, it.' }
          ],
            remediations: { 'legal-and-just-mean-the': { steps: ['To fix this, look at a historical or hypothetical example where a rule was legal but unfair—such as a rule that bans.', 'Does it treat people fairly based on equality?" Show that when a law violates equality or freedom, it fails the test.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_civ_ch3_3', difficulty: 'standard',
          question: 'The judiciary is the third pillar of government responsible for interpreting.',
          hint: 'Review c7_civ_ch03_002 to reinforce the distinct roles of the legislature, executive, and.',
          misconception: 'Students often think the judiciary creates laws or writes new policies just like the Parliament does, confusing the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The judiciary is the third pillar of government responsible for interpreting laws,',
                  options: ['The judiciary is the third pillar of government responsible for interpreting laws,', 'Justice is the fundamental moral and legal principle that ensures fairness, equality, and', 'Repealing colonial laws refers to the post-independence legislative and judicial process', 'Alternative Dispute Resolution (ADR) refers to mechanisms like mediation and arbitration'],
                  hint: 'Review c7_civ_ch03_002 to reinforce the distinct roles of the legislature, executive, and judiciary.',
                  misconception: 'Students often think the judiciary creates laws or writes new policies just like the Parliament does, confusing the role of judges with.' }
          ],
            remediations: { 'the-judiciary-creates-laws-or': { steps: ['To fix this, guide the student through a clear separation exercise using a cricket match analogy: the legislature.', 'Show them a recent newspaper headline where Parliament debated a bill (legislature) versus a court ruling on a rights.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_civ_ch3_4', difficulty: 'standard',
          question: 'The independence of the judiciary is a core constitutional principle ensuring.',
          hint: 'Review c7_civ_ch03_002 to reinforce the distinct roles of the three organs of government.',
          misconception: 'Students often think that because judges in India are appointed by the executive (the President on the advice of the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The independence of the judiciary is a core constitutional principle ensuring that courts',
                  options: ['The independence of the judiciary is a core constitutional principle ensuring that courts', 'Justice is the fundamental moral and legal principle that ensures fairness, equality, and', 'Repealing colonial laws refers to the post-independence legislative and judicial process', 'Alternative Dispute Resolution (ADR) refers to mechanisms like mediation and arbitration'],
                  hint: 'Review c7_civ_ch03_002 to reinforce the distinct roles of the three organs of government before.',
                  misconception: 'Students often think that because judges in India are appointed by the executive (the President on the advice of the cabinet/collegium).' }
          ],
            remediations: { 'because-judges-in-india-are': { steps: ['Clarify the distinction using an employment analogy: Just because a school principal hires a science teacher does not.', 'Similarly, while the executive participates in appointing judges to set up the institution, once appointed.', 'Review Article 124 and 217 regarding the security of tenure of Supreme Court and High Court judges.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
