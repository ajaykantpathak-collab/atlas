/**
 * Class 2 NIPUN extension sims, wave 2 — solar system.
 */
import type { SimDef } from '../engine/types';

export const c2Solar: SimDef = {
    id: 'c2_solar', title: 'Sun, Moon and Stars', subtitle: 'Our neighbours in the sky!',
    classLevel: 2, subject: 'evs', topic: 'Solar System Basics',
    chapters: ['EVS-2: sun, moon, stars'],
    emoji: '🌞', theme: { bg: 'from-indigo-100 to-blue-200', accent: 'indigo', scene: 'sky' },
    scenario: { role: "a little astronaut", intro: 'Look up! The sun, moon and stars are our sky-friends. Learn what each does!', goal: 'Know every sky friend.' },
    discovery: {
        question: "Which is a star — the Sun or the Moon?",
        options: ["The Sun", "The Moon", "Both"],
        answer: "The Sun",
        hook: 'The Sun is our nearest STAR — it makes its own light! The moon only reflects it!',
    },
    teaching: [
        { title: 'The Sun is a Star ⭐', text: 'The Sun is a giant ball of fire — a STAR! It makes its own light and heat. All stars twinkle far away — the sun is just very close!', emoji: '⭐', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'The Moon Borrows Light 🌙', text: 'The moon has NO light of its own — it bounces sunlight back to us like a mirror!', emoji: '🌙', bgColor: 'from-slate-400 to-gray-500' },
        { title: 'Earth is a Planet 🌍', text: 'We live on planet Earth — it goes around the sun. Eight planets circle the sun!', emoji: '🌍', bgColor: 'from-blue-400 to-indigo-500' },
        { title: 'Day and Night 🌗', text: 'Earth spins like a top! When our side faces the sun = day. When it turns away = night!', emoji: '🌗', bgColor: 'from-violet-400 to-purple-500' },
    ],
    explore: { lab: 'orbit', prompt: 'Speed the planet around the sun — watch it orbit!' },
    challenges: [
        { type: 'mcq', question: 'Which is a star?', answer: 'The Sun', options: ['The Moon', 'The Earth', 'The Sun'],
          hint: 'It makes its own light!', misconception: 'The Sun is a star — it makes light. The moon only reflects it!',
          workedExample: ['Star = makes own light.', 'Sun makes light.', 'Sun = star.'] },
        { type: 'mcq', question: 'The moon shines because it:', answer: 'reflects sunlight', options: ['makes its own light', 'reflects sunlight', 'burns like a star'],
          hint: 'Like a mirror!', misconception: 'The moon reflects sunlight — it has no light of its own!',
          workedExample: ['Moon has no fire.', 'It bounces sunlight.', 'Reflection.'] },
        { type: 'mcq', question: 'We live on planet:', answer: 'Earth', options: ['Mars', 'Jupiter', 'Earth'],
          hint: 'Our home!', misconception: 'Earth — the blue planet with land, water and air!',
          workedExample: ['Home planet.', 'Earth.'] },
        { type: 'mcq', question: 'Day happens when our side of Earth:', answer: 'faces the sun', options: ['faces away from the sun', 'faces the sun', 'stops spinning'],
          hint: 'Facing the sun = light!', misconception: 'Earth spins — facing the sun gives us daytime!',
          workedExample: ['Spin toward sun.', 'Light reaches us.', 'Day!'] },
        { type: 'mcq', question: 'How many planets go around the sun?', answer: '8', options: ['5', '8', '10'],
          hint: 'Mercury to Neptune!', misconception: '8 planets orbit the sun — Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune!',
          workedExample: ['Count the planets.', '8.'] },
        { type: 'interact', question: 'Make the planet orbit faster!', options: [],
          interactGoal: { instruction: 'Set orbit speed to 80', widget: 'orbit', validate: 'orbit:speed=80' },
          hint: 'Drag the speed slider up!', misconception: 'Faster planets orbit the sun quicker!',
          workedExample: ['Find speed slider.', 'Push to 80.'] },
    ],
    reflect: { prompts: ['Is the moon a star?', 'What makes day and night?'] },
    successLine: 'Little astronaut! 🌞', tryAgainLine: 'Think sun, moon, spin!',
};

export const class2Nipun2Sims: SimDef[] = [c2Solar];
