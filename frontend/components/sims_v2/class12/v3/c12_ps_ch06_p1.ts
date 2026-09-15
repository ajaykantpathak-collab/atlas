import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ps_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ps_ch06_p1: SimDef = {
    id: 'v3_c12_ps_ch06_p1',
    title: 'International Organisations · Part 1/2',
    subtitle: 'Why sovereign states build clubs they then complain about',
    classLevel: 12, subject: 'political_science', topic: 'International Organisations · Part 1/2',
    chapters: ['c12_ps_ch06'],
    nodeIds: ['c12_ps_cbse_06_001', 'c12_ps_cbse_06_002', 'c12_ps_cbse_06_003', 'c12_ps_cbse_06_004', 'c12_ps_cbse_06_005', 'c12_ps_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Multilateral institutions analyst', intro: 'A virus ignores borders; a finance minister cannot. Something has to bridge that gap — and it isn\'t a world government.', goal: 'Explain why states create international organisations and how design choices solve collective-action problems without enforcement power.' },
    discovery: {
        question: 'The UN has no army, can\'t tax anyone, and runs on a budget a mid-sized government would call pocket change — so why do even superpowers keep funding it and showing up?',
        options: ['Standing rules, monitoring and permanent forums make cooperation cheaper and more predictable than renegotiating every crisis alone', 'Because the UN can legally compel any state to obey', 'Tradition — states attend out of habit, not interest', 'Small states fund it; big states merely tolerate it'],
        answer: 'Standing rules, monitoring and permanent forums make cooperation cheaper and more predictable than renegotiating every crisis alone',
        hook: 'The UN is not a world government — it cannot draft soldiers, levy taxes or legislate, and its resolutions bind only because member states agreed to accept them. It\'s a cooperation machine built by sovereign states, not a sovereign over them.',
    },
    teaching: [
        { title: 'The Need for International Organisations in a Globalised World', text: 'International organisations are formal institutions created by states through treaties to facilitate cooperation on transnational issues that exceed the capacity of any single state to resolve alone.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ps_cbse_06_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Diagnose the collective-action problems — free-riding, uncoordinated bans, unfunded public goods — that no state can fix alone, and match each to what an international organisation actually does.',
        labels: ['The Need for International', 'The UN System: General', 'UN Security Council: Permanent', 'Reform of the UN', 'Specialised Agencies: UNESCO, UNICEF,', 'UN Peacekeeping Operations: Mandate,'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_ps_cbse_06_001', title: 'The Need for International Organisations in a Globalised World',
          caseStudy: { intro: 'Imagine a Class 12 student reading news about a new pandemic spreading across borders — no single country can develop vaccines, enforce travel rules, or share.',
            decisions: [{ prompt: 'What is the primary reason states establish international organisations, according to the collective-action perspective?', options: [
                { text: 'The primary reason is to overcome collective action problems', outcome: 'The primary reason is to overcome collective action problems — situations where individual states.' },
                { text: 'to create a world government', outcome: 'Not quite — Students often believe international organisations are "world governments" with independent.', reveals: 'international-organisations-are-world-government' },
                { text: 'to replace state sovereignty', outcome: 'Not quite — Students often believe international organisations are "world governments" with independent.', reveals: 'international-organisations-are-world-government' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_06_002', title: 'The UN System: General Assembly, Security Council, Secretariat and Agencies',
          caseStudy: { intro: 'Imagine you see a news headline: “UN Security Council fails to adopt resolution on Gaza ceasefire due to US veto.” Ask: Which UN body voted?',
            decisions: [{ prompt: 'Which principal organ of the UN consists of all member states, each having one vote, and serves as the main deliberative and policy-making.', options: [
                { text: 'The General Assembly', outcome: 'The General Assembly. A wrong answer (e.g., Security Council) reveals confusion between the.' },
                { text: 'head of the UN', outcome: 'Not quite — Students often believe the Secretary-General is the “head of the UN” with executive authority over.', reveals: 'the-secretary-general-is-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_06_003', title: 'UN Security Council: Permanent Members, Veto Power and the P5',
          caseStudy: { intro: 'Imagine you\'re reading a news headline: "Russia vetoes UN resolution on Ukraine" or "USA blocks ceasefire resolution on Gaza." Why can one country stop the.',
            decisions: [{ prompt: 'Which five countries are the permanent members of the UN Security Council, and what specific constitutional provision in the UN Charter.', options: [
                { text: 'The P5 are USA, UK, France, Russia (successor to USSR), and China (represented by PRC', outcome: 'The P5 are USA, UK, France, Russia (successor to USSR), and China (represented by PRC since 1971).' },
                { text: 'veto power means any P5 can stop ANY UNSC decision', outcome: 'Not quite — Students often believe "veto power means any P5 can stop ANY UNSC decision." The error: veto.', reveals: 'veto-power-means-any-p5' },
                { text: 'Germany or Japan, citing Article 24, or confusing veto with simple majority', outcome: 'Not quite — Students often believe "veto power means any P5 can stop ANY UNSC decision." The error: veto.', reveals: 'veto-power-means-any-p5' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_06_004', title: 'Reform of the UN Security Council and India\'s Claim for a Seat',
          caseStudy: { intro: 'Imagine you are India\'s Permanent Representative at the UN General Assembly in 2024, drafting a speech for the Intergovernmental Negotiations on Security.',
            decisions: [{ prompt: 'What are the four criteria explicitly referenced in UN General Assembly Resolution 60/1 (2005 World Summit Outcome) for new permanent.', options: [
                { text: 'The four criteria are: (1) contribution to the maintenance of international peace and', outcome: 'The four criteria are: (1) contribution to the maintenance of international peace and security, (2).' },
                { text: 'nuclear capability', outcome: 'Not quite — Students often believe "G4 = India + Brazil + Germany + Japan" is a formal treaty bloc like BRICS.', reveals: 'g4-india-brazil-germany-japan' },
                { text: 'GDP ranking', outcome: 'Not quite — Students often believe "G4 = India + Brazil + Germany + Japan" is a formal treaty bloc like BRICS.', reveals: 'g4-india-brazil-germany-japan' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_06_005', title: 'Specialised Agencies: UNESCO, UNICEF, WHO, UNHCR and Their Roles',
          caseStudy: { intro: 'Imagine a news report about a devastating earthquake: children are out of school, hospitals are overwhelmed, and thousands are displaced across borders.',
            decisions: [{ prompt: 'Which of the following correctly matches the specialised agency with its primary mandate?', options: [
                { text: 'Correct answer: d) UNHCR – Providing international protection to refugees and seeking', outcome: 'Correct answer: d) UNHCR – Providing international protection to refugees and seeking durable.' },
                { text: 'WHO can force a country to lockdown', outcome: 'Not quite — Students often believe that specialised agencies like WHO or UNICEF have enforcement power over.', reveals: 'specialised-agencies-like-who-or' },
                { text: 'UNICEF can prosecute child labour violators', outcome: 'Not quite — Students often believe that specialised agencies like WHO or UNICEF have enforcement power over.', reveals: 'specialised-agencies-like-who-or' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_06_006', title: 'UN Peacekeeping Operations: Mandate, Evolution and Criticism',
          caseStudy: { intro: 'Imagine you see a news report about Indian peacekeepers in South Sudan (UNMISS) building roads and protecting civilians in a civil war zone.',
            decisions: [{ prompt: 'What are the three core principles that guide UN peacekeeping operations, and which UN body authorizes them?', options: [
                { text: 'The three core principles are: (1) Consent of the parties, (2) Impartiality, and (3)', outcome: 'The three core principles are: (1) Consent of the parties, (2) Impartiality, and (3) Non-use.' },
                { text: 'General Assembly authorizes them', outcome: 'Not quite — Students think UN peacekeepers are a standing UN army that the Secretary-General can deploy.', reveals: 'un-peacekeepers-are-a-standing' },
                { text: 'they can use force offensively', outcome: 'Not quite — Students think UN peacekeepers are a standing UN army that the Secretary-General can deploy.', reveals: 'un-peacekeepers-are-a-standing' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A newsroom junior writes \'UN demands ceasefire, 140-10\' — then the Security Council session ends in a single P5 veto and nothing binds. \'But the vote passed overwhelmingly?\'',
            decisions: [{ prompt: 'What did the two outcomes actually differ on?', options: [
                { text: 'Legal force — the General Assembly\'s vote is universal but recommendatory, moral pressure without obligation; the Security Council alone can bind members under the Charter, and the veto is the design feature that lets one great power stop it — world opinion outvoted, enforcement outvoted it back.', outcome: 'The chapter\'s architecture: universality lives in the GA, power lives in the SC — the Charter deliberately traded sovereign equality for great-power consensus on security.' },
                { text: 'Nothing — both are UN resolutions, so the GA majority should override the veto.', outcome: 'No override exists — the GA\'s authority is deliberative, the SC\'s is binding under Chapter VII; 140 votes of opinion can\'t compel what one veto of enforcement blocks.', reveals: 'majority-beats-veto' },
                { text: 'The veto was illegitimate — fairness should govern the Council like the Assembly.', outcome: 'The veto wasn\'t a bug but the price of the great powers joining — the Charter chose enforceable peace over fair voting, which is exactly why the SC\'s one-country block stands.', reveals: 'veto-is-unfairness' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now explain why globalisation increases the need for international organisations instead of shrinking it — and why the Paris climate deal chose voluntary pledges over unenforceable targets.',
            decisions: [{ prompt: 'What comes next? International Organisations · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — International Organisations · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ps_cbse_06_001', difficulty: 'standard',
          question: 'International organisations are formal institutions created by states through.',
          hint: 'If stuck, revisit the collective-action problem in the context of climate change (Class.',
          misconception: 'Students often believe international organisations are "world governments" with independent authority to make and.',
          parts: [
                { id: 'a', prompt: 'What is the primary reason states establish international organisations, according to the collective-action perspective?', answer: 'The primary reason is to overcome collective action problems',
                  options: ['The primary reason is to overcome collective action problems', 'to create a world government', 'to replace state sovereignty', 'world governments'],
                  hint: 'If stuck, revisit the collective-action problem in the context of climate change (Class 11.',
                  misconception: 'Students often believe international organisations are "world governments" with independent authority to make and enforce laws on states.' }
          ],
            remediations: { 'international-organisations-are-world-government': { steps: ['If the student holds the "world government" misconception: (1) Have them read UN Charter Articles 2(1), 2(7), and 25.', '(2) Compare the UN budget (≈$3.5 billion, funded by assessed contributions) with India\'s central government budget.', '(3) Assign a mini-case: "Why did the UN not prevent the 2003 Iraq War?" — guide them to see that the US acted without.', 'Re-diagnostic: Ask the student to explain in their own words why the UN Secretary-General cannot order a ceasefire.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_06_002', difficulty: 'standard',
          question: 'The UN System is the institutional framework of the United Nations comprising.',
          hint: 'Review the UN Charter Preamble and Article 1 (Purposes) and Article 2 (Principles).',
          misconception: 'Students often believe the Secretary-General is the “head of the UN” with executive authority over member states, akin.',
          parts: [
                { id: 'a', prompt: 'Which principal organ of the UN consists of all member states, each having one vote, and serves as the main deliberative and policy-making body?', answer: 'The General Assembly',
                  options: ['The General Assembly', 'head of the UN'],
                  hint: 'Review the UN Charter Preamble and Article 1 (Purposes) and Article 2 (Principles) — especially.',
                  misconception: 'Students often believe the Secretary-General is the “head of the UN” with executive authority over member states, akin to a national.' },
                { id: 'b', prompt: 'Compare the Secretary-General’s role under Article 99 (bringing matters threatening peace to the Security Council) with the General Assembly’s “Uniting for.', answer: 'Article 99 gives the SG a proactive, political agenda-setting power',
                  options: ['Article 99 gives the SG a proactive, political agenda-setting power', 'head of the UN'],
                  hint: 'Review the UN Charter Preamble and Article 1 (Purposes) and Article 2 (Principles) — especially.',
                  misconception: 'Students often believe the Secretary-General is the “head of the UN” with executive authority over member states, akin to a national.' }
          ],
            remediations: { 'the-secretary-general-is-the': { steps: ['Re-read UN Charter Articles 9-22 (GA), 23-32 (SC), 97-101 (Secretariat), 57-63 (Agencies).', 'Create a comparison table: Organ | Membership | Voting | Binding Power | Key Function.', 'Watch a 10-minute video of a real GA debate and a SC veto moment (e.g., UN Web TV archives).', 'Re-attempt Diagnostic Questions 2 and 3, focusing on the distinction between recommendatory and binding decisions.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_06_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the Secretary-General is the “head of the UN” with executive authority over member states, akin.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: “Specialised agencies like WHO and UNESCO are subordinate organs of the UN because they report to ECOSOC.”', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'part of the UN system', 'subsidiary organ of the UN', 'head of the UN'],
                  hint: 'Review the UN Charter Preamble and Article 1 (Purposes) and Article 2 (Principles) — especially.',
                  misconception: 'Students often believe the Secretary-General is the “head of the UN” with executive authority over member states, akin to a national.' }
          ],
            remediations: { 'the-secretary-general-is-the': { steps: ['Re-read UN Charter Articles 9-22 (GA), 23-32 (SC), 97-101 (Secretariat), 57-63 (Agencies).', 'Create a comparison table: Organ | Membership | Voting | Binding Power | Key Function.', 'Watch a 10-minute video of a real GA debate and a SC veto moment (e.g., UN Web TV archives).', 'Re-attempt Diagnostic Questions 2 and 3, focusing on the distinction between recommendatory and binding decisions.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_06_003', difficulty: 'standard',
          question: 'The UN Security Council (UNSC) is the principal organ of the United Nations.',
          hint: 'Revisit c12_ps_cbse_06_002 for UNSC composition and Article 24 (primary responsibility).',
          misconception: 'Students often believe "veto power means any P5 can stop ANY UNSC decision." The error: veto applies ONLY.',
          parts: [
                { id: 'a', prompt: 'Explain why a permanent member\'s abstention or absence from a vote does NOT constitute a veto, while a negative vote does.', answer: 'Article 27(3) requires "concurring votes of the permanent members"',
                  options: ['Article 27(3) requires "concurring votes of the permanent members"', 'abstention counts as veto', 'all P5 must vote yes', 'veto power means any P5 can stop ANY UNSC decision'],
                  hint: 'Revisit c12_ps_cbse_06_002 for UNSC composition and Article 24 (primary responsibility), and.',
                  misconception: 'Students often believe "veto power means any P5 can stop ANY UNSC decision." The error: veto applies ONLY to substantive matters (Chapter.' },
                { id: 'b', prompt: 'A resolution condemning a specific country\'s military action receives 10 votes in favor (including 3 P5), 1 vote against (from a P5), and 4 abstentions.', answer: 'No, the resolution fails',
                  options: ['No, the resolution fails', 'passes because 10 > 9', 'fails because abstentions count as veto', 'veto power means any P5 can stop ANY UNSC decision'],
                  hint: 'Revisit c12_ps_cbse_06_002 for UNSC composition and Article 24 (primary responsibility), and.',
                  misconception: 'Students often believe "veto power means any P5 can stop ANY UNSC decision." The error: veto applies ONLY to substantive matters (Chapter.' }
          ],
            remediations: { 'veto-power-means-any-p5': { steps: ['Re-read UN Charter Article 27(2) vs 27(3) side-by-side.', 'Study the 1950 "Uniting for Peace" resolution (GA Res 377) and the Korea case where procedural classification bypassed.', 'Complete a table classifying 5 sample UNSC decisions (e.g., "adopt agenda," "impose sanctions," "establish peacekeeping.', 'Re-attempt Diagnostic Question 3 with a new scenario involving a procedural vote.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_06_004', difficulty: 'standard',
          question: 'The reform of the UN Security Council refers to the ongoing diplomatic and.',
          hint: 'Revisit c12_ps_cbse_06_003\'s worked example on veto use (1946-2024 data) and.',
          misconception: 'Students often believe "G4 = India + Brazil + Germany + Japan" is a formal treaty bloc like BRICS.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The reform of the UN Security Council refers to the ongoing diplomatic and institutional',
                  options: ['The reform of the UN Security Council refers to the ongoing diplomatic and institutional', 'International organisations are formal institutions created by states through treaties to', 'The UN System is the institutional framework of the United Nations comprising six', 'The UN Security Council (UNSC) is the principal organ of the United Nations charged with'],
                  hint: 'Revisit c12_ps_cbse_06_003\'s worked example on veto use (1946-2024 data) and c11_ps_cbse_09_006.',
                  misconception: 'Students often believe "G4 = India + Brazil + Germany + Japan" is a formal treaty bloc like BRICS.' }
          ],
            remediations: { 'g4-india-brazil-germany-japan': { steps: ['If the student conflates G4 with a formal bloc: (1) Re-read node c12_ps_cbse_06_002 on UNGA voting blocs vs interest.', '(2) Compare G4\'s 2005 joint statement (tactical) with BRICS\'s 2009 Yekaterinburg declaration (institutionalised).', '(3) Complete diagnostic re-check: "List three differences between G4 and BRICS in structure, scope, and.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_06_005', difficulty: 'standard',
          question: 'Specialised agencies are autonomous international organisations linked to the.',
          hint: 'If stuck, revisit node c12_ps_cbse_06_002 (UN System: General Assembly, Security Council.',
          misconception: 'Students often believe that specialised agencies like WHO or UNICEF have enforcement power over sovereign states (e.g.',
          parts: [
                { id: 'a', prompt: 'Why was UNICEF originally created in 1946, and how did its mandate evolve after 1950?', answer: 'Correct answer: a) Created for post-war European child relief',
                  options: ['Correct answer: a) Created for post-war European child relief', 'WHO can force a country to lockdown', 'UNICEF can prosecute child labour violators', 'norm-setting'],
                  hint: 'If stuck, revisit node c12_ps_cbse_06_002 (UN System: General Assembly, Security Council, ECOSOC).',
                  misconception: 'Students often believe that specialised agencies like WHO or UNICEF have enforcement power over sovereign states (e.g., "WHO can force.' }
          ],
            remediations: { 'specialised-agencies-like-who-or': { steps: ['If the student holds this misconception: 1.', 'Re-read the NCERT box on "Specialised Agencies" in Chapter 6 (International Organisations) — note phrases like.', 'Compare with the Security Council (node c12_ps_cbse_06_003) which HAS enforcement power under Chapter VII — make.', 'Watch a 5-minute UN video on "How WHO works" (official UN channel) showing its role in the 2014 Ebola response.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_06_006', difficulty: 'standard',
          question: 'UN Peacekeeping Operations are multinational military, police, and civilian.',
          hint: 'Review UN Charter Articles 24, 25, 39-42, and the distinction between \'peacekeeping\'.',
          misconception: 'Students think UN peacekeepers are a standing UN army that the Secretary-General can deploy anywhere.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'UN Peacekeeping Operations are multinational military, police, and civilian missions',
                  options: ['UN Peacekeeping Operations are multinational military, police, and civilian missions', 'International organisations are formal institutions created by states through treaties to', 'The UN System is the institutional framework of the United Nations comprising six', 'The UN Security Council (UNSC) is the principal organ of the United Nations charged with'],
                  hint: 'Review UN Charter Articles 24, 25, 39-42, and the distinction between \'peacekeeping\'.',
                  misconception: 'Students think UN peacekeepers are a standing UN army that the Secretary-General can deploy anywhere.' }
          ],
            remediations: { 'un-peacekeepers-are-a-standing': { steps: ['Revisit node c12_ps_cbse_06_003 (UN Security Council: Permanent Members, Veto Power) to understand how P5 politics.', 'Then read the Brahimi Report (2000) executive summary — focus on the \'mandate-resource gap\' and \'robust peacekeeping\'.', 'Finally, analyze the UNMISS mandate (S/RES/1996) vs.', 'actual capabilities using the UN Peacekeeping Capability Readiness System (PCRS) framework.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
