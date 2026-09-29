import type { SimDef } from '../../engine/types';
import C8_SocialScienceLawSocialJusticeSim from '../../../simulations/c6_12/C8_SocialScienceLawSocialJusticeSim';

/** v3 wrapped master — C8_SocialScienceLawSocialJusticeSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c8_socialsciencelawsocialjusticesim: SimDef = {
    id: 'v3w_c8_socialsciencelawsocialjusticesim',
    title: 'Law and Justice: Connection Between Them',
    subtitle: 'Covers the philosophical and practical relationship between enacted laws and the broader.',
    classLevel: 8, subject: 'science', topic: 'Law and Justice: Connection Between Them',
    chapters: [],
    nodeIds: ['c8_civ_ch3_2', 'c8_civ_ch3_1', 'c8_civ_ch3_11', 'c8_civ_ch3_3', 'c8_civ_ch3_4', 'c8_civ_ch3_7', 'c8_civ_ch3_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 8 learner', intro: 'Imagine a new municipal rule is passed requiring all street vendors to pay a heavy daily fee, which suddenly.', goal: 'Master Law and Justice: Connection Between Them.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'Law and justice are deeply interconnected.', text: 'Law and justice are deeply interconnected pillars of a democratic society; laws are the formal rules established by the legislature, while justice is the moral and constitutional ideal that ensures.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c8_civ_ch3_2', title: 'Law and justice are deeply.',
          scaffold: { problem: 'A city municipal corporation passes a strict law banning all evening food stalls to clear traffic congestion, without offering any.',
            steps: [
            { text: 'Identify the enacted rule (the law banning evening food stalls to manage traffic).' },
            { text: 'Identify the public goal behind the rule (traffic management and order).' },
            { text: 'Examine the impact on a specific group (low-income vendors losing their Right to Livelihood under Article 21).' },
            { text: 'Evaluate whether the law achieves true justice by weighing public order against fairness and protection of the.' },
            { text: 'Conclude that while the law aims for traffic order, it produces an unjust outcome because it destroys livelihoods.', faded: true, blankAnswer: 'The law is legally enacted but substantively unjust because.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_civ_ch3_1', title: 'Justice is the fundamental moral and.',
          scaffold: { problem: 'A village has two wells. One well is used exclusively by dominant landowners, while lower-caste families are forced to walk three.',
            steps: [
            { text: 'Identify the actors and the core issue (dominant landowners versus lower-caste families regarding water access).' },
            { text: 'Recall the constitutional principles of social justice and the abolition of untouchability under Fundamental Rights.' },
            { text: 'Apply the principle of equality—public resources and basic necessities like water cannot be barred based on caste or.' },
            { text: 'Analyze the systemic impact—denying access creates structural inequality and violates human dignity.' },
            { text: 'Conclude that this is a severe violation of social justice that requires legal intervention by the state.', faded: true, blankAnswer: 'Yes, this violates social justice because access to basic.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_civ_ch3_11', title: 'Alternative Dispute Resolution (ADR).',
          scaffold: { problem: 'Two business partners, Riya and Kabir, disagree on how to share profits from their startup.',
            steps: [
            { text: 'Identify the characteristics of the process—a neutral third party reviewing evidence and issuing a binding ruling.' },
            { text: 'Match these characteristics to the definition of arbitration, distinguishing it from mediation where the parties decide.' },
            { text: 'Analyze Riya and Kabir\'s requirement for a private and binding outcome without court delay.' },
            { text: 'Conclude that arbitration meets their need because it provides a definitive, binding decision quickly and privately.', faded: true, blankAnswer: 'The process is arbitration. It fits their needs because it.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_civ_ch3_3', title: 'The judiciary is the third pillar of.',
          scaffold: { problem: 'A local municipality passes a regulation prohibiting street vendors from setting up stalls in a certain market zone.',
            steps: [
            { text: 'Identify the actors and actions involved: the municipality (executive/local government) created a rule, and vendors.' },
            { text: 'Recall the three organs of government and their specific functions (legislature makes, executive enforces, judiciary.' },
            { text: 'Determine which organ handles legal disputes and constitutional challenges between citizens and government bodies.' },
            { text: 'Apply this principle to conclude that the judiciary must examine the dispute.' },
            { text: 'State the final conclusion: The judiciary acts as the impartial third pillar to interpret whether the municipal.', faded: true, blankAnswer: 'The judiciary must handle the conflict because its.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_civ_ch3_4', title: 'The independence of the judiciary is a.',
          scaffold: { problem: 'A prominent politician is accused of corruption. The ruling political party publicly states that if the judge finds the politician guilty,.',
            steps: [
            { text: 'Identify the actors and actions involved—the ruling party (executive/legislature members) is threatening a judge with a.' },
            { text: 'Recall the constitutional principle of judicial independence, which protects judges from political pressure, threats,.' },
            { text: 'Apply the principle to the scenario—threatening a judge with transfer creates fear, preventing them from delivering an.' },
            { text: 'Analyze the systemic impact—if politicians can manipulate judge postings based on verdict outcomes, the rule of law.' },
            { text: 'Conclude that the government\'s threat is a direct violation of judicial independence and unconstitutional, as courts.', faded: true, blankAnswer: 'The government\'s action violates judicial independence.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_civ_ch3_7', title: 'District and subordinate courts form.',
          scaffold: { problem: 'A local resident has been accused of committing theft in a neighborhood store.',
            steps: [
            { text: 'Identify the nature of the wrong—theft is a criminal offense against society governed by criminal law, requiring police.' },
            { text: 'Determine where the process begins—an FIR (First Information Report) is filed at the local police station, followed by.' },
            { text: 'Identify the correct subordinate court—criminal cases at the district level are brought before the court of a.' },
            { text: 'Analyze the trial process—the magistrate or sessions judge hears the evidence from both the prosecution and the.' },
            { text: 'State the conclusion—the subordinate criminal court delivers a verdict of acquittal or conviction based on proof beyond.', faded: true, blankAnswer: 'The case starts with a police investigation and is tried in.' }
            ] } },
        { type: 'dissect', nodeId: 'c8_civ_ch3_1', title: 'Identify each idea',
          dissect: { specimen: 'Law and Justice: Connection Between Them', spots: [
            { id: 's1', label: 'Law and justice are deeply', prompt: 'Which idea is this? — Law and justice are deeply interconnected pillars of a democratic society; laws are the.', answer: 'Law and justice are deeply', options: ['Law and justice are deeply', 'Justice is the fundamental moral', 'Alternative Dispute Resolution ADR refers', 'The judiciary is the third'] },
            { id: 's2', label: 'Justice is the fundamental moral', prompt: 'Which idea is this? — Justice is the fundamental moral and legal principle that ensures fairness, equality, and.', answer: 'Justice is the fundamental moral', options: ['Justice is the fundamental moral', 'Law and justice are deeply', 'Alternative Dispute Resolution ADR refers', 'The judiciary is the third'] },
            { id: 's3', label: 'Alternative Dispute Resolution ADR refers', prompt: 'Which idea is this? — Alternative Dispute Resolution (ADR) refers to mechanisms like mediation and arbitration.', answer: 'Alternative Dispute Resolution ADR refers', options: ['Alternative Dispute Resolution ADR refers', 'Law and justice are deeply', 'Justice is the fundamental moral', 'The judiciary is the third'] },
            { id: 's4', label: 'The judiciary is the third', prompt: 'Which idea is this? — The judiciary is the third pillar of government responsible for interpreting laws,.', answer: 'The judiciary is the third', options: ['The judiciary is the third', 'Law and justice are deeply', 'Justice is the fundamental moral', 'Alternative Dispute Resolution ADR refers'] },
            { id: 's5', label: 'The independence of the judiciary', prompt: 'Which idea is this? — The independence of the judiciary is a core constitutional principle ensuring that courts.', answer: 'The independence of the judiciary', options: ['The independence of the judiciary', 'Law and justice are deeply', 'Justice is the fundamental moral', 'Alternative Dispute Resolution ADR refers'] },
            { id: 's6', label: 'District and subordinate courts form', prompt: 'Which idea is this? — District and subordinate courts form the foundation of India\'s judicial hierarchy at the.', answer: 'District and subordinate courts form', options: ['District and subordinate courts form', 'Law and justice are deeply', 'Justice is the fundamental moral', 'Alternative Dispute Resolution ADR refers'] }
          ] } }
    ],
    explore: { component: C8_SocialScienceLawSocialJusticeSim, prompt: 'Explore the interactive — Law and Justice: Connection Between Them' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_civ_ch3_2', difficulty: 'standard',
          question: 'Law and justice are deeply interconnected pillars of a democratic society; laws.',
          hint: 'Review c6_civics_ch10_002 (Fundamental Rights) and c8_civ_ch3_1 (Justice: Concept and.',
          misconception: 'Students often think that "legal" and "just" mean the exact same thing, assuming that if a government body passes a.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Law and justice are deeply interconnected pillars of a democratic society',
                  options: ['Law and justice are deeply interconnected pillars of a democratic society', 'Justice is the fundamental moral and legal principle that ensures fairness, equality, and', 'Alternative Dispute Resolution (ADR) refers to mechanisms like mediation and arbitration', 'The judiciary is the third pillar of government responsible for interpreting laws,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "legal" and "just" mean the exact same thing, assuming that if a government body passes a rule or statute, it is.' }
          ],
            remediations: { 'legal-and-just-mean-the': { steps: ['To fix this, look at a historical or hypothetical example where a rule was legal but unfair—such as a rule that bans.', 'Does it treat people fairly based on equality?" Show that when a law violates equality or freedom, it fails the test of.'] } } },
        { type: 'subpart', nodeId: 'c8_civ_ch3_2', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that "legal" and "just" mean the exact same thing, assuming that if a government body passes a.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "As long as citizens follow all existing laws, justice is automatically achieved in society." Is this statement true or false, and why?', answer: 'This statement is false',
                  options: ['This statement is false', 'blind obedience equals a just society'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "legal" and "just" mean the exact same thing, assuming that if a government body passes a rule or statute, it is.' }
          ],
            remediations: { 'legal-and-just-mean-the': { steps: ['To fix this, look at a historical or hypothetical example where a rule was legal but unfair—such as a rule that bans.', 'Does it treat people fairly based on equality?" Show that when a law violates equality or freedom, it fails the test of.'] } } },
        { type: 'subpart', nodeId: 'c8_civ_ch3_1', difficulty: 'standard',
          question: 'Justice is the fundamental moral and legal principle that ensures fairness,.',
          hint: 'Review the Preamble to the Constitution and fundamental rights from Class 6 and 7 civics.',
          misconception: 'Students often confuse justice with mere revenge or police punishment, believing that whenever someone does something.',
          parts: [
                { id: 'a', prompt: 'What is the primary place where the ideals of social, economic, and political justice are formally promised to all Indian citizens?', answer: 'The correct answer is the Preamble to the Indian Constitution',
                  options: ['The correct answer is the Preamble to the Indian Constitution', 'justice'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse justice with mere revenge or police punishment, believing that whenever someone does something wrong, immediate.' }
          ],
            remediations: { 'students-often-confuse-justice-with': { steps: ['To fix this misconception, use the example of a school playground where one strong student takes all the sports.', 'Explain that true justice isn\'t just about punishing the bully after an argument, but establishing a rule where.', 'Connect this back to the Indian Constitution\'s Preamble, which promises social and economic fairness, not just police.'] } } },
        { type: 'subpart', nodeId: 'c8_civ_ch3_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse justice with mere revenge or police punishment, believing that whenever someone does something.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Justice is served only when a criminal is sent to prison." Is this a complete view of justice in a modern democracy?', answer: 'This is incomplete',
                  options: ['This is incomplete', 'justice'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse justice with mere revenge or police punishment, believing that whenever someone does something wrong, immediate.' }
          ],
            remediations: { 'students-often-confuse-justice-with': { steps: ['To fix this misconception, use the example of a school playground where one strong student takes all the sports.', 'Explain that true justice isn\'t just about punishing the bully after an argument, but establishing a rule where.', 'Connect this back to the Indian Constitution\'s Preamble, which promises social and economic fairness, not just police.'] } } },
        { type: 'subpart', nodeId: 'c8_civ_ch3_11', difficulty: 'standard',
          question: 'Alternative Dispute Resolution (ADR) refers to mechanisms like mediation and.',
          hint: 'Review c8_civ_ch3_8 to understand the traditional dispute resolution role of courts.',
          misconception: 'Students often confuse mediation with arbitration, assuming that a mediator has the power to order one party to pay a.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Alternative Dispute Resolution (ADR) refers to mechanisms like mediation and arbitration',
                  options: ['Alternative Dispute Resolution (ADR) refers to mechanisms like mediation and arbitration', 'Law and justice are deeply interconnected pillars of a democratic society', 'Justice is the fundamental moral and legal principle that ensures fairness, equality, and', 'The judiciary is the third pillar of government responsible for interpreting laws,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse mediation with arbitration, assuming that a mediator has the power to order one party to pay a fine or comply with a.' }
          ],
            remediations: { 'students-often-confuse-mediation-with': { steps: ['To correct this, take the example of two friends arguing over a shared book.', 'If a teacher listens and helps them share it nicely, that is mediation (they agree).', 'If the teacher takes the book and commands, "Student A keeps it today, Student B tomorrow," that is arbitration (the.', 'Emphasize that mediators facilitate; arbitrators decide.'] } } },
        { type: 'subpart', nodeId: 'c8_civ_ch3_3', difficulty: 'standard',
          question: 'The judiciary is the third pillar of government responsible for interpreting.',
          hint: 'Review c7_civ_ch03_002 to reinforce the distinct roles of the legislature, executive, and.',
          misconception: 'Students often think the judiciary creates laws or writes new policies just like the Parliament does, confusing the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The judiciary is the third pillar of government responsible for interpreting laws,',
                  options: ['The judiciary is the third pillar of government responsible for interpreting laws,', 'Law and justice are deeply interconnected pillars of a democratic society', 'Justice is the fundamental moral and legal principle that ensures fairness, equality, and', 'Alternative Dispute Resolution (ADR) refers to mechanisms like mediation and arbitration'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the judiciary creates laws or writes new policies just like the Parliament does, confusing the role of judges with.' }
          ],
            remediations: { 'the-judiciary-creates-laws-or': { steps: ['To fix this, guide the student through a clear separation exercise using a cricket match analogy: the legislature.', 'Show them a recent newspaper headline where Parliament debated a bill (legislature) versus a court ruling on a rights.'] } } },
        { type: 'subpart', nodeId: 'c8_civ_ch3_4', difficulty: 'standard',
          question: 'The independence of the judiciary is a core constitutional principle ensuring.',
          hint: 'Review c7_civ_ch03_002 to reinforce the distinct roles of the three organs of government.',
          misconception: 'Students often think that because judges in India are appointed by the executive (the President on the advice of the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The independence of the judiciary is a core constitutional principle ensuring that courts',
                  options: ['The independence of the judiciary is a core constitutional principle ensuring that courts', 'Law and justice are deeply interconnected pillars of a democratic society', 'Justice is the fundamental moral and legal principle that ensures fairness, equality, and', 'Alternative Dispute Resolution (ADR) refers to mechanisms like mediation and arbitration'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that because judges in India are appointed by the executive (the President on the advice of the cabinet/collegium),.' }
          ],
            remediations: { 'because-judges-in-india-are': { steps: ['Clarify the distinction using an employment analogy: Just because a school principal hires a science teacher does not.', 'Similarly, while the executive participates in appointing judges to set up the institution, once appointed,.', 'Review Article 124 and 217 regarding the security of tenure of Supreme Court and High Court judges.'] } } },
        { type: 'subpart', nodeId: 'c8_civ_ch3_7', difficulty: 'standard',
          question: 'District and subordinate courts form the foundation of India\'s judicial.',
          hint: 'If stuck, review c8_civ_ch3_6 to understand how High Courts exercise supervisory.',
          misconception: 'Students often confuse the administrative role of the District Collector (an executive officer belonging to the Indian.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'District and subordinate courts form the foundation of India\'s judicial hierarchy at the',
                  options: ['District and subordinate courts form the foundation of India\'s judicial hierarchy at the', 'Law and justice are deeply interconnected pillars of a democratic society', 'Justice is the fundamental moral and legal principle that ensures fairness, equality, and', 'Alternative Dispute Resolution (ADR) refers to mechanisms like mediation and arbitration'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the administrative role of the District Collector (an executive officer belonging to the Indian Administrative.' }
          ],
            remediations: { 'students-often-confuse-the-administrative': { steps: ['To fix this misconception, explicitly separate the three organs of government at the district level.', 'Show students a chart comparing the Executive branch (District Collector, police superintendent, maintaining law and.', 'Emphasize that executive officers implement policy and manage administration, whereas judges interpret laws and resolve.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
