import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_v_ch03_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_v_ch03_p3: SimDef = {
    id: 'v3_c11_hin_v_ch03_p3',
    title: 'पाठ 3 · Part 3/3',
    subtitle: 'Watch a domestic worker cross the line from serving stories to writing one.',
    classLevel: 11, subject: 'hin_v', topic: 'पाठ 3 · Part 3/3',
    chapters: ['c11_hin_v_ch03'],
    nodeIds: ['c11_hin_v_cbse_03_013', 'c11_hin_v_cbse_03_014', 'c11_hin_v_cbse_03_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader inside a Partition-displaced woman\'s first-person voice', intro: 'A widowed domestic worker in a lawyer\'s Delhi household gets a notebook — and the household\'s power arrangement quietly inverts.', goal: 'Analyse autobiographical fiction\'s blurred boundaries and the story\'s arc toward self-expression.' },
    discovery: {
        question: '\'Sobti wrote this to show how hard life was for poor women in the 1950s\' — what does that reading miss?',
        options: ['That autobiographical fiction is crafted, not documented — blurred author-narrator lines, fragmented memory, and tactical silence are the strategy', 'Nothing — it\'s plain social reporting', 'That she invented the suffering entirely', 'That domestic work was actually easy then'],
        answer: 'That autobiographical fiction is crafted, not documented — blurred author-narrator lines, fragmented memory, and tactical silence are the strategy',
        hook: 'The protagonist performs the \'good servant\' when it suits her and refuses questions when it doesn\'t — resistance here is tactical, not absolute.',
    },
    teaching: [
        { title: 'पाठ 3 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) किसी पाठ के गहन विश्लेषण और व्याख्या की वह प्रक्रिया है जिसमें पाठक पाठ के अंतर्निहित अर्थ, संरचनात्मक युक्तियों, लेखकीय उद्देश्य और सामाजिक-सांस्कृतिक प्रसंग को.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_v_cbse_03_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Find the inciting incident — the lawyer\'s wife handing over a notebook — and defend the climax where a servant reads her own story aloud.',
        labels: ['पाठ 3 — आलोचनात्मक', 'पाठ 3 — लेखन', 'पाठ 3 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_v_cbse_03_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 3 · Part 3/3', spots: [
            { id: 's1', label: '3 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल वह विधि है जिसमें किसी साहित्यिक पाठ (कहानी, उपन्यास-अंश, निबंध) के.', answer: '3 -', options: ['3 -', '3 - -'] },
            { id: 's2', label: '3 - -', prompt: 'Which idea is this? — चर्चा-बिंदु (Discussion Points) are open-ended, analytical prompts designed to elicit.', answer: '3 - -', options: ['3 - -', '3 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_03_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your reading group discusses Krishna Sobti\'s \'व्यक्ति\' — a widowed domestic worker in a lawyer\'s household narrating her own life. A member says: \'It\'s a simple sad life story — husband left, children grew, mother died. Nothing literary about it.\'',
            decisions: [{ prompt: 'What makes the text a literary act, not just a sad story?', options: [
                { text: 'Locate the conditions of possibility: a Partition-displaced Punjabi woman writing first-person domestic labour in 1950s Hindi — when few women published such narratives — is itself the claim: voice claimed where the tradition erased working-class women. And the structure mirrors the theme: external events (gaining literacy, writing her story) run parallel to the internal arc of finding her voice — the first-person \'मैं\' is the point.', outcome: 'The group sees it: the \'simple\' plot is deliberately arranged so that learning to write IS the climax — testimony becoming literature.' },
                { text: 'Agree it\'s just a life story — summarise the events and move on.', outcome: 'Event-listing confuses story with plot: the husband\'s death is backstory, literacy is the causal spine — selection and arrangement are the authorial design.', reveals: 'just-a-sad-life-story' },
                { text: 'Call it autobiography — Sobti is describing her own life in a lawyer\'s house.', outcome: 'First-person voice isn\'t autobiography: Sobti constructs a persona — a domestic worker narrating — and the act of writing within the story dramatises that construction.', reveals: 'first-person-means-autobiography' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_03_015', title: 'You made it',
          caseStudy: { intro: 'The notebook and pen turn a worker into an author — the climax isn\'t publication, it\'s being heard by the person who gave them.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_03_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) किसी पाठ के गहन विश्लेषण और व्याख्या की वह.',
          hint: 'यदि फँसें तो **c11_hin_v_cbse_03_008 और c11_hin_v_cbse_03_009** (साहित्यिक युक्तियाँ).',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"अच्छे शब्दों/अलंकारों की सूची बना देना ही विश्लेषण है"** — उदाहरण के लिए.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) किसी पाठ के गहन विश्लेषण और व्याख्या की वह प्रक्रिया',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) किसी पाठ के गहन विश्लेषण और व्याख्या की वह प्रक्रिया', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के जीवन-वृत्त', 'कथानक किसी कहानी में घटित घटनाओं का क्रमिक序列 है, जबकि आख्यान-संरचना वह तरीका है जिससे', 'पाठ्य-परिवेश (Setting/Background) किसी रचना में कथानक घटित होने का समग्र वातावरण है'],
                  hint: 'यदि फँसें तो **c11_hin_v_cbse_03_008 और c11_hin_v_cbse_03_009** (साहित्यिक युक्तियाँ) दोहराएँ.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"अच्छे शब्दों/अलंकारों की सूची बना देना ही विश्लेषण है"** — उदाहरण के लिए, पाठ में 5 रूपक गिनाकर.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र से कहें: "एक युक्ति चुनो (जैसे रूपक) और **केवल उसी** पर 3 वाक्य लिखो: (क) यह क्या कहता है?', '(ख) पाठक को क्या महसूस कराता है?', '(ग) मुख्य विषय से कैसे जुड़ता है?" — इससे **सूची बनाने की आदत टूटती है**। **चरण 2:** एक **मॉडल उत्तर** दिखाएँ जहाँ उसी.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_03_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल वह विधि है जिसमें किसी साहित्यिक पाठ (कहानी, उपन्यास-अंश.',
          hint: 'यदि प्रमाण नहीं मिल रहे, तो पाठ के \'मुख्य विषय और संदेश\' (c11_hin_v_cbse_03_006) और.',
          misconception: 'छात्र मानते हैं कि \'पाठ-आधारित उत्तर\' का अर्थ पाठ का अनुवाद या सारांश लिखना है। वे प्रश्न के \'विश्लेषण कीजिए\', \'विवेचना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल वह विधि है जिसमें किसी साहित्यिक पाठ (कहानी, उपन्यास-अंश, निबंध) के',
                  options: ['पाठ-आधारित लेखन कौशल वह विधि है जिसमें किसी साहित्यिक पाठ (कहानी, उपन्यास-अंश, निबंध) के', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के जीवन-वृत्त', 'कथानक किसी कहानी में घटित घटनाओं का क्रमिक序列 है, जबकि आख्यान-संरचना वह तरीका है जिससे', 'पाठ्य-परिवेश (Setting/Background) किसी रचना में कथानक घटित होने का समग्र वातावरण है'],
                  hint: 'यदि प्रमाण नहीं मिल रहे, तो पाठ के \'मुख्य विषय और संदेश\' (c11_hin_v_cbse_03_006) और \'पात्र-चित्रण\'.',
                  misconception: 'छात्र मानते हैं कि \'पाठ-आधारित उत्तर\' का अर्थ पाठ का अनुवाद या सारांश लिखना है। वे प्रश्न के \'विश्लेषण कीजिए\', \'विवेचना कीजिए\', \'आलोचना.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें कि वह अपना लिखा उत्तर पढ़े और प्रत्येक पैराग्राफ के आगे P, E, E, L लिखे — जहाँ अक्षर न लिख पाए.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_03_015', difficulty: 'standard',
          question: 'चर्चा-बिंदु (Discussion Points) are open-ended, analytical prompts designed.',
          hint: 'यदि अटके, तो c11_hin_v_cbse_03_013 (आलोचनात्मक चिंतन) के \'विश्लेषण और व्याख्या\' चरण को.',
          misconception: 'विद्यार्थी समझते हैं कि चर्चा-बिंदु का उद्देश्य \'शिक्षक के मन का उत्तर\' ढूँढ़ना है — इसलिए वे पाठ को \'खजाने की खोज\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'चर्चा-बिंदु (Discussion Points) are open-ended, analytical prompts designed to elicit',
                  options: ['चर्चा-बिंदु (Discussion Points) are open-ended, analytical prompts designed to elicit', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के जीवन-वृत्त', 'कथानक किसी कहानी में घटित घटनाओं का क्रमिक序列 है, जबकि आख्यान-संरचना वह तरीका है जिससे', 'पाठ्य-परिवेश (Setting/Background) किसी रचना में कथानक घटित होने का समग्र वातावरण है'],
                  hint: 'यदि अटके, तो c11_hin_v_cbse_03_013 (आलोचनात्मक चिंतन) के \'विश्लेषण और व्याख्या\' चरण को दोहराएँ.',
                  misconception: 'विद्यार्थी समझते हैं कि चर्चा-बिंदु का उद्देश्य \'शिक्षक के मन का उत्तर\' ढूँढ़ना है — इसलिए वे पाठ को \'खजाने की खोज\' (treasure hunt) की तरह.' }
          ],
            remediations: { 'treasure-hunt': { steps: ['चरण 1: विद्यार्थी को एक छोटा प्रसंग (4-5 पंक्तियाँ) दें और कहें: "इसके *पाँच* अलग-अलग अर्थ निकालो, प्रत्येक के लिए एक.', 'दोनों को एक साथ कैसे सत्य माना जा सकता है?" चरण 3: उसे \'दावा-साक्ष्य-विश्लेषण-समाहार\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
