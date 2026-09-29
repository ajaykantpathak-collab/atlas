import type { SimDef } from '../../engine/types';
import C12_HistoryAntidowryMovement1970sSim from '../../../simulations/c6_12/C12_HistoryAntidowryMovement1970sSim';

/** v3 wrapped master — C12_HistoryAntidowryMovement1970sSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_historyantidowrymovement1970ssim: SimDef = {
    id: 'v3w_c12_historyantidowrymovement1970ssim',
    title: 'The Nath Tradition, Jogis and the Syncretic Sant Parampara',
    subtitle: 'Covers: Nath Panth origins (Gorakhnath/Matsyendranath), Jogi identity as Nath yogis,.',
    classLevel: 12, subject: 'history', topic: 'The Nath Tradition, Jogis and the Syncretic Sant Parampara',
    chapters: [],
    nodeIds: ['c12_hist_cbse_06_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you visit the Gorakhnath Temple in Gorakhpur or see a Jogi with split ears (kanphata) at a village.', goal: 'Master The Nath Tradition, Jogis and the Syncretic Sant Parampara.' },
    discovery: {
        question: 'Why did the Nath-Jogi-Siddha leaders, despite their popularity among artisans and peasants, fail to secure sustained patronage from Rajput ruling elites before.',
        options: ['Rajput states relied on Brahmanas for ritual and administrative legitimacy', 'lack of temples', 'foreign origin'],
        answer: 'Rajput states relied on Brahmanas for ritual and administrative legitimacy',
        hook: 'Students often equate "Jogi" with "Sufi faqir" or assume all yogis were Naths.',
    },
    teaching: [
        { title: 'The Nath Tradition (Nath Panth), Jogis, and.', text: 'The Nath Tradition (Nath Panth), Jogis, and Siddhas were interconnected yogic and ascetic movements in North India (c.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_hist_cbse_06_008', title: 'The Nath Tradition (Nath Panth), Jogis,.',
          scaffold: { problem: 'Using Aurangzeb\'s 1661–62 letter to Guru Anand Nath (NCERT Source 6), explain how Mughal emperors legitimised their rule through engagement.',
            steps: [
            { text: 'Identify the source — a farman-style letter from Emperor Aurangzeb (r.' },
            { text: 'Analyse the honorifics — "possessor of the sublime station," "protection of Sri Shiv Jio" — Aurangzeb adopts the Jogi\'s.' },
            { text: 'Note the material exchange — a cloak (khil\'at) and 25 rupees as "offering" (nazar); Mughal protocol usually reserved.' },
            { text: 'Read the closing — "Your Reverence may write to us whenever there is any service which can be rendered by us" — the.' },
            { text: 'Connect to political context — Mughals needed legitimacy among non-Muslim subjects (majority); Jogis had mass following.' },
            { text: 'Contrast with Chishti Sufis — similar pattern (Akbar at Ajmer), but Jogis represented a distinct "Hindu" yogic lineage,.', faded: true, blankAnswer: 'Aurangzeb\'s letter demonstrates Mughal "sulh-i-kul".' }
            ] } }
    ],
    explore: { component: C12_HistoryAntidowryMovement1970sSim, prompt: 'Explore the interactive — The Nath Tradition, Jogis and the Syncretic Sant Parampara' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hist_cbse_06_008', difficulty: 'standard',
          question: 'The Nath Tradition (Nath Panth), Jogis, and Siddhas were interconnected yogic.',
          hint: 'If stuck, re-read NCERT p. 148 (Naths/Jogis/Siddhas as artisanal, vernacular, anti-Vedic).',
          misconception: 'Students often equate "Jogi" with "Sufi faqir" or assume all yogis were Naths.',
          parts: [
                { id: 'a', prompt: 'Why did the Nath-Jogi-Siddha leaders, despite their popularity among artisans and peasants, fail to secure sustained patronage from Rajput ruling elites before.', answer: 'Rajput states relied on Brahmanas for ritual and administrative legitimacy',
                  options: ['Rajput states relied on Brahmanas for ritual and administrative legitimacy', 'lack of temples', 'foreign origin'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate "Jogi" with "Sufi faqir" or assume all yogis were Naths.' }
          ],
            remediations: { 'students-often-equate-jogi-with': { steps: ['148–149 (Religious Ferment in North India) and pp.', '161–163 (Kabir\'s vocabulary).', 'Revisit c12_hist_cbse_06_001 (Religious Ferment: Tantrism, Jainism) for the "great/little tradition" framework.', 'Revisit c12_hist_cbse_06_007 (Kabir: Bijak, Ulatbansi) and map each Kabir term (alakh, nirakar, shabda, shunya) to its.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
