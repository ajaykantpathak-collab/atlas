/**
 * sims_v2/shared/science.ts — science enrichment strand for juniors.
 * Covers the physical-science themes the old set had that book-EVS missed:
 * force/friction, light, sound, states of matter, solar system, body systems.
 * Age-scaled; subject='science'.
 */
import type { SimDef } from '../engine/types';

const R = { prompts: ['What surprised you?', 'Tell a friend one science fact!'] };

export const sciMatter: SimDef = {
    id: 'sci_matter', title: 'States of Matter', subtitle: 'Solid, liquid, gas!',
    classLevel: 3, subject: 'science', topic: 'States of Matter',
    chapters: ['Science: States of Matter'],
    emoji: '🧊', theme: { bg: 'from-gold-100 to-gold-200', accent: 'cyan', scene: 'ice' },
    scenario: { role: "a state-changer", intro: "Solid, liquid, gas — matter changes with heat!", goal: "Change every state." },
    discovery: { question: 'Ice, water, steam — three different things or the SAME thing?', options: ['Same thing in 3 forms!', 'Different things', 'Only water is real'], answer: 'Same thing in 3 forms!', hook: 'Ice, water and steam are ALL water — just different states! Let us melt into it.' },
    teaching: [
        { title: 'Solid, Liquid, Gas 🧊', text: 'Solids hold their shape (ice). Liquids flow (water). Gases spread out (steam)!', emoji: '🧊', bgColor: 'from-gold-400 to-gold-500' },
        { title: 'Melting and Freezing 🔥', text: 'Heat melts ice into water. Cold freezes water back into ice!', emoji: '🔥', bgColor: 'from-orange-400 to-red-500' },
        { title: 'Evaporation 💨', text: 'Heat turns water into invisible vapour — it rises into the air!', emoji: '💨', bgColor: 'from-gold-400 to-gold-500' },
        { title: 'Water is Special 💧', text: 'Water is one of few things that can be solid, liquid AND gas!', emoji: '💧', bgColor: 'from-gold-400 to-purple-500' },
    ],
    challenges: [
        { type: 'sort', question: 'Sort each thing: SOLID, LIQUID, or GAS?', options: [],
          sortItems: [
            { id: 'm1', label: 'Ice cube', emoji: '🧊', correctBin: 'solid' },
            { id: 'm2', label: 'Milk', emoji: '🥛', correctBin: 'liquid' },
            { id: 'm3', label: 'Steam', emoji: '💨', correctBin: 'gas' },
            { id: 'm4', label: 'Rock', emoji: '🪨', correctBin: 'solid' },
            { id: 'm5', label: 'Juice', emoji: '🧃', correctBin: 'liquid' },
            { id: 'm6', label: 'Air', emoji: '🌬️', correctBin: 'gas' },
          ],
          bins: [ { id: 'solid', label: 'Solid 🧊', color: '#3b82f6' }, { id: 'liquid', label: 'Liquid 💧', color: '#06b6d4' },
                  { id: 'gas', label: 'Gas 💨', color: '#8b5cf6' } ],
          hint: 'Holds shape = solid, flows = liquid, spreads = gas!',
          misconception: 'Ice & rock are solids. Milk & juice are liquids. Steam & air are gases!',
          workedExample: ['Solid = fixed shape.', 'Liquid = flows.', 'Gas = fills the space.'] },
        { type: 'mcq', question: 'What happens to ice in the sun?', answer: 'It melts into water', options: ['It freezes more', 'It melts into water', 'It becomes a gas instantly'],
          hint: 'Heat changes it!', misconception: 'Heat melts ice into liquid water — melting!',
          workedExample: ['Ice + heat.', 'Melts to water.'] },
        { type: 'mcq', question: 'Water vapour is...', answer: 'Water as an invisible gas', options: ['Water as an invisible gas', 'Frozen water', 'A liquid'],
          hint: 'It floats in air!', misconception: 'Water vapour is water turned to gas — invisible!',
          workedExample: ['Heat water.', 'It becomes vapour.'] },
    ],
    successLine: 'Matter master! ⭐', tryAgainLine: 'Solid, liquid, or gas?',
    reflect: R,
};

