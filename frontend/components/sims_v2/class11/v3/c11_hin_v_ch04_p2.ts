import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_v_ch04_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_v_ch04_p2: SimDef = {
    id: 'v3_c11_hin_v_ch04_p2',
    title: 'Hkkjrh; xkf;dkvksa esa cstksM+yrk · Part 2/3',
    subtitle: 'Test the claim that the most local art travels the farthest.',
    classLevel: 11, subject: 'hin_v', topic: 'Hkkjrh; xkf;dkvksa esa cstksM+yrk · Part 2/3',
    chapters: ['c11_hin_v_ch04'],
    nodeIds: ['c11_hin_v_cbse_04_007', 'c11_hin_v_cbse_04_008', 'c11_hin_v_cbse_04_009', 'c11_hin_v_cbse_04_010', 'c11_hin_v_cbse_04_011', 'c11_hin_v_cbse_04_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader mapping Indian art\'s hidden continuum', intro: 'Mandana on a mud wall in a village, Kathak in a Jaipur auditorium — the essay asks what these share, not what divides them.', goal: 'Analyse the folk-classical continuum and the essay\'s classification-driven structure.' },
    discovery: {
        question: '\'The more local an art is in its expression, the more universal it becomes\' — can that paradox actually hold?',
        options: ['Yes — Warli\'s rice-paste spirals use only circle, triangle and square: the most local cosmology drawn in the most universal shapes', 'No — local art stays local by definition', 'Yes — but only after foreigners validate it', 'No — universality requires abandoning the local'],
        answer: 'Yes — Warli\'s rice-paste spirals use only circle, triangle and square: the most local cosmology drawn in the most universal shapes',
        hook: 'Folk and classical aren\'t two boxes — Kathak grew out of kathavachaks and temple dances sank back into villages; the continuum never stops trading.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the supporting ideas that run alongside the primary theme, enriching the text by exploring specific dimensions such as regional diversity, historical evolution, social function.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_v_cbse_04_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace how the essay runs every art form through the same folk→classical→living-continuity arc, and judge what that repeated pattern proves.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_04_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you\'re visiting a museum where Madhubani paintings, Bharatanatyam sculptures, and Khajuraho carvings are displayed together.',
            decisions: [{ prompt: 'Name any three secondary themes present in the chapter "Hkkjrh; dyk,¡" based on your reading of the text.', options: [
                { text: 'Correct answer: (1) Folk-to-classical evolution continuum, (2) Regional diversity within', outcome: 'Correct answer: (1) Folk-to-classical evolution continuum, (2) Regional diversity within cultural.' },
                { text: 'diversity of Indian arts', outcome: 'Not quite — Students confuse "secondary themes" with "sub-topics" or "examples." They list Madhubani, Kathak.', reveals: 'students-confuse-secondary-themes-with' },
                { text: 'secondary themes', outcome: 'Not quite — Students confuse "secondary themes" with "sub-topics" or "examples." They list Madhubani, Kathak.', reveals: 'students-confuse-secondary-themes-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_04_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are scrolling through a travel blog about the Ajanta caves.',
            decisions: [{ prompt: 'Define \'imagery\' (चित्रात्मकता) and \'metaphor\' (रूपक) precisely as used in literary analysis.', options: [
                { text: '**Correct Answer:** Imagery is language appealing to the senses (e.g., the description of', outcome: '**Correct Answer:** Imagery is language appealing to the senses (e.g., the description.' },
                { text: 'visual description', outcome: 'Not quite — Students believe **imagery is only "visual description" (chitra varnan)** and **metaphor is just.', reveals: 'imagery-is-only-visual-description' },
                { text: 'fancy comparison', outcome: 'Not quite — Students believe **imagery is only "visual description" (chitra varnan)** and **metaphor is just.', reveals: 'imagery-is-only-visual-description' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_04_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine a doctor who tells a patient "you have a *condition*" versus one who says "you have a *disease*." Both words denote the same medical reality, but.',
            decisions: [{ prompt: 'Define "denotation" and "connotation" in your own words, then give one example from everyday Hindi usage where the denotation-connotation.', options: [
                { text: 'Denotation is the literal, dictionary definition of a word', outcome: 'Denotation is the literal, dictionary definition of a word — its neutral, context-free meaning.' },
                { text: 'a secondary meaning', outcome: 'Not quite — Students treat vocabulary analysis as *dictionary work* — they identify a "difficult" word, look.', reveals: 'students-treat-vocabulary-analysis-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_04_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you\'re reading a WhatsApp forward claiming "Madhubani paintings only use red and black colours." You instantly know it\'s false because you remember the.',
            decisions: [{ prompt: 'Identify the question type: "According to the text, what is the \'ukV~;\'kkL=k\' (Natyashastra) considered for classical dance?" Is this.', options: [
                { text: 'Literal', outcome: 'Literal. The text explicitly states: "ukV~;\'kkL=k esa budk \'kkL=kh; Lo:i cuk] tks dyk osQ fy, vc.' },
                { text: 'A wrong answer (inferential) reveals the student confuses', outcome: 'Not quite — Students think "inferential" means "guessing" or "giving your opinion." They write answers like "I.', reveals: 'inferential-means-guessing-or-giving' },
                { text: 'inferential', outcome: 'Not quite — Students think "inferential" means "guessing" or "giving your opinion." They write answers like "I.', reveals: 'inferential-means-guessing-or-giving' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a school exhibition on \'Indian Arts\', a student sorts every item into two rigid boxes — \'folk/tribal\' (Mandana, Warli, Madhubani) and \'classical\' (Kathak, Mughal miniatures) — insisting the categories never mix, \'like traditional vs modern.\'',
            decisions: [{ prompt: 'What does the chapter say about that border?', options: [
                { text: 'Show the continuum: the chapter argues folk and classical are endpoints in constant संवाद — folk forms get codified into classical (Kathak rising from the kathavachak tradition), classical forms dissolve back into folk (temple dance becoming village ritual), and both root in the Natya Shastra. Crucially, Indian arts were never museum objects — they lived inside births, harvests and worship.', outcome: 'The exhibition gets a third section — \'the dialogue\': Kathak\'s folk origins, Madhubani\'s codification — proving the categories are porous by design.' },
                { text: 'Keep the two boxes — separate categories make the exhibition clearer for visitors.', outcome: 'Clarity here falsifies: the text\'s central claim is fluidity, and a rigid folk/classical wall hides exactly the unity-in-diversity the chapter demonstrates.', reveals: 'folk-classical-are-fixed-boxes' },
                { text: 'Treat the art list as the structure — painting, then music, then dance is just a table of contents.', outcome: 'The sequence is argumentative: each art form follows the same folk→classical→modern trajectory to prove the thesis that arts are rooted in life.', reveals: 'structure-is-topic-list' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_04_012', title: 'The bigger picture',
          caseStudy: { intro: 'Bhimbetka\'s cave lines, a Rajasthani wall at Diwali, a Tanjore court repertoire — one argument repeated until it becomes evidence.',
            decisions: [{ prompt: 'What comes next? Hkkjrh; xkf;dkvksa esa cstksM+yrk · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Hkkjrh; xkf;dkvksa esa cstksM+yrk · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_04_007', difficulty: 'standard',
          question: 'Secondary themes are the supporting ideas that run alongside the primary theme.',
          hint: 'If stuck, review node c11_hin_v_cbse_04_006 (Primary Theme) and re-read the chapter\'s.',
          misconception: 'Students confuse "secondary themes" with "sub-topics" or "examples." They list Madhubani, Kathak, Khajuraho as themes.',
          parts: [
                { id: 'a', prompt: 'Compare how "regional diversity" and "cultural unity" function as twin secondary themes.', answer: 'Correct answer: Regional diversity: Madhubani (Bihar), Warli (Maharashtra), Phad',
                  options: ['Correct answer: Regional diversity: Madhubani (Bihar), Warli (Maharashtra), Phad', 'secondary themes', 'sub-topics', 'examples'],
                  hint: 'If stuck, review node c11_hin_v_cbse_04_006 (Primary Theme) and re-read the chapter\'s opening and.',
                  misconception: 'Students confuse "secondary themes" with "sub-topics" or "examples." They list Madhubani, Kathak, Khajuraho as themes instead.' }
          ],
            remediations: { 'students-confuse-secondary-themes-with': { steps: ['Give the student a two-column table - Column A: "Examples from Text" (Madhubani, Yaksha, Natyashastra), Column B: "Idea.', 'Have them fill Column B for 5 examples.', 'Ask them to group Column B entries into 3-4 clusters - these clusters ARE the secondary themes.', 'Verify each cluster appears in at least two art form sections.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students confuse "secondary themes" with "sub-topics" or "examples." They list Madhubani, Kathak, Khajuraho as themes.',
          parts: [
                { id: 'a', prompt: 'Create a thematic map showing how the secondary theme "art-ritual-life connection" branches across the three art forms (painting, music/dance, sculpture) with.', answer: 'Expected answer: A visual/conceptual map with three main branches: Painting: (1)',
                  options: ['Expected answer: A visual/conceptual map with three main branches: Painting: (1)', 'secondary themes', 'sub-topics', 'examples'],
                  hint: 'If stuck, review node c11_hin_v_cbse_04_006 (Primary Theme) and re-read the chapter\'s opening and.',
                  misconception: 'Students confuse "secondary themes" with "sub-topics" or "examples." They list Madhubani, Kathak, Khajuraho as themes instead.' }
          ],
            remediations: { 'students-confuse-secondary-themes-with': { steps: ['Give the student a two-column table - Column A: "Examples from Text" (Madhubani, Yaksha, Natyashastra), Column B: "Idea.', 'Have them fill Column B for 5 examples.', 'Ask them to group Column B entries into 3-4 clusters - these clusters ARE the secondary themes.', 'Verify each cluster appears in at least two art form sections.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_04_008', difficulty: 'standard',
          question: 'Imagery (चित्रात्मकता) is the use of vivid, sensory language that appeals.',
          hint: 'Review Class 10 Hindi (Kshitij/Kritika) poetry imagery exercises — specifically the.',
          misconception: 'Students believe **imagery is only "visual description" (chitra varnan)** and **metaphor is just "fancy comparison".',
          parts: [
                { id: 'a', prompt: 'The text states: "fp=kdkjh çkphu dky ls gh gekjs thou dk vfHkUu vax jgk gSA" (Painting has been an integral expression of our life since primitive times).', answer: '**Correct Answer:** This is **not a metaphor**',
                  options: ['**Correct Answer:** This is **not a metaphor**', 'Painting *is* the heartbeat of civilization', 'painting', 'visual description'],
                  hint: 'Review Class 10 Hindi (Kshitij/Kritika) poetry imagery exercises — specifically the "chitratmakta".',
                  misconception: 'Students believe **imagery is only "visual description" (chitra varnan)** and **metaphor is just "fancy comparison" (sundar tulna)**.' },
                { id: 'b', prompt: 'Apply the concept of \'kinesthetic imagery\' (गति/स्पर्श सम्बन्धी चित्रात्मकता) to the description of "vtark dh xq-iQk,¡" (Bhimbetka cave paintings) on page 62.', answer: '**Correct Answer:** 1',
                  options: ['**Correct Answer:** 1', 'visual description', 'fancy comparison'],
                  hint: 'Review Class 10 Hindi (Kshitij/Kritika) poetry imagery exercises — specifically the "chitratmakta".',
                  misconception: 'Students believe **imagery is only "visual description" (chitra varnan)** and **metaphor is just "fancy comparison" (sundar tulna)**.' },
                { id: 'c', prompt: 'Analyze the extended metaphor in the "laxhr dyk" (music) section (pages 64-66) where Indian classical music is linked to "lkfgR;laxhrdykfoghu% lk{kkRi\'kq%.', answer: '**Correct Answer:** The metaphor equates musical performance (tenor) with yogic',
                  options: ['**Correct Answer:** The metaphor equates musical performance (tenor) with yogic', 'visual description', 'fancy comparison'],
                  hint: 'Review Class 10 Hindi (Kshitij/Kritika) poetry imagery exercises — specifically the "chitratmakta".',
                  misconception: 'Students believe **imagery is only "visual description" (chitra varnan)** and **metaphor is just "fancy comparison" (sundar tulna)**.' }
          ],
            remediations: { 'imagery-is-only-visual-description': { steps: ['**Sensory Sort Drill:** Give the student 10 phrases from the chapter (e.g., "oh.kk ki madhur taan", "ghungroo.', 'Have them sort into 6 sensory columns (Visual, Auditory, Tactile, Olfactory, Gustatory, Kinesthetic).', 'Discuss why "praachin" fits none.', '**Metaphor Surgery:** Take a literal sentence: "Madhubani painting uses natural colors." Convert to metaphor.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_04_009', difficulty: 'standard',
          question: 'Irony (विडंबना/व्यंग्य) is a literary device where the intended meaning.',
          hint: 'Re-read the "लोककला और शास्त्रीय कला" (Folk and Classical Art) section (pages 63-65) and.',
          misconception: 'Students conflate "symbol" with "metaphor" and treat every noun in the text as a symbol.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irony (विडंबना/व्यंग्य) is a literary device where the intended meaning of words or',
                  options: ['Irony (विडंबना/व्यंग्य) is a literary device where the intended meaning of words or', 'The "Before You Read: Context and Background" section provides the historical, cultural,', 'Plot and narrative structure in an expository text refers to the logical organization of', 'In an expository text like "Hkkjrh; dyk,¡", **setting** refers to the historical period,'],
                  hint: 'Re-read the "लोककला और शास्त्रीय कला" (Folk and Classical Art) section (pages 63-65) and trace the.',
                  misconception: 'Students conflate "symbol" with "metaphor" and treat every noun in the text as a symbol.' }
          ],
            remediations: { 'students-conflate-symbol-with-metaphor': { steps: ['Give the student two parallel columns—"What the text says happened historically" vs "What the text claims is the.', 'Ask: "Where is the gap? What word describes a gap between expected and actual?" Guide them to "situational irony."', 'For symbolism, hand them a 3-column template: Concrete Image | Textual Context (quote line) | Abstract Idea(s).', 'Require them to write one analytical paragraph using the PEEL structure (Point-Evidence-Explanation-Link) on either.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_04_010', difficulty: 'standard',
          question: 'Vocabulary in context refers to the analysis of how specific word choices.',
          hint: 'If the student cannot identify connotations beyond denotation, return to node 001 (Before.',
          misconception: 'Students treat vocabulary analysis as *dictionary work* — they identify a "difficult" word, look up its meaning, write.',
          parts: [
                { id: 'a', prompt: 'Define "denotation" and "connotation" in your own words, then give one example from everyday Hindi usage where the denotation-connotation gap creates a layer.', answer: 'Denotation is the literal, dictionary definition of a word',
                  options: ['Denotation is the literal, dictionary definition of a word', 'a secondary meaning'],
                  hint: 'If the student cannot identify connotations beyond denotation, return to node 001 (Before You Read).',
                  misconception: 'Students treat vocabulary analysis as *dictionary work* — they identify a "difficult" word, look up its meaning, write the definition, and.' }
          ],
            remediations: { 'students-treat-vocabulary-analysis-as': { steps: ['Select a key passage from the chapter (3-4 sentences). Have the student list every word they consider "significant".', 'For each significant word, create a four-column table: Column A = denotation (dictionary meaning), Column.', 'Ask the student to circle all words in the passage that belong to the same semantic field.', 'Have the student rewrite the passage replacing three key words with synonyms.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_04_011', difficulty: 'standard',
          question: 'Language usage in the text refers to the specific grammatical structures.',
          hint: 'If stuck, review **Class 10 Hindi Bhasha aur Vyakaran: Samasa Vigraha and Karak.',
          misconception: 'Students treat "grammar in text" as a **spot-the-device exercise** (e.g., "find 5 samasas") rather than **analyzing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Language usage in the text refers to the specific grammatical structures, vocabulary',
                  options: ['Language usage in the text refers to the specific grammatical structures, vocabulary', 'The "Before You Read: Context and Background" section provides the historical, cultural,', 'Plot and narrative structure in an expository text refers to the logical organization of', 'In an expository text like "Hkkjrh; dyk,¡", **setting** refers to the historical period,'],
                  hint: 'If stuck, review **Class 10 Hindi Bhasha aur Vyakaran: Samasa Vigraha and Karak Prakarana**.',
                  misconception: 'Students treat "grammar in text" as a **spot-the-device exercise** (e.g., "find 5 samasas") rather than **analyzing functional grammar**.' }
          ],
            remediations: { 'students-treat-grammar-in-text': { steps: ['**Re-teach functional question:** Give the student ONE sentence from the text.', 'Ask: "What cultural fact is this sentence asserting?', 'Now — which *specific* grammatical choice makes that assertion sound authoritative / timeless / precise?" 2.', '**Contrast pairs:** Show the original sentence vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_04_012', difficulty: 'standard',
          question: 'Literal comprehension questions require answers directly stated in the text.',
          hint: 'If stuck, review "Vocabulary in Context: Key Words" (node 010) for terms like \'laokn\'.',
          misconception: 'Students think "inferential" means "guessing" or "giving your opinion." They write answers like "I feel the author.',
          parts: [
                { id: 'a', prompt: 'Identify the question type: "According to the text, what is the \'ukV~;\'kkL=k\' (Natyashastra) considered for classical dance?" Is this literal or inferential?', answer: 'Literal',
                  options: ['Literal', 'A wrong answer (inferential) reveals the student confuses', 'inferential', 'guessing'],
                  hint: 'If stuck, review "Vocabulary in Context: Key Words" (node 010) for terms like \'laokn\'.',
                  misconception: 'Students think "inferential" means "guessing" or "giving your opinion." They write answers like "I feel the author thinks folk art.' },
                { id: 'b', prompt: 'Explain in your own words why the author says folk art forms are "yksd ls tqM+h" (connected to folk) even today, using the phrase "thou ls tqM+h" (connected.', answer: 'This is an UNDERSTAND question',
                  options: ['This is an UNDERSTAND question', 'thou ls tqM+h', 'inferential', 'guessing'],
                  hint: 'If stuck, review "Vocabulary in Context: Key Words" (node 010) for terms like \'laokn\'.',
                  misconception: 'Students think "inferential" means "guessing" or "giving your opinion." They write answers like "I feel the author thinks folk art.' },
                { id: 'c', prompt: 'APPLY: A board exam asks: "How does the text suggest that the distinction between \'classical\' and \'folk\' art is blurred in practice?" Write a 2-sentence PEEL.', answer: 'Step 1: Identify claim - The boundary is fluid',
                  options: ['Step 1: Identify claim - The boundary is fluid', 'inferential', 'guessing', 'giving your opinion'],
                  hint: 'If stuck, review "Vocabulary in Context: Key Words" (node 010) for terms like \'laokn\'.',
                  misconception: 'Students think "inferential" means "guessing" or "giving your opinion." They write answers like "I feel the author thinks folk art.' }
          ],
            remediations: { 'inferential-means-guessing-or-giving': { steps: ['Give the student a 3-column table: Column A (Text Quote), Column B (What it literally says), Column C (What it implies).', 'Practice with 5 sentences from the chapter (e.g., "dykvksa dk ;g vn~Hkqr lalkj gekjh laLÑfr dh igpku gS" -> Literal.', 'Implied: Losing art = losing cultural identity).', 'Drill the phrase "The text suggests X because it states Y, which implies Z" until they use it automatically.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
