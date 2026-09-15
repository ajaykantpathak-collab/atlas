import type { SimDef } from '../../engine/types';

/** v3 generated — c12_cs_ch13_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_cs_ch13_p1: SimDef = {
    id: 'v3_c12_cs_ch13_p1',
    title: 'Societal Impacts of Technology · Part 1/2',
    subtitle: 'The app that connects your family also carries the rumour',
    classLevel: 12, subject: 'computer_science', topic: 'Societal Impacts of Technology · Part 1/2',
    chapters: ['c12_cs_ch13'],
    nodeIds: ['c12_cs_cbse_13_001', 'c12_cs_cbse_13_002', 'c12_cs_cbse_13_003', 'c12_cs_cbse_13_004', 'c12_cs_cbse_13_005', 'c12_cs_cbse_13_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Technology researcher', intro: 'A smartphone in 2010 and one today run the same physics — the society around them changed. Study that change like a scientist.', goal: 'Analyse technology\'s dual societal impact and structure a project-based investigation of a real-world case.' },
    discovery: {
        question: 'A classmate argues WhatsApp has \'only positive impact — it connects families free.\' During a health crisis the same app spreads fake cures faster than any clinic. What\'s the analytical flaw?',
        options: ['Monovalent reasoning — technology\'s impact is dual: the same features that connect families also carry misinformation and surveillance metadata', 'None — free connection is pure benefit', 'The app is bad, so the net impact is negative', 'Impact can\'t be measured, so any claim works'],
        answer: 'Monovalent reasoning — technology\'s impact is dual: the same features that connect families also carry misinformation and surveillance metadata',
        hook: 'Technology is never neutral — impact comes from the collision of technical features and human choices. Even \'the best coder does all the work\' fails teamwork: speed isn\'t collaboration. This chapter trains you to hold both edges of the sword at once.',
    },
    teaching: [
        { title: 'Introduction to Technology and its Impact on Society', text: 'Technology refers to the application of scientific knowledge for practical purposes, especially in industry and daily life, encompassing tools, systems, and methods that solve problems or extend.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_cs_cbse_13_001', title: 'Your mission',
          mission: { widget: 'supply', validate: 'supply:demand=80',
            instruction: 'On the lab: push demand to 80 — where does the price settle?.',
        context: 'Run a real impact study: investigate how UPI changed a street vendor\'s day using a structured project — problem, roles, timeline, data — then plot effects on an intended/unintended × individual/systemic matrix.',
            observePrompt: 'What did the supply interactive show you?' } },
        { type: 'case', nodeId: 'c12_cs_cbse_13_001', title: 'Introduction to Technology and its Impact on Society',
          caseStudy: { intro: 'Imagine you are handed a smartphone in 2010 and another in 2024 — both are "technology", yet the 2024 device has reshaped how a farmer in Maharashtra checks.',
            decisions: [{ prompt: 'Define "technology" in the context of societal impact analysis.', options: [
                { text: 'Correct answer: Technology is the *application* of scientific knowledge through', outcome: 'Correct answer: Technology is the *application* of scientific knowledge through engineered.' },
                { text: 'gadgets', outcome: 'Not quite — Students conflate "technology impact" with "listing features of a gadget".', reveals: 'students-conflate-technology-impact-with' },
                { text: 'computers', outcome: 'Not quite — Students conflate "technology impact" with "listing features of a gadget".', reveals: 'students-conflate-technology-impact-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_13_003', title: 'E-Waste Management and Disposal',
          caseStudy: { intro: 'Imagine your family just upgraded from a 5-year-old CRT television to a new smart TV.',
            decisions: [{ prompt: 'A student writes: "E-waste is any broken electronic device." Is this definition complete?', options: [
                { text: 'No, the definition is incomplete', outcome: 'No, the definition is incomplete. The missing critical element is **"end of life" / "discarded.' },
                { text: 'broken', outcome: 'Not quite — **Misconception:** "Recycling e-waste is always environmentally friendly — the more we recycle, the.', reveals: 'misconception-recycling-e-waste-is' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_13_004', title: 'Technology and Health: Ergonomics and Posture',
          caseStudy: { intro: 'Imagine a Class 12 student, Arjun, who spends 6 hours daily coding for his board project and then 2 hours gaming.',
            decisions: [{ prompt: 'Define "neutral wrist position" in the context of keyboard use and state the approximate angle (in degrees) between the forearm and the.', options: [
                { text: 'Neutral wrist position means the wrist is straight, not bent up (extension), down', outcome: 'Neutral wrist position means the wrist is straight, not bent up (extension), down (flexion),.' },
                { text: 'wrists should rest on the wrist rest while typing', outcome: 'Not quite — Students believe that "ergonomic equipment" (expensive chair, vertical mouse, standing desk) alone.', reveals: 'ergonomic-equipment-expensive-chair' },
                { text: 'a slight upward bend is fine', outcome: 'Not quite — Students believe that "ergonomic equipment" (expensive chair, vertical mouse, standing desk) alone.', reveals: 'ergonomic-equipment-expensive-chair' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_13_005', title: 'Impact of Technology on Employment',
          caseStudy: { intro: 'Imagine a popular food‑delivery app introduces AI‑based route optimization and automated chatbots for customer support.',
            decisions: [{ prompt: 'State the three primary channels through which technology affects employment, as per the standard economic framework (e.g., Autor, Levy.', options: [
                { text: 'The three primary channels are: (1) **Substitution/Displacement**', outcome: 'The three primary channels are: (1) **Substitution/Displacement** — technology replaces human labor.' },
                { text: 'job loss', outcome: 'Not quite — **"Technology destroys jobs on a net basis — every robot/AI system replaces X workers.', reveals: 'technology-destroys-jobs-on-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_13_006', title: 'Artificial Intelligence and its Societal Implications',
          caseStudy: { intro: 'Imagine you apply for an education loan through a bank\'s new "instant approval" app.',
            decisions: [{ prompt: 'A student says: "AI is objective because it uses math and data, not human opinions.', options: [
                { text: '**Correct answer:** The statement confuses *mathematical computation* with *objectivity*', outcome: '**Correct answer:** The statement confuses *mathematical computation* with *objectivity*.' },
                { text: 'data = truth', outcome: 'Not quite — **Misconception:** "AI bias is a technical bug that better algorithms or more data will fix." **Why.', reveals: 'misconception-ai-bias-is-a' },
                { text: 'AI bias is a technical bug that better algorithms or more data will fix', outcome: 'Not quite — **Misconception:** "AI bias is a technical bug that better algorithms or more data will fix." **Why.', reveals: 'misconception-ai-bias-is-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_13_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A student writes a project report: \'UPI is purely good for street vendors — free, instant payments.\' A vendor mentions his phone dying mid-day means lost sales, and that a fake UPI callback nearly emptied his account.',
            decisions: [{ prompt: 'How should the report frame UPI\'s impact?', options: [
                { text: 'As dual-impact: intended gains (faster payment, lower cash risk) alongside unintended effects at individual level (dead battery = lost sales) and systemic level (phishing targeting vendors) — impact comes from how tech meets human conditions.', outcome: 'Separating intended/unintended and individual/systemic exposes effects a \'it\'s just convenient\' story hides — and each cell needs a different remedy.' },
                { text: 'Keep it positive — listing benefits IS an impact analysis.', outcome: 'Feature-listing isn\'t impact analysis: the question is how the capability changed behaviour and what harm followed, not what the app offers.', reveals: 'impact-equals-feature-list' },
                { text: 'Flip to \'purely negative\' — the vendor\'s losses outweigh the convenience.', outcome: 'Swapping one monovalent verdict for another isn\'t analysis; the point is holding both effects in view at once.', reveals: 'single-sided-impact' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_13_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now evaluate technology like a policy thinker — evidence in hand, both costs and benefits in view. That\'s the analytical voice boards and colleges both reward.',
            decisions: [{ prompt: 'What comes next? Societal Impacts of Technology · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Societal Impacts of Technology · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'supply', prompt: 'Explore the supply interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'supply', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_cs_cbse_13_001', difficulty: 'standard',
          question: 'Technology refers to the application of scientific knowledge for practical.',
          hint: 'Revisit `c11_stat_cbse_02_007` (sampling methods) and `c11_stat_cbse_07_010` (correlation.',
          misconception: 'Students conflate "technology impact" with "listing features of a gadget".',
          parts: [
                { id: 'a', prompt: 'Define "technology" in the context of societal impact analysis. Your definition must distinguish it from "science" and "engineering" in one sentence.', answer: 'Correct answer: Technology is the *application* of scientific knowledge through',
                  options: ['Correct answer: Technology is the *application* of scientific knowledge through', 'gadgets', 'computers'],
                  hint: 'Revisit `c11_stat_cbse_02_007` (sampling methods) and `c11_stat_cbse_07_010` (correlation.',
                  misconception: 'Students conflate "technology impact" with "listing features of a gadget".' },
                { id: 'b', prompt: 'Compare the *modular approach* and *top-down approach* for solving the UPI street-vendor project.', answer: 'Modular approach: breaks project into independent modules (survey, interview,',
                  options: ['Modular approach: breaks project into independent modules (survey, interview,', 'it sounds more organised'],
                  hint: 'Revisit `c11_stat_cbse_02_007` (sampling methods) and `c11_stat_cbse_07_010` (correlation.',
                  misconception: 'Students conflate "technology impact" with "listing features of a gadget".' }
          ],
            remediations: { 'students-conflate-technology-impact-with': { steps: ['Re-read NCERT §13.1–13.3 and explicitly map each PBL step to the UPI vendor project (Diagnostic Q3).', 'Watch the 12-minute NPTEL video "Technology Assessment Frameworks" (search "NPTEL technology society impact matrix").', 'Re-attempt Diagnostic Q6 with a different technology (e.g., Aadhaar, Aarogya Setu) until you can populate all four.', 'If stuck on dual-impact reasoning, revisit Class 11 Statistics node `c11_stat_cbse_07_010` (Distinction Between.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_13_002', difficulty: 'standard',
          question: 'Digital Divide refers to the gap between individuals, households, businesses.',
          hint: 'If stuck, revisit c12_cs_cbse_13_001 to refresh the framework of technology\'s societal.',
          misconception: 'Students often equate digital divide solely with \'not having a computer or internet connection\' (first-level divide).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Digital Divide refers to the gap between individuals, households, businesses, and',
                  options: ['Digital Divide refers to the gap between individuals, households, businesses, and', 'Technology refers to the application of scientific knowledge for practical purposes,', 'E-Waste (Electronic Waste) refers to discarded electrical or electronic devices such as', 'Ergonomics is the scientific discipline concerned with designing and arranging'],
                  hint: 'If stuck, revisit c12_cs_cbse_13_001 to refresh the framework of technology\'s societal impact, and.',
                  misconception: 'Students often equate digital divide solely with \'not having a computer or internet connection\' (first-level divide).' }
          ],
            remediations: { 'students-often-equate-digital-divide': { steps: ['Show two 1-min videos — one of a Delhi student attending a live JEE class on laptop + fiber, another of a rural student.', 'Ask: "Both have \'internet access\'. Why are their experiences different?"', 'Map their answers to the three-level framework on board.', 'Assign a mini-case: "Analyze why PM-WANI (public Wi-Fi) failed to uptake in a specific village — list barriers at each.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_13_003', difficulty: 'standard',
          question: 'E-Waste (Electronic Waste) refers to discarded electrical or electronic devices.',
          hint: 'If stuck, revisit the **"Schedule I"** list in the E-Waste (Management) Rules, 2016.',
          misconception: '**Misconception:** "Recycling e-waste is always environmentally friendly — the more we recycle, the better." **Why it\'s.',
          parts: [
                { id: 'a', prompt: 'A student writes: "E-waste is any broken electronic device." Is this definition complete?', answer: 'No, the definition is incomplete',
                  options: ['No, the definition is incomplete', 'broken'],
                  hint: 'If stuck, revisit the **"Schedule I"** list in the E-Waste (Management) Rules, 2016 (available.',
                  misconception: '**Misconception:** "Recycling e-waste is always environmentally friendly — the more we recycle, the better." **Why it\'s wrong:** *Informal*.' },
                { id: 'b', prompt: 'Compare the environmental impact of **landfilling** vs **incineration** for the plastic fraction of e-waste (ABS, HIPS, PC).', answer: '**Incineration is worse** under typical Indian conditions',
                  options: ['**Incineration is worse** under typical Indian conditions', 'landfilling is worse'],
                  hint: 'If stuck, revisit the **"Schedule I"** list in the E-Waste (Management) Rules, 2016 (available.',
                  misconception: '**Misconception:** "Recycling e-waste is always environmentally friendly — the more we recycle, the better." **Why it\'s wrong:** *Informal*.' }
          ],
            remediations: { 'misconception-recycling-e-waste-is': { steps: ['** Re-watch the 8-minute CPCB video "E-Waste Management in India" (search YouTube) — pause at each informal process.', '** Download **Form 1(a), Form 6, Form 7** from the CPCB website.', '** Take a **mock diagnostic**: "A bulk consumer generates 2 tonnes/year of ITEW1.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_13_004', difficulty: 'standard',
          question: 'Ergonomics is the scientific discipline concerned with designing and arranging.',
          hint: 'Revisit c11_math_cbse_10_006 (slope of a line) and c11_stat_cbse_05_001 (arithmetic mean).',
          misconception: 'Students believe that "ergonomic equipment" (expensive chair, vertical mouse, standing desk) alone guarantees health.',
          parts: [
                { id: 'a', prompt: 'A student sets the top of their monitor at eye level because they read "monitor at eye level" online. After two hours, they report neck stiffness.', answer: 'The natural resting gaze is slightly downward (about 15–20° below horizontal)',
                  options: ['The natural resting gaze is slightly downward (about 15–20° below horizontal)', 'eye level is correct', 'ergonomic equipment', 'good posture'],
                  hint: 'Revisit c11_math_cbse_10_006 (slope of a line) and c11_stat_cbse_05_001 (arithmetic mean) with.',
                  misconception: 'Students believe that "ergonomic equipment" (expensive chair, vertical mouse, standing desk) alone guarantees health, and that "good.' },
                { id: 'b', prompt: 'Compare the long-term spinal load implications of two sitting postures for a 5-hour coding session: (A) Sitting upright with a 90° hip angle, no backrest.', answer: 'Research (Nachemson, 1981) shows IDP percentages: standing = 100%',
                  options: ['Research (Nachemson, 1981) shows IDP percentages: standing = 100%', '90° upright is ideal', 'sit up straight', 'ergonomic equipment'],
                  hint: 'Revisit c11_math_cbse_10_006 (slope of a line) and c11_stat_cbse_05_001 (arithmetic mean) with.',
                  misconception: 'Students believe that "ergonomic equipment" (expensive chair, vertical mouse, standing desk) alone guarantees health, and that "good.' }
          ],
            remediations: { 'ergonomic-equipment-expensive-chair': { steps: ['If the student exhibits the above misconception, do NOT simply re-read the definition.', 'Instead: (1) Have them perform the "wrist rest pressure test": type 30 seconds with wrists planted on a pad, then 30.', '(2) Show a 1-minute time-lapse video of office workers (or record themselves) to visualize how no one holds one posture.', '(3) Assign a 2-day log: every 30 min, note posture (sit/stand/recline) and discomfort (0–10).'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_13_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "ergonomic equipment" (expensive chair, vertical mouse, standing desk) alone guarantees health.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Using a vertical mouse eliminates the risk of carpal tunnel syndrome (CTS) for programmers." State whether the claim is true, false,.', answer: 'Partially true',
                  options: ['Partially true', 'True — it\'s ergonomic so it prevents CTS', 'False — mice don\'t cause CTS', 'ergonomic equipment'],
                  hint: 'Revisit c11_math_cbse_10_006 (slope of a line) and c11_stat_cbse_05_001 (arithmetic mean) with.',
                  misconception: 'Students believe that "ergonomic equipment" (expensive chair, vertical mouse, standing desk) alone guarantees health, and that "good.' },
                { id: 'b', prompt: 'Design a 5-minute "micro-break" routine for a student who has been typing continuously for 90 minutes.', answer: 'Example routine (total 5 min): 1',
                  options: ['Example routine (total 5 min): 1', 'ergonomic equipment', 'good posture'],
                  hint: 'Revisit c11_math_cbse_10_006 (slope of a line) and c11_stat_cbse_05_001 (arithmetic mean) with.',
                  misconception: 'Students believe that "ergonomic equipment" (expensive chair, vertical mouse, standing desk) alone guarantees health, and that "good.' }
          ],
            remediations: { 'ergonomic-equipment-expensive-chair': { steps: ['If the student exhibits the above misconception, do NOT simply re-read the definition.', 'Instead: (1) Have them perform the "wrist rest pressure test": type 30 seconds with wrists planted on a pad, then 30.', '(2) Show a 1-minute time-lapse video of office workers (or record themselves) to visualize how no one holds one posture.', '(3) Assign a 2-day log: every 30 min, note posture (sit/stand/recline) and discomfort (0–10).'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_13_005', difficulty: 'standard',
          question: 'Impact of Technology on Employment refers to the multifaceted effects that.',
          hint: 'If unable to classify tasks, revisit the **O*NET task taxonomy** (simplified version.',
          misconception: '**"Technology destroys jobs on a net basis — every robot/AI system replaces X workers permanently."** Students often.',
          parts: [
                { id: 'a', prompt: 'State the three primary channels through which technology affects employment, as per the standard economic framework (e.g., Autor, Levy, Murnane 2003).', answer: 'The three primary channels are: (1) **Substitution/Displacement**',
                  options: ['The three primary channels are: (1) **Substitution/Displacement**', 'job loss'],
                  hint: 'If unable to classify tasks, revisit the **O*NET task taxonomy** (simplified version in Class 12.',
                  misconception: '**"Technology destroys jobs on a net basis — every robot/AI system replaces X workers permanently."** Students often equate **task.' },
                { id: 'b', prompt: 'A mid‑sized Indian textile firm replaces 20 manual looms with 5 automated looms.', answer: '**Step 1:** Original output = 20 looms × 1 unit = 20 units',
                  options: ['**Step 1:** Original output = 20 looms × 1 unit = 20 units', '5 looms × 1 operator = 5 jobs, so 15 jobs lost'],
                  hint: 'If unable to classify tasks, revisit the **O*NET task taxonomy** (simplified version in Class 12.',
                  misconception: '**"Technology destroys jobs on a net basis — every robot/AI system replaces X workers permanently."** Students often equate **task.' },
                { id: 'c', prompt: 'Compare the impact of **generative AI** (e.g., LLMs) on **high‑skill cognitive work** (coding, writing, analysis) with the impact of **industrial robots**.', answer: '**Similarities:** (1) Both automate **routine, well‑defined sub‑tasks** within',
                  options: ['**Similarities:** (1) Both automate **routine, well‑defined sub‑tasks** within', 'AI will replace all programmers'],
                  hint: 'If unable to classify tasks, revisit the **O*NET task taxonomy** (simplified version in Class 12.',
                  misconception: '**"Technology destroys jobs on a net basis — every robot/AI system replaces X workers permanently."** Students often equate **task.' }
          ],
            remediations: { 'technology-destroys-jobs-on-a': { steps: ['**Re‑watch** the 10‑minute video "The Future of Work: Automation vs.', 'Augmentation" (World Economic Forum) — pause at each channel (substitution, complementarity, new jobs) and write.', '**Re‑do Diagnostic Q3** with a different sector (e.g., auto‑rickshaw vs.', 'ride‑hailing app) — explicitly calculate both displacement and demand‑expansion effects.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_13_006', difficulty: 'standard',
          question: 'Artificial Intelligence (AI) refers to the simulation of human intelligence.',
          hint: 'Revisit c12_cs_cbse_13_002 (Digital Divide) and c12_cs_cbse_13_010 (Gender Issues) to see.',
          misconception: '**Misconception:** "AI bias is a technical bug that better algorithms or more data will fix." **Why students think.',
          parts: [
                { id: 'a', prompt: 'The PM-KISAN scheme uses AI-based face authentication to verify farmer beneficiaries before transferring ₹6,000/year.', answer: '**Correct answer:** 1',
                  options: ['**Correct answer:** 1', 'technical glitches', 'ideal user', 'AI bias is a technical bug that better algorithms or more data will fix'],
                  hint: 'Revisit c12_cs_cbse_13_002 (Digital Divide) and c12_cs_cbse_13_010 (Gender Issues) to see how.',
                  misconception: '**Misconception:** "AI bias is a technical bug that better algorithms or more data will fix." **Why students think this:** They equate.' },
                { id: 'b', prompt: 'An Indian agritech startup trains a crop-disease detection model on 50,000 images — 45,000 from Punjab wheat farms, 5,000 from Maharashtra cotton farms, and 0.', answer: '**Correct answer:** 1',
                  options: ['**Correct answer:** 1', 'model accuracy', 'AI bias is a technical bug that better algorithms or more data will fix', 'this:** They equate AI with code'],
                  hint: 'Revisit c12_cs_cbse_13_002 (Digital Divide) and c12_cs_cbse_13_010 (Gender Issues) to see how.',
                  misconception: '**Misconception:** "AI bias is a technical bug that better algorithms or more data will fix." **Why students think this:** They equate.' },
                { id: 'c', prompt: 'Compare **algorithmic bias** in (a) an AI hiring tool trained on 10 years of résumés from a male-dominated IT company, and (b) a credit-scoring AI using.', answer: '**Correct answer:** **(a) Hiring tool** - Source: Historical labels',
                  options: ['**Correct answer:** **(a) Hiring tool** - Source: Historical labels', 'data bias', 'AI bias is a technical bug that better algorithms or more data will fix', 'this:** They equate AI with code'],
                  hint: 'Revisit c12_cs_cbse_13_002 (Digital Divide) and c12_cs_cbse_13_010 (Gender Issues) to see how.',
                  misconception: '**Misconception:** "AI bias is a technical bug that better algorithms or more data will fix." **Why students think this:** They equate.' }
          ],
            remediations: { 'misconception-ai-bias-is-a': { steps: ['** Have the student trace a concrete biased outcome (e.g., AI hiring tool rejecting women) back to the *label.', '** Use the **Datasheets for Datasets** framework (Gebru et al.): Have them fill a datasheet for a hypothetical dataset.', '** Assign a **counterfactual exercise**: "Redesign the PM-KISAN face-auth system assuming 30% users have worn.', '** Re-diagnose with Diagnostic Question 3 (Assam crop disease) — check if they now identify *representation bias* and.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
