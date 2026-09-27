import type { SimDef } from '../../engine/types';

/** v3 generated — c9_eco_ch03 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_eco_ch03: SimDef = {
    id: 'v3_c9_eco_ch03',
    title: 'From Ideas to Startups',
    subtitle: 'This node covers the initial stage of entrepreneurship: recognizing opportunities from.',
    classLevel: 9, subject: 'economics', topic: 'From Ideas to Startups',
    chapters: ['c9_eco_ch03'],
    nodeIds: ['c9_eco_ch3_1', 'c9_eco_ch3_2', 'c9_eco_ch3_3', 'c9_eco_ch3_4', 'c9_eco_ch3_5'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: 'Start by thinking about a problem you’ve faced—like long queues at the school water cooler during break time.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'Entrepreneurship: From Idea to Opportunity', text: 'Entrepreneurship is the process of identifying a problem or unmet need in the market, developing an innovative solution, and organizing resources (like money, labor, and materials) to create and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_eco_ch3_1', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['Entrepreneurship: From Idea', 'What is a Startup?', 'Business Planning Basics', 'Government Support: Startup India', 'Innovation, Risk and Failure'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c9_eco_ch3_1', title: 'Entrepreneurship: From Idea to Opportunity',
          scaffold: { problem: 'Riya notices that after school, many students crowd around a single tea stall selling overpriced, weak tea.',
            steps: [
            { text: 'Identify the problem (students dissatisfied with current tea quality and price) and Riya’s proposed solution (better.' },
            { text: 'Recall that profit per unit = selling price – cost price, a key measure of financial viability in opportunity.' },
            { text: 'Plug in the numbers: selling price = ₹20, cost price = ₹8 (from uncle’s input).' },
            { text: 'Calculate: Profit = ₹20 – ₹8 = ₹12 per cup.' },
            { text: 'Interpret: Since 30 out of 40 students (75%) are willing to pay ₹20 and she earns ₹12 profit per cup, there is strong.', faded: true, blankAnswer: 'Profit per cup = ₹12. Yes, this suggests a viable.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_eco_ch3_3', title: 'Business Planning Basics',
          scaffold: { problem: 'A student wants to start a bicycle repair service in their colony.',
            steps: [
            { text: 'Identify one-time startup costs (₹15,000 + ₹5,000 + ₹2,000 = ₹22,000) and note they are not included in monthly profit.' },
            { text: 'Calculate daily revenue: 4 repairs/day × ₹150/repair = ₹600/day.' },
            { text: 'Calculate monthly revenue: ₹600/day × 30 days = ₹18,000.' },
            { text: 'Identify monthly expenses: ₹3,000 (given).' },
            { text: 'Calculate monthly profit: Monthly revenue – Monthly expenses = ₹18,000 – ₹3,000 = ₹15,000.', faded: true, blankAnswer: '₹15,000 profit per month.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_eco_ch3_4', title: 'Government Support: Startup India and Mudra',
          scaffold: { problem: 'A student wants to start a mobile repair shop needing ₹75,000 for tools and spare parts. They apply for a Mudra loan.',
            steps: [
            { text: 'Identify loan amount ₹75,000 falls between ₹50,000–5 lakh → Kishore category.' },
            { text: 'Recall Mudra Kishore loans are collateral-free per scheme guidelines.' },
            { text: 'Convert time: 18 months = 18/12 = 1.5 years.' },
            { text: 'Apply SI formula: SI = (P × R × T) / 100 = (75,000 × 11 × 1.5) / 100.' },
            { text: 'Calculate: 75,000 × 11 = 8,25,000; ×1.5 = 12,37,500; /100 = ₹12,375 interest.' },
            { text: 'Interpret: Total repayment = ₹75,000 + ₹12,375 = ₹87,375 after 1.5 years.', faded: true, blankAnswer: 'Kishore category, ₹12,375 interest, no collateral required.' }
            ] } },
        { type: 'case', nodeId: 'c9_eco_ch3_5', title: 'Innovation, Risk and Failure',
          caseStudy: { intro: 'Start with a relatable scenario: a student in Jaipur wants to create a low-cost water filter using clay and sawdust for rural communities.',
            decisions: [{ prompt: 'What is the term for the uncertainty of outcomes when pursuing a new idea or innovation?', options: [
                { text: 'Risk', outcome: 'Risk. A wrong answer like "failure" shows the student confuses the potential negative outcome with.' },
                { text: 'failure', outcome: 'Not quite — Students often believe that if an innovation fails, it means the idea was bad or the entrepreneur.', reveals: 'if-an-innovation-fails' }
            ] }] } },
        { type: 'case', nodeId: 'c9_eco_ch3_5', title: 'You made it',
          caseStudy: { intro: 'You finished From Ideas to Startups — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_eco_ch3_1', difficulty: 'standard',
          question: 'Entrepreneurship is the process of identifying a problem or unmet need in the.',
          hint: 'If stuck, revisit how supply and demand determine whether a product will.',
          misconception: 'Students often believe that entrepreneurship is primarily about inventing something completely new or technologically.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Entrepreneurship is the process of identifying a problem or unmet need in the market,',
                  options: ['Entrepreneurship is the process of identifying a problem or unmet need in the market,', 'A startup is a newly established business venture founded by entrepreneurs to develop an', 'Business planning is the process of creating a detailed written document that outlines a', 'Startup India is a government initiative launched in 2016 to foster entrepreneurship by'],
                  hint: 'If stuck, revisit how supply and demand determine whether a product will sell—specifically, that.',
                  misconception: 'Students often believe that entrepreneurship is primarily about inventing something completely new or technologically advanced, such as.' }
          ],
            remediations: { 'entrepreneurship-is-primarily-about-inventing': { steps: ['To fix this, use a real school example: Show a survey where 80% of students say they’d pay ₹10 for a clean, working.', 'Have students compare: Which solves a real pain point?', 'Guide them to see that the simple solution addresses frustration (broken tools), while the fancy one adds no extra.', 'Emphasize: Opportunity = Problem × Willingness to Pay—not just “cool idea.”'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_eco_ch3_2', difficulty: 'standard',
          question: 'A startup is a newly established business venture founded by entrepreneurs.',
          hint: 'If stuck, revisit c9_eco_ch3_1 (Entrepreneurship: From Idea to Opportunity) to review how.',
          misconception: 'Students often believe that any new business started by young people is automatically a startup, confusing the age.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A startup is a newly established business venture founded by entrepreneurs to develop an',
                  options: ['A startup is a newly established business venture founded by entrepreneurs to develop an', 'Entrepreneurship is the process of identifying a problem or unmet need in the market,', 'Business planning is the process of creating a detailed written document that outlines a', 'Startup India is a government initiative launched in 2016 to foster entrepreneurship by'],
                  hint: 'If stuck, revisit c9_eco_ch3_1 (Entrepreneurship: From Idea to Opportunity) to review how ideas are.',
                  misconception: 'Students often believe that any new business started by young people is automatically a startup, confusing the age of founders with the.' }
          ],
            remediations: { 'any-new-business-started-by': { steps: ['To address this, use a comparison chart: - Traditional business (e.g., photocopy shop): offers existing service, serves.', '- Startup (e.g., app for instant photocopy ordering & delivery): uses technology to improve access, aims to expand.', 'Show real data: a typical photocopy shop might serve 50 students/day with ₹200 daily profit; a scalable app could.', 'This highlights how startups differ in growth ambition and innovation, not just age or newness.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_eco_ch3_3', difficulty: 'standard',
          question: 'Business planning is the process of creating a detailed written document that.',
          hint: 'If stuck, review the concept of stock vs. flow variables from Class 8 economics.',
          misconception: 'Students often believe that startup costs (like buying equipment or paying a deposit) should be subtracted from monthly.',
          parts: [
                { id: 'a', prompt: 'Explain why conducting market analysis is a critical step in business planning, even if the entrepreneur already has a strong belief in their idea.', answer: 'Market analysis is critical',
                  options: ['Market analysis is critical', 'it\'s just needed to impress investors'],
                  hint: 'If stuck, review the concept of stock vs. flow variables from Class 8 economics (c8_eco_ch1_5.',
                  misconception: 'Students often believe that startup costs (like buying equipment or paying a deposit) should be subtracted from monthly revenue when.' }
          ],
            remediations: { 'startup-costs-like-buying-equipment': { steps: ['To fix this, use a clear analogy: buying a bicycle is like a startup cost—you pay once and use it for months or years.', 'Monthly costs like repairing punctures or buying oil are like rent or ingredients—you pay them again and again.', 'Give students a table: List Item | One-time or Monthly?', 'Include: Sewing machine (₹12,000, one-time), Thread (₹800/month, monthly), Rent (₹5,000/month, monthly).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_eco_ch3_3', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that startup costs (like buying equipment or paying a deposit) should be subtracted from monthly.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "A detailed business plan guarantees a startup will succeed." Provide one reason why this statement is false and one way a business.', answer: 'The statement is false',
                  options: ['The statement is false', 'it\'s true because planning prevents all problems'],
                  hint: 'If stuck, review the concept of stock vs. flow variables from Class 8 economics (c8_eco_ch1_5.',
                  misconception: 'Students often believe that startup costs (like buying equipment or paying a deposit) should be subtracted from monthly revenue when.' }
          ],
            remediations: { 'startup-costs-like-buying-equipment': { steps: ['To fix this, use a clear analogy: buying a bicycle is like a startup cost—you pay once and use it for months or years.', 'Monthly costs like repairing punctures or buying oil are like rent or ingredients—you pay them again and again.', 'Give students a table: List Item | One-time or Monthly?', 'Include: Sewing machine (₹12,000, one-time), Thread (₹800/month, monthly), Rent (₹5,000/month, monthly).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_eco_ch3_4', difficulty: 'standard',
          question: 'Startup India is a government initiative launched in 2016 to foster.',
          hint: 'Review the concept of collateral and risk assessment in banking from.',
          misconception: 'Students often think Startup India and Mudra Yojana provide direct subsidies or grants that don\'t require repayment.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Startup India is a government initiative launched in 2016 to foster entrepreneurship by',
                  options: ['Startup India is a government initiative launched in 2016 to foster entrepreneurship by', 'Entrepreneurship is the process of identifying a problem or unmet need in the market,', 'A startup is a newly established business venture founded by entrepreneurs to develop an', 'Business planning is the process of creating a detailed written document that outlines a'],
                  hint: 'Review the concept of collateral and risk assessment in banking from c6_economics_ch08_005 (Types.',
                  misconception: 'Students often think Startup India and Mudra Yojana provide direct subsidies or grants that don\'t require repayment, believing the.' }
          ],
            remediations: { 'startup-india-and-mudra-yojana': { steps: ['Use real data: Show a Mudra Kishore loan of ₹3 lakh at 10% interest.', 'Calculate yearly interest: (3,00,000 × 10 × 1)/100 = ₹30,000.', 'Explain this must be paid from business profits, not government funds.', 'Contrast with a false grant idea: If ₹3 lakh were free, no repayment needed—but since interest accrues, the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_eco_ch3_5', difficulty: 'standard',
          question: 'Innovation is the process of creating new or improved products, services,.',
          hint: 'If stuck, revisit c9_eco_ch3_1 to review how ideas are evaluated as opportunities based.',
          misconception: 'Students often believe that if an innovation fails, it means the idea was bad or the entrepreneur lacked skill, failing.',
          parts: [
                { id: 'a', prompt: 'What is the term for the uncertainty of outcomes when pursuing a new idea or innovation?', answer: 'Risk',
                  options: ['Risk', 'failure'],
                  hint: 'If stuck, revisit c9_eco_ch3_1 to review how ideas are evaluated as opportunities based on customer.',
                  misconception: 'Students often believe that if an innovation fails, it means the idea was bad or the entrepreneur lacked skill, failing to recognize that.' }
          ],
            remediations: { 'if-an-innovation-fails': { steps: ['To correct this, use the example of Ola Cabs: when it first launched, it struggled to gain users because people were.', 'Instead of quitting, the founders observed that lack of trust and smartphone familiarity were barriers.', 'They responded by introducing call-based booking and cash payments, gradually shifting to app-only as user comfort grew.', 'This shows that failure to gain traction was due to context, not a bad idea—and adaptation based on real-world feedback.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
