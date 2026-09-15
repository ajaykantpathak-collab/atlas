import type { SimDef } from '../../engine/types';

/** v3 generated — c10_engl_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_engl_ch06_p1: SimDef = {
    id: 'v3_c10_engl_ch06_p1',
    title: 'Mijbil the Otter · Part 1/2',
    subtitle: 'Track an otter\'s zig-zag road from Iraqi marshes to a Scottish home',
    classLevel: 10, subject: 'engl', topic: 'Mijbil the Otter · Part 1/2',
    chapters: ['c10_engl_ch06'],
    nodeIds: ['c10_engl_cbse_06_001', 'c10_engl_cbse_06_002', 'c10_engl_cbse_06_003', 'c10_engl_cbse_06_004', 'c10_engl_cbse_06_005', 'c10_engl_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an animal behaviourist observing a wild otter indoors', intro: 'A remote cottage by the water, a man grieving his dog, and a parcel from Iraq containing something that would turn bathtubs into playgrounds.', goal: 'Trace Maxwell\'s decision-making and Mijbil\'s non-linear adaptation using concrete behavioural evidence.' },
    discovery: {
        question: 'After his dog Jonnie dies, Maxwell doesn\'t get another dog — he imports an otter from Iraq. A classmate says: \'He was lonely and otters are cute.\' What\'s missing from that reading?',
        options: ['A deliberate chain of reasoning — grief, rejecting a replacement dog, a childhood fascination, and a cottage ringed by water fit for an otter', 'Nothing — loneliness fully explains an impulse purchase', 'Money — only a rich man could order an otter', 'Luck — an otter happened to be available nearby'],
        answer: 'A deliberate chain of reasoning — grief, rejecting a replacement dog, a childhood fascination, and a cottage ringed by water fit for an otter',
        hook: 'Mijbil wasn\'t a whim; he was a decision with steps. And his settling in wasn\'t a straight line — joy one day, panic the next, like any wild thing learning a house.',
    },
    teaching: [
        { title: 'Maxwell\'s Decision to Keep an Otter After His Dog\'s Death', text: 'This topic examines Gavin Maxwell\'s pivotal decision to adopt an otter after the death of his dog Jonnie, analyzing how grief reshapes his life choices and sets the narrative in motion.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_engl_cbse_06_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Chart Mijbil\'s first days — the hiding, the bathroom experiments, the glorious chaos in water — and show why \'he adapted quickly\' only earns half the marks.',
        labels: ['Maxwell\'s Decision to Keep', 'Mijbil\'s Arrival from Iraq', 'Mijbil\'s Playful Behaviour', 'The Journey from Iraq', 'Mijbil on the Plane', 'Theme: Human-Animal Bond, Companionship'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_engl_cbse_06_001', title: 'Maxwell\'s Decision to Keep an Otter After His Dog\'s Death',
          caseStudy: { intro: 'Imagine you have lost a beloved pet that was your constant companion for years.',
            decisions: [{ prompt: 'What specific event triggers Gavin Maxwell\'s decision to get an otter instead of another dog?', options: [
                { text: 'The death of his dog Jonnie triggers Maxwell\'s decision', outcome: 'The death of his dog Jonnie triggers Maxwell\'s decision. A wrong answer (e.g., "he saw an otter.' },
                { text: 'he saw an otter in a zoo', outcome: 'Not quite — Students often believe Maxwell gets the otter on a sudden whim or because it\'s "cool" to have.', reveals: 'maxwell-gets-the-otter-on' },
                { text: 'a friend gave him one', outcome: 'Not quite — Students often believe Maxwell gets the otter on a sudden whim or because it\'s "cool" to have.', reveals: 'maxwell-gets-the-otter-on' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_06_002', title: 'Mijbil\'s Arrival from Iraq: Adaptation to the New Environment',
          caseStudy: { intro: 'Imagine you\'ve just brought a stray kitten home — it hides under the bed, refuses food, then slowly sniffs your hand.',
            decisions: [{ prompt: 'What are the first two places Mijbil explores in Maxwell\'s room, and what does his choice of these spaces suggest about his instincts?', options: [
                { text: 'Mijbil first explores the bathroom and the bed', outcome: 'Mijbil first explores the bathroom and the bed. The bathroom (with its water) triggers his.' },
                { text: 'he explored the whole room immediately', outcome: 'Not quite — Students treat Mijbil\'s adaptation as a linear "fear → comfort" arc, citing only the first night\'s.', reveals: 'students-treat-mijbil-s-adaptation' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_06_003', title: 'Mijbil\'s Playful Behaviour and Personality Traits',
          caseStudy: { intro: 'Imagine you are watching a pet invent a game with a household object — how would you describe its personality?',
            decisions: [{ prompt: 'List two specific playful activities Mijbil engages in during his early days with the author.', options: [
                { text: 'Mijbil juggles marbles on his back and learns to turn on the water tap to play in the', outcome: 'Mijbil juggles marbles on his back and learns to turn on the water tap to play in the running.' },
                { text: 'he plays with toys', outcome: 'Not quite — Students often treat Mijbil\'s play as merely "cute" or "funny" and write answers like "Mijbil.', reveals: 'students-often-treat-mijbil-s' },
                { text: 'he runs around', outcome: 'Not quite — Students often treat Mijbil\'s play as merely "cute" or "funny" and write answers like "Mijbil.', reveals: 'students-often-treat-mijbil-s' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_06_004', title: 'The Journey from Iraq to London: Challenges of Transporting Mijbil',
          caseStudy: { intro: 'Imagine you have to move a wild, energetic animal across two continents with strict airline rules and only a few hours to prepare — where would you start?',
            decisions: [{ prompt: 'What are the two cities Maxwell flies between to get Mijbil from Iraq to London, and why does he choose this route?', options: [
                { text: 'Maxwell flies from Basra to Paris, then Paris to London', outcome: 'Maxwell flies from Basra to Paris, then Paris to London, because British airlines would not carry.' },
                { text: 'direct flight to London', outcome: 'Not quite — Students often treat the journey as a simple sequence of events ("first this, then that") and.', reveals: 'students-often-treat-the-journey' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_06_005', title: 'Mijbil on the Plane: The Incident with the Otter on the Flight',
          caseStudy: { intro: 'Imagine you are on a flight and suddenly a small, wet, furry creature darts past your feet — panic spreads, but one crew member smiles and says, "Keep him.',
            decisions: [{ prompt: 'What is the immediate cause of Mijbil escaping from the box on the plane?', options: [
                { text: 'The box lid gives way', outcome: 'The box lid gives way because Mijbil has torn the lining to shreds, creating a gap he squeezes.' },
                { text: 'Maxwell opened the box', outcome: 'Not quite — Students often treat this episode as just a "funny story about an otter on a plane" and write plot.', reveals: 'students-often-treat-this-episode' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_06_006', title: 'Theme: Human-Animal Bond, Companionship and Responsibility',
          caseStudy: { intro: 'Imagine you have a pet dog or cat that greets you at the door, invents a game with a crumpled paper ball, and panics when you pack a suitcase — you instantly.',
            decisions: [{ prompt: 'Define the term "reciprocal bond" in the context of human-animal relationships as shown in *Mijbil the Otter*.', options: [
                { text: '**Correct Answer:** A reciprocal bond means both human and animal actively contribute to', outcome: '**Correct Answer:** A reciprocal bond means both human and animal actively contribute to the.' },
                { text: 'The theme is simply \'Maxwell loves his pet\' or \'Mijbil is a funny pet\'', outcome: 'Not quite — **Misconception:** *"The theme is simply \'Maxwell loves his pet\' or \'Mijbil is a funny pet\'."*.', reveals: 'misconception-the-theme-is-simply' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A friend\'s beloved dog dies, and within a week he is browsing exotic-pet ads, saying he just wants \'something unusual to stop feeling sad.\' He asks whether he should order the most interesting animal he can find.',
            decisions: [{ prompt: 'What does Maxwell\'s story of getting Mijbil the otter suggest about doing this well?', options: [
                { text: 'A new animal can genuinely heal grief — Maxwell was \'too sad to think of another dog,\' and the otter filled that emptiness — but he chose a creature that suited his watery Camusfearna home and then learned its needs. Healing through a pet works when the choice fits the animal\'s nature and your life, not just your mood.', outcome: 'Maxwell\'s decision joined emotion with suitability: the otter thrived because the environment and the owner\'s commitment matched what an otter actually is.' },
                { text: 'He should buy whatever animal looks cutest right away — Maxwell\'s story proves replacing a pet quickly is always the best cure for grief.', outcome: 'Maxwell did not pick at random — the otter fit his surroundings and habits; an impulse purchase of an unsuited animal would harm both the pet and the grieving owner.', reveals: 'any-pet-heals-grief' },
                { text: 'He should never get another pet, since getting a new animal means betraying the one he lost.', outcome: 'The story treats the new companion as healing, not betrayal — Maxwell\'s love for Mijbil did not erase his dog; it gave his affection somewhere to go.', reveals: 'new-pet-is-betrayal' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'A wild animal doesn\'t \'settle\'; it negotiates. Maxwell\'s patience and Mijbil\'s zig-zag trust are the real story of two species learning each other.',
            decisions: [{ prompt: 'What comes next? Mijbil the Otter · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Mijbil the Otter · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_engl_cbse_06_001', difficulty: 'standard',
          question: 'This topic examines Gavin Maxwell\'s pivotal decision to adopt an otter after.',
          hint: 'Review c9_engl_ch1_2 (Grandmother\'s motivation to learn) — practice separating "she.',
          misconception: 'Students often believe Maxwell gets the otter on a sudden whim or because it\'s "cool" to have an exotic pet.',
          parts: [
                { id: 'a', prompt: 'What specific event triggers Gavin Maxwell\'s decision to get an otter instead of another dog?', answer: 'The death of his dog Jonnie triggers Maxwell\'s decision',
                  options: ['The death of his dog Jonnie triggers Maxwell\'s decision', 'he saw an otter in a zoo', 'a friend gave him one'],
                  hint: 'Review c9_engl_ch1_2 (Grandmother\'s motivation to learn) — practice separating "she wanted to read".',
                  misconception: 'Students often believe Maxwell gets the otter on a sudden whim or because it\'s "cool" to have an exotic pet.' },
                { id: 'b', prompt: 'Explain in your own words why Maxwell feels an otter would be more suitable for his life at Camusfearna than another dog.', answer: 'Maxwell lives in a remote cottage surrounded by water',
                  options: ['Maxwell lives in a remote cottage surrounded by water', 'he liked otters as a child'],
                  hint: 'Review c9_engl_ch1_2 (Grandmother\'s motivation to learn) — practice separating "she wanted to read".',
                  misconception: 'Students often believe Maxwell gets the otter on a sudden whim or because it\'s "cool" to have an exotic pet.' },
                { id: 'c', prompt: 'Compare Maxwell\'s approach to getting a new pet after loss with a typical person\'s reaction. What does this comparison reveal about his character?', answer: 'Most people would replace a dog with another dog for familiarity',
                  options: ['Most people would replace a dog with another dog for familiarity', 'he is an animal lover'],
                  hint: 'Review c9_engl_ch1_2 (Grandmother\'s motivation to learn) — practice separating "she wanted to read".',
                  misconception: 'Students often believe Maxwell gets the otter on a sudden whim or because it\'s "cool" to have an exotic pet.' }
          ],
            remediations: { 'maxwell-gets-the-otter-on': { steps: ['**Re-read the first three paragraphs slowly**, highlighting every transition word (however, therefore, moreover) that.', '**Create a two-column table**: left column = "Feeling/Thought," right column = "Action Taken." Fill it: Grief → No new.', '**Verbally explain the chain** to a peer: "First he felt X, so he did Y, because Z." 4.', '**Rewrite the decision as a flowchart** with arrows showing cause-effect.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_06_002', difficulty: 'standard',
          question: 'This topic covers the initial phase of Mijbil\'s life with Maxwell after being.',
          hint: 'If stuck, review c9_engl_ch1_7 (first-person narrative perspective) and c6_english_u1_002.',
          misconception: 'Students treat Mijbil\'s adaptation as a linear "fear → comfort" arc, citing only the first night\'s hiding and the later.',
          parts: [
                { id: 'a', prompt: 'What are the first two places Mijbil explores in Maxwell\'s room, and what does his choice of these spaces suggest about his instincts?', answer: 'Mijbil first explores the bathroom and the bed',
                  options: ['Mijbil first explores the bathroom and the bed', 'he explored the whole room immediately'],
                  hint: 'If stuck, review c9_engl_ch1_7 (first-person narrative perspective) and c6_english_u1_002.',
                  misconception: 'Students treat Mijbil\'s adaptation as a linear "fear → comfort" arc, citing only the first night\'s hiding and the later playfulness.' },
                { id: 'b', prompt: 'Maxwell writes: "He spent most of his time in the bathroom... playing with the water for hours." Why does the author emphasize *duration* ("hours") and.', answer: 'The emphasis on duration and repetition demonstrates *compulsive* engagement',
                  options: ['The emphasis on duration and repetition demonstrates *compulsive* engagement', 'to show he was happy'],
                  hint: 'If stuck, review c9_engl_ch1_7 (first-person narrative perspective) and c6_english_u1_002.',
                  misconception: 'Students treat Mijbil\'s adaptation as a linear "fear → comfort" arc, citing only the first night\'s hiding and the later playfulness.' }
          ],
            remediations: { 'students-treat-mijbil-s-adaptation': { steps: ['Have the student create a 3-column timeline: Day 1, Day 3, Day 7.', 'In each column, list *only* observable actions (not feelings) from the text: e.g., Day 1 — "pressed into corner,".', 'Ask: "Where does he go backward?" (e.g., Day 3 he sleeps on bed but Day 4 he\'s back in bathroom).', 'Rewrite the answer using this pattern: "Adaptation is not linear; on Day X he does Y (progress) but on Day Z he reverts.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_06_003', difficulty: 'standard',
          question: 'Mijbil\'s playful behaviour and personality traits refer to the distinctive.',
          hint: 'Review the PEEL structure for character analysis from Class 9 (c9_engl_ch1_2) and.',
          misconception: 'Students often treat Mijbil\'s play as merely "cute" or "funny" and write answers like "Mijbil is playful and naughty".',
          parts: [
                { id: 'a', prompt: 'Explain why Mijbil\'s ability to turn on the water tap demonstrates intelligence rather than mere instinct.', answer: 'Turning a tap requires understanding cause-effect (paw pressure → water flow),',
                  options: ['Turning a tap requires understanding cause-effect (paw pressure → water flow),', 'otters like water so it\'s natural'],
                  hint: 'Review the PEEL structure for character analysis from Class 9 (c9_engl_ch1_2) and practice with.',
                  misconception: 'Students often treat Mijbil\'s play as merely "cute" or "funny" and write answers like "Mijbil is playful and naughty" without linking each.' }
          ],
            remediations: { 'students-often-treat-mijbil-s': { steps: ['Have the student re-read the three key play paragraphs (marbles, tap, suitcase).', 'For each, complete a three-column table: Incident | Trait Shown | Exact Words from Text.', 'Then model one PEEL paragraph: Point (trait), Evidence (quote), Explanation (how quote proves trait), Link (to theme).', 'Repeat until they can do it independently.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_06_004', difficulty: 'standard',
          question: 'This topic examines the logistical and emotional challenges Maxwell faces while.',
          hint: 'Review "Plot and Setting" (c6_english_u4_031) and "Narrative and Adventure Writing".',
          misconception: 'Students often treat the journey as a simple sequence of events ("first this, then that") and forget that each obstacle.',
          parts: [
                { id: 'a', prompt: 'What are the two cities Maxwell flies between to get Mijbil from Iraq to London, and why does he choose this route?', answer: 'Maxwell flies from Basra to Paris, then Paris to London',
                  options: ['Maxwell flies from Basra to Paris, then Paris to London', 'direct flight to London'],
                  hint: 'Review "Plot and Setting" (c6_english_u4_031) and "Narrative and Adventure Writing".',
                  misconception: 'Students often treat the journey as a simple sequence of events ("first this, then that") and forget that each obstacle (box size, driver.' },
                { id: 'b', prompt: 'Compare Maxwell\'s preparation for the journey (box-making, timing, dealing with officials) with his earlier preparation for Mijbil\'s arrival (node.', answer: 'Initially he improvised a habitat',
                  options: ['Initially he improvised a habitat', 'one was in Iraq, one in London', 'lists only surface differences (e'],
                  hint: 'Review "Plot and Setting" (c6_english_u4_031) and "Narrative and Adventure Writing".',
                  misconception: 'Students often treat the journey as a simple sequence of events ("first this, then that") and forget that each obstacle (box size, driver.' }
          ],
            remediations: { 'students-often-treat-the-journey': { steps: ['Have the student create a two-column table: Column A = each challenge (regulation, time, Mijbil\'s behavior); Column.', 'Ask them to underline verbs in Column B that show planning (measured, drilled, negotiated).', 'Practice writing one PEEL paragraph using one row: Point = resourcefulness, Evidence = "drilled ventilation holes".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_06_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat the journey as a simple sequence of events ("first this, then that") and forget that each obstacle.',
          parts: [
                { id: 'a', prompt: 'Evaluate the author\'s decision to include the episode of the missing driver and the rush to the airport.', answer: 'It heightens tension: (1) the ticking clock forces Maxwell to make split-second',
                  options: ['It heightens tension: (1) the ticking clock forces Maxwell to make split-second', 'unnecessary', 'calls it "unnecessary" ignores the narrative pacing function'],
                  hint: 'Review "Plot and Setting" (c6_english_u4_031) and "Narrative and Adventure Writing".',
                  misconception: 'Students often treat the journey as a simple sequence of events ("first this, then that") and forget that each obstacle (box size, driver.' }
          ],
            remediations: { 'students-often-treat-the-journey': { steps: ['Have the student create a two-column table: Column A = each challenge (regulation, time, Mijbil\'s behavior); Column.', 'Ask them to underline verbs in Column B that show planning (measured, drilled, negotiated).', 'Practice writing one PEEL paragraph using one row: Point = resourcefulness, Evidence = "drilled ventilation holes".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_06_005', difficulty: 'standard',
          question: 'This topic covers the pivotal in-flight episode where Mijbil escapes from his.',
          hint: 'If stuck, review c10_engl_cbse_06_003 (Mijbil\'s personality) and c10_engl_cbse_06_004.',
          misconception: 'Students often treat this episode as just a "funny story about an otter on a plane" and write plot summaries instead.',
          parts: [
                { id: 'a', prompt: 'What is the immediate cause of Mijbil escaping from the box on the plane?', answer: 'The box lid gives way',
                  options: ['The box lid gives way', 'Maxwell opened the box'],
                  hint: 'If stuck, review c10_engl_cbse_06_003 (Mijbil\'s personality) and c10_engl_cbse_06_004 (journey.',
                  misconception: 'Students often treat this episode as just a "funny story about an otter on a plane" and write plot summaries instead of analyzing the air.' },
                { id: 'b', prompt: 'Why does the air hostess allow Maxwell to keep Mijbil on his knee instead of insisting he return the otter to the box?', answer: 'She sees Mijbil is terrified and recognizes the bond between them',
                  options: ['She sees Mijbil is terrified and recognizes the bond between them', 'She was afraid of the otter', 'She didn\'t care about rules'],
                  hint: 'If stuck, review c10_engl_cbse_06_003 (Mijbil\'s personality) and c10_engl_cbse_06_004 (journey.',
                  misconception: 'Students often treat this episode as just a "funny story about an otter on a plane" and write plot summaries instead of analyzing the air.' }
          ],
            remediations: { 'students-often-treat-this-episode': { steps: ['Re-read the episode focusing ONLY on the air hostess\'s dialogue and actions.', 'Highlight every verb describing her (e.g., "suggested," "understood," "smiled").', 'For each verb, ask: "Does this show rule-following or empathy?"', 'Write two sentences: "The air hostess first follows protocol by ___ but then chooses empathy by ___."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_06_006', difficulty: 'standard',
          question: 'The theme of **Human-Animal Bond, Companionship and Responsibility** in *Mijbil.',
          hint: 'If stuck, review **c9_engl_ch4_4 (Theme: Caring for the Elderly)** — the PEEL structure.',
          misconception: '**Misconception:** *"The theme is simply \'Maxwell loves his pet\' or \'Mijbil is a funny pet\'."* **Why students make this.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how the "bathroom tap incident" (Mijbil turning on the tap) illustrates *both* companionship and responsibility.', answer: '**Correct Answer:** The tap incident shows companionship',
                  options: ['**Correct Answer:** The tap incident shows companionship', 'Mijbil liked water', 'Maxwell built a pool', 'explain'],
                  hint: 'If stuck, review **c9_engl_ch4_4 (Theme: Caring for the Elderly)** — the PEEL structure for theme.',
                  misconception: '**Misconception:** *"The theme is simply \'Maxwell loves his pet\' or \'Mijbil is a funny pet\'."* **Why students make this error:** They.' },
                { id: 'b', prompt: 'Apply the concept of "responsible guardianship" to a new situation: Maxwell discovers Mijbil has a sensitive stomach and cannot eat the local fish in London.', answer: '**Correct Answer with Steps:** 1',
                  options: ['**Correct Answer with Steps:** 1', 'feed him something else', 'take him to a doctor', 'The theme is simply \'Maxwell loves his pet\' or \'Mijbil is a funny pet\''],
                  hint: 'If stuck, review **c9_engl_ch4_4 (Theme: Caring for the Elderly)** — the PEEL structure for theme.',
                  misconception: '**Misconception:** *"The theme is simply \'Maxwell loves his pet\' or \'Mijbil is a funny pet\'."* **Why students make this error:** They.' }
          ],
            remediations: { 'misconception-the-theme-is-simply': { steps: ['**Step-by-step remediation:** 1.', '**Re-read only the box incident (para 12-14 in NCERT).** Highlight every verb showing Maxwell\'s *choice* (refused.', 'Ask: "Why didn\'t he put Mijbil in the cargo hold?" → Answer: *Because responsibility = proximity during crisis.* 2.', '**Make a 3-column table:** Column A: Mijbil\'s Wild Instinct (tap, marbles, escaping box).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
