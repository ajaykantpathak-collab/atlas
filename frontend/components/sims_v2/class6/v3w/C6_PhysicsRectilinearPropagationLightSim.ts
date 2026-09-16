import type { SimDef } from '../../engine/types';
import C6_PhysicsRectilinearPropagationLightSim from '../../../simulations/c6_12/C6_PhysicsRectilinearPropagationLightSim';

/** v3 wrapped master — C6_PhysicsRectilinearPropagationLightSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_physicsrectilinearpropagationlightsim: SimDef = {
    id: 'v3w_c6_physicsrectilinearpropagationlightsim',
    title: 'Rectilinear Propagation Light',
    subtitle: 'This node covers the rectilinear propagation of light (light travels in straight lines).',
    classLevel: 6, subject: 'physics', topic: 'Light Travels in Straight Lines',
    chapters: [],
    nodeIds: ['c6_physics_ch11_036', 'c6_physics_ch11_035'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Have you ever tried to look at a light bulb through a garden hose?', goal: 'Master Rectilinear Propagation Light.' },
    discovery: {
        question: 'A light source is placed in front of a circular ball. If the ball is moved closer to the wall behind it, what happens to the size of the shadow?',
        options: ['The shadow size decreases (or becomes sharper)', 'of blocked light rays', 'light "fills" a room like water fills a bucket, assuming it can go anywhere'],
        answer: 'The shadow size decreases (or becomes sharper)',
        hook: 'Students often believe light "fills" a room like water fills a bucket, assuming it can go anywhere.',
    },
    teaching: [
        { title: 'Light is a form of energy that travels in a.', text: 'Light is a form of energy that travels in a straight line, known as rectilinear propagation. This means it cannot bend around obstacles unless it is reflected or refracted.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c6_physics_ch11_036', title: 'Light is a form of energy that travels.',
          scaffold: { problem: 'You have a 50 cm ruler. You place a tall bottle 10 cm from a wall and a torch 20 cm from the bottle. Why do you see a shadow?',
            steps: [
            { text: 'Identify the source (torch), the object (bottle), and the screen (wall).' },
            { text: 'Recognize that light travels in straight lines from the torch.' },
            { text: 'Note that the bottle is an opaque object blocking the light path.' },
            { text: 'Conclude that the area behind the bottle receives no light.', faded: true, blankAnswer: 'A shadow is formed because the bottle blocks the straight.' }
            ] } },
        { type: 'case', nodeId: 'c6_physics_ch11_041', title: 'A pinhole camera is a simple.',
          caseStudy: { intro: 'Have you ever wondered how a tiny hole in a dark box can "capture" a picture of the world outside?',
            decisions: [{ prompt: 'What happens to the image if you make the pinhole very large?', options: [
                { text: 'The image becomes blurry or disappears entirely', outcome: 'The image becomes blurry or disappears entirely because too much light enters from different.' },
                { text: 'bigger window', outcome: 'Not quite — Students often believe the pinhole "turns" the light around or that there is a mirror inside the.', reveals: 'the-pinhole-turns-the-light' }
            ] }] } }
    ],
    explore: { component: C6_PhysicsRectilinearPropagationLightSim, prompt: 'Explore the interactive — Rectilinear Propagation Light' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_physics_ch11_036', difficulty: 'standard',
          question: 'Light is a form of energy that travels in a straight line, known as rectilinear.',
          hint: 'Review the "straight pipe" activity in Chapter 11.',
          misconception: 'Students often believe light "fills" a room like water fills a bucket, assuming it can go anywhere.',
          parts: [
                { id: 'a', prompt: 'What happens to light when it encounters an obstacle?', answer: 'Light is blocked by the obstacle, creating a shadow on the other side',
                  options: ['Light is blocked by the obstacle, creating a shadow on the other side', 'light "fills" a room like water fills a bucket, assuming it can go anywhere'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe light "fills" a room like water fills a bucket, assuming it can go anywhere.' },
                { id: 'b', prompt: 'If you hold a straight pipe and a curved pipe to look at a candle, which one allows you to see the flame and why?', answer: 'Only the straight pipe works',
                  options: ['Only the straight pipe works', 'light "fills" a room like water fills a bucket, assuming it can go anywhere'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe light "fills" a room like water fills a bucket, assuming it can go anywhere.' },
                { id: 'c', prompt: 'A light source is placed in front of a circular ball. If the ball is moved closer to the wall behind it, what happens to the size of the shadow?', answer: 'The shadow size decreases (or becomes sharper)',
                  options: ['The shadow size decreases (or becomes sharper)', 'of blocked light rays', 'light "fills" a room like water fills a bucket, assuming it can go anywhere'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe light "fills" a room like water fills a bucket, assuming it can go anywhere.' }
          ],
            remediations: { 'light-fills-a-room-like': { steps: ['First, ask the student to trace a line from a light source to a wall using a ruler.', 'Then, place a pencil in the middle of that line and ask, "Where does the light go now?" Guide them to see that the.', 'Repeat this with a sheet of paper to show that the shadow is exactly the shape of the part of the paper blocking the.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch11_041', difficulty: 'standard',
          question: 'A pinhole camera is a simple light-tight box with a tiny hole on one side that.',
          hint: 'Review the properties of shadows; shadows are formed because light cannot pass through an.',
          misconception: 'Students often believe the pinhole "turns" the light around or that there is a mirror inside the box to flip the image.',
          parts: [
                { id: 'a', prompt: 'What happens to the image if you make the pinhole very large?', answer: 'The image becomes blurry or disappears entirely',
                  options: ['The image becomes blurry or disappears entirely', 'bigger window'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the pinhole "turns" the light around or that there is a mirror inside the box to flip the image.' }
          ],
            remediations: { 'the-pinhole-turns-the-light': { steps: ['Take a cardboard tube and hold a burning candle in front of it in a dark room.', 'Ask the student to trace the path of the light from the candle flame to the back of the tube with a string.', 'Show them that the string must pass through the center to reach the opposite side, physically demonstrating the.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
