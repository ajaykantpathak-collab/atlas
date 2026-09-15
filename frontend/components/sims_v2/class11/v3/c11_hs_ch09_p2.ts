import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hs_ch09_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hs_ch09_p2: SimDef = {
    id: 'v3_c11_hs_ch09_p2',
    title: 'Meal Planning and Food Preparation · Part 2/2',
    subtitle: 'Dress for a wedding, a monsoon and a mountain — with one logic.',
    classLevel: 11, subject: 'home_science', topic: 'Meal Planning and Food Preparation · Part 2/2',
    chapters: ['c11_hs_ch09'],
    nodeIds: ['c11_hs_cbse_09_007', 'c11_hs_cbse_09_008', 'c11_hs_cbse_09_009', 'c11_hs_cbse_09_010', 'c11_hs_cbse_09_011', 'c11_hs_cbse_09_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a wardrobe planner balancing four functions at once', intro: 'Sherwani, Pashmina, juttis for a Delhi December wedding — decode why each choice earned its place.', goal: 'Apply the four clothing functions and the age-climate-occasion filters to real selection problems.' },
    discovery: {
        question: 'A bridal lehenga — modesty garment, protection garment, or status garment? Pick its function.',
        options: ['All four at once — coverage, warmth, zari-woven status and ornament; every garment multitasks and context picks the dominant one', 'Status — weddings are displays', 'Modesty — it\'s full-coverage', 'Adornment — it\'s decorative'],
        answer: 'All four at once — coverage, warmth, zari-woven status and ornament; every garment multitasks and context picks the dominant one',
        hook: 'Which is why \'one national uniform for all of India\' fails — the same cloth can\'t serve modesty norms in Srinagar, monsoon protection in Odisha and status-blindness everywhere.',
    },
    teaching: [
        { title: 'Clothing Requirements at Infancy: Birth to Six Months', text: 'Clothing requirements for infancy (birth to six months) refer to the specific garment types, fabric properties, design features, and safety considerations essential for newborns whose primary.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hs_cbse_09_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Spec a uniform for humid coastal Odisha across protection, modesty, status and adornment — then pack a Chennai 12-year-old for a Leh January exhibition.',
        labels: ['Clothing Requirements at Infancy', 'Clothing Requirements at Creeping', 'Clothing Requirements at Preschool', 'Clothing Requirements at Elementary', 'Clothing Requirements at Adolescence', 'Clothing for Children with'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hs_cbse_09_007', title: 'Clothing Requirements at Infancy: Birth to Six Months',
          caseStudy: { intro: 'Imagine you are helping a new parent pack a hospital bag for their newborn\'s first week at home in Delhi in January — what specific garments would you include.',
            decisions: [{ prompt: 'A mother dresses her 2-month-old in a knitted wool sweater with a narrow neckline that must be pulled over the head, secured with.', options: [
                { text: 'Correct answer: (1) Pullover design requires pulling over head', outcome: 'Correct answer: (1) Pullover design requires pulling over head — difficult for infant with poor.' },
                { text: 'wool is warm', outcome: 'Not quite — Students believe "soft fabric" alone defines infant clothing quality, overlooking that design.', reveals: 'soft-fabric-alone-defines-infant' },
                { text: 'soft fabric', outcome: 'Not quite — Students believe "soft fabric" alone defines infant clothing quality, overlooking that design.', reveals: 'soft-fabric-alone-defines-infant' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_09_008', title: 'Clothing Requirements at Creeping Age and Toddlerhood',
          caseStudy: { intro: 'Imagine you are helping a parent choose between two rompers for their 9-month-old who has just started pulling up on furniture: one has a tight set-in sleeve.',
            decisions: [{ prompt: 'A parent buys a knitted romper with a back zipper and set-in sleeves for their 8-month-old who is actively crawling and pulling to stand.', options: [
                { text: 'The back zipper is the most inappropriate feature', outcome: 'The back zipper is the most inappropriate feature because it prevents the child from practicing.' },
                { text: 'larger size = longer wear = better value', outcome: 'Not quite — Students often believe "larger size = longer wear = better value" for toddler clothing, leading.', reveals: 'larger-size-longer-wear-better' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_09_009', title: 'Clothing Requirements at Preschool Age: Two to Six Years',
          caseStudy: { intro: 'Imagine you are helping a parent choose a wardrobe for their 4-year-old daughter starting preschool in Delhi in July.',
            decisions: [{ prompt: 'List the six core clothing needs of children as identified in the NCERT textbook for Class 11 Home Science.', options: [
                { text: 'The six core clothing needs are: Comfort, Safety, Self-help, Appearance, Allowance for', outcome: 'The six core clothing needs are: Comfort, Safety, Self-help, Appearance, Allowance for growth, and.' },
                { text: 'fashion', outcome: 'Not quite — Students often believe "preschool clothing is just smaller versions of elementary school uniforms".', reveals: 'preschool-clothing-is-just-smaller' },
                { text: 'preschool clothing is just smaller versions of elementary school uniforms', outcome: 'Not quite — Students often believe "preschool clothing is just smaller versions of elementary school uniforms".', reveals: 'preschool-clothing-is-just-smaller' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_09_010', title: 'Clothing Requirements at Elementary School Years',
          caseStudy: { intro: 'Imagine you are helping a parent choose a wardrobe for an 8‑year‑old who plays cricket after school, insists on picking his own clothes, and grows quickly.',
            decisions: [{ prompt: 'What are the two most important fabric properties for elementary school children\'s sportswear, according to the NCERT textbook?', options: [
                { text: 'The two most important fabric properties are absorbency (to absorb perspiration) and ease', outcome: 'The two most important fabric properties are absorbency (to absorb perspiration) and ease.' },
                { text: 'warmth and waterproofing', outcome: 'Not quite — Students often believe that elementary school children\'s clothing is simply "smaller adult clothes".', reveals: 'elementary-school-children-s-clothing' },
                { text: 'smaller adult clothes', outcome: 'Not quite — Students often believe that elementary school children\'s clothing is simply "smaller adult clothes".', reveals: 'elementary-school-children-s-clothing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_09_011', title: 'Clothing Requirements at Adolescence: Eleven to Eighteen Years',
          caseStudy: { intro: 'Imagine a 14-year-old who refuses to wear the cotton kurta you bought because "nobody wears that anymore" and insists on a synthetic-blend hoodie for winter.',
            decisions: [{ prompt: 'A 13-year-old girl has grown 8 cm in height over 6 months. Her mother buys her three expensive formal dresses for a wedding season.', options: [
                { text: 'The primary principle violated is **minimal wardrobe planning due to rapid, asynchronous', outcome: 'The primary principle violated is **minimal wardrobe planning due to rapid, asynchronous growth**.' },
                { text: 'wrong fabric choice', outcome: 'Not quite — **Misconception:** "Adolescents just want fashionable clothes; comfort and fabric quality don\'t.', reveals: 'misconception-adolescents-just-want-fashionable' },
                { text: 'poor stitching', outcome: 'Not quite — **Misconception:** "Adolescents just want fashionable clothes; comfort and fabric quality don\'t.', reveals: 'misconception-adolescents-just-want-fashionable' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_09_012', title: 'Clothing for Children with Special Needs',
          caseStudy: { intro: 'Imagine a parent trying to dress a 7‑year‑old with cerebral palsy who uses a wheelchair and has stiff legs and poor hand coordination — every morning is.',
            decisions: [{ prompt: 'State the three primary fabric recommendations from the NCERT for children with special needs in summer and winter, and name one fastener.', options: [
                { text: 'Summer: cotton; winter: velvet, corduroy, cotswool', outcome: 'Summer: cotton; winter: velvet, corduroy, cotswool. Fastener: velcro or zipper with key chain.' },
                { text: 'polyester for summer, wool for winter, buttons', outcome: 'Not quite — Students often believe “clothing for special needs” simply means buying larger sizes.', reveals: 'clothing-for-special-needs-simply' },
                { text: 'clothing for special needs', outcome: 'Not quite — Students often believe “clothing for special needs” simply means buying larger sizes.', reveals: 'clothing-for-special-needs-simply' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_hs_cbse_09_008', title: 'Identify each idea',
          dissect: { specimen: 'Meal Planning and Food Preparation · Part 2/2', spots: [
            { id: 's1', label: 'Clothing Requirements at Infancy Birth to Six Months', prompt: 'Which idea is this? — Clothing requirements for infancy (birth to six months) refer to the specific garment.', answer: 'Clothing Requirements at Infancy Birth to Six Months', options: ['Clothing Requirements at Infancy Birth to Six Months', 'Clothing Requirements at Creeping Age and Toddlerhood', 'Clothing Requirements at Preschool Age Two to Six Years', 'Clothing Requirements at Elementary School Years'] },
            { id: 's2', label: 'Clothing Requirements at Creeping Age and Toddlerhood', prompt: 'Which idea is this? — Creeping age (6–12 months) and toddlerhood (1–2 years) are sequential developmental.', answer: 'Clothing Requirements at Creeping Age and Toddlerhood', options: ['Clothing Requirements at Creeping Age and Toddlerhood', 'Clothing Requirements at Infancy Birth to Six Months', 'Clothing Requirements at Preschool Age Two to Six Years', 'Clothing Requirements at Elementary School Years'] },
            { id: 's3', label: 'Clothing Requirements at Preschool Age Two to Six Years', prompt: 'Which idea is this? — Clothing requirements for preschool children (2–6 years) refer to the specific garment.', answer: 'Clothing Requirements at Preschool Age Two to Six Years', options: ['Clothing Requirements at Preschool Age Two to Six Years', 'Clothing Requirements at Infancy Birth to Six Months', 'Clothing Requirements at Creeping Age and Toddlerhood', 'Clothing Requirements at Elementary School Years'] },
            { id: 's4', label: 'Clothing Requirements at Elementary School Years', prompt: 'Which idea is this? — Clothing requirements for elementary school years (ages 6–11) refer to the specific.', answer: 'Clothing Requirements at Elementary School Years', options: ['Clothing Requirements at Elementary School Years', 'Clothing Requirements at Infancy Birth to Six Months', 'Clothing Requirements at Creeping Age and Toddlerhood', 'Clothing Requirements at Preschool Age Two to Six Years'] },
            { id: 's5', label: 'Clothing for Children with Special Needs', prompt: 'Which idea is this? — Clothing for children with special needs refers to garments specifically designed.', answer: 'Clothing for Children with Special Needs', options: ['Clothing for Children with Special Needs', 'Clothing Requirements at Infancy Birth to Six Months', 'Clothing Requirements at Creeping Age and Toddlerhood', 'Clothing Requirements at Preschool Age Two to Six Years'] }
          ] } },
        { type: 'case', nodeId: 'c11_hs_cbse_09_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Packing a 10-year-old cousin\'s bag for a December wedding in Delhi, your sibling sorts garments into single-function boxes — \'this shawl is protection, that lehenga is status, the kurta is modesty\' — and packs her a velvet lehenga \'because it\'s wedding-appropriate.\'',
            decisions: [{ prompt: 'What\'s wrong with both the sorting and the packing?', options: [
                { text: 'Synthesise instead of sorting: every garment serves modesty, protection, status and adornment simultaneously — the winter bridal lehenga covers, warms, signals and beautifies at once; dominance shifts by context. And selection factors interact: velvet suits climate and occasion but fails the age filter — an active 10-year-old needs play-friendly style and practical features, so no single filter can decide alone.', outcome: 'The bag gets repacked by intersection: age × climate × occasion together pick the garment, and no outfit is ever \'just\' one function.' },
                { text: 'Keep the single-function labels — each garment has one main purpose, that\'s how shops organise them.', outcome: 'Shop categories aren\'t the framework: the four functions co-exist in one garment — coverage, warmth, display and beauty in a single lehenga.', reveals: 'one-function-per-garment' },
                { text: 'Keep the lehenga — occasion is the top factor for a wedding, other filters are secondary.', outcome: 'Occasion without age fails in practice: the outfit restricts an active child through long rituals — the filters are simultaneous constraints, not a hierarchy.', reveals: 'occasion-trumps-all-filters' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_09_012', title: 'You made it',
          caseStudy: { intro: 'Age, climate, occasion — the three filters interact, and a garment that wins two can still fail the third.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hs_cbse_09_007', difficulty: 'standard',
          question: 'Clothing requirements for infancy (birth to six months) refer to the specific.',
          hint: 'Revisit c11_hs_cbse_09_004 (comfort/safety) and c11_hs_cbse_09_006 (easy care/fabrics).',
          misconception: 'Students believe "soft fabric" alone defines infant clothing quality, overlooking that design geometry (neckline.',
          parts: [
                { id: 'a', prompt: 'A mother dresses her 2-month-old in a knitted wool sweater with a narrow neckline that must be pulled over the head, secured with a drawstring at the neck.', answer: 'Correct answer: (1) Pullover design requires pulling over head',
                  options: ['Correct answer: (1) Pullover design requires pulling over head', 'wool is warm', 'soft fabric'],
                  hint: 'Revisit c11_hs_cbse_09_004 (comfort/safety) and c11_hs_cbse_09_006 (easy care/fabrics).',
                  misconception: 'Students believe "soft fabric" alone defines infant clothing quality, overlooking that design geometry (neckline circumference, crotch.' },
                { id: 'b', prompt: 'A family in rural Rajasthan uses softened, washed old cotton sarees to make infant diapers and undershirts.', answer: 'Correct answer: Meets criteria IF',
                  options: ['Correct answer: Meets criteria IF', 'unhygienic', 'outdated', 'soft fabric'],
                  hint: 'Revisit c11_hs_cbse_09_004 (comfort/safety) and c11_hs_cbse_09_006 (easy care/fabrics).',
                  misconception: 'Students believe "soft fabric" alone defines infant clothing quality, overlooking that design geometry (neckline circumference, crotch.' },
                { id: 'c', prompt: 'Compare the thermal management strategy for a 1-month-old in a Mumbai monsoon (humid, 28°C) versus a Delhi winter (dry, 8°C).', answer: 'Correct answer: Mumbai',
                  options: ['Correct answer: Mumbai', 'wool sweater in both', 'same layers', 'soft fabric'],
                  hint: 'Revisit c11_hs_cbse_09_004 (comfort/safety) and c11_hs_cbse_09_006 (easy care/fabrics).',
                  misconception: 'Students believe "soft fabric" alone defines infant clothing quality, overlooking that design geometry (neckline circumference, crotch.' }
          ],
            remediations: { 'soft-fabric-alone-defines-infant': { steps: ['If the student equates infant clothing with "soft fabrics," guide them through a tactile audit: take three garments.', 'Have them simulate dressing a doll with poor head control.', 'They will observe (a) requires forceful head pulling, (b) lays flat and wraps around, (c) snags on ears/nose.', 'Then ask: "Which garment caused least distress to the \'infant\'?" This concrete comparison forces recognition that.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_09_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "soft fabric" alone defines infant clothing quality, overlooking that design geometry (neckline.',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "Since infants grow rapidly, parents should buy clothes two sizes larger to save money and reduce shopping frequency."', answer: 'Correct answer: Unsafe and uncomfortable',
                  options: ['Correct answer: Unsafe and uncomfortable', 'growth allowance', 'buying large', 'soft fabric'],
                  hint: 'Revisit c11_hs_cbse_09_004 (comfort/safety) and c11_hs_cbse_09_006 (easy care/fabrics).',
                  misconception: 'Students believe "soft fabric" alone defines infant clothing quality, overlooking that design geometry (neckline circumference, crotch.' },
                { id: 'b', prompt: 'Design a 7-piece "starter wardrobe" for a 3 kg newborn in late October in Kolkata (transitioning from monsoon to winter, 22–28°C).', answer: 'Expected answer: (1) 4 cotton undershirts (front snap, raglan sleeves)',
                  options: ['Expected answer: (1) 4 cotton undershirts (front snap, raglan sleeves)', 'soft fabric'],
                  hint: 'Revisit c11_hs_cbse_09_004 (comfort/safety) and c11_hs_cbse_09_006 (easy care/fabrics).',
                  misconception: 'Students believe "soft fabric" alone defines infant clothing quality, overlooking that design geometry (neckline circumference, crotch.' }
          ],
            remediations: { 'soft-fabric-alone-defines-infant': { steps: ['If the student equates infant clothing with "soft fabrics," guide them through a tactile audit: take three garments.', 'Have them simulate dressing a doll with poor head control.', 'They will observe (a) requires forceful head pulling, (b) lays flat and wraps around, (c) snags on ears/nose.', 'Then ask: "Which garment caused least distress to the \'infant\'?" This concrete comparison forces recognition that.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_09_008', difficulty: 'standard',
          question: 'Creeping age (6–12 months) and toddlerhood (1–2 years) are sequential.',
          hint: 'Review the motor development chart in c7_bio_ch01_001 and physically enact each milestone.',
          misconception: 'Students often believe "larger size = longer wear = better value" for toddler clothing, leading them to recommend.',
          parts: [
                { id: 'a', prompt: 'A parent buys a knitted romper with a back zipper and set-in sleeves for their 8-month-old who is actively crawling and pulling to stand.', answer: 'The back zipper is the most inappropriate feature',
                  options: ['The back zipper is the most inappropriate feature', 'larger size = longer wear = better value'],
                  hint: 'Review the motor development chart in c7_bio_ch01_001 and physically enact each milestone (crawl.',
                  misconception: 'Students often believe "larger size = longer wear = better value" for toddler clothing, leading them to recommend oversized garments with.' },
                { id: 'b', prompt: 'Compare the crotch design requirements of a romper for a 9-month-old crawler versus overalls for a 24-month-old walker.', answer: 'At 9 months, the priority is unrestricted hip abduction for crawling',
                  options: ['At 9 months, the priority is unrestricted hip abduction for crawling', 'loose fit', 'larger size = longer wear = better value'],
                  hint: 'Review the motor development chart in c7_bio_ch01_001 and physically enact each milestone (crawl.',
                  misconception: 'Students often believe "larger size = longer wear = better value" for toddler clothing, leading them to recommend oversized garments with.' }
          ],
            remediations: { 'larger-size-longer-wear-better': { steps: ['If a student recommends oversized clothing, have them physically simulate a toddler\'s gait: walk across the room with.', 'Ask them to note tripping frequency and hip abduction angle.', 'Then show a video of a 15-month-old in well-fitted vs.', 'oversized overalls attempting to climb a slide ladder.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_09_009', difficulty: 'standard',
          question: 'Clothing requirements for preschool children (2–6 years) refer to the specific.',
          hint: 'Revisit c11_hs_cbse_09_004, c11_hs_cbse_09_005, c11_hs_cbse_09_006 and create.',
          misconception: 'Students often believe "preschool clothing is just smaller versions of elementary school uniforms" and therefore.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Clothing requirements for preschool children (2–6 years) refer to the specific garment',
                  options: ['Clothing requirements for preschool children (2–6 years) refer to the specific garment', 'Clothing functions refer to the four fundamental purposes—modesty (socially defined body', 'Factors affecting clothing selection refer to the interrelated variables—primarily age,', 'Fashion refers to a style or trend that gains widespread contemporary acceptance and is'],
                  hint: 'Revisit c11_hs_cbse_09_004, c11_hs_cbse_09_005, c11_hs_cbse_09_006 and create a comparison table.',
                  misconception: 'Students often believe "preschool clothing is just smaller versions of elementary school uniforms" and therefore prioritize *durability and.' }
          ],
            remediations: { 'preschool-clothing-is-just-smaller': { steps: ['If a student designs or selects preschool clothing without self-help features or growth allowance: 1) Have them.', '2) Ask them to calculate how many times a ₹500 frock with no growth tucks must be replaced in 12 months for a child.', 'a ₹650 frock with 4 cm hem cuff and adjustable straps.', '3) Show a video of a preschooler struggling with buttons vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_09_010', difficulty: 'standard',
          question: 'Clothing requirements for elementary school years (ages 6–11) refer to the.',
          hint: 'If stuck, revisit node c11_hs_cbse_09_009 (Preschool Age) and node c11_hs_cbse_09_003.',
          misconception: 'Students often believe that elementary school children\'s clothing is simply "smaller adult clothes" and that peer.',
          parts: [
                { id: 'a', prompt: 'Explain why "peer acceptance" becomes a clothing requirement during elementary school years but is not emphasized for toddlers.', answer: 'During elementary years, children\'s social circle expands beyond family',
                  options: ['During elementary years, children\'s social circle expands beyond family', 'toddlers don\'t care about clothes', 'smaller adult clothes'],
                  hint: 'If stuck, revisit node c11_hs_cbse_09_009 (Preschool Age) and node c11_hs_cbse_09_003 (Fashion).',
                  misconception: 'Students often believe that elementary school children\'s clothing is simply "smaller adult clothes" and that peer influence only starts.' },
                { id: 'b', prompt: 'A mother buys a beautiful but delicate silk kurta for her 7‑year‑old son to wear for daily school.', answer: 'The silk kurta fails on: (1) durability',
                  options: ['The silk kurta fails on: (1) durability', 'silk is for parties', 'smaller adult clothes'],
                  hint: 'If stuck, revisit node c11_hs_cbse_09_009 (Preschool Age) and node c11_hs_cbse_09_003 (Fashion).',
                  misconception: 'Students often believe that elementary school children\'s clothing is simply "smaller adult clothes" and that peer influence only starts.' },
                { id: 'c', prompt: 'Compare the "growth allowance" features needed for a 6‑year‑old\'s trousers versus an 11‑year‑old\'s trousers. How do the design details differ and why?', answer: 'At age 6, growth is steadier but still rapid',
                  options: ['At age 6, growth is steadier but still rapid', 'smaller adult clothes'],
                  hint: 'If stuck, revisit node c11_hs_cbse_09_009 (Preschool Age) and node c11_hs_cbse_09_003 (Fashion).',
                  misconception: 'Students often believe that elementary school children\'s clothing is simply "smaller adult clothes" and that peer influence only starts.' }
          ],
            remediations: { 'elementary-school-children-s-clothing': { steps: ['If a student shows this misconception, first ask them to observe a group of 7‑year‑olds at play for 10 minutes and.', 'Then have them compare those observations with the features of the "adult‑style" garment they proposed.', 'Finally, guide them to rewrite the garment specification using the textbook\'s list of requirements (comfort, safety.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_09_011', difficulty: 'standard',
          question: 'Clothing requirements at adolescence (11-18 years) refer to the specific.',
          hint: 'Revisit Class 10 Biology nodes c10_bio_cbse_02_008-011 (hormones) and Class 7 Biology.',
          misconception: '**Misconception:** "Adolescents just want fashionable clothes; comfort and fabric quality don\'t matter to them." **Why.',
          parts: [
                { id: 'a', prompt: 'A school mandates polyester-blazer uniforms for winter. Students complain of overheating in heated classrooms and sweat rashes.', answer: '**Base layer (next to skin):** 100% cotton or cotton-modal blend',
                  options: ['**Base layer (next to skin):** 100% cotton or cotton-modal blend', 'wear cotton under the blazer', 'Buy the polyester hoodie'],
                  hint: 'Revisit Class 10 Biology nodes c10_bio_cbse_02_008-011 (hormones) and Class 7 Biology.',
                  misconception: '**Misconception:** "Adolescents just want fashionable clothes; comfort and fabric quality don\'t matter to them." **Why it\'s wrong:** This.' },
                { id: 'b', prompt: 'Compare the clothing decision-making process for a 9-year-old (elementary) vs.', answer: '| Dimension | 9-year-old (Elementary) | 15-year-old (Adolescence) |',
                  options: ['| Dimension | 9-year-old (Elementary) | 15-year-old (Adolescence) |', 'comfort', 'Buy the polyester hoodie'],
                  hint: 'Revisit Class 10 Biology nodes c10_bio_cbse_02_008-011 (hormones) and Class 7 Biology.',
                  misconception: '**Misconception:** "Adolescents just want fashionable clothes; comfort and fabric quality don\'t matter to them." **Why it\'s wrong:** This.' }
          ],
            remediations: { 'misconception-adolescents-just-want-fashionable': { steps: ['If a student holds this misconception: 1.', '**Show the biology:** Pull up Class 10 Biology (c10_bio_cbse_02_008-011) — androgens stimulate sebaceous/apocrine.', 'Synthetic fibers *adsorb* lipids; cotton *absorbs* water.', 'Demonstrate with a swatch test: wear cotton vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_09_012', difficulty: 'standard',
          question: 'Clothing for children with special needs refers to garments specifically.',
          hint: 'Review node c11_hs_cbse_09_003 (Factors Affecting Clothing Selection) and.',
          misconception: 'Students often believe “clothing for special needs” simply means buying larger sizes or medical‑looking garments (e.g.',
          parts: [
                { id: 'a', prompt: 'State the three primary fabric recommendations from the NCERT for children with special needs in summer and winter, and name one fastener type suggested for.', answer: 'Summer: cotton; winter: velvet, corduroy, cotswool',
                  options: ['Summer: cotton; winter: velvet, corduroy, cotswool', 'polyester for summer, wool for winter, buttons', 'clothing for special needs'],
                  hint: 'Review node c11_hs_cbse_09_003 (Factors Affecting Clothing Selection) and c11_hs_cbse_09_004‑006.',
                  misconception: 'Students often believe “clothing for special needs” simply means buying larger sizes or medical‑looking garments (e.g., hospital gowns).' },
                { id: 'b', prompt: 'Explain why “aesthetic appeal” is explicitly listed as a requirement for special‑needs clothing in the textbook, and how it links to the child’s psychosocial.', answer: 'Aesthetic appeal ensures the garment looks like regular children’s wear',
                  options: ['Aesthetic appeal ensures the garment looks like regular children’s wear', 'looking nice', 'clothing for special needs'],
                  hint: 'Review node c11_hs_cbse_09_003 (Factors Affecting Clothing Selection) and c11_hs_cbse_09_004‑006.',
                  misconception: 'Students often believe “clothing for special needs” simply means buying larger sizes or medical‑looking garments (e.g., hospital gowns).' }
          ],
            remediations: { 'clothing-for-special-needs-simply': { steps: ['Re‑read Section 9.3 (Children’s Basic Clothing Needs) and list the five general needs (comfort, safety, self‑help.', 'For each need, write one adaptation required for a wheelchair‑using child (e.g., comfort → soft cotton‑velvet; safety →.', 'Verify each adaptation against the 9.5 bullet points.', 'Practise by critiquing a regular store‑bought garment for missing adaptations.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
