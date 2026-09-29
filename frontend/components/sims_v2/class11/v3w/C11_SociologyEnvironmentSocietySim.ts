import type { SimDef } from '../../engine/types';
import C11_SociologyEnvironmentSocietySim from '../../../simulations/c6_12/C11_SociologyEnvironmentSocietySim';

/** v3 wrapped master — C11_SociologyEnvironmentSocietySim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_sociologyenvironmentsocietysim: SimDef = {
    id: 'v3w_c11_sociologyenvironmentsocietysim',
    title: 'Ecology: Definition and the Interconnected Web of Natural Systems',
    subtitle: 'This node covers the sociological definition of ecology, the two-way interaction between.',
    classLevel: 11, subject: 'sociology', topic: 'Ecology: Definition and the Interconnected Web of Natural Systems',
    chapters: [],
    nodeIds: ['c11_soc_cbse_08_001', 'c11_soc_cbse_08_002', 'c11_soc_cbse_08_003', 'c11_soc_cbse_08_004', 'c11_soc_cbse_08_009', 'c11_soc_cbse_07_001', 'c11_soc_cbse_07_002', 'c11_soc_cbse_07_003', 'c11_soc_cbse_08_005', 'c11_soc_cbse_08_006', 'c11_soc_cbse_08_007', 'c11_soc_cbse_08_008', 'c11_soc_cbse_08_010', 'c11_soc_cbse_04_005', 'c11_soc_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Look at the chair you are sitting on right now. Trace it backward: the wood came from a tree, the tree grew.', goal: 'Master Ecology: Definition and the Interconnected Web of Natural Systems.' },
    discovery: {
        question: 'Define "ecology" as used in the sociological study of environment and society, and explain why humans are considered an element within it rather than external.',
        options: ['Ecology is the web of physical and biological systems and processes', 'the natural environment untouched by humans', 'ecology is the natural surroundings of human society'],
        answer: 'Ecology is the web of physical and biological systems and processes',
        hook: 'Students treat "ecology" and "environment" as synonyms for "nature untouched by humans." They imagine a pristine.',
    },
    teaching: [
        { title: 'Ecology is the web of physical and.', text: 'Ecology is the web of physical and biological systems and processes — including mountains, rivers, plains, oceans, flora, and fauna — of which humans are one element, shaped by the interaction.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_soc_cbse_08_001', title: 'Ecology is the web of physical and.',
          scaffold: { problem: 'A student reads a newspaper article stating: "The Sundarbans mangrove forest is a pristine wilderness threatened by human encroachment.".',
            steps: [
            { text: 'Identify the implicit assumption — the article treats "pristine wilderness" (ecology without humans) as the norm and.' },
            { text: 'Recall the textbook definition — ecology is a web of physical and biological systems *of which humans are one element*;.' },
            { text: 'Apply historical evidence — the Sundarbans have been shaped by centuries of tidal rice cultivation, honey collection,.' },
            { text: 'Reformulate the problem sociologically — the threat is not "humans entering nature" but a specific *social.', faded: true, blankAnswer: 'The article\'s framing is sociologically flawed because it.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_soc_cbse_08_002', title: 'The two-way relationship between.',
          scaffold: { problem: 'Analyze the two-way relationship in the case of the Narmada Valley dams (Sardar Sarovar).',
            steps: [
            { text: 'Identify the key ecological feature – the Narmada River\'s seasonal flow, steep gradient, and fertile alluvial valleys.' },
            { text: 'Identify the social organisation driving intervention – post-Independence Indian state\'s developmentalist ideology,.' },
            { text: 'Trace society→nature: The decision to build a series of large dams transformed the free-flowing river into a cascade of.' },
            { text: 'Trace nature→society (first order): The altered ecology provided irrigation water to Gujarat\'s arid zones (enabling.' },
            { text: 'Trace nature→society (feedback): Submergence displaced over 200,000 people (mostly Adivasis), creating a social crisis.' },
            { text: 'Synthesize: The dams are not just \'on\' the river; they are a social project that reconfigured the river, which in turn.', faded: true, blankAnswer: 'The Narmada dams exemplify the two-way relationship: the.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_soc_cbse_08_003', title: 'Property relations refer to the.',
          scaffold: { problem: 'In a drought-prone district of Maharashtra, the state government announces a "Water Conservation Scheme" funding farm ponds for individual.',
            steps: [
            { text: 'Identify the pre-scheme property regime — village wells as common property resource with customary access for all.' },
            { text: 'Identify the policy intervention — state subsidy for private farm ponds, converting common runoff into private stored.' },
            { text: 'Trace the redistribution of control rights — Large farmers gain exclusion rights (fenced ponds, pump control) and.' },
            { text: 'Analyze the impact on small farmers — They retain theoretical access to groundwater but lose effective withdrawal.' },
            { text: 'Analyze the impact on landless Dalit women — They lose access rights entirely: wells dry up (no recharge), no land to.' },
            { text: 'Synthesize — The scheme shifts property relations from a common pool regime (inclusive but unprotected) to a private.', faded: true, blankAnswer: 'The scheme redistributes water control by legally enabling.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_soc_cbse_08_004', title: 'Social stratification and differential.',
          scaffold: { problem: 'A village in semi-arid Maharashtra has two farmer groups: Group A (10 large farmers, 10+ hectares each, dominant caste, access to.',
            steps: [
            { text: 'Identify the ecological constraint — 600mm rainfall is insufficient for cotton/soybean without irrigation; groundwater.' },
            { text: 'Map property relations — Group A owns large contiguous landholdings eligible for borewell loans; Group B\'s fragmented.' },
            { text: 'Analyze credit access — Group A gets crop loans at 7% from cooperative banks; Group B borrows at 36-60% from.' },
            { text: 'Trace technology adoption — Group A installs 15-20 borewells with subsidized electricity connections; Group B cannot.' },
            { text: 'Examine power dynamics — Group A dominates the Water User Association and Panchayat, influencing canal water rotation.' },
            { text: 'Assess outcome — In drought years, Group A irrigates 80% of cropped area; Group B faces total crop failure, distress.', faded: true, blankAnswer: 'Group A has secure, subsidized, self-controlled irrigation.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_soc_cbse_08_009', title: 'Social Ecology, as formulated by Murray.',
          scaffold: { problem: 'Analyse the farmer suicide crisis in Vidarbha (Maharashtra) using Bookchin\'s Social Ecology framework.',
            steps: [
            { text: 'Identify the ecological symptom — soil degradation, groundwater depletion, and pest resistance in cotton belt — but.' },
            { text: 'Map the property regime — cotton farmers hold private land titles but lack property rights over groundwater (open.' },
            { text: 'Analyse production organisation — Green Revolution / Gene Revolution model: high-external-input cotton for global.' },
            { text: 'Trace the inequality structure — Large farmers access institutional credit, deep tubewells, and political influence;.' },
            { text: 'Show the generative mechanism — The *combination* of corporate seed monopoly (property), input-intensive production for.' },
            { text: 'Conclude per Bookchin — Technological fixes (drought-tolerant seeds, drip irrigation) fail because they leave the.', faded: true, blankAnswer: 'The Vidarbha farmer suicide crisis is not an "agrarian.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_soc_cbse_07_001', title: 'Social change refers to significant.',
          scaffold: { problem: 'A Class 11 student argues: "The shift from joint to nuclear families in urban India is social change.',
            steps: [
            { text: 'Identify the textbook\'s definitional criteria: social change must be (a) intensive—altering the underlying structure of.' },
            { text: 'Analyse \'joint to nuclear family shift\': Does it alter underlying structure?' },
            { text: 'Analyse \'Instagram reels\': Does it alter underlying structure?' },
            { text: 'Apply the \'both criteria required\' rule: Instagram reels fails the intensive criterion; therefore it is a.' },
            { text: 'Synthesise: The student\'s first claim is correct; the second is incomplete without demonstrating institutional.', faded: true, blankAnswer: 'Joint-to-nuclear shift = social change (passes both.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_soc_cbse_08_002', title: 'Identify each idea',
          dissect: { specimen: 'Ecology: Definition and the Interconnected Web of Natural Systems', spots: [
            { id: 's1', label: 'Ecology is the web of', prompt: 'Which idea is this? — Ecology is the web of physical and biological systems and processes — including.', answer: 'Ecology is the web of', options: ['Ecology is the web of', 'The two-way relationship between environment', 'Property relations refer to the', 'Social stratification and differential access'] },
            { id: 's2', label: 'The two-way relationship between environment', prompt: 'Which idea is this? — The two-way relationship between environment and society refers to the dialectical.', answer: 'The two-way relationship between environment', options: ['The two-way relationship between environment', 'Ecology is the web of', 'Property relations refer to the', 'Social stratification and differential access'] },
            { id: 's3', label: 'Property relations refer to the', prompt: 'Which idea is this? — Property relations refer to the socially constructed rules, norms, and power structures.', answer: 'Property relations refer to the', options: ['Property relations refer to the', 'Ecology is the web of', 'The two-way relationship between environment', 'Social stratification and differential access'] },
            { id: 's4', label: 'Social stratification and differential access', prompt: 'Which idea is this? — Social stratification and differential access to environmental resources refers to the.', answer: 'Social stratification and differential access', options: ['Social stratification and differential access', 'Ecology is the web of', 'The two-way relationship between environment', 'Property relations refer to the'] },
            { id: 's5', label: 'Social Ecology as formulated by', prompt: 'Which idea is this? — Social Ecology, as formulated by Murray Bookchin, is a theoretical framework asserting.', answer: 'Social Ecology as formulated by', options: ['Social Ecology as formulated by', 'Ecology is the web of', 'The two-way relationship between environment', 'Property relations refer to the'] },
            { id: 's6', label: 'Social change refers to significant', prompt: 'Which idea is this? — Social change refers to significant alterations in the underlying structure of.', answer: 'Social change refers to significant', options: ['Social change refers to significant', 'Ecology is the web of', 'The two-way relationship between environment', 'Property relations refer to the'] }
          ] } }
    ],
    explore: { component: C11_SociologyEnvironmentSocietySim, prompt: 'Explore the interactive — Ecology: Definition and the Interconnected Web of Natural Systems' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_soc_cbse_08_001', difficulty: 'standard',
          question: 'Ecology is the web of physical and biological systems and processes — including.',
          hint: 'Revisit Class 7 History Chapter 5 (Sacred Geography) — specifically the concept of.',
          misconception: 'Students treat "ecology" and "environment" as synonyms for "nature untouched by humans." They imagine a pristine.',
          parts: [
                { id: 'a', prompt: 'Define "ecology" as used in the sociological study of environment and society, and explain why humans are considered an element within it rather than external.', answer: 'Ecology is the web of physical and biological systems and processes',
                  options: ['Ecology is the web of physical and biological systems and processes', 'the natural environment untouched by humans', 'ecology is the natural surroundings of human society'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat "ecology" and "environment" as synonyms for "nature untouched by humans." They imagine a pristine wilderness that society.' },
                { id: 'b', prompt: 'The Delhi Ridge forest is dominated by *Prosopis juliflora* (vilayati kikar), introduced from South America by the British around 1915.', answer: 'Step 1: Identify the biophysical feature (lake, water body)',
                  options: ['Step 1: Identify the biophysical feature (lake, water body)', 'ecology is the natural surroundings of human society'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat "ecology" and "environment" as synonyms for "nature untouched by humans." They imagine a pristine wilderness that society.' }
          ],
            remediations: { 'students-treat-ecology-and-environment': { steps: ['Ask the student to list five things in the room they are sitting in and trace each back to a biophysical source (wood →.', 'For each, ask: "At what point did this stop being \'ecology\' and become \'society\'?" — they will find no clear boundary.', 'Show the Delhi Ridge and Corbett examples again; ask: "If you saw these without being told their history, would you.', 'Have them rewrite the definition in their own words using the phrase "web of physical and biological systems and.', 'Assign a micro-field task: find one local "natural" feature (pond, hill, grove) and interview an elder about its.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_08_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat "ecology" and "environment" as synonyms for "nature untouched by humans." They imagine a pristine.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Environmental management is a purely technical problem — if we had better science and technology, we could predict and control biophysical.', answer: 'The claim is false',
                  options: ['The claim is false', 'ecology is the natural surroundings of human society'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat "ecology" and "environment" as synonyms for "nature untouched by humans." They imagine a pristine wilderness that society.' }
          ],
            remediations: { 'students-treat-ecology-and-environment': { steps: ['Ask the student to list five things in the room they are sitting in and trace each back to a biophysical source (wood →.', 'For each, ask: "At what point did this stop being \'ecology\' and become \'society\'?" — they will find no clear boundary.', 'Show the Delhi Ridge and Corbett examples again; ask: "If you saw these without being told their history, would you.', 'Have them rewrite the definition in their own words using the phrase "web of physical and biological systems and.', 'Assign a micro-field task: find one local "natural" feature (pond, hill, grove) and interview an elder about its.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_08_002', difficulty: 'standard',
          question: 'The two-way relationship between environment and society refers to the.',
          hint: 'Revisit the definition of ecology in node c11_soc_cbse_08_001 and the Activity 1 examples.',
          misconception: 'Students often think the two-way relationship means \'nature affects society AND society affects nature\' as two.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The two-way relationship between environment and society refers to the dialectical',
                  options: ['The two-way relationship between environment and society refers to the dialectical', 'Ecology is the web of physical and biological systems and processes', 'Property relations refer to the socially constructed rules, norms, and power structures', 'Social stratification and differential access to environmental resources refers to the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the two-way relationship means \'nature affects society AND society affects nature\' as two separate, independent.' }
          ],
            remediations: { 'the-two-way-relationship-means': { steps: ['If a student gives a static, one-way answer: (1) Draw a simple feedback loop diagram on paper: Ecological Condition →.', '(2) Walk through the Punjab groundwater case together, labelling each arrow with the specific social actor (state,.', '(3) Ask the student to re-tell the Green Revolution story as a *cycle* starting from the alluvial soil, not as a list.', '(4) Assign a mini-task: pick any local environmental issue (e.g., city air pollution) and map the feedback loop in 4.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_08_003', difficulty: 'standard',
          question: 'Property relations refer to the socially constructed rules, norms, and power.',
          hint: 'Revisit the "Social organisation influences how different social groups relate to their.',
          misconception: 'Students often think "property relations" simply means "who owns the land legally" (private vs. government).',
          parts: [
                { id: 'a', prompt: 'A state government leases a stretch of river to a private company for bottled water extraction.', answer: 'The property regime shifted from a common property/resource access regime (where',
                  options: ['The property regime shifted from a common property/resource access regime (where', 'privatization', 'property relations'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "property relations" simply means "who owns the land legally" (private vs. government).' },
                { id: 'b', prompt: 'Compare how a capitalist property regime and a socialist property regime would differently define "control over forests." Use the concepts of commodification.', answer: 'Under a capitalist property regime, forests are commodified',
                  options: ['Under a capitalist property regime, forests are commodified', 'government control', 'property relations'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "property relations" simply means "who owns the land legally" (private vs. government).' }
          ],
            remediations: { 'property-relations-simply-means-who': { steps: ['If the student conflates property relations with legal ownership: (1) Give them the "bundle of rights" framework.', '(2) Apply it to a familiar resource — e.g., a village pond.', 'Who can sell the pond?" (3) Show how each right can be held by a different person/group.', '(4) Then introduce the NCERT text\'s point: "Private ownership of land and water sources will affect whether others can.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_08_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "property relations" simply means "who owns the land legally" (private vs. government).',
          parts: [
                { id: 'a', prompt: 'Compare how a capitalist property regime and a socialist property regime would differently define "control over forests." Use the concepts of commodification.', answer: 'Under a capitalist property regime, forests are commodified',
                  options: ['Under a capitalist property regime, forests are commodified', 'government control', 'property relations', 'who owns the land legally'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "property relations" simply means "who owns the land legally" (private vs. government).' }
          ],
            remediations: { 'property-relations-simply-means-who': { steps: ['If the student conflates property relations with legal ownership: (1) Give them the "bundle of rights" framework.', '(2) Apply it to a familiar resource — e.g., a village pond.', 'Who can sell the pond?" (3) Show how each right can be held by a different person/group.', '(4) Then introduce the NCERT text\'s point: "Private ownership of land and water sources will affect whether others can.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_08_004', difficulty: 'standard',
          question: 'Social stratification and differential access to environmental resources refers.',
          hint: 'Revisit c11_soc_cbse_08_003 — specifically the distinction between use rights and control.',
          misconception: 'Students often believe "differential access" simply means "some people have more money to buy resources." They miss.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast how a Forest Department geared to revenue maximization and a tribal artisan harvesting bamboo would view and use the same forest.', answer: 'The Forest Department views the forest as a revenue-generating asset',
                  options: ['The Forest Department views the forest as a revenue-generating asset', 'different uses', 'differential access'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "differential access" simply means "some people have more money to buy resources." They miss that property relations.' }
          ],
            remediations: { 'differential-access-simply-means-some': { steps: ['If a student reduces differential access to purchasing power: (1) Ask them to explain why a landless laborer with cash.', '(2) Have them trace the Kutch example: rich farmers don\'t just "buy" water — they access subsidized electricity,.', '(3) Assign the NCERT passage on "Property relations determine how and by whom natural resources can be used" and ask.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_08_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "differential access" simply means "some people have more money to buy resources." They miss.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Farmer suicides in Vidarbha are primarily an agricultural crisis caused by pest attacks and rainfall failure." Use the NCERT\'s analysis of.', answer: 'The claim is incomplete and misleading',
                  options: ['The claim is incomplete and misleading', 'differential access', 'some people have more money to buy resources', '"differential access" simply means "some people have more money to buy resources'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "differential access" simply means "some people have more money to buy resources." They miss that property relations.' },
                { id: 'b', prompt: 'Compare and contrast how a Forest Department geared to revenue maximization and a tribal artisan harvesting bamboo would view and use the same forest.', answer: 'The Forest Department views the forest as a revenue-generating asset',
                  options: ['The Forest Department views the forest as a revenue-generating asset', 'different uses', 'differential access', 'some people have more money to buy resources'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "differential access" simply means "some people have more money to buy resources." They miss that property relations.' }
          ],
            remediations: { 'differential-access-simply-means-some': { steps: ['If a student reduces differential access to purchasing power: (1) Ask them to explain why a landless laborer with cash.', '(2) Have them trace the Kutch example: rich farmers don\'t just "buy" water — they access subsidized electricity,.', '(3) Assign the NCERT passage on "Property relations determine how and by whom natural resources can be used" and ask.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_08_009', difficulty: 'standard',
          question: 'Social Ecology, as formulated by Murray Bookchin, is a theoretical framework.',
          hint: 'Revisit c11_soc_cbse_08_003 (Property Relations) and c11_soc_cbse_08_004 (Social.',
          misconception: 'Students frequently confuse Bookchin\'s Social Ecology with **Deep Ecology** (Arne Naess) or treat it as.',
          parts: [
                { id: 'a', prompt: 'The NCERT text quotes Bookchin: "economic, ethnic, cultural, and gender conflicts...', answer: 'Gender conflict creates ecological dislocation',
                  options: ['Gender conflict creates ecological dislocation', 'women are closer to nature', 'women care more about environment'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse Bookchin\'s Social Ecology with **Deep Ecology** (Arne Naess) or treat it as "environmentalism that cares about.' },
                { id: 'b', prompt: 'Apply Bookchin\'s framework to analyse the plastic pollution crisis in the Yamuna River.', answer: 'the property relation governing waste disposal, (',
                  options: ['the property relation governing waste disposal, (', 'littering behaviour', 'lack of dustbins'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse Bookchin\'s Social Ecology with **Deep Ecology** (Arne Naess) or treat it as "environmentalism that cares about.' },
                { id: 'c', prompt: 'Compare how the Forest Department (revenue-maximising) and a tribal basket-weaver (subsistence) view the *same* bamboo forest.', answer: 'The Forest Department\'s relation is mediated by state property and bureaucratic',
                  options: ['The Forest Department\'s relation is mediated by state property and bureaucratic', 'they have different values', 'one is greedy, one is traditional'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse Bookchin\'s Social Ecology with **Deep Ecology** (Arne Naess) or treat it as "environmentalism that cares about.' }
          ],
            remediations: { 'students-frequently-confuse-bookchin-s': { steps: ['If the student cannot distinguish constitutive vs.', 'conditional roles of inequality, do this 3-step remediation: (1) **Contrast two explanations** side-by-side for the.', '"Rich farmers\' deep tubewells *cause* the poor\'s wells to run dry because property law grants them unlimited extraction.', '(2) **Trace the causal arrow backwards**: Start from the ecological outcome (dry well) → immediate physical cause.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_08_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently confuse Bookchin\'s Social Ecology with **Deep Ecology** (Arne Naess) or treat it as.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Installing solar-powered tubewells will solve the groundwater crisis in Punjab." Use Bookchin\'s social ecology to justify your position.', answer: 'The claim is false per Bookchin',
                  options: ['The claim is false per Bookchin', 'environmentalism that cares about poor people', 'social inequality *worsens* environmental problems', 'social hierarchy *generates* environmental problems'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse Bookchin\'s Social Ecology with **Deep Ecology** (Arne Naess) or treat it as "environmentalism that cares about.' },
                { id: 'b', prompt: 'Design a "Social Ecology Analysis Template" — a 4-column table — that a student could use to analyse ANY local environmental conflict (e.g., a proposed mine, a.', answer: 'A strong template would have columns: (1) **Social Relation** (Property regime /',
                  options: ['A strong template would have columns: (1) **Social Relation** (Property regime /', 'environmentalism that cares about poor people', 'social inequality *worsens* environmental problems', 'social hierarchy *generates* environmental problems'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse Bookchin\'s Social Ecology with **Deep Ecology** (Arne Naess) or treat it as "environmentalism that cares about.' }
          ],
            remediations: { 'students-frequently-confuse-bookchin-s': { steps: ['If the student cannot distinguish constitutive vs.', 'conditional roles of inequality, do this 3-step remediation: (1) **Contrast two explanations** side-by-side for the.', '"Rich farmers\' deep tubewells *cause* the poor\'s wells to run dry because property law grants them unlimited extraction.', '(2) **Trace the causal arrow backwards**: Start from the ecological outcome (dry well) → immediate physical cause.'] } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_07_001', difficulty: 'standard',
          question: 'Social change refers to significant alterations in the underlying structure of.',
          hint: 'Revisit the \'Clock of Human History\' box on textbook page 21–22 and Class 10 History.',
          misconception: 'Students equate \'social change\' with any visible alteration in daily life—new gadgets, fashion, slang, or a single.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Social change refers to significant alterations in the underlying structure of',
                  options: ['Social change refers to significant alterations in the underlying structure of', 'Ecology is the web of physical and biological systems and processes', 'The two-way relationship between environment and society refers to the dialectical', 'Property relations refer to the socially constructed rules, norms, and power structures'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate \'social change\' with any visible alteration in daily life—new gadgets, fashion, slang, or a single law—because these are.' }
          ],
            remediations: { 'students-equate-social-change-with': { steps: ['Have the student draw a 24-hour clock on paper.', 'Using the textbook\'s figures (500,000 years total; agriculture 12,000 BP; civilisation 6,000 BP; modern acceleration.', 'Ask: \'In which segment did the *structure* of daily life—how people produce food, relate to authority, organise.', 'Give three cards: \'Smartphone launched\', \'Child labour banned\', \'New dance trend\'.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
