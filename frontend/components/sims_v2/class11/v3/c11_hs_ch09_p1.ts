import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hs_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hs_ch09_p1: SimDef = {
    id: 'v3_c11_hs_ch09_p1',
    title: 'Meal Planning and Food Preparation · Part 1/2',
    subtitle: 'Dress for a wedding, a monsoon and a mountain — with one logic.',
    classLevel: 11, subject: 'home_science', topic: 'Meal Planning and Food Preparation · Part 1/2',
    chapters: ['c11_hs_ch09'],
    nodeIds: ['c11_hs_cbse_09_001', 'c11_hs_cbse_09_002', 'c11_hs_cbse_09_003', 'c11_hs_cbse_09_004', 'c11_hs_cbse_09_005', 'c11_hs_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a wardrobe planner balancing four functions at once', intro: 'Sherwani, Pashmina, juttis for a Delhi December wedding — decode why each choice earned its place.', goal: 'Apply the four clothing functions and the age-climate-occasion filters to real selection problems.' },
    discovery: {
        question: 'A bridal lehenga — modesty garment, protection garment, or status garment? Pick its function.',
        options: ['All four at once — coverage, warmth, zari-woven status and ornament; every garment multitasks and context picks the dominant one', 'Status — weddings are displays', 'Modesty — it\'s full-coverage', 'Adornment — it\'s decorative'],
        answer: 'All four at once — coverage, warmth, zari-woven status and ornament; every garment multitasks and context picks the dominant one',
        hook: 'Which is why \'one national uniform for all of India\' fails — the same cloth can\'t serve modesty norms in Srinagar, monsoon protection in Odisha and status-blindness everywhere.',
    },
    teaching: [
        { title: 'Functions of Clothing: Modesty, Protection, Status and Adornment', text: 'Clothing functions refer to the four fundamental purposes—modesty (socially defined body coverage norms), protection (shielding from environmental hazards and physical harm), status (signaling.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hs_cbse_09_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Spec a uniform for humid coastal Odisha across protection, modesty, status and adornment — then pack a Chennai 12-year-old for a Leh January exhibition.',
        labels: ['Functions of Clothing: Modesty,', 'Factors Affecting Clothing Selection', 'Children\'s Basic Clothing Needs'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hs_cbse_09_002', title: 'Factors Affecting Clothing Selection: Age, Climate and Occasion',
          caseStudy: { intro: 'Imagine you are packing for your 10-year-old cousin visiting Delhi in December for a wedding.',
            decisions: [{ prompt: 'List the three primary factors affecting clothing selection discussed in NCERT Section 9.2 and give one specific example of how each factor.', options: [
                { text: 'The three primary factors are Age, Climate/Season, and Occasion', outcome: 'The three primary factors are Age, Climate/Season, and Occasion.' },
                { text: 'fashion', outcome: 'Not quite — Students treat the three factors as independent checklists rather than interacting constraints.', reveals: 'students-treat-the-three-factors' },
                { text: 'income', outcome: 'Not quite — Students treat the three factors as independent checklists rather than interacting constraints.', reveals: 'students-treat-the-three-factors' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_09_003', title: 'Factors Affecting Clothing Selection: Fashion and Income',
          caseStudy: { intro: 'Imagine you are shopping for clothes with a fixed budget of ₹2000 for a festival.',
            decisions: [{ prompt: 'Define \'fashion\' and \'fad\' as per the NCERT Class 11 Home Science textbook, and give one example of each from current Indian youth culture.', options: [
                { text: 'Fashion is a style with contemporary mass appeal reflected in fabric, colour, design,', outcome: 'Fashion is a style with contemporary mass appeal reflected in fabric, colour, design, cut,.' },
                { text: 'fashion', outcome: 'Not quite — Students often think "fashion" and "fad" are synonyms, and that income only limits the *number*.', reveals: 'fashion-and-fad-are-synonyms' },
                { text: 'confuses fad with fashion (e', outcome: 'Not quite — Students often think "fashion" and "fad" are synonyms, and that income only limits the *number*.', reveals: 'fashion-and-fad-are-synonyms' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_09_004', title: 'Children\'s Basic Clothing Needs: Comfort and Safety',
          caseStudy: { intro: 'Imagine you are buying a winter jacket for a 3-year-old who loves to run around the playground.',
            decisions: [{ prompt: 'A parent buys a 2-year-old a sweater with a tight elasticated neckband because "it keeps the cold out." Which basic clothing need is most.', options: [
                { text: 'The basic need compromised is **comfort**, specifically the sub-need of unrestricted', outcome: 'The basic need compromised is **comfort**, specifically the sub-need of unrestricted circulation.' },
                { text: 'safety is compromised', outcome: 'Not quite — Students often believe that \'comfort\' and \'safety\' are separate, independent checklists.', reveals: 'comfort-and-safety-are-separate' },
                { text: '\'comfort\' and \'safety\' are separate, independent checklists', outcome: 'Not quite — Students often believe that \'comfort\' and \'safety\' are separate, independent checklists.', reveals: 'comfort-and-safety-are-separate' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_09_005', title: 'Children\'s Basic Clothing Needs: Self-Help Features and Growth Allowance',
          caseStudy: { intro: 'Imagine you\'re helping your 4-year-old cousin get ready for preschool — she struggles with the tiny buttons on her back-zip dress, trips on too-long sleeves.',
            decisions: [{ prompt: 'List the four essential self-help features NCERT specifies for children\'s clothing and the one fastener type explicitly discouraged for.', options: [
                { text: 'The four essential self-help features are: (1) large front openings, (2) large buttons', outcome: 'The four essential self-help features are: (1) large front openings, (2) large buttons graspable.' },
                { text: 'zippers', outcome: 'Not quite — Students believe "growth allowance" means buying garments 1-2 sizes larger.', reveals: 'growth-allowance-means-buying-garments' },
                { text: 'elastic waist', outcome: 'Not quite — Students believe "growth allowance" means buying garments 1-2 sizes larger.', reveals: 'growth-allowance-means-buying-garments' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_09_006', title: 'Children\'s Basic Clothing Needs: Easy Care and Fabric Selection',
          caseStudy: { intro: 'Imagine you are helping a parent choose between two identical-looking kurta sets for a 4-year-old: one is 100% cotton with plain seams and tiny buttons, the.',
            decisions: [{ prompt: 'A mother buys a 100% wool sweater for her 3-year-old because it is "warm and natural." According to NCERT guidelines, what is the primary.', options: [
                { text: 'Wool requires special care (often dry cleaning or hand washing), may irritate delicate', outcome: 'Wool requires special care (often dry cleaning or hand washing), may irritate delicate skin when.' },
                { text: 'wool is too heavy', outcome: 'Not quite — Students often think "easy care" means only "machine washable" or "no ironing," ignoring that the.', reveals: 'easy-care-means-only-machine' },
                { text: 'easy care', outcome: 'Not quite — Students often think "easy care" means only "machine washable" or "no ironing," ignoring that the.', reveals: 'easy-care-means-only-machine' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_hs_cbse_09_002', title: 'Identify each idea',
          dissect: { specimen: 'Meal Planning and Food Preparation · Part 1/2', spots: [
            { id: 's1', label: 'Factors Affecting Clothing Selection Fashion and Income', prompt: 'Which idea is this? — Fashion refers to a style or trend that gains widespread contemporary acceptance and.', answer: 'Factors Affecting Clothing Selection Fashion and Income', options: ['Factors Affecting Clothing Selection Fashion and Income', 'Childrens Basic Clothing Needs Comfort and Safety'] },
            { id: 's2', label: 'Childrens Basic Clothing Needs Comfort and Safety', prompt: 'Which idea is this? — Comfort in children\'s clothing refers to the physical ease provided by garments that.', answer: 'Childrens Basic Clothing Needs Comfort and Safety', options: ['Childrens Basic Clothing Needs Comfort and Safety', 'Factors Affecting Clothing Selection Fashion and Income'] }
          ] } },
        { type: 'case', nodeId: 'c11_hs_cbse_09_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Packing a 10-year-old cousin\'s bag for a December wedding in Delhi, your sibling sorts garments into single-function boxes — \'this shawl is protection, that lehenga is status, the kurta is modesty\' — and packs her a velvet lehenga \'because it\'s wedding-appropriate.\'',
            decisions: [{ prompt: 'What\'s wrong with both the sorting and the packing?', options: [
                { text: 'Synthesise instead of sorting: every garment serves modesty, protection, status and adornment simultaneously — the winter bridal lehenga covers, warms, signals and beautifies at once; dominance shifts by context. And selection factors interact: velvet suits climate and occasion but fails the age filter — an active 10-year-old needs play-friendly style and practical features, so no single filter can decide alone.', outcome: 'The bag gets repacked by intersection: age × climate × occasion together pick the garment, and no outfit is ever \'just\' one function.' },
                { text: 'Keep the single-function labels — each garment has one main purpose, that\'s how shops organise them.', outcome: 'Shop categories aren\'t the framework: the four functions co-exist in one garment — coverage, warmth, display and beauty in a single lehenga.', reveals: 'one-function-per-garment' },
                { text: 'Keep the lehenga — occasion is the top factor for a wedding, other filters are secondary.', outcome: 'Occasion without age fails in practice: the outfit restricts an active child through long rituals — the filters are simultaneous constraints, not a hierarchy.', reveals: 'occasion-trumps-all-filters' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'Age, climate, occasion — the three filters interact, and a garment that wins two can still fail the third.',
            decisions: [{ prompt: 'What comes next? Meal Planning and Food Preparation · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Meal Planning and Food Preparation · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hs_cbse_09_001', difficulty: 'standard',
          question: 'Clothing functions refer to the four fundamental purposes—modesty (socially.',
          hint: 'Revisit c6_civics_ch14_031 (Cultural Diversity: Food, Dress, Festivals, Customs) and.',
          misconception: 'Students often treat the four functions as mutually exclusive categories—e.g., "This is a protection garment, that is.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Clothing functions refer to the four fundamental purposes—modesty (socially defined body',
                  options: ['Clothing functions refer to the four fundamental purposes—modesty (socially defined body', 'Factors affecting clothing selection refer to the interrelated variables—primarily age,', 'Fashion refers to a style or trend that gains widespread contemporary acceptance and is', 'Comfort in children\'s clothing refers to the physical ease provided by garments that'],
                  hint: 'Revisit c6_civics_ch14_031 (Cultural Diversity: Food, Dress, Festivals, Customs) and identify three.',
                  misconception: 'Students often treat the four functions as mutually exclusive categories—e.g., "This is a protection garment, that is a status garment.".' }
          ],
            remediations: { 'students-often-treat-the-four': { steps: ['If a student categorises garments into single functions: (1) Give them a familiar garment (their school uniform) and.', 'Or does it also cover your body (modesty), survive playground falls (protection), and have a colour/design chosen for.', 'When you wear the same raincoat to a fashion show as \'streetwear,\' adornment/status dominate.', 'The garment didn\'t change—the *context* did." This shifts thinking from object-properties to context-dependent.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_09_002', difficulty: 'standard',
          question: 'Factors affecting clothing selection refer to the interrelated.',
          hint: 'Revisit c11_hs_cbse_09_001 and create a two-column map: Function → Measurable Garment.',
          misconception: 'Students treat the three factors as independent checklists rather than interacting constraints.',
          parts: [
                { id: 'a', prompt: 'List the three primary factors affecting clothing selection discussed in NCERT Section 9.2 and give one specific example of how each factor influences fabric.', answer: 'The three primary factors are Age, Climate/Season, and Occasion',
                  options: ['The three primary factors are Age, Climate/Season, and Occasion', 'fashion', 'income', 'comfortable clothes'],
                  hint: 'Revisit c11_hs_cbse_09_001 and create a two-column map: Function → Measurable Garment Attribute.',
                  misconception: 'Students treat the three factors as independent checklists rather than interacting constraints.' }
          ],
            remediations: { 'students-treat-the-three-factors': { steps: ['Have the student pick one real child (age, location, upcoming event) and fill a 3×3 matrix: rows.', 'Force them to write one specific entry per cell (e.g., Age×Fabric = "cotton knit").', 'Then ask: "If you change only the occasion from school to wedding, which cells must change and why?" This makes.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_09_003', difficulty: 'standard',
          question: 'Fashion refers to a style or trend that gains widespread contemporary.',
          hint: 'Revisit c11_hs_cbse_09_001 (functions) and c11_hs_cbse_09_002 (age/climate factors).',
          misconception: 'Students often think "fashion" and "fad" are synonyms, and that income only limits the *number* of clothes bought.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how income affects clothing selection beyond just the initial purchase price, using the concepts of durability, maintenance, and.', answer: 'Income influences not only what can be bought initially but also the quality and',
                  options: ['Income influences not only what can be bought initially but also the quality and', 'buying cheaper clothes', 'fashion'],
                  hint: 'Revisit c11_hs_cbse_09_001 (functions) and c11_hs_cbse_09_002 (age/climate factors) to rebuild the.',
                  misconception: 'Students often think "fashion" and "fad" are synonyms, and that income only limits the *number* of clothes bought.' },
                { id: 'b', prompt: 'A family of four (two adults, two children aged 8 and 5) has a monthly clothing budget of ₹3000.', answer: 'Step 1: Identify fixed needs',
                  options: ['Step 1: Identify fixed needs', 'fashion'],
                  hint: 'Revisit c11_hs_cbse_09_001 (functions) and c11_hs_cbse_09_002 (age/climate factors) to rebuild the.',
                  misconception: 'Students often think "fashion" and "fad" are synonyms, and that income only limits the *number* of clothes bought.' },
                { id: 'c', prompt: 'Compare and contrast how fashion influence differs between a preschool child (age 4) and an adolescent (age 15) in an Indian middle-class family.', answer: 'Preschoolers: fashion influence is mediated by parents',
                  options: ['Preschoolers: fashion influence is mediated by parents', 'both are influenced by TV', 'fashion'],
                  hint: 'Revisit c11_hs_cbse_09_001 (functions) and c11_hs_cbse_09_002 (age/climate factors) to rebuild the.',
                  misconception: 'Students often think "fashion" and "fad" are synonyms, and that income only limits the *number* of clothes bought.' }
          ],
            remediations: { 'fashion-and-fad-are-synonyms': { steps: ['Have the student create a two-column table: "Fashion" vs "Fad" with textbook definitions, duration, reach, and Indian.', 'Give a list of 10 current trends (e.g., mom jeans, neon nails, kurta with jacket, temporary tattoos) and ask them.', 'For income, use a "garment lifecycle cost" worksheet: calculate total cost (purchase + detergent + ironing + repairs.', 'Discuss how hand-me-downs change the cost-per-wear for younger siblings.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_09_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "fashion" and "fad" are synonyms, and that income only limits the *number* of clothes bought.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "School uniforms eliminate the impact of income on clothing selection among students." Use textbook evidence and real-world Indian.', answer: 'The statement is partially true but incomplete',
                  options: ['The statement is partially true but incomplete', 'de-emphasise', 'eliminate', 'fashion'],
                  hint: 'Revisit c11_hs_cbse_09_001 (functions) and c11_hs_cbse_09_002 (age/climate factors) to rebuild the.',
                  misconception: 'Students often think "fashion" and "fad" are synonyms, and that income only limits the *number* of clothes bought.' }
          ],
            remediations: { 'fashion-and-fad-are-synonyms': { steps: ['Have the student create a two-column table: "Fashion" vs "Fad" with textbook definitions, duration, reach, and Indian.', 'Give a list of 10 current trends (e.g., mom jeans, neon nails, kurta with jacket, temporary tattoos) and ask them.', 'For income, use a "garment lifecycle cost" worksheet: calculate total cost (purchase + detergent + ironing + repairs.', 'Discuss how hand-me-downs change the cost-per-wear for younger siblings.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_09_004', difficulty: 'standard',
          question: 'Comfort in children\'s clothing refers to the physical ease provided by garments.',
          hint: 'Review the \'Protection\' function in c11_hs_cbse_09_001 and \'Age\' factor.',
          misconception: 'Students often believe that \'comfort\' and \'safety\' are separate, independent checklists.',
          parts: [
                { id: 'a', prompt: 'Compare the safety implications of \'bright colour\' versus \'reflective strips\' on a child\'s outerwear for a 6-year-old walking to school in winter mornings.', answer: 'Bright colours (e.g., fluorescent yellow, orange) enhance daytime visibility by',
                  options: ['Bright colours (e.g., fluorescent yellow, orange) enhance daytime visibility by', 'reflective strips are always better', '\'comfort\' and \'safety\' are separate, independent checklists'],
                  hint: 'Review the \'Protection\' function in c11_hs_cbse_09_001 and \'Age\' factor in c11_hs_cbse_09_002.',
                  misconception: 'Students often believe that \'comfort\' and \'safety\' are separate, independent checklists.' }
          ],
            remediations: { 'comfort-and-safety-are-separate': { steps: ['If a student exhibits this misconception, use a \'dual-lens analysis\' activity: Take a single garment (e.g., a toddler\'s.', 'For each feature, ask: "How does this affect the child\'s physical ease?', 'How does this affect the child\'s risk of injury?" Then ask: "If we modify this feature for more comfort, does safety.', 'If we modify for more safety, does comfort increase or decrease?" This forces integration.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_09_005', difficulty: 'standard',
          question: 'Self-help features in children\'s clothing are design elements (large front.',
          hint: 'Revisit c11_hs_cbse_09_004 (Comfort and Safety) — specifically the "sufficient ease.',
          misconception: 'Students believe "growth allowance" means buying garments 1-2 sizes larger.',
          parts: [
                { id: 'a', prompt: 'Compare raglan sleeves vs. set-in sleeves for a 7-year-old\'s school uniform across four dimensions: shoulder mobility, growth accommodation, ease.', answer: 'Raglan sleeves: (1) Superior shoulder mobility',
                  options: ['Raglan sleeves: (1) Superior shoulder mobility', 'growth allowance', 'For a 5-year-old, buy Size 8 so it lasts two years', '"growth allowance" means buying garments 1-2 sizes larger'],
                  hint: 'Revisit c11_hs_cbse_09_004 (Comfort and Safety) — specifically the "sufficient ease in crotch" and.',
                  misconception: 'Students believe "growth allowance" means buying garments 1-2 sizes larger.' }
          ],
            remediations: { 'growth-allowance-means-buying-garments': { steps: ['Have the student physically try on an oversized shirt (2 sizes up) and perform three tasks — touch toes, raise arms.', 'Compare with a correctly sized shirt having 5 cm hem cuff and raglan sleeves — repeat tasks.', 'Map each discomfort to NCERT\'s specific warnings (tripping = safety, restricted arms = comfort, neck strain = poor.', 'Redesign the oversized shirt by pinning hem cuff, adding shoulder tucks, converting to front opening — demonstrate that.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_09_006', difficulty: 'standard',
          question: 'Easy care in children\'s clothing refers to garments that require minimal.',
          hint: 'Revisit Class 11 Chapter 7 (Textile Science) notes on "Fibre to Fabric" focusing on the.',
          misconception: 'Students often think "easy care" means only "machine washable" or "no ironing," ignoring that the NCERT defines it as.',
          parts: [
                { id: 'a', prompt: 'Explain why printed fabrics, corduroy, and textured fabrics are recommended for children\'s clothing in the textbook, linking each to a specific easy-care.', answer: 'Printed fabrics hide stains and soil visually',
                  options: ['Printed fabrics hide stains and soil visually', 'they look nice', 'easy care', 'machine washable'],
                  hint: 'Revisit Class 11 Chapter 7 (Textile Science) notes on "Fibre to Fabric" focusing on the table.',
                  misconception: 'Students often think "easy care" means only "machine washable" or "no ironing," ignoring that the NCERT defines it as a system: fabric.' },
                { id: 'b', prompt: 'A preschool\'s uniform policy requires shirts with "flat seams" and "reinforced elbows." A supplier offers two samples: Sample A has plain seams and.', answer: 'Sample B meets the policy',
                  options: ['Sample B meets the policy', 'easy care', 'machine washable', 'no ironing'],
                  hint: 'Revisit Class 11 Chapter 7 (Textile Science) notes on "Fibre to Fabric" focusing on the table.',
                  misconception: 'Students often think "easy care" means only "machine washable" or "no ironing," ignoring that the NCERT defines it as a system: fabric.' },
                { id: 'c', prompt: 'Compare a 100% polyester track pant and a 65/35 cotton-polyester blend track pant for a 7-year-old\'s daily school wear in a humid Indian climate.', answer: 'The cotton-polyester blend is better',
                  options: ['The cotton-polyester blend is better', 'showing failure to weigh trade-offs', 'means only', 'no ironing'],
                  hint: 'Revisit Class 11 Chapter 7 (Textile Science) notes on "Fibre to Fabric" focusing on the table.',
                  misconception: 'Students often think "easy care" means only "machine washable" or "no ironing," ignoring that the NCERT defines it as a system: fabric.' }
          ],
            remediations: { 'easy-care-means-only-machine': { steps: ['If a student reduces easy care to a single attribute, guide them through a "day in the life" trace: list 5 soiling.', 'Then map each event to a specific fabric/construction feature from the textbook (e.g., grass stain -> printed fabric.', 'This forces multi-factor reasoning.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
