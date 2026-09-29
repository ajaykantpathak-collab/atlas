/**
 * Class 3 NIPUN extension sims, wave 2 — states of matter.
 */
import type { SimDef } from '../engine/types';

export const c3Matter: SimDef = {
    id: 'c3_matter', title: 'Solid, Liquid, Gas', subtitle: 'The three forms of stuff!',
    classLevel: 3, subject: 'evs', topic: 'States of Matter',
    chapters: ['EVS-3: states of matter'],
    emoji: '💧', theme: { bg: 'from-gold-100 to-gold-200', accent: 'cyan', scene: 'matter' },
    scenario: { role: "a matter scientist", intro: 'Everything around you is solid, liquid, or gas. Ice melts, water boils — matter changes!', goal: 'Sort every substance by its state.' },
    discovery: {
        question: "Ice cube on a hot day — what happens?",
        options: ["It melts into water", "It freezes harder", "It turns into gas right away"],
        answer: "It melts into water",
        hook: 'Heat turns solid → liquid! That is MELTING!',
    },
    teaching: [
        { title: 'Solids Keep Shape 🧊', text: 'Solids are hard and keep their shape — ice, stone, your desk. Squeeze a ball — it stays a ball!', emoji: '🧊', bgColor: 'from-gold-400 to-gold-500' },
        { title: 'Liquids Flow 🥛', text: 'Liquids take the shape of their container — water, milk, juice. Pour them — they flow!', emoji: '🥛', bgColor: 'from-gold-400 to-teal-500' },
        { title: 'Gases Fill Space 💨', text: 'Gases spread everywhere — air in a balloon, steam, the smell of food. You cannot see most of them!', emoji: '💨', bgColor: 'from-gold-400 to-purple-500' },
        { title: 'Changing States 🔁', text: 'Heat melts solid→liquid and boils liquid→gas. Cold freezes liquid→solid and condenses gas→liquid!', emoji: '🔁', bgColor: 'from-amber-400 to-orange-500' },
    ],
    explore: { lab: 'pour', prompt: 'Pour and fill — watch the liquid take the jug\'s shape!' },
    challenges: [
        { type: 'mcq', question: 'Water in a glass takes the glass\'s shape — water is a:', answer: 'liquid', options: ['solid', 'liquid', 'gas'],
          hint: 'It flows and takes the container\'s shape!', misconception: 'Liquids flow and take the container\'s shape — water is a liquid!',
          workedExample: ['Flows? yes.', 'Keeps own shape? no.', 'Liquid.'] },
        { type: 'mcq', question: 'Steam rising from hot chai is a:', answer: 'gas', options: ['solid', 'liquid', 'gas'],
          hint: 'It spreads into the air!', misconception: 'Steam is water vapour — a GAS that fills the space around it!',
          workedExample: ['Spreads everywhere.', 'Gas.'] },
        { type: 'mcq', question: 'Ice melting into water is:', answer: 'melting (solid→liquid)', options: ['freezing', 'melting (solid→liquid)', 'boiling'],
          hint: 'Solid becoming liquid!', misconception: 'Melting = solid→liquid. Freezing is the opposite!',
          workedExample: ['Solid: ice.', 'Liquid: water.', 'Ice→water = melting.'] },
        { type: 'mcq', question: 'Water left in the freezer becomes ice — this is:', answer: 'freezing', options: ['melting', 'freezing', 'evaporating'],
          hint: 'Liquid becoming solid!', misconception: 'Freezing = liquid→solid. Melting is the reverse!',
          workedExample: ['Liquid: water.', 'Solid: ice.', 'Water→ice = freezing.'] },
        { type: 'mcq', question: 'Air in a balloon is a:', answer: 'gas', options: ['solid', 'liquid', 'gas'],
          hint: 'It fills the whole balloon!', misconception: 'Air is a gas — it fills all the space it has!',
          workedExample: ['Fills space.', 'Invisible.', 'Gas.'] },
        { type: 'mcq', question: 'Wet clothes dry because water:', answer: 'evaporates (liquid→gas)', options: ['melts', 'evaporates (liquid→gas)', 'freezes'],
          hint: 'Where does the water go?', misconception: 'Water turns to vapour and escapes — evaporation!',
          workedExample: ['Water in cloth.', 'Sun heats it.', 'Water→vapour = evaporates.'] },
        { type: 'interact', question: 'Fill the jug exactly half full!', options: [],
          interactGoal: { instruction: 'Set fill=50', widget: 'pour', validate: 'pour:fill=50' },
          hint: 'Drag the fill slider to the middle!', misconception: 'A liquid takes the shape of whatever holds it — the jug shows half!',
          workedExample: ['Drag fill slider.', 'Stop at 50.'] },
    ],
    reflect: { prompts: ['Name a solid, a liquid, a gas at home!', 'What happens to ice in the sun?'] },
    successLine: 'Matter scientist! 💧', tryAgainLine: 'Shape, flow, or spread?',
};

export const class3Nipun2Sims: SimDef[] = [c3Matter];
