import type { SimDef } from '../../engine/types';

/** v3 generated — c12_cs_ch13_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_cs_ch13_p2: SimDef = {
    id: 'v3_c12_cs_ch13_p2',
    title: 'Societal Impacts of Technology · Part 2/2',
    subtitle: 'The app that connects your family also carries the rumour',
    classLevel: 12, subject: 'computer_science', topic: 'Societal Impacts of Technology · Part 2/2',
    chapters: ['c12_cs_ch13'],
    nodeIds: ['c12_cs_cbse_13_007', 'c12_cs_cbse_13_008', 'c12_cs_cbse_13_009', 'c12_cs_cbse_13_010', 'c12_cs_cbse_13_011', 'c12_cs_cbse_13_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Technology researcher', intro: 'A smartphone in 2010 and one today run the same physics — the society around them changed. Study that change like a scientist.', goal: 'Analyse technology\'s dual societal impact and structure a project-based investigation of a real-world case.' },
    discovery: {
        question: 'A classmate argues WhatsApp has \'only positive impact — it connects families free.\' During a health crisis the same app spreads fake cures faster than any clinic. What\'s the analytical flaw?',
        options: ['Monovalent reasoning — technology\'s impact is dual: the same features that connect families also carry misinformation and surveillance metadata', 'None — free connection is pure benefit', 'The app is bad, so the net impact is negative', 'Impact can\'t be measured, so any claim works'],
        answer: 'Monovalent reasoning — technology\'s impact is dual: the same features that connect families also carry misinformation and surveillance metadata',
        hook: 'Technology is never neutral — impact comes from the collision of technical features and human choices. Even \'the best coder does all the work\' fails teamwork: speed isn\'t collaboration. This chapter trains you to hold both edges of the sword at once.',
    },
    teaching: [
        { title: 'Social Media: Impact on Communication and Relationships', text: 'Social media refers to interactive digital platforms that enable users to create, share, and exchange information, ideas, and content in virtual communities; its impact on communication and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_cs_cbse_13_007', title: 'Your mission',
          mission: { widget: 'supply', validate: 'supply:demand=80',
            instruction: 'On the lab: push demand to 80 — where does the price settle?.',
        context: 'Run a real impact study: investigate how UPI changed a street vendor\'s day using a structured project — problem, roles, timeline, data — then plot effects on an intended/unintended × individual/systemic matrix.',
            observePrompt: 'What did the supply interactive show you?' } },
        { type: 'case', nodeId: 'c12_cs_cbse_13_007', title: 'Social Media: Impact on Communication and Relationships',
          caseStudy: { intro: 'Think about the last time you had a misunderstanding with a friend over a text message or saw a classmate\'s Instagram story that made you feel left out.',
            decisions: [{ prompt: 'Define "context collapse" in the context of social media communication and give one example of how it affects a student\'s relationship with.', options: [
                { text: 'Context collapse occurs when multiple distinct social audiences (e.g., friends, family,', outcome: 'Context collapse occurs when multiple distinct social audiences (e.g., friends, family, teachers).' },
                { text: 'context collapse means losing your phone', outcome: 'Not quite — Students equate "social media impact" solely with *screen time quantity* (e.g., "3 hours is bad, 30.', reveals: 'students-equate-social-media-impact' },
                { text: 'it\'s when an app crashes', outcome: 'Not quite — Students equate "social media impact" solely with *screen time quantity* (e.g., "3 hours is bad, 30.', reveals: 'students-equate-social-media-impact' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_13_008', title: 'Online Shopping and E-Commerce Impact',
          caseStudy: { intro: 'Imagine you want to buy a smartphone during a festive sale. You compare prices on Amazon, Flipkart, and the brand\'s official website, read reviews, apply.',
            decisions: [{ prompt: 'Define e-commerce and list two ways it differs from traditional brick-and-mortar retail.', options: [
                { text: 'E-commerce is the buying and selling of goods/services over the internet', outcome: 'E-commerce is the buying and selling of goods/services over the internet.' },
                { text: 'e-commerce is just online shopping', outcome: 'Not quite — Students often equate "e-commerce impact" solely with "convenience for consumers" or "profit for.', reveals: 'students-often-equate-e-commerce' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_13_009', title: 'Technology in Education: E-Learning and MOOCs',
          caseStudy: { intro: 'Imagine a student in a remote village in Rajasthan who wants to learn advanced Python programming but has no qualified teacher nearby.',
            decisions: [{ prompt: 'What is the primary distinguishing feature of a MOOC compared to a traditional online university course?', options: [
                { text: 'A MOOC is "Massive" (unlimited enrollment), "Open" (no formal admission prerequisites),', outcome: 'A MOOC is "Massive" (unlimited enrollment), "Open" (no formal admission prerequisites), and.' },
                { text: 'MOOCs are only free', outcome: 'Not quite — Students often believe "E-learning is just watching videos online" and "MOOCs are easy because they.', reveals: 'e-learning-is-just-watching' },
                { text: 'MOOCs are always self-paced', outcome: 'Not quite — Students often believe "E-learning is just watching videos online" and "MOOCs are easy because they.', reveals: 'e-learning-is-just-watching' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_13_010', title: 'Gender Issues and Technology Access',
          caseStudy: { intro: 'Begin by asking: "In a typical Indian household with one smartphone, who decides when and how it is used — and who gets left out when homework, job.',
            decisions: [{ prompt: 'Define the "gender digital divide" in your own words, distinguishing it from the general digital divide.', options: [
                { text: 'The gender digital divide is the measurable gap between men/women (and gender minorities)', outcome: 'The gender digital divide is the measurable gap between men/women (and gender minorities) in access.' },
                { text: 'India has 50% internet users', outcome: 'Not quite — **"Technology is gender-neutral; if women don\'t use it, it\'s their choice or lack of interest."**.', reveals: 'technology-is-gender-neutral' },
                { text: 'cites only overall internet penetration (e', outcome: 'Not quite — **"Technology is gender-neutral; if women don\'t use it, it\'s their choice or lack of interest."**.', reveals: 'technology-is-gender-neutral' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_13_012', title: 'Sustainable Technology and Green Computing',
          caseStudy: { intro: 'Start by asking: "Have you ever wondered what happens to your old smartphone or laptop after you discard it, and how much energy data centers consume to keep.',
            decisions: [{ prompt: 'What is the primary goal of Green Computing?', options: [
                { text: 'The primary goal of Green Computing is to reduce the environmental impact of computing', outcome: 'The primary goal of Green Computing is to reduce the environmental impact of computing resources.' },
                { text: 'making computers faster', outcome: 'Not quite — Students often think green computing is only about turning off monitors or buying energy-efficient.', reveals: 'green-computing-is-only-about' },
                { text: 'reducing cost only', outcome: 'Not quite — Students often think green computing is only about turning off monitors or buying energy-efficient.', reveals: 'green-computing-is-only-about' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_13_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A student writes a project report: \'UPI is purely good for street vendors — free, instant payments.\' A vendor mentions his phone dying mid-day means lost sales, and that a fake UPI callback nearly emptied his account.',
            decisions: [{ prompt: 'How should the report frame UPI\'s impact?', options: [
                { text: 'As dual-impact: intended gains (faster payment, lower cash risk) alongside unintended effects at individual level (dead battery = lost sales) and systemic level (phishing targeting vendors) — impact comes from how tech meets human conditions.', outcome: 'Separating intended/unintended and individual/systemic exposes effects a \'it\'s just convenient\' story hides — and each cell needs a different remedy.' },
                { text: 'Keep it positive — listing benefits IS an impact analysis.', outcome: 'Feature-listing isn\'t impact analysis: the question is how the capability changed behaviour and what harm followed, not what the app offers.', reveals: 'impact-equals-feature-list' },
                { text: 'Flip to \'purely negative\' — the vendor\'s losses outweigh the convenience.', outcome: 'Swapping one monovalent verdict for another isn\'t analysis; the point is holding both effects in view at once.', reveals: 'single-sided-impact' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_13_012', title: 'You made it',
          caseStudy: { intro: 'You can now evaluate technology like a policy thinker — evidence in hand, both costs and benefits in view. That\'s the analytical voice boards and colleges both reward.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'supply', prompt: 'Explore the supply interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'supply', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_cs_cbse_13_007', difficulty: 'standard',
          question: 'Social media refers to interactive digital platforms that enable users.',
          hint: 'Revisit c12_cs_cbse_13_001\'s "intended vs unintended consequences" framework and apply.',
          misconception: 'Students equate "social media impact" solely with *screen time quantity* (e.g., "3 hours is bad, 30 minutes is good").',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Social media refers to interactive digital platforms that enable users to create, share,',
                  options: ['Social media refers to interactive digital platforms that enable users to create, share,', 'Technology refers to the application of scientific knowledge for practical purposes,', 'Digital Divide refers to the gap between individuals, households, businesses, and', 'E-Waste (Electronic Waste) refers to discarded electrical or electronic devices such as'],
                  hint: 'Revisit c12_cs_cbse_13_001\'s "intended vs unintended consequences" framework and apply it to.',
                  misconception: 'Students equate "social media impact" solely with *screen time quantity* (e.g., "3 hours is bad, 30 minutes is good") and ignore *usage.' }
          ],
            remediations: { 'students-equate-social-media-impact': { steps: ['If a student reduces impact to "screen time" or "addiction", do: (1) Show the "Active vs.', 'Passive Use" 2x2 matrix: Active-Relational (video call with grandma), Active-Performative (posting for likes).', '(2) Ask them to log their own use for 24 hours categorising each session — they\'ll see the same app serves different.', '(3) Assign the Valkenburg & Peter (2007) "stimulation vs displacement" one-pager summary.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_13_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate "social media impact" solely with *screen time quantity* (e.g., "3 hours is bad, 30 minutes is good").',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Social media destroys authentic relationships because it replaces deep conversation with shallow likes and comments." Defend or refute.', answer: 'The claim is an oversimplification',
                  options: ['The claim is an oversimplification', 'Instagram causes depression', 'simply agrees or disagrees without theoretical grounding shows binary thinking'],
                  hint: 'Revisit c12_cs_cbse_13_001\'s "intended vs unintended consequences" framework and apply it to.',
                  misconception: 'Students equate "social media impact" solely with *screen time quantity* (e.g., "3 hours is bad, 30 minutes is good") and ignore *usage.' },
                { id: 'b', prompt: 'Design a 3-minute classroom activity for Class 10 students that makes the concept of "digital footprint persistence" tangible without using fear-based.', answer: 'Activity: "The Unerasable Whiteboard"',
                  options: ['Activity: "The Unerasable Whiteboard"', 'Instagram causes depression'],
                  hint: 'Revisit c12_cs_cbse_13_001\'s "intended vs unintended consequences" framework and apply it to.',
                  misconception: 'Students equate "social media impact" solely with *screen time quantity* (e.g., "3 hours is bad, 30 minutes is good") and ignore *usage.' }
          ],
            remediations: { 'students-equate-social-media-impact': { steps: ['If a student reduces impact to "screen time" or "addiction", do: (1) Show the "Active vs.', 'Passive Use" 2x2 matrix: Active-Relational (video call with grandma), Active-Performative (posting for likes).', '(2) Ask them to log their own use for 24 hours categorising each session — they\'ll see the same app serves different.', '(3) Assign the Valkenburg & Peter (2007) "stimulation vs displacement" one-pager summary.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_13_008', difficulty: 'standard',
          question: 'Online shopping and e-commerce refer to the buying and selling of goods and.',
          hint: 'Revisit the stakeholder mapping exercise in c12_cs_cbse_13_001 (Introduction.',
          misconception: 'Students often equate "e-commerce impact" solely with "convenience for consumers" or "profit for companies".',
          parts: [
                { id: 'a', prompt: 'Define e-commerce and list two ways it differs from traditional brick-and-mortar retail.', answer: 'E-commerce is the buying and selling of goods/services over the internet',
                  options: ['E-commerce is the buying and selling of goods/services over the internet', 'e-commerce is just online shopping'],
                  hint: 'Revisit the stakeholder mapping exercise in c12_cs_cbse_13_001 (Introduction to Technology and its.',
                  misconception: 'Students often equate "e-commerce impact" solely with "convenience for consumers" or "profit for companies".' },
                { id: 'b', prompt: 'A small kirana store owner in Jaipur loses 30% of his monthly revenue after a quick-commerce app (10-minute delivery) starts operating in his area.', answer: 'Economic: Loss of livelihood for the kirana owner and his employees',
                  options: ['Economic: Loss of livelihood for the kirana owner and his employees', 'loss of business'],
                  hint: 'Revisit the stakeholder mapping exercise in c12_cs_cbse_13_001 (Introduction to Technology and its.',
                  misconception: 'Students often equate "e-commerce impact" solely with "convenience for consumers" or "profit for companies".' }
          ],
            remediations: { 'students-often-equate-e-commerce': { steps: ['If a student reduces e-commerce impact to a pros/cons list, guide them through a stakeholder mapping exercise: draw.', 'For a single feature (e.g., free returns), fill each cell with *specific* impact.', 'Then ask: "Who bears the cost of this convenience?" This forces systems thinking.', 'Revisit node c12_cs_cbse_13_002 (Digital Divide) to see how access gaps amplify inequality, and c12_cs_cbse_13_003.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_13_009', difficulty: 'standard',
          question: 'E-Learning refers to the use of electronic technologies, primarily the.',
          hint: 'Revisit the three levels of digital divide (access, usage, outcome) from.',
          misconception: 'Students often believe "E-learning is just watching videos online" and "MOOCs are easy because they are self-paced.".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'E-Learning refers to the use of electronic technologies, primarily the internet, to',
                  options: ['E-Learning refers to the use of electronic technologies, primarily the internet, to', 'Technology refers to the application of scientific knowledge for practical purposes,', 'Digital Divide refers to the gap between individuals, households, businesses, and', 'E-Waste (Electronic Waste) refers to discarded electrical or electronic devices such as'],
                  hint: 'Revisit the three levels of digital divide (access, usage, outcome) from c12_cs_cbse_13_002 and map.',
                  misconception: 'Students often believe "E-learning is just watching videos online" and "MOOCs are easy because they are self-paced." This leads to two.' }
          ],
            remediations: { 'e-learning-is-just-watching': { steps: ['If a student cannot distinguish between content repositories (NPTEL, YouTube) and MOOC platforms (SWAYAM, Coursera).', '(2) Explore **SWAYAM.gov.in** and **NPTEL.ac.in** side-by-side for 20 minutes — note differences in enrollment.', '(3) Write a 150-word comparison: "Why a student in a village with 2G internet and a shared smartphone cannot.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_13_010', difficulty: 'standard',
          question: 'Gender issues in technology access refer to the systemic disparities.',
          hint: 'If stuck, revisit c12_cs_cbse_13_002\'s "Dimensions of Digital Divide" section and redo.',
          misconception: '**"Technology is gender-neutral; if women don\'t use it, it\'s their choice or lack of interest."** Students often write.',
          parts: [
                { id: 'a', prompt: 'Compare how algorithmic bias in hiring platforms and gendered design in mobile money apps each reinforce technology access gaps for women.', answer: '**Hiring platforms**: Training data reflects historical male-dominated hiring →',
                  options: ['**Hiring platforms**: Training data reflects historical male-dominated hiring →', 'technical bugs'],
                  hint: 'If stuck, revisit c12_cs_cbse_13_002\'s "Dimensions of Digital Divide" section and redo its.',
                  misconception: '**"Technology is gender-neutral; if women don\'t use it, it\'s their choice or lack of interest."** Students often write: "Women in rural.' }
          ],
            remediations: { 'technology-is-gender-neutral': { steps: ['If a student exhibits this misconception: 1.', '**Show, don\'t tell**: Give them NFHS-5 state-wise tables — ask them to find states where women\'s phone ownership >80%.', 'Let them discover the gap.', '**Role-play**: "You are a 16-year-old girl in Bihar.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_13_011', difficulty: 'standard',
          question: 'Digital literacy is the ability to access, evaluate, create, and communicate.',
          hint: 'If stuck, revisit the "Literacy Layer Audit" exercise in ON_FAILURE: pick a daily digital.',
          misconception: 'Students conflate **digital access** (owning a device/connection) with **digital literacy** (critical, creative, safe.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Digital literacy is the ability to access, evaluate, create, and communicate information',
                  options: ['Digital literacy is the ability to access, evaluate, create, and communicate information', 'Technology refers to the application of scientific knowledge for practical purposes,', 'Digital Divide refers to the gap between individuals, households, businesses, and', 'E-Waste (Electronic Waste) refers to discarded electrical or electronic devices such as'],
                  hint: 'If stuck, revisit the "Literacy Layer Audit" exercise in ON_FAILURE: pick a daily digital task and.',
                  misconception: 'Students conflate **digital access** (owning a device/connection) with **digital literacy** (critical, creative, safe use) and both with.' }
          ],
            remediations: { 'students-conflate-digital-access-owning': { steps: ['If a student equates access with literacy or literacy with empowerment: 1.', '**Revisit node c12_cs_cbse_13_002 (Digital Divide)** — map the three-level divide (access, literacy, empowerment) onto.', '**Revisit node c12_cs_cbse_13_010 (Gender Issues)** — analyze how the same device yields different empowerment for men.', 'women due to socio-cultural conversion factors.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_13_012', difficulty: 'standard',
          question: 'Sustainable Technology and Green Computing refers to the practice of designing.',
          hint: 'Review the basic computer architecture node (if available) or recall Class 11 computer.',
          misconception: 'Students often think green computing is only about turning off monitors or buying energy-efficient hardware.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Sustainable Technology and Green Computing refers to the practice of designing,',
                  options: ['Sustainable Technology and Green Computing refers to the practice of designing,', 'Technology refers to the application of scientific knowledge for practical purposes,', 'Digital Divide refers to the gap between individuals, households, businesses, and', 'E-Waste (Electronic Waste) refers to discarded electrical or electronic devices such as'],
                  hint: 'Review the basic computer architecture node (if available) or recall Class 11 computer system.',
                  misconception: 'Students often think green computing is only about turning off monitors or buying energy-efficient hardware.' }
          ],
            remediations: { 'green-computing-is-only-about': { steps: ['If the student holds this misconception, guide them through a lifecycle analysis of a smartphone: mining →.', 'Ask them to estimate which phase consumes the most energy (manufacturing often exceeds usage).', 'Then show how software optimization (e.g., efficient code reducing CPU cycles) extends battery life and reduces.', 'Assign a mini-project: compare two code snippets (one with nested loops, one optimized) and measure CPU usage via task.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