export const sciForce: SimDef = {
    id: 'sci_force', title: 'Push, Pull, Friction', subtitle: 'How things move!',
    classLevel: 4, subject: 'science', topic: 'Force and Friction',
    chapters: ['Science: Force and Friction'],
    emoji: '🧲', theme: { bg: 'from-amber-100 to-orange-200', accent: 'amber', scene: 'force' },
    scenario: { role: "a force-finder", intro: "Push, pull, friction — forces move the world!", goal: "Use every force." },
    discovery: { question: 'Why does a ball stop rolling on grass but keep going on smooth floor?', options: ['Friction slows it down!', 'It gets tired', 'No reason'], answer: 'Friction slows it down!', hook: 'Friction is a hidden force that slows things! Let us find it.' },
    teaching: [
        { title: 'Push and Pull 💪', text: 'A force is a push or a pull. Push a swing, pull a rope — both are forces!', emoji: '💪', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Friction Slows Things 🐢', text: 'Friction is a force that rubs against moving things and slows them — like grass on a ball!', emoji: '🐢', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Smooth vs Rough ✨', text: 'Smooth ice = little friction, slide far. Rough carpet = lots of friction, stops fast!', emoji: '✨', bgColor: 'from-gold-400 to-gold-500' },
        { title: 'Forces Everywhere 🌍', text: 'Gravity pulls you down, magnets pull metal, your muscles push and pull!', emoji: '🌍', bgColor: 'from-gold-400 to-purple-500' },
    ],
    challenges: [
        { type: 'mcq', question: 'What is friction?', answer: 'A force that slows moving things', options: ['A type of ball', 'A force that slows moving things', 'A light'],
          hint: 'It rubs and slows!', misconception: 'Friction is a rubbing force that slows things down!',
          workedExample: ['Friction rubs.', 'Slows movement.'] },
        { type: 'sort', question: 'Sort: HIGH friction or LOW friction?', options: [],
          sortItems: [
            { id: 'f1', label: 'Ice', emoji: '🧊', correctBin: 'low' },
            { id: 'f2', label: 'Sandpaper', emoji: '🪨', correctBin: 'high' },
            { id: 'f3', label: 'Glass', emoji: '🪟', correctBin: 'low' },
            { id: 'f4', label: 'Carpet', emoji: '🧶', correctBin: 'high' },
          ],
          bins: [ { id: 'high', label: 'High friction 🐢', color: '#f97316' }, { id: 'low', label: 'Low friction ⛸️', color: '#06b6d4' } ],
          hint: 'Rough = high, smooth = low!',
          misconception: 'Rough surfaces have high friction — smooth ones have low!',
          workedExample: ['Rough = high friction.', 'Smooth = low.'] },
        { type: 'mcq', question: 'A force is a...', answer: 'Push or pull', options: ['Colour', 'Push or pull', 'Sound'],
          hint: 'It moves things!', misconception: 'A force is a push or a pull on an object!',
          workedExample: ['Push a swing.', 'Pull a rope.', 'Both are forces.'] },
    ],
    successLine: 'Force finder! ⭐', tryAgainLine: 'Push, pull, friction!',
    reflect: R,
};

