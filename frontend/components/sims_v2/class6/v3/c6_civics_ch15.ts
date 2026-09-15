import type { SimDef } from '../../engine/types';

/** v3 generated — c6_civics_ch15 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_civics_ch15: SimDef = {
    id: 'v3_c6_civics_ch15',
    title: 'Media and Democracy',
    subtitle: 'What disappears when the news does?',
    classLevel: 6, subject: 'civics', topic: 'Media and Democracy',
    chapters: ['c6_civics_ch15'],
    nodeIds: ['c6_civics_ch15_035', 'c6_civics_ch15_036', 'c6_civics_ch15_037', 'c6_civics_ch15_038'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'editor of a busy newsroom for a day', intro: 'A flood in one state, a new law in Delhi, a scam in the municipal office — three stories, one deadline. What do the people most need to know?', goal: 'See media as a democratic tool that keeps citizens informed and governments honest.' },
    discovery: {
        question: 'A country bans all newspapers, TV news and internet reports overnight — movies and music stay, but news is gone. Entertainment survives, so what is actually lost?',
        options: ['Citizens lose the facts they need to check the government — media is democracy\'s watchdog, not just fun', 'Nothing important — media was only ever entertainment anyway', 'Only celebrities lose the spotlight; ordinary citizens are unaffected', 'People lose TV, but the government automatically becomes more honest'],
        answer: 'Citizens lose the facts they need to check the government — media is democracy\'s watchdog, not just fun',
        hook: 'Media is the messenger between rulers and ruled. Take it away and citizens can\'t see what the government is doing — and a government nobody watches can do anything.',
    },
    teaching: [
        { title: 'What is Media and Its Role in Democracy', text: 'Media refers to all the tools and channels—such as newspapers, television, radio, and the internet—that we use to share information with large groups of people.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_civics_ch15_035', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run a newsroom for one hectic day — pick which stories citizens must hear, chase the facts, and hold the powerful to account.',
        labels: ['What is Media', 'Types of Media: Print,', 'Media Ethics and Responsibility', 'Being a Critical Media'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c6_civics_ch15_035', title: 'What is Media and Its Role in Democracy',
          caseStudy: { intro: 'Have you ever wondered how you know about a new law passed in Delhi or a flood happening in another state?',
            decisions: [{ prompt: 'Name three different forms of mass communication that are considered "media."', options: [
                { text: 'Newspapers, television, and the internet', outcome: 'Newspapers, television, and the internet. A wrong answer (like "my teacher" or "a phone call").' },
                { text: 'my teacher', outcome: 'Not quite — Students often think the media is just for "entertainment" (like movies or music) rather than.', reveals: 'the-media-is-just-for' },
                { text: 'a phone call', outcome: 'Not quite — Students often think the media is just for "entertainment" (like movies or music) rather than.', reveals: 'the-media-is-just-for' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch15_036', title: 'Types of Media: Print, Electronic, Digital',
          caseStudy: { intro: 'Think about how you learned about the weather this morning or the latest cricket score.',
            decisions: [{ prompt: 'What are the three main types of media discussed in this chapter?', options: [
                { text: 'The three types are Print, Electronic, and Digital media', outcome: 'The three types are Print, Electronic, and Digital media. A student who misses one type likely.' },
                { text: 'Electronic', outcome: 'Not quite — Students often think "Electronic" and "Digital" are the same thing because both use electricity.', reveals: 'electronic-and-digital-are-the' },
                { text: 'Digital', outcome: 'Not quite — Students often think "Electronic" and "Digital" are the same thing because both use electricity.', reveals: 'electronic-and-digital-are-the' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch15_037', title: 'Media Ethics and Responsibility',
          caseStudy: { intro: 'Have you ever seen two people tell the same story differently?',
            decisions: [{ prompt: 'What does "accuracy" mean in the context of media ethics?', options: [
                { text: 'Accuracy means reporting facts correctly and verifying information with reliable sources', outcome: 'Accuracy means reporting facts correctly and verifying information with reliable sources before.' },
                { text: 'accuracy', outcome: 'Not quite — Students often believe "media" is the same as "opinion." They assume that because a person is on.', reveals: 'media-is-the-same-as' },
                { text: 'popularity', outcome: 'Not quite — Students often believe "media" is the same as "opinion." They assume that because a person is on.', reveals: 'media-is-the-same-as' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch15_038', title: 'Being a Critical Media Consumer',
          caseStudy: { intro: 'Imagine you see a viral video on your phone claiming that "Schools in your city will be closed for a whole month starting tomorrow." Instead of panicking.',
            decisions: [{ prompt: 'What is the first step you should take when you see a shocking piece of news online?', options: [
                { text: 'The first step is to identify who created or reported the information', outcome: 'The first step is to identify who created or reported the information.' },
                { text: 'immediately sharing it with friends', outcome: 'Not quite — Students often assume that if a piece of information has a photo or a video attached, it must.', reveals: 'if-a-piece-of-information' },
                { text: 'if a piece of information has a photo or a video attached, it must be 100% true', outcome: 'Not quite — Students often assume that if a piece of information has a photo or a video attached, it must.', reveals: 'if-a-piece-of-information' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch15_035', title: 'Use it in the wild',
          caseStudy: { intro: 'The municipal council quietly approves a highway that will cut through the city\'s oldest public park. Most residents don\'t know yet. A young reporter at the local paper gets hold of the plan.',
            decisions: [{ prompt: 'What can the newspaper actually do here?', options: [
                { text: 'Inform the public before the decision is final — once residents read about the plan they can protest, question their councillors and demand hearings. The media acts as democracy\'s watchdog: it carries information from the government to the people, and public pressure back to the government, which is exactly why it is called a pillar alongside the courts.', outcome: 'Without the report, the highway would be discovered only when the trees fell — media turns a closed decision into a public debate while change is still possible.' },
                { text: 'Nothing much — newspapers only report events after they happen, so the park is already lost.', outcome: 'Reporting plans before execution is precisely the watchdog role — early information is what lets citizens intervene rather than merely grieve.', reveals: 'media-only-reports' },
                { text: 'The paper should stay out of it — reporting a government plan would be interfering in governance.', outcome: 'Informing citizens about public decisions is the media\'s democratic function, not interference — a government answerable to people needs the people to know.', reveals: 'reporting-is-interference' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch15_038', title: 'You made it',
          caseStudy: { intro: 'Free media isn\'t a bonus feature of democracy — it\'s the fourth pillar holding the roof up. No news means no one watching the watchers.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_civics_ch15_035', difficulty: 'standard',
          question: 'Media refers to all the tools and channels—such as newspapers, television.',
          hint: 'Review the "Three Organs of Government" to see how power is shared.',
          misconception: 'Students often think the media is just for "entertainment" (like movies or music) rather than a tool for democratic.',
          parts: [
                { id: 'a', prompt: 'Name three different forms of mass communication that are considered "media."', answer: 'Newspapers, television, and the internet',
                  options: ['Newspapers, television, and the internet', 'my teacher', 'a phone call', 'entertainment'],
                  hint: 'Review the "Three Organs of Government" to see how power is shared.',
                  misconception: 'Students often think the media is just for "entertainment" (like movies or music) rather than a tool for democratic responsibility.' }
          ],
            remediations: { 'the-media-is-just-for': { steps: ['Ask the student: "If you were the class monitor, how would you let everyone know about a new rule the principal made?".', 'Then, ask why it is important that they tell the truth rather than just making up jokes.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_civics_ch15_036', difficulty: 'standard',
          question: 'Media refers to the various channels or tools used to communicate information.',
          hint: 'Review the definitions of "mass media" versus "personal communication."',
          misconception: 'Students often think "Electronic" and "Digital" are the same thing because both use electricity.',
          parts: [
                { id: 'a', prompt: 'What are the three main types of media discussed in this chapter?', answer: 'The three types are Print, Electronic, and Digital media',
                  options: ['The three types are Print, Electronic, and Digital media', 'Electronic', 'Digital', '"Electronic" and "Digital" are the same thing'],
                  hint: 'Review the definitions of "mass media" versus "personal communication."',
                  misconception: 'Students often think "Electronic" and "Digital" are the same thing because both use electricity.' },
                { id: 'b', prompt: 'Why is print media still considered important in rural India even though we have smartphones?', answer: 'Print media remains important',
                  options: ['Print media remains important', 'it\'s faster', 'Electronic', 'Digital'],
                  hint: 'Review the definitions of "mass media" versus "personal communication."',
                  misconception: 'Students often think "Electronic" and "Digital" are the same thing because both use electricity.' },
                { id: 'c', prompt: 'If you are reading a news story on a website using your laptop, which category of media are you using?', answer: 'You are using digital media',
                  options: ['You are using digital media', 'electronic', 'Digital', '"Electronic" and "Digital" are the same thing'],
                  hint: 'Review the definitions of "mass media" versus "personal communication."',
                  misconception: 'Students often think "Electronic" and "Digital" are the same thing because both use electricity.' },
                { id: 'd', prompt: 'Compare the speed of news delivery between print media and electronic media. Which is faster?', answer: 'Electronic media (TV/Radio) is faster',
                  options: ['Electronic media (TV/Radio) is faster', 'Electronic', 'Digital', '"Electronic" and "Digital" are the same thing'],
                  hint: 'Review the definitions of "mass media" versus "personal communication."',
                  misconception: 'Students often think "Electronic" and "Digital" are the same thing because both use electricity.' }
          ],
            remediations: { 'electronic-and-digital-are-the': { steps: ['First, ask the student if they need an internet connection to watch a standard TV channel (like Doordarshan).', 'Once they say "no," explain that TV is electronic.', 'Then, ask if they need Wi-Fi to read a news blog, explaining that this requirement makes it digital.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_civics_ch15_036', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "Electronic" and "Digital" are the same thing because both use electricity.',
          parts: [
                { id: 'a', prompt: 'Is a magazine considered digital media? Why or why not?', answer: 'No, a traditional magazine is print media',
                  options: ['No, a traditional magazine is print media', 'they are likely confusing', 'e-magazines', 'Electronic'],
                  hint: 'Review the definitions of "mass media" versus "personal communication."',
                  misconception: 'Students often think "Electronic" and "Digital" are the same thing because both use electricity.' }
          ],
            remediations: { 'electronic-and-digital-are-the': { steps: ['First, ask the student if they need an internet connection to watch a standard TV channel (like Doordarshan).', 'Once they say "no," explain that TV is electronic.', 'Then, ask if they need Wi-Fi to read a news blog, explaining that this requirement makes it digital.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_civics_ch15_037', difficulty: 'standard',
          question: 'Media ethics are the set of moral rules that guide journalists to report the.',
          hint: 'Review the definition of democracy and the role of the citizen.',
          misconception: 'Students often believe "media" is the same as "opinion." They assume that because a person is on TV or writing a blog.',
          parts: [
                { id: 'a', prompt: 'Why is it ethically wrong for a reporter to share the private home address of a crime victim?', answer: 'It violates the principle of "privacy,"',
                  options: ['It violates the principle of "privacy,"', 'is the same as', 'because a person is on TV or writing a blog, everything they say is a "fact', '"media" is the same as "opinion'],
                  hint: 'Review the definition of democracy and the role of the citizen.',
                  misconception: 'Students often believe "media" is the same as "opinion." They assume that because a person is on TV or writing a blog, everything they say.' }
          ],
            remediations: { 'media-is-the-same-as': { steps: ['Ask the student to find two different news reports on the same event from two different sources.', 'Ask them to underline "facts" in one color and "opinions" in another.', 'Point out how the factual reporting stays the same, but opinions change, helping them see the difference between.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_civics_ch15_038', difficulty: 'standard',
          question: 'Being a critical media consumer means that instead of believing everything.',
          hint: 'Review the section in the textbook on "Three Organs of Government" to understand who.',
          misconception: 'Students often assume that if a piece of information has a photo or a video attached, it must be 100% true.',
          parts: [
                { id: 'a', prompt: 'What is the first step you should take when you see a shocking piece of news online?', answer: 'The first step is to identify who created or reported the information',
                  options: ['The first step is to identify who created or reported the information', 'immediately sharing it with friends', 'if a piece of information has a photo or a video attached, it must be 100% true'],
                  hint: 'Review the section in the textbook on "Three Organs of Government" to understand who holds official.',
                  misconception: 'Students often assume that if a piece of information has a photo or a video attached, it must be 100% true.' }
          ],
            remediations: { 'if-a-piece-of-information': { steps: ['Ask the student to find two photos of the same event from different news websites.', 'Have them compare what the photos show and what the captions say.', 'Point out how the same event can look different depending on who is reporting it, helping them realize that visual.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
