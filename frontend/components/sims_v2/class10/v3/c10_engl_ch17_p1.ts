import type { SimDef } from '../../engine/types';

/** v3 generated — c10_engl_ch17_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_engl_ch17_p1: SimDef = {
    id: 'v3_c10_engl_ch17_p1',
    title: 'Bholi · Part 1/2',
    subtitle: 'Watch a mocked girl find the one word that changes her life',
    classLevel: 10, subject: 'engl', topic: 'Bholi · Part 1/2',
    chapters: ['c10_engl_ch17'],
    nodeIds: ['c10_engl_cbse_17_001', 'c10_engl_cbse_17_002', 'c10_engl_cbse_17_003', 'c10_engl_cbse_17_004', 'c10_engl_cbse_17_005', 'c10_engl_cbse_17_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a neglected child discovering her own voice', intro: 'Everyone in the village calls you Bholi — the simpleton who fell off a cot, survived smallpox, and can barely speak. Then the new school opens, and a teacher speaks to you as if you are a person.', goal: 'Show how education and one caring teacher transform neglect into self-respect and moral courage.' },
    discovery: {
        question: 'Sulekha — called \'Bholi\' (simpleton) after a fall injured her brain and smallpox scarred her face — is the neglected, stammering daughter everyone mocks. At her own wedding, she refuses to marry the groom when he demands dowry money. What made the \'simpleton\' suddenly fearless?',
        options: ['Schooling — education gave her self-respect, words, and the courage to judge right from wrong', 'A hidden inheritance made her financially independent', 'Her father finally stood up for her first', 'The village elders ordered her to refuse'],
        answer: 'Schooling — education gave her self-respect, words, and the courage to judge right from wrong',
        hook: 'The girl who couldn\'t finish a sentence without stammering delivered the story\'s most complete sentence: \'No.\' Education didn\'t just teach her to read — it taught her she mattered.',
    },
    teaching: [
        { title: 'Bholi (Sulekha): A Simpleton Marked by Smallpox and a Fall', text: 'Bholi (originally named Sulekha) is the protagonist of the chapter, introduced as a "simpleton" due to a childhood fall that damaged her brain and a smallpox attack that left her face permanently.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_engl_cbse_17_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Grow up as the daughter nobody wants — scarred, stammering, mocked — then let a patient teacher rebuild you word by word until you can refuse an unjust marriage in front of the whole village.',
        labels: ['Bholi (Sulekha): A Simpleton', 'Bholi Sent to School', 'Bholi\'s First Day at', 'Bholi\'s Transformation: Learning', 'Bishamber: The Greedy Bridegroom', 'Bholi\'s Refusal: Standing Up'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_engl_cbse_17_001', title: 'Bholi (Sulekha): A Simpleton Marked by Smallpox and a Fall',
          caseStudy: { intro: 'Imagine you meet a new classmate who never speaks, has visible scars on the face, and others whisper she is "slow." What would you assume about her life?',
            decisions: [{ prompt: 'What are the two specific childhood incidents that caused Bholi\'s disabilities, and at what ages did they occur?', options: [
                { text: 'The two incidents are: (1) falling off a cot at ten months old', outcome: 'The two incidents are: (1) falling off a cot at ten months old, which damaged her brain and led.' },
                { text: 'simple', outcome: 'Not quite — Students often think Bholi was born "simple" (intellectually disabled) and that smallpox only.', reveals: 'bholi-was-born-simple-intellectually' },
                { text: 'she was born with disabilities or confusing the order', outcome: 'Not quite — Students often think Bholi was born "simple" (intellectually disabled) and that smallpox only.', reveals: 'bholi-was-born-simple-intellectually' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_17_002', title: 'Bholi Sent to School: The Tehsildar\'s Order and the Mother\'s Reluctance',
          caseStudy: { intro: 'Imagine a government official visits your village and tells your father, "Send your daughters to the new school or face consequences." Your father agrees, but.',
            decisions: [{ prompt: 'What specific order does the Tehsildar give to Ramlal, and what reason does he provide for it?', options: [
                { text: 'The Tehsildar orders Ramlal to send his daughters to the newly opened primary school in', outcome: 'The Tehsildar orders Ramlal to send his daughters to the newly opened primary school in the.' },
                { text: 'A wrong answer (e.g', outcome: 'Not quite — Students often think the mother sends Bholi to school because she secretly wants her educated,.', reveals: 'the-mother-sends-bholi-to' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_17_003', title: 'Bholi\'s First Day at School: Fear, the Teacher\'s Kindness and the Pictures',
          caseStudy: { intro: 'Imagine your own first day at a new school — the stomach-churning fear of unknown faces, strange rooms, and the worry that you won\'t fit in.',
            decisions: [{ prompt: 'What specific pictures does Bholi see on the classroom walls on her first day that attract her attention?', options: [
                { text: 'Bholi sees pictures of a horse, a goat, a parrot, and a cow — each described as "as real', outcome: 'Bholi sees pictures of a horse, a goat, a parrot, and a cow — each described as "as real as life.".' },
                { text: 'as real as life', outcome: 'Not quite — Students believe Bholi\'s transformation begins because she *starts learning to read* on day one.', reveals: 'bholi-s-transformation-begins-because' },
                { text: 'letters of the alphabet', outcome: 'Not quite — Students believe Bholi\'s transformation begins because she *starts learning to read* on day one.', reveals: 'bholi-s-transformation-begins-because' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_17_004', title: 'Bholi\'s Transformation: Learning to Speak and Gaining Confidence',
          caseStudy: { intro: 'Imagine you\'re asked to speak in front of your whole school assembly tomorrow — your heart races, palms sweat, words stick in your throat.',
            decisions: [{ prompt: 'What is the meaning of the name "Bholi" and why is it ironic in the context of the story\'s beginning?', options: [
                { text: '"Bholi" means simpleton or innocent; it is ironic', outcome: '"Bholi" means simpleton or innocent; it is ironic because Sulekha is not simple by nature — she.' },
                { text: 'it means she is foolish', outcome: 'Not quite — Students believe Bholi\'s transformation is sudden — triggered by one kind act — and that her.', reveals: 'bholi-s-transformation-is-sudden' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_17_005', title: 'Bishamber: The Greedy Bridegroom Who Demands Dowry',
          caseStudy: { intro: 'Imagine you are at a wedding where the groom suddenly refuses to garland the bride unless her father pays extra money — this shocks everyone and reveals the.',
            decisions: [{ prompt: 'What is the exact amount of dowry Bishamber demands at the wedding ceremony, and what specific physical feature of Bholi triggers this.', options: [
                { text: 'Bishamber demands ₹5,000 after seeing Bholi\'s pockmarked face when the silken veil is', outcome: 'Bishamber demands ₹5,000 after seeing Bholi\'s pockmarked face when the silken veil is lifted.' },
                { text: 'he demands money', outcome: 'Not quite — Students often think Bishamber demands dowry because he is poor or because Bholi is uneducated.', reveals: 'bishamber-demands-dowry-because-he' },
                { text: 'he asks for ₹2,000', outcome: 'Not quite — Students often think Bishamber demands dowry because he is poor or because Bholi is uneducated.', reveals: 'bishamber-demands-dowry-because-he' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_17_006', title: 'Bholi\'s Refusal: Standing Up Against the Marriage and Dowry',
          caseStudy: { intro: 'Imagine you are at a family wedding where the groom suddenly demands a car or cash before the *pheras* — what would you do?',
            decisions: [{ prompt: 'What exact words does Bholi speak when she refuses to marry Bishamber Nath at the wedding mandap?', options: [
                { text: 'Bholi says: "Pitaji, take back your money', outcome: 'Bholi says: "Pitaji, take back your money. I am not going to marry this man." (Or similar phrasing.' },
                { text: '(Or similar phrasing', outcome: 'Not quite — Students often write: "Bholi refused because she didn\'t want to burden her father with dowry." This.', reveals: 'students-often-write-bholi-refused' },
                { text: ') A wrong answer like', outcome: 'Not quite — Students often write: "Bholi refused because she didn\'t want to burden her father with dowry." This.', reveals: 'students-often-write-bholi-refused' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_17_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A new girl joins the class and stammers when nervous. Within a week she has a mocking nickname, classmates finish her sentences for her, and she has stopped raising her hand. Some say the teasing is \'just harmless fun.\'',
            decisions: [{ prompt: 'What does \'Bholi\' reveal about what is happening to this girl?', options: [
                { text: 'The nickname is doing real damage — Sulekha was renamed \'Bholi\' until even she accepted the label, and her family\'s neglect hurt her as much as her stammer did. The story shows that mockery and low expectation are choices people make, and that respect plus education — the teacher who treated her as capable — is what lets a labelled child reclaim her real name.', outcome: 'Bholi\'s arc is about identity stolen by a label and recovered through dignity and learning — the classmates finishing the new girl\'s sentences are replaying her family\'s mistake.' },
                { text: 'The teasing is harmless — every kid gets a nickname, and it does not affect who she really is.', outcome: 'The whole story disagrees — \'Bholi\' swallowed \'Sulekha\'; a label repeated by everyone becomes the identity a child believes she deserves.', reveals: 'nicknames-are-harmless' },
                { text: 'The girl\'s stammer is the real problem — once it is fixed the teasing and self-doubt will vanish on their own.', outcome: 'Bholi\'s suffering came as much from being treated as a burden as from her stammer — speech improved only after a teacher first treated her with respect.', reveals: 'fix-the-stammer-first' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_17_006', title: 'The bigger picture',
          caseStudy: { intro: 'They named her Bholi to mean \'simple.\' School renamed her Sulekha — a girl who could speak, judge, and say no to a greedy bridegroom.',
            decisions: [{ prompt: 'What comes next? Bholi · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Bholi · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_engl_cbse_17_001', difficulty: 'standard',
          question: 'Bholi (originally named Sulekha) is the protagonist of the chapter, introduced.',
          hint: 'Review the PEEL method (Point, Evidence, Explanation, Link) using the Class 9.',
          misconception: 'Students often think Bholi was born "simple" (intellectually disabled) and that smallpox only affected her looks.',
          parts: [
                { id: 'a', prompt: 'What are the two specific childhood incidents that caused Bholi\'s disabilities, and at what ages did they occur?', answer: 'The two incidents are: (1) falling off a cot at ten months old',
                  options: ['The two incidents are: (1) falling off a cot at ten months old', 'simple', 'she was born with disabilities or confusing the order'],
                  hint: 'Review the PEEL method (Point, Evidence, Explanation, Link) using the Class 9 "Grandmother".',
                  misconception: 'Students often think Bholi was born "simple" (intellectually disabled) and that smallpox only affected her looks.' },
                { id: 'b', prompt: 'Why does the author emphasize that Bholi\'s real name was Sulekha, but everyone called her Bholi?', answer: '"Sulekha" means "one who writes beautifully" or "good writing"',
                  options: ['"Sulekha" means "one who writes beautifully" or "good writing"', 'Bholi is just a nickname', 'simple'],
                  hint: 'Review the PEEL method (Point, Evidence, Explanation, Link) using the Class 9 "Grandmother".',
                  misconception: 'Students often think Bholi was born "simple" (intellectually disabled) and that smallpox only affected her looks.' },
                { id: 'c', prompt: 'Find one sentence from the text (paraphrased is fine) that shows Bholi\'s parents treated her differently from her siblings, and explain what it reveals about.', answer: 'Example: "Ramlal had seven children',
                  options: ['Example: "Ramlal had seven children', 'simple'],
                  hint: 'Review the PEEL method (Point, Evidence, Explanation, Link) using the Class 9 "Grandmother".',
                  misconception: 'Students often think Bholi was born "simple" (intellectually disabled) and that smallpox only affected her looks.' }
          ],
            remediations: { 'bholi-was-born-simple-intellectually': { steps: ['Re-read the first three paragraphs of the story with a highlighter.', 'Draw a two-column table: Event → Consequence. Fill: Fall → brain damage → stammer/delay; Smallpox → pockmarks.', 'Ask yourself: "Which disability came first? Which is reversible?"', 'Write one sentence explaining why the order matters for the story\'s message about education.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_17_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think Bholi was born "simple" (intellectually disabled) and that smallpox only affected her looks.',
          parts: [
                { id: 'a', prompt: 'The narrator says Bholi "could not speak till she was five, and when at last she did, she stammered." Evaluate whether this description is meant to evoke pity.', answer: 'The description evokes empathy, not pity or criticism',
                  options: ['The description evokes empathy, not pity or criticism', 'it shows she is stupid', 'it makes us feel sorry', 'simple'],
                  hint: 'Review the PEEL method (Point, Evidence, Explanation, Link) using the Class 9 "Grandmother".',
                  misconception: 'Students often think Bholi was born "simple" (intellectually disabled) and that smallpox only affected her looks.' },
                { id: 'b', prompt: 'Write a 3-sentence diary entry from Bholi\'s perspective at age 7, using only what the text tells us about her inner world at this stage (before school).', answer: 'A strong answer: "Today Ma looked at my face and turned away',
                  options: ['A strong answer: "Today Ma looked at my face and turned away', 'simple'],
                  hint: 'Review the PEEL method (Point, Evidence, Explanation, Link) using the Class 9 "Grandmother".',
                  misconception: 'Students often think Bholi was born "simple" (intellectually disabled) and that smallpox only affected her looks.' }
          ],
            remediations: { 'bholi-was-born-simple-intellectually': { steps: ['Re-read the first three paragraphs of the story with a highlighter.', 'Draw a two-column table: Event → Consequence. Fill: Fall → brain damage → stammer/delay; Smallpox → pockmarks.', 'Ask yourself: "Which disability came first? Which is reversible?"', 'Write one sentence explaining why the order matters for the story\'s message about education.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_17_002', difficulty: 'standard',
          question: 'This node examines the pivotal incident where the Tehsildar (revenue officer).',
          hint: 'Review c10_engl_cbse_17_001 for the list of Bholi\'s disabilities and the family\'s social.',
          misconception: 'Students often think the mother sends Bholi to school because she secretly wants her educated, or that Ramlal is.',
          parts: [
                { id: 'a', prompt: 'Why does Ramlal\'s wife agree to send Bholi to school but refuse to send their other daughters?', answer: 'She believes education makes girls difficult to marry, but',
                  options: ['She believes education makes girls difficult to marry, but', 'She wants Bholi to become educated'],
                  hint: 'Review c10_engl_cbse_17_001 for the list of Bholi\'s disabilities and the family\'s social status.',
                  misconception: 'Students often think the mother sends Bholi to school because she secretly wants her educated, or that Ramlal is a progressive father.' }
          ],
            remediations: { 'the-mother-sends-bholi-to': { steps: ['Re-read the mother\'s exact words: "If you send the girls to school, who will marry them?', 'Ask: "Does she say \'Bholi will benefit\'?', 'No — she says \'she is a burden.\'" 3.', 'Role-play: Student plays Tehsildar, teacher plays Ramlal.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_17_003', difficulty: 'standard',
          question: 'This topic examines the pivotal events of Bholi\'s first day at school in the.',
          hint: 'If stuck, re-read the paragraph starting "The teacher spoke very softly..." and list.',
          misconception: 'Students believe Bholi\'s transformation begins because she *starts learning to read* on day one.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Bholi is terrified when she first enters the school, and how the teacher\'s very first action differs from how Bholi\'s parents.', answer: 'Bholi is terrified',
                  options: ['Bholi is terrified', 'she was scared of school', 'Bholi\'s transformation begins'],
                  hint: 'If stuck, re-read the paragraph starting "The teacher spoke very softly..." and list every sensory.',
                  misconception: 'Students believe Bholi\'s transformation begins because she *starts learning to read* on day one.' },
                { id: 'b', prompt: 'Apply the concept of a "safe space" to the classroom: identify two specific things the teacher does (beyond speaking softly) that transform the classroom into.', answer: '1) The teacher does not force Bholi to speak or read immediately',
                  options: ['1) The teacher does not force Bholi to speak or read immediately', 'Don\'t be afraid', 'In a month you will be able to read this book', 'kindness'],
                  hint: 'If stuck, re-read the paragraph starting "The teacher spoke very softly..." and list every sensory.',
                  misconception: 'Students believe Bholi\'s transformation begins because she *starts learning to read* on day one.' }
          ],
            remediations: { 'bholi-s-transformation-begins-because': { steps: ['Re-read the first-day episode aloud, highlighting every verb describing the teacher\'s actions (spoke softly, smiled.', 'Draw a two-column table: "What Bholi Expected" (scolding, beating, forced reading) vs.', '"What Actually Happened" (soft voice, smile, picture book, promise).', 'Write one sentence explaining why the *gap* between the columns is the turning point.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_17_004', difficulty: 'standard',
          question: 'Bholi\'s transformation refers to the gradual process through which Sulekha.',
          hint: 'Review "Character Arc Mapping" technique from c9_engl_ch1_2 (Grandmother analysis) — draw.',
          misconception: 'Students believe Bholi\'s transformation is sudden — triggered by one kind act — and that her stammering disappears.',
          parts: [
                { id: 'a', prompt: 'What is the meaning of the name "Bholi" and why is it ironic in the context of the story\'s beginning?', answer: '"Bholi" means simpleton or innocent; it is ironic',
                  options: ['"Bholi" means simpleton or innocent; it is ironic', 'it means she is foolish'],
                  hint: 'Review "Character Arc Mapping" technique from c9_engl_ch1_2 (Grandmother analysis) — draw.',
                  misconception: 'Students believe Bholi\'s transformation is sudden — triggered by one kind act — and that her stammering disappears completely and.' },
                { id: 'b', prompt: 'The teacher uses a picture book to help Bholi learn. Describe the step-by-step method the teacher employs over time to move Bholi from looking at pictures.', answer: 'Step 1: Teacher gives picture book, asks Bholi to look at images',
                  options: ['Step 1: Teacher gives picture book, asks Bholi to look at images', 'she taught her to read'],
                  hint: 'Review "Character Arc Mapping" technique from c9_engl_ch1_2 (Grandmother analysis) — draw.',
                  misconception: 'Students believe Bholi\'s transformation is sudden — triggered by one kind act — and that her stammering disappears completely and.' }
          ],
            remediations: { 'bholi-s-transformation-is-sudden': { steps: ['If a student holds this misconception, do three things: (1) Create a timeline on the board with 4-5 dated markers from.', '(2) Ask: "What specific words show Bholi\'s active effort?" — have them hunt for verbs like "practised," "worked hard,".', 'After one week, Riya speaks perfectly.', 'Why/why not?" — this surfaces the magical-thinking error.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_17_005', difficulty: 'standard',
          question: 'Bishamber Nath is a wealthy, middle-aged grocer who agrees to marry Bholi.',
          hint: 'Review PEEL paragraph writing (Class 9 node c9_engl_ch8_2 on epistolary form includes.',
          misconception: 'Students often think Bishamber demands dowry because he is poor or because Bholi is uneducated.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Bishamber initially agrees to marry Bholi without dowry but changes his mind at the last moment.', answer: 'Bishamber agrees',
                  options: ['Bishamber agrees', 'he always wanted dowry', 'he is poor', 'well-to-do grocer'],
                  hint: 'Review PEEL paragraph writing (Class 9 node c9_engl_ch8_2 on epistolary form includes structured.',
                  misconception: 'Students often think Bishamber demands dowry because he is poor or because Bholi is uneducated.' },
                { id: 'b', prompt: 'Find two phrases from the text that show Bishamber\'s arrogance and sense of entitlement during the dowry demand.', answer: 'Phrases: "If you want me to marry her, you must give me five thousand rupees"',
                  options: ['Phrases: "If you want me to marry her, you must give me five thousand rupees"', 'he smiled', 'he was pleased', 'Bishamber demands dowry'],
                  hint: 'Review PEEL paragraph writing (Class 9 node c9_engl_ch8_2 on epistolary form includes structured.',
                  misconception: 'Students often think Bishamber demands dowry because he is poor or because Bholi is uneducated.' }
          ],
            remediations: { 'bishamber-demands-dowry-because-he': { steps: ['Re-read the wedding scene (paragraphs starting "The bridegroom lifted the veil...") and highlight every adjective used.', 'Create a two-column table: Column A = "What Bishamber says/does", Column B = "What it reveals about his mindset".', 'Verbally explain to a peer why his wealth makes his greed worse, not excusable.', 'Write one PEEL paragraph using the table as evidence.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_17_006', difficulty: 'standard',
          question: 'Bholi\'s refusal is the climactic moment in the story where Sulekha (Bholi).',
          hint: 'If stuck, review **c10_engl_cbse_17_004 (Bholi\'s Transformation)** for the "how" of her.',
          misconception: 'Students often write: "Bholi refused because she didn\'t want to burden her father with dowry." This reduces her agency.',
          parts: [
                { id: 'a', prompt: 'What exact words does Bholi speak when she refuses to marry Bishamber Nath at the wedding mandap?', answer: 'Bholi says: "Pitaji, take back your money',
                  options: ['Bholi says: "Pitaji, take back your money', '(Or similar phrasing', ') A wrong answer like', 'She asks her teacher for help'],
                  hint: 'If stuck, review **c10_engl_cbse_17_004 (Bholi\'s Transformation)** for the "how" of her change and.',
                  misconception: 'Students often write: "Bholi refused because she didn\'t want to burden her father with dowry." This reduces her agency to *daughterly.' }
          ],
            remediations: { 'students-often-write-bholi-refused': { steps: ['Re-read the wedding scene aloud, highlighting every adjective Bholi uses for Bishamber (greedy, contemptible, coward).', 'Draw a two-column table: "What society expects" vs "What Bholi does" — fill with textual quotes.', 'Practice writing one PEEL paragraph: *Point: Bholi refuses to protect her dignity.', 'Evidence: "I will not marry this greedy..." Explanation: The adjectives show moral judgment, not financial calculation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
