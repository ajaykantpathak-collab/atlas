import type { SimDef } from '../../engine/types';
import C12_HomeScienceIssuesConcernsAdolescentsSim from '../../../simulations/c6_12/C12_HomeScienceIssuesConcernsAdolescentsSim';

/** v3 wrapped master — C12_HomeScienceIssuesConcernsAdolescentsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_homescienceissuesconcernsadolescentssim: SimDef = {
    id: 'v3w_c12_homescienceissuesconcernsadolescentssim',
    title: 'Home Science Issues Concerns Adolescents',
    subtitle: 'This node covers biological, cognitive, emotional, and social changes during adolescence.',
    classLevel: 12, subject: 'science', topic: 'Adolescence: Developmental Changes and Challenges',
    chapters: [],
    nodeIds: ['c12_hs_cbse_03_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine a 14-year-old who suddenly refuses to eat meals with family, spends hours on social media, and snaps.', goal: 'Master Home Science Issues Concerns Adolescents.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'Adolescence is the transitional.', text: 'Adolescence is the transitional developmental stage between childhood and adulthood (approximately 10–19 years) characterized by rapid physical growth, sexual maturation, cognitive restructuring, and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_hs_cbse_03_009', title: 'Adolescence is the transitional.',
          scaffold: { problem: 'A 16-year-old boy in a metropolitan Indian school shows declining grades, irritability, and 4-hour daily social media use.',
            steps: [
            { text: 'Identify biological factor — delayed sleep phase syndrome (circadian shift in adolescence) exacerbated by blue-light.' },
            { text: 'Identify psychological factor — identity moratorium with academic pressure (board exams) creating "future self".' },
            { text: 'Identify social factor — nuclear family with both parents working, limited monitoring; peer group norms valorize.' },
            { text: 'Family-level intervention — "Contracted autonomy": collaborative rule-setting (e.g., devices charge outside bedroom.' },
            { text: 'School-level intervention — Integrate "Digital Citizenship" module into Life Skills curriculum (CBSE framework).' },
            { text: 'Monitor via weekly sleep diary, PHQ-9 (depression screen), and academic engagement metrics for 8 weeks.', faded: true, blankAnswer: 'Three interacting factors: (1) Biological — circadian delay.' }
            ] } }
    ],
    explore: { component: C12_HomeScienceIssuesConcernsAdolescentsSim, prompt: 'Explore the interactive — Home Science Issues Concerns Adolescents' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hs_cbse_03_009', difficulty: 'standard',
          question: 'Adolescence is the transitional developmental stage between childhood and.',
          hint: 'Revisit c11_hs_cbse_02_006 (identity development), c11_hs_cbse_02_008 (pubertal changes),.',
          misconception: 'Students often believe that "adolescent rebellion" is universal and biologically inevitable (Storm and Stress model by.',
          parts: [
                { id: 'a', prompt: 'A 13-year-old girl shows sudden mood swings, argues with parents about clothing choices, and insists on privacy.', answer: 'Erikson\'s stage "identity vs',
                  options: ['Erikson\'s stage "identity vs', 'adolescent rebellion'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "adolescent rebellion" is universal and biologically inevitable (Storm and Stress model by G. Stanley Hall).' },
                { id: 'b', prompt: 'Design a 4-session school-based module to reduce risky sexual behavior among 15-year-olds in an urban Indian school.', answer: 'Session 1: "My Brain on Risk"',
                  options: ['Session 1: "My Brain on Risk"', 'adolescent rebellion'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "adolescent rebellion" is universal and biologically inevitable (Storm and Stress model by G. Stanley Hall).' }
          ],
            remediations: { 'adolescent-rebellion-is-universal-and': { steps: ['If a student equates adolescence with inevitable rebellion, assign: (1) Read c11_psy_cbse_03_010 (Adolescence:.', '(2) Analyze the "Parent-Adolescent Conflict" dataset from NCERT\'s Class 12 Practical Manual — calculate percentage of.', '(3) Interview two adolescents from different family types (authoritative vs.', 'authoritarian) and compare conflict narratives.'] } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_03_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "adolescent rebellion" is universal and biologically inevitable (Storm and Stress model by.',
          parts: [
                { id: 'a', prompt: 'Create a "Digital Well-being Charter" co-designed by adolescents for adolescents that addresses cyberbullying, screen-time displacement of sleep/exercise, and.', answer: 'Example charter: Commitments',
                  options: ['Example charter: Commitments', 'adolescent rebellion'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "adolescent rebellion" is universal and biologically inevitable (Storm and Stress model by G. Stanley Hall).' }
          ],
            remediations: { 'adolescent-rebellion-is-universal-and': { steps: ['If a student equates adolescence with inevitable rebellion, assign: (1) Read c11_psy_cbse_03_010 (Adolescence:.', '(2) Analyze the "Parent-Adolescent Conflict" dataset from NCERT\'s Class 12 Practical Manual — calculate percentage of.', '(3) Interview two adolescents from different family types (authoritative vs.', 'authoritarian) and compare conflict narratives.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
