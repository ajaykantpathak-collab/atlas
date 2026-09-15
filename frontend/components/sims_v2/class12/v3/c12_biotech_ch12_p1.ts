import type { SimDef } from '../../engine/types';

/** v3 generated — c12_biotech_ch12_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_biotech_ch12_p1: SimDef = {
    id: 'v3_c12_biotech_ch12_p1',
    title: 'Entrepreneurship in Biotechnology · Part 1/2',
    subtitle: 'A school-lab dengue strip is stage one — who carries it to a patient?',
    classLevel: 12, subject: 'biotechnology', topic: 'Entrepreneurship in Biotechnology · Part 1/2',
    chapters: ['c12_biotech_ch12'],
    nodeIds: ['c12_biotech_cbse_12_001', 'c12_biotech_cbse_12_002', 'c12_biotech_cbse_12_003', 'c12_biotech_cbse_12_004', 'c12_biotech_cbse_12_005', 'c12_biotech_cbse_12_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Biotech founder-in-residence', intro: 'Science becomes a product only inside an ecosystem — learn who funds, incubates and regulates the journey.', goal: 'Classify biotechnology sectors and trace a startup\'s path from ideation to market.' },
    discovery: {
        question: 'Priya built a low-cost dengue diagnostic strip in her school tinkering lab. What must exist around her for it to become a real product that reaches patients?',
        options: ['A startup ecosystem — incubators, funding agencies, regulators and industry partners that move a prototype through validation to market', 'A patent alone — legal protection automatically turns prototypes into products', 'A big company to buy the idea immediately', 'Nothing — a working prototype sells itself'],
        answer: 'A startup ecosystem — incubators, funding agencies, regulators and industry partners that move a prototype through validation to market',
        hook: 'The gap between lab and market kills most science — a prototype is only the first stage of a funnel that needs incubators, regulators and capital at every step. Ideas are cheap; translation is the industry.',
    },
    teaching: [
        { title: 'Biotechnology Industry: Scope and Major Sectors', text: 'The biotechnology industry encompasses the commercial application of biological systems, living organisms, or their derivatives to develop products and processes across five major innovation sectors.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_biotech_cbse_12_001', title: 'Your mission',
          mission: { widget: 'dna', validate: 'dna:unzip=70',
            instruction: 'On the lab: unzip the helix past 70% — what do the base pairs do?.',
        context: 'Map the biotech industry: classify its five major sectors from biofuels to regenerative medicine, then walk Priya\'s diagnostic strip through the startup funnel from ideation to commercial launch.',
            observePrompt: 'What did the dna interactive show you?' } },
        { type: 'case', nodeId: 'c12_biotech_cbse_12_001', title: 'Biotechnology Industry: Scope and Major Sectors',
          caseStudy: { intro: 'Imagine you are a Class 12 student asked: "Biotechnology is everywhere — from the insulin a diabetic relative injects, to the Bt cotton in a farmer\'s field,.',
            decisions: [{ prompt: 'Name the five major innovation sectors of biotechnology discussed in NCERT Class 12 Chapter 12, and give the one-line definition.', options: [
                { text: 'The five sectors are: (1) Environmental Biotechnology, (2) Plant Biotechnology, (3)', outcome: 'The five sectors are: (1) Environmental Biotechnology, (2) Plant Biotechnology, (3) Regenerative.' },
                { text: 'A wrong answer (e.g., listing', outcome: 'Not quite — **Misconception:** "Environmental biotechnology = bioremediation only." Students equate the entire.', reveals: 'misconception-environmental-biotechnology-biorem' },
                { text: 'as a separate sector, or defining synthetic biology as', outcome: 'Not quite — **Misconception:** "Environmental biotechnology = bioremediation only." Students equate the entire.', reveals: 'misconception-environmental-biotechnology-biorem' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_12_003', title: 'Intellectual Property Rights: Patents in Biotechnology',
          caseStudy: { intro: 'Imagine you are a Class 12 student interning at a biotech startup that has just engineered a novel thermostable enzyme for biofuel production.',
            decisions: [{ prompt: 'What are the three statutory requirements for an invention to be patentable under the Indian Patents Act, 1970?', options: [
                { text: 'The three requirements are: (1) Novelty', outcome: 'The three requirements are: (1) Novelty — the invention must not be part of the prior art anywhere.' },
                { text: 'industrial application', outcome: 'Not quite — Students often believe that "patenting a gene means owning the gene in every human body." This.', reveals: 'patenting-a-gene-means-owning' },
                { text: 'inventive step', outcome: 'Not quite — Students often believe that "patenting a gene means owning the gene in every human body." This.', reveals: 'patenting-a-gene-means-owning' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_12_004', title: 'Patenting Life Forms and Genes: Criteria and Controversies',
          caseStudy: { intro: 'Imagine a startup in Bengaluru has developed a CRISPR-edited rice variety that tolerates salinity and expresses a bacterial gene for pest resistance — they.',
            decisions: [{ prompt: 'A student writes: "Under the Indian Patents Act, a genetically modified microorganism producing insulin cannot be patented because it is.', options: [
                { text: '**Correct answer:** The statement is **incorrect**', outcome: '**Correct answer:** The statement is **incorrect** — genetically modified microorganisms *are*.' },
                { text: 'correct', outcome: 'Not quite — **"All gene patents are banned in India because genes are \'products of nature\'."** Students.', reveals: 'all-gene-patents-are-banned' },
                { text: 'plants and animals in whole or any part thereof', outcome: 'Not quite — **"All gene patents are banned in India because genes are \'products of nature\'."** Students.', reveals: 'all-gene-patents-are-banned' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_12_005', title: 'TRIPS Agreement and Its Implications for Indian Biotech',
          caseStudy: { intro: 'Imagine you are the founder of an Indian biotech startup that has developed a novel recombinant vaccine.',
            decisions: [{ prompt: 'What are the three core pillars of the TRIPS Agreement that every WTO member must implement in national law?', options: [
                { text: 'The three pillars are: (1) Minimum Standards', outcome: 'The three pillars are: (1) Minimum Standards — substantive IP protection norms (e.g., 20-year.' },
                { text: 'patents, copyrights, trademarks', outcome: 'Not quite — Students often believe TRIPS forces India to grant patents on all life forms (genes, plants.', reveals: 'trips-forces-india-to-grant' },
                { text: 'explain', outcome: 'Not quite — Students often believe TRIPS forces India to grant patents on all life forms (genes, plants.', reveals: 'trips-forces-india-to-grant' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_biotech_cbse_12_002', title: 'Identify each idea',
          dissect: { specimen: 'Entrepreneurship in Biotechnology · Part 1/2', spots: [
            { id: 's1', label: 'Biotechnology Industry Scope and Major Sectors', prompt: 'Which idea is this? — The biotechnology industry encompasses the commercial application of biological systems.', answer: 'Biotechnology Industry Scope and Major Sectors', options: ['Biotechnology Industry Scope and Major Sectors', 'Startup Ecosystem in Biotechnology', 'Intellectual Property Rights Patents in Biotechnology', 'Patenting Life Forms and Genes Criteria and Controversies'] },
            { id: 's2', label: 'Startup Ecosystem in Biotechnology', prompt: 'Which idea is this? — The startup ecosystem in biotechnology refers to the interconnected network.', answer: 'Startup Ecosystem in Biotechnology', options: ['Startup Ecosystem in Biotechnology', 'Biotechnology Industry Scope and Major Sectors', 'Intellectual Property Rights Patents in Biotechnology', 'Patenting Life Forms and Genes Criteria and Controversies'] },
            { id: 's3', label: 'Intellectual Property Rights Patents in Biotechnology', prompt: 'Which idea is this? — A patent in biotechnology is an exclusive legal right granted by a government to.', answer: 'Intellectual Property Rights Patents in Biotechnology', options: ['Intellectual Property Rights Patents in Biotechnology', 'Biotechnology Industry Scope and Major Sectors', 'Startup Ecosystem in Biotechnology', 'Patenting Life Forms and Genes Criteria and Controversies'] },
            { id: 's4', label: 'Patenting Life Forms and Genes Criteria and Controversies', prompt: 'Which idea is this? — Patenting life forms and genes refers to the legal process of obtaining exclusive.', answer: 'Patenting Life Forms and Genes Criteria and Controversies', options: ['Patenting Life Forms and Genes Criteria and Controversies', 'Biotechnology Industry Scope and Major Sectors', 'Startup Ecosystem in Biotechnology', 'Intellectual Property Rights Patents in Biotechnology'] },
            { id: 's5', label: 'TRIPS Agreement and Its Implications for Indian Biotech', prompt: 'Which idea is this? — The TRIPS Agreement (Trade-Related Aspects of Intellectual Property Rights) is a binding.', answer: 'TRIPS Agreement and Its Implications for Indian Biotech', options: ['TRIPS Agreement and Its Implications for Indian Biotech', 'Biotechnology Industry Scope and Major Sectors', 'Startup Ecosystem in Biotechnology', 'Intellectual Property Rights Patents in Biotechnology'] },
            { id: 's6', label: 'Biotechnology Parks and Incubation Centers', prompt: 'Which idea is this? — Biotechnology parks are specialized infrastructure zones established by government.', answer: 'Biotechnology Parks and Incubation Centers', options: ['Biotechnology Parks and Incubation Centers', 'Biotechnology Industry Scope and Major Sectors', 'Startup Ecosystem in Biotechnology', 'Intellectual Property Rights Patents in Biotechnology'] }
          ] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_12_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a student startup pitch, a team plans to turn the canteen\'s waste cooking oil into biodiesel. Their pitch deck says the oil will be \'fermented by yeast, then distilled — same as making bioethanol\'.',
            decisions: [{ prompt: 'Does the process description hold up?', options: [
                { text: 'No — biodiesel comes from trans-esterification of triglycerides with methanol/ethanol and a catalyst, giving fatty-acid methyl esters plus glycerol; yeast fermentation of sugars makes bioethanol, a different pathway.', outcome: 'Both are biofuels but the biochemistry differs — grouping by product category instead of process is the pitch-killing error.' },
                { text: 'Yes — biodiesel and bioalcohol are both biofuels, so they\'re made by the same fermentation process.', outcome: 'One is an esterification of fats, the other a fermentation of sugars; the shared label \'biofuel\' hides different feedstocks and chemistry.', reveals: 'biofuels-same-process' },
                { text: 'Yes — and anyway environmental biotechnology is just bioremediation, so the pitch barely counts as biotech.', outcome: 'The sector covers prevention too — biofuels, biogas and biodegradable products are core environmental biotech, not only pollution cleanup.', reveals: 'env-biotech-is-cleanup-only' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_12_006', title: 'The bigger picture',
          caseStudy: { intro: 'You now see biotech as an economy, not just a lab. Sector mapping and the startup pathway are the most career-relevant board content in the subject — some of you will live this chapter.',
            decisions: [{ prompt: 'What comes next? Entrepreneurship in Biotechnology · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Entrepreneurship in Biotechnology · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'dna', prompt: 'Explore the dna interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'dna', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_biotech_cbse_12_001', difficulty: 'standard',
          question: 'The biotechnology industry encompasses the commercial application of biological.',
          hint: 'If stuck on biofuel processes: revisit Class 11 Biology Chapter 12 (Respiration) nodes.',
          misconception: '**Misconception:** "Environmental biotechnology = bioremediation only." Students equate the entire sector with cleaning.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast **organoids** and **spheroids** as 3D culture models for drug screening.', answer: 'the cellular origin of each, (',
                  options: ['the cellular origin of each, (', 'both need Matrigel', 'both come from stem cells'],
                  hint: 'If stuck on biofuel processes: revisit Class 11 Biology Chapter 12 (Respiration) nodes.',
                  misconception: '**Misconception:** "Environmental biotechnology = bioremediation only." Students equate the entire sector with cleaning up pollution.' }
          ],
            remediations: { 'misconception-environmental-biotechnology-biorem': { steps: ['**Re-read NCERT 12.1.1 (Biofuel) and 12.1.2 (Biodegradation)** — make a two-column table: left column = "Remediation.', 'Fill with: biodiesel, bioalcohol, biogas, biomass, PHB, biopulping, biobleaching, microbial EOR.', '**Create flashcards** for each biofuel type: raw material → process name → key advantage → key limitation (e.g.', '**Re-diagnostic**: Ask a peer to quiz you: "Name the process for biodiesel.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_12_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Environmental biotechnology = bioremediation only." Students equate the entire sector with cleaning.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Gold nanoparticles of 10 nm diameter are always ruby red, so colour can be used as a reliable quality-control metric for nanoparticle.', answer: 'The claim is **partially true but dangerous as a sole QC metric**',
                  options: ['The claim is **partially true but dangerous as a sole QC metric**', 'yes, colour is reliable', 'properties depend on size, shape, surface charge, and composition'],
                  hint: 'If stuck on biofuel processes: revisit Class 11 Biology Chapter 12 (Respiration) nodes.',
                  misconception: '**Misconception:** "Environmental biotechnology = bioremediation only." Students equate the entire sector with cleaning up pollution.' }
          ],
            remediations: { 'misconception-environmental-biotechnology-biorem': { steps: ['**Re-read NCERT 12.1.1 (Biofuel) and 12.1.2 (Biodegradation)** — make a two-column table: left column = "Remediation.', 'Fill with: biodiesel, bioalcohol, biogas, biomass, PHB, biopulping, biobleaching, microbial EOR.', '**Create flashcards** for each biofuel type: raw material → process name → key advantage → key limitation (e.g.', '**Re-diagnostic**: Ask a peer to quiz you: "Name the process for biodiesel.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_12_002', difficulty: 'standard',
          question: 'The startup ecosystem in biotechnology refers to the interconnected network.',
          hint: 'Revisit c11_biotech_cbse_12_008 (Recombinant DNA Technology: Vectors and Cloning) and.',
          misconception: 'Students believe biotech startups follow the same \'lean startup\' playbook as software — build MVP, iterate fast, raise.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The startup ecosystem in biotechnology refers to the interconnected network of',
                  options: ['The startup ecosystem in biotechnology refers to the interconnected network of', 'The biotechnology industry encompasses the commercial application of biological systems,', 'A patent in biotechnology is an exclusive legal right granted by a government to an', 'Patenting life forms and genes refers to the legal process of obtaining exclusive'],
                  hint: 'Revisit c11_biotech_cbse_12_008 (Recombinant DNA Technology: Vectors and Cloning) and.',
                  misconception: 'Students believe biotech startups follow the same \'lean startup\' playbook as software — build MVP, iterate fast, raise seed from angels.' }
          ],
            remediations: { 'biotech-startups-follow-the-same': { steps: ['If a student exhibits this misconception, do NOT say \'study more.\' Instead: (1) Have them read BIRAC\'s BIG grant.', '(2) Map a real Indian biotech startup\'s timeline (e.g., Bugworks, Epigeneres, or a local incubator portfolio company).', '(3) Role-play a CDSCO pre-submission meeting: student presents their \'MVP\' plan; teacher acts as regulator asking for.', '(4) Re-attempt Diagnostic Question 3 with the corrected mental model.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_12_003', difficulty: 'standard',
          question: 'A patent in biotechnology is an exclusive legal right granted by a government.',
          hint: 'Revisit c11_biotech_cbse_01_011 (Intellectual Property Rights and Patents.',
          misconception: 'Students often believe that "patenting a gene means owning the gene in every human body." This is factually and legally.',
          parts: [
                { id: 'a', prompt: 'What are the three statutory requirements for an invention to be patentable under the Indian Patents Act, 1970?', answer: 'The three requirements are: (1) Novelty',
                  options: ['The three requirements are: (1) Novelty', 'industrial application', 'inventive step', 'novelty'],
                  hint: 'Revisit c11_biotech_cbse_01_011 (Intellectual Property Rights and Patents in Biotechnology) and.',
                  misconception: 'Students often believe that "patenting a gene means owning the gene in every human body." This is factually and legally incorrect.' },
                { id: 'b', prompt: 'A researcher isolates a new antibiotic-producing bacterium from a soil sample.', answer: 'Section 3(c) excludes "the discovery of any living thing or non-living substance',
                  options: ['Section 3(c) excludes "the discovery of any living thing or non-living substance', 'the bacterium cannot be patented at all', 'patenting a gene means owning the gene in every human body', '"patenting a gene means owning the gene in every human body'],
                  hint: 'Revisit c11_biotech_cbse_01_011 (Intellectual Property Rights and Patents in Biotechnology) and.',
                  misconception: 'Students often believe that "patenting a gene means owning the gene in every human body." This is factually and legally incorrect.' },
                { id: 'c', prompt: 'A biotech company files a patent application for a recombinant vaccine.', answer: 'Claim 1 (the DNA sequence *per se*) may be rejected under Section 3(d) if it is',
                  options: ['Claim 1 (the DNA sequence *per se*) may be rejected under Section 3(d) if it is', 'DNA cannot be patented', 'patenting a gene means owning the gene in every human body', '"patenting a gene means owning the gene in every human body'],
                  hint: 'Revisit c11_biotech_cbse_01_011 (Intellectual Property Rights and Patents in Biotechnology) and.',
                  misconception: 'Students often believe that "patenting a gene means owning the gene in every human body." This is factually and legally incorrect.' }
          ],
            remediations: { 'patenting-a-gene-means-owning': { steps: ['If a student holds this misconception, do the following: (1) Show the exact wording of a granted Indian patent claim.', '(3) Assign a re-diagnostic: "Draft a claim for a naturally occurring microRNA that you discovered is upregulated.', 'Explain why the claim as written would be rejected, and rewrite it to cover a diagnostic method instead." This forces.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_12_004', difficulty: 'standard',
          question: 'Patenting life forms and genes refers to the legal process of obtaining.',
          hint: 'Revisit c12_biotech_cbse_12_003 (IPR basics) for patentability criteria and.',
          misconception: '**"All gene patents are banned in India because genes are \'products of nature\'."** Students repeatedly write this.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Under the Indian Patents Act, a genetically modified microorganism producing insulin cannot be patented because it is a life form." Is this.', answer: '**Correct answer:** The statement is **incorrect**',
                  options: ['**Correct answer:** The statement is **incorrect**', 'correct', 'plants and animals in whole or any part thereof', '* A concrete wrong answer: *'],
                  hint: 'Revisit c12_biotech_cbse_12_003 (IPR basics) for patentability criteria and c11_biotech_cbse_01_011.',
                  misconception: '**"All gene patents are banned in India because genes are \'products of nature\'."** Students repeatedly write this in board answers and.' },
                { id: 'b', prompt: 'Explain why an *isolated natural gene sequence* (e.g., the BRCA1 gene as it exists in the human body) is not patentable in India, but a *synthetic cDNA.', answer: '**Correct answer:** An isolated natural gene sequence is a "product of nature"',
                  options: ['**Correct answer:** An isolated natural gene sequence is a "product of nature"', '* A concrete wrong answer: *'],
                  hint: 'Revisit c12_biotech_cbse_12_003 (IPR basics) for patentability criteria and c11_biotech_cbse_01_011.',
                  misconception: '**"All gene patents are banned in India because genes are \'products of nature\'."** Students repeatedly write this in board answers and.' },
                { id: 'c', prompt: 'A biotech company files a patent application in India for: (A) A transgenic cotton plant expressing Bt toxin (B) The *cry1Ac* gene construct (promoter + coding.', answer: '**Correct answer:** (A) **Not patentable**',
                  options: ['**Correct answer:** (A) **Not patentable**', '* A concrete wrong answer: *'],
                  hint: 'Revisit c12_biotech_cbse_12_003 (IPR basics) for patentability criteria and c11_biotech_cbse_01_011.',
                  misconception: '**"All gene patents are banned in India because genes are \'products of nature\'."** Students repeatedly write this in board answers and.' },
                { id: 'd', prompt: 'Compare the Indian and US positions on patenting a *human embryonic stem cell (hESC) line* derived from a donated embryo.', answer: '**Correct answer:** **India:** Not patentable',
                  options: ['**Correct answer:** **India:** Not patentable', 'ethics', '* A concrete wrong answer: *', 'loses board marks'],
                  hint: 'Revisit c12_biotech_cbse_12_003 (IPR basics) for patentability criteria and c11_biotech_cbse_01_011.',
                  misconception: '**"All gene patents are banned in India because genes are \'products of nature\'."** Students repeatedly write this in board answers and.' }
          ],
            remediations: { 'all-gene-patents-are-banned': { steps: ['** Re-read Section 3(j) of the Patents Act 1970 (bare text) and the *Controller\'s Biotechnology Guidelines (2023)*.', '** Create a two-column table: **Column A = Excluded** (natural gene, plant variety, hESC line, essentially biological.', '** Take Diagnostic Question 3 again — write the justification for (A), (B), (C) *citing the exact statutory phrase*.', '** Re-attempt Diagnostic Question 5 — identify the three errors *with statute/case names*.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_12_005', difficulty: 'standard',
          question: 'The TRIPS Agreement (Trade-Related Aspects of Intellectual Property Rights).',
          hint: 'Revisit c12_biotech_cbse_12_003 (IPR: Patents in Biotech) and c11_biotech_cbse_01_011.',
          misconception: 'Students often believe TRIPS forces India to grant patents on all life forms (genes, plants, animals) exactly as the.',
          parts: [
                { id: 'a', prompt: 'What are the three core pillars of the TRIPS Agreement that every WTO member must implement in national law?', answer: 'The three pillars are: (1) Minimum Standards',
                  options: ['The three pillars are: (1) Minimum Standards', 'patents, copyrights, trademarks', 'explain', 'patents, copyrights, trademarks" as pillars'],
                  hint: 'Revisit c12_biotech_cbse_12_003 (IPR: Patents in Biotech) and c11_biotech_cbse_01_011 (IPR and.',
                  misconception: 'Students often believe TRIPS forces India to grant patents on all life forms (genes, plants, animals) exactly as the US/EU do.' },
                { id: 'b', prompt: 'An Indian generic company wants to export a patented anti-cancer drug to a least-developed country (LDC) with no manufacturing capacity under the TRIPS.', answer: 'Yes, export is permitted',
                  options: ['Yes, export is permitted', 'only domestic use allowed'],
                  hint: 'Revisit c12_biotech_cbse_12_003 (IPR: Patents in Biotech) and c11_biotech_cbse_01_011 (IPR and.',
                  misconception: 'Students often believe TRIPS forces India to grant patents on all life forms (genes, plants, animals) exactly as the US/EU do.' }
          ],
            remediations: { 'trips-forces-india-to-grant': { steps: ['If the student holds this misconception: (1) Have them re-read Article 27.3(b) text and map each clause to Section 3(j).', '(2) Ask them to list three things NOT patentable in India under Section 3(j) but patentable in the US (e.g., a plant.', '(3) Give a mini-case: "An Indian company isolates a drought-tolerance gene from a traditional rice landrace and inserts.', 'Can they patent: (i) the gene?'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_12_006', difficulty: 'standard',
          question: 'Biotechnology parks are specialized infrastructure zones established.',
          hint: 'Revisit c12_biotech_cbse_12_002 (Startup Ecosystem in Biotechnology) Section 2.3 "Funding.',
          misconception: 'Students equate "biotechnology park" with "science park" or "IT park" — assuming it is just buildings with lab benches.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Biotechnology parks are specialized infrastructure zones established by government or',
                  options: ['Biotechnology parks are specialized infrastructure zones established by government or', 'The biotechnology industry encompasses the commercial application of biological systems,', 'The startup ecosystem in biotechnology refers to the interconnected network of', 'A patent in biotechnology is an exclusive legal right granted by a government to an'],
                  hint: 'Revisit c12_biotech_cbse_12_002 (Startup Ecosystem in Biotechnology) Section 2.3 "Funding Stages.',
                  misconception: 'Students equate "biotechnology park" with "science park" or "IT park" — assuming it is just buildings with lab benches.' }
          ],
            remediations: { 'students-equate-biotechnology-park-with': { steps: ['If the student conflates biotech parks with generic science/IT parks: (1) Have them list the top 5 equipment items in.', '(2) Ask: "Which list requires IQ/OQ/PQ validation, environmental monitoring logs, and GMP changeover SOPs?" (3) Assign.', '(4) Re-diagnostic: "Explain why a diagnostic startup cannot use an IT park\'s \'lab space\' for CDSCO submission-grade.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
