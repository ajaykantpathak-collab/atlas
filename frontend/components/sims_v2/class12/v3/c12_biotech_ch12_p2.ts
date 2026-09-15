import type { SimDef } from '../../engine/types';

/** v3 generated — c12_biotech_ch12_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_biotech_ch12_p2: SimDef = {
    id: 'v3_c12_biotech_ch12_p2',
    title: 'Entrepreneurship in Biotechnology · Part 2/2',
    subtitle: 'A school-lab dengue strip is stage one — who carries it to a patient?',
    classLevel: 12, subject: 'biotechnology', topic: 'Entrepreneurship in Biotechnology · Part 2/2',
    chapters: ['c12_biotech_ch12'],
    nodeIds: ['c12_biotech_cbse_12_007', 'c12_biotech_cbse_12_008', 'c12_biotech_cbse_12_009', 'c12_biotech_cbse_12_010', 'c12_biotech_cbse_12_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Biotech founder-in-residence', intro: 'Science becomes a product only inside an ecosystem — learn who funds, incubates and regulates the journey.', goal: 'Classify biotechnology sectors and trace a startup\'s path from ideation to market.' },
    discovery: {
        question: 'Priya built a low-cost dengue diagnostic strip in her school tinkering lab. What must exist around her for it to become a real product that reaches patients?',
        options: ['A startup ecosystem — incubators, funding agencies, regulators and industry partners that move a prototype through validation to market', 'A patent alone — legal protection automatically turns prototypes into products', 'A big company to buy the idea immediately', 'Nothing — a working prototype sells itself'],
        answer: 'A startup ecosystem — incubators, funding agencies, regulators and industry partners that move a prototype through validation to market',
        hook: 'The gap between lab and market kills most science — a prototype is only the first stage of a funnel that needs incubators, regulators and capital at every step. Ideas are cheap; translation is the industry.',
    },
    teaching: [
        { title: 'Regulatory Framework: FDA, GEAC, and Approval Processes', text: 'The regulatory framework in biotechnology encompasses the laws, guidelines, and institutional mechanisms (such as the US FDA, India\'s GEAC, and DCGI) that govern the research, development, testing.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_biotech_cbse_12_007', title: 'Your mission',
          mission: { widget: 'dna', validate: 'dna:unzip=70',
            instruction: 'On the lab: unzip the helix past 70% — what do the base pairs do?.',
        context: 'Map the biotech industry: classify its five major sectors from biofuels to regenerative medicine, then walk Priya\'s diagnostic strip through the startup funnel from ideation to commercial launch.',
            observePrompt: 'What did the dna interactive show you?' } },
        { type: 'case', nodeId: 'c12_biotech_cbse_12_007', title: 'Regulatory Framework: FDA, GEAC, and Approval Processes',
          caseStudy: { intro: 'Imagine you have developed a recombinant insulin in your college lab — it works beautifully in mice.',
            decisions: [{ prompt: 'Name the three primary regulatory bodies that oversee biotechnology product approval in India and state the specific domain.', options: [
                { text: 'The three primary bodies are: (1) DCGI (Drug Controller General of India)', outcome: 'The three primary bodies are: (1) DCGI (Drug Controller General of India) — governs.' },
                { text: 'GEAC approval alone authorizes commercial sale of GM crops or products', outcome: 'Not quite — Students believe GEAC approval alone authorizes commercial sale of GM crops or products.', reveals: 'geac-approval-alone-authorizes-commercial' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_12_008', title: 'Funding Sources for Biotech Ventures',
          caseStudy: { intro: 'Imagine you have developed a novel diagnostic kit for early detection of tuberculosis using CRISPR-based technology — validated in the lab, but you need ₹5.',
            decisions: [{ prompt: 'A biotech founder says: "I should approach venture capital firms first because they give the largest amounts of money." What is the.', options: [
                { text: 'The flaw is assuming VC firms invest at pre-clinical stages', outcome: 'The flaw is assuming VC firms invest at pre-clinical stages. Most Indian biotech VCs (e.g., Eight.' },
                { text: 'funding', outcome: 'Not quite — Students believe "funding" means only equity investment from VCs, and that all biotech startups.', reveals: 'funding-means-only-equity-investment' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_12_009', title: 'Technology Transfer and Commercialization Pathways',
          caseStudy: { intro: 'Imagine a PhD student at IIT Delhi discovers a novel CRISPR-based diagnostic for tuberculosis that costs ₹50 per test instead of ₹500. The lab files a patent.',
            decisions: [{ prompt: 'A university research team develops a recombinant protein therapeutic for diabetes. They file a PCT patent application.', options: [
                { text: 'Option (A) represents a licensing agreement', outcome: 'Option (A) represents a licensing agreement. In licensing, the IP owner (university) grants.' },
                { text: 'giving technology to a company', outcome: 'Not quite — Students believe "technology transfer = signing a license agreement" and that the TTO\'s job ends.', reveals: 'technology-transfer-signing-a-license' },
                { text: 'technology transfer = signing a license agreement', outcome: 'Not quite — Students believe "technology transfer = signing a license agreement" and that the TTO\'s job ends.', reveals: 'technology-transfer-signing-a-license' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_12_010', title: 'Case Studies of Successful Biotech Companies',
          caseStudy: { intro: 'Imagine you\'re reading about how a small lab discovery becomes a ₹10,000 crore company like Biocon or Serum Institute.',
            decisions: [{ prompt: 'Name two Indian biotechnology companies that successfully commercialized recombinant therapeutic proteins, and state the first product each.', options: [
                { text: 'Biocon (recombinant human insulin, 2004) and Shantha Biotechnics (recombinant hepatitis B', outcome: 'Biocon (recombinant human insulin, 2004) and Shantha Biotechnics (recombinant hepatitis B vaccine.' },
                { text: 'only vaccine companies or confusing generic pharma with biotech', outcome: 'Not quite — Students treat biotech case studies as "success stories" to memorize (founder name, year, product).', reveals: 'students-treat-biotech-case-studies' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_12_011', title: 'Biosafety Regulations and Compliance Requirements',
          caseStudy: { intro: 'Imagine you are a Class 12 student interning at a biotech startup that wants to engineer E. coli to produce insulin.',
            decisions: [{ prompt: 'A REMEMBER level question: List the three mandatory committees (in order from institutional to national) that must approve a recombinant.', options: [
                { text: 'Correct answer: Institutional Biosafety Committee (IBSC) → Review Committee on Genetic', outcome: 'Correct answer: Institutional Biosafety Committee (IBSC) → Review Committee on Genetic Manipulation.' },
                { text: 'biosafety compliance is only about wearing gloves and masks', outcome: 'Not quite — Students often believe that "biosafety compliance is only about wearing gloves and masks" or that.', reveals: 'biosafety-compliance-is-only-about' },
                { text: 'if my experiment doesn’t use recombinant DNA, I don’t need any approval', outcome: 'Not quite — Students often believe that "biosafety compliance is only about wearing gloves and masks" or that.', reveals: 'biosafety-compliance-is-only-about' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_biotech_cbse_12_008', title: 'Identify each idea',
          dissect: { specimen: 'Entrepreneurship in Biotechnology · Part 2/2', spots: [
            { id: 's1', label: 'Regulatory Framework FDA GEAC and Approval Processes', prompt: 'Which idea is this? — The regulatory framework in biotechnology encompasses the laws, guidelines, and.', answer: 'Regulatory Framework FDA GEAC and Approval Processes', options: ['Regulatory Framework FDA GEAC and Approval Processes', 'Funding Sources for Biotech Ventures', 'Technology Transfer and Commercialization Pathways', 'Case Studies of Successful Biotech Companies'] },
            { id: 's2', label: 'Funding Sources for Biotech Ventures', prompt: 'Which idea is this? — Funding sources for biotech ventures refer to the various financial mechanisms and.', answer: 'Funding Sources for Biotech Ventures', options: ['Funding Sources for Biotech Ventures', 'Regulatory Framework FDA GEAC and Approval Processes', 'Technology Transfer and Commercialization Pathways', 'Case Studies of Successful Biotech Companies'] },
            { id: 's3', label: 'Technology Transfer and Commercialization Pathways', prompt: 'Which idea is this? — Technology transfer in biotechnology is the formal process of moving scientific.', answer: 'Technology Transfer and Commercialization Pathways', options: ['Technology Transfer and Commercialization Pathways', 'Regulatory Framework FDA GEAC and Approval Processes', 'Funding Sources for Biotech Ventures', 'Case Studies of Successful Biotech Companies'] },
            { id: 's4', label: 'Case Studies of Successful Biotech Companies', prompt: 'Which idea is this? — Case studies of successful biotech companies are detailed analyses of real-world.', answer: 'Case Studies of Successful Biotech Companies', options: ['Case Studies of Successful Biotech Companies', 'Regulatory Framework FDA GEAC and Approval Processes', 'Funding Sources for Biotech Ventures', 'Technology Transfer and Commercialization Pathways'] },
            { id: 's5', label: 'Biosafety Regulations and Compliance Requirements', prompt: 'Which idea is this? — Biosafety regulations are legally mandated frameworks that govern the handling.', answer: 'Biosafety Regulations and Compliance Requirements', options: ['Biosafety Regulations and Compliance Requirements', 'Regulatory Framework FDA GEAC and Approval Processes', 'Funding Sources for Biotech Ventures', 'Technology Transfer and Commercialization Pathways'] }
          ] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_12_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a student startup pitch, a team plans to turn the canteen\'s waste cooking oil into biodiesel. Their pitch deck says the oil will be \'fermented by yeast, then distilled — same as making bioethanol\'.',
            decisions: [{ prompt: 'Does the process description hold up?', options: [
                { text: 'No — biodiesel comes from trans-esterification of triglycerides with methanol/ethanol and a catalyst, giving fatty-acid methyl esters plus glycerol; yeast fermentation of sugars makes bioethanol, a different pathway.', outcome: 'Both are biofuels but the biochemistry differs — grouping by product category instead of process is the pitch-killing error.' },
                { text: 'Yes — biodiesel and bioalcohol are both biofuels, so they\'re made by the same fermentation process.', outcome: 'One is an esterification of fats, the other a fermentation of sugars; the shared label \'biofuel\' hides different feedstocks and chemistry.', reveals: 'biofuels-same-process' },
                { text: 'Yes — and anyway environmental biotechnology is just bioremediation, so the pitch barely counts as biotech.', outcome: 'The sector covers prevention too — biofuels, biogas and biodegradable products are core environmental biotech, not only pollution cleanup.', reveals: 'env-biotech-is-cleanup-only' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_12_011', title: 'You made it',
          caseStudy: { intro: 'You now see biotech as an economy, not just a lab. Sector mapping and the startup pathway are the most career-relevant board content in the subject — some of you will live this chapter.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'dna', prompt: 'Explore the dna interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'dna', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_biotech_cbse_12_007', difficulty: 'standard',
          question: 'The regulatory framework in biotechnology encompasses the laws, guidelines, and.',
          hint: 'Revisit c12_biotech_cbse_12_011 (Biosafety Regulations) and map each committee to its.',
          misconception: 'Students believe GEAC approval alone authorizes commercial sale of GM crops or products.',
          parts: [
                { id: 'a', prompt: 'Name the three primary regulatory bodies that oversee biotechnology product approval in India and state the specific domain (pharmaceuticals, GM crops, or rDNA.', answer: 'The three primary bodies are: (1) DCGI (Drug Controller General of India)',
                  options: ['The three primary bodies are: (1) DCGI (Drug Controller General of India)', 'GEAC approval alone authorizes commercial sale of GM crops or products'],
                  hint: 'Revisit c12_biotech_cbse_12_011 (Biosafety Regulations) and map each committee to its legal.',
                  misconception: 'Students believe GEAC approval alone authorizes commercial sale of GM crops or products.' },
                { id: 'b', prompt: 'A startup has completed preclinical toxicity studies for a recombinant malaria vaccine in mice.', answer: 'The application would be rejected',
                  options: ['The application would be rejected', 'they need FDA approval first', 'they need GEAC approval', 'GEAC approval alone authorizes commercial sale of GM crops or products'],
                  hint: 'Revisit c12_biotech_cbse_12_011 (Biosafety Regulations) and map each committee to its legal.',
                  misconception: 'Students believe GEAC approval alone authorizes commercial sale of GM crops or products.' }
          ],
            remediations: { 'geac-approval-alone-authorizes-commercial': { steps: ['Have the student draw a two-column table: Column A = "Biosafety/Environmental Clearance" (GEAC, RCGM, IBSC, SBCC, DLC).', 'Give them three product scenarios — recombinant vaccine, Bt brinjal, industrial enzyme from GM microbe — and ask them.', 'For each misplaced item, ask "Which Act/Rule empowers this authority?" to force statutory linkage.', 'Re-test with a fresh scenario (e.g., GM rubber tree for latex) after 48 hours to verify retention.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_12_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe GEAC approval alone authorizes commercial sale of GM crops or products.',
          parts: [
                { id: 'a', prompt: 'Design a regulatory strategy checklist for an Indian biotech startup developing a recombinant enzyme for industrial use (non-pharma, non-food).', answer: 'Checklist: (1) IBSC registration & project approval',
                  options: ['Checklist: (1) IBSC registration & project approval', 'GEAC approval alone authorizes commercial sale of GM crops or products'],
                  hint: 'Revisit c12_biotech_cbse_12_011 (Biosafety Regulations) and map each committee to its legal.',
                  misconception: 'Students believe GEAC approval alone authorizes commercial sale of GM crops or products.' }
          ],
            remediations: { 'geac-approval-alone-authorizes-commercial': { steps: ['Have the student draw a two-column table: Column A = "Biosafety/Environmental Clearance" (GEAC, RCGM, IBSC, SBCC, DLC).', 'Give them three product scenarios — recombinant vaccine, Bt brinjal, industrial enzyme from GM microbe — and ask them.', 'For each misplaced item, ask "Which Act/Rule empowers this authority?" to force statutory linkage.', 'Re-test with a fresh scenario (e.g., GM rubber tree for latex) after 48 hours to verify retention.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_12_008', difficulty: 'standard',
          question: 'Funding sources for biotech ventures refer to the various financial mechanisms.',
          hint: 'Revisit the TRL framework from startup ecosystem node (c12_biotech_cbse_12_002) and map.',
          misconception: 'Students believe "funding" means only equity investment from VCs, and that all biotech startups follow the same.',
          parts: [
                { id: 'a', prompt: 'A biotech founder says: "I should approach venture capital firms first because they give the largest amounts of money." What is the fundamental flaw in this.', answer: 'The flaw is assuming VC firms invest at pre-clinical stages',
                  options: ['The flaw is assuming VC firms invest at pre-clinical stages', 'funding'],
                  hint: 'Revisit the TRL framework from startup ecosystem node (c12_biotech_cbse_12_002) and map each level.',
                  misconception: 'Students believe "funding" means only equity investment from VCs, and that all biotech startups follow the same VC-backed trajectory (Seed.' },
                { id: 'b', prompt: 'A startup developing a biosimilar monoclonal antibody (mAb) for cancer has completed Phase I trials and needs ₹30 crore for Phase II/III.', answer: 'Option B preserves more upside',
                  options: ['Option B preserves more upside', 'funding'],
                  hint: 'Revisit the TRL framework from startup ecosystem node (c12_biotech_cbse_12_002) and map each level.',
                  misconception: 'Students believe "funding" means only equity investment from VCs, and that all biotech startups follow the same VC-backed trajectory (Seed.' }
          ],
            remediations: { 'funding-means-only-equity-investment': { steps: ['If a student cannot distinguish stage-appropriate funding sources: (1) Have them create a 2×2 matrix: X-axis.', 'This visual mapping cures the "VC-first" bias by grounding funding logic in TRL and capital reality.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_12_009', difficulty: 'standard',
          question: 'Technology transfer in biotechnology is the formal process of moving scientific.',
          hint: 'If unclear on patent claims or clinical phases, revisit c12_biotech_cbse_12_003 (patent.',
          misconception: 'Students believe "technology transfer = signing a license agreement" and that the TTO\'s job ends at deal closure.',
          parts: [
                { id: 'a', prompt: 'A university research team develops a recombinant protein therapeutic for diabetes. They file a PCT patent application.', answer: 'Option (A) represents a licensing agreement',
                  options: ['Option (A) represents a licensing agreement', 'giving technology to a company', 'technology transfer = signing a license agreement'],
                  hint: 'If unclear on patent claims or clinical phases, revisit c12_biotech_cbse_12_003 (patent anatomy).',
                  misconception: 'Students believe "technology transfer = signing a license agreement" and that the TTO\'s job ends at deal closure.' },
                { id: 'b', prompt: 'Explain why a university TTO might choose an EXCLUSIVE license over a NON-EXCLUSIVE license for an early-stage biotech platform technology (e.g., a novel gene.', answer: 'Exclusive licenses are preferred for early-stage platform technologies',
                  options: ['Exclusive licenses are preferred for early-stage platform technologies', 'exclusive licenses earn more money', 'technology transfer = signing a license agreement'],
                  hint: 'If unclear on patent claims or clinical phases, revisit c12_biotech_cbse_12_003 (patent anatomy).',
                  misconception: 'Students believe "technology transfer = signing a license agreement" and that the TTO\'s job ends at deal closure.' },
                { id: 'c', prompt: 'A TTO evaluates a patented plant biotechnology trait (drought tolerance in rice). The invention is at TRL 3 (lab validated).', answer: 'Step 1: Annual royalty = 2% × ₹200 crore = ₹4 crore/year (Years 6–15)',
                  options: ['Step 1: Annual royalty = 2% × ₹200 crore = ₹4 crore/year (Years 6–15)', 'technology transfer = signing a license agreement'],
                  hint: 'If unclear on patent claims or clinical phases, revisit c12_biotech_cbse_12_003 (patent anatomy).',
                  misconception: 'Students believe "technology transfer = signing a license agreement" and that the TTO\'s job ends at deal closure.' },
                { id: 'd', prompt: 'Compare and contrast the "Spin-off" vs. "Licensing to an established company" pathway for a university-originated CAR-T cell therapy platform.', answer: 'Spin-off: (i) High control',
                  options: ['Spin-off: (i) High control', 'spin-off always better for control', 'technology transfer = signing a license agreement'],
                  hint: 'If unclear on patent claims or clinical phases, revisit c12_biotech_cbse_12_003 (patent anatomy).',
                  misconception: 'Students believe "technology transfer = signing a license agreement" and that the TTO\'s job ends at deal closure.' }
          ],
            remediations: { 'technology-transfer-signing-a-license': { steps: ['If a student cannot distinguish transfer models or map the commercialization funnel: (1) Revisit.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_12_010', difficulty: 'standard',
          question: 'Case studies of successful biotech companies are detailed analyses.',
          hint: 'Revisit c11_biotech_cbse_12_008 (recombinant DNA cloning) and c11_biotech_cbse_01_006.',
          misconception: 'Students treat biotech case studies as "success stories" to memorize (founder name, year, product) rather than.',
          parts: [
                { id: 'a', prompt: 'Biocon\'s recombinant human insulin (Insugen) received marketing approval in India in 2004.', answer: 'Because biosimilars (unlike chemical generics) are not identical copies',
                  options: ['Because biosimilars (unlike chemical generics) are not identical copies', 'because Indian law requires local trials for all drugs'],
                  hint: 'Revisit c11_biotech_cbse_12_008 (recombinant DNA cloning) and c11_biotech_cbse_01_006 (biotech.',
                  misconception: 'Students treat biotech case studies as "success stories" to memorize (founder name, year, product) rather than as **strategic decision.' }
          ],
            remediations: { 'students-treat-biotech-case-studies': { steps: ['If a student cannot move beyond memorization: (1) Assign ONE company (e.g., Biocon) and require a 300-word "decision.', '(2) Map each decision to a prior node: enzyme choice → c12_biotech_cbse_12_001 (sectors); IP filing →.', '(3) Re-test with Diagnostic Question 4 (Genentech vs Biocon comparison) — if they still describe only products not.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_12_011', difficulty: 'standard',
          question: 'Biosafety regulations are legally mandated frameworks that govern the handling.',
          hint: 'If stuck, revisit c11_biotech_cbse_01_010 (Biosafety: Regulations and Guidelines) and.',
          misconception: 'Students often believe that "biosafety compliance is only about wearing gloves and masks" or that "if my experiment.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Biosafety regulations are legally mandated frameworks that govern the handling,',
                  options: ['Biosafety regulations are legally mandated frameworks that govern the handling,', 'The biotechnology industry encompasses the commercial application of biological systems,', 'The startup ecosystem in biotechnology refers to the interconnected network of', 'A patent in biotechnology is an exclusive legal right granted by a government to an'],
                  hint: 'If stuck, revisit c11_biotech_cbse_01_010 (Biosafety: Regulations and Guidelines) and practice.',
                  misconception: 'Students often believe that "biosafety compliance is only about wearing gloves and masks" or that "if my experiment doesn’t use recombinant.' }
          ],
            remediations: { 'biosafety-compliance-is-only-about': { steps: ['If a student exhibits this misconception, immediately have them: (1) Read the "Definition of hazardous microorganism".', 'Which committees must approve?', 'What engineering controls?" Debrief by comparing their answer to the regulatory text.', 'This concrete mapping replaces the vague "PPE" mental model with the correct legal‑procedural model.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