export const sciLight: SimDef = {
    id: 'sci_light', title: 'Light and Shadows', subtitle: 'Why shadows form!',
    classLevel: 4, subject: 'science', topic: 'Light and Shadow',
    chapters: ['Science: Light'],
    emoji: '🔦', theme: { bg: 'from-yellow-100 to-amber-200', accent: 'amber', scene: 'light' },
    scenario: { role: "a shadow-maker", intro: "Light travels straight — shadows form!", goal: "Understand light." },
    discovery: { question: 'Can you see your shadow in a totally dark room?', options: ['No - shadows need light!', 'Yes always', 'Sometimes'], answer: 'No - shadows need light!', hook: 'A shadow is blocked light — no light, no shadow! Let us shine on it.' },
    teaching: [
        { title: 'Light Travels Straight 💡', text: 'Light zooms in straight lines — that is why shadows have sharp edges!', emoji: '💡', bgColor: 'from-yellow-400 to-amber-500' },
        { title: 'Shadows = Blocked Light 🌑', text: 'When something blocks light, a dark patch forms behind it — a shadow!', emoji: '🌑', bgColor: 'from-slate-400 to-gray-500' },
        { title: 'Big and Small Shadows 📏', text: 'Move the light close = big fuzzy shadow. Move it far = small sharp shadow!', emoji: '📏', bgColor: 'from-gold-400 to-gold-500' },
        { title: 'Day and Night 🌗', text: 'The sun is our biggest light — when it sets, the world goes dark!', emoji: '🌗', bgColor: 'from-gold-400 to-purple-500' },
    ],
    challenges: [
        { type: 'mcq', question: 'A shadow forms when light is...', answer: 'Blocked by an object', options: ['Made bigger', 'Blocked by an object', 'Turned off'],
          hint: 'Something blocks it!', misconception: 'A shadow is light blocked by an object — the dark patch behind!',
          workedExample: ['Light shines.', 'Object blocks it.', 'Shadow behind.'] },
        { type: 'mcq', question: 'Light travels in...', answer: 'Straight lines', options: ['Curves', 'Straight lines', 'Circles'],
          hint: 'Sharp shadows!', misconception: 'Light travels straight — that is why shadows have edges!',
          workedExample: ['Light goes straight.', 'Sharp shadow edge.'] },
        { type: 'mcq', question: 'Move a lamp CLOSER to a toy — the shadow gets...', answer: 'Bigger', options: ['Smaller', 'Bigger', 'Same'],
          hint: 'Near light = big shadow!', misconception: 'Closer light = bigger, fuzzier shadow!',
          workedExample: ['Light close.', 'Shadow grows big.'] },
    ],
    successLine: 'Light shiner! ⭐', tryAgainLine: 'Shadows need light!',
    reflect: R,
};

export const sciBody: SimDef = {
    id: 'sci_body', title: 'Inside Your Body', subtitle: 'Bones, muscles, heart!',
    classLevel: 5, subject: 'science', topic: 'Body Systems',
    chapters: ['Science: Body Systems'],
    emoji: '🦴', theme: { bg: 'from-rose-100 to-pink-200', accent: 'rose', scene: 'body' },
    scenario: { role: "a body-explorer", intro: "Bones, muscles, heart — your body is amazing!", goal: "Know your body." },
    discovery: { question: 'What holds your body up — skin, bones, or air?', options: ['Bones - the skeleton!', 'Skin', 'Air inside'], answer: 'Bones - the skeleton!', hook: 'Your skeleton is a frame holding you up — 206 bones! Let us look inside.' },
    teaching: [
        { title: 'The Skeleton 🦴', text: '206 bones form a frame — they hold you up, protect organs, and help you move!', emoji: '🦴', bgColor: 'from-rose-400 to-pink-500' },
        { title: 'Muscles Move You 💪', text: 'Muscles pull on bones to make you move — they work in pairs!', emoji: '💪', bgColor: 'from-red-400 to-orange-500' },
        { title: 'The Heart Pumps ❤️', text: 'Your heart is a pump pushing blood all around — it beats ~100,000 times a day!', emoji: '❤️', bgColor: 'from-rose-500 to-red-600' },
        { title: 'Lungs Breathe 🌬️', text: 'Lungs take in oxygen and push out carbon dioxide — your breath keeps you alive!', emoji: '🌬️', bgColor: 'from-gold-400 to-gold-500' },
    ],
    challenges: [
        { type: 'mcq', question: 'About how many bones does an adult have?', answer: '206', options: ['50', '206', '1000'],
          hint: 'Over 200!', misconception: 'An adult skeleton has 206 bones!',
          workedExample: ['Skeleton = frame.', 'About 206 bones.'] },
        { type: 'mcq', question: 'What does the heart do?', answer: 'Pumps blood around the body', options: ['Digests food', 'Pumps blood around the body', 'Breathes air'],
          hint: 'It beats!', misconception: 'The heart pumps blood — a muscle working all the time!',
          workedExample: ['Heart = pump.', 'Pushes blood.'] },
        { type: 'mcq', question: 'Muscles help you move by...', answer: 'Pulling on bones', options: ['Pushing skin', 'Pulling on bones', 'Making blood'],
          hint: 'They pull!', misconception: 'Muscles pull bones to move you — they cannot push!',
          workedExample: ['Muscle pulls bone.', 'Arm lifts.'] },
    ],
    successLine: 'Body expert! ⭐', tryAgainLine: 'Bones, muscles, heart!',
    reflect: R,
};

