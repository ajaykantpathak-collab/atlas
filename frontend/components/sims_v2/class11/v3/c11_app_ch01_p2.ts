import type { SimDef } from '../../engine/types';

/** v3 generated — c11_app_ch01_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_app_ch01_p2: SimDef = {
    id: 'v3_c11_app_ch01_p2',
    title: 'Numbers Quantification · Part 2/2',
    subtitle: 'This node covers the fundamental definition of logarithms, conversion between logarithmic.',
    classLevel: 11, subject: 'app', topic: 'Numbers Quantification · Part 2/2',
    chapters: ['c11_app_ch01'],
    nodeIds: ['c11_app_cbse_01_007', 'c11_app_cbse_01_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'Start by asking: "If $2^5 = 32$, how would you write a math sentence that asks: *\'2 raised to what power.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Write the logarithmic equation $\\log_4 64 = x$ in exponential form and state the value of $x$.',
        options: ['Exponential form: $4^x = 64$', '2 × 3 = 6, close to 8', '2 multiplied 3 times'],
        answer: 'Exponential form: $4^x = 64$',
        hook: '**"The base of the logarithm is the number you multiply by."** Students see $\\log_2 8 = 3$ and think "2 × 3 = 6, close.',
    },
    teaching: [
        { title: 'Logarithms', text: 'For positive real numbers $N$ (the argument) and $b$ (the base), where $b \\neq 1$, the logarithm of $N$ to the base $b$, denoted $\\log_b N$, is the unique real number $x$ such that $b^x = N$.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_app_cbse_01_007', title: 'Logarithms',
          scaffold: { problem: 'The intensity of sound $I$ (in W/m²) is related to the decibel level $L$ by $L = 10 \\log_{10}(I / I_0)$, where $I_0 = 10^{-12}$ W/m² is the.',
            steps: [
            { text: 'Identify given: $L = 50$, $I_0 = 10^{-12}$. Formula: $L = 10 \\log_{10}(I / I_0)$. Unknown: $I$.' },
            { text: 'Substitute values: $50 = 10 \\log_{10}(I / 10^{-12})$.' },
            { text: 'Divide both sides by 10: $5 = \\log_{10}(I / 10^{-12})$.' },
            { text: 'Convert to exponential form using definition: $10^5 = I / 10^{-12}$.' },
            { text: 'Solve for $I$: $I = 10^5 \\times 10^{-12} = 10^{-7}$ W/m².' },
            { text: 'Verify: $\\log_{10}(10^{-7} / 10^{-12}) = \\log_{10}(10^5) = 5$, so $L = 10 \\times 5 = 50$ dB. ✓', faded: true, blankAnswer: '$I = 1 \\times 10^{-7}$ W/m² (or $10^{-7}$ W/m²).' }
            ] } },
        { type: 'case', nodeId: 'c11_app_cbse_01_008', title: 'Laws and Properties of Logarithms',
          caseStudy: { intro: 'Suppose you are a seismologist analyzing an earthquake: the Richter scale formula $R = \\log_{10}(A/A_0)$ gives you a magnitude of 5.2, but you need to find the.',
            decisions: [{ prompt: 'State the three fundamental laws of logarithms for base $b$ ($b>0, b\\neq 1$) and specify the domain restrictions on the arguments $M$ and.', options: [
                { text: '**Correct Answer:** 1', outcome: '**Correct Answer:** 1. **Product Law:** $\\log_b(MN) = \\log_b M + \\log_b N$; Domain: $M>0, N>0$. 2.' },
                { text: 'cancel', outcome: 'Not quite — **The "Distributive Log" Fallacy:** Students universally believe $\\log_b(M + N) = \\log_b M + \\log_b.', reveals: 'the-distributive-log-fallacy-students' }
            ] }] } },
        { type: 'case', nodeId: 'c11_app_cbse_01_008', title: 'You made it',
          caseStudy: { intro: 'You finished Numbers Quantification — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c11_app_cbse_01_007', difficulty: 'standard',
          question: 'For positive real numbers $N$ (the argument) and $b$ (the base), where $b \\neq.',
          hint: 'Review "Negative Exponents" and "Fractional Powers" in c11_app_cbse_01_006 — specifically.',
          misconception: '**"The base of the logarithm is the number you multiply by."** Students see $\\log_2 8 = 3$ and think "2 × 3 = 6, close.',
          parts: [
                { id: 'a', prompt: 'Write the logarithmic equation $\\log_4 64 = x$ in exponential form and state the value of $x$.', answer: 'Exponential form: $4^x = 64$',
                  options: ['Exponential form: $4^x = 64$', '2 × 3 = 6, close to 8', '2 multiplied 3 times', '"2 × 3 = 6, close to 8" or "2 multiplied 3 times'],
                  hint: 'Review "Negative Exponents" and "Fractional Powers" in c11_app_cbse_01_006 — specifically practice.',
                  misconception: '**"The base of the logarithm is the number you multiply by."** Students see $\\log_2 8 = 3$ and think "2 × 3 = 6, close to 8" or "2.' },
                { id: 'b', prompt: 'Explain in your own words why $\\log_5 (-25)$ is undefined in the real number system, but $\\log_5 (1/25)$ is defined and equals $-2$.', answer: '$\\log_5 (-25)$ asks "5 raised to what power gives -25?" No real exponent works',
                  options: ['$\\log_5 (-25)$ asks "5 raised to what power gives -25?" No real exponent works', 'log of negative is not allowed', '2 × 3 = 6, close to 8', '2 multiplied 3 times'],
                  hint: 'Review "Negative Exponents" and "Fractional Powers" in c11_app_cbse_01_006 — specifically practice.',
                  misconception: '**"The base of the logarithm is the number you multiply by."** Students see $\\log_2 8 = 3$ and think "2 × 3 = 6, close to 8" or "2.' },
                { id: 'c', prompt: 'Evaluate without a calculator: $\\log_{\\sqrt{2}} 8$.', answer: 'Let $x = \\log_{\\sqrt{2}} 8$',
                  options: ['Let $x = \\log_{\\sqrt{2}} 8$', '2 × 3 = 6, close to 8', '2 multiplied 3 times', '"2 × 3 = 6, close to 8" or "2 multiplied 3 times'],
                  hint: 'Review "Negative Exponents" and "Fractional Powers" in c11_app_cbse_01_006 — specifically practice.',
                  misconception: '**"The base of the logarithm is the number you multiply by."** Students see $\\log_2 8 = 3$ and think "2 × 3 = 6, close to 8" or "2.' },
                { id: 'd', prompt: 'Compare $\\log_2 10$ and $\\log_3 10$. Which is larger? Justify without calculating decimal values.', answer: '$\\log_2 10 > \\log_3 10$',
                  options: ['$\\log_2 10 > \\log_3 10$', '2 × 3 = 6, close to 8', '2 multiplied 3 times', '"2 × 3 = 6, close to 8" or "2 multiplied 3 times'],
                  hint: 'Review "Negative Exponents" and "Fractional Powers" in c11_app_cbse_01_006 — specifically practice.',
                  misconception: '**"The base of the logarithm is the number you multiply by."** Students see $\\log_2 8 = 3$ and think "2 × 3 = 6, close to 8" or "2.' }
          ],
            remediations: { 'the-base-of-the-logarithm': { steps: ['**Re-anchor to Indices:** Have the student write $2^1, 2^2, 2^3, 2^4, 2^5$ as repeated multiplication (2, 2×2.', 'Ask: "How many 2\'s are multiplied in $2^5$?" (Answer: 5).', 'Then write $\\log_2 32 = \\_\\_$ and say: "This blank asks exactly the same question." 2.', '**Use the "Box Method":** Draw $\\log_{\\boxed{2}} \\boxed{32} = \\boxed{?}$.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**"The base of the logarithm is the number you multiply by."** Students see $\\log_2 8 = 3$ and think "2 × 3 = 6, close.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Since $\\log_{10} 100 = 2$ and $\\log_{10} 1000 = 3$, then $\\log_{10} 200$ must be exactly 2.5 because 200 is halfway between 100 and 1000.".', answer: 'The claim is **false**',
                  options: ['The claim is **false**', '2 × 3 = 6, close to 8', '2 multiplied 3 times', '"2 × 3 = 6, close to 8" or "2 multiplied 3 times'],
                  hint: 'Review "Negative Exponents" and "Fractional Powers" in c11_app_cbse_01_006 — specifically practice.',
                  misconception: '**"The base of the logarithm is the number you multiply by."** Students see $\\log_2 8 = 3$ and think "2 × 3 = 6, close to 8" or "2.' },
                { id: 'b', prompt: 'Create a real-life scenario (Indian context) where a quantity grows such that its logarithm (base 10) increases by 1 every year.', answer: 'Scenario: A viral video\'s view count grows 10× each year',
                  options: ['Scenario: A viral video\'s view count grows 10× each year', '2 × 3 = 6, close to 8', '2 multiplied 3 times', '"2 × 3 = 6, close to 8" or "2 multiplied 3 times'],
                  hint: 'Review "Negative Exponents" and "Fractional Powers" in c11_app_cbse_01_006 — specifically practice.',
                  misconception: '**"The base of the logarithm is the number you multiply by."** Students see $\\log_2 8 = 3$ and think "2 × 3 = 6, close to 8" or "2.' }
          ],
            remediations: { 'the-base-of-the-logarithm': { steps: ['**Re-anchor to Indices:** Have the student write $2^1, 2^2, 2^3, 2^4, 2^5$ as repeated multiplication (2, 2×2.', 'Ask: "How many 2\'s are multiplied in $2^5$?" (Answer: 5).', 'Then write $\\log_2 32 = \\_\\_$ and say: "This blank asks exactly the same question." 2.', '**Use the "Box Method":** Draw $\\log_{\\boxed{2}} \\boxed{32} = \\boxed{?}$.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_01_008', difficulty: 'standard',
          question: 'The laws of logarithms are algebraic identities derived from the laws.',
          hint: 'If stuck, review **c11_app_cbse_01_007 (Logarithms)** for the definition, domain, and.',
          misconception: '**The "Distributive Log" Fallacy:** Students universally believe $\\log_b(M + N) = \\log_b M + \\log_b N$ and $\\log_b(M.',
          parts: [
                { id: 'a', prompt: 'State the three fundamental laws of logarithms for base $b$ ($b>0, b\\neq 1$) and specify the domain restrictions on the arguments $M$ and $N$ for each law.', answer: '**Correct Answer:** 1',
                  options: ['**Correct Answer:** 1', 'cancel'],
                  hint: 'If stuck, review **c11_app_cbse_01_007 (Logarithms)** for the definition, domain, and basic.',
                  misconception: '**The "Distributive Log" Fallacy:** Students universally believe $\\log_b(M + N) = \\log_b M + \\log_b N$ and $\\log_b(M - N) = \\log_b.' },
                { id: 'b', prompt: 'Explain why $\\log_{10}(1000) = 3$ but $\\ln(1000) \\approx 6.908$.', answer: '**Correct Answer:** By definition, $\\log_b N = x \\iff b^x = N$',
                  options: ['**Correct Answer:** By definition, $\\log_b N = x \\iff b^x = N$', 'as a generic function like', 'rather than a function *parameterized by its base*'],
                  hint: 'If stuck, review **c11_app_cbse_01_007 (Logarithms)** for the definition, domain, and basic.',
                  misconception: '**The "Distributive Log" Fallacy:** Students universally believe $\\log_b(M + N) = \\log_b M + \\log_b N$ and $\\log_b(M - N) = \\log_b.' },
                { id: 'c', prompt: 'Simplify the expression $\\log_2(8x^3) - 2\\log_2(4x) + \\log_2(16)$ into a single logarithm, stating the domain of the resulting expression.', answer: '**Correct Answer with Steps:** 1',
                  options: ['**Correct Answer with Steps:** 1', 'cancel'],
                  hint: 'If stuck, review **c11_app_cbse_01_007 (Logarithms)** for the definition, domain, and basic.',
                  misconception: '**The "Distributive Log" Fallacy:** Students universally believe $\\log_b(M + N) = \\log_b M + \\log_b N$ and $\\log_b(M - N) = \\log_b.' }
          ],
            remediations: { 'the-distributive-log-fallacy-students': { steps: ['**Concrete Counterexample:** Have the student compute $\\log_{10}(10+100)$ and $\\log_{10}10 + \\log_{10}100$ on.', 'Ask: "If the law were true, what would $\\log(0)$ be?" ($\\log(1+(-1))$ invalid).', '**Visual/Graphical:** Plot $y = \\log(x+1)$ and $y = \\log x + \\log 1 = \\log x$.', 'Show they are different curves (horizontal shift vs vertical shift).'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