export const sciSpace: SimDef = {
    id: 'sci_space', title: 'Our Solar System', subtitle: 'Sun, planets, moons!',
    classLevel: 5, subject: 'science', topic: 'Solar System',
    chapters: ['Science: Solar System'],
    emoji: '🪐', theme: { bg: 'from-gold-100 to-purple-200', accent: 'indigo', scene: 'space' },
    scenario: { role: "a space-cadet", intro: "The sun is a star — planets orbit it!", goal: "Explore the solar system." },
    discovery: { question: 'Is the sun a planet, a star, or a moon?', options: ['A star - it makes its own light!', 'A planet', 'A moon'], answer: 'A star - it makes its own light!', hook: 'The sun is a star — planets orbit it! Let us explore space.' },
    teaching: [
        { title: 'The Sun is a Star ☀️', text: 'The sun is a star — it makes its own light and heat. Everything orbits it!', emoji: '☀️', bgColor: 'from-amber-400 to-orange-500' },
        { title: '8 Planets Orbit 🪐', text: 'Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune — all orbit the sun!', emoji: '🪐', bgColor: 'from-gold-400 to-purple-500' },
        { title: 'Earth is Special 🌍', text: 'Earth has air, water, and life — the only planet we know with living things!', emoji: '🌍', bgColor: 'from-gold-400 to-gold-500' },
        { title: 'Moons and More 🌙', text: 'Planets have moons (we have one!), and space has asteroids and comets too!', emoji: '🌙', bgColor: 'from-gold-400 to-gold-500' },
    ],
    challenges: [
        { type: 'mcq', question: 'The sun is a...', answer: 'Star', options: ['Planet', 'Star', 'Moon'],
          hint: 'It makes its own light!', misconception: 'The sun is a star — planets do not make light, stars do!',
          workedExample: ['Sun makes light.', 'So it is a star.'] },
        { type: 'order', question: 'Order the planets closest to sun first!', options: [],
          sortItems: [
            { id: 'p1', label: 'Mercury', emoji: '🟤', correctBin: 'pl1' },
            { id: 'p2', label: 'Earth', emoji: '🌍', correctBin: 'pl3' },
            { id: 'p3', label: 'Venus', emoji: '🟡', correctBin: 'pl2' },
            { id: 'p4', label: 'Mars', emoji: '🔴', correctBin: 'pl4' },
          ],
          bins: [ { id: 'pl1', label: '1st', color: '#f97316' }, { id: 'pl2', label: '2nd', color: '#eab308' },
                  { id: 'pl3', label: '3rd', color: '#3b82f6' }, { id: 'pl4', label: '4th', color: '#ef4444' } ],
          hint: 'Mercury, Venus, Earth, Mars!',
          misconception: 'Order: Mercury → Venus → Earth → Mars — nearest to farthest!',
          workedExample: ['Mercury first.', 'Then Venus.', 'Earth, then Mars.'] },
        { type: 'mcq', question: 'What makes Earth special?', answer: 'It has life, air and water', options: ['It is biggest', 'It has life, air and water', 'It is closest to sun'],
          hint: 'We live here!', misconception: 'Earth has air, water and life — unique in our solar system!',
          workedExample: ['Earth has air.', 'Water and life.'] },
    ],
    successLine: 'Space explorer! ⭐', tryAgainLine: 'Planets orbit the sun!',
    reflect: R,
};

export const scienceSims: SimDef[] = [sciMatter, sciForce, sciLight, sciBody, sciSpace];
